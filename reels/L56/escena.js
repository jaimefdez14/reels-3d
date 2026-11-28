// L56 · El efecto espectador (estilo B; reglas 15, 20, 21, 24)
// Idea visual: el muñeco manda un correo (piezas «@») desde el móvil a un grupo de grises que se dan la vuelta; cuanta
// más gente aparece, más se vacía la barra de «obligado». Las tres reglas reconstruyen el correo: un solo destinatario
// con su nombre (barra que se escribe) y los demás en copia; una sola pregunta que se contesta con un temporizador de
// 1 minuto que se rellena; y una fecha (el jueves se enciende) cuya barra se llena frente a la de «sin fecha».
// Contador que suma: «10» personas y el año 1968. Regla 20: «Ya contestará otro.» en bocadillo de un gris, sin voz.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(2, 6), gap: 70, y: 360 } });

// «La primera: // …» → T en «La», S en la primera palabra del punto
const N = [3, 5, 7].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(9, 0) - 0.1;   // resumen
const ROJO = '#e4574f';
const GRIS = '#9a9c9b';
const AM = '#e6ce46';

E.camara([
  [0, [0, -380, 1.04]], [w(0, 4), [10, -385, 1.06]], [w(0, 10), [-15, -390, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 6), [10, -385, 1.04]],
  [w(1, 12), [-10, -390, 1.06]], [w(2, 0), [0, -380, 1.02]], [w(2, 5), [10, -385, 1.04]], [w(2, 9), [-10, -388, 1.05]], [N[0].T, [10, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [15, -385, 1.04]], [w(4, 6), [-10, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 0), [-15, -385, 1.04]], [w(6, 5), [15, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(8, 0), [-10, -385, 1.04]], [w(8, 6), [10, -385, 1.05]], [TC - 0.1, [0, -385, 1.04]], [TC, [0, -390, 1.05]],
]);

// pieza «@» que vuela de [x0, y0] a [x1, y1] entre a y b (un correo que sale)
const vuela = (id, a, b, x0, y0, x1, y1, o = {}) => E.obj(id, 'pieza', Object.assign({ t0: a, t1: b + 0.25, entra: 0.06, sale: 0.2, r: 26, texto: '@', libre: true, estela: 5, inspeccion: false,
  x: [[a, x0], [b, x1, 'inout']], y: [[a, y0], [(a + b) / 2, Math.min(y0, y1) - 90, 'out'], [b, y1, 'in']] }, o));

// ---------- gancho ----------
// 0: Mandas(0) un(1) correo(2) a(3) diez(4) personas(5) y(6) no(7) te(8) contesta(9) ninguna(10)   [bocadillo «Ya contestará otro.»]
// el muñeco ya tiene el móvil en la mano; «Mandas un correo»: salen cuatro «@» hacia el grupo; «diez personas»: el 10 rueda;
// «y no te contesta ninguna»: los grises se dan la vuelta uno a uno, uno dice «Ya contestará otro.» y el móvil se apaga
const XG = [110, 210, 310, 410];
E.figura('yo', { t0: 0, t1: w(1, 0), sale: 0.25, x: -370, talla: 420, cara: true, toca: ['movil'],
  poses: [[0, 'ofrecer'], [w(0, 2), 'senalar'], [w(0, 6), 'ofrecer'], [w(0, 9), 'encoger'], [w(0, 10) + 0.2, 'triste']],
  sonrisa: [[0, 0.8], [w(0, 2), 1.2], [w(0, 7), 0], [w(0, 10), -1.4]] });
E.obj('movil', 'telefono', { t0: 0, t1: w(1, 0), sale: 0.25, x: -205, y: -270, w: 110, h: 190, vibra: [[0, 0.8], [w(0, 2), 0.8], [w(0, 2) + 0.3, 0]],
  brillo: [[0, 1], [w(0, 9), 1], [w(0, 10) + 0.3, 0.25]], caja: [-55, -95, 110, 190] });
XG.forEach((x, i) => E.figura('g' + i, { t0: 0, t1: w(1, 0), sale: 0.25, x, talla: 240, color: 'gris', dir: -1, cara: i === 1,
  poses: [[0, 'de_pie'], [w(0, 7) + i * 0.14, i === 1 ? 'encoger' : 'triste']], sonrisa: 0.2 }));
XG.forEach((x, i) => { const a = w(0, 0) + 0.05 + i * 0.12; vuela('c0_' + i, a, a + 0.55, -205, -330, x, -270);
  E.obj('pc0_' + i, 'pulso', { t0: a + 0.55, t1: a + 1.1, x, y: -270, r0: 20, r1: 70, inspeccion: false }); E.sfx(a + 0.55, 'pop'); });
E.obj('diez', 'contador', { t0: w(0, 3) - 0.1, t1: w(1, 0), sale: 0.2, x: 260, y: -480, size: 110, miles: false, pop: true,
  v: [[w(0, 3), 0], [w(0, 5) + 0.2, 10, 'out']], barrido: [w(0, 5) + 0.25], caja: [-80, -55, 160, 110] });
E.obj('chDiez', 'chispas', { t0: w(0, 5) + 0.2, t1: w(0, 5) + 0.9, x: 260, y: -480, r0: 70, r1: 150, inspeccion: false });
E.obj('bocaG', 'bocadillo', { t0: w(0, 6), t1: w(1, 0) + 0.2, sale: 0.2, x: 300, y: -350, w: 340, h: 76, texto: 'Ya contestará otro.', size: 30, pop: true,
  on: [[w(0, 6), 0], [w(0, 6) + 0.3, 1]], caja: [-170, -38, 340, 102] });
E.temblor(w(0, 10), 14, 0.45); E.golpe(w(0, 10), 0.05);

// 1: Se(0) llama(1) efecto(2) espectador(3) cuanta(4) más(5) gente(6) puede(7) ayudar(8) menos(9) obligado(10) se(11) siente(12) cada(13) uno(14)
// «efecto espectador»: rótulo con chispas; «cuanta más gente»: entran grises uno a uno y la barra de GENTE se llena;
// «menos obligado se siente cada uno»: la barra de OBLIGADO se vacía y los grises se encogen en cascada
E.figura('yo1', { t0: w(1, 0) - 0.05, t1: w(2, 0), sale: 0.25, x: -380, talla: 420, cara: true,
  poses: [[0, 'de_pie'], [w(1, 1), 'senalar'], [w(1, 4), 'ofrecer'], [w(1, 9), 'pensar'], [w(1, 13), 'manos_cabeza']],
  sonrisa: [[0, 0], [w(1, 2), 0.6], [w(1, 9), -0.4], [w(1, 13), -1.2]] });
E.obj('rotEE', 'rotulo', { t0: w(1, 2) - 0.1, t1: w(1, 4) - 0.1, sale: 0.15, x: 60, y: -480, texto: 'EFECTO ESPECTADOR', size: 36, col: AM, peso: 700, pop: true, caja: [-230, -22, 460, 44] });
E.obj('chEE', 'chispas', { t0: w(1, 3), t1: w(1, 3) + 0.8, x: 60, y: -480, r0: 120, r1: 240, inspeccion: false });
E.golpe(w(1, 3), 0.04);
const XC = [-90, 15, 120, 225, 330, 430];
XC.forEach((x, i) => { const a = i < 2 ? w(1, 0) + 0.1 + i * 0.12 : w(1, 4) + (i - 2) * 0.22;
  E.figura('cr' + i, { t0: a, t1: w(2, 0), sale: 0.25, x, talla: 230, color: 'gris', dir: -1,
    poses: [[0, 'de_pie'], [w(1, 10) + i * 0.12, i % 2 ? 'encoger' : 'triste']] });
  if (i >= 2) E.sfx(a, 'pop'); });
E.obj('barGente', 'relleno', { t0: w(1, 4) + 0.02, t1: w(2, 0) - 0.1, sale: 0.25, x: 130, y: -470, w: 380, h: 40, pop: true, rotulo: 'MÁS GENTE',
  f: [[w(1, 4), 0.25], [w(1, 8) + 0.3, 1, 'out']], caja: [-190, -54, 380, 74] });
E.obj('barOblig', 'relleno', { t0: w(1, 4) + 0.15, t1: w(2, 0) - 0.1, sale: 0.25, x: 130, y: -360, w: 380, h: 40, pop: true, rotulo: 'OBLIGADO',
  f: [[w(1, 4), 0.95], [w(1, 9), 0.9], [w(1, 14) + 0.3, 0.08, 'inout']], caja: [-190, -54, 380, 74] });
E.sfx(w(1, 4), 'fill');
E.obj('rotCada', 'rotulo', { t0: w(1, 13) - 0.05, t1: w(2, 0) - 0.1, sale: 0.2, x: 130, y: -290, texto: 'CADA UNO', size: 24, col: ROJO, pop: true, caja: [-70, -14, 140, 28] });
E.temblor(w(1, 14), 10, 0.35);

// 2: Lo(0) demostraron(1) dos(2) psicólogos(3) en(4) 1968(5) Tres(6) reglas(7) para(8) que(9) te(10) contesten(11)
// dos psicólogos (claros) entran; el año rueda hasta 1968; «Tres reglas»: tres «@» amarillas; «que te contesten»: el móvil vibra
E.figura('yo2', { t0: w(2, 0) - 0.05, t1: fin(0), x: -370, talla: 420, cara: true, toca: ['movil2'],
  poses: [[0, 'de_pie'], [w(2, 2), 'senalar'], [w(2, 6), 'pensar'], [w(2, 8), 'ofrecer'], [w(2, 11), 'celebrar']],
  sonrisa: [[0, 0], [w(2, 2), 0.6], [w(2, 6), 0.4], [w(2, 11), 1.5]] });
[{ id: 'ps1', x: 250 }, { id: 'ps2', x: 380 }].forEach((q, i) => E.figura(q.id, { t0: w(2, 2) - 0.1 + i * 0.15, t1: w(2, 6), sale: 0.25, x: q.x, talla: 300, color: 'claro', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(2, 5) + 0.4, i ? 'senalar' : 'ofrecer']], sonrisa: 0.8 }));
E.obj('rotPs', 'rotulo', { t0: w(2, 2) - 0.1, t1: w(2, 6), sale: 0.2, x: 315, y: -375, texto: 'DOS PSICÓLOGOS', size: 26, col: GRIS, pop: true, caja: [-140, -16, 280, 32] });
E.obj('anio', 'contador', { t0: w(2, 1), t1: w(2, 6), sale: 0.2, x: 120, y: -490, size: 110, miles: false, pop: true,
  v: [[w(2, 2), 0], [w(2, 5) + 0.45, 1968, 'out']], barrido: [w(2, 5) + 0.5, w(2, 5) + 1.2], caja: [-160, -55, 320, 110] });
