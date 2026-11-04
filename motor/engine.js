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
  wide: { dist: 14, el: 26, az: 0, target: [0, 1.2, -1] },
  medium: { dist: 7.4, el: 17, az: 0, target: [0, 1.0, 0] },
  close: { dist: 4.2, el: 10, az: 0, target: [0, 1.35, 0] },
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
    const p = tw(t, k.t, k.dur ?? 1.5, k.ease ?? 'inout');
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
function wrapText(x, text, maxW) { const words = text.split(' '); const lines = []; let cur = ''; for (const w of words) { const test = cur ? cur + ' ' + w : w; if (x.measureText(test).width > maxW && cur) { lines.push(cur); cur = w; } else cur = test; } if (cur) lines.push(cur); return lines; }
function bubbleTexture(o) {
  // o: {text, w (px), serif, accent, tail:'left'|'right'|'none', thought}
  const pad = 36, fs = o.serif ? 64 : 34; const c = document.createElement('canvas'); const x = c.getContext('2d');
  x.font = o.serif ? `900 ${fs}px NotoCond` : `400 ${fs}px Montserrat`;
  const lines = wrapText(x, o.serif ? o.text.toUpperCase() : o.text, o.w - pad * 2);
  const lh = fs * (o.serif ? 1.15 : 1.35); const bh = pad * 2 + lines.length * lh; const tail = o.tail === 'none' ? 0 : 60;
  c.width = o.w + 24; c.height = bh + tail + 24; x.font = o.serif ? `900 ${fs}px NotoCond` : `400 ${fs}px Montserrat`;
  x.shadowColor = 'rgba(0,0,0,0.18)'; x.shadowBlur = 18; x.shadowOffsetY = 8; x.fillStyle = '#ffffff';
  if (o.thought) { x.setLineDash([10, 8]); x.strokeStyle = PAL.text; x.lineWidth = 3; roundRect(x, 12, 12, o.w, bh, 40); x.fill(); x.shadowColor = 'transparent'; x.stroke(); x.setLineDash([]); }
  else { roundRect(x, 12, 12, o.w, bh, 22); x.fill(); x.shadowColor = 'transparent'; }
  if (o.tail === 'left' || o.tail === 'right') { const tx = o.tail === 'left' ? 90 : o.w - 90; x.beginPath(); x.moveTo(tx - 28, bh + 10); x.lineTo(tx + 22, bh + 10); x.lineTo(tx - 10, bh + 12 + tail - 8); x.closePath(); x.fillStyle = '#ffffff'; x.fill(); }
  if (o.accent) { x.fillStyle = PAL.yellow; roundRect(x, 12, 12, 14, bh, 7); x.fill(); x.fillRect(19, 12, 7, bh); }
  x.fillStyle = PAL.text; x.textBaseline = 'top';
  lines.forEach((l, i) => { x.fillText(l, 12 + pad + (o.accent ? 10 : 0), 12 + pad + i * lh + (o.serif ? 0 : 4)); });
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
function billboard(texInfo, worldH) { const ratio = texInfo.w / texInfo.h; const m = new THREE.Mesh(new THREE.PlaneGeometry(worldH * ratio, worldH), new THREE.MeshBasicMaterial({ map: texInfo.tx, transparent: true, depthWrite: false })); m.userData.billboard = true; return m; }
const PROPS = {
  bubble(p) { const ti = bubbleTexture({ text: p.text, w: p.w ?? 640, serif: p.serif, accent: p.accent, tail: p.tail ?? 'left', strikeW: p.strike != null ? 0 : undefined }); const m = billboard(ti, p.h ?? (p.serif ? 1.3 : 0.55)); m.userData.strike = p.strike; m.userData.src = p; return m; },
  thought(p) { const ti = bubbleTexture({ text: p.text, w: p.w ?? 520, thought: true, tail: 'none' }); return billboard(ti, p.h ?? 0.55); },
  card(p) { const m = new THREE.Mesh(new THREE.PlaneGeometry(0.44, 0.6), new THREE.MeshBasicMaterial({ map: cardTexture(p), transparent: true, side: THREE.DoubleSide })); m.userData.billboard = true; return m; },
  cards(p) { // campo de tarjetas en el suelo
    const g = new THREE.Group(); const n = p.n ?? 40, cols = p.cols ?? 8; const tx = cardTexture({});
    for (let i = 0; i < n; i++) { const m = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.68), new THREE.MeshBasicMaterial({ map: tx, transparent: true })); m.rotation.x = -Math.PI / 2; m.position.set((i % cols - (cols - 1) / 2) * 0.72, 0.01, Math.floor(i / cols) * 0.95 - 1); g.add(m); }
    return g;
  },
  ring(p) { const m = new THREE.Mesh(new THREE.TorusGeometry(p.r ?? 0.55, p.tube ?? 0.07, 12, 60, Math.PI * 2), new THREE.MeshBasicMaterial({ color: PAL.yellow })); m.userData.ring = p; return m; },
  cross(p) { const g = new THREE.Group(); const mat = new THREE.MeshBasicMaterial({ color: PAL.red }); [45, -45].forEach(a => { const b = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.07, 0.02), mat); b.rotation.z = a * Math.PI / 180; g.add(b); }); g.userData.billboard = true; return g; },
  arrow(p) { // flecha curva amarilla de from a to
    const a = new THREE.Vector3(...p.from), b = new THREE.Vector3(...p.to); const mid = a.clone().lerp(b, 0.5); mid.y += p.lift ?? 0.6;
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b); const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.035, 8), new THREE.MeshBasicMaterial({ color: PAL.yellow }));
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.26, 16), new THREE.MeshBasicMaterial({ color: PAL.yellow })); cone.position.copy(b); const dir = b.clone().sub(curve.getPoint(0.92)).normalize(); cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    const g = new THREE.Group(); g.add(tube, cone); g.userData.noPos = true; return g;
  },
  line(p) { // línea de atención: trazo fino de from a to con un punto que viaja
    const a = new THREE.Vector3(...p.from), b = new THREE.Vector3(...p.to); const mid = a.clone().lerp(b, 0.5); mid.y += p.lift ?? 0.3;
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b); const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.012, 6), new THREE.MeshBasicMaterial({ color: p.red ? PAL.red : PAL.yellow }));
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), new THREE.MeshBasicMaterial({ color: p.red ? PAL.red : PAL.yellow })); const g = new THREE.Group(); g.add(tube, dot); g.userData = { noPos: true, curve, dot }; return g;
  },
  bars(p) { const g = new THREE.Group(); const n = p.n ?? 5; for (let i = 0; i < n; i++) { const b = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.42, 0.06), new THREE.MeshBasicMaterial({ color: '#d2d2d6' })); b.position.x = (i - (n - 1) / 2) * 0.2; const f = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.42, 0.065), new THREE.MeshBasicMaterial({ color: PAL.yellow })); f.position.x = b.position.x; f.visible = false; g.add(b, f); } g.userData = { billboard: true, bars: p }; return g; },
  door(p) { const g = new THREE.Group(); const mat = toonMat('#ffffff'); const dark = toonMat(PAL.other); const fr = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2.1, 0.12), dark); fr.position.y = 1.05; const hole = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.95, 0.14), mat); hole.position.y = 0.975; const wall = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.4, 0.08), mat); wall.position.set(0, 1.2, -0.03); g.add(wall, fr, hole); g.add(outlineMesh(new THREE.BoxGeometry(3.2, 2.4, 0.08), 1.01).translateY(1.2).translateZ(-0.03)); return g; },
  table(p) { const g = new THREE.Group(); const mat = toonMat('#ffffff'); const top = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.05, 32), mat); top.position.y = 1.05; const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.05, 12), mat); leg.position.y = 0.52; const base = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.04, 32), mat); base.position.y = 0.02; g.add(top, leg, base, outlineMesh(new THREE.CylinderGeometry(0.42, 0.42, 0.05, 32), 1.02).translateY(1.05)); return g; },
};

