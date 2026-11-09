import Image from "next/image";
import { aboutBenefits, copy, images } from "@/lib/content";
import { ButtonLink, Container } from "./ui";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 bg-paper py-20 md:py-28" aria-labelledby="about-heading">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <div className="grid grid-cols-6 gap-3">
              <div className="relative col-span-6 aspect-[5/4] overflow-hidden bg-mist">
                <Image
                  src={images.about}
                  alt={copy.about.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="relative col-span-3 aspect-square overflow-hidden bg-mist">
                <Image
                  src={images.aboutTools}
                  alt={copy.about.secondaryAlt}
                  fill
                  sizes="(min-width: 1024px) 18vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="col-span-3 flex items-end">
                <p className="text-sm leading-relaxed text-muted">{copy.about.storyTitle}</p>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-6">
            <SectionHeading id="about-heading" eyebrow={copy.about.eyebrow} title={copy.about.title} />
            <Reveal delay={0.08}>
              <div className="mt-6 space-y-4 text-pretty text-base leading-relaxed text-muted">
                <p>{copy.about.p1}</p>
                <p>{copy.about.p2}</p>
              </div>
              <div className="mt-8">
                <ButtonLink href="/about" variant="ghost">
                  {copy.about.cta}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>

        <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {aboutBenefits.map((benefit, index) => (
            <li key={benefit.title}>
              <Reveal delay={(index % 4) * 0.06} className="h-full border-t border-line pt-4">
                <h3 className="font-serif text-2xl tracking-[-0.02em]">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{benefit.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
