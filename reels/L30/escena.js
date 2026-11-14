// L30 · El efecto Zeigarnik (estilo B; reglas 15, 20, 21, 24)
// Gancho visual: una tarea terminada que se apaga y otra a medias (30 %) que brilla y late.
// Historia: 1927 que rueda, la psicóloga observa, el camarero de Berlín con libreta: cuentas cobradas que se apagan y sin cobrar que brillan.
// Regla 20: «¿Por dónde iba?» va en bocadillo del muñeco (línea 7); la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(2, 14), gap: 70, y: 360 } });

// «La primera: // …» → T en «La», S en la primera palabra del punto
const N = [3, 5, 7].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(9, 0) - 0.1;

E.camara([
  [0, [0, -380, 1.04]], [w(0, 6), [0, -385, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 12), [-20, -390, 1.05]], [w(2, 0), [0, -380, 1.02]],
  [w(2, 14), [0, -390, 1.05]], [N[0].T, [20, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [0, -385, 1.05]], [w(4, 13), [-20, -385, 1.03]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 0), [20, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(8, 0), [0, -385, 1.04]], [w(8, 10), [20, -390, 1.06]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Te(0) acuerdas(1) mejor(2) de(3) lo(4) que(5) dejas(6) a(7) medias(8)
E.figura('yo', { t0: 0, t1: w(1, 0) + 0.2, sale: 0.2, x: -340, cara: true,
  poses: [[0, 'pensar'], [w(0, 6), 'senalar']],
  sonrisa: [[0, 0.2], [w(0, 6), 1]] });
E.obj('hecha0', 'relleno', { t0: 0, t1: w(1, 0) - 0.05, sale: 0.2, x: 120, y: -450, w: 340, h: 46, f: 1, rotulo: 'TERMINADO',
  luz: [[0, 1], [w(0, 3), 1], [w(0, 6), 0.3]], caja: [-170, -60, 340, 85] });
E.obj('medias0', 'relleno', { t0: 0, t1: w(1, 0) - 0.05, sale: 0.2, x: 120, y: -280, w: 340, h: 46, rotulo: 'A MEDIAS', pct: true,
  f: [[0, 0], [w(0, 6), 0.3, 'out']], barrido: [w(0, 8)], caja: [-170, -60, 470, 85] });
[w(0, 7), w(0, 8) + 0.4].forEach((a, i) => E.obj('lat0_' + i, 'pulso', { t0: a, t1: a + 0.6, x: 60, y: -280, r0: 60, r1: 200, inspeccion: false }));
E.sfx(w(0, 3), 'fill');

// ---------- la historia: 1927, Bluma Zeigarnik, el camarero de Berlín ----------
// 1: En(0) 1927(1) la(2) psicóloga(3) Bluma(4) Zeigarnik(5) lo(6) comprobó(7) al(8) fijarse(9) en(10) un(11) camarero(12) de(13) Berlín(14)
//    que(15) solo(16) se(17) acordaba(18) de(19) las(20) cuentas(21) sin(22) cobrar(23)
E.obj('anio', 'contador', { t0: w(1, 0) + 0.05, t1: w(2, 0), sale: 0.2, x: 150, y: -490, v: [[w(1, 0), 1900], [w(1, 1) + 0.4, 1927, 'out']], size: 76, col: '#e6ce46', miles: false, pop: true,
  barrido: [w(1, 2)], caja: [-120, -44, 240, 88] });
E.obj('rotZ', 'rotulo', { t0: w(1, 4) - 0.1, t1: w(1, 12), sale: 0.2, x: 150, y: -420, texto: 'BLUMA ZEIGARNIK', size: 28, col: '#c9ccca', pop: true, caja: [-150, -17, 300, 34] });
E.obj('rotB', 'rotulo', { t0: w(1, 13), t1: w(2, 0), sale: 0.2, x: 150, y: -420, texto: 'BERLÍN', size: 28, col: '#c9ccca', pop: true, caja: [-70, -17, 140, 34] });
E.figura('bluma', { t0: w(1, 2) - 0.1, t1: w(2, 0), sale: 0.2, x: -420, talla: 460, color: 'gris',
  poses: [[0, 'de_pie'], [w(1, 4), 'pensar'], [w(1, 7), 'senalar'], [w(1, 12), 'pensar']] });
E.figura('camarero', { t0: w(1, 11) - 0.1, t1: w(2, 0), sale: 0.2, x: -170, cara: true, toca: ['libreta'],
  poses: [[0, 'de_pie'], [w(1, 13), 'ofrecer'], [w(1, 18), 'pensar'], [w(1, 21), 'senalar']],
  sonrisa: [[w(1, 12), 0.6], [w(1, 21), 1.2]] });
E.obj('libreta', 'lista', { t0: w(1, 12), t1: w(2, 0), sale: 0.2, x: -70, y: -250, n: 3, w: 130, gap: 34, pop: true,
  brillo: [[w(1, 13), 0], [w(1, 16), 3, 'lin']], caja: [-65, -50, 130, 100] });
// cuentas: las cobradas (1 y 3) se apagan, las que no ha cobrado brillan
const CU = [80, 150, 220, 290, 360];
CU.forEach((x, i) => { const a = w(1, 13) + i * 0.1, cobrada = i === 1 || i === 3;
  E.obj('cu' + i, 'pieza', { t0: a, t1: w(2, 0), sale: 0.2, entra: 0.15, x, y: -320, r: 28, texto: '€', pop: true, sfx: i === 0, inspeccion: false,
    on: cobrada ? [[0, 1], [w(1, 16), 1], [w(1, 18), 0, 'out']] : 1,
    luz: cobrada ? [[0, 1], [w(1, 16), 1], [w(1, 18), 0.35]] : 1,
    s: cobrada ? 1 : [[0, 1], [w(1, 21), 1], [w(1, 21) + 0.3, 1.2, 'back']], barrido: cobrada ? null : [w(1, 22)] }); });
E.obj('sinCobrar', 'contador', { t0: w(1, 19), t1: w(2, 0), sale: 0.2, x: 220, y: -220, v: [[w(1, 20), 0], [wf(1, -1), 3, 'out']], suf: ' sin cobrar', size: 44, col: 'txt', miles: false, pop: true,
  caja: [-160, -26, 320, 52] });
E.obj('chCu', 'chispas', { t0: wf(1, -1), t1: wf(1, -1) + 0.8, x: 220, y: -320, r0: 120, r1: 220, inspeccion: false });

// ---------- el efecto: a medias se recuerda el doble ----------
// 2: Se(0) llama(1) efecto(2) Zeigarnik(3) lo(4) que(5) dejas(6) a(7) medias(8) te(9) sigue(10) llamando(11) y(12) eso(13) sirve(14) para(15) no(16) dejar(17) las(18) cosas(19) para(20) luego(21)
E.figura('yo2', { t0: w(2, 0) - 0.1, t1: fin(0), x: -380, cara: true,
  poses: [[0, 'de_pie'], [w(2, 2), 'senalar'], [w(2, 10), 'manos_cabeza'], [w(2, 14), 'ofrecer'], [w(2, 19), 'senalar']],
  sonrisa: [[w(2, 2), 0.6], [w(2, 10), -0.4], [w(2, 14), 1.2]] });
E.obj('rotEf', 'rotulo', { t0: w(2, 1), t1: w(2, 13), sale: 0.2, x: 100, y: -490, texto: 'EFECTO ZEIGARNIK', size: 34, col: '#e6ce46', pop: true, barrido: [w(2, 3)], caja: [-190, -20, 380, 40] });
E.obj('term2', 'relleno', { t0: w(2, 3), t1: w(2, 13), sale: 0.2, x: 40, y: -370, w: 340, h: 46, rotulo: 'TERMINADAS', f: [[w(2, 4), 0], [w(2, 8), 0.45, 'out']],
  luz: 0.6, caja: [-170, -60, 340, 85] });
E.obj('med2', 'relleno', { t0: w(2, 4), t1: w(2, 13), sale: 0.2, x: 40, y: -240, w: 340, h: 46, rotulo: 'A MEDIAS', f: [[w(2, 5), 0], [w(2, 11), 0.9, 'inout']],
  barrido: [w(2, 11)], caja: [-170, -60, 340, 85] });
E.obj('doble', 'contador', { t0: w(2, 8), t1: w(2, 13), sale: 0.2, x: 310, y: -245, v: [[w(2, 9), 1], [w(2, 11), 2, 'out']], pre: '×', size: 70, col: '#e6ce46', miles: false, pop: true,
  caja: [-70, -42, 140, 84] });
[w(2, 10), w(2, 11), w(2, 12)].forEach((a, i) => E.obj('lat2_' + i, 'pulso', { t0: a, t1: a + 0.6, x: 40, y: -240, r0: 80, r1: 220, inspeccion: false }));
E.sfx(w(2, 4), 'fill'); E.sfx(w(2, 5), 'fill');
E.obj('ch2a', 'chispas', { t0: w(2, 11), t1: w(2, 11) + 0.8, x: 310, y: -245, r0: 60, r1: 150, inspeccion: false });
// «sirve para no dejar las cosas para luego»: tres monedas; la primera se queda y abre el primer punto
[0, 1, 2].forEach(i => { const a = w(2, 14) + i * 0.12;
  E.obj('reg' + i, 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: 100 + (i - 1) * 110, y: -330, r: 38, n: i + 1, pop: true, sfx: i === 0, inspeccion: false,
    luz: [[0, 1], [w(2, 19), 1], [w(2, 19) + 0.3, i === 0 ? 1 : 0.35]], s: i === 0 ? [[0, 1], [w(2, 19), 1], [w(2, 19) + 0.35, 1.3, 'back']] : 1, barrido: i === 0 ? [w(2, 20)] : null }); });
E.obj('rayosH', 'rayos', { t0: w(2, 14), t1: fin(0), x: 100, y: -330, r: 360, z: -2, p: [[w(2, 14), 0], [w(2, 17), 0.9, 'out']], inspeccion: false });

// ---------- 1 · empieza, aunque sean dos minutos ----------
// 3: La(0) primera(1) empieza(2) aunque(3) sean(4) dos(5) minutos(6)
// 4: En(0) cuanto(1) empiezas(2) la(3) tarea(4) se(5) te(6) queda(7) rondando(8) por(9) la(10) cabeza(11) y(12) te(13) pide(14) volver(15)
E.numero(1, N[0].T, N[0].S, { desde: 'reg0', hacia: 'tempo' });
E.figura('yo3', { t0: N[0].S - 0.1, t1: fin(1), cara: true,
  x: [[0, -380], [w(4, 13), -380], [wf(4, -1) + 0.1, -290, 'inout']],
  poses: [[0, 'de_pie'], [w(3, 2), 'senalar'], [w(4, 0), 'ofrecer'], [w(4, 7), 'pensar'], [w(4, 12), 'apartarse'], [w(4, 14), 'andar'], [wf(4, -1) + 0.1, 'ofrecer']],
  sonrisa: [[w(3, 2), 0.8], [w(4, 7), 0], [w(4, 12), -0.6], [wf(4, -1), 1.2]] });
E.obj('tempo', 'temporizador', { t0: N[0].S - 0.1, t1: w(4, 3), sale: 0.25, x: 130, y: -420, r: 85, texto: '2', sub: 'MIN',
  p: [[N[0].S, 0], [wf(3, -1) + 0.3, 1, 'lin']], hecho: [[wf(3, -1) + 0.3, 0], [wf(3, -1) + 0.6, 1]], caja: [-100, -100, 200, 200] });
E.obj('inf1', 'relleno', { t0: w(3, 2), t1: fin(1), x: [[0, 80], [w(4, 3), 80], [w(4, 6), 120, 'inout']], y: [[0, -200], [w(4, 3), -200], [w(4, 6), -380, 'inout']],
  w: 340, h: 50, rotulo: 'INFORME', pct: true, sobrevive: true, r: 60,
  f: [[w(3, 3), 0], [wf(3, -1) + 0.3, 0.3, 'out']], barrido: [w(4, 14)], caja: [-170, -62, 470, 90] });
E.sfx(w(3, 3), 'fill');
// «rondando por la cabeza»: un anillo que da vueltas alrededor de la cabeza
E.obj('ronda', 'arcoAbierto', { t0: w(4, 7), t1: w(4, 13), sale: 0.2, x: -385, y: -445, r: 78, w: 5, inspeccion: false,
  p: [[w(4, 7), 0], [w(4, 11), 0.85, 'inout']], rot: [[w(4, 7), 0], [w(4, 13), 9, 'lin']] });
// «te pide volver»: la tarea a medias tira del muñeco
E.obj('tira', 'flecha', { t0: w(4, 13) - 0.1, t1: fin(1), de: [-250, -300], hasta: [-90, -370], curva: 0.2, discontinua: true, p: [[w(4, 13), 0], [w(4, 15), 1, 'out']], inspeccion: false });
[w(4, 8), w(4, 11), w(4, 14)].forEach((a, i) => E.obj('lat4_' + i, 'pulso', { t0: a, t1: a + 0.6, x: 120, y: -380, r0: 80, r1: 220, inspeccion: false }));

// ---------- 2 · cuando pares por hoy, deja empezado lo siguiente ----------
// 5: La(0) segunda(1) cuando(2) pares(3) por(4) hoy(5) deja(6) empezado(7) lo(8) siguiente(9)
// 6: Al(0) día(1) siguiente(2) no(3) empiezas(4) de(5) cero(6) sigues(7) por(8) donde(9) lo(10) dejaste(11)
E.numero(2, N[1].T, N[1].S, { desde: 'inf1', hacia: 'bar2' });
E.figura('yo5', { t0: N[1].S - 0.1, t1: fin(2), x: -390, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'senalar'], [w(5, 3), 'apartarse'], [w(5, 6), 'ofrecer'], [w(6, 0), 'de_pie'], [w(6, 3), 'encoger'], [w(6, 7), 'senalar'], [wf(6, -1), 'celebrar']],
  sonrisa: [[w(5, 2), 0.5], [w(5, 6), 1], [w(6, 3), 0.2], [wf(6, -1), 1.5]] });
E.obj('bar2', 'barra', { t0: N[1].S - 0.1, t1: fin(2), x: 120, y: -330, w: 500, h: 52, pop: true, sobrevive: true, r: 60,
  f: [[N[1].S, 0], [w(5, 3), 0.33, 'out'], [w(5, 6), 0.33], [w(5, 8), 0.43, 'out'], [w(6, 7), 0.43], [wf(6, -1), 0.72, 'inout']],
  marca: 0.33, rotMarca: 'HOY', marcas: [[0.165, 'PARTE 1'], [0.5, 'PARTE 2'], [0.835, 'PARTE 3']], barrido: [w(5, 8), wf(6, -1)], caja: [-250, -110, 500, 180] });
E.obj('pct2', 'contador', { t0: N[1].S, t1: fin(2), x: 120, y: -490, v: [[N[1].S, 0], [w(5, 3), 33, 'out'], [w(5, 6), 33], [w(5, 8), 43, 'out'], [w(6, 7), 43], [wf(6, -1), 72, 'inout']],
  suf: ' %', size: 56, col: 'txt', miles: false, pop: true, caja: [-90, -34, 180, 68] });
E.obj('dias2', 'dias', { t0: w(5, 4), t1: fin(2), x: 120, y: -150, letras: ['L', 'M', 'X'], gap: 86, pop: true,
  luz: [[w(5, 4), -1], [w(5, 5), 0, 'out'], [w(6, 0), 0], [w(6, 2), 1, 'inout']], caja: [-130, -32, 260, 64] });
E.sfx(w(5, 3), 'fill'); E.sfx(w(5, 7), 'fill'); E.sfx(w(6, 7), 'fill');
E.golpe(w(5, 3), 0.03);
E.obj('ch5', 'chispas', { t0: w(5, 8), t1: w(5, 8) + 0.8, x: -14, y: -330, r0: 40, r1: 120, inspeccion: false });
E.obj('ch6', 'chispas', { t0: wf(6, -1), t1: wf(6, -1) + 0.8, x: 120, y: -330, r0: 140, r1: 260, inspeccion: false });

// ---------- 3 · antes de dejarlo, apunta qué te toca hacer después ----------
// 7: La(0) tercera(1) antes(2) de(3) dejarlo(4) apunta(5) qué(6) te(7) toca(8) hacer(9) después(10)   [bocadillo «¿Por dónde iba?»]
// 8: Recuerdas(0) que(1) está(2) a(3) medias(4) pero(5) no(6) por(7) dónde(8) ibas(9) Así(10) al(11) volver(12) no(13) pierdes(14) ni(15) un(16) minuto(17) haciendo(18) memoria(19)
E.numero(3, N[2].T, N[2].S, { desde: 'bar2', hacia: 'nota' });
E.figura('yo7', { t0: N[2].S - 0.1, t1: TC, x: -380, cara: true, toca: ['nota'],
  poses: [[0, 'de_pie'], [w(7, 2), 'pensar'], [w(7, 5), 'coger'], [w(8, 0), 'de_pie'], [w(8, 5), 'encoger'], [w(8, 10), 'senalar'], [w(8, 17), 'celebrar']],
  sonrisa: [[w(7, 2), -0.4], [w(7, 5), 0.6], [w(8, 5), 0], [w(8, 10), 0.8], [w(8, 17), 1.5]] });
E.obj('iba', 'bocadillo', { t0: w(7, 2) - 0.1, t1: w(7, 5) + 0.3, sale: 0.2, x: -120, y: -480, w: 290, h: 76, texto: '¿Por dónde iba?', size: 30, pop: true, caja: [-145, -38, 290, 102] });
E.obj('nota', 'lista', { t0: N[2].S - 0.1, t1: w(8, 13), sale: 0.25, x: 165, y: -380, n: 3, w: 320, gap: 62, sobrevive: false,
  brillo: [[w(7, 5), 0], [wf(7, -1), 3, 'lin']], p: [[w(8, 10), 0], [w(8, 11) + 0.2, 1, 'out']], barrido: [w(8, 9)], caja: [-160, -100, 320, 200] });
E.obj('rotNota', 'rotulo', { t0: w(7, 5), t1: w(8, 13), sale: 0.25, x: 165, y: -515, texto: 'SIGUIENTE PASO', size: 28, col: '#e6ce46', pop: true, caja: [-130, -17, 260, 34] });
E.obj('med8', 'relleno', { t0: w(8, 0) - 0.1, t1: TC, x: 80, y: -170, w: 340, h: 46, rotulo: 'A MEDIAS', pct: true,
  f: [[w(8, 0), 0], [w(8, 4), 0.5, 'out'], [w(8, 12), 0.5], [wf(8, -1), 0.8, 'inout']], caja: [-170, -60, 470, 85] });
E.obj('cero8', 'temporizador', { t0: w(8, 13), t1: TC, x: 130, y: -400, r: 85, texto: '0', sub: 'MIN', pop: true,
  p: [[w(8, 13), 0], [w(8, 17), 1, 'out']], hecho: [[w(8, 17), 0], [w(8, 17) + 0.35, 1]], barrido: [wf(8, -1)], caja: [-100, -100, 200, 200] });
E.sfx(w(7, 5), 'fill'); E.sfx(w(8, 0), 'fill'); E.sfx(w(8, 12), 'fill');
E.temblor(w(8, 6), 8, 0.35);
E.obj('ch8', 'chispas', { t0: w(8, 17), t1: w(8, 17) + 0.8, x: 130, y: -400, r0: 110, r1: 220, inspeccion: false });
E.golpe(w(8, 17), 0.04); E.destello(w(8, 17), 0.12);

// ---------- cierre: resumen y envío ----------
// 9: Lo(0) que(1) dejas(2) a(3) medias(4) no(5) se(6) te(7) va(8) de(9) la(10) cabeza(11)
// 10: Mándaselo(0) a(1) ese(2) amigo(3) que(4) lleva(5) semanas(6) diciendo(7) el(8) lunes(9) empiezo(10)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(9, 6), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, items: ['Empieza', 'Lo siguiente', 'Apúntalo'], gap: 260,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(9, 10)], caja: [-390, -60, 780, 200] });
E.obj('confC', 'confeti', { t0: wf(9, -1), t1: wf(9, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(9, -1), 0.22); E.golpe(wf(9, -1), 0.04);
E.figura('yoF', { t0: w(10, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(10, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(10, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(10, 9)], vuelo: [[wf(10, -1), 0], [wf(10, -1) + 0.5, 1, 'in']] });
