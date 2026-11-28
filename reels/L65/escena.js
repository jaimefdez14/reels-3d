// L65 · La curva del olvido (estilo B; reglas 15, 20, 21, 24)
// Idea visual: una barra de «lo que aprendas hoy» que se vacía por debajo de la mitad de un día para otro; la curva del
// olvido se dibuja, y cada repaso (al día siguiente, a la semana, al mes) vuelve a llenar algo: el temporizador de diez
// minutos, los bloques de la semana y el calendario del mes, hasta la barra de «tres repasos» frente a «una tarde entera».
// Contador que suma: el año 1885 rueda. Regla 20: «Si ayer me lo sabía.» va en bocadillo del muñeco, sin voz.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(2, 9), gap: 70, y: 360 } });

// «El primero: // …» → T en «El», S en la primera palabra del punto
const N = [3, 5, 7].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(9, 0) - 0.1;   // resumen
const ROJO = '#e4574f';
const GRIS = '#9a9c9b';
const AM = '#e6ce46';
const OX = 150;             // eje x de los objetos (el muñeco vive a la izquierda)

E.camara([
  [0, [0, -380, 1.04]], [w(0, 6), [10, -385, 1.06]], [w(0, 11), [-15, -390, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 8), [10, -385, 1.04]],
  [w(1, 15), [20, -390, 1.06]], [w(2, 0), [0, -380, 1.02]], [w(2, 8), [10, -385, 1.04]], [N[0].T, [10, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [15, -385, 1.04]], [w(4, 6), [-10, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 0), [-15, -385, 1.04]], [w(6, 7), [15, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(8, 0), [-10, -385, 1.04]], [w(8, 7), [10, -385, 1.05]], [TC - 0.1, [0, -385, 1.04]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Mañana(0) habrás(1) olvidado(2) más(3) de(4) la(5) mitad(6) de(7) lo(8) que(9) aprendas(10) hoy(11)   [bocadillo «Si ayer me lo sabía.»]
// fotograma 0: el muñeco junto a sus apuntes y la barra casi llena; «olvidado»: la barra se vacía y los apuntes se borran;
// «la mitad»: cruza la marca (golpe); bocadillo del muñeco, que se lleva las manos a la cabeza
E.figura('yo', { t0: 0, t1: w(1, 0), sale: 0.25, x: -355, cara: true,
  poses: [[0, 'celebrar'], [w(0, 1), 'de_pie'], [w(0, 2), 'pensar'], [w(0, 6), 'manos_cabeza'], [w(0, 11), 'encoger']],
  sonrisa: [[0, 1.4], [w(0, 2), 0.3], [w(0, 6), -1.2], [w(0, 11), -0.8]] });
E.obj('aprende', 'barra', { t0: 0, t1: w(1, 0), sale: 0.25, x: OX + 20, y: -300, w: 380, h: 48, marca: 0.5, rotMarca: 'LA MITAD',
  f: [[0, 0.82], [w(0, 0), 1, 'out'], [w(0, 2), 1], [w(0, 6) + 0.1, 0.38, 'inout']], caja: [-190, -80, 380, 108] });
E.sfx(0.1, 'fill');
E.obj('rotHoy', 'rotulo', { t0: 0, t1: w(1, 0), sale: 0.2, x: OX + 20, y: -200, texto: [[0, 'HOY'], [w(0, 0), 'MAÑANA']], size: 30, col: AM, peso: 700, caja: [-90, -18, 180, 36] });
E.obj('apuntes0', 'papeles', { t0: 0, t1: w(1, 0), sale: 0.25, x: OX + 20, y: -14, n: 6, k: [[0, 6], [w(0, 2), 6], [w(0, 6) + 0.2, 2.4, 'inout']],
  luz: [[0, 1], [w(0, 2), 1], [w(0, 6), 0.55]], caja: [-95, -110, 190, 125] });
E.obj('pulso0', 'pulso', { t0: w(0, 6) + 0.1, t1: w(0, 6) + 0.8, x: OX + 20 - 190 + 8 + 364 * 0.5, y: -300, r0: 30, r1: 120, inspeccion: false });
E.temblor(w(0, 6), 14, 0.45); E.golpe(w(0, 6), 0.05);
E.obj('bocaG', 'bocadillo', { t0: w(0, 7), t1: w(1, 0), sale: 0.2, x: -40, y: -470, w: 360, h: 76, texto: 'Si ayer me lo sabía.', size: 30, pop: true,
  on: [[w(0, 7), 0], [w(0, 7) + 0.3, 1]], caja: [-180, -38, 360, 102] });

// 1: Se(0) llama(1) curva(2) del(3) olvido(4) La(5) midió(6) el(7) psicólogo(8) Ebbinghaus(9) en(10) 1885(11) aprendiéndose(12) listas(13) de(14) sílabas(15)
// la curva se dibuja; luego el nombre, el año que rueda y la lista de sílabas que se marca
E.figura('yo1', { t0: w(1, 0) + 0.05, t1: w(2, 0), sale: 0.25, x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(1, 2), 'senalar'], [w(1, 5), 'de_pie'], [w(1, 8), 'pensar'], [w(1, 11), 'senalar'], [w(1, 13), 'coger'], [wf(1, -1), 'de_pie']],
  sonrisa: [[0, 0], [w(1, 2), 0.6], [w(1, 8), 0.2], [w(1, 11), 0.9]] });
E.obj('rotCurva', 'rotulo', { t0: w(1, 2) - 0.1, t1: w(1, 8), sale: 0.2, x: OX, y: -500, texto: 'CURVA DEL OLVIDO', size: 34, col: AM, peso: 700, pop: true, caja: [-210, -20, 420, 40] });
E.obj('chCurva', 'chispas', { t0: w(1, 4), t1: w(1, 4) + 0.8, x: OX, y: -500, r0: 120, r1: 230, inspeccion: false });
E.golpe(w(1, 4), 0.04);
E.obj('curva', 'flecha', { t0: w(1, 0) + 0.05, t1: w(1, 8), sale: 0.25, x: OX, y: -270, de: [-200, -140], hasta: [210, 110], curva: 0.3, punta: false, w: 8, col: AM,
  p: [[w(1, 0) + 0.1, 0], [w(1, 4) + 0.4, 1, 'out']], caja: [-205, -145, 420, 260] });
E.sfx(w(1, 0) + 0.1, 'fill');
E.obj('rotEbb', 'rotulo', { t0: w(1, 9) - 0.15, t1: w(2, 0), sale: 0.2, x: OX, y: -500, texto: 'EBBINGHAUS', size: 34, col: GRIS, peso: 700, pop: true, caja: [-150, -20, 300, 40] });
E.obj('anio', 'contador', { t0: w(1, 8) + 0.1, t1: w(2, 0), sale: 0.2, x: OX, y: -365, size: 110, miles: false, pop: true,
  v: [[w(1, 9), 0], [w(1, 11) + 0.45, 1885, 'out']], barrido: [w(1, 11) + 0.5], caja: [-150, -55, 300, 110] });
E.obj('chAnio', 'chispas', { t0: w(1, 11) + 0.45, t1: w(1, 11) + 1.25, x: OX, y: -365, r0: 150, r1: 240, inspeccion: false });
E.golpe(w(1, 11) + 0.45, 0.04);
E.obj('silabas', 'lista', { t0: w(1, 12) - 0.15, t1: w(2, 0), sale: 0.2, x: OX, y: -160, n: 3, w: 280, gap: 58, pop: true,
  p: [[w(1, 13), 0], [wf(1, -1), 3, 'lin']], brillo: [[w(1, 12), 0], [w(1, 15), 3, 'lin']], caja: [-140, -76, 280, 152] });
E.sfx(w(1, 13), 'fill');

// 2: Lo(0) que(1) no(2) se(3) repasa(4) se(5) pierde(6) rápido(7) Con(8) tres(9) repasos(10) se(11) evita(12)
// la barra se vacía de golpe («rápido», en rojo); con cada uno de los tres repasos (monedas) vuelve a subir
E.figura('yo2', { t0: w(2, 0) - 0.05, t1: fin(0), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(2, 2), 'senalar'], [w(2, 6), 'manos_cabeza'], [w(2, 8), 'de_pie'], [w(2, 9), 'ofrecer'], [w(2, 12), 'celebrar']],
  sonrisa: [[0, 0.2], [w(2, 6), -1.2], [w(2, 9), 0.5], [w(2, 12), 1.5]] });
E.obj('memoria', 'relleno', { t0: w(2, 0), t1: fin(0) - 0.2, sale: 0.2, x: OX, y: -440, w: 360, h: 44, pop: true,
  rotulo: [[0, 'LO QUE NO SE REPASA'], [w(2, 8), 'CON TRES REPASOS']],
  f: [[w(2, 0), 0.95], [w(2, 5), 0.95], [w(2, 7) + 0.25, 0.08, 'out'], [w(2, 9), 0.08], [w(2, 9) + 0.25, 0.4, 'out'], [w(2, 10) + 0.2, 0.7, 'out'], [w(2, 12), 0.95, 'out']],
  caja: [-180, -56, 360, 78] });
E.sfx(w(2, 9), 'fill');
E.obj('rapido', 'rotulo', { t0: w(2, 7) - 0.05, t1: w(2, 8), sale: 0.15, x: OX, y: -330, texto: 'RÁPIDO', size: 30, col: ROJO, peso: 700, pop: true, caja: [-80, -18, 160, 36] });
E.temblor(w(2, 7), 10, 0.35);
[0, 1, 2].forEach(i => { const a = [w(2, 9), w(2, 10), w(2, 11)][i] - 0.05;
  E.obj('rep' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: OX - 110 + i * 110, y: -250, r: 40, n: String(i + 1), pop: true, sfx: i === 0,
    s: i === 0 ? [[0, 1], [wf(2, -1), 1], [wf(2, -1) + 0.3, 1.25, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [wf(2, -1), 1], [wf(2, -1) + 0.3, 0.4]], caja: [-40, -40, 80, 80] }); });
E.obj('chEvita', 'chispas', { t0: w(2, 12), t1: w(2, 12) + 0.8, x: OX, y: -440, r0: 120, r1: 220, inspeccion: false });
E.destello(wf(2, -1), 0.12);

// ---------- 1 · al día siguiente ----------
// 3: El(0) primero(1) al(2) día(3) siguiente(4)
// 4: Diez(0) minutos(1) sin(2) mirar(3) los(4) apuntes(5) Intenta(6) recordarlo(7) tú(8)
E.numero(1, N[0].T, N[0].S, { desde: 'rep1', hacia: 'dias1' });
E.figura('yoP1', { t0: N[0].S - 0.1, t1: fin(1), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(3, 3), 'senalar'], [w(4, 0), 'ofrecer'], [w(4, 2), 'apartarse'], [w(4, 6), 'pensar'], [w(4, 8), 'celebrar']],
  sonrisa: [[0, 0.2], [w(3, 3), 0.7], [w(4, 2), 0.2], [w(4, 6), 0.4], [w(4, 8), 1.5]] });
