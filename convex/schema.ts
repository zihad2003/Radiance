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



    bookings: defineTable({
        bookingId: v.string(),
        service: v.string(),
        date: v.string(),
        time: v.string(),
        customer: v.any(),
        status: v.string(),
    }).index("by_date", ["date"]),

    generated_images: defineTable({
        prompt: v.string(),
        inputImageUrl: v.string(),
        outputImageUrl: v.string(),
        preset: v.string(),
        timestamp: v.number(),
    }).index("by_input", ["inputImageUrl", "preset"]),

    orders: defineTable({
        orderId: v.string(),
        total: v.number(),
        items: v.any(),
        delivery: v.any(), // Storing object as any/json for flexibility or define structure
        paymentMethod: v.string(),
        status: v.string(),
        timestamp: v.number(),
    }).index("by_orderId", ["orderId"]),
});
