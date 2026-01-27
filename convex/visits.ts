import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: { senderName: v.string(), receiverName: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("visits", {
      ...args,
      viewedOption1: false,
      viewedOption2: false,
    });
  },
});

export const markOptionViewed = mutation({
  args: { visitId: v.id("visits"), option: v.number() },
  handler: async (ctx, { visitId, option }) => {
    const field = option === 1 ? "viewedOption1" : "viewedOption2";
    await ctx.db.patch(visitId, { [field]: true });
  },
});

export const get = query({
  args: { visitId: v.id("visits") },
  handler: async (ctx, { visitId }) => {
    return await ctx.db.get(visitId);
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("visits").collect();
  },
});
