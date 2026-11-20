// L41 · El principio de Peter (estilo B; reglas 15, 20, 21, 24)
// Idea visual: una escalera de tres peldaños. El muñeco sube un peldaño cada vez que lo ascienden; la barra de «lo que
// sabes hacer» está llena en los dos primeros y se vacía en el último («un puesto para el que ya no vales»).
// Contador que suma: el año 1969 rueda. Algo que se rellena por punto: casillas de tareas, barras de «lo que se te da bien»
// frente al trabajo nuevo, barra de formación hasta la marca «EMPIEZAS».
// Regla 20: «Enhorabuena, jefe.» va en bocadillo del jefe (gris) mientras la voz dice «te ascendieron»; la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(2, 13), gap: 70, y: 360 } });

// «La primera: // …» → T en «La», S en la primera palabra del punto
const N = [3, 5, 7].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(9, 0) - 0.1;   // resumen
const ROJO = '#e4574f';
const GRIS = '#9a9c9b';

E.camara([
  [0, [0, -380, 1.04]], [w(0, 6), [10, -385, 1.06]], [w(0, 12), [-20, -390, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 8), [0, -385, 1.04]],
  [w(1, 17), [20, -390, 1.07]], [w(2, 0), [0, -380, 1.02]], [w(2, 6), [10, -385, 1.04]], [N[0].T, [10, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [15, -385, 1.04]], [w(4, 5), [-10, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 0), [-15, -385, 1.04]], [w(6, 7), [15, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(8, 0), [-10, -385, 1.04]], [w(8, 5), [10, -385, 1.05]], [TC - 0.1, [0, -385, 1.04]], [TC, [0, -390, 1.05]],
]);

// escalón de la escalera (bloque gris macizo apoyado en el suelo)
const escalon = (id, o) => { const h = o.h; return E.obj(id, 'bloques', Object.assign({ n: 1, w: 170, y: -h / 2, pop: true, refl: true, caja: [-85, -h / 2, 170, h] }, o)); };

// ---------- gancho ----------
// 0: Eras(0) el(1) mejor(2) de(3) tu(4) equipo(5) te(6) ascendieron(7) y(8) ahora(9) lo(10) pasas(11) mal(12)   [bocadillo del jefe «Enhorabuena, jefe.»]
// el equipo: tres barras de rendimiento; la tuya se llena entera
const EQ = [{ id: 'cA', x: -420, f: 0.45 }, { id: 'yo', x: -280, f: 1 }, { id: 'cB', x: -140, f: 0.55 }];
E.figura('cA', { t0: 0, t1: w(0, 6) + 0.25, sale: 0.25, x: -420, talla: 270, color: 'gris', poses: [[0, 'de_pie'], [w(0, 2) + 0.2, 'encoger']] });
E.figura('cB', { t0: 0, t1: w(0, 6) + 0.25, sale: 0.25, x: -140, talla: 270, color: 'gris', poses: [[0, 'de_pie'], [w(0, 2) + 0.3, 'apartarse']] });
EQ.forEach((q, i) => { const yo = q.id === 'yo';
  E.obj('rend' + i, 'relleno', { t0: 0, t1: w(0, 6) + 0.2, sale: 0.2, x: q.x, y: yo ? -400 : -330, w: 120, h: 26,
    f: yo ? [[0.3, 0], [w(0, 2) + 0.5, 1, 'out']] : [[0.3, 0], [0.9, q.f, 'out']], caja: [-60, -13, 120, 26] }); });
E.sfx(0.3, 'fill');
E.obj('chRend', 'chispas', { t0: w(0, 2) + 0.5, t1: w(0, 2) + 1.3, x: -280, y: -400, r0: 50, r1: 120, inspeccion: false });
E.golpe(w(0, 2) + 0.5, 0.03);
// «te ascendieron»: aparece la escalera y el muñeco sube al primer peldaño; el jefe le da la enhorabuena
const ST = [{ x: -150, h: 60 }, { x: 30, h: 120 }, { x: 210, h: 180 }];
ST.forEach((s, i) => escalon('e0_' + i, { t0: w(0, 5) + i * 0.1, t1: w(1, 0), sale: 0.25, x: s.x, h: s.h, luz: i === 0 ? 1 : 0.6 }));
E.figura('yo', { t0: 0, t1: w(1, 0), sale: 0.25, x: [[0, -280], [w(0, 7), -280], [w(0, 7) + 0.45, -150, 'inout']], y: [[w(0, 7), 0], [w(0, 7) + 0.22, -130, 'out'], [w(0, 7) + 0.45, -60, 'in']],
  talla: 330, cara: true, toca: ['e0_0'],
  poses: [[0, 'de_pie'], [w(0, 2), 'celebrar'], [w(0, 7), 'levantar'], [w(0, 7) + 0.5, 'celebrar'], [w(0, 9), 'manos_cabeza'], [w(0, 12) + 0.3, 'triste']],
  sonrisa: [[0, 0.6], [w(0, 2), 1.5], [w(0, 8), 1.2], [w(0, 9), -0.8], [w(0, 12), -1.4]] });
E.figura('jefe0', { t0: w(0, 5), t1: w(1, 0), sale: 0.25, x: 370, talla: 340, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(0, 6), 'ofrecer'], [w(0, 9), 'de_pie']], sonrisa: 1 });
E.obj('bocaH', 'bocadillo', { t0: w(0, 6), t1: w(0, 12), sale: 0.2, x: 270, y: -440, w: 340, h: 76, texto: 'Enhorabuena, jefe.', size: 30, pop: true,
  on: [[w(0, 6), 0], [w(0, 7) + 0.3, 1]], caja: [-170, -38, 340, 102] });
