// L28 · Lo que es tuyo de una factura de autónomo (estilo B; reglas 15, 20, 21, 24)
// Gancho visual: la factura sube de 3.000 a 3.630 €, el montón crece y 630 € se van en rojo.
// Los tres «sobres» son tarros con rótulo (el motor no tiene sobres): IVA, GASTOS, IRPF; se rellenan con monedas que vuelan del montón.
// Regla 20: «¡Este mes he facturado un montón!» va en bocadillo del muñeco; la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(1, 11), gap: 70, y: 360 } });

// «El primero, el IVA: // …» → T en «El», S dos palabras después
const N = [2, 5, 7].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(9, 0) - 0.1;

E.camara([
  [0, [0, -380, 1.04]], [w(0, 10), [20, -385, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 11), [10, -390, 1.05]], [N[0].T, [20, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(3, 0), [20, -385, 1.05]], [w(4, 0), [0, -380, 1.03]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 5), [-20, -385, 1.05]], [w(6, 12), [0, -385, 1.03]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(8, 0), [0, -385, 1.03]], [wf(8, -1), [0, -395, 1.05]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Si(0) eres(1) autónomo(2) y(3) facturas(4) tres(5) mil(6) euros(7) más(8) IVA,(9) cobras(10) 3.630,(11) pero(12) 630(13) no(14) son(15) tuyos.(16)   [bocadillo «¡Este mes he facturado un montón!»]
// 1: Eso(0) es(1) el(2) IVA,(3) y(4) no(5) es(6) lo(7) único.(8) Aparta(9) en(10) tres(11) sobres(12) lo(13) que(14) no(15) es(16) tuyo:(17) lo(18) que(19) sobra(20) es(21) lo(22) que(23) ganas.(24)
const GX = 190;
E.figura('yo', { t0: 0, t1: fin(0), x: -330, cara: true, toca: [],
  poses: [[0, 'celebrar'], [w(0, 4), 'ofrecer'], [w(0, 10), 'celebrar'], [w(0, 12), 'de_pie'], [w(0, 13), 'manos_cabeza'], [w(1, 0), 'senalar'], [w(1, 4), 'encoger'], [w(1, 9), 'de_pie'], [w(1, 11), 'senalar']],
  sonrisa: [[0, 1.4], [w(0, 12), 0.8], [w(0, 13), -1.2], [w(1, 4), -0.6], [w(1, 11), 0.4], [w(1, 20), 1.2]] });
E.obj('bocaH', 'bocadillo', { t0: 0.3, t1: w(0, 8), sale: 0.2, x: -30, y: -490, w: 420, h: 80, texto: '¡Este mes he facturado un montón!', size: 24, pop: true,
  on: [[0.3, 0], [0.8, 1]], caja: [-210, -40, 420, 106] });
E.obj('factura', 'etiqueta', { t0: 0.1, t1: fin(0), x: GX, y: -350, w: 360, h: 120,
  v: [[0.4, 0], [w(0, 7), 3000, 'out'], [w(0, 10), 3000], [w(0, 11) + 0.25, 3630, 'inout']], barrido: [w(0, 7), w(0, 11) + 0.3], caja: [-180, -60, 360, 120] });
E.obj('rotFact', 'rotulo', { t0: w(0, 8) + 0.05, t1: fin(0), x: GX, y: -450, pop: true, texto: [[0, '+ 21 % DE IVA'], [w(1, 0), 'EL IVA ES DE HACIENDA']], size: 26, col: '#9a9c9b', caja: [-170, -16, 340, 32] });
E.obj('pilaH', 'pila', { t0: 0.1, t1: fin(0), x: GX, n: 10, w: 190, hh: 26, k: [[w(0, 9), 0], [w(0, 11) + 0.3, 10, 'out'], [w(0, 13), 10], [w(0, 15), 8.3, 'inout']],
  luz: [[0, 1], [w(1, 9), 1], [w(1, 9) + 0.3, 0.5]], caja: [-95, -224, 190, 224], refl: true });
E.sfx(w(0, 10), 'fill');
E.obj('menos', 'contador', { t0: w(0, 13) - 0.05, t1: w(1, 9), sale: 0.2, x: GX, y: -540, v: [[w(0, 13), 0], [w(0, 14) + 0.2, 630, 'out']], pre: '−', suf: ' €', size: 60, col: '#e4574f', miles: false, pop: true,
  caja: [-130, -36, 260, 72] });
for (let i = 0; i < 4; i++) { const a = w(0, 13) + i * 0.14;
  E.obj('fuera' + i, 'moneda', { t0: a, t1: a + 0.8, entra: 0.05, sale: 0.2, r: 22, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, GX + 60], [a + 0.8, 580 + i * 30, 'in']], y: [[a, -190], [a + 0.35, -235 - i * 6, 'out'], [a + 0.8, -100, 'in']] }); }
E.temblor(w(0, 14), 14, 0.45); E.golpe(w(0, 14), 0.05);
// «tres sobres»: tres monedas; «lo que sobra es lo que ganas»: la primera crece y brilla
E.obj('rayosH', 'rayos', { t0: w(1, 11) - 0.1, t1: fin(0), x: GX, y: -545, r: 300, z: -2, p: [[w(1, 11) - 0.1, 0], [w(1, 20), 1, 'out']], inspeccion: false });
[0, 1, 2].forEach(i => { const a = w(1, 11) + i * 0.12;
  E.obj('s' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: GX + (i - 1) * 100, y: -545, r: 34, n: i + 1, pop: true, sfx: i === 0, inspeccion: false,
    s: i === 0 ? [[0, 1], [w(1, 20), 1], [w(1, 20) + 0.35, 1.4, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [w(1, 20), 1], [w(1, 20) + 0.3, 0.35]], barrido: i === 0 ? [w(1, 21)] : null }); });
E.obj('chH', 'chispas', { t0: wf(1, -1), t1: wf(1, -1) + 0.8, x: GX - 100, y: -545, r0: 50, r1: 130, inspeccion: false });
E.destello(w(1, 20), 0.15);

// ---------- 1 · el IVA, apártalo el mismo día que cobres ----------
// 2: El(0) primero,(1) el(2) IVA:(3) apártalo(4) el(5) mismo(6) día(7) que(8) cobres.(9)
// 3: Ese(0) veintiuno(1) por(2) ciento(3) que(4) añades(5) a(6) la(7) factura(8) lo(9) cobras(10) tú,(11) pero(12) es(13) de(14) Hacienda.(15)
// 4: Si(0) te(1) lo(2) gastas,(3) al(4) presentar(5) el(6) trimestre(7) te(8) toca(9) ponerlo(10) de(11) tu(12) bolsillo.(13)
E.numero(1, N[0].T, N[0].S, { desde: 's1', hacia: 'tarroIVA' });
const P1 = -80, T1 = 250;
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -370, cara: true,
  poses: [[0, 'de_pie'], [w(2, 4), 'meter'], [w(2, 9), 'senalar'], [w(3, 9), 'ofrecer'], [w(3, 12), 'encoger'], [w(4, 0), 'de_pie'], [w(4, 4), 'pensar'], [w(4, 9), 'manos_cabeza'], [wf(4, -1) + 0.2, 'celebrar']],
  sonrisa: [[w(2, 4), 0.6], [w(3, 9), 0.8], [w(3, 12), -0.3], [w(4, 9), -1.2], [wf(4, -1) + 0.2, 1.4]] });
