// L45 · El fondo de emergencia (estilo B; reglas 15, 20, 21, 24)
// Idea visual: la nómina (pila de monedas) desaparece de golpe y hace falta un colchón de tres meses; el fondo es un tarro
// que se llena. Tres pasos: sumar los gastos imprescindibles (tres barras que se llenan y el contador llega a 1.500 €),
// multiplicar por tres (tres pilas y el contador rueda a 4.500 €) y apartar una moneda de la nómina a una cuenta aparte
// (dos barras de tiempo: la de 100 € se llena despacio, la de 400 € deprisa, y el tarro se llena).
// Regla 20: «Ya ahorraré.» va en bocadillo del muñeco del gancho; la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(2, 3), gap: 70, y: 360 } });

// «El primero: // …» → T en «El», S en la primera palabra del punto
const N = [3, 5, 7].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(9, 0) - 0.1;   // resumen
const GRIS = '#9a9c9b';
const AM = '#e6ce46';

E.camara([
  [0, [0, -380, 1.04]], [w(0, 4), [10, -385, 1.07]], [w(0, 10), [-10, -390, 1.06]], [w(1, 0), [0, -380, 1.02]], [w(1, 6), [10, -385, 1.04]],
  [w(1, 13), [15, -390, 1.07]], [w(2, 0), [0, -380, 1.03]], [w(2, 3), [10, -385, 1.05]], [N[0].T, [10, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [15, -385, 1.03]], [w(4, 6), [-10, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 0), [-15, -385, 1.04]], [wf(6, -1), [10, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(8, 0), [-10, -385, 1.03]], [w(8, 9), [10, -385, 1.04]], [TC - 0.1, [0, -385, 1.05]], [TC, [0, -390, 1.05]],
]);

// monedas sueltas que vuelan de un sitio a otro (no las mide el inspector: van de paso)
const vuela = (id, a, de, hasta, dur = 0.5, r = 18) => E.obj(id, 'moneda', { t0: a, t1: a + dur + 0.08, entra: 0.06, sale: 0.12, r, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
  x: [[a, de[0]], [a + dur, hasta[0], 'inout']], y: [[a, de[1]], [a + dur * 0.5, Math.min(de[1], hasta[1]) - 60], [a + dur, hasta[1], 'in']] });

// ---------- gancho ----------
// 0: Si(0) mañana(1) dejas(2) de(3) cobrar(4) tu(5) colchón(6) tiene(7) que(8) durar(9) tres(10) meses(11)   [bocadillo «Ya ahorraré.»]
// 1: Se(0) llama(1) fondo(2) de(3) emergencia(4) con(5) 1.500(6) euros(7) de(8) gastos(9) al(10) mes(11) son(12) 4.500(13)
// 2: Se(0) construye(1) en(2) tres(3) pasos(4)
const HX = 220;
E.figura('yo', { t0: 0, t1: fin(0), x: -340, cara: true,
  poses: [[0, 'celebrar'], [w(0, 2), 'encoger'], [w(0, 4), 'manos_cabeza'], [w(0, 6), 'senalar'], [w(0, 10), 'triste'],
    [w(1, 0), 'de_pie'], [w(1, 2), 'senalar'], [w(1, 6), 'pensar'], [w(1, 9), 'ofrecer'], [w(1, 12), 'levantar'], [w(1, 13) + 0.5, 'celebrar'],
    [w(2, 0), 'de_pie'], [w(2, 1), 'senalar'], [w(2, 3), 'celebrar']],
  sonrisa: [[0, 1.3], [w(0, 2), 0.2], [w(0, 4), -1.4], [w(0, 6), -0.6], [w(0, 10), -1], [w(1, 0), 0], [w(1, 2), 0.6], [w(1, 6), 0.2], [w(1, 12), 0.8], [w(1, 13) + 0.5, 1.5],
    [w(2, 0), 0.5], [w(2, 3), 1.4]] });
// regla 20: lo que se dice el muñeco va en bocadillo, sin voz
E.obj('bocaH', 'bocadillo', { t0: 0, t1: w(0, 5), sale: 0.2, x: -110, y: -490, w: 290, h: 80, texto: 'Ya ahorraré.', size: 32,
  on: [[0, 1], [w(0, 2), 1], [w(0, 4), 0]], caja: [-145, -40, 290, 106] });
// la nómina: una pila que sigue creciendo… hasta «dejas de cobrar», que se vacía de golpe
E.obj('nomina', 'pila', { t0: 0, t1: w(0, 6), sale: 0.2, x: HX, n: 8, w: 170, hh: 24, refl: true,
  k: [[0, 6], [0.45, 8, 'lin'], [w(0, 2), 8], [w(0, 4) + 0.15, 0, 'in']], caja: [-85, -168, 170, 168] });
E.obj('rotNom', 'rotulo', { t0: 0, t1: w(0, 6), sale: 0.2, x: HX, y: 56, texto: 'NÓMINA', size: 28, col: '#c9ccca',
  luz: [[0, 1], [w(0, 2), 1], [w(0, 4), 0.4]], caja: [-80, -17, 160, 34] });
[0, 1, 2].forEach(i => vuela('nomM' + i, 0.02 + i * 0.15, [HX + 190, -430], [HX, -150 - i * 10], 0.4));
E.temblor(w(0, 4), 14, 0.45); E.golpe(w(0, 4), 0.05);
E.obj('pulsoNom', 'pulso', { t0: w(0, 4), t1: w(0, 4) + 0.6, x: HX, y: -40, r0: 50, r1: 170, inspeccion: false });
// «tu colchón tiene que durar tres meses»: la barra del colchón y tres meses que se van marcando
E.obj('colchon', 'relleno', { t0: w(0, 5), t1: w(1, 0), sale: 0.25, x: HX, y: -450, w: 320, h: 40, pop: true, rotulo: 'COLCHÓN',
  f: [[w(0, 9), 0], [w(0, 10), 0.33, 'out'], [w(0, 11), 0.66, 'out'], [wf(0, -1), 1, 'out']], barrido: [wf(0, -1)], caja: [-160, -54, 320, 74] });
E.sfx(w(0, 9), 'fill');
E.obj('meses', 'bloques', { t0: w(0, 6), t1: w(1, 0), sale: 0.25, x: HX, y: -70, n: 3, w: 330, h: 96, pop: true, refl: true,
  parte: [[w(0, 6) + 0.2, 0], [w(0, 9), 1]], hechos: [[w(0, 10), 0], [wf(0, -1) + 0.1, 3, 'lin']], caja: [-165, -58, 330, 116] });
E.obj('tres', 'contador', { t0: w(0, 9), t1: w(1, 0), sale: 0.25, x: HX, y: -290, size: 84, suf: ' MESES', miles: false, pop: true,
  v: [[w(0, 9), 0], [w(0, 10) + 0.3, 3, 'out']], caja: [-175, -48, 350, 96] });
E.obj('chTres', 'chispas', { t0: w(0, 10) + 0.3, t1: w(0, 10) + 1.1, x: HX, y: -290, r0: 150, r1: 250, inspeccion: false });
E.golpe(w(0, 10) + 0.3, 0.04); E.destello(wf(0, -1), 0.12);

// «Se llama fondo de emergencia: con 1.500 euros de gastos al mes, son 4.500»: el contador rueda y el tarro se llena
const FX = 170;
E.obj('rotFondo', 'rotulo', { t0: w(1, 2) - 0.1, t1: w(2, 0), sale: 0.25, x: FX, y: -480, texto: 'FONDO DE EMERGENCIA', size: 32, col: AM, peso: 700, pop: true, caja: [-235, -19, 470, 38] });
E.obj('chFondo', 'chispas', { t0: w(1, 4), t1: w(1, 4) + 0.8, x: FX, y: -480, r0: 120, r1: 240, inspeccion: false });
E.golpe(w(1, 4), 0.04);
E.obj('tarro', 'tarro', { t0: w(1, 0) + 0.05, t1: N[0].T, sale: 0.2, x: FX, w: 190, h: 215, pop: true, refl: true,
  nivel: [[w(1, 12), 0], [w(1, 12) + 0.3, 0.33, 'out'], [w(1, 13), 0.66, 'out'], [w(1, 13) + 0.55, 1, 'out']],
  tapa: [[wf(1, -1), 0], [wf(1, -1) + 0.3, 1, 'out']], luz: [[0, 1], [w(2, 2), 1], [w(2, 3), 0.5]], barrido: [w(1, 13) + 0.6], caja: [-95, -215, 190, 215] });
E.obj('cifra', 'contador', { t0: w(1, 5), t1: w(2, 0) - 0.05, sale: 0.25, x: FX, y: -355, size: 96, suf: ' €', pop: true,
  v: [[w(1, 5), 0], [w(1, 6) + 0.45, 1500, 'out'], [w(1, 12), 1500], [w(1, 13) + 0.5, 4500, 'inout']], barrido: [w(1, 13) + 0.55], caja: [-200, -55, 400, 110] });
E.obj('rotGastos', 'rotulo', { t0: w(1, 8), t1: w(1, 12), sale: 0.2, x: FX, y: -262, texto: 'GASTOS AL MES', size: 26, col: GRIS, pop: true, caja: [-140, -16, 280, 32] });
[0, 1, 2, 3].forEach(i => vuela('fM' + i, w(1, 12) + i * 0.2, [FX + (i % 2 ? 150 : -150), -200], [FX, -120 - i * 20], 0.4));
E.sfx(w(1, 12), 'fill');
E.obj('chCifra', 'chispas', { t0: w(1, 13) + 0.5, t1: w(1, 13) + 1.3, x: FX, y: -355, r0: 170, r1: 270, inspeccion: false });
E.golpe(w(1, 13) + 0.5, 0.05); E.destello(w(1, 13) + 0.5, 0.12);

// «Se construye en tres pasos»: tres monedas; la primera crece y pasa al paso uno
E.obj('rayosH', 'rayos', { t0: w(2, 1), t1: fin(0), x: FX, y: -355, r: 300, z: -2, p: [[w(2, 1), 0], [w(2, 3), 1, 'out']], inspeccion: false });
[0, 1, 2].forEach(i => { const a = w(2, 1) + i * 0.14;
  E.obj('r' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: FX + (i - 1) * 125, y: -355, r: 40, n: i + 1, pop: true, sfx: true, inspeccion: false,
    s: i === 0 ? [[0, 1], [w(2, 4), 1], [w(2, 4) + 0.3, 1.4, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [wf(2, -1), 1], [wf(2, -1) + 0.25, 0.4]], barrido: i === 0 ? [wf(2, -1)] : null }); });
E.obj('chR', 'chispas', { t0: w(2, 4) + 0.25, t1: w(2, 4) + 1.05, x: FX - 125, y: -355, r0: 60, r1: 150, inspeccion: false });
E.destello(w(2, 3), 0.12);

// ---------- 1 · calcula lo que gastas cada mes ----------
// 3: El(0) primero(1) calcula(2) lo(3) que(4) gastas(5) cada(6) mes(7)
// 4: Solo(0) lo(1) imprescindible(2) alquiler(3) comida(4) facturas(5) Ocio(6) y(7) suscripciones(8) no(9) cuentan(10)
E.numero(1, N[0].T, N[0].S, { desde: 'r1', hacia: 'g0' });
const P1 = 130;
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(3, 2), 'pensar'], [w(3, 5), 'escribir'], [w(4, 0), 'senalar'], [w(4, 3), 'ofrecer'], [w(4, 4), 'senalar'], [w(4, 5), 'ofrecer'],
    [w(4, 6), 'encoger'], [w(4, 9), 'apartarse'], [wf(4, -1), 'celebrar']],
  sonrisa: [[0, 0.2], [w(3, 2), 0], [w(4, 0), 0.5], [w(4, 5), 0.9], [w(4, 6), 0], [w(4, 9), -0.3], [wf(4, -1), 1.5]] });
