# Cooperativo online

Modo para **2 a 4 jugadores, cada uno desde su PC** (app de Windows o navegador). Disponible desde la versión 1.6.0.

## Cómo se juega
- En la **pantalla de inicio**, botón **Cooperativo** (entre Nueva partida y Ajustes). Se abre la pantalla **SALA**.
- **Anfitrión:** pulsa **Crear sala**. Arriba sale el **código de 5 letras** (botón Copiar) para pasárselo a los amigos, y cuántos jugadores hay (máximo 4).
- **Invitado:** escribe el código y pulsa **Unirse**.
- Cada jugador escribe **su nombre** (hasta 14 caracteres, se guarda para la próxima vez) en "Tu nombre". Se ve en su puesto de la sala, encima de su ninja en la partida y en los avisos ("Laia ha caído: ve a revivirlo"). Si no pone nada sale "Ninja".
- Dentro de la sala se ven los **4 puestos** (J1 anfitrión, J2–J4 invitados; los vacíos salen como "Libre") con el ninja de cada uno. Si la sala está llena o ya está en partida, quien intente entrar recibe un aviso. Cada jugador elige su ninja entre los que tiene desbloqueados (se puede repetir).
- El anfitrión elige **escenario, dificultad y maldiciones** en la propia sala. Las opciones son las que tiene desbloqueadas **el anfitrión** (escenarios, Imposible…), aunque el invitado no las tenga; el invitado ve esa misma lista en directo, en solo lectura.
- Cada invitado pulsa **Estoy listo**; cuando hay al menos un invitado y **todos** están listos, el anfitrión puede pulsar **Empezar partida**. Si un invitado cambia de ninja, deja de estar listo.
- **Cerrar sala** / **Salir de la sala** o Esc vuelven a la entrada; **Inicio** vuelve a la pantalla de inicio. Si un invitado sale, su puesto vuelve a quedar libre. El reto diario no se juega en cooperativo.
- Los dos tienen que tener **la misma versión** del juego. Si no, el lobby avisa.

## Reglas
- **Más difícil que en solitario, y más cuantos más seáis:** sobre la dificultad elegida, **por cada jugador además del primero** los enemigos tienen **+50% de vida**, los jefes **+60%**, aparecen **+40%** más enemigos y pegan **+10%** (`COOP_D` y `coopDiff(np)`; con 2 jugadores ×1,5 de vida, con 4 ×2,5). El oro no cambia.
- **Experiencia compartida:** el nivel es común. Cada subida de nivel da una elección **a cada jugador** (todos eligen a la vez), y cada uno elige **sus propias mejoras** (su propia build de armas, pasivos y reliquias).
- **Cofres:** son de quien los recoge; solo esa persona elige la recompensa. Con la build completa se convierten en oro, igual que en solitario.
- **Pausas compartidas:** mientras uno elige mejora o cofre, la partida se detiene para todos y a los demás les sale "Esperando a tus compañeros…". Las misiones, el mercader, el santuario y la pausa los gestiona el anfitrión.
- **Caer y revivir:** al llegar a 0 de vida (y sin "Revivir" de la tienda) el jugador **cae**. Cualquier compañero lo revive quedándose **3 segundos a su lado** (círculo verde); vuelve con la mitad de la vida. Si caen todos, se pierde la partida.
- Los enemigos persiguen al jugador vivo más cercano. Una flecha en el borde de la pantalla indica dónde está cada compañero (roja si ha caído). Encima de cada ninja sale el nombre de su jugador (el tuyo en dorado).
- **Final:** el oro de la partida es común y se lo llevan **todos**. Si ganáis, cada uno desbloquea el siguiente personaje después del que ha llevado (y cuenta la victoria en Difícil para Imposible). Las mejoras de la tienda y las maestrías de cada uno se aplican a su propio ninja.
- **Desconexión:** si un invitado se va o se corta, los demás siguen jugando (su ninja desaparece). Si se corta el anfitrión, el invitado vuelve a la pantalla final ("Conexión perdida") sin recompensa.

