// L31 · Antes de montar un negocio, imagina que ya ha fracasado (estilo B; reglas 15, 19, 20, 23, 24)
// Gancho visual: la tienda con el cartel ABIERTO pasa a CERRADO; al final, con el remedio, vuelve a ABIERTO y suben los clientes.
// Regla 20: «Esto no puede fallar» va en bocadillo del muñeco confiado; la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
const ROJO = '#e4574f', AM = '#e6ce46', GRIS = '#9a9c9b';
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'barras', aparece: w(1, 12), gap: 70, y: 360 } });

// «El primero: // …» → T en «El», S en la primera palabra del paso
const N = [2, 5, 7].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(9, 0) - 0.1;

E.camara([
  [0, [0, -380, 1.04]], [w(0, 9), [10, -385, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 9), [-10, -390, 1.05]], [N[0].T, [20, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(2, 12), [20, -390, 1.06]], [w(3, 0), [0, -385, 1.02]], [w(4, 0), [-10, -380, 1.03]], [N[1].T, [10, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 0), [0, -385, 1.02]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(8, 0), [10, -385, 1.03]], [w(8, 13), [20, -390, 1.07]], [TC, [0, -390, 1.05]],
]);

// ---------- la tienda: paredes y tejado que se dibujan, puerta, cartel ABIERTO / CERRADO ----------
// abierto: [[t, 0|1], …] (el cartel cambia en 0,2 s, sin que los dos se vean a la vez)
function tienda(id, x, t0, t1, abierto, o = {}) {
  const lineas = (de, hasta, k, wd = 5, col = '#56605a') => E.obj(id + '_l' + k, 'flecha', { t0, t1, sale: o.sale ?? 0.25, de, hasta, curva: 0, punta: false, w: wd, col,
    p: t0 <= 0 ? 1 : [[t0, 0], [t0 + 0.25 + k * 0.08, 1, 'out']], luz: o.luz, inspeccion: false });
  lineas([x - 130, 0], [x - 130, -300], 0); lineas([x + 130, 0], [x + 130, -300], 1);
  lineas([x - 160, -300], [x + 160, -300], 2, 7, '#7d8a83'); lineas([x - 150, -330], [x + 150, -330], 3, 4);
  // toldo: tres ondas bajo el tejado
  [-1, 0, 1].forEach((j, k) => E.obj(id + '_t' + k, 'flecha', { t0, t1, sale: o.sale ?? 0.25, de: [x + j * 100 - 50, -300], hasta: [x + j * 100 + 50, -300], curva: -0.3, punta: false, w: 4, col: '#7d8a83',
    p: t0 <= 0 ? 1 : [[t0 + 0.1, 0], [t0 + 0.45 + k * 0.08, 1, 'out']], luz: o.luz, inspeccion: false }));
  const ab = abierto.map(([t, v]) => [t, v]);
  const aOpen = [], aClosed = [];
  ab.forEach(([t, v], i) => { if (i === 0) { aOpen.push([t, v]); aClosed.push([t, 1 - v]); return; }
    if (v) { aClosed.push([t, 1]); aClosed.push([t + 0.1, 0]); aOpen.push([t + 0.1, 0]); aOpen.push([t + 0.2, 1]); }
    else { aOpen.push([t, 1]); aOpen.push([t + 0.1, 0]); aClosed.push([t + 0.1, 0]); aClosed.push([t + 0.2, 1]); } });
  const sOf = () => ab.slice(1).flatMap(([t]) => [[t + 0.1, 1.35, 'out'], [t + 0.45, 1, 'back']]);
  E.obj(id + '_ab', 'rotulo', { t0, t1, sale: o.sale ?? 0.25, x, y: -255, texto: 'ABIERTO', size: 32, col: AM, peso: 700, a: aOpen, s: [[0, 1], ...sOf()], pop: true, caja: [-90, -18, 180, 36] });
  E.obj(id + '_ce', 'rotulo', { t0, t1, sale: o.sale ?? 0.25, x, y: -255, texto: 'CERRADO', size: 32, col: ROJO, peso: 700, a: aClosed, s: [[0, 1], ...sOf()], pop: true, caja: [-90, -18, 180, 36] });
  E.obj(id + '_pu', 'puerta', { t0, t1, sale: o.sale ?? 0.25, x, w: 130, h: 210, p: o.puerta ?? 0, luz: o.luz, caja: [-65, -210, 130, 210], refl: true });
}

// ---------- gancho: la tienda abierta… y cerrada ----------
// 0: Antes(0) de(1) montar(2) un(3) negocio,(4) imagina(5) que(6) ya(7) ha(8) fracasado.(9)
// 1: Así(0) ves(1) a(2) tiempo(3) el(4) fallo(5) que(6) podría(7) hundirlo.(8) Se(9) hace(10) en(11) tres(12) pasos.(13)
E.figura('yo', { t0: 0, t1: fin(0), x: -330, cara: true,
  poses: [[0, 'ofrecer'], [w(0, 5), 'pensar'], [w(0, 9), 'manos_cabeza'], [w(1, 0), 'de_pie'], [w(1, 5), 'senalar'], [w(1, 9), 'de_pie'], [w(1, 12), 'senalar']],
  sonrisa: [[0, 1.2], [w(0, 5), 0.3], [w(0, 9), -1.3], [w(1, 0), -0.3], [w(1, 5), 0.2], [w(1, 12), 1]] });
tienda('tg', 190, 0, fin(0) - 0.2, [[0, 1], [w(0, 9) - 0.05, 0]], { puerta: [[0, 0.55], [w(0, 9) - 0.1, 0.55], [w(0, 9) + 0.15, 0, 'in']], luz: [[0, 1], [w(0, 9), 1], [w(0, 9) + 0.3, 0.45]] });
E.temblor(w(0, 9), 14, 0.45); E.golpe(w(0, 9), 0.05);
// «el fallo»: aparece en rojo sobre la tienda
E.obj('fallo', 'rotulo', { t0: w(1, 4) - 0.05, t1: w(1, 9), sale: 0.2, x: 190, y: -420, texto: 'EL FALLO', size: 34, col: ROJO, peso: 700, pop: true, caja: [-90, -20, 180, 40] });
E.obj('fallo_p', 'pulso', { t0: w(1, 5), t1: w(1, 5) + 0.6, x: 190, y: -420, r0: 50, r1: 150, inspeccion: false });
E.temblor(w(1, 7), 6, 0.3);
// «tres pasos»: tres monedas; la tercera se queda y abre el primer paso
[0, 1, 2].forEach(i => { const a = w(1, 12) + i * 0.12;
  E.obj('h' + (i + 1), 'moneda', { t0: a, t1: i === 2 ? N[0].T + 0.1 : N[0].T + 0.45, entra: 0.15, x: 190 + (i - 1) * 100, y: -440, r: 34, n: i + 1, pop: true, sfx: i === 0, inspeccion: false,
    sobrevive: i === 2, s: i === 2 ? [[0, 1], [wf(1, -1), 1], [wf(1, -1) + 0.35, 1.3, 'back']] : 1 }); });
E.obj('chH', 'chispas', { t0: wf(1, -1), t1: wf(1, -1) + 0.8, x: 290, y: -440, r0: 50, r1: 140, inspeccion: false });

// ---------- 1 · imagina que ha pasado un año y el negocio ha cerrado ----------
// 2: El(0) primero:(1) imagina(2) que(3) ha(4) pasado(5) un(6) año(7) y(8) el(9) negocio(10) ha(11) cerrado.(12)   [bocadillo «Esto no puede fallar»]
// 3: No(0) te(1) preguntes(2) si(3) puede(4) salir(5) mal.(6) Da(7) por(8) hecho(9) que(10) ha(11) salido(12) mal.(13)
// 4: Así(0) dejas(1) de(2) defender(3) la(4) idea(5) y(6) empiezas(7) a(8) buscarle(9) fallos.(10)
E.numero(1, N[0].T, N[0].S, { desde: 'h3', hacia: 'meses' });
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -340, cara: true,
  poses: [[0, 'celebrar'], [w(2, 4), 'ofrecer'], [w(2, 12), 'manos_cabeza'], [w(3, 0), 'de_pie'], [w(3, 2), 'pensar'], [w(3, 7), 'senalar'], [w(4, 1), 'apartarse'], [w(4, 7), 'de_pie'], [w(4, 9), 'senalar']],
  sonrisa: [[0, 1.5], [w(2, 10), 1.2], [w(2, 12), -1.3], [w(3, 2), -0.2], [w(3, 7), 0.3], [w(4, 1), 0], [w(4, 9), 0.8]] });