const G = [{ y: -400, k: 3, s: 'ALQUILER' }, { y: -310, k: 4, s: 'COMIDA' }, { y: -220, k: 5, s: 'FACTURAS' }];
const GA = [w(3, 2) - 0.22, w(3, 5) - 0.1, w(3, 7) - 0.1];   // las tres barras se montan una a una con la frase
G.forEach((g, i) => E.obj('g' + i, 'relleno', { t0: GA[i], t1: fin(1) - 0.2, sale: 0.2, x: P1, y: g.y, w: 300, h: 32, pop: true, r: 40,
  rotulo: [[0, ''], [w(4, g.k) - 0.05, g.s]], f: [[w(4, g.k), 0], [w(4, g.k) + 0.4, 1, 'out']], barrido: i === 2 ? [w(4, 5) + 0.45] : null, caja: [-150, -50, 300, 66] }));
G.forEach(g => { E.sfx(w(4, g.k), 'fill'); E.golpe(w(4, g.k) + 0.4, 0.015); });
E.obj('total', 'contador', { t0: w(3, 5) - 0.1, t1: fin(1), x: P1, y: -125, size: 76, suf: ' €', pop: true, sobrevive: true, r: 70,
  v: [[w(4, 3), 0], [w(4, 4), 700, 'out'], [w(4, 5), 1150, 'out'], [w(4, 5) + 0.5, 1500, 'out']], barrido: [w(4, 5) + 0.55, wf(4, -1)], caja: [-160, -44, 320, 88] });
