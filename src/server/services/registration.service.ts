import { prisma } from "@/server/db";
import type { RegistrationInput } from "@/lib/validation";

export async function createRegistration(input: RegistrationInput) {
  return prisma.registration.create({
    data: {
      fullName: input.fullName,
      email: input.email,
      phone: input.phone || null,
      programId: input.programId || null,
      message: input.message || null,
    },
  });
}
