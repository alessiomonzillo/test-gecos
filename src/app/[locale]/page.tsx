import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionTitle from "@/components/SectionTitle";
import BoxDati from "@/components/BoxDati";
import CardServizi from "@/components/CardServizi";
import BoxAiuto from "@/components/BoxAiuto";
import FaqAccordion from "@/components/FaqAccordion";
import Partner from "@/components/Partner";
import LoghiCarousel from "@/components/LoghiCarousel";

export const metadata: Metadata = {
  title: "GE.CO.S. S.r.l. – Gestione Costruzioni Servizi",
  description:
    "Gestione e manutenzione del verde urbano e rurale a Pomezia (RM). Qualità certificata ISO 9001, EMAS, UNI/PDR 125:2022.",
  robots: "index,follow",
  alternates: { canonical: "https://gecospomezia.it/it" },
  openGraph: {
    title: "GE.CO.S. S.r.l. – Gestione Costruzioni Servizi",
    description:
      "Gestione e manutenzione del verde urbano e rurale a Pomezia (RM). Qualità certificata ISO 9001, EMAS, UNI/PDR 125:2022.",
    images: [
      {
        url: "/assets/photos/hero-bg.jpg",
        width: 1440,
        height: 717,
        alt: "GE.CO.S. S.r.l. – Verde urbano e rurale a Pomezia",
      },
    ],
  },
};

