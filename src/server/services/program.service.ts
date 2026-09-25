import { prisma } from "@/server/db";

/// Returns active programs, newest first — used by the home page's
/// Programs carousel and the Registration form's program dropdown.
export async function getActivePrograms() {
  return prisma.program.findMany({
    where: { isActive: true },
    orderBy: { startDate: "asc" },
  });
}

export async function getProgramBySlug(slug: string) {
  return prisma.program.findUnique({ where: { slug } });
}
