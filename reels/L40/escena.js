// L40 · La regla del 4 % (estilo B; reglas 15, 20, 21, 24)
// Gancho visual: la etiqueta «para dejar de trabajar» rueda hasta 1.000.000 € y se apaga; entra la cuenta exacta (× 25)
// y la moneda «4 %». Punto 1: los doce meses se recorren y 1.700 € al mes llenan el tarro del año (≈ 20.000 €).
// Punto 2: «× 25» enciende veinticinco casillas (una por año de gastos) mientras la meta suma hasta 500.000 €.
// Punto 3: el tarro INVERTIDO con 500.000 €; se saca el 4 % (20.000 € al año), el resto rinde y la barra de treinta años se llena.
// Regla 20: «Nunca podré dejar de trabajar.» va en bocadillo del muñeco del gancho; la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.0 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(1, 11), gap: 70, y: 360 } });

// «El primero: // …» → T en «El», S en la primera palabra del punto
const N = [3, 5, 7].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TG = w(9, 0) - 0.1;   // matiz: orientativa, no garantía
const TC = w(10, 0) - 0.1;  // resumen
const TE = w(11, 0) - 0.1;  // envío
const ROJO = '#e4574f', GRIS = '#9a9c9b';

E.camara([
  [0, [0, -380, 1.04]], [w(0, 3), [20, -385, 1.07]], [w(0, 10), [0, -380, 1.02]], [w(0, 15), [-15, -385, 1.04]], [w(1, 0), [10, -390, 1.06]],
  [w(1, 6), [0, -385, 1.03]], [w(2, 0), [-10, -385, 1.05]], [N[0].T, [0, -390, 1.05]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [-15, -385, 1.04]], [w(4, 7), [15, -385, 1.03]], [w(4, 13), [0, -390, 1.06]], [N[1].T, [0, -390, 1.05]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 0), [-15, -385, 1.04]], [w(6, 5), [10, -385, 1.06]], [w(6, 9), [0, -385, 1.03]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(8, 0), [-15, -385, 1.04]], [w(8, 10), [10, -385, 1.03]], [w(8, 16), [-10, -385, 1.05]], [w(8, 24), [0, -390, 1.06]],
  [TG, [0, -390, 1.05]], [TG + 0.05, [0, -370, 0.98], 'lin'], [w(9, 7), [10, -380, 1.03]], [TC - 0.1, [0, -385, 1.04]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: No(0) necesitas(1) un(2) millón(3) de(4) euros(5) para(6) dejar(7) de(8) trabajar(9) necesitas(10) veinticinco(11) veces(12) lo(13) que(14) gastas(15) en(16) un(17) año(18)   [bocadillo «Nunca podré dejar de trabajar.»]
// 1: Se(0) llama(1) regla(2) del(3) 4(4) %(5) y(6) es(7) una(8) cuenta(9) de(10) tres(11) pasos(12)
// 2: Se(0) hace(1) así(2)
E.figura('yo', { t0: 0, t1: fin(0), x: -340, cara: true,
  poses: [[0, 'pensar'], [w(0, 3), 'encoger'], [w(0, 6), 'manos_cabeza'], [w(0, 10), 'de_pie'], [w(0, 11), 'senalar'], [w(0, 16), 'de_pie'],
    [w(1, 2), 'celebrar'], [w(1, 6), 'de_pie'], [w(1, 11), 'ofrecer'], [w(2, 0), 'de_pie'], [w(2, 1), 'ofrecer']],
  sonrisa: [[0, -0.3], [w(0, 3), -0.8], [w(0, 6), -1.3], [w(0, 10), -0.2], [w(0, 11), 0.4], [w(1, 2), 1.5], [w(1, 11), 1]] });
E.obj('bocaH', 'bocadillo', { t0: 0.35, t1: w(0, 10) - 0.15, sale: 0.2, x: -40, y: -490, w: 440, h: 80, texto: 'Nunca podré dejar de trabajar.', size: 25, pop: true,
  on: [[0.35, 0], [0.9, 1]], caja: [-220, -40, 440, 106] });
E.obj('rotMeta0', 'rotulo', { t0: w(0, 6) - 0.05, t1: w(0, 10) - 0.15, sale: 0.2, x: 150, y: -220, pop: true,
  texto: 'PARA DEJAR DE TRABAJAR', size: 24, col: GRIS, caja: [-190, -16, 380, 32] });
// el millón: rueda hasta 1.000.000 € con «un millón de euros» y se apaga con «necesitas veinticinco veces»
E.obj('millon', 'etiqueta', { t0: w(0, 1) + 0.1, t1: w(0, 10) - 0.15, sale: 0.25, x: 150, y: -330, w: 480, h: 120, r: 70, pop: true,
  v: [[w(0, 2), 0], [w(0, 5) + 0.1, 1000000, 'out']], on: [[0, 1], [w(0, 9), 1], [w(0, 10) - 0.2, 0.3]],
  s: [[0, 1], [w(0, 9), 1], [w(0, 10) - 0.2, 0.85, 'inout']], barrido: [w(0, 5) + 0.15], caja: [-240, -60, 480, 120] });
E.sfx(w(0, 2), 'fill');
E.golpe(w(0, 5) + 0.15, 0.04); E.temblor(w(0, 5) + 0.2, 12, 0.4);
// «necesitas veinticinco veces lo que gastas en un año»: × 25 rueda; debajo, lo que se multiplica
E.obj('x25h', 'contador', { t0: w(0, 10) + 0.1, t1: w(1, 2) - 0.1, sale: 0.2, x: 150, y: -390, pop: true, pre: '× ', size: 96, col: '#e6ce46', miles: false,
  v: [[w(0, 11), 0], [w(0, 12) + 0.2, 25, 'out']], barrido: [w(0, 12) + 0.25], caja: [-130, -56, 260, 112] });
E.obj('gastoH', 'rotulo', { t0: w(0, 13) - 0.05, t1: w(1, 0) + 0.2, sale: 0.2, x: 150, y: -270, pop: true, texto: 'LO QUE GASTAS EN UN AÑO', size: 26, col: '#c9ccca', caja: [-200, -16, 400, 32] });
for (let i = 0; i < 6; i++) { const a = w(0, 14) + i * 0.1;
  E.obj('gh' + i, 'moneda', { t0: a, t1: a + 0.6, entra: 0.05, sale: 0.15, r: 18, n: '', libre: true, estela: 4, sfx: i === 0, inspeccion: false,
    x: [[a, -40 + i * 40], [a + 0.55, 150, 'inout']], y: [[a, -150], [a + 0.3, -210], [a + 0.55, -390, 'in']] }); }
// «Se llama regla del 4 %»: la moneda del 4 % con rayos
E.obj('rayosH', 'rayos', { t0: w(1, 2) - 0.1, t1: fin(0), x: 150, y: -350, r: 300, z: -2, p: [[w(1, 2) - 0.1, 0], [w(1, 4) + 0.3, 1, 'out'], [w(1, 9), 1], [w(1, 11) + 0.3, 0.4]], inspeccion: false });
E.obj('m4', 'moneda', { t0: w(1, 3) - 0.05, t1: N[0].T + 0.3, sale: 0.2, x: 150, y: [[0, -350], [w(1, 10), -350], [w(1, 11) + 0.3, -430, 'inout']], r: [[0, 90], [w(1, 10), 90], [w(1, 11) + 0.3, 62, 'inout']],
  n: '4 %', pop: true, sfx: true, luz: [[0, 1], [w(1, 11), 1], [w(1, 11) + 0.3, 0.45]], barrido: [w(1, 5)], inspeccion: false });
E.obj('rotRegla', 'rotulo', { t0: w(1, 1), t1: w(1, 10), sale: 0.2, x: 150, y: -210, pop: true, texto: 'REGLA DEL 4 %', size: 34, col: '#e6ce46', peso: 700, caja: [-150, -20, 300, 40] });
E.golpe(w(1, 4), 0.05); E.destello(w(1, 4), 0.14);
E.obj('chH', 'chispas', { t0: w(1, 4), t1: w(1, 4) + 0.8, x: 150, y: -350, r0: 100, r1: 200, inspeccion: false });
// «una cuenta de tres pasos»: tres monedas; la primera crece y es la que viaja al número uno
[0, 1, 2].forEach(i => { const a = w(1, 11) + i * 0.12;
  E.obj('p' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: 150 + (i - 1) * 105, y: -250, r: 38, n: i + 1, pop: true, sfx: i === 0, inspeccion: false,
    s: i === 0 ? [[0, 1], [wf(2, -1) - 0.1, 1], [wf(2, -1) + 0.25, 1.35, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [wf(2, -1) - 0.1, 1], [wf(2, -1) + 0.2, 0.4]] }); });

// ---------- 1 · calcula lo que gastas en un año ----------
// 3: El(0) primero(1) calcula(2) lo(3) que(4) gastas(5) en(6) un(7) año(8)
// 4: No(0) lo(1) que(2) ganas(3) lo(4) que(5) gastas(6) Si(7) gastas(8) 1.700(9) euros(10) al(11) mes(12) son(13) unos(14) 20.000(15) al(16) año(17)
E.numero(1, N[0].T, N[0].S, { desde: 'p1', hacia: 'tarroA' });
const MX = 90;
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -365, cara: true,
  poses: [[0, 'de_pie'], [w(3, 2), 'escribir'], [wf(3, -1), 'de_pie'], [w(4, 0), 'encoger'], [w(4, 4), 'senalar'], [w(4, 7), 'de_pie'], [w(4, 9), 'ofrecer'], [w(4, 13), 'meter'], [wf(4, -1) - 0.1, 'celebrar']],
  sonrisa: [[w(3, 2), 0.4], [w(4, 0), -0.4], [w(4, 4), 0.6], [w(4, 9), 0.5], [wf(4, -1) - 0.1, 1.5]] });
