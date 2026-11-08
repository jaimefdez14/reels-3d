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
- `docs/METODO-30S.md`: **el método de guion (30 s, bucles abiertos, ganchos)**. Manda sobre el molde de `SISTEMA-3D.md` §1.
- `docs/SISTEMA-3D.md`: el lenguaje visual y las comprobaciones (su molde de 8 bloques y 45-60 s queda sustituido por la regla 20).
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

13. **La objeción va solo en el titular (04-11-2026).** Jaime, sobre «¿Esto no parece un guion?»: «necesito entender el racional de eso, no se entiende, ¿es un error o va ahí de verdad?». Era un error: la referencia pone la objeción en el titular (rótulo «Estás pensando:» + la frase, fondo oscuro; desde la regla 18, sin rótulo pequeño: la voz lo dice y va en el titular) y la escena solo enseña la reacción del personaje. Yo repetía la frase, reformulada, en una nube de pensamiento: dos textos a la vez. Desde ahora la nube de la objeción lleva solo «?» (o no hay nube); nunca una frase. `inspeccionar_px.js` avisa si hay un bocadillo con texto largo mientras el titular lleva rótulo de voz.

14. **Escenas con acción y variedad, no etiquetas sobre un decorado (04-11-2026).** Jaime, comparando N6 con la referencia: «hay una enorme diferencia… los ejemplos tienen mucha más variedad, más assets, más dinámicos, más tomas, y la historia mejor contada, además de mejores subtítulos, efectos». Medido: R1 pasa por ~8 decorados en 55 s y R4 por 7; N6 estaba 33 s en el mismo pasillo con las figuras quietas y etiquetas encima. Desde N1 (Jaime: «ok, n1»):
    (a) **guion gráfico antes del código** (`reels/ID/storyboard.md`): por frase, decorado + acción (quién hace qué a quién) + un objeto grande, comparado con el plano equivalente de la referencia;
    (b) **5-8 decorados por reel** colocados en el mismo mundo, y la cámara **viaja** entre ellos (travelling, dolly, orbit), con 2-3 latigazos como mucho (la regla 8b queda corregida: lo que leí como latigazos eran travellings rápidos entre decorados);
    (c) **personajes que actúan**: andan, gesticulan, giran la cabeza, cambian de cara;
    (d) **objetos grandes** que llenan el plano y **titular más grande**, condensado, a todo el ancho;
    (e) el inspector mide decorados distintos, algo nuevo cada ≤ 2 s y el encuadre ocupado.

15. **Un solo hilo de texto: en escena solo lo que la voz dice en ese momento (04-11-2026).** Jaime: «no sé si se lían un poco con lo que dicen los bocadillos. No sé si deberían ser subtítulos también o no, y si debería decirlos la voz o no… se mezclan mensajes extraños que aparecen como bocadillos o como mensajes aparte y se entrelazan con los subtítulos principales». Revisados todos los reels (`inspeccionar_px.js`): había 22 casos en I3, I1, N5 y N6 de tres tipos: textos que la voz no dice nunca («Te cuento lo que hago…», «Sí, el jueves a las 10.», «x2», «EL DEL CERO»), frases que se repiten cuando la voz ya dice otra cosa («¿En qué puedo ayudarte?» mientras suena «Todo el mundo la dice») y bocadillos que duplican el titular a la vez.
    Norma, como en la referencia: (a) **el titular es el único texto que se lee**, y es lo que dice la voz; (b) un bocadillo solo lleva palabras si es la **cita que la voz dice en ese momento**, y entonces esa frase va `hide` en `reel.json` y el bocadillo se revela palabra a palabra (`reveal: índice`): una sola vez en pantalla; (c) todo lo demás va **sin palabras**: iconos, cifras, rayas grises en lugar de texto (bocadillos de «todo el mundo lo dice», recibos, listas), «?» en la objeción. Lo comprueba `inspeccionar_px.js` (regla 15).
