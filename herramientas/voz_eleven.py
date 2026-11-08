"""Voz final de un reel con ElevenLabs, en UNA sola locución, y timing.json por palabra con los tiempos reales.

Uso: python3 herramientas/voz_eleven.py reels/ID --voz VOICE_ID [--modelo eleven_v3] [--estabilidad 0.5]
                                         [--mantener-tiempos] [--confirmar]
Sin --confirmar solo dice cuántos caracteres costaría (no gasta). Con --confirmar llama a la API una vez y guarda la
respuesta en reels/ID/voice/eleven_raw.json: si algo falla después, se vuelve a ejecutar sin pagar otra vez.
--mantener-tiempos coloca cada frase en el segundo en que empezaba en el timing.json actual (el de la previa con
Kokoro), para que las escenas ya renderizadas sigan valiendo; si una frase no cabe en su hueco, se acelera un poco
(como mucho un 12 %) y, si ni así, se avisa. La clave se lee de ELEVENLABS_API_KEY (secreto del entorno).
"""
import base64, json, os, re, subprocess, sys, tempfile, urllib.request
import numpy as np, soundfile as sf

args = sys.argv[1:]; d = os.path.abspath(args[0])
opt = lambda k, v: args[args.index(k) + 1] if k in args else v
VOZ = opt('--voz', None); MODELO = opt('--modelo', 'eleven_v3'); ESTAB = float(opt('--estabilidad', '0.5')); SR = 24000
reel = json.load(open(os.path.join(d, 'reel.json'))); vdir = os.path.join(d, 'voice'); os.makedirs(vdir, exist_ok=True)
lineas = [re.sub(r'[«»]', '', L.get('say') or L['show']) for L in reel['lines']]
texto = ' '.join(lineas); print('caracteres:', len(texto))
raw = os.path.join(vdir, 'eleven_raw.json')
if os.path.exists(raw):
    R = json.load(open(raw))
    if R.get('texto') != texto or R.get('voz') != VOZ: sys.exit('eleven_raw.json es de otro texto u otra voz: bórralo a mano si de verdad hay que pagar otra vez')
    print('uso la locución ya pagada (eleven_raw.json)')
else:
    if '--confirmar' not in args: sys.exit('sin --confirmar no se gasta nada')
    if not VOZ: sys.exit('falta --voz')
    body = json.dumps({'text': texto, 'model_id': MODELO, 'voice_settings': {'stability': ESTAB}}).encode()
    req = urllib.request.Request(f'https://api.elevenlabs.io/v1/text-to-speech/{VOZ}/with-timestamps?output_format=mp3_44100_128', data=body,
                                 headers={'xi-api-key': os.environ['ELEVENLABS_API_KEY'], 'Content-Type': 'application/json'})
    resp = json.load(urllib.request.urlopen(req, timeout=300))
    R = {'texto': texto, 'voz': VOZ, 'modelo': MODELO, 'estabilidad': ESTAB, 'audio_base64': resp['audio_base64'], 'alignment': resp['alignment']}
    json.dump(R, open(raw, 'w'))
    with open(os.path.join(os.path.dirname(os.path.dirname(d)), 'gasto-voz.jsonl'), 'a') as g:
        g.write(json.dumps({'reel': reel.get('id', os.path.basename(d)), 'caracteres': len(texto), 'modelo': MODELO, 'voz': VOZ}, ensure_ascii=False) + '\n')
    print('pagado y guardado:', len(texto), 'caracteres')

# audio completo a 24 kHz mono
with tempfile.TemporaryDirectory() as tmp:
    mp3 = os.path.join(tmp, 'a.mp3'); wav = os.path.join(tmp, 'a.wav'); open(mp3, 'wb').write(base64.b64decode(R['audio_base64']))
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', mp3, '-ac', '1', '-ar', str(SR), wav], check=True); full, _ = sf.read(wav, dtype='float32')
A = R['alignment']; ch, cs, ce = A['characters'], A['character_start_times_seconds'], A['character_end_times_seconds']
assert ''.join(ch) == texto, 'la alineación no coincide con el texto'


def level(x, target_db=-17.0):
    rms = np.sqrt(np.mean(x ** 2)) + 1e-9; y = x * (10 ** (target_db / 20) / rms); pk = np.max(np.abs(y)); return y * (0.89 / pk) if pk > 0.89 else y


def atempo(x, f):
    with tempfile.TemporaryDirectory() as tmp:
        a, b = os.path.join(tmp, 'a.wav'), os.path.join(tmp, 'b.wav'); sf.write(a, x, SR)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', a, '-filter:a', f'atempo={f:.4f}', b], check=True); y, _ = sf.read(b, dtype='float32'); return y


segs = []; off = 0
for L in lineas:
    a, b = off, off + len(L); off = b + 1
    t0, t1 = cs[a], ce[b - 1]; s0, s1 = max(0, t0 - 0.03), t1 + 0.08
    seg = level(full[int(s0 * SR):int(s1 * SR)])
    words = []; pos = a
    for tok in L.split():
        i = texto.index(tok, pos); j = i + len(tok); pos = j
        words.append([cs[i] - s0, ce[j - 1] - s0])
    segs.append((seg, words))

viejo = json.load(open(os.path.join(d, 'timing.json'))) if '--mantener-tiempos' in args else None
out = []; tl = []; t = 0.5; avisos = []
for i, (seg, words) in enumerate(segs):
    dur = len(seg) / SR
    if viejo:
        start = viejo['words'][i][0][0] - words[0][0]
        nxt = viejo['words'][i + 1][0][0] if i + 1 < len(segs) else viejo['duration'] - 0.6
        hueco = nxt - 0.18 - start
        if dur > hueco:
            f = dur / hueco
            if f > 1.12: avisos.append(f'frase {i}: no cabe ({dur:.2f} s en {hueco:.2f} s); se acelera un 12 % y se pisa la siguiente pausa'); f = 1.12
            seg = atempo(seg, f); words = [[w0 / f, w1 / f] for w0, w1 in words]; dur = len(seg) / SR
        if start < t - 0.05: avisos.append(f'frase {i}: empezaría antes de que acabe la anterior; se retrasa {t - start:.2f} s'); start = t
    else:
        start = t
    if start > t: out.append(np.zeros(int((start - t) * SR), np.float32)); t = start
    out.append(seg.astype(np.float32)); tl.append([[round(t + w0, 3), round(t + w1, 3)] for w0, w1 in words]); t += dur
    if not viejo: pausa = reel['lines'][i].get('pause', 0.9 if i == 0 else 0.55); out.append(np.zeros(int(pausa * SR), np.float32)); t += pausa
total = viejo['duration'] if viejo else t + 1.2
audio = np.concatenate(out); audio = np.concatenate([audio, np.zeros(max(0, int(total * SR) - len(audio)), np.float32)])
sf.write(os.path.join(vdir, 'voz.wav'), audio, SR, subtype='PCM_16')
json.dump({'words': tl, 'duration': round(total, 2), 'motor': 'elevenlabs', 'voz': R['voz']}, open(os.path.join(d, 'timing.json'), 'w'))
json.dump({'motor': 'elevenlabs', 'voz': R['voz'], 'modelo': R['modelo'], 'estabilidad': R['estabilidad'], 'una_toma': True, 'caracteres': len(texto)}, open(os.path.join(vdir, 'motor.json'), 'w'))
for a in avisos: print('AVISO', a)
print('voz.wav', round(total, 2), 's; timing.json escrito')
