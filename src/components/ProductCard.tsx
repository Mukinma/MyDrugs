import Image from "next/image";
import { useShop } from "@/context/ShopContext";

export type Product = {
  id: string;
  name: string;
  slug: string;
  btcPrice: number;
  ethPrice: number;
  dosageMg: number;
  description: string;
  category: string;
  flavor: string | null;
  availability: "in-stock" | "coming-soon" | "limited";
  isNew: boolean;
  image: string;
  partner: string | null;
  tags: string[];
};

function AvailabilityBadge({
  availability,
  isNew,
}: {
  availability: Product["availability"];
  isNew: boolean;
}) {
  const label = isNew
    ? "Nuevo"
    : availability === "limited"
      ? "Limitado"
      : availability === "coming-soon"
        ? "Próximamente"
        : "";
  if (!label) return null;
  return (
    <span className="pointer-events-none absolute top-3 left-3 rounded-md border border-white/15 bg-[--background] px-2 py-0.5 font-mono text-[10px] tracking-wider text-white/90 uppercase">
      {label}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, isFavorite, getQty } = useShop();
  const showPrices = product.btcPrice > 0 || product.ethPrice > 0;
  const price = showPrices ? (
    <div className="flex items-center gap-2 rounded-md border border-white/15 px-2 py-1 font-mono text-[11px] text-white/90">
      <span className="opacity-70">₿</span>
      <span className="tabular-nums">{product.btcPrice.toFixed(4)}</span>
      <span className="mx-1 opacity-30">•</span>
      <span className="opacity-70">Ξ</span>
      <span className="tabular-nums">{product.ethPrice.toFixed(4)}</span>
    </div>
  ) : (
    <div className="rounded-md border border-white/15 px-2 py-1 font-mono text-[11px] text-white/60">
      <span>
        {product.availability === "limited" ? "Solo premium" : "Próximamente"}
      </span>
    </div>
  );

  return (
    <article className="group relative rounded-lg border border-white/10 bg-[--background] p-3 transition-all hover:shadow-none hover:ring-1 hover:ring-white/10 md:p-4">
      <div className="from-foreground/10 aspect-[4/3] overflow-hidden rounded-md bg-gradient-to-br to-transparent ring-1 ring-white/10">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={480}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-5xl opacity-20">
            💊
          </div>
        )}
        <AvailabilityBadge
          availability={product.availability}
          isNew={product.isNew}
        />
        {/* Favorite button */}
        <button
          type="button"
          aria-label="Favorito"
          onClick={() => toggleFavorite(product.id)}
          className={`absolute top-2 right-2 rounded-full border border-white/15 bg-black/40 p-1.5 text-white transition hover:bg-black/60 ${isFavorite(product.id) ? "opacity-100" : "opacity-70"}`}
        >
          <svg
            aria-hidden
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={isFavorite(product.id) ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 21l-1-1C5 15 2 12 2 8a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 4-3 7-9 12z" />
          </svg>
        </button>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2 md:mt-4 md:gap-3 lg:grid-cols-[1fr_auto] lg:items-start">
        <div className="min-w-0">
          <h3
            className="truncate text-sm font-semibold tracking-tight md:text-base"
            title={product.name}
          >
            {product.name}
          </h3>
          <p className="mt-1 font-mono text-[11px] text-white/70 md:text-[12px]">
            {product.dosageMg} mg MDMA
          </p>
        </div>
        <div className="flex max-w-full flex-wrap items-center justify-start gap-2 lg:justify-end">
          <div className="shrink-0 whitespace-nowrap">{price}</div>
          <button
            type="button"
            onClick={() => addToCart(product.id, 1)}
            className="shrink-0 rounded-md border border-white/15 px-2 py-1 text-[11px] text-white/90 transition hover:bg-white/10 md:px-3 md:py-1.5 md:text-[12px]"
          >
            Añadir
          </button>
        </div>
      </div>

      <p className="mt-2 line-clamp-2 text-xs text-white/80 md:mt-3 md:text-sm">
        {product.description}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] md:mt-4 md:gap-2.5 md:text-[11px]">
        <span className="rounded-md border border-white/15 px-2 py-0.5 text-white/85">
          {product.category}
        </span>
        {product.flavor ? (
          <span className="rounded-md border border-white/15 px-2 py-0.5 text-white/85">
            {product.flavor}
          </span>
        ) : null}
        {product.partner ? (
          <span className="rounded-md border border-white/15 px-2 py-0.5 text-white/70">
            {product.partner}
          </span>
        ) : null}
        {getQty(product.id) > 0 ? (
          <span className="ml-auto rounded-md border border-white/15 px-2 py-0.5 text-white/70">
            x{getQty(product.id)}
          </span>
        ) : null}
      </div>
    </article>
  );
}
