"use client";

import { ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { copy } from "@/lib/content";
import { cn } from "@/lib/cn";

export function BackToTop() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const onContact = pathname === "/contact";

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label={copy.ui.backTop}
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
      className={cn(
        "fixed right-4 z-30 flex h-11 w-11 items-center justify-center border border-line bg-card text-ink shadow-soft transition-opacity duration-300",
        onContact ? "bottom-4" : "bottom-24 md:bottom-6",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <ArrowUp className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
