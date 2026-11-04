"""Cama musical y efectos de un reel, sintetizados (sin muestras externas), como en la referencia:
pad grave continuo muy bajo, «pop» al entrar un objeto, «tick» al marcarse una palabra, «whoosh» en cada latigazo de cámara,
«thud» al corte a oscuro, «swoosh» al dibujarse un anillo, y la música se corta en seco al final.

Uso: python3 herramientas/sonido.py <eventos.json> <duracion_s> <salida.wav>
eventos.json: [{"t": 1.2, "kind": "pop"}, ...] (lo exporta el motor con window.soundEvents()).
"""
import json, sys
import numpy as np, soundfile as sf

SR = 48000
events = json.load(open(sys.argv[1])); dur = float(sys.argv[2]); out_path = sys.argv[3]
N = int(dur * SR); mix = np.zeros(N, np.float32)
rng = np.random.default_rng(7)


def env(n, a, d):  # ataque/caída en segundos
    e = np.ones(n); na, nd = int(a * SR), int(d * SR)
    if na: e[:na] = np.linspace(0, 1, na)
    if nd: e[-nd:] *= np.linspace(1, 0, nd)
    return e


def lowpass(x, fc):
    a = np.exp(-2 * np.pi * fc / SR); y = np.zeros_like(x); acc = 0.0
    for i in range(len(x)): acc = a * acc + (1 - a) * x[i]; y[i] = acc
    return y


def highpass(x, fc): return x - lowpass(x, fc)


def put(sig, t, gain):
    i = int(t * SR)
    if i >= N: return
    seg = sig[:N - i]; mix[i:i + len(seg)] += (seg * gain).astype(np.float32)


# cama: pad de dos notas graves con respiración lenta, muy bajo (-30 dBFS aprox.), corte seco al final
tt = np.arange(N) / SR
pad = 0.5 * np.sin(2 * np.pi * 110 * tt) + 0.35 * np.sin(2 * np.pi * 164.8 * tt + 0.3) + 0.25 * np.sin(2 * np.pi * 220 * tt + 1.1)
pad *= 0.85 + 0.15 * np.sin(2 * np.pi * 0.08 * tt)
pad = lowpass(pad, 500)
pad[:int(0.4 * SR)] *= np.linspace(0, 1, int(0.4 * SR))
pad[int((dur - 0.12) * SR):] = 0  # corte seco
mix += (pad * 0.045).astype(np.float32)

for ev in events:
    t, k = ev['t'], ev['kind']
    if k == 'pop':
        n = int(0.09 * SR); f = np.linspace(620, 340, n); s = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.002, 0.07); put(s, t, 0.22)
    elif k == 'tick':
        n = int(0.025 * SR); s = highpass(rng.standard_normal(n), 2500) * env(n, 0.001, 0.02); put(s, t, 0.12)
    elif k == 'whip':
        n = int(0.26 * SR); s = highpass(lowpass(rng.standard_normal(n), 4000), 600) * env(n, 0.03, 0.18); put(s, t, 0.16)
    elif k == 'swoosh':
        n = int(0.5 * SR); s = highpass(lowpass(rng.standard_normal(n), 2500), 300) * env(n, 0.25, 0.2); put(s, t, 0.1)
    elif k == 'thud':
        n = int(0.3 * SR); s = np.sin(2 * np.pi * 68 * np.arange(n) / SR) * env(n, 0.003, 0.25) + 0.3 * lowpass(rng.standard_normal(n), 300) * env(n, 0.002, 0.08); put(s, t, 0.35)
    elif k == 'cut':
        n = int(0.05 * SR); s = highpass(rng.standard_normal(n), 1500) * env(n, 0.001, 0.04); put(s, t, 0.1)

peak = np.max(np.abs(mix)) or 1.0
if peak > 0.8: mix *= 0.8 / peak
sf.write(out_path, mix, SR, subtype='PCM_16')
print('sfx', out_path, len(events), 'eventos', round(dur, 1), 's')
