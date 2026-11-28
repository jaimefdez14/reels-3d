// L66 · El efecto Hawthorne (estilo B; reglas 15, 20, 21, 24)
// Idea visual: una fábrica con una lámpara: suben la luz y la pila de producción crece; la bajan y crece igual, porque
// hay alguien (gris) mirando. Cada regla pone a alguien delante del muñeco: un amigo que oye el plan, gente alrededor
// mientras trabaja, la semana en la que enseña sus avances.
// Contador que suma: «hace un siglo» (100 AÑOS). Algo que se rellena por punto: pila de producción, bloques de la
// fábrica que se marcan, barras «fallarle a otro / fallarte a ti», «biblioteca / sofá», «tus avances».
// Regla 20: «Que nos están mirando.» va en bocadillo de un compañero gris del gancho, sin voz.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(3, 0), gap: 70, y: 360 } });

// «La primera: // …» → T en «La», S en la primera palabra del punto
const N = [4, 6, 8].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(10, 0) - 0.1;   // resumen
const ROJO = '#e4574f';
const GRIS = '#9a9c9b';
const AM = '#e6ce46';

E.camara([
  [0, [0, -380, 1.04]], [w(0, 6), [10, -385, 1.06]], [w(0, 12), [-20, -390, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 8), [0, -385, 1.04]],
  [wf(1, -1), [20, -390, 1.06]], [w(2, 0), [0, -380, 1.02]], [w(2, 7), [10, -385, 1.04]], [w(3, 0), [0, -385, 1.04]], [N[0].T, [10, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(5, 0), [15, -385, 1.04]], [w(5, 6), [-10, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(7, 0), [-15, -385, 1.04]], [w(7, 9), [15, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(9, 0), [-10, -385, 1.04]], [w(9, 5), [10, -385, 1.05]], [TC - 0.1, [0, -385, 1.04]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: En(0) una(1) fábrica(2) subieron(3) la(4) luz(5) y(6) se(7) produjo(8) más.(9) La(10) bajaron,(11) y(12) también(13) se(14) produjo(15) más.(16)
// [bocadillo del compañero gris «Que nos están mirando.»]
// lámpara sobre la pila de producción; «subieron la luz»: se enciende y la pila crece; «La bajaron»: se apaga y la pila crece igual
const L0 = w(0, 10);
E.obj('rayosH', 'rayos', { t0: 0, t1: w(1, 0), sale: 0.2, x: -110, y: -430, r: 260, z: -2, p: [[0, 0.35], [w(0, 3), 0.35], [w(0, 5), 1, 'out'], [L0, 1], [w(0, 11) + 0.2, 0, 'inout']], inspeccion: false });
E.obj('lampara', 'bola', { t0: 0, t1: w(1, 0), sale: 0.2, x: -110, y: -430, r: 38,
  luz: [[0, 0.55], [w(0, 3), 0.55], [w(0, 5), 1, 'out'], [L0, 1], [w(0, 11) + 0.2, 0.3, 'inout']], caja: [-38, -38, 76, 76] });
E.sfx(w(0, 3), 'fill');
E.obj('prod0', 'pila', { t0: 0, t1: w(1, 0), sale: 0.25, x: -110, n: 9, w: 130, hh: 24, refl: true,
  k: [[0, 2], [w(0, 7), 2], [w(0, 9) + 0.3, 5, 'out'], [w(0, 13), 5], [w(0, 16) + 0.3, 9, 'out']], caja: [-65, -190, 130, 190] });
E.sfx(w(0, 7), 'fill'); E.sfx(w(0, 13), 'fill');
E.figura('yo', { t0: 0, t1: w(1, 0), sale: 0.25, x: -330, talla: 340, cara: true, toca: ['prod0'],
  poses: [[0, 'coger'], [0.6, 'meter'], [1.2, 'coger'], [w(0, 3), 'pensar'], [w(0, 7), 'meter'], [w(0, 9), 'celebrar'], [L0, 'pensar'], [w(0, 13), 'meter'], [w(0, 16), 'levantar']],
  sonrisa: [[0, 0.3], [w(0, 5), 1], [w(0, 9), 1.5], [L0, -0.4], [w(0, 16), 1.5]] });
E.obj('chP0', 'chispas', { t0: w(0, 9) + 0.3, t1: w(0, 9) + 1.0, x: -110, y: -120, r0: 60, r1: 150, inspeccion: false });
E.golpe(w(0, 9) + 0.3, 0.04);
E.figura('cA', { t0: 0, t1: w(1, 0), sale: 0.25, x: 170, talla: 300, color: 'gris', cara: true,
  poses: [[0, 'meter'], [0.7, 'coger'], [1.4, 'meter'], [w(0, 5), 'coger'], [w(0, 9), 'meter'], [L0, 'pensar'], [w(0, 14), 'senalar']], sonrisa: [[0, 0.2], [L0, 0.8]] });
E.figura('obs0', { t0: 0, t1: w(1, 0), sale: 0.25, x: 395, talla: 330, color: 'gris', dir: -1, cara: true, toca: ['papel0'],
  poses: [[0, 'pensar'], [w(0, 5), 'escribir'], [L0, 'pensar'], [w(0, 13), 'escribir']], sonrisa: 0 });
E.obj('bocaH', 'bocadillo', { t0: L0, t1: wf(0, -1) + 0.4, sale: 0.2, x: 190, y: -440, w: 380, h: 76, texto: 'Que nos están mirando.', size: 30, pop: true,
  on: [[L0, 0], [L0 + 0.3, 1]], caja: [-190, -38, 380, 102] });
E.obj('chP1', 'chispas', { t0: w(0, 16) + 0.3, t1: w(0, 16) + 1.1, x: -110, y: -190, r0: 70, r1: 170, inspeccion: false });
E.temblor(w(0, 16), 14, 0.45); E.golpe(w(0, 16), 0.05);

// 1: Se(0) llama(1) efecto(2) Hawthorne,(3) por(4) esa(5) fábrica(6) de(7) Chicago(8) que(9) se(10) estudió(11) hace(12) un(13) siglo.(14)
E.figura('yo1', { t0: w(1, 0) - 0.05, t1: w(2, 0), sale: 0.25, x: -360, talla: 420, cara: true,
  poses: [[0, 'de_pie'], [w(1, 2), 'senalar'], [w(1, 6), 'ofrecer'], [w(1, 10), 'pensar'], [w(1, 12), 'senalar']],
  sonrisa: [[0, 0.4], [w(1, 3), 1.2], [w(1, 10), 0.4], [w(1, 13), 1]] });
E.obj('rotHaw', 'rotulo', { t0: w(1, 2) - 0.1, t1: w(2, 0), sale: 0.25, x: 130, y: -470, texto: 'EFECTO HAWTHORNE', size: 34, col: AM, peso: 700, pop: true, caja: [-220, -20, 440, 40] });
E.obj('chHaw', 'chispas', { t0: w(1, 3), t1: w(1, 3) + 0.8, x: 130, y: -470, r0: 120, r1: 240, inspeccion: false });
E.golpe(w(1, 3), 0.04);
E.obj('fabrica', 'bloques', { t0: w(1, 5) - 0.15, t1: w(2, 0), sale: 0.25, x: 130, y: -70, n: 4, w: 340, h: 140, texto: 'FÁBRICA', pop: true, refl: true,
  parte: [[w(1, 10), 0], [w(1, 11), 1]], hechos: [[w(1, 11), 0], [w(1, 11) + 0.9, 4, 'lin']], caja: [-170, -80, 340, 160] });
E.sfx(w(1, 11), 'fill');
E.obj('rotChi', 'rotulo', { t0: w(1, 8) - 0.1, t1: w(2, 0), sale: 0.25, x: 130, y: -205, texto: 'CHICAGO', size: 30, col: GRIS, pop: true, caja: [-90, -18, 180, 36] });
E.obj('siglo', 'contador', { t0: w(1, 12) - 0.1, t1: w(2, 0), sale: 0.25, x: 130, y: -335, size: 84, miles: false, suf: ' AÑOS', pop: true,
  v: [[w(1, 12), 0], [wf(1, -1) + 0.3, 100, 'out']], barrido: [wf(1, -1) + 0.35], caja: [-190, -48, 380, 96] });
E.obj('chSig', 'chispas', { t0: wf(1, -1) + 0.3, t1: wf(1, -1) + 1.0, x: 130, y: -335, r0: 140, r1: 240, inspeccion: false });
E.golpe(wf(1, -1) + 0.3, 0.04);

// 2: Lo(0) que(1) influía(2) no(3) era(4) la(5) luz:(6) era(7) saber(8) que(9) alguien(10) estaba(11) mirando.(12)
// 3: Tres(0) formas(1) de(2) usarlo(3) a(4) tu(5) favor.(6)
E.figura('yo2', { t0: w(2, 0) - 0.05, t1: fin(0), x: -360, talla: 420, cara: true,
  poses: [[0, 'pensar'], [w(2, 3), 'encoger'], [w(2, 7), 'pensar'], [w(2, 10), 'senalar'], [w(3, 0), 'ofrecer'], [w(3, 4), 'celebrar']],
  sonrisa: [[0, 0.2], [w(2, 3), -0.5], [w(2, 10), 1], [w(3, 4), 1.5]] });
E.obj('lamp2', 'bola', { t0: w(2, 0) - 0.05, t1: w(2, 9), sale: 0.25, x: 110, y: -420, r: 44, pop: true,
  luz: [[0, 1], [w(2, 3), 1], [w(2, 3) + 0.3, 0.3]], caja: [-44, -44, 88, 88] });
E.obj('rotLuz', 'rotulo', { t0: w(2, 0) + 0.1, t1: w(2, 3), sale: 0.1, x: 110, y: -320, texto: 'LA LUZ', size: 30, col: GRIS, pop: true, caja: [-70, -18, 140, 36] });
E.obj('rotNo', 'rotulo', { t0: w(2, 3), t1: w(2, 9), sale: 0.2, x: 110, y: -320, texto: 'NO ERA LA LUZ', size: 30, col: ROJO, pop: true, caja: [-130, -18, 260, 36] });
E.temblor(w(2, 3), 10, 0.35);
E.figura('obs2', { t0: w(2, 7) - 0.1, t1: fin(0), x: 400, talla: 330, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(2, 10), 'pensar'], [w(3, 3), 'senalar']], sonrisa: [[0, 0], [w(3, 3), 0.8]] });
E.obj('pulsoObs', 'pulso', { t0: w(2, 12), t1: w(2, 12) + 0.7, x: 400, y: -280, r0: 40, r1: 140, inspeccion: false });
E.obj('rotMira', 'rotulo', { t0: w(2, 10) - 0.1, t1: w(3, 0), sale: 0.2, x: 90, y: -460, texto: 'ALGUIEN MIRANDO', size: 32, col: AM, peso: 700, pop: true, caja: [-190, -18, 380, 36] });
E.obj('ondas2', 'ondas', { t0: w(2, 9), t1: fin(0), sale: 0.2, x: 90, y: -250, n: 9, gap: 26, amp: [[w(2, 9), 0], [w(2, 12), 1, 'out']], caja: [-115, -50, 230, 100] });
E.golpe(w(2, 12), 0.04);
[0, 1, 2].forEach(i => { const a = w(3, 0) + i * 0.13;
  E.obj('q' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: -10 + i * 100, y: -440, r: 32, n: '', pop: true, sfx: i === 0,
    s: i === 0 ? [[0, 1], [wf(3, -1), 1], [wf(3, -1) + 0.3, 1.3, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [wf(3, -1), 1], [wf(3, -1) + 0.3, 0.4]], caja: [-32, -32, 64, 64] }); });
E.destello(wf(3, -1), 0.12);

// ---------- 1 · díselo a alguien, y para cuándo ----------
// 4: La(0) primera:(1) dile(2) a(3) alguien(4) lo(5) que(6) vas(7) a(8) hacer.(9)
// 5: Y(0) para(1) cuándo.(2) Fallarle(3) a(4) otro(5) cuesta(6) más(7) que(8) fallarte(9) a(10) ti.(11)
E.numero(1, N[0].T, N[0].S, { desde: 'q1', hacia: 'plan' });
E.figura('yoP1', { t0: N[0].S - 0.1, t1: fin(1), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(4, 2), 'senalar'], [w(4, 5), 'ofrecer'], [w(5, 0), 'senalar'], [w(5, 3), 'encoger'], [w(5, 6), 'manos_cabeza'], [w(5, 9), 'pensar']],
  sonrisa: [[0, 0.4], [w(4, 5), 1], [w(5, 3), -0.6], [w(5, 6), -1.2], [w(5, 9), 0]] });
E.figura('amigo', { t0: w(4, 3) - 0.2, t1: fin(1), x: 410, talla: 320, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(4, 7), 'pensar'], [w(5, 2), 'senalar'], [w(5, 3), 'triste']], sonrisa: [[0, 0.6], [w(5, 3), -1]] });
E.obj('bocaP1', 'bocadillo', { t0: w(4, 3), t1: w(5, 3), sale: 0.2, x: -170, y: -440, w: 130, h: 64, on: 1, pop: true, caja: [-65, -32, 130, 90] });
E.obj('plan', 'lista', { t0: N[0].S - 0.1, t1: w(5, 3), sale: 0.2, x: 110, y: -230, n: 3, w: 280, gap: 70, pop: true, r: 70,
  brillo: [[w(4, 5), 0], [wf(4, -1) + 0.2, 3, 'lin']], caja: [-140, -88, 280, 176] });
