"use client";

import { useEffect, useState } from "react";

export default function useThemeMode() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme") || "dark";

    setTheme(savedTheme);

    document.documentElement.classList.toggle(
      "dark",
      savedTheme === "dark"
    );
  }, []);

  const toggleTheme = () => {
    const newTheme =
      theme === "dark" ? "light" : "dark";

    setTheme(newTheme);

    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.toggle(
      "dark",
      newTheme === "dark"
    );
  };

  return {
    theme,
    toggleTheme,
  };
}   