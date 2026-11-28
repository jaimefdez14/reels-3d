// L43 · Los gastos hormiga (estilo B; reglas 15, 20, 21, 24)
// Gancho visual: el café de 3 € al día; una pila de monedas crece y el contador rueda hasta 1.095 € al año.
// Regla 20: «Es solo un café.» va en bocadillo del muñeco; la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(2, 1), gap: 70, y: 360 } });

// «El primero: // …» → T en «El», S dos palabras después
const N = [3, 5, 7].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(9, 0) - 0.1;

E.camara([
  [0, [0, -380, 1.04]], [w(0, 10), [20, -385, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 5), [10, -390, 1.05]], [w(2, 0), [0, -385, 1.03]], [N[0].T, [20, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(3, 7), [20, -385, 1.05]], [w(4, 0), [0, -380, 1.03]], [w(4, 7), [10, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(5, 8), [0, -385, 1.05]], [w(6, 0), [0, -385, 1.03]], [w(6, 9), [20, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(7, 9), [0, -385, 1.03]], [w(8, 4), [10, -390, 1.05]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Un(0) café(1) de(2) tres(3) euros(4) al(5) día(6) no(7) parece(8) nada.(9) Son(10) 1.095(11) euros(12) al(13) año.(14)   [bocadillo «Es solo un café.»]
// 1: Se(0) llaman(1) gastos(2) hormiga:(3) pequeños,(4) diarios(5) y(6) casi(7) invisibles.(8)
// 2: Tres(0) pasos(1) para(2) encontrarlos(3) y(4) recortarlos.(5)
const GX = 190;
E.figura('yo', { t0: 0, t1: fin(0), x: -330, cara: true, toca: [],
  poses: [[0, 'de_pie'], [w(0, 1), 'ofrecer'], [w(0, 7), 'encoger'], [w(0, 10), 'manos_cabeza'], [w(1, 0), 'senalar'], [w(1, 4), 'de_pie'], [w(2, 0), 'senalar'], [w(2, 3), 'levantar']],
  sonrisa: [[0, 1.2], [w(0, 7), 0.6], [w(0, 10), -1.2], [w(1, 4), -0.4], [w(2, 0), 0.4], [w(2, 5), 1.2]] });
E.obj('bocaH', 'bocadillo', { t0: 0.3, t1: w(0, 8), sale: 0.2, x: -60, y: -490, w: 340, h: 80, texto: 'Es solo un café.', size: 26, pop: true,
  on: [[0.3, 0], [0.8, 1]], caja: [-170, -40, 340, 106] });
E.obj('cafe', 'etiqueta', { t0: 0.1, t1: fin(0), x: GX, y: -300, w: 360, h: 120,
  v: [[w(0, 1), 0], [w(0, 3) + 0.3, 3, 'out']], miles: false, caja: [-180, -60, 360, 120] });
E.obj('rotCafe', 'rotulo', { t0: w(0, 8) + 0.15, t1: w(1, 2), sale: 0.15, x: GX, y: -395, pop: true, texto: [[0, 'UN CAFÉ AL DÍA'], [w(0, 12), 'AL AÑO']], size: 26, col: '#9a9c9b', caja: [-170, -16, 340, 32] });
E.obj('pilaH', 'pila', { t0: 0.1, t1: fin(0), x: GX, n: 10, w: 190, hh: 26, k: [[w(0, 10), 0], [w(0, 12) + 0.15, 10, 'out']],
  luz: [[0, 1], [w(1, 0), 1], [w(1, 0) + 0.3, 0.55]], caja: [-95, -224, 190, 224], refl: true });
E.obj('anual', 'contador', { t0: w(0, 10) - 0.05, t1: w(2, 0) - 0.25, sale: 0.2, x: GX, y: -475, v: [[w(0, 10), 0], [w(0, 12) + 0.15, 1095, 'out']], suf: ' €', size: 80, col: 'txt', pop: true,
  barrido: [w(0, 12) + 0.3], caja: [-200, -46, 400, 92] });
for (let i = 0; i < 5; i++) { const a = w(0, 10) + i * 0.16;
  E.obj('dia' + i, 'moneda', { t0: a, t1: a + 0.7, entra: 0.05, sale: 0.15, r: 22, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, GX + (i % 2) * 30 - 15], [a + 0.7, GX, 'in']], y: [[a, -290], [a + 0.7, -230, 'in']] }); }
E.sfx(w(0, 10), 'fill'); E.temblor(w(0, 12), 10, 0.4); E.golpe(w(0, 12), 0.05); E.destello(w(0, 12) + 0.2, 0.15);
// «gastos hormiga: pequeños, diarios, casi invisibles»: una fila de monedas minúsculas que se van apagando
E.obj('rotHormiga', 'rotulo', { t0: w(1, 2), t1: w(2, 0) - 0.1, sale: 0.2, x: GX, y: -395, texto: 'GASTOS HORMIGA', size: 28, col: '#e6ce46', pop: true, caja: [-190, -17, 380, 34] });
for (let i = 0; i < 8; i++) { const a = w(1, 3) + i * 0.38;
  E.obj('ant' + i, 'moneda', { t0: a, t1: a + 1.5, entra: 0.1, sale: 0.2, r: 11, n: '', libre: true, sfx: false, inspeccion: false,
    a: [[a, 1], [a + 1.5, 0.25]], x: [[a, -140], [a + 1.4, GX - 70, 'lin']], y: [[a, -12], [a + 1.5, -12]] }); }
// «Tres pasos para encontrarlos y recortarlos»: tres monedas; la primera crece
E.obj('rayosH', 'rayos', { t0: w(2, 0) - 0.1, t1: fin(0), x: GX, y: -480, r: 300, z: -2, p: [[w(2, 0) - 0.1, 0], [w(2, 5), 1, 'out']], inspeccion: false });
[0, 1, 2].forEach(i => { const a = w(2, 0) + i * 0.12;
  E.obj('s' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: GX + (i - 1) * 100, y: -480, r: 34, n: i + 1, pop: true, sfx: i === 0, inspeccion: false,
    s: i === 0 ? [[0, 1], [w(2, 5), 1], [w(2, 5) + 0.35, 1.4, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [w(2, 5), 1], [w(2, 5) + 0.3, 0.35]], barrido: i === 0 ? [w(2, 5) + 0.1] : null }); });
E.obj('chH', 'chispas', { t0: wf(1, -1), t1: wf(1, -1) + 0.8, x: GX - 100, y: -480, r0: 50, r1: 130, inspeccion: false });
E.destello(w(2, 5), 0.15);

// ---------- 1 · apunta todo lo que pagues durante un mes ----------
// 3: El(0) primero:(1) apunta(2) todo(3) lo(4) que(5) pagues(6) durante(7) un(8) mes.(9)
// 4: Café,(0) suscripciones,(1) comisiones,(2) gastos(3) de(4) envío.(5) Lo(6) que(7) no(8) se(9) apunta(10) no(11) se(12) ve.(13)
E.numero(1, N[0].T, N[0].S, { desde: 's1', hacia: 'lista1' });
const P1 = -30, LY1 = -300, LX1 = 300;
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -370, cara: true,
  poses: [[0, 'de_pie'], [w(3, 2), 'coger'], [w(3, 7), 'meter'], [w(4, 0), 'senalar'], [w(4, 6), 'pensar'], [w(4, 9), 'senalar'], [wf(4, -1) + 0.1, 'celebrar']],
  sonrisa: [[w(3, 2), 0.4], [w(4, 6), 0], [wf(4, -1), 1.4]] });
E.obj('lista1', 'lista', { t0: N[0].S - 0.1, t1: fin(1), x: P1, y: LY1, n: 4, w: 240, gap: 70, pop: true, sobrevive: true,
  p: [[w(4, 0) - 0.01, 0], [w(4, 0) + 0.3, 1, 'out'], [w(4, 1), 1], [w(4, 1) + 0.3, 2, 'out'], [w(4, 2), 2], [w(4, 2) + 0.3, 3, 'out'], [w(4, 3), 3], [w(4, 3) + 0.3, 4, 'out']],
  brillo: [[w(4, 7) - 0.01, 0], [wf(4, -1), 4, 'inout']], barrido: [wf(4, -1) + 0.1], caja: [-120, -140, 240, 280], refl: false });
[['CAFÉ', 0], ['SUSCRIPCIONES', 1], ['COMISIONES', 2], ['GASTOS DE ENVÍO', 3]].forEach(([s, k]) => {
  E.obj('it' + k, 'rotulo', { t0: w(4, k === 3 ? 3 : k), t1: fin(1), x: LX1, y: LY1 + (k - 1.5) * 70, texto: s, size: 24, track: 2, col: '#e6ce46', pop: true, caja: [-140, -14, 280, 28] });
});
E.obj('apunt', 'contador', { t0: w(4, 0) - 0.05, t1: fin(1), x: P1, y: -480, v: [[w(4, 0), 0], [w(4, 0) + 0.3, 1, 'out'], [w(4, 1), 1], [w(4, 1) + 0.3, 2, 'out'], [w(4, 2), 2], [w(4, 2) + 0.3, 3, 'out'], [w(4, 3), 3], [w(4, 3) + 0.3, 4, 'out']],
  size: 60, col: 'txt', miles: false, suave: false, pop: true, caja: [-60, -34, 120, 68] });
E.obj('rotApunt', 'rotulo', { t0: w(4, 0) - 0.05, t1: fin(1), x: P1, y: -545, texto: 'APUNTADO', size: 24, col: '#9a9c9b', pop: true, caja: [-110, -15, 220, 30] });
E.obj('mes', 'relleno', { t0: w(3, 6) - 0.1, t1: fin(1), x: P1, y: -60, w: 400, h: 40, pop: true, rotulo: 'UN MES',
  f: [[w(3, 6), 0], [wf(3, -1) + 0.3, 0.5, 'inout'], [wf(4, -1), 1, 'inout']], caja: [-200, -70, 400, 90] });
for (let k = 0; k < 4; k++) { const a = w(4, k);
  E.obj('ap' + k, 'moneda', { t0: a, t1: a + 0.7, entra: 0.05, sale: 0.15, r: 20, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, -300], [a + 0.65, P1 - 100, 'inout']], y: [[a, -330], [a + 0.3, -400 + k * 20], [a + 0.65, LY1 + (k - 1.5) * 70, 'in']] }); }
