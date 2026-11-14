// L32 · El reparto cincuenta, treinta, veinte (estilo B; reglas 15, 19, 20, 21, 24)
// Idea visual: la nómina de 1.600 € se parte en tres tarros (800 / 480 / 320) que se rellenan con contadores que suman;
// el de ahorro se llena el primero, el día de cobro; si los fijos pasan de la mitad, baja el de caprichos y el ahorro no se toca.
// Regla 20: «Esto sale de la parte de caprichos» va en bocadillo del muñeco que paga la cena; la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(1, 6), gap: 70, y: 360 } });

// «La primera: // …» → T en «La», S en la primera palabra del punto
const N = [2, 4, 6].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TG = w(8, 0) - 0.1;   // giro: los fijos pasan de la mitad
const TC = w(9, 0) - 0.1;   // resumen
const ROJO = '#e4574f';

E.camara([
  [0, [0, -380, 1.04]], [w(0, 9), [0, -385, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 9), [20, -370, 1.0]], [N[0].T, [20, -390, 1.05]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(3, 0), [-15, -385, 1.04]], [w(3, 6), [10, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(5, 0), [-15, -385, 1.04]], [w(5, 5), [10, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(7, 0), [15, -385, 1.04]], [w(7, 9), [0, -390, 1.06]], [TG, [0, -390, 1.05]],
  [TG + 0.05, [0, -370, 0.98], 'lin'], [w(8, 8), [0, -380, 1.02]], [TC - 0.1, [0, -385, 1.04]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Si(0) no(1) sabes(2) en(3) qué(4) se(5) te(6) va(7) la(8) nómina(9) el(10) problema(11) no(12) es(13) el(14) sueldo(15) es(16) cómo(17) lo(18) repartes(19)
// 1: Para(0) eso(1) sirve(2) la(3) regla(4) del(5) cincuenta(6) treinta(7) veinte(8) partir(9) el(10) sueldo(11) en(12) tres(13) para(14) que(15) te(16) cuadren(17) las(18) cuentas(19)
E.figura('yo', { t0: 0, t1: fin(0), x: -340, cara: true,
  poses: [[0, 'pensar'], [w(0, 7), 'encoger'], [w(0, 9) + 0.3, 'manos_cabeza'], [w(0, 12), 'de_pie'], [w(0, 16), 'senalar'], [w(1, 0), 'de_pie'],
    [w(1, 6), 'senalar'], [w(1, 9), 'ofrecer'], [w(1, 17), 'celebrar']],
  sonrisa: [[0, 0.2], [w(0, 7), -0.6], [w(0, 9) + 0.3, -1.2], [w(0, 12), 0], [w(0, 16), 0.4], [w(1, 6), 0.8], [w(1, 17), 1.5]] });
// la nómina: 1.600 € que se van volando hasta casi cero; «no es el sueldo»: vuelve a 1.600
E.obj('nomina0', 'etiqueta', { t0: 0, t1: w(1, 9) + 0.1, sale: 0.25, x: 140, y: -320, w: 340, h: 130, r: 70,
  v: [[0, 1600], [w(0, 7), 1600], [w(0, 9) + 0.6, 35, 'inout'], [w(0, 12), 35], [w(0, 15), 1600, 'inout']],
  on: [[0, 1], [w(0, 9), 1], [w(0, 9) + 0.5, 0.35], [w(0, 13), 0.35], [w(0, 15), 1]], barrido: [w(0, 15)], caja: [-170, -65, 340, 130] });
E.obj('rotNom0', 'rotulo', { t0: 0, t1: w(1, 9) + 0.1, sale: 0.25, x: 140, y: -215,
  texto: [[0, 'NÓMINA'], [w(0, 12), 'EL SUELDO, IGUAL'], [w(0, 17), '¿Y EL REPARTO?']], caja: [-150, -16, 300, 32] });
for (let i = 0; i < 7; i++) { const a = w(0, 7) + i * 0.16;
  E.obj('vuela' + i, 'moneda', { t0: a, t1: a + 0.8, entra: 0.05, sale: 0.2, r: 24, n: '', libre: true, estela: 5, sfx: i === 0, inspeccion: false,
    x: [[a, 160], [a + 0.8, 560 + i * 40, 'in']], y: [[a, -320], [a + 0.35, -500 - (i % 3) * 25, 'out'], [a + 0.8, -260, 'in']] }); }
E.temblor(w(0, 9) + 0.5, 12, 0.4);
E.golpe(w(0, 15), 0.04); E.temblor(w(0, 19), 10, 0.35);
// «cincuenta, treinta, veinte»: tres monedas de tamaño proporcional sobre tres tarros que se rellenan
const HX = [-60, 130, 320], HR = [46, 38, 32], HN = [50, 30, 20], HH = [220, 160, 120], HT = ['FIJOS', 'CAPRICHOS', 'AHORRO'];
HX.forEach((x, i) => { const a = w(1, 6 + i);
  E.obj('h' + HN[i], 'moneda', { t0: a, t1: i === 0 ? N[0].T + 0.1 : N[0].T + 0.3, entra: 0.15, sale: 0.2, x, y: -470, r: HR[i], n: HN[i], pop: true, sfx: true, inspeccion: false,
    sobrevive: i === 0, s: i === 0 ? [[0, 1], [w(1, 17), 1], [w(1, 17) + 0.35, 1.3, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [w(1, 18), 1], [w(1, 18) + 0.3, 0.4]] });
  E.obj('t0_' + i, 'tarro', { t0: w(1, 9) + i * 0.12, t1: N[0].T + 0.2, sale: 0.25, x, w: 130, h: HH[i], rotulo: HT[i], pop: true,
    nivel: [[w(1, 13), 0], [w(1, 17) + i * 0.15, 1, 'inout']], luz: i === 0 ? 1 : [[0, 1], [w(1, 18), 1], [w(1, 18) + 0.3, 0.4]], caja: [-65, -HH[i], 130, HH[i]], refl: true });
});
E.sfx(w(1, 13), 'fill');
E.obj('chH', 'chispas', { t0: w(1, 17), t1: w(1, 17) + 0.8, x: -60, y: -470, r0: 60, r1: 150, inspeccion: false });
E.destello(w(1, 17), 0.15);

// ---------- 1 · la mitad, para los gastos fijos: 800 de 1.600 ----------
// 2: La(0) primera(1) la(2) mitad(3) para(4) los(5) gastos(6) fijos(7)
// 3: Alquiler(0) comida(1) facturas(2) transporte(3) Si(4) cobras(5) 1.600(6) euros(7) son(8) 800(9)
E.numero(1, N[0].T, N[0].S, { desde: 'h50', hacia: 'fijos' });
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -370, cara: true,
  poses: [[0, 'de_pie'], [w(2, 3), 'senalar'], [w(3, 0), 'meter'], [w(3, 4), 'de_pie'], [w(3, 6), 'ofrecer'], [w(3, 9), 'celebrar']],
  sonrisa: [[w(2, 3), 0.5], [w(3, 0), 0.3], [w(3, 9), 1.5]] });
E.obj('barra1', 'relleno', { t0: N[0].S - 0.1, t1: fin(1), x: 60, y: -470, w: 380, h: 48, pop: true, pct: true,
  rotulo: [[0, 'NÓMINA'], [w(3, 6) - 0.1, 'NÓMINA DE 1.600 €']], f: [[w(2, 3) - 0.1, 0], [w(2, 3) + 0.5, 0.5, 'out']], caja: [-190, -60, 470, 90] });
E.sfx(w(2, 3), 'fill');
E.obj('fijos', 'tarro', { t0: N[0].S - 0.1, t1: fin(1), x: 190, w: 220, h: 290, rotulo: 'FIJOS', pop: true, sobrevive: true, r: 80, oy: -150,
  nivel: [[w(3, 0), 0], [w(3, 0) + 0.6, 0.3, 'out'], [w(3, 1) + 0.6, 0.55, 'out'], [w(3, 2) + 0.6, 0.75, 'out'], [w(3, 3) + 0.6, 0.85, 'out'], [w(3, 9), 0.85], [w(3, 9) + 0.4, 1, 'out']],
  barrido: [w(3, 9)], caja: [-110, -290, 220, 290], refl: true });
// cada gasto entra en el tarro y el contador suma: 450 + 200 + 80 + 70 = 800
E.obj('cuenta1', 'contador', { t0: w(3, 0) - 0.1, t1: fin(1), x: 190, y: -360, pop: true, suf: ' €', size: 60, col: 'txt',
  v: [[w(3, 0), 0], [w(3, 0) + 0.6, 450, 'out'], [w(3, 1) + 0.6, 650, 'out'], [w(3, 2) + 0.6, 730, 'out'], [w(3, 3) + 0.6, 800, 'out']], barrido: [w(3, 9)], caja: [-130, -34, 260, 68] });
const G1 = ['ALQUILER', 'COMIDA', 'FACTURAS', 'TRANSPORTE'];
G1.forEach((s, i) => { const a = w(3, i);
  E.obj('g1_' + i, 'rotulo', { t0: a - 0.05, t1: i < 3 ? w(3, i + 1) - 0.02 : w(3, 4) + 0.2, entra: 0.1, sale: 0.12, x: -60, y: -250, texto: s, size: 30, col: '#c9ccca', pop: true, caja: [-120, -18, 240, 36] });
  E.obj('m1_' + i, 'moneda', { t0: a + 0.05, t1: a + 0.7, entra: 0.06, sale: 0.12, r: 22, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a + 0.05, -60], [a + 0.6, 190, 'inout']], y: [[a + 0.05, -280], [a + 0.3, -340], [a + 0.6, -200, 'in']] });
  E.golpe(a + 0.6, 0.015); });
E.obj('ch1', 'chispas', { t0: w(3, 9), t1: w(3, 9) + 0.8, x: 190, y: -360, r0: 110, r1: 220, inspeccion: false });
E.golpe(w(3, 9), 0.04); E.destello(w(3, 9), 0.12);

// ---------- 2 · el treinta por ciento, para lo que te apetezca: 480 ----------
// 4: La(0) segunda(1) el(2) treinta(3) por(4) ciento(5) para(6) lo(7) que(8) te(9) apetezca(10)
// 5: Cenas(0) viajes(1) caprichos(2) 480(3) euros(4) que(5) gastas(6) sin(7) darle(8) vueltas(9)   [bocadillo «Esto sale de la parte de caprichos»]
E.numero(2, N[1].T, N[1].S, { desde: 'fijos', hacia: 'capr' });
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -380, cara: true, toca: ['cena'],
  poses: [[0, 'de_pie'], [w(4, 3), 'senalar'], [w(4, 6), 'celebrar'], [w(5, 0), 'de_pie'], [w(5, 3), 'senalar'], [w(5, 5), 'ofrecer'], [wf(5, -1), 'celebrar']],
  sonrisa: [[w(4, 3), 0.5], [w(4, 6), 1.3], [w(5, 0), 0.6], [w(5, 6), 1], [wf(5, -1), 1.5]] });