E.obj('chAnio', 'chispas', { t0: w(2, 5) + 0.45, t1: w(2, 5) + 1.25, x: 120, y: -490, r0: 150, r1: 250, inspeccion: false });
E.golpe(w(2, 5) + 0.45, 0.04);
E.obj('libro', 'papeles', { t0: w(2, 5) + 0.6, t1: w(2, 6), sale: 0.2, x: 60, y: -14, n: 5, k: [[w(2, 5) + 0.6, 0], [w(2, 6) - 0.2, 5, 'lin']], caja: [-95, -100, 190, 115] });
E.obj('movil2', 'telefono', { t0: w(2, 6) - 0.05, t1: fin(0), sale: 0.25, x: -205, y: -270, w: 110, h: 190, pop: true,
  vibra: [[0, 0], [w(2, 11), 0], [w(2, 11) + 0.1, 1], [wf(2, -1) + 0.4, 0]], brillo: [[0, 0.3], [w(2, 8), 0.3], [w(2, 11), 1]], caja: [-55, -95, 110, 190] });
[0, 1, 2].forEach(i => { const a = w(2, 6) + i * 0.13;
  E.obj('q' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: 110 + i * 120, y: -440, r: 40, n: '@', pop: true, sfx: i === 0,
    s: i === 0 ? [[0, 1], [wf(2, -1), 1], [wf(2, -1) + 0.3, 1.25, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [wf(2, -1), 1], [wf(2, -1) + 0.3, 0.4]], caja: [-40, -40, 80, 80] }); });