E.obj('dias1', 'dias', { t0: N[0].S - 0.05, t1: fin(1), x: OX + 10, y: -480, gap: 70, pop: true,
  luz: [[w(3, 2), -1], [w(3, 2) + 0.2, 0], [w(3, 3), 0], [w(3, 4) + 0.2, 1, 'inout']], caja: [-240, -32, 480, 64] });
E.obj('pulsoD1', 'pulso', { t0: w(3, 4) + 0.2, t1: w(3, 4) + 0.8, x: OX + 10 - 210 + 70, y: -480, r0: 30, r1: 90, inspeccion: false });
E.obj('reloj1', 'temporizador', { t0: w(4, 0) - 0.1, t1: fin(1), x: OX + 100, y: -270, r: 92, texto: '10', sub: 'MIN', pop: true, sobrevive: true,
  p: [[w(4, 0), 0], [w(4, 8), 1, 'lin']], hecho: [[w(4, 8), 0], [w(4, 8) + 0.3, 1]], caja: [-110, -110, 220, 220] });
E.sfx(w(4, 0), 'fill');
// «sin mirar los apuntes»: los apuntes quedan a un lado, apagados y tachados en rojo
E.obj('apuntes1', 'papeles', { t0: w(4, 2) - 0.15, t1: fin(1), x: -110, y: -14, n: 5, k: [[w(4, 2) - 0.15, 0], [w(4, 3), 5, 'out']],
  luz: [[0, 1], [w(4, 4), 1], [w(4, 5) + 0.2, 0.4]], caja: [-95, -95, 190, 110] });
