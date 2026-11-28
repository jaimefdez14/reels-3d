// L46 · El efecto de dotación: ponle precio a tu coche (estilo B; reglas 15, 20, 21, 24)
// Gancho visual: dos barras, lo que pides (llena) y lo que pagarías (a la mitad); luego «dueños» contra «compradores» y un ×2 que rueda.
// Punto 1: tarjeta VENDIDO (la que cuenta) contra tarjeta SE PIDE (apagada); la barra del anuncio sube y baja sin sentido y la de venta se llena.
// Punto 2: la tarjeta de compra de hoy; la barra de lo que pagarías cae y el otro comprador se da la vuelta.
// Punto 3: temporizador de dos semanas; el precio baja un 10 % (contador) y el plazo vuelve a empezar.
// Regla 20: «Vale mucho más.» va en bocadillo del muñeco (línea 0); la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(2, 0), gap: 70, y: 360 } });

// «La primera: // …» → T en «La», S en la primera palabra del punto
const N = [3, 5, 7].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(9, 0) - 0.1;    // resumen
const TE = w(10, 4) - 0.15;  // envío
const ROJO = '#e4574f';

E.camara([
  [0, [0, -380, 1.04]], [w(0, 9), [20, -385, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 11), [10, -385, 1.06]], [w(1, 15), [20, -390, 1.04]], [N[0].T, [0, -390, 1.05]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(3, 8), [20, -385, 1.04]], [w(4, 0), [0, -380, 1.02]], [w(4, 8), [10, -385, 1.05]], [N[1].T, [0, -390, 1.05]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(5, 6), [10, -385, 1.04]], [w(6, 0), [0, -380, 1.02]], [w(6, 5), [-20, -390, 1.06]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(8, 0), [10, -385, 1.04]], [w(8, 10), [-10, -390, 1.06]], [w(8, 17), [10, -385, 1.03]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Cuando(0) vendes(1) tu(2) coche,(3) pides(4) más(5) de(6) lo(7) que(8) pagarías(9) por(10) uno(11) igual.(12)   [bocadillo «Vale mucho más.»]
// 1: Se(0) llama(1) efecto(2) de(3) dotación:(4) en(5) un(6) experimento(7) con(8) tazas,(9) los(10) dueños(11) pedían(12) más(13) del(14) doble(15) de(16) lo(17) que(18) ofrecían(19) los(20) compradores.(21)
// 2: Tres(0) reglas(1) para(2) ponerle(3) precio(4) a(5) tu(6) coche.(7)
const BX = 190;
E.figura('yo', { t0: 0, t1: fin(0), x: -330, cara: true,
  poses: [[0, 'de_pie'], [w(0, 1), 'ofrecer'], [w(0, 4), 'senalar'], [w(0, 9), 'encoger'], [w(0, 12), 'de_pie'], [w(1, 0), 'pensar'], [w(1, 7), 'senalar'], [w(1, 14), 'manos_cabeza'], [w(1, 20), 'de_pie'], [w(2, 0), 'senalar']],
  sonrisa: [[0, 0.8], [w(0, 4), 1.2], [w(0, 9), -0.3], [w(1, 0), 0], [w(1, 14), -1], [w(2, 0), 0.4], [w(2, 3), 1.2]] });
E.obj('bocaH', 'bocadillo', { t0: 0.3, t1: w(0, 11), sale: 0.2, x: -130, y: -500, w: 270, h: 76, texto: 'Vale mucho más.', size: 28, pop: true,
  on: [[0.3, 0], [0.8, 1]], caja: [-135, -38, 270, 102] });
E.obj('rotPide', 'rotulo', { t0: w(0, 4) - 0.1, t1: w(2, 0) + 0.1, sale: 0.2, x: BX, y: -445, size: 22, col: '#c9ccca', pop: true,
  texto: [[0, 'LO QUE PIDES'], [w(1, 11), 'LOS DUEÑOS PIDEN']], caja: [-150, -15, 300, 30] });
E.obj('barPide', 'barra', { t0: w(0, 4) - 0.1, t1: w(2, 0) + 0.1, sale: 0.2, x: BX, y: -400, w: 340, h: 44, f: [[w(0, 4), 0], [w(0, 8), 1, 'out']], pop: true, caja: [-170, -24, 340, 48] });
E.obj('rotPaga', 'rotulo', { t0: w(0, 9) - 0.1, t1: w(2, 0) + 0.1, sale: 0.2, x: BX, y: -335, size: 22, col: '#c9ccca', pop: true,
  texto: [[0, 'LO QUE PAGARÍAS'], [w(1, 19), 'LOS COMPRADORES OFRECEN']], caja: [-200, -15, 400, 30] });
E.obj('barPaga', 'barra', { t0: w(0, 9) - 0.1, t1: w(2, 0) + 0.1, sale: 0.2, x: BX, y: -290, w: 340, h: 44, f: [[w(0, 9), 0], [w(0, 12), 0.55, 'out'], [w(1, 19), 0.55], [wf(1, -1), 0.45, 'inout']], pop: true, caja: [-170, -24, 340, 48] });
E.sfx(w(0, 4), 'fill'); E.sfx(w(0, 9), 'fill');
E.golpe(wf(0, 8), 0.03); E.golpe(w(0, 12), 0.04);
// «efecto de dotación» → «experimento con tazas» → ×2 que rueda en «doble»
E.obj('rotNombre', 'rotulo', { t0: w(1, 2), t1: w(1, 5), sale: 0.2, x: BX, y: -505, texto: 'EFECTO DE DOTACIÓN', size: 36, col: '#e6ce46', peso: 700, pop: true, caja: [-250, -22, 500, 44] });
E.obj('rotTazas', 'rotulo', { t0: w(1, 5), t1: w(1, 14), sale: 0.2, x: BX, y: -505, texto: 'EXPERIMENTO · TAZAS', size: 28, col: '#9a9c9b', pop: true, caja: [-200, -17, 400, 34] });
E.obj('doble', 'contador', { t0: w(1, 14), t1: w(2, 0) + 0.1, sale: 0.2, x: BX, y: -505, v: [[w(1, 15) - 0.1, 1], [w(1, 15) + 0.5, 2, 'inout']], pre: '×', size: 62, col: '#e6ce46', miles: false, pop: true, caja: [-110, -34, 220, 68] });
E.obj('chD', 'chispas', { t0: w(1, 15) + 0.5, t1: w(1, 15) + 1.3, x: BX, y: -505, r0: 80, r1: 160, inspeccion: false });
E.temblor(w(1, 15) + 0.5, 10, 0.4);
// «Tres reglas»: tres monedas; la primera se queda y abre el primer punto
[0, 1, 2].forEach(i => { const a = w(2, 0) + i * 0.12;
  E.obj('tres' + i, 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: BX + (i - 1) * 110, y: -420, r: 38, n: i + 1, pop: true, sfx: i === 0, inspeccion: false,
    luz: [[0, 1], [w(2, 3), 1], [w(2, 3) + 0.3, i === 0 ? 1 : 0.35]], s: i === 0 ? [[0, 1], [w(2, 3), 1], [w(2, 3) + 0.35, 1.3, 'back']] : 1, barrido: i === 0 ? [w(2, 4)] : null }); });
E.obj('rayosH', 'rayos', { t0: w(2, 0), t1: fin(0), x: BX, y: -420, r: 360, z: -2, p: [[w(2, 0), 0], [w(2, 3), 0.9, 'out']], inspeccion: false });

// ---------- 1 · mira lo que se ha vendido, no lo que se pide ----------
// 3: La(0) primera:(1) mira(2) lo(3) que(4) se(5) ha(6) vendido,(7) no(8) lo(9) que(10) se(11) pide.(12)
// 4: Un(0) anuncio(1) puede(2) tener(3) cualquier(4) precio.(5) Lo(6) que(7) cuenta(8) es(9) por(10) cuánto(11) se(12) vende.(13)
E.numero(1, N[0].T, N[0].S, { desde: 'tres0', hacia: 'vendido' });
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -350, cara: true,
  poses: [[0, 'de_pie'], [w(3, 2), 'senalar'], [w(3, 8), 'encoger'], [w(4, 0), 'pensar'], [w(4, 6), 'senalar'], [w(4, 12), 'celebrar']],
  sonrisa: [[w(3, 2), 0.4], [w(3, 8), -0.5], [w(4, 0), 0], [w(4, 6), 0.6], [w(4, 12), 1.5]] });
