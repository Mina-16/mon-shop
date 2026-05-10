"use client";

import { Moon, Sun } from "lucide-react";
import useThemeMode from "@/hooks/use-theme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeMode();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full border border-border p-2 transition hover:bg-accent"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}