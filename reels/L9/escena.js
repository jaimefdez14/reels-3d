// L9 · Tres cosas antes de gastar la paga extra (estilo B; regla 15: satisfying; gancho visual REDACCION §2c)
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'degradado', sub: 'dos', subY: 680, polvo: true, gancho: { lineas: [0], escala: 1.25 }, progreso: { n: 3, estilo: 'barras', aparece: w(1, 0), gap: 70 } });

// T = «La primera / segunda / tercera», S = la escena nueva entra con el nombre del punto
const N = [2, 5, 8].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(11, 0) - 0.1; // resumen

E.camara([
  [0, [0, -380, 1]], [w(0, 10), [-20, -390, 1.05]], [N[0].T, [0, -395, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [20, -390, 1.05]], [N[1].T, [20, -390, 1.05]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(7, 0), [-20, -395, 1.06]], [N[2].T, [-20, -395, 1.06]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(10, 0), [20, -390, 1.05]], [TC, [0, -395, 1.05]],
]);

// ---------- gancho: la PAGA EXTRA llena; los días pasan y las monedas se van volando hasta «0 €» ----------
// 0: Cobras(0) la(1) paga(2) extra(3) de(4) diciembre(5) y(6) a(7) las(8) dos(9) semanas(10) ya(11) no(12) queda(13) nada(14)
// 1: Antes(0) de(1) gastarla,(2) haz(3) tres(4) cosas.(5) La(6) segunda(7) es(8) la(9) que(10) más(11) te(12) ahorra.(13)
E.figura('yo', { t0: 0, t1: fin(0), x: -200, cara: true, toca: ['pila'],
  poses: [[0, 'celebrar'], [w(0, 6), 'de_pie'], [w(0, 12), 'triste'], [w(1, 0), 'de_pie'], [w(1, 7), 'senalar']],
  sonrisa: [[0, 1.3], [w(0, 6), 0.2], [w(0, 12), -1], [w(1, 0), -0.4], [w(1, 11), 1.2]] });
E.obj('rayosH', 'rayos', { t0: 0, t1: fin(0), x: 150, y: -140, r: 360, z: -2, p: [[0, 0.9], [w(0, 6), 0.9], [w(0, 10), 0], [w(1, 7), 0], [w(1, 11), 1, 'out']], inspeccion: false });
E.obj('rotPaga', 'rotulo', { t0: 0, t1: w(0, 12), x: 150, y: -290, texto: 'PAGA EXTRA', size: 30, col: '#c9ccca', caja: [-110, -16, 220, 32] });
E.obj('pila', 'pila', { t0: 0, t1: fin(0), x: 150, n: 9, w: 190, hh: 30, barrido: [w(0, 2) - 0.1],
  k: [[0, 9], [w(0, 6), 9], [w(0, 13), 0, 'in']], caja: [-95, -250, 190, 250], refl: true });
for (let i = 0; i < 7; i++) { const a = w(0, 6) + i * 0.17;
  E.obj('vuela' + i, 'moneda', { t0: a, t1: a + 0.8, entra: 0.05, sale: 0.2, r: 26, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, 150], [a + 0.8, 520 + i * 40, 'in']], y: [[a, -230 + i * 12], [a + 0.35, -520 - (i % 3) * 30, 'out'], [a + 0.8, -300, 'in']] }); }
E.obj('diaH', 'contador', { t0: 0, t1: w(0, 12), x: 150, y: -365, v: [[0, 1], [w(0, 6), 1], [w(0, 10) + 0.1, 14, 'inout']], pre: 'día', size: 64, col: 'txt', miles: false,
  luz: [[w(0, 10), 1], [w(0, 12), 0.2]], caja: [-120, -38, 240, 76] });
E.obj('ceroH', 'contador', { t0: w(0, 13), t1: w(1, 0) + 0.3, x: 150, y: -180, v: 0, suf: ' €', size: 110, col: '#e4574f', miles: false, pop: true, caja: [-120, -60, 240, 120] });
E.temblor(w(0, 13), 18, 0.5); E.golpe(w(0, 13), 0.05);
// «tres cosas»: tres monedas; «la segunda» crece y brilla
[0, 1, 2].forEach(i => { const a = w(1, 4) + i * 0.12;
  E.obj('cosa' + i, 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: 150 + (i - 1) * 100, y: -430, r: 34, n: i + 1, pop: true, sfx: i === 0, inspeccion: false,
    s: i === 1 ? [[0, 1], [w(1, 7), 1], [w(1, 7) + 0.35, 1.45, 'back']] : 1, luz: i === 1 ? 1 : [[0, 1], [w(1, 11), 1], [w(1, 11) + 0.3, 0.35]], barrido: i === 1 ? [w(1, 12)] : null }); });
