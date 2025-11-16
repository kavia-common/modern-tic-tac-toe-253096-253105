function particle(x, y) {
  const el = document.createElement("div");
  el.style.position = "fixed";
  el.style.left = x + "px";
  el.style.top = y + "px";
  el.style.width = "8px";
  el.style.height = "8px";
  el.style.background = ["#2563EB", "#F59E0B", "#10B981", "#EF4444"][Math.floor(Math.random()*4)];
  el.style.borderRadius = "2px";
  el.style.pointerEvents = "none";
  el.style.zIndex = "100";
  el.style.transform = `translate(-50%, -50%) rotate(${Math.random()*360}deg)`;
  el.style.opacity = "0.9";
  document.body.appendChild(el);

  const angle = Math.random() * Math.PI * 2;
  const distance = 60 + Math.random() * 120;
  const dx = Math.cos(angle) * distance;
  const dy = Math.sin(angle) * distance + 30;
  const duration = 700 + Math.random()*500;

  const start = performance.now();
  function step(now) {
    const t = Math.min(1, (now - start) / duration);
    el.style.transform = `translate(${dx*t - 50}%, ${dy*t - 50}%) rotate(${t*720}deg)`;
    el.style.opacity = String(0.9 * (1 - t));
    if (t < 1) requestAnimationFrame(step);
    else el.remove();
  }
  requestAnimationFrame(step);
}

// PUBLIC_INTERFACE
export function fireConfetti() {
  try {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 3;
    for (let i=0;i<36;i++) particle(cx, cy);
  } catch {
    // graceful no-op
  }
}
