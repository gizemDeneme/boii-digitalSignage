/* Boii TV — çekirdek: ölçekleyici, D-pad odak sistemi, ikonlar, placeholder */
const { useState, useEffect, useRef, useCallback, createContext, useContext } = React;

/* ---------- TV STAGE: 1920x1080 sabit kanvas, viewport'a ölçeklenir ---------- */
function TvStage({ children }) {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => {
      const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      setScale(s);
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  return (
    <div className="tv-viewport">
      <div className="tv-canvas" style={{ transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}

/* ---------- ODAK (D-PAD) SİSTEMİ ---------- */
const FocusCtx = createContext(null);
const useFocus = () => useContext(FocusCtx);

function FocusProvider({ children, onBack }) {
  const [focusId, setFocusId] = useState(null);
  const focusRef = useRef(null);
  focusRef.current = focusId;
  const onBackRef = useRef(onBack);
  onBackRef.current = onBack;

  const visibleFocusables = () =>
    Array.from(document.querySelectorAll("[data-focusable]")).filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    });

  const move = useCallback((dir) => {
    const all = visibleFocusables();
    if (!all.length) return;
    let cur = document.querySelector(`[data-fid="${focusRef.current}"]`);
    if (!cur || !all.includes(cur)) { setFocusId(all[0].dataset.fid); return; }
    const c = cur.getBoundingClientRect();
    const ccx = c.left + c.width / 2, ccy = c.top + c.height / 2;
    let best = null, bestScore = Infinity;
    for (const el of all) {
      if (el === cur) continue;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = cx - ccx, dy = cy - ccy;
      let primary, cross;
      if (dir === "right") { if (dx <= 6) continue; primary = dx; cross = Math.abs(dy); }
      else if (dir === "left") { if (dx >= -6) continue; primary = -dx; cross = Math.abs(dy); }
      else if (dir === "down") { if (dy <= 6) continue; primary = dy; cross = Math.abs(dx); }
      else { if (dy >= -6) continue; primary = -dy; cross = Math.abs(dx); }
      const score = primary + cross * 2.2;
      if (score < bestScore) { bestScore = score; best = el; }
    }
    if (best) setFocusId(best.dataset.fid);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      const k = e.key;
      if (k === "ArrowRight") { e.preventDefault(); move("right"); }
      else if (k === "ArrowLeft") { e.preventDefault(); move("left"); }
      else if (k === "ArrowUp") { e.preventDefault(); move("up"); }
      else if (k === "ArrowDown") { e.preventDefault(); move("down"); }
      else if (k === "Enter" || k === " ") {
        e.preventDefault();
        const cur = document.querySelector(`[data-fid="${focusRef.current}"]`);
        if (cur) cur.click();
      } else if (k === "Escape" || k === "Backspace") {
        e.preventDefault();
        onBackRef.current && onBackRef.current();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move]);

  return (
    <FocusCtx.Provider value={{ focusId, setFocusId }}>
      {children}
    </FocusCtx.Provider>
  );
}

/* Odaklanabilir sarmalayıcı. Fare ile üzerine gelince de odak alır. */
let _fidSeq = 0;
function Focusable({ id, className = "", onSelect, autoFocus, children, as = "div", ...rest }) {
  const { focusId, setFocusId } = useFocus();
  const fidRef = useRef(id || `f${++_fidSeq}`);
  const fid = fidRef.current;
  const focused = focusId === fid;
  useEffect(() => {
    if (autoFocus) setFocusId(fid);
  }, [autoFocus]);
  const Tag = as;
  return (
    <Tag
      data-focusable=""
      data-fid={fid}
      className={`focusable ${focused ? "is-focused" : ""} ${className}`}
      onMouseEnter={() => setFocusId(fid)}
      onClick={() => onSelect && onSelect()}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* Ekran değişince ilk (veya işaretli) öğeye odağı taşı */
function useAutoFocus(dep) {
  const { setFocusId } = useFocus();
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const def = document.querySelector('[data-focus-default="true"][data-focusable]');
      const first = def || document.querySelector("[data-focusable]");
      if (first) setFocusId(first.dataset.fid);
    });
    return () => cancelAnimationFrame(id);
  }, [dep]);
}

/* ---------- PLACEHOLDER GÖRSEL ---------- */
function Placeholder({ label, className = "", style }) {
  return (
    <div className={`ph ${className}`} style={style}>
      <div className="ph-stripes" />
      <span className="ph-label">{label}</span>
    </div>
  );
}

/* ---------- FOTO ALANI (kullanıcı sürükle-bırak) ---------- */
function PhotoSlot({ id, label, className = "", shape = "rect", style }) {
  return React.createElement("image-slot", {
    id, shape, placeholder: label,
    className: `slot ${className}`,
    style: { position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", ...style },
  });
}

/* ---------- İKONLAR (basit, çizgisel) ---------- */
const Icon = ({ name, size = 1 }) => {
  const s = { width: `${size}em`, height: `${size}em` };
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    hotel: <g {...p}><path d="M4 21V5l8-2 8 2v16" /><path d="M9 9h0M15 9h0M9 13h0M15 13h0" /><path d="M10 21v-4h4v4" /></g>,
    bell: <g {...p}><path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2H4.5L6 16Z" /><path d="M10 20a2 2 0 0 0 4 0" /></g>,
    phone: <g {...p}><path d="M7 4H5a1.5 1.5 0 0 0-1.5 1.6C4 13 11 20 18.4 20.5A1.5 1.5 0 0 0 20 19v-2.2a1 1 0 0 0-.8-1l-3-.6-1.8 1.8a12 12 0 0 1-5.4-5.4L10.8 10l-.6-3a1 1 0 0 0-1-.8Z" /></g>,
    compass: <g {...p}><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5 13 13l-4.5 2.5L11 11l4.5-2.5Z" /></g>,
    basket: <g {...p}><path d="M5 9h14l-1.4 9.5a2 2 0 0 1-2 1.5H8.4a2 2 0 0 1-2-1.5L5 9Z" /><path d="M9 9 12 4l3 5" /><path d="M10 13v3M14 13v3" /></g>,
    wave: <g {...p}><path d="M2 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2" /><path d="M2 17c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2" /></g>,
    route: <g {...p}><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="6" r="2.5" /><path d="M8 16.5 16 7.5" /><path d="M6 15.5V12a3 3 0 0 1 3-3h6" /></g>,
    coffee: <g {...p}><path d="M5 9h11v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9Z" /><path d="M16 10h2a2 2 0 0 1 0 5h-2" /><path d="M8 4v2M11 4v2" /></g>,
    clock: <g {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></g>,
    moon: <g {...p}><path d="M20 14a8 8 0 1 1-9-10 6 6 0 0 0 9 10Z" /></g>,
    leaf: <g {...p}><path d="M20 4S8 4 6 12s6 8 6 8 8-2 8-10c0-4-0-6 0-6Z" /><path d="M11 13c2-3 5-5 5-5" /></g>,
    car: <g {...p}><path d="M4 16v-3l2-5h12l2 5v3" /><path d="M3 16h18v2a1 1 0 0 1-1 1h-2v-3M6 19H4a1 1 0 0 1-1-1v-2" /><path d="M7 13h0M17 13h0" /></g>,
    tray: <g {...p}><path d="M4 15h16M3 18h18" /><path d="M8 15a4 4 0 0 1 8 0" /><path d="M12 11v-1" /></g>,
    broom: <g {...p}><path d="M14 4 9 9" /><path d="M5 19s-1-5 3-7 7 3 7 3l-4 4s-3 1-6 0Z" /><path d="M9 14l2 2" /></g>,
    towel: <g {...p}><rect x="6" y="4" width="12" height="16" rx="2" /><path d="M9 8h6M9 12h6" /></g>,
    door: <g {...p}><path d="M14 4H7a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h7" /><path d="M11 12v.01" /><path d="M17 8l4 4-4 4M21 12h-9" /></g>,
    smoking: <g {...p}><rect x="3" y="15" width="13" height="4" rx="1" /><path d="M12.5 15v4" /><path d="M19 5c.9.9 0 1.8.9 2.7M22 5c.9.9 0 1.8.9 2.7" /><path d="M19 15h3v4" /></g>,
    landmark: <g {...p}><path d="M3 9 12 4l9 5" /><path d="M5 11v7M9.5 11v7M14.5 11v7M19 11v7" /><path d="M4 11h16" /><path d="M3 20h18" /></g>,
    bed: <g {...p}><path d="M2 17v-4a2 2 0 0 1 2-2h11a4 4 0 0 1 4 4v2" /><path d="M2 10V6M22 17v-3" /><path d="M6 11V9h5v2" /><path d="M2 17h20" /></g>,
    dining: <g {...p}><path d="M5 3v5a2 2 0 0 0 4 0V3" /><path d="M7 8v13" /><path d="M17.5 3c1.6 1.4 2.2 3.6 2.2 6 0 1.3-.9 2-2.2 2V3Z" /><path d="M17.5 11v10" /></g>,
    alarm: <g {...p}><circle cx="12" cy="13" r="7" /><path d="M12 10v3l2 2" /><path d="M5 4 2 7M19 4l3 3" /></g>,
    taxi: <g {...p}><path d="M4 16v-3l2-5h12l2 5v3" /><path d="M3 16h18v2a1 1 0 0 1-1 1h-2v-3M6 19H4a1 1 0 0 1-1-1v-2" /><path d="M10 8V6h4v2" /></g>,
    pin: <g {...p}><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></g>,
    arrow: <g {...p}><path d="M5 12h14M13 6l6 6-6 6" /></g>,
    globe: <g {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></g>,
    wifi: <g {...p}><path d="M5 12.5a10 10 0 0 1 14 0M8 15.5a6 6 0 0 1 8 0" /><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" /></g>,
    sun: <g {...p}><circle cx="12" cy="12" r="4" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M18.5 5.5l-1.4 1.4M6.9 17.1l-1.4 1.4" /></g>,
  };
  return (
    <svg viewBox="0 0 24 24" style={s} className="icon" aria-hidden="true">
      {paths[name] || paths.pin}
    </svg>
  );
};

window.BoiiCore = { TvStage, FocusProvider, Focusable, useFocus, useAutoFocus, Placeholder, PhotoSlot, Icon };
