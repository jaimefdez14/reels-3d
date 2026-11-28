// L43 · Los gastos hormiga (estilo B; reglas 15, 20, 21, 24)
// Idea visual: la etiqueta de «3 €» del café suelta una moneda cada día sobre un montón que crece hasta que el contador
// rueda a 1.095 €; después las monedas se van del montón en fila, como hormigas, cada vez más apagadas.
// Tres pasos: apuntar (lista que se marca mientras se llena la barra del mes), separar (dos tarros: lo que usas se
// llena y se tapa, lo que no se va fuera) y apartar (las monedas pasan a otra cuenta, que se llena mientras el contador
// vuelve a rodar hasta 1.095 €).
// Regla 20: «Es solo un café.» va en bocadillo del muñeco del gancho; la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(2, 0), gap: 70, y: 360 } });

// «El primero: // …» → T en «El», S en la primera palabra del punto
const N = [3, 5, 7].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(9, 0) - 0.1;   // resumen
const ROJO = '#e4574f';
const GRIS = '#9a9c9b';

E.camara([
  [0, [0, -380, 1.04]], [w(0, 6), [15, -385, 1.06]], [w(0, 11), [0, -390, 1.08]], [w(1, 0), [-10, -380, 1.02]], [w(1, 4), [10, -385, 1.04]], [wf(1, -1), [20, -390, 1.06]],
  [w(2, 0), [0, -380, 1.02]], [w(2, 4), [-10, -385, 1.05]], [N[0].T, [10, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [15, -385, 1.03]], [w(4, 6), [-10, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 0), [-15, -385, 1.03]], [w(6, 9), [15, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(8, 0), [15, -385, 1.03]], [w(8, 9), [0, -390, 1.06]], [TC, [0, -390, 1.05]],
]);

// moneda pequeña que vuela de un sitio a otro (no cuenta para el inspector: va de paso)
const vuela = (id, a, x1, y1, x2, y2, o) => E.obj(id, 'moneda', Object.assign({ t0: a, t1: a + 0.55, entra: 0.05, sale: 0.12, r: 18, n: '', libre: true, estela: 4, sfx: false, inspeccion: false,
  x: [[a, x1], [a + 0.5, x2, 'inout']], y: [[a, y1], [a + 0.25, Math.min(y1, y2) - 50], [a + 0.5, y2, 'in']] }, o || {}));

// ---------- gancho ----------
// 0: Un(0) café(1) de(2) tres(3) euros(4) al(5) día(6) no(7) parece(8) nada(9) Son(10) 1.095(11) euros(12) al(13) año(14)   [bocadillo «Es solo un café.»]
// 1: Se(0) llaman(1) gastos(2) hormiga(3) pequeños(4) diarios(5) y(6) casi(7) invisibles(8)
// 2: Tres(0) pasos(1) para(2) encontrarlos(3) y(4) recortarlos(5)
const HX = 170;
E.figura('yo', { t0: 0, t1: fin(0), x: -340, cara: true,
  poses: [[0, 'ofrecer'], [w(0, 3), 'senalar'], [w(0, 7), 'encoger'], [w(0, 10), 'apartarse'], [w(0, 11) + 0.5, 'manos_cabeza'],
    [w(1, 0), 'de_pie'], [w(1, 2), 'senalar'], [w(1, 4), 'coger'], [w(1, 5), 'senalar'], [w(1, 7), 'pensar'], [wf(1, -1), 'encoger'],
    [w(2, 0), 'de_pie'], [w(2, 1), 'senalar'], [w(2, 3), 'pensar'], [w(2, 5), 'celebrar']],
  sonrisa: [[0, 1.2], [w(0, 7), 0.9], [w(0, 10), -0.4], [w(0, 11) + 0.5, -1.4], [w(1, 0), -0.2], [w(1, 2), 0.3], [w(1, 7), -0.3], [w(2, 1), 0.5], [w(2, 5), 1.4]] });
// regla 20: la excusa va en bocadillo, sin voz
E.obj('bocaH', 'bocadillo', { t0: 0.2, t1: w(0, 10), sale: 0.2, x: -110, y: -490, w: 300, h: 80, texto: 'Es solo un café.', size: 30, pop: true,
  on: [[0.2, 0], [0.7, 1]], caja: [-150, -40, 300, 106] });
// el café: etiqueta de 3 € que late cada día y suelta una moneda sobre el montón
const DIAS0 = [0.25, 0.7, 1.15, 1.6, 2.05];
E.obj('cafe', 'etiqueta', { t0: 0, t1: w(1, 0), sale: 0.25, x: HX, y: -470, w: 200, h: 88, v: 3, miles: false,
  s: [[0, 1]].concat(...DIAS0.map(a => [[a, 1], [a + 0.1, 1.12], [a + 0.3, 1]])), caja: [-100, -44, 200, 88] });
DIAS0.forEach((a, i) => { vuela('dia' + i, a, HX, -410, HX, -30 - i * 20, { x: HX, y: [[a, -410], [a + 0.5, -40 - i * 20, 'in']] }); E.sfx(a + 0.5, 'tick'); });
E.obj('montonH', 'pila', { t0: 0, t1: w(2, 0) - 0.05, sale: 0.25, x: HX, n: 10, w: 180, hh: 24,
  k: [[0, 1], ...DIAS0.map((a, i) => [a + 0.55, 2 + i, 'out']), [w(0, 11), 7], [w(0, 11) + 0.6, 10, 'out'],
    [w(1, 4), 10], [wf(1, -1), 4, 'lin'], [w(2, 0) - 0.3, 4]],
  luz: [[0, 1], [w(1, 7), 1], [wf(1, -1), 0.55]], barrido: [w(0, 11) + 0.6], caja: [-90, -212, 180, 212], refl: true });
E.obj('rotH', 'rotulo', { t0: 0, t1: w(2, 0) - 0.3, sale: 0.2, x: HX, y: 60, size: 28, col: '#c9ccca',
  texto: [[0, 'AL DÍA'], [w(0, 10), 'AL AÑO'], [w(1, 4), 'PEQUEÑOS'], [w(1, 5), 'DIARIOS'], [w(1, 7), 'CASI INVISIBLES']],
  caja: [-160, -17, 320, 34] });
E.obj('diasH', 'dias', { t0: 0, t1: w(2, 0) - 0.3, sale: 0.2, x: HX, y: 140, gap: 70,
  luz: [[0, 1], [0.25, 1], [2.05, 5, 'lin'], [w(0, 10), 6], [w(1, 5) - 0.1, 6], [w(1, 5), 1], [w(1, 7) + 0.3, 6, 'lin']], caja: [-240, -32, 480, 64] });
// «Son 1.095 euros al año»: el contador rueda y el montón se dispara
E.obj('total', 'contador', { t0: w(0, 10), t1: w(1, 0), sale: 0.25, x: HX, y: -320, size: 64, suf: ' €', pop: true,
  v: [[w(0, 10), 3], [w(0, 11) + 0.6, 1095, 'inout']], barrido: [w(0, 11) + 0.65], caja: [-150, -40, 300, 80] });
E.sfx(w(0, 10), 'fill');
E.obj('chH', 'chispas', { t0: w(0, 11) + 0.6, t1: w(0, 11) + 1.4, x: HX, y: -320, r0: 150, r1: 250, inspeccion: false });
E.temblor(w(0, 11) + 0.6, 14, 0.45); E.golpe(w(0, 11) + 0.6, 0.05); E.destello(w(0, 11) + 0.6, 0.15); E.sfx(w(0, 11) + 0.6, 'thud');
// «gastos hormiga»: el nombre arriba; las monedas se van del montón en fila, cada vez más apagadas
E.obj('rotHormiga', 'rotulo', { t0: w(1, 2) - 0.1, t1: w(2, 0) - 0.3, sale: 0.2, x: HX, y: -470, texto: 'GASTOS HORMIGA', size: 36, col: '#e6ce46', peso: 700, pop: true, caja: [-200, -22, 400, 44] });
E.obj('chHormiga', 'chispas', { t0: w(1, 3), t1: w(1, 3) + 0.8, x: HX, y: -470, r0: 120, r1: 240, inspeccion: false });
E.golpe(w(1, 3), 0.04); E.destello(w(1, 3), 0.1);
for (let i = 0; i < 7; i++) { const a = w(1, 3) + 0.2 + i * 0.36, f = Math.max(0.2, 1 - i * 0.13);
  E.obj('hormiga' + i, 'moneda', { t0: a, t1: a + 1.5, entra: 0.1, sale: 0.3, r: 13, n: '', libre: true, sfx: false, inspeccion: false, luz: f,
    x: [[a, HX + 100], [a + 1.5, HX + 350, 'lin']], y: [[a, -14], [a + 0.19, -24], [a + 0.38, -14], [a + 0.57, -24], [a + 0.76, -14], [a + 0.95, -24], [a + 1.14, -14], [a + 1.33, -24], [a + 1.5, -14]] });
  E.sfx(a, 'tick'); }
// «Tres pasos»: tres monedas; la primera crece y pasa al paso uno
E.obj('rayosH', 'rayos', { t0: w(2, 0), t1: fin(0), x: HX, y: -330, r: 300, z: -2, p: [[w(2, 0), 0], [w(2, 3), 1, 'out']], inspeccion: false });
[0, 1, 2].forEach(i => { const a = w(2, 0) + i * 0.12;
  E.obj('r' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: HX + (i - 1) * 125, y: -330, r: 40, n: i + 1, pop: true, sfx: true, inspeccion: false,
    s: i === 0 ? [[0, 1], [w(2, 3), 1], [w(2, 3) + 0.35, 1.4, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [w(2, 4), 1], [w(2, 4) + 0.3, 0.4]], barrido: i === 0 ? [w(2, 5)] : null }); });
E.obj('chR', 'chispas', { t0: w(2, 3) + 0.3, t1: w(2, 3) + 1.1, x: HX - 125, y: -330, r0: 60, r1: 150, inspeccion: false });
E.destello(w(2, 3), 0.12);

// ---------- 1 · apunta todo lo que pagues durante un mes ----------
// 3: El(0) primero(1) apunta(2) todo(3) lo(4) que(5) pagues(6) durante(7) un(8) mes(9)
// 4: Café(0) suscripciones(1) comisiones(2) gastos(3) de(4) envío(5) Lo(6) que(7) no(8) se(9) apunta(10) no(11) se(12) ve(13)
E.numero(1, N[0].T, N[0].S, { desde: 'r1', hacia: 'apunte' });
const LX = 150;
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(3, 2), 'ofrecer'], [w(3, 7), 'senalar'], [w(4, 0), 'ofrecer'], [w(4, 1), 'senalar'], [w(4, 2), 'ofrecer'], [w(4, 3), 'senalar'],
    [w(4, 6), 'encoger'], [w(4, 11), 'pensar'], [wf(4, -1) + 0.1, 'celebrar']],
  sonrisa: [[0, 0.2], [w(3, 2), 0.7], [w(4, 6), -0.3], [w(4, 11), 0], [wf(4, -1) + 0.1, 1.5]] });
