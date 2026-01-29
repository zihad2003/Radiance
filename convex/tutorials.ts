
import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";

export const generate = action({
    args: {
        topic: v.string(), // e.g., "Bridal Classic look", "Smokey Eye for blue eyes"
        skillLevel: v.optional(v.string()) // e.g., "Beginner", "Advanced"
    },
    handler: async (ctx, args) => {
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            throw new Error("OpenAI API Key not configured.");
        }

        const openai = new OpenAI({ apiKey });

        // Construct the prompt
        const userPrompt = `Create a detailed makeup tutorial for: "${args.topic}". 
    ${args.skillLevel ? `Target Audience: ${args.skillLevel}` : ''}
    
    Return the response ONLY as valid JSON matching this structure:
    {
      "title": "Title of the Look",
      "description": "Brief engaging description",
      "estimatedTime": "e.g., 45 mins",
      "difficulty": "Beginner/Intermediate/Advanced",
      "steps": [
        { "step": 1, "title": "Step Title", "instruction": "Detailed instruction...", "productType": "e.g., Primer" },
        ...
      ],
      "products": [
        { "type": "Foundation", "recommendation": "Product Name", "reason": "Why this product?" },
        ...
      ],
      "proTips": ["Tip 1", "Tip 2"]
    }`;

        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "You are a Master Makeup Artist and Educator. You create clear, professional, and easy-to-follow makeup tutorials. Always format your response as strict JSON."
                    },
                    {
                        role: "user",
                        content: userPrompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 1500,
                response_format: { type: "json_object" } // Enforce JSON mode if supported by model, otherwise prompt does it
            });

            const content = response.choices[0].message.content;
            if (!content) throw new Error("No content generated");

            return JSON.parse(content);

        } catch (error) {
            console.error("Tutorial Generation Error:", error);
            throw new Error("Failed to generate tutorial. Please try again.");
        }
    },
});
