// L29 · La regla del 80/20 con clientes (estilo B; reglas 15, 20, 21, 24)
// Gancho: cinco clientes; uno se enciende y la barra de lo que ganas se llena al 80 %. Punto 1: la lista ordenada por
// facturación. Punto 2: las horas de cada uno (las de los que pagan poco, en rojo) y el bocadillo del cliente.
// Punto 3: precios que suben, un cliente que se va y el reloj del héroe que se vacía (tiempo recuperado).
const w = E.w, wf = E.wf;
const D = TIMING.duration;
const ROJO = '#e4574f', GRIS = '#9a9c9b';
E.config({ fondo: 'degradado', sub: 'dos', subY: 680, polvo: true, gancho: { lineas: [0], escala: 1.25 }, progreso: { n: 3, estilo: 'barras', aparece: w(1, 15), gap: 70 } });

// T = «El primero / segundo / tercero», S = la escena nueva entra con el nombre del punto
const N = [2, 4, 6].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(8, 0) - 0.1; // resumen

E.camara([
  [0, [0, -380, 1]], [w(0, 8), [20, -390, 1.04]], [w(1, 0), [10, -385, 1.05]], [w(1, 9), [30, -390, 1.06]], [N[0].T, [0, -395, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(3, 0), [20, -390, 1.04]], [N[1].T, [10, -390, 1.05]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(5, 0), [0, -385, 1.03]], [w(5, 11), [10, -390, 1.04]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(7, 0), [20, -390, 1.04]], [TC, [0, -395, 1.05]],
]);

// ---------- gancho: cinco clientes; uno (el 20 %) se enciende y llena la barra de LO QUE GANAS hasta el 80 % ----------
// 0: Si(0) eres(1) autónomo,(2) el(3) 20(4) %(5) de(6) tus(7) clientes(8) suele(9) darte(10) el(11) 80(12) %(13) de(14) lo(15) que(16) ganas.(17)
// 1: Es(0) la(1) regla(2) del(3) 80/20,(4) y(5) casi(6) todo(7) tu(8) tiempo(9) se(10) lo(11) llevan(12) los(13) demás.(14) Tres(15) pasos(16) para(17) cambiarlo.(18)
E.figura('yo', { t0: 0, t1: fin(0), x: -360, cara: true,
  poses: [[0, 'pensar'], [w(0, 4), 'senalar'], [w(0, 12), 'ofrecer'], [wf(0, -1), 'celebrar'], [w(1, 5), 'de_pie'], [w(1, 9), 'manos_cabeza'], [w(1, 15), 'de_pie'], [w(1, 16), 'senalar']],
  sonrisa: [[0, 0.3], [w(0, 12), 1], [wf(0, -1), 1.5], [w(1, 6), 0], [w(1, 9), -1.2], [w(1, 15), 0.2], [w(1, 17), 1.2]] });
const CL = ['A', 'B', 'C', 'D', 'E'];
CL.forEach((s, i) => { const a = 0.15 + i * 0.12, x = -110 + i * 115;
  E.obj('cli' + i, 'pieza', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, x, y: -430, r: 40, texto: s, pop: true, sfx: i === 0,
    on: i === 0 ? [[0, 0], [w(0, 4), 0], [w(0, 5), 1, 'out']] : 0,
    luz: i === 0 ? 1 : [[0, 1], [w(0, 4), 1], [w(0, 5), 0.55], [w(1, 9), 0.55], [w(1, 10), 1]],
    s: i === 0 ? [[0, 1], [w(0, 4), 1], [w(0, 5), 1.25, 'back'], [w(0, 8), 1.1]] : 1, caja: [-40, -40, 80, 80] }); });
E.obj('pct20', 'rotulo', { t0: w(0, 4) - 0.05, t1: w(1, 3), sale: 0.2, x: -110, y: -515, texto: '20 %', size: 34, col: '#e6ce46', pop: true, caja: [-50, -20, 100, 40] });
E.obj('fl0', 'flecha', { t0: w(0, 9), t1: w(1, 15), sale: 0.2, de: [-110, -380], hasta: [-60, -235], curva: 0.2, discontinua: true, p: [[w(0, 9), 0], [w(0, 11), 1, 'out']], inspeccion: false });
E.obj('gana0', 'relleno', { t0: w(0, 8), t1: fin(0), x: 110, y: -180, w: 380, h: 50, rotulo: 'LO QUE GANAS', pct: true, pop: true,
  f: [[w(0, 10), 0], [wf(0, -1), 0.8, 'inout']], barrido: [wf(0, -1)], caja: [-190, -60, 520, 90] });
