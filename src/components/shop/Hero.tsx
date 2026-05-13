import { motion } from "framer-motion";
import { Sparkles, Truck, ShieldCheck, Flame } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

export function Hero({ onShop }: { onShop?: () => void }) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
      <div className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-primary/30 blur-[100px]" />
      <div className="absolute -top-10 right-0 w-80 h-80 rounded-full bg-[hsl(22_100%_45%)]/25 blur-[120px]" />

      <div className="relative max-w-5xl mx-auto px-4 pt-8 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur px-3 py-1 text-[11px] font-bold tracking-wider uppercase text-primary"
        >
          <Sparkles className="size-3.5" /> Catálogo premium · Frete rápido
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="font-display text-5xl sm:text-7xl leading-[0.95] mt-4"
        >
          A SUA <span className="text-gradient-primary">SESSÃO</span>
          <br />
          MERECE O <span className="relative inline-block">
            <span className="relative z-10">MELHOR.</span>
            <span className="absolute left-0 bottom-1 h-2 w-full bg-primary/30 -skew-x-6" />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-sm sm:text-base text-muted-foreground mt-3 max-w-md"
        >
          Sedas, piteiras de vidro, dichavadores e kits selecionados. Entrega discreta e atendimento direto no WhatsApp.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap gap-2 mt-5"
        >
          <button
            onClick={onShop}
            className="h-11 px-5 rounded-xl bg-gradient-primary text-primary-foreground font-bold shadow-glow hover:shadow-glow-strong active:scale-[0.97] transition glow-pulse"
          >
            Explorar catálogo
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="grid grid-cols-3 gap-2 mt-6 max-w-md"
        >
          {[
            { icon: Truck, label: "Envio rápido" },
            { icon: ShieldCheck, label: "Compra segura" },
            { icon: Flame, label: "Curadoria" },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-2 rounded-lg border border-border/60 bg-card/50 backdrop-blur px-2.5 py-2">
              <f.icon className="size-4 text-primary shrink-0" />
              <span className="text-[11px] font-semibold text-foreground/80 truncate">{f.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
