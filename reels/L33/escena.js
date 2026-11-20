// L33 · El interés compuesto (estilo B; reglas 15, 20, 21, 24)
// Idea visual: dos tarros. CUENTA se queda en 36.000 € y el INVERTIDO al 7 % sube acelerando hasta 122.000 €.
// 1: DESDE HOY frente a EN 10 AÑOS (122.000 / 52.000). 2: el tarro se cierra y los intereses («%») caen dentro año tras año.
// 3: el móvil aparta el ahorro solo cada mes (fila de meses). Giro: ondas del mercado → reloj que se llena.
// Regla 20: «Ya invertiré cuando gane más.» va en bocadillo del muñeco; la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(2, 0), gap: 70, y: 360 } });

// «La primera: // …» → T en «La», S en la primera palabra del punto
const N = [3, 5, 7].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TG = w(9, 0) - 0.1;   // giro: ninguna rentabilidad está garantizada
const TC = w(10, 0) - 0.1;  // resumen

E.camara([
  [0, [0, -380, 1.04]], [w(0, 6), [5, -385, 1.06]], [w(0, 10), [10, -385, 1.07]], [w(1, 0), [20, -380, 1.02]], [w(1, 13), [30, -385, 1.04]],
  [w(1, 17), [25, -390, 1.06]], [w(2, 0), [15, -385, 1.04]], [N[0].T, [10, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [10, -385, 1.03]], [w(4, 9), [20, -385, 1.05]], [N[1].T, [10, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 0), [5, -385, 1.03]], [w(6, 13), [15, -385, 1.05]], [N[2].T, [10, -390, 1.06]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(8, 0), [5, -385, 1.03]], [wf(8, -1), [10, -390, 1.05]], [TG, [10, -390, 1.05]],
  [TG + 0.05, [0, -370, 0.98], 'lin'], [w(9, 5), [0, -380, 1.02]], [wf(9, -1), [0, -385, 1.05]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Si(0) ahorras(1) cien(2) euros(3) al(4) mes(5) en(6) treinta(7) años(8) tienes(9) 36.000(10)   [bocadillo «Ya invertiré cuando gane más.»]
// 1: Si(0) los(1) inviertes(2) y(3) te(4) dan(5) un(6) 7(7) %(8) al(9) año(10) son(11) casi(12) 122.000(13) Se(14) llama(15) interés(16) compuesto(17)
// 2: Tres(0) reglas(1) para(2) aprovecharlo(3)
E.figura('yo', { t0: 0, t1: fin(0), x: -350, cara: true,
  poses: [[0, 'pensar'], [w(0, 2), 'ofrecer'], [w(0, 5), 'meter'], [w(0, 9), 'de_pie'], [w(0, 10) + 0.2, 'encoger'], [w(1, 2), 'senalar'],
    [w(1, 9), 'ofrecer'], [w(1, 13), 'celebrar'], [w(1, 17), 'senalar'], [w(2, 0), 'de_pie'], [w(2, 3), 'celebrar']],
  sonrisa: [[0, 0.6], [w(0, 10) + 0.2, -0.6], [w(1, 2), 0.2], [w(1, 13), 1.5], [w(2, 0), 0.8], [w(2, 3), 1.4]] });
E.obj('bocaH', 'bocadillo', { t0: 0.3, t1: wf(0, -1) + 0.1, sale: 0.2, x: 40, y: -500, w: 500, h: 80, texto: 'Ya invertiré cuando gane más.', size: 28, pop: true,
  on: [[0.3, 0], [0.8, 1]], caja: [-250, -40, 500, 106] });
// los cien euros de cada mes, que van cayendo en la cuenta
E.obj('cien', 'etiqueta', { t0: w(0, 2) - 0.1, t1: w(1, 0) + 0.1, sale: 0.25, x: -70, y: -300, w: 200, h: 80, pop: true,
  v: [[w(0, 2) - 0.1, 0], [w(0, 3), 100, 'out']], barrido: [w(0, 3)], caja: [-100, -40, 200, 80] });
for (let i = 0; i < 6; i++) { const a = w(0, 5) + i * 0.3;
  E.obj('mH' + i, 'moneda', { t0: a, t1: a + 0.65, entra: 0.05, sale: 0.12, r: 20, n: '', libre: true, estela: 5, sfx: i % 2 === 0, inspeccion: false,
    x: [[a, -70], [a + 0.55, 200, 'inout']], y: [[a, -300], [a + 0.28, -400], [a + 0.55, -200, 'in']] }); }
E.obj('cuenta', 'tarro', { t0: 0, t1: fin(0), x: [[0, 200], [w(1, 0), 200], [w(1, 2), -20, 'inout']], w: 200, h: 260, rotulo: 'CUENTA',
  nivel: [[w(0, 5), 0], [w(0, 10) + 0.2, 0.32, 'out']], luz: [[0, 1], [w(1, 12), 1], [w(1, 13) + 0.3, 0.45]], barrido: [w(0, 10)], caja: [-100, -260, 200, 260], refl: true });
E.obj('c36', 'contador', { t0: w(0, 2), t1: fin(0), x: [[0, 200], [w(1, 0), 200], [w(1, 2), -20, 'inout']], y: -330, pop: true, suf: ' €', size: 50, col: 'txt',
  v: [[w(0, 2), 0], [w(0, 3), 100, 'out'], [w(0, 6), 100], [w(0, 10) + 0.2, 36000, 'inout']], luz: [[0, 1], [w(1, 12), 1], [w(1, 13) + 0.3, 0.45]], caja: [-125, -30, 250, 60] });
E.obj('anios0', 'contador', { t0: w(0, 6) - 0.1, t1: w(1, 0), sale: 0.2, x: 200, y: -405, pop: true, suf: ' AÑOS', size: 36, col: '#9a9c9b', miles: false,
  v: [[w(0, 7) - 0.1, 0], [w(0, 8) + 0.3, 30, 'inout']], caja: [-110, -22, 220, 44] });
E.golpe(w(0, 10), 0.04);
// «Si los inviertes»: llega el tarro invertido; «un 7 %»; sube acelerando hasta 122.000
E.obj('inv', 'tarro', { t0: w(1, 2) - 0.1, t1: fin(0), x: 300, w: 200, h: 340, rotulo: 'INVERTIDO', pop: true, sobrevive: true, r: 80, oy: -170,
  nivel: [[w(1, 9), 0], [w(1, 13) + 0.3, 1, 'in']], barrido: [w(1, 13) + 0.3, w(2, 3)], caja: [-50, -340, 200, 340], refl: true });
E.obj('siete', 'etiqueta', { t0: w(1, 7) - 0.15, t1: w(1, 16) - 0.15, sale: 0.25, x: 300, y: -490, w: 170, h: 66, pop: true, suf: ' %', miles: false,
  v: [[w(1, 7) - 0.1, 0], [w(1, 8) + 0.1, 7, 'out']], caja: [-85, -33, 170, 66] });
E.obj('c122', 'contador', { t0: w(1, 9) - 0.1, t1: fin(0), x: 300, y: -400, pop: true, suf: ' €', size: 50, col: 'txt',
  v: [[w(1, 9), 0], [w(1, 13) + 0.3, 122000, 'in']], barrido: [w(1, 13) + 0.3], caja: [-135, -30, 270, 60] });
for (let i = 0; i < 5; i++) { const a = w(1, 9) + i * 0.28;
  E.obj('mI' + i, 'moneda', { t0: a, t1: a + 0.6, entra: 0.05, sale: 0.12, r: 18 + i * 2, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, -20], [a + 0.5, 300, 'inout']], y: [[a, -280], [a + 0.25, -360], [a + 0.5, -220, 'in']] }); }
E.sfx(w(1, 9), 'fill');
E.obj('chI', 'chispas', { t0: w(1, 13) + 0.3, t1: w(1, 13) + 1.1, x: 300, y: -400, r0: 120, r1: 230, inspeccion: false });
E.golpe(w(1, 13) + 0.3, 0.05); E.destello(w(1, 13) + 0.3, 0.15);
E.obj('compuesto', 'rotulo', { t0: w(1, 16) - 0.1, t1: w(2, 0), sale: 0.2, x: 140, y: -505, texto: 'INTERÉS COMPUESTO', size: 34, col: '#e6ce46', pop: true, caja: [-210, -20, 420, 40] });
E.obj('rayosI', 'rayos', { t0: w(1, 16), t1: N[0].T + 0.2, x: 300, y: -180, r: 300, z: -2, p: [[w(1, 16), 0], [w(2, 0), 1, 'out']], inspeccion: false });
// «Tres reglas»: tres piezas 1-2-3 que saltan en orden
['1', '2', '3'].forEach((s, i) => E.obj('p' + s, 'pieza', { t0: w(2, i) - 0.05, t1: N[0].T + 0.1, sale: 0.2, x: -20 + i * 80, y: -490, r: 26, texto: s, pop: true,
  on: [[0, 0.3], [w(2, 3) + i * 0.12, 0.3], [w(2, 3) + i * 0.12 + 0.2, 1]], caja: [-26, -26, 52, 52] }));

// ---------- 1 · empieza cuanto antes ----------
// 3: La(0) primera(1) empieza(2) cuanto(3) antes(4)
// 4: Si(0) empiezas(1) diez(2) años(3) más(4) tarde(5) te(6) quedas(7) en(8) 52.000(9) menos(10) de(11) la(12) mitad(13)
E.numero(1, N[0].T, N[0].S, { desde: 'inv', hacia: 'pronto' });
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -360, cara: true,
  poses: [[0, 'de_pie'], [w(3, 2), 'meter'], [w(3, 4) + 0.2, 'celebrar'], [w(4, 0), 'de_pie'], [w(4, 2), 'senalar'], [w(4, 9), 'ofrecer'], [w(4, 13), 'celebrar']],
  sonrisa: [[w(3, 2), 0.6], [w(3, 4), 1.4], [w(4, 0), 0.4], [w(4, 13), 1.5]] });