E.obj('ch0', 'chispas', { t0: wf(0, -1), t1: wf(0, -1) + 0.8, x: 240, y: -180, r0: 60, r1: 150, inspeccion: false });
E.sfx(w(0, 10), 'fill');
E.obj('regla', 'rotulo', { t0: w(1, 2), t1: w(1, 5) + 0.1, sale: 0.2, x: 120, y: -305, texto: '80/20', size: 64, col: '#e6ce46', peso: 700, pop: true, caja: [-110, -36, 220, 72] });
// «casi todo tu tiempo se lo llevan los demás»: las horas de los otros cuatro suben en rojo
E.obj('horas0', 'contador', { t0: w(1, 6), t1: N[0].T - 0.05, sale: 0.2, x: 235, y: -315, v: [[w(1, 7), 0], [wf(1, 14), 40, 'inout']], suf: ' h a la semana', size: 36, col: ROJO, miles: false, pop: true, caja: [-170, -24, 340, 48] });
E.obj('br0', 'flecha', { t0: w(1, 6), t1: N[0].T - 0.05, sale: 0.2, de: [-30, -368], hasta: [400, -368], curva: 0, col: ROJO, w: 4, discontinua: true, punta: false, p: [[w(1, 6), 0], [w(1, 9), 1, 'out']], inspeccion: false });
E.temblor(w(1, 12), 10, 0.4);
// «Tres pasos»: tres monedas; la primera se queda y abre el primer punto
[0, 1, 2].forEach(i => { const a = w(1, 15) + i * 0.12;
  E.obj('paso' + i, 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: 120 + (i - 1) * 110, y: -540, r: 38, n: i + 1, pop: true, sfx: i === 0, inspeccion: false,
    s: i === 0 ? [[0, 1], [w(1, 17), 1], [w(1, 17) + 0.35, 1.3, 'back']] : 1, barrido: i === 0 ? [w(1, 18)] : null }); });
E.obj('rayosH', 'rayos', { t0: w(1, 15), t1: fin(0), x: 10, y: -540, r: 300, z: -2, p: [[w(1, 15), 0], [w(1, 17), 0.8, 'out']], inspeccion: false });

// ---------- 1 · ordena a tus clientes por lo que les facturas: las etiquetas caen de mayor a menor ----------
// 2: El(0) primero:(1) ordena(2) a(3) tus(4) clientes(5) por(6) lo(7) que(8) les(9) facturas.(10)
// 3: Verás(0) que(1) unos(2) pocos(3) pagan(4) casi(5) todo.(6)
// orden por facturación: A 4.800, C 2.500, D 600, E 400, B 300 (al mes)
const ORD = [['A', 4800], ['C', 2500], ['D', 600], ['E', 400], ['B', 300]];
const fy = i => -520 + i * 82;
E.numero(1, N[0].T, N[0].S, { desde: 'paso0', hacia: 'f0' });
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -390, cara: true, toca: ['f0'],
  poses: [[0, 'de_pie'], [w(2, 2), 'senalar'], [w(2, 9), 'ofrecer'], [w(3, 0), 'senalar'], [w(3, 4), 'celebrar'], [wf(3, -1) + 0.2, 'de_pie']],
  sonrisa: [[w(2, 2), 0.5], [w(3, 4), 1.4]] });
ORD.forEach(([s, v], i) => { const a = w(2, 2) + i * 0.32, top = i < 2;
  E.obj('l' + i, 'pieza', { t0: a, t1: fin(1), entra: 0.2, x: -170, y: fy(i), r: 28, texto: s, pop: true, sfx: false,
    on: top ? [[0, 0], [w(3, 2), 0], [w(3, 4), 1, 'out']] : 0, luz: top ? 1 : [[0, 1], [w(3, 2), 1], [w(3, 4), 0.45]], caja: [-28, -28, 56, 56] });
  E.obj('f' + i, 'etiqueta', { t0: a, t1: fin(1), entra: 0.2, x: 60, y: fy(i), w: 300, h: 66, pop: true, sobrevive: i === 0, r: 60,
    v: [[a, 0], [a + 0.55, v, 'out']], on: top ? [[0, 0.25], [w(3, 2), 0.25], [w(3, 4), 1, 'out']] : 0.25,
    luz: top ? 1 : [[0, 1], [w(3, 2), 1], [w(3, 4), 0.5]], barrido: top ? [w(3, 5) + i * 0.15] : null, caja: [-150, -33, 300, 66] }); });