E.obj('barra2', 'relleno', { t0: N[1].S - 0.1, t1: w(5, 0) - 0.05, sale: 0.2, x: 60, y: -470, w: 380, h: 48, pop: true, pct: true, rotulo: 'NÓMINA',
  f: [[w(4, 3) - 0.1, 0], [w(4, 3) + 0.5, 0.3, 'out']], caja: [-190, -60, 470, 90] });
E.sfx(w(4, 3), 'fill');
E.obj('capr', 'tarro', { t0: N[1].S - 0.1, t1: fin(2), x: 190, w: 220, h: 290, rotulo: 'CAPRICHOS', pop: true, sobrevive: true, r: 80, oy: -150,
  nivel: [[w(5, 0), 0], [w(5, 0) + 0.5, 0.33, 'out'], [w(5, 1) + 0.5, 0.66, 'out'], [w(5, 2) + 0.5, 1, 'out'], [w(5, 6), 1], [w(5, 6) + 0.5, 0.9, 'out']],
  luz: [[0, 1], [w(4, 6), 1], [w(4, 8), 1]], barrido: [w(5, 3)], caja: [-110, -290, 220, 290], refl: true });
// cenas, viajes, caprichos: tres monedas que llenan el tarro; el contador suma hasta 480
E.obj('cuenta2', 'contador', { t0: w(5, 0) - 0.1, t1: fin(2), x: 190, y: -360, pop: true, suf: ' €', size: 60, col: 'txt',
  v: [[w(5, 0), 0], [w(5, 0) + 0.5, 160, 'out'], [w(5, 1) + 0.5, 320, 'out'], [w(5, 2) + 0.5, 480, 'out'], [w(5, 6), 480], [w(5, 6) + 0.5, 440, 'inout']], barrido: [w(5, 3)], caja: [-130, -34, 260, 68] });
