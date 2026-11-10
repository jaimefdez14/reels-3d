"""Cama musical y efectos de un reel, sintetizados (sin muestras externas).

Uso: python3 herramientas/sonido.py <eventos.json> <duracion_s> <salida.wav>
Escribe dos pistas: <salida.wav> con los efectos y <salida>_cama.wav con la cama. render.js las mezcla bajo la voz:
la cama se agacha mucho cuando habla la voz; los efectos, poco (tienen que oírse: Jaime, 10-11-2026, «faltan efectos
sonoros, es muy muy importante»).
eventos.json: [{"t": 1.2, "kind": "pop"}, ...] (lo exporta el motor con window.soundEvents()).

Efectos: pop (objeto que entra), tick (palabra amarilla), tickc (contador que suma, sube de tono), whip (latigazo /
transición a la moneda), whoosh (algo que vuela), swoosh (anillo, rayos: subida), thud (golpe, temblor), boom (impacto
del gancho), ding (confeti, chispas), coin (moneda), shine (destello, barrido de brillo), fill (algo que se rellena),
cut (corte seco).
"""
import json, sys
import numpy as np, soundfile as sf

SR = 48000
events = json.load(open(sys.argv[1])); dur = float(sys.argv[2]); out_path = sys.argv[3]
N = int(dur * SR); mix = np.zeros(N, np.float32)
rng = np.random.default_rng(7)


def env(n, a, d):  # ataque/caída en segundos
    e = np.ones(n); na, nd = min(n, int(a * SR)), min(n, int(d * SR))
    if na: e[:na] = np.linspace(0, 1, na)
    if nd: e[-nd:] *= np.linspace(1, 0, nd)
    return e


def expdec(n, k): return np.exp(-np.arange(n) / SR * k)


def lowpass(x, fc):
    a = np.exp(-2 * np.pi * fc / SR); y = np.empty_like(x); acc = 0.0
    for i in range(len(x)): acc = a * acc + (1 - a) * x[i]; y[i] = acc
    return y


def highpass(x, fc): return x - lowpass(x, fc)


def band(x, lo, hi): return highpass(lowpass(x, hi), lo)


def sweep(f0, f1, n, curve=1.0):
    f = f0 + (f1 - f0) * np.linspace(0, 1, n) ** curve
    return np.sin(2 * np.pi * np.cumsum(f) / SR)


def noise(n): return rng.standard_normal(n)


def put(sig, t, gain):
    i = int(t * SR)
    if i >= N or i < 0: return
    seg = sig[:N - i]; mix[i:i + len(seg)] += (seg * gain).astype(np.float32)


def S(sec): return int(sec * SR)


# ---------- efectos ----------
def fx_pop():  # burbuja con cuerpo: barrido rápido hacia abajo + clic
    n = S(0.12); s = sweep(1100, 260, n, 0.5) * expdec(n, 38) * env(n, 0.001, 0.02)
    c = band(noise(S(0.008)), 2000, 8000) * 0.5
    s[:len(c)] += c; return s


def fx_tick():  # golpe de madera corto
    n = S(0.05); return (np.sin(2 * np.pi * 1850 * np.arange(n) / SR) + 0.4 * np.sin(2 * np.pi * 3700 * np.arange(n) / SR)) * expdec(n, 90)


def fx_tickc(f):  # contador: blip que sube de tono
    f0 = 900 + 1100 * f; n = S(0.045)
    return (np.sin(2 * np.pi * f0 * np.arange(n) / SR) + 0.3 * np.sin(2 * np.pi * 2 * f0 * np.arange(n) / SR)) * expdec(n, 70)


def fx_whip():  # latigazo: ruido con banda que sube y baja
    n = S(0.32); x = noise(n); lo = band(x, 400, 1500); hi = band(x, 1500, 6000)
    e = np.sin(np.linspace(0, np.pi, n)) ** 2
    return (lo * np.linspace(1, 0.3, n) + hi * np.linspace(0.3, 1, n)) * e


def fx_whoosh():  # algo que cruza volando
    n = S(0.45); x = band(noise(n), 300, 3500); e = np.sin(np.linspace(0, np.pi, n)) ** 1.5
    return x * e


def fx_swoosh():  # subida (anillo, rayos)
    n = S(0.6); x = band(noise(n), 500, 5000) * np.linspace(0.2, 1, n) ** 2 * env(n, 0.0, 0.08)
    return x + 0.25 * sweep(300, 1400, n, 2) * np.linspace(0, 1, n) ** 2 * env(n, 0, 0.08)


def fx_thud():  # golpe grave
    n = S(0.45); tt = np.arange(n) / SR; f = 95 * np.exp(-tt * 9) + 45
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * expdec(n, 9)
    return s + 0.5 * lowpass(noise(n), 400) * expdec(n, 40)


