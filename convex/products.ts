import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
    args: {},
    handler: async (ctx: any) => {
        return await ctx.db.query("products").collect();
    },
});

export const getByCategory = query({
    args: { category: v.string() },
    handler: async (ctx: any, args: any) => {
        return await ctx.db
            .query("products")
            .withIndex("by_category", (q: any) => q.eq("category", args.category))
            .collect();
    },
});

export const getByBrand = query({
    args: { brand: v.string() },
    handler: async (ctx: any, args: any) => {
        return await ctx.db
            .query("products")
            .withIndex("by_brand", (q: any) => q.eq("brand", args.brand))
            .collect();
    },
});

export const getById = query({
    args: { id: v.string() },
    handler: async (ctx: any, args: any) => {
        return await ctx.db
            .query("products")
            .withIndex("by_product_id", (q: any) => q.eq("id", args.id))
            .unique();
    },
});

export const filter = query({
    args: {
        skinType: v.optional(v.string()),
        concern: v.optional(v.string()),
        minPrice: v.optional(v.number()),
        maxPrice: v.optional(v.number()),
    },
    handler: async (ctx: any, args: any) => {
        let products = await ctx.db.query("products").collect();

        if (args.skinType) {
            products = products.filter((p: any) =>
                p.skinType.includes(args.skinType) || p.skinType.includes("All Skin Types")
            );
        }

        if (args.concern) {
            products = products.filter((p: any) =>
                p.concerns?.includes(args.concern)
            );
        }

        if (args.minPrice !== undefined) {
            products = products.filter((p: any) => p.priceUSD >= args.minPrice);
        }

        if (args.maxPrice !== undefined) {
            products = products.filter((p: any) => p.priceUSD <= args.maxPrice);
        }

        return products;
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
    handler: async (ctx: any, args: any) => {
        const existing = await ctx.db
            .query("products")
            .withIndex("by_product_id", (q: any) => q.eq("id", args.id))
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
    handler: async (ctx: any, args: any) => {
        for (const product of args.products) {
            const existing = await ctx.db
                .query("products")
                .withIndex("by_product_id", (q: any) => q.eq("id", product.id))
                .first();

            if (existing) {
                await ctx.db.patch(existing._id, product);
            } else {
                await ctx.db.insert("products", product);
            }
        }
    },
});
