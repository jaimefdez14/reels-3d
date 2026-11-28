// L50 · El síndrome del impostor (estilo B; reglas 15, 20, 21, 24)
// Idea visual: la barra con la marca «LA TALLA». Lo que has hecho la llena de sobra (lista de logros marcada), pero lo que
// crees la deja por debajo de la marca. Concepto: los logros se desmarcan y pasan a ser «SUERTE»; llegan dos grises a
// «descubrirte». Contador que rueda: 1978. Algo que se rellena por punto: la lista de apuntes de cada viernes, la barra de
// confianza y las dos barras iguales (tú / él), y el tarro de elogios.
// Regla 20: «Se van a dar cuenta.» va en bocadillo del muñeco durante el gancho; «Gracias.» en el punto 3; la voz solo narra.
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
  [0, [0, -380, 1.04]], [w(0, 6), [10, -385, 1.06]], [w(0, 12), [-20, -390, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 8), [0, -385, 1.04]],
  [w(1, 17), [20, -390, 1.06]], [w(2, 0), [0, -380, 1.02]], [w(2, 6), [10, -385, 1.04]], [N[0].T, [10, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [15, -385, 1.04]], [w(4, 5), [-10, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 0), [-15, -385, 1.04]], [w(6, 7), [15, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(8, 0), [-10, -385, 1.04]], [w(8, 5), [10, -385, 1.05]], [TC - 0.1, [0, -385, 1.04]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Llevas(0) años(1) en(2) tu(3) puesto(4) y(5) sigues(6) creyendo(7) que(8) no(9) das(10) la(11) talla(12)   [bocadillo «Se van a dar cuenta.»]
// «Llevas años en tu puesto»: los logros se marcan uno a uno y la barra pasa de sobra la marca; el compañero aplaude.
// «y sigues creyendo que no das la talla»: la barra cae por debajo de la marca y el muñeco se encoge.
E.figura('yo', { t0: 0, t1: w(1, 0), sale: 0.25, x: -350, cara: true,
  poses: [[0, 'de_pie'], [w(0, 1), 'senalar'], [w(0, 5), 'encoger'], [w(0, 9), 'manos_cabeza']],
  sonrisa: [[0, 0.3], [w(0, 1), 0.6], [w(0, 5), -0.4], [w(0, 9), -1.1], [w(0, 12), -1.5]] });
E.obj('bocaH', 'bocadillo', { t0: 0.3, t1: w(1, 0) - 0.05, sale: 0.2, x: -65, y: -490, w: 380, h: 78, texto: 'Se van a dar cuenta.', size: 30, pop: true,
  on: [[0.3, 0], [0.8, 1]], caja: [-190, -39, 380, 104] });
E.obj('talla0', 'barra', { t0: 0, t1: w(1, 0), sale: 0.25, x: 150, y: -290, w: 380, h: 44, marca: 0.6, rotMarca: 'LA TALLA',
  f: [[0, 0.2], [0.15, 0.2], [w(0, 4) + 0.2, 0.92, 'out'], [w(0, 6), 0.92], [w(0, 12), 0.28, 'inout']], barrido: [w(0, 4) + 0.2], caja: [-190, -90, 380, 138] });
E.sfx(0.2, 'fill');
E.obj('logros0', 'lista', { t0: 0, t1: w(1, 0), sale: 0.25, x: 110, y: -110, n: 3, w: 260, gap: 58,
  p: [[0, 1], [0.15, 1], [w(0, 4) + 0.2, 3, 'lin']], brillo: [[0, 1], [0.15, 1], [w(0, 4) + 0.2, 3, 'lin'], [w(0, 6), 3], [w(0, 12), 0, 'inout']], caja: [-130, -80, 260, 160] });
E.figura('cA', { t0: 0, t1: w(1, 0), sale: 0.25, x: 405, talla: 250, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(0, 1), 'celebrar'], [w(0, 6), 'de_pie']], sonrisa: 1 });
E.obj('chH', 'chispas', { t0: w(0, 4) + 0.2, t1: w(0, 4) + 1.0, x: 150 - 190 + 8 + 364 * 0.92, y: -290, r0: 40, r1: 110, inspeccion: false });
E.golpe(w(0, 4) + 0.2, 0.03);
E.sfx(w(0, 6), 'whoosh');
E.temblor(w(0, 12), 14, 0.45); E.golpe(w(0, 12), 0.05);

// 1: Se(0) llama(1) síndrome(2) del(3) impostor(4) creer(5) que(6) tus(7) logros(8) son(9) suerte(10) y(11) que(12) un(13) día(14) te(15) van(16) a(17) descubrir(18)
// los logros (lista marcada) se desmarcan y pasan a ser «SUERTE»; dos grises llegan señalando: «te van a descubrir»
E.figura('yo1', { t0: w(1, 0) + 0.05, t1: w(2, 0), sale: 0.25, x: -360, cara: true,
  poses: [[0, 'de_pie'], [w(1, 2), 'senalar'], [w(1, 5), 'pensar'], [w(1, 9), 'encoger'], [w(1, 13), 'apartarse'], [w(1, 18), 'manos_cabeza'], [wf(1, -1) + 0.2, 'triste']],
  sonrisa: [[0, 0], [w(1, 2), 0.3], [w(1, 5), 0], [w(1, 9), -0.6], [w(1, 13), -1], [w(1, 18), -1.5]] });
E.obj('rotSI', 'rotulo', { t0: w(1, 2) - 0.1, t1: w(2, 0), sale: 0.25, x: 120, y: -480, texto: 'SÍNDROME DEL IMPOSTOR', size: 30, col: AM, peso: 700, pop: true, caja: [-260, -19, 520, 38] });
E.golpe(w(1, 4), 0.04); E.destello(w(1, 4), 0.12); E.sfx(w(1, 4), 'ding');
E.obj('logros1', 'lista', { t0: w(1, 0) + 0.25, t1: w(2, 0), sale: 0.25, x: 60, y: -250, n: 3, w: 280, gap: 60, pop: true,
  p: [[w(1, 4) + 0.3, 0], [w(1, 5), 1, 'out'], [w(1, 6), 1], [w(1, 8) + 0.25, 3, 'lin'], [w(1, 9), 3], [w(1, 10) + 0.35, 0, 'inout']],
  brillo: [[w(1, 4) + 0.3, 0], [w(1, 5), 1, 'out'], [w(1, 6), 1], [w(1, 8) + 0.25, 3, 'lin'], [w(1, 9), 3], [w(1, 10) + 0.35, 0, 'inout']],
  luz: [[0, 1], [w(1, 10), 1], [w(1, 10) + 0.4, 0.5]], caja: [-140, -82, 280, 164] });
E.sfx(w(1, 4) + 0.3, 'fill');
E.obj('rotLog', 'rotulo', { t0: w(1, 7) - 0.1, t1: w(1, 10) - 0.05, sale: 0.12, x: 60, y: -385, texto: 'TUS LOGROS', size: 28, col: AM, pop: true, caja: [-110, -17, 220, 34] });
E.obj('rotSu', 'rotulo', { t0: w(1, 10) + 0.08, t1: w(2, 0), sale: 0.25, x: 60, y: -385, texto: 'SUERTE', size: 28, col: GRIS, pop: true, caja: [-70, -17, 140, 34] });
E.temblor(w(1, 10), 8, 0.3); E.sfx(w(1, 10), 'whoosh');
[{ id: 'd1', x: 320 }, { id: 'd2', x: 440 }].forEach((q, i) => E.figura(q.id, { t0: w(1, 13) - 0.1 + i * 0.25, t1: w(2, 0), sale: 0.25, x: q.x, talla: 290, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(1, 15) + i * 0.15, 'senalar']], sonrisa: -0.3 }));
E.obj('pulsoD', 'pulso', { t0: w(1, 18), t1: w(1, 18) + 0.7, x: -360, y: -250, r0: 80, r1: 260, inspeccion: false });
E.temblor(w(1, 18), 14, 0.45); E.golpe(w(1, 18), 0.05);

