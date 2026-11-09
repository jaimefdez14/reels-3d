# Análisis de la segunda tanda de referencia: «listas en negro» (09-11-2026)

Jaime subió cinco reels nuevos y pidió conocerlos «a la perfección» (animaciones, cómo se hilan, transiciones, diseño,
narración, historia y cómo se cuenta) para replicarlos y generar nuevos. **No son del mismo estilo que R1-R5**
(`ANALISIS-REFERENCIA.md`): aquellos eran 3D de rejilla blanca, titular serif y objeción; estos son **listas numeradas
sobre fondo negro, con un muñeco amarillo plano y subtítulo pequeño en sans**. Los llamo **estilo B** y a los vídeos
**B-R1 … B-R5**. El sistema para producirlos está en `docs/SISTEMA-LISTA.md` y el motor en `motor2d/`.

Qué se ha hecho: fotogramas a 2 fps de los cinco vídeos y tiras a 10 fps en cada transición; fotogramas a resolución
completa; **transcripción de la voz** (Whisper small.en con sherpa-onnx, por primera vez en esta repo se ha podido
«oír» la referencia); medición de colores, movimiento por medio segundo, ritmo de la voz, tono (F0) y energía del
audio por bandas. Lo que no se puede saber desde la sesión: el timbre exacto de la voz y qué música es (se ha medido, no
oído).

## 0. Ficha técnica

| | B-R1 Identidad | B-R2 Rutina de mañana | B-R3 Aprender en 20 h | B-R4 Cinco formas | B-R5 Cinco leyes |
|---|---|---|---|---|---|
| Archivo | DfV3JOKTNJ4 | DfRsGW0TB8t | DfLaoQgTS-C | DfBz14ztMdO | DfA-yvPzJDv |
| Duración | 50,0 s | 68,5 s | 51,2 s | 58,8 s | 44,0 s |
| Puntos de la lista | 3 | 5 | 4 | 5 | 5 |
| Palabras | 129 | 186 | 139 | 152 | 94 |
| Ritmo | 155 ppm | 163 ppm | 163 ppm | 155 ppm | 128 ppm |
| Fondo | negro puro | negro puro | degradado vertical #2b2d2c → #070908 | grafito #212322 con viñeta clara al centro | igual que B-R4 |
| Subtítulo | Inter Regular, blanco + 2.ª línea amarilla | Inter, blanco + 2.ª línea **amarilla en negrita cursiva** | Inter; gancho en MAYÚSCULAS negrita; palabra a palabra con desenfoque | Inter SemiBold, blanco, una línea | igual que B-R4 |
| Indicador de progreso | 3 puntos sueltos | 5 puntos sueltos | 4 barritas verticales | 5 puntos, el actual con aro | 5 puntos unidos por una línea, el actual con aro |
| Cierre | Guardar (libro con marcapáginas 1-2-3) + seguir | Seguir («otra cosa gratis que puedes hacer») | Resumen 1-4 con nombres + guardar + seguir | Pregunta a comentarios + seguir | Sin llamada: termina en el quinto punto |
| Formato | 720×1280, 30 fps, H.264 + AAC 44,1 kHz estéreo | | | | |

**Voz:** masculina, F0 mediana 130-148 Hz, plana y cercana, sin reverberación; muy probablemente sintética
(ElevenLabs o similar). Ritmo **rápido: 155-163 palabras por minuto** (R1-R5 iban a 120-130), con pausas cortas
(0,2-0,4 s) dentro del punto y algo más largas (0,6-0,9 s) al cambiar de número.
**Sonido:** cama musical continua y suave: en las pausas de la voz el nivel no baja de −35/−40 dBFS (≈ 18-20 dB
por debajo de la voz, que va a −12/−21). Sin cortes de música a mitad. Pequeños golpes agudos (>4 kHz) en los
cambios de número (`whoosh`/`pop`). Termina con la cama y un corte final (último cuarto de segundo a −38/−66 dB).

**Cortes:** cero cortes secos en los cinco. El movimiento medio por medio segundo es bajísimo (2,0-2,5 sobre 255),
con picos solo en los zooms fuertes (B-R2 a los 2-3 s, el reloj se come la pantalla; B-R5 a los 23 s, empuje al
engranaje) y en los cierres. El dinamismo viene de **animación de personaje y objetos dentro de un plano casi fijo**,
no de la cámara.

## 1. Guiones literales (transcritos de la voz) con tiempos

