// Motor del estilo B («listas en negro», docs/ANALISIS-REFERENCIA-B.md): canvas 2D determinista, 1080x1920.
// Contrato con las herramientas (igual que motor/engine.js): window.ready, window.DURATION, window.seek(t), #cv,
// window.inspect(t), window.inspectPixels(t), window.soundEvents().
// La escena de cada reel (reels/ID/escena.js) usa la API E.* de abajo; el subtítulo sale solo de reel.json + timing.json.
'use strict';
const W = 1080, H = 1920;
const cv = document.getElementById('cv'); cv.width = W; cv.height = H;
const ctx = cv.getContext('2d');
const mk = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; };
const LW = mk(), lw = LW.getContext('2d');      // capa del mundo (se refleja en el suelo)
const LR = mk(), lr = LR.getContext('2d');      // reflejo

// ---------- utilidades ----------
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, k) => a + (b - a) * k;
const EASE = {
  lin: k => k,
  inout: k => k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2,
  out: k => 1 - Math.pow(1 - k, 3),
  in: k => k * k * k,
  back: k => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2); },
};
// keyframes: [[t, v, ease?], ...]; v número o array; ease del tramo que llega a ese key
function kf(list, t, def) {
  if (list === undefined) return def;
  if (typeof list === 'number' || typeof list === 'string' || typeof list === 'boolean') return list;
  if (!Array.isArray(list) || !list.length) return def;
  if (t <= list[0][0]) return list[0][1];
  for (let i = 1; i < list.length; i++) {
    const [t1, v1, e] = list[i];
    if (t <= t1) {
      const [t0, v0] = list[i - 1]; const k = (EASE[e || 'inout'])(clamp((t - t0) / Math.max(1e-6, t1 - t0)));
      if (Array.isArray(v0)) return v0.map((a, j) => lerp(a, v1[j], k));
      if (typeof v0 === 'number') return lerp(v0, v1, k);
      return k < 1 ? v0 : v1;
    }
  }
  return list[list.length - 1][1];
}
const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const mix = (a, b, k) => { const A = hex(a), B = hex(b); return `rgb(${A.map((x, i) => Math.round(lerp(x, B[i], k))).join(',')})`; };

const C = {
  am: '#e6ce46', amL: '#f4d955', amD: '#c69f25', amTxt: '#e3c440', amOsc: '#3b3214',
  txt: '#e8e8e6', txtD: '#9a9c9b', pierna: '#e9e9e7', piernaB: '#a3a6a5',
  gris: '#5d6160', grisCab: '#e4e4e2', claro: '#9a9d9c', linea: '#56605a', lineaD: '#3a4540', relleno: '#0e1311', suelo: '#2c2f2e',
};
const FONT = 'Inter';

// ---------- estado de la escena ----------
const CFG = { fondo: 'grafito', progreso: null, cursiva: false, sub: 'dos', subY: 700, camara: [[0, [0, -370, 1]]], cover: 1.5 };
const ITEMS = [];          // objetos y personajes
const NUMS = [];           // transiciones de número
const EXTRA_SFX = [];
let DUR = (window.TIMING && TIMING.duration) || 30;

const E = window.E = {
  C, kf, EASE, clamp, lerp,
  config(o) { Object.assign(CFG, o); },
  camara(keys) { CFG.camara = keys; },          // [[t, [x, y, zoom], ease?], ...]  (x, y: punto del mundo en el centro)
  // palabra k de la frase i (de timing.json): tiempo de inicio
  w(i, k = 0) { const row = TIMING.words[i]; if (!row) return 0; k = k < 0 ? row.length + k : k; return row[clamp(k, 0, row.length - 1)][0]; },
  wf(i, k = -1) { const row = TIMING.words[i]; if (!row) return 0; k = k < 0 ? row.length + k : k; return row[clamp(k, 0, row.length - 1)][1]; },
  // personaje: E.figura('yo', {t0, t1, x, y, dir, talla, color, cara, poses:[[t, 'pose'|{...}|fn]], ...})
  figura(id, o) { const it = Object.assign({ id, kind: 'figura', capa: 'mundo', t0: 0, t1: 1e9, x: 0, y: 0, dir: 1, talla: 500, color: 'am', refl: true, poses: [[0, 'de_pie']] }, o); ITEMS.push(it); return it; },
  // objeto: E.obj('id', 'tipo', {t0, t1, x, y, s, a, rot, p, capa:'mundo'|'pantalla', refl, ...parámetros del tipo})
  obj(id, tipo, o) { const it = Object.assign({ id, kind: 'obj', tipo, t0: 0, t1: 1e9, x: 0, y: 0, capa: 'mundo', refl: false }, o); ITEMS.push(it); return it; },
  // transición de número (docs/ANALISIS-REFERENCIA-B.md §4): en T la escena se oscurece, la moneda n aparece (desde un
  // objeto o desde el indicador), espera, y en S (inicio de la escena nueva) se va a un objeto nuevo o se encoge.
  numero(n, T, S, o = {}) { NUMS.push(Object.assign({ n, T, S }, o)); },
  sfx(t, kind, f) { EXTRA_SFX.push({ t, kind, f }); },
  golpe(t, f = 0.04) { GOLPES.push({ t, f }); },
};

// ---------- cámara ----------
const GOLPES = [];
function cam(t) {
  const v = kf(CFG.camara, t, [0, -370, 1]);
  // deriva lenta continua (la cámara nunca está del todo quieta) y golpes de zoom en momentos clave
  const dr = CFG.deriva ?? 1; let z = v[2] * (1 + 0.006 * dr * Math.sin(t * 0.55 + 0.4));
  for (const g of GOLPES) { const k = t - g.t; if (k >= 0 && k < 0.9) z *= 1 + g.f * Math.sin(Math.min(1, k / 0.12) * Math.PI / 2) * Math.exp(-k * 4.5); }
  return { x: v[0] + 5 * dr * Math.sin(t * 0.83), y: v[1] + 4 * dr * Math.sin(t * 0.61 + 1.3), z };
}
function toScreen(p, cm) { return [W / 2 + (p[0] - cm.x) * cm.z, H / 2 + (p[1] - cm.y) * cm.z]; }

