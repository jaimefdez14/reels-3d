// L48 · La ley de Parkinson (estilo B; reglas 15, 19, 20, 21, 24)
// Idea visual: la semana de siete días pasa casi vacía y el trabajo se dispara la víspera; la ley: el trabajo se estira
// hasta llenar todo el tiempo (bloques que se rellenan, año que rueda hasta 1955). Tres reglas: el plazo baja de cinco a
// tres días (contador y aro), una fecha con alguien esperando (compromiso que se vacía si la fecha se mueve en secreto)
// y un bloque con hora de fin (el aro se llena, suena la alarma, el móvil se apaga).
// Regla 20: «Aún tengo tiempo.» va en bocadillo del muñeco; la voz solo narra.
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
  [0, [0, -380, 1.04]], [w(0, 7), [0, -385, 1.07]], [w(0, 9) + 0.5, [0, -380, 1.03]], [w(1, 0), [0, -380, 1.02]], [w(1, 12), [20, -375, 1.05]],
  [w(2, 0), [0, -380, 1.03]], [N[0].T, [0, -390, 1.06]], [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(3, 7), [-15, -385, 1.04]],
  [w(4, 4), [10, -385, 1.06]], [N[1].T, [0, -390, 1.06]], [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(5, 6), [15, -385, 1.04]],
  [w(6, 1), [-10, -380, 1.02]], [w(6, 8), [10, -385, 1.05]], [N[2].T, [0, -390, 1.05]], [N[2].S - 0.05, [0, -380, 1], 'lin'],
  [w(7, 5), [-10, -385, 1.04]], [w(8, 0), [10, -380, 1.03]], [w(8, 6), [0, -385, 1.06]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Tienes(0) una(1) semana(2) para(3) entregarlo(4) y(5) lo(6) acabas(7) la(8) víspera(9)   [bocadillo «Aún tengo tiempo.»]
// 1: Se(0) llama(1) ley(2) de(3) Parkinson(4) por(5) el(6) historiador(7) que(8) la(9) formuló(10) en(11) 1955(12) el(13) trabajo(14) se(15) alarga(16) hasta(17) ocupar(18) todo(19) el(20) tiempo(21) disponible(22)
// 2: Tres(0) reglas(1) para(2) usarla(3) a(4) tu(5) favor(6)
E.figura('yo', { t0: 0, t1: fin(0), x: -335, cara: true,
  poses: [[0, 'de_pie'], [w(0, 1), 'ofrecer'], [w(0, 7), 'encoger'], [w(0, 9), 'manos_cabeza'], [wf(0, -1) + 0.4, 'de_pie'], [w(1, 2), 'senalar'],
    [w(1, 6), 'ofrecer'], [w(1, 13), 'pensar'], [w(1, 19), 'manos_cabeza'], [w(2, 0), 'ofrecer'], [w(2, 3), 'celebrar']],
  sonrisa: [[0, 0.3], [w(0, 1), 0.8], [w(0, 7), -0.6], [w(0, 9), -1.2], [w(1, 0), 0.1], [w(1, 19), -0.5], [w(2, 3), 1.4]] });
// la semana: una luz recorre los días sin hacer nada; la víspera, el trabajo se dispara del 8 al 100 %
E.obj('dias0', 'dias', { t0: w(0, 1) - 0.05, t1: w(1, 0) - 0.1, sale: 0.25, x: 130, y: -330, letras: ['L', 'M', 'X', 'J', 'V', 'S', 'D'], gap: 78, pop: true,
  luz: [[w(0, 1), -1], [w(0, 2), 0], [w(0, 4), 3, 'lin'], [w(0, 7), 3.4], [w(0, 9), 5, 'out']], caja: [-264, -32, 528, 64] });
E.obj('ent0', 'rotulo', { t0: w(0, 4), t1: w(1, 0) - 0.1, sale: 0.2, x: 364, y: -395, texto: 'ENTREGA', size: 24, col: '#e6ce46', pop: true, caja: [-70, -15, 140, 30] });
E.obj('trab0', 'relleno', { t0: w(0, 2), t1: w(1, 0) - 0.1, sale: 0.25, x: 100, y: -200, w: 380, h: 48, pop: true, pct: true,
  rotulo: [[0, 'TRABAJO HECHO'], [w(0, 8), '¡TRABAJO HECHO!']],
  f: [[w(0, 2), 0], [w(0, 3), 0.06, 'out'], [w(0, 7), 0.08], [w(0, 9) + 0.9, 1, 'in']], barrido: [w(0, 9) + 0.95], caja: [-190, -60, 470, 90] });
E.obj('aun', 'bocadillo', { t0: w(0, 1), t1: w(0, 7), sale: 0.2, x: -60, y: -465, w: 360, h: 76, texto: 'Aún tengo tiempo.', size: 28, on: 1, pop: true, caja: [-180, -38, 360, 100] });
E.temblor(w(0, 9) + 0.5, 12, 0.4); E.golpe(w(0, 9), 0.04); E.destello(w(0, 9) + 0.9, 0.12);
// la ley: nombre, año que rueda y bloques que se rellenan hasta ocupar todo el tiempo
E.obj('ley', 'rotulo', { t0: w(1, 2), t1: w(2, 0) - 0.1, sale: 0.2, x: 130, y: -525, texto: 'LEY DE PARKINSON', size: 34, col: '#e6ce46', pop: true, caja: [-230, -22, 460, 44] });
E.obj('anio', 'contador', { t0: w(1, 5), t1: w(2, 0) - 0.1, sale: 0.2, x: 130, y: -440, pop: true, size: 74, miles: false,
  v: [[w(1, 5), 1900], [w(1, 5) + 0.3, 1900], [w(1, 12) + 0.5, 1955, 'inout']], barrido: [w(1, 12) + 0.55], caja: [-130, -42, 260, 84] });
E.obj('estira', 'bloques', { t0: w(1, 13), t1: w(2, 0) - 0.1, sale: 0.2, x: 130, y: -280, n: 7, w: 520, h: 80, parte: 1, pop: true,
  hechos: [[w(1, 14), 0], [w(1, 21) + 0.1, 7, 'inout']], barrido: [w(1, 21) + 0.3], caja: [-260, -45, 520, 90] });
E.obj('rotEst', 'rotulo', { t0: w(1, 13), t1: w(2, 0) - 0.1, sale: 0.2, x: 130, y: -355, size: 24, col: '#c9ccca', pop: true,
  texto: [[0, 'EL TIEMPO QUE TIENES'], [w(1, 16), 'EL TRABAJO LO OCUPA']], caja: [-210, -15, 420, 30] });
E.obj('chE', 'chispas', { t0: w(1, 21) + 0.3, t1: w(1, 21) + 1.1, x: 130, y: -280, r0: 90, r1: 200, inspeccion: false });
E.golpe(w(1, 12) + 0.5, 0.03); E.golpe(w(1, 21) + 0.3, 0.04);
// las tres reglas: lista que se marca; es el objeto que se convierte en la moneda 1
E.obj('reglas', 'lista', { t0: w(2, 0), t1: N[0].T + 0.1, sale: 0.2, x: 140, y: -330, n: 3, w: 320, gap: 100, pop: true, sobrevive: true,
  p: [[w(2, 0), 0], [w(2, 1), 1, 'out'], [w(2, 2) + 0.2, 2, 'out'], [w(2, 3) + 0.3, 3, 'out']], brillo: [[w(2, 3), 0], [w(2, 6), 3, 'lin']], barrido: [w(2, 3) + 0.2], caja: [-160, -135, 320, 270] });
E.obj('chR', 'chispas', { t0: w(2, 3) + 0.3, t1: w(2, 3) + 1.1, x: 140, y: -330, r0: 90, r1: 190, inspeccion: false });
E.destello(w(2, 3) + 0.3, 0.1);

// ---------- 1 · dale menos tiempo del que crees: de cinco días a tres ----------
// 3: La(0) primera(1) dale(2) menos(3) tiempo(4) del(5) que(6) crees(7)
// 4: Si(0) calculas(1) cinco(2) días(3) concédete(4) tres(5)
E.numero(1, N[0].T, N[0].S, { desde: 'reglas', hacia: 'plazo1' });
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -370, cara: true,
  poses: [[0, 'de_pie'], [w(3, 2), 'coger'], [w(3, 5), 'ofrecer'], [w(4, 2), 'senalar'], [w(4, 4), 'meter'], [w(4, 5), 'de_pie'], [wf(4, -1) - 0.2, 'celebrar']],
  sonrisa: [[w(3, 2), 0.4], [w(4, 2), 0.2], [w(4, 4), 0.6], [wf(4, -1) - 0.2, 1.5]] });