E.sfx(w(4, 5), 'fill');
E.obj('cuando', 'dias', { t0: w(5, 0) - 0.1, t1: fin(1), x: 110, y: -440, letras: ['L', 'M', 'X', 'J', 'V'], gap: 70, pop: true,
  luz: [[w(5, 0), -1], [w(5, 2) + 0.2, 4, 'lin']], caja: [-175, -32, 350, 64] });
E.obj('pulsoV', 'pulso', { t0: w(5, 2) + 0.2, t1: w(5, 2) + 0.8, x: 250, y: -440, r0: 30, r1: 90, inspeccion: false });
E.obj('barOtro', 'relleno', { t0: w(5, 3) - 0.05, t1: fin(1), x: 110, y: -300, w: 300, h: 44, pop: true, sobrevive: true, r: 50, rotulo: 'FALLARLE A OTRO',
  f: [[w(5, 4), 0], [w(5, 7) + 0.3, 0.95, 'out']], barrido: [w(5, 7) + 0.35], caja: [-150, -56, 300, 78] });
E.obj('barTi', 'relleno', { t0: w(5, 8), t1: fin(1), x: 110, y: -170, w: 300, h: 44, pop: true, rotulo: 'FALLARTE A TI',
  f: [[w(5, 9), 0], [wf(5, -1), 0.3, 'out']], caja: [-150, -56, 300, 78] });
