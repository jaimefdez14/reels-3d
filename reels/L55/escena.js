// L55 · El efecto Pigmalión (estilo B; reglas 15, 20, 21, 24)
// Idea visual: dos barras, «lo que esperas» y «lo que rinde» el otro; la segunda acaba donde la primera. El jefe gris
// espera poco, le da al muñeco solo papeles fáciles y su barra de rendimiento cae; en el colegio, los alumnos elegidos al
// azar se vuelven amarillos y sus barras se llenan más que las de los demás.
// Contador que suma: «AÑOS 60» rueda. Algo que se rellena por punto: la barra de lo que esperas y la que le llega al otro
// (punto 1), la barra de dificultad que pasa la marca de lo fácil y los bloques de la tarea (punto 2), las casillas del
// informe que se corrige (punto 3).
// Regla 20: «De este no espero mucho.» va en bocadillo del jefe (gris) durante el gancho; la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(3, 0), gap: 70, y: 360 } });

// «La primera: // …» → T en «La», S en la primera palabra del punto
const N = [4, 6, 8].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(10, 0) - 0.1;   // resumen
const ROJO = '#e4574f';
const GRIS = '#9a9c9b';
const AM = '#e6ce46';

E.camara([
  [0, [0, -380, 1.04]], [w(0, 7), [10, -385, 1.06]], [w(0, 14), [-20, -390, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 8), [10, -385, 1.04]],
  [w(2, 0), [0, -380, 1.02]], [w(2, 10), [10, -385, 1.04]], [w(2, 21), [-10, -390, 1.06]], [w(3, 0), [0, -382, 1.03]], [N[0].T, [10, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(5, 0), [15, -385, 1.04]], [w(5, 8), [-10, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(7, 0), [-15, -385, 1.04]], [w(7, 7), [15, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(9, 0), [-10, -385, 1.04]], [w(9, 8), [10, -385, 1.05]], [TC - 0.1, [0, -385, 1.04]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Tu(0) jefe(1) te(2) trata(3) según(4) lo(5) que(6) espera(7) de(8) ti(9) y(10) acabas(11) dándole(12) la(13) razón(14)   [bocadillo del jefe]
// fotograma 0: el muñeco con su barra de rendimiento llenándose y el jefe gris delante; «te trata»: el jefe le pasa dos
// papeles fáciles; «lo que espera de ti»: bocadillo; «y acabas dándole la razón»: la barra se vacía hasta abajo
E.figura('yo', { t0: 0, t1: w(1, 0), sale: 0.25, x: -280, talla: 330, cara: true,
  poses: [[0, 'levantar'], [w(0, 1), 'de_pie'], [w(0, 3), 'coger'], [w(0, 7), 'pensar'], [w(0, 11), 'encoger'], [w(0, 14), 'triste']],
  sonrisa: [[0, 1.2], [w(0, 3), 0.6], [w(0, 7), 0], [w(0, 11), -0.8], [w(0, 14), -1.5]] });
E.obj('rinde0', 'relleno', { t0: 0, t1: w(1, 0), sale: 0.2, x: -280, y: -470, w: 240, h: 36, rotulo: 'LO QUE RINDES',
  f: [[0.1, 0.1], [w(0, 1), 0.85, 'out'], [w(0, 11), 0.85], [w(0, 14) + 0.25, 0.15, 'inout']], caja: [-120, -52, 240, 70] });
E.sfx(0.1, 'fill');
E.figura('jefe0', { t0: 0, t1: w(1, 0), sale: 0.25, x: 330, talla: 350, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(0, 2), 'ofrecer'], [w(0, 5), 'senalar'], [w(0, 12), 'de_pie']], sonrisa: [[0, 0.2], [w(0, 7), -0.4]] });
E.obj('papel0', 'papeles', { t0: w(0, 2) - 0.1, t1: w(1, 0), sale: 0.2, x: [[0, 120], [w(0, 3), 120], [w(0, 4) + 0.2, -60, 'inout']], y: -14, n: 2,
  k: [[w(0, 2), 0], [w(0, 3), 2, 'out']], caja: [-95, -50, 190, 62] });
E.obj('bocaJ', 'bocadillo', { t0: w(0, 5), t1: w(0, 14) + 0.2, sale: 0.2, x: 225, y: -450, w: 430, h: 76, texto: 'De este no espero mucho.', size: 27, pop: true,
  on: [[w(0, 5), 0], [w(0, 7), 1]], caja: [-215, -38, 430, 102] });
E.temblor(w(0, 14), 14, 0.45); E.golpe(w(0, 14), 0.05); E.sfx(w(0, 14), 'thud');

// 1: Se(0) llama(1) efecto(2) Pigmalión(3) Se(4) probó(5) en(6) un(7) colegio(8) en(9) los(10) años(11) sesenta(12)
E.figura('yo1', { t0: w(1, 0) - 0.05, t1: w(2, 0), sale: 0.25, x: -330, talla: 330, cara: true,
  poses: [[0, 'de_pie'], [w(1, 2), 'senalar'], [w(1, 5), 'de_pie'], [w(1, 8), 'senalar'], [w(1, 11), 'pensar']],
  sonrisa: [[0, -0.4], [w(1, 3), 0.8], [w(1, 8), 1.0]] });
E.obj('rotPig', 'rotulo', { t0: w(1, 2) - 0.1, t1: w(1, 9), sale: 0.25, x: 60, y: -470, texto: 'EFECTO PIGMALIÓN', size: 36, col: AM, peso: 700, pop: true, caja: [-230, -22, 460, 44] });
E.obj('chPig', 'chispas', { t0: w(1, 3), t1: w(1, 3) + 0.8, x: 60, y: -470, r0: 120, r1: 240, inspeccion: false });
E.golpe(w(1, 3), 0.04);
E.obj('puerta1', 'puerta', { t0: w(1, 4) - 0.1, t1: w(2, 6), sale: 0.25, x: 200, w: 200, h: 320, pop: true, refl: true,
  p: [[w(1, 8), 0], [w(1, 9) + 0.3, 0.6, 'out']], caja: [-100, -320, 200, 320] });
E.obj('rotCol', 'rotulo', { t0: w(1, 8) - 0.1, t1: w(2, 6), sale: 0.2, x: 200, y: -360, texto: 'COLEGIO', size: 28, col: GRIS, pop: true, caja: [-80, -16, 160, 32] });
E.obj('anios', 'contador', { t0: w(1, 9) + 0.05, t1: w(2, 9), sale: 0.2, x: 60, y: -470, size: 80, pre: 'AÑOS', miles: false, pop: true,
  v: [[w(1, 10), 0], [w(1, 12) + 0.4, 60, 'out']], barrido: [w(1, 12) + 0.45], caja: [-170, -42, 340, 84] });
E.obj('chAnios', 'chispas', { t0: w(1, 12) + 0.4, t1: w(1, 12) + 1.2, x: 60, y: -470, r0: 120, r1: 220, inspeccion: false });

// 2: A(0) los(1) profesores(2) les(3) dijeron(4) que(5) unos(6) alumnos(7) iban(8) a(9) destacar(10) Los(11) habían(12) elegido(13) al(14) azar(15) y(16) fueron(17) los(18) que(19) más(20) mejoraron(21)
// la profesora gris escucha («les dijeron»: bocadillo sin texto); salen cuatro alumnos; dos se vuelven amarillos al
// «destacar»; «al azar»: rótulo; «fueron los que más mejoraron»: barras sobre cada alumno, las suyas casi llenas
E.figura('prof', { t0: w(2, 0) - 0.1, t1: w(3, 0) - 0.15, sale: 0.25, x: -370, talla: 330, color: 'claro', cara: true,
  poses: [[0, 'de_pie'], [w(2, 4), 'pensar'], [w(2, 10), 'senalar'], [w(2, 17), 'celebrar']], sonrisa: [[0, 0.3], [w(2, 10), 1], [w(2, 21), 1.4]] });
E.obj('bocaP', 'bocadillo', { t0: w(2, 3), t1: w(2, 11), sale: 0.2, x: -300, y: -455, w: 130, h: 64, on: 1, pop: true, caja: [-65, -32, 130, 90] });
const XA = [-150, 10, 170, 330], ELEG = [1, 3];
XA.forEach((x, i) => { const e = ELEG.includes(i); const a = w(2, 6) + i * 0.1;
  E.figura('al' + i, { t0: a, t1: w(3, 0), sale: 0.2, x, talla: 220, dir: i < 2 ? 1 : -1, color: 'gris',
    colorK: e ? [[0, 0], [w(2, 10) + i * 0.06, 0], [w(2, 10) + i * 0.06 + 0.3, 1]] : 0, cara: e,
    poses: e ? [[0, 'de_pie'], [w(2, 10), 'levantar'], [w(2, 21), 'celebrar']] : [[0, 'de_pie'], [w(2, 21), 'encoger']], sonrisa: e ? 1.2 : 0 });
  if (e) E.obj('pulA' + i, 'pulso', { t0: w(2, 10) + i * 0.06 + 0.3, t1: w(2, 10) + i * 0.06 + 0.9, x, y: -110, r0: 30, r1: 120, inspeccion: false });
  E.obj('barA' + i, 'relleno', { t0: w(2, 16) + i * 0.08, t1: w(3, 0), sale: 0.2, x, y: -310, w: 120, h: 26, pop: true,
    f: [[w(2, 17), 0], [w(2, 21) + 0.4, e ? 0.95 : 0.35, 'out']], caja: [-60, -13, 120, 26] });
  if (e) E.obj('chA' + i, 'chispas', { t0: w(2, 21) + 0.4, t1: w(2, 21) + 1.1, x, y: -310, r0: 50, r1: 110, inspeccion: false });
});
E.sfx(w(2, 10), 'pop'); E.sfx(w(2, 17), 'fill');
E.obj('rotAzar', 'rotulo', { t0: w(2, 13), t1: w(3, 0), sale: 0.2, x: 90, y: -460, texto: 'AL AZAR', size: 30, col: GRIS, pop: true, caja: [-90, -18, 180, 36] });
E.obj('dado', 'moneda', { t0: w(2, 13), t1: w(2, 16) + 0.2, sale: 0.15, x: 250, y: -460, r: 30, n: '?', pop: true, rot: [[w(2, 13), 0], [w(2, 16), 6.28, 'out']], caja: [-30, -30, 60, 60] });
E.golpe(w(2, 21) + 0.4, 0.04); E.destello(w(2, 21) + 0.4, 0.1);

// 3: Tres(0) reglas(1) si(2) tienes(3) gente(4) a(5) tu(6) cargo(7)
// ahora el muñeco es el jefe: tres monedas aparecen y su equipo (gris) entra debajo
E.figura('yo3', { t0: w(3, 0), t1: fin(0), x: -340, talla: 330, cara: true,
  poses: [[0, 'de_pie'], [w(3, 0), 'senalar'], [w(3, 4), 'ofrecer']], sonrisa: [[0, 0.4], [w(3, 4), 1.1]] });
[0, 1, 2].forEach(i => { const a = w(3, 0) + i * 0.13;
  E.obj('q' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: -20 + i * 160, y: -470, r: 32, n: '', pop: true, sfx: i === 0,
    s: i === 0 ? [[0, 1], [wf(3, -1), 1], [wf(3, -1) + 0.3, 1.3, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [wf(3, -1), 1], [wf(3, -1) + 0.3, 0.4]], caja: [-32, -32, 64, 64] }); });
[0, 1, 2].forEach(i => E.figura('eq' + i, { t0: w(3, 4) + i * 0.1, t1: N[0].T + 0.3, sale: 0.2, x: -20 + i * 160, talla: 250, color: 'gris', dir: -1,
  poses: [[0, 'de_pie'], [w(3, 7), i === 1 ? 'levantar' : 'de_pie']] }));
E.destello(wf(3, -1), 0.12);

// ---------- 1 · di en voz alta lo que esperas ----------
// 4: La(0) primera(1) di(2) en(3) voz(4) alta(5) lo(6) que(7) esperas(8)
// 5: Si(0) confías(1) en(2) alguien(3) díselo(4) Si(5) te(6) lo(7) callas(8) no(9) le(10) sirve(11) de(12) nada(13)
E.numero(1, N[0].T, N[0].S, { desde: 'q1', hacia: 'voz1' });
E.figura('yoP1', { t0: N[0].S - 0.1, t1: fin(1), x: -330, talla: 340, cara: true,
  poses: [[0, 'de_pie'], [w(4, 2), 'ofrecer'], [w(4, 6), 'senalar'], [w(5, 0), 'de_pie'], [w(5, 4), 'ofrecer'], [w(5, 8), 'apartarse'], [w(5, 11), 'encoger']],
  sonrisa: [[0, 0.4], [w(4, 2), 1.2], [w(5, 4), 1.5], [w(5, 8), -0.2], [w(5, 13), -0.8]] });
E.figura('otro1', { t0: N[0].S - 0.05, t1: fin(1), x: 330, talla: 320, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(5, 4) + 0.5, 'celebrar'], [w(5, 8) + 0.3, 'encoger'], [w(5, 13), 'triste']],
  sonrisa: [[0, 0], [w(5, 4) + 0.5, 1.4], [w(5, 8) + 0.3, -0.4], [w(5, 13), -1.2]] });
E.obj('voz1', 'ondas', { t0: N[0].S - 0.1, t1: fin(1), x: 0, y: -260, n: 7, gap: 26, pop: true,
  amp: [[0, 0], [w(4, 3), 0], [w(4, 5) + 0.2, 1, 'out'], [w(5, 7), 1], [w(5, 8) + 0.3, 0, 'inout']], caja: [-90, -50, 180, 100] });
E.obj('espera1', 'relleno', { t0: N[0].S - 0.1, t1: fin(1), x: -280, y: -470, w: 260, h: 36, pop: true, sobrevive: true, r: 50, rotulo: 'LO QUE ESPERAS',
  f: [[w(4, 6), 0], [wf(4, -1) + 0.3, 1, 'out']], caja: [-130, -52, 260, 70] });
E.sfx(w(4, 6), 'fill');
E.obj('chE1', 'chispas', { t0: wf(4, -1) + 0.3, t1: wf(4, -1) + 1.0, x: -280, y: -470, r0: 80, r1: 170, inspeccion: false });
E.obj('llega1', 'relleno', { t0: w(5, 0) - 0.1, t1: fin(1), x: 280, y: -470, w: 260, h: 36, pop: true, rotulo: 'LO QUE LE LLEGA',
  f: [[w(5, 4), 0], [w(5, 4) + 0.6, 0.95, 'out'], [w(5, 8), 0.95], [w(5, 13), 0.05, 'inout']], caja: [-130, -52, 260, 70] });
for (let i = 0; i < 3; i++) { const a = w(5, 4) - 0.1 + i * 0.12;
  E.obj('mv' + i, 'moneda', { t0: a, t1: a + 0.6, entra: 0.06, sale: 0.12, r: 18, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, -280], [a + 0.5, 280, 'inout']], y: [[a, -430], [a + 0.25, -560], [a + 0.5, -470, 'in']] }); }
