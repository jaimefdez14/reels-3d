# Análisis de los cinco reels de referencia (03-11-2026)

Jaime subió cinco reels muy virales de un mismo creador (consejos de *networking* en eventos, animación 3D
minimalista) y pidió extraer **todo** lo necesario para replicar el sistema en castellano con nuestros temas.
Este documento es el análisis; el sistema para reproducirlo está en `docs/SISTEMA-3D.md`.

Qué se ha hecho: tiras a 1 fps de los cinco vídeos (`docs/referencia/R1..R5.jpg`), fotogramas a resolución completa,
lectura de los subtítulos cinéticos a 2 fps (son la locución palabra por palabra), detección de cortes, medición del
movimiento por segundo, energía del audio por bandas (graves / voz / agudos) y muestreo de colores.
Limitación: **no se ha podido oír la voz** (no hay transcriptor en la sesión; los modelos de Whisper y Hugging Face
están bloqueados por la red y el STT de ElevenLabs cuesta créditos, regla 7). Los guiones de abajo están
reconstruidos de los subtítulos, que son literales; en R4 varias frases van dentro de la escena y se han perdido
(se marca).

## 0. Ficha técnica

| | R1 | R2 | R3 | R4 | R5 |
|---|---|---|---|---|---|
| Tema | Qué decir al despedirte | A quién hablar primero | Decir «cero clientes» | Confianza antes de hablar | Preguntas FORD |
| Duración | 55,5 s | 53,0 s | 56,7 s | 51,2 s | 60,4 s |
| Palabras (aprox.) | ~115 | ~115 | ~120 | ~70 visibles | ~125 |
| Ritmo | ~2 palabras/s (120-130 ppm), con pausas marcadas | | | | |
| Cortes duros | **0** | **0** | **0** | **0** | **0** |
| Fotogramas con titular arriba | 95 % | 77 % | 91 % | 61 % | 91 % |
| Formato | 720×1280 (origen 1080×1920), 30 fps | | | | |

Hallazgo capital: **no hay ni un solo corte.** Son 51-60 s de una única toma de cámara virtual que se desplaza,
acerca y gira, con objetos que entran, se transforman y salen. El «dinamismo» no viene de cortar, sino de que
**algo cambia cada 1-2 s dentro de la misma toma** (texto, un objeto nuevo, la cámara, un color). El movimiento
medio por segundo es bajo y constante (4-15 sobre 100) con **dos picos** por vídeo: el «giro» (fondo que se invierte
a oscuro, ~40) y el estallido final.

## 1. Guiones reconstruidos

### R1 · «Never say "it was nice meeting you"» (55 s)

> Never say "it was nice meeting you" if you want them to remember you. Everyone says it. By tomorrow, you're just
> another face. The last thing you say is what they walk away with. Swap it for two lines. The second one gets you
> introduced. Line one is the label. *(You're thinking:)* That sounds cocky. Not if you say it like a joke.
> "You're gonna remember me as the agency guy who also hates these events." Now they know exactly where to file you.
> But remembering you isn't enough. That's what line two is for. The trigger. Tie yourself to something that's going
> to happen anyway. "Next time you meet someone starting a business… send them my way." Next week. A founder says
> he's just starting out. And the first thing they say is… "You have to meet this guy." Send this to whoever's
> coming to your next event.

### R2 · «When you know nobody at an event» (53 s)

> When you know nobody at an event, talk to this person first. Skip the speaker. And the CEO. Find the connector.
> The guy who knows half the room. Say his name's Daniel. You'll spot him fast. He never stays in one group. He waves
> the new guy over. Tonight, that's you. A quick "hey" won't work. He'll forget you by the next group. So give him a
> job. "I'm starting an agency and want to meet founders. Who should I talk to?" *(You're thinking:)* Why would a guy
> like that help me? Introducing people is his favorite thing. You're just letting him do it. "You two need to
> meet." You walked in knowing nobody. Now every conversation starts with "Oh, you're Daniel's friend." Send this to
> whoever's coming with you.

### R3 · «Zero clients» (57 s)

> This one line makes them lean in. *(When you say:)* "Zero clients." It's not about the number. *(They're
> deciding:)* Are you worth talking to? Say it straight. "Zero. Looking for my first one. Honestly, that's why I'm
> here." Now they're thinking of who they know. The zero flip. "A few" → they test you. "My first one" → they can
> help. What you say next decides if they remember you. Don't pitch. Ask. "How'd you land your first one?" Then one
> follow-up. Everyone else is waiting to talk. You wanted their story. Guess who they'll remember. *(You're probably
> thinking:)* "Zero makes me look new." Good. You are new. New gets help. Fake gets tested. You're not selling.
> You're asking. Zero was never the problem. Hiding it was.

