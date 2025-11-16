import React from "react";

/**
 * PUBLIC_INTERFACE
 * Scoreboard uses theme tokens for colors and spacing.
 */
export default function Scoreboard({ scores, currentPlayer, modeLabel }) {
  // Accent current player using X/O brand colors from theme
  const currentColor = currentPlayer === "X" ? "var(--x-color)" : "var(--o-color)";
  return (
    <div>
      <div className="scoreboard">
        <div className="score-item">
          <strong>Player X</strong>
          <span>{scores.X || 0}</span>
        </div>
        <div className="score-item">
          <strong>Draws</strong>
          <span>{scores.draws || 0}</span>
        </div>
        <div className="score-item">
          <strong>Player O</strong>
          <span>{scores.O || 0}</span>
        </div>
      </div>
      <div className="subtitle">
        {/* Theme mapping: Turn indicator uses x/o color */}
        Turn: <strong style={{ color: currentColor }}>{currentPlayer}</strong>
        {modeLabel ? <> • <span>{modeLabel}</span></> : null}
      </div>
    </div>
  );
}
