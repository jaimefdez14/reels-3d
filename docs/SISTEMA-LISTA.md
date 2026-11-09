# Sistema del estilo B («listas en negro»): molde de guion, lenguaje visual y motor (09-11-2026)

Base: `docs/ANALISIS-REFERENCIA-B.md` (cinco reels de referencia B-R1…B-R5, guiones transcritos de la voz, escena por
escena). Este documento dice **cómo se escribe y se construye un reel nuevo** de este estilo. El estilo A (3D de
rejilla, `SISTEMA-3D.md`) sigue existiendo; no se mezclan en un mismo reel.

## 1. Molde de guion

Lista numerada de **3, 4 o 5 puntos**, 45-60 s, **130-170 palabras**, voz a ~160 ppm.

| # | Bloque | Fórmula en castellano | Escena |
|---|---|---|---|
| 0 | Gancho: número + promesa grande | «Cuatro reglas para que tu sueldo *dure todo el mes.*» · «Cinco leyes que te ahorran años de errores en el trabajo.» · «Tres pasos para que…» | Muñeco + el objeto del tema (pila de monedas, reloj, anillo); algo se dibuja o se transforma en la palabra amarilla |
| 1 | (Opcional) anuncio | «Y puedes empezar *hoy mismo.*» | Aparece el indicador de progreso |
| 2…n | Punto: «Número dos: // *nombre.*» | Nombre de 2-4 palabras en imperativo (*Págate primero. Espera dos días.*) o una ley con nombre propio (*la ley de Parkinson*) | Moneda del número sola en el centro (0,7-1,2 s) |
| · | Instrucción con dosis | «El día que cobras, aparta una parte antes de pagar nada.» Una medida pequeña: cinco minutos, dos días, una parte | El muñeco **hace** la instrucción con un objeto |
| · | Voz interior o ejemplo | «Hoy tu cabeza dice: *«Me lo merezco».*» | Objeto que aparece (corazón, maraña, bocadillo) |
| · | Golpe del punto | Frase corta y seca, a veces con humor: «Hasta el mes que viene.» «Dos días después, ya no te lo mereces tanto.» «Dale menos tiempo y acabará antes.» | El objeto cambia de estado (se apaga, se cierra, se alisa, se rellena) |
| fin | Cierre | Guardar: «Guárdalo para el día que cobres.» · Comentar: «¿Cuál de las cinco te ha pasado esta semana?» · Seguir: «Y sígueme para más.» | Resumen visual (tarjetas 1-n con nombre + marcapáginas, o las n monedas) e icono de seguir |

Reglas de escritura:
- Segunda persona, imperativo, presente. Frases de 3-10 palabras; subtítulos de ≤ 32 caracteres por línea.
- **Cada punto cabe en 7-12 s** y se entiende solo. No hay objeción ni escena de recompensa: la tensión es la lista.
- **Una dosis concreta por punto** (cinco minutos, dos días, una parte), escrita en letra. No son estadísticas: no se
  usan porcentajes inventados ni «según un estudio» (regla 3).
- **Humor seco una o dos veces**, siempre como golpe final de un punto.
- La voz interior va entre comillas (regla 3: la frase literal que el espectador reconoce).
- Leyes y efectos con nombre propio se pueden citar (Parkinson, Pareto…): son conocimiento común, no fuentes.

## 2. Marcado del guion (`reel.json`)

```json
{ "show": "Número uno: // *págate primero.*", "pause": 0.3, "pausa_media": 0.7 }
```
- ` / ` separa subtítulos (lo que se ve junto). ` // ` separa subtítulos **y** mete una pausa en la voz
  (`pausa_media`, 0,7 s tras el número: es el tiempo de la moneda).
- `*texto*` va en amarillo; si va al final, en su propia línea (estilo «dos líneas» de B-R1/B-R2).
- `pause`: silencio tras la frase (0,25-0,35 dentro de un punto, 0,5-0,55 al acabar un punto).

## 3. Lenguaje visual (fijo)

- Fondo: `negro` (B-R1/R2), `degradado` (B-R3) o `grafito` con viñeta (B-R4/R5). Un fondo por reel.
- Un solo acento: **amarillo** `#e6ce46` (degradado `#f4d955` → `#c69f25`). Sin rojo.
- Subtítulo Inter: estilo `dos` (blanco Regular + amarillo Medium, 54/60 px a 1080) o `una` (blanco SemiBold 50 px).
  Centrado en y ≈ 650-700. Palabra a palabra, fundido + desenfoque de 8 px + subida de 8 px en 0,2 s.