Formato: `segundo · frase` · *[lo que se ve]*. Lo que va en amarillo en el subtítulo, en **negrita**.

### B-R1 · «Build an identity so strong you'll become unrecognisable» (3 pasos, 50 s)

| s | Voz | Escena |
|---|---|---|
| 0,0 | Build an identity **so strong** | Muñeco **gris** (cuerpo gris, cabeza blanca con cara), de perfil; un punto amarillo luminoso flota a su lado; él lo mira y levanta la mano hacia él |
| 2,0 | you'll become **unrecognisable** | El punto traza un **anillo amarillo** (elipse de línea fina con una chispa en la cabeza del trazo) alrededor del muñeco; **el muñeco se vuelve amarillo** mientras el anillo se cierra |
| 4,3 | **in three steps.** | Fundido a negro; solo el texto. Aparecen arriba **3 puntos** de progreso |
| 5,7 | One. **Get clear.** | El primer punto **cae** del indicador y se convierte en una **moneda amarilla «1»** en el centro; se apaga, vuelve el muñeco (entra desde la oscuridad) |
| 7,7 | Decide who you **want to become.** | Muñeco mira a la derecha; aparecen puntos-estrella dispersos (opciones); una **linterna/haz** sale de su mano y elige una estrella que se ilumina |
| 9,8 | Then define what **that person actually does.** | Plano más cerca, el muñeco camina hacia la derecha con la mano extendida; aparece un ✓ y la palabra «DO» |
| 13,0 | **If you want discipline,** | El brazo extendido sostiene un hilo que conecta con un **temporizador circular «30 MIN»** (línea verde oscura) y un **bocadillo «···»** al lado |
| 14,4 | **set a clear standard,** | El muñeco se oscurece y sale; se queda el diagrama |
| 15,7 | like thirty minutes **of focused work** | Zoom al temporizador; el **arco amarillo se dibuja** alrededor del círculo |
| 17,5 | before you open **social media.** | El arco se completa → el número se convierte en **✓**, el bocadillo (redes) queda apagado detrás de una barra amarilla (bloqueado) |
| 19,6 | Two. **Build proof.** | Se apaga todo; el segundo punto cae y hace de **moneda «2»** |
| 21,5 | **Make small promises** | Muñeco con un **círculo vacío** delante |
| 23,0 | **and keep them.** | Toca el círculo con el dedo: se rellena (chispa) |
| 24,0 | (pausa) | **Lista** de 3 renglones con casillas; un punto amarillo en el suelo |
| 25,0 | Finish the work **you planned.** | Las casillas se marcan ✓ una a una |
| 26,0 | Show up when you **said you would.** | Muñeco camina hasta otro (gris, cabeza blanca) con un mini temporizador «30» entre los dos; **se dan la mano** |
| 28,0 | **Every promise kept** | Muñeco solo; **puntos amarillos** (promesas) aparecen uno a uno a su alrededor |
| 29,0 | gives you another reason **to trust yourself.** | Los puntos forman el **anillo** del principio alrededor del muñeco |
| 31,4 | Three. **Hold your standards.** | Moneda «3» (sale del tercer punto) |
| 33,6 | Motivation **will drop.** | Muñeco junto a una **barra vertical con un punto** (nivel) que baja; el muñeco se encorva |
| 35,5 | You'll **miss a day.** | **Fila de puntos** (días) amarillos con un hueco gris; un punto cae |
| 37,0 | **Learn from it** | Muñeco encorvado, mano en la barbilla |
| 38,0 | and return at **the next opportunity.** | Se endereza y **vuelve a coger la barra** (la levanta); la chispa sube |
| 40,0 | **One mistake doesn't erase** | Arco de puntos amarillos (semanas) |
| 41,0 | **weeks of showing up.** | Los puntos cierran el **anillo** alrededor del muñeco |
| 43,0 | **Judge yourself by** | Igual |
| 44,0 | the pattern **you keep building.** | En el anillo aparecen 3 monedas con rótulos CLEAR / PROOF / STANDARDS (recapitulación dentro del anillo) |
| 45,4 | **Save this so you** can come back | El muñeco sostiene una **tarjeta**; zoom: un **libro** con marcapáginas y la lista 1 CLEAR, 2 PROOF, 3 HOLD |
| 47,0 | whenever you need **a reminder,** | El libro se cierra y se va a la mano del muñeco |
| 48,5 | **and follow for more.** | Icono circular **seguir (silueta + «+»)** al que el muñeco señala |

