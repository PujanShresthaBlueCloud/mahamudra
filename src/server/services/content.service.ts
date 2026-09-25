import { prisma } from "@/server/db";

export async function getTeachers() {
  return prisma.teacher.findMany({ orderBy: { order: "asc" } });
}

export async function getTestimonials() {
  return prisma.testimonial.findMany({ orderBy: { order: "asc" } });
}
