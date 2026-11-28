// L62 · Los cinco porqués (estilo B; reglas 15, 20, 21, 24)
// Idea visual: el problema es una maraña gris que el muñeco deshace y que vuelve a salir al mes siguiente. Los cinco
// porqués son una cadena de monedas «?» que baja hasta una bola amarilla, la causa; en el segundo paso la cadena se
// escribe con las respuestas del ejemplo (llegó tarde → salió tarde → faltaba una pieza → nadie revisa el almacén).
// Contador que suma: el «5» de los cinco porqués y los «2» días de retraso. Algo que se rellena por punto: la barra
// del fallo (se escribe con cursor), los bloques de la cadena de porqués y la lista de revisión del almacén.
// Regla 20: «¿Otra vez?» va en bocadillo del compañero (gris) mientras la voz dice «vuelve a salir».
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(2, 3), gap: 70, y: 360 } });

// «El primero: // …» → T en «El», S en la primera palabra del punto
const N = [3, 5, 7].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(9, 0) - 0.1;   // resumen
const ROJO = '#e4574f';
const GRIS = '#9a9c9b';
const AM = '#e6ce46';

E.camara([
  [0, [0, -380, 1.04]], [w(0, 6), [10, -385, 1.06]], [w(0, 12), [-20, -390, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 8), [0, -385, 1.04]],
  [w(1, 17), [20, -390, 1.06]], [w(2, 0), [0, -380, 1.02]], [w(2, 4), [10, -385, 1.04]], [N[0].T, [10, -390, 1.05]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [15, -385, 1.04]], [w(4, 6), [-10, -385, 1.05]], [N[1].T, [0, -390, 1.05]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 0), [-15, -385, 1.03]], [w(6, 8), [15, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(8, 0), [-10, -385, 1.04]], [w(8, 6), [10, -385, 1.05]], [TC - 0.1, [0, -385, 1.04]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Arreglas(0) el(1) mismo(2) problema(3) cada(4) mes(5) y(6) al(7) mes(8) siguiente(9) vuelve(10) a(11) salir(12)   [bocadillo «¿Otra vez?»]
// el muñeco tira de la maraña hasta deshacerla («arreglas»); los meses avanzan; «vuelve a salir»: la maraña reaparece de golpe
E.figura('yo', { t0: 0, t1: w(1, 0), sale: 0.25, x: -300, talla: 330, cara: true, toca: ['problema'],
  poses: [[0, 'coger'], [w(0, 1), 'meter'], [w(0, 3), 'coger'], [w(0, 3) + 0.4, 'celebrar'], [w(0, 7), 'de_pie'], [w(0, 10), 'manos_cabeza'], [w(0, 12) + 0.3, 'triste']],
  sonrisa: [[0, -0.4], [w(0, 3) + 0.3, 1.4], [w(0, 9), 0.6], [w(0, 10), -1], [w(0, 12), -1.4]] });
E.obj('problema', 'maraña', { t0: 0, t1: w(1, 0), sale: 0.25, x: -70, y: -170, r: 60,
  p: [[0, 1], [w(0, 0), 1], [w(0, 3) + 0.2, 0, 'inout'], [w(0, 10), 0], [w(0, 10) + 0.35, 1, 'out']], rot: [[0, 0], [w(1, 0), 1.4, 'lin']], caja: [-78, -44, 156, 88] });
E.obj('chArr', 'chispas', { t0: w(0, 3) + 0.2, t1: w(0, 3) + 1.0, x: -70, y: -170, r0: 40, r1: 130, inspeccion: false });
E.golpe(w(0, 3) + 0.2, 0.03);
E.obj('meses', 'dias', { t0: 0, t1: w(1, 0), sale: 0.25, x: -50, y: -500, letras: ['E', 'F', 'M', 'A', 'M', 'J'], gap: 76,
  luz: [[0, 0], [w(0, 4), 0], [w(0, 5) + 0.2, 1, 'inout'], [w(0, 8), 1], [w(0, 9) + 0.2, 2, 'inout']], caja: [-220, -32, 440, 64] });
E.figura('cA', { t0: 0, t1: w(1, 0), sale: 0.25, x: 365, talla: 290, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(0, 3), 'ofrecer'], [w(0, 7), 'de_pie'], [w(0, 10), 'encoger']], sonrisa: [[0, 0.3], [w(0, 3), 1], [w(0, 10), -0.8]] });
E.obj('bocaH', 'bocadillo', { t0: w(0, 9), t1: w(1, 0), sale: 0.2, x: 305, y: -430, w: 250, h: 76, texto: '¿Otra vez?', size: 32, pop: true,
  on: [[w(0, 9), 0], [w(0, 10) + 0.3, 1]], caja: [-125, -38, 250, 102] });
E.temblor(w(0, 10), 14, 0.45); E.golpe(w(0, 10), 0.05);
E.obj('pulsoP', 'pulso', { t0: w(0, 10) + 0.1, t1: w(0, 10) + 0.8, x: -70, y: -170, r0: 50, r1: 150, inspeccion: false });

// 1: En(0) Toyota(1) usan(2) una(3) técnica(4) que(5) se(6) llama(7) los(8) cinco(9) porqués(10) preguntar(11) por(12) qué(13) hasta(14) dar(15) con(16) la(17) causa(18)
// «Toyota»; «los cinco porqués»: el 5 rueda; «preguntar por qué hasta dar con la causa»: cinco monedas «?» bajan en cadena hasta la causa
E.figura('yo1', { t0: w(1, 0) - 0.05, t1: w(2, 0), sale: 0.25, x: -340, talla: 330, cara: true,
  poses: [[0, 'de_pie'], [w(1, 1), 'senalar'], [w(1, 4), 'de_pie'], [w(1, 8), 'levantar'], [w(1, 11), 'pensar'], [w(1, 14), 'senalar'], [w(1, 18), 'celebrar']],
  sonrisa: [[0, 0.2], [w(1, 1), 0.8], [w(1, 11), 0.2], [w(1, 18), 1.5]] });
E.obj('rotToy', 'rotulo', { t0: w(1, 1) - 0.1, t1: w(1, 7), sale: 0.2, x: 150, y: -505, texto: 'TOYOTA', size: 36, col: GRIS, peso: 700, pop: true, caja: [-90, -20, 180, 40] });
E.obj('rotCP', 'rotulo', { t0: w(1, 7) + 0.05, t1: w(2, 0), sale: 0.25, x: 150, y: -505, texto: 'LOS CINCO PORQUÉS', size: 32, col: AM, peso: 700, pop: true, caja: [-215, -20, 430, 40] });
E.golpe(w(1, 9), 0.04);
E.obj('cinco', 'contador', { t0: w(1, 8), t1: w(2, 0), sale: 0.25, x: 410, y: -330, size: 120, miles: false, pop: true,
  v: [[w(1, 8), 0], [w(1, 9) + 0.45, 5, 'out']], barrido: [w(1, 9) + 0.5], caja: [-50, -60, 100, 120] });
E.obj('chCinco', 'chispas', { t0: w(1, 9) + 0.45, t1: w(1, 9) + 1.2, x: 410, y: -330, r0: 70, r1: 150, inspeccion: false });
E.obj('hilo', 'flecha', { t0: w(1, 11) - 0.1, t1: w(2, 0), sale: 0.25, de: [150, -440], hasta: [150, -90], curva: 0, punta: false, w: 4, col: '#56605a',
  p: [[w(1, 11), 0], [w(1, 17), 1, 'lin']], inspeccion: false });
const CY = [-430, -360, -290, -220, -150];
CY.forEach((y, i) => { const a = w(1, 10) + i * 0.12, on = w(1, 11) + i * (w(1, 17) - w(1, 11)) / 5;
  E.obj('pq' + i, 'moneda', { t0: a, t1: w(2, 0), sale: 0.25, x: 150, y, r: 28, n: '?', pop: true, sfx: i === 0,
    luz: [[0, 0.4], [on, 0.4], [on + 0.15, 1]], s: [[0, 1], [on, 1], [on + 0.12, 1.25, 'out'], [on + 0.3, 1, 'in']], caja: [-28, -28, 56, 56] }); });
E.obj('causa', 'bola', { t0: w(1, 17) - 0.1, t1: w(2, 0), sale: 0.25, x: 150, y: -60, r: 44, pop: true, caja: [-44, -44, 88, 88] });
E.obj('rotCausa', 'rotulo', { t0: w(1, 17), t1: w(2, 0), sale: 0.25, x: 330, y: -60, texto: 'LA CAUSA', size: 30, col: AM, pop: true, caja: [-90, -18, 180, 36] });
E.obj('chCausa', 'chispas', { t0: w(1, 18), t1: w(1, 18) + 0.8, x: 150, y: -60, r0: 60, r1: 150, inspeccion: false });
E.golpe(w(1, 18), 0.04); E.destello(w(1, 18), 0.1);

// 2: Se(0) hace(1) en(2) tres(3) pasos(4)
// tres escalones salen uno a uno y se marcan; el último sobrevive y se convierte en la moneda «1»
const ST = [{ x: -120, h: 70 }, { x: 60, h: 140 }, { x: 240, h: 210 }];
ST.forEach((s, i) => { const a = w(2, 2) + i * 0.16;
  E.obj('paso' + i, 'bloques', { t0: a - 0.15, t1: i === 2 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 2, n: 1, w: 150, h: s.h, x: s.x, y: -s.h / 2, r: 60, pop: true, refl: true,
    hechos: [[0, 0], [w(2, 3) + i * 0.2, 0], [w(2, 3) + i * 0.2 + 0.3, 1, 'out']], caja: [-75, -s.h / 2, 150, s.h] }); });
E.sfx(w(2, 3), 'fill');
E.figura('yo2', { t0: w(2, 0) - 0.05, t1: fin(0), x: -370, talla: 330, cara: true,
  poses: [[0, 'de_pie'], [w(2, 1), 'senalar'], [w(2, 4), 'ofrecer'], [wf(2, -1), 'celebrar']], sonrisa: [[0, 0.4], [w(2, 3), 1], [wf(2, -1), 1.5]] });
E.obj('chPasos', 'chispas', { t0: w(2, 4) + 0.3, t1: w(2, 4) + 1.0, x: 240, y: -105, r0: 80, r1: 170, inspeccion: false });
E.destello(wf(2, -1), 0.12);

// ---------- 1 · describe el fallo con un hecho ----------
// 3: El(0) primero(1) describe(2) el(3) fallo(4) con(5) un(6) hecho(7)
// 4: El(0) pedido(1) llegó(2) dos(3) días(4) tarde(5) Todavía(6) sin(7) buscar(8) culpables(9)
E.numero(1, N[0].T, N[0].S, { desde: 'paso2', hacia: 'fallo' });
E.figura('yoP1', { t0: N[0].S - 0.1, t1: fin(1), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(3, 2), 'senalar'], [w(3, 7), 'ofrecer'], [w(4, 1), 'senalar'], [w(4, 5), 'encoger'], [w(4, 7), 'apartarse'], [w(4, 9), 'ofrecer']],
  sonrisa: [[0, 0.2], [w(3, 2), 0.6], [w(3, 7), 1], [w(4, 5), -0.4], [w(4, 7), 0.2], [w(4, 9), 0.8]] });
