// L1 · Cuatro reglas para que tu sueldo dure todo el mes (estilo B, molde de B-R3 + cierre de B-R1/B-R3)
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'degradado', sub: 'dos', subY: 680, polvo: true, gancho: { lineas: [0], escala: 1.25 }, progreso: { n: 4, estilo: 'barras', aparece: w(1, 0), gap: 70 } });

// tiempos de las transiciones de número: T = «Número», S = la escena nueva entra con el nombre del punto
const T1 = w(2, 0) - 0.05, S1 = w(2, 2) - 0.12;
const T2 = w(5, 0) - 0.05, S2 = w(5, 2) - 0.12;
const T3 = w(9, 0) - 0.05, S3 = w(9, 2) - 0.12;
const T4 = w(13, 0) - 0.05, S4 = w(13, 3) - 0.12; // «Y la cuarta:» son tres palabras
const TC = w(16, 0) - 0.1; // cierre

// cámara: plano lateral fijo con acercamientos lentos; se recoloca a oscuras en cada número
E.camara([
  [0, [0, -380, 1]], [T1, [0, -395, 1.06]],
  [S1 - 0.05, [0, -380, 1], 'lin'], [T2, [-20, -390, 1.05]],
  [S2 - 0.05, [0, -370, 1], 'lin'], [T3, [0, -380, 1.05]],
  [S3 - 0.05, [0, -380, 1], 'lin'], [w(12, 0), [-30, -400, 1.07]], [T4, [-30, -400, 1.07]],
  [S4 - 0.05, [0, -380, 1], 'lin'], [TC, [0, -395, 1.05]],
]);

// ---------- gancho visual (REDACCION §2c): fotograma 0 lleno; la nómina se va volando hasta «0 €»; las cuatro reglas la rellenan ----------
// palabras: Cobras(0) la(1) nómina(2) y(3) a(4) los(5) veinte(6) días(7) no(8) te(9) queda(10) ni(11) un(12) euro(13)
E.figura('yo', { t0: 0, t1: T1 + 0.45, x: -190, cara: true, toca: ['pila'],
  poses: [[0, 'celebrar'], [w(0, 4), 'de_pie'], [w(0, 8), 'triste'], [w(1, 8), 'de_pie'], [wf(1, -1), 'celebrar']],
  sonrisa: [[0, 1.3], [w(0, 4), 0.2], [w(0, 9), -0.9], [w(1, 8), -0.9], [wf(1, -1), 1.4]] });
E.obj('rayosH', 'rayos', { t0: 0, t1: T1 + 0.3, x: 150, y: -140, r: 360, z: -2, p: [[0, 0.9], [w(0, 4), 0.9], [w(0, 7), 0], [w(1, 8), 0], [wf(1, -1) + 0.3, 1, 'out']], inspeccion: false });
E.obj('rotNom', 'rotulo', { t0: 0, t1: w(0, 8), x: 150, y: -290, texto: 'NÓMINA', size: 30, col: '#c9ccca', caja: [-80, -16, 160, 32] });
E.obj('pila', 'pila', { t0: 0, t1: T1 + 0.45, x: 150, n: 9, w: 190, hh: 30, barrido: [w(0, 2) - 0.1, wf(1, -1) + 0.2],
  k: [[0, 9], [w(0, 4), 9], [w(0, 7) + 0.2, 0, 'in'], [w(1, 8), 0], [wf(1, -1) + 0.3, 9, 'out']], caja: [-95, -250, 190, 250], refl: true });
for (let i = 0; i < 6; i++) { const a = w(0, 4) + i * 0.16; // las monedas salen volando, con estela
  E.obj('vuela' + i, 'moneda', { t0: a, t1: a + 0.8, entra: 0.05, sale: 0.2, r: 26, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, 150], [a + 0.8, 520 + i * 40, 'in']], y: [[a, -230 + i * 12], [a + 0.35, -520 - (i % 3) * 30, 'out'], [a + 0.8, -300, 'in']] }); }
E.obj('diaH', 'contador', { t0: 0, t1: w(0, 9), x: 150, y: -365, v: [[0, 1], [w(0, 4), 1], [w(0, 7) + 0.1, 20, 'inout']], pre: 'día', size: 64, col: 'txt', miles: false,
  luz: [[w(0, 7), 1], [w(0, 9), 0.2]], caja: [-120, -38, 240, 76] });