E.obj('rotApuntes', 'rotulo', { t0: w(4, 4) - 0.1, t1: fin(1), x: -110, y: -150, texto: 'SIN APUNTES', size: 24, col: ROJO, pop: true, caja: [-95, -14, 190, 28] });
E.obj('ch1', 'chispas', { t0: w(4, 8), t1: w(4, 8) + 0.8, x: OX + 100, y: -270, r0: 110, r1: 210, inspeccion: false });
E.golpe(w(4, 8), 0.04); E.destello(w(4, 8), 0.1);

// ---------- 2 · a la semana ----------
// 5: El(0) segundo(1) a(2) la(3) semana(4)
// 6: Te(0) costará(1) menos(2) y(3) lo(4) que(5) falle(6) es(7) lo(8) que(9) hay(10) que(11) releer(12)
E.numero(2, N[1].T, N[1].S, { desde: 'reloj1', hacia: 'dias2' });
const XM = [[0, -355], [w(6, 8), -355], [w(6, 10), -200, 'inout']];
E.figura('yoP2', { t0: N[1].S - 0.1, t1: fin(2), x: XM, cara: true,
  poses: [[0, 'de_pie'], [w(5, 3), 'senalar'], [w(6, 0), 'celebrar'], [w(6, 4), 'de_pie'], [w(6, 6), 'encoger'], [w(6, 8), 'andar'], [w(6, 10), 'coger']],
  sonrisa: [[0, 0.2], [w(5, 3), 0.6], [w(6, 0), 1.4], [w(6, 6), -0.6], [w(6, 10), 0.6]] });
