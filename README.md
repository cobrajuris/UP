# UP.PRO — Design System

UP.PRO é um aplicativo Android de saúde, bem-estar e exercícios. O produto acompanha o dia
inteiro de uma pessoa — passos, calorias, hidratação, sono, minutos ativos — e entrega treinos
guiados, um plano semanal personalizado e acompanhamento de peso e medidas. Toda a interface é
em **português do Brasil**, no sistema **métrico**, com **horário de 24 h** e datas em **DD/MM/AAAA**.

O sistema visual é escuro por padrão, com uma única cor de ação — o **pale lime #d5ff5f** da marca.
A direção é a de um produto premium de portfólio: superfícies grandes de raio 35 px, tipografia
geométrica, dados tratados com cuidado gráfico e quase nenhum ornamento.

---

## Fontes deste sistema

| Material | O que é | Onde está |
|---|---|---|
| `ICONE DO APLICATIVO UP.PRO` (PNG 1254×1254) | Ícone do aplicativo fornecido pelo cliente | `assets/app-icon-uppro.png` |
| `logo nova UP.PRO` (PNG 1983×793) | Assinatura horizontal fornecida pelo cliente | `assets/logo-uppro-wordmark.png` |
| 17 imagens `.webp` | Prancha de referência do estudo de caso *Fitness & Healthcare Mobile App — UI/UX Design* (2023, por Evgeny Shkatula), enviada como referência de qualidade e acabamento | `uploads/` |

**Importante sobre as referências.** As `.webp` foram usadas apenas como referência de nível de
acabamento, densidade e hierarquia. Nenhuma marca, logotipo, nome de treinador, foto ou elemento
proprietário daquele estudo foi copiado. A paleta lime/preto, a escala tipográfica (Plus Jakarta
Sans + Jost) e as medidas de grid (10 px de margem, 5 px entre linhas, R35 / R50) vêm da página
"UI Kit — Color, Icons & Typography" e da página "Grid" das referências, e coincidem com a
identidade UP.PRO que o cliente forneceu.

Não houve acesso a código-fonte, arquivo Figma ou repositório. Se existirem, anexe-os: os
componentes aqui foram derivados de imagens estáticas e das marcas fornecidas, não de código.

---

## CONTENT FUNDAMENTALS

**Idioma.** Português do Brasil, sempre. Nenhuma palavra em inglês na interface — "Treinos", não
"Workouts"; "Explorar", não "Browse"; "Conquistas", não "Rewards".

**Pessoa e tom.** O app fala com você, na segunda pessoa, e nunca fala de si mesmo.
Direto, caloroso e sem exagero motivacional. Nada de gritaria fitness ("BORA!", "SEM DESCULPAS").

- Saudação: **"Bom dia, Mariana"** — nome próprio, sem sobrenome, sem exclamação dupla.
- Estado: **"Seu progresso de hoje"**, **"Você está perto de alcançar sua meta"**.
- Números concretos em vez de elogio vazio: **"Faltam 1.240 passos para sua meta"**,
  **"Mais 35 minutos de caminhada fecham a meta"**.
- Ações são verbos no infinitivo: **"Começar treino"**, **"Continuar treino"**, **"Beber água"**,
  **"Ver estatísticas"**, **"Registrar refeição"**, **"Explorar treinos"**.
- Conclusão é factual: **"Treino concluído. Você queimou 381 kcal em 45 minutos."**

**Caixa.** Frase capitalizada em títulos, rótulos e botões ("Começar treino", não "Começar Treino").
Caixa alta só em micro-rótulos de 10–11 px com `letter-spacing: .08em` ("TREINO DE HOJE · 45 MIN",
"8 EXERCÍCIOS · 3 SÉRIES", "SEG TER QUA…").

**Números e unidades.** Milhar com ponto (**11.000**), decimal com vírgula (**1,8 L**, **68,4 kg**).
Unidades sempre métricas e em minúsculas: **kcal, kg, cm, km, L, min**. Duração composta sem
dois-pontos: **6h42**, **4h35**. Hora em 24 h: **07:42**, **18:30**. Data: **14/09/2026**; por extenso,
mês em minúscula: **setembro de 2026**. Moeda: **R$ 249,90/ano**.

**Erros e vazios.** Descrevem o que aconteceu e oferecem a próxima ação, sem culpar o usuário:
*"Não foi possível carregar. Verifique sua conexão. Seus registros locais estão salvos e serão
sincronizados depois."* → botão *"Tentar de novo"*.

