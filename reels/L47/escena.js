// L47 · El método de la avalancha (estilo B; reglas 15, 20, 21, 24)
// Idea visual: la tarjeta se come 2 de cada 10 monedas (el contador rueda hasta 200 €). Tres deudas en columna: se apuntan
// en una lista con su «%», se paga un poco de todas y lo que sobra del tarro va a la primera, y al liquidarla su cuota
// pasa a la siguiente barra, que se llena en cascada.
// Regla 20: «Solo pago el mínimo.» va en bocadillo del muñeco del gancho; la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.1 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(2, 3), gap: 70, y: 360 } });

// «El primero: // …» → T en «El», S en la primera palabra del paso
const N = [3, 5, 7].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(9, 0) - 0.1;   // resumen
const GRIS = '#9a9c9b', AM = '#e6ce46';

E.camara([
  [0, [0, -380, 1.04]], [w(0, 3), [10, -385, 1.06]], [w(0, 7), [15, -388, 1.07]], [w(0, 11), [0, -385, 1.05]], [w(1, 0), [0, -380, 1.02]], [w(1, 6), [10, -385, 1.04]],
  [w(1, 12), [15, -388, 1.06]], [w(2, 0), [0, -380, 1.02]], [N[0].T, [10, -390, 1.05]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [12, -385, 1.03]], [w(4, 7), [0, -385, 1.05]], [N[1].T, [0, -390, 1.05]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 0), [-10, -385, 1.03]], [w(6, 8), [10, -385, 1.04]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(8, 0), [-10, -385, 1.03]], [w(8, 8), [8, -385, 1.04]], [TC - 0.1, [0, -385, 1.04]], [TC, [0, -390, 1.05]],
]);

// moneda suelta que vuela de un sitio a otro (sin inspección: dura medio segundo)
const vuela = (id, a, de, hasta, r) => E.obj(id, 'moneda', { t0: a, t1: a + 0.6, entra: 0.06, sale: 0.12, r: r || 18, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
  x: [[a, de[0]], [a + 0.5, hasta[0], 'inout']], y: [[a, de[1]], [a + 0.25, Math.min(de[1], hasta[1]) - 50], [a + 0.5, hasta[1], 'in']] });

// ---------- gancho ----------
// 0: Una(0) tarjeta(1) al(2) 20(3) %(4) te(5) cobra(6) 200(7) euros(8) al(9) año(10) por(11) cada(12) mil(13) que(14) debes(15)   [bocadillo «Solo pago el mínimo.»]
// 1: Se(0) llama(1) método(2) de(3) la(4) avalancha(5) y(6) sirve(7) para(8) salir(9) de(10) deudas(11) pagar(12) antes(13) la(14) que(15) más(16) intereses(17) tiene(18)
// 2: Se(0) hace(1) en(2) tres(3) pasos(4)
const TX = 215, CX = 300;
E.figura('yo', { t0: 0, t1: fin(0), x: -340, cara: true,
  poses: [[0, 'ofrecer'], [w(0, 3), 'senalar'], [w(0, 7), 'manos_cabeza'], [w(0, 11), 'encoger'], [w(0, 15), 'triste'],
    [w(1, 0), 'de_pie'], [w(1, 2), 'senalar'], [w(1, 7), 'celebrar'], [w(1, 12), 'ofrecer'], [w(1, 16), 'senalar'], [wf(1, -1), 'celebrar'],
    [w(2, 0), 'de_pie'], [w(2, 3), 'senalar']],
  sonrisa: [[0, 0.6], [w(0, 3), 0.2], [w(0, 7), -1.2], [w(0, 15), -1.4], [w(1, 0), 0], [w(1, 2), 0.6], [w(1, 7), 1.3], [w(1, 12), 0.6], [wf(1, -1), 1.4], [w(2, 0), 0.4], [w(2, 3), 0.9]] });
// regla 20: lo que dice el muñeco va en bocadillo, sin voz
E.obj('bocaH', 'bocadillo', { t0: 0.25, t1: w(0, 11), sale: 0.2, x: -95, y: -445, w: 340, h: 76, texto: 'Solo pago el mínimo.', size: 30, pop: true,
  on: [[0.25, 0], [0.7, 1]], caja: [-170, -38, 340, 102] });
