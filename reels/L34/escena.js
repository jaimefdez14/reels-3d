// L34 · La falacia de la planificación (estilo B; reglas 15, 20, 21, 24)
// Idea visual: el calendario de la semana con el viernes encendido y la barra de la entrega a la mitad; los estudiantes
// calcularon 34 días (la barra se para en la marca) y tardaron 55 (la barra la pasa y el contador sigue rodando).
// 1: el reloj que rebobina, lo que ya hiciste y los días que te llevó, casilla a casilla. 2: la barra de tu cálculo
// se alarga la mitad y el contador pasa de 10 a 15 días. 3: el trabajo se parte en cinco piezas y, al sumarlas, la barra
// pasa la marca de «lo que pensabas».
// Regla 20: «¿Para cuándo lo tienes?» va en bocadillo del cliente; la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(2, 0), gap: 70, y: 360 } });

// «La primera: // …» → T en «La», S en la primera palabra del punto
const N = [3, 5, 7].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(9, 0) - 0.1;   // remate + resumen
const ROJO = '#e4574f';

E.camara([
  [0, [0, -380, 1.04]], [w(0, 9), [0, -385, 1.05]], [w(0, 16), [0, -385, 1.05]], [w(1, 0), [0, -380, 1.02]], [w(1, 14), [20, -385, 1.05]],
  [w(1, 18), [20, -390, 1.07]], [w(2, 0), [0, -380, 1.02]], [N[0].T, [10, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(3, 7), [15, -385, 1.04]], [w(4, 11), [0, -380, 1.02]], [w(4, 19), [20, -385, 1.05]], [N[1].T, [10, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(5, 7), [15, -385, 1.04]], [w(6, 4), [0, -385, 1.03]], [wf(6, -1), [15, -390, 1.06]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(7, 6), [15, -385, 1.04]], [w(8, 6), [0, -385, 1.03]], [w(8, 10), [10, -390, 1.06]], [TC, [0, -390, 1.05]],
  [w(10, 0), [0, -380, 1.02]], [D, [0, -385, 1.05]],
]);

// ---------- gancho ----------
// 0: Le(0) dices(1) a(2) tu(3) cliente(4) que(5) lo(6) tienes(7) el(8) viernes(9) y(10) el(11) viernes(12) vas(13) por(14) la(15) mitad(16)   [bocadillo del cliente «¿Para cuándo lo tienes?»]
// 1: Se(0) llama(1) falacia(2) de(3) la(4) planificación(5) unos(6) estudiantes(7) calcularon(8) que(9) acabarían(10) la(11) tesina(12) en(13) 34(14) días(15) y(16) tardaron(17) 55(18)
// 2: Tres(0) reglas(1) para(2) acertar(3) con(4) los(5) plazos(6)
E.figura('cli', { t0: 0, t1: w(1, 0) + 0.1, x: -365, color: 'gris', cara: true,
  poses: [[0, 'ofrecer'], [w(0, 7), 'de_pie'], [w(0, 9), 'celebrar'], [w(0, 12), 'de_pie'], [w(0, 16), 'manos_cabeza']],
  sonrisa: [[0, 0.3], [w(0, 9), 1.3], [w(0, 12), 0], [w(0, 16), -1.2]] });
E.obj('bocaH', 'bocadillo', { t0: 0.25, t1: w(0, 10), sale: 0.2, x: -110, y: -495, w: 380, h: 80, texto: '¿Para cuándo lo tienes?', size: 28, pop: true,
  on: [[0.25, 0], [0.7, 1]], caja: [-190, -40, 380, 106] });
E.figura('yo', { t0: 0, t1: w(1, 0) + 0.1, x: 370, dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(0, 5), 'senalar'], [w(0, 9), 'celebrar'], [w(0, 10), 'de_pie'], [w(0, 13), 'manos_cabeza']],
  sonrisa: [[0, 0.4], [w(0, 9), 1.4], [w(0, 11), 0], [w(0, 13), -1.3]] });