const G2 = ['CENAS', 'VIAJES', 'CAPRICHOS'];
G2.forEach((s, i) => { const a = w(5, i);
  E.obj('g2_' + i, 'rotulo', { t0: a - 0.05, t1: i < 2 ? w(5, i + 1) - 0.02 : w(5, 3) + 0.1, entra: 0.1, sale: 0.12, x: -50, y: -250, texto: s, size: 30, col: '#c9ccca', pop: true, caja: [-110, -18, 220, 36] });
  E.obj('m2_' + i, 'moneda', { t0: a + 0.05, t1: a + 0.65, entra: 0.06, sale: 0.12, r: 22, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a + 0.05, -50], [a + 0.55, 190, 'inout']], y: [[a + 0.05, -280], [a + 0.28, -330], [a + 0.55, -200, 'in']] });
  E.golpe(a + 0.55, 0.015); });
E.obj('ch2a', 'chispas', { t0: w(5, 3), t1: w(5, 3) + 0.8, x: 190, y: -360, r0: 110, r1: 220, inspeccion: false });
// «que gastas sin darle vueltas»: paga la cena; la moneda sale del tarro de caprichos (480 → 440)
E.obj('cena', 'etiqueta', { t0: w(5, 5) - 0.15, t1: fin(2), x: -60, y: -250, w: 210, h: 84, r: 50, pop: true, v: 40, on: [[0, 0.35], [w(5, 6) + 0.5, 0.35], [w(5, 6) + 0.7, 1]], caja: [-105, -42, 210, 84] });
E.obj('rotCena', 'rotulo', { t0: w(5, 5), t1: fin(2), x: -60, y: -180, texto: 'CENA', size: 26, col: '#9a9c9b', pop: true, caja: [-50, -16, 100, 32] });
E.obj('m2p', 'moneda', { t0: w(5, 6), t1: w(5, 6) + 0.7, entra: 0.06, sale: 0.12, r: 24, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
  x: [[w(5, 6), 190], [w(5, 6) + 0.6, -60, 'inout']], y: [[w(5, 6), -250], [w(5, 6) + 0.3, -330], [w(5, 6) + 0.6, -250, 'in']] });
