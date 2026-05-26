import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Occhiello from "@/components/Occhiello";
import BoxAiuto from "@/components/BoxAiuto";
import Partner from "@/components/Partner";
import { getServices, getServiceBySlug } from "@/lib/site-content";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // Prova prima da site-content.json, fallback alle traduzioni
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Servizio" };

  const title = service.title;
  const description = service.subtitle;
  return {
    title,
    description,
    robots: "index,follow",
    alternates: {
      canonical: `https://gecospomezia.it/it/servizi/${slug}`,
    },
    openGraph: {
      title: `${title} | GE.CO.S. S.r.l.`,
      description,
      images: service.heroImage
        ? [{ url: service.heroImage, alt: service.heroImageAlt || title }]
        : [{ url: "/assets/photos/hero-bg.jpg", width: 1440, height: 717, alt: `${title} – GE.CO.S. S.r.l.` }],
    },
  };
}

export default async function ServizioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Legge da site-content.json
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const th = await getTranslations("home");
  const tp = await getTranslations("home.partner");
  const t = await getTranslations("servizi");

  const allServices = await getServices();

  const altriServizi = allServices
    .filter((s) => s.slug !== slug)
    .slice(0, 2)
    .map((s) => ({
      id: s.id,
      label: s.label,
      title: s.title,
      href: `/it/servizi/${s.slug}`,
      image: s.image,
      imageAlt: s.imageAlt || s.title,
    }));

  return (
    <>
      <Header />
      <main>
        {/* ── Hero card ── */}
        <section className="relative h-[315px] overflow-hidden">
          <Image
            src={service.image}
            alt={service.imageAlt || service.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end pb-10 container-boxed">
            <Occhiello label={service.label} className="mb-4" />
            <h1 className="text-3xl md:text-[40px] font-bold text-white leading-tight">
              {service.title}
            </h1>
          </div>
        </section>

        {/* ── Contenuto servizio ── */}
        <section className="py-16 bg-white">
          <div className="container-boxed">
            <div className="max-w-3xl">
              <h2 className="text-xl md:text-2xl font-bold text-primary">
                {service.subtitle}
              </h2>
            </div>

            {/* 3 card dettagli */}
            {(() => {
              const cards = [
                { title: service.detail1Title, text: service.detail1Text, icon: "eco" },
                { title: service.detail2Title, text: service.detail2Text, icon: "handyman" },
                ...(service.detail3Title && service.detail3Text
                  ? [{ title: service.detail3Title, text: service.detail3Text, icon: "recycling" }]
                  : []),
              ].filter((c) => c.title && c.text);
              return cards.length > 0 ? (
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-[10px]">
                  {cards.map((card) => (
                    <div
                      key={card.title}
                      className="bg-gray-50 shadow-sm p-5 flex flex-col gap-5"
                    >
                      <div className="flex items-end gap-4">
                        <span className="material-symbols-outlined text-primary text-[42px] leading-none">
                          {card.icon}
                        </span>
                        <p className="font-extrabold text-primary-950 text-xl uppercase leading-tight">
                          {card.title}
                        </p>
                      </div>
                      <p className="text-[15px] text-primary-950 font-light leading-relaxed">
                        {card.text}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null;
            })()}

            {/* Hero photo */}
            <div className="mt-12 relative w-full aspect-[16/9] overflow-hidden bg-gray-100">
              <Image
                src={service.heroImage || service.image}
                alt={service.heroImageAlt || service.imageAlt || service.title}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1152px"
              />
            </div>

            {/* Altri servizi */}
            {altriServizi.length > 0 && (
              <div className="mt-16">
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-8">
                  {t("scopriDiPiu")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {altriServizi.map((altro) => (
                    <Link
                      key={altro.id}
                      href={altro.href}
                      className="relative aspect-[571/315] overflow-hidden block group"
                    >
                      <Image
                        src={altro.image}
                        alt={altro.imageAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 571px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent group-hover:from-black/90 transition-all" />
                      <div className="absolute inset-0 flex flex-col justify-end p-[30px]">
                        <span className="text-accent text-[11px] font-bold uppercase tracking-[0.15em]">
                          {altro.label}
                        </span>
                        <span className="text-white text-2xl md:text-[28px] font-bold mt-2 leading-tight">
                          {altro.title}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
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
