// L64 · Los 66 días de un hábito (estilo B; reglas 15, 20, 21, 24)
// Idea visual: una barra de «días» que el muñeco cree que se llena en 21 y en realidad pide 66; el contador rueda de 21 a 66.
// Cada regla tiene su objeto que se rellena: el bloque enorme que se encoge y el temporizador de diez minutos, el reloj
// con la semana que se completa sola y la cadena de días con un hueco que se retoma y no cambia el resultado.
// Contadores que suman: los días (21 → 66) y el año 2009. Regla 20: «Tres semanas y listo.» en bocadillo del amigo (gris).
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(2, 0), gap: 70, y: 360 } });

const N = [3, 5, 7].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(9, 0) - 0.1;   // resumen
const ROJO = '#e4574f';
const GRIS = '#9a9c9b';
const AM = '#e6ce46';

E.camara([
  [0, [0, -380, 1.04]], [w(0, 6), [10, -385, 1.06]], [w(0, 12), [-20, -390, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 8), [0, -385, 1.04]],
  [w(1, 17), [20, -390, 1.06]], [w(2, 0), [0, -380, 1.02]], [w(2, 6), [10, -385, 1.04]], [N[0].T, [10, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [15, -385, 1.04]], [w(4, 5), [-10, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 0), [-15, -385, 1.04]], [w(6, 7), [15, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(8, 0), [-10, -385, 1.04]], [w(8, 5), [10, -385, 1.05]], [TC - 0.1, [0, -385, 1.04]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Un(0) hábito(1) no(2) se(3) crea(4) en(5) 21(6) días(7) De(8) media(9) hacen(10) falta(11) 66(12)   [bocadillo del amigo «Tres semanas y listo.»]
// el muñeco empuja; el contador de días rueda desde el principio y se para en 21 con la barra a un tercio; en «66» rueda
// hasta 66 y la barra se llena entera
E.figura('yo', { t0: 0, t1: w(1, 0), sale: 0.25, x: -330, talla: 330, cara: true,
  poses: [[0, 'coger'], [w(0, 2), 'encoger'], [w(0, 6), 'pensar'], [w(0, 8), 'senalar'], [w(0, 12), 'manos_cabeza']],
  sonrisa: [[0, 0.8], [w(0, 2), -0.3], [w(0, 8), 0.2], [w(0, 12), -1.2]] });
E.figura('amigo0', { t0: 0, t1: w(1, 0), sale: 0.25, x: 400, talla: 280, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'ofrecer'], [w(0, 2), 'encoger'], [w(0, 12), 'manos_cabeza']], sonrisa: [[0, 1.2], [w(0, 2), 0.2], [w(0, 12), -0.8]] });
E.obj('bocaH', 'bocadillo', { t0: 0, t1: w(0, 9), sale: 0.25, x: 300, y: -440, w: 350, h: 76, texto: 'Tres semanas y listo.', size: 29,
  on: [[0, 1], [w(0, 2), 1], [w(0, 4), 0.2]], luz: [[0, 1], [w(0, 2), 1], [w(0, 4) + 0.3, 0.55]], caja: [-175, -38, 350, 102] });
E.obj('dias0', 'contador', { t0: 0, t1: w(1, 0), sale: 0.25, x: 0, y: -300, size: 120, miles: false,
  v: [[0, 0], [w(0, 6) + 0.35, 21, 'out'], [w(0, 12), 21], [w(0, 12) + 0.55, 66, 'out']], barrido: [w(0, 12) + 0.6], caja: [-110, -60, 220, 120] });
E.obj('rotDias', 'rotulo', { t0: 0, t1: w(1, 0), sale: 0.25, x: 0, y: -215, texto: 'DÍAS', size: 28, col: GRIS, caja: [-50, -16, 100, 32] });
E.obj('barra0', 'barra', { t0: 0, t1: w(1, 0), sale: 0.25, x: 0, y: -100, w: 320, h: 44, rotMarca: '21',
  f: [[0, 0.04], [w(0, 6) + 0.35, 21 / 66, 'out'], [w(0, 12), 21 / 66], [w(0, 12) + 0.55, 1, 'out']],
  marca: [[0, -1], [w(0, 6) + 0.3, -1], [w(0, 6) + 0.35, 21 / 66]], caja: [-160, -90, 320, 138] });
E.sfx(0.1, 'fill'); E.sfx(w(0, 12), 'fill');
E.temblor(w(0, 7) + 0.1, 8, 0.3);
E.obj('chDias', 'chispas', { t0: w(0, 12) + 0.55, t1: w(0, 12) + 1.3, x: 0, y: -300, r0: 110, r1: 220, inspeccion: false });
E.obj('chBarra', 'chispas', { t0: w(0, 12) + 0.55, t1: w(0, 12) + 1.3, x: 148, y: -100, r0: 30, r1: 100, inspeccion: false });
E.golpe(w(0, 12), 0.05); E.destello(w(0, 12) + 0.5, 0.15);

// 1: Lo(0) midieron(1) en(2) 2009(3) en(4) una(5) universidad(6) de(7) Londres(8) a(9) unos(10) les(11) bastaron(12) 18(13) días(14) y(15) otros(16) necesitaron(17) más(18) de(19) 200(20)
E.figura('yo1', { t0: w(1, 0) - 0.05, t1: w(2, 0), sale: 0.25, x: [[0, -380], [w(1, 16), -380], [wf(1, -1), -320, 'inout']], talla: 320, cara: true,
  poses: [[0, 'de_pie'], [w(1, 1), 'senalar'], [w(1, 6), 'pensar'], [w(1, 10), 'de_pie'], [w(1, 16), 'andar'], [wf(1, -1), 'celebrar']],
  sonrisa: [[0, 0.3], [w(1, 1), 0.7], [w(1, 16), -0.2], [wf(1, -1), 1.4]] });
E.obj('anio', 'contador', { t0: w(1, 0), t1: w(1, 9), sale: 0.25, x: 150, y: -350, size: 110, miles: false, pop: true,
  v: [[w(1, 1), 0], [w(1, 3) + 0.45, 2009, 'out']], barrido: [w(1, 3) + 0.5], caja: [-150, -55, 300, 110] });
E.obj('chAnio', 'chispas', { t0: w(1, 3) + 0.45, t1: w(1, 3) + 1.2, x: 150, y: -350, r0: 140, r1: 240, inspeccion: false });
E.golpe(w(1, 3) + 0.45, 0.04);
E.obj('rotUni', 'rotulo', { t0: w(1, 6) - 0.1, t1: w(1, 9), sale: 0.2, x: 150, y: -460, texto: 'UNIVERSIDAD DE LONDRES', size: 26, col: GRIS, pop: true, caja: [-210, -16, 420, 32] });
E.obj('estudio1', 'papeles', { t0: w(1, 1), t1: w(1, 9), sale: 0.25, x: 150, y: -14, n: 6, k: [[w(1, 1), 0], [w(1, 8), 6, 'lin']], caja: [-95, -110, 190, 125] });
E.obj('relA', 'relleno', { t0: w(1, 9), t1: w(2, 0) - 0.1, sale: 0.25, x: 110, y: -420, w: 340, h: 40, pop: true, rotulo: '18 DÍAS',
  f: [[w(1, 12), 0], [w(1, 14) + 0.2, 0.09, 'out']], caja: [-170, -54, 340, 74] });
E.obj('relB', 'relleno', { t0: w(1, 9) + 0.15, t1: w(2, 0) - 0.1, sale: 0.25, x: 110, y: -290, w: 340, h: 40, pop: true, rotulo: 'MÁS DE 200',
  f: [[w(1, 16), 0], [wf(1, -1) + 0.3, 1, 'lin']], barrido: [wf(1, -1) + 0.35], caja: [-170, -54, 340, 74] });
E.sfx(w(1, 12), 'fill'); E.sfx(w(1, 16), 'fill');
E.figura('unos', { t0: w(1, 9), t1: w(2, 0), sale: 0.25, x: 420, talla: 220, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(1, 13), 'celebrar'], [w(1, 16), 'de_pie']], sonrisa: [[0, 0.5], [w(1, 13), 1.5]] });
E.obj('chA', 'chispas', { t0: w(1, 14) + 0.2, t1: w(1, 14) + 0.9, x: 110 - 162 + 324 * 0.09, y: -420, r0: 20, r1: 70, inspeccion: false });
E.obj('chB', 'chispas', { t0: wf(1, -1) + 0.3, t1: wf(1, -1) + 1.0, x: 270, y: -290, r0: 30, r1: 110, inspeccion: false });
E.golpe(wf(1, -1) + 0.3, 0.04);

// 2: Tres(0) reglas(1) para(2) aguantar(3) hasta(4) que(5) salga(6) solo(7)
E.figura('yo2', { t0: w(2, 0) - 0.05, t1: fin(0), x: -360, talla: 320, cara: true,
  poses: [[0, 'de_pie'], [w(2, 0), 'senalar'], [w(2, 3), 'coger'], [w(2, 6), 'celebrar']],
  sonrisa: [[0, 0.5], [w(2, 3), 0], [w(2, 6), 1.5]] });
[0, 1, 2].forEach(i => { const a = w(2, 0) + i * 0.13;
  E.obj('m' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: 30 + i * 100, y: -450, r: 32, n: '', pop: true, sfx: i === 0,
    s: i === 0 ? [[0, 1], [wf(2, -1), 1], [wf(2, -1) + 0.3, 1.3, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [wf(2, -1), 1], [wf(2, -1) + 0.3, 0.4]], caja: [-32, -32, 64, 64] }); });
E.obj('aguanta', 'relleno', { t0: w(2, 1), t1: N[0].T, sale: 0.2, x: 110, y: -280, w: 360, h: 44, pop: true, rotulo: 'AGUANTAR',
  f: [[w(2, 3), 0], [w(2, 7) + 0.2, 1, 'inout']], caja: [-180, -56, 360, 78] });
E.sfx(w(2, 3), 'fill');
E.obj('chAg', 'chispas', { t0: w(2, 7) + 0.2, t1: w(2, 7) + 0.9, x: 280, y: -280, r0: 30, r1: 110, inspeccion: false });
E.destello(wf(2, -1), 0.12);

// ---------- 1 · que sea pequeño ----------
// 3: La(0) primera(1) que(2) sea(3) pequeño(4)
// 4: Diez(0) minutos(1) al(2) día(3) se(4) aguantan(5) mejor(6) que(7) una(8) hora(9)
E.numero(1, N[0].T, N[0].S, { desde: 'm1', hacia: 'blq' });
E.figura('yoP1', { t0: N[0].S - 0.1, t1: fin(1), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(3, 2), 'encoger'], [w(3, 4), 'coger'], [w(4, 0), 'senalar'], [w(4, 4), 'celebrar'], [w(4, 8), 'apartarse'], [wf(4, -1) + 0.3, 'de_pie']],
  sonrisa: [[0, 0.2], [w(3, 2), -0.4], [w(3, 4) + 0.4, 1.2], [w(4, 4), 1.5], [w(4, 8), -0.3]] });
