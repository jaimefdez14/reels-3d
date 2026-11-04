// Motor 3D de los reels: escena Three.js determinista (todo se calcula a partir de t) + rotulación 2D encima.
// Contrato con las herramientas: window.ready (promesa), window.DURATION, window.seek(t) y el canvas final #cv (1080x1920).
// Lo define build.py: window.REEL (reel.json), window.SHOTS (shots3d.js ya ejecutado) y window.TIMING (timing.json).
(function(){
'use strict';
const W = 1080, H = 1920;
const PAL = { bg: '#f5f5f5', bgDark: '#34353a', text: '#2a292c', hero: '#fafafa', other: '#4f5057', otherFace: '#2b2b2f', crowd: '#b4b5ba', yellow: '#f5d63f', red: '#de2f45', shadow: '#d9d9dc', outline: '#2a292c', grid: '#e3e3e6', cross: '#c6c6ca' };

// ---------- utilidades de tiempo ----------
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const EASE = {
  linear: p => p,
  inout: p => p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2,
  out: p => 1 - Math.pow(1 - p, 3),
  in: p => p * p * p,
  back: p => { const c = 1.70158; return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); },
};
// progreso 0..1 de t entre t0 y t0+dur con easing
const tw = (t, t0, dur, ease = 'inout') => EASE[ease](clamp((t - t0) / Math.max(dur, 1e-6), 0, 1));
const lerp = (a, b, p) => a + (b - a) * p;
const lerpV = (a, b, p) => a.map((v, i) => lerp(v, b[i], p));
const hexLerp = (a, b, p) => { const A = new THREE.Color(a), B = new THREE.Color(b); return A.lerp(B, p); };

// tiempo de la palabra `w` (índice) de la frase `line`, según TIMING.words[line] = [[t, palabra], ...]
window.wt = function (line, w = 0) { const L = TIMING.words[line]; if (!L) return 0; return L[clamp(w, 0, L.length - 1)][0]; };
window.lineEnd = function (line) { const L = TIMING.words[line]; return L[L.length - 1][1]; };

// ---------- estado de cámara (esférico) ----------
const CAM_PRESETS = {
  wide: { dist: 17, el: 13, az: 0, target: [0, 1.7, -1] },
  medium: { dist: 10.2, el: 8, az: 0, target: [0, 1.45, 0] },
  close: { dist: 8.2, el: 6, az: 0, target: [0, 1.3, 0] },
};
function resolveCam(spec, prev) {
  const base = spec.preset ? CAM_PRESETS[spec.preset] : prev;
  return { dist: spec.dist ?? base.dist, el: spec.el ?? base.el, az: spec.az ?? base.az, target: spec.target ?? base.target, fov: spec.fov ?? (prev.fov ?? 30) };
}
function camState(t) {
  const kfs = SHOTS.cam; let s = { ...CAM_PRESETS.medium, fov: 30 }, prevS = s;
  for (const k of kfs) {
    const target = resolveCam(k, s);
    if (t < k.t) break;
    const p = tw(t, k.t, k.dur ?? (k.whip ? 0.28 : 1.5), k.ease ?? 'inout');
    prevS = s;
    s = { dist: lerp(prevS.dist, target.dist, p), el: lerp(prevS.el, target.el, p), az: lerp(prevS.az, target.az, p), target: lerpV(prevS.target, target.target, p), fov: lerp(prevS.fov, target.fov, p) };
    if (p >= 1) s = target;
  }
  return s;
}

// ---------- geometrías de los personajes ----------
function pillGeometry(h = 1.6, w = 0.42) {
  // cuerpo «pastilla»: más ancho abajo, cúpula arriba (LatheGeometry)
  const pts = []; const bodyH = h * 0.72, rTop = w * 0.38, rBot = w * 0.5;
  for (let i = 0; i <= 10; i++) { const a = (i / 10) * Math.PI / 2; pts.push(new THREE.Vector2(rBot * Math.cos(a) * 0.35 + rBot * (1 - 0.35), 0.02 + (1 - Math.cos(a)) * 0.06 * (i / 10))); }
  pts.length = 0;
  pts.push(new THREE.Vector2(0, 0)); pts.push(new THREE.Vector2(rBot * 0.85, 0)); pts.push(new THREE.Vector2(rBot, 0.08));
  pts.push(new THREE.Vector2(rBot, bodyH * 0.35)); pts.push(new THREE.Vector2(rTop * 1.08, bodyH - rTop));
  for (let i = 1; i <= 8; i++) { const a = (i / 8) * Math.PI / 2; pts.push(new THREE.Vector2(rTop * 1.08 * Math.cos(a), bodyH - rTop + rTop * Math.sin(a))); }
  return new THREE.LatheGeometry(pts, 40);
}
let toonGradient;
function toonMat(color) {
  if (!toonGradient) { const c = document.createElement('canvas'); c.width = 4; c.height = 1; const x = c.getContext('2d'); ['#9a9a9a', '#d4d4d4', '#f4f4f4', '#ffffff'].forEach((col, i) => { x.fillStyle = col; x.fillRect(i, 0, 1, 1); }); toonGradient = new THREE.CanvasTexture(c); toonGradient.minFilter = toonGradient.magFilter = THREE.NearestFilter; toonGradient.colorSpace = THREE.NoColorSpace; }
  return new THREE.MeshToonMaterial({ color, gradientMap: toonGradient });
}
function roundedBox(w, h, d, r) { const sh = new THREE.Shape(); const x = -w / 2, y = -h / 2; sh.moveTo(x + r, y); sh.lineTo(x + w - r, y); sh.quadraticCurveTo(x + w, y, x + w, y + r); sh.lineTo(x + w, y + h - r); sh.quadraticCurveTo(x + w, y + h, x + w - r, y + h); sh.lineTo(x + r, y + h); sh.quadraticCurveTo(x, y + h, x, y + h - r); sh.lineTo(x, y + r); sh.quadraticCurveTo(x, y, x + r, y); const g = new THREE.ExtrudeGeometry(sh, { depth: d - r, bevelEnabled: true, bevelThickness: r / 2, bevelSize: r / 2, bevelSegments: 4 }); g.translate(0, 0, -(d - r) / 2); return g; }
function outlineMesh(geom, scale = 1.035) { const m = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({ color: PAL.outline, side: THREE.BackSide })); m.scale.setScalar(scale); return m; }
function shadowMesh(r = 0.42) { const m = new THREE.Mesh(new THREE.CircleGeometry(r, 40), new THREE.MeshBasicMaterial({ color: PAL.shadow, transparent: true, opacity: 0.9 })); m.rotation.x = -Math.PI / 2; m.position.y = 0.004; m.scale.set(1.25, 0.8, 1); return m; }

