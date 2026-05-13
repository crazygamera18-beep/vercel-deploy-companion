import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingCart, Search, X } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { STORE_NAME } from "@/lib/shop-config";
import logo from "@/assets/logo.png";

export function Header({ onSearch, search }: { onSearch?: (q: string) => void; search?: string }) {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const showSearch = path === "/" && onSearch;

  return (
    <header className="sticky top-0 z-30 bg-background/75 backdrop-blur-xl border-b border-border/60 safe-top safe-x">
      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        <div className="w-10">
          {showSearch && (
            <button
              onClick={() => setOpen((v) => !v)}
              className="size-10 -ml-2 grid place-items-center rounded-full hover:bg-muted/60 transition"
              aria-label="Buscar"
            >
              {open ? <X className="size-5" /> : <Search className="size-5" />}
            </button>
          )}
        </div>

        <Link to="/" className="flex items-center gap-2.5 font-bold text-base tracking-tight group">
          <span className="relative">
            <span className="absolute inset-0 rounded-full bg-primary/40 blur-md group-hover:bg-primary/60 transition" />
            <img src={logo} alt="Capybara Headshop" className="relative size-9 rounded-full ring-1 ring-primary/40 object-cover" />
          </span>
          <span className="font-display text-lg tracking-wider">
            CAPYBARA <span className="text-primary">HEADSHOP</span>
          </span>
          <span className="sr-only">{STORE_NAME}</span>
        </Link>

        <Link
          to="/carrinho"
          className="relative size-10 -mr-2 grid place-items-center rounded-full hover:bg-muted/60 transition"
          aria-label="Carrinho"
        >
          <ShoppingCart className="size-5" />
          {count > 0 && (
            <motion.span
              key={count}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-extrabold grid place-items-center shadow-glow"
            >
              {count}
            </motion.span>
          )}
        </Link>
      </div>

      <AnimatePresence>
        {open && showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-border/60 overflow-hidden"
          >
            <div className="max-w-5xl mx-auto px-4 py-3">
              <input
                autoFocus
                value={search ?? ""}
                onChange={(e) => onSearch?.(e.target.value)}
                placeholder="Buscar produto..."
                className="w-full h-11 px-4 rounded-full bg-muted/70 border border-border/60 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
