// L11 · Cuatro reglas para que las reuniones duren la mitad (estilo B; reglas 15, 20)
// Gancho visual (REDACCION §2c): fotograma 0 con seis personas en fila y el reloj de la reunión; con «seis horas» el contador suma 1→6 h.
// Regla 20: lo que dice el compañero («Me encargo yo. Para el viernes.») va en bocadillo; la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 4, estilo: 'puntos', aparece: w(1, 0), gap: 70, y: 360 } });

// «La primera: // …» → T en «La», S en la primera palabra de la regla
const N = [2, 5, 7, 9].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(11, 0) - 0.1;

E.camara([
  [0, [0, -380, 1.02]], [w(0, 8), [0, -390, 1.06]], [w(1, 0), [0, -380, 1.02]], [N[0].T, [20, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [20, -390, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 5), [0, -390, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(8, 0), [10, -390, 1.05]], [N[3].T, [30, -390, 1.05]],
  [N[3].S - 0.05, [0, -380, 1], 'lin'], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Una(0) hora(1) de(2) reunión(3) con(4) seis(5) personas(6) son(7) seis(8) horas(9) de(10) trabajo.(11)
// 1: Cuatro(0) reglas(1) para(2) que(3) tus(4) reuniones(5) duren(6) la(7) mitad.(8)
const XS = [-375, -225, -75, 75, 225, 375];
XS.forEach((x, i) => E.figura('p' + i, { t0: 0, t1: w(1, 0) + 0.1, sale: 0.2, x, talla: 270, dir: x < 0 ? 1 : -1, color: 'gris', colorK: [[0, 0], [w(0, 5) + i * 0.08, 0], [w(0, 5) + i * 0.08 + 0.25, 1]], cara: i === 0,
  poses: [[0, 'de_pie'], [w(0, 9), i % 2 ? 'pensar' : 'manos_cabeza'], [wf(0, -1) + 0.2, 'de_pie']] }));
E.obj('relojH', 'relojAm', { t0: 0, t1: w(1, 0), sale: 0.2, x: 0, y: -400, r: 72, texto: '', p: [[0, 0], [w(0, 1), 1, 'inout']], s: [[0, 1], [w(0, 8), 1], [w(0, 8) + 0.3, 1.15, 'back']], caja: [-72, -72, 144, 144] });
E.obj('horasH', 'contador', { t0: 0, t1: w(1, 0), sale: 0.2, x: 0, y: -402, v: [[0, 1], [w(0, 8), 1], [wf(0, -1), 6, 'inout']], suf: ' h', size: 44, col: '#2d2711', miles: false, inspeccion: false });
E.temblor(wf(0, -1), 14, 0.45); E.golpe(wf(0, -1), 0.05); E.destello(wf(0, -1), 0.15);
// «Cuatro reglas»: cuatro monedas; «duren la mitad»: el reloj de 60 min baja a 30 con chispas
[0, 1, 2, 3].forEach(i => { const a = w(1, 0) + i * 0.12; E.obj('regla' + i, 'moneda', { t0: a, t1: N[0].T - 0.05, sale: 0.2, x: -135 + i * 90, y: -560, r: 30, n: i + 1, pop: true, sfx: i === 0, inspeccion: false}); });
E.figura('yo', { t0: w(1, 0), t1: fin(0), x: -340, cara: true, poses: [[0, 'de_pie'], [w(1, 6), 'senalar'], [w(1, 8), 'celebrar']], sonrisa: [[0, 0], [w(1, 8), 1.4]] });
E.obj('mitad', 'temporizador', { t0: w(1, 0), t1: fin(0), x: 130, y: -300, r: 110, texto: '', sub: '', sobrevive: true,
  p: [[w(1, 0), 1], [w(1, 6), 1], [w(1, 8), 0.5, 'inout']], barrido: [w(1, 8)], caja: [-125, -125, 250, 250] });
E.obj('minH', 'contador', { t0: w(1, 0) + 0.1, t1: fin(0), x: 130, y: -305, v: [[w(1, 6), 60], [w(1, 8), 30, 'inout']], suf: ' min', size: 50, col: 'txt', miles: false, inspeccion: false });
E.obj('chH', 'chispas', { t0: w(1, 8), t1: w(1, 8) + 0.8, x: 130, y: -300, r0: 120, r1: 220, n: 16, inspeccion: false });

// ---------- 1 · el orden del día, por escrito y el día antes ----------
// 2: La(0) primera:(1) manda(2) el(3) orden(4) del(5) día(6) por(7) escrito(8) el(9) día(10) antes.(11)
// 3: Así(0) cada(1) uno(2) llega(3) sabiendo(4) de(5) qué(6) se(7) va(8) a(9) hablar.(10)
// 4: Y(0) nadie(1) pierde(2) los(3) diez(4) primeros(5) minutos(6) preguntándose(7) qué(8) hace(9) ahí.(10)
E.numero(1, N[0].T, N[0].S, { desde: 'mitad', hacia: 'orden' });
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -360, cara: true, poses: [[0, 'de_pie'], [w(2, 2), 'escribir'], [wf(2, -1), 'ofrecer'], [w(3, 0), 'senalar'], [w(4, 1), 'celebrar']],
  sonrisa: [[0, 0.2], [w(4, 1), 1.4]] });
E.obj('orden', 'lista', { t0: N[0].S - 0.1, t1: fin(1), x: 80, y: -380, n: 3, w: 340, gap: 70, sobrevive: true, r: 110,
  p: [[w(2, 4), 0], [wf(2, 8), 3, 'inout']], brillo: [[w(3, 4), 0], [wf(3, -1), 3]], barrido: [wf(2, -1)], caja: [-170, -105, 340, 210] });
E.obj('rotOrden', 'rotulo', { t0: w(2, 3), t1: fin(1), x: 80, y: -515, texto: [[0, 'ORDEN DEL DÍA'], [w(2, 9), 'ENVIADO EL DÍA ANTES']], size: 26, pop: true, caja: [-170, -16, 340, 32] });
E.obj('sobre1', 'pieza', { t0: wf(2, -1), t1: w(3, 3), sale: 0.15, r: 26, texto: '✉', libre: true, estela: 5, inspeccion: false, sfx: false,
  x: [[wf(2, -1), 80], [w(3, 3), 380, 'inout']], y: [[wf(2, -1), -380], [w(3, 0), -560], [w(3, 3), -260, 'in']] });
// «diez primeros minutos»: los minutos perdidos bajan de 10 a 0
E.obj('perdidos', 'contador', { t0: w(4, 2) - 0.1, t1: fin(1), x: 80, y: -170, v: [[w(4, 4), 10], [wf(4, -1), 0, 'inout']], suf: ' min perdidos', size: 46, col: 'txt', miles: false, pop: true, caja: [-200, -28, 400, 56] });
E.obj('ch1', 'chispas', { t0: wf(4, -1), t1: wf(4, -1) + 0.8, x: 80, y: -380, r0: 150, r1: 250, inspeccion: false });
E.golpe(wf(4, -1), 0.04);

// ---------- 2 · empieza por lo que hay que decidir ----------
// 5: La(0) segunda:(1) empieza(2) por(3) lo(4) que(5) hay(6) que(7) decidir.(8)
// 6: Lo(0) importante(1) va(2) al(3) principio,(4) cuando(5) la(6) gente(7) todavía(8) está(9) atenta.(10)
E.numero(2, N[1].T, N[1].S, { desde: 'orden', hacia: 'decidir' });
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -360, cara: true, poses: [[0, 'de_pie'], [w(5, 2), 'senalar'], [w(6, 0), 'levantar'], [w(6, 5), 'senalar'], [wf(6, -1), 'celebrar']],
  sonrisa: [[0, 0.2], [wf(6, -1), 1.3]] });
