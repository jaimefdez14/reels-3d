// L25 · El efecto Diderot: tres maneras de cortar la cadena de compras (estilo B; reglas 15, 20, 21, 24)
// Gancho visual: el sofá nuevo entra amarillo y la alfombra gris de al lado tiembla («ya no pega»).
// Regla 20: «Ya puestos, cambio también la mesa» va en bocadillo del filósofo; la voz solo narra.
// El motor no tiene muebles: se dibujan aquí como tipos locales (sofá, alfombra, lámpara, cortinas, bata, mesa,
// estantería, calendario), con el mismo lenguaje: línea gris = viejo, amarillo macizo = nuevo, discontinuo = lo que vendrá.
const w = E.w, wf = E.wf;
const D = TIMING.duration;
E.config({ fondo: 'negro', sub: 'dos', cursiva: true, subY: 690, polvo: true, gancho: { lineas: [0], escala: 1.25 },
  progreso: { n: 3, estilo: 'puntos', aparece: w(2, 0), gap: 70, y: 360 } });

// ---------- muebles (tipos locales de este reel) ----------
// on: 0 línea gris (viejo) → 1 amarillo macizo (nuevo); ap: apagado (más oscuro); tiembla: 0..1 (desentona); fantasma: discontinuo
const GR = (c, y0, y1) => { const g = c.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, E.C.amL); g.addColorStop(1, E.C.amD); return g; };
function pinta(c, o, t, y0, y1, dibuja) {
  const on = E.clamp(E.kf(o.on, t, 0)), ap = E.clamp(E.kf(o.apagado, t, 0)), fa = E.clamp(E.kf(o.fantasma, t, 0));
  c.save(); c.lineCap = 'round'; c.lineJoin = 'round';
  if (fa > 0.5) { c.setLineDash([12, 10]); c.strokeStyle = '#6d7671'; c.lineWidth = 4; c.beginPath(); dibuja(c); c.stroke(); c.restore(); return; }
  c.beginPath(); dibuja(c);
  c.fillStyle = mix('#141917', '#0b0d0c', ap); c.fill();
  if (on > 0) { c.save(); c.globalAlpha *= on; c.fillStyle = GR(c, y0, y1); c.fill(); c.restore(); }
  c.strokeStyle = on > 0 ? mix('#8d9692', '#c69f25', on) : mix('#8d9692', '#3e4241', ap); c.lineWidth = 4; c.stroke(); c.restore();
}
function tiembla(c, o, t) { const k = E.clamp(E.kf(o.tiembla, t, 0)); if (k > 0) { c.translate(Math.sin(t * 47) * 7 * k, 0); c.rotate(Math.sin(t * 39) * 0.03 * k); } }
const rr = (c, x, y, w, h, r) => c.roundRect(x, y, w, h, r);
Object.assign(TIPOS, {
  sofa(c, o, t) { tiembla(c, o, t); const w = o.w || 300, h = w * 0.55;
    pinta(c, o, t, -h, 0, c => { rr(c, -w / 2 + 34, -h, w - 68, h * 0.55, 18); rr(c, -w / 2 + 30, -h * 0.5, w - 60, h * 0.36, 12); rr(c, -w / 2, -h * 0.7, 40, h * 0.62, 16); rr(c, w / 2 - 40, -h * 0.7, 40, h * 0.62, 16); });
    c.strokeStyle = '#8d9692'; c.lineWidth = 5; c.lineCap = 'round'; c.beginPath(); c.moveTo(-w / 2 + 22, -h * 0.08); c.lineTo(-w / 2 + 22, 0); c.moveTo(w / 2 - 22, -h * 0.08); c.lineTo(w / 2 - 22, 0); c.stroke(); },
  // alfombra en el suelo, por delante (y > 0); ok: encaja (borde amarillo)
  alfombra(c, o, t) { tiembla(c, o, t); const w = o.w || 420, ok = E.clamp(E.kf(o.ok, t, 0));
    c.fillStyle = mix('#3b403e', '#4a4636', ok); c.beginPath(); c.moveTo(-w * 0.4, 8); c.lineTo(w * 0.4, 8); c.lineTo(w / 2, 62); c.lineTo(-w / 2, 62); c.closePath(); c.fill();
    c.strokeStyle = mix('#5d6461', E.C.am, ok); c.lineWidth = 4; c.stroke();
    c.strokeStyle = mix('#2a2e2c', '#8a7a2c', ok); c.lineWidth = 5; for (let i = -3; i <= 3; i++) { c.beginPath(); c.moveTo(i * w * 0.1, 14); c.lineTo(i * w * 0.125, 56); c.stroke(); }
    c.strokeStyle = mix('#6d7671', E.C.am, ok); c.lineWidth = 3; for (let i = 0; i < 6; i++) { const y = 14 + i * 9, xl = -w * 0.4 - (w * 0.1) * (y - 8) / 54; c.beginPath(); c.moveTo(xl - 4, y); c.lineTo(xl - 18, y); c.moveTo(-xl + 4, y); c.lineTo(-xl + 18, y); c.stroke(); } },
  lampara(c, o, t) { tiembla(c, o, t); const h = o.h || 320, on = E.clamp(E.kf(o.on, t, 0)), fa = E.clamp(E.kf(o.fantasma, t, 0));
    if (on > 0 && fa < 0.5) { const g = c.createRadialGradient(0, -h + 40, 10, 0, -h + 40, 200); g.addColorStop(0, `rgba(246,214,80,${0.2 * on})`); g.addColorStop(1, 'rgba(246,214,80,0)'); c.fillStyle = g; c.beginPath(); c.arc(0, -h + 40, 200, 0, 7); c.fill(); }
    pinta(c, o, t, -h, 0, c => { c.moveTo(-36, -h); c.lineTo(36, -h); c.lineTo(60, -h + 80); c.lineTo(-60, -h + 80); c.closePath(); rr(c, -6, -h + 80, 12, h - 92, 6); c.ellipse(0, -8, 50, 10, 0, 0, 7); }); },
  // ventana con dos cortinas (cuelga a media altura)
  cortinas(c, o, t) { tiembla(c, o, t); const w = o.w || 210, top = -390, bot = -120;
    c.strokeStyle = '#3a4540'; c.lineWidth = 4; c.beginPath(); c.rect(-w / 2 + 24, top + 20, w - 48, bot - top - 30); c.moveTo(0, top + 20); c.lineTo(0, bot - 10); c.stroke();
    c.strokeStyle = '#8d9692'; c.lineWidth = 6; c.lineCap = 'round'; c.beginPath(); c.moveTo(-w / 2 - 6, top); c.lineTo(w / 2 + 6, top); c.stroke();
    pinta(c, o, t, top, bot, c => { for (const s of [-1, 1]) { const x0 = s * w / 2, x1 = s * (w / 2 - 66); c.moveTo(x0, top + 6); c.lineTo(x1, top + 6); c.quadraticCurveTo(s * (w / 2 - 40), (top + bot) / 2, x1 + s * 10, bot); c.lineTo(x0, bot); c.closePath(); } }); },
  // bata colgada en un perchero
  bata(c, o, t) { const on = E.clamp(E.kf(o.on, t, 1));
    c.strokeStyle = '#8d9692'; c.lineWidth = 6; c.lineCap = 'round'; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -390); c.moveTo(-40, 0); c.lineTo(40, 0); c.moveTo(0, -380); c.lineTo(-26, -398); c.moveTo(0, -380); c.lineTo(26, -398); c.stroke();
    pinta(c, o, t, -370, -120, c => { c.moveTo(-26, -372); c.lineTo(26, -372); c.lineTo(66, -340); c.lineTo(78, -230); c.lineTo(56, -226); c.lineTo(52, -290); c.lineTo(62, -110); c.lineTo(-62, -110); c.lineTo(-52, -290); c.lineTo(-56, -226); c.lineTo(-78, -230); c.lineTo(-66, -340); c.closePath(); });
    c.strokeStyle = mix('#56605a', E.C.amOsc, on); c.lineWidth = 5; c.beginPath(); c.moveTo(-50, -230); c.lineTo(50, -230); c.moveTo(0, -372); c.lineTo(0, -112); c.stroke(); },
  mesa(c, o, t) { tiembla(c, o, t); const w = o.w || 220;
    pinta(c, o, t, -170, 0, c => { rr(c, -w / 2, -170, w, 22, 6); rr(c, -w / 2 + 14, -150, 14, 150, 5); rr(c, w / 2 - 28, -150, 14, 150, 5); }); },
  estanteria(c, o, t) { tiembla(c, o, t); const w = o.w || 170, h = o.h || 340;
    pinta(c, o, t, -h, 0, c => { c.rect(-w / 2, -h, w, h); });
    const ap = E.clamp(E.kf(o.apagado, t, 0)); c.strokeStyle = mix('#8d9692', '#3e4241', ap); c.lineWidth = 4;
    for (let k = 1; k < 3; k++) { c.beginPath(); c.moveTo(-w / 2, -h + k * h / 3); c.lineTo(w / 2, -h + k * h / 3); c.stroke(); }
    c.fillStyle = mix('#5d6461', '#2c302e', ap); for (let k = 0; k < 3; k++) for (let i = 0; i < 5; i++) { const bh = h / 3 - 22 - ((i * 7 + k * 3) % 4) * 8, bx = -w / 2 + 14 + i * 28; c.fillRect(bx, -h + (k + 1) * h / 3 - bh - 3, 20, bh); } },
  // calendario de 30 días que se rellena (p = días marcados)
  calendario(c, o, t) { const p = E.kf(o.p, t, 0), cols = 6, s = 40, g = 8, W0 = cols * (s + g) - g;
    c.fillStyle = '#101513'; c.strokeStyle = '#56605a'; c.lineWidth = 4; c.beginPath(); rr(c, -W0 / 2 - 16, -140, W0 + 32, 280, 16); c.fill(); c.stroke();
    c.fillStyle = '#56605a'; c.beginPath(); rr(c, -W0 / 2 - 16, -140, W0 + 32, 40, [16, 16, 0, 0]); c.fill();
    c.fillStyle = E.C.am; for (const x of [-70, 70]) { c.beginPath(); c.arc(x, -140, 8, 0, 7); c.fill(); }
    for (let i = 0; i < 30; i++) { const q = i % cols, r = (i / cols) | 0, x = -W0 / 2 + q * (s + g), y = -88 + r * (s + g); const k = E.clamp(p - i);
      c.fillStyle = '#2a2e2c'; c.beginPath(); rr(c, x, y, s, s, 7); c.fill();
      if (k > 0) { const sc = 0.5 + 0.5 * E.EASE.back(k); c.save(); c.translate(x + s / 2, y + s / 2); c.scale(sc, sc); c.fillStyle = GR(c, -s / 2, s / 2); c.beginPath(); rr(c, -s / 2, -s / 2, s, s, 7); c.fill(); c.restore(); } } },
});

