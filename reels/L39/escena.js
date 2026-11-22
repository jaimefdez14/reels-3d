// L39 · La aversión a la pérdida (estilo B; reglas 15, 20, 21, 24)
// Gancho visual: el cliente gris dice «Me lo pienso y te digo» (bocadillo, sin voz) y se va; el móvil se queda sin avisos
// mientras pasan los días. Comprar cuesta dinero (la pila baja) y esperar no cuesta nada; perder cien euros llena la barra
// casi el doble que ganarlos. Kahneman y Tversky; tres monedas.
// Puntos: 1) los meses de espera llenan el tarro de LO QUE PIERDE y el contador rueda a −300 €;
// 2) el producto pasa a manos del cliente, la semana de prueba se ilumina día a día y nace un corazón que no suelta;
// 3) la pila del precio de HOY y la del MES QUE VIENE, que crece; el reloj se rellena hasta la subida.
// Cierre: resumen 1-3 y vuelta al gancho (PERDER contra GANAR), envío.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(2, 13), gap: 70, y: 360 } });

// «La primera: // …» → T en «La», S en la primera palabra del punto
const N = [3, 5, 7].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(9, 0) - 0.1;   // remate y resumen
const ROJO = '#e4574f';

E.camara([
  [0, [0, -380, 1.04]], [w(0, 7), [0, -385, 1.06]], [w(1, 0), [0, -380, 1.02]], [w(1, 7), [10, -385, 1.04]], [w(1, 17), [0, -390, 1.06]],
  [w(2, 0), [0, -380, 1.02]], [w(2, 8), [-15, -385, 1.04]], [w(2, 13), [0, -390, 1.06]], [N[0].T, [0, -390, 1.05]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [-15, -385, 1.03]], [w(4, 11), [10, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 0), [-15, -385, 1.04]], [w(6, 9), [15, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(7, 8), [15, -385, 1.04]], [w(8, 9), [0, -390, 1.06]], [TC - 0.1, [0, -385, 1.04]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Tu(0) cliente(1) dice(2) que(3) se(4) lo(5) pensará(6) y(7) no(8) vuelve(9) a(10) escribir(11)   [bocadillo «Me lo pienso y te digo.»]
// 1: Comprar(0) le(1) cuesta(2) dinero(3) y(4) esperar(5) nada(6) Perder(7) cien(8) euros(9) duele(10) casi(11) el(12) doble(13) de(14) lo(15) que(16) alegra(17) ganarlos(18)
// 2: Se(0) llama(1) aversión(2) a(3) la(4) pérdida(5) lo(6) midieron(7) Kahneman(8) y(9) Tversky(10) y(11) hay(12) tres(13) formas(14) de(15) usarla(16) al(17) vender(18)
// el vendedor (amarillo) a la derecha, el cliente (gris) a la izquierda: su bocadillo apunta hacia él
E.figura('yo', { t0: 0, t1: fin(0), x: 360, dir: -1, cara: true,
  poses: [[0, 'ofrecer'], [w(0, 7), 'de_pie'], [w(0, 9), 'encoger'], [w(1, 0), 'senalar'], [w(1, 5), 'encoger'], [w(1, 7), 'de_pie'], [w(1, 10), 'triste'],
    [w(1, 17), 'celebrar'], [w(2, 0), 'de_pie'], [w(2, 2), 'senalar'], [w(2, 11), 'de_pie'], [w(2, 13), 'senalar'], [w(2, 18), 'celebrar']],
  sonrisa: [[0, 1], [w(0, 7), 0], [w(0, 9), -1], [w(1, 0), 0], [w(1, 5), -0.6], [w(1, 10), -1.3], [w(1, 17), 1.2], [w(2, 2), 0.3], [w(2, 18), 1.5]] });
E.figura('cli', { t0: 0, t1: w(0, 9) + 0.4, sale: 0.35, x: [[0, -370], [w(0, 7), -370], [w(0, 9) + 0.5, -420, 'in']], dir: [[0, 1], [w(0, 7), 1], [w(0, 7) + 0.05, -1]],
  color: 'gris', cara: true, poses: [[0, 'pensar'], [w(0, 7), 'andar']] });
E.obj('bocaCli', 'bocadillo', { t0: 0.3, t1: w(0, 8), sale: 0.2, x: -40, y: -480, w: 400, h: 80, texto: 'Me lo pienso y te digo.', size: 28, pop: true,
  on: [[0.3, 0], [0.8, 1]], caja: [-200, -40, 400, 106] });
// el producto y su botón de comprar, entre los dos
E.obj('prod0', 'compra', { t0: 0.1, t1: w(1, 7) + 0.1, sale: 0.25, x: 30, y: -180, w: 230, h: 300, pop: true,
  espera: [[0, 0], [w(0, 7), 0], [w(0, 9), 1], [w(1, 0), 1], [w(1, 0) + 0.2, 0], [w(1, 5), 0], [w(1, 5) + 0.2, 1]], pulsa: [[w(1, 0), 0], [w(1, 0) + 0.15, 1], [w(1, 0) + 0.35, 0]],
  caja: [-115, -150, 230, 300] });
// «y no vuelve a escribir»: en su sitio queda un móvil sin avisos; los días pasan
E.obj('movil0', 'telefono', { t0: w(0, 9), t1: w(1, 0) + 0.1, sale: 0.25, x: -330, y: -190, w: 150, h: 260, pop: true, avisos: 0,
  brillo: [[w(0, 9), 1], [w(1, 0), 0.3]], caja: [-75, -130, 150, 260] });
E.obj('dias0', 'dias', { t0: w(0, 10), t1: w(1, 0) + 0.1, sale: 0.25, x: -130, y: -420, letras: ['L', 'M', 'X', 'J', 'V'], gap: 76, pop: true,
  luz: [[w(0, 11), 0], [w(1, 0) - 0.1, 4, 'lin']], caja: [-185, -32, 370, 64] });
E.obj('rotSin', 'rotulo', { t0: w(0, 11), t1: w(1, 0) + 0.1, sale: 0.25, x: -130, y: -500, texto: 'NI UN MENSAJE', size: 24, col: '#9a9c9b', pop: true, caja: [-120, -16, 240, 32] });
E.temblor(w(0, 11), 8, 0.35);
// «Comprar le cuesta dinero»: la pila baja y las monedas vuelan al producto; «y esperar, nada»: no se mueve nada
E.obj('pila0', 'pila', { t0: w(1, 0) + 0.12, t1: w(1, 7) - 0.05, sale: 0.25, x: -300, n: 7, w: 160, hh: 26, pop: true,
  k: [[w(1, 0) + 0.12, 0], [w(1, 0) + 0.5, 7, 'out'], [w(1, 2), 7], [w(1, 3) + 0.3, 4, 'inout']], caja: [-80, -160, 160, 160], refl: true });
for (let i = 0; i < 3; i++) { const a = w(1, 2) + i * 0.15;
  E.obj('paga' + i, 'moneda', { t0: a, t1: a + 0.7, entra: 0.05, sale: 0.12, r: 22, n: '', libre: true, estela: 5, sfx: i === 0, inspeccion: false,
    x: [[a, -300], [a + 0.6, 30, 'inout']], y: [[a, -120], [a + 0.3, -300], [a + 0.6, -200, 'in']] }); }
E.obj('rotCompra', 'rotulo', { t0: w(1, 0) + 0.15, t1: w(1, 7) - 0.12, sale: 0.2, x: -100, y: -440, pop: true,
  texto: [[0, 'COMPRAR: PAGA'], [w(1, 5), 'ESPERAR: GRATIS']], size: 30, col: '#e6ce46', caja: [-160, -18, 320, 36] });
E.golpe(w(1, 3), 0.03);
// «Perder cien euros duele casi el doble de lo que alegra ganarlos»: dos barras que se rellenan
E.obj('barP', 'relleno', { t0: w(1, 7) - 0.1, t1: w(2, 0), sale: 0.2, x: -160, y: -420, w: 340, h: 50, pop: true, rotulo: 'PERDER 100 €',
  f: [[w(1, 10) - 0.05, 0], [w(1, 10) + 0.6, 0.95, 'out']], caja: [-170, -60, 340, 90] });
E.obj('barG', 'relleno', { t0: w(1, 13), t1: w(2, 0), sale: 0.2, x: -160, y: -260, w: 340, h: 50, pop: true, rotulo: 'GANAR 100 €',
  f: [[w(1, 17) - 0.05, 0], [w(1, 17) + 0.5, 0.5, 'out']], caja: [-170, -60, 340, 90] });
E.sfx(w(1, 10), 'fill'); E.sfx(w(1, 17), 'fill');
E.obj('doble', 'rotulo', { t0: w(1, 11), t1: w(2, 0), sale: 0.2, x: 120, y: -420, texto: 'CASI ×2', size: 34, col: ROJO, pop: true, caja: [-75, -20, 150, 40] });
E.temblor(w(1, 10) + 0.3, 12, 0.4);
E.obj('chG', 'chispas', { t0: w(1, 17) + 0.5, t1: w(1, 17) + 1.2, x: -160, y: -260, r0: 40, r1: 110, inspeccion: false });
// «Se llama aversión a la pérdida: lo midieron Kahneman y Tversky»
E.obj('nombre', 'rotulo', { t0: w(2, 2) - 0.1, t1: w(2, 12), sale: 0.2, x: -60, y: -470, texto: 'AVERSIÓN A LA PÉRDIDA', size: 38, col: '#e6ce46', peso: 700, track: 2, pop: true, caja: [-280, -24, 560, 48] });
E.obj('rayosN', 'rayos', { t0: w(2, 2), t1: w(2, 12), sale: 0.2, x: -60, y: -470, r: 300, z: -2, p: [[w(2, 2), 0], [w(2, 5), 0.8, 'out']], inspeccion: false });
E.golpe(w(2, 2), 0.05); E.destello(w(2, 2), 0.12);
[[-280, 'KAHNEMAN', w(2, 8)], [-60, 'TVERSKY', w(2, 10)]].forEach(([x, s, a], i) => {
  E.figura('sabio' + i, { t0: a - 0.1, t1: w(2, 12), sale: 0.25, x, talla: 300, dir: 1, color: 'gris', cara: true,
    poses: [[0, 'de_pie'], [a + 0.2, i ? 'senalar' : 'pensar']] });
  E.obj('rotS' + i, 'rotulo', { t0: a, t1: w(2, 12), sale: 0.2, x, y: 42, texto: s, size: 24, col: '#c9ccca', pop: true, caja: [-90, -15, 180, 30] });
});
// «hay tres formas de usarla al vender»: tres monedas; la primera se queda y abre el primer punto
[0, 1, 2].forEach(i => { const a = w(2, 13) + i * 0.12;
  E.obj('tres' + i, 'moneda', { t0: a, t1: i === 0 ? fin(0) : N[0].T - 0.05, sale: 0.2, sobrevive: i === 0, x: -60 + (i - 1) * 120, y: -330, r: 40, n: i + 1, pop: true, sfx: i === 0, inspeccion: false,
    luz: [[0, 1], [w(2, 18), 1], [w(2, 18) + 0.3, i === 0 ? 1 : 0.35]], s: i === 0 ? [[0, 1], [w(2, 18), 1], [w(2, 18) + 0.35, 1.3, 'back']] : 1, barrido: i === 0 ? [wf(2, -1)] : null }); });
E.obj('rayosH', 'rayos', { t0: w(2, 13), t1: fin(0), x: -180, y: -330, r: 300, z: -2, p: [[w(2, 13), 0], [w(2, 18), 0.9, 'out']], inspeccion: false });
E.obj('chH', 'chispas', { t0: w(2, 18), t1: w(2, 18) + 0.8, x: -180, y: -330, r0: 50, r1: 130, inspeccion: false });

// ---------- 1 · cuéntale lo que pierde si no compra ----------
// 3: La(0) primera(1) cuéntale(2) lo(3) que(4) pierde(5) si(6) no(7) compra(8)
// 4: No(0) le(1) digas(2) cuánto(3) va(4) a(5) ahorrar(6) dile(7) lo(8) que(9) pierde(10) cada(11) mes(12) que(13) espera(14) 300(15) euros(16) por(17) ejemplo(18)
E.numero(1, N[0].T, N[0].S, { desde: 'tres0', hacia: 'tarroP' });
const TP = 170;
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -370, cara: true,
  poses: [[0, 'de_pie'], [w(3, 2), 'senalar'], [w(3, 7), 'ofrecer'], [w(4, 0), 'encoger'], [w(4, 7), 'senalar'], [w(4, 15), 'ofrecer'], [wf(4, -1), 'celebrar']],
  sonrisa: [[w(3, 2), 0.5], [w(4, 0), -0.4], [w(4, 7), 0.5], [wf(4, -1), 1.4]] });
E.figura('cli1', { t0: N[0].S - 0.1, t1: fin(1), x: 390, dir: -1, color: 'gris', cara: true,
  poses: [[0, 'de_pie'], [w(3, 5), 'pensar'], [w(4, 0), 'de_pie'], [w(4, 12), 'pensar'], [w(4, 15), 'manos_cabeza']] });
E.obj('tarroP', 'tarro', { t0: N[0].S - 0.1, t1: fin(1), x: TP, w: 180, h: 240, rotulo: 'LO QUE PIERDE', pop: true, sobrevive: true, r: 70, oy: -120,
  nivel: [[w(3, 5), 0], [w(3, 8) + 0.3, 0.12, 'out'], [w(4, 11), 0.12], [w(4, 11) + 0.6, 0.4, 'out'], [w(4, 12) + 0.6, 0.7, 'out'], [w(4, 14) + 0.6, 1, 'out']],
  barrido: [w(4, 15)], caja: [-90, -240, 180, 240], refl: true });
E.obj('rotSiNo', 'rotulo', { t0: w(3, 6) - 0.1, t1: w(4, 0), sale: 0.2, x: -100, y: -440, texto: 'SI NO COMPRA…', size: 30, col: '#e6ce46', pop: true, caja: [-130, -18, 260, 36] });
E.sfx(w(3, 8), 'fill');
// «No le digas cuánto va a ahorrar»: el ahorro sale en gris y se apaga
E.obj('rotAhorra', 'rotulo', { t0: w(4, 2), t1: w(4, 10) - 0.15, sale: 0.2, x: -100, y: -440, texto: 'CUÁNTO AHORRA', size: 30, col: '#9a9c9b', pop: true,
  luz: [[0, 1], [w(4, 7), 1], [w(4, 7) + 0.3, 0.3]], caja: [-140, -18, 280, 36] });
E.obj('pilaA', 'pila', { t0: w(4, 2), t1: w(4, 10) - 0.15, sale: 0.2, x: -100, n: 4, w: 150, hh: 26, pop: true,
  k: [[w(4, 2), 0], [w(4, 6), 4, 'out']], luz: [[0, 1], [w(4, 7), 1], [w(4, 7) + 0.3, 0.3]], caja: [-75, -92, 150, 92], refl: true });
// «dile lo que pierde cada mes que espera»: cada mes se enciende y una moneda cae en el tarro
E.obj('meses1', 'dias', { t0: w(4, 10) + 0.05, t1: fin(1), x: -110, y: -440, letras: ['ENE', 'FEB', 'MAR'], gap: 100, pop: true,
  luz: [[w(4, 10), -1], [w(4, 11), 0], [w(4, 12), 1], [w(4, 14), 2]], caja: [-135, -32, 270, 64] });
E.obj('rotMes', 'rotulo', { t0: w(4, 11), t1: fin(1), x: -110, y: -365, texto: 'CADA MES QUE ESPERA', size: 22, col: '#9a9c9b', pop: true, caja: [-150, -15, 300, 30] });
[w(4, 11), w(4, 12), w(4, 14)].forEach((a, i) => {
  const mx = -210 + i * 100;
  E.obj('m1_' + i, 'moneda', { t0: a, t1: a + 0.7, entra: 0.05, sale: 0.12, r: 22, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, mx], [a + 0.6, TP, 'inout']], y: [[a, -440], [a + 0.3, -470], [a + 0.6, -200, 'in']] });
  E.golpe(a + 0.6, 0.015); });