E.obj('plazo1', 'temporizador', { t0: N[0].S - 0.1, t1: fin(1), x: 150, y: -400, r: 95, texto: ' ', sub: ' ', pop: true, sobrevive: true,
  p: [[N[0].S, 0], [w(3, 7) + 0.3, 1, 'inout'], [w(4, 4), 1], [w(4, 4) + 0.7, 0.6, 'inout']],
  hecho: [[0, 0], [w(4, 5) + 0.25, 0], [w(4, 5) + 0.55, 1, 'out']], barrido: [w(4, 5) + 0.6], caja: [-110, -110, 220, 220] });
E.obj('rot1', 'rotulo', { t0: N[0].S, t1: fin(1), x: 150, y: -545, size: 26, col: '#c9ccca', pop: true,
  texto: [[0, 'EL TIEMPO QUE CREES'], [w(4, 4), 'EL TIEMPO QUE TE DAS']], caja: [-230, -16, 460, 32] });
E.obj('cuenta1', 'contador', { t0: w(3, 5), t1: fin(1), x: 150, y: -235, pop: true, suf: ' días', size: 64, col: 'txt',
  v: [[w(3, 5), 0], [w(4, 2) + 0.4, 5, 'out'], [w(4, 4), 5], [w(4, 4) + 0.7, 3, 'inout']], barrido: [w(4, 5) + 0.6], caja: [-150, -36, 300, 72] });