function makeActor(spec) {
  const g = new THREE.Group(); const h = spec.h ?? 1.6; const kind = spec.kind;
  const color = kind === 'hero' ? PAL.hero : kind === 'other' ? PAL.other : PAL.crowd;
  const bodyG = pillGeometry(h); const body = new THREE.Mesh(bodyG, toonMat(color)); g.add(body);
  const head = new THREE.Group(); head.position.y = h * 0.72 + 0.1 + h * 0.13; g.add(head);
  if (kind === 'other') {
    const hb = new THREE.Mesh(roundedBox(h * 0.22, h * 0.2, h * 0.17, h * 0.05), toonMat(PAL.otherFace)); head.add(hb);
    if (spec.face !== false) {
      const eyeM = new THREE.MeshBasicMaterial({ color: '#ffffff' });
      [[-0.05, 0.03], [0.05, 0.03]].forEach(([x, y]) => { const e = new THREE.Mesh(new THREE.SphereGeometry(h * 0.012, 10, 10), eyeM); e.position.set(x * h * 0.8, y * h * 0.8, h * 0.09); head.add(e); });
      const smile = new THREE.Mesh(new THREE.TorusGeometry(h * 0.035, h * 0.006, 6, 20, Math.PI), eyeM); smile.position.set(0, -0.02 * h, h * 0.09); smile.scale.setScalar(0.8); smile.rotation.z = Math.PI; head.add(smile);
    }
  } else {
    const hs = new THREE.Mesh(new THREE.SphereGeometry(h * 0.13, 32, 24), toonMat(color)); head.add(hs);
    if (kind === 'hero') {
      head.add(outlineMesh(new THREE.SphereGeometry(h * 0.13, 32, 24), 1.05)); g.add(outlineMesh(bodyG, 1.03));
      const eyeM = new THREE.MeshBasicMaterial({ color: PAL.text });
      const e = new THREE.Mesh(new THREE.SphereGeometry(h * 0.012, 8, 8), eyeM); e.position.set(h * 0.06, 0.02 * h, h * 0.115); head.add(e);
      // brazo: línea con codo sobre el cuerpo
      const path = new THREE.CatmullRomCurve3([new THREE.Vector3(0.02, h * 0.62, 0.2), new THREE.Vector3(-0.11, h * 0.45, 0.2), new THREE.Vector3(0.05, h * 0.33, 0.2)]);
      const arm = new THREE.Mesh(new THREE.TubeGeometry(path, 12, 0.016, 8), new THREE.MeshBasicMaterial({ color: PAL.outline })); g.add(arm);
      const armIn = new THREE.Mesh(new THREE.TubeGeometry(path, 12, 0.008, 8), new THREE.MeshBasicMaterial({ color: PAL.hero })); armIn.position.z = 0.012; g.add(armIn);
    }
  }
  g.add(shadowMesh(h * 0.26)); g.userData = { spec, head, h }; return g;
}

// ---------- escenario ----------
function gridTexture(dark) {
  const c = document.createElement('canvas'); c.width = c.height = 512; const x = c.getContext('2d');
  x.fillStyle = dark ? PAL.bgDark : PAL.bg; x.fillRect(0, 0, 512, 512);
  x.strokeStyle = dark ? '#45464c' : PAL.grid; x.lineWidth = 2;
  for (let i = 0; i <= 512; i += 128) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, 512); x.moveTo(0, i); x.lineTo(512, i); x.stroke(); }
  x.strokeStyle = dark ? '#6a6b72' : PAL.cross; x.lineWidth = 4;
  for (let i = 0; i <= 512; i += 256) for (let j = 0; j <= 512; j += 256) { x.beginPath(); x.moveTo(i - 10, j); x.lineTo(i + 10, j); x.moveTo(i, j - 10); x.lineTo(i, j + 10); x.stroke(); }
  const tx = new THREE.CanvasTexture(c); tx.wrapS = tx.wrapT = THREE.RepeatWrapping; tx.repeat.set(40, 40); tx.anisotropy = 4; return tx;
}

// ---------- texturas de texto para bocadillos y tarjetas ----------
function roundRect(x, X, y, w, h, r) { x.beginPath(); x.moveTo(X + r, y); x.arcTo(X + w, y, X + w, y + h, r); x.arcTo(X + w, y + h, X, y + h, r); x.arcTo(X, y + h, X, y, r); x.arcTo(X, y, X + w, y, r); x.closePath(); }
function wrapText(x, text, maxW) { const lines = []; for (const para of text.split('\n')) { const words = para.split(' '); let cur = ''; for (const w of words) { const test = cur ? cur + ' ' + w : w; if (x.measureText(test).width > maxW && cur) { lines.push(cur); cur = w; } else cur = test; } if (cur) lines.push(cur); } return lines; }
function bubbleTexture(o) {
  // o: {text, w (px), serif, accent, tail:'left'|'right'|'none', thought}
  const pad = 44, fs = o.serif ? 64 : 46; const c = document.createElement('canvas'); const x = c.getContext('2d');
  x.font = o.serif ? `900 ${fs}px NotoCond` : `500 ${fs}px Montserrat`;
  const lines = wrapText(x, o.serif ? o.text.toUpperCase() : o.text, o.w - pad * 2);
  const lh = fs * (o.serif ? 1.15 : 1.35); const bh = pad * 2 + lines.length * lh; const tail = o.tail === 'none' ? (o.thought ? 60 : 0) : 60;
  c.width = o.w + 24; c.height = bh + tail + 24; x.font = o.serif ? `900 ${fs}px NotoCond` : `500 ${fs}px Montserrat`;
  x.shadowColor = 'rgba(0,0,0,0.18)'; x.shadowBlur = 18; x.shadowOffsetY = 8; x.fillStyle = '#ffffff';
  if (o.thought) { x.setLineDash([10, 8]); x.strokeStyle = PAL.text; x.lineWidth = 3; roundRect(x, 12, 12, o.w, bh, 40); x.fill(); x.shadowColor = 'transparent'; x.stroke(); x.setLineDash([]); [[70, bh + 24, 14], [48, bh + 52, 8]].forEach(([cx, cy, r]) => { x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fillStyle = '#ffffff'; x.fill(); x.stroke(); }); }
  else { roundRect(x, 12, 12, o.w, bh, 22); x.fill(); x.shadowColor = 'transparent'; }
  if (o.tail === 'left' || o.tail === 'right') { const tx = o.tail === 'left' ? 90 : o.w - 90; x.beginPath(); x.moveTo(tx - 28, bh + 10); x.lineTo(tx + 22, bh + 10); x.lineTo(tx - 10, bh + 12 + tail - 8); x.closePath(); x.fillStyle = '#ffffff'; x.fill(); }
  if (o.accent) { x.fillStyle = PAL.yellow; roundRect(x, 12, 12, 14, bh, 7); x.fill(); x.fillRect(19, 12, 7, bh); }
  x.fillStyle = PAL.text; x.textBaseline = 'top';
  let left = o.nWords == null ? 1e9 : o.nWords; // texto parcial: solo las primeras nWords palabras
  lines.forEach((l, i) => { if (o.nLines != null && i >= o.nLines) return; const ws = l.split(' '); const shown = ws.slice(0, Math.max(0, left)).join(' '); left -= ws.length; if (shown) x.fillText(shown, 12 + pad + (o.accent ? 10 : 0), 12 + pad + i * lh + (o.serif ? 0 : 4)); });
  if (o.strikeW) { x.strokeStyle = PAL.red; x.lineWidth = 6; x.lineCap = 'round'; const y = 12 + pad + lh * 0.5; x.beginPath(); x.moveTo(12 + pad - 6, y + 4); x.lineTo(12 + pad + Math.min(o.strikeW, 1) * x.measureText(lines[0]).width + 6, y - 4); x.stroke(); }
  const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace; tx.anisotropy = 8; return { tx, w: c.width, h: c.height };
}
function cardTexture(o = {}) {
  const c = document.createElement('canvas'); c.width = 220; c.height = 300; const x = c.getContext('2d');
  x.fillStyle = o.yellow ? PAL.yellow : '#ffffff'; roundRect(x, 8, 8, 204, 284, 18); x.fill(); x.strokeStyle = o.yellow ? PAL.text : '#b9b9bd'; x.lineWidth = 3; x.stroke();
  x.fillStyle = o.yellow ? PAL.text : '#c7c7cb'; x.beginPath(); x.arc(110, 120, 42, 0, Math.PI * 2); x.fill(); x.beginPath(); x.ellipse(110, 215, 72, 44, 0, Math.PI, 0); x.fill();
  if (o.label) { x.fillStyle = PAL.text; x.font = '600 26px Montserrat'; x.textAlign = 'center'; x.fillText(o.label, 110, 268); }
  const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace; return tx;
}

