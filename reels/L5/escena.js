// L5 · Cuatro reglas para cobrar más si trabajas por tu cuenta (estilo B, pulso de B-R3 con dos personajes como B-R5; reglas 15, 19, 20)
// Gancho visual (REDACCION §2c): fotograma 0 con el autónomo, el cliente y su «Es un cambio rapidito»; las horas suben y el precio cae a 0 €.
// Regla 20: lo que dice el autónomo (y el cliente) va en bocadillo; la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'degradado', sub: 'dos', subY: 680, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 4, estilo: 'barras', aparece: w(1, 0), gap: 70 } });

// «La primera: // …» → T en «La», S en la primera palabra de la regla
const N = [2, 5, 8, 11].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(14, 0) - 0.1;

E.camara([
  [0, [0, -380, 1.04]], [w(0, 9), [0, -385, 1.07]], [w(1, 0), [0, -380, 1.02]], [N[0].T, [20, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [0, -385, 1.04]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(7, 5), [0, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [N[3].T, [30, -390, 1.05]],
  [N[3].S - 0.05, [0, -380, 1], 'lin'], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Ese(0) «es(1) un(2) cambio(3) pequeño»(4) ya(5) te(6) ha(7) costado(8) horas(9) sin(10) cobrar(11)
// 1: Cuatro(0) reglas(1) para(2) cobrar(3) más(4) La(5) última(6) lo(7) corta(8) de(9) raíz(10)
E.figura('yo', { t0: 0, t1: fin(0), x: -340, cara: true,
  poses: [[0, 'ofrecer'], [w(0, 5), 'encoger'], [w(0, 9), 'manos_cabeza'], [w(1, 0), 'de_pie'], [w(1, 8), 'celebrar']],
  sonrisa: [[0, 0.6], [w(0, 5), -0.3], [w(0, 9), -1], [w(1, 0), 0], [w(1, 8), 1.5]] });
E.figura('cli', { t0: 0, t1: fin(0), x: 340, dir: -1, color: 'gris', poses: [[0, 'senalar'], [w(0, 5), 'de_pie'], [w(1, 8), 'encoger']] });
E.obj('rapidito', 'bocadillo', { t0: 0, t1: w(1, 9) + 0.15, sale: 0.15, x: 40, y: -470, w: 460, h: 100, texto: 'Es un cambio pequeño', size: 34,
  luz: [[w(1, 7), 1], [w(1, 9), 0.4]], caja: [-230, -50, 460, 126] });
// las horas suben… y el precio de esas horas se queda en 0 €
E.obj('horasH', 'contador', { t0: w(0, 5) - 0.1, t1: w(1, 0), x: -20, y: -320, v: [[w(0, 5), 0], [wf(0, 11), 9, 'inout']], suf: ' h', size: 64, col: 'txt', miles: false, pop: true, caja: [-90, -38, 180, 76] });
E.obj('precioH', 'etiqueta', { t0: w(0, 5) - 0.1, t1: fin(0), x: -10, y: -170, w: 300, h: 130, pop: true, estela: 4,
  v: [[w(0, 5), 300], [w(0, 8), 300], [wf(0, 11), 0, 'in']], on: [[wf(0, 11) - 0.2, 1], [wf(0, 11), 0], [w(1, 0), 0], [w(1, 3), 1]], caja: [-150, -65, 300, 130] });
E.temblor(wf(0, 11) - 0.05, 18, 0.5); E.golpe(wf(0, 11) - 0.05, 0.05);
// «Cuatro reglas»: cuatro monedas; «lo corta de raíz»: un tijeretazo cruza el bocadillo del cliente
[0, 1, 2, 3].forEach(i => { const a = w(1, 0) + i * 0.12; E.obj('regla' + i, 'moneda', { t0: a, t1: fin(0), x: -135 + i * 90, y: -320, r: 30, n: i + 1, pop: true, sfx: i === 0, inspeccion: false, sobrevive: i === 3 }); });
E.obj('tijera', 'pieza', { t0: w(1, 7) - 0.1, t1: w(1, 9) + 0.25, sale: 0.15, r: 34, texto: '✂', libre: true, estela: 6, inspeccion: false,
  x: [[w(1, 7) - 0.1, -200], [w(1, 9), 300, 'inout']], y: -470, rot: [[w(1, 7), 0], [w(1, 9), 0.3]] });
E.obj('chH', 'chispas', { t0: w(1, 8) + 0.1, t1: w(1, 8) + 0.9, x: 40, y: -470, r0: 120, r1: 260, n: 16, inspeccion: false });
E.destello(w(1, 8) + 0.1, 0.3); E.golpe(w(1, 8) + 0.1, 0.05);

// ---------- 1 · pregunta su presupuesto antes de dar el tuyo ----------
// 2: La(0) primera(1) pregúntale(2) al(3) cliente(4) cuánto(5) quiere(6) gastarse(7) antes(8) de(9) dar(10) tu(11) precio(12)
// 3: Que(0) diga(1) él(2) la(3) cifra(4) primero(5)   4: A(0) veces(1) es(2) más(3) de(4) lo(5) que(6) ibas(7) a(8) pedir(9)
E.numero(1, N[0].T, N[0].S, { desde: 'regla3', hacia: 'tag2' });
E.figura('yo2', { t0: N[0].S - 0.1, t1: fin(1), x: -340, cara: true,
  poses: [[0, 'de_pie'], [w(2, 2), 'ofrecer'], [w(3, 0), 'pensar'], [w(4, 3), 'senalar'], [wf(4, -1), 'celebrar']], sonrisa: [[w(4, 3), 0.3], [wf(4, -1), 1.6]] });
E.figura('cli2', { t0: N[0].S - 0.1, t1: fin(1), x: 340, dir: -1, color: 'gris', poses: [[0, 'de_pie'], [w(2, 5), 'pensar'], [w(3, 1), 'ofrecer']] });
E.obj('preg', 'bocadillo', { t0: w(2, 2) - 0.1, t1: w(3, 1), x: 0, y: -470, w: 470, h: 100, texto: '¿Qué presupuesto tenéis?', size: 34, on: 1, pop: true, caja: [-235, -50, 470, 126] });
E.obj('cifraCli', 'bocadillo', { t0: w(3, 1), t1: w(4, 3), x: 170, y: -470, w: 150, h: 90, on: 0, pop: true, caja: [-75, -45, 150, 116] });
E.obj('tag2', 'etiqueta', { t0: N[0].S - 0.1, t1: fin(1), x: 0, y: -300, w: 300, h: 130, r: 70, sobrevive: true, barrido: [wf(4, -1) - 0.1],
  v: [[0, 800], [w(4, 3), 800], [wf(4, -1), 1500, 'inout']], on: [[w(4, 3), 0], [w(4, 4), 1]], caja: [-150, -65, 300, 130] });
E.obj('rot2', 'rotulo', { t0: N[0].S, t1: fin(1), x: 0, y: -195, texto: [[0, 'TU IDEA'], [w(4, 4), 'SU PRESUPUESTO']], caja: [-130, -16, 260, 32] });
E.obj('rayos2', 'rayos', { t0: w(4, 3), t1: fin(1), x: 0, y: -300, r: 300, z: -2, p: [[w(4, 3), 0], [wf(4, -1), 1, 'out']], inspeccion: false });
E.obj('ch2', 'chispas', { t0: wf(4, -1), t1: wf(4, -1) + 0.8, x: 0, y: -300, r0: 150, r1: 250, n: 14, inspeccion: false });
E.obj('conf2', 'confeti', { t0: wf(4, -1), t1: wf(4, -1) + 1.6, x: 0, y: -360, dur: 1.5, n: 30, fuerza: 700, inspeccion: false });
E.golpe(wf(4, -1), 0.05);

// ---------- 2 · di tu precio y cállate ----------
// 5: La(0) segunda(1) di(2) tu(3) precio(4) y(5) guarda(6) silencio(7)   6: Y(0) sin(1) dar(2) explicaciones(3)
// 7: Se(0) hace(1) un(2) silencio(3) incómodo(4) Aguántalo(5) si(6) hablas(7) tú(8) primero(9) acabas(10) bajándolo(11)
E.numero(2, N[1].T, N[1].S, { desde: 'tag2', hacia: 'precio2' });
E.figura('yo1', { t0: N[1].S - 0.1, t1: fin(2), x: -340, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'ofrecer'], [w(5, 6), 'de_pie'], [w(7, 5), 'pensar'], [w(7, 7), 'ofrecer'], [w(7, 11), 'triste']],
  sonrisa: [[w(5, 4), 0.6], [w(7, 7), 0.2], [w(7, 11), -1]] });
E.figura('cli1', { t0: N[1].S - 0.1, t1: fin(2), x: 340, dir: -1, color: 'gris', poses: [[0, 'de_pie'], [w(7, 0), 'pensar'], [w(7, 11), 'celebrar']] });
E.obj('son', 'bocadillo', { t0: w(5, 2) - 0.1, t1: w(6, 3), x: -30, y: -470, w: 300, h: 100, texto: 'Son 1.200 €', size: 40, on: 1, pop: true, barrido: [w(5, 4)], caja: [-150, -50, 300, 126] });
E.obj('precio2', 'etiqueta', { t0: N[1].S - 0.1, t1: fin(2), x: 0, y: -300, w: 300, h: 120, r: 70, sobrevive: true,
  v: [[0, 1200], [w(7, 10), 1200], [wf(7, -1) + 0.2, 950, 'inout']], on: [[w(7, 10), 1], [wf(7, -1), 0.35]], caja: [-150, -60, 300, 120] });
E.obj('voz', 'ondas', { t0: N[1].S - 0.1, t1: fin(2), x: -130, y: -150, n: 7,
  amp: [[w(5, 2), 0.1], [w(5, 2) + 0.2, 1], [w(5, 6), 1], [w(6, 1), 0], [w(7, 6), 0], [w(7, 7), 1], [w(7, 10), 1], [wf(7, -1), 0.2]], r: 50, caja: [-90, -50, 180, 100] });
E.obj('silencio', 'contador', { t0: w(7, 0), t1: w(7, 6), x: 150, y: -150, v: [[w(7, 0), 0], [w(7, 5), 3, 'lin']], suf: ' s', size: 84, col: 'txt', miles: false, pop: true, caja: [-90, -50, 180, 100] });
E.temblor(w(7, 11), 16, 0.45); E.golpe(w(7, 11), 0.04);

// ---------- 3 · cobra los extras aparte ----------
// 8: La(0) tercera(1) cobra(2) los(3) extras(4) aparte(5)
// 9: Si(0) te(1) piden(2) algo(3) que(4) no(5) entraba(6) en(7) el(8) presupuesto(9) no(10) lo(11) regales(12)
// 10: Ponle(0) precio(1) y(2) déjalo(3) por(4) escrito(5)
E.numero(3, N[2].T, N[2].S, { desde: 'precio2', hacia: 'extra' });
E.figura('yo3', { t0: N[2].S - 0.1, t1: fin(3), x: -360, cara: true, toca: ['extra'],
  poses: [[0, 'de_pie'], [w(8, 2), 'ofrecer'], [w(9, 10), 'senalar'], [w(10, 0), 'ofrecer'], [w(10, 3), 'escribir'], [wf(10, -1), 'celebrar']], sonrisa: [[wf(10, -1), 1.5]] });
E.figura('cli3', { t0: N[2].S - 0.1, t1: fin(3), x: 360, dir: -1, color: 'gris', poses: [[0, 'de_pie'], [w(9, 2), 'ofrecer'], [w(9, 10), 'encoger']] });
E.obj('aparte', 'bocadillo', { t0: w(8, 2) - 0.1, t1: w(9, 2), x: -10, y: -470, w: 430, h: 100, texto: 'Eso lo cobro aparte', size: 34, on: 1, pop: true, caja: [-215, -50, 430, 126] });
E.obj('extra', 'pieza', { t0: N[2].S - 0.1, t1: fin(3), r: 36, texto: '+', libre: true, estela: 5, sobrevive: true,
  x: [[0, 260], [w(9, 2), 260], [w(9, 9), 0, 'inout']], y: [[0, -330], [w(9, 2), -330], [w(9, 5), -460, 'out'], [w(9, 9), -330, 'in']],
  on: [[w(9, 9), 0.5], [w(10, 1), 1]], caja: [-36, -36, 72, 72] });
E.obj('pulso3', 'pulso', { t0: w(9, 10), t1: w(9, 10) + 0.6, x: 0, y: -330, r0: 30, r1: 120, inspeccion: false });
E.obj('tag3', 'etiqueta', { t0: w(10, 0), t1: fin(3), x: 0, y: -200, w: 240, h: 96, pop: true, barrido: [wf(10, 1)], v: [[w(10, 0), 0], [wf(10, 1), 150, 'out']], caja: [-120, -48, 240, 96] });
E.obj('escrito', 'lista', { t0: w(10, 3) - 0.1, t1: fin(3), x: -10, y: -460, s: 1.35, n: 2, w: 240, gap: 50, pop: true, p: [[w(10, 3), 0], [wf(10, -1), 2, 'lin']], caja: [-120, -45, 240, 90] });
E.obj('ch3', 'chispas', { t0: wf(10, -1), t1: wf(10, -1) + 0.8, x: 0, y: -200, r0: 100, r1: 190, inspeccion: false });
E.golpe(wf(10, 1), 0.04);

// ---------- 4 · avisa antes de empezar de que los cambios se pagan ----------
// 11: La(0) cuarta(1) antes(2) de(3) empezar(4) avisa(5) de(6) que(7) los(8) cambios(9) se(10) pagan(11)
// 12: Los(0) cambios(1) siempre(2) llegan(3) a(4) mitad(5) del(6) trabajo(7)   13: Si(0) no(1) lo(2) has(3) dicho(4) antes(5) los(6) acabas(7) pagando(8) tú(9)
E.numero(4, N[3].T, N[3].S, { desde: 'extra', hacia: 'alcance' });
E.figura('yo4', { t0: N[3].S - 0.1, t1: TC, x: -370, cara: true,
  poses: [[0, 'de_pie'], [w(11, 2), 'ofrecer'], [w(12, 0), 'senalar'], [w(13, 0), 'pensar'], [w(13, 6), 'triste']], sonrisa: [[w(11, 9), 1], [w(13, 6), -1]] });
E.obj('avisa', 'bocadillo', { t0: w(11, 2) - 0.1, t1: w(12, 0) + 0.3, x: -10, y: -470, w: 540, h: 100, texto: 'Si luego cambiáis cosas, se cobran', size: 28, on: 1, pop: true, caja: [-270, -50, 540, 126] });
E.obj('alcance', 'anillo', { t0: N[3].S - 0.1, t1: TC, x: 110, y: -330, rx: 230, ry: 160, w: 5, chispa: false, rodea: true, r: 120,
  p: [[N[3].S, 0], [N[3].S + 0.8, 1, 'out']], caja: [-235, -165, 470, 330] });
['A', 'B', 'C'].forEach((k, i) => E.obj('dentro' + k, 'pieza', { t0: N[3].S + 0.3 + i * 0.15, t1: TC, x: 110 + (i - 1) * 90, y: -330, r: 32, pop: true,
  on: [[0, 0.35], [w(11, 9) + i * 0.15, 0.35], [w(11, 9) + i * 0.15 + 0.2, 1]], sfx: false, barrido: [w(11, 11) + i * 0.1] }));
// los cambios llegan a mitad del trabajo y rebotan contra el anillo (se pagan aparte)
const golpes4 = [w(12, 1), w(12, 3), w(12, 5)];
golpes4.forEach((tg, i) => {
  const sx = i % 2 ? 400 : -270, sy = -500 + i * 60, ex = 110 + (i % 2 ? 235 : -235) * 0.92, ey = -330 + (i - 1) * 70;
  E.obj('fuera' + i, 'pieza', { t0: tg - 0.6, t1: tg + 0.8, sale: 0.25, r: 26, texto: '+', on: 0.3, libre: true, sfx: false, estela: 4,
    x: [[tg - 0.6, sx], [tg, ex, 'in'], [tg + 0.6, sx * 1.05, 'out']], y: [[tg - 0.6, sy], [tg, ey, 'in'], [tg + 0.6, sy - 40, 'out']] });
  E.obj('choque' + i, 'pulso', { t0: tg, t1: tg + 0.6, x: ex, y: ey, r0: 20, r1: 80, inspeccion: false });
  E.sfx(tg, 'thud');
});
// «Si no lo has dicho antes, los acabas pagando tú»: tres cambios se cuelan dentro, en gris
const tc = w(13, 6);
[0, 1, 2].forEach(i => { const a = tc - 0.5 + i * 0.12;
  E.obj('comes' + i, 'pieza', { t0: a, t1: TC, r: 22, texto: '+', on: 0.15, libre: true, estela: 4, sfx: false, inspeccion: false,
    x: [[a, 380], [a + 0.5, 30 + i * 80, 'in']], y: [[a, -520], [a + 0.5, -270 - (i % 2) * 40, 'in']] }); });
E.temblor(w(13, 8), 14, 0.45); E.golpe(w(13, 8), 0.04);

// ---------- cierre: resumen (vuelve al gancho) y envío ----------
// 14: Al(0) final(1) cobrar(2) más(3) es(4) saber(5) qué(6) decir(7)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(15, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(14, 5), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(15, 0), capa: 'pantalla', x: 540, y: 960, items: ['Pregunta', 'Silencio', 'Aparte', 'Encargo'], gap: 210,
  p: [[TC, 0], [TC + 0.9, 4, 'lin']], barrido: [w(14, 5)], caja: [-420, -60, 840, 200] });
E.obj('confC', 'confeti', { t0: wf(14, -1), t1: wf(14, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 54, inspeccion: false });
E.destello(wf(14, -1), 0.25); E.golpe(wf(14, -1), 0.04);
E.figura('yoF', { t0: w(15, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(15, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(15, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(15, 10)], vuelo: [[wf(15, -1), 0], [wf(15, -1) + 0.5, 1, 'in']] });