// el bloque enorme se encoge y se vuelve amarillo («que sea pequeño»)
E.obj('blq', 'bloques', { t0: N[0].S - 0.1, t1: fin(1), x: 120, n: 1, w: 300, h: 200, r: 90, refl: true,
  y: [[0, -100], [w(3, 4), -100], [w(3, 4) + 0.4, -35, 'back']], s: [[0, 1], [w(3, 4), 1], [w(3, 4) + 0.4, 0.35, 'back']],
  hechos: [[0, 0], [w(3, 4) + 0.3, 0], [w(3, 4) + 0.7, 1, 'out']], caja: [-150, -100, 300, 200] });
E.obj('pulsoB', 'pulso', { t0: w(3, 4) + 0.4, t1: w(3, 4) + 1.0, x: 120, y: -35, r0: 30, r1: 120, inspeccion: false });
E.sfx(w(3, 4) + 0.4, 'pop');
// diez minutos: el temporizador se rellena cada día de la semana
E.obj('tmp', 'temporizador', { t0: w(4, 0) - 0.1, t1: fin(1), x: 120, y: -320, r: 85, texto: '10', sub: 'MIN', pop: true, sobrevive: true,
  p: [[w(4, 1), 0], [w(4, 5), 1, 'lin']], hecho: [[w(4, 6), 0], [w(4, 6) + 0.35, 1, 'out']], caja: [-104, -104, 208, 208] });
