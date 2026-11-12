// L16 · Cuatro formas de decir que no sin quedar mal (estilo B; reglas 15, 20, 23)
// Gancho visual: fotograma 0 con la agenda de la semana ya medio llena; el compañero gris sigue pidiendo y cada «SÍ» vuela a la agenda
// hasta que revienta. Regla 20: lo que dice el muñeco va en bocadillo, sin voz; el interlocutor gris está delante.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 560, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 4, estilo: 'puntos', aparece: w(1, 0), gap: 70, y: 340 } });

// «La primera: // …» → T en «La», S en la primera palabra de la forma
const N = [2, 4, 6, 8].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(10, 0) - 0.1;
const BY = -575; // altura de los bocadillos: por encima de las cabezas y por debajo del subtítulo

E.camara([
  [0, [0, -380, 1.03]], [w(0, 4), [0, -385, 1.07]], [w(1, 0), [0, -380, 1.02]], [N[0].T, [20, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(3, 0), [0, -385, 1.04]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(5, 0), [0, -385, 1.04]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(7, 5), [0, -385, 1.04]], [N[3].T, [30, -390, 1.05]],
  [N[3].S - 0.05, [0, -380, 1], 'lin'], [w(9, 0), [0, -385, 1.05]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Dices(0) que(1) sí(2) a(3) todo(4) y(5) luego(6) no(7) te(8) da(9) tiempo(10) a(11) nada(12)
// 1: Cuatro(0) formas(1) de(2) decir(3) que(4) no(5) sin(6) quedar(7) mal(8) con(9) nadie(10)
const tLlena = wf(0, -1) - 0.1;
E.figura('yo', { t0: 0, t1: fin(0), x: -340, cara: true,
  poses: [[0, 'ofrecer'], [w(0, 5), 'encoger'], [w(0, 9), 'manos_cabeza'], [w(1, 0), 'de_pie'], [w(1, 3), 'senalar']],
  sonrisa: [[0, 0.8], [w(0, 5), -0.3], [w(0, 9), -1], [w(1, 0), 0], [w(1, 6), 1.4]] });
E.figura('cliH', { t0: 0, t1: fin(0), x: 340, dir: -1, color: 'gris', poses: [[0, 'senalar'], [w(0, 9), 'de_pie'], [w(1, 0), 'encoger']] });
E.obj('agenda', 'bloques', { t0: 0, t1: fin(0), x: 0, y: -330, n: 7, w: 470, h: 100, parte: 1,
  hechos: [[0, 2], [w(0, 4), 7, 'in']], barrido: [tLlena], caja: [-235, -60, 470, 120] });
E.obj('rotAg', 'rotulo', { t0: 0, t1: w(1, 0), sale: 0.15, x: 0, y: -235, texto: [[0, 'ESTA SEMANA'], [tLlena, 'SIN HUECO']], col: [[0, '#9a9c9b']], caja: [-120, -16, 240, 32] });
E.obj('tareasH', 'contador', { t0: 0, t1: w(1, 0), sale: 0.15, x: 0, y: -445, v: [[0, 3], [w(0, 4), 12, 'in']], suf: ' tareas', size: 58, col: 'txt', miles: false, caja: [-150, -34, 300, 68] });
// cada «SÍ» sale del muñeco y cae en la agenda
[0, 1, 2, 3, 4].forEach(i => { const a = 0.15 + i * (Math.max(0.6, w(0, 4) - 0.15) / 5);
  E.obj('si' + i, 'pieza', { t0: a, t1: a + 0.55, sale: 0.1, r: 30, texto: 'SÍ', libre: true, estela: 4, inspeccion: false, sfx: false,
    x: [[a, -260], [a + 0.5, -180 + i * 80, 'in']], y: [[a, -560], [a + 0.25, -470, 'out'], [a + 0.5, -330, 'in']] }); });
E.temblor(tLlena, 16, 0.5); E.golpe(tLlena, 0.05);
// «Cuatro formas»: cuatro monedas con rayos detrás
E.obj('rayosH', 'rayos', { t0: w(1, 0) - 0.1, t1: fin(0), x: 0, y: -470, r: 330, z: -2, p: [[w(1, 0) - 0.1, 0], [w(1, 3), 1, 'out']], inspeccion: false });
[0, 1, 2, 3].forEach(i => { const a = w(1, 0) + i * 0.12;
  E.obj('forma' + i, 'moneda', { t0: a, t1: fin(0), x: -135 + i * 90, y: -470, r: 30, n: i + 1, pop: true, sfx: i === 0, inspeccion: false, sobrevive: i === 0 }); });
E.obj('chH', 'chispas', { t0: w(1, 6), t1: w(1, 6) + 0.8, x: 0, y: -470, r0: 120, r1: 240, n: 14, inspeccion: false });

// ---------- 1 · propón otra fecha: el día se desliza a la semana que viene ----------
// 2: La(0) primera(1) propón(2) otra(3) fecha(4)   [bocadillo «Esta semana no puedo, pero el martes que viene, sí»]
// 3: No(0) dices(1) que(2) no(3) lo(4) dejas(5) para(6) cuando(7) tengas(8) hueco(9)
E.numero(1, N[0].T, N[0].S, { desde: 'forma0', hacia: 'semana' });
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -340, cara: true,
  poses: [[0, 'de_pie'], [w(2, 2), 'ofrecer'], [w(3, 0), 'senalar'], [wf(3, -1), 'celebrar']], sonrisa: [[w(2, 2), 0.6], [wf(3, -1), 1.5]] });
E.figura('cli1', { t0: N[0].S - 0.1, t1: fin(1), x: 340, dir: -1, color: 'gris', poses: [[0, 'pensar'], [w(3, 4), 'ofrecer']] });
E.obj('fecha', 'bocadillo', { t0: w(2, 2) - 0.1, t1: w(3, 4), x: 0, y: BY, w: 760, h: 84, texto: 'Esta semana no puedo, pero el martes que viene, sí', size: 27, on: 1, pop: true, caja: [-380, -42, 760, 112] });
E.obj('semana', 'dias', { t0: N[0].S - 0.1, t1: fin(1), x: 0, y: -330, letras: ['L', 'M', 'X', 'J', 'V', 'L', 'M'], gap: 82, sobrevive: true,
  luz: [[0, 2], [w(2, 3), 2], [w(3, 4), 6, 'inout']], caja: [-280, -32, 560, 64] });
E.obj('rotSem', 'rotulo', { t0: N[0].S, t1: fin(1), x: 0, y: -260, texto: [[0, 'ESTA SEMANA'], [w(3, 4), 'LA QUE VIENE']], caja: [-130, -16, 260, 32] });
E.obj('hueco1', 'relleno', { t0: w(3, 0) - 0.1, t1: fin(1), x: 0, y: -170, w: 380, h: 50, pop: true, f: [[w(3, 4), 0], [wf(3, -1), 1, 'inout']], caja: [-190, -25, 380, 50] });
E.obj('dias1', 'contador', { t0: w(3, 0) - 0.1, t1: fin(1), x: 0, y: -440, v: [[w(3, 4), 0], [wf(3, -1), 6, 'inout']], suf: ' días de margen', size: 46, col: 'txt', miles: false, pop: true, caja: [-210, -28, 420, 56] });
E.obj('ch1', 'chispas', { t0: wf(3, -1), t1: wf(3, -1) + 0.8, x: 0, y: -330, r0: 120, r1: 260, n: 14, inspeccion: false });
E.golpe(wf(3, -1), 0.04); E.sfx(w(3, 4), 'fill');

// ---------- 2 · ofrécete a hacer solo una parte: una pieza se queda, tres vuelven ----------
// 4: La(0) segunda(1) ofrécete(2) a(3) hacer(4) solo(5) una(6) parte(7)   [bocadillo «Todo no, pero te reviso la primera parte»]
// 5: Ayudas(0) pero(1) sin(2) cargar(3) con(4) todo(5) el(6) trabajo(7)
E.numero(2, N[1].T, N[1].S, { desde: 'semana', hacia: 'parte0' });
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -340, cara: true,
  poses: [[0, 'de_pie'], [w(4, 2), 'ofrecer'], [w(5, 0), 'senalar'], [wf(5, -1), 'celebrar']], sonrisa: [[w(4, 5), 0.6], [wf(5, -1), 1.4]] });