E.sfx(w(3, 7), 'fill'); E.sfx(w(4, 7), 'fill'); E.golpe(w(4, 3) + 0.3, 0.04);
E.obj('ch1', 'chispas', { t0: wf(4, -1), t1: wf(4, -1) + 0.8, x: P1, y: LY1, r0: 120, r1: 220, inspeccion: false });
E.destello(wf(4, -1), 0.12);

// ---------- 2 · sepáralo en lo que usas y lo que no ----------
// 5: El(0) segundo:(1) sepáralo(2) en(3) lo(4) que(5) usas(6) y(7) lo(8) que(9) no.(10)
// 6: Lo(0) que(1) te(2) da(3) algo(4) a(5) cambio(6) se(7) queda.(8) Lo(9) que(10) pagas(11) por(12) inercia,(13) fuera.(14)
E.numero(2, N[1].T, N[1].S, { desde: 'lista1', hacia: 'tarroU' });
const PS = -150, TU = 70, TI = 320;
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -340, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'ofrecer'], [w(5, 4), 'senalar'], [w(5, 7), 'apartarse'], [w(5, 9), 'de_pie'], [w(6, 0), 'senalar'], [w(6, 7), 'celebrar'], [w(6, 9), 'apartarse'], [w(6, 13), 'levantar']],
  sonrisa: [[w(5, 2), 0.3], [w(5, 7), 0], [w(6, 0), 0.6], [w(6, 7), 1.4], [w(6, 9), -0.8], [w(6, 14), 0.3]] });
