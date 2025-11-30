// server/geminiClient.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

class GeminiClient {
  constructor(apiKey) {
    if (!apiKey) throw new Error("❌ GEMINI_API_KEY missing");

    this.modelName = "gemini-2.0-flash";
    this.genAI = new GoogleGenerativeAI(apiKey);

    // Prepare text + JSON models
    this.textModel = this.genAI.getGenerativeModel({
      model: this.modelName,
    });

    this.jsonModel = this.genAI.getGenerativeModel({
      model: this.modelName,
    });
  }

  // ---------------------------
  // TEXT OUTPUT (Chat Agent)
  // ---------------------------
  async generateText(prompt) {
    try {
      const result = await this.textModel.generateContent({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      });

      return result.response.text();
    } catch (err) {
      console.error("❌ Gemini TEXT Error:", err);
      throw new Error("Gemini failed to generate text: " + err.message);
    }
  }

  // ---------------------------
  // JSON OUTPUT (Categorize / Actions / Draft)
  // ---------------------------
  async generateJSON(prompt) {
    try {
      const result = await this.jsonModel.generateContent({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0,
          maxOutputTokens: 500,
          responseMimeType: "application/json",
        },
      });

      return JSON.parse(result.response.text());
    } catch (err) {
      console.error("❌ Gemini JSON Error:", err);
      throw new Error("Gemini failed to generate JSON: " + err.message);
    }
  }
}

module.exports = GeminiClient;