E.figura('cli2', { t0: N[1].S - 0.1, t1: fin(2), x: 340, dir: -1, color: 'gris', poses: [[0, 'ofrecer'], [w(5, 2), 'pensar']] });
E.obj('parteB', 'bocadillo', { t0: w(4, 2) - 0.1, t1: w(5, 1), x: 0, y: BY, w: 660, h: 84, texto: 'Todo no, pero te reviso la primera parte', size: 28, on: 1, pop: true, caja: [-330, -42, 660, 112] });
const tVuelve = w(5, 1);
[0, 1, 2, 3].forEach(i => {
  const x0 = -150 + i * 100, xf = i === 0 ? -120 : 115 + (i - 1) * 82;
  E.obj('parte' + i, 'pieza', { t0: N[1].S - 0.1 + i * 0.08, t1: fin(2), r: 38, texto: String(i + 1), libre: true, estela: i ? 4 : 0, sfx: false, sobrevive: i === 0,
    x: [[0, x0], [tVuelve, x0], [tVuelve + 0.5, xf, 'inout']], y: [[0, -330], [tVuelve, -330], [tVuelve + 0.5, i ? -250 : -330, 'inout']],
    on: i === 0 ? [[0, 0.35], [w(4, 6), 0.35], [w(4, 6) + 0.3, 1]] : 0.35, barrido: i === 0 ? [wf(5, -1)] : null, caja: [-38, -38, 76, 76] });
});
E.obj('pct2', 'contador', { t0: w(4, 5) - 0.1, t1: fin(2), x: -120, y: -450, v: [[w(4, 6), 0], [w(4, 6) + 0.6, 25, 'out']], suf: ' %', size: 58, col: 'txt', miles: false, pop: true, caja: [-90, -34, 180, 68] });
E.obj('rot2', 'rotulo', { t0: w(4, 6), t1: fin(2), x: -120, y: -390, texto: 'TU PARTE', caja: [-80, -16, 160, 32] });
E.obj('ch2', 'chispas', { t0: wf(5, -1), t1: wf(5, -1) + 0.8, x: -120, y: -330, r0: 60, r1: 160, inspeccion: false });
E.golpe(wf(5, -1), 0.04);

