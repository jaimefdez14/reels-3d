// L53 · La ley de Brooks (estilo B; reglas 15, 20, 21, 24)
// Idea visual: la barra del PROYECTO. En el gancho el jefe mete a tres nuevos y la barra, en vez de avanzar, retrocede.
// En las reglas: tareas que se apagan y se queda lo importante (recorta), la línea del proyecto con la marca de cuándo
// entra la gente (cuanto antes / a mitad) y la marca de ENTREGA que se mueve a tiempo.
// Contador que suma: el año 1975 rueda. Algo que se rellena por punto: cuadrícula y barra de lo importante, línea del
// proyecto, barra que llega a la entrega.
// Regla 20: «Que entren tres más.» va en bocadillo del jefe (gris) mientras la voz dice «meter más gente».
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
  [w(1, 17), [20, -390, 1.06]], [w(2, 0), [0, -380, 1.02]], [w(2, 6), [10, -385, 1.04]], [w(3, 0), [0, -385, 1.04]], [N[0].T, [10, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(5, 0), [15, -385, 1.04]], [w(5, 7), [-10, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(7, 0), [-15, -385, 1.04]], [w(7, 7), [15, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(9, 0), [-10, -385, 1.04]], [w(9, 6), [10, -385, 1.05]], [TC - 0.1, [0, -385, 1.04]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Si(0) un(1) proyecto(2) va(3) con(4) retraso(5) meter(6) más(7) gente(8) lo(9) retrasa(10) todavía(11) más(12)   [bocadillo del jefe «Que entren tres más.»]
// el muñeco trabaja y la barra del proyecto avanza despacio; «retraso»: rótulo rojo; «meter más gente»: el jefe lo pide
// y entran tres nuevos; «lo retrasa todavía más»: la barra retrocede, temblor.
E.obj('proy0', 'relleno', { t0: 0, t1: w(1, 0), sale: 0.25, x: 70, y: -470, w: 380, h: 40, rotulo: 'PROYECTO',
  f: [[0, 0.32], [w(0, 9), 0.46, 'lin'], [w(0, 10) + 0.35, 0.24, 'out'], [w(0, 12), 0.24], [w(0, 12) + 0.35, 0.1, 'out']], caja: [-190, -54, 380, 74] });
E.sfx(0.1, 'fill');
E.figura('yo', { t0: 0, t1: w(1, 0), sale: 0.25, x: -355, talla: 330, cara: true,
  poses: [[0, 'coger'], [w(0, 5), 'manos_cabeza'], [w(0, 6) + 0.2, 'encoger'], [w(0, 10), 'manos_cabeza'], [w(0, 12) + 0.3, 'triste']],
  sonrisa: [[0, 0.5], [w(0, 5), -0.6], [w(0, 10), -1.4]] });
E.obj('papeles0', 'papeles', { t0: 0, t1: w(1, 0), sale: 0.25, x: -215, y: 0, n: 6, k: [[0, 2], [w(0, 5), 4, 'lin'], [w(0, 12), 6, 'lin']], caja: [-95, -110, 190, 125] });
E.obj('rotRet', 'rotulo', { t0: w(0, 5) - 0.05, t1: w(1, 0), sale: 0.2, x: -40, y: -380, texto: 'RETRASO', size: 30, col: ROJO, pop: true, caja: [-90, -18, 180, 36] });
E.temblor(w(0, 5), 8, 0.3);
E.figura('jefe0', { t0: 0, t1: w(1, 0), sale: 0.25, x: 390, talla: 300, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(0, 6) - 0.2, 'ofrecer'], [w(0, 9), 'senalar']], sonrisa: 0.6 });
E.obj('bocaJ', 'bocadillo', { t0: w(0, 6) - 0.15, t1: w(1, 0), sale: 0.2, x: 240, y: -365, w: 330, h: 70, texto: 'Que entren tres más.', size: 28, pop: true,
  on: [[w(0, 6), 0], [w(0, 6) + 0.3, 1]], caja: [-165, -35, 330, 96] });
// tres nuevos que entran (grises, pequeños) en «más gente»
[-80, 30, 140].forEach((x, i) => { const a = w(0, 7) + i * 0.18;
  E.figura('nuevo' + i, { t0: a, t1: w(1, 0), sale: 0.25, x: [[a, x + 70], [a + 0.4, x, 'out']], talla: 230, color: 'gris', dir: -1,
    poses: [[0, 'andar'], [a + 0.4, 'de_pie'], [w(0, 10) + 0.1 * i, i === 1 ? 'encoger' : 'pensar']] }); E.sfx(a, 'pop'); });
E.golpe(w(0, 10) + 0.05, 0.05); E.temblor(w(0, 10), 14, 0.45);
E.obj('pulso0', 'pulso', { t0: w(0, 10) + 0.35, t1: w(0, 10) + 1.0, x: 70 - 190 + 8 + 364 * 0.24, y: -470, r0: 20, r1: 90, inspeccion: false });
E.temblor(w(0, 12) + 0.1, 10, 0.35);

// 1: Se(0) llama(1) ley(2) de(3) Brooks(4) La(5) formuló(6) en(7) 1975(8) Fred(9) Brooks(10) que(11) había(12) dirigido(13) un(14) gran(15) proyecto(16) en(17) IBM(18)
E.figura('yo1', { t0: w(1, 0) - 0.05, t1: w(2, 0), sale: 0.25, x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(1, 2), 'senalar'], [w(1, 5), 'pensar'], [w(1, 9), 'senalar'], [w(1, 13), 'ofrecer'], [w(1, 18), 'celebrar']],
  sonrisa: [[0, 0], [w(1, 2), 0.8], [w(1, 5), 0.3], [w(1, 9), 0.8], [w(1, 18), 1.3]] });
