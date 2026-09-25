import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { UnauthorizedError, ForbiddenError } from "@/lib/auth";

/**
 * Central error->response mapping. Keeping this in one place means every
 * route fails the same safe way instead of each one deciding ad hoc what
 * to leak to the client. Prisma error details and stack traces never go
 * in the response body — only a generic message plus server-side logging.
 */
export function handleApiError(err: unknown) {
  if (err instanceof UnauthorizedError) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
  if (err instanceof ForbiddenError) {
    return NextResponse.json({ error: err.message }, { status: 403 });
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return NextResponse.json({ error: "A record with that value already exists." }, { status: 409 });
    }
    if (err.code === "P2025") {
      return NextResponse.json({ error: "Record not found." }, { status: 404 });
    }
  }

  console.error("Unhandled API error:", err);
  return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
}

export function noStore(response: NextResponse) {
  // Admin data should never be cached by the browser or an intermediary.
  response.headers.set("Cache-Control", "no-store, max-age=0");
  return response;
}
