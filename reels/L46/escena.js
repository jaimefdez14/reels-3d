// L46 · El efecto de dotación (estilo B; reglas 15, 20, 21, 24)
// Idea visual: dos coches iguales, el tuyo (amarillo) y «uno igual» (de línea), cada uno con su barra de precio: la tuya
// se llena entera y la del otro se queda a medias. El experimento de las tazas repite la misma pareja de barras (PEDÍAN /
// OFRECÍAN). Regla 1: la lista de lo vendido se marca y su barra se queda quieta; la del anuncio sube y baja. Regla 2: tres
// barras (ESE PRECIO, TÚ, OTRO) que acaban a la misma altura. Regla 3: barra de plazo hasta la marca FECHA LÍMITE, los
// días se encienden, ruedan «2 SEMANAS» y «−10 %» y el plazo vuelve a empezar.
// Regla 20: «Vale mucho más.» va en bocadillo del muñeco durante el gancho; la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(2, 0), gap: 70, y: 360 } });

// «La primera: // …» → T en «La», S en la primera palabra del punto
const N = [3, 5, 7].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(9, 0) - 0.1;   // resumen
const ROJO = '#e4574f';
const GRIS = '#9a9c9b';
const AM = '#e6ce46';

E.camara([
  [0, [0, -380, 1.04]], [w(0, 5), [-15, -385, 1.06]], [w(0, 12), [15, -390, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 9), [0, -385, 1.04]],
  [w(1, 15), [-15, -390, 1.06]], [wf(1, -1), [15, -385, 1.07]], [w(2, 0), [0, -380, 1.02]], [w(2, 5), [10, -385, 1.04]], [N[0].T, [10, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [15, -385, 1.04]], [w(4, 6), [-10, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 0), [-15, -385, 1.04]], [w(6, 5), [15, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(8, 0), [-10, -385, 1.04]], [w(8, 10), [10, -385, 1.05]], [TC - 0.1, [0, -385, 1.04]], [TC, [0, -390, 1.05]],
]);

// coche de lado: carrocería y techo (cápsulas: llenas = amarillo, vacías = de línea) y dos ruedas (aros)
const coche = (id, o) => { const am = o.am !== false, b = { t0: o.t0, t1: o.t1, sale: o.sale ?? 0.25, luz: o.luz ?? 1, refl: true };
  E.obj(id, 'relleno', Object.assign({}, b, { x: o.x, y: -60, w: 250, h: 62, f: am ? 1 : 0, pop: true, caja: [-125, -78, 250, 140] }));
  E.obj(id + 'T', 'relleno', Object.assign({}, b, { x: o.x - 14, y: -110, w: 136, h: 50, f: am ? 1 : 0, pop: true, sfx: false, libre: true, inspeccion: false }));
  [-74, 74].forEach((dx, i) => E.obj(id + 'R' + i, 'anillo', Object.assign({}, b, { x: o.x + dx, y: -25, rx: 22, ry: 22, w: 9, col: '#c9ccca', chispa: false, p: 1, pop: true, sfx: false, libre: true, inspeccion: false }))); };
// taza: vaso de línea que se llena y un asa
const taza = (id, o) => { E.obj(id, 'tarro', { t0: o.t0, t1: o.t1, sale: 0.25, x: o.x, w: 100, h: 120, pop: true, refl: true, nivel: o.nivel, caja: [-52, -100, 126, 100] });
  E.obj(id + 'A', 'arcoAbierto', { t0: o.t0, t1: o.t1, sale: 0.25, x: o.x + 50, y: -48, r: 22, p: 0.5, w: 5, col: '#7d8a83', pop: true, sfx: false, libre: true, inspeccion: false }); };

// ---------- gancho ----------
// 0: Cuando(0) vendes(1) tu(2) coche(3) pides(4) más(5) de(6) lo(7) que(8) pagarías(9) por(10) uno(11) igual(12)   [bocadillo «Vale mucho más.»]
// dos coches iguales con su barra de precio: las dos suben a la vez; en «pides más» la tuya se llena entera; en «uno igual» la otra sigue a medias
const CX = [-190, 260];
coche('c0a', { t0: 0, t1: w(1, 0), x: CX[0] });
coche('c0b', { t0: 0, t1: w(1, 0), x: CX[1], am: false });
E.obj('p0a', 'relleno', { t0: 0, t1: w(1, 0), sale: 0.25, x: CX[0], y: -205, w: 230, h: 36, rotulo: 'TU COCHE',
  f: [[0.1, 0], [0.6, 0.45, 'out'], [w(0, 4), 0.45], [w(0, 5) + 0.3, 1, 'out']], barrido: [w(0, 5) + 0.35], caja: [-115, -52, 230, 70] });
E.obj('p0b', 'relleno', { t0: 0, t1: w(1, 0), sale: 0.25, x: CX[1], y: -205, w: 230, h: 36, rotulo: 'UNO IGUAL',
  f: [[0.1, 0], [0.6, 0.45, 'out']], barrido: [w(0, 12)], caja: [-115, -52, 230, 70] });
E.sfx(0.1, 'fill'); E.sfx(w(0, 4), 'fill');
E.figura('yo', { t0: 0, t1: w(1, 0), sale: 0.25, x: -385, talla: 320, cara: true,
  poses: [[0, 'ofrecer'], [w(0, 4), 'levantar'], [w(0, 6) + 0.2, 'senalar'], [w(0, 9), 'encoger'], [w(0, 12) + 0.2, 'senalar']],
  sonrisa: [[0, 0.8], [w(0, 4), 1.5], [w(0, 9), 0.2], [w(0, 12), 1]] });
E.obj('bocaH', 'bocadillo', { t0: 0.3, t1: w(1, 0) - 0.1, sale: 0.2, x: -280, y: -440, w: 300, h: 76, texto: 'Vale mucho más.', size: 30, pop: true,
  on: [[0.3, 0], [0.8, 1]], caja: [-150, -38, 300, 102] });
E.obj('chH', 'chispas', { t0: w(0, 5) + 0.3, t1: w(0, 5) + 1.1, x: CX[0] + 100, y: -205, r0: 40, r1: 110, inspeccion: false });
E.golpe(w(0, 5) + 0.3, 0.05); E.destello(w(0, 5) + 0.3, 0.12);
E.temblor(w(0, 12), 12, 0.4); E.golpe(w(0, 12), 0.04);
E.obj('pulsoH', 'pulso', { t0: w(0, 12), t1: w(0, 12) + 0.6, x: CX[1], y: -205, r0: 40, r1: 140, inspeccion: false });

// 1: Se(0) llama(1) efecto(2) de(3) dotación(4) en(5) un(6) experimento(7) con(8) tazas(9) los(10) dueños(11) pedían(12) más(13) del(14) doble(15) de(16) lo(17) que(18) ofrecían(19) los(20) compradores(21)
// tres tazas que se llenan; el dueño (amarillo) levanta la mano y su barra se llena; el comprador (gris) ofrece menos de la mitad
E.figura('yo1', { t0: w(1, 0) + 0.05, t1: w(2, 0), sale: 0.25, x: -400, talla: 320, cara: true,
  poses: [[0, 'de_pie'], [w(1, 2), 'senalar'], [w(1, 5), 'de_pie'], [w(1, 7), 'ofrecer'], [w(1, 11), 'coger'], [w(1, 13), 'levantar'], [w(1, 19), 'de_pie'], [wf(1, -1), 'encoger']],
  sonrisa: [[0, 0.4], [w(1, 2), 0.8], [w(1, 13), 1.5], [w(1, 19), 0.3], [wf(1, -1), -0.4]] });
E.obj('rotEf', 'rotulo', { t0: w(1, 2) - 0.1, t1: w(1, 10) - 0.2, sale: 0.2, x: 30, y: -460, texto: 'EFECTO DE DOTACIÓN', size: 34, col: AM, peso: 700, pop: true, caja: [-250, -20, 500, 40] });
E.obj('chEf', 'chispas', { t0: w(1, 4), t1: w(1, 4) + 0.8, x: 30, y: -460, r0: 130, r1: 250, inspeccion: false });
E.golpe(w(1, 4), 0.04);
[-170, -10, 150].forEach((x, i) => taza('tz' + i, { t0: w(1, 5) - 0.2 + i * 0.14, t1: w(2, 0), x,
  nivel: [[w(1, 8) + i * 0.15, 0], [w(1, 9) + 0.3 + i * 0.15, 0.8, 'out']] }));
E.sfx(w(1, 8), 'fill');
E.obj('pedian', 'relleno', { t0: w(1, 10) - 0.05, t1: w(2, 0), sale: 0.25, x: 30, y: -440, w: 300, h: 40, pop: true, rotulo: 'PEDÍAN',
  f: [[w(1, 12), 0], [w(1, 15) + 0.2, 1, 'out']], barrido: [w(1, 15) + 0.25], caja: [-150, -54, 300, 74] });
E.sfx(w(1, 12), 'fill');
E.obj('doble', 'rotulo', { t0: w(1, 13), t1: w(2, 0), sale: 0.25, x: 30, y: -245, texto: 'MÁS DEL DOBLE', size: 28, col: AM, pop: true, caja: [-150, -16, 300, 32] });
E.obj('chDo', 'chispas', { t0: w(1, 15) + 0.2, t1: w(1, 15) + 1.0, x: 172, y: -440, r0: 40, r1: 110, inspeccion: false });
E.golpe(w(1, 15) + 0.2, 0.04);
E.obj('ofrecian', 'relleno', { t0: w(1, 16), t1: w(2, 0), sale: 0.25, x: 30, y: -335, w: 300, h: 40, pop: true, rotulo: 'OFRECÍAN',
  f: [[w(1, 19), 0], [w(1, 21), 0.4, 'out']], caja: [-150, -54, 300, 74] });
E.sfx(w(1, 19), 'fill');
E.figura('comp1', { t0: w(1, 16), t1: w(2, 0), sale: 0.25, x: 410, talla: 310, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(1, 19), 'ofrecer'], [wf(1, -1), 'encoger']], sonrisa: 0.3 });
E.temblor(w(1, 21) + 0.3, 10, 0.35);