E.sfx(w(4, 1), 'fill');
E.obj('sem', 'dias', { t0: w(4, 1), t1: fin(1), x: 120, y: -470, letras: ['L', 'M', 'X', 'J', 'V'], gap: 84, pop: true,
  luz: [[w(4, 2), -1], [w(4, 5) + 0.2, 4, 'lin']], caja: [-200, -32, 400, 64] });
E.obj('chT', 'chispas', { t0: w(4, 6) + 0.3, t1: w(4, 6) + 1.0, x: 120, y: -320, r0: 110, r1: 200, inspeccion: false });
E.golpe(w(4, 6) + 0.3, 0.04);
// «mejor que una hora»: el bloque gris de una hora, pesado, a un lado
E.obj('hora', 'bloques', { t0: w(4, 8) - 0.1, t1: fin(1), x: 400, y: -110, n: 1, w: 120, h: 220, pop: true, refl: true, caja: [-60, -110, 120, 220] });
E.obj('rotHora', 'rotulo', { t0: w(4, 8), t1: fin(1), x: 400, y: -270, texto: 'UNA HORA', size: 26, col: GRIS, pop: true, caja: [-80, -16, 160, 32] });
E.temblor(w(4, 9), 8, 0.3);

// ---------- 2 · siempre a la misma hora ----------
// 5: La(0) segunda(1) siempre(2) a(3) la(4) misma(5) hora(6)
// 6: Después(0) del(1) café(2) o(3) al(4) llegar(5) a(6) casa(7) Así(8) no(9) tienes(10) que(11) acordarte(12)
E.numero(2, N[1].T, N[1].S, { desde: 'tmp', hacia: 'reloj' });
E.figura('yoP2', { t0: N[1].S - 0.1, t1: fin(2), x: [[0, -360], [w(6, 4), -360], [w(6, 7), -300, 'inout']], cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'senalar'], [w(6, 0), 'coger'], [w(6, 3), 'de_pie'], [w(6, 4), 'andar'], [w(6, 7), 'de_pie'], [w(6, 9), 'pensar'], [w(6, 12), 'celebrar']],
  sonrisa: [[0, 0.3], [w(5, 2), 0.9], [w(6, 0), 1.2], [w(6, 9), 0], [w(6, 12), 1.5]] });