E.obj('confiado', 'bocadillo', { t0: N[0].S + 0.05, t1: w(2, 4), sale: 0.15, x: -110, y: -500, w: 320, h: 80, texto: 'Esto no puede fallar', size: 27, pop: true, caja: [-160, -40, 320, 106] });
tienda('t1', 190, N[0].S - 0.1, w(3, 0), [[0, 1], [w(2, 12) - 0.05, 0]], { puerta: [[0, 0.55], [w(2, 12) - 0.1, 0.55], [w(2, 12) + 0.15, 0, 'in']], luz: [[0, 1], [w(2, 12), 1], [w(2, 12) + 0.3, 0.45]] });
// un año en el calendario: los doce meses se encienden uno tras otro y el contador suma
E.obj('cal', 'dias', { t0: w(2, 5), t1: w(3, 0), sale: 0.2, x: 175, y: -440, letras: ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'], gap: 52, pop: true,
  luz: [[w(2, 5), 0], [w(2, 11), 11, 'inout']], caja: [-316, -32, 632, 64] });
E.obj('meses', 'contador', { t0: N[0].S - 0.1, t1: w(3, 0), sale: 0.2, x: 210, y: -520, r: 50, v: [[w(2, 5), 0], [w(2, 11), 12, 'inout']], pre: '+', suf: ' meses', size: 50, col: AM, miles: false,
  a: [[0, 0], [w(2, 5) - 0.15, 0], [w(2, 5), 1]], caja: [-150, -30, 300, 60] });
