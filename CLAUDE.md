# reels-3d: reglas permanentes

**Lee esto antes de hacer nada.** Una sesión nueva no recuerda nada de otra: la memoria es este archivo y el resto del
repositorio. Lo que Jaime decida y no esté escrito aquí se pierde: cuando fije una regla, anótala aquí en ese mismo
turno, haz commit y push, y díselo.

## Qué es esto

Un sistema para producir reels de animación 3D minimalista (personajes «pastilla», suelo de rejilla, titular en serif
condensada, amarillo y rojo) que copian el formato de cinco reels de referencia muy virales y lo aplican a nuestros
temas (crecimiento personal, dinero, trabajo, negocio), en castellano de España. Es una cuenta y una marca **distintas**
de ViralClips / @crecimiento.ai: no se mezcla contenido, código ni memoria entre las dos repos (Jaime, 04-11-2026).

- `docs/ANALISIS-REFERENCIA.md`: los cinco reels analizados (guiones, estructura, lenguaje, diseño, cámara, sonido).
- `docs/SISTEMA-3D.md`: el molde de guion de 8 bloques, el lenguaje visual y las comprobaciones. **Es la norma creativa.**
- `motor/`: el motor (Three.js, determinista: `window.seek(t)`), `build.py`, `render.js`, fuentes y vendor.
- `herramientas/`: `frames.js` (fotogramas), `sheet.py` (hoja de contactos), `kokoro_tts.py` (voz gratuita de previas).
- `reels/<ID>/`: `reel.json` (guion: `lines[{show, say, hi, neg, voice, pause, hide}]`), `shots3d.js` (escena),
  `timing.json` (tiempos por palabra de la voz), `voice/voz.wav`, `out/`.

## Comandos

```
python3 motor/build.py reels/ID [--sim]        # composición; --sim simula los tiempos (boceto sin voz)
node herramientas/frames.js $PWD/reels/ID/composition/index.html <dir> t1 t2 …   # fotogramas
python3 herramientas/sheet.py <dir> hoja.jpg 6   # hoja de contactos
node motor/render.js reels/ID [--hasta 20]     # MP4 1080x1920 (con voz si existe reels/ID/voice/voz.wav)
node herramientas/inspeccionar.js reels/ID 0.2   # solapes por rectángulos (debe decir ok)
node herramientas/inspeccionar_px.js reels/ID 0.5  # solapes por píxeles, legibilidad, máximo 2 bocadillos (debe decir ok)
```

## Revisión obligatoria antes de enseñar nada (04-11-2026)

Jaime, sobre el primer boceto: «revísalo tú en detalle. hay muchos fallos: textos que se colocan encima de los diseños,
diseños encima de otros diseños». Desde entonces, **nada se le envía sin pasar esto**:
1. `node herramientas/inspeccionar.js reels/ID 0.25` tiene que decir `ok` (ningún objeto pisa el titular, otro objeto,
   una cabeza ni se sale de la pantalla). Los bocadillos se anclan a un personaje (`over`) y el motor los coloca; no se
   colocan a mano con coordenadas salvo los objetos que viven en el suelo.
2. Tira a 1 fps del MP4 y mirarla fotograma a fotograma antes de enviarla; si algo se pisa y el inspector no lo ve, se
   añade la comprobación al inspector, no se arregla solo ese reel.

## Reglas que ha fijado Jaime

1. **Nada se mezcla con ViralClips** (04-11-2026): repo, cuenta, memoria y código separados. Se puede copiar una
   herramienta genérica de allí; nunca enlazarla ni compartir guiones, ideas o métricas.
2. **Inspiración literal de los cinco reels de referencia** (03-11-2026): «el objetivo no es copiar estos, sino tener la
   capacidad de replicarlo exactamente para aplicarlo a los temas de los que yo quiero hablar». Se sigue el molde de
   `docs/SISTEMA-3D.md` §1 y el lenguaje visual de §2 sin reinterpretarlos.