E.obj('blk1', 'bloques', { t0: w(3, 7), t1: fin(1), x: 150, y: -100, n: 5, w: 460, h: 56, parte: 1, pop: true,
  hechos: [[w(4, 2), 0], [w(4, 3) + 0.5, 5, 'out'], [w(4, 4), 5], [w(4, 4) + 0.7, 3, 'inout']], caja: [-230, -34, 460, 68] });
E.sfx(w(4, 2), 'fill');
E.golpe(w(4, 4) + 0.7, 0.04);
E.obj('ch1', 'chispas', { t0: w(4, 5) + 0.55, t1: w(4, 5) + 1.35, x: 150, y: -400, r0: 100, r1: 210, inspeccion: false });
E.destello(w(4, 5) + 0.55, 0.12);

// ---------- 2 · fija una fecha de entrega que alguien espere ----------
// 5: La(0) segunda(1) fija(2) una(3) fecha(4) de(5) entrega(6) que(7) alguien(8) espere(9)
// 6: Un(0) plazo(1) que(2) solo(3) conoces(4) tú(5) se(6) mueve(7) sin(8) que(9) nadie(10) se(11) entere(12)
E.numero(2, N[1].T, N[1].S, { desde: 'plazo1', hacia: 'cal2' });
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -340, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'senalar'], [w(5, 7), 'ofrecer'], [w(6, 0), 'pensar'], [w(6, 6), 'encoger'], [w(6, 8), 'apartarse'], [wf(6, -1), 'de_pie']],
  sonrisa: [[w(5, 2), 0.5], [w(5, 9), 1.2], [w(6, 0), 0.2], [w(6, 6), -0.5], [w(6, 8), 0.2]] });
E.figura('otro', { t0: w(5, 7) - 0.15, t1: fin(2), x: 410, dir: -1, color: 'gris', cara: true,
  poses: [[0, 'de_pie'], [w(5, 9) - 0.1, 'ofrecer'], [w(6, 0), 'de_pie'], [w(6, 8), 'pensar']],
  sonrisa: [[0, 0.1], [w(5, 9), 0.4], [w(6, 8), 0]] });
