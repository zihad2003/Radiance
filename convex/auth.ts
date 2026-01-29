
import { action, internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "radiance_salon_secure_fallback_secret_32_chars"
);

// --- INTERNAL HELPERS ---

export const getUserByEmail = internalQuery({
    args: { email: v.string() },
    handler: async (ctx: any, args: any) => {
        return await ctx.db
            .query("users")
            .withIndex("by_email", (q: any) => q.eq("email", args.email))
            .unique();
    },
});

export const createUserInternal = internalMutation({
    args: {
        email: v.string(),
        passwordHash: v.string(),
        name: v.optional(v.string()),
        phone: v.optional(v.string()),
    },
    handler: async (ctx: any, args: any) => {
        return await ctx.db.insert("users", {
            email: args.email,
            passwordHash: args.passwordHash,
            name: args.name,
            phone: args.phone,
            points: 100, // Welcome points
            level: "Bronze",
            savedLooks: [],
            createdAt: Date.now(),
        });
    },
});

// --- PUBLIC ACTIONS ---

export const register = action({
    args: {
        email: v.string(),
        password: v.string(),
        name: v.optional(v.string()),
        phone: v.optional(v.string()),
    },
    handler: async (ctx: any, args: any) => {
        // 1. Check if user exists
        const existing = await ctx.runQuery(internal.auth.getUserByEmail, { email: args.email });
        if (existing) {
            throw new Error("Email already registered");
        }

        // 2. Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(args.password, salt);

        // 3. Create user
        const userId = await ctx.runMutation(internal.auth.createUserInternal, {
            email: args.email,
            passwordHash,
            name: args.name,
            phone: args.phone,
        });

        // 4. Generate Token
        const token = await new SignJWT({ userId, email: args.email })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("2h")
            .sign(JWT_SECRET);

        return { token, userId };
    },
});

export const login = action({
    args: {
        email: v.string(),
        password: v.string(),
    },
    handler: async (ctx: any, args: any) => {
        const user = await ctx.runQuery(internal.auth.getUserByEmail, { email: args.email });
        if (!user || !user.passwordHash) {
            throw new Error("Invalid email or password");
        }

        const isValid = await bcrypt.compare(args.password, user.passwordHash);
        if (!isValid) {
            throw new Error("Invalid email or password");
        }

        const token = await new SignJWT({ userId: user._id, email: user.email })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("2h")
            .sign(JWT_SECRET);

        return {
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                phone: user.phone,
                points: user.points,
                level: user.level
            }
        };
    },
});

export const refreshToken = action({
    args: { token: v.string() },
    handler: async (_ctx: any, args: any) => {
        try {
            const { payload } = await jwtVerify(args.token, JWT_SECRET);

            const newToken = await new SignJWT(payload)
                .setProtectedHeader({ alg: "HS256" })
                .setIssuedAt()
                .setExpirationTime("2h")
                .sign(JWT_SECRET);

            return { token: newToken };
        } catch (e) {
            throw new Error("Session expired or invalid. Please login again.");
        }
    },
});

// Middleware simulation/Helper for other actions
export const verifyToken = async (token: string) => {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload;
    } catch (e) {
        return null;
    }
};
