import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
    args: {},
    handler: async (ctx: any) => {
        return await ctx.db.query("services").collect();
    },
});

export const addService = mutation({
    args: {
        id: v.string(),
        name: v.string(),
        category: v.string(),
        price: v.number(),
        duration: v.string(),
        description: v.string(),
        image: v.string(),
        popular: v.boolean(),
    },
    handler: async (ctx: any, args: any) => {
        const existing = await ctx.db.query("services").filter((q: any) => q.eq(q.field("id"), args.id)).first();
        if (existing) {
            await ctx.db.patch(existing._id, args);
            return existing._id;
        }
        return await ctx.db.insert("services", args);
    },
});

export const deleteService = mutation({
    args: { id: v.id("services") },
    handler: async (ctx: any, args: any) => {
        await ctx.db.delete(args.id);
    },
});
