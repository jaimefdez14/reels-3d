// L19 · Tres reglas para empezar a invertir, aunque ganes poco (estilo B; regla 15: satisfying)
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'degradado', sub: 'dos', subY: 680, polvo: true, gancho: { lineas: [0], escala: 1.25 }, progreso: { n: 3, estilo: 'barras', aparece: w(1, 10), gap: 70 } });

// T = «La primera / segunda / tercera», S = la escena nueva entra con el nombre del punto
const N = [2, 6, 8].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(10, 0) - 0.1; // resumen

E.camara([
  [0, [0, -380, 1]], [w(1, 0), [-20, -390, 1.05]], [N[0].T, [0, -395, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(3, 13), [30, -395, 1.04]], [w(5, 0), [30, -390, 1.05]], [N[1].T, [30, -390, 1.05]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(7, 0), [-20, -390, 1.05]], [N[2].T, [-20, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(9, 5), [10, -395, 1.05]], [TC, [0, -395, 1.05]],
]);

// ---------- gancho: el tarro de AHORRO vacío mientras los años pasan; lo que cuesta esperar sube en rojo ----------
// 0: Piensas(0) que(1) ya(2) ahorrarás(3) cuando(4) ganes(5) más.(6)
// 1: Y(0) esa(1) espera(2) es(3) lo(4) que(5) más(6) caro(7) te(8) sale.(9) Tres(10) reglas(11) para(12) empezar(13) a(14) invertir,(15) aunque(16) ganes(17) poco.(18)
E.figura('yo', { t0: 0, t1: fin(0), x: -300, cara: true,
  poses: [[0, 'pensar'], [w(0, 4), 'encoger'], [w(1, 0), 'de_pie'], [w(1, 6), 'manos_cabeza'], [w(1, 10), 'de_pie'], [w(1, 13), 'senalar']],
  sonrisa: [[0, 0.6], [w(1, 2), -0.4], [w(1, 7), -1.2], [w(1, 10), 0], [w(1, 16), 1.2]] });
E.obj('nube0', 'bocadillo', { t0: w(0, 3) - 0.05, t1: w(1, 0), sale: 0.2, x: -60, y: -540, w: 320, h: 76, texto: 'Ya ahorraré el año que viene', size: 25, pop: true, caja: [-160, -38, 320, 102] });
E.obj('tarro0', 'tarro', { t0: 0, t1: w(1, 10), sale: 0.25, x: 150, w: 200, h: 270, rotulo: 'AHORRO', apagado: 1, nivel: 0, caja: [-100, -270, 200, 270], refl: true });
E.obj('anios0', 'contador', { t0: 0.1, t1: w(1, 10), sale: 0.2, x: 150, y: -360, v: [[0.3, 2026], [w(1, 0), 2031, 'inout'], [w(1, 9), 2036, 'inout']], size: 60, col: 'txt', miles: false, caja: [-110, -36, 220, 72] });
E.obj('cuesta0', 'contador', { t0: w(1, 2), t1: w(1, 10), sale: 0.2, x: 150, y: -460, v: [[w(1, 2), 0], [w(1, 9), 100000, 'inout']], pre: '−', suf: ' €', size: 62, col: '#e4574f', pop: true, caja: [-190, -38, 380, 76] });
E.temblor(w(1, 7), 14, 0.45); E.golpe(w(1, 7), 0.05);
// «Tres reglas»: tres monedas; «aunque ganes poco»: la primera brilla con «100 €»
[0, 1, 2].forEach(i => { const a = w(1, 10) + i * 0.12;
  E.obj('regla' + i, 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: 150 + (i - 1) * 110, y: -420, r: 38, n: i + 1, pop: true, sfx: i === 0, inspeccion: false,
    luz: [[0, 1], [w(1, 16), 1], [w(1, 16) + 0.3, i === 0 ? 1 : 0.35]], s: i === 0 ? [[0, 1], [w(1, 16), 1], [w(1, 16) + 0.35, 1.3, 'back']] : 1, barrido: i === 0 ? [w(1, 17)] : null }); });
E.obj('poco0', 'rotulo', { t0: w(1, 16), t1: N[0].T - 0.05, sale: 0.2, x: 150, y: -300, texto: '100 € AL MES', size: 28, col: '#e6ce46', pop: true, caja: [-110, -16, 220, 32] });
E.obj('rayosH', 'rayos', { t0: w(1, 10), t1: fin(0), x: 150, y: -420, r: 380, z: -2, p: [[w(1, 10), 0], [w(1, 13), 0.9, 'out']], inspeccion: false });

// ---------- 1 · empieza ya: dos montones que crecen a la vez (desde los 25 y desde los 35) ----------
// 2: La(0) primera:(1) empieza(2) ya,(3) con(4) lo(5) que(6) puedas.(7)
// 3: Si(0) inviertes(1) cien(2) euros(3) al(4) mes(5) desde(6) los(7) 25,(8) al(9) 6(10) %(11) anual,(12) a(13) los(14) 65(15) tendrás(16) unos(17) 200.000(18) euros.(19)
// 4: Si(0) empiezas(1) a(2) los(3) 35,(4) te(5) quedas(6) en(7) la(8) mitad.(9)
// 5: Esos(0) diez(1) años(2) de(3) espera(4) te(5) cuestan(6) unos(7) cien(8) mil(9) euros.(10)
E.numero(1, N[0].T, N[0].S, { desde: 'regla0', hacia: 'pilaA' });
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -350, cara: true, toca: ['pilaA'],
  poses: [[0, 'de_pie'], [w(2, 2), 'senalar'], [w(3, 1), 'ofrecer'], [w(3, 16), 'celebrar'], [w(4, 0), 'senalar'], [w(5, 6), 'manos_cabeza'], [wf(5, -1), 'de_pie']],
  sonrisa: [[w(2, 2), 0.8], [w(3, 16), 1.5], [w(4, 5), 0], [w(5, 6), -1]] });
