// L2 · Cinco leyes que se cumplen en tu trabajo (estilo B, molde de B-R5 + cierre de B-R4)
// Gancho visual (REDACCION §2c): fotograma 0 lleno con la tarea «1 h»; la barra se come la pantalla mientras el
// contador sube a 5 h; «tiene nombre» → golpe; «cinco leyes» → las cinco monedas numeradas.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'grafito', sub: 'una', subY: 650, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 5, estilo: 'linea', aparece: w(1, 0) - 0.3, gap: 92, y: 380 } });

// «Primera:» es una palabra: el nombre de cada ley empieza en la palabra 1
const N = [1, 4, 7, 10, 13].map((li, k) => ({ T: w(li, 0) - 0.05, S: w(li, 1) - 0.12 }));
const TC = w(16, 0) - 0.1;

E.camara([
  [0, [0, -380, 1.04]], [w(0, 16), [40, -380, 1.0]], [w(0, 18), [0, -385, 1.02]], [N[0].T, [0, -385, 1.04]],
  [N[0].S - 0.05, [0, -370, 1], 'lin'], [N[1].T, [40, -380, 1.06]],
  [N[1].S - 0.05, [0, -370, 1], 'lin'], [N[2].T, [0, -380, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(9, 0), [0, -380, 1]], [N[3].T, [-20, -390, 1.06]],
  [N[3].S - 0.05, [0, -380, 1], 'lin'], [N[4].T, [0, -385, 1.05]],
  [N[4].S - 0.05, [0, -370, 1], 'lin'], [TC, [0, -380, 1.04]],
]);

// ---------- gancho ----------
// 0: Te(0) pones(1) con(2) algo(3) que(4) te(5) iba(6) a(7) llevar(8) una(9) hora(10) y(11) se(12) te(13) va(14) la(15) tarde(16) entera.(17) No(18) es(19) culpa(20) tuya:(21) hasta(22) tiene(23) nombre(24) de(25) ley.(26) Y(27) hay(28) otras(29) cuatro(30) que(31) te(32) la(33) lían(34) cada(35) semana.(36)
const GH = w(0, 27) + 0.25; // la tarea se va cuando empieza «Y hay cuatro más…»
E.figura('yo', { t0: 0, t1: N[0].T + 0.45, x: -340, cara: true,
  poses: [[0, 'de_pie'], [w(0, 11), 'apartarse'], [w(0, 16), 'manos_cabeza'], [w(0, 18), 'de_pie'], [w(0, 28), 'levantar'], [wf(0, -1) + 0.3, 'de_pie']],
  sonrisa: [[0, 0.4], [w(0, 12), -0.4], [w(0, 16), -1], [w(0, 19), -1], [w(0, 21), 1.2]] });
E.obj('tareaH', 'barra', { t0: 0, t1: GH, x: [[0, 120], [w(0, 11), 120], [wf(0, 17), 140, 'inout']], y: -330, h: 64,
  w: [[0, 300], [w(0, 11), 300], [wf(0, 17), 720, 'inout']], f: [[0, 0.3], [w(0, 11), 0.3], [wf(0, 17), 1, 'inout']],
  barrido: [w(0, 17)], caja: [-360, -32, 720, 64] });
E.obj('rotTareaH', 'rotulo', { t0: 0, t1: GH, x: 140, y: -265, texto: [[0, 'TAREA'], [w(0, 23), 'NOMBRE DE LEY']], size: 28, col: [[0, '#9a9c9b']], caja: [-140, -16, 280, 32] });
E.obj('horasH', 'contador', { t0: 0, t1: GH, x: 140, y: -440, v: [[0, 1], [w(0, 11), 1], [wf(0, 17), 5, 'inout']], suf: ' h', size: 76, col: 'txt', miles: false, caja: [-90, -42, 180, 84] });
E.temblor(w(0, 16), 12, 0.4);
E.golpe(w(0, 26), 0.05); E.destello(w(0, 26), 0.22);
// «Y hay cuatro más»: la ley y las otras cuatro, las cinco monedas entran en fila, ya numeradas, con rayos detrás
E.obj('rayosH', 'rayos', { t0: w(0, 28) - 0.1, t1: N[0].T + 0.3, x: 0, y: -440, r: 330, z: -2, p: [[w(0, 28) - 0.1, 0], [w(0, 30), 1, 'out']], inspeccion: false });
for (let i = 0; i < 5; i++) {
  const a = w(0, 28) + i * 0.1, x = (i - 2) * 92;
  E.obj('h' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? N[0].T + 0.1 : N[0].T + 0.45, entra: 0.15, x, y: -440, pop: true, r: 32, n: i + 1, sobrevive: i === 0, sfx: i === 0, inspeccion: false });
}
E.obj('chH', 'chispas', { t0: w(0, 30), t1: w(0, 30) + 0.8, x: 0, y: -440, r0: 160, r1: 280, n: 16, inspeccion: false });

