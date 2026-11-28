// L54 · La ley de Goodhart (estilo B; reglas 15, 20, 21, 24)
// Idea visual: un contador de llamadas que el muñeco persigue. La «medida» es una barra; en cuanto le ponen la marca de
// OBJETIVO, la barra se llena hasta la marca y la medida queda tachada. Tres preguntas: la trampa (la marca se baja hasta
// donde llega la barra; muchas llamadas y la barra de ventas casi vacía), lo que se deja de hacer (las casillas se
// desmarcan mientras la cifra se llena) y la otra cifra (dos barras que suben a la vez: cantidad y calidad).
// Contadores que ruedan: las llamadas del gancho (hasta 100, «He hecho cien llamadas») y el año 1975.
// Regla 20: «He hecho cien llamadas.» va en bocadillo del muñeco durante el gancho; la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(2, 10), gap: 70, y: 360 } });

// «La primera: // …» → T en «La», S en la primera palabra del punto
const N = [3, 5, 7].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(9, 0) - 0.1;   // resumen
const ROJO = '#e4574f';
const GRIS = '#9a9c9b';
const AM = '#e6ce46';

E.camara([
  [0, [0, -380, 1.04]], [w(0, 6), [10, -385, 1.06]], [w(0, 10), [-20, -390, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 9), [0, -385, 1.04]],
  [w(1, 17), [5, -390, 1.06]], [w(2, 0), [0, -380, 1.02]], [w(2, 9), [10, -385, 1.04]], [N[0].T, [10, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [15, -385, 1.04]], [w(4, 6), [-10, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 0), [-15, -385, 1.04]], [w(6, 8), [15, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(8, 0), [-10, -385, 1.04]], [w(8, 8), [10, -385, 1.05]], [TC - 0.1, [0, -385, 1.04]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Cuando(0) te(1) pagan(2) por(3) un(4) número(5) acabas(6) trabajando(7) para(8) el(9) número(10)   [bocadillo «He hecho cien llamadas.»]
// fotograma 0: el muñeco al teléfono, el jefe (gris) y el contador de llamadas ya rodando; «te pagan»: monedas a la pila;
// «acabas trabajando para el número»: el contador crece y el muñeco se estira hacia él; golpe en «número»
E.figura('yo', { t0: 0, t1: w(1, 0), sale: 0.25, x: -330, talla: 330, cara: true,
  poses: [[0, 'coger'], [w(0, 2), 'celebrar'], [w(0, 4), 'coger'], [w(0, 6), 'senalar'], [w(0, 8), 'levantar'], [w(0, 10) + 0.3, 'manos_cabeza']],
  sonrisa: [[0, 0.6], [w(0, 2), 1.4], [w(0, 6), 0.6], [w(0, 10), -0.6], [wf(0, -1) + 0.3, -1.3]] });
E.obj('tel0', 'telefono', { t0: 0, t1: w(1, 0), sale: 0.25, x: -150, y: -150, w: 110, h: 190, vibra: [[0, 1], [w(0, 6), 1], [w(0, 10), 0.2]], caja: [-55, -95, 110, 190] });
E.obj('bocaY', 'bocadillo', { t0: 0.15, t1: w(0, 10), sale: 0.2, x: -230, y: -455, w: 400, h: 76, texto: 'He hecho cien llamadas.', size: 30, pop: true,
  on: [[0.15, 0], [0.5, 1]], caja: [-200, -38, 400, 102] });
E.figura('jefe0', { t0: 0, t1: w(1, 0), sale: 0.25, x: 400, talla: 330, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(0, 1), 'ofrecer'], [w(0, 6), 'senalar']], sonrisa: 0.8 });
E.obj('llam0', 'contador', { t0: 0, t1: w(1, 0), sale: 0.2, x: 150, y: -430, miles: false,
  size: 90, s: [[0, 1], [w(0, 6), 1], [w(0, 10), 1.35, 'out']], v: [[0, 12], [w(0, 10), 100, 'out']], barrido: [w(0, 10)], caja: [-130, -70, 260, 140] });
E.obj('pila0', 'pila', { t0: 0, t1: w(1, 0), sale: 0.25, x: 180, n: 5, w: 140, hh: 24, k: [[0, 1], [w(0, 2), 1], [w(0, 5), 5, 'out']], caja: [-70, -110, 140, 110], refl: true });
for (let i = 0; i < 3; i++) { const a = w(0, 2) + i * 0.15;
  E.obj('mg' + i, 'moneda', { t0: a, t1: a + 0.6, entra: 0.06, sale: 0.12, r: 18, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, 350], [a + 0.5, 180, 'inout']], y: [[a, -260], [a + 0.25, -300], [a + 0.5, -90, 'in']] }); }
E.sfx(w(0, 2), 'fill');
E.obj('chLl', 'chispas', { t0: w(0, 10), t1: w(0, 10) + 0.8, x: 150, y: -430, r0: 110, r1: 210, inspeccion: false });
E.temblor(w(0, 10), 14, 0.45); E.golpe(w(0, 10), 0.05); E.destello(w(0, 10), 0.12);

// ---------- concepto ----------
// 1: Se(0) llama(1) ley(2) de(3) Goodhart(4) cuando(5) una(6) medida(7) se(8) convierte(9) en(10) objetivo(11) deja(12) de(13) ser(14) una(15) buena(16) medida(17)
// la medida es una barra; en «objetivo» le ponen la marca y la barra corre hasta ella; «buena medida» queda tachada en rojo
E.figura('yo1', { t0: w(1, 0) - 0.05, t1: w(2, 0), sale: 0.25, x: -335, cara: true,
  poses: [[0, 'de_pie'], [w(1, 2), 'senalar'], [w(1, 6), 'pensar'], [w(1, 9), 'levantar'], [w(1, 11) + 0.3, 'celebrar'], [w(1, 14), 'encoger'], [w(1, 17), 'manos_cabeza']],
  sonrisa: [[0, 0.3], [w(1, 2), 0.8], [w(1, 11), 1.4], [w(1, 14), 0], [w(1, 17), -1.4]] });
E.obj('rotGH', 'rotulo', { t0: w(1, 2) - 0.1, t1: w(2, 0), sale: 0.25, x: 140, y: -480, texto: 'LEY DE GOODHART', size: 34, col: AM, peso: 700, pop: true, caja: [-200, -20, 400, 40] });
E.obj('chGH', 'chispas', { t0: w(1, 4), t1: w(1, 4) + 0.8, x: 140, y: -480, r0: 110, r1: 220, inspeccion: false });
E.golpe(w(1, 4), 0.04);
E.obj('med', 'barra', { t0: w(1, 5) - 0.1, t1: w(2, 0), sale: 0.25, x: 140, y: -300, w: 420, h: 44, pop: true,
  marca: [[0, -1], [w(1, 9) - 0.01, -1], [w(1, 9), 0.8]], rotMarca: 'OBJETIVO',
  f: [[w(1, 6), 0], [w(1, 7) + 0.2, 0.4, 'out'], [w(1, 10), 0.4], [w(1, 11) + 0.35, 0.8, 'out']], barrido: [w(1, 11) + 0.4], caja: [-210, -100, 440, 128] });
E.sfx(w(1, 6), 'fill'); E.sfx(w(1, 10), 'fill');
E.obj('pulsoM', 'pulso', { t0: w(1, 11) + 0.35, t1: w(1, 11) + 1.0, x: 140 - 210 + 8 + 404 * 0.8, y: -300, r0: 30, r1: 110, inspeccion: false });
E.obj('rotMed', 'rotulo', { t0: w(1, 7) - 0.1, t1: w(2, 0), sale: 0.25, x: 140, y: -200, texto: [[0, 'MEDIDA'], [w(1, 16), 'BUENA MEDIDA']], size: 30, col: GRIS, pop: true, caja: [-130, -18, 260, 36] });
E.obj('tacha', 'flecha', { t0: w(1, 17), t1: w(2, 0), sale: 0.25, x: 140, y: -200, de: [-130, 0], hasta: [130, 0], curva: 0, punta: false, w: 7, col: ROJO, inspeccion: false,
  p: [[w(1, 17), 0], [w(1, 17) + 0.3, 1, 'out']], caja: [-130, -6, 260, 12] });
E.temblor(w(1, 17), 12, 0.4);

// 2: Lleva(0) el(1) nombre(2) del(3) economista(4) que(5) la(6) planteó(7) en(8) 1975(9) Tres(10) preguntas(11) antes(12) de(13) fijar(14) un(15) objetivo(16)
E.figura('yo2', { t0: w(2, 0) - 0.05, t1: fin(0), x: [[0, -360], [w(2, 10), -360], [w(2, 12), -260, 'inout']], cara: true,
  poses: [[0, 'de_pie'], [w(2, 2), 'senalar'], [w(2, 7), 'pensar'], [w(2, 9), 'senalar'], [w(2, 10), 'andar'], [w(2, 12), 'de_pie'], [w(2, 14), 'coger'], [w(2, 16), 'senalar']],
  sonrisa: [[0, 0], [w(2, 2), 0.6], [w(2, 9), 1], [w(2, 14), 0.6]] });
E.obj('rotEco', 'rotulo', { t0: w(2, 4) - 0.1, t1: w(2, 10), sale: 0.2, x: 170, y: -460, texto: 'ECONOMISTA', size: 32, col: GRIS, pop: true, caja: [-130, -18, 260, 36] });
E.obj('anio', 'contador', { t0: w(2, 1), t1: w(2, 10), sale: 0.2, x: 170, y: -340, size: 120, miles: false, pop: true,
  v: [[w(2, 5), 0], [w(2, 9) + 0.45, 1975, 'out']], barrido: [w(2, 9) + 0.5], caja: [-170, -60, 340, 120] });
E.obj('libro', 'papeles', { t0: w(2, 0), t1: w(2, 10) - 0.2, sale: 0.2, x: 170, y: -14, n: 6, k: [[w(2, 0), 0], [w(2, 9), 6, 'lin']], caja: [-95, -110, 190, 125] });
E.obj('chAnio', 'chispas', { t0: w(2, 9) + 0.45, t1: w(2, 9) + 1.25, x: 170, y: -340, r0: 150, r1: 250, inspeccion: false });
E.golpe(w(2, 9) + 0.45, 0.04);
// «Tres preguntas»: tres monedas con «?»; «antes de fijar un objetivo»: una barra vacía a la que se le pone la marca
[0, 1, 2].forEach(i => { const a = w(2, 10) + i * 0.13;
  E.obj('q' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: 70 + i * 100, y: -470, r: 32, n: '?', pop: true, sfx: i === 0,
    s: i === 0 ? [[0, 1], [wf(2, -1), 1], [wf(2, -1) + 0.3, 1.3, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [wf(2, -1), 1], [wf(2, -1) + 0.3, 0.4]], caja: [-32, -32, 64, 64] }); });
E.obj('fijar', 'barra', { t0: w(2, 12) - 0.1, t1: N[0].T, sale: 0.2, x: 170, y: -230, w: 380, h: 44, pop: true,
  marca: [[0, -1], [w(2, 14) - 0.01, -1], [w(2, 14), 0.7]], rotMarca: 'OBJETIVO', f: 0, caja: [-190, -100, 400, 128] });
E.obj('pulsoF', 'pulso', { t0: w(2, 14), t1: w(2, 14) + 0.6, x: 170 - 190 + 8 + 364 * 0.7, y: -230, r0: 20, r1: 90, inspeccion: false });
E.sfx(w(2, 14), 'thud');
E.destello(wf(2, -1), 0.12);

// ---------- 1 · ¿se puede cumplir haciendo trampa? ----------
// 3: La(0) primera(1) se(2) puede(3) cumplir(4) haciendo(5) trampa(6)
// 4: Si(0) pagas(1) por(2) llamadas(3) tendrás(4) muchas(5) llamadas(6) y(7) pocas(8) ventas(9)
E.numero(1, N[0].T, N[0].S, { desde: 'q1', hacia: 'meta1' });
E.figura('yoP1', { t0: N[0].S - 0.1, t1: fin(1), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(3, 2), 'pensar'], [w(3, 4), 'senalar'], [w(3, 5), 'apartarse'], [w(3, 6), 'coger'], [wf(3, -1) + 0.2, 'celebrar'],
    [w(4, 0), 'de_pie'], [w(4, 1), 'ofrecer'], [w(4, 4), 'senalar'], [w(4, 6), 'celebrar'], [w(4, 8), 'encoger'], [w(4, 9) + 0.2, 'triste']],
  sonrisa: [[0, 0.2], [w(3, 4), 0.6], [w(3, 5), 1.2], [w(4, 1), 0.6], [w(4, 6), 1.5], [w(4, 8), -0.3], [w(4, 9), -1.4]] });
