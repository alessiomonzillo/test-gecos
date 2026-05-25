import content from "@/data/site-content.json";

export type SiteContent = typeof content;
export type ServiceItem = SiteContent["services"][number];
export type PageKey = keyof SiteContent["pages"];
export type SeoData = SiteContent["pages"][PageKey]["seo"];

export function getSiteContent(): SiteContent {
  return content;
}

export function getServices(): ServiceItem[] {
  return [...content.services].sort((a, b) => a.order - b.order);
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return content.services.find((s) => s.slug === slug);
}

export function getPageSeo(pageKey: string): SeoData | null {
  const pages = content.pages as Record<string, { seo: SeoData }>;
  return pages[pageKey]?.seo ?? null;
}

export const PAGE_KEYS: PageKey[] = [
  "home",
  "chi-siamo",
  "servizi",
  "certificazioni",
  "faqs",
  "contatti",
  "privacy-policy",
  "cookie-policy",
  "conferma",
];
