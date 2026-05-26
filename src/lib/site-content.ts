import content from "@/data/site-content.json";
import type { ServiceItem, SeoData } from "./content-api";
import { getServicesFromApi, getSeoFromApi } from "./content-api";

export type { ServiceItem, SeoData };
export type SiteContent = typeof content;
export type PageKey = keyof SiteContent["pages"];

export function getSiteContent(): SiteContent {
  return content;
}

// Fallback locale (JSON) — usato quando l'API non risponde
function getServicesLocal(): ServiceItem[] {
  return [...content.services].sort((a, b) => a.order - b.order);
}

function getServiceBySlugLocal(slug: string): ServiceItem | undefined {
  return content.services.find((s) => s.slug === slug);
}

function getPageSeoLocal(pageKey: string): SeoData | null {
  const pages = content.pages as Record<string, { seo: SeoData }>;
  return pages[pageKey]?.seo ?? null;
}

export async function getServices(): Promise<ServiceItem[]> {
  const api = await getServicesFromApi();
  if (api && Array.isArray(api) && api.length > 0) {
    return [...api].sort((a, b) => a.order - b.order);
  }
  return getServicesLocal();
}

export async function getServiceBySlug(
  slug: string
): Promise<ServiceItem | undefined> {
  const api = await getServicesFromApi();
  if (api && Array.isArray(api)) {
    const found = api.find((s) => s.slug === slug);
    if (found) return found;
  }
  return getServiceBySlugLocal(slug);
}

export async function getPageSeo(pageKey: string): Promise<SeoData | null> {
  const api = await getSeoFromApi();
  if (api && api[pageKey]) return api[pageKey];
  return getPageSeoLocal(pageKey);
}

export const PAGE_KEYS: PageKey[] = [
  "home",
  "chi-siamo",
  "servizi",
  "certificazioni",
  "faqs",
  "contatti",
  "whistleblowing",
  "privacy-policy",
  "cookie-policy",
  "conferma",
];
