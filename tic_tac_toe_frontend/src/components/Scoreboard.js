import React from "react";

// PUBLIC_INTERFACE
export default function Scoreboard({ scores, currentPlayer, modeLabel }) {
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
        Turn: <strong style={{color: "var(--color-primary-200)"}}>{currentPlayer}</strong>
        {modeLabel ? <> • <span>{modeLabel}</span></> : null}
      </div>
    </div>
  );
}
