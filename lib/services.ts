import { getPayload } from "payload";
import configPromise from "@/payload.config";
import type { Service } from "@/payload-types";

export interface ServiceGroup {
  category: string;
  list: Service[];
}

export async function getServices(): Promise<ServiceGroup[]> {
  try {
    const payload = await getPayload({ config: configPromise });
    const { docs } = await payload.find({
      collection: "services",
      depth: 2,
      limit: 100,
      sort: "order",
    });

    if (!docs || docs.length === 0) {
      return [];
    }

    const categoryOrder: string[] = [
      "Web & Applications",
      "Consulting & Gestion de projet",
      "Design & Branding",
      "Automatisation & Data",
      "Production visuelle & publicitaire",
    ];

    const groupedMap = new Map<string, Service[]>();

    for (const item of docs) {
      const cat = item.category || "Autres";
      if (!groupedMap.has(cat)) {
        groupedMap.set(cat, []);
      }
      groupedMap.get(cat)!.push(item);
    }

    const sortedCategories = Array.from(groupedMap.keys()).sort((a, b) => {
      const indexA = categoryOrder.indexOf(a);
      const indexB = categoryOrder.indexOf(b);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.localeCompare(b);
    });

    return sortedCategories.map((category) => ({
      category,
      list: (groupedMap.get(category) || []).sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0),
      ),
    }));
  } catch (error) {
    console.error("Error fetching services from Payload:", error);
    return [];
  }
}

export async function getAllServices(): Promise<Service[]> {
  try {
    const payload = await getPayload({ config: configPromise });
    const { docs } = await payload.find({
      collection: "services",
      depth: 1,
      limit: 100,
      sort: "order",
    });

    return docs || [];
  } catch (error) {
    console.error("Error fetching all services:", error);
    return [];
  }
}