// la trampa: la barra se queda corta y la marca del objetivo se baja hasta ella
E.obj('meta1', 'barra', { t0: N[0].S - 0.1, t1: w(4, 0), sale: 0.1, x: 120, y: -420, w: 420, h: 44, pop: true, marca: [[0, 0.85], [w(3, 5), 0.85], [w(3, 6) + 0.35, 0.35, 'inout']], rotMarca: 'OBJETIVO',
  f: [[w(3, 2), 0], [w(3, 4) + 0.2, 0.35, 'out']], barrido: [w(3, 6) + 0.4], caja: [-210, -100, 440, 128] });
E.sfx(w(3, 2), 'fill');
E.obj('rotTram', 'rotulo', { t0: w(3, 6) - 0.05, t1: w(4, 0), sale: 0.15, x: 120, y: -320, texto: 'TRAMPA', size: 30, col: ROJO, pop: true, caja: [-75, -18, 150, 36] });
E.obj('chTram', 'chispas', { t0: w(3, 6) + 0.35, t1: w(3, 6) + 1.05, x: 120 - 210 + 8 + 404 * 0.35, y: -420, r0: 30, r1: 100, inspeccion: false });
E.temblor(w(3, 6) + 0.35, 10, 0.35);
// «si pagas por llamadas»: monedas a la barra de llamadas, que se llena; la de ventas casi no se mueve
E.obj('llam', 'relleno', { t0: w(4, 0) + 0.12, t1: fin(1), x: 120, y: -440, w: 400, h: 44, pop: true, sobrevive: true, r: 50, rotulo: 'LLAMADAS',
  f: [[w(4, 1), 0], [w(4, 3), 0.35, 'out'], [w(4, 5), 0.35], [w(4, 6) + 0.35, 1, 'out']], barrido: [w(4, 6) + 0.4], caja: [-200, -56, 400, 78] });
