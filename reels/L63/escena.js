// L63 · La regla de los dos minutos (estilo B; reglas 15, 20, 21, 24)
// Idea visual: una lista de pendientes con un temporizador de «2 MIN» al lado de la primera tarea; la semana pasa y la
// tarea sigue ahí. La regla: el temporizador se rellena y la tarea se marca en el momento. Tres reglas: el reloj de dos
// minutos y tres casillas que se marcan (mensaje, cita, recibo); una barra que se alarga y la semana con su día y su hora
// (sin fecha, los días dan vueltas); y la tarea que vuela a un compañero con una lista de lo que necesita.
// Contador que suma: el año 2001 rueda; al final, el móvil del amigo sube hasta 40 mensajes.
// Regla 20: «Luego lo hago.» va en bocadillo del muñeco durante el gancho; la voz solo narra.
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
  [0, [0, -380, 1.04]], [w(0, 5), [10, -385, 1.06]], [w(0, 10), [-15, -390, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 10), [10, -385, 1.05]],
  [w(1, 19), [-10, -390, 1.07]], [w(2, 0), [0, -380, 1.02]], [w(2, 7), [10, -385, 1.05]], [w(3, 0), [0, -380, 1.03]], [N[0].T, [10, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(5, 0), [15, -385, 1.04]], [w(5, 7), [-10, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(7, 0), [-15, -385, 1.04]], [w(7, 8), [15, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(9, 0), [-10, -385, 1.04]], [w(9, 6), [10, -385, 1.05]], [TC - 0.1, [0, -385, 1.04]], [TC, [0, -390, 1.05]],
  [w(11, 0), [0, -380, 1.02]], [D, [0, -385, 1.05]],
]);

// ---------- gancho ----------
// 0: Esa(0) tarea(1) de(2) dos(3) minutos(4) lleva(5) una(6) semana(7) en(8) tu(9) lista(10)   [bocadillo del muñeco «Luego lo hago.»]
// fotograma 0: el muñeco junto a su lista de pendientes; la primera tarea parpadea; «dos minutos»: entra el reloj de 2 MIN;
// «lleva una semana»: la luz recorre los siete días; «lista»: golpe y temblor
// 1: Hay(0) una(1) regla(2) para(3) eso(4) la(5) de(6) los(7) dos(8) minutos(9) si(10) algo(11) se(12) hace(13) en(14) menos(15) de(16) dos(17) minutos(18) se(19) hace(20) en(21) el(22) momento(23)
// 2: Es(0) de(1) David(2) Allen(3) del(4) año(5) 2001(6) apuntarlo(7) y(8) acordarte(9) te(10) cuesta(11) más(12) que(13) hacerlo(14)
// 3: Tres(0) reglas(1) para(2) aplicarla(3)
E.figura('yo', { t0: 0, t1: fin(0), x: -340, cara: true,
  poses: [[0, 'pensar'], [w(0, 5), 'apartarse'], [w(0, 10), 'encoger'],
    [w(1, 0), 'de_pie'], [w(1, 2), 'senalar'], [w(1, 10), 'pensar'], [w(1, 19), 'escribir'], [w(1, 23), 'celebrar'],
    [w(2, 0), 'de_pie'], [w(2, 2), 'senalar'], [w(2, 7), 'escribir'], [w(2, 9), 'pensar'], [w(2, 11), 'manos_cabeza'], [w(2, 14), 'celebrar'],
    [w(3, 0), 'de_pie'], [w(3, 1), 'senalar'], [w(3, 3), 'celebrar']],
  sonrisa: [[0, 0.2], [w(0, 5), -0.4], [w(0, 10), -1.2], [w(1, 2), 0.3], [w(1, 10), 0.2], [w(1, 23), 1.5], [w(2, 2), 0.6], [w(2, 9), -0.2], [w(2, 11), -1.0], [w(2, 14), 1.4],
    [w(3, 1), 0.5], [w(3, 3), 1.4]] });
E.obj('bocaH', 'bocadillo', { t0: 0.3, t1: w(0, 10), sale: 0.2, x: -110, y: -490, w: 300, h: 80, texto: 'Luego lo hago.', size: 30, pop: true,
  on: [[0.3, 0], [0.8, 1]], caja: [-150, -40, 300, 106] });
E.obj('pend', 'lista', { t0: 0, t1: w(1, 0) + 0.1, sale: 0.25, x: 170, y: -250, n: 4, w: 300, gap: 70,
  brillo: [[0, 0.2], [0.5, 1], [0.9, 0.3], [1.3, 1], [w(0, 5), 1], [w(0, 7) + 0.2, 0.25], [w(0, 10), 0.25], [w(0, 10) + 0.15, 1], [w(0, 10) + 0.5, 1]],
  caja: [-150, -123, 300, 246] });
E.obj('reloj0', 'temporizador', { t0: w(0, 3) - 0.1, t1: w(1, 0) + 0.1, sale: 0.25, x: 400, y: -355, r: 46, texto: '2', sub: 'MIN', pop: true,
  p: [[w(0, 3), 0], [w(0, 4) + 0.4, 0.15, 'out']], caja: [-64, -64, 128, 128] });
E.obj('semana', 'dias', { t0: 0, t1: w(1, 0) + 0.1, sale: 0.25, x: 130, y: -45, gap: 64,
  luz: [[0, -1], [w(0, 5), -1], [w(0, 7) + 0.45, 6, 'lin']], caja: [-222, -32, 444, 64] });
E.sfx(w(0, 5), 'fill');
E.temblor(w(0, 10), 14, 0.45); E.golpe(w(0, 10), 0.05);

// 1: la regla con nombre; el reloj grande se rellena «en menos de dos minutos» y se marca «en el momento»
E.obj('rotRegla', 'rotulo', { t0: w(1, 5) - 0.1, t1: w(2, 0), sale: 0.25, x: 120, y: -470, texto: 'REGLA DE LOS DOS MINUTOS', size: 30, col: AM, peso: 700, pop: true, caja: [-300, -20, 600, 40] });
E.obj('chRegla', 'chispas', { t0: w(1, 9), t1: w(1, 9) + 0.8, x: 120, y: -470, r0: 140, r1: 260, inspeccion: false });
E.golpe(w(1, 9), 0.04);
E.obj('reloj1', 'temporizador', { t0: w(1, 0) + 0.05, t1: w(2, 0), sale: 0.25, x: 140, y: -230, r: 110, texto: '2', sub: 'MIN', pop: true,
  p: [[w(1, 10), 0], [wf(1, 18), 1, 'lin']], hecho: [[w(1, 22), 0], [w(1, 23) + 0.25, 1, 'out']], caja: [-132, -132, 264, 264] });
E.sfx(w(1, 10), 'fill');
E.obj('ch1', 'chispas', { t0: w(1, 23) + 0.2, t1: w(1, 23) + 1.0, x: 140, y: -230, r0: 140, r1: 240, inspeccion: false });
E.golpe(w(1, 23) + 0.2, 0.04); E.destello(w(1, 23) + 0.2, 0.12);

// 2: el autor y el año (contador que rueda); «apuntarlo y acordarte» llena una barra larga y «hacerlo» una corta
E.obj('rotDA', 'rotulo', { t0: w(2, 2) - 0.1, t1: w(2, 7), sale: 0.2, x: 140, y: -460, texto: 'DAVID ALLEN', size: 32, col: GRIS, pop: true, caja: [-140, -18, 280, 36] });
E.obj('anio', 'contador', { t0: w(2, 1), t1: w(2, 7), sale: 0.2, x: 140, y: -320, size: 120, miles: false, pop: true,
  v: [[w(2, 3), 0], [w(2, 6) + 0.45, 2001, 'out']], barrido: [w(2, 6) + 0.5], caja: [-170, -60, 340, 120] });
E.obj('chAnio', 'chispas', { t0: w(2, 6) + 0.45, t1: w(2, 6) + 1.25, x: 140, y: -320, r0: 150, r1: 250, inspeccion: false });
E.golpe(w(2, 6) + 0.45, 0.04);
E.obj('barA', 'relleno', { t0: w(2, 7) - 0.05, t1: w(3, 0) - 0.05, sale: 0.25, x: 120, y: -430, w: 420, h: 44, pop: true, rotulo: 'APUNTARLO Y ACORDARTE',
  f: [[w(2, 7), 0], [w(2, 12), 0.92, 'out']], caja: [-210, -56, 420, 78] });
E.obj('barB', 'relleno', { t0: w(2, 7) + 0.1, t1: w(3, 0) - 0.05, sale: 0.25, x: 120, y: -290, w: 420, h: 44, pop: true, rotulo: 'HACERLO',
  f: [[w(2, 13), 0], [w(2, 14) + 0.3, 0.22, 'out']], caja: [-210, -56, 420, 78] });
E.sfx(w(2, 7), 'fill'); E.sfx(w(2, 13), 'fill');
E.obj('notas', 'papeles', { t0: w(2, 7), t1: w(3, 0) - 0.05, sale: 0.25, x: 120, y: -20, n: 6, k: [[w(2, 7), 0], [w(2, 12), 6, 'lin']], caja: [-95, -110, 190, 125] });
E.obj('chB', 'chispas', { t0: w(2, 14) + 0.3, t1: w(2, 14) + 1.1, x: -60, y: -290, r0: 40, r1: 120, inspeccion: false });
E.destello(w(2, 14) + 0.3, 0.1);

// 3: «Tres reglas para aplicarla»: tres monedas; la primera crece y pasa a la regla uno
E.obj('rayosH', 'rayos', { t0: w(3, 0), t1: fin(0), x: 140, y: -330, r: 300, z: -2, p: [[w(3, 0), 0], [w(3, 3), 1, 'out']], inspeccion: false });
[0, 1, 2].forEach(i => { const a = w(3, 0) + i * 0.12;
  E.obj('r' + (i + 1), 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: 15 + i * 125, y: -330, r: 40, n: i + 1, pop: true, sfx: true,
    s: i === 0 ? [[0, 1], [w(3, 3), 1], [w(3, 3) + 0.35, 1.4, 'back']] : 1, luz: i === 0 ? 1 : [[0, 1], [w(3, 3), 1], [w(3, 3) + 0.3, 0.4]], caja: [-40, -40, 80, 80] }); });
