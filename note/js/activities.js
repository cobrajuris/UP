/* Note — atividades ao vivo, painéis e avisos. Textos em pt-BR, horário 24 h. */
(function (N) {
  const I = (n, s = 16, c = '') => N.icon(n, s, c);
  const pad = (n) => String(n).padStart(2, '0');
  const mmss = (s) => {
    s = Math.max(0, Math.round(s));
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), r = s % 60;
    return h ? `${h}:${pad(m)}:${pad(r)}` : `${m}:${pad(r)}`;
  };
  const num = (n, d = 0) => n.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });
  const hhmm = (d = new Date()) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  const inMin = (min) => hhmm(new Date(Date.now() + min * 60000));

  const ring = (key, size, sw, color, inner = '') => {
    const c = size / 2, r = c - sw / 2 - 0.5;
    return `<span class="ring" style="width:${size}px;height:${size}px">
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true">
        <circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="${color}" stroke-opacity=".22" stroke-width="${sw}"/>
        <circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round"
          pathLength="100" stroke-dasharray="0 100" transform="rotate(-90 ${c} ${c})" data-ring="${key}"/>
      </svg>${inner ? `<span class="ring-in">${inner}</span>` : ''}</span>`;
  };
  const eq = (color, key = '', n = 4) => `<span class="eq ${key ? '' : 'on'}" ${key ? `data-on="${key}"` : ''} style="--c:${color}">${'<i></i>'.repeat(n)}</span>`;
  const ava = (initials, a, b, size = 40) => `<span class="ava" style="--g1:${a};--g2:${b};width:${size}px;height:${size}px;font-size:${Math.round(size * 0.38)}px">${initials}</span>`;

  N.create = {};
  N.fmt = { mmss, num, hhmm };

  /* ------------------------------------------------------------ Timer */
  N.create.timer = (sec = 300, label = 'Timer') => ({
    id: 'timer', name: 'Timer', kind: 'live', compactW: 220, expandedH: 176,
    total: sec, left: sec, running: true, label,
    tick(dt, E) {
      if (!this.running) return;
      this.left -= dt;
      if (this.left <= 0) {
        this.left = 0; this.running = false;
        N.haptic([30, 60, 30, 60, 30]);
        E.stop('timer');
        E.alert(N.create.toast({ icon: 'bell', color: 'var(--c-timer)', lead: this.label, trail: 'Concluído', w: 236, ring: true }), 3200);
      }
    },
    values() { return { time: mmss(this.left), p: 1 - this.left / this.total, run: this.running, paused: !this.running }; },
    compact() {
      return { lead: ring('p', 22, 3, 'var(--c-timer)'), trail: `<b class="num" style="color:var(--c-timer)" data-t="time"></b>` };
    },
    minimal() { return ring('p', 26, 3, 'var(--c-timer)', I('timer', 12)); },
    expanded() {
      return `
      <div class="hdr">
        <span class="label ell" style="color:var(--c-timer)">${I('timer', 16)} ${this.label}</span>
        <b class="big num" style="color:var(--c-timer)" data-t="time"></b>
      </div>
      <div class="ruler" data-p="p" style="--rw:${Math.max(600, Math.round(this.total * 2))}px"><div class="ruler-track"></div></div>
      <div class="row between">
        <button class="btn-round" style="--b:#d9d6e0" data-act="cancel" aria-label="Cancelar timer">${I('x', 20)}</button>
        <span class="muted small">${mmss(this.total)} no total · termina ${inMin(this.left / 60)}</span>
        <button class="btn-round" style="--b:var(--c-timer)" data-act="toggle" aria-label="Pausar ou retomar">
          <span data-show="run">${I('pause', 20)}</span><span data-show="paused" hidden>${I('play', 20)}</span>
        </button>
      </div>`;
    },
    onAction(a, el, E) {
      if (a === 'toggle') this.running = !this.running;
      if (a === 'cancel') E.stop('timer');
    },
  });

  /* ------------------------------------------------------------ Música */
  const TRACKS = [
    { t: 'Ondas Roxas', a: 'Marina Sol', d: 212, g: ['#7b5cff', '#f08bd6'] },
    { t: 'Céu de Concreto', a: 'Banda Avenida', d: 188, g: ['#ff8a4c', '#ffd36b'] },
    { t: 'Maré Alta', a: 'Lia Duarte', d: 245, g: ['#2bd4c5', '#3d6bff'] },
  ];
  const art = (g, size, r) => `<span class="art" style="--g1:${g[0]};--g2:${g[1]};width:${size}px;height:${size}px;border-radius:${r}px"></span>`;
  N.create.music = () => ({
    id: 'music', name: 'Música', kind: 'live', compactW: 214, expandedH: 236,
    i: 0, pos: 48, playing: true,
    get track() { return TRACKS[this.i]; },
    tick(dt) { if (this.playing) { this.pos += dt; if (this.pos >= this.track.d) this.skip(1); } },
    skip(d, E) { this.i = (this.i + d + TRACKS.length) % TRACKS.length; this.pos = 0; E && E.rerender(this); },
    values() {
      const t = this.track;
      return { pos: mmss(this.pos), rem: '-' + mmss(t.d - this.pos), p: this.pos / t.d, play: this.playing, pause: !this.playing };
    },
    compact() { return { lead: art(this.track.g, 24, 7), trail: eq('var(--c-music)', 'play') }; },
    minimal() { return eq('var(--c-music)', 'play', 3); },
    expanded() {
      const t = this.track;
      return `
      <div class="hdr">
        <span class="tag ell" style="--c:var(--c-music)">${I('music', 13)} Tocando</span>
        ${eq('var(--c-music)', 'play')}
      </div>
      <div class="row gap">
        ${art(t.g, 56, 14)}
        <div class="meta"><b>${t.t}</b><span class="muted">${t.a}</span><canvas class="dots" aria-hidden="true"></canvas></div>
      </div>
      <div class="prog"><span class="num small" data-t="pos"></span><div class="bar" style="--c:var(--c-music)"><i data-p="p"></i></div><span class="num small muted" data-t="rem"></span></div>
      <div class="row center gap-lg">
        <button class="btn-ghost" data-act="prev" aria-label="Faixa anterior">${I('prev', 24)}</button>
        <button class="btn-ghost lg" data-act="toggle" aria-label="Tocar ou pausar">
          <span data-show="play">${I('pause', 30)}</span><span data-show="pause" hidden>${I('play', 30)}</span>
        </button>
        <button class="btn-ghost" data-act="next" aria-label="Próxima faixa">${I('next', 24)}</button>
      </div>`;
    },
    mount(layer, mode) {
      if (mode !== 'expanded') return null;
      return N.dotMatrix(layer.querySelector('.dots'), () => `${this.track.t} - ${this.track.a}    NOTE    `, () => this.playing);
    },
    onAction(a, el, E) {
      if (a === 'toggle') this.playing = !this.playing;
      if (a === 'next') this.skip(1, E);
      if (a === 'prev') this.pos > 4 ? (this.pos = 0) : this.skip(-1, E);
    },
  });

  /* ------------------------------------------------------------ Corrida */
  N.create.ride = () => ({
    id: 'ride', name: 'Corrida', kind: 'live', compactW: 212, expandedH: 200,
    eta: 190, total: 190,
    get variant() { return this.eta <= 0 ? 'chegou' : ''; },
    tick(dt, E) {
      if (this.eta <= 0) return;
      this.eta -= dt;
      if (this.eta <= 0) { N.haptic([20, 40, 20]); E.refresh(); }
    },
    values() {
      const m = Math.max(1, Math.ceil(this.eta / 60));
      return { min: this.eta > 0 ? `${m} min` : 'Chegou', title: this.eta > 0 ? `Chega em ${m} min` : 'Rafael chegou', p: 1 - Math.max(0, this.eta) / this.total };
    },
    compact() {
      return { lead: `<span class="chip" style="--c:var(--c-ride)">${I('car', 15)}</span>`, trail: `<b class="num" style="color:var(--c-ride)" data-t="min"></b>` };
    },
    minimal() { return `<span style="color:var(--c-ride)">${I('car', 18)}</span>`; },
    expanded() {
      return `
      <div class="row gap top">
        <div class="col grow">
          <span class="tag" style="--c:var(--c-ride)">${I('car', 13)} Corrida</span>
          <b class="title" data-t="title"></b>
          <div class="row gap-sm">
            ${ava('RS', '#ff4fa3', '#7b5cff', 34)}
            <div class="col tight"><b class="small">Rafael · 4,9 ★</b><span class="muted xs">Onix prata · BRA2E19</span></div>
          </div>
        </div>
        <div class="minimap" data-p="p">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <rect width="100" height="100" fill="#15151b"/>
            <path d="M0 30H100M0 64H100M34 0V100M72 0V100M0 88 60 0" stroke="#24242e" stroke-width="5" fill="none"/>
            <path class="route" d="M18 84 V64 H72 V30 H86" stroke="var(--c-ride)" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="18" cy="84" r="5" fill="#fff"/><circle cx="18" cy="84" r="2.4" fill="var(--c-ride)"/>
            <g class="carpin"><circle r="7" fill="#fff"/><circle r="4.2" fill="var(--c-ride)"/></g>
          </svg>
        </div>
      </div>
      <div class="row gap-sm">
        <button class="btn-pill" data-act="call">${I('phone', 15)} Ligar</button>
        <button class="btn-pill" data-act="msg">${I('message', 15)} Mensagem</button>
        <button class="btn-round sm" style="--b:#d9d6e0" data-act="end" aria-label="Encerrar acompanhamento">${I('x', 16)}</button>
      </div>`;
    },
    mount(layer, mode) {
      if (mode !== 'expanded') return null;
      const path = layer.querySelector('.route'), pin = layer.querySelector('.carpin');
      if (!path || !pin) return null;
      const len = path.getTotalLength();
      let raf = 0, p = 1 - Math.max(0, this.eta) / this.total;
      const loop = () => {
        const goal = 1 - Math.max(0, this.eta) / this.total;
        p += (goal - p) * 0.1;
        const pt = path.getPointAtLength(len * (1 - p));
        pin.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
        raf = requestAnimationFrame(loop);
      };
      loop();
      return () => cancelAnimationFrame(raf);
    },
    onAction(a, el, E) {
      if (a === 'end') E.stop('ride');
      if (a === 'call') { E.collapse(); E.start(N.create.call({ name: 'Rafael', initials: 'RS', outgoing: true })); }
      if (a === 'msg') E.alert(N.create.toast({ icon: 'message', color: 'var(--c-ride)', lead: 'Rafael', trail: '“Estou chegando”', w: 270 }), 2600);
    },
  });

  /* ------------------------------------------------------------ Voo */
  N.create.flight = () => ({
    id: 'flight', name: 'Voo', kind: 'live', compactW: 214, expandedH: 168,
    left: 7 * 3600 + 12 * 60, total: 11 * 3600 + 40 * 60,
    tick(dt) { this.left = Math.max(0, this.left - dt); },
    values() {
      const h = Math.floor(this.left / 3600), m = Math.floor((this.left % 3600) / 60);
      return { rem: `${h} h ${pad(m)} min`, short: `${h}h${pad(m)}`, p: 1 - this.left / this.total, eta: inMin(this.left / 60) };
    },
    compact() { return { lead: `<span style="color:var(--c-flight)">${I('plane', 17)}</span>`, trail: `<b class="num" style="color:var(--c-flight)" data-t="short"></b>` }; },
    minimal() { return ring('p', 26, 3, 'var(--c-flight)', I('plane', 11)); },
    expanded() {
      return `
      <div class="hdr">
        <span class="tag ell" style="--c:var(--c-flight)">${I('plane', 13)} NT 2047</span>
        <span class="muted small ell">Portão B12 · 23A</span>
      </div>
      <div class="flight">
        <div class="col"><b class="code">GRU</b><span class="muted small">São Paulo</span></div>
        <div class="fl-line" data-p="p"><i></i><span class="fl-plane">${I('plane', 18)}</span></div>
        <div class="col right"><b class="code">LIS</b><span class="muted small">Lisboa</span></div>
      </div>
      <div class="row between">
        <span class="small">Pousa em <b class="num" style="color:var(--c-flight)" data-t="rem"></b></span>
        <span class="row gap-sm"><span class="muted small num">Chegada <span data-t="eta"></span></span>
        <button class="btn-round xs" style="--b:#d9d6e0" data-act="end" aria-label="Encerrar acompanhamento">${I('x', 13)}</button></span>
      </div>`;
    },
    onAction(a, el, E) { if (a === 'end') E.stop('flight'); },
  });

  /* ------------------------------------------------------------ Chamada */
  N.create.incoming = ({ name = 'Mãe', initials = 'M', label = 'Celular' } = {}) => ({
    id: 'incoming', name: `Chamada de ${name}`, kind: 'sheet', expandedH: 84, t: 0,
    tick(dt, E) {
      this.t += dt;
      if (Math.floor(this.t * 2) !== Math.floor((this.t - dt) * 2)) N.haptic(40);
      if (this.t > 22) { E.dismiss(); E.alert(N.create.toast({ icon: 'phoneDown', color: 'var(--c-alert)', lead: name, trail: 'Chamada perdida', w: 260 }), 3000); }
    },
    expanded() {
      return `
      <div class="row gap call-in">
        ${ava(initials, '#8e8e98', '#4b4b55', 52)}
        <div class="col grow tight"><span class="muted small">${label}</span><b class="title sm">${name}</b></div>
        <button class="btn-round solid" style="--b:var(--c-alert)" data-act="decline" aria-label="Recusar">${I('phoneDown', 22)}</button>
        <button class="btn-round solid ringing" style="--b:var(--c-call)" data-act="accept" aria-label="Atender">${I('phone', 22)}</button>
      </div>`;
    },
    onAction(a, el, E) {
      E.dismiss();
      if (a === 'accept') E.start(N.create.call({ name, initials }));
    },
  });

  N.create.call = ({ name = 'Mãe', initials = 'M', outgoing = false } = {}) => ({
    id: 'call', name: `Chamada com ${name}`, kind: 'live', compactW: 214, expandedH: 188,
    t: outgoing ? -3 : 0, muted: false, speaker: false,
    get variant() { return this.t < 0 ? 'dialing' : ''; },
    tick(dt, E) { const was = this.t < 0; this.t += dt; if (was && this.t >= 0) E.refresh(); },
    values() { return { dur: this.t < 0 ? 'Chamando…' : mmss(this.t), mute: this.muted, unmute: !this.muted }; },
    compact() {
      return {
        lead: `<span class="row gap-xs" style="color:var(--c-call)">${I('phone', 15)}<b class="num" data-t="dur"></b></span>`,
        trail: eq('var(--c-call)', '', 5),
      };
    },
    minimal() { return `<span style="color:var(--c-call)">${I('phone', 17)}</span>`; },
    expanded() {
      return `
      <div class="hdr">
        <span class="tag ell" style="--c:var(--c-call)">${I('phone', 13)} <span data-t="dur"></span></span>
        ${eq('var(--c-call)', '', 5)}
      </div>
      <div class="row gap">
        ${ava(initials, '#8e8e98', '#4b4b55', 40)}
        <b class="title sm ell">${name}</b>
      </div>
      <div class="row between">
        <button class="btn-round" data-act="mute" style="--b:#d9d6e0" aria-label="Silenciar microfone">
          <span data-show="unmute">${I('mic', 20)}</span><span data-show="mute" hidden>${I('micOff', 20)}</span></button>
        <button class="btn-round ${this.speaker ? 'solid' : ''}" data-act="speaker" style="--b:#d9d6e0" aria-label="Viva-voz">${I('speaker', 20)}</button>
        <button class="btn-round solid wide" style="--b:var(--c-alert)" data-act="end" aria-label="Encerrar chamada">${I('phoneDown', 22)}</button>
      </div>`;
    },
    onAction(a, el, E) {
      if (a === 'mute') this.muted = !this.muted;
      if (a === 'speaker') { this.speaker = !this.speaker; el.classList.toggle('solid', this.speaker); }
      if (a === 'end') { E.stop('call'); E.alert(N.create.toast({ icon: 'phoneDown', color: 'var(--c-alert)', lead: 'Chamada encerrada', trail: mmss(Math.max(0, this.t)), w: 250 }), 1800); }
    },
  });

  /* ------------------------------------------------------------ Treino (UP.PRO) */
  N.create.workout = () => ({
    id: 'workout', name: 'Treino UP.PRO', kind: 'live', compactW: 214, expandedH: 210,
    t: 312, running: true,
    tick(dt) { if (this.running) this.t += dt; },
    values() {
      const t = this.t;
      return {
        time: mmss(t), steps: num(Math.round(897 + t * 2.6)), km: num(t * 0.0029, 2), kcal: num(Math.round(t * 0.18)),
        bpm: Math.round(134 + 6 * Math.sin(t / 9)), p: Math.min(1, (t * 0.0029) / 5), run: this.running, paused: !this.running,
      };
    },
    compact() { return { lead: `<span style="color:var(--c-workout)">${I('run', 18)}</span>`, trail: `<b class="num" style="color:var(--c-workout)" data-t="time"></b>` }; },
    minimal() { return ring('p', 26, 3, 'var(--c-workout)', I('run', 11)); },
    expanded() {
      return `
      <span class="flare" aria-hidden="true"></span>
      <div class="hdr">
        <span class="tag up">UP.PRO</span>
        <span class="row gap-sm">
          <button class="btn-round xs" style="--b:var(--c-workout)" data-act="toggle" aria-label="Pausar ou retomar treino">
            <span data-show="run">${I('pause', 13)}</span><span data-show="paused" hidden>${I('play', 13)}</span></button>
          <button class="btn-round xs" style="--b:#d9d6e0" data-act="end" aria-label="Encerrar treino">${I('x', 13)}</button>
        </span>
      </div>
      <div class="col tight"><b class="hero num" data-t="steps"></b><span class="muted small">passos · corrida ao ar livre</span></div>
      <div class="stats">
        <div><b class="num"><span data-t="km"></span><small>km</small></b><span>Distância</span></div>
        <div><b class="num"><span data-t="kcal"></span><small>kcal</small></b><span>Calorias</span></div>
        <div><b class="num" data-t="bpm"></b><span>BPM</span></div>
        <div><b class="num" data-t="time"></b><span>Tempo</span></div>
      </div>`;
    },
    onAction(a, el, E) {
      if (a === 'toggle') this.running = !this.running;
      if (a === 'end') {
        E.stop('workout');
        E.alert(N.create.toast({ icon: 'run', color: 'var(--c-workout)', lead: 'Treino concluído', trail: `${num(Math.round(this.t * 0.18))} kcal`, w: 262 }), 2600);
      }
    },
  });

  /* ------------------------------------------------------------ Navegação */
  const ROUTE = [
    { dir: 'turnRight', verb: 'Vire à direita', street: 'Av. Paulista', d: 420 },
    { dir: 'turnLeft', verb: 'Vire à esquerda', street: 'R. Augusta', d: 300 },
    { dir: 'straight', verb: 'Siga em frente', street: 'Al. Santos', d: 520 },
    { dir: 'flag', verb: 'Chegada', street: 'Parque Trianon', d: 160 },
  ];
  N.create.nav = () => ({
    id: 'nav', name: 'Navegação', kind: 'live', compactW: 214, expandedH: 168,
    step: 0, d: ROUTE[0].d,
    get variant() { return 's' + this.step; },
    get s() { return ROUTE[this.step]; },
    tick(dt, E) {
      this.d -= dt * 11;
      if (this.d > 0) return;
      if (this.step < ROUTE.length - 1) { this.step++; this.d = this.s.d; N.haptic(12); E.refresh(); }
      else { E.stop('nav'); E.alert(N.create.toast({ icon: 'flag', color: 'var(--c-nav)', lead: 'Você chegou', trail: 'Parque Trianon', w: 268 }), 2800); }
    },
    values() {
      const rest = ROUTE.slice(this.step + 1).reduce((s, r) => s + r.d, 0) + this.d;
      const dist = this.d >= 1000 ? `${num(this.d / 1000, 1)} km` : `${Math.max(10, Math.round(this.d / 10) * 10)} m`;
      return { dist, eta: `Chegada ${inMin(rest / 70)} · ${Math.max(1, Math.round(rest / 70))} min · ${num(rest / 1000, 1)} km` };
    },
    compact() {
      return { lead: `<span class="chip" style="--c:var(--c-nav)">${I(this.s.dir, 15)}</span>`, trail: `<b class="num" style="color:var(--c-nav)" data-t="dist"></b>` };
    },
    minimal() { return `<span style="color:var(--c-nav)">${I(this.s.dir, 18)}</span>`; },
    expanded() {
      return `
      <div class="hdr">
        <span class="turn">${I(this.s.dir, 28)}</span>
        <b class="big num" data-t="dist"></b>
      </div>
      <span class="title sm ell">${this.s.verb} · ${this.s.street}</span>
      <div class="row between">
        <span class="muted small num" data-t="eta"></span>
        <button class="btn-pill danger" data-act="end">Encerrar</button>
      </div>`;
    },
    onAction(a, el, E) { if (a === 'end') E.stop('nav'); },
  });

  /* ------------------------------------------------------------ Tradutor */
  const PHRASES = [
    ['Onde fica a estação de metrô?', 'Where is the subway station?'],
    ['Pode me trazer a conta, por favor?', 'Could you bring me the check, please?'],
    ['Quanto custa até o aeroporto?', 'How much is it to the airport?'],
  ];
  N.create.translate = () => ({
    id: 'translate', name: 'Tradutor', kind: 'live', compactW: 200, expandedH: 104,
    t: 0,
    get phase() { return Math.floor(this.t / 3.5) % 2; },
    tick(dt) { this.t += dt; },
    values() {
      const p = PHRASES[Math.floor(this.t / 7) % PHRASES.length];
      const listening = this.phase === 0;
      return { a: listening ? 'Ouvindo' : p[0], b: listening ? 'Listening' : p[1], lvl: listening ? 1 : 0.25 };
    },
    compact() { return { lead: '<b class="lang">PT</b>', trail: `<span class="row gap-xs"><b class="lang cyan">EN</b>${eq('var(--c-flight)', '', 3)}</span>` }; },
    minimal() { return `<span style="color:var(--c-flight)">${I('languages', 17)}</span>`; },
    expanded() {
      return `
      <div class="tr">
        <div class="col tight tr-side"><span class="muted xs">Português</span><b class="tr-txt" data-t="a"></b></div>
        <canvas class="tr-wave" aria-hidden="true"></canvas>
        <div class="col tight tr-side right"><span class="xs" style="color:var(--c-flight)">English</span><b class="tr-txt" style="color:var(--c-flight)" data-t="b"></b></div>
        <button class="btn-round xs" style="--b:#d9d6e0" data-act="end" aria-label="Encerrar tradução">${I('x', 12)}</button>
      </div>`;
    },
    mount(layer, mode) {
      if (mode !== 'expanded') return null;
      return N.wave(layer.querySelector('.tr-wave'), () => this.values().lvl, 'translate', true);
    },
    onAction(a, el, E) { if (a === 'end') E.stop('translate'); },
  });

  /* ------------------------------------------------------------ Avisos */
  N.create.toast = ({ icon, color, lead, trail, w = 240, ring: withRing = false }) => ({
    id: 'toast', name: lead, kind: 'alert', alertSize: { w, h: 36 },
    alertView() {
      return {
        lead: `<span class="row gap-xs" style="color:${color}">${withRing ? `<span class="pulse" style="--c:${color}">${I(icon, 14)}</span>` : I(icon, 16)}<b>${lead}</b></span>`,
        trail: `<span class="small" style="color:${color}">${trail}</span>`,
      };
    },
  });

  N.create.silent = (on) => ({
    id: 'silent', name: on ? 'Silencioso' : 'Toque', kind: 'alert', alertSize: { w: 214, h: 36 },
    alertView() {
      return {
        lead: `<span class="bellchip ${on ? 'on' : ''}">${I(on ? 'bellOff' : 'bell', 14, 'wiggle')}</span>`,
        trail: `<b style="color:${on ? 'var(--c-alert)' : 'var(--ink)'}">${on ? 'Silencioso' : 'Toque'}</b>`,
      };
    },
  });

  N.create.charging = (pct) => ({
    id: 'charging', name: 'Carregando', kind: 'alert', alertSize: { w: 252, h: 36 }, pct,
    values() { return { p: this.pct / 100 }; },
    alertView() {
      return {
        lead: `<span class="row gap-xs" style="color:var(--c-charge)">${I('bolt', 15)}<b>Carregando</b></span>`,
        trail: `<span class="row gap-xs"><b class="num" style="color:var(--c-charge)">${this.pct}%</b>${ring('p', 22, 3, 'var(--c-charge)')}</span>`,
      };
    },
  });

  /* ------------------------------------------------------------ Hoje (painel) */
  N.create.overview = () => {
    const d = new Date();
    const wd = d.toLocaleDateString('pt-BR', { weekday: 'long' });
    const day = d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
    const dots = Array.from({ length: 14 }, (_, i) => {
      const a = (i / 14) * Math.PI * 2 - Math.PI / 2, hue = 120 - i * 9;
      return `<circle cx="${32 + Math.cos(a) * 26}" cy="${32 + Math.sin(a) * 26}" r="${i < 6 ? 3.1 : 2.2}" fill="hsl(${hue} 85% 60%)" opacity="${i < 6 ? 1 : 0.35}"/>`;
    }).join('');
    return {
      id: 'overview', name: 'Hoje', kind: 'sheet', expandedH: 252, tapToClose: true,
      values() { return { clock: hhmm(), bat: (N.app ? N.app.battery : 82) / 100, batTxt: N.app ? N.app.battery : 82, steps: 6240 / 8000 }; },
      expanded() {
        return `
        <div class="hdr">
          <div class="col tight"><span class="muted small cap ell">${wd}</span><b class="title ell">${day}</b></div>
          <b class="big num thin" data-t="clock"></b>
        </div>
        <div class="gauges">
          <div class="gauge">${ring('bat', 64, 6, 'var(--c-charge)', `<b class="num" data-t="batTxt"></b>${I('bolt', 10)}`)}<span>Bateria</span></div>
          <div class="gauge">${ring('steps', 64, 6, 'var(--c-workout)', '<b class="num">6,2k</b>')}<span>Passos</span></div>
          <div class="gauge"><span class="ring" style="width:64px;height:64px">
            <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="tg" x1="0" x2="1"><stop offset="0" stop-color="#5ad1ff"/><stop offset="1" stop-color="#ffb340"/></linearGradient></defs>
            <circle cx="32" cy="32" r="27" fill="none" stroke="url(#tg)" stroke-width="5" stroke-linecap="round" pathLength="100" stroke-dasharray="75 100" transform="rotate(135 32 32)"/>
            <circle cx="${32 + Math.cos(Math.PI * 0.75 + Math.PI * 1.5 * 0.55) * 27}" cy="${32 + Math.sin(Math.PI * 0.75 + Math.PI * 1.5 * 0.55) * 27}" r="4" fill="#fff" stroke="#000" stroke-width="2"/></svg>
            <span class="ring-in col"><b class="num">24°</b><span class="xs muted num">18 · 29</span></span></span><span>Clima</span></div>
          <div class="gauge"><span class="ring" style="width:64px;height:64px"><svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">${dots}</svg>
            <span class="ring-in col"><b class="num">42</b><span class="xs muted">IQA</span></span></span><span>Ar</span></div>
        </div>
        <div class="event"><i></i><div class="col tight grow"><b class="small">Revisão do projeto</b><span class="muted xs num">14:00 – 15:00 · Sala 3</span></div>${ava('AL', '#a98cff', '#5d43c9', 26)}<span class="plus">+2</span></div>`;
      },
    };
  };

  /* ------------------------------------------------------------ Note (assistente) */
  const SUGGESTIONS = [
    ['Timer de 5 min', 'timer de 5 minutos'], ['Tocar música', 'tocar música'], ['Como está o tempo?', 'como está o tempo?'],
    ['Pedir corrida', 'pedir uma corrida'], ['Traduzir', 'traduzir para inglês'], ['Modo silencioso', 'ativar modo silencioso'],
  ];
  N.create.assistant = () => ({
    id: 'note', name: 'Note', kind: 'sheet', expandedH: 262, glow: true,
    text: 'Como posso ajudar?', status: 'Fale ou digite', level: 0.18, rec: null, ti: 0, wait: 0,
    values() { return { text: this.text, status: this.status, listening: !!this.rec }; },
    expanded() {
      return `
      <div class="hdr"><span class="row gap-sm"><span class="orb" aria-hidden="true"></span><b class="as-name">Note</b></span><span class="muted small as-status ell" data-t="status"></span></div>
      <p class="as-text" data-t="text" aria-live="polite"></p>
      <canvas class="as-wave" aria-hidden="true"></canvas>
      <div class="chips">${SUGGESTIONS.map(([l, q]) => `<button class="chip-btn" data-act="ask" data-q="${q}">${l}</button>`).join('')}</div>
      <form class="ask" autocomplete="off">
        <input id="note-ask" name="q" type="text" placeholder="Pergunte ao Note" aria-label="Pergunte ao Note" enterkeyhint="send">
        <button type="button" class="mic" data-act="mic" data-on="listening" aria-label="Falar com o Note">${I('mic', 18)}</button>
        <button type="submit" class="send" aria-label="Enviar">${I('send', 18)}</button>
      </form>`;
    },
    mount(layer, mode) { return mode === 'expanded' ? N.wave(layer.querySelector('.as-wave'), () => this.level) : null; },
    onAction(a, el, E) {
      if (a === 'ask') this.ask(el.dataset.q, E);
      if (a === 'mic') this.listen(E);
    },
    onSubmit(form, E) {
      const q = form.q.value.trim();
      if (!q) return;
      form.q.value = '';
      form.q.blur();
      this.ask(q, E);
    },
    ask(q, E) {
      clearInterval(this.ti); clearTimeout(this.wait);
      this.text = `“${q}”`; this.status = 'Pensando…'; this.level = 0.55;
      E.bindNow();
      this.wait = setTimeout(() => {
        const r = N.brain(q);
        this.status = r.status || 'Pronto'; this.level = 0.22;
        this.type(r.reply, E, () => {
          if (r.run) this.wait = setTimeout(() => { if (E.state.sheet === this) { E.dismiss(); r.run(); } }, 900);
        });
      }, 620);
    },
    type(str, E, done) {
      let i = 0;
      this.ti = setInterval(() => {
        i += 2;
        this.text = str.slice(0, i);
        E.bindNow();
        if (i >= str.length) { clearInterval(this.ti); done && done(); }
      }, 24);
    },
    listen(E) {
      if (this.rec) { this.rec.stop(); return; }
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      const fallback = (msg) => {
        this.rec = null; this.level = 0.18; this.status = msg; E.bindNow();
        const input = document.getElementById('note-ask');
        input && input.focus();
      };
      if (!SR) return fallback('Voz indisponível aqui. Digite sua pergunta.');
      let finalText = '';
      try {
        const r = new SR();
        r.lang = 'pt-BR'; r.interimResults = true; r.continuous = false;
        r.onresult = (e) => {
          let t = '';
          for (const res of e.results) t += res[0].transcript;
          this.text = t; this.level = 1;
          if (e.results[e.results.length - 1].isFinal) finalText = t;
          E.bindNow();
        };
        r.onerror = () => fallback('Não consegui ouvir. Digite sua pergunta.');
        r.onend = () => {
          this.rec = null; this.level = 0.18;
          if (finalText) this.ask(finalText, E); else E.bindNow();
        };
        this.rec = r; this.text = ''; this.status = 'Ouvindo…'; this.level = 0.9;
        r.start();
        E.bindNow();
      } catch (err) { fallback('Microfone bloqueado. Digite sua pergunta.'); }
    },
    onClose() { clearInterval(this.ti); clearTimeout(this.wait); if (this.rec) try { this.rec.abort(); } catch (e) { /* ok */ } },
  });
})(window.Note = window.Note || {});