E.sfx(w(4, 1), 'fill'); E.sfx(w(4, 5), 'fill');
for (let i = 0; i < 3; i++) { const a = w(4, 1) + i * 0.15;
  E.obj('mp' + i, 'moneda', { t0: a, t1: a + 0.6, entra: 0.06, sale: 0.12, r: 18, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, -260], [a + 0.5, -40 + i * 50, 'inout']], y: [[a, -300], [a + 0.25, -380], [a + 0.5, -440, 'in']] }); }
E.obj('vent', 'relleno', { t0: w(4, 4), t1: fin(1), x: 120, y: -310, w: 400, h: 44, pop: true, rotulo: 'VENTAS',
  f: [[w(4, 7), 0], [w(4, 9) + 0.3, 0.1, 'out']], caja: [-200, -56, 400, 78] });
E.obj('tel1', 'telefono', { t0: w(4, 4) - 0.1, t1: fin(1), x: 400, y: -150, w: 110, h: 190, pop: true, vibra: [[0, 0], [w(4, 5), 1], [w(4, 8), 1], [w(4, 9), 0]], caja: [-55, -95, 110, 190] });
E.obj('rotPocas', 'rotulo', { t0: w(4, 8) - 0.05, t1: fin(1), x: 100, y: -220, texto: 'POCAS VENTAS', size: 28, col: ROJO, pop: true, caja: [-120, -16, 240, 32] });
E.obj('ch1', 'chispas', { t0: w(4, 6) + 0.35, t1: w(4, 6) + 1.1, x: 300, y: -440, r0: 40, r1: 120, inspeccion: false });
E.golpe(w(4, 6) + 0.35, 0.04);
E.temblor(w(4, 9), 10, 0.35);

