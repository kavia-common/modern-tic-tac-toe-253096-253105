import { availableMoves, checkWinner, isDraw } from "./game";

function randomOf(arr) {
  return arr.length ? arr[Math.floor(Math.random() * arr.length)] : null;
}

function opponent(p) { return p === "X" ? "O" : "X"; }

// Level 2 heuristic: attempt win, then block (80%), then center, corners, edges, with slight randomness
function level2(board, player) {
  const moves = availableMoves(board);
  // Try to win
  for (const m of moves) {
    const b = board.slice();
    b[m] = player;
    if (checkWinner(b).winner === player) return m;
  }
  // Try to block opponent (80% of time to feel medium)
  if (Math.random() < 0.8) {
    const opp = opponent(player);
    for (const m of moves) {
      const b = board.slice();
      b[m] = opp;
      if (checkWinner(b).winner === opp) return m;
    }
  }
  const center = 4;
  if (moves.includes(center) && Math.random() < 0.9) return center;

  const corners = [0,2,6,8].filter(i => moves.includes(i));
  if (corners.length) {
    if (Math.random() < 0.7) return randomOf(corners);
  }
  const edges = [1,3,5,7].filter(i => moves.includes(i));
  return randomOf(edges.length ? edges : moves);
}

// Minimax for 3x3 Tic-Tac-Toe (optimal)
function minimax(board, player, maximizingPlayer, depth = 0) {
  const { winner } = checkWinner(board);
  if (winner === player) return { score: 10 - depth };
  if (winner === opponent(player)) return { score: depth - 10 };
  if (isDraw(board)) return { score: 0 };

  const moves = availableMoves(board);
  let bestMove = null;

  if (maximizingPlayer) {
    let bestScore = -Infinity;
    for (const m of moves) {
      const b = board.slice();
      b[m] = player;
      const res = minimax(b, player, false, depth + 1);
      if (res.score > bestScore) {
        bestScore = res.score;
        bestMove = m;
      }
    }
    return { score: bestScore, move: bestMove };
  } else {
    let bestScore = Infinity;
    const opp = opponent(player);
    for (const m of moves) {
      const b = board.slice();
      b[m] = opp;
      const res = minimax(b, player, true, depth + 1);
      if (res.score < bestScore) {
        bestScore = res.score;
        bestMove = m;
      }
    }
    return { score: bestScore, move: bestMove };
  }
}

// PUBLIC_INTERFACE
export function getBestMove(board, player, level = 1) {
  const moves = availableMoves(board);
  if (moves.length === 0) return null;

  if (level === 1) {
    return randomOf(moves);
  }
  if (level === 2) {
    return level2(board, player);
  }
  // level 3: minimax optimal
  const { move } = minimax(board, player, true, 0);
  return move ?? randomOf(moves);
}