E.sfx(w(4, 11), 'fill');
// «300 euros, por ejemplo»: el contador rueda hasta −300 € al mes
E.obj('cuenta1', 'contador', { t0: w(4, 15) - 0.15, t1: fin(1), x: TP, y: -305, pop: true, pre: '−', suf: ' €', size: 56, col: ROJO, miles: false,
  v: [[w(4, 15), 0], [w(4, 16) + 0.2, 300, 'out']], caja: [-120, -34, 240, 68] });
E.obj('ch1', 'chispas', { t0: w(4, 16) + 0.2, t1: w(4, 16) + 1, x: TP, y: -120, r0: 100, r1: 200, inspeccion: false });
E.golpe(w(4, 16) + 0.2, 0.04); E.temblor(w(4, 16) + 0.25, 10, 0.35);

// ---------- 2 · deja que lo pruebe ----------
// 5: La(0) segunda(1) deja(2) que(3) lo(4) pruebe(5)
// 6: Dale(0) una(1) semana(2) de(3) prueba(4) o(5) una(6) primera(7) sesión(8) Lo(9) que(10) ya(11) siente(12) como(13) suyo(14) no(15) lo(16) quiere(17) soltar(18)
E.numero(2, N[1].T, N[1].S, { desde: 'tarroP', hacia: 'prod2' });
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -360, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'ofrecer'], [w(5, 5) + 0.3, 'de_pie'], [w(6, 0), 'senalar'], [w(6, 5), 'ofrecer'], [w(6, 9), 'de_pie'], [w(6, 15), 'coger'], [w(6, 17) + 0.3, 'celebrar']],
  sonrisa: [[w(5, 2), 0.6], [w(6, 0), 0.5], [w(6, 15), 0], [w(6, 17) + 0.3, 1.5]] });
