import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    visitId: v.id("visits"),
    name: v.string(),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("followups", args);
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("followups").collect();
  },
});

export const getByVisit = query({
  args: { visitId: v.id("visits") },
  handler: async (ctx, { visitId }) => {
    return await ctx.db
      .query("followups")
      .filter((q) => q.eq(q.field("visitId"), visitId))
      .collect();
  },
});
