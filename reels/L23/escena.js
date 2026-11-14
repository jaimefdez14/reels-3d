// L23 · El precio en horas de vida (estilo B; reglas 15, 20, 21, 24)
// Gancho: la etiqueta «120 €» se tacha y se convierte en un reloj que se llena hasta «12 h».
// Regla 20: «¿Doce horas por esto?» va en bocadillo del muñeco; la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'barras', aparece: w(1, 7), gap: 70, y: 360 } });

// «La primera: // …» → T en «La», S en la primera palabra del punto
const N = [2, 5, 8].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(10, 0) - 0.1; // resumen
const ROJO = '#e4574f';

E.camara([
  [0, [0, -380, 1.04]], [w(0, 5), [20, -390, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 7), [10, -390, 1.05]], [N[0].T, [10, -390, 1.05]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(3, 5), [30, -390, 1.04]], [w(4, 12), [20, -395, 1.06]], [N[1].T, [20, -395, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 6), [-20, -390, 1.05]], [w(7, 0), [0, -380, 1.01]], [w(7, 9), [20, -385, 1.05]], [N[2].T, [20, -385, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(9, 8), [10, -390, 1.05]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho: la etiqueta de 120 € se tacha y se convierte en un reloj de 12 horas ----------
// 0: Ese(0) capricho(1) de(2) 120(3) euros(4) no(5) cuesta(6) 120(7) euros.(8)
// 1: Cuesta(0) doce(1) horas(2) de(3) trabajo.(4) Haz(5) estas(6) tres(7) cosas(8) antes(9) de(10) darle(11) a(12) comprar.(13)
const GX = 170, GY = -390;
E.figura('yo', { t0: 0, t1: fin(0), x: -330, cara: true,
  poses: [[0, 'senalar'], [w(0, 5), 'encoger'], [w(1, 0), 'manos_cabeza'], [w(1, 5), 'de_pie'], [w(1, 7), 'senalar']],
  sonrisa: [[0, 1.2], [w(0, 5), 0], [w(1, 0), -1.2], [w(1, 5), 0], [w(1, 8), 1]] });
E.obj('precio0', 'etiqueta', { t0: 0, t1: w(1, 0), sale: 0.18, x: GX, y: GY, w: 320, h: 130,
  v: [[0, 120], [w(0, 3) - 0.1, 120], [w(0, 3) + 0.4, 120]], on: [[0, 1], [w(0, 5), 1], [w(0, 6), 0.15, 'inout']],
  s: [[0, 1], [w(0, 3) + 0.2, 1], [w(0, 3) + 0.45, 1.12, 'back'], [w(0, 5), 1], [w(1, 0), 0.6, 'in']], barrido: [w(0, 3) + 0.2], caja: [-160, -65, 320, 130] });
E.obj('tacha0', 'flecha', { t0: w(0, 5), t1: w(1, 0), sale: 0.18, de: [GX - 150, GY + 40], hasta: [GX + 160, GY - 40], curva: 0, col: ROJO, w: 9, punta: false,
  p: [[w(0, 5), 0], [w(0, 6) + 0.1, 1, 'out']], inspeccion: false });
E.temblor(w(0, 6), 12, 0.4);
E.obj('reloj0', 'relojAm', { t0: w(1, 0) - 0.02, t1: w(1, 7), sale: 0.2, x: GX, y: GY - 10, r: 110, texto: '', pop: true,
  p: [[w(1, 0), 0], [w(1, 4), 1, 'inout']], caja: [-110, -110, 220, 220] });
E.obj('pulso0', 'pulso', { t0: w(1, 0), t1: w(1, 0) + 0.6, x: GX, y: GY - 10, r0: 90, r1: 220, inspeccion: false });
E.obj('horas0', 'contador', { t0: w(1, 0), t1: w(1, 7), sale: 0.2, x: GX, y: -205, v: [[w(1, 0) + 0.1, 0], [w(1, 4), 12, 'inout']], suf: ' h', size: 64, col: '#e6ce46', miles: false, pop: true, caja: [-90, -38, 180, 76] });
E.golpe(w(1, 4), 0.05);
// «tres cosas»: tres monedas; la primera se queda y abre el primer punto
[0, 1, 2].forEach(i => { const a = w(1, 7) + i * 0.12;
  E.obj('regla' + i, 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: GX + (i - 1) * 110, y: -400, r: 38, n: i + 1, pop: true, sfx: i === 0, inspeccion: false,
    s: i === 0 ? [[0, 1], [w(1, 11), 1], [w(1, 11) + 0.35, 1.25, 'back']] : 1 }); });
E.obj('antes0', 'rotulo', { t0: w(1, 9), t1: N[0].T - 0.05, sale: 0.2, x: GX, y: -290, texto: 'ANTES DE COMPRAR', size: 26, col: '#e6ce46', pop: true, caja: [-150, -16, 300, 32] });
E.obj('rayosH', 'rayos', { t0: w(1, 7), t1: fin(0), x: GX, y: -400, r: 360, z: -2, p: [[w(1, 7), 0], [w(1, 9), 0.9, 'out']], inspeccion: false });

// ---------- 1 · cuánto ganas de verdad a la hora: el sueldo se apila, se divide entre las horas → 10 €/h ----------
// 2: La(0) primera:(1) calcula(2) cuánto(3) ganas(4) de(5) verdad(6) a(7) la(8) hora.(9)
// 3: Coge(0) tu(1) sueldo(2) neto(3) y(4) divídelo(5) entre(6) tus(7) horas(8) de(9) trabajo,(10) trayectos(11) incluidos.(12)
// 4: Con(0) 2.000(1) euros(2) y(3) unas(4) 200(5) horas(6) al(7) mes,(8) te(9) sale(10) a(11) diez(12) euros(13) la(14) hora.(15)
E.numero(1, N[0].T, N[0].S, { desde: 'regla0', hacia: 'sueldo' });
const PX = -110, RX = 250;
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(2, 2), 'pensar'], [w(3, 0), 'senalar'], [w(3, 5), 'ofrecer'], [w(4, 0), 'de_pie'], [w(4, 9), 'senalar'], [w(4, 12), 'celebrar']],
  sonrisa: [[w(2, 2), 0.3], [w(3, 0), 0.6], [w(4, 12), 1.5]] });
