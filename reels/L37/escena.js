// L37 · La inflación del estilo de vida (estilo B; reglas 15, 20, 21, 24)
// Gancho visual: la subida de 200 € llena un tarro que se vacía en tres meses (1, 2, 3); después, dos barras:
// el SUELDO sube y el GASTO va detrás hasta el mismo nivel.
// 1: la subida (etiqueta de 200 €) se reparte en un plan de tres renglones antes de cobrar; si se decide después, se va.
// 2: la mitad vuela al tarro de AHORRO: 100 € al mes que ruedan hasta 12.000 € en diez años.
// 3: una barra de GASTO FIJO con la marca del SUELDO DE ANTES; un piso y un coche la empujan por encima.
// Regla 20: «¿En qué se me ha ido la subida?» va en bocadillo del muñeco; la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(2, 0), gap: 70, y: 360 } });

// «La primera: // …» → T en «La», S en la primera palabra del punto
const N = [3, 5, 7].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(9, 0) - 0.1;   // resumen
const ROJO = '#e4574f';

E.camara([
  [0, [0, -380, 1.04]], [w(0, 7), [20, -385, 1.07]], [w(0, 13), [0, -385, 1.05]], [w(1, 0), [0, -380, 1.02]], [w(1, 8), [20, -385, 1.05]],
  [w(2, 0), [0, -380, 1.03]], [N[0].T, [0, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(3, 8), [15, -385, 1.04]], [w(4, 0), [-10, -385, 1.03]], [w(4, 6), [10, -385, 1.06]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 0), [-15, -385, 1.04]], [w(6, 7), [0, -385, 1.03]], [w(6, 11), [0, -390, 1.06]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(7, 10), [15, -385, 1.04]], [w(8, 0), [-10, -385, 1.03]], [w(8, 8), [0, -390, 1.05]], [TC - 0.1, [0, -385, 1.04]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Te(0) suben(1) el(2) sueldo(3) 200(4) euros(5) al(6) mes(7) y(8) a(9) los(10) tres(11) meses(12) vas(13) igual(14) de(15) justo(16)   [bocadillo «¿En qué se me ha ido la subida?»]
// 1: Se(0) llama(1) inflación(2) del(3) estilo(4) de(5) vida(6) cuando(7) sube(8) el(9) sueldo(10) el(11) gasto(12) va(13) detrás(14)
// 2: Tres(0) reglas(1) para(2) que(3) no(4) te(5) pase(6)
const HX = 170;
E.figura('yo', { t0: 0, t1: fin(0), x: -340, cara: true,
  poses: [[0, 'de_pie'], [w(0, 1), 'celebrar'], [w(0, 7), 'ofrecer'], [w(0, 9), 'de_pie'], [w(0, 11), 'pensar'], [w(0, 14), 'manos_cabeza'], [w(1, 0), 'de_pie'],
    [w(1, 2), 'senalar'], [w(1, 8), 'celebrar'], [w(1, 11), 'encoger'], [w(2, 0), 'senalar']],
  sonrisa: [[0, 0.4], [w(0, 1), 1.5], [w(0, 11), 0], [w(0, 14), -1.3], [w(1, 2), -0.2], [w(1, 8), 1], [w(1, 11), -0.8], [w(2, 0), 0.5], [w(2, 4), 1.2]] });
// la subida: +200 € que llenan el tarro; en tres meses (1, 2, 3) el tarro se vacía y las monedas se van
E.obj('subeH', 'contador', { t0: w(0, 3), t1: w(1, 0) + 0.1, sale: 0.2, x: HX, y: -282, pre: '+', suf: ' €', size: 64, col: '#e6ce46', miles: false, pop: true,
  v: [[w(0, 4), 0], [w(0, 5) + 0.15, 200, 'out']], luz: [[0, 1], [w(0, 13), 1], [w(0, 14) + 0.3, 0.35]], barrido: [w(0, 6)], caja: [-130, -36, 260, 72] });
E.obj('tarroH', 'tarro', { t0: 0.1, t1: w(1, 0) + 0.1, sale: 0.2, x: HX, w: 200, h: 230, rotulo: 'SUBIDA', refl: true,
  nivel: [[w(0, 4), 0], [w(0, 7), 1, 'out'], [w(0, 11), 1], [w(0, 11) + 0.4, 0.66, 'inout'], [w(0, 12) + 0.15, 0.33, 'inout'], [w(0, 14), 0, 'inout']],
  apagado: [[w(0, 14), 0], [w(0, 15) + 0.2, 1]], barrido: [w(0, 7)], caja: [-100, -230, 200, 230] });
E.sfx(w(0, 4), 'fill');
E.obj('mesesH', 'dias', { t0: w(0, 9), t1: w(1, 0) + 0.1, sale: 0.2, x: HX, y: -368, letras: ['1', '2', '3'], gap: 90, pop: true,
  luz: [[w(0, 11) - 0.05, -0.5], [w(0, 11) + 0.35, 0, 'out'], [w(0, 12), 1, 'inout'], [w(0, 14), 2, 'inout']], caja: [-125, -32, 250, 64] });
for (let i = 0; i < 9; i++) { const a = w(0, 11) + i * 0.15;
  E.obj('vuela' + i, 'moneda', { t0: a, t1: a + 0.8, entra: 0.05, sale: 0.2, r: 22, n: '', libre: true, estela: 5, sfx: i % 3 === 0, inspeccion: false,
    x: [[a, HX + 30], [a + 0.8, 580 + (i % 3) * 40, 'in']], y: [[a, -120], [a + 0.35, -220 - (i % 3) * 25, 'out'], [a + 0.8, -60, 'in']] }); }
E.sfx(w(0, 11), 'whoosh');
E.temblor(w(0, 15), 12, 0.4); E.golpe(w(0, 4), 0.04);
E.obj('bocaH', 'bocadillo', { t0: w(0, 13) - 0.1, t1: w(1, 0) - 0.1, sale: 0.2, x: 0, y: -480, w: 480, h: 80, texto: '¿En qué se me ha ido la subida?', size: 28, pop: true,
  on: [[0, 0], [w(0, 15), 1]], caja: [-240, -40, 480, 106] });
// «inflación del estilo de vida: cuando sube el sueldo, el gasto va detrás»: dos barras, la segunda alcanza a la primera
E.obj('rotInf', 'rotulo', { t0: w(1, 2) - 0.05, t1: w(2, 0), sale: 0.2, x: 120, y: -520, texto: 'INFLACIÓN DEL ESTILO DE VIDA', size: 28, col: '#e6ce46', peso: 700, pop: true, caja: [-300, -18, 600, 36] });
E.obj('barS', 'relleno', { t0: w(1, 0) + 0.15, t1: w(2, 0) + 0.1, sale: 0.2, x: 120, y: -380, w: 400, h: 54, rotulo: 'SUELDO', pop: true,
  f: [[w(1, 0), 0], [w(1, 0) + 0.5, 0.55, 'out'], [w(1, 8), 0.55], [w(1, 10), 0.85, 'out']], caja: [-200, -62, 400, 89] });
E.obj('barG', 'relleno', { t0: w(1, 0) + 0.3, t1: w(2, 0) + 0.1, sale: 0.2, x: 120, y: -240, w: 400, h: 54, rotulo: 'GASTO', pop: true,
  f: [[w(1, 0) + 0.2, 0], [w(1, 0) + 0.7, 0.55, 'out'], [w(1, 11), 0.55], [w(1, 14), 0.85, 'inout']], barrido: [w(1, 14)], caja: [-200, -62, 400, 89] });
E.sfx(w(1, 8), 'fill'); E.sfx(w(1, 11), 'fill');
E.obj('flechaG', 'flecha', { t0: w(1, 12), t1: w(2, 0), sale: 0.15, de: [420, -240], hasta: [420, -370], curva: -0.35, discontinua: true, p: [[w(1, 12), 0], [w(1, 14), 1, 'out']], inspeccion: false });
E.golpe(w(1, 14), 0.04); E.temblor(wf(1, -1), 10, 0.35);
// «Tres reglas»: tres monedas; la primera crece y brilla
[0, 1, 2].forEach(i => { const a = w(2, 0) + i * 0.15;
  E.obj('r' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T + 0.05, sale: 0.2, sobrevive: i === 0, x: 20 + i * 140, y: -330, r: 50, n: i + 1, pop: true, sfx: true, inspeccion: false,
    s: i === 0 ? [[0, 1], [w(2, 5), 1], [w(2, 6) + 0.2, 1.3, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [w(2, 5), 1], [w(2, 6) + 0.2, 0.35]] }); });
E.obj('rayosH', 'rayos', { t0: w(2, 0), t1: fin(0), x: 160, y: -330, r: 300, z: -2, p: [[w(2, 0), 0], [w(2, 6), 1, 'out']], inspeccion: false });
E.obj('chH', 'chispas', { t0: w(2, 6), t1: w(2, 6) + 0.8, x: 20, y: -330, r0: 60, r1: 150, inspeccion: false });
E.destello(w(2, 6), 0.15);

// ---------- 1 · decide a dónde va la subida antes de cobrarla ----------
// 3: La(0) primera(1) decide(2) a(3) dónde(4) va(5) la(6) subida(7) antes(8) de(9) cobrarla(10)
// 4: Si(0) lo(1) decides(2) después(3) ya(4) se(5) la(6) habrán(7) llevado(8) los(9) gastos(10)
E.numero(1, N[0].T, N[0].S, { desde: 'r1', hacia: 'sub1' });
const S1 = 150;
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -370, cara: true,
  poses: [[0, 'de_pie'], [w(3, 2), 'escribir'], [w(3, 7), 'senalar'], [w(4, 0), 'pensar'], [w(4, 4), 'manos_cabeza'], [wf(4, -1), 'celebrar']],
  sonrisa: [[w(3, 2), 0.6], [w(3, 8), 1.2], [w(4, 0), 0], [w(4, 4), -1.3], [wf(4, -1), 1.3]] });
E.obj('sub1', 'etiqueta', { t0: N[0].S - 0.1, t1: fin(1), x: S1, y: -480, w: 300, h: 110, sobrevive: true, r: 70,
  v: [[N[0].S, 0], [N[0].S + 0.5, 200, 'out'], [w(4, 4), 200], [w(4, 10), 0, 'inout'], [wf(4, -1), 0], [wf(4, -1) + 0.35, 200, 'out']],
  on: [[0, 1], [w(4, 4), 1], [w(4, 6), 0.35], [wf(4, -1), 0.35], [wf(4, -1) + 0.2, 1]], barrido: [w(3, 7), wf(4, -1) + 0.35], caja: [-150, -55, 300, 110] });
E.obj('rotSub1', 'rotulo', { t0: N[0].S, t1: fin(1), x: S1, y: -395, texto: [[0, 'LA SUBIDA'], [w(4, 4), 'SE LA LLEVAN LOS GASTOS'], [wf(4, -1), 'LA SUBIDA']], size: 24, col: '#9a9c9b', caja: [-200, -15, 400, 30] });
// el plan: tres renglones que se marcan («decide a dónde va»)
E.obj('plan1', 'lista', { t0: w(3, 2) - 0.15, t1: fin(1), x: S1, y: -250, n: 3, w: 300, gap: 62, pop: true,
  p: [[w(3, 3), 0], [w(3, 4) + 0.2, 1, 'out'], [w(3, 5) + 0.2, 2, 'out'], [w(3, 7) + 0.2, 3, 'out'], [w(4, 4), 3], [w(4, 9), 0, 'inout'], [wf(4, -1), 0], [wf(4, -1) + 0.4, 3, 'out']],
  brillo: [[w(3, 7), 0], [w(3, 8) + 0.3, 3, 'out'], [w(4, 4), 3], [w(4, 6), 0]], caja: [-150, -80, 300, 160] });
E.sfx(w(3, 3), 'fill');
E.obj('flecha1', 'flecha', { t0: w(3, 3), t1: w(4, 0), sale: 0.15, de: [S1 + 175, -480], hasta: [S1 + 175, -260], curva: -0.3, discontinua: true, p: [[w(3, 3), 0], [w(3, 5) + 0.2, 1, 'out']], inspeccion: false });
E.obj('antes1', 'rotulo', { t0: w(3, 8) - 0.05, t1: fin(1), x: S1, y: -120, texto: [[0, 'ANTES DE COBRAR'], [w(4, 2), 'DESPUÉS'], [wf(4, -1), 'ANTES DE COBRAR']], size: 30, col: '#e6ce46', peso: 700, pop: true, caja: [-170, -18, 340, 36] });
E.obj('ch1a', 'chispas', { t0: w(3, 10), t1: w(3, 10) + 0.8, x: S1, y: -250, r0: 120, r1: 230, inspeccion: false });
E.golpe(w(3, 10), 0.04);
// «ya se la habrán llevado los gastos»: las monedas salen de la etiqueta y se van; al acabar, vuelve a «antes»
for (let i = 0; i < 6; i++) { const a = w(4, 4) + i * 0.22;
  E.obj('fuera1_' + i, 'moneda', { t0: a, t1: a + 0.8, entra: 0.05, sale: 0.2, r: 22, n: '', libre: true, estela: 5, sfx: i === 0, inspeccion: false,
    x: [[a, S1 + 60], [a + 0.8, 600 + (i % 3) * 30, 'in']], y: [[a, -480], [a + 0.35, -540 + (i % 2) * 20, 'out'], [a + 0.8, -330, 'in']] }); }
E.temblor(w(4, 10), 12, 0.4);
E.sfx(wf(4, -1), 'fill'); E.destello(wf(4, -1) + 0.3, 0.1);

// ---------- 2 · guarda la mitad de cada subida ----------
// 5: La(0) segunda(1) guarda(2) la(3) mitad(4) de(5) cada(6) subida(7)
// 6: De(0) esos(1) 200(2) euros(3) 100(4) al(5) ahorro(6) En(7) diez(8) años(9) son(10) 12.000(11) sin(12) contar(13) intereses(14)
E.numero(2, N[1].T, N[1].S, { desde: 'sub1', hacia: 'tarroA' });
const S2 = -40, TA = 240;
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -370, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'meter'], [w(5, 7), 'senalar'], [w(6, 0), 'ofrecer'], [w(6, 4), 'meter'], [w(6, 7), 'pensar'], [w(6, 10), 'celebrar'], [w(6, 12), 'senalar']],
  sonrisa: [[w(5, 2), 0.6], [w(6, 4), 0.8], [w(6, 7), 0.3], [w(6, 10), 1.6], [w(6, 12), 1]] });
