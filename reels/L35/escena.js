// L35 · La paradoja de la elección (estilo B; reglas 15, 20, 21, 24)
// Idea visual: «tu web» son 20 piezas que se montan y nadie elige; el estudio de las mermeladas (6 tarros frente a 24, ×10);
// 1: las 20 piezas se van y quedan 3 (contador 20 → 3) que se convierten en tres planes; 2: la del medio se marca con el
// sello RECOMENDADA, que se rellena; 3: las 20 piezas otra vez, se encienden las vendidas este año y el resto sale volando.
// Regla 20: «Me lo pienso.» va en bocadillo del cliente (gris) en el punto 1; la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(2, 0), gap: 70, y: 360 } });

// «La primera: // …» → T en «La», S en la primera palabra del punto
const N = [3, 5, 7].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(9, 0) - 0.1;   // remate y resumen
const GRIS = '#9a9c9b';

E.camara([
  [0, [0, -380, 1.04]], [w(0, 6), [20, -385, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 9), [10, -370, 1.0]], [w(1, 15), [20, -380, 1.04]],
  [w(2, 0), [0, -385, 1.03]], [N[0].T, [10, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [-10, -385, 1.03]], [w(4, 7), [5, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 0), [-15, -385, 1.04]], [w(6, 6), [15, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(8, 0), [10, -385, 1.04]], [w(8, 9), [-10, -390, 1.06]], [TC, [0, -390, 1.05]],
]);

// rejilla de 20 piezas (5 × 4): «tu web» con veinte servicios
const PX = (cx, i) => cx + ((i % 5) - 2) * 72;
const PY = (top, i) => top + Math.floor(i / 5) * 68;

// ---------- gancho ----------
// 0: Tienes(0) veinte(1) servicios(2) en(3) tu(4) web(5) y(6) nadie(7) se(8) decide(9) por(10) ninguno(11)
// 1: Se(0) llama(1) paradoja(2) de(3) la(4) elección(5) en(6) un(7) estudio(8) con(9) 6(10) mermeladas(11) en(12) la(13) mesa(14)
//    compró(15) diez(16) veces(17) más(18) gente(19) que(20) con(21) 24(22)
// 2: Tres(0) reglas(1) para(2) vender(3) más(4) con(5) menos(6)
E.figura('yo', { t0: 0, t1: fin(0), x: -355, cara: true,
  poses: [[0, 'ofrecer'], [w(0, 6), 'de_pie'], [w(0, 7), 'pensar'], [w(0, 9), 'manos_cabeza'], [w(1, 0), 'de_pie'], [w(1, 2), 'senalar'],
    [w(1, 9), 'ofrecer'], [w(1, 15), 'senalar'], [w(1, 16), 'celebrar'], [w(2, 0), 'de_pie'], [w(2, 1), 'senalar'], [w(2, 5), 'celebrar']],
  sonrisa: [[0, 0.8], [w(0, 7), -0.4], [w(0, 9), -1.3], [w(1, 0), 0], [w(1, 2), 0.4], [w(1, 16), 1.3], [w(2, 0), 0.6], [w(2, 5), 1.5]] });
// las 20 piezas se montan una a una mientras el contador sube a 20; «nadie se decide»: se apagan y una luz salta de una a otra
const SALTA = [7, 13, 2, 16, 9, 11, 4, 18];
for (let i = 0; i < 20; i++) { const a = 0.15 + i * 0.1, k = SALTA.indexOf(i);
  const on = [[0, 1], [w(0, 6) + i * 0.02, 1], [w(0, 7) + i * 0.02, 0.12]];
  if (k >= 0) { const b = w(0, 7) + 0.1 + k * 0.17; on.push([b, 0.12], [b + 0.08, 1], [b + 0.2, 0.12]); }
  const sal = w(1, 7) + (i % 7) * 0.06;
  E.obj('w0_' + i, 'pieza', { t0: a, t1: sal + 0.3, sale: 0.3, x: PX(150, i), y: PY(-450, i), r: 27, pop: true, sfx: i % 5 === 0, on,
    s: [[0, 1], [sal, 1], [sal + 0.3, 0.3, 'in']], caja: [-27, -27, 54, 54] }); }
E.obj('n0', 'contador', { t0: 0.1, t1: w(1, 2) - 0.1, sale: 0.25, x: 150, y: -172, size: 50, col: 'txt', suf: ' SERVICIOS', miles: false, pop: true,
  v: [[0.15, 0], [0.15 + 19 * 0.1 + 0.2, 20, 'out']], barrido: [w(0, 1)], caja: [-190, -30, 380, 60] });
E.temblor(w(0, 9) + 0.1, 10, 0.35); E.golpe(w(0, 1), 0.03);
// «paradoja de la elección»: el nombre del efecto
E.obj('rotPar', 'rotulo', { t0: w(1, 2) - 0.05, t1: w(1, 15), sale: 0.25, x: 110, y: -540, texto: 'PARADOJA DE LA ELECCIÓN', size: 30, col: '#e6ce46', pop: true, caja: [-230, -18, 460, 36] });
E.obj('rayP', 'rayos', { t0: w(1, 2), t1: w(1, 9), x: 150, y: -330, r: 300, z: -2, p: [[w(1, 2), 0], [w(1, 5), 1, 'out'], [w(1, 8), 1], [w(1, 9), 0]], inspeccion: false });
// el estudio: 6 tarros de mermelada frente a 24; los tarros se llenan al aparecer
const MX6 = -50, MX24 = 275;
for (let i = 0; i < 6; i++) { const a = w(1, 9) + i * 0.09;
  E.obj('m6_' + i, 'tarro', { t0: a, t1: w(2, 0) + 0.15, sale: 0.25, x: MX6 + ((i % 3) - 1) * 62, y: -250 + (i < 3 ? -82 : 0), w: 52, h: 66, pop: true, sfx: i === 0,
    nivel: [[a + 0.1, 0], [a + 0.5, 0.85, 'out']], caja: [-26, -66, 52, 66] }); }
for (let i = 0; i < 24; i++) { const a = w(1, 12) + i * 0.035;
  E.obj('m24_' + i, 'tarro', { t0: a, t1: w(2, 0) + 0.15, sale: 0.25, x: MX24 + ((i % 6) - 2.5) * 40, y: -250 - (3 - Math.floor(i / 6)) * 52, w: 34, h: 44, pop: true, sfx: i % 8 === 0,
    nivel: [[a + 0.1, 0], [a + 0.4, 0.85, 'out']], caja: [-17, -44, 34, 44] }); }
E.obj('c6', 'contador', { t0: w(1, 10) - 0.1, t1: w(2, 0) + 0.15, sale: 0.25, x: MX6, y: -440, size: 52, col: 'txt', miles: false, pop: true,
  v: [[w(1, 10), 0], [w(1, 10) + 0.4, 6, 'out']], caja: [-50, -30, 100, 60] });
E.obj('c24', 'contador', { t0: w(1, 21) - 0.1, t1: w(2, 0) + 0.15, sale: 0.25, x: MX24, y: -490, size: 52, col: 'txt', miles: false, pop: true,
  v: [[w(1, 21), 0], [w(1, 22) + 0.2, 24, 'out']], caja: [-60, -30, 120, 60] });
// «compró diez veces más gente»: la barra de compradores de la mesa de 6 se llena; la de 24, una décima parte
E.obj('b6', 'relleno', { t0: w(1, 15) - 0.15, t1: w(2, 0) + 0.15, sale: 0.25, x: MX6, y: -165, w: 190, h: 34, pop: true,
  f: [[w(1, 15), 0], [w(1, 17) + 0.2, 1, 'out']], caja: [-95, -17, 190, 34] });
E.obj('b24', 'relleno', { t0: w(1, 15) - 0.1, t1: w(2, 0) + 0.15, sale: 0.25, x: MX24, y: -165, w: 230, h: 34, pop: true,
  f: [[w(1, 15), 0], [w(1, 17) + 0.2, 0.1, 'out']], caja: [-115, -17, 230, 34] });
E.sfx(w(1, 15), 'fill');
E.obj('x10', 'contador', { t0: w(1, 16) - 0.1, t1: w(2, 0) + 0.15, sale: 0.25, x: MX6, y: -95, size: 56, col: '#e6ce46', pre: '×', miles: false, pop: true,
  v: [[w(1, 16), 1], [w(1, 18) + 0.1, 10, 'out']], barrido: [w(1, 18) + 0.15], caja: [-70, -32, 140, 64] });
E.obj('chX', 'chispas', { t0: w(1, 18) + 0.1, t1: w(1, 18) + 0.9, x: MX6, y: -95, r0: 60, r1: 140, inspeccion: false });
E.golpe(w(1, 18) + 0.1, 0.04);
// «tres reglas … con menos»: tres monedas; la primera crece y sobrevive
E.obj('rayH', 'rayos', { t0: w(2, 0), t1: fin(0), x: 150, y: -330, r: 300, z: -2, p: [[w(2, 0), 0], [w(2, 6), 1, 'out']], inspeccion: false });
[0, 1, 2].forEach(i => { const a = w(2, 0) + 0.1 + i * 0.13;
  E.obj('c' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: 150 + (i - 1) * 110, y: -330, r: 40, n: i + 1, pop: true, sfx: i === 0, inspeccion: false,
    s: i === 0 ? [[0, 1], [w(2, 6), 1], [w(2, 6) + 0.35, 1.4, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [w(2, 6), 1], [w(2, 6) + 0.3, 0.35]], barrido: i === 0 ? [w(2, 6) + 0.3] : null }); });
E.obj('chH', 'chispas', { t0: w(2, 6) + 0.2, t1: w(2, 6) + 1.0, x: 40, y: -330, r0: 50, r1: 130, inspeccion: false });
E.destello(w(2, 6), 0.15);

// ---------- 1 · ofrece tres opciones como mucho ----------
// 3: La(0) primera(1) ofrece(2) tres(3) opciones(4) como(5) mucho(6)
// 4: Básica(0) intermedia(1) y(2) completa(3) Si(4) pones(5) más(6) el(7) cliente(8) compara(9) y(10) no(11) se(12) decide(13)   [bocadillo «Me lo pienso.»]
E.numero(1, N[0].T, N[0].S, { desde: 'c1', hacia: 'p1_12' });
const PLX = 60, PLY = -250, PLS = 0.66;
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -375, cara: true,
  poses: [[0, 'de_pie'], [w(3, 2), 'ofrecer'], [w(3, 3), 'apartarse'], [w(3, 6), 'ofrecer'], [w(4, 0), 'senalar'], [w(4, 4), 'de_pie'], [w(4, 6), 'ofrecer'], [w(4, 9), 'encoger'], [w(4, 13), 'manos_cabeza']],
  sonrisa: [[0, 0.3], [w(3, 3), 0.8], [w(4, 0), 1.2], [w(4, 6), 0.4], [w(4, 9), -0.5], [w(4, 13), -1.2]] });
