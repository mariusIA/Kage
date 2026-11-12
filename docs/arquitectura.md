# Arquitectura

## Archivo único
Todo el juego está en `game/index.html` (HTML + CSS + JS, Canvas 2D, sin paso de compilación). La única librería es PeerJS 1.5.5 (red del cooperativo), incrustada en su propio `<script>`. La fuente pixel *Press Start 2P* va incrustada en base64.

Secciones del script (buscar `// =============== NOMBRE`):

| Sección | Contenido |
|---|---|
| BASE | Utilidades, `iso()`/`s2w()`, canvas, resolución |
| GUARDADO | `SAVE`, `defaultSave()`, `sanitizeSave()`, `save()` |
| SONIDO / MÚSICA | WebAudio sintetizado; música procedural (escala Hirajoshi) |
| SPRITES | Pixel art procedural: `mk(rows, pal, sc)` → canvas con contorno y versión blanca |
| DATOS | `CHARS`, `WD` (armas), `PD` (pasivos), `ET` (enemigos), `SHOP`, `DIFFS`, `MAPS` |
| RELIQUIAS… / MAESTRÍAS | `RELICS`, `ULTS`, `ACH`, `PATHS` |
| ENTRADA | Teclado remapeable (`KBC`, `DEF_KEYS`), joystick táctil |
| ESTADO | `newGame()`, `calcStats()` |
| MAPA | Mundo infinito por trozos (`CH=420`) con `hash()` determinista |
| ENEMIGOS / COMBATE | Aparición, IA, daño, muertes, botín |
| UPDATE | Bucle de lógica |
| MISIONES | `misStart`, `misTick`, `misEnd`… |
| SUBIR DE NIVEL Y COFRES | `levelOptions`, `chestOptions`, `buildDone` |
| PAUSA / FIN | `endRun()`: oro, récords, desbloqueos |
| MENÚ | `renderMenu()`, `fitMenu()` (zoom automático para que quepa) |
| DIBUJO | Render isométrico ordenado por profundidad |
| PANTALLA DE INICIO | `showTitle()`, introducción, diálogo de Nueva partida |
| ACTUALIZACIONES | Diálogo "Nueva versión disponible" (solo en la app) |
| NOTAS DEL PARCHE | `GAME_VERSION`, `PATCH` (nuevo/fix/buff/nerf) y ventana de la pantalla de inicio |
| COOPERATIVO: NÚCLEO | `PF`, `useP()`, `coopAlive()`, `coopTarget()`, `coopHurt()`, `downStep()`, `coopLevelTick()` |
| COOPERATIVO ONLINE | `NET` (hasta 4 jugadores: `NET.guests`, `sendP()`), sala (`openCoop`, `coopHost`, `coopJoin`, `renderRoom`, `roomSync`), `netSnap()`, `guestSnap()`, `guestUpdate()`, `guestEnd()` (ver [cooperativo.md](cooperativo.md)) |
| EVENTOS ALEATORIOS | `evTick()`, mercader (`openMerchant`), santuario (`S.shrineB`), luna de sangre (`S.bloodT`) |
| MALDICIONES | `CURSES`, `curseOn()`, `curseBonus()` |
| DESAFÍOS Y ASPECTOS | `CHAL`, `ninjaSpr()`, `applySkins()` |

## Estado
- `S`: la partida en curso (`null` en menús). `S.running`, `S.modal` (`levelup`, `chest`, `mission`, `victory`, `pause`, `settings`, `coopwait`…). Mientras hay `S.modal`, `update()` no avanza.
- `SAVE`: progreso persistente. Campos nuevos: `mpath` (senda), `evoSeen` (evoluciones descubiertas), `skins`/`skinOn` (aspectos), `curses` (maldiciones elegidas), `seenPatch` (notas del parche vistas), `name` (nombre en el cooperativo).
- Maestrías: `mLvRaw()` = puntos invertidos (para la interfaz); `mLv()` / `mKey()` = efecto real, solo de la senda activa `SAVE.mpath`.
- `S.st`: estadísticas calculadas (`calcStats()`), recalculadas cada 0,1 s o al marcar `S.stDirty`.

## Tiempo
- `S.t` = segundos reales. `gt() = S.t × TS`, con `TS = 1,875` → partida de 8 min (el diseño original es de 15 min en tiempo escalado: jefes en 300/600/900).

## Vista isométrica
- `iso(x,y) = [IC·(x−y) + camX, ½·IC·(x+y) + camY]`, `IC = √½`. `s2w()` es su inversa lineal.
- El movimiento del jugador usa `s2w()` sin normalizar → misma velocidad **en pantalla** en todas direcciones. El dash se escala igual.

## Guardado
- `save()` escribe `localStorage['surv_save_v2']` con marca `ts` y, en la app, `kageUpdater.writeSave()` → `%APPDATA%\Kage\partida.json` (escritura atómica + `flushStorageData`).
- Al cargar se usa la copia con `ts` más reciente y se pasa por `sanitizeSave()` (`SAVE_VER = 3`).

## Rendimiento
- Rejilla espacial para colisiones (`buildGrid`/`query`).
- Las listas se compactan en el sitio con `keep(arr, pred)` (sin crear arrays nuevos por fotograma).
- Tope de 600 enemigos; partículas y texto limitados por la calidad gráfica.

## App de Windows (`app/`)
- `main.js`: ventana Electron, menú oculto, F11, bloqueo de navegación externa, actualizador y guardado en archivo.
- `preload.js`: expone `window.kageUpdater` (`info`, `apply`, `open`, `loadSave`, `writeSave`, `onUpdate`).
- El juego activo vive en `%APPDATA%\Kage\game\index.html`; se copia el incluido si es más nuevo, y el actualizador lo sustituye tras comprobar su `sha256`.
- `SHELL_VERSION = 2`.
