import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionTitle from "@/components/SectionTitle";
import FaqAccordion from "@/components/FaqAccordion";
import BoxAiuto from "@/components/BoxAiuto";
import Partner from "@/components/Partner";

export const metadata: Metadata = {
  title: "Domande frequenti sui servizi del verde",
  description:
    "Risposte alle domande più comuni su zone di intervento, preventivi, certificazioni e servizi di emergenza di GE.CO.S. S.r.l.",
  robots: "index,follow",
  alternates: { canonical: "https://gecospomezia.it/it/faqs" },
  openGraph: {
    title: "Domande frequenti | GE.CO.S. S.r.l.",
    description:
      "Risposte alle domande più comuni su zone di intervento, preventivi, certificazioni e servizi di emergenza.",
    images: [
      {
        url: "/assets/photos/hero-bg.jpg",
        width: 1440,
        height: 717,
        alt: "FAQ GE.CO.S. S.r.l. – Gestione del verde",
      },
    ],
  },
};

export default async function FaqsPage() {
  const t = await getTranslations("faqs");
  const th = await getTranslations("home");
  const tp = await getTranslations("home.partner");

  const faqItems = (t.raw("items") as { question: string; answer: string }[]);

  return (
    <>
      <Header />
      <main>
        {/* ── Sezione FAQs ── */}
        <section className="py-20 bg-white">
          <div className="container-boxed">
            <SectionTitle
              occhiello={t("occhiello")}
              title={t("title")}
              subtitle={t("subtitle")}
              centered
            />
            <div className="mt-12 max-w-3xl mx-auto">
              <FaqAccordion items={faqItems} />
            </div>
          </div>
        </section>

        {/* ── Box Aiuto ── */}
        <BoxAiuto
          title={th("boxAiuto.title")}
          subtitle={th("boxAiuto.subtitle")}
          cta={th("boxAiuto.cta")}
        />

        {/* ── Partner ── */}
        <Partner
          occhiello={tp("occhiello")}
          title={tp("title")}
          subtitle={tp("subtitle")}
        />
      </main>
      <Footer />
    </>
  );
}
