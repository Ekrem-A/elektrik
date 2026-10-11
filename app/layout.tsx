import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kiranenerji.com"),
  title: "Kıran Enerji | İstanbul Elektrikçi, Tesisat ve Arıza Servisi",
  description:
    "Kıran Enerji, İstanbul genelinde elektrik arıza onarımı, elektrik tesisatı, pano ve bakım hizmetleri sunar. Elektrikçi desteği için hemen arayın.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.kiranenerji.com",
    siteName: "Kıran Enerji",
    title: "Kıran Enerji | İstanbul Elektrikçi ve Tesisat Hizmetleri",
    description:
      "İstanbul genelinde elektrik arıza, tesisat, pano ve bakım hizmetleri.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kıran Enerji | İstanbul Elektrikçi ve Tesisat Hizmetleri",
    description:
      "İstanbul genelinde elektrik arıza, tesisat, pano ve bakım hizmetleri.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  "@id": "https://www.kiranenerji.com/#business",
  name: "Kıran Enerji",
  url: "https://www.kiranenerji.com",
  telephone: "+905413219801",
  description:
    "İstanbul genelinde elektrik arıza onarımı, elektrik tesisatı, pano ve bakım hizmetleri.",
  areaServed: {
    "@type": "City",
    name: "İstanbul",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#07111f] text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
