"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-28">

      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

      <div className="container relative mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge */}
          <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            Modern E-Commerce Platform
          </div>

          {/* Title */}
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
            Discover Premium
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Shopping Experience
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Explore modern products with premium quality,
            lightning-fast delivery, and a beautiful shopping experience.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <button className="rounded-2xl bg-primary px-8 py-4 font-medium text-primary-foreground shadow-lg shadow-primary/25 transition hover:scale-105 hover:bg-secondary">
              Shop Now
            </button>

            <button className="rounded-2xl border border-border bg-background px-8 py-4 font-medium transition hover:bg-accent">
              Explore Products
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}