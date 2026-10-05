import { Reveal } from "@/components/Reveal";

const ARRIVALS = [
  { name: "Tharushi", from: "Chennai", when: "in 2 days", kg: "12 kg" },
  { name: "Kavin", from: "Bangalore", when: "in 4 days", kg: "8 kg" },
  { name: "Ayesha", from: "Dubai", when: "in 6 days", kg: "15 kg" },
];

export function Pitch() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-20">
      <Reveal className="grid items-center gap-6 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="inline-flex rounded-full bg-tint-pink px-3.5 py-1.5 text-xs font-bold text-brand-dark">Any route, launching India to Sri Lanka</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">Need something from abroad?</h2>
          <p className="mt-3 max-w-lg text-base text-ink/70 sm:text-lg">
            A verified traveller already on their way to your city buys it, brings it and hands it over. Your money waits in escrow until it is in your hands.
          </p>
          <p className="mt-4 text-sm font-bold text-muted">No courier. No forwarding warehouse. No waiting two weeks.</p>
        </div>

        <div className="rounded-[1.75rem] bg-tint-orange p-3">
          <div className="rounded-[1.4rem] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-muted">Arriving in Colombo</p>
              <span className="rounded-full bg-tint-pink px-2.5 py-1 text-xs font-bold text-brand-dark">This week</span>
            </div>
            <ul className="mt-2 divide-y divide-line">
              {ARRIVALS.map((t) => (
                <li key={t.name} className="flex items-center gap-3 py-2.5">
                  <span className="brand-gradient flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold text-white">
                    {t.name[0]}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold leading-tight">{t.name}</p>
                    <p className="text-xs text-muted">
                      from {t.from}, lands {t.when}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-muted">{t.kg} spare</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between gap-3 px-4 pb-2 pt-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink/70">Held in escrow</p>
              <p className="whitespace-nowrap font-display text-2xl font-bold">LKR 17,160</p>
            </div>
            <p className="max-w-[11rem] text-right text-xs text-ink/70">Released when you enter the handover code.</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