3. **Castellano de España**, natural, frases completas, ≤ 45 caracteres por subtítulo; segunda persona; sin cifras
   ni fuentes de plantilla; una frase literal entrecomillada que el espectador pueda decir.
4. **Dinero y OK:** no se gasta voz de pago sin decir antes la cifra de caracteres y sin su OK; primero previa con
   Kokoro (gratis) y OK de Jaime; nada se publica sin su OK explícito. Las claves solo como secretos del entorno.
5. **Trato:** directo y corto; comprobar antes de afirmar; decir lo que no se ha podido comprobar (la voz no se oye
   desde la sesión).

6. **El estilo base vale; más animación (04-11-2026).** Jaime, tras el B1 revisado: «el estilo vale, aunque hay que tratar
   de añadir más animaciones». Se mantienen personajes, tipografía, colores y encuadre; cada reel nuevo lleva más
   movimiento: cámara que no se queda quieta más de 3 s, un objeto que entra o cambia cada 1-2 s, anillos que se
   dibujan, contadores, tachados, cambios de cara, inversión de fondo en la objeción (ver `docs/ANALISIS-REFERENCIA.md` §3.6).

7. **Ideas aprobadas (04-11-2026):** Jaime: «ok la 3 y la 1, empieza por la 3. voz kokoro». I3 (el giro del cero) e I1
   (las dos preguntas) de `docs/IDEAS-2026-11-04.md` tienen su sí; el resto sigue en propuesta. Las previas van con Kokoro.

8. **Más parecido a la referencia, también la cámara (04-11-2026).** Jaime, tras I3 e I1: «no está bien ajustado el vídeo a la pantalla, se cortan muchas imágenes» y «revisa de nuevo los vídeos que te compartí para que todo sea más parecido, incluidos los efectos de movimiento de cámara, cambio de tomas, etc.».
   Medido otra vez en los cinco vídeos: (a) **personajes pequeños, de cuerpo entero**, un tercio de la altura, con aire alrededor; nunca cortados salvo en el plano cercano de la objeción; (b) **un latigazo de cámara (`whip: true`, 0,28 s) cada 4-6 s** a otro ángulo o escala, 10-12 por vídeo; (c) **corte seco** al fondo oscuro y vuelta (no fundido); (d) objetos a escala grande (el anillo mayor que el personaje, tarjetas que llenan el suelo); (e) los bocadillos tienen tamaño fijo en pantalla.
   El motor lo impone: presets `wide/medium/close` lejanos, `whip`, inversión en 0,06 s, bocadillos a píxeles constantes; `inspeccionar.js` avisa si un cuerpo se sale del encuadre (salvo en plano cercano). Los guiones se escriben **pulso a pulso sobre el reel de referencia más parecido** (I3 sobre R3, I1 sobre R1), no solo con el molde.

9. **Ninguna figura cortada, nunca (04-11-2026).** Jaime: «sigue habiendo errores con la cámara, se cortan figuras». Ningún personaje principal ni anillo puede salirse del encuadre en ningún fotograma: tampoco en el plano cercano de la objeción (ahora `close` está a 8,5-10 de distancia y muestra el cuerpo entero) ni durante un latigazo. `inspeccionar.js` lo comprueba cada 0,2 s sin excepciones; la multitud de fondo sí puede cortarse por los bordes, como en la referencia.

10. **Claridad y cero solapes, por sistema (04-11-2026).** Jaime: «ponle cabeza… asegurar que no haya errores de solapes de formas, y que se refuerce la claridad». Está en `docs/CLARIDAD.md`: el motor coloca los objetos (anclados, tamaño fijo en pantalla, siempre delante del 3D, titular con halo y ≤ 2 líneas, personajes que saltan de sitio se ocultan en el latigazo) y hay **dos inspectores**: `inspeccionar.js` (rectángulos) e **`inspeccionar_px.js` (píxeles: silueta de cada objeto por separado)**, que detecta mesas que cruzan cuerpos, multitud sobre protagonistas, flechas sobre caras, objetos ilegibles y más de 2 bocadillos a la vez. **Nada se enseña sin los dos en verde.** Jaime: «no regeneres vídeos, vamos a ir con nuevas ideas»: I3, I1 y E1 quedan como están; lo nuevo entra en los siguientes. Ideas nuevas: `docs/IDEAS-2026-11-04b.md`.
11. **Sonido (04-11-2026):** cama grave muy baja y efectos sintetizados por evento (latigazo, entrada de objeto, marcador de palabra, corte a oscuro, anillo), bajo la voz con sidechain, −14 LUFS, música cortada en seco al final. `herramientas/sonido.py`, eventos de `window.soundEvents()`; lo hace `render.js` solo.

