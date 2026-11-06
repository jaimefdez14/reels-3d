// Motor 3D de los reels: escena Three.js determinista (todo se calcula a partir de t) + rotulación 2D encima.
// Contrato con las herramientas: window.ready (promesa), window.DURATION, window.seek(t) y el canvas final #cv (1080x1920).
// Lo define build.py: window.REEL (reel.json), window.SHOTS (shots3d.js ya ejecutado) y window.TIMING (timing.json).
(function(){
'use strict';
const W = 1080, H = 1920;
const PAL = { bg: '#f5f5f5', bgDark: '#34353a', text: '#2a292c', hero: '#fafafa', other: '#4f5057', otherFace: '#2b2b2f', crowd: '#b4b5ba', yellow: '#f5d63f', red: '#de2f45', shadow: '#d9d9dc', outline: '#2a292c', grid: '#e3e3e6', cross: '#c6c6ca' };
PAL.marker = PAL.yellow; // marcador del titular (puede ser distinto del color de los objetos)
// Paletas alternativas por reel (reel.json → "paleta"): prueba del 06-11 con el azul de la otra marca.
const PALETAS = { azul: { yellow: '#2f6db5', marker: '#a9cbf2' } };
if (window.REEL && PALETAS[window.REEL.paleta]) Object.assign(PAL, PALETAS[window.REEL.paleta]);

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
// Encuadre automático (regla 9): cada keyframe se ajusta para que los personajes principales visibles al final del movimiento
// quepan enteros (márgenes 40 px, bajo el titular y sobre y = 1780): se recentra x/z en ellos y se aleja la cámara si hace falta.
// Se desactiva con fit: false en el keyframe; fit: ['yo'] limita a esos personajes.
const _fitCache = new Map();
function placeCamera(cs) { const el = cs.el * Math.PI / 180, az = cs.az * Math.PI / 180; camera.position.set(cs.target[0] + cs.dist * Math.cos(el) * Math.sin(az), cs.target[1] + cs.dist * Math.sin(el), cs.target[2] + cs.dist * Math.cos(el) * Math.cos(az)); camera.lookAt(...cs.target); camera.fov = cs.fov; camera.updateProjectionMatrix(); camera.updateMatrixWorld(); }
function fitCam(k, cs, tEnd) {
  if (k.fit === false || !actors || !Object.keys(actors).length) return cs;
  const key = SHOTS.cam.indexOf(k); if (_fitCache.has(key)) return _fitCache.get(key);
  const ids = Array.isArray(k.fit) ? k.fit : Object.keys(actors).filter(id => actors[id].userData.head);
  const states = ids.map(id => ({ id, st: actorState(id, tEnd) })).filter(x => x.st.show);
  if (!states.length) { _fitCache.set(key, cs); return cs; }
  const cx = states.reduce((a, x) => a + x.st.at[0], 0) / states.length, cz = states.reduce((a, x) => a + x.st.at[1], 0) / states.length;
  let out = { ...cs, target: [k.target ? cs.target[0] : cx, cs.target[1], k.target ? cs.target[2] : cz] };
  const saved = { p: camera.position.clone(), q: camera.quaternion.clone(), f: camera.fov };
  const fits = (st) => { placeCamera(st); for (const x of states) { const h = actors[x.id].userData.h; for (const [dx, dy, dz] of [[-0.42, 0, 0.42], [0.42, 0, 0.42], [-0.42, 0, -0.42], [0.42, 0, -0.42], [-0.3, h * 1.06, 0], [0.3, h * 1.06, 0]]) { const [sx, sy] = toScreen(new THREE.Vector3(x.st.at[0] + dx, dy, x.st.at[1] + dz)); if (sx < 40 || sx > W - 40 || sy < 470 || sy > 1780) return false; } } return true; };
  for (let i = 0; i < 14 && !fits(out); i++) out = { ...out, dist: out.dist * 1.08, target: [out.target[0], out.target[1] + 0.02, out.target[2]] };
  camera.position.copy(saved.p); camera.quaternion.copy(saved.q); camera.fov = saved.f; camera.updateProjectionMatrix();
  _fitCache.set(key, out); return out;
}
function camState(t) {
  const kfs = SHOTS.cam; let s = { ...CAM_PRESETS.medium, fov: 30 }, prevS = s;
  for (const k of kfs) {
    const target = fitCam(k, resolveCam(k, s), k.t + (k.dur ?? (k.whip ? 0.28 : 1.5)) + 0.05);
    if (t < k.t) break;
    const p = k.t <= 0 ? 1 : tw(t, k.t, k.dur ?? (k.whip ? 0.28 : 1.5), k.ease ?? 'inout'); // un keyframe en t=0 se aplica desde el primer fotograma
    prevS = s;
    s = { dist: lerp(prevS.dist, target.dist, p), el: lerp(prevS.el, target.el, p), az: lerp(prevS.az, target.az, p), target: lerpV(prevS.target, target.target, p), fov: lerp(prevS.fov, target.fov, p) };
    if (p >= 1) s = target;
  }
  return s;
}

// ---------- geometrías de los personajes ----------
function pillGeometry(h = 1.6, w = 0.5) {
  // cuerpo «bala» de la referencia: base estrecha y plana, se ensancha hacia los hombros y cierra en cúpula (LatheGeometry)
  const H = h * 0.74, rTop = w * 0.4, rBot = w * 0.3; const pts = [new THREE.Vector2(0, 0), new THREE.Vector2(rBot - 0.025, 0), new THREE.Vector2(rBot, 0.025)];
  for (let i = 1; i <= 6; i++) { const f = i / 6; pts.push(new THREE.Vector2(rBot + (rTop - rBot) * Math.pow(f, 0.8), 0.025 + (H - rTop - 0.025) * f)); }
  for (let i = 1; i <= 12; i++) { const a = (i / 12) * Math.PI / 2; pts.push(new THREE.Vector2(rTop * Math.cos(a), H - rTop + rTop * Math.sin(a))); }
  const g = new THREE.LatheGeometry(pts, 48); g.computeVertexNormals(); g.userData = { H, rTop, rBot }; return g;
}
// contorno de grosor constante: la misma malla inflada a lo largo de las normales, solo caras traseras
function shellGeometry(geo, d) { const g = geo.clone(); g.computeVertexNormals(); const p = g.attributes.position, n = g.attributes.normal; for (let i = 0; i < p.count; i++) p.setXYZ(i, p.getX(i) + n.getX(i) * d, p.getY(i) + n.getY(i) * d, p.getZ(i) + n.getZ(i) * d); return g; }
let toonGradient;
function toonMat(color) { if (color === PAL.hero || color === '#ffffff') return new THREE.MeshLambertMaterial({ color, emissive: '#5c5c60' }); // el blanco se ve blanco, con un sombreado leve

  if (!toonGradient) { const c = document.createElement('canvas'); c.width = 4; c.height = 1; const x = c.getContext('2d'); ['#9a9a9a', '#d4d4d4', '#f4f4f4', '#ffffff'].forEach((col, i) => { x.fillStyle = col; x.fillRect(i, 0, 1, 1); }); toonGradient = new THREE.CanvasTexture(c); toonGradient.minFilter = toonGradient.magFilter = THREE.NearestFilter; toonGradient.colorSpace = THREE.NoColorSpace; }
  return new THREE.MeshLambertMaterial({ color }); // sombreado suave como la referencia (antes MeshToonMaterial a franjas)
}
function roundedBox(w, h, d, r) { const sh = new THREE.Shape(); const x = -w / 2, y = -h / 2; sh.moveTo(x + r, y); sh.lineTo(x + w - r, y); sh.quadraticCurveTo(x + w, y, x + w, y + r); sh.lineTo(x + w, y + h - r); sh.quadraticCurveTo(x + w, y + h, x + w - r, y + h); sh.lineTo(x + r, y + h); sh.quadraticCurveTo(x, y + h, x, y + h - r); sh.lineTo(x, y + r); sh.quadraticCurveTo(x, y, x + r, y); const g = new THREE.ExtrudeGeometry(sh, { depth: d - r, bevelEnabled: true, bevelThickness: r / 2, bevelSize: r / 2, bevelSegments: 4 }); g.translate(0, 0, -(d - r) / 2); return g; }
function outlineMesh(geom, scale = 1.035) { const m = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({ color: PAL.outline, side: THREE.BackSide })); m.scale.setScalar(scale); return m; }
let _shadowTx; function shadowMesh(r = 0.42) { if (!_shadowTx) { const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d'); const gr = x.createRadialGradient(64, 64, 4, 64, 64, 64); gr.addColorStop(0, 'rgba(60,60,70,0.42)'); gr.addColorStop(0.55, 'rgba(60,60,70,0.22)'); gr.addColorStop(1, 'rgba(60,60,70,0)'); x.fillStyle = gr; x.fillRect(0, 0, 128, 128); _shadowTx = new THREE.CanvasTexture(c); } const m = new THREE.Mesh(new THREE.PlaneGeometry(r * 2.6, r * 2.6), new THREE.MeshBasicMaterial({ map: _shadowTx, transparent: true, depthWrite: false })); m.rotation.x = -Math.PI / 2; m.position.y = 0.004; m.scale.set(1.2, 0.85, 1); m.userData.notMask = true; return m; }

function makeActor(spec) {
  const g = new THREE.Group(); const h = spec.h ?? 1.6; const kind = spec.kind;
  const color = kind === 'hero' ? PAL.hero : kind === 'other' ? PAL.other : PAL.crowd;
  const bodyG = pillGeometry(h); const { H, rTop } = bodyG.userData; const body = new THREE.Mesh(bodyG, toonMat(color)); g.add(body);
  const hr = rTop * 0.88; const head = new THREE.Group(); head.position.y = H + 0.055 + hr; g.add(head);
  if (kind === 'other') { // cabeza cuadrada redondeada oscura con cara (la referencia)
    const hb = new THREE.Mesh(roundedBox(hr * 2.05, hr * 1.9, hr * 1.7, hr * 0.5), toonMat(PAL.otherFace)); head.add(hb);
    if (spec.face !== false) {
      const eyeM = new THREE.MeshBasicMaterial({ color: '#ffffff' });
      [-1, 1].forEach(sx => { const e = new THREE.Mesh(new THREE.SphereGeometry(hr * 0.09, 10, 10), eyeM); e.position.set(sx * hr * 0.32, hr * 0.12, hr * 0.86); head.add(e); });
      const smile = new THREE.Mesh(new THREE.TorusGeometry(hr * 0.26, hr * 0.045, 6, 20, Math.PI), eyeM); smile.position.set(0, -hr * 0.12, hr * 0.86); smile.rotation.z = Math.PI; head.add(smile);
      const flat = new THREE.Mesh(new THREE.BoxGeometry(hr * 0.42, hr * 0.08, 0.005), eyeM); flat.position.set(0, -hr * 0.28, hr * 0.86); flat.visible = false; head.add(flat);
      const sad = new THREE.Mesh(new THREE.TorusGeometry(hr * 0.22, hr * 0.045, 6, 20, Math.PI), eyeM); sad.position.set(0, -hr * 0.42, hr * 0.86); sad.visible = false; head.add(sad);
      head.userData.faces = { smile, flat, sad };
    }
  } else {
    const hsG = new THREE.SphereGeometry(hr, 32, 24); head.add(new THREE.Mesh(hsG, toonMat(color)));
    if (kind === 'hero') {
      const OL = new THREE.MeshBasicMaterial({ color: PAL.outline, side: THREE.BackSide });
      head.add(new THREE.Mesh(shellGeometry(hsG, 0.016), OL)); g.add(new THREE.Mesh(shellGeometry(bodyG, 0.016), OL));
      const eyeM = new THREE.MeshBasicMaterial({ color: PAL.text });
      if (window.REEL && window.REEL.cara === 'v2') { // cara v2 (06-11): dos ojos ovalados en tres cuartos y sonrisa con puntas redondas
        const onHead = (ang, y, r) => { const c = Math.sqrt(1 - y * y); return [Math.sin(ang) * c * hr * r, y * hr * r, Math.cos(ang) * c * hr * r]; };
        [[0.62, 0.13], [0.0, 0.12]].forEach(([ang, sz], k) => { const e = new THREE.Mesh(new THREE.SphereGeometry(hr * sz * (k ? 0.92 : 1), 14, 12), eyeM); e.scale.set(0.8, 1.3, 0.45); e.position.set(...onHead(ang, 0.2, 0.97)); e.lookAt(new THREE.Vector3(...onHead(ang, 0.2, 3))); head.add(e); });
        const R = hr * 0.2, tube = hr * 0.04, arc = Math.PI * 0.75; const sm = new THREE.Mesh(new THREE.TorusGeometry(R, tube, 8, 24, arc), eyeM);
        [0, arc].forEach(a => { const cap = new THREE.Mesh(new THREE.SphereGeometry(tube, 8, 8), eyeM); cap.position.set(R * Math.cos(a), R * Math.sin(a), 0); sm.add(cap); });
        const ang = 0.33; sm.position.set(...onHead(ang, -0.12, 0.93)); sm.rotation.set(0, ang, Math.PI + (Math.PI - arc) / 2 + Math.PI * 0.0); head.add(sm);
      } else {
      const e = new THREE.Mesh(new THREE.SphereGeometry(hr * 0.09, 8, 8), eyeM); e.position.set(hr * 0.55, hr * 0.15, hr * 0.8); head.add(e);
      const sm = new THREE.Mesh(new THREE.TorusGeometry(hr * 0.16, hr * 0.03, 6, 16, Math.PI * 0.7), eyeM); sm.position.set(hr * 0.62, -hr * 0.22, hr * 0.72); sm.rotation.set(0, 0.6, Math.PI * 1.05); head.add(sm);
      }
      // brazo en jarra (tubo blanco con contorno), con pivote en el hombro: arm en grados (0 = en jarra, 120 = levantado)
      const arm = new THREE.Group(); arm.position.set(rTop * 0.62, H - rTop * 0.7, rTop * 0.78); g.add(arm);
      const path = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, 0), new THREE.Vector3(rTop * 0.75, -H * 0.19, 0.03), new THREE.Vector3(rTop * 0.2, -H * 0.37, 0.05)]);
      const tubeG = new THREE.TubeGeometry(path, 20, 0.03, 12); arm.add(new THREE.Mesh(tubeG, toonMat(PAL.hero))); arm.add(new THREE.Mesh(shellGeometry(tubeG, 0.014), OL));
      const phone = new THREE.Group(); const pb = new THREE.Mesh(roundedBox(0.13, 0.22, 0.03, 0.02), toonMat(PAL.other)); phone.add(pb); const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.17), new THREE.MeshBasicMaterial({ color: PAL.yellow })); scr.position.z = 0.017; phone.add(scr); phone.position.set(rTop * 0.05, -H * 0.36, 0.08); phone.visible = false; arm.add(phone);
      g.userData.arm = arm; g.userData.phone = phone;
    }
  }
  if (kind !== 'crowd') { // contorno amarillo para señalar (moves: glow: true), como «find the connector» en la referencia
    const GL = new THREE.MeshBasicMaterial({ color: PAL.yellow, side: THREE.BackSide }); const gb = new THREE.Mesh(shellGeometry(bodyG, 0.05), GL); gb.visible = false; g.add(gb);
    const gh = new THREE.Mesh(new THREE.SphereGeometry(hr + 0.05, 24, 16), GL); gh.visible = false; head.add(gh); g.userData.glow = [gb, gh]; }
  g.add(shadowMesh(rTop * 1.1)); g.userData = { ...g.userData, spec, head, h }; return g;
}

