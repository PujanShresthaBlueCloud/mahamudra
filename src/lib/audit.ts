import "server-only";
import { prisma } from "@/lib/db";

export async function logAdminAction(params: {
  actorId: string;
  actorEmail: string;
  action: string;
  targetId?: string;
  metadata?: Record<string, unknown>;
}) {
  // Audit logging must never block or fail the actual request, so
  // errors here are swallowed (and should be shipped to your log
  // aggregator in production rather than silently dropped).
  try {
    await prisma.auditLog.create({
      data: {
        actorId: params.actorId,
        actorEmail: params.actorEmail,
        action: params.action,
        targetId: params.targetId,
        metadata: params.metadata as never,
      },
    });
  } catch (err) {
    console.error("Failed to write audit log:", err);
  }
}