// ---------- objetos (props) ----------
// Cada objeto tiene {type, t0, t1, ...}. Los «billboard» (bocadillo, nube, tarjeta, cruz, barras) pueden anclarse a un
// personaje con over: 'id' (sobre su cabeza) y el motor los coloca en pantalla sin pisar el titular, los bordes ni otros objetos.
function billboard(texInfo, worldH) { const ratio = texInfo.w / texInfo.h; const m = new THREE.Mesh(new THREE.PlaneGeometry(worldH * ratio, worldH), new THREE.MeshBasicMaterial({ map: texInfo.tx, transparent: true, depthWrite: false })); m.userData.billboard = true; m.userData.size = [worldH * ratio, worldH]; return m; }
function bubbleOpts(p, extra = {}) { return { text: p.text, w: p.w ?? 640, serif: p.serif, accent: p.accent, tail: p.tail ?? 'left', ...extra }; }
const PROPS = {
  bubble(p) { const m = billboard(bubbleTexture(bubbleOpts(p, { strikeW: p.strike != null ? 0 : undefined, nWords: p.reveal != null ? 0 : undefined, nLines: p.rowsAt ? 0 : undefined })), p.h ?? (p.serif ? 1.3 : 0.55)); m.userData.src = p; m.userData.retex = true; return m; },
  thought(p) { const m = billboard(bubbleTexture({ text: p.text, w: p.w ?? 520, thought: true, tail: 'none' }), p.h ?? 0.6); return m; },
  card(p) { const m = new THREE.Mesh(new THREE.PlaneGeometry(0.44, 0.6), new THREE.MeshBasicMaterial({ map: cardTexture(p), transparent: true, side: THREE.DoubleSide })); m.userData.billboard = !p.standing; m.userData.size = [0.44, 0.6]; return m; },
  cards(p) { // campo de tarjetas en el suelo
    const g = new THREE.Group(); const n = p.n ?? 40, cols = p.cols ?? 8; const tx = cardTexture({});
    for (let i = 0; i < n; i++) { const m = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.68), new THREE.MeshBasicMaterial({ map: tx, transparent: true })); m.rotation.x = -Math.PI / 2; m.position.set((i % cols - (cols - 1) / 2) * 0.72, 0.01, Math.floor(i / cols) * 0.95 - 1); g.add(m); }
    return g;
  },
  ring(p) { const m = new THREE.Mesh(new THREE.TorusGeometry(p.r ?? 0.55, p.tube ?? 0.07, 12, 60, Math.PI * 2), new THREE.MeshBasicMaterial({ color: PAL.yellow })); m.userData.ring = p; return m; },
  cross(p) { const g = new THREE.Group(); const mat = new THREE.MeshBasicMaterial({ color: PAL.red }); [45, -45].forEach(a => { const b = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.07, 0.02), mat); b.rotation.z = a * Math.PI / 180; g.add(b); }); g.userData.billboard = true; g.userData.size = [0.5, 0.5]; return g; },
  arrow(p) { const g = new THREE.Group(); g.userData = { noPos: true, path: { kind: 'arrow', from: p.from, to: p.to, lift: p.lift ?? 0.6, red: p.red } }; return g; },
  line(p) { const g = new THREE.Group(); g.userData = { noPos: true, path: { kind: 'line', from: p.from, to: p.to, lift: p.lift ?? 0.3, red: p.red } }; return g; },
  bars(p) { const g = new THREE.Group(); const n = p.n ?? 5; for (let i = 0; i < n; i++) { const b = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.42, 0.06), new THREE.MeshBasicMaterial({ color: '#d2d2d6' })); b.position.x = (i - (n - 1) / 2) * 0.2; const f = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.42, 0.065), new THREE.MeshBasicMaterial({ color: PAL.yellow })); f.position.x = b.position.x; f.visible = false; g.add(b, f); } g.userData = { billboard: true, bars: p, size: [n * 0.2, 0.42] }; return g; },
  sticker(p) { // icono «pegatina 3D»: ?, !, ★, cal (calendario), mail, clock, link, euro, chart, check, x
    const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d'); x.fillStyle = p.yellow ? PAL.yellow : '#ffffff'; roundRect(x, 16, 16, 224, 224, 44); x.fill(); x.strokeStyle = PAL.text; x.lineWidth = 6; x.stroke();
    x.fillStyle = PAL.text; x.strokeStyle = PAL.text; x.lineWidth = 12; x.lineCap = 'round'; x.textAlign = 'center'; x.textBaseline = 'middle';
    const ic = p.icon || '?';
    if (ic === 'cal') { x.fillRect(48, 70, 160, 130); x.fillStyle = p.yellow ? PAL.yellow : '#ffffff'; for (let r = 0; r < 3; r++) for (let q = 0; q < 4; q++) x.fillRect(62 + q * 38, 110 + r * 30, 24, 18); }
    else if (ic === 'mail') { x.strokeRect(44, 76, 168, 112); x.beginPath(); x.moveTo(44, 76); x.lineTo(128, 146); x.lineTo(212, 76); x.stroke(); }
    else if (ic === 'clock') { x.beginPath(); x.arc(128, 128, 80, 0, 7); x.stroke(); x.beginPath(); x.moveTo(128, 128); x.lineTo(128, 70); x.moveTo(128, 128); x.lineTo(170, 128); x.stroke(); }
    else if (ic === 'link') { x.beginPath(); x.arc(100, 128, 44, 0, 7); x.stroke(); x.beginPath(); x.arc(156, 128, 44, 0, 7); x.stroke(); }
    else if (ic === 'chart') { [60, 110, 150].forEach((h, i) => x.fillRect(56 + i * 52, 200 - h, 36, h)); }
    else if (ic === 'check') { x.beginPath(); x.moveTo(64, 134); x.lineTo(112, 180); x.lineTo(196, 80); x.stroke(); }
    else if (ic === 'x') { x.strokeStyle = PAL.red; x.beginPath(); x.moveTo(72, 72); x.lineTo(184, 184); x.moveTo(184, 72); x.lineTo(72, 184); x.stroke(); }
    else { x.font = '900 150px NotoCond'; x.fillText(ic, 128, 136); }
    const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace; const m = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.5), new THREE.MeshBasicMaterial({ map: tx, transparent: true })); m.userData.billboard = true; m.userData.size = [0.5, 0.5]; return m; },
  tag(p) { // etiqueta con borde (A FEW / MI PRIMERO), roja o amarilla
    const c = document.createElement('canvas'); const x = c.getContext('2d'); x.font = '900 72px NotoCond'; const w = x.measureText(p.text.toUpperCase()).width + 90; c.width = w; c.height = 120; x.font = '900 72px NotoCond';
    x.fillStyle = '#ffffff'; roundRect(x, 6, 6, w - 12, 108, 12); x.fill(); x.strokeStyle = p.red ? PAL.red : (p.yellow ? PAL.yellow : PAL.text); x.lineWidth = 6; x.stroke(); x.fillStyle = PAL.text; x.textBaseline = 'middle'; x.fillText(p.text.toUpperCase(), 45, 62);
    const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace; const m = new THREE.Mesh(new THREE.PlaneGeometry(0.4 * w / 120, 0.4), new THREE.MeshBasicMaterial({ map: tx, transparent: true })); m.userData.billboard = true; m.userData.size = [0.4 * w / 120, 0.4]; return m; },
  bracket(p) { // esquinas de encuadre (rojas) alrededor de un personaje
    const g = new THREE.Group(); const mat = new THREE.MeshBasicMaterial({ color: p.red ? PAL.red : PAL.text }); const s = p.s ?? 1.0, L = 0.25, w = 0.05;
    [[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(([sx, sy]) => { const h = new THREE.Mesh(new THREE.BoxGeometry(L, w, 0.02), mat); h.position.set(sx * (s / 2 - L / 2), sy * s * 0.75, 0); const v = new THREE.Mesh(new THREE.BoxGeometry(w, L, 0.02), mat); v.position.set(sx * s / 2, sy * (s * 0.75 - L / 2), 0); g.add(h, v); });
    g.userData = { billboard: true, size: [s, s * 1.5], bracketOf: p.over }; return g; },
  dots(p) { // camino punteado en el suelo (rojo = el camino equivocado)
    const a = new THREE.Vector3(...p.from), b = new THREE.Vector3(...p.to); const mid = a.clone().lerp(b, 0.5); mid.x += p.bend ?? 0.8; const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
    const g = new THREE.Group(); const mat = new THREE.MeshBasicMaterial({ color: p.red ? PAL.red : PAL.yellow }); curve.getPoints(p.n ?? 24).forEach(pt => { const d = new THREE.Mesh(new THREE.CircleGeometry(0.035, 10), mat); d.rotation.x = -Math.PI / 2; d.position.copy(pt); d.position.y = 0.015; g.add(d); }); g.userData.noPos = true; return g; },
  number(p) { // cifra grande extruida de contorno (3D), p. ej. «0», «5», «3 MESES»
    const font = new Font(FONT_JSON); const geo = new TextGeometry(p.text, { font, size: p.size ?? 1.2, depth: p.depth ?? 0.25, curveSegments: 8, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2 }); geo.center(); geo.translate(0, (p.size ?? 1.2) / 2, 0);
    const g = new THREE.Group(); g.add(new THREE.Mesh(geo, toonMat(p.yellow ? PAL.yellow : '#ffffff'))); g.add(outlineMesh(geo, 1.02)); return g; },
  letters(p) { // letras gigantes (FORD): cada letra un sólido; la actual (p.lit) en amarillo; lo gestiona seek con p.litAt
    const font = new Font(FONT_JSON); const g = new THREE.Group(); const size = p.size ?? 1.4; let xoff = 0;
    [...p.text].forEach((ch, i) => { const geo = new TextGeometry(ch, { font, size, depth: 0.3, curveSegments: 8, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2 }); geo.computeBoundingBox(); const w = geo.boundingBox.max.x - geo.boundingBox.min.x; const m = new THREE.Mesh(geo, toonMat('#ffffff')); m.position.x = xoff; m.userData.letter = i; g.add(m); const o = outlineMesh(geo, 1.015); o.position.x = xoff; g.add(o); xoff += w + size * 0.18; });
    g.position.x -= xoff / 2; g.userData.letters = p; return g; },
  stage(p) { const g = new THREE.Group(); const mat = toonMat('#ffffff'); const base = new THREE.Mesh(new THREE.BoxGeometry(5, 0.35, 2.4), mat); base.position.y = 0.175; g.add(base, outlineMesh(new THREE.BoxGeometry(5, 0.35, 2.4), 1.01).translateY(0.175)); const lec = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.1, 0.4), toonMat(PAL.other)); lec.position.set(0, 0.35 + 0.55, 0.6); g.add(lec); return g; },
  desk(p) { const g = new THREE.Group(); const mat = toonMat('#ffffff'); const top = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.08, 1.0), mat); top.position.y = 0.95; g.add(top, outlineMesh(new THREE.BoxGeometry(2.2, 0.08, 1.0), 1.01).translateY(0.95)); [[-1, -0.4], [1, -0.4], [-1, 0.4], [1, 0.4]].forEach(([x, z]) => { const l = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.95, 0.07), toonMat(PAL.other)); l.position.set(x, 0.47, z); g.add(l); });
    const mon = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.7, 0.06), toonMat(PAL.other)); mon.position.set(0, 1.45, -0.2); g.add(mon); const c = document.createElement('canvas'); c.width = 440; c.height = 280; const x = c.getContext('2d'); x.fillStyle = '#ffffff'; x.fillRect(0, 0, 440, 280); x.fillStyle = PAL.yellow; [90, 150, 210].forEach((h, i) => x.fillRect(60 + i * 120, 250 - h, 80, h)); x.fillStyle = PAL.text; x.font = '600 28px Montserrat'; x.fillText(p.text || '', 30, 50);
    const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace; const scr = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.62), new THREE.MeshBasicMaterial({ map: tx })); scr.position.set(0, 1.45, -0.165); g.add(scr); const stand = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.15, 0.1), toonMat(PAL.other)); stand.position.set(0, 1.05, -0.2); g.add(stand); return g; },
  timer(p) { // temporizador: anillo gris con arco amarillo que se rellena (p.fillFrom, p.dur) y la cifra en medio
    const g = new THREE.Group(); const r = p.r ?? 0.6; g.add(new THREE.Mesh(new THREE.TorusGeometry(r, 0.06, 10, 60), new THREE.MeshBasicMaterial({ color: '#d2d2d6' }))); const arc = new THREE.Mesh(new THREE.TorusGeometry(r, 0.075, 10, 60, 0.01), new THREE.MeshBasicMaterial({ color: PAL.yellow })); arc.rotation.z = Math.PI / 2; g.add(arc);
    const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d'); x.fillStyle = PAL.text; x.font = '900 150px NotoCond'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(p.text ?? '5', 128, 136); const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace; const num = new THREE.Mesh(new THREE.PlaneGeometry(r * 1.1, r * 1.1), new THREE.MeshBasicMaterial({ map: tx, transparent: true })); g.add(num);
    g.userData = { billboard: true, size: [2 * r + 0.15, 2 * r + 0.15], timer: { arc, r, p } }; return g; },
  coins(p) { // pila de monedas que crece (p.n, p.each segundos por moneda desde t0)
    const g = new THREE.Group(); const n = p.n ?? 8; for (let i = 0; i < n; i++) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.09, 32), toonMat(PAL.yellow)); c.position.y = 0.045 + i * 0.1; c.visible = false; g.add(c); g.add(outlineMesh(new THREE.CylinderGeometry(0.32, 0.32, 0.09, 32), 1.03).translateY(c.position.y)); } g.userData.coins = p; return g; },
  doors(p) { // fila de puertas con un personaje gris en cada una (el pasillo de la referencia R4)
    const g = new THREE.Group(); const n = p.n ?? 6; for (let i = 0; i < n; i++) { const d = PROPS.door({}); d.position.x = (i - (n - 1) / 2) * 3.4; g.add(d); const a = makeActor({ kind: 'crowd', h: 1.5 }); a.position.set(d.position.x + 0.35, 0, 0.5); a.rotation.y = Math.PI; g.add(a); } return g; },
  door(p) { const g = new THREE.Group(); const mat = toonMat('#ffffff'); const dark = toonMat(PAL.other); const fr = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2.1, 0.12), dark); fr.position.y = 1.05; const hole = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.95, 0.14), mat); hole.position.y = 0.975; const wall = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.4, 0.08), mat); wall.position.set(0, 1.2, -0.03); g.add(wall, fr, hole); g.add(outlineMesh(new THREE.BoxGeometry(3.2, 2.4, 0.08), 1.01).translateY(1.2).translateZ(-0.03)); return g; },
  table(p) { const g = new THREE.Group(); const mat = toonMat('#ffffff'); const top = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.05, 32), mat); top.position.y = 1.05; const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.05, 12), mat); leg.position.y = 0.52; const base = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.04, 32), mat); base.position.y = 0.02; g.add(top, leg, base, outlineMesh(new THREE.CylinderGeometry(0.42, 0.42, 0.05, 32), 1.02).translateY(1.05)); return g; },
};

