// L44 · La pérdida de poder adquisitivo (estilo B; reglas 15, 20, 21, 24)
// Idea visual: la etiqueta «1.000 €» se guarda sobre el cajón y, mientras pasan diez años (diez casillas que se marcan)
// con los precios al 3 %, rueda hacia abajo hasta 744 € y se apaga: el dinero sigue ahí, pero vale menos.
// Contador que rueda: los diez años, el 3 % y la etiqueta 1.000 → 744. Algo que se rellena por punto: el tarro «A MANO»
// con sus tres meses, la barra de los años y la de la cuenta, y las dos barras que se comparan (tu dinero / los precios).
// Regla 20: «Ahí no se pierde nada.» va en bocadillo del muñeco mientras guarda el dinero; la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(2, 0), gap: 70, y: 360 } });

// «La primera: // …» → T en «La», S en la primera palabra del punto
const N = [3, 5, 7].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(9, 0) - 0.1;   // resumen
const ROJO = '#e4574f';
const GRIS = '#9a9c9b';
const AM = '#e6ce46';

E.camara([
  [0, [0, -380, 1.04]], [w(0, 5), [10, -385, 1.06]], [w(0, 12), [-15, -390, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 9), [10, -385, 1.04]],
  [w(1, 14), [15, -388, 1.06]], [w(1, 16), [0, -385, 1.04]], [wf(1, -1), [-10, -390, 1.07]], [w(2, 0), [0, -380, 1.02]], [N[0].T, [10, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [15, -385, 1.04]], [w(4, 6), [-10, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 0), [-15, -385, 1.04]], [w(6, 7), [15, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(7, 12), [10, -385, 1.03]], [w(8, 0), [-10, -385, 1.04]], [w(8, 9), [10, -385, 1.05]], [TC - 0.1, [0, -385, 1.04]], [TC, [0, -390, 1.05]],
]);

// monedas sueltas que vuelan de (x0, y0) a (x1, y1)
const vuelan = (id, n, t, x0, y0, x1, y1, paso = 0.12) => { for (let i = 0; i < n; i++) { const a = t + i * paso;
  E.obj(id + i, 'moneda', { t0: a, t1: a + 0.6, entra: 0.06, sale: 0.12, r: 18, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, x0], [a + 0.5, x1, 'inout']], y: [[a, y0], [a + 0.25, Math.min(y0, y1) - 70 - (i % 3) * 12], [a + 0.5, y1, 'in']] }); } };

// ---------- gancho ----------
// 0: Mil(0) euros(1) en(2) un(3) cajón(4) no(5) valen(6) lo(7) mismo(8) dentro(9) de(10) diez(11) años(12)   [bocadillo «Ahí no se pierde nada.»]
// el muñeco deja la etiqueta de 1.000 € sobre el cajón, convencido; «no valen lo mismo»: la etiqueta se apaga; «diez años»: el contador rueda
const CX = 160;
const tPosa = w(0, 4) + 0.1;
E.obj('cajon', 'bloques', { t0: 0, t1: w(2, 0), sale: 0.25, x: CX, y: -70, n: 1, w: 320, h: 140, refl: true, caja: [-160, -70, 320, 140] });
E.obj('rotCajon', 'rotulo', { t0: w(0, 2), t1: w(1, 0), sale: 0.2, x: CX, y: 56, texto: 'EN UN CAJÓN', size: 26, col: GRIS, pop: true, caja: [-120, -16, 240, 32] });
E.obj('mil', 'etiqueta', { t0: 0, t1: w(2, 0), sale: 0.25, x: CX, y: [[0, -370], [w(0, 2), -345, 'lin'], [tPosa, -200, 'in']], w: 320, h: 100, r: 60,
  v: [[0, 1000], [w(1, 12), 1000], [w(1, 14) + 1.1, 744, 'inout']],
  on: [[0, 1], [w(0, 5), 1], [w(0, 8), 0.55], [w(1, 0), 0.55], [w(1, 0) + 0.3, 1], [w(1, 12), 1], [w(1, 14) + 1.1, 0.55]],
  s: [[0, 1], [w(0, 5), 1], [w(0, 8), 0.9, 'inout'], [w(1, 0), 0.9], [w(1, 0) + 0.3, 1, 'back']],
  barrido: [0.25, w(1, 15)], toca: ['cajon'], caja: [-160, -50, 320, 100] });
