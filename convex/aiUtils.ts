
import { action, internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";

// Internal cache logic
export const getCache = internalQuery({
    args: { key: v.string(), endpoint: v.string() },
    handler: async (ctx: any, args: any) => {
        const entry = await ctx.db.query("ai_cache")
            .withIndex("by_key", (q: any) => q.eq("key", args.key).eq("endpoint", args.endpoint))
            .first();

        // Cache valid for 24 hours
        if (entry && (Date.now() - entry.timestamp < 24 * 60 * 60 * 1000)) {
            return entry.data;
        }
        return null;
    }
});

export const setCache = internalMutation({
    args: { key: v.string(), endpoint: v.string(), data: v.any() },
    handler: async (ctx: any, args: any) => {
        // Cleanup old cache for this key if exists
        const existing = await ctx.db.query("ai_cache")
            .withIndex("by_key", (q: any) => q.eq("key", args.key).eq("endpoint", args.endpoint))
            .first();

        if (existing) await ctx.db.delete(existing._id);

        await ctx.db.insert("ai_cache", {
            key: args.key,
            endpoint: args.endpoint,
            data: args.data,
            timestamp: Date.now()
        });
    }
});

export const testConnection = action({
    args: {},
    handler: async (ctx: any) => {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) return { status: "error", message: "Missing OPENAI_API_KEY" };

        const openai = new OpenAI({ apiKey });
        const start = Date.now();

        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [{ role: "user", content: "Ping" }],
                max_tokens: 5
            });
            const latency = Date.now() - start;
            return {
                status: "success",
                latency: `${latency}ms`,
                response: response.choices[0].message.content
            };
        } catch (err: any) {
            return { status: "error", message: err.message };
        }
    }
});