// 2: Lo(0) describieron(1) dos(2) psicólogas(3) en(4) 1978(5) Tres(6) reglas(7) para(8) quitarle(9) fuerza(10)
E.figura('yo2', { t0: w(2, 0) - 0.05, t1: fin(0), x: -360, cara: true,
  poses: [[0, 'de_pie'], [w(2, 2), 'senalar'], [w(2, 5), 'pensar'], [w(2, 6), 'de_pie'], [w(2, 7), 'senalar'], [w(2, 9), 'coger'], [wf(2, -1), 'celebrar']],
  sonrisa: [[0, 0], [w(2, 2), 0.5], [w(2, 6), 0.4], [w(2, 9), 0.8], [wf(2, -1), 1.4]] });
[{ id: 'ps1', x: 290, a: w(2, 1) - 0.1 }, { id: 'ps2', x: 420, a: w(2, 2) - 0.1 }].forEach((q, i) => E.figura(q.id, { t0: q.a, t1: w(2, 6), sale: 0.25, x: q.x, talla: 280, color: 'claro', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(2, 3) + i * 0.2, 'escribir'], [w(2, 5) + 0.6, 'senalar']], sonrisa: 0.8 }));
E.obj('anio', 'contador', { t0: w(2, 3), t1: w(2, 6), sale: 0.2, x: 60, y: -410, size: 110, miles: false, pop: true,
  v: [[w(2, 4), 0], [w(2, 5) + 0.45, 1978, 'out']], barrido: [w(2, 5) + 0.5], caja: [-150, -56, 300, 112] });
