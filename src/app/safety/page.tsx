import MetaHeader from "@/components/MetaHeader";

export const metadata = {
  title: "Safety | Guía de seguridad (proyecto fan)",
  description:
    "Página ficticia de seguridad. No promueve el consumo ni actividades ilegales. Incluye avisos, recursos y buenas prácticas generales.",
};

export default function SafetyPage() {
  return (
    <section className="relative isolate overflow-hidden py-12 md:py-16">
      {/* Accentos de fondo sutiles */}
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(65%_55%_at_50%_0%,black,transparent)] opacity-30">
        <div className="absolute -top-24 left-1/3 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -top-28 right-1/4 h-64 w-64 rounded-full bg-fuchsia-400/10 blur-3xl" />
      </div>
      <div className="mx-auto max-w-4xl px-4">
        <MetaHeader
          title="Safety (Guía de seguridad)"
          subtitle="Contenido ficticio inspirado en una serie. No se ofrecen instrucciones de uso ni se promueve el consumo."
          breadcrumb={["inicio", "safety"]}
          className="mb-4"
          rainbowTitle
        />

        {/* Aviso de responsabilidad */}
        <div className="mb-6 rounded-xl border border-white/10 bg-white/[0.035] p-4 ring-1 ring-white/10">
          <p className="text-sm leading-relaxed text-white/80">
            Este apartado es una representación creativa. No es una guía médica ni legal. Si tú o
            alguien necesita ayuda, acude a profesionales de salud y a las autoridades competentes.
            En caso de emergencia, llama al servicio de emergencias de tu país.
          </p>
        </div>

        {/* Chips de contexto */}
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <Chip color="#22d3ee" label="Contenido ficticio" />
          <Chip color="#a78bfa" label="Sin instrucciones de consumo" />
          <Chip color="#34d399" label="Respeta la ley local" />
        </div>

        {/* Tarjetas con icono (conceptos clave) */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <IconCard
            color="#22d3ee"
            title="Recursos y ayuda"
            bullets={["Instituciones públicas y sanitarias", "Consulta profesional ante dudas"]}
          />
          <IconCard
            color="#f59e0b"
            title="Cuándo buscar atención médica"
            bullets={["Síntomas graves → emergencias", "No esperes a que " + "empeore"]}
          />
          <IconCard
            color="#a78bfa"
            title="Privacidad digital"
            bullets={["2FA y contraseñas robustas", "Cuidado con enlaces/archivos sospechosos"]}
          />
          <IconCard
            color="#34d399"
            title="Salud mental y apoyo"
            bullets={["Pide ayuda: líneas y profesionales", "Habla con personas de confianza"]}
          />
        </div>

        {/* Acordeón (detalles sin JS) */}
        <div className="mt-8 space-y-3">
          <Details title="Señales de alerta (generales)">
            <ul className="list-disc pl-5 text-sm leading-relaxed text-white/80">
              <li>Desorientación, pérdida de consciencia o convulsiones.</li>
              <li>Dificultad respiratoria, dolor torácico intenso.</li>
              <li>Fiebre alta, rigidez muscular o vómitos persistentes.</li>
            </ul>
          </Details>
          <Details title="Privacidad y huella digital">
            <ul className="list-disc pl-5 text-sm leading-relaxed text-white/80">
              <li>Actualiza dispositivos y aplicaciones con regularidad.</li>
              <li>Activa verificación en dos pasos y usa gestores de contraseñas.</li>
              <li>Evita publicar datos sensibles y desconfía de &quot;ofertas&quot; milagrosas.</li>
            </ul>
          </Details>
          <Details title="Apoyo y cuidados">
            <ul className="list-disc pl-5 text-sm leading-relaxed text-white/80">
              <li>Si te sientes en riesgo, busca ayuda profesional de inmediato.</li>
              <li>Comparte tu ubicación con personas de confianza cuando sea prudente.</li>
              <li>Descanso, hidratación y acompañamiento mejoran el bienestar general.</li>
            </ul>
          </Details>
        </div>

        {/* Tarjeta de emergencia */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.035] to-white/[0.02] p-5 ring-1 ring-white/10">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <div className="text-sm text-white/80">
              <div className="font-semibold text-white">Contacto de emergencia</div>
              <div className="mt-1">Emergencias: 911 / 112 (según país)</div>
              <div>Salud mental: líneas locales de apoyo</div>
            </div>
            <div className="md:ml-auto">
              <a
                href="#"
                aria-disabled
                className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white transition hover:bg-white/10"
              >
                Guardar tarjeta
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Chip({ color, label }: { color: string; label: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/90"
      style={{ boxShadow: `${color}33 0 0 0 1px inset` }}
    >
      <span className="size-2 rounded-full" style={{ backgroundColor: color }} aria-hidden />
      {label}
    </span>
  );
}

function IconCard({ color, title, bullets }: { color: string; title: string; bullets: string[] }) {
  return (
    <div
      className="relative rounded-2xl border border-white/10 bg-[#0f0f10] p-5 ring-1 ring-white/10"
      style={{ boxShadow: `${color}22 0 0 0 1px inset, 0 0 22px ${color}14` }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, ${color}aa, transparent 60%)` }}
      />
      <div className="mb-2 flex items-center gap-2">
        <div
          className="grid size-8 place-items-center rounded-md border border-white/10 bg-white/5"
          style={{ boxShadow: `inset 0 0 0 1px ${color}55` }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M4 7h16M4 12h12M4 17h8" />
          </svg>
        </div>
        <h2 className="text-base font-semibold text-white">{title}</h2>
      </div>
      <ul className="mt-1 list-disc pl-5 text-sm leading-relaxed text-white/80">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

function Details({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group rounded-xl border border-white/10 bg-white/[0.03] p-4 ring-1 ring-white/10">
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm text-white/90">
        <span>{title}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="transition group-open:rotate-180"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  );
}