E.obj('sueldo', 'pila', { t0: N[0].S - 0.1, t1: fin(1), x: PX, n: 9, w: 160, hh: 26, r: 60, oy: -110,
  k: [[N[0].S, 0], [N[0].S + 0.5, 1, 'out'], [w(3, 1), 1], [wf(3, 3), 9, 'inout']], barrido: [wf(3, 3)], caja: [-80, -215, 160, 215], refl: true });
E.obj('rotNeto', 'rotulo', { t0: w(3, 2) - 0.1, t1: w(4, 1) - 0.2, sale: 0.15, x: PX - 10, y: -290, texto: 'SUELDO NETO', size: 24, col: '#c9ccca', pop: true, caja: [-90, -15, 180, 30] });
E.obj('sueldoC', 'contador', { t0: w(4, 1) - 0.05, t1: fin(1), x: PX, y: -290, v: [[w(4, 1), 0], [wf(4, 2), 2000, 'out']], suf: ' €', size: 48, col: 'txt', pop: true, caja: [-120, -30, 240, 60] });
// «divídelo entre tus horas»: signo ÷ y un reloj de línea que se rellena; «trayectos incluidos» lo completa
E.obj('div', 'rotulo', { t0: w(3, 5) - 0.1, t1: fin(1), x: 75, y: -150, texto: '÷', size: 80, col: '#e6ce46', pop: true, track: 0, caja: [-30, -40, 60, 80] });
E.obj('horasMes', 'temporizador', { t0: w(3, 5) - 0.1, t1: fin(1), x: RX, y: -260, r: 88, texto: '', sub: '', pop: true,
  p: [[w(3, 6), 0], [wf(3, 10), 0.82, 'inout'], [w(3, 11), 0.82], [wf(3, 12), 1, 'out']], barrido: [wf(3, 12)], caja: [-104, -104, 208, 208] });
E.obj('trayecto', 'rotulo', { t0: w(3, 11) - 0.05, t1: w(4, 5) - 0.2, sale: 0.15, x: RX, y: -110, texto: '+ TRAYECTOS', size: 24, col: '#e6ce46', pop: true, caja: [-95, -15, 190, 30] });
E.obj('horasC', 'contador', { t0: w(4, 5) - 0.05, t1: fin(1), x: RX, y: -110, v: [[w(4, 5), 0], [wf(4, 6), 200, 'out']], suf: ' h', size: 44, col: 'txt', miles: false, pop: true, caja: [-90, -28, 180, 56] });
for (let i = 0; i < 5; i++) { const a = w(3, 5) + i * 0.18;
  E.obj('m1_' + i, 'moneda', { t0: a, t1: a + 0.7, entra: 0.06, sale: 0.15, r: 18, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, PX + 85], [a + 0.65, RX, 'inout']], y: [[a, -190], [a + 0.32, -340], [a + 0.65, -260, 'in']] }); }
