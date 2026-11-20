// L36 · El efecto de la opción por defecto (estilo B; reglas 15, 20, 21, 24)
// Gancho visual: un mes gratis en el móvil; el contador de meses rueda hasta 6 y la pila de monedas se va al móvil, mes a mes.
// Concepto: casillas que vienen marcadas (nadie las cambia) y el experimento de donar órganos, 82 % frente a 42 %, en dos barras.
// Los tres puntos: tarro de ahorro que se llena solo; recibos que se revisan y se dan de baja; mes gratis en un calendario
// con su final y el aviso dos días antes.
// Regla 20: «Ya me daré de baja.» va en bocadillo del muñeco; la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(3, 0), gap: 70, y: 360 } });

// «La primera: // …» → T en «La», S en la primera palabra del punto
const N = [4, 6, 8].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(10, 0) - 0.1;   // resumen
const ROJO = '#e4574f';
const AM = '#e6ce46';

E.camara([
  [0, [0, -380, 1.04]], [w(0, 9), [-10, -385, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 12), [10, -385, 1.05]],
  [w(2, 0), [0, -380, 1.02]], [w(2, 15), [10, -385, 1.05]], [w(3, 0), [0, -380, 1.03]], [N[0].T, [10, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(5, 0), [-15, -385, 1.04]], [w(5, 8), [-5, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(7, 0), [-15, -385, 1.04]], [w(7, 10), [10, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(9, 0), [15, -385, 1.04]], [w(9, 10), [0, -390, 1.05]], [TC - 0.1, [0, -385, 1.04]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Te(0) apuntas(1) a(2) un(3) mes(4) gratis(5) y(6) seis(7) meses(8) después(9) sigues(10) pagándolo(11)   [bocadillo «Ya me daré de baja.»]
// 1: Se(0) llama(1) efecto(2) de(3) la(4) opción(5) por(6) defecto(7) lo(8) que(9) viene(10) marcado(11) casi(12) nadie(13) lo(14) cambia(15)
// 2: En(0) un(1) experimento(2) si(3) la(4) casilla(5) de(6) donar(7) órganos(8) venía(9) marcada(10) la(11) dejaba(12) así(13) el(14) 82(15) %(16) Si(17) había(18) que(19) marcarla(20) solo(21) el(22) 42(23) %(24)
// 3: Tres(0) maneras(1) de(2) ponerlo(3) a(4) tu(5) favor(6)
E.figura('yo', { t0: 0, t1: fin(0), x: -350, cara: true,
  poses: [[0, 'celebrar'], [w(0, 1), 'senalar'], [w(0, 6), 'de_pie'], [w(0, 10), 'manos_cabeza'],
    [w(1, 0), 'de_pie'], [w(1, 2), 'senalar'], [w(1, 12), 'encoger'], [w(2, 0), 'pensar'], [w(2, 5), 'senalar'], [w(2, 14), 'celebrar'],
    [w(2, 17), 'de_pie'], [w(2, 21), 'encoger'], [w(3, 0), 'senalar'], [w(3, 4), 'celebrar']],
  sonrisa: [[0, 1.4], [w(0, 7), 0.4], [w(0, 10), -1.2], [w(1, 0), 0], [w(1, 12), -0.4], [w(2, 0), 0], [w(2, 14), 1.2], [w(2, 21), -0.6], [w(3, 0), 0.6], [w(3, 4), 1.5]] });
// «un mes gratis»: el móvil con la prueba gratis; el muñeco lo celebra y dice (sin voz) «Ya me daré de baja.»
E.obj('bocaH', 'bocadillo', { t0: 0.3, t1: w(0, 6) + 0.1, sale: 0.2, x: -60, y: -490, w: 360, h: 80, texto: 'Ya me daré de baja.', size: 28, pop: true,
  on: [[0.3, 0], [0.8, 1]], caja: [-180, -40, 360, 106] });
const MX = 230;
E.obj('movil0', 'telefono', { t0: 0.1, t1: w(1, 0), sale: 0.25, x: MX, y: -300, w: 160, h: 280, pop: true,
  vibra: [[w(0, 7), 0], [w(0, 7) + 0.1, 1], [w(0, 11), 1], [wf(0, -1) + 0.2, 0]], brillo: [[0, 0.6], [w(0, 4), 1]], caja: [-80, -140, 160, 280] });
E.obj('rotGratis', 'rotulo', { t0: w(0, 4) - 0.1, t1: w(1, 0), sale: 0.25, x: MX, y: -125, pop: true,
  texto: [[0, 'MES GRATIS'], [w(0, 10), 'SIGUES PAGANDO']], size: 26, col: AM, caja: [-140, -16, 280, 32] });
// «seis meses después»: el contador de meses rueda de 1 a 6 y cada mes una moneda sale de la pila hacia el móvil
const M0 = w(0, 7), M1 = wf(0, -1);
E.obj('meses', 'contador', { t0: M0 - 0.05, t1: w(1, 0), sale: 0.25, x: MX, y: -500, pre: 'MES ', size: 64, col: 'txt', miles: false, pop: true,
  v: [[M0, 1], [M1, 6, 'inout']], barrido: [M1], caja: [-130, -36, 260, 72] });
E.obj('pila0', 'pila', { t0: 0.1, t1: w(1, 0), sale: 0.25, x: -90, n: 6, w: 130, hh: 24, k: [[M0, 6], [M1, 0, 'lin']], caja: [-65, -130, 130, 130], refl: true });
for (let i = 0; i < 6; i++) { const a = M0 + i * (M1 - M0) / 6;
  E.obj('paga' + i, 'moneda', { t0: a, t1: a + 0.6, entra: 0.05, sale: 0.12, r: 20, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, -90], [a + 0.55, MX, 'inout']], y: [[a, -120 + i * 18], [a + 0.28, -260], [a + 0.55, -300, 'in']] }); }
E.temblor(w(0, 11), 12, 0.4); E.golpe(w(0, 11), 0.04);

// «opción por defecto: lo que viene marcado»: tres casillas que se marcan solas; «casi nadie lo cambia»: tres muñecos grises no tocan nada
E.obj('marcado', 'lista', { t0: w(1, 0) + 0.05, t1: w(2, 0), sale: 0.25, x: 120, y: -400, n: 3, w: 340, gap: 64, pop: true,
  p: [[w(1, 9), 0], [w(1, 11) + 0.4, 3, 'out']], brillo: [[w(1, 12), 0], [wf(1, -1), 3]], barrido: [w(1, 11) + 0.4], caja: [-170, -82, 340, 164] });
E.sfx(w(1, 10), 'fill');
E.obj('rotDef', 'rotulo', { t0: w(1, 4), t1: w(2, 0), sale: 0.25, x: 120, y: -525, pop: true,
  texto: [[0, 'POR DEFECTO'], [w(1, 12), 'CASI NADIE LO CAMBIA']], size: 26, col: AM, caja: [-200, -16, 400, 32] });
[0, 130, 260].forEach((x, i) => { const a = w(1, 12 + i);
  E.figura('gris' + i, { t0: a, t1: w(2, 0), x, talla: 230, color: 'gris', poses: [[0, 'de_pie'], [wf(1, -1) - 0.1 + i * 0.08, 'encoger']] }); });

// «En un experimento»: la casilla de donar órganos (corazón) viene marcada → el 82 % la deja así; si hay que marcarla → el 42 %
E.obj('rotExp', 'rotulo', { t0: w(2, 0) - 0.05, t1: w(2, 4) - 0.05, sale: 0.2, x: 120, y: -500, pop: true, texto: 'UN EXPERIMENTO', size: 30, col: '#c9ccca', caja: [-140, -18, 280, 36] });
E.obj('corazon2', 'corazon', { t0: w(2, 7) - 0.05, t1: w(3, 0), sale: 0.25, x: -60, y: -500, r: 40, pop: true, caja: [-50, -40, 100, 82] });
E.obj('casilla', 'lista', { t0: w(2, 4) - 0.05, t1: w(3, 0), sale: 0.25, x: 170, y: -500, n: 1, w: 300, pop: true,
  p: [[w(2, 9), 0], [w(2, 10) + 0.3, 1, 'out'], [w(2, 17), 1], [w(2, 17) + 0.25, 0]], brillo: [[w(2, 9), 0], [w(2, 10) + 0.3, 1], [w(2, 17), 1], [w(2, 17) + 0.25, 0]], caja: [-150, -22, 300, 44] });
E.obj('rotDonar', 'rotulo', { t0: w(2, 7) - 0.05, t1: w(3, 0), sale: 0.25, x: 185, y: -452, texto: 'DONAR ÓRGANOS', size: 24, col: '#9a9c9b', caja: [-120, -15, 240, 30] });
E.obj('barra82', 'relleno', { t0: w(2, 9) - 0.1, t1: w(3, 0), sale: 0.25, x: 30, y: -340, w: 330, h: 48, pop: true, pct: true, rotulo: 'VENÍA MARCADA',
  f: [[w(2, 11), 0], [w(2, 15) + 0.2, 0.82, 'out']], barrido: [w(2, 16)], caja: [-165, -60, 480, 90] });
E.sfx(w(2, 11), 'fill');
E.obj('barra42', 'relleno', { t0: w(2, 17) - 0.1, t1: w(3, 0), sale: 0.25, x: 30, y: -210, w: 330, h: 48, pop: true, pct: true, rotulo: 'HABÍA QUE MARCARLA',
  f: [[w(2, 19), 0], [w(2, 23) + 0.2, 0.42, 'out']], caja: [-165, -60, 480, 90] });
E.sfx(w(2, 19), 'fill');
E.obj('ch82', 'chispas', { t0: w(2, 15) + 0.2, t1: w(2, 15) + 1, x: 280, y: -340, r0: 60, r1: 140, inspeccion: false });
E.golpe(w(2, 15) + 0.2, 0.04); E.destello(w(2, 15) + 0.2, 0.12); E.temblor(w(2, 23) + 0.2, 8, 0.3);

// «Tres maneras de ponerlo a tu favor»: tres monedas; la primera crece y brilla
E.obj('rayosH', 'rayos', { t0: w(3, 0), t1: fin(0), x: 120, y: -440, r: 300, z: -2, p: [[w(3, 0), 0], [wf(3, -1), 1, 'out']], inspeccion: false });
[0, 1, 2].forEach(i => { const a = w(3, 0) + i * 0.14;
  E.obj('s' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: 0 + i * 120, y: -440, r: 44, n: i + 1, pop: true, sfx: i === 0, inspeccion: false,
    s: i === 0 ? [[0, 1], [w(3, 4), 1], [w(3, 4) + 0.35, 1.35, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [w(3, 5), 1], [w(3, 5) + 0.3, 0.35]], barrido: i === 0 ? [w(3, 6)] : null }); });
E.obj('chH', 'chispas', { t0: w(3, 6), t1: w(3, 6) + 0.8, x: 0, y: -440, r0: 60, r1: 150, inspeccion: false });
E.destello(w(3, 5), 0.12);

// ---------- 1 · que ahorrar sea lo automático ----------
// 4: La(0) primera(1) que(2) ahorrar(3) sea(4) lo(5) automático(6)
// 5: Programa(0) una(1) transferencia(2) para(3) el(4) día(5) que(6) cobras(7) Si(8) no(9) haces(10) nada(11) ahorras(12)
E.numero(1, N[0].T, N[0].S, { desde: 's1', hacia: 'ahorro' });
const P1 = -150, T1 = 200;
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -365, cara: true, toca: ['movil1'],
  poses: [[0, 'de_pie'], [w(4, 3), 'senalar'], [w(4, 6), 'celebrar'], [w(5, 0), 'ofrecer'], [w(5, 4), 'senalar'], [w(5, 8), 'de_pie'], [w(5, 9), 'encoger'], [w(5, 12), 'celebrar']],
  sonrisa: [[w(4, 3), 0.5], [w(4, 6), 1.3], [w(5, 0), 0.4], [w(5, 9), 0.2], [w(5, 12), 1.5]] });
E.obj('ahorro', 'tarro', { t0: N[0].S - 0.1, t1: fin(1), x: T1, w: 200, h: 260, rotulo: 'AHORRO', pop: true, sobrevive: true, r: 80, oy: -130,
  nivel: [[w(4, 5), 0], [w(4, 6) + 0.6, 0.25, 'out'], [w(5, 11), 0.25], [wf(5, -1) + 0.4, 0.8, 'out']],
  barrido: [w(4, 6) + 0.6, wf(5, -1) + 0.4], caja: [-100, -260, 200, 260], refl: true });
E.sfx(w(4, 6), 'fill');
E.obj('rotAuto', 'rotulo', { t0: w(4, 5), t1: fin(1), x: T1, y: -300, texto: 'AUTOMÁTICO', size: 26, col: AM, pop: true, caja: [-100, -16, 200, 32] });
for (let i = 0; i < 3; i++) { const a = w(4, 5) + i * 0.18;
  E.obj('m1a_' + i, 'moneda', { t0: a, t1: a + 0.7, entra: 0.06, sale: 0.12, r: 20, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, P1 + 40], [a + 0.6, T1, 'inout']], y: [[a, -250], [a + 0.3, -400], [a + 0.6, -150, 'in']] }); }
