// L49 · El efecto Dunning-Kruger (estilo B; reglas 15, 20, 21, 24)
// Idea visual: dos barras por persona, «lo que sabe» y «seguridad». El que habla (gris) tiene la primera casi vacía y la
// segunda llena; el muñeco amarillo le escucha y aprende a comprobarlo con tres preguntas: bloques de trabajo hecho que
// se marcan, lista de riesgos que se marca y contador de dudas (3 el experto, 0 el que sabe poco).
// Contador que rueda: el año 1999 y las dudas. Algo que se rellena por punto: bloques, lista, barras de «lo que sabe».
// Regla 20: «Eso es facilísimo.» va en bocadillo del que habla (gris) durante el gancho; la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(2, 6), gap: 70, y: 360 } });

// «La primera: // …» → T en «La», S en la primera palabra del punto
const N = [3, 5, 7].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(9, 0) - 0.1;   // resumen
const ROJO = '#e4574f';
const GRIS = '#9a9c9b';
const AM = '#e6ce46';

E.camara([
  [0, [0, -380, 1.04]], [w(0, 6), [10, -385, 1.06]], [w(0, 12), [20, -390, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 8), [0, -385, 1.04]],
  [w(1, 16), [20, -390, 1.07]], [w(2, 0), [0, -380, 1.02]], [w(2, 6), [10, -385, 1.04]], [N[0].T, [10, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [15, -385, 1.04]], [w(4, 6), [-10, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 0), [-15, -385, 1.04]], [w(6, 7), [15, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(8, 0), [-10, -385, 1.04]], [w(8, 5), [10, -385, 1.05]], [TC - 0.1, [0, -385, 1.04]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: El(0) que(1) menos(2) sabe(3) de(4) un(5) tema(6) suele(7) ser(8) el(9) que(10) más(11) seguro(12) habla(13)   [bocadillo «Eso es facilísimo.»]
// el gris habla con los brazos en alto; su barra de «lo que sabe» apenas sube y la de «seguridad» se llena de golpe
E.figura('yo', { t0: 0, t1: w(1, 0), sale: 0.25, x: -350, talla: 330, cara: true,
  poses: [[0, 'pensar'], [w(0, 7), 'encoger'], [w(0, 12), 'apartarse']], sonrisa: [[0, 0], [w(0, 7), -0.3], [w(0, 12), -0.9]] });
E.figura('habla', { t0: 0, t1: w(1, 0), sale: 0.25, x: 60, talla: 340, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'senalar'], [w(0, 2), 'ofrecer'], [w(0, 7), 'senalar'], [w(0, 11), 'celebrar']], sonrisa: [[0, 0.8], [w(0, 11), 1.5]] });
E.obj('bocaH', 'bocadillo', { t0: 0, t1: w(1, 0) - 0.1, sale: 0.2, x: 150, y: -450, w: 340, h: 76, texto: 'Eso es facilísimo.', size: 30,
  on: [[0, 0], [w(0, 11), 0], [w(0, 12), 1]], caja: [-170, -38, 340, 102] });
E.obj('sabeH', 'relleno', { t0: 0, t1: w(1, 0), sale: 0.2, x: 150, y: 70, w: 320, h: 32, rotulo: 'LO QUE SABE',
  f: [[0.15, 0], [w(0, 3) + 0.2, 0.12, 'out']], caja: [-160, -50, 320, 66] });
E.obj('segH', 'relleno', { t0: 0, t1: w(1, 0), sale: 0.2, x: 150, y: 175, w: 320, h: 32, rotulo: 'SEGURIDAD',
  f: [[0.15, 0], [w(0, 7), 0.25, 'lin'], [w(0, 11), 0.3], [w(0, 12) + 0.25, 1, 'out']], barrido: [w(0, 12) + 0.3], caja: [-160, -50, 320, 66] });
E.sfx(0.15, 'fill'); E.sfx(w(0, 11), 'fill');
E.obj('chH', 'chispas', { t0: w(0, 12) + 0.25, t1: w(0, 12) + 1.05, x: 150, y: 175, r0: 60, r1: 150, inspeccion: false });
E.temblor(w(0, 12) + 0.25, 14, 0.45); E.golpe(w(0, 12) + 0.25, 0.05);

// 1: Se(0) llama(1) efecto(2) Dunning-Kruger(3) cuanto(4) menos(5) sabes(6) de(7) algo(8) menos(9) ves(10) lo(11) que(12) te(13) falta(14) por(15) saber(16)
// una cuadrícula de «todo lo que hay que saber»: solo se encienden tres casillas y el resto se apaga (no lo ves)
E.figura('yo1', { t0: w(1, 0) - 0.05, t1: w(2, 0), sale: 0.25, x: -350, talla: 330, cara: true,
  poses: [[0, 'de_pie'], [w(1, 2), 'senalar'], [w(1, 4), 'pensar'], [w(1, 9), 'encoger'], [w(1, 14), 'manos_cabeza']],
  sonrisa: [[0, 0.2], [w(1, 2), 0.6], [w(1, 4), 0.2], [w(1, 9), -0.4], [w(1, 14), -1.2]] });
E.obj('rotDK', 'rotulo', { t0: w(1, 2) - 0.1, t1: w(2, 0), sale: 0.25, x: 150, y: -475, texto: 'EFECTO DUNNING-KRUGER', size: 30, col: AM, peso: 700, pop: true, caja: [-250, -18, 500, 36] });
E.obj('chDK', 'chispas', { t0: w(1, 3), t1: w(1, 3) + 0.8, x: 150, y: -475, r0: 130, r1: 250, inspeccion: false });
E.golpe(w(1, 3), 0.04);
E.obj('saber', 'cuadricula', { t0: w(1, 0) + 0.1, t1: w(2, 0), sale: 0.25, x: 150, y: -280, cols: 5, rows: 4, lado: 52, gap: 12, on: [10, 15, 16], pop: true,
  p: [[w(1, 5), 0], [w(1, 6) + 0.3, 1, 'out']], apagar: [[w(1, 9), 0], [w(1, 14) + 0.3, 1, 'lin']], caja: [-154, -122, 308, 244] });
E.obj('sabes1', 'relleno', { t0: w(1, 0) + 0.25, t1: w(2, 0), sale: 0.25, x: 150, y: -60, w: 320, h: 36, pop: true, rotulo: 'LO QUE SABES',
  f: [[w(1, 5), 0], [w(1, 6) + 0.3, 0.15, 'out']], caja: [-160, -52, 320, 70] });
E.sfx(w(1, 5), 'fill');
E.obj('pulso1', 'pulso', { t0: w(1, 9), t1: w(1, 9) + 0.7, x: 150, y: -280, r0: 60, r1: 200, inspeccion: false });
E.sfx(w(1, 9), 'whoosh');
E.temblor(w(1, 14), 12, 0.4); E.golpe(w(1, 14), 0.04);

// 2: Lo(0) midieron(1) dos(2) psicólogos(3) en(4) 1999(5) Tres(6) preguntas(7) antes(8) de(9) fiarte(10) de(11) quien(12) habla(13) muy(14) seguro(15)
E.figura('yo2', { t0: w(2, 0) - 0.05, t1: fin(0), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(2, 2), 'senalar'], [w(2, 6), 'de_pie'], [w(2, 7), 'pensar'], [w(2, 10), 'apartarse'], [w(2, 13), 'encoger']],
  sonrisa: [[0, 0], [w(2, 2), 0.6], [w(2, 7), 0.2], [w(2, 10), -0.4]] });
[{ id: 'psi1', x: 70 }, { id: 'psi2', x: 270 }].forEach((q, i) => E.figura(q.id, { t0: w(2, 1) - 0.15 + i * 0.12, t1: w(2, 6), sale: 0.2, x: q.x, talla: 290, color: i ? 'gris' : 'claro', dir: i ? -1 : 1, cara: true,
  poses: [[0, 'de_pie'], [w(2, 1), i ? 'pensar' : 'ofrecer'], [w(2, 5) + 0.9, 'celebrar']], sonrisa: 0.6 }));
E.obj('mide', 'barra', { t0: w(2, 0), t1: w(2, 6), sale: 0.2, x: 170, y: 80, w: 400, h: 40, pop: true,
  f: [[w(2, 1), 0], [w(2, 3) + 0.4, 0.8, 'out']], caja: [-200, -20, 400, 40] });
E.sfx(w(2, 1), 'fill');
E.obj('anio', 'contador', { t0: w(2, 3), t1: w(2, 6), sale: 0.2, x: 170, y: -410, size: 110, miles: false, pop: true,
  v: [[w(2, 4), 0], [w(2, 5) + 0.9, 1999, 'out']], barrido: [w(2, 5) + 0.95], caja: [-160, -58, 320, 116] });
E.obj('chAnio', 'chispas', { t0: w(2, 5) + 0.9, t1: w(2, 5) + 1.7, x: 170, y: -410, r0: 150, r1: 250, inspeccion: false });
E.golpe(w(2, 5) + 0.9, 0.04);
// «Tres preguntas»: tres monedas con «?»; «de quien habla muy seguro»: vuelve el gris con su bocadillo
[0, 1, 2].forEach(i => { const a = w(2, 6) + 0.05 + i * 0.13;
  E.obj('q' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: 20 + i * 100, y: -470, r: 32, n: '?', pop: true, sfx: i === 0,
    s: i === 0 ? [[0, 1], [wf(2, -1), 1], [wf(2, -1) + 0.3, 1.3, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [wf(2, -1), 1], [wf(2, -1) + 0.3, 0.4]], caja: [-32, -32, 64, 64] }); });
E.figura('habla2', { t0: w(2, 11) - 0.1, t1: fin(0), x: 300, talla: 300, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(2, 13), 'senalar'], [w(2, 15), 'celebrar']], sonrisa: 1.2 });
E.obj('boca2', 'bocadillo', { t0: w(2, 13), t1: N[0].T, sale: 0.2, x: 400, y: -385, w: 120, h: 60, on: [[w(2, 14), 0], [w(2, 15), 1]], pop: true, caja: [-60, -30, 120, 86] });
E.obj('seg2', 'relleno', { t0: w(2, 11), t1: N[0].T, sale: 0.2, x: 170, y: 80, w: 320, h: 32, pop: true, rotulo: 'SEGURIDAD',
  f: [[w(2, 12), 0], [w(2, 15) + 0.2, 1, 'out']], barrido: [w(2, 15) + 0.25], caja: [-160, -50, 320, 66] });
