import React from "react";

// PUBLIC_INTERFACE
export default function Cell({ value, onClick, disabled, isWinning, ghost }) {
  return (
    <button
      className={`cell ${disabled ? "disabled" : ""} ${isWinning ? "winning" : ""}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={`Cell ${value || "empty"}`}
    >
      {value}
      {!value && ghost ? <div className="ghost-mark">{ghost}</div> : null}
    </button>
  );
}
