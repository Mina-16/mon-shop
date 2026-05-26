import { LoginForm } from "@/components/auth/login-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">مرحباً بعودتك</h1>
          <p className="text-muted-foreground mt-2">سجل دخولك إلى Nova Shop</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}