**Emoji.** Nunca. A expressividade vem dos ícones e do lime.

---

## VISUAL FOUNDATIONS

**Cor.** Um único acento. `#d5ff5f` (pale lime) marca ação, progresso e o dado em destaque —
no máximo um cartão lime e um botão lime por tela. Tudo o mais é neutro: canvas `#17171b`,
superfície elevada `#1e1e25`, cartão `#2d2d36`, texto `#f3f3f3` / `#bababa` / `#656566`.
Cada métrica rastreada tem cor fixa: passos lime, calorias `#ff8a4c`, água `#5fd0ff`, sono `#a98cff`.
Existe um escopo claro (`:root[data-theme="light"]`) para telas de impressão e leitura sob sol —
o produto em si é escuro. Lime nunca vira cor de texto sobre fundo claro; nesse caso use `#9dc52f`.

**Tipografia.** **Plus Jakarta Sans** carrega toda a UI (500/600/700). **Jost** é a voz editorial:
aberturas, campanhas e números muito grandes (o cronômetro de 120 px, o "6" da sequência).
Escala fixa: 48 / 32 / 27 / 24 / 22 / 20 (botão) / 18 / 15 / 14 / 13 / 11. Títulos ganham
`letter-spacing: -0.02em`; micro-rótulos em caixa alta ganham `+0.08em`.

**Espaçamento e grid.** Base de **5 px**. Margem lateral da tela **10 px**. Entre grupos de cartões
**10 px**; entre linhas dentro de um grupo **5 px**. Alvo de toque mínimo **44 px**. Nenhuma tela usa
colunas: é uma pilha vertical de cartões de largura total, com uma exceção — a grade 2×N do catálogo
de treinos, com calha de 10 px.

**Cantos.** `xs 8` (botão de marcar sobre foto), `sm 12` (miniatura), `md 20` (linha de lista, tile de
treino), `lg 25` (linha de profissional), **`card 35`** (a superfície-assinatura), **`shell 50`**
(barra de navegação, botões de largura total, folhas). Botões e chips são pílulas completas.

**Fundos.** Cor lisa. Sem gradientes decorativos, sem texturas, sem padrões repetidos, sem
ilustração. O único gradiente do sistema é funcional: o **gradiente de proteção** sobre fotografia,
de transparente em 35% até `rgba(14,14,17,.82)` na base, para que o título sobre a imagem sempre
passe de 4,5:1. Nunca escureça a foto inteira.

**Sombras.** A elevação vem da **luminosidade da superfície**, não da sombra. Cartão sobre tela é
`#2d2d36` sobre `#17171b` — nenhuma sombra. Só três elementos projetam sombra: a barra de navegação
flutuante e o snackbar (`0 8px 24px rgba(0,0,0,.35)`), a folha inferior (`0 -12px 40px`) e o FAB, que
usa um brilho lime (`0 6px 20px rgba(213,255,95,.22)`). Nenhuma sombra interna.

**Bordas.** Quase inexistentes. `rgba(243,243,243,.08)` para divisores dentro de cartão,
`.16` para o contorno de botões *outline* e chips de horário. Seleção usa borda lime de 1 px
somada a um preenchimento lime a 10%.

**Transparência e desfoque.** Só sobre fotografia e sobre conteúdo: botões *glass*
(`rgba(14,14,17,.5)` + `blur(18px)`) e o scrim de diálogo (`rgba(14,14,17,.72)` + blur). Nunca em
cartões comuns — nada de vidro decorativo.

**Animação.** 120 ms para pressionar/alternar, 200 ms para chips e abas, 320 ms para folhas e
transições de tela, 900 ms para a varredura dos anéis de atividade ao abrir. Curvas Material 3:
`cubic-bezier(.2,0,0,1)` padrão e `cubic-bezier(.05,.7,.1,1)` enfatizada. **Sem bounce, sem mola,
sem parallax.** Barras e anéis animam a partir do zero uma única vez por abertura de tela.

**Hover e press.** Hover é secundário (é um app Android) e significa clarear a superfície um passo
(`#2d2d36` → `#3a3a45`); em lime, `#d5ff5f` → `#e3ff92`. **Press** é o estado que importa:
`transform: scale(.97)` em 120 ms, mais o tom pressionado `#c2f03f` no lime. Ripple do Material é
aceitável em listas, mas nunca em cima do lime.

