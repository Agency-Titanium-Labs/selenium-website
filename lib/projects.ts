import { getPayload } from "payload";
import configPromise from "@/payload.config";
import type {
  Project as PayloadProject,
  Media,
  Service,
} from "@/payload-types";
import type { Project } from "@/app/(frontend)/projects/page";

function mapPayloadProjectToProject(doc: PayloadProject): Project {
  const images: string[] = (doc.images || [])
    .map((imgItem) => {
      if (typeof imgItem === "object" && imgItem !== null) {
        const item = imgItem as unknown as Record<string, unknown>;
        if (typeof item.url === "string") return item.url;
        if (typeof item.image === "object" && item.image !== null) {
          const media = item.image as Media;
          return media.url || "";
        }
        if (typeof item.imageUrl === "string") return item.imageUrl;
      }
      if (typeof imgItem === "string") return imgItem;
      return "";
    })
    .filter(Boolean);

  const services: Service[] = (doc.services || []).filter(
    (s): s is Service => typeof s === "object" && s !== null,
  );

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
    services,
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
    depth: 2,
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
    depth: 2,
    limit: 1,
  });

  if (docs.length === 0) return null;
  return mapPayloadProjectToProject(docs[0]);
}