const A = { x: -90 }, B = { x: 240 };
E.obj('pilaA', 'pila', { t0: N[0].S - 0.1, t1: fin(1), x: A.x, n: 10, w: 170, hh: 26, sobrevive: true, r: 70, oy: -120,
  k: [[N[0].S, 0], [N[0].S + 0.5, 1, 'out'], [w(3, 13), 1], [wf(3, -1), 10, 'inout']], barrido: [wf(3, -1)], caja: [-85, -265, 170, 265], refl: true });
E.obj('pilaB', 'pila', { t0: w(4, 0) - 0.2, t1: fin(1), x: B.x, n: 10, w: 170, hh: 26, pop: true,
  k: [[w(4, 0), 0], [w(4, 0) + 0.15, 0], [wf(4, -1), 5, 'inout']], caja: [-85, -140, 170, 140], refl: true });
E.obj('rotA', 'rotulo', { t0: N[0].S, t1: fin(1), x: A.x, y: -420, texto: 'DESDE LOS 25', size: 24, col: '#c9ccca', pop: true, caja: [-95, -15, 190, 30] });
E.obj('rotB', 'rotulo', { t0: w(4, 0) - 0.2, t1: fin(1), x: B.x, y: -420, texto: 'DESDE LOS 35', size: 24, col: '#c9ccca', pop: true, caja: [-95, -15, 190, 30] });
E.obj('cuentaA', 'contador', { t0: w(3, 1), t1: fin(1), x: A.x, y: -340, v: [[w(3, 2), 0], [w(3, 13), 1200, 'out'], [wf(3, -1), 199149, 'inout']], suf: ' €', size: 46, col: 'txt', pop: true,
  caja: [-150, -28, 300, 56] });
E.obj('cuentaB', 'contador', { t0: w(4, 0), t1: fin(1), x: B.x, y: -340, v: [[w(4, 1), 0], [wf(4, -1), 100452, 'inout']], suf: ' €', size: 46, col: 'txt', pop: true, caja: [-150, -28, 300, 56] });
E.obj('edad', 'contador', { t0: w(3, 6) - 0.1, t1: w(4, 0), sale: 0.2, x: 130, y: -530, v: [[w(3, 7), 25], [w(3, 15), 65, 'inout']], pre: 'edad ', size: 40, col: '#c9ccca', miles: false, pop: true,
  caja: [-120, -24, 240, 48] });
E.obj('anual', 'rotulo', { t0: w(3, 9), t1: w(4, 0), sale: 0.2, x: 130, y: -480, texto: '6 % AL AÑO', size: 24, col: '#e6ce46', pop: true, caja: [-85, -15, 170, 30] });
for (let i = 0; i < 6; i++) { const a = w(3, 1) + i * 0.22;
  E.obj('m1_' + i, 'moneda', { t0: a, t1: a + 0.8, entra: 0.06, sale: 0.15, r: 20, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, -330], [a + 0.75, A.x, 'inout']], y: [[a, -260], [a + 0.38, -520], [a + 0.75, -120, 'in']] }); }