// las 20 piezas se montan; «tres opciones»: 17 salen volando y quedan 3 (contador 20 → 3)
const QUEDAN = [11, 12, 13];
for (let i = 0; i < 20; i++) { const a = N[0].S - 0.1 + i * 0.025, queda = QUEDAN.indexOf(i);
  if (queda >= 0) {
    E.obj('p1_' + i, 'pieza', { t0: a, t1: w(4, 0) - 0.02, sale: 0.2, r: 27, pop: true, sfx: false,
      x: PX(150, i), y: [[0, PY(-450, i)], [w(3, 4), PY(-450, i)], [w(3, 5) + 0.1, -300, 'inout']],
      on: [[0, 0.35], [w(3, 3), 0.35], [w(3, 4), 1]], s: [[0, 1], [w(3, 4), 1], [w(3, 5) + 0.1, 1.25, 'back']], caja: [-27, -27, 54, 54] });
  } else { const v = w(3, 3) + (i % 10) * 0.05;
    E.obj('p1_' + i, 'pieza', { t0: a, t1: v + 0.7, sale: 0.15, r: 27, pop: true, sfx: false, on: 0.35, libre: true, estela: i % 4 === 0 ? 5 : 0, inspeccion: false,
      x: [[v, PX(150, i)], [v + 0.65, 700 + (i % 3) * 60, 'in']], y: [[v, PY(-450, i)], [v + 0.3, PY(-450, i) - 60], [v + 0.65, PY(-450, i) + 40, 'in']] }); } }