### B-R2 · «15-minute morning routine» (5 puntos, 68 s)

| s | Voz | Escena |
|---|---|---|
| 0,0 | 15-minute **morning routine.** | Muñeco amarillo de perfil, a la izquierda, señalando un **reloj amarillo «15:00»** con arco de progreso |
| 2,0 | that will make your day **dangerously productive** | **Zoom fuerte** al reloj: el muñeco se va por la izquierda del encuadre, el reloj llena la pantalla |
| 4,0 | throughout a day. | Reloj gigante centrado |
| 4,9 | **five simple ways** to make it. | El reloj **se encoge** hasta un punto y se convierte en la **moneda «1»**; arriba aparecen 5 puntos |
| 7,7 | Number one. Stop hitting **snooze.** | Fundido: **cama** (verde oscuro), muñeco tumbado, despertador amarillo en la mesilla |
| 10,6 | When your **alarm rings,** | El despertador vibra |
| 11,5 | your brain starts **making deals.** | Aparece un **cerebro** (único objeto realista) sobre la cama |
| 13,9 | just **5 more minutes.** | El cerebro sigue; el reloj avanza |
| 15,8 | yeah, and somehow… **five minutes turns into an hour.** | El reloj gira rápido (las agujas dan vueltas) |
| 19,6 | get out **of bed!** | El muñeco **se incorpora, se sienta y se pone de pie** (animación de personaje completa, 1,5 s) |
| 21,2 | Number two, **move for four minutes.** | El despertador sube y se convierte en la **moneda «2»** (morph); fundido; muñeco de pie con un mini reloj «4:00» |
| 24,2 | do some **push-ups,** / **jumping jacks** / or anything that gets **your body moving.** | El muñeco hace **flexiones**, **saltos de tijera**, estiramientos: cada ejercicio cae en su palabra |
| 28,1 | your brain needs **to wake up.** / **not another nap.** | De pie, el reloj «4:00» al lado |
| 31,4 | Number 3. Take a **shower.** | Moneda «3» (sale del reloj) → **ducha** (barra y alcachofa amarilla) |
| 33,6 | try ending your shower with… **30 seconds** of cool water. | Caen gotas; el muñeco se **estremece** |
| 36,8 | it might wake you up / faster than your mom **shouting your name.** | Humor; la ducha sigue |
| 40,0 | Number 4. **The five-minute** rule. | Moneda «4» → **escritorio con ordenador** (pantalla amarilla), muñeco sentado; la moneda vuela a la pantalla |
| 42,6 | spend just **five minutes** / doing your most **important task.** | Escribe |
| 45,9 | not scrolling **TikTok.** / the actual work / you've been avoiding **since last Christmas.** | Igual (humor en la voz, la escena no cambia) |
| 50,7 | Number 5. Give your brain **a break.** | Moneda «5» → muñeco de pie, de frente |
| 53,3 | eat a good **breakfast.** | Brazos en jarra |
| 54,5 | get some **sunlight.** / **yes, sunlight.** / **that big yellow** thing outside. | Aparece el **sol** (círculo amarillo con halo y rayos cortos), que **brilla más** en cada repetición |
| 59,0 | it's free and **an underrated healer.** | El sol se mueve hacia arriba |
| 61,4 | think of one thing **you're thankful for.** | El sol baja y se convierte en un **corazón** sobre la cabeza |
| 64,0 | another free thing you can do… / so you can **upgrade your life.** | El corazón se convierte en un botón **«+»** (seguir) |

### B-R3 · «Learn anything in 20 hours» (4 pasos, 51 s)

