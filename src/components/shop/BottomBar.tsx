import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { formatBRL } from "@/lib/products";

export function BottomBar() {
  const { count, subtotal } = useCart();
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          className="fixed bottom-0 inset-x-0 z-40 bg-background/85 backdrop-blur-xl border-t border-primary/20 shadow-bar safe-bottom"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-base font-extrabold leading-tight text-primary">{formatBRL(subtotal)}</p>
              <p className="text-xs text-muted-foreground">{count} {count === 1 ? "item" : "itens"}</p>
            </div>
            <Link
              to="/carrinho"
              className="flex items-center gap-2 h-12 px-5 rounded-xl bg-gradient-primary text-primary-foreground font-bold shadow-glow hover:shadow-glow-strong active:scale-[0.98] transition"
            >
              <ShoppingCart className="size-5" />
              Ver carrinho
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