E.obj('cal2', 'dias', { t0: N[1].S - 0.1, t1: fin(2), x: 20, y: -380, letras: ['L', 'M', 'X', 'J', 'V', 'S', 'D'], gap: 70, pop: true, sobrevive: true,
  luz: [[w(5, 2), -1], [w(5, 4), 4, 'out'], [w(6, 6), 4], [w(6, 9), 6, 'inout']], barrido: [w(5, 6)], caja: [-240, -32, 480, 64] });
E.obj('marca2', 'rotulo', { t0: w(5, 4), t1: fin(2), x: [[0, 90], [w(6, 6), 90], [w(6, 9), 230, 'inout']], y: -450, texto: 'ENTREGA', size: 24, col: '#e6ce46', pop: true, caja: [-70, -15, 140, 30] });
E.obj('pu2', 'pulso', { t0: w(5, 4) + 0.15, t1: w(5, 4) + 0.8, x: 90, y: -380, r0: 30, r1: 100, inspeccion: false });
E.golpe(w(5, 4) + 0.2, 0.03);
E.obj('comp2', 'relleno', { t0: w(5, 5), t1: fin(2), x: 0, y: -230, w: 300, h: 46, pop: true, pct: true, rotulo: 'COMPROMISO',
  f: [[w(5, 5), 0], [w(5, 9) + 0.45, 1, 'out'], [w(6, 6), 1], [w(6, 12) + 0.3, 0.15, 'inout']], barrido: [w(5, 9) + 0.5], caja: [-170, -60, 430, 90] });
E.sfx(w(5, 5), 'fill');
E.obj('sol2', 'rotulo', { t0: w(6, 2), t1: w(6, 9) - 0.05, sale: 0.15, x: 20, y: -130, texto: 'SOLO LO SABES TÚ', size: 26, col: '#c9ccca', pop: true, caja: [-170, -16, 340, 32] });
E.obj('chC', 'chispas', { t0: w(5, 9) + 0.5, t1: w(5, 9) + 1.3, x: 20, y: -230, r0: 70, r1: 160, inspeccion: false });
E.obj('menos2', 'rotulo', { t0: w(6, 9), t1: fin(2), x: 20, y: -130, texto: '− COMPROMISO', size: 30, col: ROJO, pop: true, caja: [-150, -18, 300, 36] });
E.temblor(w(6, 7), 10, 0.35);

// ---------- 3 · trabaja por bloques, con hora de fin ----------
// 7: La(0) tercera(1) trabaja(2) por(3) bloques(4) con(5) hora(6) de(7) fin(8)
// 8: Una(0) hora(1) sin(2) móvil(3) Suena(4) la(5) alarma(6) y(7) paras(8)
E.numero(3, N[2].T, N[2].S, { desde: 'cal2', hacia: 'bloq3' });
E.figura('yo3', { t0: N[2].S - 0.1, t1: TC, x: -380, cara: true,
  poses: [[0, 'de_pie'], [w(7, 2), 'coger'], [w(7, 3), 'ofrecer'], [w(7, 6), 'senalar'], [w(8, 0), 'senalar'], [w(8, 2), 'apartarse'], [w(8, 3) + 0.2, 'meter'],
    [w(8, 4), 'levantar'], [w(8, 7), 'de_pie'], [w(8, 8), 'celebrar']],
  sonrisa: [[w(7, 2), 0.4], [w(8, 2), 0.2], [w(8, 4), 0.8], [w(8, 8), 1.5]] });
E.obj('bloq3', 'bloques', { t0: N[2].S - 0.1, t1: TC, x: 150, y: [[0, -300], [w(8, 0) - 0.2, -300], [w(8, 0) + 0.4, -120, 'inout']], n: 3, w: 470, h: 80, pop: true,
  parte: [[0, 0], [w(7, 3), 0], [w(7, 4) + 0.4, 1, 'inout']], hechos: [[0, 0], [w(8, 7) + 0.2, 0], [w(8, 8) + 0.4, 1, 'out']], barrido: [w(8, 8) + 0.45], caja: [-235, -45, 470, 90] });
