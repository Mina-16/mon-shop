"use client";

import { useState } from "react";
import ImageUpload from "@/components/upload-button";

export default function AdminProductsPage() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <main className="container mx-auto px-4 py-20">

      <h1 className="mb-10 text-5xl font-bold">
        Add Product
      </h1>

      <div className="max-w-2xl space-y-6 rounded-3xl border p-8">

        <input
          placeholder="Product Name"
          className="w-full rounded-2xl border bg-background px-4 py-3"
        />

        <textarea
          placeholder="Description"
          className="min-h-[120px] w-full rounded-2xl border bg-background px-4 py-3"
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full rounded-2xl border bg-background px-4 py-3"
        />

        <ImageUpload onChange={setImageUrl} />

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Uploaded"
            className="h-52 w-52 rounded-2xl object-cover"
          />
        )}

        <button
          className="rounded-2xl bg-primary px-8 py-3 text-white"
        >
          Create Product
        </button>

      </div>
    </main>
  );
}