E.sfx(w(5, 6), 'coin');
E.obj('dice2', 'bocadillo', { t0: w(5, 4) - 0.1, t1: fin(2) - 0.1, sale: 0.2, x: -70, y: -500, w: 500, h: 76, texto: 'Esto sale de la parte de caprichos', size: 25, on: 1, pop: true, caja: [-250, -38, 500, 102] });
E.obj('ch2', 'chispas', { t0: wf(5, -1), t1: wf(5, -1) + 0.8, x: -60, y: -250, r0: 80, r1: 170, inspeccion: false });
E.golpe(wf(5, -1), 0.04);

// ---------- 3 · el veinte por ciento, para ahorrar, y lo apartas antes que nada ----------
// 6: La(0) tercera(1) el(2) veinte(3) por(4) ciento(5) para(6) ahorrar(7) y(8) lo(9) apartas(10) antes(11) que(12) nada(13)
// 7: Trescientos(0) veinte(1) euros(2) que(3) guardas(4) el(5) día(6) que(7) cobras(8) sin(9) esperar(10) a(11) ver(12) qué(13) sobra(14)
E.numero(3, N[2].T, N[2].S, { desde: 'capr', hacia: 'ahorro' });
E.figura('yo3', { t0: N[2].S - 0.1, t1: TG, x: -380, cara: true,
  poses: [[0, 'de_pie'], [w(6, 3), 'senalar'], [w(6, 8), 'meter'], [wf(6, -1), 'de_pie'], [w(7, 0), 'senalar'], [w(7, 4), 'meter'], [w(7, 9), 'de_pie'], [wf(7, -1), 'celebrar']],
  sonrisa: [[w(6, 3), 0.5], [w(6, 10), 0.8], [w(7, 4), 0.6], [wf(7, -1), 1.5]] });