// ---------- 3 · pregunta qué dejas de hacer: la lista se reordena y una tarea cae ----------
// 6: La(0) tercera(1) pregunta(2) qué(3) dejas(4) de(5) hacer(6) para(7) hacer(8) eso(9)   [bocadillo «Vale, ¿y qué dejo de lado para hacer esto?»]
// 7: Funciona(0) sobre(1) todo(2) con(3) tu(4) jefe(5) así(6) es(7) él(8) quien(9) decide(10) qué(11) va(12) primero(13)
E.numero(3, N[2].T, N[2].S, { desde: 'parte0', hacia: 'tareas3' });
E.figura('yo3', { t0: N[2].S - 0.1, t1: fin(3), x: -340, cara: true,
  poses: [[0, 'de_pie'], [w(6, 2), 'pensar'], [w(7, 6), 'senalar'], [wf(7, -1), 'celebrar']], sonrisa: [[w(6, 2), 0], [wf(7, -1), 1.4]] });
E.figura('jefe', { t0: N[2].S - 0.1, t1: fin(3), x: 340, dir: -1, color: 'gris', poses: [[0, 'de_pie'], [w(7, 5), 'pensar'], [w(7, 10), 'senalar']] });
E.obj('dejo', 'bocadillo', { t0: w(6, 2) - 0.1, t1: w(7, 5), x: 0, y: BY, w: 680, h: 84, texto: 'Vale, ¿y qué dejo de lado para hacer esto?', size: 28, on: 1, pop: true, caja: [-340, -42, 680, 112] });
E.obj('tareas3', 'lista', { t0: N[2].S - 0.1, t1: fin(3), x: 0, y: -305, n: 4, w: 300, gap: 56, sobrevive: true,
  p: [[w(7, 10), 0], [wf(7, -1), 3, 'lin']], brillo: [[w(7, 10), 0], [w(7, 12), 1, 'out']], caja: [-150, -115, 300, 230] });
E.obj('fuera3', 'pieza', { t0: w(6, 4), t1: fin(3), r: 26, texto: '✗', libre: true, estela: 4, sfx: false,
  x: [[w(6, 4), 170], [w(7, 0), 170], [w(7, 0) + 0.5, 260, 'in']], y: [[w(6, 4), -220], [w(7, 0), -220], [w(7, 0) + 0.5, -130, 'in']], on: [[w(7, 0), 1], [w(7, 0) + 0.5, 0.3]], caja: [-26, -26, 52, 52] });
