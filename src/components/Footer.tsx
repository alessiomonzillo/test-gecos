import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

const NAV_LINKS = [
  { key: "home", href: "/it" },
  { key: "chiSiamo", href: "/it/chi-siamo" },
  { key: "servizi", href: "/it/servizi" },
  { key: "certificazioni", href: "/it/certificazioni" },
  { key: "faqs", href: "/it/faqs" },
  { key: "contatti", href: "/it/contatti" },
];

const EMAILS = [
  "info@gecospomezia.it",
  "ufficiotecnico@gecospomezia.it",
  "amministrazione@gecospomezia.it",
  "sgi@gecospomezia.it",
  "gecos@pec.it",
];

const PHONES = ["069107142", "0691603098"];

export default function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");

  return (
    <footer className="bg-white pt-12">
      <div className="container-boxed">
        {/* Top row: logo + divider + tagline */}
        <div className="flex items-center gap-6 mb-12">
          <Image
            src="/assets/logo-gecos.png"
            alt="GE.CO.S. S.r.l."
            width={171}
            height={54}
            className="h-[54px] w-[171px]"
          />
          <div className="w-px h-[42px] bg-gray-200" />
          <span className="text-base text-primary font-normal">
            {t("tagline")}
          </span>
        </div>

        {/* Main grid: addresses+social | emails | phone + whistleblowing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-12">
          {/* Col 1: addresses + social */}
          <div>
            <div className="mb-5">
              <p className="font-bold text-sm text-primary leading-6">
                {t("sedeOperativa")}
              </p>
              <p className="text-sm text-primary leading-6">
                Via Monte d&apos;Oro n. 30 - Cap 00071
                <br />
                Pomezia (RM)
              </p>
            </div>
            <div className="mb-6">
              <p className="font-bold text-sm text-primary leading-6">
                {t("sedeLegale")}
              </p>
              <p className="text-sm text-primary leading-6">
                Via Anchise n. 9 - Cap 00071
                <br />
                Pomezia (RM)
              </p>
            </div>
            <div>
              <p className="font-bold text-sm text-primary mb-3 leading-6">
                {t("profiliSocial")}
              </p>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 rounded-full  flex items-center justify-center text-white"
                  aria-label="Instagram"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9962 0C8.73824 0 8.32971 0.0138095 7.05019 0.0721905C5.77333 0.130428 4.90129 0.333238 4.13824 0.629809C3.34938 0.936333 2.68038 1.34653 2.01343 2.01343C1.34652 2.68038 0.936333 3.34938 0.629809 4.13824C0.333238 4.90129 0.130429 5.77334 0.0721905 7.05019C0.0138095 8.32972 0 8.73824 0 11.9963C0 15.2542 0.0138095 15.6627 0.0721905 16.9423C0.130429 18.2191 0.333238 19.0912 0.629809 19.8542C0.936333 20.6431 1.34652 21.3121 2.01343 21.979C2.68038 22.6459 3.34938 23.0561 4.13824 23.3627C4.90129 23.6592 5.77333 23.862 7.05019 23.9203C8.32971 23.9786 8.73824 23.9924 11.9962 23.9924C15.2542 23.9924 15.6627 23.9786 16.9422 23.9203C18.2191 23.862 19.0911 23.6592 19.8542 23.3627C20.643 23.0561 21.312 22.6459 21.979 21.979C22.6459 21.3121 23.0561 20.6431 23.3627 19.8542C23.6592 19.0912 23.862 18.2191 23.9202 16.9423C23.9786 15.6627 23.9924 15.2542 23.9924 11.9963C23.9924 8.73824 23.9786 8.32972 23.9202 7.05019C23.862 5.77334 23.6592 4.90129 23.3627 4.13824C23.0561 3.34938 22.6459 2.68038 21.979 2.01343C21.312 1.34653 20.643 0.936333 19.8542 0.629809C19.0911 0.333238 18.2191 0.130428 16.9422 0.0721905C15.6627 0.0138095 15.2542 0 11.9962 0ZM7.99748 11.9963C7.99748 14.2047 9.78776 15.995 11.9962 15.995C14.2047 15.995 15.995 14.2047 15.995 11.9963C15.995 9.78776 14.2047 7.99748 11.9962 7.99748C9.78776 7.99748 7.99748 9.78776 7.99748 11.9963ZM5.836 11.9963C5.836 8.594 8.594 5.836 11.9962 5.836C15.3984 5.836 18.1564 8.594 18.1564 11.9963C18.1564 15.3984 15.3984 18.1564 11.9962 18.1564C8.594 18.1564 5.836 15.3984 5.836 11.9963ZM18.3998 7.03215C19.1949 7.03215 19.8394 6.38767 19.8394 5.59262C19.8394 4.79757 19.1949 4.15305 18.3998 4.15305C17.6048 4.15305 16.9603 4.79757 16.9603 5.59262C16.9603 6.38767 17.6048 7.03215 18.3998 7.03215Z" fill="#044E28"/>
                    </svg>
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 rounded-full  flex items-center justify-center text-white"
                  aria-label="Facebook"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.244 12.0736C23.2432 5.86287 18.2085 0.828125 11.997 0.828125C5.7855 0.828125 0.75 5.86363 0.75 12.0751C0.75 17.6664 4.83 22.3044 10.1745 23.1751L10.239 23.1841V15.3256H7.383V12.0736H10.239V9.59712C10.2247 9.47187 10.2172 9.32638 10.2172 9.17937C10.2172 6.98712 11.9947 5.20963 14.187 5.20963C14.2927 5.20963 14.3977 5.21412 14.502 5.22162L14.4885 5.22087C15.3877 5.23362 16.2577 5.31312 17.1067 5.45487L17.0063 5.44063V8.20813H15.5872C15.5227 8.19913 15.4485 8.19388 15.3735 8.19388C14.4757 8.19388 13.7475 8.92138 13.7475 9.81988C13.7475 9.87088 13.7497 9.92113 13.7542 9.97137L13.7535 9.96463V12.0736H16.8727L16.374 15.3256H13.7535V23.1841C19.1632 22.3036 23.2432 17.6649 23.244 12.0736Z" fill="#044E28"/>
                    </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: emails */}
          <div>
            <p className="font-bold text-sm text-primary mb-4 tracking-[0.04em] leading-6">
              {t("email")}
            </p>
            <ul className="space-y-3">
              {EMAILS.map((email) => (
                <li key={email} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    mail
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="text-sm text-primary underline hover:no-underline leading-6"
                  >
                    {email}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: phone + whistleblowing */}
          <div>
            <p className="font-bold text-sm text-primary mb-4 tracking-[0.04em] leading-6">
              {t("telefono")}
            </p>
            <ul className="space-y-3 mb-8">
              {PHONES.map((phone) => (
                <li key={phone} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    call
                  </span>
                  <a
                    href={`tel:${phone}`}
                    className="text-sm text-primary underline hover:no-underline leading-6"
                  >
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-[18px] text-warning">
                  info
                </span>
                <span className="font-bold text-sm text-warning uppercase tracking-[0.04em] leading-6">
                  {t("whistleblowing")}
                </span>
              </div>
              <a
                href="#"
                className="text-sm text-primary underline hover:no-underline leading-6"
              >
                {t("scaricaModulo")}
              </a>
            </div>
          </div>
        </div>

        {/* Nav links row */}
        <nav className="py-6">
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-3">
            {NAV_LINKS.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href}
                  className="text-sm font-bold uppercase text-primary underline hover:no-underline tracking-[0.04em]"
                >
                  {tn(key as "home")}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100 py-5 mt-8">
        <div className="container-boxed flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <p className="text-xs text-primary">{t("copyright")}</p>
          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/it/privacy-policy"
              className="text-primary underline hover:no-underline"
            >
              {t("privacyPolicy")}
            </Link>
            <span className="text-gray-200">|</span>
            <Link
              href="/it/cookie-policy"
              className="text-primary underline hover:no-underline"
            >
              {t("cookiePolicy")}
            </Link>
            <span className="text-gray-200">|</span>
            <Link
              href="#"
              className="text-primary underline hover:no-underline"
            >
              {t("whistleblowingLink")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