// ---------- 2 · ¿qué se deja de hacer para llegar a la cifra? ----------
// 5: La(0) segunda(1) qué(2) se(3) deja(4) de(5) hacer(6) para(7) llegar(8) a(9) la(10) cifra(11)
// 6: Lo(0) que(1) no(2) se(3) mide(4) es(5) lo(6) primero(7) que(8) se(9) abandona(10)
E.numero(2, N[1].T, N[1].S, { desde: 'llam', hacia: 'cifra' });
E.figura('yoP2', { t0: N[1].S - 0.1, t1: fin(2), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'pensar'], [w(5, 4), 'apartarse'], [w(5, 8), 'senalar'], [wf(5, -1), 'celebrar'],
    [w(6, 0), 'de_pie'], [w(6, 2), 'senalar'], [w(6, 6), 'encoger'], [w(6, 10), 'manos_cabeza']],
  sonrisa: [[0, 0.2], [w(5, 4), -0.3], [w(5, 8), 0.8], [wf(5, -1), 1.4], [w(6, 2), 0.2], [w(6, 6), -0.4], [w(6, 10), -1.4]] });
E.obj('cifra', 'relleno', { t0: N[1].S - 0.1, t1: fin(2), x: 120, y: -460, w: 380, h: 44, pop: true, sobrevive: true, r: 50,
  rotulo: [[0, 'LA CIFRA'], [w(6, 3), 'LO QUE SE MIDE']], f: [[w(5, 7), 0], [wf(5, -1) + 0.3, 1, 'out']], barrido: [wf(5, -1) + 0.35], caja: [-190, -56, 380, 78] });
