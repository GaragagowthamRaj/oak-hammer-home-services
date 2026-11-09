"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center bg-paper pb-20 pt-32">
      <Container>
        <h1 className="font-serif text-5xl tracking-[-0.03em]">This page needs another pass.</h1>
        <p className="mt-4 max-w-lg text-muted">The demonstration hit an unexpected error. You can try the view again.</p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 min-h-11 bg-forest px-5 text-sm font-medium text-paper hover:bg-forest-deep"
        >
          Try again
        </button>
      </Container>
    </section>
  );
}