// los doce meses, en dos filas, que se recorren al calcular y otra vez al sumar
const M1 = ['E', 'F', 'M', 'A', 'M', 'J'], M2 = ['J', 'A', 'S', 'O', 'N', 'D'];
const s1 = w(3, 2), s2 = w(4, 13) - 0.05;
E.obj('mesA', 'dias', { t0: N[0].S, t1: fin(1), x: MX, y: -490, letras: M1, gap: 66, pop: true,
  luz: [[s1, -1], [s1 + 0.9, 6, 'lin'], [s2, -1], [s2 + 0.6, 6, 'lin']], caja: [-195, -32, 390, 64] });
E.obj('mesB', 'dias', { t0: N[0].S + 0.12, t1: fin(1), x: MX, y: -415, letras: M2, gap: 66, pop: true,
  luz: [[s1 + 0.9, -1], [s1 + 1.8, 6, 'lin'], [s2 + 0.6, -1], [s2 + 1.2, 6, 'lin']], caja: [-195, -32, 390, 64] });
E.sfx(s1, 'whoosh');
E.obj('tarroA', 'tarro', { t0: N[0].S - 0.1, t1: fin(1), x: 300, w: 190, h: 230, rotulo: 'AÑO', pop: true, sobrevive: true,
  nivel: [[s2, 0], [s2 + 1.25, 1, 'inout']], barrido: [s2 + 1.3], caja: [-95, -230, 190, 230], refl: true });
