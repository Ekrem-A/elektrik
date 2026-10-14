import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { DEFAULT_SITE_SETTINGS, type SiteSettings } from "../lib/site-content";
import { createPublicSupabaseClient } from "../lib/supabase";

export const metadata: Metadata = {
  title: "Elektrik Güvenliği ve Bakım Rehberi | Kıran Enerji",
  description:
    "Elektrik arızasında güvenli ilk adımlar, sürekli atan sigortalar ve yanık kokusu hakkında Kıran Enerji'nin pratik rehberlerini okuyun.",
  alternates: {
    canonical: "/blog",
  },
};

const quickSteps = [
  {
    number: "01",
    title: "İnsanları alandan uzaklaştırın",
    text: "Kıvılcım, duman, ıslak zemin veya açıkta kablo varsa kimsenin cihaza ve çevresindeki metal yüzeylere yaklaşmasına izin vermeyin.",
  },
  {
    number: "02",
    title: "Elektriği yalnızca güvenliyse kesin",
    text: "Ana şaltere kuru ve güvenli bir noktadan ulaşabiliyorsanız enerjiyi kesin. Pano ıslaksa, duman çıkarıyorsa veya kıvılcım varsa yaklaşmayın.",
  },
  {
    number: "03",
    title: "Arızalı hattı kullanmayın",
    text: "Sigortayı tekrar tekrar kaldırmayın; prizi, panoyu veya cihazın kapağını açıp onarmaya çalışmayın. Müdahale için yetkili elektrikçiden destek alın.",
  },
  {
    number: "04",
    title: "Acil tehlikede 112'yi arayın",
    text: "Yangın, yoğun duman veya yaralanma varsa güvenli bir yere çıkın ve 112 Acil Çağrı Merkezi'ne haber verin.",
  },
];

const fallbackGuides = [
  {
    id: "sigorta-atmasi",
    category: "PANO VE SİGORTA",
    title: "Sigorta sürekli atıyorsa ne yapmalı?",
    image: "/pano.jpg",
    alt: "Elektrik panosu ve sigortalar",
    text: "Tekrarlayan atma aşırı yük, arızalı cihaz veya tesisat sorunu belirtisi olabilir. Sigortayı zorlamayın ve pano kapağını açmayın.",
    details:
      "Güvenliyse son kullandığınız cihazları fişten çekin; ıslak elle prize veya panoya dokunmayın. Sigorta yeniden atarsa devreyi kapalı bırakıp elektrikçiye başvurun. Sorun giderilmeden sigortayı tekrar tekrar kaldırmak ısınma ve yangın riskini artırabilir.",
  },
  {
    id: "yanik-kokusu",
    category: "PRİZ VE KABLO GÜVENLİĞİ",
    title: "Prizden yanık kokusu geliyorsa",
    image: "/tesisat.jpg",
    alt: "Elektrik tesisatı ve kablo bağlantıları",
    text: "Isınma, renk değişimi, cızırtı veya yanık kokusu elektrik bağlantısında sorun olabileceğini gösterir.",
    details:
      "Prizi kullanmayı bırakın ve çevresindeki yanıcı eşyaları uzaklaştırın. Fişe ya da prize dokunmak güvenli değilse yaklaşmayın. Duman veya alev varsa alanı terk edin, su dökmeyin ve 112'yi arayın. Kontrol ve onarımı uzman bir elektrikçiye bırakın.",
  },
  {
    id: "elektrik-carpmasi",
    category: "ACİL DURUM",
    title: "Elektrik çarpmasında ilk güvenlik adımı",
    image: "/arıza.jpg",
    alt: "Elektrik ekipmanları ve güvenli müdahale alanı",
    text: "Akımın kesildiğinden emin olmadan yaralı kişiye dokunmayın. Önce kendi güvenliğinizi sağlayın ve yardım çağırın.",
    details:
      "Elektriği güvenli biçimde kesebiliyorsanız kesin; bunu yapmak tehlikeliyse kişiye veya ekipmana yaklaşmayın. 112'yi arayın ve operatörün yönlendirmelerini izleyin. Yaralı kişi kendine gelmiş olsa bile tıbbi değerlendirme almasını sağlayın.",
  },
];

async function PublishedGuides() {
  const supabase = createPublicSupabaseClient();
  let guides = fallbackGuides;

  if (supabase) {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, slug, title, category, excerpt, content, image_url, image_alt")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (!error && data) {
      guides = data.map((post) => ({
        id: post.slug,
        category: post.category,
        title: post.title,
        image: post.image_url || "/arıza.jpg",
        alt: post.image_alt || post.title,
        text: post.excerpt,
        details: post.content,
      }));
    }
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-3">
      {guides.map((guide) => (
        <article key={guide.id} id={guide.id} className="scroll-mt-8 border-b border-[#173b45]/15 pb-8">
          <div className="relative mb-5 aspect-[16/9] overflow-hidden bg-[#dce9e7]">
            <Image src={guide.image} alt={guide.alt} fill unoptimized sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#17647b]">{guide.category}</p>
          <h3 className="mt-2 text-xl font-black leading-snug text-[#172b33]">{guide.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">{guide.text}</p>
          <p className="mt-3 whitespace-pre-line border-l-2 border-[#78b9c8] pl-3 text-sm leading-6 text-slate-700">{guide.details}</p>
        </article>
      ))}
      {guides.length === 0 && <p className="text-sm text-slate-600">Henüz yayınlanmış bir yazı bulunmuyor.</p>}
    </div>
  );
}

