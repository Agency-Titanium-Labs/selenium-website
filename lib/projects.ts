import { getPayload } from "payload";
import configPromise from "@/payload.config";
import type { Project as PayloadProject, Media } from "@/payload-types";
import type { Project } from "@/app/(frontend)/projects/page";

function mapPayloadProjectToProject(doc: PayloadProject): Project {
  const images: string[] = (doc.images || [])
    .map((imgItem) => {
      if (imgItem.image && typeof imgItem.image === "object") {
        const media = imgItem.image as Media;
        return media.url || imgItem.imageUrl || "";
      }
      return imgItem.imageUrl || "";
    })
    .filter(Boolean);

  return {
    title: doc.title,
    slug: doc.slug,
    description: doc.description,
    about: doc.about,
    images,
    link: doc.link,
    githubLink: doc.githubLink || undefined,
    accentColor: doc.accentColor || undefined,
    lightMode: doc.lightMode ?? undefined,
    year: doc.year,
    category: doc.category,
    tags: (doc.tags || []).map((t) => t.tag),
    role: doc.role,
    duration: doc.duration || undefined,
    client: doc.client || undefined,
    features: (doc.features || []).map((f) => f.feature),
    challenges: (doc.challenges || []).map((c) => c.challenge),
  };
}

export async function getProjects(): Promise<Project[]> {
  const payload = await getPayload({ config: configPromise });
  const { docs } = await payload.find({
    collection: "projects",
    depth: 1,
    limit: 100,
  });

  return docs.map(mapPayloadProjectToProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const payload = await getPayload({ config: configPromise });
  const { docs } = await payload.find({
    collection: "projects",
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1,
    limit: 1,
  });

  if (docs.length === 0) return null;
  return mapPayloadProjectToProject(docs[0]);
}