// «No lo que ganas: lo que gastas»
E.obj('rotGanas', 'rotulo', { t0: w(4, 0) - 0.05, t1: w(4, 4), sale: 0.15, x: MX - 20, y: -335, pop: true, texto: 'LO QUE GANAS', size: 32, col: ROJO,
  s: [[0, 1], [w(4, 3), 1], [w(4, 4), 0.7, 'in']], caja: [-140, -18, 280, 36] });
E.obj('rotGastas', 'rotulo', { t0: w(4, 4), t1: w(4, 9) - 0.1, sale: 0.15, x: MX - 20, y: -335, pop: true, texto: 'LO QUE GASTAS', size: 34, col: '#e6ce46', peso: 700, caja: [-150, -20, 300, 40] });
E.temblor(w(4, 3), 10, 0.35); E.golpe(w(4, 4), 0.03);
// «Si gastas 1.700 euros al mes»: etiqueta que rueda hasta 1.700 €
E.obj('gMes', 'etiqueta', { t0: w(4, 8) - 0.05, t1: fin(1), x: -20, y: -230, w: 280, h: 96, r: 60, pop: true,
  v: [[w(4, 9) - 0.1, 0], [w(4, 10) + 0.1, 1700, 'out']], on: [[0, 1], [s2, 1], [s2 + 1.2, 0.5]], barrido: [w(4, 10) + 0.1], caja: [-140, -48, 280, 96] });
