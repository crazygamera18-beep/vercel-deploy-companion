import { createContext, useContext, useState, useCallback, useMemo, useEffect, type ReactNode } from "react";
import { PRODUCTS, type Product } from "./products";

export type CartItem = { product: Product; qty: number };
export type DeliveryType = "Entrega" | "Retirada";
export type PaymentType = "Pix" | "Dinheiro" | "Cartão";

type CartCtx = {
  items: CartItem[];
  add: (p: Product) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  setQty: (id: string, qty: number) => void;
  getQty: (id: string) => number;
  subtotal: number;
  oldSubtotal: number;
  discount: number;
  count: number;
  observation: string;
  setObservation: (v: string) => void;
  delivery: DeliveryType;
  setDelivery: (v: DeliveryType) => void;
  payment: PaymentType;
  setPayment: (v: PaymentType) => void;
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "rdz:cart:v1";

type Persisted = {
  items: { id: string; qty: number }[];
  observation: string;
  delivery: DeliveryType;
  payment: PaymentType;
};

function load(): Persisted | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Persisted) : null;
  } catch { return null; }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [observation, setObservation] = useState("");
  const [delivery, setDelivery] = useState<DeliveryType>("Entrega");
  const [payment, setPayment] = useState<PaymentType>("Pix");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const data = load();
    if (data) {
      const restored = data.items
        .map((i) => {
          const p = PRODUCTS.find((p) => p.id === i.id);
          return p ? { product: p, qty: i.qty } : null;
        })
        .filter(Boolean) as CartItem[];
      setItems(restored);
      setObservation(data.observation ?? "");
      setDelivery(data.delivery ?? "Entrega");
      setPayment(data.payment ?? "Pix");
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const data: Persisted = {
      items: items.map((i) => ({ id: i.product.id, qty: i.qty })),
      observation, delivery, payment,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [items, observation, delivery, payment, hydrated]);

  const add = useCallback((p: Product) => {
    setItems((prev) => {
      const f = prev.find((i) => i.product.id === p.id);
      if (f) return prev.map((i) => (i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { product: p, qty: 1 }];
    });
  }, []);
  const inc = useCallback((id: string) => {
    setItems((prev) => prev.map((i) => (i.product.id === id ? { ...i, qty: i.qty + 1 } : i)));
  }, []);
  const dec = useCallback((id: string) => {
    setItems((prev) => prev.flatMap((i) => i.product.id === id ? (i.qty <= 1 ? [] : [{ ...i, qty: i.qty - 1 }]) : [i]));
  }, []);
  const remove = useCallback((id: string) => setItems((p) => p.filter((i) => i.product.id !== id)), []);
  const clear = useCallback(() => { setItems([]); setObservation(""); }, []);
  const setQty = useCallback((id: string, qty: number) => {
    setItems((p) => qty <= 0 ? p.filter((i) => i.product.id !== id) : p.map((i) => i.product.id === id ? { ...i, qty } : i));
  }, []);
  const getQty = useCallback((id: string) => items.find((i) => i.product.id === id)?.qty ?? 0, [items]);

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.product.price * i.qty, 0), [items]);
  const oldSubtotal = useMemo(() => items.reduce((s, i) => s + (i.product.oldPrice ?? i.product.price) * i.qty, 0), [items]);
  const discount = oldSubtotal - subtotal;
  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);

  return (
    <Ctx.Provider value={{ items, add, inc, dec, remove, clear, setQty, getQty, subtotal, oldSubtotal, discount, count, observation, setObservation, delivery, setDelivery, payment, setPayment }}>
      {children}
    </Ctx.Provider>
  );
}

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
};
