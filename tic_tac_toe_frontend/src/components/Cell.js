import React from "react";

/**
 * PUBLIC_INTERFACE
 * Cell renders X/O marks. Colors map to --x-color and --o-color for consistency.
 */
export default function Cell({ value, onClick, disabled, isWinning, ghost }) {
  // Theme-aware mark color mapping
  const markStyle =
    value === "X" ? { color: "var(--x-color)", textShadow: "0 2px 10px rgba(0,0,0,0.35)" } :
    value === "O" ? { color: "var(--o-color)", textShadow: "0 2px 10px rgba(0,0,0,0.35)" } :
    { textShadow: "0 2px 10px rgba(0,0,0,0.35)" };

  return (
    <button
      className={`cell ${disabled ? "disabled" : ""} ${isWinning ? "winning" : ""}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={`Cell ${value || "empty"}`}
    >
      <span style={markStyle}>{value}</span>
      {/* Theme hint: ghost mark uses primary, set in CSS to use --primary */}
      {!value && ghost ? <div className="ghost-mark" aria-hidden>{ghost}</div> : null}
    </button>
  );
}