E.obj('barra3', 'relleno', { t0: N[2].S - 0.1, t1: w(7, 0) - 0.05, sale: 0.2, x: 60, y: -470, w: 380, h: 48, pop: true, pct: true, rotulo: 'NÓMINA',
  f: [[w(6, 3) - 0.1, 0], [w(6, 3) + 0.5, 0.2, 'out']], caja: [-190, -60, 470, 90] });
E.sfx(w(6, 3), 'fill');
E.obj('ahorro', 'tarro', { t0: N[2].S - 0.1, t1: TG, x: 190, w: 220, h: 290, rotulo: 'AHORRO', pop: true, r: 80, oy: -150,
  nivel: [[w(6, 10), 0], [wf(6, -1), 0.6, 'inout'], [w(7, 0), 0.6], [w(7, 2) + 0.3, 1, 'out']], tapa: [[w(7, 9), 0], [w(7, 9) + 0.35, 1, 'out']],
  barrido: [w(7, 2), wf(7, -1)], caja: [-110, -290, 220, 290], refl: true });
for (let i = 0; i < 5; i++) { const a = w(6, 10) + i * 0.22;
  E.obj('m3_' + i, 'moneda', { t0: a, t1: a + 0.7, entra: 0.06, sale: 0.12, r: 22, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, -230], [a + 0.6, 190, 'inout']], y: [[a, -300], [a + 0.3, -420], [a + 0.6, -200, 'in']] }); }
E.sfx(w(6, 10), 'fill');
E.obj('cuenta3', 'contador', { t0: w(7, 0) - 0.15, t1: TG, x: 190, y: -360, pop: true, suf: ' €', size: 60, col: 'txt',
  v: [[w(7, 0), 0], [w(7, 2) + 0.3, 320, 'inout']], barrido: [w(7, 2) + 0.3], caja: [-130, -34, 260, 68] });
// «el día que cobras»: el calendario se para en el 28, el día de cobro; «sin esperar a ver qué sobra»: tapa
E.obj('dia3', 'dias', { t0: w(7, 4) - 0.2, t1: TG, x: -40, y: -520, letras: ['26', '27', '28', '29', '30'], gap: 86, pop: true,
  luz: [[w(7, 5), 0], [w(7, 8), 2, 'inout']], caja: [-210, -32, 420, 64] });
E.obj('rotDia3', 'rotulo', { t0: w(7, 6), t1: TG, x: -40, y: -455, texto: [[0, 'DÍA DE COBRO'], [w(7, 9), 'APARTADO EL PRIMERO']], size: 24, col: '#e6ce46', pop: true, caja: [-150, -15, 300, 30] });
E.obj('ch3', 'chispas', { t0: w(7, 9) + 0.3, t1: w(7, 9) + 1.1, x: 190, y: -280, r0: 110, r1: 220, inspeccion: false });
E.obj('rayos3', 'rayos', { t0: w(7, 9), t1: TG, x: 190, y: -150, r: 320, z: -2, p: [[w(7, 9), 0], [wf(7, -1), 1, 'out']], inspeccion: false });
E.golpe(w(7, 9) + 0.35, 0.04); E.destello(wf(7, -1), 0.12);

// ---------- giro: si los fijos pasan de la mitad, baja caprichos y el ahorro no se toca ----------
// 8: Si(0) los(1) gastos(2) fijos(3) pasan(4) de(5) la(6) mitad(7) recorta(8) de(9) los(10) caprichos(11) nunca(12) del(13) ahorro(14)
const J = [{ x: -150, h: 220, v: 800, id: 'jF', rot: 'FIJOS' }, { x: 90, h: 170, v: 480, id: 'jC', rot: 'CAPRICHOS' }, { x: 320, h: 130, v: 320, id: 'jA', rot: 'AHORRO' }];
E.figura('yo4', { t0: TG, t1: TC, x: -410, talla: 400, cara: true,
  poses: [[0, 'de_pie'], [w(8, 4), 'manos_cabeza'], [w(8, 8), 'senalar'], [w(8, 12), 'apartarse'], [wf(8, -1), 'celebrar']],
  sonrisa: [[0, 0.2], [w(8, 4), -1], [w(8, 8), 0.2], [wf(8, -1), 1.4]] });