E.obj('vendido', 'compra', { t0: N[0].S - 0.1, t1: w(4, 0) + 0.1, sale: 0.25, x: 40, y: -270, w: 260, h: 330, pop: true, boton: 'VENDIDO',
  ok: [[0, 0], [w(3, 7), 0], [w(3, 7) + 0.25, 1]], barrido: [w(3, 7)], caja: [-130, -165, 260, 330] });
E.obj('rotVendido', 'rotulo', { t0: N[0].S, t1: w(4, 0) + 0.1, sale: 0.2, x: 40, y: -490, texto: 'SE HA VENDIDO', size: 24, col: '#e6ce46', pop: true, caja: [-140, -16, 280, 32] });
E.obj('pide', 'compra', { t0: w(3, 8), t1: w(4, 0) + 0.1, sale: 0.25, x: 340, y: -270, w: 260, h: 330, pop: true, boton: 'SE PIDE', espera: 1,
  luz: [[0, 1], [w(3, 12), 1], [wf(3, -1) + 0.3, 0.4]], caja: [-130, -165, 260, 330] });
E.obj('rotPide1', 'rotulo', { t0: w(3, 9), t1: w(4, 0) + 0.1, sale: 0.2, x: 340, y: -490, texto: 'SE PIDE', size: 24, col: '#9a9c9b', pop: true, caja: [-90, -16, 180, 32] });
for (let i = 0; i < 3; i++) { const a = w(3, 7) + 0.1 + i * 0.22;
  E.obj('m1_' + i, 'moneda', { t0: a, t1: a + 0.7, entra: 0.06, sale: 0.15, r: 20, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, 340], [a + 0.65, 40, 'inout']], y: [[a, -300], [a + 0.33, -560], [a + 0.65, -240, 'in']] }); }
