"use client";

import { ProductCard, type Product } from "@/components/ProductCard";
import { useSearchParams } from "next/navigation";

export function ProductGrid({ products, id }: { products: Product[]; id?: string }) {
  const params = useSearchParams();
  const q = (params.get("q") || "").toLowerCase().trim();
  const cat = params.get("cat");
  const filtered = products.filter((p) => {
    const matchesQ =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));
    const matchesCat = !cat || p.category === cat;
    return matchesQ && matchesCat;
  });
  return (
    <section id={id} className="py-16 md:py-12">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-4 flex items-end justify-between md:mb-6">
          <h2 className="font-mono text-xs tracking-widest uppercase opacity-70">Catálogo</h2>
          <a href="#" className="text-xs underline-offset-4 opacity-80 hover:underline">
            Ver todo
          </a>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-7">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