// 2: Tres(0) reglas(1) para(2) ponerle(3) precio(4) a(5) tu(6) coche(7)
// el coche con una barra de precio que no se decide; tres monedas con los números
E.figura('yo2', { t0: w(2, 0) - 0.05, t1: fin(0), x: -360, cara: true,
  poses: [[0, 'de_pie'], [w(2, 1), 'senalar'], [w(2, 3), 'pensar'], [w(2, 6), 'senalar']], sonrisa: [[0, 0.2], [w(2, 6), 0.9]] });
coche('c2', { t0: w(2, 0), t1: fin(0), sale: 0.35, x: 150 });
E.obj('pre2', 'relleno', { t0: w(2, 3) - 0.1, t1: fin(0), x: 150, y: -210, w: 250, h: 36, pop: true, rotulo: 'PRECIO', cursor: 1,
  f: [[w(2, 3), 0], [w(2, 4) + 0.2, 0.8, 'out'], [w(2, 6), 0.35, 'inout'], [wf(2, -1), 0.6, 'inout']], caja: [-125, -52, 250, 70] });
E.sfx(w(2, 3), 'fill');
[0, 1, 2].forEach(i => { const a = w(2, 0) + i * 0.13;
  E.obj('q' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: 50 + i * 100, y: -460, r: 32, n: i + 1, pop: true, sfx: i === 0,
    s: i === 0 ? [[0, 1], [wf(2, -1), 1], [wf(2, -1) + 0.3, 1.3, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [wf(2, -1), 1], [wf(2, -1) + 0.3, 0.4]], caja: [-32, -32, 64, 64] }); });
