import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedWebsite, ThemeMode } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateWebsiteFromPrompt(prompt: string): Promise<GeneratedWebsite> {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
    You are an elite AI web designer. Given a user's prompt for a website, generate a structured JSON representing the website's architecture.
    
    Structure the response as:
    title: string (Creative site title)
    description: string (Supporting tag line)
    theme: string (Choose one: "Dark", "Light", "Cyberpunk", "Glassmorphism", "Corporate", "Luxury")
    font: string (Name of a modern font that fits the theme)
    sections: Array of section objects. Each section has:
      id: unique string
      type: "hero" | "features" | "pricing" | "contact" | "footer" | "testimonials"
      content: Deep object with fields relevant to that section (e.g., hero needs heading, subtext, buttonText; features needs an array of feature objects with icon names from lucide-react).
    
    Be creative and extremely detailed with content. Ensure every section feels premium.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            theme: { type: Type.STRING },
            font: { type: Type.STRING },
            sections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  type: { type: Type.STRING },
                  content: { type: Type.OBJECT }
                },
                required: ["id", "type", "content"]
              }
            }
          },
          required: ["title", "description", "theme", "font", "sections"]
        }
      }
    });

    const result = JSON.parse(response.text);
    return {
      ...result,
      id: Math.random().toString(36).substring(7),
    };
  } catch (error) {
    console.error("Failing back to mock due to error:", error);
    // Fallback mock
    return {
      id: "fallback",
      title: "Visionary Startup",
      description: "The next generation of intelligent platforms.",
      theme: "Dark",
      font: "Inter",
      sections: [
        {
          id: "hero-1",
          type: "hero",
          content: {
            heading: "Accelerate Your Future",
            subtext: "Intelligent solutions for modern problems.",
            buttonText: "Join Now",
          }
        },
        {
          id: "features-1",
          type: "features",
          content: {
            features: [
              { title: "AI Driven", description: "Powered by advanced neural networks.", icon: "Brain" },
              { title: "Ultra Fast", description: "Optimized for extreme performance.", icon: "Zap" }
            ]
          }
        }
      ]
    };
  }
}
