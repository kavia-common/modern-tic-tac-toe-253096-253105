import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * MusicProvider manages background music playback using a single HTMLAudioElement.
 * - Loads /assets/audio/bg-music.mp3 (in public) and loops it with volume 0.25
 * - Respects autoplay policies (starts paused until first user gesture)
 * - Persists preference under localStorage key "app.music.enabled"
 * - Continues playing across visibility changes unless the user turned it OFF
 * - Graceful fallback when the audio asset is missing (no errors thrown)
 */
const MusicContext = createContext({
  enabled: false,
  ready: false,
  // PUBLIC_INTERFACE
  setEnabled: (_v) => {},
  // PUBLIC_INTERFACE
  requestStartAfterUserGesture: () => {},
});

const STORAGE_KEY = "app.music.enabled";
const AUDIO_SRC = "/assets/audio/bg-music.mp3";

export function MusicProvider({ children }) {
  const audioRef = useRef(null);
  const [enabled, setEnabledState] = useState(false);
  const [ready, setReady] = useState(false);
  const [firstGesture, setFirstGesture] = useState(false);
  const missingAssetRef = useRef(false);

  // Load stored preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "true") {
        setEnabledState(true);
      }
    } catch {
      // ignore
    }
  }, []);

  // Initialize audio element lazily
  useEffect(() => {
    if (!audioRef.current) {
      const el = new Audio();
      el.src = AUDIO_SRC;
      el.loop = true;
      el.volume = 0.25;
      el.preload = "auto";
      el.muted = true; // start muted to satisfy autoplay policies
      el.addEventListener("canplay", () => {
        setReady(true);
      });
      // Detect missing asset: onerror will fire if the file is not available
      el.addEventListener("error", () => {
        missingAssetRef.current = true;
        setReady(false);
      });
      audioRef.current = el;
    }

    return () => {
      if (audioRef.current) {
        // cleanup listeners to avoid leaks (though provider lifespan usually matches app)
        audioRef.current.pause();
      }
    };
  }, []);

  // Persist preference
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(enabled));
    } catch {
      // ignore
    }
  }, [enabled]);

  // Playback control logic based on enabled + firstGesture + asset availability
  const tryPlay = useCallback(async () => {
    const el = audioRef.current;
    if (!el || missingAssetRef.current) return;
    try {
      el.muted = false;
      await el.play();
    } catch {
      // If autoplay still blocked, keep muted until next attempt
      el.muted = true;
    }
  }, []);

  const tryPause = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    try {
      el.pause();
    } catch {
      // ignore
    }
  }, []);

  // Apply playback upon state changes
  useEffect(() => {
    if (!audioRef.current || missingAssetRef.current) return;
    if (!firstGesture) {
      // Ensure paused until the first gesture; keep muted
      tryPause();
      return;
    }
    if (enabled) {
      tryPlay();
    } else {
      tryPause();
    }
  }, [enabled, firstGesture, tryPlay, tryPause]);

  // Keep playing across visibility changes unless user turned OFF
  useEffect(() => {
    const handleVisibility = () => {
      // Do not change state if user turned it off
      if (!enabled || missingAssetRef.current) return;
      // If returning to visible and enabled, attempt to resume
      if (!document.hidden) {
        tryPlay();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [enabled, tryPlay]);

  const setEnabled = useCallback((v) => {
    setEnabledState(Boolean(v));
    if (!v) {
      tryPause();
    } else if (firstGesture) {
      tryPlay();
    }
  }, [firstGesture, tryPause, tryPlay]);

  // PUBLIC_INTERFACE
  const requestStartAfterUserGesture = useCallback(() => {
    if (!firstGesture) {
      setFirstGesture(true);
      if (enabled) {
        // Try to start if preference is ON
        tryPlay();
      }
    }
  }, [enabled, firstGesture, tryPlay]);

  const value = useMemo(() => ({
    enabled,
    ready: ready && !missingAssetRef.current,
    setEnabled,
    requestStartAfterUserGesture,
  }), [enabled, ready, setEnabled, requestStartAfterUserGesture]);

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useMusic() {
  return useContext(MusicContext);
}
