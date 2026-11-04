// Inspector de píxeles (regla 10): node herramientas/inspeccionar_px.js reels/ID [paso=0.5]
// Dibuja cada objeto por separado y mide los píxeles que comparte con los demás y con el titular, y si toca el borde.
// Avisa de: objeto o personaje principal cortado por el borde; bocadillo/tarjeta/pegatina sobre un personaje o sobre otro
// objeto; mesa, anillo o cifra sobre un personaje principal; flecha o línea sobre la cara; multitud sobre un personaje
// principal; más de 2 bocadillos a la vez (claridad); titular tapado por algo.
const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const dir = path.resolve(process.argv[2]); const step = +(process.argv[3] || 0.5); const PX = 270 * 480;
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 540, height: 960 } });
  let pageErr = null; p.on('pageerror', e => { pageErr = e.message; console.log('pageerror:', e.message); });
  await p.goto('file://' + path.join(dir, 'composition', 'index.html')); await p.evaluate(() => window.ready);
  if (pageErr) { console.log('ERROR: la composición falla al cargar:', pageErr); process.exit(2); }
  const D = await p.evaluate(() => window.DURATION); const issues = []; const seen = new Set();
  const main = id => id.startsWith('actor:') && !id.includes('gente') && !id.includes('publico');
  for (let t = 0; t < D; t += step) {
    const f = await p.evaluate((t) => window.inspectPixels(t), +t.toFixed(2));
    const add = (k, msg) => { if (!seen.has(k)) { seen.add(k); issues.push(`${t.toFixed(1)}s  ${msg}`); } };
    const kind = Object.fromEntries(f.items.map(i => [i.id, i.kind]));
    for (const it of f.items) {
      const cut = it.touch.l + it.touch.r + it.touch.b + it.touch.t;
      if ((main(it.id) || it.kind === 'billboard' || it.kind === 'ring') && cut > 2) add('cut' + it.id, `${it.id}: cortado por el borde (${cut} px de contorno fuera)`);
      if (it.kind === 'billboard' && it.age > 0.4 && it.px < 0.004 * PX) add('small' + it.id, `${it.id}: demasiado pequeño para leerse (${it.px} px)`);
    }
    if (f.billboards > 2) add('many' + f.billboards, `${f.billboards} bocadillos/tarjetas a la vez: máximo 2 (claridad)`);
    for (const [A, B, c] of f.pairs) {
      const share = c / PX; const ka = kind[A], kb = kind[B];
      if (B === 'titular') { if (share > 0.0005) add('cap' + A, `${A} pisa el titular (${c} px)`); continue; }
      const anyMain = main(A) || main(B); const anyBill = ka === 'billboard' || kb === 'billboard';
      if (anyBill && (anyMain || ka === 'billboard' && kb === 'billboard' || ka === 'solid' || kb === 'solid') && share > 0.0008) add('ov' + A + B, `${A} tapa a ${B} (${c} px)`);
      else if ((ka === 'solid' && main(B) || kb === 'solid' && main(A)) && share > 0.0015) add('ov' + A + B, `${A} se cruza con ${B} (${c} px)`);
      else if ((ka === 'line' || kb === 'line') && anyMain && share > 0.004) add('ov' + A + B, `${A} pasa por encima de ${B} (${c} px)`);
      else if ((ka === 'crowd' && main(B) || kb === 'crowd' && main(A)) && share > 0.003) add('ov' + A + B, `la multitud tapa a ${main(A) ? A : B} (${c} px)`);
      else if (main(A) && main(B) && share > 0.002) add('ov' + A + B, `${A} y ${B} se solapan (${c} px)`);
    }
  }
  await b.close();
  if (issues.length) { console.log('AVISOS (píxeles):'); issues.forEach(i => console.log(' ', i)); process.exitCode = 1; } else console.log('ok: sin solapes de píxeles en', D.toFixed(1), 's');
})();