// «La primera: // …» → T en «La», S en la primera palabra del punto
const N = [3, 5, 7].map(li => ({ T: w(li, 0) - 0.05, S: w(li, 2) - 0.12 }));
const fin = k => N[k].T + 0.45;
const TC = w(9, 0) - 0.1;

E.camara([
  [0, [0, -380, 1.04]], [w(0, 9), [20, -370, 1.08]], [w(1, 0), [0, -380, 1.01]], [w(1, 13), [10, -390, 1.05]], [w(2, 0), [0, -385, 1.03]], [N[0].T, [20, -395, 1.06]],
  [N[0].S - 0.05, [0, -380, 1], 'lin'], [w(4, 0), [0, -385, 1.03]], [w(4, 11), [10, -385, 1.05]], [N[1].T, [0, -390, 1.06]],
  [N[1].S - 0.05, [0, -380, 1], 'lin'], [w(6, 0), [10, -390, 1.04]], [N[2].T, [0, -390, 1.05]],
  [N[2].S - 0.05, [0, -380, 1], 'lin'], [w(8, 5), [10, -385, 1.04]], [TC, [0, -390, 1.05]],
]);

// ---------- gancho: sofá nuevo amarillo; la alfombra gris tiembla ----------
// 0: Te(0) compras(1) un(2) sofá(3) nuevo(4) y(5) de(6) repente(7) la(8) alfombra(9) ya(10) no(11) pega(12)
E.figura('yo', { t0: 0, t1: w(1, 0) + 0.1, sale: 0.25, x: -340, cara: true,
  poses: [[0, 'de_pie'], [w(0, 1), 'ofrecer'], [w(0, 4), 'celebrar'], [w(0, 8), 'senalar'], [w(0, 11), 'manos_cabeza']],
  sonrisa: [[0, 0.3], [w(0, 3), 1.2], [w(0, 8), 0], [w(0, 11), -1]] });
