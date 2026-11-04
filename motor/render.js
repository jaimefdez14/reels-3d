// Render de un reel: fotogramas con window.seek -> ffmpeg; mezcla la voz (voice/voz.wav) si existe, si no, silencio.
// node motor/render.js reels/<ID> [--fps 30] [--hasta 20]   ->  reels/<ID>/out/<ID>.mp4 (1080x1920, H.264 + AAC) y portada.jpg
const { chromium } = require('playwright'); const { spawn, execFileSync } = require('child_process'); const fs = require('fs'); const path = require('path');
(async () => {
  const args = process.argv.slice(2); const dir = path.resolve(args[0]); const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? +args[i + 1] : d; };
  const FPS = opt('--fps', 30); const out = path.join(dir, 'out'); fs.mkdirSync(out, { recursive: true });
  const reel = JSON.parse(fs.readFileSync(path.join(dir, 'reel.json'))), id = reel.id;
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] }); const p = await b.newPage({ viewport: { width: 540, height: 960 } });
  p.on('pageerror', e => console.log('pageerror:', e.message)); p.on('console', m => { if (m.type() === 'error') console.log('console:', m.text()); });
  await p.goto('file://' + path.join(dir, 'composition', 'index.html')); await p.evaluate(() => window.ready);
  const D = Math.min(await p.evaluate(() => window.DURATION), opt('--hasta', 1e9)), N = Math.round(D * FPS);
  const silent = path.join(out, 'video.mp4'); const t0 = Date.now();
  const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p', silent], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = 0; i < N; i++) {
    const data = await p.evaluate((t) => { window.seek(t); return document.getElementById('cv').toDataURL('image/jpeg', 0.94).split(',')[1]; }, i / FPS);
    if (!ff.stdin.write(Buffer.from(data, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    if (i % (FPS * 5) === 0) console.log(`${(i / FPS).toFixed(0)}s / ${D.toFixed(0)}s  (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r));
  const cover = await p.evaluate((t) => { window.seek(t); return document.getElementById('cv').toDataURL('image/jpeg', 0.95).split(',')[1]; }, reel.coverT || 1.5);
  fs.writeFileSync(path.join(out, 'portada.jpg'), Buffer.from(cover, 'base64'));
  await b.close();
  // efectos y cama (herramientas/sonido.py) a partir de los eventos de la escena
  const sfx = path.join(out, 'sfx.wav');
  try { const ev = await (async () => { const b2 = await chromium.launch(); const p2 = await b2.newPage(); await p2.goto('file://' + path.join(dir, 'composition', 'index.html')); await p2.evaluate(() => window.ready); const e = await p2.evaluate(() => window.soundEvents()); await b2.close(); return e; })();
    fs.writeFileSync(path.join(out, 'eventos.json'), JSON.stringify(ev)); execFileSync('python3', [path.join(__dirname, '..', 'herramientas', 'sonido.py'), path.join(out, 'eventos.json'), String(D), sfx], { stdio: 'inherit' }); } catch (e) { console.log('sin sonido:', e.message); }
  const voz = path.join(dir, 'voice', 'voz.wav');
  const hasSfx = fs.existsSync(sfx);
  if (fs.existsSync(voz) && hasSfx) // voz delante (compresor), efectos y cama bajo la voz (sidechain), limitador y -14 LUFS
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', silent, '-i', voz, '-i', sfx, '-filter_complex', '[1:a]aresample=48000,pan=stereo|c0=c0|c1=c0,highpass=f=70,acompressor=threshold=0.1:ratio=3:attack=5:release=120:makeup=2,asplit=2[v][sc];[2:a]aresample=48000,pan=stereo|c0=c0|c1=c0,volume=0.9[s0];[s0][sc]sidechaincompress=threshold=0.03:ratio=5:attack=15:release=300[s];[v][s]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.9,loudnorm=I=-14:TP=-1.5:LRA=11[a]', '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', path.join(out, id + '.mp4')]);
  else if (fs.existsSync(voz)) execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', silent, '-i', voz, '-filter_complex', '[1:a]aresample=48000,pan=stereo|c0=c0|c1=c0,highpass=f=70,acompressor=threshold=0.1:ratio=3:attack=5:release=120:makeup=2,alimiter=limit=0.9,loudnorm=I=-14:TP=-1.5:LRA=11[a]', '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', path.join(out, id + '.mp4')]);
  else if (hasSfx) execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', silent, '-i', sfx, '-filter_complex', '[1:a]aresample=48000,pan=stereo|c0=c0|c1=c0,alimiter=limit=0.9[a]', '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart', path.join(out, id + '.mp4')]);
  else execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', silent, '-f', 'lavfi', '-i', 'anullsrc=r=48000:cl=stereo', '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-shortest', '-movflags', '+faststart', path.join(out, id + '.mp4')]);
  fs.unlinkSync(silent); console.log('done', id, D.toFixed(1) + 's', fs.existsSync(voz) ? 'con voz' : 'sin voz');
})();
