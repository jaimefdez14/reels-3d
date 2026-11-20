// L38 · La matriz de Eisenhower (estilo B; reglas 15, 20, 21, 24)
// Idea visual: una tabla de cuatro casillas (urgente / no urgente × importante / no importante) que se monta por piezas;
// la lista de pendientes se convierte en la moneda 2 y cada casilla recibe su veredicto (HOY, FECHA, A OTRO, BORRAR);
// la casilla FECHA es la moneda 3: lo importante que no corre prisa, la pila que más pesa al final del año.
// Regla 20: «No me ha dado tiempo.» va en bocadillo del muñeco (línea 0); la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(2, 14), gap: 70, y: 360 } });

// «La primera: // …» → T en «La», S en la primera palabra del punto
const N = [3, 5, 7].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(9, 0) - 0.1;   // resumen
const ROJO = '#e4574f', OSC = '#2d2711', GRIS = '#9a9c9b';

E.camara([
  [0, [0, -380, 1.04]], [w(0, 11), [20, -385, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 11), [10, -385, 1.05]], [w(2, 0), [0, -380, 1.01]],
  [w(2, 13), [15, -385, 1.04]], [N[0].T, [0, -390, 1.05]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [-15, -385, 1.04]], [w(4, 8), [10, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 6), [-10, -385, 1.03]], [w(6, 20), [10, -385, 1.04]], [wf(6, -1), [0, -388, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(8, 0), [-10, -385, 1.03]], [wf(8, -1), [10, -390, 1.05]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Te(0) pasas(1) el(2) día(3) sin(4) parar(5) y(6) lo(7) importante(8) sigue(9) sin(10) hacer(11)   [bocadillo «No me ha dado tiempo.»]
// 1: Eisenhower(0) lo(1) contó(2) en(3) 1954(4) lo(5) urgente(6) casi(7) nunca(8) es(9) importante(10) y(11) lo(12) importante(13) casi(14) nunca(15) es(16) urgente(17)
// 2: De(0) ahí(1) sale(2) una(3) tabla(4) de(5) cuatro(6) casillas(7) urgente(8) o(9) no(10) importante(11) o(12) no(13) Y(14) tres(15) reglas(16) para(17) usarla(18)
// «sin parar»: va y viene con prisa entre el móvil que vibra; «lo importante»: la casilla amarilla se queda apagada, sin hacer
E.figura('yo', { t0: 0, t1: fin(0), cara: true,
  x: [[0, -320], [0.9, -370, 'inout'], [1.7, -320, 'inout'], [2.5, -370, 'inout'], [3.2, -350, 'inout']],
  dir: [[0, -1], [0.9, -1], [0.92, 1], [1.7, 1], [1.72, -1], [2.5, -1], [2.52, 1]],
  poses: [[0, 'andar'], [3.2, 'triste'], [w(1, 0), 'de_pie'], [w(1, 2), 'senalar'], [w(1, 6), 'pensar'], [w(1, 12), 'encoger'], [w(2, 2), 'de_pie'], [w(2, 6), 'senalar'], [w(2, 15), 'ofrecer']],
  sonrisa: [[0, -0.4], [w(0, 8), -0.8], [w(0, 11), -1.3], [w(1, 2), 0.3], [w(1, 6), 0], [w(1, 12), -0.4], [w(2, 6), 0.6], [w(2, 15), 1.4]] });
E.obj('movil0', 'telefono', { t0: 0, t1: w(1, 0) - 0.05, sale: 0.25, x: 150, y: -270, w: 160, h: 280,
  vibra: [[0, 1], [w(0, 6), 1], [w(0, 7) + 0.2, 0.25]], brillo: [[0, 1], [w(0, 11), 0.6]], caja: [-80, -140, 160, 280] });
E.obj('rotMovil', 'rotulo', { t0: 0.3, t1: w(1, 0) - 0.05, sale: 0.25, x: 150, y: -95, texto: [[0, 'TODO EL DÍA'], [w(0, 4), 'SIN PARAR']], size: 24, col: GRIS, caja: [-100, -16, 200, 32] });
E.obj('impo0', 'pieza', { t0: w(0, 7) - 0.1, t1: w(1, 0) + 0.1, sale: 0.25, x: 370, y: -230, r: 62, texto: '!', pop: true,
  on: [[0, 1], [w(0, 9), 1], [w(0, 11), 0.15, 'inout']], s: [[0, 1], [w(0, 8), 1.12, 'back'], [w(0, 9), 1]], caja: [-62, -62, 124, 124] });
E.obj('rotImpo0', 'rotulo', { t0: w(0, 8) - 0.05, t1: w(0, 10), sale: 0.12, x: 370, y: -130, pop: true, texto: 'LO IMPORTANTE', size: 22, col: '#e6ce46', caja: [-105, -15, 210, 30] });
E.obj('rotSin0', 'rotulo', { t0: w(0, 10), t1: w(1, 0) + 0.1, entra: 0.12, sale: 0.25, x: 370, y: -130, pop: true, texto: 'SIN HACER', size: 22, col: ROJO, caja: [-105, -15, 210, 30] });
E.obj('bocaH', 'bocadillo', { t0: w(0, 9) - 0.1, t1: w(1, 0) - 0.05, sale: 0.2, x: 10, y: -500, w: 400, h: 80, texto: 'No me ha dado tiempo.', size: 28, pop: true,
  on: [[w(0, 9), 0], [w(0, 11), 1]], caja: [-200, -40, 400, 106] });
E.temblor(w(0, 11), 12, 0.4); E.golpe(w(0, 8), 0.04);
// «Eisenhower lo contó en 1954»: el año rueda; «lo urgente … no es importante / lo importante … no es urgente»: se cruzan
E.obj('rotEis', 'rotulo', { t0: w(1, 0) + 0.05, t1: w(2, 0) + 0.1, sale: 0.25, x: 150, y: -510, texto: 'EISENHOWER', size: 28, col: GRIS, pop: true, caja: [-130, -17, 260, 34] });
E.obj('anyo', 'contador', { t0: w(1, 0) + 0.05, t1: w(2, 0) + 0.1, sale: 0.25, x: 150, y: -420, v: [[w(1, 1), 1900], [w(1, 4) + 0.35, 1954, 'out']], size: 92, col: 'txt', miles: false, pop: true,
  barrido: [w(1, 4) + 0.35], caja: [-130, -50, 260, 100] });
E.golpe(w(1, 4) + 0.35, 0.035);
const XU = [[0, 150], [w(1, 12), 150], [w(1, 12) + 0.35, 360, 'inout'], [w(1, 12) + 0.7, 150, 'inout']];
const XI = [[0, 150], [w(1, 12), 150], [w(1, 12) + 0.35, -80, 'inout'], [w(1, 12) + 0.7, 150, 'inout']];
E.obj('urg1', 'rotulo', { t0: w(1, 6) - 0.1, t1: w(2, 0) + 0.1, sale: 0.25, x: XU, y: [[0, -300], [w(1, 12), -300], [w(1, 12) + 0.7, -140, 'inout']], texto: 'URGENTE', size: 36, col: ROJO, peso: 700, pop: true,
  caja: [-110, -22, 220, 44] });
E.obj('dist1', 'moneda', { t0: w(1, 8) - 0.1, t1: w(2, 0) + 0.1, sale: 0.25, x: 150, y: -220, r: 34, n: '≠', pop: true, sfx: true, rot: [[0, 0], [w(1, 12), 0], [w(1, 12) + 0.7, Math.PI, 'inout']],
  caja: [-34, -34, 68, 68] });
E.obj('imp1', 'rotulo', { t0: w(1, 10) - 0.1, t1: w(2, 0) + 0.1, sale: 0.25, x: XI, y: [[0, -140], [w(1, 12), -140], [w(1, 12) + 0.7, -300, 'inout']], texto: 'IMPORTANTE', size: 36, col: '#e6ce46', peso: 700, pop: true,
  caja: [-150, -22, 300, 44] });
E.sfx(w(1, 12), 'whoosh'); E.golpe(w(1, 12) + 0.7, 0.03);
// «una tabla de cuatro casillas»: se monta pieza a pieza; «urgente o no / importante o no»: los rótulos de los ejes
const GX = [-20, 150], GY = [-320, -150];
const Q = [[0, 0], [1, 0], [0, 1], [1, 1]];
Q.forEach(([cx, cy], i) => { const a = w(2, 4) + i * 0.16;
  E.obj('q0_' + i, 'pieza', { t0: a, t1: i === 1 ? fin(0) : N[0].T + 0.2, sale: 0.25, x: GX[cx], y: GY[cy], r: 75, pop: true, sfx: true,
    on: [[0, 0], [w(2, 8) + 0.1 * cx, 0], [w(2, 8) + 0.1 * cx + 0.25, cx === 0 ? 0.6 : 0, 'out'], [w(2, 11), cx === 0 ? 0.6 : 0], [w(2, 11) + 0.25, cy === 0 ? 1 : (cx === 0 ? 0.25 : 0), 'out']],
    luz: [[0, 1], [w(2, 14), 1], [w(2, 14) + 0.3, 0.45]], caja: [-75, -75, 150, 150] }); });
E.sfx(w(2, 4), 'fill');
E.obj('colU', 'rotulo', { t0: w(2, 8) - 0.05, t1: N[0].T + 0.2, sale: 0.25, x: GX[0], y: -430, texto: 'URGENTE', size: 20, col: GRIS, pop: true, caja: [-80, -14, 160, 28] });
E.obj('colN', 'rotulo', { t0: w(2, 9) + 0.05, t1: N[0].T + 0.2, sale: 0.25, x: GX[1], y: -430, texto: 'NO URGENTE', size: 20, col: GRIS, pop: true, caja: [-82, -14, 164, 28] });
E.obj('filI', 'rotulo', { t0: w(2, 11) - 0.05, t1: N[0].T + 0.2, sale: 0.25, x: 345, y: GY[0], texto: 'IMPORTANTE', size: 20, col: '#e6ce46', pop: true, track: 2, caja: [-95, -14, 190, 28] });
E.obj('filN', 'rotulo', { t0: w(2, 12) + 0.05, t1: N[0].T + 0.2, sale: 0.25, x: 345, y: GY[1], texto: 'NO IMPORTANTE', size: 20, col: GRIS, pop: true, track: 2, caja: [-95, -14, 190, 28] });
E.obj('chQ', 'chispas', { t0: w(2, 11) + 0.25, t1: w(2, 11) + 1.05, x: 65, y: -320, r0: 110, r1: 230, inspeccion: false });
// «Y tres reglas para usarla»: tres monedas; la primera sobrevive y será el número 1
[0, 1, 2].forEach(i => { const a = w(2, 15) + i * 0.12;
  E.obj('s' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: -20 + i * 85, y: -530, r: 32, n: i + 1, pop: true, sfx: i === 0, inspeccion: false,
    s: i === 0 ? [[0, 1], [wf(2, -1), 1], [wf(2, -1) + 0.35, 1.3, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [wf(2, -1), 1], [wf(2, -1) + 0.3, 0.4]], barrido: i === 0 ? [wf(2, -1)] : null }); });
E.destello(wf(2, -1), 0.12);

// ---------- 1 · apunta todo lo que tienes pendiente ----------
// 3: La(0) primera(1) apunta(2) todo(3) lo(4) que(5) tienes(6) pendiente(7)
// 4: Todo(0) sin(1) ordenar(2) Mientras(3) lo(4) lleves(5) en(6) la(7) cabeza(8) todo(9) te(10) parecerá(11) urgente(12)
E.numero(1, N[0].T, N[0].S, { desde: 's1', hacia: 'lista1' });
const L1X = 170;
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -350, cara: true,
  poses: [[0, 'de_pie'], [w(3, 2), 'escribir'], [w(4, 3), 'de_pie', 0.3], [w(4, 5), 'manos_cabeza'], [w(4, 11), 'encoger'], [wf(4, -1) + 0.1, 'senalar']],
  sonrisa: [[w(3, 2), 0.6], [wf(3, -1), 1.2], [w(4, 5), -1], [w(4, 11), -0.6], [wf(4, -1) + 0.1, 0.6]] });
// la lista se escribe renglón a renglón y la barra APUNTADO se llena
E.obj('lista1', 'lista', { t0: N[0].S - 0.1, t1: fin(1), x: L1X, y: -330, n: 5, w: 300, gap: 62, sobrevive: true, r: 80,
  brillo: [[w(3, 2), 0], [wf(3, -1), 5, 'inout'], [w(4, 0), 5]], p: 0,
  rot: [[0, 0], [w(4, 0), 0], [w(4, 0) + 0.15, 0.04], [w(4, 0) + 0.3, -0.03], [w(4, 1) + 0.2, 0.02], [w(4, 2) + 0.2, 0, 'out']], caja: [-150, -142, 300, 284] });
E.obj('apunt1', 'relleno', { t0: N[0].S + 0.1, t1: fin(1), x: L1X, y: -110, w: 320, h: 42, rotulo: [[0, 'APUNTADO'], [w(4, 0), 'TODO, SIN ORDENAR']],
  f: [[w(3, 2), 0], [wf(3, -1) + 0.1, 1, 'inout']], barrido: [wf(3, -1) + 0.1], caja: [-160, -55, 320, 76] });
E.sfx(w(3, 2), 'fill');
for (let i = 0; i < 5; i++) { const a = w(3, 2) + i * 0.32;
  E.obj('lapiz' + i, 'pulso', { t0: a, t1: a + 0.6, x: L1X - 90, y: -330 + (i - 2) * 62, r0: 10, r1: 50, dur: 0.5, inspeccion: false }); }
E.obj('ch1a', 'chispas', { t0: wf(3, -1) + 0.1, t1: wf(3, -1) + 0.9, x: L1X, y: -330, r0: 120, r1: 230, inspeccion: false });
E.golpe(wf(3, -1) + 0.1, 0.04);
// «Mientras lo lleves en la cabeza»: la maraña junto a la cabeza; «todo te parecerá urgente»: se vuelve roja
E.obj('lio1', 'maraña', { t0: w(4, 5) - 0.1, t1: w(4, 12) + 0.02, sale: 0.05, x: -150, y: -470, r: 55, p: [[w(4, 5), 0], [w(4, 8) + 0.2, 1, 'out']], rot: [[w(4, 5), 0], [fin(1), 1.2, 'lin']],
  caja: [-70, -40, 140, 80] });
E.obj('lio1r', 'maraña', { t0: w(4, 12) + 0.03, t1: fin(1), entra: 0.1, x: -150, y: -470, r: 55, col: ROJO, rot: [[w(4, 5), 0], [fin(1), 1.2, 'lin']], s: [[w(4, 12), 1], [w(4, 12) + 0.3, 1.15, 'back']], caja: [-70, -40, 140, 80] });
E.obj('urg4', 'rotulo', { t0: w(4, 12) - 0.05, t1: fin(1), x: -150, y: -385, texto: 'TODO URGENTE', size: 26, col: ROJO, peso: 700, pop: true, caja: [-110, -17, 220, 34] });
E.temblor(w(4, 12), 12, 0.4);

// ---------- 2 · sepáralo en cuatro ----------
// 5: La(0) segunda(1) sepáralo(2) en(3) cuatro(4)
// 6: Urgente(0) e(1) importante(2) lo(3) haces(4) hoy(5) Importante(6) sin(7) prisa(8) le(9) pones(10) fecha(11) Urgente(12) sin(13) importancia(14)
//    se(15) lo(16) pasas(17) a(18) otro(19) Lo(20) que(21) no(22) es(23) ni(24) una(25) cosa(26) ni(27) otra(28) lo(29) borras(30)
E.numero(2, N[1].T, N[1].S, { desde: 'lista1', hacia: 'q2_0' });
const HX = [-60, 110], HY = [-320, -150];
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -370, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'senalar'], [w(6, 0), 'senalar'], [w(6, 4), 'celebrar'], [w(6, 6), 'senalar'], [w(6, 9), 'escribir'], [w(6, 12), 'de_pie'],
    [w(6, 15), 'ofrecer'], [w(6, 20), 'pensar'], [w(6, 29), 'apartarse'], [wf(6, -1) + 0.1, 'celebrar']],
  sonrisa: [[w(5, 2), 0.5], [w(6, 4), 1.4], [w(6, 9), 0.8], [w(6, 15), 0.6], [w(6, 20), 0], [w(6, 29), 0.8], [wf(6, -1) + 0.1, 1.5]] });
