import { copy } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { ContactSection } from "@/components/contact-section";

export const metadata = pageMetadata(copy.titles.contact, copy.contact.intro, "/contact");

export default function ContactPage() {
  return <ContactSection tone="page" headingAs="h1" />;
}
