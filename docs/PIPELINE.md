# Cadena automática de @fase.zer0: producir, revisar, iterar, OK de voz y publicar 2 veces al día (11-11-2026)

Jaime: «Necesitamos generar un sistema automatizado que permita generar videos, revisarlos, iterarlos, dar el ok a la
voz de pago, y publicar 2x diaria de forma automatizada». Solo estilo B (muñeco amarillo, listas en negro; regla 25).
Las reglas de CLAUDE.md siguen mandando: la voz de pago y la publicación solo salen con una orden explícita de Jaime,
y nada le llega sin `redaccion.py` y los dos inspectores en verde.

## Las tres piezas

| Pieza | Dónde corre | Qué hace |
|---|---|---|
| **Sesión programada** (rutina de Claude Code, 2 al día) | nube de claude.ai | Lo creativo: corrige lo que Jaime pidió (`/cambios`), escribe el siguiente reel de una idea aprobada (situación, guion, corrector nativo, lector en frío, escena), mira la tira fotograma a fotograma y propone ideas cuando se acaban. Empuja a `main`. |
| **GitHub Actions** (`.github/workflows/`) | GitHub, gratis (repo público) | Lo mecánico: `redaccion.py`, voz Kokoro, inspectores, render, subir el vídeo, comentar en la issue, voz de ElevenLabs tras `/ok-voz`, publicación con `herramientas/publicar.py`. |
| **Issues de GitHub** | el móvil de Jaime | Una issue por reel. Cada versión llega como comentario con el vídeo y la tira a 1 fps. Jaime responde con una orden. |

## Recorrido de un reel

```
idea aprobada ──sesión──▶ guion ──Action──▶ previa (Kokoro) ──/ok-voz──▶ voz_ok ──Action──▶ final (ElevenLabs)
                            ▲                    │                                            │
                            │               /cambios texto                              /publicar
                            └──sesión── cambios ◀┘          (con /ok-todo, la final entra sola en la cola si pasa)
                                                                                              ▼
           fallo (redacción o inspector en rojo) ──sesión──▶ guion     aprobado ──Action 13:00/20:00──▶ publicado
```

- **guion**: la sesión deja `reel.json` + `escena.js` (con `texto_publicacion`) tras el flujo de las reglas 17-20 y 23,
  con `redaccion.py` y los inspectores en verde, y lo empuja. El push dispara `produccion.yml`.
- **previa**: `produccion.yml` repite `redaccion.py`, genera la voz Kokoro, vuelve a pasar los dos inspectores,
  renderiza (con efectos, regla 21), sube `ID-vN-previa.mp4` y `ID-vN-tira.jpg` a la release `reel-ID` y comenta en
  la issue del reel (la crea la primera vez): vídeo, tira, **caracteres de ElevenLabs que costará** (sin contar las
  tomas ya pagadas), texto de la publicación y guion. Si algo falla, pasa a **fallo** y no se enseña.
- **/ok-voz**: `ordenes.yml` genera la voz con `voz.py --eleven eEyWolF7iBpMA65GbtAm` (tiempos reales por palabra),
  guarda las tomas pagadas en la release (no se pagan dos veces), reconstruye, pasa los inspectores, renderiza la
  **final** ya re-codificada como L1 y L2, y la comenta. Ese archivo es exactamente el que se publica.
- **/publicar**: la final entra en la **cola**. `publicar.yml` publica el aprobado más antiguo en cada franja
  (13:00 y 20:00, hora de Madrid; `pipeline.json`) con `herramientas/publicar.py` y `META_PAGE_TOKEN_3D`: primero
  con la URL de la release; si Instagram no la acepta, como con L1 y L2 (MP4 en `publicados/` y URL de
  raw.githubusercontent.com). Comenta el enlace, cierra la issue y apunta en `publicados.jsonl`.
- **/cambios texto**: la siguiente sesión programada lo corrige y lo devuelve a `guion`; sale una previa v+1.
  Lo que Jaime apruebe palabra a palabra se usa tal cual (regla 23).

### Órdenes (solo cuentan las de Jaime; al principio del comentario)

| En la issue de un reel | Efecto |
|---|---|
| `/ok-voz` | Aprueba la previa y el gasto de caracteres indicado. Sale la final. |
| `/ok-todo` | Igual, y la final entra en la cola sin volver a preguntar si pasa los inspectores. |
| `/publicar` | La final entra en la cola. |
| `/cambios <qué cambiar>` | Iteración: nueva previa en la próxima sesión. |
| `/descartar`, `/pausar`, `/reanudar` | Lo que dicen. |

| En la issue de ideas | Efecto |
|---|---|
| `/ok L6 L8` | Aprueba esas ideas: la sesión las produce por orden. |
| `/no L7` | Las descarta. |

