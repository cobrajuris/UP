/* Note — efeitos desenhados em canvas: letreiro de pontos e onda de voz. */
(function (N) {
  /* Fonte 5×7 para o letreiro de pontos (estilo painel de LED). */
  const GLYPHS = {
    A: '01110100011000111111100011000110001', B: '11110100011000111110100011000111110',
    C: '01110100011000010000100001000101110', D: '11110100011000110001100011000111110',
    E: '11111100001000011110100001000011111', F: '11111100001000011110100001000010000',
    G: '01110100011000010111100011000101111', H: '10001100011000111111100011000110001',
    I: '01110001000010000100001000010001110', J: '00111000100001000010000101001001100',
    K: '10001100101010011000101001001010001', L: '10000100001000010000100001000011111',
    M: '10001110111010110101100011000110001', N: '10001100011100110101100111000110001',
    O: '01110100011000110001100011000101110', P: '11110100011000111110100001000010000',
    Q: '01110100011000110001101011001001101', R: '11110100011000111110101001001010001',
    S: '01111100001000001110000010000111110', T: '11111001000010000100001000010000100',
    U: '10001100011000110001100011000101110', V: '10001100011000110001100010101000100',
    W: '10001100011000110101101011010101010', X: '10001100010101000100010101000110001',
    Y: '10001100010101000100001000010000100', Z: '11111000010001000100010001000011111',
    0: '01110100011001110101110011000101110', 1: '00100011000010000100001000010001110',
    2: '01110100010000100010001000100011111', 3: '11111000100010000010000011000101110',
    4: '00010001100101010010111110001000010', 5: '11111100001111000001000011000101110',
    6: '00110010001000011110100011000101110', 7: '11111000010001000100010000100001000',
    8: '01110100011000101110100011000101110', 9: '01110100011000101111000010001001100',
    '>': '01000001000001000001000100010001000', '-': '00000000000000011111000000000000000',
    '.': '00000000000000000000000000110001100', ':': '00000011000110000000011000110000000',
    '/': '00001000100001000100010000100010000', ' ': '00000000000000000000000000000000000',
  };
  const plain = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();

  function columns(text) {
    const cols = [];
    for (const ch of plain(text)) {
      const g = GLYPHS[ch] || GLYPHS[' '];
      for (let x = 0; x < 5; x++) {
        let col = 0;
        for (let y = 0; y < 7; y++) if (g[y * 5 + x] === '1') col |= 1 << y;
        cols.push(col);
      }
      cols.push(0);
    }
    return cols;
  }

  function setup(cv) {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = cv.clientWidth || 300, h = cv.clientHeight || 22;
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    const ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w, h };
  }

  /* Letreiro rolante: getText() e isMoving() são lidos a cada quadro. */
  N.dotMatrix = (cv, getText, isMoving, lit = '#efeaff') => {
    if (!cv) return null;
    let raf = 0, off = 0, last = 0, text = '', cols = [];
    let size = null;
    const draw = (t) => {
      if (!size) size = setup(cv);
      const { ctx, w, h } = size;
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 0; last = t;
      const now = getText();
      if (now !== text) { text = now; cols = columns(text); }
      if (isMoving()) off += dt * 14;
      const cell = h / 7, r = cell * 0.36, visible = Math.ceil(w / cell);
      ctx.clearRect(0, 0, w, h);
      for (let c = 0; c < visible; c++) {
        const col = cols[(c + Math.floor(off)) % cols.length] || 0;
        for (let y = 0; y < 7; y++) {
          const on = col & (1 << y);
          ctx.fillStyle = on ? lit : 'rgba(255,255,255,.07)';
          ctx.beginPath();
          ctx.arc(c * cell + cell / 2, y * cell + cell / 2, on ? r * 1.08 : r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  };

  /* Onda de voz: três fitas luminosas sobrepostas. getLevel() vai de 0 a 1. */
  const PALETTES = {
    note: ['#ff7ac6', '#ffc27a', '#7ee8ff', '#9b8cff'],
    translate: ['#ffffff', '#7ee8ff', '#5ad1ff', '#b6f3ff'],
  };
  N.wave = (cv, getLevel, palette = 'note', sparkles = false) => {
    if (!cv) return null;
    const colors = PALETTES[palette];
    let raf = 0, level = 0, size = null;
    const dust = Array.from({ length: sparkles ? 46 : 0 }, () => ({
      x: Math.random(), y: (Math.random() - 0.5) * 2, s: 0.4 + Math.random() * 1.2, v: 0.03 + Math.random() * 0.08, p: Math.random() * 6,
    }));
    const draw = (t) => {
      if (!size) size = setup(cv);
      const { ctx, w, h } = size;
      const time = t / 1000;
      level += (getLevel() - level) * 0.08;
      const live = level * (0.75 + 0.25 * Math.sin(time * 7.3) * Math.sin(time * 3.1));
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      colors.forEach((c, i) => grad.addColorStop(i / (colors.length - 1), c));
      for (let k = 0; k < 3; k++) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 2) {
          const u = x / w, env = Math.pow(Math.sin(Math.PI * u), 2);
          const y = h / 2 + Math.sin(u * (9 + k * 3) + time * (2.4 + k * 0.9) + k * 2) * (h * 0.42) * env * (0.12 + live * (1 - k * 0.22));
          x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.strokeStyle = grad;
        ctx.globalAlpha = 0.85 - k * 0.22;
        ctx.lineWidth = 2.2 - k * 0.5;
        ctx.shadowColor = colors[k + 1];
        ctx.shadowBlur = 8;
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
      dust.forEach((d) => {
        d.x = (d.x + d.v * 0.016 * (0.4 + live)) % 1;
        const env = Math.pow(Math.sin(Math.PI * d.x), 1.5);
        ctx.globalAlpha = env * (0.35 + 0.65 * Math.abs(Math.sin(time * 3 + d.p)));
        ctx.fillStyle = '#d8f7ff';
        ctx.fillRect(d.x * w, h / 2 + d.y * h * 0.32 * env * (0.3 + live), d.s, d.s);
      });
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  };
})(window.Note = window.Note || {});
