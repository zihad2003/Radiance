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
        userId: v.optional(v.string()),
    },
    handler: async (ctx: any, args: any) => {
        // --- CUSTOM VALIDATION ---
        if (args.total <= 0) {
            throw new Error("Order total must be greater than zero.");
        }
        if (!args.items || args.items.length === 0) {
            throw new Error("Order must contain at least one item.");
        }
        if (!args.delivery.phone.match(/^01[3-9]\d{8}$/)) {
            throw new Error("Invalid Bangladeshi phone number.");
        }

        const id = await ctx.db.insert("orders", {
            orderId: args.orderId,
            total: args.total,
            items: args.items,
            delivery: args.delivery,
            paymentMethod: args.method,
            status: args.status,
            userId: args.userId,
            timestamp: Date.now(),
        });
        return id;
    },
});

// List all orders
export const listOrders = query({
    handler: async (ctx: any) => {
        return await ctx.db.query("orders").order("desc").collect();
    },
});

// Get user orders by userId
export const getOrdersByUserId = query({
    args: { userId: v.string() },
    handler: async (ctx: any, args: any) => {
        return await ctx.db
            .query("orders")
            .withIndex("by_user", (q: any) => q.eq("userId", args.userId))
            .collect();
    }
});

// Get user orders (by phone fallback)
export const getOrdersByPhone = query({
    args: { phone: v.string() },
    handler: async (ctx: any, args: any) => {
        return await ctx.db
            .query("orders")
            .filter((q: any) => q.eq(q.field("delivery.phone"), args.phone))
            .collect();
    }
});
