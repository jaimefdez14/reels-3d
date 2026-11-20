// L42 · La mejora continua (estilo B; reglas 15, 20, 21, 24)
// Idea visual: una barra de «hábito» que sube y vuelve atrás mientras pasan los días; la moneda del 1 % hace crecer una pila
// y el contador rueda hasta × 37; al revés, la pila se vacía y el contador cae a 0. Tres reglas: elegir una caja de tres
// (y cinco barras a la vez que no avanzan), mejorar un poco cada día (+1 página, +1 euro, +1 minuto que llenan la barra)
// y apuntarlo (lista que se marca en tres meses mientras la barra de avance se llena).
// Regla 20: «Esta vez sí.» va en bocadillo del muñeco del gancho; la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(3, 0), gap: 70, y: 360 } });

// «La primera: // …» → T en «La», S en la primera palabra del punto
const N = [4, 6, 8].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(10, 0) - 0.1;   // resumen

E.camara([
  [0, [0, -380, 1.04]], [w(0, 10), [15, -385, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 14), [10, -390, 1.06]], [w(2, 6), [0, -380, 1.03]],
  [w(2, 21), [-10, -385, 1.06]], [w(3, 0), [0, -380, 1.02]], [N[0].T, [20, -390, 1.05]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(5, 0), [-15, -385, 1.04]], [w(5, 6), [10, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(7, 0), [-15, -385, 1.03]], [w(7, 9), [10, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(9, 0), [15, -385, 1.03]], [wf(9, -1), [0, -390, 1.06]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Llevas(0) meses(1) intentando(2) cambiar(3) un(4) hábito(5) y(6) no(7) notas(8) que(9) avances(10)   [bocadillo «Esta vez sí.»]
// 1: Se(0) llama(1) mejora(2) continua(3) un(4) 1(5) %(6) más(7) cada(8) día(9) y(10) acabas(11) el(12) año(13) 37(14) veces(15) mejor(16) que(17) al(18) empezar(19)
// 2: Es(0) una(1) cuenta(2) no(3) una(4) promesa(5) y(6) al(7) revés(8) también(9) funciona(10) empeorar(11) un(12) 1(13) %(14) al(15) día(16) te(17) deja(18) casi(19) en(20) cero(21)
// 3: Tres(0) reglas(1) para(2) llevarlo(3) a(4) la(5) práctica(6)
const HX = 150;
E.figura('yo', { t0: 0, t1: fin(0), x: -340, cara: true,
  poses: [[0, 'celebrar'], [w(0, 2), 'levantar'], [w(0, 5), 'de_pie'], [w(0, 7), 'encoger'], [w(0, 10), 'manos_cabeza'], [w(1, 0), 'de_pie'], [w(1, 2), 'senalar'],
    [w(1, 11), 'ofrecer'], [w(1, 15), 'celebrar'], [w(2, 0), 'de_pie'], [w(2, 2), 'senalar'], [w(2, 11), 'triste'], [w(2, 19), 'manos_cabeza'],
    [w(3, 0), 'de_pie'], [w(3, 1), 'senalar'], [w(3, 3), 'celebrar']],
  sonrisa: [[0, 1.4], [w(0, 5), 0.6], [w(0, 7), -0.6], [w(0, 10), -1.2], [w(1, 2), 0.4], [w(1, 15), 1.5], [w(2, 2), 0.4], [w(2, 11), -0.8], [w(2, 19), -1.3], [w(3, 1), 0.4], [w(3, 3), 1.4]] });
E.obj('bocaH', 'bocadillo', { t0: 0.3, t1: w(0, 7), sale: 0.2, x: -110, y: -490, w: 300, h: 80, texto: 'Esta vez sí.', size: 30, pop: true,
  on: [[0.3, 0], [0.8, 1]], caja: [-150, -40, 300, 106] });
// «llevas meses»: los días pasan, la barra del hábito sube y vuelve atrás
E.obj('habito', 'relleno', { t0: 0.1, t1: w(1, 0) + 0.1, sale: 0.25, x: HX, y: -330, w: 360, h: 46, rotulo: 'TU HÁBITO',
  f: [[0.3, 0], [w(0, 2), 0.32, 'out'], [w(0, 4), 0.06, 'inout'], [w(0, 6), 0.3, 'out'], [w(0, 8), 0.05, 'inout'], [w(0, 10), 0.22, 'out'], [wf(0, -1) + 0.2, 0.04, 'inout']],
  caja: [-180, -57, 360, 80] });
E.obj('diasH', 'dias', { t0: 0.1, t1: w(1, 0) + 0.1, sale: 0.25, x: HX, y: -190, gap: 70, luz: [[0.3, 0], [wf(0, -1), 6, 'lin']], caja: [-240, -32, 480, 64] });
E.temblor(w(0, 8), 10, 0.35);
// «un 1 % más cada día»: moneda del 1 %; la pila crece y el contador rueda hasta × 37
E.obj('uno', 'moneda', { t0: w(1, 5) - 0.1, t1: w(3, 0) - 0.05, sale: 0.25, x: HX, y: -460, r: 44, n: [[0, '1 %'], [w(2, 8), '−1 %']], pop: true, sfx: true,
  s: [[0, 1], [w(1, 8), 1], [w(1, 8) + 0.15, 1.15], [w(1, 8) + 0.35, 1], [w(1, 9), 1], [w(1, 9) + 0.15, 1.15], [w(1, 9) + 0.35, 1]],
  luz: [[0, 1], [w(2, 8), 1], [w(2, 8) + 0.3, 0.55]], inspeccion: false, caja: [-44, -44, 88, 88] });
E.obj('pilaH', 'pila', { t0: w(1, 8) - 0.1, t1: w(3, 0) - 0.05, sale: 0.25, x: HX, n: 10, w: 180, hh: 24,
  k: [[w(1, 8), 1], [w(1, 14) + 0.3, 10, 'inout'], [w(2, 11), 10], [w(2, 21), 0.4, 'inout']],
  luz: [[0, 1], [w(2, 11), 1], [w(2, 16), 0.5]], barrido: [w(1, 16)], caja: [-90, -212, 180, 212], refl: true });
E.obj('x37', 'contador', { t0: w(1, 11) - 0.1, t1: w(3, 0) - 0.05, sale: 0.25, x: HX + 250, y: -330, pre: '× ', size: 64, col: 'txt', miles: false, pop: true,
  v: [[w(1, 11), 1], [w(1, 14) + 0.3, 37, 'inout'], [w(2, 11), 37], [w(2, 21), 0, 'inout']], barrido: [w(1, 16)], caja: [-90, -36, 180, 72] });
E.obj('rotH', 'rotulo', { t0: w(1, 2) - 0.1, t1: w(3, 0) - 0.05, sale: 0.25, x: HX, y: [[0, -300], [w(1, 4) - 0.1, -300], [w(1, 5), 60, 'inout']], pop: true, size: [[0, 40], [w(1, 4) - 0.1, 40], [w(1, 5), 28, 'inout']],
  texto: [[0, 'MEJORA CONTINUA'], [w(1, 12), 'UN AÑO'], [w(2, 1), 'UNA CUENTA'], [w(2, 7), 'AL REVÉS'], [w(2, 19), 'CASI CERO']], caja: [-160, -17, 320, 34] });
E.sfx(w(1, 8), 'fill');
E.obj('chH', 'chispas', { t0: w(1, 14) + 0.3, t1: w(1, 14) + 1.1, x: HX + 250, y: -330, r0: 70, r1: 160, inspeccion: false });
E.golpe(w(1, 14) + 0.3, 0.05); E.destello(w(1, 16), 0.15);
E.sfx(w(2, 11), 'whoosh');
for (let i = 0; i < 5; i++) { const a = w(2, 13) + i * 0.3;
  E.obj('cae' + i, 'moneda', { t0: a, t1: a + 0.8, entra: 0.05, sale: 0.2, r: 20, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, HX + 40], [a + 0.8, 600 + i * 30, 'in']], y: [[a, -180 + i * 18], [a + 0.35, -260, 'out'], [a + 0.8, -60, 'in']] }); }
E.temblor(w(2, 21), 12, 0.4); E.golpe(w(2, 21), 0.04);
// «Tres reglas para llevarlo a la práctica»: tres monedas; la primera crece y pasa a la regla uno
E.obj('rayosH', 'rayos', { t0: w(3, 0), t1: fin(0), x: HX, y: -330, r: 300, z: -2, p: [[w(3, 0), 0], [w(3, 3), 1, 'out']], inspeccion: false });
[0, 1, 2].forEach(i => { const a = w(3, 0) + i * 0.12;
  E.obj('r' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: HX + (i - 1) * 125, y: -330, r: 40, n: i + 1, pop: true, sfx: true, inspeccion: false,
    s: i === 0 ? [[0, 1], [w(3, 3), 1], [w(3, 3) + 0.35, 1.4, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [w(3, 4), 1], [w(3, 4) + 0.3, 0.4]], barrido: i === 0 ? [w(3, 5)] : null }); });
E.obj('chR', 'chispas', { t0: w(3, 3) + 0.3, t1: w(3, 3) + 1.1, x: HX - 125, y: -330, r0: 60, r1: 150, inspeccion: false });
E.destello(w(3, 3), 0.12);

// ---------- 1 · elige una sola cosa ----------
// 4: La(0) primera(1) elige(2) una(3) sola(4) cosa(5)
// 5: Leer(0) ahorrar(1) o(2) entrenar(3) Si(4) cambias(5) cinco(6) cosas(7) a(8) la(9) vez(10) no(11) cambias(12) ninguna(13)
E.numero(1, N[0].T, N[0].S, { desde: 'r1', hacia: 'elige' });
const P1 = 170;
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -350, cara: true,
  poses: [[0, 'de_pie'], [w(4, 2), 'pensar'], [w(4, 3), 'senalar'], [w(5, 0), 'ofrecer'], [w(5, 3) + 0.2, 'senalar'], [w(5, 5), 'encoger'], [w(5, 8), 'manos_cabeza'],
    [w(5, 13), 'triste'], [wf(5, -1) + 0.15, 'celebrar']],
  sonrisa: [[w(4, 2), 0.2], [w(4, 4), 1], [w(5, 5), -0.4], [w(5, 8), -1], [w(5, 13), -1.3], [wf(5, -1) + 0.15, 1.4]] });
// tres cajas: la elegida se enciende; leer, ahorrar, entrenar se iluminan de una en una y se vuelve a la primera
E.obj('elige', 'planes', { t0: N[0].S - 0.1, t1: w(5, 4), sale: 0.25, x: P1, y: -40, s: 0.8, items: ['LEER', 'AHORRAR', 'ENTRENAR'],
  sel: [[w(4, 2), -1], [w(4, 3), 2, 'inout'], [w(4, 5), 0, 'inout'], [w(5, 0), 0], [w(5, 1), 1, 'inout'], [w(5, 3), 2, 'inout'], [w(5, 3) + 0.4, 0, 'inout']],
  caja: [-290, -220, 630, 260] });
E.obj('chE', 'chispas', { t0: w(4, 5), t1: w(4, 5) + 0.8, x: P1 - 184, y: -90, r0: 60, r1: 140, inspeccion: false });
E.golpe(w(4, 5), 0.03); E.sfx(w(5, 1), 'tick'); E.sfx(w(5, 3), 'tick');
// cinco cosas a la vez: cinco barras que apenas suben y caen a cero; luego una sola se llena
const B5 = [0, 1, 2, 3, 4];
B5.forEach(i => { const a = w(5, 4) + i * 0.1;
  E.obj('b5_' + i, 'relleno', { t0: a, t1: i === 0 ? fin(1) : N[1].T + 0.2, sale: 0.25, x: P1, y: -400 + i * 64, w: 340, h: 38, pop: true, sobrevive: i === 0,
    f: i === 0 ? [[w(5, 6), 0], [w(5, 10), 0.16, 'out'], [w(5, 11), 0.16], [w(5, 13), 0, 'inout'], [wf(5, -1) + 0.05, 0], [wf(5, -1) + 0.5, 1, 'out']]
      : [[w(5, 6), 0], [w(5, 10), 0.1 + 0.03 * i, 'out'], [w(5, 11), 0.1 + 0.03 * i], [w(5, 13), 0, 'inout']],
    luz: i === 0 ? 1 : [[0, 1], [wf(5, -1), 1], [wf(5, -1) + 0.3, 0.4]], barrido: i === 0 ? [wf(5, -1) + 0.5] : null, caja: [-170, -19, 340, 38] }); });
E.sfx(w(5, 6), 'fill');
E.obj('cinco', 'contador', { t0: w(5, 4) - 0.05, t1: fin(1) - 0.2, sale: 0.2, x: P1, y: -480, size: 50, col: 'txt', suf: ' COSAS', miles: false, pop: true,
  v: [[w(5, 4), 0], [w(5, 6) + 0.25, 5, 'out']], barrido: [w(5, 6) + 0.25], caja: [-140, -30, 280, 60] });
E.obj('rot5', 'rotulo', { t0: w(5, 8) - 0.1, t1: fin(1) - 0.2, sale: 0.2, x: P1, y: -80, pop: true, size: 28,
  texto: [[0, 'A LA VEZ'], [w(5, 13), 'NINGUNA'], [wf(5, -1) + 0.15, 'UNA SOLA']], col: '#c9ccca', caja: [-120, -17, 240, 34] });
E.temblor(w(5, 13), 12, 0.4);
E.obj('ch1', 'chispas', { t0: wf(5, -1) + 0.5, t1: wf(5, -1) + 1.3, x: P1, y: -400, r0: 90, r1: 200, inspeccion: false });
E.golpe(wf(5, -1) + 0.5, 0.04); E.destello(wf(5, -1) + 0.5, 0.12);

// ---------- 2 · mejórala un poco cada día ----------
// 6: La(0) segunda(1) mejórala(2) un(3) poco(4) cada(5) día(6)
// 7: Una(0) página(1) más(2) un(3) euro(4) más(5) un(6) minuto(7) más(8) Tan(9) poco(10) que(11) no(12) te(13) cueste(14) empezar(15)
E.numero(2, N[1].T, N[1].S, { desde: 'b5_0', hacia: 'mejora' });
const BX = 130;
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(6, 2), 'levantar'], [w(6, 5), 'senalar'], [w(7, 0), 'ofrecer'], [w(7, 3), 'senalar'], [w(7, 6), 'ofrecer'], [w(7, 9), 'encoger'], [wf(7, -1), 'celebrar']],
  sonrisa: [[w(6, 2), 0.8], [w(7, 0), 0.6], [w(7, 9), 0.3], [wf(7, -1), 1.5]] });