// la semana: el viernes se enciende al prometerlo; luego vuelve a encenderse y la entrega va por la mitad
E.obj('semana', 'dias', { t0: w(0, 4), t1: w(1, 0) + 0.1, sale: 0.2, x: 0, y: -330, letras: ['L', 'M', 'X', 'J', 'V'], gap: 82, pop: true,
  luz: [[w(0, 4), -1], [w(0, 8), -1], [w(0, 9) + 0.2, 4, 'out'], [w(0, 10), 4], [w(0, 10) + 0.15, -1], [w(0, 11), -1], [w(0, 12) + 0.2, 4, 'out']], caja: [-200, -32, 400, 64] });
E.obj('entrega', 'relleno', { t0: w(0, 9), t1: w(1, 0) + 0.1, sale: 0.2, x: 0, y: -190, w: 360, h: 46, pop: true,
  rotulo: [[0, 'LA ENTREGA'], [w(0, 15), 'POR LA MITAD']], f: [[w(0, 13), 0], [wf(0, -1), 0.5, 'out']], caja: [-180, -60, 360, 83] });
E.sfx(w(0, 13), 'fill');
E.temblor(wf(0, -1), 12, 0.4); E.golpe(w(0, 9) + 0.2, 0.03);

// «falacia de la planificación»: el nombre; 34 días calculados, 55 reales
E.figura('est', { t0: w(1, 0), t1: N[0].T + 0.2, x: -380, cara: true,
  poses: [[0, 'de_pie'], [w(1, 2), 'senalar'], [w(1, 6), 'pensar'], [w(1, 10), 'senalar'], [w(1, 13), 'ofrecer'], [w(1, 17), 'manos_cabeza'], [w(2, 0), 'de_pie'], [w(2, 3), 'senalar'], [wf(2, -1), 'celebrar']],
  sonrisa: [[0, 0], [w(1, 6), 0.3], [w(1, 14), 0.9], [w(1, 17), -1.3], [w(2, 0), 0.2], [wf(2, -1), 1.4]] });
E.obj('falacia', 'rotulo', { t0: w(1, 2) - 0.05, t1: w(2, 0) - 0.05, sale: 0.2, x: 70, y: -505, texto: 'FALACIA DE LA PLANIFICACIÓN', size: 28, col: '#e6ce46', pop: true, caja: [-300, -18, 600, 36] });
E.destello(w(1, 2), 0.1);
// «unos estudiantes … la tesina»: el montón de la tesina crece mientras calculan
E.obj('tesina', 'papeles', { t0: w(1, 6) - 0.1, t1: w(2, 0) - 0.05, sale: 0.2, x: -150, n: 6, k: [[w(1, 6), 0], [w(1, 12) + 0.3, 6, 'out']], refl: true, caja: [-95, -120, 190, 120] });
E.obj('rotTesina', 'rotulo', { t0: w(1, 12) - 0.05, t1: w(2, 0) - 0.05, sale: 0.2, x: -150, y: -175, texto: 'TESINA', size: 24, col: '#9a9c9b', pop: true, caja: [-60, -15, 120, 30] });
E.obj('rotDias', 'rotulo', { t0: w(1, 13) - 0.1, t1: w(2, 0) - 0.05, sale: 0.2, x: 130, y: -445, texto: [[0, 'CALCULARON'], [w(1, 17), 'TARDARON']], size: 24, col: '#9a9c9b', pop: true, caja: [-110, -15, 220, 30] });
E.obj('cuentaH', 'contador', { t0: w(1, 13) - 0.15, t1: w(2, 0) - 0.05, sale: 0.2, x: 130, y: -375, suf: ' días', size: 60, col: 'txt', miles: false, pop: true,
  v: [[w(1, 13), 0], [w(1, 15), 34, 'out'], [w(1, 17), 34], [w(1, 18) + 0.3, 55, 'out']], barrido: [w(1, 15)], caja: [-160, -36, 320, 72] });
E.obj('plazoH', 'barra', { t0: w(1, 9), t1: w(2, 0) - 0.05, sale: 0.2, x: 130, y: -220, w: 420, h: 46, pop: true, marca: 34 / 55, rotMarca: 'PLAN',
  marcas: [[34 / 55, '34'], [1, '55']], f: [[w(1, 13), 0], [w(1, 15), 34 / 55, 'out'], [w(1, 17), 34 / 55], [w(1, 18) + 0.3, 1, 'out']], caja: [-210, -90, 420, 150] });
