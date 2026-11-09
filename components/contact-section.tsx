import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { copy } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Container } from "./ui";
import { SectionHeading } from "./section-heading";
import { ContactForm } from "./contact-form";

const details = [
  { icon: Phone, label: copy.info.phone, href: "tel:+15550147280" },
  { icon: Mail, label: copy.info.email, href: "mailto:hello@oakandhammer.example" },
  { icon: MapPin, label: copy.info.location },
  { icon: Clock, label: copy.info.hours },
];

export function ContactSection({
  tone = "home",
  headingAs = "h2",
}: {
  tone?: "home" | "page" | "follow";
  headingAs?: "h1" | "h2";
}) {
  const padding =
    tone === "page"
      ? "bg-paper pb-20 pt-28 md:pb-28 md:pt-36"
      : tone === "follow"
        ? "bg-paper pb-20 pt-14 md:pb-28 md:pt-16"
        : "bg-paper py-20 md:py-28";

  return (
    <section id="contact" className={cn("scroll-mt-24", padding)} aria-labelledby="contact-heading">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            id="contact-heading"
            as={headingAs}
            size={headingAs === "h1" ? "page" : "section"}
            eyebrow={copy.contact.eyebrow}
            title={copy.contact.title}
            intro={copy.contact.intro}
          />
          <p className="mt-6 border-l-2 border-brass pl-4 text-sm leading-relaxed text-muted">{copy.contact.demo}</p>
          <ul className="mt-8 space-y-4">
            {details.map((item) => (
              <li key={item.label} className="flex items-start gap-3 text-sm">
                <item.icon className="mt-0.5 h-4 w-4 text-forest" aria-hidden="true" />
                {item.href ? (
                  <a href={item.href} className="hover:text-forest">
                    {item.label}
                  </a>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-line bg-card p-6 shadow-soft md:p-8 lg:col-span-7">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
