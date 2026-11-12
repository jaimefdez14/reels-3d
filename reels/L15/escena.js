// L15 · Llevas dos años con el mismo sueldo: tres pasos para pedir una subida (estilo B; reglas 15, 19, 20, 23)
// Gancho visual (REDACCION §2c): fotograma 0 con el muñeco, el jefe de espaldas, los meses que suben y una etiqueta de sueldo que no se mueve.
// Regla 20: «Me gustaría hablar de mi sueldo» va en bocadillo del muñeco; la voz solo narra.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(1, 0), gap: 70, y: 360 } });

// «El primero: // …» → T en «El», S en la primera palabra del paso
const N = [2, 5, 7].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(10, 0) - 0.1;

E.camara([
  [0, [0, -380, 1.04]], [w(0, 7), [0, -385, 1.07]], [w(1, 0), [0, -380, 1.02]], [N[0].T, [20, -390, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [0, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 10), [0, -385, 1.05]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(9, 0), [0, -385, 1.06]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho ----------
// 0: Llevas(0) dos(1) años(2) con(3) el(4) mismo(5) sueldo(6) y(7) nadie(8) te(9) ha(10) hablado(11) de(12) subírtelo(13)
// 1: Tres(0) pasos(1) para(2) pedir(3) una(4) subida(5) y(6) el(7) último(8) es(9) el(10) que(11) más(12) cuesta(13)
E.figura('yo', { t0: 0, t1: N[0].T + 0.45, x: -340, cara: true,
  poses: [[0, 'de_pie'], [w(0, 6), 'encoger'], [w(0, 8), 'triste'], [w(1, 0), 'de_pie'], [w(1, 8), 'senalar']],
  sonrisa: [[0, -0.2], [w(0, 6), -0.6], [w(0, 8), -1], [w(1, 0), 0], [w(1, 12), 0.8]] });
E.figura('jefe', { t0: 0, t1: w(1, 0) + 0.2, sale: 0.2, x: 350, dir: 1, color: 'gris', poses: [[0, 'de_pie']] }); // de espaldas: ni se entera
E.obj('meses', 'contador', { t0: 0, t1: w(1, 0), sale: 0.2, x: 30, y: -480, v: [[0, 12], [wf(0, 2), 24, 'inout']], suf: ' meses', size: 70, col: 'txt', miles: false, caja: [-170, -40, 340, 80] });
E.obj('sueldo', 'etiqueta', { t0: 0, t1: N[0].T + 0.1, x: 30, y: -310, w: 330, h: 130, r: 70, v: 1800, on: [[0, 0.35], [w(1, 0), 0.35], [w(1, 3), 1]], sobrevive: false,
  barrido: [w(1, 5)], caja: [-165, -65, 330, 130] });
E.obj('rotSueldo', 'rotulo', { t0: 0, t1: w(1, 0), sale: 0.2, x: 30, y: -205, texto: [[0, 'SUELDO'], [w(0, 8), 'SIN CAMBIOS']], caja: [-120, -16, 240, 32] });
E.golpe(w(0, 6), 0.03); E.temblor(w(0, 8), 10, 0.4);
// «Tres pasos»: tres monedas; «el último» crece y brilla
E.obj('rayosH', 'rayos', { t0: w(1, 8) - 0.1, t1: N[0].T + 0.3, x: 30, y: -480, r: 300, z: -2, p: [[w(1, 8) - 0.1, 0], [w(1, 12), 1, 'out']], inspeccion: false });
[0, 1, 2].forEach(i => { const a = w(1, 0) + i * 0.12;
  E.obj('h' + (i + 1), 'moneda', { t0: a, t1: i === 2 ? N[0].T + 0.1 : N[0].T + 0.45, entra: 0.15, x: 30 + (i - 1) * 100, y: -480, r: 34, n: i + 1, pop: true, sfx: i === 0, inspeccion: false,
    sobrevive: i === 2, s: i === 2 ? [[0, 1], [w(1, 8), 1], [w(1, 8) + 0.35, 1.45, 'back']] : 1, luz: i === 2 ? 1 : [[0, 1], [w(1, 11), 1], [w(1, 11) + 0.3, 0.35]] }); });
E.obj('chH', 'chispas', { t0: w(1, 12), t1: w(1, 12) + 0.8, x: 130, y: -480, r0: 50, r1: 130, inspeccion: false });
E.destello(w(1, 12), 0.18);

// ---------- 1 · apunta lo que has conseguido, con cifras ----------
// 2: El(0) primero(1) apunta(2) lo(3) que(4) has(5) conseguido(6) con(7) cifras(8)
// 3: Clientes(0) ventas(1) horas(2) ahorradas(3) Un(4) logro(5) con(6) números(7) es(8) mucho(9) más(10) difícil(11) de(12) discutir(13)
// 4: Que(0) se(1) vea(2) lo(3) que(4) la(5) empresa(6) gana(7) contigo(8)
E.numero(1, N[0].T, N[0].S, { desde: 'h3', hacia: 'logros' });
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -360, cara: true,
  poses: [[0, 'de_pie'], [w(2, 2), 'senalar'], [w(3, 4), 'ofrecer'], [w(4, 0), 'ofrecer'], [wf(4, -1), 'celebrar']], sonrisa: [[w(3, 3), 0.5], [wf(4, -1), 1.5]] });
E.obj('logros', 'lista', { t0: N[0].S - 0.1, t1: fin(1), x: 80, y: -430, n: 3, w: 380, gap: 66, s: 1.05, sobrevive: true,
  p: [[w(2, 6), 0], [w(3, 0), 1, 'out'], [w(3, 1), 2, 'out'], [w(3, 3), 3, 'out']], brillo: [[w(3, 4), 0], [w(3, 13), 3, 'lin']], caja: [-210, -110, 420, 220] });
E.obj('aporta', 'etiqueta', { t0: w(4, 0) - 0.1, t1: fin(1), x: 80, y: -225, w: 380, h: 110, pop: true, sobrevive: false,
  v: [[w(4, 0), 0], [wf(4, -1), 24000, 'inout']], barrido: [wf(4, -1)], caja: [-190, -55, 380, 110] });
E.obj('rotAporta', 'rotulo', { t0: w(4, 0), t1: fin(1), x: 80, y: -140, texto: 'LO QUE APORTAS', caja: [-130, -16, 260, 32] });
E.obj('rayos1', 'rayos', { t0: w(4, 6), t1: fin(1), x: 80, y: -225, r: 330, z: -2, p: [[w(4, 6), 0], [wf(4, -1), 1, 'out']], inspeccion: false });
E.obj('ch1', 'chispas', { t0: wf(4, -1), t1: wf(4, -1) + 0.8, x: 80, y: -225, r0: 160, r1: 260, n: 14, inspeccion: false });
E.golpe(wf(4, -1), 0.05); E.destello(wf(4, -1), 0.15);
[0, 1, 2].forEach(i => E.golpe(w(3, [0, 1, 3][i]), 0.015));

// ---------- 2 · pide una reunión solo para eso ----------
// 5: El(0) segundo(1) pide(2) una(3) reunión(4) solo(5) para(6) eso(7)   [bocadillo «Me gustaría hablar de mi sueldo»]
// 6: Ni(0) en(1) el(2) pasillo(3) ni(4) al(5) final(6) de(7) otra(8) reunión(9) Con(10) día(11) hora(12) y(13) un(14) motivo(15) claro(16)
E.numero(2, N[1].T, N[1].S, { desde: 'logros', hacia: 'pide' });
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -350, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'ofrecer'], [w(6, 0), 'pensar'], [w(6, 10), 'senalar'], [wf(6, -1), 'celebrar']], sonrisa: [[w(5, 2), 0.6], [w(6, 0), 0], [wf(6, -1), 1.4]] });
E.figura('jefe2', { t0: N[1].S - 0.1, t1: fin(2), x: 350, dir: -1, color: 'gris', poses: [[0, 'de_pie'], [w(5, 5), 'pensar'], [w(6, 10), 'de_pie'], [wf(6, -1), 'ofrecer']] });
E.obj('pide', 'bocadillo', { t0: w(5, 2) - 0.1, t1: w(6, 0) + 0.1, x: 0, y: -470, w: 470, h: 92, texto: 'Me gustaría hablar de mi sueldo', size: 28, on: 1, pop: true, caja: [-235, -46, 470, 118] });
// «Ni en el pasillo ni al final de otra reunión»: dos sitios tachados
[[w(6, 3), 'PASILLO', -110], [w(6, 9), 'OTRA REUNIÓN', 150]].forEach(([a, tx, x], i) => {
  E.obj('sitio' + i, 'rotulo', { t0: a - 0.25, t1: w(6, 10) - 0.2, sale: 0.15, x, y: -470, texto: tx, size: 28, col: '#9a9c9b', pop: true, caja: [-120, -16, 240, 32] });
  E.obj('tacha' + i, 'pieza', { t0: a, t1: w(6, 10) - 0.2, sale: 0.15, x: x - (i ? 140 : 95), y: -470, r: 28, texto: '✗', on: 1, pop: true, libre: true, inspeccion: false, sfx: false });
  E.golpe(a, 0.02);
});
// «Con día, hora y un motivo claro»: la semana marca el jueves, el reloj da la hora y aparece el motivo
E.obj('semana', 'dias', { t0: w(6, 10) - 0.05, t1: fin(2), x: 0, y: -470, gap: 72, pop: true, luz: [[w(6, 10), -1], [w(6, 11), 3, 'out']], sobrevive: false, caja: [-250, -32, 500, 64] });
E.obj('reloj2', 'relojAm', { t0: w(6, 12) - 0.15, t1: fin(2), x: -90, y: -280, r: 78, pop: true, texto: '10:00', sobrevive: true,
  p: [[w(6, 12), 0], [w(6, 12) + 0.7, 0.83, 'out']], caja: [-80, -80, 160, 160] });
