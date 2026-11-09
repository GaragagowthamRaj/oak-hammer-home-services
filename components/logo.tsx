import { copy } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const leaf = tone === "light" ? "#f3efe7" : "#234237";
  const vein = tone === "light" ? "#1c3329" : "#f3efe7";

  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 44 44" className="h-10 w-10 shrink-0" aria-hidden="true">
        <rect x="1.25" y="1.25" width="41.5" height="41.5" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.25" />
        <path
          fill={leaf}
          d="M22 8.2c1.5 3 3.2 3.9 5.6 4-1.4 1.9-1.5 3.5.1 5.2-2.1.7-3.4 1.8-3.8 3.9 1.9.6 3.3 2 3.5 4.2-2.5-.2-4.1.9-5.4 3.4-1.3-2.5-2.9-3.6-5.4-3.4.2-2.2 1.6-3.6 3.5-4.2-.4-2.1-1.7-3.2-3.8-3.9 1.6-1.7 1.5-3.3.1-5.2 2.4-.1 4.1-1 5.6-4z"
        />
        <path d="M22 13.2v10.4" stroke={vein} strokeWidth="0.9" />
        <path d="M13.5 34.2h17" stroke="#b08948" strokeWidth="1.35" />
        <path d="M22 31.2v3" stroke="#b08948" strokeWidth="1.35" />
      </svg>
      <span className="leading-none">
        <span className="block whitespace-nowrap font-serif text-[1.05rem] font-medium tracking-[-0.02em] text-current">
          {copy.brand.name}
        </span>
        <span
          className={cn(
            "mt-1 block text-[0.58rem] font-medium uppercase tracking-[0.22em]",
            tone === "light" ? "text-brass-soft" : "text-muted",
          )}
        >
          {copy.brand.descriptor}
        </span>
      </span>
    </span>
  );
}