E.obj('pila1', 'pila', { t0: N[0].S - 0.1, t1: fin(1), x: P1, n: 10, w: 170, hh: 26,
  k: [[N[0].S, 0], [N[0].S + 0.5, 10, 'out'], [w(2, 4), 10], [wf(2, -1), 8.3, 'inout'], [w(4, 9), 8.3], [wf(4, -1), 6.6, 'inout'], [wf(4, -1) + 0.3, 6.6], [wf(4, -1) + 0.7, 8.3, 'inout']],
  caja: [-85, -224, 170, 224], refl: true });
E.obj('cuenta1', 'contador', { t0: N[0].S, t1: fin(1), x: P1, y: -365, size: 46, col: 'txt', suf: ' €', pop: true,
  v: [[N[0].S, 0], [N[0].S + 0.5, 3630, 'out'], [w(2, 4), 3630], [wf(2, -1), 3000, 'inout'], [w(4, 9), 3000], [wf(4, -1), 2370, 'inout'], [wf(4, -1) + 0.3, 2370], [wf(4, -1) + 0.7, 3000, 'inout']],
  caja: [-120, -28, 240, 56] });
E.obj('rotCobro', 'rotulo', { t0: N[0].S, t1: fin(1), x: P1, y: -430, texto: 'LO QUE COBRAS', size: 24, col: '#9a9c9b', caja: [-110, -15, 220, 30] });
E.obj('tarroIVA', 'tarro', { t0: N[0].S - 0.1, t1: fin(1), x: T1, w: 200, h: 270, rotulo: 'IVA', sobrevive: true,
  nivel: [[w(2, 4), 0], [wf(2, -1) + 0.2, 0.6, 'inout'], [w(4, 0), 0.6], [w(4, 3), 0, 'inout'], [wf(4, -1) + 0.3, 0], [wf(4, -1) + 0.7, 0.6, 'inout']],
  apagado: [[w(4, 0), 0], [w(4, 1), 1], [wf(4, -1) + 0.3, 1], [wf(4, -1) + 0.6, 0]],
  tapa: [[w(3, 13), 0], [w(3, 15), 1, 'out'], [w(4, 0), 1], [w(4, 0) + 0.25, 0], [wf(4, -1) + 0.6, 0], [wf(4, -1) + 0.9, 1, 'out']],
  barrido: [wf(2, -1) + 0.2, wf(4, -1) + 0.8], caja: [-100, -270, 200, 270], refl: true });