E.obj('pulsoE', 'pulso', { t0: w(0, 7) + 0.45, t1: w(0, 7) + 1.1, x: -150, y: -60, r0: 40, r1: 130, inspeccion: false });
E.sfx(w(0, 7) + 0.45, 'thud');
// «y ahora lo pasas mal»: se le amontonan los papeles y se le enreda la cabeza
E.obj('papeles0', 'papeles', { t0: w(0, 8), t1: w(1, 0), sale: 0.25, x: 30, y: -120, n: 7, k: [[w(0, 8), 0], [w(0, 12), 7, 'lin']], caja: [-80, -125, 160, 120] });
E.obj('maraña0', 'maraña', { t0: w(0, 10), t1: w(1, 0), sale: 0.25, x: -150, y: -470, r: 46, p: [[w(0, 10), 0], [w(0, 12) + 0.3, 1, 'out']], rot: [[w(0, 10), 0], [w(1, 0), 0.8, 'lin']], caja: [-62, -36, 124, 72] });
E.temblor(w(0, 12), 14, 0.45); E.golpe(w(0, 12), 0.05);

// 1: Se(0) llama(1) principio(2) de(3) Peter(4) en(5) una(6) empresa(7) te(8) van(9) ascendiendo(10) hasta(11) un(12) puesto(13) para(14) el(15) que(16) ya(17) no(18) vales(19)
// la escalera se monta por piezas; el muñeco sube peldaño a peldaño con la barra llena y en el último se vacía
E.obj('rotPeter', 'rotulo', { t0: w(1, 2) - 0.1, t1: w(1, 8) + 0.2, sale: 0.25, x: 180, y: -470, texto: 'PRINCIPIO DE PETER', size: 34, col: '#e6ce46', peso: 700, pop: true, caja: [-230, -20, 460, 40] });
E.obj('chPeter', 'chispas', { t0: w(1, 4), t1: w(1, 4) + 0.8, x: 180, y: -470, r0: 120, r1: 240, inspeccion: false });
E.golpe(w(1, 4), 0.04);
ST.forEach((s, i) => escalon('e1_' + i, { t0: w(1, 0) + 0.1 + i * 0.15, t1: w(2, 0), sale: 0.25, x: s.x, h: s.h,
  luz: [[0, 0.6], [w(1, 8) + 0.35 + i * 0.6, 0.6], [w(1, 8) + 0.5 + i * 0.6, 1], i === 2 ? [w(1, 18), 1] : [w(1, 19), 1], i === 2 ? [w(1, 19) + 0.3, 0.45] : [w(1, 19) + 0.3, 1]] }));
const H1 = [w(1, 8), w(1, 10) - 0.05, w(1, 12) - 0.05];   // tres saltos: te van… ascendiendo… hasta un puesto
const X1 = [-330, -150, 30, 210], Y1 = [0, -60, -120, -180];
const xk = [[0, X1[0]]], yk = [[0, 0]];
H1.forEach((a, i) => { xk.push([a, X1[i]], [a + 0.42, X1[i + 1], 'inout']); yk.push([a, Y1[i]], [a + 0.2, Y1[i + 1] - 40, 'out'], [a + 0.42, Y1[i + 1], 'in']);
  E.obj('pulso1_' + i, 'pulso', { t0: a + 0.42, t1: a + 1.0, x: X1[i + 1], y: Y1[i + 1], r0: 30, r1: 110, inspeccion: false }); E.sfx(a + 0.42, 'pop'); });
