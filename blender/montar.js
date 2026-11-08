// Monta el vídeo final con Blender: node blender/montar.js reels/ID [--hasta s] [--nombre sufijo]
// capas bg (suelo) + r (objetos de Blender, escalados a 1080x1920) + fg (titulares, iconos) -> vídeo, y la misma
// mezcla de sonido que motor/render.js (voz, efectos y cama con sidechain, -14 LUFS). Sale reels/ID/out/ID-blender.mp4
const { chromium } = require('playwright'); const { execFileSync } = require('child_process'); const fs = require('fs'); const path = require('path');
(async () => {
  const a = process.argv.slice(2); const dir = path.resolve(a[0]); const opt = (k, d) => { const i = a.indexOf(k); return i >= 0 ? a[i + 1] : d; };
  const reel = JSON.parse(fs.readFileSync(path.join(dir, 'reel.json'))); const B = path.join(dir, 'blender'); const esc = JSON.parse(fs.readFileSync(path.join(B, 'escena.json')));
  const FPS = esc.fps; let n = 0; while (fs.existsSync(path.join(B, 'r', 'f_' + String(n).padStart(5, '0') + '.png'))) n++;
  const hasta = opt('--hasta', null); if (hasta) n = Math.min(n, Math.round(+hasta * FPS)); const D = n / FPS; if (!n) { console.log('no hay fotogramas de Blender'); process.exit(1); }
  const out = path.join(dir, 'out'); fs.mkdirSync(out, { recursive: true }); const silent = path.join(out, 'blender-video.mp4');
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', String(FPS), '-i', path.join(B, 'bg', 'f_%05d.png'), '-framerate', String(FPS), '-i', path.join(B, 'r', 'f_%05d.png'), '-framerate', String(FPS), '-i', path.join(B, 'fg', 'f_%05d.png'),
    '-filter_complex', '[1]scale=1080:1920:flags=lanczos[r];[0][r]overlay[a];[a][2]overlay,format=yuv420p[v]', '-map', '[v]', '-frames:v', String(n), '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', silent]);
  const b = await chromium.launch(); const p = await b.newPage(); await p.goto('file://' + path.join(dir, 'composition', 'index.html')); await p.evaluate(() => window.ready); const ev = (await p.evaluate(() => window.soundEvents())).filter(e => e.t < D); await b.close();
  const evf = path.join(out, 'eventos.json'), sfx = path.join(out, 'sfx.wav'); fs.writeFileSync(evf, JSON.stringify(ev)); execFileSync('python3', [path.join(__dirname, '..', 'herramientas', 'sonido.py'), evf, String(D), sfx], { stdio: 'inherit' });
  const voz = path.join(dir, 'voice', 'voz.wav'); const dest = path.join(out, reel.id + '-blender' + (opt('--nombre', '') ? '-' + opt('--nombre', '') : '') + '.mp4');
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', silent, '-i', voz, '-i', sfx, '-filter_complex', '[1:a]aresample=48000,pan=stereo|c0=c0|c1=c0,highpass=f=70,acompressor=threshold=0.1:ratio=3:attack=5:release=120:makeup=2,asplit=2[v][sc];[2:a]aresample=48000,pan=stereo|c0=c0|c1=c0,volume=0.9[s0];[s0][sc]sidechaincompress=threshold=0.03:ratio=5:attack=15:release=300[s];[v][s]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.9,loudnorm=I=-14:TP=-1.5:LRA=11[a]', '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', dest]);
  fs.unlinkSync(silent);
  if (reel.recorte) { // [desde, hasta] en segundos: quita el silencio del principio y del final (gancho en el fotograma 0 y final en bucle)
    const [r0, r1] = reel.recorte; const tmp = dest.replace(/\.mp4$/, '-tmp.mp4'); fs.renameSync(dest, tmp);
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', String(r0), '-to', String(r1), '-i', tmp, '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-c:a', 'aac', '-b:a', '192k', dest]); fs.unlinkSync(tmp);
    console.log('recorte', r0, '→', r1);
  }
  console.log('hecho', dest, D.toFixed(1) + ' s');
})();
