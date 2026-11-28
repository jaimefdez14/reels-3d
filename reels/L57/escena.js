// L57 · La navaja de Hanlon (estilo B; reglas 15, 20, 21, 24)
// Idea visual: el muñeco espera con el móvil una respuesta que no llega mientras el compañero (gris) está enterrado en
// papeles; en vez de enfadarse, pasa tres preguntas. Una balanza de dos barras (mala fe que se vacía, descuido que se
// llena) da el concepto; el año 1980 rueda. Puntos: correo sin leer frente a «te quiere mal» (barras), la semana que se
// enciende hasta «para hoy» mientras el compañero tacha sus tareas, y una llamada de dos minutos (temporizador que se
// completa) que borra la semana de malas caras.
// Regla 20: «Lo hace para fastidiarme.» va en bocadillo del muñeco mientras la voz dice «das por hecho»; la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(3, 0), gap: 70, y: 360 } });

// «La primera: // …» → T en «La», S en la primera palabra del punto
const N = [4, 6, 8].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(10, 0) - 0.1;   // resumen
const AM = '#e6ce46';
const ROJO = '#e4574f';
const GRIS = '#9a9c9b';

E.camara([
  [0, [0, -380, 1.04]], [w(0, 5), [15, -385, 1.07]], [w(0, 14), [-10, -390, 1.06]], [w(1, 0), [0, -380, 1.02]], [w(1, 7), [10, -385, 1.05]],
  [w(1, 16), [-10, -390, 1.07]], [w(2, 0), [0, -380, 1.02]], [w(2, 9), [10, -385, 1.05]], [w(3, 0), [0, -380, 1.02]], [N[0].T, [15, -390, 1.05]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(5, 0), [-15, -385, 1.04]], [w(5, 8), [10, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(7, 0), [-15, -385, 1.04]], [w(7, 6), [10, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(9, 0), [-10, -385, 1.04]], [w(9, 6), [10, -385, 1.05]], [TC - 0.1, [0, -385, 1.04]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Tu(0) compañero(1) no(2) te(3) contesta(4) y(5) ya(6) das(7) por(8) hecho(9) que(10) lo(11) hace(12) a(13) propósito(14)   [bocadillo «Lo hace para fastidiarme.»]
// el muñeco mira el móvil (que se apaga: no hay respuesta); el compañero, al fondo, enterrado en papeles
E.figura('yo', { t0: 0, t1: w(1, 0), sale: 0.25, x: -330, talla: 340, cara: true,
  poses: [[0, 'coger'], [w(0, 2), 'coger'], [w(0, 4), 'encoger'], [w(0, 7), 'pensar'], [w(0, 12), 'manos_cabeza']],
  sonrisa: [[0, 0.5], [w(0, 2), 0], [w(0, 4), -0.6], [w(0, 9), -1.2], [w(0, 14), -1.6]] });
E.obj('tel0', 'telefono', { t0: 0, t1: w(1, 0), sale: 0.25, x: -150, y: -190, w: 120, h: 200,
  brillo: [[0, 1], [w(0, 2), 1], [w(0, 4) + 0.3, 0.15, 'out']], vibra: [[0, 0.6], [0.5, 0]], caja: [-60, -100, 120, 200] });
E.obj('pulsoT', 'pulso', { t0: w(0, 4), t1: w(0, 4) + 0.6, x: -150, y: -190, r0: 40, r1: 130, inspeccion: false });
E.sfx(w(0, 4), 'thud');
E.figura('comp0', { t0: 0, t1: w(1, 0), sale: 0.25, x: 400, talla: 340, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'coger'], [w(0, 6), 'meter'], [w(0, 11), 'coger']], sonrisa: 0.2 });
E.obj('papeles0', 'papeles', { t0: 0, t1: w(1, 0), sale: 0.25, x: 230, y: -14, n: 7, k: [[0, 2], [w(0, 14), 7, 'lin']], caja: [-95, -125, 190, 140] });
E.obj('bocaG', 'bocadillo', { t0: w(0, 6), t1: w(1, 0) - 0.1, sale: 0.2, x: -190, y: -440, w: 440, h: 72, texto: 'Lo hace para fastidiarme.', size: 30, pop: true,
  on: [[w(0, 6), 0], [w(0, 7) + 0.3, 1]], caja: [-220, -36, 440, 98] });
E.obj('propos', 'rotulo', { t0: w(0, 13) - 0.05, t1: w(1, 0), sale: 0.2, x: 160, y: -300, texto: 'A PROPÓSITO', size: 32, col: ROJO, peso: 700, pop: true, caja: [-120, -18, 240, 36] });
E.temblor(w(0, 14), 14, 0.45); E.golpe(w(0, 14), 0.05);

// 1: Hay(0) una(1) regla(2) la(3) navaja(4) de(5) Hanlon(6) no(7) atribuyas(8) a(9) la(10) mala(11) fe(12) lo(13) que(14) se(15) explica(16) por(17) un(18) descuido(19)
// el nombre entra con golpe; la barra de «mala fe» se llena y se vacía; la de «descuido» se llena entera
E.figura('yo1', { t0: w(1, 0) - 0.05, t1: w(2, 0), sale: 0.25, x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(1, 2), 'senalar'], [w(1, 7), 'apartarse'], [w(1, 13), 'pensar'], [w(1, 17), 'ofrecer'], [wf(1, -1), 'celebrar']],
  sonrisa: [[0, 0], [w(1, 2), 0.6], [w(1, 7), -0.4], [w(1, 13), 0.3], [wf(1, -1), 1.5]] });
E.obj('rotHanlon', 'rotulo', { t0: w(1, 1) - 0.1, t1: w(2, 0), sale: 0.25, x: 120, y: -470, texto: 'NAVAJA DE HANLON', size: 34, col: AM, peso: 700, pop: true, caja: [-210, -20, 420, 40] });
E.obj('chHanlon', 'chispas', { t0: w(1, 6), t1: w(1, 6) + 0.8, x: 120, y: -470, r0: 120, r1: 240, inspeccion: false });
E.golpe(w(1, 6), 0.04);
E.obj('barMala', 'relleno', { t0: w(1, 7) - 0.1, t1: w(2, 0), sale: 0.25, x: 120, y: -330, w: 360, h: 44, pop: true, rotulo: 'MALA FE',
  f: [[w(1, 9), 0], [w(1, 12), 0.85, 'out'], [w(1, 13), 0.85], [w(1, 16), 0.1, 'inout']], caja: [-180, -56, 360, 78] });
E.sfx(w(1, 9), 'fill');
E.obj('noMala', 'rotulo', { t0: w(1, 7), t1: w(1, 13) + 0.2, sale: 0.2, x: 120, y: -250, texto: 'NO', size: 30, col: ROJO, peso: 700, pop: true, caja: [-30, -18, 60, 36] });
E.temblor(w(1, 8), 8, 0.3);
E.obj('barDesc', 'relleno', { t0: w(1, 13), t1: w(2, 0), sale: 0.25, x: 120, y: -170, w: 360, h: 44, pop: true, rotulo: 'DESCUIDO',
  f: [[w(1, 15), 0], [wf(1, -1) + 0.2, 0.95, 'out']], caja: [-180, -56, 360, 78] });
E.sfx(w(1, 15), 'fill');
E.obj('chDesc', 'chispas', { t0: wf(1, -1) + 0.2, t1: wf(1, -1) + 1.0, x: 120, y: -170, r0: 100, r1: 210, inspeccion: false });
E.destello(wf(1, -1) + 0.2, 0.1);

// 2: Se(0) publicó(1) en(2) 1980(3) en(4) un(5) libro(6) de(7) humor(8) y(9) sirve(10) para(11) cualquier(12) oficina(13)
E.figura('yo2', { t0: w(2, 0) - 0.05, t1: w(3, 0), sale: 0.25, x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(2, 1), 'senalar'], [w(2, 6), 'celebrar'], [w(2, 9), 'de_pie'], [w(2, 11), 'ofrecer']],
  sonrisa: [[0, 0.3], [w(2, 1), 0.6], [w(2, 6), 1.5], [w(2, 9), 0.8]] });