J.forEach((j, i) => {
  E.obj(j.id, 'tarro', { t0: TG + i * 0.1, t1: TC, x: j.x, w: 150, h: j.h, rotulo: j.rot, pop: true,
    nivel: i === 1 ? [[0, 1], [w(8, 8), 1], [w(8, 11) + 0.3, 0.69, 'inout']] : 1, tapa: i === 2 ? 1 : 0,
    barrido: i === 2 ? [w(8, 13)] : null, caja: [-75, -j.h, 150, j.h], refl: true });
  E.obj(j.id + 'v', 'contador', { t0: TG + 0.15 + i * 0.1, t1: TC, x: j.x, y: -j.h - 50, pop: true, suf: ' €', size: 44, col: 'txt',
    v: i === 0 ? [[w(8, 2), 800], [w(8, 7), 950, 'inout']] : i === 1 ? [[w(8, 8), 480], [w(8, 11) + 0.3, 330, 'inout']] : 320, caja: [-100, -26, 200, 52] });
});
// la mitad de la nómina, marcada; los fijos la cruzan en rojo
E.obj('mitad4', 'barra', { t0: TG + 0.1, t1: TC, x: 60, y: -440, w: 420, h: 40, pop: true, marca: 0.5, rotMarca: 'MITAD',
  f: [[w(8, 2), 0.5], [w(8, 7), 0.59, 'inout']], caja: [-210, -100, 420, 130] });
E.obj('pasa4', 'rotulo', { t0: w(8, 6), t1: TC, x: -150, y: -385, texto: '+150 €', size: 34, col: ROJO, pop: true, caja: [-70, -20, 140, 40] });
E.obj('menos4', 'rotulo', { t0: w(8, 10), t1: TC, x: 90, y: -335, texto: '−150 €', size: 34, col: ROJO, pop: true, caja: [-70, -20, 140, 40] });
for (let i = 0; i < 3; i++) { const a = w(8, 9) + i * 0.18;
  E.obj('m4_' + i, 'moneda', { t0: a, t1: a + 0.7, entra: 0.06, sale: 0.12, r: 20, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, 90], [a + 0.6, -150, 'inout']], y: [[a, -130], [a + 0.3, -300], [a + 0.6, -180, 'in']] }); }
E.temblor(w(8, 7), 12, 0.4); E.golpe(w(8, 4), 0.03); E.sfx(TG, 'cut'); E.golpe(TG + 0.05, 0.03);
E.sfx(w(8, 9), 'whoosh');
E.obj('rayos4', 'rayos', { t0: w(8, 12), t1: TC, x: 320, y: -80, r: 240, z: -2, p: [[w(8, 12), 0], [wf(8, -1), 1, 'out']], inspeccion: false });
E.obj('ch4', 'chispas', { t0: w(8, 13), t1: w(8, 13) + 0.8, x: 320, y: -120, r0: 80, r1: 180, inspeccion: false });
E.destello(w(8, 13), 0.12);

// ---------- cierre: resumen y envío ----------
// 9: El(0) sueldo(1) no(2) cambia(3) cambia(4) el(5) orden(6) en(7) que(8) lo(9) repartes(10)
// 10: Mándaselo(0) a(1) ese(2) amigo(3) que(4) a(5) mitad(6) de(7) mes(8) ya(9) no(10) llega(11)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(9, 6), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, items: ['Fijos', 'Caprichos', 'Ahorro'], gap: 230,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(9, 6)], caja: [-360, -60, 720, 200] });
E.obj('confC', 'confeti', { t0: wf(9, -1), t1: wf(9, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(9, -1), 0.22); E.golpe(wf(9, -1), 0.04);
E.figura('yoF', { t0: w(10, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(10, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(10, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(10, 9)], vuelo: [[wf(10, -1), 0], [wf(10, -1) + 0.5, 1, 'in']] });
