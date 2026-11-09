import Image from "next/image";
import { aboutBenefits, copy, images } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { FrameImage } from "@/components/frame-image";
import { SectionHeading } from "@/components/section-heading";
import { Container } from "@/components/ui";
import { Counters } from "@/components/counters";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";

export const metadata = pageMetadata(copy.titles.about, copy.about.p1, "/about");

export default function AboutPage() {
  return (
    <>
      <FrameImage src={images.about} alt={copy.about.imageAlt} priority />
      <section className="bg-paper pb-16 pt-12 md:pb-24 md:pt-16">
        <Container>
          <SectionHeading as="h1" size="page" eyebrow={copy.about.eyebrow} title={copy.about.title} />
          <div className="mt-10 grid items-start gap-10 lg:grid-cols-12">
            <div className="space-y-4 text-base leading-relaxed text-muted lg:col-span-7">
              <p>{copy.about.p1}</p>
              <p>{copy.about.p2}</p>
              <p>{copy.about.p3}</p>
            </div>
            <Reveal className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden bg-mist">
                <Image
                  src={images.aboutTools}
                  alt={copy.about.secondaryAlt}
                  fill
                  sizes="(min-width: 1024px) 36vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-mist py-16 md:py-24" aria-labelledby="story-heading">
        <Container>
          <h2 id="story-heading" className="max-w-3xl font-serif text-3xl leading-tight tracking-[-0.03em] md:text-5xl">
            {copy.about.storyTitle}
          </h2>
          <blockquote className="mt-6 max-w-3xl text-pretty font-serif text-2xl leading-snug tracking-[-0.02em] text-ink/90 md:text-3xl">
            {copy.about.story}
          </blockquote>
        </Container>
      </section>

      <section className="bg-paper py-16 md:py-24" aria-label="Ways of working">
        <Container>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {aboutBenefits.map((benefit) => (
              <li key={benefit.title} className="border-t border-line pt-4">
                <h2 className="font-serif text-2xl tracking-[-0.02em]">{benefit.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{benefit.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <Counters />
      <CtaBand />
    </>
  );
}
