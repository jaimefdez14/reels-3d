// L3 · Tres pasos para que tu jefe te tome en serio (estilo B, molde de B-R1: el muñeco gris se vuelve amarillo,
// anillo, tres puntos sueltos, fondo negro, subtítulo en dos líneas) · guion con docs/REDACCION.md (regla 17)
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', subY: 690, progreso: { n: 3, estilo: 'puntos', aparece: w(1, 0), gap: 70, y: 360 } });

const T1 = w(2, 0) - 0.05, S1 = w(2, 2) - 0.12;
const T2 = w(6, 0) - 0.05, S2 = w(6, 2) - 0.12;
const T3 = w(10, 0) - 0.05, S3 = w(10, 2) - 0.12;
const TC = w(14, 0) - 0.1;
const fin = (k) => [T1, T2, T3, TC][k] + 0.45;

E.camara([
  [0, [0, -380, 1]], [w(0, 6), [0, -385, 1.03]], [T1, [0, -395, 1.06]],
  [S1 - 0.05, [0, -380, 1], 'lin'], [T2, [0, -390, 1.05]],
  [S2 - 0.05, [0, -380, 1], 'lin'], [T3, [0, -385, 1.03]],
  [S3 - 0.05, [0, -380, 1], 'lin'], [TC, [0, -395, 1.05]],
]);

// ---------- gancho: el contador de horas sube y el jefe, de espaldas, ni se entera; con «tres pasos» el anillo se cierra y el muñeco se vuelve amarillo (B-R1) ----------
E.figura('yo', { t0: 0, t1: fin(0), x: -60, cara: true, colorK: [[0, 0], [w(1, 1), 0], [wf(1, 4) + 0.2, 1, 'inout']],
  poses: [[0, 'de_pie'], [w(0, 2), 'triste'], [w(0, 5), 'encoger'], [w(1, 0), 'de_pie'], [w(1, 4), 'celebrar'], [wf(1, -1) + 0.2, 'de_pie']],
  sonrisa: [[0, -0.4], [w(0, 8), -0.8], [w(1, 3), -0.8], [w(1, 5), 1.4]] });
E.figura('jefeH', { t0: w(0, 5) - 0.2, t1: w(1, 1), x: 400, dir: 1, color: 'gris', poses: [[0, 'de_pie'], [w(0, 7), 'pensar']] });
E.obj('horasH', 'contador', { t0: 0.2, t1: fin(0), x: 190, y: -330, v: [[0.3, 8], [w(0, 4), 12, 'inout'], [w(0, 10), 13, 'inout']], suf: ' h', size: 70, col: 'txt', miles: false,
  luz: [[w(1, 5), 1], [w(1, 6) + 0.3, 0.25]], caja: [-110, -40, 220, 80] });
E.obj('anilloH', 'anillo', { t0: w(1, 1) - 0.1, t1: fin(0), x: -60, y: -250, rx: 300, ry: 290, p: [[w(1, 1) - 0.1, 0], [wf(1, 4) + 0.2, 1, 'out']], rodea: true, sobrevive: true, r: 70, oy: -250 });
E.obj('chH', 'chispas', { t0: wf(1, 4) + 0.2, t1: wf(1, 4) + 1.0, x: -60, y: -250, r0: 150, r1: 260, inspeccion: false });

// ---------- 1 · llega con la solución ----------
E.numero(1, T1, S1, { desde: 'anilloH', hacia: 'salB' });
E.figura('yo1', { t0: S1 - 0.1, t1: fin(1), x: -330, cara: true,
  poses: [[0, 'de_pie'], [w(3, 0), 'encoger'], [w(3, 6), 'ofrecer'], [w(4, 1), 'senalar'], [w(5, 0), 'de_pie'], [w(5, 5), 'celebrar']],
  sonrisa: [[w(5, 4), 0.3], [w(5, 6), 1.4]] });
E.figura('jefe1', { t0: S1 - 0.1, t1: fin(1), x: 340, dir: -1, color: 'gris',
  poses: [[0, 'de_pie'], [w(3, 3), 'manos_cabeza'], [w(3, 7), 'pensar'], [w(4, 3), 'de_pie'], [w(5, 2), 'senalar']] });
E.obj('lio', 'maraña', { t0: w(3, 2), t1: w(3, 6), x: 20, y: -430, r: 70, col: '#8d9692', p: [[w(3, 2), 0], [w(3, 5), 1]], caja: [-85, -75, 170, 150] });
E.obj('salA', 'bocadillo', { t0: w(3, 6) + 0.05, t1: fin(1), x: -80, y: -420, w: 140, h: 110, texto: 'A', size: 54, pop: true, caja: [-70, -55, 140, 136] });
E.obj('salB', 'bocadillo', { t0: w(3, 7), t1: fin(1), x: 110, y: -420, w: 140, h: 110, texto: 'B', size: 54, pop: true, on: [[w(4, 2), 0], [w(4, 3), 1]],
  sobrevive: true, r: 60, caja: [-70, -55, 140, 136] });
E.obj('chB', 'chispas', { t0: w(4, 3), t1: w(4, 3) + 0.8, x: 110, y: -420, r0: 60, r1: 140, inspeccion: false });
E.obj('pulso1', 'pulso', { t0: w(5, 3), t1: w(5, 3) + 0.7, x: -330, y: -260, r0: 60, r1: 260, inspeccion: false });
E.golpe(w(5, 5), 0.04);

