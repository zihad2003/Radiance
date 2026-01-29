import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get or Create user by phone
export const getOrCreateUser = mutation({
    args: {
        phone: v.string(),
        name: v.optional(v.string()),
        email: v.optional(v.string()),
    },
    handler: async (ctx: any, args: any) => {
        const existing = await ctx.db
            .query("users")
            .withIndex("by_phone", (q: any) => q.eq("phone", args.phone))
            .unique();

        if (existing) {
            // Update optional info if provided and missing
            const updates: any = {};
            if (args.name && !existing.name) updates.name = args.name;
            if (args.email && !existing.email) updates.email = args.email;

            if (Object.keys(updates).length > 0) {
                await ctx.db.patch(existing._id, updates);
            }
            return existing;
        }

        // Create new user
        const userId = await ctx.db.insert("users", {
            phone: args.phone,
            name: args.name,
            email: args.email,
            points: 100, // Welcome points
            level: "Bronze",
            savedLooks: [],
            createdAt: Date.now(),
        });

        return await ctx.db.get(userId);
    },
});

// Update user points
export const addPoints = mutation({
    args: { phone: v.string(), amount: v.number(), reason: v.string() },
    handler: async (ctx: any, args: any) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_phone", (q: any) => q.eq("phone", args.phone))
            .unique();

        if (!user) throw new Error("User not found");

        const newPoints = user.points + args.amount;

        // Tier logic
        let newLevel = user.level;
        if (newPoints >= 2500) newLevel = "Platinum";
        else if (newPoints >= 1000) newLevel = "Gold";
        else if (newPoints >= 500) newLevel = "Silver";

        await ctx.db.patch(user._id, {
            points: newPoints,
            level: newLevel,
        });

        return { points: newPoints, level: newLevel };
    },
});

// Save a virtual look
export const saveLook = mutation({
    args: {
        userId: v.string(),
        look: v.object({
            id: v.string(),
            imageUrl: v.string(),
            type: v.string(),
        }),
    },
    handler: async (ctx: any, args: any) => {
        const user = await ctx.db.get(args.userId);
        if (!user) throw new Error("User not found");

        const savedLooks = [...user.savedLooks, { ...args.look, timestamp: Date.now() }];

        await ctx.db.patch(user._id, { savedLooks });
        return true;
    },
});

export const saveLookByPhone = mutation({
    args: {
        phone: v.string(),
        look: v.object({
            id: v.string(),
            imageUrl: v.string(),
            type: v.string(),
        }),
    },
    handler: async (ctx: any, args: any) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_phone", (q: any) => q.eq("phone", args.phone))
            .unique();

        if (!user) throw new Error("User not found");

        const savedLooks = [...user.savedLooks, { ...args.look, timestamp: Date.now() }];

        await ctx.db.patch(user._id, { savedLooks });
        return true;
    },
});

// Get user profile by ID
export const getProfileById = query({
    args: { userId: v.id("users") },
    handler: async (ctx: any, args: any) => {
        return await ctx.db.get(args.userId);
    },
});

// Get user profile
export const getProfile = query({
    args: { phone: v.string() },
    handler: async (ctx: any, args: any) => {
        return await ctx.db
            .query("users")
            .withIndex("by_phone", (q: any) => q.eq("phone", args.phone))
            .unique();
    },
});
