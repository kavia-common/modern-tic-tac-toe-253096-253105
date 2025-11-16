import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MusicToggle from "./MusicToggle";
import { useMusic } from "../context/MusicContext";

/**
 * PUBLIC_INTERFACE
 * Header component displaying title and actions.
 * Uses theme variables for colors and spacing from assets/theme.css.
 * Integrates MusicToggle in the actions area.
 */
export default function Header({ title = "Tic-Tac-Toe" }) {
  const nav = useNavigate();
  const location = useLocation();
  const { requestStartAfterUserGesture } = useMusic();

  const handleNavHome = () => {
    requestStartAfterUserGesture();
    nav("/");
  };

  return (
    <div className="header">
      <div
        className="brand"
        role="button"
        tabIndex={0}
        onClick={handleNavHome}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleNavHome();
        }}
        title="Go to Home"
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
          <button className="btn ghost" onClick={handleNavHome} title="Home">
            Home
          </button>
        )}
        <MusicToggle />
      </div>
    </div>
  );
}
