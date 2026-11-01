export type Lang = "tr" | "en";
export type T = { tr: string; en: string };
export type TL = { tr: string[]; en: string[] };
export type LinkKind = "play" | "appstore" | "web" | "github";
export type Status = "live" | "web" | "dev" | "ready";

export interface Project {
  id: string;
  name: string;
  nameEn?: string;
  kind: T;
  category: "own" | "client";
  status: Status;
  platforms: string;
  pkg: string;
  icon?: string;
  accent: string; // hex used for the detail page glow
  summary: T;
  about: T;
  features: TL;
  stack: string[];
  links: [LinkKind, string][];
  shots: number; // number of screenshots in /shots/<id>-<n>.webp
  hidden?: boolean; // kept in the data but not shown anywhere until enabled
  featured?: boolean;
}

const PLAY = (id: string) => `https://play.google.com/store/apps/details?id=${id}`;

export const PROJECTS: Project[] = [
  {
    id: "wat", featured: true, name: "Work and Travel Community", category: "own", status: "live",
    platforms: "Android · iOS", pkg: "com.suer.workandtravelcommunity.android", icon: "/icons/wat.webp", accent: "#3B82F6",
    kind: { tr: "Kendi ürünüm · tek geliştirici", en: "My own product · sole developer" },
    summary: { tr: "Work and Travel USA programına katılan öğrenciler için topluluk uygulaması.", en: "A community app for students on the Work and Travel USA program." },
    about: {
      tr: "Programa katılan öğrencilerin şehirlerindeki diğer katılımcılarla tanışmasını, iş ve konaklama bulmasını sağlayan topluluk uygulaması. Tasarımdan backend'e kadar tek başıma geliştirdim; Android ve iOS'ta yayında.",
      en: "A community app that helps program participants meet others in their city and find jobs and housing. I built it alone, from design to backend; it's live on Android and iOS.",
    },
    features: {
      tr: ["Eyalet, şehir ve program yılına göre sohbet odaları", "İş ilanları, konaklama ve oda arkadaşı arama", "75 şehirde Google Maps ile keşif", "16 dilde arayüz", "RevenueCat ile Premium abonelik", "Firebase Cloud Functions (Python) backend"],
      en: ["Chat rooms by US state, city and program year", "Job listings, housing and roommate search", "Google Maps discovery in 75 cities", "Interface in 16 languages", "Premium subscriptions via RevenueCat", "Firebase Cloud Functions (Python) backend"],
    },
    stack: ["Kotlin", "Jetpack Compose", "KMP", "SwiftUI", "Hilt", "Firebase", "Cloud Functions", "Google Maps", "RevenueCat"],
    links: [["play", PLAY("com.suer.workandtravelcommunity.android")], ["appstore", "https://apps.apple.com/app/work-and-travel-community/id6759843472"]],
    shots: 5,
  },
  {
    id: "ozcan", featured: true, name: "Özcan Saat", category: "client", status: "web",
    platforms: "Android · iOS · Web", pkg: "com.suer.ozcansaat", accent: "#B08A4E",
    kind: { tr: "Müşteri projesi · saat mağazası", en: "Client project · watch store" },
    summary: { tr: "1993'ten beri saat satan bir mağaza için e-ticaret uygulaması, web mağaza ve personel paneli.", en: "E-commerce app, web store and staff panel for a watch shop running since 1993." },
    about: {
      tr: "Mağazanın mobil uygulaması ve web sitesi tek bir altyapıyı paylaşıyor. Uygulama Kotlin Multiplatform ile Android ve iOS'ta, web mağaza ve yönetim paneli Next.js ile çalışıyor; veriler Supabase'de, ödemeler iyzico ile.",
      en: "The store's mobile app and website share one backend. The app runs on Android and iOS with Kotlin Multiplatform, the web store and admin panel run on Next.js; data lives in Supabase and payments go through iyzico.",
    },
    features: {
      tr: ["Marka, cinsiyet ve indirime göre filtrelenen katalog", "Ürün detayı, taksit seçenekleri ve stok uyarısı", "Sepet ve iyzico ile güvenli ödeme", "Google ile giriş ve favoriler", "Personel için web yönetim paneli", "Satır düzeyi güvenlik (RLS) testleri"],
      en: ["Catalog filtered by brand, gender and discount", "Product detail with installments and stock alerts", "Cart and secure checkout via iyzico", "Google sign-in and favorites", "Web admin panel for staff", "Row-level security (RLS) tests"],
    },
    stack: ["Compose Multiplatform", "Next.js", "Motion", "Supabase", "iyzico", "Cloudflare Workers"],
    links: [["web", "https://ozcansaat.com.tr"]],
    shots: 6,
  },
  {
    id: "saray", name: "Saray Pastanesi", category: "client", status: "web",
    platforms: "Android · iOS · Web", pkg: "com.saraypastanesi.app", icon: "/icons/saray.webp", accent: "#E07A5F",
    kind: { tr: "Müşteri projesi · Osmaniye", en: "Client project · Osmaniye" },
    summary: { tr: "Bir pastane için online sipariş, işletme paneli ve QR menü.", en: "Online ordering, a business dashboard and a QR menu for a bakery." },
    about: {
      tr: "Bir pastane için online sipariş uygulaması, işletme paneli ve basılı QR kodlarla açılan dijital menü; hepsi tek bir Kotlin Multiplatform kod tabanından.",
      en: "For a bakery: an online ordering app, a business dashboard and a digital menu opened from printed QR codes, all from one Kotlin Multiplatform codebase.",
    },
    features: { tr: ["Online sipariş ve sepet", "İşletme için sipariş paneli", "Basılı QR kodlarla açılan dijital menü", "Web'de Kotlin/Wasm ile çalışıyor"], en: ["Online ordering and cart", "Order dashboard for the business", "Digital menu opened from printed QR codes", "Runs on the web with Kotlin/Wasm"] },
    stack: ["Compose Multiplatform", "Kotlin/Wasm", "Firebase", "Cloud Functions"],
    links: [["web", "https://saraypastanesi.web.app"]],
    shots: 3,
  },
  {
    id: "mercan", name: "Mercan Kuyumculuk", category: "client", status: "web",
    platforms: "Android · iOS · Web", pkg: "com.suer.mercankuyumculuk", icon: "/icons/mercan.webp", accent: "#D4A72C",
    kind: { tr: "Müşteri projesi · Osmaniye", en: "Client project · Osmaniye" },
    summary: { tr: "Canlı altın ve döviz fiyatları, kuyumcu için admin paneli.", en: "Live gold and currency prices with an admin panel for the jeweler." },
    about: {
      tr: "Her cihaz Harem Altın'ın herkese açık fiyat yayınına Socket.IO ile doğrudan bağlanıyor; kuyumcu admin panelinden ürün bazında fark, sabit fiyat ve duyuru giriyor. Üyelik ve reklam yok.",
      en: "Each device connects directly to Harem Altın's public price feed over Socket.IO; the jeweler sets per-product margins, fixed prices and announcements from an admin panel. No sign-up, no ads.",
    },
    features: { tr: ["Anlık altın ve döviz fiyatları", "Ürün bazında fark ve sabit fiyat", "Duyuru paneli", "Üyeliksiz ve reklamsız"], en: ["Real-time gold and currency prices", "Per-product margins and fixed prices", "Announcement panel", "No sign-up, no ads"] },
    stack: ["Compose Multiplatform", "Socket.IO", "Ktor", "Cloudflare"],
    links: [["web", "https://mercankuyumculuk.pages.dev"], ["github", "https://github.com/erncanyildirim/Mercan-Kuyumculuk"]],
    shots: 3,
  },
  {
    id: "atasoy", name: "Atasoy Kuyumculuk", category: "client", status: "ready",
    platforms: "Android · iOS · Web", pkg: "com.suer.atasoykuyumculuk", accent: "#E8C547",
    kind: { tr: "Müşteri projesi · Osmaniye", en: "Client project · Osmaniye" },
    summary: { tr: "Canlı altın, sarrafiye ve döviz fiyatları ile hesaplayıcı.", en: "Live gold, coin and currency prices with a calculator." },
    about: {
      tr: "Bir kuyumcu için canlı fiyat uygulaması. Favoriler, altın, sarrafiye ve döviz sekmelerinde anlık alış-satış fiyatları ve günlük değişim; elindeki altının değerini hesaplayan ekran; mağaza bilgileri ve tema seçimi.",
      en: "A live-price app for a jeweler: real-time buy/sell prices and daily change across favorites, gold, coins and currencies; a calculator for what your gold is worth; store details and theme options.",
    },
    features: { tr: ["Anlık alış-satış ve günlük değişim", "Favorilere ekleme", "Gram ve ürün bazında değer hesaplama", "Mağaza bilgisi, arama, WhatsApp ve yol tarifi", "Sistem, koyu ve açık tema", "Üyeliksiz; veri cihazda kalır"], en: ["Live buy/sell prices and daily change", "Favorites", "Value calculator by gram and product", "Store info, call, WhatsApp and directions", "System, dark and light themes", "No sign-up; data stays on the device"] },
    stack: ["Compose Multiplatform", "Kotlin/Wasm", "Cloudflare Functions"],
    links: [],
    shots: 6,
  },
  {
    id: "vatan", name: "Vatan Kuyumculuk", category: "client", status: "web",
    platforms: "Android · iOS · Web", pkg: "com.suer.vatankuyumculuk", icon: "/icons/vatan.webp", accent: "#C9A227",
    kind: { tr: "Müşteri projesi · Osmaniye", en: "Client project · Osmaniye" },
    summary: { tr: "Anlık has altın, sarrafiye ve döviz fiyatları.", en: "Real-time gold, coin and currency prices." },
    about: { tr: "Bir kuyumcu için canlı fiyat uygulaması: anlık has altın, sarrafiye ve döviz fiyatları, gram ve adet hesaplayıcı.", en: "A live-price app for a jeweler: real-time gold, coin and currency prices with a gram and piece calculator." },
    features: { tr: ["Anlık fiyatlar", "Gram ve adet hesaplayıcı", "Web'de GitHub Pages üzerinde"], en: ["Live prices", "Gram and piece calculator", "Web version on GitHub Pages"] },
    stack: ["Compose Multiplatform", "Socket.IO", "GitHub Pages"],
    links: [["web", "https://erncanyildirim.github.io/Vatan-Kuyumculuk/"], ["github", "https://github.com/erncanyildirim/Vatan-Kuyumculuk"]],
    shots: 2,
  },
  {
    id: "koknar", name: "Köknar Fırın Cafe", category: "client", status: "dev",
    platforms: "Android · iOS · Desktop", pkg: "com.suer.koknarfirincafe", accent: "#A0522D",
    kind: { tr: "Müşteri projesi · Osmaniye", en: "Client project · Osmaniye" },
    summary: { tr: "Fırın-kafe için müşteri uygulaması ve masaüstü admin paneli.", en: "Customer app and desktop admin panel for a bakery-café." },
    about: { tr: "Bir fırın-kafe için müşteri uygulaması ile kasadaki bilgisayarda çalışan masaüstü admin paneli: menü, sepet, adrese teslim veya gel-al, mesafeye göre minimum sipariş tutarı ve sipariş takibi.", en: "A customer app for a bakery-café plus a desktop admin panel that runs on the checkout computer: menu, cart, delivery or pickup, a distance-based minimum order and order tracking." },
    features: { tr: ["Menü ve sepet", "Adrese teslim veya gel-al", "Mesafeye göre minimum sipariş", "Sipariş takibi", "Kasada çalışan masaüstü admin paneli"], en: ["Menu and cart", "Delivery or pickup", "Distance-based minimum order", "Order tracking", "Desktop admin panel at the checkout"] },
    stack: ["Compose Multiplatform", "Compose Desktop", "Supabase", "Baseline Profiles"],
    links: [], shots: 3,
  },
  {
    id: "pati", name: "Pati Sepeti", category: "client", status: "dev",
    platforms: "Android · iOS", pkg: "com.suer.patisepeti", accent: "#F59E0B",
    kind: { tr: "Müşteri projesi · pet shop", en: "Client project · pet shop" },
    summary: { tr: "Pet shop için satış, sahiplendirme ve randevu uygulaması.", en: "Sales, adoption and booking app for a pet shop." },
    about: { tr: "Yerel bir pet shop için uygulama: ürün satışı, hayvan sahiplendirme, bakım randevusu ve tüm içeriği yöneten admin paneli.", en: "An app for a local pet shop: product sales, pet adoption, grooming bookings and an admin panel that manages all content." },
    features: { tr: ["Ürün satışı ve sepet", "Hayvan sahiplendirme ilanları", "Bakım randevusu", "İçerik yöneten admin paneli"], en: ["Product sales and cart", "Pet adoption listings", "Grooming bookings", "Admin panel for all content"] },
    stack: ["Compose Multiplatform", "Kotlin", "Material 3"],
    links: [], shots: 3,
  },
  {
    id: "leo", name: "Learning English with Leo", category: "own", status: "dev",
    platforms: "Android · iOS", pkg: "com.suer.learningenglishwithleo", accent: "#22C55E",
    kind: { tr: "Kendi ürünüm · eğitim", en: "My own product · education" },
    summary: { tr: "Yapay zekâ destekli İngilizce öğretmeni Leo.", en: "Leo, an AI English tutor." },
    about: { tr: "Yapay zekâ destekli İngilizce öğretmeni Leo: seviyeye göre hikâyeler, aralıklı tekrar (SRS) ile kelime kartları ve canlı lig sıralaması.", en: "Leo, an AI English tutor: leveled stories, spaced-repetition vocabulary cards and a live league leaderboard." },
    features: { tr: ["Seviyeye göre hikâyeler", "Aralıklı tekrarla kelime kartları", "Gemini ile sohbet eden öğretmen", "Canlı lig sıralaması"], en: ["Leveled stories", "Spaced-repetition vocabulary cards", "A Gemini-powered tutor you can talk to", "Live league leaderboard"] },
    stack: ["Compose Multiplatform", "Gemini API", "Koin", "Voyager", "Firebase"],
    links: [], shots: 4,
  },
  {
    id: "calorie", name: "Kalori Takibi", nameEn: "Calorie Tracker", category: "own", status: "ready",
    platforms: "Android · iOS", pkg: "com.suer.calorietracking", accent: "#10B981",
    kind: { tr: "Kendi ürünüm · sağlık", en: "My own product · health" },
    summary: { tr: "Kalori, makro, su ve kilo takibi.", en: "Calorie, macro, water and weight tracking." },
    about: { tr: "Günlük kalori, protein, karbonhidrat ve yağ takibi. USDA FoodData Central veritabanı, Türkçe yiyecek arama, su ve kilo takibi, Mifflin-St Jeor formülüyle otomatik hedef hesaplama. Veriler şifreli saklanıyor ve uygulama çevrimdışı da çalışıyor.", en: "Tracks daily calories, protein, carbs and fat, with the USDA FoodData Central database, Turkish food search, water and weight tracking, and automatic goals from the Mifflin-St Jeor equation. Data is stored encrypted and the app works offline." },
    features: { tr: ["Kalori ve makro takibi", "USDA veritabanı ve Türkçe arama", "Su ve kilo takibi", "Otomatik hedef hesaplama", "Şifreli ve çevrimdışı çalışır"], en: ["Calorie and macro tracking", "USDA database and Turkish search", "Water and weight tracking", "Automatic goals", "Encrypted and works offline"] },
    stack: ["Compose Multiplatform", "Room", "Firebase", "AdMob"],
    links: [], shots: 0,
  },
  {
    id: "yks", name: "YKS Tercih Robotu", category: "own", status: "ready",
    platforms: "Android · iOS", pkg: "com.suer.ykstercihrobotu", icon: "/icons/yks.webp", accent: "#6366F1",
    kind: { tr: "Kendi ürünüm · eğitim", en: "My own product · education" },
    summary: { tr: "Üniversite adayları için tercih robotu.", en: "A university preference planner for YKS candidates." },
    about: { tr: "5.744 program arasında puan türü, şehir, üniversite türü ve başarı sıralamasına göre arama ve sırası değiştirilebilen tercih listesi.", en: "Search 5,744 programs by score type, city, university type and ranking, then reorder your preference list." },
    features: { tr: ["5.744 program", "Puan türü, şehir ve sıralamaya göre filtre", "Sürükle-bırak tercih listesi"], en: ["5,744 programs", "Filter by score type, city and ranking", "Drag-and-drop preference list"] },
    stack: ["Compose Multiplatform", "Kotlin", "Material 3"],
    links: [], shots: 3,
  },
  {
    id: "apartman", name: "Apartman Yönetimi", nameEn: "Building Manager", category: "own", status: "ready",
    platforms: "Android · iOS", pkg: "com.suer.apartmanyonetimi", icon: "/icons/apartman.webp", accent: "#0EA5E9",
    kind: { tr: "Kendi ürünüm · mülk yönetimi", en: "My own product · property management" },
    summary: { tr: "Apartman yöneticileri için gelir-gider ve aidat takibi.", en: "Income, expense and dues tracking for building managers." },
    about: { tr: "Kasa özeti, daire bazında tahsilat ve borç durumu. Veriler cihazda tutulur; hesap ve sunucu gerekmez.", en: "Cash summary, unit-by-unit collections and outstanding balances. Data stays on the device; no account or server needed." },
    features: { tr: ["Kasa özeti", "Daire bazında tahsilat", "Borç takibi", "Hesap gerektirmez"], en: ["Cash summary", "Collections by unit", "Outstanding balances", "No account needed"] },
    stack: ["Compose Multiplatform", "Material 3", "kotlinx.serialization"],
    links: [], shots: 3,
  },
  {
    id: "tick", name: "Tick-Tack Pomodoro", category: "own", status: "live",
    platforms: "Android", pkg: "com.suer.pomodoroapplication104", accent: "#EF4444",
    kind: { tr: "Kendi ürünüm · verimlilik", en: "My own product · productivity" },
    summary: { tr: "İstatistikli ve Google Takvim entegrasyonlu odaklanma zamanlayıcısı.", en: "A focus timer with statistics and Google Calendar integration." },
    about: { tr: "Özelleştirilebilir seanslar, istatistik grafikleri ve Google Takvim entegrasyonu olan odaklanma uygulaması. Google Play'de yayında.", en: "A focus timer with custom sessions, statistics charts and Google Calendar integration. Live on Google Play." },
    features: { tr: ["Özelleştirilebilir pomodoro seansları", "İstatistik grafikleri", "Google Takvim entegrasyonu", "Firebase ile hesap"], en: ["Custom pomodoro sessions", "Statistics charts", "Google Calendar integration", "Accounts with Firebase"] },
    stack: ["Java", "Firebase", "MPAndroidChart"],
    links: [], shots: 1,
  },
  {
    id: "levelup", name: "Level Up", category: "own", status: "dev",
    platforms: "Android", pkg: "com.suer.levelup", accent: "#F97316",
    kind: { tr: "Kendi ürünüm · alışkanlık", en: "My own product · habits" },
    summary: { tr: "Seviye ve rozetlerle oyunlaştırılmış alışkanlık takibi.", en: "Habit tracking gamified with levels and badges." },
    about: { tr: "Günlük, haftalık, aylık ve yıllık grafiklerle alışkanlık takibi; seviye ve rozetlerle oyunlaştırma, bildirimlerle hatırlatma.", en: "Habit tracking with daily to yearly charts, gamified with levels and badges, with reminders via notifications." },
    features: { tr: ["Alışkanlık takibi", "Günlükten yıllığa grafikler", "Seviye ve rozetler", "FCM ile hatırlatmalar"], en: ["Habit tracking", "Daily to yearly charts", "Levels and badges", "Reminders via FCM"] },
    stack: ["Jetpack Compose", "MVVM", "Firebase", "FCM", "Vico"],
    links: [], shots: 6,
  },
  {
    id: "ureticiden", hidden: true, name: "Üreticiden", category: "own", status: "dev",
    platforms: "Android · iOS · Web", pkg: "com.suer.ureticiden", accent: "#84CC16",
    kind: { tr: "Kendi ürünüm · pazar yeri", en: "My own product · marketplace" },
    summary: { tr: "Çiftçiden tüketiciye aracısız pazar yeri.", en: "A farmer-to-consumer marketplace." },
    about: { tr: "Çiftçilerin meyve ve sebzelerini aracısız ve komisyonsuz olarak doğrudan tüketiciye sattığı pazar yeri uygulaması.", en: "A marketplace where farmers sell fruit and vegetables straight to consumers, with no middlemen or commission." },
    features: { tr: ["Aracısız satış", "Paylaşılan domain modelleri"], en: ["Direct sales", "Shared domain models"] },
    stack: ["Compose Multiplatform", "Ktor Server", "PostgreSQL"],
    links: [], shots: 2,
  },
];

export const VISIBLE = PROJECTS.filter(p => !p.hidden);