E.temblor(w(3, 7) + 0.3, 10, 0.4);
// línea 4: el anuncio puede subir y bajar sin sentido; lo que cuenta es lo que se llena de verdad
E.obj('rotAnuncio', 'rotulo', { t0: w(4, 0) + 0.3, t1: w(4, 6) - 0.05, sale: 0.2, x: 100, y: -350, texto: 'EL ANUNCIO', size: 24, col: '#9a9c9b', pop: true, caja: [-110, -16, 220, 32] });
E.obj('anuncio', 'barra', { t0: w(4, 0) + 0.3, t1: w(4, 6) - 0.05, sale: 0.2, x: 100, y: -300, w: 400, h: 52, pop: true,
  f: [[w(4, 2), 0.15], [w(4, 3), 0.85, 'out'], [w(4, 4), 0.3, 'inout'], [w(4, 5) - 0.1, 1, 'out'], [wf(4, 5) + 0.1, 0.1, 'inout'], [w(4, 6) - 0.05, 0.6]], caja: [-200, -28, 400, 56] });
E.obj('vende', 'relleno', { t0: w(4, 6), t1: fin(1), x: 100, y: -300, w: 400, h: 52, r: 70, sobrevive: true, rotulo: 'POR CUÁNTO SE VENDE', pop: true,
  f: [[w(4, 9), 0], [wf(4, -1), 0.8, 'inout']], barrido: [wf(4, -1)], caja: [-200, -65, 400, 95] });
E.sfx(w(4, 9), 'fill');
for (let i = 0; i < 3; i++) { const a = w(4, 10) + i * 0.3;
  E.obj('m1b_' + i, 'moneda', { t0: a, t1: a + 0.7, entra: 0.06, sale: 0.15, r: 20, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, 440], [a + 0.65, 140 + i * 60, 'inout']], y: [[a, -420], [a + 0.33, -480], [a + 0.65, -300, 'in']] }); }
E.obj('ch1', 'chispas', { t0: wf(4, -1), t1: wf(4, -1) + 0.8, x: 300, y: -300, r0: 90, r1: 190, inspeccion: false });
E.golpe(wf(4, -1), 0.04);