E.sfx(w(5, 7), 'fill');
E.obj('chC', 'chispas', { t0: wf(5, -1) + 0.3, t1: wf(5, -1) + 1.0, x: 290, y: -460, r0: 40, r1: 120, inspeccion: false });
E.golpe(wf(5, -1) + 0.3, 0.04);
// «qué se deja de hacer»: las casillas de lo que hacías se desmarcan mientras la cifra sube
E.obj('hacer', 'lista', { t0: N[1].S - 0.05, t1: fin(2), x: 120, y: -230, n: 3, w: 300, gap: 70, pop: true,
  p: [[0, 3], [w(5, 4), 3], [w(5, 8), 0, 'lin']], brillo: [[0, 3], [w(5, 4), 3], [w(5, 8), 0, 'lin']],
  luz: [[0, 1], [w(6, 9), 1], [w(6, 10) + 0.3, 0.35]], caja: [-150, -88, 300, 176] });
E.obj('rotNoMide', 'rotulo', { t0: w(6, 0) - 0.05, t1: w(6, 9), sale: 0.15, x: 120, y: -360, texto: 'LO QUE NO SE MIDE', size: 24, col: GRIS, pop: true, caja: [-150, -14, 300, 28] });
E.obj('rotAband', 'rotulo', { t0: w(6, 9) + 0.02, t1: fin(2), x: 120, y: -360, texto: 'SE ABANDONA', size: 26, col: ROJO, pop: true, caja: [-110, -15, 220, 30] });
E.temblor(w(6, 10), 12, 0.4);

