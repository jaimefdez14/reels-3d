// L13 · Cuatro maneras de cobrar antes tus facturas (estilo B; reglas 15, 19, 20, 23)
// Gancho visual (REDACCION §2c): fotograma 0 con el autónomo, el cliente y la barra de espera ya en marcha;
// los días suben hasta 90 mientras el alquiler se cobra cada mes.
// Regla 20: el recordatorio al cliente va en bocadillo; la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'degradado', sub: 'dos', subY: 680, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 4, estilo: 'barras', aparece: w(1, 0), gap: 70 } });

// «La primera: // …» → T en «La», S en la primera palabra de la regla
const N = [2, 4, 7, 9].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(11, 0) - 0.1;

E.camara([
  [0, [0, -380, 1.04]], [w(0, 6), [0, -385, 1.07]], [w(1, 0), [0, -380, 1.02]], [N[0].T, [20, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(3, 0), [0, -385, 1.04]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(5, 10), [0, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [N[3].T, [30, -390, 1.05]],
  [N[3].S - 0.05, [0, -380, 1], 'lin'], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Tu(0) cliente(1) te(2) paga(3) a(4) noventa(5) días(6) y(7) el(8) alquiler(9) lo(10) pagas(11) cada(12) mes(13)
// 1: Cuatro(0) maneras(1) de(2) cobrar(3) antes(4) y(5) una(6) de(7) ellas(8) viene(9) en(10) la(11) ley(12)
E.figura('yo', { t0: 0, t1: fin(0), x: -340, cara: true,
  poses: [[0, 'de_pie'], [w(0, 5), 'pensar'], [w(0, 9), 'manos_cabeza'], [w(1, 0), 'de_pie'], [w(1, 12), 'celebrar']],
  sonrisa: [[0, 0.2], [w(0, 5), -0.4], [w(0, 9), -1], [w(1, 0), 0], [w(1, 12), 1.5]] });
E.figura('cli', { t0: 0, t1: fin(0), x: 340, dir: -1, color: 'gris', poses: [[0, 'ofrecer'], [w(0, 7), 'de_pie']] });
// la espera: días que suben hasta 90 y una barra que se llena despacio
E.obj('diasH', 'contador', { t0: 0, t1: w(1, 0), x: 0, y: -470, v: [[0, 8], [w(0, 5), 30], [wf(0, 6), 90, 'inout']], suf: ' días', size: 70, col: 'txt', miles: false, caja: [-150, -42, 300, 84] });
E.obj('esperaH', 'relleno', { t0: 0, t1: w(1, 0), x: 0, y: -360, w: 420, h: 50, f: [[0, 0.1], [w(0, 5), 0.33], [wf(0, 6), 1, 'inout']], rotulo: 'ESPERANDO EL PAGO', caja: [-210, -60, 420, 85] });
// el alquiler: una etiqueta que se cobra cada mes (tres golpes)
E.obj('alqH', 'etiqueta', { t0: w(0, 8) - 0.1, t1: w(1, 0), x: 0, y: -200, w: 300, h: 120, pop: true, on: 0.25,
  v: [[w(0, 9), 800], [w(0, 11), 1600, 'out'], [wf(0, 13), 2400, 'out']], caja: [-150, -60, 300, 120] });
E.obj('rotAlqH', 'rotulo', { t0: w(0, 9), t1: w(1, 0), x: 0, y: -110, texto: 'ALQUILER PAGADO', caja: [-150, -16, 300, 32] });
[w(0, 9), w(0, 11), wf(0, 13)].forEach(tg => { E.temblor(tg, 9, 0.3); });
E.golpe(wf(0, 13), 0.05);
// «Cuatro maneras»: cuatro monedas; «una de ellas viene en la ley»: la segunda se ilumina con el rótulo LEY
[0, 1, 2, 3].forEach(i => { const a = w(1, 0) + i * 0.12; E.obj('regla' + i, 'moneda', { t0: a, t1: fin(0), x: -135 + i * 90, y: -330, r: 30, n: i + 1, pop: true, sfx: i === 0, inspeccion: false, sobrevive: i === 3,
  s: i === 1 ? [[0, 1], [w(1, 9), 1], [w(1, 9) + 0.35, 1.45, 'back']] : 1, luz: i === 1 ? 1 : [[0, 1], [w(1, 9), 1], [w(1, 9) + 0.3, 0.35]], barrido: i === 1 ? [w(1, 12)] : null }); });
E.obj('ley', 'rotulo', { t0: w(1, 10), t1: fin(0), x: -45, y: -420, texto: 'LEY', size: 44, col: '#e6ce46', pop: true, caja: [-60, -24, 120, 48] });
E.obj('rayosH', 'rayos', { t0: w(1, 9), t1: fin(0), x: -45, y: -330, r: 300, z: -2, p: [[w(1, 9), 0], [w(1, 12), 1, 'out']], inspeccion: false });
E.obj('chH', 'chispas', { t0: wf(1, -1), t1: wf(1, -1) + 0.8, x: -45, y: -330, r0: 60, r1: 140, n: 14, inspeccion: false });
E.destello(wf(1, -1), 0.25);

// ---------- 1 · factura el mismo día que entregues el trabajo ----------
// 2: La(0) primera(1) factura(2) el(3) mismo(4) día(5) que(6) entregues(7) el(8) trabajo(9)
// 3: Cada(0) día(1) que(2) tardas(3) en(4) facturar(5) es(6) un(7) día(8) más(9) que(10) tardas(11) en(12) cobrar(13)
E.numero(1, N[0].T, N[0].S, { desde: 'regla3', hacia: 'facturas' });
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -360, cara: true, toca: ['facturas'],
  poses: [[0, 'de_pie'], [w(2, 2), 'escribir'], [w(2, 7), 'ofrecer'], [w(3, 0), 'pensar'], [w(3, 9), 'triste'], [wf(3, -1), 'de_pie']], sonrisa: [[w(2, 7), 1], [w(3, 9), -0.8]] });
E.obj('facturas', 'papeles', { t0: N[0].S - 0.1, t1: fin(1), x: 40, y: -250, n: 5, k: [[0, 1], [w(2, 2), 1], [wf(2, -1), 5, 'out']], sobrevive: true, caja: [-90, -110, 180, 130] });
E.obj('rotFact', 'rotulo', { t0: w(2, 2), t1: fin(1), x: 40, y: -190, texto: 'FACTURAS', caja: [-110, -16, 220, 32] });
E.obj('hoy1', 'rotulo', { t0: w(2, 5), t1: w(3, 0), x: 40, y: -470, texto: 'HOY', size: 46, col: '#e6ce46', pop: true, caja: [-60, -24, 120, 48] });
E.obj('ch1', 'chispas', { t0: wf(2, -1), t1: wf(2, -1) + 0.8, x: 40, y: -330, r0: 80, r1: 170, inspeccion: false });
// cada día de retraso al facturar suma un día de espera para cobrar
E.obj('retraso', 'contador', { t0: w(3, 0), t1: fin(1), x: 230, y: -470, v: [[w(3, 1), 0], [wf(3, 5), 5, 'inout']], pre: '+', suf: ' días', size: 56, col: 'txt', miles: false, pop: true, caja: [-120, -34, 240, 68] });
E.obj('cobro1', 'relleno', { t0: w(3, 6), t1: fin(1), x: 40, y: -95, w: 380, h: 44, f: [[w(3, 8), 0.6], [wf(3, -1), 0.95, 'inout']], rotulo: 'HASTA COBRAR', caja: [-190, -56, 380, 78] });
E.temblor(wf(3, -1), 10, 0.35);

// ---------- 2 · sesenta días como mucho: lo dice la ley ----------
// 4: La(0) segunda(1) pon(2) en(3) el(4) presupuesto(5) que(6) pagan(7) en(8) sesenta(9) días(10) como(11) mucho(12)
// 5: Es(0) el(1) máximo(2) que(3) fija(4) la(5) ley(6) también(7) para(8) autónomos(9) Esos(10) noventa(11) días(12) no(13) son(14) legales(15)
// 6: Y(0) no(1) se(2) puede(3) alargar(4) ni(5) aunque(6) firméis(7) otro(8) plazo(9)
E.numero(2, N[1].T, N[1].S, { desde: 'facturas', hacia: 'plazo' });
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -340, cara: true,
  poses: [[0, 'de_pie'], [w(4, 2), 'ofrecer'], [w(5, 0), 'senalar'], [w(5, 13), 'encoger'], [w(6, 0), 'senalar'], [wf(6, -1), 'celebrar']], sonrisa: [[w(5, 13), -0.3], [wf(6, -1), 1.3]] });
// la barra del plazo: se llena hasta la marca de 60 días; los 90 se pasan de la marca y vuelven
E.obj('plazo', 'barra', { t0: N[1].S - 0.1, t1: fin(2), x: 60, y: -330, w: 520, h: 60, sobrevive: true,
  f: [[0, 0.05], [w(4, 6), 0.05], [wf(4, 10), 0.667, 'inout'], [w(5, 10), 0.667], [wf(5, 12), 1, 'inout'], [w(6, 1), 1], [w(6, 4), 0.667, 'back']],
  marca: [[0, -1], [w(5, 2), 0.667]], rotMarca: 'MÁXIMO LEGAL', barrido: [w(5, 6)], caja: [-260, -90, 520, 160] });
E.obj('dias2', 'contador', { t0: w(4, 2), t1: fin(2), x: 60, y: -200, v: [[w(4, 6), 0], [wf(4, 10), 60, 'inout'], [w(5, 10), 60], [wf(5, 12), 90, 'inout'], [w(6, 1), 90], [w(6, 4), 60, 'out']], suf: ' días', size: 60, col: 'txt', miles: false, pop: true, caja: [-130, -36, 260, 72] });
E.obj('noLegal', 'pieza', { t0: w(5, 13) - 0.05, t1: w(6, 4), r: 34, texto: '✕', x: 275, y: -480, pop: true, on: 1, caja: [-34, -34, 68, 68] });
E.temblor(w(5, 13), 16, 0.45); E.golpe(w(5, 13), 0.05);
E.obj('ch2', 'chispas', { t0: wf(6, -1), t1: wf(6, -1) + 0.8, x: 60, y: -330, r0: 120, r1: 230, n: 14, inspeccion: false });

// ---------- 3 · pide un anticipo del treinta por ciento ----------
// 7: La(0) tercera(1) pide(2) un(3) anticipo(4) del(5) treinta(6) por(7) ciento(8) antes(9) de(10) empezar(11)
// 8: Así(0) una(1) parte(2) ya(3) la(4) tienes(5) cobrada(6)
E.numero(3, N[2].T, N[2].S, { desde: 'plazo', hacia: 'tarro' });
E.figura('yo3', { t0: N[2].S - 0.1, t1: fin(3), x: -360, cara: true,
  poses: [[0, 'de_pie'], [w(7, 2), 'ofrecer'], [w(8, 0), 'senalar'], [wf(8, -1), 'celebrar']], sonrisa: [[w(7, 6), 0.5], [wf(8, -1), 1.6]] });
E.figura('cli3', { t0: N[2].S - 0.1, t1: fin(3), x: 360, dir: -1, color: 'gris', poses: [[0, 'de_pie'], [w(7, 6), 'ofrecer'], [w(8, 3), 'de_pie']] });
E.obj('tarro', 'tarro', { t0: N[2].S - 0.1, t1: fin(3), x: 0, y: -150, w: 170, h: 220, rotulo: 'COBRADO', sobrevive: true,
  nivel: [[0, 0], [w(8, 0), 0], [wf(8, -1), 0.3, 'out']], caja: [-85, -225, 170, 290] });
E.obj('pct3', 'contador', { t0: w(7, 4), t1: fin(3), x: 0, y: -460, v: [[w(7, 5), 0], [wf(7, 8), 30, 'inout']], suf: ' %', size: 70, col: 'txt', miles: false, pop: true, caja: [-110, -42, 220, 84] });
for (let i = 0; i < 5; i++) { const a = w(8, 0) + i * 0.13;
  E.obj('mon3' + i, 'moneda', { t0: a, t1: a + 0.7, entra: 0.05, sale: 0.2, r: 24, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, 300], [a + 0.6, 0, 'in']], y: [[a, -420], [a + 0.3, -470, 'out'], [a + 0.6, -260, 'in']] }); }