E.sfx(w(1, 13), 'fill');
E.temblor(w(1, 18) + 0.15, 12, 0.4);
// «Tres reglas para acertar con los plazos»: tres monedas; la primera crece
[0, 1, 2].forEach(i => { const a = w(2, 0) + i * 0.13;
  E.obj('r' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: 20 + i * 130, y: -350, r: 46, n: i + 1, pop: true, sfx: i === 0, inspeccion: false,
    s: i === 0 ? [[0, 1], [w(2, 3), 1], [w(2, 3) + 0.35, 1.3, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [w(2, 5), 1], [w(2, 5) + 0.3, 0.35]], barrido: i === 0 ? [w(2, 6)] : null }); });
E.obj('rayosH', 'rayos', { t0: w(2, 2), t1: fin(0), x: 20, y: -350, r: 260, z: -2, p: [[w(2, 2), 0], [wf(2, -1), 1, 'out']], inspeccion: false });
E.obj('chH', 'chispas', { t0: w(2, 3) + 0.3, t1: w(2, 3) + 1.1, x: 20, y: -350, r0: 60, r1: 150, inspeccion: false });

// ---------- 1 · mira cuánto tardaste la última vez ----------
// 3: La(0) primera(1) mira(2) cuánto(3) tardaste(4) la(5) última(6) vez(7)
// 4: No(0) te(1) fíes(2) de(3) lo(4) que(5) crees(6) que(7) vas(8) a(9) tardar(10) Busca(11) algo(12) parecido(13) que(14) ya(15) hayas(16) hecho(17) y(18) cuenta(19) los(20) días(21) que(22) te(23) llevó(24)
E.numero(1, N[0].T, N[0].S, { desde: 'r1', hacia: 'reloj1' });
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -380, cara: true, toca: [],
  poses: [[0, 'de_pie'], [w(3, 2), 'senalar'], [w(3, 5), 'pensar'], [w(4, 0), 'encoger'], [w(4, 11), 'senalar'], [w(4, 17), 'coger'], [w(4, 19), 'senalar'], [wf(4, -1), 'celebrar']],
  sonrisa: [[0, 0.3], [w(3, 5), 0.5], [w(4, 0), -0.6], [w(4, 11), 0.4], [w(4, 19), 0.8], [wf(4, -1), 1.5]] });
// el reloj rebobina hasta la última vez
E.obj('reloj1', 'relojAm', { t0: N[0].S - 0.1, t1: w(4, 11) + 0.1, sale: 0.25, x: 130, y: -300, r: 120, pop: true,
  texto: [[0, '¿?'], [w(3, 5), 'ANTES']], p: [[N[0].S, 0.9], [w(3, 4), 0.9], [wf(3, -1), 0.15, 'inout']],
  luz: [[0, 1], [w(4, 0), 1], [w(4, 2) + 0.2, 0.4]], caja: [-120, -120, 240, 240] });
E.obj('rotUlt', 'rotulo', { t0: w(3, 5) - 0.05, t1: w(4, 11) + 0.1, sale: 0.2, x: 130, y: -470, texto: 'LA ÚLTIMA VEZ', size: 26, col: '#e6ce46', pop: true, caja: [-120, -16, 240, 32] });
E.sfx(w(3, 4), 'whoosh');
// «No te fíes de lo que crees»: la nube de lo que crees se apaga y se encoge
E.obj('creo1', 'bocadillo', { t0: w(4, 0) - 0.1, t1: w(4, 10) + 0.2, sale: 0.3, x: -170, y: -470, w: 150, h: 80, pop: true,
  on: [[0, 1], [w(4, 2), 1], [w(4, 2) + 0.3, 0]], caja: [-75, -40, 150, 106] });
