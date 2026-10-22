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
  document.dispatchEvent(new CustomEvent('jp:mode', { detail: mode }));
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

/* ---------- Party mode: windows, taskbar, confetti. All of it is hidden by CSS outside party mode. ---------- */
(() => {
  const wins = [...document.querySelectorAll('main > section[data-file]')];
  if (!wins.length) return;
  const accents = ['#D4FF3A', '#B9A6FF', '#7CC4FF', '#FF7AB6', '#FFB86B', '#7DF0C0'];
  const canDrag = matchMedia('(min-width: 900px) and (pointer: fine)');
  let dialog, lastFocus, zTop = 5;

  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; };
  const btn = (kind, label, glyph) => {
    const b = el('button', 'win-btn', glyph);
    b.type = 'button'; b.dataset.win = kind; b.setAttribute('aria-label', label);
    return b;
  };

  /* Taskbar: Start menu, one button per window, a clock. */
  const bar = el('nav', 'taskbar'); bar.setAttribute('aria-label', 'Taskbar');
  const start = el('button', 'tb-start', 'Start'); start.type = 'button';
  start.setAttribute('aria-expanded', 'false'); start.setAttribute('aria-controls', 'start-menu');
  const menu = el('div', 'start-menu'); menu.id = 'start-menu'; menu.hidden = true;
  const list = el('div', 'tb-list');
  const clock = el('span', 'tb-clock'); clock.setAttribute('aria-hidden', 'true');
  bar.append(start, list, clock);
  document.body.append(bar, menu);
  const tick = () => { clock.textContent = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); };
  tick(); setInterval(tick, 30000);

  const closeMenu = (focusStart) => { menu.hidden = true; start.setAttribute('aria-expanded', 'false'); if (focusStart) start.focus(); };
  start.addEventListener('click', () => {
    const open = menu.hidden;
    menu.hidden = !open; start.setAttribute('aria-expanded', String(open));
    if (open) menu.querySelector('button')?.focus();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) closeMenu(true); });
  document.addEventListener('click', (e) => { if (!menu.hidden && !menu.contains(e.target) && e.target !== start) closeMenu(false); });
  const menuItem = (label, fn) => { const b = el('button', 'sm-item', label); b.type = 'button'; b.addEventListener('click', () => { closeMenu(false); fn(); }); menu.append(b); return b; };
  menu.append(el('p', 'sm-head', 'jacob@party ~'));

  function show(win) {
    win.classList.remove('win-closed', 'win-min');
    win.querySelector('[data-win="min"]')?.setAttribute('aria-pressed', 'false');
    win._tb?.classList.remove('is-closed');
    win.style.zIndex = String(++zTop);
    win.scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', block: 'start' });
    win.querySelector('[data-win="min"]')?.focus({ preventScroll: true });
  }

  function openModal(win, name, trigger) {
    if (!dialog) {
      dialog = el('dialog', 'win-dialog');
      dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); }); // backdrop
      dialog.addEventListener('close', () => {
        document.querySelectorAll('[data-win="expand"]').forEach((b) => b.setAttribute('aria-expanded', 'false'));
        lastFocus?.focus();
      });
      document.body.append(dialog);
    }
    const body = el('div', 'win-body');
    [...win.children].filter((c) => !c.classList.contains('winbar')).forEach((c) => body.append(c.cloneNode(true)));
    body.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id')); // no duplicate ids
    body.querySelectorAll('button').forEach((n) => n.remove()); // no dead controls in the copy
    const head = el('div', 'winbar');
    head.style.setProperty('--accent', win.style.getPropertyValue('--accent'));
    const close = btn('dismiss', `Close ${name} pop-up`, '×');
    close.addEventListener('click', () => dialog.close());
    head.append(el('span', 'win-title', name), close);
    dialog.replaceChildren(head, body);
    dialog.setAttribute('aria-label', name);
    lastFocus = trigger;
    trigger.setAttribute('aria-expanded', 'true');
    dialog.showModal(); // modal: background inert, Esc closes
    close.focus();
    dialog.scrollTop = 0;
  }

  wins.forEach((win, i) => {
    const name = win.dataset.file;
    win.style.setProperty('--accent', accents[i % accents.length]);
    const head = el('div', 'winbar');
    const title = el('span', 'win-title', name);
    const group = el('div', 'win-btns');
    const min = btn('min', `Minimise ${name}`, '_');
    const max = btn('expand', `Expand ${name}`, '□');
    const cls = btn('close', `Close ${name}`, '×');
    min.setAttribute('aria-pressed', 'false');
    max.setAttribute('aria-haspopup', 'dialog'); max.setAttribute('aria-expanded', 'false');
    group.append(min, max, cls);
    head.append(title, group);
    win.prepend(head);

    // Taskbar entry: restores a closed or minimised window and jumps to it.
    const tb = el('button', 'tb-win', name); tb.type = 'button';
    tb.style.setProperty('--accent', accents[i % accents.length]);
    tb.addEventListener('click', () => show(win));
    list.append(tb); win._tb = tb;
    menuItem(`Open ${name}`, () => show(win));

    const setMin = (on) => { win.classList.toggle('win-min', on); min.setAttribute('aria-pressed', String(on)); };
    min.addEventListener('click', () => setMin(!win.classList.contains('win-min')));
    head.addEventListener('click', (e) => { if ((e.target === head || e.target === title) && win.classList.contains('win-min') && !win._dragged) setMin(false); });
    max.addEventListener('click', () => openModal(win, name, max));
    cls.addEventListener('click', () => {
      win.classList.add('win-closed');
      tb.classList.add('is-closed'); tb.setAttribute('aria-label', `Restore ${name}`);
      tb.focus();
    });

    // Drag by the title bar on desktop; double-click the title to snap back.
    head.addEventListener('pointerdown', (e) => {
      if (!isParty() || !canDrag.matches || e.button !== 0 || e.target.closest('button')) return;
      const sx = e.clientX, sy = e.clientY;
      const [ox, oy] = (win.dataset.pos || '0,0').split(',').map(Number);
      const rect = win.getBoundingClientRect(), base = rect.left - ox;
      win._dragged = false;
      win.style.zIndex = String(++zTop);
      head.setPointerCapture(e.pointerId);
      const move = (ev) => {
        const dx = ev.clientX - sx, dy = ev.clientY - sy;
        if (Math.abs(dx) + Math.abs(dy) > 4) win._dragged = true;
        // Keep at least 120px of the title bar on screen so a window can't get lost.
        const x = Math.max(-base - rect.width + 120, Math.min(ox + dx, innerWidth - base - 120));
        const y = oy + dy;
        win.dataset.pos = `${x},${y}`;
        win.style.translate = `${x}px ${y}px`;
        win.classList.add('is-dragging');
      };
      const up = () => { head.removeEventListener('pointermove', move); win.classList.remove('is-dragging'); setTimeout(() => { win._dragged = false; }, 0); };
      head.addEventListener('pointermove', move);
      head.addEventListener('pointerup', up, { once: true });
      head.addEventListener('pointercancel', up, { once: true });
    });
    head.addEventListener('dblclick', (e) => { if (e.target.closest('button')) return; delete win.dataset.pos; win.style.translate = ''; });
  });

  menuItem('Launch a glider', () => document.querySelector('[data-launch-glider]')?.click());
  menuItem('Tidy windows', () => wins.forEach((w) => { delete w.dataset.pos; w.style.translate = ''; w.classList.remove('win-min', 'win-closed'); w._tb?.classList.remove('is-closed'); }));
  menuItem('Shut down (back to business)', () => document.querySelector('[data-mode-switch]')?.click());

  /* Confetti when the flag flips on. Skipped under reduced motion. */
  function confetti() {
    if (reduce.matches) return;
    const c = el('canvas', 'confetti'); c.setAttribute('aria-hidden', 'true');
    document.body.append(c);
    const dpr = Math.min(devicePixelRatio || 1, 2);
    c.width = innerWidth * dpr; c.height = innerHeight * dpr;
    const ctx = c.getContext('2d'); ctx.scale(dpr, dpr);
    const sw = document.querySelector('[data-mode-switch]')?.getBoundingClientRect();
    const ox = sw ? sw.left + sw.width / 2 : innerWidth - 80, oy = sw ? sw.bottom : 40;
    const bits = Array.from({ length: 140 }, () => ({
      x: ox, y: oy, vx: (Math.random() - 0.65) * 14, vy: Math.random() * 6 + 2,
      r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.4, w: 6 + Math.random() * 6, h: 3 + Math.random() * 4,
      c: accents[Math.random() * accents.length | 0],
    }));
    const t0 = performance.now();
    (function frame(t) {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (const b of bits) {
        b.vy += 0.25; b.vx *= 0.99; b.x += b.vx; b.y += b.vy; b.r += b.vr;
        ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.r); ctx.fillStyle = b.c; ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h); ctx.restore();
      }
      if (t - t0 < 2200) requestAnimationFrame(frame); else c.remove();
    })(t0);
  }
  document.addEventListener('jp:mode', (e) => {
    if (e.detail === 'party') confetti();
    else { closeMenu(false); wins.forEach((w) => { delete w.dataset.pos; w.style.translate = ''; }); }
  });
})();