E.obj('ordF', 'flecha', { t0: w(2, 6), t1: fin(1), de: [290, -540], hasta: [290, -200], curva: 0, col: '#56605a', w: 4, p: [[w(2, 6), 0], [wf(2, -1), 1, 'out']], inspeccion: false });
E.obj('ordR', 'rotulo', { t0: w(2, 6), t1: w(3, 2), sale: 0.2, x: 400, y: -370, texto: '€ / MES', size: 24, col: GRIS, pop: true, caja: [-60, -15, 120, 30] });
E.obj('pocos', 'relleno', { t0: w(3, 2) - 0.1, t1: fin(1), x: 0, y: -60, w: 340, h: 46, rotulo: 'A + C', pct: true, pop: true, sobrevive: true, r: 50,
  f: [[w(3, 4), 0], [wf(3, -1), 0.85, 'inout']], barrido: [wf(3, -1)], caja: [-170, -58, 480, 85] });
E.obj('cor1', 'flecha', { t0: w(3, 2), t1: fin(1), de: [235, -523], hasta: [235, -436], curva: 0.6, w: 4, punta: false, p: [[w(3, 2), 0], [w(3, 4), 1, 'out']], inspeccion: false });
E.obj('ch1', 'chispas', { t0: wf(3, -1), t1: wf(3, -1) + 0.8, x: 100, y: -60, r0: 60, r1: 160, inspeccion: false });
E.golpe(wf(3, -1), 0.04);
E.sfx(w(3, 4), 'fill');

// ---------- 2 · apunta cuánto tiempo te lleva cada uno: barras de horas; las de los que pagan poco, en rojo ----------
// 4: El(0) segundo:(1) apunta(2) cuánto(3) tiempo(4) te(5) lleva(6) cada(7) uno.(8)
// 5: Cuenta(0) los(1) correos,(2) las(3) llamadas(4) y(5) los(6) cambios(7) de(8) última(9) hora.(10) Cruza(11) las(12) dos(13) listas(14) y(15) verás(16) quién(17) paga(18) poco(19) y(20) te(21) quita(22) muchas(23) horas.(24)
//    [bocadillo del cliente «¿Lo podemos cambiar otra vez?»]
const HR = [6, 5, 12, 14, 18];             // horas a la semana de A, C, D, E, B (de 20)
const hy = i => -430 + i * 76;
E.numero(2, N[1].T, N[1].S, { desde: 'pocos', hacia: 'h0' });
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -375, cara: true,
  poses: [[0, 'de_pie'], [w(4, 2), 'senalar'], [w(4, 6), 'pensar'], [w(5, 0), 'de_pie'], [w(5, 7), 'manos_cabeza'], [w(5, 11), 'senalar'], [w(5, 17), 'encoger']],
  sonrisa: [[w(4, 2), 0.3], [w(5, 7), -1.2], [w(5, 11), 0.3], [w(5, 18), -0.6]] });
E.figura('cliente', { t0: N[1].S + 0.3, t1: fin(2), x: 390, dir: -1, color: 'gris', cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'senalar'], [w(5, 7), 'ofrecer'], [w(5, 11), 'de_pie']], sonrisa: 0.6 });
ORD.forEach(([s, v], i) => { const a = N[1].S + 0.1 + i * 0.12, malo = i >= 2, hf = w(4, 3) + i * 0.25;
  E.obj('k' + i, 'pieza', { t0: a, t1: fin(2), entra: 0.2, x: -240, y: hy(i), r: 26, texto: s, pop: true, sfx: false, on: malo ? 0 : 1, caja: [-26, -26, 52, 52] });
  // «Cruza las dos listas»: el euro de cada uno aparece al lado
  E.obj('e' + i, 'contador', { t0: w(5, 11) + i * 0.1, t1: fin(2), x: -148, y: hy(i), v: [[w(5, 11) + i * 0.1, 0], [w(5, 14) + i * 0.1, v, 'out']], suf: ' €', size: 26, col: malo ? GRIS : '#e6ce46', pop: true, caja: [-62, -17, 124, 34] });
  // horas: la barra se rellena; los de pago bajo siguen subiendo con los correos, llamadas y cambios
  const hv = malo ? [[hf, 0], [hf + 0.6, HR[i] * 0.5, 'out'], [w(5, 2) + i * 0.2, HR[i] * 0.5], [w(5, 10) + i * 0.2, HR[i], 'inout']] : [[hf, 0], [hf + 0.6, HR[i], 'out']];
  E.obj('h' + i, 'barra', { t0: a, t1: fin(2), entra: 0.2, x: 40, y: hy(i), w: 230, h: 40, sobrevive: i === 4, r: 40,
    f: hv.map(([t, x, e]) => e ? [t, x / 20, e] : [t, x / 20]), caja: [-115, -20, 230, 40] });
  E.obj('hn' + i, 'contador', { t0: hf, t1: malo ? w(5, 18) : fin(2), sale: 0.1, x: 210, y: hy(i), v: hv, suf: ' h', size: 30, col: 'txt', miles: false, caja: [-46, -18, 92, 36] });
  if (malo) E.obj('hr' + i, 'contador', { t0: w(5, 18), t1: fin(2), entra: 0.1, x: 210, y: hy(i), v: HR[i], suf: ' h', size: 30, col: ROJO, miles: false, pop: true, caja: [-46, -18, 92, 36] }); });
