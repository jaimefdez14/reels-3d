// L59 · El método Ivy Lee (estilo B; reglas 15, 20, 21, 24)
// Idea visual: una lista de seis renglones. En el gancho el asesor (muñeco amarillo) se la ofrece al magnate (gris), el año
// 1918 rueda y la cifra de 25.000 $ rueda hasta el golpe; el cheque llega volando tres meses después.
// Tres pasos: por la noche se apunta la lista de seis (y la séptima tarea rebota: «Ni una más»), seis barras de importancia
// se reordenan solas de mayor a menor («ordénalas») y la de arriba se enciende; la barra de la primera tarea se llena entera
// antes de marcar la casilla, y las dos que quedan sin hacer vuelan a la lista del día siguiente.
// Regla 20: «Págueme lo que crea que vale.» va en bocadillo del asesor; la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(2, 12), gap: 70, y: 360 } });

// «El primero: // …» → T en «El», S en la primera palabra del punto
const N = [3, 5, 7].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(9, 0) - 0.1;   // resumen
const ROJO = '#e4574f';
const GRIS = '#9a9c9b';
const AM = '#e6ce46';

E.camara([
  [0, [0, -380, 1.04]], [w(0, 6), [10, -385, 1.06]], [w(0, 12), [-15, -390, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 8), [15, -385, 1.05]],
  [wf(1, -1), [0, -390, 1.06]], [w(2, 0), [0, -380, 1.02]], [w(2, 6), [-10, -385, 1.04]], [N[0].T, [10, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [15, -385, 1.04]], [w(4, 6), [-10, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 0), [-15, -385, 1.04]], [w(6, 7), [15, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(8, 0), [-10, -385, 1.04]], [w(8, 5), [10, -385, 1.05]], [TC - 0.1, [0, -385, 1.04]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: En(0) 1918(1) una(2) lista(3) de(4) seis(5) tareas(6) le(7) valió(8) a(9) un(10) asesor(11) 25.000(12) dólares(13)   [bocadillo «Págueme lo que crea que vale.»]
// el año rueda desde el fotograma 0; «una lista de seis tareas»: los seis renglones se escriben; «le valió… 25.000 dólares»:
// la cifra rueda hasta el golpe y el asesor lo celebra
E.figura('yo', { t0: 0, t1: fin(0), x: -340, talla: 360, cara: true,
  poses: [[0, 'ofrecer'], [w(0, 3), 'senalar'], [w(0, 7), 'ofrecer'], [w(0, 12) + 0.4, 'celebrar'], [w(1, 0), 'de_pie'], [w(1, 2), 'senalar'], [w(1, 8), 'ofrecer'],
    [w(2, 0), 'pensar'], [w(2, 6), 'coger'], [w(2, 8) + 0.3, 'celebrar'], [w(2, 9), 'de_pie'], [w(2, 12), 'senalar']],
  sonrisa: [[0, 0.8], [w(0, 7), 0.6], [w(0, 12) + 0.4, 1.6], [w(1, 0), 0.6], [w(2, 0), 0.2], [w(2, 8) + 0.3, 1.6], [w(2, 12), 0.9]] });
E.figura('mag', { t0: 0, t1: w(2, 9) + 0.3, sale: 0.3, x: 370, talla: 360, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(0, 7), 'pensar'], [w(1, 10), 'coger'], [w(1, 14), 'pensar'], [w(2, 3), 'ofrecer'], [w(2, 8), 'de_pie']],
  sonrisa: [[0, 0], [w(1, 10), 0.4], [w(2, 3), 1.2]] });
E.obj('anio', 'contador', { t0: 0, t1: w(0, 9), sale: 0.2, x: 250, y: -460, size: 80, miles: false,
  v: [[0, 1880], [w(0, 1) + 0.4, 1918, 'out']], barrido: [w(0, 1) + 0.45], caja: [-130, -45, 260, 90] });
E.obj('chAnio', 'chispas', { t0: w(0, 1) + 0.4, t1: w(0, 1) + 1.1, x: 250, y: -460, r0: 90, r1: 170, inspeccion: false });
E.obj('listaH', 'lista', { t0: 0, t1: w(2, 0), sale: 0.25, x: [[0, 20], [w(1, 8), 20], [w(1, 8) + 0.5, 110, 'inout']], y: -250, n: 6, w: 240, gap: 44,
  brillo: [[0.1, 0], [w(0, 3), 1], [w(0, 6) + 0.4, 6, 'lin'], [w(1, 4), 6], [w(1, 5), 0], [w(1, 8), 6, 'lin']], caja: [-120, -128, 240, 256] });
E.sfx(w(0, 3), 'fill');
E.obj('bocaH', 'bocadillo', { t0: w(0, 7) - 0.1, t1: w(1, 0), sale: 0.2, x: -150, y: -470, w: 470, h: 76, texto: 'Págueme lo que crea que vale.', size: 27, pop: true,
  on: [[w(0, 7), 0], [w(0, 7) + 0.3, 1]], caja: [-235, -38, 470, 102] });
E.obj('cifra', 'contador', { t0: w(0, 10), t1: w(1, 13), sale: 0.2, x: 250, y: -460, size: 72, suf: ' $', pop: true,
  v: [[w(0, 11), 0], [w(0, 12) + 0.45, 25000, 'out']], barrido: [w(0, 13) + 0.2], caja: [-150, -42, 300, 84] });
E.obj('chCifra', 'chispas', { t0: w(0, 12) + 0.45, t1: w(0, 12) + 1.2, x: 250, y: -460, r0: 110, r1: 200, inspeccion: false });
E.golpe(w(0, 12) + 0.45, 0.05); E.destello(w(0, 12) + 0.45, 0.15); E.temblor(w(0, 12) + 0.45, 10, 0.35);

// 1: Se(0) llamaba(1) Ivy(2) Lee(3) y(4) según(5) se(6) cuenta(7) se(8) la(9) enseñó(10) a(11) un(12) magnate(13) del(14) acero(15)
// «Ivy Lee»: su nombre sobre el asesor; «se la enseñó»: la lista viaja hacia el magnate; «magnate del acero»: su rótulo
E.obj('rotIvy', 'rotulo', { t0: w(1, 2) - 0.1, t1: w(2, 0), sale: 0.2, x: -330, y: -460, texto: 'IVY LEE', size: 36, col: AM, peso: 700, pop: true, caja: [-90, -20, 180, 40] });
E.obj('chIvy', 'chispas', { t0: w(1, 3), t1: w(1, 3) + 0.8, x: -330, y: -460, r0: 70, r1: 150, inspeccion: false });
E.golpe(w(1, 3), 0.03);
E.obj('rotMag', 'rotulo', { t0: w(1, 13) + 0.05, t1: w(2, 0) - 0.25, sale: 0.2, x: 260, y: -460, texto: 'MAGNATE DEL ACERO', size: 24, col: GRIS, pop: true, caja: [-175, -15, 350, 30] });
E.obj('pulsoL', 'pulso', { t0: w(1, 8) + 0.5, t1: w(1, 8) + 1.1, x: 110, y: -250, r0: 60, r1: 160, inspeccion: false });
E.sfx(w(1, 8) + 0.5, 'thud');

// 2: Tres(0) meses(1) después(2) el(3) empresario(4) le(5) mandó(6) el(7) cheque(8) El(9) método(10) tiene(11) tres(12) pasos(13)
// «Tres meses después»: una barra de tres meses se llena; «le mandó el cheque»: la etiqueta de 25.000 $ vuela al asesor;
// «tres pasos»: tres monedas
E.obj('meses', 'relleno', { t0: w(2, 0) - 0.1, t1: w(2, 9), sale: 0.2, x: 20, y: -440, w: 300, h: 36, pop: true, rotulo: 'TRES MESES',
  f: [[w(2, 0), 0], [w(2, 2) + 0.3, 1, 'inout']], caja: [-150, -52, 300, 70] });
E.sfx(w(2, 0), 'fill');
E.obj('chMeses', 'chispas', { t0: w(2, 2) + 0.3, t1: w(2, 2) + 1.0, x: 170, y: -440, r0: 30, r1: 90, inspeccion: false });
E.obj('cheque', 'etiqueta', { t0: w(2, 4), t1: N[0].T - 0.05, sale: 0.2, x: [[w(2, 4), 130], [w(2, 6), 130], [w(2, 6) + 0.55, -60, 'inout']], y: -250, w: 320, h: 110, suf: ' $',
  on: [[0, 0.3], [w(2, 6) + 0.5, 0.3], [w(2, 6) + 0.6, 1]], v: [[w(2, 6) + 0.5, 0], [w(2, 8) + 0.3, 25000, 'out']], pop: true, estela: 4,
  luz: [[0, 1], [wf(2, -1) - 0.4, 1], [wf(2, -1), 0.5]], caja: [-160, -55, 320, 110] });
E.obj('pulsoC', 'pulso', { t0: w(2, 6) + 0.55, t1: w(2, 6) + 1.15, x: -60, y: -250, r0: 60, r1: 180, inspeccion: false });
E.obj('chCheque', 'chispas', { t0: w(2, 8) + 0.3, t1: w(2, 8) + 1.0, x: -60, y: -250, r0: 120, r1: 220, inspeccion: false });
E.golpe(w(2, 8) + 0.3, 0.04);
[0, 1, 2].forEach(i => { const a = w(2, 12) + i * 0.13;
  E.obj('p' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: -60 + i * 100, y: -450, r: 32, n: '', pop: true, sfx: i === 0,
    s: i === 0 ? [[0, 1], [wf(2, -1), 1], [wf(2, -1) + 0.3, 1.3, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [wf(2, -1), 1], [wf(2, -1) + 0.3, 0.4]], caja: [-32, -32, 64, 64] }); });
E.destello(wf(2, -1), 0.12);

// ---------- 1 · por la noche, apunta seis tareas ----------
// 3: El(0) primero(1) por(2) la(3) noche(4) apunta(5) seis(6) tareas(7)
// 4: Las(0) seis(1) más(2) importantes(3) de(4) mañana(5) Ni(6) una(7) más(8)
E.numero(1, N[0].T, N[0].S, { desde: 'p1', hacia: 'lista1' });
E.figura('yoP1', { t0: N[0].S - 0.1, t1: fin(1), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(3, 2), 'pensar'], [w(3, 5), 'escribir'], [w(4, 0), 'senalar'], [w(4, 3), 'ofrecer'], [w(4, 6), 'apartarse'], [wf(4, -1) + 0.1, 'celebrar']],
  sonrisa: [[0, 0.2], [w(3, 5), 0.8], [w(4, 0), 1], [w(4, 6), -0.3], [wf(4, -1) + 0.1, 1.5]] });
E.obj('luna', 'bola', { t0: w(3, 3), t1: w(4, 4), sale: 0.25, x: -150, y: -470, r: 34, pop: true, luz: 0.55, caja: [-34, -34, 68, 68] });
E.obj('rotNoche', 'rotulo', { t0: w(3, 3), t1: w(4, 4), sale: 0.15, x: 100, y: -470, texto: 'POR LA NOCHE', size: 28, col: GRIS, pop: true, caja: [-130, -17, 260, 34] });
E.obj('rotMan', 'rotulo', { t0: w(4, 5) - 0.05, t1: fin(1), x: 100, y: -470, texto: 'MAÑANA', size: 30, col: AM, pop: true, caja: [-80, -18, 160, 36] });
E.obj('lista1', 'lista', { t0: N[0].S - 0.1, t1: fin(1), x: 90, y: -280, n: 6, w: 300, gap: 50, pop: true, sobrevive: true,
  brillo: [[w(3, 5), 0], [wf(3, -1) + 0.3, 6, 'lin']], p: [[w(4, 2), 0], [w(4, 5) + 0.2, 6, 'lin']], caja: [-150, -143, 300, 286] });
E.sfx(w(3, 5), 'fill'); E.sfx(w(4, 2), 'fill');
E.obj('seis', 'contador', { t0: w(3, 6) - 0.1, t1: fin(1), x: 390, y: -280, size: 110, miles: false, pop: true,
  v: [[w(3, 6), 0], [w(3, 7) + 0.3, 6, 'out']], barrido: [w(4, 1)], caja: [-55, -60, 110, 120] });
E.obj('chSeis', 'chispas', { t0: w(3, 7) + 0.3, t1: w(3, 7) + 1.0, x: 390, y: -280, r0: 60, r1: 140, inspeccion: false });
E.golpe(w(3, 7) + 0.3, 0.03);
// «Ni una más»: una séptima tarea (gris) llega volando, choca y rebota fuera
E.obj('septima', 'pieza', { t0: w(4, 6) - 0.35, t1: w(4, 8) + 0.5, entra: 0.08, sale: 0.2, x: [[w(4, 6) - 0.35, 470], [w(4, 6), 290, 'in'], [w(4, 8) + 0.4, 470, 'out']],
  y: [[w(4, 6) - 0.35, -110], [w(4, 6), -110], [w(4, 7), -170, 'out'], [w(4, 8) + 0.4, -60, 'in']], rot: [[w(4, 6), 0], [w(4, 8) + 0.4, 1.6]], r: 26, on: 0, libre: true, sfx: false, estela: 4 });
E.obj('pulso7', 'pulso', { t0: w(4, 6), t1: w(4, 6) + 0.6, x: 255, y: -110, r0: 20, r1: 90, inspeccion: false });
E.temblor(w(4, 6), 10, 0.35);
E.obj('rotNi', 'rotulo', { t0: w(4, 7), t1: fin(1), x: 90, y: -90, texto: 'NI UNA MÁS', size: 30, col: AM, peso: 700, pop: true, caja: [-110, -18, 220, 36] });
E.obj('ch1', 'chispas', { t0: wf(4, -1), t1: wf(4, -1) + 0.8, x: 90, y: -280, r0: 140, r1: 240, inspeccion: false });
E.golpe(wf(4, -1), 0.04); E.destello(wf(4, -1), 0.1);

// ---------- 2 · ordénalas por importancia ----------
// 5: El(0) segundo(1) ordénalas(2) por(3) importancia(4)
// 6: Arriba(0) la(1) que(2) más(3) cuenta(4) aunque(5) sea(6) la(7) que(8) menos(9) te(10) apetece(11)
// seis barras de importancia desordenadas; «ordénalas» → sus longitudes se reordenan de mayor a menor; «Arriba» → se
// enciende la primera; «la que menos te apetece» → el muñeco pone mala cara
E.numero(2, N[1].T, N[1].S, { desde: 'lista1', hacia: 'bar0' });
E.figura('yoP2', { t0: N[1].S - 0.1, t1: fin(2), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'senalar'], [w(5, 4), 'pensar'], [w(6, 0), 'levantar'], [w(6, 3), 'senalar'], [w(6, 5), 'encoger'], [w(6, 9), 'manos_cabeza'], [wf(6, -1) + 0.15, 'senalar']],
  sonrisa: [[0, 0.2], [w(5, 2), 0.6], [w(6, 0), 1.2], [w(6, 5), -0.3], [w(6, 9), -1.2], [wf(6, -1) + 0.15, 0.4]] });