// ---------- figura ----------
const POSES = {
  de_pie: { lean: 0, hf: 4, kf: 2, hb: -4, kb: 2, sf: 6, ef: 8, sb: -6, eb: 6, cab: 0 },
  senalar: { lean: 0, hf: 4, kf: 2, hb: -4, kb: 2, sf: 80, ef: 6, sb: -6, eb: 6, cab: 0 },
  ofrecer: { lean: 2, hf: 4, kf: 2, hb: -4, kb: 2, sf: 55, ef: 40, sb: -6, eb: 6, cab: 0 },
  coger: { lean: 14, hf: 10, kf: 10, hb: -8, kb: 6, sf: 50, ef: 15, sb: 20, eb: 20, cab: 6 },
  meter: { lean: 22, hf: 14, kf: 22, hb: -6, kb: 14, sf: 35, ef: 5, sb: 15, eb: 10, cab: 10 },
  levantar: { lean: -2, hf: 4, kf: 2, hb: -4, kb: 2, sf: 150, ef: 10, sb: -6, eb: 6, cab: -8 },
  encoger: { lean: 0, hf: 4, kf: 2, hb: -4, kb: 2, sf: 35, ef: 70, sb: -35, eb: -70, cab: 8 },
  pensar: { lean: 4, hf: 4, kf: 2, hb: -4, kb: 2, sf: 20, ef: 140, sb: -6, eb: 6, cab: 10 },
  triste: { lean: 16, hf: 8, kf: 8, hb: -2, kb: 8, sf: 2, ef: 4, sb: -2, eb: 4, cab: 22 },
  celebrar: { lean: -4, hf: 6, kf: 2, hb: -6, kb: 2, sf: 160, ef: 10, sb: 150, eb: 10, cab: -10 },
  escribir: { lean: 10, hf: 85, kf: 85, hb: 80, kb: 80, sf: 60, ef: 30, sb: 50, eb: 30, cab: 4, sit: 0.27 },
  sentado: { lean: 0, hf: 85, kf: 85, hb: 80, kb: 80, sf: 10, ef: 20, sb: -6, eb: 10, cab: 0, sit: 0.27 },
  manos_cabeza: { lean: 2, hf: 6, kf: 4, hb: -6, kb: 4, sf: 150, ef: 150, sb: 140, eb: 150, cab: -6 },
  apartarse: { lean: -10, hf: -6, kf: 4, hb: -18, kb: 4, sf: -20, ef: 30, sb: -30, eb: 20, cab: -12 },
};
// paso de andar (fase en ciclos)
function andar(ph) {
  const s = Math.sin(ph * 2 * Math.PI), c = Math.cos(ph * 2 * Math.PI);
  return { lean: 4, hf: 22 * s, kf: 8 + 22 * Math.max(0, -c), hb: -22 * s, kb: 8 + 22 * Math.max(0, c), sf: -18 * s, ef: 18, sb: 18 * s, eb: 18, cab: 0, bob: Math.abs(c) * 0.008 };
}
const P0 = POSES.de_pie;
function poseAt(it, t) {
  const L = it.poses; let i = 0; while (i + 1 < L.length && L[i + 1][0] <= t) i++;
  const get = (k, tt) => { const p = L[k][1]; if (typeof p === 'function') return Object.assign({}, P0, p(tt - L[k][0])); if (typeof p === 'string') { if (p === 'andar') return Object.assign({}, P0, andar((tt - L[k][0]) * 1.6)); return POSES[p] || P0; } return Object.assign({}, P0, p); };
  const cur = get(i, t); if (i === 0) return cur;
  const dt = L[i][2] ?? 0.35; const k = EASE.inout(clamp((t - L[i][0]) / dt)); if (k >= 1) return cur;
  const prev = get(i - 1, L[i][0]); const o = {};
  for (const key of new Set([...Object.keys(prev), ...Object.keys(cur)])) { const a = prev[key] ?? P0[key] ?? 0, b = cur[key] ?? P0[key] ?? 0; o[key] = (typeof a === 'number' && typeof b === 'number') ? lerp(a, b, k) : (k < 0.5 ? a : b); }
  return o;
}
const rad = d => d * Math.PI / 180;
const seg = (p, len, angDeg) => [p[0] + Math.sin(rad(angDeg)) * len, p[1] + Math.cos(rad(angDeg)) * len];
function stick(c, a, b, w, col) { c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); }
function stick2(c, a, b, d, w, col) { c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.lineTo(d[0], d[1]); c.stroke(); }
// geometría de la figura en unidades de talla (1 = alto de pie), pies en (0,0), mirando a +x
function figGeom(P) {
  const th = 0.215, sh = 0.215, ua = 0.17, fa = 0.16;
  const hipH = P.sit !== undefined ? P.sit : null;
  const legF = [[0, 0], 0], legB = [[0, 0], 0];
  // pierna: muslo con ángulo hf (desde la vertical hacia delante), espinilla hf - kf
  const footOff = (h, k) => { const k1 = seg([0, 0], th, h); return seg(k1, sh, h - k); };
  const fF = footOff(P.hf, P.kf), fB = footOff(P.hb, P.kb);
  const drop = Math.max(fF[1], fB[1]);
  const hip = [0, hipH !== null ? -hipH : -drop - (P.bob || 0)];
  return { hip, th, sh, ua, fa };
}
function drawFigura(c, it, t, alphaMul) {
  const P = poseAt(it, t); const S = it.talla; const g = figGeom(P);
  const resp = 1 + 0.012 * Math.sin(t * 2.4 + (it.id.length * 1.7));
  const x = kf(it.x, t, 0), y = kf(it.y, t, 0), dir = kf(it.dir, t, 1);
  const col = kf(it.colorK, t, null); // 0 = gris, 1 = amarillo (transformación)
  c.save(); c.translate(x, y);
  if (!P.sit && it.sombra !== false) { const sg = c.createRadialGradient(0, 0, 0, 0, 0, S * 0.14); sg.addColorStop(0, 'rgba(0,0,0,0.45)'); sg.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = sg; c.save(); c.scale(1, 0.18); c.beginPath(); c.arc(0, 0, S * 0.14, 0, 7); c.fill(); c.restore(); }
  c.scale(S * dir, S);
  const hip = g.hip;
  const kneeF = seg(hip, g.th, P.hf), footF = seg(kneeF, g.sh, P.hf - P.kf);
  const kneeB = seg(hip, g.th, P.hb), footB = seg(kneeB, g.sh, P.hb - P.kb);
  // torso, inclinado alrededor de la cadera
  const tl = 0.40 * resp, tw = 0.135, hr = 0.086;
  const lean = rad(P.lean);
  const up = [Math.sin(lean), -Math.cos(lean)];
  const top = [hip[0] + up[0] * (tl - 0.03), hip[1] + up[1] * (tl - 0.03)];
  const sho = [hip[0] + up[0] * (tl - 0.07), hip[1] + up[1] * (tl - 0.07)];
  const head = [top[0] + up[0] * (hr + 0.006) + Math.sin(rad(P.cab)) * 0.012, top[1] + up[1] * (hr + 0.006)];
  const elF = seg(sho, g.ua, P.sf + P.lean), haF = seg(elF, g.fa, P.sf + P.ef + P.lean);
  const elB = seg(sho, g.ua, P.sb + P.lean), haB = seg(elB, g.fa, P.sb + P.eb + P.lean);
  it._geo = { S, x, y, dir, head, hip, footF, footB, haF, top };
  const k = col === null ? (it.color === 'am' ? 1 : 0) : col;
  const pal = it.color === 'claro' ? { a: C.claro, b: C.claro, c: '#b9bcbb' } : null;
  const bodyL = pal ? pal.a : mix('#7a7e7d', C.amL, k), bodyD = pal ? pal.b : mix('#4a4e4d', C.amD, k);
  const headL = pal ? pal.c : mix('#f2f2f0', C.amL, k), headD = pal ? '#8d908f' : mix('#bdbfbe', C.amD, k);
  const LWd = 0.036;
  // pierna y brazo de detrás
  stick2(c, hip, kneeB, footB, LWd, pal ? '#7d807f' : C.piernaB);
  stick2(c, sho, elB, haB, LWd * 0.85, pal ? '#7d807f' : C.piernaB);
  stick2(c, hip, kneeF, footF, LWd, pal ? '#b9bcbb' : C.pierna);
  // torso (cápsula) con degradado
  c.save(); c.translate(hip[0], hip[1]); c.rotate(lean);
  const gr = c.createLinearGradient(-tw / 2, 0, tw / 2, 0); gr.addColorStop(0, bodyL); gr.addColorStop(1, bodyD);
  c.fillStyle = gr; c.beginPath(); c.roundRect(-tw / 2, -tl, tw, tl + 0.02, tw / 2); c.fill();
  c.restore();
  // cabeza (esfera)
  const hg = c.createRadialGradient(head[0] - hr * 0.35, head[1] - hr * 0.4, hr * 0.1, head[0], head[1], hr * 1.05);
  hg.addColorStop(0, headL); hg.addColorStop(1, headD); c.fillStyle = hg; c.beginPath(); c.arc(head[0], head[1], hr, 0, 2 * Math.PI); c.fill();
  if (it.cara) { // cara de B-R1: ojos de punto, cejas y sonrisa, hacia el lado que mira
    const cx = head[0] + hr * 0.28, cy = head[1] + hr * 0.05; c.fillStyle = c.strokeStyle = '#4a3c10'; c.lineWidth = 0.0045; c.lineCap = 'round';
    for (const ex of [-0.032, 0.022]) { c.beginPath(); c.arc(cx + ex, cy - 0.006, 0.0055, 0, 7); c.fill(); c.beginPath(); c.moveTo(cx + ex - 0.012, cy - 0.024); c.lineTo(cx + ex + 0.01, cy - 0.027); c.stroke(); }
    const sm = kf(it.sonrisa, t, 1); c.beginPath(); c.moveTo(cx - 0.024, cy + 0.024); c.quadraticCurveTo(cx - 0.004, cy + 0.024 + 0.02 * sm, cx + 0.016, cy + 0.022); c.stroke();
  }
  stick2(c, sho, elF, haF, LWd * 0.85, pal ? '#b9bcbb' : C.pierna);
  c.restore();
}

