// L58 · El residuo de atención (estilo B; reglas 15, 20, 21, 24)
// Idea visual: una barra de «concentración» bajo el suelo que el móvil vacía en cinco segundos y que cada regla vuelve a
// llenar; las piezas de atención se quedan pegadas al móvil. Tres reglas: el móvil vuela a otra habitación y la puerta se
// cierra; el correo, con un reloj y tres casillas que se marcan; una tarea en bloques que se terminan antes de empezar otra.
// Contador que suma: «5 s» y el año 2009. Algo que se rellena por punto: la barra de concentración, las casillas, los bloques
// y la nota que se escribe. Regla 20: «Solo es un mensaje.» va en bocadillo del muñeco mientras la voz dice «Miras el móvil».
const w = E.w, wf = E.wf;
const D = TIMING.duration;
const AM = '#e6ce46', GRIS = '#9a9c9b', ROJO = '#e4574f';
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(2, 6), gap: 70, y: 360 } });

// «La primera: // …» → T en «La», S en la primera palabra del punto
const N = [3, 5, 7].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(9, 0) - 0.1;   // resumen

E.camara([
  [0, [0, -380, 1.04]], [w(0, 4), [10, -385, 1.06]], [w(0, 7), [-15, -390, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 5), [10, -385, 1.04]],
  [w(1, 14), [20, -390, 1.06]], [w(2, 0), [0, -380, 1.02]], [w(2, 6), [10, -385, 1.04]], [N[0].T, [10, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [15, -385, 1.04]], [w(4, 6), [-10, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 0), [-15, -385, 1.04]], [w(6, 4), [15, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(8, 0), [-10, -385, 1.04]], [w(8, 6), [10, -385, 1.05]], [TC - 0.1, [0, -385, 1.04]], [TC, [0, -390, 1.05]],
]);

// poses sentadas (el muñeco no se levanta de la mesa)
const SIT = { hf: 85, kf: 85, hb: 80, kb: 80, sit: 0.27 };
const S_MIRA = Object.assign({ lean: -4, sf: 80, ef: 20, sb: -6, eb: 10, cab: -4 }, SIT);
const S_AGOBIO = Object.assign({ lean: 2, sf: 150, ef: 150, sb: 140, eb: 150, cab: -6 }, SIT);
const S_PIENSA = Object.assign({ lean: 4, sf: 20, ef: 140, sb: -6, eb: 6, cab: 10 }, SIT);
const S_TRISTE = Object.assign({ lean: 16, sf: 2, ef: 4, sb: -2, eb: 4, cab: 22 }, SIT);
const S_BIEN = Object.assign({ lean: -4, sf: 160, ef: 10, sb: 150, eb: 10, cab: -10 }, SIT);

// barra de concentración bajo el suelo (se repite en cada punto) y su rótulo
const conc = (id, o) => E.obj(id, 'relleno', Object.assign({ x: -60, y: 70, w: 380, h: 40, caja: [-190, -20, 380, 40] }, o));
const rotConc = (id, o) => E.obj(id, 'rotulo', Object.assign({ x: -60, y: 128, texto: 'CONCENTRACIÓN', size: 24, col: GRIS, caja: [-120, -13, 240, 26] }, o));

// ---------- gancho ----------
// 0: Miras(0) el(1) móvil(2) cinco(3) segundos(4) y(5) tardas(6) minutos(7) en(8) volver(9) a(10) concentrarte(11)   [bocadillo «Solo es un mensaje.»]
// trabaja en la mesa con la barra llena; el móvil vibra, lo mira 5 s y la barra se vacía; luego vuelve a subir muy despacio
E.obj('mesa0', 'escritorio', { t0: 0, t1: w(1, 0), sale: 0.2, x: -80, brillo: [[0, 1], [w(0, 1), 1], [w(0, 2), 0.2], [w(0, 6), 0.2], [w(1, 0), 0.5]], refl: true, inspeccion: false, caja: [-330, -400, 500, 400] });
E.figura('yo', { t0: 0, t1: w(1, 0), sale: 0.2, x: -360, cara: true, toca: ['mesa0'],
  poses: [[0, 'escribir'], [w(0, 0) - 0.1, 'sentado'], [w(0, 1), S_MIRA], [w(0, 5), 'sentado'], [w(0, 7), S_AGOBIO], [w(0, 9) + 0.2, 'escribir']],
  sonrisa: [[0, 0.6], [w(0, 1), 0.9], [w(0, 6), -0.4], [w(0, 7), -1.3], [w(0, 11), -0.6]] });
E.obj('movil0', 'telefono', { t0: 0, t1: w(1, 0), sale: 0.2, x: 320, y: -330, w: 130, h: 230,
  avisos: [[0, 0], [0.25, 1, 'out']], vibra: [[0, 0.9], [w(0, 1), 0.9], [w(0, 2), 0]], brillo: [[0, 0.6], [w(0, 1), 1], [w(0, 5), 1], [w(0, 6), 0.4]], caja: [-65, -115, 130, 230] });
E.sfx(0.25, 'pop');
E.obj('bocaH', 'bocadillo', { t0: w(0, 0), t1: w(0, 6), sale: 0.2, x: -110, y: -470, w: 340, h: 76, texto: 'Solo es un mensaje.', size: 30, pop: true,
  on: [[w(0, 0), 0], [w(0, 0) + 0.3, 1]], caja: [-170, -38, 340, 102] });
E.obj('seg0', 'contador', { t0: w(0, 3) - 0.1, t1: w(1, 0), sale: 0.2, x: 320, y: -150, suf: ' s', size: 58, col: 'txt', miles: false, pop: true,
  v: [[w(0, 3), 0], [w(0, 4) + 0.4, 5, 'out']], barrido: [w(0, 4) + 0.45], caja: [-80, -34, 160, 68] });
conc('conc0', { t0: 0, t1: w(1, 0), sale: 0.2, f: [[0, 1], [w(0, 3), 1], [w(0, 4) + 0.4, 0.08, 'inout'], [w(0, 7), 0.08], [w(1, 0), 0.3, 'lin']] });
rotConc('rotC0', { t0: 0, t1: w(1, 0), sale: 0.2 });
E.obj('maraña0', 'maraña', { t0: w(0, 7), t1: w(1, 0), sale: 0.2, x: -240, y: -495, r: 36, p: [[w(0, 7), 0], [w(0, 9), 1, 'out']], rot: [[w(0, 7), 0], [w(1, 0), 0.8, 'lin']], caja: [-58, -34, 116, 68] });
E.temblor(w(0, 7), 14, 0.45); E.golpe(w(0, 7), 0.05);
E.sfx(w(0, 9), 'fill');

// 1: Se(0) llama(1) residuo(2) de(3) atención(4) parte(5) de(6) tu(7) atención(8) se(9) queda(10) en(11) lo(12) que(13) acabas(14) de(15) mirar(16)
// la barra es «tu atención»: al decir «se queda», tres piezas salen de ella y se quedan pegadas al móvil
E.obj('mesa1', 'escritorio', { t0: w(1, 0), t1: w(2, 0), sale: 0.2, x: -80, brillo: 0.5, refl: true, inspeccion: false, caja: [-330, -400, 500, 400] });
E.figura('yo1', { t0: w(1, 0), t1: w(2, 0), sale: 0.2, x: -360, cara: true, toca: ['mesa1'],
  poses: [[0, 'escribir'], [w(1, 9), 'sentado'], [w(1, 13), S_PIENSA], [wf(1, -1), S_TRISTE]],
  sonrisa: [[0, -0.2], [w(1, 9), -0.6], [wf(1, -1), -1.2]] });
E.obj('rotRes', 'rotulo', { t0: w(1, 2) - 0.1, t1: w(2, 0) - 0.1, sale: 0.2, x: 0, y: -480, texto: 'RESIDUO DE ATENCIÓN', size: 34, col: AM, peso: 700, pop: true, caja: [-240, -20, 480, 40] });
E.obj('chRes', 'chispas', { t0: w(1, 4), t1: w(1, 4) + 0.8, x: 0, y: -480, r0: 120, r1: 240, inspeccion: false });
E.golpe(w(1, 4), 0.04);
E.obj('movil1', 'telefono', { t0: w(1, 0), t1: w(2, 0), sale: 0.2, x: 300, y: -280, w: 120, h: 210, avisos: 1,
  brillo: [[0, 0.4], [w(1, 14), 0.4], [w(1, 16), 1]], caja: [-60, -105, 120, 210] });
conc('conc1a', { t0: w(1, 0), t1: w(2, 0), sale: 0.2, f: [[0, 0.3], [w(1, 5), 1, 'out'], [w(1, 9), 1], [w(1, 10) + 0.3, 0.55, 'inout']] });
E.obj('rotAt', 'rotulo', { t0: w(1, 0), t1: w(2, 0), sale: 0.2, x: -60, y: 128, size: 24, col: GRIS, texto: [[0, 'CONCENTRACIÓN'], [w(1, 7), 'TU ATENCIÓN']], caja: [-120, -13, 240, 26] });
E.sfx(w(1, 5), 'fill');
[0, 1, 2].forEach(i => { const a = w(1, 10) + i * 0.12, b = a + 0.55;
  E.obj('pz' + i, 'pieza', { t0: a, t1: w(2, 0), sale: 0.2, r: 22, on: [[0, 1], [w(1, 14), 1], [w(1, 16), 0.6]], z: 2, inspeccion: false,
    x: [[a, 60], [b, 420, 'inout']], y: [[a, 70], [a + 0.3, -120, 'out'], [b, -340 + i * 60, 'in']] });
  E.sfx(b, 'pop'); });
E.obj('pulso1', 'pulso', { t0: w(1, 16), t1: w(1, 16) + 0.7, x: 300, y: -280, r0: 60, r1: 170, inspeccion: false });

// 2: Lo(0) describió(1) una(2) investigadora(3) en(4) 2009(5) Tres(6) reglas(7) para(8) trabajar(9) concentrado(10)
E.figura('yo2', { t0: w(2, 0) - 0.05, t1: fin(0), x: -360, cara: true,
  poses: [[0, 'de_pie'], [w(2, 1), 'senalar'], [w(2, 6), 'de_pie'], [w(2, 7), 'senalar'], [w(2, 10), 'celebrar']],
  sonrisa: [[0, 0], [w(2, 1), 0.6], [w(2, 6), 0.4], [w(2, 10), 1.4]] });
E.figura('inv', { t0: w(2, 2) - 0.2, t1: w(2, 6) + 0.2, sale: 0.25, x: 360, talla: 380, color: 'claro', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(2, 3), 'ofrecer'], [w(2, 5), 'senalar']], sonrisa: 0.8 });
E.obj('libro', 'papeles', { t0: w(2, 1), t1: w(2, 6), sale: 0.2, x: 30, y: -14, n: 6, k: [[w(2, 1), 0], [w(2, 5), 6, 'lin']], caja: [-95, -110, 190, 125] });
E.obj('anio', 'contador', { t0: w(2, 1), t1: w(2, 6), sale: 0.2, x: 30, y: -360, size: 120, miles: false, pop: true,
  v: [[w(2, 3), 0], [w(2, 5) + 0.45, 2009, 'out']], barrido: [w(2, 5) + 0.5], caja: [-170, -60, 340, 120] });
