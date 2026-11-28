// L52 · El efecto Ringelmann (estilo B; reglas 15, 20, 21, 24)
// Idea visual: una cuerda atada a un bloque. El muñeco amarillo tira; cuanta más gente gris se suma a la cuerda, más
// se deja llevar cada uno (la cuerda se afloja detrás de él y la barra de «cada uno» baja).
// Contadores que ruedan: el año 1913, las ocho personas y el paso de cinco a quince. Algo que se rellena por punto:
// las piezas de «quién hace cada cosa», las casillas de la lista con su nombre al lado y las barras de lo que hace cada uno.
// Regla 20: «Ya lo hará otro.» va en bocadillo de un compañero gris durante el gancho; la voz solo narra.
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
const TIRAR = { lean: -16, hf: 22, kf: 10, hb: -14, kb: 4, sf: 62, ef: 6, sb: 50, eb: 8, cab: -4 };
const TIRAR2 = { lean: -24, hf: 28, kf: 12, hb: -16, kb: 4, sf: 66, ef: 4, sb: 54, eb: 6, cab: -8 };
const FLOJO = { lean: 2, hf: 4, kf: 2, hb: -4, kb: 2, sf: 40, ef: 30, sb: -6, eb: 6, cab: 4 };

E.camara([
  [0, [0, -380, 1.04]], [w(0, 3), [-10, -385, 1.06]], [w(0, 7), [10, -390, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 4), [10, -385, 1.04]],
  [w(1, 11), [-10, -385, 1.06]], [w(2, 0), [0, -380, 1.02]], [w(2, 6), [10, -385, 1.04]], [w(2, 12), [-10, -388, 1.06]],
  [w(3, 0), [0, -380, 1.02]], [N[0].T, [10, -390, 1.05]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(5, 0), [15, -385, 1.03]], [w(5, 9), [-10, -385, 1.05]], [N[1].T, [0, -390, 1.05]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(7, 0), [-15, -385, 1.03]], [w(7, 5), [15, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(9, 0), [-10, -385, 1.03]], [w(9, 7), [10, -385, 1.05]], [TC - 0.1, [0, -385, 1.04]], [TC, [0, -390, 1.05]],
]);

// cuerda: línea gris entre dos puntos (curva > 0 = floja)
const cuerda = (id, o) => E.obj(id, 'flecha', Object.assign({ punta: false, col: '#b9bcbb', w: 6, curva: 0, pop: false, libre: true, sfx: false, inspeccion: false }, o));

// ---------- gancho ----------
// 0: Cuanta(0) más(1) gente(2) hay(3) en(4) un(5) equipo(6) menos(7) trabaja(8) cada(9) uno(10)   [bocadillo «Ya lo hará otro.»]
const tM = w(0, 7);   // «menos»: la palabra fuerte
const RY = -168;      // altura de la cuerda
const bx = [[0, 400], [w(0, 6), 372, 'lin'], [tM, 372], [tM + 0.35, 400, 'out']];
const dx = bx.map(k => [k[0], k[1] - 400, k[2]]);
cuerda('soga0', { t0: 0, t1: tM + 0.1, sale: 0.1, x: dx, de: [-440, RY], hasta: [325, RY] });
cuerda('soga0t', { t0: tM, t1: w(1, 0), entra: 0.1, sale: 0.25, x: dx, de: [20, RY], hasta: [325, RY] });
cuerda('soga0f', { t0: tM, t1: w(1, 0), entra: 0.1, sale: 0.25, de: [-440, RY + 6], hasta: [20, RY], curva: [[tM, 0], [tM + 0.5, 0.2, 'out']] });
E.obj('peso0', 'bloques', { t0: 0, t1: w(1, 0), sale: 0.25, n: 1, w: 150, h: 230, x: bx, y: -115, refl: true, caja: [-75, -115, 150, 230] });
[{ x: -150, t: 0 }, { x: -275, t: w(0, 1) - 0.05 }, { x: -400, t: w(0, 2) + 0.1 }].forEach((q, i) =>
  E.figura('gente0_' + i, { t0: q.t, t1: w(1, 0), sale: 0.25, x: q.x, talla: 290, color: 'gris', cara: i === 2, toca: ['bocaH'],
    poses: [[0, TIRAR], [tM - 0.1 + i * 0.12, i === 1 ? 'encoger' : FLOJO], [w(0, 9), i === 0 ? 'de_pie' : (i === 1 ? 'encoger' : FLOJO)]], sonrisa: 0.8 }));
E.figura('yo', { t0: 0, t1: w(1, 0), sale: 0.25, x: -20, talla: 340, cara: true,
  poses: [[0, TIRAR], [tM, TIRAR2], [w(0, 10), TIRAR2]], sonrisa: [[0, 0.5], [w(0, 6), 0.2], [tM + 0.2, -1.2], [w(0, 10), -1.5]] });
E.obj('bocaH', 'bocadillo', { t0: w(0, 3), t1: w(1, 0) - 0.1, sale: 0.2, x: -275, y: -400, w: 290, h: 72, texto: 'Ya lo hará otro.', size: 30, pop: true,
  on: [[w(0, 3), 0], [w(0, 3) + 0.3, 1]], caja: [-145, -36, 290, 98] });
E.obj('cada0', 'relleno', { t0: 0, t1: w(1, 0), sale: 0.25, x: 250, y: -430, w: 290, h: 42, rotulo: 'CADA UNO',
  f: [[0, 1], [tM, 1], [w(0, 8) + 0.4, 0.4, 'inout']], caja: [-145, -56, 290, 78] });
E.sfx(tM, 'fill');
E.obj('pulso0', 'pulso', { t0: tM, t1: tM + 0.7, x: 250, y: -430, r0: 60, r1: 190, inspeccion: false });
E.temblor(tM, 14, 0.45); E.golpe(tM, 0.05);

// ---------- concepto ----------
// 1: Se(0) llama(1) efecto(2) Ringelmann(3) Un(4) ingeniero(5) francés(6) lo(7) midió(8) en(9) 1913(10) con(11) gente(12) tirando(13) de(14) una(15) cuerda(16)
E.figura('yo1', { t0: w(1, 0) + 0.05, t1: w(2, 0), sale: 0.25, x: -385, talla: 430, cara: true,
  poses: [[0, 'de_pie'], [w(1, 2), 'senalar'], [w(1, 5), 'de_pie'], [w(1, 8), 'pensar'], [w(1, 11), 'senalar']],
  sonrisa: [[0, 0], [w(1, 2), 0.8], [w(1, 8), 0.3], [w(1, 11), 0.8]] });
E.obj('rotR', 'rotulo', { t0: w(1, 2) - 0.1, t1: w(1, 8) - 0.1, sale: 0.2, x: 120, y: -460, texto: 'EFECTO RINGELMANN', size: 34, col: AM, peso: 700, pop: true, caja: [-225, -20, 450, 40] });
E.obj('chR', 'chispas', { t0: w(1, 3), t1: w(1, 3) + 0.8, x: 120, y: -460, r0: 120, r1: 240, inspeccion: false });
E.golpe(w(1, 3), 0.04);
// «Un ingeniero francés»: entra el ingeniero (claro) con su poste de medir; «lo midió en 1913»: rueda el año
E.figura('ing', { t0: w(1, 4), t1: w(2, 0), sale: 0.25, x: 420, talla: 330, color: 'claro', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(1, 8), 'ofrecer'], [w(1, 11), 'senalar']], sonrisa: 0.8 });
E.obj('poste1', 'bloques', { t0: w(1, 5), t1: w(2, 0), sale: 0.25, n: 1, w: 36, h: 190, x: 300, y: -95, pop: true, refl: true, caja: [-18, -95, 36, 190] });
E.obj('anio', 'contador', { t0: w(1, 8) - 0.15, t1: w(2, 0), sale: 0.2, x: 60, y: -440, size: 110, miles: false, pop: true,
  v: [[w(1, 8), 0], [w(1, 10) + 0.5, 1913, 'out']], barrido: [w(1, 10) + 0.55], caja: [-160, -58, 320, 116] });
