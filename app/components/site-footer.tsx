type SiteFooterProps = {
  businessName: string;
};

export function SiteFooter({ businessName }: SiteFooterProps) {
  return (
    <footer className="border-t border-white/10 bg-[#050d18]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="text-lg font-black text-white">{businessName}</div>
        <div>© 2026 Kıran Enerji. Tüm hakları saklıdır.</div>
        <div>Elektrik &amp; Tesisat Hizmetleri</div>
      </div>
    </footer>
  );
}
