"use client";

import { useEffect, useMemo } from "react";

type Theme = "dark";

export function useTheme() {
  // Force dark class once on mount
  useEffect(() => {
    document.documentElement.classList.add("dark");
    try {
      // Clear any previous theme persistence
      window.localStorage.removeItem("theme");
      document.cookie = "theme=dark; path=/; max-age=31536000";
    } catch {}
  }, []);

  const api = useMemo(
    () => ({
      theme: "dark" as Theme,
      setTheme: () => {},
      toggle: () => {},
    }),
    []
  );

  return api;
}