E.obj('chAnio', 'chispas', { t0: w(2, 5) + 0.45, t1: w(2, 5) + 1.25, x: 30, y: -360, r0: 150, r1: 250, inspeccion: false });
E.golpe(w(2, 5) + 0.45, 0.04);
// «Tres reglas para trabajar concentrado»: tres monedas y la barra se llena entera
[0, 1, 2].forEach(i => { const a = w(2, 6) + i * 0.13;
  E.obj('q' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: -60 + i * 110, y: -380, r: 36, n: i + 1, pop: true, sfx: i === 0,
    s: i === 0 ? [[0, 1], [wf(2, -1), 1], [wf(2, -1) + 0.3, 1.3, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [wf(2, -1), 1], [wf(2, -1) + 0.3, 0.4]], caja: [-36, -36, 72, 72] }); });
conc('conc2a', { t0: w(2, 0), t1: N[0].T, sale: 0.2, f: [[0, 0.55], [w(2, 9), 0.55], [wf(2, -1), 1, 'out']] });
rotConc('rotC2', { t0: w(2, 0), t1: N[0].T, sale: 0.2 });
E.sfx(w(2, 9), 'fill');
E.destello(wf(2, -1), 0.12);

// ---------- 1 · el móvil, en otra habitación ----------
// 3: La(0) primera(1) el(2) móvil(3) en(4) otra(5) habitación(6)
// 4: Bocabajo(0) en(1) la(2) mesa(3) no(4) basta(5) lo(6) sigues(7) teniendo(8) a(9) mano(10)
E.numero(1, N[0].T, N[0].S, { desde: 'q1', hacia: 'movil3' });
E.figura('yoP1', { t0: N[0].S - 0.1, t1: fin(1), x: -360, cara: true, toca: ['movil3'],
  poses: [[0, 'coger'], [w(3, 4), 'ofrecer'], [w(3, 6) + 0.2, 'celebrar'], [w(4, 0), 'de_pie'], [w(4, 1), 'senalar'], [w(4, 4), 'encoger'], [w(4, 8), 'coger'], [wf(4, -1) - 0.1, 'apartarse']],
  sonrisa: [[0, 0.3], [w(3, 6), 1.5], [w(4, 0), 0.3], [w(4, 4), -0.6], [w(4, 9), -0.9], [wf(4, -1), 0.6]] });
