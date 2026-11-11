# Cadena automática: producir, revisar, iterar, OK de voz y publicar 2 veces al día (11-11-2026)

Jaime: «Necesitamos generar un sistema automatizado que permita generar videos, revisarlos, iterarlos, dar el ok a la
voz de pago, y publicar 2x diaria de forma automatizada». Esto es la cadena. Las reglas de CLAUDE.md siguen mandando:
la voz de pago y la publicación solo salen con una orden explícita de Jaime, y nada llega a Jaime sin los dos
inspectores en verde.

## Las tres piezas

| Pieza | Dónde corre | Qué hace |
|---|---|---|
| **Sesión programada** (rutina de Claude Code, 2 al día) | nube de claude.ai | Lo creativo: corrige lo que Jaime pidió (`/cambios`), escribe el siguiente reel de una idea aprobada (guion + escena), pasa los inspectores, mira la tira fotograma a fotograma y propone ideas cuando se acaban. Empuja a `main`. |
| **GitHub Actions** (`.github/workflows/`) | GitHub, gratis (repo público) | Lo mecánico y determinista: voz Kokoro, render, inspectores, subir el vídeo, comentar en la issue, voz de pago tras `/ok-voz`, publicación. |
| **Issues de GitHub** | el móvil de Jaime | Una issue por reel. Cada versión llega como comentario con el vídeo y la tira a 1 fps. Jaime responde con una orden. |

## Recorrido de un reel

```
idea aprobada ──sesión──▶ guion ──Action──▶ previa (Kokoro) ──/ok-voz──▶ voz_ok ──Action──▶ final (ElevenLabs)
                            ▲                    │                                            │
                            │               /cambios texto                              /publicar
                            └──sesión── cambios ◀┘          (con /ok-todo, la final entra sola en la cola si pasa)
                                                                                              ▼
                     fallo (inspector en rojo) ──sesión──▶ guion            aprobado ──Action 13:00/20:00──▶ publicado
```

- **guion**: la sesión deja `reel.json` + `shots3d.js` con los inspectores en verde (tiempos simulados o Kokoro) y lo
  empuja. El push dispara `produccion.yml`.
- **previa**: `produccion.yml` genera la voz Kokoro, vuelve a pasar los dos inspectores con los tiempos reales,
  renderiza, sube `ID-vN-previa.mp4` y `ID-vN-tira.jpg` a la release `reel-ID`, y comenta en la issue del reel (la crea
  la primera vez) con: enlace al vídeo, tira a 1 fps, **caracteres de voz de pago que costará y lo que queda del mes**,
  pie de la publicación y guion. Si un inspector falla, el reel pasa a **fallo** y no se le enseña a Jaime como previa.
- **/ok-voz**: `ordenes.yml` genera la voz de ElevenLabs (tiempos reales por palabra), reconstruye, pasa los
  inspectores, renderiza la **final** y la comenta. La voz pagada se guarda en la release; si después hay que tocar
  solo la escena, no se vuelve a pagar (se reutiliza mientras el texto no cambie).
- **/publicar**: la final entra en la **cola**. `publicar.yml` publica el aprobado más antiguo en cada franja
  (13:00 y 20:00, hora de Madrid; `pipeline.json`). Comenta el enlace y cierra la issue.
- **/cambios texto**: la siguiente sesión programada lo lee de `estado.json`, lo corrige y lo devuelve a `guion`; sale
  una previa nueva (v+1) en la misma issue.

### Órdenes (solo cuentan las del dueño del repo; se escriben al principio del comentario)

| En la issue de un reel | Efecto |
|---|---|
| `/ok-voz` | Aprueba la previa y el gasto de caracteres indicado. Sale la final. |
| `/ok-todo` | Igual, y la final entra en la cola sin volver a preguntar si pasa los inspectores. |
| `/publicar` | La final entra en la cola. |
| `/cambios <qué cambiar>` | Iteración: nueva previa en la próxima sesión. |
| `/descartar`, `/pausar`, `/reanudar` | Lo que dicen. |

| En la issue de ideas | Efecto |
|---|---|
| `/ok N7 N9` | Aprueba esas ideas: la sesión las produce por orden. |
| `/no N8` | Las descarta. |

## Ritmo: 2 al día