E.obj('rotLey', 'rotulo', { t0: w(1, 2) - 0.1, t1: w(2, 0), sale: 0.25, x: 130, y: -470, texto: 'LEY DE BROOKS', size: 36, col: AM, peso: 700, pop: true, caja: [-200, -21, 400, 42] });
E.obj('chLey', 'chispas', { t0: w(1, 4), t1: w(1, 4) + 0.8, x: 130, y: -470, r0: 110, r1: 230, inspeccion: false });
E.golpe(w(1, 4), 0.04);
E.obj('anio', 'contador', { t0: w(1, 5), t1: w(1, 11), sale: 0.2, x: 130, y: -320, size: 120, miles: false, pop: true,
  v: [[w(1, 6), 0], [w(1, 8) + 0.6, 1975, 'out']], barrido: [w(1, 8) + 0.65], caja: [-170, -60, 340, 120] });
E.obj('chAnio', 'chispas', { t0: w(1, 8) + 0.6, t1: w(1, 8) + 1.4, x: 130, y: -320, r0: 150, r1: 250, inspeccion: false });
E.golpe(w(1, 8) + 0.6, 0.04);
E.obj('rotFred', 'rotulo', { t0: w(1, 9) - 0.1, t1: w(1, 11) + 0.1, sale: 0.2, x: 130, y: -200, texto: 'FRED BROOKS', size: 32, col: GRIS, pop: true, caja: [-150, -18, 300, 36] });
// «que había dirigido un gran proyecto en IBM»: un proyecto grande, en piezas que se van completando
E.obj('gran', 'bloques', { t0: w(1, 11) + 0.15, t1: w(2, 0), sale: 0.25, x: 130, y: -280, n: 6, w: 420, h: 90, pop: true,
  parte: [[w(1, 13), 0], [w(1, 15) + 0.2, 1, 'inout']], hechos: [[w(1, 15), 0], [w(1, 18) + 0.3, 6, 'lin']], caja: [-210, -55, 420, 110] });
E.sfx(w(1, 15), 'fill');
E.obj('rotIBM', 'rotulo', { t0: w(1, 18) - 0.1, t1: w(2, 0), sale: 0.2, x: 130, y: -160, texto: 'IBM', size: 34, col: GRIS, peso: 700, pop: true, caja: [-60, -20, 120, 40] });

