import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Lang, T } from "./data/projects";

const S = {
  tr: {
    "nav.work": "Projeler", "nav.about": "Hakkımda", "nav.exp": "Deneyim", "nav.skills": "Yetenekler", "nav.contact": "İletişim",
    "hero.eyebrow": "Suertech · Mobil uygulama stüdyosu",
    "hero.title1": "Uygulamayı fikirden", "hero.title2": "mağazaya kadar götürüyorum.",
    "hero.lead": "Ben Eren Can Yıldırım. Kotlin, Jetpack Compose ve Kotlin Multiplatform ile Android, iOS ve web uygulamaları geliştiriyorum. Google Play ve App Store'daki uygulamalarım Suertech adıyla yayında.",
    "hero.cta1": "Projeleri gör", "hero.cta2": "İletişime geç",
    "stat.apps": "uygulama", "stat.live": "yayında", "stat.clients": "müşteri projesi", "stat.langs": "dilde arayüz (WAT)",
    "work.eyebrow": "Projeler", "work.title": "Her uygulamanın içine girip ekranlarını gezebilirsiniz.",
    "f.all": "Tümü", "f.own": "Kendi ürünlerim", "f.client": "Müşteri projeleri", "f.live": "Yayında",
    "st.live": "Yayında", "st.web": "Web'de yayında", "st.dev": "Geliştiriliyor", "st.ready": "Mağazaya hazırlanıyor",
    "card.open": "Detayları gör", "card.screens": "ekran",
    "about.eyebrow": "Hakkımda", "about.title": "Bir özelliği ilk satırdan yayın sonrasına kadar sahipleniyorum.",
    "about.p1": "Bilgisayar mühendisiyim ve 2023'ten beri mobil uygulama geliştiriyorum. Native Android'de Kotlin, Jetpack Compose, MVVM ve Clean Architecture ile çalışıyorum; iş mantığını Kotlin Multiplatform ile Android, iOS ve web arasında paylaşıyorum.",
    "about.p2": "Suertech, kendi ürünlerimi ve işletmelere geliştirdiğim uygulamaları yayınladığım çatı. Osmaniye'deki kuyumcular, pastaneler, bir saat mağazası ve bir pet shop için uygulama teslim ettim.",
    "about.p3": "Kod yazmak işin yalnızca yarısı. Mağaza yayın süreçleri, sürüm yönetimi, crash analizi ve performans iyileştirmeleri de benim sorumluluğumda.",
    "edu": "Osmaniye Korkut Ata Üniversitesi · Bilgisayar Mühendisliği, Lisans · 2022–2026",
    "exp.eyebrow": "Deneyim", "exp.title": "Bankacılık ekranlarından mağazadaki kendi ürünlerime.",
    "skills.eyebrow": "Yetenekler", "skills.title": "Kullandığım diller ve araçlar",
    "contact.eyebrow": "İletişim", "contact.title": "Birlikte bir uygulama çıkaralım.",
    "contact.text": "Android ya da Kotlin Multiplatform pozisyonları, işletmeniz için bir uygulama veya sadece merhaba demek için yazabilirsiniz.",
    "contact.copy": "Adresi kopyala", "contact.copied": "Kopyalandı", "contact.mail": "E-posta gönder",
    "detail.back": "Tüm projeler", "detail.about": "Uygulama hakkında", "detail.features": "Öne çıkanlar", "detail.stack": "Teknolojiler",
    "detail.screens": "Ekranlar", "detail.package": "Paket", "detail.platforms": "Platformlar", "detail.status": "Durum",
    "detail.next": "Sonraki proje", "detail.noShots": "Bu uygulamanın ekran görüntüleri yakında eklenecek.",
    "l.play": "Google Play", "l.appstore": "App Store", "l.web": "Web sitesi", "l.github": "GitHub",
    "lb.close": "Kapat", "lb.prev": "Önceki", "lb.next": "Sonraki",
    "theme.dark": "Koyu temaya geç", "theme.light": "Açık temaya geç", "menu": "Menü",
    "footer": "Suertech · Eren Can Yıldırım",
    "nf.title": "Sayfa bulunamadı", "nf.back": "Ana sayfaya dön",
  },
  en: {
    "nav.work": "Work", "nav.about": "About", "nav.exp": "Experience", "nav.skills": "Skills", "nav.contact": "Contact",
    "hero.eyebrow": "Suertech · Mobile app studio",
    "hero.title1": "I take apps from idea", "hero.title2": "all the way to the store.",
    "hero.lead": "I'm Eren Can Yıldırım. I build Android, iOS and web apps with Kotlin, Jetpack Compose and Kotlin Multiplatform. My apps on Google Play and the App Store are published under the name Suertech.",
    "hero.cta1": "See the work", "hero.cta2": "Get in touch",
    "stat.apps": "apps", "stat.live": "live", "stat.clients": "client projects", "stat.langs": "UI languages (WAT)",
    "work.eyebrow": "Work", "work.title": "Open any app to walk through its screens.",
    "f.all": "All", "f.own": "My products", "f.client": "Client work", "f.live": "Live",
    "st.live": "Live", "st.web": "Live on the web", "st.dev": "In development", "st.ready": "Preparing for release",
    "card.open": "View details", "card.screens": "screens",
    "about.eyebrow": "About", "about.title": "I own each feature from the first line of code through release and beyond.",
    "about.p1": "I'm a computer engineer and I've been building mobile apps since 2023. On native Android I work with Kotlin, Jetpack Compose, MVVM and Clean Architecture, and I share business logic across Android, iOS and web with Kotlin Multiplatform.",
    "about.p2": "Suertech is the name I publish my own products and client apps under. I've delivered apps for jewelers, bakeries, a watch store and a pet shop in Osmaniye.",
    "about.p3": "Writing the code is only half the job. Store submissions, release management, crash triage and performance fixes are mine too.",
    "edu": "Osmaniye Korkut Ata University · B.Sc. in Computer Engineering · 2022–2026",
    "exp.eyebrow": "Experience", "exp.title": "From banking screens to my own apps in the stores.",
    "skills.eyebrow": "Skills", "skills.title": "Languages and tools I use",
    "contact.eyebrow": "Contact", "contact.title": "Let's ship an app together.",
    "contact.text": "Write to me about Android or Kotlin Multiplatform roles, an app for your business, or just to say hello.",
    "contact.copy": "Copy address", "contact.copied": "Copied", "contact.mail": "Send an email",
    "detail.back": "All projects", "detail.about": "About the app", "detail.features": "Highlights", "detail.stack": "Built with",
    "detail.screens": "Screens", "detail.package": "Package", "detail.platforms": "Platforms", "detail.status": "Status",
    "detail.next": "Next project", "detail.noShots": "Screenshots for this app are coming soon.",
    "l.play": "Google Play", "l.appstore": "App Store", "l.web": "Website", "l.github": "GitHub",
    "lb.close": "Close", "lb.prev": "Previous", "lb.next": "Next",
    "theme.dark": "Switch to dark theme", "theme.light": "Switch to light theme", "menu": "Menu",
    "footer": "Suertech · Eren Can Yıldırım",
    "nf.title": "Page not found", "nf.back": "Back to home",
  },
} as const;
export type Key = keyof typeof S.tr;

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string; L: (v: T | string) => string }>(null!);

const initial = (): Lang => {
  const q = new URLSearchParams(location.search).get("lang");
  if (q === "tr" || q === "en") return q;
  try { const s = localStorage.getItem("st.lang"); if (s === "tr" || s === "en") return s; } catch {}
  return "tr";
};

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initial);
  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem("st.lang", lang); } catch {}
  }, [lang]);
  const t = (k: Key) => S[lang][k] ?? S.tr[k];
  const L = (v: T | string) => (typeof v === "string" ? v : v[lang]);
  return <Ctx.Provider value={{ lang, setLang, t, L }}>{children}</Ctx.Provider>;
}
export const useI18n = () => useContext(Ctx);