// «la mitad»: destello; «cien mil euros»: la diferencia sale en rojo entre los dos montones
E.obj('mitad', 'flecha', { t0: wf(4, -1) - 0.3, t1: fin(1), de: [B.x - 100, -140], hasta: [A.x + 100, -140], curva: 0, col: '#e4574f', w: 4, discontinua: true, punta: false, p: [[wf(4, -1) - 0.3, 0], [wf(4, -1) + 0.2, 1]], inspeccion: false });
E.obj('perdida', 'contador', { t0: w(5, 0), t1: fin(1), x: B.x, y: -200, v: [[w(5, 1), 0], [w(5, 8), 100000, 'inout']], pre: '−', suf: ' €', size: 50, col: '#e4574f', pop: true, caja: [-150, -30, 300, 60] });
E.temblor(w(5, 8), 16, 0.5); E.golpe(w(5, 8), 0.05);
E.obj('chA', 'chispas', { t0: wf(3, -1), t1: wf(3, -1) + 0.8, x: A.x, y: -200, r0: 100, r1: 200, inspeccion: false });
E.sfx(w(3, 13), 'fill'); E.sfx(w(4, 1), 'fill');

// ---------- 2 · que salga solo el día que cobras: la nómina entra y una parte vuela sola al tarro INVERSIÓN ----------
// 6: La(0) segunda:(1) que(2) el(3) ahorro(4) salga(5) solo,(6) el(7) mismo(8) día(9) que(10) cobras.(11)
// 7: Programa(0) una(1) transferencia(2) automática(3) a(4) una(5) cuenta(6) de(7) inversión.(8) Lo(9) que(10) no(11) ves,(12) no(13) te(14) lo(15) gastas.(16)
E.numero(2, N[1].T, N[1].S, { desde: 'pilaA', hacia: 'nomina' });
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -400, cara: true, toca: ['nomina'],
  poses: [[0, 'de_pie'], [w(6, 5), 'senalar'], [w(7, 0), 'escribir'], [w(7, 4), 'de_pie'], [w(7, 9), 'senalar'], [w(7, 13), 'celebrar']],
  sonrisa: [[w(6, 5), 0.4], [w(7, 9), 0.6], [w(7, 13), 1.5]] });
E.obj('nomina', 'etiqueta', { t0: N[1].S - 0.1, t1: fin(2), x: -110, y: -380, w: 280, h: 110, sobrevive: true, r: 70,
  v: [[N[1].S, 0], [N[1].S + 0.6, 1500, 'out'], [w(6, 9), 1500], [wf(6, -1), 1400, 'inout']], caja: [-140, -55, 280, 110] });
E.obj('rotNom', 'rotulo', { t0: N[1].S, t1: fin(2), x: -110, y: -470, texto: 'NÓMINA', size: 24, col: '#c9ccca', caja: [-70, -15, 140, 30] });
E.obj('diaCobro', 'dias', { t0: w(6, 7) - 0.2, t1: fin(2), x: -40, y: -180, letras: ['26', '27', '28', '29', '30'], gap: 86, pop: true,
  luz: [[w(6, 7), 0], [w(6, 9), 2, 'inout']], caja: [-210, -32, 420, 64] });
E.obj('tarro2', 'tarro', { t0: N[1].S + 0.2, t1: fin(2), x: 300, w: 200, h: 280, rotulo: 'INVERSIÓN', pop: true, nivel: [[wf(6, -1), 0], [w(7, 8), 0.35, 'inout'], [wf(7, -1), 0.8, 'inout']],
  tapa: [[w(7, 11), 0], [w(7, 14), 1, 'out']], barrido: [wf(7, -1)], caja: [-100, -280, 200, 280], refl: true });
E.obj('fl2', 'flecha', { t0: w(6, 5) - 0.1, t1: fin(2), de: [30, -420], hasta: [250, -320], curva: -0.3, discontinua: true, p: [[w(6, 5), 0], [w(6, 6) + 0.2, 1, 'out']], inspeccion: false });
E.obj('meses', 'contador', { t0: w(7, 2), t1: fin(2), x: 340, y: -410, v: [[w(7, 2), 1], [wf(7, -1), 12, 'inout']], pre: 'mes ', size: 40, col: 'txt', miles: false, pop: true, caja: [-100, -24, 200, 48] });
for (let i = 0; i < 7; i++) { const a = w(6, 9) + i * (i === 0 ? 0 : 0.55);
  E.obj('m2_' + i, 'moneda', { t0: a, t1: a + 0.8, entra: 0.06, sale: 0.15, r: 22, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, -110], [a + 0.75, 300, 'inout']], y: [[a, -390], [a + 0.38, -560], [a + 0.75, -150, 'in']] }); }
E.golpe(w(7, 14), 0.04);
E.obj('ch2', 'chispas', { t0: wf(7, -1) - 0.1, t1: wf(7, -1) + 0.7, x: 300, y: -160, r0: 120, r1: 220, inspeccion: false });
E.sfx(wf(6, -1), 'fill');

