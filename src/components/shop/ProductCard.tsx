import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatBRL, discountPct } from "@/lib/products";
import { useCart } from "@/lib/cart-store";

export function ProductCard({
  product,
  index = 0,
  onOpen,
}: {
  product: Product;
  index?: number;
  onOpen?: (p: Product) => void;
}) {
  const { add, inc, dec, getQty } = useCart();
  const qty = getQty(product.id);
  const pct = discountPct(product);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.28, delay: (index % 10) * 0.03 }}
      onClick={() => onOpen?.(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen?.(product);
        }
      }}
      className="group relative bg-card/80 backdrop-blur rounded-2xl border border-border/70 hover:border-primary/40 shadow-card hover:shadow-glow overflow-hidden flex transition-all cursor-pointer"
    >
      <div className="relative w-28 sm:w-32 shrink-0 bg-muted/60">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={256}
          height={256}
          className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent pointer-events-none" />
        {pct > 0 && (
          <span className="absolute top-2 left-2 bg-gradient-primary text-primary-foreground text-[11px] font-extrabold px-2 py-0.5 rounded-md shadow-glow">
            -{pct}%
          </span>
        )}
      </div>

      <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
        <h3 className="text-sm font-medium leading-snug line-clamp-2 text-foreground/95">{product.name}</h3>
        <div className="flex items-end justify-between gap-2 mt-2">
          <div className="min-w-0">
            {product.oldPrice && (
              <p className="text-[11px] text-muted-foreground line-through leading-none">
                {formatBRL(product.oldPrice)}
              </p>
            )}
            <p className="text-base font-extrabold leading-tight mt-0.5 text-primary">{formatBRL(product.price)}</p>
          </div>

          {qty === 0 ? (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { e.stopPropagation(); add(product); }}
              className="size-9 rounded-lg bg-gradient-primary text-primary-foreground grid place-items-center shadow-glow hover:shadow-glow-strong transition shrink-0"
              aria-label="Adicionar"
            >
              <Plus className="size-4" strokeWidth={3} />
            </motion.button>
          ) : (
            <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 bg-muted/80 border border-border/60 rounded-lg p-0.5 shrink-0">
              <button
                onClick={(e) => { e.stopPropagation(); dec(product.id); }}
                className="size-8 grid place-items-center rounded-md hover:bg-card transition"
                aria-label="Diminuir"
              >
                <Minus className="size-3.5" />
              </button>
              <span className="text-sm font-bold w-4 text-center">{qty}</span>
              <button
                onClick={(e) => { e.stopPropagation(); inc(product.id); }}
                className="size-8 grid place-items-center rounded-md bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-glow-strong transition"
                aria-label="Aumentar"
              >
                <Plus className="size-3.5" strokeWidth={3} />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
