import { v } from "convex/values";
import {
  mutation,
  query,
  internalMutation,
} from "./_generated/server";

const ROOM_TTL_MS = 30 * 60 * 1000; // 30 minutes
const MAX_CODE_ATTEMPTS = 20;
const CODE_ADJECTIVES = [
  "AQUA",
  "BRIGHT",
  "CALM",
  "COZY",
  "EASY",
  "FRESH",
  "MINT",
  "NICE",
  "SUNNY",
  "TIDY",
];

const CODE_NOUNS = [
  "BREEZE",
  "CLOUD",
  "COVE",
  "FERN",
  "GROVE",
  "HARBOR",
  "MAPLE",
  "MEADOW",
  "RIVER",
  "WAVE",
];

function generateReadableRoomCode(): string {
  const adjective =
    CODE_ADJECTIVES[Math.floor(Math.random() * CODE_ADJECTIVES.length)];
  const noun = CODE_NOUNS[Math.floor(Math.random() * CODE_NOUNS.length)];
  return `${adjective}-${noun}`;
}

function generateToken(): string {
  return crypto.randomUUID().replace(/-/g, "");
}

export const createRoom = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const expiresAt = now + ROOM_TTL_MS;
    const creatorToken = generateToken();

    let code = "";
    let attempts = 0;

    while (attempts < MAX_CODE_ATTEMPTS) {
      code = generateReadableRoomCode();
      const existing = await ctx.db
        .query("rooms")
        .withIndex("by_code", (q) => q.eq("code", code))
        .first();

      if (!existing || existing.expiresAt <= now) {
        break;
      }
      attempts++;
    }

    if (attempts >= MAX_CODE_ATTEMPTS) {
      throw new Error("Could not generate a unique room code. Please try again.");
    }

    await ctx.db.insert("rooms", {
      code,
      text: "",
      createdAt: now,
      expiresAt,
      creatorToken,
      updatedAt: now,
    });

    return { code, creatorToken };
  },
});

export const getRoomByCode = query({
  args: { code: v.string() },
  handler: async (ctx, { code }) => {
    const normalizedCode = code.toUpperCase().trim();
    const room = await ctx.db
      .query("rooms")
      .withIndex("by_code", (q) => q.eq("code", normalizedCode))
      .first();

    if (!room) {
      return { status: "not_found" as const };
    }

    const now = Date.now();
    if (room.expiresAt <= now) {
      return { status: "expired" as const, code: room.code };
    }

    return {
      status: "active" as const,
      code: room.code,
      text: room.text,
      createdAt: room.createdAt,
      expiresAt: room.expiresAt,
      updatedAt: room.updatedAt,
    };
  },
});

export const updateRoomText = mutation({
  args: {
    code: v.string(),
    text: v.string(),
    creatorToken: v.string(),
  },
  handler: async (ctx, { code, text, creatorToken }) => {
    const normalizedCode = code.toUpperCase().trim();
    const room = await ctx.db
      .query("rooms")
      .withIndex("by_code", (q) => q.eq("code", normalizedCode))
      .first();

    if (!room) {
      throw new Error("Room not found");
    }

    const now = Date.now();
    if (room.expiresAt <= now) {
      throw new Error("Room has expired");
    }

    if (room.creatorToken !== creatorToken) {
      throw new Error("Not authorized to edit this room");
    }

    await ctx.db.patch(room._id, {
      text,
      updatedAt: now,
    });
  },
});

export const clearRoomText = mutation({
  args: {
    code: v.string(),
    creatorToken: v.string(),
  },
  handler: async (ctx, { code, creatorToken }) => {
    const normalizedCode = code.toUpperCase().trim();
    const room = await ctx.db
      .query("rooms")
      .withIndex("by_code", (q) => q.eq("code", normalizedCode))
      .first();

    if (!room) {
      throw new Error("Room not found");
    }

    const now = Date.now();
    if (room.expiresAt <= now) {
      throw new Error("Room has expired");
    }

    if (room.creatorToken !== creatorToken) {
      throw new Error("Not authorized to edit this room");
    }

    await ctx.db.patch(room._id, {
      text: "",
      updatedAt: now,
    });
  },
});

export const cleanupExpiredRooms = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const rooms = await ctx.db.query("rooms").collect();

    for (const room of rooms) {
      if (room.expiresAt <= now) {
        await ctx.db.delete(room._id);
      }
    }
  },
});