- La sesión programada corre 2 veces al día y produce **un reel por sesión** (más los arreglos pendientes): 2 al día.
- Freno: no produce si hay `max_en_curso` (4) reels esperando a Jaime o `colchon_aprobados` (6) en cola
  (`pipeline.json`). Así no se acumulan previas sin ver.
- Si hay menos de 4 ideas aprobadas sin producir y ninguna propuesta pendiente, propone ideas nuevas (archivo
  `docs/IDEAS-<fecha>.md` + `ideas.json`); `produccion.yml` abre la issue de ideas.
- Si la cola se vacía, la franja se salta (no se publica nada viejo ni sin OK).

## Archivos

- `pipeline.json`: franjas, zona, frenos, voz Kokoro por defecto, ajustes de ElevenLabs e Instagram, plantilla del pie.
- `ideas.json`: registro de ideas (`propuesta | aprobada | descartada | sustituida`, y `reel` cuando se produce).
- `reels/ID/estado.json`: estado, versión, historial, issue, cambios pedidos, previa, final, publicación.
- `reels/ID/reel.json`: además del guion, `caption` (pie de Instagram, castellano de España, sin cifras inventadas).
- `docs/PANEL.md`: tabla de todo, se regenera en cada paso.
- `herramientas/pipeline.py` (la máquina de estados), `herramientas/voz_eleven.py`, `herramientas/instagram.py`.

## Lo que necesita Jaime (una vez)

En GitHub → Settings → Secrets and variables → Actions → *New repository secret*:

| Secreto | Para qué |
|---|---|
| `ELEVENLABS_API_KEY` | voz de pago (y la cifra de cuota en cada previa) |
| `ELEVEN_VOICE_ID` | la voz de esta marca |
| `IG_TOKEN` | token de larga duración con `instagram_content_publish` |
| `IG_USER_ID` | id de la cuenta profesional de Instagram |

Si el token viene del inicio de sesión de Instagram (no de Facebook), cambiar `instagram.host` a `graph.instagram.com`
en `pipeline.json`. Los tokens de usuario caducan a los 60 días: si falla la publicación, el error llega a la issue.

## Prompt de la sesión programada

```
Eres la sesión programada de reels-3d. Lee CLAUDE.md, docs/PIPELINE.md, docs/SISTEMA-3D.md y docs/CLARIDAD.md.
Trabaja directamente en la rama main y empuja a main (permiso de Jaime para esta tarea, 11-11-2026).
Ejecuta `python3 herramientas/pipeline.py producir` y haz, en este orden:
1. «arreglar»: para cada reel en cambios o fallo, lee lo pedido (estado.json → cambios, o la nota del fallo),
   corrígelo en reel.json/shots3d.js, construye (`motor/build.py`, con --sim si no hay voz), deja los dos inspectores
   en ok, saca la tira a 1 fps y mírala fotograma a fotograma; luego
   `QUIEN=sesion python3 herramientas/pipeline.py pasar ID guion "qué has cambiado"`, commit y push.
2. «producir»: para la idea indicada, escribe reels/<ID>/reel.json (con `caption`) y shots3d.js pulso a pulso sobre
   su reel de referencia, con la revisión de castellano de siempre; inspectores en ok y tira revisada; pon
   `"reel": "<ID>"` en su entrada de ideas.json; `pasar ID guion`; commit y push.
3. «proponer_ideas»: si es true, escribe docs/IDEAS-<fecha>.md con 4-6 ideas al molde de SISTEMA-3D §1 (cada una
   sobre un reel de referencia) y añádelas a ideas.json en estado «propuesta» con id nuevo, título y resumen; push.
Nunca gastes voz de pago, publiques, apruebes ideas ni cambies un estado salvo a «guion». Si algo no sale en verde,
no lo empujes como guion: deja una nota en estado.json y termina. Acaba con un resumen de tres líneas.
```

## Lo que no está comprobado todavía

- Que los workflows corren en GitHub (se probaron los scripts en una sesión, no en Actions).
- La subida a Instagram y la voz de ElevenLabs: el código sigue la documentación de ambas API, pero sin claves no se
  ha podido llamar a ninguna. La primera publicación conviene lanzarla a mano (`publicar.yml` → *Run workflow* → ya).