E.obj('pulsoC', 'pulso', { t0: tPosa, t1: tPosa + 0.6, x: CX, y: -150, r0: 60, r1: 200, inspeccion: false });
E.sfx(tPosa, 'thud'); E.golpe(tPosa, 0.03);
E.figura('yo', { t0: 0, t1: w(2, 0), sale: 0.25, x: -330, talla: 330, cara: true,
  poses: [[0, 'ofrecer'], [w(0, 2), 'meter'], [w(0, 4) + 0.3, 'celebrar'], [w(0, 6), 'encoger'], [w(0, 11), 'manos_cabeza'], [w(1, 0), 'de_pie'], [w(1, 2), 'senalar'],
    [w(1, 9), 'pensar'], [w(1, 14), 'manos_cabeza'], [w(1, 16), 'triste'], [w(1, 18), 'senalar']],
  sonrisa: [[0, 1.2], [w(0, 4) + 0.3, 1.5], [w(0, 6), 0], [w(0, 11), -1.2], [w(1, 0), -0.3], [w(1, 14), -1.5], [w(1, 18), -0.6]] });
E.obj('bocaH', 'bocadillo', { t0: 0.15, t1: w(0, 9), sale: 0.2, x: -250, y: -450, w: 400, h: 76, texto: 'Ahí no se pierde nada.', size: 29, pop: true,
  on: [[0.15, 0], [0.6, 1]], caja: [-200, -38, 400, 102] });
E.temblor(w(0, 6), 14, 0.45); E.golpe(w(0, 6), 0.05); E.sfx(w(0, 6), 'thud');
E.obj('anios', 'contador', { t0: w(0, 9), t1: w(1, 0), sale: 0.2, x: CX, y: -420, size: 76, suf: ' AÑOS', miles: false, pop: true,
  v: [[w(0, 9) + 0.1, 0], [w(0, 12) + 0.2, 10, 'lin']], barrido: [w(0, 12) + 0.25], caja: [-170, -45, 340, 90] });
E.obj('chAnios', 'chispas', { t0: w(0, 12) + 0.2, t1: w(0, 12) + 1.0, x: CX, y: -420, r0: 130, r1: 230, inspeccion: false });
E.destello(w(0, 12) + 0.2, 0.12);

// 1: Si(0) los(1) precios(2) suben(3) un(4) 3(5) %(6) al(7) año(8) en(9) diez(10) años(11) valdrán(12) unos(13) 744(14) euros(15)
//    Se(16) llama(17) pérdida(18) de(19) poder(20) adquisitivo(21)
// «los precios suben un 3 % al año»: rótulo y contador; «en diez años»: diez casillas que se marcan; «744 euros»: la etiqueta rueda hacia abajo
E.obj('rotPrecios', 'rotulo', { t0: w(1, 1), t1: w(1, 16), sale: 0.2, x: CX, y: -495, texto: 'LOS PRECIOS', size: 28, col: GRIS, pop: true, caja: [-120, -16, 240, 32] });
E.obj('tres', 'contador', { t0: w(1, 4), t1: w(1, 16), sale: 0.2, x: CX - 90, y: -425, size: 72, suf: ' %', miles: false, pop: true,
  v: [[w(1, 4), 0], [w(1, 5) + 0.3, 3, 'out']], barrido: [w(1, 6)], caja: [-90, -42, 180, 84] });
E.obj('alAnio', 'rotulo', { t0: w(1, 7), t1: w(1, 16), sale: 0.2, x: CX + 95, y: -420, texto: 'AL AÑO', size: 30, col: '#c9ccca', pop: true, caja: [-75, -18, 150, 36] });
E.golpe(w(1, 5) + 0.3, 0.03);
E.obj('decada', 'bloques', { t0: w(1, 9) - 0.1, t1: w(1, 16), sale: 0.2, x: CX, y: -320, n: 10, w: 400, h: 40, parte: 1, pop: true,
  hechos: [[w(1, 10), 0], [w(1, 12) + 0.2, 10, 'lin']], caja: [-200, -32, 400, 64] });
