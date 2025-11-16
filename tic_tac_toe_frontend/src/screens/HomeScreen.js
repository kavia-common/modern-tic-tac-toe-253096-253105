import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function HomeScreen() {
  const nav = useNavigate();

  return (
    <div className="container">
      <Header title="Tic-Tac-Toe" />
      <div className="hero" style={{marginTop: 16}}>
        <h1 className="title">Play Tic-Tac-Toe</h1>
        <div className="subtitle">Modern, responsive, and fun — choose your mode below.</div>
        <div style={{display:"flex", gap: 12, flexWrap: "wrap", marginTop: 12}}>
          <button className="btn" onClick={() => nav("/level", { state: { mode: "pva" } })}>
            Player vs AI
          </button>
          <button className="btn secondary" onClick={() => nav("/game", { state: { mode: "local" } })}>
            Local 2-Player
          </button>
        </div>
      </div>
    </div>
  );
}