// ---------- escenario ----------
function gridTexture(dark) {
  const c = document.createElement('canvas'); c.width = c.height = 512; const x = c.getContext('2d');
  x.fillStyle = dark ? PAL.bgDark : PAL.bg; x.fillRect(0, 0, 512, 512);
  x.strokeStyle = dark ? '#43444a' : '#e8e8eb'; x.lineWidth = 1.5;
  for (let i = 0; i <= 512; i += 128) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, 512); x.moveTo(0, i); x.lineTo(512, i); x.stroke(); }
  x.strokeStyle = dark ? '#6a6b72' : '#bdbdc2'; x.lineWidth = 2.5;
  for (let i = 0; i <= 512; i += 256) for (let j = 0; j <= 512; j += 256) { x.beginPath(); x.moveTo(i - 10, j); x.lineTo(i + 10, j); x.moveTo(i, j - 10); x.lineTo(i, j + 10); x.stroke(); }
  const tx = new THREE.CanvasTexture(c); tx.wrapS = tx.wrapT = THREE.RepeatWrapping; tx.repeat.set(40, 40); tx.anisotropy = 4; return tx;
}

// ---------- texturas de texto para bocadillos y tarjetas ----------
function roundRect(x, X, y, w, h, r) { x.beginPath(); x.moveTo(X + r, y); x.arcTo(X + w, y, X + w, y + h, r); x.arcTo(X + w, y + h, X, y + h, r); x.arcTo(X, y + h, X, y, r); x.arcTo(X, y, X + w, y, r); x.closePath(); }
function wrapText(x, text, maxW) { const lines = []; for (const para of text.split('\n')) { const words = para.split(' '); let cur = ''; for (const w of words) { const test = cur ? cur + ' ' + w : w; if (x.measureText(test).width > maxW && cur) { lines.push(cur); cur = w; } else cur = test; } if (cur) lines.push(cur); } return lines; }
function bubbleTexture(o) {
  // o: {text, w (px), serif, accent, tail:'left'|'right'|'none', thought}
  const pad = o.serif ? 56 : 44, fs = o.serif ? 66 : 46; const c = document.createElement('canvas'); const x = c.getContext('2d');
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

function batteryTexture(level, p = {}) {
  const c = document.createElement('canvas'); c.width = 300; c.height = 150; const x = c.getContext('2d');
  x.fillStyle = '#ffffff'; roundRect(x, 10, 15, 250, 120, 24); x.fill(); x.strokeStyle = PAL.text; x.lineWidth = 8; x.stroke(); x.fillStyle = PAL.text; roundRect(x, 262, 50, 26, 50, 8); x.fill();
  const lv = clamp(level, 0, 1); if (lv > 0.01) { x.fillStyle = lv < 0.25 ? PAL.red : PAL.yellow; roundRect(x, 26, 31, 218 * lv, 88, 12); x.fill(); }
  const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace; return { tx, w: c.width, h: c.height }; }
function receiptTexture(p, nChecked) {
  const rows = p.rows ?? ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']; const c = document.createElement('canvas'); c.width = 520; c.height = 170 + rows.length * 110; const x = c.getContext('2d');
  x.shadowColor = 'rgba(0,0,0,0.16)'; x.shadowBlur = 16; x.shadowOffsetY = 8; x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(14, 14); x.lineTo(506, 14); x.lineTo(506, c.height - 30); for (let i = 0; i <= 12; i++) x.lineTo(506 - i * 41, c.height - (i % 2 ? 14 : 30)); x.closePath(); x.fill(); x.shadowColor = 'transparent';
  if (p.labels) { x.fillStyle = PAL.text; x.font = '900 72px NotoCond'; x.fillText((p.title ?? 'Semana').toUpperCase(), 48, 104); } else { x.fillStyle = '#d6d6da'; roundRect(x, 48, 64, 220, 34, 10); x.fill(); }
  rows.forEach((r, i) => { const y = 150 + i * 110; x.strokeStyle = PAL.text; x.lineWidth = 5; roundRect(x, 48, y, 64, 64, 12); x.stroke(); if (p.labels) { x.fillStyle = '#6b6b70'; x.font = '500 40px Montserrat'; x.fillText(r, 140, y + 46); } else { x.fillStyle = '#dcdce0'; roundRect(x, 140, y + 18, 300 - (i % 3) * 40, 28, 10); x.fill(); }
    if (i < nChecked) { x.fillStyle = PAL.yellow; roundRect(x, 48, y, 64, 64, 12); x.fill(); x.strokeStyle = PAL.text; x.lineWidth = 9; x.lineCap = 'round'; x.beginPath(); x.moveTo(62, y + 34); x.lineTo(78, y + 50); x.lineTo(100, y + 16); x.stroke(); } });
  const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace; return { tx, w: c.width, h: c.height }; }
// ---------- objetos (props) ----------
// Cada objeto tiene {type, t0, t1, ...}. Los «billboard» (bocadillo, nube, tarjeta, cruz, barras) pueden anclarse a un
// personaje con over: 'id' (sobre su cabeza) y el motor los coloca en pantalla sin pisar el titular, los bordes ni otros objetos.
function billboard(texInfo, worldH) { const ratio = texInfo.w / texInfo.h; const m = new THREE.Mesh(new THREE.PlaneGeometry(worldH * ratio, worldH), new THREE.MeshBasicMaterial({ map: texInfo.tx, transparent: true, depthWrite: false, depthTest: false })); m.renderOrder = 20; m.userData.billboard = true; m.userData.size = [worldH * ratio, worldH]; return m; }
function bubbleOpts(p, extra = {}) { return { text: p.text, w: p.w ?? 640, serif: p.serif, accent: p.accent, tail: p.tail ?? 'left', ...extra }; }
const PROPS = {
  bubble(p) { const m = billboard(bubbleTexture(bubbleOpts(p, { strikeW: p.strike != null ? 0 : undefined, nWords: p.reveal != null ? 0 : undefined, nLines: p.rowsAt ? 0 : undefined })), p.h ?? (p.serif ? 1.3 : 0.55)); m.userData.src = p; m.userData.retex = true; return m; },
  thought(p) { const m = billboard(bubbleTexture({ text: p.text, w: p.w ?? 520, thought: true, tail: 'none' }), p.h ?? 0.6); return m; },
  card(p) { const m = new THREE.Mesh(new THREE.PlaneGeometry(0.44, 0.6), new THREE.MeshBasicMaterial({ map: cardTexture(p), transparent: true, side: THREE.DoubleSide, depthTest: !!p.standing })); m.renderOrder = p.standing ? 0 : 20; m.userData.billboard = !p.standing; m.userData.size = [0.44, 0.6]; return m; },
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
    else if (ic === 'phone') { roundRect(x, 84, 40, 88, 176, 16); x.fill(); x.fillStyle = p.yellow ? PAL.yellow : '#ffffff'; x.fillRect(96, 62, 64, 116); x.lineWidth = 8; [[60, 70], [196, 70]].forEach(([cx, cy], i) => { x.beginPath(); x.arc(cx, cy, 22, i ? -1.2 : 2.0, i ? 0.2 : 3.4); x.stroke(); }); }
    else if (ic === 'page') { x.fillStyle = '#ffffff'; x.fillRect(64, 40, 128, 176); x.strokeRect(64, 40, 128, 176); }
    else if (ic === 'check') { x.beginPath(); x.moveTo(64, 134); x.lineTo(112, 180); x.lineTo(196, 80); x.stroke(); }
    else if (ic === 'x') { x.strokeStyle = PAL.red; x.beginPath(); x.moveTo(72, 72); x.lineTo(184, 184); x.moveTo(184, 72); x.lineTo(72, 184); x.stroke(); }
    else { x.font = '900 150px NotoCond'; x.fillText(ic, 128, 136); }
    const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace; const m = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.5), new THREE.MeshBasicMaterial({ map: tx, transparent: true, depthTest: false })); m.renderOrder = 20; m.userData.billboard = true; m.userData.size = [0.5, 0.5]; return m; },
  tag(p) { // etiqueta con borde (A FEW / MI PRIMERO), roja o amarilla
    const c = document.createElement('canvas'); const x = c.getContext('2d'); x.font = '900 72px NotoCond'; const w = x.measureText(p.text.toUpperCase()).width + 90; c.width = w; c.height = 120; x.font = '900 72px NotoCond';
    x.fillStyle = '#ffffff'; roundRect(x, 6, 6, w - 12, 108, 12); x.fill(); x.strokeStyle = p.red ? PAL.red : (p.yellow ? PAL.yellow : PAL.text); x.lineWidth = 6; x.stroke(); x.fillStyle = PAL.text; x.textBaseline = 'middle'; x.fillText(p.text.toUpperCase(), 45, 62);
    const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace; const m = new THREE.Mesh(new THREE.PlaneGeometry(0.4 * w / 120, 0.4), new THREE.MeshBasicMaterial({ map: tx, transparent: true, depthTest: false })); m.renderOrder = 20; m.userData.billboard = true; m.userData.size = [0.4 * w / 120, 0.4]; return m; },
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
    g.children.forEach(c => { c.position.x -= xoff / 2; }); g.userData.letters = p; return g; }, // centradas en «at»
  stage(p) { const g = new THREE.Group(); const mat = toonMat('#ffffff'); const base = new THREE.Mesh(new THREE.BoxGeometry(5, 0.35, 2.4), mat); base.position.y = 0.175; g.add(base, outlineMesh(new THREE.BoxGeometry(5, 0.35, 2.4), 1.01).translateY(0.175)); const lec = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.1, 0.4), toonMat(PAL.other)); lec.position.set(0, 0.35 + 0.55, 0.6); g.add(lec); return g; },
  desk(p) { const g = new THREE.Group(); const mat = toonMat('#ffffff'); const top = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.08, 1.0), mat); top.position.y = 0.95; g.add(top, outlineMesh(new THREE.BoxGeometry(2.2, 0.08, 1.0), 1.01).translateY(0.95)); [[-1, -0.4], [1, -0.4], [-1, 0.4], [1, 0.4]].forEach(([x, z]) => { const l = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.95, 0.07), toonMat(PAL.other)); l.position.set(x, 0.47, z); g.add(l); });
    const mon = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.7, 0.06), toonMat(PAL.other)); mon.position.set(0, 1.45, -0.2); g.add(mon); const c = document.createElement('canvas'); c.width = 440; c.height = 280; const x = c.getContext('2d'); x.fillStyle = '#ffffff'; x.fillRect(0, 0, 440, 280); x.fillStyle = PAL.yellow; [90, 150, 210].forEach((h, i) => x.fillRect(60 + i * 120, 250 - h, 80, h)); x.fillStyle = PAL.text; x.font = '600 28px Montserrat'; x.fillText(p.text || '', 30, 50);
    const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace; const scr = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.62), new THREE.MeshBasicMaterial({ map: tx })); scr.position.set(0, 1.45, -0.165); g.add(scr); const stand = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.15, 0.1), toonMat(PAL.other)); stand.position.set(0, 1.05, -0.2); g.add(stand); return g; },
  timer(p) { // temporizador: anillo gris con arco amarillo que se rellena (p.fillFrom, p.dur) y la cifra en medio
    const g = new THREE.Group(); const r = p.r ?? 0.6; const tube = r * 0.13; const disc = new THREE.Mesh(new THREE.CircleGeometry(r * 1.17, 64), new THREE.MeshBasicMaterial({ color: '#ffffff' })); disc.position.z = -0.02; g.add(disc); const rim = new THREE.Mesh(new THREE.RingGeometry(r * 1.17, r * 1.2, 64), new THREE.MeshBasicMaterial({ color: PAL.outline })); rim.position.z = -0.015; g.add(rim); g.add(new THREE.Mesh(new THREE.TorusGeometry(r, tube * 0.8, 10, 60), new THREE.MeshBasicMaterial({ color: '#e1e1e5' }))); const arc = new THREE.Mesh(new THREE.TorusGeometry(r, tube, 10, 60, 0.01), new THREE.MeshBasicMaterial({ color: PAL.yellow })); arc.rotation.z = Math.PI / 2; g.add(arc);
    const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d'); x.fillStyle = PAL.text; x.font = '900 150px NotoCond'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(p.text ?? '5', 128, 136); const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace; const num = new THREE.Mesh(new THREE.PlaneGeometry(r * 1.45, r * 1.45), new THREE.MeshBasicMaterial({ map: tx, transparent: true })); num.position.z = 0.01; g.add(num);
    g.userData = { billboard: true, size: [2.4 * r, 2.4 * r], timer: { arc, r, tube, p } }; return g; },
  coins(p) { // pila de monedas que crece (p.n, p.each segundos por moneda desde t0)
    const g = new THREE.Group(); const n = p.n ?? 8; for (let i = 0; i < n; i++) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.09, 32), toonMat(PAL.yellow)); c.position.y = 0.045 + i * 0.1; c.visible = false; g.add(c); g.add(outlineMesh(new THREE.CylinderGeometry(0.32, 0.32, 0.09, 32), 1.03).translateY(c.position.y)); } g.userData.coins = p; return g; },
  doors(p) { // fila de puertas con un personaje gris en cada una (el pasillo de la referencia R4)
    const g = new THREE.Group(); const n = p.n ?? 6; for (let i = 0; i < n; i++) { const d = PROPS.door({}); d.position.x = (i - (n - 1) / 2) * 3.4; g.add(d); const a = makeActor({ kind: 'crowd', h: 1.5 }); a.position.set(d.position.x + 0.35, 0, 0.5); a.rotation.y = Math.PI; g.add(a); } return g; },
  door(p) { const g = new THREE.Group(); const mat = toonMat('#ffffff'); const dark = toonMat(PAL.other); const fr = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2.1, 0.12), dark); fr.position.y = 1.05; const hole = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.95, 0.14), mat); hole.position.y = 0.975; const wall = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.4, 0.08), mat); wall.position.set(0, 1.2, -0.03); g.add(wall, fr, hole); g.add(outlineMesh(new THREE.BoxGeometry(3.2, 2.4, 0.08), 1.01).translateY(1.2).translateZ(-0.03)); return g; },
  // --- objetos de la regla 14 (N1): decorados y cosas que cambian con el tiempo ---
  sofa(p) { const g = new THREE.Group(); const w = p.w ?? 2.4; const add = (sx, sy, sz, x, y, z, col = '#ffffff') => { const geo = roundedBox(sx, sy, sz, 0.08); const m = new THREE.Mesh(geo, toonMat(col)); m.position.set(x, y, z); g.add(m); const o = outlineMesh(geo, 1.02); o.position.copy(m.position); g.add(o); };
    add(w - 0.2, 0.42, 0.95, 0, 0.25, 0); add(w - 0.2, 0.75, 0.24, 0, 0.62, -0.38); add(0.26, 0.6, 0.95, -w / 2, 0.36, 0); add(0.26, 0.6, 0.95, w / 2, 0.36, 0); add(w * 0.42, 0.14, 0.7, -w * 0.24, 0.52, 0.06, p.yellow ? PAL.yellow : '#ececee'); return g; },
  wall(p) { const g = new THREE.Group(); const w = p.w ?? 4, h = p.h ?? 2.6; const geo = new THREE.BoxGeometry(w, h, 0.1); const m = new THREE.Mesh(geo, toonMat(p.gray ? '#e4e4e8' : '#ffffff')); m.position.y = h / 2; g.add(m, outlineMesh(geo, 1.006).translateY(h / 2)); return g; },
  wallclock(p) { // reloj de pared; las agujas giran a p.spin = [[t, vueltas por segundo], ...]
    const g = new THREE.Group(); const r = p.r ?? 0.45; const face = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.06, 48), toonMat('#ffffff')); face.rotation.x = Math.PI / 2; g.add(face); const o = outlineMesh(new THREE.CylinderGeometry(r, r, 0.06, 48), 1.06); o.rotation.x = Math.PI / 2; g.add(o);
    for (let i = 0; i < 12; i++) { const tk = new THREE.Mesh(new THREE.BoxGeometry(0.025, i % 3 ? 0.05 : 0.09, 0.01), new THREE.MeshBasicMaterial({ color: PAL.text })); const a = i / 12 * Math.PI * 2; tk.position.set(Math.sin(a) * r * 0.82, Math.cos(a) * r * 0.82, 0.035); tk.rotation.z = -a; g.add(tk); }
    const hand = (len, wd, col) => { const pv = new THREE.Group(); const b = new THREE.Mesh(new THREE.BoxGeometry(wd, len, 0.012), new THREE.MeshBasicMaterial({ color: col })); b.position.y = len / 2 - 0.03; pv.add(b); pv.position.z = 0.045; g.add(pv); return pv; };
    g.userData.clock = { hm: hand(r * 0.6, 0.045, PAL.text), mm: hand(r * 0.85, 0.03, p.red ? PAL.red : PAL.text), p }; return g; },
  battery(p) { const m = billboard(batteryTexture(0, p), p.h ?? 0.45); m.userData.battery = p; m.userData.size = [m.geometry.parameters.width, m.geometry.parameters.height]; return m; },
  receipt(p) { const m = billboard(receiptTexture(p, 0), p.h ?? 1.2); m.userData.receipt = p; m.userData.size = [m.geometry.parameters.width, m.geometry.parameters.height]; return m; },
  papers(p) { // montón de folios; p.left = [[t, cuántos quedan], ...]
    const g = new THREE.Group(); const n = p.n ?? 14; let seed = 3; const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    for (let i = 0; i < n; i++) { const geo = new THREE.BoxGeometry(0.62, 0.035, 0.46); const m = new THREE.Mesh(geo, toonMat(i === n - 1 && p.redTop ? PAL.red : '#ffffff')); m.position.y = 0.02 + i * 0.045; m.rotation.y = (rnd() - 0.5) * 0.35; const o = outlineMesh(geo, 1.04); o.position.copy(m.position); o.rotation.copy(m.rotation); g.add(m, o); }
    g.userData.papers = p; return g; },
  floorring(p) { const m = new THREE.Mesh(new THREE.TorusGeometry(p.r ?? 1.6, p.tube ?? 0.05, 8, 80, Math.PI * 2), new THREE.MeshBasicMaterial({ color: p.yellow ? PAL.yellow : PAL.red })); m.userData.floorring = p; return m; },
  table(p) { const g = new THREE.Group(); const mat = toonMat('#ffffff'); const top = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.05, 32), mat); top.position.y = 1.05; const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.05, 12), mat); leg.position.y = 0.52; const base = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.04, 32), mat); base.position.y = 0.02; g.add(top, leg, base, outlineMesh(new THREE.CylinderGeometry(0.42, 0.42, 0.05, 32), 1.02).translateY(1.05)); return g; },
};