E.temblor(w(4, 2), 9, 0.35);
// «Busca algo parecido que ya hayas hecho»: el montón de trabajo ya hecho
E.obj('hecho1', 'papeles', { t0: w(4, 11) - 0.05, t1: fin(1), x: -150, n: 6, k: [[w(4, 11), 0], [w(4, 17), 6, 'out']], refl: true, caja: [-95, -120, 190, 120] });
E.obj('rotHecho', 'rotulo', { t0: w(4, 15), t1: fin(1), x: -150, y: -175, texto: 'YA HECHO', size: 24, col: '#9a9c9b', pop: true, caja: [-75, -15, 150, 30] });
// «y cuenta los días que te llevó»: los días se encienden uno a uno
E.obj('rotDias1', 'rotulo', { t0: w(4, 18), t1: fin(1), x: 205, y: -460, texto: 'DÍAS QUE TE LLEVÓ', size: 24, col: '#9a9c9b', pop: true, caja: [-120, -15, 240, 30] });
for (let i = 0; i < 12; i++) { const q = i % 4, r = Math.floor(i / 4), a = w(4, 11) + 0.05 + i * 0.05, on = w(4, 19) + i * 0.11;
  E.obj('d' + i, 'pieza', { t0: a, t1: i === 11 ? fin(1) : N[1].T + 0.1, sale: 0.2, x: 100 + q * 70, y: -390 + r * 70, r: 27, pop: true, sfx: false, sobrevive: i === 11,
    on: [[on, 0], [on + 0.12, 1, 'out']], s: [[on, 1], [on + 0.06, 1.18], [on + 0.18, 1, 'out']], caja: [-27, -27, 54, 54] });
  E.sfx(on, 'tick'); }
E.sfx(w(4, 11), 'pop');
E.obj('ch1', 'chispas', { t0: w(4, 19) + 1.35, t1: w(4, 19) + 2.1, x: 205, y: -320, r0: 120, r1: 220, inspeccion: false });
E.golpe(w(4, 19) + 1.35, 0.04); E.destello(w(4, 19) + 1.35, 0.1);

// ---------- 2 · a tu cálculo, súmale la mitad ----------
// 5: La(0) segunda(1) a(2) tu(3) cálculo(4) súmale(5) la(6) mitad(7)
// 6: Si(0) crees(1) que(2) son(3) diez(4) días(5) di(6) quince(7)
E.numero(2, N[1].T, N[1].S, { desde: 'd11', hacia: 'calc2' });
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -380, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'senalar'], [w(5, 5), 'meter'], [w(5, 7) + 0.3, 'celebrar'], [w(6, 0), 'pensar'], [w(6, 6), 'ofrecer'], [wf(6, -1), 'celebrar']],
  sonrisa: [[0, 0.3], [w(5, 5), 0.8], [w(5, 7) + 0.3, 1.3], [w(6, 0), 0.3], [w(6, 6), 0.9], [wf(6, -1), 1.5]] });
// la barra de tu cálculo se llena y luego se alarga la mitad
E.obj('calc2', 'barra', { t0: N[1].S - 0.1, t1: fin(2), x: 140, y: -230, h: 60, pop: true, sobrevive: true,
  w: [[0, 280], [w(5, 5), 280], [w(5, 7) + 0.4, 420, 'back']], f: [[N[1].S, 0], [w(5, 4), 1, 'out']], barrido: [w(5, 7) + 0.4, wf(6, -1)], caja: [-210, -30, 420, 60] });
E.sfx(N[1].S + 0.05, 'fill'); E.sfx(w(5, 5), 'fill');
E.obj('rotCalc2', 'rotulo', { t0: N[1].S, t1: fin(2), x: 140, y: -320, texto: [[0, 'TU CÁLCULO'], [w(5, 5), '+ LA MITAD']], size: 26, col: '#9a9c9b', pop: true, caja: [-110, -16, 220, 32] });
E.obj('mas2', 'pulso', { t0: w(5, 7) + 0.4, t1: w(5, 7) + 1.1, x: 350, y: -230, r0: 20, r1: 110, inspeccion: false });
E.golpe(w(5, 7) + 0.4, 0.035);
// «Si crees que son diez días, di quince»: el contador rueda de 10 a 15 y el muñeco lo dice
E.obj('cuenta2', 'contador', { t0: w(6, 0) - 0.1, t1: fin(2), x: 140, y: -420, suf: ' días', size: 64, col: 'txt', miles: false, pop: true,
  v: [[w(6, 4), 0], [w(6, 5) + 0.1, 10, 'out'], [w(6, 6), 10], [w(6, 7) + 0.3, 15, 'out']], barrido: [w(6, 7) + 0.3], caja: [-160, -36, 320, 72] });