E.obj('fallo', 'relleno', { t0: N[0].S - 0.1, t1: fin(1), x: 120, y: -470, w: 360, h: 44, pop: true, sobrevive: true, r: 60, rotulo: 'EL FALLO',
  f: [[w(3, 2), 0], [wf(3, -1) + 0.2, 1, 'lin']], cursor: [[0, 1], [wf(3, -1) + 0.2, 1], [wf(3, -1) + 0.25, 0]], barrido: [wf(3, -1) + 0.25], caja: [-180, -56, 360, 78] });
E.sfx(w(3, 2), 'fill');
E.obj('rotHecho', 'rotulo', { t0: w(3, 7) - 0.05, t1: w(4, 0), sale: 0.2, x: 120, y: -380, texto: 'UN HECHO', size: 28, col: AM, pop: true, caja: [-85, -16, 170, 32] });
E.obj('chHecho', 'chispas', { t0: wf(3, -1) + 0.2, t1: wf(3, -1) + 0.9, x: 120, y: -470, r0: 100, r1: 200, inspeccion: false });
E.golpe(wf(3, -1) + 0.2, 0.03);
// «El pedido llegó dos días tarde»: la semana; la luz del pedido pasa del miércoles al viernes y el 2 rueda
E.obj('rotPed', 'rotulo', { t0: w(4, 1) - 0.1, t1: fin(1), x: 120, y: -380, texto: 'EL PEDIDO', size: 28, col: GRIS, pop: true, caja: [-80, -16, 160, 32] });
E.obj('semana', 'dias', { t0: w(4, 1) - 0.05, t1: fin(1), x: 120, y: -290, letras: ['L', 'M', 'X', 'J', 'V'], gap: 80, pop: true,
  luz: [[0, 2], [w(4, 3), 2], [w(4, 5) + 0.1, 4, 'inout']], caja: [-190, -32, 380, 64] });