| s | Voz | Escena |
|---|---|---|
| 0,0 | **20 hours** is all you need to learn anything. | Titular en MAYÚSCULAS «LEARN ANYTHING / **IN 20 HOURS**»; muñeco señala un **anillo de 20 segmentos** amarillos con «20 hours» |
| 2,8 | Trust me, anything! | Los segmentos giran y se pliegan… |
| 3,5 | | …y **se convierten en un piano** (teclado): el muñeco aparece tocándolo |
| 4,2 | And here are the **four steps** you can start **doing today.** | Las letras de «four steps» se deshacen en trocitos que suben y forman **4 barritas** de progreso |
| 7,0 | Number one, **break the skill down.** | La primera barrita baja y hace de «1»; el muñeco desaparece y el piano **se rompe en 3 teclados** pequeños |
| 9,7 | Every skill is **made up of smaller skills.** | Rótulos bajo cada uno: notes / rhythm / hands |
| 12,2 | Figure out which parts **matter** most | Dos se iluminan en amarillo (notes, rhythm), uno se apaga (hands) |
| 14,0 | and focus on those first. | El texto **se curva** («and focus on those first» en arco); los teclados se juntan de nuevo en el piano y vuelve el muñeco |
| 16,0 | Number two, learn enough to **correct yourself.** | Barrita «2»; aparece un **atril/pantalla** junto al piano |
| 19,0 | Don't spend weeks **watching tutorials** and **collecting** information. | Una **cuadrícula de miniaturas de vídeo** (▶) se apila sobre la escena |
| 22,7 | Learn the basics, **start practicing,** | Desaparecen; en la pantalla, una nota amarilla |
| 25,0 | notice your **mistakes,** **and improve.** | En la pantalla: lupa → ✓ amarillo |
| 27,0 | Number three, **remove distractions.** | Barrita «3» dibuja un arco; el muñeco se levanta y **guarda el móvil en un cajón** |
| 30,0 | **Put your phone** away. Turn off **notifications.** | El móvil (vibrando) entra en el cajón; el cajón se cierra |
| 33,0 | Make it as easy as possible to **sit down and practice.** | Vuelve al piano |
| 36,2 | Number four, practice for at least **20** hours. | Barrita «4»; **zoom in** al muñeco; el piano se convierte en una **cuadrícula de 20 casillas** |
| 40,0 | **Pick one skill** you've always wanted to learn. Give it 20 hours of **deliberate practice.** | Las casillas se **rellenan de amarillo una a una** (un punto viaja como cursor) |
| 45,0 | And trust me, you'll be **amazed** at how fast you can learn things. | La cuadrícula vuelve a piano; el muñeco toca y salen **notas musicales** amarillas |
| 48,4 | Save this **and follow** so you'll see **me again.** | Fundido; resumen: 4 tarjetitas amarillas 1-2-3-4 con «Break / Correct / Clear / Practice» y un icono de **guardar** (marcapáginas) |

### B-R4 · «Five ways to unfuck your life» (5 puntos, 59 s)

| s | Voz | Escena |
|---|---|---|
| 0,0 | Five ways to unfuck your life. | Muñeco tira de un hilo que sale de una **maraña amarilla** (ovillo de líneas) |
| 2,0 | | La maraña se encoge a un punto que viaja a la izquierda → 5 puntos de progreso (1 iluminado) |
| 2,8 | Number one, | **Moneda «1»** centrada, grande |
| 3,5 | not every problem **needs to be solved.** | La moneda se convierte en una **bola amarilla enorme**; el muñeco la empuja, se agacha, empuja (Sísifo) |
| 6,4 | Some problems **just won't go away.** | Empuja y la bola no se mueve |
| 9,5 | You simply get better **at living with them.** | El muñeco **se sienta encima de la bola** y se balancea; la bola deja un arco en el suelo |
| 11,4 | Number two. | La **bola se encoge y se convierte en la moneda «2»** (morph exacto, ver la tira) |
| 12,9 | Boundaries aren't about **controlling other people.** | La moneda **crece hasta ser un círculo** (límite) con un punto amarillo «YOU» dentro y uno gris «OTHERS» fuera; una línea punteada intenta ir del uno al otro |
| 15,7 | They're about controlling **your own actions.** | Un aro pequeño marca «YOU» |
| 18,0 | It's what you do when someone **crosses the line,** | El punto gris entra en el círculo; el amarillo **se aparta** dejando un rastro |
| 20,6 | not whether they listen. | El círculo se abre y el amarillo sale |
| 21,9 | Number 3. | Moneda «3» |
| 23,5 | Stop **fighting reality.** | **Nubes** de línea y **lluvia**; el muñeco bajo la lluvia, encogido |
| 25,5 | You don't have to like **what's happening,** | Saca un **paraguas cerrado** |
| 27,4 | but fighting it **won't change shit.** | Lo agita contra la lluvia |
| 29,4 | **Reality wins anyway.** | **Abre el paraguas** (amarillo) y se queda quieto |
| 31,0 | Number 4. | El paraguas se cierra y se convierte en la moneda «4» |
| 32,4 | Confidence doesn't mean having **zero insecurities.** | **Escalera** gris grande; el muñeco arriba, atado con cuerdas a 4 figuras grises con rótulos **Excuses / Doubt / Judgment / Fear** que tiran hacia abajo |
| 35,7 | It means feeling insecure, | Sigue tirando |
| 37,5 | **saying fuck it** | Se suelta de las cuerdas |
| 38,5 | and doing it anyway. | **De pie en lo alto**; aparece el rótulo **FORWARD**; las figuras quedan abajo |
| 39,8 | Number five, | Moneda «5» |
| 41,3 | your emotions deserve **to be heard.** | El muñeco con 3 **caritas** (emociones) flotando alrededor |
| 43,5 | but they don't get **to make every decision.** | Aparece un **volante** amarillo; él lo coge |
| 45,9 | Because if every feeling **controls your actions,** | El muñeco se desvanece; las caritas quedan atadas al volante con hilos y lo giran |
| 48,5 | your life becomes **one long emergency.** | Debajo, una **línea en zigzag** (electrocardiograma) que se dibuja y se vuelve loca |
| 51,2 | Which of these five **resonated with you the most?** | Las 5 monedas en fila |
| 53,8 | I'd love to hear **your thoughts in the comments.** | Tres muñecos: el amarillo en medio con un **bocadillo «···»**, dos grises a los lados que caminan hacia él |
| 56,0 | And if you found this helpful, **consider following for more.** | Los tres juntos; el amarillo señala |

