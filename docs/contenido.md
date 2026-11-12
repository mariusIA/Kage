# Contenido del juego

> Documentación viva. Generada a partir de los datos de `game/index.html` (CHARS, WD, PD, RELICS, ULTS, PATHS, SHOP, ACH, ET). Si cambias cualquiera de esas tablas, actualiza este archivo.

## Personajes

Se desbloquean en este orden ganando una partida con el anterior (cualquier dificultad, fuera del reto diario) o comprándolos por **9999 de oro**.

| # | Ninja | Cinturón | Vida | Velocidad | Arma inicial | Habilidad | Técnica especial |
|---|---|---|---|---|---|---|---|
| 1 | Aprendiz | blanco | 100 | ×1 | Shuriken | Aprende rápido: +25% de experiencia. | **Lluvia de shuriken**: 3 oleadas de shuriken en todas direcciones. |
| 2 | Guardián | amarillo | 160 | ×0.88 | Chi | Se cura 1,5/s y tiene +1 de armadura, pero es lento. | **Onda de chi**: Una onda que aparta y daña a todo lo cercano y te cura. |
| 3 | Corredora | naranja | 80 | ×1.3 | Hitodama | Muy rápida y con un imán enorme para los cristales. | **Viento divino**: 6 s ultrarrápida e invulnerable, dañando al pasar. |
| 4 | Tormenta | verde | 90 | ×1 | Rayo de Raijin | +25% de daño y ataca un 12% más rápido. | **Juicio de Raijin**: Una tormenta de 20 rayos sobre la pantalla. |
| 5 | Berserker | azul | 130 | ×1.05 | Kama | Furia: cuanta menos vida, más daño (hasta el doble). | **Furia del oni**: 8 s con el doble de daño. |
| 6 | Pícara | morado | 85 | ×1.12 | Kunai | +15% de probabilidad de crítico y ágil. | **Clon de sombras**: Un clon que lanza kunai durante 10 s. |
| 7 | Sacerdotisa | marrón | 110 | ×1 | Makibishi | +15% de área y los onigiri curan el doble. | **Sello sagrado**: Un enorme campo de púas que te cura. |
| 8 | Errante | negro | 100 | ×1 | 2 armas al azar | Empieza con dos armas al azar. | **Rueda del destino**: Una técnica al azar de los demás. |

## Armas

Hay 9 armas. Máximo 6 por partida, nivel máximo 5. Las evoluciones descubiertas se ven en la pestaña **Pergaminos** del menú. Con el arma a nivel 5 y su objeto pasivo, el siguiente cofre ofrece la **evolución**.

| Arma | Evolución | Necesita el objeto |
|---|---|---|
| Shuriken | Tormenta de Shuriken | Enfriamiento |
| Chi | Santuario Zen | Armadura |
| Hitodama | Kitsunebi | Crecimiento |
| Rayo de Raijin | Furia de Raijin | Suerte |
| Kama | Kama del Dragón | Fuerza |
| Kunai | Lluvia de Kunai | Botas |
| Makibishi | Campo de Púas | Vigor |
| Katana | Iai del Relámpago | Suerte |
| Bomba de humo | Niebla del Vacío | Imán |

## Objetos pasivos

Máximo 6 por partida, nivel máximo 5.

| Objeto | Efecto por nivel |
|---|---|
| Fuerza | +12% de daño |
| Enfriamiento | -7% de tiempo entre ataques |
| Botas | +10% de velocidad |
| Imán | +35% de radio de recogida |
| Vigor | +20 de vida máxima y te cura |
| Armadura | -1 de daño recibido |
| Suerte | +5% de crítico y más botín |
| Crecimiento | +10% de área de las armas |

## Reliquias

Salen en cofres (35%), en misiones difíciles y, con la build completa, a veces al coger un cofre.

