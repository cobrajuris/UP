/* Note — tela inicial de demonstração: relógio, bateria, apps e ajuste de escala. */
(function (N) {
  const E = N.island;
  const $ = (s) => document.querySelector(s);
  const screen = $('#screen');
  const pad = (n) => String(n).padStart(2, '0');

  const app = (N.app = {
    battery: 82,
    silent: false,
    setSilent(on) {
      app.silent = on;
      screen.classList.toggle('is-silent', on);
      N.haptic(on ? [12, 40, 12] : 10);
      E.alert(N.create.silent(on), 1800);
    },
    charge() {
      screen.classList.add('is-charging');
      E.alert(N.create.charging(app.battery), 2600);
      clearTimeout(app._c);
      app._c = setTimeout(() => screen.classList.remove('is-charging'), 6000);
    },
  });

  /* Abre a atividade se já existir; senão cria. */
  const live = (id, make) => () => { if (!E.focus(id)) E.start(make(), { present: true }); };
  const APPS = {
    note: { name: 'Note', orb: true, run: () => E.present(N.create.assistant()) },
    phone: { name: 'Telefone', icon: 'phone', bg: 'linear-gradient(160deg,#5be37a,#1fa347)', run: () => setTimeout(() => E.present(N.create.incoming()), 500) },
    music: { name: 'Música', icon: 'music', bg: 'linear-gradient(160deg,#c5a6ff,#6b45e6)', run: live('music', N.create.music) },
    maps: { name: 'Mapas', icon: 'map', bg: 'linear-gradient(160deg,#6fb0ff,#2459e0)', run: live('nav', N.create.nav) },
    timer: { name: 'Timer', icon: 'timer', bg: 'linear-gradient(160deg,#ffc061,#ff7a00)', run: live('timer', () => N.create.timer(300)) },
    ride: { name: 'Corrida', icon: 'car', bg: 'linear-gradient(160deg,#ff85c0,#e0257d)', run: live('ride', N.create.ride) },
    flight: { name: 'Voos', icon: 'plane', bg: 'linear-gradient(160deg,#8fe3ff,#1793d1)', run: live('flight', N.create.flight) },
    workout: { name: 'UP.PRO', icon: 'run', bg: '#17171b', fg: '#d5ff5f', run: live('workout', N.create.workout) },
    translate: { name: 'Tradutor', icon: 'languages', bg: 'linear-gradient(160deg,#3a3a45,#17171b)', fg: '#7ee8ff', run: live('translate', N.create.translate) },
    silent: { name: 'Silencioso', icon: 'bellOff', bg: 'linear-gradient(160deg,#ff7a70,#d92b20)', run: () => app.setSilent(!app.silent) },
    charge: { name: 'Carregar', icon: 'bolt', bg: 'linear-gradient(160deg,#6ff08f,#16a34a)', run: () => app.charge() },
    today: { name: 'Hoje', icon: 'calendar', bg: '#f3f1f7', fg: '#e5383b', run: () => E.present(N.create.overview()) },
  };
  const tile = (id) => {
    const a = APPS[id];
    const glyph = a.orb ? '<span class="orb lg" aria-hidden="true"></span>' : N.icon(a.icon, 28);
    return `<button class="app" data-app="${id}"><span class="app-ic" style="background:${a.bg || '#000'};color:${a.fg || '#fff'}">${glyph}</span><span class="app-name">${a.name}</span></button>`;
  };
  $('#apps').innerHTML = ['timer', 'ride', 'flight', 'workout', 'translate', 'silent', 'charge', 'today'].map(tile).join('');
  $('#dock').innerHTML = ['note', 'phone', 'music', 'maps'].map(tile).join('');
  screen.addEventListener('click', (e) => {
    const b = e.target.closest('[data-app]');
    if (!b) return;
    N.haptic(6);
    APPS[b.dataset.app].run();
  });

  /* Relógio e bateria da barra de status. */
  const tickClock = () => {
    const d = new Date();
    $('#clock').textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
    $('#battFill').style.width = app.battery + '%';
  };
  tickClock();
  setInterval(tickClock, 5000);

  /* Lista "Em andamento" no painel lateral. */
  const list = $('#liveList');
  if (list) {
    E.onChange((st, mode) => {
      list.innerHTML = st.live.length
        ? st.live.map((a, i) => `<li><span class="dot ${i === 0 ? 'main' : ''}"></span>${a.name}<em>${i === 0 ? (mode === 'expanded' ? 'aberta' : 'principal') : i === 1 ? 'bolha' : 'na fila'}</em></li>`).join('')
        : '<li class="empty">Nada em andamento. Toque na ilha ou abra um app.</li>';
    });
  }

  /* Escala do aparelho na mesa (desktop) ou tela cheia (celular). */
  const fit = () => {
    const full = matchMedia('(max-width: 600px)').matches;
    const s = full ? 1 : Math.min(1, (window.innerHeight - 40) / 876);
    document.documentElement.style.setProperty('--s', s.toFixed(4));
    E.setScale(s);
    E.layout(screen.clientWidth, full ? 8 : 11);
  };

  E.mount(screen);
  fit();
  window.addEventListener('resize', fit);

  /* Estado inicial: música tocando e um timer correndo na bolha. */
  E.start(N.create.timer(299, 'Café'));
  E.start(N.create.music());
})(window.Note = window.Note || {});