// ---------- 1 · Parkinson: el trabajo se estira ----------
// 2: Dura(0) todo(1) el(2) tiempo(3) que(4) le(5) des.(6) Es(7) la(8) ley(9) de(10) Parkinson.(11)
// 3: Ponle(0) un(1) plazo(2) más(3) corto(4) y(5) lo(6) acabas(7) antes.(8)
E.numero(1, N[0].T, N[0].S, { desde: 'h1', hacia: 'barra1' });
E.figura('yo1', { t0: N[0].S - 0.1, t1: N[1].T + 0.45, x: -360, cara: true, toca: ['barra1'],
  poses: [[0, 'de_pie'], [w(2, 0), 'senalar'], [w(2, 5), 'triste'], [w(3, 0), 'senalar'], [w(3, 7), 'celebrar'], [wf(3, -1) + 0.3, 'de_pie']],
  sonrisa: [[w(2, 4), 0], [w(2, 6), -1], [w(3, 6), -0.5], [w(3, 8), 1.4]] });
E.obj('barra1', 'barra', { t0: N[0].S - 0.1, t1: N[1].T + 0.45, x: 90, y: -330, h: 64, r: 60,
  w: [[0, 560], [w(3, 1), 560], [w(3, 4), 300, 'back']], f: [[0, 0.22], [w(2, 1), 0.22], [w(2, 6), 1, 'inout'], [w(3, 4), 1], [w(3, 7), 1]],
  barrido: [w(2, 9), w(3, 7)], marcas: [], caja: [-280, -32, 560, 110] });
E.obj('rot1', 'rotulo', { t0: w(2, 0), t1: N[1].T + 0.45, x: 90, y: -265, texto: [[0, 'TAREA'], [w(2, 9), 'LEY DE PARKINSON']], caja: [-150, -16, 300, 32] });
E.obj('horas1', 'contador', { t0: w(2, 0), t1: N[1].T + 0.45, x: 90, y: -440, v: [[w(2, 1), 1], [w(2, 6), 4, 'inout'], [w(3, 1), 4], [w(3, 4), 2, 'inout']], suf: ' h', size: 64, col: 'txt', miles: false, pop: true, caja: [-80, -36, 160, 72] });
E.temblor(w(2, 6), 9, 0.35); E.golpe(w(2, 9), 0.04);
E.obj('ch1', 'chispas', { t0: w(3, 7), t1: w(3, 7) + 0.8, x: -40, y: -330, r0: 90, r1: 200, inspeccion: false });

// ---------- 2 · Hofstadter: todo tarda más ----------
// 4: Segunda:(0) todo(1) tarda(2) más(3) de(4) lo(5) que(6) crees.(7)
// 5: Siempre,(0) aunque(1) ya(2) lo(3) tengas(4) en(5) cuenta.(6) Es(7) la(8) ley(9) de(10) Hofstadter.(11)
// 6: Calcula(0) lo(1) que(2) vas(3) a(4) tardar(5) y(6) súmale(7) la(8) mitad.(9)
E.numero(2, N[1].T, N[1].S, { desde: 'barra1', hacia: 'barra2' });
E.figura('yo2', { t0: N[1].S - 0.1, t1: N[2].T + 0.45, x: -360, cara: true,
  poses: [[0, 'de_pie'], [w(4, 6), 'manos_cabeza'], [w(5, 2), 'pensar'], [w(5, 6), 'triste'], [w(6, 0), 'pensar'], [w(6, 7), 'senalar'], [wf(6, -1), 'celebrar']],
  sonrisa: [[w(4, 6), -0.8], [w(6, 0), 0], [wf(6, -1), 1.4]] });
E.obj('barra2', 'barra', { t0: N[1].S - 0.1, t1: N[2].T + 0.45, x: 90, y: -330, w: 560, h: 64, r: 60, rotMarca: 'PLAN',
  f: [[0, 0], [w(4, 1), 0], [w(4, 4), 0.55, 'inout'], [w(4, 7), 0.85, 'out'], [w(5, 1), 0.85], [w(5, 6), 1, 'inout'], [w(6, 0), 1], [w(6, 0) + 0.3, 0], [w(6, 5), 0.6, 'inout']],
  marca: [[0, 0.55], [w(5, 1), 0.55], [w(5, 5), 0.8, 'inout'], [w(6, 0) + 0.3, 0.55], [w(6, 0) + 0.31, 0.6], [w(6, 7), 0.6], [w(6, 9), 0.9, 'back']],
  barrido: [w(5, 9), wf(6, -1)], caja: [-280, -100, 560, 160] });