E.figura('yo1', { t0: w(1, 0) + 0.05, t1: w(2, 0), sale: 0.25, x: xk, y: yk, talla: 320, cara: true, toca: ['e1_0', 'e1_1', 'e1_2'],
  poses: [[0, 'de_pie'], [w(1, 2), 'senalar'], [H1[0], 'levantar'], [H1[0] + 0.45, 'celebrar'], [H1[1], 'levantar'], [H1[1] + 0.45, 'celebrar'], [H1[2], 'levantar'], [H1[2] + 0.45, 'celebrar'],
    [w(1, 17), 'encoger'], [w(1, 19), 'manos_cabeza'], [wf(1, -1) + 0.3, 'triste']],
  sonrisa: [[0, 0.4], [H1[0], 1.2], [H1[2] + 0.5, 1.4], [w(1, 17), -0.3], [w(1, 19), -1.5]] });
E.obj('sabes', 'relleno', { t0: w(1, 5) - 0.1, t1: w(2, 0), sale: 0.25, x: -300, y: -470, w: 220, h: 40, pop: true, rotulo: 'LO QUE SABES HACER',
  f: [[w(1, 5), 0], [w(1, 7), 1, 'out'], [w(1, 18), 1], [w(1, 19) + 0.3, 0.15, 'inout']], caja: [-110, -54, 220, 74] });
E.sfx(w(1, 5), 'fill');
E.temblor(w(1, 19), 14, 0.45); E.golpe(w(1, 19), 0.05);

// 2: Lo(0) describió(1) Laurence(2) Peter(3) en(4) 1969(5) Antes(6) de(7) aceptar(8) el(9) próximo(10) ascenso(11) hazte(12) tres(13) preguntas(14)
E.figura('yo2', { t0: w(2, 0) - 0.05, t1: fin(0), x: [[0, -360], [w(2, 8), -360], [w(2, 11), -240, 'inout']], cara: true,
  poses: [[0, 'de_pie'], [w(2, 2), 'senalar'], [w(2, 6), 'de_pie'], [w(2, 8), 'andar'], [w(2, 11), 'de_pie'], [w(2, 12), 'pensar'], [w(2, 14), 'senalar']],
  sonrisa: [[0, 0], [w(2, 2), 0.6], [w(2, 12), 0.2], [w(2, 14), 0.8]] });
E.obj('rotLP', 'rotulo', { t0: w(2, 2) - 0.1, t1: w(2, 6), sale: 0.2, x: 170, y: -460, texto: 'LAURENCE PETER', size: 32, col: GRIS, pop: true, caja: [-170, -18, 340, 36] });
E.obj('anio', 'contador', { t0: w(2, 1), t1: w(2, 6), sale: 0.2, x: 170, y: -340, size: 120, miles: false, pop: true,
  v: [[w(2, 3), 0], [w(2, 5) + 0.45, 1969, 'out']], barrido: [w(2, 5) + 0.5], caja: [-170, -60, 340, 120] });
E.obj('libro', 'papeles', { t0: w(2, 1), t1: w(2, 6), sale: 0.2, x: 170, y: -14, n: 6, k: [[w(2, 1), 0], [w(2, 5), 6, 'lin']], caja: [-95, -110, 190, 125] });
E.obj('chAnio', 'chispas', { t0: w(2, 5) + 0.45, t1: w(2, 5) + 1.25, x: 170, y: -340, r0: 150, r1: 250, inspeccion: false });
E.golpe(w(2, 5) + 0.45, 0.04);
// «Antes de aceptar el próximo ascenso»: la puerta del ascenso se entreabre; «tres preguntas»: tres monedas con «?»
E.obj('puerta', 'puerta', { t0: w(2, 6) - 0.05, t1: fin(0), x: 170, w: 200, h: 360, pop: true, refl: true, p: [[w(2, 9), 0], [w(2, 11) + 0.3, 0.45, 'out']],
  luz: [[0, 1], [w(2, 12), 1], [w(2, 13), 0.55]], caja: [-100, -360, 200, 360] });