E.sfx(w(5, 4), 'fill'); E.sfx(w(5, 9), 'fill');
E.obj('ch1', 'chispas', { t0: w(5, 7) + 0.3, t1: w(5, 7) + 1.1, x: 110, y: -300, r0: 110, r1: 210, inspeccion: false });
E.golpe(w(5, 7) + 0.3, 0.04);

// ---------- 2 · trabaja con gente delante ----------
// 6: La(0) segunda:(1) trabaja(2) con(3) gente(4) delante.(5)
// 7: En(0) una(1) biblioteca(2) o(3) con(4) un(5) compañero(6) al(7) lado(8) avanzas(9) más(10) que(11) en(12) el(13) sofá.(14)
E.numero(2, N[1].T, N[1].S, { desde: 'barOtro', hacia: 'barBib' });
E.figura('yoP2', { t0: N[1].S - 0.1, t1: fin(2), x: -360, cara: true, toca: ['mesa2'],
  poses: [[0, 'escribir'], [w(7, 9), 'celebrar'], [w(7, 12), 'escribir'], [wf(7, -1) + 0.2, 'celebrar']],
  sonrisa: [[0, 0.4], [w(7, 9), 1.5], [w(7, 12), 0.6], [wf(7, -1), 1.4]] });
E.obj('mesa2', 'escritorio', { t0: N[1].S - 0.1, t1: fin(2), x: -80, brillo: [[w(6, 2), 0], [w(6, 5), 0.6], [w(7, 9), 0.6], [w(7, 10) + 0.3, 1]], refl: true, inspeccion: false, caja: [-330, -400, 500, 400] });
[{ id: 'g1', x: 250, t: w(6, 4) - 0.2 }, { id: 'g2', x: 420, t: w(6, 4) }].forEach((q, i) => E.figura(q.id, { t0: q.t, t1: fin(2), x: i === 0 ? [[0, 250], [w(7, 4), 250], [w(7, 6) + 0.2, 180, 'inout']] : q.x,
  talla: 270, color: 'gris', dir: -1, cara: true,
  poses: i === 0 ? [[0, 'de_pie'], [w(6, 5), 'escribir'], [w(7, 4), 'andar'], [w(7, 6) + 0.2, 'escribir']] : [[0, 'de_pie'], [w(6, 5) + 0.15, 'pensar']], sonrisa: 0.5 }));