E.obj('chA', 'chispas', { t0: w(1, 10) + 0.5, t1: w(1, 10) + 1.3, x: 60, y: -440, r0: 160, r1: 250, inspeccion: false });
E.golpe(w(1, 10) + 0.5, 0.04);
// «con gente tirando de una cuerda»: tres personas tiran de la cuerda atada al poste
cuerda('soga1', { t0: w(1, 11), t1: w(2, 0), sale: 0.25, de: [-190, -128], hasta: [282, -128], p: [[w(1, 11), 0], [w(1, 13), 1, 'out']] });
[-150, -40, 70].forEach((x, i) => E.figura('gente1_' + i, { t0: w(1, 11) + i * 0.18, t1: w(2, 0), sale: 0.25, x, talla: 220, color: 'gris',
  poses: [[0, 'de_pie'], [w(1, 13) - 0.1 + i * 0.08, TIRAR], [w(1, 15), TIRAR2]] }));
E.obj('pulso1', 'pulso', { t0: w(1, 16), t1: w(1, 16) + 0.7, x: 300, y: -128, r0: 30, r1: 120, inspeccion: false });
E.sfx(w(1, 16), 'thud');

// 2: Con(0) ocho(1) personas(2) tirando(3) cada(4) una(5) hacía(6) la(7) mitad(8) de(9) fuerza(10) que(11) cuando(12) tiraba(13) sola(14)
// ocho personas en la cuerda (la primera, amarilla); la barra de «cada una» se queda en la mitad; «sola»: las otras se apagan y su barra se llena
const X8 = i => 150 - i * 80;   // i = 0 la amarilla, junto al poste
const tSola = w(2, 12);
E.obj('poste2', 'bloques', { t0: w(2, 0) - 0.05, t1: w(3, 0), sale: 0.25, n: 1, w: 36, h: 170, x: 270, y: -85, pop: true, refl: true, caja: [-18, -85, 36, 170] });
cuerda('soga2', { t0: w(2, 0), t1: w(3, 0), sale: 0.25, de: [-450, -112], hasta: [252, -112], p: [[w(2, 0), 0], [w(2, 2), 1, 'out']],
  luz: [[0, 1], [tSola, 1], [tSola + 0.3, 0.45]] });
