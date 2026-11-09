import { cn } from "@/lib/cn";
import { Eyebrow } from "./ui";
import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  as = "h2",
  size = "section",
  tone = "default",
  className,
  id,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  as?: "h1" | "h2";
  size?: "section" | "page";
  tone?: "default" | "invert";
  className?: string;
  id?: string;
}) {
  const Title = as;
  return (
    <Reveal className={cn("max-w-2xl", className)}>
      {eyebrow ? <Eyebrow tone={tone === "invert" ? "brass" : "forest"}>{eyebrow}</Eyebrow> : null}
      <Title
        id={id}
        className={cn(
          "text-balance font-serif tracking-[-0.03em] text-ink",
          eyebrow && "mt-3",
          size === "page"
            ? "text-[2.7rem] leading-[1.05] md:text-6xl"
            : "text-[2.35rem] leading-[1.08] md:text-[3.15rem]",
          tone === "invert" && "text-paper",
        )}
      >
        {title}
      </Title>
      {intro ? (
        <p
          className={cn(
            "mt-4 max-w-xl text-pretty text-base leading-relaxed md:text-lg",
            tone === "invert" ? "text-paper/75" : "text-muted",
          )}
        >
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}
