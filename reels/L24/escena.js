// L24 · La regla del 72 (estilo B; reglas 14, 15, 20, 21, 24)
// Hilo visual: la división «72 ÷ interés = años» se escribe pieza a pieza en una fila fija, arriba; debajo, lo que pasa
// con el dinero en esos años (montón que se duplica / dinero que pierde la mitad / deuda que se duplica).
// Regla 20: «Ya lo iré pagando poco a poco» va en bocadillo del muñeco (línea 9); la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
const ROJO = '#e4574f', AM = '#e6ce46', GRIS = '#9a9c9b';
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'barras', aparece: w(1, 9), gap: 70, y: 360 } });

// «La primera: // …» → T en «La», S en la primera palabra del punto
const N = [2, 6, 8].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TX = w(10, 0) - 0.1;   // «La regla no es exacta»
const TC = w(11, 0) - 0.1;   // resumen

E.camara([
  [0, [0, -380, 1.04]], [w(0, 9), [20, -385, 1.07]], [w(1, 0), [0, -380, 1.02]], [N[0].T, [20, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(3, 9), [30, -395, 1.04]], [w(4, 12), [20, -385, 1.06]], [w(5, 0), [0, -390, 1.02]], [N[1].T, [0, -390, 1.05]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(7, 10), [-10, -395, 1.04]], [w(7, 17), [10, -385, 1.06]], [N[2].T, [10, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(9, 7), [-10, -390, 1.03]], [wf(9, -1), [0, -385, 1.03]], [TX, [0, -385, 1.02]], [TC, [0, -395, 1.05]],
]);

// fila de la división, arriba (y = FY); dx desplaza la fila entera
const FY = -520;
function division(id, dx, t72, tdiv, teq, t1, sale = 0.2) {
  E.obj(id + '72', 'rotulo', { t0: t72, t1, sale, x: -100 + dx, y: FY, texto: '72', size: 66, peso: 700, col: AM, track: 0, pop: true, caja: [-46, -36, 92, 72] });
  E.obj(id + 'div', 'rotulo', { t0: tdiv, t1, sale, x: -20 + dx, y: FY, texto: '÷', size: 62, col: '#e8e8e6', track: 0, pop: true, caja: [-22, -30, 44, 60] });
  if (teq !== null) E.obj(id + 'eq', 'rotulo', { t0: teq, t1, sale, x: 150 + dx, y: FY, texto: '=', size: 62, col: '#e8e8e6', track: 0, pop: true, caja: [-22, -30, 44, 60] });
}
const PX = 65, RX = 245;     // hueco del interés y del resultado

// ---------- gancho ----------
// 0: Hay(0) una(1) cuenta(2) que(3) se(4) hace(5) en(6) diez(7) segundos(8) y(9) te(10) dice(11) cuándo(12) se(13) duplica(14) tu(15) dinero(16)
// 1: Se(0) llama(1) la(2) regla(3) del(4) 72(5) y(6) sirve(7) para(8) tres(9) cosas(10)
E.figura('yo', { t0: 0, t1: fin(0), x: -330, cara: true,
  poses: [[0, 'pensar'], [w(0, 7), 'senalar'], [w(0, 12), 'de_pie'], [w(0, 14), 'celebrar'], [w(1, 0), 'de_pie'], [w(1, 3), 'senalar'], [w(1, 9), 'ofrecer']],
  sonrisa: [[0, 0.2], [w(0, 7), 0.5], [w(0, 14), 1.5], [w(1, 0), 0.6], [w(1, 9), 1.2]] });
E.obj('reloj0', 'relojAm', { t0: 0, t1: w(0, 13), sale: 0.3, x: 150, y: -390, r: 85, texto: '10 s',
  p: [[0.3, 0], [wf(0, 8), 1, 'inout']], caja: [-87, -87, 174, 174] });
E.obj('pila0', 'pila', { t0: 0, t1: fin(0), x: 150, n: 8, w: 170, hh: 26,
  k: [[0, 4], [w(0, 13), 4], [wf(0, 16), 8, 'inout']], barrido: [wf(0, 16)], caja: [-85, -185, 170, 185], refl: true });
for (let i = 0; i < 4; i++) { const a = w(0, 13) + 0.05 + i * 0.14;
  E.obj('m0_' + i, 'moneda', { t0: a, t1: a + 0.7, entra: 0.06, sale: 0.15, r: 20, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, -260], [a + 0.65, 150, 'inout']], y: [[a, -300], [a + 0.32, -470], [a + 0.65, -120, 'in']] }); }
