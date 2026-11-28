// L60 · La ley de Price (estilo B; reglas 15, 20, 21, 24)
// Idea visual: una rejilla de cien casillas (la plantilla) en la que solo diez se encienden en amarillo; esas diez
// llenan la barra de «la mitad del trabajo». Cada regla vuelve a esos pocos: encontrarlos, mirar qué parte de tu
// trabajo da resultado y cuidar al compañero que, si se va, deja la barra del equipo a medias.
// Contadores que ruedan: 100, 1963 y los diez que se van encendiendo. Algo que se rellena por punto: la rejilla con su
// contador, la lista y el reloj de los que no pierden el tiempo, la barra de «más horas a eso», la barra del equipo.
// Regla 20: «¿Y los otros noventa?» va en bocadillo de un compañero gris durante el gancho; la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(3, 0), gap: 70, y: 360 } });

// «La primera: // …» → T en «La», S en la primera palabra del punto
const N = [4, 6, 8].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(10, 0) - 0.1;   // resumen
const ROJO = '#e4574f';
const GRIS = '#9a9c9b';
const AM = '#e6ce46';

E.camara([
  [0, [0, -380, 1.04]], [w(0, 6), [10, -385, 1.06]], [wf(0, -1), [-15, -390, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 8), [10, -385, 1.04]],
  [wf(1, -1), [20, -390, 1.06]], [w(2, 0), [0, -380, 1.02]], [w(2, 6), [10, -385, 1.04]], [w(2, 12), [-10, -385, 1.05]], [N[0].T, [10, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(5, 0), [15, -385, 1.04]], [w(5, 6), [-10, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(7, 0), [-15, -385, 1.04]], [w(7, 7), [15, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(9, 0), [-10, -385, 1.04]], [w(9, 6), [10, -385, 1.05]], [TC - 0.1, [0, -385, 1.04]], [TC, [0, -390, 1.05]],
]);

// rejilla de cien casillas (10 × 10): la plantilla; DIEZ = las diez que sacan la mitad del trabajo
const DIEZ = [3, 17, 22, 38, 41, 56, 64, 79, 85, 92];
const GX = -45, GY = -200;
const rejilla = (id, o) => E.obj(id, 'cuadricula', Object.assign({ x: GX, y: GY, cols: 10, rows: 10, lado: 24, gap: 8, on: DIEZ, caja: [-156, -156, 312, 312] }, o));

// ---------- gancho ----------
// 0: En(0) una(1) empresa(2) de(3) cien(4) personas(5) diez(6) hacen(7) la(8) mitad(9) del(10) trabajo(11)   [bocadillo «¿Y los otros noventa?»]
// desde el fotograma 0: el muñeco, la rejilla y el contador que rueda hasta 100; «diez»: se encienden diez casillas;
// «la mitad del trabajo»: la barra se llena hasta la mitad; el compañero gris pregunta por los otros noventa
E.figura('yo', { t0: 0, t1: w(1, 0) + 0.1, sale: 0.25, x: -360, talla: 420, cara: true,
  poses: [[0, 'pensar'], [w(0, 4), 'senalar'], [w(0, 6), 'celebrar'], [w(0, 8), 'senalar'], [wf(0, -1), 'manos_cabeza']],
  sonrisa: [[0, 0.3], [w(0, 6), 1.3], [w(0, 8), 0.6], [wf(0, -1), -0.6]] });
rejilla('gente', { t0: 0, t1: w(2, 0), sale: 0.25, pop: true, p: [[w(0, 6) - 0.05, 0], [w(0, 6) + 0.35, 1, 'out']], apagar: [[w(1, 13), 0], [w(1, 16) + 0.3, 1, 'inout']] });
E.obj('cien', 'contador', { t0: 0, t1: w(0, 7), sale: 0.2, x: GX, y: -460, size: 90, miles: false, pop: true,
  v: [[0, 0], [w(0, 4) + 0.35, 100, 'out']], barrido: [w(0, 4) + 0.4], caja: [-110, -50, 220, 100] });
E.obj('rotPers', 'rotulo', { t0: w(0, 4), t1: w(0, 7), sale: 0.2, x: GX, y: -385, texto: 'PERSONAS', size: 24, col: GRIS, pop: true, caja: [-80, -14, 160, 28] });
E.obj('chDiez', 'chispas', { t0: w(0, 6) + 0.3, t1: w(0, 6) + 1.1, x: GX, y: GY, r0: 120, r1: 230, inspeccion: false });
E.golpe(w(0, 6) + 0.3, 0.05); E.destello(w(0, 6) + 0.3, 0.1); E.sfx(w(0, 6) + 0.3, 'thud');
E.obj('mitad', 'relleno', { t0: w(0, 7) - 0.05, t1: w(2, 0), sale: 0.25, x: GX, y: -455, w: 360, h: 44, pop: true, rotulo: 'LA MITAD DEL TRABAJO',
  f: [[w(0, 8), 0], [wf(0, -1) + 0.2, 0.5, 'out']], barrido: [w(1, 8)], caja: [-200, -78, 420, 100] });
E.sfx(w(0, 8), 'fill');
E.temblor(wf(0, -1), 12, 0.4);
E.figura('cB', { t0: 0, t1: w(1, 0) + 0.1, sale: 0.25, x: 410, talla: 250, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(0, 6), 'encoger'], [w(0, 9), 'pensar']], sonrisa: [[0, 0.3], [w(0, 6), -0.4]] });
E.obj('bocaN', 'bocadillo', { t0: w(0, 6) + 0.1, t1: w(1, 0), sale: 0.2, x: 285, y: -330, w: 330, h: 70, texto: '¿Y los otros noventa?', size: 26, pop: true,
  on: [[w(0, 6), 0], [w(0, 6) + 0.4, 1]], caja: [-165, -35, 330, 96] });

// 1: Se(0) llama(1) ley(2) de(3) Price(4) la(5) mitad(6) del(7) trabajo(8) la(9) hace(10) la(11) raíz(12) cuadrada(13) de(14) la(15) plantilla(16)
// el nombre a la derecha; «la mitad del trabajo»: la barra brilla; «la raíz cuadrada de la plantilla»: √100 = 10 y
// las noventa casillas restantes se apagan
E.figura('yo1', { t0: w(1, 0), t1: w(2, 0) + 0.1, x: -360, talla: 420, cara: true,
  poses: [[0, 'de_pie'], [w(1, 1), 'senalar'], [w(1, 5), 'ofrecer'], [w(1, 11), 'pensar'], [w(1, 16), 'celebrar']],
  sonrisa: [[0, 0.3], [w(1, 2), 0.8], [w(1, 11), 0.2], [w(1, 16), 1.4]] });
E.obj('rotPrice', 'rotulo', { t0: w(1, 1) - 0.05, t1: w(2, 0), sale: 0.25, x: 310, y: -300, texto: 'LEY DE PRICE', size: 34, col: AM, peso: 700, pop: true, caja: [-165, -20, 330, 40] });
E.obj('chPrice', 'chispas', { t0: w(1, 4), t1: w(1, 4) + 0.8, x: 310, y: -300, r0: 110, r1: 210, inspeccion: false });
E.golpe(w(1, 4), 0.04);
E.obj('raiz', 'rotulo', { t0: w(1, 12) - 0.1, t1: w(2, 0), sale: 0.25, x: 310, y: -180, texto: '√100 = 10', size: 48, col: AM, peso: 700, pop: true, caja: [-150, -28, 300, 56] });
E.obj('chRaiz', 'chispas', { t0: w(1, 16), t1: w(1, 16) + 0.8, x: GX, y: GY, r0: 120, r1: 230, inspeccion: false });
E.destello(w(1, 16), 0.1);

// 2: Un(0) físico(1) la(2) formuló(3) en(4) 1963(5) contando(6) artículos(7) de(8) científicos(9) y(10) en(11) muchas(12) empresas(13) pasa(14) algo(15) parecido(16)
// 3: Tres(0) cosas(1) que(2) puedes(3) hacer(4) con(5) ella(6)
E.figura('yo2', { t0: w(2, 0) - 0.05, t1: fin(0), x: -360, cara: true,
  poses: [[0, 'de_pie'], [w(2, 1), 'senalar'], [w(2, 6), 'pensar'], [w(2, 11), 'senalar'], [w(2, 16), 'encoger'], [w(3, 0), 'ofrecer']],
  sonrisa: [[0, 0.2], [w(2, 1), 0.7], [w(2, 6), 0.3], [w(2, 11), 0.8], [w(3, 0), 1.2]] });
E.figura('fisico', { t0: w(2, 0) + 0.1, t1: w(2, 10), sale: 0.25, x: 390, talla: 340, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(2, 3), 'pensar'], [w(2, 6), 'senalar']], sonrisa: 0.6 });
E.obj('rotFis', 'rotulo', { t0: w(2, 1) - 0.1, t1: w(2, 10), sale: 0.2, x: 390, y: -400, texto: 'FÍSICO', size: 26, col: GRIS, pop: true, caja: [-60, -15, 120, 30] });
E.obj('anio', 'contador', { t0: w(2, 3), t1: w(2, 10), sale: 0.2, x: 60, y: -440, size: 110, miles: false, pop: true,
  v: [[w(2, 3), 0], [w(2, 5) + 0.45, 1963, 'out']], barrido: [w(2, 5) + 0.5], caja: [-150, -58, 300, 116] });
