import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { copy, posts } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Container } from "./ui";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function BlogSection({
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
  const featured = posts[0];
  const rest = posts.slice(1);
  const CardTitle = headingAs === "h1" ? "h2" : "h3";
  if (!featured) return null;

  return (
    <section id="journal" className={cn("scroll-mt-24", padding)} aria-labelledby="journal-heading">
      <Container>
        <SectionHeading
          id="journal-heading"
          as={headingAs}
          size={headingAs === "h1" ? "page" : "section"}
          eyebrow={copy.blog.eyebrow}
          title={copy.blog.title}
          intro={copy.blog.intro}
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <article className="group relative flex h-full flex-col bg-card has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-brass">
              <div className="relative aspect-[16/10] overflow-hidden bg-mist">
                <Image
                  src={featured.image}
                  alt={featured.alt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover transition duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <p className="text-[0.72rem] uppercase tracking-[0.18em] text-forest">
                  <time dateTime={featured.dateTime}>{featured.date}</time>
                  <span aria-hidden="true"> · </span>
                  {featured.category}
                </p>
                <CardTitle className="mt-3 font-serif text-3xl leading-tight tracking-[-0.03em]">
                  <Link href={`/blog/${featured.slug}`} className="after:absolute after:inset-0 after:content-['']">
                    {featured.title}
                  </Link>
                </CardTitle>
                <p className="mt-3 text-sm leading-relaxed text-muted">{featured.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-forest">
                  {copy.blog.readMore}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </article>
          </Reveal>
          <div className="grid gap-5 lg:col-span-5">
            {rest.map((post, index) => (
              <Reveal key={post.slug} delay={0.08 + index * 0.06}>
                <article className="group relative grid h-full gap-4 bg-card p-4 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-brass sm:grid-cols-5">
                  <div className="relative aspect-[4/3] overflow-hidden bg-mist sm:col-span-2 sm:aspect-auto">
                    <Image
                      src={post.image}
                      alt={post.alt}
                      fill
                      sizes="(min-width: 1024px) 16vw, 40vw"
                      className="object-cover transition duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                    />
                  </div>
                  <div className="sm:col-span-3 sm:py-2">
                    <p className="text-[0.72rem] uppercase tracking-[0.18em] text-forest">
                      <time dateTime={post.dateTime}>{post.date}</time>
                    </p>
                    <h3 className="mt-2 font-serif text-2xl leading-tight tracking-[-0.02em]">
                      <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:content-['']">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-forest">
                      {copy.blog.readMore}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