// la tarjeta (bloque gris con su nombre) y la pila de diez monedas que debes
E.obj('tarj', 'bloques', { t0: 0, t1: w(1, 0), sale: 0.25, x: TX, y: -440, n: 1, w: 220, h: 120, texto: 'TARJETA',
  s: [[0, 1], [w(0, 7) + 0.4, 1], [w(0, 7) + 0.55, 1.12], [w(0, 7) + 0.8, 1]], caja: [-110, -60, 220, 120] });
E.obj('pilaH', 'pila', { t0: 0, t1: w(1, 0), sale: 0.25, x: CX, n: 10, w: 170, hh: 20, refl: true,
  k: [[0, 6], [0.45, 10, 'out'], [w(0, 7), 10], [w(0, 7) + 0.5, 8, 'inout']], barrido: [w(0, 13)], caja: [-85, -166, 170, 166] });
E.sfx(0.05, 'fill');
vuela('pago0', 0.12, [-250, -270], [TX - 60, -400]);
E.obj('pct', 'contador', { t0: w(0, 2) - 0.1, t1: w(1, 0), sale: 0.25, x: TX + 205, y: -440, size: 60, suf: ' %', miles: false, pop: true,
  v: [[w(0, 2), 0], [w(0, 3) + 0.3, 20, 'out']], barrido: [w(0, 4)], caja: [-80, -36, 160, 72] });
E.obj('c200', 'contador', { t0: w(0, 5), t1: w(1, 0), sale: 0.25, x: CX, y: -290, size: 92, suf: ' €', miles: false, pop: true,
  v: [[w(0, 6), 0], [w(0, 7) + 0.45, 200, 'out']], barrido: [w(0, 8)], caja: [-150, -52, 300, 104] });
[0, 1].forEach(i => vuela('cobra' + i, w(0, 7) + i * 0.18, [CX, -170], [TX, -400], 22));
E.obj('chH', 'chispas', { t0: w(0, 7) + 0.45, t1: w(0, 7) + 1.25, x: CX, y: -290, r0: 150, r1: 240, inspeccion: false });
E.temblor(w(0, 7) + 0.45, 14, 0.45); E.golpe(w(0, 7) + 0.45, 0.05); E.destello(w(0, 7) + 0.45, 0.14);
E.obj('rotAnio', 'rotulo', { t0: w(0, 9), t1: w(1, 0), sale: 0.25, x: CX, y: -206, texto: 'AL AÑO', size: 28, col: GRIS, pop: true, caja: [-70, -16, 140, 32] });
E.obj('rotMil', 'rotulo', { t0: w(0, 11), t1: w(1, 0), sale: 0.25, x: CX, y: 60, texto: 'POR CADA MIL', size: 28, col: AM, pop: true, caja: [-130, -17, 260, 34] });
E.obj('pulsoMil', 'pulso', { t0: w(0, 13), t1: w(0, 13) + 0.6, x: CX, y: -80, r0: 60, r1: 170, inspeccion: false });
E.golpe(w(0, 15), 0.03);

// «Se llama método de la avalancha»: tres deudas de menor a mayor interés; se paga antes la más alta
E.obj('rotAv', 'rotulo', { t0: w(1, 2) - 0.1, t1: w(2, 0), sale: 0.25, x: 200, y: -480, texto: 'MÉTODO DE LA AVALANCHA', size: 30, col: AM, peso: 700, pop: true, caja: [-270, -20, 540, 40] });
E.obj('chAv', 'chispas', { t0: w(1, 5), t1: w(1, 5) + 0.8, x: 200, y: -480, r0: 130, r1: 250, inspeccion: false });
E.golpe(w(1, 5), 0.04);
const COL = [{ x: 60, h: 90 }, { x: 220, h: 150 }, { x: 380, h: 220 }];
COL.forEach((q, i) => { const b = w(1, 8 + i);
  E.obj('col' + i, 'bloques', { t0: w(1, 0) + 0.1 + i * 0.15, t1: w(2, 0), sale: 0.25, x: q.x, y: -q.h / 2, n: 1, w: 130, h: q.h, pop: true, refl: true,
    s: [[0, 1], [b, 1], [b + 0.12, 1.08], [b + 0.3, 1]],
    luz: i === 2 ? 1 : [[0, 1], [w(1, 14), 1], [w(1, 16), 0.45]],
    hechos: i === 2 ? [[w(1, 17), 0], [wf(1, -1), 1, 'out']] : 0, caja: [-65, -q.h / 2, 130, q.h] }); E.sfx(b, 'tick'); });