// ---------- objetos ----------
function glowDot(c, x, y, r, a = 1) { const g = c.createRadialGradient(x, y, 0, x, y, r * 4); g.addColorStop(0, `rgba(255,236,120,${0.9 * a})`); g.addColorStop(0.25, `rgba(246,214,80,${0.45 * a})`); g.addColorStop(1, 'rgba(246,214,80,0)'); c.fillStyle = g; c.beginPath(); c.arc(x, y, r * 4, 0, 7); c.fill(); c.fillStyle = `rgba(255,244,190,${a})`; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); }
function disco(c, r, col = 'am') {
  const g = c.createRadialGradient(-r * 0.35, -r * 0.4, r * 0.05, 0, 0, r * 1.05);
  if (col === 'am') { g.addColorStop(0, C.amL); g.addColorStop(1, C.amD); } else { g.addColorStop(0, '#6d7270'); g.addColorStop(1, '#3e4241'); }
  c.fillStyle = g; c.beginPath(); c.arc(0, 0, r, 0, 7); c.fill();
}
function texto(c, s, x, y, size, col, weight = 600, align = 'center', italic = false, base = 'middle', track = 0) {
  c.font = `${italic ? 'italic ' : ''}${weight} ${size}px ${FONT}`; c.fillStyle = col; c.textAlign = align; c.textBaseline = base;
  if (track) c.letterSpacing = track + 'px'; c.fillText(s, x, y); if (track) c.letterSpacing = '0px';
}
function lineaObj(c, w = 3, col = C.linea) { c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round'; c.lineJoin = 'round'; }
function check(c, x, y, s, p, col = C.am, w = 6) { if (p <= 0) return; const pts = [[x - s * 0.5, y], [x - s * 0.12, y + s * 0.38], [x + s * 0.55, y - s * 0.42]]; const L1 = Math.hypot(pts[1][0] - pts[0][0], pts[1][1] - pts[0][1]), L2 = Math.hypot(pts[2][0] - pts[1][0], pts[2][1] - pts[1][1]); const d = p * (L1 + L2); lineaObj(c, w, col); c.beginPath(); c.moveTo(...pts[0]); if (d <= L1) c.lineTo(lerp(pts[0][0], pts[1][0], d / L1), lerp(pts[0][1], pts[1][1], d / L1)); else { c.lineTo(...pts[1]); const k = (d - L1) / L2; c.lineTo(lerp(pts[1][0], pts[2][0], k), lerp(pts[1][1], pts[2][1], k)); } c.stroke(); }
function arcoP(c, r, p, w, col, a0 = -Math.PI / 2) { if (p <= 0) return; lineaObj(c, w, col); c.beginPath(); c.arc(0, 0, r, a0, a0 + p * 2 * Math.PI); c.stroke(); }

// número tipo cuentakilómetros: cada cifra rueda hacia arriba cuando cambia (las de la izquierda, al pasar de 9 a 0)
function odometro(c, v, o) {
  const size = o.size || 110, col = o.col === 'txt' ? C.txt : (o.col || C.am), w8 = o.peso || 700;
  const val = Math.max(0, v), n = Math.floor(val + 1e-9), fr = val - n;
  const fu = o.suave ? fr : (fr > 0.55 ? EASE.inout((fr - 0.55) / 0.45) : 0);           // giro de la cifra de las unidades
  const roll = k => (n % Math.pow(10, k)) === Math.pow(10, k) - 1 ? fu : 0;           // una cifra gira si todas las de su derecha son 9
  const shown = String(n).length; const newLead = roll(shown);                        // 9 → 10: aparece una cifra nueva a la izquierda
  c.save(); c.font = `${w8} ${size}px ${FONT}`; const dw = c.measureText('0').width * 1.02, sepw = c.measureText('.').width;
  const pre = o.pre || '', suf = o.mas ? '+' : (o.suf || ''); c.font = `${w8} ${size * 0.62}px ${FONT}`; const pw = pre ? c.measureText(pre).width + 8 : 0, sw = suf ? c.measureText(suf).width + 6 : 0;
  const nd = shown + newLead; const sepN = o.miles === false ? 0 : Math.floor((Math.ceil(nd) - 1) / 3) * Math.min(1, nd - 3 * Math.floor((Math.ceil(nd) - 1) / 3));
  const totW = pw + nd * dw + Math.max(0, sepN) * sepw + sw; let x = -totW / 2; const h = size * 1.08, by = size * 0.05;
  c.fillStyle = col; c.textBaseline = 'middle';
  if (pre) { c.textAlign = 'left'; c.fillText(pre, x, by); x += pw; }
  c.font = `${w8} ${size}px ${FONT}`; c.textAlign = 'center';
  const digits = shown + (newLead > 0 ? 1 : 0);
  for (let k = digits - 1; k >= 0; k--) {
    const isNew = k === shown; const d = isNew ? 0 : Math.floor(n / Math.pow(10, k)) % 10; const fk = isNew ? newLead : roll(k);
    const wk = isNew ? dw * newLead : dw; const cx = x + wk / 2;
    c.save(); c.beginPath(); c.rect(x - 2, -h / 2, wk + 4, h); c.clip();
    if (!isNew) c.fillText(String(d), cx, by - fk * h);
    if (fk > 0) c.fillText(String(isNew ? 1 : (d + 1) % 10), cx, by + (1 - fk) * h);
    c.restore(); x += wk;
    if (o.miles !== false && k > 0 && k % 3 === 0) { const sk = isNew ? newLead : 1; c.textAlign = 'left'; c.globalAlpha *= sk; c.fillText('.', x, by); c.globalAlpha /= Math.max(sk, 1e-3); c.textAlign = 'center'; x += sepw * sk; }
  }
  if (suf) { c.font = `${w8} ${size * 0.62}px ${FONT}`; c.textAlign = 'left'; c.fillText(suf, x + 6, by + size * 0.08); }
  c.restore();
}

const TIPOS = {
  // moneda con número (o símbolo)
  moneda(c, o, t) { const r = kf(o.r, t, 70); disco(c, r); const n = kf(o.n, t, ''); if (n !== undefined && n !== '') texto(c, String(n), 0, r * 0.04, r * 0.72, C.amOsc, 600); },
  // disco amarillo liso (bola, sol sin rayos)
  bola(c, o, t) { disco(c, kf(o.r, t, 120)); },
  // anillo que se dibuja (elipse) con chispa en la punta
  anillo(c, o, t) {
    const rx = kf(o.rx, t, 160), ry = kf(o.ry, t, 260), p = clamp(kf(o.p, t, 1)); if (p <= 0) return; const a0 = kf(o.a0, t, -Math.PI * 0.45);
    lineaObj(c, kf(o.w, t, 4), o.col || 'rgba(214,190,70,0.85)'); c.beginPath(); c.ellipse(0, 0, rx, ry, 0, a0, a0 + p * 2 * Math.PI); c.stroke();
    if (o.chispa !== false && p < 0.999) { const a = a0 + p * 2 * Math.PI; glowDot(c, Math.cos(a) * rx, Math.sin(a) * ry, 7); }
  },
  // arcos abiertos (bucles sin cerrar) alrededor de un punto
  arcoAbierto(c, o, t) { const r = kf(o.r, t, 60), p = clamp(kf(o.p, t, 0.7)); lineaObj(c, kf(o.w, t, 6), o.col || C.am); c.beginPath(); c.arc(0, 0, r, -Math.PI / 2, -Math.PI / 2 + p * 2 * Math.PI); c.stroke(); },
  // temporizador de línea con arco amarillo (B-R1 «30 MIN»)
  temporizador(c, o, t) {
    const r = kf(o.r, t, 120), p = clamp(kf(o.p, t, 0)); c.fillStyle = C.relleno; c.beginPath(); c.arc(0, 0, r, 0, 7); c.fill();
    lineaObj(c, 4, kf(o.hecho, t, 0) > 0.5 ? C.am : C.linea); c.beginPath(); c.arc(0, 0, r, 0, 7); c.stroke();
    arcoP(c, r + 14, p, 8, C.am); if (p > 0 && p < 1) { const a = -Math.PI / 2 + p * 2 * Math.PI; glowDot(c, Math.cos(a) * (r + 14), Math.sin(a) * (r + 14), 6); }
    const hecho = clamp(kf(o.hecho, t, 0));
    c.globalAlpha *= 1 - hecho; texto(c, o.texto ?? '30', 0, -r * 0.08, r * 0.42, C.txt, 600); texto(c, o.sub ?? 'MIN', 0, r * 0.36, r * 0.17, C.txtD, 500, 'center', false, 'middle', 4); c.globalAlpha /= Math.max(1e-3, 1 - hecho);
    if (hecho > 0) check(c, 0, 0, r * 0.8, hecho, C.am, 10);
  },
  // reloj amarillo macizo con marcas (B-R2 «15:00»)
  relojAm(c, o, t) {
    const r = kf(o.r, t, 150); disco(c, r); c.strokeStyle = C.amOsc; c.lineCap = 'round';
    for (let i = 0; i < 12; i++) { const a = i / 12 * 2 * Math.PI; c.lineWidth = r * 0.025; c.beginPath(); c.moveTo(Math.cos(a) * r * 0.82, Math.sin(a) * r * 0.82); c.lineTo(Math.cos(a) * r * 0.9, Math.sin(a) * r * 0.9); c.stroke(); }
    const p = clamp(kf(o.p, t, 0.25)); c.globalAlpha *= 0.55; arcoP(c, r * 0.7, p, r * 0.05, C.amOsc); c.globalAlpha /= 0.55;
    texto(c, o.texto || '15:00', 0, r * 0.03, r * 0.36, '#2d2711', 600);
  },
  // bocadillo de línea con «···» o texto corto
  bocadillo(c, o, t) {
    const w = kf(o.w, t, 150), h = kf(o.h, t, 100), on = clamp(kf(o.on, t, 0));
    c.fillStyle = C.relleno; lineaObj(c, 4, mix('#56605a', '#e6ce46', on));
    c.beginPath(); c.roundRect(-w / 2, -h / 2, w, h, 18); c.moveTo(-w * 0.18, h / 2); c.lineTo(-w * 0.3, h / 2 + 26); c.lineTo(-w * 0.02, h / 2); c.fill(); c.stroke();
    c.fillStyle = C.relleno; c.fillRect(-w * 0.17, h / 2 - 3, w * 0.13, 6);
    if (o.texto) texto(c, o.texto, 0, 2, o.size || 34, mix('#c9ccca', '#e6ce46', on), 600);
    else { const ph = t * 3; for (let i = 0; i < 3; i++) { const b = 0.5 + 0.5 * Math.sin(ph * 2 - i * 0.9); c.fillStyle = mix('#7d8682', '#e6ce46', Math.max(on, 0) * b); c.beginPath(); c.arc((i - 1) * 26, 0, 7, 0, 7); c.fill(); } }
  },
  // lista de renglones con casillas que se marcan; p = cuántas marcadas (0..n), brillo = renglones resaltados
  // (ojo: x, y, s, a, rot y luz son parámetros generales de cualquier objeto; los de cada tipo no pueden llamarse así)
  lista(c, o, t) {
    const n = o.n || 3, w = o.w || 300, gap = o.gap || 70, p = kf(o.p, t, 0), luz = kf(o.brillo, t, 0);
    for (let i = 0; i < n; i++) {
      const y = (i - (n - 1) / 2) * gap; const k = clamp(p - i);
      lineaObj(c, 4, k > 0 ? C.am : C.linea); c.beginPath(); c.roundRect(-w / 2, y - 18, 36, 36, 8); c.stroke();
      check(c, -w / 2 + 18, y, 26, k, C.am, 5);
      const hl = clamp(luz - i); lineaObj(c, 6, mix('#3a4540', '#e6ce46', hl)); c.beginPath(); c.moveTo(-w / 2 + 64, y); c.lineTo(w / 2 - (i % 2) * 50, y); c.stroke();
    }
  },
  // tarro de cristal (línea) con nivel de monedas amarillas, rótulo y tapa
  tarro(c, o, t) {
    const w = o.w || 170, h = o.h || 220, lvl = clamp(kf(o.nivel, t, 0)), tapa = clamp(kf(o.tapa, t, 0)), apag = clamp(kf(o.apagado, t, 0));
    if (lvl > 0) { c.save(); c.beginPath(); c.roundRect(-w / 2 + 8, -h + 30, w - 16, h - 38, 22); c.clip();
      const top = -8 - (h - 46) * lvl; const g = c.createLinearGradient(0, top, 0, -8); g.addColorStop(0, mix('#f4d955', '#5d6160', apag)); g.addColorStop(1, mix('#c69f25', '#3e4241', apag)); c.fillStyle = g; c.fillRect(-w / 2, top, w, h);
      c.strokeStyle = 'rgba(80,64,15,0.45)'; c.lineWidth = 3; for (let yy = -8 - 22; yy > top + 4; yy -= 22) { c.beginPath(); c.moveTo(-w / 2, yy); c.lineTo(w / 2, yy); c.stroke(); }
      c.restore(); }
    lineaObj(c, 4, mix('#7d8a83', '#56605a', apag)); c.beginPath(); c.moveTo(-w / 2 + 14, -h + 26); c.lineTo(-w / 2 + 6, -h + 52); c.lineTo(-w / 2 + 2, -h + 70); c.lineTo(-w / 2 + 2, -20); c.quadraticCurveTo(-w / 2 + 2, 0, -w / 2 + 22, 0); c.lineTo(w / 2 - 22, 0); c.quadraticCurveTo(w / 2 - 2, 0, w / 2 - 2, -20); c.lineTo(w / 2 - 2, -h + 70); c.lineTo(w / 2 - 6, -h + 52); c.lineTo(w / 2 - 14, -h + 26); c.stroke();
    if (tapa > 0) { c.save(); c.translate(0, -h + 14 - (1 - tapa) * 60); c.globalAlpha *= tapa; c.fillStyle = mix('#56605a', '#e6ce46', 0.15); c.beginPath(); c.roundRect(-w / 2 + 4, -14, w - 8, 26, 8); c.fill(); c.restore(); }
    if (o.rotulo) texto(c, o.rotulo, 0, 46, 30, mix('#b9bcbb', '#5d6160', apag), 600, 'center', false, 'middle', 3);
  },
  // pila de monedas vistas de lado (sueldo); n monedas, k = cuántas quedan visibles (0..n)
  pila(c, o, t) {
    const n = o.n || 8, w = o.w || 150, hh = o.hh || 26, k = kf(o.k, t, n);
    for (let i = 0; i < n; i++) { const vis = clamp(k - i); if (vis <= 0) continue; c.save(); c.globalAlpha *= vis; const y = -hh / 2 - i * (hh - 4) - (1 - vis) * 40;
      const g = c.createLinearGradient(-w / 2, 0, w / 2, 0); g.addColorStop(0, C.amL); g.addColorStop(1, C.amD); c.fillStyle = g; c.beginPath(); c.roundRect(-w / 2, y - hh / 2, w, hh, hh / 2); c.fill();
      c.strokeStyle = 'rgba(80,64,15,0.5)'; c.lineWidth = 3; c.beginPath(); c.moveTo(-w / 2 + 14, y + 2); c.lineTo(w / 2 - 14, y + 2); c.stroke(); c.restore(); }
  },
  // tarjeta de compra (pantalla del móvil con producto y botón)
  compra(c, o, t) {
    const w = o.w || 300, h = o.h || 380, pulsa = clamp(kf(o.pulsa, t, 0)), ok = clamp(kf(o.ok, t, 0)), espera = clamp(kf(o.espera, t, 0));
    c.fillStyle = C.relleno; lineaObj(c, 4, C.linea); c.beginPath(); c.roundRect(-w / 2, -h / 2, w, h, 30); c.fill(); c.stroke();
    lineaObj(c, 4, C.lineaD); c.beginPath(); c.roundRect(-w / 2 + 40, -h / 2 + 40, w - 80, h * 0.42, 14); c.stroke();
    // producto: zapatilla esquemática
    lineaObj(c, 5, '#7d8a83'); c.beginPath(); c.moveTo(-70, -h / 2 + 150); c.lineTo(-60, -h / 2 + 100); c.lineTo(-10, -h / 2 + 108); c.lineTo(20, -h / 2 + 130); c.lineTo(75, -h / 2 + 138); c.lineTo(78, -h / 2 + 152); c.closePath(); c.stroke();
    lineaObj(c, 6, C.lineaD); c.beginPath(); c.moveTo(-w / 2 + 40, h * 0.08); c.lineTo(w * 0.15, h * 0.08); c.stroke();
    const by = h / 2 - 70; c.fillStyle = mix('#3a4540', '#e6ce46', Math.max(1 - espera, ok) * (1 - 0.35 * pulsa)); c.beginPath(); c.roundRect(-w / 2 + 40, by - 32, w - 80, 64, 32); c.fill();
    texto(c, ok > 0.5 ? 'COMPRADO' : kf(o.boton, t, 'COMPRAR'), 0, by + 2, 26, ok > 0.5 || espera < 0.5 ? C.amOsc : '#9aa39e', 700, 'center', false, 'middle', 3);
  },
  // corazón amarillo (deseo / gratitud); apag: se apaga a gris
  corazon(c, o, t) { const r = kf(o.r, t, 60), ap = clamp(kf(o.apagado, t, 0)); const g = c.createLinearGradient(-r, -r, r, r); g.addColorStop(0, mix(C.amL, '#6d7270', ap)); g.addColorStop(1, mix(C.amD, '#3e4241', ap)); c.fillStyle = g;
    c.beginPath(); c.moveTo(0, r * 0.95); c.bezierCurveTo(-r * 1.25, r * 0.1, -r * 0.9, -r * 0.95, 0, -r * 0.35); c.bezierCurveTo(r * 0.9, -r * 0.95, r * 1.25, r * 0.1, 0, r * 0.95); c.fill(); },
  // fila de días (L M X J V S D); luz = índice del día iluminado (0..6), p = cuántos marcados
  dias(c, o, t) { const L = o.letras || ['L', 'M', 'X', 'J', 'V', 'S', 'D'], gap = o.gap || 92, on = kf(o.luz, t, -1);
    L.forEach((d, i) => { const x = (i - (L.length - 1) / 2) * gap; const k = clamp(1 - Math.abs(on - i)); c.fillStyle = mix('#1a201d', '#e6ce46', k); lineaObj(c, 3, mix('#3a4540', '#e6ce46', k)); c.beginPath(); c.arc(x, 0, 30, 0, 7); c.fill(); c.stroke(); texto(c, d, x, 2, 26, mix('#7d8682', '#3b3214', k), 700); }); },
  // tarjetas de resumen 1..n con nombre e icono de guardar (B-R3 / B-R1)
  resumen(c, o, t) { const it = o.items, gap = o.gap || 190, p = kf(o.p, t, it.length);
    it.forEach((s, i) => { const k = clamp(p - i); if (k <= 0) return; const x = (i - (it.length - 1) / 2) * gap; c.save(); c.globalAlpha *= k; c.translate(x, (1 - k) * 30);
      c.fillStyle = C.am; c.beginPath(); c.roundRect(-34, -48, 68, 96, 10); c.fill(); texto(c, String(i + 1), 0, 2, 42, C.amOsc, 700); texto(c, s, 0, 92, 30, C.txt, 500); c.restore(); });
    const g = clamp(kf(o.guardar, t, 0)); if (g > 0) { c.save(); c.globalAlpha *= g; c.translate(0, 190); lineaObj(c, 5, C.am); c.beginPath(); c.moveTo(-22, -30); c.lineTo(22, -30); c.lineTo(22, 32); c.lineTo(0, 14); c.lineTo(-22, 32); c.closePath(); if (kf(o.lleno, t, 0) > 0.5) { c.fillStyle = C.am; c.fill(); } c.stroke(); c.restore(); } },
  // icono de seguir (círculo oscuro con silueta y «+»)
  seguir(c, o, t) { const r = kf(o.r, t, 70); c.fillStyle = '#16231d'; lineaObj(c, 4, C.am); c.beginPath(); c.arc(0, 0, r, 0, 7); c.fill(); c.stroke();
    c.fillStyle = C.am; c.beginPath(); c.arc(-r * 0.08, -r * 0.2, r * 0.22, 0, 7); c.fill(); c.beginPath(); c.ellipse(-r * 0.08, r * 0.38, r * 0.4, r * 0.26, 0, Math.PI, 0); c.fill();
    c.fillStyle = C.am; c.beginPath(); c.arc(r * 0.55, r * 0.45, r * 0.26, 0, 7); c.fill(); lineaObj(c, r * 0.07, C.amOsc); c.beginPath(); c.moveTo(r * 0.43, r * 0.45); c.lineTo(r * 0.67, r * 0.45); c.moveTo(r * 0.55, r * 0.33); c.lineTo(r * 0.55, r * 0.57); c.stroke(); },
  // icono de enviar (avión de papel en un círculo): el cierre de envío de la regla 17 («Mándaselo a quien…»)
  enviar(c, o, t) { const r = kf(o.r, t, 70), v = clamp(kf(o.vuelo, t, 0)); c.fillStyle = '#16231d'; lineaObj(c, 4, C.am); c.beginPath(); c.arc(0, 0, r, 0, 7); c.fill(); c.stroke();
    c.save(); c.translate(v * r * 0.9, -v * r * 0.9); c.globalAlpha *= 1 - v * 0.6; c.fillStyle = C.am; c.beginPath(); c.moveTo(-r * 0.5, r * 0.02); c.lineTo(r * 0.5, -r * 0.4); c.lineTo(r * 0.12, r * 0.48); c.lineTo(-r * 0.04, r * 0.14); c.closePath(); c.fill();
    c.fillStyle = C.amOsc; c.beginPath(); c.moveTo(-r * 0.04, r * 0.14); c.lineTo(r * 0.5, -r * 0.4); c.lineTo(r * 0.02, r * 0.34); c.closePath(); c.fill(); c.restore(); },
  // rótulo pequeño en mayúsculas espaciadas
  rotulo(c, o, t) { texto(c, kf(o.texto, t, ''), 0, 0, o.size || 26, o.col || C.txtD, o.peso || 600, 'center', false, 'middle', o.track ?? 4); },
  // barra de tiempo con bloque elástico (Parkinson) o progreso con marca (Hofstadter)
  barra(c, o, t) { const w = kf(o.w, t, 600), h = o.h || 56, f = clamp(kf(o.f, t, 0.3)), m = kf(o.marca, t, -1), f0 = kf(o.f0, t, 0);
    lineaObj(c, 4, C.linea); c.fillStyle = C.relleno; c.beginPath(); c.roundRect(-w / 2, -h / 2, w, h, h / 2); c.fill(); c.stroke();
    if (f > f0) { const g = c.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, C.amL); g.addColorStop(1, C.amD); c.fillStyle = g; c.beginPath(); c.roundRect(-w / 2 + 8 + (w - 16) * f0, -h / 2 + 8, (w - 16) * (f - f0), h - 16, (h - 16) / 2); c.fill(); }
    if (m >= 0) { const x = -w / 2 + 8 + (w - 16) * m; lineaObj(c, 4, C.txt); c.beginPath(); c.moveTo(x, -h / 2 - 26); c.lineTo(x, h / 2 + 26); c.stroke(); if (o.rotMarca) texto(c, o.rotMarca, x, -h / 2 - 52, 26, C.txtD, 600, 'center', false, 'middle', 4); }
    (o.marcas || []).forEach(([pos, s]) => { const x = -w / 2 + 8 + (w - 16) * pos; texto(c, s, x, h / 2 + 46, 24, C.txtD, 600, 'center', false, 'middle', 3); }); },
  // cuadrícula de casillas que se encienden (las «pocas que importan»)
  cuadricula(c, o, t) { const cols = o.cols || 5, rows = o.rows || 4, s = o.lado || 76, gap = o.gap || 16, on = o.on || [], k = clamp(kf(o.p, t, 0)), ap = clamp(kf(o.apagar, t, 0));
    for (let r = 0; r < rows; r++) for (let q = 0; q < cols; q++) { const i = r * cols + q; const x = (q - (cols - 1) / 2) * (s + gap), y = (r - (rows - 1) / 2) * (s + gap); const isOn = on.includes(i);
      c.fillStyle = isOn ? mix('#4a4f4d', '#e6ce46', k) : mix('#4a4f4d', '#2a2e2c', ap); c.beginPath(); c.roundRect(x - s / 2, y - s / 2, s, s, 8); c.fill(); } },
  // nube de enfado (líneas enredadas grises) que se deshace con p→0
  maraña(c, o, t) { const r = kf(o.r, t, 90), p = clamp(kf(o.p, t, 1)), col = o.col || '#8d9692'; if (p <= 0) return; lineaObj(c, 4, col); c.beginPath();
    for (let i = 0; i <= 140 * p; i++) { const a = i * 0.37, rr = r * (0.55 + 0.45 * Math.sin(i * 0.73) * Math.cos(i * 0.21)); const x = Math.cos(a) * rr * 1.25, y = Math.sin(a * 1.13) * rr * 0.7; i ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); },
  // escritorio con monitor de línea (pantalla con líneas)
  escritorio(c, o, t) { const lu = clamp(kf(o.brillo, t, 0)); lineaObj(c, 5, C.linea); c.beginPath(); c.moveTo(-170, -230); c.lineTo(170, -230); c.moveTo(-150, -230); c.lineTo(-150, 0); c.moveTo(150, -230); c.lineTo(150, 0); c.stroke();
    c.fillStyle = C.relleno; lineaObj(c, 4, mix('#56605a', '#e6ce46', lu)); c.beginPath(); c.roundRect(-20, -400, 190, 130, 10); c.fill(); c.stroke(); c.beginPath(); c.moveTo(75, -270); c.lineTo(75, -232); c.stroke();
    lineaObj(c, 6, mix('#3a4540', '#e6ce46', lu)); for (let i = 0; i < 3; i++) { c.beginPath(); c.moveTo(10, -370 + i * 30); c.lineTo(10 + (i === 1 ? 100 : 140), -370 + i * 30); c.stroke(); }
    if (o.silla !== false) { lineaObj(c, 5, C.linea); c.beginPath(); c.moveTo(-330, -135); c.lineTo(-190, -135); c.moveTo(-310, -135); c.lineTo(-310, 0); c.moveTo(-210, -135); c.lineTo(-210, 0); c.stroke(); } },
  // papeles apilados (desbordado)
  papeles(c, o, t) { const n = o.n || 6, k = kf(o.k, t, n); for (let i = 0; i < n; i++) { const v = clamp(k - i); if (v <= 0) continue; c.save(); c.globalAlpha *= v; c.translate(Math.sin(i * 2.1) * 14, -i * 16 - (1 - v) * 60); c.rotate(Math.sin(i * 1.7) * 0.08); c.fillStyle = '#1a201d'; lineaObj(c, 3, C.linea); c.beginPath(); c.roundRect(-80, -14, 160, 22, 4); c.fill(); c.stroke(); c.restore(); } },
  // flecha curva de línea con punta
  flecha(c, o, t) { const p = clamp(kf(o.p, t, 1)); if (p <= 0) return; const [x1, y1] = o.a, [x2, y2] = o.b, bend = o.curva ?? 0.25; const mx = (x1 + x2) / 2 - (y2 - y1) * bend, my = (y1 + y2) / 2 + (x2 - x1) * bend;
    lineaObj(c, o.w || 5, o.col || C.am); c.setLineDash(o.discontinua ? [14, 12] : []); c.beginPath(); c.moveTo(x1, y1); const N = 30; let px = x1, py = y1, qx = x1, qy = y1; for (let i = 1; i <= N * p; i++) { const u = i / N; qx = px; qy = py; px = (1 - u) * (1 - u) * x1 + 2 * (1 - u) * u * mx + u * u * x2; py = (1 - u) * (1 - u) * y1 + 2 * (1 - u) * u * my + u * u * y2; c.lineTo(px, py); } c.stroke(); c.setLineDash([]);
    if (p > 0.95 && o.punta !== false) { const a = Math.atan2(py - qy, px - qx); c.fillStyle = o.col || C.am; c.beginPath(); c.moveTo(px + Math.cos(a) * 14, py + Math.sin(a) * 14); c.lineTo(px + Math.cos(a + 2.5) * 22, py + Math.sin(a + 2.5) * 22); c.lineTo(px + Math.cos(a - 2.5) * 22, py + Math.sin(a - 2.5) * 22); c.fill(); } },
  // ---------- «satisfying»: contadores, rellenos, chispas ----------
  // contador tipo cuentakilómetros: v (valor, con fotogramas clave), pre, suf, size, col, miles ('.' por defecto)
  contador(c, o, t) { odometro(c, kf(o.v, t, 0), o); },
  // chispas que salen en estrella al completar algo (dura 0,7 s desde t0)
  chispas(c, o, t) { const k = clamp((t - o.t0) / (o.dur || 0.7)); if (k >= 1) return; const n = o.n || 12, r0 = o.r0 || 40, r1 = o.r1 || 150;
    for (let i = 0; i < n; i++) { const a = i / n * 2 * Math.PI + (o.giro || 0.2); const e = EASE.out(k); const ra = lerp(r0, r1, e), rb = lerp(r0, r1, Math.max(0, e - 0.25)); lineaObj(c, (o.w || 6) * (1 - k), C.am); c.globalAlpha *= 1; c.beginPath(); c.moveTo(Math.cos(a) * rb, Math.sin(a) * rb); c.lineTo(Math.cos(a) * ra, Math.sin(a) * ra); c.stroke(); } },
  // onda que se expande
  pulso(c, o, t) { const k = clamp((t - o.t0) / (o.dur || 0.6)); if (k >= 1) return; lineaObj(c, 5 * (1 - k) + 1, `rgba(230,206,70,${0.75 * (1 - k)})`); c.beginPath(); c.arc(0, 0, lerp(o.r0 || 40, o.r1 || 140, EASE.out(k)), 0, 7); c.stroke(); },
  // barra de progreso que se rellena con brillo y porcentaje opcional
  relleno(c, o, t) { const w = o.w || 520, h = o.h || 54, f = clamp(kf(o.f, t, 0));
    c.fillStyle = C.relleno; lineaObj(c, 4, C.linea); c.beginPath(); c.roundRect(-w / 2, -h / 2, w, h, h / 2); c.fill(); c.stroke();
    if (f > 0) { const fw = Math.max(h - 16, (w - 16) * f); c.save(); c.beginPath(); c.roundRect(-w / 2 + 8, -h / 2 + 8, fw, h - 16, (h - 16) / 2); c.clip(); const g = c.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, C.amL); g.addColorStop(1, C.amD); c.fillStyle = g; c.fillRect(-w / 2, -h / 2, w, h);
      const sx = -w / 2 + ((t * 420) % (w + 200)) - 100; const sg = c.createLinearGradient(sx - 40, 0, sx + 40, 0); sg.addColorStop(0, 'rgba(255,255,255,0)'); sg.addColorStop(0.5, 'rgba(255,250,215,0.45)'); sg.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = sg; c.fillRect(-w / 2, -h / 2, w, h); c.restore(); }
    if (kf(o.cursor, t, 0) > 0.5 && Math.sin(t * 11) > -0.2) { const cx = -w / 2 + 8 + Math.max(h - 16, (w - 16) * f) + 12; lineaObj(c, 5, C.txt); c.beginPath(); c.moveTo(cx, -h / 2 - 6); c.lineTo(cx, h / 2 + 6); c.stroke(); }
    if (o.pct) { c.save(); c.translate(w / 2 + 84, 2); odometro(c, f * 100, { size: 40, col: f >= 0.999 ? C.am : C.txt, suf: ' %', miles: false }); c.restore(); }
    const rt = kf(o.rotulo, t, ''); if (rt) texto(c, rt, -w / 2, -h / 2 - 34, 26, C.txtD, 600, 'left', false, 'middle', 4); },
  // etiqueta de precio con contador dentro
  etiqueta(c, o, t) { const w = o.w || 300, h = o.h || 140, on = clamp(kf(o.on, t, 1));
    const g = c.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, mix('#3a3e3c', C.amL, on)); g.addColorStop(1, mix('#2a2d2c', C.amD, on)); c.fillStyle = g;
    c.beginPath(); c.moveTo(-w / 2 + 50, -h / 2); c.lineTo(w / 2 - 16, -h / 2); c.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + 16); c.lineTo(w / 2, h / 2 - 16); c.quadraticCurveTo(w / 2, h / 2, w / 2 - 16, h / 2); c.lineTo(-w / 2 + 50, h / 2); c.lineTo(-w / 2, 0); c.closePath(); c.fill();
    c.fillStyle = C.relleno; c.beginPath(); c.arc(-w / 2 + 44, 0, 12, 0, 7); c.fill();
    c.save(); c.translate(24, 4); odometro(c, kf(o.v, t, 0), Object.assign({ size: h * 0.5, col: mix('#c9ccca', '#2d2711', on), suf: ' €' }, o)); c.restore(); },
  // móvil de línea con globo de avisos (contador) y vibración
  telefono(c, o, t) { const w = o.w || 170, h = o.h || 300, vib = clamp(kf(o.vibra, t, 0)), lu = clamp(kf(o.brillo, t, 1));
    if (vib > 0) c.translate(Math.sin(t * 70) * 6 * vib, 0), c.rotate(Math.sin(t * 55) * 0.04 * vib);
    c.fillStyle = C.relleno; lineaObj(c, 5, C.linea); c.beginPath(); c.roundRect(-w / 2, -h / 2, w, h, 26); c.fill(); c.stroke();
    c.fillStyle = mix('#0e1311', '#1d2a23', lu); c.beginPath(); c.roundRect(-w / 2 + 14, -h / 2 + 30, w - 28, h - 60, 12); c.fill();
    lineaObj(c, 6, mix('#26302b', '#4a5a51', lu)); for (let i = 0; i < 4; i++) { c.beginPath(); c.moveTo(-w / 2 + 34, -h / 2 + 70 + i * 50); c.lineTo(w / 2 - 34 - (i % 2) * 30, -h / 2 + 70 + i * 50); c.stroke(); }
    const n = kf(o.avisos, t, 0); if (n >= 0.5) { c.save(); c.translate(w / 2 - 6, -h / 2 + 6); const rr = n >= 9.5 ? 40 : 32; c.fillStyle = C.am; c.beginPath(); c.arc(0, 0, rr, 0, 7); c.fill(); odometro(c, n, { size: n >= 99.5 ? 26 : 34, col: C.amOsc, max: 99, mas: n >= 99.5 }); c.restore(); } },
  // puerta: marco y hoja que se abre (p 0..1)
  puerta(c, o, t) { const w = o.w || 200, h = o.h || 380, p = clamp(kf(o.p, t, 0));
    c.fillStyle = '#080a09'; c.fillRect(-w / 2, -h, w, h); lineaObj(c, 5, C.linea); c.beginPath(); c.moveTo(-w / 2, 0); c.lineTo(-w / 2, -h); c.lineTo(w / 2, -h); c.lineTo(w / 2, 0); c.stroke();
    const lw2 = w * (1 - 0.82 * EASE.inout(p)); c.fillStyle = '#1b1f1d'; lineaObj(c, 4, '#4a5550'); c.beginPath(); c.moveTo(-w / 2, -h); c.lineTo(-w / 2 + lw2, -h + 18 * p); c.lineTo(-w / 2 + lw2, -18 * p); c.lineTo(-w / 2, 0); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = C.am; c.beginPath(); c.arc(-w / 2 + lw2 - 22 * (1 - p * 0.6), -h * 0.48, 7, 0, 7); c.fill(); },
  // bloque grande (tarea) que se divide en n piezas que se van marcando
  bloques(c, o, t) { const n = o.n || 6, W0 = o.w || 520, h = o.h || 110, sp = EASE.inout(clamp(kf(o.parte, t, 0))), k = kf(o.hechos, t, 0), gap = 18 * sp;
    const pw = (W0 - gap * (n - 1)) / n; if (sp < 0.02 && o.texto) { }
    for (let i = 0; i < n; i++) { const x = -W0 / 2 + i * (pw + gap), y = -h / 2 + Math.sin(i * 1.7) * 10 * sp; const d = clamp(k - i);
      const g = c.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, mix('#4a4f4d', C.amL, d)); g.addColorStop(1, mix('#33373a', C.amD, d)); c.fillStyle = g;
      c.beginPath(); c.roundRect(x, y, pw + (1 - sp) * 2, h, lerp(4, 12, sp)); c.fill(); if (d > 0) check(c, x + pw / 2, y + h / 2, Math.min(pw, h) * 0.5, EASE.out(d), C.amOsc, 7); }
    if (o.texto) { c.globalAlpha *= 1 - sp; texto(c, o.texto, 0, 2, 40, C.txt, 600); } },
  // monitor con pestañas que se cierran (n = pestañas abiertas, decimal = la que se está cerrando)
  pestanas(c, o, t) { const w = o.w || 460, h = o.h || 290, n = Math.max(1, kf(o.n, t, 12)), tot = o.max || 14;
    c.fillStyle = C.relleno; lineaObj(c, 5, C.linea); c.beginPath(); c.roundRect(-w / 2, -h, w, h, 14); c.fill(); c.stroke(); c.beginPath(); c.moveTo(0, 0); c.lineTo(0, 40); c.moveTo(-70, 40); c.lineTo(70, 40); c.stroke();
    const full = Math.floor(n), part = n - full; const cnt = full + (part > 0 ? 1 : 0); const avail = w - 40; let x = -w / 2 + 20; const tw0 = Math.min(140, avail / Math.max(1, n));
    for (let i = 0; i < cnt; i++) { const tw = i === cnt - 1 && part > 0 ? tw0 * part : tw0; const last = i === 0; c.fillStyle = last ? C.am : mix('#2b332f', '#3a4540', (i % 3) / 3); c.beginPath(); c.roundRect(x + 2, -h + 18, Math.max(0, tw - 4), 34, 8); c.fill(); x += tw; }
    lineaObj(c, 8, n <= 1.05 ? 'rgba(230,206,70,0.7)' : '#26302b'); for (let i = 0; i < 4; i++) { c.beginPath(); c.moveTo(-w / 2 + 40, -h + 100 + i * 42); c.lineTo(w / 2 - 60 - (i % 2) * 80, -h + 100 + i * 42); c.stroke(); } },
  // ondas de voz (barras que suben con amp; amp 0 = silencio)
  ondas(c, o, t) { const n = o.n || 9, amp = clamp(kf(o.amp, t, 1)), gap = o.gap || 26;
    for (let i = 0; i < n; i++) { const hh = 14 + amp * (30 + 50 * Math.abs(Math.sin(t * 9 + i * 1.3) * Math.cos(t * 4.3 + i * 0.7))); c.fillStyle = o.col || mix('#56605a', '#e6ce46', amp); c.beginPath(); c.roundRect((i - (n - 1) / 2) * gap - 6, -hh / 2, 12, hh, 6); c.fill(); } },
  // cajas de planes (S, M, L) con la elegida iluminada
  planes(c, o, t) { const L = o.items || ['BÁSICO', 'MEDIO', 'GRANDE'], sel = kf(o.sel, t, -1);
    L.forEach((s, i) => { const sz = 120 + i * 50, x = (i - 1) * 230; const k = clamp(1 - Math.abs(sel - i)); c.fillStyle = mix('#151a17', '#2a2510', k); lineaObj(c, 5, mix('#56605a', '#e6ce46', k)); c.beginPath(); c.roundRect(x - sz / 2, -sz, sz, sz, 14); c.fill(); c.stroke(); c.beginPath(); c.moveTo(x - sz / 2, -sz * 0.72); c.lineTo(x + sz / 2, -sz * 0.72); c.stroke(); texto(c, s, x, 40, 24, mix('#8d9692', '#e6ce46', k), 700, 'center', false, 'middle', 3); }); },
  // pieza suelta (cuadradito con símbolo) que vuela de un sitio a otro
  pieza(c, o, t) { const r = kf(o.r, t, 30), on = clamp(kf(o.on, t, 1)); c.fillStyle = mix('#3a4540', C.am, on); c.beginPath(); c.roundRect(-r, -r, 2 * r, 2 * r, 8); c.fill(); if (o.texto) texto(c, o.texto, 0, 2, r, mix('#c9ccca', C.amOsc, on), 700); },
};