E.obj('dos', 'contador', { t0: w(4, 2), t1: fin(1), x: 20, y: -175, size: 90, miles: false, col: ROJO, pop: true,
  v: [[w(4, 3), 0], [w(4, 4) + 0.2, 2, 'out']], caja: [-40, -45, 80, 90] });
E.obj('rotTarde', 'rotulo', { t0: w(4, 4), t1: fin(1), x: 190, y: -175, texto: 'DÍAS TARDE', size: 30, col: ROJO, pop: true, caja: [-100, -18, 200, 36] });
E.temblor(w(4, 5), 10, 0.35);
// «Todavía sin buscar culpables»: aparece un compañero gris y el muñeco le aparta la mano; el compañero se apaga
E.figura('culpa', { t0: w(4, 6) - 0.15, t1: fin(1), x: 430, talla: 260, color: 'gris', dir: -1, cara: true,
  luz: [[0, 1], [w(4, 9), 1], [w(4, 9) + 0.4, 0.45]], poses: [[0, 'encoger'], [w(4, 8), 'manos_cabeza'], [w(4, 9) + 0.3, 'de_pie']], sonrisa: [[0, -0.6], [w(4, 9) + 0.3, 0.4]] });
E.obj('pulsoC', 'pulso', { t0: w(4, 9), t1: w(4, 9) + 0.7, x: 120, y: -470, r0: 60, r1: 160, inspeccion: false });