E.obj('di2', 'bocadillo', { t0: w(6, 6) - 0.1, t1: fin(2), sale: 0.15, x: -165, y: -470, w: 150, h: 80, pop: true, on: 1, caja: [-75, -40, 150, 106] });
E.obj('ch2', 'chispas', { t0: w(6, 7) + 0.3, t1: w(6, 7) + 1.1, x: 140, y: -420, r0: 110, r1: 220, inspeccion: false });
E.destello(w(6, 7) + 0.3, 0.12);

// ---------- 3 · divide el trabajo en partes pequeñas ----------
// 7: La(0) tercera(1) divide(2) el(3) trabajo(4) en(5) partes(6) pequeñas(7)
// 8: Calcula(0) cada(1) parte(2) por(3) separado(4) y(5) suma(6) casi(7) siempre(8) sale(9) más(10) de(11) lo(12) que(13) pensabas(14)
E.numero(3, N[2].T, N[2].S, { desde: 'calc2', hacia: 'trabajo' });
E.figura('yo3', { t0: N[2].S - 0.1, t1: TC, x: -380, cara: true,
  poses: [[0, 'de_pie'], [w(7, 2), 'senalar'], [w(7, 6), 'celebrar'], [w(8, 0), 'senalar'], [w(8, 6), 'ofrecer'], [w(8, 9), 'manos_cabeza'], [wf(8, -1), 'encoger']],
  sonrisa: [[0, 0.3], [w(7, 6), 0.8], [w(8, 0), 0.5], [w(8, 9), -0.8], [wf(8, -1), 0.6]] });
E.obj('trabajo', 'bloques', { t0: N[2].S - 0.1, t1: TC, x: 130, y: -400, w: 460, h: 100, n: 5, texto: 'EL TRABAJO', pop: true,
  parte: [[w(7, 2), 0], [w(7, 6) + 0.3, 1, 'inout']], hechos: [[w(8, 0), 0], [w(8, 5), 5]], caja: [-230, -62, 460, 124] });
E.sfx(w(7, 2), 'whoosh'); E.golpe(w(7, 6) + 0.3, 0.03);
// cada parte se suma a la barra, que pasa la marca de lo que pensabas
const P3 = [0, 1, 2, 3, 4].map(i => w(8, 0) + (i + 1) * (w(8, 5) - w(8, 0)) / 5);
E.obj('suma3', 'barra', { t0: w(7, 7) - 0.1, t1: TC, x: 130, y: -210, w: 440, h: 50, pop: true, marca: 0.62, rotMarca: 'LO QUE PENSABAS',
  f: [[w(8, 0), 0], ...P3.map((t, i) => [t, 0.19 * (i + 1), 'out'])], barrido: [w(8, 10)], caja: [-220, -85, 440, 110] });
E.obj('mas3', 'rotulo', { t0: w(8, 10) - 0.05, t1: TC, x: 300, y: -140, texto: 'MÁS', size: 34, col: ROJO, pop: true, caja: [-45, -20, 90, 40] });
E.temblor(w(8, 10), 11, 0.4);
E.obj('ch3', 'chispas', { t0: w(8, 6), t1: w(8, 6) + 0.8, x: 300, y: -210, r0: 50, r1: 150, inspeccion: false });

// ---------- cierre: remate, resumen y envío ----------
// 9: Entregar(0) antes(1) de(2) lo(3) prometido(4) gusta(5) Entregar(6) tarde(7) se(8) recuerda(9)
// 10: Mándaselo(0) a(1) ese(2) amigo(3) que(4) siempre(5) dice(6) que(7) lo(8) tiene(9) para(10) mañana(11)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(9, 5), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, items: ['La última vez', '+ la mitad', 'Por partes'], gap: 270,
  p: [[TC, 0], [TC + 0.9, 3, 'lin']], barrido: [w(9, 5), w(9, 9)], caja: [-400, -60, 800, 200] });
E.obj('confC', 'confeti', { t0: w(9, 5), t1: w(9, 5) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(w(9, 5), 0.2); E.golpe(w(9, 9), 0.04);
E.figura('yoF', { t0: w(10, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(10, 1), 'senalar'], [w(10, 9), 'ofrecer']] });
E.obj('enviar', 'enviar', { t0: w(10, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(10, 6)], vuelo: [[wf(10, -1), 0], [wf(10, -1) + 0.5, 1, 'in']] });
