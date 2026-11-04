# Sistema 3D: cómo replicar los reels de referencia con nuestros temas

Objetivo (Jaime, 03-11-2026): «crear un sistema infalible para generar vídeos como estos… para aplicarlo a los temas
de los que yo quiero hablar». Base: `ANALISIS-REFERENCIA.md`. Este documento define el **molde de guion**, el
**lenguaje visual** y el **motor** que lo produce. Las reglas de `CLAUDE.md` siguen mandando (marca, voz, OK de
Jaime, previa con Kokoro, revisiones); donde este sistema choca con una regla, se dice en §7 y lo decide Jaime.

## 1. Molde de guion (en castellano)

Plantilla de 8 bloques, 20-24 frases de 2-7 palabras (≤ 45 caracteres por subtítulo), 100-125 palabras, 45-60 s
con pausas. Cada bloque tiene su función y su escena. Se escribe **con el espectador dentro** (tú, presente) y
con **una frase literal entrecomillada** que pueda copiar.

| # | Bloque | Frases | Fórmulas que funcionan en castellano | Escena asociada |
|---|---|---|---|---|
| 1 | Gancho = prohibición / sustitución | 1-2 | «Nunca digas "…"» · «Deja de esperar a…» · «Antes de …, haz esto» · «Esta frase hace que…» | Dos personajes frente a frente, plano medio; la frase prohibida en un bocadillo que se tacha |
| 2 | Coste | 1-2 | «Todo el mundo lo dice.» «Mañana eres una cara más.» «Te olvida en la siguiente reunión.» | Pull-back: multitud gris, tarjetas de perfil en el suelo |
| 3 | Técnica con nombre | 1-2 | «Cámbiala por dos frases.» «Busca al conector.» «Usa las cuatro letras.» «El giro del cero.» | Dolly in; el nombre con marcador amarillo; si es acrónimo, letras gigantes |
| 4 | Mecanismo, pieza a pieza | 6-10 | Cada pieza: nombre corto + «Dices: "…"» (bocadillo) + qué pasa en el otro («Ahora ya sabe dónde archivarte»). | Orbit por pieza; bocadillo blanco con borde amarillo; objeto 3D de la pieza (calendario, puerta, tarjeta) |
| 5 | Objeción | 2-3 | Rótulo «Estás pensando:» + «Eso suena a chulería.» / «¿Por qué iba a ayudarme?» / «Parezco nuevo.» → «Bien. Lo eres.» | Fondo oscuro 2-4 s, nube de pensamiento, texto blanco con la palabra fuerte en rojo |
| 6 | Giro | 1-2 | «Pero que te recuerden no basta.» «Casi todos se paran aquí.» «Lo que digas después decide…» | Dolly in a la cabeza del interlocutor; entra la pieza que falta |
| 7 | Recompensa en escena | 2-3 | Futuro con un tercero: «La semana que viene alguien dice que empieza… y lo primero que oye es: "Tienes que conocer a este tío".» | Fila de personas con travelling; bocadillo del tercero; línea de atención amarilla hacia ti |
| 8 | Remate espejo + envío | 2-3 | «No vendes. Preguntas.» «El cero nunca fue el problema. Esconderlo, sí.» + «Envíaselo a quien venga contigo al próximo evento.» | Pareja de personajes, flecha curva amarilla; música corta en seco |

Reglas de escritura (añaden a las 17, 34, 37, 38, 39, 43 y 48):
- Cada subtítulo es una oración completa, ≤ 45 caracteres, 2 líneas como mucho en el titular.
- Una palabra marcada por frase (amarillo = hazlo, rojo = no lo hagas). Nunca las dos en la misma frase.
- Ninguna cifra, ningún «según un estudio». Si entra el libro, entra en una frase que avanza («Lo mejor de esta
  técnica lo cuenta Keith Ferrazzi: nunca comas solo»), nunca como fuente de plantilla (regla 48).
