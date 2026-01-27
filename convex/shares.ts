import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    senderName: v.string(),
    receiverName: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("shares", args);
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("shares").collect();
  },
});
