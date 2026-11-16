// L27 · El precio ancla (estilo B; reglas 14, 15, 20, 21, 24)
// Gancho visual: la carta de vinos con una botella de 200 € y otra de 40 €; el ancla cae junto a la cara y la barata pasa a «razonable».
// Regla 20: «¿Cuánto te querías gastar?» va en bocadillo del vendedor; la voz solo narra.
// Tres tipos propios de este reel (botella, ancla, tarifa), definidos aquí sin tocar motor2d/engine2d.js.
const w = E.w, wf = E.wf;
const D = TIMING.duration;

// ---------- tipos propios ----------
// botella de vino de línea, pies en (0,0); nivel 0..1 de vino; on 0..1 = vino amarillo (la elegida)
TIPOS.botella = function (c, o, t) {
  const bw = o.w || 100, h = o.h || 300, lvl = clamp(kf(o.nivel, t, 0.7)), on = clamp(kf(o.on, t, 0));
  const nw = bw * 0.3, sh = -h * 0.6, nk = -h * 0.76;
  const cuerpo = () => { c.beginPath(); c.moveTo(-bw / 2, -14); c.quadraticCurveTo(-bw / 2, 0, -bw / 2 + 14, 0); c.lineTo(bw / 2 - 14, 0); c.quadraticCurveTo(bw / 2, 0, bw / 2, -14);
    c.lineTo(bw / 2, sh); c.quadraticCurveTo(bw / 2, nk + 12, nw / 2, nk); c.lineTo(nw / 2, -h); c.lineTo(-nw / 2, -h); c.lineTo(-nw / 2, nk); c.quadraticCurveTo(-bw / 2, nk + 12, -bw / 2, sh); c.closePath(); };
  c.fillStyle = C.relleno; cuerpo(); c.fill();
  if (lvl > 0) { c.save(); cuerpo(); c.clip(); const top = -8 - (h * 0.62) * lvl; const g = c.createLinearGradient(0, top, 0, 0);
    g.addColorStop(0, mix('#5d6160', C.amL, on)); g.addColorStop(1, mix('#3e4241', C.amD, on)); c.fillStyle = g; c.fillRect(-bw, top, 2 * bw, -top); c.restore(); }
  lineaObj(c, 4, mix('#7d8a83', C.am, on)); cuerpo(); c.stroke();
  c.fillStyle = mix('#1a201d', '#2a2510', on); c.beginPath(); c.roundRect(-bw / 2 + 10, -h * 0.42, bw - 20, h * 0.16, 6); c.fill(); c.stroke();
  if (o.texto) texto(c, o.texto, 0, -h * 0.34, 22, mix('#9a9c9b', C.am, on), 700, 'center', false, 'middle', 2);
};
// ancla amarilla, centrada; r = medio alto
TIPOS.ancla = function (c, o, t) {
  const r = kf(o.r, t, 70), lw = r * 0.15; const g = c.createLinearGradient(-r, -r, r, r); g.addColorStop(0, C.amL); g.addColorStop(1, C.amD);
  c.strokeStyle = g; c.fillStyle = g; c.lineWidth = lw; c.lineCap = 'round'; c.lineJoin = 'round';
  c.beginPath(); c.arc(0, -r * 0.8, r * 0.17, 0, 7); c.stroke();
  c.beginPath(); c.moveTo(0, -r * 0.62); c.lineTo(0, r * 0.9); c.stroke();
  c.beginPath(); c.moveTo(-r * 0.45, -r * 0.4); c.lineTo(r * 0.45, -r * 0.4); c.stroke();
  c.beginPath(); c.arc(0, r * 0.12, r * 0.78, Math.PI * 0.12, Math.PI * 0.88); c.stroke();
  [-1, 1].forEach(s => { const a = s > 0 ? Math.PI * 0.12 : Math.PI * 0.88, x = Math.cos(a) * r * 0.78, y = r * 0.12 + Math.sin(a) * r * 0.78;
    c.beginPath(); c.moveTo(x + s * r * 0.2, y - r * 0.22); c.lineTo(x - s * r * 0.02, y - r * 0.02); c.lineTo(x + s * r * 0.24, y + r * 0.04); c.closePath(); c.fill(); });
};
// tarjeta de tarifa: nombre a la izquierda y precio (contador) a la derecha; on 0..1 = se rellena de amarillo; rojo 0..1 = precio en rojo
// bocadillo con la cola a la derecha (cola: 'der') para el vendedor, que está a la derecha; el resto, como el del motor
const _bocadillo = TIPOS.bocadillo;
TIPOS.bocadillo = function (c, o, t) {
  if (o.cola !== 'der') return _bocadillo.call(this, c, o, t);
  const w = kf(o.w, t, 150), h = kf(o.h, t, 100), on = clamp(kf(o.on, t, 0));
  c.fillStyle = C.relleno; lineaObj(c, 4, mix('#56605a', '#e6ce46', on));
  c.beginPath(); c.roundRect(-w / 2, -h / 2, w, h, 18); c.moveTo(w * 0.18, h / 2); c.lineTo(w * 0.3, h / 2 + 26); c.lineTo(w * 0.02, h / 2); c.fill(); c.stroke();
  c.fillStyle = C.relleno; c.fillRect(w * 0.04, h / 2 - 3, w * 0.13, 6);
  texto(c, o.texto, 0, 2, o.size || 34, mix('#c9ccca', '#e6ce46', on), 600);
};
TIPOS.tarifa = function (c, o, t) {
  const tw = o.w || 380, h = o.h || 96, on = clamp(kf(o.on, t, 0)), rojo = clamp(kf(o.rojo, t, 0));
  c.fillStyle = C.relleno; lineaObj(c, 4, mix('#56605a', C.am, Math.min(1, on * 3))); c.beginPath(); c.roundRect(-tw / 2, -h / 2, tw, h, 18); c.fill(); c.stroke();
  if (on > 0) { c.save(); c.beginPath(); c.roundRect(-tw / 2 + 6, -h / 2 + 6, tw - 12, h - 12, 14); c.clip(); const g = c.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, C.amL); g.addColorStop(1, C.amD);
    c.fillStyle = g; c.fillRect(-tw / 2, -h / 2, tw * EASE.inout(on), h); c.restore(); }
  const k = on > 0.6 ? 1 : 0;
  texto(c, o.nombre || '', -tw / 2 + 24, 2, 24, k ? C.amOsc : C.txt, 700, 'left', false, 'middle', 3);
  c.save(); c.translate(tw / 2 - 84, 4); odometro(c, kf(o.v, t, 0), { size: 40, col: k ? '#2d2711' : mix(C.txt, '#e4574f', rojo), suf: ' €', miles: false }); c.restore();
};

