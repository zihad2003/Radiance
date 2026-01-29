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
        concerns: v.optional(v.array(v.string())),
        texture: v.string(),
        rating: v.number(),
        reviews: v.number(),
        inStock: v.boolean(),
        architecture: v.any(),
        image: v.optional(v.union(v.string(), v.null())),
    }).index("by_product_id", ["id"]).index("by_category", ["category"]).index("by_brand", ["brand"]),



    bookings: defineTable({
        bookingId: v.string(),
        service: v.string(),
        date: v.string(),
        time: v.string(),
        customer: v.any(),
        status: v.string(),
        userId: v.optional(v.string()),
    }).index("by_date", ["date"]).index("by_user", ["userId"]),

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
        delivery: v.any(),
        paymentMethod: v.string(),
        status: v.string(),
        userId: v.optional(v.string()), // Link to user if logged in
        timestamp: v.number(),
    }).index("by_orderId", ["orderId"]).index("by_user", ["userId"]),

    ai_cache: defineTable({
        key: v.string(), // Hash of input params
        endpoint: v.string(), // "skinAnalysis" | "recommendations" | "chat"
        data: v.any(),
        timestamp: v.number(),
    }).index("by_key", ["key", "endpoint"]),

    users: defineTable({
        phone: v.optional(v.string()),
        name: v.optional(v.string()),
        email: v.string(),
        passwordHash: v.optional(v.string()),
        points: v.number(),
        level: v.string(),
        savedLooks: v.array(v.object({
            id: v.string(),
            imageUrl: v.string(),
            type: v.string(),
            timestamp: v.number(),
        })),
        routines: v.optional(v.array(v.object({
            id: v.string(),
            name: v.string(),
            data: v.any(),
            createdAt: v.number()
        }))),
        createdAt: v.number(),
    }).index("by_phone", ["phone"]).index("by_email", ["email"]),

    contacts: defineTable({
        firstName: v.string(),
        lastName: v.string(),
        email: v.string(),
        subject: v.string(),
        message: v.string(),
        createdAt: v.number(),
    }),

    newsletters: defineTable({
        email: v.string(),
        createdAt: v.number(),
    }).index("by_email", ["email"]),

    reviews: defineTable({
        productId: v.string(),
        userName: v.string(),
        rating: v.number(),
        comment: v.string(),
        timestamp: v.number(),
    }).index("by_product", ["productId"]),

    skinAnalysisResults: defineTable({
        userId: v.optional(v.string()),
        sessionId: v.string(),
        timestamp: v.number(),
        overallScore: v.number(),
        skinType: v.string(),
        agePrediction: v.number(),
        metrics: v.object({
            hydration: v.object({ score: v.number(), level: v.string() }),
            radiance: v.object({ score: v.number(), level: v.string() }),
            firmness: v.optional(v.object({ score: v.number(), level: v.string() })),
        }),
        concerns: v.any(),
        faceMap: v.any(),
        foundationShade: v.optional(v.object({ hex: v.string(), name: v.string() })),
        products: v.array(v.any()),
    }).index("by_user", ["userId"]).index("by_session", ["sessionId"]),
});
