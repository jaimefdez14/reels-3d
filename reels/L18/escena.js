// L18 · Tres pruebas antes de dejar tu trabajo para emprender (estilo B; reglas 15, 19, 20, 23)
// Gancho visual: los meses pasan con la idea en la cabeza; la puerta de la oficina se entreabre y se vuelve a cerrar.
// Regla 20: «¡Qué buena idea!» va en bocadillo del cliente; la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(1, 0), gap: 70, y: 360 } });

// «La primera: // …» → T en «La», S en la primera palabra del punto
const N = [2, 5, 8].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(11, 0) - 0.1;

E.camara([
  [0, [0, -380, 1.04]], [w(0, 7), [0, -385, 1.07]], [w(1, 0), [0, -380, 1.02]], [N[0].T, [20, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [0, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(7, 0), [0, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(10, 0), [0, -385, 1.06]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Llevas(0) meses(1) pensando(2) en(3) montar(4) algo(5) tuyo(6) y(7) no(8) te(9) atreves(10) a(11) dejar(12) el(13) trabajo(14)
// 1: Haces(0) bien(1) Antes(2) de(3) dejarlo(4) prueba(5) tres(6) cosas(7)
E.figura('yo', { t0: 0, t1: fin(0), x: -330, cara: true,
  poses: [[0, 'pensar'], [w(0, 7), 'de_pie'], [w(0, 10), 'encoger'], [w(1, 0), 'de_pie'], [w(1, 5), 'senalar']],
  sonrisa: [[0, 0.4], [w(0, 7), 0], [w(0, 10), -0.8], [w(1, 0), 0.4], [w(1, 6), 1]] });
E.obj('meses', 'contador', { t0: 0, t1: w(1, 0), sale: 0.2, x: 150, y: -470, v: [[0, 1], [wf(0, 2), 9, 'inout']], suf: ' meses', size: 64, col: 'txt', miles: false, caja: [-160, -38, 320, 76] });
E.obj('rotIdea', 'rotulo', { t0: w(0, 4), t1: w(1, 0), sale: 0.2, x: 150, y: -400, texto: 'CON LA IDEA', size: 26, col: '#9a9c9b', pop: true, caja: [-110, -16, 220, 32] });
E.obj('puerta', 'puerta', { t0: 0, t1: fin(0), x: 220, w: 190, h: 330, p: [[0, 0], [w(0, 12), 0], [w(0, 14), 0.45, 'out'], [w(1, 0), 0.45], [w(1, 0) + 0.3, 0, 'in']],
  luz: [[0, 0.6], [w(0, 12), 1], [w(1, 2), 0.35]], caja: [-95, -330, 190, 330], refl: true });
E.golpe(w(1, 0) + 0.3, 0.04);
E.temblor(w(0, 10), 8, 0.35);
// «tres cosas»: tres monedas; la tercera se queda y abre el primer punto
[0, 1, 2].forEach(i => { const a = w(1, 5) + i * 0.12;
  E.obj('h' + (i + 1), 'moneda', { t0: a, t1: i === 2 ? N[0].T + 0.1 : N[0].T + 0.45, entra: 0.15, x: -20 + (i - 1) * 100, y: -470, r: 34, n: i + 1, pop: true, sfx: i === 0, inspeccion: false,
    sobrevive: i === 2, s: i === 2 ? [[0, 1], [w(1, 7), 1], [w(1, 7) + 0.35, 1.3, 'back']] : 1 }); });
E.obj('chH', 'chispas', { t0: wf(1, -1), t1: wf(1, -1) + 0.8, x: -20, y: -470, r0: 60, r1: 160, inspeccion: false });

// ---------- 1 · véndelo antes de tenerlo hecho ----------
// 2: La(0) primera(1) véndelo(2) antes(3) de(4) tenerlo(5) hecho(6)
// 3: Cuéntaselo(0) a(1) diez(2) posibles(3) clientes(4) y(5) pídeles(6) que(7) paguen(8) por(9) adelantado(10)
// 4: Que(0) te(1) digan(2) que(3) es(4) buena(5) idea(6) no(7) les(8) cuesta(9) nada(10) Lo(11) que(12) importa(13) es(14) que(15) paguen(16)   [bocadillo «¡Qué buena idea!»]
E.numero(1, N[0].T, N[0].S, { desde: 'h3', hacia: 'pagan' });
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -370, cara: true,
  poses: [[0, 'de_pie'], [w(2, 2), 'ofrecer'], [w(3, 0), 'senalar'], [w(4, 0), 'de_pie'], [w(4, 7), 'encoger'], [w(4, 13), 'ofrecer'], [wf(4, -1), 'celebrar']],
  sonrisa: [[w(2, 2), 0.5], [w(4, 7), -0.3], [wf(4, -1), 1.5]] });
E.figura('cliente', { t0: N[0].S - 0.1, t1: fin(1), x: 370, dir: -1, color: 'gris',
  poses: [[0, 'de_pie'], [w(3, 6), 'pensar'], [w(4, 0), 'celebrar'], [w(4, 11), 'de_pie'], [w(4, 13), 'ofrecer']] });
// diez posibles clientes: diez casillas; las que pagan se encienden
const casillas = [];
for (let i = 0; i < 10; i++) { const a = w(3, 2) + i * 0.07, col = i % 5, row = (i / 5) | 0, paga = [1, 3, 7].includes(i);
  casillas.push('c' + i);
  E.obj('c' + i, 'pieza', { t0: a, t1: fin(1), entra: 0.15, x: -120 + col * 60, y: -330 + row * 60, r: 22, pop: true, sfx: i === 0, inspeccion: false,
    texto: paga ? '€' : '', on: paga ? [[0, 0], [w(4, 13) + i * 0.05, 0], [w(4, 13) + i * 0.05 + 0.2, 1]] : 0,
    luz: paga ? 1 : [[0, 1], [w(4, 11), 1], [w(4, 13), 0.4]] }); }
E.obj('rotCli', 'rotulo', { t0: w(3, 4) - 0.1, t1: w(4, 11), sale: 0.15, x: 0, y: -195, texto: 'POSIBLES CLIENTES', size: 26, col: '#9a9c9b', pop: true, caja: [-150, -16, 300, 32] });
E.obj('pagan', 'contador', { t0: w(4, 11), t1: fin(1), x: 0, y: -190, v: [[w(4, 13), 0], [wf(4, -1) + 0.2, 3, 'out']], suf: ' pagan', size: 56, col: 'txt', miles: false, pop: true, sobrevive: true, caja: [-130, -34, 260, 68] });
E.obj('buena', 'bocadillo', { t0: w(4, 0) - 0.1, t1: w(4, 11), sale: 0.15, x: 100, y: -500, w: 300, h: 84, texto: '¡Qué buena idea!', size: 30, pop: true, caja: [-150, -42, 300, 106] });
E.obj('ch1', 'chispas', { t0: wf(4, -1), t1: wf(4, -1) + 0.8, x: 0, y: -300, r0: 120, r1: 220, inspeccion: false });
E.golpe(wf(4, -1), 0.04); E.destello(wf(4, -1), 0.12);

// ---------- 2 · empieza por las tardes, sin dejar la nómina ----------
// 5: La(0) segunda(1) empieza(2) por(3) las(4) tardes(5) sin(6) dejar(7) la(8) nómina(9)
// 6: Mientras(0) sigas(1) cobrando(2) a(3) fin(4) de(5) mes(6) te(7) puedes(8) permitir(9) equivocarte(10)
// 7: Deja(0) el(1) trabajo(2) cuando(3) lo(4) tuyo(5) te(6) dé(7) al(8) menos(9) la(10) mitad(11) del(12) sueldo(13)
E.numero(2, N[1].T, N[1].S, { desde: 'pagan', hacia: 'reloj2' });
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -370, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'senalar'], [w(6, 0), 'de_pie'], [w(6, 7), 'encoger'], [w(7, 0), 'senalar'], [wf(7, -1), 'celebrar']],
  sonrisa: [[w(5, 2), 0.5], [w(6, 7), 0.8], [wf(7, -1), 1.5]] });