// ---------- escena ----------
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(2, 0), gap: 70, y: 360 } });

// «La primera: // …» → T en «La», S en la primera palabra del punto
const N = [3, 6, 8].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(10, 0) - 0.1;

E.camara([
  [0, [0, -380, 1.04]], [w(0, 9), [20, -385, 1.07]], [w(1, 0), [0, -380, 1.02]], [w(1, 9), [-20, -385, 1.06]], [N[0].T, [20, -390, 1.05]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 10), [20, -385, 1.05]], [w(5, 6), [0, -385, 1.03]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(7, 0), [0, -385, 1.05]], [w(7, 12), [20, -385, 1.03]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(9, 0), [0, -385, 1.05]], [w(9, 10), [-10, -380, 1.03]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho: la carta de vinos ----------
// 0: Los(0) restaurantes(1) ponen(2) en(3) la(4) carta(5) un(6) vino(7) de(8) 200(9) euros(10) para(11) venderte(12) el(13) de(14) 40(15)
// 1: Se(0) llama(1) efecto(2) anclaje(3) lo(4) que(5) te(6) parece(7) caro(8) depende(9) del(10) primer(11) precio(12) que(13) ves(14)
// 2: Tres(0) maneras(1) de(2) usarlo(3) a(4) tu(5) favor(6)
const B1 = 40, B2 = 290;
E.figura('yo', { t0: 0, t1: fin(0), x: -370, cara: true,
  poses: [[0, 'pensar'], [w(0, 7), 'senalar'], [w(0, 12), 'pensar'], [wf(0, -1), 'ofrecer'], [w(1, 2), 'encoger'], [w(1, 9), 'pensar'], [w(2, 0), 'de_pie'], [w(2, 1), 'senalar']],
  sonrisa: [[0, 0.3], [w(0, 15), 1], [w(1, 2), -0.3], [w(2, 0), 0.6]] });
E.obj('rotCarta', 'rotulo', { t0: 0, t1: w(1, 0), sale: 0.2, x: 165, y: -470, texto: 'CARTA DE VINOS', size: 26, col: '#9a9c9b', caja: [-150, -16, 300, 32] });
E.obj('bot200', 'botella', { t0: 0, t1: w(2, 0) + 0.2, sale: 0.2, x: B1, w: 100, h: 290, nivel: 0.75, luz: [[0, 1], [w(0, 12), 1], [w(0, 13), 0.55]], caja: [-50, -290, 100, 290], refl: true });
E.obj('bot40', 'botella', { t0: 0, t1: w(2, 0) + 0.2, sale: 0.2, x: B2, w: 100, h: 290, nivel: 0.75, on: [[0, 0], [w(0, 14), 0], [wf(0, -1), 1, 'out']], caja: [-50, -290, 100, 290], refl: true });
E.obj('e200', 'etiqueta', { t0: w(0, 6) - 0.2, t1: w(2, 0) + 0.2, sale: 0.2, x: B1, y: -365, w: 220, h: 80, r: 50, pop: true, on: 0.3,
  v: [[w(0, 7), 0], [wf(0, 10), 200, 'out']], barrido: [w(1, 11)], caja: [-110, -40, 220, 80] });
E.obj('e40', 'etiqueta', { t0: w(0, 13) - 0.2, t1: w(2, 0) + 0.2, sale: 0.2, x: B2, y: -365, w: 220, h: 80, r: 50, pop: true,
  on: [[0, 0.3], [w(0, 15), 0.3], [wf(0, -1) + 0.2, 1]], v: [[w(0, 14), 0], [wf(0, -1), 40, 'out']], caja: [-110, -40, 220, 80] });
E.obj('ch0', 'chispas', { t0: wf(0, -1), t1: wf(0, -1) + 0.8, x: B2, y: -365, r0: 120, r1: 210, inspeccion: false });
E.golpe(wf(0, -1), 0.04);
// «efecto anclaje»: el ancla cae junto a la de 200 y fija la escala
E.obj('ancla0', 'ancla', { t0: w(1, 1), t1: w(2, 0) + 0.2, entra: 0.15, sale: 0.2, x: -140, r: 70, refl: true,
  y: [[w(1, 1), -230], [w(1, 3), -75, 'in']], caja: [-70, -70, 140, 140] });
E.temblor(w(1, 3), 12, 0.4); E.golpe(w(1, 3), 0.05);
E.obj('cuerda', 'flecha', { t0: w(1, 4), t1: w(2, 0) + 0.2, sale: 0.2, de: [-140, -150], hasta: [B1 - 80, -330], curva: -0.25, discontinua: true, punta: false, w: 4,
  p: [[w(1, 4), 0], [w(1, 7), 1, 'out']], inspeccion: false });
E.obj('rotPrimer', 'rotulo', { t0: w(1, 11) - 0.1, t1: w(2, 0), sale: 0.2, x: B1 - 20, y: -460, texto: 'PRIMER PRECIO', size: 24, col: '#9a9c9b', pop: true, caja: [-130, -15, 260, 30] });
E.obj('rot40', 'rotulo', { t0: w(1, 7) - 0.1, t1: w(2, 0), sale: 0.2, x: B2 + 20, y: -460, texto: [[0, 'CARO'], [w(1, 9), 'RAZONABLE']], size: 24, col: '#e6ce46', pop: true, caja: [-110, -15, 220, 30] });
E.golpe(w(1, 9), 0.02);
// «Tres maneras»: tres monedas; la tercera se queda y abre el primer punto
[0, 1, 2].forEach(i => { const a = w(2, 0) + i * 0.12;
  E.obj('h' + (i + 1), 'moneda', { t0: a, t1: i === 2 ? N[0].T + 0.1 : N[0].T + 0.45, entra: 0.15, x: 120 + (i - 1) * 110, y: -330, r: 40, n: i + 1, pop: true, sfx: i === 0, inspeccion: false,
    sobrevive: i === 2, s: i === 2 ? [[0, 1], [w(2, 5), 1], [w(2, 5) + 0.35, 1.3, 'back']] : 1, luz: i === 2 ? 1 : [[0, 1], [w(2, 5), 1], [w(2, 5) + 0.3, 0.35]] }); });
E.obj('rayosH', 'rayos', { t0: w(2, 3), t1: fin(0), x: 230, y: -330, r: 300, z: -2, p: [[w(2, 3), 0], [w(2, 6), 1, 'out']], inspeccion: false });
E.obj('chH', 'chispas', { t0: w(2, 5), t1: w(2, 5) + 0.8, x: 230, y: -330, r0: 50, r1: 130, inspeccion: false });

// ---------- 1 · si vendes, enseña primero lo más caro ----------
// 3: La(0) primera(1) si(2) vendes(3) enseña(4) primero(5) lo(6) más(7) caro(8)
// 4: Ofrece(0) tres(1) tarifas(2) la(3) completa(4) la(5) intermedia(6) y(7) la(8) básica(9) Al(10) lado(11) de(12) la(13) completa(14) la(15) intermedia(16) parece(17) razonable(18)
// 5: Si(0) empiezas(1) por(2) la(3) más(4) barata(5) al(6) cliente(7) todo(8) lo(9) demás(10) le(11) parecerá(12) caro(13)
E.numero(1, N[0].T, N[0].S, { desde: 'h3', hacia: 'completa' });
const TX = 120, R1 = -440, R2 = -325, R3 = -210;
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -390, cara: true,
  poses: [[0, 'de_pie'], [w(3, 4), 'ofrecer'], [w(4, 0), 'senalar'], [w(4, 10), 'de_pie'], [w(4, 16), 'celebrar'], [w(5, 0), 'senalar'], [w(5, 8), 'manos_cabeza']],
  sonrisa: [[w(3, 4), 0.6], [w(4, 16), 1.5], [w(5, 0), 0.2], [w(5, 8), -1.2]] });