E.obj('x2h', 'rotulo', { t0: wf(0, 16) - 0.1, t1: fin(0), x: 335, y: -110, texto: '×2', size: 58, peso: 700, col: AM, track: 0, pop: true, caja: [-50, -32, 100, 64] });
E.obj('chH', 'chispas', { t0: wf(0, 16), t1: wf(0, 16) + 0.8, x: 150, y: -120, r0: 90, r1: 200, inspeccion: false });
E.golpe(wf(0, 16), 0.04);
// «la regla del 72»: moneda grande con 72 y rayos
E.obj('rayos72', 'rayos', { t0: w(1, 2) - 0.1, t1: w(1, 9) + 0.3, x: 150, y: -400, r: 340, z: -2, p: [[w(1, 2), 0], [w(1, 5), 1, 'out']], inspeccion: false });
E.obj('m72', 'moneda', { t0: w(1, 2), t1: w(1, 9), sale: 0.2, x: 150, y: -400, r: 95, n: 72, pop: true, barrido: [w(1, 5)],
  s: [[0, 1], [w(1, 5), 1], [w(1, 5) + 0.3, 1.15, 'back'], [w(1, 5) + 0.6, 1]], caja: [-97, -97, 194, 194] });
E.golpe(w(1, 5), 0.05);
// «tres cosas»: tres monedas; la tercera se queda y abre el primer punto
[0, 1, 2].forEach(i => { const a = w(1, 9) + i * 0.12;
  E.obj('h' + (i + 1), 'moneda', { t0: a, t1: i === 2 ? fin(0) : N[0].T + 0.1, entra: 0.15, sale: 0.2, x: 150 + (i - 1) * 110, y: -400, r: 38, n: i + 1, pop: true, sfx: i === 0, inspeccion: false,
    sobrevive: i === 2, s: i === 2 ? [[0, 1], [wf(1, -1), 1], [wf(1, -1) + 0.35, 1.3, 'back']] : 1 }); });

// ---------- 1 · cuándo se duplica lo que inviertes: 72 ÷ 6 = 12, el montón se duplica en 12 años ----------
// 2: La(0) primera(1) saber(2) cuándo(3) se(4) duplica(5) lo(6) que(7) inviertes(8)
// 3: Coge(0) el(1) interés(2) que(3) te(4) dan(5) al(6) año(7) y(8) divide(9) 72(10) entre(11) ese(12) número(13) Lo(14) que(15) te(16) salga(17) son(18) los(19) años(20) que(21) tarda(22) en(23) duplicarse(24)
// 4: Con(0) un(1) seis(2) por(3) ciento(4) setenta(5) y(6) dos(7) entre(8) seis(9) son(10) doce(11) en(12) doce(13) años(14) tienes(15) el(16) doble(17)
// 5: Con(0) un(1) nueve(2) por(3) ciento(4) setenta(5) y(6) dos(7) entre(8) nueve(9) son(10) ocho(11) Tres(12) puntos(13) más(14) y(15) tienes(16) el(17) doble(18) cuatro(19) años(20) antes(21)
E.numero(1, N[0].T, N[0].S, { desde: 'h3', hacia: 'pila1' });
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -380, cara: true,
  poses: [[0, 'de_pie'], [w(2, 2), 'senalar'], [w(2, 6), 'ofrecer'], [w(3, 0), 'coger'], [w(3, 9), 'senalar'], [w(3, 18), 'de_pie'], [w(4, 2), 'senalar'],
    [w(4, 12), 'celebrar'], [w(5, 0), 'de_pie'], [w(5, 2), 'senalar'], [w(5, 12), 'ofrecer'], [w(5, 19), 'celebrar']],
  sonrisa: [[w(2, 2), 0.5], [w(3, 0), 0.3], [w(4, 12), 1.5], [w(5, 0), 0.4], [w(5, 19), 1.6]] });