// ---------- rotulación 2D ----------
function drawCaptions(x, t, inv) {
  const lines = REEL.lines; const marginX = 60, fs = 118, lh = 146, maxW = W - 2 * marginX - 40;
  x.save(); x.font = `900 ${fs}px NotoCond`; x.textBaseline = 'alphabetic';
  for (let li = 0; li < lines.length; li++) {
    const L = lines[li], words = TIMING.words[li]; if (!words || L.hide) continue;
    const t0 = words[0][0], tEnd = words[words.length - 1][1]; const next = TIMING.words[li + 1]; const hold = next ? Math.min(next[0][0] - 0.05, tEnd + 2.2) : tEnd + 2.5;
    if (t < t0 - 0.02 || t > hold) continue;
    const top = L.voice ? 215 : 160;
    // salida: barrido hacia arriba con desvanecido en los últimos 0,25 s
    const outP = clamp((t - (hold - 0.25)) / 0.25, 0, 1);
    const tokens = L.show.split(' '); const layout = []; let cx = 0, row = 0;
    for (let i = 0; i < tokens.length; i++) { const w = x.measureText(tokens[i].toUpperCase()).width; if (cx + w > maxW && cx > 0) { row++; cx = 0; } layout.push({ w, row, xoff: cx }); cx += w + fs * 0.26; }
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
  }
  x.restore();
}

