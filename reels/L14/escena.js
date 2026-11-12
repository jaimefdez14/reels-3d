// L14 · Cuatro cambios para la primera media hora del día (estilo B; regla 15: satisfying)
// Hilo visual: una barra «TU DÍA» que se rellena un cuarto con cada cambio (0 → 25 → 50 → 75 → 100 %).
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 }, progreso: { n: 4, estilo: 'puntos', aparece: w(1, 0), gap: 70, y: 360 } });

const N = [2, 5, 7, 9].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;           // las piezas de un punto se van al oscurecer
const TC = w(11, 0) - 0.1;

E.camara([
  [0, [0, -380, 1]], [w(0, 8), [20, -390, 1.05]], [N[0].T, [20, -390, 1.05]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(3, 8), [20, -390, 1.05]], [N[1].T, [20, -390, 1.05]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 5), [-20, -390, 1.05]], [N[2].T, [-20, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(8, 9), [20, -390, 1.06]], [N[3].T, [20, -390, 1.06]],
  [N[3].S - 0.05, [0, -380, 1], 'lin'], [TC, [0, -390, 1.05]],
]);

// barra de energía del día de cada punto: empieza donde la dejó el anterior y sube un cuarto
const dia = (id, t0, t1, a, b, ta, tb) => E.obj(id, 'relleno', { t0, t1, capa: 'pantalla', x: 470, y: 520, w: 380, h: 40, pct: true, r: 60, sinDim: true,
  rotulo: 'TU DÍA', f: [[t0, a], [ta, a], [tb, b, 'inout']], barrido: [tb], caja: [-190, -70, 480, 100] });

// ---------- gancho visual: suena la alarma y el móvil se llena de avisos ----------
// 0: Te(0) despiertas(1) y(2) lo(3) primero(4) que(5) haces(6) es(7) mirar(8) el(9) móvil.(10)
// 1: Cuatro(0) cambios(1) para(2) la(3) primera(4) media(5) hora(6) del(7) día.(8) Si(9) cumples(10) todos,(11) tu(12) día(13) entero(14) mejorará.(15)
E.figura('yo', { t0: 0, t1: fin(0), x: -320, cara: true, toca: ['movil0'],
  poses: [[0, 'triste'], [w(0, 2), 'coger'], [w(1, 0), 'de_pie'], [w(1, 9), 'senalar'], [w(1, 15), 'celebrar']],
  sonrisa: [[0, -0.6], [w(0, 8), -1], [w(1, 0), 0], [w(1, 13), 1.5]] });
E.obj('reloj0', 'relojAm', { t0: 0, t1: w(1, 0), sale: 0.2, x: 260, y: -400, r: 75, texto: '07:00', p: [[0, 0.1], [w(0, 10), 0.3]], caja: [-75, -75, 150, 150] });
E.obj('alarma0', 'ondas', { t0: 0, t1: w(0, 2), sale: 0.2, x: 260, y: -260, n: 7, gap: 24, amp: 1, inspeccion: false });
E.temblor(0.05, 10, 0.5);
E.obj('movil0', 'telefono', { t0: 0, t1: w(1, 0), sale: 0.2, w: 120, h: 210, x: [[0, 60], [w(0, 2), 60], [w(0, 4), -150, 'out']], y: [[0, -260], [w(0, 4), -330, 'out']],
  avisos: [[0, 3], [w(0, 8), 3], [wf(0, -1), 48, 'in']], vibra: [[0, 1], [w(0, 4), 0.4], [w(0, 8), 1]], brillo: 1, estela: 3, caja: [-60, -105, 120, 210] });
E.golpe(w(0, 8), 0.03);
// «Cuatro cambios»: cuatro monedas; «tu día entero mejorará»: la barra del día se llena de golpe (lo que promete el vídeo)
[0, 1, 2, 3].forEach(i => { const a = w(1, 0) + i * 0.12;
  E.obj('cambio' + i, 'moneda', { t0: a, t1: N[0].T - 0.05, sale: 0.2, x: 110 + (i - 1.5) * 90, y: -470, r: 32, n: i + 1, pop: true, sfx: i === 0, inspeccion: false, sobrevive: i === 0 }); });