12. **Ideas aprobadas, segunda tanda (04-11-2026):** Jaime: «n5 y n6». N5 (la primera frase del correo, letras D-A-P) y N6 (nunca falles dos veces) de `docs/IDEAS-2026-11-04b.md`. N1-N4 siguen en propuesta.

13. **La objeción va solo en el titular (04-11-2026).** Jaime, sobre «¿Esto no parece un guion?»: «necesito entender el racional de eso, no se entiende, ¿es un error o va ahí de verdad?». Era un error: la referencia pone la objeción en el titular (rótulo «Estás pensando:» + la frase, fondo oscuro) y la escena solo enseña la reacción del personaje. Yo repetía la frase, reformulada, en una nube de pensamiento: dos textos a la vez. Desde ahora la nube de la objeción lleva solo «?» (o no hay nube); nunca una frase. `inspeccionar_px.js` avisa si hay un bocadillo con texto largo mientras el titular lleva rótulo de voz.

14. **Escenas con acción y variedad, no etiquetas sobre un decorado (04-11-2026).** Jaime, comparando N6 con la referencia: «hay una enorme diferencia… los ejemplos tienen mucha más variedad, más assets, más dinámicos, más tomas, y la historia mejor contada, además de mejores subtítulos, efectos». Medido: R1 pasa por ~8 decorados en 55 s y R4 por 7; N6 estaba 33 s en el mismo pasillo con las figuras quietas y etiquetas encima. Desde N1 (Jaime: «ok, n1»):
    (a) **guion gráfico antes del código** (`reels/ID/storyboard.md`): por frase, decorado + acción (quién hace qué a quién) + un objeto grande, comparado con el plano equivalente de la referencia;
    (b) **5-8 decorados por reel** colocados en el mismo mundo, y la cámara **viaja** entre ellos (travelling, dolly, orbit), con 2-3 latigazos como mucho (la regla 8b queda corregida: lo que leí como latigazos eran travellings rápidos entre decorados);
    (c) **personajes que actúan**: andan, gesticulan, giran la cabeza, cambian de cara;
    (d) **objetos grandes** que llenan el plano y **titular más grande**, condensado, a todo el ancho;
    (e) el inspector mide decorados distintos, algo nuevo cada ≤ 2 s y el encuadre ocupado.

15. **Un solo hilo de texto: en escena solo lo que la voz dice en ese momento (04-11-2026).** Jaime: «no sé si se lían un poco con lo que dicen los bocadillos. No sé si deberían ser subtítulos también o no, y si debería decirlos la voz o no… se mezclan mensajes extraños que aparecen como bocadillos o como mensajes aparte y se entrelazan con los subtítulos principales». Revisados todos los reels (`inspeccionar_px.js`): había 22 casos en I3, I1, N5 y N6 de tres tipos: textos que la voz no dice nunca («Te cuento lo que hago…», «Sí, el jueves a las 10.», «x2», «EL DEL CERO»), frases que se repiten cuando la voz ya dice otra cosa («¿En qué puedo ayudarte?» mientras suena «Todo el mundo la dice») y bocadillos que duplican el titular a la vez.
    Norma, como en la referencia: (a) **el titular es el único texto que se lee**, y es lo que dice la voz; (b) un bocadillo solo lleva palabras si es la **cita que la voz dice en ese momento**, y entonces esa frase va `hide` en `reel.json` y el bocadillo se revela palabra a palabra (`reveal: índice`): una sola vez en pantalla; (c) todo lo demás va **sin palabras**: iconos, cifras, rayas grises en lugar de texto (bocadillos de «todo el mundo lo dice», recibos, listas), «?» en la objeción. Lo comprueba `inspeccionar_px.js` (regla 15).
