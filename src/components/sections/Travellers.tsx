import { ArrowRight } from "lucide-react";
import { Artwork } from "@/components/Artwork";
import { SIGN_IN_URL } from "@/lib/site";

export function Travellers() {
  return (
    <section id="travellers" className="mx-auto max-w-[1400px] scroll-mt-24 px-3 py-16 sm:px-5 sm:py-24">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-ink sm:rounded-[2.25rem]">
        {/* The same picture as the hero, zoomed in on the sunset side. */}
        <div className="absolute inset-y-0 right-0 w-[160%]" aria-hidden>
          <Artwork sizes="160vw" className="absolute inset-0 h-full w-full object-cover object-[center_45%]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" aria-hidden />

        <div className="relative px-6 py-14 text-white sm:px-12 sm:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffc2e3]">For travellers</p>
          <h2 className="mt-2 max-w-xl text-3xl font-bold sm:text-5xl">Your spare luggage is worth something.</h2>
          <p className="mt-4 max-w-lg text-white/80">
            List your trip, pick the requests you like, and get paid the day you hand over. You are repaid the item cost and any duty, plus the reward.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={SIGN_IN_URL} className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-ink transition hover:bg-white/90">
              List a trip <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={SIGN_IN_URL}
              className="inline-flex items-center rounded-full border border-white/40 px-7 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:border-white"
            >
              Browse open requests
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