E.obj('chC', 'chispas', { t0: w(1, 13), t1: w(1, 13) + 0.8, x: 150, y: -430, r0: 50, r1: 130, inspeccion: false });
E.destello(w(1, 11), 0.18);

// ---------- 1 · aparta la mitad el mismo día: media pila vuela al tarro AHORRO y se cierra ----------
// 2: La(0) primera:(1) aparta(2) la(3) mitad(4) el(5) mismo(6) día(7) que(8) la(9) cobras(10)
// 3: Pásala(0) a(1) otra(2) cuenta(3) antes(4) de(5) tocar(6) nada(7) · 4: Lo(0) que(1) no(2) tienes(3) a(4) mano(5) no(6) te(7) lo(8) gastas(9)
E.numero(1, N[0].T, N[0].S, { desde: 'cosa0', hacia: 'pila1' });
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -40, cara: true, toca: ['pila1', 'tarro'],
  poses: [[0, 'de_pie'], [w(2, 2), 'coger'], [w(2, 6), 'meter'], [w(3, 0), 'senalar'], [w(4, 0), 'de_pie'], [w(4, 6), 'celebrar']],
  sonrisa: [[w(2, 4), 0.4], [w(4, 6), 1.4]] });
E.obj('pila1', 'pila', { t0: N[0].S - 0.1, t1: fin(1), x: 200, n: 10, w: 190, hh: 28, k: [[N[0].S, 0], [N[0].S + 0.7, 10, 'out'], [w(2, 4), 10], [wf(2, -1), 5, 'inout']],
  barrido: [N[0].S + 0.7], caja: [-95, -250, 190, 250], refl: true, sobrevive: true, r: 70, oy: -110 });
E.obj('tarro', 'tarro', { t0: w(2, 2) - 0.2, t1: fin(1), x: -330, pop: true, rotulo: 'AHORRO', nivel: [[w(2, 4), 0], [wf(2, -1), 0.5, 'inout']],
  tapa: [[w(3, 3), 0], [w(3, 7), 1, 'out']], luz: [[w(4, 0), 1], [w(4, 3), 0.35], [w(4, 9), 0.35], [wf(4, -1), 1]],
  barrido: [wf(4, -1) - 0.1], w: 200, h: 270, caja: [-100, -270, 200, 270], refl: true });
for (let i = 0; i < 5; i++) { const a = w(2, 4) + i * 0.2;
  E.obj('m1_' + i, 'moneda', { t0: a, t1: a + 0.9, entra: 0.08, sale: 0.15, r: 22, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, 200], [a + 0.85, -330, 'inout']], y: [[a, -230 + i * 14], [a + 0.42, -480], [a + 0.85, -170, 'in']] }); }
E.obj('pct1', 'contador', { t0: w(2, 3) - 0.1, t1: w(3, 2) - 0.05, sale: 0.15, x: -330, y: -330, v: [[w(2, 4), 0], [wf(2, -1), 50, 'inout']], suf: ' %', size: 58, col: 'txt', miles: false, pop: true, caja: [-95, -34, 190, 68] });
E.obj('rotCta', 'rotulo', { t0: w(3, 2), t1: fin(1), x: -330, y: -330, texto: 'OTRA CUENTA', size: 26, col: '#c9ccca', pop: true, caja: [-100, -16, 200, 32] });
E.golpe(w(3, 7), 0.04); // la tapa se cierra
E.obj('ch1', 'chispas', { t0: wf(4, -1) - 0.1, t1: wf(4, -1) + 0.7, x: -330, y: -150, r0: 120, r1: 220, inspeccion: false });
E.sfx(w(2, 4), 'fill');