- Indicador: `puntos`, `linea` (unidos, el actual con aro) o `barras` (verticales), en y ≈ 360-380.
- Muñeco: cabeza esfera amarilla (con cara opcional), torso cápsula amarilla, piernas y brazos de palito blanco
  (el de detrás, gris); 500 px de alto; suelo en y = 1330 con reflejo al 20 %.
- Secundarios: gris con cabeza blanca. Objetos: sólidos amarillos (lo importante) o de línea verde-gris (contexto).
- Cámara: plano lateral; acercamiento lento 1,00 → 1,04-1,07 por punto; se recoloca a oscuras en cada número.

## 4. Transición de número (la firma del estilo)

`E.numero(n, T, S, { desde, hacia })`: en `T` («Número…») la escena se oscurece al 20 %; el objeto `desde`
(amarillo) **se queda encendido** y se transforma en la moneda «n» que viaja al centro (si no hay `desde`, cae el
punto del indicador); la moneda espera; en `S` (el nombre del punto) vuela hasta el objeto `hacia` de la escena nueva
y se funde con él (o se encoge), mientras la escena nueva se aclara. El objeto `desde` lleva `sobrevive: true`.
Regla: **el último objeto amarillo de un punto es el `desde` del siguiente**: así el ojo nunca pierde el hilo.

## 5. Motor (`motor2d/`)

- `motor2d/engine2d.js`: canvas 2D determinista a 1080×1920. Mismo contrato que el motor 3D (`window.seek`,
  `inspect`, `inspectPixels`, `soundEvents`), así que valen `motor/render.js`, `herramientas/frames.js`, los dos
  inspectores y `herramientas/sonido.py`.
- `motor2d/build.py reels/ID [--sim]` → `reels/ID/composition/index.html` a partir de `reel.json`, `escena.js` y
  `timing.json`.
- Voz: `python3 herramientas/voz.py reels/ID --velocidad 1.1` (Kokoro, `em_alex`), entiende ` / `, ` // ` y `*`.
- API de la escena (`reels/ID/escena.js`):
  - `E.config({fondo, sub, subY, cursiva, progreso: {n, estilo, aparece, gap, y}})`
  - `E.camara([[t, [x, y, zoom], ease], …])`
  - `E.figura(id, {t0, t1, x, dir, color: 'am'|'gris'|'claro', colorK, cara, sonrisa, poses: [[t, 'pose'|{…}|'andar'], …], toca: [ids]})`
    Poses: `de_pie, senalar, ofrecer, coger, meter, levantar, encoger, pensar, triste, celebrar, escribir, sentado,
    manos_cabeza, apartarse, andar` (o un objeto con ángulos `lean, hf, kf, hb, kb, sf, ef, sb, eb, cab, sit`).
  - `E.obj(id, tipo, {t0, t1, x, y, s, a, rot, luz, pop, capa, refl, caja, sobrevive, libre, rodea, …})`.
    Tipos: `moneda, bola, anillo, arcoAbierto, temporizador, relojAm, bocadillo, lista, tarro, pila, compra, corazon,
    dias, resumen, seguir, rotulo, barra, cuadricula, maraña, escritorio, papeles, flecha`.
    Cualquier parámetro admite fotogramas clave `[[t, valor, ease], …]`. **`x, y, s, a, rot, luz` son generales**:
    un parámetro propio de un tipo no puede llamarse así.
  - `E.numero(n, T, S, {desde, hacia})`; `E.w(frase, palabra)` y `E.wf(…)` dan los tiempos de la voz.
- Comprobación (igual que siempre, regla de revisión): `inspeccionar.js` y `inspeccionar_px.js` en verde, y tira a
  1 fps mirada entera. En el estilo B el subtítulo puede bajar hasta y = 800 (el inspector lo sabe por `capMax`).

## 6. Choques con las reglas de `CLAUDE.md` que decide Jaime

1. **Regla 2 (inspiración literal de R1-R5):** este estilo es una segunda línea con su propia referencia. Propuesta:
   las dos conviven, cada reel declara su estilo.
2. **Regla 3 (sin cifras):** la referencia usa dosis en número (*30 minutes, 20 hours, 90%*). Propuesta: dosis sí y
   escritas en letra («cinco minutos»), porcentajes y estadísticas no.
3. **Regla 3 (frase literal entrecomillada):** en las listas la frase entrecomillada es la voz interior («Me lo
   merezco»), no una frase que decir a otro. Propuesta: vale como frase literal.
4. **Duración:** 45-60 s, igual que el estilo A.
