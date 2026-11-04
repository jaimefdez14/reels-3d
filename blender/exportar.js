// Exporta un reel para Blender: node blender/exportar.js reels/ID [--fps 30] [--desde s] [--hasta s]
// -> reels/ID/blender/escena.json (geometrías y mallas), estado.bin (por fotograma: inv, cámara 8, mallas 17 floats)
//    y capas bg/f_XXXXX.jpg (fondo y suelo) y fg/f_XXXXX.png (titulares, iconos, flechas, aros; transparente).
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
(async () => {
  const a = process.argv.slice(2); const dir = path.resolve(a[0]); const opt = (k, d) => { const i = a.indexOf(k); return i >= 0 ? +a[i + 1] : d; };
  const FPS = opt('--fps', 30); const out = path.join(dir, 'blender'); for (const d of ['', 'bg', 'fg']) fs.mkdirSync(path.join(out, d), { recursive: true });
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] }); const p = await b.newPage({ viewport: { width: 540, height: 960 } });
  p.on('pageerror', e => console.log('pageerror:', e.message));
  await p.goto('file://' + path.join(dir, 'composition', 'index.html')); await p.evaluate(() => window.ready);
  const D = await p.evaluate(() => window.DURATION); const f0 = Math.round(opt('--desde', 0) * FPS), f1 = Math.min(Math.round(D * FPS), Math.round(opt('--hasta', 1e9) * FPS));
  const esc = await p.evaluate(() => window.exportScene()); esc.fps = FPS; esc.frames = Math.round(D * FPS); esc.duration = D;
  fs.writeFileSync(path.join(out, 'escena.json'), JSON.stringify(esc)); const N = esc.meshes.length; console.log('mallas', N, 'geometrías', Object.keys(esc.geos).length, 'fotogramas', esc.frames);
  const fd = fs.openSync(path.join(out, 'estado.bin'), f0 === 0 ? 'w' : 'r+'); const per = 1 + 8 + 17 * N; const t0 = Date.now();
  for (let f = f0; f < f1; f++) { const t = f / FPS;
    const st = await p.evaluate((t) => window.frameState(t), t); const buf = new Float32Array(per); buf[0] = st.inv; buf.set(st.cam, 1); st.ms.forEach((m, i) => buf.set(m, 9 + i * 17));
    fs.writeSync(fd, Buffer.from(buf.buffer), 0, buf.byteLength, f * per * 4);
    const name = 'f_' + String(f).padStart(5, '0');
    const bg = await p.evaluate((t) => window.seekLayer(t, 'bg'), t); fs.writeFileSync(path.join(out, 'bg', name + '.png'), Buffer.from(bg.split(',')[1], 'base64'));
    const fg = await p.evaluate((t) => window.seekLayer(t, 'fg'), t); fs.writeFileSync(path.join(out, 'fg', name + '.png'), Buffer.from(fg.split(',')[1], 'base64'));
    if (f % (FPS * 5) === 0) console.log((t).toFixed(0) + 's', ((Date.now() - t0) / 1000).toFixed(0) + 's');
  }
  fs.closeSync(fd); await b.close(); console.log('hecho', f0, f1);
})();
