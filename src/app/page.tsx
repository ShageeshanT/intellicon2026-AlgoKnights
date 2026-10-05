import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-paper">
      <Nav />
      <main className="flex-1">
        <Hero />
      </main>
    </div>
  );
}