### R4 · «Stop waiting to feel confident» (51 s, parcial)

> Stop waiting to feel confident *(to talk to people)*. Confidence → conversation. *(Flip:)* Conversation →
> confidence. *(Fondo oscuro:)* Trap. … Tiny *(conversaciones diminutas: en puertas, mostradores, pasillos: «Your
> jacket is incredible»)* … The warm-up five *(contador 5/5)*. Walk away. … Not a natural? *(cinco bocadillos que se
> repiten en bucle)* … Receipt. Save this for before your next event.

Mecánica: cinco micro-conversaciones de diez segundos con desconocidos (un cumplido, una pregunta) y te vas; cuando
llegas a la persona que importa, ya «estás caliente». La confianza es el **recibo** de hablar, no el requisito.

### R5 · «FORD» (60 s)

> "So, what do you do?" Nobody remembers you. Everyone asks it. You blend in. Use FORD instead. Four letters. The
> last two make them remember you. F is family. *(You're thinking:)* I'm not asking a stranger about their mom. You
> don't. *(You ask:)* Are you from here originally? O is occupation. Skip "what do you do." What are you working on
> right now? A job title ends a conversation. A project starts one. *(Fondo oscuro:)* Most people stop there. R is
> recreation. What are you into outside of work? Watch their face change. Whatever lights them up, stay there. Order
> doesn't matter. Always get to the last one. D is dreams. Where do you want all this to go? Nobody asks that at
> events. Whoever does… is who they remember. Send this to the friend you always drag to events. *(pequeño:)* Follow,
> my networking playbook drops soon.

## 2. Cómo están escritos (guion)

### 2.1 La estructura es siempre la misma (8 bloques)

| # | Bloque | Segundos | Qué hace | Ejemplos |
|---|---|---|---|---|
| 1 | **Gancho = prohibición o sustitución** | 0-3 | Una orden que contradice lo que todos hacen: *Never say… / Stop waiting… / Talk to this person first / This one line…* | R1, R2, R4 |
| 2 | **Coste de no hacerlo** | 3-8 | Una frase de pérdida, en segunda persona, concreta: *By tomorrow, you're just another face. / You blend in. / He'll forget you by the next group.* | todos |
| 3 | **Nombre de la técnica** | 8-14 | Se bautiza y se numera: *Swap it for two lines / Find the connector / The zero flip / The warm-up five / Use FORD.* | todos |
| 4 | **Mecanismo, pieza a pieza** | 14-35 | Cada pieza = una frase corta + la **frase literal que tienes que decir**, entrecomillada, en un bocadillo. | «You're gonna remember me as…», «Who should I talk to?», «How'd you land your first one?» |
| 5 | **Objeción del espectador** | ~40-60 % | Rótulo pequeño *You're thinking,* + la objeción en grande; a veces el fondo se vuelve **oscuro**. Luego se desmonta en una frase. | *That sounds cocky. / Why would a guy like that help me? / Zero makes me look new. / I'm not asking a stranger about their mom.* |
| 6 | **Giro / segunda capa** | 60-75 % | *But remembering you isn't enough. / Most people stop there. / What you say next decides if they remember you.* Añade la pieza que la mayoría no hace. | R1, R3, R5 |
| 7 | **Escena de recompensa** | 75-90 % | Se muestra el futuro ganado, en escena, con la frase que dirá un tercero: *"You have to meet this guy." / "Oh, you're Daniel's friend." / Whoever does… is who they remember.* | todos |
| 8 | **Remate aforístico + envío** | últimos 5 s | Dos frases paralelas y cortas (*Zero was never the problem. Hiding it was. / New gets help. Fake gets tested.*) y después **«Send this to…»** con un destinatario concreto. | todos |

Encaja con nuestras reglas 39 y 43 (frase 0 = lección dicha al espectador; historia = una frase de prueba) y las
**afina**: la prueba no es una anécdota de un libro, es **una escena futura con el espectador dentro**.

### 2.2 Lenguaje

- **Segunda persona constante y presente de indicativo.** «You walked in knowing nobody. Now every conversation
  starts with…». No hay «la gente», hay «tú» y «ellos» (*them / they*).
- **Frases de 2-7 palabras.** Ningún subtítulo pasa de ~8 palabras ni de dos líneas. Las frases largas se parten en
  oraciones completas (*Don't pitch. Ask.*). Es más corto aún que nuestro tope de 70 caracteres (regla 38): aquí el
  tope real es **~45 caracteres**.
- **Verbos de acción, sin adverbios:** *skip, swap, find, ask, tie, walk away, save, send.*
- **Cero datos, cero libros, cero estudios.** La autoridad viene de que la frase literal suena real y de que la
  escena de recompensa es verosímil. No hay cifras en ninguno de los cinco.
- **Nombres propios inventados para hacerlo concreto** (*Say his name's Daniel*) y detalles de cotidianidad (*Your
  jacket is incredible*, *the agency guy who also hates these events*).
- **Paralelismos y contrastes de dos miembros:** *A job title ends a conversation. A project starts one. / New gets
  help. Fake gets tested. / Confidence → conversation / Conversation → confidence.* Son los momentos que más se
  guardan y los que llevan color.
- **La objeción del espectador se escribe literal** y se le responde con desprecio amable: *Good. You are new.*
- **El remate nunca resume:** cierra con una inversión de la premisa (*Zero was never the problem. Hiding it was.*).
- Humor leve y seco, una vez por vídeo (*…who also hates these events*).

### 2.3 Temas (y cómo se traducen a nuestro nicho)

Todos son **una situación social concreta y universal** (un evento, una presentación, una conversación con un
desconocido) con **una técnica con nombre, de 2-5 pasos, que puedes usar esta misma semana**. Nuestro nicho
(regla 56: dinero, productividad, hábitos, emprender, carrera, ventas, decisiones) admite exactamente el mismo
molde: «Nunca digas "¿en qué puedo ayudarte?" en una reunión de ventas», «Deja de esperar a tener motivación», «La
primera pregunta que haces a un cliente decide si te compra», «Cuando no sabes qué cobrar, di esto».

Lo que hay que conservar del original: situación con persona y lugar + técnica con nombre + frase literal para
decir + objeción + futuro ganado. Lo que cambia: el tema.

### 2.4 Retención: cómo mantienen la atención segundo a segundo

1. **Pregunta abierta en 0-3 s:** la prohibición obliga a quedarse para saber qué decir en su lugar.
2. **Un cambio visible cada 1-2 s** sin cortar: entra una palabra, se subraya, aparece un objeto, la cámara avanza.
3. **Bucles abiertos encadenados:** «two lines» → explica la primera → «that's what line two is for» → explica la
   segunda; «four letters» → F, O, R, D con «the last two make them remember you» (promesa de que lo mejor está al
   final).
4. **Objeción a mitad** (el espectador se ve a sí mismo) y **fondo que se oscurece**: reinicia la atención.
5. **Escena de recompensa** antes del final: la emoción de «ya lo tengo» justo antes del remate.
6. **Remate + «Send this to…»** con el destinatario concreto: motivo de envío escrito en el guion (regla 30).

## 3. Diseño: cómo está hecho

### 3.1 Paleta (medida en los fotogramas)

| Uso | Color |
|---|---|
| Fondo | `#f5f5f5` con rejilla fina y cruces «+» en los nodos (papel milimetrado / viewport 3D) |
| Texto titular | `#2a292c` (casi negro, no puro) |
| Figura protagonista | `#fafafa` con **contorno** `#2a292c` de 2-3 px (estilo «toon outline») |
| Figura interlocutor | `#4f5057` (gris grafito) sin contorno, con una cara cuadrada redondeada más oscura |
| Multitud | `#c0c1c6` (gris claro, sin cara) |
| Acento 1 (marcador) | `#f5d63f` amarillo: palabra clave, anillo, flecha, objeto importante |
| Acento 2 (negativo) | `#de2f45` rojo: la palabra que se prohíbe o la pérdida (*another face, isn't enough, won't work, trap, nobody*) y la cruz ✕ |
| Fondo invertido | `#34353a` con la misma rejilla en claro y texto blanco; para la objeción o el giro |

Solo **cuatro colores** más el gris: es la razón de que se lea sin sonido a 2 cm de alto. El amarillo = «haz esto»,
el rojo = «no hagas esto». Nunca se mezclan en la misma palabra.

### 3.2 Tipografía

- **Titulares: serif didona ultracondensada, en mayúsculas**, muy alta (altura ≈ 3,5 × anchura), remates de pelo,
  interletrado apretado. Va en dos o tres líneas alineadas a la izquierda, a ~45 px del borde, desde y ≈ 90 hasta
  y ≈ 440 (sobre 1280). Tamaño ≈ 95-110 px de altura de mayúscula. La frase ocupa como mucho **2 líneas** (3 en
  el bloque final «Send this to…»).
  Equivalente libre: **Noto Serif Display ExtraCondensed Black** o **Bodoni Moda** con `font-stretch` y tracking
  −0,03 em; en el motor se puede estirar verticalmente un 20-30 % con `scaleY` para igualar la proporción.
- **Palabra clave:** banda de marcador amarillo detrás (`marker`), o color rojo con subrayado, o solo **subrayado
  amarillo** fino (3 px) bajo la palabra. Como mucho una palabra destacada por frase.
- **Bocadillos y rótulos auxiliares: sans geométrica regular** (tipo Montserrat/Poppins, 22-26 px, en minúsculas,
  frase completa con punto). Los bocadillos son **tarjetas 3D blancas** con sombra suave, borde izquierdo amarillo
  cuando la frase es la que debes decir, y una cola que apunta a la boca del que habla.
- **Rótulo de cambio de voz:** *You're thinking, / You ask, / They're deciding:* en sans pequeña (18 px), gris, en la
  esquina superior izquierda, justo encima del titular. Es la marca de que el titular es ahora otra voz.
- **Citas:** el titular lleva comillas tipográficas cuando es la frase literal que decir, y la frase pasa a un
  bocadillo gigante (R1 a los 26 s: tarjeta blanca de 650×520 con el texto serif dentro).

### 3.3 Cómo aparece el texto (subtítulos cinéticos)

- **Palabra a palabra, sincronizado con la voz**, acumulándose en la frase (no sustituyendo). Cada palabra entra con
  un `pop` corto (escala 1,15 → 1 en ~120 ms) o cayendo 10 px. La frase completa se queda **1-2 s** y se vacía
  entera antes de la siguiente (a veces con un barrido vertical: las letras suben y se desenfocan).
- Un titular dura entre 1,5 y 4 s. En 55 s hay **~22 titulares** → un cambio de titular cada 2,5 s.
- La palabra clave recibe su marcador **después** de aparecer (200-300 ms más tarde), lo que da un segundo golpe
  visual sin añadir nada.
- Algunas frases **aparecen dentro de la escena** (R4: *Tiny*, *The warm-up five*, el contador 5/5), sobre una tarjeta
  blanca que vive en el 3D y sigue la perspectiva.
- Cuando el fondo se invierte, el texto pasa a blanco y la palabra fuerte, a rojo (`TRAP`, `COCKY`).

### 3.4 Personajes

- **Figuras «pastilla»:** cuerpo = cápsula alargada (altura ≈ 3 × anchura, más ancha por abajo), cabeza = esfera
  separada del cuerpo con un hueco, sin cuello. Sin manos: un brazo es una **línea con un codo** dibujada sobre el
  cuerpo (el protagonista) o una barra que sale del cuerpo (R2, cuando saluda). Sin pies: sombra elíptica suave.
- **Jerarquía por material:** protagonista blanco con contorno negro (el único «dibujado»), interlocutor gris
  oscuro mate con **cara = cuadrado redondeado oscuro con dos puntos y una sonrisa de línea**, multitud gris claro
  sin cara y sin contorno.
- **La cabeza expresa:** se gira hacia quien habla, se inclina 10-15° al dudar, aparece una **nube de pensamiento**
  o un bocadillo. La cara del interlocutor cambia (sonrisa) en «watch their face change».
- Escala: el protagonista mide ~1/3 de la altura del encuadre en plano medio y ~1/6 en plano general. Los personajes
  se colocan siempre en el **tercio inferior** (y > 640), dejando el tercio superior al titular.
- Objetos: iconos 3D planos y gruesos («sticker 3D» con contorno): calendario, cámara, nota musical, balón,
  libro abierto, estrella, bocadillo, puerta, mostrador, tarjeta de perfil. Los importantes van en **amarillo**;
  el resto, blanco con contorno. Las letras gigantes (F, O, R, D) son **sólidos extruidos de contorno fino** que
  sirven de escenario.

### 3.5 Escenario y cámara

- **Suelo infinito con rejilla** en perspectiva (ligero picado, ~15-20°), sin horizonte visible: el fondo
  y el suelo son el mismo blanco. Las cruces «+» son los nodos de la rejilla y dan sensación de «plano técnico».
- **Iluminación plana** con una luz principal suave y **sombras de contacto** elípticas; sin brillos especulares.
  Es render «toon» (clay + outline), no fotorrealismo.
- **Una sola toma.** La cámara hace: *dolly in* lento hacia los dos personajes (de general a medio en 3-4 s);
  *orbit* de 20-40° alrededor de la pareja cuando cambia quién habla; *travelling* lateral largo sobre una fila de
  personas o puertas (R4, 15-20 s; R1, 45 s: fila de tarjetas); *pull-back* a plano general para la multitud
  (R1, 7-8 s; R2, 0-2 s) y *dolly in* fuerte hacia la cabeza del interlocutor para el «giro» (R5, 31 s).
  Siempre con **easing** suave (ease-in-out, 1-3 s) y nunca dos movimientos a la vez salvo el orbit + dolly final.
- **Cambio de escena sin corte:** los objetos del plano anterior salen por escala (se encogen a 0 en 300 ms) o se
  hunden en el suelo mientras entran los nuevos; la cámara sigue moviéndose. Para las transiciones fuertes se
  **invierte el fondo** (el blanco pasa a `#34353a` en ~200 ms) y la escena anterior queda en el 3D, oscurecida.
- **Composición:** titular arriba izquierda (zona segura de Instagram, y < 450), acción abajo (y 640-1150), nunca
  nada importante en la franja derecha (x > 620) ni bajo y > 1180. Coincide con nuestras zonas de `VIRALIDAD.md`.

### 3.6 Gramática de animación (lo que se repite en los cinco)

| Recurso | Cómo es | Para qué |
|---|---|---|
| **Anillo/aro amarillo** | Un toro grueso que rodea a un personaje o se dibuja como una «C» (trazo que se completa) | El concepto (cero, el bucle, «lean in») |
| **Línea de atención** | Trazo amarillo fino, curvo, de la cabeza de uno a otro con un punto brillante que viaja | Quién mira a quién, quién presenta a quién |
| **Línea punteada roja** | Pasa por varias personas o puertas | El recorrido equivocado / lo que todos hacen |
| **Flecha curva dibujada a mano** | Amarilla, con cabeza triangular | «Send this to…», redirigir |
| **Cruz roja ✕** | Sobre el personaje a saltar | *Skip the speaker* |
| **Tarjetas de perfil** | Rectángulos grises con silueta; cientos en el suelo | *Just another face*, *where to file you* |
| **Contador de barras** | Cinco barras huecas que se rellenan de amarillo, rótulo «5/5» | *The warm-up five* |
| **Tachado** | Línea roja que atraviesa la frase prohibida en el bocadillo | *Skip «what do you do»* |
| **Bocadillo que crece** | Tarjeta blanca que sale de 0 con rebote y se queda sobre la cabeza | Cada frase literal que decir |
| **Nube de pensamiento** | Nube blanca punteada con la objeción | *You're thinking* |
| **Letras gigantes** | Extruidas, de contorno, el personaje junto a ellas; la actual se rellena de amarillo | Acrónimos (FORD), «ZERO» |
| **Inversión de fondo** | Fondo oscuro + texto blanco/rojo 2-4 s | Objeción, trampa, «most people stop there» |
| **Fila infinita** | Puertas, personas o tarjetas repetidas con travelling lateral | Rutina, lo que pasa siempre |

### 3.7 Sonido

Por bandas de energía (ver medición): hay **cama musical continua** de graves suaves (−22/−26 dB, sin picos: un
pad o un bajo ambiental, no un beat marcado) bajo una voz muy estable (−17/−22 dB; variación entre segundos de
~3 dB, en el rango de nuestra regla 45) y **efectos agudos cortos cada 3-6 s** (subidas de 8-15 dB en >6 kHz:
*pops* de palabra, *whoosh* de la cámara, *tick* del marcador, un *thud* grave en la inversión de fondo). El vídeo
termina con un corte de música seco (−33/−55 dB en el último segundo), no con fundido.
Voz: masculina, cercana, sin reverberación, ritmo lento con **pausas de 0,5-1 s entre frases** (las frases cortas
necesitan silencio para pesar). Esto no se ha podido oír: es lo que dice la medición y la práctica del género.

## 4. Lo que de verdad hace que funcione (resumen de insights)

1. **Una situación que el espectador ha vivido esta semana** y una frase literal que puede copiar. Nada de teoría.
2. **Prohibición en el gancho** (*Never say… / Stop…*): abre la pregunta «¿y entonces qué digo?».
3. **Técnica con nombre y número** (dos líneas, cuatro letras, cinco calentamientos, el zero flip): da sensación
   de sistema y de «guardable».
4. **La objeción del espectador, dicha en voz alta y en oscuro,** a mitad: es el rehook.
5. **Escena del futuro con un tercero hablando bien de ti**: la recompensa emocional, en escena, no narrada.
6. **Remate de dos frases espejo** y **«Send this to [persona concreta]»**: envío y guardado escritos en el guion.
7. **Un solo lenguaje visual**: cuatro colores, una tipografía de titular, personajes pastilla, suelo de rejilla,
   cámara continua. El espectador lo reconoce en el primer fotograma.
8. **Nada que leer que no se esté oyendo**: el subtítulo es la voz, palabra a palabra, con una sola palabra
   marcada. Y la escena ilustra el **objeto** de la frase (el bocadillo, la puerta, la tarjeta), no la metáfora.
9. **51-60 s pero con 22 titulares y un cambio cada 1-2 s**: la duración larga no se nota porque la densidad de
   cambio es altísima y no hay cortes que «saquen» al espectador.
10. Sin libros ni cifras: la credibilidad es que la frase suene a verdad. Para nosotros, el libro puede entrar
    como **una frase**, nunca como fuente de plantilla (reglas 16, 29 y 48).

Lo que choca con nuestras normas actuales y hay que decidir con Jaime: la **duración** (51-60 s frente a los
22-32 s de la regla 43; aquí la duración la sostiene la densidad de cambios y la objeción a mitad), la **paleta**
(blanco + grafito + amarillo + rojo, frente a la fría de la regla 11) y los **efectos de sonido por transición**
(pendiente de su OK en el diagnóstico del 03-11). Ver `docs/SISTEMA-3D.md` §7.
