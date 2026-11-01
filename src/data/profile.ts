import type { T, TL } from "./projects";

export const JOBS: { when: T; where: T; title: T; org: T; items: TL }[] = [
  {
    when: { tr: "2025 – Halen", en: "2025 – Present" }, where: { tr: "İstanbul", en: "Istanbul" },
    title: { tr: "Kurucu ve Mobil Uygulama Geliştirici", en: "Founder & Mobile App Developer" },
    org: { tr: "Suertech · kendi ürünlerim ve müşteri projeleri", en: "Suertech · my own products and client projects" },
    items: {
      tr: [
        "Work and Travel Community'yi Kotlin ve Jetpack Compose ile geliştirip Google Play'de, Swift ve SwiftUI ile App Store'da yayına aldım.",
        "İş mantığını Kotlin Multiplatform ile Android, iOS ve web arasında paylaşıyorum.",
        "Clean Architecture, MVVM, Coroutines, Flow ve Hilt ile katmanlı kod tabanları kuruyorum.",
        "Firebase, Supabase, Google Maps ve RevenueCat entegrasyonlarını yapıyorum; backend'i Firebase Cloud Functions'a (Python) taşıdım.",
        "Kuyumcu, pastane, saat mağazası ve pet shop gibi işletmelere uygulama teslim ediyorum.",
      ],
      en: [
        "Built Work and Travel Community in Kotlin and Jetpack Compose for Google Play, and in Swift and SwiftUI for the App Store.",
        "Share business logic across Android, iOS and web with Kotlin Multiplatform.",
        "Structure codebases with Clean Architecture, MVVM, Coroutines, Flow and Hilt.",
        "Integrate Firebase, Supabase, Google Maps and RevenueCat; migrated a backend to Firebase Cloud Functions (Python).",
        "Deliver apps for businesses such as jewelers, bakeries, a watch store and a pet shop.",
      ],
    },
  },
  {
    when: { tr: "Tem 2025 – Oca 2026", en: "Jul 2025 – Jan 2026" }, where: { tr: "İstanbul", en: "Istanbul" },
    title: { tr: "Frontend Geliştirici (Stajyer)", en: "Frontend Developer (Intern)" },
    org: { tr: "Softtech (İş Bankası'nın teknoloji şirketi) · Kredi İzleme ve Takip ekibi", en: "Softtech (Isbank's technology company) · Credit Monitoring and Tracking team" },
    items: {
      tr: ["İş Bankası şubelerinde kullanılan ekranlar üzerinde çalıştım.", "Ürün, tasarım ve test ekipleriyle iş taleplerini teknik gereksinimlere dönüştürdüm.", "Agile ve Scrum düzeninde sprint planlama, pull request ve kod incelemesi süreçlerinde yer aldım."],
      en: ["Worked on screens used in Isbank branches.", "Turned business requests into technical requirements with product, design and QA teams.", "Took part in sprint planning, pull requests and code review in an Agile/Scrum team."],
    },
  },
  {
    when: { tr: "2023 – Halen", en: "2023 – Present" }, where: { tr: "İstanbul", en: "Istanbul" },
    title: { tr: "Freelance Android Geliştirici", en: "Freelance Android Developer" },
    org: { tr: "Serbest çalışan · yerel işletmeler ve bağımsız projeler", en: "Self-employed · local businesses and independent projects" },
    items: {
      tr: ["Java ve Kotlin ile uçtan uca native Android uygulamaları teslim ettim.", "İşletmeler için sipariş, QR menü ve canlı altın fiyatı uygulamaları geliştirdim."],
      en: ["Delivered end-to-end native Android apps in Java and Kotlin.", "Built ordering, QR menu and live gold-price apps for local businesses."],
    },
  },
];

type Item = string | T;
export const SKILLS: { k: T; icon: string; items: Item[] }[] = [
  { k: { tr: "Diller", en: "Languages" }, icon: "code", items: ["Kotlin", "Java", "Swift", "TypeScript", "JavaScript", "Python", "SQL"] },
  { k: { tr: "Android", en: "Android" }, icon: "android", items: ["Jetpack Compose", "Android SDK", "ViewModel", "Navigation", "Material 3", "Baseline Profiles"] },
  { k: { tr: "Çapraz platform", en: "Cross-platform" }, icon: "devices", items: ["Kotlin Multiplatform", "Compose Multiplatform", "Kotlin/Wasm", "SwiftUI", "Next.js"] },
  { k: { tr: "Mimari", en: "Architecture" }, icon: "account_tree", items: ["Clean Architecture", "MVVM", "Coroutines", "Flow", "Hilt", "Koin"] },
  { k: { tr: "Backend ve veri", en: "Backend & data" }, icon: "database", items: ["Firebase", "Cloud Functions", "Supabase", "Ktor", "Room", "PostgreSQL", "Retrofit", "Socket.IO"] },
  { k: { tr: "Servisler", en: "Services" }, icon: "hub", items: ["Google Maps", "RevenueCat", "iyzico", "AdMob", "FCM", "Cloudflare"] },
  { k: { tr: "Test ve kalite", en: "Testing & quality" }, icon: "verified", items: ["JUnit", "Compose UI Test", { tr: "Kod incelemesi", en: "Code review" }, { tr: "Crash analizi", en: "Crash triage" }] },
  { k: { tr: "Yayın", en: "Release" }, icon: "rocket_launch", items: ["Google Play Console", "App Store Connect", "Gradle", "Git", "Agile / Scrum"] },
  { k: { tr: "Yapay zekâ", en: "AI" }, icon: "auto_awesome", items: ["Gemini API", "Claude", "GitHub Copilot", "Cursor"] },
];

export const CERTS: { t: Item; o: Item }[] = [
  { t: "iOS and Android Mobile App Developer", o: { tr: "IBM · Coursera · Profesyonel Sertifika", en: "IBM · Coursera · Professional Certificate" } },
  { t: { tr: "Android Development Bootcamp (48 saat)", en: "Android Development Bootcamp (48 hours)" }, o: "Pupilica × Softtech" },
  { t: "Programming with JavaScript", o: "IBM · Coursera" },
  { t: "Android 101", o: "Turkcell Geleceği Yazanlar" },
  { t: "Python 101 – 401", o: "Turkcell Geleceği Yazanlar" },
  { t: { tr: "SQL ile Veritabanı Sorgulama 101 – 301", en: "Database Querying with SQL 101 – 301" }, o: "Turkcell Geleceği Yazanlar" },
  { t: { tr: "Uygulamalı TypeScript", en: "Applied TypeScript" }, o: "Udemy" },
  { t: "Road to Tech", o: "Softtech" },
];