E.obj('ivaC', 'contador', { t0: w(2, 4) - 0.1, t1: fin(1), x: T1, y: -365, size: 46, col: 'txt', suf: ' €', miles: false, pop: true,
  v: [[w(2, 4), 0], [wf(2, -1) + 0.2, 630, 'inout'], [w(4, 0), 630], [w(4, 3), 0, 'inout'], [wf(4, -1) + 0.3, 0], [wf(4, -1) + 0.7, 630, 'inout']], caja: [-100, -28, 200, 56] });
for (let i = 0; i < 5; i++) { const a = w(2, 4) + i * 0.24;
  E.obj('m1_' + i, 'moneda', { t0: a, t1: a + 0.8, entra: 0.06, sale: 0.15, r: 22, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, P1], [a + 0.75, T1, 'inout']], y: [[a, -235], [a + 0.38, -292], [a + 0.75, -150, 'in']] }); }
E.sfx(w(2, 4), 'fill');
E.obj('mismoDia', 'rotulo', { t0: w(2, 6) - 0.1, t1: w(3, 0), sale: 0.2, x: T1, y: -430, texto: 'EL MISMO DÍA', size: 26, col: '#e6ce46', pop: true, caja: [-100, -16, 200, 32] });
// «Ese veintiuno por ciento … es de Hacienda»: el 21 % rueda; la tapa se cierra con «Hacienda»
E.obj('pct21', 'contador', { t0: w(3, 0) - 0.1, t1: w(4, 0), sale: 0.2, x: T1, y: -505, v: [[w(3, 1), 0], [w(3, 3) + 0.15, 21, 'out']], suf: ' %', size: 56, col: '#e6ce46', miles: false, pop: true,
  caja: [-80, -34, 160, 68] });
E.obj('hacienda', 'rotulo', { t0: w(3, 12), t1: w(4, 0), sale: 0.2, x: T1, y: -430, texto: 'DE HACIENDA', size: 26, col: '#e4574f', pop: true, caja: [-100, -16, 200, 32] });
E.obj('flecha1', 'flecha', { t0: w(3, 9) - 0.1, t1: w(3, 12), sale: 0.15, de: [P1 + 70, -470], hasta: [T1 - 90, -470], curva: -0.2, discontinua: true, p: [[w(3, 9), 0], [w(3, 11) + 0.2, 1, 'out']], inspeccion: false });
E.golpe(w(3, 15), 0.04);
// «Si te lo gastas … de tu bolsillo»: el tarro se vacía y se apaga, pasa el trimestre y los 630 € salen del montón
E.obj('trim', 'dias', { t0: w(4, 4) - 0.15, t1: fin(1), x: T1, y: -505, letras: ['ENE', 'FEB', 'MAR'], gap: 100, pop: true,
  luz: [[w(4, 4), -1], [w(4, 7) + 0.2, 2, 'inout']], caja: [-150, -32, 300, 64] });
