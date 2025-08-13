import BannerRotator from "@/components/BannerRotator";
import MetaHeader from "@/components/MetaHeader";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-16 md:py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent)] opacity-40">
        <div className="via-foreground/5 absolute inset-0 bg-gradient-to-b from-transparent to-transparent" />
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <MetaHeader
          title="Explora el catálogo encriptado"
          subtitle="Articulos listos para envío seguro. Selecciona y compra al instante."
          breadcrumb={["home", "hub"]}
          className="mb-2"
          rainbowTitle
        />

        <div className="mt-3 md:mt-4">
          <BannerRotator />
        </div>

        <div className="mt-8 max-w-xl md:mt-10">
          <p className="text-sm text-white/80">
            Acceso directo. Calidad Garantizada. Anónimo siempre.
          </p>
        </div>

        <div className="mt-10 flex items-center gap-3">
          <a
            href="#catalog"
            className="btn-glitch-lite btn-halo relative inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold shadow-lg ring-1 shadow-cyan-500/10 ring-white/15 transition hover:ring-white/25 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:outline-none md:text-base"
            aria-label="Ir al catálogo"
          >
            Ver catálogo
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="ml-2"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-1 text-xs text-white/70 underline-offset-4 transition hover:text-white/90 hover:underline md:text-sm"
          >
            Acerca del proyecto
          </a>
        </div>

        {/* mobile nudge to catalog */}
        <div className="mt-10 flex items-center justify-center md:hidden">
          <a
            href="#catalog"
            className="group inline-flex items-center gap-1 text-xs text-white/70 hover:text-white"
          >
            Ir al catálogo
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="animate-bounce"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        </div>

        {/* FAQ banner (visible también en móvil) */}
        <div className="mt-5">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,#0b0b0b_0%,#0f0f0f_100%)] p-4 ring-1 ring-white/10 md:p-5">
            <div className="pointer-events-none absolute inset-0 -z-0 [mask-image:radial-gradient(55%_70%_at_60%_0%,black,transparent)] opacity-30">
              <div className="absolute -top-16 -right-16 size-64 rounded-full bg-white/5 blur-3xl" />
            </div>
            <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:gap-4">
              <div className="min-w-0">
                <div className="font-mono text-[11px] tracking-widest text-white/70">FAQ</div>
                <h3 className="mt-1 text-base font-semibold text-white md:text-lg">
                  ¿Dudas sobre seguridad, envíos o pagos?
                </h3>
                <p className="mt-1 max-w-2xl text-xs text-white/75 md:text-sm">
                  Resolvemos las preguntas más frecuentes con detalle técnico y buenas prácticas.
                </p>
              </div>
              <div className="md:ml-auto">
                <a
                  href="/faq"
                  className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:outline-none"
                >
                  Ver FAQ
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