const F0 = [0.45, 0.9, 0.3, 0.7, 1.0, 0.55], F1 = [1.0, 0.9, 0.7, 0.55, 0.45, 0.3];
const BY = [-430, -378, -326, -274, -222, -170];
BY.forEach((y, i) => { const a = N[1].S + 0.1 + i * 0.08, b = w(5, 2) + i * 0.1;
  E.obj('bar' + i, 'relleno', { t0: N[1].S - 0.1 + i * 0.06, t1: i === 0 ? fin(2) : N[2].T - 0.05, sale: 0.2, sobrevive: i === 0, x: 110, y, w: 320, h: 34, pop: true,
    f: [[a, 0], [a + 0.5, F0[i], 'out'], [b, F0[i]], [b + 0.5, F1[i], 'inout']],
    luz: i === 0 ? 1 : [[0, 1], [w(6, 0), 1], [w(6, 0) + 0.3, 0.45]], barrido: i === 0 ? [w(6, 0) + 0.1] : [], caja: [-160, -17, 320, 34] }); });
E.sfx(N[1].S + 0.1, 'fill'); E.sfx(w(5, 2), 'whoosh'); E.sfx(w(5, 2) + 0.5, 'fill');
E.obj('rotImp', 'rotulo', { t0: w(5, 3), t1: w(6, 5), sale: 0.2, x: 110, y: -100, texto: 'POR IMPORTANCIA', size: 26, col: GRIS, pop: true, caja: [-140, -16, 280, 32] });
E.obj('chOrden', 'chispas', { t0: w(5, 4) + 0.3, t1: w(5, 4) + 1.0, x: 110, y: -300, r0: 170, r1: 260, inspeccion: false });
E.golpe(w(5, 4) + 0.3, 0.03);
E.obj('rotArr', 'rotulo', { t0: w(6, 0) - 0.05, t1: fin(2), x: 380, y: -480, texto: 'ARRIBA', size: 28, col: AM, peso: 700, pop: true, caja: [-75, -17, 150, 34] });
E.obj('pulsoA', 'pulso', { t0: w(6, 0) + 0.1, t1: w(6, 0) + 0.7, x: 110, y: -430, r0: 60, r1: 200, inspeccion: false });
E.obj('chA', 'chispas', { t0: w(6, 4), t1: w(6, 4) + 0.8, x: 110, y: -430, r0: 150, r1: 240, inspeccion: false });
// «aunque sea la que menos te apetece»: la barra de arriba tiembla y el muñeco se agobia
E.obj('rotApe', 'rotulo', { t0: w(6, 9) - 0.05, t1: fin(2), x: 110, y: -100, texto: 'LA QUE MENOS APETECE', size: 24, col: GRIS, pop: true, caja: [-175, -15, 350, 30] });
E.temblor(w(6, 9), 8, 0.35);

