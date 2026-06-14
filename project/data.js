/* Boii Rest & Breakfast — TV uygulaması içerik verisi (TR / EN) */
window.BOII = {
  guest: { name: "Ayşe Yıldız", room: "07", nights: 3 },
  hotel: {
    name: "Boii",
    full: "Boii Rest & Breakfast",
    place: "Sığacık · Seferihisar · İzmir",
    wifi: { ssid: "boii rest n breakfast", pass: "boii2026" },
    tagline: {
      tr: "Sığacık'ın kalbinde sakin bir mola",
      en: "A calm retreat in the heart of Sığacık",
    },
  },

  // Ana ekran kutucukları
  tiles: [
    { id: "hotel",   key: "01", icon: "hotel",   tr: { t: "Otel Bilgileri",  s: "Kahvaltı · WiFi · Check-out" }, en: { t: "Hotel Info",     s: "Breakfast · WiFi · Check-out" } },
    { id: "guide",   key: "02", icon: "compass", tr: { t: "Sığacık Rehberi", s: "Gezilecek yerler" },           en: { t: "Sığacık Guide",  s: "Places to explore" } },
    { id: "market",  key: "03", icon: "basket",  tr: { t: "Pazar & Etkinlik", s: "Cittaslow üretici pazarı" },  en: { t: "Market & Events",s: "Cittaslow farmers market" } },
    { id: "beaches", key: "04", icon: "wave",    tr: { t: "Plajlar & Koylar", s: "Akkum · Teos · Akarca" },     en: { t: "Beaches & Coves",s: "Akkum · Teos · Akarca" } },
    { id: "travel",  key: "05", icon: "route",   tr: { t: "Ulaşım & Mesafe", s: "Havalimanı · Çeşme · Efes" },  en: { t: "Getting Around", s: "Airport · Çeşme · Ephesus" } },
  ],

  // OTEL BİLGİLERİ
  hotelInfo: {
    tr: { title: "Otel Bilgileri", sub: "Konaklamanız için bilmeniz gerekenler" },
    en: { title: "Hotel Info", sub: "Everything you need for your stay" },
    rows: [
      { icon: "coffee", tr: { t: "Kahvaltı", v: "09:00 – 12:00", n: "Siz sevgili misafirlerimizin dinlenmesi en büyük önceliğimiz; bu yüzden kahvaltı servisimiz öğlene kadar sürmektedir." }, en: { t: "Breakfast", v: "09:00 – 12:00", n: "Your rest is our greatest priority — so breakfast is served right through to noon." } },
      { icon: "door",  tr: { t: "Check-out", v: "12:00'a kadar", n: "Geç çıkış için bize danışın" }, en: { t: "Check-out", v: "by 12:00", n: "Ask us about a late check-out" } },
      { icon: "phone",  tr: { t: "İletişim", v: "0542 114 76 44", n: "05421147644 numaralı telefonumuzdan bize her zaman ulaşabilirsiniz." }, en: { t: "Contact", v: "0542 114 76 44", n: "Reach us anytime on 0542 114 76 44." } },
      { icon: "moon",   tr: { t: "Sessizlik saatleri", v: "23:00 – 08:00", n: "Komşularımıza saygı için" }, en: { t: "Quiet hours", v: "23:00 – 08:00", n: "Out of respect for neighbours" } },
      { icon: "towel",  tr: { t: "Plaj Havlusu", v: "Ücretsiz", n: "Misafirlerimize plaj havlusu ücretsiz sunulur; resepsiyondan temin edebilirsiniz." }, en: { t: "Beach Towel", v: "Complimentary", n: "Beach towels are free for our guests — just ask at reception." } },
      { icon: "smoking", tr: { t: "Sigara", v: "Balkon veya bahçede", n: "Balkonlu odalarda balkonda, balkonsuz odalarda yalnızca bahçede içilebilir. Odalarda sigara, yangın alarmlarını devreye sokar." }, en: { t: "Smoking", v: "Balcony or garden", n: "Balcony rooms: on the balcony; otherwise garden only. Smoking indoors sets off the fire alarms." } },
    ],
    comfortNote: {
      tr: { t: "Huzurlu Uyku", d: "Sığacık Kaleiçi turistik bir bölge olduğundan, yasal izinleriyle gece 01:00'a — nadiren 04:00'a — kadar müzik yapan mekânlar bulunur. Ses hassasiyeti olan misafirlerimiz için odalardaki 'hoş geldiniz' setinde kulak tıkacı yer alır; karartma perdelerimiz ise ses emici özelliğiyle derin ve dinlendirici bir uykuya yardımcı olur." },
      en: { t: "Restful Sleep", d: "As Sığacık's Kaleiçi is a lively tourist area, some venues play music until 01:00 — and rarely 04:00 — under legal permits. For noise-sensitive guests, the in-room welcome set includes earplugs, while our blackout curtains absorb sound to help you sleep deeply and rest well." },
    },
  },

  // HİZMETLER
  services: {
    tr: { title: "Hizmetler", sub: "Bir tuş uzağınızdayız" },
    en: { title: "Services", sub: "We're one button away" },
    items: [
      { icon: "tray",   tr: { t: "Oda Servisi", s: "Kahvaltı ve atıştırmalıklar odanıza" }, en: { t: "Room Service", s: "Breakfast & snacks to your room" } },
      { icon: "broom",  tr: { t: "Kat Hizmetleri", s: "Temizlik ve düzenleme talebi" }, en: { t: "Housekeeping", s: "Cleaning & tidy-up request" } },
      { icon: "towel",  tr: { t: "Havlu & Çarşaf", s: "Taze tekstil değişimi" }, en: { t: "Towels & Linen", s: "Fresh towel & linen change" } },
      { icon: "bell",   tr: { t: "Resepsiyonu Ara", s: "Sorularınız için bizi arayın" }, en: { t: "Call Reception", s: "Reach us for anything you need" } },
      { icon: "alarm",  tr: { t: "Uyandırma", s: "Sabah çağrısı planlayın" }, en: { t: "Wake-up Call", s: "Schedule a morning call" } },
      { icon: "taxi",   tr: { t: "Transfer & Taksi", s: "Havalimanı ve tur transferi" }, en: { t: "Transfer & Taxi", s: "Airport & tour transfers" } },
    ],
  },

  // SIĞACIK REHBERİ
  guide: {
    tr: { title: "Sığacık Rehberi", sub: "Adımlarınızca keşfedilmeyi bekleyen yerler" },
    en: { title: "Sığacık Guide", sub: "Places waiting to be discovered on foot" },
    items: [
      { img: "Sığacık Kalesi", tr: { t: "Sığacık Kalesi", s: "16. yy Osmanlı kalesi", d: "Surların içine kurulmuş taş evler, kafeler ve sanat atölyeleri.", meta: "3 dk · yürüyerek" }, en: { t: "Sığacık Castle", s: "16th-c. Ottoman fortress", d: "Stone houses, cafés and art studios nestled within the walls.", meta: "3 min · walk" } },
      { img: "Teos Antik Kenti", tr: { t: "Teos Antik Kenti", s: "Dionysos Tapınağı", d: "Şarap tanrısına adanmış İon kenti; zeytinlikler arasında.", meta: "5 km · 10 dk" }, en: { t: "Teos Ancient City", s: "Temple of Dionysos", d: "Ionian city dedicated to the god of wine, set among olive groves.", meta: "5 km · 10 min" } },
      { img: "Sığacık Marina", tr: { t: "Marina & Liman", s: "Tekne turları", d: "Gün batımı yürüyüşü, balıkçı tekneleri ve koy turları.", meta: "2 dk · yürüyerek" }, en: { t: "Marina & Harbour", s: "Boat tours", d: "Sunset strolls, fishing boats and daily cove cruises.", meta: "2 min · walk" } },
    ],
    intro: {
      tr: { t: "Sığacık Hakkında", d: "Adını antik İon kenti Teos'tan alan Sığacık, 16. yüzyılda Kanuni Sultan Süleyman döneminde inşa edilen kale surlarıyla şekillenir. Bir zamanlar Osmanlı donanmasının üssü olan liman; bugün taş evleri, dar sokakları ve Türkiye'nin ilk Cittaslow (Sakin Şehir) ilçesi Seferihisar'ın dingin ruhuyla tanınır." },
      en: { t: "About Sığacık", d: "Named after the ancient Ionian city of Teos, Sığacık is shaped by fortress walls built in the 16th century under Süleyman the Magnificent. Once a base for the Ottoman navy, the harbour is known today for its stone houses, narrow lanes and the serene spirit of Seferihisar — Turkey's first Cittaslow (Slow City) district." },
    },
    note: {
      tr: { t: "Yeme & İçme", d: ["Siz değerli misafirlerimize, yalnızca mutfağını bildiğimiz ve gitmekten keyif aldığımız yerleri önermeyi tercih ediyoruz.", "Damak tadınıza ve eğlence anlayışınıza göre en güzel alternatifler için her zaman bize danışabilirsiniz."] },
      en: { t: "Where to Eat & Drink", d: ["We prefer to recommend only the places whose kitchens we know and truly enjoy.", "For the best options to suit your taste and sense of fun, you're always welcome to ask us."] },
    },
  },

  // PAZAR & ETKİNLİK
  market: {
    tr: { title: "Pazar & Etkinlik", sub: "Mevsimin ritmiyle hareket eden yerel hayat" },
    en: { title: "Market & Events", sub: "Local life moving to the rhythm of the season" },
    items: [
      { img: "Cittaslow Pazarı", tr: { t: "Sığacık Üretici Pazarı", s: "Her Pazar · 09:00 – 16:00", d: "Cittaslow sertifikalı, yöresel ve organik üreticiler. Zeytinyağı, otlar, ev reçelleri, taş fırın ekmeği.", meta: "Kale yanı meydan" }, en: { t: "Sığacık Producers' Market", s: "Every Sunday · 09:00 – 16:00", d: "Cittaslow-certified local & organic growers. Olive oil, herbs, jams and stone-oven bread.", meta: "Square by the castle" } },
      { img: "Mandalina Şenliği", tr: { t: "Seferihisar Mandalina Şenliği", s: "Aralık başı · yıllık", d: "Seferihisar'ın simgesi mandalinaya adanan renkli şenlik: konserler, yarışmalar, mandalinalı lezzetler ve üretici stantları.", meta: "Seferihisar merkez" }, en: { t: "Seferihisar Mandarin Festival", s: "Early December · annual", d: "A colourful festival for the town's beloved mandarin: concerts, contests, mandarin treats and producer stalls.", meta: "Seferihisar town" } },
      { img: "Lavanta Festivali", tr: { t: "Lavanta Hasat Şenliği", s: "Temmuz · yıllık", d: "Turgut Köyü'ndeki mor tarlalarda lavanta hasadı; lavanta yağı ve sabun atölyeleri, müzik ve yöresel ürünler.", meta: "Turgut Köyü" }, en: { t: "Lavender Harvest Festival", s: "July · annual", d: "Lavender harvest in the purple fields of Turgut village; oil & soap workshops, music and local produce.", meta: "Turgut village" } },
      { img: "Kurtuluş Şenlikleri", tr: { t: "Seferihisar Kurtuluş Şenlikleri", s: "8 – 11 Eylül", d: "İlçenin kurtuluşunu kutlayan şenlikler: kortej, halk oyunları, konserler ve sokak etkinlikleri.", meta: "Seferihisar merkez" }, en: { t: "Liberation Festivities", s: "8 – 11 September", d: "Festivities marking the town's liberation: a parade, folk dances, concerts and street events.", meta: "Seferihisar town" } },
    ],
  },

  // PLAJLAR & KOYLAR
  beaches: {
    tr: { title: "Plajlar & Koylar", sub: "Sakin koylardan rüzgârlı kumsallara" },
    en: { title: "Beaches & Coves", sub: "From calm coves to breezy shores" },
    items: [
      { img: "Akkum Plajı", tr: { t: "Büyük Akkum", s: "Sörf & rüzgâr · Mavi Bayrak", d: "Geniş kumsal, sığ ve berrak su; rüzgâr sörfü için ideal.", meta: "2 km · 5 dk" }, en: { t: "Büyük Akkum", s: "Surf & wind · Blue Flag", d: "Wide sand, shallow clear water — ideal for windsurfing.", meta: "2 km · 5 min" } },
      { img: "Ekmeksiz Plajı", tr: { t: "Ekmeksiz Plajı", s: "Gün batımı · halk plajı", d: "Uzun kumsalı ve gün batımıyla bilinen, rahat bir halk plajı.", meta: "3 km · 7 dk" }, en: { t: "Ekmeksiz Beach", s: "Sunset · public beach", d: "A relaxed public beach known for its long sand and sunsets.", meta: "3 km · 7 min" } },
      { img: "Akarca", tr: { t: "Akarca", s: "Berrak su · aile dostu", d: "Aileler için sığ, berrak ve korunaklı bir koy.", meta: "6 km · 12 dk" }, en: { t: "Akarca", s: "Clear water · family", d: "A sheltered, shallow cove that's great for families.", meta: "6 km · 12 min" } },
      { img: "Güneşköy", tr: { t: "Güneşköy", s: "Sakin kıyı · plaj kulüpleri", d: "Daha sakin bir sahil; plaj kulüpleri ve dingin koyları.", meta: "12 km · 18 dk" }, en: { t: "Güneşköy", s: "Calm coast · beach clubs", d: "A quieter shoreline with beach clubs and tranquil bays.", meta: "12 km · 18 min" } },
      { img: "Ürkmez Plajı", tr: { t: "Ürkmez Plajı", s: "Uzun kumsal · Mavi Bayrak", d: "Sığ suyu ve uzun kumsalıyla aileler için ideal tatil kıyısı.", meta: "16 km · 22 dk" }, en: { t: "Ürkmez Beach", s: "Long sand · Blue Flag", d: "Shallow water and a long beach — an ideal family seaside.", meta: "16 km · 22 min" } },
    ],
  },

  // ULAŞIM & MESAFE
  travel: {
    tr: { title: "Ulaşım & Mesafe", sub: "Boii'den çevreye yaklaşık mesafeler" },
    en: { title: "Getting Around", sub: "Approximate distances from Boii" },
    items: [
      { tr: { t: "Sığacık Marina", s: "Yürüyerek" }, en: { t: "Sığacık Marina", s: "On foot" }, km: "300 m", time: "3 dk", timeEn: "3 min" },
      { tr: { t: "Seferihisar Merkez", s: "Araçla" }, en: { t: "Seferihisar Town", s: "By car" }, km: "5 km", time: "12 dk", timeEn: "12 min" },
      { tr: { t: "Çeşme", s: "Araçla" }, en: { t: "Çeşme", s: "By car" }, km: "45 km", time: "50 dk", timeEn: "50 min" },
      { tr: { t: "Adnan Menderes Havalimanı", s: "İzmir (ADB)" }, en: { t: "Adnan Menderes Airport", s: "İzmir (ADB)" }, km: "50 km", time: "55 dk", timeEn: "55 min" },
      { tr: { t: "İzmir Şehir Merkezi", s: "Konak" }, en: { t: "İzmir City Centre", s: "Konak" }, km: "52 km", time: "60 dk", timeEn: "60 min" },
      { tr: { t: "Efes & Selçuk", s: "Antik kent" }, en: { t: "Ephesus & Selçuk", s: "Ancient city" }, km: "70 km", time: "75 dk", timeEn: "75 min" },
    ],
  },

  ui: {
    tr: { home: "Ana Ekran", back: "Geri", select: "Seç", navigate: "Gezin", welcome: "Hoş geldiniz", room: "Oda", wifiNet: "Ağ", wifiPass: "Şifre", nav: "ile gezin", ok: "ile seç", goback: "ile dön", today: "Bugün", recommend: "Günün önerisi" },
    en: { home: "Home", back: "Back", select: "Select", navigate: "Navigate", welcome: "Welcome", room: "Room", wifiNet: "Network", wifiPass: "Password", nav: "to move", ok: "to select", goback: "to go back", today: "Today", recommend: "Today's pick" },
  },
};
