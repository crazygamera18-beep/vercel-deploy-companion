import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/shop/Header";
import { CategoryNav } from "@/components/shop/CategoryNav";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductDetailModal } from "@/components/shop/ProductDetailModal";
import { BottomBar } from "@/components/shop/BottomBar";
import { FloatingWhatsapp } from "@/components/shop/FloatingWhatsapp";
import { Hero } from "@/components/shop/Hero";
import { PromoStrip } from "@/components/shop/PromoStrip";
import { PRODUCTS, CATEGORIES, type Category, type Product } from "@/lib/products";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Capybara Headshop — Catálogo Premium" },
      { name: "description", content: "Sedas, piteiras de vidro, dichavadores, cases, isqueiros e kits selecionados. Pedidos via WhatsApp." },
    ],
  }),
});

function MarqueeBar() {
  const items = ["Frete rápido em SP", "Pagamento via Pix com desconto", "Atendimento no WhatsApp", "Entrega discreta", "Curadoria premium"];
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-primary/15 bg-primary/5">
      <div className="flex gap-10 py-2 whitespace-nowrap animate-[marquee_28s_linear_infinite] text-[11px] font-bold uppercase tracking-[0.2em] text-primary/90">
        {loop.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-3">
            <span className="size-1.5 rounded-full bg-primary" /> {t}
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

function Home() {
  const [active, setActive] = useState<Category | "Início">("Início");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const catalogRef = useRef<HTMLDivElement>(null);

  const groups = useMemo(() => {
    const term = search.trim().toLowerCase();
    const filterByTerm = (p: (typeof PRODUCTS)[number]) => !term || p.name.toLowerCase().includes(term);
    if (active !== "Início") {
      return [{ category: active as Category, items: PRODUCTS.filter((p) => p.category === active && filterByTerm(p)) }];
    }
    return CATEGORIES.map((c) => ({
      category: c,
      items: PRODUCTS.filter((p) => p.category === c && filterByTerm(p)),
    })).filter((g) => g.items.length > 0);
  }, [active, search]);

  const scrollToCatalog = () => catalogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="min-h-screen bg-background pb-32">
      <Header onSearch={setSearch} search={search} />
      {active === "Início" && !search && (
        <>
          <Hero onShop={scrollToCatalog} />
          <MarqueeBar />
          <div className="mt-5">
            <PromoStrip />
          </div>
        </>
      )}
      <div ref={catalogRef}>
        <CategoryNav active={active} onChange={(c) => { setActive(c); setSearch(""); }} />
      </div>

      <main className="max-w-5xl mx-auto px-4 py-5 space-y-10">
        {groups.map((g) => (
          <motion.section
            key={g.category}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45 }}
          >
            <h2 className="font-display text-2xl tracking-wider mb-3 flex items-center gap-3">
              <span className="size-1.5 rounded-full bg-primary shadow-glow" />
              <span>{g.category.toUpperCase()}</span>
              <span className="text-xs text-muted-foreground font-sans font-normal normal-case tracking-normal">
                {g.items.length} {g.items.length === 1 ? "item" : "itens"}
              </span>
              <span className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {g.items.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} onOpen={setSelected} />
              ))}
            </div>
          </motion.section>
        ))}
        {groups.length === 0 && (
          <p className="text-center text-muted-foreground py-20">Nenhum produto encontrado.</p>
        )}
      </main>

      <FloatingWhatsapp />
      <BottomBar />
      <ProductDetailModal
        product={selected}
        open={selected !== null}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
