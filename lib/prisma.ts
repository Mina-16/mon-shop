// import { PrismaClient } from "@prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";
// import { Pool } from "pg";

// if (!process.env.DATABASE_URL) {
//   throw new Error("DATABASE_URL environment variable is not set");
// }

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// const adapter = new PrismaPg(pool);

// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     adapter,
//     log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
//   });

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }



import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/* PostgreSQL Pool */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/* Prisma Adapter */
const adapter = new PrismaPg(pool);

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