E.obj('sub2', 'etiqueta', { t0: N[1].S - 0.1, t1: w(6, 7), sale: 0.25, x: S2, y: -470, w: 260, h: 100,
  v: [[N[1].S, 0], [N[1].S + 0.4, 200, 'out'], [w(5, 4), 200], [w(5, 7) + 0.3, 100, 'inout']], barrido: [w(6, 2)], caja: [-130, -50, 260, 100] });
E.obj('rotSub2', 'rotulo', { t0: N[1].S, t1: w(6, 7), sale: 0.25, x: S2, y: -390, texto: [[0, 'LA SUBIDA'], [w(5, 7), 'PARA GASTAR']], size: 24, col: '#9a9c9b', caja: [-110, -15, 220, 30] });
E.obj('tarroA', 'tarro', { t0: N[1].S - 0.1, t1: fin(2), x: TA, w: 200, h: 260, rotulo: 'AHORRO', refl: true,
  nivel: [[w(5, 4), 0], [w(5, 7) + 0.3, 0.3, 'inout'], [w(6, 8), 0.3], [w(6, 11) + 0.3, 1, 'inout']], tapa: [[w(6, 12), 0], [w(6, 12) + 0.35, 1, 'out']],
  barrido: [w(5, 7) + 0.3, w(6, 11) + 0.3], caja: [-100, -260, 200, 260] });
