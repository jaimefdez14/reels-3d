"""Voz de un reel con Kokoro (previas) y timing.json por palabra.

Uso: /root/kokoro-venv/bin/python herramientas/voz.py reels/ID [--voz em_alex] [--velocidad 1.0]
Lee cada frase (lo que dice `say` o, si no hay, `show`). Una línea con `"join": true` sigue en la siguiente: el grupo
se lee **en una sola toma**, como una frase hablada entera, y después se parte en titulares (docs/REDACCION.md §6).
Dentro de una toma, el corte entre titulares se ajusta al silencio más cercano (la coma o los dos puntos donde
respira la voz) y cada palabra se reparte en proporción a sus letras, con más peso en las que llevan puntuación
(Kokoro no da tiempos por palabra). Cada toma: recorte de silencio en los extremos, volumen igualado (RMS -17 dBFS);
entre tomas, la pausa de la última línea (`pause`, 0,55 s por defecto; 0,9 tras el gancho).
Escribe reels/ID/voice/voz.wav + reels/ID/timing.json. Con ElevenLabs se sustituye por los tiempos reales.
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


def weight(w):
    k = len(re.sub(r'[^\wáéíóúüñ]', '', w)) + 1.5
    if re.search(r'[.:;?!»]$', w): k += 4.0      # la voz se para tras punto, dos puntos, interrogación
    elif w.endswith(','): k += 2.5
    return k


def gaps(x, frame=0.01, below=25, min_len=0.07):
    """Centros de los silencios internos de una toma (s)."""
    n = int(frame * SR); m = len(x) // n
    if m == 0: return []
    e = 20 * np.log10(np.sqrt(np.mean(x[:m * n].reshape(m, n) ** 2, axis=1)) + 1e-9)
    quiet = e < np.percentile(e, 95) - below  # silencio = 25 dB por debajo del nivel de la voz
    out, a = [], None
    for k, q in enumerate(quiet):
        if q and a is None: a = k
        if (not q or k == m - 1) and a is not None:
            if (k - a) * frame >= min_len and a > 0 and k < m - 1: out.append((a + k) / 2 * frame)
            a = None
    return out


groups, cur = [], []
for i, L in enumerate(reel['lines']):
    cur.append(i)
    if not L.get('join') or i == len(reel['lines']) - 1: groups.append(cur); cur = []

out = [np.zeros(int(0.5 * SR))]; t = 0.5; words = [None] * len(reel['lines'])
for g in groups:
    texts = [reel['lines'][i].get('say') or reel['lines'][i]['show'] for i in g]
    spoken = re.sub(r'[«»“”]', '', ' '.join(texts))
    samples, sr = model.create(spoken, voice=VOICE, speed=SPEED, lang='es')
    assert sr == SR
    x = level(trim(np.asarray(samples, dtype=np.float32)))
    dur = len(x) / SR
    toks = [t_.split() for t_ in texts]
    w = [np.array([weight(z) for z in tk], float) for tk in toks]
    total = sum(a.sum() for a in w)
    # límites entre titulares: estimados por peso y ajustados al silencio más cercano
    bounds, acc = [0.0], 0.0
    sil = gaps(x)
    for a in w[:-1]:
        acc += a.sum(); est = dur * acc / total
        near = [s_ for s_ in sil if abs(s_ - est) < 0.35 and s_ > bounds[-1] + 0.2]
        bounds.append(min(near, key=lambda s_: abs(s_ - est)) if near else est)
    bounds.append(dur)
    for k, i in enumerate(g):
        a, b = bounds[k], bounds[k + 1]; fr = w[k] / w[k].sum(); c = t + a; row = []
        for f in fr:
            d = (b - a) * f; row.append([round(c, 3), round(c + d, 3)]); c += d
        words[i] = row
        print(f'{i:2d} {b - a:5.2f}s  {texts[k]}' + ('   ↘' if k < len(g) - 1 else ''))
    out.append(x); t += dur
    last = g[-1]
    pause = reel['lines'][last].get('pause', 0.9 if g[0] == 0 else 0.55)
    out.append(np.zeros(int(pause * SR))); t += pause
out.append(np.zeros(int(1.2 * SR))); t += 1.2
audio = np.concatenate(out)
sf.write(os.path.join(vdir, 'voz.wav'), audio, SR, subtype='PCM_16')
json.dump({'words': words, 'duration': round(t, 2), 'motor': 'kokoro', 'voz': VOICE}, open(os.path.join(reel_dir, 'timing.json'), 'w'))
json.dump({'motor': 'kokoro', 'voz': VOICE, 'velocidad': SPEED}, open(os.path.join(vdir, 'motor.json'), 'w'))
print('voz.wav', round(t, 2), 's; timing.json escrito')
