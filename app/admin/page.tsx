"use client";

import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import {
  type BlogPostRecord,
  DEFAULT_SITE_SETTINGS,
  type ServiceRecord,
  type SiteSettings,
} from "../lib/site-content";
import { getBrowserSupabaseClient } from "../lib/supabase";

type Section = "site" | "services" | "blog";
type ServiceDraft = Omit<ServiceRecord, "id"> & { id?: string };
type BlogDraft = Omit<BlogPostRecord, "id" | "created_at"> & { id?: string };

const blankService: ServiceDraft = {
  title: "",
  icon: "⚡",
  image_url: null,
  text: "",
  sort_order: 100,
  is_published: true,
};

const blankPost: BlogDraft = {
  slug: "",
  title: "",
  category: "ELEKTRİK GÜVENLİĞİ",
  excerpt: "",
  content: "",
  image_url: null,
  image_alt: "",
  is_published: false,
};

const inputClass =
  "mt-1.5 w-full border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15";

function slugify(value: string) {
  return value
    .toLocaleLowerCase("tr")
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function AdminPage() {
  const supabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  const supabase = getBrowserSupabaseClient();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(supabaseConfigured);
  const [checkedUserId, setCheckedUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [section, setSection] = useState<Section>("site");
  const [notice, setNotice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [posts, setPosts] = useState<BlogPostRecord[]>([]);
  const [serviceDraft, setServiceDraft] = useState<ServiceDraft>(blankService);
  const [postDraft, setPostDraft] = useState<BlogDraft>(blankPost);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!supabase) return;

    let cancelled = false;
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: sessionData }) => {
      if (!cancelled) {
        setUser(sessionData.session?.user ?? null);
        setAuthLoading(false);
      }
    });

    return () => {
      cancelled = true;
      data.subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    if (!supabase || !user) return;

    const client = supabase;
    const currentUser = user;
    let cancelled = false;

    async function loadAdminContent() {
      const { data: adminAccess, error: accessError } = await client
        .from("admin_users")
        .select("user_id")
        .eq("user_id", currentUser.id)
        .maybeSingle();

      if (cancelled) return;

      if (accessError || !adminAccess) {
        setIsAdmin(false);
        setCheckedUserId(currentUser.id);
        if (accessError) setErrorMessage(accessError.message);
        return;
      }

      setIsAdmin(true);
      const [settingsResult, servicesResult, postsResult] = await Promise.all([
        client.from("site_settings").select("*").eq("id", "main").single(),
        client.from("services").select("*").order("sort_order"),
        client.from("blog_posts").select("*").order("created_at", { ascending: false }),
      ]);

      if (cancelled) return;
      if (settingsResult.data) setSettings(settingsResult.data as SiteSettings);
      if (servicesResult.data) setServices(servicesResult.data as ServiceRecord[]);
      if (postsResult.data) setPosts(postsResult.data as BlogPostRecord[]);

      const loadError = settingsResult.error ?? servicesResult.error ?? postsResult.error;
      if (loadError) setErrorMessage(loadError.message);
      setCheckedUserId(currentUser.id);
    }

    void loadAdminContent();
    return () => {
      cancelled = true;
    };
  }, [supabase, user]);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;

    const formData = new FormData(event.currentTarget);
    setSaving(true);
    setErrorMessage("");
    const { error } = await supabase.auth.signInWithPassword({
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    });
    if (error) setErrorMessage(error.message);
    setSaving(false);
  }

  async function signOut() {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) setErrorMessage(error.message);
    setUser(null);
    setIsAdmin(false);
    setCheckedUserId(null);
    setServices([]);
    setPosts([]);
    setSettings(DEFAULT_SITE_SETTINGS);
    setNotice("");
  }

  async function uploadImage(file: File) {
    if (!supabase) throw new Error("Supabase bağlantısı bulunamadı.");

    const safeName = file.name
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9._-]/g, "-");
    const filePath = `${Date.now()}-${safeName}`;
    const { error } = await supabase.storage.from("site-media").upload(filePath, file);
    if (error) throw error;

    return supabase.storage.from("site-media").getPublicUrl(filePath).data.publicUrl;
  }

  async function handleImageUpload(
    event: ChangeEvent<HTMLInputElement>,
    setImage: (url: string) => void,
  ) {
    const file = event.target.files?.[0];
    if (!file || !supabase) return;
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
      setErrorMessage("JPG, PNG veya WebP biçiminde, en fazla 5 MB bir görsel seçin.");
      return;
    }

    setSaving(true);
    setErrorMessage("");
    try {
      const url = await uploadImage(file);
      setImage(url);
      setNotice("Görsel yüklendi. Değişikliği kaydetmeyi unutmayın.");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Görsel yüklenemedi.");
    } finally {
      setSaving(false);
      event.target.value = "";
    }
  }

  async function saveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;

    setSaving(true);
    setErrorMessage("");
    const { id, ...values } = settings;
    const { error } = await supabase
      .from("site_settings")
      .update({ ...values, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) setErrorMessage(error.message);
    else setNotice("Site bilgileri kaydedildi.");
    setSaving(false);
  }

  async function saveService(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;

    setSaving(true);
    setErrorMessage("");
    const { id, ...values } = serviceDraft;
    const result = id
      ? await supabase.from("services").update(values).eq("id", id)
      : await supabase.from("services").insert(values);

    if (result.error) setErrorMessage(result.error.message);
    else {
      setNotice("Hizmet kaydedildi.");
      setServiceDraft(blankService);
      const { data } = await supabase.from("services").select("*").order("sort_order");
      if (data) setServices(data as ServiceRecord[]);
    }
    setSaving(false);
  }

  async function deleteService(id: string) {
    if (!supabase || !window.confirm("Bu hizmeti silmek istediğinize emin misiniz?")) return;

    setSaving(true);
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) setErrorMessage(error.message);
    else {
      setServices((current) => current.filter((service) => service.id !== id));
      if (serviceDraft.id === id) setServiceDraft(blankService);
      setNotice("Hizmet silindi.");
    }
    setSaving(false);
  }

  async function savePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;

    setSaving(true);
    setErrorMessage("");
    const { id, ...values } = postDraft;
    const payload = { ...values, slug: slugify(values.slug || values.title) };
    const result = id
      ? await supabase.from("blog_posts").update(payload).eq("id", id)
      : await supabase.from("blog_posts").insert(payload);

    if (result.error) setErrorMessage(result.error.message);
    else {
      setNotice(payload.is_published ? "Yazı yayınlandı ve kaydedildi." : "Taslak kaydedildi.");
      setPostDraft(blankPost);
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setPosts(data as BlogPostRecord[]);
    }
    setSaving(false);
  }

  async function deletePost(id: string) {
    if (!supabase || !window.confirm("Bu yazıyı silmek istediğinize emin misiniz?")) return;

    setSaving(true);
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) setErrorMessage(error.message);
    else {
      setPosts((current) => current.filter((post) => post.id !== id));
      if (postDraft.id === id) setPostDraft(blankPost);
      setNotice("Blog yazısı silindi.");
    }
    setSaving(false);
  }

  if (!supabaseConfigured) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f4f7f6] px-5 text-slate-900">
        <section className="w-full max-w-xl border border-slate-200 bg-white p-7 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-800">Admin kurulumu</p>
          <h1 className="mt-3 text-2xl font-black">Supabase bağlantısı gerekli</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Proje URL&apos;si ve public anon/publishable key değerlerini `.env.local` dosyasına ekleyin; sonra Supabase SQL kurulumunu tamamlayın.
          </p>
          <p className="mt-4 text-sm font-semibold text-slate-800">Gizli service-role anahtarını tarayıcıya veya bu panele koymayın.</p>
        </section>
      </main>
    );
  }

  if (authLoading) {
    return <main className="grid min-h-screen place-items-center bg-[#f4f7f6] text-sm text-slate-600">Oturum kontrol ediliyor...</main>;
  }

  if (!user) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f4f7f6] px-5 py-10 text-slate-900">
        <form onSubmit={signIn} className="w-full max-w-md border border-slate-200 bg-white p-7 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-800">Kıran Enerji</p>
          <h1 className="mt-3 text-2xl font-black">Yönetici girişi</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">Site içeriğini düzenlemek için yetkili hesabınızla giriş yapın.</p>
          <label className="mt-6 block text-sm font-semibold" htmlFor="admin-email">E-posta</label>
          <input className={inputClass} id="admin-email" name="email" type="email" autoComplete="username" required />
          <label className="mt-4 block text-sm font-semibold" htmlFor="admin-password">Şifre</label>
          <input className={inputClass} id="admin-password" name="password" type="password" autoComplete="current-password" required />
          {errorMessage && <p className="mt-4 text-sm text-red-700" role="alert">{errorMessage}</p>}
          <button className="mt-6 w-full bg-[#17647b] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#104c60] disabled:opacity-60" disabled={saving}>
            {saving ? "Giriş yapılıyor..." : "Giriş yap"}
          </button>
          <Link href="/" className="mt-5 inline-block text-sm font-semibold text-teal-800 hover:underline">Ana sayfaya dön</Link>
        </form>
      </main>
    );
  }

  if (user && checkedUserId !== user.id) {
    return <main className="grid min-h-screen place-items-center bg-[#f4f7f6] text-sm text-slate-600">Yönetici yetkisi kontrol ediliyor...</main>;
  }

  if (!isAdmin) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f4f7f6] px-5 text-slate-900">
        <section className="w-full max-w-lg border border-slate-200 bg-white p-7 shadow-sm">
          <h1 className="text-2xl font-black">Bu hesap yönetici değil</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">Supabase&apos;te `admin_users` tablosuna bu kullanıcının kimliğini ekleyin. İçerik izinleri veritabanında da kontrol edilir.</p>
          {errorMessage && <p className="mt-3 text-sm text-red-700" role="alert">{errorMessage}</p>}
          <button onClick={signOut} className="mt-6 border border-slate-300 px-4 py-2.5 text-sm font-bold">Oturumu kapat</button>
        </section>
      </main>
    );
  }

  const tabs: { id: Section; label: string }[] = [
    { id: "site", label: "Site bilgileri" },
    { id: "services", label: `Hizmetler (${services.length})` },
    { id: "blog", label: `Blog (${posts.length})` },
  ];

  return (
    <main className="min-h-screen bg-[#f4f7f6] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-800">Kıran Enerji</p>
            <h1 className="mt-1 text-xl font-black">Site yönetimi</h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" rel="noreferrer" className="hidden text-sm font-semibold text-slate-600 hover:text-teal-800 sm:inline">Siteyi görüntüle</a>
            <button onClick={signOut} className="border border-slate-300 px-3 py-2 text-sm font-bold transition hover:bg-slate-50">Çıkış</button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-slate-600">İçerik değişiklikleri kaydedildiğinde ziyaretçilere yansır.</p>
            <p className="mt-1 text-xs text-slate-500">Oturum: {user.email}</p>
          </div>
          <span className="text-xs font-semibold text-emerald-800">Yönetici yetkisi aktif</span>
        </div>

        <div className="mt-6 flex gap-1 overflow-x-auto border-b border-slate-300" role="tablist" aria-label="İçerik bölümleri">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={section === tab.id}
              onClick={() => { setSection(tab.id); setNotice(""); setErrorMessage(""); }}
              className={`shrink-0 border-b-2 px-4 py-3 text-sm font-bold transition ${section === tab.id ? "border-teal-800 text-teal-900" : "border-transparent text-slate-500 hover:text-slate-900"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {(notice || errorMessage) && (
          <div className={`mt-5 border px-4 py-3 text-sm ${errorMessage ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-900"}`} role="status">
            {errorMessage || notice}
          </div>
        )}

        {section === "site" && (
          <form onSubmit={saveSettings} className="mt-6 max-w-3xl border border-slate-200 bg-white p-5 sm:p-7">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-lg font-black">Ana sayfa ve iletişim</h2>
              <p className="mt-1 text-sm text-slate-600">İşletme adı, telefon ve ana sayfa tanıtım metinlerini düzenleyin.</p>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold">İşletme adı<input className={inputClass} value={settings.business_name} onChange={(event) => setSettings({ ...settings, business_name: event.target.value })} required /></label>
              <label className="text-sm font-semibold">Telefon<input className={inputClass} value={settings.phone} onChange={(event) => setSettings({ ...settings, phone: event.target.value })} required /></label>
              <label className="text-sm font-semibold">WhatsApp numarası<input className={inputClass} value={settings.whatsapp_number} onChange={(event) => setSettings({ ...settings, whatsapp_number: event.target.value.replace(/\D/g, "") })} required /></label>
              <label className="text-sm font-semibold">E-posta<input className={inputClass} type="email" value={settings.email} onChange={(event) => setSettings({ ...settings, email: event.target.value })} required /></label>
              <label className="text-sm font-semibold sm:col-span-2">Hizmet konumu<input className={inputClass} value={settings.location} onChange={(event) => setSettings({ ...settings, location: event.target.value })} required /></label>
              <label className="text-sm font-semibold sm:col-span-2">Ana sayfa etiketi<input className={inputClass} value={settings.hero_badge} onChange={(event) => setSettings({ ...settings, hero_badge: event.target.value })} required /></label>
              <label className="text-sm font-semibold sm:col-span-2">Ana başlık<textarea className={inputClass} rows={2} value={settings.hero_title} onChange={(event) => setSettings({ ...settings, hero_title: event.target.value })} required /></label>
              <label className="text-sm font-semibold sm:col-span-2">Tanıtım metni<textarea className={inputClass} rows={4} value={settings.hero_description} onChange={(event) => setSettings({ ...settings, hero_description: event.target.value })} required /></label>
            </div>
            <button className="mt-6 bg-[#17647b] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#104c60] disabled:opacity-60" disabled={saving}>{saving ? "Kaydediliyor..." : "Değişiklikleri kaydet"}</button>
          </form>
        )}

        {section === "services" && (
          <div className="mt-6 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)]">
            <section className="border border-slate-200 bg-white">
              <div className="border-b border-slate-200 px-5 py-4"><h2 className="font-black">Hizmet listesi</h2></div>
              <div className="divide-y divide-slate-200">
                {services.map((service) => (
                  <div key={service.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 w-7 text-lg" aria-hidden="true">{service.icon}</span>
                      <div><p className="font-bold">{service.title}</p><p className="mt-1 line-clamp-2 text-sm text-slate-600">{service.text}</p><p className="mt-1 text-xs text-slate-500">{service.is_published ? "Yayında" : "Taslak"} · Sıra {service.sort_order}</p></div>
                    </div>
                    <div className="flex shrink-0 gap-2 pl-10 sm:pl-0">
                      <button type="button" onClick={() => setServiceDraft({ ...service })} className="border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-50">Düzenle</button>
                      <button type="button" onClick={() => void deleteService(service.id)} className="border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50" disabled={saving}>Sil</button>
                    </div>
                  </div>
                ))}
                {services.length === 0 && <p className="px-5 py-8 text-sm text-slate-600">Henüz hizmet eklenmemiş.</p>}
              </div>
            </section>

            <form onSubmit={saveService} className="border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <div><h2 className="font-black">{serviceDraft.id ? "Hizmeti düzenle" : "Yeni hizmet"}</h2><p className="mt-1 text-sm text-slate-600">Hizmet kartı içeriği</p></div>
                {serviceDraft.id && <button type="button" onClick={() => setServiceDraft(blankService)} className="text-sm font-semibold text-teal-800">Yeni kayıt</button>}
              </div>
              <label className="mt-4 block text-sm font-semibold">Hizmet adı<input className={inputClass} value={serviceDraft.title} onChange={(event) => setServiceDraft({ ...serviceDraft, title: event.target.value })} required /></label>
              <label className="mt-4 block text-sm font-semibold">Kısa açıklama<textarea className={inputClass} rows={3} value={serviceDraft.text} onChange={(event) => setServiceDraft({ ...serviceDraft, text: event.target.value })} required /></label>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <label className="text-sm font-semibold">Sembol<input className={inputClass} value={serviceDraft.icon} onChange={(event) => setServiceDraft({ ...serviceDraft, icon: event.target.value })} maxLength={4} /></label>
                <label className="text-sm font-semibold">Sıra<input className={inputClass} type="number" value={serviceDraft.sort_order} onChange={(event) => setServiceDraft({ ...serviceDraft, sort_order: Number(event.target.value) })} /></label>
              </div>
              <label className="mt-4 block text-sm font-semibold">Görsel adresi<input className={inputClass} type="text" placeholder="https://... veya /arıza.jpg" value={serviceDraft.image_url ?? ""} onChange={(event) => setServiceDraft({ ...serviceDraft, image_url: event.target.value || null })} /></label>
              <label className="mt-3 block text-sm font-medium text-slate-600">Yeni görsel yükle<input className="mt-2 block w-full text-sm file:mr-3 file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:font-semibold file:text-slate-700" type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => void handleImageUpload(event, (url) => setServiceDraft((current) => ({ ...current, image_url: url })))} /></label>
              <label className="mt-4 flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={serviceDraft.is_published} onChange={(event) => setServiceDraft({ ...serviceDraft, is_published: event.target.checked })} />Ana sayfada yayınla</label>
              <button className="mt-5 w-full bg-[#17647b] px-4 py-3 text-sm font-bold text-white hover:bg-[#104c60] disabled:opacity-60" disabled={saving}>{saving ? "Kaydediliyor..." : "Hizmeti kaydet"}</button>
            </form>
          </div>
        )}

        {section === "blog" && (
          <div className="mt-6 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.8fr)]">
            <section className="border border-slate-200 bg-white">
              <div className="border-b border-slate-200 px-5 py-4"><h2 className="font-black">Blog yazıları</h2></div>
              <div className="divide-y divide-slate-200">
                {posts.map((post) => (
                  <div key={post.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div><p className="font-bold">{post.title}</p><p className="mt-1 text-xs text-slate-500">/{post.slug} · {post.is_published ? "Yayında" : "Taslak"}</p><p className="mt-1 line-clamp-2 text-sm text-slate-600">{post.excerpt}</p></div>
                    <div className="flex shrink-0 gap-2">
                      <button type="button" onClick={() => setPostDraft({ ...post })} className="border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-50">Düzenle</button>
                      <button type="button" onClick={() => void deletePost(post.id)} className="border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50" disabled={saving}>Sil</button>
                    </div>
                  </div>
                ))}
                {posts.length === 0 && <p className="px-5 py-8 text-sm text-slate-600">Henüz blog yazısı yok.</p>}
              </div>
            </section>

            <form onSubmit={savePost} className="border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <div><h2 className="font-black">{postDraft.id ? "Yazıyı düzenle" : "Yeni blog yazısı"}</h2><p className="mt-1 text-sm text-slate-600">Metin ve görsel ekleyip yayın durumunu seçin.</p></div>
                {postDraft.id && <button type="button" onClick={() => setPostDraft(blankPost)} className="text-sm font-semibold text-teal-800">Yeni kayıt</button>}
              </div>
              <label className="mt-4 block text-sm font-semibold">Başlık<input className={inputClass} value={postDraft.title} onChange={(event) => setPostDraft({ ...postDraft, title: event.target.value, slug: postDraft.slug ? postDraft.slug : slugify(event.target.value) })} required /></label>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-semibold">URL kısa adı<input className={inputClass} value={postDraft.slug} onChange={(event) => setPostDraft({ ...postDraft, slug: slugify(event.target.value) })} required /></label>
                <label className="text-sm font-semibold">Kategori<input className={inputClass} value={postDraft.category} onChange={(event) => setPostDraft({ ...postDraft, category: event.target.value })} required /></label>
              </div>
              <label className="mt-4 block text-sm font-semibold">Kısa özet<textarea className={inputClass} rows={2} value={postDraft.excerpt} onChange={(event) => setPostDraft({ ...postDraft, excerpt: event.target.value })} required /></label>
              <label className="mt-4 block text-sm font-semibold">Yazı metni<textarea className={inputClass} rows={7} value={postDraft.content} onChange={(event) => setPostDraft({ ...postDraft, content: event.target.value })} required /></label>
              <label className="mt-4 block text-sm font-semibold">Görsel adresi<input className={inputClass} type="text" placeholder="https://... veya /pano.jpg" value={postDraft.image_url ?? ""} onChange={(event) => setPostDraft({ ...postDraft, image_url: event.target.value || null })} /></label>
              <label className="mt-3 block text-sm font-medium text-slate-600">Yeni görsel yükle<input className="mt-2 block w-full text-sm file:mr-3 file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:font-semibold file:text-slate-700" type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => void handleImageUpload(event, (url) => setPostDraft((current) => ({ ...current, image_url: url })))} /></label>
              <label className="mt-4 block text-sm font-semibold">Görsel açıklaması<input className={inputClass} value={postDraft.image_alt} onChange={(event) => setPostDraft({ ...postDraft, image_alt: event.target.value })} /></label>
              <label className="mt-4 flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={postDraft.is_published} onChange={(event) => setPostDraft({ ...postDraft, is_published: event.target.checked })} />Yazıyı yayınla</label>
              <button className="mt-5 w-full bg-[#17647b] px-4 py-3 text-sm font-bold text-white hover:bg-[#104c60] disabled:opacity-60" disabled={saving}>{saving ? "Kaydediliyor..." : "Yazıyı kaydet"}</button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}