E.obj('completa', 'tarifa', { t0: N[0].S - 0.1, t1: fin(1), x: TX, y: R1, w: 400, h: 92, nombre: 'COMPLETA', r: 46, sobrevive: false,
  v: [[w(3, 5), 0], [wf(3, -1) + 0.2, 990, 'out']], rojo: [[w(5, 8), 0], [w(5, 12), 1]], barrido: [w(4, 4), w(4, 14)], caja: [-200, -46, 400, 92] });
E.obj('intermedia', 'tarifa', { t0: w(4, 6) - 0.15, t1: fin(1), x: TX, y: R2, w: 400, h: 92, nombre: 'INTERMEDIA', r: 46, pop: true,
  v: [[w(4, 6), 0], [w(4, 8), 490, 'out']], on: [[w(4, 16), 0], [wf(4, -1), 1, 'inout'], [w(5, 2), 1], [w(5, 4), 0]], rojo: [[w(5, 8), 0], [w(5, 12), 1]], caja: [-200, -46, 400, 92] });
E.obj('basica', 'tarifa', { t0: w(4, 9) - 0.15, t1: fin(1), x: TX, y: R3, w: 400, h: 92, nombre: 'BÁSICA', r: 46, pop: true,
  v: [[w(4, 9), 0], [w(4, 10) + 0.2, 190, 'out']], barrido: [w(5, 3)], caja: [-200, -46, 400, 92] });