E.figura('cli2', { t0: N[1].S - 0.1, t1: fin(2), x: 390, dir: -1, color: 'gris', cara: true, toca: ['prod2'],
  colorK: [[0, 0], [w(6, 12), 0], [w(6, 14), 0.35]],
  poses: [[0, 'de_pie'], [w(5, 4), 'coger'], [w(5, 5) + 0.4, 'ofrecer'], [w(6, 9), 'levantar'], [w(6, 15), 'apartarse']] });
// el producto pasa de la mano del vendedor a la del cliente
E.obj('prod2', 'compra', { t0: N[1].S - 0.1, t1: fin(2), x: [[0, -170], [w(5, 2), -170], [w(5, 5) + 0.3, 140, 'inout'], [w(6, 15), 140], [w(6, 16), 120], [w(6, 17), 160], [w(6, 18), 140]],
  y: -200, w: 200, h: 260, pop: true, boton: [[0, 'PROBAR'], [w(6, 12), 'ES MÍO']], ok: 0,
  caja: [-100, -130, 200, 260] });
E.sfx(w(5, 2) + 0.1, 'whoosh');
// «Dale una semana de prueba o una primera sesión»: la semana se ilumina día a día
E.obj('semana', 'dias', { t0: w(6, 0) - 0.1, t1: w(6, 9) + 0.1, sale: 0.25, x: -30, y: -440, letras: ['L', 'M', 'X', 'J', 'V', 'S', 'D'], gap: 70, pop: true,
  luz: [[w(6, 1), -1], [w(6, 4) + 0.6, 6, 'lin'], [w(6, 9), 6]], caja: [-245, -32, 490, 64] });
