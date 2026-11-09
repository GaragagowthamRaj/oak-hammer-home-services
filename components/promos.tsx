import Image from "next/image";
import { copy, images } from "@/lib/content";
import { ButtonLink, Container } from "./ui";
import { Parallax } from "./parallax";
import { Reveal } from "./reveal";

export function GiftPromo() {
  return (
    <section id="gift" className="scroll-mt-24 bg-forest-deep text-paper" aria-labelledby="gift-heading">
      <div className="grid lg:grid-cols-2">
        <Container className="flex items-center py-16 md:py-24 lg:max-w-none lg:px-12 xl:px-20">
          <Reveal>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-brass-soft">{copy.promos.giftEyebrow}</p>
            <h2 id="gift-heading" className="mt-3 max-w-lg text-balance font-serif text-4xl leading-[1.08] tracking-[-0.03em] md:text-5xl">
              {copy.promos.giftTitle}
            </h2>
            <p className="mt-5 max-w-md text-pretty leading-relaxed text-paper/75">{copy.promos.giftText}</p>
            <div className="mt-8">
              <ButtonLink href="/gift-cards" variant="light">
                {copy.promos.giftCta}
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
        <Parallax className="h-full min-h-[320px]">
          <Image
            src={images.gift}
            alt="Sample photograph of a warm living room, used to introduce fictional gift cards."
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </Parallax>
      </div>
    </section>
  );
}

export function SeasonPromo() {
  return (
    <section id="season" className="relative min-h-[560px] scroll-mt-24 bg-ink text-ink" aria-labelledby="season-heading">
      <Parallax className="absolute inset-0">
        <Image
          src={images.season}
          alt="Sample photograph of a house prepared for a change in season."
          fill
          sizes="100vw"
          className="object-cover"
        />
      </Parallax>
      <div className="absolute inset-0 bg-ink/35" />
      <Container className="relative flex min-h-[560px] items-center py-16 md:justify-end">
        <Reveal className="w-full max-w-lg border-t-2 border-brass bg-paper p-8 shadow-lift md:p-10">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-forest">{copy.promos.seasonEyebrow}</p>
          <h2 id="season-heading" className="mt-3 text-balance font-serif text-4xl leading-[1.08] tracking-[-0.03em]">
            {copy.promos.seasonTitle}
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted">{copy.promos.seasonText}</p>
          <div className="mt-8">
            <ButtonLink href="/plans">{copy.promos.seasonCta}</ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
