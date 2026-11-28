// L51 · La ley de la trivialidad (estilo B; reglas 15, 20, 21, 24)
// Idea visual: dos compañeros grises discuten sin parar por una cosa pequeña mientras la barra de «lo que menos importa»
// se llena de tiempo y el muñeco amarillo se desespera. Parkinson: la central nuclear se aprueba con un visto bueno y una
// barra de minutos casi vacía; las bicicletas llenan la barra de «casi una hora». Tres reglas: la fila llena del orden del
// día sube al principio, un reloj por punto (el contador rueda hasta 10 MIN) y un móvil que resuelve lo fácil con un mensaje.
// Contador que rueda: 1957 y los diez minutos. Regla 20: «¿Y de qué color lo pintamos?» va en bocadillo de un compañero.
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
  [0, [0, -380, 1.04]], [w(0, 5), [15, -385, 1.06]], [w(0, 12), [-10, -390, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 6), [10, -385, 1.04]],
  [w(1, 15), [-15, -390, 1.06]], [w(2, 0), [0, -380, 1.02]], [w(2, 6), [15, -385, 1.05]], [w(2, 7), [0, -380, 1.02]], [w(2, 15), [-10, -385, 1.04]],
  [w(2, 23), [15, -385, 1.06]], [w(3, 0), [0, -380, 1.02]], [N[0].T, [15, -390, 1.05]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(5, 0), [15, -385, 1.04]], [w(5, 8), [-10, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(7, 0), [-15, -385, 1.04]], [w(7, 8), [15, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(9, 0), [-10, -385, 1.04]], [w(9, 7), [10, -385, 1.05]], [TC - 0.1, [0, -385, 1.04]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: En(0) una(1) reunión(2) lo(3) que(4) menos(5) importa(6) es(7) lo(8) que(9) más(10) tiempo(11) se(12) discute(13)   [bocadillo «¿Y de qué color lo pintamos?»]
// dos compañeros discuten por una cosa pequeña; la barra de «lo que menos importa» se llena de tiempo; el muñeco se desespera
const G1 = w(1, 0);
E.figura('yo', { t0: 0, t1: G1, sale: 0.25, x: -380, talla: 320, cara: true,
  poses: [[0, 'pensar'], [w(0, 3), 'encoger'], [w(0, 7), 'senalar'], [w(0, 10), 'manos_cabeza'], [wf(0, -1) + 0.2, 'triste']],
  sonrisa: [[0, -0.2], [w(0, 3), -0.6], [w(0, 10), -1.4]] });
E.figura('cA', { t0: 0, t1: G1, sale: 0.25, x: 110, talla: 300, color: 'gris', cara: true,
  poses: [[0, 'ofrecer'], [0.5, 'senalar', 0.25], [w(0, 2) + 0.3, 'encoger', 0.25], [w(0, 3), 'ofrecer', 0.25], [w(0, 6), 'levantar', 0.25], [w(0, 9), 'senalar', 0.25], [w(0, 12), 'encoger', 0.25], [wf(0, -1), 'levantar', 0.25]] });
E.figura('cB', { t0: 0, t1: G1, sale: 0.25, x: 410, talla: 300, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'encoger'], [0.7, 'ofrecer', 0.25], [w(0, 2), 'senalar', 0.25], [w(0, 4), 'levantar', 0.25], [w(0, 7), 'encoger', 0.25], [w(0, 10), 'ofrecer', 0.25], [w(0, 13), 'senalar', 0.25]] });
E.obj('cosa', 'bloques', { t0: 0, t1: G1, sale: 0.25, x: 260, y: -32, n: 1, w: 64, h: 64, refl: true, caja: [-32, -32, 64, 64] });
E.obj('bocaH', 'bocadillo', { t0: 0, t1: w(0, 12), sale: 0.2, x: 215, y: -440, w: 460, h: 76, texto: '¿Y de qué color lo pintamos?', size: 28,
  on: [[0.15, 0], [0.5, 1]], caja: [-230, -38, 460, 102] });
E.obj('barH', 'relleno', { t0: 0, t1: G1, sale: 0.25, x: 250, y: 100, w: 440, h: 32, rotulo: 'LO QUE MENOS IMPORTA',
  f: [[0, 0.08], [w(0, 2), 0.22, 'lin'], [w(0, 7), 0.5, 'lin'], [wf(0, -1), 1, 'lin']], barrido: [wf(0, -1)], caja: [-220, -52, 440, 68] });
E.sfx(0.1, 'fill'); E.sfx(w(0, 7), 'fill');
E.golpe(w(0, 10), 0.05);
E.obj('marañaH', 'maraña', { t0: w(0, 10), t1: G1, sale: 0.25, x: -380, y: -400, r: 40, p: [[w(0, 10), 0], [wf(0, -1), 1, 'out']], rot: [[w(0, 10), 0], [G1, 0.7, 'lin']], caja: [-55, -32, 110, 64] });
E.temblor(w(0, 13), 14, 0.45); E.golpe(w(0, 13), 0.04);

// 1: Se(0) llama(1) ley(2) de(3) la(4) trivialidad(5) todos(6) opinan(7) de(8) lo(9) fácil(10) y(11) nadie(12) de(13) lo(14) difícil(15)
// a la izquierda, lo fácil: todos hablan (ondas de voz); a la derecha, lo difícil: un bloque grande y silencio
const G2 = w(2, 0);
E.figura('yo1', { t0: G1 + 0.05, t1: G2, sale: 0.25, x: -410, talla: 300, cara: true,
  poses: [[0, 'de_pie'], [w(1, 2), 'senalar'], [w(1, 6), 'ofrecer'], [w(1, 11), 'encoger'], [w(1, 15), 'manos_cabeza']],
  sonrisa: [[0, 0], [w(1, 2), 0.5], [w(1, 11), -0.4], [w(1, 15), -1.1]] });
E.obj('rotLey', 'rotulo', { t0: w(1, 2) - 0.1, t1: G2, sale: 0.25, x: 100, y: -490, texto: 'LEY DE LA TRIVIALIDAD', size: 32, col: AM, peso: 700, pop: true, caja: [-260, -20, 520, 40] });
E.obj('chLey', 'chispas', { t0: w(1, 5), t1: w(1, 5) + 0.8, x: 100, y: -490, r0: 60, r1: 150, inspeccion: false });
E.golpe(w(1, 5), 0.04);
[{ id: 'o1', x: -150, p: 'ofrecer' }, { id: 'o2', x: -50, p: 'levantar' }, { id: 'o3', x: 50, p: 'senalar' }].forEach((q, i) =>
  E.figura(q.id, { t0: w(1, 6) - 0.15 + i * 0.1, t1: G2, sale: 0.25, x: q.x, talla: 220, color: 'gris', dir: i === 2 ? -1 : 1,
    poses: [[0, 'de_pie'], [w(1, 7) + i * 0.12, q.p, 0.25], [w(1, 10) + i * 0.1, i === 1 ? 'ofrecer' : 'levantar', 0.25], [w(1, 12) + i * 0.1, 'de_pie', 0.3]] }));
E.obj('rotFacil', 'rotulo', { t0: w(1, 9) - 0.05, t1: G2, sale: 0.25, x: -50, y: -415, texto: 'LO FÁCIL', size: 28, col: AM, pop: true, caja: [-90, -17, 180, 34] });
E.obj('vozF', 'ondas', { t0: w(1, 6) - 0.05, t1: G2, sale: 0.25, x: -50, y: -320, n: 9, pop: true,
  amp: [[w(1, 6), 0], [w(1, 7), 1, 'out'], [w(1, 12), 1], [w(1, 13), 0.5]], caja: [-115, -50, 230, 100] });
E.sfx(w(1, 7), 'fill');
E.obj('dificil', 'bloques', { t0: w(1, 11) - 0.05, t1: G2, sale: 0.25, x: 340, y: -100, n: 1, w: 170, h: 200, pop: true, refl: true, caja: [-85, -100, 170, 200] });
E.obj('rotDif', 'rotulo', { t0: w(1, 14) - 0.05, t1: G2, sale: 0.25, x: 340, y: -415, texto: 'LO DIFÍCIL', size: 28, col: GRIS, pop: true, caja: [-105, -17, 210, 34] });
E.obj('vozD', 'ondas', { t0: w(1, 12) - 0.05, t1: G2, sale: 0.25, x: 340, y: -320, n: 9, amp: 0, pop: true, caja: [-115, -50, 230, 100] });
E.temblor(w(1, 15), 10, 0.35);

// 2: El(0) historiador(1) Parkinson(2) la(3) describió(4) en(5) 1957(6) un(7) comité(8) aprueba(9) en(10) minutos(11) una(12) central(13)
//    nuclear(14) y(15) discute(16) casi(17) una(18) hora(19) dónde(20) aparcar(21) las(22) bicicletas(23)
const PB = w(2, 7) - 0.1;    // empieza el ejemplo del comité
const G3 = w(3, 0) - 0.05;
E.figura('yo2', { t0: G2 - 0.05, t1: fin(0), x: -380, talla: 300, cara: true,
  poses: [[0, 'de_pie'], [w(2, 2), 'senalar'], [w(2, 6) + 0.9, 'de_pie'], [w(2, 9), 'senalar'], [w(2, 12), 'ofrecer'], [w(2, 16), 'encoger'], [w(2, 19), 'manos_cabeza'], [w(2, 23), 'triste'],
    [w(3, 0), 'de_pie'], [w(3, 1), 'senalar'], [w(3, 4), 'celebrar']],
  sonrisa: [[0, 0], [w(2, 2), 0.6], [w(2, 9), 0.8], [w(2, 16), -0.3], [w(2, 19), -1.2], [w(3, 0), 0.3], [w(3, 4), 1.4]] });
E.obj('rotPk', 'rotulo', { t0: w(2, 2) - 0.1, t1: PB, sale: 0.2, x: 170, y: -460, texto: 'PARKINSON', size: 32, col: GRIS, pop: true, caja: [-130, -18, 260, 36] });
E.obj('anio', 'contador', { t0: w(2, 4), t1: PB, sale: 0.2, x: 170, y: -330, size: 120, miles: false, pop: true,
  v: [[w(2, 5), 0], [w(2, 6) + 0.7, 1957, 'out']], barrido: [w(2, 6) + 0.75], caja: [-170, -60, 340, 120] });
E.obj('libro', 'papeles', { t0: w(2, 1), t1: PB - 0.1, sale: 0.2, x: 170, y: -14, n: 6, k: [[w(2, 1), 0], [w(2, 5), 6, 'lin']], caja: [-95, -110, 190, 125] });
E.obj('chAnio', 'chispas', { t0: w(2, 6) + 0.7, t1: w(2, 6) + 1.5, x: 170, y: -330, r0: 150, r1: 250, inspeccion: false });
E.golpe(w(2, 6) + 0.7, 0.04);
// la central nuclear: bloque grande que recibe el visto bueno; su barra de minutos casi no se llena
E.obj('central', 'bloques', { t0: PB, t1: G3, sale: 0.25, x: -50, y: -95, n: 1, w: 190, h: 190, pop: true,
  hechos: [[w(2, 9), 0], [w(2, 9) + 0.35, 1, 'out']], barrido: [w(2, 9) + 0.35], luz: [[0, 1], [w(2, 16), 1], [w(2, 17), 0.55]], caja: [-95, -95, 190, 190] });
E.obj('chCen', 'chispas', { t0: w(2, 9) + 0.35, t1: w(2, 9) + 1.1, x: -50, y: -95, r0: 110, r1: 200, inspeccion: false });
E.golpe(w(2, 9) + 0.35, 0.03);
E.obj('barMin', 'relleno', { t0: w(2, 10) - 0.05, t1: G3, sale: 0.25, x: -50, y: 100, w: 260, h: 32, pop: true, rotulo: 'MINUTOS',
  f: [[w(2, 10), 0], [w(2, 11) + 0.3, 0.1, 'out']], caja: [-130, -52, 260, 68] });
E.sfx(w(2, 10), 'fill');
E.obj('rotCen', 'rotulo', { t0: w(2, 13) - 0.1, t1: G3, sale: 0.25, x: -50, y: -235, texto: 'CENTRAL NUCLEAR', size: 24, col: AM, pop: true, caja: [-150, -15, 300, 30] });
E.figura('com', { t0: PB + 0.1, t1: G3, sale: 0.25, x: 165, talla: 210, color: 'gris',
  poses: [[0, 'de_pie'], [w(2, 9), 'levantar', 0.25], [w(2, 12), 'de_pie'], [w(2, 16), 'ofrecer', 0.25], [w(2, 17), 'senalar', 0.25], [w(2, 19), 'levantar', 0.25], [w(2, 21), 'ofrecer', 0.25], [w(2, 23), 'encoger', 0.25]] });
// las bicicletas: bloque pequeño, mucha voz y la barra de «casi una hora» llena
E.obj('bicis', 'bloques', { t0: w(2, 15) - 0.05, t1: G3, sale: 0.25, x: 360, y: -35, n: 1, w: 100, h: 70, pop: true, caja: [-50, -35, 100, 70] });
E.obj('vozB', 'ondas', { t0: w(2, 16) - 0.05, t1: G3, sale: 0.25, x: 360, y: -180, n: 9, pop: true, amp: [[w(2, 16), 0], [w(2, 17), 1, 'out']], caja: [-115, -50, 230, 100] });
E.obj('barHora', 'relleno', { t0: w(2, 16), t1: G3, sale: 0.25, x: 350, y: 100, w: 290, h: 32, pop: true, rotulo: 'CASI UNA HORA',
  f: [[w(2, 16), 0], [wf(2, 19) + 0.3, 0.75, 'lin'], [wf(2, 23), 0.93, 'out']], barrido: [wf(2, 23)], caja: [-145, -52, 290, 68] });
E.sfx(w(2, 16), 'fill');
E.obj('rotBic', 'rotulo', { t0: w(2, 22) - 0.05, t1: G3, sale: 0.25, x: 360, y: -275, texto: 'BICICLETAS', size: 24, col: GRIS, pop: true, caja: [-105, -15, 210, 30] });
E.temblor(w(2, 19), 12, 0.4); E.golpe(wf(2, 23), 0.04);

// 3: Tres(0) reglas(1) para(2) tus(3) reuniones(4)
E.obj('rayosH', 'rayos', { t0: w(3, 0), t1: fin(0), x: 150, y: -330, r: 300, z: -2, p: [[w(3, 0), 0], [w(3, 4), 1, 'out']], inspeccion: false });
[0, 1, 2].forEach(i => { const a = w(3, 0) + i * 0.13;
  E.obj('r' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: 150 + (i - 1) * 125, y: -330, r: 40, n: i + 1, pop: true, sfx: true, inspeccion: false,
    s: i === 0 ? [[0, 1], [w(3, 4), 1], [w(3, 4) + 0.35, 1.4, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [w(3, 4), 1], [w(3, 4) + 0.3, 0.4]], barrido: i === 0 ? [w(3, 4) + 0.3] : null }); });
E.obj('chR', 'chispas', { t0: w(3, 4) + 0.3, t1: w(3, 4) + 1.1, x: 25, y: -330, r0: 60, r1: 150, inspeccion: false });
E.destello(w(3, 4), 0.12);

// ---------- 1 · lo importante, al principio ----------
// 4: La(0) primera(1) lo(2) importante(3) al(4) principio(5)
// 5: Lo(0) que(1) cuesta(2) más(3) dinero(4) se(5) trata(6) antes(7) de(8) que(9) nadie(10) se(11) canse(12)
// orden del día de tres filas: la importante se llena y sube a la primera posición; luego llegan las monedas y la barra
// de la reunión marca que se trata mucho antes del cansancio
E.numero(1, N[0].T, N[0].S, { desde: 'r1', hacia: 'imp' });
const RX = 140, A1 = w(4, 4) - 0.05, B1 = w(4, 5) + 0.3;
E.figura('yoP1', { t0: N[0].S - 0.1, t1: fin(1), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(4, 3), 'senalar'], [w(4, 4), 'levantar'], [B1 + 0.1, 'celebrar'], [w(5, 0), 'ofrecer'], [w(5, 5), 'senalar'], [w(5, 10), 'encoger'], [wf(5, -1), 'celebrar']],
  sonrisa: [[0, 0.2], [w(4, 3), 0.6], [B1, 1.4], [w(5, 0), 0.7], [w(5, 10), 0.3], [wf(5, -1), 1.5]] });
