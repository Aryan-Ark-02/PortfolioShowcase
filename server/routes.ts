import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateChatbotResponse } from "./services/chatbot";
import { sendContactEmail } from "./services/email";
import { z } from "zod";

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
      
      // Generate response from Gemini
      const response = await generateChatbotResponse(message, history);
      
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

  return server;
}