E.obj('rotAsc', 'rotulo', { t0: w(2, 10), t1: N[0].T, sale: 0.2, x: 170, y: -395, texto: 'ASCENSO', size: 28, col: '#e6ce46', pop: true, caja: [-80, -16, 160, 32] });
[0, 1, 2].forEach(i => { const a = w(2, 13) + i * 0.13;
  E.obj('q' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: 70 + i * 100, y: -480, r: 32, n: '?', pop: true, sfx: i === 0,
    s: i === 0 ? [[0, 1], [wf(2, -1), 1], [wf(2, -1) + 0.3, 1.3, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [wf(2, -1), 1], [wf(2, -1) + 0.3, 0.4]], caja: [-32, -32, 64, 64] }); });
E.destello(wf(2, -1), 0.12);

// ---------- 1 · ¿qué vas a hacer cada día? ----------
// 3: La(0) primera(1) qué(2) vas(3) a(4) hacer(5) cada(6) día(7)
// 4: No(0) el(1) cargo(2) las(3) tareas(4) Pide(5) que(6) te(7) cuenten(8) un(9) día(10) normal(11)
E.numero(1, N[0].T, N[0].S, { desde: 'q1', hacia: 'tareas' });
E.figura('yoP1', { t0: N[0].S - 0.1, t1: fin(1), x: -380, cara: true,
  poses: [[0, 'de_pie'], [w(3, 2), 'pensar'], [w(3, 6), 'senalar'], [w(4, 0), 'encoger'], [w(4, 3), 'senalar'], [w(4, 5), 'ofrecer'], [w(4, 9), 'pensar'], [wf(4, -1), 'celebrar']],
  sonrisa: [[0, 0.2], [w(3, 2), 0], [w(3, 6), 0.6], [w(4, 0), -0.2], [w(4, 3), 0.8], [w(4, 9), 0.5], [wf(4, -1), 1.5]] });
E.obj('semana', 'dias', { t0: N[0].S - 0.05, t1: fin(1), x: 130, y: -470, letras: ['L', 'M', 'X', 'J', 'V'], gap: 84, pop: true,
  luz: [[w(3, 6) - 0.1, -1], [wf(3, -1) + 0.5, 4, 'lin'], [w(4, 9), 4], [w(4, 10) + 0.2, 2, 'inout']], caja: [-200, -32, 400, 64] });
E.obj('tareas', 'lista', { t0: N[0].S - 0.1, t1: fin(1), x: 140, y: -250, n: 3, w: 300, gap: 70, pop: true, sobrevive: true, r: 70,
  p: [[w(4, 3), 0], [w(4, 4) + 0.7, 3, 'lin']], brillo: [[w(4, 5), 0], [wf(4, -1), 3, 'lin']], caja: [-150, -88, 300, 176] });
E.sfx(w(4, 3), 'fill');
E.obj('cargo', 'rotulo', { t0: w(4, 1) - 0.1, t1: w(4, 3) + 0.1, sale: 0.1, x: 140, y: -385, texto: 'EL CARGO', size: 28, col: GRIS, pop: true, caja: [-80, -16, 160, 32] });
E.obj('tareasR', 'rotulo', { t0: w(4, 3) + 0.12, t1: fin(1), x: 140, y: -385, texto: 'LAS TAREAS', size: 28, col: '#e6ce46', pop: true, caja: [-90, -16, 180, 32] });
E.temblor(w(4, 2), 8, 0.3);
// «Pide que te cuenten un día normal»: alguien del puesto te lo cuenta (bocadillo sin texto) y se enciende un día
E.figura('cuenta', { t0: w(4, 5) - 0.2, t1: fin(1), x: 420, talla: 300, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(4, 6), 'ofrecer'], [w(4, 10), 'senalar']], sonrisa: 0.8 });
E.obj('bocaP1', 'bocadillo', { t0: w(4, 6), t1: fin(1) - 0.1, sale: 0.2, x: 400, y: -385, w: 130, h: 64, on: 1, pop: true, caja: [-65, -32, 130, 90] });
E.obj('ch1', 'chispas', { t0: wf(4, -1), t1: wf(4, -1) + 0.8, x: 140, y: -250, r0: 120, r1: 220, inspeccion: false });
E.golpe(wf(4, -1), 0.04); E.destello(wf(4, -1), 0.1);

