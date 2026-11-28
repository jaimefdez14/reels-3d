// L48 · La ley de Parkinson (estilo B; reglas 15, 20, 21, 24)
// Idea visual: la semana (L M X J V S D) pasa día a día mientras la barra del trabajo sigue vacía; el último día se llena
// de golpe. En el concepto, la barra del trabajo se estira hasta llenar todo el tiempo disponible. Tres reglas: cinco
// bloques de día que se quedan en tres (y se marcan), una fecha fijada en la semana con alguien esperando (y el plazo
// secreto que se desliza), y bloques de trabajo con un temporizador de una hora que se llena y se cierra.
// Contador que rueda: el año 1955 y los días (5 → 3). Algo que se rellena por punto: bloques marcados, barra de entrega,
// arco del temporizador.
// Regla 20: «Aún tengo tiempo.» va en bocadillo del muñeco del gancho; la voz solo narra.
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
  [0, [0, -380, 1.04]], [w(0, 5), [10, -385, 1.06]], [w(0, 9), [-15, -390, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 7), [10, -385, 1.04]],
  [w(1, 12) + 0.8, [-10, -385, 1.05]], [w(1, 13), [0, -380, 1.02]], [w(1, 19), [15, -390, 1.06]], [w(2, 0), [0, -380, 1.02]], [w(2, 6), [10, -385, 1.04]], [N[0].T, [10, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [15, -385, 1.04]], [w(4, 4), [-10, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 0), [-15, -385, 1.04]], [w(6, 7), [15, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(8, 0), [-10, -385, 1.04]], [w(8, 4), [10, -385, 1.05]], [TC - 0.1, [0, -385, 1.04]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Tienes(0) una(1) semana(2) para(3) entregarlo(4) y(5) lo(6) acabas(7) la(8) víspera(9)   [bocadillo «Aún tengo tiempo.»]
// la semana pasa día a día y la barra del trabajo sigue vacía; «y lo acabas la víspera»: se llena de golpe el último día
const HX = 130;
E.figura('yo', { t0: 0, t1: w(1, 0), sale: 0.25, x: -340, cara: true,
  poses: [[0, 'pensar'], [w(0, 2), 'encoger'], [w(0, 5), 'coger'], [w(0, 7), 'manos_cabeza'], [w(0, 9) + 0.35, 'triste']],
  sonrisa: [[0, 1], [w(0, 4), 0.8], [w(0, 5), -0.3], [w(0, 7), -1], [w(0, 9), -1.4]] });
E.obj('bocaH', 'bocadillo', { t0: 0.1, t1: w(0, 5), sale: 0.2, x: -75, y: -497, w: 320, h: 76, texto: 'Aún tengo tiempo.', size: 30, pop: true,
  on: [[0.1, 0], [0.5, 1]], caja: [-160, -38, 320, 102] });
E.obj('semH', 'dias', { t0: 0, t1: w(1, 0), sale: 0.25, x: HX + 30, y: -360, gap: 70,
  luz: [[0, 1], [w(0, 2), 2, 'lin'], [w(0, 5), 5, 'lin'], [w(0, 7), 6, 'out']], caja: [-240, -32, 480, 64] });
E.obj('rotSem', 'rotulo', { t0: 0, t1: w(1, 0), sale: 0.25, x: HX + 130, y: -430, size: 28, col: '#c9ccca',
  texto: [[0, 'UNA SEMANA'], [w(0, 8), 'LA VÍSPERA']], caja: [-120, -17, 240, 34] });
E.obj('trabH', 'relleno', { t0: 0, t1: w(1, 0), sale: 0.25, x: HX + 30, y: -230, w: 420, h: 46, rotulo: 'ENTREGA',
  f: [[0, 0], [w(0, 2), 0.04, 'lin'], [w(0, 7), 0.07, 'lin'], [w(0, 9) + 0.3, 1, 'in']], barrido: [w(0, 9) + 0.35], caja: [-210, -57, 420, 80] });
E.obj('papH', 'papeles', { t0: w(0, 5), t1: w(1, 0), sale: 0.25, x: HX + 30, y: -14, n: 7, k: [[w(0, 5), 0], [w(0, 9), 7, 'lin']], caja: [-95, -125, 190, 140] });
E.sfx(w(0, 7), 'fill');
E.obj('chH', 'chispas', { t0: w(0, 9) + 0.3, t1: w(0, 9) + 1.1, x: HX + 240, y: -360, r0: 40, r1: 110, inspeccion: false });
E.temblor(w(0, 9) + 0.3, 14, 0.45); E.golpe(w(0, 9) + 0.3, 0.05); E.destello(w(0, 9) + 0.3, 0.12);

// 1: Se(0) llama(1) ley(2) de(3) Parkinson(4) por(5) el(6) historiador(7) que(8) la(9) formuló(10) en(11) 1955(12)
//    el(13) trabajo(14) se(15) alarga(16) hasta(17) ocupar(18) todo(19) el(20) tiempo(21) disponible(22)
const TA = w(1, 13) - 0.1;   // segunda mitad: el trabajo se alarga
E.figura('yo1', { t0: w(1, 0) + 0.05, t1: fin(0), x: -350, cara: true,
  poses: [[0, 'de_pie'], [w(1, 2), 'senalar'], [w(1, 5), 'de_pie'], [w(1, 10), 'pensar'], [w(1, 12) + 0.5, 'senalar'], [TA, 'de_pie'], [w(1, 14), 'coger'], [w(1, 16), 'ofrecer'],
    [w(1, 19), 'encoger'], [w(1, 22), 'manos_cabeza'],
    [w(2, 0), 'de_pie'], [w(2, 1), 'senalar'], [w(2, 3), 'celebrar']],
  sonrisa: [[0, 0.3], [w(1, 2), 0.7], [w(1, 14), 0.2], [w(1, 19), -0.5], [w(1, 22), -1.2], [w(2, 0), 0.3], [w(2, 3), 1.4]] });
E.obj('rotLey', 'rotulo', { t0: w(1, 2) - 0.1, t1: w(2, 0), sale: 0.25, x: 130, y: -480, texto: 'LEY DE PARKINSON', size: 34, col: AM, peso: 700, pop: true, caja: [-215, -20, 430, 40] });
E.obj('chLey', 'chispas', { t0: w(1, 4), t1: w(1, 4) + 0.8, x: 130, y: -480, r0: 120, r1: 230, inspeccion: false });
E.golpe(w(1, 4), 0.04);
// «por el historiador que la formuló en 1955»: el historiador (gris) escribe y el año rueda
E.figura('hist', { t0: w(1, 2) + 0.15, t1: TA, sale: 0.25, x: 390, talla: 320, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(1, 8), 'pensar'], [w(1, 10), 'ofrecer'], [w(1, 12) + 0.6, 'senalar']], sonrisa: 0.6 });
E.obj('libro', 'papeles', { t0: w(1, 0) + 0.15, t1: TA, sale: 0.25, x: 130, y: -14, n: 6, k: [[w(1, 0) + 0.15, 0], [w(1, 5), 2, 'lin'], [w(1, 7), 2], [w(1, 12), 6, 'lin']], caja: [-95, -110, 190, 125] });
E.obj('anio', 'contador', { t0: w(1, 10), t1: TA, sale: 0.2, x: 110, y: -330, size: 110, miles: false, pop: true,
  v: [[w(1, 10), 0], [w(1, 12) + 0.7, 1955, 'out']], barrido: [w(1, 12) + 0.75], caja: [-160, -58, 320, 116] });
E.obj('chAnio', 'chispas', { t0: w(1, 12) + 0.7, t1: w(1, 12) + 1.5, x: 110, y: -330, r0: 150, r1: 240, inspeccion: false });
E.golpe(w(1, 12) + 0.7, 0.04);
// «el trabajo se alarga hasta ocupar todo el tiempo disponible»: la barra del trabajo se estira hasta llenar la semana
E.obj('semA', 'dias', { t0: TA, t1: w(2, 0), sale: 0.25, x: 130, y: -360, letras: ['L', 'M', 'X', 'J', 'V'], gap: 88, pop: true,
  luz: [[w(1, 14), 1], [w(1, 16), 1], [w(1, 18) + 0.3, 4, 'inout']], caja: [-210, -32, 420, 64] });
E.obj('trabA', 'relleno', { t0: TA + 0.1, t1: w(2, 0), sale: 0.25, x: 130, y: -230, w: 420, h: 50, pop: true, rotulo: 'EL TRABAJO',
  f: [[w(1, 14), 0], [w(1, 14) + 0.3, 0.2, 'out'], [w(1, 16), 0.2], [w(1, 18) + 0.3, 1, 'inout']], barrido: [w(1, 19), w(1, 22)], caja: [-210, -59, 420, 84] });
E.sfx(w(1, 14), 'fill'); E.sfx(w(1, 16), 'fill');
E.obj('rotTD', 'rotulo', { t0: w(1, 19), t1: w(2, 0), sale: 0.25, x: 130, y: -130, texto: 'TODO EL TIEMPO', size: 28, col: '#c9ccca', pop: true, caja: [-150, -17, 300, 34] });
E.obj('chA', 'chispas', { t0: w(1, 22), t1: w(1, 22) + 0.8, x: 130, y: -230, r0: 110, r1: 220, inspeccion: false });
E.temblor(w(1, 22), 12, 0.4); E.golpe(w(1, 22), 0.04);

// 2: Tres(0) reglas(1) para(2) usarla(3) a(4) tu(5) favor(6)
E.obj('rayosH', 'rayos', { t0: w(2, 0), t1: fin(0), x: 130, y: -330, r: 300, z: -2, p: [[w(2, 0), 0], [w(2, 3), 1, 'out']], inspeccion: false });
[0, 1, 2].forEach(i => { const a = w(2, 0) + i * 0.12;
  E.obj('r' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: 130 + (i - 1) * 125, y: -330, r: 40, n: i + 1, pop: true, sfx: true, inspeccion: false,
    s: i === 0 ? [[0, 1], [w(2, 3), 1], [w(2, 3) + 0.35, 1.4, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [w(2, 6), 1], [w(2, 6) + 0.3, 0.4]], barrido: i === 0 ? [w(2, 6)] : null }); });
E.obj('chR', 'chispas', { t0: w(2, 3) + 0.3, t1: w(2, 3) + 1.1, x: 5, y: -330, r0: 60, r1: 150, inspeccion: false });
E.destello(w(2, 3), 0.12);

// ---------- 1 · dale menos tiempo del que crees ----------
// 3: La(0) primera(1) dale(2) menos(3) tiempo(4) del(5) que(6) crees(7)
// 4: Si(0) calculas(1) cinco(2) días(3) concédete(4) tres(5)
E.numero(1, N[0].T, N[0].S, { desde: 'r1', hacia: 'plazo' });
const P1 = 110, PW = 76, PG = 18;                 // fila de cinco bloques de día
const fila0 = P1 - (5 * PW + 4 * PG) / 2;
const WA = 3 * PW + 2 * PG, WB = 2 * PW + PG;
E.figura('yoP1', { t0: N[0].S - 0.1, t1: fin(1), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(3, 3), 'coger'], [w(3, 5), 'pensar'], [w(4, 0), 'de_pie'], [w(4, 2), 'senalar'], [w(4, 4), 'ofrecer'], [wf(4, -1) + 0.3, 'celebrar']],
  sonrisa: [[0, 0.2], [w(3, 3), 0.6], [w(4, 2), 0.3], [w(4, 4), 0.9], [wf(4, -1) + 0.3, 1.5]] });
