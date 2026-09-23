import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for generating AI Recipes
  app.post("/api/generate-recipes", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY environment variable is required" });
      }
      
      const { ingredients, style, time, budget } = req.body;
      if (!ingredients || ingredients.length === 0) {
        return res.status(400).json({ error: "Please provide ingredients." });
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `
You are India's most advanced AI Recipe Generator. The user wants to cook something and has selected these ingredients: ${ingredients.join(", ")}.
${style ? `Cooking Style Preference: ${style}.` : ''}
${time ? `Time Preference: ${time}.` : ''}
${budget ? `Budget Preference: ${budget}.` : ''}

Generate 3 diverse and best possible recipes they can make. Do not just use a fixed list. Generate creative, practical, and delicious Indian or global dishes tailored to these ingredients. Rank them (e.g., Perfect Match, Quick Match, etc.).

For EACH recipe, provide exactly this JSON structure, and output ONLY a JSON array of these objects:
[{
    "matchType": "Perfect Match",
    "name": "Recipe Name in English",
    "hindiName": "Hindi Name",
    "prepTime": "10 mins",
    "cookTime": "20 mins",
    "totalTime": "30 mins",
    "difficulty": "Easy",
    "calories": "250 kcal",
    "protein": "5g",
    "carbs": "30g",
    "fat": "10g",
    "fiber": "4g",
    "servingSize": "2 people",
    "estimatedCost": "₹50",
    "ingredientsUsed": ["Ingredient1", "Ingredient2"],
    "missingIngredients": ["Missing1", "Missing2"],
    "missingQuantity": {"Missing1": "200g", "Missing2": "1 tsp"},
    "missingEstimatedPrice": {"Missing1": "₹20", "Missing2": "₹5"},
    "alternativeIngredients": {"Missing1": "Alt1"},
    "aajKyaBanaooTools": ["Pan", "Spatula"],
    "cookingMethod": "Stovetop",
    "steps": ["Step 1", "Step 2"],
    "tips": "Cooking tip here",
    "chefTips": "Chef tip here",
    "healthBenefits": "Good for you",
    "storageTips": "Refrigerate for 2 days",
    "shelfLife": "2 Days",
    "suitableFor": ["Vegetarian", "Adults"],
    "imagePrompt": "A highly appetizing close up food photography of [Recipe Name]"
}]

Respond ONLY with the JSON array, no markdown wrappers, no additional text.`;

      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
      });

      let text = response.text || "[]";
      // Clean up markdown if any
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();
      
      const recipes = JSON.parse(text);
      res.json({ recipes });
    } catch (error) {
        console.error("AI Generation Error:", error);
        res.status(500).json({ error: "Failed to generate recipes. " + (error instanceof Error ? error.message : "") });
    }
  });


  app.post("/api/chef-chat", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY environment variable is required" });
      }
      
      const { recipeName, message } = req.body;
      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `You are an expert Indian AI Chef. The user is cooking "${recipeName}". They asked: "${message}". Give a brief, helpful, and friendly response (max 3 sentences).`;

      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
      });

      res.json({ reply: response.text });
    } catch (error) {
        console.error("Chef Chat Error:", error);
        res.status(500).json({ error: "Failed to connect to AI Chef." });
    }
  });

  
  // API route for generating AI Schemes
  app.post("/api/find-schemes", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY environment variable is required" });
      }
      
      const { profile } = req.body;
      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `You are India's most advanced AI Government Scheme Finder (Meri Yojna). 
Analyze this user profile: ${JSON.stringify(profile)}
Recommend 4 suitable government schemes (Central and State) they are eligible for.
For EACH scheme, provide exactly this JSON structure, and output ONLY a JSON array of these objects:
[{
    "name": "Scheme Name",
    "provider": "Central / State Govt",
    "description": "Short description",
    "benefits": "Estimated financial or social benefits",
    "eligibilitySummary": "Why they are eligible based on their profile",
    "documentsRequired": ["Aadhaar", "PAN", "Income Certificate"],
    "applicationSteps": ["Step 1", "Step 2"],
    "applicationTimeline": "e.g. 15-30 Days",
    "renewalInformation": "e.g. Yearly renewal required",
    "faqs": [{"q": "Question?", "a": "Answer"}],
    "officialLink": "https://example.gov.in"
}]
Respond ONLY with the JSON array, no markdown wrappers, no additional text.`;

      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
      });

      let text = response.text || "[]";
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const schemes = JSON.parse(text);
      res.json({ schemes });
    } catch (error) {
        console.error("AI Generation Error:", error);
        res.status(500).json({ error: "Failed to find schemes. " + (error instanceof Error ? error.message : "") });
    }
  });


  // API route for generating AI Study Material
  app.post("/api/generate-study", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY environment variable is required" });
      }
      
      const { course, topic, type } = req.body;
      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `You are India's best AI Teacher (Last Night Padhai). 
      The student is studying for "${course}". 
      The topic is "${topic}". 
      They requested: "${type}". 
      Generate highly effective, accurate, and easy-to-understand study material for this exact request. 
      Use bullet points, clear headings, and simple language (can mix English and easy Hindi terminology if helpful).
      If they asked for MCQs, provide 10 questions with answers.
      If Mock Test, provide a structured mini-test.
      Limit response to 800 words.`;

      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
      });
      
      res.json({ text: response.text });
    } catch (error) {
        console.error("AI Study Error:", error);
        res.status(500).json({ error: "Failed to generate study material." });
    }
  });

  // Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