E.obj('anio', 'contador', { t0: w(2, 0), t1: w(2, 9), sale: 0.2, x: 140, y: -420, size: 120, miles: false, pop: true,
  v: [[w(2, 1), 0], [w(2, 3) + 0.45, 1980, 'out']], barrido: [w(2, 3) + 0.5], caja: [-170, -60, 340, 120] });
E.obj('chAnio', 'chispas', { t0: w(2, 3) + 0.45, t1: w(2, 3) + 1.25, x: 140, y: -420, r0: 150, r1: 250, inspeccion: false });
E.golpe(w(2, 3) + 0.45, 0.04);
E.obj('libro', 'papeles', { t0: w(2, 4), t1: w(2, 9), sale: 0.2, x: 140, y: -14, n: 6, k: [[w(2, 4), 0], [w(2, 8), 6, 'lin']], caja: [-95, -110, 190, 125] });
E.obj('rotHumor', 'rotulo', { t0: w(2, 6) - 0.1, t1: w(2, 9), sale: 0.2, x: 140, y: -250, texto: 'LIBRO DE HUMOR', size: 30, col: GRIS, pop: true, caja: [-150, -18, 300, 36] });
// «y sirve para cualquier oficina»: aparece una mesa de oficina y se enciende el monitor
E.obj('mesa', 'escritorio', { t0: w(2, 9) + 0.05, t1: w(3, 0), sale: 0.25, x: 110, silla: false, pop: true, refl: true,
  brillo: [[w(2, 10), 0], [w(2, 13) + 0.2, 1, 'out']], caja: [-170, -400, 360, 400] });
