# CLAUDE.md — Kage: El camino del ninja

Survivors-like game (in the style of Vampire Survivors) with a ninja theme and an isometric view. The owner is Marius (GitHub user `mariusIA`). **Always talk to him in Spanish.** The game texts are also in Spanish.

## Repository layout

| Path | What it is |
|---|---|
| `game/index.html` | **The whole game** in a single HTML/CSS/JS file (Canvas 2D), about 1,950 lines and about 180 KB. It has no build step and no dependencies. The pixel font (Press Start 2P) is embedded in base64. |
| `game/version.json` | The published version. The Windows app reads it to update itself. Fields: `version`, `file`, `sha256`, `minShell`, `notes` (in Spanish, for players). |
| `app/` | Windows shell (Electron 45): `main.js` (window, updater, file-based save), `preload.js` (exposes `window.kageUpdater`), `package.json`, `icon.png`. |
| `launcher/launcher.c` | Small `Kage.exe` launcher for the zip's main folder. It opens `archivos\Kage.exe`. |
| `build/icon.ico` | Executable icon. |
| `docs/` | **Living documentation** (gameplay, content, architecture, publishing, changelog). |

## Common tasks

### Publishing a game update (the usual case)
1. Edit `game/index.html`.
2. Update the visible version on the title screen: `<div id="tver">vX.Y.Z</div>`.
   Also raise `GAME_VERSION` and write the in-game patch notes in `PATCH` (section NOTAS DEL PARCHE), split into `nuevo` / `fix` / `buff` / `nerf` (Spanish, short).
3. Update `game/version.json`: raise `version`, set `sha256` from `sha256sum game/index.html`, write the `notes` (short, in Spanish), and keep `minShell: 1` if the shell doesn't change.
4. Update the affected files in `docs/` and add the `docs/CHANGELOG.md` entry.
5. Commit to `main` and push. Players get it the next time they open the app, with a "¡Nueva versión disponible!" dialog. GitHub's raw cache can take about 5 minutes.
6. The game is also published as a claude.ai artifact (slug `aea0683e-cd40-4a99-b57d-6815c2a981eb`). Republish it with the same `index.html`.

### Changing the shell (`app/`) — rare
- Raise `SHELL_VERSION` in `app/main.js`, and raise `minShell` only if the game *requires* the new shell.
- Package for Windows from Linux:
  `npx @electron/packager ./app Kage --platform=win32 --arch=x64 --electron-version=45.3.0 --out=dist --asar`.
  Don't pass `--win32metadata` or `--icon`, because they need wine.
- Set the icon and metadata with `npx resedit --in Kage.exe --out Kage2.exe --icon 1,build/icon.ico --product-name Kage …`.
- Compile the launcher with `python3 -m ziglang cc -target x86_64-windows-gnu -O2 -s -municode -Wl,--subsystem,windows -o Kage.exe launcher/launcher.c`.
- Zip layout: `Kage/Kage.exe` (launcher), `Kage/LEEME.txt`, `Kage/archivos/` (the whole Electron build).
- The zip is about 157 MB, so it doesn't go in the repo. Marius uploads it by hand to GitHub Releases (this session can't create releases).

### Testing
- There's no test suite. Test with Playwright plus `/usr/bin/google-chrome`:
  - load `file://…/game/index.html`;
  - drive the game through its globals (`startGame(i)`, `update(dt)`, `S`, `SAVE`, `openChest()`, `misStart()`…);
  - take screenshots.
- Electron doesn't start in this container (xvfb/zygote), so the shell can't be tested here. Check it with `node --check`.

