import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";
import { handleApiError, noStore } from "@/lib/api-helpers";

export async function GET() {
  try {
    const { userId } = await requireAdmin();

    const { allowed } = checkRateLimit(`bookings:list:${userId}`);
    if (!allowed) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      include: { service: { select: { title: true } } },
    });

    return noStore(NextResponse.json({ bookings }));
  } catch (err) {
    return handleApiError(err);
  }
}
