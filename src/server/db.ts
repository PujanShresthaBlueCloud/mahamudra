import { PrismaClient } from "@prisma/client";

// Prevents exhausting database connections in development, where Next.js
// hot-reloads modules but Node keeps the old module instances around.
// This file is the ONLY place PrismaClient should be instantiated.
// Nothing in src/components or src/app should import "@prisma/client"
// directly — always go through src/server/services/*.

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