// 2: A(0) los(1) nuevos(2) hay(3) que(4) enseñarles(5) y(6) quien(7) enseña(8) deja(9) de(10) avanzar(11)
// el muñeco enseña a dos nuevos (bocadillo sin texto) y su barra deja de avanzar
E.figura('yo2', { t0: w(2, 0) - 0.05, t1: w(3, 0), sale: 0.25, x: -330, talla: 420, cara: true,
  poses: [[0, 'de_pie'], [w(2, 2), 'senalar'], [w(2, 4), 'ofrecer'], [w(2, 7), 'senalar'], [w(2, 9), 'encoger'], [w(2, 11), 'manos_cabeza']],
  sonrisa: [[0, 0.5], [w(2, 4), 1], [w(2, 9), -0.4], [w(2, 11), -1.2]] });
[{ x: 250 }, { x: 370 }].forEach((q, i) => E.figura('alumno' + i, { t0: w(2, 1) + i * 0.15, t1: w(3, 0), sale: 0.25, x: [[w(2, 1), q.x + 60], [w(2, 1) + 0.4 + i * 0.15, q.x, 'out']],
  talla: 250, color: 'gris', dir: -1, poses: [[0, 'andar'], [w(2, 2) + 0.2, 'pensar'], [w(2, 8), 'senalar']] }));
E.obj('bocaE', 'bocadillo', { t0: w(2, 4), t1: w(2, 9), sale: 0.2, x: -170, y: -470, w: 130, h: 64, on: 1, pop: true, caja: [-65, -32, 130, 90] });
E.obj('avanza', 'relleno', { t0: w(2, 0) - 0.05, t1: w(3, 0), sale: 0.25, x: 170, y: -470, w: 300, h: 40, pop: true, rotulo: 'TU TRABAJO',
  f: [[w(2, 0), 0.05], [w(2, 6), 0.4, 'lin'], [w(2, 9), 0.42, 'out']], caja: [-150, -54, 300, 74] });
E.sfx(w(2, 0), 'fill');
E.obj('rotDeja', 'rotulo', { t0: w(2, 9) - 0.05, t1: w(3, 0), sale: 0.2, x: 120, y: -370, texto: 'DEJA DE AVANZAR', size: 28, col: ROJO, pop: true, caja: [-160, -16, 320, 32] });
E.temblor(w(2, 11), 12, 0.4); E.golpe(w(2, 11), 0.04);

// 3: Tres(0) reglas(1) para(2) un(3) proyecto(4) atrasado(5)
E.figura('yo3', { t0: w(3, 0) - 0.05, t1: fin(0), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(3, 0), 'pensar'], [w(3, 1), 'senalar'], [w(3, 4), 'ofrecer']], sonrisa: [[0, 0.2], [w(3, 1), 0.9]] });
E.obj('rotTres', 'rotulo', { t0: w(3, 0) - 0.05, t1: N[0].T, sale: 0.2, x: 130, y: -470, texto: 'TRES REGLAS', size: 34, col: AM, peso: 700, pop: true, caja: [-150, -20, 300, 40] });
E.obj('reglas', 'lista', { t0: w(3, 0), t1: fin(0), x: 130, y: -280, n: 3, w: 300, gap: 70, pop: true, sobrevive: true, r: 70,
  p: [[w(3, 1), 0], [w(3, 4), 3, 'lin']], brillo: [[w(3, 1), 0], [wf(3, -1), 3, 'lin']], caja: [-150, -88, 300, 176] });
E.sfx(w(3, 1), 'fill');
E.obj('ch3', 'chispas', { t0: wf(3, -1), t1: wf(3, -1) + 0.8, x: 130, y: -280, r0: 120, r1: 220, inspeccion: false });
E.destello(wf(3, -1), 0.1);