E.destello(wf(2, -1), 0.12);

// ---------- 1 · mira lo que se ha vendido ----------
// 3: La(0) primera(1) mira(2) lo(3) que(4) se(5) ha(6) vendido(7) no(8) lo(9) que(10) se(11) pide(12)
// 4: Un(0) anuncio(1) puede(2) tener(3) cualquier(4) precio(5) Lo(6) que(7) cuenta(8) es(9) por(10) cuánto(11) se(12) vende(13)
E.numero(1, N[0].T, N[0].S, { desde: 'q1', hacia: 'vend' });
const XP = -30, XV = 290;
E.figura('yoP1', { t0: N[0].S - 0.1, t1: fin(1), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(3, 2), 'senalar'], [w(3, 8), 'apartarse'], [w(4, 0), 'encoger'], [w(4, 6), 'senalar'], [wf(4, -1), 'celebrar']],
  sonrisa: [[0, 0.3], [w(3, 2), 0.9], [w(3, 8), -0.3], [w(4, 0), -0.2], [w(4, 6), 0.8], [wf(4, -1), 1.5]] });
coche('c1', { t0: N[0].S - 0.1, t1: fin(1), x: 130 });
E.obj('rotV', 'rotulo', { t0: N[0].S, t1: fin(1), x: XV, y: -470, texto: [[0, 'VENDIDO'], [w(4, 12), 'SE VENDE']], size: 28, col: AM, pop: true, caja: [-110, -16, 220, 32] });
E.obj('vend', 'lista', { t0: N[0].S - 0.1, t1: fin(1), x: XV, y: -355, n: 3, w: 230, gap: 58, pop: true, r: 70,
  p: [[w(3, 4), 0], [w(3, 7) + 0.4, 3, 'lin']], brillo: [[w(4, 6), 0], [w(4, 9), 3, 'lin']], caja: [-115, -78, 230, 156] });