E.obj('chR', 'chispas', { t0: w(3, 3) + 0.3, t1: w(3, 3) + 1.1, x: 15, y: -330, r0: 60, r1: 150, inspeccion: false });
E.destello(w(3, 3), 0.12);

// ---------- 1 · si son dos minutos, ahora ----------
// 4: La(0) primera(1) si(2) son(3) dos(4) minutos(5) ahora(6)
// 5: Contestar(0) ese(1) mensaje(2) pedir(3) la(4) cita(5) o(6) pagar(7) ese(8) recibo(9)
E.numero(1, N[0].T, N[0].S, { desde: 'r1', hacia: 'reloj4' });
E.figura('yoP1', { t0: N[0].S - 0.1, t1: fin(1), x: -340, cara: true,
  poses: [[0, 'de_pie'], [w(4, 2), 'pensar'], [w(4, 6), 'senalar'], [w(5, 0), 'escribir'], [w(5, 3), 'coger'], [w(5, 7), 'ofrecer'], [wf(5, -1), 'celebrar']],
  sonrisa: [[0, 0.2], [w(4, 6), 1], [w(5, 0), 0.6], [w(5, 7), 0.8], [wf(5, -1), 1.5]] });
E.obj('reloj4', 'temporizador', { t0: N[0].S - 0.1, t1: fin(1), x: 150, y: -400, r: 72, texto: '2', sub: 'MIN', pop: true,
  p: [[w(4, 4), 0], [w(4, 6) + 0.15, 1, 'inout']], hecho: [[w(4, 6), 0], [w(4, 6) + 0.4, 1, 'out']], caja: [-90, -90, 180, 180] });
