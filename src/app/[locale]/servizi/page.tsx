import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import Occhiello from "@/components/Occhiello";
import SectionTitle from "@/components/SectionTitle";
import CardServizi from "@/components/CardServizi";
import BoxAiuto from "@/components/BoxAiuto";
import FaqAccordion from "@/components/FaqAccordion";
import Partner from "@/components/Partner";
import { getServices } from "@/lib/site-content";

const HERO_SLIDES = [
  { src: "/assets/photos/servizio-1.jpg", alt: "Manutenzione aree verdi" },
  { src: "/assets/photos/servizio-2.jpg", alt: "Gestione aree boschive" },
  { src: "/assets/photos/servizio-3.jpg", alt: "Arredo urbano e fioriture" },
  { src: "/assets/photos/servizio-4.jpg", alt: "Servizi cimiteriali" },
];

export const metadata: Metadata = {
  title: "Servizi professionali per il verde",
  description:
    "Scopri i servizi di manutenzione del verde, gestione boschiva, arredo urbano e servizi cimiteriali di GE.CO.S. S.r.l. a Pomezia (RM).",
  robots: "index,follow",
  alternates: { canonical: "https://gecospomezia.it/it/servizi" },
  openGraph: {
    title: "Servizi professionali per il verde | GE.CO.S. S.r.l.",
    description:
      "Manutenzione aree verdi, gestione boschiva, arredo urbano e servizi cimiteriali. Qualità certificata ISO 9001.",
    images: [
      {
        url: "/assets/photos/hero-bg.jpg",
        width: 1440,
        height: 717,
        alt: "Servizi professionali per il verde – GE.CO.S. S.r.l.",
      },
    ],
  },
};

export default async function ServiziPage() {
  const t = await getTranslations("servizi");
  const th = await getTranslations("home");
  const tf = await getTranslations("faqs");
  const tp = await getTranslations("home.partner");

  const faqItems = (tf.raw("items") as { question: string; answer: string }[]).slice(0, 3);

  // Legge i servizi da site-content.json (fonte di verità per i dati editabili).
  // Le traduzioni restano come fallback per i testi non coperti da site-content.json.
  const contentServices = await getServices();

  const serviziCards = contentServices.map((service, idx) => {
    const n = idx + 1;
    return {
      id: service.id,
      imageSrc: service.image || `/assets/photos/servizio-${n}.jpg`,
      imageAlt: service.imageAlt || service.title,
      label: service.label,
      title: service.title,
      subtitle: service.subtitle,
      detail1Title: service.detail1Title,
      detail1Text: service.detail1Text,
      detail2Title: service.detail2Title,
      detail2Text: service.detail2Text,
      linkHref: `/it/servizi/${service.slug}`,
      linkText: t("scopriDiPiu"),
    };
  });

  return (
    <>
      <Header />
      <main>
        {/* ── Hero ── */}
        <HeroCarousel slides={HERO_SLIDES}>
          <Occhiello label={t("hero.occhiello")} className="mb-5" />
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white leading-[1.05] tracking-tight">
            {t("hero.title")}{" "}
            <span className="text-accent">{t("hero.titleAccent")}</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/90 max-w-3xl leading-relaxed">
            {t("hero.subtitle")}
          </p>
        </HeroCarousel>

        {/* ── Lista servizi ── */}
        <section className="pt-16 pb-20 bg-white">
          <div className="container-boxed">
            <div className="mb-10">
              <h2 className="text-3xl md:text-[40px] font-bold text-primary leading-tight">
                {t("title")}
              </h2>
              <p className="mt-3 text-base text-primary-950 max-w-3xl">
                {t("subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-12">
              {serviziCards.map((card) => (
                <CardServizi
                  key={card.id}
                  imageSrc={card.imageSrc}
                  imageAlt={card.imageAlt}
                  label={card.label}
                  title={card.title}
                  subtitle={card.subtitle}
                  detail1Title={card.detail1Title}
                  detail1Text={card.detail1Text}
                  detail2Title={card.detail2Title}
                  detail2Text={card.detail2Text}
                  linkHref={card.linkHref}
                  linkText={card.linkText}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Box Aiuto ── */}
        <BoxAiuto
          title={th("boxAiuto.title")}
          subtitle={th("boxAiuto.subtitle")}
          cta={th("boxAiuto.cta")}
        />

        {/* ── FAQ Sezione ── */}
        <section className="py-16 bg-white">
          <div className="container-boxed">
            <SectionTitle
              occhiello={th("faqs.occhiello")}
              title={th("faqs.title")}
              subtitle={th("faqs.subtitle")}
              centered
            />
            <div className="mt-10 max-w-3xl mx-auto">
              <FaqAccordion items={faqItems} />
            </div>
          </div>
        </section>

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