for (let i = 0; i < 4; i++) { const a = w(5, 4) + i * 0.2;
  E.obj('m2_' + i, 'moneda', { t0: a, t1: a + 0.8, entra: 0.06, sale: 0.15, r: 22, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, S2 + 40], [a + 0.75, TA, 'inout']], y: [[a, -470], [a + 0.38, -520], [a + 0.75, -150, 'in']] }); }
E.sfx(w(5, 4), 'fill');
// la cuenta del tarro: 100 € al mes que ruedan hasta 12.000 € en diez años
E.obj('cuentaA', 'contador', { t0: w(5, 4) - 0.1, t1: fin(2), x: TA, y: -330, size: 56, col: 'txt', suf: ' €', pop: true, sobrevive: true, r: 70,
  v: [[w(5, 4), 0], [w(5, 7) + 0.3, 100, 'inout'], [w(6, 8), 100], [w(6, 11) + 0.3, 12000, 'inout']], barrido: [w(6, 4), w(6, 11) + 0.3], caja: [-150, -32, 300, 64] });
E.obj('rotA', 'rotulo', { t0: w(5, 4), t1: fin(2), x: TA, y: -400, texto: [[0, 'LA MITAD'], [w(6, 4), 'AL MES'], [w(6, 9), 'EN DIEZ AÑOS']], size: 26, col: '#e6ce46', pop: true, caja: [-120, -16, 240, 32] });
E.golpe(w(6, 4), 0.03);
// «En diez años»: barra que se rellena año a año
E.obj('anios', 'relleno', { t0: w(6, 7) + 0.05, t1: fin(2), x: S2 + 20, y: -480, w: 340, h: 50, rotulo: 'DIEZ AÑOS', pop: true,
  f: [[w(6, 8), 0], [w(6, 11) + 0.3, 1, 'inout']], caja: [-170, -59, 340, 84] });
