"use node";
import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";

export const analyze = action({
    args: {
        image: v.string(), // Base64 string
    },
    handler: async (ctx, args) => {
        const apiKey = process.env.OPENAI_API_KEY;

        // MOCK DATA FALLBACK (If no API key)
        if (!apiKey) {
            console.log("No API Key found. Returning mock analysis.");
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing
            return {
                concerns: {
                    acne: { score: 30, level: "Mild", description: "Some redness and minor congestion detected in T-zone." },
                    wrinkles: { score: 12, level: "Minimal", description: "Fine lines appearing around eyes (crow's feet)." },
                    darkCircles: { score: 65, level: "Moderate", description: "Visible shadows under eyes, likely due to dehydration or sleep." },
                    dryness: { score: 45, level: "Moderate", description: "Skin appears slightly tight/dull on cheeks." }
                },
                routine: [
                    { step: "Cleanser", product: "Hydrating Milk Cleanser", why: "To clean without stripping moisture." },
                    { step: "Serum", product: "Vitamin C + Hyaluronic Acid", why: "To brighten dark circles and hydrate." },
                    { step: "Treatment", product: "Salicylic Acid Spot Treat", why: "For mild T-zone congestion." },
                    { step: "Moisturizer", product: "Peptide Barrier Cream", why: "To repair dryness and plump fine lines." }
                ],
                recommendedService: "HydraFacial Deluxe",
                foundationShade: { hex: "#e0ac69", name: "Warm Beige" }, // Mock shade
                bookingLink: "/booking?service=hydrafacial"
            };
        }

        const openai = new OpenAI({ apiKey });

        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4o", // Using GPT-4o for robust vision capabilities
                messages: [
                    {
                        role: "system",
                        content: `You are an expert Dermatologist and Esthetician AI at Radiance Salon. 
            Analyze the user's selfie for 4 specific concerns: Acne, Wrinkles, Dark Circles, Dryness.
            Also perform a precise Color Match analysis to recommend a foundation shade.
            
            Return JSON only:
            {
              "concerns": {
                "acne": { "score": 0-100, "level": "String", "description": "String" },
                "wrinkles": { "score": 0-100, "level": "String", "description": "String" },
                "darkCircles": { "score": 0-100, "level": "String", "description": "String" },
                "dryness": { "score": 0-100, "level": "String", "description": "String" }
              },
              "foundationShade": { "hex": "#RRGGBB", "name": "String (e.g. Ivory, Beige, Mocha)" },
              "routine": [
                { "step": "String", "product": "String", "why": "String" }
              ],
              "recommendedService": "String",
              "bookingLink": "/booking"
            }
            
            Be polite, clinical, yet encouraging. Never give medical diagnoses (e.g. "eczema"), just cosmetic observations.`
                    },
                    {
                        role: "user",
                        content: [
                            { type: "text", text: "Analyze my skin health." },
                            { type: "image_url", image_url: { url: args.image } }
                        ]
                    }
                ],
                max_tokens: 1000,
                response_format: { type: "json_object" }
            });

            const content = response.choices[0].message.content;
            if (!content) throw new Error("No analysis generated");

            return JSON.parse(content);

        } catch (error) {
            console.error("Skin Analysis Error:", error);
            throw new Error("Analysis failed. Please try again with a clearer photo.");
        }
    },
});
