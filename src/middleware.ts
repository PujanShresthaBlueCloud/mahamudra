import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)", "/api/admin(.*)"]);
const isPublicRoute = createRouteMatcher([
  "/",
  "/about-us",
  "/registration",
  "/code-of-conduct",
  "/support-us",
  "/contact-us",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    const { userId, sessionClaims, redirectToSignIn } = await auth();

    if (!userId) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // Cheap first-pass check using the session claim (see lib/auth.ts for
    // where the claim comes from). This is a fast reject at the edge —
    // it is NOT a substitute for the requireAdmin() check inside each
    // route/page, since middleware can be misconfigured or skipped for
    // some paths; treat this as defense-in-depth, not the only gate.
    const role = (sessionClaims?.metadata as { role?: string } | undefined)?.role;
    if (role && role !== "admin") {
      return NextResponse.redirect(new URL("/admin/unauthorized", req.url));
    }

    return NextResponse.next();
  }

  if (!isPublicRoute(req)) {
    // Any route not explicitly public and not under /admin still requires
    // sign-in by default (adjust to taste for your public site).
    const { userId, redirectToSignIn } = await auth();
    if (!userId) return redirectToSignIn({ returnBackUrl: req.url });
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|.*\\..*).*)",
    "/(api|trpc)(.*)",
  ],
};