E.obj('alf0', 'alfombra', { t0: 0, t1: w(1, 0) + 0.1, sale: 0.25, x: 130, w: 440, tiembla: [[0, 0], [w(0, 9), 0], [w(0, 10), 1, 'out']], caja: [-220, 6, 440, 58] });
E.obj('precio0', 'etiqueta', { t0: 0, t1: w(0, 9), sale: 0.25, x: 130, y: -340, w: 300, h: 96, on: 1, v: [[0.25, 0], [w(0, 4), 899, 'out']], barrido: [w(0, 4)], caja: [-150, -48, 300, 96] });
E.obj('sofa0', 'sofa', { t0: w(0, 3) - 0.1, t1: w(1, 0) + 0.1, sale: 0.25, x: 130, w: 320, on: 1, pop: true, barrido: [w(0, 4) + 0.1], caja: [-160, -176, 320, 176] });
E.obj('noPega', 'rotulo', { t0: w(0, 11) - 0.05, t1: w(1, 0) + 0.1, sale: 0.2, x: 130, y: 120, texto: 'NO PEGA', size: 34, col: '#e4574f', pop: true, caja: [-90, -20, 180, 40] });
E.temblor(w(0, 12), 12, 0.4);

// ---------- Diderot: la bata nueva y el despacho que se apaga ----------
// 1: Se(0) llama(1) efecto(2) Diderot(3) el(4) filósofo(5) estrenó(6) una(7) bata(8) y(9) a(10) su(11) lado(12) todo(13) el(14) despacho(15) le(16) pareció(17) viejo(18)
const B0 = w(2, 0);
E.obj('rotDid', 'rotulo', { t0: w(1, 1), t1: w(1, 12), sale: 0.2, x: 60, y: -500, texto: 'EFECTO DIDEROT', size: 40, col: '#e6ce46', pop: true, track: 6, barrido: [w(1, 3) + 0.1], caja: [-230, -24, 460, 48] });
E.figura('did', { t0: w(1, 4) - 0.1, t1: B0 + 0.1, sale: 0.25, x: -360, talla: 440, color: 'gris',
  poses: [[0, 'de_pie'], [w(1, 6), 'ofrecer'], [w(1, 9), 'de_pie'], [w(1, 13), 'pensar'], [w(1, 16), 'senalar']] });