E.obj('pronto', 'tarro', { t0: N[0].S - 0.1, t1: fin(1), x: -20, w: 200, h: 320, rotulo: 'DESDE HOY', pop: true, sobrevive: true, r: 80, oy: -160,
  nivel: [[w(3, 2), 0], [w(3, 4) + 0.5, 0.2, 'out'], [w(4, 6), 0.3], [w(4, 9) + 0.3, 1, 'in']], barrido: [w(4, 9) + 0.3, w(4, 13)], caja: [-50, -320, 200, 320], refl: true });
E.obj('cPronto', 'contador', { t0: w(3, 2) - 0.1, t1: fin(1), x: -20, y: -385, pop: true, suf: ' €', size: 46, col: 'txt',
  v: [[w(3, 2), 0], [w(3, 4) + 0.5, 1200, 'out'], [w(4, 6), 6000, 'inout'], [w(4, 9) + 0.3, 122000, 'in']], caja: [-125, -28, 250, 56] });
for (let i = 0; i < 4; i++) { const a = w(3, 2) + i * 0.3;
  E.obj('m1_' + i, 'moneda', { t0: a, t1: a + 0.6, entra: 0.05, sale: 0.12, r: 20, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, -250], [a + 0.5, -20, 'inout']], y: [[a, -300], [a + 0.25, -400], [a + 0.5, -230, 'in']] }); }