E.obj('rotMes', 'rotulo', { t0: w(4, 11) - 0.05, t1: fin(1), x: -20, y: -150, pop: true, texto: 'AL MES', size: 24, col: GRIS, caja: [-60, -16, 120, 32] });
E.sfx(w(4, 9), 'fill');
// «son unos 20.000 al año»: doce monedas, una por mes, del mes al tarro; el contador del año suma
for (let i = 0; i < 12; i++) { const a = s2 + i * 0.1;
  E.obj('mm' + i, 'moneda', { t0: a, t1: a + 0.6, entra: 0.05, sale: 0.12, r: 18, n: '', libre: true, estela: 4, sfx: false, inspeccion: false,
    x: [[a, -20], [a + 0.55, 300, 'inout']], y: [[a, -270], [a + 0.28, -330 - (i % 3) * 12], [a + 0.55, -150, 'in']] }); }
E.sfx(s2, 'fill');
E.obj('cAno', 'contador', { t0: s2 - 0.1, t1: fin(1), x: 300, y: -285, pop: true, pre: '≈ ', suf: ' €', size: 48, col: 'txt',
  v: [[s2, 0], [w(4, 15) + 0.35, 20000, 'out']], barrido: [w(4, 15) + 0.4], caja: [-125, -30, 250, 60] });
E.obj('ch1', 'chispas', { t0: wf(4, -1) - 0.2, t1: wf(4, -1) + 0.6, x: 300, y: -130, r0: 100, r1: 200, inspeccion: false });
E.golpe(wf(4, -1) - 0.2, 0.04); E.destello(wf(4, -1) - 0.2, 0.12);

// ---------- 2 · multiplícalo por veinticinco ----------
// 5: El(0) segundo(1) multiplícalo(2) por(3) veinticinco(4)
// 6: Veinte(0) mil(1) por(2) veinticinco(3) son(4) 500.000(5) euros(6) Eso(7) es(8) lo(9) que(10) necesitas(11) reunir(12)
E.numero(2, N[1].T, N[1].S, { desde: 'tarroA', hacia: 'anual2' });
const GX = 150, GY = -315, GP = 44;
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -390, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'senalar'], [w(5, 4), 'ofrecer'], [w(6, 0), 'de_pie'], [w(6, 4), 'senalar'], [w(6, 5) + 0.3, 'celebrar'], [w(6, 7), 'de_pie'], [w(6, 11), 'levantar']],
  sonrisa: [[w(5, 2), 0.5], [w(5, 4), 0.8], [w(6, 5) + 0.3, 1.5], [w(6, 7), 0.6], [w(6, 11), 1.2]] });
E.obj('anual2', 'etiqueta', { t0: N[1].S - 0.1, t1: fin(2), x: 20, y: -490, w: 290, h: 84, r: 60, pop: true, v: 20000, caja: [-145, -42, 290, 84] });
E.obj('x25', 'contador', { t0: w(5, 2) - 0.1, t1: fin(2), x: 285, y: -490, pop: true, pre: '× ', size: 60, col: '#e6ce46', miles: false,
  v: [[w(5, 3), 0], [w(5, 4) + 0.6, 25, 'lin']], barrido: [w(5, 4) + 0.65, w(6, 3)], caja: [-95, -36, 190, 72] });
// veinticinco casillas, una por año de gastos: entran con «× 25» y se encienden mientras la meta suma
for (let i = 0; i < 25; i++) { const r = Math.floor(i / 5), q = i % 5; const a = w(5, 3) + i * (0.85 / 25); const e = w(6, 4) - 0.1 + i * 0.04;
  E.obj('c' + i, 'pieza', { t0: a, t1: fin(2), x: GX + (q - 2) * GP, y: GY + (r - 2) * GP, r: 17, pop: true, on: [[0, 0], [e, 0], [e + 0.15, 1]],
    luz: [[0, 1], [N[1].T, 1]], caja: [-17, -17, 34, 34] }); }
E.sfx(w(5, 3), 'fill');
E.obj('meta', 'etiqueta', { t0: w(6, 4) - 0.2, t1: fin(2), x: GX - 10, y: -125, w: 420, h: 110, r: 70, pop: true, sobrevive: true,
  v: [[w(6, 4) - 0.1, 0], [w(6, 4) - 0.1 + 25 * 0.04 + 0.15, 500000, 'lin']], barrido: [w(6, 6) + 0.2, w(6, 11)], caja: [-210, -55, 420, 110] });
