// L67 · El efecto foco (estilo B; reglas 15, 20, 21, 24)
// Idea visual: un foco de luz sigue al muñeco después de su error y tres compañeros le señalan (lo que él cree); en cuanto
// la voz dice «casi nadie lo ha visto», se dan la vuelta y el foco se apaga. El experimento del año 2000 se ve con una clase
// de cuatro: la barra de «media clase» baja a «uno de cada cuatro» y solo uno sigue mirando.
// Tres reglas: la barra de lo que crees que han notado se parte por la mitad (marca «ENTRE DOS»), una disculpa que se marca
// una sola vez (y las demás son bocadillos grises que solo enredan al otro), y la barra de «pregúntate» que se vacía al
// llegar a «el mes pasado».
// Contador que suma: el año 2000 rueda. Regla 20: «Qué vergüenza.» va en bocadillo del muñeco; la voz solo narra.
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
  [0, [0, -380, 1.04]], [w(0, 8), [-20, -385, 1.07]], [w(0, 11), [10, -385, 1.03]], [w(1, 0), [0, -380, 1.02]], [w(1, 8), [-10, -390, 1.06]],
  [w(2, 0), [0, -380, 1.02]], [w(2, 10), [10, -385, 1.05]], [w(2, 19), [15, -385, 1.06]], [w(3, 0), [0, -380, 1.02]], [N[0].T, [10, -390, 1.05]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(5, 0), [15, -385, 1.04]], [w(5, 9), [-10, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(7, 0), [-15, -385, 1.04]], [w(7, 6), [15, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(9, 0), [15, -385, 1.03]], [w(9, 9), [-10, -385, 1.06]], [TC - 0.1, [0, -385, 1.04]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Crees(0) que(1) todos(2) se(3) han(4) fijado(5) en(6) tu(7) error(8) y(9) casi(10) nadie(11) lo(12) ha(13) visto(14)   [bocadillo «Qué vergüenza.»]
// fotograma 0: el muñeco con las manos en la cabeza bajo un foco, papeles por el suelo y tres compañeros mirándole;
// «todos»: le señalan; «error»: caen más papeles y golpe; «casi nadie lo ha visto»: se dan la vuelta y el foco se apaga
const XH = -230;
E.obj('foco0', 'rayos', { t0: 0, t1: w(1, 0), sale: 0.3, x: XH, y: -170, r: 330, z: -2, giro: 0.15,
  p: [[0, 0.75], [w(0, 2), 1, 'out'], [w(0, 10), 1], [wf(0, -1), 0.1, 'inout']], inspeccion: false, sinDim: true });
E.figura('yo', { t0: 0, t1: w(1, 0), sale: 0.25, x: XH, talla: 330, cara: true,
  poses: [[0, 'manos_cabeza'], [w(0, 8), 'triste'], [w(0, 10), 'encoger'], [w(0, 14), 'de_pie']],
  sonrisa: [[0, -1.2], [w(0, 8), -1.5], [w(0, 10), -0.3], [w(0, 14), 0.6]] });
E.obj('bocaH', 'bocadillo', { t0: 0.3, t1: w(0, 10), sale: 0.2, x: XH + 40, y: -470, w: 300, h: 76, texto: 'Qué vergüenza.', size: 30, pop: true,
  on: [[0.3, 0], [0.8, 1]], caja: [-150, -38, 300, 102] });
E.obj('papeles0', 'papeles', { t0: 0, t1: w(1, 0), sale: 0.25, x: -40, y: -14, n: 5, k: [[0, 2], [w(0, 7), 2], [w(0, 8) + 0.3, 5, 'out']], caja: [-95, -95, 190, 110] });
E.obj('rotErr', 'rotulo', { t0: w(0, 7), t1: w(0, 11), sale: 0.2, x: -40, y: -175, texto: 'TU ERROR', size: 28, col: ROJO, pop: true, caja: [-75, -16, 150, 32] });
E.temblor(w(0, 8), 14, 0.45); E.golpe(w(0, 8), 0.05);
[190, 300, 410].forEach((x, i) => E.figura('mira' + i, { t0: 0, t1: w(1, 0), sale: 0.25, x, talla: 250, color: 'gris', cara: true,
  dir: i === 0 ? -1 : [[0, -1], [w(0, 11) + i * 0.1, -1], [w(0, 11) + i * 0.1 + 0.25, 1, 'inout']],
  poses: [[0, 'de_pie'], [w(0, 2) + i * 0.1, 'senalar'], [w(0, 10) + i * 0.1, 'de_pie']], sonrisa: [[0, 0.2], [w(0, 2), -0.4], [w(0, 10), 0.6]] }));
E.obj('pulsoH', 'pulso', { t0: w(0, 12), t1: w(0, 12) + 0.7, x: 190, y: -150, r0: 30, r1: 120, inspeccion: false });

// 1: Se(0) llama(1) efecto(2) foco(3) creemos(4) que(5) los(6) demás(7) nos(8) miran(9) mucho(10) más(11) de(12) lo(13) que(14) nos(15) miran(16)
// el foco vuelve sobre el muñeco; la barra de «creemos que nos miran» se llena casi entera y la de «nos miran» se queda corta
E.obj('foco1', 'rayos', { t0: w(1, 0), t1: w(2, 0), sale: 0.3, x: -355, y: -160, r: 280, z: -2, giro: 0.15,
  p: [[w(1, 0), 0], [w(1, 3), 0.6, 'out'], [w(1, 8), 0.6], [w(1, 9) + 0.3, 1, 'out']], inspeccion: false, sinDim: true });
E.figura('yo1', { t0: w(1, 0) + 0.05, t1: w(2, 0), sale: 0.25, x: -355, talla: 320, cara: true,
  poses: [[0, 'de_pie'], [w(1, 2), 'senalar'], [w(1, 4), 'pensar'], [w(1, 8), 'manos_cabeza'], [w(1, 12), 'encoger']],
  sonrisa: [[0, 0.3], [w(1, 2), 0.8], [w(1, 4), 0], [w(1, 8), -1], [w(1, 12), 0.2]] });
E.obj('rotFoco', 'rotulo', { t0: w(1, 2) - 0.1, t1: w(2, 0), sale: 0.25, x: 130, y: -470, texto: 'EFECTO FOCO', size: 36, col: AM, peso: 700, pop: true, caja: [-150, -20, 300, 40] });
E.obj('chFoco', 'chispas', { t0: w(1, 3), t1: w(1, 3) + 0.8, x: 130, y: -470, r0: 100, r1: 210, inspeccion: false });
E.golpe(w(1, 3), 0.04); E.destello(w(1, 3), 0.1);
E.obj('creemos', 'relleno', { t0: w(1, 4) - 0.1, t1: w(2, 0), sale: 0.25, x: 130, y: -330, w: 340, h: 44, pop: true, rotulo: 'CREEMOS QUE NOS MIRAN',
  f: [[w(1, 5), 0], [w(1, 9) + 0.3, 0.95, 'out']], caja: [-170, -56, 340, 78] });
E.obj('miran', 'relleno', { t0: w(1, 10) - 0.1, t1: w(2, 0), sale: 0.25, x: 130, y: -200, w: 340, h: 44, pop: true, rotulo: 'NOS MIRAN',
  f: [[w(1, 12), 0], [w(1, 16) + 0.2, 0.25, 'out']], caja: [-170, -56, 340, 78] });
E.sfx(w(1, 5), 'fill'); E.sfx(w(1, 12), 'fill');
E.obj('chCree', 'chispas', { t0: w(1, 9) + 0.3, t1: w(1, 9) + 1.1, x: 290, y: -330, r0: 30, r1: 110, inspeccion: false });
E.temblor(w(1, 11), 8, 0.3);

// 2: Lo(0) probaron(1) en(2) el(3) año(4) 2000(5) con(6) una(7) camiseta(8) ridícula(9) quien(10) la(11) llevaba(12) creía(13) que(14)
//    la(15) vería(16) media(17) clase(18) y(19) solo(20) se(21) fijó(22) uno(23) de(24) cada(25) cuatro(26)
E.figura('yo2', { t0: w(2, 0) - 0.05, t1: w(3, 0), sale: 0.25, x: -355, talla: 320, cara: true,
  poses: [[0, 'de_pie'], [w(2, 1), 'senalar'], [w(2, 8), 'celebrar'], [w(2, 12), 'encoger'], [w(2, 13), 'manos_cabeza'], [w(2, 19), 'de_pie'], [w(2, 23), 'celebrar']],
  sonrisa: [[0, 0.3], [w(2, 1), 0.8], [w(2, 8), 1.4], [w(2, 13), -1.2], [w(2, 19), 0], [w(2, 23), 1.3]] });
E.obj('anio', 'contador', { t0: w(2, 1), t1: w(2, 7) + 0.2, sale: 0.2, x: 100, y: -400, size: 120, miles: false, pop: true,
  v: [[w(2, 2), 0], [w(2, 5) + 0.3, 2000, 'out']], barrido: [w(2, 5) + 0.35], caja: [-170, -60, 340, 120] });
E.obj('chAnio', 'chispas', { t0: w(2, 5) + 0.3, t1: w(2, 5) + 1.1, x: 100, y: -400, r0: 150, r1: 250, inspeccion: false });
E.golpe(w(2, 5) + 0.3, 0.04);
E.obj('rotCam', 'rotulo', { t0: w(2, 9) - 0.1, t1: w(3, 0), sale: 0.25, x: 100, y: -450, texto: 'CAMISETA RIDÍCULA', size: 30, col: AM, pop: true, caja: [-185, -17, 370, 34] });
E.obj('pulsoCam', 'pulso', { t0: w(2, 9), t1: w(2, 9) + 0.7, x: -355, y: -170, r0: 50, r1: 180, inspeccion: false });
E.destello(w(2, 9), 0.08);
// la clase: cuatro compañeros grises; «media clase»: la barra se llena a la mitad; «uno de cada cuatro»: baja a un cuarto,
// tres se dan la vuelta y solo el primero sigue mirando
const CL = [110, 210, 310, 410];
CL.forEach((x, i) => E.figura('cl' + i, { t0: w(2, 10) - 0.1 + i * 0.1, t1: w(3, 0), sale: 0.25, x, talla: 220, color: 'gris', cara: true,
  dir: i === 0 ? -1 : [[0, -1], [w(2, 20) + i * 0.1, -1], [w(2, 20) + i * 0.1 + 0.25, 1, 'inout']],
  poses: i === 0 ? [[0, 'de_pie'], [w(2, 23), 'senalar']] : [[0, 'de_pie'], [w(2, 21) + i * 0.1, 'encoger'], [w(2, 22) + 0.4, 'de_pie']], sonrisa: 0.4 }));
E.obj('media', 'relleno', { t0: w(2, 13), t1: w(3, 0), sale: 0.25, x: 150, y: -320, w: 340, h: 44, pop: true,
  rotulo: [[0, 'MEDIA CLASE'], [w(2, 23), 'UNO DE CADA CUATRO']],
  f: [[w(2, 15), 0], [w(2, 18) + 0.3, 0.5, 'out'], [w(2, 22), 0.5], [w(2, 26) + 0.2, 0.25, 'inout']], caja: [-170, -56, 340, 78] });
E.sfx(w(2, 15), 'fill');
E.obj('pulsoCl', 'pulso', { t0: w(2, 23), t1: w(2, 23) + 0.7, x: 110, y: -120, r0: 30, r1: 120, inspeccion: false });
E.obj('chCl', 'chispas', { t0: wf(2, -1), t1: wf(2, -1) + 0.8, x: 110, y: -120, r0: 60, r1: 150, inspeccion: false });
E.golpe(wf(2, -1), 0.04);

// 3: Tres(0) reglas(1) para(2) cuando(3) metas(4) la(5) pata(6)
// tres monedas en fila; «metas la pata»: el muñeco tropieza y se le caen los papeles
E.figura('yo3', { t0: w(3, 0) - 0.05, t1: fin(0), x: -355, talla: 320, cara: true,
  poses: [[0, 'de_pie'], [w(3, 1), 'senalar'], [w(3, 4), 'apartarse'], [wf(3, -1) + 0.1, 'encoger']],
  sonrisa: [[0, 0.4], [w(3, 1), 0.9], [w(3, 4), -0.8], [wf(3, -1) + 0.1, 0.4]] });
[0, 1, 2].forEach(i => { const a = w(3, 0) + i * 0.13;
  E.obj('m' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: 30 + i * 120, y: -420, r: 40, n: '', pop: true, sfx: i === 0,
    s: i === 0 ? [[0, 1], [wf(3, -1), 1], [wf(3, -1) + 0.3, 1.25, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [wf(3, -1), 1], [wf(3, -1) + 0.3, 0.4]], caja: [-40, -40, 80, 80] }); });
E.obj('papeles3', 'papeles', { t0: w(3, 4) - 0.1, t1: fin(0), sale: 0.2, x: -170, y: -14, n: 4, k: [[w(3, 4), 0], [wf(3, -1), 4, 'out']], caja: [-95, -85, 190, 100] });
E.temblor(w(3, 6), 10, 0.35);

// ---------- 1 · divide entre dos ----------
// 4: La(0) primera(1) divide(2) entre(3) dos(4)
// 5: Lo(0) que(1) crees(2) que(3) han(4) notado(5) lo(6) ha(7) notado(8) la(9) mitad(10) como(11) mucho(12)
E.numero(1, N[0].T, N[0].S, { desde: 'm1', hacia: 'cree' });
E.figura('yoP1', { t0: N[0].S - 0.1, t1: fin(1), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(4, 2), 'ofrecer'], [w(4, 4), 'senalar'], [w(5, 0), 'pensar'], [w(5, 6), 'senalar'], [w(5, 10), 'celebrar']],
  sonrisa: [[0, 0.3], [w(4, 2), 0.6], [w(4, 4), 1], [w(5, 0), 0], [w(5, 6), 0.6], [w(5, 10), 1.5]] });
E.obj('cree', 'barra', { t0: N[0].S - 0.1, t1: fin(1), x: 120, y: -400, w: 440, h: 44, pop: true, sobrevive: false, r: 60,
  marca: [[0, -1], [w(4, 2) - 0.01, -1], [w(4, 2), 0.5]], rotMarca: 'ENTRE DOS',
  f: [[N[0].S + 0.1, 0], [w(4, 2) - 0.1, 1, 'out'], [w(4, 3), 1], [w(4, 4) + 0.3, 0.5, 'inout']], barrido: [w(4, 4) + 0.35, w(5, 10) + 0.3], caja: [-220, -100, 440, 128] });
E.sfx(N[0].S + 0.1, 'fill'); E.sfx(w(4, 2), 'thud');
E.obj('ch1', 'chispas', { t0: w(4, 4) + 0.3, t1: w(4, 4) + 1.1, x: 120, y: -400, r0: 40, r1: 130, inspeccion: false });
E.golpe(w(4, 4) + 0.3, 0.04);
// «lo que crees que han notado»: cuatro compañeros te miran; «la mitad como mucho»: dos se dan la vuelta
CL.forEach((x, i) => E.figura('nt' + i, { t0: w(5, 0) - 0.1 + i * 0.1, t1: fin(1), x, talla: 220, color: 'gris', cara: true,
  dir: i < 2 ? -1 : [[0, -1], [w(5, 9) + (i - 2) * 0.12, -1], [w(5, 9) + (i - 2) * 0.12 + 0.25, 1, 'inout']],
  poses: [[0, 'de_pie'], [w(5, 4) + i * 0.08, 'senalar'], [w(5, 9) + i * 0.08, i < 2 ? 'senalar' : 'de_pie']], sonrisa: 0.3 }));
E.obj('pulsoNt', 'pulso', { t0: w(5, 10), t1: w(5, 10) + 0.7, x: 160, y: -120, r0: 40, r1: 160, inspeccion: false });
E.destello(w(5, 10) + 0.3, 0.1);

// ---------- 2 · discúlpate una sola vez ----------
// 6: La(0) segunda(1) discúlpate(2) una(3) sola(4) vez(5)
// 7: Con(0) una(1) disculpa(2) basta(3) Las(4) demás(5) solo(6) sirven(7) para(8) recordarlo(9)
E.numero(2, N[1].T, N[1].S, { desde: 'cree', hacia: 'veces' });
E.figura('yoP2', { t0: N[1].S - 0.1, t1: fin(2), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(6, 2), 'ofrecer'], [w(6, 5), 'senalar'], [w(7, 0), 'ofrecer'], [w(7, 3), 'celebrar'], [w(7, 4), 'ofrecer'], [w(7, 9), 'encoger']],
  sonrisa: [[0, 0.2], [w(6, 2), 0.4], [w(6, 5), 0.9], [w(7, 3), 1.4], [w(7, 4), 0.3], [w(7, 9), -0.6]] });
