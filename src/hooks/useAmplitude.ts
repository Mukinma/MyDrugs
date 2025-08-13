"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * Minimal Amplitude hook for CDN-loaded analytics-browser SDK.
 * Exposes init, track, identify helpers and an `isReady` flag.
 */

type AmplitudeSDK = {
  init: (apiKey: string) => void;
  track: (eventName: string, eventProperties?: Record<string, unknown>) => void;
  setUserId: (userId: string | null) => void;
  setUserProperties: (props: Record<string, unknown>) => void;
};

declare global {
  interface Window {
    amplitude?: AmplitudeSDK;
  }
}

export type AmplitudeApi = {
  init: (apiKey: string) => void;
  track: (eventName: string, eventProperties?: Record<string, unknown>) => void;
  setUserId: (userId: string | null) => void;
  setUserProperties: (props: Record<string, unknown>) => void;
  isReady: boolean;
};

export function useAmplitude(): AmplitudeApi {
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const check = () => {
      if (window.amplitude && typeof window.amplitude.init === "function") {
        setIsReady(true);
        return true;
      }
      return false;
    };

    if (check()) return;

    const id = window.setInterval(() => {
      if (check()) window.clearInterval(id);
    }, 100);

    return () => window.clearInterval(id);
  }, []);

  const api = useMemo<AmplitudeApi>(() => {
    return {
      init: (apiKey: string) => {
        if (!window.amplitude) return;
        try {
          window.amplitude.init(apiKey);
        } catch {}
      },
      track: (eventName: string, eventProperties?: Record<string, unknown>) => {
        if (!window.amplitude) return;
        try {
          window.amplitude.track(eventName, eventProperties ?? {});
        } catch {}
      },
      setUserId: (userId: string | null) => {
        if (!window.amplitude) return;
        try {
          window.amplitude.setUserId(userId);
        } catch {}
      },
      setUserProperties: (props: Record<string, unknown>) => {
        if (!window.amplitude) return;
        try {
          window.amplitude.setUserProperties(props);
        } catch {}
      },
      isReady,
    };
  }, [isReady]);

  return api;
}