[0, 1].forEach(i => E.obj('fila' + i, 'relleno', { t0: N[0].S - 0.1 + i * 0.08, t1: fin(1) - 0.1, sale: 0.2, x: RX, w: 300, h: 46, pop: true, libre: true,
  y: [[A1, -400 + i * 70], [B1, -330 + i * 70, 'inout']], luz: [[0, 1], [B1, 1], [B1 + 0.3, 0.6]], caja: [-150, -23, 300, 46] }));
E.obj('imp', 'relleno', { t0: N[0].S - 0.1, t1: fin(1), x: RX, w: 300, h: 46, pop: true, libre: true, sobrevive: true, r: 50,
  y: [[A1, -260], [B1, -400, 'inout']], f: [[w(4, 2), 0], [w(4, 3) + 0.4, 1, 'out']], barrido: [B1, wf(5, -1)], caja: [-150, -23, 300, 46] });
E.sfx(w(4, 2), 'fill'); E.sfx(A1, 'whoosh');
E.obj('rotImp', 'rotulo', { t0: w(4, 3) - 0.05, t1: fin(1) - 0.1, sale: 0.2, x: RX, y: -480, size: 28, col: AM, pop: true,
  texto: [[0, 'LO IMPORTANTE'], [w(4, 4) + 0.1, 'AL PRINCIPIO']], caja: [-140, -17, 280, 34] });
