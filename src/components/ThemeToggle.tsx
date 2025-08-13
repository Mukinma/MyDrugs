"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <button
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/10"
      aria-label="Toggle theme"
    >
      <span
        aria-hidden
        className="size-4 rounded-full border bg-white shadow dark:border-white/30 dark:bg-black"
      />
      <span className="font-mono" suppressHydrationWarning>
        {mounted ? (theme === "dark" ? "Dark" : "Light") : "Theme"}
      </span>
    </button>
  );
}