// ---------- rotulación 2D ----------
// Devuelve el rectángulo que ocupa el titular (para que los objetos no lo pisen y para el inspector).
const CAPTION_TOP = 160;
function captionLayout(x, L, fs0, maxW, marginX) { // reduce el cuerpo hasta que el titular quepa en 2 líneas
  for (const fs of [fs0, 104, 92, 82]) { x.font = `900 ${fs}px NotoCond`; const tokens = L.show.split(' '); const layout = []; let cx = 0, row = 0; for (let i = 0; i < tokens.length; i++) { const w = x.measureText(tokens[i].toUpperCase()).width; if (cx + w > maxW && cx > 0) { row++; cx = 0; } layout.push({ w, row, xoff: cx }); cx += w + fs * 0.26; }
    if (row + 1 <= 2 || fs === 82) return { tokens, layout, rows: row + 1, fs, lh: Math.round(fs * 1.24) }; } }
function activeLine(t) { const lines = REEL.lines; for (let li = 0; li < lines.length; li++) { const L = lines[li], words = TIMING.words[li]; if (!words || L.hide) continue; const t0 = words[0][0], tEnd = words[words.length - 1][1]; const next = TIMING.words[li + 1]; const hold = next ? Math.min(next[0][0] - 0.05, tEnd + 2.2) : tEnd + 2.5; if (t >= t0 - 0.02 && t <= hold) return { li, L, words, t0, hold }; } return null; }
function captionRect(x, t) { const a = activeLine(t); if (!a) return null; const marginX = 60; x.save(); const { rows, layout, fs, lh } = captionLayout(x, a.L, 118, W - 2 * marginX - 40, marginX); x.restore(); const top = a.L.voice ? 215 : CAPTION_TOP; const wmax = Math.max(...layout.map(l => l.xoff + l.w)); return { x: marginX - 10, y: (a.L.voice ? 70 : top - fs), w: wmax + 20, h: (top + (rows - 1) * lh + 30) - (a.L.voice ? 70 : top - fs) }; }
function drawCaptions(x, t, inv) {
  const a = activeLine(t); if (!a) return; const { L, words, hold } = a; const marginX = 60;
  x.save(); x.textBaseline = 'alphabetic';
  const top = L.voice ? 215 : CAPTION_TOP; const outP = clamp((t - (hold - 0.25)) / 0.25, 0, 1);
  const { tokens, layout, fs, lh } = captionLayout(x, L, 118, W - 2 * marginX - 40, marginX); x.font = `900 ${fs}px NotoCond`;
  if (L.voice) { x.save(); x.font = '400 30px Montserrat'; x.fillStyle = inv ? '#c9c9cf' : '#6b6b70'; x.globalAlpha = 1 - outP; x.fillText(L.voice, marginX, 96); x.restore(); x.font = `900 ${fs}px NotoCond`; }
  const hiW = (L.hi || '').toLowerCase(), negW = (L.neg || '').toLowerCase();
  for (let i = 0; i < tokens.length; i++) {
    const wtime = words[Math.min(i, words.length - 1)][0]; if (t < wtime) break;
    const pop = tw(t, wtime, 0.14, 'back'); const lay = layout[i]; const X = marginX + lay.xoff, Y = top + lay.row * lh;
    const clean = tokens[i].toLowerCase().replace(/[^a-záéíóúüñ0-9]/g, '');
    const isHi = hiW && hiW.split(' ').includes(clean), isNeg = negW && negW.split(' ').includes(clean);
    x.save(); x.globalAlpha = Math.min(1, pop * 1.4) * (1 - outP); x.translate(X + lay.w / 2, Y - outP * 60); x.scale(1 * (0.85 + 0.15 * pop), 1.18 * (0.85 + 0.15 * pop)); x.translate(-(X + lay.w / 2), -Y);
    if (isHi) { const mp = tw(t, wtime + 0.22, 0.28, 'out'); x.fillStyle = PAL.yellow; x.fillRect(X - 10, Y - fs * 0.82, (lay.w + 20) * mp, fs * 0.98); }
    x.fillStyle = isNeg ? PAL.red : (inv ? '#ffffff' : PAL.text); x.fillText(tokens[i].toUpperCase(), X, Y);
    if (isNeg) { const mp = tw(t, wtime + 0.22, 0.28, 'out'); x.fillRect(X, Y + 14, lay.w * mp, 7); }
    x.restore();
  }
  x.restore();
}

