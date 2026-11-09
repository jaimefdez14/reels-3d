// L1 · Cuatro reglas para que tu sueldo dure todo el mes (estilo B, molde de B-R3 + cierre de B-R1/B-R3)
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'degradado', sub: 'dos', subY: 680, progreso: { n: 4, estilo: 'barras', aparece: w(1, 0), gap: 70 } });

// tiempos de las transiciones de número: T = «Número», S = la escena nueva entra con el nombre del punto
const T1 = w(2, 0) - 0.05, S1 = w(2, 2) - 0.12;
const T2 = w(5, 0) - 0.05, S2 = w(5, 2) - 0.12;
const T3 = w(9, 0) - 0.05, S3 = w(9, 2) - 0.12;
const T4 = w(13, 0) - 0.05, S4 = w(13, 2) - 0.12;
const TC = w(16, 0) - 0.1; // cierre

// cámara: plano lateral fijo con acercamientos lentos; se recoloca a oscuras en cada número
E.camara([
  [0, [0, -380, 1]], [T1, [0, -395, 1.06]],
  [S1 - 0.05, [0, -380, 1], 'lin'], [T2, [-20, -390, 1.05]],
  [S2 - 0.05, [0, -370, 1], 'lin'], [T3, [0, -380, 1.05]],
  [S3 - 0.05, [0, -380, 1], 'lin'], [w(12, 0), [-30, -400, 1.07]], [T4, [-30, -400, 1.07]],
  [S4 - 0.05, [0, -380, 1], 'lin'], [TC, [0, -395, 1.05]],
]);

// ---------- gancho: el contador llega al día 20 y la pila se vacía; con «cuatro reglas» el anillo se dibuja y la pila se rellena ----------
E.figura('yo', { t0: 0, t1: T1 + 0.45, x: -170, cara: true, toca: ['pila'],
  poses: [[0, 'de_pie'], [w(0, 5), 'triste'], [w(0, 10), 'senalar'], [w(1, 0), 'ofrecer'], [wf(1, -1) - 0.2, 'de_pie']],
  sonrisa: [[w(0, 5), -0.6], [w(0, 10), -0.6], [w(0, 12), 1.2]] });
E.obj('diaH', 'contador', { t0: 0.15, t1: w(0, 9), x: 140, y: -330, v: [[0.3, 1], [w(0, 3) + 0.1, 20, 'inout']], pre: 'día', size: 70, col: 'txt', miles: false,
  luz: [[w(0, 7), 1], [w(0, 9), 0.2]], caja: [-130, -40, 260, 80] });
E.obj('pila', 'pila', { t0: 0, t1: T1 + 0.45, x: 140, n: 9, w: 190, hh: 30, k: [[0, 9], [w(0, 4), 9], [w(0, 7) + 0.1, 0, 'in'], [w(0, 11), 0], [wf(0, -1) + 0.4, 9, 'out']], caja: [-95, -250, 190, 250], refl: true });
E.obj('anilloH', 'anillo', { t0: w(0, 10) - 0.1, t1: T1 + 0.45, x: -10, y: -250, rx: 340, ry: 285, p: [[w(0, 10) - 0.1, 0], [wf(0, -1) + 0.3, 1, 'out']], rodea: true });
E.obj('chH', 'chispas', { t0: wf(0, -1) + 0.4, t1: wf(0, -1) + 1.2, x: 140, y: -150, r0: 120, r1: 220, inspeccion: false });
E.golpe(wf(0, -1) + 0.4, 0.04);

// ---------- 1 · págate primero ----------
E.numero(1, T1, S1, { hacia: 'pila1' });
E.figura('yo1', { t0: S1 - 0.1, t1: T2 + 0.45, x: -40, cara: true, toca: ['pila1', 'tarro', 'm1', 'm2', 'm3'],
  poses: [[0, 'de_pie'], [w(3, 4), 'coger'], [w(3, 7), { lean: 10, hf: 6, kf: 6, hb: -8, kb: 6, sf: -40, ef: 10, sb: -20, eb: 10, cab: 2 }, 0.45], [w(3, 10), 'meter'], [w(4, 1), 'de_pie'], [w(4, 5), 'senalar']] });
E.obj('pila1', 'pila', { t0: S1 - 0.1, t1: T2 + 0.45, x: 200, n: 9, w: 190, hh: 30, k: [[S1, 0], [S1 + 0.9, 9, 'out'], [w(3, 5), 9], [w(3, 10), 6]], caja: [-95, -250, 190, 250], refl: true, sobrevive: true, r: 70, oy: -110 });
E.obj('tarro', 'tarro', { t0: w(3, 4) - 0.2, t1: T2 + 0.45, x: -330, pop: true, nivel: [[w(3, 7), 0], [w(3, 12), 0.45]], tapa: [[w(4, 3), 0], [w(4, 4) + 0.2, 1, 'out']], luz: [[w(4, 5), 1], [w(4, 7), 0.35]], w: 200, h: 270, caja: [-100, -270, 200, 270], refl: true });
[0, 1, 2].forEach(i => { const a = w(3, 5) + i * 0.28; E.obj('m' + (i + 1), 'moneda', { t0: a, t1: a + 0.95, entra: 0.1, sale: 0.15, r: 22, n: '', libre: true, x: [[a, 200], [a + 0.9, -330, 'inout']], y: [[a, -210 + i * 22], [a + 0.45, -470], [a + 0.9, -170, 'in']], sfx: false }); });