E.obj('rot2', 'rotulo', { t0: w(5, 7) - 0.1, t1: N[2].T + 0.45, x: 90, y: -235, texto: 'LEY DE HOFSTADTER', caja: [-160, -16, 320, 32] });
E.temblor(w(4, 7), 10, 0.35); E.temblor(w(5, 6), 12, 0.4); E.golpe(w(5, 9), 0.04);
E.obj('mitad', 'pieza', { t0: w(6, 7) - 0.1, t1: wf(6, -1) + 0.2, r: 34, texto: '+½', libre: true, estela: 6, inspeccion: false, sfx: false,
  x: [[w(6, 7) - 0.1, -150], [wf(6, -1), 90 + 0.4 * 560, 'in']], y: [[w(6, 7) - 0.1, -440], [w(6, 8), -500, 'out'], [wf(6, -1), -340, 'in']] });
E.obj('ch2', 'chispas', { t0: wf(6, -1), t1: wf(6, -1) + 0.8, x: 90 + 0.4 * 560, y: -330, r0: 60, r1: 160, inspeccion: false });

// ---------- 3 · Hanlon: no es mala fe, es un despiste ----------
// 7: Tercera:(0) si(1) alguien(2) no(3) te(4) contesta(5) un(6) correo,(7) no(8) es(9) por(10) mala(11) fe.(12)
// 8: Casi(0) siempre(1) es(2) un(3) despiste.(4) Es(5) la(6) navaja(7) de(8) Hanlon.(9)
// 9: Escríbele(0) otra(1) vez(2) y(3) no(4) te(5) mosquees.(6)
E.numero(3, N[2].T, N[2].S, { desde: 'barra2' });
E.figura('yo3', { t0: N[2].S - 0.1, t1: N[3].T + 0.45, x: -300, cara: true,
  poses: [[0, 'ofrecer'], [w(7, 4), { lean: 6, sf: 30, ef: 80, sb: -30, eb: -80, cab: 6 }], [w(7, 8), 'pensar'], [w(9, 0), 'ofrecer'], [w(9, 4), 'celebrar']],
  sonrisa: [[w(7, 3), 0], [w(7, 5), -1], [w(8, 0), 0], [w(9, 5), 1.4]] });
E.figura('otro', { t0: N[2].S - 0.1, t1: N[3].T + 0.45, x: 330, dir: -1, color: 'gris', toca: ['papeles'],
  poses: [[0, 'de_pie'], [w(8, 2), 'manos_cabeza'], [w(9, 2), 'coger'], [w(9, 5), 'encoger']] });
E.obj('sobre1', 'pieza', { t0: w(7, 1), t1: w(7, 6), r: 30, texto: '✉', libre: true, estela: 5, inspeccion: false, sfx: false,
  x: [[w(7, 1), -230], [w(7, 5), 220, 'inout']], y: [[w(7, 1), -360], [w(7, 3), -450, 'out'], [w(7, 5), -360, 'in']] });
E.obj('espera', 'contador', { t0: w(7, 5), t1: w(8, 0), x: 0, y: -440, v: [[w(7, 5), 0], [w(7, 12), 3, 'lin']], suf: ' días sin respuesta', size: 40, col: 'txt', miles: false, pop: true, caja: [-210, -24, 420, 48] });
E.obj('enfado', 'maraña', { t0: w(7, 3), t1: N[3].T + 0.45, x: -300, y: -560, r: 58, col: '#c25a52', p: [[w(7, 3), 0], [w(7, 7), 1], [w(7, 9), 1], [w(8, 4), 0, 'inout']], inspeccion: false });
E.obj('papeles', 'papeles', { t0: w(8, 0), t1: N[3].T + 0.45, x: 150, n: 9, k: [[w(8, 0), 0], [w(8, 4), 9, 'out']], refl: true, caja: [-95, -160, 190, 160] });
E.obj('rot3', 'rotulo', { t0: w(8, 6), t1: N[3].T + 0.45, x: -20, y: -250, texto: 'NAVAJA DE HANLON', caja: [-150, -16, 300, 32] });
E.golpe(w(8, 7), 0.04);
E.obj('sobre2', 'pieza', { t0: w(9, 0), t1: w(9, 2) + 0.1, r: 30, texto: '✉', libre: true, estela: 6, inspeccion: false, sfx: false,
  x: [[w(9, 0), -230], [w(9, 2), 150, 'inout']], y: [[w(9, 0), -360], [w(9, 1), -460, 'out'], [w(9, 2), -480, 'in']] });
