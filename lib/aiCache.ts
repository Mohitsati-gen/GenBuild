// lib/aiCache.ts
import { createHash } from "crypto";
import { redis } from "./redis";

function cacheKey(prompt: string, fileData: unknown) {
  const raw = prompt + JSON.stringify(fileData ?? {});
  const hash = createHash("sha256").update(raw).digest("hex");
  return `ai-cache:${hash}`;
}

export async function getCached(prompt: string, fileData: unknown) {
  return redis.get<{
    assistantMessage: string;
    title?: string;
    files: Record<string, { code: string }>;
    dependencies: Record<string, string>;
  }>(cacheKey(prompt, fileData));
}

export async function setCached(
  prompt: string,
  fileData: unknown,
  result: unknown,
  ttlSeconds = 3600
) {
  await redis.set(cacheKey(prompt, fileData), result, { ex: ttlSeconds });
}