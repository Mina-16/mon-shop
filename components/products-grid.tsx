import ProductCard from "./product-card";
import { products } from "@/constants/products";

export default function ProductsGrid() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold">Featured Products</h2>

          <p className="mt-4 text-muted-foreground">
            Discover our most popular premium products
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={String(product.id)}
              name={product.name}
              price={product.price}
              image={product.image}
              category={product.category}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
