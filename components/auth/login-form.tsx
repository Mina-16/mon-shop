"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  function validate() {
    const newErrors: { email?: string; password?: string } = {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "بريد إلكتروني غير صحيح";
    }
    if (!password || password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

async function onSubmit(e: React.FormEvent) {
  e.preventDefault();
  if (!validate()) return;

  setIsLoading(true);
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      return;
    }

    toast.success("تم تسجيل الدخول بنجاح");

    const session = await fetch("/api/auth/session").then(r => r.json());
    const role = session?.user?.role;

    if (role === "ADMIN") {
      router.push("/admin");
    } else {
      router.push("/");
    }

    router.refresh();
  } catch {
    toast.error("حدث خطأ، حاول مرة أخرى");
  } finally {
    setIsLoading(false);
  }
}

  async function handleGoogleSignIn() {
    setIsGoogleLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch {
      toast.error("حدث خطأ مع تسجيل الدخول بـ Google");
      setIsGoogleLoading(false);
    }
  }

  return (
    <Card className="shadow-lg border-border">
      <CardContent className="pt-6">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              البريد الإلكتروني
            </label>
            <Input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              كلمة المرور
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                جاري الدخول...
              </>
            ) : (
              "تسجيل الدخول"
            )}
          </Button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">أو</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading}
        >
          {isGoogleLoading ? (
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          ) : (
            <FcGoogle className="ml-2 h-5 w-5" />
          )}
          المتابعة مع Google
        </Button>
      </CardContent>

      <CardFooter className="flex justify-center pb-6">
        <p className="text-sm text-muted-foreground">
          ليس لديك حساب؟{" "}
          <a href="/register" className="text-primary font-medium hover:underline">
            إنشاء حساب
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}