E.obj('rotOfi', 'rotulo', { t0: w(2, 12) - 0.1, t1: w(3, 0), sale: 0.2, x: 110, y: -470, texto: 'CUALQUIER OFICINA', size: 30, col: AM, pop: true, caja: [-190, -18, 380, 36] });
E.sfx(w(2, 10), 'fill');

// 3: Tres(0) preguntas(1) antes(2) de(3) enfadarte(4)
E.figura('yo3', { t0: w(3, 0) - 0.05, t1: fin(0), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(3, 0), 'pensar'], [w(3, 3), 'manos_cabeza'], [wf(3, -1) + 0.1, 'senalar']],
  sonrisa: [[0, 0.4], [w(3, 3), -1], [wf(3, -1) + 0.1, 0.6]] });
[0, 1, 2].forEach(i => { const a = w(3, 0) + i * 0.13;
  E.obj('q' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: 20 + i * 110, y: -440, r: 36, n: '?', pop: true, sfx: i === 0,
    s: i === 0 ? [[0, 1], [wf(3, -1), 1], [wf(3, -1) + 0.3, 1.3, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [wf(3, -1), 1], [wf(3, -1) + 0.3, 0.4]], caja: [-36, -36, 72, 72] }); });
// «antes de enfadarte»: la nube de enfado empieza a enredarse y se deshace
E.obj('maraña3', 'maraña', { t0: w(3, 2), t1: N[0].T, sale: 0.2, x: 130, y: -250, r: 60, p: [[w(3, 2), 0], [w(3, 4) + 0.2, 1, 'out'], [wf(3, -1) + 0.2, 0, 'in']],
  rot: [[w(3, 2), 0], [N[0].T, 0.8, 'lin']], caja: [-80, -46, 160, 92] });
E.destello(wf(3, -1), 0.12);

// ---------- 1 · ¿puede ser un despiste? ----------
// 4: La(0) primera(1) puede(2) ser(3) un(4) despiste(5)
// 5: Un(0) correo(1) sin(2) leer(3) es(4) más(5) frecuente(6) que(7) un(8) compañero(9) que(10) te(11) quiere(12) mal(13)
E.numero(1, N[0].T, N[0].S, { desde: 'q1', hacia: 'correo' });
E.figura('yoP1', { t0: N[0].S - 0.1, t1: fin(1), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(4, 2), 'pensar'], [w(4, 5), 'encoger'], [w(5, 1), 'senalar'], [w(5, 8), 'pensar'], [w(5, 12), 'encoger'], [wf(5, -1) + 0.2, 'celebrar']],
  sonrisa: [[0, 0.2], [w(4, 5), 0.4], [w(5, 1), 0.8], [w(5, 12), 0], [wf(5, -1) + 0.2, 1.5]] });
E.figura('cP1', { t0: N[0].S, t1: fin(1), x: 390, talla: 340, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'coger'], [w(4, 5), 'encoger'], [w(5, 2), 'pensar'], [w(5, 9), 'de_pie'], [w(5, 12), 'encoger']], sonrisa: [[0, 0.2], [w(4, 5), 0.6]] });
E.obj('correo', 'relleno', { t0: N[0].S - 0.1, t1: fin(1), x: 90, y: -450, w: 340, h: 44, pop: true, sobrevive: true, r: 50, rotulo: 'CORREO SIN LEER',
  f: [[w(5, 1), 0], [w(5, 6) + 0.2, 0.9, 'out']], barrido: [w(5, 6) + 0.25], caja: [-170, -56, 340, 78] });
