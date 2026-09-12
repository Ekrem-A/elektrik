"use client";

import { useEffect, useState } from "react";

const services = [
  {
    title: "Elektrik Arıza & Onarım",
    icon: "⚡",
    image: "/arıza.jpg",
    text: "Aniden kesilen enerji, kısa devre ve arıza sorunlarında hızlı ve güvenli müdahale.",
  },
  {
    title: "Tesisat & Kurulum",
    icon: "⌂",
    image: "/tesisat.jpg",
    text: "Yeni ev, iş yeri veya ofis için sağlıklı ve doğru elektrik tesisatı çözümleri.",
  },
  {
    title: "Pano & Sigorta",
    icon: "▦",
    image: "/pano.jpg",
    text: "Pano bakımı, sigorta değişimi ve güvenli güç dağıtımı hizmetleri.",
  },
  {
    title: "Aydınlatma",
    icon: "☼",
    text: "Modern, verimli ve estetik aydınlatma sistemleriyle mekanlarınızı güçlendirin.",
  },
  {
    title: "Bakım & Denetim",
    icon: "✓",
    text: "Düzenli bakım ile enerji kaybını azaltır, güvenliği artırır ve arızaları önler.",
  },
  {
    title: "Acil Hizmet",
    icon: "!",
    text: "Günün her saati, acil elektrik sorunlarında profesyonel destek ve hızlı müdahale.",
  },
  {
    title: "Kamera Sistemleri",
    icon: "◉",
    text: "Ev, iş yeri ve site güvenliği için profesyonel kamera kurulumu ve izleme çözümleri.",
  },
  {
    title: "Turnike Geçiş Sistemleri",
    icon: "⇥",
    text: "Personel ve ziyaretçi geçişlerini düzenleyen güvenli turnike sistemleri.",
  },
  {
    title: "Alarm Sistemleri",
    icon: "♢",
    text: "Hırsızlık, acil durum ve izinsiz girişlere karşı hızlı uyarı ve alarm çözümleri.",
  },
  {
    title: "Kartlı Geçiş Sistemleri",
    icon: "▣",
    text: "Yetkili kişilere özel, kontrollü ve kayıtlı kartlı geçiş uygulamaları.",
  },
  {
    title: "Yangın Algılama Sistemleri",
    icon: "♨",
    text: "Duman ve yangın risklerini erken tespit eden güvenilir algılama sistemleri.",
  },
  {
    title: "Bariyer Sistemleri",
    icon: "╋",
    text: "Otopark, site ve işletme girişleri için otomatik bariyer ve kontrol çözümleri.",
  },
  {
    title: "Asansör Kamerası",
    icon: "▥",
    text: "Asansör içi güvenlik ve uzaktan izleme için kompakt kamera sistemleri.",
  },
  {
    title: "HGS Geçiş Sistemleri",
    icon: "≫",
    text: "Araç giriş çıkışlarını hızlandıran ve kayıt altına alan HGS geçiş çözümleri.",
  },
];

const reasons = [
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
];

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

const istanbulDistricts = [
  "Adalar",
  "Arnavutköy",
  "Ataşehir",
  "Avcılar",
  "Bağcılar",
  "Bahçelievler",
  "Bakırköy",
  "Başakşehir",
  "Bayrampaşa",
  "Beşiktaş",
  "Beykoz",
  "Beylikdüzü",
  "Beyoğlu",
  "Büyükçekmece",
  "Çatalca",
  "Çekmeköy",
  "Esenler",
  "Esenyurt",
  "Eyüpsultan",
  "Fatih",
  "Gaziosmanpaşa",
  "Güngören",
  "Kadıköy",
  "Kartal",
  "Kağıthane",
  "Küçükçekmece",
  "Maltepe",
  "Pendik",
  "Sancaktepe",
  "Sarıyer",
  "Silivri",
  "Sultanbeyli",
  "Sultangazi",
  "Şile",
  "Şişli",
  "Tuzla",
  "Ümraniye",
  "Üsküdar",
  "Zeytinburnu",
];