E.sfx(w(6, 4), 'fill');
E.obj('rotMeta2', 'rotulo', { t0: w(6, 9) - 0.1, t1: fin(2), x: GX - 10, y: -32, pop: true, texto: 'LO QUE NECESITAS REUNIR', size: 24, col: '#e6ce46', caja: [-200, -16, 400, 32] });
E.obj('ch2', 'chispas', { t0: w(6, 6) + 0.1, t1: w(6, 6) + 0.9, x: GX - 10, y: -125, r0: 130, r1: 250, inspeccion: false });
E.golpe(w(6, 6) + 0.1, 0.05); E.destello(w(6, 6) + 0.1, 0.14);
E.obj('rayos2', 'rayos', { t0: w(6, 9), t1: fin(2), x: GX - 10, y: -125, r: 300, z: -2, p: [[w(6, 9), 0], [wf(6, -1), 1, 'out']], inspeccion: false });

// ---------- 3 · déjalo invertido y saca como mucho el 4 % al año ----------
// 7: El(0) tercero(1) déjalo(2) invertido(3) y(4) saca(5) como(6) mucho(7) el(8) cuatro(9) por(10) ciento(11) al(12) año(13)
// 8: Ese(0) cuatro(1) por(2) ciento(3) son(4) veinte(5) mil(6) euros(7) al(8) año(9) Y(10) como(11) el(12) resto(13) sigue(14) rindiendo(15)
//    un(16) estudio(17) de(18) 1998(19) vio(20) que(21) el(22) dinero(23) aguantaba(24) treinta(25) años(26) en(27) casi(28) todos(29) los(30) casos(31)
E.numero(3, N[2].T, N[2].S, { desde: 'meta', hacia: 'tarroI' });
const TX = 270, LX = -50;
const yr0 = w(8, 24), yr1 = w(8, 27);   // los treinta años
E.figura('yo3', { t0: N[2].S - 0.1, t1: TG, x: -400, cara: true,
  poses: [[0, 'de_pie'], [w(7, 2), 'meter'], [w(7, 4), 'de_pie'], [w(7, 5), 'coger'], [w(7, 9), 'senalar'], [wf(7, -1), 'de_pie'], [w(8, 4), 'ofrecer'],
    [w(8, 10), 'de_pie'], [w(8, 14), 'senalar'], [w(8, 16), 'pensar'], [yr0, 'senalar'], [w(8, 28), 'celebrar']],
  sonrisa: [[w(7, 2), 0.5], [w(7, 5), 0.8], [w(8, 4), 1], [w(8, 16), 0.3], [w(8, 28), 1.5]] });
E.obj('tarroI', 'tarro', { t0: N[2].S - 0.1, t1: TG, x: TX, w: 220, h: 290, rotulo: 'INVERTIDO', pop: true,
  nivel: [[w(7, 2), 0], [w(7, 3) + 0.4, 1, 'out'], [w(7, 5), 1], [w(7, 5) + 0.4, 0.93, 'out'], [w(8, 13), 0.93], [w(8, 15) + 0.3, 1, 'inout'],
    [yr0, 1], [yr0 + 0.25, 0.93], [yr0 + 0.5, 1], [yr0 + 0.75, 0.93], [yr0 + 1.0, 1], [yr0 + 1.25, 0.93], [yr1, 1]],
  barrido: [w(7, 3) + 0.4, w(8, 15) + 0.3, yr1], caja: [-110, -290, 220, 290], refl: true });
E.obj('cInv', 'contador', { t0: w(7, 2) - 0.1, t1: TG, x: TX, y: -385, pop: true, suf: ' €', size: 46, col: 'txt', v: [[w(7, 2), 0], [w(7, 3) + 0.4, 500000, 'out']], caja: [-120, -28, 240, 56] });
E.sfx(w(7, 2), 'fill');
// «saca como mucho el cuatro por ciento al año»: el 4 % rueda y una moneda sale del tarro hacia el muñeco
E.obj('pct4', 'contador', { t0: w(7, 8) - 0.1, t1: w(8, 16) - 0.05, sale: 0.2, x: LX, y: -470, pop: true, suf: ' %', size: 72, col: '#e6ce46', miles: false,
  v: [[w(7, 9), 0], [w(7, 11) + 0.1, 4, 'out']], barrido: [w(7, 11) + 0.15, w(8, 3)], caja: [-90, -42, 180, 84] });
