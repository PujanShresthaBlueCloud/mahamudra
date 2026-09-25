import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { serviceCreateSchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { logAdminAction } from "@/lib/audit";
import { handleApiError, noStore } from "@/lib/api-helpers";
console.log("Inside the route here top -----------------");
export async function GET() {
  try {
    const { userId } = await requireAdmin();

    const { allowed } = checkRateLimit(`services:list:${userId}`);
    if (!allowed) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

    const services = await prisma.program.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { registrations: true } } },
    });

    return noStore(NextResponse.json({ services }));
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId, email } = await requireAdmin();

    const { allowed } = checkRateLimit(`services:write:${userId}`);
    if (!allowed) return NextResponse.json({ error: "Too many requests." }, { status: 429 });
    console.log("Inside the post route here -----------------");

    const json = await req.json();

    const parsed = serviceCreateSchema.safeParse(json);
    console.log("Inside the post route here 11 -----------------");

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input.", details: parsed.error.flatten() }, { status: 400 });
    }
    console.log(parsed.data, "parsed data ---------");
    const service = await prisma.program.create({ data: parsed.data });

    await logAdminAction({
      actorId: userId,
      actorEmail: email,
      action: "service.create",
      targetId: service.id,
    });

    return noStore(NextResponse.json({ service }, { status: 201 }));
  } catch (err) {
    return handleApiError(err);
  }
}