E.obj('correo', 'bocadillo', { t0: w(9, 2), t1: N[3].T + 0.45, x: 150, y: -480, w: 150, h: 96, pop: true, sobrevive: true, r: 60,
  on: [[w(9, 4), 0], [w(9, 6), 1]], barrido: [w(9, 6)], caja: [-75, -48, 150, 122] });
E.obj('ch3', 'chispas', { t0: w(9, 6), t1: w(9, 6) + 0.8, x: 150, y: -480, r0: 70, r1: 160, inspeccion: false });

// ---------- 4 · Zeigarnik: lo que dejas a medias ----------
// 10: Cuarta:(0) lo(1) que(2) dejas(3) a(4) medias(5) no(6) te(7) lo(8) quitas(9) de(10) la(11) cabeza.(12)
// 11: Te(0) acuerdas(1) hasta(2) en(3) la(4) ducha.(5) Es(6) el(7) efecto(8) Zeigarnik.(9)
// 12: Apúntalo(0) y(1) te(2) quedas(3) tranquilo.(4)
E.numero(4, N[3].T, N[3].S, { desde: 'correo', hacia: 'bucle0' });
E.figura('yo4', { t0: N[3].S - 0.1, t1: N[4].T + 0.45, x: -300, cara: true,
  poses: [[0, 'de_pie'], [w(10, 9), 'manos_cabeza'], [w(11, 0), 'triste'], [w(12, 0), 'escribir', 0.3], [w(12, 0) + 0.9, 'senalar'], [w(12, 3), 'celebrar'], [wf(12, -1) + 0.4, 'de_pie']],
  sonrisa: [[w(10, 6), 0], [w(10, 9), -1], [w(12, 2), -0.5], [w(12, 4), 1.5]] });
E.obj('lista', 'lista', { t0: w(12, 0) - 0.2, t1: N[4].T + 0.45, x: 160, y: -330, n: 3, w: 320, gap: 80, s: 1.3, pop: true, r: 60,
  p: [[w(12, 0) + 0.6, 0], [w(12, 0) + 1.6, 3, 'lin']], barrido: [w(12, 3)], caja: [-160, -130, 320, 260] });
const orb = [[-430, -470], [-170, -470], [-150, -360], [-450, -350]];
orb.forEach(([x, y], i) => {
  const ta = i < 3 ? N[3].S + 0.2 + i * 0.3 : w(10, 9), tb = w(12, 0) + 0.3 + i * 0.28; const to = [18, -330 + (Math.min(i, 2) - 1) * 80];
  E.obj('bucle' + i, 'arcoAbierto', { t0: ta, t1: tb + 0.5, sale: 0.2, r: 34, w: 7, p: [[ta, 0], [ta + 0.4, 0.72]], rot: [[ta, 0], [tb, 4 + i]],
    x: [[ta, x], [tb, x], [tb + 0.45, to[0], 'in']], y: [[ta, y], [w(11, 2), y], [w(11, 5), y - 18, 'inout'], [w(11, 6), y], [tb, y], [tb + 0.45, to[1], 'in']],
    estela: 4, libre: true, caja: [-40, -40, 80, 80] });
});
E.obj('rot4', 'rotulo', { t0: w(11, 7), t1: w(12, 0) - 0.3, x: 160, y: -330, texto: 'EFECTO ZEIGARNIK', caja: [-150, -16, 300, 32] });
E.temblor(w(11, 5), 7, 0.35); E.golpe(w(11, 9), 0.04);
E.obj('rayos4', 'rayos', { t0: w(12, 3), t1: N[4].T + 0.3, x: -300, y: -250, r: 300, z: -2, p: [[w(12, 3), 0], [w(12, 4), 1, 'out']], inspeccion: false });
E.obj('ch4', 'chispas', { t0: w(12, 4), t1: w(12, 4) + 0.8, x: 160, y: -330, r0: 120, r1: 230, inspeccion: false });

