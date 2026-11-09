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
- `docs/REDACCION.md`: cómo se escribe cada frase del molde para que se narre bien (regla 14).
- `motor/`: el motor (Three.js, determinista: `window.seek(t)`), `build.py`, `render.js`, fuentes y vendor.
- `herramientas/`: `frames.js` (fotogramas), `sheet.py` (hoja de contactos), `voz.py` (voz Kokoro de previas + `timing.json`;
  instalación: venv en `/root/kokoro-venv` con `requirements-kokoro.txt` y los modelos de las *releases* de kokoro-onnx
  `model-files-v1.0` en `~/.cache/hyperframes/tts/{models,voices}`), `redaccion.py` (guion).
- `reels/<ID>/`: `reel.json` (guion: `lines[{show, say, hi, neg, voice, pause, hide, join}]`), `shots3d.js` (escena),
  `timing.json` (tiempos por palabra de la voz), `voice/voz.wav`, `out/`.

## Comandos

```
python3 motor/build.py reels/ID [--sim]        # composición; --sim simula los tiempos (boceto sin voz)
node herramientas/frames.js $PWD/reels/ID/composition/index.html <dir> t1 t2 …   # fotogramas
python3 herramientas/sheet.py <dir> hoja.jpg 6   # hoja de contactos
node motor/render.js reels/ID [--hasta 20]     # MP4 1080x1920 (con voz si existe reels/ID/voice/voz.wav)
node herramientas/inspeccionar.js reels/ID 0.2   # solapes por rectángulos (debe decir ok)
node herramientas/inspeccionar_px.js reels/ID 0.5  # solapes por píxeles, legibilidad, máximo 2 bocadillos (debe decir ok)
python3 herramientas/redaccion.py reels/ID     # redacción del guion (debe decir ok)
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
3. **Castellano de España**, natural, frases completas, ≤ 45 caracteres por subtítulo; segunda persona; cifras sí
   (regla 14), fuentes de plantilla no; una frase literal entrecomillada que el espectador pueda decir.
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

14. **Redacción: la estructura de la referencia + la guía de Jaime (09-11-2026).** Jaime: «mantén tu estructura de los
   5 ejemplos… pero aplica esto a la redacción, guionización y narrativa… lo mejor de ambos». `docs/REDACCION.md`: los
   8 bloques y sus escenas siguen la referencia; cada frase sigue la guía (idea en ≤ 12 palabras, monólogo seguido y
   leído en voz alta antes de cortar titulares, lo nuevo al final, cada frase retoma la anterior, nada de «Pero / Además /
   En cambio» al empezar, sin calcos ni muletillas, un «por eso» reconocible, giro hacia la mitad, remate ≤ 10 palabras
   que vuelve al gancho, envío a alguien reconocible, registro de Madrid). `herramientas/redaccion.py` tiene que decir
   `ok` antes de hacer escenas. Jaime: «con cifras sin problema y ok a lo de la voz»: cifras permitidas (5 como mucho,
   comparadas, con su unidad y de dónde salen dentro de la frase), y la voz lee la frase entera: `"join": true` en una
   línea la une a la siguiente en una sola toma (`herramientas/voz.py`), y los titulares se parten después.

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
- Falta: voz (Kokoro y ElevenLabs con tiempos por palabra → `timing.json`), sonido (cama y SFX), publicador,
  revisiones automáticas (`docs/SISTEMA-3D.md` §5), letras gigantes extruidas y más objetos.