E.obj('chAnio', 'chispas', { t0: w(2, 5) + 0.45, t1: w(2, 5) + 1.25, x: 60, y: -440, r0: 130, r1: 230, inspeccion: false });
E.golpe(w(2, 5) + 0.45, 0.04);
E.obj('articulos', 'papeles', { t0: w(2, 6) - 0.1, t1: w(2, 10), sale: 0.25, x: 90, y: -14, n: 7, k: [[w(2, 6), 0], [wf(2, 9), 7, 'lin']], caja: [-95, -125, 190, 140] });
E.obj('rotArt', 'rotulo', { t0: w(2, 7) - 0.1, t1: w(2, 10), sale: 0.2, x: 90, y: -200, texto: 'ARTÍCULOS', size: 24, col: GRIS, pop: true, caja: [-80, -14, 160, 28] });
// «y en muchas empresas pasa algo parecido»: tres rejillas pequeñas, en cada una se encienden unas pocas
[-130, 60, 250].forEach((x, i) => { const a = w(2, 11) + i * 0.18;
  E.obj('emp' + i, 'cuadricula', { t0: a, t1: N[0].T - 0.05, sale: 0.2, x, y: -200, cols: 5, rows: 4, lado: 26, gap: 8, on: [[2, 13], [6, 17], [4, 10]][i], pop: true,
    p: [[w(2, 15) + i * 0.12, 0], [w(2, 16) + 0.2 + i * 0.12, 1, 'out']], apagar: [[w(2, 15), 0], [wf(2, -1) + 0.3, 1]], caja: [-81, -64, 162, 128] }); });
