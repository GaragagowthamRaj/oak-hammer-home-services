import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("mx-auto w-full max-w-site px-5 sm:px-8", className)}>{children}</div>;
}

export function Eyebrow({
  children,
  tone = "forest",
}: {
  children: ReactNode;
  tone?: "forest" | "brass" | "light";
}) {
  const color =
    tone === "brass" ? "text-brass-soft" : tone === "light" ? "text-paper/75" : "text-forest";
  return <p className={cn("text-[0.72rem] font-medium uppercase tracking-[0.22em]", color)}>{children}</p>;
}

const buttonStyles = {
  primary: "bg-forest text-paper hover:bg-forest-deep",
  light: "bg-paper text-ink hover:bg-card",
  ghost: "border border-ink/20 bg-transparent text-ink hover:border-forest hover:text-forest",
  inverted: "border border-paper/40 bg-transparent text-paper hover:bg-paper hover:text-ink",
};

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className,
}: {
  href: string;
  variant?: keyof typeof buttonStyles;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-medium tracking-wide transition-colors duration-300",
        buttonStyles[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function DemoNote({
  children,
  light = false,
  className,
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <p className={cn("border-l-2 border-brass pl-4 text-sm leading-relaxed", light ? "text-paper/75" : "text-muted", className)}>
      {children}
    </p>
  );
}