E.sfx(w(3, 2), 'fill');
// «Si empiezas diez años más tarde»: el otro tarro espera diez años vacío y luego se queda en 52.000
E.obj('tarde', 'tarro', { t0: w(4, 0) - 0.15, t1: fin(1), x: 300, w: 200, h: 320, rotulo: 'EN 10 AÑOS', pop: true,
  nivel: [[w(4, 6), 0], [w(4, 9) + 0.3, 0.43, 'in']], luz: [[0, 1], [w(4, 10), 1], [w(4, 13), 0.55]], caja: [-50, -320, 200, 320], refl: true });
E.obj('espera', 'contador', { t0: w(4, 1), t1: w(4, 6), sale: 0.15, x: 300, y: -385, pop: true, suf: ' AÑOS', size: 40, col: '#9a9c9b', miles: false,
  v: [[w(4, 2) - 0.05, 0], [w(4, 3) + 0.3, 10, 'inout']], caja: [-115, -24, 230, 48] });
E.obj('cTarde', 'contador', { t0: w(4, 6), t1: fin(1), x: 300, y: -385, pop: true, suf: ' €', size: 46, col: 'txt',
  v: [[w(4, 6), 0], [w(4, 9) + 0.3, 52000, 'in']], luz: [[0, 1], [w(4, 10), 1], [w(4, 13), 0.55]], caja: [-125, -28, 250, 56] });