// las cuatro casillas entran por piezas con «cuatro»; cada una recibe su veredicto cuando la voz lo dice
const V = [
  { q: [0, 0], ini: w(6, 0), ver: w(6, 4), txt: 'HOY', on: 1 },
  { q: [1, 0], ini: w(6, 6), ver: w(6, 10), txt: 'FECHA', on: 1 },
  { q: [0, 1], ini: w(6, 12), ver: w(6, 17), txt: 'A OTRO', on: 0 },
  { q: [1, 1], ini: w(6, 20), ver: w(6, 29), txt: 'BORRAR', on: 0 },
];
V.forEach((v, i) => { const [cx, cy] = v.q, a = i === 0 ? N[1].S - 0.1 : w(5, 4) + (i - 1) * 0.14;
  const borra = i === 3;
  E.obj('q2_' + i, 'pieza', { t0: a, t1: i === 1 ? fin(2) : (borra ? wf(6, -1) + 0.45 : fin(2)), sale: borra ? 0.15 : 0.3, x: HX[cx], y: HY[cy], r: 75, pop: true, sfx: i > 0,
    sobrevive: i === 1,
    on: [[0, 0], [v.ini, 0], [v.ini + 0.3, v.on ? 1 : 0.3, 'out']],
    s: borra ? [[0, 1], [v.ini, 1], [v.ini + 0.25, 1.08, 'back'], [w(6, 30), 1], [wf(6, -1) + 0.3, 0.05, 'in']] : [[0, 1], [v.ini, 1], [v.ini + 0.25, 1.1, 'back'], [v.ini + 0.5, 1]],
    barrido: v.on ? [v.ver] : null, caja: [-75, -75, 150, 150] });
  E.obj('v2_' + i, 'rotulo', { t0: v.ver - 0.05, t1: borra ? wf(6, -1) + 0.2 : fin(2), sale: 0.2, x: HX[cx], y: HY[cy], texto: v.txt, size: v.txt.length > 4 ? 26 : 32, peso: 700,
    col: v.on ? OSC : '#e9ebea', track: 2, pop: true, libre: true, caja: [-70, -18, 140, 36] });
  E.obj('ch2_' + i, 'chispas', { t0: v.ver, t1: v.ver + 0.8, x: HX[cx], y: HY[cy], r0: 80, r1: 160, inspeccion: false });
  E.golpe(v.ver, 0.025);
});
E.sfx(w(5, 4), 'fill');
E.obj('colU2', 'rotulo', { t0: w(5, 4) + 0.1, t1: fin(2), x: HX[0], y: -430, texto: 'URGENTE', size: 20, col: GRIS, pop: true, caja: [-80, -14, 160, 28] });
E.obj('colN2', 'rotulo', { t0: w(5, 4) + 0.2, t1: fin(2), x: HX[1], y: -430, texto: 'NO URGENTE', size: 20, col: GRIS, pop: true, caja: [-82, -14, 164, 28] });
// el contador suma las casillas decididas: 0 → 4
E.obj('cuenta2', 'contador', { t0: w(6, 0) - 0.1, t1: fin(2), x: 370, y: -500, pop: true, suf: ' de 4', size: 50, col: 'txt', miles: false,
  v: [[w(6, 0), 0], [w(6, 4), 0], [w(6, 5), 1, 'out'], [w(6, 10), 1], [w(6, 11), 2, 'out'], [w(6, 17), 2], [w(6, 18), 3, 'out'], [w(6, 30), 3], [wf(6, -1), 4, 'out']],
  barrido: [wf(6, -1)], caja: [-110, -30, 220, 60] });