E.sfx(w(3, 4), 'fill');
E.obj('chV', 'chispas', { t0: w(3, 7) + 0.4, t1: w(3, 7) + 1.2, x: XV, y: -355, r0: 110, r1: 200, inspeccion: false });
E.golpe(w(3, 7) + 0.4, 0.03);
// «no lo que se pide»: los anuncios se amontonan a la izquierda; «cualquier precio»: su barra sube y baja sin parar
const apaga = [[0, 1], [w(4, 6), 1], [w(4, 6) + 0.3, 0.4]];
E.obj('rotP', 'rotulo', { t0: w(3, 8) - 0.1, t1: fin(1), x: XP, y: -470, texto: [[0, 'SE PIDE'], [w(4, 0), 'ANUNCIO']], size: 28, col: GRIS, pop: true, luz: apaga, caja: [-100, -16, 200, 32] });
E.obj('anun', 'papeles', { t0: w(3, 8), t1: fin(1), x: XP, y: -320, n: 5, k: [[w(3, 8), 0], [w(3, 12) + 0.2, 5, 'lin']], luz: apaga, caja: [-95, -95, 190, 110] });
E.temblor(w(3, 12), 8, 0.3);
E.obj('pide', 'relleno', { t0: w(4, 1), t1: fin(1), x: XP, y: -215, w: 200, h: 36, pop: true, luz: apaga,
  f: [[w(4, 1), 0.3], [w(4, 2) + 0.2, 1, 'inout'], [w(4, 3) + 0.2, 0.2, 'inout'], [w(4, 4) + 0.25, 0.9, 'inout'], [w(4, 5) + 0.25, 0.3, 'inout'], [w(4, 6) + 0.2, 0.75, 'inout']], caja: [-100, -18, 200, 36] });
E.sfx(w(4, 2), 'whoosh'); E.sfx(w(4, 4), 'whoosh');
// «lo que cuenta es por cuánto se vende»: la barra de lo vendido se llena una vez y se queda
E.obj('vende', 'relleno', { t0: w(4, 6) - 0.05, t1: fin(1), x: XV, y: -215, w: 240, h: 36, pop: true, sobrevive: true, r: 50,
  f: [[w(4, 9), 0], [w(4, 13) + 0.2, 0.6, 'out']], barrido: [wf(4, -1)], caja: [-120, -18, 240, 36] });
E.sfx(w(4, 9), 'fill');
E.obj('ch1', 'chispas', { t0: wf(4, -1), t1: wf(4, -1) + 0.8, x: XV, y: -215, r0: 60, r1: 150, inspeccion: false });
E.golpe(wf(4, -1), 0.04); E.destello(wf(4, -1), 0.1);

// ---------- 2 · ¿lo comprarías hoy a ese precio? ----------
// 5: La(0) segunda(1) pregúntate(2) si(3) lo(4) comprarías(5) hoy(6) a(7) ese(8) precio(9)
// 6: Si(0) tú(1) no(2) lo(3) pagas(4) no(5) esperes(6) que(7) lo(8) pague(9) otro(10)
E.numero(2, N[1].T, N[1].S, { desde: 'vende', hacia: 'precio2' });
const BX = 130;
E.figura('yoP2', { t0: N[1].S - 0.1, t1: fin(2), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'pensar'], [w(5, 8), 'senalar'], [w(6, 1), 'encoger'], [w(6, 5), 'senalar'], [w(6, 9) + 0.45, 'celebrar']],
  sonrisa: [[0, 0.2], [w(5, 2), 0], [w(5, 8), 0.5], [w(6, 1), -0.5], [w(6, 5), 0.2], [w(6, 9) + 0.45, 1.5]] });
