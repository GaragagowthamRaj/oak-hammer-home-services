"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { copy, projectFilters, projects, type ProjectFilter } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Container, DemoNote } from "./ui";
import { SectionHeading } from "./section-heading";

const ease = [0.22, 1, 0.36, 1] as const;

export function ProjectGallery({
  tone = "home",
  headingAs = "h2",
}: {
  tone?: "home" | "page" | "follow";
  headingAs?: "h1" | "h2";
}) {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [activeId, setActiveId] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((project) => project.filter === filter)),
    [filter],
  );
  const activeIndex = filtered.findIndex((project) => project.id === activeId);
  const active = activeIndex >= 0 ? filtered[activeIndex] : null;
  const Title = headingAs === "h1" ? "h2" : "h3";

  const padding =
    tone === "page"
      ? "bg-paper pb-20 pt-28 md:pb-28 md:pt-36"
      : tone === "follow"
        ? "bg-paper pb-20 pt-14 md:pb-28 md:pt-16"
        : "bg-paper py-20 md:py-28";

  function chooseFilter(next: ProjectFilter) {
    setFilter(next);
    setActiveId(null);
  }

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveId(null);
        return;
      }
      if (filtered.length < 2) return;
      if (event.key === "ArrowRight") {
        setActiveId(filtered[(activeIndex + 1) % filtered.length].id);
      }
      if (event.key === "ArrowLeft") {
        setActiveId(filtered[(activeIndex - 1 + filtered.length) % filtered.length].id);
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (dialogRef.current && !dialogRef.current.contains(document.activeElement)) {
      closeRef.current?.focus();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, activeIndex, filtered]);

  function showOffset(offset: number) {
    if (filtered.length < 2 || activeIndex < 0) return;
    const next = filtered[(activeIndex + offset + filtered.length) % filtered.length];
    setActiveId(next.id);
  }

  return (
    <section id="projects" className={cn("scroll-mt-24", padding)} aria-labelledby="projects-heading">
      <Container>
        <SectionHeading
          id="projects-heading"
          as={headingAs}
          size={headingAs === "h1" ? "page" : "section"}
          eyebrow={copy.projects.eyebrow}
          title={copy.projects.title}
          intro={copy.projects.intro}
        />
        <DemoNote className="mt-8 max-w-3xl">{copy.projects.notice}</DemoNote>

        <div role="tablist" aria-label={copy.projects.title} className="mt-8 flex flex-wrap gap-x-1 gap-y-2">
          {projectFilters.map((item) => {
            const selected = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="project-grid"
                onClick={() => chooseFilter(item.id)}
                className={cn(
                  "relative px-3 py-2 text-sm transition-colors",
                  selected ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                {item.label}
                {selected ? <motion.span layoutId="project-filter" className="absolute inset-x-3 bottom-1 h-px bg-forest" /> : null}
              </button>
            );
          })}
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {filtered.length} fictional projects
        </p>

        <motion.ul id="project-grid" layout className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.li
                layout
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease }}
              >
                <article className="group relative aspect-[4/5] bg-mist">
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-ink/75" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 text-paper">
                    <Title className="font-serif text-2xl tracking-[-0.02em]">{project.title}</Title>
                    <p className="mt-1 text-sm leading-relaxed text-paper/80">{project.summary}</p>
                  </div>
                  <button
                    type="button"
                    className="absolute inset-0"
                    aria-label={`${copy.projects.view}: ${project.title}`}
                    onClick={() => setActiveId(project.id)}
                  />
                </article>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </Container>

      {active ? (
        <div
          ref={dialogRef}
          className="fade-in fixed inset-0 z-[70] flex items-center justify-center bg-ink/92 p-4 text-paper md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActiveId(null)}
        >
          <div className="relative flex w-full max-w-5xl flex-col" onClick={(event) => event.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.18em] text-brass-soft">
                {copy.projects.caption} · {activeIndex + 1} / {filtered.length}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setActiveId(null)}
                className="flex h-11 w-11 items-center justify-center border border-paper/30"
                aria-label={copy.projects.close}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div className="relative h-[62vh] bg-ink">
              <Image src={active.image} alt={active.alt} fill sizes="100vw" className="object-contain" priority />
            </div>
            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="font-serif text-3xl">{active.title}</p>
                <p className="mt-1 max-w-xl text-sm text-paper/75">{active.summary}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center border border-paper/30 disabled:opacity-40"
                  aria-label={copy.projects.previous}
                  disabled={filtered.length < 2}
                  onClick={() => showOffset(-1)}
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center border border-paper/30 disabled:opacity-40"
                  aria-label={copy.projects.next}
                  disabled={filtered.length < 2}
                  onClick={() => showOffset(1)}
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