E.sfx(w(5, 4) + 0.1, 'fill');
E.obj('chL1', 'chispas', { t0: w(5, 4) + 0.6, t1: w(5, 4) + 1.3, x: 280, y: -470, r0: 80, r1: 170, inspeccion: false });
E.golpe(w(5, 4) + 0.5, 0.04);
E.obj('nada1', 'rotulo', { t0: w(5, 12), t1: fin(1), sale: 0.15, x: 280, y: -400, texto: 'NADA', size: 26, col: ROJO, pop: true, caja: [-50, -15, 100, 30] });
E.temblor(w(5, 13), 10, 0.35); E.sfx(w(5, 13), 'thud');

// ---------- 2 · encarga algo un poco más difícil ----------
// 6: La(0) segunda(1) encarga(2) algo(3) un(4) poco(5) más(6) difícil(7)
// 7: Dar(0) siempre(1) lo(2) fácil(3) es(4) decirle(5) a(6) alguien(7) que(8) no(9) puede(10) con(11) más(12)
E.numero(2, N[1].T, N[1].S, { desde: 'espera1', hacia: 'dif' });
E.figura('yoP2', { t0: N[1].S - 0.1, t1: fin(2), x: -340, talla: 340, cara: true,
  poses: [[0, 'de_pie'], [w(6, 2), 'ofrecer'], [w(6, 6), 'senalar'], [w(7, 0), 'de_pie'], [w(7, 2), 'ofrecer'], [w(7, 5), 'encoger']],
  sonrisa: [[0, 0.4], [w(6, 2), 1], [w(6, 7), 1.4], [w(7, 2), 0], [w(7, 5), -0.8]] });
