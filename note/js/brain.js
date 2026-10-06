/* Note — entende pedidos curtos em português e decide o que fazer.
   Retorna { reply, status?, run? }. "run" é executado quando o painel do Note fecha. */
(function (N) {
  const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const WORDS = { um: 1, uma: 1, dois: 2, duas: 2, tres: 3, quatro: 4, cinco: 5, seis: 6, sete: 7, oito: 8, nove: 9, dez: 10, quinze: 15, vinte: 20, trinta: 30, quarenta: 40, cinquenta: 50, sessenta: 60 };

  function duration(q) {
    if (/meia hora/.test(q)) return { s: 1800, label: '30 min' };
    const m = q.match(/(\d+|um|uma|dois|duas|tres|quatro|cinco|seis|sete|oito|nove|dez|quinze|vinte|trinta|quarenta|cinquenta|sessenta)\s*(h\b|hora|min|m\b|seg|s\b)/);
    if (!m) return { s: 300, label: '5 min' };
    const n = /\d/.test(m[1]) ? parseInt(m[1], 10) : WORDS[m[1]];
    if (m[2].startsWith('h')) return { s: n * 3600, label: `${n} h` };
    if (m[2].startsWith('s')) return { s: n, label: `${n} s` };
    return { s: n * 60, label: `${n} min` };
  }

  const E = () => N.island;
  const has = (q, re) => re.test(q);

  N.brain = (raw) => {
    const q = norm(raw);
    const stop = has(q, /\b(parar|pare|cancelar|cancela|encerrar|encerra|desligar)\b/);

    if (stop) {
      const map = [['timer', /timer|cronometro|temporizador/], ['music', /musica|som/], ['ride', /corrida|carro/], ['nav', /rota|navega|mapa/], ['workout', /treino/], ['translate', /tradu/], ['call', /chamada|ligacao/], ['flight', /voo/]];
      const hit = map.find(([, re]) => re.test(q));
      if (hit && E().get(hit[0])) return { reply: 'Pronto, encerrei.', run: () => E().stop(hit[0]) };
      return { reply: 'Não encontrei nada com esse nome em andamento.' };
    }
    if (has(q, /timer|cronometr|temporizador|alarme|me avis/)) {
      const d = duration(q);
      return { reply: `Timer de ${d.label} começando agora.`, status: 'Timer', run: () => E().start(N.create.timer(d.s), { present: true }) };
    }
    if (has(q, /tradu|ingles|english/)) {
      return { reply: 'Tradutor ligado: português para inglês. Pode falar.', status: 'Tradutor', run: () => E().start(N.create.translate(), { present: true }) };
    }
    if (has(q, /silencio|silencioso|nao perturbe|mudo|vibrar/)) {
      const on = has(q, /desativ|deslig|tirar/) ? false : has(q, /ativ|liga|colocar/) ? true : !(N.app && N.app.silent);
      return { reply: on ? 'Modo silencioso ativado.' : 'Som do toque de volta.', run: () => N.app && N.app.setSilent(on) };
    }
    if (has(q, /treino|correr|ao ar livre|caminhada|exercicio|passos/)) {
      if (has(q, /passos|quantos/)) return { reply: 'Você deu 6.240 passos hoje. Faltam 1.760 para a meta de 8.000.', status: 'Hoje', run: () => E().present(N.create.overview()) };
      return { reply: 'Treino iniciado no UP.PRO. Bom ritmo!', status: 'UP.PRO', run: () => E().start(N.create.workout(), { present: true }) };
    }
    if (has(q, /musica|tocar|toca |play|playlist|ouvir/)) {
      return { reply: 'Tocando “Ondas Roxas”, de Marina Sol.', status: 'Música', run: () => E().start(N.create.music(), { present: true }) };
    }
    if (has(q, /corrida|uber|carro|taxi|motorista|99/)) {
      return { reply: 'Pedi uma corrida. Rafael chega em cerca de 3 minutos.', status: 'Corrida', run: () => E().start(N.create.ride(), { present: true }) };
    }
    if (has(q, /voo|aviao|embarque|aeroporto/)) {
      return { reply: 'Seu voo NT 2047 para Lisboa está no ar. Vou acompanhar por aqui.', status: 'Voo', run: () => E().start(N.create.flight(), { present: true }) };
    }
    if (has(q, /ligar|ligue|liga |ligacao|chamada|telefon/)) {
      const who = (raw.match(/(?:para|pra)\s+(?:a\s+|o\s+)?([\p{L}]+)/iu) || [])[1] || 'Mãe';
      const name = who.charAt(0).toUpperCase() + who.slice(1);
      return { reply: `Ligando para ${name}.`, status: 'Chamada', run: () => E().start(N.create.call({ name, initials: name[0], outgoing: true })) };
    }
    if (has(q, /navega|rota|caminho|como chego|mapa|me leve|ir para|ir ao|ir a /)) {
      return { reply: 'Rota para o Parque Trianon: 1,4 km, cerca de 20 minutos a pé.', status: 'Mapas', run: () => E().start(N.create.nav(), { present: true }) };
    }
    if (has(q, /bateria|carrega/)) {
      const b = N.app ? N.app.battery : 82;
      return { reply: `A bateria está em ${b}%. Isso dá para o resto do dia.`, status: 'Bateria', run: () => N.app && N.app.charge() };
    }
    if (has(q, /clima|tempo|temperatura|chover|chuva|frio|calor/)) {
      return { reply: 'Agora faz 24° com poucas nuvens. Mínima de 18° e máxima de 29°. Sem chuva hoje.', status: 'Clima' };
    }
    if (has(q, /hoje|resumo|agenda|reuniao|compromisso/)) {
      return { reply: 'Você tem a revisão do projeto às 14:00. Abrindo o resumo do dia.', status: 'Hoje', run: () => E().present(N.create.overview()) };
    }
    if (has(q, /que horas|horas sao|hora agora/)) {
      return { reply: `Agora são ${N.fmt.hhmm()}.` };
    }
    if (has(q, /^(oi|ola|e ai|bom dia|boa tarde|boa noite)/)) {
      const h = new Date().getHours();
      return { reply: `${h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite'}! Peça um timer, música, corrida, rota ou tradução.` };
    }
    if (has(q, /o que (voce|vc) (faz|sabe)|ajuda|recursos|comandos/)) {
      return { reply: 'Eu cuido de timers, música, corridas, voos, chamadas, treinos, rotas, tradução e do modo silencioso.' };
    }
    return { reply: 'Ainda não sei fazer isso. Tente “timer de 10 minutos”, “tocar música” ou “como chego no parque”.' };
  };
})(window.Note = window.Note || {});