// la barra sube a pasitos, un pasito por día
E.obj('mejora', 'relleno', { t0: N[1].S - 0.1, t1: fin(2), x: BX, y: -460, w: 380, h: 44, pop: true, sobrevive: true,
  f: [[w(6, 2), 0], [w(6, 3), 0.06, 'out'], [w(6, 4), 0.12, 'out'], [w(6, 5), 0.18, 'out'], [w(6, 6), 0.24, 'out'],
    [w(7, 2), 0.24], [w(7, 2) + 0.4, 0.4, 'out'], [w(7, 5) + 0.4, 0.56, 'out'], [w(7, 8) + 0.4, 0.72, 'out'], [w(7, 14), 0.72], [wf(7, -1), 1, 'out']],
  barrido: [wf(7, -1)], caja: [-190, -22, 380, 44] });
E.obj('dias2', 'dias', { t0: N[1].S, t1: fin(2) - 0.2, sale: 0.2, x: BX, y: -370, gap: 70, pop: true,
  luz: [[w(6, 2), 0], [wf(6, -1), 6, 'lin'], [w(7, 0), 0], [wf(7, -1), 6, 'lin']], caja: [-240, -32, 480, 64] });
// una página más, un euro más, un minuto más: cada cosa entra, su contador suma uno y una moneda sube a la barra
const IT = [
  { id: 'pag', x: -110, k: 1, rot: 'PÁGINA' },
  { id: 'eur', x: 130, k: 4, rot: 'EURO' },
  { id: 'min', x: 360, k: 7, rot: 'MINUTO' },
];
const T2 = fin(2) - 0.15;
E.obj('pag', 'papeles', { t0: w(7, 0) - 0.1, t1: T2, sale: 0.2, x: -110, n: 6, pop: true, k: [[w(7, 0), 4], [w(7, 1) + 0.3, 5, 'out']], caja: [-95, -100, 190, 100] });
E.obj('eur', 'pila', { t0: w(7, 3) - 0.1, t1: T2, sale: 0.2, x: 130, n: 5, w: 130, hh: 22, pop: true, k: [[w(7, 3), 3], [w(7, 4) + 0.3, 4, 'out']], caja: [-65, -94, 130, 94], refl: true });
E.obj('min', 'temporizador', { t0: w(7, 6) - 0.1, t1: T2, sale: 0.2, x: 360, y: -90, r: 62, texto: '+1', sub: 'MIN', pop: true,
  p: [[w(7, 7), 0], [w(7, 8) + 0.3, 1, 'out']], hecho: 0, caja: [-78, -78, 156, 156] });