E.obj('rotPrueba', 'rotulo', { t0: w(6, 2), t1: w(6, 9) + 0.1, sale: 0.25, x: -30, y: -370, pop: true,
  texto: [[0, 'SEMANA DE PRUEBA'], [w(6, 5), 'O PRIMERA SESIÓN']], size: 26, col: '#e6ce46', caja: [-150, -16, 300, 32] });
E.obj('rell2', 'relleno', { t0: w(6, 0), t1: w(6, 9) + 0.1, sale: 0.25, x: -110, y: -60, w: 220, h: 34, pop: true,
  f: [[w(6, 1), 0], [w(6, 4) + 0.6, 1, 'lin']], caja: [-110, -20, 220, 40] });
E.sfx(w(6, 1), 'fill');
// «Lo que ya siente como suyo no lo quiere soltar»: nace un corazón sobre el producto
E.obj('corazon2', 'corazon', { t0: w(6, 11) - 0.1, t1: fin(2), x: 140, y: -420, r: [[w(6, 11), 30], [w(6, 14), 55, 'back'], [w(6, 17), 55], [w(6, 17) + 0.3, 65, 'back']], pop: true, sobrevive: true,
  caja: [-60, -55, 120, 115] });
E.obj('rotSuyo', 'rotulo', { t0: w(6, 13), t1: fin(2), x: -110, y: -440, texto: 'YA ES SUYO', size: 32, col: '#e6ce46', pop: true, caja: [-110, -18, 220, 36] });
E.obj('ch2', 'chispas', { t0: w(6, 14), t1: w(6, 14) + 0.8, x: 140, y: -420, r0: 60, r1: 150, inspeccion: false });
E.obj('pul2', 'pulso', { t0: w(6, 17), t1: w(6, 17) + 0.7, x: 140, y: -420, r0: 60, r1: 160, inspeccion: false });
E.golpe(w(6, 14), 0.04); E.sfx(w(6, 17), 'thud'); E.destello(w(6, 14), 0.12);

