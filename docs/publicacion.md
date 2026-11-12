# Publicación

## Versión del juego (lo habitual)
1. Cambiar `game/index.html`.
2. Subir la versión: `GAME_VERSION` y `<div id="tver">vX.Y.Z</div>`, y añadir **arriba del todo en `PATCHES`** (sección NOTAS DEL PARCHE del juego) una entrada `{v:'X.Y.Z', nuevo, fix, buff, nerf}` con las notas. Se muestran una vez en la pantalla de inicio a quien ya tenía partida; quien venga de varias versiones atrás las ve todas. **No borrar nunca las entradas antiguas.**
3. `game/version.json`: subir `version`, poner `sha256` (`sha256sum game/index.html`), escribir `notes` en español (cortas, para jugadores). `minShell` = 1 salvo que el juego necesite un programa más nuevo.
4. Actualizar la documentación afectada en `docs/` y añadir la entrada en `docs/CHANGELOG.md`.
5. Commit en `main` y push. Los jugadores lo reciben al abrir la app (caché de GitHub: hasta ~5 min).
6. Republicar el artefacto web de claude.ai (slug `aea0683e-cd40-4a99-b57d-6815c2a981eb`).

Versionado: `MAYOR.MENOR.PARCHE` — parche = arreglos/ajustes, menor = funciones nuevas, mayor = cambios grandes.

## Programa de Windows (raro)
Solo cuando cambia `app/` o el lanzador.

```bash
# empaquetar (sin --icon ni --win32metadata: necesitan wine)
npx @electron/packager ./app Kage --platform=win32 --arch=x64 --electron-version=45.3.0 --out=dist --asar
# icono y metadatos
npx resedit --in Kage.exe --out Kage2.exe --icon 1,build/icon.ico --product-name Kage --product-version X.Y.Z.0 --file-version X.Y.Z.0 --file-description "Kage - El camino del ninja" --company-name "Marius Pop"
# lanzador
python3 -m ziglang cc -target x86_64-windows-gnu -O2 -s -municode -Wl,--subsystem,windows -o Kage.exe launcher/launcher.c
```

Estructura del zip:
```
Kage/
├─ Kage.exe      ← lanzador
├─ LEEME.txt
└─ archivos/     ← build de Electron (Kage.exe real, DLLs, resources/app.asar…)
```

- Subir `SHELL_VERSION` en `app/main.js`; subir `minShell` solo si el juego lo exige (los programas viejos mostrarán "Ir a la descarga").
- El zip (~157 MB) no va al repositorio: Marius lo sube a mano a **GitHub Releases**.