E.obj('ceroH', 'contador', { t0: w(0, 11), t1: w(1, 0) + 0.3, x: 150, y: -180, v: 0, suf: ' €', size: 110, col: '#e4574f', miles: false, pop: true, caja: [-120, -60, 240, 120] });
E.temblor(w(0, 11), 18, 0.5); E.golpe(w(0, 11), 0.05);
// «Cuatro reglas»: cuatro monedas numeradas entran en fila sobre la pila
[0, 1, 2, 3].forEach(i => { const a = w(1, 0) + i * 0.12; E.obj('regla' + i, 'moneda', { t0: a, t1: T1 - 0.05, sale: 0.2, x: 150 + (i - 1.5) * 92, y: -430, r: 34, n: i + 1, pop: true, sfx: i === 0, inspeccion: false }); });
E.obj('anilloH', 'anillo', { t0: w(1, 8) - 0.1, t1: T1 + 0.45, x: -20, y: -250, rx: 360, ry: 285, p: [[w(1, 8) - 0.1, 0], [wf(1, -1) + 0.3, 1, 'out']], rodea: true });
E.obj('confH', 'confeti', { t0: wf(1, -1) + 0.25, t1: wf(1, -1) + 2.2, x: 150, y: -260, dur: 1.9, n: 50, capa: 'mundo', inspeccion: false });
E.destello(wf(1, -1) + 0.25, 0.28); E.golpe(wf(1, -1) + 0.25, 0.05);

// ---------- 1 · ahorra nada más cobrar ----------
// 3: El(0) mismo(1) día(2) que(3) cobras(4) pasa(5) el(6) diez(7) por(8) ciento(9) a(10) otra(11) cuenta(12) antes(13) de(14) pagar(15) nada(16)
// 4: Y(0) lo(1) que(2) no(3) ves(4) no(5) te(6) lo(7) gastas(8)
E.numero(1, T1, S1, { hacia: 'pila1' });
E.figura('yo1', { t0: S1 - 0.1, t1: T2 + 0.45, x: -40, cara: true, toca: ['pila1', 'tarro', 'm1', 'm2', 'm3'],
  poses: [[0, 'de_pie'], [w(3, 5), 'coger'], [w(3, 7), { lean: 10, hf: 6, kf: 6, hb: -8, kb: 6, sf: -40, ef: 10, sb: -20, eb: 10, cab: 2 }, 0.45], [w(3, 11), 'meter'], [w(4, 0), 'de_pie'], [w(4, 5), 'senalar']],
  sonrisa: [[w(4, 5), 0.3], [wf(4, -1), 1.4]] });
E.obj('pila1', 'pila', { t0: S1 - 0.1, t1: T2 + 0.45, x: 200, n: 9, w: 190, hh: 30, k: [[S1, 0], [S1 + 0.9, 9, 'out'], [w(3, 6), 9], [w(3, 12), 8]], barrido: [S1 + 0.9], caja: [-95, -250, 190, 250], refl: true, sobrevive: true, r: 70, oy: -110 });
E.obj('tarro', 'tarro', { t0: w(3, 10) - 0.2, t1: T2 + 0.45, x: -330, pop: true, rotulo: 'AHORRO', nivel: [[w(3, 11), 0], [w(3, 15), 0.45]], tapa: [[w(4, 2), 0], [w(4, 4), 1, 'out']], luz: [[w(4, 3), 1], [w(4, 5), 0.35], [w(4, 8), 0.35], [wf(4, -1), 1]],
  barrido: [wf(4, -1) - 0.1], w: 200, h: 270, caja: [-100, -270, 200, 270], refl: true });
E.obj('pct', 'contador', { t0: w(3, 7) - 0.1, t1: w(4, 3), x: -330, y: -330, v: [[w(3, 7), 0], [w(3, 9) + 0.2, 10, 'out']], suf: ' %', size: 58, col: 'txt', miles: false, pop: true, caja: [-95, -34, 190, 68] });
[0, 1, 2].forEach(i => { const a = w(3, 11) + i * 0.24; E.obj('m' + (i + 1), 'moneda', { t0: a, t1: a + 0.95, entra: 0.1, sale: 0.15, r: 22, n: '', libre: true, estela: 5, x: [[a, 200], [a + 0.9, -330, 'inout']], y: [[a, -210 + i * 22], [a + 0.45, -470], [a + 0.9, -170, 'in']], sfx: false, inspeccion: false }); });
E.obj('ch1', 'chispas', { t0: wf(4, -1) - 0.1, t1: wf(4, -1) + 0.7, x: -330, y: -150, r0: 120, r1: 220, inspeccion: false });