// ---------- 3 · si el precio va a subir, dile desde cuándo ----------
// 7: La(0) tercera(1) si(2) el(3) precio(4) va(5) a(6) subir(7) dile(8) desde(9) cuándo(10)
// 8: Si(0) sabe(1) que(2) el(3) mes(4) que(5) viene(6) cuesta(7) más(8) esperar(9) también(10) le(11) sale(12) caro(13)
E.numero(3, N[2].T, N[2].S, { desde: 'corazon2', hacia: 'pilaHoy' });
const PH = -160, PM = 120;
E.figura('yo3', { t0: N[2].S - 0.1, t1: TC, x: -365, cara: true,
  poses: [[0, 'de_pie'], [w(7, 4), 'senalar'], [w(7, 8), 'ofrecer'], [w(8, 0), 'senalar'], [w(8, 9), 'de_pie'], [wf(8, -1), 'celebrar']],
  sonrisa: [[w(7, 4), 0.3], [w(7, 8), 0.7], [w(8, 9), 0.4], [wf(8, -1), 1.4]] });
E.figura('cli3', { t0: N[2].S - 0.1, t1: TC, x: 400, dir: -1, color: 'gris', cara: true,
  poses: [[0, 'de_pie'], [w(7, 8), 'pensar'], [w(8, 4), 'de_pie'], [w(8, 9), 'manos_cabeza'], [wf(8, -1), 'ofrecer']] });
