"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "../lib/site-content";

type SiteHeaderProps = {
  settings: Pick<SiteSettings, "business_name" | "phone" | "whatsapp_number">;
  currentPath: "/" | "/blog";
};

const navItems = [
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Neden Biz", href: "#nedenbiz" },
  { label: "Çalışma Alanları", href: "#calisma" },
  { label: "Blog", href: "/blog" },
  { label: "Yorumlar", href: "#yorumlar" },
  { label: "İletişim", href: "#iletisim" },
];

export function SiteHeader({ settings, currentPath }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const whatsappHref = `https://wa.me/${settings.whatsapp_number.replace(/\D/g, "")}`;

  function getNavHref(href: string) {
    return href.startsWith("#") && currentPath !== "/" ? `/${href}` : href;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-sky-900/10 bg-white/90 shadow-[0_8px_24px_rgba(16,42,67,0.1)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-5 py-3 lg:px-8">
        <div className="hidden items-center justify-between gap-4 md:flex">
          <Link href="/" className="group flex min-w-[180px] items-center gap-3" aria-label={`${settings.business_name} ana sayfa`}>
            <Image
              src="/logo.png"
              alt={settings.business_name}
              width={1476}
              height={1066}
              unoptimized
              className="h-auto w-[60px] object-contain transition duration-300 group-hover:scale-105"
            />
            <div>
              <div className="text-xl font-black tracking-tight text-slate-900">{settings.business_name}</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500">Elektrik &amp; Tesisat</div>
            </div>
          </Link>

          <nav className="flex flex-1 items-center justify-center gap-2 text-sm text-slate-700" aria-label="Ana menü">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={getNavHref(item.href)}
                aria-current={currentPath === "/blog" && item.href === "/blog" ? "page" : undefined}
                className="group relative rounded-full border border-sky-900/15 bg-white px-4 py-2 text-slate-700 shadow-[0_4px_14px_rgba(16,42,67,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-sky-600/50 hover:bg-sky-50 hover:text-sky-800 hover:shadow-[0_8px_20px_rgba(63,159,197,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/80"
              >
                {item.label}
                <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-sky-600 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex min-w-[180px] items-center justify-end gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full border border-green-600 bg-green-600 px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_22px_rgba(22,163,74,0.25)] transition duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-[0_12px_30px_rgba(22,163,74,0.4)] active:translate-y-0"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 md:hidden">
          <Link href="/" className="flex items-center gap-3" aria-label={`${settings.business_name} ana sayfa`}>
            <Image
              src="/logo.png"
              alt={settings.business_name}
              width={1476}
              height={1066}
              unoptimized
              className="h-auto w-[60px] object-contain"
            />
            <div>
              <div className="text-xl font-black tracking-tight text-slate-900">{settings.business_name}</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500">Elektrik &amp; Tesisat</div>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full border border-green-600 bg-green-600 px-3 py-2 text-xs font-bold text-white shadow-[0_8px_20px_rgba(22,163,74,0.25)] transition duration-300 hover:-translate-y-0.5 hover:bg-green-700 sm:px-4 sm:text-sm"
            >
              WhatsApp
            </a>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sky-900/15 bg-sky-50 text-sky-800 shadow-[0_6px_18px_rgba(16,42,67,0.12)] transition duration-300 hover:border-sky-500/50 hover:bg-sky-100"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label="Mobil menü"
            >
              <span className="flex flex-col items-center justify-center gap-1.5">
                <span className={`block h-0.5 w-5 rounded-full bg-current transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
                <span className={`block h-0.5 w-5 rounded-full bg-current transition-opacity ${menuOpen ? "opacity-0" : "opacity-100"}`} />
                <span className={`block h-0.5 w-5 rounded-full bg-current transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>

        <div className={`md:hidden ${menuOpen ? "mt-3 block" : "hidden"}`}>
          <nav className="flex flex-col gap-2 rounded-2xl border border-sky-900/10 bg-white p-3 shadow-[0_18px_40px_rgba(16,42,67,0.15)]" aria-label="Mobil menü">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={getNavHref(item.href)}
                aria-current={currentPath === "/blog" && item.href === "/blog" ? "page" : undefined}
                className="rounded-xl border border-sky-900/15 bg-sky-50 px-3 py-2 text-sm font-medium text-slate-700 shadow-[0_4px_12px_rgba(16,42,67,0.08)] transition hover:border-sky-500/60 hover:bg-sky-100 hover:text-sky-800 hover:shadow-[0_8px_18px_rgba(63,159,197,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/80"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
