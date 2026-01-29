import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const submitContact = mutation({
    args: {
        firstName: v.string(),
        lastName: v.string(),
        email: v.string(),
        subject: v.string(),
        message: v.string(),
    },
    handler: async (ctx: any, args: any) => {
        return await ctx.db.insert("contacts", {
            ...args,
            createdAt: Date.now(),
        });
    },
});

export const subscribeNewsletter = mutation({
    args: {
        email: v.string(),
    },
    handler: async (ctx: any, args: any) => {
        const existing = await ctx.db
            .query("newsletters")
            .withIndex("by_email", (q: any) => q.eq("email", args.email))
            .unique();

        if (existing) {
            return existing._id;
        }

        return await ctx.db.insert("newsletters", {
            email: args.email,
            createdAt: Date.now(),
        });
    },
});