const topSlides = [
  { image: "/slayt1.png", label: "Profesyonel elektrik çözümleri" },
  { image: "/istanbul-bosphorus.jpg", label: "Tüm İstanbul'a hizmet" },
  { image: "/pano.jpg", label: "Güvenli pano ve tesisat uygulamaları" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTopSlide, setActiveTopSlide] = useState(0);

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setActiveTopSlide((current) => (current + 1) % topSlides.length);
    }, 4500);

    return () => window.clearInterval(slideTimer);
  }, []);

  return (
    <main className="bg-[var(--background)] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-sky-900/10 bg-white/90 shadow-[0_8px_24px_rgba(16,42,67,0.1)] backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-5 py-3 lg:px-8">
          <div className="hidden items-center justify-between gap-4 md:flex">
            <div className="group flex min-w-[180px] items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-yellow-200/50 bg-gradient-to-br from-yellow-200 via-yellow-400 to-amber-500 text-lg font-black text-slate-900 shadow-[0_0_24px_rgba(199,228,241,0.35)] transition duration-300 group-hover:rotate-3 group-hover:scale-105 group-hover:shadow-[0_0_32px_rgba(199,228,241,0.55)]">
                K
              </div>
              <div>
                <div className="text-xl font-black tracking-tight text-slate-900">Kablomix</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                  Elektrik & Tesisat
                </div>
              </div>
            </div>

            <nav className="flex flex-1 items-center justify-center gap-2 text-sm text-slate-700">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group relative rounded-full border border-sky-900/15 bg-white px-4 py-2 text-slate-700 shadow-[0_4px_14px_rgba(16,42,67,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-sky-600/50 hover:bg-sky-50 hover:text-sky-800 hover:shadow-[0_8px_20px_rgba(63,159,197,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/80"
                >
                  {item.label}
                  <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-sky-600 transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              ))}
            </nav>

            <div className="flex min-w-[180px] items-center justify-end gap-3">
              <a
                href="https://wa.me/905413219801"
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-green-600 bg-green-600 px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_22px_rgba(22,163,74,0.25)] transition duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-[0_12px_30px_rgba(22,163,74,0.4)] active:translate-y-0"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 md:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-yellow-200/50 bg-gradient-to-br from-yellow-200 via-yellow-400 to-amber-500 text-lg font-black text-slate-900 shadow-[0_0_24px_rgba(199,228,241,0.35)]">
                K
              </div>
              <div>
                <div className="text-xl font-black tracking-tight text-slate-900">Kablomix</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                  Elektrik & Tesisat
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="https://wa.me/905413219801"
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
            </div>
          </div>

          <div className={`md:hidden ${menuOpen ? "mt-3 block" : "hidden"}`}>
            <div className="flex flex-col gap-2 rounded-2xl border border-sky-900/10 bg-white p-3 shadow-[0_18px_40px_rgba(16,42,67,0.15)]">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-sky-900/15 bg-sky-50 px-3 py-2 text-sm font-medium text-slate-700 shadow-[0_4px_12px_rgba(16,42,67,0.08)] transition hover:border-sky-500/60 hover:bg-sky-100 hover:text-sky-800 hover:shadow-[0_8px_18px_rgba(63,159,197,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/80"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

        </div>
      </header>

      <section className="relative h-52 overflow-hidden bg-[#123d59] sm:h-64 lg:h-72" aria-label="Öne çıkan görseller">
        {topSlides.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out ${
              activeTopSlide === index ? "scale-100 opacity-100" : "scale-105 opacity-0"
            }`}
            style={{ backgroundImage: `url('${slide.image}')` }}
          >
            <div className="absolute inset-0 bg-[#082f49]/55" />
          </div>
        ))}
        <div className="relative mx-auto flex h-full max-w-7xl items-end justify-between px-5 pb-6 lg:px-8">
          <div className="max-w-md text-white">
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-sky-200">
              Kablomix
            </div>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl">{topSlides[activeTopSlide].label}</h2>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-2 backdrop-blur">
            {topSlides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                aria-label={`${index + 1}. slider görselini göster`}
                aria-pressed={activeTopSlide === index}
                onClick={() => setActiveTopSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeTopSlide === index ? "w-8 bg-white" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(199,228,241,0.55),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(145,199,223,0.22),_transparent_35%)]" />
        <div
          aria-hidden="true"
          className="hero-bosphorus-background absolute inset-0 w-full"
          style={{ backgroundImage: "url('/istanbul-bosphorus.jpg')" }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-28">
          <div className="flex max-w-2xl flex-col justify-center">
            <span className="mb-5 inline-flex w-fit items-center rounded-full border border-sky-600/25 bg-sky-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-800">
              Acil elektrik servisleri
            </span>

            <h1 className="max-w-xl text-4xl font-black leading-tight tracking-tight text-slate-900 md:text-6xl">
              Güvenli elektrik çözümleri <span className="text-sky-700">hızlıca</span> yanınızda.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Kablomix, ev, iş yeri ve sanayi alanlarında elektrik arıza, tesisat, bakım ve
              güvenli kurulum hizmetlerini modern yaklaşım ve profesyonel ekip anlayışıyla sunar.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="tel:+905413219801"
                className="inline-flex items-center justify-center rounded-full bg-sky-700 px-7 py-4 text-base font-bold text-white shadow-[0_10px_25px_rgba(29,111,150,0.25)] transition hover:bg-sky-800"
              >
                0541 321 98 01
              </a>
              <a
                href="#iletisim"
                className="inline-flex items-center justify-center rounded-full border border-sky-700/30 bg-sky-50 px-7 py-4 text-base font-semibold text-sky-800 transition hover:border-sky-700 hover:bg-sky-100"
              >
                Ücretsiz Teklif Al
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-5 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                7/24 Acil servis
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Uygun fiyat
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Güvenli işçilik
              </span>
            </div>
          </div>

          <aside className="rounded-[24px] border border-white/70 bg-white/75 p-6 shadow-[0_20px_50px_rgba(16,42,67,0.14)] backdrop-blur-md lg:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-sky-700">
                  Hizmet bölgemiz
                </div>
                <h2 className="mt-3 text-2xl font-black text-slate-900 md:text-3xl">
                  İstanbul geneli
                </h2>
              </div>
              <span className="rounded-full bg-sky-700 px-3 py-1.5 text-xs font-black text-white shadow-[0_8px_18px_rgba(29,111,150,0.22)]">
                39 ilçe
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              İstanbul&apos;un tüm ilçelerinde hızlı, güvenli ve profesyonel elektrik hizmeti.
            </p>
            <div className="mt-6 grid max-h-72 grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-3">
              {istanbulDistricts.map((district, index) => (
                <div
                  key={district}
                  className="group flex items-center gap-2 rounded-xl border border-sky-900/10 bg-white/80 px-3 py-3 text-sm font-semibold text-slate-700 shadow-[0_5px_14px_rgba(16,42,67,0.06)] transition hover:-translate-y-0.5 hover:border-sky-500/40 hover:bg-sky-50 hover:text-sky-800"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-[10px] font-black text-sky-700 transition group-hover:bg-sky-700 group-hover:text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {district}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section id="hizmetler" className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-700">
            Hizmetlerimiz
          </div>
          <h2 className="mt-4 text-3xl font-black text-slate-900 md:text-5xl">
            Her elektrik ihtiyacınıza çözüm üretiriz.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative isolate overflow-hidden rounded-[20px] border border-sky-900/10 bg-white p-6 shadow-[0_10px_30px_rgba(16,42,67,0.1)] transition duration-300 hover:-translate-y-2 hover:border-sky-500/50 hover:shadow-[0_20px_45px_rgba(29,111,150,0.2)]"
            >
              {service.image && (
                <>
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-95"
                    style={{ backgroundImage: `url('${service.image}')` }}
                  />
                  <div className="absolute inset-0 z-0 bg-white/75 transition duration-300 group-hover:bg-white/60" />
                </>
              )}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500 opacity-80 transition group-hover:opacity-100" />
              <div className="absolute -right-10 -top-10 -z-10 h-32 w-32 rounded-full bg-yellow-400/10 blur-2xl transition duration-300 group-hover:bg-yellow-400/20" />
              <div className="relative z-10 mb-7 flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-200/30 bg-gradient-to-br from-yellow-200 via-yellow-400 to-amber-500 text-xl font-black text-slate-900 shadow-[0_8px_25px_rgba(63,159,197,0.35)] transition duration-300 group-hover:rotate-3 group-hover:scale-105">
                  {service.icon}
                </div>
                <span className="text-sm font-black tracking-[0.2em] text-yellow-200/70">
                  0{index + 1}
                </span>
              </div>
              <h3 className="relative z-10 text-xl font-black tracking-tight text-slate-900 transition group-hover:text-sky-700">
                {service.title}
              </h3>
              <p className="relative z-10 mt-4 text-sm leading-6 text-slate-700">{service.text}</p>
              <div className="relative z-10 mt-7 flex items-center gap-2 text-sm font-bold text-sky-700">
                Detaylı bilgi
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      <section id="nedenbiz" className="bg-[#eaf5f9] py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-700">
                Neden Kablomix?
              </div>
              <h2 className="mt-4 text-3xl font-black text-slate-900 md:text-5xl">
                Güvenilir ekip, temiz işçilik ve güçlü sonuç.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Kablomix, teknik bilgi, güvenlik bilinci ve müşteri odaklı yaklaşımı birleştirerek
                işinizi kısa sürede ve doğru şekilde tamamlar.
              </p>

              <div className="mt-8 space-y-4">
                {reasons.map((reason) => (
                  <div
                    key={reason}
                    className="group flex items-center gap-4 rounded-2xl border border-sky-900/10 bg-white px-4 py-4 shadow-[0_8px_20px_rgba(16,42,67,0.07)] transition duration-300 hover:-translate-y-1 hover:border-sky-500/40 hover:shadow-[0_14px_28px_rgba(29,111,150,0.14)]"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-600 text-sm font-black text-white shadow-[0_5px_14px_rgba(29,111,150,0.25)] transition duration-300 group-hover:scale-110 group-hover:bg-sky-700">
                      ✓
                    </span>
                    <span className="text-base font-semibold text-slate-800">{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {stats.map((stat) => (
                  <div key={stat.label} className="rounded-[20px] border border-sky-900/10 bg-white p-6 shadow-[0_10px_25px_rgba(16,42,67,0.08)]">
                  <div className="text-4xl font-black text-sky-700">{stat.value}</div>
                  <div className="mt-3 text-base text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="calisma" className="relative isolate overflow-hidden bg-[#123d59] px-5 py-20 lg:px-8">
        <div
          aria-hidden="true"
          className="service-areas-background absolute inset-0 -z-10"
          style={{ backgroundImage: "url('/istanbul-bosphorus.jpg')" }}
        />
        <div className="absolute inset-0 -z-10 bg-[#123d59]/75" />
        <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-200">
            Çalışma Alanlarımız
          </div>
          <h2 className="mt-4 text-3xl font-black text-white md:text-5xl">
            Farklı alanlarda güvenli elektrik çözümleri.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[
            { title: "Konut", icon: "⌂", image: "/konut.jpg", text: "Evlerinizde güvenli ve verimli elektrik sistemi kurulumları." },
            { title: "Ofis", icon: "▦", image: "/ofis.jpg", text: "Ofisler için düzenli, güvenli ve verimli enerji dağıtımı." },
            { title: "Ticaret", icon: "◈", text: "Mağaza, dükkan ve iş yeri elektrik ihtiyaçları için uygun çözümler." },
            { title: "Sanayi", icon: "⚙", text: "Yüksek dayanıklılık ve güvenlik önceliğiyle sanayi elektrik çalışmaları." },
            { title: "Villa", icon: "◆", text: "Özel yaşam alanları için estetik ve güvenli elektrik tasarımları." },
            { title: "Acil Arıza", icon: "!", image: "/arıza.jpg", text: "Ani elektrik sorunlarında profesyonel ve hızlı müdahale." },
          ].map((item) => (
            <div
              key={item.title}
              className="group relative isolate overflow-hidden rounded-[20px] border border-white/30 bg-[#174d6b]/80 p-6 shadow-[0_14px_35px_rgba(3,25,43,0.25)] backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-sky-200/80 hover:bg-[#1d5b7d]/90 hover:shadow-[0_22px_45px_rgba(3,25,43,0.42)]"
            >
              {item.image && (
                <>
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />
                  <div className="absolute inset-0 z-0 bg-[#123d59]/60 transition duration-300 group-hover:bg-[#123d59]/45" />
                </>
              )}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-200 via-white to-sky-300 opacity-80 transition group-hover:opacity-100" />
              <div className="absolute -right-8 -top-8 -z-10 h-28 w-28 rounded-full bg-sky-200/15 blur-2xl transition duration-300 group-hover:bg-sky-100/30" />
              <div className="relative z-10 mb-5 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-100/60 bg-sky-100/20 text-2xl font-black text-sky-100 shadow-[0_8px_20px_rgba(3,25,43,0.2)] transition duration-300 group-hover:rotate-3 group-hover:scale-110 group-hover:bg-sky-100/30">
                  {item.icon}
                </div>
                <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-sky-100">
                  Kablomix
                </span>
              </div>
              <div className="relative z-10 mb-3 text-xl font-black text-white transition group-hover:text-sky-100">{item.title}</div>
              <p className="relative z-10 text-sm leading-6 text-sky-100/90">{item.text}</p>
              <div className="relative z-10 mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-sky-200">
                Hizmet detayı
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      <section id="yorumlar" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-700">
              Referanslar
            </div>
            <h2 className="mt-4 text-3xl font-black text-slate-900 md:text-5xl">
              Müşterilerimiz Kablomix’i tercih ediyor.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {reviews.map((review) => (
              <div key={review.name} className="rounded-[18px] border border-sky-900/10 bg-white p-6 shadow-[0_10px_25px_rgba(16,42,67,0.08)]">
                <div className="mb-4 flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span key={idx}>★</span>
                  ))}
                </div>
                <p className="text-base leading-7 text-slate-600">“{review.text}”</p>
                <div className="mt-6 border-t border-sky-900/10 pt-4 text-lg font-bold text-slate-900">
                  {review.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="iletisim" className="bg-[#eaf5f9] px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[24px] border border-sky-900/10 bg-white p-8 shadow-[0_15px_35px_rgba(16,42,67,0.08)] md:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-700">
                İletişim
              </div>
              <h2 className="mt-4 text-3xl font-black text-slate-900 md:text-5xl">
                Elektrik sorununuza hızlı çözüm için bugün ulaşın.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                Ücretsiz keşif, fiyat teklifi ve acil müdahale için bizimle iletişime geçin.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-slate-900 font-black">
                    ☎
                  </span>
                  <a href="tel:+905551234567" className="text-lg font-semibold text-slate-900 hover:text-sky-700">
                    0541 321 98 01
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-slate-900 font-black">
                    ✉
                  </span>
                  <a href="mailto:info@kablomix.com" className="text-lg font-semibold text-slate-900 hover:text-sky-700">
                    info@kablomix.com
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-slate-900 font-black">
                    📍
                  </span>
                  <span className="text-lg font-semibold text-slate-900">İstanbul / Türkiye</span>
                </div>
              </div>
            </div>

            <div className="rounded-[20px] border border-sky-900/10 bg-[#f6fbfd] p-6">
              <div className="text-xl font-black text-slate-900">İletişim Formu</div>
              <div className="mt-6 space-y-4">
                <input
                  type="text"
                  placeholder="Adınız Soyadınız"
                  className="w-full rounded-xl border border-sky-900/15 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none ring-0 focus:border-sky-500"
                />
                <input
                  type="tel"
                  placeholder="Telefon Numaranız"
                  className="w-full rounded-xl border border-sky-900/15 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none ring-0 focus:border-sky-500"
                />
                <textarea
                  placeholder="İşinizin detayını yazın"
                  rows={4}
                  className="w-full rounded-xl border border-sky-900/15 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none ring-0 focus:border-sky-500"
                />
                <button className="w-full rounded-full bg-sky-700 px-6 py-3 text-base font-bold text-white transition hover:bg-sky-800">
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
