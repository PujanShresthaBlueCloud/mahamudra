import { prisma } from "@/server/db";
import type { ContactInput } from "@/lib/validation";

export async function createContactMessage(input: ContactInput) {
  return prisma.contactMessage.create({
    data: {
      name: input.name,
      email: input.email,
      subject: input.subject,
      message: input.message,
    },
  });
}
