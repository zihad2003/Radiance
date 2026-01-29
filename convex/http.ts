import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

/**
 * AUTH HELPERS
 */
const validateStaffToken = (request: any) => {
    const authHeader = request.headers.get("Authorization");
    // SIMULATION: In a real app, this would verify a JWT or check a database session
    // For this demo, we use a simple static token or a specific pattern
    return authHeader === "Bearer radiance-staff-secret-2026";
};

// --- PRODUCT ENDPOINTS ---
http.route({
    path: "/api/products",
    method: "GET",
    handler: httpAction(async (ctx: any) => {
        const products = await ctx.runQuery(api.products.list);
        return new Response(JSON.stringify(products), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });
    }),
});

http.route({
    path: "/api/products/get",
    method: "GET",
    handler: httpAction(async (ctx: any, request: any) => {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) return new Response("Missing id parameter", { status: 400 });

        const product = await ctx.runQuery(api.products.getById, { id });
        if (!product) return new Response("Product not found", { status: 404 });

        return new Response(JSON.stringify(product), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });
    }),
});

// --- ORDER ENDPOINTS ---
http.route({
    path: "/api/orders",
    method: "POST",
    handler: httpAction(async (ctx: any, request: any) => {
        try {
            const body = await request.json();

            // Basic Validation
            if (!body.items || !body.delivery || !body.total) {
                return new Response("Missing required order fields", { status: 400 });
            }

            const orderId = `REST-${Date.now()}`;
            const id = await ctx.runMutation(api.orders.createOrder, {
                orderId,
                total: body.total,
                items: body.items,
                delivery: body.delivery,
                method: body.method || "cod",
                status: "pending",
            });

            return new Response(JSON.stringify({ success: true, id, orderId }), {
                status: 201,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message || "Invalid JSON" }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                }
            });
        }
    }),
});

// --- ADMIN SECURE ENDPOINTS ---
http.route({
    path: "/api/admin/bookings",
    method: "GET",
    handler: httpAction(async (ctx: any, request: any) => {
        if (!validateStaffToken(request)) {
            return new Response(JSON.stringify({ error: "Unauthorized access" }), {
                status: 401,
                headers: { "Content-Type": "application/json" }
            });
        }

        const bookings = await ctx.runQuery(api.bookings.getBookings);
        return new Response(JSON.stringify(bookings), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }),
});

// --- USER PROFILE ENDPOINTS ---
http.route({
    path: "/api/profile",
    method: "GET",
    handler: httpAction(async (ctx: any, request: any) => {
        const { searchParams } = new URL(request.url);
        const phone = searchParams.get("phone");
        if (!phone) return new Response("Missing phone parameter", { status: 400 });

        const profile = await ctx.runQuery(api.users.getProfile, { phone });
        if (!profile) return new Response("Profile not found", { status: 404 });

        return new Response(JSON.stringify(profile), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });
    }),
});

// --- CORS PREFLIGHT ---
http.route({
    path: "/api/*",
    method: "OPTIONS",
    handler: httpAction(async () => {
        return new Response(null, {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
        });
    }),
});

export default http;
