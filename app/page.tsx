import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { AboutSection } from "@/components/about-section";
import { Counters } from "@/components/counters";
import { ServicesSection } from "@/components/services-section";
import { WhySection } from "@/components/why-section";
import { PlansSection } from "@/components/plans-section";
import { GiftPromo, SeasonPromo } from "@/components/promos";
import { ProjectGallery } from "@/components/project-gallery";
import { Testimonials } from "@/components/testimonials";
import { FaqSection } from "@/components/faq-section";
import { BlogSection } from "@/components/blog-section";
import { ContactSection } from "@/components/contact-section";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <Counters />
      <ServicesSection />
      <WhySection />
      <PlansSection />
      <GiftPromo />
      <SeasonPromo />
      <ProjectGallery />
      <Testimonials />
      <FaqSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}