E.obj('pila1', 'pila', { t0: N[0].S - 0.1, t1: fin(1), x: 150, n: 8, w: 170, hh: 26, sobrevive: true, r: 70, oy: -100,
  k: [[N[0].S, 0], [N[0].S + 0.3, 0], [wf(2, -1), 4, 'out'], [w(4, 12), 4], [wf(4, -1), 8, 'inout'], [w(5, 0), 8], [w(5, 2), 4, 'inout'], [w(5, 11), 4], [w(5, 18), 8, 'inout']],
  barrido: [w(3, 22), wf(4, -1), w(5, 18)], caja: [-85, -185, 170, 185], refl: true });
E.sfx(w(4, 12), 'fill'); E.sfx(w(5, 11), 'fill');
E.obj('rotInv', 'rotulo', { t0: w(2, 6), t1: w(3, 24) + 0.3, sale: 0.2, x: 150, y: -265, texto: 'LO QUE INVIERTES', size: 26, col: GRIS, pop: true, caja: [-140, -16, 280, 32] });
// monedas que vuelan de la mano al montón: «lo que inviertes» y las dos veces que se duplica
[[w(2, 6), 4], [w(4, 12), 4], [w(5, 11), 4]].forEach(([a0, n], g) => { for (let i = 0; i < n; i++) { const a = a0 + i * (g ? 0.45 : 0.2);
  E.obj(`m1_${g}_${i}`, 'moneda', { t0: a, t1: a + 0.75, entra: 0.06, sale: 0.15, r: 20, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, -300], [a + 0.7, 150, 'inout']], y: [[a, -320], [a + 0.35, -450], [a + 0.7, -150, 'in']] }); } });
// la división se escribe: primero el interés (%), luego «72 ÷», luego «= AÑOS»
E.obj('pPct', 'pieza', { t0: w(3, 2) - 0.05, t1: w(4, 2), sale: 0.15, x: PX, y: FY, r: 38, texto: '%', pop: true });
E.obj('rotInt', 'rotulo', { t0: w(3, 2), t1: fin(1), x: PX, y: -455, texto: 'INTERÉS AL AÑO', size: 22, col: GRIS, pop: true, caja: [-105, -14, 210, 28] });
division('d1', 0, w(3, 9) + 0.05, w(3, 11), w(3, 18), fin(1));
E.obj('rotAnios', 'rotulo', { t0: w(3, 20) - 0.05, t1: w(4, 10), sale: 0.15, x: RX, y: FY, texto: 'AÑOS', size: 36, peso: 700, col: AM, pop: true, caja: [-60, -22, 120, 44] });
E.obj('p6', 'pieza', { t0: w(4, 2) - 0.05, t1: w(5, 2), sale: 0.15, x: PX, y: FY, r: 38, texto: '6', pop: true });
E.obj('p9', 'pieza', { t0: w(5, 2) - 0.05, t1: fin(1), x: PX, y: FY, r: 38, texto: '9', pop: true,
  s: [[0, 1], [w(5, 12), 1], [w(5, 12) + 0.3, 1.2, 'back'], [w(5, 14) + 0.2, 1]] });
E.obj('res1', 'contador', { t0: w(4, 10) - 0.05, t1: fin(1), x: RX, y: FY, v: [[w(4, 10), 0], [wf(4, 11) + 0.1, 12, 'out'], [w(5, 10), 12], [wf(5, 11) + 0.15, 8, 'inout']],
  size: 66, col: AM, miles: false, pop: true, barrido: [wf(4, 11), wf(5, 11)], caja: [-55, -38, 110, 76] });
E.obj('anios1', 'contador', { t0: w(4, 12) - 0.1, t1: fin(1), x: 345, y: -290, v: [[w(4, 12), 0], [wf(4, -1), 12, 'inout'], [w(5, 0), 12], [w(5, 2), 0, 'inout'], [w(5, 11), 0], [w(5, 18), 8, 'inout']],
  pre: 'año ', size: 48, col: 'txt', miles: false, pop: true, caja: [-110, -30, 220, 60] });