E.sfx(w(4, 16), 'fill');
E.obj('ch1', 'chispas', { t0: wf(4, -1), t1: wf(4, -1) + 0.8, x: TX, y: R2, r0: 150, r1: 250, n: 14, inspeccion: false });
E.golpe(wf(4, -1), 0.04); E.destello(wf(4, -1), 0.12);
// el ancla cae junto a la tarifa más cara; con «si empiezas por la más barata» baja a la básica y lo demás se pone rojo
E.obj('ancla1', 'ancla', { t0: w(3, 6) - 0.1, t1: fin(1), entra: 0.15, x: 400, r: 56, sobrevive: true, sfx: false,
  y: [[w(3, 6) - 0.1, R1 - 50], [w(3, 7) + 0.1, R1, 'in'], [w(5, 1), R1], [w(5, 5), R3, 'inout']], caja: [-56, -56, 112, 112] });
E.golpe(w(3, 7) + 0.1, 0.03); E.sfx(w(3, 7) + 0.1, 'thud');
E.temblor(w(5, 12), 10, 0.4);

// ---------- 2 · si compras, desconfía del primer precio que te enseñen ----------
// 6: La(0) segunda(1) si(2) compras(3) desconfía(4) del(5) primer(6) precio(7) que(8) te(9) enseñen(10)
// 7: Antes(0) de(1) entrar(2) en(3) la(4) tienda(5) ten(6) claro(7) cuánto(8) te(9) quieres(10) gastar(11) Así(12) el(13) ancla(14) la(15) pones(16) tú(17)
E.numero(2, N[1].T, N[1].S, { desde: 'ancla1', hacia: 'primer' });
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), cara: true, x: [[0, -365], [w(7, 0), -365], [w(7, 5), -290, 'inout']],
  poses: [[0, 'de_pie'], [w(6, 4), 'pensar'], [w(6, 10), 'encoger'], [w(7, 0), 'andar'], [w(7, 5), 'pensar'], [w(7, 12), 'de_pie'], [w(7, 15), 'celebrar']],
  sonrisa: [[w(6, 4), -0.3], [w(6, 10), -0.6], [w(7, 6), 0.4], [w(7, 15), 1.5]] });
