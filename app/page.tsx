"use client";

import { useState } from "react";

const services = [
  {
    title: "Elektrik Arıza & Onarım",
    text: "Aniden kesilen enerji, kısa devre ve arıza sorunlarında hızlı ve güvenli müdahale.",
  },
  {
    title: "Tesisat & Kurulum",
    text: "Yeni ev, iş yeri veya ofis için sağlıklı ve doğru elektrik tesisatı çözümleri.",
  },
  {
    title: "Pano & Sigorta",
    text: "Pano bakımı, sigorta değişimi ve güvenli güç dağıtımı hizmetleri.",
  },
  {
    title: "Aydınlatma",
    text: "Modern, verimli ve estetik aydınlatma sistemleriyle mekanlarınızı güçlendirin.",
  },
  {
    title: "Bakım & Denetim",
    text: "Düzenli bakım ile enerji kaybını azaltır, güvenliği artırır ve arızaları önler.",
  },
  {
    title: "Acil Hizmet",
    text: "Günün her saati, acil elektrik sorunlarında profesyonel destek ve hızlı müdahale.",
  },
];

const reasons = [
  "15+ yıllık iş tecrübesi",
  "Güvenli ve standartlara uygun işçilik",
  "Uygun fiyat garantisi",
  "Hızlı müdahale ve acil servis",
  "Konut, ticaret ve sanayi çözümleri",
  "Müşteri memnuniyeti odaklı yaklaşım",
];

const stats = [
  { value: "1500+", label: "Tamamlanan iş" },
  { value: "24/7", label: "Acil çağrı desteği" },
  { value: "98%", label: "Tekrar eden müşteri" },
  { value: "15 Yıl", label: "Tecrübe" },
];

const works = ["Konut", "Ofis", "Ticaret", "Sanayi", "Villa", "İşyeri"];

const reviews = [
  {
    name: "Ayşe K.",
    text: "Elektrik arızası anında çok hızlı müdahale ettiler. Profesyonel ve temiz çalıştılar.",
  },
  {
    name: "Mehmet T.",
    text: "Panosunu yenilediler, güvenli ve düzenli bir iş yaptılar. Tavsiye ederim.",
  },
  {
    name: "Cem Y.",
    text: "Aydınlatma ve tesisat işinde çok memnun kaldım. İşlerini titizlikle yapıyorlar.",
  },
];

