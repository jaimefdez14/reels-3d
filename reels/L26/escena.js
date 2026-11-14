// L26 · La falacia del coste hundido (estilo B; reglas 15, 20, 21, 24)
// Gancho visual: el muñeco ante una pantalla con una película mala (maraña gris) y la entrada ya pagada; la etiqueta
// sube de 9 € a 30.000 € («cosas mucho más caras») y se hunde al decir «coste hundido».
// Regla 20: «Ya que he llegado hasta aquí…» va en bocadillo del muñeco (línea 7); la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(2, 0), gap: 70, y: 360 } });

// «La primera: // …» → T en «La», S en la primera palabra del punto
const N = [3, 6, 8].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(11, 0) - 0.1;   // resumen
const TE = w(11, 8) - 0.15;  // envío
const ROJO = '#e4574f';

E.camara([
  [0, [0, -380, 1.04]], [w(0, 8), [20, -385, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 11), [10, -385, 1.06]], [N[0].T, [0, -390, 1.05]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [20, -385, 1.04]], [w(5, 0), [0, -380, 1.02]], [N[1].T, [10, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(7, 0), [10, -385, 1.04]], [w(7, 14), [-20, -390, 1.06]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(9, 5), [10, -385, 1.05]], [w(10, 5), [-10, -385, 1.03]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Sigues(0) viendo(1) una(2) película(3) mala(4) porque(5) ya(6) has(7) pagado(8) la(9) entrada(10)
// 1: Y(0) haces(1) lo(2) mismo(3) con(4) cosas(5) mucho(6) más(7) caras(8) Tiene(9) nombre(10) falacia(11) del(12) coste(13) hundido(14)
// 2: Tres(0) ideas(1) para(2) no(3) caer(4) en(5) ella(6)
E.figura('yo', { t0: 0, t1: fin(0), x: -330, cara: true,
  poses: [[0, 'de_pie'], [w(0, 3), 'encoger'], [w(0, 5), 'de_pie'], [w(0, 8), 'senalar'], [w(1, 0), 'de_pie'], [w(1, 6), 'manos_cabeza'], [w(1, 11), 'pensar'], [w(2, 0), 'senalar']],
  sonrisa: [[0, -0.4], [w(0, 4), -1.2], [w(0, 8), -0.6], [w(1, 6), -1.2], [w(2, 0), 0.4], [w(2, 3), 1.2]] });
E.obj('pantalla0', 'telefono', { t0: 0, t1: w(1, 0) + 0.2, sale: 0.2, x: 140, y: -420, w: 420, h: 240, brillo: [[0, 1], [w(0, 4), 0.6]], caja: [-210, -120, 420, 240] });
E.obj('peli0', 'maraña', { t0: 0, t1: w(1, 0) + 0.2, sale: 0.2, x: 140, y: -420, r: 70, p: [[0, 0.35], [w(0, 4), 1, 'out']], rot: [[0, 0], [w(1, 0), 0.6, 'lin']], inspeccion: false });
E.obj('rotPeli', 'rotulo', { t0: w(0, 3), t1: w(1, 0), sale: 0.2, x: 140, y: -270, texto: 'PELÍCULA MALA', size: 24, col: '#9a9c9b', pop: true, caja: [-120, -16, 240, 32] });
E.obj('entrada0', 'etiqueta', { t0: w(0, 8) - 0.1, t1: w(2, 0) + 0.15, sale: 0.3, x: [[0, 140], [w(1, 0), 140]], y: [[0, -175], [w(1, 0) + 0.2, -175], [w(1, 0) + 0.7, -380, 'out'], [w(1, 13), -380], [wf(1, -1) + 0.2, -150, 'in']],
  w: 340, h: 110, pop: true, r: 70, v: [[w(0, 8), 0], [w(0, 10), 9, 'out'], [w(1, 5), 9], [w(1, 8) + 0.3, 30000, 'inout']],
  on: [[0, 1], [w(1, 13), 1], [wf(1, -1), 0.3]], barrido: [w(0, 10), w(1, 8) + 0.3], caja: [-170, -55, 340, 110] });
E.obj('rotEntrada', 'rotulo', { t0: w(0, 9), t1: w(1, 5), sale: 0.2, x: 140, y: -95, texto: 'ENTRADA', size: 24, col: '#9a9c9b', pop: true, caja: [-80, -16, 160, 32] });
E.obj('rotCaras', 'rotulo', { t0: w(1, 5), t1: w(1, 9), sale: 0.2, x: 140, y: -275, texto: 'AÑOS · NEGOCIO · CARRERA', size: 22, col: '#9a9c9b', pop: true, caja: [-190, -16, 380, 32] });
E.obj('rotNombre', 'rotulo', { t0: w(1, 11), t1: w(2, 0), sale: 0.2, x: 140, y: -500, texto: 'COSTE HUNDIDO', size: 44, col: '#e6ce46', peso: 700, pop: true, caja: [-200, -26, 400, 52] });
E.golpe(w(0, 10), 0.04); E.temblor(wf(1, -1), 14, 0.45); E.golpe(w(1, 13), 0.05);
E.obj('chH0', 'chispas', { t0: w(1, 8) + 0.3, t1: w(1, 8) + 1.1, x: 140, y: -380, r0: 170, r1: 260, inspeccion: false });
// «Tres ideas»: tres monedas; la primera se queda y abre el primer punto
[0, 1, 2].forEach(i => { const a = w(2, 0) + i * 0.12;
  E.obj('tres' + i, 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: 140 + (i - 1) * 110, y: -420, r: 38, n: i + 1, pop: true, sfx: i === 0, inspeccion: false,
    luz: [[0, 1], [w(2, 3), 1], [w(2, 3) + 0.3, i === 0 ? 1 : 0.35]], s: i === 0 ? [[0, 1], [w(2, 3), 1], [w(2, 3) + 0.35, 1.3, 'back']] : 1, barrido: i === 0 ? [w(2, 4)] : null }); });
E.obj('rayosH', 'rayos', { t0: w(2, 0), t1: fin(0), x: 140, y: -420, r: 360, z: -2, p: [[w(2, 0), 0], [w(2, 3), 0.9, 'out']], inspeccion: false });

// ---------- 1 · lo que ya has gastado no lo recuperas ----------
// 3: La(0) primera(1) lo(2) que(3) ya(4) has(5) gastado(6) no(7) lo(8) recuperas(9) decidas(10) lo(11) que(12) decidas(13)
// 4: La(0) entrada(1) está(2) pagada(3) tanto(4) si(5) te(6) quedas(7) como(8) si(9) te(10) vas(11)
// 5: Solo(0) cuenta(1) lo(2) que(3) tienes(4) por(5) delante(6) dos(7) horas(8) más(9) de(10) película(11) mala(12)
E.numero(1, N[0].T, N[0].S, { desde: 'tres0', hacia: 'entrada' });
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -370, cara: true, toca: ['entrada'],
  dir: [[0, 1], [w(3, 10), 1], [w(3, 10) + 0.05, -1], [w(3, 12), -1], [w(3, 12) + 0.05, 1]],
  poses: [[0, 'de_pie'], [w(3, 2), 'ofrecer'], [w(3, 7), 'encoger'], [w(3, 10), 'pensar'], [w(4, 0), 'senalar'], [w(4, 8), 'apartarse'], [w(5, 0), 'de_pie'], [w(5, 7), 'pensar'], [w(5, 11), 'triste']],
  sonrisa: [[w(3, 2), 0.4], [w(3, 7), -1], [w(4, 0), 0], [w(4, 11), -0.6], [w(5, 0), 0], [w(5, 11), -1.3]] });
E.obj('entrada', 'etiqueta', { t0: N[0].S - 0.1, t1: w(5, 0) + 0.1, sale: 0.3, x: 130, y: -440, w: 320, h: 110, r: 70,
  v: [[N[0].S, 0], [w(3, 6), 9, 'inout']], on: [[0, 1], [w(3, 7), 1], [w(3, 9) + 0.2, 0.3]], barrido: [w(3, 6)], caja: [-160, -55, 320, 110] });
E.obj('rotEnt1', 'rotulo', { t0: N[0].S, t1: w(5, 0), sale: 0.2, x: 130, y: -530, texto: 'PAGADA', size: 24, col: '#9a9c9b', caja: [-70, -16, 140, 32] });
for (let i = 0; i < 3; i++) { const a = w(3, 2) + i * 0.3;
  E.obj('m1_' + i, 'moneda', { t0: a, t1: a + 0.8, entra: 0.06, sale: 0.15, r: 20, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, -300], [a + 0.75, 110, 'inout']], y: [[a, -330], [a + 0.38, -560], [a + 0.75, -440, 'in']] }); }
