// L12 · Miras el correo cada poco rato y no has hecho nada importante (estilo B; regla 15: satisfying; regla 20: bocadillos sin voz)
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 }, progreso: { n: 3, estilo: 'puntos', aparece: w(1, 0), gap: 70, y: 360 } });

const N = [2, 5, 8].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const TC = w(10, 0) - 0.1;
const fin = k => (k < N.length ? N[k].T + 0.45 : TC);   // las piezas de un punto se van al oscurecer (el último, al resumen)

E.camara([
  [0, [0, -380, 1]], [w(0, 11), [20, -390, 1.05]], [N[0].T, [20, -390, 1.05]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [20, -390, 1.05]], [N[1].T, [20, -390, 1.05]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(7, 0), [20, -385, 1.05]], [N[2].T, [20, -385, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [TC, [0, -390, 1.05]],
]);

// ---------- gancho visual: trabajando en la mesa, el móvil no para de sumar correos y lo importante se queda en 0 % ----------
// 0: Miras(0) el(1) correo(2) cada(3) poco(4) rato(5) y,(6) al(7) acabar(8) el(9) día,(10) no(11) has(12) hecho(13) nada(14) importante.(15)
// 1: Tres(0) reglas(1) para(2) que(3) el(4) correo(5) no(6) decida(7) cómo(8) va(9) tu(10) día.(11)
E.figura('yo', { t0: 0, t1: fin(0), x: -360, cara: true, toca: ['mesa0'],
  poses: [[0, 'escribir'], [w(0, 2), 'pensar'], [w(0, 4), 'escribir'], [w(0, 5), 'pensar'], [w(0, 11), 'manos_cabeza'], [w(1, 0), 'de_pie'], [w(1, 7), 'senalar']],
  sonrisa: [[0, 0.2], [w(0, 11), -1], [w(1, 0), 0], [w(1, 7), 1.2]] });
E.obj('mesa0', 'escritorio', { t0: 0, t1: fin(0), x: -80, brillo: [[0, 0.2]], refl: true, inspeccion: false, caja: [-330, -400, 500, 400] });
E.obj('movil0', 'telefono', { t0: 0, t1: fin(0), x: 330, y: -330, w: 130, h: 230, sobrevive: true, r: 70,
  avisos: [[0, 3], [w(0, 5), 27, 'out'], [w(0, 10), 47, 'out']], vibra: [[0, 0.6], [w(0, 10), 1], [w(1, 0), 0.3], [w(1, 7), 0]],
  brillo: [[0, 1], [w(1, 6), 1], [w(1, 7), 0.3]], caja: [-65, -115, 130, 230] });
E.obj('hecho0', 'contador', { t0: 0, t1: fin(0), x: 330, y: -140, v: [[0, 0]], suf: ' %', size: 54, col: 'txt', miles: false, caja: [-90, -32, 180, 64] });
E.obj('rotHecho0', 'rotulo', { t0: 0, t1: fin(0), x: 330, y: -92, texto: 'IMPORTANTE', size: 24, caja: [-90, -14, 180, 28] });
E.temblor(w(0, 13), 14, 0.45); E.golpe(w(0, 13), 0.05);
// «Tres reglas»: tres monedas sobre el móvil; con «no decida» el móvil se apaga
E.obj('rayosH', 'rayos', { t0: w(1, 0) - 0.1, t1: fin(0), x: 120, y: -500, r: 300, z: -2, p: [[w(1, 0) - 0.1, 0], [w(1, 1), 1, 'out']], inspeccion: false });
[0, 1, 2].forEach(i => { const a = w(1, 0) + i * 0.12;
  E.obj('regla' + i, 'moneda', { t0: a, t1: fin(0), x: 40 + i * 80, y: -500, r: 30, n: i + 1, pop: true, sfx: i === 0, inspeccion: false }); });
E.obj('chH', 'chispas', { t0: w(1, 7), t1: w(1, 7) + 0.8, x: 330, y: -330, r0: 100, r1: 200, inspeccion: false });
E.destello(w(1, 7), 0.15);

// ---------- 1 · en los bloques de trabajo no se mira: el bloque se llena, los correos esperan ----------
// 2: La(0) primera:(1) mientras(2) trabajas(3) en(4) algo(5) importante,(6) el(7) correo(8) no(9) se(10) mira.(11)
// 3: Una(0) hora,(1) o(2) el(3) rato(4) que(5) necesites.(6) Durante(7) ese(8) bloque,(9) ni(10) lo(11) abres.(12) [bocadillo «Lo miro cuando acabe esto»]
// 4: Casi(0) todo(1) lo(2) que(3) llega(4) puede(5) esperar(6) a(7) que(8) termines.(9)
E.numero(1, N[0].T, N[0].S, { desde: 'movil0', hacia: 'reloj1' });
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -360, cara: true, toca: ['mesa1'], poses: [[0, 'escribir'], [wf(4, -1), 'celebrar']], sonrisa: [[0, 0.3], [wf(4, -1), 1.4]] });
E.obj('mesa1', 'escritorio', { t0: N[0].S - 0.1, t1: fin(1), x: -80, brillo: [[w(2, 3), 0], [wf(4, -1), 1]], refl: true, inspeccion: false, caja: [-330, -400, 500, 400] });
E.obj('reloj1', 'temporizador', { t0: N[0].S - 0.1, t1: fin(1), x: 330, y: -360, r: 95, texto: '', sub: '', sobrevive: true,
  p: [[w(3, 0), 0], [wf(4, -1), 1, 'inout']], hecho: [[wf(4, -1), 0], [wf(4, -1) + 0.25, 1]], barrido: [wf(4, -1)], caja: [-110, -110, 220, 220] });