E.obj('n1', 'contador', { t0: N[0].S, t1: w(4, 0), sale: 0.25, x: 150, y: -530, size: 50, col: 'txt', suf: ' OPCIONES', miles: false, pop: true,
  v: [[w(3, 3), 20], [w(3, 5) + 0.2, 3, 'inout']], barrido: [w(3, 5) + 0.25], caja: [-190, -30, 380, 60] });
E.sfx(w(3, 3), 'whoosh'); E.golpe(w(3, 5) + 0.2, 0.04);
E.obj('ch1a', 'chispas', { t0: w(3, 5) + 0.2, t1: w(3, 5) + 1.0, x: 150, y: -300, r0: 90, r1: 200, inspeccion: false });
// «básica, intermedia y completa»: las tres piezas se convierten en tres planes que se encienden en orden
E.obj('planes1', 'planes', { t0: w(4, 0) - 0.05, t1: fin(1), x: PLX, y: PLY, s: PLS, pop: true, sobrevive: true, r: 60, oy: -60,
  items: ['BÁSICA', 'INTERMEDIA', 'COMPLETA'],
  sel: [[w(4, 0), 0], [w(4, 1), 1, 'out'], [w(4, 3), 2, 'out'], [w(4, 5), 2], [w(4, 9), 0, 'inout'], [w(4, 9) + 0.25, 2, 'inout'], [w(4, 9) + 0.5, 0, 'inout'], [w(4, 9) + 0.75, 1.5, 'inout'], [w(4, 11), -1, 'inout'],
    [wf(4, -1) + 0.15, -1], [wf(4, -1) + 0.4, 1, 'out']],
  caja: [-290, -220, 630, 280] });