// «diez euros la hora»: el resultado sale arriba, en amarillo
E.obj('tarifa', 'contador', { t0: w(4, 9) - 0.1, t1: fin(1), x: 70, y: -480, sobrevive: true, r: 60,
  v: [[w(4, 10), 0], [wf(4, 12), 10, 'out']], suf: ' € / h', size: 70, col: '#e6ce46', miles: false, pop: true, caja: [-150, -42, 300, 84] });
E.obj('ch1', 'chispas', { t0: wf(4, 12), t1: wf(4, 12) + 0.8, x: 70, y: -480, r0: 110, r1: 210, inspeccion: false });
E.golpe(wf(4, 12), 0.05); E.destello(wf(4, 12), 0.12);
E.sfx(w(3, 6), 'fill');

// ---------- 2 · pasa cada compra a horas: zapatillas → 12 h; móvil → 120 h, tres semanas ----------
// 5: La(0) segunda:(1) pasa(2) cada(3) compra(4) a(5) horas.(6)
// 6: Unas(0) zapatillas(1) de(2) ciento(3) veinte(4) euros:(5) doce(6) horas.(7)   [bocadillo «¿Doce horas por esto?»]
// 7: Un(0) móvil(1) de(2) mil(3) doscientos(4) euros:(5) ciento(6) veinte(7) horas.(8) Tres(9) semanas(10) de(11) trabajo.(12)
E.numero(2, N[1].T, N[1].S, { desde: 'tarifa', hacia: 'zapas' });
const ZX = 210;
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -350, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'senalar'], [w(6, 0), 'ofrecer'], [w(6, 6), 'manos_cabeza'], [w(7, 0), 'senalar'], [w(7, 6), 'encoger'], [w(7, 9), 'triste']],
  sonrisa: [[w(5, 2), 0.6], [w(6, 0), 1.2], [w(6, 6), -1.2], [w(7, 0), 0.4], [w(7, 6), -0.6], [w(7, 9), -1.4]] });
E.obj('zapas', 'compra', { t0: N[1].S - 0.1, t1: w(7, 0), sale: 0.2, x: ZX, y: -300, w: 250, h: 300, r: 70,
  pulsa: [[w(6, 5), 0], [w(6, 6), 1], [w(6, 6) + 0.3, 0]], caja: [-125, -150, 250, 300] });
E.obj('eurZ', 'contador', { t0: w(6, 1), t1: w(6, 6), sale: 0.15, x: ZX, y: -110, v: [[w(6, 2), 0], [wf(6, 5), 120, 'out']], suf: ' €', size: 50, col: 'txt', miles: false, pop: true, caja: [-90, -30, 180, 60] });
E.obj('horZ', 'contador', { t0: w(6, 6), t1: w(7, 0), sale: 0.2, x: ZX, y: -110, v: [[w(6, 6), 0], [wf(6, 7), 12, 'out']], suf: ' h', size: 58, col: '#e6ce46', miles: false, pop: true, caja: [-80, -34, 160, 68] });
E.obj('duda', 'bocadillo', { t0: w(6, 6) - 0.05, t1: w(7, 0), sale: 0.15, x: -50, y: -545, w: 340, h: 76, texto: '¿Doce horas por esto?', size: 26, pop: true, caja: [-170, -38, 340, 102] });
E.temblor(w(6, 6), 12, 0.4);
// el móvil: 1.200 € → el contador de horas sube hasta 120 → tres semanas que se encienden
E.obj('movil', 'telefono', { t0: w(7, 0) - 0.05, t1: fin(2), x: ZX, y: -330, w: 170, h: 290, pop: true,
  vibra: [[w(7, 6), 0], [w(7, 6) + 0.1, 1], [wf(7, 8), 1], [wf(7, 8) + 0.2, 0]], caja: [-85, -145, 170, 290] });
E.obj('eurM', 'contador', { t0: w(7, 1), t1: w(7, 6), sale: 0.15, x: ZX, y: -140, v: [[w(7, 2), 0], [wf(7, 5), 1200, 'out']], suf: ' €', size: 50, col: 'txt', pop: true, caja: [-120, -30, 240, 60] });
E.obj('horM', 'contador', { t0: w(7, 6), t1: fin(2), x: ZX, y: -140, sobrevive: true, r: 55, v: [[w(7, 6), 0], [wf(7, 8), 120, 'inout']], suf: ' h', size: 60, col: '#e6ce46', miles: false, pop: true, caja: [-110, -36, 220, 72] });
E.obj('rotSem', 'rotulo', { t0: w(7, 9) - 0.1, t1: fin(2), x: -30, y: -60, texto: 'SEMANAS', size: 24, col: '#c9ccca', pop: true, caja: [-70, -15, 140, 30] });
[0, 1, 2].forEach(i => { const a = w(7, 9) + i * 0.14;
  E.obj('sem' + i, 'pieza', { t0: a - 0.1, t1: fin(2), entra: 0.15, x: 110 + i * 70, y: -60, r: 26, texto: String(i + 1), pop: true, sfx: i === 0, on: [[0, 0], [a, 0], [a + 0.2, 1]], caja: [-26, -26, 52, 52] }); });