// ---------- 3 · empieza por la primera y no pases a la segunda hasta acabarla ----------
// 7: El(0) tercero(1) empieza(2) por(3) la(4) primera(5) y(6) no(7) pases(8) a(9) la(10) segunda(11) hasta(12) acabarla(13)
// 8: Lo(0) que(1) quede(2) sin(3) hacer(4) pasa(5) a(6) la(7) lista(8) del(9) día(10) siguiente(11)
E.numero(3, N[2].T, N[2].S, { desde: 'bar0', hacia: 'hoy' });
E.figura('yoP3', { t0: N[2].S - 0.1, t1: TC, x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(7, 2), 'senalar'], [w(7, 5), 'escribir'], [w(7, 7), 'apartarse'], [w(7, 9), 'escribir'], [wf(7, -1), 'celebrar'],
    [w(8, 0), 'escribir'], [w(8, 5), 'senalar'], [wf(8, -1) + 0.1, 'celebrar']],
  sonrisa: [[0, 0.2], [w(7, 5), 0.6], [w(7, 7), -0.2], [w(7, 9), 0.4], [wf(7, -1), 1.5], [w(8, 0), 0.6], [wf(8, -1) + 0.1, 1.4]] });
E.obj('rotHoy', 'rotulo', { t0: N[2].S, t1: TC, x: 60, y: -480, texto: 'HOY', size: 30, col: AM, peso: 700, pop: true, caja: [-50, -18, 100, 36] });
E.obj('hoy', 'lista', { t0: N[2].S - 0.1, t1: TC, x: 60, y: -300, n: 6, w: 300, gap: 50, pop: true,
  brillo: [[0, 0], [w(7, 3), 0], [w(7, 5) + 0.3, 1, 'out'], [w(8, 0), 1], [w(8, 4), 4, 'lin']],
  p: [[wf(7, -1), 0], [wf(7, -1) + 0.25, 1, 'out'], [w(8, 0), 1], [w(8, 4), 4, 'lin']], caja: [-150, -143, 300, 286] });