const navItems = [
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Neden Biz", href: "#nedenbiz" },
  { label: "Çalışma Alanları", href: "#calisma" },
  { label: "Yorumlar", href: "#yorumlar" },
  { label: "İletişim", href: "#iletisim" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="bg-[var(--background)] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--background)]/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-5 py-4 lg:px-8">
          <div className="hidden items-center justify-between gap-4 md:flex">
            <div className="flex min-w-[180px] items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 text-lg font-black text-slate-900 shadow-[0_0_24px_rgba(105,175,208,0.45)]">
                K
              </div>
              <div>
                <div className="text-xl font-black tracking-tight">Kablomix</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400">
                  Elektrik & Tesisat
                </div>
              </div>
            </div>

            <nav className="flex flex-1 items-center justify-center gap-7 text-sm text-slate-300">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="transition hover:text-yellow-400">
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex min-w-[180px] items-center justify-end gap-3">
              <a
                href="https://wa.me/905413219801"
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-slate-900 transition hover:scale-[1.02] hover:bg-yellow-300"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 md:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 text-lg font-black text-slate-900 shadow-[0_0_24px_rgba(105,175,208,0.45)]">
                K
              </div>
              <div>
                <div className="text-xl font-black tracking-tight">Kablomix</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400">
                  Elektrik & Tesisat
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-label="Mobil menü"
              >
                <span className="flex flex-col items-center justify-center gap-1.5">
                  <span
                    className={`block h-0.5 w-5 rounded-full bg-current transition-transform ${
                      menuOpen ? "translate-y-2 rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-5 rounded-full bg-current transition-opacity ${
                      menuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-5 rounded-full bg-current transition-transform ${
                      menuOpen ? "-translate-y-2 -rotate-45" : ""
                    }`}
                  />
                </span>
              </button>
              <a
                href="https://wa.me/905413219801"
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full bg-yellow-400 px-3 py-2 text-xs font-bold text-slate-900 transition hover:scale-[1.02] hover:bg-yellow-300 sm:px-4 sm:text-sm"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <div className={`md:hidden ${menuOpen ? "mt-3 block" : "hidden"}`}>
            <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-slate-900/80 p-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-200"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(199,228,241,0.32),_transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(105,175,208,0.2),_transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-28">
          <div className="flex flex-col justify-center">
            <span className="mb-5 inline-flex w-fit items-center rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-300">
              Acil elektrik servisleri
            </span>

            <h1 className="max-w-xl text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
              Güvenli elektrik çözümleri <span className="text-yellow-400">hızlıca</span> yanınızda.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Kablomix, ev, iş yeri ve sanayi alanlarında elektrik arıza, tesisat, bakım ve
              güvenli kurulum hizmetlerini modern yaklaşım ve profesyonel ekip anlayışıyla sunar.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="tel:+905413219801"
                className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-7 py-4 text-base font-bold text-slate-900 transition hover:bg-yellow-300"
              >
                0541 321 98 01
              </a>
              <a
                href="#iletisim"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-4 text-base font-semibold text-white transition hover:border-yellow-400/60 hover:text-yellow-300"
              >
                Ücretsiz Teklif Al
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-5 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                7/24 Acil servis
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                Uygun fiyat
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                Güvenli işçilik
              </span>
            </div>
          </div>

          <div className="relative mt-6 sm:mt-0">
            <div className="relative z-10 rounded-[28px] border border-white/10 bg-slate-900/60 p-5 shadow-[0_30px_80px_rgba(4,9,18,0.8)] backdrop-blur">
              <div className="rounded-[22px] border border-yellow-400/20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.25em] text-slate-400">
                      Kablomix
                    </div>
                    <div className="mt-2 text-2xl font-black">Elektrik Gücü</div>
                  </div>
                  <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-300">
                    Çalışıyor
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Güç Durumu</span>
                      <span className="text-emerald-400">Normal</span>
                    </div>
                    <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-800">
                      <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-yellow-400 to-amber-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                      <div className="text-slate-400">Acil çağrı</div>
                      <div className="mt-3 text-3xl font-black text-yellow-400">15 dk</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                      <div className="text-slate-400">Bakım</div>
                      <div className="mt-3 text-3xl font-black text-yellow-400">365</div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-yellow-300">
                      Hizmet alanı
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {works.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-yellow-400/40 bg-slate-900/50 px-3 py-1 text-xs font-medium text-yellow-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 shadow-xl sm:block">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Müşteri memnuniyeti</div>
              <div className="mt-2 text-2xl font-black text-yellow-400">4.9/5</div>
            </div>
          </div>
        </div>
      </section>

      <section id="hizmetler" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
            Hizmetlerimiz
          </div>
          <h2 className="mt-4 text-3xl font-black text-white md:text-5xl">
            Her elektrik ihtiyacınıza çözüm üretiriz.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-[26px] border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-6 transition hover:-translate-y-1 hover:border-yellow-400/50 hover:shadow-[0_20px_50px_rgba(105,175,208,0.22)]"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 text-xl font-black text-slate-900">
                ⚡
              </div>
              <h3 className="text-2xl font-bold text-white">{service.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-300">{service.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="nedenbiz" className="bg-slate-950/80 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
                Neden Kablomix?
              </div>
              <h2 className="mt-4 text-3xl font-black text-white md:text-5xl">
                Güvenilir ekip, temiz işçilik ve güçlü sonuç.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                Kablomix, teknik bilgi, güvenlik bilinci ve müşteri odaklı yaklaşımı birleştirerek
                işinizi kısa sürede ve doğru şekilde tamamlar.
              </p>

              <div className="mt-8 space-y-4">
                {reasons.map((reason) => (
                  <div key={reason} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-sm font-black text-slate-900">
                      ✓
                    </span>
                    <span className="text-base font-medium text-slate-200">{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-[24px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6">
                  <div className="text-4xl font-black text-yellow-400">{stat.value}</div>
                  <div className="mt-3 text-base text-slate-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="calisma" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
            Çalışma alanları
          </div>
          <h2 className="mt-4 text-3xl font-black text-white md:text-5xl">
            Farklı alanlarda güvenli elektrik çözümleri.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[
            { title: "Konut", text: "Evlerinizde güvenli ve verimli elektrik sistemi kurulumları." },
            { title: "Ofis", text: "Ofisler için düzenli, güvenli ve verimli enerji dağıtımı." },
            { title: "Ticaret", text: "Mağaza, dükkan ve iş yeri elektrik ihtiyaçları için uygun çözümler." },
            { title: "Sanayi", text: "Yüksek dayanıklılık ve güvenlik önceliğiyle sanayi elektrik çalışmaları." },
            { title: "Villa", text: "Özel yaşam alanları için estetik ve güvenli elektrik tasarımları." },
            { title: "Acil Arıza", text: "Ani elektrik sorunlarında profesyonel ve hızlı müdahale." },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[26px] border border-white/10 bg-slate-900 p-6"
            >
              <div className="mb-4 text-2xl font-black text-yellow-400">{item.title}</div>
              <p className="text-base leading-7 text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="yorumlar" className="bg-slate-950/90 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
              Referanslar
            </div>
            <h2 className="mt-4 text-3xl font-black text-white md:text-5xl">
              Müşterilerimiz Kablomix’i tercih ediyor.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {reviews.map((review) => (
              <div key={review.name} className="rounded-[26px] border border-white/10 bg-slate-900 p-6">
                <div className="mb-4 flex gap-1 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span key={idx}>★</span>
                  ))}
                </div>
                <p className="text-base leading-7 text-slate-200">“{review.text}”</p>
                <div className="mt-6 border-t border-white/10 pt-4 text-lg font-bold text-white">
                  {review.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="iletisim" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="rounded-[30px] border border-yellow-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 md:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
                İletişim
              </div>
              <h2 className="mt-4 text-3xl font-black text-white md:text-5xl">
                Elektrik sorununuza hızlı çözüm için bugün ulaşın.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
                Ücretsiz keşif, fiyat teklifi ve acil müdahale için bizimle iletişime geçin.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-slate-900 font-black">
                    ☎
                  </span>
                  <a href="tel:+905551234567" className="text-lg font-semibold text-white hover:text-yellow-300">
                    0555 123 45 67
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-slate-900 font-black">
                    ✉
                  </span>
                  <a href="mailto:info@kablomix.com" className="text-lg font-semibold text-white hover:text-yellow-300">
                    info@kablomix.com
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-slate-900 font-black">
                    📍
                  </span>
                  <span className="text-lg font-semibold text-white">İstanbul / Türkiye</span>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-slate-950 p-6">
              <div className="text-xl font-black text-white">İletişim Formu</div>
              <div className="mt-6 space-y-4">
                <input
                  type="text"
                  placeholder="Adınız Soyadınız"
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-400 outline-none ring-0"
                />
                <input
                  type="tel"
                  placeholder="Telefon Numaranız"
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-400 outline-none ring-0"
                />
                <textarea
                  placeholder="İşinizin detayını yazın"
                  rows={4}
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-400 outline-none ring-0"
                />
                <button className="w-full rounded-full bg-yellow-400 px-6 py-3 text-base font-bold text-slate-900 transition hover:bg-yellow-300">
                  Teklif İste
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#050d18]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="text-lg font-black text-white">Kablomix</div>
          <div>© 2026 Kablomix. Tüm hakları saklıdır.</div>
          <div>Elektrik & Tesisat Hizmetleri</div>
        </div>
      </footer>
    </main>
  );
}
