// L4 · Cinco formas de dejar de procrastinar hoy mismo (estilo B, pulso de B-R2; regla 15: satisfying)
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, progreso: { n: 5, estilo: 'puntos', aparece: w(1, 0), gap: 70, y: 360 } });

const N = [2, 5, 8, 11, 14].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;           // las piezas de un punto se van al oscurecer
const TC = w(17, 0) - 0.1;

E.camara([
  [0, [0, -380, 1]], [w(0, 6), [20, -390, 1.05]], [N[0].T, [20, -390, 1.05]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 4), [30, -390, 1.06]], [N[1].T, [30, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [N[2].T, [0, -385, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [N[3].T, [10, -385, 1.05]],
  [N[3].S - 0.05, [0, -380, 1], 'lin'], [N[4].T, [0, -385, 1.05]],
  [N[4].S - 0.05, [0, -380, 1], 'lin'], [TC, [0, -390, 1.05]],
]);

// ---------- gancho: la tarea aplazada y el contador de «mañana» ----------
E.figura('yo', { t0: 0, t1: fin(0), x: -310, cara: true, poses: [[0, 'triste'], [w(0, 6), 'senalar'], [w(1, 0), 'de_pie']], sonrisa: [[0, -0.5], [w(0, 6), -0.5], [w(0, 7), 1]] });
E.obj('tarea', 'bloques', { t0: 0, t1: fin(0), x: 120, y: -330, n: 1, w: 380, h: 220, texto: 'TAREA', hechos: [[w(0, 6), 0], [w(0, 7) + 0.1, 1]], caja: [-190, -110, 380, 220], sobrevive: true, r: 90 });
E.obj('aplazada', 'rotulo', { t0: 0.2, t1: w(0, 6), x: 120, y: -120, texto: 'APLAZADA', caja: [-80, -16, 160, 32] });
E.obj('dias', 'contador', { t0: 0.2, t1: w(0, 6), x: 120, y: -175, v: [[0.3, 1], [w(0, 6) - 0.2, 37, 'in']], suf: ' días', size: 58, col: 'txt', caja: [-120, -34, 240, 68] });
E.obj('chH', 'chispas', { t0: w(0, 7), t1: w(0, 7) + 0.8, x: 120, y: -330, r0: 130, r1: 230, inspeccion: false });
E.golpe(w(0, 7), 0.05);
E.obj('pulso3', 'pulso', { t0: w(1, 2), t1: w(1, 2) + 0.7, capa: 'pantalla', x: 540, y: 360, r0: 10, r1: 46, inspeccion: false, sinDim: true });

// ---------- 1 · cinco minutos feos: el reloj se llena y los minutos siguen sumando ----------
E.numero(1, N[0].T, N[0].S, { desde: 'tarea', hacia: 'reloj' });
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -360, cara: true, toca: ['mesa1'], poses: [[0, 'escribir']] });
E.obj('mesa1', 'escritorio', { t0: N[0].S - 0.1, t1: fin(1), x: -80, brillo: [[w(3, 7), 0], [w(3, 9), 1]], refl: true, inspeccion: false, caja: [-330, -400, 500, 400] });
E.obj('reloj', 'temporizador', { t0: N[0].S - 0.1, t1: fin(1), x: 300, y: -330, r: 100, texto: '', sub: '', sobrevive: true,
  p: [[w(3, 5), 0], [w(4, 1), 1, 'lin'], [w(4, 4), 0], [wf(4, -1) + 0.6, 1, 'lin']], hecho: [[w(4, 1), 0], [w(4, 1) + 0.25, 0]], caja: [-114, -114, 228, 228] });
E.obj('min', 'contador', { t0: N[0].S + 0.1, t1: fin(1), x: 300, y: -335, v: [[w(3, 5), 0], [w(4, 1), 5, 'lin'], [w(4, 4), 5], [wf(4, -1) + 0.6, 25, 'inout']], suf: ' min', size: 54, col: 'txt', miles: false, inspeccion: false });
E.obj('ch1', 'chispas', { t0: w(4, 1), t1: w(4, 1) + 0.8, x: 300, y: -330, r0: 120, r1: 200, inspeccion: false });
E.obj('ch1b', 'chispas', { t0: wf(4, -1) + 0.6, t1: wf(4, -1) + 1.4, x: 300, y: -330, r0: 120, r1: 210, inspeccion: false });
E.golpe(w(4, 1), 0.04); E.golpe(wf(4, -1) + 0.6, 0.05);

// ---------- 2 · el móvil, a otra habitación: avisos que se disparan, se lo lleva y cierra la puerta ----------
E.numero(2, N[1].T, N[1].S, { desde: 'reloj', hacia: 'movil' });
const tCoge = w(6, 3), tLlega = w(6, 7), tDeja = w(6, 8) + 0.1, tVuelve = w(7, 0);
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), cara: true, toca: ['movil', 'puerta'],
  x: [[0, -320], [tCoge, -320], [tLlega, 150], [tVuelve, 150], [w(7, 7), -280]],
  dir: [[0, 1], [tVuelve - 0.01, 1], [tVuelve, -1], [w(7, 7), -1], [w(7, 7) + 0.01, 1]],
  poses: [[0, 'de_pie'], [w(6, 0), 'pensar'], [tCoge, 'andar'], [tLlega, 'ofrecer'], [tVuelve, 'andar'], [w(7, 7), 'celebrar'], [wf(7, -1) + 0.3, 'de_pie']],
  sonrisa: [[0, 0], [w(7, 7), 1.4]] });