E.obj('min1', 'contador', { t0: w(3, 0) - 0.1, t1: fin(1), x: 330, y: -365, v: [[w(3, 0), 0], [wf(4, -1), 60, 'inout']], suf: ' min', size: 46, col: 'txt', miles: false, pop: true, inspeccion: false });
E.obj('espera1', 'contador', { t0: w(2, 7) - 0.1, t1: fin(1), x: 330, y: -195, v: [[w(2, 7), 0], [wf(4, -1), 12, 'lin']], suf: ' correos', size: 40, col: 'txt', miles: false, pop: true, caja: [-140, -26, 280, 52] });
E.obj('rotEspera1', 'rotulo', { t0: w(2, 7) - 0.1, t1: fin(1), x: 330, y: -152, texto: 'ESPERANDO', size: 22, caja: [-80, -12, 160, 24] });
E.obj('boc1', 'bocadillo', { t0: w(3, 7) - 0.1, t1: w(4, 5), sale: 0.15, x: -230, y: -492, w: 410, h: 76, texto: 'Lo miro cuando acabe esto', size: 28, on: 1, pop: true, caja: [-205, -38, 410, 102] });
E.obj('ch1', 'chispas', { t0: wf(4, -1), t1: wf(4, -1) + 0.8, x: 330, y: -360, r0: 110, r1: 210, n: 16, inspeccion: false });
E.golpe(wf(4, -1), 0.05); E.destello(wf(4, -1), 0.15);

// ---------- 2 · lo de dos minutos, en el momento; lo demás, a la lista y a la agenda ----------
// 5: La(0) segunda:(1) si(2) se(3) contesta(4) en(5) dos(6) minutos,(7) contéstalo(8) en(9) el(10) momento.(11)
// 6: Una(0) confirmación,(1) un(2) sí,(3) una(4) fecha.(5) Si(6) lo(7) dejas,(8) tendrás(9) que(10) leerlo(11) dos(12) veces.(13)
// 7: Lo(0) que(1) lleva(2) más(3) tiempo(4) lo(5) apuntas(6) en(7) una(8) lista(9) y(10) le(11) buscas(12) hueco(13) en(14) la(15) agenda.(16)
E.numero(2, N[1].T, N[1].S, { desde: 'reloj1', hacia: 'reloj2' });
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -340, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'senalar'], [w(5, 8), 'ofrecer'], [w(6, 6), 'pensar'], [w(7, 6), 'senalar'], [wf(7, -1), 'celebrar']],
  sonrisa: [[0, 0.3], [w(6, 9), -0.6], [w(7, 6), 0.4], [wf(7, -1), 1.4]] });
E.obj('reloj2', 'temporizador', { t0: N[1].S - 0.1, t1: w(6, 0), sale: 0.2, x: 200, y: -340, r: 100, texto: '2', sub: 'MIN',
  p: [[w(5, 4), 0], [w(5, 8), 1, 'lin']], hecho: [[w(5, 8), 0], [w(5, 8) + 0.25, 1]], barrido: [w(5, 8)], caja: [-114, -114, 228, 228] });
E.obj('ch2a', 'chispas', { t0: w(5, 8), t1: w(5, 8) + 0.8, x: 200, y: -340, r0: 110, r1: 200, inspeccion: false });
E.golpe(w(5, 8), 0.04);
// «Una confirmación, un sí, una fecha»: tres respuestas hechas en el acto
[[1, 'OK'], [3, 'SÍ'], [5, '12']].forEach(([k, s], i) => E.obj('resp' + i, 'pieza', { t0: w(6, k) - 0.15, t1: w(7, 0), sale: 0.2, x: 70 + i * 130, y: -400, r: 44, texto: s, on: 1, pop: true, libre: true, inspeccion: false }));
E.obj('leer2', 'contador', { t0: w(6, 6) - 0.1, t1: w(7, 0), sale: 0.2, x: 200, y: -230, v: [[w(6, 6), 1], [w(6, 12), 2, 'out']], suf: ' lecturas', size: 46, col: 'txt', miles: false, pop: true, caja: [-150, -30, 300, 60] });
E.temblor(w(6, 12), 9, 0.35);
// «Lo apuntas en una lista y le buscas hueco en la agenda»: la lista se rellena y se enciende el día
E.obj('lista2', 'lista', { t0: w(7, 0) - 0.1, t1: fin(2), x: 200, y: -420, n: 3, w: 320, gap: 64, p: [[w(7, 6), 0], [w(7, 9), 3, 'inout']], brillo: [[w(7, 6), 0], [w(7, 9), 3]], sobrevive: true, r: 80, caja: [-160, -100, 320, 200] });
E.obj('agenda2', 'dias', { t0: w(7, 10) - 0.1, t1: fin(2), x: 120, y: -200, gap: 74, luz: [[w(7, 12), -1], [w(7, 13), 3, 'out']], pop: true, caja: [-250, -32, 500, 64] });
E.obj('ch2b', 'chispas', { t0: w(7, 13), t1: w(7, 13) + 0.8, x: 120 + 74 * 0, y: -200, r0: 40, r1: 110, inspeccion: false });
E.sfx(w(7, 6), 'fill');

