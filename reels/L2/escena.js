// L2 · Cinco leyes que te ahorran años de errores en el trabajo (estilo B, molde de B-R5 + cierre de B-R4)
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'grafito', sub: 'una', subY: 650, progreso: { n: 5, estilo: 'linea', aparece: w(1, 0) - 0.3, gap: 92, y: 380 } });

const N = [1, 4, 7, 10, 13].map((li, k) => ({ T: w(li, 0) - 0.05, S: w(li, 1) - 0.12 }));
const TC = w(16, 0) - 0.1;

E.camara([
  [0, [0, -380, 1]], [N[0].T, [0, -385, 1.04]],
  [N[0].S - 0.05, [0, -370, 1], 'lin'], [N[1].T, [40, -380, 1.06]],
  [N[1].S - 0.05, [0, -370, 1], 'lin'], [N[2].T, [0, -380, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(9, 0), [0, -380, 1]], [N[3].T, [-20, -390, 1.06]],
  [N[3].S - 0.05, [0, -380, 1], 'lin'], [N[4].T, [0, -385, 1.05]],
  [N[4].S - 0.05, [0, -370, 1], 'lin'], [TC, [0, -380, 1.04]],
]);

// ---------- gancho: caen cinco puntos y se vuelven las cinco monedas numeradas sobre la cabeza ----------
E.figura('yo', { t0: 0, t1: N[0].T + 0.45, x: 0, poses: [[0, 'de_pie'], [w(0, 5), 'levantar'], [wf(0, -1), 'de_pie']] });
for (let i = 0; i < 5; i++) {
  const a = 0.25 + i * 0.22, x = (i - 2) * 92;
  E.obj('h' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? N[0].T + 0.1 : N[0].T + 0.45, entra: 0.2, x, y: -585, pop: true, r: [[a, 9], [w(0, 3), 9], [w(0, 3) + 0.4 + i * 0.08, 30, 'back']], n: [[0, ''], [w(0, 3) + 0.25 + i * 0.08, i + 1]], sobrevive: i === 0, sfx: false });
}

// ---------- 1 · Parkinson: el trabajo se estira ----------
E.numero(1, N[0].T, N[0].S, { desde: 'h1', hacia: 'barra1' });
E.figura('yo1', { t0: N[0].S - 0.1, t1: N[1].T + 0.45, x: -360, toca: ['barra1'],
  poses: [[0, 'de_pie'], [w(2, 0), 'senalar'], [w(2, 6), 'triste'], [w(3, 0), 'senalar'], [w(3, 5), 'celebrar'], [wf(3, -1) + 0.2, 'de_pie']] });
E.obj('barra1', 'barra', { t0: N[0].S - 0.1, t1: N[1].T + 0.45, x: 90, y: -330, h: 64, r: 60,
  w: [[0, 560], [w(3, 0), 560], [w(3, 2), 300]], f: [[0, 0.22], [w(2, 2), 0.22], [w(2, 9), 1, 'inout']], marcas: [], caja: [-280, -32, 560, 110] });
E.obj('rot1', 'rotulo', { t0: w(2, 0), t1: N[1].T + 0.45, x: 90, y: -430, texto: 'TAREA', caja: [-60, -16, 120, 32] });

// ---------- 2 · Hofstadter: todo tarda más ----------
E.numero(2, N[1].T, N[1].S, { desde: 'barra1', hacia: 'barra2' });
E.figura('yo2', { t0: N[1].S - 0.1, t1: N[2].T + 0.45, x: -360,
  poses: [[0, 'de_pie'], [w(5, 3), 'manos_cabeza'], [w(5, 7), 'triste'], [w(6, 0), 'pensar'], [w(6, 5), 'senalar']] });
E.obj('barra2', 'barra', { t0: N[1].S - 0.1, t1: N[2].T + 0.45, x: 90, y: -330, w: 560, h: 64, r: 60, rotMarca: 'PLAN',
  f: [[0, 0], [w(5, 0), 0], [w(5, 5), 0.85, 'inout'], [w(5, 7), 0.85], [wf(5, -1), 1], [w(6, 0), 1], [w(6, 0) + 0.3, 0], [w(6, 4), 0.62]],
  marca: [[0, 0.55], [w(5, 7), 0.55], [w(5, 9), 0.8], [w(6, 0) + 0.3, 0.55], [w(6, 5), 0.55], [wf(6, -1), 0.9]], caja: [-280, -100, 560, 160] });

// ---------- 3 · Hanlon: no es mala fe, es un despiste ----------
E.numero(3, N[2].T, N[2].S, { desde: 'barra2' });
E.figura('yo3', { t0: N[2].S - 0.1, t1: N[3].T + 0.45, x: -300,
  poses: [[0, 'de_pie'], [w(8, 0), { lean: 6, sf: 30, ef: 80, sb: -30, eb: -80, cab: 6 }], [w(9, 4), 'de_pie']] });
E.figura('otro', { t0: N[2].S - 0.1, t1: N[3].T + 0.45, x: 330, dir: -1, color: 'gris', toca: ['papeles'],
  poses: [[0, 'de_pie'], [w(8, 4), 'manos_cabeza'], [w(9, 4), 'encoger']] });