E.obj('rotDeu', 'rotulo', { t0: w(1, 11) - 0.05, t1: w(2, 0), sale: 0.25, x: 220, y: 60, texto: 'DEUDAS', size: 28, col: GRIS, pop: true, caja: [-80, -17, 160, 34] });
[0, 1, 2].forEach(i => vuela('antes' + i, w(1, 12) + i * 0.22, [-250, -270], [380, -230]));
E.obj('rotMas', 'rotulo', { t0: w(1, 16) - 0.05, t1: w(2, 0), sale: 0.25, x: 380, y: -265, texto: 'MÁS INTERESES', size: 24, col: AM, pop: true, caja: [-130, -15, 260, 30] });
E.sfx(w(1, 17), 'fill');
E.obj('chCol', 'chispas', { t0: wf(1, -1), t1: wf(1, -1) + 0.8, x: 380, y: -110, r0: 90, r1: 190, inspeccion: false });
E.golpe(wf(1, -1), 0.04); E.destello(wf(1, -1), 0.1);

// «Se hace en tres pasos»: tres monedas; la primera crece y pasa al paso uno
const HX = 200;
E.obj('rayosH', 'rayos', { t0: w(2, 0) + 0.1, t1: fin(0), x: HX, y: -330, r: 300, z: -2, p: [[w(2, 0) + 0.1, 0], [w(2, 3), 1, 'out']], inspeccion: false });
[0, 1, 2].forEach(i => { const a = w(2, 1) + i * 0.12;
  E.obj('r' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: HX + (i - 1) * 125, y: -330, r: 40, n: i + 1, pop: true, sfx: true, inspeccion: false,
    s: i === 0 ? [[0, 1], [w(2, 4), 1], [w(2, 4) + 0.3, 1.4, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [wf(2, -1), 1], [wf(2, -1) + 0.25, 0.4]], barrido: i === 0 ? [wf(2, -1)] : null }); });
E.obj('chR', 'chispas', { t0: w(2, 4) + 0.25, t1: w(2, 4) + 1.05, x: HX - 125, y: -330, r0: 60, r1: 150, inspeccion: false });
E.destello(w(2, 3), 0.12);

// ---------- 1 · apunta todas tus deudas y su interés ----------
// 3: El(0) primero(1) apunta(2) todas(3) tus(4) deudas(5) y(6) lo(7) que(8) te(9) cobran(10) de(11) intereses(12)
// 4: Tarjeta(0) préstamo(1) del(2) coche(3) compras(4) a(5) plazos(6) Cada(7) una(8) con(9) su(10) interés(11)
E.numero(1, N[0].T, N[0].S, { desde: 'r1', hacia: 'apunta' });
const FY = [-430, -330, -230];
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(3, 2), 'ofrecer'], [w(3, 6), 'senalar'], [w(4, 0), 'coger'], [w(4, 1), 'ofrecer'], [w(4, 4), 'coger'], [w(4, 7), 'senalar'], [wf(4, -1), 'celebrar']],
  sonrisa: [[0, 0.2], [w(3, 2), 0.5], [w(3, 10), -0.2], [w(4, 0), 0.5], [w(4, 7), 0.8], [wf(4, -1), 1.5]] });
const TN = [w(4, 0), w(4, 1), w(4, 4)];
E.obj('apunta', 'lista', { t0: N[0].S - 0.1, t1: fin(1), x: -20, y: -330, n: 3, w: 120, gap: 100, pop: true,
  brillo: [[w(3, 2), 0], [w(3, 5) + 0.2, 3, 'lin']],
  p: [[TN[0], 0], [TN[0] + 0.3, 1, 'out'], [TN[1], 1], [TN[1] + 0.3, 2, 'out'], [TN[2], 2], [TN[2] + 0.3, 3, 'out']], caja: [-60, -120, 120, 240] });
