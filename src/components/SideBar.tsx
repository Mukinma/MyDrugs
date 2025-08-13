"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useShop } from "@/context/ShopContext";

interface SideBarProps {
  links: { label: string; href: string }[];
}

export default function SideBar({ links }: SideBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const firstFocusableRef = useRef<HTMLInputElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const [query, setQuery] = useState<string>(searchParams.get("q") ?? "");
  const [catsOpen, setCatsOpen] = useState<boolean>(true);
  const { cartCount, favoritesCount } = useShop();

  // Track viewport to avoid hiding the sidebar for desktop and to tune a11y attrs
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const set = () => setIsDesktop(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  // mark mounted to avoid SSR/CSR aria mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen && !isDesktop) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, isDesktop]);

  // Close with Escape when open on mobile
  useEffect(() => {
    if (!isOpen || isDesktop) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
        // Restore focus to toggle
        toggleBtnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, isDesktop]);

  // Move focus into the panel when it opens (mobile)
  useEffect(() => {
    if (isOpen && !isDesktop) {
      // delay to ensure element is in the tree
      setTimeout(() => firstFocusableRef.current?.focus(), 0);
    }
  }, [isOpen, isDesktop]);

  const computedLinks = useMemo(
    () =>
      links.map((l) => ({
        ...l,
        active:
          pathname === l.href ||
          (l.href !== "/" &&
            typeof pathname === "string" &&
            pathname?.startsWith(l.href)),
      })),
    [links, pathname]
  );

  // Sync quick search to URL (?q=)
  useEffect(() => {
    const t = setTimeout(() => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }
      router.replace(`?${params.toString()}`, { scroll: false });
    }, 250);
    return () => clearTimeout(t);
  }, [query, router, searchParams]);

  const setCategory = (cat: string | null) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (cat) params.set("cat", cat);
    else params.delete("cat");
    router.replace(`?${params.toString()}`, { scroll: false });
    setIsOpen(false);
  };

  // Basic focus trap for mobile when panel is open
  const getFocusable = () => {
    if (!panelRef.current) return [] as HTMLElement[];
    const selector = [
      "a[href]",
      "button:not([disabled])",
      "textarea:not([disabled])",
      'input[type="text"]:not([disabled])',
      'input[type="search"]:not([disabled])',
      'input[type="radio"]:not([disabled])',
      'input[type="checkbox"]:not([disabled])',
      "select:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ].join(",");
    const nodes = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(selector)
    );
    return nodes.filter((el) => el.offsetParent !== null);
  };
  const focusFirst = () => {
    const els = getFocusable();
    if (els.length) els[0].focus();
  };
  const focusLast = () => {
    const els = getFocusable();
    if (els.length) els[els.length - 1].focus();
  };

  return (
    <>
      {/* Botón toggle (solo móvil, oculto cuando el sidebar está abierto) */}
      {!isOpen && (
        <button
          ref={toggleBtnRef}
          onClick={() => setIsOpen(true)}
          aria-expanded={isOpen}
          aria-controls="sidebar"
          aria-label="Abrir menú"
          className="fixed top-4 left-4 z-[70] inline-flex items-center gap-2 rounded-md border border-[--sidebar-border] bg-[--background]/80 px-3 py-2 text-sm shadow-sm backdrop-blur transition-colors hover:bg-[--sidebar-hover] md:hidden"
        >
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="opacity-90"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="sr-only">Abrir menú</span>
        </button>
      )}

      {/* SideBar */}
      <aside
        id="sidebar"
        role="navigation"
        aria-label="Navegación principal"
        aria-hidden={mounted ? (isDesktop ? false : !isOpen) : true}
        tabIndex={mounted ? (isDesktop ? 0 : isOpen ? 0 : -1) : -1}
        ref={panelRef}
        style={{
          paddingTop: "max(1rem, env(safe-area-inset-top))",
          paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
          paddingLeft: "max(1rem, env(safe-area-inset-left))",
          paddingRight: "max(1rem, env(safe-area-inset-right))",
        }}
        className={`no-scrollbar fixed inset-y-4 left-4 z-[60] w-72 transform overflow-x-hidden overflow-y-auto rounded-3xl border border-[--sidebar-border] bg-[--background] p-4 text-[--foreground] shadow-none ring-1 ring-white/10 backdrop-blur-3xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-[calc(100%+1rem)]"
        } md:translate-x-0`}
      >
        {/* Focus trap sentinels (mobile only) */}
        {!isDesktop && isOpen ? (
          <div
            tabIndex={0}
            onFocus={focusLast}
            aria-hidden
            className="sr-only"
          />
        ) : null}
        <Link
          href="/"
          className="my-3 inline-flex w-full items-center justify-center"
          aria-label="Inicio"
        >
          <Image
            src="/images/logos/WhiteLogo.png"
            alt="my-drugs"
            width={220}
            height={140}
            className="h-10 w-auto opacity-90 md:h-12"
            priority
          />
        </Link>
        {/* Usuario */}
        <div className="mb-3 flex items-center gap-3 px-2">
          <div className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold">
            G
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-medium md:text-sm">
              ghost_23
            </p>
            <p className="text-[12px] text-white/75 md:text-[11px]">
              Nivel: VIP
            </p>
          </div>
        </div>
        <div className="my-3 h-px bg-white/10" />

        {/* Buscador */}
        <form role="search" className="mb-3">
          <label htmlFor="sidebar-search" className="sr-only">
            Buscar
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-white/50">
              <Image
                src="/images/icons/search.svg"
                alt=""
                width={16}
                height={16}
                aria-hidden
              />
            </span>
            <input
              ref={firstFocusableRef}
              id="sidebar-search"
              type="search"
              placeholder="Buscar productos…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              className="w-full rounded-lg border border-[--sidebar-border] bg-[--background] py-2.5 pr-3 pl-9 text-[15px] text-zinc-200 transition outline-none placeholder:text-white/55 focus:border-white/20 focus:ring-2 focus:ring-white/15 md:py-2 md:text-sm"
            />
          </div>
        </form>

        {/* Navegación principal */}
        <p className="mb-2 px-1 text-[11px] tracking-wider text-zinc-300/80 uppercase md:text-[10px]">
          Explorar
        </p>
        <ul className="space-y-0.5">
          {computedLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block rounded-lg px-3 py-2 text-[15px] transition-colors hover:bg-[--sidebar-hover] md:text-sm ${
                  link.active
                    ? "border-l-2 border-l-white/30 bg-white/[0.04] text-zinc-100"
                    : "text-zinc-200 md:text-zinc-300"
                }`}
                aria-current={link.active ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
          {/* Categorías (desplegable) */}
          <li>
            <button
              type="button"
              onClick={() => setCatsOpen((v) => !v)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[15px] text-zinc-200 transition hover:bg-[--sidebar-hover] md:text-sm md:text-zinc-300"
              aria-expanded={catsOpen}
            >
              <span>Categorías</span>
              <svg
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`transition ${catsOpen ? "rotate-180" : "rotate-0"}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {catsOpen ? (
              <ul className="mt-1 space-y-0.5 pl-3">
                <li>
                  <button
                    onClick={() => setCategory("pill")}
                    className="w-full rounded-md px-3 py-2 text-left text-[15px] text-zinc-200 transition hover:bg-[--sidebar-hover] md:text-sm md:text-zinc-300"
                  >
                    Pastillas
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCategory("powder")}
                    className="w-full rounded-md px-3 py-2 text-left text-[15px] text-zinc-200 transition hover:bg-[--sidebar-hover] md:text-sm md:text-zinc-300"
                  >
                    Polvos
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCategory("kit")}
                    className="w-full rounded-md px-3 py-2 text-left text-[15px] text-zinc-200 transition hover:bg-[--sidebar-hover] md:text-sm md:text-zinc-300"
                  >
                    Kits
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCategory("accessory")}
                    className="w-full rounded-md px-3 py-2 text-left text-[15px] text-zinc-200 transition hover:bg-[--sidebar-hover] md:text-sm md:text-zinc-300"
                  >
                    Accesorios
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCategory(null)}
                    className="w-full rounded-md px-3 py-2 text-left text-[15px] text-zinc-300 transition hover:bg-[--sidebar-hover] md:text-sm md:text-zinc-400"
                  >
                    Limpiar filtro
                  </button>
                </li>
              </ul>
            ) : null}
          </li>

          {/* Ofertas/Paquetes y Novedades */}
          <li>
            <a
              href="#catalog"
              className="block rounded-lg px-3 py-2 text-[15px] text-zinc-200 transition hover:bg-[--sidebar-hover] md:text-sm md:text-zinc-300"
            >
              Ofertas / Paquetes
            </a>
          </li>
          <li>
            <a
              href="#catalog"
              className="block rounded-lg px-3 py-2 text-[15px] text-zinc-200 transition hover:bg-[--sidebar-hover] md:text-sm md:text-zinc-300"
            >
              Novedades
            </a>
          </li>
        </ul>

        {/* Funciones adicionales */}
        <div className="my-3 h-px bg-white/10" />
        <p className="mb-2 px-1 text-[11px] tracking-wider text-zinc-300/80 uppercase md:text-[10px]">
          Funciones
        </p>
        <div className="grid grid-cols-2 gap-2 px-1">
          <a
            href="#cart"
            className="relative inline-flex w-full items-center justify-center gap-2 rounded-md border border-[--sidebar-border] px-3 py-1.5 text-[15px] text-zinc-200 transition hover:bg-[--sidebar-hover] md:text-sm"
          >
            <svg
              aria-hidden
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6h15l-1.5 9h-12z" />
              <circle cx="9" cy="21" r="1" />
              <circle cx="18" cy="21" r="1" />
            </svg>
            <span>Carrito</span>
            <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-white/20 px-1 text-[10px]">
              {cartCount}
            </span>
          </a>
          <a
            href="#favorites"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-[--sidebar-border] px-3 py-1.5 text-[15px] text-zinc-200 transition hover:bg-[--sidebar-hover] md:text-sm"
          >
            <svg
              aria-hidden
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 21l-1-1C5 15 2 12 2 8a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 4-3 7-9 12z" />
            </svg>
            <span>Favoritos</span>
            <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-white/20 px-1 text-[10px]">
              {favoritesCount}
            </span>
          </a>
        </div>

        {/* Narrativa / inmersivo */}
        <div className="my-3 h-px bg-white/10" />
        <p className="mb-2 px-1 text-[11px] tracking-wider text-zinc-300/80 uppercase md:text-[10px]">
          Actividad
        </p>
        <ul className="space-y-1 px-1 text-[13px] text-zinc-300 md:text-[12px]">
          <li className="rounded-md border border-[--sidebar-border] bg-white/5 px-2.5 py-1.5 md:px-2 md:py-1">
            Pedido entregado en Berlín
          </li>
          <li className="rounded-md border border-[--sidebar-border] bg-white/5 px-2.5 py-1.5 md:px-2 md:py-1">
            Cliente dejó reseña ★★★★★
          </li>
        </ul>
        <div className="mt-2 px-1">
          <div className="mb-1 flex items-center justify-between text-[12px] text-zinc-400 md:text-[11px]">
            <span>Reputación</span>
            <span>82%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded bg-white/10">
            <div className="h-full w-[82%] bg-white/30" />
          </div>
        </div>
        <div className="mt-3 px-1">
          <button
            onClick={() => {
              window.location.replace("https://www.wikipedia.org/");
            }}
            className="w-full rounded-md border border-[--sidebar-border] bg-white/5 px-3 py-2 text-[15px] text-zinc-100 transition hover:bg-[--sidebar-hover] md:text-sm"
          >
            Modo Panic
          </button>
        </div>

        {/* Acciones de usuario */}
        <div className="my-3 h-px bg-white/10" />
        <p className="mb-2 px-1 text-[11px] tracking-wider text-zinc-300/80 uppercase md:text-[10px]">
          Cuenta
        </p>
        <ul className="space-y-0.5">
          <li>
            <a
              href="#profile"
              className="block rounded-lg px-3 py-2 text-[15px] text-zinc-200 transition hover:bg-[--sidebar-hover] md:text-sm md:text-zinc-300"
            >
              Perfil / Configuración
            </a>
          </li>
          <li>
            <a
              href="#orders"
              className="block rounded-lg px-3 py-2 text-[15px] text-zinc-200 transition hover:bg-[--sidebar-hover] md:text-sm md:text-zinc-300"
            >
              Historial de pedidos
            </a>
          </li>
          <li>
            <a
              href="#logout"
              className="block rounded-lg px-3 py-2 text-[15px] text-zinc-200 transition hover:bg-[--sidebar-hover] md:text-sm md:text-zinc-300"
            >
              Cerrar sesión
            </a>
          </li>
        </ul>
        <div className="absolute top-3 right-3 mb-4 flex items-center justify-between md:hidden">
          <button
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center rounded-md border border-[--sidebar-border] bg-[--background]/80 p-1 text-xs opacity-80 backdrop-blur transition hover:bg-[--sidebar-hover] hover:opacity-100"
            aria-label="Cerrar menú"
          >
            <Image
              src="/images/icons/close-outline.svg"
              alt="Cerrar"
              width={24}
              height={24}
            />
          </button>
        </div>

        {/* Focus trap bottom sentinel (mobile only) */}
        {!isDesktop && isOpen ? (
          <div
            tabIndex={0}
            onFocus={focusFirst}
            aria-hidden
            className="sr-only"
          />
        ) : null}
      </aside>

      {/* Overlay (solo móvil) */}
      <div
        aria-hidden
        className={`fixed inset-0 z-30 bg-black/40 backdrop-blur-[1px] transition-opacity duration-300 md:hidden ${
          isOpen
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />
    </>
  );
}
