import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateIcon() {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: 'A high-quality, minimalist mobile app icon for a Ramadan app. The icon features a sleek, modern orange crescent moon on a soft light gray background with a subtle neumorphic shadow effect. Professional, clean, and elegant design.',
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      },
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return part.inlineData.data;
    }
  }
}

// This script is just for reference of how I'd generate it if I could run it here.
// Since I can't easily pipe binary data, I will use a high-quality placeholder URL 
// or a generated one if the platform allows.
// Actually, I'll just use a high-quality Picsum image as a placeholder for now 
// but I'll describe how the user can replace it.