E.obj('motivo', 'rotulo', { t0: w(6, 15) - 0.1, t1: fin(2), x: 90, y: -280, texto: 'SUELDO', size: 34, col: '#e6ce46', pop: true, barrido: [wf(6, -1)], caja: [-80, -18, 160, 36] });
E.obj('ch2', 'chispas', { t0: wf(6, -1), t1: wf(6, -1) + 0.8, x: 0, y: -470, r0: 120, r1: 240, inspeccion: false });
E.golpe(wf(6, -1), 0.04);

// ---------- 3 · di una cantidad concreta y espera ----------
// 7: El(0) tercero(1) di(2) una(3) cantidad(4) concreta(5) y(6) espera(7) a(8) que(9) te(10) conteste(11)
// 8: Para(0) elegirla(1) mira(2) cuánto(3) se(4) paga(5) por(6) tu(7) puesto(8) fuera(9) Así(10) sabes(11) que(12) no(13) te(14) quedas(15) corto(16)
// 9: Después(0) habrá(1) un(2) silencio(3) incómodo(4) Aguántalo(5) eso(6) también(7) es(8) negociar(9)
E.numero(3, N[2].T, N[2].S, { desde: 'reloj2', hacia: 'cifra' });
E.figura('yo3', { t0: N[2].S - 0.1, t1: TC, x: -360, cara: true,
  poses: [[0, 'de_pie'], [w(7, 2), 'ofrecer'], [w(7, 7), 'de_pie'], [w(8, 2), 'senalar'], [w(9, 0), 'de_pie'], [w(9, 5), 'pensar'], [wf(9, -1), 'celebrar']],
  sonrisa: [[w(7, 4), 0.5], [w(9, 3), -0.4], [wf(9, -1), 1.5]] });
