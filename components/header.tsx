"use client";

import type { KeyboardEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { copy, navItems } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Logo } from "./logo";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [shown, setShown] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1280px)");
    const onChange = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (open) {
      setRendered(true);
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
    setShown(false);
    const timer = window.setTimeout(() => setRendered(false), 480);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open || !rendered) return;
    const frame = requestAnimationFrame(() => setShown(true));
    const focusTimer = window.setTimeout(() => {
      drawerRef.current?.querySelector<HTMLElement>("a")?.focus();
    }, 80);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(focusTimer);
    };
  }, [open, rendered]);

  useEffect(() => {
    const content = document.getElementById("content");
    const footer = document.getElementById("site-footer");
    if (open) {
      content?.setAttribute("inert", "");
      footer?.setAttribute("inert", "");
    } else {
      content?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    }
    return () => {
      content?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    };
  }, [open]);

  const onHero = pathname === "/" && !scrolled && !open;

  function closeMenu(restoreFocus = true) {
    setOpen(false);
    if (restoreFocus) menuButtonRef.current?.focus();
  }

  function onDrawerKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }
    if (event.key !== "Tab" || !drawerRef.current) return;
    const items = Array.from(drawerRef.current.querySelectorAll<HTMLElement>("a, button"));
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          onHero ? "bg-transparent text-paper" : "border-b border-line bg-paper/95 text-ink shadow-soft backdrop-blur-md",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1380px] items-center justify-between gap-4 px-5 sm:px-8 xl:h-20">
          <Link href="/" className="relative z-10 shrink-0 rounded-sm">
            <Logo tone={onHero ? "light" : "dark"} />
          </Link>

          <nav aria-label={copy.nav.main} className="hidden items-center gap-5 xl:flex">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="group relative py-2 text-[0.92rem] tracking-wide"
                >
                  {item.label}
                  {active ? (
                    <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-0.5 h-px bg-current" />
                  ) : (
                    <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className={cn(
                "hidden min-h-11 items-center rounded-sm px-4 text-sm font-medium tracking-wide transition-colors duration-300 md:inline-flex",
                onHero ? "bg-paper text-ink hover:bg-card" : "bg-forest text-paper hover:bg-forest-deep",
              )}
            >
              {copy.nav.estimate}
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? copy.nav.closeMenu : copy.nav.openMenu}
              onClick={() => (open ? closeMenu(false) : setOpen(true))}
            >
              {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {rendered ? (
        <div className="xl:hidden">
          <button
            type="button"
            aria-label={copy.nav.closeMenu}
            tabIndex={-1}
            className={cn(
              "fixed inset-0 top-16 z-40 bg-ink/45 transition-opacity duration-300",
              shown ? "opacity-100" : "opacity-0",
            )}
            onClick={() => closeMenu()}
          />
          <div
            id="mobile-menu"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label={copy.nav.main}
            aria-hidden={!shown}
            inert={!shown}
            onKeyDown={onDrawerKeyDown}
            className={cn(
              "fixed bottom-0 right-0 top-16 z-40 flex w-full max-w-md flex-col overflow-y-auto bg-paper text-ink shadow-lift transition-transform duration-500 ease-out motion-reduce:transition-none",
              shown ? "translate-x-0" : "translate-x-full",
            )}
          >
            <nav aria-label={copy.nav.main} className="flex flex-1 flex-col px-6 py-8">
              {navItems.map((item, index) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => closeMenu(false)}
                    className={cn(
                      "border-b border-line py-4 font-serif text-4xl tracking-[-0.03em]",
                      active && "text-forest",
                    )}
                    style={{ transitionDelay: `${index * 30}ms` }}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                onClick={() => closeMenu(false)}
                className="mt-8 inline-flex min-h-12 items-center justify-center bg-forest px-5 text-sm font-medium text-paper"
              >
                {copy.nav.estimate}
              </Link>
              <dl className="mt-10 space-y-3 text-sm text-muted">
                <div>
                  <dt className="sr-only">Phone</dt>
                  <dd>
                    <a className="hover:text-forest" href="tel:+15550147280">
                      {copy.info.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Email</dt>
                  <dd>
                    <a className="hover:text-forest" href="mailto:hello@oakandhammer.example">
                      {copy.info.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Hours</dt>
                  <dd>{copy.info.hours}</dd>
                </div>
              </dl>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
