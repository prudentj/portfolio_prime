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

/* ---------- Party-mode windows: minimise, expand (modal), close (restorable from the tray) ---------- */
(() => {
  const wins = document.querySelectorAll('main > section[data-file]');
  if (!wins.length) return;
  const tray = document.createElement('div');
  tray.className = 'win-tray'; tray.setAttribute('role', 'toolbar'); tray.setAttribute('aria-label', 'Closed windows');
  document.body.append(tray);
  let dialog, lastFocus;

  const btn = (kind, label, glyph) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'win-btn'; b.dataset.win = kind;
    b.setAttribute('aria-label', label); b.textContent = glyph;
    return b;
  };

  function openModal(win, name, trigger) {
    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.className = 'win-dialog';
      dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); }); // backdrop
      dialog.addEventListener('close', () => {
        document.querySelectorAll('[data-win="expand"]').forEach((b) => b.setAttribute('aria-expanded', 'false'));
        lastFocus?.focus();
      });
      document.body.append(dialog);
    }
    const body = document.createElement('div');
    body.className = 'win-body';
    [...win.children].filter((c) => !c.classList.contains('winbar')).forEach((c) => body.append(c.cloneNode(true)));
    // The copy is for reading: no duplicate ids, no dead controls.
    body.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
    body.querySelectorAll('button').forEach((el) => el.remove());
    const bar = document.createElement('div');
    bar.className = 'winbar';
    const title = document.createElement('span'); title.className = 'win-title'; title.textContent = name;
    const close = btn('dismiss', `Close ${name} pop-up`, '×');
    close.addEventListener('click', () => dialog.close());
    bar.append(title, close);
    dialog.replaceChildren(bar, body);
    dialog.setAttribute('aria-label', name);
    lastFocus = trigger;
    trigger.setAttribute('aria-expanded', 'true');
    dialog.showModal(); // modal: background is inert, Esc closes
    close.focus();
    dialog.scrollTop = 0;
  }

  wins.forEach((win) => {
    const name = win.dataset.file;
    const bar = document.createElement('div');
    bar.className = 'winbar';
    const title = document.createElement('span'); title.className = 'win-title'; title.textContent = name;
    const group = document.createElement('div'); group.className = 'win-btns';
    const min = btn('min', `Minimise ${name}`, '_');
    const max = btn('expand', `Expand ${name}`, '□');
    const cls = btn('close', `Close ${name}`, '×');
    min.setAttribute('aria-pressed', 'false');
    max.setAttribute('aria-haspopup', 'dialog'); max.setAttribute('aria-expanded', 'false');
    group.append(min, max, cls);
    bar.append(title, group);
    win.prepend(bar);

    const setMin = (on) => { win.classList.toggle('win-min', on); min.setAttribute('aria-pressed', String(on)); };
    min.addEventListener('click', () => setMin(!win.classList.contains('win-min')));
    bar.addEventListener('click', (e) => { if (e.target === bar || e.target === title) { if (win.classList.contains('win-min')) setMin(false); } });
    max.addEventListener('click', () => openModal(win, name, max));
    cls.addEventListener('click', () => {
      win.classList.add('win-closed');
      const r = document.createElement('button');
      r.type = 'button'; r.textContent = `↺ ${name}`; r.setAttribute('aria-label', `Restore ${name}`);
      r.addEventListener('click', () => {
        win.classList.remove('win-closed'); r.remove();
        min.focus();
      });
      tray.append(r);
      r.focus();
    });
  });
})();
