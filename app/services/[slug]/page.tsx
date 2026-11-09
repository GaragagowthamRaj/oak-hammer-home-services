import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { copy, getService, relatedServices, services } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink, Container, DemoNote } from "@/components/ui";
import { CtaBand } from "@/components/cta-band";

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params> | Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return pageMetadata(copy.titles.services, copy.services.intro, "/services");
  return pageMetadata(service.title, service.summary, `/services/${service.slug}`);
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> | Params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const related = relatedServices(service.slug);

  return (
    <>
      <header className="bg-paper pt-24 md:pt-28">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-forest">
                  {copy.nav.home}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/services" className="hover:text-forest">
                  {copy.nav.services}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">
                {service.title}
              </li>
            </ol>
          </nav>
          <p className="mt-6 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-forest">{copy.services.eyebrow}</p>
          <h1 className="mt-3 max-w-3xl text-balance font-serif text-5xl leading-[1.05] tracking-[-0.03em] md:text-6xl">
            {service.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{service.summary}</p>
        </Container>
        <div className="relative mt-10 h-64 overflow-hidden bg-mist md:h-[440px]">
          <Image src={service.image} alt={service.alt} fill priority className="object-cover" sizes="100vw" />
        </div>
      </header>
      <section className="bg-paper py-16 md:py-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          <article className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-ink/90">{service.body}</p>
            <DemoNote className="mt-8">{copy.services.demoNote}</DemoNote>
          </article>
          <aside className="lg:col-span-5">
            <div className="border border-line bg-card p-6 md:p-8">
              <h2 className="font-serif text-2xl tracking-[-0.02em]">{copy.services.related}</h2>
              <ul className="mt-4 divide-y divide-line">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/services/${item.slug}`} className="block py-3 text-sm hover:text-forest">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <ButtonLink href="/contact">{copy.nav.estimate}</ButtonLink>
              </div>
            </div>
          </aside>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
