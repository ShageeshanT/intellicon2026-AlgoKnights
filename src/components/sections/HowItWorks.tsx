import Image from "next/image";
import { Lock, ScanSearch, ShoppingBag } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import plane from "@/images/plane.jpg";
import { cx } from "@/lib/cx";

const STEPS = [
  {
    icon: ScanSearch,
    title: "Find",
    text: "See who lands in your city in the next 3 days, week or month, or post a request and let travellers come to you.",
    tint: "bg-tint-pink",
    chip: "bg-brand",
    numeral: "text-brand/15",
  },
  {
    icon: ShoppingBag,
    title: "Agree",
    text: "The item list, maximum price, reward and deadline are fixed before anyone spends money.",
    tint: "bg-tint-orange",
    chip: "bg-sun",
    numeral: "text-sun/25",
  },
  {
    icon: Lock,
    title: "Protect",
    text: "You pay once, into escrow. The traveller is paid only when you enter the handover code.",
    tint: "bg-tint-violet",
    chip: "bg-violet",
    numeral: "text-violet/15",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl scroll-mt-24 px-4 pt-16 sm:px-6 sm:pt-24">
      <div className="flex items-center gap-4">
        <Image src={plane} alt="" placeholder="blur" sizes="72px" className="h-16 w-16 shrink-0 rounded-3xl object-cover shadow-md sm:h-[4.5rem] sm:w-[4.5rem]" />
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">How it works</p>
          <h2 className="text-3xl font-bold sm:text-4xl">Three steps, one handover</h2>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.08} className={cx("relative overflow-hidden rounded-[1.75rem] p-7 hover:-translate-y-1", step.tint)}>
            <span className={cx("pointer-events-none absolute right-5 top-1 font-display text-[7.5rem] font-bold leading-none", step.numeral)} aria-hidden>
              {i + 1}
            </span>
            <span className={cx("relative flex h-12 w-12 items-center justify-center rounded-2xl text-white", step.chip)}>
              <step.icon className="h-6 w-6" aria-hidden />
            </span>
            <h3 className="relative mt-10 text-2xl font-bold">{step.title}</h3>
            <p className="relative mt-2 text-sm text-ink/70">{step.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