// la barra del plazo llega llena y se acorta con «menos tiempo»
E.obj('plazo', 'relleno', { t0: N[0].S - 0.1, t1: fin(1) - 0.2, sale: 0.2, x: P1, y: -450, w: 420, h: 46, pop: true, rotulo: [[0, 'EL TIEMPO QUE CREES'], [w(3, 3) + 0.2, 'MENOS TIEMPO']],
  f: [[N[0].S, 0], [w(3, 2) + 0.25, 1, 'out'], [w(3, 3), 1], [w(3, 4) + 0.3, 0.6, 'inout']], barrido: [w(3, 4) + 0.35], caja: [-210, -57, 420, 80] });
E.obj('semP', 'dias', { t0: N[0].S + 0.1, t1: w(4, 1) - 0.15, sale: 0.2, x: P1, y: -345, letras: ['L', 'M', 'X', 'J', 'V'], gap: 88, pop: true,
  luz: [[N[0].S, 4], [w(3, 3), 4], [w(3, 4) + 0.3, 2, 'inout']], caja: [-210, -32, 420, 64] });
E.sfx(N[0].S, 'fill'); E.sfx(w(3, 3), 'whoosh');
E.obj('pulsoP', 'pulso', { t0: w(3, 4) + 0.3, t1: w(3, 4) + 0.9, x: P1 - 210 + 8 + 404 * 0.6, y: -450, r0: 20, r1: 90, inspeccion: false });
E.golpe(w(3, 4) + 0.3, 0.03);
// «Si calculas cinco días»: cinco bloques y el contador rueda hasta 5; «concédete tres»: sobran dos, el contador baja a 3 y los tres se marcan
E.obj('dias3', 'bloques', { t0: w(4, 1) - 0.1, t1: fin(1), x: fila0 + WA / 2, y: -250, n: 3, w: WA, h: 96, parte: 1, pop: true, sobrevive: true, r: 70,
  hechos: [[w(4, 5), 0], [wf(4, -1) + 0.45, 3, 'lin']], barrido: [wf(4, -1) + 0.5], caja: [-WA / 2, -58, WA, 116] });
