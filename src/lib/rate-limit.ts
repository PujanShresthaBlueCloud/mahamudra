// A minimal in-memory rate limiter, good enough for a single-instance
// deployment or as a first line of defense in front of the DB.
//
// IMPORTANT: this state resets on every server restart and is NOT shared
// across instances/regions. If you deploy on Vercel (multiple serverless
// instances) or run more than one server process, replace this with
// @upstash/ratelimit backed by Upstash Redis — same call signature, so
// the route handlers using `checkRateLimit()` won't need to change.
const buckets = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 60; // per key, per window — generous for an admin UI, tight for a script

export function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (bucket.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  bucket.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS - bucket.count };
}