E.figura('vende2', { t0: N[1].S - 0.1, t1: w(7, 0) + 0.2, sale: 0.2, x: 390, dir: -1, color: 'gris', poses: [[0, 'de_pie'], [w(6, 6), 'ofrecer'], [w(6, 10), 'senalar']] });
E.obj('primer', 'etiqueta', { t0: N[1].S - 0.1, t1: w(7, 0) + 0.1, sale: 0.2, x: 0, y: -380, w: 300, h: 110, r: 60, on: 0.3,
  v: [[w(6, 5), 0], [w(6, 8) + 0.2, 300, 'out']], caja: [-150, -55, 300, 110] });
E.obj('rotPrimer2', 'rotulo', { t0: w(6, 6) - 0.1, t1: w(7, 0), sale: 0.2, x: 0, y: -280, texto: 'PRIMER PRECIO', size: 26, col: '#9a9c9b', pop: true, caja: [-130, -16, 260, 32] });
E.obj('duda', 'pieza', { t0: w(6, 4) - 0.1, t1: w(7, 0), sale: 0.15, x: -200, y: -460, r: 30, texto: '?', on: 1, pop: true, caja: [-30, -30, 60, 60] });
E.temblor(w(6, 4), 8, 0.35);
// la tienda; el comprador se fija un tope antes de entrar y el ancla cae sobre él
E.obj('tienda', 'puerta', { t0: w(7, 0) + 0.1, t1: fin(2), x: 330, w: 190, h: 330, pop: true, p: [[w(7, 2), 0], [w(7, 5), 0.35, 'out']], caja: [-95, -330, 190, 330], refl: true });
E.obj('rotTienda', 'rotulo', { t0: w(7, 2), t1: fin(2), x: 330, y: -370, texto: 'TIENDA', size: 26, col: '#9a9c9b', pop: true, caja: [-70, -16, 140, 32] });
E.obj('tope', 'relleno', { t0: w(7, 6) - 0.15, t1: fin(2), x: 20, y: -470, w: 340, h: 46, rotulo: 'TU TOPE', pop: true,
  f: [[w(7, 8), 0], [wf(7, 11) + 0.2, 0.55, 'inout']], caja: [-170, -63, 340, 86] });
