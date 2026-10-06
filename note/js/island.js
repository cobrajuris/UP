/* Note — motor da ilha dinâmica.

   Estados visuais
     idle      círculo em volta do furo da câmera (Android)
     compact   atividade principal: conteúdo à esquerda e à direita da câmera
     expanded  cartão grande (atividade principal aberta ou um "sheet": Note, Hoje, chamada)
     alert     aviso rápido que some sozinho (silencioso, carregando, timer concluído)
   Uma segunda atividade ao vivo vira a bolha ao lado da ilha (modo mínimo), como na
   Apple e na HyperOS. Ela se separa e volta a se fundir como líquido (filtro "goo").

   Cada atividade é um objeto simples:
     id, kind ('live' | 'sheet' | 'alert'), compactW, expandedH, alertSize
     compact() -> { lead, trail }   minimal() -> html   expanded() -> html   alertView() -> { lead, trail }
     values() -> { chave: valor }   tick(dt, E)   mount(layer, mode) -> limpeza   onAction(nome, el, E) */
(function (N) {
  const S = N.Spring;
  const E = {};
  const sp = {
    w: new S(36), h: new S(36), r: new S(18),
    s: new S(1, { response: 0.32, damping: 0.62 }),
    x: new S(0, { response: 0.4, damping: 0.55 }),
    bx: new S(0, { response: 0.55, damping: 0.72 }),
    bs: new S(0, { response: 0.5, damping: 0.68 }),
  };
  const st = { live: [], sheet: null, alert: null, expanded: false, stretch: 0 };
  const target = { w: 36, h: 36, r: 18 };
  const listeners = [];
  let screen, island, bubble, gMain, gBub, glow;
  let W = 393, TOP = 11, scale = 1, uid = 0;
  let viewKey = '', layer = null, viewAct = null, viewMode = 'idle', cleanup = null;
  let bubbleAct = null, bubbleKey = '';
  let raf = 0, last = 0, presentT = 0, alertT = 0;

  /* ---------- geometria ---------- */
  function sizeFor(mode, act) {
    if (mode === 'idle') return { w: 36, h: 36, r: 18 }; // círculo em volta do furo da câmera
    if (mode === 'compact') return { w: Math.min(act.compactW || 230, W - 120), h: 36, r: 18 };
    if (mode === 'alert') {
      const a = act.alertSize || { w: 240, h: 36 };
      return { w: Math.min(a.w, W - 24), h: a.h, r: a.h / 2 };
    }
    const h = act.expandedH || 160;
    return { w: Math.min(W - 18, 384), h, r: h < 110 ? h / 2 : 44 };
  }

  function current() {
    if (st.alert) return { mode: 'alert', act: st.alert };
    if (st.sheet) return { mode: 'expanded', act: st.sheet };
    const p = st.live[0];
    if (p && st.expanded) return { mode: 'expanded', act: p };
    if (p) return { mode: 'compact', act: p };
    return { mode: 'idle', act: null };
  }

  function html(mode, act) {
    if (mode === 'idle') return '';
    if (mode === 'compact' || mode === 'alert') {
      const c = mode === 'compact' ? act.compact() : act.alertView();
      return `<div class="cmp ${mode === 'alert' ? 'alr' : ''}"><div class="lead">${c.lead}</div><div class="trail">${c.trail}</div></div>`;
    }
    return `<div class="exp exp-${act.id}">${act.expanded()}</div>`;
  }

  /* ---------- ligação de valores ao vivo ---------- */
  function bind(root, act) {
    if (!root || !act || !act.values) return;
    const v = act.values();
    root.querySelectorAll('[data-t]').forEach((el) => {
      const k = el.dataset.t;
      if (k in v && el.textContent !== String(v[k])) el.textContent = v[k];
    });
    root.querySelectorAll('[data-p]').forEach((el) => {
      const k = el.dataset.p;
      if (k in v) el.style.setProperty('--p', Math.max(0, Math.min(1, v[k])).toFixed(4));
    });
    root.querySelectorAll('[data-ring]').forEach((el) => {
      const k = el.dataset.ring;
      if (k in v) el.style.strokeDasharray = `${(Math.max(0, Math.min(1, v[k])) * 100).toFixed(2)} 100`;
    });
    root.querySelectorAll('[data-show]').forEach((el) => {
      const k = el.dataset.show;
      if (k in v) el.hidden = !v[k];
    });
    root.querySelectorAll('[data-on]').forEach((el) => {
      const k = el.dataset.on;
      if (k in v) el.classList.toggle('on', !!v[k]);
    });
  }
  E.bindNow = () => {
    bind(layer, viewAct);
    bind(bubble, bubbleAct);
  };

  /* ---------- troca de conteúdo ---------- */
  function swap(mode, act, t, dir) {
    const old = layer;
    if (old) {
      old.classList.remove('on');
      old.classList.add(dir > 0 ? 'off-l' : dir < 0 ? 'off-r' : 'off');
      setTimeout(() => old.remove(), 340);
    }
    if (cleanup) { cleanup(); cleanup = null; }
    viewAct = act; viewMode = mode;
    const el = document.createElement('div');
    el.className = 'layer ' + (dir > 0 ? 'from-r' : dir < 0 ? 'from-l' : 'from') + (t.w > (old ? old.offsetWidth : 0) ? ' grow' : '');
    el.style.width = t.w + 'px';
    el.style.height = t.h + 'px';
    el.innerHTML = html(mode, act);
    island.appendChild(el);
    layer = el;
    if (act) {
      bind(el, act);
      if (act.mount) cleanup = act.mount(el, mode) || null;
    }
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('on')));
  }

  function setBubble(act) {
    bubbleAct = act;
    bubble.innerHTML = act ? `<div class="mini">${act.minimal()}</div>` : '';
    bubble.setAttribute('aria-label', act ? `Trocar para ${act.name}` : '');
    bubble.tabIndex = act ? 0 : -1;
    if (act) bind(bubble, act);
  }

  function sync(dir = 0, force = false) {
    const { mode, act } = current();
    const key = mode + ':' + (act ? act.uid + ':' + (act.variant || '') : '');
    const t = sizeFor(mode, act);
    const grow = t.w * t.h > target.w * target.h + 1;
    for (const k of ['w', 'h', 'r']) sp[k].config(grow ? 0.56 : 0.44, grow ? 0.72 : 0.86);
    Object.assign(target, t);
    if (key !== viewKey || force) { swap(mode, act, t, dir); viewKey = key; }

    const sec = mode === 'compact' ? st.live[1] || null : null;
    const bk = sec ? sec.uid + ':' + (sec.variant || '') : '';
    if (bk !== bubbleKey) { bubbleKey = bk; setBubble(sec); }
    applyTargets();

    glow.classList.toggle('on', !!(mode === 'expanded' && act && act.glow));
    screen.classList.toggle('has-bubble', !!sec);
    screen.classList.toggle('island-wide', t.w > 190);
    screen.classList.toggle('island-open', mode === 'expanded');
    island.setAttribute('aria-label', act ? `${act.name}${mode === 'compact' ? ', toque para abrir' : ''}` : 'Note, toque para falar');
    island.setAttribute('aria-expanded', mode === 'expanded' ? 'true' : 'false');
    listeners.forEach((f) => f(st, mode, act));
    kick();
  }

  function applyTargets() {
    const s = st.stretch;
    sp.w.t = target.w + s * 0.3;
    sp.h.t = target.h + s * 0.45;
    sp.r.t = target.r + Math.max(0, s) * 0.12;
    if (bubbleAct) {
      sp.bx.t = W / 2 + target.w / 2 + 10 + 18;
      sp.bs.t = 36;
    } else {
      sp.bx.t = W / 2 + target.w / 2 - 22;
      sp.bs.t = 0;
    }
  }

  /* ---------- quadro a quadro ---------- */
  function draw() {
    const w = Math.max(24, sp.w.v), h = Math.max(20, sp.h.v);
    const r = Math.max(0, Math.min(sp.r.v, h / 2, w / 2));
    const tf = `translateX(calc(-50% + ${sp.x.v.toFixed(2)}px)) scale(${sp.s.v.toFixed(4)})`;
    const box = `width:${w.toFixed(2)}px;height:${h.toFixed(2)}px;border-radius:${r.toFixed(2)}px;transform:${tf}`;
    island.style.cssText = box + `;--lift:${Math.min(1, (h - 36) / 140).toFixed(3)}`;
    gMain.style.cssText = box;
    glow.style.cssText = `width:${(w + 6).toFixed(2)}px;height:${(h + 6).toFixed(2)}px;border-radius:${(r + 3).toFixed(2)}px;transform:${tf}`;
    const bs = Math.max(0, sp.bs.v);
    const bbox = `width:${bs.toFixed(2)}px;height:${bs.toFixed(2)}px;left:${sp.bx.v.toFixed(2)}px;top:calc(var(--top) + ${(18 - bs / 2).toFixed(2)}px)`;
    bubble.style.cssText = bbox + `;--o:${Math.max(0, Math.min(1, (bs - 26) / 10)).toFixed(3)}`;
    gBub.style.cssText = bbox;
  }

  function frame(t) {
    const dt = last ? Math.min(0.05, (t - last) / 1000) : 1 / 60;
    last = t;
    const n = Math.max(1, Math.round(dt * 240)), h = dt / n;
    const springs = Object.values(sp);
    for (const s of springs) for (let i = 0; i < n; i++) s.step(h);
    draw();
    if (springs.every((s) => s.done)) {
      springs.forEach((s) => s.snap());
      draw();
      raf = 0; last = 0;
      return;
    }
    raf = requestAnimationFrame(frame);
  }
  function kick() { if (!raf) { last = 0; raf = requestAnimationFrame(frame); } }

  /* ---------- API pública ---------- */
  E.state = st;
  E.onChange = (f) => listeners.push(f);
  E.get = (id) => st.live.find((a) => a.id === id) || (st.sheet && st.sheet.id === id ? st.sheet : null);

  E.start = (act, { present = false } = {}) => {
    act.uid = act.uid || ++uid;
    const i = st.live.findIndex((a) => a.id === act.id);
    if (i >= 0) st.live.splice(i, 1);
    st.live.unshift(act);
    st.expanded = present;
    clearTimeout(presentT);
    if (present) presentT = setTimeout(() => { if (st.live[0] === act) { st.expanded = false; sync(); } }, 2800);
    sync();
    return act;
  };
  E.focus = (id) => {
    const i = st.live.findIndex((a) => a.id === id);
    if (i < 0) return false;
    st.live.unshift(st.live.splice(i, 1)[0]);
    if (st.sheet) closeSheet();
    st.expanded = true;
    sync();
    return true;
  };
  E.stop = (id) => {
    const i = st.live.findIndex((a) => a.id === id);
    if (i >= 0) {
      const [a] = st.live.splice(i, 1);
      a.onStop && a.onStop();
      if (i === 0) st.expanded = false;
    }
    if (st.sheet && st.sheet.id === id) closeSheet();
    sync();
  };
  function closeSheet() {
    if (st.sheet && st.sheet.onClose) st.sheet.onClose();
    st.sheet = null;
  }
  E.present = (sheet) => {
    sheet.uid = ++uid;
    if (st.sheet) closeSheet();
    st.sheet = sheet;
    st.expanded = false;
    clearTimeout(presentT);
    sync();
    return sheet;
  };
  E.dismiss = () => { closeSheet(); st.expanded = false; sync(); };
  E.alert = (a, ms = 2400) => {
    a.uid = ++uid;
    st.alert = a;
    clearTimeout(alertT);
    alertT = setTimeout(() => { st.alert = null; sync(); }, ms);
    sync();
  };
  E.expand = () => { if (st.live[0]) { clearTimeout(presentT); st.expanded = true; sync(); } };
  E.collapse = () => {
    clearTimeout(presentT);
    if (st.sheet) return E.dismiss();
    st.expanded = false;
    sync();
  };
  E.rotate = (dir) => {
    if (st.live.length < 2) { sp.x.vel += dir * -260; kick(); return; }
    if (dir > 0) st.live.push(st.live.shift()); else st.live.unshift(st.live.pop());
    N.haptic(6);
    sync(dir);
  };
  E.swapBubble = () => {
    if (st.live.length < 2) return;
    [st.live[0], st.live[1]] = [st.live[1], st.live[0]];
    N.haptic(6);
    sync(0);
  };
  E.refresh = () => sync();
  E.rerender = (act) => {
    if (act === viewAct && layer) {
      if (cleanup) { cleanup(); cleanup = null; }
      layer.innerHTML = html(viewMode, act);
      bind(layer, act);
      if (act.mount) cleanup = act.mount(layer, viewMode) || null;
    }
    if (act === bubbleAct) setBubble(act);
  };
  E.setScale = (s) => { scale = s || 1; };
  E.layout = (width, top) => {
    W = width || W;
    if (top != null) { TOP = top; screen.style.setProperty('--top', TOP + 'px'); }
    sync(0, !!layer);
    for (const k in sp) sp[k].snap();
    applyTargets();
    for (const k in sp) sp[k].snap();
    draw();
  };

  /* ---------- gestos ---------- */
  let press = null, lpT = 0;

  function onTap() {
    const { mode, act } = current();
    if (mode === 'alert') { clearTimeout(alertT); st.alert = null; sync(); return; }
    if (mode === 'idle') { N.haptic(6); E.present(N.create.assistant()); return; }
    if (mode === 'compact') { E.expand(); return; }
    if (mode === 'expanded' && act && act.kind === 'live') E.collapse();
    else if (act && act.tapToClose) E.dismiss();
  }
  function onLong() {
    const { mode } = current();
    N.haptic(14);
    sp.s.vel += 2.2;
    if (mode === 'idle') E.present(N.create.overview());
    else if (mode === 'compact') E.expand();
    kick();
  }

  function down(e) {
    if (e.button > 0 || e.target.closest('button,input,textarea,a,label')) return;
    clearTimeout(presentT);
    const { mode } = current();
    press = { x: e.clientX, y: e.clientY, moved: false, long: false, mode, id: e.pointerId };
    try { island.setPointerCapture(e.pointerId); } catch (err) { /* ok */ }
    sp.s.t = mode === 'expanded' ? 0.985 : 0.94;
    if (mode !== 'expanded') lpT = setTimeout(() => { if (press && !press.moved) { press.long = true; sp.s.t = 1; onLong(); } }, 430);
    kick();
  }
  function move(e) {
    if (!press || e.pointerId !== press.id) return;
    const dx = (e.clientX - press.x) / scale, dy = (e.clientY - press.y) / scale;
    if (!press.moved && Math.hypot(dx, dy) > 7) { press.moved = true; clearTimeout(lpT); sp.s.t = 1; }
    if (!press.moved) return;
    if (press.mode === 'expanded') {
      st.stretch = dy < 0 ? N.rubber(dy, 46) : N.rubber(dy, 14);
    } else {
      st.stretch = dy > 0 ? N.rubber(dy, 40) : 0;
      sp.x.t = Math.abs(dx) > Math.abs(dy) ? N.rubber(dx, 22) : 0;
    }
    applyTargets();
    kick();
  }
  function up(e) {
    if (!press || e.pointerId !== press.id) return;
    clearTimeout(lpT);
    const p = press; press = null;
    const dx = (e.clientX - p.x) / scale, dy = (e.clientY - p.y) / scale;
    sp.s.t = 1; sp.x.t = 0; st.stretch = 0;
    applyTargets();
    kick();
    if (p.long || e.type === 'pointercancel') return;
    if (!p.moved) return onTap();
    if (p.mode !== 'expanded' && Math.abs(dx) > 34 && Math.abs(dx) > Math.abs(dy)) return E.rotate(dx < 0 ? 1 : -1);
    if (p.mode === 'expanded' && dy < -30) return E.collapse();
    if (p.mode !== 'expanded' && dy > 34) return p.mode === 'idle' ? E.present(N.create.assistant()) : E.expand();
  }

  E.mount = (root) => {
    screen = root;
    island = root.querySelector('#island');
    bubble = root.querySelector('#bubble');
    gMain = root.querySelector('#gMain');
    gBub = root.querySelector('#gBub');
    glow = root.querySelector('#glow');

    island.addEventListener('pointerdown', down);
    island.addEventListener('pointermove', move);
    island.addEventListener('pointerup', up);
    island.addEventListener('pointercancel', up);
    island.addEventListener('click', (e) => {
      const b = e.target.closest('[data-act]');
      if (!b || !viewAct || !viewAct.onAction) return;
      e.stopPropagation();
      N.haptic(5);
      viewAct.onAction(b.dataset.act, b, E);
      E.bindNow();
    });
    island.addEventListener('submit', (e) => {
      e.preventDefault();
      if (viewAct && viewAct.onSubmit) viewAct.onSubmit(e.target, E);
    });
    island.addEventListener('keydown', (e) => {
      if (e.target !== island) return;
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onTap(); }
      else if (e.key === 'ArrowRight') E.rotate(1);
      else if (e.key === 'ArrowLeft') E.rotate(-1);
      else if (e.key === 'ArrowDown') { current().mode === 'idle' ? E.present(N.create.overview()) : E.expand(); }
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') E.collapse(); });

    const tapBubble = () => E.swapBubble();
    bubble.addEventListener('click', tapBubble);
    bubble.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tapBubble(); } });

    // Toque fora da ilha recolhe o que estiver aberto.
    root.addEventListener('pointerdown', (e) => {
      if (e.target.closest('#island,#bubble')) return;
      if (current().mode === 'expanded') E.collapse();
    }, true);

    // Relógio interno das atividades.
    let lastTick = performance.now();
    setInterval(() => {
      const now = performance.now(), dt = (now - lastTick) / 1000;
      lastTick = now;
      [...st.live, st.sheet, st.alert].filter(Boolean).forEach((a) => a.tick && a.tick(dt, E));
      E.bindNow();
    }, 250);

    sync();
  };

  N.island = E;
})(window.Note = window.Note || {});
