"use client";

import ShopProvider from "@/context/ShopContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ShopProvider>{children}</ShopProvider>;
}
