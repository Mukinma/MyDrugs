import { useEffect, useState, useRef } from "react";

export default function BannerSlider({
  messages = null,
  interval = 4500, // ms
}) {
  const defaultMessages = [
    {
      id: 1,
      type: "stock",
      prefix: "[STOCK ALERT]",
      title: "Producto “X” agotándose rápido.",
      detail: "Unidades restantes: 07",
      accent: "#00FF88",
    },
    {
      id: 2,
      type: "security",
      prefix: "[SECURE NODE UPDATE]",
      title: "Nueva ruta de encriptación habilitada.",
      detail: "Latencia reducida en un 30%.",
      accent: "#00E5FF",
    },
    {
      id: 3,
      type: "supplier",
      prefix: "[NEW SUPPLIER]",
      title: "Proveedor “Europa Central” verificado.",
      detail: "Productos con 15% OFF por tiempo limitado.",
      accent: "#FF00AA",
    },
  ];

  const items = messages ?? defaultMessages;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % items.length);
    }, interval);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [items.length, interval, paused]);

  const onMouseEnter = () => setPaused(true);
  const onMouseLeave = () => setPaused(false);

  const current = items[idx];

  return (
    <div
      className="mx-auto w-full max-w-full overflow-hidden rounded-md"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        role="status"
        aria-live="polite"
        tabIndex={0}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="relative border-l-4 bg-[linear-gradient(90deg,#070707_0%,#0f0f0f_100%)] p-4 shadow-lg md:p-5"
        style={{ borderColor: current.accent }}
      >
        {/* prefix with subtle glitch */}
        <div className="flex items-start gap-4">
          <div className="min-w-[170px]">
            <div
              className="glitch mb-1 font-mono text-sm md:text-base"
              style={{ color: current.accent }}
            >
              <strong>{current.prefix}</strong>
            </div>
            <div className="text-sm font-semibold text-slate-100 md:text-lg">{current.title}</div>
            <div className="mt-1 text-xs text-slate-300 md:text-sm">{current.detail}</div>
          </div>

          {/* Right area: action / indicator */}
          <div className="ml-auto flex items-center gap-3">
            <div
              className="rounded-full px-3 py-1 font-mono text-xs text-black md:text-sm"
              style={{
                background: current.accent,
                boxShadow: `0 4px 20px ${current.accent}55`,
              }}
            >
              Ver detalles
            </div>
            <div className="hidden font-mono text-xs text-slate-400 md:block">
              Se rotará cada {Math.round(interval / 1000)}s — pausa hover
            </div>
          </div>
        </div>

        {/* ticker / decorative small line */}
        <div className="absolute right-0 bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  );
}
