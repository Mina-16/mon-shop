


import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/* Prisma Adapter - Prisma 7 API */
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

/* Prisma Client */
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

/* Prevent multiple instances in dev */
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
console.log("Prisma initialized:", !!prisma);