E.obj('dias2', 'bloques', { t0: w(4, 1) + 0.05, t1: fin(1), x: [[0, fila0 + WA + PG + WB / 2], [w(4, 4), fila0 + WA + PG + WB / 2], [w(4, 4) + 0.4, fila0 + WA + PG + WB / 2 + 40, 'out']], y: -250, n: 2, w: WB, h: 96, parte: 1, pop: true,
  a: [[0, 1], [w(4, 4), 1], [w(4, 4) + 0.4, 0.28]], caja: [-WB / 2, -58, WB, 116] });
E.obj('cuenta', 'contador', { t0: w(4, 1), t1: fin(1) - 0.2, sale: 0.2, x: P1 - 40, y: -95, size: 76, suf: ' DÍAS', miles: false, pop: true,
  v: [[w(4, 1), 0], [w(4, 2) + 0.3, 5, 'out'], [w(4, 4) + 0.1, 5], [w(4, 5) + 0.25, 3, 'inout']], barrido: [w(4, 5) + 0.3], caja: [-150, -45, 330, 90] });
E.sfx(w(4, 5), 'fill'); E.sfx(w(4, 4), 'whoosh');
E.obj('ch1', 'chispas', { t0: wf(4, -1) + 0.45, t1: wf(4, -1) + 1.25, x: fila0 + WA / 2, y: -250, r0: 130, r1: 230, inspeccion: false });
E.golpe(wf(4, -1) + 0.45, 0.04); E.destello(wf(4, -1) + 0.45, 0.1);

