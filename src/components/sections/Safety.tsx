import { BadgeCheck, CircleDollarSign, FileCheck2, Lock, MessageSquareLock, ShoppingBag } from "lucide-react";

const POINTS = [
  { icon: BadgeCheck, title: "Verified people", text: "A phone number, an ID and a selfie before anyone pays or earns. One account per person." },
  { icon: ShoppingBag, title: "Shop and carry only", text: "Travellers carry only what they bought themselves, new, with a receipt. Never a parcel handed to them." },
  { icon: FileCheck2, title: "Declared and legal", text: "Every item is declared on arrival with a sheet the app prepares. Duty is funded up front and repaid from escrow." },
  { icon: MessageSquareLock, title: "Everything on record", text: "Chat stays on the platform and hides contact details. If something goes wrong, an admin decides from the evidence." },
];

const PRICE_PARTS = ["Item budget", "Traveller reward", "Duty allowance", "8% service fee"];

const card = "rounded-[1.75rem] bg-white p-7 shadow-sm ring-1 ring-black/5";

export function Safety() {
  return (
    <section id="safety" className="mx-auto max-w-6xl scroll-mt-24 px-4 pt-16 sm:px-6 sm:pt-24">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Safety</p>
      <h2 className="max-w-2xl text-3xl font-bold sm:text-4xl">Built so a stranger is as safe as a friend</h2>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.75rem] bg-ink p-7 text-white md:col-span-2">
          <Lock className="h-7 w-7 text-[#ffb3da]" aria-hidden />
          <h3 className="mt-4 text-2xl font-bold">Escrow, always</h3>
          <p className="mt-2 max-w-md text-sm text-white/70">
            Money moves only when the six digit handover code is entered. Cancel before purchase and every rupee comes back.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2" aria-hidden>
            {"482916".split("").map((digit, i) => (
              <span key={i} className="flex h-12 w-10 items-center justify-center rounded-xl bg-white/10 font-display text-xl font-bold sm:h-14 sm:w-12 sm:text-2xl">
                {digit}
              </span>
            ))}
            <span className="ml-2 text-xs text-white/60">your handover code</span>
          </div>
        </div>

        {POINTS.map((point) => (
          <div key={point.title} className={card}>
            <point.icon className="h-7 w-7 text-brand" aria-hidden />
            <h3 className="mt-4 text-xl font-bold">{point.title}</h3>
            <p className="mt-2 text-sm text-muted">{point.text}</p>
          </div>
        ))}

        <div className={`${card} md:col-span-3`}>
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div className="max-w-sm">
              <CircleDollarSign className="h-7 w-7 text-brand" aria-hidden />
              <h3 className="mt-4 text-xl font-bold">One clear price</h3>
              <p className="mt-2 text-sm text-muted">Shown before you post. You get back whatever is not spent on the items or on duty.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm font-bold">
              {PRICE_PARTS.map((part, i) => (
                <span key={part} className="flex items-center gap-2">
                  {i > 0 && <span className="hidden text-muted sm:inline">+</span>}
                  <span className="rounded-full bg-paper px-4 py-2 ring-1 ring-black/5">{part}</span>
                </span>
              ))}
              <span className="hidden text-muted sm:inline">=</span>
              <span className="brand-gradient rounded-full px-4 py-2 text-white">one total</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