E.obj('bata', 'bata', { t0: w(1, 6) - 0.1, t1: B0 + 0.1, sale: 0.25, x: -140, pop: true, on: [[0, 0], [w(1, 8), 0], [w(1, 8) + 0.3, 1]], barrido: [w(1, 9)], caja: [-80, -400, 160, 400], refl: true });
E.obj('mesaD', 'mesa', { t0: w(1, 4), t1: B0 + 0.1, sale: 0.25, x: 120, w: 220, pop: true, apagado: [[0, 0], [w(1, 13), 0], [w(1, 14) + 0.2, 1]], tiembla: [[0, 0], [w(1, 13), 0], [w(1, 14), 1], [w(1, 18), 0.4]], caja: [-110, -170, 220, 170], refl: true });
E.obj('estD', 'estanteria', { t0: w(1, 4) + 0.15, t1: B0 + 0.1, sale: 0.25, x: 370, pop: true, apagado: [[0, 0], [w(1, 15), 0], [w(1, 16) + 0.2, 1]], tiembla: [[0, 0], [w(1, 15), 0], [w(1, 16), 1], [w(1, 18), 0.4]], caja: [-85, -340, 170, 340], refl: true });
E.obj('decis', 'bocadillo', { t0: w(1, 13) - 0.1, t1: B0 - 0.15, sale: 0.2, x: -150, y: -515, w: 500, h: 76, texto: 'Ya puestos, cambio también la mesa', size: 25, pop: true, caja: [-250, -38, 500, 102] });
E.temblor(w(1, 18), 8, 0.35);