E.obj('bolsillo', 'contador', { t0: w(4, 9) - 0.05, t1: wf(4, -1) + 0.3, sale: 0.2, x: P1, y: -505, v: [[w(4, 9), 0], [w(4, 11), 630, 'out']], pre: '−', suf: ' €', size: 50, col: '#e4574f', miles: false, pop: true,
  caja: [-110, -30, 220, 60] });
E.temblor(w(4, 12), 12, 0.4);
E.obj('ch1', 'chispas', { t0: wf(4, -1) + 0.7, t1: wf(4, -1) + 1.5, x: T1, y: -150, r0: 120, r1: 220, inspeccion: false });
E.sfx(wf(4, -1) + 0.3, 'fill');

// ---------- 2 · los gastos fijos ----------
// 5: El(0) segundo:(1) los(2) gastos(3) fijos.(4)
// 6: Cuota(0) de(1) autónomos,(2) alquiler,(3) gestoría.(4) Pongamos(5) que(6) suman(7) seiscientos(8) euros.(9) De(10) los(11) tres(12) mil(13) sin(14) IVA,(15) te(16) quedan(17) dos(18) mil(19) cuatrocientos(20) de(21) beneficio.(22)
E.numero(2, N[1].T, N[1].S, { desde: 'tarroIVA', hacia: 'tarroG' });
const P2 = -110, T2 = 250;
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -370, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'senalar'], [w(6, 0), 'ofrecer'], [w(6, 5), 'pensar'], [w(6, 10), 'senalar'], [w(6, 21), 'celebrar']],
  sonrisa: [[w(5, 2), 0.3], [w(6, 5), 0], [w(6, 21), 1.4]] });
E.obj('pila2', 'pila', { t0: N[1].S - 0.1, t1: fin(2), x: P2, n: 10, w: 170, hh: 26,
  k: [[N[1].S, 0], [N[1].S + 0.6, 10, 'out'], [w(6, 0), 10], [w(6, 9), 8, 'inout']], caja: [-85, -224, 170, 224], refl: true });
E.obj('cuenta2', 'contador', { t0: N[1].S, t1: fin(2), x: P2, y: -365, size: 46, col: 'txt', suf: ' €', pop: true, sobrevive: true, r: 60,
  v: [[N[1].S, 0], [N[1].S + 0.6, 3000, 'out'], [w(6, 12), 3000], [w(6, 20) + 0.2, 2400, 'inout']], barrido: [w(6, 22)], caja: [-120, -28, 240, 56] });
E.obj('rotSin', 'rotulo', { t0: N[1].S, t1: fin(2), x: P2, y: -430, texto: [[0, 'SIN IVA'], [w(6, 21), 'BENEFICIO']], size: 24, col: '#9a9c9b', caja: [-90, -15, 180, 30] });
E.obj('tarroG', 'tarro', { t0: N[1].S - 0.1, t1: fin(2), x: T2, w: 200, h: 270, rotulo: 'GASTOS', pop: true,
  nivel: [[w(6, 0), 0], [w(6, 9) + 0.2, 0.55, 'inout']], tapa: [[w(6, 9) + 0.3, 0], [w(6, 9) + 0.6, 1, 'out']], barrido: [w(6, 9) + 0.3], caja: [-100, -270, 200, 270], refl: true });
E.obj('gastoC', 'contador', { t0: w(6, 0) - 0.1, t1: fin(2), x: T2, y: -365, size: 46, col: 'txt', suf: ' €', miles: false, pop: true,
  v: [[w(6, 0), 0], [w(6, 9) + 0.2, 600, 'inout']], caja: [-100, -28, 200, 56] });
