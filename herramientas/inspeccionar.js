// Inspector de solapes: node herramientas/inspeccionar.js reels/ID [paso=0.25]
// Recorre el reel y avisa si un objeto pisa el titular, otro objeto, la cabeza de un personaje o se sale de la pantalla.
const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const dir = path.resolve(process.argv[2]); const step = +(process.argv[3] || 0.25);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 540, height: 960 } });
  let pageErr = null; p.on('pageerror', e => { pageErr = e.message; console.log('pageerror:', e.message); });
  await p.goto('file://' + path.join(dir, 'composition', 'index.html')); await p.evaluate(() => window.ready); if (pageErr) { console.log('ERROR: la composición falla al cargar, nada que inspeccionar:', pageErr); process.exit(2); }
  const D = await p.evaluate(() => window.DURATION); const issues = []; const seen = new Set(); const stack = {};
  const ov = (a, c, pad = 0) => !(a.x + a.w + pad < c.x || c.x + c.w + pad < a.x || a.y + a.h + pad < c.y || c.y + c.h + pad < a.y);
  for (let t = 0; t < D; t += step) {
    const f = await p.evaluate((t) => window.inspect(t), +t.toFixed(2));
    const add = (k, msg) => { if (!seen.has(k)) { seen.add(k); issues.push(`${t.toFixed(2)}s  ${msg}`); } };
    for (const q of f.props) {
      const r = q.rect;
      if (r.x < 0 || r.y < 0 || r.x + r.w > 1080 || r.y + r.h > 1920) add('off' + q.id, `${q.id}: se sale de la pantalla (${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.w)}x${Math.round(r.h)})`);
      if (f.caption && ov(r, f.caption)) add('cap' + q.id, `${q.id}: pisa el titular`);
      if (q.ring) continue; // el anillo rodea a propósito al personaje; solo se comprueba que quepa y no pise el titular
      for (const o of f.props) if (o !== q && !o.ring && o.id < q.id && ov(r, o.rect)) add('pp' + q.id + o.id, `${q.id} pisa a ${o.id}`);
      for (const h of f.heads) if (ov(r, h)) add('hd' + q.id + h.id, `${q.id}: pisa la cabeza de ${h.id}`);
    }
    for (const h of f.heads) if (f.caption && ov(h, f.caption)) add('hc' + h.id, `la cabeza de ${h.id} entra en el titular`);
    // regla 9 (Jaime, 04-11): ningún personaje principal se corta, en ningún plano ni durante un latigazo
    for (const b of (f.bodies || [])) { const r = b.rect || b; if (r.x < 0 || r.x + r.w > 1080 || r.y + r.h > 1550) add('cut' + b.id, `${b.id}: el cuerpo se sale del encuadre (${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.w)}x${Math.round(r.h)})`); if (r.y < 0) add('cutH' + b.id, `${b.id}: la cabeza se sale por arriba`); }
    // cabezas apiladas (05-11): alguna cabeza de la multitud casi concéntrica detrás de la del protagonista durante ≥ 0,3 s seguidos (aunque sea de varios miembros al cruzar)
    { const hs = (await p.evaluate((t) => window.headStack ? window.headStack(t) : [], +t.toFixed(2))).filter(s => s.d <= s.r * 0.9);
      for (const s of hs) { const st = stack[s.actor]; if (st && t - st.last <= step + 0.01) { st.last = t; st.who.add(s.crowd + '#' + s.i); } else stack[s.actor] = { first: t, last: t, who: new Set([s.crowd + '#' + s.i]) };
        const q = stack[s.actor]; if (t - q.first >= 0.3 - 1e-6) add('stk' + s.actor + q.first, `cabezas apiladas detrás de ${s.actor} desde ${q.first.toFixed(2)} s (${[...q.who].join(', ')})`); } }
    if (f.caption && f.caption.y + f.caption.h > 680) add('capH', `titular demasiado alto: baja hasta ${Math.round(f.caption.y + f.caption.h)} px`);
    // zonas seguras de Instagram (08-11, Jaime): nada de texto por encima de y 250 ni personajes por debajo de y 1550
    if (f.caption && f.caption.y < 250) add('safeT', `el titular entra en la zona tapada de arriba (empieza en y ${Math.round(f.caption.y)}; mínimo 250)`);
    for (const q of f.props) if (q.rect.y < 250 && q.rect.y + q.rect.h > 0) add('safeP' + q.id, `${q.id}: entra en la zona tapada de arriba (y ${Math.round(q.rect.y)})`);
  }
  // regla 14 (Jaime, 04-11): variedad como la referencia. Solo se exige a los reels hechos desde la regla (storyboard.md).
  if (require('fs').existsSync(path.join(dir, 'storyboard.md'))) {
    const v = await p.evaluate(() => window.variety()); const occ = [];
    for (let t = 0.6; t < D - 0.5; t += 1) occ.push([t, await p.evaluate((t) => window.occupancy(t), +t.toFixed(2))]);
    const low = occ.filter(([, o]) => o < 0.07); const med = occ.map(o => o[1]).sort((a, c) => a - c)[Math.floor(occ.length / 2)];
    console.log(`variedad: ${v.sets} decorados, hueco máximo sin cambio ${v.maxGap} s (en ${v.gapAt} s), encuadre ocupado mediana ${(med * 100).toFixed(0)} %`);
    if (v.sets < 5) issues.push(`regla 14: solo ${v.sets} decorados (mínimo 5)`);
    if (v.maxGap > 2) issues.push(`regla 14: ${v.maxGap} s sin nada nuevo desde ${v.gapAt} s (máximo 2)`);
    if (med < 0.15) issues.push(`regla 14: encuadre ocupado, mediana ${(med * 100).toFixed(0)} % (la referencia, 16-36 %)`);
    for (const [t, o] of low) issues.push(`${t.toFixed(1)}s  regla 14: encuadre casi vacío (${(o * 100).toFixed(1)} % ocupado)`);
  }
  await b.close();
  if (issues.length) { console.log('AVISOS:'); issues.forEach(i => console.log(' ', i)); process.exitCode = 1; } else console.log('ok: sin solapes en', D.toFixed(1), 's');
})();