E.obj('rotMes', 'rotulo', { t0: w(3, 6) - 0.05, t1: w(4, 6) - 0.1, sale: 0.2, x: P1, y: -50, texto: 'CADA MES', size: 26, col: GRIS, pop: true, caja: [-95, -16, 190, 32] });
E.obj('rotImp', 'rotulo', { t0: w(4, 1), t1: fin(1) - 0.2, sale: 0.2, x: P1, y: -496, texto: 'LO IMPRESCINDIBLE', size: 28, col: AM, peso: 700, pop: true, caja: [-190, -17, 380, 34] });
E.obj('chImp', 'chispas', { t0: w(4, 5) + 0.5, t1: w(4, 5) + 1.3, x: P1, y: -125, r0: 150, r1: 240, inspeccion: false });
E.golpe(w(4, 5) + 0.5, 0.04);
// «Ocio y suscripciones no cuentan»: llegan en gris, chocan y se apartan apagados
[{ id: 'ocio', s: 'OCIO', k: 6, y: -62, cw: 90 }, { id: 'susc', s: 'SUSCRIPCIONES', k: 8, y: -22, cw: 270 }].forEach(q => {
  E.obj(q.id, 'rotulo', { t0: w(4, q.k) - 0.08, t1: fin(1) - 0.2, sale: 0.2, texto: q.s, size: 24, col: '#c9ccca', pop: true,
    x: [[w(4, q.k) - 0.08, P1 + 120], [w(4, q.k) + 0.25, P1, 'out'], [w(4, 9), P1], [w(4, 10) + 0.2, P1 + 70, 'out']], y: q.y,
    luz: [[0, 1], [w(4, 9), 1], [w(4, 10), 0.35]], caja: [-q.cw / 2, -15, q.cw, 30] }); });
