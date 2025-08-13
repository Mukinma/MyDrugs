"use client";

import { useEffect } from "react";

export default function AmplitudeInitializer() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
    const amp = (
      window as unknown as {
        amplitude?: { init?: (apiKey: string, options?: { defaultTracking?: boolean }) => void };
      }
    ).amplitude;
    if (!apiKey || !amp?.init) return;
    try {
      amp.init(apiKey, { defaultTracking: true });
    } catch {
      // no-op
    }
  }, []);
  return null;
}
