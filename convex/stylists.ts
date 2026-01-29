import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
    args: {},
    handler: async (ctx: any) => {
        return await ctx.db.query("stylists").collect();
    },
});

export const addStylist = mutation({
    args: {
        id: v.string(),
        name: v.string(),
        role: v.string(),
        image: v.string(),
        bio: v.string(),
        specialty: v.array(v.string()),
        rating: v.number(),
        available: v.boolean(),
    },
    handler: async (ctx: any, args: any) => {
        const existing = await ctx.db.query("stylists").filter((q: any) => q.eq(q.field("id"), args.id)).first();
        if (existing) {
            await ctx.db.patch(existing._id, args);
            return existing._id;
        }
        return await ctx.db.insert("stylists", args);
    },
});

export const deleteStylist = mutation({
    args: { id: v.id("stylists") },
    handler: async (ctx: any, args: any) => {
        await ctx.db.delete(args.id);
    },
});