E.obj('ch1', 'chispas', { t0: B1, t1: B1 + 0.8, x: RX, y: -400, r0: 60, r1: 170, inspeccion: false });
E.golpe(B1, 0.04);
// «Lo que cuesta más dinero»: las monedas caen y la pila crece
E.obj('dinero', 'pila', { t0: w(5, 2) - 0.1, t1: fin(1) - 0.1, sale: 0.2, x: 415, n: 6, w: 120, hh: 24, k: [[w(5, 2), 0], [w(5, 4) + 0.35, 6, 'out']], barrido: [w(5, 4) + 0.35], caja: [-60, -126, 120, 126] });
for (let i = 0; i < 4; i++) { const a = w(5, 2) + i * 0.14;
  E.obj('mv' + i, 'moneda', { t0: a, t1: a + 0.55, entra: 0.06, sale: 0.12, r: 18, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, RX + 150], [a + 0.5, 415, 'inout']], y: [[a, -400], [a + 0.25, -330], [a + 0.5, -110, 'in']] }); }
// «se trata antes de que nadie se canse»: la reunión avanza un tramo corto, lejos de la marca del cansancio
E.obj('reunion1', 'barra', { t0: w(5, 5) - 0.1, t1: fin(1) - 0.1, sale: 0.2, x: 150, y: 120, w: 440, h: 36, pop: true, marca: 0.78, rotMarca: 'SE CANSAN',
  f: [[w(5, 5), 0], [w(5, 7) + 0.35, 0.3, 'out']], barrido: [w(5, 7) + 0.4], caja: [-220, -86, 440, 130] });