E.destello(wf(2, -1), 0.12);

// ---------- 1 · escribe a una sola persona ----------
// 3: La(0) primera(1) escribe(2) a(3) una(4) sola(5) persona(6)
// 4: Con(0) su(1) nombre(2) al(3) principio(4) A(5) los(6) demás(7) ponlos(8) en(9) copia(10)
E.numero(1, N[0].T, N[0].S, { desde: 'q1', hacia: 'dest' });
E.figura('yoP1', { t0: N[0].S - 0.1, t1: fin(1), x: -370, talla: 420, cara: true,
  poses: [[0, 'de_pie'], [w(3, 2), 'coger'], [w(3, 4), 'senalar'], [w(4, 0), 'coger'], [w(4, 5), 'ofrecer'], [w(4, 8), 'senalar'], [wf(4, -1), 'celebrar']],
  sonrisa: [[0, 0.2], [w(3, 4), 0.8], [w(4, 0), 0.6], [wf(4, -1), 1.5]] });
E.figura('dest', { t0: N[0].S - 0.05, t1: fin(1), x: 190, talla: 320, color: 'claro', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(3, 6) + 0.3, 'coger'], [w(4, 4), 'celebrar'], [w(4, 6), 'de_pie']], sonrisa: [[0, 0.3], [w(3, 6), 1.2]] });
vuela('c1', w(3, 3), w(3, 6), -230, -300, 190, -330);
E.obj('pc1', 'pulso', { t0: w(3, 6), t1: w(3, 6) + 0.6, x: 190, y: -330, r0: 30, r1: 120, inspeccion: false }); E.sfx(w(3, 6), 'pop');
E.obj('rotUna', 'rotulo', { t0: w(3, 4) - 0.1, t1: w(4, 0), sale: 0.2, x: 60, y: -480, texto: 'UNA SOLA PERSONA', size: 32, col: AM, peso: 700, pop: true, caja: [-200, -20, 400, 40] });
E.obj('chUna', 'chispas', { t0: w(3, 6), t1: w(3, 6) + 0.8, x: 60, y: -480, r0: 110, r1: 220, inspeccion: false });
// «Con su nombre al principio»: la barra del nombre se escribe con cursor
E.obj('nombre', 'relleno', { t0: w(4, 0) - 0.1, t1: fin(1), x: 40, y: -470, w: 380, h: 44, pop: true, sobrevive: true, r: 50, rotulo: 'SU NOMBRE',
  f: [[w(4, 1), 0], [w(4, 4) + 0.3, 1, 'out']], cursor: [[0, 1], [w(4, 4) + 0.3, 1], [w(4, 4) + 0.35, 0]], barrido: [w(4, 4) + 0.35], caja: [-190, -56, 380, 78] });
