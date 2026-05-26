import type { Metadata } from "next";
import "@uploadthing/react/styles.css";

import {
  Geist,
  Geist_Mono,
  Inter,
} from "next/font/google";

import "./globals.css";

import { cn } from "@/lib/utils";
// import Navbar from "@/components/navbar";
import CartHydrator from "@/components/cart-hydrator";
import AuthProvider from "@/providers/session-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nova Shop",
  description: "Modern E-Commerce Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full scroll-smooth",
        inter.variable,
        geistSans.variable,
        geistMono.variable
      )}
    >
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased"
        )}
      >
        <AuthProvider>
        {/* <Navbar /> */}

        <CartHydrator />
        <main className="flex-1">
          {children}
        </main>
        </AuthProvider>

      </body>
    </html>
  );
}