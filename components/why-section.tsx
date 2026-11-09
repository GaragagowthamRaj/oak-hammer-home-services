import { CalendarCheck, ClipboardList, Eye, Hammer, HandHeart, Layers } from "lucide-react";
import { copy, reasons } from "@/lib/content";
import { Container } from "./ui";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const icons = {
  clipboard: ClipboardList,
  calendar: CalendarCheck,
  hammer: Hammer,
  layers: Layers,
  eye: Eye,
  heart: HandHeart,
};

export function WhySection() {
  return (
    <section className="bg-forest-deep py-20 text-paper md:py-28" aria-labelledby="why-heading">
      <Container>
        <SectionHeading
          id="why-heading"
          tone="invert"
          eyebrow={copy.why.eyebrow}
          title={copy.why.title}
          intro={copy.why.intro}
        />
        <ul className="mt-12 grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-3 md:mt-14">
          {reasons.map((reason, index) => {
            const Icon = icons[reason.icon];
            const text = copy.why.items[reason.key];
            return (
              <li key={reason.key} className="bg-forest-deep">
                <Reveal delay={(index % 3) * 0.06} className="h-full p-7 md:p-8">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm tracking-[0.16em] text-brass-soft">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon className="h-5 w-5 text-brass-soft" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h3 className="mt-8 font-serif text-2xl tracking-[-0.02em]">{text.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-paper/70">{text.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