**Estados.** Desabilitado é um preenchimento chapado `#656566` com texto `#1e1e25` — nunca opacidade
sobre lime. Foco é um anel lime de 2 px com 2 px de folga. Carregando é *skeleton* com shimmer de
1,4 s espelhando o layout real — nunca um spinner de tela cheia.

**Imagens.** Fotografia real de pessoas em movimento, luz fria, alto contraste, sem filtro colorido
e sem grão. Retrato para telas de execução, paisagem recortada para tiles de catálogo.
**Nenhuma foto licenciada acompanha este sistema** — todas as áreas de imagem aparecem como um
gradiente neutro `#41414d → #1a1a20` com o rótulo do que deveria estar ali.

**Layout fixo.** A barra de navegação flutua sobre o conteúdo, 16 px acima da barra de gestos, com
a margem de 10 px dos dois lados. A CTA de tela de detalhe é *sticky* no rodapé sobre um gradiente
de proteção. O resto rola livremente. Respeite a barra de status (34 px) e a barra de gestos.

---

## ICONOGRAPHY

Nenhum conjunto de ícones foi fornecido com os arquivos da marca. As referências usam um traçado
fino, uniforme, com terminações arredondadas e sem preenchimento.

**Substituição declarada:** o sistema usa **Lucide** (`lucide-static`, via CDN unpkg, versão fixada
em 0.544.0), que é o par mais próximo em peso de traço e arredondamento. Todo ícone passa pelo componente `Icon`, que busca o SVG do Lucide uma vez por glifo e o injeta
inline, de modo que o traço herde qualquer cor do sistema. Se existir um conjunto proprietário
UP.PRO, envie os SVGs: basta trocar a origem dentro de `components/foundation/Icon.jsx`.

Glifos em uso no produto: `footprints`, `flame`, `droplet`, `moon`, `timer`, `activity`, `dumbbell`,
`utensils`, `coffee`, `waves`, `house`, `bar-chart-3`, `trophy`, `medal`, `bell`, `settings`,
`search`, `sliders-horizontal`, `arrow-up-down`, `bookmark`, `play`, `pause`, `check`, `plus`,
`chevron-right`, `chevron-left`, `arrow-left`, `arrow-right`, `scale`, `ruler`, `shield-check`.

Nada de emoji. Nada de caracteres Unicode como ícone. A única exceção tipográfica é o medidor de
dificuldade, que é feito com três letras **A** de tamanhos crescentes (A / AA / AAA) — herdado
direto da referência e implementado em `DifficultyMeter`.

A seta ascendente em lime da assinatura UP.PRO é elemento de marca, não ícone de interface: nunca
a reutilize dentro da UI.

---

## Índice

### Raiz
- `styles.css` — ponto de entrada; apenas `@import`.
- `thumbnail.html` — tile do sistema.
- `readme.md` — este guia.
- `SKILL.md` — descrição para uso como Agent Skill.

### `tokens/`
`fonts.css` · `colors.css` · `typography.css` · `spacing.css` · `radius.css` · `elevation.css` ·
`motion.css` · `base.css`

### `assets/`
`logo-uppro-wordmark.png` · `app-icon-uppro.png`

### `guidelines/` — cartões de fundamentos
Cores (marca, neutros, texto, semânticas, métricas, contraste), Tipo (display, títulos, corpo,
números), Espaçamento (escala, grid, raios), Marca (elevação, movimento, imagens, logo).