E.figura('otro2', { t0: N[1].S - 0.05, t1: fin(2), x: 340, talla: 320, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(6, 3), 'coger'], [w(6, 7) + 0.3, 'celebrar'], [w(7, 2), 'de_pie'], [w(7, 9), 'triste']],
  sonrisa: [[0, 0.2], [w(6, 7) + 0.3, 1.4], [w(7, 2), 0], [w(7, 9), -1.2]] });
E.obj('dif', 'barra', { t0: N[1].S - 0.1, t1: fin(2), x: 0, y: -440, w: 440, h: 44, pop: true, marca: 0.55, rotMarca: 'LO FÁCIL', r: 50,
  f: [[w(6, 2), 0], [w(6, 4), 0.55, 'out'], [w(6, 6), 0.55], [w(6, 7) + 0.3, 0.72, 'back'], [w(7, 0), 0.72], [w(7, 3) + 0.2, 0.3, 'inout']],
  barrido: [w(6, 7) + 0.3], caja: [-220, -100, 440, 128] });
E.sfx(w(6, 2), 'fill'); E.sfx(w(6, 6), 'fill');
E.obj('chD', 'chispas', { t0: w(6, 7) + 0.3, t1: w(6, 7) + 1.0, x: -220 + 8 + 424 * 0.72, y: -440, r0: 40, r1: 120, inspeccion: false });
E.golpe(w(6, 7) + 0.3, 0.04);
E.obj('rotMas', 'rotulo', { t0: w(6, 6) - 0.05, t1: w(7, 0), sale: 0.2, x: 150, y: -370, texto: 'UN POCO MÁS', size: 24, col: AM, pop: true, caja: [-90, -14, 180, 28] });
// la tarea: tres bloques que el otro va completando
E.obj('tarea', 'bloques', { t0: w(6, 2) + 0.1, t1: fin(2), x: -55, y: -40, n: 3, w: 240, h: 70, pop: true, sobrevive: true, r: 60, refl: true,
  parte: [[w(6, 3), 0], [w(6, 4) + 0.3, 1, 'out']], hechos: [[w(6, 5), 0], [wf(6, -1) + 0.4, 3, 'lin']], caja: [-125, -50, 250, 90] });
