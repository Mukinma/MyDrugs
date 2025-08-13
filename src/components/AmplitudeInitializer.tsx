"use client";

import { useEffect } from "react";

export default function AmplitudeInitializer() {
  useEffect(() => {
    const w = window as any;
    if (!w.amplitude?.init) return;
    try {
      w.amplitude.init("demo-api-key", { defaultTracking: true });
    } catch {}
  }, []);
  return null;
}