// «si pones más»: más cajas grises por encima
for (let i = 0; i < 5; i++) { const a = w(4, 6) + i * 0.08;
  E.obj('extra' + i, 'pieza', { t0: a, t1: w(4, 11), sale: 0.2, x: -130 + i * 70, y: -470, r: 22, on: 0, pop: true, sfx: i === 0, caja: [-22, -22, 44, 44] }); }
// el cliente compara y no se decide
E.figura('cli1', { t0: w(4, 7) - 0.15, t1: fin(1), x: 395, dir: -1, talla: 400, color: 'gris', cara: true,
  poses: [[0, 'pensar'], [w(4, 11), 'encoger']], sonrisa: [[0, 0], [w(4, 11), -0.8]] });
E.obj('dice1', 'bocadillo', { t0: w(4, 11) - 0.1, t1: fin(1) - 0.1, sale: 0.2, x: 320, y: -500, w: 270, h: 76, texto: 'Me lo pienso.', size: 30, on: 1, pop: true, caja: [-135, -38, 270, 102] });
E.temblor(w(4, 13), 10, 0.35);

// ---------- 2 · recomienda una ----------
// 5: La(0) segunda(1) recomienda(2) una(3)
// 6: Márcala(0) como(1) la(2) recomendada(3) Así(4) le(5) ahorras(6) al(7) cliente(8) tener(9) que(10) decidir(11)
E.numero(2, N[1].T, N[1].S, { desde: 'planes1', hacia: 'planes2' });
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -375, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'senalar'], [w(6, 0), 'escribir'], [w(6, 3), 'senalar'], [w(6, 4), 'ofrecer'], [w(6, 9), 'celebrar']],
  sonrisa: [[0, 0.4], [w(5, 2), 0.8], [w(6, 3), 1.2], [w(6, 6), 0.8], [w(6, 10), 1.5]] });
E.obj('planes2', 'planes', { t0: N[1].S - 0.1, t1: fin(2), x: PLX, y: PLY, s: PLS, pop: true, r: 60, oy: -60,
  items: ['BÁSICA', 'INTERMEDIA', 'COMPLETA'], sel: [[w(5, 2), -1], [w(5, 3), 1, 'out']], caja: [-290, -220, 630, 280] });
