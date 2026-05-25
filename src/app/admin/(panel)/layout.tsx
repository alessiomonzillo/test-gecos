import Link from "next/link";

const NAV_ITEMS = [
  { href: "/admin/services", label: "Servizi" },
  { href: "/admin/seo", label: "SEO Pagine" },
];

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-primary text-white flex flex-col">
        <div className="px-5 py-6 border-b border-white/10">
          <span className="block text-xs font-bold tracking-widest text-secondary uppercase mb-1">
            ADMIN PANEL
          </span>
          <span className="block text-lg font-bold text-white leading-tight">
            GE.CO.S.
          </span>
        </div>

        <nav className="flex-1 py-4">
          <ul className="space-y-0.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center px-5 py-3 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-5 py-4 border-t border-white/10">
          <Link
            href="/it"
            className="block text-xs text-white/50 hover:text-white/80 transition-colors"
          >
            ← Vai al sito
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