// la lista de puntos se reordena: «DECIDIR» sube al primer renglón y se ilumina
E.obj('decidir', 'lista', { t0: N[1].S - 0.1, t1: fin(2), x: 80, y: -420, n: 4, w: 340, gap: 62, sobrevive: true, r: 110,
  p: [[w(5, 8), 0], [wf(5, -1) + 0.3, 1, 'out']], brillo: [[w(6, 0), 0], [w(6, 4), 1]], barrido: [wf(5, -1)], caja: [-170, -125, 340, 250] });
E.obj('decTag', 'pieza', { t0: w(5, 6), t1: fin(2), r: 30, texto: '!', estela: 4, libre: true, inspeccion: false,
  x: 300, y: [[w(5, 6), -330], [wf(5, -1), -513, 'back']] });
// la atención de la sala: llena al principio y se va vaciando
E.obj('atencion', 'relleno', { t0: w(6, 0) - 0.1, t1: fin(2), x: 40, y: -160, w: 420, h: 54, pct: true, r: 70, rotulo: 'ATENCIÓN',
  f: [[w(6, 0), 0], [w(6, 4), 1, 'out'], [w(6, 6), 1], [wf(6, -1) + 0.4, 0.35, 'inout']], caja: [-210, -70, 560, 110] });
E.sfx(w(6, 0), 'fill');
E.obj('ch2', 'chispas', { t0: w(6, 4), t1: w(6, 4) + 0.8, x: 80, y: -513, r0: 60, r1: 160, inspeccion: false });