// ---------- 2 · lo que queda, en dos cuentas ----------
// 5: lo(2) que(3) te(4) quede(5) repártelo(6) en(7) dos(8) cuentas(9) · 6: Una(0) para(1) los(2) gastos(3) fijos(4) otra(5) para(6) los(7) caprichos(8)
// 7: Cuando(0) la(1) de(2) caprichos(3) se(4) queda(5) vacía(6) se(7) acabó(8) · 8: Hasta(0) el(1) mes(2) que(3) viene(4)
E.numero(2, T2, S2, { desde: 'pila1', hacia: 'fijos' });
E.figura('yo2', { t0: S2 - 0.1, t1: T3 + 0.45, x: -350, cara: true,
  poses: [[0, 'de_pie'], [w(5, 6), 'ofrecer'], [w(6, 0), 'senalar'], [w(6, 5), 'ofrecer'], [w(7, 0), 'pensar'], [w(7, 7), 'encoger'], [w(8, 0), 'de_pie'], [w(8, 2), 'senalar']],
  sonrisa: [[w(7, 5), 1], [w(7, 7), -0.6], [w(8, 2), -0.2]] });
E.obj('fijos', 'tarro', { t0: S2 - 0.1, t1: T3 + 0.45, x: -20, rotulo: 'FIJOS', nivel: [[w(6, 1), 0], [w(6, 4), 0.6]], barrido: [w(6, 4)], w: 200, h: 270, caja: [-100, -270, 200, 270], refl: true, sobrevive: true, r: 80, oy: -110 });
E.obj('capr', 'tarro', { t0: w(5, 8) - 0.15, t1: T3 + 0.45, x: 250, pop: true, rotulo: 'CAPRICHOS', nivel: [[w(6, 5), 0], [w(6, 8), 0.5], [w(7, 1), 0.5], [w(7, 6), 0, 'in']], apagado: [[w(7, 7), 0], [w(7, 8) + 0.2, 1]], w: 200, h: 270, caja: [-100, -270, 200, 270], refl: true });
[0, 1, 2, 3].forEach(i => { const a = w(5, 6) + i * 0.18, to = i % 2 ? 250 : -20; E.obj('rep' + i, 'moneda', { t0: a, t1: a + 0.8, entra: 0.05, sale: 0.15, r: 22, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
  x: [[a, 115], [a + 0.75, to, 'inout']], y: [[a, -330], [a + 0.35, -460], [a + 0.75, -200, 'in']] }); });
E.obj('cero2', 'contador', { t0: w(7, 6), t1: w(8, 0), x: 250, y: -330, v: 0, suf: ' €', size: 64, col: '#e4574f', miles: false, pop: true, caja: [-80, -36, 160, 72] });
E.temblor(w(7, 8), 10, 0.4);
E.obj('mes2', 'contador', { t0: w(8, 0), t1: T3 + 0.45, x: 250, y: -330, v: [[w(8, 0), 20], [wf(8, -1), 28, 'inout']], pre: 'día', size: 54, col: 'txt', miles: false, pop: true, caja: [-110, -32, 220, 64] });

// ---------- 3 · antes de un capricho, espera dos días ----------
// 9: antes(2) de(3) darte(4) un(5) capricho(6) espera(7) dos(8) días(9) · 10: ¿Que(0) has(1) visto(2) algo(3) que(4) te(5) encanta(6) Déjalo(7) en(8) la(9) cesta(10)
// 11: En(0) ese(1) momento(2) te(3) convences(4) de(5) lo(6) que(7) sea(8) [nube «Me lo he ganado»] · 12: A(0) los(1) dos(2) días(3) ya(4) no(5) lo(6) ves(7) tan(8) claro(9)
E.numero(3, T3, S3, { desde: 'fijos', hacia: 'compra' });
E.figura('yo3', { t0: S3 - 0.1, t1: T4 + 0.45, x: -250, cara: true, toca: ['compra'],
  poses: [[0, 'de_pie'], [w(10, 2), 'senalar'], [w(10, 7), 'de_pie'], [w(11, 0), 'pensar'], [w(11, 4), 'celebrar'], [w(12, 0), 'de_pie'], [w(12, 4), 'encoger'], [wf(12, -1), 'de_pie']],
  sonrisa: [[w(10, 2), 0.6], [w(10, 6), 1.4], [w(11, 4), 1.4], [w(12, 4), 0.2], [w(12, 7), -0.4]] });
E.obj('rayos3', 'rayos', { t0: w(10, 2), t1: w(10, 8), x: 220, y: -330, r: 300, z: -2, p: [[w(10, 2), 0], [w(10, 5), 1], [w(10, 7), 1], [w(10, 8), 0]], inspeccion: false });
E.obj('compra', 'compra', { t0: S3 - 0.1, t1: T4 + 0.1, x: 220, y: -330, w: 300, h: 380, caja: [-150, -190, 300, 380], barrido: [w(10, 6) - 0.2],
  boton: [[0, 'COMPRAR'], [w(10, 8), 'EN ESPERA']], espera: [[w(10, 7), 0], [w(10, 9), 1]], luz: [[w(12, 4), 1], [w(12, 7), 0.55]] });
