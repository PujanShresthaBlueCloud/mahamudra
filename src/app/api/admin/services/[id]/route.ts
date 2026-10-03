import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { serviceUpdateSchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { logAdminAction } from "@/lib/audit";
import { handleApiError, noStore } from "@/lib/api-helpers";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    await requireAdmin();
    const { id } = await params;

    const service = await prisma.program.findUnique({ where: { id } });
    if (!service) return NextResponse.json({ error: "Service not found." }, { status: 404 });

    return noStore(NextResponse.json({ service }));
  } catch (err) {
    return handleApiError(err);
  }
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    const { userId, email } = await requireAdmin();
    const { id } = await params;

    const { allowed } = checkRateLimit(`services:write:${userId}`);
    if (!allowed) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

    const json = await req.json();
    const parsed = serviceUpdateSchema.safeParse(json);
    if (!parsed.success) {
      console.log("parsed inside patch function error------------------------------");
      return NextResponse.json({ error: "Invalid input.", details: parsed.error.flatten() }, { status: 400 });
    }
    
    const service = await prisma.program.update({ where: { id }, data: parsed.data });

    await logAdminAction({
      actorId: userId,
      actorEmail: email,
      action: "service.update",
      targetId: id,
      metadata: { fields: Object.keys(parsed.data) },
    });

    return noStore(NextResponse.json({ service }));
  } catch (err) {
    return handleApiError(err);
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    const { userId, email } = await requireAdmin();
    const { id } = await params;

    const { allowed } = checkRateLimit(`services:write:${userId}`);
    if (!allowed) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

    // Guard against deleting a service that still has bookings tied to
    // it — the schema's onDelete: Restrict would throw anyway, but this
    // gives a clearer error message.
    const bookingCount = await prisma.registration.count({ where: { programId: id } });
    if (bookingCount > 0) {
      return NextResponse.json(
        { error: `Can't delete: ${bookingCount} booking(s) reference this service. Unpublish it instead.` },
        { status: 409 }
      );
    }

    await prisma.program.delete({ where: { id } });

    await logAdminAction({ actorId: userId, actorEmail: email, action: "program.delete", targetId: id });

    return noStore(NextResponse.json({ success: true }));
  } catch (err) {
    return handleApiError(err);
  }
}
