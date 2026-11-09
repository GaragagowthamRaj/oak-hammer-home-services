import { copy } from "@/lib/content";
import { ButtonLink, Container } from "./ui";

export function CtaBand() {
  return (
    <section className="bg-forest text-paper" aria-labelledby="cta-band-title">
      <Container className="flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center md:py-16">
        <div className="max-w-xl">
          <h2 id="cta-band-title" className="text-balance font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
            {copy.ctaBand.title}
          </h2>
          <p className="mt-3 text-paper/75">{copy.ctaBand.text}</p>
        </div>
        <ButtonLink href="/contact" variant="light">
          {copy.nav.estimate}
        </ButtonLink>
      </Container>
    </section>
  );
}