E.obj('puerta', 'puerta', { t0: N[0].S - 0.05, t1: fin(1), x: 300, w: 200, h: 360, pop: true, refl: true,
  p: [[w(3, 3), 0], [w(3, 4) + 0.2, 0.6, 'out'], [w(3, 6) + 0.3, 0.6], [wf(3, -1) + 0.1, 0, 'inout'], [wf(4, -1) - 0.35, 0], [wf(4, -1) - 0.15, 0.5, 'out']],
  caja: [-100, -360, 200, 360] });
E.obj('rotHab', 'rotulo', { t0: w(3, 5) - 0.1, t1: fin(1), x: 300, y: -400, texto: 'OTRA HABITACIÓN', size: 26, col: AM, pop: true, caja: [-130, -15, 260, 30] });
E.obj('movil3', 'telefono', { t0: N[0].S - 0.1, t1: wf(3, -1) - 0.1, sale: 0.15, x: [[0, -230], [w(3, 4), -230], [w(3, 6), 300, 'inout']], y: [[0, -290], [w(3, 4), -290], [w(3, 5), -380, 'out'], [w(3, 6), -170, 'in']],
  s: [[0, 1], [w(3, 4), 1], [w(3, 6), 0.55]], w: 110, h: 190, avisos: 1, vibra: [[0, 0.5], [w(3, 4), 0]], libre: true, caja: [-55, -95, 110, 190] });