E.obj('diaH', 'relleno', { t0: w(1, 9) - 0.1, t1: N[0].T, x: 60, y: -260, w: 440, h: 50, pct: true, r: 70, rotulo: 'TU DÍA',
  f: [[w(1, 9), 0], [w(1, 15), 1, 'inout']], barrido: [w(1, 15)], caja: [-220, -64, 540, 100] });
E.obj('rayosH', 'rayos', { t0: w(1, 13), t1: N[0].T, x: 110, y: -470, r: 380, z: -2, p: [[w(1, 13), 0], [w(1, 15), 1, 'out']], inspeccion: false });
E.obj('chH', 'chispas', { t0: w(1, 15), t1: w(1, 15) + 0.8, x: 280, y: -260, r0: 60, r1: 180, inspeccion: false });
E.golpe(w(1, 15), 0.05); E.destello(w(1, 15), 0.18); E.sfx(w(1, 9), 'fill');

// ---------- 1 · el móvil, a cargar fuera del dormitorio: se queda tras la puerta con sus avisos ----------
// 2: El(0) primero:(1) deja(2) el(3) móvil(4) cargando(5) fuera(6) del(7) dormitorio.(8)
// 3: Si(0) para(1) apagar(2) la(3) alarma(4) tienes(5) que(6) levantarte,(7) ya(8) estás(9) de(10) pie.(11)
// 4: Y(0) no(1) empiezas(2) el(3) día(4) leyendo(5) mensajes(6) y(7) correos(8) de(9) los(10) demás.(11)
E.numero(1, N[0].T, N[0].S, { desde: 'cambio0', hacia: 'movil1' });
const tCoge = w(2, 2), tLlega = w(2, 7), tDeja = wf(2, -1) + 0.05, tVuelve = wf(2, -1) + 0.35;
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), cara: true, toca: ['movil1', 'puerta1'],
  x: [[0, -320], [tCoge, -320], [tLlega, 120], [tVuelve, 120], [w(3, 0), -300]],
  dir: [[0, 1], [tVuelve - 0.01, 1], [tVuelve, -1], [w(3, 0), -1], [w(3, 0) + 0.01, 1]],
  poses: [[0, 'de_pie'], [tCoge, 'coger'], [tCoge + 0.2, 'apartarse'], [tLlega, 'meter'], [tVuelve, 'apartarse'], [w(3, 0), 'pensar'], [w(3, 7), 'levantar'], [w(3, 11), 'celebrar'], [w(4, 0), 'de_pie']],
  sonrisa: [[0, 0], [w(3, 8), 1.4], [w(4, 5), 0.2]] });
E.obj('movil1', 'telefono', { t0: N[0].S - 0.1, t1: tDeja + 0.3, w: 120, h: 210, estela: 4,
  x: [[0, -60], [tCoge, -60], [tCoge + 0.2, -230, 'out'], [tLlega, 200]], y: [[0, -330], [tCoge, -330], [tCoge + 0.2, -300], [tLlega, -300], [tDeja, -230]],
  avisos: [[0, 0], [tCoge, 12, 'in']], vibra: [[0, 1], [tCoge + 0.2, 0.3]], s: [[tLlega, 1], [tDeja, 0.6]], caja: [-60, -105, 120, 210], r: 70 });
E.obj('puerta1', 'puerta', { t0: w(2, 2) - 0.2, t1: fin(1), x: 330, refl: true, p: [[tCoge, 0], [tCoge + 0.5, 1], [tDeja, 1], [tDeja + 0.35, 0, 'in']], caja: [-100, -380, 200, 380] });
E.golpe(tDeja + 0.35, 0.035); E.temblor(tDeja + 0.35, 10, 0.35); // la puerta se cierra
// la alarma suena al otro lado: hay que levantarse
E.obj('alarma1', 'ondas', { t0: w(3, 2), t1: w(3, 9), sale: 0.2, x: 330, y: -470, n: 7, gap: 24, amp: [[w(3, 2), 0], [w(3, 4), 1]], inspeccion: false });
E.sfx(w(3, 4), 'tick');
// los avisos que no lees: suben al otro lado de la puerta
E.obj('avisos1', 'contador', { t0: w(4, 2), t1: fin(1), x: 330, y: -470, v: [[w(4, 2), 5], [wf(4, -1), 37, 'inout']], suf: ' avisos', size: 44, col: 'txt', miles: false, pop: true, caja: [-120, -28, 240, 56] });
dia('dia1', w(3, 8) - 0.2, fin(1), 0, 0.25, w(3, 8), wf(3, -1) + 0.3);
E.obj('ch1', 'chispas', { t0: w(3, 11), t1: w(3, 11) + 0.8, x: -300, y: -560, r0: 40, r1: 120, inspeccion: false });