// ---------- 2 · con lo que queda, paga antes las deudas: la deuda baja a 0 € y la barra de PAGADO se llena ----------
// 5: La(0) segunda:(1) con(2) lo(3) que(4) queda,(5) paga(6) antes(7) las(8) deudas(9) con(10) intereses(11)
// 6: La(0) tarjeta,(1) el(2) préstamo(3) del(4) coche,(5) lo(6) que(7) hayas(8) comprado(9) a(10) plazos(11)
// 7: Esta(0) es(1) la(2) que(3) más(4) te(5) ahorra:(6) una(7) tarjeta(8) puede(9) cobrarte(10) un(11) veinte(12) por(13) ciento(14) al(15) año(16)
E.numero(2, N[1].T, N[1].S, { desde: 'pila1', hacia: 'deuda' });
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -360, cara: true, toca: ['pila2'],
  poses: [[0, 'de_pie'], [w(5, 6), 'ofrecer'], [w(6, 0), 'senalar'], [w(7, 0), 'pensar'], [w(7, 12), 'senalar'], [wf(7, -1), 'celebrar']],
  sonrisa: [[w(5, 6), 0.2], [w(7, 12), -0.3], [wf(7, -1), 1.3]] });
E.obj('pila2', 'pila', { t0: N[1].S - 0.1, t1: fin(2), x: -160, n: 5, w: 150, hh: 26, k: [[N[1].S, 0], [N[1].S + 0.5, 5, 'out'], [w(5, 6), 5], [wf(5, -1) + 0.4, 1, 'inout']],
  caja: [-75, -200, 150, 200], refl: true });
E.obj('deuda', 'etiqueta', { t0: N[1].S - 0.1, t1: fin(2), x: 190, y: -380, w: 320, h: 130, sobrevive: true, r: 80,
  v: [[N[1].S, 1200], [w(5, 6), 1200], [wf(5, -1) + 0.4, 0, 'inout']], on: [[w(5, 6), 0], [wf(5, -1) + 0.4, 1]], barrido: [wf(5, -1) + 0.45], caja: [-160, -65, 320, 130] });
E.obj('rotDeuda', 'rotulo', { t0: N[1].S, t1: fin(2), x: 190, y: -470, texto: [[0, 'DEUDA'], [wf(5, -1) + 0.4, 'PAGADA']], size: 26, col: '#c9ccca', caja: [-80, -16, 160, 32] });
E.obj('pagado', 'relleno', { t0: w(5, 6) - 0.2, t1: fin(2), x: 120, y: -230, w: 420, h: 50, pct: true, r: 70, f: [[w(5, 6), 0], [wf(5, -1) + 0.4, 1, 'inout']],
  barrido: [wf(5, -1) + 0.45], caja: [-210, -30, 520, 60] });
for (let i = 0; i < 4; i++) { const a = w(5, 6) + i * 0.25;
  E.obj('m2_' + i, 'moneda', { t0: a, t1: a + 0.8, entra: 0.06, sale: 0.15, r: 22, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, -160], [a + 0.75, 190, 'inout']], y: [[a, -170], [a + 0.38, -560], [a + 0.75, -380, 'in']] }); }
// «La tarjeta, el préstamo del coche, lo que hayas comprado a plazos»: tres rótulos que entran en cascada
[['TARJETA', w(6, 1)], ['COCHE', w(6, 5)], ['PLAZOS', w(6, 11)]].forEach(([s, a], i) => {
  E.obj('tipo' + i, 'rotulo', { t0: a - 0.1, t1: w(7, 0), sale: 0.2, x: -60 + i * 170, y: -100, texto: s, size: 28, col: '#e6ce46', pop: true, caja: [-75, -16, 150, 32] }); });
E.obj('chD', 'chispas', { t0: wf(5, -1) + 0.4, t1: wf(5, -1) + 1.2, x: 190, y: -380, r0: 140, r1: 240, inspeccion: false });
// «la que más te ahorra: una tarjeta puede cobrarte un veinte por ciento al año»: el 20 % sube en rojo; rayos detrás
E.obj('rayos2', 'rayos', { t0: w(7, 0), t1: fin(2), x: 120, y: -380, r: 420, z: -2, p: [[w(7, 0), 0], [w(7, 5), 1, 'out']], inspeccion: false });
E.obj('interes', 'contador', { t0: w(7, 7), t1: fin(2), x: 120, y: -90, v: [[w(7, 9), 0], [w(7, 14), 20, 'out']], suf: ' % al año', size: 60, col: '#e4574f', miles: false, pop: true, caja: [-190, -36, 380, 72] });
E.temblor(w(7, 12), 12, 0.4); E.golpe(w(7, 12), 0.04);
E.obj('conf2', 'confeti', { t0: wf(7, -1), t1: wf(7, -1) + 1.9, x: 190, y: -420, n: 44, inspeccion: false }); E.destello(wf(7, -1), 0.18);

