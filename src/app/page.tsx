import { Nav } from "@/components/Nav";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pitch } from "@/components/sections/Pitch";
import { Safety } from "@/components/sections/Safety";
import { Travellers } from "@/components/sections/Travellers";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-paper">
      <Nav />
      <main className="flex-1">
        <Hero />
        <Pitch />
        <HowItWorks />
        <Safety />
        <Travellers />
      </main>
      <Footer />
    </div>
  );
}