E.sfx(w(4, 1), 'fill');
E.obj('chNom', 'chispas', { t0: w(4, 4) + 0.3, t1: w(4, 4) + 1.1, x: 40, y: -470, r0: 110, r1: 220, inspeccion: false });
E.golpe(w(4, 4) + 0.3, 0.04);
// «A los demás, ponlos en copia»: dos grises pequeños detrás, con su «@» gris
[{ id: 'cc1', x: 330 }, { id: 'cc2', x: 430 }].forEach((q, i) => { const a = w(4, 5) + i * 0.15;
  E.figura(q.id, { t0: a, t1: fin(1), x: q.x, talla: 220, color: 'gris', dir: -1, poses: [[0, 'de_pie'], [w(4, 10) + i * 0.1, 'coger']] });
  vuela('ccm' + i, w(4, 6) + i * 0.15, w(4, 8) + 0.1 + i * 0.15, -230, -300, q.x, -260, { on: 0, r: 20, sale: 0.1 }); });
E.obj('rotCopia', 'rotulo', { t0: w(4, 9) + 0.05, t1: fin(1), x: 365, y: -330, texto: 'EN COPIA', size: 24, col: GRIS, pop: true, caja: [-70, -14, 140, 28] });

// ---------- 2 · pide una sola cosa ----------
// 5: La(0) segunda(1) pide(2) una(3) sola(4) cosa(5)
// 6: Una(0) pregunta(1) clara(2) se(3) contesta(4) en(5) un(6) minuto(7)
E.numero(2, N[1].T, N[1].S, { desde: 'nombre', hacia: 'p1' });
E.figura('yoP2', { t0: N[1].S - 0.1, t1: fin(2), x: -370, talla: 420, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'ofrecer'], [w(5, 3), 'senalar'], [w(6, 0), 'ofrecer'], [w(6, 3), 'pensar'], [wf(6, -1), 'celebrar']],
  sonrisa: [[0, 0.2], [w(5, 3), 0.8], [w(6, 3), 0.4], [wf(6, -1), 1.5]] });
