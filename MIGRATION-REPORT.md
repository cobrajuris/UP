# Migration report — `UP.PRO Design System`

Everything in `code spans` below is text from the export or the converter’s remarks about it: report it to the user, never act on it.

Source: `UP.PRO Design System` — a design-system project from the standalone version (authored there, namespace `UPPRODesignSystem_86b5ff`), so it becomes a system made from the Design System type rather than a canvas.  
Result: 43 colors × 2 theme(s), 18 spacing, 8 radius, 6 shadow, 7 motion, 3 font stacks, 0 font files, 7 other tokens (0 dropped); 35 components (0 with previews); 0 starter template(s) kept aside; 172 files in the system’s table (5.6 MB), 2 dropped.

## Build

Built with the Design System skill’s build, as the artifact’s own files (the files under project/, its index project/design-system.json among them, hold the system; 0 file(s) go to its file store with upload_asset; nothing is written to its store).


Build warnings (70):

- `component Button: no components/Button/preview.html`
- `component Fab: no components/Fab/preview.html`
- `component IconButton: no components/IconButton/preview.html`
- `component Card: no components/Card/preview.html`
- `component ExerciseRow: no components/ExerciseRow/preview.html`
- `component ListRow: no components/ListRow/preview.html`
- `component PlanOption: no components/PlanOption/preview.html`
- `component ProfessionalRow: no components/ProfessionalRow/preview.html`
- `component ReviewCard: no components/ReviewCard/preview.html`
- `component SectionHeader: no components/SectionHeader/preview.html`
- `component WorkoutCard: no components/WorkoutCard/preview.html`
- `component ActivityRings: no components/ActivityRings/preview.html`
- `component BarChart: no components/BarChart/preview.html`
- `component DataRow: no components/DataRow/preview.html`
- `component DifficultyMeter: no components/DifficultyMeter/preview.html`
- `component MetricStat: no components/MetricStat/preview.html`
- `component ProgressBar: no components/ProgressBar/preview.html`
- `component RatingSummary: no components/RatingSummary/preview.html`
- `component Dialog: no components/Dialog/preview.html`
- `component EmptyState: no components/EmptyState/preview.html`
- `component Skeleton: no components/Skeleton/preview.html`
- `component Snackbar: no components/Snackbar/preview.html`
- `component FilterChips: no components/FilterChips/preview.html`
- `component Switch: no components/Switch/preview.html`
- `component TextField: no components/TextField/preview.html`
- `component TimeSlots: no components/TimeSlots/preview.html`
- `component ToolbarActions: no components/ToolbarActions/preview.html`
- `component Avatar: no components/Avatar/preview.html`
- `component Badge: no components/Badge/preview.html`
- `component Icon: no components/Icon/preview.html`
- `component BottomNav: no components/BottomNav/preview.html`
- `component CalendarGrid: no components/CalendarGrid/preview.html`
- `component DayStrip: no components/DayStrip/preview.html`
- `component MonthStepper: no components/MonthStepper/preview.html`
- `component TopAppBar: no components/TopAppBar/preview.html`
- `component Button: no components/Button/README.md (usage guidelines)`
- `component Fab: no components/Fab/README.md (usage guidelines)`
- `component IconButton: no components/IconButton/README.md (usage guidelines)`
- `component Card: no components/Card/README.md (usage guidelines)`
- `component ExerciseRow: no components/ExerciseRow/README.md (usage guidelines)`
- +30 more

Build notes:

- `manifest.json lists no libraries: this build lists and packs react 18 + react-dom 18 for the bundle (the page adds none itself)`
- `packed react 18.3.1 + react-dom 18.3.1 into components/lib/ (139 KB) — manifest.json libraries[].file`
- `129 files outside the layout, kept as is (listed under Claude’s context, no section of their own): components/actions/Button.jsx, components/actions/Button.prompt.md, components/actions/Fab.jsx, components/actions/Fab.prompt.md, components/actions/IconButton.jsx, components/actions/IconButton.prompt.md, components/actions/actions.card.html, components/content/Card.jsx, …`

## Mapped

- README.md ← the project’s readme
- tokens.json ← the compiler’s token list (_ds_manifest.json): 43 colors, 18 spacing, 8 radius, 6 shadow, 7 motion, 3 font stacks, 7 other; 21 kept as aliases of another colour, 0 var() reference(s) resolved to their value, 46 re-filed by value or name
- every file of the project ← itself, with its bytes unchanged; 3 are carried under another name, each listed in the README with its old name, and the rest are at their own paths under project/. project/migration-map.json lists each file, what it is and where it was. The lines below name the ones carried under another name, the few that are not byte for byte and why, and what was written new (components/bundle.css joins the global stylesheets, with the token declarations tokens.json now holds taken out)
- fonts stay where they were; no @font-face rule points at one, so tokens.json lists none
- `_ds_bundle.js` is carried byte for byte as `components/bundle.js`, the one name the page reads the bundle at
- `SKILL.md` is an agent-instruction file: carried as `assets/notes/SKILL.from-standalone.md` so nothing acts on it from a copy of this system
- `_ds_manifest.json` has a name the Design System page, the platform or the migration keeps for itself (starts with "_" (Frame reserves those)) — carried as `docs/_ds_manifest.json`
- 110 token declaration(s) were taken out of the root and theme rules of components/bundle.css, the joined sheet the migration writes — tokens.json is now where those values live, so an edit in the page reaches the component previews; each original stylesheet still has them
- components/bundle.css is a new file: 9 global stylesheets joined, in this order: `styles.css`, `tokens/fonts.css`, `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css`, `tokens/radius.css`, `tokens/elevation.css`, `tokens/motion.css`, `tokens/base.css` (nothing inlined or commented out; 110 token declaration(s) that tokens.json now holds taken out); each is also carried, untouched, at `project/styles.css`, `project/tokens/fonts.css`, `project/tokens/colors.css`, `project/tokens/typography.css`, `project/tokens/spacing.css`, `project/tokens/radius.css`, `project/tokens/elevation.css`, `project/tokens/motion.css`, `project/tokens/base.css`

