import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Occhiello from "@/components/Occhiello";
import Partner from "@/components/Partner";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contattaci",
  description:
    "Contatta GE.CO.S. S.r.l. per informazioni sui nostri servizi o per richiedere un preventivo. Siamo a Pomezia (RM), tel. 069107142.",
  robots: "index,follow",
  alternates: { canonical: "https://gecospomezia.it/it/contatti" },
  openGraph: {
    title: "Contattaci | GE.CO.S. S.r.l.",
    description:
      "Richiedi un preventivo o informazioni. GE.CO.S. S.r.l. – Verde urbano e rurale a Pomezia (RM), tel. 069107142.",
    images: [
      {
        url: "/assets/photos/hero-bg.jpg",
        width: 1440,
        height: 717,
        alt: "Contatti GE.CO.S. S.r.l. – Pomezia",
      },
    ],
  },
};

const EMAILS = [
  "info@gecospomezia.it",
  "ufficiotecnico@gecospomezia.it",
  "amministrazione@gecospomezia.it",
  "sgi@gecospomezia.it",
  "gecos@pec.it",
];

const PHONES = ["069107142", "0691603098"];

export default async function ContattiPage() {
  const t = await getTranslations("contatti");
  const tp = await getTranslations("home.partner");

  return (
    <>
      <Header />
      <main>
        <section className="pt-12 pb-16 bg-white">
          <div className="container-boxed">
            <Occhiello label={t("occhiello")} className="mb-4" />
            <h1 className="text-3xl md:text-[40px] font-bold text-primary leading-tight mt-2">
              {t("title")}
            </h1>
            <p className="mt-3 text-base md:text-[17px] text-primary/80 max-w-3xl">
              {t("subtitle")}
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 md:gap-16">
              {/* Colonna sinistra: info contatti */}
              <div className="space-y-7">
                <div>
                  <p className="font-bold text-[15px] text-primary">
                    {t("sedeOperativa")}
                  </p>
                  <p className="text-[14px] text-primary/80 mt-1 leading-relaxed">
                    Via Monte d&apos;Oro n. 30 - Cap 00071
                    <br />
                    Pomezia (RM)
                  </p>
                </div>
                <div>
                  <p className="font-bold text-[15px] text-primary">
                    {t("sedeLegale")}
                  </p>
                  <p className="text-[14px] text-primary/80 mt-1 leading-relaxed">
                    Via Anchise n. 9 - Cap 00071
                    <br />
                    Pomezia (RM)
                  </p>
                </div>
                <div>
                  <p className="font-bold text-[15px] text-primary mb-3">
                    {t("profiliSocial")}
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-md  flex items-center justify-center text-white hover:bg-primary-dark transition-colors"
                      aria-label="Instagram"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M11.9962 0C8.73824 0 8.32971 0.0138095 7.05019 0.0721905C5.77333 0.130428 4.90129 0.333238 4.13824 0.629809C3.34938 0.936333 2.68038 1.34653 2.01343 2.01343C1.34652 2.68038 0.936333 3.34938 0.629809 4.13824C0.333238 4.90129 0.130429 5.77334 0.0721905 7.05019C0.0138095 8.32972 0 8.73824 0 11.9963C0 15.2542 0.0138095 15.6627 0.0721905 16.9423C0.130429 18.2191 0.333238 19.0912 0.629809 19.8542C0.936333 20.6431 1.34652 21.3121 2.01343 21.979C2.68038 22.6459 3.34938 23.0561 4.13824 23.3627C4.90129 23.6592 5.77333 23.862 7.05019 23.9203C8.32971 23.9786 8.73824 23.9924 11.9962 23.9924C15.2542 23.9924 15.6627 23.9786 16.9422 23.9203C18.2191 23.862 19.0911 23.6592 19.8542 23.3627C20.643 23.0561 21.312 22.6459 21.979 21.979C22.6459 21.3121 23.0561 20.6431 23.3627 19.8542C23.6592 19.0912 23.862 18.2191 23.9202 16.9423C23.9786 15.6627 23.9924 15.2542 23.9924 11.9963C23.9924 8.73824 23.9786 8.32972 23.9202 7.05019C23.862 5.77334 23.6592 4.90129 23.3627 4.13824C23.0561 3.34938 22.6459 2.68038 21.979 2.01343C21.312 1.34653 20.643 0.936333 19.8542 0.629809C19.0911 0.333238 18.2191 0.130428 16.9422 0.0721905C15.6627 0.0138095 15.2542 0 11.9962 0ZM7.99748 11.9963C7.99748 14.2047 9.78776 15.995 11.9962 15.995C14.2047 15.995 15.995 14.2047 15.995 11.9963C15.995 9.78776 14.2047 7.99748 11.9962 7.99748C9.78776 7.99748 7.99748 9.78776 7.99748 11.9963ZM5.836 11.9963C5.836 8.594 8.594 5.836 11.9962 5.836C15.3984 5.836 18.1564 8.594 18.1564 11.9963C18.1564 15.3984 15.3984 18.1564 11.9962 18.1564C8.594 18.1564 5.836 15.3984 5.836 11.9963ZM18.3998 7.03215C19.1949 7.03215 19.8394 6.38767 19.8394 5.59262C19.8394 4.79757 19.1949 4.15305 18.3998 4.15305C17.6048 4.15305 16.9603 4.79757 16.9603 5.59262C16.9603 6.38767 17.6048 7.03215 18.3998 7.03215Z" fill="#044E28"/>
                        </svg>
                    </a>
                    <a
                      href="https://www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-md  flex items-center justify-center text-white hover:bg-primary-dark transition-colors"
                      aria-label="Facebook"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.244 12.0736C23.2432 5.86287 18.2085 0.828125 11.997 0.828125C5.7855 0.828125 0.75 5.86363 0.75 12.0751C0.75 17.6664 4.83 22.3044 10.1745 23.1751L10.239 23.1841V15.3256H7.383V12.0736H10.239V9.59712C10.2247 9.47187 10.2172 9.32638 10.2172 9.17937C10.2172 6.98712 11.9947 5.20963 14.187 5.20963C14.2927 5.20963 14.3977 5.21412 14.502 5.22162L14.4885 5.22087C15.3877 5.23362 16.2577 5.31312 17.1067 5.45487L17.0063 5.44063V8.20813H15.5872C15.5227 8.19913 15.4485 8.19388 15.3735 8.19388C14.4757 8.19388 13.7475 8.92138 13.7475 9.81988C13.7475 9.87088 13.7497 9.92113 13.7542 9.97137L13.7535 9.96463V12.0736H16.8727L16.374 15.3256H13.7535V23.1841C19.1632 22.3036 23.2432 17.6649 23.244 12.0736Z" fill="#044E28"/>
                        </svg>
                    </a>
                  </div>
                </div>
                <div>
                  <p className="font-bold text-[13px] tracking-wider text-primary mb-2">
                    {t("telefono")}
                  </p>
                  <ul className="space-y-2">
                    {PHONES.map((p) => (
                      <li key={p} className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-primary">
                          call
                        </span>
                        <a
                          href={`tel:${p}`}
                          className="text-[14px] text-primary underline hover:no-underline"
                        >
                          {p}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-[13px] tracking-wider text-primary mb-2">
                    {t("email")}
                  </p>
                  <ul className="space-y-2">
                    {EMAILS.map((e) => (
                      <li key={e} className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-primary">
                          mail
                        </span>
                        <a
                          href={`mailto:${e}`}
                          className="text-[14px] text-primary underline hover:no-underline break-all"
                        >
                          {e}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Colonna destra: form */}
              <div>
                <ContactForm />
              </div>
            </div>

            {/* Mappa */}
            <div className="mt-12 relative w-full aspect-[1152/381] overflow-hidden bg-gray-100">
              <Image
                src="/assets/photos/map-pomezia.jpg"
                alt={t("mapTitle")}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1152px"
              />
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