// ---------- 2 · un vaso de agua: el vaso se llena y las horas sin beber se cuentan ----------
// 5: El(0) segundo:(1) un(2) vaso(3) de(4) agua(5) antes(6) que(7) nada.(8)
// 6: Llevas(0) ocho(1) horas(2) sin(3) beber.(4) Es(5) lo(6) primero(7) que(8) necesita(9) el(10) cuerpo.(11)
E.numero(2, N[1].T, N[1].S, { desde: 'avisos1', hacia: 'vaso' });
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -330, cara: true, toca: ['vaso'],
  poses: [[0, 'de_pie'], [w(5, 3), 'coger'], [w(6, 0), 'pensar'], [w(6, 5), 'levantar'], [wf(6, -1), 'celebrar']], sonrisa: [[w(6, 0), -0.3], [w(6, 5), 0.6], [wf(6, -1), 1.5]] });
E.obj('vaso', 'tarro', { t0: N[1].S - 0.1, t1: fin(2), x: 110, w: 170, h: 240, rotulo: 'AGUA', sobrevive: true, r: 90,
  nivel: [[w(5, 3), 0], [wf(5, -1) + 0.4, 1, 'inout']], barrido: [wf(5, -1) + 0.4], caja: [-85, -250, 170, 300] });
E.sfx(w(5, 3), 'fill');
E.obj('horas2', 'contador', { t0: w(6, 0), t1: fin(2), x: 110, y: -400, v: [[w(6, 0), 0], [w(6, 2), 8, 'out']], suf: ' h sin beber', size: 46, col: 'txt', miles: false, pop: true, caja: [-170, -28, 340, 56] });
E.obj('ch2', 'chispas', { t0: wf(5, -1) + 0.4, t1: wf(5, -1) + 1.2, x: 110, y: -260, r0: 60, r1: 160, inspeccion: false });
dia('dia2', w(6, 5) - 0.2, fin(2), 0.25, 0.5, w(6, 5), wf(6, -1) + 0.2);
E.golpe(wf(6, -1), 0.04);

// ---------- 3 · diez minutos de luz: sale el sol y el temporizador cuenta los diez minutos ----------
// 7: El(0) tercero:(1) diez(2) minutos(3) de(4) luz(5) del(6) día.(7)
// 8: Abre(0) la(1) ventana(2) o(3) sal(4) a(5) dar(6) una(7) vuelta.(8) La(9) luz(10) le(11) dice(12) al(13) cuerpo(14) que(15) ya(16) es(17) hora(18) de(19) despertarse.(20)
E.numero(3, N[2].T, N[2].S, { desde: 'vaso', hacia: 'sol' });
E.figura('yo3', { t0: N[2].S - 0.1, t1: fin(3), cara: true, x: -330,
  poses: [[0, 'de_pie'], [w(8, 0), 'senalar'], [w(8, 4), 'de_pie'], [w(8, 10), 'levantar'], [wf(8, -1), 'celebrar']], sonrisa: [[w(8, 0), 0.3], [w(8, 10), 1.5]] });
E.obj('sol', 'bola', { t0: N[2].S - 0.1, t1: fin(3), x: 230, r: 58, y: [[N[2].S, -410], [w(8, 10), -480, 'inout']], barrido: [w(8, 10)], sobrevive: true, caja: [-58, -58, 116, 116] });
E.obj('rayos3', 'rayos', { t0: w(7, 5), t1: fin(3), x: 230, y: -470, r: 340, z: -2, p: [[w(7, 5), 0], [w(8, 10), 1, 'out']], inspeccion: false });
E.obj('min3', 'temporizador', { t0: w(7, 2), t1: fin(3), x: 230, y: -260, r: 62, texto: '', sub: '', p: [[w(7, 3), 0], [wf(8, -1), 1, 'lin']], hecho: [[wf(8, -1), 0], [wf(8, -1) + 0.3, 1]], caja: [-76, -76, 152, 152] });
E.obj('min3n', 'contador', { t0: w(7, 2), t1: wf(8, -1), sale: 0.2, x: 230, y: -262, v: [[w(7, 3), 0], [wf(8, -1), 10, 'lin']], suf: ' min', size: 36, col: 'txt', miles: false, inspeccion: false });
dia('dia3', w(8, 9) - 0.2, fin(3), 0.5, 0.75, w(8, 10), wf(8, -1));
E.golpe(w(8, 10), 0.04); E.destello(w(8, 10), 0.14);