// «Programa una transferencia»: el móvil, y una flecha discontinua del móvil al tarro que se dibuja
E.obj('movil1', 'telefono', { t0: w(5, 0) - 0.15, t1: fin(1), x: P1, y: -320, w: 130, h: 230, pop: true,
  vibra: [[w(5, 11), 0], [w(5, 11) + 0.1, 1], [wf(5, -1), 0]], caja: [-65, -115, 130, 230] });
E.obj('flecha1', 'flecha', { t0: w(5, 1), t1: fin(1), de: [P1 + 80, -330], hasta: [T1 - 115, -230], curva: -0.3, discontinua: true,
  p: [[w(5, 1), 0], [w(5, 2) + 0.5, 1, 'out']], inspeccion: false });
E.sfx(w(5, 2), 'whoosh');
// «para el día que cobras»: el calendario se para en el 28
E.obj('dia1', 'dias', { t0: w(5, 3) - 0.15, t1: fin(1), x: 150, y: -515, letras: ['26', '27', '28', '29', '30'], gap: 80, pop: true,
  luz: [[w(5, 4), -1], [w(5, 7), 2, 'inout']], caja: [-195, -32, 390, 64] });
E.obj('rotDia1', 'rotulo', { t0: w(5, 6), t1: fin(1), x: 150, y: -450, texto: [[0, 'DÍA DE COBRO'], [w(5, 11), 'SIN HACER NADA']], size: 24, col: AM, pop: true, caja: [-130, -15, 260, 30] });
// «Si no haces nada, ahorras»: el muñeco se encoge de hombros y las monedas vuelan solas del móvil al tarro
for (let i = 0; i < 5; i++) { const a = w(5, 11) + i * 0.16;
  E.obj('m1_' + i, 'moneda', { t0: a, t1: a + 0.75, entra: 0.06, sale: 0.12, r: 22, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, P1], [a + 0.65, T1, 'inout']], y: [[a, -330], [a + 0.32, -420], [a + 0.65, -150, 'in']] }); }
