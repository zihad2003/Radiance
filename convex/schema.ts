import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    products: defineTable({
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
    }).index("by_id", ["id"]).index("by_category", ["category"]).index("by_brand", ["brand"]),

    orders: defineTable({
        orderId: v.string(),
        total: v.number(),
        items: v.array(v.any()),
        delivery: v.any(),
        method: v.string(),
        timestamp: v.string(),
        status: v.string(), // pending, processing, shipped, delivered
    }).index("by_orderId", ["orderId"]),

    bookings: defineTable({
        bookingId: v.string(),
        service: v.string(),
        date: v.string(),
        time: v.string(),
        customer: v.any(),
        status: v.string(),
    }).index("by_date", ["date"]),
});
