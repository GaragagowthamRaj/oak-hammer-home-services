"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { copy, faqs } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Container } from "./ui";
import { SectionHeading } from "./section-heading";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section id="faq" className="scroll-mt-24 bg-paper py-20 md:py-28" aria-labelledby="faq-heading">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading id="faq-heading" eyebrow={copy.faq.eyebrow} title={copy.faq.title} intro={copy.faq.intro} />
        </div>
        <div className="border-t border-line lg:col-span-8">
          {faqs.map((item) => {
            const open = openId === item.id;
            const panelId = `faq-${item.id}`;
            return (
              <div key={item.id} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-6 py-5 text-left"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenId(open ? null : item.id)}
                  >
                    <span className="font-serif text-2xl leading-snug tracking-[-0.02em]">{item.q}</span>
                    <span className="mt-1 text-forest" aria-hidden="true">
                      {open ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-5 text-sm leading-relaxed text-muted md:text-base">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
