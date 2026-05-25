/**
 * Server Component che carica le FAQ tramite getFaqDataSource()
 * e le passa a FaqAccordion.
 *
 * Viene wrappato in <Suspense> dalla pagina per mostrare lo skeleton
 * durante il fetch.
 */

import { getFaqDataSource } from "@/lib/faq-datasource";
import FaqAccordion from "@/components/FaqAccordion";

interface FaqListProps {
  emptyMessage?: string;
}

export default async function FaqList({ emptyMessage }: FaqListProps) {
  let items: Awaited<ReturnType<ReturnType<typeof getFaqDataSource>["getFaqs"]>>["items"] = [];
  let error: string | null = null;

  try {
    const dataSource = getFaqDataSource();
    const result = await dataSource.getFaqs();
    items = result.items;
  } catch (err) {
    error = err instanceof Error ? err.message : "Errore sconosciuto";
    console.error("[FaqList] Errore nel recupero delle FAQ:", err);
  }

  // Error state
  if (error) {
    return (
      <div
        role="alert"
        className="border border-gray-200 bg-gray-50 px-6 py-8 text-center"
      >
        <span
          className="material-symbols-outlined text-[32px] text-primary/40 block mb-3"
          aria-hidden="true"
        >
          error_outline
        </span>
        <p className="text-[15px] text-primary/60">
          Non è stato possibile caricare le domande frequenti. Riprova più tardi.
        </p>
      </div>
    );
  }

  // Empty state
  if (items.length === 0) {
    return (
      <div className="border border-gray-200 bg-gray-50 px-6 py-8 text-center">
        <span
          className="material-symbols-outlined text-[32px] text-primary/40 block mb-3"
          aria-hidden="true"
        >
          help_outline
        </span>
        <p className="text-[15px] text-primary/60">
          {emptyMessage ?? "Nessuna domanda frequente disponibile al momento."}
        </p>
      </div>
    );
  }

  // Mappa FaqItem di Loonar → shape accettata da FaqAccordion
  const accordionItems = items.map((item) => ({
    title: item.title,
    content: item.content,
  }));

  return <FaqAccordion items={accordionItems} />;
}