E.obj('reloj', 'relojAm', { t0: N[1].S - 0.1, t1: fin(2), x: 80, y: -330, r: 100, texto: ' ', pop: true,
  p: [[w(5, 2), 0], [w(5, 6) + 0.2, 0.75, 'out']], luz: [[0, 1], [w(6, 0), 1], [w(6, 0) + 0.3, 0.6]], caja: [-100, -100, 200, 200] });
E.obj('sem7', 'bloques', { t0: w(5, 2) - 0.1, t1: fin(2), x: 80, y: -160, n: 7, w: 380, h: 40, parte: 1, pop: true, sobrevive: true, r: 70,
  hechos: [[w(5, 2), 0], [w(5, 6) + 0.2, 3, 'lin'], [w(6, 8), 3], [wf(6, -1), 7, 'lin']], barrido: [wf(6, -1) + 0.1], caja: [-190, -30, 380, 60] });
E.sfx(w(5, 2), 'fill'); E.sfx(w(6, 8), 'fill');
E.obj('rotMom', 'rotulo', { t0: w(6, 0) - 0.1, t1: w(6, 8) + 0.2, sale: 0.2, x: 80, y: -470, texto: [[0, 'DESPUÉS DEL CAFÉ'], [w(6, 3), 'AL LLEGAR A CASA']], size: 28, col: AM, pop: true, caja: [-180, -16, 360, 32] });
E.obj('puerta', 'puerta', { t0: w(6, 3) - 0.1, t1: fin(2), x: 390, w: 140, h: 250, pop: true, refl: true, p: [[w(6, 5), 0], [w(6, 7) + 0.3, 0.6, 'out']], caja: [-70, -250, 140, 250] });
E.obj('maraña2', 'maraña', { t0: w(6, 9), t1: wf(6, -1) + 0.2, sale: 0.2, x: -170, y: -430, r: 40, p: [[w(6, 9), 0], [w(6, 10) + 0.2, 1, 'out'], [w(6, 12), 1], [wf(6, -1), 0, 'in']],
  rot: [[w(6, 9), 0], [wf(6, -1), 0.8, 'lin']], caja: [-55, -32, 110, 64] });
E.obj('ch2', 'chispas', { t0: wf(6, -1), t1: wf(6, -1) + 0.8, x: 80, y: -160, r0: 120, r1: 220, inspeccion: false });
E.golpe(wf(6, -1), 0.04);

