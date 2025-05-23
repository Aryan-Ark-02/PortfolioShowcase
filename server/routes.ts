import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateChatbotResponse } from "./services/chatbot";
import { sendContactEmail } from "./services/email";
import { z } from "zod";
import { db } from "./db";
import { users, insertUserSchema, contactSubmissions, chatMessages, jobApplications, insertJobApplicationSchema } from "@shared/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import passport from "passport";
import { Strategy as GoogleStrategy, type VerifyCallback, type Profile } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import { authConfig } from "./authConfig";

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
});

// Chatbot request schema
const chatbotRequestSchema = z.object({
  message: z.string(),
  history: z.array(z.object({
    id: z.string(),
    content: z.string(),
    isUser: z.boolean()
  })).optional()
});

// Signup form schema (reuse insertUserSchema, but require password)
const signupSchema = insertUserSchema;

// Google OAuth setup
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: "/api/auth/google/callback"
}, async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
  try {
    // Find user by Google ID
    let user = await db.select().from(users).where(eq(users.googleId, profile.id));
    if (!user.length) {
      // If not found, create a new user
      const email = profile.emails?.[0]?.value || "";
      const name = profile.displayName;
      const newUser = {
        name,
        email,
        googleId: profile.id,
        password: "google-oauth", // placeholder, not used
        role: "user",
        createdAt: new Date(),
      };
      const inserted = await db.insert(users).values(newUser).returning();
      user = [inserted[0]];
    }
    return done(null, user[0]);
  } catch (err: any) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Create HTTP server
  const server = createServer(app);

  // API routes
  
  // Contact form submission
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validation = contactFormSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({
          message: "Invalid form data",
          errors: validation.error.format()
        });
      }
      
      const { name, email, subject, message } = validation.data;
      
      // Save to database
      await db.insert(contactSubmissions).values({
        name,
        email,
        subject,
        message
      });
      
      // Send email
      await sendContactEmail({ name, email, subject, message });
      
      // Return success response
      return res.status(200).json({
        message: "Message sent successfully"
      });
    } catch (error) {
      console.error("Contact form error:", error);
      return res.status(500).json({
        message: "Failed to send message. Please try again later."
      });
    }
  });
  
  // Chatbot API
  app.post("/api/chatbot", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validation = chatbotRequestSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({
          message: "Invalid request data",
          errors: validation.error.format()
        });
      }
      
      const { message, history } = validation.data;
      
      // Save user message to database
      const sessionId = (history && history.length > 0 && history[0].id) || (Math.random().toString(36).substring(2));
      await db.insert(chatMessages).values({
        sessionId,
        content: message,
        isUser: true
      });
      
      // Generate response from Gemini
      const response = await generateChatbotResponse(message, history);
      
      // Save AI response to database
      await db.insert(chatMessages).values({
        sessionId,
        content: response,
        isUser: false
      });
      
      // Return chatbot response
      return res.status(200).json({
        response
      });
    } catch (error) {
      console.error("Chatbot error:", error);
      return res.status(500).json({
        message: "Failed to generate response. Please try again later."
      });
    }
  });

  // Login API
  app.post("/api/login", async (req: Request, res: Response) => {
    try {
      const { email, password, redirect } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
      }
      // Find user
      const user = await db.select().from(users).where(eq(users.email, email));
      if (!user.length) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      // Check password
      const valid = await bcrypt.compare(password, user[0].password);
      if (!valid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      // Issue JWT
      if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "JWT secret not set" });
      }
      const token = jwt.sign(
        { id: user[0].id, email: user[0].email, name: user[0].name },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      res.cookie("token", token, { httpOnly: true });
      // Optionally create session
      req.login(user[0] as any, (err) => {
        if (err) return res.status(500).json({ message: "Session error" });
        // Redirect or respond
        if (redirect) {
          return res.redirect(redirect);
        }
        return res.redirect(authConfig.loginRedirect);
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Failed to login. Please try again later." });
    }
  });

  // Signup API
  app.post("/api/signup", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validation = signupSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          message: "Invalid signup data",
          errors: validation.error.format(),
        });
      }
      const { name, email, password, role } = validation.data;
      // Check if user already exists
      const existing = await db.select().from(users).where(eq(users.email, email));
      if (existing.length > 0) {
        return res.status(409).json({ message: "User already exists" });
      }
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Custom user creation hook
      let newUser = { name, email, password: hashedPassword, role };
      if (authConfig.createUserHook) {
        newUser = await authConfig.createUserHook(newUser);
      }
      await db.insert(users).values(newUser);
      // Redirect or respond
      const redirectUrl = req.body.redirect || authConfig.signupRedirect;
      return res.redirect(redirectUrl);
    } catch (error) {
      console.error("Signup error:", error);
      return res.status(500).json({ message: "Failed to signup. Please try again later." });
    }
  });

  // Job application submission
  app.post("/api/job-application", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validation = insertJobApplicationSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          message: "Invalid job application data",
          errors: validation.error.format()
        });
      }
      // Insert job application
      await db.insert(jobApplications).values(validation.data);
      return res.status(201).json({ message: "Job application submitted successfully" });
    } catch (error) {
      console.error("Job application error:", error);
      return res.status(500).json({ message: "Failed to submit job application. Please try again later." });
    }
  });

  // Google OAuth routes
  app.get("/api/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

  app.get("/api/auth/google/callback", passport.authenticate("google", {
    failureRedirect: authConfig.failureRedirect,
    session: true
  }), (req: Request, res: Response) => {
    // Issue JWT
    const user = req.user as any;
    if (!user || !process.env.JWT_SECRET) {
      return res.redirect(authConfig.failureRedirect);
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("token", token, { httpOnly: true });
    // Redirect to custom or default URL
    const redirectUrl = req.query.redirect as string || authConfig.defaultRedirect;
    res.redirect(redirectUrl);
  });

  return server;
}