## Ritmo: 2 al día

- La sesión programada corre 2 veces al día y produce **un reel por sesión** (más los arreglos pendientes).
- Freno: no produce si hay 4 reels esperando a Jaime o 6 aprobados en cola (`pipeline.json`).
- Si quedan menos de 4 ideas aprobadas sin producir y ninguna propuesta pendiente, propone ideas nuevas
  (`docs/IDEAS-<fecha>.md` + `ideas.json`); `produccion.yml` abre la issue de ideas.
- Si la cola está vacía, la franja se salta: nunca se publica nada sin OK.

## Archivos

- `pipeline.json`: cuenta, franjas, zona, frenos, voces (Kokoro 1,1; ElevenLabs `eEyWolF7iBpMA65GbtAm`).
- `ideas.json`: ideas (`propuesta | aprobada | descartada`, y `reel` cuando se produce).
- `reels/ID/estado.json`: estado, versión, historial, issue, cambios pedidos, previa, final, publicación.
- `reels/ID/reel.json` → `texto_publicacion`: el texto de Instagram (como el de L1 y L2: situación + promesa + 3 hashtags).
- `docs/PANEL.md`: tabla de todo, se regenera en cada paso.
- `herramientas/pipeline.py`: la máquina de estados (usa `voz.py`, `motor2d/build.py`, `render.js`, `publicar.py`).

## Lo que necesita Jaime (una vez)

1. Fusionar esta rama con `main` (los workflows y la sesión programada trabajan sobre `main`). `main` sigue en el 3D
   del 04-11: la rama de fase.zer0 (`claude/stoic-gates-vc70x6`) va dentro de esta.
2. GitHub → Settings → Secrets and variables → Actions → *New repository secret*: `ELEVENLABS_API_KEY` y
   `META_PAGE_TOKEN_3D` (los mismos que ya usa esta marca; nunca los de crecimiento.ai).
3. OK para crear la sesión programada con el prompt de abajo.

## Prompt de la sesión programada

```
Eres la sesión programada de @fase.zer0 (repo reels-3d). Lee CLAUDE.md, docs/PIPELINE.md, docs/SISTEMA-LISTA.md,
docs/REDACCION.md y docs/CASTELLANO.md. Solo estilo B (regla 25). Nada de crecimiento.ai (regla 26).
Trabaja directamente en la rama main y empuja a main (permiso de Jaime para esta tarea, 11-11-2026).
Ejecuta `python3 herramientas/pipeline.py producir` y haz, en este orden:
1. «arreglar»: para cada reel en cambios o fallo, lee lo pedido (estado.json → cambios, o la nota del fallo) y
   corrígelo en reel.json/escena.js. Si cambia el texto: redaccion.py, corrector nativo y lector en frío como manda
   CLAUDE.md (lo que Jaime aprobó palabra a palabra no se toca). Construye con `python3 motor2d/build.py reels/ID`
   (--sim si no hay voz), deja los dos inspectores en ok, saca la tira a 1 fps y mírala fotograma a fotograma; luego
   `QUIEN=sesion python3 herramientas/pipeline.py pasar ID guion "qué has cambiado"`, commit y push.
2. «producir»: para la idea indicada, crea reels/<ID> con el flujo completo de las reglas 14-20 y 23 (situación,
   guion, redaccion.py, corrector, lector, escena satisfying, bocadillos) y `texto_publicacion`; inspectores en ok y
   tira revisada; pon `"reel": "<ID>"` en su entrada de ideas.json; `pasar ID guion`; commit y push.
3. «proponer_ideas»: si es true, escribe docs/IDEAS-<fecha>.md con 4-6 ideas del estilo B (cada una sobre un reel de
   referencia B-R1..B-R5) y añádelas a ideas.json en estado «propuesta» con id nuevo, título y resumen; push.
Nunca gastes voz de pago, publiques, apruebes ideas ni cambies un estado salvo a «guion». Si algo no sale en verde,
no lo empujes como guion: deja una nota en estado.json y termina. Acaba con un resumen de tres líneas.
```

## Lo que no está comprobado todavía

- Que los workflows corran en GitHub (los scripts se probaron en una sesión: previa de L4 entera con Kokoro).
- La voz de ElevenLabs y la publicación desde Actions: el código reutiliza `voz.py --eleven` y `publicar.py`, que ya
  funcionaron con L1 y L2, pero desde la cadena no se han lanzado. La primera publicación conviene lanzarla a mano
  (`publicar.yml` → *Run workflow* → ya) con un reel ya aprobado.
- Que Instagram acepte la URL de la release (si no, la cadena usa la vía de raw.githubusercontent.com de L1 y L2).
