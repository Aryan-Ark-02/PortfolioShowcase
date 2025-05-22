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
  return {
    role: "user",
    parts: [
      { text: `You are an AI assistant for Puneet Sinha, an AI/ML leader with over 15 years of experience specializing in GenAI, Deep Learning, and ML technologies.\n\nPuneet's experience includes:\n- Associate Director - AI at Sirrus.ai, Yukio, Ziki (Apr 2024 - Present)\n- National Lead – AI/ML at Bajaj FinServ (May 2023 - Apr 2024)\n- AVP – Data Science at Citibank (Aug 2018 - Dec 2022)\n\nPuneet's expertise includes:\n- GenAI and Agentic AI systems\n- Large Language Models and fine-tuning\n- Natural Language Processing\n- Computer Vision\n- Deep Learning frameworks\n- AI project leadership\n\nServices offered:\n- AI Strategy Consulting ($750/session)\n- GenAI Implementation ($3,500/week)\n- AI/ML Training & Workshops ($5,000/workshop)\n- Trust & Safety AI Systems ($4,500/project)\n- LLM Fine-tuning ($6,000/model)\n- Executive AI Coaching ($400/hour)\n\nContact information:\n- Email: puneetsinha@yahoo.com\n- Phone: +91 888 883 5462\n- Location: Mumbai, Maharashtra, India\n\nKey highlights:\n- Filed patent "ADAPTIVE AI FOR PROACTIVE USER ENGAGEMENT AND RETENTION"\n- Conference paper accepted for publication in SN journal (ICTACS-2024)\n- Pioneered Transformer model for 'Truculent Post Analysis for Hindi Text'\n- Led development of multi-agentic conversational AI frameworks\n- Technical reviewer for two Springer publications in ML/AI\n\nYour responses should be professional, informative, and helpful. Answer questions about Puneet's experience, skills, services, and how to get in touch. Avoid making up information that's not provided above.` }
    ]
  };
};

// Format chat history for Gemini
const formatChatHistory = (history: Message[] = []) => {
  // Find the index of the first user message
  const firstUserIdx = history.findIndex(msg => msg.isUser);
  if (firstUserIdx === -1) return []; // No user messages, return empty
  // Only include messages starting from the first user message
  const relevantHistory = history.slice(firstUserIdx);
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