// ---------- montaje ----------
let renderer, scene, camera, glCanvas, cv, ctx, actors = {}, props = [], floorLight, floorDark, ambient, sun, lastFrame = null;
function init() {
  glCanvas = document.createElement('canvas'); glCanvas.width = W; glCanvas.height = H;
  renderer = new THREE.WebGLRenderer({ canvas: glCanvas, antialias: true, preserveDrawingBuffer: true, alpha: false }); renderer.setSize(W, H, false); renderer.setPixelRatio(1); renderer.outputColorSpace = THREE.SRGBColorSpace;
  scene = new THREE.Scene(); scene.background = new THREE.Color(PAL.bg);
  camera = new THREE.PerspectiveCamera(30, W / H, 0.1, 200);
  ambient = new THREE.HemisphereLight('#ffffff', '#e2e2e6', 1.5); scene.add(ambient);
  sun = new THREE.DirectionalLight('#ffffff', 1.5); sun.position.set(-3, 8, 6); scene.add(sun);
  floorLight = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), new THREE.MeshBasicMaterial({ map: gridTexture(false) })); floorLight.rotation.x = -Math.PI / 2; scene.add(floorLight);
  floorDark = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), new THREE.MeshBasicMaterial({ map: gridTexture(true), transparent: true, opacity: 0 })); floorDark.rotation.x = -Math.PI / 2; floorDark.position.y = 0.001; scene.add(floorDark);
  const mains = Object.values(SHOTS.actors).filter(a => a.kind !== 'crowd').map(a => a.at ?? [0, 0]);
  for (const [id, spec] of Object.entries(SHOTS.actors)) {
    if (spec.kind === 'crowd') { const g = new THREE.Group(); const n = spec.n ?? 30, area = spec.area ?? [6, 4]; let seed = 7; const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
      let placed = 0, tries = 0;
      while (placed < n && tries < n * 20) { tries++; const px = (rnd() - 0.5) * area[0] + (spec.at?.[0] ?? 0), pz = (rnd() - 0.5) * area[1] + (spec.at?.[1] ?? -3);
        if (mains.some(m => Math.hypot(m[0] - px, m[1] - pz) < (spec.gap ?? 1.6))) continue; // nunca encima de los protagonistas
        const a = makeActor({ kind: 'crowd', h: 1.4 + rnd() * 0.25 }); a.position.set(px, 0, pz); a.rotation.y = rnd() * 6.28; g.add(a); placed++; }
      g.userData = { spec }; actors[id] = g; scene.add(g); }
    else { const a = makeActor(spec); a.position.set(spec.at?.[0] ?? 0, 0, spec.at?.[1] ?? 0); a.rotation.y = (spec.rot ?? 0) * Math.PI / 180; actors[id] = a; scene.add(a); }
  }
  for (const p of SHOTS.props) { const m = PROPS[p.type](p); if (!m.userData.noPos && p.at) m.position.set(...p.at); if (p.rot) m.rotation.y = p.rot * Math.PI / 180; m.visible = false; m.userData.spec = p; props.push(m); scene.add(m); }
  cv = document.getElementById('cv'); cv.width = W; cv.height = H; ctx = cv.getContext('2d');
}

