# Kage – El camino del ninja

Juego de supervivencia estilo *Vampire Survivors* con temática ninja, hecho en un único archivo HTML (Canvas 2D).

## Estructura

| Ruta | Qué es |
|---|---|
| `game/index.html` | El juego completo. Es lo que descargan las actualizaciones. |
| `game/version.json` | Versión publicada, notas del cambio y `sha256` del juego. La app de PC lo consulta al abrirse. |
| `app/` | Código del programa de Windows (Electron): ventana, actualizador y preload. |
| `build/icon.ico` | Icono del ejecutable. |

## Cómo funcionan las actualizaciones

1. Al abrir `Kage.exe`, la app lee `game/version.json` de este repositorio.
2. Si la versión es mayor que la instalada, el juego muestra **"¡Nueva versión disponible!"** con las notas.
3. Al aceptar, descarga `game/index.html`, comprueba su `sha256` y reinicia el juego. La partida guardada no se toca.
4. Si `minShell` es mayor que la versión del programa, en lugar de actualizar pide descargar el programa de nuevo.

## Publicar una versión nueva

1. Sustituir `game/index.html` por el juego nuevo.
2. En `game/version.json`: subir `version`, actualizar `sha256` (`sha256sum game/index.html`) y escribir las `notes`.
3. Hacer commit en `main`. Los jugadores lo recibirán al abrir el juego (puede tardar unos minutos por la caché de GitHub).