E.sfx(w(5, 5), 'fill');
E.obj('ch1b', 'chispas', { t0: w(5, 7) + 0.35, t1: w(5, 7) + 1.1, x: 150 - 220 + 8 + 424 * 0.3, y: 120, r0: 30, r1: 90, inspeccion: false });
E.golpe(w(5, 7) + 0.35, 0.03); E.destello(wf(5, -1), 0.1);

// ---------- 2 · un tiempo para cada punto ----------
// 6: La(0) segunda(1) un(2) tiempo(3) para(4) cada(5) punto(6)
// 7: Diez(0) minutos(1) para(2) lo(3) pequeño(4) Si(5) no(6) se(7) cierra(8) lo(9) decide(10) quien(11) convoca(12)
E.numero(2, N[1].T, N[1].S, { desde: 'imp', hacia: 'tm0' });
const T7 = w(7, 0) - 0.12;
E.figura('yoP2', { t0: N[1].S - 0.1, t1: fin(2), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(6, 2), 'senalar'], [w(6, 5), 'ofrecer'], [w(7, 0), 'senalar'], [w(7, 2), 'de_pie'], [w(7, 5), 'encoger'], [w(7, 8), 'manos_cabeza'], [w(7, 9), 'de_pie', 0.2], [w(7, 10), 'senalar', 0.25], [wf(7, -1), 'celebrar']],
  sonrisa: [[0, 0.2], [w(6, 2), 0.7], [w(7, 5), -0.3], [w(7, 8), -0.9], [w(7, 10), 0.8], [wf(7, -1), 1.5]] });