E.temblor(w(4, 10), 10, 0.35);
E.obj('pulsoNo', 'pulso', { t0: w(4, 10), t1: w(4, 10) + 0.6, x: P1, y: -42, r0: 40, r1: 150, inspeccion: false });
E.destello(wf(4, -1), 0.1);

// ---------- 2 · multiplícalo por tres ----------
// 5: El(0) segundo(1) multiplícalo(2) por(3) tres(4)
// 6: Esa(0) es(1) la(2) cantidad(3) que(4) necesitas(5) reunir(6)
E.numero(2, N[1].T, N[1].S, { desde: 'total', hacia: 'meta' });
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'levantar'], [w(5, 4), 'celebrar'], [w(6, 0), 'senalar'], [w(6, 4), 'pensar'], [w(6, 6), 'coger']],
  sonrisa: [[0, 0.3], [w(5, 2), 0.8], [w(5, 4), 1.4], [w(6, 0), 0.7], [w(6, 4), 0.2], [w(6, 6), 0.9]] });
E.obj('meta', 'contador', { t0: N[1].S - 0.1, t1: fin(2), x: P1, y: -440, size: 92, suf: ' €', pop: true, sobrevive: true, r: 70,
  v: [[0, 1500], [w(5, 3), 1500], [w(5, 4) + 0.45, 4500, 'inout']], barrido: [w(5, 4) + 0.5, w(6, 3)], caja: [-195, -53, 390, 106] });