// ---------- 1 · recorta antes de contratar ----------
// 4: La(0) primera(1) recorta(2) antes(3) de(4) contratar(5)
// 5: Quita(0) lo(1) que(2) no(3) sea(4) imprescindible(5) y(6) entrega(7) primero(8) lo(9) importante(10)
E.numero(1, N[0].T, N[0].S, { desde: 'reglas', hacia: 'cuad' });
E.figura('yoP1', { t0: N[0].S - 0.1, t1: fin(1), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(4, 2), 'senalar'], [w(4, 4), 'apartarse'], [w(5, 0), 'coger'], [w(5, 3), 'apartarse'], [w(5, 7), 'ofrecer'], [wf(5, -1), 'celebrar']],
  sonrisa: [[0, 0.2], [w(4, 2), 0.8], [w(5, 0), 0.4], [w(5, 7), 0.9], [wf(5, -1), 1.5]] });
E.obj('cuad', 'cuadricula', { t0: N[0].S - 0.1, t1: fin(1), x: 70, y: -290, cols: 4, rows: 2, lado: 76, gap: 16, on: [0, 5], pop: true, r: 60,
  apagar: [[w(4, 2), 0], [w(4, 3) + 0.2, 0.45, 'out'], [w(5, 0), 0.45], [w(5, 5) + 0.2, 1, 'inout']], p: [[w(5, 7), 0], [w(5, 10) + 0.2, 1, 'out']], caja: [-184, -92, 368, 184] });
E.sfx(w(4, 2), 'fill'); E.sfx(w(5, 7), 'fill');
E.obj('rotRec', 'rotulo', { t0: w(4, 2) - 0.1, t1: w(5, 6), sale: 0.2, x: 70, y: -470, texto: 'RECORTA', size: 34, col: AM, peso: 700, pop: true, caja: [-110, -20, 220, 40] });
E.obj('pulsoRec', 'pulso', { t0: w(4, 2), t1: w(4, 2) + 0.7, x: 70, y: -290, r0: 80, r1: 200, inspeccion: false });
E.golpe(w(4, 2), 0.04);
// «antes de contratar»: el candidato espera en la puerta, apagado
E.figura('cand', { t0: w(4, 3) - 0.1, t1: w(5, 6), sale: 0.25, x: 400, talla: 250, color: 'gris', dir: -1, poses: [[0, 'de_pie'], [w(4, 5), 'encoger']] });
E.obj('rotCon', 'rotulo', { t0: w(4, 5) - 0.1, t1: w(5, 6), sale: 0.2, x: 400, y: -320, texto: 'CONTRATAR', size: 24, col: GRIS, pop: true, caja: [-85, -14, 170, 28] });
E.obj('entrega1', 'relleno', { t0: w(5, 6), t1: fin(1), x: 70, y: -470, w: 360, h: 40, pop: true, sobrevive: true, r: 50, rotulo: 'LO IMPORTANTE',
  f: [[w(5, 7), 0], [wf(5, -1) + 0.2, 1, 'out']], caja: [-180, -54, 360, 74] });
E.obj('ch1', 'chispas', { t0: wf(5, -1) + 0.2, t1: wf(5, -1) + 1.0, x: 70, y: -470, r0: 100, r1: 220, inspeccion: false });
E.golpe(wf(5, -1) + 0.2, 0.04); E.destello(wf(5, -1) + 0.2, 0.1);

// ---------- 2 · si metes gente, que sea cuanto antes ----------
// 6: La(0) segunda(1) si(2) metes(3) gente(4) que(5) sea(6) cuanto(7) antes(8)
// 7: A(0) mitad(1) de(2) proyecto(3) cada(4) persona(5) nueva(6) frena(7) a(8) las(9) demás(10)
E.numero(2, N[1].T, N[1].S, { desde: 'entrega1', hacia: 'linea2' });
E.figura('yoP2', { t0: N[1].S - 0.1, t1: fin(2), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(6, 3), 'ofrecer'], [w(6, 7), 'senalar'], [wf(6, -1), 'celebrar'], [w(7, 0), 'senalar'], [w(7, 4), 'pensar'], [w(7, 7), 'manos_cabeza']],
  sonrisa: [[0, 0.3], [w(6, 7), 1], [wf(6, -1), 1.4], [w(7, 0), 0.5], [w(7, 7), -1.3]] });
