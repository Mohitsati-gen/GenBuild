import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis"; // Imports your existing configuration

export const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "60 s"), // 5 generations per minute
  analytics: true,
  prefix: "@upstash/ratelimit",
});