E.sfx(w(6, 8), 'fill');
E.obj('pila2', 'pila', { t0: w(6, 7) + 0.1, t1: fin(2), x: S2 + 20, n: 10, w: 160, hh: 26, k: [[w(6, 8), 0], [w(6, 11) + 0.3, 10, 'inout']], caja: [-80, -224, 160, 224], refl: true });
E.obj('sinInt', 'rotulo', { t0: w(6, 12) - 0.05, t1: fin(2), x: S2, y: -265, texto: 'SIN CONTAR INTERESES', size: 22, col: '#9a9c9b', pop: true, caja: [-160, -15, 320, 30] });
E.obj('rayos2', 'rayos', { t0: w(6, 10), t1: fin(2), x: TA, y: -330, r: 300, z: -2, p: [[w(6, 10), 0], [w(6, 11) + 0.3, 1, 'out']], inspeccion: false });
E.obj('ch2', 'chispas', { t0: w(6, 11) + 0.3, t1: w(6, 11) + 1.1, x: TA, y: -330, r0: 120, r1: 230, inspeccion: false });
E.golpe(w(6, 11) + 0.3, 0.05); E.destello(w(6, 11) + 0.3, 0.15);

// ---------- 3 · no te metas en un gasto fijo que no podrías pagar con el sueldo de antes ----------
// 7: La(0) tercera(1) no(2) te(3) metas(4) en(5) un(6) gasto(7) fijo(8) que(9) no(10) podrías(11) pagar(12) con(13) el(14) sueldo(15) de(16) antes(17)
// 8: Un(0) piso(1) más(2) caro(3) o(4) un(5) coche(6) nuevo(7) te(8) atan(9) durante(10) años(11)
E.numero(3, N[2].T, N[2].S, { desde: 'cuentaA', hacia: 'fijo3' });
const BX = 60;
E.figura('yo3', { t0: N[2].S - 0.1, t1: TC, x: -370, cara: true,
  poses: [[0, 'de_pie'], [w(7, 2), 'apartarse'], [w(7, 7), 'senalar'], [w(7, 10), 'manos_cabeza'], [w(7, 15), 'senalar'], [wf(7, -1), 'celebrar'],
    [w(8, 0), 'pensar'], [w(8, 6), 'encoger'], [w(8, 9), 'manos_cabeza'], [wf(8, -1), 'triste']],
  sonrisa: [[w(7, 2), -0.3], [w(7, 10), -1.3], [w(7, 15), 0.2], [wf(7, -1), 1.3], [w(8, 0), 0.2], [w(8, 9), -1.4]] });
