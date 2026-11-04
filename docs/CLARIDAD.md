# Claridad y cero solapes: cómo lo garantiza el sistema (04-11-2026)

Jaime: «ponle cabeza y trabaja para ver qué podemos hacer para asegurar que no haya errores de solapes de formas, y que se
refuerce la claridad, que muchas veces es poco claro todo». Esto es lo que hace el sistema desde hoy, en tres capas.

## 1. El motor coloca, no el autor de la escena

- Los bocadillos, nubes, tarjetas, pegatinas y etiquetas van **anclados a un personaje** (`over`) y el motor los coloca en
  cada fotograma fuera del titular, dentro de los márgenes, sin pisar otro objeto ni ninguna cabeza (a un lado, apilado o
  reducido). Nadie los coloca con coordenadas.
- Tienen **tamaño fijo en pantalla** (píxeles) aunque la cámara se aleje: siempre se leen.
- Se dibujan **siempre delante del 3D** (sin test de profundidad): una mesa o un cuerpo nunca los tapa.
- El titular tiene **≤ 2 líneas** (reduce el cuerpo solo), un **halo blanco** para leerse sobre la multitud, y zona
  reservada arriba (y < 450) que ningún objeto invade.
- Un personaje que **salta de sitio** (cambio de escena) desaparece 0,3 s y reaparece ya colocado: nunca se le ve a
  medio camino ni cortado durante un latigazo.
- Los anillos (`around`) se centran en el personaje de cara a la cámara; la multitud nace a ≥ 1,6 de los protagonistas.

## 2. Dos inspectores, y nada se enseña sin los dos en verde

- `inspeccionar.js` (rectángulos, cada 0,2 s): titular, objetos, cabezas, bordes, cuerpos enteros, titular ≤ 520 px.
- `inspeccionar_px.js` (**píxeles**, cada 0,5 s): dibuja cada objeto por separado como silueta y mide lo que comparte
  con los demás. Ve lo que los rectángulos no ven: una mesa que cruza un cuerpo, una flecha por encima de una cara, la
  multitud sobre un protagonista, un objeto cortado por el borde, una tarjeta demasiado pequeña para leerse, **más de dos
  bocadillos a la vez**, algo encima del titular.
- Si el inspector no ve un fallo que Jaime sí ve, se añade la comprobación, no se arregla solo ese reel.

Lo que el inspector de píxeles ha encontrado en I3, I1 y E1 (hechos con el inspector de rectángulos): mesa que cruza el
cuerpo del protagonista, multitud sobre un protagonista, tres y cuatro bocadillos a la vez, bocadillos lejanos ilegibles,
titular pisado por un personaje en un plano general. Son los «poco claro» de Jaime. No se regeneran: se aplican a los reels
nuevos.

## 3. Reglas de claridad para escribir una escena (lista que se repasa antes de la previa)

1. **Una cosa por plano:** cada frase tiene un solo objeto protagonista (bocadillo, anillo, tarjeta, cifra); los
   secundarios (línea, cruz, pegatina) acompañan a ese objeto, nunca compiten. Máximo 2 bocadillos/tarjetas a la vez.
2. **El objeto es el sustantivo de la frase:** «cero» → el anillo; «correo» → la pegatina de correo; «precio» → la cifra.
   Si el objeto no se entiende sin la voz, sobra.
3. **Objetos sólidos (mesa, puerta, escritorio, letras, pila) a ≥ 0,9 unidades de cualquier personaje** y detrás de
   ellos (z menor); nunca entre la cámara y un protagonista.
4. **Multitud siempre detrás** (z ≤ −2 respecto a los protagonistas) y solo en planos generales.
5. **Un movimiento de cámara por frase**; en los latigazos, los objetos de la escena anterior ya han salido (t1 ≤ t del
   latigazo − 0,05) y los nuevos entran después (t0 ≥ t + 0,3).
6. **Cuerpo entero, siempre**: también en el plano cercano. Escala de personaje ≈ 40 % de la altura.
7. **Texto legible:** bocadillo ≥ 180 px de alto en pantalla, sans ≥ 46 px en la textura; etiqueta y cifra, mayores que
   la cabeza del personaje.
8. **El titular no cuenta la escena:** el titular dice la lección; la escena enseña el objeto. Nunca dos textos largos a la
   vez (bocadillo largo ⇒ `hide` del titular).
9. **Contraste:** amarillo = lo que hay que hacer; rojo = lo que no; nunca los dos en el mismo objeto ni frase.
10. Antes de enviar: los dos inspectores en verde + tira a 1 fps mirada entera.
