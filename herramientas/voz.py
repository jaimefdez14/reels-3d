"""Voz de un reel con Kokoro (previas) y timing.json por palabra.

Uso: /root/kokoro-venv/bin/python herramientas/voz.py reels/ID [--voz em_alex] [--velocidad 1.0]
Genera un WAV por frase (lo que dice `say` o, si no hay, `show`), recorta el silencio de los extremos, iguala el
volumen (RMS -17 dBFS), concatena con la pausa de cada frase (`pause`, 0,55 s por defecto; 0,9 tras el gancho)
y escribe reels/ID/voice/voz.wav + reels/ID/timing.json con el tiempo de cada palabra, repartido dentro de la frase
en proporción a sus letras (Kokoro no da tiempos por palabra). Con ElevenLabs se sustituye por los tiempos reales.
"""
import json, os, re, subprocess, sys
import numpy as np, soundfile as sf

args = sys.argv[1:]; reel_dir = os.path.abspath(args[0])
opt = lambda k, d: args[args.index(k) + 1] if k in args else d
VOICE = opt('--voz', 'em_alex'); SPEED = float(opt('--velocidad', '1.0')); SR = 24000
reel = json.load(open(os.path.join(reel_dir, 'reel.json')))
vdir = os.path.join(reel_dir, 'voice'); os.makedirs(vdir, exist_ok=True)
base = os.environ.get('KOKORO_DIR', os.path.expanduser('~/.cache/hyperframes/tts'))
import kokoro_onnx
model = kokoro_onnx.Kokoro(os.path.join(base, 'models', 'kokoro-v1.0.onnx'), os.path.join(base, 'voices', 'voices-v1.0.bin'))


def trim(x, thr=0.01, pad=0.04):
    idx = np.where(np.abs(x) > thr)[0]
    if len(idx) == 0: return x
    a, b = max(0, idx[0] - int(pad * SR)), min(len(x), idx[-1] + int(pad * SR)); return x[a:b]


def level(x, target_db=-17.0):
    rms = np.sqrt(np.mean(x ** 2)) + 1e-9; g = 10 ** (target_db / 20) / rms; y = x * g
    peak = np.max(np.abs(y)); return y * (0.89 / peak) if peak > 0.89 else y


out = [np.zeros(int(0.5 * SR))]; t = 0.5; words = []
for i, L in enumerate(reel['lines']):
    text = L.get('say') or L['show']
    spoken = re.sub(r'[«»]', '', text)
    samples, sr = model.create(spoken, voice=VOICE, speed=SPEED, lang='es')
    assert sr == SR
    x = level(trim(np.asarray(samples, dtype=np.float32)))
    dur = len(x) / SR
    toks = text.split(); weights = np.array([len(re.sub(r'[^\wáéíóúüñ]', '', w)) + 1.5 for w in toks], float); weights /= weights.sum()
    cur = t; row = []
    for w, frac in zip(toks, weights):
        d = dur * frac; row.append([round(cur, 3), round(cur + d, 3)]); cur += d
    words.append(row); out.append(x); t += dur
    pause = L.get('pause', 0.9 if i == 0 else 0.55)
    out.append(np.zeros(int(pause * SR))); t += pause
    print(f'{i:2d} {dur:5.2f}s  {text}')
out.append(np.zeros(int(1.2 * SR))); t += 1.2
audio = np.concatenate(out)
sf.write(os.path.join(vdir, 'voz.wav'), audio, SR, subtype='PCM_16')
json.dump({'words': words, 'duration': round(t, 2), 'motor': 'kokoro', 'voz': VOICE}, open(os.path.join(reel_dir, 'timing.json'), 'w'))
json.dump({'motor': 'kokoro', 'voz': VOICE, 'velocidad': SPEED}, open(os.path.join(vdir, 'motor.json'), 'w'))
print('voz.wav', round(t, 2), 's; timing.json escrito')