E.obj('rotH', 'rotulo', { t0: w(4, 3), t1: w(5, 6) - 0.1, sale: 0.2, x: 70, y: -500, texto: 'HORAS A LA SEMANA', size: 24, col: GRIS, pop: true, caja: [-140, -15, 280, 30] });
// correos, llamadas y cambios: el contador de avisos del cliente
E.obj('avisos', 'contador', { t0: w(5, 1), t1: w(5, 11), sale: 0.2, x: 40, y: -40, v: [[w(5, 2), 0], [w(5, 10), 37, 'inout']], suf: ' avisos', size: 40, col: ROJO, miles: false, pop: true, caja: [-120, -24, 240, 48] });
E.obj('cambio', 'bocadillo', { t0: w(5, 6) - 0.1, t1: w(5, 11) + 0.4, sale: 0.2, x: 255, y: -560, w: 430, h: 74, texto: '¿Lo podemos cambiar otra vez?', size: 27, pop: true, caja: [-215, -37, 430, 100] });
E.temblor(w(5, 9), 10, 0.4);
// «quién paga poco y te quita muchas horas»: marco rojo alrededor de D, E y B
E.obj('marco', 'flecha', { t0: w(5, 17), t1: fin(2), de: [-282, hy(2) - 34], hasta: [-282, hy(4) + 34], curva: 0, col: ROJO, w: 5, punta: false, p: [[w(5, 17), 0], [w(5, 19), 1, 'out']], inspeccion: false });
E.obj('pocoR', 'rotulo', { t0: w(5, 18), t1: fin(2), x: 40, y: -40, texto: 'PAGAN POCO · MUCHAS HORAS', size: 26, col: ROJO, pop: true, caja: [-210, -16, 420, 32] });
E.golpe(w(5, 22), 0.04);
E.sfx(w(4, 3), 'fill');

// ---------- 3 · súbeles el precio o deja de trabajar con ellos; el reloj se vacía y las horas van a A y C ----------
// 6: El(0) tercero:(1) a(2) los(3) que(4) pagan(5) poco(6) y(7) te(8) quitan(9) horas,(10) súbeles(11) el(12) precio(13) o(14) deja(15) de(16) trabajar(17) con(18) ellos.(19)
// 7: El(0) tiempo(1) que(2) recuperes,(3) dedícaselo(4) a(5) los(6) clientes(7) que(8) más(9) te(10) pagan.(11)
E.numero(3, N[2].T, N[2].S, { desde: 'h4', hacia: 'p0' });
E.figura('yo3', { t0: N[2].S - 0.1, t1: TC, x: -365, cara: true,
  poses: [[0, 'de_pie'], [w(6, 2), 'senalar'], [w(6, 11), 'levantar'], [w(6, 15), 'apartarse'], [w(7, 0), 'de_pie'], [w(7, 4), 'ofrecer'], [wf(7, -1), 'celebrar']],
  sonrisa: [[w(6, 2), 0], [w(6, 11), 0.8], [w(7, 4), 1], [wf(7, -1), 1.6]] });
// D, E y B: D y B suben de precio; E se va
const P3 = [['D', 600, 1200], ['E', 400, 0], ['B', 300, 900]];
const py = i => -470 + i * 110;
P3.forEach(([s, v0, v1], i) => { const a = N[2].S + i * 0.15, va = v1 === 0, sube = w(6, 12) + i * 0.2;
  E.obj('q' + i, 'pieza', { t0: a, t1: va ? w(6, 19) : w(7, 0), sale: 0.3, x: -190, y: py(i), r: 28, texto: s, pop: true, sfx: false, on: va ? 0 : [[0, 0], [sube, 0], [sube + 0.4, 1]], caja: [-28, -28, 56, 56] });
  E.obj('p' + i, 'etiqueta', { t0: a, t1: va ? w(6, 19) : w(7, 0), sale: 0.3, x: 40, y: py(i), w: 280, h: 74, pop: true, r: 60,
    v: va ? v0 : [[a, v0], [sube, v0], [sube + 0.7, v1, 'inout']], on: va ? 0.15 : [[0, 0.2], [sube, 0.2], [sube + 0.5, 1]], luz: va ? [[0, 1], [w(6, 15), 1], [w(6, 17), 0.4]] : 1,
    barrido: va ? null : [sube + 0.7], caja: [-140, -37, 280, 74] });
  if (!va) E.obj('up' + i, 'rotulo', { t0: sube + 0.5, t1: w(7, 0), sale: 0.2, x: 240, y: py(i), texto: '×' + (v1 / v0), size: 34, col: '#e6ce46', peso: 700, pop: true, caja: [-36, -20, 72, 40] }); });
