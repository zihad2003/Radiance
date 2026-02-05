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
            email: v.optional(v.string()),
            homeService: v.optional(v.boolean()),
            referralCode: v.optional(v.string()),
            specialRequests: v.optional(v.string()),
            whatsappNotification: v.optional(v.boolean()),
        }),
        status: v.string(),
        userId: v.optional(v.string()),
    },
    handler: async (ctx: any, args: any) => {
        const bookingId = await ctx.db.insert("bookings", {
            bookingId: `RAD${Date.now()}`,
            service: args.service,
            date: args.date,
            time: args.time,
            customer: args.customer,
            status: args.status,
            userId: args.userId,
        });
        return bookingId;
    },
});

export const getBookings = query({
    handler: async (ctx: any) => {
        return await ctx.db.query("bookings").order("desc").collect();
    },
});

export const getBookingsByUserId = query({
    args: { userId: v.string() },
    handler: async (ctx: any, args: any) => {
        return await ctx.db
            .query("bookings")
            .withIndex("by_user", (q: any) => q.eq("userId", args.userId))
            .collect();
    },
});

export const updateStatus = mutation({
    args: { id: v.id("bookings"), status: v.string() },
    handler: async (ctx: any, args: any) => {
        await ctx.db.patch(args.id, { status: args.status });
    },
});