## Game architecture (`game/index.html`)
- The code is split into sections marked `// =============== NAME ===============`: GUARDADO, SONIDO, MÚSICA, SPRITES, DATOS (personajes/armas/enemigos), RELIQUIAS, MAESTRÍAS, ENTRADA, ESTADO, MAPA, ENEMIGOS, COMBATE, UPDATE, MISIONES, SUBIR DE NIVEL Y COFRES, PAUSA/FIN, MENÚ, DIBUJO, BUCLE, PANTALLA DE INICIO, ACTUALIZACIONES, NOTAS DEL PARCHE, EVENTOS ALEATORIOS, MALDICIONES, DESAFÍOS Y ASPECTOS.
- **Global state:** `S` is the current run (`null` in menus) and `SAVE` is the persistent progress.
- **Saving:**
  - `save()` writes `localStorage['surv_save_v2']`, plus `kageUpdater.writeSave()` in the app (file `%APPDATA%\Kage\partida.json`).
  - On load, the most recent copy wins (field `ts`).
  - `sanitizeSave()` validates the data; `SAVE_VER = 3`.
- **Isometric view:**
  - `iso(x,y)` converts world → screen and `s2w()` screen → world (a linear transform), with `IC = Math.SQRT1_2`.
  - Movement and the dash are equalized in *screen* speed.
- **Time:** `S.t` is real seconds and `gt() = S.t*TS` is "scaled" time.
  - `TS = 1.875` gives an **8-minute** run.
  - Bosses arrive at scaled 300/600/900; the Shinigami appears at 900, which is 8:00 real.
- **Victory:**
  - Kill the Shinigami, **or** survive 90 s against it (`S.reaper` / `S.reaperT`). Either way `S.victoryT` is set and the victory modal opens, where the player chooses endless mode (`#goinf`) or to finish (`#finish`).
  - In endless mode, dying or quitting counts as a win: `endRun(!!S.endless)`.
- **Unlocks:**
  - Winning (outside the daily challenge) unlocks the next character in `CHARS` order.
  - Maps unlock through `MAPS[k].ok()`.
  - Impossible difficulty and the Yomi map unlock by winning on Hard with all 8 characters.
- **Chests:**
  - `chestOptions()` lets the player choose, and they can also skip with "No coger nada" (X).
  - With a full build (`buildDone()`), chests turn straight into gold and elites drop a gold bag instead.
- **Icons:** procedural pixel art in `ICONSD` (rows of characters plus a palette), built with `mk(rows,pal,sc)`; `ICO(name)` returns an `<img class="pi">`.
- **Look ("KAGE" theme):**
  - Dark panels with a red left stripe (`--red #c8302a`), gold hover (`--gold`), cream titles (`--cream`) and the pixel font for headings and buttons.
  - The title screen has a red moon, a torii and a parade of ninjas.
  - Avoid emojis: Marius prefers pixel icons.

## Living documentation (`docs/`) — MANDATORY RULE
`docs/` is the game's living documentation (written in Spanish). **Every change that affects anything documented must update `docs/` in the same commit**, without Marius having to ask:
- Mechanics, pacing, victory, missions, chests, controls → `docs/jugabilidad.md`.
- Data (characters, weapons, passives, relics, masteries, shop, difficulties, maps, bosses, achievements) → `docs/contenido.md`.
- Code or structure (sections, state, saving, rendering, Windows app) → `docs/arquitectura.md`.
- Release or packaging process → `docs/publicacion.md`.
- **Every published version** adds its entry to `docs/CHANGELOG.md` and updates "Versión documentada" in `docs/README.md`.
- A new topic that doesn't fit gets its own `.md` in `docs/`, linked from `docs/README.md`.
- Before calling a change done, check that `docs/` doesn't contradict the code (numbers, timings, names).

## Preferences and conventions
- Marius doesn't like emojis in the UI: use pixel icons.
- Every visible change gets its notes in `version.json` written in Spanish for players.
- Commits: message in Spanish, author `mariusIA <mariusIA@users.noreply.github.com>`, with the session's attribution lines.
- The economy stays as it is unless he asks otherwise: shop: every upgrade costs `SHOP_TOTAL = 8000` gold to max, split across its levels with weights `1+0.8*level`, Revive 6666, characters 9999.
- When Marius says not to push to GitHub, keep changes local (and don't republish the web artifact) until he says so; log them under "Sin publicar" in `docs/CHANGELOG.md`.