E.temblor(w(3, 9), 10, 0.4);
E.obj('noVuelve', 'rotulo', { t0: w(3, 8), t1: w(4, 3), sale: 0.2, x: 130, y: -350, texto: 'NO VUELVE', size: 28, col: ROJO, pop: true, caja: [-90, -18, 180, 36] });
// «tanto si te quedas como si te vas»: dos caminos, los dos cuestan lo mismo
const Q = { x: -10 }, V = { x: 280 };
E.obj('rotQueda', 'rotulo', { t0: w(4, 4) - 0.1, t1: w(5, 0), sale: 0.2, x: Q.x, y: -290, texto: 'TE QUEDAS', size: 26, col: '#c9ccca', pop: true, caja: [-90, -16, 180, 32] });
E.obj('cQueda', 'contador', { t0: w(4, 5), t1: w(5, 0), sale: 0.2, x: Q.x, y: -220, v: [[w(4, 5), 0], [w(4, 7) + 0.2, 9, 'out']], pre: '−', suf: ' €', size: 52, col: ROJO, miles: false, pop: true, caja: [-90, -32, 180, 64] });
E.obj('rotVas', 'rotulo', { t0: w(4, 8) - 0.1, t1: w(5, 0), sale: 0.2, x: V.x, y: -290, texto: 'TE VAS', size: 26, col: '#c9ccca', pop: true, caja: [-70, -16, 140, 32] });
E.obj('cVas', 'contador', { t0: w(4, 9), t1: w(5, 0), sale: 0.2, x: V.x, y: -220, v: [[w(4, 9), 0], [w(4, 11) + 0.2, 9, 'out']], pre: '−', suf: ' €', size: 52, col: ROJO, miles: false, pop: true, caja: [-90, -32, 180, 64] });
E.obj('igual', 'rotulo', { t0: wf(4, -1), t1: w(5, 0), sale: 0.2, x: (Q.x + V.x) / 2, y: -220, texto: '=', size: 48, col: '#e6ce46', peso: 700, pop: true, caja: [-20, -24, 40, 48] });
E.golpe(wf(4, -1), 0.04);
// «solo cuenta lo que tienes por delante»: vuelve la pantalla; los minutos que te quedan suben y la barra se llena
E.obj('pantalla1', 'telefono', { t0: w(5, 0), t1: fin(1), x: 130, y: -430, w: 400, h: 230, pop: true, brillo: 0.7, caja: [-200, -115, 400, 230] });
E.obj('peli1', 'maraña', { t0: w(5, 0), t1: fin(1), x: 130, y: -430, r: 66, p: [[w(5, 0), 0], [w(5, 2), 1, 'out']], rot: [[w(5, 0), 0], [fin(1), 1, 'lin']], inspeccion: false });
E.obj('minutos', 'contador', { t0: w(5, 6), t1: fin(1), x: 130, y: -265, v: [[w(5, 7), 0], [wf(5, -1), 120, 'inout']], pre: '+', suf: ' min', size: 50, col: 'txt', miles: false, pop: true, caja: [-140, -30, 280, 60] });
E.obj('delante', 'relleno', { t0: w(5, 1), t1: fin(1), x: 130, y: -150, w: 400, h: 46, r: 70, sobrevive: true, rotulo: 'POR DELANTE', f: [[w(5, 6), 0], [wf(5, -1), 1, 'inout']], barrido: [wf(5, -1)], caja: [-200, -60, 400, 85] });
E.sfx(w(5, 7), 'fill'); E.temblor(w(5, 12), 10, 0.4);