// ---------- rotulación 2D ----------
// Devuelve el rectángulo que ocupa el titular (para que los objetos no lo pisen y para el inspector).
const CAPTION_TOP = 175;
function captionLayout(x, L, fs0, maxW, marginX) { // el cuerpo más grande que quepa: 2 líneas a 142-128 px o 3 líneas a 116-100 px
  for (const [fs, maxRows] of [[fs0, 2], [128, 2], [116, 3], [104, 3], [92, 3]]) { x.font = `500 ${fs}px NotoCondT`; const tokens = L.show.split(' '); const layout = []; let cx = 0, row = 0; for (let i = 0; i < tokens.length; i++) { const w = x.measureText(tokens[i].toUpperCase()).width; if (cx + w > maxW && cx > 0) { row++; cx = 0; } layout.push({ w, row, xoff: cx }); cx += w + fs * 0.26; }
    if (row + 1 <= maxRows || fs === 92) return { tokens, layout, rows: row + 1, fs, lh: Math.round(fs * 1.2) }; } }
function activeLine(t) { const lines = REEL.lines; for (let li = 0; li < lines.length; li++) { const L = lines[li], words = TIMING.words[li]; if (!words || L.hide) continue; const t0 = words[0][0], tEnd = words[words.length - 1][1]; const next = TIMING.words[li + 1]; const hold = next ? Math.min(next[0][0] - 0.05, tEnd + 2.2) : tEnd + 2.5; if (t >= t0 - 0.02 && t <= hold) return { li, L, words, t0, hold }; } return null; }
function captionRect(x, t) { const a = activeLine(t); if (!a) return null; const marginX = 60; x.save(); const { rows, layout, fs, lh } = captionLayout(x, a.L, 142, W - 2 * marginX - 40, marginX); x.restore(); const top = CAPTION_TOP; const wmax = Math.max(...layout.map(l => l.xoff + l.w)); return { x: marginX - 10, y: top - fs, w: wmax + 20, h: (top + (rows - 1) * lh + 30) - (top - fs) }; }
function drawCaptions(x, t, inv) {
  const a = activeLine(t); if (!a) return; const { L, words, hold } = a; const marginX = 60;
  x.save(); x.textBaseline = 'alphabetic';
  const top = CAPTION_TOP; const outP = clamp((t - (hold - 0.25)) / 0.25, 0, 1);
  const { tokens, layout, fs, lh } = captionLayout(x, L, 142, W - 2 * marginX - 40, marginX); x.font = `500 ${fs}px NotoCondT`;
  // 05-11 (Jaime): sin rótulo pequeño arriba a la izquierda; «Te dices:» / «Estás pensando:» van en el titular y los dice la voz.
  const hiW = (L.hi || '').toLowerCase(), negW = (L.neg || '').toLowerCase();
  for (let i = 0; i < tokens.length; i++) {
    const wtime = words[Math.min(i, words.length - 1)][0]; if (t < wtime) break;
    const pop = tw(t, wtime, 0.14, 'back'); const lay = layout[i]; const X = marginX + lay.xoff, Y = top + lay.row * lh;
    const clean = tokens[i].toLowerCase().replace(/[^a-záéíóúüñ0-9]/g, '');
    const isHi = hiW && hiW.split(' ').includes(clean), isNeg = negW && negW.split(' ').includes(clean);
    x.save(); x.globalAlpha = Math.min(1, pop * 1.4) * (1 - outP); x.translate(X + lay.w / 2, Y - outP * 60); x.scale(1 * (0.85 + 0.15 * pop), 1.26 * (0.85 + 0.15 * pop)); x.translate(-(X + lay.w / 2), -Y);
    if (isHi) { const mp = tw(t, wtime + 0.22, 0.28, 'out'); x.fillStyle = PAL.marker; x.fillRect(X - 10, Y - fs * 0.82, (lay.w + 20) * mp, fs * 0.98); }
    if (!inv) { x.save(); x.shadowColor = 'rgba(245,245,245,0.95)'; x.shadowBlur = 22; x.fillStyle = PAL.bg; x.fillText(tokens[i].toUpperCase(), X, Y); x.fillText(tokens[i].toUpperCase(), X, Y); x.restore(); }
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
  renderer = new THREE.WebGLRenderer({ canvas: glCanvas, antialias: true, preserveDrawingBuffer: true, alpha: true }); renderer.setSize(W, H, false); renderer.setPixelRatio(1); renderer.outputColorSpace = THREE.SRGBColorSpace;
  scene = new THREE.Scene(); scene.background = new THREE.Color(PAL.bg); scene.fog = new THREE.Fog(PAL.bg, 34, 70); // sin horizonte visible, como la referencia
  camera = new THREE.PerspectiveCamera(30, W / H, 0.1, 200);
  ambient = new THREE.HemisphereLight('#ffffff', '#c9c9cf', 1.9); scene.add(ambient);
  sun = new THREE.DirectionalLight('#ffffff', 1.25); sun.position.set(-4, 7, 6); scene.add(sun);
  floorLight = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), new THREE.MeshBasicMaterial({ map: gridTexture(false) })); floorLight.rotation.x = -Math.PI / 2; scene.add(floorLight);
  floorDark = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), new THREE.MeshBasicMaterial({ map: gridTexture(true), transparent: true, opacity: 0 })); floorDark.rotation.x = -Math.PI / 2; floorDark.position.y = 0.001; scene.add(floorDark);
  const mains = Object.values(SHOTS.actors).filter(a => a.kind !== 'crowd').map(a => a.at ?? [0, 0]);
  for (const [id, spec] of Object.entries(SHOTS.actors)) {
    if (spec.kind === 'crowd') { const g = new THREE.Group(); const n = spec.n ?? 30, area = spec.area ?? [6, 4]; let seed = 7; const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
      let placed = 0, tries = 0;
      while (placed < n && tries < n * 20) { tries++; const px = (rnd() - 0.5) * area[0] + (spec.at?.[0] ?? 0), pz = (rnd() - 0.5) * area[1] + (spec.at?.[1] ?? -3);
        if (mains.some(m => Math.hypot(m[0] - px, m[1] - pz) < (spec.gap ?? 1.6))) continue; // nunca encima de los protagonistas
        const a = makeActor({ kind: 'crowd', h: 1.4 + rnd() * 0.25 }); a.position.set(px, 0, pz); a.rotation.y = rnd() * 6.28; g.add(a); placed++; }
      (spec.drop || []).forEach(i => { if (g.children[i]) { g.children[i].visible = false; g.children[i].userData.dropped = true; } }); // miembros quitados (cabezas apiladas); se ocultan para no mover a los demás
      g.userData = { spec }; actors[id] = g; scene.add(g); }
    else { const a = makeActor(spec); a.position.set(spec.at?.[0] ?? 0, 0, spec.at?.[1] ?? 0); a.rotation.y = (spec.rot ?? 0) * Math.PI / 180; actors[id] = a; scene.add(a); }
  }
  for (const p of SHOTS.props) { const m = PROPS[p.type](p); if (!m.userData.noPos && p.at) m.position.set(...p.at); if (p.rot) m.rotation.y = p.rot * Math.PI / 180; m.visible = false; m.userData.spec = p; props.push(m); scene.add(m); }
  cv = document.getElementById('cv'); cv.width = W; cv.height = H; ctx = cv.getContext('2d');
}