E.sfx(w(3, 4), 'whoosh'); E.sfx(wf(3, -1) + 0.1, 'thud');
conc('conc3', { t0: N[0].S - 0.1, t1: fin(1), sobrevive: true, r: 60, f: [[0, 0.3], [w(3, 6), 0.3], [wf(3, -1) + 0.5, 1, 'out']], barrido: [wf(4, -1)] });
rotConc('rotC3', { t0: N[0].S - 0.1, t1: N[1].T });
E.sfx(w(3, 6), 'fill');
E.obj('ch3', 'chispas', { t0: wf(3, -1) + 0.5, t1: wf(3, -1) + 1.3, x: 120, y: 70, r0: 50, r1: 140, inspeccion: false });
E.golpe(wf(3, -1) + 0.2, 0.04);
// «Bocabajo en la mesa no basta»: el móvil de al lado, bocabajo y apagado; «a mano»: lo coge… y también va a la otra habitación
E.obj('movil4', 'telefono', { t0: w(4, 0) - 0.1, t1: wf(4, -1) + 0.1, sale: 0.1, x: [[0, -150], [wf(4, -1) - 0.4, -150], [wf(4, -1), 300, 'in']], y: [[0, -240], [wf(4, -1) - 0.4, -240], [wf(4, -1), -170, 'in']],
  rot: Math.PI / 2, w: 100, h: 170, brillo: 0, pop: true, libre: true, vibra: [[w(4, 8), 0], [w(4, 9), 1], [wf(4, -1) - 0.4, 0]], caja: [-50, -85, 100, 170] });
E.obj('rotBoca', 'rotulo', { t0: w(4, 0) - 0.1, t1: w(4, 4), sale: 0.1, x: -150, y: -370, texto: 'BOCABAJO', size: 26, col: GRIS, pop: true, caja: [-90, -15, 180, 30] });
E.obj('rotNoB', 'rotulo', { t0: w(4, 4), t1: wf(4, -1), sale: 0.2, x: -150, y: -370, texto: 'NO BASTA', size: 30, col: ROJO, peso: 700, pop: true, caja: [-90, -17, 180, 34] });
E.temblor(w(4, 4), 10, 0.35);
E.obj('rotMano', 'rotulo', { t0: w(4, 9) - 0.05, t1: wf(4, -1), sale: 0.2, x: -150, y: -310, texto: 'A MANO', size: 24, col: GRIS, pop: true, caja: [-70, -14, 140, 28] });
E.sfx(wf(4, -1) - 0.4, 'whoosh');