// «se lo pasas a otro»: aparece un compañero y la casilla le lanza una pieza
E.figura('otro', { t0: w(6, 12) - 0.1, t1: fin(2), x: 380, talla: 380, color: 'gris', dir: -1, toca: ['pasa2'],
  poses: [[0, 'de_pie'], [w(6, 17), 'coger'], [w(6, 19) + 0.3, 'de_pie']] });
E.obj('pasa2', 'pieza', { t0: w(6, 17), t1: w(6, 17) + 0.75, entra: 0.06, sale: 0.15, r: 26, libre: true, estela: 5, inspeccion: false,
  x: [[w(6, 17), HX[0]], [w(6, 17) + 0.6, 320, 'inout']], y: [[w(6, 17), HY[1]], [w(6, 17) + 0.3, -300], [w(6, 17) + 0.6, -210, 'in']], on: 0.3 });
E.sfx(w(6, 17), 'whoosh');
// «lo borras»: la casilla se encoge con una onda
E.obj('borra2', 'pulso', { t0: w(6, 30), t1: w(6, 30) + 0.7, x: HX[1], y: HY[1], r0: 40, r1: 150, inspeccion: false });
E.sfx(w(6, 30), 'whoosh');
E.destello(wf(6, -1), 0.1);

// ---------- 3 · después de lo de hoy, lo importante que no corre prisa ----------
// 7: La(0) tercera(1) después(2) de(3) lo(4) de(5) hoy(6) sigue(7) con(8) lo(9) importante(10) que(11) no(12) corre(13) prisa(14)
// 8: Es(0) lo(1) que(2) más(3) pesa(4) al(5) final(6) del(7) año(8) y(9) lo(10) primero(11) que(12) se(13) queda(14) sin(15) hacer(16)
E.numero(3, N[2].T, N[2].S, { desde: 'q2_1', hacia: 'imp3' });
const B3 = 130;
E.figura('yo3', { t0: N[2].S - 0.1, t1: TC, x: -370, cara: true,
  poses: [[0, 'de_pie'], [w(7, 2), 'senalar'], [w(7, 6), 'celebrar'], [w(7, 7), 'senalar'], [wf(7, -1), 'celebrar'], [w(8, 0), 'de_pie'], [w(8, 3), 'senalar'], [w(8, 9), 'pensar'], [w(8, 13), 'manos_cabeza']],
  sonrisa: [[w(7, 2), 0.5], [w(7, 6), 1.2], [w(7, 7), 0.6], [wf(7, -1), 1.5], [w(8, 3), 0.6], [w(8, 9), -0.2], [w(8, 13), -1.2]] });
