import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { bookingUpdateSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";
import { logAdminAction } from "@/lib/audit";
import { handleApiError, noStore } from "@/lib/api-helpers";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    const { userId, email } = await requireAdmin();
    const { id } = await params;

    const { allowed } = checkRateLimit(`bookings:write:${userId}`);
    if (!allowed) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

    const json = await req.json();
    const parsed = bookingUpdateSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input.", details: parsed.error.flatten() }, { status: 400 });
    }

    const booking = await prisma.booking.update({ where: { id }, data: parsed.data });

    await logAdminAction({
      actorId: userId,
      actorEmail: email,
      action: "booking.updateStatus",
      targetId: id,
      metadata: { status: parsed.data.status },
    });

    return noStore(NextResponse.json({ booking }));
  } catch (err) {
    return handleApiError(err);
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    const { userId, email } = await requireAdmin();
    const { id } = await params;

    await prisma.booking.delete({ where: { id } });
    await logAdminAction({ actorId: userId, actorEmail: email, action: "booking.delete", targetId: id });

    return noStore(NextResponse.json({ success: true }));
  } catch (err) {
    return handleApiError(err);
  }
}