16. **Acabado como la referencia (04-11-2026).** Jaime: «hay detalles y calidad en los diseños que es peor a los vídeos originales, ¿por qué?». Comparado a resolución completa: (a) cuerpo en forma de **bala** (estrecho abajo, ancho en los hombros, ~3 veces más alto que ancho) y no achaparrado y ancho abajo; (b) **contorno fino continuo** (malla inflada por las normales) y no el escalado que solo dejaba una raya en los hombros; (c) **brazo en jarra** con contorno, ojo y sonrisa; (d) **sombreado suave** (Lambert) y no a franjas (toon); (e) **sombra difuminada**; (f) titular en **didona condensada de trazo fino** (Noto Serif Display ExtraCondensed 500, `motor/fonts`) y no en la Black; (g) rejilla más fina y paredes claras. Está en el motor: vale para todo reel nuevo.

## Pendiente de Jaime

- Nombre de la cuenta de Instagram, token de Meta y voz de ElevenLabs para esta marca (si es la misma clave que
  ViralClips, decidir cómo se reparte el tope mensual).
- Ver el boceto B1 (`reels/B1`, sin voz, tiempos simulados) y decir qué cambia del estilo antes de hacer el primer
  reel completo.
- Las decisiones de `docs/SISTEMA-3D.md` §7 ya no chocan con ninguna regla aquí: la paleta de la referencia, 45-60 s
  con densidad alta, efectos de sonido por transición, libro opcional y cierre «Envíaselo a…» son la norma de esta
  repo salvo que Jaime diga lo contrario.

## Estado (04-11-2026)

- Motor con suelo, dos personajes (héroe con contorno y brazo, interlocutor con cara), multitud, bocadillo (con
  tachado), nube de pensamiento, tarjeta de perfil y campo de tarjetas, anillo, flecha, línea de atención, contador
  de barras, puerta y mesa; cámara esférica con presets `wide/medium/close` y keyframes; inversión de fondo;
  titulares palabra a palabra con marcador amarillo y palabra en rojo. Render a ~4 fps de captura (≈ 4 min por reel de 30 s).
- **Desde la regla 14 (N1):** personajes con acciones (`moves`: `arm` en grados, `phone`, `tilt` y `y` para tumbarse, `lean`, `hop`, `face` del interlocutor, y andar con balanceo cuando cambia `at`); objetos nuevos `sofa`, `wall` (gris), `wallclock` (agujas con `spin`), `battery` (pila con `levels`), `receipt` (recibo con `checkAt`), `papers` (folios con `left`), `floorring` (aro en el suelo) y pegatinas `phone` y `page`; titular de 142 px (3 líneas a 116 px si no cabe en 2); niebla para que no se vea el horizonte. `inspeccionar.js` mide la variedad en los reels con `storyboard.md`: ≥ 5 decorados, ≤ 2 s sin nada nuevo y encuadre ocupado (mediana ≥ 15 % a 180x320; la referencia da 16-36 %, N6 14 % y N1 38 %).
- Kokoro no viene instalado en una sesión nueva: `python3 -m venv /root/kokoro-venv && /root/kokoro-venv/bin/pip install kokoro-onnx soundfile` y los dos ficheros de `model-files-v1.0` (github.com/thewh1teagle/kokoro-onnx) en `~/.cache/hyperframes/tts/models` y `voices`.
- Falta: voz (Kokoro y ElevenLabs con tiempos por palabra → `timing.json`), sonido (cama y SFX), publicador,
  revisiones automáticas (`docs/SISTEMA-3D.md` §5), letras gigantes extruidas y más objetos.