E.obj('movil', 'telefono', { t0: N[1].S - 0.1, t1: tDeja + 0.3, w: 130, h: 230,
  x: [[0, -60], [tCoge, -60], [tCoge + 0.2, -250, 'out'], [tLlega, 220]], y: [[0, -330], [tCoge, -330], [tCoge + 0.2, -300], [tLlega, -300], [tDeja, -230]],
  avisos: [[w(5, 3), 0], [w(6, 2), 99, 'in']], vibra: [[w(5, 3), 0], [w(5, 3) + 0.2, 1], [tCoge, 1], [tCoge + 0.2, 0.3]], s: [[tLlega, 1], [tDeja, 0.6]], caja: [-65, -115, 130, 230], r: 70 });
E.obj('puerta', 'puerta', { t0: w(6, 0) - 0.2, t1: fin(2), x: 330, refl: true, p: [[w(6, 6), 0], [w(6, 7), 1], [tDeja, 1], [tDeja + 0.4, 0, 'in']], caja: [-100, -380, 200, 380] });
E.obj('chP', 'pulso', { t0: tDeja + 0.4, t1: tDeja + 1.1, x: 330, y: -190, r0: 60, r1: 200, inspeccion: false });
E.golpe(tDeja + 0.4, 0.035);

// ---------- 3 · trocéala: la tarea se parte y se tacha en cascada ----------
E.numero(3, N[2].T, N[2].S);
E.figura('yo3', { t0: N[2].S - 0.1, t1: fin(3), x: -370, cara: true, poses: [[0, 'de_pie'], [w(9, 7), 'senalar'], [w(10, 0), 'ofrecer'], [wf(10, -1), 'celebrar']], sonrisa: [[w(10, 0), 0.6], [wf(10, -1), 1.5]] });
E.obj('trozos', 'bloques', { t0: N[2].S - 0.1, t1: fin(3), x: 90, y: -330, n: 6, w: 560, h: 120, texto: 'INFORME', sobrevive: true, r: 80,
  parte: [[w(9, 6), 0], [w(9, 8), 1]], hechos: [[w(9, 10), 0], [w(9, 10) + 0.3, 1], [w(10, 0), 1], [wf(10, -1), 6, 'in']], caja: [-280, -70, 560, 140] });