E.obj('barBib', 'relleno', { t0: N[1].S - 0.1, t1: fin(2), x: 300, y: -450, w: 300, h: 44, pop: true, sobrevive: true, r: 50,
  rotulo: [[0, ''], [w(7, 2) - 0.05, 'BIBLIOTECA']], f: [[w(6, 2), 0], [wf(6, -1), 0.3, 'out'], [w(7, 9), 0.3], [w(7, 10) + 0.3, 0.92, 'out']], barrido: [w(7, 10) + 0.35], caja: [-150, -56, 300, 78] });
E.obj('barSofa', 'relleno', { t0: w(7, 11), t1: fin(2), x: 300, y: -340, w: 300, h: 44, pop: true, rotulo: 'SOFÁ',
  f: [[w(7, 12), 0], [wf(7, -1), 0.25, 'out']], caja: [-150, -56, 300, 78] });
E.sfx(w(6, 2), 'fill'); E.sfx(w(7, 9), 'fill'); E.sfx(w(7, 12), 'fill');
E.obj('ch2', 'chispas', { t0: w(7, 10) + 0.3, t1: w(7, 10) + 1.1, x: 300, y: -450, r0: 110, r1: 210, inspeccion: false });
E.golpe(w(7, 10) + 0.3, 0.04);

// ---------- 3 · enseña tus avances cada semana ----------
// 8: La(0) tercera:(1) enseña(2) tus(3) avances(4) cada(5) semana.(6)
// 9: Aunque(0) nadie(1) te(2) los(3) pida.(4) Basta(5) con(6) saber(7) que(8) los(9) vas(10) a(11) enseñar.(12)
E.numero(3, N[2].T, N[2].S, { desde: 'barBib', hacia: 'avances' });
E.figura('yoP3', { t0: N[2].S - 0.1, t1: TC, x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(8, 2), 'ofrecer'], [w(8, 5), 'senalar'], [w(9, 0), 'encoger'], [w(9, 5), 'pensar'], [w(9, 9), 'ofrecer'], [wf(9, -1) + 0.1, 'celebrar']],
  sonrisa: [[0, 0.4], [w(8, 2), 1.2], [w(9, 0), -0.2], [w(9, 5), 0.4], [wf(9, -1), 1.5]] });
