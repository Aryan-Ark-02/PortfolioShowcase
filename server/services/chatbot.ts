import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// Message interface matches the client-side interface
interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

// Initialize Gemini API
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable not set");
  }
  
  return new GoogleGenerativeAI(apiKey);
};

// Build contextual system prompt
const buildSystemPrompt = () => {
  return `You are an AI assistant for Puneet Sinha, an AI/ML leader with over 15 years of experience specializing in GenAI, Deep Learning, and ML technologies.

Puneet's experience includes:
- Associate Director - AI at Sirrus.ai, Yukio, Ziki (Apr 2024 - Present)
- National Lead – AI/ML at Bajaj FinServ (May 2023 - Apr 2024)
- AVP – Data Science at Citibank (Aug 2018 - Dec 2022)

Puneet's expertise includes:
- GenAI and Agentic AI systems
- Large Language Models and fine-tuning
- Natural Language Processing
- Computer Vision
- Deep Learning frameworks
- AI project leadership

Services offered:
- AI Strategy Consulting ($750/session)
- GenAI Implementation ($3,500/week)
- AI/ML Training & Workshops ($5,000/workshop)
- Trust & Safety AI Systems ($4,500/project)
- LLM Fine-tuning ($6,000/model)
- Executive AI Coaching ($400/hour)

Contact information:
- Email: puneetsinha@yahoo.com
- Phone: +91 888 883 5462
- Location: Mumbai, Maharashtra, India

Key highlights:
- Filed patent "ADAPTIVE AI FOR PROACTIVE USER ENGAGEMENT AND RETENTION"
- Conference paper accepted for publication in SN journal (ICTACS-2024)
- Pioneered Transformer model for 'Truculent Post Analysis for Hindi Text'
- Led development of multi-agentic conversational AI frameworks
- Technical reviewer for two Springer publications in ML/AI

Your responses should be professional, informative, and helpful. Answer questions about Puneet's experience, skills, services, and how to get in touch. Avoid making up information that's not provided above.`;
};

// Format chat history for Gemini
const formatChatHistory = (history: Message[] = []) => {
  // Filter out system messages (non-user messages at the beginning)
  const userInteractionStarted = history.findIndex(msg => msg.isUser);
  const relevantHistory = userInteractionStarted > 0 
    ? history.slice(userInteractionStarted)
    : history;
  
  // Format history for Gemini
  return relevantHistory.map(msg => ({
    role: msg.isUser ? "user" : "model",
    parts: [{ text: msg.content }]
  }));
};

// Generate response from Gemini
export async function generateChatbotResponse(
  message: string,
  history?: Message[]
): Promise<string> {
  try {
    const genAI = getGeminiClient();
    
    // Get Gemini model (using Gemini 1.5 Flash)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });
    
    // Start chat
    const chat = model.startChat({
      history: formatChatHistory(history),
      systemInstruction: buildSystemPrompt(),
    });
    
    // Generate response
    const result = await chat.sendMessage(message);
    const response = result.response;
    
    return response.text();
  } catch (error) {
    console.error("Error generating chatbot response:", error);
    throw new Error("Failed to generate response. Please try again later.");
  }
}