E.temblor(w(2, 12), 14, 0.45); E.golpe(w(2, 12), 0.05);
// «no te preguntes si puede salir mal»: la pregunta se tacha; «da por hecho»: la certeza se rellena hasta el 100 %
E.obj('preg', 'rotulo', { t0: w(3, 0) + 0.15, t1: w(4, 0), sale: 0.2, x: 90, y: -470, texto: '¿SALDRÁ MAL?', size: 44, col: '#c9ccca', peso: 700, pop: true, track: 2, caja: [-170, -26, 340, 52] });
E.obj('tacha', 'flecha', { t0: w(3, 5), t1: w(4, 0), sale: 0.2, de: [-95, -468], hasta: [275, -468], curva: 0, punta: false, w: 7, col: ROJO, p: [[w(3, 5), 0], [w(3, 6) + 0.15, 1, 'out']], inspeccion: false });
E.sfx(w(3, 5), 'swoosh');
E.obj('seguro', 'relleno', { t0: w(3, 7) - 0.15, t1: w(4, 0), sale: 0.2, x: 30, y: -290, w: 380, h: 52, rotulo: 'HA SALIDO MAL', pct: true, pop: true,
  f: [[w(3, 8), 0], [wf(3, -1), 1, 'inout']], barrido: [wf(3, -1)], caja: [-190, -70, 520, 100] });
E.sfx(w(3, 8), 'fill');
// «buscarle fallos»: la tienda cerrada vuelve y salen los fallos, uno a uno; el contador los suma
tienda('t4', 190, w(4, 0) - 0.1, fin(1), [[0, 0]], { luz: 0.55 });
[[100, -400], [190, -420], [280, -400]].forEach(([x, y], i) => { const a = w(4, 9) + i * 0.3;
  E.obj('f4_' + i, 'rotulo', { t0: a, t1: N[1].T, sale: 0.2, x, y, texto: '!', size: 64, col: ROJO, peso: 800, pop: true, caja: [-18, -34, 36, 68] });
  E.obj('f4p_' + i, 'pulso', { t0: a, t1: a + 0.6, x, y, r0: 30, r1: 90, inspeccion: false }); });