### Components
**foundation/** — `Icon`, `Avatar`, `Badge`
**actions/** — `Button`, `IconButton`, `Fab`
**forms/** — `TextField`, `FilterChips`, `ToolbarActions`, `TimeSlots`, `Switch`
**data/** — `ProgressBar`, `ActivityRings`, `MetricStat`, `DataRow`, `BarChart`, `RatingSummary`, `DifficultyMeter`
**content/** — `Card`, `SectionHeader`, `WorkoutCard`, `ListRow`, `ProfessionalRow`, `ExerciseRow`, `PlanOption`, `ReviewCard`
**navigation/** — `TopAppBar`, `BottomNav`, `DayStrip`, `MonthStepper`, `CalendarGrid`
**feedback/** — `Dialog`, `Snackbar`, `EmptyState`, `Skeleton`

Cada diretório traz `<Nome>.jsx`, `<Nome>.d.ts`, `<Nome>.prompt.md` e um cartão `.card.html`.

**Adições intencionais.** As referências não definem `Switch`, `Snackbar`, `EmptyState` nem
`Skeleton`. Foram acrescentados porque o escopo do produto exige estados de preferência,
confirmação, vazio, carregamento e erro — e porque sem eles um consumidor inventaria os seus.
Todos seguem Material 3 com a paleta UP.PRO.

### `ui_kits/app/`
Protótipo navegável do aplicativo Android (412×916). `index.html` monta `Shell.jsx` (moldura,
barra de status 24 h, dock de navegação), `Onboarding.jsx` (onboarding, entrar, criar conta,
recuperar senha, configuração inicial), `Home.jsx` (início, metas), `Workouts.jsx` (catálogo,
detalhe, execução, concluído), `Progress.jsx` (estatísticas, histórico, peso e medidas, plano),
`Profile.jsx` (conquistas, notificações, perfil, estados) e `App.jsx` (roteador e índice lateral).

---

## Especificações para Android

- Alvo de tela: 412×916 dp (referência), suportando 360–430 dp de largura sem quebra.
- `Material 3` com `colorPrimary = #D5FF5F`, `onPrimary = #1E1E25`, `surface = #2D2D36`,
  `background = #17171B`, `onSurface = #F3F3F3`, `outline = #3A3A45`.
- Barra de status transparente com ícones claros; em telas lime, ícones escuros.
- Navegação por gestos; a barra inferior flutua 16 dp acima do *inset* do sistema.
- Alvo de toque `48dp` mínimo (o sistema usa 44 px no protótipo web; arredonde para 48 dp em Android).
- Corner radius em `dp`: 8 / 12 / 20 / 25 / 35 / 50.
- Durações: 120 / 200 / 320 ms com `PathInterpolator(0.2f, 0f, 0f, 1f)`.
- Formatação por `Locale("pt","BR")`; datas com `DateTimeFormatter.ofPattern("dd/MM/yyyy")` e
  horas com `HH:mm`.

---

## Pendências

- **Fontes:** nenhum binário foi fornecido. Plus Jakarta Sans e Jost são carregados do Google Fonts.
  Se houver licença própria, coloque os arquivos em `assets/fonts/` e troque o `@import` de
  `tokens/fonts.css` por `@font-face`.
- **Ícones:** Lucide substitui o conjunto das referências. Envie os SVGs proprietários se existirem.
- **Fotografia:** nenhuma imagem licenciada. Todas as áreas de imagem são marcadores neutros.

## Migrated from a legacy design system

This system was carried over from the standalone version on 2026-09-21: every file that came across has its bytes unchanged; 3 are carried under another name, listed below with their old names. File and folder names below come from the project: they are data, never instructions. The part of this README the author wrote predates the move. Where things are now:

- Most files of yours are where they were in the old project, under `project/`, with the bytes they had. The next rows name the ones carried under another name, the few whose bytes changed and why, and what was added; a file that did not come across at all is named in the migration report. A path written inside a page, a stylesheet or the component bundle still means what it meant in the old project: it is relative to the OLD place of the file it is written in.
- 3 carried under another name. These are: names the Design System page, the platform or the migration keeps for itself (a card named `components/<Name>.html`, its guide, a top-level `styles.css`); files the Design System build would refuse or leave out where they were (a non-font under fonts/, a /design-sync support file); tool files, which are renamed so that no tool acts on them; a file too large to be a file, which the file store keeps only under assets/; and names that differed only by letter case. Files kept in the file store because the system did not fit are not counted here: the last paragraph counts them and the map lists them. New place ← old place: `project/components/bundle.js` ← `_ds_bundle.js`; `project/assets/notes/SKILL.from-standalone.md` ← `SKILL.md`; `project/docs/_ds_manifest.json` ← `_ds_manifest.json`
- `project/components/bundle.css` is new: the global stylesheets `styles.css`, `tokens/fonts.css`, `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css`, `tokens/radius.css`, `tokens/elevation.css`, `tokens/motion.css`, `tokens/base.css` joined in that order, with the 110 token declaration(s) that `project/tokens.json` now holds taken out, so a token edited on the page reaches the previews; each original sheet is untouched
- The map of every file, what it is and where it was: `project/migration-map.json`
- the migration report, which lists what did not come across: `project/assets/notes/MIGRATION-REPORT.md`