E.obj('rotMax', 'rotulo', { t0: w(7, 6), t1: w(8, 16) - 0.05, sale: 0.2, x: LX, y: -395, pop: true, texto: [[0, 'COMO MUCHO'], [w(7, 12), 'AL AÑO']], size: 24, col: GRIS, caja: [-90, -16, 180, 32] });
const sac = w(7, 5);
E.obj('saca', 'moneda', { t0: sac, t1: sac + 0.75, entra: 0.06, sale: 0.15, r: 24, n: '', libre: true, estela: 5, sfx: true, inspeccion: false,
  x: [[sac, TX], [sac + 0.7, -300, 'inout']], y: [[sac, -260], [sac + 0.35, -420], [sac + 0.7, -270, 'in']] });
// «Ese cuatro por ciento son veinte mil euros al año»
E.obj('veinte3', 'etiqueta', { t0: w(8, 4) - 0.1, t1: w(8, 16) - 0.05, sale: 0.2, x: LX, y: -270, w: 280, h: 90, r: 60, pop: true,
  v: [[w(8, 5) - 0.1, 0], [w(8, 7), 20000, 'out']], barrido: [w(8, 7) + 0.05], caja: [-140, -45, 280, 90] });
for (let i = 0; i < 4; i++) { const a = w(8, 4) + i * 0.15;
  E.obj('s3_' + i, 'moneda', { t0: a, t1: a + 0.65, entra: 0.05, sale: 0.12, r: 18, n: '', libre: true, estela: 4, sfx: false, inspeccion: false,
    x: [[a, TX], [a + 0.6, LX + 30, 'inout']], y: [[a, -260], [a + 0.3, -400], [a + 0.6, -270, 'in']] }); }
E.sfx(w(8, 5), 'fill');
// «Y como el resto sigue rindiendo»: monedas que caen dentro y el tarro vuelve a llenarse
E.obj('rinde', 'rotulo', { t0: w(8, 12), t1: w(8, 24), sale: 0.2, x: TX, y: -455, pop: true, texto: 'SIGUE RINDIENDO', size: 24, col: '#e6ce46', caja: [-130, -16, 260, 32] });
for (let i = 0; i < 5; i++) { const a = w(8, 13) + i * 0.16;
  E.obj('rd' + i, 'moneda', { t0: a, t1: a + 0.55, entra: 0.05, sale: 0.12, r: 16, n: '', libre: true, estela: 4, sfx: false, inspeccion: false,
    x: [[a, TX - 90 + i * 45], [a + 0.5, TX - 20 + i * 10, 'in']], y: [[a, -470], [a + 0.5, -200, 'in']] }); }
E.sfx(w(8, 13), 'whoosh');
// «un estudio de 1998 … aguantaba treinta años en casi todos los casos»
E.obj('estudio', 'rotulo', { t0: w(8, 17) - 0.1, t1: TG, x: LX, y: -490, pop: true, texto: 'ESTUDIO DE 1998', size: 30, col: '#c9ccca', caja: [-140, -18, 280, 36] });
E.obj('barAnos', 'relleno', { t0: w(8, 21), t1: TG, x: LX, y: -400, w: 300, h: 46, pop: true, f: [[yr0, 0], [yr1, 1, 'inout']], barrido: [yr1], caja: [-150, -23, 300, 46] });
E.obj('cAnos', 'contador', { t0: w(8, 23) - 0.05, t1: TG, x: LX, y: -305, pop: true, suf: ' años', size: 60, col: '#e6ce46', miles: false,
  v: [[yr0, 0], [yr1, 30, 'inout']], caja: [-140, -36, 280, 72] });
E.sfx(yr0, 'fill');
E.obj('casos', 'rotulo', { t0: w(8, 27) - 0.05, t1: TG, x: LX, y: -215, pop: true, texto: 'EN CASI TODOS LOS CASOS', size: 24, col: GRIS, caja: [-190, -16, 380, 32] });
E.obj('ch3', 'chispas', { t0: yr1, t1: yr1 + 0.8, x: TX, y: -170, r0: 110, r1: 220, inspeccion: false });
E.obj('rayos3', 'rayos', { t0: yr1 - 0.1, t1: TG, x: TX, y: -150, r: 300, z: -2, p: [[yr1 - 0.1, 0], [wf(8, -1), 1, 'out']], inspeccion: false });
E.golpe(yr1, 0.04); E.destello(yr1, 0.12);

