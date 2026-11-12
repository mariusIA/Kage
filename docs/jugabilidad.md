# Jugabilidad

## Pantalla de inicio
Al abrir el juego tras una actualización sale la ventana **Notas del parche** (novedades, correcciones, buffs y nerfs). Al cerrarla aparece la introducción; se puede volver a abrir con el botón **Novedades** (abajo a la izquierda).

## Objetivo
Elegir un ninja, **sobrevivir 8 minutos** a las hordas de yokai y **vencer al Shinigami**: derrotándolo o **resistiendo 1:30** contra él (cuenta atrás en su barra de vida). Al ganar se puede seguir en **modo infinito** o terminar.

## Ritmo de una partida (8 minutos)
El juego usa un tiempo escalado `gt() = S.t × 1,875`; los minutos de abajo son tiempo real.

| Momento | Qué pasa |
|---|---|
| 0:40 | Primera misión (después, una cada ~25 s tras terminar la anterior) |
| cada ~24 s (luego ~19 s) | Élite; de 2 en 2 desde la mitad y de 3 en 3 al final |
| desde 2:08 | Algunos enemigos normales aparecen ya como élites (hasta un 2,5%) |
| 2:40 | Jefe: Samurái Sombrío |
| 5:20 | Jefe del escenario |
| 7:12 | Recta final: solo élites |
| 8:00 | Aparece el Shinigami: derrótalo o aguanta 1:30 |

- Máximo **600 enemigos** a la vez.
- Matar a un jefe da un **imán global** de cristales.
- Experiencia ×0,66 sobre la base y curva de nivel más dura a partir del nivel 20 (`5 + nivel×6 + (nivel−20)×40`): la build completa llega hacia el **minuto 7–7:30**.

## HUD
Arriba a la izquierda: nivel, **barra de vida** (con vida actual / máxima, verde → amarilla → roja) y debajo las armas, objetos y reliquias. Los proyectiles enemigos llevan brillo de color y estela para verse bien. Números de daño con contorno; los críticos son más grandes, naranjas y con "!"; opción en Ajustes → Interfaz para agrupar golpes seguidos en un solo número. Los cristales de experiencia son azules (1), verdes (3+) y rojos (10+), con contorno y un halo suave; en los mapas de noche brillan un poco.

## Subir de nivel
Cada nivel ofrece 3 mejoras (4 con suerte): armas nuevas o subir nivel, objetos pasivos. Máximo 6 armas y 6 objetos, nivel 5 cada uno.

## Cofres
- Los sueltan élites, jefes, círculos morados y misiones.
- Se elige la recompensa (evolución, reliquia o mejoras); cofre de la suerte = 3 elecciones.
- **"No coger nada"** (tecla X) cierra el cofre sin elegir.
- **Build completa** (todo al máximo y sin evoluciones pendientes): no salen cofres de élites (dejan bolsa de oro de 20–40) y cualquier cofre se convierte en oro al momento (55–115) con un 20% de reliquia.

## Misiones
Una a la vez, con barra de progreso y tiempo límite en el panel superior.

| Misión | Objetivo | Tiempo |
|---|---|---|
| Caza | Derrota a `50 + tiempo/5` enemigos | 60 s |
| Especialista | Derrota a `30 + tiempo/8` enemigos con un arma concreta | 60 s |
| Objetivo marcado ★ | Caza a un ninja élite marcado que huye | 60 s |
| Proteger el altar ★ | Defiende el altar (vida 100) de los atacantes | 35 s |
| Sin un rasguño ★ | No recibas daño | 40 s |
| Recolector | Recoge 5 pergaminos | 75 s |
| Farolillos malditos / Estatuas de hielo | Destruye 4 (solo Aldea / Montaña) | 60 s |

★ = misión difícil: ofrece una reliquia como recompensa.
Recompensas a elegir (3): cofre (no si la build está completa), bolsa de oro, técnica cargada, curación total.
Fallar en Difícil/Imposible hace aparecer un élite.

## Técnica especial y dash
- **Técnica especial** (tecla E o Q): se carga con el tiempo (más lenta al principio) y con las bajas. Al principio hace un 60% del daño, y llega al 100% hacia el minuto 4.
- **Dash** (Espacio o Shift): 1 carga (2 con la piedra angular Sombra); recorre lo mismo en todas las direcciones de pantalla.

## Eventos aleatorios
Cada 70–100 s (el primero hacia el 1:15), si no hay jefe ni es la recta final:
- **Mercader ambulante** (45 s): acércate para comprar con el oro de la partida: curación total, subir un nivel, cofre (o saco de oro si la build está completa) o técnica cargada. Precios que suben con el tiempo.
- **Santuario** (40 s): quédate 3 s dentro de su círculo para un efecto de 30 s al azar: +35% de daño, +30% de velocidad, +60% de experiencia o 3 de vida por segundo.
- **Luna de sangre** (30 s): el doble de enemigos y mucho más oro; la pantalla se tiñe de rojo.

## Maldiciones
Antes de jugar se pueden activar maldiciones (más difícil a cambio de más oro y experiencia de maestría). Ver `contenido.md`.

## Pausa
La pausa muestra la build: armas con nivel y daño hecho (% del total), objetos, reliquias y el estado de cada evolución (nivel y objeto que falta). Cuando un arma puede evolucionar, su icono brilla con la etiqueta **EVO** y sale un aviso.

## Modo infinito
Tras ganar: los enemigos siguen escalando sin límite (vida y daño), sale un jefe aleatorio cada ~80 s y +7 de oro por minuto. Morir o salir cuenta como **victoria**. Récord propio; aguantar 15 min da el logro *Inmortal*.

## Reto diario
Personaje, escenario, arma extra y misiones iguales para todos ese día (dificultad Normal). No desbloquea personajes ni escenarios.

## Desbloqueos
- **Personajes**: ganar con uno desbloquea el siguiente (o comprar por 9999).
- **Escenarios**: Aldea Oculta (sobrevive 6 min en el Bosque), Montaña Nevada (gana en la Aldea), Yomi (gana en Difícil con los 8 personajes).
- **Imposible**: igual que el Yomi. Al pulsar Imposible bloqueado se muestra la lista de personajes con ✓ (ganado en Difícil) o ✗ (falta).

## Controles (por defecto, remapeables)
| Acción | Tecla |
|---|---|
| Moverse | WASD / flechas |
| Dash | Espacio / Shift |
| Técnica especial | E / Q |
| Pausa | Esc / P |
| Ajustes | O |
| Minimapa | N |
| Silenciar | M |
| Elegir mejora | 1–5 |
| No coger nada (cofre) | X |
| Pantalla completa (app) | F11 |