function actorState(id, t) { // keyframes por actor: SHOTS.moves[id] = [{t, dur, at, rot, head:[yaw,tilt], show}]
  const kfs = (SHOTS.moves || {})[id] || []; const spec = SHOTS.actors[id]; let s = { at: spec.at ?? [0, 0], rot: spec.rot ?? 0, head: [0, 0], show: spec.show !== false };
  for (const k of kfs) { if (t < k.t) break; const p = tw(t, k.t, k.dur ?? 1, k.ease ?? 'inout'); const prev = s; const target = { at: k.at ?? prev.at, rot: k.rot ?? prev.rot, head: k.head ?? prev.head, show: k.show ?? prev.show }; s = { at: lerpV(prev.at, target.at, p), rot: lerp(prev.rot, target.rot, p), head: lerpV(prev.head, target.head, p), show: target.show }; }
  return s;
}
function invertAmount(t) { let v = 0; for (const iv of (SHOTS.invert || [])) { v = Math.max(v, tw(t, iv.t, 0.06, 'linear') - tw(t, iv.end, 0.06, 'linear')); } return clamp(v, 0, 1); }

// --- geometría de pantalla ---
const _v = new THREE.Vector3();
function toScreen(v3) { _v.copy(v3).project(camera); return [(_v.x + 1) / 2 * W, (1 - _v.y) / 2 * H, _v.z]; }
function headWorld(id) { const a = actors[id]; const v = new THREE.Vector3(); a.userData.head.getWorldPosition(v); return v; }
function headRadiusPx(id) { const a = actors[id]; const r = a.userData.h * 0.14; const c = headWorld(id); const [sx, sy] = toScreen(c); const up = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion).multiplyScalar(r); const [sx2, sy2] = toScreen(c.clone().add(up)); return Math.hypot(sx2 - sx, sy2 - sy); }
function worldPerPixel(pos) { const d = camera.position.distanceTo(pos); return 2 * d * Math.tan(camera.fov * Math.PI / 360) / H; }
// punto 3D al que se refiere un extremo: [x,y,z], 'id' (cabeza del personaje) o '#prop' (centro de un objeto)
function resolvePoint(ref, side = 0) { if (Array.isArray(ref)) return new THREE.Vector3(...ref); if (typeof ref === 'string' && ref[0] === '#') { const m = props.find(q => q.userData.spec.id === ref.slice(1)); return m ? m.position.clone() : new THREE.Vector3(); } const v = headWorld(ref); const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion); return v.add(right.multiplyScalar(side * 0.16)); }
function rectsOverlap(a, b, pad = 0) { return !(a.x + a.w + pad < b.x || b.x + b.w + pad < a.x || a.y + a.h + pad < b.y || b.y + b.h + pad < a.y); }

