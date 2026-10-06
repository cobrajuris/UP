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

  /* ---------------------------------------------------------- música real (MediaSession) */
  const media = {
    id: 'music', name: 'Música', kind: 'live', compactW: 176, expandedH: 100,
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
    compact() { return { lead: this.artHtml(20, 6), trail: eq('var(--c-music)', 'play') }; },
    minimal() { return eq('var(--c-music)', 'play', 3); },
    expanded() {
      return `
      <div class="hdr">
        <span class="row gap-sm side">${this.artHtml(32, 9)}<span class="col tight"><span class="xs muted ell">${esc(this.app)}</span>${eq('var(--c-music)', 'play')}</span></span>
        <span class="row gap-xs">
          <button class="btn-ghost" data-act="prev" aria-label="Faixa anterior">${I('prev', 18)}</button>
          <button class="btn-ghost" data-act="toggle" aria-label="Tocar ou pausar">
            <span data-show="play">${I('pause', 22)}</span><span data-show="pause" hidden>${I('play', 22)}</span></button>
          <button class="btn-ghost" data-act="next" aria-label="Próxima faixa">${I('next', 18)}</button>
        </span>
      </div>
      <p class="track ell"><b>${esc(this.title || 'Sem título')}</b> <span class="muted">${this.artist ? '· ' + esc(this.artist) : ''}</span></p>
      <div class="prog"><span class="num xs" data-t="pos"></span><div class="bar" style="--c:var(--c-music)"><i data-p="p"></i></div><span class="num xs muted" data-t="rem"></span></div>`;
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
      id: 'notice', name: n.app, kind: 'alert', alertSize: { w: 330, h: 60 },
      alertHtml() {
        return `
        <div class="hdr">
          <span class="row gap-sm side"><span class="nt-ic ${icon ? 'img' : ''}" ${icon ? `style="background-image:url(${icon})"` : ''}>${esc((n.app || '?').charAt(0))}</span>
            <span class="col tight"><b class="small ell">${esc(n.title)}</b><span class="xs muted ell">${esc(n.text)}</span></span></span>
          <span class="col tight right"><span class="xs muted ell">${esc(n.app)}</span><span class="xs muted">agora</span></span>
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
      id: 'incoming', name: `Chamada de ${c.title}`, kind: 'sheet', expandedH: 60, key: c.key,
      expanded() {
        return `
        <div class="hdr">
          <span class="row gap-sm side">${N.ui.ava(esc((c.title || '?').charAt(0)), '#8e8e98', '#4b4b55', 36)}<span class="col tight"><span class="muted xs ell">${esc(c.text || 'Chamada')}</span><b class="small ell">${esc(c.title)}</b></span></span>
          <span class="row gap-sm">
            ${di >= 0 ? `<button class="btn-round sm solid" style="--b:var(--c-alert)" data-act="decline" aria-label="Recusar">${I('phoneDown', 17)}</button>` : ''}
            ${ai >= 0 ? `<button class="btn-round sm solid ringing" style="--b:var(--c-call)" data-act="accept" aria-label="Atender">${I('phone', 17)}</button>` : ''}
          </span>
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
    live.onAction = function (a) {
      if (a === 'end') { if (di >= 0) call('action', c.key, di); E.stop('call'); }
      if (a === 'mute') this.muted = !this.muted;
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
      id: 'overview', name: 'Hoje', kind: 'sheet', expandedH: 64, tapToClose: true,
      values() {
        const v = { clock: N.fmt.hhmm() };
        g.forEach((x) => { v[x.k] = x.p / 100; });
        return v;
      },
      expanded() {
        return `
        <div class="hdr">
          <span class="col tight"><b class="mid num thin" data-t="clock"></b><span class="muted xs cap ell">${wd}, ${day}</span></span>
          <span class="row gap-xs">${g.slice(0, 3).map((x) => `<span class="mini-g" title="${x.label}">${ring(x.k, 34, 3.5, x.color, `<b class="num">${x.text || x.p}</b>`)}</span>`).join('')}</span>
        </div>`;
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
  E.onBounds((half, bottom, full) => call('setBounds', half, bottom, !!full));
  E.onChange((st, mode, act) => {
    call('setKeyboard', !!(mode === 'expanded' && act && act.id === 'note'));
    if (!(st.sheet && st.sheet.id === 'note') && listening) { listening = null; call('stopListening'); }
  });

  E.mount(document.getElementById('screen'));
  E.layout(window.innerWidth || 393, 6);
  call('ready');
})(window.Note = window.Note || {});