E.sfx(w(3, 2), 'fill');
['TARJETA', 'PRÉSTAMO DEL COCHE', 'COMPRAS A PLAZOS'].forEach((s, i) => {
  E.obj('nom' + i, 'rotulo', { t0: TN[i] - 0.05, t1: fin(1) - 0.15, sale: 0.2, x: 205, y: FY[i], texto: s, size: 22, track: 2, col: '#c9ccca', pop: true, caja: [-150, -15, 300, 30] });
  E.sfx(TN[i] + 0.1, 'tick');
  const a = w(3, 10) + i * 0.14, b = w(4, 7) + i * 0.28;
  E.obj('pc' + i, 'moneda', { t0: a, t1: i === 0 ? fin(1) : N[1].T - 0.05, sale: 0.2, sobrevive: i === 0, x: 425, y: FY[i], r: 28, n: '%', pop: true, sfx: i === 0,
    s: [[0, 1], [b, 1], [b + 0.12, 1.3], [b + 0.35, 1]], caja: [-28, -28, 56, 56] });
  E.obj('pulsoPc' + i, 'pulso', { t0: b + 0.1, t1: b + 0.7, x: 425, y: FY[i], r0: 30, r1: 80, inspeccion: false }); E.sfx(b + 0.1, 'tick'); });
E.obj('rotInt', 'rotulo', { t0: w(3, 12) - 0.05, t1: fin(1) - 0.15, sale: 0.2, x: 400, y: -150, texto: 'INTERESES', size: 22, track: 3, col: AM, pop: true, caja: [-80, -15, 160, 30] });
E.obj('ch1', 'chispas', { t0: wf(4, -1), t1: wf(4, -1) + 0.8, x: 425, y: -430, r0: 40, r1: 110, inspeccion: false });
E.golpe(wf(4, -1), 0.04); E.destello(wf(4, -1), 0.1);

// ---------- 2 · la cuota mínima de todas y lo que sobre, a la de más intereses ----------
// 5: El(0) segundo(1) paga(2) la(3) cuota(4) mínima(5) de(6) todas(7)
// 6: Y(0) todo(1) lo(2) que(3) te(4) sobre(5) del(6) mes(7) a(8) la(9) que(10) más(11) intereses(12) tenga(13)
E.numero(2, N[1].T, N[1].S, { desde: 'pc0', hacia: 'b2_0' });
const BX = 110, TRX = 385;
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'ofrecer'], [w(6, 0), 'de_pie'], [w(6, 1), 'coger'], [w(6, 8), 'ofrecer'], [w(6, 11), 'senalar'], [wf(6, -1), 'celebrar']],
  sonrisa: [[0, 0.2], [w(5, 2), 0.6], [w(6, 1), 0.8], [w(6, 11), 1], [wf(6, -1), 1.5]] });
const TM = [w(5, 2) + 0.05, w(5, 4), w(5, 6)];
[0, 1, 2].forEach(i => { const y = -400 + i * 80;
  E.obj('b2_' + i, 'relleno', { t0: N[1].S - 0.1 + i * 0.08, t1: i === 0 ? fin(2) : N[2].T + 0.2, sale: 0.25, x: BX, y, w: 330, h: 40, pop: true, sobrevive: i === 0,
    f: i === 0 ? [[TM[0] + 0.4, 0], [TM[0] + 0.7, 0.14, 'out'], [w(6, 8) + 0.4, 0.14], [wf(6, -1) + 0.1, 0.8, 'inout']] : [[TM[i] + 0.4, 0], [TM[i] + 0.7, 0.14, 'out']],
    luz: i === 0 ? 1 : [[0, 1], [w(6, 9), 1], [w(6, 11), 0.5]], barrido: i === 0 ? [wf(6, -1) + 0.1] : null, caja: [-165, -20, 330, 40] });
  vuela('min' + i, TM[i], [-250, -270], [BX - 140, y]); E.sfx(TM[i] + 0.4, 'fill'); });