E.figura('comp2', { t0: N[1].S, t1: fin(2), x: 390, talla: 300, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(6, 4), 'ofrecer'], [w(7, 3), 'celebrar'], [w(7, 5), 'de_pie'], [w(7, 9), 'manos_cabeza']],
  sonrisa: [[0, -0.4], [w(6, 4), 0.4], [w(7, 3), 1.4], [w(7, 6), 0.2], [w(7, 9), -1]] });
E.obj('bocaD1', 'bocadillo', { t0: w(6, 2), t1: w(7, 4) - 0.05, sale: 0.15, x: -300, y: -450, w: 130, h: 64, on: [[w(6, 2), 0], [w(6, 2) + 0.3, 1]], pop: true, caja: [-65, -32, 130, 90] });
E.obj('rotVez', 'rotulo', { t0: w(6, 3) - 0.1, t1: fin(2), x: 110, y: -470, texto: 'UNA SOLA VEZ', size: 30, col: AM, pop: true, caja: [-120, -17, 240, 34] });
E.obj('veces', 'lista', { t0: N[1].S - 0.1, t1: fin(2), x: 110, y: -320, n: 3, w: 260, gap: 64, pop: true, sobrevive: true, r: 60,
  p: [[w(6, 3), 0], [w(6, 5) + 0.3, 1, 'out']], brillo: [[w(6, 3), 0], [w(6, 5) + 0.3, 1, 'out']], caja: [-130, -82, 260, 164] });
