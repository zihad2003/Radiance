
import { action, internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import Replicate from "replicate";

// 1. Caching Helpers (must be exported for internal use)
export const getCachedImage = internalQuery({
    args: { inputImageUrl: v.string(), preset: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("generated_images")
            .withIndex("by_input", (q) => q.eq("inputImageUrl", args.inputImageUrl).eq("preset", args.preset))
            .first();
    },
});

export const saveGeneratedImage = internalMutation({
    args: {
        prompt: v.string(),
        inputImageUrl: v.string(),
        outputImageUrl: v.string(),
        preset: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("generated_images", {
            ...args,
            timestamp: Date.now(),
        });
    },
});

// 2. Main Action
export const generateMakeover = action({
    args: {
        imageUrl: v.string(),
        prompt: v.string(),
        strength: v.optional(v.number())
    },
    handler: async (ctx, args) => {
        if (!process.env.REPLICATE_API_TOKEN) {
            return [args.imageUrl];
        }
        const cached = await ctx.runQuery(internal.ai.getCachedImage, {
            inputImageUrl: args.imageUrl,
            preset: args.prompt
        });

        if (cached) {
            console.log("Returning cached AI result");
            return [cached.outputImageUrl];
        }

        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });

        const model = "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b";

        try {
            const output = await replicate.run(model, {
                input: {
                    image: args.imageUrl,
                    prompt: args.prompt + ", 8k resolution, photorealistic, beauty makeup, intricate details, professional lighting",
                    negative_prompt: "low quality, distortion, ugly, text, watermark, bad anatomy",
                    strength: args.strength || 0.6,
                    guidance_scale: 7.5,
                    num_inference_steps: 30
                }
            });

            if (Array.isArray(output) && output.length > 0) {
                await ctx.runMutation(internal.ai.saveGeneratedImage, {
                    inputImageUrl: args.imageUrl,
                    prompt: args.prompt,
                    preset: args.prompt,
                    outputImageUrl: output[0]
                });
            }

            return output;
        } catch (error) {
            console.error("Replicate Error:", error);
            throw new Error("Failed to generate makeover. Please check API configuration.");
        }
    },
});

export const analyzeSkin = action({
    args: { imageUrl: v.string() },
    handler: async (_ctx, args) => {
        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });

        // Use a Vision model (e.g., BLIP or LLaVA) to analyze the face
        const model = "salesforce/blip:2e1dddc8621f72155f24cf2e0adbde548458d3cab9f00c0139eea840d0ac4746";

        try {
            const output = await replicate.run(model, {
                input: {
                    image: args.imageUrl,
                    task: "visual_question_answering",
                    question: "Analyze the skin condition of the person in this photo. Describe skin type, hydration, acne, wrinkles, and texture in detail."
                }
            });

            // Parse the text output efficiently in production. 
            // For now we return the raw text analysis and some mocked metrics based on it.
            return {
                analysisText: output,
                metrics: {
                    hydration: Math.floor(Math.random() * 30) + 70, // Mock
                    roughness: Math.floor(Math.random() * 20),
                    acne: Math.floor(Math.random() * 10),
                    wrinkles: Math.floor(Math.random() * 10),
                },
                skinType: "Combination", // Simplified
                score: 85
            };
        } catch (error) {
            console.error("Skin Analysis Error:", error);
            throw new Error("Failed to analyze skin.");
        }
    },
});
