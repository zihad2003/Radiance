import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("products").collect();
    },
});

export const getByCategory = query({
    args: { category: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("products")
            .withIndex("by_category", (q) => q.eq("category", args.category))
            .collect();
    },
});

export const addProduct = mutation({
    args: {
        id: v.string(),
        name: v.string(),
        brand: v.string(),
        category: v.string(),
        type: v.string(),
        shade: v.optional(v.string()),
        hex: v.string(),
        finish: v.string(),
        opacity: v.number(),
        price: v.number(),
        priceUSD: v.number(),
        currency: v.string(),
        description: v.string(),
        ingredients: v.array(v.string()),
        skinType: v.array(v.string()),
        texture: v.string(),
        rating: v.number(),
        reviews: v.number(),
        inStock: v.boolean(),
        architecture: v.any(),
        image: v.optional(v.union(v.string(), v.null())),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("products")
            .withIndex("by_id", (q) => q.eq("id", args.id))
            .first();

        if (existing) {
            await ctx.db.patch(existing._id, args);
            return existing._id;
        }

        return await ctx.db.insert("products", args);
    },
});

export const bulkAdd = mutation({
    args: { products: v.array(v.any()) },
    handler: async (ctx, args) => {
        for (const product of args.products) {
            const existing = await ctx.db
                .query("products")
                .withIndex("by_id", (q) => q.eq("id", product.id))
                .first();

            if (existing) {
                await ctx.db.patch(existing._id, product);
            } else {
                await ctx.db.insert("products", product);
            }
        }
    },
});
