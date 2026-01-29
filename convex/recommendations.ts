
import { action } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { v } from "convex/values";
import OpenAI from "openai";

export const generate = action({
    args: {
        skinProfile: v.object({
            skinType: v.string(),
            concerns: v.any(), // Object with scores
            agePrediction: v.number(),
            metrics: v.any(), // Hydration, etc.
        }),
        preferences: v.object({
            budget: v.optional(v.string()), // 'low', 'medium', 'high'
            goals: v.array(v.string()),
            allergies: v.array(v.string()),
        }),
    },
    handler: async (ctx: any, args: any): Promise<any> => {
        const apiKey = process.env.OPENAI_API_KEY;

        // Fetch all products from internal query
        const products: any[] = await ctx.runQuery(api.products.list);

        // Generate Cache Key
        const cacheKey = JSON.stringify({
            type: args.skinProfile.skinType,
            concerns: Object.keys(args.skinProfile.concerns).sort(),
            goals: args.preferences.goals.sort()
        });

        // Helper to hydrate product data
        const hydrate = (list: any[]): any[] => list.map((item: any) => {
            const product: any = products.find((p: any) => p.id === item.productId);
            return { ...item, product };
        }).filter((item: any) => item.product);

        // 1. Check Cache
        const cached: any = await ctx.runQuery(internal.aiUtils.getCache, { key: cacheKey, endpoint: "recommendations" });
        if (cached) {
            console.log("Returning cached recommendations");
            return {
                morning: hydrate(cached.morning || []),
                evening: hydrate(cached.evening || []),
                treatments: hydrate(cached.treatments || [])
            };
        }

        // Optimize product list for prompt (reduce token usage)
        const inventoryContext = products.map((p: any) => ({
            id: p.id,
            name: p.name,
            brand: p.brand,
            category: p.category,
            ingredients: p.ingredients,
            price: p.priceUSD,
            skinType: p.skinType,
            description: p.description
        }));

        if (!apiKey) {
            console.log("No API Key. Returning mock recommendations.");
            // Simple mock logic
            return {
                morning: products.slice(0, 3).map((p: any) => ({ product: p, reason: "Good for daily use." })),
                evening: products.slice(3, 6).map((p: any) => ({ product: p, reason: "Repairing at night." })),
                treatments: []
            };
        }

        const openai = new OpenAI({ apiKey });

        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    {
                        role: "system",
                        content: `You are an expert Dermatologist AI at Radiance Salon. 
                        Your goal is to build a personalized skincare routine for a user based on their skin analysis and the available inventory.
                        
                        RULES:
                        1. Select products ONLY from the provided inventory list. Do not hallucinate products.
                        2. Consider skin type compatibility, ingredient synergies, and contraindications (e.g. don't mix Retinol with Vitamin C directly if sensitive).
                        3. Respect budget and allergies.
                        4. Structure into Morning (Protection/Hydration) and Evening (Repair/Treatment).
                        
                        Return JSON:
                        {
                            "morning": [ { "productId": "id", "reason": "Why this product?" } ],
                            "evening": [ { "productId": "id", "reason": "Why this product?" } ],
                            "treatments": [ { "productId": "id", "reason": "Why this treatment?", "frequency": "Weekly/Twice a week" } ]
                        }`
                    },
                    {
                        role: "user",
                        content: JSON.stringify({
                            userProfile: args.skinProfile,
                            preferences: args.preferences,
                            inventory: inventoryContext
                        })
                    }
                ],
                response_format: { type: "json_object" }
            });

            const content = response.choices[0].message.content;
            if (!content) throw new Error("No recommendations generated");

            const recommendations = JSON.parse(content);

            // Save to Cache
            await ctx.runMutation(internal.aiUtils.setCache, {
                key: cacheKey,
                endpoint: "recommendations",
                data: recommendations
            });

            // Hydrate product IDs back to full product objects
            return {
                morning: hydrate(recommendations.morning || []),
                evening: hydrate(recommendations.evening || []),
                treatments: hydrate(recommendations.treatments || [])
            };

        } catch (error) {
            console.error("Recommendation Error:", error);
            throw new Error("Failed to generate recommendations.");
        }
    },
});
