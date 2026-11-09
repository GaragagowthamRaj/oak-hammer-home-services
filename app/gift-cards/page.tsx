import { copy, giftAmounts, images } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { FrameImage } from "@/components/frame-image";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink, Container, DemoNote } from "@/components/ui";
import { Reveal } from "@/components/reveal";

export const metadata = pageMetadata(copy.titles.gift, copy.gift.intro, "/gift-cards");

const steps = [copy.gift.how1, copy.gift.how2, copy.gift.how3];

export default function GiftCardsPage() {
  return (
    <>
      <FrameImage
        src={images.gift}
        alt="Sample photograph of a living room used to introduce fictional gift cards."
        priority
      />
      <section className="bg-paper pb-20 pt-12 md:pb-28 md:pt-16">
        <Container>
          <SectionHeading as="h1" size="page" eyebrow={copy.gift.eyebrow} title={copy.gift.title} intro={copy.gift.intro} />
          <DemoNote className="mt-8 max-w-3xl">{copy.gift.note}</DemoNote>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {giftAmounts.map((amount, index) => (
              <li key={amount.key}>
                <Reveal delay={index * 0.08} className="h-full">
                  <article className="flex h-full flex-col border border-line bg-card p-7">
                    <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-brass">{copy.plans.demoPrice}</p>
                    <p className="mt-4 font-serif text-5xl tracking-[-0.04em]">{amount.price}</p>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{amount.text}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="mt-16 grid gap-10 lg:grid-cols-12">
            <h2 className="font-serif text-3xl tracking-[-0.03em] lg:col-span-4">{copy.gift.howTitle}</h2>
            <ol className="lg:col-span-8">
              {steps.map((step, index) => (
                <li key={step} className="grid grid-cols-[auto_1fr] gap-4 border-t border-line py-5">
                  <span className="font-serif text-sm tracking-[0.16em] text-brass">{String(index + 1).padStart(2, "0")}</span>
                  <p className="text-base leading-relaxed text-muted">{step}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-10">
            <ButtonLink href="/contact">{copy.gift.cta}</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