E.obj('fin3', 'rotulo', { t0: w(7, 6), t1: w(8, 0) - 0.3, sale: 0.15, x: 150, y: -395, texto: 'HORA DE FIN', size: 28, col: '#e6ce46', pop: true, caja: [-130, -17, 260, 34] });
E.obj('pu3', 'pulso', { t0: w(7, 8) - 0.1, t1: w(7, 8) + 0.6, x: 360, y: -300, r0: 40, r1: 120, inspeccion: false });
E.golpe(w(7, 8), 0.03);
// una hora: el aro se llena, el móvil vibra y se apaga, suena la alarma y se marca el bloque
E.obj('hora3', 'temporizador', { t0: w(8, 0) - 0.1, t1: TC, x: 30, y: -410, r: 88, texto: '1', sub: 'HORA', pop: true,
  p: [[w(8, 0), 0], [w(8, 4) + 0.1, 1, 'inout']], hecho: [[0, 0], [w(8, 8), 0], [w(8, 8) + 0.3, 1, 'out']], barrido: [w(8, 8) + 0.35], caja: [-102, -102, 204, 204] });
E.obj('tel3', 'telefono', { t0: w(8, 0) - 0.1, t1: TC, x: 300, y: -390, w: 120, h: 220, pop: true,
  brillo: [[0, 1], [w(8, 2), 1], [w(8, 3) - 0.1, 0, 'out']], vibra: [[w(8, 0), 0], [w(8, 1) + 0.1, 0.9], [w(8, 2), 0.9], [w(8, 2) + 0.35, 0]],
  avisos: [[w(8, 0), 3], [w(8, 1) + 0.2, 8, 'out'], [w(8, 2) + 0.1, 0]], caja: [-60, -110, 120, 220] });
E.obj('sinMov', 'rotulo', { t0: w(8, 2), t1: TC, x: 300, y: -250, texto: 'SIN MÓVIL', size: 26, col: '#e6ce46', pop: true, caja: [-110, -16, 220, 32] });
E.obj('alarma1', 'pulso', { t0: w(8, 4), t1: w(8, 4) + 0.7, x: 30, y: -410, r0: 100, r1: 220, inspeccion: false });
E.obj('alarma2', 'pulso', { t0: w(8, 4) + 0.22, t1: w(8, 4) + 0.9, x: 30, y: -410, r0: 100, r1: 220, inspeccion: false });
E.temblor(w(8, 4), 14, 0.5); E.sfx(w(8, 4), 'ding');
E.obj('chB', 'chispas', { t0: w(8, 8) + 0.3, t1: w(8, 8) + 1.1, x: 30, y: -410, r0: 90, r1: 200, inspeccion: false });
E.destello(w(8, 8) + 0.3, 0.12); E.golpe(w(8, 8) + 0.3, 0.04);

// ---------- cierre: resumen y envío ----------
// 9: No(0) es(1) trabajar(2) más(3) es(4) no(5) dejar(6) que(7) el(8) trabajo(9) se(10) estire(11)
// 10: Mándaselo(0) a(1) ese(2) amigo(3) que(4) siempre(5) lo(6) entrega(7) a(8) última(9) hora(10)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(9, 6), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, items: ['Menos plazo', 'Alguien espera', 'Hora de fin'], gap: 290,
  p: [[TC, 0], [TC + 1.2, 3, 'lin']], barrido: [w(9, 4), w(9, 9)], caja: [-430, -60, 860, 200] });
E.obj('confC', 'confeti', { t0: wf(9, -1), t1: wf(9, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(9, -1), 0.22); E.golpe(wf(9, -1), 0.04); E.golpe(w(9, 4), 0.025);
E.figura('yoF', { t0: w(10, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(10, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(10, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(10, 9)], vuelo: [[wf(10, -1), 0], [wf(10, -1) + 0.5, 1, 'in']] });
