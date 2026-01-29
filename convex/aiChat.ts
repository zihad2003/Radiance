
import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { v } from "convex/values";
import OpenAI from "openai";

export const sendMessage = action({
    args: {
        message: v.string(),
        history: v.array(v.object({ role: v.string(), content: v.string() })),
        skinContext: v.optional(v.object({
            skinType: v.string(),
            concerns: v.any(),
            metrics: v.any(),
            age: v.number()
        })),
    },
    handler: async (ctx, args) => {
        const apiKey = process.env.OPENAI_API_KEY;

        // Fetch product inventory for simple RAG
        const products = await ctx.runQuery(api.products.list);
        const inventoryContext = products.map(p =>
            `- ${p.name} (${p.brand}): ${p.category} for ${p.skinType.join(', ')}. Good for ${p.concerns?.join(', ') || 'general use'}. Price: $${p.priceUSD}`
        ).join('\n');

        if (!apiKey) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return "I'm currently in demo mode (no API key). Based on your skin analysis, I'd recommend sticking to gentle cleansers and staying hydrated! How else can I help?";
        }

        const openai = new OpenAI({ apiKey });

        try {
            const systemPrompt = `You are "Radiance AI", an expert aesthetician and dermatologist assistant.
            
            USER CONTEXT:
            ${args.skinContext ? `
            - Skin Type: ${args.skinContext.skinType}
            - Concerns: ${Object.keys(args.skinContext.concerns).map(k => `${k} (${args.skinContext.concerns[k].score}% severity)`).join(', ')}
            - Age: ${args.skinContext.age}
            - Hydration: ${args.skinContext.metrics?.hydration?.score}%
            ` : "No specific skin analysis provided yet."}

            INVENTORY CONTEXT (Recommend these specific products when applicable):
            ${inventoryContext}

            GUIDELINES:
            1. Be empathetic, professional, and concise.
            2. Prioritize addressing the user's specific concerns from their profile.
            3. If recommending products, ONLY use those from the Inventory Context.
            4. Do not provide medical advice for severe conditions; suggest seeing a doctor.
            5. Keep responses under 3 sentences unless asked for a detailed routine.
            `;

            const response = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: systemPrompt },
                    ...args.history, // Previous messages
                    { role: "user", content: args.message }
                ],
                max_tokens: 300,
            });

            return response.choices[0].message.content;

        } catch (error) {
            console.error("AI Chat Error:", error);
            throw new Error("Failed to generate response.");
        }
    },
});