E.obj('por3', 'rotulo', { t0: w(5, 3) - 0.05, t1: w(6, 0), sale: 0.2, x: P1, y: -338, texto: '× 3', size: 46, col: AM, peso: 700, pop: true, track: 2, caja: [-50, -26, 100, 52] });
// tres pilas, una por mes
const PX = [P1 - 165, P1, P1 + 165];
const PA = [N[1].S - 0.05, w(5, 3), w(5, 4)];
PX.forEach((x, i) => E.obj('mes' + i, 'pila', { t0: PA[i], t1: fin(2) - 0.2, sale: 0.2, x, n: 5, w: 124, hh: 24, pop: true, refl: true,
  k: i === 0 ? [[PA[0], 0], [w(5, 2) + 0.3, 5, 'lin']] : [[PA[i], 0], [PA[i] + 0.35, 5, 'lin']], barrido: [w(5, 4) + 0.5 + i * 0.08], caja: [-62, -108, 124, 108] }));
E.sfx(w(5, 2), 'fill'); E.sfx(w(5, 3), 'fill'); E.sfx(w(5, 4), 'fill');
E.obj('ch2', 'chispas', { t0: w(5, 4) + 0.45, t1: w(5, 4) + 1.25, x: P1, y: -440, r0: 170, r1: 270, inspeccion: false });
E.golpe(w(5, 4) + 0.45, 0.05); E.destello(w(5, 4) + 0.45, 0.12);
// «Esa es la cantidad que necesitas reunir»: la barra de lo reunido, todavía vacía, con las primeras monedas
E.obj('reunir', 'relleno', { t0: w(6, 0) - 0.05, t1: fin(2) - 0.2, sale: 0.2, x: P1, y: -235, w: 400, h: 40, pop: true, rotulo: 'POR REUNIR', cursor: 1,
  f: [[w(6, 6), 0], [wf(6, -1) + 0.15, 0.14, 'out']], caja: [-200, -54, 400, 74] });
E.golpe(w(6, 3), 0.03);
E.obj('pulsoMeta', 'pulso', { t0: w(6, 3), t1: w(6, 3) + 0.6, x: P1, y: -440, r0: 120, r1: 240, inspeccion: false });
[0, 1].forEach(i => vuela('reM' + i, w(6, 6) - 0.05 + i * 0.18, [PX[0], -120], [P1 - 170, -235], 0.38, 15));
E.sfx(w(6, 6), 'fill');