E.sfx(w(5, 1), 'fill');
E.obj('papeles1', 'papeles', { t0: N[0].S, t1: fin(1), x: 220, y: -14, n: 6, k: [[N[0].S, 0], [w(4, 5) + 0.3, 6, 'lin']], caja: [-95, -110, 190, 125] });
E.obj('frec', 'rotulo', { t0: w(5, 5) - 0.05, t1: fin(1), x: 90, y: -370, texto: 'MÁS FRECUENTE', size: 26, col: AM, pop: true, caja: [-110, -15, 220, 30] });
E.obj('chC', 'chispas', { t0: w(5, 6) + 0.2, t1: w(5, 6) + 1.0, x: 90, y: -450, r0: 100, r1: 200, inspeccion: false });
E.obj('malP1', 'relleno', { t0: w(5, 8) - 0.1, t1: fin(1), x: 90, y: -260, w: 340, h: 44, pop: true, rotulo: 'TE QUIERE MAL',
  f: [[w(5, 11), 0], [w(5, 13), 0.12, 'out']], caja: [-170, -56, 340, 78] });
E.sfx(w(5, 11), 'fill');
E.golpe(wf(5, -1) + 0.2, 0.04);

// ---------- 2 · ¿sabía que lo necesitabas? ----------
// 6: La(0) segunda(1) sabía(2) que(3) lo(4) necesitabas(5)
// 7: Puede(0) que(1) nadie(2) le(3) haya(4) dicho(5) que(6) era(7) para(8) hoy(9)
// el compañero va tachando sus tareas (la tuya no está); la semana se enciende hasta «hoy»
E.numero(2, N[1].T, N[1].S, { desde: 'correo', hacia: 'tareasC' });
E.figura('yoP2', { t0: N[1].S - 0.1, t1: fin(2), x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(6, 2), 'pensar'], [w(6, 5), 'senalar'], [w(7, 0), 'de_pie'], [w(7, 2), 'encoger'], [w(7, 7), 'senalar'], [wf(7, -1) + 0.2, 'manos_cabeza']],
  sonrisa: [[0, 0.2], [w(6, 5), 0.6], [w(7, 2), -0.2], [w(7, 7), 0.4], [wf(7, -1) + 0.2, -0.6]] });
E.figura('cP2', { t0: N[1].S, t1: fin(2), x: 390, talla: 340, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'coger'], [w(6, 3), 'meter'], [w(7, 0), 'coger'], [w(7, 4), 'encoger'], [wf(7, -1), 'manos_cabeza']], sonrisa: [[0, 0.6], [wf(7, -1), -0.5]] });
E.obj('tareasC', 'lista', { t0: N[1].S - 0.1, t1: fin(2), x: 100, y: -270, n: 3, w: 300, gap: 70, pop: true, r: 70,
  p: [[w(6, 2), 0], [wf(6, -1) + 0.5, 3, 'lin']], brillo: [[w(7, 0), 0], [w(7, 5), 3, 'lin']], caja: [-150, -88, 300, 176] });
E.sfx(w(6, 2), 'fill');
E.obj('semana', 'dias', { t0: w(7, 0) - 0.1, t1: fin(2), x: 100, y: -470, letras: ['L', 'M', 'X', 'J', 'V'], gap: 84, pop: true, sobrevive: true, r: 50,
  luz: [[w(7, 6) - 0.1, -1], [w(7, 9) + 0.1, 2, 'lin']], caja: [-200, -32, 400, 64] });
E.obj('hoy', 'rotulo', { t0: w(7, 8) - 0.05, t1: fin(2), x: 100, y: -403, texto: 'PARA HOY', size: 26, col: AM, peso: 700, pop: true, caja: [-75, -15, 150, 30] });
E.obj('chHoy', 'chispas', { t0: w(7, 9) + 0.1, t1: w(7, 9) + 0.9, x: 100, y: -470, r0: 90, r1: 200, inspeccion: false });
E.temblor(w(7, 9) + 0.1, 10, 0.35); E.sfx(w(7, 9) + 0.1, 'thud');

