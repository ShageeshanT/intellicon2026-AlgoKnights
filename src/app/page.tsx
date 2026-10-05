import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pitch } from "@/components/sections/Pitch";
import { Safety } from "@/components/sections/Safety";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-paper">
      <Nav />
      <main className="flex-1">
        <Hero />
        <Pitch />
        <HowItWorks />
        <Safety />
      </main>
    </div>
  );
}