// ---------- subtítulos (de reel.json + timing.json) ----------
// sintaxis de `show`: « / » separa subtítulos; *texto* va en amarillo (en su propia línea si va al final).
let CAPS = [];
function buildCaps() {
  CAPS = [];
  REEL.lines.forEach((L, i) => {
    const row = TIMING.words[i] || []; const chunks = L.show.split(/ \/\/? /); let wi = 0;
    for (const ch of chunks) {
      const toks = ch.split(/\s+/).filter(Boolean); let yellow = false; const words = [];
      for (const tok of toks) { const st = tok.startsWith('*'); if (st) yellow = true; const clean = tok.replace(/\*/g, ''); const w = row[wi] || row[row.length - 1] || [0, 0]; words.push({ s: clean, y: yellow, t0: w[0], t1: w[1] }); if (tok.endsWith('*') || tok.endsWith('*,') || tok.endsWith('*.') || /\*[.,:;!?»]*$/.test(tok)) yellow = false; wi++; }
      CAPS.push({ line: i, words, t0: words[0].t0, t1: words[words.length - 1].t1, y: L.subY, estilo: L.estilo });
    }
  });
  CAPS.forEach((c, k) => { const nx = CAPS[k + 1]; c.end = nx ? Math.min(nx.t0 - 0.2, c.t1 + 1.6) : c.t1 + 1.2; if (REEL.lines[c.line].hold) c.end = Math.max(c.end, c.t1 + REEL.lines[c.line].hold); });
}
function capLayout(cp) {
  const una = (cp.estilo || CFG.sub) === 'una';
  const sz1 = una ? 50 : 54, sz2 = una ? 50 : 60;
  const w1 = una ? 600 : 400, w2 = una ? 600 : (CFG.cursiva ? 600 : 500);
  const f1 = `${w1} ${sz1}px ${FONT}`, f2 = `${CFG.cursiva && !una ? 'italic ' : ''}${w2} ${sz2}px ${FONT}`;
  const lines = [[]]; const firstY = cp.words.findIndex(w => w.y);
  cp.words.forEach((w, i) => { if (!una && i === firstY && i > 0 && cp.words.slice(i).every(x => x.y)) lines.push([]); lines[lines.length - 1].push(w); });
  // ajuste a 900 px de ancho
  const out = []; for (const ln of lines) { let cur = []; for (const w of ln) { ctx.font = w.y && !una ? f2 : f1; const test = [...cur, w]; const width = test.reduce((a, x) => { ctx.font = x.y && !una ? f2 : f1; return a + ctx.measureText(x.s + ' ').width; }, 0); if (width > 900 && cur.length) { out.push(cur); cur = [w]; } else cur = test; } out.push(cur); }
  const lh = una ? 66 : 74; const y0 = (cp.y ?? CFG.subY) - (out.length - 1) * lh / 2; const placed = [];
  out.forEach((ln, li) => { const widths = ln.map(w => { ctx.font = w.y && !una ? f2 : f1; return ctx.measureText(w.s).width; }); ctx.font = f1; const sp = ctx.measureText(' ').width; const tot = widths.reduce((a, b) => a + b, 0) + sp * (ln.length - 1); let x = W / 2 - tot / 2; ln.forEach((w, k) => { placed.push({ w, x, y: y0 + li * lh, font: w.y && !una ? f2 : f1, col: w.y ? C.amTxt : C.txt, width: widths[k] }); x += widths[k] + sp; }); });
  return { placed, box: { x: Math.min(...placed.map(p => p.x)) - 10, y: y0 - lh * 0.55, w: Math.max(...placed.map(p => p.x + p.width)) - Math.min(...placed.map(p => p.x)) + 20, h: out.length * lh + 6 } };
}
function drawCaps(t) {
  let box = null;
  for (const cp of CAPS) {
    if (t < cp.t0 - 0.05 || t > cp.end + 0.18) continue;
    const out = clamp((cp.end + 0.18 - t) / 0.18); if (out <= 0) continue;
    const L = cp._L || (cp._L = capLayout(cp)); box = L.box;
    for (const p of L.placed) {
      const k = EASE.out(clamp((t - p.w.t0 + 0.04) / 0.2)); if (k <= 0) continue;
      ctx.save(); ctx.globalAlpha = k * out; if (k < 1) ctx.filter = `blur(${((1 - k) * 8).toFixed(1)}px)`;
      ctx.font = p.font; ctx.fillStyle = p.col; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      if (p.w.y) { const kb = clamp((t - p.w.t0) / 0.32); const sc = 1 + 0.07 * Math.sin(kb * Math.PI); ctx.translate(p.x + p.width / 2, p.y); ctx.scale(sc, sc); ctx.fillText(p.w.s, -p.width / 2, (1 - k) * 8); } else ctx.fillText(p.w.s, p.x, p.y + (1 - k) * 8);
      ctx.restore();
    }
  }
  return box;
}