IT.forEach(o => { const a = w(7, o.k);
  E.obj(o.id + 'R', 'rotulo', { t0: a - 0.1, t1: T2, sale: 0.2, x: o.x, y: 50, texto: o.rot, size: 26, col: '#9a9c9b', pop: true, caja: [-90, -16, 180, 32] });
  E.obj(o.id + 'C', 'contador', { t0: a, t1: T2, sale: 0.2, x: o.x, y: o.id === 'min' ? -215 : -180, pre: '+', size: 44, col: 'txt', miles: false, pop: true,
    v: [[a, 0], [a + 0.4, 1, 'out']], caja: [-60, -26, 120, 52] });
  E.obj(o.id + 'M', 'moneda', { t0: a + 0.45, t1: a + 1.0, entra: 0.06, sale: 0.12, r: 18, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a + 0.45, o.x], [a + 0.95, BX + 120, 'inout']], y: [[a + 0.45, -240], [a + 0.95, -460, 'in']] });
  E.golpe(a + 0.95, 0.015); });
E.sfx(w(7, 2), 'fill');
E.obj('ch2', 'chispas', { t0: wf(7, -1), t1: wf(7, -1) + 0.8, x: BX + 190, y: -460, r0: 50, r1: 150, inspeccion: false });
E.golpe(wf(7, -1), 0.04); E.destello(wf(7, -1), 0.12);