E.obj('hoy3', 'relleno', { t0: N[2].S - 0.15, t1: w(8, 0) + 0.1, sale: 0.25, x: B3, y: -430, w: 400, h: 46, rotulo: [[0, 'LO DE HOY'], [w(7, 6) + 0.3, 'LO DE HOY, HECHO']],
  f: [[w(7, 2), 0], [w(7, 6) + 0.3, 1, 'inout']], barrido: [w(7, 6) + 0.3], caja: [-200, -57, 400, 80] });
E.obj('imp3', 'relleno', { t0: N[2].S - 0.1, t1: w(8, 0) + 0.1, sale: 0.25, x: B3, y: -280, w: 400, h: 46, rotulo: 'IMPORTANTE, SIN PRISA', r: 60,
  f: [[w(7, 7), 0], [wf(7, -1), 1, 'inout']], barrido: [wf(7, -1)], caja: [-200, -57, 400, 80] });
E.sfx(w(7, 2), 'fill'); E.sfx(w(7, 7), 'fill');
E.obj('flecha3', 'flecha', { t0: w(7, 6) + 0.2, t1: w(8, 0) + 0.1, sale: 0.2, de: [B3 + 225, -420], hasta: [B3 + 225, -300], curva: -0.6, p: [[w(7, 6) + 0.2, 0], [w(7, 7) + 0.2, 1, 'out']], inspeccion: false });
E.obj('ch3a', 'chispas', { t0: w(7, 6) + 0.3, t1: w(7, 6) + 1.1, x: B3, y: -430, r0: 110, r1: 220, inspeccion: false });
E.obj('ch3b', 'chispas', { t0: wf(7, -1), t1: wf(7, -1) + 0.8, x: B3, y: -280, r0: 110, r1: 220, inspeccion: false });
E.golpe(wf(7, -1), 0.04);
// «Es lo que más pesa al final del año»: pasan los meses y la pila de lo importante crece mucho más que la de lo urgente;
// «lo primero que se queda sin hacer»: se apaga
E.obj('meses3', 'dias', { t0: w(8, 0) - 0.05, t1: TC, x: B3, y: -470, letras: ['ENE', 'MAR', 'JUN', 'SEP', 'DIC'], gap: 96, pop: true,
  luz: [[w(8, 0), 0], [w(8, 8), 4, 'inout']], caja: [-230, -32, 460, 64] });
