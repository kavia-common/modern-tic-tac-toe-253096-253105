import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import LevelSelector from "../components/LevelSelector";
import { useMusic } from "../context/MusicContext";

export default function LevelSelectScreen() {
  const nav = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode || "pva";
  const { requestStartAfterUserGesture } = useMusic();

  const handleSelect = (level) => {
    requestStartAfterUserGesture();
    nav("/game", { state: { mode, level } });
  };

  return (
    <div className="container">
      <Header title="Select Level" />
      <div className="card" style={{marginTop: 16}}>
        <h2 className="title">Choose AI Difficulty</h2>
        <div className="subtitle">Pick a challenge level and start playing.</div>
        <LevelSelector onSelect={handleSelect} />
      </div>
    </div>
  );
}