E.sfx(w(5, 11), 'fill');
E.obj('ch1', 'chispas', { t0: wf(5, -1) + 0.4, t1: wf(5, -1) + 1.2, x: T1, y: -150, r0: 110, r1: 210, inspeccion: false });
E.golpe(wf(5, -1) + 0.4, 0.04); E.destello(wf(5, -1) + 0.4, 0.12);

// ---------- 2 · revisa cada mes los recibos domiciliados ----------
// 6: La(0) segunda(1) revisa(2) cada(3) mes(4) los(5) recibos(6) domiciliados(7)
// 7: Mira(0) qué(1) se(2) te(3) cobra(4) sin(5) que(6) lo(7) notes(8) y(9) da(10) de(11) baja(12) lo(13) que(14) no(15) hayas(16) usado(17)
E.numero(2, N[1].T, N[1].S, { desde: 'ahorro', hacia: 'recibos' });
const LX = 90, LY = -300, GAP = 62;
const rowY = i => LY + (i - 1.5) * GAP;
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -390, cara: true,
  poses: [[0, 'de_pie'], [w(6, 2), 'senalar'], [w(6, 6), 'pensar'], [w(7, 0), 'senalar'], [w(7, 5), 'pensar'], [w(7, 10), 'senalar'], [wf(7, -1), 'celebrar']],
  sonrisa: [[w(6, 2), 0.4], [w(6, 6), 0], [w(7, 5), -0.5], [w(7, 10), 0.6], [wf(7, -1), 1.5]] });