// ---------- 3 · aparta una cantidad fija el día que cobras ----------
// 7: El(0) tercero(1) aparta(2) una(3) cantidad(4) fija(5) el(6) día(7) que(8) cobras(9) en(10) una(11) cuenta(12) aparte(13)
// 8: Con(0) cien(1) euros(2) al(3) mes(4) tardas(5) casi(6) cuatro(7) años(8) con(9) cuatrocientos(10) poco(11) más(12) de(13) once(14) meses(15)
E.numero(3, N[2].T, N[2].S, { desde: 'meta', hacia: 'nom3' });
const NX = -20, CX = 320, BX = 0;
E.figura('yo3', { t0: N[2].S - 0.1, t1: TC, x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(7, 2), 'coger'], [w(7, 5), 'levantar'], [w(7, 9), 'celebrar'], [w(7, 12), 'ofrecer'],
    [w(8, 0), 'de_pie'], [w(8, 1), 'senalar'], [w(8, 5), 'encoger'], [w(8, 7), 'triste'], [w(8, 10), 'levantar'], [w(8, 14), 'senalar'], [wf(8, -1), 'celebrar']],
  sonrisa: [[0, 0.3], [w(7, 2), 0.6], [w(7, 9), 1.3], [w(8, 0), 0.4], [w(8, 5), -0.3], [w(8, 7), -0.9], [w(8, 10), 0.6], [wf(8, -1), 1.5]] });
// la nómina llega (el día que cobras) y una moneda se aparta
E.obj('nom3', 'pila', { t0: N[2].S - 0.1, t1: w(8, 0), sale: 0.25, x: NX, n: 6, w: 150, hh: 24, pop: true, refl: true, r: 60, oy: -60,
  k: [[0, 6], [w(7, 2), 6], [w(7, 2) + 0.25, 5, 'out']], barrido: [w(7, 9)], caja: [-75, -128, 150, 128] });
E.obj('rotNom3', 'rotulo', { t0: N[2].S, t1: w(8, 0), sale: 0.25, x: NX, y: 56, texto: 'NÓMINA', size: 28, col: '#c9ccca', pop: true, caja: [-80, -17, 160, 34] });
E.obj('aparta', 'moneda', { t0: w(7, 2), t1: w(7, 13) + 0.12, entra: 0.08, sale: 0.1, r: 30, n: '', libre: true, estela: 2, sfx: false, inspeccion: false,
  x: [[w(7, 2), NX], [w(7, 12), NX], [w(7, 13), CX, 'inout']],
  y: [[w(7, 2), -120], [w(7, 2) + 0.4, -300, 'out'], [w(7, 12), -300], [w(7, 12) + 0.16, -360, 'out'], [w(7, 13), -120, 'in']],
  s: [[0, 1], [w(7, 5), 1], [w(7, 5) + 0.15, 1.25], [w(7, 5) + 0.35, 1]] });
E.obj('rotFija', 'rotulo', { t0: w(7, 4) - 0.05, t1: w(7, 12), sale: 0.2, x: NX, y: -385, texto: 'CANTIDAD FIJA', size: 26, col: AM, peso: 700, pop: true, caja: [-135, -16, 270, 32] });
E.obj('rotDia', 'rotulo', { t0: w(7, 7) - 0.05, t1: w(8, 0), sale: 0.25, x: NX, y: -200, texto: 'DÍA DE COBRO', size: 24, col: GRIS, pop: true, caja: [-120, -15, 240, 30] });
E.obj('pulsoCobro', 'pulso', { t0: w(7, 9), t1: w(7, 9) + 0.6, x: NX, y: -60, r0: 60, r1: 170, inspeccion: false });
E.golpe(w(7, 9), 0.03);
// la cuenta aparte: un tarro que se va llenando
E.obj('cuenta', 'tarro', { t0: w(7, 10) - 0.05, t1: TC, x: CX, w: 170, h: 205, pop: true, rotulo: 'CUENTA APARTE',
  nivel: [[w(7, 13), 0], [w(7, 13) + 0.3, 0.1, 'out'], [w(8, 5), 0.1], [wf(8, 8) + 0.2, 0.3, 'lin'], [w(8, 11), 0.3], [w(8, 11) + 0.5, 1, 'out']],
  tapa: [[wf(8, -1), 0], [wf(8, -1) + 0.3, 1, 'out']], barrido: [w(8, 11) + 0.55, wf(8, -1) + 0.2], caja: [-135, -205, 270, 270] });