function placeBillboards(t, capRect) {
  // coloca cada billboard visible: sobre la cabeza de su personaje (over), dentro de la pantalla, fuera del titular y sin pisar otro objeto
  const up = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion), right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
  const placed = []; const heads = Object.keys(actors).filter(id => actors[id].userData.head && actors[id].visible).map(id => { const [sx, sy] = toScreen(headWorld(id)); const r = headRadiusPx(id) * 1.15; return { id, x: sx - r, y: sy - r, w: 2 * r, h: 2 * r }; });
  const bodies = Object.keys(actors).filter(id => actors[id].userData.head && actors[id].visible).map(id => { const a = actors[id]; const pts = [[-0.3, 0, 0.3], [0.3, 0, 0.3], [-0.3, 0, -0.3], [0.3, 0, -0.3], [0, a.userData.h * 1.02, 0]].map(([x, y, z]) => toScreen(new THREE.Vector3(x, y, z).add(a.position))); const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]); const hr = headRadiusPx(id); return { id, x: Math.min(...xs) - hr * 0.2, y: Math.min(...ys) - hr * 0.3, w: Math.max(...xs) - Math.min(...xs) + hr * 0.4, h: Math.max(...ys) - Math.min(...ys) + hr * 0.3 }; });
  const zoneTop = (capRect ? capRect.y + capRect.h : CAPTION_TOP - 60) + 24, margin = 40;
  for (const m of props) {
    if (!m.visible || !m.userData.billboard || m.userData.bracketOf) continue; const p = m.userData.spec;
    let pos; if (p.over) { const h = headWorld(p.over); const [sx, sy] = toScreen(h); const wpp = worldPerPixel(h); const rpx = headRadiusPx(p.over); pos = h.clone().add(up.clone().multiplyScalar((rpx + 50) * wpp + m.userData.size[1] * (p.scale ?? 1) / 2)).add(right.clone().multiplyScalar((p.dx ?? 0))); }
    else pos = new THREE.Vector3(...(p.at ?? [0, 1.8, 0]));
    m.position.copy(pos); m.quaternion.copy(camera.quaternion);
    { const wpp0 = worldPerPixel(m.position); const k = ((p.px ?? m.userData.size[1] * 480) * wpp0 / m.userData.size[1]); m.scale.multiplyScalar(k); }
    const rect = () => { const wpp = worldPerPixel(m.position); const [cx, cy] = toScreen(m.position); const w = m.userData.size[0] * m.scale.x / wpp, h = m.userData.size[1] * m.scale.y / wpp; return { x: cx - w / 2, y: cy - h / 2, w, h }; };
    const shift = (dx, dy) => { const wpp = worldPerPixel(m.position); m.position.add(right.clone().multiplyScalar(dx * wpp)).add(up.clone().multiplyScalar(-dy * wpp)); };
    let r = rect();
    // 1) que quepa en pantalla: si es más ancho que el área útil, se reduce
    if (r.w > W - 2 * margin) { m.scale.multiplyScalar((W - 2 * margin) / r.w); r = rect(); }
    const clampX = () => { r = rect(); if (r.x < margin) shift(margin - r.x, 0); r = rect(); if (r.x + r.w > W - margin) shift(W - margin - (r.x + r.w), 0); r = rect(); };
    clampX(); if (r.y < zoneTop) shift(0, zoneTop - r.y); clampX();
    // 2) otros objetos ya colocados: a la derecha, a la izquierda, encima o debajo, lo primero que quepa
    const fitsX = (x) => x >= margin && x + r.w <= W - margin;
    for (const o of placed) { if (!rectsOverlap(r, o.rect, 12)) continue;
      const xr = o.rect.x + o.rect.w + 16, xl = o.rect.x - 16 - r.w, yu = o.rect.y - 16 - r.h;
      if (fitsX(xr)) shift(xr - r.x, 0); else if (fitsX(xl)) shift(xl - r.x, 0); else if (yu >= zoneTop) shift(0, yu - r.y); else shift(0, o.rect.y + o.rect.h + 16 - r.y); r = rect(); }
    // 3) cabezas (también la propia): primero a un lado, luego más pequeño y encima
    for (const hd of heads) { if (!rectsOverlap(r, hd, 6)) continue;
      const xr = hd.x + hd.w + 20, xl = hd.x - 20 - r.w;
      const prefRight = (p.dx ?? 0) >= 0;
      const tryR = () => fitsX(xr) && !placed.some(o => rectsOverlap({ ...r, x: xr }, o.rect, 12)) && !heads.some(h2 => rectsOverlap({ ...r, x: xr }, h2, 6));
      const tryL = () => fitsX(xl) && !placed.some(o => rectsOverlap({ ...r, x: xl }, o.rect, 12)) && !heads.some(h2 => rectsOverlap({ ...r, x: xl }, h2, 6));
      if (prefRight && tryR()) shift(xr - r.x, 0); else if (tryL()) shift(xl - r.x, 0); else if (tryR()) shift(xr - r.x, 0);
      else { const k = clamp((hd.y - 10 - zoneTop) / r.h, 0.55, 1); m.scale.multiplyScalar(k); r = rect(); shift(0, hd.y - 10 - (r.y + r.h)); r = rect(); if (r.y < zoneTop) shift(0, zoneTop - r.y); }
      r = rect(); }
    clampX();
    placed.push({ m, rect: r, id: p.id });
  }
  for (const m of props) { const p = m.userData.spec; if (!m.visible || !m.userData.ring) continue; const R = (p.r ?? 0.55) + (p.tube ?? 0.07); const wpp = worldPerPixel(m.position); const [cx, cy] = toScreen(m.position); const d = 2 * R * m.scale.x / wpp; placed.push({ m, rect: { x: cx - d / 2, y: cy - d / 2, w: d, h: d }, id: p.id, ring: true }); }
  return { placed, heads, bodies };
}
function buildPath(m) {
  const pd = m.userData.path; const a = resolvePoint(pd.from, 1), b = resolvePoint(pd.to, -1);
  if (typeof pd.from === 'string' && pd.from[0] !== '#') a.add(new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion).multiplyScalar(0.12));
  const mid = a.clone().lerp(b, 0.5).add(new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion).multiplyScalar(pd.lift)); const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
  while (m.children.length) { const c = m.children.pop(); c.geometry?.dispose(); }
  const col = new THREE.MeshBasicMaterial({ color: pd.red ? PAL.red : PAL.yellow });
  const draw = clamp(m.userData.draw ?? 1, 0.02, 1); const part = new THREE.CurvePath(); const pts = curve.getPoints(40).slice(0, Math.max(2, Math.round(40 * draw) + 1)); const c2 = new THREE.CatmullRomCurve3(pts);
  m.add(new THREE.Mesh(new THREE.TubeGeometry(c2, 24, pd.kind === 'arrow' ? 0.035 : 0.012, 8), col));
  if (pd.kind === 'arrow' && draw >= 1) { const cone = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.26, 16), col); cone.position.copy(b); const dir = b.clone().sub(curve.getPoint(0.9)).normalize(); cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir); m.add(cone); }
  if (pd.kind === 'line') { const dot = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), col); dot.position.copy(curve.getPoint(clamp(m.userData.dotP ?? 0, 0, 1))); m.add(dot); }
}

