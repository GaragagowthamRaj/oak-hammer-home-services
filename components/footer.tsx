import Link from "next/link";
import { copy, navItems, services } from "@/lib/content";
import { Container } from "./ui";
import { Logo } from "./logo";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.2" />
      <circle cx="17.2" cy="6.8" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor">
      <path d="M14.2 20v-6.1h2.05l.3-2.38H14.2V10c0-.69.19-1.16 1.18-1.16h1.26V6.72c-.22-.03-.97-.09-1.84-.09-1.82 0-3.07 1.11-3.07 3.15v1.76H9.4v2.38h2.33V20h2.47Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor">
      <path d="M7.1 9.4H4.7V19h2.4V9.4ZM5.9 4.8A1.4 1.4 0 1 0 5.9 7.6 1.4 1.4 0 0 0 5.9 4.8ZM19.3 19h-2.4v-5.1c0-1.28-.46-2.15-1.6-2.15-.87 0-1.39.59-1.62 1.16-.08.2-.1.48-.1.76V19H11.2s.03-8.1 0-8.94h2.4v1.27c.32-.49 1.1-1.2 2.68-1.2 1.96 0 3.43 1.28 3.43 4.03V19Z" />
    </svg>
  );
}

const socials = [
  { name: "Instagram", icon: InstagramIcon },
  { name: "Facebook", icon: FacebookIcon },
  { name: "LinkedIn", icon: LinkedInIcon },
];

export function Footer() {
  return (
    <footer id="site-footer" className="bg-ink text-paper">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/70">{copy.footer.blurb}</p>
          <ul className="mt-6 flex gap-3">
            {socials.map((item) => (
              <li key={item.name}>
                <a
                  href="https://example.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${copy.footer.demoSocial}: ${item.name}`}
                  className="flex h-10 w-10 items-center justify-center border border-white/15 text-paper transition-colors hover:border-brass-soft hover:text-brass-soft"
                >
                  <item.icon />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-brass-soft">{copy.footer.quick}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-paper/75 transition-colors hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-brass-soft">{copy.footer.services}</h2>
          <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="text-paper/75 transition-colors hover:text-paper">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-brass-soft">{copy.footer.contact}</h2>
          <address className="mt-4 space-y-3 text-sm not-italic text-paper/75">
            <p>{copy.info.location}</p>
            <p>
              <a className="hover:text-paper" href="tel:+15550147280">
                {copy.info.phone}
              </a>
            </p>
            <p>
              <a className="hover:text-paper" href="mailto:hello@oakandhammer.example">
                {copy.info.email}
              </a>
            </p>
            <p>
              <span className="block text-[0.72rem] uppercase tracking-[0.16em] text-brass-soft">{copy.footer.hoursLabel}</span>
              <span className="mt-1 block">{copy.info.hours}</span>
            </p>
          </address>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 text-xs text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {copy.brand.name}. {copy.footer.rights}
          </p>
          <p className="text-brass-soft">{copy.footer.notice}</p>
        </Container>
      </div>
    </footer>
  );
}