E.sfx(w(2, 15), 'fill');
// «Tres cosas»: tres monedas con «?»
[0, 1, 2].forEach(i => { const a = w(3, 0) + i * 0.13;
  E.obj('q' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: -40 + i * 100, y: -440, r: 32, n: '?', pop: true, sfx: i === 0,
    s: i === 0 ? [[0, 1], [wf(3, -1), 1], [wf(3, -1) + 0.3, 1.3, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [wf(3, -1), 1], [wf(3, -1) + 0.3, 0.4]], caja: [-32, -32, 64, 64] }); });
E.destello(wf(3, -1), 0.12);

// ---------- 1 · averigua quiénes son esos diez ----------
// 4: La(0) primera(1) averigua(2) quiénes(3) son(4) esos(5) diez(6)
// 5: Fíjate(0) en(1) cómo(2) trabajan(3) y(4) en(5) qué(6) no(7) pierden(8) el(9) tiempo(10)
E.numero(1, N[0].T, N[0].S, { desde: 'q1', hacia: 'busca' });
E.figura('yoP1', { t0: N[0].S - 0.1, t1: fin(1), x: -360, cara: true,
  poses: [[0, 'de_pie'], [w(4, 2), 'pensar'], [w(4, 5), 'senalar'], [wf(4, -1), 'celebrar'], [w(5, 0), 'senalar'], [w(5, 4), 'pensar'], [w(5, 8), 'senalar'], [wf(5, -1), 'celebrar']],
  sonrisa: [[0, 0.2], [w(4, 2), 0], [w(4, 5), 0.8], [wf(4, -1), 1.5], [w(5, 0), 0.6], [wf(5, -1), 1.5]] });