// ---------- matiz: orientativa, no una garantía; te dice cuánto te falta ----------
// 9: Es(0) una(1) regla(2) orientativa(3) no(4) una(5) garantía(6) pero(7) te(8) dice(9) cuánto(10) te(11) falta(12)
E.sfx(TG, 'cut'); E.golpe(TG + 0.05, 0.03);
E.figura('yo4', { t0: TG, t1: TC, x: -370, cara: true,
  poses: [[0, 'de_pie'], [w(9, 2), 'pensar'], [w(9, 4), 'encoger'], [w(9, 7), 'de_pie'], [w(9, 9), 'senalar']],
  sonrisa: [[0, 0.3], [w(9, 4), -0.5], [w(9, 9), 0.8], [wf(9, -1), 1.2]] });
E.obj('m4b', 'moneda', { t0: TG + 0.05, t1: TC, x: 150, y: [[0, -420], [w(9, 7), -420], [w(9, 8) + 0.3, -470, 'inout']], r: [[0, 80], [w(9, 7), 80], [w(9, 8) + 0.3, 55, 'inout']],
  n: '4 %', pop: true, sfx: true, s: [[0, 1], [w(9, 4), 1], [w(9, 4) + 0.15, 0.9], [w(9, 4) + 0.35, 1, 'back']], inspeccion: false });
E.obj('orient', 'rotulo', { t0: w(9, 3) - 0.05, t1: w(9, 7), sale: 0.15, x: 150, y: -295, pop: true, texto: 'ORIENTATIVA', size: 34, col: '#e6ce46', peso: 700, caja: [-130, -20, 260, 40] });
E.obj('noGar', 'rotulo', { t0: w(9, 4) - 0.05, t1: w(9, 7), sale: 0.15, x: 150, y: -235, pop: true, texto: 'NO UNA GARANTÍA', size: 28, col: GRIS, caja: [-150, -18, 300, 36] });
E.temblor(w(9, 6), 8, 0.3);
// «pero te dice cuánto te falta»: barra hasta la meta de 500.000 €; el hueco que queda parpadea
E.obj('falta', 'barra', { t0: w(9, 7) + 0.12, t1: TC, x: 130, y: -260, w: 460, h: 52, pop: true, marca: 0.985, rotMarca: '500.000 €',
  f: [[w(9, 8), 0], [w(9, 10) + 0.3, 0.38, 'out']], caja: [-230, -104, 460, 130] });
E.obj('rotFalta', 'rotulo', { t0: w(9, 11) - 0.05, t1: TC, x: 130 + (0.69 - 0.5) * 460, y: -175, pop: true, texto: 'TE FALTA', size: 28, col: '#e6ce46', peso: 700,
  a: [[w(9, 11), 1], [wf(9, -1), 1], [wf(9, -1) + 0.15, 0.4], [wf(9, -1) + 0.3, 1]], caja: [-75, -18, 150, 36] });
E.sfx(w(9, 8), 'fill');
for (let i = 0; i < 3; i++) { const a = w(9, 8) + i * 0.18;
  E.obj('f4_' + i, 'moneda', { t0: a, t1: a + 0.55, entra: 0.05, sale: 0.12, r: 16, n: '', libre: true, estela: 4, sfx: false, inspeccion: false,
    x: [[a, -230], [a + 0.5, -40 + i * 25, 'inout']], y: [[a, -330], [a + 0.25, -380], [a + 0.5, -260, 'in']] }); }

// ---------- cierre: resumen y envío ----------
// 10: Lo(0) que(1) cuenta(2) no(3) es(4) cuánto(5) ganas(6) es(7) cuánto(8) necesitas(9)
// 11: Mándaselo(0) a(1) ese(2) amigo(3) que(4) dice(5) que(6) nunca(7) podrá(8) dejar(9) de(10) trabajar(11)
E.obj('rayosC', 'rayos', { t0: TC, t1: TE, capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(10, 8), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: TE, sale: 0.25, capa: 'pantalla', x: 540, y: 960, items: ['Gasto anual', '× 25', '4 % al año'], gap: 260,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(10, 8)], caja: [-390, -60, 780, 200] });
E.obj('confC', 'confeti', { t0: w(10, 9), t1: w(10, 9) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(w(10, 9), 0.2); E.golpe(w(10, 9), 0.04);
E.figura('yoF', { t0: TE + 0.05, t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [TE + 0.15, 'senalar']], sonrisa: [[TE, 0.6], [w(11, 7), 1.2]] });
E.obj('enviar', 'enviar', { t0: TE + 0.1, t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(11, 9)], vuelo: [[wf(11, -1), 0], [wf(11, -1) + 0.5, 1, 'in']] });
