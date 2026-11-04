// Export exact canvas frames at given times: node frames.js <index.html> <outDir> t1 t2 ...
const { chromium } = require('playwright'); const fs = require('fs');
(async () => {
  const [,, page, out, ...ts] = process.argv; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}); const p = await b.newPage({ viewport: { width: 540, height: 960 } });
  p.on('pageerror', e => console.log('pageerror:', e.message));
  await p.goto('file://' + page); await p.evaluate(() => window.ready);
  for (const t of ts) {
    const r = await p.evaluate((t) => { const a = performance.now(); window.seek(+t); return [performance.now() - a, document.getElementById('cv').toDataURL('image/png').split(',')[1]]; }, t);
    fs.writeFileSync(`${out}/f_${t}.png`, Buffer.from(r[1], 'base64')); console.log(t, Math.round(r[0]) + 'ms');
  }
  await b.close();
})();
