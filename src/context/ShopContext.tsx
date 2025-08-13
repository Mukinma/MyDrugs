"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Cart = Record<string, number>;

type ShopState = {
  cart: Cart;
  favorites: Set<string>;
};

type ShopContextValue = {
  cart: Cart;
  favorites: Set<string>;
  cartCount: number;
  favoritesCount: number;
  addToCart: (id: string, qty?: number) => void;
  removeFromCart: (id: string, qty?: number) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  getQty: (id: string) => number;
};

const ShopContext = createContext<ShopContextValue | null>(null);

const STORAGE_KEY = "shop-state:v1";

function loadState(): ShopState | null {
  try {
    const raw =
      typeof window !== "undefined"
        ? window.localStorage.getItem(STORAGE_KEY)
        : null;
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { cart: Cart; favorites: string[] };
    return {
      cart: parsed.cart || {},
      favorites: new Set(parsed.favorites || []),
    };
  } catch {
    return null;
  }
}

function saveState(state: ShopState) {
  try {
    const serial = JSON.stringify({
      cart: state.cart,
      favorites: Array.from(state.favorites),
    });
    window.localStorage.setItem(STORAGE_KEY, serial);
  } catch {}
}

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({});
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from storage
  useEffect(() => {
    const s = loadState();
    if (s) {
      setCart(s.cart);
      setFavorites(new Set(s.favorites));
    }
    setHydrated(true);
  }, []);

  // Persist on change
  useEffect(() => {
    if (!hydrated) return;
    saveState({ cart, favorites });
  }, [cart, favorites, hydrated]);

  const addToCart = useCallback((id: string, qty = 1) => {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + qty }));
  }, []);

  const removeFromCart = useCallback((id: string, qty = 1) => {
    setCart((c) => {
      const next = { ...c };
      const curr = next[id] || 0;
      const newQty = curr - qty;
      if (newQty > 0) next[id] = newQty;
      else delete next[id];
      return next;
    });
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((f) => {
      const next = new Set(f);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.has(id),
    [favorites]
  );
  const getQty = useCallback((id: string) => cart[id] || 0, [cart]);

  const cartCount = useMemo(
    () => Object.values(cart).reduce((acc, n) => acc + n, 0),
    [cart]
  );
  const favoritesCount = useMemo(() => favorites.size, [favorites]);

  const value: ShopContextValue = {
    cart,
    favorites,
    cartCount,
    favoritesCount,
    addToCart,
    removeFromCart,
    toggleFavorite,
    isFavorite,
    getQty,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}

export default ShopProvider;