cuerda('soga2s', { t0: tSola, t1: w(3, 0), sale: 0.25, de: [X8(0) + 30, -112], hasta: [252, -112] });
for (let i = 0; i < 8; i++) { const a = w(2, 0) + 0.05 + i * 0.1;
  E.figura((i ? 'gente2_' : 'yo2_') + i, { t0: a, t1: w(3, 0), sale: 0.25, x: X8(i), talla: 190, color: i ? 'gris' : 'am', cara: i === 0,
    poses: [[0, TIRAR], [w(2, 6) + i * 0.04, i ? FLOJO : TIRAR], [tSola, i ? 'de_pie' : TIRAR2]], sonrisa: [[0, 0.3], [tSola, 0.3], [w(2, 14), 1.2]],
    luz: i ? [[0, 1], [tSola, 1], [tSola + 0.3, 0.35]] : 1 }); }
E.obj('ocho', 'contador', { t0: w(2, 0), t1: w(3, 0), sale: 0.2, x: -330, y: -420, size: 130, miles: false, pop: true, suave: true,
  v: [[w(2, 0) + 0.05, 1], [w(2, 1) + 0.45, 8, 'lin']], barrido: [w(2, 1) + 0.5], luz: [[0, 1], [tSola, 1], [tSola + 0.3, 0.45]], caja: [-60, -68, 120, 136] });
E.golpe(w(2, 1) + 0.45, 0.04);
E.obj('barCada', 'barra', { t0: w(2, 4) - 0.15, t1: w(3, 0), sale: 0.25, x: 170, y: -330, w: 330, h: 44, pop: true, marca: 0.5, rotMarca: 'LA MITAD',
  f: [[w(2, 4), 0], [w(2, 8) + 0.2, 0.5, 'out']], barrido: [w(2, 8) + 0.25], caja: [-165, -88, 330, 136] });
E.sfx(w(2, 4), 'fill');
E.obj('rotCada', 'rotulo', { t0: w(2, 4) - 0.1, t1: w(3, 0), sale: 0.25, x: -85, y: -330, texto: 'CADA UNA', size: 24, col: GRIS, pop: true, caja: [-70, -14, 140, 28] });
E.obj('chMitad', 'chispas', { t0: w(2, 8) + 0.2, t1: w(2, 8) + 1.0, x: 170, y: -330, r0: 40, r1: 120, inspeccion: false });
E.obj('barSola', 'relleno', { t0: tSola - 0.1, t1: w(3, 0), sale: 0.25, x: 170, y: -480, w: 330, h: 44, pop: true, rotulo: 'SOLA',
  f: [[tSola, 0], [wf(2, -1) + 0.1, 1, 'out']], barrido: [wf(2, -1) + 0.15], caja: [-165, -56, 330, 78] });
E.sfx(tSola, 'fill');
E.golpe(wf(2, -1) + 0.1, 0.04); E.destello(wf(2, -1) + 0.1, 0.1);