E.obj('avances', 'relleno', { t0: N[2].S - 0.1, t1: TC, x: 110, y: -260, w: 340, h: 48, pop: true, r: 50, rotulo: 'TUS AVANCES',
  f: [[w(8, 2), 0], [w(8, 4) + 0.3, 0.3, 'out'], [wf(8, -1), 0.3], [wf(8, -1) + 0.4, 0.55, 'out'], [w(9, 7), 0.55], [w(9, 12) + 0.2, 1, 'out']],
  barrido: [wf(9, -1) + 0.2], caja: [-170, -58, 340, 82] });
E.sfx(w(8, 2), 'fill'); E.sfx(wf(8, -1), 'fill'); E.sfx(w(9, 7), 'fill');
E.obj('semana', 'dias', { t0: w(8, 5) - 0.15, t1: TC, x: 110, y: -440, letras: ['L', 'M', 'X', 'J', 'V', 'S', 'D'], gap: 66, pop: true,
  luz: [[w(8, 5), -1], [wf(8, -1) + 0.4, 6, 'lin'], [w(9, 5), 6], [w(9, 5) + 0.01, -1], [w(9, 12), 6, 'lin']], caja: [-230, -32, 460, 64] });
E.figura('nadie', { t0: w(9, 0) - 0.15, t1: w(9, 6), sale: 0.25, x: 420, talla: 290, color: 'gris', dir: 1, cara: true, luz: 0.7,
  poses: [[0, 'de_pie'], [w(9, 2), 'apartarse']], sonrisa: 0 });
E.obj('ch3', 'chispas', { t0: w(9, 12) + 0.2, t1: w(9, 12) + 1.0, x: 110, y: -260, r0: 120, r1: 230, inspeccion: false });
E.golpe(w(9, 12) + 0.2, 0.04); E.destello(wf(9, -1) + 0.2, 0.12);

// ---------- cierre: resumen y envío ----------
// 10: A(0) solas(1) te(2) lo(3) perdonas(4) casi(5) todo.(6) Con(7) alguien(8) mirando,(9) bastante(10) menos.(11)
// 11: Mándaselo(0) a(1) ese(2) amigo(3) con(4) el(5) que(6) te(7) vas(8) a(9) apuntar(10) al(11) gimnasio.(12)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(10, 7), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, items: ['Díselo', 'Con gente', 'Enséñalo'], gap: 270,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(10, 9)], caja: [-400, -60, 800, 200] });
E.obj('confC', 'confeti', { t0: wf(10, -1), t1: wf(10, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(10, -1), 0.22); E.golpe(wf(10, -1), 0.04);
E.figura('yoF', { t0: w(11, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(11, 1), 'senalar'], [w(11, 10), 'celebrar']] });
E.obj('enviar', 'enviar', { t0: w(11, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(11, 12)], vuelo: [[wf(11, -1), 0], [wf(11, -1) + 0.5, 1, 'in']] });