E.sfx(w(2, 12), 'fill');
E.destello(wf(2, -1), 0.12);

// ---------- 1 · ¿lo ha hecho alguna vez? ----------
// 3: La(0) primera(1) lo(2) ha(3) hecho(4) alguna(5) vez(6)
// 4: Opinar(0) de(1) un(2) trabajo(3) es(4) fácil(5) Haberlo(6) hecho(7) es(8) otra(9) cosa(10)
E.numero(1, N[0].T, N[0].S, { desde: 'q1', hacia: 'hecho' });
const X1 = 100;
E.figura('yoP1', { t0: N[0].S - 0.1, t1: fin(1), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(3, 2), 'pensar'], [w(3, 5), 'senalar'], [w(4, 0), 'encoger'], [w(4, 6), 'senalar'], [wf(4, -1), 'celebrar']],
  sonrisa: [[0, 0.2], [w(3, 2), 0], [w(3, 5), 0.5], [w(4, 0), -0.2], [w(4, 6), 0.8], [wf(4, -1), 1.5]] });
// el trabajo: un bloque que se parte en cuatro tareas; solo se marcan cuando se ha hecho
E.obj('hecho', 'bloques', { t0: N[0].S - 0.1, t1: fin(1), x: X1, y: -285, n: 4, w: 340, h: 90, pop: true, sobrevive: true, r: 70,
  parte: [[w(3, 4), 0], [w(3, 6) + 0.2, 1, 'inout']], hechos: [[w(4, 6), 0], [w(4, 10), 4, 'lin']], caja: [-170, -58, 340, 116] });
