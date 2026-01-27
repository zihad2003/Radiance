import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new order
export const createOrder = mutation({
    args: {
        orderId: v.string(),
        total: v.number(),
        items: v.any(), // Array of items
        delivery: v.object({
            fullName: v.string(),
            phone: v.string(),
            email: v.optional(v.string()),
            address: v.string(),
            area: v.string(),
            city: v.string(),
            landmark: v.optional(v.string()),
            saveAddress: v.optional(v.boolean()),
        }),
        method: v.string(), // Payment method
        status: v.string(), // 'pending', 'paid', 'shipped'
    },
    handler: async (ctx, args) => {
        const id = await ctx.db.insert("orders", {
            orderId: args.orderId,
            total: args.total,
            items: args.items,
            delivery: args.delivery,
            paymentMethod: args.method,
            status: args.status,
            timestamp: Date.now(),
        });
        return id;
    },
});

// Get user orders (by phone for now, since auth is minimal)
export const getOrdersByPhone = query({
    args: { phone: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("orders")
            .filter(q => q.eq(q.field("delivery.phone"), args.phone))
            .collect();
    }
});