// ---------- 3 · cada punto, con un responsable y una fecha ----------
// 7: La(0) tercera:(1) cada(2) punto(3) sale(4) con(5) un(6) responsable(7) y(8) una(9) fecha.(10)  [bocadillo: Me encargo yo. Para el viernes.]
// 8: Un(0) punto(1) sin(2) nombre(3) no(4) lo(5) hace(6) nadie.(7)
E.numero(3, N[2].T, N[2].S, { desde: 'decidir', hacia: 'semana' });
E.figura('yo3', { t0: N[2].S - 0.1, t1: fin(3), x: -350, cara: true, poses: [[0, 'de_pie'], [w(7, 3), 'senalar'], [w(8, 0), 'pensar'], [wf(8, -1), 'encoger']] });
E.figura('comp3', { t0: N[2].S - 0.1, t1: fin(3), x: 350, dir: -1, color: 'gris', colorK: [[0, 0], [w(7, 7), 0], [w(7, 7) + 0.3, 1]], cara: true, poses: [[0, 'de_pie'], [w(7, 6), 'levantar'], [w(7, 9), 'ofrecer']],
  sonrisa: [[w(7, 7), 0], [w(7, 9), 1.2]] });
E.obj('enc', 'bocadillo', { t0: w(7, 6), t1: w(8, 0) + 0.2, sale: 0.15, x: 40, y: -480, w: 390, h: 84, texto: 'Me encargo yo. Para el viernes.', size: 27, pop: true,
  on: [[w(7, 6), 0], [w(7, 7), 1]], caja: [-195, -42, 390, 110] });
E.obj('semana', 'dias', { t0: N[2].S - 0.1, t1: fin(3), x: 0, y: -330, gap: 76, luz: [[0, -1], [w(7, 9), -1], [w(7, 10), 4]], sobrevive: true, r: 80, caja: [-270, -40, 540, 80] });
E.obj('chV', 'chispas', { t0: w(7, 10), t1: w(7, 10) + 0.8, x: 76, y: -330, r0: 40, r1: 120, inspeccion: false });
// «Un punto sin nombre no lo hace nadie»: tres tareas; dos con nombre se marcan, la tercera queda vacía y se apaga
E.obj('tareas3', 'lista', { t0: w(8, 0) - 0.1, t1: fin(3), x: 0, y: -170, n: 3, w: 320, gap: 56, p: [[w(8, 0), 0], [w(8, 3), 2, 'inout']], brillo: 2, caja: [-160, -84, 320, 168] });
E.obj('sinNombre', 'pieza', { t0: w(8, 4), t1: fin(3), r: 22, texto: '✗', on: 0, pop: true, libre: true, inspeccion: false, x: 210, y: -114 });
E.obj('cuenta3', 'contador', { t0: w(8, 0), t1: fin(3), x: 260, y: -226, v: [[w(8, 0), 0], [w(8, 3), 2, 'inout']], suf: ' / 3', size: 40, col: 'txt', miles: false, sfx: false, inspeccion: false });
E.golpe(w(8, 6), 0.03);