// los recibos: cuatro renglones que se revisan uno a uno (casillas en cascada)
E.obj('recibos', 'lista', { t0: N[1].S - 0.1, t1: fin(2), x: LX, y: LY, n: 4, w: 320, gap: GAP, pop: true, sobrevive: true, r: 70,
  p: [[w(6, 5), 0], [wf(6, -1) + 0.3, 4, 'lin']], brillo: [[w(7, 0), 0], [w(7, 8), 4, 'lin'], [w(7, 9), 4], [w(7, 9) + 0.3, 0]], caja: [-160, -111, 320, 222] });
E.sfx(w(6, 5), 'fill');
E.obj('rotRec', 'rotulo', { t0: w(6, 5), t1: fin(2), x: LX, y: -440, texto: [[0, 'RECIBOS DOMICILIADOS'], [w(7, 4), 'SE COBRAN SOLOS']], size: 24, col: '#9a9c9b', pop: true, caja: [-170, -15, 340, 30] });
// «cada mes»: los meses se encienden uno detrás de otro
E.obj('meses2', 'dias', { t0: w(6, 3) - 0.15, t1: fin(2), x: LX, y: -510, letras: ['ENE', 'FEB', 'MAR', 'ABR'], gap: 90, pop: true,
  luz: [[w(6, 3), -1], [w(6, 5) + 0.3, 3, 'inout'], [w(7, 0), 3], [w(7, 0) + 0.01, -1], [w(7, 8), 3, 'lin']], caja: [-165, -32, 330, 64] });
