import { copy } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { ProjectGallery } from "@/components/project-gallery";
import { CtaBand } from "@/components/cta-band";

export const metadata = pageMetadata(copy.titles.projects, copy.projects.intro, "/projects");

export default function ProjectsPage() {
  return (
    <>
      <ProjectGallery tone="page" headingAs="h1" />
      <CtaBand />
    </>
  );
}
