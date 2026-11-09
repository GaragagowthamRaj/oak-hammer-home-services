"use client";

import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { copy, testimonials } from "@/lib/content";
import { Container, DemoNote } from "./ui";
import { SectionHeading } from "./section-heading";

export function Testimonials() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = testimonials[index];

  useEffect(() => {
    if (reduce !== false || paused) return;
    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, 8000);
    return () => window.clearTimeout(timer);
  }, [reduce, paused, index]);

  function step(offset: number) {
    setIndex((current) => (current + offset + testimonials.length) % testimonials.length);
  }

  return (
    <section className="bg-mist py-20 md:py-28" aria-labelledby="testimonials-heading" aria-roledescription="carousel">
      <Container>
        <SectionHeading
          id="testimonials-heading"
          eyebrow={copy.testimonials.eyebrow}
          title={copy.testimonials.title}
        />
        <div
          className="mt-12 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={(event) => {
            const start = event.changedTouches[0].clientX;
            event.currentTarget.dataset.touchX = String(start);
          }}
          onTouchEnd={(event) => {
            const start = Number(event.currentTarget.dataset.touchX ?? "0");
            const delta = event.changedTouches[0].clientX - start;
            if (delta > 48) step(-1);
            if (delta < -48) step(1);
          }}
        >
          <p className="font-serif text-7xl leading-none text-forest/25" aria-hidden="true">
            “
          </p>
          <blockquote key={active.id} className="fade-in -mt-6">
            <p className="text-pretty font-serif text-3xl leading-snug tracking-[-0.03em] md:text-4xl">{active.quote}</p>
            <footer className="mt-6">
              <p className="font-medium">{active.name}</p>
              <p className="text-sm text-muted">{active.detail}</p>
            </footer>
          </blockquote>
          <div className="mt-8 flex items-center gap-2">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center border border-line bg-card hover:border-forest"
              aria-label={copy.testimonials.previous}
              onClick={() => step(-1)}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center border border-line bg-card hover:border-forest"
              aria-label={copy.testimonials.next}
              onClick={() => step(1)}
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <p className="ml-3 text-sm text-muted">
              {index + 1} / {testimonials.length}
            </p>
          </div>
          <DemoNote className="mt-8">{copy.testimonials.notice}</DemoNote>
        </div>
      </Container>
    </section>
  );
}