// un reloj por punto: los tres arcos se cierran uno detrás de otro
const K6 = [[w(6, 2), w(6, 3) + 0.3], [w(6, 4), w(6, 5) + 0.15], [w(6, 5) + 0.15, wf(6, 6)]];
[0, 1, 2].forEach(i => { const x = -50 + i * 195;
  E.obj('tm' + i, 'temporizador', { t0: N[1].S - 0.1 + i * 0.1, t1: T7, sale: 0.2, x, y: -330, r: 56, texto: '', sub: '', pop: true,
    p: [[K6[i][0], 0], [K6[i][1], 1, 'inout']], hecho: [[K6[i][1], 0], [K6[i][1] + 0.3, 0.96, 'out']], caja: [-74, -74, 148, 148] });
  E.obj('pt' + i, 'relleno', { t0: N[1].S + i * 0.1, t1: T7, sale: 0.2, x, y: -190, w: 140, h: 28, pop: true,
    f: [[K6[i][0], 0], [K6[i][1], 1, 'inout']], caja: [-70, -14, 140, 28] });
  E.sfx(K6[i][0], 'fill'); E.sfx(K6[i][1], 'ding'); E.golpe(K6[i][1], 0.015); });
E.obj('rotCada', 'rotulo', { t0: w(6, 5) - 0.05, t1: T7, sale: 0.2, x: 145, y: -470, texto: 'CADA PUNTO', size: 28, col: AM, pop: true, caja: [-115, -17, 230, 34] });
E.obj('ch2a', 'chispas', { t0: wf(6, 6), t1: wf(6, 6) + 0.8, x: 340, y: -330, r0: 80, r1: 160, inspeccion: false });
// diez minutos para lo pequeño: reloj grande, el contador rueda hasta 10; no se cierra → decide quien convoca
const DX = 150, DY = -280, C7 = w(7, 10);
E.obj('diez', 'temporizador', { t0: T7 + 0.1, t1: fin(2), x: DX, y: DY, r: 100, texto: '', sub: '', pop: true, sobrevive: true,
  p: [[w(7, 0), 0], [w(7, 4) + 0.3, 0.8, 'lin'], [w(7, 8), 1, 'lin']], hecho: [[C7, 0], [C7 + 0.4, 0.96, 'out']], barrido: [C7 + 0.45], caja: [-120, -120, 240, 240] });