// ---------- 2 · ¿ese trabajo se parece a lo que se te da bien? ----------
// 5: La(0) segunda(1) ese(2) trabajo(3) se(4) parece(5) a(6) lo(7) que(8) se(9) te(10) da(11) bien(12)
// 6: El(0) mejor(1) vendedor(2) no(3) tiene(4) por(5) qué(6) ser(7) el(8) mejor(9) jefe(10) de(11) ventas(12)
E.numero(2, N[1].T, N[1].S, { desde: 'tareas', hacia: 'barA' });
E.figura('yoP2', { t0: N[1].S - 0.1, t1: fin(2), x: -380, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'pensar'], [w(5, 7), 'senalar'], [w(6, 0), 'celebrar'], [w(6, 3), 'de_pie'], [w(6, 7), 'encoger'], [w(6, 10), 'manos_cabeza']],
  sonrisa: [[0, 0.2], [w(5, 7), 0.8], [w(6, 0), 1.5], [w(6, 3), 0.4], [w(6, 7), -0.4], [w(6, 10), -1.3]] });
E.obj('barA', 'relleno', { t0: N[1].S - 0.1, t1: fin(2), x: 130, y: -460, w: 340, h: 44, pop: true, sobrevive: false, r: 50,
  rotulo: [[0, 'LO QUE SE TE DA BIEN'], [w(6, 0), 'VENDER']], f: [[w(5, 10), 0], [wf(5, -1) + 0.3, 0.95, 'out']], barrido: [w(6, 2)], caja: [-170, -56, 340, 78] });
E.obj('barB', 'relleno', { t0: N[1].S + 0.15, t1: fin(2), x: 130, y: -340, w: 340, h: 44, pop: true,
  rotulo: [[0, 'EL TRABAJO NUEVO'], [w(6, 9), 'DIRIGIR VENDEDORES']], f: [[w(5, 4), 0], [w(5, 6) + 0.2, 0.9, 'out'], [w(6, 9), 0.9], [w(6, 12) + 0.2, 0.2, 'inout']], caja: [-170, -56, 340, 78] });
E.sfx(w(5, 4), 'fill'); E.sfx(w(5, 10), 'fill');
E.obj('parece', 'rotulo', { t0: w(5, 5), t1: w(6, 0), sale: 0.2, x: 130, y: -250, texto: '¿SE PARECEN?', size: 24, col: '#e6ce46', pop: true, caja: [-90, -14, 180, 28] });
E.obj('chA', 'chispas', { t0: wf(5, -1) + 0.3, t1: wf(5, -1) + 1.1, x: 130, y: -460, r0: 100, r1: 200, inspeccion: false });
// «El mejor vendedor»: el montón de ventas crece; «no tiene por qué ser el mejor jefe de ventas»: llega su equipo y la barra de dirigir baja
E.obj('ventas', 'pila', { t0: w(6, 0) - 0.1, t1: fin(2), x: 120, n: 6, w: 150, hh: 24, sobrevive: true, r: 60, oy: -70,
  k: [[w(6, 0), 0], [w(6, 2) + 0.4, 6, 'out']], barrido: [w(6, 2) + 0.4], caja: [-75, -140, 150, 140], refl: true });
for (let i = 0; i < 4; i++) { const a = w(6, 0) + i * 0.15;
  E.obj('mv' + i, 'moneda', { t0: a, t1: a + 0.6, entra: 0.06, sale: 0.12, r: 20, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, -300], [a + 0.5, 120, 'inout']], y: [[a, -300], [a + 0.25, -250], [a + 0.5, -110, 'in']] }); }
[{ id: 'eq1', x: 330 }, { id: 'eq2', x: 450 }].forEach((q, i) => E.figura(q.id, { t0: w(6, 7) + i * 0.12, t1: fin(2), x: q.x, talla: 240, color: 'gris', dir: -1,
  poses: [[0, 'de_pie'], [w(6, 10) + i * 0.1, i ? 'encoger' : 'manos_cabeza']] }));
E.obj('maraña2', 'maraña', { t0: w(6, 10), t1: fin(2), x: 390, y: -330, r: 40, p: [[w(6, 10), 0], [wf(6, -1) + 0.2, 1, 'out']], rot: [[w(6, 10), 0], [fin(2), 0.6, 'lin']], caja: [-55, -32, 110, 64] });
E.temblor(w(6, 12), 12, 0.4);