E.obj('rotPs', 'rotulo', { t0: w(2, 2) - 0.1, t1: w(2, 6), sale: 0.2, x: 60, y: -318, texto: 'DOS PSICÓLOGAS', size: 24, col: GRIS, pop: true, caja: [-140, -15, 280, 30] });
E.obj('estudio', 'papeles', { t0: w(2, 1), t1: w(2, 6) - 0.1, sale: 0.2, x: 60, y: -14, n: 6, k: [[w(2, 1), 0], [w(2, 5) + 0.5, 6, 'lin']], caja: [-95, -110, 190, 125] });
E.obj('chAnio', 'chispas', { t0: w(2, 5) + 0.45, t1: w(2, 5) + 1.25, x: 60, y: -410, r0: 150, r1: 250, inspeccion: false });
E.golpe(w(2, 5) + 0.45, 0.04);
// «Tres reglas para quitarle fuerza»: tres monedas; la barra de fuerza del síndrome se vacía
const HX = 150;
E.obj('rayosH', 'rayos', { t0: w(2, 6), t1: fin(0), x: HX, y: -400, r: 280, z: -2, p: [[w(2, 6), 0], [w(2, 8), 1, 'out']], inspeccion: false });
[0, 1, 2].forEach(i => { const a = w(2, 6) + 0.05 + i * 0.12;
  E.obj('r' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: HX + (i - 1) * 125, y: -400, r: 40, n: i + 1, pop: true, sfx: true,
    s: i === 0 ? [[0, 1], [wf(2, -1), 1], [wf(2, -1) + 0.3, 1.3, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [wf(2, -1), 1], [wf(2, -1) + 0.3, 0.4]], caja: [-40, -40, 80, 80] }); });
E.obj('fuerza', 'relleno', { t0: w(2, 8) - 0.1, t1: N[0].T, sale: 0.2, x: HX, y: -180, w: 340, h: 44, pop: true, rotulo: 'FUERZA',
  f: [[w(2, 8), 1], [w(2, 9), 1], [wf(2, -1) + 0.15, 0.12, 'inout']], caja: [-170, -56, 340, 78] });
E.sfx(w(2, 9), 'fill');
E.destello(wf(2, -1), 0.12); E.golpe(wf(2, -1), 0.03);

// ---------- 1 · apunta lo que te sale bien ----------
// 3: La(0) primera(1) apunta(2) lo(3) que(4) te(5) sale(6) bien(7)
// 4: Una(0) línea(1) cada(2) viernes(3) Con(4) hechos(5) no(6) con(7) impresiones(8)
E.numero(1, N[0].T, N[0].S, { desde: 'r1', hacia: 'apuntes' });
const LX = 110;
E.figura('yoP1', { t0: N[0].S - 0.1, t1: fin(1), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(3, 2), 'escribir'], [w(3, 6), 'senalar'], [w(4, 0), 'escribir'], [w(4, 3) + 0.3, 'senalar'], [w(4, 6), 'encoger'], [wf(4, -1), 'celebrar']],
  sonrisa: [[0, 0.2], [w(3, 2), 0.4], [w(3, 6), 0.9], [w(4, 0), 0.5], [w(4, 5), 0.9], [w(4, 6), 0], [wf(4, -1), 1.5]] });