E.obj('topeN', 'contador', { t0: w(7, 7) - 0.1, t1: fin(2), x: 20, y: -385, v: [[w(7, 8), 0], [wf(7, 11) + 0.2, 150, 'out']], suf: ' €', size: 56, col: 'txt', miles: false, pop: true, caja: [-110, -34, 220, 68] });
E.sfx(w(7, 8), 'fill');
E.obj('ancla2', 'ancla', { t0: w(7, 13) - 0.1, t1: fin(2), entra: 0.15, x: 20, r: 56, sobrevive: true, sfx: false,
  y: [[w(7, 13) - 0.1, -300], [w(7, 14) + 0.05, -225, 'in']], barrido: [w(7, 16)], caja: [-56, -56, 112, 112] });
E.golpe(w(7, 14) + 0.05, 0.04); E.sfx(w(7, 14) + 0.05, 'thud');
E.obj('ch2', 'chispas', { t0: w(7, 16), t1: w(7, 16) + 0.8, x: 20, y: -225, r0: 70, r1: 160, inspeccion: false });

// ---------- 3 · si negocias, di tú la primera cifra ----------
// 8: La(0) tercera(1) si(2) negocias(3) di(4) tú(5) la(6) primera(7) cifra(8)
// 9: Si(0) te(1) preguntan(2) cuánto(3) te(4) querías(5) gastar(6) no(7) lo(8) digas(9) ofrece(10) tú(11) una(12) cifra(13) baja(14)   [bocadillo «¿Cuánto te querías gastar?»]
E.numero(3, N[2].T, N[2].S, { desde: 'ancla2', hacia: 'cifra' });
E.figura('yo3', { t0: N[2].S - 0.1, t1: TC, x: -390, cara: true,
  poses: [[0, 'de_pie'], [w(8, 4), 'ofrecer'], [w(9, 0), 'de_pie'], [w(9, 3), 'pensar'], [w(9, 7), 'apartarse'], [w(9, 10), 'ofrecer'], [wf(9, -1), 'celebrar']],
  sonrisa: [[w(8, 4), 0.6], [w(9, 3), -0.2], [w(9, 10), 0.6], [wf(9, -1), 1.5]] });
E.figura('vende3', { t0: N[2].S - 0.1, t1: TC, x: 390, dir: -1, color: 'gris', poses: [[0, 'de_pie'], [w(8, 7), 'pensar'], [w(9, 0), 'ofrecer'], [w(9, 10), 'pensar'], [wf(9, -1), 'encoger']] });
// el vendedor (gris) pregunta; quien pone la primera cifra, baja, es el protagonista (etiqueta amarilla a su lado, 0 → 500 €);
// el precio del vendedor llega después y baja hacia esa cifra (ancla); la barra de ahorro se rellena a la vez
const CX = -130, CY = -320, VX = 165, VY = -420;
E.obj('cifra', 'etiqueta', { t0: N[2].S - 0.1, t1: TC, x: CX, y: CY, w: 260, h: 100, r: 55, on: 1,
  v: [[w(8, 6), 0], [wf(8, -1) + 0.2, 500, 'out']], s: [[0, 1], [w(9, 12), 1], [w(9, 12) + 0.15, 1.12, 'out'], [w(9, 12) + 0.4, 1, 'inout']],
  barrido: [wf(8, -1) + 0.2, w(9, 12)], caja: [-130, -50, 260, 100] });
