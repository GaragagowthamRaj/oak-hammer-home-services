import type { Metadata } from "next";
import { copy } from "./content";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: copy.meta.title,
      locale: "en_US",
      type: "website",
    },
  };
}