E.obj('x2a', 'rotulo', { t0: wf(4, -1) - 0.1, t1: w(5, 1), sale: 0.2, x: 335, y: -110, texto: '×2', size: 58, peso: 700, col: AM, track: 0, pop: true, caja: [-50, -32, 100, 64] });
E.obj('x2b', 'rotulo', { t0: w(5, 18), t1: fin(1), x: 335, y: -110, texto: '×2', size: 58, peso: 700, col: AM, track: 0, pop: true, caja: [-50, -32, 100, 64] });
E.obj('antes', 'rotulo', { t0: w(5, 19) - 0.05, t1: fin(1), x: 150, y: -385, texto: '4 AÑOS ANTES', size: 30, col: AM, pop: true, caja: [-130, -18, 260, 36] });
E.obj('ch1a', 'chispas', { t0: wf(4, -1), t1: wf(4, -1) + 0.8, x: 150, y: -120, r0: 100, r1: 210, inspeccion: false });
E.obj('ch1b', 'chispas', { t0: w(5, 19), t1: w(5, 19) + 0.8, x: 150, y: -385, r0: 80, r1: 200, inspeccion: false });
E.golpe(wf(4, -1), 0.04); E.golpe(w(5, 19), 0.05); E.destello(w(5, 19), 0.12);

// ---------- 2 · la inflación: 72 ÷ 3 = 24, tu dinero baja a la mitad mientras los precios suben ----------
// 6: La(0) segunda(1) saber(2) cuándo(3) la(4) inflación(5) se(6) come(7) la(8) mitad(9) de(10) tu(11) dinero(12)
// 7: Si(0) los(1) precios(2) suben(3) un(4) tres(5) por(6) ciento(7) al(8) año(9) setenta(10) y(11) dos(12) entre(13) tres(14) son(15) veinticuatro(16) en(17) veinticuatro(18) años(19) tu(20) dinero(21) valdrá(22) la(23) mitad(24)
E.numero(2, N[1].T, N[1].S, { desde: 'pila1', hacia: 'dinero' });
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -380, cara: true,
  poses: [[0, 'de_pie'], [w(6, 2), 'senalar'], [w(6, 7), 'encoger'], [w(7, 0), 'de_pie'], [w(7, 3), 'senalar'], [w(7, 10), 'de_pie'], [w(7, 17), 'triste'], [w(7, 24), 'manos_cabeza']],
  sonrisa: [[w(6, 2), 0.3], [w(6, 7), -0.5], [w(7, 0), 0], [w(7, 17), -0.8], [w(7, 24), -1.4]] });
E.obj('dinero', 'etiqueta', { t0: N[1].S - 0.1, t1: fin(2), x: 150, y: -380, w: 300, h: 100, sobrevive: true, r: 60,
  v: [[N[1].S, 0], [N[1].S + 0.6, 1000, 'out'], [w(7, 17), 1000], [wf(7, -1), 500, 'inout']], on: [[w(7, 17), 1], [wf(7, -1), 0.4]],
  s: [[0, 1], [w(6, 7), 1], [w(6, 7) + 0.25, 0.9, 'out'], [w(6, 9) + 0.3, 1]], caja: [-150, -50, 300, 100] });
E.obj('rotDin', 'rotulo', { t0: N[1].S, t1: fin(2), x: 150, y: -455, texto: 'TU DINERO', size: 24, col: GRIS, pop: true, caja: [-85, -15, 170, 30] });
E.obj('precios', 'relleno', { t0: w(6, 4) - 0.1, t1: fin(2), x: 150, y: -110, w: 420, h: 46, pop: true,
  rotulo: [[0, 'PRECIOS'], [w(7, 5), 'PRECIOS +3 % AL AÑO']], f: [[w(6, 4), 0], [w(6, 7), 0.15, 'out'], [w(7, 3), 0.15], [w(7, 9), 0.3, 'inout'], [w(7, 17), 0.3], [wf(7, -1), 1, 'inout']],
  barrido: [wf(7, -1)], caja: [-210, -75, 420, 100] });
E.sfx(w(7, 3), 'fill'); E.sfx(w(7, 17), 'fill');
E.obj('p3', 'pieza', { t0: w(7, 5) - 0.05, t1: fin(2), x: PX, y: FY, r: 38, texto: '3', pop: true });
division('d2', 0, w(7, 10), w(7, 13), w(7, 15), fin(2));
E.obj('res2', 'contador', { t0: w(7, 15) - 0.05, t1: fin(2), x: RX, y: FY, v: [[w(7, 15), 0], [wf(7, 16) + 0.1, 24, 'out']],
  size: 66, col: AM, miles: false, pop: true, barrido: [wf(7, 16)], caja: [-55, -38, 110, 76] });