E.obj('enfado', 'maraña', { t0: w(8, 0), t1: N[3].T + 0.45, x: -165, y: -560, r: 62, col: '#8d9692', p: [[w(8, 0), 0], [w(8, 3), 1], [w(9, 4), 1], [wf(9, -1), 0]], caja: [-80, -50, 160, 100] });
E.obj('papeles', 'papeles', { t0: w(8, 4), t1: N[3].T + 0.45, x: 150, n: 9, k: [[w(8, 4), 0], [wf(8, -1), 9, 'out']], refl: true, caja: [-95, -160, 190, 160] });
E.obj('correo', 'bocadillo', { t0: w(9, 0), t1: N[3].T + 0.45, x: 150, y: -520, w: 150, h: 96, pop: true, sobrevive: true, r: 60, on: [[w(9, 4), 0], [wf(9, -1), 1]], caja: [-75, -48, 150, 122] });

// ---------- 4 · Zeigarnik: lo que dejas a medias ----------
E.numero(4, N[3].T, N[3].S, { desde: 'correo', hacia: 'bucle0' });
E.figura('yo4', { t0: N[3].S - 0.1, t1: N[4].T + 0.45, x: -300,
  poses: [[0, 'de_pie'], [w(11, 0), 'triste'], [w(12, 0), 'senalar'], [w(12, 3), 'celebrar'], [wf(12, -1) + 0.3, 'de_pie']] });
E.obj('lista', 'lista', { t0: w(12, 0) - 0.2, t1: N[4].T + 0.45, x: 160, y: -330, n: 3, w: 320, gap: 80, s: 1.3, pop: true, r: 60,
  p: [[w(12, 0) + 0.6, 0], [w(12, 0) + 1.6, 3, 'lin']], caja: [-160, -130, 320, 260] });
const orb = [[-430, -560], [-170, -585], [-140, -400]];
orb.forEach(([x, y], i) => {
  const ta = N[3].S + 0.2 + i * 0.3, tb = w(12, 0) + 0.3 + i * 0.33; const to = [160 - 160 + 18, -330 + (i - 1) * 80];
  E.obj('bucle' + i, 'arcoAbierto', { t0: ta, t1: tb + 0.5, sale: 0.2, r: 34, w: 7, p: [[ta, 0], [ta + 0.4, 0.72]], rot: [[ta, 0], [tb, 4 + i]],
    x: [[ta, x], [tb, x], [tb + 0.45, to[0] + 0.5 * 0, 'in']], y: [[tb, y], [tb + 0.45, to[1], 'in']], libre: true, caja: [-40, -40, 80, 80] });
});

// ---------- 5 · Pareto: unas pocas tareas ----------
E.numero(5, N[4].T, N[4].S, { hacia: 'rejilla' });
E.figura('yo5', { t0: N[4].S - 0.1, t1: TC, x: -380, poses: [[0, 'de_pie'], [w(14, 0), 'senalar'], [w(15, 3), 'de_pie']] });
E.obj('rejilla', 'cuadricula', { t0: N[4].S - 0.1, t1: TC, x: 120, y: -330, cols: 5, rows: 4, lado: 70, gap: 14, on: [2, 8, 16], r: 60,
  p: [[w(14, 0), 0], [w(14, 3), 1]], apagar: [[w(14, 4), 0], [wf(14, -1), 1], [w(15, 3), 1], [w(15, 4), 0.4]], caja: [-210, -168, 420, 336] });

// ---------- cierre: las cinco monedas y pregunta a comentarios ----------
for (let i = 0; i < 5; i++) {
  const a = TC + 0.15 + i * 0.16;
  E.obj('c' + (i + 1), 'moneda', { t0: a, t1: w(17, 0), capa: 'pantalla', x: 540 + (i - 2) * 130, y: 960, r: 46, n: i + 1, pop: true, sfx: i === 0 });
}
E.figura('yoA', { t0: w(17, 0), t1: D + 1, x: 0, poses: [[0, 'de_pie'], [wf(17, -1) - 0.6, 'senalar']] });
E.figura('gente1', { t0: w(17, 0), t1: D + 1, x: [[w(17, 0), -460], [w(17, 0) + 1.4, -300]], color: 'gris', fondo: true, poses: [[0, 'andar'], [w(17, 0) + 1.4, 'de_pie']] });
E.figura('gente2', { t0: w(17, 0), t1: D + 1, x: [[w(17, 0), 460], [w(17, 0) + 1.4, 300]], dir: -1, color: 'gris', fondo: true, poses: [[0, 'andar'], [w(17, 0) + 1.4, 'de_pie']] });
E.obj('chat', 'bocadillo', { t0: w(17, 0) + 0.2, t1: wf(17, -1) - 0.6, x: 130, y: -560, w: 120, h: 84, pop: true, on: 1, caja: [-70, -45, 140, 116] });
E.obj('seguir', 'seguir', { t0: wf(17, -1) - 0.5, t1: D + 1, x: 150, y: -560, r: 56, pop: true });
