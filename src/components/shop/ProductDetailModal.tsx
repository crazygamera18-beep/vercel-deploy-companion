import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatBRL } from "@/lib/products";
import { useCart } from "@/lib/cart-store";

export function ProductDetailModal({
  product,
  open,
  onClose,
}: {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}) {
  const { add, inc, dec, getQty } = useCart();
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (open) setActiveImg(0);
  }, [open, product?.id]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!product) return null;
  const qty = getQty(product.id);
  const gallery =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];
  const hasGallery = gallery.length > 1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-lg bg-card border border-border/70 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-glow max-h-[95vh] flex flex-col"
          >
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="absolute top-3 right-3 z-10 size-9 grid place-items-center rounded-full bg-background/80 backdrop-blur border border-border/70 hover:border-primary/50 transition"
            >
              <X className="size-4" />
            </button>

            <div className="overflow-y-auto flex-1 overscroll-contain">
              <div className="relative bg-muted/40 w-full h-[42vh] sm:h-auto sm:aspect-square">
                <img
                  src={gallery[activeImg]}
                  alt={product.alt}
                  className="w-full h-full object-contain sm:object-cover"
                />
              </div>

            {hasGallery && (
              <div className="flex gap-2 px-4 pt-3 overflow-x-auto">
                {gallery.map((src, i) => (
                  <button
                    key={src + i}
                    onClick={() => setActiveImg(i)}
                    className={`size-16 shrink-0 rounded-lg overflow-hidden border-2 transition ${
                      i === activeImg
                        ? "border-primary shadow-glow"
                        : "border-border/60 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`${product.name} ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

              <div className="p-5">
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/30 px-2 py-0.5 rounded-md">
                  {product.category}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl mt-2 leading-tight">
                  {product.name}
                </h2>
                <p className="text-2xl font-extrabold text-primary mt-2">
                  {formatBRL(product.price)}
                </p>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="border-t border-border/60 p-4 flex items-center gap-3 bg-card/80 backdrop-blur">
              {qty === 0 ? (
                <button
                  onClick={() => add(product)}
                  className="flex-1 h-12 rounded-xl bg-gradient-primary text-primary-foreground font-bold shadow-glow hover:shadow-glow-strong active:scale-[0.98] transition inline-flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="size-4" /> Adicionar ao carrinho
                </button>
              ) : (
                <div className="flex-1 flex items-center justify-between bg-muted/80 border border-border/60 rounded-xl p-1">
                  <button
                    onClick={() => dec(product.id)}
                    className="size-10 grid place-items-center rounded-lg hover:bg-card transition"
                    aria-label="Diminuir"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="font-bold">{qty} no carrinho</span>
                  <button
                    onClick={() => inc(product.id)}
                    className="size-10 grid place-items-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-glow-strong transition"
                    aria-label="Aumentar"
                  >
                    <Plus className="size-4" strokeWidth={3} />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
