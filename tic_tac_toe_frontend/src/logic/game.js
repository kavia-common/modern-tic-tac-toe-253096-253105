export const WIN_LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

// PUBLIC_INTERFACE
export function checkWinner(board) {
  for (const line of WIN_LINES) {
    const [a,b,c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return { winner: null, line: null };
}

// PUBLIC_INTERFACE
export function isDraw(board) {
  return board.every(Boolean) && !checkWinner(board).winner;
}

// PUBLIC_INTERFACE
export function availableMoves(board) {
  const res = [];
  for (let i=0;i<board.length;i++) if (!board[i]) res.push(i);
  return res;
}
