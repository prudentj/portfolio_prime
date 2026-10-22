// The only client JS: mode switch, CV view switch, scroll reveals, and (party mode only) a Game of Life background.
const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const isParty = () => root.dataset.mode === 'party';
const save = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* storage blocked: still works for this visit */ } };

/* ---------- Business / Party ---------- */
const modeSwitches = document.querySelectorAll('[data-mode-switch]');
function setMode(mode) {
  if (mode === 'party') root.dataset.mode = 'party'; else delete root.dataset.mode;
  save('jp-mode', mode);
  sync();
  life.update();
}
modeSwitches.forEach((b) => b.addEventListener('click', () => setMode(isParty() ? 'business' : 'party')));

/* ---------- Concise / Expanded CV ---------- */
const cvSwitches = document.querySelectorAll('[data-cv-switch]');
const isExpanded = () => root.dataset.cv === 'expanded';
function setCv(view, remember = true) {
  root.dataset.cv = view;
  if (remember) save('jp-cv', view);
  sync();
}
cvSwitches.forEach((b) => b.addEventListener('click', () => setCv(isExpanded() ? 'concise' : 'expanded')));
document.querySelectorAll('[data-cv-open]').forEach((a) => a.addEventListener('click', (e) => {
  const cv = document.getElementById('cv');
  if (!cv) return;
  e.preventDefault();
  setCv('expanded');
  cv.scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth' });
  history.replaceState(null, '', '#cv');
}));
document.querySelectorAll('[data-print]').forEach((b) => b.addEventListener('click', () => window.print()));

function sync() {
  modeSwitches.forEach((b) => b.setAttribute('aria-pressed', String(isParty())));
  cvSwitches.forEach((b) => b.setAttribute('aria-pressed', String(isExpanded())));
}

/* ---------- Scroll reveals (progressive: content is visible unless .js-reveal is set) ---------- */
window.__jpReveal = true;
if (root.classList.contains('js-reveal')) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}

/* ---------- Game of Life (party mode only; paused when hidden or reduced motion) ---------- */
const life = (() => {
  const CELL = 16, TICK = 170, hasLife = !!document.querySelector('[data-life]');
  let canvas, ctx, cols, rows, grid, next, raf = 0, last = 0, gen = 0, gliders = 0;
  const counter = document.querySelector('[data-glider-count]');

  function size() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cols = Math.ceil(innerWidth / CELL); rows = Math.ceil(innerHeight / CELL);
    canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    grid = new Uint8Array(cols * rows); next = new Uint8Array(cols * rows);
    for (let i = 0; i < grid.length; i++) grid[i] = Math.random() < 0.12 ? 1 : 0;
  }
  function step() {
    let alive = 0;
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      let n = 0;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        if (dx || dy) n += grid[((y + dy + rows) % rows) * cols + ((x + dx + cols) % cols)];
      }
      const i = y * cols + x, v = grid[i] ? (n === 2 || n === 3) : n === 3;
      next[i] = v ? 1 : 0; alive += next[i];
    }
    [grid, next] = [next, grid];
    gen++;
    if (alive < cols * rows * 0.02 || gen % 400 === 0) for (let k = 0; k < 4; k++) glider(Math.random() * cols | 0, Math.random() * rows | 0, false);
  }
  function draw() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    const cs = getComputedStyle(root);
    const a = cs.getPropertyValue('--life-a').trim() || '#FF48B0', b = cs.getPropertyValue('--life-b').trim() || '#0078BF';
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      if (!grid[y * cols + x]) continue;
      ctx.fillStyle = (x + y) % 2 ? a : b;
      ctx.fillRect(x * CELL + 3, y * CELL + 3, CELL - 5, CELL - 5);
    }
  }
  function loop(t) {
    raf = requestAnimationFrame(loop);
    if (t - last < TICK) return;
    last = t; step(); draw();
  }
  function glider(cx, cy, count = true) {
    if (!grid) return;
    [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]].forEach(([dx, dy]) => {
      grid[((cy + dy) % rows) * cols + ((cx + dx) % cols)] = 1;
    });
    if (count && counter) counter.textContent = String(++gliders);
  }
  function running() { return hasLife && isParty() && !reduce.matches && !document.hidden; }
  function update() {
    if (running()) {
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.className = 'life'; canvas.setAttribute('aria-hidden', 'true');
        ctx = canvas.getContext('2d');
        document.body.prepend(canvas);
        size(); addEventListener('resize', () => { if (canvas) { size(); draw(); } });
      }
      canvas.hidden = false;
      if (!raf) raf = requestAnimationFrame(loop);
    } else {
      cancelAnimationFrame(raf); raf = 0;
      if (canvas && !isParty()) canvas.hidden = true;
    }
  }
  document.addEventListener('visibilitychange', update);
  reduce.addEventListener?.('change', update);
  // Click the hero, or press the button, to launch a glider.
  document.querySelector('.hero')?.addEventListener('click', (e) => {
    if (!running() || e.target.closest('a,button')) return;
    glider(e.clientX / CELL | 0, e.clientY / CELL | 0);
  });
  document.querySelector('[data-launch-glider]')?.addEventListener('click', () => {
    if (!running()) return;
    glider(Math.random() * cols | 0, Math.random() * (rows / 3) | 0);
  });
  return { update };
})();

sync();
life.update();
