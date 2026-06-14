/* Boii TV — ekranlar */
const { useState, useEffect, useRef } = React;
const { TvStage, FocusProvider, Focusable, useFocus, useAutoFocus, Placeholder, PhotoSlot, Icon } = window.BoiiCore;

/* ---------- Canlı saat ---------- */
function Clock({ lang }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000 * 20);
    return () => clearInterval(id);
  }, []);
  const time = now.toLocaleTimeString(lang === "tr" ? "tr-TR" : "en-GB", { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString(lang === "tr" ? "tr-TR" : "en-GB", { weekday: "long", day: "numeric", month: "long" });
  return (
    <div className="clock">
      <div className="clock-time">{time}</div>
      <div className="clock-date">{date}</div>
    </div>
  );
}

/* ---------- Üst bar ---------- */
function TopBar({ lang, setLang, weather }) {
  const B = window.BOII;
  const U = B.ui[lang];
  return (
    <header className="topbar">
      <div className="brand">
        <img className="brand-logo" src="assets/boii-wordmark.png" alt="Boii rest & breakfast" />
        <div className="brand-sub">{B.hotel.place}</div>
      </div>
      <div className="topbar-right">
        <div className="weather">
          <Icon name="sun" size={1.3} />
          <span className="weather-temp">24°</span>
          <span className="weather-meta">Sığacık</span>
        </div>
        <Clock lang={lang} />
        <Focusable id="lang-toggle" className="lang-toggle" onSelect={() => setLang(lang === "tr" ? "en" : "tr")}>
          <Icon name="globe" size={1.1} />
          <span className={lang === "tr" ? "on" : ""}>TR</span>
          <span className="sep">/</span>
          <span className={lang === "en" ? "on" : ""}>EN</span>
        </Focusable>
      </div>
    </header>
  );
}

/* ---------- Alt ipucu çubuğu ---------- */
function HintBar({ lang, onHome, showHome }) {
  const U = window.BOII.ui[lang];
  return (
    <footer className="hintbar">
      <div className="hint"><span className="keycap">◄ ► ▲ ▼</span> {U.nav}</div>
      <div className="hint"><span className="keycap">OK</span> {U.ok}</div>
      <div className="hint"><span className="keycap">{U.back}</span> {U.goback}</div>
      {showHome && (
        <Focusable id="home-btn" className="hint hint-home" onSelect={onHome}>
          <Icon name="hotel" size={1} /> {U.home}
        </Focusable>
      )}
    </footer>
  );
}

/* ---------- Tile (ana ekran kartı) ---------- */
function Tile({ tile, lang, go, variant = "" , autoFocus }) {
  const c = tile[lang];
  return (
    <Focusable id={`tile-${tile.id}`} className={`tile ${variant}`} autoFocus={autoFocus} onSelect={() => go(tile.id)}>
      <div className="tile-top">
        <span className="tile-num">{tile.key}</span>
        <span className="tile-ic"><Icon name={tile.icon} size={1.5} /></span>
      </div>
      <div className="tile-body">
        <div className="tile-title">{c.t}</div>
        <div className="tile-sub">{c.s}</div>
      </div>
      <div className="tile-go"><Icon name="arrow" size={1.1} /></div>
    </Focusable>
  );
}

/* ---------- Karşılama bloğu ---------- */
function WelcomeBlock({ lang, big }) {
  const B = window.BOII, U = B.ui[lang];
  const first = B.guest.name.split(" ")[0];
  return (
    <div className={`welcome ${big ? "welcome-big" : ""}`}>
      <div className="welcome-eyebrow">{U.welcome} · {U.room} {B.guest.room}</div>
      <h1 className="welcome-name">
        {lang === "tr" ? <>İyi ki buradasınız,<br /><em>{first}</em>.</> : <>So glad you're here,<br /><em>{first}</em>.</>}
      </h1>
      <p className="welcome-tag">{B.hotel.tagline[lang]}</p>
    </div>
  );
}

/* ---------- ANA EKRAN ---------- */
function Home({ lang, setLang, go, layout }) {
  const B = window.BOII;
  useAutoFocus("home-" + layout);
  return (
    <div className={`screen home layout-${layout}`}>
      <TopBar lang={lang} setLang={setLang} />
      <div className="home-bg" aria-hidden="true" />

      {layout === "grid" && (
        <main className="home-main grid-main">
          <WelcomeBlock lang={lang} />
          <div className="tile-grid">
            {B.tiles.map((t, i) => (
              <Tile key={t.id} tile={t} lang={lang} go={go} autoFocus={i === 0} />
            ))}
          </div>
        </main>
      )}

      {layout === "hero" && (
        <main className="home-main hero-main">
          <section className="hero-left">
            <WelcomeBlock lang={lang} big />
            <Tile tile={B.tiles.find((t) => t.id === "guide")} lang={lang} go={go} variant="tile-feature" autoFocus />
          </section>
          <section className="hero-right">
            {B.tiles.filter((t) => t.id !== "guide").map((t) => (
              <Tile key={t.id} tile={t} lang={lang} go={go} variant="tile-slim" />
            ))}
          </section>
        </main>
      )}

      {layout === "magazine" && (
        <main className="home-main mag-main">
          <section className="mag-banner">
            <WelcomeBlock lang={lang} big />
            <div className="mag-pick">
              <PhotoSlot id="home-pick" label="Sığacık · gün batımı" className="mag-pick-img" />
              <div className="mag-pick-meta">
                <span className="badge">{B.ui[lang].recommend}</span>
                <div className="mag-pick-title">{B.market.items[0][lang].t}</div>
                <div className="mag-pick-sub">{B.market.items[0][lang].s}</div>
              </div>
            </div>
          </section>
          <section className="mag-row">
            {B.tiles.map((t, i) => (
              <Tile key={t.id} tile={t} lang={lang} go={go} variant="tile-mag" autoFocus={i === 0} />
            ))}
          </section>
        </main>
      )}
    </div>
  );
}

/* ---------- Bölüm kabuğu ---------- */
function SectionShell({ lang, title, sub, onHome, children, className = "" }) {
  return (
    <div className={`screen section ${className}`}>
      <div className="section-head">
        <div className="section-head-text">
          <div className="section-eyebrow">Boii · {window.BOII.hotel.place}</div>
          <h2 className="section-title">{title}</h2>
          <p className="section-sub">{sub}</p>
        </div>
      </div>
      {children}
      <HintBar lang={lang} onHome={onHome} showHome />
    </div>
  );
}

/* ---------- OTEL BİLGİLERİ ---------- */
function HotelInfo({ lang, onHome }) {
  const D = window.BOII.hotelInfo, B = window.BOII, U = B.ui[lang];
  useAutoFocus("hotelinfo");
  return (
    <SectionShell lang={lang} title={D[lang].title} sub={D[lang].sub} onHome={onHome} className="sec-info">
      <main className="info-layout">
        <div className="info-grid">
          {D.rows.map((r, i) => (
            <Focusable key={i} id={`info-${i}`} className={`info-card ${r.wide ? "wide" : ""}`} autoFocus={i === 0} onSelect={() => {}}>
              <span className="info-ic"><Icon name={r.icon} size={1.5} /></span>
              <div className="info-text">
                <div className="info-t">{r[lang].t}</div>
                <div className="info-v">{r[lang].v}</div>
                <div className="info-n">{r[lang].n}</div>
              </div>
            </Focusable>
          ))}
        </div>
        <aside className="wifi-card">
          <Icon name="wifi" size={2.2} />
          <div className="wifi-label">WiFi</div>
          <div className="wifi-row"><span>{U.wifiNet}</span><b>{B.hotel.wifi.ssid}</b></div>
          <div className="wifi-row"><span>{U.wifiPass}</span><b>{B.hotel.wifi.pass}</b></div>
          <div className="wifi-note">{lang === "tr" ? "Tüm odalarda ve ortak alanlarda ücretsiz" : "Free in all rooms & common areas"}</div>
        </aside>
      </main>
      {D.comfortNote && (
        <div className="place-note info-comfort">
          <span className="place-note-ic"><Icon name="bed" size={1.5} /></span>
          <div className="place-note-text">
            <div className="place-note-t">{D.comfortNote[lang].t}</div>
            <div className="place-note-d">{D.comfortNote[lang].d}</div>
          </div>
        </div>
      )}
    </SectionShell>
  );
}

/* ---------- HİZMETLER ---------- */
function Services({ lang, onHome }) {
  const D = window.BOII.services;
  useAutoFocus("services");
  return (
    <SectionShell lang={lang} title={D[lang].title} sub={D[lang].sub} onHome={onHome} className="sec-service">
      <main className="service-grid">
        {D.items.map((s, i) => (
          <Focusable key={i} id={`svc-${i}`} className="service-card" autoFocus={i === 0} onSelect={() => {}}>
            <span className="service-ic"><Icon name={s.icon} size={1.7} /></span>
            <div className="service-t">{s[lang].t}</div>
            <div className="service-s">{s[lang].s}</div>
            <div className="service-cta"><Icon name="arrow" size={1} /> {lang === "tr" ? "Talep et" : "Request"}</div>
          </Focusable>
        ))}
      </main>
    </SectionShell>
  );
}

/* ---------- Görselli liste (Rehber / Pazar / Plaj) ---------- */
function PlaceList({ lang, onHome, D, className }) {
  useAutoFocus(className);
  return (
    <SectionShell lang={lang} title={D[lang].title} sub={D[lang].sub} onHome={onHome} className={className}>
      {D.intro && (
        <div className="place-note place-intro">
          <span className="place-note-ic"><Icon name="landmark" size={1.5} /></span>
          <div className="place-note-text">
            <div className="place-note-t">{D.intro[lang].t}</div>
            <div className="place-note-d">{D.intro[lang].d}</div>
          </div>
        </div>
      )}
      <main className="place-grid">
        {D.items.map((it, i) => (
          <Focusable key={i} id={`pl-${i}`} className="place-card" autoFocus={i === 0} onSelect={() => {}}>
            <div className="place-img">
              <PhotoSlot id={`${className}-${i}`} label={it.img} className="slot-fill" />
            </div>
            <div className="place-info">
              <div className="place-row">
                <div className="place-t">{it[lang].t}</div>
                {it[lang].meta && <div className="place-meta"><Icon name="pin" size={0.9} />{it[lang].meta}</div>}
              </div>
              <div className="place-s">{it[lang].s}</div>
              <div className="place-d">{it[lang].d}</div>
            </div>
          </Focusable>
        ))}
      </main>
      {D.note && (
        <div className="place-note">
          <span className="place-note-ic"><Icon name="dining" size={1.5} /></span>
          <div className="place-note-text">
            <div className="place-note-t">{D.note[lang].t}</div>
            {Array.isArray(D.note[lang].d)
              ? D.note[lang].d.map((line, i) => <div key={i} className="place-note-d">{line}</div>)
              : <div className="place-note-d">{D.note[lang].d}</div>}
          </div>
        </div>
      )}
    </SectionShell>
  );
}

/* ---------- ULAŞIM & MESAFE ---------- */
function Travel({ lang, onHome }) {
  const D = window.BOII.travel;
  useAutoFocus("travel");
  return (
    <SectionShell lang={lang} title={D[lang].title} sub={D[lang].sub} onHome={onHome} className="sec-travel">
      <main className="travel-layout">
        <div className="travel-list">
          {D.items.map((it, i) => (
            <Focusable key={i} id={`tr-${i}`} className="travel-row" autoFocus={i === 0} onSelect={() => {}}>
              <span className="travel-dot" />
              <div className="travel-name">
                <div className="travel-t">{it[lang].t}</div>
                <div className="travel-s">{it[lang].s}</div>
              </div>
              <div className="travel-km">{it.km}</div>
              <div className="travel-time"><Icon name="clock" size={1} />{lang === "tr" ? it.time : it.timeEn}</div>
            </Focusable>
          ))}
        </div>
      </main>
    </SectionShell>
  );
}

window.BoiiScreens = { Home, HotelInfo, Services, PlaceList, Travel, TopBar, HintBar };
