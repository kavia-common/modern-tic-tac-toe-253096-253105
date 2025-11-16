import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function ResultsScreen() {
  const nav = useNavigate();
  const location = useLocation();
  const outcome = location.state?.outcome ?? "draw";

  const label = outcome === "draw" ? "It's a Draw" : `${outcome} Wins!`;

  return (
    <div className="container">
      <Header title="Results" />
      <div className="card" style={{marginTop: 16}}>
        <h2 className="title">{label}</h2>
        <div className="subtitle">Play again or change level to try a different challenge.</div>
        <div style={{display:"flex", gap:10, marginTop: 12, flexWrap: "wrap"}}>
          <button className="btn" onClick={() => nav("/game", { replace: true })}>Play Again</button>
          <button className="btn ghost" onClick={() => nav("/level", { replace: true })}>Change Level</button>
        </div>
      </div>
    </div>
  );
}