// ---------- 3 · ¿quién te va a enseñar? ----------
// 7: La(0) tercera(1) quién(2) te(3) va(4) a(5) enseñar(6)
// 8: Pide(0) formación(1) antes(2) de(3) empezar(4) no(5) cuando(6) ya(7) estés(8) en(9) apuros(10)
E.numero(3, N[2].T, N[2].S, { desde: 'ventas', hacia: 'form' });
E.figura('yoP3', { t0: N[2].S - 0.1, t1: TC, x: -380, cara: true,
  poses: [[0, 'de_pie'], [w(7, 2), 'pensar'], [w(7, 6), 'senalar'], [w(8, 0), 'ofrecer'], [w(8, 2), 'escribir'], [w(8, 5), 'de_pie'], [w(8, 8), 'apartarse'], [wf(8, -1) + 0.2, 'celebrar']],
  sonrisa: [[0, 0], [w(7, 6), 0.6], [w(8, 2), 1], [w(8, 8), -0.6], [wf(8, -1) + 0.2, 1.5]] });
E.figura('mentor', { t0: w(7, 2) - 0.1, t1: TC, x: 400, talla: 360, color: 'claro', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(7, 6), 'ofrecer'], [w(8, 1), 'senalar'], [w(8, 5), 'de_pie'], [wf(8, -1) + 0.2, 'celebrar']], sonrisa: 1 });
E.obj('bocaP3', 'bocadillo', { t0: w(7, 5), t1: w(8, 5), sale: 0.2, x: 320, y: -455, w: 130, h: 64, on: 1, pop: true, caja: [-65, -32, 130, 90] });
E.obj('rotForm', 'rotulo', { t0: w(8, 1) - 0.1, t1: TC, x: -40, y: -460, texto: 'FORMACIÓN', size: 30, col: '#e6ce46', pop: true, caja: [-100, -18, 200, 36] });
E.obj('form', 'barra', { t0: N[2].S - 0.1, t1: TC, x: 20, y: -300, w: 440, h: 44, pop: true, marca: 0.55, rotMarca: 'EMPIEZAS', r: 50,
  f: [[w(8, 0), 0], [w(8, 4) + 0.2, 0.55, 'out']], barrido: [w(8, 4) + 0.25, wf(8, -1) + 0.2], caja: [-220, -100, 440, 128] });
E.sfx(w(8, 0), 'fill');
E.obj('chF', 'chispas', { t0: w(8, 4) + 0.2, t1: w(8, 4) + 1.0, x: 20 - 220 + 8 + 424 * 0.55, y: -300, r0: 40, r1: 120, inspeccion: false });
E.golpe(w(8, 4) + 0.2, 0.04);
// «no cuando ya estés en apuros»: a la derecha de la marca, el tramo de los apuros se llena de papeles
E.obj('apuros', 'rotulo', { t0: w(8, 8) - 0.1, t1: TC, x: 155, y: -232, texto: 'EN APUROS', size: 24, col: ROJO, pop: true, caja: [-75, -14, 150, 28] });
E.obj('papeles3', 'papeles', { t0: w(8, 5), t1: TC, x: 160, y: -14, n: 6, k: [[w(8, 5), 0], [wf(8, -1), 6, 'lin']], luz: [[0, 1], [wf(8, -1) + 0.1, 1], [wf(8, -1) + 0.4, 0.4]], caja: [-95, -110, 190, 125] });
E.temblor(w(8, 10), 10, 0.35);
E.destello(wf(8, -1) + 0.2, 0.12);

// ---------- cierre: resumen y envío ----------
// 9: Subir(0) no(1) siempre(2) es(3) avanzar(4)
// 10: Mándaselo(0) a(1) ese(2) amigo(3) que(4) está(5) a(6) punto(7) de(8) aceptar(9) un(10) ascenso(11)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(9, 4), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, items: ['Las tareas', 'Lo que sabes', 'Quién enseña'], gap: 270,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(9, 4)], caja: [-400, -60, 800, 200] });
E.obj('confC', 'confeti', { t0: wf(9, -1), t1: wf(9, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(9, -1), 0.22); E.golpe(wf(9, -1), 0.04);
E.figura('yoF', { t0: w(10, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(10, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(10, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(10, 11)], vuelo: [[wf(10, -1), 0], [wf(10, -1) + 0.5, 1, 'in']] });
