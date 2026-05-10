"use client";

import { useCart } from "@/store/use-cart";

export default function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const addItem = useCart((s) => s.addItem);

  return (
    <main className="container mx-auto py-20">
      <h1 className="text-4xl font-bold">
        Product {params.id}
      </h1>

      <button
        onClick={() =>
          addItem({
            id: params.id,
            name: "Demo Product",
            price: 100,
            imageUrl: "",
            quantity: 1,
          })
        }
        className="mt-10 rounded-xl bg-primary px-6 py-3 text-white"
      >
        Add To Cart
      </button>
    </main>
  );
}