E.obj('dias2', 'dias', { t0: N[1].S - 0.05, t1: fin(2), x: OX + 10, y: -480, gap: 70, pop: true,
  luz: [[w(5, 2), -1], [w(5, 2) + 0.2, 0], [wf(5, -1) + 0.3, 6, 'inout']], caja: [-240, -32, 480, 64] });
E.obj('pulsoD2', 'pulso', { t0: wf(5, -1) + 0.3, t1: wf(5, -1) + 0.9, x: OX + 10 + 210, y: -480, r0: 30, r1: 90, inspeccion: false });
E.obj('semana', 'bloques', { t0: w(6, 0) - 0.15, t1: fin(2), x: OX + 20, y: -310, n: 5, w: 400, h: 70, parte: 1, pop: true, sobrevive: true, r: 60,
  hechos: [[w(6, 0), 0], [w(6, 2) + 0.3, 4, 'lin']], caja: [-200, -45, 400, 90] });
E.sfx(w(6, 0), 'fill');
E.obj('chSem', 'chispas', { t0: w(6, 2) + 0.3, t1: w(6, 2) + 1.0, x: OX - 20, y: -310, r0: 90, r1: 190, inspeccion: false });
// «lo que falle»: el quinto bloque se queda gris y tiembla; «releer»: rótulo rojo y los apuntes vuelven
const X5 = OX + 20 - 200 + 4 * ((400 - 72) / 5 + 18) + (400 - 72) / 10;
E.temblor(w(6, 6), 8, 0.3);
E.obj('pulsoF', 'pulso', { t0: w(6, 6), t1: w(6, 6) + 0.6, x: X5, y: -310, r0: 30, r1: 90, inspeccion: false });
E.obj('rotFalle', 'rotulo', { t0: w(6, 6) - 0.05, t1: fin(2), x: X5 - 30, y: -390, texto: 'RELEER', size: 26, col: ROJO, peso: 700, pop: true, caja: [-70, -16, 140, 32] });
E.obj('apuntes2', 'papeles', { t0: w(6, 9) - 0.1, t1: fin(2), x: 40, y: -14, n: 5, k: [[w(6, 9) - 0.1, 0], [w(6, 12), 5, 'out']], caja: [-95, -95, 190, 110] });

// ---------- 3 · al mes ----------
// 7: El(0) tercero(1) al(2) mes(3)
// 8: Con(0) tres(1) repasos(2) espaciados(3) se(4) te(5) queda(6) más(7) que(8) con(9) una(10) tarde(11) entera(12) estudiando(13)
E.numero(3, N[2].T, N[2].S, { desde: 'semana', hacia: 'mes' });
E.figura('yoP3', { t0: N[2].S - 0.1, t1: TC, x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(7, 3), 'senalar'], [w(8, 1), 'ofrecer'], [w(8, 6), 'senalar'], [w(8, 9), 'celebrar'], [w(8, 11), 'encoger']],
  sonrisa: [[0, 0.2], [w(7, 3), 0.8], [w(8, 6), 1], [w(8, 9), 1.5], [w(8, 11), 0.2]] });
