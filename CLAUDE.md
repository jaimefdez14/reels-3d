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
node herramientas/inspeccionar.js reels/ID 0.25  # solapes: titular, objetos, cabezas, bordes (debe decir ok)
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