E.obj('rotCifra', 'rotulo', { t0: w(8, 6) - 0.1, t1: TC, x: CX, y: CY + 82, texto: [[0, 'TU CIFRA'], [w(9, 12), 'CIFRA BAJA']], size: 26, col: '#e6ce46', pop: true, caja: [-120, -16, 240, 32] });
E.obj('pregunta', 'bocadillo', { t0: w(9, 0) - 0.1, t1: w(9, 7) + 0.1, sale: 0.15, x: 150, y: -520, w: 380, h: 76, cola: 'der', texto: '¿Cuánto te querías gastar?', size: 26, pop: true, caja: [-190, -38, 380, 102] });
// «no lo digas»: el protagonista se aparta y la escena da un pequeño temblor
E.temblor(w(9, 7), 6, 0.3);
E.obj('precioV', 'etiqueta', { t0: w(9, 10) - 0.1, t1: TC, x: [[0, VX], [w(9, 12), VX], [wf(9, -1) + 0.2, VX - 25, 'inout']], y: VY, w: 240, h: 90, r: 50, on: 0.3, pop: true,
  v: [[w(9, 10), 900], [w(9, 12), 900], [wf(9, -1) + 0.2, 600, 'inout']], caja: [-120, -45, 240, 90] });
E.obj('rotV', 'rotulo', { t0: w(9, 10), t1: TC, x: VX, y: VY + 72, texto: 'SU PRECIO', size: 24, col: '#9a9c9b', pop: true, caja: [-90, -15, 180, 30] });
E.obj('ahorro', 'relleno', { t0: w(9, 9), t1: TC, x: 0, y: -125, w: 380, h: 44, rotulo: 'LO QUE AHORRAS', pop: true,
  f: [[w(9, 12), 0], [wf(9, -1) + 0.2, 1, 'inout']], barrido: [wf(9, -1) + 0.2], caja: [-190, -61, 380, 83] });
E.sfx(w(9, 12), 'fill');
E.obj('rayos3', 'rayos', { t0: w(9, 12), t1: TC, x: CX, y: CY, r: 300, z: -2, p: [[w(9, 12), 0], [wf(9, -1), 1, 'out']], inspeccion: false });
E.obj('ch3', 'chispas', { t0: wf(9, -1), t1: wf(9, -1) + 0.8, x: CX, y: CY, r0: 130, r1: 230, inspeccion: false });
E.golpe(wf(9, -1), 0.05); E.destello(wf(9, -1), 0.15);

// ---------- cierre: resumen y envío ----------
// 10: Y(0) el(1) vino(2) de(3) 40(4) nunca(5) fue(6) tan(7) barato(8) como(9) parecía(10)
// 11: Mándaselo(0) a(1) ese(2) amigo(3) que(4) tiene(5) un(6) negocio(7) y(8) siempre(9) enseña(10) primero(11) lo(12) más(13) barato(14)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(10, 6), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(11, 0), capa: 'pantalla', x: 540, y: 960, items: ['Caro primero', 'Tu tope', 'Tu cifra'], gap: 260,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(10, 8)], caja: [-380, -60, 760, 200] });
E.obj('confC', 'confeti', { t0: wf(10, -1), t1: wf(10, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(10, -1), 0.22); E.golpe(wf(10, -1), 0.04);
E.figura('yoF', { t0: w(11, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(11, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(11, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(11, 7)], vuelo: [[wf(11, -1), 0], [wf(11, -1) + 0.5, 1, 'in']] });
