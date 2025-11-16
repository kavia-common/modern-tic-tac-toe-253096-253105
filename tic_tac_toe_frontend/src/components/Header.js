import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * Header component displaying title and actions.
 * Uses theme variables for colors and spacing from assets/theme.css.
 */
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
      <div
        className="brand"
        role="button"
        tabIndex={0}
        onClick={() => nav("/")}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && nav("/")}
      >
        <div className="brand-badge" aria-hidden>TTT</div>
        <div>
          {/* Theme mapping: primary text */}
          <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>{title}</div>
          {/* Theme mapping: secondary text */}
          <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>Ocean Professional</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
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
