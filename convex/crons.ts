import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "cleanup expired rooms",
  { minutes: 5 },
  internal.rooms.cleanupExpiredRooms
);

export default crons;
