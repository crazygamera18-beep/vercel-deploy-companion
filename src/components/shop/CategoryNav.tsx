import { motion } from "framer-motion";
import { CATEGORIES, type Category } from "@/lib/products";
import { cn } from "@/lib/utils";

type Props = {
  active: Category | "Início";
  onChange: (c: Category | "Início") => void;
};

export function CategoryNav({ active, onChange }: Props) {
  const all = ["Início", ...CATEGORIES] as const;
  return (
    <div className="sticky top-16 z-20 bg-background/75 backdrop-blur-xl border-b border-border/60">
      <div className="max-w-5xl mx-auto">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-3">
          {all.map((c) => {
            const isActive = active === c;
            return (
              <motion.button
                key={c}
                whileTap={{ scale: 0.94 }}
                onClick={() => onChange(c as Category | "Início")}
                className={cn(
                  "relative whitespace-nowrap px-4 h-9 rounded-full text-sm font-bold transition-all border",
                  isActive
                    ? "bg-gradient-primary text-primary-foreground border-primary shadow-glow"
                    : "bg-card/70 text-foreground/85 border-border/70 hover:border-primary/50 hover:text-primary"
                )}
              >
                {c}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