// ---------- 2 · el correo, a horas fijas ----------
// 5: La(0) segunda(1) el(2) correo(3) a(4) horas(5) fijas(6)
// 6: Tres(0) veces(1) al(2) día(3) El(4) resto(5) del(6) tiempo(7) cerrado(8)
E.numero(2, N[1].T, N[1].S, { desde: 'conc3', hacia: 'reloj5' });
E.obj('mesa5', 'escritorio', { t0: N[1].S - 0.1, t1: fin(2), x: -80, refl: true, inspeccion: false, caja: [-330, -400, 500, 400],
  brillo: [[0, 0.3], [w(5, 2), 0.3], [w(5, 3), 1], [w(6, 4), 1], [wf(6, -1), 0, 'inout']] });
E.figura('yoP2', { t0: N[1].S - 0.1, t1: fin(2), x: -360, cara: true, toca: ['mesa5'],
  poses: [[0, 'sentado'], [w(5, 3), 'escribir'], [w(5, 5), 'sentado'], [w(6, 0), 'escribir'], [w(6, 4), 'sentado'], [wf(6, -1), S_BIEN]],
  sonrisa: [[0, 0.3], [w(5, 5), 0.8], [wf(6, -1), 1.4]] });
E.obj('arroba', 'pieza', { t0: w(5, 2) - 0.1, t1: fin(2), sale: 0.2, x: 175, y: -345, r: 34, texto: '@', pop: true,
  on: [[0, 1], [w(6, 4), 1], [wf(6, -1), 0.15, 'inout']], caja: [-34, -34, 68, 68] });
E.obj('reloj5', 'relojAm', { t0: N[1].S - 0.1, t1: fin(2), x: 330, y: -350, r: 85, texto: '', pop: true,
  p: [[w(5, 4), 0], [wf(5, -1) + 0.3, 1, 'inout'], [w(6, 0), 0], [w(6, 3) + 0.3, 1, 'lin']], caja: [-85, -85, 170, 170] });
E.obj('rotHF', 'rotulo', { t0: w(5, 5) - 0.1, t1: fin(2), x: 300, y: -475, size: 26, col: AM, pop: true,
  texto: [[0, 'HORAS FIJAS'], [w(6, 0), 'TRES VECES AL DÍA'], [w(6, 5), 'EL RESTO, CERRADO']], caja: [-160, -15, 320, 30] });
E.obj('veces', 'lista', { t0: w(6, 0) - 0.15, t1: fin(2), sale: 0.2, x: 330, y: -160, n: 3, w: 240, gap: 52, pop: true,
  p: [[w(6, 0), 0], [w(6, 3) + 0.3, 3, 'lin']], brillo: [[w(6, 0), 0], [w(6, 3) + 0.3, 3, 'lin']], caja: [-120, -70, 240, 140] });
E.sfx(w(6, 0), 'fill');
conc('conc5', { t0: N[1].S - 0.1, t1: fin(2), sobrevive: true, r: 60, f: [[0, 0.3], [w(6, 4), 0.3], [wf(6, -1) + 0.3, 1, 'out']], barrido: [wf(6, -1) + 0.35] });
rotConc('rotC5', { t0: N[1].S - 0.1, t1: N[2].T });
E.sfx(w(6, 4), 'fill');
E.obj('ch5', 'chispas', { t0: wf(6, -1) + 0.3, t1: wf(6, -1) + 1.1, x: 120, y: 70, r0: 50, r1: 140, inspeccion: false });
E.golpe(wf(6, -1), 0.04);

// ---------- 3 · termina una cosa antes de empezar otra ----------
// 7: La(0) tercera(1) termina(2) una(3) cosa(4) antes(5) de(6) empezar(7) otra(8)
// 8: Si(0) no(1) puedes(2) antes(3) de(4) cambiar(5) de(6) tarea(7) apunta(8) por(9) dónde(10) ibas(11)
E.numero(3, N[2].T, N[2].S, { desde: 'conc5', hacia: 'tarea' });
E.figura('yoP3', { t0: N[2].S - 0.1, t1: TC, x: -360, cara: true,
  poses: [[0, 'de_pie'], [w(7, 2), 'senalar'], [w(7, 5) + 0.3, 'celebrar'], [w(7, 7), 'de_pie'], [w(7, 8), 'senalar'], [w(8, 0), 'encoger'], [w(8, 5), 'pensar'], [w(8, 8), 'coger'], [wf(8, -1), 'celebrar']],
  sonrisa: [[0, 0.3], [w(7, 5), 1.5], [w(8, 0), -0.5], [w(8, 8), 0.4], [wf(8, -1), 1.4]] });
