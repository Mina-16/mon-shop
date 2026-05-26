"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "حدث خطأ");
        return;
      }

      toast.success("تم إنشاء الحساب بنجاح");
      router.push("/login");
    } catch {
      toast.error("حدث خطأ، حاول مرة أخرى");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border bg-card p-8 shadow-xl">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Create Account
        </h1>

        <form onSubmit={onSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border bg-background px-4 py-3"
            disabled={isLoading}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border bg-background px-4 py-3"
            disabled={isLoading}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border bg-background px-4 py-3"
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-2xl bg-primary py-3 font-medium text-white disabled:opacity-50"
          >
            {isLoading ? "جاري الإنشاء..." : "Create Account"}
          </button>
        </form>
      </div>
    </main>
  );
}