// ---------- 3 · quita las notificaciones: el globo baja de 99 a 0 y la concentración se llena ----------
// 8: La(0) tercera:(1) quita(2) las(3) notificaciones.(4)
// 9: Que(0) no(1) te(2) avise(3) cada(4) correo.(5) Cada(6) aviso(7) te(8) saca(9) de(10) lo(11) que(12) estás(13) haciendo.(14)
E.numero(3, N[2].T, N[2].S, { desde: 'lista2', hacia: 'movil3' });
E.figura('yo3', { t0: N[2].S - 0.1, t1: fin(3), x: -350, cara: true,
  poses: [[0, 'de_pie'], [w(8, 2), 'senalar'], [wf(8, -1), 'de_pie'], [w(9, 6), 'pensar'], [wf(9, -1), 'celebrar']], sonrisa: [[0, -0.3], [wf(8, -1), 0.6], [wf(9, -1), 1.5]] });
E.obj('movil3', 'telefono', { t0: N[2].S - 0.1, t1: fin(3), x: 260, y: -360, w: 130, h: 230, sobrevive: true, r: 70,
  avisos: [[0, 99], [w(8, 2), 99], [wf(8, -1) + 0.3, 0, 'inout']], vibra: [[0, 1], [w(8, 2), 1], [wf(8, -1) + 0.3, 0]], caja: [-65, -115, 130, 230] });
E.obj('ondas3', 'ondas', { t0: N[2].S - 0.1, t1: fin(3), x: 260, y: -540, n: 7, gap: 24, amp: [[0, 1], [w(8, 2), 1], [wf(8, -1) + 0.3, 0]], inspeccion: false });
E.obj('foco3', 'relleno', { t0: w(9, 0) - 0.1, t1: fin(3), x: 110, y: -170, w: 340, h: 56, pct: true, pop: true, f: [[w(9, 0), 0.1], [w(9, 6), 0.35], [w(9, 9), 0.2], [wf(9, -1), 1, 'inout']], barrido: [wf(9, -1)], caja: [-170, -40, 480, 80] });
E.obj('rotFoco3', 'rotulo', { t0: w(9, 0) - 0.1, t1: fin(3), x: 110, y: -112, texto: 'CONCENTRACIÓN', size: 22, caja: [-110, -12, 220, 24] });
E.temblor(w(9, 9), 9, 0.35);
E.obj('ch3', 'chispas', { t0: wf(9, -1), t1: wf(9, -1) + 0.8, x: 270, y: -170, r0: 40, r1: 140, inspeccion: false });
E.golpe(wf(8, -1) + 0.3, 0.04); E.golpe(wf(9, -1), 0.05); E.destello(wf(9, -1), 0.15);
E.sfx(w(9, 0), 'fill');

// ---------- cierre: resumen de las tres y envío ----------
// 10: Lo(0) que(1) cuesta(2) no(3) es(4) leer(5) el(6) correo:(7) es(8) volver(9) a(10) concentrarte.(11)
// 11: El(0) correo(1) está(2) lleno(3) de(4) lo(5) que(6) te(7) piden(8) los(9) demás.(10) Lo(11) importante(12) de(13) tu(14) día(15) no(16) está(17) ahí.(18)
// 12: Mándaselo(0) a(1) ese(2) compañero(3) que(4) contesta(5) en(6) menos(7) de(8) un(9) minuto.(10)
E.obj('rayosF', 'rayos', { t0: TC, t1: w(12, 0), capa: 'pantalla', x: 540, y: 980, r: 420, z: -2, p: [[TC, 0], [TC + 0.8, 1, 'out'], [w(12, 0) - 0.4, 1], [w(12, 0), 0]], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(12, 0), capa: 'pantalla', x: 540, y: 960, items: ['Bloques', '2 minutos', 'Sin avisos'], gap: 240,
  p: [[TC, 0], [TC + 0.9, 3, 'lin']], caja: [-330, -60, 660, 300] });
E.obj('confF', 'confeti', { t0: w(11, 11), t1: w(11, 11) + 2.0, capa: 'pantalla', x: 540, y: 880, n: 44, inspeccion: false, sinDim: true });
E.figura('yoF', { t0: w(12, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(12, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(12, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, vuelo: [[wf(12, -1), 0], [wf(12, -1) + 0.5, 1, 'in']] });