// las diez casillas se van encendiendo mientras el contador sube hasta 10
rejilla('busca', { t0: N[0].S - 0.1, t1: w(5, 0) - 0.15, sale: 0.2, pop: true, r: 120,
  p: [[w(4, 3), 0], [wf(4, -1), 1, 'lin']], apagar: [[w(4, 3), 0], [wf(4, -1), 0.8]] });
E.sfx(w(4, 3), 'fill');
E.obj('cuenta10', 'contador', { t0: w(4, 2) - 0.1, t1: w(5, 0) - 0.15, sale: 0.2, x: 310, y: -300, size: 100, miles: false, pop: true,
  v: [[w(4, 3), 0], [wf(4, -1), 10, 'lin']], barrido: [wf(4, -1) + 0.05], caja: [-90, -55, 180, 110] });
E.obj('rotEsos', 'rotulo', { t0: w(4, 5) - 0.1, t1: w(5, 0) - 0.15, sale: 0.2, x: 310, y: -210, texto: 'ESOS DIEZ', size: 26, col: AM, pop: true, caja: [-90, -15, 180, 30] });
E.obj('ch1a', 'chispas', { t0: wf(4, -1), t1: wf(4, -1) + 0.8, x: GX, y: GY, r0: 120, r1: 230, inspeccion: false });
E.golpe(wf(4, -1), 0.04);
// «Fíjate en cómo trabajan»: una lista que se marca; «y en qué no pierden el tiempo»: el reloj se llena sin huecos
E.figura('diez1', { t0: w(5, 0) + 0.1, t1: fin(1), x: 400, talla: 300, color: 'claro', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(5, 1), 'coger'], [w(5, 3), 'levantar'], [w(5, 6), 'coger'], [wf(5, -1), 'celebrar']], sonrisa: 1 });
E.obj('como', 'lista', { t0: w(5, 0) + 0.1, t1: fin(1), x: 60, y: -390, n: 3, w: 300, gap: 62, pop: true, r: 70,
  p: [[w(5, 1), 0], [w(5, 3) + 0.5, 3, 'lin']], brillo: [[w(5, 2), 0], [w(5, 4), 3, 'lin']], caja: [-150, -80, 300, 160] });
E.sfx(w(5, 1), 'fill');
E.obj('reloj', 'temporizador', { t0: w(5, 4) - 0.1, t1: fin(1), x: 60, y: -150, r: 72, pop: true, sobrevive: true,
  p: [[w(5, 6), 0], [wf(5, -1), 1, 'out']], hecho: [[0, 0], [wf(5, -1), 1]], caja: [-90, -90, 180, 180] });
E.sfx(w(5, 6), 'fill');
E.obj('ch1b', 'chispas', { t0: wf(5, -1), t1: wf(5, -1) + 0.8, x: 60, y: -150, r0: 100, r1: 200, inspeccion: false });
E.destello(wf(5, -1), 0.1);

