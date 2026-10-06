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
  N.ui = { ring, eq, ava, icon: I };

  /* ------------------------------------------------------------ Timer */
  N.create.timer = (sec = 300, label = 'Timer') => ({
    id: 'timer', name: 'Timer', kind: 'live', compactW: 176, expandedH: 60,
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
      return { lead: ring('p', 18, 2.5, 'var(--c-timer)'), trail: `<b class="num" style="color:var(--c-timer)" data-t="time"></b>` };
    },
    minimal() { return ring('p', 22, 2.5, 'var(--c-timer)', I('timer', 10)); },
    expanded() {
      return `
      <div class="hdr">
        <span class="row gap-sm">${ring('p', 30, 3.5, 'var(--c-timer)', I('timer', 13))}<b class="mid num" style="color:var(--c-timer)" data-t="time"></b></span>
        <span class="row gap-xs">
          <button class="btn-round sm" style="--b:var(--c-timer)" data-act="toggle" aria-label="Pausar ou retomar">
            <span data-show="run">${I('pause', 16)}</span><span data-show="paused" hidden>${I('play', 16)}</span></button>
          <button class="btn-round sm" style="--b:#d9d6e0" data-act="cancel" aria-label="Cancelar timer">${I('x', 16)}</button>
        </span>
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
    id: 'music', name: 'Música', kind: 'live', compactW: 176, expandedH: 100,
    i: 0, pos: 48, playing: true,
    get track() { return TRACKS[this.i]; },
    tick(dt) { if (this.playing) { this.pos += dt; if (this.pos >= this.track.d) this.skip(1); } },
    skip(d, E) { this.i = (this.i + d + TRACKS.length) % TRACKS.length; this.pos = 0; E && E.rerender(this); },
    values() {
      const t = this.track;
      return { pos: mmss(this.pos), rem: '-' + mmss(t.d - this.pos), p: this.pos / t.d, play: this.playing, pause: !this.playing };
    },
    compact() { return { lead: art(this.track.g, 20, 6), trail: eq('var(--c-music)', 'play') }; },
    minimal() { return eq('var(--c-music)', 'play', 3); },
    expanded() {
      const t = this.track;
      return `
      <div class="hdr">
        <span class="row gap-sm side">${art(t.g, 32, 9)}${eq('var(--c-music)', 'play')}</span>
        <span class="row gap-xs">
          <button class="btn-ghost" data-act="prev" aria-label="Faixa anterior">${I('prev', 18)}</button>
          <button class="btn-ghost" data-act="toggle" aria-label="Tocar ou pausar">
            <span data-show="play">${I('pause', 22)}</span><span data-show="pause" hidden>${I('play', 22)}</span></button>
          <button class="btn-ghost" data-act="next" aria-label="Próxima faixa">${I('next', 18)}</button>
        </span>
      </div>
      <p class="track ell"><b>${t.t}</b> <span class="muted">· ${t.a}</span></p>
      <div class="prog"><span class="num xs" data-t="pos"></span><div class="bar" style="--c:var(--c-music)"><i data-p="p"></i></div><span class="num xs muted" data-t="rem"></span></div>`;
    },
    onAction(a, el, E) {
      if (a === 'toggle') this.playing = !this.playing;
      if (a === 'next') this.skip(1, E);
      if (a === 'prev') this.pos > 4 ? (this.pos = 0) : this.skip(-1, E);
    },
  });

  /* ------------------------------------------------------------ Corrida */
  N.create.ride = () => ({
    id: 'ride', name: 'Corrida', kind: 'live', compactW: 176, expandedH: 60,
    eta: 190, total: 190,
    get variant() { return this.eta <= 0 ? 'chegou' : ''; },
    tick(dt, E) {
      if (this.eta <= 0) return;
      this.eta -= dt;
      if (this.eta <= 0) { N.haptic([20, 40, 20]); E.refresh(); }
    },
    values() {
      const m = Math.max(1, Math.ceil(this.eta / 60));
      return { min: this.eta > 0 ? `${m} min` : 'Chegou', title: this.eta > 0 ? `Em ${m} min` : 'Chegou', p: 1 - Math.max(0, this.eta) / this.total };
    },
    compact() {
      return { lead: `<span class="chip" style="--c:var(--c-ride)">${I('car', 13)}</span>`, trail: `<b class="num" style="color:var(--c-ride)" data-t="min"></b>` };
    },
    minimal() { return `<span style="color:var(--c-ride)">${I('car', 18)}</span>`; },
    expanded() {
      return `
      <div class="hdr">
        <span class="row gap-sm side"><span class="chip lg" style="--c:var(--c-ride)">${I('car', 17)}</span>
          <span class="col tight"><b class="small ell" data-t="title"></b><span class="muted xs ell">Rafael · Onix</span></span></span>
        <span class="row gap-xs">
          <button class="btn-round sm" style="--b:var(--c-call)" data-act="call" aria-label="Ligar para o motorista">${I('phone', 15)}</button>
          <button class="btn-round sm" style="--b:#d9d6e0" data-act="end" aria-label="Encerrar acompanhamento">${I('x', 15)}</button>
        </span>
      </div>`;
    },
    onAction(a, el, E) {
      if (a === 'end') E.stop('ride');
      if (a === 'call') { E.collapse(); E.start(N.create.call({ name: 'Rafael', initials: 'RS', outgoing: true })); }
    },
  });

  /* ------------------------------------------------------------ Voo */
  N.create.flight = () => ({
    id: 'flight', name: 'Voo', kind: 'live', compactW: 176, expandedH: 84,
    left: 7 * 3600 + 12 * 60, total: 11 * 3600 + 40 * 60,
    tick(dt) { this.left = Math.max(0, this.left - dt); },
    values() {
      const h = Math.floor(this.left / 3600), m = Math.floor((this.left % 3600) / 60);
      return { rem: `${h} h ${pad(m)} min`, short: `${h}h${pad(m)}`, p: 1 - this.left / this.total, eta: inMin(this.left / 60) };
    },
    compact() { return { lead: `<span style="color:var(--c-flight)">${I('plane', 14)}</span>`, trail: `<b class="num" style="color:var(--c-flight)" data-t="short"></b>` }; },
    minimal() { return ring('p', 22, 2.5, 'var(--c-flight)', I('plane', 10)); },
    expanded() {
      return `
      <div class="hdr">
        <span class="col tight"><b class="code">GRU</b><span class="muted xs">São Paulo</span></span>
        <span class="row gap-sm"><span class="col tight right"><b class="code">LIS</b><span class="muted xs num">Chega <span data-t="eta"></span></span></span>
          <button class="btn-round xs" style="--b:#d9d6e0" data-act="end" aria-label="Encerrar acompanhamento">${I('x', 12)}</button></span>
      </div>
      <div class="fl-line" data-p="p"><i></i><span class="fl-plane">${I('plane', 15)}</span></div>`;
    },
    onAction(a, el, E) { if (a === 'end') E.stop('flight'); },
  });

  /* ------------------------------------------------------------ Chamada */
  N.create.incoming = ({ name = 'Mãe', initials = 'M', label = 'Celular' } = {}) => ({
    id: 'incoming', name: `Chamada de ${name}`, kind: 'sheet', expandedH: 60, t: 0,
    tick(dt, E) {
      this.t += dt;
      if (Math.floor(this.t * 2) !== Math.floor((this.t - dt) * 2)) N.haptic(40);
      if (this.t > 22) { E.dismiss(); E.alert(N.create.toast({ icon: 'phoneDown', color: 'var(--c-alert)', lead: name, trail: 'Chamada perdida', w: 260 }), 3000); }
    },
    expanded() {
      return `
      <div class="hdr">
        <span class="row gap-sm side">${ava(initials, '#8e8e98', '#4b4b55', 36)}<span class="col tight"><span class="muted xs">${label}</span><b class="small ell">${name}</b></span></span>
        <span class="row gap-sm">
          <button class="btn-round sm solid" style="--b:var(--c-alert)" data-act="decline" aria-label="Recusar">${I('phoneDown', 17)}</button>
          <button class="btn-round sm solid ringing" style="--b:var(--c-call)" data-act="accept" aria-label="Atender">${I('phone', 17)}</button>
        </span>
      </div>`;
    },
    onAction(a, el, E) {
      E.dismiss();
      if (a === 'accept') E.start(N.create.call({ name, initials }));
    },
  });

  N.create.call = ({ name = 'Mãe', initials = 'M', outgoing = false } = {}) => ({
    id: 'call', name: `Chamada com ${name}`, kind: 'live', compactW: 184, expandedH: 60,
    t: outgoing ? -3 : 0, muted: false, speaker: false,
    get variant() { return this.t < 0 ? 'dialing' : ''; },
    tick(dt, E) { const was = this.t < 0; this.t += dt; if (was && this.t >= 0) E.refresh(); },
    values() { return { dur: this.t < 0 ? 'Chamando…' : mmss(this.t), mute: this.muted, unmute: !this.muted }; },
    compact() {
      return {
        lead: `<span class="row gap-xs" style="color:var(--c-call)">${I('phone', 13)}<b class="num" data-t="dur"></b></span>`,
        trail: eq('var(--c-call)', '', 5),
      };
    },
    minimal() { return `<span style="color:var(--c-call)">${I('phone', 17)}</span>`; },
    expanded() {
      return `
      <div class="hdr">
        <span class="row gap-sm side">${ava(initials, '#8e8e98', '#4b4b55', 34)}<span class="col tight"><b class="small ell">${name}</b><span class="num xs" style="color:var(--c-call)" data-t="dur"></span></span></span>
        <span class="row gap-xs">
          <button class="btn-round sm" data-act="mute" style="--b:#d9d6e0" aria-label="Silenciar microfone">
            <span data-show="unmute">${I('mic', 16)}</span><span data-show="mute" hidden>${I('micOff', 16)}</span></button>
          <button class="btn-round sm solid wide" style="--b:var(--c-alert)" data-act="end" aria-label="Encerrar chamada">${I('phoneDown', 17)}</button>
        </span>
      </div>`;
    },
    onAction(a, el, E) {
      if (a === 'mute') this.muted = !this.muted;
      if (a === 'end') { E.stop('call'); E.alert(N.create.toast({ icon: 'phoneDown', color: 'var(--c-alert)', lead: 'Chamada encerrada', trail: mmss(Math.max(0, this.t)), w: 250 }), 1800); }
    },
  });

  /* ------------------------------------------------------------ Treino (UP.PRO) */
  N.create.workout = () => ({
    id: 'workout', name: 'Treino UP.PRO', kind: 'live', compactW: 176, expandedH: 60,
    t: 312, running: true,
    tick(dt) { if (this.running) this.t += dt; },
    values() {
      const t = this.t;
      return {
        time: mmss(t), steps: num(Math.round(897 + t * 2.6)), km: num(t * 0.0029, 2), kcal: num(Math.round(t * 0.18)),
        bpm: Math.round(134 + 6 * Math.sin(t / 9)), p: Math.min(1, (t * 0.0029) / 5), run: this.running, paused: !this.running,
      };
    },
    compact() { return { lead: `<span style="color:var(--c-workout)">${I('run', 15)}</span>`, trail: `<b class="num" style="color:var(--c-workout)" data-t="time"></b>` }; },
    minimal() { return ring('p', 22, 2.5, 'var(--c-workout)', I('run', 10)); },
    expanded() {
      return `
      <div class="hdr">
        <span class="row gap-sm side"><span class="chip lg" style="--c:var(--c-workout)">${I('run', 17)}</span>
          <span class="col tight"><b class="small num"><span data-t="steps"></span> passos</b><span class="muted xs num ell"><span data-t="km"></span> km · <span data-t="bpm"></span> bpm</span></span></span>
        <span class="row gap-xs"><b class="small num" style="color:var(--c-workout)" data-t="time"></b>
          <button class="btn-round xs" style="--b:var(--c-workout)" data-act="toggle" aria-label="Pausar ou retomar treino">
            <span data-show="run">${I('pause', 12)}</span><span data-show="paused" hidden>${I('play', 12)}</span></button>
          <button class="btn-round xs" style="--b:#d9d6e0" data-act="end" aria-label="Encerrar treino">${I('x', 12)}</button></span>
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
    id: 'nav', name: 'Navegação', kind: 'live', compactW: 176, expandedH: 60,
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
      return { dist, eta: `${inMin(rest / 70)} · ${Math.max(1, Math.round(rest / 70))} min` };
    },
    compact() {
      return { lead: `<span class="chip" style="--c:var(--c-nav)">${I(this.s.dir, 13)}</span>`, trail: `<b class="num" style="color:var(--c-nav)" data-t="dist"></b>` };
    },
    minimal() { return `<span style="color:var(--c-nav)">${I(this.s.dir, 18)}</span>`; },
    expanded() {
      return `
      <div class="hdr">
        <span class="row gap-sm side"><span class="turn">${I(this.s.dir, 20)}</span>
          <span class="col tight"><b class="small num" data-t="dist"></b><span class="muted xs ell">${this.s.street}</span></span></span>
        <span class="row gap-sm"><span class="muted xs num right" data-t="eta"></span>
          <button class="btn-round xs" style="--b:#d9d6e0" data-act="end" aria-label="Encerrar navegação">${I('x', 12)}</button></span>
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
    id: 'translate', name: 'Tradutor', kind: 'live', compactW: 170, expandedH: 80,
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
      <div class="hdr">
        <span class="col tight"><span class="muted xs">Português</span><b class="small ell" data-t="a"></b></span>
        <span class="col tight right"><span class="xs" style="color:var(--c-flight)">English</span><b class="small ell" style="color:var(--c-flight)" data-t="b"></b></span>
      </div>
      <div class="row gap-sm"><canvas class="tr-wave" aria-hidden="true"></canvas>
        <button class="btn-round xs" style="--b:#d9d6e0" data-act="end" aria-label="Encerrar tradução">${I('x', 12)}</button></div>`;
    },
    mount(layer, mode) {
      if (mode !== 'expanded') return null;
      return N.wave(layer.querySelector('.tr-wave'), () => this.values().lvl, 'translate', true);
    },
    onAction(a, el, E) { if (a === 'end') E.stop('translate'); },
  });

  /* ------------------------------------------------------------ Avisos */
  N.create.toast = ({ icon, color, lead, trail, w = 240, ring: withRing = false }) => ({
    id: 'toast', name: lead, kind: 'alert', alertSize: { w: Math.min(w + 10, 280), h: 30 },
    alertView() {
      return {
        lead: `<span class="row gap-xs" style="color:${color}">${withRing ? `<span class="pulse" style="--c:${color}">${I(icon, 14)}</span>` : I(icon, 16)}<b>${lead}</b></span>`,
        trail: `<span class="small" style="color:${color}">${trail}</span>`,
      };
    },
  });

  N.create.silent = (on) => ({
    id: 'silent', name: on ? 'Silencioso' : 'Toque', kind: 'alert', alertSize: { w: 204, h: 30 },
    alertView() {
      return {
        lead: `<span class="bellchip ${on ? 'on' : ''}">${I(on ? 'bellOff' : 'bell', 14, 'wiggle')}</span>`,
        trail: `<b style="color:${on ? 'var(--c-alert)' : 'var(--ink)'}">${on ? 'Silencioso' : 'Toque'}</b>`,
      };
    },
  });

  N.create.charging = (pct) => ({
    id: 'charging', name: 'Carregando', kind: 'alert', alertSize: { w: 226, h: 30 }, pct,
    values() { return { p: this.pct / 100 }; },
    alertView() {
      return {
        lead: `<span class="row gap-xs" style="color:var(--c-charge)">${I('bolt', 15)}<b>Carregando</b></span>`,
        trail: `<span class="row gap-xs"><b class="num" style="color:var(--c-charge)">${this.pct}%</b>${ring('p', 18, 2.5, 'var(--c-charge)')}</span>`,
      };
    },
  });

  /* ------------------------------------------------------------ Hoje (painel) */
  N.create.overview = () => {
    const d = new Date();
    const wd = d.toLocaleDateString('pt-BR', { weekday: 'long' });
    const day = d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
    const mini = (key, color, inner, label) => `<span class="mini-g" title="${label}">${ring(key, 34, 3.5, color, inner)}</span>`;
    return {
      id: 'overview', name: 'Hoje', kind: 'sheet', expandedH: 64, tapToClose: true,
      values() { return { clock: hhmm(), bat: (N.app ? N.app.battery : 82) / 100, batTxt: N.app ? N.app.battery : 82, steps: 6240 / 8000, temp: 0.55 }; },
      expanded() {
        return `
        <div class="hdr">
          <span class="col tight"><b class="mid num thin" data-t="clock"></b><span class="muted xs cap ell">${wd}, ${day}</span></span>
          <span class="row gap-xs">
            ${mini('bat', 'var(--c-charge)', '<b class="num" data-t="batTxt"></b>', 'Bateria')}
            ${mini('steps', 'var(--c-workout)', '<b class="num">78</b>', 'Passos: 78% da meta')}
            ${mini('temp', 'var(--c-flight)', '<b class="num">24°</b>', 'Clima')}
          </span>
        </div>`;
      },
    };
  };

  /* ------------------------------------------------------------ Menu de opções (toque na ilha) */
  // Cada opção: id, rótulo, ícone, cor e o que fazer. O app Android troca "run" pelas ações reais.
  const demo = (label) => (E) => E.alert(N.create.toast({ icon: 'sparkle', color: 'var(--note)', lead: label, trail: 'no app Android', w: 250 }), 1800);
  let torch = false;
  N.hubOptions = [
    { id: 'chat', label: 'Conversar', icon: 'chat', color: 'var(--note)', run: (E) => E.present(N.create.assistant()) },
    { id: 'timer', label: 'Timer', icon: 'timer', color: 'var(--c-timer)', run: (E) => E.present(N.create.timerPick()) },
    { id: 'torch', label: 'Lanterna', icon: 'flash', color: '#ffd60a', run: (E) => { torch = !torch; E.alert(N.create.toast({ icon: 'flash', color: '#ffd60a', lead: 'Lanterna', trail: torch ? 'Ligada' : 'Desligada', w: 210 }), 1600); } },
    { id: 'silent', label: 'Silencioso', icon: 'bellOff', color: 'var(--c-alert)', run: () => N.app && N.app.setSilent(!N.app.silent) },
    { id: 'music', label: 'Música', icon: 'music', color: 'var(--c-music)', run: (E) => { if (!E.focus('music')) E.start(N.create.music(), { present: true }); } },
    { id: 'camera', label: 'Câmera', icon: 'camera', color: '#d9d6e0', run: demo('Câmera') },
    { id: 'shot', label: 'Captura', icon: 'screenshot', color: 'var(--c-flight)', run: demo('Captura de tela') },
    { id: 'today', label: 'Hoje', icon: 'calendar', color: 'var(--c-charge)', run: (E) => E.present(N.create.overview()) },
    { id: 'dial', label: 'Ligar', icon: 'phone', color: 'var(--c-call)', run: (E) => setTimeout(() => E.present(N.create.incoming()), 400) },
    { id: 'calc', label: 'Calculadora', icon: 'calc', color: 'var(--c-timer)', run: demo('Calculadora') },
    { id: 'wifi', label: 'Wi-Fi', icon: 'wifi', color: 'var(--c-nav)', run: demo('Wi-Fi') },
    { id: 'bt', label: 'Bluetooth', icon: 'bluetooth', color: 'var(--c-nav)', run: demo('Bluetooth') },
    { id: 'lock', label: 'Bloquear', icon: 'lock', color: '#d9d6e0', run: demo('Bloquear tela') },
    { id: 'settings', label: 'Ajustes', icon: 'sliders', color: '#d9d6e0', run: demo('Ajustes') },
  ];

  /* Dados do painel. O app Android substitui por dados reais (música, bateria, apps instalados). */
  N.hubData = () => {
    const m = N.island.get('music');
    return {
      media: m ? { title: m.track ? m.track.t : m.title, artist: m.track ? m.track.a : m.artist, playing: m.playing, art: '', g: m.track ? m.track.g : ['#7b5cff', '#f08bd6'] } : null,
      status: [{ v: `${N.app ? N.app.battery : 82}%`, l: 'bateria', c: 'var(--c-charge)' }, { v: '24°', l: 'nublado', c: 'var(--c-flight)' }],
      apps: [
        ['WhatsApp', '#25d366', 'W'], ['Instagram', 'linear-gradient(135deg,#f9ce34,#ee2a7b,#6228d7)', 'I'], ['YouTube', '#ff0033', 'Y'],
        ['Spotify', '#1ed760', 'S'], ['Chrome', 'conic-gradient(#ea4335 0 33%,#fbbc05 0 66%,#34a853 0)', 'C'], ['Telegram', '#2aabee', 'T'],
        ['Gmail', '#ea4335', 'M'], ['Mapas', '#34a853', 'M'], ['UP.PRO', '#17171b', 'U'], ['Fotos', 'linear-gradient(135deg,#4285f4,#ea4335)', 'F'],
      ].map(([label, bg, l]) => ({ id: label, label, bg, letter: l })),
    };
  };
  const esc = (t) => String(t == null ? '' : t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const safeImg = (u) => (typeof u === 'string' && /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(u) ? u : '');

  /* Painel do Note: widgets, ações rápidas e apps, no estilo LaunchMe, adaptado ao celular. */
  N.create.hub = () => {
    const d = new Date();
    const wd = d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
    const data = N.hubData();
    const m = data.media;
    const art = m && safeImg(m.art)
      ? `<span class="art img" style="width:38px;height:38px;border-radius:10px;background-image:url(${safeImg(m.art)})"></span>`
      : `<span class="art" style="--g1:${(m && m.g ? m.g[0] : '#3a3845')};--g2:${(m && m.g ? m.g[1] : '#24232b')};width:38px;height:38px;border-radius:10px"></span>`;
    return {
      id: 'hub', name: 'Painel do Note', kind: 'sheet', expandedH: 232, expandedW: 380, tapToClose: true,
      playing: m ? !!m.playing : false,
      values() { return { clock: hhmm(), play: this.playing, pause: !this.playing }; },
      expanded() {
        return `
        <div class="hdr">
          <span class="row gap-sm"><span class="orb" aria-hidden="true"></span><b class="as-name">Note</b></span>
          <span class="row gap-sm"><span class="muted xs num" data-t="clock"></span>
            <button class="btn-round xs" style="--b:var(--note)" data-act="talk" aria-label="Falar com o Note">${I('mic', 13)}</button></span>
        </div>
        <div class="widgets">
          <button class="wg wg-media" data-act="media">
            ${art}
            <span class="col tight grow"><b class="xs ell">${m ? esc(m.title) : 'Nada tocando'}</b><span class="xs muted ell">${m ? esc(m.artist) : 'Toque para música'}</span></span>
            <span class="wg-play">${m ? `<span data-show="play">${I('pause', 14)}</span><span data-show="pause" hidden>${I('play', 14)}</span>` : I('music', 14)}</span>
          </button>
          <button class="wg wg-date" data-act="today"><span class="wg-wd">${esc(wd)}</span><b class="wg-day num">${d.getDate()}</b></button>
          <button class="wg wg-stat" data-act="today">${data.status.map((x) => `<span class="col tight"><b class="small num" style="color:${x.c}">${esc(x.v)}</b><span class="xs muted ell">${esc(x.l)}</span></span>`).join('')}</button>
        </div>
        <div class="hub" role="list">${N.hubOptions.map((o) => `
          <button class="hub-op" role="listitem" data-act="op" data-id="${o.id}" style="--c:${o.color}">
            <span class="hub-ic">${I(o.icon, 17)}</span><span class="hub-lb">${o.label}</span></button>`).join('')}
        </div>
        <div class="dock-apps" role="list">${data.apps.map((a) => {
          const icon = safeImg(a.icon);
          return `<button class="app-mini ${icon ? 'img' : ''}" role="listitem" data-act="app" data-id="${esc(a.id)}" aria-label="Abrir ${esc(a.label)}"
            style="${icon ? `background-image:url(${icon})` : `background:${a.bg}`}">${icon ? '' : esc(a.letter)}</button>`;
        }).join('')}</div>`;
      },
      onAction(a, el, E) {
        if (a === 'talk') { const s = E.present(N.create.assistant()); setTimeout(() => s.listen(E), 350); return; }
        if (a === 'today') { E.present(N.create.overview()); return; }
        if (a === 'media') {
          if (!m) { E.dismiss(); setTimeout(() => N.hubOptions.find((x) => x.id === 'music').run(E), 120); return; }
          this.playing = !this.playing;
          if (N.mediaToggle) N.mediaToggle(); else { const mu = E.get('music'); if (mu) mu.playing = this.playing; }
          return;
        }
        if (a === 'app') {
          E.dismiss();
          if (N.openApp) N.openApp(el.dataset.id);
          else setTimeout(() => E.alert(N.create.toast({ icon: 'sparkle', color: 'var(--note)', lead: el.dataset.id, trail: 'abre no app Android', w: 250 }), 1800), 120);
          return;
        }
        const o = N.hubOptions.find((x) => x.id === el.dataset.id);
        if (!o) return;
        E.dismiss();
        setTimeout(() => o.run(E), 120);
      },
    };
  };

  /* Timer rápido: escolhe o tempo com um toque. */
  N.create.timerPick = () => ({
    id: 'timerpick', name: 'Novo timer', kind: 'sheet', expandedH: 60, tapToClose: true,
    expanded() {
      return `
      <div class="hdr">
        <span class="row gap-sm" style="color:var(--c-timer)"><span class="chip lg" style="--c:var(--c-timer)">${I('timer', 17)}</span><span class="col tight"><b class="small">Timer</b><span class="xs muted">minutos</span></span></span>
        <span class="row gap-xs">${[1, 5, 10, 15].map((m) => `<button class="pick" data-act="pick" data-min="${m}" aria-label="${m} minutos">${m}</button>`).join('')}</span>
      </div>`;
    },
    onAction(a, el, E) {
      if (a !== 'pick') return;
      const m = +el.dataset.min;
      E.dismiss();
      setTimeout(() => E.start(N.create.timer(m * 60, `Timer ${m} min`), { present: true }), 150);
    },
  });

  /* ------------------------------------------------------------ Note (assistente) */
  N.create.assistant = () => ({
    id: 'note', name: 'Note', kind: 'sheet', expandedH: 124, glow: true,
    text: 'Como posso ajudar?', status: 'Fale ou digite', level: 0.18, rec: null, ti: 0, wait: 0,
    values() { return { text: this.text, status: this.status, listening: !!this.rec }; },
    expanded() {
      return `
      <div class="hdr"><span class="row gap-sm"><span class="orb" aria-hidden="true"></span><b class="as-name">Note</b></span><span class="muted small as-status ell" data-t="status"></span></div>
      <p class="as-text" data-t="text" aria-live="polite"></p>
      <form class="ask" autocomplete="off">
        <input id="note-ask" name="q" type="text" placeholder="Peça um timer, música, silencioso…" aria-label="Pergunte ao Note" enterkeyhint="send">
        <button type="button" class="mic" data-act="mic" data-on="listening" aria-label="Falar com o Note">${I('mic', 18)}</button>
        <button type="submit" class="send" aria-label="Enviar">${I('send', 18)}</button>
      </form>`;
    },
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
      if (N.nativeListen) return N.nativeListen(this, E);
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
