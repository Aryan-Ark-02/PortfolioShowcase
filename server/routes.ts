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
      // Insert user
      await db.insert(users).values({ name, email, password: hashedPassword, role });
      return res.status(201).json({ message: "Signup successful" });
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

  return server;
}