E.obj('pilaS', 'pila', { t0: N[1].S - 0.1, t1: fin(2), x: PS, n: 6, w: 130, hh: 26, k: [[N[1].S, 0], [N[1].S + 0.5, 6, 'out'], [w(5, 4), 6], [w(5, 10) + 0.5, 0, 'inout']],
  caja: [-65, -140, 130, 140], refl: true });
E.obj('tarroU', 'tarro', { t0: N[1].S - 0.1, t1: fin(2), x: TU, w: 180, h: 260, rotulo: 'SE QUEDA', pop: true, sobrevive: true,
  nivel: [[w(5, 4), 0], [w(5, 6) + 0.6, 0.5, 'inout'], [w(6, 7), 0.5], [w(6, 8) + 0.3, 0.8, 'inout']], barrido: [w(6, 7)], caja: [-90, -260, 180, 260], refl: true });
E.obj('tarroI', 'tarro', { t0: N[1].S - 0.05, t1: fin(2), x: TI, w: 180, h: 260, rotulo: 'INERCIA', pop: true,
  nivel: [[w(5, 7), 0], [w(5, 10) + 0.6, 0.5, 'inout'], [wf(6, -1) - 0.1, 0.5], [wf(6, -1) + 0.5, 0, 'inout']],
  apagado: [[w(6, 9), 0], [w(6, 11), 1]], tapa: [[wf(6, -1) + 0.3, 0], [wf(6, -1) + 0.7, 1, 'out']], caja: [-90, -260, 180, 260], refl: true });
