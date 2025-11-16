import React from "react";

// PUBLIC_INTERFACE
export default function ResultModal({ open, outcome, onPlayAgain, onChangeLevel }) {
  if (!open) return null;
  const label = outcome === "draw" ? "It's a Draw" : outcome === "X" ? "X Wins!" : "O Wins!";
  const color =
    outcome === "draw" ? "var(--color-muted-text)" :
    outcome === "X" ? "var(--color-primary)" : "var(--color-secondary)";
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Game Result">
      <div className="modal">
        <h2 className="title" style={{color}}>Game Over</h2>
        <div className="subtitle" style={{marginBottom: 16}}>{label}</div>
        <div style={{display: "flex", gap: 10, justifyContent: "flex-end"}}>
          <button className="btn ghost" onClick={onChangeLevel}>Change Level</button>
          <button className="btn" onClick={onPlayAgain}>Play Again</button>
        </div>
      </div>
    </div>
  );
}
