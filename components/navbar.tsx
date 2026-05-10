"use client";

import Link from "next/link";

import {
  ShoppingCart,
  Store,
} from "lucide-react";

import ThemeToggle from "./theme-toggle";

import { useCart } from "@/store/use-cart";

export default function Navbar() {
  const items = useCart((state) => state.items);

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
            <Store className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-xl font-black tracking-tight">
              Nova Shop
            </h1>

            <p className="text-xs text-muted-foreground">
              Modern Store
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            Home
          </Link>

          <Link
            href="/shop"
            className="text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            Shop
          </Link>

          <Link
            href="/categories"
            className="text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            Categories
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">

          <ThemeToggle />

          {/* Cart */}
          <Link
            href="/cart"
            className="relative rounded-2xl border border-border bg-card p-3 transition hover:scale-105 hover:border-primary hover:bg-accent"
          >
            <ShoppingCart className="h-5 w-5" />

            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-lg">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}