import { ProductsClient } from "@/components/admin/products-client";
import { prisma } from "@/lib/prisma";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany(),
  ]);

  return <ProductsClient products={products} categories={categories} />;
}