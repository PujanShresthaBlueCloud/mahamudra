import "server-only";
import { auth, clerkClient } from "@clerk/nextjs/server";

export class UnauthorizedError extends Error {
  status = 401;
}
export class ForbiddenError extends Error {
  status = 403;
}

/**
 * Reads the caller's role. We check the session claim first (fast, no
 * network call — requires a custom session token claim configured in the
 * Clerk dashboard: Sessions -> Customize session token ->
 *   { "metadata": "{{user.public_metadata}}" }
 * and falls back to fetching the user directly if that claim isn't set up
 * yet, so this works even before you've done that configuration step.
 */
async function getRole(): Promise<{ userId: string | null; role: string | null; email: string | null }> {
  const { userId, sessionClaims } = await auth();
  if (!userId) return { userId: null, role: null, email: null };

  const claimRole = (sessionClaims?.metadata as { role?: string } | undefined)?.role;
  if (claimRole) {
    const email =
      (sessionClaims?.email as string | undefined) ??
      (sessionClaims?.["email"] as string | undefined) ??
      null;
    return { userId, role: claimRole, email };
  }

  // Fallback: one extra network call to Clerk's API. Cheap in practice
  // (admin actions are not high-frequency), and keeps this working even
  // without the session-claim configuration above.
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const role = (user.publicMetadata as { role?: string } | undefined)?.role ?? null;
  const email = user.emailAddresses[0]?.emailAddress ?? null;
  return { userId, role, email };
}

/**
 * Throws if the caller isn't signed in, or is signed in but not an admin.
 * Call this at the very top of every admin server component and every
 * admin API route — never rely on the client hiding a button as the only
 * gate, since that can always be bypassed by calling the API directly.
 */
export async function requireAdmin() {
  const { userId, role, email } = await getRole();

  if (!userId) throw new UnauthorizedError("You must be signed in.");
  if (role !== "admin") throw new ForbiddenError("This action requires admin access.");

  return { userId, email: email ?? "unknown" };
}