E.sfx(w(6, 5), 'fill');
E.obj('rotFacil', 'rotulo', { t0: w(7, 2) - 0.1, t1: fin(2), sale: 0.2, x: -110, y: -370, texto: 'LO FÁCIL', size: 24, col: GRIS, pop: true, caja: [-70, -14, 140, 28] });
E.obj('papel2', 'papeles', { t0: w(7, 1), t1: fin(2), sale: 0.2, x: 175, y: -14, n: 3, k: [[w(7, 1), 0], [w(7, 4), 3, 'lin']], caja: [-95, -70, 190, 82] });
E.temblor(w(7, 12), 10, 0.35); E.sfx(w(7, 12), 'thud');

// ---------- 3 · corrige el trabajo, no a la persona ----------
// 8: La(0) tercera(1) corrige(2) el(3) trabajo(4) no(5) a(6) la(7) persona(8)
// 9: Se(0) puede(1) criticar(2) un(3) informe(4) sin(5) poner(6) en(7) duda(8) a(9) quien(10) lo(11) ha(12) escrito(13)
E.numero(3, N[2].T, N[2].S, { desde: 'tarea', hacia: 'inf' });
E.figura('yoP3', { t0: N[2].S - 0.1, t1: TC, x: -350, talla: 340, cara: true,
  poses: [[0, 'de_pie'], [w(8, 2), 'senalar'], [w(8, 5), 'de_pie'], [w(9, 2), 'escribir'], [w(9, 5), 'ofrecer'], [wf(9, -1) + 0.2, 'celebrar']],
  sonrisa: [[0, 0.3], [w(8, 2), 0.6], [w(9, 5), 1.2], [wf(9, -1) + 0.2, 1.5]] });