E.obj('fallos', 'contador', { t0: w(4, 7), t1: fin(1), x: 190, y: -515, r: 50, sobrevive: true, v: [[w(4, 9), 0], [w(4, 9) + 0.65, 3, 'lin']], suf: ' fallos', size: 46, col: AM, miles: false, pop: true, caja: [-130, -28, 260, 56] });

// ---------- 2 · apunta los tres motivos más probables ----------
// 5: El(0) segundo:(1) apunta(2) los(3) tres(4) motivos(5) más(6) probables(7) por(8) los(9) que(10) ha(11) cerrado.(12)
// 6: Por(0) ejemplo:(1) pocos(2) clientes,(3) precios(4) demasiado(5) bajos(6) o(7) falta(8) de(9) dinero(10) antes(11) de(12) tiempo.(13)
E.numero(2, N[1].T, N[1].S, { desde: 'fallos', hacia: 'lista5' });
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -390, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'escribir'], [w(6, 0), 'senalar'], [w(6, 8), 'pensar'], [wf(6, -1), 'senalar']],
  sonrisa: [[w(5, 2), 0.4], [w(6, 2), 0], [w(6, 8), -0.4], [wf(6, -1), 0.8]] });
E.obj('lista5', 'lista', { t0: N[1].S - 0.1, t1: w(6, 0) + 0.1, sale: 0.25, x: 90, y: -310, n: 3, w: 400, gap: 100, r: 70,
  p: [[w(5, 3), 0], [wf(5, -1), 3, 'inout']], brillo: [[w(5, 6), 0], [wf(5, -1), 3, 'inout']], caja: [-200, -118, 400, 236] });
E.obj('motivos', 'contador', { t0: w(5, 3) - 0.1, t1: w(6, 0) + 0.1, sale: 0.25, x: 90, y: -500, v: [[w(5, 3), 0], [wf(5, -1), 3, 'inout']], suf: ' motivos', size: 50, col: 'txt', miles: false, pop: true, caja: [-150, -30, 300, 60] });
E.sfx(w(5, 3), 'fill');
// los tres motivos, cada uno con su probabilidad que se rellena
const MOT = [['POCOS CLIENTES', 0.62, w(6, 2)], ['PRECIOS BAJOS', 0.35, w(6, 4)], ['SIN DINERO', 0.48, w(6, 8)]];
MOT.forEach(([s, f, a], i) => {
  E.obj('mot' + i, 'relleno', { t0: a - 0.1, t1: i === 0 ? fin(2) : N[2].T, sale: 0.2, x: 20, y: -440 + i * 125, w: 360, h: 42, rotulo: s, pct: true, pop: true,
    sobrevive: i === 0, r: 70, f: [[a + 0.05, 0], [a + 0.75, f, 'out']], luz: i === 0 ? 1 : [[0, 1], [wf(6, -1), 1], [wf(6, -1) + 0.3, 0.45]],
    barrido: i === 0 ? [wf(6, -1)] : null, caja: [-180, -68, 510, 92] });
  E.sfx(a + 0.05, 'fill'); });
E.obj('mot0p', 'pulso', { t0: wf(6, -1), t1: wf(6, -1) + 0.6, x: 20, y: -440, r0: 120, r1: 260, inspeccion: false });
E.obj('chM', 'chispas', { t0: wf(6, -1), t1: wf(6, -1) + 0.8, x: 290, y: -440, r0: 40, r1: 120, inspeccion: false });

// ---------- 3 · ponle remedio hoy mismo al motivo más probable ----------
// 7: El(0) tercero:(1) ponle(2) remedio(3) hoy(4) mismo(5) al(6) motivo(7) más(8) probable.(9)
// 8: Si(0) el(1) motivo(2) es(3) la(4) falta(5) de(6) clientes,(7) empieza(8) a(9) vender(10) antes(11) de(12) abrir.(13)
E.numero(3, N[2].T, N[2].S, { desde: 'mot0', hacia: 'riesgo' });
E.figura('yo3', { t0: N[2].S - 0.1, t1: TC, x: -360, cara: true,
  poses: [[0, 'de_pie'], [w(7, 2), 'meter'], [w(7, 6), 'senalar'], [w(8, 0), 'de_pie'], [w(8, 5), 'pensar'], [w(8, 8), 'ofrecer'], [w(8, 13), 'celebrar']],
  sonrisa: [[w(7, 2), 0.5], [w(8, 5), 0], [w(8, 8), 0.8], [w(8, 13), 1.6]] });
