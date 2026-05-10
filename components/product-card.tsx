"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

import { useCart } from "@/store/use-cart";

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

export default function ProductCard({
  id,
  name,
  price,
  image,
  category,
}: ProductCardProps) {
  const addItem = useCart((state) => state.addItem);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="overflow-hidden rounded-3xl border bg-card shadow-sm"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="h-72 w-full object-cover"
        />

        <div className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs text-white">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-xl font-bold">
            {name}
          </h3>

          <p className="text-muted-foreground">
            Premium product
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ${price}
          </span>

          <button
            onClick={() => {
              addItem({
                id,
                name,
                price,
                imageUrl: image,
                quantity: 1,
              });

            //   alert("Added To Cart");
            }}
            className="flex items-center gap-2 rounded-2xl bg-primary px-4 py-2 text-white"
          >
            <ShoppingCart className="h-4 w-4" />

            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}