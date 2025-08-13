"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type InfoItem = {
  id: string | number;
  icon: "shipping" | "discount" | "payment" | "support" | "security" | "refund";
  title: string;
  description: string;
  accent?: string;
};

type Props = {
  items?: InfoItem[] | null;
  intervalMs?: number;
  className?: string;
};

const DEFAULT_ITEMS: InfoItem[] = [
  {
    id: "shipping",
    icon: "shipping",
    title: "Envío 24–72h, empaque discreto",
    description: "Tracking privado. Envío gratis desde 0.02 ETH o 0.001 BTC.",
    accent: "#22d3ee",
  },
  {
    id: "discount",
    icon: "discount",
    title: "Ofertas y combos semanales",
    description: "-10% primer pedido. Paquetes combo con hasta -20%.",
    accent: "#a78bfa",
  },
  {
    id: "payment",
    icon: "payment",
    title: "Pagos BTC/ETH con comisión baja",
    description: "Confirmación típica ~10 min. Notificación segura.",
    accent: "#34d399",
  },
  {
    id: "support",
    icon: "support",
    title: "Soporte 24/7 con respuesta < 2h",
    description: "Canal cifrado. Seguimiento hasta entrega confirmada.",
    accent: "#f472b6",
  },
  {
    id: "security",
    icon: "security",
    title: "Privacidad y seguridad por defecto",
    description: "Datos mínimos, cifrado extremo a extremo y protección de cuenta.",
    accent: "#60a5fa",
  },
  {
    id: "refund",
    icon: "refund",
    title: "Devoluciones fáciles (7 días)",
    description: "Incidencias logísticas cubiertas con reemplazo o crédito.",
    accent: "#f59e0b",
  },
];

export default function BannerRotator({ items = null, intervalMs = 7000, className = "" }: Props) {
  const data = items ?? DEFAULT_ITEMS;
  const [index, setIndex] = useState(0);
  const [manualPause, setManualPause] = useState(false);
  const [hovering, setHovering] = useState(false);
  const timerRef = useRef<number | null>(null);

  const prefersReduced = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const paused = manualPause || hovering;
    if (prefersReduced || paused || data.length <= 1) return;
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => setIndex((i) => (i + 1) % data.length), intervalMs);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [data.length, intervalMs, manualPause, hovering, prefersReduced]);

  const go = (dir: -1 | 1) => setIndex((i) => (i + dir + data.length) % data.length);

  const trackWidth = `${data.length * 100}%`;
  const offset = `-${(index * 100) / data.length}%`;

  return (
    <div
      className={`relative mx-auto min-h-24 w-full max-w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e0e] ring-1 ring-white/10 md:min-h-28 ${className}`}
      role="region"
      aria-label="Información útil"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === " ") setManualPause((p) => !p);
      }}
      tabIndex={0}
    >
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ width: trackWidth, transform: `translateX(${offset})` }}
        aria-live="polite"
        aria-atomic="true"
      >
        {data.map((item) => (
          <Slide key={item.id} item={item} total={data.length} />
        ))}
      </div>

      {/* Dots - bottom-left */}
      <div className="pointer-events-none absolute bottom-2 left-1/2 hidden -translate-x-1/2 sm:block">
        <div className="flex items-center gap-2">
          {data.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir al banner ${i + 1}`}
              className={`pointer-events-auto size-2.5 rounded-full transition ${i === index ? "bg-white/80" : "bg-white/30 hover:bg-white/50"}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>

      {/* Controls - bottom-right */}
      <div className="pointer-events-none absolute right-2 bottom-2 hidden sm:block">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="pointer-events-auto rounded-full border border-white/15 bg-black/40 p-2 text-white/80 backdrop-blur-sm transition hover:text-white"
            aria-label="Anterior"
            onClick={() => go(-1)}
          >
            <Chevron direction="left" />
          </button>
          <button
            type="button"
            className={`pointer-events-auto rounded-full border border-white/15 bg-black/40 p-2 text-white/80 backdrop-blur-sm transition hover:text-white ${manualPause ? "ring-1 ring-white/30" : ""}`}
            aria-label={manualPause ? "Reanudar rotación" : "Pausar rotación"}
            aria-pressed={manualPause}
            onClick={() => setManualPause((p) => !p)}
            title={manualPause ? "Reanudar" : "Pausar"}
          >
            {manualPause ? <PlayIcon /> : <PauseIcon />}
          </button>
          <button
            type="button"
            className="pointer-events-auto rounded-full border border-white/15 bg-black/40 p-2 text-white/80 backdrop-blur-sm transition hover:text-white"
            aria-label="Siguiente"
            onClick={() => go(1)}
          >
            <Chevron direction="right" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Slide({ item, total }: { item: InfoItem; total: number }) {
  return (
    <div className="flex h-full flex-shrink-0 p-3 md:p-4" style={{ width: `${100 / total}%` }}>
      <div
        className="flex h-full w-full items-start gap-4 rounded-xl border border-white/10 bg-white/[0.025] p-4 ring-1 ring-white/10 md:items-center md:gap-5"
        style={{ boxShadow: `${item.accent ?? "#22d3ee"}22 0 0 0 1px inset` }}
      >
        <div className="grid size-10 flex-shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-white/90">
          <Icon kind={item.icon} />
        </div>
        <div className="min-w-0 leading-relaxed">
          <div className="text-base font-semibold text-white md:text-lg">{item.title}</div>
          <div className="mt-1 text-sm text-white/80 md:text-base">{item.description}</div>
        </div>
      </div>
    </div>
  );
}

function Icon({ kind }: { kind: InfoItem["icon"] }) {
  switch (kind) {
    case "shipping":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 7h11v10H3z" />
          <path d="M14 10h5l2 2v5h-7" />
          <circle cx="7.5" cy="17.5" r="1.5" />
          <circle cx="17.5" cy="17.5" r="1.5" />
        </svg>
      );
    case "discount":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 14l6-6" />
          <circle cx="7.5" cy="7.5" r="1.5" />
          <circle cx="16.5" cy="16.5" r="1.5" />
        </svg>
      );
    case "payment":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 10h18" />
        </svg>
      );
    case "support":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 16v-5a6 6 0 10-12 0v5" />
          <rect x="4" y="16" width="16" height="4" rx="2" />
        </svg>
      );
    case "security":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "refund":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 8v8" />
          <path d="M8 12h8" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  const isLeft = direction === "left";
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={isLeft ? "rotate-180" : ""}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M8 5h3v14H8zM13 5h3v14h-3z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