// ---------- 2 · pregunta por qué, y otra vez ----------
// 5: El(0) segundo(1) pregunta(2) por(3) qué(4) y(5) a(6) cada(7) respuesta(8) vuelve(9) a(10) preguntarlo(11)
// 6: Llegó(0) tarde(1) porque(2) salió(3) tarde(4) Salió(5) tarde(6) porque(7) faltaba(8) una(9) pieza(10) Faltaba(11) porque(12) nadie(13) revisa(14) el(15) almacén(16)
E.numero(2, N[1].T, N[1].S, { desde: 'fallo', hacia: 'pqG' });
E.figura('yoP2', { t0: N[1].S - 0.1, t1: fin(2), x: -370, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'pensar'], [w(5, 8), 'senalar'], [w(5, 11), 'pensar'], [w(6, 0), 'senalar'], [w(6, 5), 'pensar'], [w(6, 8), 'senalar'], [w(6, 11), 'pensar'], [w(6, 14), 'celebrar']],
  sonrisa: [[0, 0], [w(5, 8), 0.6], [w(6, 5), 0.2], [w(6, 14), 1.5]] });
E.obj('pqG', 'moneda', { t0: N[1].S - 0.1, t1: w(6, 0) + 0.1, sale: 0.25, x: 130, y: -380, r: 70, n: '?', pop: true, sfx: false,
  s: [[0, 1], [w(5, 9), 1], [w(5, 9) + 0.15, 1.2, 'out'], [w(5, 9) + 0.35, 1, 'in'], [w(5, 11), 1], [w(5, 11) + 0.15, 1.2, 'out'], [w(5, 11) + 0.35, 1, 'in']], caja: [-70, -70, 140, 140] });