coche('c2p', { t0: N[1].S - 0.1, t1: fin(2), x: 60 });
E.obj('precio2', 'relleno', { t0: N[1].S - 0.1, t1: fin(2), x: BX, y: -450, w: 320, h: 38, pop: true, sobrevive: true, r: 50, rotulo: 'ESE PRECIO',
  f: [[N[1].S, 0], [N[1].S + 0.55, 1, 'out'], [w(6, 9), 1], [w(6, 9) + 0.45, 0.5, 'inout']], barrido: [w(5, 8)], caja: [-160, -52, 320, 72] });
E.sfx(N[1].S, 'fill');
E.obj('hoy', 'rotulo', { t0: w(5, 6) - 0.05, t1: w(6, 0), sale: 0.2, x: 385, y: -450, texto: '¿HOY?', size: 30, col: AM, pop: true, caja: [-65, -18, 130, 36] });
E.obj('tu2', 'relleno', { t0: w(5, 5) - 0.1, t1: fin(2), x: BX, y: -345, w: 320, h: 38, pop: true, rotulo: 'TÚ', cursor: [[0, 1], [w(6, 1), 0]],
  f: [[w(6, 1), 0], [w(6, 4) + 0.2, 0.5, 'out']], caja: [-160, -52, 320, 72] });
E.sfx(w(6, 1), 'fill');
E.temblor(w(6, 4) + 0.2, 8, 0.3);
// «no esperes que lo pague otro»: llega un comprador y su barra se queda donde la tuya; el precio baja hasta ahí
E.figura('otro', { t0: w(6, 5), t1: fin(2), x: 420, talla: 300, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(6, 7), 'pensar'], [w(6, 9) + 0.1, 'encoger'], [w(6, 9) + 0.5, 'ofrecer']], sonrisa: [[0, 0], [w(6, 9) + 0.5, 1]] });
E.obj('otro2', 'relleno', { t0: w(6, 5), t1: fin(2), x: BX, y: -240, w: 320, h: 38, pop: true, rotulo: 'OTRO',
  f: [[w(6, 7), 0], [w(6, 9) + 0.1, 0.5, 'out']], caja: [-160, -52, 320, 72] });
E.sfx(w(6, 7), 'fill'); E.sfx(w(6, 9), 'whoosh');
E.obj('ch2', 'chispas', { t0: w(6, 9) + 0.45, t1: w(6, 9) + 1.25, x: BX, y: -450, r0: 40, r1: 120, inspeccion: false });
E.golpe(w(6, 9) + 0.45, 0.04); E.destello(w(6, 9) + 0.45, 0.1);

// ---------- 3 · ponle fecha límite al precio ----------
// 7: La(0) tercera(1) ponle(2) fecha(3) límite(4) al(5) precio(6)
// 8: Si(0) en(1) dos(2) semanas(3) no(4) te(5) ha(6) llegado(7) ninguna(8) oferta(9) baja(10) el(11) precio(12) un(13) diez(14) por(15) ciento(16) y(17) vuelve(18) a(19) probar(20)
E.numero(3, N[2].T, N[2].S, { desde: 'precio2', hacia: 'plazo' });
const PX = 110;
E.figura('yoP3', { t0: N[2].S - 0.1, t1: TC, x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(7, 2), 'senalar'], [w(8, 0), 'de_pie'], [w(8, 4), 'encoger'], [w(8, 8), 'triste'], [w(8, 10), 'coger'], [w(8, 14), 'senalar'], [w(8, 17), 'ofrecer'], [wf(8, -1), 'celebrar']],
  sonrisa: [[0, 0.2], [w(7, 2), 0.8], [w(8, 4), -0.3], [w(8, 8), -1], [w(8, 10), 0.2], [w(8, 17), 0.8], [wf(8, -1), 1.5]] });
E.obj('plazo', 'barra', { t0: N[2].S - 0.1, t1: TC, x: PX, y: -420, w: 420, h: 40, pop: true, marca: 0.85, rotMarca: 'FECHA LÍMITE', r: 50,
  f: [[w(7, 3), 0], [w(7, 6), 0.2, 'out'], [w(8, 1), 0.2], [w(8, 3) + 0.3, 0.85, 'lin'], [w(8, 17), 0.85], [w(8, 18), 0, 'inout'], [wf(8, -1) + 0.2, 0.3, 'out']],
  barrido: [w(8, 3) + 0.35], caja: [-210, -90, 500, 120] });
