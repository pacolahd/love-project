import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  visits: defineTable({
    senderName: v.string(),
    receiverName: v.string(),
    viewedOption1: v.boolean(),
    viewedOption2: v.boolean(),
  }),

  followups: defineTable({
    visitId: v.id("visits"),
    name: v.string(),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
  }),

  shares: defineTable({
    senderName: v.string(),
    receiverName: v.string(),
  }),
});