// barra de gasto fijo; la marca es el sueldo de antes
E.obj('fijo3', 'barra', { t0: N[2].S - 0.1, t1: TC, x: BX, y: -440, w: 440, h: 50, marca: 0.7, rotMarca: 'SUELDO DE ANTES',
  f: [[w(7, 7), 0], [w(7, 8) + 0.2, 0.5, 'out'], [w(7, 10), 0.5], [w(7, 12) + 0.2, 0.92, 'inout'], [wf(7, -1), 0.92], [wf(7, -1) + 0.3, 0.55, 'inout'],
    [w(8, 1), 0.55], [w(8, 3), 0.78, 'out'], [w(8, 6), 0.78], [w(8, 7) + 0.1, 0.97, 'out']], caja: [-220, -103, 440, 128] });
E.obj('rotFijo', 'rotulo', { t0: w(7, 7) - 0.05, t1: TC, x: BX - 90, y: -380, texto: 'GASTO FIJO', size: 24, col: '#9a9c9b', pop: true, caja: [-90, -15, 180, 30] });
E.obj('noLlega', 'rotulo', { t0: w(7, 11), t1: wf(7, -1) + 0.3, sale: 0.15, x: BX + 150, y: -380, texto: 'NO LLEGA', size: 28, col: ROJO, peso: 700, pop: true, caja: [-80, -17, 160, 34] });
E.sfx(w(7, 7), 'fill'); E.sfx(w(7, 10), 'fill');
E.temblor(w(7, 12) + 0.2, 12, 0.4); E.golpe(w(7, 15), 0.04);
E.obj('ch3a', 'chispas', { t0: wf(7, -1) + 0.3, t1: wf(7, -1) + 1.1, x: BX - 60, y: -440, r0: 60, r1: 160, inspeccion: false });
// «Un piso más caro o un coche nuevo»: dos gastos que empujan la barra por encima del sueldo de antes
E.obj('piso3', 'rotulo', { t0: w(8, 1) - 0.05, t1: TC, x: BX, y: -320, texto: 'UN PISO MÁS CARO', size: 32, col: '#e6ce46', peso: 700, pop: true, caja: [-190, -19, 380, 38] });
E.obj('coche3', 'rotulo', { t0: w(8, 6) - 0.05, t1: TC, x: BX, y: -260, texto: 'UN COCHE NUEVO', size: 32, col: '#e6ce46', peso: 700, pop: true, caja: [-170, -19, 340, 38] });
E.obj('pasa3', 'rotulo', { t0: w(8, 7) + 0.1, t1: TC, x: BX + 150, y: -380, texto: 'NO LLEGA', size: 28, col: ROJO, peso: 700, pop: true, caja: [-80, -17, 160, 34] });
E.golpe(w(8, 1), 0.03); E.temblor(w(8, 7) + 0.1, 12, 0.4);
// «te atan durante años»: años de cuotas que se van tachando, uno a uno
E.obj('cuotas3', 'bloques', { t0: w(8, 8) - 0.1, t1: TC, x: BX, y: -140, n: 8, w: 440, h: 64, pop: true, texto: 'AÑOS',
  parte: [[w(8, 9), 0], [w(8, 9) + 0.4, 1, 'out']], hechos: [[w(8, 10), 0], [TC - 0.05, 3, 'lin']], caja: [-220, -42, 440, 84] });
E.obj('rotCuotas', 'rotulo', { t0: w(8, 9), t1: TC, x: BX, y: -60, texto: 'AÑOS PAGANDO', size: 24, col: '#9a9c9b', pop: true, caja: [-110, -15, 220, 30] });
E.sfx(w(8, 9), 'thud');

// ---------- cierre: resumen y envío ----------
// 9: Ganar(0) más(1) sirve(2) de(3) poco(4) si(5) el(6) gasto(7) sube(8) al(9) mismo(10) ritmo(11)
// 10: Mándaselo(0) a(1) ese(2) amigo(3) que(4) acaba(5) de(6) cambiar(7) de(8) trabajo(9)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(9, 8), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, items: ['Decide antes', 'Guarda la mitad', 'Sin fijos'], gap: 270,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(9, 8)], caja: [-410, -60, 820, 200] });
E.obj('confC', 'confeti', { t0: wf(9, -1), t1: wf(9, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(9, -1), 0.22); E.golpe(wf(9, -1), 0.04);
E.figura('yoF', { t0: w(10, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(10, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(10, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(10, 7)], vuelo: [[wf(10, -1), 0], [wf(10, -1) + 0.5, 1, 'in']] });