// ---------- «Tres maneras de cortar la cadena»: tres monedas unidas; la cadena se corta ----------
// 2: Tres(0) maneras(1) de(2) cortar(3) la(4) cadena(5)
E.figura('yoT', { t0: B0 - 0.1, t1: fin(0), x: -340, cara: true, poses: [[0, 'de_pie'], [w(2, 0), 'senalar'], [w(2, 3), 'celebrar']], sonrisa: [[0, 0.4], [w(2, 3), 1.2]] });
E.obj('cadena', 'flecha', { t0: B0, t1: w(2, 3) + 0.25, sale: 0.2, de: [-40, -420], hasta: [340, -420], curva: 0, col: '#8d9692', w: 6, discontinua: true, punta: false, z: -1, p: [[B0, 0], [B0 + 0.4, 1]], inspeccion: false });
[0, 1, 2].forEach(i => { const a = B0 + i * 0.12;
  E.obj('h' + (i + 1), 'moneda', { t0: a, t1: i === 2 ? N[0].T + 0.1 : N[0].T + 0.45, entra: 0.15, x: 50 + i * 120, y: -420, r: 38, n: i + 1, pop: true, sfx: i === 0, inspeccion: false,
    sobrevive: i === 2, s: i === 2 ? [[0, 1], [w(2, 5), 1], [w(2, 5) + 0.35, 1.3, 'back']] : 1 }); });
E.obj('chCad', 'chispas', { t0: w(2, 3) + 0.1, t1: w(2, 3) + 0.9, x: 110, y: -420, r0: 30, r1: 120, inspeccion: false });
E.golpe(w(2, 3) + 0.1, 0.04);

// ---------- 1 · antes de comprar, piensa qué más vas a querer cambiar ----------
// 3: La(0) primera(1) antes(2) de(3) comprar(4) algo(5) piensa(6) qué(7) más(8) vas(9) a(10) querer(11) cambiar(12) después(13)
// 4: La(0) lámpara(1) nueva(2) hace(3) que(4) las(5) cortinas(6) parezcan(7) viejas(8) Y(9) las(10) cortinas(11) el(12) sofá(13)
const F1 = wf(4, -1);
E.numero(1, N[0].T, N[0].S, { desde: 'h3', hacia: 'lamp1' });
E.figura('yo1', { t0: N[0].S - 0.1, t1: fin(1), x: -365, cara: true,
  poses: [[0, 'de_pie'], [w(3, 4), 'senalar'], [w(3, 6), 'pensar'], [w(4, 0), 'senalar'], [w(4, 8), 'encoger'], [w(4, 12), 'senalar'], [F1, 'manos_cabeza']],
  sonrisa: [[w(3, 4), 0.8], [w(3, 6), 0], [w(4, 8), -0.3], [F1, -1.2]] });