E.figura('otro3', { t0: N[2].S - 0.05, t1: TC, x: 340, talla: 320, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(8, 5), 'pensar'], [w(9, 5), 'de_pie'], [w(9, 10), 'escribir'], [wf(9, -1) + 0.2, 'celebrar']],
  sonrisa: [[0, 0.3], [w(8, 7), 0.6], [w(9, 10), 1.1], [wf(9, -1) + 0.2, 1.5]] });
E.obj('rotTrab', 'rotulo', { t0: w(8, 3) - 0.1, t1: TC, x: -20, y: -440, texto: [[0, 'EL TRABAJO'], [w(9, 4), 'EL INFORME']], size: 30, col: AM, pop: true, caja: [-110, -18, 220, 36] });
E.obj('inf', 'lista', { t0: N[2].S - 0.1, t1: TC, x: -20, y: -280, n: 3, w: 300, gap: 66, pop: true, r: 70,
  brillo: [[w(8, 2), 0], [w(8, 4) + 0.4, 3, 'lin']], p: [[w(9, 2), 0], [w(9, 4) + 0.5, 3, 'lin']], caja: [-150, -84, 300, 168] });
E.sfx(w(8, 2), 'fill'); E.sfx(w(9, 2), 'fill');
E.obj('chInf', 'chispas', { t0: w(9, 4) + 0.5, t1: w(9, 4) + 1.2, x: -20, y: -280, r0: 120, r1: 220, inspeccion: false });
E.golpe(w(9, 4) + 0.5, 0.04);
E.obj('rotPers', 'rotulo', { t0: w(8, 5) - 0.05, t1: TC, x: 290, y: -400, texto: 'NO A LA PERSONA', size: 22, col: GRIS, pop: true, caja: [-145, -14, 290, 28] });
E.obj('pulP', 'pulso', { t0: wf(9, -1) + 0.2, t1: wf(9, -1) + 0.8, x: 340, y: -160, r0: 40, r1: 140, inspeccion: false });
E.destello(wf(9, -1) + 0.2, 0.12);

// ---------- cierre: resumen y envío ----------
// 10: La(0) gente(1) suele(2) llegar(3) hasta(4) donde(5) esperas(6) que(7) llegue(8)
// 11: Mándaselo(0) a(1) ese(2) amigo(3) que(4) acaba(5) de(6) estrenarse(7) como(8) jefe(9)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(10, 6), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, items: ['Dilo en alto', 'Un poco más', 'El trabajo'], gap: 290,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(10, 6)], caja: [-420, -60, 840, 200] });
E.obj('confC', 'confeti', { t0: wf(10, -1), t1: wf(10, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(10, -1), 0.22); E.golpe(wf(10, -1), 0.04);
E.figura('yoF', { t0: w(11, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(11, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(11, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(11, 9)], vuelo: [[wf(11, -1), 0], [wf(11, -1) + 0.5, 1, 'in']] });
