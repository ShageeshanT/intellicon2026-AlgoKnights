"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/images/logo.png";
import logoWhite from "@/images/logo_white.png";
import { cx } from "@/lib/cx";
import { SIGN_IN_URL } from "@/lib/site";

const LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#safety", label: "Safety" },
  { href: "#travellers", label: "For travellers" },
];

/** Fast out, a small overshoot, then settle. Feels like a spring. */
const SPRING = "cubic-bezier(0.3, 1.25, 0.4, 1)";
const morph: CSSProperties = { transitionProperty: "all", transitionDuration: "650ms", transitionTimingFunction: SPRING };

/**
 * At the top of the page the bar lies open over the picture. Once the page scrolls it gathers into
 * a floating glass pill, with a soft glow behind it that grows with the speed of the scroll.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<{ left: number; width: number } | null>(null);
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // A smoothed scroll speed drives the size, strength and blur of the glow.
    let lastY = window.scrollY;
    let lastT = performance.now();
    let target = 0;
    let speed = 0;
    let frame = 0;

    const paint = () => {
      speed += (target - speed) * 0.14;
      target *= 0.86;
      const k = Math.min(speed, 2500) / 2500;
      const node = glow.current;
      if (node) {
        node.style.transform = `translateX(-50%) scale(${1 + 0.18 * k})`;
        node.style.opacity = String(0.55 + 0.45 * Math.min(1, k * 3));
        node.style.filter = `blur(${18 + 16 * k}px)`;
      }
      frame = speed > 2 || target > 2 ? requestAnimationFrame(paint) : 0;
    };

    const onScroll = () => {
      const now = performance.now();
      const y = window.scrollY;
      target = Math.max(target, (Math.abs(y - lastY) / Math.max(now - lastT, 1)) * 1000);
      lastY = y;
      lastT = now;
      setScrolled(y > 40);
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(frame);
    };
  }, []);

  // White text while the bar lies over the picture, dark text once it is a pill.
  const light = !scrolled;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div
        ref={glow}
        aria-hidden
        className={cx(
          "pointer-events-none absolute left-1/2 top-[14px] h-16 w-[900px] max-w-[calc(100%-32px)] rounded-full transition-[visibility] duration-500",
          !scrolled && "invisible",
        )}
        style={{
          transform: "translateX(-50%)",
          opacity: 0.55,
          filter: "blur(18px)",
          background: "radial-gradient(ellipse at center, rgba(196,0,112,0.5) 0%, rgba(245,137,30,0.26) 45%, rgba(245,137,30,0) 75%)",
        }}
      />

      <div
        style={{
          ...morph,
          marginTop: scrolled ? 14 : 30,
          maxWidth: scrolled ? 900 : 1480,
          padding: scrolled ? "8px 10px 8px 22px" : "6px 24px",
          backgroundColor: scrolled ? "rgba(255,248,243,0.82)" : "rgba(255,248,243,0)",
          // Same number of shadow layers in both states so the glow fades instead of snapping.
          boxShadow: scrolled
            ? "0 0 0 1px rgba(196,0,112,0.14), 0 0 44px -4px rgba(196,0,112,0.35), 0 22px 50px -18px rgba(142,26,139,0.35), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(255,255,255,0.3)"
            : "0 0 0 0 rgba(196,0,112,0), 0 0 0 0 rgba(196,0,112,0), 0 0 0 0 rgba(142,26,139,0), inset 0 0 0 rgba(255,255,255,0), inset 0 0 0 rgba(255,255,255,0)",
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "blur(0px)",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "blur(0px)",
        }}
        className="nav-enter pointer-events-auto relative mx-auto flex w-[calc(100%-32px)] items-center justify-between gap-4 rounded-full sm:w-[calc(100%-48px)]"
      >
        {/* A sheen across the glass once the pill has formed. */}
        <div
          aria-hidden
          className={cx("pointer-events-none absolute inset-0 overflow-hidden rounded-full transition-opacity duration-500", scrolled ? "opacity-100" : "opacity-0")}
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0) 100%)", mixBlendMode: "overlay" }}
        />

        <Link href="/" aria-label="WAYLO home" className="relative shrink-0">
          <span style={{ ...morph, height: scrolled ? 46 : 76, aspectRatio: "597 / 317" }} className="relative block max-sm:h-12!">
            <Image
              src={logoWhite}
              alt=""
              fill
              sizes="150px"
              loading="eager"
              className={cx("object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] transition-opacity duration-300", light ? "opacity-100" : "opacity-0")}
            />
            <Image src={logo} alt="WAYLO" fill sizes="150px" loading="eager" className={cx("object-contain transition-opacity duration-300", light ? "opacity-0" : "opacity-100")} />
          </span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex" aria-label="Sections" onMouseLeave={() => setHover(null)}>
          {/* One highlight that slides to whichever link the pointer is on. */}
          <span
            aria-hidden
            className={cx("absolute inset-y-0 left-0 rounded-full", light ? "bg-white/20 backdrop-blur-sm" : "bg-brand/10", hover ? "opacity-100" : "opacity-0")}
            style={{
              width: hover?.width ?? 0,
              transform: `translateX(${hover?.left ?? 0}px)`,
              transition: `transform 420ms ${SPRING}, width 420ms ${SPRING}, opacity 200ms ease, background-color 300ms ease`,
            }}
          />
          {LINKS.map((link, i) => {
            const point = (el: HTMLElement) => setHover({ left: el.offsetLeft, width: el.offsetWidth });
            return (
              <a
                key={link.href}
                href={link.href}
                onMouseEnter={(event) => point(event.currentTarget)}
                onFocus={(event) => point(event.currentTarget)}
                onBlur={() => setHover(null)}
                style={{ animationDelay: `${180 + i * 70}ms` }}
                className={cx(
                  "nav-link-enter relative rounded-full px-4 py-2 text-sm font-bold transition-colors duration-300",
                  light ? "text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]" : "text-ink/70 hover:text-ink",
                )}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="relative hidden shrink-0 items-center gap-2 lg:flex">
          <div style={morph} className={cx("overflow-hidden", scrolled ? "max-w-0 opacity-0" : "max-w-[7rem] opacity-100")}>
            <a
              href={SIGN_IN_URL}
              tabIndex={scrolled ? -1 : 0}
              className="block whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold text-white transition-colors [text-shadow:0_1px_10px_rgba(0,0,0,0.45)] hover:bg-white/15"
            >
              Sign in
            </a>
          </div>
          <a
            href={SIGN_IN_URL}
            className={cx(
              "block whitespace-nowrap rounded-full px-6 py-3 text-sm font-bold transition duration-300 hover:scale-[1.04] active:scale-[0.97]",
              light ? "bg-white text-ink" : "brand-gradient text-white shadow-lg shadow-brand/25",
            )}
          >
            Get started
          </a>
        </div>

        <div className="relative flex shrink-0 items-center gap-1 lg:hidden">
          <a
            href={SIGN_IN_URL}
            className={cx("rounded-full px-4 py-2.5 text-xs font-bold transition-colors duration-300", light ? "bg-white text-ink" : "brand-gradient text-white")}
          >
            Get started
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={cx("grid h-11 w-11 place-items-center rounded-full transition-colors", light ? "text-white hover:bg-white/15" : "text-ink hover:bg-ink/5")}
          >
            <span className={cx("transition-transform duration-300", open && "rotate-90")}>{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</span>
          </button>
        </div>
      </div>

      {/* Phone menu, drops in below the bar. */}
      <div
        className={cx(
          "mx-4 mt-3 overflow-hidden rounded-3xl bg-white/95 shadow-xl ring-1 ring-black/5 backdrop-blur-xl transition duration-300 lg:hidden",
          open ? "pointer-events-auto translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0",
        )}
      >
        <div className="flex flex-col gap-1 px-5 py-5">
          {LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${60 + i * 50}ms` : "0ms" }}
              className={cx("py-1.5 font-display text-2xl font-bold text-ink transition duration-300", open ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0")}
            >
              {link.label}
            </a>
          ))}
          <a href={SIGN_IN_URL} onClick={() => setOpen(false)} className="mt-3 rounded-full border border-ink/15 px-5 py-3 text-center text-sm font-bold">
            Sign in
          </a>
        </div>
      </div>
    </header>
  );
}