E.obj('lamp1', 'lampara', { t0: N[0].S - 0.1, t1: fin(1), x: -170, r: 70, oy: -260, pop: true, on: [[0, 0], [w(3, 4), 0], [w(3, 4) + 0.25, 1]], barrido: [w(4, 2)], caja: [-60, -320, 120, 320], refl: true });
E.obj('cort1', 'cortinas', { t0: w(3, 8) - 0.1, t1: fin(1), x: 50, pop: true, fantasma: [[0, 1], [w(4, 5), 1], [w(4, 5) + 0.01, 0]],
  tiembla: [[0, 0], [w(4, 7), 0], [w(4, 7) + 0.15, 1], [w(4, 9), 1], [w(4, 9) + 0.2, 0]], on: [[0, 0], [w(4, 9), 0], [w(4, 9) + 0.3, 1]], caja: [-111, -396, 222, 280] });
E.obj('sofa1', 'sofa', { t0: w(3, 11) - 0.1, t1: fin(1), x: 300, w: 240, pop: true, fantasma: [[0, 1], [w(4, 11), 1], [w(4, 11) + 0.01, 0]],
  tiembla: [[0, 0], [w(4, 11), 0], [w(4, 11) + 0.15, 1], [F1 - 0.1, 1], [F1 + 0.1, 0]], on: [[0, 0], [F1 - 0.1, 0], [F1 + 0.2, 1]], caja: [-120, -132, 240, 132], refl: true });
E.obj('total1', 'etiqueta', { t0: w(3, 4) - 0.15, t1: fin(1), x: 100, y: -480, w: 300, h: 96, on: 1, pop: true, sobrevive: true, r: 60,
  v: [[w(3, 4), 0], [w(3, 4) + 0.6, 60, 'out'], [w(4, 9), 60], [w(4, 9) + 0.6, 240, 'out'], [F1 - 0.1, 240], [F1 + 0.7, 1140, 'out']], barrido: [F1 + 0.7], caja: [-150, -48, 300, 96] });
E.obj('fl1a', 'flecha', { t0: w(4, 3) - 0.1, t1: fin(1), de: [-150, 40], hasta: [20, 40], curva: -0.25, p: [[w(4, 3), 0], [w(4, 5), 1, 'out']], inspeccion: false });
E.obj('fl1b', 'flecha', { t0: w(4, 10) - 0.1, t1: fin(1), de: [90, 40], hasta: [270, 40], curva: -0.25, p: [[w(4, 10), 0], [w(4, 12), 1, 'out']], inspeccion: false });
E.temblor(w(4, 13), 8, 0.35);
E.obj('ch1', 'chispas', { t0: F1 + 0.7, t1: F1 + 1.5, x: 100, y: -480, r0: 120, r1: 220, inspeccion: false });
E.golpe(F1 + 0.7, 0.04); E.destello(F1 + 0.7, 0.12);

// ---------- 2 · ponle un tope a todo lo que venga detrás ----------
// 5: La(0) segunda(1) ponle(2) un(3) tope(4) a(5) todo(6) lo(7) que(8) venga(9) detrás(10)
// 6: Decide(0) cuánto(1) vas(2) a(3) gastarte(4) en(5) total(6) no(7) solo(8) en(9) la(10) primera(11) compra(12)
const BX = 90, MK = 0.62, xBar = p => BX - 280 + 8 + 544 * p;
E.numero(2, N[1].T, N[1].S, { desde: 'total1', hacia: 'tope' });
E.figura('yo2', { t0: N[1].S - 0.1, t1: fin(2), x: -380, cara: true,
  poses: [[0, 'de_pie'], [w(5, 2), 'levantar'], [w(5, 6), 'senalar'], [w(6, 0), 'de_pie'], [w(6, 6), 'celebrar'], [w(6, 8), 'senalar']],
  sonrisa: [[w(5, 2), 0.6], [w(6, 6), 1.5], [w(6, 8), 0.6]] });