## Cómo funciona por dentro
- Red P2P **WebRTC** con **PeerJS 1.5.5** en estrella (cada invitado se conecta solo al anfitrión) (incrustada en `index.html`, licencia MIT). El emparejamiento usa el servidor público gratuito de PeerJS (`0.peerjs.com`); la partida en sí va directa entre los PCs. El id del anfitrión es `kage-CÓDIGO`.
- Sala: el anfitrión guarda a los invitados en `NET.guests[1..3]` (puesto → conexión, ninja, mejoras, listo) y manda `{t:'room', map, diff, curses, pl, code}` a todos cada vez que cambia algo (`roomSync()`); a cada invitado le dice su puesto con `{t:'you', slot}`. El invitado manda `hello` (con su nombre), `ch` (cambio de ninja), `name` y `ready`. Los nombres pasan por `cleanName()` (sin `<`, `>` ni caracteres de control, máx. 14) y se guardan en `SAVE.name`. `renderRoom()` dibuja la sala en todos.
- **El anfitrión simula toda la partida.** Guarda a cada jugador en `S.players[i]` y cambia de "contexto" con `useP(i)`, que intercambia los campos de jugador (`PF`: `p`, `wp`, `pa`, `relics`, `st`, `dash`, `ult`, `ch`…) y las mejoras permanentes del jugador (`meta`: tienda y maestrías).
- `update()` está dividido en `playerStep(dt, inp)` (cada jugador) y la parte del mundo (enemigos, proyectiles, objetos, eventos).
- Al empezar, los jugadores se ordenan (anfitrión primero) y cada uno recibe su índice en `{t:'start', me, pl}`; en la partida cada jugador tiene su conexión en `S.players[i].conn` y el anfitrión le escribe con `sendP(i, m)`.
- **Cada invitado** mueve a su ninja en local (`guestUpdate`) y manda su posición unas 30 veces por segundo (`{t:'in'}`), además del dash, la técnica especial (`ult`) y sus elecciones (`pick`, `cpick`, `cskip`).
- **El anfitrión** manda a cada invitado una "foto" del estado cada 50 ms (`netSnap`, `{t:'s'}`): todos los jugadores, enemigos cercanos a ese invitado, proyectiles, objetos, charcos, efectos, números de daño, jefe, misión, eventos y la build del invitado. El invitado interpola las posiciones (`guestSnap`).
- Cosméticos: cada jugador manda los suyos en `hello` (`cos`), van en la sala (`pl`) y en `start`; en la partida son `S.cos` (campo de jugador en `PF`). La foto incluye si cada jugador hace dash (para dibujar su estela) y `KF`, los efectos al derrotar cercanos `[x, y, efecto]`.
- Avisos: `banner()` es del mundo (lo ven todos); `pbanner()` es personal (solo lo ve el jugador al que le pasa).
- Al acabar, el anfitrión manda `{t:'end', won, gold}` y el invitado guarda su oro, estadísticas y desbloqueos en su propio `SAVE` (`guestEnd`).

## Pruebas
Sin internet se puede probar con un servidor PeerJS local (`npm i peer`, `PeerServer({port:9000,path:'/',host:'127.0.0.1'})`) y definiendo antes de cargar la página `window.KAGE_PEER={host:'127.0.0.1',port:9000,path:'/',secure:false,config:{iceServers:[]}}`. Con Playwright se abren varios contextos (cada uno con su `localStorage`, hasta 4 jugadores más uno para comprobar que la sala llena rechaza al quinto) y se juega una partida entre ellos.

## Limitaciones conocidas
- Máximo 4 jugadores. Con 4, el anfitrión necesita algo más de conexión de subida (manda una foto a cada invitado).
- En la versión web (artefacto de claude.ai) la conexión puede estar bloqueada por el entorno; el cooperativo está pensado para la app de Windows.
- Algunas redes muy cerradas (NAT simétrico) pueden no conectar porque no hay servidor TURN.