// E: tachado rojo y fuera
E.obj('tachE', 'flecha', { t0: w(6, 15), t1: w(6, 19), sale: 0.3, de: [-230, py(1)], hasta: [190, py(1)], curva: 0, col: ROJO, w: 7, punta: false, p: [[w(6, 15), 0], [w(6, 17), 1, 'out']], inspeccion: false });
E.obj('adios', 'rotulo', { t0: w(6, 16), t1: w(7, 0), sale: 0.2, x: 265, y: py(1), texto: 'FUERA', size: 30, col: ROJO, peso: 700, pop: true, caja: [-60, -18, 120, 36] });
E.golpe(w(6, 17), 0.05);
E.sfx(w(6, 12), 'fill');
// «el tiempo que recuperes»: el reloj de tu semana se vacía y las horas libres suben
E.obj('reloj', 'temporizador', { t0: w(7, 0) - 0.1, t1: TC, x: -60, y: -360, r: 110, texto: 'TU', sub: 'SEMANA', pop: true,
  p: [[w(7, 0), 0.95], [w(7, 4), 0.55, 'inout']], caja: [-125, -125, 250, 250] });
E.obj('libres', 'contador', { t0: w(7, 1), t1: TC, x: -60, y: -180, v: [[w(7, 1), 0], [w(7, 4), 14, 'inout']], pre: '+', suf: ' h libres', size: 40, col: '#e6ce46', miles: false, pop: true, caja: [-140, -24, 280, 48] });
// «a los clientes que más te pagan»: las horas vuelan a A y C, que se encienden
['A', 'C'].forEach((s, i) => { const yy = -440 + i * 170;
  E.obj('top' + i, 'pieza', { t0: w(7, 4) - 0.1, t1: TC, x: 300, y: yy, r: 46, texto: s, pop: true, on: [[0, 0.3], [w(7, 9), 0.3], [w(7, 10), 1]], caja: [-46, -46, 92, 92] });
  for (let j = 0; j < 3; j++) { const a = w(7, 5) + i * 0.15 + j * 0.3;
    E.obj('hv' + i + j, 'moneda', { t0: a, t1: a + 0.7, entra: 0.06, sale: 0.15, r: 16, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
      x: [[a, -60], [a + 0.65, 300, 'inout']], y: [[a, -360], [a + 0.32, -560], [a + 0.65, yy, 'in']] }); } });
E.obj('chT', 'chispas', { t0: wf(7, -1), t1: wf(7, -1) + 0.8, x: 300, y: -355, r0: 90, r1: 200, inspeccion: false });
E.destello(wf(7, -1), 0.12);

// ---------- cierre: resumen de los tres pasos (línea 8) y envío (línea 9) ----------
// 8: Trabajar(0) más(1) horas(2) no(3) hace(4) que(5) te(6) salgan(7) las(8) cuentas.(9) Elegir(10) bien(11) para(12) quién(13) trabajas,(14) sí.(15)
// 9: Mándaselo(0) a(1) quien(2) trabaja(3) doce(4) horas(5) al(6) día(7) y(8) aun(9) así(10) no(11) llega(12) a(13) fin(14) de(15) mes.(16)
E.obj('resumen', 'resumen', { t0: TC, t1: w(9, 0), capa: 'pantalla', x: 540, y: 960, items: ['Ordena', 'Horas', 'Sube o fuera'], gap: 260,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], caja: [-390, -60, 780, 300] });
E.obj('rayosF', 'rayos', { t0: TC, t1: w(9, 0), capa: 'pantalla', x: 540, y: 960, r: 460, z: -2, p: [[w(8, 10), 0], [w(8, 13), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('confF', 'confeti', { t0: wf(8, -1) - 0.3, t1: wf(8, -1) + 1.8, capa: 'pantalla', x: 540, y: 880, n: 44, inspeccion: false, sinDim: true });
E.figura('yoF', { t0: w(9, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(9, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(9, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, vuelo: [[wf(9, -1), 0], [wf(9, -1) + 0.5, 1, 'in']] });