E.obj('diezN', 'contador', { t0: T7 + 0.15, t1: C7 - 0.05, sale: 0.15, x: DX, y: DY, size: 58, col: 'txt', suf: ' MIN', miles: false, libre: true,
  v: [[w(7, 0), 0], [w(7, 1) + 0.3, 10, 'out']], caja: [-88, -34, 176, 68] });
E.sfx(w(7, 0), 'fill');
E.obj('rotPeq', 'rotulo', { t0: w(7, 3) - 0.05, t1: w(7, 5), sale: 0.15, x: DX, y: -470, texto: 'LO PEQUEÑO', size: 28, col: GRIS, pop: true, caja: [-115, -17, 230, 34] });
E.obj('rotNo', 'rotulo', { t0: w(7, 6) - 0.05, t1: w(7, 9), sale: 0.15, x: DX, y: -470, texto: 'NO SE CIERRA', size: 28, col: ROJO, pop: true, caja: [-130, -17, 260, 34] });
E.temblor(w(7, 8), 12, 0.4);
E.obj('rotDec', 'rotulo', { t0: w(7, 10), t1: fin(2) - 0.1, sale: 0.2, x: DX, y: -470, texto: 'DECIDE QUIEN CONVOCA', size: 26, col: AM, pop: true, caja: [-205, -17, 410, 34] });
E.obj('ch2', 'chispas', { t0: C7 + 0.4, t1: C7 + 1.2, x: DX, y: DY, r0: 130, r1: 220, inspeccion: false });
E.golpe(C7 + 0.4, 0.04); E.destello(C7 + 0.4, 0.12);