E.sfx(w(6, 3), 'fill');
E.obj('chVez', 'chispas', { t0: w(7, 3), t1: w(7, 3) + 0.8, x: 110, y: -384, r0: 40, r1: 130, inspeccion: false });
E.golpe(w(7, 3), 0.04);
// «Las demás solo sirven para recordarlo»: dos bocadillos grises más y al compañero se le enreda la cabeza
E.obj('bocaD2', 'bocadillo', { t0: w(7, 4), t1: fin(2), sale: 0.2, x: -330, y: -450, w: 120, h: 60, on: 0, pop: true, caja: [-60, -30, 120, 86] });
E.obj('bocaD3', 'bocadillo', { t0: w(7, 5) + 0.1, t1: fin(2), sale: 0.2, x: -170, y: -480, w: 120, h: 60, on: 0, pop: true, caja: [-60, -30, 120, 86] });
E.obj('maraña2', 'maraña', { t0: w(7, 8), t1: fin(2), sale: 0.2, x: 390, y: -390, r: 40, p: [[w(7, 8), 0], [wf(7, -1) + 0.2, 1, 'out']], rot: [[w(7, 8), 0], [fin(2), 0.6, 'lin']], caja: [-55, -32, 110, 64] });
E.temblor(w(7, 9), 10, 0.35);