// ---------- 2 · cuanto más has puesto, más cuesta dejarlo ----------
// 6: La(0) segunda(1) cuanto(2) más(3) has(4) puesto(5) en(6) algo(7) más(8) cuesta(9) dejarlo(10)
// 7: Un(0) negocio(1) que(2) pierde(3) dinero(4) cada(5) mes(6) Un(7) trabajo(8) que(9) ya(10) no(11) te(12) gusta(13)
//    Y(14) sigues(15) solo(16) por(17) los(18) años(19) o(20) el(21) dinero(22) que(23) ya(24) has(25) puesto(26)   [bocadillo «Ya que he llegado hasta aquí…»]
E.numero(2, N[1].T, N[1].S, { desde: 'delante', hacia: 'pila' });
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -365, cara: true, toca: ['pila'],
  poses: [[0, 'de_pie'], [w(6, 2), 'meter'], [w(6, 8), 'de_pie'], [w(6, 9), 'encoger'], [w(7, 0), 'senalar'], [w(7, 7), 'triste'], [w(7, 14), 'coger']],
  sonrisa: [[w(6, 2), 0.6], [w(6, 9), -0.4], [w(7, 3), -0.8], [w(7, 13), -1.3], [w(7, 15), 0.2]] });
E.obj('pila', 'pila', { t0: N[1].S - 0.1, t1: fin(2), x: -160, n: 10, w: 150, hh: 26, sobrevive: true, r: 70, oy: -120,
  k: [[N[1].S, 0], [N[1].S + 0.4, 1, 'out'], [w(6, 2), 1], [w(6, 7), 10, 'inout']], barrido: [w(6, 7), w(7, 24)], caja: [-75, -240, 150, 240], refl: true });