E.obj('pulsoG1', 'pulso', { t0: w(5, 9) + 0.1, t1: w(5, 9) + 0.7, x: 130, y: -380, r0: 70, r1: 170, inspeccion: false });
E.obj('pulsoG2', 'pulso', { t0: w(5, 11) + 0.1, t1: w(5, 11) + 0.7, x: 130, y: -380, r0: 70, r1: 170, inspeccion: false });
E.sfx(w(5, 9), 'pop'); E.sfx(w(5, 11), 'pop');
// la cadena: bloques que se marcan con cada «porque»
E.obj('cadena', 'bloques', { t0: w(5, 7) - 0.1, t1: fin(2), x: 140, y: -90, n: 3, w: 420, h: 50, pop: true, sobrevive: true, r: 60, parte: [[w(5, 8), 0], [w(5, 11), 1, 'inout']],
  hechos: [[0, 0], [w(6, 2), 0], [w(6, 2) + 0.3, 1, 'out'], [w(6, 7), 1], [w(6, 7) + 0.3, 2, 'out'], [w(6, 12), 2], [w(6, 12) + 0.3, 3, 'out']], caja: [-210, -35, 420, 70] });
E.sfx(w(6, 2), 'fill');
const FILAS = [{ t: w(6, 0) - 0.05, y: -500, s: 'LLEGÓ TARDE', col: GRIS }, { t: w(6, 3) - 0.05, y: -410, s: 'SALIÓ TARDE', col: GRIS },
  { t: w(6, 8) - 0.05, y: -320, s: 'FALTABA UNA PIEZA', col: GRIS }, { t: w(6, 13) - 0.05, y: -230, s: 'NADIE REVISA EL ALMACÉN', col: AM }];
FILAS.forEach((f, i) => { const ww = f.s.length * 20 + 20;
  E.obj('fila' + i, 'rotulo', { t0: f.t, t1: fin(2), x: 170, y: f.y, texto: f.s, size: 26, col: f.col, peso: i === 3 ? 700 : 600, pop: true, caja: [-ww / 2, -16, ww, 32] });
  if (i > 0) E.obj('pqF' + i, 'moneda', { t0: w(6, [2, 7, 12][i - 1]) - 0.1, t1: fin(2), x: -90, y: f.y, r: 22, n: '?', pop: true, sfx: false, caja: [-22, -22, 44, 44] });
});
// «nadie revisa el almacén»: chispas en la última respuesta
E.obj('chAlm', 'chispas', { t0: wf(6, -1), t1: wf(6, -1) + 0.8, x: 170, y: -230, r0: 120, r1: 240, inspeccion: false });
E.golpe(wf(6, -1), 0.04); E.destello(wf(6, -1), 0.1);

// ---------- 3 · arregla la última causa, no la primera ----------
// 7: El(0) tercero(1) arregla(2) la(3) última(4) causa(5) no(6) la(7) primera(8)
// 8: Si(0) alguien(1) revisa(2) el(3) almacén(4) cada(5) lunes(6) el(7) pedido(8) deja(9) de(10) llegar(11) tarde(12)
E.numero(3, N[2].T, N[2].S, { desde: 'cadena', hacia: 'c3' });
E.figura('yoP3', { t0: N[2].S - 0.1, t1: TC, x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(7, 2), 'senalar'], [w(7, 5), 'celebrar'], [w(7, 6), 'apartarse'], [w(8, 0), 'de_pie'], [w(8, 2), 'senalar'], [w(8, 6), 'ofrecer'], [wf(8, -1), 'celebrar']],
  sonrisa: [[0, 0.2], [w(7, 5), 1.4], [w(7, 6), 0], [w(8, 2), 0.8], [wf(8, -1), 1.6]] });
// columna de causas: la de arriba es la primera; la de abajo, la última
[-470, -380, -290, -200].forEach((y, i) => { const last = i === 3;
  E.obj('c' + i, 'pieza', { t0: N[2].S - 0.1 + i * 0.1, t1: w(8, 0), sale: 0.25, x: 60, y, r: 32, pop: true, texto: '',
    on: last ? [[0, 0], [w(7, 4), 0], [w(7, 5) + 0.2, 1, 'out']] : 0, luz: i === 0 ? [[0, 1], [w(7, 7), 1], [w(7, 8) + 0.3, 0.4]] : 1, caja: [-32, -32, 64, 64] }); });
