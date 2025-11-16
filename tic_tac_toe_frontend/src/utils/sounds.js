let clickAudio;
let winAudio;

// Initialize lazily to comply with user gesture policies
function ensureInit() {
  if (!clickAudio) {
    clickAudio = new Audio();
    clickAudio.src = "data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAAAAAA"; // silent tiny placeholder; will be inaudible
    clickAudio.volume = 0.1;
  }
  if (!winAudio) {
    winAudio = new Audio();
    winAudio.src = "data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAAAAAA"; // silent placeholder
    winAudio.volume = 0.1;
  }
}

// PUBLIC_INTERFACE
export function playClick() {
  try {
    ensureInit();
    clickAudio.currentTime = 0;
    clickAudio.play().catch(() => {});
  } catch {}
}

// PUBLIC_INTERFACE
export function playWin() {
  try {
    ensureInit();
    winAudio.currentTime = 0;
    winAudio.play().catch(() => {});
  } catch {}
}