// ---------- 2 · pregúntate si lo comprarías hoy a ese precio ----------
// 5: La(0) segunda:(1) pregúntate(2) si(3) lo(4) comprarías(5) hoy(6) a(7) ese(8) precio.(9)
// 6: Si(0) tú(1) no(2) lo(3) pagas,(4) no(5) esperes(6) que(7) lo(8) pague(9) otro.(10)
E.numero(2, N[1].T, N[1].S, { desde: 'vende', hacia: 'tarj2' });
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -370, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'pensar'], [w(5, 5), 'senalar'], [w(5, 9), 'de_pie'], [w(6, 1), 'encoger'], [w(6, 5), 'apartarse'], [w(6, 9), 'senalar']],
  sonrisa: [[w(5, 2), 0.2], [w(5, 5), 0.6], [w(6, 1), -0.6], [w(6, 5), -1], [w(6, 9), 0.2]] });
E.obj('tarj2', 'compra', { t0: N[1].S - 0.1, t1: fin(2), x: 100, y: -290, w: 260, h: 320, pop: true, boton: 'COMPRAR', espera: [[0, 0], [w(6, 2), 0], [w(6, 2) + 0.3, 1]],
  pulsa: [[0, 0], [w(5, 5), 0], [w(5, 5) + 0.15, 1], [w(5, 5) + 0.45, 0]], barrido: [w(5, 5)], caja: [-130, -160, 260, 320] });
E.obj('rotHoy', 'rotulo', { t0: w(5, 6), t1: w(6, 0), sale: 0.2, x: 100, y: -470, texto: 'HOY · A ESE PRECIO', size: 24, col: '#e6ce46', pop: true, caja: [-170, -16, 340, 32] });
E.obj('pregunta', 'moneda', { t0: w(5, 2), t1: fin(2), sale: 0.2, x: 100, y: -505, r: 40, n: '?', pop: true, sfx: true, inspeccion: false,
  luz: [[0, 1], [w(6, 2), 1], [w(6, 2) + 0.3, 0.4]], s: [[0, 1], [w(5, 5), 1], [w(5, 5) + 0.3, 1.2, 'back'], [w(5, 7), 1]], caja: [-40, -40, 80, 80] });
E.obj('pago', 'relleno', { t0: w(5, 3), t1: fin(2), x: 100, y: -30, w: 300, h: 46, r: 70, sobrevive: true, rotulo: 'LO QUE PAGARÍAS', pop: true,
  f: [[w(5, 4), 0], [w(5, 9), 0.85, 'inout'], [w(6, 2), 0.85], [w(6, 4), 0.1, 'inout']], barrido: [w(5, 9)], caja: [-150, -60, 300, 85] });
E.sfx(w(5, 4), 'fill');
E.destello(w(5, 5) + 0.15, 0.1);
E.golpe(w(6, 2), 0.04); E.temblor(w(6, 4), 10, 0.4);
// «no esperes que lo pague otro»: el otro comprador, gris, se da la vuelta
E.figura('otro', { t0: w(6, 4), t1: fin(2), x: 400, talla: 400, color: 'gris', dir: [[0, -1], [w(6, 7), -1], [w(6, 7) + 0.05, 1]],
  poses: [[0, 'de_pie'], [w(6, 7), 'apartarse'], [w(6, 9), 'encoger']] });

// ---------- 3 · ponle fecha límite al precio ----------
// 7: La(0) tercera:(1) ponle(2) fecha(3) límite(4) al(5) precio.(6)
// 8: Si(0) en(1) dos(2) semanas(3) no(4) te(5) ha(6) llegado(7) ninguna(8) oferta,(9) baja(10) el(11) precio(12) un(13) diez(14) por(15) ciento(16) y(17) vuelve(18) a(19) probar.(20)
E.numero(3, N[2].T, N[2].S, { desde: 'pago', hacia: 'plazo' });
E.figura('yo3', { t0: N[2].S - 0.1, t1: TC, x: -380, cara: true,
  poses: [[0, 'de_pie'], [w(7, 2), 'senalar'], [w(7, 6), 'de_pie'], [w(8, 0), 'pensar'], [w(8, 9), 'de_pie'], [w(8, 10), 'senalar'], [w(8, 17), 'andar'], [wf(8, -1), 'celebrar']],
  sonrisa: [[w(7, 2), 0.4], [w(8, 0), 0], [w(8, 9), -0.6], [w(8, 10), 0.4], [wf(8, -1), 1.5]] });