// ---------- 3 · un capricho con tope: la compra se llena hasta 60 € y se acabó ----------
// 8: La(0) tercera:(1) date(2) un(3) capricho,(4) pero(5) con(6) un(7) tope(8)
// 9: Decide(0) cuánto(1) vas(2) a(3) gastar(4) antes(5) de(6) salir(7) de(8) casa,(9) y(10) cuando(11) llegues(12) a(13) esa(14) cifra,(15) se(16) acabó(17) [bocadillo «Hoy, como mucho 60 €»]
// 10: Así(0) lo(1) disfrutas(2) sin(3) que(4) se(5) te(6) vaya(7) lo(8) que(9) te(10) queda(11)
E.numero(3, N[2].T, N[2].S, { desde: 'deuda', hacia: 'compra' });
E.figura('yo3', { t0: N[2].S - 0.1, t1: TC, x: -300, cara: true, toca: ['compra'],
  poses: [[0, 'de_pie'], [w(8, 2), 'celebrar'], [w(8, 6), 'senalar'], [w(9, 0), 'pensar'], [w(9, 10), 'senalar'], [w(9, 16), 'ofrecer'], [w(10, 0), 'celebrar']],
  sonrisa: [[w(8, 2), 1.2], [w(9, 0), 0.3], [w(10, 0), 1.5]] });
E.obj('compra', 'compra', { t0: N[2].S - 0.1, t1: TC, x: 270, y: -330, w: 280, h: 360, sobrevive: true, r: 80, ok: [[w(9, 16), 0], [w(9, 16) + 0.2, 1]], barrido: [w(8, 3), w(9, 16)],
  caja: [-140, -180, 280, 360] });
E.obj('nube3', 'bocadillo', { t0: w(9, 0) - 0.05, t1: wf(9, -1) + 0.3, x: -45, y: -525, w: 320, h: 76, texto: 'Hoy, como mucho 60 €', size: 27, pop: true,
  on: [[w(9, 0), 0], [w(9, 1), 1]], caja: [-160, -38, 320, 102] });
E.obj('tope', 'relleno', { t0: w(8, 7) - 0.2, t1: TC, x: 60, y: -90, w: 380, h: 50, r: 70, rotulo: 'TOPE', f: [[w(9, 10), 0], [w(9, 16), 1, 'inout']], barrido: [w(9, 16)], caja: [-190, -60, 380, 90] });
E.obj('gasto', 'contador', { t0: w(8, 7) - 0.2, t1: TC, x: 340, y: -90, v: [[w(9, 10), 0], [w(9, 16), 60, 'inout']], suf: ' €', size: 52, col: 'txt', miles: false, caja: [-80, -32, 160, 64] });
E.golpe(w(9, 16), 0.05); E.temblor(w(9, 16), 10, 0.35);
E.obj('ch3', 'chispas', { t0: w(10, 0), t1: w(10, 0) + 0.8, x: 270, y: -330, r0: 160, r1: 260, inspeccion: false });
E.sfx(w(9, 10), 'fill');

// ---------- cierre: resumen de las tres y envío ----------
// 11: La(0) paga(1) extra(2) no(3) se(4) nota(5) en(6) lo(7) que(8) gastas,(9) sino(10) en(11) lo(12) que(13) te(14) queda(15) en(16) enero(17)
E.obj('resumen', 'resumen', { t0: TC, t1: w(12, 0), capa: 'pantalla', x: 540, y: 960, items: ['Aparta', 'Deudas', 'Tope'], gap: 230,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], caja: [-350, -60, 700, 300] });
E.obj('confF', 'confeti', { t0: w(11, 17), t1: w(11, 17) + 2.0, capa: 'pantalla', x: 540, y: 880, n: 44, inspeccion: false, sinDim: true });
E.figura('yoF', { t0: w(12, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(12, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(12, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, vuelo: [[wf(12, -1), 0], [wf(12, -1) + 0.5, 1, 'in']] });