// «sin que lo notes»: de cada recibo sale una moneda hacia la derecha, en silencio
for (let i = 0; i < 4; i++) { const a = w(7, 1) + i * 0.3;
  E.obj('cobro' + i, 'moneda', { t0: a, t1: a + 0.7, entra: 0.06, sale: 0.15, r: 18, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, LX + 170], [a + 0.65, 600, 'in']], y: [[a, rowY(i)], [a + 0.65, rowY(i) - 40]] }); }
// «da de baja lo que no hayas usado»: dos recibos se marcan como BAJA y su moneda vuelve
[[1, w(7, 12)], [3, wf(7, -1) - 0.1]].forEach(([i, a], j) => {
  E.obj('baja' + i, 'rotulo', { t0: a - 0.1, t1: fin(2), x: 310, y: rowY(i), texto: 'BAJA', size: 28, col: ROJO, pop: true, caja: [-50, -17, 100, 34] });
  E.golpe(a, 0.02);
  E.obj('vuelve' + i, 'moneda', { t0: a, t1: a + 0.75, entra: 0.06, sale: 0.15, r: 22, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, 600], [a + 0.65, -240, 'inout']], y: [[a, rowY(i) - 40], [a + 0.32, -560], [a + 0.65, -330, 'in']] });
});
E.obj('ch2', 'chispas', { t0: wf(7, -1) + 0.5, t1: wf(7, -1) + 1.3, x: -240, y: -330, r0: 50, r1: 130, inspeccion: false });
E.destello(wf(7, -1) + 0.5, 0.12);

// ---------- 3 · mes gratis: apunta cuándo termina y pon un aviso dos días antes ----------
// 8: La(0) tercera(1) cuando(2) te(3) des(4) de(5) alta(6) en(7) un(8) mes(9) gratis(10) apunta(11) cuándo(12) termina(13)
// 9: Pon(0) un(1) aviso(2) dos(3) días(4) antes(5) Si(6) no(7) te(8) convence(9) te(10) das(11) de(12) baja(13)
E.numero(3, N[2].T, N[2].S, { desde: 'recibos', hacia: 'mes3' });
const GX = 140, GY = -330, CEL = 60;   // calendario de 7 x 4 días; la casilla i está en (q, r) = (i % 7, i / 7)
const cel = i => [GX + (i % 7 - 3) * CEL, GY + (Math.floor(i / 7) - 1.5) * CEL];
E.figura('yo3', { t0: N[2].S - 0.1, t1: TC, x: -390, cara: true, toca: ['movil3'],
  poses: [[0, 'de_pie'], [w(8, 4), 'senalar'], [w(8, 9), 'celebrar'], [w(8, 11), 'ofrecer'], [w(9, 0), 'senalar'], [w(9, 6), 'pensar'], [w(9, 10), 'apartarse'], [wf(9, -1), 'celebrar']],
  sonrisa: [[w(8, 4), 0.4], [w(8, 9), 1.2], [w(8, 11), 0.4], [w(9, 6), -0.4], [w(9, 10), 0.6], [wf(9, -1), 1.5]] });
E.obj('mes3', 'cuadricula', { t0: N[2].S - 0.1, t1: TC, x: GX, y: GY, cols: 7, rows: 4, lado: 50, gap: 10, on: [...Array(28).keys()], pop: true,
  p: [[w(8, 8), 0], [wf(8, 10) + 0.3, 1, 'out']], luz: [[w(9, 11), 1], [wf(9, -1) + 0.2, 0.45]], barrido: [wf(8, 10) + 0.3], caja: [-205, -115, 410, 230] });