// ---------- 2 · mira qué parte de tu trabajo da resultado ----------
// 6: La(0) segunda(1) mira(2) qué(3) parte(4) de(5) tu(6) trabajo(7) da(8) resultado(9)
// 7: Dedícale(0) más(1) horas(2) a(3) eso(4) y(5) menos(6) a(7) lo(8) que(9) nadie(10) echa(11) en(12) falta(13)
E.numero(2, N[1].T, N[1].S, { desde: 'reloj', hacia: 'trabajo' });
E.figura('yoP2', { t0: N[1].S - 0.1, t1: fin(2), x: -360, cara: true,
  poses: [[0, 'de_pie'], [w(6, 2), 'pensar'], [w(6, 4), 'senalar'], [w(6, 8), 'celebrar'], [w(7, 0), 'ofrecer'], [w(7, 5), 'senalar'], [w(7, 10), 'apartarse'], [wf(7, -1), 'celebrar']],
  sonrisa: [[0, 0.2], [w(6, 4), 0.4], [w(6, 8), 1.5], [w(7, 0), 0.9], [w(7, 10), 0.2], [wf(7, -1), 1.3]] });
E.obj('trabajo', 'bloques', { t0: N[1].S - 0.1, t1: fin(2), x: 70, y: -440, n: 5, w: 420, h: 84, pop: true, r: 90, texto: 'TU TRABAJO',
  parte: [[w(6, 3), 0], [w(6, 5), 1, 'out']], hechos: [[w(6, 8), 0], [wf(6, -1) + 0.2, 1, 'out']], caja: [-210, -52, 420, 104] });
E.obj('ch2a', 'chispas', { t0: wf(6, -1) + 0.2, t1: wf(6, -1) + 1.0, x: 70 - 210 + 42, y: -440, r0: 60, r1: 150, inspeccion: false });
E.golpe(wf(6, -1) + 0.2, 0.04); E.sfx(w(6, 8), 'fill');
E.obj('rotRes', 'rotulo', { t0: w(6, 8) - 0.05, t1: w(7, 0), sale: 0.2, x: -140 + 42, y: -340, texto: 'DA RESULTADO', size: 24, col: AM, pop: true, caja: [-105, -14, 210, 28] });
E.obj('masH', 'relleno', { t0: w(7, 0) - 0.1, t1: fin(2), x: 80, y: -280, w: 420, h: 44, pop: true, sobrevive: true, r: 60, rotulo: 'MÁS HORAS A ESO',
  f: [[w(7, 1), 0.3], [w(7, 4) + 0.3, 0.9, 'out']], barrido: [w(7, 4) + 0.35], caja: [-210, -78, 420, 100] });
E.sfx(w(7, 1), 'fill');
E.obj('menos', 'relleno', { t0: w(7, 5) - 0.1, t1: fin(2), x: 80, y: -140, w: 420, h: 44, pop: true, rotulo: 'LO QUE NADIE ECHA EN FALTA',
  f: [[w(7, 6), 0.7], [w(7, 11) + 0.3, 0.12, 'inout']], caja: [-210, -78, 420, 100] });
E.obj('ch2b', 'chispas', { t0: w(7, 4) + 0.3, t1: w(7, 4) + 1.1, x: 80 + 160, y: -280, r0: 60, r1: 150, inspeccion: false });
E.temblor(w(7, 11) + 0.3, 8, 0.3);

// ---------- 3 · si tienes equipo, cuida a esos pocos ----------
// 8: La(0) tercera(1) si(2) tienes(3) equipo(4) cuida(5) a(6) esos(7) pocos(8)
// 9: Cuando(0) se(1) va(2) uno(3) de(4) ellos(5) se(6) nota(7) como(8) si(9) se(10) fueran(11) muchos(12)
E.numero(3, N[2].T, N[2].S, { desde: 'masH', hacia: 'equipo' });
E.figura('yoP3', { t0: N[2].S - 0.1, t1: TC, x: -360, cara: true,
  poses: [[0, 'de_pie'], [w(8, 2), 'senalar'], [w(8, 5), 'ofrecer'], [wf(8, -1), 'celebrar'], [w(9, 0), 'de_pie'], [w(9, 2), 'senalar'], [w(9, 6), 'manos_cabeza'], [wf(9, -1) + 0.2, 'triste']],
  sonrisa: [[0, 0.3], [w(8, 5), 1.2], [wf(8, -1), 1.5], [w(9, 2), 0.2], [w(9, 6), -1.2], [wf(9, -1), -1.4]] });