E.obj('rotTrab', 'rotulo', { t0: N[0].S, t1: w(4, 6), sale: 0.12, x: X1, y: -375, texto: 'EL TRABAJO', size: 26, col: GRIS, pop: true, caja: [-100, -15, 200, 30] });
E.obj('rotHecho', 'rotulo', { t0: w(4, 6) + 0.14, t1: fin(1), x: X1, y: -375, texto: 'HABERLO HECHO', size: 26, col: AM, pop: true, caja: [-130, -15, 260, 30] });
E.sfx(w(3, 4), 'whoosh'); E.sfx(w(4, 6), 'fill');
// «Opinar de un trabajo es fácil»: el gris opina y su barra se llena sola, deprisa
E.figura('opina', { t0: w(4, 0) - 0.2, t1: fin(1), x: 410, talla: 290, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(4, 0), 'ofrecer'], [w(4, 5), 'celebrar'], [w(4, 6), 'de_pie'], [w(4, 9), 'encoger']], sonrisa: [[0, 1], [w(4, 5), 1.4], [w(4, 6), 0.3], [w(4, 9), -0.6]] });
E.obj('bocaP1', 'bocadillo', { t0: w(4, 0), t1: w(4, 6), sale: 0.2, x: 400, y: -385, w: 120, h: 60, on: 1, pop: true, caja: [-60, -30, 120, 86] });
E.obj('opinar', 'relleno', { t0: w(4, 0) - 0.1, t1: fin(1), x: X1, y: -110, w: 340, h: 38, pop: true, rotulo: 'OPINAR',
  f: [[w(4, 0), 0], [w(4, 0) + 0.45, 1, 'out']], barrido: [w(4, 5)], luz: [[0, 1], [w(4, 6), 1], [w(4, 7), 0.45]], caja: [-170, -53, 340, 72] });