const AP = [w(4, 0), w(4, 1), w(4, 2), w(4, 3)];
E.obj('apunte', 'lista', { t0: N[0].S - 0.1, t1: fin(1), x: LX, y: -270, n: 4, w: 300, gap: 62, pop: true, sobrevive: true, r: 70,
  p: [[w(3, 2), 0], [AP[0], 0], [AP[0] + 0.3, 1, 'out'], [AP[1], 1], [AP[1] + 0.3, 2, 'out'], [AP[2], 2], [AP[2] + 0.3, 3, 'out'], [AP[3], 3], [AP[3] + 0.3, 4, 'out']],
  brillo: [[w(3, 2), 0], [w(3, 6) + 0.2, 4, 'lin']], caja: [-150, -115, 300, 230] });
E.obj('mes', 'relleno', { t0: N[0].S - 0.05, t1: fin(1) - 0.2, sale: 0.2, x: LX, y: -460, w: 340, h: 40, pop: true, rotulo: 'UN MES',
  f: [[w(3, 7), 0], [wf(3, -1) + 0.2, 0.2, 'out'], [AP[0], 0.2], [AP[0] + 0.4, 0.4, 'out'], [AP[1], 0.4], [AP[1] + 0.4, 0.6, 'out'], [AP[2], 0.6], [AP[2] + 0.4, 0.8, 'out'], [AP[3], 0.8], [AP[3] + 0.5, 1, 'out']],
  barrido: [AP[3] + 0.5], caja: [-170, -54, 340, 74] });