E.obj('rotCosa', 'rotulo', { t0: w(7, 3) - 0.1, t1: TC, x: 130, y: -430, size: 26, col: AM, pop: true, texto: [[0, 'UNA COSA'], [w(8, 5), 'CAMBIAR DE TAREA']], caja: [-160, -15, 320, 30] });
E.obj('tarea', 'bloques', { t0: N[2].S - 0.1, t1: TC, x: 130, y: -320, n: 4, w: 380, h: 90, pop: true,
  parte: [[w(7, 2), 0], [w(7, 3), 1, 'out']], hechos: [[w(7, 3), 0], [w(7, 5) + 0.2, 4, 'lin'], [w(8, 0), 4], [w(8, 2), 2, 'inout']], caja: [-190, -55, 380, 110] });
E.sfx(w(7, 3), 'fill');
E.obj('chT', 'chispas', { t0: w(7, 5) + 0.2, t1: w(7, 5) + 1.0, x: 130, y: -320, r0: 120, r1: 230, inspeccion: false });
E.golpe(w(7, 5) + 0.2, 0.04);
E.obj('otra', 'bloques', { t0: w(7, 8) - 0.1, t1: TC, x: 130, y: -180, n: 1, w: 380, h: 64, texto: 'OTRA', pop: true,
  s: [[0, 1], [w(8, 5), 1], [w(8, 5) + 0.15, 1.08], [w(8, 5) + 0.35, 1]], caja: [-190, -38, 380, 76] });
// «apunta por dónde ibas»: la nota se escribe (barra con cursor)
E.obj('nota', 'relleno', { t0: w(8, 8) - 0.1, t1: TC, x: 130, y: -60, w: 380, h: 40, pop: true, rotulo: 'POR DÓNDE IBAS', cursor: 1,
  f: [[w(8, 8), 0], [wf(8, -1), 1, 'lin']], caja: [-190, -54, 380, 74] });
E.sfx(w(8, 8), 'fill');
conc('conc7', { t0: N[2].S - 0.1, t1: TC, f: [[0, 0.3], [w(7, 4), 0.3], [w(7, 5) + 0.5, 1, 'out']], barrido: [wf(8, -1)] });
rotConc('rotC7', { t0: N[2].S - 0.1, t1: TC });
E.obj('ch7', 'chispas', { t0: wf(8, -1), t1: wf(8, -1) + 0.8, x: 130, y: -60, r0: 80, r1: 200, inspeccion: false });
E.destello(wf(8, -1), 0.12);

// ---------- cierre: resumen y envío ----------
// 9: No(0) te(1) falta(2) tiempo(3) te(4) sobran(5) interrupciones(6)
// 10: Mándaselo(0) a(1) ese(2) compañero(3) que(4) trabaja(5) con(6) veinte(7) pestañas(8) abiertas(9)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(9, 5), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, items: ['Móvil fuera', 'Correo fijo', 'Una cosa'], gap: 270,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(9, 5)], caja: [-400, -60, 800, 200] });
E.obj('confC', 'confeti', { t0: w(9, 6), t1: w(9, 6) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(w(9, 6), 0.22); E.golpe(w(9, 6), 0.04);
E.figura('yoF', { t0: w(10, 0), t1: D + 1, x: -330, cara: true, poses: [[0, 'de_pie'], [w(10, 1), 'senalar'], [w(10, 7), 'manos_cabeza']], sonrisa: [[0, 0.8], [w(10, 7), -0.3]] });
E.obj('pest', 'pestanas', { t0: w(10, 3) - 0.1, t1: D + 1, x: 140, y: -60, w: 380, h: 230, max: 20, pop: true,
  n: [[w(10, 3), 3], [w(10, 7) + 0.4, 20, 'out']], caja: [-190, -230, 380, 270] });
E.obj('enviar', 'enviar', { t0: w(10, 1), t1: D + 1, x: 140, y: -420, r: 60, pop: true, barrido: [w(10, 9)], vuelo: [[wf(10, -1), 0], [wf(10, -1) + 0.5, 1, 'in']] });