// ---------- 2 · pon fecha y cúmplela ----------
E.numero(2, T2, S2, { desde: 'salB', hacia: 'semana' });
E.figura('yo2', { t0: S2 - 0.1, t1: fin(2), x: -370, cara: true, toca: ['caja'],
  poses: [[0, 'de_pie'], [w(7, 0), 'encoger'], [w(7, 4), 'senalar'], [w(8, 0), 'coger'], [w(8, 3), 'ofrecer'], [w(9, 0), 'de_pie'], [w(9, 3), 'celebrar']],
  sonrisa: [[w(8, 3), 0.4], [w(8, 4), 1.4]] });
E.figura('jefe2', { t0: S2 - 0.1, t1: fin(2), x: 372, dir: -1, color: 'gris', poses: [[0, 'de_pie'], [w(8, 4), 'coger'], [w(9, 0), 'de_pie']] });
E.obj('semana', 'dias', { t0: S2 - 0.1, t1: w(9, 0), x: 0, y: -450, gap: 64, luz: [[S2, -1], [w(7, 5), -1], [w(7, 8), 3, 'inout']], caja: [-225, -32, 450, 64], r: 30 });
E.obj('miro', 'bocadillo', { t0: w(7, 1), t1: w(7, 4), x: -140, y: -330, w: 150, h: 96, pop: true, caja: [-75, -48, 150, 122] });
E.obj('caja', 'pieza', { t0: w(8, 0), t1: w(9, 0), x: [[w(8, 0), -230], [w(8, 3), -230], [w(8, 4) + 0.2, 230, 'inout']], y: -300, r: 44, texto: '✓', pop: true,
  libre: true, caja: [-44, -44, 88, 88] });
E.obj('chJ', 'chispas', { t0: w(8, 4), t1: w(8, 4) + 0.8, x: 0, y: -450, r0: 40, r1: 120, inspeccion: false });
// tres fechas cumplidas pesan más que diez horas extra: el contador amarillo sube; el gris se apaga
E.obj('fechas', 'contador', { t0: w(9, 0), t1: fin(2), x: 0, y: -450, v: [[w(9, 0), 0], [w(9, 2), 3, 'lin']], suf: ' fechas', size: 72, miles: false,
  sobrevive: true, r: 60, caja: [-170, -42, 340, 84] });
E.obj('horas', 'contador', { t0: w(9, 4), t1: fin(2), x: 0, y: -340, v: [[w(9, 5), 0], [wf(9, -1), 10, 'lin']], suf: ' h extra', size: 46, col: 'txt', miles: false,
  luz: [[wf(9, -1), 1], [wf(9, -1) + 0.4, 0.35]], caja: [-140, -28, 280, 56] });
E.obj('ch9', 'chispas', { t0: w(9, 3), t1: w(9, 3) + 0.8, x: 0, y: -450, r0: 110, r1: 200, inspeccion: false });

// ---------- 3 · cuenta lo que has hecho ----------
E.numero(3, T3, S3, { desde: 'fechas', hacia: 'correo' });
E.figura('yo3', { t0: S3 - 0.1, t1: TC, x: -300, cara: true, toca: ['mesa'], poses: [[0, 'escribir']] });
E.obj('mesa', 'escritorio', { t0: S3 - 0.1, t1: TC, x: -10, silla: true, brillo: [[w(11, 4), 0], [wf(11, -1), 1]], refl: true, inspeccion: false, caja: [-330, -400, 500, 400] });
E.obj('correo', 'lista', { t0: S3 - 0.1, t1: TC, x: 110, y: -470, s: 1.4, n: 3, w: 230, gap: 46, p: [[w(11, 4), 0], [wf(11, -1) + 0.3, 3, 'lin']], caja: [-115, -65, 230, 130] });
E.figura('jefe3', { t0: S3 - 0.1, t1: TC, x: 390, dir: -1, color: 'gris',
  poses: [[0, 'de_pie'], [w(12, 4), 'pensar'], [w(13, 6), 'celebrar']] });
E.obj('duda', 'bocadillo', { t0: w(12, 4), t1: w(13, 4), x: 280, y: -330, w: 110, h: 86, texto: '?', size: 44, pop: true, caja: [-60, -45, 120, 116] });
E.obj('envioC', 'pieza', { t0: w(13, 4), t1: w(13, 7) + 0.1, r: 30, texto: '✉', libre: true, x: [[w(13, 4), 120], [w(13, 7), 300, 'inout']], y: [[w(13, 4), -470], [w(13, 5) + 0.2, -500], [w(13, 7), -330, 'in']], caja: [-30, -30, 60, 60] });
E.obj('ch13', 'chispas', { t0: w(13, 7), t1: w(13, 7) + 0.8, x: 300, y: -330, r0: 50, r1: 130, inspeccion: false });

// ---------- cierre: resumen (vuelve al gancho) y envío ----------
E.obj('resumen', 'resumen', { t0: TC, t1: w(14, 9), capa: 'pantalla', x: 540, y: 960, items: ['Solución', 'Fecha', 'Cuéntalo'], gap: 230,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], caja: [-360, -60, 720, 200] });
E.figura('yoF', { t0: w(14, 9), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(14, 10), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(14, 10), t1: D + 1, x: 120, y: -360, r: 64, pop: true, vuelo: [[wf(14, -1), 0], [wf(14, -1) + 0.5, 1, 'in']] });
