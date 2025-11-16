import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { checkWinner, isDraw } from "../logic/game";
import { getBestMove } from "../logic/ai";
import { playClick, playWin } from "../utils/sounds";
import { fireConfetti } from "../utils/confetti";

const INITIAL_BOARD = Array(9).fill(null);

// PUBLIC_INTERFACE
export function useGame({ mode = "pva", level = 1, timerSec = 20 }) {
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [current, setCurrent] = useState("X");
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [timerSeed, setTimerSeed] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [firstInteraction, setFirstInteraction] = useState(false);

  const aiThinking = useRef(false);
  const modeLabel = useMemo(() => mode === "pva" ? `Player vs AI • L${level}` : "Local 2-Player", [mode, level]);

  useEffect(() => {
    try {
      const s = localStorage.getItem("ttt-sound");
      if (s === "off") setSoundOn(false);
    } catch {}
  }, []);

  // Reset timer after valid move
  const resetTimer = useCallback(() => setTimerSeed(s => s + 1), []);

  const checkEndState = useCallback((nextBoard) => {
    const res = checkWinner(nextBoard);
    if (res.winner) {
      setWinner(res.winner);
      setWinningLine(res.line);
      setGameOver(true);
      setScores((prev) => ({ ...prev, [res.winner]: (prev[res.winner] || 0) + 1 }));
      if (soundOn && firstInteraction) playWin();
      fireConfetti();
      return true;
    }
    if (isDraw(nextBoard)) {
      setWinner("draw");
      setWinningLine(null);
      setGameOver(true);
      setScores((prev) => ({ ...prev, draws: (prev.draws || 0) + 1 }));
      return true;
    }
    return false;
  }, [soundOn, firstInteraction]);

  const makeMove = useCallback((idx, mark) => {
    setBoard(prev => {
      if (prev[idx]) return prev;
      const next = prev.slice();
      next[idx] = mark;
      return next;
    });
  }, []);

  const humanPlay = useCallback((idx) => {
    if (gameOver || aiThinking.current) return;
    setBoard(prev => {
      if (prev[idx]) return prev;
      const next = prev.slice();
      next[idx] = current;
      if (soundOn && firstInteraction) playClick();
      return next;
    });
    resetTimer();
  }, [current, gameOver, resetTimer, soundOn, firstInteraction]);

  // Turn progression and AI move
  useEffect(() => {
    const res = checkWinner(board);
    if (res.winner || isDraw(board)) {
      // on every board mutation, finalize if ended (scores handled in checkEndState from nextPlay)
      setWinner(res.winner || (isDraw(board) ? "draw" : null));
      setWinningLine(res.line || null);
      const ended = res.winner || isDraw(board);
      if (ended && !gameOver) {
        setGameOver(true);
        if (res.winner) {
          setScores(prev => ({ ...prev, [res.winner]: (prev[res.winner] || 0) + 1 }));
          if (soundOn && firstInteraction) playWin();
          fireConfetti();
        } else {
          setScores(prev => ({ ...prev, draws: (prev.draws || 0) + 1 }));
        }
      }
      return;
    }
    // Switch to next player when last move placed
    const countX = board.filter(v => v === "X").length;
    const countO = board.filter(v => v === "O").length;
    const nextTurn = countX > countO ? "O" : "X";
    setCurrent(nextTurn);

    // If AI's turn
    if (mode === "pva" && nextTurn === "O") {
      aiThinking.current = true;
      const doAi = () => {
        const move = getBestMove(board, "O", level);
        if (move !== null && !gameOver) {
          setTimeout(() => {
            setBoard(prev => {
              if (prev[move]) return prev;
              const next = prev.slice();
              next[move] = "O";
              return next;
            });
            resetTimer();
            aiThinking.current = false;
          }, 300);
        } else {
          aiThinking.current = false;
        }
      };
      doAi();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board.join(","), mode, level]);

  // Timer expiration: opponent wins on timeout
  const onExpire = useCallback(() => {
    if (gameOver) return;
    const opp = current === "X" ? "O" : "X";
    setWinner(opp);
    setWinningLine(null);
    setGameOver(true);
    setScores(prev => ({ ...prev, [opp]: (prev[opp] || 0) + 1 }));
  }, [current, gameOver]);

  const playAgain = useCallback(() => {
    setBoard(INITIAL_BOARD);
    setCurrent("X");
    setWinner(null);
    setWinningLine(null);
    setGameOver(false);
    resetTimer();
  }, [resetTimer]);

  const changeLevel = useCallback(() => {
    // for router to navigate, handled in screen
  }, []);

  const setSound = useCallback((v) => {
    setSoundOn(v);
  }, []);

  const onUserInteracted = useCallback(() => {
    if (!firstInteraction) setFirstInteraction(true);
  }, [firstInteraction]);

  return {
    board, current, scores, winner, winningLine, gameOver,
    modeLabel, timerSec, timerSeed,
    actions: {
      humanPlay, playAgain, changeLevel, onExpire, setSound, onUserInteracted
    }
  };
}
