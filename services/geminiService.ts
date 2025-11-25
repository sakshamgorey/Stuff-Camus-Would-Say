import { GoogleGenAI, Type, Schema } from "@google/genai";
import { CamusQuote } from "../types";
import { getFallbackQuote } from "./fallbackService";

// Initialize the client
// API key is guaranteed to be in process.env.API_KEY per environment setup
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const quoteSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    text: {
      type: Type.STRING,
      description: "The verbatim quote by Albert Camus.",
    },
    source: {
      type: Type.STRING,
      description: "The book, essay, or speech where the quote originated (e.g., 'The Myth of Sisyphus').",
    },
    context: {
      type: Type.STRING,
      description: "A very brief (max 10 words) context or theme of the quote (e.g., 'On Suicide', 'On Rebellion').",
    }
  },
  required: ["text", "source"],
};

export const fetchCamusQuote = async (): Promise<CamusQuote> => {
  try {
    const model = "gemini-2.5-flash";
    const prompt = "Generate a random, profound, and thought-provoking quote by Albert Camus. Ensure it is accurate. Vary the sources (The Stranger, The Plague, The Myth of Sisyphus, Notebooks, etc.). Do not repeat common cliches if possible.";

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: quoteSchema,
        temperature: 1.1, // Higher temperature for more variety/randomness
        systemInstruction: "You are an expert scholar on Albert Camus and Existentialism. You provide accurate quotes formatted strictly as JSON.",
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response from Gemini");
    }

    const data = JSON.parse(responseText) as CamusQuote;
    return data;
  } catch (error) {
    console.warn("Gemini API encountered an issue. Consulting local notebooks (Fallback).", error);
    // Return a local fallback quote instead of throwing an error
    return getFallbackQuote();
  }
};
