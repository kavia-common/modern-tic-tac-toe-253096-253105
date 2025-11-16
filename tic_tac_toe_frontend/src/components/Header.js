import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// PUBLIC_INTERFACE
export default function Header({ title = "Tic-Tac-Toe", onToggleSound }) {
  const nav = useNavigate();
  const [soundOn, setSoundOn] = useState(true);
  const location = useLocation();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ttt-sound");
      if (stored === "off") setSoundOn(false);
    } catch { /* noop */ }
  }, []);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    try { localStorage.setItem("ttt-sound", next ? "on" : "off"); } catch {}
    if (typeof onToggleSound === "function") onToggleSound(next);
  };

  return (
    <div className="header">
      <div className="brand" role="button" onClick={() => nav("/")}>
        <div className="brand-badge">TTT</div>
        <div>
          <div style={{fontWeight: 800}}>{title}</div>
          <div style={{fontSize: 12, color: "var(--color-muted-text)"}}>Ocean Professional</div>
        </div>
      </div>
      <div style={{display: "flex", gap: 8}}>
        {location.pathname !== "/" && (
          <button className="btn ghost" onClick={() => nav("/")}>Home</button>
        )}
        <button className="btn secondary" onClick={toggleSound} aria-pressed={soundOn}>
          {soundOn ? "🔊 Sound On" : "🔇 Sound Off"}
        </button>
      </div>
    </div>
  );
}