- Nombre inventado y detalle doméstico: «Digamos que se llama Daniel.» «Tu chaqueta es increíble.»
- La objeción se escribe literal, en la voz del espectador, y se contesta en ≤ 5 palabras.
- Remate: dos frases paralelas; la segunda invierte la primera. Sin resumen, sin «recuerda que».
- Envío con destinatario concreto: «a quien venga contigo», «al amigo que siempre arrastras», «a tu socio».
- Lectura en frío + corrector de Madrid + prueba de comprensión antes de escena (reglas 37, 48d, 52b).

### 1.1 Temas del nicho con este molde (ideas semilla; cada una necesita su sí, regla 36)

| Situación | Gancho (prohibición) | Técnica con nombre |
|---|---|---|
| Reunión de ventas | «Nunca empieces con "¿en qué puedo ayudarte?"» | Las dos preguntas |
| Pedir una subida | «Deja de pedir una subida.» | El informe de tres líneas |
| Primer cliente | «Di "cero clientes" en voz alta.» | El giro del cero |
| Networking | «Cuando no conoces a nadie, habla primero con este.» | El conector |
| Negociar precio | «Nunca digas tu precio el primero.» | La horquilla |
| Procrastinar | «Deja de esperar a tener ganas.» | Los cinco calentamientos |
| Correo que nadie contesta | «Nunca escribas "a ver si podemos hablar".» | El correo con fecha |
| Hábito que falla | «Si ayer fallaste, hoy no recuperes.» | Nunca dos veces |

## 2. Lenguaje visual (fijo; es lo que hace reconocible la cuenta)

- **Paleta:** fondo `#f5f5f5` con rejilla y cruces; texto `#2a292c`; protagonista `#fafafa` con contorno;
  interlocutor `#4f5057`; multitud `#c0c1c6`; acento `#f5d63f`; negativo `#de2f45`; fondo invertido `#34353a`.
  (Choca con la regla 11: ver §7.)
- **Tipografía:** titular serif didona ultracondensada en mayúsculas (Noto Serif Display ExtraCondensed Black o
  Bodoni Moda estirada 1,25 en vertical, tracking −0,03 em, 100 px de altura de mayúscula en 1080×1920 → 150 px);
  bocadillos y rótulos en sans geométrica (Montserrat 34-38 px). Fuentes locales en `fonts/`, no de CDN.
- **Personajes:** figura pastilla (cápsula + esfera separada), tres materiales (contorno blanco / grafito con cara /
  gris sin cara), brazo de línea, sombra elíptica. Una sola malla parametrizada: altura, color, cara sí/no,
  contorno sí/no, giro de cabeza, inclinación.
- **Objetos:** biblioteca de «stickers 3D» con contorno: bocadillo, nube, tarjeta de perfil, puerta, mostrador,
  calendario, teléfono, cámara, estrella, libro, balón, nota, letra extruida, anillo, flecha curva, cruz, barras de
  contador, mesa alta. Cada uno con `color` (blanco/amarillo/gris) y animación de entrada (escala con rebote, 300 ms).
- **Escenario:** suelo infinito blanco con rejilla, picado 15-20°, luz suave + sombras de contacto, render toon
  (sin especular, contorno por `BackSide` escalado). Variantes: fila de puertas, mostrador, mesa de evento,
  escenario con atril (el «speaker»).
- **Cámara:** una sola toma. Vocabulario: `dolly`, `orbit`, `travel`, `pullback`, `push` (fuerte, al giro), `hold`.
  Cada movimiento 1-3 s con ease-in-out; nunca dos movimientos simultáneos salvo `orbit+dolly` en el cierre.
  Un movimiento por bloque del guion; dentro del bloque, la cámara se queda quieta y cambian los objetos.
- **Texto:** palabra a palabra sincronizado con la voz, acumulando; `pop` 120 ms por palabra; marcador 250 ms
  después de la palabra clave; frase visible 1-2 s tras la última palabra; vaciado con barrido vertical.
  Rótulo de voz («Estás pensando:», «Tú dices:», «Ellos deciden:») en sans pequeña sobre el titular.
- **Inversión de fondo:** una o dos veces por vídeo (objeción, giro), 2-4 s, 200 ms de transición, el 3D se
  oscurece pero sigue; texto blanco, palabra fuerte en rojo.