E.sfx(w(4, 4), 'fill');
E.obj('ch4', 'chispas', { t0: w(4, 6) + 0.3, t1: w(4, 6) + 1.1, x: 150, y: -400, r0: 100, r1: 190, inspeccion: false });
E.golpe(w(4, 6) + 0.3, 0.04);
E.obj('rotT1', 'rotulo', { t0: w(5, 0) - 0.1, t1: fin(1), sale: 0.2, x: 150, y: -280, size: 26, col: '#c9ccca', pop: true,
  texto: [[0, 'ESE MENSAJE'], [w(5, 3), 'LA CITA'], [w(5, 7), 'ESE RECIBO']], caja: [-120, -16, 240, 32] });
E.obj('hechas', 'lista', { t0: N[0].S + 0.1, t1: fin(1), x: 150, y: -150, n: 3, w: 320, gap: 70, pop: true, sobrevive: true,
  p: [[w(5, 0), 0], [w(5, 2) + 0.1, 1, 'out'], [w(5, 3), 1], [w(5, 5) + 0.1, 2, 'out'], [w(5, 7), 2], [w(5, 9) + 0.1, 3, 'out']],
  brillo: [[w(5, 0), 0], [w(5, 2) + 0.1, 1], [w(5, 5) + 0.1, 2], [w(5, 9) + 0.1, 3]], caja: [-160, -105, 320, 210] });