E.obj('anios2', 'contador', { t0: w(7, 17) - 0.1, t1: fin(2), x: 150, y: -270, v: [[w(7, 17), 0], [wf(7, -1), 24, 'inout']],
  pre: 'año ', size: 48, col: 'txt', miles: false, pop: true, caja: [-110, -30, 220, 60] });
E.temblor(w(7, 24), 14, 0.45); E.golpe(w(7, 24), 0.05);
E.obj('mitad2', 'rotulo', { t0: w(7, 24) - 0.05, t1: fin(2), x: 410, y: -380, texto: '−50 %', size: 34, peso: 700, col: ROJO, track: 0, pop: true, caja: [-62, -22, 124, 44] });

// ---------- 3 · la deuda: 72 ÷ 18 = 4, la tarjeta pasa de 1.000 a 2.000 € ----------
// 8: La(0) tercera(1) ver(2) lo(3) rápido(4) que(5) crece(6) una(7) deuda(8)
// 9: Con(0) una(1) tarjeta(2) al(3) dieciocho(4) por(5) ciento(6) setenta(7) y(8) dos(9) entre(10) dieciocho(11) son(12) cuatro(13) en(14) cuatro(15) años(16) debes(17) el(18) doble(19)   [bocadillo «Ya lo iré pagando poco a poco»]
// 10: La(0) regla(1) no(2) es(3) exacta(4) pero(5) se(6) queda(7) muy(8) cerca(9)
E.numero(3, N[2].T, N[2].S, { desde: 'dinero', hacia: 'tarjeta' });
E.figura('yo3', { t0: N[2].S - 0.1, t1: TC, x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(8, 2), 'senalar'], [w(9, 0), 'ofrecer'], [w(9, 7), 'de_pie'], [w(9, 14), 'encoger'], [wf(9, -1) - 0.3, 'manos_cabeza'],
    [w(10, 0), 'de_pie'], [w(10, 5), 'senalar']],
  sonrisa: [[w(8, 2), 0.2], [w(9, 0), 0.9], [w(9, 14), -0.6], [wf(9, -1), -1.4], [w(10, 0), 0], [w(10, 7), 0.8]] });
E.obj('tarjeta', 'etiqueta', { t0: N[2].S - 0.1, t1: TX + 0.25, sale: 0.25, x: 150, y: -380, w: 320, h: 100, r: 60, on: 0,
  v: [[N[2].S, 0], [N[2].S + 0.6, 1000, 'out'], [w(9, 14), 1000], [wf(9, -1), 2000, 'inout']], caja: [-160, -50, 320, 100] });
E.obj('rotTar', 'rotulo', { t0: N[2].S, t1: TX + 0.25, sale: 0.25, x: 150, y: -455, texto: 'TARJETA AL 18 %', size: 24, col: GRIS, pop: true, caja: [-120, -15, 240, 30] });
E.obj('debes', 'relleno', { t0: w(8, 4) - 0.1, t1: TX + 0.25, sale: 0.25, x: 150, y: -110, w: 420, h: 46, pop: true, rotulo: 'LO QUE DEBES',
  f: [[w(8, 4), 0], [w(8, 8), 0.5, 'out'], [w(9, 14), 0.5], [wf(9, -1), 1, 'inout']], barrido: [wf(9, -1)], caja: [-210, -75, 420, 100] });
E.sfx(w(8, 4), 'fill'); E.sfx(w(9, 14), 'fill');
E.obj('pagar', 'bocadillo', { t0: w(9, 0) - 0.1, t1: w(9, 7), sale: 0.2, x: -90, y: -533, w: 380, h: 56, texto: 'Ya lo iré pagando poco a poco', size: 23, pop: true, caja: [-190, -28, 380, 82] });
E.obj('p18', 'pieza', { t0: w(9, 4) - 0.05, t1: TX + 0.25, sale: 0.25, x: PX + 100, y: FY, r: 38, texto: '18', pop: true });
division('d3', 100, w(9, 7), w(9, 10), w(9, 12), TX + 0.25, 0.25);
E.obj('res3', 'contador', { t0: w(9, 12) - 0.05, t1: TX + 0.25, sale: 0.25, x: RX + 100, y: FY, v: [[w(9, 12), 0], [wf(9, 13) + 0.1, 4, 'out']],
  size: 66, col: AM, miles: false, pop: true, barrido: [wf(9, 13)], caja: [-55, -38, 110, 76] });