E.obj('ch3', 'chispas', { t0: wf(8, -1), t1: wf(8, -1) + 0.8, x: 0, y: -260, r0: 90, r1: 180, inspeccion: false });
E.golpe(wf(8, -1), 0.04);

// ---------- 4 · un recordatorio el mismo día que vence ----------
// 9: La(0) cuarta(1) manda(2) un(3) recordatorio(4) el(5) mismo(6) día(7) que(8) vence(9) la(10) factura(11)
// 10: Un(0) mensaje(1) amable(2) con(3) la(4) factura(5) adjunta(6) sin(7) esperar(8) una(9) semana(10)  [bocadillo]
E.numero(4, N[3].T, N[3].S, { desde: 'tarro', hacia: 'movil' });
E.figura('yo4', { t0: N[3].S - 0.1, t1: TC, x: -370, cara: true, toca: ['movil'],
  poses: [[0, 'de_pie'], [w(9, 2), 'senalar'], [w(10, 0), 'ofrecer'], [wf(10, -1), 'celebrar']], sonrisa: [[w(10, 2), 1], [wf(10, -1), 1.6]] });
E.obj('movil', 'telefono', { t0: N[3].S - 0.1, t1: TC, x: -150, y: -300, w: 130, h: 230, sobrevive: true, vibra: [[0, 0], [w(10, 0), 0], [w(10, 0) + 0.1, 1], [w(10, 3), 0]], caja: [-65, -115, 130, 230] });
E.obj('semana', 'dias', { t0: w(9, 4), t1: w(10, 0) - 0.1, x: 150, y: -440, gap: 56, letras: ['L', 'M', 'X', 'J', 'V', 'S', 'D'], s: 0.75,
  luz: [[w(9, 4), 0], [w(9, 9), 3, 'inout']], caja: [-200, -24, 400, 48] });
