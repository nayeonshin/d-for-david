import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  rooms: defineTable({
    code: v.string(),
    text: v.string(),
    createdAt: v.number(),
    expiresAt: v.number(),
    creatorToken: v.string(),
    updatedAt: v.number(),
  }).index("by_code", ["code"]),
});
