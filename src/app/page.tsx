import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { products } from "@/data/products";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <main className="px-0 md:px-0">
        <Hero />
        <Suspense fallback={null}>
          <ProductGrid id="catalog" products={products} />
        </Suspense>
        <section id="about" className="border-t py-12">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="font-mono text-xs tracking-widest uppercase opacity-70">Acerca</h2>
            <p className="mt-2 max-w-2xl text-sm/6 opacity-80">
              Este proyecto es un prototipo visual inspirado en una serie. No hay backend ni lógica
              de compra (de momento); el foco es experimentar con UI, tipografía y telemetría básica
              con Amplitude.
            </p>
          </div>
        </section>
        <section id="faq" className="border-t py-12">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="font-mono text-xs tracking-widest uppercase opacity-70">FAQ</h2>
            <p className="mt-2 max-w-2xl text-sm/6 opacity-80">
              Próximamente: guía rápida sobre seguridad, envíos, pagos y trazabilidad.
            </p>
          </div>
        </section>
      </main>
      <footer className="border-t py-8 text-center text-xs opacity-70">
        <div className="mx-auto max-w-6xl px-4">© 2025 MyDrugs</div>
      </footer>
    </>
  );
}