// ---------- 5 · Pareto: una de cada cinco ----------
// 13: Quinta:(0) de(1) cada(2) cinco(3) cosas(4) que(5) haces,(6) una(7) es(8) la(9) que(10) de(11) verdad(12) cuenta.(13)
// 14: Es(0) la(1) ley(2) de(3) Pareto.(4)
// 15: Busca(0) cuál(1) es(2) y(3) empieza(4) por(5) ella.(6) Lo(7) demás,(8) que(9) espere.(10)
E.numero(5, N[4].T, N[4].S, { hacia: 'rejilla' });
E.figura('yo5', { t0: N[4].S - 0.1, t1: TC, x: -380, cara: true,
  poses: [[0, 'de_pie'], [w(13, 7), 'senalar'], [w(15, 0), 'pensar'], [w(15, 4), 'senalar'], [w(15, 7), 'celebrar']], sonrisa: [[w(15, 6), 0.2], [w(15, 7), 1.4]] });
const ON = [2, 6, 13, 19]; // una de cada cinco: una por fila
E.obj('rejilla', 'cuadricula', { t0: N[4].S - 0.1, t1: TC, x: 120, y: -330, cols: 5, rows: 4, lado: 70, gap: 14, on: ON, r: 60,
  p: [[w(13, 7), 0], [w(13, 9), 1]], apagar: [[w(15, 7), 0], [w(15, 9), 1, 'inout']], barrido: [w(13, 12), w(14, 3)], caja: [-210, -168, 420, 336] });
E.obj('rot5', 'rotulo', { t0: w(14, 0), t1: TC, x: 120, y: -125, texto: 'LEY DE PARETO', caja: [-130, -16, 260, 32] });
E.golpe(w(14, 3), 0.04); E.destello(w(14, 4), 0.15);
// «Busca cuál es»: un anillo recorre las casillas y se queda en la primera que cuenta
const cell = i => [120 + (i % 5 - 2) * 84, -330 + (Math.floor(i / 5) - 1.5) * 84];
E.obj('lupa', 'anillo', { t0: w(15, 0), t1: TC, rx: 50, ry: 50, w: 6, col: '#f4d955', chispa: false, inspeccion: false, libre: true, estela: 4,
  x: [[w(15, 0), cell(0)[0]], [w(15, 2), cell(9)[0]], [w(15, 4), cell(2)[0], 'out']], y: [[w(15, 0), cell(0)[1]], [w(15, 2), cell(9)[1]], [w(15, 4), cell(2)[1], 'out']] });
E.obj('ch5', 'chispas', { t0: w(15, 4), t1: w(15, 4) + 0.8, x: cell(2)[0], y: cell(2)[1], r0: 50, r1: 140, inspeccion: false });

// ---------- cierre: las cinco monedas (ya tienen nombre), confeti, y envío ----------
// 16: Ya(0) las(1) sufrías.(2) Ahora(3) por(4) lo(5) menos(6) sabes(7) cómo(8) se(9) llaman.(10)
for (let i = 0; i < 5; i++) {
  const a = TC + 0.15 + i * 0.16;
  E.obj('c' + (i + 1), 'moneda', { t0: a, t1: w(17, 0), capa: 'pantalla', x: 540 + (i - 2) * 130, y: 960, r: 46, n: i + 1, pop: true, sfx: i === 0,
    barrido: [w(16, 7) + i * 0.12] });
}
E.obj('confC', 'confeti', { t0: w(16, 8), t1: w(16, 8) + 2.2, capa: 'pantalla', x: 540, y: 1000, dur: 2.0, n: 60, fuerza: 1000, inspeccion: false });
E.destello(w(16, 8), 0.25); E.golpe(w(16, 8), 0.05);
E.figura('yoA', { t0: w(17, 0), t1: D + 1, x: 0, cara: true, poses: [[0, 'de_pie'], [wf(17, -1) - 0.6, 'senalar']] });
E.figura('gente1', { t0: w(17, 0), t1: D + 1, x: [[w(17, 0), -460], [w(17, 0) + 1.4, -300]], color: 'gris', fondo: true, poses: [[0, 'andar'], [w(17, 0) + 1.4, 'de_pie']] });
E.figura('gente2', { t0: w(17, 0), t1: D + 1, x: [[w(17, 0), 460], [w(17, 0) + 1.4, 300]], dir: -1, color: 'gris', fondo: true, poses: [[0, 'andar'], [w(17, 0) + 1.4, 'de_pie']] });
E.obj('enviar', 'enviar', { t0: w(17, 1), t1: D + 1, x: 150, y: -560, r: 56, pop: true, vuelo: [[wf(17, -1), 0], [wf(17, -1) + 0.5, 1, 'in']] });