E.sfx(w(3, 7), 'fill');
E.obj('rotP1', 'rotulo', { t0: AP[0] - 0.1, t1: fin(1) - 0.2, sale: 0.2, x: LX, y: -100, size: 28, pop: true,
  texto: [[0, 'CAFÉ'], [AP[1], 'SUSCRIPCIONES'], [AP[2], 'COMISIONES'], [AP[3], 'GASTOS DE ENVÍO'], [w(4, 6), 'NO SE APUNTA'], [w(4, 11), 'NO SE VE'], [wf(4, -1) + 0.1, 'APUNTADO']],
  col: '#c9ccca', caja: [-170, -17, 340, 34] });
AP.forEach((a, i) => { vuela('ap' + i, a - 0.25, -240, -300, LX - 132, -270 + (i - 1.5) * 62); E.sfx(a + 0.25, 'tick'); E.golpe(a + 0.25, 0.015); });
E.obj('chMes', 'chispas', { t0: AP[3] + 0.5, t1: AP[3] + 1.3, x: LX + 170, y: -460, r0: 40, r1: 120, inspeccion: false });
// «Lo que no se apunta no se ve»: una moneda sin apuntar se va por el suelo y se apaga
[0, 1, 2].forEach(i => { const a = w(4, 6) + i * 0.3;
  E.obj('noVe' + i, 'moneda', { t0: a, t1: wf(4, -1) + 0.1, entra: 0.1, sale: 0.3, r: 15, n: '', libre: true, sfx: false, inspeccion: false,
    luz: [[a, 0.9], [w(4, 11), 0.5], [wf(4, -1), 0.12, 'lin']], x: [[a, 20], [wf(4, -1) + 0.1, 330 - i * 70, 'lin']], y: -16 }); });