| Reliquia | Efecto |
|---|---|
| Amuleto explosivo | Los enemigos pueden explotar al morir y dañar a los de alrededor. |
| Talismán de sangre | Recuperas 1 de vida cada 15 bajas. |
| Campana del templo | Cada 20 s suena y aparta a los enemigos cercanos. |
| Abanico de viento | +20% de área de todas las armas. |
| Máscara del oni | +30% de daño, pero −20 de vida máxima. |
| Pergamino antiguo | Una opción más al subir de nivel. |
| Moneda de la suerte | +50% de oro en esta partida. |
| Espejo de Yata | Al recibir daño lanzas 12 shuriken a tu alrededor. |

## Maestrías

Se gana experiencia de maestría en cada partida; cada rango da 1 punto. Cada senda tiene 4 nodos y una técnica maestra (necesita 6 puntos en su senda).

**Se juega con una sola senda** (`SAVE.mpath`): solo cuentan los puntos y la técnica maestra de la senda activa. Los puntos de las demás sendas se guardan pero no hacen nada hasta cambiar a ellas (botón "Jugar con esta senda").

| Senda | Nodos | Técnica maestra |
|---|---|---|
| Senda del Asesino | Daño, Probabilidad de crítico, Daño crítico, Daño a élites y jefes | Golpe del vacío |
| Senda del Guardián | Vida máxima, Armadura, Regeneración, Curación de onigiri | Montaña inamovible |
| Senda de la Sombra | Velocidad, Recarga de esquiva, Radio de recogida, Alcance de esquiva | Danza de sombras |
| Senda del Monje | Carga de técnica, Experiencia, Enfriamiento, Oro | Iluminación |

## Tienda (mejoras permanentes)

Precio: **8000 de oro en total** para subir cualquier mejora al máximo (`SHOP_TOTAL`), repartido de forma creciente entre sus niveles. Mejoras de 5 niveles: 620 → 1110 → 1600 → 2090 → 2580. Mejoras de 3 niveles: 1480 → 2670 → 3850. Revivir cuesta fijo **6666**.

| Mejora | Efecto por nivel | Niveles |
|---|---|---|
| Poder | +5% de daño | 5 |
| Vida | +10 de vida máxima | 5 |
| Armadura | -1 de daño recibido | 3 |
| Velocidad | +5% de velocidad | 3 |
| Imán | +15% de radio de recogida | 3 |
| Crecimiento | +8% de experiencia | 5 |
| Avaricia | +15% de oro | 5 |
| Suerte | +5% de crítico y botín | 3 |
| Repetir | +1 cambio de mejoras por partida | 3 |
| Revivir | Revives una vez con media vida | 1 |

## Dificultades

| Dificultad | Descripción |
|---|---|
| Fácil | Para disfrutar y probar builds: −20% de enemigos, −25% de vida, −30% de daño, jefes −20% de vida. −25% de oro. |
| Normal | Enemigos y jefes más duros y numerosos. +25% de oro. |
| Difícil | Hordas enormes, rápidas y que pegan fuerte. Solo para expertos. +60% de oro. |
| Imposible | El reto definitivo: todo es brutal. Exclusiva del Yomi... y de los demás escenarios, si te atreves. +150% de oro. |

## Escenarios

| Escenario | Cómo se desbloquea | Descripción |
|---|---|---|
| Bosque Sakura | Disponible desde el principio | Cerezos, bambú y toriis bajo una lluvia de pétalos. |
| Aldea Oculta | Sobrevive 6 minutos en el Bosque Sakura | Una aldea ninja de noche, iluminada por farolillos y luciérnagas. |
| Montaña Nevada | Derrota al Shinigami en la Aldea Oculta | Un paso helado entre pinos y rocas cubiertas de nieve. |
| Yomi | Gana en Difícil con cada uno de los 8 personajes (en cualquier escenario) | El inframundo. Solo se juega en Imposible. Grietas de lava, árboles muertos y almas en pena. |

## Jefes

| Jefe | Cuándo sale |
|---|---|
| Samurái Sombrío | Minuto 2:40 (todos los escenarios) |
| Jefe del escenario (Gran Oni Azul / Daimyō Traidor / Yuki-onna / aleatorio en el Yomi) | Minuto 5:20 |
| Shinigami | Minuto 8:00 — derrótalo o resiste 1:30 para ganar |