E.obj('mitad', 'rotulo', { t0: w(4, 10) - 0.05, t1: fin(1) - 0.1, x: 300, y: -465, texto: 'MENOS DE LA MITAD', size: 26, col: '#e6ce46', pop: true, caja: [-150, -16, 300, 32] });
E.temblor(w(4, 13), 10, 0.35);
E.obj('ch1', 'chispas', { t0: w(4, 9) + 0.3, t1: w(4, 9) + 1.1, x: -20, y: -385, r0: 110, r1: 210, inspeccion: false });
E.golpe(w(4, 9) + 0.3, 0.04); E.destello(w(4, 9) + 0.3, 0.12);

// ---------- 2 · no toques lo que te va rindiendo ----------
// 5: La(0) segunda(1) no(2) toques(3) lo(4) que(5) te(6) va(7) rindiendo(8)
// 6: Lo(0) que(1) te(2) rinde(3) un(4) año(5) se(6) suma(7) a(8) lo(9) que(10) tenías(11) y(12) al(13) año(14) siguiente(15) también(16) da(17) intereses(18)
E.numero(2, N[1].T, N[1].S, { desde: 'pronto', hacia: 'hucha' });
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -360, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'coger'], [w(5, 3) + 0.15, 'apartarse'], [w(5, 8), 'de_pie'], [w(6, 0), 'senalar'], [w(6, 7), 'ofrecer'], [w(6, 13), 'senalar'], [w(6, 18), 'celebrar']],
  sonrisa: [[0, 0.4], [w(5, 2), 0.2], [w(5, 3) + 0.15, -0.3], [w(5, 8), 0.6], [w(6, 7), 1], [w(6, 18), 1.5]] });
E.obj('hucha', 'tarro', { t0: N[1].S - 0.1, t1: fin(2), x: 150, w: 240, h: 320, rotulo: 'INVERTIDO', pop: true, sobrevive: true, r: 80, oy: -160,
  nivel: [[w(5, 2), 0.35], [w(6, 7), 0.35], [w(6, 7) + 0.4, 0.55, 'out'], [w(6, 18), 0.55], [wf(6, -1), 0.85, 'out']],
  tapa: [[w(5, 3), 0], [w(5, 3) + 0.35, 1, 'out']], barrido: [w(5, 8), wf(6, -1)], caja: [-60, -330, 240, 330], refl: true });
E.sfx(w(5, 3) + 0.3, 'thud');
E.obj('anio', 'contador', { t0: w(6, 4) - 0.15, t1: fin(2), x: 150, y: -415, pop: true, pre: 'AÑO', size: 52, col: 'txt', miles: false,
  v: [[w(6, 13), 1], [w(6, 14) + 0.3, 2, 'inout']], barrido: [w(6, 14) + 0.3], caja: [-100, -30, 200, 60] });
// los intereses: monedas «%» que nacen junto al tarro y caen dentro
const INT = [{ a: w(6, 3), b: w(6, 7), x: 360, r: 30 }, { a: w(6, 16), b: w(6, 18), x: 345, r: 30 }, { a: w(6, 16) + 0.18, b: w(6, 18) + 0.15, x: 420, r: 22 }];
INT.forEach((c, i) => E.obj('int' + i, 'moneda', { t0: c.a - 0.05, t1: c.b + 0.5, entra: 0.12, sale: 0.15, r: c.r, n: '%', pop: true, libre: true, estela: 4, inspeccion: false,
  x: [[c.b, c.x], [c.b + 0.45, 150, 'inout']], y: [[c.b, -360], [c.b + 0.2, -430], [c.b + 0.45, -300, 'in']], s: [[c.b + 0.3, 1], [c.b + 0.5, 0.5]] }));
E.obj('rotInt', 'rotulo', { t0: w(6, 17) - 0.1, t1: fin(2) - 0.1, x: 380, y: -470, texto: 'INTERESES', size: 26, col: '#e6ce46', pop: true, caja: [-90, -16, 180, 32] });
E.golpe(w(6, 7) + 0.4, 0.03); E.sfx(w(6, 7) + 0.4, 'fill');
E.obj('pu2', 'pulso', { t0: w(6, 7) + 0.4, t1: w(6, 7) + 1.0, x: 150, y: -200, r0: 60, r1: 200, inspeccion: false });
E.obj('ch2', 'chispas', { t0: wf(6, -1), t1: wf(6, -1) + 0.8, x: 150, y: -200, r0: 110, r1: 220, inspeccion: false });
E.golpe(wf(6, -1), 0.04); E.destello(wf(6, -1), 0.12);