// ---------- montaje ----------
let renderer, scene, camera, glCanvas, cv, ctx, actors = {}, props = [], floorLight, floorDark, ambient, sun;
function init() {
  glCanvas = document.createElement('canvas'); glCanvas.width = W; glCanvas.height = H;
  renderer = new THREE.WebGLRenderer({ canvas: glCanvas, antialias: true, preserveDrawingBuffer: true, alpha: false }); renderer.setSize(W, H, false); renderer.setPixelRatio(1); renderer.outputColorSpace = THREE.SRGBColorSpace;
  scene = new THREE.Scene(); scene.background = new THREE.Color(PAL.bg);
  camera = new THREE.PerspectiveCamera(30, W / H, 0.1, 200);
  ambient = new THREE.HemisphereLight('#ffffff', '#e2e2e6', 1.5); scene.add(ambient);
  sun = new THREE.DirectionalLight('#ffffff', 1.5); sun.position.set(-3, 8, 6); scene.add(sun);
  floorLight = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), new THREE.MeshBasicMaterial({ map: gridTexture(false) })); floorLight.rotation.x = -Math.PI / 2; scene.add(floorLight);
  floorDark = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), new THREE.MeshBasicMaterial({ map: gridTexture(true), transparent: true, opacity: 0 })); floorDark.rotation.x = -Math.PI / 2; floorDark.position.y = 0.001; scene.add(floorDark);
  for (const [id, spec] of Object.entries(SHOTS.actors)) {
    if (spec.kind === 'crowd') { const g = new THREE.Group(); const n = spec.n ?? 30, area = spec.area ?? [6, 4]; let seed = 7; const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
      for (let i = 0; i < n; i++) { const a = makeActor({ kind: 'crowd', h: 1.45 + rnd() * 0.25 }); a.position.set((rnd() - 0.5) * area[0] + (spec.at?.[0] ?? 0), 0, (rnd() - 0.5) * area[1] + (spec.at?.[1] ?? -3)); a.rotation.y = rnd() * 6.28; g.add(a); }
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
function invertAmount(t) { let v = 0; for (const iv of (SHOTS.invert || [])) { v = Math.max(v, tw(t, iv.t, 0.2, 'inout') - tw(t, iv.end, 0.2, 'inout')); } return clamp(v, 0, 1); }

window.seek = function (t) {
  const inv = invertAmount(t);
  scene.background = hexLerp(PAL.bg, PAL.bgDark, inv); floorDark.material.opacity = inv; ambient.intensity = lerp(1.5, 0.9, inv);
  const cs = camState(t); const el = cs.el * Math.PI / 180, az = cs.az * Math.PI / 180;
  camera.position.set(cs.target[0] + cs.dist * Math.cos(el) * Math.sin(az), cs.target[1] + cs.dist * Math.sin(el), cs.target[2] + cs.dist * Math.cos(el) * Math.cos(az)); camera.lookAt(...cs.target); camera.fov = cs.fov; camera.updateProjectionMatrix();
  for (const [id, a] of Object.entries(actors)) { const s = actorState(id, t); a.visible = s.show; if (a.userData.head) { a.position.set(s.at[0], 0, s.at[1]); a.rotation.y = s.rot * Math.PI / 180; a.userData.head.rotation.set(s.head[1] * Math.PI / 180, s.head[0] * Math.PI / 180, 0); } else a.position.set(0, 0, 0); }
  for (const m of props) {
    const p = m.userData.spec; const t0 = p.t0 ?? 0, t1 = p.t1 ?? 1e9;
    const inP = tw(t, t0, p.inDur ?? 0.32, p.inEase ?? 'back'), outP = tw(t, t1, 0.25, 'in'); const sc = Math.max(0.0001, inP * (1 - outP)) * (p.scale ?? 1);
    m.visible = t >= t0 && outP < 1; m.scale.setScalar(sc);
    if (m.userData.billboard) m.quaternion.copy(camera.quaternion);
    if (m.userData.ring && p.draw != null) { const pr = tw(t, p.draw, 0.9, 'inout'); m.geometry.dispose(); m.geometry = new THREE.TorusGeometry(p.r ?? 0.55, p.tube ?? 0.07, 12, 60, Math.max(0.01, pr) * Math.PI * 2); m.rotation.z = Math.PI * 0.6; m.quaternion.copy(camera.quaternion); }
    if (m.userData.curve) { const pr = (t - t0) * 0.7 % 1; m.userData.dot.position.copy(m.userData.curve.getPoint(clamp(pr, 0, 1))); }
    if (m.userData.bars) { const b = m.userData.bars; const filled = Math.floor(clamp((t - (b.fillFrom ?? t0)) / (b.each ?? 1.2), 0, b.n ?? 5)); m.children.forEach((c, i) => { if (i % 2 === 1) c.visible = (i - 1) / 2 < filled; }); }
    if (m.userData.strike != null && m.userData.src) { const pr = tw(t, m.userData.strike, 0.35, 'out'); if (Math.abs((m.userData.lastStrike ?? -1) - pr) > 0.02) { m.userData.lastStrike = pr; const s = m.userData.src; const ti = bubbleTexture({ text: s.text, w: s.w ?? 640, serif: s.serif, accent: s.accent, tail: s.tail ?? 'left', strikeW: pr }); m.material.map.dispose(); m.material.map = ti.tx; m.material.needsUpdate = true; } }
    if (p.float) m.position.y = p.at[1] + Math.sin(t * 2.1 + (p.at[0] || 0)) * 0.03;
  }
  renderer.render(scene, camera);
  ctx.drawImage(glCanvas, 0, 0); drawCaptions(ctx, t, inv > 0.5);
};
window.DURATION = TIMING.duration;
window.ready = (async () => { await Promise.all([document.fonts.load('900 100px NotoCond'), document.fonts.load('400 30px Montserrat'), document.fonts.load('600 30px Montserrat')]); init(); window.seek(0); return true; })();
})();