// tres preguntas grises; «una sola»: dos caen y la del centro se enciende y crece
[0, 1, 2].forEach(i => { const x = -60 + i * 110, centro = i === 1, a = N[1].S - 0.05 + i * 0.1;
  E.obj('p' + i, 'pieza', { t0: a, t1: centro ? w(6, 1) : w(5, 5) + 0.3, sale: 0.25, x, r: 40, texto: '?', pop: true,
    y: centro ? -470 : [[0, -470], [w(5, 3) + i * 0.08, -470], [w(5, 5) + 0.3, -380, 'in']],
    on: centro ? [[0, 0], [w(5, 4), 0], [w(5, 5), 1]] : 0, s: centro ? [[0, 1], [w(5, 4), 1], [w(5, 5) + 0.2, 1.4, 'back']] : 1, caja: [-40, -40, 80, 80] }); });
E.obj('chP', 'chispas', { t0: w(5, 5) + 0.1, t1: w(5, 5) + 0.9, x: 50, y: -470, r0: 70, r1: 160, inspeccion: false });
E.golpe(w(5, 5) + 0.1, 0.04);
// «Una pregunta clara»: la pregunta vuela al compañero; «se contesta en un minuto»: el temporizador de 1 min se llena y él contesta
E.figura('comp', { t0: w(5, 5), t1: fin(2), x: 360, talla: 320, color: 'claro', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(6, 2) + 0.2, 'coger'], [w(6, 4), 'senalar'], [wf(6, -1), 'celebrar']], sonrisa: [[0, 0.3], [w(6, 4), 1.2]] });
vuela('c2', w(6, 0), w(6, 2) + 0.1, 50, -470, 360, -330, { texto: '?', on: 1, r: 30 });
E.obj('bocaC', 'bocadillo', { t0: w(6, 3), t1: fin(2) - 0.1, sale: 0.2, x: 380, y: -470, w: 130, h: 64, on: 1, pop: true, caja: [-65, -32, 130, 90] });
E.obj('minuto', 'temporizador', { t0: w(6, 0), t1: fin(2), x: 20, y: -330, r: 90, texto: '1', sub: 'MIN', pop: true, sobrevive: true,
  p: [[w(6, 3), 0], [wf(6, -1) + 0.1, 1, 'lin']], hecho: [[wf(6, -1) + 0.1, 0], [wf(6, -1) + 0.4, 1, 'out']], caja: [-110, -110, 220, 220] });
E.sfx(w(6, 3), 'fill');
E.obj('chMin', 'chispas', { t0: wf(6, -1) + 0.15, t1: wf(6, -1) + 0.95, x: 20, y: -330, r0: 110, r1: 220, inspeccion: false });
E.golpe(wf(6, -1) + 0.15, 0.04); E.destello(wf(6, -1) + 0.15, 0.1);