// 3: Tres(0) reglas(1) para(2) tu(3) equipo(4)
E.figura('yo3', { t0: w(3, 0) - 0.05, t1: fin(0), x: -300, talla: 440, cara: true,
  poses: [[0, 'de_pie'], [w(3, 1), 'senalar'], [w(3, 4), 'ofrecer']], sonrisa: [[0, 0.3], [w(3, 1), 0.9]] });
[0, 1, 2].forEach(i => { const a = w(3, 0) + i * 0.13;
  E.obj('r' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: 60 + i * 120, y: -440, r: 36, n: i + 1, pop: true, sfx: i === 0,
    s: i === 0 ? [[0, 1], [wf(3, -1), 1], [wf(3, -1) + 0.3, 1.3, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [wf(3, -1), 1], [wf(3, -1) + 0.3, 0.4]], caja: [-36, -36, 72, 72] }); });
[60, 180, 300].forEach((x, i) => E.figura('gente3_' + i, { t0: w(3, 2) + i * 0.1, t1: N[0].T + 0.2, sale: 0.25, x, talla: 270, color: 'gris', dir: -1,
  poses: [[0, 'de_pie'], [w(3, 4) + i * 0.08, 'celebrar']] }));
E.destello(wf(3, -1), 0.12);

// ---------- 1 · equipos pequeños ----------
// 4: La(0) primera(1) equipos(2) pequeños(3)
// 5: Con(0) cinco(1) personas(2) se(3) ve(4) quién(5) hace(6) cada(7) cosa(8) Con(9) quince(10) no(11)
E.numero(1, N[0].T, N[0].S, { desde: 'r1', hacia: 'cuenta' });
const X5 = i => -140 + i * 115;
const tQ = w(5, 9);   // «Con quince»
E.figura('yoP1', { t0: N[0].S - 0.1, t1: fin(1), x: -375, talla: 400, cara: true,
  poses: [[0, 'de_pie'], [w(4, 2), 'senalar'], [w(5, 0), 'ofrecer'], [w(5, 3), 'senalar'], [tQ, 'encoger'], [w(5, 11), 'manos_cabeza']],
  sonrisa: [[0, 0.3], [w(4, 2), 0.8], [w(5, 8), 1.3], [tQ, -0.2], [w(5, 11), -1.2]] });
// los diez que se suman con «quince» (detrás, más pequeños y apagados)
for (let i = 0; i < 10; i++) { const a = tQ + i * 0.06;
  E.figura('gente5b_' + i, { t0: a, t1: fin(1), x: -197 + (i % 5) * 115 + (i >= 5 ? 57 : 0), talla: i < 5 ? 185 : 200, color: 'gris', fondo: true, inspeccion: false,
    luz: 0.55, poses: [[0, 'de_pie'], [w(5, 11), i % 2 ? 'encoger' : 'de_pie']] }); }
for (let i = 0; i < 5; i++) { const a = N[0].S + i * 0.1;
  E.figura('gente5_' + i, { t0: a, t1: fin(1), x: X5(i), talla: 230, color: 'gris', dir: i < 3 ? 1 : -1,
    poses: [[0, 'de_pie'], [w(5, 5) + i * 0.14, 'levantar'], [tQ, 'de_pie'], [w(5, 11), i % 2 ? 'de_pie' : 'encoger']] });
  // «se ve quién hace cada cosa»: encima de cada uno se enciende su pieza
  E.obj('cosa' + i, 'pieza', { t0: w(5, 3) + i * 0.08, t1: fin(1), x: X5(i), y: -305, r: 28, texto: '✓', pop: true, sfx: i === 0,
    on: [[0, 0], [w(5, 5) + i * 0.14, 0], [w(5, 5) + i * 0.14 + 0.18, 1], [w(5, 10), 1], [w(5, 10) + 0.3 + i * 0.05, 0]], caja: [-28, -28, 56, 56] }); }
E.sfx(w(5, 5), 'fill');
E.obj('cuenta', 'contador', { t0: N[0].S - 0.1, t1: fin(1), x: 90, y: -440, size: 120, miles: false, pop: true, sobrevive: true, r: 70, suave: true,
  v: [[w(5, 0), 0], [w(5, 1) + 0.35, 5, 'lin'], [tQ, 5], [w(5, 10) + 0.4, 15, 'lin']], barrido: [w(5, 1) + 0.4], caja: [-90, -62, 180, 124] });
