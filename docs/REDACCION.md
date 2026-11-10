# Redacción: la estructura de las listas (estilo B) escrita para que se narre bien

Jaime (09-11-2026): «mantén tu estructura de los 5 ejemplos que hemos visto de stickman, pero vamos a aplicar esto para
lo que tiene que ver con la redacción, guionización y narrativa… mézclalo con la forma de estructura desarrollada en
los 5 ejemplos, no solo esto. Lo mejor de ambos». Los cinco ejemplos son B-R1…B-R5 (`ANALISIS-REFERENCIA-B.md`);
«esto» es su guía de redacción para guiones en castellano que se narran bien. Regla 17 de `CLAUDE.md`.

**Cómo se reparten el trabajo:**
- **La estructura la manda la referencia** (`SISTEMA-LISTA.md` §1): gancho con número y promesa, lista de 3-5 puntos,
  cada punto con nombre → instrucción con dosis → voz interior o ejemplo → golpe seco, transición de número y cierre
  con el resumen visual. El muñeco hace lo que dice la voz.
- **Cada frase la manda la guía**: orden de las palabras, ritmo, hilo, calcos, tiempos, puntuación para la voz y
  registro de Madrid. `CASTELLANO.md` (regla 16) sigue valiendo: es la lista de calcos de este estilo.
- Donde chocan, §8.

## 0. Flujo (reglas 17-20, en este orden)

1. **Situación primero** (regla 19): contar la escena como se la contarías a un amigo en un bar de Madrid («cobras el
   28 y el 15 ya vas justo»). Las frases salen de ahí, nunca del nombre inglés de la técnica (*pay yourself first*,
   *ugly minutes*, *bring solutions*): si la idea tiene nombre inglés, se busca cómo lo dice la gente aquí, no cómo se
   traduce.
2. Guion con este documento. **La voz solo narra**; lo que dice o piensa un personaje va en `bocadillo` (regla 20).
3. `python3 herramientas/redaccion.py reels/ID` → `ok`.
4. **Corrector nativo** (`herramientas/corrector.py`, agente nuevo): se aplica su versión de cada frase marcada; se
   repite con otro corrector hasta que no marque nada. Calcos nuevos → `CASTELLANO.md`.
5. **Lector en frío** (`herramientas/lector.py`, agente nuevo): 8 o más y sin frases bloqueantes.
6. Guion en texto a Jaime. Después, voz, escena y render.

## 1. Antes de escribir una sola frase

1. **La idea en una frase de 12 palabras como mucho.** «El sueldo llega a fin de mes si te pagas tú primero.» Si no
   sale, aún no se sabe qué se cuenta.
2. **A quién:** una persona de Madrid de 30 años, lista, que no sabe nada del tema y está a punto de pasar al siguiente.
3. **El reel de referencia cuyo pulso se copia** (B-R1 identidad, B-R2 rutina, B-R3 pasos, B-R4 metáforas, B-R5 leyes)
   y el objeto amarillo que hila un punto con el siguiente.
4. **Escribir el guion entero como un monólogo seguido**, en un párrafo, sin pensar en subtítulos ni escenas.
5. **Leerlo en voz alta, de pie y de corrido.** Donde te trabes, falta una coma o sobra una palabra; donde te aburras,
   sobra la frase entera.
6. Solo entonces se marca para el motor (` / `, ` // `, `*amarillo*`, §6) y se hace la escena.

## 2. El molde de las listas, escrito con la guía

