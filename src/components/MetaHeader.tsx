type MetaHeaderProps = {
  title?: string;
  subtitle?: string;
  breadcrumb?: string[]; // e.g., ["home", "hub"]
  className?: string;
  rainbowTitle?: boolean;
};

export default function MetaHeader({
  title = "Interfaz moderna con estética darknet",
  subtitle = "Un hub visual refinado y cifrado end‑to‑end. Mantiene el trasfondo narrativo con señales de sistema claras.",
  breadcrumb = ["home", "hub"],
  className = "",
  rainbowTitle = false,
}: MetaHeaderProps) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {/* breadcrumb minimal */}
      <nav aria-label="breadcrumb" className="font-mono text-[11px] text-slate-400">
        <span className="text-slate-500">/</span>
        {breadcrumb.map((item, i) => (
          <span key={`${item}-${i}`} className="ml-1">
            {item} {i < breadcrumb.length - 1 && <span className="text-slate-500">/</span>}
          </span>
        ))}
      </nav>

      {/* título + subtítulo */}
      <div className="space-y-2">
        <h1
          className={`text-2xl font-semibold tracking-tight md:text-3xl ${
            rainbowTitle ? "rainbow-text" : "text-slate-50"
          }`}
        >
          {title}
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">{subtitle}</p>
      </div>

      {/* línea acento sutil */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
