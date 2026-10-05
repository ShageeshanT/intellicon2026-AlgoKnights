import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const display = localFont({
  src: [
    { path: "../fonts/montserrat_regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/montserrat_bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

const text = localFont({
  src: [
    { path: "../fonts/opensans_regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/opensans_bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-opensans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "WAYLO | Someone is already flying in",
  description:
    "Need something from abroad? A verified traveller already flying to your city buys it, brings it and hands it over. Your money waits in escrow until it is in your hands.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#111111" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