| Bloque | Qué hace la frase (guía) | Ejemplo |
|---|---|---|
| **Gancho**: número + promesa | ≤ 3,5 s, sujeto y verbo, se entiende solo, abre una pregunta y no cuenta el final; la promesa, al final y en amarillo | «Cuatro reglas para que el sueldo *te llegue a fin de mes.*» |
| **Anuncio** (opcional) | Un bucle abierto que se cierra hacia la mitad | «Y la tercera es *la que más cuesta.*» |
| **Número + nombre** | «Número uno: // *nombre.*» El nombre en imperativo, 2-5 palabras, lo nuevo al final | «Número dos: // *pon fecha y cúmplela.*» |
| **Instrucción con dosis** | Sujeto que hace algo concreto; la dosis al final («cinco minutos», «dos días», «una parte») | «El día que cobras, aparta una parte *antes de pagar nada.*» |
| **Voz interior o ejemplo** | Frase literal entre comillas, la que el espectador se dice; retoma la instrucción | «Hoy piensas: *«Me lo merezco».*» |
| **Golpe del punto** | Remate corto pegado a la frase anterior, con humor seco una o dos veces por reel | «Dos días después, *ya no te lo mereces tanto.*» |
| **«Por eso»** | Cuando una consecuencia lo pide, dentro de un punto: la que el espectador reconoce («¡anda, es verdad!»). Nunca metido a la fuerza: si la frase anterior no lo causa, sobra (error de L5, 09-11) | «Por eso, a lo que calcules, *súmale la mitad.*» |
| **Giro hacia la mitad** | El punto del medio cierra el anuncio o lleva «Lo curioso:» / «Y lo que más pesa no es X: es Y» | «Lo curioso: *a veces es más de lo que ibas a pedir.*» |
| **Remate** | ≤ 10 palabras que vuelven al gancho; dos mitades con dos puntos o punto y coma | «No es pereza: *la tarea era demasiado grande.*» |
| **Envío** | Una persona que se reconoce en un segundo. Sustituye a «sígueme» y a la pregunta a comentarios | «Mándaselo a quien dice *«mañana lo hago».*» |

**El hilo en una lista.** Entre puntos, el hilo lo pone la imagen (el objeto amarillo se convierte en la moneda del
número siguiente) y la voz dice «Número dos». **Dentro de cada punto**, cada frase retoma la anterior: la instrucción
retoma el nombre, la voz interior retoma la instrucción, el golpe retoma la voz interior. La prueba del hilo se hace
punto a punto: si dos frases de un mismo punto se pueden cambiar de orden sin que se note, no están hiladas.

Ganchos válidos: número + promesa (el de la referencia), y dentro de él los tipos de la guía: **tuyo** («…para que el
sueldo te llegue»), **creencia** («Cinco leyes que nadie te explica…»), **lección**. No valen: «Hoy te voy a contar…»,
«¿Sabías que…?», «Probablemente…», ni una historia sin tensión.

## 3. La frase

**Lo conocido delante, lo nuevo al final.** En castellano el acento de la voz cae al final y es lo que se recuerda; en
este estilo, además, lo del final es lo que va en amarillo.

| Mal | Bien |
|---|---|
| «56 días tardaron de media.» | «De media, tardaron 56 días.» |
| «Lo que más gasta, calentar el agua, no el agua es.» | «Lo que más gasta no es el agua: es calentarla.» |
| «La empresa, aunque tú no lo veas en tu nómina, paga 600 euros más.» | «La empresa paga 600 euros más. En tu nómina no salen.» |

- **Sujeto y verbo juntos.** Nada largo entre los dos; los complementos largos, al final o en otra frase.
- **Una idea por frase.** Si lleva «y… y…» o dos cifras, se parte.
- **Longitud:** la referencia va a 155-165 palabras por minuto con frases de 3-10 palabras; la guía pide 8-14. Se
  escribe en frases de 6-12 y se parten en subtítulos de ≤ 32 caracteres (§6). Tres largas seguidas cansan; tres cortas
  seguidas suenan a telegrama: alternar.
- **Frases de ≤ 4 palabras**, solo como golpe pegado a la anterior: «Hasta el mes que viene.», «Y el jueves, lo tiene.»
- **Cifras** (Jaime: «con cifras sin problema»): 5 como mucho por guion, siempre comparadas y con su unidad («tres
  fechas cumplidas valen más que diez horas extra»). De dónde sale un dato, dentro de la frase. Nada de «según un
  estudio» ni porcentajes inventados. Que no exagere: 1,65 veces no es «casi el doble».
- **Algo nuevo cada 3-5 s** en la voz y la escena nunca quieta más de 1,5 s (regla 15).

## 4. El hilo dentro de cada punto