E.sfx(w(8, 8), 'fill');
E.obj('rotMes', 'rotulo', { t0: w(8, 8) - 0.1, t1: TC, x: GX, y: -480, texto: [[0, 'MES GRATIS'], [w(9, 11), 'DADO DE BAJA']], size: 26, col: AM, pop: true, caja: [-130, -16, 260, 32] });
// «apunta cuándo termina»: un anillo se dibuja alrededor del último día
const [ex, ey] = cel(27), [ax, ay] = cel(25);
E.obj('finMes', 'anillo', { t0: w(8, 12), t1: TC, x: ex, y: ey, rx: 40, ry: 40, rodea: true, w: 5, col: AM, p: [[w(8, 12), 0], [wf(8, -1) + 0.2, 1, 'out']] });
E.obj('rotFin', 'rotulo', { t0: w(8, 13), t1: TC, x: 250, y: -180, texto: [[0, 'TERMINA'], [w(9, 2), 'AVISO 2 DÍAS ANTES']], size: 24, col: '#c9ccca', pop: true, caja: [-150, -15, 300, 30] });
// «Pon un aviso dos días antes»: el móvil vibra con un aviso y otro anillo marca el día del aviso
E.obj('movil3', 'telefono', { t0: w(9, 0) - 0.15, t1: TC, x: -170, y: -330, w: 120, h: 210, pop: true,
  avisos: [[w(9, 2), 0], [w(9, 2) + 0.2, 1]], vibra: [[w(9, 2), 0], [w(9, 2) + 0.1, 1], [w(9, 5), 1], [w(9, 5) + 0.3, 0]], brillo: [[w(9, 11), 1], [wf(9, -1), 0.3]], caja: [-60, -105, 120, 210] });
E.obj('aviso3', 'anillo', { t0: w(9, 2), t1: TC, x: ax, y: ay, rx: 40, ry: 40, rodea: true, w: 5, col: AM, p: [[w(9, 2), 0], [w(9, 5), 1, 'out']] });
E.obj('pulso3', 'pulso', { t0: w(9, 2), t1: w(9, 2) + 0.7, x: -170, y: -330, r0: 60, r1: 160, inspeccion: false });
// «Si no te convence, te das de baja»: el muñeco se aparta, el mes se apaga
E.temblor(w(9, 11), 8, 0.3);
E.obj('ch3', 'chispas', { t0: wf(9, -1), t1: wf(9, -1) + 0.8, x: GX, y: GY, r0: 120, r1: 240, inspeccion: false });
E.golpe(wf(9, -1), 0.04); E.destello(wf(9, -1), 0.12);

// ---------- cierre: resumen y envío ----------
// 10: Lo(0) que(1) decides(2) una(3) vez(4) se(5) repite(6) todos(7) los(8) meses(9)
// 11: Mándaselo(0) a(1) ese(2) amigo(3) que(4) paga(5) tres(6) plataformas(7) y(8) solo(9) ve(10) una(11)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(10, 6), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, items: ['Ahorro', 'Recibos', 'Aviso'], gap: 230,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(10, 6)], caja: [-360, -60, 720, 200] });
E.obj('confC', 'confeti', { t0: wf(10, -1), t1: wf(10, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(10, -1), 0.22); E.golpe(wf(10, -1), 0.04);
E.figura('yoF', { t0: w(11, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(11, 1), 'senalar'], [w(11, 9), 'encoger']] });
E.obj('enviar', 'enviar', { t0: w(11, 1), t1: D + 1, x: 120, y: -330, r: 64, pop: true, barrido: [w(11, 3)], vuelo: [[wf(11, -1), 0], [wf(11, -1) + 0.5, 1, 'in']] });
// «tres plataformas y solo ve una»: tres piezas; dos se apagan
[0, 1, 2].forEach(i => { const a = w(11, 6) + i * 0.12;
  E.obj('plat' + i, 'pieza', { t0: a, t1: D + 1, x: 20 + i * 100, y: -500, r: 32, pop: true, on: i === 0 ? 1 : [[0, 1], [w(11, 9), 1], [w(11, 10) + 0.2, 0]], caja: [-32, -32, 64, 64] }); });
E.obj('chF', 'chispas', { t0: w(11, 11), t1: w(11, 11) + 0.8, x: 20, y: -500, r0: 40, r1: 110, inspeccion: false });