E.obj('linea2', 'barra', { t0: N[1].S - 0.1, t1: fin(2), x: 40, y: -390, w: 420, h: 44, pop: true, sobrevive: true, r: 50,
  f: [[w(6, 7), 0], [wf(6, -1), 0.14, 'out'], [w(7, 0), 0.14], [w(7, 3), 0.5, 'inout'], [w(7, 7), 0.5], [w(7, 8), 0.52, 'out']],
  marca: [[0, -1], [w(6, 7) - 0.01, -1], [w(6, 7), 0.14], [w(7, 0), 0.14], [w(7, 3), 0.5, 'inout']], caja: [-210, -48, 420, 96] });
E.sfx(w(6, 7), 'fill'); E.sfx(w(7, 0), 'fill');
const mx2 = f => 40 - 210 + 8 + 404 * f;
E.obj('rotMarca2', 'rotulo', { t0: w(6, 7), t1: fin(2), sale: 0.2, x: [[0, mx2(0.14)], [w(7, 0), mx2(0.14)], [w(7, 3), mx2(0.5), 'inout']], y: -465,
  texto: [[0, 'CUANTO ANTES'], [w(7, 0) + 0.2, 'A MITAD']], size: 24, col: AM, pop: true, caja: [-95, -14, 190, 28] });
// el equipo (gris) y la gente nueva que entra
[{ x: -120 }, { x: -10 }].forEach((q, i) => E.figura('eq' + i, { t0: N[1].S + i * 0.1, t1: fin(2), x: q.x, talla: 240, color: 'gris', dir: -1,
  poses: [[0, 'de_pie'], [wf(6, -1) + 0.1 * i, 'celebrar'], [w(7, 0), 'coger'], [w(7, 7) + 0.1 * i, i ? 'encoger' : 'manos_cabeza']] }));
E.figura('pronto', { t0: w(6, 3) - 0.1, t1: fin(2), x: [[w(6, 3), 170], [w(6, 3) + 0.45, 100, 'out']], talla: 240, color: 'gris', dir: -1,
  poses: [[0, 'andar'], [w(6, 3) + 0.45, 'de_pie'], [wf(6, -1) + 0.2, 'celebrar'], [w(7, 0), 'coger'], [w(7, 7) + 0.2, 'encoger']] });
E.obj('ch2a', 'chispas', { t0: wf(6, -1), t1: wf(6, -1) + 0.8, x: mx2(0.14), y: -390, r0: 40, r1: 120, inspeccion: false });
E.figura('tarde', { t0: w(7, 4) - 0.1, t1: fin(2), x: [[w(7, 4), 400], [w(7, 4) + 0.45, 310, 'out']], talla: 240, color: 'gris', dir: -1,
  poses: [[0, 'andar'], [w(7, 4) + 0.45, 'pensar']] });
E.obj('rotFrena', 'rotulo', { t0: w(7, 7) - 0.05, t1: fin(2), sale: 0.2, x: 240, y: -300, texto: 'FRENA', size: 30, col: ROJO, peso: 700, pop: true, caja: [-70, -18, 140, 36] });
E.temblor(w(7, 7), 12, 0.4); E.golpe(w(7, 7), 0.04);

// ---------- 3 · cambia la fecha de entrega a tiempo ----------
// 8: La(0) tercera(1) cambia(2) la(3) fecha(4) de(5) entrega(6) a(7) tiempo(8)
// 9: Avisar(0) con(1) un(2) mes(3) de(4) margen(5) es(6) mejor(7) que(8) fallar(9) el(10) último(11) día(12)
E.numero(3, N[2].T, N[2].S, { desde: 'linea2', hacia: 'fecha' });
E.figura('yoP3', { t0: N[2].S - 0.1, t1: TC, x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(8, 2), 'coger'], [w(8, 4), 'levantar'], [w(8, 7), 'senalar'], [w(9, 0), 'ofrecer'], [w(9, 6), 'senalar'], [w(9, 9), 'encoger'], [wf(9, -1) + 0.1, 'celebrar']],
  sonrisa: [[0, 0.3], [w(8, 4), 0.9], [w(9, 0), 1], [w(9, 9), -0.3], [wf(9, -1) + 0.1, 1.4]] });