E.obj('reloj2', 'relojAm', { t0: N[1].S - 0.1, t1: w(6, 0), sale: 0.12, x: 120, y: -380, r: 90, pop: true, texto: '18:00', sobrevive: false,
  p: [[N[1].S, 0.25], [w(5, 5), 0.75, 'out']], caja: [-92, -92, 184, 184] });
E.obj('rotTarde', 'rotulo', { t0: w(5, 5) - 0.1, t1: w(6, 0), sale: 0.2, x: 120, y: -255, texto: 'POR LAS TARDES', size: 26, col: '#9a9c9b', pop: true, caja: [-130, -16, 260, 32] });
E.obj('nomina', 'etiqueta', { t0: w(6, 0) + 0.15, t1: fin(2), x: 120, y: -440, w: 320, h: 110, r: 60, pop: true, sobrevive: false,
  v: [[w(6, 2), 0], [w(6, 6), 1800, 'inout']], barrido: [w(6, 6)], caja: [-160, -55, 320, 110] });
E.obj('rotNom', 'rotulo', { t0: w(6, 0), t1: fin(2), x: 120, y: -360, texto: 'NÓMINA', size: 26, col: '#9a9c9b', caja: [-80, -16, 160, 32] });
E.obj('tuyo', 'barra', { t0: w(7, 0) - 0.15, t1: fin(2), x: 100, y: -200, w: 470, h: 52, pop: true, sobrevive: true,
  f: [[w(7, 4), 0], [w(7, 13), 0.5, 'inout']], marca: 0.5, rotMarca: 'MITAD', barrido: [w(7, 13)], caja: [-235, -110, 470, 140] });
