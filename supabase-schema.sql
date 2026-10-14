create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id text primary key check (id = 'main'),
  business_name text not null,
  phone text not null,
  whatsapp_number text not null,
  email text not null,
  location text not null,
  hero_badge text not null,
  hero_title text not null,
  hero_description text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  icon text not null default '⚡',
  image_url text,
  text text not null,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists services_title_key on public.services (title);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null default 'ELEKTRİK GÜVENLİĞİ',
  excerpt text not null default '',
  content text not null default '',
  image_url text,
  image_alt text not null default '',
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

alter table public.admin_users enable row level security;
alter table public.site_settings enable row level security;
alter table public.services enable row level security;
alter table public.blog_posts enable row level security;

grant usage on schema public to anon, authenticated;
grant select on public.site_settings, public.services, public.blog_posts to anon, authenticated;
grant select on public.admin_users to authenticated;
grant update on public.site_settings to authenticated;
grant insert, update, delete on public.services, public.blog_posts to authenticated;

drop policy if exists "Admins can read their own access" on public.admin_users;
create policy "Admins can read their own access"
  on public.admin_users for select to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings"
  on public.site_settings for select to anon, authenticated
  using (true);

drop policy if exists "Admins can update site settings" on public.site_settings;
create policy "Admins can update site settings"
  on public.site_settings for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "Public can read published services" on public.services;
create policy "Public can read published services"
  on public.services for select to anon, authenticated
  using (is_published or (select public.is_admin()));

drop policy if exists "Admins can insert services" on public.services;
create policy "Admins can insert services"
  on public.services for insert to authenticated
  with check ((select public.is_admin()));

drop policy if exists "Admins can update services" on public.services;
create policy "Admins can update services"
  on public.services for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "Admins can delete services" on public.services;
create policy "Admins can delete services"
  on public.services for delete to authenticated
  using ((select public.is_admin()));

drop policy if exists "Public can read published blog posts" on public.blog_posts;
create policy "Public can read published blog posts"
  on public.blog_posts for select to anon, authenticated
  using (is_published or (select public.is_admin()));

drop policy if exists "Admins can insert blog posts" on public.blog_posts;
create policy "Admins can insert blog posts"
  on public.blog_posts for insert to authenticated
  with check ((select public.is_admin()));

drop policy if exists "Admins can update blog posts" on public.blog_posts;
create policy "Admins can update blog posts"
  on public.blog_posts for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "Admins can delete blog posts" on public.blog_posts;
create policy "Admins can delete blog posts"
  on public.blog_posts for delete to authenticated
  using ((select public.is_admin()));

insert into public.site_settings (
  id, business_name, phone, whatsapp_number, email, location,
  hero_badge, hero_title, hero_description
) values (
  'main',
  'Kıran Enerji',
  '0541 321 98 01',
  '905413219801',
  'info@kiranenerji.com',
  'İstanbul / Türkiye',
  'Acil elektrik servisleri',
  'İstanbul''da elektrik arıza, tesisat ve onarım hizmetleri.',
  'Kıran Enerji, İstanbul genelinde ev ve iş yerleri için elektrikçi desteği, elektrik arıza onarımı, tesisat kurulumu, pano ve bakım hizmetleri sunar.'
) on conflict (id) do nothing;

insert into public.services (title, icon, image_url, text, sort_order)
values
  ('Elektrik Arıza & Onarım', '⚡', '/arıza.jpg', 'Aniden kesilen enerji, kısa devre ve arıza sorunlarında hızlı ve güvenli müdahale.', 1),
  ('Tesisat & Kurulum', '⌂', '/tesisat.jpg', 'Yeni ev, iş yeri veya ofis için sağlıklı ve doğru elektrik tesisatı çözümleri.', 2),
  ('Pano & Sigorta', '▦', '/pano.jpg', 'Pano bakımı, sigorta değişimi ve güvenli güç dağıtımı hizmetleri.', 3),
  ('Aydınlatma', '☼', null, 'Modern, verimli ve estetik aydınlatma sistemleriyle mekanlarınızı güçlendirin.', 4),
  ('Bakım & Denetim', '✓', null, 'Düzenli bakım ile enerji kaybını azaltır, güvenliği artırır ve arızaları önler.', 5),
  ('Acil Hizmet', '!', null, 'Günün her saati, acil elektrik sorunlarında profesyonel destek ve hızlı müdahale.', 6),
  ('Kamera Sistemleri', '◉', null, 'Ev, iş yeri ve site güvenliği için profesyonel kamera kurulumu ve izleme çözümleri.', 7),
  ('Turnike Geçiş Sistemleri', '⇥', null, 'Personel ve ziyaretçi geçişlerini düzenleyen güvenli turnike sistemleri.', 8),
  ('Alarm Sistemleri', '♢', null, 'Hırsızlık, acil durum ve izinsiz girişlere karşı hızlı uyarı ve alarm çözümleri.', 9),
  ('Kartlı Geçiş Sistemleri', '▣', null, 'Yetkili kişilere özel, kontrollü ve kayıtlı kartlı geçiş uygulamaları.', 10),
  ('Yangın Algılama Sistemleri', '♨', null, 'Duman ve yangın risklerini erken tespit eden güvenilir algılama sistemleri.', 11),
  ('Bariyer Sistemleri', '╋', null, 'Otopark, site ve işletme girişleri için otomatik bariyer ve kontrol çözümleri.', 12),
  ('Asansör Kamerası', '▥', null, 'Asansör içi güvenlik ve uzaktan izleme için kompakt kamera sistemleri.', 13),
  ('HGS Geçiş Sistemleri', '≫', null, 'Araç giriş çıkışlarını hızlandıran ve kayıt altına alan HGS geçiş çözümleri.', 14)