E.sfx(w(7, 3), 'fill'); E.sfx(w(8, 1), 'fill'); E.sfx(w(8, 18), 'fill');
E.obj('dias3', 'dias', { t0: N[2].S, t1: TC, x: PX, y: -300, gap: 62, pop: true,
  luz: [[w(7, 3), -1], [w(7, 6), 1, 'lin'], [w(8, 1), 1], [w(8, 2) + 0.15, 6, 'lin'], [w(8, 2) + 0.17, 0, 'lin'], [w(8, 3) + 0.3, 6, 'lin'], [w(8, 17), 6], [w(8, 18), 0, 'inout'], [wf(8, -1) + 0.2, 2, 'lin']],
  caja: [-218, -32, 436, 64] });
E.obj('sem', 'contador', { t0: w(8, 1) - 0.1, t1: w(8, 10) - 0.15, sale: 0.2, x: PX, y: -200, size: 46, col: 'txt', suf: ' SEMANAS', miles: false, pop: true,
  v: [[w(8, 1), 0], [w(8, 2) + 0.15, 1, 'out'], [w(8, 3) + 0.3, 2, 'out']], barrido: [w(8, 3) + 0.35], caja: [-150, -28, 300, 56] });
E.obj('chS', 'chispas', { t0: w(8, 3) + 0.3, t1: w(8, 3) + 1.1, x: PX - 210 + 8 + 404 * 0.85, y: -420, r0: 40, r1: 110, inspeccion: false });
E.golpe(w(8, 3) + 0.3, 0.03);
E.obj('noOf', 'rotulo', { t0: w(8, 8) - 0.1, t1: w(8, 10) - 0.15, sale: 0.2, x: PX, y: -120, texto: 'NINGUNA OFERTA', size: 26, col: ROJO, pop: true, caja: [-170, -16, 340, 32] });
E.temblor(w(8, 9), 10, 0.35);
// «baja el precio un diez por ciento»: la barra del precio baja un poco y rueda el −10 %; «vuelve a probar»: el plazo empieza otra vez y llega una oferta
E.obj('precio3', 'relleno', { t0: w(8, 10), t1: TC, x: PX, y: -180, w: 320, h: 40, pop: true, rotulo: 'PRECIO',
  f: [[w(8, 10), 1], [w(8, 13), 1], [w(8, 16) + 0.2, 0.9, 'inout']], barrido: [w(8, 12)], caja: [-160, -54, 320, 74] });
E.obj('diez', 'contador', { t0: w(8, 13) - 0.1, t1: TC, x: PX, y: -85, size: 58, pre: '−', suf: ' %', miles: false, pop: true,
  v: [[w(8, 13), 0], [w(8, 14) + 0.45, 10, 'out']], barrido: [w(8, 16)], caja: [-110, -36, 220, 72] });
E.obj('chD', 'chispas', { t0: w(8, 14) + 0.45, t1: w(8, 14) + 1.25, x: PX, y: -85, r0: 90, r1: 170, inspeccion: false });
E.golpe(w(8, 14) + 0.45, 0.04);
E.figura('comp3', { t0: w(8, 17), t1: TC, x: 425, talla: 270, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(8, 19), 'ofrecer']], sonrisa: 1 });
E.obj('bocaP3', 'bocadillo', { t0: w(8, 19), t1: TC - 0.1, sale: 0.2, x: 415, y: -342, w: 120, h: 54, on: 1, pop: true, caja: [-60, -27, 120, 80] });
E.destello(wf(8, -1), 0.12); E.golpe(wf(8, -1), 0.04);

// ---------- cierre: resumen y envío ----------
// 9: Lo(0) que(1) tienes(2) siempre(3) vale(4) más(5) para(6) ti(7) que(8) para(9) quien(10) lo(11) mira(12) desde(13) fuera(14)
// 10: Mándaselo(0) a(1) ese(2) amigo(3) que(4) lleva(5) meses(6) con(7) el(8) coche(9) en(10) venta(11)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(9, 5), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, items: ['Lo vendido', '¿Lo pagarías?', 'Fecha límite'], gap: 280,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(9, 5), w(9, 12)], caja: [-400, -60, 800, 200] });
E.obj('confC', 'confeti', { t0: wf(9, -1), t1: wf(9, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(9, -1), 0.22); E.golpe(wf(9, -1), 0.04);
E.figura('yoF', { t0: w(10, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(10, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(10, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(10, 9)], vuelo: [[wf(10, -1), 0], [wf(10, -1) + 0.5, 1, 'in']] });
