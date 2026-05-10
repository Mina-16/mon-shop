import { config } from "dotenv";
config(); // loads .env

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // First create a category if you don't have one
  const category = await prisma.category.create({
    data: {
      name: "Phones",
    },
  });

  const product = await prisma.product.create({
    data: {
      name: "iPhone 15",
      description: "iphoooooons",
      price: 999,
      imageUrl: "https://images.unsplash.com/photo-iphone",
      stock: 10,
      featured: false,
      categoryId: category.id,
    },
  });

  console.log("Created category:", category);
  console.log("Created product:", product);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());