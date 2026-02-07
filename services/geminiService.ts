import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SocialPlatform } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateSocialPost = async (
  platform: SocialPlatform,
  destination: string,
  topic: string,
  tone: string,
  audience: string
): Promise<string> => {
  try {
    const prompt = `
      Act as a social media expert for a travel brand.
      Generate a ${platform} post about ${destination}.
      
      Topic: ${topic}
      Brand Tone: ${tone}
      Target Audience: ${audience}

      Requirements:
      - Platform specific style (e.g., hashtags for Instagram, professional for LinkedIn).
      - Engaging hook.
      - Call to Action (CTA).
      - Relevant hashtags.
      
      Return only the post content, no conversational filler.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Failed to generate content.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI service. Please check your API key.";
  }
};

export const generateImageCaption = async (
  base64Image: string,
  mimeType: string,
  tone: string
): Promise<string> => {
  try {
    const prompt = `
      Analyze this travel photo and write an engaging Instagram caption for it.
      Tone: ${tone}.
      Include 5 relevant hashtags.
      Return only the caption.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image
            }
          },
          { text: prompt }
        ]
      }
    });

    return response.text || "Failed to generate caption.";
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    return "Error analyzing image.";
  }
};
