import React from "react";

// PUBLIC_INTERFACE
export default function LevelSelector({ onSelect }) {
  const levels = [
    { id: 1, name: "Level 1 - Easy", desc: "Random moves. Great for warming up.", badge: "🎈" },
    { id: 2, name: "Level 2 - Medium", desc: "Blocks and prefers center/corners.", badge: "🧩" },
    { id: 3, name: "Level 3 - Hard", desc: "Minimax optimal. Can you beat it?", badge: "🧠" },
  ];
  return (
    <div className="grid grid-3">
      {levels.map((lvl) => (
        <div className="card" key={lvl.id} style={{display: "flex", flexDirection: "column", gap: 8}}>
          <div style={{display:"flex", alignItems:"center", gap:10}}>
            <div className="brand-badge" aria-hidden>{lvl.badge}</div>
            <div style={{fontWeight:800, color:"var(--color-text-strong)"}}>{lvl.name}</div>
          </div>
          <div className="subtitle">{lvl.desc}</div>
          <button className="btn" onClick={() => onSelect(lvl.id)}>
            Play {lvl.id === 1 ? "🙂" : lvl.id === 2 ? "😼" : "😈"}
          </button>
        </div>
      ))}
    </div>
  );
}