E.obj('mes', 'cuadricula', { t0: N[2].S - 0.05, t1: w(8, 5), sale: 0.2, x: OX + 20, y: -340, cols: 7, rows: 5, lado: 48, gap: 10, on: [0, 1, 7, 29], pop: true,
  p: [[w(7, 2), 0], [wf(7, -1) + 0.2, 1, 'out']], barrido: [w(8, 1)], caja: [-200, -142, 400, 284] });
E.sfx(w(7, 2), 'fill');
E.obj('rotEsp', 'rotulo', { t0: w(8, 3) - 0.1, t1: w(8, 5), sale: 0.2, x: OX + 20, y: -160, texto: 'ESPACIADOS', size: 28, col: AM, peso: 700, pop: true, caja: [-110, -16, 220, 32] });
E.obj('chMes', 'chispas', { t0: w(8, 1), t1: w(8, 1) + 0.8, x: OX + 20, y: -340, r0: 150, r1: 250, inspeccion: false });
E.golpe(w(8, 1), 0.04);
E.obj('barTres', 'relleno', { t0: w(8, 6) - 0.05, t1: TC, x: OX, y: -430, w: 360, h: 44, pop: true, rotulo: 'TRES REPASOS',
  f: [[w(8, 6), 0], [w(8, 9) + 0.3, 0.95, 'out']], barrido: [w(8, 9) + 0.35], caja: [-180, -56, 360, 78] });
E.obj('barTarde', 'relleno', { t0: w(8, 9) - 0.05, t1: TC, x: OX, y: -290, w: 360, h: 44, pop: true, rotulo: 'UNA TARDE ENTERA', luz: 0.7,
  f: [[w(8, 10), 0], [wf(8, -1), 0.32, 'out']], caja: [-180, -56, 360, 78] });
E.sfx(w(8, 6), 'fill'); E.sfx(w(8, 10), 'fill');
E.obj('apuntes3', 'papeles', { t0: w(8, 11) - 0.1, t1: TC, x: OX, y: -14, n: 6, k: [[w(8, 11) - 0.1, 0], [wf(8, -1), 6, 'lin']], luz: 0.6, caja: [-95, -110, 190, 125] });
E.obj('ch3', 'chispas', { t0: w(8, 9) + 0.3, t1: w(8, 9) + 1.1, x: OX, y: -430, r0: 110, r1: 220, inspeccion: false });
E.golpe(w(8, 9) + 0.3, 0.04);
E.destello(wf(8, -1) + 0.1, 0.12);

// ---------- cierre: resumen y envío ----------
// 9: No(0) hace(1) falta(2) estudiar(3) más(4) horas(5) hace(6) falta(7) repasar(8) a(9) tiempo(10)
// 10: Mándaselo(0) a(1) ese(2) amigo(3) que(4) lo(5) estudia(6) todo(7) la(8) noche(9) de(10) antes(11)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(9, 8), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, items: ['Al día', 'A la semana', 'Al mes'], gap: 270,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(9, 8)], caja: [-400, -60, 800, 200] });
E.obj('confC', 'confeti', { t0: w(9, 8), t1: w(9, 8) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(w(9, 8), 0.22); E.golpe(w(9, 8), 0.04);
E.figura('yoF', { t0: w(10, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(10, 1), 'senalar']] });
E.figura('amigo', { t0: w(10, 2) - 0.1, t1: D + 1, x: 420, talla: 360, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(10, 6), 'manos_cabeza']], sonrisa: [[0, 0.3], [w(10, 6), -1]] });
E.obj('apuntesF', 'papeles', { t0: w(10, 5), t1: D + 1, x: 215, y: -14, n: 6, k: [[w(10, 5), 0], [w(10, 11), 6, 'lin']], luz: 0.7, caja: [-95, -110, 190, 125] });
E.obj('enviar', 'enviar', { t0: w(10, 1), t1: D + 1, x: 120, y: -380, r: 64, pop: true, barrido: [w(10, 11)], vuelo: [[wf(10, -1), 0], [wf(10, -1) + 0.5, 1, 'in']] });