E.golpe(w(7, 9), 0.04);
E.obj('ch2', 'chispas', { t0: wf(7, 8), t1: wf(7, 8) + 0.8, x: ZX, y: -140, r0: 80, r1: 180, inspeccion: false });

// ---------- 3 · déjalo dos días en el carrito: 48 horas que se rellenan; luego, ni te acuerdas ----------
// 8: La(0) tercera:(1) déjalo(2) dos(3) días(4) en(5) el(6) carrito.(7)
// 9: Si(0) a(1) los(2) dos(3) días(4) lo(5) sigues(6) queriendo,(7) cómpralo.(8) Muchas(9) veces,(10) para(11) entonces,(12) ya(13) ni(14) te(15) acuerdas.(16)
E.numero(3, N[2].T, N[2].S, { desde: 'horM', hacia: 'carro' });
const CX = -20, TX = 280;
E.figura('yo3', { t0: N[2].S - 0.1, t1: TC, x: -365, cara: true,
  poses: [[0, 'de_pie'], [w(8, 2), 'ofrecer'], [w(8, 5), 'de_pie'], [w(9, 0), 'pensar'], [w(9, 8), 'senalar'], [w(9, 9), 'encoger'], [w(9, 13), 'celebrar']],
  sonrisa: [[w(8, 2), 0.4], [w(9, 0), 0], [w(9, 8), 0.8], [w(9, 13), 1.5]] });
E.obj('carro', 'compra', { t0: N[2].S - 0.1, t1: TC, x: CX, y: -320, w: 240, h: 300, r: 70, boton: [[0, 'CARRITO'], [w(9, 8), 'COMPRAR']],
  espera: [[0, 1], [w(9, 7), 1], [w(9, 8), 0, 'out'], [w(9, 9), 0], [w(9, 9) + 0.3, 1]], luz: [[0, 1], [w(9, 13), 1], [wf(9, -1), 0.35]], caja: [-120, -150, 240, 300] });
E.obj('espera48', 'temporizador', { t0: N[2].S + 0.1, t1: TC, x: TX, y: -330, r: 92, texto: '48', sub: 'HORAS', pop: true,
  p: [[w(8, 3), 0], [wf(9, 4), 1, 'inout']], hecho: [[wf(9, 4), 0], [wf(9, 4) + 0.3, 0.97]], barrido: [wf(9, 4)], caja: [-108, -108, 216, 216] });
E.obj('diasC', 'contador', { t0: w(8, 3) - 0.1, t1: TC, x: TX, y: -170, v: [[w(8, 3), 0], [wf(9, 4), 2, 'inout']], pre: 'día ', size: 44, col: 'txt', miles: false, pop: true, caja: [-90, -28, 180, 56] });
E.obj('ch3', 'chispas', { t0: wf(9, 4), t1: wf(9, 4) + 0.8, x: TX, y: -330, r0: 100, r1: 200, inspeccion: false });
E.obj('olvido', 'rotulo', { t0: w(9, 13) - 0.05, t1: TC, x: CX, y: -120, texto: '120 € AHORRADOS', size: 24, col: '#e6ce46', pop: true, caja: [-150, -15, 300, 30] });
E.destello(w(9, 13), 0.12); E.golpe(w(9, 13), 0.04);
E.sfx(w(8, 3), 'fill');

// ---------- cierre: resumen de las tres y envío ----------
// 10: El(0) dinero(1) se(2) vuelve(3) a(4) ganar.(5) Las(6) horas(7) que(8) pasas(9) ganándolo,(10) no.(11)
// 11: Mándaselo(0) a(1) ese(2) amigo(3) que(4) se(5) compra(6) algo(7) cada(8) vez(9) que(10) cobra.(11)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(10, 6), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, items: ['€ / hora', 'En horas', '48 horas'], gap: 240,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(10, 7)], caja: [-370, -60, 740, 200] });
E.obj('confC', 'confeti', { t0: wf(10, -1) - 0.2, t1: wf(10, -1) + 1.7, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false, sinDim: true });
E.destello(w(10, 11), 0.2); E.golpe(w(10, 11), 0.04);
E.figura('yoF', { t0: w(11, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(11, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(11, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(11, 7)], vuelo: [[wf(11, -1), 0], [wf(11, -1) + 0.5, 1, 'in']] });