E.temblor(w(4, 13), 8, 0.3);
E.obj('ch1', 'chispas', { t0: wf(4, -1) + 0.1, t1: wf(4, -1) + 0.9, x: LX, y: -270, r0: 130, r1: 230, inspeccion: false });
E.golpe(wf(4, -1) + 0.1, 0.04); E.destello(wf(4, -1) + 0.1, 0.1);

// ---------- 2 · sepáralo en lo que usas y lo que no ----------
// 5: El(0) segundo(1) sepáralo(2) en(3) lo(4) que(5) usas(6) y(7) lo(8) que(9) no(10)
// 6: Lo(0) que(1) te(2) da(3) algo(4) a(5) cambio(6) se(7) queda(8) Lo(9) que(10) pagas(11) por(12) inercia(13) fuera(14)
E.numero(2, N[1].T, N[1].S, { desde: 'apunte', hacia: 'usas' });
const UX = 40, NX = 320;
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'ofrecer'], [w(5, 6), 'senalar'], [w(5, 8), 'ofrecer'], [w(6, 0), 'senalar'], [w(6, 7), 'celebrar'], [w(6, 9), 'de_pie'], [w(6, 11), 'encoger'], [w(6, 14), 'apartarse'], [wf(6, -1) + 0.2, 'celebrar']],
  sonrisa: [[0, 0.2], [w(5, 2), 0.5], [w(6, 0), 0.8], [w(6, 7), 1.5], [w(6, 9), 0.2], [w(6, 11), -0.5], [wf(6, -1) + 0.2, 1.4]] });
const SALE = w(6, 14);
E.obj('usas', 'tarro', { t0: N[1].S - 0.1, t1: fin(2), x: UX, w: 170, h: 220, pop: true, sobrevive: true, r: 70, oy: -110,
  nivel: [[w(5, 2), 0], [w(5, 2) + 0.5, 0.2, 'out'], [w(5, 6), 0.2], [w(5, 6) + 0.5, 0.45, 'out'], [w(6, 2), 0.45], [w(6, 6) + 0.3, 0.8, 'out']],
  tapa: [[w(6, 7), 0], [w(6, 8) + 0.2, 1, 'out']], barrido: [w(6, 8) + 0.25], caja: [-85, -225, 170, 225], refl: true });
E.obj('noUsas', 'tarro', { t0: N[1].S + 0.1, t1: SALE + 0.5, sale: 0.3, w: 170, h: 220, pop: true, apagado: 1,
  x: [[0, NX], [SALE, NX], [SALE + 0.5, NX + 110, 'in']], rot: [[SALE, 0], [SALE + 0.5, 0.5, 'in']],
  nivel: [[w(5, 3), 0], [w(5, 3) + 0.5, 0.15, 'out'], [w(5, 8), 0.15], [w(5, 10) + 0.4, 0.5, 'out']],
  luz: [[0, 1], [w(6, 9), 1], [w(6, 11), 0.7]], caja: [-85, -225, 170, 225], refl: true });