E.obj('equipo', 'relleno', { t0: N[2].S - 0.1, t1: TC, x: 60, y: -455, w: 400, h: 44, pop: true, r: 60, rotulo: 'EQUIPO',
  f: [[w(8, 5), 0.35], [wf(8, -1) + 0.2, 1, 'out'], [w(9, 6), 1], [w(9, 12) + 0.3, 0.25, 'inout']], barrido: [wf(8, -1) + 0.25], caja: [-200, -78, 400, 100] });
E.sfx(w(8, 5), 'fill');
const EQ = [{ id: 'g1', x: -40, c: 'gris' }, { id: 'g2', x: 90, c: 'gris' }, { id: 'clave', x: 240, c: 'claro' }];
EQ.forEach((q, i) => { const sale = q.id === 'clave';
  E.figura(q.id, { t0: w(8, 3) - 0.1 + i * 0.12, t1: sale ? w(9, 5) : TC, sale: sale ? 0.3 : 0.25, x: sale ? [[0, q.x], [w(9, 2), q.x], [w(9, 5), 400, 'inout']] : q.x,
    talla: sale ? 320 : 280, color: q.c, dir: sale ? [[0, -1], [w(9, 2), 1]] : -1, cara: true,
    luz: sale ? 1 : [[0, 1], [w(9, 8), 1], [w(9, 12) + 0.3, 0.45]],
    poses: sale ? [[0, 'de_pie'], [w(8, 5), 'celebrar'], [w(9, 2), 'andar']] : [[0, 'de_pie'], [w(8, 5), 'celebrar'], [w(9, 6) + i * 0.1, i ? 'encoger' : 'manos_cabeza']],
    sonrisa: sale ? 1 : [[0, 0.6], [w(9, 6), -1]] }); });
E.obj('cuida', 'corazon', { t0: w(8, 5) - 0.05, t1: w(9, 2), sale: 0.2, x: 240, y: -380, r: 34, pop: true, s: [[w(8, 5), 1], [w(8, 7), 1.25, 'back'], [w(8, 8) + 0.2, 1]], caja: [-40, -40, 80, 80] });
E.obj('ch3', 'chispas', { t0: wf(8, -1) + 0.2, t1: wf(8, -1) + 1.0, x: 60, y: -455, r0: 120, r1: 230, inspeccion: false });
E.golpe(wf(8, -1) + 0.2, 0.04);
E.obj('rotSeVa', 'rotulo', { t0: w(9, 6) - 0.05, t1: TC, x: 60, y: -360, texto: 'SE NOTA', size: 28, col: ROJO, peso: 700, pop: true, caja: [-75, -16, 150, 32] });
E.temblor(w(9, 7), 12, 0.4); E.golpe(w(9, 7), 0.05);

// ---------- cierre: resumen y envío ----------
// 10: El(0) trabajo(1) nunca(2) se(3) reparte(4) a(5) partes(6) iguales(7)
// 11: Mándaselo(0) a(1) ese(2) compañero(3) que(4) saca(5) adelante(6) medio(7) departamento(8)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(10, 4), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, items: ['Esos diez', 'Da resultado', 'Esos pocos'], gap: 270,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(10, 6)], caja: [-400, -60, 800, 200] });
E.obj('confC', 'confeti', { t0: wf(10, -1), t1: wf(10, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(10, -1), 0.22); E.golpe(wf(10, -1), 0.04);
E.figura('yoF', { t0: w(11, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(11, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(11, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(11, 8)], vuelo: [[wf(11, -1), 0], [wf(11, -1) + 0.5, 1, 'in']] });
