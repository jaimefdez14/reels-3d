// Inspector de píxeles (regla 10): node herramientas/inspeccionar_px.js reels/ID [paso=0.5]
// Silueta de cada objeto por separado + render conjunto con un color por objeto (quién queda delante). Avisa de:
// personaje principal, bocadillo, anillo u objeto clave (cifra, letras, recibo, temporizador o `key: true`) cortado por el borde; algo DELANTE de un personaje principal (bocadillo, mesa,
// multitud, flecha sobre la cara); bocadillo tapado por algo; más de 2 bocadillos a la vez; titular tapado; bocadillo ilegible.
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
    const info = Object.fromEntries(f.items.map(i => [i.id, i])); const steady = it => it.age > 0.3 && it.left > 0.3;
    for (const it of f.items) {
      const cut = it.touch.l + it.touch.r + it.touch.b + it.touch.t;
      if (!f.whip && (main(it.id) || (it.kind === 'billboard' || it.kind === 'ring' || it.key) && steady(it)) && cut > 2) add('cut' + it.id, `${it.id}: cortado por el borde (${cut} px de contorno fuera)`);
      if (it.kind === 'billboard' && steady(it) && it.px < 0.004 * PX) add('small' + it.id, `${it.id}: demasiado pequeño para leerse (${it.px} px)`);
    }
    if (f.objecion && f.textos.length) add('obj' + f.textos[0], `${f.textos[0]}: texto en un bocadillo durante la objeción; la frase va solo en el titular (regla 13)`);
    if (f.billboards > 2) add('many' + f.billboards, `${f.billboards} bocadillos/tarjetas a la vez: máximo 2 (claridad)`);
    for (const [A, B, c, aFront, bFront0] of f.pairs) {
      if (B === 'titular') { if (c / PX > 0.0005 && !(f.whip && main(A))) add('cap' + A, `${A} pisa el titular (${c} px)`); continue; }
      const ia = info[A], ib = info[B]; const bFront = bFront0 ?? (c - aFront);
      // qué tapa a qué: X tapa a Y si X queda delante en la zona común
      const check = (X, Y, cx, front) => {
        if (front / PX < 0.0008) return; const kx = X.kind, ky = Y.kind;
        if (!steady(X) && kx !== 'actor' && kx !== 'crowd') return;
        if (main(Y.id) && (kx === 'billboard' || kx === 'solid' || kx === 'crowd' || kx === 'ring' && front / PX > 0.012 || kx === 'line' && front / PX > 0.004 || kx === 'mark')) add('ov' + X.id + Y.id, `${X.id} tapa a ${Y.id} (${front} px)`);
        else if (ky === 'billboard' && steady(Y) && (kx === 'billboard' || kx === 'solid' || kx === 'crowd' || kx === 'mark')) add('ov' + X.id + Y.id, `${X.id} tapa a ${Y.id} (${front} px)`);
        else if (main(X.id) && main(Y.id)) add('ov' + X.id + Y.id, `${X.id} y ${Y.id} se solapan (${front} px)`);
      };
      check(ia, ib, c, aFront); check(ib, ia, c, bFront);
    }
  }
  await b.close();
  if (issues.length) { console.log('AVISOS (píxeles):'); issues.forEach(i => console.log(' ', i)); process.exitCode = 1; } else console.log('ok: sin solapes de píxeles en', D.toFixed(1), 's');
})();