E.obj('cuenta3', 'contador', { t0: w(9, 9), t1: fin(3), x: 90, y: -170, v: [[w(9, 10), 0], [w(9, 10) + 0.3, 1], [w(10, 0), 1], [wf(10, -1), 6, 'in']], suf: ' / 6', size: 60, col: 'txt', miles: false, sfx: false, caja: [-110, -36, 220, 72] });
E.obj('ch3', 'chispas', { t0: wf(10, -1), t1: wf(10, -1) + 0.8, x: 90, y: -330, r0: 200, r1: 320, n: 16, inspeccion: false });
E.golpe(wf(10, -1), 0.05);

// ---------- 4 · una sola pestaña: se cierran una a una ----------
E.numero(4, N[3].T, N[3].S, { desde: 'trozos', hacia: 'monitor' });
E.figura('yo4', { t0: N[3].S - 0.1, t1: fin(4), x: -360, cara: true, poses: [[0, 'de_pie'], [w(12, 0), 'senalar'], [w(13, 0), 'pensar'], [w(13, 8), 'celebrar']], sonrisa: [[w(13, 7), 0.3], [w(13, 8), 1.4]] });
E.obj('monitor', 'pestanas', { t0: N[3].S - 0.1, t1: fin(4), x: 110, y: -150, w: 470, h: 300, max: 14, n: [[0, 14], [w(12, 0), 14], [w(12, 9), 1, 'inout']], refl: true, r: 90, oy: -150, sobrevive: true, caja: [-235, -300, 470, 340] });
E.obj('maraña4', 'maraña', { t0: w(13, 0), t1: fin(4), x: -220, y: -520, r: 42, p: [[w(13, 0), 0], [w(13, 4), 1], [w(13, 6), 1], [wf(13, -1), 0]], caja: [-65, -40, 130, 80] });
E.obj('ch4', 'chispas', { t0: w(12, 9), t1: w(12, 9) + 0.8, x: 110, y: -300, r0: 170, r1: 280, inspeccion: false });

// ---------- 5 · para a mitad de frase: hoy se queda a medias; mañana se completa de un tirón ----------
E.numero(5, N[4].T, N[4].S, { desde: 'monitor', hacia: 'barra' });
E.figura('yo5', { t0: N[4].S - 0.1, t1: TC, x: -360, cara: true, poses: [[0, 'de_pie'], [w(15, 4), 'senalar'], [w(16, 0), 'de_pie'], [w(16, 3), 'celebrar']], sonrisa: [[w(16, 3), 0.4], [w(16, 4), 1.5]] });
E.obj('barra', 'relleno', { t0: N[4].S - 0.1, t1: TC, x: 100, y: -330, w: 470, h: 60, pct: true, r: 70,
  rotulo: [[0, 'HOY'], [w(16, 0), 'MAÑANA']], f: [[w(15, 0), 0], [w(15, 6), 0.6], [w(16, 2), 0.6], [wf(16, -1), 1, 'inout']], cursor: [[w(15, 6), 0], [w(15, 6) + 0.05, 1], [w(16, 2), 1], [w(16, 2) + 0.05, 0]], caja: [-235, -70, 600, 110] });
E.obj('ch5', 'chispas', { t0: wf(16, -1), t1: wf(16, -1) + 0.8, x: 335, y: -330, r0: 40, r1: 140, inspeccion: false });
E.golpe(wf(16, -1), 0.05);
E.sfx(w(15, 0), 'fill'); E.sfx(w(16, 2), 'fill');

// ---------- cierre: resumen de los cinco, guardar y seguir ----------
E.obj('resumen', 'resumen', { t0: TC, t1: w(18, 0), capa: 'pantalla', x: 540, y: 960, items: ['5 min', 'Móvil', 'Trocea', '1 pestaña', 'A medias'], gap: 190,
  p: [[TC, 0], [TC + 1.0, 5, 'lin']], guardar: [[TC + 0.9, 0], [TC + 1.2, 1]], lleno: [[w(17, 7), 0], [w(17, 8), 1]], caja: [-430, -60, 860, 300] });
E.figura('yoF', { t0: w(18, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(18, 1), 'senalar']] });
E.obj('seguir', 'seguir', { t0: w(18, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true });