E.obj('riesgo', 'relleno', { t0: N[2].S - 0.1, t1: w(8, 0) + 0.1, sale: 0.2, x: 30, y: -360, w: 420, h: 56, r: 70, rotulo: 'POCOS CLIENTES', pct: true,
  f: [[w(7, 3), 0.62], [wf(7, -1), 0.08, 'inout']], caja: [-210, -78, 580, 110] });
E.obj('hoy', 'rotulo', { t0: w(7, 4) - 0.05, t1: w(8, 0) + 0.1, sale: 0.2, x: 30, y: -500, texto: 'HOY', size: 44, col: AM, peso: 700, pop: true, caja: [-60, -26, 120, 52] });
E.obj('ch7', 'chispas', { t0: wf(7, -1), t1: wf(7, -1) + 0.8, x: 30, y: -360, r0: 120, r1: 230, inspeccion: false });
E.golpe(wf(7, -1), 0.04);
// «vender antes de abrir»: la tienda cerrada recibe clientes antes de abrir; al «abrir», el cartel vuelve a ABIERTO
tienda('t8', 200, w(8, 0) - 0.1, TC, [[0, 0], [w(8, 13) - 0.05, 1]], { puerta: [[0, 0], [w(8, 13), 0], [w(8, 13) + 0.4, 0.6, 'out']], luz: [[0, 0.55], [w(8, 13) - 0.1, 0.55], [w(8, 13) + 0.2, 1]] });
E.obj('clientes', 'contador', { t0: w(8, 7), t1: TC, x: 200, y: -470, v: [[w(8, 8), 0], [w(8, 13), 40, 'inout']], suf: ' clientes', size: 50, col: AM, miles: false, pop: true, barrido: [w(8, 13)], caja: [-170, -30, 340, 60] });
for (let i = 0; i < 6; i++) { const a = w(8, 8) + i * 0.28;
  E.obj('cl8_' + i, 'pieza', { t0: a, t1: a + 0.75, entra: 0.06, sale: 0.15, r: 22, texto: '€', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, -250], [a + 0.7, 200, 'inout']], y: [[a, -330], [a + 0.35, -420], [a + 0.7, -120, 'in']] }); }
E.obj('rayos8', 'rayos', { t0: w(8, 13), t1: TC, x: 200, y: -250, r: 360, z: -2, p: [[w(8, 13), 0], [w(8, 13) + 0.4, 0.9, 'out']], inspeccion: false });
E.obj('ch8', 'chispas', { t0: w(8, 13), t1: w(8, 13) + 0.8, x: 200, y: -255, r0: 110, r1: 220, inspeccion: false });
E.destello(w(8, 13), 0.15);

// ---------- cierre: resumen y envío ----------
// 9: Más(0) vale(1) saber(2) hoy(3) por(4) qué(5) cerraría(6) que(7) enterarte(8) dentro(9) de(10) un(11) año.(12)
// 10: Mándaselo(0) a(1) ese(2) amigo(3) que(4) está(5) a(6) punto(7) de(8) montar(9) un(10) negocio.(11)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(9, 6), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, items: ['Ya cerró', 'Tres motivos', 'Remedio'], gap: 250,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(9, 6)], caja: [-370, -60, 740, 200] });
E.obj('confC', 'confeti', { t0: wf(9, -1), t1: wf(9, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(9, -1), 0.2); E.golpe(wf(9, -1), 0.04);
E.figura('yoF', { t0: w(10, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(10, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(10, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(10, 9)], vuelo: [[wf(10, -1), 0], [wf(10, -1) + 0.5, 1, 'in']] });