E.obj('tope', 'barra', { t0: N[1].S - 0.1, t1: fin(2), x: BX, y: -260, w: 560, h: 52, pop: true, sobrevive: true, r: 60,
  f: [[w(6, 0), 0], [w(6, 1) + 0.3, 0.4, 'out'], [w(6, 4), 0.4], [w(6, 6) + 0.1, MK, 'inout']], marca: [[0, -1], [w(5, 4) - 0.01, -1], [w(5, 4), MK]], rotMarca: 'TOPE 1.000 €',
  barrido: [w(6, 6) + 0.1, w(6, 11)], caja: [-280, -110, 560, 140] });
E.sfx(w(5, 4), 'thud'); E.sfx(w(6, 0), 'fill'); E.sfx(w(6, 4), 'fill');
E.obj('rotTot', 'rotulo', { t0: w(6, 0) - 0.1, t1: fin(2), x: BX, y: -510, texto: 'EN TOTAL', size: 24, col: '#9a9c9b', pop: true, caja: [-80, -15, 160, 30] });
E.obj('total2', 'contador', { t0: w(6, 0) - 0.1, t1: fin(2), x: BX, y: -445, v: [[w(6, 0), 0], [w(6, 1) + 0.3, 600, 'out'], [w(6, 4), 600], [w(6, 6) + 0.1, 1000, 'inout']], suf: ' €', size: 56, col: 'txt', pop: true, caja: [-130, -34, 260, 68] });
// «todo lo que venga detrás»: tres compras pequeñas esperan y luego caen dentro de la barra
['+', '+', '+'].forEach((s, i) => { const a = w(5, 6) + i * 0.15, land = w(6, 4) + i * 0.12;
  E.obj('det' + i, 'pieza', { t0: a, t1: land + 0.45, sale: 0.15, r: 24, texto: s, on: 0, pop: true, sfx: i === 0, libre: true, inspeccion: false,
    x: [[a, 170 + i * 70], [land, 170 + i * 70], [land + 0.4, xBar(0.45 + i * 0.06), 'in']], y: [[a, -150], [land, -150], [land + 0.4, -260, 'in']] }); });
E.obj('rotSofa', 'rotulo', { t0: w(6, 1), t1: fin(2), x: xBar(0.2), y: -190, texto: 'SOFÁ', size: 22, col: '#9a9c9b', pop: true, luz: [[0, 1], [w(6, 9), 1], [w(6, 11), 0.45]], caja: [-40, -14, 80, 28] });
E.obj('rotDet', 'rotulo', { t0: w(6, 4) + 0.3, t1: fin(2), x: xBar(0.51) + 20, y: -190, texto: 'LO DE DETRÁS', size: 22, col: '#e6ce46', pop: true, barrido: [w(6, 11)], caja: [-95, -14, 190, 28] });
E.obj('ch2', 'chispas', { t0: w(6, 6) + 0.1, t1: w(6, 6) + 0.9, x: xBar(MK), y: -260, r0: 50, r1: 150, inspeccion: false });
E.golpe(w(6, 6) + 0.1, 0.04); E.destello(w(6, 6) + 0.1, 0.1);

// ---------- 3 · espera un mes antes de comprar lo siguiente ----------
// 7: La(0) tercera(1) espera(2) un(3) mes(4) antes(5) de(6) comprar(7) lo(8) siguiente(9)
// 8: Al(0) cabo(1) de(2) un(3) mes(4) la(5) alfombra(6) vieja(7) ya(8) no(9) te(10) parece(11) tan(12) fea(13)
const M30 = wf(8, 4);
E.numero(3, N[2].T, N[2].S, { desde: 'tope', hacia: 'cal' });
E.figura('yo3', { t0: N[2].S - 0.1, t1: TC, x: -380, cara: true,
  poses: [[0, 'de_pie'], [w(7, 2), 'pensar'], [w(7, 7), 'apartarse'], [w(8, 0), 'de_pie'], [w(8, 6), 'senalar'], [w(8, 12), 'celebrar']],
  sonrisa: [[w(7, 2), 0.3], [w(7, 7), 0.6], [w(8, 6), 0.4], [w(8, 12), 1.5]] });