E.obj('pilaHoy', 'pila', { t0: N[2].S - 0.1, t1: TC, x: PH, n: 5, w: 150, hh: 26, pop: true,
  k: [[N[2].S, 0], [N[2].S + 0.5, 5, 'out']], caja: [-75, -116, 150, 116], refl: true });
E.obj('pilaMes', 'pila', { t0: w(7, 3) - 0.1, t1: TC, x: PM, n: 8, w: 150, hh: 26, pop: true,
  k: [[w(7, 3), 0], [w(7, 4) + 0.3, 5, 'out'], [w(7, 7), 5], [w(7, 7) + 0.5, 7, 'out'], [w(8, 7), 7], [w(8, 8) + 0.3, 8, 'out']], barrido: [w(8, 8) + 0.3], caja: [-75, -180, 150, 180], refl: true });
E.obj('rotHoy', 'rotulo', { t0: N[2].S, t1: TC, x: PH, y: 42, texto: 'HOY', size: 24, col: '#c9ccca', pop: true, caja: [-60, -15, 120, 30] });
E.obj('rotMesV', 'rotulo', { t0: w(7, 3), t1: TC, x: PM, y: 42, texto: [[0, 'DESPUÉS'], [w(8, 3), 'EL MES QUE VIENE']], size: 24, col: '#c9ccca', pop: true, caja: [-130, -15, 260, 30] });
E.obj('flecha3', 'flecha', { t0: w(7, 6), t1: w(8, 9), sale: 0.2, de: [PH + 40, -160], hasta: [PM - 30, -240], curva: -0.25, p: [[w(7, 6), 0], [w(7, 7) + 0.4, 1, 'out']], inspeccion: false });
E.obj('sube3', 'rotulo', { t0: w(7, 7), t1: w(8, 9), sale: 0.2, x: PM, y: -235, texto: 'SUBE', size: 28, col: ROJO, pop: true, caja: [-50, -17, 100, 34] });
E.sfx(w(7, 7), 'fill'); E.golpe(w(7, 7) + 0.4, 0.03);
// «dile desde cuándo»: el reloj se rellena hasta el día de la subida
E.obj('reloj3', 'relojAm', { t0: w(7, 8) - 0.1, t1: w(8, 9) - 0.1, sale: 0.2, x: -20, y: -430, r: 70, texto: '', pop: true,
  p: [[w(7, 9), 0], [w(8, 6), 1, 'inout']], caja: [-70, -70, 140, 140] });
