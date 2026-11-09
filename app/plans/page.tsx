import { copy, images } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { FrameImage } from "@/components/frame-image";
import { PlansSection } from "@/components/plans-section";
import { CtaBand } from "@/components/cta-band";

export const metadata = pageMetadata(copy.titles.plans, copy.plans.intro, "/plans");

export default function PlansPage() {
  return (
    <>
      <FrameImage
        src={images.plansBand}
        alt="Sample photograph of a bright interior used beside the fictional maintenance plans."
        priority
      />
      <PlansSection tone="follow" headingAs="h1" />
      <CtaBand />
    </>
  );
}
