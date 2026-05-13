import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronRight, Plus, Minus, Trash2, Truck, Store } from "lucide-react";
import { Header } from "@/components/shop/Header";
import { useCart } from "@/lib/cart-store";
import { formatBRL } from "@/lib/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/carrinho")({
  component: CartPage,
  head: () => ({ meta: [{ title: "Carrinho — Capybara Headshop" }] }),
});

function CartPage() {
  const { items, inc, dec, remove, clear, subtotal, count, observation, setObservation, delivery, setDelivery } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground mb-6">Seu carrinho está vazio</p>
          <Link to="/" className="inline-flex h-11 px-6 rounded-xl bg-primary text-primary-foreground font-semibold items-center">
            Ver produtos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="sticky top-0 z-30 bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link to="/" className="size-10 -ml-2 grid place-items-center rounded-full hover:bg-muted">
            <ArrowLeft className="size-5" />
          </Link>
          <h1 className="font-bold">Carrinho ({count})</h1>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-5 space-y-5">
        <div className="space-y-2">
          <AnimatePresence>
            {items.map((i) => (
              <motion.div
                key={i.product.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 30 }}
                className="bg-card rounded-2xl border border-border p-3 flex gap-3"
              >
                <img src={i.product.image} alt="" className="size-16 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <h3 className="text-sm font-medium leading-snug line-clamp-2">{i.product.name}</h3>
                    <button onClick={() => remove(i.product.id)} className="text-muted-foreground hover:text-destructive shrink-0">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  {i.product.oldPrice && (
                    <p className="text-[11px] text-muted-foreground line-through">{formatBRL(i.product.oldPrice * i.qty)}</p>
                  )}
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="font-bold">{formatBRL(i.product.price * i.qty)}</p>
                    <div className="flex items-center gap-2 bg-muted rounded-lg p-0.5">
                      <button onClick={() => dec(i.product.id)} className="size-7 grid place-items-center rounded-md hover:bg-card">
                        <Minus className="size-3" />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{i.qty}</span>
                      <button onClick={() => inc(i.product.id)} className="size-7 grid place-items-center rounded-md bg-primary text-primary-foreground">
                        <Plus className="size-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between text-sm">
          <Link to="/" className="font-semibold flex items-center gap-1 hover:underline">
            Ver mais produtos <ChevronRight className="size-4" />
          </Link>
          <button onClick={clear} className="font-semibold text-muted-foreground underline">Limpar carrinho</button>
        </div>

        <section className="bg-card rounded-2xl border border-border p-4 space-y-2">
          <label className="font-bold block">Observação</label>
          <textarea
            value={observation}
            onChange={(e) => setObservation(e.target.value.slice(0, 200))}
            placeholder="Escreva aqui a observação do seu pedido"
            rows={3}
            className="w-full bg-muted rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          />
          <p className="text-xs text-muted-foreground text-right">{observation.length}/200</p>
        </section>

        <section className="space-y-2">
          <h3 className="font-bold">Forma de entrega</h3>
          <div className="grid grid-cols-2 gap-2">
            {([
              { v: "Entrega" as const, icon: Truck },
              { v: "Retirada" as const, icon: Store },
            ]).map(({ v, icon: Icon }) => (
              <button
                key={v}
                onClick={() => setDelivery(v)}
                className={cn(
                  "p-4 rounded-xl border-2 flex items-center gap-3 transition",
                  delivery === v ? "border-primary bg-card" : "border-border bg-card hover:border-foreground/30"
                )}
              >
                <Icon className="size-5" />
                <span className="font-semibold text-sm">{v}</span>
              </button>
            ))}
          </div>
        </section>
      </main>

      <div className="fixed bottom-0 inset-x-0 z-40 bg-card border-t border-border shadow-bar safe-bottom">
        <div className="max-w-3xl mx-auto px-4 py-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total:</span>
            <span className="font-bold text-lg">{formatBRL(subtotal)}</span>
          </div>
          <button
            onClick={() => navigate({ to: "/finalizar" })}
            className="w-full h-12 rounded-xl bg-gradient-primary text-primary-foreground font-bold shadow-glow hover:shadow-glow-strong active:scale-[0.99] transition"
          >
            Continuar para finalizar
          </button>
        </div>
      </div>
    </div>
  );
}
