import Image from "next/image";
import logo from "@/images/logo.png";

export function Footer() {
  return (
    <footer className="border-t border-black/5">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-xs text-muted sm:px-6">
        <span className="flex items-center gap-3">
          <Image src={logo} alt="WAYLO" className="h-7 w-auto" />
          &copy; 2026 WAYLO. Built by team AlgoKnights for IntelliCon 2026.
        </span>
        <span>Deals made outside WAYLO are not protected.</span>
      </div>
    </footer>
  );
}