E.sfx(w(4, 0), 'fill');
E.golpe(w(4, 5), 0.03);
E.obj('ch1', 'chispas', { t0: w(4, 10), t1: w(4, 10) + 0.8, x: X1, y: -285, r0: 130, r1: 230, inspeccion: false });
E.golpe(w(4, 10), 0.04); E.destello(w(4, 10), 0.1);

// ---------- 2 · ¿sabe decir qué puede salir mal? ----------
// 5: La(0) segunda(1) sabe(2) decir(3) qué(4) puede(5) salir(6) mal(7)
// 6: Quien(0) conoce(1) un(2) tema(3) conoce(4) también(5) sus(6) riesgos(7)
E.numero(2, N[1].T, N[1].S, { desde: 'hecho', hacia: 'riesgos' });
const X2 = 110;
E.figura('yoP2', { t0: N[1].S - 0.1, t1: fin(2), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'pensar'], [w(5, 4), 'senalar'], [w(6, 0), 'de_pie'], [w(6, 1), 'ofrecer'], [w(6, 4), 'senalar'], [wf(6, -1), 'celebrar']],
  sonrisa: [[0, 0.2], [w(5, 4), 0.3], [w(6, 1), 0.7], [wf(6, -1), 1.5]] });
E.obj('rotMal', 'rotulo', { t0: w(5, 4) - 0.1, t1: w(6, 4), sale: 0.12, x: X2, y: -470, texto: '¿QUÉ PUEDE SALIR MAL?', size: 24, col: GRIS, pop: true, caja: [-200, -14, 400, 28] });
E.obj('rotRies', 'rotulo', { t0: w(6, 4) + 0.14, t1: fin(2), x: X2, y: -470, texto: 'SUS RIESGOS', size: 28, col: AM, pop: true, caja: [-120, -16, 240, 32] });
// la lista de riesgos: vacía mientras se pregunta; quien conoce el tema la marca entera
E.obj('riesgos', 'lista', { t0: N[1].S - 0.1, t1: fin(2), x: X2, y: -320, n: 3, w: 300, gap: 70, pop: true, sobrevive: true, r: 70,
  brillo: [[w(5, 5), 0], [wf(5, -1), 3, 'lin'], [w(6, 0), 3], [w(6, 0) + 0.3, 0], [w(6, 4), 0], [wf(6, -1), 3, 'lin']],
  p: [[w(6, 4), 0], [wf(6, -1), 3, 'lin']], caja: [-150, -88, 300, 176] });
E.sfx(w(5, 5), 'tick'); E.sfx(w(5, 6), 'tick'); E.sfx(w(5, 7), 'tick');
E.obj('tema', 'relleno', { t0: w(6, 0) - 0.1, t1: fin(2), x: X2, y: -130, w: 340, h: 38, pop: true, rotulo: 'CONOCE EL TEMA',
  f: [[w(6, 1), 0], [w(6, 3) + 0.25, 1, 'out']], barrido: [w(6, 3) + 0.3], caja: [-170, -53, 340, 72] });
E.sfx(w(6, 1), 'fill'); E.sfx(w(6, 4), 'fill');
E.figura('experto2', { t0: w(5, 2) + 0.2, t1: fin(2), x: 420, talla: 300, color: 'claro', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(5, 5), 'pensar'], [w(6, 1), 'de_pie'], [w(6, 4), 'ofrecer'], [wf(6, -1), 'celebrar']], sonrisa: [[0, 0.3], [w(6, 4), 1]] });
E.obj('ch2', 'chispas', { t0: wf(6, -1), t1: wf(6, -1) + 0.8, x: X2, y: -320, r0: 120, r1: 220, inspeccion: false });
E.golpe(wf(6, -1), 0.04); E.destello(wf(6, -1), 0.1);