E.obj('pulsoCta', 'pulso', { t0: w(7, 13), t1: w(7, 13) + 0.6, x: CX, y: -100, r0: 50, r1: 150, inspeccion: false });
E.sfx(w(7, 13), 'fill'); E.golpe(w(7, 13), 0.03);
// «Con cien euros al mes… casi cuatro años; con cuatrocientos, poco más de once meses»
E.obj('cuota', 'contador', { t0: w(8, 1) - 0.1, t1: TC, x: BX, y: -440, size: 84, suf: ' €', pop: true,
  v: [[w(8, 1) - 0.1, 0], [w(8, 1) + 0.35, 100, 'out'], [w(8, 10), 100], [w(8, 10) + 0.5, 400, 'inout']], barrido: [w(8, 10) + 0.55], caja: [-150, -48, 300, 96] });
E.obj('rotAlMes', 'rotulo', { t0: w(8, 3), t1: TC, x: BX, y: -366, texto: 'AL MES', size: 24, col: GRIS, pop: true, caja: [-70, -15, 140, 30] });
E.obj('lento', 'relleno', { t0: w(8, 5) - 0.1, t1: TC, x: BX, y: -265, w: 320, h: 34, pop: true,
  rotulo: [[0, ''], [w(8, 6) - 0.05, 'CASI CUATRO AÑOS']], f: [[w(8, 5), 0], [wf(8, 8) + 0.2, 1, 'lin']], luz: [[0, 1], [w(8, 9), 1], [w(8, 10), 0.45]], caja: [-160, -51, 320, 68] });
E.obj('rapido', 'relleno', { t0: w(8, 9) - 0.05, t1: TC, x: BX, y: -165, w: 320, h: 34, pop: true,
  rotulo: [[0, ''], [w(8, 11) - 0.05, 'MÁS DE ONCE MESES']], f: [[w(8, 11), 0], [w(8, 11) + 0.45, 1, 'out']], barrido: [wf(8, -1) + 0.2], caja: [-160, -51, 320, 68] });
E.sfx(w(8, 5), 'fill'); E.sfx(w(8, 11), 'fill');
[0, 1, 2].forEach(i => vuela('ctaM' + i, w(8, 11) + i * 0.14, [BX + 100, -165], [CX, -150], 0.36, 15));
E.temblor(w(8, 8), 8, 0.3);
E.obj('ch3', 'chispas', { t0: wf(8, -1), t1: wf(8, -1) + 0.8, x: CX, y: -110, r0: 110, r1: 200, inspeccion: false });
E.golpe(wf(8, -1), 0.04); E.destello(wf(8, -1), 0.12);

// ---------- cierre: resumen y envío ----------
// 9: Un(0) fondo(1) de(2) emergencia(3) no(4) te(5) da(6) dinero(7) te(8) quita(9) el(10) miedo(11) a(12) quedarte(13) sin(14) nada(15)
// 10: Mándaselo(0) a(1) ese(2) amigo(3) que(4) vive(5) de(6) nómina(7) en(8) nómina(9)
E.sfx(TC, 'cut');
E.obj('rayosC', 'rayos', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(9, 8), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, items: ['Tus gastos', 'Por tres', 'Aparta'], gap: 250,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(9, 8), w(9, 11)], caja: [-370, -60, 740, 200] });
E.obj('confC', 'confeti', { t0: wf(9, -1), t1: wf(9, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(9, -1), 0.22); E.golpe(wf(9, -1), 0.04);
E.figura('yoF', { t0: w(10, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(10, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(10, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(10, 9)], vuelo: [[wf(10, -1), 0], [wf(10, -1) + 0.5, 1, 'in']] });