// ---------- 3 · que el ahorro se aparte solo, el día que cobras ----------
// 7: La(0) tercera(1) que(2) el(3) ahorro(4) se(5) aparte(6) solo(7) el(8) mismo(9) día(10) que(11) cobras(12)
// 8: Deja(0) programada(1) una(2) transferencia(3) periódica(4) y(5) no(6) dependerás(7) de(8) acordarte(9)
E.numero(3, N[2].T, N[2].S, { desde: 'hucha', hacia: 'ahorro' });
E.figura('yo3', { t0: N[2].S - 0.1, t1: TG, x: -370, cara: true,
  poses: [[0, 'de_pie'], [w(7, 6), 'apartarse'], [w(7, 10), 'senalar'], [w(8, 0), 'ofrecer'], [w(8, 5), 'de_pie'], [w(8, 7), 'apartarse'], [wf(8, -1) - 0.2, 'celebrar']],
  sonrisa: [[0, 0.4], [w(7, 6), 1], [w(8, 0), 0.5], [w(8, 7), 1.2], [wf(8, -1), 1.5]] });
E.obj('movil', 'telefono', { t0: N[2].S - 0.05, t1: TG, x: -150, y: -210, w: 150, h: 260, pop: true,
  vibra: [[w(7, 6), 0], [w(7, 6) + 0.1, 1], [w(7, 6) + 0.4, 0], [w(8, 1), 0], [w(8, 1) + 0.1, 1], [w(8, 1) + 0.4, 0]], caja: [-75, -130, 150, 260] });
E.obj('rotMovil', 'rotulo', { t0: w(7, 3), t1: TG, x: -150, y: -375, texto: [[0, 'NÓMINA'], [w(8, 1), 'PROGRAMADA']], size: 26, col: '#e6ce46', pop: true, caja: [-100, -16, 200, 32] });
E.obj('ahorro', 'tarro', { t0: N[2].S - 0.1, t1: TG, x: 260, w: 210, h: 300, rotulo: 'AHORRO', pop: true, r: 80, oy: -150,
  nivel: [[w(7, 6), 0], [w(7, 6) + 0.7, 0.12, 'out'], [w(8, 0), 0.12], [w(8, 9) + 0.6, 1, 'inout']], barrido: [w(7, 12), wf(8, -1)], caja: [-53, -300, 210, 300], refl: true });
// los meses: el día de cobro se enciende cada mes y sale una moneda sola del móvil al tarro
const MES = ['E', 'F', 'M', 'A', 'M', 'J'];
const tMes = i => i === 0 ? w(7, 10) : w(8, 0) + (i - 1) * ((w(8, 9) - w(8, 0)) / 4);
E.obj('meses', 'dias', { t0: w(7, 9) - 0.2, t1: TG, x: 60, y: -490, letras: MES, gap: 76, pop: true,
  luz: [[w(7, 10) - 0.2, -1], [w(7, 10), 0], ...[1, 2, 3, 4, 5].map(i => [tMes(i), i, 'inout'])], caja: [-220, -32, 440, 64] });
[w(7, 6), ...[1, 2, 3, 4, 5].map(tMes)].forEach((a, i) => E.obj('m3_' + i, 'moneda', { t0: a, t1: a + 0.65, entra: 0.05, sale: 0.12, r: 22, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
  x: [[a, -150], [a + 0.55, 260, 'inout']], y: [[a, -260], [a + 0.28, -380], [a + 0.55, -200, 'in']] }));
E.obj('ch3', 'chispas', { t0: wf(8, -1), t1: wf(8, -1) + 0.8, x: 260, y: -220, r0: 110, r1: 220, inspeccion: false });
E.obj('rayos3', 'rayos', { t0: w(8, 7), t1: TG, x: 260, y: -150, r: 300, z: -2, p: [[w(8, 7), 0], [wf(8, -1), 1, 'out']], inspeccion: false });
E.golpe(wf(8, -1), 0.04); E.destello(wf(8, -1), 0.12);