// ---------- 3 · ¿se lo has preguntado? ----------
// 8: La(0) tercera(1) se(2) lo(3) has(4) preguntado(5)
// 9: Una(0) llamada(1) de(2) dos(3) minutos(4) ahorra(5) una(6) semana(7) de(8) malas(9) caras(10)
// llamada con ondas de voz; el temporizador de dos minutos se completa; la semana de malas caras se deshace
E.numero(3, N[2].T, N[2].S, { desde: 'semana', hacia: 'tel3' });
E.figura('yoP3', { t0: N[2].S - 0.1, t1: TC, x: -355, cara: true,
  poses: [[0, 'de_pie'], [w(8, 2), 'senalar'], [w(9, 0), 'coger'], [w(9, 5), 'ofrecer'], [wf(9, -1) + 0.2, 'celebrar']],
  sonrisa: [[0, 0.3], [w(8, 2), 0.6], [w(9, 0), 0.8], [wf(9, -1) + 0.2, 1.5]] });
E.figura('cP3', { t0: N[2].S, t1: TC, x: 390, talla: 340, color: 'gris', dir: -1, cara: true,
  poses: [[0, 'de_pie'], [w(8, 5), 'encoger'], [w(9, 1), 'ofrecer'], [wf(9, -1) + 0.2, 'celebrar']], sonrisa: [[0, 0], [w(9, 1), 0.8], [wf(9, -1), 1.4]] });
E.obj('tel3', 'telefono', { t0: N[2].S - 0.1, t1: TC, x: -150, y: -260, w: 120, h: 200, pop: true, r: 70,
  brillo: [[0, 0.3], [w(9, 0), 0.3], [w(9, 1), 1, 'out']], vibra: [[w(8, 4), 0], [w(8, 5), 1], [w(9, 0), 1], [w(9, 1), 0]], caja: [-60, -100, 120, 200] });
E.obj('ondas3', 'ondas', { t0: w(9, 1) - 0.1, t1: TC, x: 120, y: -380, n: 9, gap: 26, pop: true, amp: [[w(9, 1), 0.2], [w(9, 2), 1], [w(9, 5), 1], [w(9, 6) + 0.2, 0.25]], caja: [-125, -50, 250, 100] });
E.obj('reloj', 'temporizador', { t0: w(9, 2), t1: TC, x: 120, y: -200, r: 70, texto: 'DOS', sub: 'MINUTOS', pop: true,
  p: [[w(9, 3), 0], [w(9, 5), 1, 'inout']], hecho: [[w(9, 5), 0], [w(9, 5) + 0.3, 1]], caja: [-92, -92, 184, 184] });
E.sfx(w(9, 3), 'fill');
E.obj('chR', 'chispas', { t0: w(9, 5) + 0.2, t1: w(9, 5) + 1.0, x: 120, y: -200, r0: 90, r1: 180, inspeccion: false });
E.obj('semana3', 'dias', { t0: w(9, 6) - 0.1, t1: TC, x: 100, y: -470, letras: ['L', 'M', 'X', 'J', 'V'], gap: 84, pop: true,
  luz: [[w(9, 6), -1], [w(9, 7) + 0.4, 4, 'lin'], [w(9, 10), 4], [wf(9, -1) + 0.4, -1, 'inout']], caja: [-200, -32, 400, 64] });
E.obj('caras', 'maraña', { t0: w(9, 9) - 0.05, t1: TC, x: 100, y: -470, r: 60, col: ROJO, inspeccion: false,
  p: [[w(9, 9), 0], [w(9, 10), 1, 'out'], [wf(9, -1) + 0.1, 1], [wf(9, -1) + 0.5, 0, 'in']], rot: [[w(9, 9), 0], [TC, 0.8, 'lin']] });
E.temblor(w(9, 10), 8, 0.3);
E.golpe(wf(9, -1) + 0.4, 0.04); E.destello(wf(9, -1) + 0.4, 0.12);

// ---------- cierre: resumen y envío ----------
// 10: Casi(0) nadie(1) va(2) contra(3) ti(4) la(5) mayoría(6) va(7) con(8) prisa(9)
// 11: Mándaselo(0) a(1) ese(2) compañero(3) que(4) cree(5) que(6) todos(7) van(8) contra(9) él(10)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(10, 4), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, items: ['¿Despiste?', '¿Lo sabía?', '¿Preguntaste?'], gap: 280,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(10, 6)], caja: [-420, -60, 840, 200] });
E.obj('confC', 'confeti', { t0: wf(10, -1), t1: wf(10, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(10, -1), 0.22); E.golpe(wf(10, -1), 0.04);
E.figura('yoF', { t0: w(11, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(11, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(11, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(11, 10)], vuelo: [[wf(11, -1), 0], [wf(11, -1) + 0.5, 1, 'in']] });
