import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

// Initialize Gemini client only if key exists (handled safely in hook)
const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("Gemini API Key is missing.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateStylistResponse = async (
  userMessage: string,
  history: { role: string; text: string }[] = []
): Promise<string> => {
  const client = getClient();
  if (!client) {
    return "I'm currently offline (API Key missing). Please check back later!";
  }

  try {
    // Format history for the API if needed, or just use a fresh chat for simplicity in this demo.
    // For a single turn Q&A with context, we can construct the prompt or use chat.
    // Let's use a simple chat model.
    
    const chat = client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history.map(h => ({
        role: h.role === 'model' ? 'model' : 'user',
        parts: [{ text: h.text }]
      }))
    });

    const result: GenerateContentResponse = await chat.sendMessage({
      message: userMessage
    });

    return result.text || "I'm contemplating the perfect look for you...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "My fashion senses are tingling, but I can't reach the server right now. Try again?";
  }
};