async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = createPublicSupabaseClient();
  if (!supabase) return DEFAULT_SITE_SETTINGS;

  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", "main")
    .single();

  return !error && data ? (data as SiteSettings) : DEFAULT_SITE_SETTINGS;
}

export default async function BlogPage() {
  const siteSettings = await getSiteSettings();

  return (
    <main className="min-h-screen bg-[#f7faf9] text-[#172b33]">
      <SiteHeader settings={siteSettings} currentPath="/blog" />

      <section className="border-b border-[#173b45]/10 bg-[#edf5f4]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:py-16 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:px-8 lg:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#17647b]">Kıran Enerji · Bilgi merkezi</p>
            <h1 className="mt-5 max-w-2xl text-4xl font-black leading-tight text-[#142d35] md:text-5xl">
              Elektrik güvenliği için pratik rehberler.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
              Arıza anında önce güvenliğinizi sağlayın. Ev ve iş yerlerinde sık karşılaşılan elektrik sorunları için doğru ilk adımları öğrenin.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a href="#elektrik-arizasi" className="bg-[#17647b] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#104c60]">
                Arıza rehberini oku
              </a>
              <span className="text-sm font-medium text-slate-500">Güvenlik odaklı, kısa ve anlaşılır bilgiler</span>
            </div>
          </div>
          <figure>
            <div className="relative aspect-[3/2] overflow-hidden bg-[#dce9e7]">
              <Image
                src="/arıza.jpg"
                alt="Elektrik panosu ve kablo bağlantıları"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-2 text-xs text-slate-500">Elektrik arızalarında güvenli müdahale önemlidir.</figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-[#f3c85b] px-5 py-4 text-[#27343a]" aria-label="Acil durum uyarısı">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="font-bold">Yangın, yoğun duman veya yaralanma varsa güvenli alana çıkın.</p>
          <p>112 Acil Çağrı Merkezi&apos;ni arayın.</p>
        </div>
      </section>

      <article id="elektrik-arizasi" className="scroll-mt-8 bg-white px-5 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#17647b]">İlk adımlar · 4 dakika</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-[#142d35] md:text-4xl">Elektrik arızasında ne yapılmalı?</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Elektrik kesintisi, kıvılcım veya yanık kokusu fark ettiğinizde panoyu açmaya çalışmayın. Önce insanları riskli alandan uzaklaştırın ve yalnızca güvenliyse enerjiyi kesin.
            </p>
          </div>

          <ol className="mt-10 grid gap-x-8 gap-y-8 border-y border-[#173b45]/15 py-8 sm:grid-cols-2 lg:grid-cols-4">
            {quickSteps.map((step) => (
              <li key={step.number} className="border-t-2 border-[#78b9c8] pt-4">
                <span className="text-xs font-black tracking-[0.15em] text-[#17647b]">{step.number}</span>
                <h3 className="mt-3 text-lg font-bold text-[#172b33]">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 grid gap-8 md:grid-cols-[0.7fr_1.3fr]">
            <h3 className="text-xl font-black text-[#142d35]">Bunları yapmayın</h3>
            <ul className="grid gap-3 text-sm leading-6 text-slate-600 sm:grid-cols-2">
              <li className="border-l-2 border-[#e3a83a] pl-3">Islak elle prize, cihaza veya panoya dokunmayın.</li>
              <li className="border-l-2 border-[#e3a83a] pl-3">Açıkta kabloya ve elektrik çarpan kişiye akım kesilmeden yaklaşmayın.</li>
              <li className="border-l-2 border-[#e3a83a] pl-3">Elektrik kaynaklı yangına su dökmeyin.</li>
              <li className="border-l-2 border-[#e3a83a] pl-3">Atan sigortayı tekrar tekrar kaldırmayın veya panoyu sökmeyin.</li>
            </ul>
          </div>
        </div>
      </article>

      <section className="px-5 py-16 lg:px-8 lg:py-20" aria-labelledby="rehberler-baslik">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 border-b border-[#173b45]/15 pb-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#17647b]">Sık karşılaşılan durumlar</p>
              <h2 id="rehberler-baslik" className="mt-3 text-3xl font-black text-[#142d35]">Evde elektrik güvenliği</h2>
            </div>
            <p className="max-w-lg text-sm leading-6 text-slate-600">Belirti devam ediyorsa kullanımı durdurun ve tesisata müdahale etmeden uzman desteği alın.</p>
          </div>

          <Suspense fallback={<p className="mt-8 text-sm text-slate-600">Yazılar yükleniyor...</p>}>
            <PublishedGuides />
          </Suspense>
        </div>
      </section>

      <SiteFooter businessName={siteSettings.business_name} />
    </main>
  );
}