for (let i = 0; i < 3; i++) { const a = w(5, 4) + i * 0.3;
  E.obj('mu' + i, 'moneda', { t0: a, t1: a + 0.8, entra: 0.06, sale: 0.15, r: 22, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, PS], [a + 0.75, TU, 'inout']], y: [[a, -170], [a + 0.38, -310], [a + 0.75, -150, 'in']] }); }
for (let i = 0; i < 3; i++) { const a = w(5, 8) + i * 0.28;
  E.obj('mi' + i, 'moneda', { t0: a, t1: a + 0.9, entra: 0.06, sale: 0.15, r: 22, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, PS], [a + 0.85, TI, 'inout']], y: [[a, -170], [a + 0.42, -330], [a + 0.85, -150, 'in']] }); }
E.sfx(w(5, 4), 'fill'); E.sfx(w(5, 8), 'fill');
// «Lo que te da algo a cambio se queda»: sale un corazón del tarro y brilla
E.obj('cor', 'corazon', { t0: w(6, 3), t1: fin(2), x: TU, y: -345, r: 40, pop: true, s: [[0, 1], [w(6, 7), 1], [w(6, 7) + 0.3, 1.35, 'back']], inspeccion: false });
E.obj('rayosU', 'rayos', { t0: w(6, 7) - 0.1, t1: fin(2), x: TU, y: -345, r: 260, z: -2, p: [[w(6, 7) - 0.1, 0], [w(6, 8), 1, 'out']], inspeccion: false });
E.obj('chU', 'chispas', { t0: w(6, 7), t1: w(6, 7) + 0.8, x: TU, y: -345, r0: 60, r1: 150, inspeccion: false });
E.destello(w(6, 7), 0.12);
// «Lo que pagas por inercia, fuera»: el tarro se apaga y sus monedas salen volando
for (let i = 0; i < 4; i++) { const a = wf(6, -1) - 0.1 + i * 0.12;
  E.obj('fuera' + i, 'moneda', { t0: a, t1: a + 0.8, entra: 0.05, sale: 0.2, r: 22, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, TI + 30], [a + 0.8, 580 + i * 30, 'in']], y: [[a, -190], [a + 0.35, -250 - i * 6, 'out'], [a + 0.8, -110, 'in']] }); }
E.temblor(wf(6, -1) - 0.05, 14, 0.45); E.golpe(wf(6, -1), 0.05);

// ---------- 3 · lo que quites, apártalo a otra cuenta el día que cobras ----------
// 7: El(0) tercero:(1) lo(2) que(3) quites,(4) apártalo(5) a(6) otra(7) cuenta(8) el(9) día(10) que(11) cobras.(12)
// 8: Quita(0) esos(1) tres(2) euros(3) y(4) en(5) un(6) año(7) tienes(8) 1.095(9) euros.(10)
E.numero(3, N[2].T, N[2].S, { desde: 'tarroU', hacia: 'tarroA' });
const P3 = -70, T3 = 250;
E.figura('yo3', { t0: N[2].S - 0.1, t1: TC, x: -375, cara: true,
  poses: [[0, 'de_pie'], [w(7, 2), 'meter'], [w(7, 5), 'senalar'], [w(7, 9), 'ofrecer'], [w(8, 0), 'coger'], [w(8, 4), 'senalar'], [w(8, 9), 'celebrar']],
  sonrisa: [[w(7, 2), 0.4], [w(8, 0), 0.6], [w(8, 9), 1.5]] });
E.obj('pila3', 'pila', { t0: N[2].S - 0.1, t1: TC, sale: 0.2, x: P3, n: 8, w: 170, hh: 26,
  k: [[N[2].S, 0], [N[2].S + 0.5, 8, 'out'], [w(7, 9), 8], [wf(7, -1) + 0.4, 6.4, 'inout'], [w(8, 1), 6.4], [w(8, 3), 7.4, 'inout']], caja: [-85, -224, 170, 224], refl: true });
E.obj('rotCuenta', 'rotulo', { t0: N[2].S, t1: TC, sale: 0.2, x: P3, y: -440, texto: 'TU CUENTA', size: 24, col: '#9a9c9b', caja: [-100, -15, 200, 30] });
E.obj('tarroA', 'tarro', { t0: N[2].S - 0.1, t1: TC, sale: 0.2, x: T3, w: 200, h: 270, rotulo: 'APARTE', pop: true,
  nivel: [[w(7, 9), 0], [wf(7, -1) + 0.5, 0.3, 'inout'], [w(8, 1), 0.3], [w(8, 3), 0.45, 'inout'], [w(8, 4), 0.45], [w(8, 9) + 0.3, 0.95, 'inout']],
  barrido: [wf(8, -1)], caja: [-100, -270, 200, 270], refl: true });