E.obj('horas3', 'contador', { t0: w(7, 5), t1: fin(3), x: 0, y: -490, v: [[w(7, 5), 0], [w(7, 9), 2, 'out']], suf: ' h libres', size: 50, col: 'txt', miles: false, pop: true, caja: [-150, -30, 300, 60] });
E.obj('ch3', 'chispas', { t0: wf(7, -1), t1: wf(7, -1) + 0.8, x: 0, y: -330, r0: 120, r1: 230, inspeccion: false });
E.golpe(w(7, 0), 0.04); E.golpe(wf(7, -1), 0.04);

// ---------- 4 · pide tiempo para contestar: el reloj da la vuelta; el «sí» rápido pesa ----------
// 8: La(0) cuarta(1) pide(2) tiempo(3) para(4) contestar(5)   [bocadillo «Déjame que lo mire y mañana te digo»]
// 9: El(0) sí(1) que(2) das(3) sin(4) pensar(5) es(6) el(7) que(8) luego(9) más(10) te(11) pesa(12)
E.numero(4, N[3].T, N[3].S, { desde: 'tareas3', hacia: 'reloj4' });
E.figura('yo4', { t0: N[3].S - 0.1, t1: TC, x: -340, cara: true,
  poses: [[0, 'de_pie'], [w(8, 2), 'ofrecer'], [w(9, 1), 'pensar'], [w(9, 10), 'encoger']], sonrisa: [[w(8, 2), 0.6], [w(9, 10), -1]] });
E.figura('cli4', { t0: N[3].S - 0.1, t1: TC, x: 340, dir: -1, color: 'gris', poses: [[0, 'ofrecer'], [w(9, 0), 'de_pie']] });
E.obj('mira', 'bocadillo', { t0: w(8, 2) - 0.1, t1: w(9, 0), x: 0, y: BY, w: 600, h: 84, texto: 'Déjame que lo mire y mañana te digo', size: 28, on: 1, pop: true, caja: [-300, -42, 600, 112] });
E.obj('reloj4', 'temporizador', { t0: N[3].S - 0.1, t1: TC, x: 0, y: -330, r: 92, texto: '', sub: '', sobrevive: true,
  p: [[w(8, 2), 0], [w(9, 0), 1, 'inout']], barrido: [w(9, 0)], caja: [-104, -104, 208, 208] });
E.obj('h4', 'contador', { t0: N[3].S, t1: TC, x: 0, y: -335, v: [[w(8, 2), 0], [w(9, 0), 24, 'inout']], suf: ' h', size: 50, col: 'txt', miles: false, inspeccion: false });
// «el que luego más te pesa»: los «sí» rápidos se apilan sobre el muñeco
E.obj('pila4', 'papeles', { t0: w(9, 3), t1: TC, x: -340, y: -548, n: 5, k: [[w(9, 3), 0], [w(9, 12), 5, 'in']], inspeccion: false });
E.temblor(w(9, 12), 14, 0.45); E.golpe(w(9, 12), 0.04);
E.obj('ch4', 'chispas', { t0: w(9, 0), t1: w(9, 0) + 0.8, x: 0, y: -330, r0: 110, r1: 210, inspeccion: false });

// ---------- cierre: resumen (vuelve al gancho) y envío ----------
// 10: Cada(0) vez(1) que(2) dices(3) que(4) no(5) te(6) queda(7) tiempo(8) para(9) lo(10) que(11) te(12) importa(13)
// 11: Mándaselo(0) a(1) ese(2) amigo(3) que(4) no(5) sabe(6) decir(7) que(8) no(9) a(10) nada(11)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(10, 7), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, items: ['Otra fecha', 'Una parte', '¿Qué dejo?', 'Tiempo'], gap: 220,
  p: [[TC, 0], [TC + 0.9, 4, 'lin']], barrido: [w(10, 8)], caja: [-440, -60, 880, 200] });
E.obj('confC', 'confeti', { t0: wf(10, -1), t1: wf(10, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 54, inspeccion: false });
E.destello(wf(10, -1), 0.25); E.golpe(wf(10, -1), 0.04);
E.figura('yoF', { t0: w(11, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(11, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(11, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(11, 7)], vuelo: [[wf(11, -1), 0], [wf(11, -1) + 0.5, 1, 'in']] });