Técnica principal: **retomar lo último que se ha dicho** (la última palabra, la cifra o la imagen).
«…aparta una parte *antes de pagar nada.* / Y lo que no ves, *no lo gastas.*» · «Di «lo tienes el jueves». / Y el
jueves, lo tiene.»

Conectores que suenan a habla: **por eso**, **así que**, **y + dato nuevo**, **al final**, **resulta que**, **lo curioso
es que**, **ni siquiera**.

**Prohibidos al empezar una frase:** «Pero», «Sin embargo», «En cambio», «Además», «Por otro lado», «Cabe destacar que»,
«Es importante saber que», «¿Y lo de…?», «Ahora bien». Si sin uno de ellos no se unen dos frases, el hilo está roto:
se reescribe la segunda para que retome la primera. El choque de dos frases ya es el giro: «Calcularon 34 días.
Tardaron 56.»

## 5. Lo que delata una traducción, el tiempo y la puntuación

Primero, la lista de `CASTELLANO.md` (calcos de este estilo: «sígueme para más», «tu número», «tu cabeza dice», «sin
culpa», «carrito»…). Además:

**Calcos de construcción:** pasiva con «ser» («fue descubierto por» → «lo descubrieron»); gerundio de algo posterior;
posesivo con el cuerpo («abre tus ojos» → «abre los ojos»); pronombre sujeto que sobra; «es por eso que» → «por eso»;
«lo que pasa es que» de relleno; «esto es lo que pasa:» / «aquí está la cosa:»; «hace 10 años atrás»; «ser capaz de» →
«poder»; «tomar ventaja» → «aprovechar»; «hacer una decisión» → «tomar»; «en base a» → «según»; «a nivel de»; «jugar un
rol»; «enfocarse en» → «centrarse en».

**Falsos amigos:** eventualmente (→ al final), actualmente por *actually* (→ en realidad), masivo (→ enorme), dramático
(→ drástico), agresivo (→ ambicioso), asumir por suponer, aplicar a un puesto (→ solicitar), reportar (→ informar).

**Muletillas de vídeo, fuera:** literalmente, básicamente, honestamente, spoiler, plot twist, «lo que nadie te cuenta»,
«¿sabías que…?», «déjame explicarte», «quédate hasta el final», «esto te va a volar la cabeza».

**Tiempos:** presente e imperativo (es lo que hace la referencia). Para hábitos, presente: «si calculas dos horas,
tardas tres», no «tardarás». El futuro, solo para predecir.

**Puntuación para la voz:** coma = pausa corta; **dos puntos = suspense y revelación** (el recurso más fuerte; en este
estilo, el «Número uno:» y la voz interior «Piensas:»); punto y coma = contraste de dos mitades; punto = pausa entera
antes de un golpe; puntos suspensivos, uno por vídeo como mucho. Prohibidos: paréntesis, rayas y comillas de ironía.

**Tipografía:** comillas españolas «así»; decimales con coma; miles con punto; espacio antes de € y %; signos de abrir.

**Registro de Madrid:** sí «te sale por», «de media», «ni de lejos», «a la larga», «resulta que», «al final», «llegar a
fin de mes», «la nómina», «se paga aparte». No jerga (tío, bro, flipar, mola) ni latinoamericano (platicar, checar,
ahorita, plata, computadora, celular, agendar). Sin «esto / lo / el resto» sin referente claro.

## 6. Marcar el guion y cortar subtítulos (`reel.json`)

- ` / ` separa subtítulos **dentro de la misma toma de voz**; ` // ` los separa y mete una pausa (`pausa_media`);
  `*texto*` va en amarillo. Una línea es una toma: `herramientas/voz.py` la lee entera y corta los subtítulos en el
  silencio más cercano. `"join": true` une la línea con la siguiente en la misma toma.
- Subtítulos de ≤ 32 caracteres por línea, por grupos de sentido: no se separa el artículo de su nombre, el número de su
  unidad ni la preposición de lo que sigue.
- Cada línea termina en punto, dos puntos o interrogación (salvo con `join`).

## 7. Ejemplo: L1, antes y después

