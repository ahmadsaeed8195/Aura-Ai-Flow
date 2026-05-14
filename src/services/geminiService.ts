import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedWebsite, ThemeMode } from "../types";

let aiInstance: GoogleGenAI | null = null;

function getGenAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the environment.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export async function generateWebsiteFromPrompt(prompt: string): Promise<GeneratedWebsite> {
  try {
    const ai = getGenAI();
    
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: `Generate a JSON object for a futuristic website based on this prompt: "${prompt}"`,
      config: {
        systemInstruction: `You are an expert web designer. 
        You must return ONLY a JSON object that matches the GeneratedWebsite type.
        Do not include any markdown formatting wrappers (like \`\`\`json).
        
        The theme must be one of: 'Dark', 'Light', 'Cyberpunk', 'Glassmorphism', 'Corporate', 'Luxury'.
        
        Structure:
        {
          "id": "gen-unique-id",
          "title": "Project Name",
          "description": "Short tagline",
          "theme": "Dark",
          "font": "Inter",
          "sections": [
            {
              "id": "sec-unique-id",
              "type": "hero",
              "content": { "heading": "...", "subtext": "...", "buttonText": "..." }
            }
          ]
        }`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            theme: { 
              type: Type.STRING,
              enum: ['Dark', 'Light', 'Cyberpunk', 'Glassmorphism', 'Corporate', 'Luxury']
            },
            font: { type: Type.STRING },
            sections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  type: { type: Type.STRING, enum: ['hero', 'features', 'pricing', 'contact', 'footer', 'testimonials'] },
                  content: { type: Type.OBJECT }
                },
                required: ['id', 'type', 'content']
              }
            }
          },
          required: ['id', 'title', 'description', 'theme', 'font', 'sections']
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as GeneratedWebsite;
  } catch (error) {
    // Fallback mock site
    return {
      id: "fallback-" + Math.random().toString(36).substring(7),
      title: "Neo Genesis",
      description: "The next generation of intelligent platforms.",
      theme: "Dark" as ThemeMode,
      font: "Inter",
      sections: [
        {
          id: "hero-fallback",
          type: "hero",
          content: {
            heading: "The Neural Frontier Awaits",
            subtext: "Experience the next evolution of digital design through AuraFlow's generative engine.",
            buttonText: "Join Nexus"
          }
        },
        {
          id: "features-fallback",
          type: "features",
          content: {
            features: [
              { title: "Neural Sync", description: "Real-time design evolution powered by deep learning." },
              { title: "Atomic Design", description: "Component-based architecture that scales with your vision." }
            ]
          }
        }
      ]
    };
  }
}
