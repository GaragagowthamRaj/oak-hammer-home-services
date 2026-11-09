"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { copy, heroSlides, trustItems } from "@/lib/content";
import { cn } from "@/lib/cn";
import { ButtonLink, Container } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
};

export function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce !== false || paused) return;
    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % heroSlides.length);
    }, 8000);
    return () => window.clearTimeout(timer);
  }, [reduce, paused, index]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-ink text-paper" aria-labelledby="hero-title">
      <div className="absolute inset-0">
        {heroSlides.map((slide, slideIndex) => {
          const active = slideIndex === index;
          return (
            <div
              key={slide.src}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 motion-reduce:transition-none",
                active ? "opacity-100" : "opacity-0",
              )}
              aria-hidden={!active}
            >
              <div className={cn("absolute inset-0", active && "kenburns")}>
                <Image
                  src={slide.src}
                  alt={active ? slide.alt : ""}
                  fill
                  priority={slideIndex === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="absolute inset-0 bg-ink/55 md:hidden" />
      <div className="absolute inset-y-0 left-0 hidden w-[64%] bg-gradient-to-r from-ink via-ink/88 to-transparent md:block" />

      <Container className="relative z-10 flex min-h-[100svh] flex-col justify-end pb-10 pt-28 md:justify-center md:pb-20 md:pt-32">
        <motion.div variants={list} initial="hidden" animate="show" className="max-w-3xl">
          <motion.p variants={item} data-motion="" className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-brass-soft">
            {copy.hero.eyebrow}
          </motion.p>
          <motion.h1
            id="hero-title"
            variants={item}
            data-motion=""
            className="mt-4 max-w-xl text-balance font-serif text-[3.1rem] leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-[4.6rem]"
          >
            Your Home Deserves the <em className="italic text-brass-soft">Right Hands.</em>
          </motion.h1>
          <motion.p variants={item} data-motion="" className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-paper/80 md:text-lg">
            {copy.hero.support}
          </motion.p>
          <motion.div variants={item} data-motion="" className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact" variant="light">
              {copy.hero.ctaEstimate}
            </ButtonLink>
            <ButtonLink href="/#services" variant="inverted">
              {copy.hero.ctaServices}
            </ButtonLink>
          </motion.div>
          <motion.ul variants={item} data-motion="" className="mt-10 grid gap-4 border-t border-paper/20 pt-6 sm:grid-cols-3">
            {trustItems.map((label) => (
              <li key={label} className="flex items-start gap-3 text-sm text-paper/85">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brass-soft" aria-hidden="true" />
                {label}
              </li>
            ))}
          </motion.ul>
          <motion.p variants={item} data-motion="" className="mt-6 max-w-md text-xs leading-relaxed text-paper/60">
            {copy.hero.demo}
          </motion.p>
        </motion.div>

        <div className="mt-8 flex items-center gap-3">
          <button
            type="button"
            aria-pressed={paused}
            aria-label={paused ? copy.hero.play : copy.hero.pause}
            onClick={() => setPaused((value) => !value)}
            className="flex h-11 w-11 items-center justify-center border border-paper/30 text-paper transition-colors hover:bg-paper hover:text-ink"
          >
            {paused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
          </button>
          <div className="flex gap-2" role="group" aria-label={copy.hero.photoCaption}>
            {heroSlides.map((slide, slideIndex) => (
              <button
                key={slide.src}
                type="button"
                aria-label={`${copy.hero.slide} ${slideIndex + 1}`}
                aria-current={slideIndex === index}
                onClick={() => setIndex(slideIndex)}
                className={cn(
                  "h-2.5 w-7 transition-colors",
                  slideIndex === index ? "bg-brass-soft" : "bg-paper/35 hover:bg-paper/70",
                )}
              />
            ))}
          </div>
        </div>
        <p className="mt-4 max-w-xs text-xs text-paper/55">
          {copy.hero.photoCaption}
        </p>
      </Container>
    </section>
  );
}