E.sfx(w(5, 2), 'fill'); E.sfx(w(6, 2), 'fill'); E.sfx(SALE, 'whoosh');
E.obj('rotUsas', 'rotulo', { t0: w(5, 4) - 0.1, t1: fin(2) - 0.2, sale: 0.2, x: UX, y: 50, size: 26, pop: true, col: '#e6ce46',
  texto: [[0, 'LO QUE USAS'], [w(6, 7), 'SE QUEDA']], caja: [-125, -16, 250, 32] });
E.obj('rotNo', 'rotulo', { t0: w(5, 8) - 0.1, t1: SALE + 0.3, sale: 0.2, x: NX, y: 50, size: 26, pop: true, col: GRIS,
  texto: [[0, 'LO QUE NO'], [w(6, 11), 'POR INERCIA']], caja: [-125, -16, 250, 32] });
E.obj('rotFuera', 'rotulo', { t0: SALE, t1: fin(2) - 0.2, sale: 0.2, x: NX, y: -300, texto: 'FUERA', size: 40, col: ROJO, peso: 700, pop: true, caja: [-90, -24, 180, 48] });
// las monedas salen de la mano del muñeco y caen a un tarro o al otro
[[w(5, 2), 1], [w(5, 3), 0], [w(5, 6), 1], [w(5, 8) + 0.1, 0], [w(5, 10), 0], [w(6, 2), 1], [w(6, 4), 1], [w(6, 6), 1]].forEach(([a, u], i) => {
  vuela('sep' + i, a - 0.1, -240, -300, u ? UX : NX, -150, u ? {} : { luz: 0.45 }); E.golpe(a + 0.4, 0.012); });
E.obj('chUsas', 'chispas', { t0: w(6, 8) + 0.2, t1: w(6, 8) + 1.0, x: UX, y: -110, r0: 140, r1: 240, inspeccion: false });
E.golpe(w(6, 8) + 0.2, 0.04); E.sfx(w(6, 8) + 0.2, 'thud');
E.temblor(SALE, 10, 0.35);
E.destello(wf(6, -1) + 0.2, 0.1);

// ---------- 3 · lo que quites, apártalo a otra cuenta el día que cobras ----------
// 7: El(0) tercero(1) lo(2) que(3) quites(4) apártalo(5) a(6) otra(7) cuenta(8) el(9) día(10) que(11) cobras(12)
// 8: Quita(0) esos(1) tres(2) euros(3) y(4) en(5) un(6) año(7) tienes(8) 1.095(9) euros(10)
E.numero(3, N[2].T, N[2].S, { desde: 'usas', hacia: 'cuenta' });
const QX = 20, CX = 320;
E.figura('yo3', { t0: N[2].S - 0.1, t1: TC, x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(7, 2), 'senalar'], [w(7, 5), 'ofrecer'], [w(7, 9), 'senalar'], [w(7, 12), 'celebrar'], [w(8, 0), 'coger'], [w(8, 2), 'ofrecer'], [w(8, 5), 'senalar'], [w(8, 9) + 0.6, 'celebrar']],
  sonrisa: [[0, 0.3], [w(7, 5), 0.7], [w(7, 12), 1.2], [w(8, 0), 0.6], [w(8, 9) + 0.6, 1.6]] });
E.obj('quitas', 'pila', { t0: N[2].S, t1: w(8, 0) - 0.1, sale: 0.2, x: QX, n: 6, w: 140, hh: 22, pop: true,
  k: [[w(7, 2), 0], [w(7, 4) + 0.2, 3, 'out'], [w(7, 5), 3], [w(7, 8) + 0.2, 0, 'lin'], [w(7, 9), 0], [w(7, 12), 6, 'out'], [w(7, 12) + 0.15, 6], [w(7, 12) + 0.4, 5, 'out']],
  barrido: [w(7, 12)], caja: [-70, -115, 140, 115], refl: true });
vuela('cobro', w(7, 12) + 0.15, QX, -120, CX, -190);
E.obj('cuenta', 'tarro', { t0: N[2].S - 0.1, t1: TC, x: CX, w: 180, h: 230, pop: true,
  nivel: [[w(7, 5), 0], [w(7, 8) + 0.5, 0.12, 'out'], [w(7, 12) + 0.6, 0.12], [w(7, 12) + 0.9, 0.18, 'out'], [w(8, 2), 0.18], [w(8, 9) + 0.6, 1, 'inout']],
  tapa: [[w(8, 9) + 0.6, 0], [wf(8, -1), 1, 'out']], barrido: [w(8, 9) + 0.65], caja: [-90, -235, 180, 235], refl: true });