// ---------- 3 · no lo toques cuando la bolsa baje: la línea cae, el muñeco quiere sacarlo, aguanta y se recupera ----------
// 8: La(0) tercera:(1) no(2) toques(3) lo(4) invertido(5) cuando(6) la(7) bolsa(8) baje.(9)
// 9: Habrá(0) años(1) en(2) que(3) baje.(4) Si(5) vendes(6) por(7) miedo,(8) esa(9) bajada(10) se(11) convierte(12) en(13) una(14) pérdida(15) de(16) verdad.(17) [bocadillo «Lo saco antes de que baje más»]
E.numero(3, N[2].T, N[2].S, { desde: 'nomina', hacia: 'valor' });
E.figura('yo3', { t0: N[2].S - 0.1, t1: TC, x: -340, cara: true,
  poses: [[0, 'de_pie'], [w(8, 2), 'senalar'], [w(9, 0), 'manos_cabeza'], [w(9, 5), 'ofrecer'], [w(9, 11), 'apartarse'], [wf(9, -1), 'celebrar']],
  sonrisa: [[w(8, 2), 0.3], [w(9, 0), -1.2], [w(9, 11), 0], [wf(9, -1), 1.5]] });
// gráfica: tres tramos (sube, cae en rojo, se recupera) sobre una base
const G = [[-180, -150], [0, -300], [130, -170], [330, -330]];
E.obj('base3', 'flecha', { t0: N[2].S, t1: TC, de: [-200, -110], hasta: [350, -110], curva: 0, col: '#56605a', w: 3, punta: false, p: [[N[2].S, 0], [N[2].S + 0.4, 1]], inspeccion: false });
E.obj('tr1', 'flecha', { t0: N[2].S + 0.1, t1: TC, de: G[0], hasta: G[1], curva: 0.05, punta: false, w: 6, p: [[N[2].S + 0.1, 0], [w(8, 6), 1, 'out']], inspeccion: false });
E.obj('tr2', 'flecha', { t0: w(8, 8), t1: TC, de: G[1], hasta: G[2], curva: -0.05, punta: false, w: 6, col: '#e4574f', p: [[w(8, 8), 0], [w(9, 4), 1, 'inout']], inspeccion: false });
E.obj('tr3', 'flecha', { t0: w(9, 12), t1: TC, de: G[2], hasta: G[3], curva: 0.08, w: 6, p: [[w(9, 12), 0], [wf(9, -1), 1, 'inout']], inspeccion: false });
E.obj('valor', 'contador', { t0: N[2].S, t1: TC, x: 300, y: -415, sobrevive: true, r: 60,
  v: [[N[2].S, 10000], [w(8, 6), 10000], [w(9, 4), 7000, 'inout'], [w(9, 12), 7000], [wf(9, -1), 12400, 'inout']], suf: ' €', size: 56, col: 'txt', caja: [-150, -34, 300, 68] });
E.obj('baja', 'rotulo', { t0: w(9, 0), t1: w(9, 12), sale: 0.2, x: 70, y: -350, texto: '−30 %', size: 34, col: '#e4574f', pop: true, caja: [-60, -20, 120, 40] });
E.obj('nube3', 'bocadillo', { t0: w(9, 5) - 0.05, t1: w(9, 11), sale: 0.2, x: 20, y: -535, w: 370, h: 76, texto: 'Lo saco antes de que baje más', size: 24, pop: true, caja: [-185, -38, 370, 102] });
E.obj('aguanta', 'relleno', { t0: w(9, 9) - 0.2, t1: TC, x: 60, y: -40, w: 380, h: 46, rotulo: 'AGUANTAS', f: [[w(9, 11), 0], [wf(9, -1), 1, 'inout']], barrido: [wf(9, -1)], caja: [-190, -60, 380, 85] });
E.temblor(w(9, 4), 12, 0.4);
E.obj('ch3', 'chispas', { t0: wf(9, -1), t1: wf(9, -1) + 0.8, x: 330, y: -330, r0: 60, r1: 160, inspeccion: false });
E.destello(wf(9, -1), 0.15);
E.sfx(w(9, 11), 'fill');

// ---------- cierre: resumen de las tres y envío ----------
// 10: Al(0) final,(1) pesa(2) más(3) empezar(4) pronto(5) que(6) poner(7) mucho.(8)
E.obj('resumen', 'resumen', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, items: ['Pronto', 'Automático', 'Sin tocar'], gap: 240,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], caja: [-370, -60, 740, 300] });
E.obj('rayosF', 'rayos', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, r: 460, z: -2, p: [[w(10, 2), 0], [w(10, 5), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('confF', 'confeti', { t0: wf(10, -1) - 0.3, t1: wf(10, -1) + 1.8, capa: 'pantalla', x: 540, y: 880, n: 44, inspeccion: false, sinDim: true });
E.figura('yoF', { t0: w(11, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(11, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(11, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, vuelo: [[wf(11, -1), 0], [wf(11, -1) + 0.5, 1, 'in']] });