// ---------- 3 · apúntalo ----------
// 8: La(0) tercera(1) apúntalo(2)
// 9: Un(0) día(1) no(2) se(3) nota(4) En(5) tres(6) meses(7) la(8) lista(9) te(10) enseña(11) lo(12) que(13) has(14) avanzado(15)
E.numero(3, N[2].T, N[2].S, { desde: 'mejora', hacia: 'lista3' });
const LX = 170;
E.figura('yo3', { t0: N[2].S - 0.1, t1: TC, x: -360, cara: true,
  poses: [[0, 'de_pie'], [w(8, 2), 'ofrecer'], [w(9, 0), 'de_pie'], [w(9, 2), 'encoger'], [w(9, 5), 'ofrecer'], [w(9, 9), 'senalar'], [wf(9, -1), 'celebrar']],
  sonrisa: [[w(8, 2), 0.6], [w(9, 2), -0.2], [w(9, 5), 0.5], [w(9, 9), 0.9], [wf(9, -1), 1.5]] });
E.obj('lista3', 'lista', { t0: N[2].S - 0.1, t1: TC, x: LX, y: -330, n: 5, w: 300, gap: 58, pop: true,
  p: [[w(8, 2), 0], [w(8, 2) + 0.5, 1, 'out'], [w(9, 5), 1], [w(9, 9), 5, 'inout']], brillo: [[w(8, 2), 0], [w(8, 2) + 0.5, 1, 'out'], [w(9, 5), 1], [w(9, 9), 5, 'inout']],
  caja: [-150, -150, 300, 300] });