E.sfx(w(1, 10), 'fill'); E.sfx(w(1, 13), 'fill');
// el valor que se pierde: monedas que salen de la etiqueta y se van
for (let i = 0; i < 6; i++) { const a = w(1, 14) + i * 0.16;
  E.obj('pierde' + i, 'moneda', { t0: a, t1: a + 0.7, entra: 0.06, sale: 0.3, r: 16, n: '', libre: true, estela: 4, sfx: false, inspeccion: false,
    x: [[a, CX + 150], [a + 0.65, CX + 330 + (i % 2) * 30, 'out']], y: [[a, -235], [a + 0.65, -330 - (i % 3) * 25, 'out']], luz: [[a, 1], [a + 0.65, 0.3]] }); }
E.temblor(w(1, 15), 14, 0.45); E.golpe(w(1, 15), 0.05); E.sfx(w(1, 15), 'thud');
E.obj('rotPerd1', 'rotulo', { t0: w(1, 18) - 0.1, t1: w(2, 0), sale: 0.25, x: CX, y: -470, texto: 'PÉRDIDA DE', size: 34, col: AM, peso: 700, pop: true, caja: [-150, -20, 300, 40] });
E.obj('rotPerd2', 'rotulo', { t0: w(1, 20) - 0.1, t1: w(2, 0), sale: 0.25, x: CX, y: -415, texto: 'PODER ADQUISITIVO', size: 34, col: AM, peso: 700, pop: true, caja: [-235, -20, 470, 40] });
E.obj('chPerd', 'chispas', { t0: w(1, 21), t1: w(1, 21) + 0.8, x: CX, y: -440, r0: 150, r1: 260, inspeccion: false });
E.golpe(w(1, 21), 0.04);

// 2: Tres(0) reglas(1) para(2) evitarlo(3)
E.figura('yo2', { t0: w(2, 0) - 0.05, t1: fin(0), x: -300, cara: true,
  poses: [[0, 'de_pie'], [w(2, 0), 'senalar'], [w(2, 3), 'celebrar']], sonrisa: [[0, 0.2], [w(2, 3), 1.2]] });
[0, 1, 2].forEach(i => { const a = w(2, 0) + i * 0.14;
  E.obj('m' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: 40 + i * 130, y: -330, r: 46, n: i + 1, pop: true, sfx: i === 0,
    s: i === 0 ? [[0, 1], [wf(2, -1), 1], [wf(2, -1) + 0.25, 1.25, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [wf(2, -1), 1], [wf(2, -1) + 0.25, 0.4]], caja: [-46, -46, 92, 92] }); });
E.obj('rel2', 'relleno', { t0: w(2, 0), t1: N[0].T, sale: 0.2, x: 170, y: -180, w: 360, h: 30, pop: true, f: [[w(2, 0) + 0.1, 0], [wf(2, -1), 1, 'out']], caja: [-180, -15, 360, 30] });
E.sfx(w(2, 0) + 0.1, 'fill');
E.destello(wf(2, -1), 0.12);

// ---------- 1 · ten a mano tres meses de gastos ----------
// 3: La(0) primera(1) ten(2) a(3) mano(4) tres(5) meses(6) de(7) gastos(8)
// 4: Eso(0) es(1) para(2) imprevistos(3) no(4) para(5) todo(6) el(7) dinero(8) que(9) tengas(10)
E.numero(1, N[0].T, N[0].S, { desde: 'm1', hacia: 'tarroM' });
const TX = 40;
E.figura('yoP1', { t0: N[0].S - 0.1, t1: fin(1), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(3, 2), 'ofrecer'], [w(3, 5), 'meter'], [wf(3, -1), 'celebrar'], [w(4, 0), 'senalar'], [w(4, 4), 'encoger'], [w(4, 6), 'senalar'], [wf(4, -1), 'pensar']],
  sonrisa: [[0, 0.3], [w(3, 5), 0.8], [wf(3, -1), 1.5], [w(4, 0), 0.8], [w(4, 4), -0.2], [wf(4, -1), 0.3]] });
E.obj('tarroM', 'tarro', { t0: N[0].S - 0.1, t1: fin(1), x: TX, w: 190, h: 230, rotulo: 'A MANO', pop: true, refl: true,
  nivel: [[w(3, 5), 0], [wf(3, -1) + 0.2, 1, 'inout']], tapa: [[w(4, 2), 0], [w(4, 3) + 0.15, 1, 'out']], barrido: [wf(3, -1) + 0.25, w(4, 3) + 0.2], caja: [-95, -230, 190, 230] });