E.obj('plazo', 'temporizador', { t0: N[2].S - 0.1, t1: TC, x: 70, y: -330, r: 90, pop: true, texto: '2', sub: 'SEMANAS',
  p: [[w(7, 3), 0], [w(7, 5), 0.12, 'out'], [w(8, 1), 0.12], [w(8, 9), 1, 'inout'], [w(8, 17), 1], [w(8, 17) + 0.35, 0, 'inout'], [wf(8, -1), 0.5, 'inout']],
  hecho: [[0, 0], [w(8, 9), 0], [w(8, 9) + 0.2, 1], [w(8, 17), 1], [w(8, 17) + 0.3, 0]], barrido: [w(8, 9), w(8, 18)], caja: [-130, -130, 260, 260] });
E.obj('rotFecha', 'rotulo', { t0: w(7, 3), t1: w(8, 0), sale: 0.2, x: 70, y: -490, texto: 'FECHA LÍMITE', size: 28, col: '#e6ce46', peso: 700, pop: true, caja: [-170, -18, 340, 36] });
E.obj('precio3', 'relleno', { t0: w(7, 5), t1: TC, x: 340, y: -250, w: 240, h: 46, r: 70, pop: true, rotulo: 'EL PRECIO',
  f: [[w(7, 5), 0], [w(7, 6) + 0.4, 1, 'out'], [w(8, 12), 1], [w(8, 14), 0.9, 'inout']], barrido: [w(7, 6)], caja: [-120, -60, 240, 85] });
E.obj('bajada', 'contador', { t0: w(8, 13), t1: TC, x: 340, y: -420, v: [[w(8, 14), 0], [w(8, 16), 10, 'inout']], pre: '−', suf: ' %', size: 56, col: ROJO, miles: false, pop: true, caja: [-110, -32, 220, 64] });
E.sfx(w(8, 14), 'fill'); E.temblor(w(8, 16), 10, 0.4);
E.obj('chB', 'chispas', { t0: w(8, 16), t1: w(8, 16) + 0.8, x: 340, y: -420, r0: 80, r1: 160, inspeccion: false });
// «vuelve a probar»: la flecha del precio al plazo y el plazo arranca otra vez
E.obj('vuelta', 'flecha', { t0: w(8, 17), t1: TC, de: [300, -170], hasta: [150, -200], curva: 0.4, col: '#e6ce46', w: 6, p: [[w(8, 17), 0], [w(8, 19), 1, 'inout']], inspeccion: false });
E.obj('ch3', 'chispas', { t0: wf(8, -1), t1: wf(8, -1) + 0.8, x: 70, y: -330, r0: 110, r1: 220, inspeccion: false });
E.obj('rayos3', 'rayos', { t0: w(8, 17), t1: TC, x: 70, y: -330, r: 300, z: -2, p: [[w(8, 17), 0], [wf(8, -1), 0.8, 'out']], inspeccion: false });
E.golpe(wf(8, -1), 0.04);

// ---------- cierre: resumen de las tres y envío ----------
// 9: Lo(0) que(1) tienes(2) siempre(3) vale(4) más(5) para(6) ti(7) que(8) para(9) quien(10) lo(11) mira(12) desde(13) fuera.(14)
// 10: Mándaselo(0) a(1) ese(2) amigo(3) que(4) lleva(5) meses(6) con(7) el(8) coche(9) en(10) venta.(11)
E.obj('rayosC', 'rayos', { t0: TC, t1: TE, capa: 'pantalla', x: 540, y: 960, r: 500, z: -2, p: [[TC, 0], [TC + 0.6, 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: TE, sale: 0.25, capa: 'pantalla', x: 540, y: 960, items: ['Vendido', 'Hoy', 'Plazo'], gap: 250,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [TC + 0.9], caja: [-380, -60, 760, 200] });
E.obj('conf9', 'confeti', { t0: w(9, 6), t1: w(9, 6) + 1.8, capa: 'pantalla', x: 540, y: 1000, n: 40, inspeccion: false, sinDim: true });
E.figura('yoF', { t0: TE + 0.05, t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [TE + 0.15, 'senalar']] });
E.obj('enviar', 'enviar', { t0: TE + 0.1, t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(10, 9)], vuelo: [[wf(10, -1), 0], [wf(10, -1) + 0.5, 1, 'in']] });
