import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { PRODUCTS, formatBRL, discountPct } from "@/lib/products";
import { useCart } from "@/lib/cart-store";

export function PromoStrip() {
  const promos = [...PRODUCTS]
    .filter((p) => p.oldPrice)
    .sort((a, b) => discountPct(b) - discountPct(a))
    .slice(0, 8);
  const { add } = useCart();

  if (promos.length === 0) return null;

  return (
    <section id="promos" className="max-w-5xl mx-auto px-4 mt-2">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 border border-primary/30 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-primary">
          <Flame className="size-3.5" /> Top ofertas
        </span>
        <span className="flex-1 h-px bg-gradient-to-r from-primary/40 to-transparent" />
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2 snap-x snap-mandatory">
        {promos.map((p, i) => (
          <motion.button
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            whileHover={{ y: -3 }}
            onClick={() => add(p)}
            className="snap-start shrink-0 w-40 rounded-2xl overflow-hidden border border-border/70 hover:border-primary/50 bg-card/80 backdrop-blur shadow-card hover:shadow-glow text-left transition-all"
          >
            <div className="relative aspect-square bg-muted/60 overflow-hidden">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
              <span className="absolute top-2 left-2 bg-gradient-primary text-primary-foreground text-[11px] font-extrabold px-1.5 py-0.5 rounded-md shadow-glow">
                -{discountPct(p)}%
              </span>
            </div>
            <div className="p-2.5">
              <p className="text-[12px] font-medium line-clamp-2 leading-tight h-[30px]">{p.name}</p>
              <div className="flex items-baseline gap-1.5 mt-1.5">
                <span className="text-sm font-extrabold text-primary">{formatBRL(p.price)}</span>
                {p.oldPrice && <span className="text-[10px] text-muted-foreground line-through">{formatBRL(p.oldPrice)}</span>}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
