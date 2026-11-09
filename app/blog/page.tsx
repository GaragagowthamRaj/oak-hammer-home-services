import { copy, images } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { FrameImage } from "@/components/frame-image";
import { BlogSection } from "@/components/blog-section";
import { CtaBand } from "@/components/cta-band";

export const metadata = pageMetadata(copy.titles.blog, copy.blog.intro, "/blog");

export default function BlogPage() {
  return (
    <>
      <FrameImage src={images.blogBand} alt="Sample photograph of a light-filled living room for the journal." priority />
      <BlogSection tone="follow" headingAs="h1" />
      <CtaBand />
    </>
  );
}