E.sfx(w(5, 0), 'fill');
E.obj('ch5', 'chispas', { t0: wf(5, -1), t1: wf(5, -1) + 0.8, x: 150, y: -150, r0: 120, r1: 220, inspeccion: false });
E.golpe(wf(5, -1), 0.04); E.destello(wf(5, -1), 0.1);

// ---------- 2 · si es más largo, ponle día y hora ----------
// 6: La(0) segunda(1) si(2) es(3) más(4) largo(5) ponle(6) día(7) y(8) hora(9)
// 7: Una(0) tarea(1) sin(2) fecha(3) se(4) queda(5) en(6) la(7) lista(8) para(9) siempre(10)
E.numero(2, N[1].T, N[1].S, { desde: 'hechas', hacia: 'larga' });
E.figura('yoP2', { t0: N[1].S - 0.1, t1: fin(2), x: -340, cara: true,
  poses: [[0, 'de_pie'], [w(6, 3), 'levantar'], [w(6, 6), 'senalar'], [w(6, 9), 'escribir'], [w(7, 0), 'de_pie'], [w(7, 2), 'encoger'], [w(7, 5), 'pensar'], [w(7, 9), 'manos_cabeza'], [wf(7, -1) + 0.2, 'triste']],
  sonrisa: [[0, 0.2], [w(6, 6), 0.8], [w(6, 9), 1.3], [w(7, 2), -0.2], [w(7, 9), -1.3]] });
E.obj('larga', 'barra', { t0: N[1].S - 0.1, t1: w(7, 1), sale: 0.25, x: 120, y: -440, h: 50, pop: true,
  w: [[w(6, 3), 140], [w(6, 5) + 0.4, 440, 'out']], f: [[w(6, 3), 0.2], [w(6, 5) + 0.4, 1, 'out']], caja: [-220, -25, 440, 50] });
E.sfx(w(6, 3), 'fill');
E.obj('sem6', 'dias', { t0: w(6, 5), t1: fin(2), x: 120, y: -300, gap: 62, pop: true,
  luz: [[w(6, 6), -1], [w(6, 7) + 0.25, 3, 'out'], [w(7, 1), 3], [w(7, 3), -1, 'inout'], [w(7, 9), -1], [w(7, 9) + 0.6, 6, 'lin'], [w(7, 9) + 0.61, 0], [wf(7, -1) + 0.5, 6, 'lin']],
  caja: [-216, -32, 432, 64] });
E.obj('reloj6', 'relojAm', { t0: w(6, 8) - 0.1, t1: fin(2), x: 330, y: -140, r: 80, texto: '', pop: true, sobrevive: true,
  p: [[w(6, 9), 0], [w(6, 9) + 0.5, 0.6, 'out']], luz: [[0, 1], [w(7, 2), 1], [w(7, 3), 0.45]], caja: [-80, -80, 160, 160] });
E.obj('ch6', 'chispas', { t0: w(6, 9) + 0.5, t1: w(6, 9) + 1.3, x: 330, y: -140, r0: 90, r1: 170, inspeccion: false });
E.golpe(w(6, 9) + 0.5, 0.04);
// «sin fecha»: el día se apaga; la tarea se queda gris en la lista; «para siempre»: los días dan vueltas
E.obj('sinF', 'rotulo', { t0: w(7, 2) - 0.1, t1: fin(2), sale: 0.2, x: 120, y: -440, texto: 'SIN FECHA', size: 30, col: ROJO, peso: 700, pop: true, caja: [-110, -18, 220, 36] });
E.obj('pend7', 'lista', { t0: w(7, 4) - 0.1, t1: fin(2), x: 70, y: -140, n: 3, w: 240, gap: 60, pop: true, caja: [-120, -78, 240, 156] });
E.temblor(w(7, 10), 10, 0.4);

// ---------- 3 · si no te toca a ti, pásala hoy ----------
// 8: La(0) tercera(1) si(2) no(3) te(4) toca(5) a(6) ti(7) pásala(8) hoy(9)
// 9: Pásasela(0) a(1) quien(2) le(3) corresponda(4) con(5) todo(6) lo(7) que(8) necesite(9) para(10) hacerla(11)
E.numero(3, N[2].T, N[2].S, { desde: 'reloj6', hacia: 'tarea8' });
E.figura('yoP3', { t0: N[2].S - 0.1, t1: TC, x: -340, cara: true,
  poses: [[0, 'coger'], [w(8, 3), 'encoger'], [w(8, 8), 'ofrecer'], [w(9, 0), 'senalar'], [w(9, 5), 'ofrecer'], [wf(9, -1), 'celebrar']],
  sonrisa: [[0, 0.2], [w(8, 3), -0.3], [w(8, 8), 0.8], [w(9, 5), 1], [wf(9, -1), 1.5]] });