E.obj('rotTuyo', 'rotulo', { t0: w(7, 3), t1: fin(2), x: 100, y: -130, texto: 'LO TUYO', size: 26, col: '#e6ce46', pop: true, caja: [-80, -16, 160, 32] });
E.sfx(w(7, 4), 'fill');
E.obj('ch2', 'chispas', { t0: w(7, 13), t1: w(7, 13) + 0.8, x: 100, y: -200, r0: 120, r1: 240, inspeccion: false });
E.golpe(w(7, 13), 0.04);

// ---------- 3 · ten ahorrado lo que gastas en seis meses ----------
// 8: La(0) tercera(1) ten(2) ahorrado(3) lo(4) que(5) gastas(6) en(7) seis(8) meses(9)
// 9: Los(0) primeros(1) meses(2) casi(3) siempre(4) ganas(5) menos(6) de(7) lo(8) que(9) esperabas(10)
// 10: Con(0) ese(1) colchón(2) decides(3) con(4) calma(5) sin(6) miedo(7) a(8) quedarte(9) sin(10) dinero(11)
E.numero(3, N[2].T, N[2].S, { desde: 'tuyo', hacia: 'colchon' });
E.figura('yo3', { t0: N[2].S - 0.1, t1: TC, x: -360, cara: true, toca: [],
  poses: [[0, 'de_pie'], [w(8, 2), 'meter'], [w(8, 9), 'senalar'], [w(9, 0), 'de_pie'], [w(9, 5), 'encoger'], [w(10, 0), 'de_pie'], [w(10, 3), 'celebrar']],
  sonrisa: [[w(8, 2), 0.4], [w(9, 5), -0.6], [w(10, 3), 1.5]] });
E.obj('colchon', 'tarro', { t0: N[2].S - 0.1, t1: TC, x: 180, pop: true, rotulo: 'COLCHÓN', w: 200, h: 270, sobrevive: false,
  nivel: [[w(8, 6), 0], [wf(8, -1) + 0.2, 1, 'inout']], luz: [[0, 1], [w(9, 0), 1], [w(9, 3), 0.5], [w(10, 2), 0.5], [w(10, 3), 1]],
  barrido: [w(10, 3)], caja: [-100, -270, 200, 270], refl: true });
E.obj('mes3', 'contador', { t0: w(8, 4) - 0.1, t1: w(9, 0), sale: 0.15, x: 180, y: -420, v: [[w(8, 6), 0], [wf(8, -1) + 0.2, 6, 'inout']], suf: ' meses', size: 56, col: 'txt', miles: false, pop: true, caja: [-130, -34, 260, 68] });
for (let i = 0; i < 6; i++) { const a = w(8, 6) + i * 0.16;
  E.obj('m3_' + i, 'moneda', { t0: a, t1: a + 0.8, entra: 0.08, sale: 0.15, r: 20, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, -190], [a + 0.75, 180, 'inout']], y: [[a, -290], [a + 0.38, -370], [a + 0.75, -180, 'in']] }); }
// «ganas menos de lo que esperabas»: la barra se queda lejos de la marca
E.obj('esperado', 'barra', { t0: w(9, 0) + 0.15, t1: w(10, 6), sale: 0.2, x: 180, y: -390, w: 400, h: 44, pop: true,
  f: [[w(9, 0), 0], [w(9, 5), 0.8, 'out'], [w(9, 10), 0.35, 'inout']], marca: 0.8, rotMarca: 'LO QUE ESPERABAS', caja: [-200, -105, 400, 130] });
E.temblor(w(9, 6), 8, 0.35);
E.obj('rayos3', 'rayos', { t0: w(10, 2), t1: TC, x: 180, y: -150, r: 320, z: -2, p: [[w(10, 2), 0], [w(10, 5), 1, 'out']], inspeccion: false });
E.obj('ch3', 'chispas', { t0: w(10, 3), t1: w(10, 3) + 0.8, x: 180, y: -150, r0: 130, r1: 240, inspeccion: false });
E.golpe(w(10, 3), 0.04); E.destello(w(10, 3), 0.12);

// ---------- cierre: resumen y envío ----------
// 11: Hacerlo(0) así(1) no(2) es(3) tirarse(4) al(5) vacío(6) es(7) comprobar(8) que(9) hay(10) suelo(11) antes(12) de(13) cada(14) paso(15)
// 12: Mándaselo(0) a(1) ese(2) amigo(3) que(4) lleva(5) años(6) con(7) la(8) idea(9) en(10) un(11) cajón(12)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(12, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(11, 8), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(12, 0), capa: 'pantalla', x: 540, y: 960, items: ['Vender', 'Tardes', 'Colchón'], gap: 230,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(11, 11)], caja: [-360, -60, 720, 200] });
E.obj('confC', 'confeti', { t0: wf(11, -1), t1: wf(11, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(11, -1), 0.22); E.golpe(wf(11, -1), 0.04);
E.figura('yoF', { t0: w(12, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(12, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(12, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(12, 9)], vuelo: [[wf(12, -1), 0], [wf(12, -1) + 0.5, 1, 'in']] });