- **Zonas:** titular y < 450 y x < 980 (en 1080 de ancho); acción y 640-1150·1,5; nada en x > 930 ni y > 1770.
- **Sonido:** cama de pad/bajo continua a −24 dB bajo la voz, SFX cortos por entrada de objeto, marcador y
  movimiento de cámara (pop, tick, whoosh), *thud* en la inversión, corte seco de música al final. Voz en una
  toma (regla 45), pausas de 0,5-1 s entre frases.

## 3. Motor: `templates/3d/` (propuesta)

Encaja en la cadena actual (`reel.py` → `build.py` → `render.js` con Playwright y `window.seek(t)` → ffmpeg con
voz, sidechain y −14 LUFS), cambiando solo la composición: **Three.js (WebGL) en vez de canvas 2D**, con un
`seek(t)` determinista (todo se calcula a partir de `t`, nada depende de `requestAnimationFrame`).

```
templates/3d/
  engine.js        escena, cámara, materiales toon, contorno, suelo con rejilla, seek(t)
  actors.js        figura pastilla parametrizada; caras; brazo; sombra
  props.js         biblioteca de objetos (bocadillo, puerta, tarjeta, letra, anillo, flecha, contador…)
  captions.js      titular palabra a palabra (serif), marcador, rótulo de voz, inversión de fondo (HTML sobre el canvas → se compone al mismo canvas final)
  camera.js        dolly/orbit/travel/pullback/push con easing; ruta por bloques
  sound.js         reutiliza templates/dynamic/score.js: cama + SFX por evento (pop, tick, whoosh, thud)
  build.py         reel.json + shots3d.js + timing.json → composition/index.html (mismo contrato que dynamic)
  vendor/three.min.js   (sin CDN: la red de las sesiones no garantiza cdnjs)
```

Formato de escena (`shots3d.js`), por bloque del guion, con tiempos ligados a palabras como ahora (`wt(frase, palabra)`):

```js
REEL.scene = { floor: 'grid', light: 'soft' };
REEL.actors = { yo: { kind: 'hero', at: [-0.6, 0, 0] }, el: { kind: 'other', at: [0.6, 0, 0], face: true }, gente: { kind: 'crowd', n: 40, area: [6, 4] } };
REEL.blocks = [
  { t: [0, wt(1, 0)], cam: { move: 'dolly', from: 'wide', to: 'medium', ease: 'inout' },
    props: [{ id: 'b1', type: 'bubble', text: 'Encantado de conocerte.', over: 'yo', at: wt(0, 2), strike: wt(0, 0) + 1.2 }] },
  { t: [wt(2, 0), wt(3, 0)], cam: { move: 'pullback', to: 'wide' }, props: [{ type: 'cards', n: 60, at: wt(2, 3) }], actors: { gente: { show: true } } },
  { t: [wt(9, 0), wt(11, 0)], invert: true, caption: { voice: 'Estás pensando:' }, props: [{ type: 'thought', text: '…', over: 'yo' }] },
  ...
];
```

`reel.json` añade `"motor": "3d"`, `"style": "referencia-3d"` y, por frase, `hi` (palabra marcada) y `neg`
(palabra en rojo), como hoy. `reel.py previa`, `revisar.py`, `inspect.js` (zonas, choques, fotograma 0) y
`reglas.py` siguen valiendo; `inspect.js` necesita leer las cajas de texto del DOM de `captions.js`.

Render: Playwright + Chromium con WebGL por software (SwiftShader) funciona en estas sesiones; a 1080×1920 y 30 fps
cabe esperar ~3-6 fps de captura, es decir, 5-10 min por reel de 55 s. Aceptable para `reel.py render`.

## 4. Flujo de producción (igual que `GUIA-VIDEOS.md`, con el molde nuevo)

1. Idea con situación + prohibición + técnica con nombre → filtro de ideas (reglas 50-58) → OK de Jaime (tablero).
2. Guion con el molde de §1 → lectura en frío, corrector, comprensión (reglas 37, 48, 52) → `revisar.py` (nuevas
   comprobaciones en §5).