E.obj('ch5', 'chispas', { t0: w(5, 8), t1: w(5, 8) + 0.8, x: 90, y: -305, r0: 60, r1: 150, inspeccion: false });
E.golpe(w(5, 8), 0.04);
E.temblor(w(5, 11), 12, 0.4);

// ---------- 2 · cada tarea, con un nombre al lado ----------
// 6: La(0) segunda(1) cada(2) tarea(3) con(4) un(5) nombre(6) al(7) lado(8)
// 7: Lo(0) que(1) es(2) de(3) todos(4) al(5) final(6) no(7) lo(8) hace(9) nadie(10)
E.numero(2, N[1].T, N[1].S, { desde: 'cuenta', hacia: 'tareas' });
E.figura('yoP2', { t0: N[1].S - 0.1, t1: fin(2), x: -400, talla: 420, cara: true,
  poses: [[0, 'de_pie'], [w(6, 2), 'senalar'], [w(6, 6), 'ofrecer'], [wf(6, -1), 'celebrar'], [w(7, 0), 'senalar'], [w(7, 7), 'encoger']],
  sonrisa: [[0, 0.3], [w(6, 6), 0.9], [wf(6, -1), 1.5], [w(7, 0), 0.3], [w(7, 7), -0.8]] });
const LY = -300, LG = 86;
E.obj('rotTarea', 'rotulo', { t0: w(6, 3) - 0.1, t1: fin(2), x: -75, y: -445, texto: 'TAREA', size: 26, col: GRIS, pop: true, caja: [-60, -15, 120, 30] });
E.obj('rotNombre', 'rotulo', { t0: w(6, 6) - 0.1, t1: fin(2), x: 120, y: -445, texto: 'NOMBRE', size: 26, col: AM, pop: true, caja: [-70, -15, 140, 30] });
const tNom = i => w(6, 6) + i * 0.3;
E.obj('tareas', 'lista', { t0: N[1].S - 0.1, t1: fin(2), x: -90, y: LY, n: 3, w: 270, gap: LG, pop: true, sobrevive: true, r: 70,
  p: [[tNom(0) + 0.3, 0], [tNom(2) + 0.6, 3, 'lin']], brillo: [[w(6, 2), 0], [w(6, 3) + 0.5, 3, 'lin']], luz: [[0, 1], [w(7, 0), 1], [w(7, 0) + 0.3, 0.6]],
  caja: [-135, -110, 270, 220] });
E.sfx(tNom(0) + 0.3, 'fill');
[0, 1, 2].forEach(i => { const a = tNom(i);
  E.obj('nom' + i, 'pieza', { t0: a, t1: fin(2), entra: 0.08, r: 26, pop: false, estela: 4, sfx: false, libre: true,
    x: [[a, -330], [a + 0.35, 120, 'inout']], y: [[a, -330], [a + 0.18, LY + (i - 1) * LG - 60], [a + 0.35, LY + (i - 1) * LG, 'in']],
    luz: [[0, 1], [w(7, 0), 1], [w(7, 0) + 0.3, 0.6]], caja: [-26, -26, 52, 52] }); });
E.obj('ch6', 'chispas', { t0: tNom(2) + 0.6, t1: tNom(2) + 1.4, x: 120, y: LY, r0: 60, r1: 150, inspeccion: false });
E.golpe(tNom(2) + 0.6, 0.04);
// «Lo que es de todos»: una tarea sin nombre entre tres; «no lo hace nadie»: nadie la coge
E.obj('deTodos', 'bloques', { t0: w(7, 0) - 0.05, t1: fin(2), x: 355, y: -430, n: 1, w: 220, h: 80, pop: true, hechos: 0, caja: [-110, -40, 220, 80] });
E.obj('rotTodos', 'rotulo', { t0: w(7, 3) - 0.1, t1: w(7, 9), sale: 0.12, x: 355, y: -355, texto: 'DE TODOS', size: 26, col: GRIS, pop: true, caja: [-85, -15, 170, 30] });
E.obj('rotNadie', 'rotulo', { t0: w(7, 9) + 0.13, t1: fin(2), x: 355, y: -355, texto: 'NADIE', size: 28, col: ROJO, peso: 700, pop: true, caja: [-60, -16, 120, 32] });
[285, 425].forEach((x, i) => E.figura('gente7_' + i, { t0: w(7, 1) + i * 0.12, t1: fin(2), x, talla: 260, color: 'gris', dir: i ? -1 : 1,
  poses: [[0, 'de_pie'], [w(7, 3) + i * 0.1, 'senalar'], [w(7, 7) + i * 0.1, 'encoger'], [w(7, 10), i ? 'apartarse' : 'encoger']] }));