16. **Acabado como la referencia (04-11-2026).** Jaime: «hay detalles y calidad en los diseños que es peor a los vídeos originales, ¿por qué?». Comparado a resolución completa: (a) cuerpo en forma de **bala** (estrecho abajo, ancho en los hombros, ~3 veces más alto que ancho) y no achaparrado y ancho abajo; (b) **contorno fino continuo** (malla inflada por las normales) y no el escalado que solo dejaba una raya en los hombros; (c) **brazo en jarra** con contorno, ojo y sonrisa; (d) **sombreado suave** (Lambert) y no a franjas (toon); (e) **sombra difuminada**; (f) titular en **didona condensada de trazo fino** (Noto Serif Display ExtraCondensed 500, `motor/fonts`) y no en la Black; (g) rejilla más fina y paredes claras. Está en el motor: vale para todo reel nuevo.
17. **El vídeo final se renderiza en Blender (04-11-2026).** Jaime: «definitivamente tenemos algo mal… creo que es algo crítico el motor que hay por debajo» y, tras la prueba (`blender/LEEME.md`): «vamos. aprobar esta noche uno bueno completo con blender. pero hay que tener el guion perfecto, no puede haber errores». Flujo híbrido:
    (a) **previas** con el motor del navegador (rápido) para guion, tiempos, encuadres e inspectores;
    (b) **vídeo final** en tres capas: `node blender/exportar.js reels/ID` (suelo/fondo y titulares/iconos de nuestro motor, y la posición de cada objeto por fotograma) → `/root/blender-venv/bin/python blender/render.py reels/ID [desde hasta 720 8]` (Cycles + líneas Freestyle en el protagonista y los objetos, sombras de contacto, exposición −0,9; se puede cortar y relanzar) → `node blender/montar.js reels/ID` (capas + voz y efectos) → `out/ID-blender.mp4`;
    (c) ~14 s por fotograma a 720x1280 en esta máquina: ≈ 7 h un reel de 60 s, en tandas de ≤ 2 h; las capas generadas (`reels/*/blender/`) no van a git;
    (d) **guion cerrado antes del render**: lector en frío, guionista contra el molde y prueba de comprensión, y se aplica todo lo que marquen (N1, 04-11: coste concreto, giro «casi todos la usan un día y la olvidan», recompensa con puente, concordancias).
    Instalación en una sesión nueva: `python3 -m venv /root/blender-venv && /root/blender-venv/bin/pip install bpy==5.2.3`.

18. **Sin rótulos pequeños: lo que introduce una cita lo dice la voz y va en el titular (05-11-2026).** Jaime, sobre N1: «hay subtítulos arriba a la izquierda muchas veces que deberían ser también parte de la voz, ¿no?, ejemplo "Te dices", "Estás pensando"… y no deberían salir arriba a la izquierda con ese formato tan raro». Corrige la regla 13: ya no hay rótulo «Estás pensando:» en letra pequeña. La frase entera va en `show` («Te dices: «Solo cinco minutos. Luego paro.»», «Piensas: «…»») y la voz la dice; la objeción se marca con `objecion: true` (fondo oscuro, nube con «?»). El motor ya no dibuja el campo `voice`.
    Además (N1, 05-11): el inspector avisa de **cabezas apiladas** (una cabeza de la multitud justo detrás de la del protagonista ≥ 0,3 s); se arregla quitando esa figura con `drop` o apartando al protagonista.

19. **Cara nueva del protagonista (06-11-2026).** Jaime: «¿se puede mejorar los detalles? ejemplo, la cara de las figuras, ahora solo tienen un punto y media boca»; vista la prueba en Blender: «cara nueva sí». Dos ojos ovalados en tres cuartos y sonrisa ancha con puntas redondas (`"cara": "v2"` en `reel.json`; todo reel nuevo la lleva). El azul de la otra marca se probó y se descartó («olvidamos lo del azul»): el amarillo sigue.

20. **Reels de 30 segundos con bucles abiertos (06-11-2026).** Jaime: «de cara al futuro, vamos a trabajar con reels más cortitos… objetivo: 30 segundos… tener clarísima la metodología de generar vídeos de open loop para generar adicción y asegurar que todos son adictivos, que tenemos buenos hooks». Norma: `docs/METODO-30S.md` (28-32 s, máx. 35; 11-13 frases; 60-75 palabras; bucles anidados y al menos 3 reenganches de tipos distintos, uno cada 5-7 s; mapa de bucles sin huecos; gancho cerrado después del 70 %; laboratorio de 8 ganchos con 3 evaluadores y 3 al elegir). Sustituye la duración y el molde de 8 bloques de `SISTEMA-3D.md` §1. Motivo añadido: un render de Blender de 30 s es la mitad que uno de 60 s, y se hace una sola vez, con todo cerrado. Jaime: «no vamos a rehacer el vídeo que ya tenemos»: N1 se queda en 61 s; el método vale para los guiones nuevos.