// ---------- 3 · ¿qué otra cifra hay que mirar a la vez? ----------
// 7: La(0) tercera(1) qué(2) otra(3) cifra(4) hay(5) que(6) mirar(7) a(8) la(9) vez(10)
// 8: Junto(0) a(1) la(2) cantidad(3) mide(4) la(5) calidad(6) las(7) llamadas(8) y(9) los(10) clientes(11) que(12) repiten(13)
E.numero(3, N[2].T, N[2].S, { desde: 'cifra', hacia: 'cant' });
E.figura('yoP3', { t0: N[2].S - 0.1, t1: TC, x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(7, 2), 'pensar'], [w(7, 4), 'senalar'], [w(7, 8), 'levantar'], [w(8, 0), 'senalar'], [w(8, 4), 'ofrecer'], [w(8, 7), 'senalar'], [w(8, 11), 'de_pie'], [wf(8, -1), 'celebrar']],
  sonrisa: [[0, 0.2], [w(7, 4), 0.6], [w(7, 8), 1], [w(8, 4), 0.8], [wf(8, -1), 1.6]] });
E.obj('cant', 'relleno', { t0: N[2].S - 0.1, t1: TC, x: 120, y: -460, w: 380, h: 44, pop: true, r: 50,
  rotulo: [[0, 'UNA CIFRA'], [w(8, 3), 'LA CANTIDAD'], [w(8, 8), 'LAS LLAMADAS']],
  f: [[w(7, 8), 0], [w(7, 10) + 0.3, 0.5, 'out'], [w(8, 3), 0.5], [w(8, 3) + 0.5, 0.85, 'out']], caja: [-190, -56, 380, 78] });
E.obj('cal', 'relleno', { t0: w(7, 3) - 0.05, t1: TC, x: 120, y: -320, w: 380, h: 44, pop: true,
  rotulo: [[0, 'OTRA CIFRA'], [w(8, 6), 'LA CALIDAD'], [w(8, 11), 'CLIENTES QUE REPITEN']],
  f: [[w(7, 8), 0], [w(7, 10) + 0.3, 0.5, 'out'], [w(8, 6), 0.5], [w(8, 6) + 0.5, 0.85, 'out'], [w(8, 13), 0.85], [wf(8, -1) + 0.2, 1, 'out']], barrido: [wf(8, -1) + 0.25], caja: [-190, -56, 380, 78] });
E.sfx(w(7, 8), 'fill'); E.sfx(w(8, 3), 'fill'); E.sfx(w(8, 6), 'fill');
// «a la vez»: las dos barras suben juntas con una onda cada una
[-460, -320].forEach((yy, i) => E.obj('pv' + i, 'pulso', { t0: w(7, 10) + 0.3, t1: w(7, 10) + 0.9, x: 120 - 190 + 8 + 364 * 0.5, y: yy, r0: 20, r1: 90, inspeccion: false }));
// «los clientes que repiten»: vuelven dos clientes (gris)
[{ id: 'cl1', x: 340 }, { id: 'cl2', x: 440 }].forEach((q, i) => E.figura(q.id, { t0: w(8, 11) + i * 0.15, t1: TC, x: q.x, talla: 230, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(8, 13) + i * 0.1, 'celebrar']], sonrisa: 1 }));
E.obj('ch3', 'chispas', { t0: wf(8, -1) + 0.2, t1: wf(8, -1) + 1.0, x: 290, y: -320, r0: 40, r1: 120, inspeccion: false });
E.destello(wf(8, -1) + 0.2, 0.12);

// ---------- cierre: resumen y envío ----------
// 9: Cumplir(0) el(1) objetivo(2) no(3) siempre(4) es(5) hacer(6) bien(7) el(8) trabajo(9)
// 10: Mándaselo(0) a(1) ese(2) compañero(3) que(4) vive(5) pendiente(6) de(7) sus(8) objetivos(9)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(9, 6), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, items: ['La trampa', 'Lo no medido', 'Otra cifra'], gap: 270,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(9, 6)], caja: [-400, -60, 800, 200] });
E.obj('confC', 'confeti', { t0: wf(9, -1), t1: wf(9, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(9, -1), 0.22); E.golpe(wf(9, -1), 0.04);
E.figura('yoF', { t0: w(10, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(10, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(10, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(10, 9)], vuelo: [[wf(10, -1), 0], [wf(10, -1) + 0.5, 1, 'in']] });
