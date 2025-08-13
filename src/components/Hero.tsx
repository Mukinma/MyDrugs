import BannerRotator from "@/components/BannerRotator";
import MetaHeader from "@/components/MetaHeader";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent)] opacity-40">
        <div className="via-foreground/5 absolute inset-0 bg-gradient-to-b from-transparent to-transparent" />
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <MetaHeader
          title="La mercancía está lista"
          subtitle="Pedidos en marcha, proveedores de confianza. Todo bajo cifrado."
          breadcrumb={["home", "hub"]}
          chips={["STATUS: STABLE", "ENCRYPTED", "v3.2"]}
          className="mb-2"
        />

        <div className="mt-4">
          <BannerRotator />
        </div>

        <div className="mt-6 max-w-xl">
          <p className="text-sm text-white/80">
            Acceso directo. Calidad Garantizada. Anónimo siempre.
          </p>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <a
            href="#catalog"
            className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm text-white shadow-sm transition-colors hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            Ver catálogo
          </a>
          <a
            href="#about"
            className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm opacity-90 transition hover:opacity-100"
          >
            Acerca del proyecto
          </a>
        </div>

        {/* FAQ banner */}
        <div className="mt-5">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,#0b0b0b_0%,#0f0f0f_100%)] p-4 ring-1 ring-white/10 md:p-5">
            <div className="pointer-events-none absolute inset-0 -z-0 opacity-30 [mask-image:radial-gradient(55%_70%_at_60%_0%,black,transparent)]">
              <div className="absolute -right-16 -top-16 size-64 rounded-full bg-white/5 blur-3xl" />
            </div>
            <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:gap-4">
              <div className="min-w-0">
                <div className="font-mono text-[11px] tracking-widest text-white/70">
                  FAQ
                </div>
                <h3 className="mt-1 text-base font-semibold text-white md:text-lg">
                  ¿Dudas sobre seguridad, envíos o pagos?
                </h3>
                <p className="mt-1 max-w-2xl text-xs text-white/75 md:text-sm">
                  Resolvemos las preguntas más frecuentes con detalle técnico y
                  buenas prácticas.
                </p>
              </div>
              <div className="md:ml-auto">
                <a
                  href="#faq"
                  className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
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