21. **Publicar (08-11-2026).** La cuenta es **@fase.zer0** (página de Facebook «Fase Zero»), token `META_PAGE_TOKEN_3D`. Jaime: «publica en fasezero». Se publica con `python3 herramientas/publicar.py reels/ID --texto "…" [--url URL] --publicar` (sin `--publicar`, simulacro). La subida directa (rupload) dio `ProcessingFailedError` con N1; salió por URL pública: el MP4 re-codificado se sube a `publicados/ID.mp4` de esta rama (la repo es pública) y se pasa con `--url` (raw.githubusercontent.com). Queda en `publicados.jsonl`.
    Voz de la marca: ElevenLabs `eleven_v3`, voz `qUPtETgSYRhCRb2pfOla`, una toma por reel (`herramientas/voz_eleven.py`, corta cada frase por el silencio real). **N1 se publicó el 08-11 y Jaime lo borró ese mismo día** (regla 22).

22. **Zonas seguras de Instagram (08-11-2026).** Jaime borró N1 de @fase.zer0 («había muchos errores. Para empezar, no se respetan los márgenes o zonas de seguridad superiores para subtítulos»): el titular empezaba en y ≈ 33 px, debajo de la cabecera de Reels. Ahora el motor lo coloca desde **y 250** (`SAFE_TOP`), y la escena vive entre el titular (≈ y 680 como mucho) y **y 1550** (`SAFE_BOTTOM`: abajo tapan el texto del post y el usuario). `inspeccionar.js` da aviso si el titular o un objeto entra por encima de 250, si un cuerpo baja de 1550 o si el titular pasa de y 680; `inspeccionar_px.js`, si algo pisa el titular. Cada escena se encuadra para ese hueco.

## Pendiente de Jaime

- Cómo se reparte el tope mensual de ElevenLabs con ViralClips si es la misma clave.
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
- **Desde la regla 14 (N1):** personajes con acciones (`moves`: `arm` en grados, `phone`, `tilt` y `y` para tumbarse, `lean`, `hop`, `face` del interlocutor, y andar con balanceo cuando cambia `at`); objetos nuevos `sofa`, `wall` (blanca; `gray: true` para gris), `wallclock` (agujas con `spin`), `battery` (pila con `levels`), `receipt` (recibo con `checkAt`), `papers` (folios con `left`), `floorring` (aro en el suelo) y pegatinas `phone` y `page`; titular de 142 px (3 líneas a 116 px si no cabe en 2); niebla para que no se vea el horizonte. `inspeccionar.js` mide la variedad en los reels con `storyboard.md`: ≥ 5 decorados, ≤ 2 s sin nada nuevo y encuadre ocupado (mediana ≥ 15 % a 180x320; la referencia da 16-36 %, N6 14 %; N1, 20 % tras cambiar las paredes grises, que inflaban la medida, por gente).
- **Vida como la referencia (04-11, revisión de R2 y R5):** la multitud se mueve un poco (gira y rebota), los protagonistas nunca están congelados (respiran y mueven la cabeza), `glow: true` en `moves` pone el contorno amarillo para señalar a alguien («find the connector»), y el temporizador es un disco blanco con contorno, anillo grueso y cifra grande. Cada decorado lleva gente de fondo en vez de paredes vacías.
- Kokoro no viene instalado en una sesión nueva: `python3 -m venv /root/kokoro-venv && /root/kokoro-venv/bin/pip install kokoro-onnx soundfile` y los dos ficheros de `model-files-v1.0` (github.com/thewh1teagle/kokoro-onnx) en `~/.cache/hyperframes/tts/models` y `voices`.
- Falta: voz (Kokoro y ElevenLabs con tiempos por palabra → `timing.json`), sonido (cama y SFX), publicador,
  revisiones automáticas (`docs/SISTEMA-3D.md` §5), letras gigantes extruidas y más objetos.