3. `shots3d.js` con un bloque por bloque del guion; `reel.py previa` con Kokoro → tira a 1 fps → `revisar.py tira`.
4. Previa al tablero con la cifra de caracteres → OK → voz v3 en una toma → `reel.py render` → QA → paquete → OK → publicar.

## 5. Comprobaciones que se añaden a `revisar.py` para este estilo

- G-3d-gancho: la frase 0 empieza por prohibición o sustitución («Nunca», «Deja de», «Antes de», «Esta frase»).
- G-3d-literal: hay al menos dos frases entrecomilladas que el espectador puede decir tal cual.
- G-3d-objecion: existe una frase con rótulo «Estás pensando:» entre el 35 % y el 65 % del guion.
- G-3d-recompensa: hay un bocadillo de un tercero en el último 25 %.
- G-3d-remate: las dos últimas frases antes del envío son ≤ 6 palabras cada una y la última invierte la anterior.
- G-3d-envio: la última frase empieza por «Envíaselo a» / «Guárdalo para» con destinatario concreto.
- G-3d-subtitulo: ≤ 45 caracteres y ≤ 2 líneas de titular.
- E-3d-cortes: cero cortes; una transición = movimiento de cámara o inversión de fondo.
- E-3d-cambio: algo nuevo en escena o en el texto cada ≤ 2 s (lo mide `inspect.js`).
- E-3d-color: nunca amarillo y rojo en la misma frase; una palabra marcada por frase.
- E-3d-zonas: las de siempre (regla 30).

## 6. Hoja de ruta propuesta

1. **Boceto (2-3 días de sesión):** `templates/3d/` con suelo, dos actores, bocadillo, tarjeta, anillo, flecha y
   captions; cámara `dolly/orbit/pullback`; un reel de 20 s con Kokoro para que Jaime vea el estilo.
   Sale al tablero como boceto, igual que el de K5 (regla 31).
2. **Biblioteca completa de objetos y los 8 bloques** como presets de escena (un preset por bloque del guion).
3. **Primer reel completo** con el molde (idea del nicho aprobada), previa, voz, publicación en el carril Explora
   si Jaime lo activa (diagnóstico del 03-11, decisión 6).
4. **Medir** (% visto, salto a 3 s, guardados, envíos) frente a los reels actuales y decidir si el sistema 3D pasa
   a ser el estándar.

## 7. Decisiones que necesitan el OK de Jaime (chocan con reglas vigentes)

1. **Paleta** (regla 11): la referencia es blanco + grafito + amarillo + rojo. Propuesta: el sistema 3D tiene su
   propia paleta, la de la referencia, porque es parte de lo que hace reconocible y legible el formato; la paleta
   fría sigue en el motor actual.
2. **Duración** (regla 43: 22-32 s, error > 40 s): la referencia dura 51-60 s. Propuesta: para el sistema 3D,
   45-60 s **solo** con la densidad de la referencia (≥ 20 titulares, cambio cada ≤ 2 s, objeción a mitad);
   `revisar.py` lo exige en vez del tope de 40 s.
3. **Efectos de sonido por transición** (pendiente del diagnóstico del 03-11): la referencia los usa en cada entrada
   de objeto y movimiento de cámara. Propuesta: sí, suaves, con la cama musical a −24 dB.
4. **Sin libro como eje**: la referencia no cita fuentes. Propuesta: el libro puede entrar en una frase (regla 29)
   o no entrar; la idea manda. Choca con la premisa «reels de libros» y con la tarjeta final (regla 1): propuesta,
   cierre en bucle sin tarjeta, como en la decisión 3 del diagnóstico.
5. **Tipo de cierre**: «Envíaselo a…» / «Guárdalo para…» es una llamada a la acción (la regla 14 prohíbe CTA en el
   remate). Propuesta: el remate espejo va antes y cumple la regla; el envío es una frase final aparte, permitida
   solo en este sistema porque es el motivo de envío de la regla 30 dicho en voz alta.