function actorState(id, t) { // keyframes por actor: SHOTS.moves[id] = [{t, dur, at, rot, head:[yaw,tilt], show, arm, tilt, lean, y, phone, face, hop}]
  const kfs = (SHOTS.moves || {})[id] || []; const spec = SHOTS.actors[id];
  let s = { at: spec.at ?? [0, 0], rot: spec.rot ?? 0, head: [0, 0], show: spec.show !== false, arm: spec.arm ?? 0, tilt: spec.tilt ?? 0, lean: 0, y: spec.y ?? 0, phone: !!spec.phone, face: spec.face ?? 'smile', glow: !!spec.glow, walk: 0, hop: 0 };
  let jump = false;
  for (const k of kfs) {
    if (k.at && k.t > 0 && (k.dur ?? 1) <= 0.05 && t >= k.t - 0.04 && t < k.t + 0.3) jump = true;
    if (k.hop != null && t >= k.t && t < k.t + 0.45) s.hop = Math.sin((t - k.t) / 0.45 * Math.PI) * (k.hop === true ? 0.35 : k.hop);
    if (t < k.t) break;
    const dur = k.dur ?? 1, p = k.t <= 0 ? 1 : tw(t, k.t, dur, k.ease ?? 'inout'); const prev = s;
    s = { ...prev, at: k.at ? lerpV(prev.at, k.at, p) : prev.at, rot: k.rot != null ? lerp(prev.rot, k.rot, p) : prev.rot, head: k.head ? lerpV(prev.head, k.head, p) : prev.head, show: k.show ?? prev.show,
      arm: k.arm != null ? lerp(prev.arm, k.arm, p) : prev.arm, tilt: k.tilt != null ? lerp(prev.tilt, k.tilt, p) : prev.tilt, lean: k.lean != null ? lerp(prev.lean, k.lean, p) : prev.lean, y: k.y != null ? lerp(prev.y, k.y, p) : prev.y,
      phone: k.phone ?? prev.phone, face: k.face ?? prev.face, glow: k.glow ?? prev.glow, walk: 0, hop: prev.hop };
    // andar: si el keyframe mueve al personaje y está a medio camino, rebota y se balancea
    if (k.at && dur > 0.05 && p > 0 && p < 1 && k.walk !== false) { const d = Math.hypot(k.at[0] - prev.at[0], k.at[1] - prev.at[1]); s.walk = (t - k.t) / dur * d / 0.32 * Math.PI; }
    if (k.at && p >= 1) s.at = k.at;
  }
  if (jump) s.show = false; // salto de posición: oculto durante el latigazo, reaparece ya colocado
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
  const bodies = Object.keys(actors).filter(id => actors[id].userData.head && actors[id].visible).map(id => { const a = actors[id]; const pts = [[-0.3, 0, 0.3], [0.3, 0, 0.3], [-0.3, 0, -0.3], [0.3, 0, -0.3], [-0.25, a.userData.h * 1.02, 0], [0.25, a.userData.h * 1.02, 0]].map(([x, y, z]) => toScreen(new THREE.Vector3(x, y, z).applyMatrix4(a.matrixWorld))); const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]); const hr = headRadiusPx(id); return { id, x: Math.min(...xs) - hr * 0.2, y: Math.min(...ys) - hr * 0.3, w: Math.max(...xs) - Math.min(...xs) + hr * 0.4, h: Math.max(...ys) - Math.min(...ys) + hr * 0.3 }; });
  const zoneTop = (capRect ? capRect.y + capRect.h : CAPTION_TOP - 60) + 24, margin = 40;
  for (const m of props) {
    if (!m.visible || !m.userData.billboard || m.userData.bracketOf) continue; const p = m.userData.spec; if (p.over && actors[p.over] && !actors[p.over].visible) { m.visible = false; continue; }
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
  scene.background = hexLerp(PAL.bg, PAL.bgDark, inv); scene.fog.color.copy(scene.background); floorDark.material.opacity = inv; ambient.intensity = lerp(1.9, 1.1, inv);
  const cs = camState(t); placeCamera(cs);
  for (const [id, a] of Object.entries(actors)) { const s = actorState(id, t); a.visible = s.show; if (a.userData.head) { const bob = s.walk ? Math.abs(Math.sin(s.walk)) * 0.07 : 0; a.position.set(s.at[0], s.y + bob + s.hop, s.at[1]); a.rotation.order = 'YXZ'; a.rotation.y = s.rot * Math.PI / 180; a.rotation.x = s.lean * Math.PI / 180; a.rotation.z = (s.tilt + (s.walk ? Math.sin(s.walk) * 4 : 0)) * Math.PI / 180; a.userData.head.rotation.set(s.head[1] * Math.PI / 180, s.head[0] * Math.PI / 180, 0);
      a.children.forEach(c => { if (c.userData.notMask) c.visible = Math.abs(s.tilt) < 30; });
      if (a.userData.arm) { a.userData.arm.rotation.z = s.arm * Math.PI / 180; a.userData.phone.visible = s.phone; }
      if (a.userData.glow) a.userData.glow.forEach(m => { m.visible = s.glow; });
      { const ph = id.length * 1.7; const idle = s.walk ? 0 : 1; a.userData.head.rotation.y += idle * Math.sin(t * 1.1 + ph) * 0.06; a.userData.head.rotation.x += idle * Math.sin(t * 0.8 + ph * 2) * 0.03; a.scale.y = 1 + idle * Math.sin(t * 2.2 + ph) * 0.006; }
      const fc = a.userData.head.userData.faces; if (fc) for (const [n, m] of Object.entries(fc)) m.visible = n === s.face; } if (!a.userData.head && a.visible) a.children.forEach((c, k) => { if (c.userData.baseRot == null) c.userData.baseRot = c.rotation.y; c.rotation.y = c.userData.baseRot + Math.sin(t * 0.7 + k * 1.9) * 0.25; c.position.y = Math.max(0, Math.sin(t * 2.4 + k * 2.3)) * 0.015; }); a.updateMatrixWorld(true); }
  const capRect = captionRect(ctx, t);
  for (const m of props) {
    const p = m.userData.spec; const t0 = p.t0 ?? 0, t1 = p.t1 ?? 1e9;
    const inP = tw(t, t0, p.inDur ?? 0.32, p.inEase ?? 'back'), outP = tw(t, t1, 0.25, 'in'); const sc = Math.max(0.0001, inP * (1 - outP)) * (p.scale ?? 1);
    m.visible = t >= t0 && outP < 1; m.scale.setScalar(sc);
    if (m.userData.ring) { // anillo que se dibuja; con around: 'id' rodea al personaje de cara a la cámara
      const pr = p.draw != null ? tw(t, p.draw, 0.9, 'inout') : 1; const key = pr.toFixed(3); if (m.userData.key !== key) { m.userData.key = key; m.geometry.dispose(); m.geometry = new THREE.TorusGeometry(p.r ?? 0.55, p.tube ?? 0.07, 12, 60, Math.max(0.01, pr) * Math.PI * 2); }
      if (p.around) { const a = actors[p.around]; const base = a.position.clone().add(new THREE.Vector3(0, p.y ?? 0.95, 0)); const toCam = camera.position.clone().sub(base).normalize(); m.position.copy(base.add(toCam.multiplyScalar(p.front ?? 0.75))); }
      m.quaternion.copy(camera.quaternion); m.rotateZ(Math.PI * 0.6); }
    if (m.userData.letters) { const lp = m.userData.letters; let lit = new Set(); (lp.litAt || []).forEach((e, i) => { if (Array.isArray(e)) { if (t >= e[0]) { if (e[2] === 'add') lit.add(e[1]); else lit = new Set([e[1]]); } } else if (t >= e) lit = new Set([i]); }); m.children.forEach(ch => { if (ch.userData.letter != null) ch.material.color.set(lit.has(ch.userData.letter) ? PAL.yellow : '#ffffff'); }); }
    if (m.userData.timer) { const tm = m.userData.timer; const pr = clamp((t - (tm.p.fillFrom ?? t0)) / (tm.p.dur ?? 3), 0, 1); tm.arc.geometry.dispose(); tm.arc.geometry = new THREE.TorusGeometry(tm.r, tm.tube, 10, 60, Math.max(0.01, pr) * Math.PI * 2); }
    if (m.userData.coins) { const cp = m.userData.coins; const k = Math.floor(clamp((t - t0) / (cp.each ?? 0.25), 0, cp.n ?? 8)); m.children.forEach((c, i) => { c.visible = Math.floor(i / 2) < k; }); }
    if (m.userData.bracketOf && m.visible) { const h = headWorld(m.userData.bracketOf); const a = actors[m.userData.bracketOf]; m.position.copy(a.position).add(new THREE.Vector3(0, a.userData.h * 0.55, 0.3)); m.quaternion.copy(camera.quaternion); }
    if (m.userData.bars) { const b = m.userData.bars; if (b.pattern) { m.children.forEach((c, i) => { if (i % 2 === 1) { const v = b.pattern[(i - 1) / 2] ?? 0; c.visible = v > 0; c.material.color.set(v === 2 ? PAL.red : PAL.yellow); } }); } else { const filled = Math.floor(clamp((t - (b.fillFrom ?? t0)) / (b.each ?? 1.2), 0, b.n ?? 5)); m.children.forEach((c, i) => { if (i % 2 === 1) c.visible = (i - 1) / 2 < filled; }); } }
    if (m.userData.clock) { const ck = m.userData.clock; let ang = 0; const sp = ck.p.spin || [[0, 0.02]]; for (let i = 0; i < sp.length; i++) { const a = sp[i][0], b = i + 1 < sp.length ? sp[i + 1][0] : 1e9; if (t > a) ang += (Math.min(t, b) - a) * sp[i][1]; } ck.mm.rotation.z = -ang * Math.PI * 2; ck.hm.rotation.z = -ang * Math.PI * 2 / 12 - 1.2; }
    if (m.userData.battery) { const bp = m.userData.battery; let lv = 0; for (const [ta, la, d] of (bp.levels || [])) { if (t >= ta) lv = lerp(lv, la, tw(t, ta, d ?? 0.8, 'inout')); } const key = lv.toFixed(2); if (m.userData.key !== key) { m.userData.key = key; m.material.map.dispose(); m.material.map = batteryTexture(lv, bp).tx; m.material.needsUpdate = true; } }
    if (m.userData.receipt) { const rp = m.userData.receipt; const k = (rp.checkAt || []).filter(c => t >= c).length; if (m.userData.key !== k) { m.userData.key = k; m.material.map.dispose(); m.material.map = receiptTexture(rp, k).tx; m.material.needsUpdate = true; } }
    if (m.userData.papers) { const pp = m.userData.papers; let n = pp.n ?? 14; for (const [ta, k] of (pp.left || [])) if (t >= ta) n = k; m.children.forEach((c, i) => { c.visible = Math.floor(i / 2) < n; }); }
    if (m.userData.floorring) { const fp = m.userData.floorring; const pr = tw(t, fp.draw ?? t0, 0.8, 'inout'); const key = pr.toFixed(3); if (m.userData.key !== key) { m.userData.key = key; m.geometry.dispose(); m.geometry = new THREE.TorusGeometry(fp.r ?? 1.6, fp.tube ?? 0.05, 8, 80, Math.max(0.01, pr) * Math.PI * 2); } m.rotation.x = -Math.PI / 2; m.position.y = 0.03; }
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
  const whipping = SHOTS.cam.some(k => k.whip && t >= k.t && t < k.t + 0.3);
  lastFrame = { t, whip: whipping, caption: capRect, props: lay.placed.map(q => ({ id: q.id || q.m.userData.spec.type, rect: q.rect, ring: !!q.ring })), heads: lay.heads, bodies: lay.bodies, camDist: cs.dist };
};
// Inspector de píxeles (regla 10): dibuja cada objeto solo (silueta) y todos juntos con un color por objeto (quién queda delante),
// a 270x480. Detecta lo que los rectángulos no ven: una mesa que cruza un cuerpo, una flecha sobre una cara, la multitud
// delante de un protagonista, un objeto cortado por el borde. Un objeto detrás de otro (la multitud detrás del héroe) no es solape.
const MW = 270, MH = 480; let maskRT = null;
function withFlat(objs, colorOf, fn) {
  if (!maskRT) maskRT = new THREE.WebGLRenderTarget(MW, MH);
  const saved = []; scene.traverse(o => { if (o.isMesh) saved.push([o, o.visible, o.material]); });
  scene.traverse(o => { if (o.isMesh) o.visible = false; });
  objs.forEach((root, i) => { const col = colorOf(i); root.traverse(o => { if (o.isMesh && o.userData.notMask !== true) { o.visible = true; o.material = new THREE.MeshBasicMaterial({ color: col, depthTest: o.material.depthTest !== false, transparent: false }); } }); });
  const bg = scene.background; scene.background = new THREE.Color('#000000');
  renderer.setRenderTarget(maskRT); renderer.render(scene, camera); const buf = new Uint8Array(MW * MH * 4); renderer.readRenderTargetPixels(maskRT, 0, 0, MW, MH, buf); renderer.setRenderTarget(null); scene.background = bg;
  for (const [o, v, m] of saved) { o.visible = v; o.material = m; }
  return fn(buf);
}
window.inspectPixels = function (t) {
  window.seek(t); const items = [];
  for (const [id, a] of Object.entries(actors)) if (a.visible) items.push({ obj: a, id: 'actor:' + id, kind: a.userData.head ? 'actor' : 'crowd' });
  for (const m of props) if (m.visible) { const p = m.userData.spec; const kind = p.type === 'cross' ? 'mark' : (m.userData.billboard ? 'billboard' : (m.userData.path ? 'line' : (m.userData.ring ? 'ring' : 'solid'))); items.push({ obj: m, id: 'prop:' + (p.id || p.type), kind, key: !!p.key || ['number', 'letters', 'receipt', 'timer', 'coins'].includes(p.type), age: t - (p.t0 ?? 0), left: (p.t1 ?? 1e9) - t }); }
  // siluetas individuales
  const masks = items.map(it => withFlat([it.obj], () => '#ffffff', buf => { const mask = new Uint8Array(MW * MH); let n = 0; const touch = { l: 0, r: 0, t: 0, b: 0 }; for (let i = 0; i < MW * MH; i++) if (buf[i * 4] > 128) { mask[i] = 1; n++; const x = i % MW, y = MH - 1 - Math.floor(i / MW); if (x === 0) touch.l++; if (x === MW - 1) touch.r++; if (y === 0) touch.t++; if (y === MH - 1) touch.b++; } return { mask, n, touch }; }));
  // quién queda delante: todos a la vez, cada uno con su color (índice en el canal rojo)
  const front = withFlat(items.map(i => i.obj), i => new THREE.Color().setRGB((i + 1) / 255, 0, 0), buf => { const f = new Int16Array(MW * MH); for (let i = 0; i < MW * MH; i++) f[i] = Math.round(buf[i * 4]) - 1; return f; });
  const cap = lastFrame.caption; const capMask = new Uint8Array(MW * MH); if (cap) for (let y = Math.max(0, Math.floor(cap.y / 4)); y < Math.min(MH, (cap.y + cap.h) / 4); y++) for (let x = Math.max(0, Math.floor(cap.x / 4)); x < Math.min(MW, (cap.x + cap.w) / 4); x++) capMask[(MH - 1 - y) * MW + x] = 1; // el buffer del render va de abajo arriba
  const pairs = [];
  for (let i = 0; i < items.length; i++) {
    const A = masks[i]; if (cap) { let c = 0; for (let k = 0; k < MW * MH; k++) if (A.mask[k] && capMask[k]) c++; if (c) pairs.push([items[i].id, 'titular', c, c]); }
    for (let j = i + 1; j < items.length; j++) { const B = masks[j]; let c = 0, aFront = 0, bFront = 0; for (let k = 0; k < MW * MH; k++) if (A.mask[k] && B.mask[k]) { c++; if (front[k] === i) aFront++; else if (front[k] === j) bFront++; } if (c) pairs.push([items[i].id, items[j].id, c, aFront, bFront]); }
  }
  const act = activeLine(t); const objecion = !!(act && (act.L.objecion || act.L.voice));
  // regla 15: textos en escena frente a la voz. Cada texto visible con letras, la frase que suena y si el titular está a la vista.
  const sonando = (() => { let cur = null; REEL.lines.forEach((L, i) => { const w = TIMING.words[i]; if (w && t >= w[0][0] - 0.05 && t <= w[w.length - 1][1] + 0.6) cur = L.say || L.show; }); return cur; })();
  const escena = items.filter(x => x.kind === 'billboard' && (x.age ?? 9) > 0.3 && (x.left ?? 9) > 0.3).map(x => { const p = x.obj.userData.spec; let tx = p.text || ''; if (p.type === 'receipt' && p.labels) tx += ' ' + (p.title ?? 'Semana') + ' ' + (p.rows ?? ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']).join(' '); if (p.type === 'card' && p.label) tx += ' ' + p.label; return { id: x.id, text: tx.trim() }; }).filter(x => /[a-záéíóúñ]/i.test(x.text));
  return { t, whip: lastFrame.whip, objecion, sonando, escena, titular: !!(act && t >= act.t0), textos: items.filter(x => x.kind === 'billboard' && (x.obj.userData.spec.text || '').split(' ').length >= 3).map(x => x.id), items: items.map((it, i) => ({ id: it.id, kind: it.kind, key: !!it.key, px: masks[i].n, touch: masks[i].touch, age: it.age ?? 9, left: it.left ?? 9 })), pairs, caption: !!cap, billboards: items.filter(x => x.kind === 'billboard' && (x.age ?? 9) > 0.3 && (x.left ?? 9) > 0.3).length };
};
// Inspector: qué ocupa cada cosa en el fotograma actual (rectángulos en píxeles) para medir solapes desde fuera.
window.inspect = function (t) { window.seek(t); return lastFrame; };
window.__crowdInView = function (gid, list) { const g = actors[gid]; if (!g || !g.visible) return false; const fr = new THREE.Frustum().setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));
  return list.some(i => { const m = g.children[i]; if (!m) return false; return fr.intersectsBox(new THREE.Box3().setFromObject(m)); }); };
// Cabezas apiladas (05-11, N1 en Blender): una cabeza de la multitud justo detrás de la de un protagonista parece un tótem de dos cabezas.
// Devuelve, para el instante t, cada miembro de multitud cuya cabeza toca en pantalla la de un protagonista y está detrás de él.
window.headStack = function (t) {
  window.seek(t); const out = []; const camPos = camera.position;
  const mains = Object.keys(actors).filter(id => actors[id].userData.head && actors[id].visible && actors[id].userData.spec.kind !== 'crowd');
  for (const [gid, g] of Object.entries(actors)) { if (actors[gid].userData.head || !g.visible) continue;
    g.children.forEach((m, i) => { if (!m.userData.head || !m.visible) return; const c = new THREE.Vector3(); m.userData.head.getWorldPosition(c);
      const [cx, cy] = toScreen(c); const rr = m.userData.h * 0.14; const up = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion).multiplyScalar(rr); const [, cy2] = toScreen(c.clone().add(up)); const cr = Math.abs(cy - cy2);
      for (const id of mains) { const h = headWorld(id); const [hx, hy] = toScreen(h); const hrp = headRadiusPx(id);
        const d = Math.hypot(hx - cx, hy - cy); if (d < (hrp + cr) * 0.95 && c.distanceTo(camPos) > h.distanceTo(camPos)) out.push({ crowd: gid, i, actor: id, d: Math.round(d), r: Math.round(hrp + cr) }); } }); }
  return out;
};
window.__dbg = () => ({ props, camera, actors, scene, renderer, withFlat, MW, MH }); // solo para depurar desde las herramientas
// Eventos de sonido (los sintetiza herramientas/sonido.py): latigazos, entradas de objetos, marcadores de palabra, cortes a oscuro, anillos
window.soundEvents = function () {
  const ev = [];
  for (const k of SHOTS.cam) if (k.whip) ev.push({ t: k.t, kind: 'whip' });
  for (const iv of (SHOTS.invert || [])) { ev.push({ t: iv.t, kind: 'thud' }); ev.push({ t: iv.end, kind: 'cut' }); }
  for (const p of SHOTS.props) { if (p.type === 'ring' || p.type === 'floorring') ev.push({ t: p.draw ?? p.t0 ?? 0, kind: 'swoosh' }); else if (['bubble', 'thought', 'card', 'sticker', 'tag', 'cross', 'bars', 'timer', 'number', 'coins', 'battery', 'receipt', 'papers', 'sofa', 'wallclock'].includes(p.type)) ev.push({ t: p.t0 ?? 0, kind: 'pop' }); }
  REEL.lines.forEach((L, i) => { const words = TIMING.words[i]; if (!words) return; const toks = L.show.split(' '); const key = (L.hi || L.neg || '').toLowerCase().split(' ')[0]; if (!key) return; const idx = toks.findIndex(w => w.toLowerCase().replace(/[^a-záéíóúüñ0-9]/g, '') === key.replace(/[^a-záéíóúüñ0-9]/g, '')); if (idx >= 0 && words[idx]) ev.push({ t: words[idx][0] + 0.22, kind: 'tick' }); });
  return ev.filter(e => e.t >= 0 && e.t < TIMING.duration).sort((a, b) => a.t - b.t);
};
// Variedad (regla 14): decorados distintos (puntos de mira de la cámara a más de 4 unidades entre sí), hueco máximo sin
// nada nuevo (frase, objeto que entra o sale, movimiento de cámara o de personaje, inversión) y encuadre ocupado (fracción
// de píxeles de la zona de acción, y 470-1780, que no son fondo).
window.variety = function () {
  let prev = { ...CAM_PRESETS.medium }; const targets = []; for (const k of SHOTS.cam) { const r = resolveCam(k, prev); targets.push(r.target); prev = r; }
  const sets = []; for (const tg of targets) if (!sets.some(c => Math.hypot(c[0] - tg[0], c[2] - tg[2]) < 4)) sets.push(tg);
  const ev = []; REEL.lines.forEach((L, i) => { const w = TIMING.words[i]; if (w) ev.push(w[0][0]); });
  for (const p of SHOTS.props) { if (p.t0 != null) ev.push(p.t0); if (p.t1 != null) ev.push(p.t1); }
  for (const k of SHOTS.cam) ev.push(k.t); for (const ks of Object.values(SHOTS.moves || {})) for (const k of ks) ev.push(k.t); for (const iv of SHOTS.invert || []) ev.push(iv.t, iv.end);
  const ts = ev.filter(t => t >= 0.4 && t <= TIMING.duration - 1.6).sort((a, b) => a - b); let gap = 0, at = 0; for (let i = 1; i < ts.length; i++) if (ts[i] - ts[i - 1] > gap) { gap = ts[i] - ts[i - 1]; at = ts[i - 1]; }
  return { sets: sets.length, maxGap: +gap.toFixed(2), gapAt: +at.toFixed(2) };
};
window.occupancy = function (t) { window.seek(t); const c = document.createElement('canvas'); c.width = 180; c.height = 320; const x = c.getContext('2d'); x.drawImage(cv, 0, 0, 180, 320); const d = x.getImageData(0, 78, 180, 218).data; const bg = invertAmount(t) > 0.5 ? [0x34, 0x35, 0x3a] : [0xf5, 0xf5, 0xf5]; let n = 0; for (let i = 0; i < d.length; i += 4) if (Math.max(Math.abs(d[i] - bg[0]), Math.abs(d[i + 1] - bg[1]), Math.abs(d[i + 2] - bg[2])) > 14) n++; return n / (d.length / 4); }; // medido a 180x320, como las tiras de la referencia (mediana 16-36 %)

// ---------- puente a Blender ----------
// El motor decide la escena; Blender pinta los objetos sólidos con luz real. Tres capas por fotograma:
// «bg» (fondo y suelo con rejilla, de aquí), «blender» (personajes y objetos, de Blender, con sombras sobre fondo
// transparente) y «fg» (titulares, bocadillos, iconos, flechas, aros y contornos amarillos, de aquí, tapados por los
// objetos sólidos donde toca).
function isOverlayRoot(o) { const u = o.userData || {}; return !!(u.billboard || u.path || u.ring || u.floorring || u.timer || u.bars); }
function classify(mesh) { // 'world' (va a Blender), 'overlay' (capa fg), 'skip'
  let o = mesh; while (o) { if (isOverlayRoot(o)) return 'overlay'; if (o === floorLight || o === floorDark) return 'skip'; o = o.parent; }
  if (mesh.userData.notMask) return 'skip'; // sombras falsas: Blender hace las suyas
  const m = mesh.material; if (m && m.side === THREE.BackSide) return m.color && m.color.getHexString() === PAL.yellow.slice(1).toLowerCase() ? 'overlay' : 'skip'; // glow amarillo / contorno negro (en Blender, Freestyle)
  return 'world';
}
let _worldMeshes = null;
function worldMeshes() { if (_worldMeshes) return _worldMeshes; _worldMeshes = []; scene.traverse(o => { if (o.isMesh && classify(o) === 'world') _worldMeshes.push(o); }); return _worldMeshes; }
function actorKindOf(o) { while (o) { for (const a of Object.values(actors)) if (a === o) return a.userData.spec ? a.userData.spec.kind : 'crowd'; if (o.userData && o.userData.spec && o.userData.spec.kind) return o.userData.spec.kind; o = o.parent; } return null; }
function heroOf(o) { while (o) { for (const [id, a] of Object.entries(actors)) if (a === o && a.userData.spec && a.userData.spec.kind === 'hero') return true; o = o.parent; } return false; }
window.exportScene = function () { // geometrías sin repetir + una entrada por malla del mundo
  const geos = {}, meshes = [];
  for (const m of worldMeshes()) { const g = m.geometry; if (!geos[g.uuid]) geos[g.uuid] = { pos: Array.from(g.attributes.position.array), nor: g.attributes.normal ? Array.from(g.attributes.normal.array) : null, idx: g.index ? Array.from(g.index.array) : null, uv: g.attributes.uv ? Array.from(g.attributes.uv.array) : null };
    const mat = m.material; let map = null; if (mat.map && mat.map.image && mat.map.image.toDataURL) map = mat.map.image.toDataURL('image/png');
    const k = actorKindOf(m); meshes.push({ geo: g.uuid, color: '#' + mat.color.getHexString(), basic: mat.type === 'MeshBasicMaterial', map, opacity: mat.opacity ?? 1, hero: heroOf(m), lines: k === 'hero' || (!k && mat.type !== 'MeshBasicMaterial') }); }
  return { geos, meshes };
};
// por fotograma: cámara (posición, cuaternión, fov), inversión de fondo y, por malla del mundo, visible + matriz 4x4
window.frameState = function (t) { window.seek(t); scene.updateMatrixWorld(true); const cam = [...camera.position.toArray(), ...camera.quaternion.toArray(), camera.fov]; const ms = worldMeshes().map(m => { let v = m.visible; let o = m.parent; while (v && o) { v = o.visible; o = o.parent; } if (v && m.material && m.material.opacity === 0) v = false; return [v ? 1 : 0, ...m.matrixWorld.elements]; }); return { cam, inv: invertAmount(t), ms }; };
// capas «bg» y «fg» (PNG con transparencia para fg)
window.seekLayer = function (t, layer) {
  window.seek(t); const inv = invertAmount(t); const all = []; scene.traverse(o => { if (o.isMesh || o.isLine || o.isPoints) all.push(o); });
  const saved = all.map(o => [o, o.visible]); const bgSaved = scene.background;
  if (layer === 'bg') { all.forEach(o => { if (o !== floorLight && o !== floorDark) o.visible = false; }); renderer.render(scene, camera); ctx.clearRect(0, 0, W, H); ctx.drawImage(glCanvas, 0, 0); }
  else {
    floorLight.visible = floorDark.visible = false; scene.background = null; renderer.setClearColor(0x000000, 0); renderer.autoClear = false; renderer.clear(true, true, true);
    const kind = new Map(all.map(o => [o, classify(o)]));
    // 1) los sólidos solo escriben profundidad (tapan lo que va detrás); 2) lo de la capa fg, en color
    const depthMat = new THREE.MeshBasicMaterial({ colorWrite: false });
    all.forEach(o => { if (kind.get(o) !== 'world') o.visible = false; }); scene.overrideMaterial = depthMat; renderer.render(scene, camera); scene.overrideMaterial = null;
    saved.forEach(([o, v]) => { o.visible = v && kind.get(o) === 'overlay'; }); floorLight.visible = floorDark.visible = false; renderer.render(scene, camera);
    renderer.autoClear = true; renderer.setClearColor(0x000000, 1);
    ctx.clearRect(0, 0, W, H); ctx.drawImage(glCanvas, 0, 0); drawCaptions(ctx, t, inv > 0.5);
  }
  saved.forEach(([o, v]) => { o.visible = v; }); scene.background = bgSaved;
  return cv.toDataURL('image/png');
};
window.DURATION = TIMING.duration;
window.ready = (async () => { await Promise.all([document.fonts.load('900 100px NotoCond'), document.fonts.load('500 100px NotoCondT'), document.fonts.load('400 30px Montserrat'), document.fonts.load('600 30px Montserrat')]); init(); window.seek(0); return true; })();
})();