// ---------- indicador de progreso ----------
function drawProgreso(t) {
  const P = CFG.progreso; if (!P) return null; const a = clamp((t - P.aparece) / 0.4); if (a <= 0) return null;
  const n = P.n, gap = P.gap || 92, y = P.y || 360; let cur = -1; NUMS.forEach((u, i) => { if (t >= u.T + 0.3) cur = i; });
  const x0 = W / 2 - (n - 1) / 2 * gap;
  ctx.save(); ctx.globalAlpha = a;
  if (P.estilo === 'linea') {
    ctx.strokeStyle = '#3a3e3c'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + (n - 1) * gap, y); ctx.stroke();
    let fill = 0; NUMS.forEach((u, i) => { fill = Math.max(fill, (i - 1) + EASE.inout(clamp((t - u.T - 0.1) / 0.5))); });
    if (fill > 0) { ctx.strokeStyle = '#d9bd3c'; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + Math.min(n - 1, fill) * gap, y); ctx.stroke(); }
  }
  for (let i = 0; i < n; i++) {
    const x = x0 + i * gap; const done = i < cur, act = i === cur; const on = act ? clamp((t - NUMS[i].T - 0.3) / 0.3) : (done ? 1 : 0);
    const kb = NUMS[i] ? t - NUMS[i].T - 0.3 : -1; const bump = kb > 0 && kb < 0.5 ? 1 + 0.45 * Math.sin(kb / 0.5 * Math.PI) : 1;
    if (P.estilo === 'barras') { ctx.fillStyle = '#4a4f4d'; ctx.beginPath(); ctx.roundRect(x - 6, y - 18 * bump, 12, 36 * bump, 6); ctx.fill(); if (on > 0) { ctx.save(); ctx.beginPath(); ctx.roundRect(x - 6, y - 18 * bump, 12, 36 * bump, 6); ctx.clip(); ctx.fillStyle = '#e6ce46'; ctx.fillRect(x - 6, y + 18 * bump - 36 * bump * EASE.out(on), 12, 36 * bump); ctx.restore(); } continue; }
    const r = (P.estilo === 'linea' ? (act ? 14 : 10) : (act ? 10 : 8)) * bump;
    ctx.fillStyle = mix('#4a4f4d', '#d9bd3c', on); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
    if (act && P.estilo !== 'puntos') { ctx.strokeStyle = `rgba(217,189,60,${0.8 * on})`; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x, y, r + 11, 0, 7); ctx.stroke(); }
    if (kb > 0 && kb < 0.7) { ctx.strokeStyle = `rgba(230,206,70,${0.6 * (1 - kb / 0.7)})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, 12 + kb / 0.7 * 34, 0, 7); ctx.stroke(); }
  }
  ctx.restore();
  return { x: x0 - 24, y: y - 30, w: (n - 1) * gap + 48, h: 60 };
}
function dotPos(i) { const P = CFG.progreso; const gap = P.gap || 92; return [W / 2 + (i - ((P.n - 1) / 2)) * gap, P.y || 360]; }

// ---------- transiciones de número ----------
const COIN_C = [W / 2, 930], COIN_R = 66;
function dimAt(t) { // oscurecimiento global del mundo por las transiciones
  let d = 1; for (const u of NUMS) { const a = u.T - 0.1, b = u.S + 0.35; if (t < a || t > b + 0.1) continue; const kin = EASE.inout(clamp((t - a) / 0.45)), kout = EASE.inout(clamp((t - u.S) / 0.45)); d = Math.min(d, t < u.S ? 1 - 0.8 * kin : 0.2 + 0.8 * kout); } return d;
}
function itemScreen(id, t) { const it = ITEMS.find(x => x.id === id); if (!it) return null; const cm = cam(t); const [sx, sy] = it.capa === 'pantalla' ? [kf(it.x, t, 0), kf(it.y, t, 0)] : toScreen([kf(it.x, t, 0), kf(it.y, t, 0) + (it.oy || 0)], cm); const r = (it.r !== undefined ? kf(it.r, t, 60) : 60) * kf(it.s, t, 1) * (it.capa === 'pantalla' ? 1 : cm.z); return [sx, sy, r]; }
function pulse(x, y, r0, k, col = '230,206,70', w = 4) { if (k <= 0 || k >= 1) return; ctx.save(); ctx.strokeStyle = `rgba(${col},${0.7 * (1 - k)})`; ctx.lineWidth = w * (1 - k) + 1; ctx.beginPath(); ctx.arc(x, y, r0 + EASE.out(k) * r0 * 1.6, 0, 7); ctx.stroke(); ctx.restore(); }
function drawNums(t) {
  const out = [];
  for (const u of NUMS) {
    if (t < u.T - 0.05 || t > u.S + 1.0) continue;
    // origen: objeto que sobrevive, o punto del indicador
    let from = u.desde ? itemScreen(u.desde, u.T) : null; if (!from) { const d = dotPos(u.n - 1); from = [d[0], d[1], 9]; }
    const kin = EASE.inout(clamp((t - u.T) / 0.5));
    let x = lerp(from[0], COIN_C[0], kin), y = lerp(from[1], COIN_C[1], kin), r = lerp(from[2], COIN_R, kin), a = u.desde ? Math.pow(clamp((t - u.T) / 0.3), 0.6) : 1;
    if (!u.desde) { y = lerp(from[1], COIN_C[1], EASE.back(clamp((t - u.T) / 0.55))); }
    // llegada: aplastar y estirar + onda
    const ka = t - (u.T + 0.5); let sx = 1, sy = 1;
    if (ka > 0 && ka < 0.6) { const b = Math.sin(ka / 0.6 * Math.PI * 2) * Math.exp(-ka * 5) * 0.14; sx = 1 + b; sy = 1 - b; }
    if (t < u.S) pulse(x, y, COIN_R, (t - u.T - 0.45) / 0.6);
    const ko = EASE.inout(clamp((t - u.S) / 0.5)); let to = null;
    if (ko > 0) { to = u.hacia ? itemScreen(u.hacia, u.S + 0.5) : null; if (to) { x = lerp(x, to[0], ko); y = lerp(y, to[1], ko); r = lerp(r, to[2], ko); a *= 1 - clamp((ko - 0.75) / 0.25); } else { r = lerp(r, 0, ko); a *= 1 - ko; } }
    if (to) pulse(to[0], to[1], Math.max(30, to[2] * 0.8), (t - u.S - 0.42) / 0.55);
    if (a <= 0 || r <= 0.5) continue;
    ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(sx, sy); TIPOS.moneda(ctx, { r }, t);
    // el número entra rodando desde abajo, dentro de la moneda
    const kn = EASE.out(clamp((t - u.T - 0.3) / 0.4)); if (kn > 0) { ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r * 0.92, 0, 7); ctx.clip(); texto(ctx, String(u.n), 0, r * 0.04 + (1 - kn) * r * 1.2, r * 0.72, C.amOsc, 600); ctx.restore(); }
    // brillo que cruza la moneda
    const kg = clamp((t - u.T - 0.6) / 0.5); if (kg > 0 && kg < 1) { ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.clip(); ctx.rotate(-0.6); const gx = lerp(-r * 1.6, r * 1.6, kg); const gg = ctx.createLinearGradient(gx - 20, 0, gx + 20, 0); gg.addColorStop(0, 'rgba(255,255,255,0)'); gg.addColorStop(0.5, 'rgba(255,250,215,0.55)'); gg.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = gg; ctx.fillRect(-r * 2, -r * 2, r * 4, r * 4); ctx.restore(); }
    ctx.restore();
    out.push({ id: 'moneda' + u.n, rect: { x: x - r, y: y - r, w: 2 * r, h: 2 * r } });
  }
  return out;
}

// ---------- fondo ----------
function drawFondo() {
  if (CFG.fondo === 'negro') { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); return; }
  if (CFG.fondo === 'degradado') { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#2b2d2c'); g.addColorStop(0.55, '#141615'); g.addColorStop(1, '#070908'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
  else { ctx.fillStyle = '#1d1f1e'; ctx.fillRect(0, 0, W, H); }
  const r = ctx.createRadialGradient(W / 2, H * 0.48, 40, W / 2, H * 0.48, H * 0.62); r.addColorStop(0, 'rgba(255,255,255,0.055)'); r.addColorStop(1, 'rgba(0,0,0,0.18)'); ctx.fillStyle = r; ctx.fillRect(0, 0, W, H);
}

// ---------- dibujo de items ----------
function itemAlpha(it, t) { // entrada y salida por defecto: fundido + desde oscuro
  const fin = it.entra ?? 0.35, fout = it.sale ?? 0.35; const a = clamp((t - it.t0) / fin) * clamp((it.t1 - t) / fout); return a * kf(it.a, t, 1);
}
function drawItem(c, it, t, cm, dim) {
  const a = itemAlpha(it, t); if (a <= 0.001) return null;
  const popFrom = it.kind === 'figura' ? 1 : (it.pop === true ? 0.2 : (it.pop === false ? 1 : 0.72));
  const pk = EASE.back(clamp((t - it.t0) / 0.4));
  let s = kf(it.s, t, 1) * lerp(popFrom, 1, pk);
  const x = kf(it.x, t, 0); let y = kf(it.y, t, 0); const rot = kf(it.rot, t, 0);
  let am = 1;
  for (const u of NUMS) {
    if (u.desde === it.id && t >= u.T) { const k = EASE.inout(clamp((t - u.T) / 0.42)); am *= 1 - k; s *= lerp(1, 0.55, k); }
    if (u.hacia === it.id) { const k = clamp((t - (u.S + 0.42)) / 0.32); if (k > 0 && k < 1) s *= 1 + 0.14 * Math.sin(k * Math.PI); }
  }
  if (it.kind === 'figura') y += (1 - EASE.out(clamp((t - it.t0) / 0.5))) * 24;
  if (am <= 0.001) return null;
  const lum = (it.sobrevive && NUMS.some(u => u.desde === it.id && t >= u.T - 0.2)) ? 1 : dim * kf(it.luz, t, 1) * lerp(0.35, 1, clamp((t - it.t0) / (it.entra ?? 0.35)));
  c.save(); c.globalAlpha = a * am; if (lum < 0.995) c.filter = `brightness(${lum.toFixed(3)})`;
  if (it.kind === 'figura') { c.translate(0, y - kf(it.y, t, 0)); drawFigura(c, it, t, a); c.restore(); const g = it._geo; const S = g.S; return { id: it.id, kind: 'figura', head: [x + g.head[0] * S * g.dir, y + g.head[1] * S], hr: 0.086 * S, body: { x: x - 0.2 * S, y: y + (g.head[1] - 0.09) * S, w: 0.4 * S, h: -(g.head[1] - 0.09) * S } }; }
  c.translate(x, y); if (rot) c.rotate(rot); if (s !== 1) c.scale(s, s);
  const o = {}; for (const k in it) o[k] = it[k]; TIPOS[it.tipo](c, o, t); c.restore();
  const r0 = 0; const r = (it.caja ? it.caja : [-(kf(it.r, t, 60)), -(kf(it.r, t, 60)), 2 * kf(it.r, t, 60), 2 * kf(it.r, t, 60)]);
  return { id: it.id, kind: it.tipo, box: { x: x + r[0] * s, y: y + r[1] * s, w: r[2] * s, h: r[3] * s } };
}

// ---------- fotograma ----------
let lastFrame = null;
function frame(t) {
  const cm = cam(t); const dim = dimAt(t);
  drawFondo();
  // mundo
  lw.setTransform(1, 0, 0, 1, 0, 0); lw.clearRect(0, 0, W, H); lw.setTransform(cm.z, 0, 0, cm.z, W / 2 - cm.x * cm.z, H / 2 - cm.y * cm.z);
  const geo = []; const vis = ITEMS.filter(it => t >= it.t0 && t <= it.t1 && it.capa === 'mundo').sort((a, b) => (a.z || 0) - (b.z || 0));
  // suelo
  const gy = H / 2 - cm.y * cm.z; const fl = clamp(kf(CFG.suelo, t, 1)) * Math.max(0.25, dim);
  if (fl > 0) { const g = ctx.createLinearGradient(W * 0.08, 0, W * 0.92, 0); g.addColorStop(0, 'rgba(60,64,62,0)'); g.addColorStop(0.2, `rgba(60,64,62,${0.9 * fl})`); g.addColorStop(0.8, `rgba(60,64,62,${0.9 * fl})`); g.addColorStop(1, 'rgba(60,64,62,0)'); ctx.fillStyle = g; ctx.fillRect(0, gy - 1, W, 2.5); }
  for (const it of vis) if (it.refl !== false && (it.kind === 'figura' || it.refl)) { const r = drawItem(lw, it, t, cm, dim); if (r) geo.push(r); }
  // reflejo: lo que hay ahora en la capa, invertido bajo el suelo y desvanecido
  lr.setTransform(1, 0, 0, 1, 0, 0); lr.clearRect(0, 0, W, H); lr.save(); lr.translate(0, 2 * gy); lr.scale(1, -1); lr.drawImage(LW, 0, 0); lr.restore();
  lr.globalCompositeOperation = 'destination-in'; const rg = lr.createLinearGradient(0, gy, 0, gy + 380 * cm.z); rg.addColorStop(0, 'rgba(0,0,0,0.2)'); rg.addColorStop(1, 'rgba(0,0,0,0)'); lr.fillStyle = rg; lr.fillRect(0, 0, W, H); lr.globalCompositeOperation = 'source-over';
  ctx.drawImage(LR, 0, 0);
  for (const it of vis) if (!(it.refl !== false && (it.kind === 'figura' || it.refl))) { const r = drawItem(lw, it, t, cm, dim); if (r) geo.push(r); }
  ctx.drawImage(LW, 0, 0);
  // capa de pantalla (no se mueve con la cámara)
  const scr = ITEMS.filter(it => t >= it.t0 && t <= it.t1 && it.capa === 'pantalla').sort((a, b) => (a.z || 0) - (b.z || 0));
  const scrGeo = []; for (const it of scr) { const r = drawItem(ctx, it, t, { x: 0, y: 0, z: 1 }, it.sinDim ? 1 : dim); if (r) scrGeo.push(r); }
  const coins = drawNums(t);
  const prog = drawProgreso(t);
  const cap = drawCaps(t);
  lastFrame = { geo, scrGeo, coins, prog, cap, cm };
}

// ---------- contrato con las herramientas ----------
window.seek = function (t) { frame(t); };
const toScr = (b, cm) => ({ x: W / 2 + (b.x - cm.x) * cm.z, y: H / 2 + (b.y - cm.y) * cm.z, w: b.w * cm.z, h: b.h * cm.z });
window.inspect = function (t) {
  window.seek(t); const f = lastFrame; const cm = f.cm; const props = [], heads = [], bodies = [];
  for (const g of f.geo) { if (g.kind === 'figura') { const hs = toScr({ x: g.head[0] - g.hr, y: g.head[1] - g.hr, w: 2 * g.hr, h: 2 * g.hr }, cm); heads.push(Object.assign({ id: g.id }, hs)); const it = ITEMS.find(i => i.id === g.id); if (!it.fondo) bodies.push({ id: g.id, rect: toScr(g.body, cm) }); } else { const it = ITEMS.find(i => i.id === g.id); if (it.inspeccion === false) continue; props.push({ id: g.id, rect: toScr(g.box, cm), ring: !!(it.rodea || it.libre) }); } }
  for (const g of f.scrGeo) { const it = ITEMS.find(i => i.id === g.id); if (it.inspeccion === false) continue; props.push({ id: g.id, rect: g.box, ring: !!it.rodea }); }
  for (const c of f.coins) props.push({ id: c.id, rect: c.rect, ring: true });
  if (f.prog) props.push({ id: 'progreso', rect: f.prog, ring: true });
  // las figuras que interactúan con un objeto (lo sostienen, lo empujan) lo declaran con `toca: [ids]`
  const touch = new Set(); ITEMS.forEach(it => (it.toca || []).forEach(o => { touch.add(it.id + '|' + o); touch.add(o + '|' + it.id); }));
  const heads2 = heads.filter(h => true);
  return { props: props.map(p => Object.assign({}, p, { ring: p.ring || [...touch].some(k => k.startsWith(p.id + '|')) })), heads: heads2, bodies, caption: f.cap, capMax: 800 };
};
// inspector de píxeles: silueta de cada elemento por separado, a 270x480
const PXW = 270, PXH = 480; const PC = document.createElement('canvas'); PC.width = PXW; PC.height = PXH; const pc = PC.getContext('2d', { willReadFrequently: true });
window.inspectPixels = function (t) {
  const cm = cam(t); const dim = 1; const masks = []; const sc = PXW / W;
  const vis = ITEMS.filter(it => t >= it.t0 && t <= it.t1 && it.inspeccion !== false);
  const kindOf = it => it.kind === 'figura' ? 'actor' : (it.rodea || it.tipo === 'anillo' ? 'ring' : (['bocadillo', 'compra', 'resumen', 'lista'].includes(it.tipo) ? 'billboard' : 'solid'));
  const order = [...vis.filter(i => i.capa === 'mundo').sort((a, b) => (a.z || 0) - (b.z || 0)), ...vis.filter(i => i.capa === 'pantalla').sort((a, b) => (a.z || 0) - (b.z || 0))];
  order.forEach((it, idx) => {
    pc.setTransform(1, 0, 0, 1, 0, 0); pc.clearRect(0, 0, PXW, PXH);
    if (it.capa === 'mundo') pc.setTransform(cm.z * sc, 0, 0, cm.z * sc, (W / 2 - cm.x * cm.z) * sc, (H / 2 - cm.y * cm.z) * sc); else pc.setTransform(sc, 0, 0, sc, 0, 0);
    const a0 = itemAlpha(it, t); if (a0 < 0.5) return; drawItem(pc, Object.assign({}, it, { a: 1, entra: 1e-3, sale: 1e-3, t0: -1e9, t1: 1e9, pop: false }), t, cm, dim);
    const d = pc.getImageData(0, 0, PXW, PXH).data; const m = new Uint8Array(PXW * PXH); let px = 0; const touch = { l: 0, r: 0, t: 0, b: 0 };
    for (let i = 0; i < PXW * PXH; i++) if (d[i * 4 + 3] > 60) { m[i] = 1; px++; const x = i % PXW, y = (i / PXW) | 0; if (x === 0) touch.l++; if (x === PXW - 1) touch.r++; if (y === 0) touch.t++; if (y === PXH - 1) touch.b++; }
    masks.push({ id: (it.kind === 'figura' ? 'actor:' : 'obj:') + it.id, raw: it, kind: kindOf(it), m, px, touch, idx, age: t - it.t0, left: it.t1 - t });
  });
  // titular (subtítulo) como silueta
  window.seek(t); const cap = lastFrame.cap; const items = masks.map(({ m, raw, ...rest }) => rest); const pairs = [];
  const touches = new Set(); ITEMS.forEach(it => (it.toca || []).forEach(o => { touches.add(it.id + '|' + o); touches.add(o + '|' + it.id); }));
  for (let i = 0; i < masks.length; i++) {
    const A = masks[i];
    if (cap) { let c = 0; const x0 = Math.max(0, Math.floor(cap.x * sc)), x1 = Math.min(PXW, Math.ceil((cap.x + cap.w) * sc)), y0 = Math.max(0, Math.floor(cap.y * sc)), y1 = Math.min(PXH, Math.ceil((cap.y + cap.h) * sc)); for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) c += A.m[y * PXW + x]; if (c) pairs.push([A.id, 'titular', c, c, 0]); }
    for (let j = i + 1; j < masks.length; j++) { const B = masks[j]; if (touches.has(A.raw.id + '|' + B.raw.id) || A.raw.rodea || B.raw.rodea || A.raw.libre || B.raw.libre) continue; let c = 0; for (let k = 0; k < A.m.length; k++) c += A.m[k] & B.m[k]; if (c) pairs.push([A.id, B.id, c, 0, c]); }
  }
  const billboards = masks.filter(m => m.kind === 'billboard').length;
  return { items, pairs, billboards, textos: [], objecion: false, whip: false };
};
window.soundEvents = function () {
  const ev = [];
  for (const u of NUMS) { ev.push({ t: u.T, kind: 'whip' }); ev.push({ t: u.T + 0.5, kind: 'pop' }); }
  for (const it of ITEMS) { if (it.sfx === false || it.t0 <= 0.05) continue; if (it.tipo === 'anillo' || it.tipo === 'arcoAbierto') ev.push({ t: it.t0, kind: 'swoosh' }); else if (it.pop || ['moneda', 'bocadillo', 'corazon', 'seguir', 'enviar', 'resumen', 'compra', 'temporizador'].includes(it.tipo)) ev.push({ t: it.t0, kind: 'pop' }); }
  for (const e of EXTRA_SFX) ev.push(e);
  for (const it of ITEMS) {
    if (it.tipo === 'chispas') ev.push({ t: it.t0, kind: 'ding' });
    const key = it.tipo === 'contador' || it.tipo === 'etiqueta' ? 'v' : (it.tipo === 'telefono' ? 'avisos' : (it.tipo === 'bloques' ? 'hechos' : (it.tipo === 'pestanas' ? 'n' : null)));
    if (!key || !Array.isArray(it[key]) || it.sfx === false) continue;
    const L = it[key]; let prev = null, last = -1; const t0 = L[0][0], t1 = L[L.length - 1][0];
    for (let tt = t0; tt <= t1 + 0.05; tt += 1 / 60) { const v = Math.floor(kf(L, tt, 0) + 1e-6); if (prev !== null && v !== prev && tt - last > 0.055) { ev.push({ t: tt, kind: 'tickc', f: clamp((tt - t0) / Math.max(0.3, t1 - t0)) }); last = tt; } prev = v; }
  }
  return ev.filter(e => e.t >= 0 && e.t < DUR).sort((a, b) => a.t - b.t);
};
E.__start = function () {
  window.DURATION = DUR = CFG.duracion || DUR;
  window.ready = (async () => {
    await Promise.all(['400 54px Inter', '500 60px Inter', '600 50px Inter', 'italic 600 60px Inter', '700 40px Inter'].map(f => document.fonts.load(f)));
    buildCaps(); window.seek(0); return true;
  })();
};
