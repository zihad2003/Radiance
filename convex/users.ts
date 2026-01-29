import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const saveRoutine = mutation({
    args: {
        userId: v.string(),
        routine: v.any(),
        name: v.string(),
    },
    handler: async (ctx: any, args: any) => {
        const user = await ctx.db.get(args.userId as any);
        if (!user) throw new Error("User not found");

        const newRoutine = {
            id: crypto.randomUUID(),
            name: args.name,
            data: args.routine,
            createdAt: Date.now(),
        };

        const currentRoutines = user.routines || [];

        await ctx.db.patch(args.userId as any, {
            routines: [...currentRoutines, newRoutine]
        });

        return newRoutine.id;
    },
});
