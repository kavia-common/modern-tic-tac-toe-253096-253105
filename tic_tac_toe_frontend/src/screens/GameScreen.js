import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Scoreboard from "../components/Scoreboard";
import Board from "../components/Board";
import Timer from "../components/Timer";
import ResultModal from "../components/ResultModal";
import { useGame } from "../hooks/useGame";

export default function GameScreen() {
  const nav = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode || "pva";
  const level = location.state?.level || 1;

  const {
    board, current, scores, winner, winningLine, gameOver,
    modeLabel, timerSec, timerSeed,
    actions: { humanPlay, playAgain, onExpire, setSound, onUserInteracted }
  } = useGame({ mode: mode === "local" ? "local" : "pva", level, timerSec: 20 });

  useEffect(() => {
    if (gameOver) {
      // Also navigate to results route with state if desired (not mandatory)
      // We'll keep modal in place and allow user to decide.
    }
  }, [gameOver]);

  const handleCell = (idx) => {
    onUserInteracted();
    humanPlay(idx);
  };

  const handlePlayAgain = () => {
    onUserInteracted();
    playAgain();
  };

  const handleChangeLevel = () => {
    if (mode === "local") {
      nav("/", { replace: true });
    } else {
      nav("/level", { replace: true, state: { mode: "pva" } });
    }
  };

  const nextHint = current;

  return (
    <div className="container">
      <Header title="Game" onToggleSound={setSound} />
      <div className="card" style={{marginTop: 16}}>
        <Scoreboard scores={scores} currentPlayer={current} modeLabel={modeLabel} />
        <div className="mt-12">
          <Timer
            keySeed={`${timerSeed}-${current}`}
            durationSec={20}
            running={!gameOver}
            label={`Player ${current} Time`}
            onExpire={onExpire}
          />
        </div>
        <div className="mt-16" />
        <Board
          board={board}
          onPlay={handleCell}
          disabled={gameOver || (mode === "pva" && current === "O")} 
          winningLine={winningLine}
          nextHint={nextHint}
        />
        <div className="mt-16" style={{display:"flex", gap: 10}}>
          <button className="btn" onClick={handlePlayAgain}>Reset</button>
          <button className="btn ghost" onClick={handleChangeLevel}>Change Level</button>
        </div>
      </div>

      <ResultModal
        open={gameOver}
        outcome={winner || "draw"}
        onPlayAgain={handlePlayAgain}
        onChangeLevel={handleChangeLevel}
      />
    </div>
  );
}
