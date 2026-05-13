import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { useCart, type PaymentType } from "@/lib/cart-store";
import { formatBRL } from "@/lib/products";
import { WHATSAPP_NUMBER, STORE_NAME } from "@/lib/shop-config";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/finalizar")({
  component: CheckoutPage,
  head: () => ({ meta: [{ title: "Finalizar pedido" }] }),
});

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome"),
  telefone: z.string().trim().min(8, "Telefone inválido"),
  cidade: z.string().trim().min(2, "Informe sua cidade"),
  bairro: z.string().trim().min(2, "Informe seu bairro"),
});

const PAYMENTS: PaymentType[] = ["Pix", "Dinheiro", "Cartão"];

function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, oldSubtotal, discount, count, observation, delivery, payment, setPayment, clear } = useCart();
  const [form, setForm] = useState({ nome: "", telefone: "", cidade: "", bairro: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [cashAmount, setCashAmount] = useState("");

  const cashValue = parseFloat(cashAmount.replace(",", ".")) || 0;
  const change = cashValue - subtotal;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 text-center">
        <div>
          <p className="text-muted-foreground mb-6">Carrinho vazio</p>
          <Link to="/" className="inline-flex h-11 px-6 rounded-xl bg-primary text-primary-foreground font-semibold items-center">
            Ver produtos
          </Link>
        </div>
      </div>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: typeof errors = {};
      parsed.error.issues.forEach((i) => { errs[i.path[0] as keyof typeof form] = i.message; });
      setErrors(errs);
      return;
    }

    if (payment === "Dinheiro" && cashValue > 0 && cashValue < subtotal) {
      setErrors({ ...errors });
      return;
    }

    const lines = items.map((i) => `• ${i.product.name} x ${i.qty} = ${formatBRL(i.product.price * i.qty)}`);
    const paymentLine =
      payment === "Dinheiro" && cashValue >= subtotal
        ? `*Forma de pagamento:* Dinheiro (paga com ${formatBRL(cashValue)} — troco ${formatBRL(change)})`
        : `*Forma de pagamento:* ${payment}`;

    const msg = [
      `━━━━━━━━━━━━`,
      `*NOVO PEDIDO* — ${STORE_NAME}`,
      `━━━━━━━━━━━━`,
      ``,
      `*Nome:* ${parsed.data.nome}`,
      `*Telefone:* ${parsed.data.telefone}`,
      `*Cidade:* ${parsed.data.cidade}`,
      `*Bairro:* ${parsed.data.bairro}`,
      ``,
      `*Forma de entrega:* ${delivery}`,
      paymentLine,
      ``,
      `*Itens do pedido:*`,
      ...lines,
      ``,
      observation ? `*Observação:* ${observation}` : null,
      observation ? `` : null,
      discount > 0 ? `Subtotal: ${formatBRL(oldSubtotal)}` : null,
      discount > 0 ? `Descontos: -${formatBRL(discount)}` : null,
      `*Total do pedido: ${formatBRL(subtotal)}*`,
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    clear();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-background pb-40">
      <div className="sticky top-0 z-30 bg-card border-b border-border">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link to="/carrinho" className="size-10 -ml-2 grid place-items-center rounded-full hover:bg-muted">
            <ArrowLeft className="size-5" />
          </Link>
          <h1 className="font-bold">Finalizar pedido</h1>
        </div>
      </div>

      <form id="checkout-form" onSubmit={submit} className="max-w-3xl mx-auto px-4 py-5 space-y-5">
        <section className="space-y-3">
          <h2 className="font-bold">Dados</h2>
          {([
            { k: "nome" as const, label: "Nome e sobrenome", placeholder: "Seu nome" },
            { k: "telefone" as const, label: "Telefone", placeholder: "(00) 00000-0000", inputMode: "tel" as const },
            { k: "cidade" as const, label: "Cidade", placeholder: "Sua cidade" },
            { k: "bairro" as const, label: "Bairro", placeholder: "Seu bairro" },
          ]).map((f) => (
            <div key={f.k}>
              <label className="text-xs text-muted-foreground">{f.label}</label>
              <input
                value={form[f.k]}
                inputMode={f.inputMode}
                onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                placeholder={f.placeholder}
                className="w-full h-11 px-3 rounded-lg bg-card border border-border text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
              {errors[f.k] && <p className="text-xs text-destructive mt-1">{errors[f.k]}</p>}
            </div>
          ))}
        </section>

        <section className="space-y-2">
          <h2 className="font-bold">Forma de pagamento</h2>
          <div className="grid grid-cols-2 gap-2">
            {PAYMENTS.map((p) => (
              <button
                type="button"
                key={p}
                onClick={() => setPayment(p)}
                className={cn(
                  "h-12 rounded-xl border-2 font-semibold text-sm transition",
                  payment === p ? "border-primary bg-card" : "border-border bg-card hover:border-foreground/30"
                )}
              >
                {p}
              </button>
            ))}
          </div>

          {payment === "Dinheiro" && (
            <div className="bg-card rounded-xl border border-border p-3 space-y-2 mt-2">
              <label className="text-xs text-muted-foreground">Troco para quanto?</label>
              <input
                value={cashAmount}
                onChange={(e) => setCashAmount(e.target.value.replace(/[^\d.,]/g, ""))}
                placeholder="Ex: 100,00"
                inputMode="decimal"
                className="w-full h-11 px-3 rounded-lg bg-muted border border-border text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
              {cashValue > 0 && cashValue < subtotal && (
                <p className="text-xs text-destructive">Valor menor que o total do pedido.</p>
              )}
              {cashValue >= subtotal && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Troco</span>
                  <span className="font-bold">{formatBRL(change)}</span>
                </div>
              )}
              <p className="text-[11px] text-muted-foreground">Deixe em branco se não precisar de troco.</p>
            </div>
          )}
        </section>

        <section className="bg-card rounded-2xl border border-border p-4 space-y-2 text-sm">
          <div className="flex justify-between"><span>{count} {count === 1 ? "item" : "itens"}</span><span className="font-semibold">{formatBRL(oldSubtotal)}</span></div>
          {discount > 0 && (
            <div className="flex justify-between text-muted-foreground"><span>Descontos</span><span>-{formatBRL(discount)}</span></div>
          )}
          <div className="flex justify-between pt-2 border-t border-border text-base"><span className="font-bold">Total</span><span className="font-bold">{formatBRL(subtotal)}</span></div>
        </section>
      </form>

      <div className="fixed bottom-0 inset-x-0 z-40 bg-card border-t border-border shadow-bar safe-bottom">
        <div className="max-w-3xl mx-auto px-4 py-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total:</span>
            <span className="font-bold text-lg">{formatBRL(subtotal)}</span>
          </div>
          <button
            type="submit"
            form="checkout-form"
            className="w-full h-12 rounded-xl bg-gradient-primary text-primary-foreground font-bold flex items-center justify-center gap-2 shadow-glow hover:shadow-glow-strong active:scale-[0.99] transition glow-pulse"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg>
            Enviar pedido
          </button>
        </div>
      </div>
    </div>
  );
}