// ---------- 4 · la noche antes: la primera tarea, apuntada; por la mañana se marca y el día llega al 100 % ----------
// 9: El(0) cuarto:(1) decide(2) la(3) noche(4) antes(5) cuál(6) es(7) tu(8) primera(9) tarea.(10)
// 10: Una(0) sola(1) cosa,(2) y(3) por(4) escrito.(5) Así,(6) por(7) la(8) mañana(9) no(10) lo(11) piensas:(12) empiezas.(13)  [bocadillo «Lo primero, el informe»]
E.numero(4, N[3].T, N[3].S, { desde: 'sol', hacia: 'reloj4' });
E.figura('yo4', { t0: N[3].S - 0.1, t1: TC, x: -330, cara: true,
  poses: [[0, 'de_pie'], [w(9, 2), 'pensar'], [w(10, 0), 'escribir'], [w(10, 6), 'de_pie'], [w(10, 13), 'celebrar']], sonrisa: [[w(9, 2), 0], [w(10, 13), 1.6]] });
E.obj('reloj4', 'relojAm', { t0: N[3].S - 0.1, t1: TC, x: 280, y: -480, r: 68, texto: [[0, '23:00'], [w(10, 7), '07:00']], p: [[0, 0.9], [w(10, 7), 0.25]], caja: [-68, -68, 136, 136] });
E.obj('nota4', 'bocadillo', { t0: w(10, 0), t1: w(10, 6), sale: 0.15, x: -40, y: -545, w: 330, h: 76, texto: 'Lo primero, el informe', size: 28, pop: true,
  on: [[w(10, 0), 0], [w(10, 4), 1]], caja: [-165, -38, 330, 104] });
E.obj('tarea4', 'bloques', { t0: w(9, 6), t1: TC, x: 110, y: -250, n: 1, w: 340, h: 120, texto: 'INFORME', pop: true, hechos: [[w(10, 9), 0], [w(10, 13), 1, 'out']], barrido: [w(10, 4), w(10, 13)], caja: [-170, -60, 340, 120] });
dia('dia4', w(10, 9) - 0.2, TC, 0.75, 1, w(10, 10), wf(10, -1) + 0.2);
E.obj('conf4', 'confeti', { t0: wf(10, -1) + 0.2, t1: wf(10, -1) + 2.2, x: 60, y: -300, n: 50, inspeccion: false });
E.golpe(wf(10, -1) + 0.2, 0.05); E.destello(wf(10, -1) + 0.2, 0.2);

// ---------- cierre: resumen de los cuatro y envío ----------
// 11: La(0) mañana(1) no(2) empieza(3) cuando(4) te(5) despiertas,(6) sino(7) la(8) noche(9) antes.(10)
// 12: Mándaselo(0) a(1) ese(2) amigo(3) que(4) va(5) tarde(6) desde(7) que(8) abre(9) los(10) ojos.(11)
E.obj('resumen', 'resumen', { t0: TC, t1: w(12, 0), capa: 'pantalla', x: 540, y: 960, items: ['Móvil fuera', 'Agua', 'Luz', 'La noche antes'], gap: 220,
  p: [[TC, 0], [TC + 1.0, 4, 'lin']], caja: [-430, -60, 860, 300] });
E.obj('rayosF', 'rayos', { t0: w(11, 7), t1: w(12, 0), capa: 'pantalla', x: 540, y: 960, r: 420, z: -2, p: [[w(11, 7), 0], [w(11, 9), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('confF', 'confeti', { t0: w(11, 9), t1: w(11, 9) + 2.0, capa: 'pantalla', x: 540, y: 880, n: 44, inspeccion: false, sinDim: true });
E.figura('yoF', { t0: w(12, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(12, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(12, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, vuelo: [[wf(12, -1), 0], [wf(12, -1) + 0.5, 1, 'in']] });