// ---------- 2 · fija una fecha de entrega que alguien espere ----------
// 5: La(0) segunda(1) fija(2) una(3) fecha(4) de(5) entrega(6) que(7) alguien(8) espere(9)
// 6: Un(0) plazo(1) que(2) solo(3) conoces(4) tú(5) se(6) mueve(7) sin(8) que(9) nadie(10) se(11) entere(12)
E.numero(2, N[1].T, N[1].S, { desde: 'dias3', hacia: 'entrega' });
const P2 = 70;
const VUELTA = wf(6, -1) + 0.15;   // remate: la fecha vuelve a su sitio y alguien la espera
E.figura('yoP2', { t0: N[1].S - 0.1, t1: fin(2), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'senalar'], [w(5, 7), 'ofrecer'], [w(6, 0), 'de_pie'], [w(6, 3), 'pensar'], [w(6, 7), 'encoger'], [w(6, 10), 'apartarse'], [VUELTA, 'celebrar']],
  sonrisa: [[0, 0.2], [w(5, 2), 0.8], [w(5, 7), 1], [w(6, 0), 0.3], [w(6, 7), -0.5], [w(6, 10), -0.9], [VUELTA, 1.5]] });
// la semana: la fecha se fija en el jueves; con el plazo secreto se desliza día a día
E.obj('sem2', 'dias', { t0: N[1].S - 0.05, t1: fin(2) - 0.2, sale: 0.2, x: P2, y: -470, gap: 70, pop: true,
  luz: [[N[1].S, 1], [w(5, 2), 1], [w(5, 4), 3, 'inout'], [w(6, 6), 3], [w(6, 7) + 0.25, 4, 'inout'], [w(6, 9) + 0.1, 5, 'inout'], [w(6, 12) + 0.3, 6, 'inout'], [VUELTA, 6], [VUELTA + 0.35, 3, 'out']],
  caja: [-240, -32, 480, 64] });