Antes (previa del 09-11, ya revisada con `CASTELLANO.md`): el cierre era «Guárdalo para el día que cobres. Y sígueme,
que vienen más.» (llamada de plantilla, no vuelve al gancho), no había ningún «por eso» y el cuarto punto acababa en
dos frases que se podían cambiar de orden («No es para fustigarte. Es para ver en qué se te va.»).

Después: «…Número cuatro: repasa tus gastos cada domingo. Cinco minutos, sin fustigarte. Por eso a fin de mes ya sabes
en qué se te va. Primero tú; después, todo lo demás. Mándaselo a quien a día veinte ya está a cero.»

## 8. Dónde chocan la guía y la referencia, y cómo se resuelve

| Tema | Referencia (B-R1…B-R5) | Guía | Se hace |
|---|---|---|---|
| Cierre | «Save this», «follow for more», pregunta a comentarios | Prohibidos «sígueme para más» y «¿qué opinas?»; resumen + envío concreto | Resumen visual de la referencia (tarjetas 1-n) + remate que vuelve al gancho + **envío** con icono de enviar |
| Longitud de frase | 3-10 palabras, 155-165 ppm | 8-14 palabras | Frases de 6-12, subtítulos de ≤ 32 caracteres |
| Hilo | Los puntos se pueden cambiar de orden | Cada frase retoma la anterior | Entre puntos, hilo visual (moneda); dentro del punto, hilo de la guía |
| Cifras | Dosis en número (30 minutos, 20 horas) | ≤ 5 cifras comparadas, con origen | Dosis y comparaciones sí; estadísticas sin origen no |
| Giro | La referencia no tiene objeción | Giro hacia la mitad | El anuncio abre un bucle que el punto del medio cierra, o «Lo curioso:» en ese punto |

## 9. Repaso antes de dar un guion por bueno

Estructura (referencia):
- [ ] ¿Gancho con número y promesa, puntos con nombre → dosis → voz interior → golpe, y cierre con resumen?
- [ ] ¿Cada punto cabe en 7-12 s y el último objeto amarillo de un punto es el `desde` del siguiente?
- [ ] ¿Hay una voz interior entre comillas que el espectador se diga?

Redacción (guía):
- [ ] ¿Se entiende la idea en una frase de ≤ 12 palabras? ¿Se ha leído entero en voz alta sin trabarse?
- [ ] ¿Dentro de cada punto, cada frase retoma la anterior, sin «Pero / Además / En cambio» al principio?
- [ ] ¿Lo nuevo (y lo amarillo) va al final de cada frase?
- [ ] ¿Sin calcos, sin muletillas, sin referentes sueltos? ¿Pasa `CASTELLANO.md`?
- [ ] ¿Hay un giro hacia la mitad? ¿Y un «por eso» donde una consecuencia lo pida, sin forzarlo?
- [ ] ¿El gancho dice a quién va y cumple lo que promete (si dice «cuatro frases», ¿son cuatro frases)?
- [ ] ¿Los puntos van en el orden en que se hacen y ninguno parece contradecir a otro?
- [ ] ¿Las cifras son 5 o menos, comparadas y con unidad?
- [ ] ¿El remate vuelve al gancho en ≤ 10 palabras y el envío nombra a alguien reconocible?
- [ ] ¿Lo diría así una persona de Madrid en un bar?

**Lector en frío (regla 18):** después de `redaccion.py`, un agente nuevo que solo oye la voz (`herramientas/lector.py`)
tiene que resumir el vídeo como la idea del guion, no marcar frases que no se entiendan y poner 8 o más. Quien escribe
no vale como lector: ve las escenas en la cabeza.

Automático: `python3 herramientas/redaccion.py reels/ID` tiene que decir `ok`. Ve conectores prohibidos al empezar,
calcos y muletillas, jerga, comillas, paréntesis y rayas, subtítulos largos, más de 5 cifras, líneas sin cerrar,
suspensivos, si falta la frase entre comillas o el envío, y (estilo A) la objeción. El «por eso» solo lo anota. El hilo, el orden de las
palabras y la lectura en voz alta no los ve: son trabajo de quien escribe.