E.obj('rotCuenta', 'rotulo', { t0: N[2].S, t1: TC, x: CX, y: 50, texto: 'OTRA CUENTA', size: 26, col: '#e6ce46', pop: true, caja: [-125, -16, 250, 32] });
E.sfx(w(7, 5), 'fill'); E.sfx(w(8, 2), 'fill');
[0, 1, 2].forEach(i => { const a = w(7, 5) + i * 0.28; vuela('apa' + i, a, QX, -70 + i * 18, CX, -190); E.golpe(a + 0.5, 0.012); });
E.obj('rotP3', 'rotulo', { t0: w(7, 3), t1: TC, x: QX - 30, y: 50, size: 24, pop: true, col: '#c9ccca',
  texto: [[0, 'LO QUE QUITES'], [w(7, 9), 'EL DÍA QUE COBRAS'], [w(8, 0), 'TRES EUROS'], [w(8, 5), 'EN UN AÑO']], caja: [-150, -16, 300, 32] });
E.obj('pulsoCobro', 'pulso', { t0: w(7, 12) + 0.65, t1: w(7, 12) + 1.25, x: CX, y: -120, r0: 100, r1: 200, inspeccion: false });
E.golpe(w(7, 12), 0.03); E.sfx(w(7, 12), 'thud');
// «Quita esos tres euros»: la etiqueta del café vuelve y cada día manda su moneda a la otra cuenta
E.obj('cafe3', 'etiqueta', { t0: w(8, 0), t1: TC, x: QX, y: -190, w: 190, h: 84, v: 3, miles: false, pop: true,
  on: [[w(8, 0), 1], [w(8, 9) + 0.6, 1], [wf(8, -1), 0.3]], caja: [-95, -42, 190, 84] });
for (let i = 0; i < 9; i++) { const a = w(8, 2) + i * 0.24; vuela('aho' + i, a, QX + 60, -190, CX, -180, { r: 16, y: [[a, -190], [a + 0.25, -236], [a + 0.5, -180, 'in']] }); }
E.obj('anio', 'relleno', { t0: w(8, 4), t1: TC, x: QX - 10, y: -450, w: 320, h: 40, pop: true, rotulo: 'UN AÑO',
  f: [[w(8, 5), 0], [w(8, 9) + 0.6, 1, 'inout']], barrido: [w(8, 9) + 0.65], caja: [-160, -54, 320, 74] });
E.sfx(w(8, 5), 'fill');
E.obj('total3', 'contador', { t0: w(8, 4), t1: TC, x: CX, y: -310, size: 60, suf: ' €', pop: true,
  v: [[w(8, 4), 0], [w(8, 8), 240, 'in'], [w(8, 9) + 0.6, 1095, 'out']], barrido: [w(8, 9) + 0.65], caja: [-145, -38, 290, 76] });
E.obj('ch3', 'chispas', { t0: w(8, 9) + 0.6, t1: w(8, 9) + 1.4, x: CX, y: -310, r0: 150, r1: 250, inspeccion: false });
E.golpe(w(8, 9) + 0.6, 0.05); E.destello(w(8, 9) + 0.6, 0.14); E.sfx(w(8, 9) + 0.6, 'thud');

// ---------- cierre: resumen y envío ----------
// 9: No(0) es(1) cuestión(2) de(3) dejar(4) de(5) disfrutar(6) sino(7) de(8) decidir(9) en(10) qué(11) se(12) te(13) va(14) el(15) dinero(16)
// 10: Mándaselo(0) a(1) ese(2) amigo(3) que(4) dice(5) que(6) no(7) sabe(8) en(9) qué(10) se(11) le(12) va(13) el(14) dinero(15)
E.sfx(TC, 'cut');
E.obj('rayosC', 'rayos', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(9, 7), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, items: ['Apúntalo', 'Sepáralo', 'Apártalo'], gap: 240,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(9, 7), w(9, 9)], caja: [-360, -60, 720, 200] });
E.obj('confC', 'confeti', { t0: wf(9, -1), t1: wf(9, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(9, -1), 0.22); E.golpe(wf(9, -1), 0.04);
E.figura('yoF', { t0: w(10, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(10, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(10, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(10, 8)], vuelo: [[wf(10, -1), 0], [wf(10, -1) + 0.5, 1, 'in']] });