E.obj('ch2a', 'chispas', { t0: w(5, 3), t1: w(5, 3) + 0.8, x: PLX, y: PLY - 60, r0: 70, r1: 160, inspeccion: false });
// «márcala como la recomendada»: el sello se rellena encima de la caja del medio y sobrevive
E.obj('reco', 'barra', { t0: w(6, 0) - 0.15, t1: fin(2), x: PLX, y: -425, w: 250, h: 44, pop: true, sobrevive: true, r: 40,
  f: [[w(6, 0), 0], [w(6, 3) + 0.1, 1, 'out']], barrido: [w(6, 3) + 0.15], caja: [-125, -22, 250, 44] });
E.obj('recoT', 'rotulo', { t0: w(6, 3), t1: N[1].T + 0.2, sale: 0.2, x: PLX, y: -424, texto: 'RECOMENDADA', size: 22, col: '#3b3214', peso: 700, track: 3, inspeccion: false });
E.sfx(w(6, 0), 'fill'); E.golpe(w(6, 3) + 0.1, 0.035);
// «así le ahorras al cliente tener que decidir»: la maraña del cliente se deshace y paga la recomendada
E.figura('cli2', { t0: w(6, 4) - 0.2, t1: fin(2), x: 395, dir: -1, talla: 400, color: 'gris', cara: true,
  poses: [[0, 'pensar'], [w(6, 9), 'de_pie'], [w(6, 11), 'celebrar']], sonrisa: [[0, -0.6], [w(6, 9), 0.4], [w(6, 11), 1.4]] });
E.obj('lio2', 'maraña', { t0: w(6, 6) - 0.2, t1: w(6, 11), sale: 0.2, x: 400, y: -490, r: 50, pop: true, sfx: false,
  p: [[w(6, 6) - 0.2, 0], [w(6, 7), 1, 'out'], [w(6, 9), 1], [w(6, 11), 0, 'inout']], caja: [-62, -35, 124, 70] });
E.obj('pago2', 'moneda', { t0: w(6, 10), t1: w(6, 10) + 0.7, entra: 0.06, sale: 0.12, r: 24, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
  x: [[w(6, 10), 360], [w(6, 10) + 0.6, PLX, 'inout']], y: [[w(6, 10), -300], [w(6, 10) + 0.3, -380], [w(6, 10) + 0.6, -320, 'in']] });
E.sfx(w(6, 10), 'coin');
E.obj('ch2', 'chispas', { t0: w(6, 10) + 0.6, t1: w(6, 10) + 1.4, x: PLX, y: -320, r0: 70, r1: 170, inspeccion: false });
E.golpe(w(6, 10) + 0.6, 0.04); E.destello(w(6, 10) + 0.6, 0.12);

// ---------- 3 · quita lo que nadie compra ----------
// 7: La(0) tercera(1) quita(2) lo(3) que(4) nadie(5) compra(6)
// 8: Mira(0) lo(1) que(2) has(3) vendido(4) este(5) año(6) Lo(7) que(8) no(9) hayas(10) vendido(11) ni(12) una(13) vez(14) quítalo(15)
E.numero(3, N[2].T, N[2].S, { desde: 'reco', hacia: 'p3_7' });
E.figura('yo3', { t0: N[2].S - 0.1, t1: TC, x: -365, cara: true,
  poses: [[0, 'de_pie'], [w(7, 2), 'senalar'], [w(7, 5), 'encoger'], [w(8, 0), 'pensar'], [w(8, 4), 'senalar'], [w(8, 9), 'de_pie'], [w(8, 15) - 0.1, 'apartarse'], [wf(8, -1) + 0.2, 'celebrar']],
  sonrisa: [[0, 0.3], [w(7, 5), -0.4], [w(8, 0), 0.2], [w(8, 4), 0.8], [w(8, 9), 0], [w(8, 15), 0.8], [wf(8, -1) + 0.2, 1.5]] });