E.obj('meses', 'bloques', { t0: w(3, 5) - 0.1, t1: fin(1), x: TX, y: -330, n: 3, w: 260, h: 56, parte: 1, pop: true,
  hechos: [[w(3, 5), 0], [w(3, 5) + 0.3, 1, 'out'], [w(3, 6), 1], [w(3, 6) + 0.3, 2, 'out'], [w(3, 8), 2], [w(3, 8) + 0.3, 3, 'out']], caja: [-130, -40, 260, 80] });
E.obj('rotMeses', 'rotulo', { t0: w(3, 5), t1: fin(1), x: 110, y: -450, size: 27, col: AM, pop: true,
  texto: [[0, 'TRES MESES DE GASTOS'], [w(4, 3) - 0.05, 'PARA IMPREVISTOS']], caja: [-215, -17, 430, 34] });
vuelan('ma', 6, w(3, 5), -290, -300, TX, -150, 0.14);
E.sfx(w(3, 5), 'fill');
E.obj('ch1', 'chispas', { t0: wf(3, -1) + 0.2, t1: wf(3, -1) + 1.0, x: TX, y: -120, r0: 110, r1: 210, inspeccion: false });
E.golpe(wf(3, -1) + 0.2, 0.04);
E.obj('pulsoT', 'pulso', { t0: w(4, 3) + 0.15, t1: w(4, 3) + 0.75, x: TX, y: -220, r0: 50, r1: 150, inspeccion: false });
E.sfx(w(4, 3) + 0.15, 'thud'); E.golpe(w(4, 3) + 0.15, 0.03);
// «no para todo el dinero que tengas»: el resto del dinero, un montón aparte
E.obj('resto', 'pila', { t0: w(4, 4), t1: fin(1), x: 320, n: 9, w: 150, hh: 24, sobrevive: true, r: 60, oy: -90, refl: true,
  k: [[w(4, 4) + 0.05, 0], [w(4, 8) + 0.2, 9, 'lin']], barrido: [w(4, 10)], caja: [-75, -190, 150, 190] });
E.sfx(w(4, 4) + 0.05, 'fill');
E.temblor(w(4, 4), 8, 0.3);
E.obj('ch1b', 'chispas', { t0: w(4, 10), t1: w(4, 10) + 0.8, x: 320, y: -100, r0: 90, r1: 170, inspeccion: false });
E.destello(wf(4, -1), 0.1);

// ---------- 2 · lo que no vayas a usar en años, que no esté parado ----------
// 5: La(0) segunda(1) lo(2) que(3) no(4) vayas(5) a(6) usar(7) en(8) años(9) que(10) no(11) esté(12) parado(13)
// 6: Busca(0) una(1) cuenta(2) que(3) te(4) dé(5) intereses(6) o(7) infórmate(8) sobre(9) una(10) inversión(11) que(12) se(13) ajuste(14) a(15) lo(16) que(17) necesitas(18)
E.numero(2, N[1].T, N[1].S, { desde: 'resto', hacia: 'parado' });
const PX = 20;
E.figura('yoP2', { t0: N[1].S - 0.1, t1: fin(2), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'senalar'], [w(5, 8), 'pensar'], [w(5, 10), 'encoger'], [w(5, 13), 'manos_cabeza'], [w(6, 0), 'senalar'], [w(6, 6), 'celebrar'],
    [w(6, 8), 'pensar'], [w(6, 11), 'senalar'], [w(6, 14), 'escribir'], [wf(6, -1), 'celebrar']],
  sonrisa: [[0, 0.2], [w(5, 10), -0.4], [w(5, 13), -1.2], [w(6, 0), 0.3], [w(6, 6), 1.5], [w(6, 8), 0.4], [wf(6, -1), 1.5]] });
E.obj('parado', 'pila', { t0: N[1].S - 0.1, t1: fin(2), x: PX, n: 11, w: 150, hh: 24, pop: true, refl: true,
  k: [[0, 8], [w(6, 6), 8], [w(6, 6) + 0.25, 9, 'out'], [w(6, 6) + 0.5, 10, 'out'], [w(6, 6) + 0.75, 11, 'out']],
  luz: [[0, 1], [w(5, 10), 1], [w(5, 13), 0.45], [w(6, 2), 0.45], [w(6, 6), 1]], barrido: [w(6, 6) + 0.8], caja: [-75, -230, 150, 230] });
