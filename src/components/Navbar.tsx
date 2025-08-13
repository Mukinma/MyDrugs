"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-[--background]/80 backdrop-blur supports-[backdrop-filter]:bg-[--background]/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-mono text-sm tracking-widest uppercase opacity-80">
          my-drugs
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          <Link href="#catalog" className="opacity-80 transition-opacity hover:opacity-100">
            Catálogo
          </Link>
          <Link href="#about" className="opacity-80 transition-opacity hover:opacity-100">
            Acerca
          </Link>
          {/* Theme toggle removed: dark-only UI */}
        </nav>
      </div>
    </header>
  );
}