// ---------- 3 · ¿reconoce lo que no sabe? ----------
// 7: La(0) tercera(1) reconoce(2) lo(3) que(4) no(5) sabe(6)
// 8: Un(0) experto(1) admite(2) sus(3) dudas(4) Quien(5) sabe(6) poco(7) no(8) duda(9) nunca(10)
E.numero(3, N[2].T, N[2].S, { desde: 'riesgos', hacia: 'sabeE' });
const XE = 70, XP = 355;
E.figura('yoP3', { t0: N[2].S - 0.1, t1: TC, x: -360, cara: true,
  poses: [[0, 'de_pie'], [w(7, 2), 'pensar'], [w(7, 5), 'senalar'], [w(8, 0), 'ofrecer'], [w(8, 5), 'de_pie'], [w(8, 8), 'apartarse'], [wf(8, -1) + 0.2, 'encoger']],
  sonrisa: [[0, 0], [w(7, 5), 0.4], [w(8, 0), 0.9], [w(8, 5), 0.2], [w(8, 8), -0.7]] });
// el experto: barra de «lo que sabe» casi llena, con el cursor en lo que le falta, y tres dudas en el contador
E.figura('experto3', { t0: N[2].S - 0.1, t1: TC, x: XE, talla: 300, color: 'claro', cara: true,
  poses: [[0, 'de_pie'], [w(7, 5), 'pensar'], [w(8, 2), 'encoger'], [w(8, 5), 'de_pie']], sonrisa: 0.6 });
E.obj('sabeE', 'relleno', { t0: N[2].S - 0.1, t1: TC, x: XE, y: -455, w: 230, h: 36, pop: true, rotulo: 'LO QUE SABE',
  f: [[w(7, 2), 0], [w(7, 4), 0.78, 'out']], cursor: [[w(7, 5), 0], [w(7, 5) + 0.05, 1]], luz: [[0, 1], [w(8, 5), 1], [w(8, 6), 0.55]], caja: [-115, -52, 230, 70] });
E.sfx(w(7, 2), 'fill');
E.obj('dudasE', 'contador', { t0: w(8, 2) - 0.15, t1: TC, x: XE, y: -375, size: 40, suf: ' DUDAS', miles: false, pop: true,
  v: [[w(8, 2), 0], [w(8, 4) + 0.2, 3, 'out']], luz: [[0, 1], [w(8, 5), 1], [w(8, 6), 0.55]], caja: [-105, -24, 210, 48] });
E.obj('ch3', 'chispas', { t0: w(8, 4) + 0.2, t1: w(8, 4) + 1.0, x: XE, y: -375, r0: 70, r1: 150, inspeccion: false });
E.golpe(w(8, 4) + 0.2, 0.04);
// el que sabe poco: barra casi vacía y cero dudas
E.figura('poco', { t0: w(7, 5), t1: TC, x: XP, talla: 300, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(8, 5), 'senalar'], [w(8, 8), 'celebrar']], sonrisa: [[0, 0.6], [w(8, 8), 1.5]] });
E.obj('sabeP', 'relleno', { t0: w(8, 5) - 0.1, t1: TC, x: XP, y: -455, w: 230, h: 36, pop: true, rotulo: 'LO QUE SABE',
  f: [[w(8, 6), 0], [w(8, 7) + 0.2, 0.12, 'out']], caja: [-115, -52, 230, 70] });
E.sfx(w(8, 6), 'fill');
E.obj('dudasP', 'contador', { t0: w(8, 8) - 0.05, t1: TC, x: XP, y: -375, size: 40, col: ROJO, suf: ' DUDAS', miles: false, pop: true, v: 0, caja: [-105, -24, 210, 48] });
E.temblor(w(8, 10), 12, 0.4); E.golpe(w(8, 10), 0.04);
E.destello(wf(8, -1) + 0.2, 0.12);

// ---------- cierre: resumen y envío ----------
// 9: Hablar(0) con(1) seguridad(2) no(3) es(4) lo(5) mismo(6) que(7) saber(8)
// 10: Mándaselo(0) a(1) ese(2) amigo(3) que(4) opina(5) de(6) todo(7) sin(8) dudar(9)
E.sfx(TC, 'cut');
E.obj('rayosC', 'rayos', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(9, 8), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, items: ['¿Lo ha hecho?', '¿Qué riesgos?', '¿Qué no sabe?'], gap: 280,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(9, 3)], caja: [-410, -60, 820, 200] });
E.obj('confC', 'confeti', { t0: wf(9, -1), t1: wf(9, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(9, -1), 0.22); E.golpe(wf(9, -1), 0.04);
E.figura('yoF', { t0: w(10, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(10, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(10, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(10, 9)], vuelo: [[wf(10, -1), 0], [wf(10, -1) + 0.5, 1, 'in']] });