// la semana corre hasta el viernes y cada viernes se apunta una línea
const V1 = w(4, 3), V2 = w(4, 5) + 0.25, V3 = w(4, 8) + 0.2;
E.obj('semana', 'dias', { t0: N[0].S - 0.05, t1: fin(1), x: LX, y: -470, letras: ['L', 'M', 'X', 'J', 'V'], gap: 76, pop: true,
  luz: [[w(3, 2), -1], [w(3, 7), 4, 'lin'], [w(4, 0), 4], [w(4, 0) + 0.05, 0], [V1, 4, 'lin'], [V1 + 0.3, 4], [V1 + 0.35, 0], [V2, 4, 'lin'], [V2 + 0.3, 4], [V2 + 0.35, 0], [V3, 4, 'lin']],
  caja: [-185, -32, 370, 64] });
E.obj('apuntes', 'lista', { t0: N[0].S - 0.1, t1: fin(1), x: LX, y: -230, n: 4, w: 300, gap: 56, pop: true, sobrevive: true, r: 70,
  p: [[w(3, 7), 0], [w(3, 7) + 0.3, 1, 'out'], [V1, 1], [V1 + 0.25, 2, 'out'], [V2, 2], [V2 + 0.25, 3, 'out'], [V3, 3], [V3 + 0.25, 4, 'out']],
  brillo: [[w(3, 2), 0], [w(3, 7), 1, 'out'], [V1, 1], [V1 + 0.25, 2, 'out'], [V2, 2], [V2 + 0.25, 3, 'out'], [V3, 3], [V3 + 0.25, 4, 'out']],
  barrido: [wf(4, -1)], caja: [-150, -105, 300, 210] });
E.sfx(w(3, 2), 'fill'); [w(3, 7), V1, V2, V3].forEach(a => E.sfx(a + 0.05, 'tick'));
E.obj('rotV', 'rotulo', { t0: w(4, 2) - 0.1, t1: w(4, 5) - 0.15, sale: 0.12, x: LX, y: -385, texto: 'CADA VIERNES', size: 26, col: GRIS, pop: true, caja: [-125, -16, 250, 32] });
E.obj('rotHe', 'rotulo', { t0: w(4, 5) - 0.08, t1: fin(1), x: LX, y: -385, texto: 'HECHOS', size: 28, col: AM, pop: true, caja: [-80, -17, 160, 34] });
// «no con impresiones»: la maraña de impresiones aparece y se deshace
E.obj('maraI', 'maraña', { t0: w(4, 6), t1: fin(1) - 0.2, sale: 0.2, x: 395, y: -270, r: 44, p: [[w(4, 6), 0], [w(4, 8) + 0.1, 1, 'out'], [wf(4, -1), 1], [wf(4, -1) + 0.3, 0, 'in']],
  rot: [[w(4, 6), 0], [fin(1), 0.8, 'lin']], caja: [-60, -35, 120, 70] });
E.obj('rotIm', 'rotulo', { t0: w(4, 8) - 0.1, t1: fin(1) - 0.2, sale: 0.2, x: LX, y: -70, texto: 'IMPRESIONES', size: 24, col: GRIS, pop: true,
  a: [[0, 1], [wf(4, -1), 1], [wf(4, -1) + 0.3, 0.35]], caja: [-115, -15, 230, 30] });
E.temblor(w(4, 8), 8, 0.3);
E.obj('ch1', 'chispas', { t0: wf(4, -1), t1: wf(4, -1) + 0.8, x: LX, y: -230, r0: 130, r1: 230, inspeccion: false });
E.golpe(wf(4, -1), 0.04); E.destello(wf(4, -1), 0.1);

// ---------- 2 · cuéntaselo a alguien de confianza ----------
// 5: La(0) segunda(1) cuéntaselo(2) a(3) alguien(4) de(5) confianza(6)
// 6: Casi(0) siempre(1) te(2) responde(3) que(4) a(5) él(6) le(7) pasa(8) lo(9) mismo(10)
E.numero(2, N[1].T, N[1].S, { desde: 'apuntes', hacia: 'conf' });
const BX = 40;
E.figura('yoP2', { t0: N[1].S - 0.1, t1: fin(2), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'ofrecer'], [w(5, 6), 'senalar'], [w(6, 0), 'de_pie'], [w(6, 3), 'pensar'], [w(6, 8), 'senalar'], [wf(6, -1), 'celebrar']],
  sonrisa: [[0, -0.2], [w(5, 2), 0.2], [w(5, 6), 0.6], [w(6, 0), 0.3], [w(6, 8), 1], [wf(6, -1), 1.5]] });
