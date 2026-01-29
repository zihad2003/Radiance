
import { action, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";

export const analyze = action({
    args: {
        image: v.string(), // Base64 string
    },
    handler: async (_, args) => {
        const apiKey = process.env.OPENAI_API_KEY;

        // MOCK DATA FALLBACK (If no API key)
        if (!apiKey) {
            console.log("No API Key found. Returning mock analysis.");
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing
            return {
                skinType: "Combination",
                agePrediction: 28,
                skinHydration: { score: 72, level: "Good" },
                skinRadiance: { score: 65, level: "Moderate" },
                concerns: {
                    acne: { score: 30, level: "Mild", description: "Some redness and minor congestion detected in T-zone." },
                    wrinkles: { score: 12, level: "Minimal", description: "Fine lines appearing around eyes (crow's feet)." },
                    darkCircles: { score: 65, level: "Moderate", description: "Visible shadows under eyes, likely due to dehydration or sleep." },
                    pores: { score: 55, level: "Visible", description: "Enlarged pores visible on nose and chin area." }
                },
                faceMap: {
                    "forehead": ["Fine Lines", "Dehydration"],
                    "nose": ["Blackheads", "Oiliness"],
                    "cheeks": ["Dryness", "Sensitivity"],
                    "chin": ["Congestion"]
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
                        content: `You are an expert Dermatologist AI at Radiance Salon. 
            Analyze the user's selfie for deep skin health metrics.
            
            Return JSON only:
            {
              "skinType": "String (Oily, Dry, Combination, Normal, Sensitive)",
              "agePrediction": Integer (Visual estimation),
              "skinHydration": { "score": 0-100, "level": "String" },
              "skinRadiance": { "score": 0-100, "level": "String" },
              "concerns": {
                "acne": { "score": 0-100, "level": "String", "description": "String" },
                "wrinkles": { "score": 0-100, "level": "String", "description": "String" },
                "darkCircles": { "score": 0-100, "level": "String", "description": "String" },
                "pores": { "score": 0-100, "level": "String", "description": "String" },
                "pigmentation": { "score": 0-100, "level": "String", "description": "String" }
              },
              "faceMap": {
                 "forehead": ["String"],
                 "eyes": ["String"],
                 "cheeks": ["String"],
                 "nose": ["String"],
                 "chin": ["String"]
              },
              "foundationShade": { "hex": "#RRGGBB", "name": "String (e.g. Ivory, Beige, Mocha)" },
              "routine": [
                { "step": "String", "product": "String", "why": "String" }
              ],
              "recommendedService": "String",
              "bookingLink": "/booking"
            }
            
            Be polite, clinical, yet encouraging. Never give medical diagnoses.`
                    },
                    {
                        role: "user",
                        content: [
                            { type: "text", text: "Analyze my skin health and provide a routine." },
                            { type: "image_url", image_url: { url: args.image } }
                        ]
                    }
                ],
                max_tokens: 1500,
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

export const saveResult = mutation({
    args: {
        userId: v.optional(v.string()),
        sessionId: v.string(),
        overallScore: v.number(),
        skinType: v.string(),
        agePrediction: v.number(),
        metrics: v.object({
            hydration: v.object({ score: v.number(), level: v.string() }),
            radiance: v.object({ score: v.number(), level: v.string() }),
            firmness: v.optional(v.object({ score: v.number(), level: v.string() })),
        }),
        concerns: v.any(),
        faceMap: v.any(),
        foundationShade: v.optional(v.object({ hex: v.string(), name: v.string() })),
        products: v.array(v.any()),
    },
    handler: async (ctx, args) => {
        const resultId = await ctx.db.insert("skinAnalysisResults", {
            ...args,
            timestamp: Date.now(),
        });
        return resultId;
    },
});

export const getResults = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("skinAnalysisResults")
            .withIndex("by_user", (q) => q.eq("userId", args.userId))
            .order("desc")
            .take(10);
    },
});

export const getLastResult = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("skinAnalysisResults")
            .withIndex("by_user", (q) => q.eq("userId", args.userId))
            .order("desc")
            .first();
    },
});