for (let i = 0; i < 6; i++) { const a = w(6, 2) + i * 0.2;
  E.obj('m2_' + i, 'moneda', { t0: a, t1: a + 0.7, entra: 0.06, sale: 0.15, r: 18, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, -250], [a + 0.65, -160, 'inout']], y: [[a, -200], [a + 0.33, -360], [a + 0.65, -240, 'in']] }); }
E.obj('puesto', 'contador', { t0: w(6, 2) - 0.1, t1: fin(2), x: -110, y: -420, v: [[w(6, 2), 0], [w(6, 7), 24000, 'inout']], suf: ' €', size: 38, col: 'txt', pop: true, caja: [-95, -24, 190, 48] });
E.obj('cuesta', 'relleno', { t0: w(6, 7), t1: w(7, 0) + 0.1, sale: 0.25, x: 170, y: -330, w: 340, h: 50, rotulo: 'CUESTA DEJARLO', f: [[w(6, 8), 0], [wf(6, -1), 0.95, 'inout']], barrido: [wf(6, -1)], caja: [-170, -65, 340, 92] });
E.sfx(w(6, 8), 'fill');
// «un negocio que pierde dinero cada mes»: la línea roja cae y la pérdida suma en rojo
E.obj('base2', 'flecha', { t0: w(7, 0), t1: fin(2), de: [10, -170], hasta: [350, -170], curva: 0, col: '#56605a', w: 3, punta: false, p: [[w(7, 0), 0], [w(7, 0) + 0.4, 1]], inspeccion: false });
E.obj('cae', 'flecha', { t0: w(7, 1), t1: fin(2), de: [20, -420], hasta: [340, -200], curva: -0.12, col: ROJO, w: 7, p: [[w(7, 1), 0], [wf(7, 6), 1, 'inout']], inspeccion: false });
E.obj('perdida', 'contador', { t0: w(7, 2), t1: w(7, 14) - 0.25, sale: 0.2, x: 210, y: -460, v: [[w(7, 2), 0], [wf(7, 6), 14400, 'inout']], pre: '−', suf: ' €', size: 46, col: ROJO, pop: true, caja: [-130, -28, 260, 56] });
E.obj('anios', 'contador', { t0: w(7, 7) - 0.1, t1: fin(2), x: 180, y: -100, v: [[w(7, 8), 1], [w(7, 13), 8, 'inout'], [w(7, 19), 8], [w(7, 19) + 0.3, 8]], suf: ' años', size: 44, col: 'txt', miles: false, pop: true,
  barrido: [w(7, 19)], caja: [-110, -28, 220, 56] });
E.temblor(wf(7, 6), 10, 0.4);
E.obj('aqui', 'bocadillo', { t0: w(7, 14) - 0.05, t1: fin(2) - 0.1, sale: 0.2, x: 0, y: -535, w: 400, h: 76, texto: 'Ya que he llegado hasta aquí…', size: 25, pop: true,
  on: [[w(7, 14), 0], [w(7, 16), 1]], caja: [-200, -38, 400, 102] });
E.golpe(w(7, 22), 0.03);

// ---------- 3 · pregúntate: ¿lo elegirías otra vez? ----------
// 8: La(0) tercera(1) pregúntate(2) solo(3) una(4) cosa(5)
// 9: Si(0) hoy(1) empezaras(2) de(3) cero(4) lo(5) elegirías(6) otra(7) vez(8)
// 10: Si(0) la(1) respuesta(2) es(3) no(4) lo(5) que(6) llevas(7) gastado(8) no(9) es(10) motivo(11) para(12) seguir(13)
E.numero(3, N[2].T, N[2].S, { desde: 'pila', hacia: 'pregunta' });
const XW = [[0, -150], [w(10, 5), -150], [w(10, 13), -400, 'lin']];
E.figura('yo3', { t0: N[2].S - 0.1, t1: TC, x: XW, cara: true,
  dir: [[0, 1], [w(10, 5), 1], [w(10, 5) + 0.05, -1], [w(10, 13), -1], [w(10, 13) + 0.05, 1]],
  poses: [[0, 'de_pie'], [w(8, 2), 'pensar'], [w(9, 0), 'de_pie'], [w(9, 5), 'pensar'], [w(10, 0), 'de_pie'], [w(10, 4), 'senalar'], [w(10, 5), 'andar'], [w(10, 13), 'celebrar']],
  sonrisa: [[w(8, 2), 0.2], [w(9, 5), 0], [w(10, 4), 0.6], [w(10, 13), 1.6]] });