E.temblor(w(7, 10), 12, 0.4);

// ---------- 3 · que se vea lo que hace cada uno ----------
// 8: La(0) tercera(1) que(2) se(3) vea(4) lo(5) que(6) hace(7) cada(8) uno(9)
// 9: Una(0) lista(1) a(2) la(3) vista(4) de(5) todos(6) basta(7) para(8) que(9) nadie(10) se(11) esconda(12)
E.numero(3, N[2].T, N[2].S, { desde: 'tareas', hacia: 'hace0' });
E.figura('yoP3', { t0: N[2].S - 0.1, t1: TC, x: -400, talla: 420, cara: true,
  poses: [[0, 'de_pie'], [w(8, 2), 'senalar'], [w(8, 7), 'ofrecer'], [w(9, 0), 'senalar'], [w(9, 7), 'de_pie'], [wf(9, -1) + 0.2, 'celebrar']],
  sonrisa: [[0, 0.3], [w(8, 7), 0.9], [w(9, 7), 0.6], [wf(9, -1) + 0.2, 1.5]] });
const BY = [-460, -365, -270], BF = [0.9, 0.7, 0.12];
BY.forEach((y, i) => {
  const a = N[2].S - 0.1 + i * 0.12, b = w(8, 5) + i * 0.3;
  E.obj('quien' + i, 'pieza', { t0: a, t1: TC, x: -190, y, r: 26, pop: true, sfx: false, on: i === 2 ? [[0, 0], [w(9, 10), 0], [w(9, 12) + 0.2, 1]] : [[0, 0], [b, 0], [b + 0.2, 1]], caja: [-26, -26, 52, 52] });
  E.obj('hace' + i, 'relleno', { t0: a, t1: TC, x: 5, y, w: 300, h: 40, pop: true, sobrevive: false,
    f: i === 2 ? [[b, 0], [b + 0.5, BF[i], 'out'], [w(9, 10), BF[i]], [wf(9, -1) + 0.2, 0.85, 'inout']] : [[b, 0], [b + 0.6, BF[i], 'out']],
    barrido: i === 2 ? [wf(9, -1) + 0.25] : [w(9, 4) + i * 0.15], caja: [-150, -20, 300, 40] });
  E.sfx(b, 'fill'); });
E.sfx(w(9, 10), 'fill');
// «Una lista a la vista de todos»: el equipo la mira; «para que nadie se esconda»: el que estaba apagado se enciende y su barra sube
[{ x: 270, luz: 1 }, { x: 370, luz: 1 }, { x: 465, luz: [[0, 0.35], [w(9, 10), 0.35], [w(9, 12), 1]] }].forEach((q, i) =>
  E.figura('gente9_' + i, { t0: w(9, 0) - 0.1 + i * 0.12, t1: TC, x: q.x, talla: 250, color: 'gris', dir: -1, luz: q.luz,
    poses: i === 2 ? [[0, 'encoger'], [w(9, 10), 'encoger'], [w(9, 12), 'de_pie'], [wf(9, -1) + 0.2, 'celebrar']] : [[0, 'de_pie'], [w(9, 4) + i * 0.1, 'senalar'], [w(9, 7), 'de_pie']] }));
E.obj('ch9', 'chispas', { t0: wf(9, -1) + 0.2, t1: wf(9, -1) + 1.0, x: 5, y: BY[2], r0: 60, r1: 170, inspeccion: false });
E.golpe(wf(9, -1) + 0.2, 0.04); E.destello(wf(9, -1) + 0.2, 0.12);

// ---------- cierre: resumen y envío ----------
// 10: Un(0) equipo(1) más(2) grande(3) no(4) siempre(5) saca(6) más(7) trabajo(8)
// 11: Mándaselo(0) a(1) ese(2) compañero(3) que(4) acaba(5) haciendo(6) el(7) trabajo(8) de(9) todos(10)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(10, 8), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, items: ['Equipo pequeño', 'Un nombre', 'A la vista'], gap: 290,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(10, 8)], caja: [-420, -60, 840, 200] });
E.obj('confC', 'confeti', { t0: wf(10, -1), t1: wf(10, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(10, -1), 0.22); E.golpe(wf(10, -1), 0.04);
E.figura('yoF', { t0: w(11, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(11, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(11, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(11, 10)], vuelo: [[wf(11, -1), 0], [wf(11, -1) + 0.5, 1, 'in']] });
