"use client";

import { useEffect, useRef, useState } from "react";

export type RotatorMessage = {
  id: number | string;
  type?: string;
  prefix: string;
  title: string;
  detail?: string;
  accent: string; // CSS color string
};

interface BannerRotatorProps {
  messages?: RotatorMessage[] | null;
  interval?: number; // ms
  className?: string;
}

const DEFAULT_MESSAGES: RotatorMessage[] = [
  {
    id: 1,
    type: "stock",
    prefix: "[STOCK ALERT]",
    title: "Producto \u201CX\u201D agot\u00E1ndose r\u00E1pido.",
    detail: "Unidades restantes: 07",
    accent: "#00FF88",
  },
  {
    id: 2,
    type: "security",
    prefix: "[SECURE NODE UPDATE]",
    title: "Nueva ruta de encriptaci\u00F3n habilitada.",
    detail: "Latencia reducida en un 30%.",
    accent: "#00E5FF",
  },
  {
    id: 3,
    type: "supplier",
    prefix: "[NEW SUPPLIER]",
    title: "Proveedor \u201CEuropa Central\u201D verificado.",
    detail: "Productos con 15% OFF por tiempo limitado.",
    accent: "#FF00AA",
  },
];

export default function BannerRotator({
  messages = null,
  interval = 4500,
  className = "",
}: BannerRotatorProps) {
  const items = messages ?? DEFAULT_MESSAGES;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Decide legibilidad del texto sobre el color de acento
  const textOnAccent = (hex: string) => {
    const s = hex.trim().replace("#", "");
    const r = parseInt(s.slice(0, 2), 16) || 0;
    const g = parseInt(s.slice(2, 4), 16) || 0;
    const b = parseInt(s.slice(4, 6), 16) || 0;
    const L = 0.2126 * r + 0.7152 * g + 0.0722 * b; // luminancia aproximada
    return L > 160 ? "#000000" : "#FFFFFF";
  };

  useEffect(() => {
    if (paused) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setIdx((i) => (i + 1) % items.length);
    }, interval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [items.length, interval, paused]);

  const current = items[idx];

  return (
    <div
      className={`banner-rotator mx-auto w-full max-w-full overflow-hidden rounded-2xl ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        tabIndex={0}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="relative border-l-4 bg-[linear-gradient(90deg,#070707_0%,#0f0f0f_100%)] p-4 ring-1 ring-white/10 md:p-5"
        style={{ borderColor: current.accent }}
      >
        {/* contenido */}
        <div className="row flex flex-col items-start gap-3 md:flex-row md:items-start md:gap-4">
          <div className="min-w-0">
            <div
              className="glitch mb-1 font-mono text-xs tracking-wide uppercase md:text-sm"
              style={{ color: current.accent }}
              data-text={current.prefix}
            >
              <strong>{current.prefix}</strong>
            </div>
            <div className="text-base font-semibold text-slate-50 md:text-lg lg:text-xl">
              {current.title}
            </div>
            {current.detail && (
              <div className="mt-1 text-xs text-slate-300 md:text-sm">
                {current.detail}
              </div>
            )}
          </div>

          {/* Right area: action / indicator */}
          <div className="flex items-center gap-3 md:ml-auto">
            <button
              type="button"
              className="rounded-full px-3 py-1 font-mono text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20 md:text-sm"
              style={{
                background: current.accent,
                color: textOnAccent(current.accent),
                boxShadow: `0 4px 20px ${current.accent}55`,
              }}
              aria-label="Ver detalles del aviso"
            >
              Ver detalles
            </button>
          </div>
        </div>

        {/* progreso del slide */}
        <div className="absolute right-0 bottom-0 left-0 h-[2px] bg-white/10">
          <div
            key={idx}
            className="progress h-full bg-white/60"
            style={{ animationDuration: `${interval}ms` }}
          />
        </div>
      </div>
    </div>
  );
}
