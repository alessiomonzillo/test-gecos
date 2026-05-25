/**
 * Strategy Pattern per il data source delle FAQ.
 *
 * - ProdFaqDataSource  → chiama direttamente l'API Loonar (APP_ENV === 'prod')
 * - DevMockFaqDataSource → restituisce dati mock locali (tutti gli altri env)
 *
 * Sanitizzazione HTML
 * -------------------
 * Il campo `content` arriva dalla API come HTML prodotto da un CMS interno.
 * Non è disponibile isomorphic-dompurify nell'attuale set di dipendenze, quindi
 * viene applicata una whitelist manuale dei soli tag sicuri:
 *   p, ul, ol, li, strong, em, b, i, a, br, span
 * Qualsiasi altro tag viene rimosso (tag + contenuto conservato),
 * e gli attributi pericolosi (on*, javascript:) vengono rimossi.
 * Questa scelta è documentata e sufficiente per HTML prodotto da editor WYSIWYG
 * controllati; se il sorgente non è fidato, sostituire con DOMPurify.
 */

import { FAQ_MOCK_ITEMS } from "./faq-mock";

// ─── Tipi pubblici ────────────────────────────────────────────────────────────

export interface FaqItem {
  id: number;
  title: string;
  /** HTML sicuro, già sanitizzato */
  content: string;
  description: string | null;
  icon: string;
}

export interface FaqDataSource {
  getFaqs(): Promise<{ items: FaqItem[]; total: number }>;
}

// ─── Sanitizzazione HTML ──────────────────────────────────────────────────────

/**
 * Allowlist dei tag consentiti per il rendering del campo `content`.
 * Tag non in lista vengono rimossi mantenendo il loro contenuto testuale.
 */
const ALLOWED_TAGS = new Set([
  "p", "ul", "ol", "li", "strong", "em", "b", "i", "a", "br", "span",
]);

/**
 * Rimuove i tag non in allowlist e gli attributi event handler / javascript:.
 * Funziona tramite regex ed è adeguato per HTML proveniente da CMS controllati.
 */
export function sanitizeHtml(dirty: string): string {
  if (!dirty) return "";

  // 1. Rimuovi script e style block (tag + contenuto)
  let clean = dirty.replace(
    /<(script|style)[^>]*>[\s\S]*?<\/\1>/gi,
    ""
  );

  // 2. Rimuovi tag non in allowlist (conserva il testo interno)
  clean = clean.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g, (match, tag) => {
    if (ALLOWED_TAGS.has(tag.toLowerCase())) return match;
    return "";
  });

  // 3. Rimuovi attributi event handler (on*)
  clean = clean.replace(/\s+on\w+="[^"]*"/gi, "");
  clean = clean.replace(/\s+on\w+='[^']*'/gi, "");

  // 4. Rimuovi href/src con javascript:
  clean = clean.replace(/(href|src)=["']javascript:[^"']*["']/gi, "");

  return clean.trim();
}

// ─── Strategia Produzione ─────────────────────────────────────────────────────

/**
 * Shape della risposta dell'API Loonar per il campo FAQ.
 */
interface LoonarFaqApiResponse {
  items: Array<{
    id: number;
    title: string;
    content: string;
    description: string | null;
    icon: string;
  }>;
  total: number;
}

class ProdFaqDataSource implements FaqDataSource {
  async getFaqs(): Promise<{ items: FaqItem[]; total: number }> {
    const baseUrl = process.env.LOONAR_BE_URL;
    if (!baseUrl) {
      throw new Error("LOONAR_BE_URL non è definita nelle variabili d'ambiente.");
    }

    const token = process.env.LOONAR_PUBLIC_TOKEN ?? "";
    const locale = "it-IT";

    const url = `${baseUrl}/ticketing/public/articles`;

    const headers = new Headers();
    headers.append("Authorization", token);
    headers.append("Accept-Language", locale);
    headers.append("Language", locale);

    const response = await fetch(url, {
      method: "GET",
      headers,
      redirect: "follow",
      // In prod vogliamo dati freschi ma con revalidazione ogni 5 minuti
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(
        `Loonar FAQ API ha risposto con status ${response.status}: ${response.statusText}`
      );
    }

    const json = await response.json() as { message: LoonarFaqApiResponse; status: number };

    // La response shape è { message: { items: [...], total: N }, status: 200 }
    const data = json.message;

    const items: FaqItem[] = data.items.map((raw) => ({
      id: raw.id,
      title: raw.title,
      content: sanitizeHtml(raw.content),
      description: raw.description,
      icon: raw.icon ?? "",
    }));

    return { items, total: data.total };
  }
}

// ─── Strategia Dev / Mock ─────────────────────────────────────────────────────

class DevMockFaqDataSource implements FaqDataSource {
  async getFaqs(): Promise<{ items: FaqItem[]; total: number }> {
    // Simula una lieve latenza di rete per evidenziare loading skeleton
    await new Promise((resolve) => setTimeout(resolve, 120));
    return {
      items: FAQ_MOCK_ITEMS,
      total: FAQ_MOCK_ITEMS.length,
    };
  }
}

// ─── Factory ──────────────────────────────────────────────────────────────────

/**
 * Restituisce la strategia appropriata in base ad APP_ENV.
 * In produzione (`APP_ENV === 'prod'`) usa l'API Loonar reale.
 * In tutti gli altri ambienti (dev, staging, test) usa i mock locali.
 */
export function getFaqDataSource(): FaqDataSource {
  return process.env.APP_ENV === "prod"
    ? new ProdFaqDataSource()
    : new DevMockFaqDataSource();
}
