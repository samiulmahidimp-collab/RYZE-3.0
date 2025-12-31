import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Initialize the client.
const ai = new GoogleGenAI({ apiKey });

export const generateStudyHelp = async (
  prompt: string, 
  history: { role: string; text: string }[]
): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: "You are RyzeBot, an intelligent AI tutor on the Ryze 3.0 Techcom platform. Your goal is to help students learn new topics, summarize concepts, and suggest study tags. Keep answers concise, encouraging, and formatted with Markdown.",
      }
    });

    const response: GenerateContentResponse = await chat.sendMessage({ 
      message: prompt 
    });

    return response.text || "I'm sorry, I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while contacting the AI tutor. Please check your connection.";
  }
};

export const generateDocumentOverview = async (title: string, description: string, tags: string[]): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a concise but comprehensive academic overview and study outline for a document titled "${title}". 
      Context/Description: "${description}". 
      Tags: ${tags.join(', ')}. 
      
      The output will be used as a "Preview" for a student considering purchasing this document. 
      Summarize what they will learn. Use Markdown formatting with bullet points.`,
    });
    return response.text || "Preview generation unavailable.";
  } catch (error) {
    console.error("Gemini Preview Error:", error);
    return "Unable to generate AI overview at this time.";
  }
};
