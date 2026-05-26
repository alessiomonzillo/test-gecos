import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Whistleblowing – GE.CO.S. S.r.l.",
  description:
    "Canale di segnalazione Whistleblowing di GE.CO.S. S.r.l. ai sensi del D.Lgs. 24/2023. Protezione dei segnalanti e procedura di segnalazione.",
  robots: "noindex,nofollow",
};

export default async function WhistleblowingPage() {
  const t = await getTranslations("whistleblowing");

  const listItems = [
    t("section2Item1"),
    t("section2Item2"),
    t("section2Item3"),
    t("section2Item4"),
    t("section2Item5"),
    t("section2Item6"),
    t("section2Item7"),
  ];

  return (
    <>
      <Header />
      <main>
        <section className="py-16 bg-white">
          <div className="container-boxed">
            <div className="flex flex-col gap-12 max-w-3xl">
              {/* Title */}
              <h1 className="text-[36px] font-bold text-primary leading-tight">
                {t("title")}
              </h1>

              {/* Intro */}
              <div className="flex flex-col gap-2">
                <p className="text-xl font-normal text-primary-950 leading-snug">
                  {t("lead")}
                </p>
                <p className="text-lg font-light text-primary-950 leading-relaxed">
                  {t("body")}
                </p>
              </div>

              {/* Section 1 – Segnalazioni anonime */}
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-normal text-primary-950">
                  {t("section1Title")}
                </h2>
                <p className="text-lg font-light text-primary-950 leading-relaxed">
                  {t("section1Text")}
                </p>
              </div>

              {/* Section 2 – Informazioni richieste */}
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-normal text-primary-950">
                  {t("section2Title")}
                </h2>
                <div className="text-lg font-light text-primary-950 leading-relaxed">
                  <p className="mb-3">{t("section2Intro")}</p>
                  <ul className="list-disc pl-6 space-y-1">
                    {listItems.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Section 3 – Responsabilità */}
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-normal text-primary-950">
                  {t("section3Title")}
                </h2>
                <p className="text-lg font-light text-primary-950 leading-relaxed">
                  {t("section3Text")}
                </p>
              </div>

              {/* Section 4 – Tutela riservatezza */}
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-normal text-primary-950">
                  {t("section4Title")}
                </h2>
                <p className="text-lg font-light text-primary-950 leading-relaxed">
                  {t("section4Text")}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-10">
                <Link href="/it" className="btn-outline">
                  {t("ctaHome")}
                </Link>
                <a href="#" className="btn-accent">
                  {t("ctaDownload")}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