E.obj('rotUlt', 'rotulo', { t0: w(7, 4) - 0.05, t1: w(8, 0), sale: 0.25, x: 290, y: -200, texto: 'LA ÚLTIMA CAUSA', size: 28, col: AM, peso: 700, pop: true, caja: [-170, -16, 340, 32] });
E.obj('chUlt', 'chispas', { t0: w(7, 5) + 0.2, t1: w(7, 5) + 1.0, x: 60, y: -200, r0: 40, r1: 120, inspeccion: false });
E.sfx(w(7, 4), 'fill'); E.golpe(w(7, 5) + 0.2, 0.04);
E.obj('rotPri', 'rotulo', { t0: w(7, 6) - 0.05, t1: w(8, 0), sale: 0.25, x: 260, y: -470, texto: 'LA PRIMERA, NO', size: 28, col: ROJO, pop: true, caja: [-145, -16, 290, 32] });
E.temblor(w(7, 8), 8, 0.3);
// «Si alguien revisa el almacén cada lunes»: se enciende el lunes y la lista de revisión se marca;
// «el pedido deja de llegar tarde»: el paquete se marca en amarillo
E.obj('lunes', 'dias', { t0: w(8, 0) - 0.05, t1: TC, x: 130, y: -500, letras: ['L', 'M', 'X', 'J', 'V'], gap: 76, pop: true,
  luz: [[0, -1], [w(8, 5), -1], [w(8, 6) + 0.1, 0, 'out']], caja: [-182, -32, 364, 64] });
E.obj('revision', 'lista', { t0: w(8, 1) - 0.05, t1: TC, x: 140, y: -360, n: 3, w: 300, gap: 56, pop: true,
  p: [[w(8, 2), 0], [w(8, 6), 3, 'lin']], brillo: [[w(8, 2), 0], [w(8, 7), 3, 'lin']], caja: [-150, -74, 300, 148] });
E.sfx(w(8, 2), 'fill');
E.obj('rotAlm', 'rotulo', { t0: w(8, 4) - 0.05, t1: TC, x: 140, y: -262, texto: 'EL ALMACÉN', size: 26, col: GRIS, pop: true, caja: [-90, -16, 180, 32] });
E.obj('rotPed2', 'rotulo', { t0: w(8, 8) - 0.05, t1: TC, x: 140, y: -165, texto: 'EL PEDIDO', size: 26, col: GRIS, pop: true, caja: [-80, -16, 160, 32] });
E.obj('pedido', 'bloques', { t0: w(8, 8) - 0.1, t1: TC, x: 140, y: -60, n: 1, w: 150, h: 90, pop: true, refl: true,
  hechos: [[0, 0], [w(8, 11), 0], [w(8, 11) + 0.35, 1, 'out']], caja: [-75, -45, 150, 90] });
E.obj('chPed', 'chispas', { t0: w(8, 11) + 0.35, t1: w(8, 11) + 1.1, x: 140, y: -60, r0: 70, r1: 160, inspeccion: false });
E.golpe(w(8, 11) + 0.35, 0.04); E.destello(wf(8, -1), 0.12);

// ---------- cierre: resumen y envío ----------
// 9: Un(0) problema(1) que(2) vuelve(3) es(4) un(5) problema(6) que(7) se(8) arregló(9) por(10) encima(11)
// 10: Mándaselo(0) a(1) ese(2) compañero(3) que(4) apaga(5) el(6) mismo(7) fuego(8) cada(9) semana(10)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(9, 4), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, items: ['El hecho', '¿Por qué?', 'La causa'], gap: 270,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(9, 4)], caja: [-400, -60, 800, 200] });
E.obj('confC', 'confeti', { t0: wf(9, -1), t1: wf(9, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(9, -1), 0.22); E.golpe(wf(9, -1), 0.04);
E.figura('yoF', { t0: w(10, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(10, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(10, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(10, 10)], vuelo: [[wf(10, -1), 0], [wf(10, -1) + 0.5, 1, 'in']] });
