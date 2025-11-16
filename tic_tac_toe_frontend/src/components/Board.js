import React from "react";
import Cell from "./Cell";

// PUBLIC_INTERFACE
export default function Board({ board, onPlay, disabled, winningLine, nextHint }) {
  return (
    <div className="board" role="grid" aria-label="Tic-Tac-Toe Board">
      {board.map((v, i) => {
        const isWin = winningLine?.includes(i);
        const ghost = !v && !disabled ? nextHint : null;
        return (
          <Cell
            key={i}
            value={v}
            onClick={() => onPlay(i)}
            disabled={disabled || Boolean(v)}
            isWinning={Boolean(isWin)}
            ghost={ghost}
          />
        );
      })}
    </div>
  );
}