// ---------- 3 · pregúntate si tú te acordarías ----------
// 8: La(0) tercera(1) pregúntate(2) si(3) tú(4) te(5) acordarías(6)
// 9: Recuerdas(0) el(1) fallo(2) de(3) un(4) compañero(5) en(6) la(7) reunión(8) del(9) mes(10) pasado(11)
E.numero(3, N[2].T, N[2].S, { desde: 'veces', hacia: 'preg' });
E.figura('yoP3', { t0: N[2].S - 0.1, t1: TC, x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(8, 2), 'pensar'], [w(8, 4), 'senalar'], [w(8, 6), 'pensar'], [w(9, 2), 'senalar'], [w(9, 9), 'pensar'], [wf(9, -1), 'encoger']],
  sonrisa: [[0, 0.2], [w(8, 2), 0], [w(8, 4), 0.6], [w(9, 2), 0.3], [w(9, 9), 0], [wf(9, -1), 0.9]] });
E.obj('preg', 'relleno', { t0: N[2].S - 0.1, t1: TC, x: 110, y: -440, w: 340, h: 44, pop: true, r: 60,
  rotulo: [[0, 'PREGÚNTATE'], [w(9, 9), 'EL MES PASADO']],
  f: [[w(8, 2), 0], [wf(8, -1), 1, 'out'], [w(9, 9), 1], [wf(9, -1) + 0.2, 0.08, 'inout']], caja: [-170, -56, 340, 78] });