E.obj('barAnios', 'relleno', { t0: N[1].S, t1: w(6, 0), sale: 0.2, x: 130, y: -440, w: 340, h: 40, pop: true, rotulo: 'AÑOS',
  f: [[w(5, 4), 0], [w(5, 13), 1, 'lin']], caja: [-170, -54, 340, 74] });
E.sfx(w(5, 4), 'fill');
E.obj('rotParado', 'rotulo', { t0: w(5, 13) - 0.05, t1: w(6, 2), sale: 0.2, x: PX + 20, y: -290, texto: 'PARADO', size: 34, col: ROJO, peso: 700, pop: true, caja: [-95, -20, 190, 40] });
E.temblor(w(5, 13), 12, 0.4); E.golpe(w(5, 13), 0.04); E.sfx(w(5, 13), 'thud');
// «Busca una cuenta que te dé intereses»: la barra de la cuenta se llena y el montón crece
E.obj('cuenta', 'relleno', { t0: w(6, 1), t1: fin(2), x: 130, y: -440, w: 340, h: 40, pop: true, rotulo: [[0, 'CUENTA'], [w(6, 6), 'INTERESES']],
  f: [[w(6, 2), 0], [w(6, 6) + 0.3, 1, 'out']], barrido: [w(6, 6) + 0.35], caja: [-170, -54, 340, 74] });
E.sfx(w(6, 2), 'fill');
for (let i = 0; i < 3; i++) { const a = w(6, 6) - 0.2 + i * 0.25;   // los intereses caen de la barra al montón (por debajo del rótulo)
  E.obj('mi' + i, 'moneda', { t0: a, t1: a + 0.6, entra: 0.06, sale: 0.12, r: 18, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, 60], [a + 0.5, PX, 'inout']], y: [[a, -395], [a + 0.5, -250, 'in']] }); }
E.obj('ch2', 'chispas', { t0: w(6, 6) + 0.3, t1: w(6, 6) + 1.1, x: PX, y: -240, r0: 60, r1: 150, inspeccion: false });
E.golpe(w(6, 6) + 0.3, 0.04);
// «o infórmate sobre una inversión que se ajuste a lo que necesitas»: una lista que se va marcando
E.obj('rotInv', 'rotulo', { t0: w(6, 10), t1: fin(2), x: 300, y: -325, texto: 'INVERSIÓN', size: 28, col: AM, pop: true, caja: [-110, -16, 220, 32] });
E.obj('ajuste', 'lista', { t0: w(6, 8), t1: fin(2), x: 300, y: -160, n: 3, w: 230, gap: 76, pop: true, sobrevive: true, r: 70,
  p: [[w(6, 14), 0], [wf(6, -1), 3, 'lin']], brillo: [[w(6, 8), 0], [w(6, 11), 3, 'lin']], caja: [-115, -100, 230, 200] });
E.sfx(w(6, 14), 'fill');
E.obj('ch2b', 'chispas', { t0: wf(6, -1), t1: wf(6, -1) + 0.8, x: 300, y: -160, r0: 110, r1: 200, inspeccion: false });
E.golpe(wf(6, -1), 0.04); E.destello(wf(6, -1), 0.1);

// ---------- 3 · una vez al año, compara ----------
// 7: La(0) tercera(1) una(2) vez(3) al(4) año(5) compara(6) lo(7) que(8) rinde(9) tu(10) dinero(11) con(12) lo(13) que(14) han(15) subido(16) los(17) precios(18)
// 8: Si(0) rinde(1) menos(2) de(3) lo(4) que(5) suben(6) los(7) precios(8) pierdes(9) aunque(10) el(11) saldo(12) no(13) baje(14)
E.numero(3, N[2].T, N[2].S, { desde: 'ajuste', hacia: 'barD' });
const BX = 130;
E.figura('yoP3', { t0: N[2].S - 0.1, t1: TC, x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(7, 2), 'senalar'], [w(7, 6), 'pensar'], [w(7, 9), 'senalar'], [w(7, 12), 'pensar'], [w(7, 17), 'senalar'], [w(8, 0), 'encoger'], [w(8, 9), 'manos_cabeza'],
    [w(8, 11), 'senalar'], [wf(8, -1), 'triste']],
  sonrisa: [[0, 0.2], [w(7, 9), 0.6], [w(7, 17), 0], [w(8, 0), -0.4], [w(8, 9), -1.5], [wf(8, -1), -0.8]] });