on conflict do nothing;

insert into public.blog_posts (
  slug, title, category, excerpt, content, image_url, image_alt, is_published
) values
  (
    'sigorta-surekli-atiyor',
    'Sigorta sürekli atıyorsa ne yapmalı?',
    'PANO VE SİGORTA',
    'Tekrarlayan atma aşırı yük, arızalı cihaz veya tesisat sorunu belirtisi olabilir. Sigortayı zorlamayın ve pano kapağını açmayın.',
    'Güvenliyse son kullandığınız cihazları fişten çekin; ıslak elle prize veya panoya dokunmayın. Sigorta yeniden atarsa devreyi kapalı bırakıp elektrikçiye başvurun. Sorun giderilmeden sigortayı tekrar tekrar kaldırmak ısınma ve yangın riskini artırabilir.',
    '/pano.jpg',
    'Elektrik panosu ve sigortalar',
    true
  ),
  (
    'prizden-yanik-kokusu',
    'Prizden yanık kokusu geliyorsa',
    'PRİZ VE KABLO GÜVENLİĞİ',
    'Isınma, renk değişimi, cızırtı veya yanık kokusu elektrik bağlantısında sorun olabileceğini gösterir.',
    'Prizi kullanmayı bırakın ve çevresindeki yanıcı eşyaları uzaklaştırın. Fişe ya da prize dokunmak güvenli değilse yaklaşmayın. Duman veya alev varsa alanı terk edin, su dökmeyin ve 112''yi arayın. Kontrol ve onarımı uzman bir elektrikçiye bırakın.',
    '/tesisat.jpg',
    'Elektrik tesisatı ve kablo bağlantıları',
    true
  ),
  (
    'elektrik-carpmasinda-ilk-guvenlik',
    'Elektrik çarpmasında ilk güvenlik adımı',
    'ACİL DURUM',
    'Akımın kesildiğinden emin olmadan yaralı kişiye dokunmayın. Önce kendi güvenliğinizi sağlayın ve yardım çağırın.',
    'Elektriği güvenli biçimde kesebiliyorsanız kesin; bunu yapmak tehlikeliyse kişiye veya ekipmana yaklaşmayın. 112''yi arayın ve operatörün yönlendirmelerini izleyin. Yaralı kişi kendine gelmiş olsa bile tıbbi değerlendirme almasını sağlayın.',
    '/arıza.jpg',
    'Elektrik ekipmanları ve güvenli müdahale alanı',
    true
  )
on conflict (slug) do nothing;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-media', 'site-media', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = excluded.public;

grant select on storage.objects to anon, authenticated;
grant insert, update, delete on storage.objects to authenticated;

drop policy if exists "Public can read site media" on storage.objects;
create policy "Public can read site media"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'site-media');

drop policy if exists "Admins can upload site media" on storage.objects;
create policy "Admins can upload site media"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'site-media' and (select public.is_admin()));

drop policy if exists "Admins can update site media" on storage.objects;
create policy "Admins can update site media"
  on storage.objects for update to authenticated
  using (bucket_id = 'site-media' and (select public.is_admin()))
  with check (bucket_id = 'site-media' and (select public.is_admin()));

drop policy if exists "Admins can delete site media" on storage.objects;
create policy "Admins can delete site media"
  on storage.objects for delete to authenticated
  using (bucket_id = 'site-media' and (select public.is_admin()));