### B-R5 · «Five universal laws that will solve 90% of your problems» (5 puntos, 44 s)

| s | Voz | Escena |
|---|---|---|
| 0,0 | Five universal laws | Muñeco de pie, centrado; caen **5 puntos** de arriba |
| 1,0 | that will solve 90% | Los puntos se convierten en **5 monedas numeradas** en fila sobre su cabeza |
| 3,0 | of your problems. | La primera crece un poco |
| 4,4 | One, **Murphy's Law.** | Moneda «1» sola en el centro; se aparta y deja al muñeco junto a una **silla** con una **caja** gris |
| 6,0 | Anything that can go wrong / eventually will. | La caja se vuelve amarilla, **cae** de la silla; el muñeco **se lleva las manos a la cabeza** |
| 9,3 | That's reality. | La caja se queda tirada; el muñeco se oscurece |
| 11,2 | Two, **Kidlin's Law.** | La caja **rueda y se convierte en la moneda «2»**; muñeco con un **portátil** |
| 12,8 | Write the problem clearly | En la pantalla, **líneas en zigzag** amarillas (el problema enredado) |
| 14,4 | and you've already solved | **Zoom in** al portátil |
| 15,7 | half of it. | Las líneas se **alisan** a la mitad |
| 16,2 | Most problems aren't complicated. | El portátil pasa a ser un **documento** con 3 líneas onduladas |
| 18,4 | They're just unclear. | Las líneas se vuelven **rectas** (claras) |
| 20,3 | Three, **Wilson's Law.** | Moneda «3»; dos personajes (amarillo y gris con cabeza blanca) a los lados de una **mesa con un engranaje** |
| 22,1 | Put value and intelligence first. | **Empuje fuerte de cámara**; el amarillo **gira el engranaje** con una llave |
| 24,6 | Money follows. | El engranaje se vuelve amarillo; el gris le da una **moneda «$»** |
| 25,8 | Chase money first / and you risk sacrificing / what makes you valuable. | El amarillo coge la moneda «$» y la abraza; **el engranaje se vuelve gris** y se para |
| 30,6 | Four, **Falkland's Law.** | Moneda «4» → **reloj de pared** de línea |
| 32,0 | If a decision can wait, / let it. | Las agujas se mueven |
| 34,5 | Demanding answers too early / creates anxiety. | El reloj tiembla (contorno doble) |
| 37,0 | Five, **Gilbert's Law.** | Moneda «5» → dos personajes **separados por una línea punteada** (muro) con **bocadillos** vacíos |
| 39,0 | Most conflicts come from / unspoken problems. | Bocadillos con «···» |
| 41,7 | Speak up! / Start solving them. | El amarillo **cruza la línea**, se dan la mano; los bocadillos se iluminan. Fin |

## 2. Cómo están escritos

### 2.1 La estructura es siempre la misma (lista numerada en 5 piezas)