## Logros

| Logro | Requisito | Oro |
|---|---|---|
| Primera sangre | Derrota a 100 enemigos en total | 50 |
| Cazador de yokais | Derrota a 2.000 enemigos en total | 200 |
| Exterminador | Derrota a 20.000 enemigos en total | 800 |
| Pájaros de mal agüero | Derrota a 500 cuervos en total | 150 |
| Superviviente | Sobrevive 3 minutos en una partida | 75 |
| Resistente | Sobrevive 6 minutos en una partida | 150 |
| Leyenda | Derrota al Shinigami | 300 |
| Ninja inmortal | Gana una partida en Imposible | 3000 |
| Maestro del dolor | Gana una partida en Difícil | 1000 |
| Intocable | Llega al minuto 3 sin recibir daño | 400 |
| Evolución | Evoluciona un arma | 100 |
| Maestro armero | Evoluciona 3 armas en una partida | 400 |
| Arsenal completo | Lleva 6 armas en una partida | 150 |
| Coleccionista | Consigue 3 reliquias en una partida | 200 |
| Iluminado | Llega al nivel 50 en una partida | 200 |
| Matajefes | Derrota a 10 jefes en total | 400 |
| Sombra veloz | Esquiva 100 veces en una partida | 100 |
| Técnica secreta | Usa 5 técnicas especiales en una partida | 150 |
| Dojo creciente | Ten 4 personajes | 300 |
| Cinturón negro | Ten todos los personajes | 1000 |
| Explorador | Desbloquea los 4 escenarios | 500 |
| Inmortal | Aguanta 15 minutos (modo infinito) | 600 |
| A tus órdenes | Completa una misión | 75 |
| Agente de élite | Completa 6 misiones en una partida | 400 |
| Maldito | Gana una partida con 3 o más maldiciones | 500 |
| Erudito yokai | Descubre todos los yokai del bestiario | 500 |
| Exterminador | Derrota a 1.000 de un mismo tipo de yokai | 300 |
| Maestro de misiones | Completa 50 misiones en total | 800 |
| Disciplina | Sobrevive 6 minutos en un reto diario | 150 |

## Desafíos y aspectos
Cada personaje tiene un desafío. Al ganar cumpliéndolo (fuera del reto diario) se desbloquea un **traje alternativo**, que se activa en su tarjeta ("Traje: …").

| Personaje | Desafío | Traje |
|---|---|---|
| Aprendiz | Gana con 3 armas evolucionadas | Azul del alba |
| Guardián | Gana sin usar la esquiva | Armadura de bronce |
| Corredora | Gana completando 4 misiones | Viento esmeralda |
| Tormenta | Gana con la Furia de Raijin | Noche tormentosa |
| Berserker | Gana tras pasar 60 s con menos del 30% de vida | Sangre de oni |
| Pícara | Gana recibiendo 15 golpes o menos | Sombra violeta |
| Sacerdotisa | Gana sin comer ningún onigiri | Hábito sagrado |
| Errante | Gana en Difícil o Imposible | Vacío |

## Maldiciones
Opcionales, se eligen bajo la dificultad. Suman su bonificación al **oro** y a la **experiencia de maestría** de la partida. No se aplican en el reto diario.

| Maldición | Efecto | Bonificación |
|---|---|---|
| Yokai veloces | Enemigos un 40% más rápidos | +25% |
| Horda infinita | Un 60% más de enemigos | +30% |
| Cuerpo frágil | Vida máxima −40% | +25% |
| Sin descanso | No puedes curarte | +35% |
| Niebla espesa | Sin minimapa ni flechas | +15% |

## Bestiario
Pestaña del menú con los 15 yokai (10 normales y 5 jefes): nombre, descripción y cuántos has derrotado. Los no derrotados salen como silueta. Estrellas a 1, 100 y 1.000 derrotados.
