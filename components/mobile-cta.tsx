"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { copy } from "@/lib/content";

export function MobileCta() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <>
      <div className="h-[4.5rem] md:hidden" aria-hidden="true" />
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 p-3 backdrop-blur-md md:hidden">
        <Link href="/contact" className="flex min-h-12 items-center justify-center bg-forest text-sm font-medium text-paper">
          {copy.ui.mobileCta}
        </Link>
      </div>
    </>
  );
}
