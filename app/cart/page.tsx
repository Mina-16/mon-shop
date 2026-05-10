"use client";

import Image from "next/image";

import {
  ShoppingBag,
  Trash2,
  ArrowRight,
} from "lucide-react";

import { useCart } from "@/store/use-cart";

export default function CartPage() {
  const items = useCart((state) => state.items);

  const removeItem = useCart(
    (state) => state.removeItem
  );

  const totalPrice = items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <main className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
          <ShoppingBag className="h-12 w-12 text-primary" />
        </div>

        <h1 className="text-4xl font-black">
          Your Cart is Empty
        </h1>

        <p className="mt-4 max-w-md text-muted-foreground">
          Looks like you haven't added any
          products to your shopping cart yet.
        </p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-20">
      
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-black tracking-tight">
          Shopping Cart
        </h1>

        <p className="mt-3 text-muted-foreground">
          Review your selected products before
          checkout.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_400px]">

        {/* Cart Items */}
        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col gap-5 rounded-3xl border border-border/60 bg-card p-5 shadow-sm transition hover:shadow-xl sm:flex-row sm:items-center"
            >
              
              {/* Image */}
              <div className="relative h-32 w-full overflow-hidden rounded-2xl sm:w-32">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold">
                  {item.name}
                </h2>

                <p className="mt-2 text-muted-foreground">
                  Premium quality product for
                  modern lifestyle.
                </p>

                <div className="mt-4 flex items-center gap-4">
                  <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                    Quantity: {item.quantity}
                  </span>

                  <span className="text-2xl font-black text-primary">
                    $
                    {(
                      item.price * item.quantity
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Remove */}
              <button
                onClick={() =>
                  removeItem(item.id)
                }
                className="flex h-12 w-12 items-center justify-center rounded-2xl border transition hover:border-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-5 w-5 text-destructive" />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="sticky top-24 h-fit rounded-3xl border border-border/60 bg-card p-8 shadow-xl">
          
          <h2 className="text-3xl font-black">
            Order Summary
          </h2>

          <div className="mt-8 space-y-5">
            
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Products
              </span>

              <span className="font-semibold">
                {items.length}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Shipping
              </span>

              <span className="font-semibold">
                Free
              </span>
            </div>

            <div className="h-px bg-border" />

            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">
                Total
              </span>

              <span className="text-3xl font-black text-primary">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Checkout */}
          <button
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/30 transition hover:scale-[1.02] hover:opacity-90"
          >
            Checkout

            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </main>
  );
}