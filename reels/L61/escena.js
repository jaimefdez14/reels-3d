// L61 · Los rendimientos decrecientes (estilo B; reglas 15, 20, 21, 24)
// Idea visual: dos montones de monedas (lo que rinde la semana) casi iguales sobre «70 HORAS» y «55 HORAS»; luego una fila
// de columnas de monedas, una por hora, que a partir de cierto punto se van quedando más bajas. Tres reglas: el sol de la
// mañana llena «tus mejores horas» mientras el correo se aparta; un reloj que se llena hasta la puerta de salida; una
// barra de energía que se recarga antes de llegar a «AGOTADO» y, cansado, otra que tarda el doble.
// Contador que suma: 70 y 55 horas en el gancho y el año 2014. Algo que se rellena por punto: barra de mejores horas,
// reloj hasta la hora de salida, barra de energía y barra del doble.
// Regla 20: «Yo no salgo antes de las diez.» va en bocadillo del muñeco durante el gancho; la voz solo narra.
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
  [0, [0, -380, 1.04]], [w(0, 6), [10, -385, 1.06]], [w(0, 12), [-15, -390, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 8), [10, -385, 1.04]],
  [w(1, 17), [-10, -390, 1.06]], [w(2, 0), [0, -380, 1.02]], [w(2, 10), [10, -385, 1.04]], [w(3, 0), [0, -385, 1.03]], [N[0].T, [10, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(5, 0), [15, -385, 1.04]], [w(5, 6), [-10, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(7, 0), [-15, -385, 1.04]], [w(7, 6), [15, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(9, 0), [-10, -385, 1.04]], [w(9, 6), [10, -385, 1.05]], [TC - 0.1, [0, -385, 1.04]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Trabajar(0) 70(1) horas(2) a(3) la(4) semana(5) rinde(6) casi(7) lo(8) mismo(9) que(10) trabajar(11) 55(12)   [bocadillo «Yo no salgo antes de las diez.»]
// el muñeco echa horas: el contador rueda a 70 y el montón de lo que rinde crece; con «55» crece otro montón casi igual
E.figura('yo', { t0: 0, t1: fin(0), x: -345, cara: true,
  poses: [[0, 'coger'], [w(0, 6), 'levantar'], [w(0, 9), 'encoger'], [w(0, 12), 'manos_cabeza'],
    [w(1, 0), 'de_pie'], [w(1, 1), 'senalar'], [w(1, 8), 'pensar'], [w(1, 16), 'senalar'],
    [w(2, 0), 'de_pie'], [w(2, 2), 'senalar'], [w(2, 12), 'encoger'], [w(2, 16), 'triste'],
    [w(3, 0), 'senalar'], [w(3, 3), 'celebrar']],
  sonrisa: [[0, 0.3], [w(0, 6), 0.8], [w(0, 9), -0.4], [w(0, 12), -1.3], [w(1, 0), 0.2], [w(1, 1), 0.6], [w(2, 2), 0.6], [w(2, 12), -0.2], [w(2, 16), -1],
    [w(3, 0), 0.4], [w(3, 3), 1.5]] });
E.obj('bocaH', 'bocadillo', { t0: 0.25, t1: w(0, 12) + 0.2, sale: 0.2, x: 40, y: -478, w: 470, h: 76, texto: 'Yo no salgo antes de las diez.', size: 28, pop: true,
  on: [[0.25, 0], [0.6, 1]], caja: [-235, -38, 470, 102] });
E.obj('h70', 'contador', { t0: 0, t1: w(1, 0), sale: 0.25, x: 120, y: -290, size: 46, suf: ' HORAS', miles: false, col: 'txt',
  v: [[0, 0], [w(0, 2), 70, 'out']], barrido: [w(0, 2)], caja: [-105, -28, 210, 56] });
E.obj('p70', 'pila', { t0: 0, t1: w(1, 0), sale: 0.25, x: 120, n: 9, w: 130, hh: 24, refl: true,
  k: [[0, 1], [0.3, 1], [w(0, 6) + 0.2, 8, 'out']], caja: [-65, -184, 130, 184] });
E.sfx(0.3, 'fill');
E.obj('h55', 'contador', { t0: w(0, 10), t1: w(1, 0), sale: 0.25, x: 355, y: -290, size: 46, suf: ' HORAS', miles: false, col: 'txt', pop: true,
  v: [[w(0, 11), 0], [w(0, 12) + 0.35, 55, 'out']], barrido: [w(0, 12) + 0.4], caja: [-105, -28, 210, 56] });
E.obj('p55', 'pila', { t0: w(0, 10), t1: w(1, 0), sale: 0.25, x: 355, n: 9, w: 130, hh: 24, refl: true,
  k: [[w(0, 10), 0], [wf(0, -1), 7.5, 'out']], caja: [-65, -184, 130, 184] });
E.sfx(w(0, 10), 'fill');
E.obj('casi', 'rotulo', { t0: w(0, 7) - 0.05, t1: w(1, 0), sale: 0.2, x: 238, y: -375, texto: 'CASI LO MISMO', size: 28, col: AM, pop: true, caja: [-130, -16, 260, 32] });
E.obj('chH', 'chispas', { t0: w(0, 9), t1: w(0, 9) + 0.8, x: 238, y: -375, r0: 90, r1: 190, inspeccion: false });
E.golpe(w(0, 9), 0.05); E.destello(w(0, 9), 0.15);
E.temblor(w(0, 12) + 0.35, 12, 0.4);

// 1: Lo(0) calculó(1) en(2) 2014(3) un(4) economista(5) de(6) Stanford(7) con(8) datos(9) de(10) fábricas(11) de(12) munición(13) de(14) la(15) Primera(16) Guerra(17) Mundial(18)
E.obj('anio', 'contador', { t0: w(1, 0), t1: w(2, 0), sale: 0.2, x: 150, y: -440, size: 110, miles: false, pop: true,
  v: [[w(1, 1), 0], [w(1, 3) + 0.45, 2014, 'out']], barrido: [w(1, 3) + 0.5], caja: [-150, -60, 300, 120] });
E.obj('chAnio', 'chispas', { t0: w(1, 3) + 0.45, t1: w(1, 3) + 1.25, x: 150, y: -440, r0: 140, r1: 240, inspeccion: false });
E.golpe(w(1, 3) + 0.45, 0.04);
E.obj('rotSt', 'rotulo', { t0: w(1, 7) - 0.1, t1: w(2, 0), sale: 0.2, x: 150, y: -345, texto: 'STANFORD', size: 32, col: GRIS, pop: true, caja: [-100, -18, 200, 36] });
E.obj('datos', 'papeles', { t0: w(1, 8) - 0.1, t1: w(2, 0), sale: 0.2, x: 150, y: -14, n: 6, k: [[w(1, 8), 0], [w(1, 13) + 0.2, 6, 'lin']], caja: [-95, -110, 190, 125] });
E.sfx(w(1, 8), 'fill');
E.obj('rotGM', 'rotulo', { t0: w(1, 16) - 0.1, t1: w(2, 0), sale: 0.2, x: 150, y: -265, texto: 'PRIMERA GUERRA MUNDIAL', size: 26, col: AM, pop: true, caja: [-200, -16, 400, 32] });

// 2: Se(0) llama(1) ley(2) de(3) los(4) rendimientos(5) decrecientes(6) a(7) partir(8) de(9) cierto(10) punto(11) cada(12) hora(13) de(14) más(15) rinde(16) menos(17)
// una columna de monedas por hora: las tres primeras iguales; a partir de cierto punto, cada una más baja
E.obj('rotLey', 'rotulo', { t0: w(2, 0), t1: w(3, 0), sale: 0.2, x: 120, y: -470, texto: 'RENDIMIENTOS DECRECIENTES', size: 30, col: AM, peso: 700, pop: true, caja: [-265, -18, 530, 36] });
E.obj('chLey', 'chispas', { t0: w(2, 6), t1: w(2, 6) + 0.8, x: 120, y: -470, r0: 140, r1: 260, inspeccion: false });
E.golpe(w(2, 6), 0.04);
const CX = i => -125 + i * 88;
const KC = [6, 6, 6, 4.2, 2.8, 1.8, 1];
const TCOL = [w(2, 3), w(2, 4) + 0.1, w(2, 6), w(2, 12), w(2, 13), w(2, 15), w(2, 16)];
KC.forEach((k, i) => { const a = TCOL[i];
  E.obj('col' + i, 'pila', { t0: a - 0.1, t1: w(3, 0), sale: 0.2, x: CX(i), n: 6, w: 70, hh: 22, refl: true, pop: true, luz: i < 3 ? 1 : 0.75,
    k: [[a, 0], [a + 0.35, k, 'out']], caja: [-35, -110, 70, 110] });
  E.sfx(a, 'pop'); });
E.obj('flechaP', 'flecha', { t0: w(2, 10) - 0.05, t1: w(3, 0), sale: 0.2, x: 0, y: 0, de: [168, -285], hasta: [168, -150], curva: 0, discontinua: true, col: '#c9ccca', w: 4,
  p: [[w(2, 10), 0], [w(2, 11) + 0.2, 1, 'out']], caja: [148, -290, 40, 145] });
E.obj('rotPunto', 'rotulo', { t0: w(2, 10) - 0.1, t1: w(3, 0), sale: 0.2, x: 168, y: -315, texto: 'CIERTO PUNTO', size: 24, col: '#c9ccca', pop: true, caja: [-100, -14, 200, 28] });
E.obj('rotMenos', 'rotulo', { t0: w(2, 16) - 0.05, t1: w(3, 0), sale: 0.2, x: 355, y: -205, texto: 'RINDE MENOS', size: 24, col: ROJO, pop: true, caja: [-95, -14, 190, 28] });
E.temblor(w(2, 17), 10, 0.35);

// 3: Tres(0) reglas(1) para(2) echar(3) menos(4) horas(5)
// tres monedas para las reglas y el reloj de la jornada que se recorta
E.obj('relojR', 'relojAm', { t0: w(3, 0) - 0.1, t1: fin(0), sale: 0.2, sobrevive: true, x: 150, y: -280, r: 100, texto: '', pop: true,
  p: [[w(3, 0), 0.95], [w(3, 3), 0.95], [wf(3, -1), 0.6, 'inout']], s: [[0, 1], [wf(3, -1), 1], [wf(3, -1) + 0.3, 1.12, 'back']], caja: [-100, -100, 200, 200] });
E.sfx(w(3, 3), 'fill');
[0, 1, 2].forEach(i => { const a = w(3, 0) + i * 0.13;
  E.obj('q' + (i + 1), 'moneda', { t0: a, t1: N[0].T - 0.05, sale: 0.2, x: 50 + i * 100, y: -470, r: 30, n: '', pop: true, sfx: i === 0, caja: [-30, -30, 60, 60] }); });
E.obj('chR', 'chispas', { t0: wf(3, -1), t1: wf(3, -1) + 0.8, x: 150, y: -280, r0: 110, r1: 200, inspeccion: false });
E.destello(wf(3, -1), 0.12);

// ---------- 1 · lo difícil, en tus mejores horas ----------
// 4: La(0) primera(1) lo(2) difícil(3) en(4) tus(5) mejores(6) horas(7)
// 5: Si(0) rindes(1) más(2) por(3) la(4) mañana(5) no(6) la(7) gastes(8) en(9) el(10) correo(11)
E.numero(1, N[0].T, N[0].S, { desde: 'relojR', hacia: 'mejores' });
E.figura('yoP1', { t0: N[0].S - 0.1, t1: fin(1), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(4, 2), 'coger'], [w(4, 4), 'levantar'], [w(4, 6), 'celebrar'], [w(5, 0), 'senalar'], [w(5, 3), 'ofrecer'], [w(5, 6), 'apartarse'], [wf(5, -1), 'senalar']],
  sonrisa: [[0, 0.2], [w(4, 2), 0.4], [w(4, 6), 1.4], [w(5, 0), 0.8], [w(5, 6), -0.3], [wf(5, -1), 0.8]] });
E.obj('dificil', 'rotulo', { t0: w(4, 2) - 0.1, t1: fin(1), x: 100, y: -470, texto: 'LO DIFÍCIL', size: 34, col: AM, peso: 700, pop: true, caja: [-110, -20, 220, 40] });
E.obj('mejores', 'relleno', { t0: N[0].S - 0.1, t1: fin(1), x: 100, y: -370, w: 340, h: 44, pop: true, r: 50,
  rotulo: [[0, 'TUS MEJORES HORAS'], [w(5, 3), 'LA MAÑANA']], f: [[w(4, 5), 0], [wf(4, -1) + 0.2, 1, 'out']], barrido: [w(5, 5)], caja: [-170, -56, 340, 78] });
E.sfx(w(4, 5), 'fill');
E.obj('ch1', 'chispas', { t0: wf(4, -1) + 0.2, t1: wf(4, -1) + 1.0, x: 100, y: -370, r0: 100, r1: 200, inspeccion: false });
E.golpe(wf(4, -1) + 0.2, 0.04);
// «por la mañana»: sale el sol; «no la gastes en el correo»: el móvil vibra, el muñeco lo aparta y se apaga
E.obj('rayos1', 'rayos', { t0: w(5, 3), t1: fin(1), x: 370, y: -200, r: 150, p: [[w(5, 3), 0], [w(5, 5) + 0.3, 1, 'out']], inspeccion: false });
E.obj('sol', 'bola', { t0: w(5, 3) - 0.1, t1: fin(1), sobrevive: true, x: 370, y: [[w(5, 3), -60], [w(5, 5) + 0.3, -200, 'out']], r: 55, pop: true, caja: [-55, -55, 110, 110] });
E.obj('movil', 'telefono', { t0: w(5, 6) - 0.1, t1: fin(1), sale: 0.2, x: [[0, 110], [w(5, 8), 110], [w(5, 10) + 0.3, 150, 'out']], y: -150, w: 130, h: 220, pop: true,
  vibra: [[w(5, 6), 1], [w(5, 9), 1], [w(5, 10), 0]], brillo: [[0, 1], [w(5, 10), 1], [wf(5, -1), 0.2]], luz: [[0, 1], [w(5, 10), 1], [wf(5, -1), 0.5]], caja: [-65, -110, 130, 220] });
E.obj('correo', 'rotulo', { t0: w(5, 10) - 0.1, t1: fin(1), x: 150, y: -282, texto: 'EL CORREO', size: 24, col: ROJO, pop: true, caja: [-80, -14, 160, 28] });
E.sfx(w(5, 6), 'thud');

// ---------- 2 · ponle hora de salida al día ----------
// 6: La(0) segunda(1) ponle(2) hora(3) de(4) salida(5) al(6) día(7)
// 7: Cuando(0) sabes(1) a(2) qué(3) hora(4) acabas(5) pierdes(6) menos(7) tiempo(8) por(9) el(10) camino(11)
E.numero(2, N[1].T, N[1].S, { desde: 'sol', hacia: 'reloj2' });
E.figura('yoP2', { t0: N[1].S - 0.1, t1: fin(2), x: [[0, -355], [w(7, 9), -355], [wf(7, -1) + 0.3, 175, 'inout']], cara: true,
  poses: [[0, 'de_pie'], [w(6, 2), 'senalar'], [w(6, 6), 'ofrecer'], [w(7, 0), 'pensar'], [w(7, 5), 'celebrar'], [w(7, 9), 'andar'], [wf(7, -1) + 0.3, 'celebrar']],
  sonrisa: [[0, 0.2], [w(6, 2), 0.6], [w(7, 0), 0.4], [w(7, 5), 1.4], [w(7, 9), 1], [wf(7, -1) + 0.3, 1.5]] });
E.obj('reloj2', 'temporizador', { t0: N[1].S - 0.1, t1: fin(2), x: 365, y: -455, r: 50, texto: '', sub: '', sobrevive: true, pop: true,
  p: [[w(6, 3), 0], [wf(7, -1), 1, 'lin']], hecho: [[wf(7, -1), 0], [wf(7, -1) + 0.3, 1]], barrido: [wf(7, -1) + 0.3], caja: [-66, -66, 132, 132] });
E.sfx(w(6, 3), 'fill');
E.obj('rotSal', 'rotulo', { t0: w(6, 3) - 0.1, t1: fin(2), x: 365, y: -350, texto: 'HORA DE SALIDA', size: 24, col: AM, pop: true, caja: [-120, -14, 240, 28] });
E.obj('puerta2', 'puerta', { t0: N[1].S, t1: fin(2), x: 365, w: 170, h: 300, pop: true, refl: true, p: [[w(7, 5), 0], [w(7, 6) + 0.3, 0.6, 'out']], caja: [-85, -300, 170, 300] });
E.obj('pulsoP', 'pulso', { t0: w(7, 5) + 0.3, t1: w(7, 5) + 0.9, x: 365, y: -150, r0: 40, r1: 140, inspeccion: false });
// «pierdes menos tiempo»: el lío del camino se deshace antes de que el muñeco eche a andar
E.obj('lio2', 'maraña', { t0: w(6, 6), t1: w(7, 9), sale: 0.2, x: 40, y: -300, r: 60, p: [[w(6, 6), 0], [w(7, 0), 1, 'out'], [w(7, 6), 1], [w(7, 8) + 0.2, 0, 'inout']],
  rot: [[w(6, 6), 0], [w(7, 9), 1, 'lin']], caja: [-78, -44, 156, 88] });
E.obj('rotTiempo', 'rotulo', { t0: w(7, 6) - 0.1, t1: w(7, 9), sale: 0.2, x: 40, y: -390, texto: 'MENOS TIEMPO', size: 24, col: '#c9ccca', pop: true, caja: [-100, -14, 200, 28] });
E.obj('ch2', 'chispas', { t0: wf(7, -1) + 0.3, t1: wf(7, -1) + 1.1, x: 365, y: -455, r0: 70, r1: 150, inspeccion: false });
E.golpe(wf(7, -1) + 0.3, 0.04); E.destello(wf(7, -1) + 0.3, 0.1);

// ---------- 3 · descansa antes de estar agotado ----------
// 8: La(0) tercera(1) descansa(2) antes(3) de(4) estar(5) agotado(6)
// 9: Cansado(0) tardas(1) el(2) doble(3) y(4) después(5) te(6) toca(7) corregir(8) lo(9) que(10) has(11) hecho(12)
E.numero(3, N[2].T, N[2].S, { desde: 'reloj2', hacia: 'energia' });
E.figura('yoP3', { t0: N[2].S - 0.1, t1: TC, x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(8, 2), 'levantar'], [wf(8, -1), 'celebrar'], [w(9, 0), 'triste'], [w(9, 1), 'coger'], [w(9, 5), 'manos_cabeza'], [w(9, 8), 'coger']],
  sonrisa: [[0, 0.2], [w(8, 2), 1], [wf(8, -1), 1.5], [w(9, 0), -0.8], [w(9, 5), -1.3], [w(9, 8), -0.6]] });