// ---------- giro: ninguna rentabilidad está garantizada; el tiempo juega a favor ----------
// 9: Ninguna(0) rentabilidad(1) está(2) garantizada(3) pero(4) el(5) tiempo(6) juega(7) a(8) favor(9) de(10) quien(11) empieza(12) pronto(13)
E.figura('yo4', { t0: TG, t1: TC, x: -360, cara: true,
  poses: [[0, 'de_pie'], [w(9, 1), 'pensar'], [w(9, 3), 'encoger'], [w(9, 5), 'de_pie'], [w(9, 6), 'senalar'], [w(9, 12), 'celebrar']],
  sonrisa: [[0, 0.2], [w(9, 3), -0.6], [w(9, 6), 0.4], [w(9, 12), 1.5]] });
E.obj('mercado', 'ondas', { t0: TG + 0.1, t1: w(9, 5), sale: 0.2, x: 150, y: -250, n: 11, gap: 30, pop: true, col: '#7d8682', amp: [[TG, 0.4], [w(9, 1), 1], [w(9, 4), 1]], caja: [-170, -60, 340, 120] });
E.obj('rotGar', 'rotulo', { t0: w(9, 1), t1: w(9, 5), sale: 0.2, x: 150, y: -390, texto: 'NADA GARANTIZADO', size: 28, col: '#9a9c9b', pop: true, caja: [-160, -18, 320, 36] });
E.temblor(w(9, 3), 10, 0.35); E.sfx(TG, 'cut'); E.golpe(TG + 0.05, 0.03);
E.obj('reloj', 'relojAm', { t0: w(9, 5), t1: TC, x: 150, y: -260, r: 120, texto: '', pop: true, p: [[w(9, 6), 0], [wf(9, -1), 1, 'inout']], barrido: [wf(9, -1)], caja: [-120, -120, 240, 240] });
E.sfx(w(9, 6), 'fill');
E.obj('rotTiempo', 'rotulo', { t0: w(9, 6), t1: TC, x: 150, y: -420, texto: [[0, 'EL TIEMPO'], [w(9, 12), 'EMPIEZA PRONTO']], size: 28, col: '#e6ce46', pop: true, caja: [-150, -18, 300, 36] });
E.obj('rayos4', 'rayos', { t0: w(9, 12), t1: TC, x: 150, y: -260, r: 300, z: -2, p: [[w(9, 12), 0], [wf(9, -1), 1, 'out']], inspeccion: false });
E.obj('ch4', 'chispas', { t0: wf(9, -1), t1: wf(9, -1) + 0.8, x: 150, y: -260, r0: 140, r1: 240, inspeccion: false });
E.golpe(wf(9, -1), 0.04);

// ---------- cierre: resumen y envío ----------
// 10: Lo(0) que(1) más(2) pesa(3) no(4) es(5) cuánto(6) pones(7) es(8) cuántos(9) años(10) lo(11) dejas(12)
// 11: Mándaselo(0) a(1) ese(2) amigo(3) que(4) dice(5) que(6) ya(7) invertirá(8) cuando(9) gane(10) más(11)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(10, 6), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, items: ['Cuanto antes', 'No lo toques', 'Automático'], gap: 250,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(10, 9)], caja: [-390, -60, 780, 200] });
E.obj('aniosC', 'contador', { t0: w(10, 8) - 0.1, t1: w(11, 0), capa: 'pantalla', x: 540, y: 1260, pop: true, suf: ' AÑOS', size: 64, miles: false,
  v: [[w(10, 9), 0], [w(10, 10) + 0.4, 30, 'out']], barrido: [w(10, 12)], caja: [-160, -36, 320, 72] });
E.obj('confC', 'confeti', { t0: wf(10, -1), t1: wf(10, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(10, -1), 0.22); E.golpe(wf(10, -1), 0.04);
E.figura('yoF', { t0: w(11, 0), t1: D + 1, x: -330, cara: true, poses: [[0, 'de_pie'], [w(11, 1), 'senalar']], sonrisa: [[0, 0.6], [w(11, 1), 1.2]] });
E.obj('enviar', 'enviar', { t0: w(11, 1), t1: D + 1, x: -40, y: -380, r: 64, pop: true, barrido: [w(11, 9)], vuelo: [[wf(11, -1), 0], [wf(11, -1) + 0.5, 1, 'in']] });
E.figura('amigo', { t0: w(11, 3) - 0.1, t1: D + 1, x: 300, dir: -1, color: 'gris', cara: true,
  poses: [[0, 'de_pie'], [w(11, 7), 'pensar'], [w(11, 10), 'encoger']], sonrisa: [[0, 0.3], [w(11, 10), -0.2]] });