E.obj('cal', 'calendario', { t0: N[2].S - 0.1, t1: TC, x: 170, y: -400, r: 70, pop: true, p: [[w(7, 2), 0], [M30, 30, 'inout']], barrido: [M30], caja: [-160, -148, 320, 288] });
E.obj('dia3', 'contador', { t0: w(7, 2) - 0.1, t1: TC, x: -150, y: -450, v: [[w(7, 2), 1], [M30, 30, 'inout']], pre: 'DÍA ', size: 44, col: 'txt', miles: false, pop: true, caja: [-110, -28, 220, 56] });
E.sfx(w(7, 2), 'fill');
E.obj('lampF', 'lampara', { t0: w(7, 7) - 0.1, t1: w(8, 5), sale: 0.3, x: -150, fantasma: 1, pop: true, caja: [-60, -320, 120, 320] });
E.obj('sofa3', 'sofa', { t0: N[2].S - 0.1, t1: TC, x: 170, w: 280, on: 1, pop: true, caja: [-140, -154, 280, 154], refl: true });
E.obj('alf3', 'alfombra', { t0: N[2].S - 0.1, t1: TC, x: 170, w: 440, tiembla: [[0, 1], [w(8, 5), 1], [w(8, 12), 0, 'out']], ok: [[0, 0], [w(8, 12), 0], [w(8, 13), 1]], barrido: [w(8, 13)], caja: [-220, 6, 440, 58] });
E.obj('ch3', 'chispas', { t0: w(8, 13), t1: w(8, 13) + 0.8, x: 170, y: 30, r0: 120, r1: 240, inspeccion: false });
E.obj('ch3b', 'chispas', { t0: M30, t1: M30 + 0.8, x: 170, y: -400, r0: 120, r1: 200, inspeccion: false });
E.golpe(w(8, 13), 0.04); E.destello(w(8, 13), 0.12);

// ---------- cierre: resumen y envío ----------
// 9: Lo(0) caro(1) no(2) es(3) lo(4) que(5) compras(6) es(7) todo(8) lo(9) que(10) viene(11) detrás(12)
// 10: Mándaselo(0) a(1) quien(2) se(3) acaba(4) de(5) comprar(6) un(7) sofá(8)
E.obj('rayosC', 'rayos', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, r: 520, z: -2, p: [[TC, 0], [w(9, 8), 1, 'out']], inspeccion: false, sinDim: true });
E.obj('resumen', 'resumen', { t0: TC, t1: w(10, 0), capa: 'pantalla', x: 540, y: 960, items: ['Piensa', 'Tope', 'Un mes'], gap: 230,
  p: [[TC, 0], [TC + 0.8, 3, 'lin']], barrido: [w(9, 8)], caja: [-360, -60, 720, 200] });
E.obj('confC', 'confeti', { t0: wf(9, -1), t1: wf(9, -1) + 1.9, capa: 'pantalla', x: 540, y: 900, dur: 1.8, n: 50, inspeccion: false });
E.destello(wf(9, -1), 0.22); E.golpe(wf(9, -1), 0.04);
E.figura('yoF', { t0: w(10, 0), t1: D + 1, x: -110, cara: true, poses: [[0, 'de_pie'], [w(10, 1), 'senalar']] });
E.obj('enviar', 'enviar', { t0: w(10, 1), t1: D + 1, x: 120, y: -360, r: 64, pop: true, barrido: [w(10, 8)], vuelo: [[wf(10, -1), 0], [wf(10, -1) + 0.5, 1, 'in']] });