E.obj('energia', 'barra', { t0: N[2].S - 0.1, t1: TC, x: 80, y: -420, w: 400, h: 44, pop: true, marca: 0.15, rotMarca: 'AGOTADO', r: 50,
  f: [[N[2].S, 0.9], [w(8, 2), 0.4, 'inout'], [w(8, 3), 0.4], [wf(8, -1), 1, 'out'], [w(9, 0), 1], [w(9, 0) + 0.5, 0.2, 'inout']],
  barrido: [wf(8, -1)], caja: [-200, -100, 400, 122] });
E.sfx(w(8, 3), 'fill');
E.obj('ch3', 'chispas', { t0: wf(8, -1), t1: wf(8, -1) + 0.8, x: 80, y: -420, r0: 100, r1: 220, inspeccion: false });
E.golpe(wf(8, -1), 0.04); E.destello(wf(8, -1), 0.1);
// «Cansado, tardas el doble»: una barra que tarda el doble en llenarse que su marca
E.obj('rotCans', 'rotulo', { t0: w(9, 0) - 0.1, t1: TC, x: 80, y: -347, texto: 'CANSADO', size: 24, col: '#c9ccca', pop: true, caja: [-70, -14, 140, 28] });
E.obj('doble', 'barra', { t0: w(9, 0), t1: TC, x: 80, y: -275, w: 400, h: 44, pop: true, marca: 0.5, r: 50,
  f: [[w(9, 1), 0], [w(9, 3) + 0.5, 1, 'lin']], caja: [-200, -48, 400, 96] });