const rotF = (id, t0, t1, texto, col) => E.obj(id, 'rotulo', { t0, t1, entra: 0.12, sale: 0.1, x: P2, y: -395, size: 28, pop: true, texto, col, caja: [-170, -17, 340, 34] });
rotF('rotF1', w(5, 4) - 0.05, w(6, 1) - 0.05, 'FECHA DE ENTREGA', AM);
rotF('rotF2', w(6, 1) + 0.08, w(6, 7) - 0.05, 'SOLO TÚ', GRIS);
rotF('rotF3', w(6, 7) + 0.08, VUELTA - 0.05, 'SE MUEVE', ROJO);
rotF('rotF4', VUELTA + 0.08, fin(2) - 0.2, 'FECHA DE ENTREGA', AM);
E.obj('entrega', 'relleno', { t0: N[1].S - 0.1, t1: fin(2), x: P2, y: -270, w: 380, h: 46, pop: true, sobrevive: true, r: 60,
  f: [[w(5, 2), 0], [w(5, 6) + 0.3, 1, 'out'], [w(6, 6), 1], [w(6, 12) + 0.3, 0.12, 'inout'], [VUELTA, 0.12], [VUELTA + 0.45, 1, 'out']],
  barrido: [w(5, 6) + 0.35, VUELTA + 0.5], caja: [-190, -23, 380, 46] });
E.sfx(w(5, 2), 'fill'); E.sfx(w(6, 7), 'whoosh'); E.sfx(VUELTA, 'fill');
E.obj('chF', 'chispas', { t0: w(5, 6) + 0.3, t1: w(5, 6) + 1.1, x: P2, y: -270, r0: 110, r1: 210, inspeccion: false });
E.golpe(w(5, 6) + 0.3, 0.04);
// «que alguien espere»: alguien (gris) espera la entrega; con el plazo secreto no hay nadie
const espera = (id, t0, t1) => { E.figura(id, { t0, t1, sale: 0.25, x: 405, talla: 300, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [t0 + 0.4, 'ofrecer']], sonrisa: 0.8 });
  E.obj('boca_' + id, 'bocadillo', { t0: t0 + 0.25, t1: t1 - 0.1, sale: 0.2, x: 395, y: -372, w: 120, h: 60, on: 1, pop: true, caja: [-60, -30, 120, 86] }); };
espera('al1', w(5, 8) - 0.15, w(6, 2));
espera('al2', VUELTA, fin(2));
E.temblor(w(6, 7), 10, 0.35);
E.obj('ch2', 'chispas', { t0: VUELTA + 0.45, t1: VUELTA + 1.25, x: P2, y: -270, r0: 110, r1: 210, inspeccion: false });
E.golpe(VUELTA + 0.45, 0.04); E.destello(VUELTA + 0.45, 0.1);

// ---------- 3 · trabaja por bloques, con hora de fin ----------
// 7: La(0) tercera(1) trabaja(2) por(3) bloques(4) con(5) hora(6) de(7) fin(8)
// 8: Una(0) hora(1) sin(2) móvil(3) Suena(4) la(5) alarma(6) y(7) paras(8)
E.numero(3, N[2].T, N[2].S, { desde: 'entrega', hacia: 'bloq' });
const P3 = 110;
const ALARMA = w(8, 6);
E.figura('yoP3', { t0: N[2].S - 0.1, t1: TC, x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(7, 2), 'coger'], [w(7, 4), 'senalar'], [w(7, 6), 'pensar'], [w(8, 0), 'coger'], [w(8, 2), 'apartarse'], [w(8, 3) + 0.3, 'coger'], [ALARMA, 'levantar'], [w(8, 8), 'celebrar']],
  sonrisa: [[0, 0.2], [w(7, 4), 0.7], [w(8, 0), 0.4], [ALARMA, 1], [w(8, 8), 1.5]] });
