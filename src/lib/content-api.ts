import itMessages from "../../messages/it.json";

const BASE = process.env.CONTENT_API_URL;

export interface CompanyData {
  tagline: string;
  sedeOperativa: { indirizzo: string; cap: string; citta: string };
  sedeLegale: { indirizzo: string; cap: string; citta: string };
  telefoni: string[];
  emails: string[];
  social: { instagram: string; facebook: string };
  copyright: string;
}

export interface ServiceItem {
  dbId?: number;
  id: string;
  slug: string;
  order: number;
  title: string;
  subtitle: string;
  label: string;
  detail1Title: string;
  detail1Text: string;
  detail2Title: string;
  detail2Text: string;
  detail3Title?: string;
  detail3Text?: string;
  image: string;
  imageAlt: string;
  heroImage: string;
  heroImageAlt: string;
}

export interface SeoData {
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  robots?: string;
  canonicalUrl?: string;
}

async function fetchOrNull<T>(path: string): Promise<T | null> {
  if (!BASE) return null;
  try {
    const res = await fetch(`${BASE}${path}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getMessages(
  locale: string
): Promise<Record<string, unknown>> {
  const api = await fetchOrNull<Record<string, unknown>>(
    `/api/v1/messages/${locale}`
  );
  if (api) return api;
  return itMessages as Record<string, unknown>;
}

export async function getCompany(): Promise<CompanyData | null> {
  return fetchOrNull<CompanyData>("/api/v1/company");
}

export async function getServicesFromApi(): Promise<ServiceItem[] | null> {
  return fetchOrNull<ServiceItem[]>("/api/v1/services");
}

export async function getSeoFromApi(): Promise<Record<string, SeoData> | null> {
  return fetchOrNull<Record<string, SeoData>>("/api/v1/seo");
}