E.sfx(w(9, 1), 'fill');
E.obj('rotDoble', 'rotulo', { t0: w(9, 3) - 0.1, t1: TC, x: 80, y: -205, texto: 'EL DOBLE', size: 26, col: AM, pop: true, caja: [-75, -15, 150, 30] });
E.obj('ch3b', 'chispas', { t0: w(9, 3) + 0.5, t1: w(9, 3) + 1.2, x: 280, y: -275, r0: 40, r1: 110, inspeccion: false });
// «y después te toca corregir lo que has hecho»: las casillas hechas se desmarcan
E.obj('hecho', 'lista', { t0: w(9, 4) - 0.1, t1: TC, x: 80, y: -85, n: 3, w: 280, gap: 50, pop: true,
  p: [[w(9, 4), 0], [w(9, 6), 3, 'lin'], [w(9, 8), 3], [wf(9, -1), 0, 'lin']], caja: [-140, -68, 280, 136] });
E.temblor(w(9, 8), 10, 0.35);

// ---------- cierre: resumen y envío ----------
// 10: Echar(0) más(1) horas(2) no(3) es(4) lo(5) mismo(6) que(7) hacer(8) más(9) trabajo(10)
// 11: Mándaselo(0) a(1) ese(2) compañero(3) que(4) siempre(5) es(6) el(7) último(8) en(9) irse(10)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(10, 6), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, items: ['Mejores horas', 'Hora de salida', 'Descansa'], gap: 290,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(10, 8)], caja: [-430, -60, 860, 200] });
E.obj('confC', 'confeti', { t0: wf(10, -1), t1: wf(10, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(10, -1), 0.22); E.golpe(wf(10, -1), 0.04);
E.figura('yoF', { t0: w(11, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(11, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(11, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(11, 10)], vuelo: [[wf(11, -1), 0], [wf(11, -1) + 0.5, 1, 'in']] });
E.figura('comp', { t0: w(11, 3) - 0.1, t1: D + 1, x: 390, talla: 330, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(11, 8), 'coger']], sonrisa: [[0, 0.3], [w(11, 8), -0.6]] });
