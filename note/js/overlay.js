/* Note — ponte entre a ilha e o app Android (note-android).
   O Android expõe window.NoteAndroid; esta página expõe window.NoteBridge para o Android chamar. */
(function (N) {
  const A = window.NoteAndroid || null;
  const E = N.island;
  const { ring, eq, icon: I } = N.ui;
  const { mmss } = N.fmt;
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const safeImg = (u) => (typeof u === 'string' && /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(u) ? u : '');
  const call = (fn, ...args) => { try { if (A && A[fn]) return A[fn](...args); } catch (e) { /* app indisponível */ } return null; };

  N.overlay = true;
  N.haptic = (p = 8) => call('haptic', JSON.stringify(Array.isArray(p) ? p : [p]));

  N.app = {
    battery: 100,
    silent: false,
    setSilent(on) { call('setSilent', !!on); },
    charge() { E.alert(N.create.charging(N.app.battery), 2600); },
  };

  /* Sugestões do assistente que fazem sentido no celular de verdade. */
  N.suggestions = [
    ['Timer de 5 min', 'timer de 5 minutos'], ['Tocar música', 'tocar música'], ['Resumo de hoje', 'resumo de hoje'],
    ['Silencioso', 'ativar modo silencioso'], ['Bateria', 'como está a bateria?'], ['Ligar', 'ligar para alguém'],
  ];

  /* ---------------------------------------------------------- música real (MediaSession) */
  const media = {
    id: 'music', name: 'Música', kind: 'live', compactW: 214, expandedH: 236,
    key: '', title: '', artist: '', app: '', art: '', dur: 0, pos: 0, playing: false,
    get variant() { return this.key; },
    tick(dt) { if (this.playing && this.dur) this.pos = Math.min(this.dur, this.pos + dt); },
    values() {
      return {
        pos: mmss(this.pos), rem: this.dur ? '-' + mmss(this.dur - this.pos) : '', p: this.dur ? this.pos / this.dur : 0,
        play: this.playing, pause: !this.playing,
      };
    },
    artHtml(size, r) {
      return this.art
        ? `<span class="art img" style="width:${size}px;height:${size}px;border-radius:${r}px;background-image:url(${this.art})"></span>`
        : `<span class="art" style="--g1:#7b5cff;--g2:#f08bd6;width:${size}px;height:${size}px;border-radius:${r}px"></span>`;
    },
    compact() { return { lead: this.artHtml(24, 7), trail: eq('var(--c-music)', 'play') }; },
    minimal() { return eq('var(--c-music)', 'play', 3); },
    expanded() {
      return `
      <div class="hdr">
        <span class="tag ell" style="--c:var(--c-music)">${I('music', 13)} ${esc(this.app || 'Tocando')}</span>
        ${eq('var(--c-music)', 'play')}
      </div>
      <div class="row gap">
        ${this.artHtml(56, 14)}
        <div class="meta"><b>${esc(this.title || 'Sem título')}</b><span class="muted">${esc(this.artist)}</span><canvas class="dots" aria-hidden="true"></canvas></div>
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
      return N.dotMatrix(layer.querySelector('.dots'), () => `${this.title} - ${this.artist}     `, () => this.playing);
    },
    onAction(a) {
      if (a === 'toggle') this.playing = !this.playing;
      call('media', a);
    },
  };

  /* ---------------------------------------------------------- notificação (estilo HyperOS) */
  const notice = (n) => {
    const icon = safeImg(n.icon);
    return {
      id: 'notice', name: n.app, kind: 'alert', alertSize: { w: 360, h: 92 },
      alertHtml() {
        return `
        <div class="hdr"><span class="xs muted ell">${esc(n.app)}</span><span class="xs muted">agora</span></div>
        <div class="row gap-sm">
          <span class="nt-ic ${icon ? 'img' : ''}" ${icon ? `style="background-image:url(${icon})"` : ''}>${esc((n.app || '?').charAt(0))}</span>
          <div class="col tight grow"><b class="small ell">${esc(n.title)}</b><span class="xs muted ell">${esc(n.text)}</span></div>
        </div>`;
      },
      onTap() { call('open', n.key); },
    };
  };

  /* ---------------------------------------------------------- chamadas reais */
  const ANSWER = /atend|answer|aceit|accept/i, DECLINE = /recus|declin|rejeit|deslig|hang|encerr|end/i;
  let callKey = '';
  const incomingReal = (c) => {
    const ai = c.actions.findIndex((t) => ANSWER.test(t)), di = c.actions.findIndex((t) => DECLINE.test(t));
    return {
      id: 'incoming', name: `Chamada de ${c.title}`, kind: 'sheet', expandedH: 84, key: c.key,
      expanded() {
        return `
        <div class="row gap call-in">
          ${N.ui.ava(esc((c.title || '?').charAt(0)), '#8e8e98', '#4b4b55', 52)}
          <div class="col grow tight"><span class="muted small ell">${esc(c.text || 'Chamada')}</span><b class="title sm ell">${esc(c.title)}</b></div>
          ${di >= 0 ? `<button class="btn-round solid" style="--b:var(--c-alert)" data-act="decline" aria-label="Recusar">${I('phoneDown', 22)}</button>` : ''}
          ${ai >= 0 ? `<button class="btn-round solid ringing" style="--b:var(--c-call)" data-act="accept" aria-label="Atender">${I('phone', 22)}</button>` : ''}
        </div>`;
      },
      onAction(a) {
        E.dismiss();
        if (a === 'accept') { call('action', c.key, ai); startCall(c); }
        if (a === 'decline') call('action', c.key, di);
      },
    };
  };
  const startCall = (c) => {
    callKey = c.key;
    const live = N.create.call({ name: c.title || 'Chamada', initials: (c.title || '?').charAt(0) });
    const di = c.actions.findIndex((t) => DECLINE.test(t));
    live.onAction = function (a, el) {
      if (a === 'end') { if (di >= 0) call('action', c.key, di); E.stop('call'); }
      if (a === 'mute') this.muted = !this.muted;
      if (a === 'speaker') { this.speaker = !this.speaker; el.classList.toggle('solid', this.speaker); }
    };
    E.start(live);
  };

  /* ---------------------------------------------------------- painel Hoje com dados do celular */
  N.create.overview = () => {
    const d = new Date();
    const wd = d.toLocaleDateString('pt-BR', { weekday: 'long' });
    const day = d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
    let s = {};
    try { s = JSON.parse(call('stats') || '{}'); } catch (e) { s = {}; }
    const pct = (v) => Math.max(0, Math.min(100, Math.round(v || 0)));
    const g = [
      { k: 'g1', label: 'Bateria', p: pct(s.battery ?? N.app.battery), color: 'var(--c-charge)', unit: '%' },
      { k: 'g2', label: 'Armazen.', p: pct(s.storage), color: 'var(--c-flight)', unit: '%' },
      { k: 'g3', label: 'Volume', p: pct(s.volume), color: 'var(--c-music)', unit: '%' },
      { k: 'g4', label: 'Avisos', p: Math.min(1, (s.notices || 0) / 10) * 100, color: 'var(--c-timer)', text: String(s.notices || 0) },
    ];
    return {
      id: 'overview', name: 'Hoje', kind: 'sheet', expandedH: 186, tapToClose: true,
      values() {
        const v = { clock: N.fmt.hhmm() };
        g.forEach((x) => { v[x.k] = x.p / 100; });
        return v;
      },
      expanded() {
        return `
        <div class="hdr">
          <div class="col tight"><span class="muted small cap ell">${wd}</span><b class="title ell">${day}</b></div>
          <b class="big num thin" data-t="clock"></b>
        </div>
        <div class="gauges">${g.map((x) => `<div class="gauge">${ring(x.k, 60, 6, x.color, `<b class="num">${x.text || x.p}</b>${x.text ? '' : `<small>${x.unit}</small>`}`)}<span>${x.label}</span></div>`).join('')}</div>`;
      },
    };
  };

  /* ---------------------------------------------------------- assistente: voz e comandos do celular */
  let listening = null;
  N.nativeListen = (a, E2) => {
    if (listening) { call('stopListening'); return; }
    listening = a;
    a.rec = { stop() {}, abort() { call('stopListening'); } };
    a.text = ''; a.status = 'Ouvindo…'; a.level = 0.9;
    E2.bindNow();
    call('listen');
  };

  const think = N.brain;
  N.brain = (q) => {
    const r = think(q);
    const demo = ['Corrida', 'Voo', 'Mapas', 'Tradutor', 'UP.PRO'];
    if (r.status === 'Música') {
      r.reply = media.key ? 'Retomando a música.' : 'Abra um app de música e eu mostro aqui.';
      r.run = media.key ? () => { call('media', 'play'); E.focus('music'); } : null;
    } else if (r.status === 'Chamada') {
      r.reply = 'Abrindo o telefone.';
      r.run = () => call('dial');
    } else if (r.status === 'Hoje') {
      r.reply = 'Abrindo o resumo de hoje.';
    } else if (r.status === 'Clima') {
      r.reply = 'Ainda não leio o clima. Por enquanto cuido de timers, música, chamadas, notificações e do modo silencioso.';
    } else if (demo.includes(r.status)) {
      r.reply += ' (demonstração)';
    }
    return r;
  };

  /* ---------------------------------------------------------- chamadas do Android */
  window.NoteBridge = {
    init(width, top, battery) {
      N.app.battery = battery || N.app.battery;
      E.setScale(1);
      E.layout(width, top);
    },
    outside() { E.collapse(); },
    battery(level, plugged, justPlugged) {
      N.app.battery = level;
      if (justPlugged) E.alert(N.create.charging(level), 2600);
    },
    ringer(mode) {
      const on = mode !== 'normal';
      N.app.silent = on;
      E.alert(N.create.silent(on), 1800);
    },
    media(m) {
      if (!m) { if (E.get('music')) E.stop('music'); media.key = ''; return; }
      const key = `${m.title}|${m.artist}`;
      const fresh = !E.get('music');
      Object.assign(media, {
        title: m.title || '', artist: m.artist || '', app: m.app || '', dur: m.dur || 0, pos: m.pos || 0,
        playing: !!m.playing, art: safeImg(m.art) || (key === media.key ? media.art : ''),
      });
      const changed = key !== media.key;
      media.key = key;
      if (fresh) { if (m.playing) E.start(media); return; }
      if (changed) E.refresh(); else E.bindNow();
    },
    notify(n) {
      if (n.category === 'call') {
        if (E.state.sheet && E.state.sheet.key === n.key) return;
        if (n.actions.some((t) => ANSWER.test(t))) { E.present(incomingReal(n)); N.haptic([40, 80, 40]); }
        else if (n.ongoing && callKey !== n.key) startCall(n);
        return;
      }
      E.alert(notice(n), 4200);
    },
    removed(key) {
      if (E.state.sheet && E.state.sheet.key === key) E.dismiss();
      if (key === callKey) { callKey = ''; if (E.get('call')) E.stop('call'); }
    },
    speech(text, final, error) {
      const a = listening;
      if (!a) return;
      if (error) { listening = null; a.rec = null; a.level = 0.18; a.status = error; E.bindNow(); return; }
      a.text = text; E.bindNow();
      if (final) { listening = null; a.rec = null; a.level = 0.18; if (text) a.ask(text, E); else E.bindNow(); }
    },
    level(v) { if (listening) listening.level = Math.max(0.3, Math.min(1, v)); },
  };

  /* Tamanho da janela e teclado acompanham a ilha. */
  E.onBounds((half, bottom) => call('setBounds', half, bottom));
  E.onChange((st, mode, act) => {
    call('setKeyboard', !!(mode === 'expanded' && act && act.id === 'note'));
    if (!(st.sheet && st.sheet.id === 'note') && listening) { listening = null; call('stopListening'); }
  });

  E.mount(document.getElementById('screen'));
  E.layout(window.innerWidth || 393, 6);
  call('ready');
})(window.Note = window.Note || {});