def fx_boom():  # impacto del gancho: golpe grave + cola
    n = S(1.1); tt = np.arange(n) / SR; f = 70 * np.exp(-tt * 5) + 35
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * expdec(n, 4)
    return s + 0.35 * band(noise(n), 80, 2000) * expdec(n, 14)


def fx_ding():  # campanita
    n = S(0.9); tt = np.arange(n) / SR
    s = np.sin(2 * np.pi * 1318 * tt) + 0.6 * np.sin(2 * np.pi * 1976 * tt) + 0.3 * np.sin(2 * np.pi * 2637 * tt) + 0.2 * np.sin(2 * np.pi * 3951 * tt)
    return s * np.exp(-tt * 5) * env(n, 0.002, 0.05)


def fx_coin():  # moneda: parciales metálicos inarmónicos
    n = S(0.5); tt = np.arange(n) / SR
    s = sum(a * np.sin(2 * np.pi * f * tt) * np.exp(-tt * k) for f, a, k in ((2480, 1, 9), (3720, 0.7, 12), (5160, 0.45, 16), (6890, 0.25, 22)))
    return s * env(n, 0.001, 0.03)


def fx_shine():  # brillo: chispas agudas
    n = S(0.6); tt = np.arange(n) / SR; s = np.zeros(n)
    for k, f in enumerate((2637, 3136, 3951, 4699)):
        i = S(0.06 * k); m = n - i; s[i:] += np.sin(2 * np.pi * f * tt[:m]) * np.exp(-tt[:m] * 10)
    return s * 0.5 + 0.15 * band(noise(n), 5000, 12000) * np.sin(np.linspace(0, np.pi, n))


def fx_fill():  # algo que se rellena: barrido que sube
    n = S(0.6); return sweep(250, 1300, n, 1.3) * 0.6 * env(n, 0.05, 0.12) + band(noise(n), 600, 4000) * 0.35 * np.linspace(0, 1, n) * env(n, 0, 0.1)


def fx_cut(): n = S(0.06); return band(noise(n), 1500, 9000) * expdec(n, 60)


FX = {'pop': (fx_pop, 0.42), 'tick': (fx_tick, 0.13), 'whip': (fx_whip, 0.42), 'whoosh': (fx_whoosh, 0.3),
      'swoosh': (fx_swoosh, 0.28), 'thud': (fx_thud, 0.75), 'boom': (fx_boom, 0.8), 'ding': (fx_ding, 0.22),
      'coin': (fx_coin, 0.2), 'shine': (fx_shine, 0.2), 'fill': (fx_fill, 0.22), 'cut': (fx_cut, 0.25)}
CACHE = {}
last = {}
for ev in sorted(events, key=lambda e: e['t']):
    t, k = ev['t'], ev['kind']
    if k == 'tickc':
        if t - last.get(k, -9) < 0.05: continue
        put(fx_tickc(float(ev.get('f') or 0)), t, 0.2); last[k] = t; continue
    if k not in FX: continue
    if t - last.get(k, -9) < (0.09 if k in ('tick', 'pop', 'coin') else 0.18): continue  # sin ametralladora del mismo sonido
    last[k] = t
    fn, g = FX[k]
    if k not in CACHE: CACHE[k] = fn()
    put(CACHE[k], t, g)

peak = np.max(np.abs(mix)) or 1.0
if peak > 0.95: mix *= 0.95 / peak
sf.write(out_path, mix, SR, subtype='PCM_16')

# cama: pad de dos notas graves con respiración lenta y pulso suave a 100 bpm; corte seco al final
tt = np.arange(N) / SR
pad = 0.5 * np.sin(2 * np.pi * 110 * tt) + 0.35 * np.sin(2 * np.pi * 164.8 * tt + 0.3) + 0.25 * np.sin(2 * np.pi * 220 * tt + 1.1)
pad *= 0.85 + 0.15 * np.sin(2 * np.pi * 0.08 * tt)
pad = lowpass(pad, 500)
beat = 0.6; ph = (tt % beat) / beat
kick = np.sin(2 * np.pi * (55 + 60 * np.exp(-ph * beat * 30)) * tt) * np.exp(-ph * beat * 14)
cama = pad * 0.5 + kick * 0.35
cama[:S(0.4)] *= np.linspace(0, 1, S(0.4))
cama[S(dur - 0.12):] = 0  # corte seco
cama *= 0.5 / (np.max(np.abs(cama)) or 1)
sf.write(out_path.replace('.wav', '_cama.wav'), cama.astype(np.float32), SR, subtype='PCM_16')
print('sfx', out_path, len(events), 'eventos', round(dur, 1), 's')