E.obj('pregunta', 'moneda', { t0: N[2].S - 0.1, t1: TC, x: 180, y: -430, r: 70, n: '?', sobrevive: false, sfx: false,
  s: [[N[2].S, 1], [w(8, 5), 1.15, 'back'], [w(9, 0), 1], [w(9, 6), 1.15, 'back'], [w(9, 8), 1]], barrido: [w(9, 6)], caja: [-70, -70, 140, 140] });
E.obj('rayos3', 'rayos', { t0: w(8, 2), t1: TC, x: 180, y: -430, r: 300, z: -2, p: [[w(8, 2), 0], [w(8, 5), 0.8, 'out']], inspeccion: false });
// «si hoy empezaras de cero»: lo que llevas puesto se vacía hasta cero
E.obj('llevas', 'relleno', { t0: w(9, 0) - 0.15, t1: w(9, 5), sale: 0.2, x: 180, y: -260, w: 360, h: 46, rotulo: 'LO QUE LLEVAS', f: [[0, 0.85], [w(9, 2), 0.85], [wf(9, 4), 0, 'inout']], caja: [-180, -60, 360, 85] });
E.obj('cero', 'contador', { t0: w(9, 2), t1: w(9, 5), sale: 0.2, x: 180, y: -175, v: [[w(9, 2), 8], [wf(9, 4), 0, 'inout']], suf: ' años', size: 40, col: 'txt', miles: false, caja: [-100, -26, 200, 52] });
// «¿lo elegirías otra vez?»: SÍ / NO; con «no» se enciende el NO
E.obj('si', 'pieza', { t0: w(9, 5) + 0.12, t1: TC, x: 90, y: -250, r: 52, texto: 'SÍ', pop: true, on: 0, luz: [[0, 1], [w(10, 4), 1], [w(10, 4) + 0.3, 0.4]], caja: [-52, -52, 104, 104] });
E.obj('no', 'pieza', { t0: w(9, 5) + 0.24, t1: TC, x: 270, y: -250, r: 52, texto: 'NO', pop: true, on: [[0, 0], [w(10, 4), 0], [w(10, 4) + 0.2, 1]],
  s: [[0, 1], [w(10, 4), 1], [w(10, 4) + 0.3, 1.2, 'back']], barrido: [w(10, 4) + 0.2], caja: [-52, -52, 104, 104] });
E.golpe(w(10, 4), 0.05); E.destello(w(10, 4), 0.12);
E.obj('chNo', 'chispas', { t0: w(10, 4) + 0.2, t1: w(10, 4) + 1, x: 270, y: -250, r0: 70, r1: 150, inspeccion: false });
// «no es motivo para seguir»: se marcha, y la barra LIBRE se llena
E.obj('libre', 'relleno', { t0: w(10, 5) - 0.15, t1: TC, x: 180, y: -100, w: 360, h: 46, rotulo: 'LIBRE', f: [[w(10, 5), 0], [w(10, 13), 1, 'inout']], barrido: [w(10, 13)], caja: [-180, -60, 360, 85] });
E.sfx(w(10, 5), 'fill');
E.obj('ch3', 'chispas', { t0: w(10, 13), t1: w(10, 13) + 0.8, x: 180, y: -100, r0: 120, r1: 230, inspeccion: false });
E.obj('conf3', 'confeti', { t0: wf(10, -1) - 0.2, t1: wf(10, -1) + 1.6, capa: 'pantalla', x: 540, y: 1000, n: 40, inspeccion: false, sinDim: true });

// ---------- cierre: resumen de las tres y envío ----------
// 11: Mándaselo(0) a(1) ese(2) amigo(3) que(4) sigue(5) con(6) algo(7) solo(8) porque(9) ya(10) ha(11) llegado(12) hasta(13) aquí(14)
E.obj('rayosC', 'rayos', { t0: TC, t1: TE, capa: 'pantalla', x: 540, y: 960, r: 500, z: -2, p: [[TC, 0], [TC + 0.6, 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: TE, sale: 0.25, capa: 'pantalla', x: 540, y: 960, items: ['Pagado', 'Cuesta más', '¿Otra vez?'], gap: 250,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [TC + 0.9], caja: [-380, -60, 760, 200] });
E.figura('yoF', { t0: TE + 0.05, t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [TE + 0.15, 'senalar']] });
E.obj('enviar', 'enviar', { t0: TE + 0.1, t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(11, 12)], vuelo: [[wf(11, -1), 0], [wf(11, -1) + 0.5, 1, 'in']] });