// «Cuota de autónomos, alquiler, gestoría»: tres rótulos en cascada, cada uno con su moneda que vuela al tarro
[['CUOTA', w(6, 0), -170], ['ALQUILER', w(6, 3), 40], ['GESTORÍA', w(6, 4), 250]].forEach(([s, a], i, arr) => {
  const x = arr[i][2];
  E.obj('tipo' + i, 'rotulo', { t0: a - 0.1, t1: w(6, 10), sale: 0.2, x, y: -505, texto: s, size: 28, col: '#e6ce46', pop: true, caja: [-80, -16, 160, 32] });
  for (let j = 0; j < 2; j++) { const b = a + j * 0.25;
    E.obj('m2_' + i + '_' + j, 'moneda', { t0: b, t1: b + 0.8, entra: 0.06, sale: 0.15, r: 22, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
      x: [[b, P2], [b + 0.75, T2, 'inout']], y: [[b, -235], [b + 0.38, -292], [b + 0.75, -150, 'in']] }); }
});
E.sfx(w(6, 0), 'fill'); E.golpe(w(6, 9) + 0.6, 0.04);
E.obj('ch2', 'chispas', { t0: w(6, 22), t1: w(6, 22) + 0.8, x: P2, y: -365, r0: 90, r1: 200, inspeccion: false });
E.destello(w(6, 22), 0.12);

// ---------- 3 · el IRPF y la cuenta final ----------
// 7: El(0) tercero:(1) aparta(2) un(3) veinte(4) por(5) ciento(6) de(7) ese(8) beneficio(9) para(10) el(11) IRPF.(12)
// 8: De(0) todo(1) lo(2) que(3) has(4) cobrado,(5) lo(6) tuyo(7) son(8) unos(9) 1.900(10) euros.(11)
E.numero(3, N[2].T, N[2].S, { desde: 'cuenta2', hacia: 'benef3' });
const P3 = -60, T3 = 260;
E.figura('yo3', { t0: N[2].S - 0.1, t1: TC, x: -375, cara: true,
  poses: [[0, 'de_pie'], [w(7, 2), 'meter'], [w(7, 9), 'senalar'], [w(8, 0), 'de_pie'], [w(8, 6), 'senalar'], [wf(8, -1), 'celebrar']],
  sonrisa: [[w(7, 2), 0.5], [w(8, 0), 0], [wf(8, -1), 1.5]] });
E.obj('pila3', 'pila', { t0: N[2].S - 0.1, t1: w(8, 0), sale: 0.2, x: P3, n: 8, w: 170, hh: 26,
  k: [[N[2].S, 0], [N[2].S + 0.5, 8, 'out'], [w(7, 9), 8], [wf(7, -1), 6.4, 'inout']], caja: [-85, -180, 170, 180], refl: true });
E.obj('benef3', 'etiqueta', { t0: N[2].S - 0.1, t1: w(8, 0), sale: 0.2, x: P3 + 10, y: -375, w: 280, h: 100,
  v: [[N[2].S, 2400], [w(7, 9), 2400], [wf(7, -1), 1920, 'inout']], caja: [-150, -50, 300, 100] });
E.obj('rotBen', 'rotulo', { t0: N[2].S, t1: w(8, 0), sale: 0.2, x: P3 + 10, y: -460, texto: 'BENEFICIO', size: 24, col: '#9a9c9b', caja: [-80, -15, 160, 30] });
E.obj('tarroR', 'tarro', { t0: N[2].S + 0.1, t1: w(8, 0), sale: 0.2, x: T3, w: 200, h: 270, rotulo: 'IRPF', pop: true,
  nivel: [[w(7, 9), 0], [wf(7, -1) + 0.2, 0.5, 'inout']], barrido: [wf(7, -1) + 0.2], caja: [-100, -270, 200, 270], refl: true });
E.obj('pct20', 'contador', { t0: w(7, 3) - 0.1, t1: w(8, 0), sale: 0.2, x: T3, y: -505, v: [[w(7, 4), 0], [w(7, 6) + 0.15, 20, 'out']], suf: ' %', size: 56, col: '#e6ce46', miles: false, pop: true,
  caja: [-80, -34, 160, 68] });
E.obj('irpfC', 'contador', { t0: w(7, 9) - 0.1, t1: w(8, 0), sale: 0.2, x: T3, y: -365, size: 46, col: 'txt', suf: ' €', miles: false, pop: true,
  v: [[w(7, 9), 0], [wf(7, -1) + 0.2, 480, 'inout']], caja: [-100, -28, 200, 56] });
