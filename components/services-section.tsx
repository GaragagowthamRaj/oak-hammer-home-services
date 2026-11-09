import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { copy, services } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Container, DemoNote } from "./ui";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function ServicesSection({
  tone = "home",
  headingAs = "h2",
}: {
  tone?: "home" | "page" | "follow";
  headingAs?: "h1" | "h2";
}) {
  const padding =
    tone === "page"
      ? "bg-mist pb-20 pt-28 md:pb-28 md:pt-36"
      : tone === "follow"
        ? "bg-mist pb-20 pt-14 md:pb-28 md:pt-16"
        : "bg-mist py-20 md:py-28";
  const CardTitle = headingAs === "h1" ? "h2" : "h3";

  return (
    <section id="services" className={cn("scroll-mt-24", padding)} aria-labelledby="services-heading">
      <Container>
        <SectionHeading
          id="services-heading"
          as={headingAs}
          size={headingAs === "h1" ? "page" : "section"}
          eyebrow={copy.services.eyebrow}
          title={copy.services.title}
          intro={copy.services.intro}
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:mt-14">
          {services.map((service, index) => (
            <li key={service.slug} className="h-full">
              <Reveal delay={(index % 3) * 0.07} className="h-full">
                <article className="group relative flex h-full flex-col border border-line bg-card transition duration-300 hover:-translate-y-1 hover:shadow-lift has-[:focus-visible]:border-forest motion-reduce:transform-none">
                  <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <CardTitle className="font-serif text-[1.65rem] leading-tight tracking-[-0.02em]">
                      <Link
                        href={`/services/${service.slug}`}
                        className="after:absolute after:inset-0 after:content-['']"
                      >
                        {service.title}
                      </Link>
                    </CardTitle>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{service.summary}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-forest">
                      {copy.services.learnMore}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
        <DemoNote className={cn("mt-10 max-w-3xl")}>{copy.services.demoNote}</DemoNote>
      </Container>
    </section>
  );
}
