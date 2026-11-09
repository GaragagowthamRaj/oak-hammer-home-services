"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { counters } from "@/lib/content";
import { Container } from "./ui";

function Count({ value, start }: { value: number; start: boolean }) {
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (reduce !== false) {
      if (reduce === true) setCurrent(value);
      return;
    }
    let frame = 0;
    const started = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / 1100);
      const eased = 1 - (1 - progress) ** 3;
      setCurrent(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, reduce, value]);

  return <span className="tabular-nums">{current}</span>;
}

export function Counters() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section ref={ref} className="bg-forest text-paper" aria-label="Demonstration figures">
      <Container className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4 md:py-14">
        {counters.map((item) => (
          <div key={item.label}>
            <p className="font-serif text-5xl tracking-[-0.04em] md:text-6xl">
              <Count value={item.value} start={inView} />
            </p>
            <p className="mt-2 max-w-[14rem] text-sm leading-snug text-paper/75">{item.label}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
