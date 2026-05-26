import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Occhiello from "@/components/Occhiello";
import SectionTitle from "@/components/SectionTitle";
import BoxAiuto from "@/components/BoxAiuto";
import FaqAccordion from "@/components/FaqAccordion";
import Partner from "@/components/Partner";

export const metadata: Metadata = {
  title: "Certificazioni",
  description:
    "GE.CO.S. S.r.l. – certificata ISO 9001:2015, EMAS e UNI/PDR 125:2022. Qualità, sostenibilità e parità di genere.",
};

interface CertCardProps {
  imageSrc: string;
  imageAlt: string;
  label: string;
  title: string;
  text: string;
  body: string;
  previewUrl: string;
  pdfUrl: string;
  ctaPreview: string;
  ctaPdf: string;
}

function CertCard({
  imageSrc,
  imageAlt,
  label,
  title,
  text,
  body,
  previewUrl,
  pdfUrl,
  ctaPreview,
  ctaPdf,
}: CertCardProps) {
  return (
    <div className="flex flex-col border border-[#d1d1d1]">
      {/* Immagine certificato */}
      <div className="relative overflow-hidden aspect-[364/400] bg-gray-100">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 364px"
        />
      </div>

      {/* Label + Titolo */}
      <div className="px-6 pt-5 pb-1">
        <span className="block text-[11px] font-bold uppercase tracking-[0.15em] text-primary/60">
          {label}
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-primary leading-tight mt-1">
          {title}
        </h3>
      </div>

      {/* Testo descrittivo */}
      <div className="px-6 pt-4 pb-2 space-y-3 flex-1">
        <p className="text-[14px] text-primary-950 leading-relaxed">{text}</p>
        <p className="text-[14px] text-primary-950 leading-relaxed">{body}</p>
      </div>

      {/* Pulsanti */}
      <div className="px-6 pb-6 pt-4 flex flex-col gap-3">
        <Link
          href={previewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline w-full"
        >
          {ctaPreview}
        </Link>
        <Link
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-accent w-full"
        >
          {ctaPdf}
        </Link>
      </div>
    </div>
  );
}

export default async function CertificazioniPage() {
  const t = await getTranslations("certificazioni");
  const th = await getTranslations("home");
  const tf = await getTranslations("faqs");
  const tp = await getTranslations("home.partner");

  const faqItems = (tf.raw("items") as { question: string; answer: string }[]).slice(0, 3);

  const certs = [
    {
      n: 1,
      label: t("cert1.label"),
      title: t("cert1.title"),
      text: t("cert1.text"),
      body: t("cert1.body"),
      pdfUrl: t("cert1.pdfUrl"),
      previewUrl: t("cert1.previewUrl"),
    },
    {
      n: 2,
      label: t("cert2.label"),
      title: t("cert2.title"),
      text: t("cert2.text"),
      body: t("cert2.body"),
      pdfUrl: t("cert2.pdfUrl"),
      previewUrl: t("cert2.previewUrl"),
    },
    {
      n: 3,
      label: t("cert3.label"),
      title: t("cert3.title"),
      text: t("cert3.text"),
      body: t("cert3.body"),
      pdfUrl: t("cert3.pdfUrl"),
      previewUrl: t("cert3.previewUrl"),
    },
  ];

  const attestati = [
    {
      n: 1,
      label: t("attestati.att1.label"),
      title: t("attestati.att1.title"),
      text: t("attestati.att1.text"),
      body: t("attestati.att1.body"),
    },
    {
      n: 2,
      label: t("attestati.att2.label"),
      title: t("attestati.att2.title"),
      text: t("attestati.att2.text"),
      body: t("attestati.att2.body"),
    },
    {
      n: 3,
      label: t("attestati.att3.label"),
      title: t("attestati.att3.title"),
      text: t("attestati.att3.text"),
      body: t("attestati.att3.body"),
    },
  ];

  return (
    <>
      <Header />
      <main>
        {/* ── Header sezione (bianco — nessun hero con immagine nel Figma) ── */}
        <section className="pt-16 pb-10 bg-white">
          <div className="container-boxed">
            <Occhiello label={t("hero.occhiello")} className="mb-4" />
            <h1 className="text-3xl md:text-[40px] font-bold text-primary leading-tight">
              {t("hero.title")}{" "}
              <span className="text-primary">{t("hero.titleAccent")}</span>
            </h1>
            <p className="mt-3 text-base text-primary-950 max-w-3xl">
              {t("hero.subtitle")}
            </p>
          </div>
        </section>

        {/* ── Certificazioni ── */}
        <section className="pb-20 bg-white">
          <div className="container-boxed">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px]">
              {certs.map(({ n, label, title, text, body, pdfUrl, previewUrl }) => (
                <CertCard
                  key={n}
                  imageSrc={`/assets/certs/cert-${n}.jpg`}
                  imageAlt={`Certificazione ${title}`}
                  label={label}
                  title={title}
                  text={text}
                  body={body}
                  previewUrl={previewUrl}
                  pdfUrl={pdfUrl}
                  ctaPreview={t("apriAnteprima")}
                  ctaPdf={t("scaricaPdf")}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Attestati ── */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container-boxed">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              {t("attestati.title")}
            </h2>
            <p className="text-base text-primary-950 max-w-3xl mb-10">
              {t("attestati.subtitle")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px]">
              {attestati.map(({ n, label, title, text, body }) => (
                <CertCard
                  key={n}
                  imageSrc={`/assets/certs/cert-${n}.jpg`}
                  imageAlt={`Attestato ${title}`}
                  label={label}
                  title={title}
                  text={text}
                  body={body ?? ""}
                  previewUrl={`/assets/certs/cert-${n}.jpg`}
                  pdfUrl={`/assets/certs/cert-${n}.jpg`}
                  ctaPreview={t("apriAnteprima")}
                  ctaPdf={t("scaricaPdf")}
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
            <div className="mt-10 flex justify-center">
              <Link href="/it/faqs" className="btn-outline">
                {th("faqs.cta")}
              </Link>
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