E.obj('anios3', 'contador', { t0: w(9, 14) - 0.1, t1: TX + 0.25, sale: 0.25, x: 150, y: -270, v: [[w(9, 14), 0], [wf(9, -1), 4, 'inout']],
  pre: 'año ', size: 48, col: 'txt', miles: false, pop: true, caja: [-110, -30, 220, 60] });
E.obj('x2d', 'rotulo', { t0: wf(9, -1) - 0.1, t1: TX + 0.25, sale: 0.25, x: 410, y: -380, texto: '×2', size: 58, peso: 700, col: ROJO, track: 0, pop: true, caja: [-50, -32, 100, 64] });
E.temblor(wf(9, -1), 14, 0.45); E.golpe(wf(9, -1), 0.05);
// «no es exacta, pero se queda muy cerca»: dos barras casi iguales (al 6 %: regla 12 años, cuenta exacta 11,9)
E.obj('al6', 'rotulo', { t0: TX + 0.3, t1: TC, x: 120, y: -530, texto: 'AL 6 % DE INTERÉS', size: 26, col: GRIS, pop: true, caja: [-150, -16, 300, 32] });
E.obj('regla', 'relleno', { t0: TX + 0.35, t1: TC, x: 120, y: -400, w: 460, h: 46, pop: true, rotulo: 'REGLA DEL 72: 12 AÑOS',
  f: [[TX + 0.45, 0], [w(10, 4), 1, 'inout']], caja: [-230, -75, 460, 100] });
E.obj('exacta', 'relleno', { t0: w(10, 1), t1: TC, x: 120, y: -240, w: 460, h: 46, pop: true, rotulo: 'CUENTA EXACTA: 11,9 AÑOS',
  f: [[w(10, 2), 0], [w(10, 8), 0.99, 'inout']], barrido: [w(10, 8)], caja: [-230, -75, 460, 100] });
E.sfx(w(10, 0), 'fill'); E.sfx(w(10, 2), 'fill');
E.obj('chX', 'chispas', { t0: w(10, 8), t1: w(10, 8) + 0.8, x: 120, y: -320, r0: 120, r1: 240, inspeccion: false });

// ---------- cierre: resumen y envío ----------
// 11: Con(0) una(1) sola(2) división(3) sabes(4) si(5) el(6) tiempo(7) juega(8) a(9) tu(10) favor(11) o(12) en(13) tu(14) contra(15)
// 12: Mándaselo(0) a(1) ese(2) amigo(3) que(4) tiene(5) el(6) dinero(7) parado(8) en(9) el(10) banco(11)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(12, 0), capa: 'pantalla', x: 540, y: 960, r: 500, z: -2, p: [[TC, 0], [w(11, 3), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(12, 0), capa: 'pantalla', x: 540, y: 960, items: ['Invertir', 'Inflación', 'Deuda'], gap: 240,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(11, 8)], caja: [-370, -60, 740, 160] });
E.obj('formula', 'rotulo', { t0: w(11, 3) - 0.1, t1: w(12, 0), capa: 'pantalla', x: 540, y: 1220, texto: '72 ÷ INTERÉS = AÑOS', size: 44, peso: 700, col: AM, pop: true, caja: [-280, -28, 560, 56] });
E.obj('confC', 'confeti', { t0: wf(11, -1) - 0.3, t1: wf(11, -1) + 1.6, capa: 'pantalla', x: 540, y: 880, dur: 1.8, n: 46, inspeccion: false, sinDim: true });
E.destello(wf(11, -1) - 0.3, 0.2);
E.figura('yoF', { t0: w(12, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(12, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(12, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(12, 8)], vuelo: [[wf(12, -1), 0], [wf(12, -1) + 0.5, 1, 'in']] });
