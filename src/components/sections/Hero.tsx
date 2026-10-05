import Image from "next/image";
import { ArrowRight } from "lucide-react";
import hero from "@/images/hero.jpg";
import { SIGN_IN_URL } from "@/lib/site";

export function Hero() {
  return (
    <section className="mx-auto max-w-[1600px] px-3 pt-3 sm:px-5 sm:pt-5">
      {/* On wide screens the picture is as tall as the window, so the whole hero fits without scrolling. */}
      <div className="relative h-[560px] overflow-hidden rounded-[1.75rem] bg-ink sm:rounded-[2.25rem] lg:h-[clamp(560px,calc(100svh-2.5rem),820px)]">
        <Image
          src={hero}
          alt="A cheerful suitcase waves at a plane flying over a coastal city at sunset"
          fill
          preload
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-[22%_center] lg:object-[center_45%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/35" aria-hidden />

        <div className="absolute inset-x-5 bottom-6 flex flex-col gap-5 sm:inset-x-9 sm:bottom-9 lg:flex-row lg:items-end lg:justify-between">
          <h1 className="font-display text-[2.1rem] font-bold leading-[1.05] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] sm:text-5xl lg:text-[3.5rem]">
            Someone is already{" "}
            <span className="whitespace-nowrap bg-gradient-to-r from-[#ffc2e3] to-[#ffd08a] bg-clip-text text-transparent [text-shadow:none]">flying in.</span>
          </h1>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              href={SIGN_IN_URL}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-black/20 transition hover:bg-brand-dark active:scale-[0.98]"
            >
              Post a request <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={SIGN_IN_URL}
              className="inline-flex items-center rounded-full border border-white/50 bg-white/15 px-7 py-3.5 text-base font-bold text-white backdrop-blur-md transition hover:bg-white/25 active:scale-[0.98]"
            >
              I&apos;m travelling
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
