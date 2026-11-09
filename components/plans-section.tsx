import { Check } from "lucide-react";
import { copy, plans } from "@/lib/content";
import { cn } from "@/lib/cn";
import { ButtonLink, Container, DemoNote } from "./ui";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function PlansSection({
  tone = "home",
  headingAs = "h2",
}: {
  tone?: "home" | "page" | "follow";
  headingAs?: "h1" | "h2";
}) {
  const padding =
    tone === "page"
      ? "bg-paper pb-20 pt-28 md:pb-28 md:pt-36"
      : tone === "follow"
        ? "bg-paper pb-20 pt-14 md:pb-28 md:pt-16"
        : "bg-paper py-20 md:py-28";

  return (
    <section id="plans" className={cn("scroll-mt-24", padding)} aria-labelledby="plans-heading">
      <Container>
        <SectionHeading
          id="plans-heading"
          as={headingAs}
          size={headingAs === "h1" ? "page" : "section"}
          eyebrow={copy.plans.eyebrow}
          title={copy.plans.title}
          intro={copy.plans.intro}
        />
        <DemoNote className="mt-8 max-w-3xl">{copy.plans.note}</DemoNote>
        <ul className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <li key={plan.key}>
              <Reveal delay={index * 0.08} className="h-full">
                <article
                  className={cn(
                    "flex h-full flex-col border p-7 md:p-8",
                    plan.highlighted
                      ? "border-forest bg-forest text-paper"
                      : "border-line bg-card text-ink",
                  )}
                >
                  <div className="min-h-7">
                    {plan.highlighted ? (
                      <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-brass-soft">
                        {copy.plans.suggested}
                      </p>
                    ) : (
                      <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted">
                        {copy.plans.demoPrice}
                      </p>
                    )}
                  </div>
                  <h3 className="mt-4 font-serif text-3xl tracking-[-0.03em]">{plan.name}</h3>
                  <p className="mt-4 flex items-end gap-2">
                    <span className="font-serif text-5xl tracking-[-0.04em]">{plan.price}</span>
                    <span className={cn("mb-1 text-sm", plan.highlighted ? "text-paper/70" : "text-muted")}>
                      {copy.plans.monthly}
                    </span>
                  </p>
                  <p className={cn("mt-4 text-sm leading-relaxed", plan.highlighted ? "text-paper/75" : "text-muted")}>
                    {plan.blurb}
                  </p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm leading-relaxed">
                        <Check
                          className={cn("mt-0.5 h-4 w-4 shrink-0", plan.highlighted ? "text-brass-soft" : "text-forest")}
                          aria-hidden="true"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <ButtonLink
                      href={`/contact?plan=${plan.key}`}
                      variant={plan.highlighted ? "light" : "ghost"}
                      className="w-full"
                    >
                      {copy.plans.choose}
                    </ButtonLink>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