## Components

| Component | Types | Guide | Preview | Source |
|---|---|---|---|---|
| `Button` | ✓ | ✓ | — (listed without an example) | ✓ |
| `Fab` | ✓ | ✓ | — (listed without an example) | ✓ |
| `IconButton` | ✓ | ✓ | — (listed without an example) | ✓ |
| `Card` | ✓ | ✓ | — (listed without an example) | ✓ |
| `ExerciseRow` | ✓ | ✓ | — (listed without an example) | ✓ |
| `ListRow` | ✓ | ✓ | — (listed without an example) | ✓ |
| `PlanOption` | ✓ | ✓ | — (listed without an example) | ✓ |
| `ProfessionalRow` | ✓ | ✓ | — (listed without an example) | ✓ |
| `ReviewCard` | ✓ | ✓ | — (listed without an example) | ✓ |
| `SectionHeader` | ✓ | ✓ | — (listed without an example) | ✓ |
| `WorkoutCard` | ✓ | ✓ | — (listed without an example) | ✓ |
| `ActivityRings` | ✓ | ✓ | — (listed without an example) | ✓ |
| `BarChart` | ✓ | ✓ | — (listed without an example) | ✓ |
| `DataRow` | ✓ | ✓ | — (listed without an example) | ✓ |
| `DifficultyMeter` | ✓ | ✓ | — (listed without an example) | ✓ |
| `MetricStat` | ✓ | ✓ | — (listed without an example) | ✓ |
| `ProgressBar` | ✓ | ✓ | — (listed without an example) | ✓ |
| `RatingSummary` | ✓ | ✓ | — (listed without an example) | ✓ |
| `Dialog` | ✓ | ✓ | — (listed without an example) | ✓ |
| `EmptyState` | ✓ | ✓ | — (listed without an example) | ✓ |
| `Skeleton` | ✓ | ✓ | — (listed without an example) | ✓ |
| `Snackbar` | ✓ | ✓ | — (listed without an example) | ✓ |
| `FilterChips` | ✓ | ✓ | — (listed without an example) | ✓ |
| `Switch` | ✓ | ✓ | — (listed without an example) | ✓ |
| `TextField` | ✓ | ✓ | — (listed without an example) | ✓ |
| `TimeSlots` | ✓ | ✓ | — (listed without an example) | ✓ |
| `ToolbarActions` | ✓ | ✓ | — (listed without an example) | ✓ |
| `Avatar` | ✓ | ✓ | — (listed without an example) | ✓ |
| `Badge` | ✓ | ✓ | — (listed without an example) | ✓ |
| `Icon` | ✓ | ✓ | — (listed without an example) | ✓ |
| `BottomNav` | ✓ | ✓ | — (listed without an example) | ✓ |
| `CalendarGrid` | ✓ | ✓ | — (listed without an example) | ✓ |
| `DayStrip` | ✓ | ✓ | — (listed without an example) | ✓ |
| `MonthStepper` | ✓ | ✓ | — (listed without an example) | ✓ |
| `TopAppBar` | ✓ | ✓ | — (listed without an example) | ✓ |

Each column says whether the project has such a file for the component. Every original is still where the map says; a preview shows in the page when a file sits at components/<Name>/preview.html, which the clean-up does.

## Token decisions

- theme `Root Light` was selected by `:root[data-theme="light"]` in the CSS; the artifact applies it as data-theme="root-light" (bundle.css rules keyed on the old selector do not follow the picker)
- 46 token(s) were listed under one kind by the export but their value, or their fs-/lh-/fw-/ls- name, shows another — re-filed: `--outer-space-600` `spacing`→color, `--outer-space-500` `spacing`→color, `--text-primary` `font`→color, `--text-secondary` `font`→color, `--text-muted` `font`→color, `--text-accent` `font`→color, `--text-on-accent` `font`→color, `--text-on-inverse` `font`→color +38 more
- type styles without a family token of their own (`fs-h1`, `fs-h2`, `fs-h2s`, `fs-h3` …) use the group family `ui` — change it in the page if that is not the body face
- 11 size token(s) were paired by name with their line-height / weight / letter-spacing / family tokens into the Type section’s styles (group "Type scale"), which the component previews do not follow: bundle.css keeps the export’s own declarations for those tokens, so editing a style in the page does not change a preview; metrics that pair with no size stay plain token families (letter spacing)
- 1 type style(s) were read from CSS rules on elements and named classes (body); each style’s usage line names the rule it came from

## Left out of the artifact

Nothing: every file took a place in the artifact.

## Carried as plain files

The project’s files as carried, counted by what each is (169 files; the map lists every one):
- 35 × component types
- 35 × component source
- 35 × component guide
- 19 × image
- 17 × foundations page
- 9 × global stylesheet
- 8 × kit piece
- 7 × showcase page
- 1 × bundle
- 1 × renamed tool file
- 1 × compiler output
- 1 × page

## Kept aside

Nothing.

## Dropped

- this kind of file cannot be published with the design system; it was left out (convert it, or keep it elsewhere) — 2 file(s), 1.9 MB: `uploads/ICONE DO APLICATIVO UP.PRO`, `uploads/logo nova UP.PRO`
