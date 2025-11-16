import React from "react";
import { useMusic } from "../context/MusicContext";

/**
 * PUBLIC_INTERFACE
 * MusicToggle displays ON/OFF state and toggles background music.
 * - Uses theme-aware button classes (.btn .secondary)
 * - Adds aria-pressed for accessibility
 * - Shows a title tooltip; if asset missing (not ready), informs the user gracefully
 */
export default function MusicToggle() {
  const { enabled, setEnabled, ready } = useMusic();
  const label = enabled ? "🎵 Music ON" : "🔇 Music OFF";
  const title = ready
    ? "Toggle background music"
    : "Background music file missing. Add public/assets/audio/bg-music.mp3 to enable.";

  return (
    <button
      className="btn secondary"
      onClick={() => setEnabled(!enabled)}
      aria-pressed={enabled}
      title={title}
      type="button"
    >
      {label}
    </button>
  );
}
