import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Richiesta inviata",
  description: "La tua richiesta è stata inviata con successo. Ti ricontatteremo al più presto.",
  robots: "noindex,nofollow",
};

export default async function ConfermaPage() {
  const t = await getTranslations("conferma");

  return (
    <>
      <Header />
      <main>
        <section className="pt-16 pb-32 bg-white">
          <div className="container-boxed max-w-4xl">
            <h1 className="text-3xl md:text-[40px] font-bold text-primary leading-tight">
              {t("title")}
            </h1>
            <div className="mt-10 space-y-2">
              <p className="text-[17px] font-bold text-primary">
                {t("text1")}
              </p>
              <p className="text-[15px] md:text-base text-primary/80 leading-relaxed max-w-2xl">
                {t("text2")}
              </p>
            </div>
            <div className="mt-10">
              <Link href="/it" className="btn-outline px-8 py-4">
                {t("cta")}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