E.obj('rotVez', 'rotulo', { t0: N[2].S, t1: TC, x: BX, y: -495, texto: 'UNA VEZ AL AÑO', size: 27, col: GRIS, pop: true, caja: [-150, -16, 300, 32] });
E.obj('doce', 'bloques', { t0: N[2].S, t1: TC, x: BX, y: -435, n: 12, w: 400, h: 26, parte: 1, pop: true,
  hechos: [[w(7, 2), 0], [w(7, 6), 12, 'lin']], luz: [[0, 1], [w(7, 6), 1], [w(7, 9), 0.5]], caja: [-200, -24, 400, 48] });
E.sfx(w(7, 2), 'fill');
E.obj('barD', 'relleno', { t0: N[2].S - 0.1, t1: TC, x: BX, y: -325, w: 340, h: 44, pop: true, rotulo: 'TU DINERO',
  f: [[w(7, 9), 0], [w(7, 11) + 0.3, 0.4, 'out']], barrido: [w(8, 1)], caja: [-170, -56, 340, 78] });
E.obj('barP', 'relleno', { t0: w(7, 12) - 0.1, t1: TC, x: BX, y: -210, w: 340, h: 44, pop: true, rotulo: 'LOS PRECIOS',
  f: [[w(7, 15), 0], [wf(7, -1) + 0.2, 0.85, 'out']], barrido: [w(8, 6)], caja: [-170, -56, 340, 78] });
E.sfx(w(7, 9), 'fill'); E.sfx(w(7, 15), 'fill');
E.obj('ch3', 'chispas', { t0: wf(7, -1) + 0.2, t1: wf(7, -1) + 1.0, x: BX + 120, y: -210, r0: 50, r1: 130, inspeccion: false });
E.golpe(wf(7, -1) + 0.2, 0.04);
// «Si rinde menos…»: las dos barras brillan por turno; «pierdes»: golpe; «aunque el saldo no baje»: el montón sigue igual
E.obj('pulsoD', 'pulso', { t0: w(8, 2), t1: w(8, 2) + 0.6, x: BX - 95, y: -325, r0: 30, r1: 110, inspeccion: false });
E.sfx(w(8, 2), 'pop');
E.obj('rotPierdes', 'rotulo', { t0: w(8, 9) - 0.05, t1: TC, x: 300, y: -95, texto: 'PIERDES', size: 36, col: ROJO, peso: 700, pop: true, caja: [-105, -21, 210, 42] });
E.temblor(w(8, 9), 14, 0.45); E.golpe(w(8, 9), 0.05); E.sfx(w(8, 9), 'thud');
E.obj('saldo', 'pila', { t0: w(8, 10), t1: TC, x: 30, n: 5, w: 150, hh: 24, pop: true, refl: true, k: [[w(8, 10), 0], [w(8, 12), 5, 'out']], barrido: [w(8, 13), wf(8, -1)], caja: [-75, -106, 150, 106] });
E.obj('rotSaldo', 'rotulo', { t0: w(8, 11), t1: TC, x: 30, y: 56, texto: 'EL SALDO', size: 26, col: GRIS, pop: true, caja: [-90, -16, 180, 32] });
E.destello(wf(8, -1) + 0.1, 0.1);

// ---------- cierre: resumen y envío ----------
// 9: Ahorrar(0) no(1) es(2) solo(3) guardar(4) es(5) conseguir(6) que(7) lo(8) guardado(9) no(10) pierda(11) valor(12)
// 10: Mándaselo(0) a(1) ese(2) amigo(3) que(4) lo(5) guarda(6) todo(7) en(8) la(9) cuenta(10) corriente(11)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(9, 4), 0.6, 'out'], [w(9, 12), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, items: ['Tres meses', 'Que rinda', 'Compara'], gap: 270,
  p: [[TC, 0], [w(9, 4), 3, 'lin']], barrido: [w(9, 4) + 0.3, w(9, 6), w(9, 9)], caja: [-400, -60, 800, 200] });
E.golpe(w(9, 5), 0.03);
E.obj('confC', 'confeti', { t0: wf(9, -1), t1: wf(9, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(9, -1), 0.22); E.golpe(wf(9, -1), 0.04);
E.figura('yoF', { t0: w(10, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(10, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(10, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(10, 11)], vuelo: [[wf(10, -1), 0], [wf(10, -1) + 0.5, 1, 'in']] });