E.figura('comp', { t0: w(8, 2) - 0.1, t1: TC, x: 360, talla: 400, color: 'gris', dir: -1, cara: true, toca: ['tarea8'],
  poses: [[0, 'de_pie'], [w(8, 9), 'coger'], [w(9, 4), 'de_pie'], [w(9, 11), 'celebrar']], sonrisa: [[0, 0.3], [w(8, 9), 0.8], [w(9, 11), 1.4]] });
E.obj('tarea8', 'pieza', { t0: N[2].S - 0.1, t1: TC, x: [[0, -200], [w(8, 8), -200], [w(8, 8) + 0.55, 250, 'inout']], y: [[0, -260], [w(8, 8), -260], [w(8, 8) + 0.28, -360, 'out'], [w(8, 8) + 0.55, -250, 'in']],
  r: 36, estela: 5, pop: true, libre: true, caja: [-36, -36, 72, 72] });
E.sfx(w(8, 8), 'whoosh');
E.obj('pulso8', 'pulso', { t0: w(8, 8) + 0.55, t1: w(8, 8) + 1.15, x: 250, y: -250, r0: 30, r1: 110, inspeccion: false });
E.obj('rotNo', 'rotulo', { t0: w(8, 3) - 0.1, t1: w(8, 8), sale: 0.15, x: 0, y: -460, texto: 'NO TE TOCA A TI', size: 30, col: GRIS, pop: true, caja: [-180, -18, 360, 36] });
E.obj('rotHoy', 'rotulo', { t0: w(8, 8) + 0.05, t1: TC, x: 0, y: -460, texto: 'PÁSALA HOY', size: 34, col: AM, peso: 700, pop: true, caja: [-140, -20, 280, 40] });
E.golpe(w(8, 9), 0.04);
// «con todo lo que necesite para hacerla»: una lista se marca entre los dos
E.obj('todo', 'lista', { t0: w(9, 4), t1: TC, x: 20, y: -250, n: 3, w: 240, gap: 66, pop: true,
  p: [[w(9, 6), 0], [w(9, 9) + 0.3, 3, 'lin']], brillo: [[w(9, 6), 0], [wf(9, -1), 3, 'lin']], caja: [-120, -100, 240, 200] });
E.sfx(w(9, 6), 'fill');
E.obj('ch9', 'chispas', { t0: wf(9, -1), t1: wf(9, -1) + 0.8, x: 250, y: -250, r0: 60, r1: 150, inspeccion: false });
E.golpe(wf(9, -1), 0.04); E.destello(wf(9, -1), 0.1);

// ---------- cierre: resumen y envío ----------
// 10: Lo(0) pequeño(1) no(2) pesa(3) por(4) lo(5) que(6) cuesta(7) pesa(8) porque(9) se(10) acumula(11)
// 11: Mándaselo(0) a(1) ese(2) amigo(3) que(4) tiene(5) cuarenta(6) mensajes(7) sin(8) contestar(9)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(10, 3), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, items: ['Dos minutos', 'Día y hora', 'Pásala hoy'], gap: 270,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(10, 11)], caja: [-400, -60, 800, 200] });
E.obj('confC', 'confeti', { t0: wf(10, -1), t1: wf(10, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(10, -1), 0.22); E.golpe(wf(10, -1), 0.04);
E.figura('yoF', { t0: w(11, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(11, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(11, 1), t1: D + 1, x: 120, y: -380, r: 64, pop: true, barrido: [w(11, 9)], vuelo: [[wf(11, -1), 0], [wf(11, -1) + 0.5, 1, 'in']] });
E.obj('movil', 'telefono', { t0: w(11, 2), t1: D + 1, x: 350, y: -170, pop: true,
  avisos: [[w(11, 5), 0], [w(11, 7) + 0.3, 40, 'out']], vibra: [[w(11, 6), 0], [w(11, 6) + 0.1, 1], [w(11, 9), 1], [wf(11, -1) + 0.2, 0]], caja: [-85, -190, 210, 340] });
E.temblor(w(11, 7), 8, 0.3);