E.sfx(w(8, 2) + 0.2, 'tick');
E.obj('avance', 'relleno', { t0: w(9, 0) - 0.1, t1: TC, x: LX, y: -110, w: 340, h: 40, pop: true, rotulo: 'AVANCE',
  f: [[w(9, 0), 0], [w(9, 1), 0.03, 'out'], [w(9, 9), 0.03], [wf(9, -1), 1, 'inout']], barrido: [wf(9, -1)], caja: [-170, -54, 340, 74] });
E.obj('meses', 'contador', { t0: w(9, 5) - 0.05, t1: TC, x: LX, y: -40, size: 40, col: 'txt', suf: ' MESES', miles: false, pop: true,
  v: [[w(9, 5), 0], [w(9, 7) + 0.2, 3, 'out']], caja: [-120, -24, 240, 48] });
E.obj('nota3', 'rotulo', { t0: w(9, 2), t1: w(9, 5) - 0.12, sale: 0.2, x: LX, y: -40, texto: 'UN DÍA', size: 28, col: '#9a9c9b', pop: true, caja: [-80, -17, 160, 34] });
E.sfx(w(9, 9), 'fill');
E.obj('rayos3', 'rayos', { t0: w(9, 11), t1: TC, x: LX, y: -330, r: 300, z: -2, p: [[w(9, 11), 0], [wf(9, -1), 1, 'out']], inspeccion: false });
E.obj('ch3', 'chispas', { t0: wf(9, -1), t1: wf(9, -1) + 0.8, x: LX, y: -110, r0: 90, r1: 200, inspeccion: false });
E.golpe(wf(9, -1), 0.04); E.destello(wf(9, -1), 0.12);

// ---------- cierre: resumen y envío ----------
// 10: Que(0) no(1) lo(2) notes(3) no(4) quiere(5) decir(6) que(7) no(8) avances(9)
// 11: Mándaselo(0) a(1) ese(2) amigo(3) que(4) lo(5) deja(6) todo(7) a(8) la(9) segunda(10) semana(11)
E.sfx(TC, 'cut');
E.obj('rayosC', 'rayos', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(10, 6), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, items: ['Una cosa', 'Un poco', 'Apúntalo'], gap: 240,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(10, 4)], caja: [-360, -60, 720, 200] });
E.obj('confC', 'confeti', { t0: wf(10, -1), t1: wf(10, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(10, -1), 0.22); E.golpe(wf(10, -1), 0.04);
E.figura('yoF', { t0: w(11, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(11, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(11, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(11, 9)], vuelo: [[wf(11, -1), 0], [wf(11, -1) + 0.5, 1, 'in']] });