E.sfx(w(8, 2), 'fill');
E.obj('bocaQ', 'bocadillo', { t0: w(8, 5), t1: w(9, 2), sale: 0.2, x: -300, y: -450, w: 110, h: 70, texto: '?', size: 40, on: [[w(8, 5), 0], [w(8, 5) + 0.3, 1]], pop: true, caja: [-55, -35, 110, 96] });
E.obj('chPreg', 'chispas', { t0: wf(8, -1), t1: wf(8, -1) + 0.8, x: 270, y: -440, r0: 30, r1: 110, inspeccion: false });
// «el fallo de un compañero en la reunión»: un compañero gris tira sus papeles; «del mes pasado»: todo se apaga
E.figura('comp3', { t0: w(9, 0) - 0.2, t1: TC, x: 340, talla: 300, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(9, 2), 'manos_cabeza'], [w(9, 8), 'triste']], sonrisa: [[0, 0.4], [w(9, 2), -1.2]],
  a: [[0, 1], [w(9, 10), 1], [wf(9, -1) + 0.2, 0.35]] });
E.obj('papeles9', 'papeles', { t0: w(9, 2) - 0.1, t1: TC, sale: 0.2, x: 150, y: -14, n: 5, k: [[w(9, 2), 0], [w(9, 5), 5, 'out']],
  a: [[0, 1], [w(9, 10), 1], [wf(9, -1) + 0.2, 0.35]], caja: [-95, -100, 190, 115] });
E.temblor(w(9, 2), 8, 0.3);
E.obj('rotReu', 'rotulo', { t0: w(9, 7), t1: TC, sale: 0.2, x: 150, y: -300, texto: 'LA REUNIÓN', size: 28, col: GRIS, pop: true, caja: [-90, -16, 180, 32] });

// ---------- cierre: resumen y envío ----------
// 10: Cada(0) uno(1) está(2) pendiente(3) de(4) sus(5) errores(6) no(7) de(8) los(9) tuyos(10)
// 11: Mándaselo(0) a(1) ese(2) amigo(3) que(4) sigue(5) dándole(6) vueltas(7) a(8) lo(9) de(10) ayer(11)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(10, 6), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, items: ['Entre dos', 'Una vez', '¿Lo recuerdas?'], gap: 280,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(10, 6)], caja: [-420, -60, 840, 200] });
E.obj('confC', 'confeti', { t0: wf(10, -1), t1: wf(10, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(10, -1), 0.22); E.golpe(wf(10, -1), 0.04);
E.figura('yoF', { t0: w(11, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(11, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(11, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(11, 7)], vuelo: [[wf(11, -1), 0], [wf(11, -1) + 0.5, 1, 'in']] });