E.obj('flecha3', 'flecha', { t0: w(7, 5) - 0.1, t1: w(7, 9), sale: 0.15, de: [P3 + 70, -395], hasta: [T3 - 90, -395], curva: -0.2, discontinua: true, p: [[w(7, 5), 0], [w(7, 8) + 0.2, 1, 'out']], inspeccion: false });
E.obj('cobras', 'rotulo', { t0: w(7, 9) - 0.05, t1: w(8, 4), sale: 0.2, x: T3, y: -440, texto: 'EL DÍA QUE COBRAS', size: 24, track: 2, col: '#e6ce46', pop: true, caja: [-170, -15, 340, 30] });
E.obj('anio', 'rotulo', { t0: w(8, 4) - 0.05, t1: TC, sale: 0.2, x: T3, y: -440, texto: 'EN UN AÑO', size: 26, col: '#e6ce46', pop: true, caja: [-110, -16, 220, 32] });
for (let i = 0; i < 4; i++) { const a = w(7, 9) + i * 0.22;
  E.obj('m3_' + i, 'moneda', { t0: a, t1: a + 0.8, entra: 0.06, sale: 0.15, r: 22, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, P3], [a + 0.75, T3, 'inout']], y: [[a, -200], [a + 0.38, -285], [a + 0.75, -150, 'in']] }); }
E.sfx(w(7, 9), 'fill');
// «Quita esos tres euros»: aparece la etiqueta de 3 € y su moneda va al tarro
E.obj('tres', 'etiqueta', { t0: w(8, 0) - 0.05, t1: w(8, 4) + 0.3, sale: 0.2, x: P3, y: -310, w: 220, h: 90, v: [[w(8, 0), 0], [w(8, 2) + 0.2, 3, 'out']], miles: false, pop: true, caja: [-110, -45, 220, 90] });
{ const a = w(8, 2) + 0.2;
  E.obj('m3x', 'moneda', { t0: a, t1: a + 0.8, entra: 0.06, sale: 0.15, r: 22, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, P3], [a + 0.75, T3, 'inout']], y: [[a, -300], [a + 0.38, -370], [a + 0.75, -150, 'in']] }); }
// «y en un año tienes 1.095 euros»: el contador rueda hasta la cifra de la voz
E.obj('suma', 'contador', { t0: w(8, 4) - 0.1, t1: TC, sale: 0.2, x: T3, y: -365, size: 56, col: 'txt', suf: ' €', pop: true, barrido: [wf(8, -1)],
  v: [[w(8, 4), 0], [w(8, 9) + 0.2, 1095, 'inout']], caja: [-150, -34, 300, 68] });
E.obj('rayos3', 'rayos', { t0: w(8, 9), t1: TC, x: T3, y: -365, r: 330, z: -2, p: [[w(8, 9), 0], [wf(8, -1), 1, 'out']], inspeccion: false });
E.obj('ch3', 'chispas', { t0: wf(8, -1), t1: wf(8, -1) + 0.8, x: T3, y: -365, r0: 150, r1: 260, inspeccion: false });
E.golpe(wf(8, -1), 0.05); E.destello(wf(8, -1), 0.15);

// ---------- cierre: resumen y envío ----------
// 9: No(0) es(1) cuestión(2) de(3) dejar(4) de(5) disfrutar,(6) sino(7) de(8) decidir(9) en(10) qué(11) se(12) te(13) va(14) el(15) dinero.(16)
// 10: Mándaselo(0) a(1) ese(2) amigo(3) que(4) dice(5) que(6) no(7) sabe(8) en(9) qué(10) se(11) le(12) va(13) el(14) dinero.(15)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(9, 7), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, items: ['Apunta', 'Separa', 'Aparta'], gap: 230,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(9, 9)], caja: [-360, -60, 720, 200] });
E.obj('confC', 'confeti', { t0: wf(9, -1), t1: wf(9, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(9, -1), 0.22); E.golpe(wf(9, -1), 0.04);
E.figura('yoF', { t0: w(10, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(10, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(10, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(10, 15)], vuelo: [[wf(10, -1), 0], [wf(10, -1) + 0.5, 1, 'in']] });