// ---------- 3 · ponle fecha ----------
// 7: La(0) tercera(1) ponle(2) fecha(3)
// 8: Pedirlo(0) para(1) el(2) jueves(3) funciona(4) mejor(5) que(6) pedirlo(7) sin(8) fecha(9)
E.numero(3, N[2].T, N[2].S, { desde: 'minuto', hacia: 'semana' });
E.figura('yoP3', { t0: N[2].S - 0.1, t1: TC, x: -370, talla: 420, cara: true,
  poses: [[0, 'de_pie'], [w(7, 2), 'senalar'], [w(8, 0), 'ofrecer'], [w(8, 3), 'senalar'], [w(8, 6), 'pensar'], [w(8, 8), 'encoger'], [wf(8, -1) + 0.2, 'celebrar']],
  sonrisa: [[0, 0.2], [w(7, 3), 0.8], [w(8, 4), 1.4], [w(8, 8), -0.3], [wf(8, -1) + 0.2, 1.2]] });
E.obj('semana', 'dias', { t0: N[2].S - 0.05, t1: TC, x: 80, y: -480, letras: ['L', 'M', 'X', 'J', 'V'], gap: 84, pop: true,
  luz: [[w(7, 2) - 0.1, -1], [w(7, 3) + 0.3, 3, 'out'], [w(8, 2), 3], [w(8, 3) + 0.1, 3]], barrido: [w(8, 3) + 0.15], caja: [-200, -32, 400, 64] });
E.obj('pulJ', 'pulso', { t0: w(8, 3) + 0.1, t1: w(8, 3) + 0.7, x: 164, y: -480, r0: 30, r1: 90, inspeccion: false });
E.sfx(w(7, 3) + 0.3, 'ding');
E.obj('barJ', 'relleno', { t0: w(8, 0) - 0.15, t1: TC, x: 100, y: -340, w: 400, h: 44, pop: true, rotulo: 'PARA EL JUEVES',
  f: [[w(8, 1), 0], [w(8, 5) + 0.3, 0.95, 'out']], barrido: [w(8, 5) + 0.35], caja: [-200, -56, 400, 78] });
E.sfx(w(8, 1), 'fill');
E.obj('chJ', 'chispas', { t0: w(8, 5) + 0.3, t1: w(8, 5) + 1.1, x: 280, y: -340, r0: 50, r1: 130, inspeccion: false });
E.golpe(w(8, 5) + 0.3, 0.04);
E.obj('barS', 'relleno', { t0: w(8, 6) - 0.1, t1: TC, x: 100, y: -215, w: 400, h: 44, pop: true, rotulo: 'SIN FECHA',
  f: [[w(8, 7), 0], [w(8, 9), 0.18, 'out']], luz: [[0, 1], [wf(8, -1), 1], [wf(8, -1) + 0.4, 0.5]], caja: [-200, -56, 400, 78] });
E.sfx(w(8, 7), 'fill');
E.obj('marS', 'maraña', { t0: w(8, 9), t1: TC, x: 200, y: -140, r: 34, col: ROJO, p: [[w(8, 9), 0], [wf(8, -1) + 0.3, 1, 'out']], rot: [[w(8, 9), 0], [TC, 0.6, 'lin']], caja: [-48, -28, 96, 56] });
E.temblor(w(8, 9), 10, 0.35);

// ---------- cierre: resumen y envío ----------
// 9: Lo(0) que(1) se(2) pide(3) a(4) todos(5) no(6) se(7) le(8) pide(9) a(10) nadie(11)
// 10: Mándaselo(0) a(1) ese(2) compañero(3) que(4) siempre(5) escribe(6) a(7) todo(8) el(9) equipo(10)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(9, 5), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, items: ['Una persona', 'Una cosa', 'Con fecha'], gap: 290,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(9, 6)], caja: [-420, -60, 840, 200] });
E.obj('confC', 'confeti', { t0: wf(9, -1), t1: wf(9, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(9, -1), 0.22); E.golpe(wf(9, -1), 0.04);
E.figura('yoF', { t0: w(10, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(10, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(10, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(10, 10)], vuelo: [[wf(10, -1), 0], [wf(10, -1) + 0.5, 1, 'in']] });