E.figura('jefe3', { t0: N[2].S - 0.1, t1: TC, x: 360, dir: -1, color: 'gris', poses: [[0, 'de_pie'], [w(7, 7), 'pensar'], [wf(9, -1), 'ofrecer']] });
E.obj('cifra', 'etiqueta', { t0: N[2].S - 0.1, t1: TC, x: 0, y: -300, w: 320, h: 130, r: 70, sobrevive: true,
  v: [[0, 1800], [w(7, 4), 1800], [w(7, 5) + 0.3, 2100, 'out']], on: 1, barrido: [w(7, 5) + 0.3, w(8, 16)], caja: [-160, -65, 320, 130] });
E.obj('rotCifra', 'rotulo', { t0: N[2].S, t1: TC, x: 0, y: -195, texto: [[0, 'TU SUELDO'], [w(7, 4), 'LO QUE PIDES']], caja: [-130, -16, 260, 32] });
E.obj('mercado', 'relleno', { t0: w(8, 2) - 0.15, t1: w(9, 0), sale: 0.2, x: 0, y: -470, w: 440, h: 50, pop: true,
  rotulo: 'TU PUESTO, FUERA', f: [[w(8, 2), 0], [w(8, 9), 0.86, 'inout']], caja: [-220, -60, 440, 100] });
