import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Categories from "@/components/categories";
import ProductsGrid from "@/components/products-grid";

export default function HomePage() {
  return (
    <main>
      {/* <Navbar /> */}

      <Hero />

      <Categories />

      <ProductsGrid />
    </main>
  );
}