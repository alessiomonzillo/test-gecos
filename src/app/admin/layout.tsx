import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

/**
 * Root layout per tutta l'area /admin (include login).
 * Fornisce solo html/body + font.
 * La sidebar è nel layout (panel)/layout.tsx che avvolge solo le pagine protette.
 * L'autenticazione è gestita dal middleware (src/middleware.ts).
 */
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={inter.variable}>
      <head>
        <title>Admin | GE.CO.S.</title>
      </head>
      <body className="bg-gray-50 text-primary">
        {children}
      </body>
    </html>
  );
}
