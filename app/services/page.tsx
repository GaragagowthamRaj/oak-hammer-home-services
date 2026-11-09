import { copy, images, processSteps } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { FrameImage } from "@/components/frame-image";
import { ServicesSection } from "@/components/services-section";
import { CtaBand } from "@/components/cta-band";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/reveal";

export const metadata = pageMetadata(copy.titles.services, copy.services.intro, "/services");

export default function ServicesPage() {
  return (
    <>
      <FrameImage
        src={images.servicesBand}
        alt="Sample photograph of tools prepared for a fictional service visit."
        priority
      />
      <ServicesSection tone="follow" headingAs="h1" />
      <section className="bg-paper py-16 md:py-24" aria-labelledby="process-heading">
        <Container>
          <h2 id="process-heading" className="max-w-xl font-serif text-4xl tracking-[-0.03em] md:text-5xl">
            How a sample visit unfolds.
          </h2>
          <ol className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <li key={step.title} className="bg-paper">
                <Reveal delay={index * 0.06} className="h-full p-6">
                  <p className="font-serif text-sm tracking-[0.16em] text-brass">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-6 font-serif text-2xl tracking-[-0.02em]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