E.obj('rotAnyo', 'rotulo', { t0: w(8, 6), t1: TC, x: B3, y: -400, texto: 'FINAL DEL AÑO', size: 22, col: '#e6ce46', pop: true, caja: [-100, -15, 200, 30] });
E.obj('pilaU', 'pila', { t0: w(8, 0), t1: TC, x: 30, n: 3, w: 150, hh: 26, k: [[w(8, 0), 0], [w(8, 8), 3, 'inout']], luz: 0.7, caja: [-75, -70, 150, 70], refl: true });
E.obj('rotU3', 'rotulo', { t0: w(8, 0), t1: TC, x: 30, y: -105, texto: 'URGENTE', size: 22, col: GRIS, pop: true, caja: [-75, -15, 150, 30] });
E.obj('pilaI', 'pila', { t0: w(8, 0) + 0.1, t1: TC, x: 240, n: 10, w: 170, hh: 26, k: [[w(8, 0), 0], [w(8, 8), 10, 'inout']],
  luz: [[0, 1], [w(8, 13), 1], [w(8, 15), 0.35]], barrido: [w(8, 8)], caja: [-85, -224, 170, 224], refl: true });
E.obj('rotI3', 'rotulo', { t0: w(8, 0) + 0.1, t1: w(8, 14), sale: 0.12, x: 240, y: -262, texto: 'IMPORTANTE', size: 22, col: '#e6ce46', pop: true, caja: [-90, -15, 180, 30] });
E.obj('rotSin3', 'rotulo', { t0: w(8, 14), t1: TC, entra: 0.12, x: 240, y: -262, texto: 'SIN HACER', size: 22, col: ROJO, pop: true, caja: [-90, -15, 180, 30] });
E.sfx(w(8, 0), 'fill'); E.golpe(w(8, 8), 0.04);
E.obj('ch3c', 'chispas', { t0: w(8, 8), t1: w(8, 8) + 0.8, x: 240, y: -120, r0: 110, r1: 210, inspeccion: false });
E.temblor(w(8, 14), 12, 0.4);

// ---------- cierre: resumen y envío ----------
// 9: Estar(0) ocupado(1) no(2) es(3) lo(4) mismo(5) que(6) avanzar(7)
// 10: Mándaselo(0) a(1) ese(2) amigo(3) que(4) siempre(5) está(6) apagando(7) fuegos(8)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(9, 5), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, items: ['Apúntalo', 'Sepáralo', 'Lo importante'], gap: 250,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [wf(9, -1) - 0.2], caja: [-380, -60, 760, 200] });
E.obj('confC', 'confeti', { t0: wf(9, -1), t1: wf(9, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(9, -1), 0.22); E.golpe(wf(9, -1), 0.04);
E.figura('yoF', { t0: w(10, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(10, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(10, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(10, 7)], vuelo: [[wf(10, -1), 0], [wf(10, -1) + 0.5, 1, 'in']] });