E.obj('rotDesde', 'rotulo', { t0: w(7, 9), t1: w(8, 9), sale: 0.2, x: 210, y: -430, texto: 'DESDE…', size: 28, col: '#e6ce46', pop: true, caja: [-70, -17, 140, 34] });
E.obj('ch3a', 'chispas', { t0: w(8, 6), t1: w(8, 6) + 0.8, x: -20, y: -430, r0: 80, r1: 160, inspeccion: false });
// «esperar también le sale caro»: las monedas del cliente caen en la pila de después
E.obj('caro3', 'rotulo', { t0: w(8, 9) - 0.05, t1: TC, x: -20, y: -430, texto: 'ESPERAR SALE CARO', size: 34, col: ROJO, peso: 700, pop: true, caja: [-200, -20, 400, 40] });
for (let i = 0; i < 3; i++) { const a = w(8, 9) + i * 0.18;
  E.obj('m3_' + i, 'moneda', { t0: a, t1: a + 0.7, entra: 0.05, sale: 0.12, r: 22, n: '', libre: true, estela: 5, sfx: false, inspeccion: false,
    x: [[a, 300], [a + 0.6, PM, 'inout']], y: [[a, -300], [a + 0.3, -340], [a + 0.6, -200, 'in']] }); }
E.temblor(w(8, 12), 12, 0.4);
E.obj('ch3', 'chispas', { t0: w(8, 8) + 0.3, t1: w(8, 8) + 1.1, x: PM, y: -100, r0: 90, r1: 190, inspeccion: false });

// ---------- remate y resumen: vuelve al gancho ----------
// 9: La(0) gente(1) se(2) mueve(3) más(4) por(5) no(6) perder(7) que(8) por(9) ganar(10)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(9, 4), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, items: ['Lo que pierde', 'Que lo pruebe', 'Desde cuándo'], gap: 300,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(9, 7)], caja: [-450, -60, 900, 200] });
E.obj('barPC', 'relleno', { t0: w(9, 5) - 0.15, t1: w(10, 0), capa: 'pantalla', x: 520, y: 1320, w: 460, h: 50, pop: true, rotulo: 'NO PERDER',
  f: [[w(9, 6), 0], [w(9, 7) + 0.4, 0.95, 'out']], caja: [-230, -60, 460, 90] });
E.obj('barGC', 'relleno', { t0: w(9, 8) - 0.1, t1: w(10, 0), capa: 'pantalla', x: 520, y: 1460, w: 460, h: 50, pop: true, rotulo: 'GANAR',
  f: [[w(9, 9), 0], [w(9, 10) + 0.4, 0.5, 'out']], caja: [-230, -60, 460, 90] });
E.sfx(w(9, 6), 'fill');
E.obj('confC', 'confeti', { t0: wf(9, -1), t1: wf(9, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(9, -1), 0.22); E.golpe(wf(9, -1), 0.04);

// ---------- envío ----------
// 10: Mándaselo(0) a(1) ese(2) amigo(3) que(4) tiene(5) un(6) negocio(7) y(8) no(9) sabe(10) vender(11)
E.figura('yoF', { t0: w(10, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(10, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(10, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(10, 9)], vuelo: [[wf(10, -1), 0], [wf(10, -1) + 0.5, 1, 'in']] });