// barra de la primera tarea: se llena despacio hasta «acabarla»; «no pases a la segunda»: un tope rojo
E.obj('tarea', 'relleno', { t0: w(7, 2) - 0.1, t1: w(8, 5), sale: 0.2, x: 60, y: -80, w: 300, h: 36, pop: true,
  f: [[w(7, 3), 0], [wf(7, -1), 1, 'inout'], [w(8, 0), 1], [w(8, 0) + 0.15, 0], [w(8, 4), 1, 'lin']], caja: [-150, -18, 300, 36] });
E.sfx(w(7, 3), 'fill'); E.sfx(w(8, 0), 'fill');
E.obj('rotSeg', 'rotulo', { t0: w(7, 8) - 0.05, t1: wf(7, -1), sale: 0.2, x: 370, y: -250, texto: 'NO', size: 34, col: ROJO, peso: 700, pop: true, caja: [-40, -20, 80, 40] });
E.temblor(w(7, 8), 8, 0.3);
E.obj('chT', 'chispas', { t0: wf(7, -1), t1: wf(7, -1) + 0.8, x: 60, y: -80, r0: 100, r1: 200, inspeccion: false });
E.golpe(wf(7, -1), 0.04);
// «pasa a la lista del día siguiente»: las dos tareas sin hacer vuelan a una lista nueva
E.obj('rotSig', 'rotulo', { t0: w(8, 8) - 0.05, t1: TC, x: 380, y: -340, texto: 'DÍA SIGUIENTE', size: 20, col: GRIS, pop: true, caja: [-120, -13, 240, 26] });
E.obj('sig', 'lista', { t0: w(8, 7), t1: TC, x: 380, y: -250, n: 2, w: 150, gap: 50, pop: true, brillo: [[w(8, 7), 0], [w(8, 9) + 0.3, 2, 'lin']], caja: [-75, -43, 150, 86] });
[0, 1].forEach(i => { const a = w(8, 5) + i * 0.15;
  E.obj('vuela' + i, 'pieza', { t0: a, t1: a + 0.6, entra: 0.06, sale: 0.12, r: 16, on: 0.5, libre: true, estela: 4, sfx: false, inspeccion: false,
    x: [[a, 120], [a + 0.5, 395, 'inout']], y: [[a, -225 + i * 50], [a + 0.25, -330 + i * 50, 'out'], [a + 0.5, -275 + i * 50, 'in']] }); });
E.obj('chSig', 'chispas', { t0: wf(8, -1), t1: wf(8, -1) + 0.8, x: 380, y: -250, r0: 80, r1: 150, inspeccion: false });
E.destello(wf(8, -1) + 0.1, 0.12);

// ---------- cierre: resumen y envío ----------
// 9: Seis(0) tareas(1) en(2) orden(3) rinden(4) más(5) que(6) veinte(7) a(8) la(9) vez(10)
// 10: Mándaselo(0) a(1) ese(2) amigo(3) que(4) empieza(5) el(6) día(7) sin(8) saber(9) por(10) dónde(11) empezar(12)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(9, 4), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, items: ['Seis tareas', 'En orden', 'Una a una'], gap: 270,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(9, 4)], caja: [-400, -60, 800, 200] });
E.obj('confC', 'confeti', { t0: wf(9, -1), t1: wf(9, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(9, -1), 0.22); E.golpe(wf(9, -1), 0.04);
E.figura('yoF', { t0: w(10, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(10, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(10, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(10, 12)], vuelo: [[wf(10, -1), 0], [wf(10, -1) + 0.5, 1, 'in']] });