E.obj('rotMin', 'rotulo', { t0: w(5, 4) - 0.1, t1: w(6, 10), sale: 0.2, x: BX, y: -475, texto: 'CUOTA MÍNIMA', size: 26, col: GRIS, pop: true, caja: [-125, -16, 250, 32] });
E.obj('rotMas2', 'rotulo', { t0: w(6, 11) - 0.05, t1: fin(2) - 0.15, sale: 0.2, x: BX, y: -475, texto: 'MÁS INTERESES', size: 26, col: AM, pop: true, caja: [-135, -16, 270, 32] });
// «todo lo que te sobre del mes»: el tarro se llena; «a la que más intereses tenga»: se vacía en la primera barra
E.obj('tarro', 'tarro', { t0: w(6, 0) - 0.1, t1: fin(2) - 0.1, sale: 0.2, x: TRX, w: 150, h: 180, pop: true, refl: true,
  nivel: [[w(6, 1), 0], [w(6, 7) + 0.2, 0.85, 'out'], [w(6, 8) + 0.2, 0.85], [wf(6, -1) + 0.1, 0.06, 'inout']], caja: [-75, -180, 150, 180] });
E.obj('rotSob', 'rotulo', { t0: w(6, 5) - 0.05, t1: fin(2) - 0.15, sale: 0.2, x: TRX, y: 56, texto: 'LO QUE SOBRA', size: 22, track: 3, col: GRIS, pop: true, caja: [-110, -15, 220, 30] });
E.sfx(w(6, 1), 'fill');
[0, 1, 2, 3].forEach(i => { const a = w(6, 1) + i * (w(6, 7) - w(6, 1)) / 3.4;
  E.obj('cae' + i, 'moneda', { t0: a, t1: a + 0.5, entra: 0.05, sale: 0.15, r: 18, n: '', libre: true, estela: 4, sfx: false, inspeccion: false, x: TRX, y: [[a, -210], [a + 0.5, -60, 'in']] }); });
[0, 1, 2, 3].forEach(i => vuela('sob' + i, w(6, 8) + i * 0.2, [TRX, -150], [BX - 60 + i * 50, -400]));
E.sfx(w(6, 8) + 0.4, 'fill');
E.obj('ch2', 'chispas', { t0: wf(6, -1) + 0.1, t1: wf(6, -1) + 0.9, x: BX + 100, y: -400, r0: 50, r1: 140, inspeccion: false });
E.golpe(wf(6, -1) + 0.1, 0.04); E.destello(wf(6, -1) + 0.1, 0.12);

// ---------- 3 · cuando liquides una, pasa a la siguiente ----------
// 7: El(0) tercero(1) cuando(2) liquides(3) una(4) pasa(5) a(6) la(7) siguiente(8)
// 8: Lo(0) que(1) pagabas(2) por(3) la(4) que(5) has(6) liquidado(7) súmaselo(8) a(9) la(10) siguiente(11)
E.numero(3, N[2].T, N[2].S, { desde: 'b2_0', hacia: 'b3_0' });
const Y3 = [-400, -290, -180], PX = 410;
const L1 = w(7, 3) + 0.45, L2 = w(8, 10) + 0.25, L3 = wf(8, -1) + 0.15;
E.figura('yo3', { t0: N[2].S - 0.1, t1: TC, x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(7, 2), 'ofrecer'], [L1, 'celebrar'], [w(7, 5), 'senalar'], [w(8, 0), 'coger'], [w(8, 8), 'ofrecer'], [L2, 'celebrar']],
  sonrisa: [[0, 0.3], [L1, 1.5], [w(7, 5), 0.8], [w(8, 0), 0.6], [L2, 1.5]] });
E.obj('b3_0', 'relleno', { t0: N[2].S - 0.1, t1: TC, x: BX, y: Y3[0], w: 330, h: 40, pop: true, rotulo: [[0, 'TARJETA'], [L1, 'LIQUIDADA']],
  f: [[w(7, 2), 0.8], [L1, 1, 'out']], barrido: [L1], caja: [-165, -67, 330, 87] });
E.obj('b3_1', 'relleno', { t0: N[2].S, t1: TC, x: BX, y: Y3[1], w: 330, h: 40, pop: true, rotulo: 'COCHE',
  f: [[w(8, 8) + 0.3, 0.14], [L2, 1, 'inout']], barrido: [L2], luz: [[0, 0.55], [w(7, 5), 0.55], [w(7, 8), 1]], caja: [-165, -67, 330, 87] });