E.obj('bocaYo', 'bocadillo', { t0: w(5, 2), t1: w(6, 0), sale: 0.2, x: -185, y: -468, w: 130, h: 64, on: 1, pop: true, caja: [-65, -32, 130, 90] });
E.figura('amigo', { t0: w(5, 4) - 0.15, t1: fin(2), x: 400, talla: 360, color: 'claro', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(5, 6), 'pensar'], [w(6, 2), 'ofrecer'], [w(6, 6), 'senalar'], [wf(6, -1), 'celebrar']], sonrisa: [[0, 0.5], [w(6, 6), 1], [wf(6, -1), 1.4]] });
// la barra de confianza se llena mientras se lo cuentas; luego son dos barras iguales: tú y él
E.obj('conf', 'relleno', { t0: N[1].S - 0.1, t1: fin(2), x: BX, y: -330, w: 300, h: 44, pop: true,
  rotulo: [[0, 'CONFIANZA'], [w(6, 4), 'TÚ']],
  f: [[w(5, 2), 0], [wf(5, -1) + 0.2, 1, 'out'], [w(6, 3), 1], [w(6, 4), 0, 'inout'], [w(6, 6), 0.78, 'out']], barrido: [wf(5, -1) + 0.2], caja: [-150, -56, 300, 78] });
E.sfx(w(5, 2), 'fill'); E.sfx(w(6, 4), 'fill');
E.obj('chC', 'chispas', { t0: wf(5, -1) + 0.2, t1: wf(5, -1) + 1.0, x: BX, y: -330, r0: 100, r1: 200, inspeccion: false });
E.golpe(wf(5, -1) + 0.2, 0.03);
E.obj('bocaEl', 'bocadillo', { t0: w(6, 2), t1: w(6, 9), sale: 0.2, x: 310, y: -455, w: 130, h: 64, on: [[w(6, 2), 0], [w(6, 3), 1]], pop: true, caja: [-65, -32, 130, 90] });
E.obj('el', 'relleno', { t0: w(6, 5) - 0.1, t1: fin(2), x: BX, y: -205, w: 300, h: 44, pop: true, sobrevive: true, r: 50, rotulo: 'ÉL',
  f: [[w(6, 6), 0], [w(6, 8) + 0.2, 0.78, 'out']], barrido: [wf(6, -1)], caja: [-150, -56, 300, 78] });
E.sfx(w(6, 6), 'fill');
E.obj('rotMis', 'rotulo', { t0: w(6, 9) - 0.1, t1: fin(2), x: BX, y: -115, texto: 'LO MISMO', size: 28, col: AM, pop: true, caja: [-95, -17, 190, 34] });
E.obj('ch2', 'chispas', { t0: wf(6, -1), t1: wf(6, -1) + 0.8, x: BX, y: -205, r0: 110, r1: 210, inspeccion: false });
E.golpe(wf(6, -1), 0.04); E.destello(wf(6, -1), 0.1);

// ---------- 3 · acepta los elogios sin rebajarlos ----------
// 7: La(0) tercera(1) acepta(2) los(3) elogios(4) sin(5) rebajarlos(6)
// 8: Da(0) las(1) gracias(2) y(3) no(4) añadas(5) que(6) fue(7) cuestión(8) de(9) suerte(10)
E.numero(3, N[2].T, N[2].S, { desde: 'el', hacia: 'tarro' });
const TX = 60;
E.figura('yoP3', { t0: N[2].S - 0.1, t1: TC, x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(7, 2), 'coger'], [w(7, 5), 'senalar'], [w(8, 0), 'ofrecer'], [w(8, 4), 'encoger'], [w(8, 8), 'apartarse'], [wf(8, -1) + 0.1, 'celebrar']],
  sonrisa: [[0, 0.2], [w(7, 2), 0.8], [w(8, 0), 1.3], [w(8, 4), 0.2], [w(8, 8), -0.4], [wf(8, -1) + 0.1, 1.5]] });
