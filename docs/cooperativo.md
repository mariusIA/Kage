# Cooperativo online

Modo para **2 jugadores, cada uno desde su PC** (app de Windows o navegador). Disponible desde la versión 1.6.0.

## Cómo se juega
- En la **pantalla de inicio**, botón **Cooperativo** (entre Nueva partida y Ajustes). Se abre la pantalla **SALA**.
- **Anfitrión:** pulsa **Crear sala**. Arriba sale el **código de 5 letras** (botón Copiar) para pasárselo al amigo.
- **Invitado:** escribe el código y pulsa **Unirse**.
- Dentro de la sala se ven los dos puestos (J1 anfitrión, J2 invitado) con el ninja de cada uno. Cada jugador elige su ninja entre los que tiene desbloqueados (se puede repetir).
- El anfitrión elige **escenario, dificultad y maldiciones** en la propia sala. Las opciones son las que tiene desbloqueadas **el anfitrión** (escenarios, Imposible…), aunque el invitado no las tenga; el invitado ve esa misma lista en directo, en solo lectura.
- El invitado pulsa **Estoy listo** y entonces el anfitrión puede pulsar **Empezar partida**. Si el invitado cambia de ninja, deja de estar listo.
- **Cerrar sala** / **Salir de la sala** o Esc vuelven a la entrada; **Inicio** vuelve a la pantalla de inicio. Si el invitado sale, su puesto vuelve a quedar libre. El reto diario no se juega en cooperativo.
- Los dos tienen que tener **la misma versión** del juego. Si no, el lobby avisa.

## Reglas
- **Experiencia compartida:** el nivel es común. Cada subida de nivel da una elección **a cada jugador**, y cada uno elige **sus propias mejoras** (su propia build de armas, pasivos y reliquias).
- **Cofres:** son de quien los recoge; solo esa persona elige la recompensa. Con la build completa se convierten en oro, igual que en solitario.
- **Pausas compartidas:** mientras uno elige mejora o cofre, la partida se detiene para los dos y al otro le sale "Esperando a tu compañero…". Las misiones, el mercader, el santuario y la pausa los gestiona el anfitrión.
- **Caer y revivir:** al llegar a 0 de vida (y sin "Revivir" de la tienda) el jugador **cae**. Su compañero lo revive quedándose **3 segundos a su lado** (círculo verde); vuelve con la mitad de la vida. Si caen los dos, se pierde la partida.
- Los enemigos persiguen al jugador vivo más cercano. Una flecha en el borde de la pantalla indica dónde está el compañero (roja si ha caído).
- **Final:** el oro de la partida es común y se lo llevan **los dos**. Si ganáis, cada uno desbloquea el siguiente personaje después del que ha llevado (y cuenta la victoria en Difícil para Imposible). Las mejoras de la tienda y las maestrías de cada uno se aplican a su propio ninja.
- **Desconexión:** si el invitado se va o se corta, el anfitrión sigue solo. Si se corta el anfitrión, el invitado vuelve a la pantalla final ("Conexión perdida") sin recompensa.

## Cómo funciona por dentro
- Red P2P **WebRTC** con **PeerJS 1.5.5** (incrustada en `index.html`, licencia MIT). El emparejamiento usa el servidor público gratuito de PeerJS (`0.peerjs.com`); la partida en sí va directa entre los dos PCs. El id del anfitrión es `kage-CÓDIGO`.
- Sala: el anfitrión manda `{t:'room', map, diff, curses, hc, hs, code}` cada vez que cambia algo (`roomSync()`); el invitado manda `hello`, `ch` (cambio de ninja) y `ready`. `renderRoom()` dibuja la sala en los dos.
- **El anfitrión simula toda la partida.** Guarda a cada jugador en `S.players[i]` y cambia de "contexto" con `useP(i)`, que intercambia los campos de jugador (`PF`: `p`, `wp`, `pa`, `relics`, `st`, `dash`, `ult`, `ch`…) y las mejoras permanentes del jugador (`meta`: tienda y maestrías).
- `update()` está dividido en `playerStep(dt, inp)` (cada jugador) y la parte del mundo (enemigos, proyectiles, objetos, eventos).
- **El invitado** mueve a su ninja en local (`guestUpdate`) y manda su posición unas 30 veces por segundo (`{t:'in'}`), además del dash, la técnica especial (`ult`) y sus elecciones (`pick`, `cpick`, `cskip`).
- **El anfitrión** manda una "foto" del estado cada 50 ms (`netSnap`, `{t:'s'}`): jugadores, enemigos cercanos al invitado, proyectiles, objetos, charcos, efectos, números de daño, jefe, misión, eventos y la build del invitado. El invitado interpola las posiciones (`guestSnap`).
- Avisos: `banner()` es del mundo (lo ven los dos); `pbanner()` es personal (solo lo ve el jugador al que le pasa).
- Al acabar, el anfitrión manda `{t:'end', won, gold}` y el invitado guarda su oro, estadísticas y desbloqueos en su propio `SAVE` (`guestEnd`).

## Pruebas
Sin internet se puede probar con un servidor PeerJS local (`npm i peer`, `PeerServer({port:9000,path:'/',host:'127.0.0.1'})`) y definiendo antes de cargar la página `window.KAGE_PEER={host:'127.0.0.1',port:9000,path:'/',secure:false,config:{iceServers:[]}}`. Con Playwright se abren dos contextos (cada uno con su `localStorage`) y se juega una partida entre los dos.

## Limitaciones conocidas
- Máximo 2 jugadores.
- En la versión web (artefacto de claude.ai) la conexión puede estar bloqueada por el entorno; el cooperativo está pensado para la app de Windows.
- Algunas redes muy cerradas (NAT simétrico) pueden no conectar porque no hay servidor TURN.