// ---------- 3 · lo fácil, por escrito ----------
// 8: La(0) tercera(1) lo(2) fácil(3) por(4) escrito(5)
// 9: Lo(0) que(1) se(2) resuelve(3) con(4) un(5) mensaje(6) no(7) necesita(8) una(9) reunión(10)
E.numero(3, N[2].T, N[2].S, { desde: 'diez', hacia: 'tel' });
const TX = -90;
E.figura('yoP3', { t0: N[2].S - 0.1, t1: TC, x: -360, cara: true,
  poses: [[0, 'de_pie'], [w(8, 2), 'ofrecer'], [w(8, 4), 'coger'], [w(9, 0), 'ofrecer'], [w(9, 3), 'senalar'], [w(9, 7), 'encoger'], [wf(9, -1), 'celebrar']],
  sonrisa: [[0, 0.2], [w(8, 4), 0.8], [w(9, 3), 1], [w(9, 7), 0.6], [wf(9, -1), 1.5]] });
E.obj('tel', 'telefono', { t0: N[2].S - 0.1, t1: TC, x: TX, y: -230, w: 150, h: 260, pop: true, r: 70,
  vibra: [[w(8, 4), 0], [w(8, 4) + 0.1, 1], [w(8, 5) + 0.3, 1], [w(8, 5) + 0.5, 0], [w(9, 5), 0], [w(9, 6), 1], [w(9, 6) + 0.35, 0]],
  brillo: [[w(8, 2), 0.3], [w(8, 4), 1]], avisos: [[w(9, 5), 0], [w(9, 6) + 0.2, 1, 'out']], caja: [-80, -165, 195, 300] });
E.obj('msg', 'bocadillo', { t0: w(8, 4), t1: TC, x: TX - 10, y: -468, w: 130, h: 60, pop: true, on: [[w(8, 4), 0], [w(8, 5) + 0.2, 1]], caja: [-65, -30, 130, 86] });
// la reunión que sobra: tres compañeros esperando, que se apagan cuando el mensaje lo resuelve
[0, 1, 2].forEach(i => E.figura('re' + i, { t0: N[2].S + i * 0.1, t1: TC, x: 190 + i * 105, talla: 230, color: 'gris', dir: -1,
  poses: [[0, 'de_pie'], [w(8, 3) + i * 0.1, i === 1 ? 'pensar' : 'encoger'], [w(9, 0), 'de_pie'], [w(9, 6) + 0.2 + i * 0.08, 'celebrar', 0.3], [w(9, 9), 'de_pie']],
  luz: [[0, 1], [w(9, 7), 1], [w(9, 8) + 0.2, 0.35]] }));
E.obj('resuelve', 'relleno', { t0: w(9, 0) - 0.1, t1: TC, x: 295, y: -440, w: 310, h: 40, pop: true, rotulo: 'SE RESUELVE',
  f: [[w(9, 2), 0], [w(9, 6) + 0.3, 1, 'out']], barrido: [w(9, 6) + 0.35], caja: [-155, -54, 310, 74] });
E.sfx(w(9, 2), 'fill');
E.obj('ch3', 'chispas', { t0: w(9, 6) + 0.3, t1: w(9, 6) + 1.1, x: 295, y: -440, r0: 100, r1: 200, inspeccion: false });
E.golpe(w(9, 6) + 0.3, 0.04);
E.obj('rotReu', 'rotulo', { t0: w(9, 9) - 0.05, t1: TC, x: 295, y: -300, texto: 'REUNIÓN', size: 28, col: GRIS, pop: true, luz: [[0, 1], [w(9, 10) + 0.3, 1], [wf(9, -1) + 0.2, 0.5]], caja: [-85, -17, 170, 34] });
E.temblor(w(9, 8), 8, 0.3);
E.destello(wf(9, -1), 0.12);

// ---------- cierre: resumen y envío ----------
// 10: Discutir(0) mucho(1) de(2) algo(3) no(4) lo(5) hace(6) más(7) importante(8)
// 11: Mándaselo(0) a(1) ese(2) compañero(3) que(4) convoca(5) reuniones(6) para(7) todo(8)
E.sfx(TC, 'cut');
E.obj('rayosC', 'rayos', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(10, 6), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, items: ['Lo importante', 'Un tiempo', 'Por escrito'], gap: 280,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(10, 4)], caja: [-410, -60, 820, 200] });
E.obj('confC', 'confeti', { t0: wf(10, -1), t1: wf(10, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(10, -1), 0.22); E.golpe(wf(10, -1), 0.04);
E.figura('yoF', { t0: w(11, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(11, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(11, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(11, 8)], vuelo: [[wf(11, -1), 0], [wf(11, -1) + 0.5, 1, 'in']] });