E.obj('fecha', 'barra', { t0: N[2].S - 0.1, t1: TC, x: 60, y: -330, w: 420, h: 44, pop: true, r: 50, rotMarca: 'ENTREGA',
  f: [[N[2].S, 0.3], [w(8, 2), 0.5, 'out'], [w(9, 0), 0.5], [w(9, 5) + 0.3, 0.88, 'inout']],
  marca: [[0, 0.58], [w(8, 2), 0.58], [w(8, 4) + 0.35, 0.88, 'inout']], caja: [-210, -100, 420, 128] });
E.sfx(w(8, 2), 'fill'); E.sfx(w(9, 0), 'fill');
E.obj('pulsoF', 'pulso', { t0: w(8, 4) + 0.35, t1: w(8, 4) + 1.0, x: 60 - 210 + 8 + 404 * 0.88, y: -330, r0: 30, r1: 110, inspeccion: false });
E.sfx(w(8, 4) + 0.35, 'thud');
E.obj('chF', 'chispas', { t0: w(8, 8), t1: w(8, 8) + 0.8, x: 60 - 210 + 8 + 404 * 0.88, y: -330, r0: 40, r1: 130, inspeccion: false });
E.destello(w(8, 8), 0.1);
E.figura('jefe3', { t0: w(8, 2) - 0.1, t1: TC, x: 410, talla: 280, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(9, 2), 'pensar'], [w(9, 5) + 0.3, 'celebrar']], sonrisa: [[0, 0.3], [w(9, 5) + 0.3, 1.2]] });
E.obj('bocaA', 'bocadillo', { t0: w(9, 0), t1: w(9, 6), sale: 0.2, x: -235, y: -470, w: 130, h: 64, on: 1, pop: true, caja: [-65, -32, 130, 90] });
E.obj('rotMes', 'rotulo', { t0: w(9, 2) - 0.1, t1: TC, sale: 0.2, x: 150, y: -470, texto: 'UN MES DE MARGEN', size: 28, col: AM, pop: true, caja: [-170, -16, 340, 32] });
E.obj('ch3b', 'chispas', { t0: w(9, 5) + 0.3, t1: w(9, 5) + 1.1, x: 60 - 210 + 8 + 404 * 0.88, y: -330, r0: 40, r1: 130, inspeccion: false });
E.golpe(w(9, 5) + 0.3, 0.04);
E.obj('rotUlt', 'rotulo', { t0: w(9, 10) - 0.1, t1: TC, sale: 0.2, x: 90, y: -200, texto: 'EL ÚLTIMO DÍA', size: 28, col: ROJO, pop: true, caja: [-130, -16, 260, 32] });
E.temblor(w(9, 9), 10, 0.35);

// ---------- cierre: resumen y envío ----------
// 10: Hay(0) trabajos(1) que(2) no(3) van(4) más(5) rápido(6) por(7) repartirlos(8) entre(9) más(10) gente(11)
// 11: Mándaselo(0) a(1) ese(2) compañero(3) que(4) tiene(5) un(6) proyecto(7) con(8) retraso(9)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(10, 6), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, items: ['Recorta', 'Cuanto antes', 'Avisa a tiempo'], gap: 270,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(10, 6)], caja: [-400, -60, 800, 200] });
E.obj('confC', 'confeti', { t0: wf(10, -1), t1: wf(10, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(10, -1), 0.22); E.golpe(wf(10, -1), 0.04);
E.figura('yoF', { t0: w(11, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(11, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(11, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(11, 9)], vuelo: [[wf(11, -1), 0], [wf(11, -1) + 0.5, 1, 'in']] });