E.obj('b3_2', 'relleno', { t0: N[2].S + 0.1, t1: TC, x: BX, y: Y3[2], w: 330, h: 40, pop: true, rotulo: 'A PLAZOS',
  f: [[w(8, 11), 0.14], [L3, 1, 'inout']], luz: [[0, 0.55], [w(8, 10), 0.55], [w(8, 11), 1]], caja: [-165, -67, 330, 87] });
E.sfx(w(7, 2), 'fill');
E.obj('ch3a', 'chispas', { t0: L1, t1: L1 + 0.8, x: BX + 150, y: Y3[0], r0: 40, r1: 130, inspeccion: false });
E.golpe(L1, 0.04); E.destello(L1, 0.1);
// «pasa a la siguiente»: flecha de la primera barra a la segunda
E.obj('fl1', 'flecha', { t0: w(7, 5), t1: TC, x: BX + 200, y: Y3[0], pop: false, de: [0, 10], hasta: [0, 95], curva: -0.45, p: [[w(7, 5), 0], [w(7, 8), 1, 'out']], caja: [-25, 0, 75, 108] });
E.sfx(w(7, 5), 'whoosh');
E.obj('pulso3', 'pulso', { t0: w(7, 8), t1: w(7, 8) + 0.6, x: BX + 200, y: Y3[1], r0: 20, r1: 80, inspeccion: false });
// «Lo que pagabas por la que has liquidado»: la cuota de la tarjeta se junta en una pila; «súmaselo»: vuela a la siguiente
E.obj('cuota', 'pila', { t0: w(8, 0) - 0.05, t1: TC, sale: 0.2, x: PX, n: 5, w: 130, hh: 22, refl: true,
  k: [[w(8, 0) + 0.3, 0], [w(8, 2) + 0.5, 3, 'lin'], [w(8, 5), 3], [w(8, 7) + 0.2, 5, 'out'], [w(8, 8), 5], [w(8, 8) + 0.7, 0, 'lin']], caja: [-65, -100, 130, 100] });
[0, 1, 2].forEach(i => vuela('pag' + i, w(8, 0) + i * 0.25, [BX + 120, Y3[0]], [PX, -40 - i * 18]));
[0, 1].forEach(i => vuela('pagb' + i, w(8, 5) + 0.1 + i * 0.25, [BX + 120, Y3[0]], [PX, -80 - i * 18]));
[0, 1, 2, 3, 4].forEach(i => vuela('suma' + i, w(8, 8) + i * 0.14, [PX, -90 + i * 16], [BX - 80 + i * 50, Y3[1]]));
E.sfx(w(8, 8) + 0.3, 'fill');
E.obj('ch3b', 'chispas', { t0: L2, t1: L2 + 0.8, x: BX + 150, y: Y3[1], r0: 40, r1: 130, inspeccion: false });
E.golpe(L2, 0.04);
E.obj('fl2', 'flecha', { t0: w(8, 10), t1: TC, x: BX + 200, y: Y3[1], pop: false, de: [0, 10], hasta: [0, 95], curva: -0.45, p: [[w(8, 10), 0], [w(8, 11) + 0.2, 1, 'out']], caja: [-25, 0, 75, 108] });
E.sfx(w(8, 11), 'fill');
E.destello(L3, 0.12);

// ---------- cierre: resumen y envío ----------
// 9: Pagar(0) solo(1) el(2) mínimo(3) es(4) la(5) forma(6) más(7) lenta(8) de(9) salir(10) de(11) una(12) deuda(13)
// 10: Mándaselo(0) a(1) ese(2) amigo(3) que(4) paga(5) el(6) mínimo(7) de(8) la(9) tarjeta(10) cada(11) mes(12)
E.sfx(TC, 'cut');
E.obj('rayosC', 'rayos', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(9, 8), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, items: ['Apunta todas', 'Lo que sobre', 'La siguiente'], gap: 270,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(9, 8)], caja: [-400, -60, 800, 200] });
E.obj('confC', 'confeti', { t0: wf(9, -1), t1: wf(9, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(9, -1), 0.22); E.golpe(wf(9, -1), 0.04);
E.figura('yoF', { t0: w(10, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(10, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(10, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(10, 10)], vuelo: [[wf(10, -1), 0], [wf(10, -1) + 0.5, 1, 'in']] });