// ---------- 4 · convócala para media hora ----------
// 9: La(0) cuarta:(1) convócala(2) para(3) media(4) hora,(5) no(6) para(7) una.(8)
// 10: Si(0) se(1) acaba(2) el(3) tiempo,(4) lo(5) que(6) falte(7) va(8) por(9) correo.(10)
E.numero(4, N[3].T, N[3].S, { desde: 'semana', hacia: 'reloj4' });
E.figura('yo4', { t0: N[3].S - 0.1, t1: TC, x: -360, cara: true, poses: [[0, 'de_pie'], [w(9, 2), 'senalar'], [w(10, 0), 'pensar'], [w(10, 5), 'ofrecer'], [wf(10, -1), 'celebrar']],
  sonrisa: [[0, 0.3], [wf(10, -1), 1.4]] });
E.obj('reloj4', 'temporizador', { t0: N[3].S - 0.1, t1: TC, x: 120, y: -330, r: 120, texto: '', sub: '', sobrevive: true,
  p: [[w(9, 2), 1], [w(9, 4), 0.5, 'inout'], [w(10, 0), 0], [wf(10, 4), 1, 'lin']], hecho: [[wf(10, 4), 0], [wf(10, 4) + 0.25, 1]], barrido: [w(9, 5)], caja: [-135, -135, 270, 270] });
E.obj('min4', 'contador', { t0: N[3].S, t1: wf(10, 4), sale: 0.15, x: 120, y: -335, v: [[w(9, 2), 60], [w(9, 5), 30, 'inout'], [w(10, 0), 30], [wf(10, 4), 0, 'lin']], suf: ' min', size: 54, col: 'txt', miles: false, inspeccion: false });
E.obj('correo4', 'pieza', { t0: w(10, 5), t1: TC, sale: 0.15, r: 30, texto: '✉', libre: true, estela: 6, inspeccion: false,
  x: [[w(10, 5), 120], [wf(10, -1), 380, 'inout']], y: [[w(10, 5), -330], [w(10, 8), -560], [wf(10, -1), -520]] });
E.obj('ch4', 'chispas', { t0: wf(10, 4), t1: wf(10, 4) + 0.8, x: 120, y: -330, r0: 130, r1: 230, inspeccion: false });
E.golpe(w(9, 5), 0.04); E.golpe(wf(10, 4), 0.04);

// ---------- cierre: resumen de las cuatro y envío ----------
// 11: Una(0) buena(1) reunión(2) no(3) es(4) la(5) que(6) dura(7) mucho,(8) es(9) la(10) que(11) decide(12) algo.(13)
// 12: Mándaselo(0) a(1) ese(2) compañero(3) que(4) convoca(5) una(6) reunión(7) para(8) todo.(9)
E.obj('resumen', 'resumen', { t0: TC, t1: w(12, 0), capa: 'pantalla', x: 540, y: 960, items: ['Orden del día', 'Decide antes', 'Responsable', '30 min'], gap: 210,
  p: [[TC, 0], [TC + 1.0, 4, 'lin']], caja: [-440, -60, 880, 300] });
E.obj('rayosF', 'rayos', { t0: w(11, 9), t1: w(12, 0), capa: 'pantalla', x: 540, y: 960, r: 420, z: -2, p: [[w(11, 9), 0], [w(11, 12), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('confF', 'confeti', { t0: w(11, 12), t1: w(11, 12) + 2.0, capa: 'pantalla', x: 540, y: 880, n: 44, inspeccion: false, sinDim: true });
E.destello(w(11, 12), 0.15);
E.figura('yoF', { t0: w(12, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(12, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(12, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, vuelo: [[wf(12, -1), 0], [wf(12, -1) + 0.5, 1, 'in']] });