// el trabajo se parte en bloques; el primero se marca cuando suena la alarma
E.obj('bloq', 'bloques', { t0: N[2].S - 0.1, t1: TC, x: P3, y: -445, n: 4, w: 430, h: 76, pop: true,
  parte: [[w(7, 3), 0], [w(7, 4) + 0.35, 1, 'inout']], hechos: [[ALARMA, 0], [ALARMA + 0.4, 1, 'out']], caja: [-215, -48, 430, 96] });
E.sfx(w(7, 3), 'whoosh');
E.obj('rotFin', 'rotulo', { t0: w(7, 6) - 0.1, t1: TC, x: P3 - 70, y: -345, texto: 'HORA DE FIN', size: 28, col: AM, pop: true, caja: [-120, -17, 240, 34] });
E.obj('reloj', 'temporizador', { t0: w(7, 5), t1: TC, x: P3 - 70, y: -180, r: 96, texto: '1', sub: 'HORA', pop: true,
  p: [[w(8, 0), 0], [ALARMA, 1, 'lin']], hecho: [[w(8, 8), 0], [w(8, 8) + 0.35, 1, 'out']], caja: [-112, -112, 224, 224] });
E.sfx(w(8, 0), 'fill');
// «sin móvil»: el móvil llega con avisos y se apaga
E.obj('movil', 'telefono', { t0: w(8, 2) - 0.1, t1: TC, x: 345, y: -150, w: 120, h: 210, pop: true,
  avisos: [[w(8, 2), 3], [w(8, 3), 3], [w(8, 3) + 0.25, 0, 'lin']], vibra: [[w(8, 2), 1], [w(8, 3), 1], [w(8, 3) + 0.2, 0]], brillo: [[w(8, 3), 1], [w(8, 3) + 0.3, 0]],
  luz: [[0, 1], [w(8, 3), 1], [w(8, 3) + 0.35, 0.4]], caja: [-60, -105, 120, 210] });
// «Suena la alarma»: ondas alrededor del temporizador; «y paras»: se cierra con el visto
[0, 1, 2].forEach(i => E.obj('ring' + i, 'pulso', { t0: ALARMA + i * 0.16, t1: ALARMA + i * 0.16 + 0.6, x: P3 - 70, y: -180, r0: 100, r1: 190, inspeccion: false }));
E.sfx(ALARMA, 'ding'); E.sfx(ALARMA + 0.16, 'ding'); E.sfx(ALARMA + 0.32, 'ding');
E.temblor(ALARMA, 10, 0.4); E.golpe(ALARMA, 0.04);
E.obj('ch3', 'chispas', { t0: w(8, 8) + 0.3, t1: w(8, 8) + 1.1, x: P3 - 70, y: -180, r0: 120, r1: 220, inspeccion: false });
E.destello(w(8, 8) + 0.3, 0.12);

// ---------- cierre: resumen y envío ----------
// 9: No(0) es(1) trabajar(2) más(3) es(4) no(5) dejar(6) que(7) el(8) trabajo(9) se(10) estire(11)
// 10: Mándaselo(0) a(1) ese(2) amigo(3) que(4) siempre(5) lo(6) entrega(7) a(8) última(9) hora(10)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(9, 4), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, items: ['Menos tiempo', 'Fecha fijada', 'Hora de fin'], gap: 270,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(9, 4), w(9, 9)], caja: [-400, -60, 800, 200] });
E.obj('confC', 'confeti', { t0: wf(9, -1), t1: wf(9, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(9, -1), 0.22); E.golpe(wf(9, -1), 0.04);
E.figura('yoF', { t0: w(10, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(10, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(10, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(10, 10)], vuelo: [[wf(10, -1), 0], [wf(10, -1) + 0.5, 1, 'in']] });