E.golpe(w(10, 7), 0.035);
E.obj('nube', 'bocadillo', { t0: w(11, 0) - 0.05, t1: T4 + 0.45, x: -110, y: -562, w: 300, h: 80, texto: 'Me lo he ganado', size: 30, pop: true, on: [[w(11, 4), 0], [w(11, 5), 1], [w(12, 4), 1], [w(12, 7), 0]],
  luz: [[w(12, 4), 1], [w(12, 8), 0.45]], sobrevive: true, r: 50, caja: [-150, -40, 300, 106] });
E.obj('dias3', 'contador', { t0: w(12, 0), t1: T4 - 0.05, x: 220, y: -85, v: [[w(12, 0), 0], [w(12, 3), 2, 'out']], suf: ' días', size: 48, col: 'txt', miles: false, pop: true, caja: [-100, -30, 200, 60] });

// ---------- 4 · repasa los gastos todos los domingos ----------
// 13: Y(0) la(1) cuarta(2) repasa(3) los(4) gastos(5) todos(6) los(7) domingos(8) · 14: Cinco(0) minutos(1) y(2) sin(3) agobios(4)
// 15: Así(0) te(1) das(2) cuenta(3) el(4) día(5) diez(6) de(7) que(8) vas(9) justo(10) y(11) no(12) el(13) veinte(14)
E.numero(4, T4, S4, { desde: 'nube', hacia: 'dias' });
E.figura('yo4', { t0: S4 - 0.1, t1: TC, x: -270, cara: true, toca: ['mesa'], poses: [[0, 'escribir']] });
E.obj('mesa', 'escritorio', { t0: S4 - 0.1, t1: TC, x: 40, silla: true, brillo: [[w(15, 3), 0], [w(15, 10), 1]], caja: [-330, -400, 500, 400], refl: true, inspeccion: false });
E.obj('dias', 'dias', { t0: S4 - 0.1, t1: w(14, 0), x: 0, y: -470, luz: [[w(13, 6), -1], [w(13, 8), 6]], caja: [-322, -32, 644, 64], r: 30 });
E.obj('reloj5', 'temporizador', { t0: w(14, 0), t1: w(15, 0) + 0.3, x: 0, y: -470, r: 52, texto: '5', sub: 'MIN', pop: true, p: [[w(14, 0) + 0.3, 0], [wf(14, -1), 1]], hecho: [[wf(14, -1), 0], [wf(14, -1) + 0.3, 1]], barrido: [wf(14, -1)] });
E.obj('ch4', 'chispas', { t0: wf(14, -1), t1: wf(14, -1) + 0.8, x: 0, y: -470, r0: 60, r1: 140, inspeccion: false });
E.obj('dia10', 'contador', { t0: w(15, 4), t1: TC, x: 220, y: -470, v: [[w(15, 4), 1], [w(15, 6) + 0.2, 10, 'out']], pre: 'día', size: 54, col: 'txt', miles: false, pop: true, caja: [-110, -32, 220, 64] });
E.obj('rayos4', 'rayos', { t0: w(15, 9), t1: TC, x: 40, y: -330, r: 300, z: -2, p: [[w(15, 9), 0], [w(15, 11), 0.8]], inspeccion: false });
E.golpe(w(15, 10), 0.04);

// ---------- cierre: resumen (vuelve al gancho) y envío ----------
// 16: El(0) sueldo(1) no(2) da(3) más(4) de(5) sí(6) hay(7) que(8) repartirlo(9) antes(10) de(11) gastarlo(12) Mándaselo(13) a(14) ese(15) amigo(16) …
E.obj('rayosC', 'rayos', { t0: w(16, 7), t1: w(16, 13), capa: 'pantalla', x: 540, y: 1010, r: 460, z: -2, sinDim: true, p: [[w(16, 7), 0], [w(16, 9), 1], [w(16, 12), 1], [w(16, 13), 0]], inspeccion: false });
E.obj('resumen', 'resumen', { t0: TC, t1: w(16, 13), capa: 'pantalla', x: 540, y: 960, items: ['Ahorra', 'Separa', 'Espera', 'Repasa'], gap: 200,
  p: [[TC, 0], [TC + 0.9, 4, 'lin']], caja: [-400, -60, 800, 300] });
E.obj('confC', 'confeti', { t0: wf(16, 12) - 0.1, t1: wf(16, 12) + 1.9, capa: 'pantalla', x: 540, y: 1000, dur: 1.9, n: 56, inspeccion: false, sinDim: true });
E.destello(wf(16, 12) - 0.1, 0.3); E.golpe(wf(16, 12) - 0.1, 0.04);
E.figura('yo5', { t0: w(16, 13), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(16, 14), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(16, 14), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(16, 20)], vuelo: [[wf(16, -1), 0], [wf(16, -1) + 0.5, 1, 'in']] });
