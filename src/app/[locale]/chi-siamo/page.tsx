import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Occhiello from "@/components/Occhiello";
import BoxDati from "@/components/BoxDati";
import BoxAiuto from "@/components/BoxAiuto";
import Partner from "@/components/Partner";
import FaqAccordion from "@/components/FaqAccordion";
import HeroCarousel from "@/components/HeroCarousel";

const HERO_SLIDES = [
  { src: "/assets/photos/chi-siamo.jpg", alt: "Chi siamo GE.CO.S." },
  { src: "/assets/photos/chi-siamo.jpg", alt: "Chi siamo GE.CO.S." },
  { src: "/assets/photos/chi-siamo.jpg", alt: "Chi siamo GE.CO.S." },
  { src: "/assets/photos/chi-siamo.jpg", alt: "Chi siamo GE.CO.S." },
  { src: "/assets/photos/chi-siamo.jpg", alt: "Chi siamo GE.CO.S." },
];

export const metadata: Metadata = {
  title: "Chi siamo",
  description:
    "GE.CO.S. S.r.l. – oltre 20 anni di esperienza nella gestione e manutenzione del verde urbano e rurale a Pomezia (RM).",
};

export default async function ChiSiamoPage() {
  const t = await getTranslations("chiSiamo");
  const th = await getTranslations("home");
  const tf = await getTranslations("faqs");
  const tp = await getTranslations("home.partner");

  const faqItems = (tf.raw("items") as { question: string; answer: string }[]).slice(0, 3);

  const stats: [
    { value: string; label: string; variant: "dark" },
    { value: string; label: string; variant: "dark" },
    { value: string; label: string; variant: "dark" },
  ] = [
    { value: t("numeri.n1"), label: t("numeri.label1"), variant: "dark" },
    { value: t("numeri.n2"), label: t("numeri.label2"), variant: "dark" },
    { value: t("numeri.n3"), label: t("numeri.label3"), variant: "dark" },
  ];

  const dropdownItems = [
    { question: t("dropdown1Title"), answer: t("dropdown1Text") },
    { question: t("dropdown2Title"), answer: t("dropdown2Text") },
    { question: t("dropdown3Title"), answer: t("dropdown3Text") },
  ];

  const cards = [
    {
      number: t("card1Number"),
      title: t("card1Title"),
      text: t("card1Text"),
    },
    {
      number: t("card2Number"),
      title: t("card2Title"),
      text: t("card2Text"),
    },
    {
      number: t("card3Number"),
      title: t("card3Title"),
      text: t("card3Text"),
    },
  ];

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

        {/* ── Contenuto principale ── */}
        <section className="py-16 bg-white">
          <div className="container-boxed">
            {/* Sezione 1: Titolo + sottotitolo principale */}
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              {t("sezione1.title")}
            </h2>
            <p className="mt-3 text-base text-primary-950 max-w-3xl">
              {t("sezione1.subtitle")}
            </p>

            {/* Titolo + testo secondario */}
            <div className="mt-8">
              <h3 className="text-lg md:text-xl font-bold text-primary">
                {t("sezione1.bodyTitle")}
              </h3>
              <p className="mt-2 text-sm md:text-base text-primary-950 max-w-3xl">
                {t("sezione1.bodyText")}
              </p>
            </div>

            {/* BoxDati + Foto */}
            <div className="mt-8">
              <BoxDati stats={stats} />
            </div>
            <div className="mt-6 relative w-full aspect-[1152/479] overflow-hidden bg-gray-100">
              <Image
                src="/assets/photos/chi-siamo.jpg"
                alt="Il team GE.CO.S. al lavoro"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1152px"
              />
            </div>

            {/* Sezione 2: Titolo + testo dopo la foto */}
            <div className="mt-12">
              <h3 className="text-lg md:text-xl font-bold text-primary">
                {t("sezione2.title")}
              </h3>
              <p className="mt-2 text-sm md:text-base text-primary-950 max-w-3xl">
                {t("sezione2.bodyText")}
              </p>
            </div>

            {/* Card + numeri: 3 colonne su sfondo accent-light */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-[10px]">
              {cards.map((card) => (
                <div
                  key={card.number}
                  className="bg-secondary-50 px-8 py-8"
                >
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-[56px] font-bold text-primary leading-none">
                      {card.number}
                    </span>
                    <span className="text-[13px] font-bold text-primary uppercase tracking-[0.15em] leading-snug">
                      {card.title}
                    </span>
                  </div>
                  <p className="text-[14px] text-primary-950 leading-relaxed">
                    {card.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Sezione Valori: titolo + dropdown */}
            <div className="mt-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {t("dropdownTitle")}
              </h2>
              <p className="text-base text-primary-950 max-w-3xl mb-8">
                {t("dropdownSubtitle")}
              </p>
              <FaqAccordion items={dropdownItems} variant="valori" />
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
