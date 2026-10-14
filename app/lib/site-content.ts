export type SiteSettings = {
  id: string;
  business_name: string;
  phone: string;
  whatsapp_number: string;
  email: string;
  location: string;
  hero_badge: string;
  hero_title: string;
  hero_description: string;
};

export type ServiceRecord = {
  id: string;
  title: string;
  icon: string;
  image_url: string | null;
  text: string;
  sort_order: number;
  is_published: boolean;
};

export type BlogPostRecord = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  image_alt: string;
  is_published: boolean;
  created_at: string;
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  id: "main",
  business_name: "Kıran Enerji",
  phone: "0541 321 98 01",
  whatsapp_number: "905413219801",
  email: "info@kiranenerji.com",
  location: "İstanbul / Türkiye",
  hero_badge: "Acil elektrik servisleri",
  hero_title: "İstanbul'da elektrik arıza, tesisat ve onarım hizmetleri.",
  hero_description:
    "Kıran Enerji, İstanbul genelinde ev ve iş yerleri için elektrikçi desteği, elektrik arıza onarımı, tesisat kurulumu, pano ve bakım hizmetleri sunar.",
};