for (let i = 0; i < 4; i++) { const a = w(7, 9) + i * 0.22;
  E.obj('m3_' + i, 'moneda', { t0: a, t1: a + 0.8, entra: 0.06, sale: 0.15, r: 22, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, P3], [a + 0.75, T3, 'inout']], y: [[a, -200], [a + 0.38, -285], [a + 0.75, -150, 'in']] }); }
E.sfx(w(7, 9), 'fill');
// «De todo lo que has cobrado, lo tuyo son unos 1.900 euros»: los tres sobres se llenan y LO TUYO baja de 3.630 a 1.920
const J = [[-80, 'IVA', 630, w(8, 1)], [120, 'GASTOS', 600, w(8, 4)], [320, 'IRPF', 480, w(8, 7)]];
const LX = 120, LY = -470;
E.obj('rotTuyo', 'rotulo', { t0: w(8, 0), t1: TC, x: LX, y: -560, texto: [[0, 'LO QUE COBRAS'], [w(8, 6), 'LO TUYO']], size: 26, col: '#e6ce46', pop: true, caja: [-120, -16, 240, 32] });
E.obj('tuyo', 'contador', { t0: w(8, 0), t1: TC, x: LX, y: LY, size: 80, col: 'txt', suf: ' €', pop: true,
  v: [[w(8, 1), 3630], [w(8, 3), 3000, 'inout'], [w(8, 4), 3000], [w(8, 6), 2400, 'inout'], [w(8, 7), 2400], [w(8, 10), 1920, 'inout']], barrido: [wf(8, -1)], caja: [-200, -48, 400, 96] });
J.forEach(([x, rot, eur, a], i) => {
  E.obj('sob' + i, 'tarro', { t0: w(8, 0) + i * 0.1, t1: TC, x, w: 160, h: 210, rotulo: rot, pop: true, nivel: [[a, 0], [a + 0.7, 0.6, 'inout']], caja: [-80, -210, 160, 210], refl: true });
  E.obj('eur' + i, 'rotulo', { t0: a, t1: TC, x, y: -260, texto: '−' + eur + ' €', size: 26, col: '#e4574f', pop: true, caja: [-70, -16, 140, 32] });
  for (let j = 0; j < 2; j++) { const b = a + j * 0.2;
    E.obj('m4_' + i + '_' + j, 'moneda', { t0: b, t1: b + 0.7, entra: 0.06, sale: 0.15, r: 20, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
      x: [[b, LX], [b + 0.65, x, 'inout']], y: [[b, LY + 40], [b + 0.32, -380], [b + 0.65, -140, 'in']] }); }
  E.sfx(a, 'fill');
});
E.obj('rayos3', 'rayos', { t0: w(8, 9), t1: TC, x: LX, y: LY, r: 330, z: -2, p: [[w(8, 9), 0], [wf(8, -1), 1, 'out']], inspeccion: false });
E.obj('ch3', 'chispas', { t0: wf(8, -1), t1: wf(8, -1) + 0.8, x: LX, y: LY, r0: 150, r1: 260, inspeccion: false });
E.golpe(wf(8, -1), 0.05); E.destello(wf(8, -1), 0.15);

// ---------- cierre: resumen y envío ----------
// 9: Facturar(0) mucho(1) no(2) es(3) ganar(4) mucho:(5) lo(6) que(7) ganas(8) es(9) lo(10) que(11) sobra(12) después(13) de(14) los(15) tres(16) sobres.(17)
// 10: Mándaselo(0) a(1) ese(2) amigo(3) autónomo(4) que(5) cree(6) que(7) gana(8) lo(9) que(10) factura.(11)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(9, 8), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, items: ['IVA', 'Gastos', 'IRPF'], gap: 230,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(9, 12)], caja: [-360, -60, 720, 200] });
E.obj('confC', 'confeti', { t0: wf(9, -1), t1: wf(9, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(9, -1), 0.22); E.golpe(wf(9, -1), 0.04);
E.figura('yoF', { t0: w(10, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(10, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(10, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(10, 11)], vuelo: [[wf(10, -1), 0], [wf(10, -1) + 0.5, 1, 'in']] });
