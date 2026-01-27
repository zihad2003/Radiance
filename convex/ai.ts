"use node";
import { action, internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";
import { api, internal } from "./_generated/api";
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
        // A. Check Cache
        // Note: Data URI caching is tricky if base64 is huge. 
        // Ideally, we hash it or use a stored file ID. 
        // For this demo, we assume the client might send the same Data URI or URL.
        // Length check to avoid massive keys? Convex limits? 
        // Let's rely on prompt matching mostly or assume inputs are stable URLs in prod.
        // If it's a Data URI, it might be too large to index efficiently or use as key if not careful.
        // But let's try.

        // Extract preset name/style from prompt if possible, or pass it as arg. 
        // args.prompt is the full prompt. Let's use it as the 'preset' key for now or a shortened version.
        // Actually, let's just use the prompt as the preset key.

        const cached = await ctx.runQuery(internal.ai.getCachedImage, {
            inputImageUrl: args.imageUrl,
            preset: args.prompt // Using prompt as unique identifier for the style
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

            // B. Save to Cache
            // Replicate returns array of strings (URLs)
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