E.figura('elogia', { t0: N[2].S - 0.1, t1: TC, x: 400, talla: 340, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(7, 2), 'ofrecer'], [w(8, 0), 'celebrar'], [w(8, 4), 'de_pie']], sonrisa: 1 });
// cada elogio (corazón) vuela al tarro y el tarro se llena
const HE = [0, 1, 2, 3].map(i => w(7, 2) + i * 0.45);
E.obj('tarro', 'tarro', { t0: N[2].S - 0.1, t1: TC, x: TX, w: 170, h: 220, pop: true, rotulo: 'ELOGIOS', refl: true,
  nivel: [[HE[0] + 0.5, 0], [HE[0] + 0.7, 0.2, 'out'], [HE[1] + 0.5, 0.2], [HE[1] + 0.7, 0.4, 'out'], [HE[2] + 0.5, 0.4], [HE[2] + 0.7, 0.6, 'out'], [HE[3] + 0.5, 0.6], [HE[3] + 0.7, 0.8, 'out'],
    [w(8, 2), 0.8], [w(8, 2) + 0.3, 0.95, 'out']],
  tapa: [[wf(8, -1) - 0.1, 0], [wf(8, -1) + 0.12, 1, 'out']], barrido: [w(8, 2) + 0.3], caja: [-85, -220, 170, 220] });
E.sfx(HE[0] + 0.5, 'fill');
HE.forEach((a, i) => { E.obj('co' + i, 'corazon', { t0: a, t1: a + 0.6, entra: 0.06, sale: 0.12, r: 24, libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, 320], [a + 0.5, TX, 'inout']], y: [[a, -260], [a + 0.25, -360], [a + 0.5, -190, 'in']] });
  E.obj('puT' + i, 'pulso', { t0: a + 0.5, t1: a + 1.0, x: TX, y: -190, r0: 30, r1: 100, inspeccion: false }); E.sfx(a + 0.5, 'pop'); });
// «Da las gracias»: bocadillo del muñeco (regla 20) y el tarro se queda lleno
E.obj('bocaG', 'bocadillo', { t0: w(8, 0), t1: w(8, 6), sale: 0.2, x: -170, y: -472, w: 210, h: 72, texto: 'Gracias.', size: 30, pop: true,
  on: [[w(8, 0), 0], [w(8, 0) + 0.3, 1]], caja: [-105, -36, 210, 98] });
E.obj('chG', 'chispas', { t0: w(8, 2) + 0.3, t1: w(8, 2) + 1.1, x: TX, y: -110, r0: 110, r1: 200, inspeccion: false });
E.golpe(w(8, 2) + 0.3, 0.04);
// «y no añadas que fue cuestión de suerte»: el rótulo «SUERTE» asoma en rojo y se apaga
E.obj('rotSu3', 'rotulo', { t0: w(8, 7), t1: TC, sale: 0.15, x: TX, y: -320, texto: 'SUERTE', size: 30, col: ROJO, pop: true,
  a: [[0, 1], [wf(8, -1), 1], [wf(8, -1) + 0.15, 0.3]], caja: [-75, -18, 150, 36] });
E.obj('maraS', 'maraña', { t0: w(8, 4), t1: TC, sale: 0.15, x: TX, y: -410, r: 36, p: [[w(8, 4), 0], [w(8, 7), 1, 'out'], [w(8, 10), 1], [wf(8, -1) + 0.1, 0, 'in']],
  rot: [[w(8, 4), 0], [TC, 0.6, 'lin']], caja: [-50, -30, 100, 60] });
E.temblor(w(8, 10), 10, 0.35);
E.destello(wf(8, -1) + 0.1, 0.12);

// ---------- cierre: resumen y envío ----------
// 9: Dudar(0) de(1) ti(2) no(3) demuestra(4) que(5) no(6) valgas(7) para(8) el(9) puesto(10)
// 10: Mándaselo(0) a(1) ese(2) amigo(3) que(4) nunca(5) se(6) cree(7) lo(8) que(9) vale(10)
E.sfx(TC, 'cut');
E.obj('rayosC', 'rayos', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(9, 4), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, items: ['Apunta hechos', 'Cuéntalo', 'Da las gracias'], gap: 280,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(9, 4), w(9, 7)], caja: [-410, -60, 820, 200] });
E.obj('confC', 'confeti', { t0: wf(9, -1), t1: wf(9, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(9, -1), 0.22); E.golpe(wf(9, -1), 0.04);
E.figura('yoF', { t0: w(10, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(10, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(10, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(10, 7)], vuelo: [[wf(10, -1), 0], [wf(10, -1) + 0.5, 1, 'in']] });
