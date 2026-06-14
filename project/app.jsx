/* Boii TV — ana uygulama */
const { useState, useEffect } = React;
const { TvStage, FocusProvider } = window.BoiiCore;
const { Home, HotelInfo, Services, PlaceList, Travel } = window.BoiiScreens;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "homeLayout": "grid",
  "accent": ["#b0613e", "#7d7a4e"],
  "displayFont": "Spectral",
  "language": "tr"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = useState("home");
  const [lang, setLang] = useState(t.language || "tr");

  // tweak dilini uygula
  useEffect(() => { if (t.language && t.language !== lang) setLang(t.language); }, [t.language]);

  // tema değişkenleri
  const accent = Array.isArray(t.accent) ? t.accent : [t.accent, "#7d7a4e"];
  const themeStyle = {
    "--accent": accent[0],
    "--accent2": accent[1] || accent[0],
    "--font-display": `"${t.displayFont}", Georgia, serif`,
  };

  const go = (id) => setScreen(id);
  const onHome = () => setScreen("home");
  const onBack = () => { if (screen !== "home") setScreen("home"); };

  const B = window.BOII;
  let view;
  if (screen === "home") view = <Home lang={lang} setLang={setLang} go={go} layout={t.homeLayout} />;
  else if (screen === "hotel") view = <HotelInfo lang={lang} onHome={onHome} />;
  else if (screen === "guide") view = <PlaceList lang={lang} onHome={onHome} D={B.guide} className="sec-guide" />;
  else if (screen === "market") view = <PlaceList lang={lang} onHome={onHome} D={B.market} className="sec-market" />;
  else if (screen === "beaches") view = <PlaceList lang={lang} onHome={onHome} D={B.beaches} className="sec-beach" />;
  else if (screen === "travel") view = <Travel lang={lang} onHome={onHome} />;

  return (
    <div className="app-root" style={themeStyle}>
      <TvStage>
        <FocusProvider onBack={onBack}>
          <div key={screen} className="screen-anim">{view}</div>
        </FocusProvider>
      </TvStage>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Ana ekran düzeni" />
        <TweakRadio label="Yön" value={t.homeLayout}
          options={[{ value: "grid", label: "Izgara" }, { value: "hero", label: "Manşet" }, { value: "magazine", label: "Dergi" }]}
          onChange={(v) => setTweak("homeLayout", v)} />

        <TweakSection label="Renk & tipografi" />
        <TweakColor label="Aksan" value={t.accent}
          options={[["#b0613e", "#7d7a4e"], ["#a8553a", "#9a7b3f"], ["#8c6a4e", "#5f7060"], ["#c2724a", "#386a6a"]]}
          onChange={(v) => setTweak("accent", v)} />
        <TweakSelect label="Başlık fontu" value={t.displayFont}
          options={["Spectral", "Cormorant Garamond", "Lora", "Marcellus"]}
          onChange={(v) => setTweak("displayFont", v)} />

        <TweakSection label="Dil" />
        <TweakRadio label="Varsayılan" value={lang}
          options={[{ value: "tr", label: "Türkçe" }, { value: "en", label: "English" }]}
          onChange={(v) => { setLang(v); setTweak("language", v); }} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