export default async function HomePage() {
  const t = await getTranslations("home");
  const ts = await getTranslations("servizi");
  const tf = await getTranslations("faqs");

  const faqItems = (tf.raw("items") as { question: string; answer: string }[]);

  const serviziCards = [1, 2, 3, 4].map((n) => {
    const key = `servizio${n}` as "servizio1" | "servizio2" | "servizio3" | "servizio4";
    return {
      n,
      imageSrc: `/assets/photos/servizio-${n}.jpg`,
      imageAlt: ts(`${key}.title`),
      label: ts(`${key}.label`),
      title: ts(`${key}.title`),
      subtitle: ts(`${key}.subtitle`),
      detail1Title: ts(`${key}.detail1Title`),
      detail1Text: ts(`${key}.detail1Text`),
      detail2Title: ts(`${key}.detail2Title`),
      detail2Text: ts(`${key}.detail2Text`),
      linkHref: `/it/servizi/${ts(`${key}.slug`)}`,
      linkText: t("servizi.scopriDiPiu"),
    };
  });

  const certCards = [
    { n: 1, label: t("certificazioni.cert1Label"), title: t("certificazioni.cert1Title") },
    { n: 2, label: t("certificazioni.cert2Label"), title: t("certificazioni.cert2Title") },
    { n: 3, label: t("certificazioni.cert3Label"), title: t("certificazioni.cert3Title") },
  ];

  const stats: [
    { value: string; label: string; variant: "dark" },
    { value: string; label: string; variant: "dark" },
    { value: string; label: string; variant: "dark" },
  ] = [
    { value: t("chiSiamo.stat1"), label: t("chiSiamo.statLabel1"), variant: "dark" },
    { value: t("chiSiamo.stat2"), label: t("chiSiamo.statLabel2"), variant: "dark" },
    { value: t("chiSiamo.stat3"), label: t("chiSiamo.statLabel3"), variant: "dark" },
  ];

  const numberedCards = [
    {
      number: t("chiSiamo.card1Number"),
      title: t("chiSiamo.card1Title"),
      text: t("chiSiamo.card1Text"),
    },
    {
      number: t("chiSiamo.card2Number"),
      title: t("chiSiamo.card2Title"),
      text: t("chiSiamo.card2Text"),
    },
    {
      number: t("chiSiamo.card3Number"),
      title: t("chiSiamo.card3Title"),
      text: t("chiSiamo.card3Text"),
    },
  ];

  return (
    <>
      <Header />
      <main>
        {/* ── Hero ── */}
        <section
            style={{
                backgroundImage: "url('/assets/photos/hero-bg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
            className="relative min-h-[586px] md:min-h-[717px] flex flex-col items-center justify-start pt-10 md:pt-14 overflow-hidden bg-white">
          <div className="container-boxed text-center relative z-10 pb-6 md:pb-8">
            <h1 className="container-boxed text-[34px] md:text-5xl lg:text-[60px] font-bold text-primary leading-[1.05]  mx-auto tracking-tight">
              {t("hero.title")}
            </h1>
            <p className="mt-4 md:mt-5 text-base md:text-lg text-primary/80 max-w-2xl mx-auto leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <Link
                href="/it/servizi"
                className="border border-primary text-primary px-7 py-3 text-xs md:text-sm font-bold uppercase tracking-[0.15em] hover:bg-primary hover:text-white transition-colors"
              >
                {t("hero.cta")}
              </Link>
              <Link
                href="tel:069107142"
                className="bg-accent text-primary px-7 py-3 text-xs md:text-sm font-bold uppercase tracking-[0.15em] hover:bg-accent/90 transition-colors lg:hidden"
              >
                {t("hero.ctaChiama")}
              </Link>
            </div>
          </div>
          <div className="relative w-full flex-1 min-h-[280px] md:min-h-[420px]">
            <Image
              src="/assets/photos/hero-bg.jpg"
              alt="Alberi e verde urbano GE.CO.S."
              fill
              priority
              className="object-cover object-top hidden"
              sizes="100vw"
            />
          </div>
        </section>

        {/* ── Loghi carousel ── */}
        <LoghiCarousel />

        {/* ── Chi siamo ── */}
        <section className="py-16 bg-white">
          <div className="container-boxed">
            <SectionTitle
              occhiello={t("chiSiamo.occhiello")}
              title={t("chiSiamo.title")}
              subtitle={t("chiSiamo.subtitle")}
            />

            <div className="mt-8">
              <BoxDati stats={stats} />
            </div>

            <div className="mt-6 relative w-full aspect-[1152/479] overflow-hidden bg-gray-100">
              <Image
                src="/assets/photos/chi-siamo.jpg"
                alt="Operatore GE.CO.S. al lavoro"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1152px"
              />
            </div>

            <div className="mt-8">
              <h3 className="text-lg md:text-xl font-bold text-primary">
                {t("chiSiamo.sectionTitle")}
              </h3>
              <p className="mt-2 text-sm md:text-base text-primary/80 max-w-3xl">
                {t("chiSiamo.sectionText")}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {numberedCards.map((card) => (
                <div key={card.number} className="bg-accent-light/30 p-6 md:p-7">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-3xl md:text-4xl font-bold text-primary leading-none">
                      {card.number}
                    </span>
                    <span className="text-xs font-bold uppercase text-primary tracking-[0.2em]">
                      {card.title}
                    </span>
                  </div>
                  <p className="text-sm text-primary/80 leading-relaxed">{card.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/it/chi-siamo"
                className="btn-outline px-8 py-4"
              >
                {t("chiSiamo.cta")}
              </Link>
            </div>
          </div>
        </section>

        {/* ── Box Certificazioni ── */}
        <section className="py-20 bg-white">
          <div className="container-boxed">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <SectionTitle
                occhiello={t("certificazioni.occhiello")}
                title={t("certificazioni.title")}
                subtitle={t("certificazioni.subtitle")}
              />
              <div className="flex-shrink-0 md:pb-2">
                <Link href="/it/certificazioni" className="btn-outline px-6 py-3 text-sm">
                  {t("certificazioni.cta")}
                </Link>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-2">
              {certCards.map(({ n, label, title }) => (
                <div
                  key={n}
                  className="relative overflow-hidden bg-gray-100 aspect-[395/395]"
                >
                  <Image
                    src={`/assets/certs/cert-${n}.png`}
                    alt={`Certificazione ${title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 395px"
                  />
                  <div className="absolute inset-0 bg-primary/70" />
                  <div className="absolute inset-0 flex flex-col justify-end p-7">
                    <span className="text-accent text-[11px] font-bold uppercase tracking-[0.15em]">
                      {label}
                    </span>
                    <span className="text-white text-xl md:text-2xl font-bold mt-2 leading-tight">
                      {title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Servizi ── */}
        <section className="py-20 bg-white">
          <div className="container-boxed">
            <SectionTitle
              occhiello={t("servizi.occhiello")}
              title={t("servizi.title")}
              subtitle={t("servizi.subtitle")}
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-12">
              {serviziCards.map((card) => (
                <CardServizi
                  key={card.n}
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

            <div className="mt-12 flex justify-center">
              <Link href="/it/servizi" className="btn-outline px-8 py-4">
                {t("servizi.cta")}
              </Link>
            </div>
          </div>
        </section>

        {/* ── Box Aiuto ── */}
        <BoxAiuto
          title={t("boxAiuto.title")}
          subtitle={t("boxAiuto.subtitle")}
          cta={t("boxAiuto.cta")}
        />

        {/* ── FAQ Sezione ── */}
        <section className="py-16 bg-white">
          <div className="container-boxed">
            <SectionTitle
              occhiello={t("faqs.occhiello")}
              title={t("faqs.title")}
              subtitle={t("faqs.subtitle")}
              centered
            />
            <div className="mt-10 max-w-3xl mx-auto">
              <FaqAccordion items={faqItems} limit={3} />
            </div>
            <div className="mt-8 flex justify-center">
              <Link href="/it/faqs" className="btn-outline px-8 py-4">
                {t("faqs.cta")}
              </Link>
            </div>
          </div>
        </section>

        {/* ── Partner ── */}
        <Partner
          occhiello={t("partner.occhiello")}
          title={t("partner.title")}
          subtitle={t("partner.subtitle")}
        />
      </main>
      <Footer />
    </>
  );
}
