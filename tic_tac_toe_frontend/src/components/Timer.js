import React, { useEffect, useMemo, useRef, useState } from "react";

// PUBLIC_INTERFACE
export default function Timer({ keySeed, durationSec = 20, running = true, onExpire, label }) {
  const [remaining, setRemaining] = useState(durationSec);
  const lastTick = useRef(Date.now());
  const rafRef = useRef(null);

  useEffect(() => {
    setRemaining(durationSec);
    lastTick.current = Date.now();
  }, [keySeed, durationSec]);

  useEffect(() => {
    if (!running) return;
    let active = true;
    const tick = () => {
      if (!active) return;
      const now = Date.now();
      const dt = (now - lastTick.current) / 1000;
      lastTick.current = now;
      setRemaining((prev) => {
        const next = Math.max(0, prev - dt);
        if (next === 0) {
          active = false;
          if (typeof onExpire === "function") onExpire();
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      active = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running, onExpire]);

  const pct = useMemo(() => `${Math.round((remaining / durationSec) * 100)}%`, [remaining, durationSec]);

  return (
    <div>
      <div className="timer" aria-label="Turn timer">
        <div className="timer-bar" style={{ width: pct }} />
      </div>
      <div className="timer-label">{label ?? "Time Left"}: {Math.ceil(remaining)}s</div>
    </div>
  );
}