const VEND = [5, 1, 12, 18, 9];   // una por columna: al juntarse en fila no se cruzan
const FILA = (k) => 150 + (k - 2) * 72;
for (let i = 0; i < 20; i++) { const a = N[2].S - 0.1 + i * 0.03, vk = VEND.indexOf(i);
  if (vk >= 0) { const b = w(8, 0) + 0.2 + vk * 0.25, m = w(8, 15) + 0.35;
    E.obj('p3_' + i, 'pieza', { t0: a, t1: TC + 0.1, sale: 0.25, r: 27, pop: true, sfx: false,
      x: [[0, PX(150, i)], [m, PX(150, i)], [m + 0.5, FILA(vk), 'inout']], y: [[0, PY(-460, i)], [m, PY(-460, i)], [m + 0.5, -330, 'inout']],
      on: [[0, 0.12], [b, 0.12], [b + 0.15, 1, 'out']], s: [[0, 1], [b, 1], [b + 0.12, 1.25], [b + 0.3, 1, 'out']], caja: [-27, -27, 54, 54] });
    E.obj('pv' + vk, 'pulso', { t0: b, t1: b + 0.6, x: PX(150, i), y: PY(-460, i), r0: 28, r1: 70, inspeccion: false });
  } else { const v = w(8, 15) + (i % 8) * 0.04;
    // «lo que no hayas vendido ni una vez»: las grises tiemblan y, con «quítalo», salen volando
    const sx = PX(150, i);
    E.obj('p3_' + i, 'pieza', { t0: a, t1: v + 0.7, sale: 0.15, r: 27, pop: true, sfx: false, on: 0.12, libre: true, estela: i % 4 === 0 ? 5 : 0, inspeccion: false,
      x: [[0, sx], [w(8, 9), sx], [w(8, 9) + 0.08, sx - 5], [w(8, 9) + 0.16, sx + 5], [w(8, 9) + 0.24, sx - 4], [w(8, 9) + 0.32, sx], [v, sx], [v + 0.65, 720 + (i % 3) * 60, 'in']],
      y: [[v, PY(-460, i)], [v + 0.3, PY(-460, i) - 70], [v + 0.65, PY(-460, i) + 30, 'in']], caja: [-27, -27, 54, 54] }); } }
E.sfx(w(8, 15), 'whoosh'); E.temblor(w(8, 9) + 0.1, 6, 0.3);
// «este año»: la barra del año se llena mientras se encienden las piezas vendidas
E.obj('anio', 'relleno', { t0: w(8, 0) - 0.15, t1: w(8, 15), sale: 0.25, x: 150, y: -140, w: 360, h: 34, pop: true, rotulo: 'ESTE AÑO',
  f: [[w(8, 0), 0], [w(8, 6) + 0.3, 1, 'lin']], caja: [-180, -56, 360, 73] });
E.sfx(w(8, 0), 'fill');
E.obj('rot3', 'rotulo', { t0: wf(8, -1), t1: TC + 0.1, sale: 0.25, x: 150, y: -240, texto: 'LO QUE SE VENDE', size: 26, col: '#e6ce46', pop: true, caja: [-130, -16, 260, 32] });
E.obj('ch3', 'chispas', { t0: w(8, 15) + 0.85, t1: w(8, 15) + 1.65, x: 150, y: -330, r0: 120, r1: 240, inspeccion: false });
E.golpe(w(8, 15) + 0.85, 0.04); E.destello(w(8, 15) + 0.85, 0.12);

// ---------- cierre: resumen y envío ----------
// 9: Más(0) opciones(1) no(2) traen(3) más(4) ventas(5) muchas(6) veces(7) no(8) traen(9) ninguna(10)
// 10: Mándaselo(0) a(1) ese(2) amigo(3) que(4) ofrece(5) veinte(6) servicios(7) en(8) su(9) web(10)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(9, 5), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, items: ['Tres opciones', 'Recomienda una', 'Quita lo que sobra'], gap: 300,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(9, 6)], caja: [-450, -60, 900, 200] });
E.obj('confC', 'confeti', { t0: wf(9, -1), t1: wf(9, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(9, -1), 0.22); E.golpe(wf(9, -1), 0.04);
E.figura('yoF', { t0: w(10, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(10, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(10, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(10, 6)], vuelo: [[wf(10, -1), 0], [wf(10, -1) + 0.5, 1, 'in']] });