window.seek = function (t) {
  const inv = invertAmount(t);
  scene.background = hexLerp(PAL.bg, PAL.bgDark, inv); floorDark.material.opacity = inv; ambient.intensity = lerp(1.5, 0.9, inv);
  const cs = camState(t); const el = cs.el * Math.PI / 180, az = cs.az * Math.PI / 180;
  camera.position.set(cs.target[0] + cs.dist * Math.cos(el) * Math.sin(az), cs.target[1] + cs.dist * Math.sin(el), cs.target[2] + cs.dist * Math.cos(el) * Math.cos(az)); camera.lookAt(...cs.target); camera.fov = cs.fov; camera.updateProjectionMatrix(); camera.updateMatrixWorld();
  for (const [id, a] of Object.entries(actors)) { const s = actorState(id, t); a.visible = s.show; if (a.userData.head) { a.position.set(s.at[0], 0, s.at[1]); a.rotation.y = s.rot * Math.PI / 180; a.userData.head.rotation.set(s.head[1] * Math.PI / 180, s.head[0] * Math.PI / 180, 0); } a.updateMatrixWorld(true); }
  const capRect = captionRect(ctx, t);
  for (const m of props) {
    const p = m.userData.spec; const t0 = p.t0 ?? 0, t1 = p.t1 ?? 1e9;
    const inP = tw(t, t0, p.inDur ?? 0.32, p.inEase ?? 'back'), outP = tw(t, t1, 0.25, 'in'); const sc = Math.max(0.0001, inP * (1 - outP)) * (p.scale ?? 1);
    m.visible = t >= t0 && outP < 1; m.scale.setScalar(sc);
    if (m.userData.ring) { // anillo que se dibuja; con around: 'id' rodea al personaje de cara a la cámara
      const pr = p.draw != null ? tw(t, p.draw, 0.9, 'inout') : 1; const key = pr.toFixed(3); if (m.userData.key !== key) { m.userData.key = key; m.geometry.dispose(); m.geometry = new THREE.TorusGeometry(p.r ?? 0.55, p.tube ?? 0.07, 12, 60, Math.max(0.01, pr) * Math.PI * 2); }
      if (p.around) { const a = actors[p.around]; const base = a.position.clone().add(new THREE.Vector3(0, p.y ?? 0.95, 0)); const toCam = camera.position.clone().sub(base).normalize(); m.position.copy(base.add(toCam.multiplyScalar(p.front ?? 0.75))); }
      m.quaternion.copy(camera.quaternion); m.rotateZ(Math.PI * 0.6); }
    if (m.userData.letters) { const lp = m.userData.letters; const lit = (lp.litAt || []).filter(tt => t >= tt).length - 1; m.children.forEach(ch => { if (ch.userData.letter != null) ch.material.color.set(ch.userData.letter === lit ? PAL.yellow : '#ffffff'); }); }
    if (m.userData.timer) { const tm = m.userData.timer; const pr = clamp((t - (tm.p.fillFrom ?? t0)) / (tm.p.dur ?? 3), 0, 1); tm.arc.geometry.dispose(); tm.arc.geometry = new THREE.TorusGeometry(tm.r, 0.075, 10, 60, Math.max(0.01, pr) * Math.PI * 2); }
    if (m.userData.coins) { const cp = m.userData.coins; const k = Math.floor(clamp((t - t0) / (cp.each ?? 0.25), 0, cp.n ?? 8)); m.children.forEach((c, i) => { c.visible = Math.floor(i / 2) < k; }); }
    if (m.userData.bracketOf && m.visible) { const h = headWorld(m.userData.bracketOf); const a = actors[m.userData.bracketOf]; m.position.copy(a.position).add(new THREE.Vector3(0, a.userData.h * 0.55, 0.3)); m.quaternion.copy(camera.quaternion); }
    if (m.userData.bars) { const b = m.userData.bars; const filled = Math.floor(clamp((t - (b.fillFrom ?? t0)) / (b.each ?? 1.2), 0, b.n ?? 5)); m.children.forEach((c, i) => { if (i % 2 === 1) c.visible = (i - 1) / 2 < filled; }); }
    if (m.userData.retex) { // bocadillos: tachado y texto que se revela palabra a palabra
      const s = m.userData.src; let strikeW, nWords;
      if (s.strike != null) strikeW = tw(t, s.strike, 0.35, 'out');
      if (s.reveal != null) { const ws = TIMING.words[s.reveal] || []; nWords = ws.filter(w => t >= w[0]).length; }
      let nLines; if (s.rowsAt) nLines = s.rowsAt.filter(r => t >= r).length;
      const key = `${strikeW?.toFixed(2)}|${nWords}|${nLines}`; if (m.userData.key !== key) { m.userData.key = key; const ti = bubbleTexture(bubbleOpts(s, { strikeW, nWords, nLines })); m.material.map.dispose(); m.material.map = ti.tx; m.material.needsUpdate = true; }
    }
    if (p.float && p.at) m.position.y = p.at[1] + Math.sin(t * 2.1 + (p.at[0] || 0)) * 0.03;
  }
  const lay = placeBillboards(t, capRect);
  for (const m of props) if (m.visible && m.userData.path) { m.userData.draw = tw(t, m.userData.spec.t0, m.userData.spec.drawDur ?? 0.6, 'out'); m.userData.dotP = ((t - m.userData.spec.t0) * 0.6) % 1; m.scale.setScalar(1); buildPath(m); }
  renderer.render(scene, camera);
  ctx.drawImage(glCanvas, 0, 0); drawCaptions(ctx, t, inv > 0.5);
  lastFrame = { t, caption: capRect, props: lay.placed.map(q => ({ id: q.id || q.m.userData.spec.type, rect: q.rect, ring: !!q.ring })), heads: lay.heads, bodies: lay.bodies, camDist: cs.dist };
};
// Inspector: qué ocupa cada cosa en el fotograma actual (rectángulos en píxeles) para medir solapes desde fuera.
window.inspect = function (t) { window.seek(t); return lastFrame; };
window.DURATION = TIMING.duration;
window.ready = (async () => { await Promise.all([document.fonts.load('900 100px NotoCond'), document.fonts.load('400 30px Montserrat'), document.fonts.load('600 30px Montserrat')]); init(); window.seek(0); return true; })();
})();