E.obj('ch3a', 'chispas', { t0: w(8, 16), t1: w(8, 16) + 0.8, x: 0, y: -300, r0: 140, r1: 230, inspeccion: false });
E.sfx(w(8, 2), 'fill');
// «un silencio incómodo»: los segundos suman; con «negociar», el jefe asiente
E.obj('silencio', 'contador', { t0: w(9, 0), t1: TC, x: 0, y: -470, v: [[w(9, 1), 0], [w(9, 5), 4, 'lin']], suf: ' s', size: 84, col: 'txt', miles: false, pop: true, caja: [-90, -50, 180, 100] });
E.obj('ondas3', 'ondas', { t0: w(9, 0), t1: TC, x: 190, y: -470, n: 5, amp: [[w(9, 0), 0], [w(9, 5), 0], [w(9, 6), 0.8], [wf(9, -1), 0.4]], r: 40, inspeccion: false });
E.obj('rayos3', 'rayos', { t0: w(9, 6), t1: TC, x: 0, y: -300, r: 330, z: -2, p: [[w(9, 6), 0], [wf(9, -1), 1, 'out']], inspeccion: false });
E.obj('conf3', 'confeti', { t0: wf(9, -1), t1: wf(9, -1) + 1.6, x: 0, y: -360, dur: 1.5, n: 34, fuerza: 700, inspeccion: false });
E.temblor(w(9, 3), 8, 0.35); E.golpe(wf(9, -1), 0.05); E.destello(wf(9, -1), 0.15);

// ---------- cierre: resumen y envío ----------
// 10: Las(0) subidas(1) casi(2) nunca(3) llegan(4) solas(5) se(6) piden(7) y(8) se(9) piden(10) bien(11)
// 11: Mándaselo(0) a(1) ese(2) compañero(3) que(4) lleva(5) años(6) esperando(7) a(8) que(9) le(10) suban(11) el(12) sueldo(13)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(10, 7), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, items: ['Cifras', 'Reunión', 'Cantidad'], gap: 230,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(10, 10)], caja: [-360, -60, 720, 200] });
E.obj('confC', 'confeti', { t0: wf(10, -1), t1: wf(10, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(10, -1), 0.22); E.golpe(wf(10, -1), 0.04);
E.figura('yoF', { t0: w(11, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(11, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(11, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(11, 11)], vuelo: [[wf(11, -1), 0], [wf(11, -1) + 0.5, 1, 'in']] });