E.obj('hoy4', 'rotulo', { t0: w(9, 9), t1: w(10, 0) - 0.1, x: 150, y: -385, texto: 'VENCE HOY', size: 26, col: '#e6ce46', pop: true, caja: [-90, -16, 180, 32] });
E.obj('aviso', 'bocadillo', { t0: w(10, 0) - 0.1, t1: wf(10, -1) + 0.2, x: 50, y: -470, w: 660, h: 96, texto: 'Te recuerdo que la factura número 23 vence hoy', size: 24, on: 1, pop: true, caja: [-330, -48, 660, 122] });
E.obj('pago4', 'etiqueta', { t0: w(10, 7), t1: TC, x: 160, y: -230, w: 300, h: 120, pop: true, barrido: [wf(10, -1)], v: [[w(10, 7), 0], [wf(10, -1) + 0.2, 1200, 'out']], caja: [-150, -60, 300, 120] });
E.obj('ch4', 'chispas', { t0: wf(10, -1) + 0.1, t1: wf(10, -1) + 0.9, x: 160, y: -230, r0: 100, r1: 200, inspeccion: false });
E.obj('conf4', 'confeti', { t0: wf(10, -1), t1: wf(10, -1) + 1.6, x: 160, y: -300, dur: 1.5, n: 30, fuerza: 700, inspeccion: false });
E.golpe(wf(10, -1), 0.05);

// ---------- cierre: resumen (vuelve al gancho) y envío ----------
// 11: Cobrar(0) a(1) tiempo(2) no(3) depende(4) de(5) tener(6) suerte(7) con(8) el(9) cliente(10) sino(11) de(12) no(13) dejar(14) nada(15) para(16) después(17)
// 12: Mándaselo(0) a(1) ese(2) autónomo(3) que(4) todavía(5) está(6) esperando(7) a(8) cobrar(9) lo(10) de(11) septiembre(12)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(12, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(11, 11), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(12, 0), capa: 'pantalla', x: 540, y: 960, items: ['Factura', '60 días', 'Anticipo', 'Aviso'], gap: 210,
  p: [[TC, 0], [TC + 0.9, 4, 'lin']], barrido: [w(11, 11)], caja: [-420, -60, 840, 200] });
E.obj('confC', 'confeti', { t0: wf(11, -1), t1: wf(11, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 54, inspeccion: false });
E.destello(wf(11, -1), 0.25); E.golpe(wf(11, -1), 0.04);
E.figura('yoF', { t0: w(12, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(12, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(12, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(12, 9)], vuelo: [[wf(12, -1), 0], [wf(12, -1) + 0.5, 1, 'in']] });
