import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createBooking = mutation({
    args: {
        service: v.string(),
        date: v.string(),
        time: v.string(),
        customer: v.object({
            name: v.string(),
            phone: v.string(),
            address: v.string(),
            email: v.optional(v.string()), // Updated schema to match usage
            homeService: v.optional(v.boolean()),
        }),
        status: v.string(),
    },
    handler: async (ctx, args) => {
        const bookingId = await ctx.db.insert("bookings", {
            bookingId: `RAD${Date.now()}`,
            service: args.service,
            date: args.date,
            time: args.time,
            customer: args.customer,
            status: args.status,
        });
        return bookingId;
    },
});

export const getBookings = query({
    handler: async (ctx) => {
        return await ctx.db.query("bookings").order("desc").collect();
    },
});

export const updateStatus = mutation({
    args: { id: v.id("bookings"), status: v.string() },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { status: args.status });
    },
});
