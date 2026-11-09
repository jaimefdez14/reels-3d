// L5 · Cuatro frases para cobrar más si trabajas por tu cuenta (estilo B, pulso de B-R3 con dos personajes como B-R5; regla 15)
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'degradado', sub: 'dos', subY: 680, progreso: { n: 4, estilo: 'barras', aparece: w(1, 0), gap: 70 } });

const N = [2, 5, 8, 11].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(14, 0) - 0.1;

E.camara([
  [0, [0, -380, 1]], [N[0].T, [20, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [0, -385, 1.04]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [N[3].T, [30, -390, 1.05]],
  [N[3].S - 0.05, [0, -380, 1], 'lin'], [TC, [0, -390, 1.05]],
]);

// ---------- gancho: la etiqueta de precio sube rodando ----------
E.figura('yo', { t0: 0, t1: fin(0), x: -320, cara: true, poses: [[0, 'de_pie'], [w(0, 3), 'senalar'], [w(0, 5), 'celebrar'], [w(1, 0), 'de_pie']], sonrisa: [[w(0, 5), 0.5], [w(0, 6), 1.5]] });
E.obj('precio', 'etiqueta', { t0: 0, t1: fin(0), x: 130, y: -330, w: 340, h: 150, v: [[0.4, 300], [w(0, 5), 1200, 'inout']], on: [[0, 0], [w(0, 5), 1]], sobrevive: true, r: 80, caja: [-170, -75, 340, 150] });
E.obj('chH', 'chispas', { t0: w(0, 5), t1: w(0, 5) + 0.8, x: 130, y: -330, r0: 170, r1: 270, n: 14, inspeccion: false });
E.golpe(w(0, 5), 0.05);
E.obj('pulsoP', 'pulso', { t0: w(1, 2), t1: w(1, 2) + 0.7, capa: 'pantalla', x: 540 + 1.5 * 70, y: 360, r0: 12, r1: 46, inspeccion: false, sinDim: true });

// ---------- 1 · «¿Con qué presupuesto contáis?»: tu cifra se queda corta ----------
E.numero(1, N[0].T, N[0].S, { desde: 'precio', hacia: 'tag2' });
E.figura('yo2', { t0: N[0].S - 0.1, t1: fin(1), x: -340, cara: true, poses: [[0, 'de_pie'], [w(3, 0), 'senalar'], [w(4, 2), 'pensar'], [w(4, 8), 'celebrar']], sonrisa: [[w(4, 7), 0.3], [w(4, 8), 1.6]] });
E.figura('cli2', { t0: N[0].S - 0.1, t1: fin(1), x: 340, dir: -1, color: 'gris', poses: [[0, 'de_pie'], [w(3, 2), 'pensar'], [w(4, 2), 'ofrecer']] });
E.obj('tag2', 'etiqueta', { t0: N[0].S - 0.1, t1: fin(1), x: 0, y: -330, w: 300, h: 130, r: 70, sobrevive: true,
  v: [[0, 800], [w(4, 4), 800], [wf(4, -1), 1500, 'inout']], on: [[w(4, 4), 0], [w(4, 5), 1]], caja: [-150, -65, 300, 130] });
E.obj('rot2', 'rotulo', { t0: N[0].S, t1: fin(1), x: 0, y: -225, texto: [[0, 'TU IDEA'], [w(4, 5), 'SU PRESUPUESTO']], caja: [-130, -16, 260, 32] });
E.obj('ch2', 'chispas', { t0: wf(4, -1), t1: wf(4, -1) + 0.8, x: 0, y: -330, r0: 150, r1: 250, n: 14, inspeccion: false });
E.golpe(wf(4, -1), 0.05);

// ---------- 2 · «Son 1.200 €». Y te callas: la voz se apaga y el silencio cuenta ----------
E.numero(2, N[1].T, N[1].S, { desde: 'tag2', hacia: 'voz' });
E.figura('yo1', { t0: N[1].S - 0.1, t1: fin(2), x: -330, cara: true, poses: [[0, 'de_pie'], [w(6, 0), 'ofrecer'], [w(6, 4), 'de_pie'], [w(7, 6), 'celebrar']], sonrisa: [[w(6, 4), 0.4], [w(7, 6), 1.5]] });
E.figura('cli1', { t0: N[1].S - 0.1, t1: fin(2), x: 330, dir: -1, color: 'gris', poses: [[0, 'de_pie'], [w(7, 0), 'pensar'], [w(7, 6), 'senalar']] });
E.obj('voz', 'ondas', { t0: N[1].S - 0.1, t1: fin(2), x: -150, y: -400, n: 7, amp: [[w(6, 0), 0.1], [w(6, 0) + 0.2, 1], [w(6, 4), 1], [w(6, 5), 0]], r: 50, caja: [-90, -50, 180, 100] });
E.obj('silencio', 'contador', { t0: w(7, 0), t1: fin(2), x: 0, y: -260, v: [[w(7, 0), 0], [w(7, 6), 3, 'lin']], suf: ' s', size: 92, col: 'txt', miles: false, caja: [-100, -55, 200, 110] });
E.obj('ok', 'bocadillo', { t0: w(7, 6), t1: fin(2), x: 200, y: -560, w: 130, h: 84, texto: 'OK', size: 36, on: [[w(7, 6), 0], [w(7, 7), 1]], sobrevive: true, r: 50, caja: [-65, -42, 130, 110] });
E.obj('ch1', 'chispas', { t0: w(7, 7), t1: w(7, 7) + 0.8, x: 200, y: -560, r0: 70, r1: 140, inspeccion: false });
E.golpe(w(7, 7), 0.04);

// ---------- 3 · la versión completa: lo extra no se regala, sube de caja ----------
E.numero(3, N[2].T, N[2].S, { desde: 'ok', hacia: 'planes' });
E.figura('yo3', { t0: N[2].S - 0.1, t1: fin(3), x: -360, cara: true, toca: ['extra'], poses: [[0, 'de_pie'], [w(9, 0), 'ofrecer'], [w(9, 5), 'de_pie'], [w(10, 0), 'senalar'], [w(10, 5), 'celebrar']], sonrisa: [[w(10, 5), 1.5]] });
E.obj('planes', 'planes', { t0: N[2].S - 0.1, t1: fin(3), x: 110, items: ['BÁSICO', 'MEDIO', 'COMPLETO'], refl: true, r: 90, oy: -110, sel: [[0, -1], [w(8, 5), -1], [w(8, 6), 0], [w(8, 7), 2, 'lin'], [w(9, 0), 2], [w(9, 5), 0], [w(10, 0), 0], [w(10, 3), 2, 'inout']], caja: [-340, -220, 680, 280] });
E.obj('extra', 'pieza', { t0: w(9, 2), t1: fin(3), r: 30, texto: '+', libre: true,
  x: [[w(9, 2), -290], [w(9, 4), -290], [w(10, 2), 340, 'inout']], y: [[w(9, 2), -330], [w(9, 4), -330], [w(10, 0), -560], [w(10, 2), -130, 'in']], on: [[w(9, 4), 1], [w(9, 6), 0.3], [w(10, 0), 1]] });
E.obj('tag3', 'etiqueta', { t0: w(10, 5), t1: fin(3), x: 330, y: -320, w: 230, h: 96, pop: true, v: [[w(10, 5), 0], [wf(10, -1) + 0.4, 1800, 'out']], caja: [-115, -48, 230, 96] });
E.obj('ch3', 'chispas', { t0: wf(10, -1) + 0.4, t1: wf(10, -1) + 1.2, x: 330, y: -320, r0: 120, r1: 200, inspeccion: false });

// ---------- 4 · si cambia, lo hablamos: el alcance rebota lo que no está incluido ----------
E.numero(4, N[3].T, N[3].S, { desde: 'tag3', hacia: 'alcance' });
E.figura('yo4', { t0: N[3].S - 0.1, t1: TC, x: -400, cara: true, poses: [[0, 'de_pie'], [w(12, 0), 'senalar'], [w(13, 0), 'ofrecer'], [wf(13, -1) - 0.3, 'celebrar']], sonrisa: [[wf(13, -1) - 0.3, 1.5]] });
E.obj('alcance', 'anillo', { t0: N[3].S - 0.1, t1: TC, x: 110, y: -330, rx: 230, ry: 160, w: 5, chispa: false, rodea: true, r: 120,
  p: [[N[3].S, 0], [N[3].S + 0.8, 1, 'out']], caja: [-235, -165, 470, 330] });
['A', 'B', 'C'].forEach((k, i) => E.obj('dentro' + k, 'pieza', { t0: N[3].S + 0.3 + i * 0.15, t1: TC, x: 110 + (i - 1) * 90, y: -330, r: 32, pop: true, on: [[0, 0.35], [w(13, 0) + i * 0.2, 0.35], [w(13, 0) + i * 0.2 + 0.2, 1]], sfx: false }));
const golpes4 = [w(12, 5), w(12, 8), wf(12, -1) + 0.2];
golpes4.forEach((tg, i) => {
  const sx = i % 2 ? 400 : -270, sy = -540 + i * 90, ex = 110 + (i % 2 ? 235 : -235) * 0.92, ey = -330 + (i - 1) * 70;
  E.obj('fuera' + i, 'pieza', { t0: tg - 0.6, t1: tg + 0.8, sale: 0.25, r: 26, texto: '+', on: 0.3, libre: true, sfx: false,
    x: [[tg - 0.6, sx], [tg, ex, 'in'], [tg + 0.6, sx * 1.05, 'out']], y: [[tg - 0.6, sy], [tg, ey, 'in'], [tg + 0.6, sy - 40, 'out']] });
  E.obj('choque' + i, 'pulso', { t0: tg, t1: tg + 0.6, x: ex, y: ey, r0: 20, r1: 80, inspeccion: false });
  E.sfx(tg, 'thud');
});
E.obj('ch4', 'chispas', { t0: w(13, 0) + 0.6, t1: w(13, 0) + 1.4, x: 110, y: -330, r0: 260, r1: 340, n: 16, inspeccion: false });

// ---------- cierre: resumen (vuelve al gancho) y envío ----------
E.obj('resumen', 'resumen', { t0: TC, t1: w(15, 0), capa: 'pantalla', x: 540, y: 960, items: ['Pregunta', 'Calla', 'Versión', 'Encargo'], gap: 210,
  p: [[TC, 0], [TC + 0.9, 4, 'lin']], caja: [-420, -60, 840, 200] });
E.figura('yoF', { t0: w(15, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(15, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(15, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, vuelo: [[wf(15, -1), 0], [wf(15, -1) + 0.5, 1, 'in']] });
