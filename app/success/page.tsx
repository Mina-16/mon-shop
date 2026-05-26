import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold">✅ تم الدفع بنجاح!</h1>
      <p className="text-muted-foreground">شكراً لطلبك، سيتم التواصل معك قريباً.</p>
      <Link href="/" className="bg-black text-white px-6 py-3 rounded-xl">
        العودة للرئيسية
      </Link>
    </div>
  );
}