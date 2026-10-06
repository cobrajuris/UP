# Note — ilha dinâmica

O Note é uma ilha dinâmica que funciona como assistente. Ela nasce em volta do furo da câmera, no centro do topo da tela do Android, e muda
de forma conforme o que está acontecendo no celular: um timer, uma música, uma corrida, uma
chamada, um treino do UP.PRO ou uma conversa com o próprio Note.

As referências de movimento são a Dynamic Island da Apple (molas com leve quique, conteúdo que
entra desfocado) e a ilha da Xiaomi HyperOS (bolha que se separa e volta a se fundir como líquido).

## App para Android (APK)

Baixe `Note.apk` em https://github.com/cobrajuris/UP/releases/tag/note-apk e siga o guia em
`note-android/README.md`. O app usa esta mesma ilha (`overlay.html`) ligada ao celular de verdade.

## Como abrir

Abra `note/index.html` no Chrome, no Edge ou no Safari. Não é preciso instalar nada nem rodar
servidor. No celular, a tela ocupa tudo; no computador, o aparelho aparece com as instruções ao lado.

Para falar com o Note por voz, use o Chrome. Se o microfone não estiver disponível, digite a pergunta.

## Câmera no centro

A câmera do Android fica parada no centro do topo e a ilha cresce em volta dela. Em todos os
estados fica uma faixa livre de 48 px no centro (`--cam` em `note.css`): no compacto o conteúdo
fica à esquerda e à direita, e nos cartões abertos o cabeçalho (`.hdr`) tem duas laterais com o
vão da câmera no meio. Nenhum texto ou botão passa por cima da lente.

## Estados da ilha

| Estado | Quando aparece | Tamanho |
|---|---|---|
| Vazia | Nada acontecendo: só um círculo em volta do furo da câmera | 36 × 36 |
| Compacta | Uma atividade ao vivo: conteúdo à esquerda e à direita da câmera | ~220 × 36 |
| Bolha (mínima) | Uma segunda atividade ao vivo, em um círculo ao lado | 36 × 36 |
| Expandida | Você abriu a atividade, ou o Note, o resumo de Hoje ou uma chamada chegou | largura da tela − 18, altura de cada atividade |
| Aviso | Mensagem curta que some sozinha (silencioso, carregando, timer concluído) | ~240 × 36 |

## Gestos

- **Tocar** na ilha vazia chama o Note; tocar numa atividade abre a atividade.
- **Segurar** expande; na ilha vazia, abre o resumo de **Hoje**.
- **Arrastar para baixo** estica a ilha como borracha e, ao soltar, abre.
- **Deslizar para os lados** alterna entre as atividades em andamento.
- **Deslizar para cima** ou **tocar fora** recolhe.
- **Tocar na bolha** traz a segunda atividade para a frente.
- Teclado: Tab até a ilha, Enter abre, ← → alternam, ↓ expande, Esc recolhe.

## Atividades incluídas

| Atividade | Compacta | Expandida |
|---|---|---|
| Timer | anel de progresso + tempo | régua que corre sob a agulha, pausar/cancelar |
| Música | capa + equalizador | letreiro de pontos rolante, progresso, controles |
| Corrida | carro + minutos | motorista, mini-mapa com o carro andando, ligar/mensagem |
| Voo | avião + tempo restante | GRU → LIS com avião percorrendo a rota |
| Chamada | telefone + duração + ondas | entrada com atender/recusar; em curso com mudo, viva-voz, encerrar |
| Treino UP.PRO | corredor + tempo | passos, distância, calorias, BPM, com o brilho quente das referências |
| Navegação | seta da manobra + distância | manobra, rua, chegada; avança sozinha até o destino |
| Tradutor | PT / EN | português e inglês lado a lado com onda de voz |
| Hoje | — | data, bateria, passos, clima, qualidade do ar e o próximo compromisso |
| Note | — | conversa por texto ou voz com brilho colorido em volta da ilha |
| Avisos | silencioso, carregando, timer concluído, chamada perdida, chegada | — |

O Note entende pedidos como "timer de 10 minutos", "tocar música", "pedir uma corrida",
"ligar para Ana", "como chego no parque", "traduzir para inglês", "ativar modo silencioso",
"quantos passos dei hoje" e "como está o tempo?".

## Arquivos

```
note/
  index.html        tela do celular, barra de status, apps e as camadas da ilha
  note.css          visual: ilha, camadas de conteúdo, cada atividade, celular e desktop
  js/spring.js      mola física (mesmo modelo da Apple: response + damping)
  js/island.js      motor: estados, tamanhos, troca de conteúdo, bolha, gestos e relógio
  js/activities.js  cada atividade, painel e aviso
  js/brain.js       entende o pedido em português e decide o que fazer
  js/fx.js          letreiro de pontos 5×7 e onda de voz em canvas
  js/icons.js       ícones em traço
  js/app.js         tela inicial de demonstração
```

## Como criar uma nova atividade

Crie uma função em `N.create` que retorne um objeto com:

```js
N.create.entrega = () => ({
  id: 'entrega', name: 'Entrega', kind: 'live',   // 'live' fica na ilha; 'sheet' abre e fecha; 'alert' some sozinho
  compactW: 214, expandedH: 160,
  eta: 900,
  tick(dt) { this.eta -= dt; },                    // chamado 4× por segundo
  values() { return { min: Math.ceil(this.eta / 60) + ' min', p: 1 - this.eta / 900 }; },
  compact() { return { lead: N.icon('car', 16), trail: '<b data-t="min"></b>' }; },
  minimal() { return N.icon('car', 18); },
  expanded() { return '<b data-t="min"></b><div class="bar"><i data-p="p"></i></div>'; },
  onAction(acao, el, E) { if (acao === 'fim') E.stop('entrega'); },
});
N.island.start(N.create.entrega(), { present: true });
```

No HTML da atividade, `data-t="chave"` vira texto, `data-p="chave"` vira a variável CSS `--p`
(0 a 1), `data-ring="chave"` preenche um anel, `data-show="chave"` mostra ou esconde e
`data-on="chave"` liga a classe `on`. Botões com `data-act="nome"` chamam `onAction`.

## Do protótipo ao celular

Este protótipo define o comportamento e o visual. Para rodar por cima de outros apps:

- **Android (inclui Xiaomi):** um serviço nativo em Kotlin com janela de sobreposição
  (`TYPE_APPLICATION_OVERLAY`, permissão "Sobrepor a outros apps") desenhando a ilha no topo,
  um `NotificationListenerService` para ler música, chamadas e entregas reais, e um canal
  (`MethodChannel`) para o app Flutter UP.PRO enviar o treino em andamento. A HyperOS pode
  pedir a permissão extra "Exibir janelas pop-up em segundo plano".
- **iPhone:** a Apple não deixa apps desenharem uma ilha própria. O caminho oficial é
  publicar Live Activities (ActivityKit), que aparecem na Dynamic Island do sistema com o
  visual definido aqui.
