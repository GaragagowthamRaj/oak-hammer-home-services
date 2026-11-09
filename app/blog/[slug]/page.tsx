import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { copy, getPost, posts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui";

type Params = { slug: string };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params> | Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return pageMetadata(copy.titles.blog, copy.blog.intro, "/blog");
  return pageMetadata(post.title, post.excerpt, `/blog/${post.slug}`);
}

export default async function BlogPostPage({ params }: { params: Promise<Params> | Params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const others = posts.filter((item) => item.slug !== post.slug);

  return (
    <article className="bg-paper pb-20 pt-24 md:pt-28">
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
              <Link href="/blog" className="hover:text-forest">
                {copy.nav.blog}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {post.title}
            </li>
          </ol>
        </nav>
        <p className="mt-8 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-forest">
          <time dateTime={post.dateTime}>{post.date}</time>
          <span aria-hidden="true"> · </span>
          {post.category}
        </p>
        <h1 className="mt-3 max-w-3xl text-balance font-serif text-4xl leading-[1.08] tracking-[-0.03em] md:text-6xl">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-muted">{copy.blog.byline}</p>
      </Container>
      <div className="relative mt-10 h-64 overflow-hidden bg-mist md:h-[480px]">
        <Image src={post.image} alt={post.alt} fill priority className="object-cover" sizes="100vw" />
      </div>
      <Container>
        <div className="mx-auto mt-10 max-w-2xl">
          <p className="border-l-2 border-brass pl-4 text-sm leading-relaxed text-muted">{copy.blog.disclaimer}</p>
          {post.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="mt-6 text-base leading-relaxed text-ink/90 md:text-lg">
              {paragraph}
            </p>
          ))}
          <Link href="/blog" className="mt-10 inline-flex text-sm font-medium text-forest hover:text-forest-deep">
            {copy.blog.back}
          </Link>
        </div>
        <aside className="mt-16 border-t border-line pt-10" aria-label="More sample articles">
          <ul className="grid gap-6 md:grid-cols-2">
            {others.map((item) => (
              <li key={item.slug}>
                <Link href={`/blog/${item.slug}`} className="group block">
                  <p className="text-[0.72rem] uppercase tracking-[0.16em] text-forest">
                    <time dateTime={item.dateTime}>{item.date}</time>
                  </p>
                  <h2 className="mt-2 font-serif text-2xl tracking-[-0.02em] group-hover:text-forest">{item.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </Container>
    </article>
  );
}
