import { copy } from "@/lib/content";
import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-paper pb-20 pt-32">
      <Container>
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-forest">{copy.brand.name}</p>
        <h1 className="mt-3 max-w-xl font-serif text-5xl tracking-[-0.03em]">{copy.notFound.title}</h1>
        <p className="mt-4 max-w-lg text-muted">{copy.notFound.text}</p>
        <div className="mt-8">
          <ButtonLink href="/">{copy.notFound.cta}</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