| # | Bloque | Duración | Qué hace | Ejemplos |
|---|---|---|---|---|
| 1 | **Gancho = número + promesa exagerada** | 0-5 s | Cantidad concreta + resultado grande y un adjetivo fuerte: *so strong you'll become unrecognisable / dangerously productive / all you need to learn anything / unfuck your life / solve 90% of your problems* | todos |
| 2 | **Anuncio de la lista** | 1-2 s | *in three steps / here are the five simple ways / here are the four steps you can start doing today*; aparece el indicador de progreso | B-R1, R2, R3 |
| 3 | **Punto n: «Number n, [nombre]»** | 7-12 s cada uno | Nombre de 2-4 palabras en imperativo (*Get clear. Build proof. Stop hitting snooze. Remove distractions.*) o una ley con nombre propio (*Murphy's Law*) | todos |
| 3a | · Instrucción concreta | | Qué haces exactamente, con una medida pequeña: *30 minutes before you open social media / 30 seconds of cool water / spend just five minutes* | |
| 3b | · Ejemplo o voz interior | | *Just five more minutes. / push-ups, jumping jacks…* | |
| 3c | · Golpe final del punto | | Una frase corta que da la razón o un chiste: *Reality wins anyway. / faster than your mom shouting your name. / since last Christmas. / Money follows.* | |
| 4 | **Cierre** | 3-6 s | Una de tres: guardar (*Save this so you can come back whenever you need a reminder*), seguir (*follow so you'll see me again*), comentar (*Which of these five resonated with you the most?*); a menudo con resumen visual de la lista | B-R1, R3, R4 |

No hay objeción del espectador, ni escena de recompensa, ni remate espejo, ni «envíaselo a…»: **la tensión la lleva
la propia lista** (el espectador quiere ver los 5 y el indicador de progreso le dice cuánto falta). El bucle abierto
es el número.

### 2.2 Lenguaje

- **Segunda persona e imperativo.** *Decide, define, make, finish, show up, put your phone away, speak up.*
- **Frases de 3-10 palabras**, partidas en el subtítulo en trozos de 2-5 palabras (*Anything that can go wrong / eventually will.*).
- **Una medida pequeña y concreta por punto** (30 minutos, 4 minutos, 30 segundos, 5 minutos, 20 horas). Es lo que
  hace que suene a técnica y no a consejo. (Ojo con la regla 3 de `CLAUDE.md`: «sin cifras». Aquí las cifras no
  son estadísticas, son **dosis**; ver `SISTEMA-LISTA.md` §6.)
- **Humor seco una o dos veces por vídeo**, siempre al final de un punto: *since last Christmas*, *that big yellow
  thing outside*, *faster than your mom shouting your name*, *won't change shit*.
- **La voz interior entre comillas**: *Just five more minutes.* *Saying fuck it.*
- **Frases-sentencia de cierre de punto** (paralelas): *Most problems aren't complicated. They're just unclear. /
  Put value first. Money follows. / Some problems just won't go away.*
- Registro llano, palabrota ocasional (B-R4). Nada de datos, estudios ni fuentes salvo el nombre de la ley.

### 2.3 Temas

Autoayuda práctica universal: identidad y disciplina, rutina de mañana, aprender una habilidad, salud mental /
madurez, leyes para pensar. Todos encajan en nuestro nicho (crecimiento personal, dinero, trabajo, negocio).

## 3. Diseño

### 3.1 Paleta (medida)

| Uso | Color |
|---|---|
| Fondo A (B-R1, R2) | `#000000` puro |
| Fondo B (B-R3) | degradado vertical `#2b2d2c` arriba → `#070908` abajo, con un halo claro tras la escena |
| Fondo C (B-R4, R5) | `#212322` con viñeta: centro `#2a2c2b`, bordes `#1b1d1c` |
| Amarillo (cuerpo, monedas, acentos) | `#e6ce46` medio; degradado `#f2d550` (luz, arriba-izquierda) → `#c9a227` (sombra) |
| Texto principal | `#e8e8e6` (blanco roto) |
| Texto destacado | amarillo `#e3c440` |
| Piernas y brazos | `#e9e9e7` (delante) y `#a3a6a5` (detrás) |
| Personajes secundarios | cuerpo `#5d6160`, cabeza `#e4e4e2` (B-R5) o todo gris `#9a9d9c` (B-R4) |
| Líneas de objetos | verde grisáceo `#3e4a43` / `#56605a`, 2-3 px; relleno `#0f1512` |
| Suelo | una sola línea fina `#2a2d2c` y **reflejo** del personaje (espejo vertical, 15-20 % de opacidad, se desvanece en 300 px) |

Un solo color de acento: **amarillo = lo importante / lo que haces**. No hay rojo.

### 3.2 Tipografía y subtítulo

- **Inter** (o equivalente: SF Pro / Helvetica Now). Tamaño pequeño para el formato: 36-40 px de cuerpo en 720 de
  ancho (≈ 54-60 px en 1080). Centrado. **Es el subtítulo de la voz, no un titular**: frases cortas, 1-2 líneas.
- Posición: **centro de la pantalla, justo encima del personaje** (y ≈ 34-37 % de la altura); el indicador de
  progreso, más arriba (y ≈ 18-19 %).
- Dos líneas: la primera en blanco (Regular), la segunda en **amarillo** (Medium, o SemiBold *cursiva* en B-R2).
  La parte amarilla es la parte «que importa» de la frase (*so strong / unrecognisable / dangerously productive /
  of bed!*). En B-R4 y B-R5 todo va en blanco SemiBold y una sola línea.
- Animación: **palabra a palabra con la voz**, cada palabra entra con fundido + desenfoque (8 → 0 px) + subida de
  6 px en ~180 ms. La frase completa sale con fundido de 250 ms. En B-R3 hay efectos tipográficos especiales en
  2-3 momentos: letras que se deshacen en trocitos (y forman el indicador), texto curvado en arco.
- El gancho de B-R3 va en MAYÚSCULAS negrita (portada).

### 3.3 Personaje (el «muñeco»)

- **Plano, de perfil o tres cuartos, con un ligero volumen** (degradado radial en la cabeza y en el torso).
- Cabeza: **esfera** amarilla, diámetro ≈ 18 % de la altura del cuerpo; en B-R1 tiene **cara** (dos ojos de punto, cejas
  y sonrisa de línea, todo en marrón oscuro).
- Torso: **cápsula** amarilla vertical (alto ≈ 33 % del cuerpo, ancho ≈ 13 %), sin cuello: la cabeza se apoya encima.
- Piernas: dos **palitos** redondeados (blanco delante, gris detrás), ≈ 45 % de la altura, con rodilla.
- Brazos: palitos blancos con codo, salen del hombro; el de detrás, gris o escondido. Sin manos ni pies.
- Altura en pantalla: **≈ 26 % del alto del vídeo** en plano normal (≈ 500 px en 1920). Siempre de cuerpo entero salvo
  en el zoom expresivo.
- Animación **de personaje de verdad**: andar, agacharse, empujar, sentarse, tumbarse y levantarse, flexiones,
  saltos de tijera, encogerse de frío, manos a la cabeza, dar la mano, señalar. Cada acción cae sobre su palabra.
- Estados por color: **gris antes, amarillo después** (B-R1: el muñeco «se convierte» en amarillo al ganar la
  identidad). **Oscurecido** (amarillo apagado al 30 %) cuando la escena se va y llega el número.

### 3.4 Objetos

Iconos simples, de dos familias:
1. **Sólidos amarillos con degradado** (lo importante): moneda con número, reloj «15:00», bola, paraguas, sol, corazón,
   volante, caja, engranaje encendido, notas musicales, casillas de la cuadrícula.
2. **De línea fina verde-gris** (el contexto): temporizador «30 MIN», bocadillo «···», lista con casillas, portátil,
   documento, reloj de pared, cama, escritorio, ducha, piano, escalera, nubes, lluvia, cajón, silla, mesa.
Rótulos auxiliares en Inter mayúsculas muy pequeña (16-20 px a 1080), gris: YOU / OTHERS / CLEAR / PROOF / Excuses…

### 3.5 Escenario y cámara

- **Plano lateral fijo** con el suelo a ≈ 69 % de la altura (una línea + reflejo). Sin perspectiva, sin rejilla.
- La cámara casi no se mueve: **acercamientos lentos** (1,0 → 1,08 en 3-5 s) y **2-3 zooms expresivos por vídeo**
  (al reloj, al engranaje, al portátil, al temporizador), de 0,5-1 s con ease-in-out, que hacen que el personaje salga
  del encuadre. Nunca latigazos.
- Composición centrada: **todo en una columna central** (subtítulo, personaje, objeto), con mucho negro alrededor.

## 4. Transiciones: cómo se hilan las escenas

Esta es la clave del estilo. Entre punto y punto, **siempre** pasa lo mismo (medido a 10 fps en B-R1 19-21 s, B-R2
19-22 s y B-R4 11-13 s):

1. **El último objeto amarillo de la escena se separa** (sube, rueda o se encoge) mientras el resto de la escena
   **se oscurece** (fundido a ~25 % en 0,3-0,5 s) y el subtítulo se va.
2. Ese objeto **se transforma en la moneda amarilla con el número siguiente** (morph de 0,3-0,5 s: la bola de B-R4
   se encoge a moneda «2»; el despertador de B-R2 sube y se convierte en «2»; la caja de B-R5 rueda a «2»; el
   paraguas se cierra en «4»). Si no hay objeto, **el punto del indicador cae** desde arriba y crece hasta moneda (B-R1).
3. La moneda se queda **sola en el centro, sobre negro, 0,8-1,5 s**, mientras la voz dice «Number two,» (subtítulo
   pequeño encima) y el punto del indicador se enciende.
4. La moneda **se convierte en el primer objeto de la escena nueva** (la «2» crece hasta ser el círculo de los límites;
   la «4» vuela a la pantalla del ordenador) o se encoge mientras **la escena nueva aparece desde la oscuridad**
   (el personaje se aclara de oscuro a color en 0,4 s).

Es decir: **no hay corte nunca; hay oscuridad + un objeto que sobrevive y cambia de forma**. El ojo siempre tiene
algo amarillo que seguir. Dentro de un punto las escenas cambian igual: un objeto amarillo se transforma en el
siguiente (los 20 segmentos → piano → 3 teclados → cuadrícula → piano; el sol → corazón → «+»; la maraña → punto del
indicador).

Gramática de animación (lo que se repite):

| Recurso | Cómo es | Para qué |
|---|---|---|
| Moneda numerada | Disco amarillo con degradado y número oscuro | Separar los puntos |
| Indicador de progreso | 3-5 puntos/barritas; el actual amarillo con aro | Bucle abierto: cuánto falta |
| Anillo que se dibuja | Elipse fina amarilla con chispa luminosa en la punta | Identidad, círculo, «muro» |
| Morph de objeto | Un objeto amarillo se transforma en el siguiente | Hilar sin cortar |
| Oscurecer la escena | Todo baja al 25 % salvo el objeto que sobrevive | Transición |
| Objeto que se rellena | Arco de temporizador, casillas, cuadrícula, puntos de días | Progreso, hábito |
| Línea → recta | Garabato que se alisa | Claridad |
| Cambio de color del muñeco | Gris → amarillo | Transformación |
| Zoom expresivo | 0,5-1 s, el personaje sale del cuadro | Subrayar un objeto |
| Reflejo en el suelo | Espejo al 15-20 % | Profundidad y acabado |
| Resumen final | Libro/tarjetas con 1-2-3 + nombres, icono de guardar o seguir | Guardado |

## 5. Lo que hace que funcione

1. **Número en el gancho y en pantalla todo el rato**: el espectador sabe cuánto falta (indicador) y se queda a ver
   el siguiente número. Es el bucle abierto más simple que existe.
2. **Cada punto es autónomo y cabe en 8-12 s**: nombre imperativo + instrucción con dosis + golpe. Se puede guardar.
3. **Una acción del muñeco por frase**: la escena enseña la instrucción literal (levantarse de la cama, guardar el
   móvil, abrir el paraguas, cruzar la línea). Se entiende sin sonido.
4. **Un solo acento (amarillo) sobre negro**: se lee en el móvil a cualquier brillo y da sensación «premium».
5. **Transición por objeto que se transforma**: cero cortes y el ojo nunca se pierde.
6. **Humor seco al final de un punto**: reinicia la atención a mitad del vídeo.
7. **Cierre con resumen visual** (libro, tarjetas, monedas): motivo para guardar.

## 6. Diferencias con R1-R5 (estilo A) para no mezclarlos

| | Estilo A (R1-R5) | Estilo B (B-R1…B-R5) |
|---|---|---|
| Formato | Una técnica con objeción y recompensa | Lista numerada de 3-5 puntos |
| Fondo | Blanco con rejilla 3D | Negro / grafito liso |
| Texto | Titular serif condensada enorme | Subtítulo Inter pequeño, centrado |
| Colores | Amarillo + rojo | Solo amarillo |
| Personajes | Pastilla 3D con contorno, en pareja | Muñeco plano amarillo, casi siempre solo |
| Cámara | Latigazos cada 4-6 s | Casi fija, 2-3 zooms |
| Transición | Latigazo / corte a oscuro | Oscurecer + morph a la moneda del número |
| Ritmo de voz | 120-130 ppm | 155-163 ppm |
| Cierre | «Envíaselo a…» | Guardar / seguir / comentar con resumen |