// ---------- 3 · si fallas un día, retómalo al día siguiente ----------
// 7: La(0) tercera(1) si(2) fallas(3) un(4) día(5) retómalo(6) al(7) día(8) siguiente(9)
// 8: En(0) el(1) estudio(2) saltarse(3) un(4) día(5) no(6) cambió(7) el(8) resultado(9)
E.numero(3, N[2].T, N[2].S, { desde: 'sem7', hacia: 'pz0' });
E.figura('yoP3', { t0: N[2].S - 0.1, t1: TC, x: -360, cara: true,
  poses: [[0, 'de_pie'], [w(7, 3), 'triste'], [w(7, 6), 'levantar'], [w(7, 8), 'senalar'], [w(8, 0), 'pensar'], [w(8, 6), 'senalar'], [wf(8, -1) + 0.2, 'celebrar']],
  sonrisa: [[0, 0.3], [w(7, 3), -1.3], [w(7, 6), 1], [w(8, 0), 0.4], [wf(8, -1) + 0.2, 1.5]] });
const ON = [N[2].S + 0.15, N[2].S + 0.4, -1, w(7, 6), w(7, 8), w(7, 9), wf(7, -1) + 0.1];
ON.forEach((a, i) => { const x = 110 + (i - 3) * 72;
  E.obj('pz' + i, 'pieza', { t0: N[2].S - 0.1 + i * 0.06, t1: a < 0 ? w(7, 3) + 0.05 : TC, sale: 0.15, x, y: -440, r: 26, pop: true,
    on: a < 0 ? 0 : [[a, 0], [a + 0.2, 1, 'out']], caja: [-26, -26, 52, 52] });
  if (a > 0) E.sfx(a, 'pop'); });
E.obj('fallo', 'rotulo', { t0: w(7, 3) + 0.1, t1: TC, x: 110 - 72, y: -440, texto: 'X', size: 40, col: ROJO, peso: 800, pop: true, caja: [-18, -22, 36, 44] });
E.temblor(w(7, 3) + 0.1, 10, 0.35);
E.obj('pulsoR', 'pulso', { t0: w(7, 6), t1: w(7, 6) + 0.6, x: 110, y: -440, r0: 30, r1: 110, inspeccion: false });
E.obj('rotEst', 'rotulo', { t0: w(8, 0) - 0.1, t1: TC, x: 110, y: -330, texto: 'EN EL ESTUDIO', size: 28, col: GRIS, pop: true, caja: [-130, -16, 260, 32] });
E.obj('pulsoF', 'pulso', { t0: w(8, 3), t1: w(8, 3) + 0.6, x: 38, y: -440, r0: 26, r1: 90, inspeccion: false });
E.obj('res', 'relleno', { t0: w(8, 2), t1: TC, x: 110, y: -200, w: 380, h: 44, pop: true, rotulo: 'EL RESULTADO',
  f: [[w(8, 5), 0], [wf(8, -1) + 0.2, 1, 'out']], barrido: [wf(8, -1) + 0.25], caja: [-190, -56, 380, 78] });
E.sfx(w(8, 5), 'fill');
E.obj('chR', 'chispas', { t0: wf(8, -1) + 0.2, t1: wf(8, -1) + 1.0, x: 290, y: -200, r0: 40, r1: 120, inspeccion: false });
E.destello(wf(8, -1) + 0.2, 0.12);

// ---------- cierre: resumen y envío ----------
// 9: No(0) te(1) faltaba(2) fuerza(3) de(4) voluntad(5) te(6) faltaban(7) semanas(8)
// 10: Mándaselo(0) a(1) ese(2) amigo(3) que(4) lo(5) deja(6) a(7) las(8) tres(9) semanas(10)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(9, 5), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, items: ['Pequeño', 'Misma hora', 'Retómalo'], gap: 270,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(9, 7)], caja: [-400, -60, 800, 200] });
E.obj('confC', 'confeti', { t0: wf(9, -1), t1: wf(9, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(9, -1), 0.22); E.golpe(wf(9, -1), 0.04);
E.figura('yoF', { t0: w(10, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(10, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(10, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(10, 10)], vuelo: [[wf(10, -1), 0], [wf(10, -1) + 0.5, 1, 'in']] });
