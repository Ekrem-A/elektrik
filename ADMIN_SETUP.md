# Admin kurulumu

Panel, Supabase Auth, Postgres ve Storage kullanır. Supabase bağlantısı kurulana kadar herkese açık site mevcut statik içeriği gösterir; `/admin` kurulum yönergesini gösterir.

## İlk kurulum

1. Supabase'te projeyi oluşturun. Siteyi satın alan işletmenin kendi Supabase projesini kullanması önerilir.
2. Supabase SQL Editor'de `supabase-schema.sql` dosyasının tamamını çalıştırın. Bu işlem tabloları, örnek site içeriğini, yayın politikalarını ve `site-media` görsel alanını oluşturur.
3. Supabase Project Settings > API bölümünden Project URL ile public anon/publishable key değerlerini alın. Proje kökünde `.env.local` oluşturup `.env.example` içindeki değişken adlarına bu değerleri yazın:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://PROJECT_REF.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=SUPABASE_PUBLIC_KEY
   ```

4. Supabase Authentication bölümünde e-posta/şifre ile yeni kullanıcı oluşturun. Bu e-posta ve şifre, `/admin` girişinde kullanılacak.
5. Oluşan Auth kullanıcısının UUID değerini alıp SQL Editor'de admin olarak yetkilendirin:

   ```sql
   insert into public.admin_users (user_id)
   select id from auth.users where email = 'admin@example.com'
   on conflict (user_id) do nothing;
   ```

   `admin@example.com` yerine oluşturduğunuz kullanıcının e-postasını yazın.
6. Geliştirme sunucusunu yeniden başlatın ve `http://localhost:3000/admin` adresinden giriş yapın. Yayında, aynı ortam değişkenlerini hos   ting sağlayıcısına ekleyip yeniden deploy edin.

## Güvenlik ve devir

- `NEXT_PUBLIC_SUPABASE_ANON_KEY` tarayıcıda kullanılır; erişim, veritabanı RLS politikalarıyla sınırlandırılır.
- `service_role` anahtarını `.env` dosyasına, istemci koduna veya panele eklemeyin. Bu anahtar RLS'yi aşabilir.
- Sadece `admin_users` tablosunda UUID'si bulunan kullanıcılar içerik yazabilir, düzenleyebilir, silebilir ve görsel yükleyebilir. Ziyaretçiler yayınlı hizmet ve yazıları okuyabilir.
- Görseller `site-media` alanına yüklenir; JPG, PNG ve WebP dosyaları 5 MB ile sınırlıdır.
- Site devredilirken Supabase proje sahipliğini de alıcıya aktarın veya alıcının projesini oluşturup SQL kurulumunu orada tekrarlayın. Hosting ortam değişkenleri de alıcının projesine göre güncellenmelidir.

## Panelden düzenlenebilenler

- İşletme adı, telefon, WhatsApp, e-posta ve konum
- Ana sayfa başlık ve tanıtım metni
- Hizmet kartları, sıralama, yayın durumu ve görselleri
- Blog yazıları, içerik, kategori, görsel, taslak/yayın durumu