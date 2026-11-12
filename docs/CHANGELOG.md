# Historial de versiones

## 1.6.2
- Notas del parche acumuladas: quien actualiza desde una versión antigua ve todas las versiones que se ha perdido (desde su `SAVE.seenPatch`; si no tiene, todas). Quien instala de cero no ve ninguna. El botón **Novedades** muestra el historial completo.
- Las notas pasan a `PATCHES` (lista de versiones, la más nueva primero); `PATCH` es `PATCHES[0]`.

## 1.6.1
- Cooperativo de **hasta 4 jugadores**: sala con 4 puestos, todos los invitados tienen que estar listos para empezar, revive cualquier compañero y si alguien se desconecta los demás siguen.
- Nombre de jugador en la sala (`SAVE.name`), visible en los puestos, encima de cada ninja y en los avisos.
- Cooperativo más difícil y escalado por jugadores: por cada jugador extra, enemigos +50% de vida, jefes +60%, +40% de aparición y +10% de daño (`COOP_D`, `coopDiff()`).

## 1.6.0
- **Modo cooperativo online** para 2 jugadores, cada uno desde su PC, desde el botón **Cooperativo** de la pantalla de inicio: pantalla de **sala** con código, los dos puestos de jugador, elección de ninja, escenario, dificultad y maldiciones, y botón "Estoy listo" (ver [cooperativo.md](cooperativo.md)).
- Experiencia compartida, build propia para cada jugador, cofres de quien los recoge y pausa compartida al elegir.
- Revivir al compañero caído quedándose 3 s a su lado; la partida se pierde si caen los dos.
- Los dos ganan el oro de la partida y los desbloqueos al ganar.
- Por dentro: `update()` dividido en `playerStep()` y el mundo; contexto por jugador con `useP()`; PeerJS 1.5.5 incrustado.

## 1.5.3
- Cristales de experiencia con menos brillo (halo más suave y menos destellos).
- Los enemigos ya no se quedan blancos al recibir muchos golpes seguidos (sobre todo con la Lluvia de Kunai): el destello de golpe tiene un tiempo de espera.
- Kama más pequeña (normal y evolucionada).

## 1.5.2
- Al pulsar Imposible (bloqueado) se ve qué personajes ya han ganado en Difícil y cuáles faltan.
- El objeto que cura (antes onigiri) ahora es un **corazón**; textos actualizados.
- Makibishi / Campo de Púas: ~25% menos daño.
- Rayo / Furia de Raijin: ~15% menos daño y los rayos caen sobre los enemigos **más cercanos** (antes al azar).

## 1.5.1
- Fácil más fácil: −20% de enemigos, −25% de vida, −30% de daño y jefes con −20% de vida.

## 1.5.0
- Pausa con resumen de la build (daño por arma, objetos, reliquias, evoluciones pendientes).
- Aviso de evolución lista (icono brillando con "EVO").
- Números de daño más claros y opción de agrupar golpes.
- Armas nuevas: **Katana** (→ Iai del Relámpago, con Suerte) y **Bomba de humo** (→ Niebla del Vacío, con Imán).
- Eventos aleatorios: mercader ambulante, santuario y luna de sangre.
- Maldiciones antes de la partida (más oro y maestría).
- Pestañas **Pergaminos** (guía de evoluciones) y **Bestiario**.
- Desafíos por personaje que desbloquean trajes alternativos.
- Logros nuevos: Erudito yokai, Exterminador, Maldito.
- Ventana de **notas del parche** en la pantalla de inicio tras cada actualización, separada en novedades, correcciones, buffs y nerfs; botón "Novedades" para volver a verla.
- Los nodos de maestría se llaman como lo que dan (p. ej. "Precisión" → "Probabilidad de crítico", "Piel de hierro" → "Vida máxima", "Calma" → "Enfriamiento").
- Maestrías: ahora se juega con **una sola senda** elegida; los puntos de las demás quedan guardados pero inactivos.
- Tarjetas de personaje rediseñadas y todas del mismo tamaño: retrato en círculo con el color del cinturón, vida y velocidad con iconos, arma inicial, habilidad y récord; los bloqueados muestran su silueta.
- Nuevo botón de compra de personajes: dorado con el precio (9.999); si no llega el oro, gris con "Te faltan X".
- Mejoras de la tienda más caras: subir cualquier mejora al máximo cuesta 8000 de oro en total, repartido de forma creciente entre sus niveles. Revivir y personajes sin cambios.
- El título de la ventana y de la pestaña pone "Kage – El camino del ninja" (antes "Supervivientes").
- Kama más pequeña en partida (normal y evolucionada).
- Las cartas de reliquia se distinguen: borde morado brillante animado y etiqueta "RELIQUIA".
- Cristales de experiencia más visibles en todos los mapas: más grandes, con contorno negro, facetas, halo de color, brillo, sombra y ligero balanceo; en los mapas de noche (Aldea, Yomi) emiten luz propia.

## 1.4.0
- La build completa llega hacia el minuto 7–7:30 (antes ~3:30): menos experiencia (×0,66) y niveles más caros a partir del 20.
- Barra de vida en el HUD, entre el nivel y los objetos.
- Los proyectiles enemigos se ven mucho mejor: brillo, estela y shuriken rojos más grandes.

## 1.3.0
- La partida se guarda también en un archivo (`%APPDATA%\Kage\partida.json`) y se fuerza el guardado al cerrar (programa 1.3.0, `SHELL_VERSION 2`).
- "Nueva partida" ya no borra el progreso por error: ofrece seguir con la partida y pide confirmar dos veces para borrar.
- Carpeta del programa ordenada: `Kage.exe` (lanzador), `LEEME.txt` y `archivos/`.

## 1.2.2
- Con la build completa los cofres se convierten en oro y los élites sueltan bolsas de oro más grandes.

## 1.2.1
- Victoria también resistiendo 1:30 al Shinigami (cuenta atrás en su barra).
- Salir desde la pausa en modo infinito cuenta como victoria; invulnerable durante la celebración.
- Quitado el botón del altavoz.

## 1.2.0
- Partidas de 8 minutos (antes 10), experiencia ×1,75.
- Menos cofres con la build completa; ninjas un 9% más lentos.
- Aldea Oculta y los logros de 7 minutos pasan a 6 minutos.

## 1.1.2
- Ventana "La leyenda de Kage" con la historia en la pantalla de inicio.

## 1.1.1
- Misma velocidad en pantalla en todas las direcciones (también el dash).
- Botón "Inicio" sin flecha.

## 1.1.0
- Actualizaciones automáticas desde GitHub.

## 1.0.x
- Primera versión como programa de Windows; menú de personajes que cabe en pantalla.
- Pantalla de inicio, nombre **KAGE – El camino del ninja**, estética unificada, misiones, auditoría (rendimiento, legibilidad, guardado validado), iconos pixel, cofres con "No coger nada".