// ---------- 2 · una cuenta para cada cosa ----------
E.numero(2, T2, S2, { desde: 'pila1', hacia: 'fijos' });
E.figura('yo2', { t0: S2 - 0.1, t1: T3 + 0.45, x: -350, cara: true,
  poses: [[0, 'de_pie'], [w(6, 0), 'senalar'], [w(6, 5), 'ofrecer'], [w(7, 0), 'pensar'], [w(7, 8), 'encoger'], [w(8, 0), 'de_pie']],
  sonrisa: [[w(7, 7), 1], [w(7, 9), -0.6]] });
E.obj('fijos', 'tarro', { t0: S2 - 0.1, t1: T3 + 0.45, x: -20, rotulo: 'FIJOS', nivel: [[w(6, 1), 0], [w(6, 4), 0.6]], w: 200, h: 270, caja: [-100, -270, 200, 270], refl: true, sobrevive: true, r: 80, oy: -110 });
E.obj('capr', 'tarro', { t0: S2 - 0.1, t1: T3 + 0.45, x: 250, rotulo: 'CAPRICHOS', nivel: [[w(6, 5), 0], [w(6, 8), 0.5], [w(7, 1), 0.5], [w(7, 7), 0, 'in']], apagado: [[w(7, 8), 0], [w(7, 10), 1]], w: 200, h: 270, caja: [-100, -270, 200, 270], refl: true });

// ---------- 3 · espera dos días ----------
E.numero(3, T3, S3, { desde: 'fijos', hacia: 'compra' });
E.figura('yo3', { t0: S3 - 0.1, t1: T4 + 0.45, x: -230, cara: true, toca: ['compra'],
  poses: [[0, 'de_pie'], [w(10, 0), 'senalar'], [w(10, 5), 'de_pie'], [w(11, 0), 'pensar'], [w(12, 3), 'encoger'], [wf(12, -1), 'de_pie']],
  sonrisa: [[w(11, 1), 0.2], [w(11, 2), 1.4], [w(12, 3), 1.4], [w(12, 5), 0]] });
E.obj('compra', 'compra', { t0: S3 - 0.1, t1: T4 + 0.45, x: 160, y: -330, w: 300, h: 380, caja: [-150, -190, 300, 380],
  boton: [[0, 'COMPRAR'], [w(10, 6), 'EN ESPERA']], espera: [[w(10, 5), 0], [w(10, 7), 1]], luz: [[w(12, 3), 1], [w(12, 6), 0.55]] });
E.obj('corazon', 'corazon', { t0: w(11, 2) - 0.1, t1: T4 + 0.45, x: -95, y: -470, pop: true, r: [[0, 44], [w(12, 0), 44], [w(12, 4), 24]], apagado: [[w(12, 0), 0], [w(12, 4), 1]], caja: [-55, -45, 110, 100], sobrevive: true });

// ---------- 4 · mira tus gastos el domingo ----------
E.numero(4, T4, S4, { desde: 'corazon', hacia: 'dias' });
E.figura('yo4', { t0: S4 - 0.1, t1: TC, x: -270, cara: true, toca: ['mesa'], poses: [[0, 'escribir']] });
E.obj('mesa', 'escritorio', { t0: S4 - 0.1, t1: TC, x: 40, silla: true, brillo: [[w(15, 4), 0], [wf(15, -1), 1]], caja: [-330, -400, 500, 400], refl: true, inspeccion: false });
E.obj('dias', 'dias', { t0: S4 - 0.1, t1: w(14, 0), x: 0, y: -520, luz: [[w(13, 5), -1], [w(13, 6), 6]], caja: [-322, -32, 644, 64], r: 30 });
E.obj('reloj5', 'temporizador', { t0: w(14, 0), t1: w(15, 0) + 0.3, x: 0, y: -520, r: 52, texto: '5', sub: 'MIN', pop: true, p: [[w(14, 0) + 0.3, 0], [wf(14, -1), 1]], hecho: [[wf(14, -1), 0], [wf(14, -1) + 0.3, 1]] });

// ---------- cierre: resumen (vuelve al gancho) y envío ----------
E.obj('resumen', 'resumen', { t0: TC, t1: w(16, 9), capa: 'pantalla', x: 540, y: 960, items: ['Págate', 'Separa', 'Espera', 'Repasa'], gap: 200,
  p: [[TC, 0], [TC + 0.9, 4, 'lin']], caja: [-400, -60, 800, 300] });
E.figura('yo5', { t0: w(16, 9), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(16, 10), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(16, 10), t1: D + 1, x: 120, y: -360, r: 64, pop: true, vuelo: [[wf(16, -1), 0], [wf(16, -1) + 0.5, 1, 'in']] });
