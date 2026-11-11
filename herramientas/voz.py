"""Voz de un reel con Kokoro (previas) y timing.json por palabra.

Uso: /root/kokoro-venv/bin/python herramientas/voz.py reels/ID [--voz em_alex] [--velocidad 1.0]
     /root/kokoro-venv/bin/python herramientas/voz.py reels/ID --eleven VOICE_ID [--velocidad 1.0]   (de pago: regla 4)
Con --eleven, la toma sale de ElevenLabs (eleven_multilingual_v2, endpoint with-timestamps) y los tiempos por palabra
son los reales de la alineación por caracteres; la clave es el secreto ELEVENLABS_API_KEY. Antes de lanzarlo, decir a
Jaime los caracteres (los imprime --contar) y tener su OK.
Lee cada frase (lo que dice `say` o, si no hay, `show`). Una línea con `"join": true` sigue en la siguiente: el grupo
se lee **en una sola toma**, como una frase hablada entera, y después se parte en titulares (docs/REDACCION.md §6).
Dentro de una toma, el corte entre titulares se ajusta al silencio más cercano (la coma o los dos puntos donde
respira la voz) y cada palabra se reparte en proporción a sus letras, con más peso en las que llevan puntuación
(Kokoro no da tiempos por palabra). Cada toma: recorte de silencio en los extremos, volumen igualado (RMS -17 dBFS);
entre tomas, la pausa de la última línea (`pause`, 0,55 s por defecto; 0,9 tras el gancho).
Escribe reels/ID/voice/voz.wav + reels/ID/timing.json. Con ElevenLabs se sustituye por los tiempos reales.
"""
import hashlib, json, os, re, subprocess, sys
import numpy as np, soundfile as sf

args = sys.argv[1:]; reel_dir = os.path.abspath(args[0])
opt = lambda k, d: args[args.index(k) + 1] if k in args else d
ELEVEN = opt('--eleven', None); CONTAR = '--contar' in args
VOICE = ELEVEN or opt('--voz', 'em_alex'); SPEED = float(opt('--velocidad', '1.0')); SR = 24000
reel = json.load(open(os.path.join(reel_dir, 'reel.json')))
vdir = os.path.join(reel_dir, 'voice'); os.makedirs(vdir, exist_ok=True)
base = os.environ.get('KOKORO_DIR', os.path.expanduser('~/.cache/hyperframes/tts'))
model = None
if not ELEVEN and not CONTAR:
    import kokoro_onnx
    model = kokoro_onnx.Kokoro(os.path.join(base, 'models', 'kokoro-v1.0.onnx'), os.path.join(base, 'voices', 'voices-v1.0.bin'))


def eleven(text):
    """Una toma con ElevenLabs: (muestras float32 a 24 kHz, [(inicio, fin) por palabra de text.split()]). Con caché."""
    f = os.path.join(TOMAS, clave(text))
    if os.path.exists(f + '.wav'):
        x, _ = sf.read(f + '.wav', dtype='float32'); return x, [tuple(z) for z in json.load(open(f + '.json'))]
    x, spans = eleven_api(text)
    sf.write(f + '.wav', x, SR, subtype='PCM_16'); json.dump(spans, open(f + '.json', 'w'))
    print('  (de pago)', len(text), 'caracteres')
    return x, spans


def eleven_api(text):
    import base64, urllib.request
    body = json.dumps({'text': text, 'model_id': 'eleven_multilingual_v2',
                       'voice_settings': {'stability': 0.5, 'similarity_boost': 0.75, 'style': 0.0, 'use_speaker_boost': True,
                                          'speed': SPEED}}).encode()
    req = urllib.request.Request(f'https://api.elevenlabs.io/v1/text-to-speech/{ELEVEN}/with-timestamps?output_format=pcm_24000',
                                 data=body, headers={'xi-api-key': os.environ['ELEVENLABS_API_KEY'], 'Content-Type': 'application/json'})
    d = json.load(urllib.request.urlopen(req, timeout=180))
    x = np.frombuffer(base64.b64decode(d['audio_base64']), dtype='<i2').astype(np.float32) / 32768
    al = d.get('normalized_alignment') if d.get('alignment') is None else d['alignment']
    ch, st, en = al['characters'], al['character_start_times_seconds'], al['character_end_times_seconds']
    joined = ''.join(ch); spans, pos = [], 0
    for wd in text.split():
        k = joined.find(wd, pos)
        if k < 0: k = pos  # no debería pasar; se queda pegada a la anterior
        e = min(k + len(wd), len(st)) - 1
        spans.append((st[min(k, len(st) - 1)], en[max(e, 0)])); pos = k + len(wd)
    return x, spans


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


# Trozos de voz. Estilo B: « / » separa subtítulos dentro de la misma toma, «*amarillo*» marca color y « // » separa
# subtítulos metiendo una pausa media (`pausa_media`, 0,55 s). Ambos estilos: `"join": true` une la línea con la siguiente
# en una sola toma (docs/REDACCION.md §6). Cada toma se lee entera y sus cortes se ajustan al silencio más cercano.
def tomas(reel):
    segs = []  # [línea, texto, qué viene después: 'join' | 'media' | 'pausa']
    for i, L in enumerate(reel['lines']):
        raw = (L.get('say') or L['show']).replace('*', '')
        parts = [re.sub(r'\s+/\s+', ' ', p).strip() for p in re.split(r'\s+//\s+', raw)]
        for j, p in enumerate(parts):
            segs.append([i, p, 'media' if j < len(parts) - 1 else ('join' if L.get('join') and i < len(reel['lines']) - 1 else 'pausa')])
    out, cur = [], []
    for sg in segs:
        cur.append(sg)
        if sg[2] != 'join': out.append(cur); cur = []
    return out


hablado = lambda tk: re.sub(r'[«»“”]', '', ' '.join(sg[1] for sg in tk))
takes = tomas(reel)

# Caché de tomas de ElevenLabs (voice/tomas/): una toma que no cambia no se vuelve a pagar. Con --reusar, antes de
# generar se rellena la caché cortando del voz.wav anterior (y su timing.json) las tomas del reel.json de git HEAD.
TOMAS = os.path.join(vdir, 'tomas'); os.makedirs(TOMAS, exist_ok=True)
clave = lambda txt: hashlib.sha1(json.dumps([VOICE, SPEED, 'eleven_multilingual_v2', txt]).encode()).hexdigest()[:16]
if ELEVEN and '--reusar' in args:
    try:
        tim = json.load(open(os.path.join(reel_dir, 'timing.json')))
        rel = os.path.relpath(os.path.join(reel_dir, 'reel.json'), subprocess.check_output(['git', 'rev-parse', '--show-toplevel'], cwd=reel_dir, text=True).strip())
        viejo = json.loads(subprocess.check_output(['git', 'show', f'HEAD:{rel}'], cwd=reel_dir, text=True))
        assert tim.get('motor') == 'eleven' and tim.get('voz') == VOICE, 'la voz anterior no es esta de ElevenLabs'
        wav, _sr = sf.read(os.path.join(vdir, 'voz.wav'), dtype='float32'); assert _sr == SR
        usados = {}
        for tk in tomas(viejo):
            ws = []
            for sg in tk:
                k = usados.get(sg[0], 0); n_ = len(sg[1].split()); ws += tim['words'][sg[0]][k:k + n_]; usados[sg[0]] = k + n_
            a0 = max(0.0, ws[0][0] - 0.08); b0 = min(len(wav) / SR, ws[-1][1] + 0.22)
            seg = wav[int(a0 * SR):int(b0 * SR)]; f = os.path.join(TOMAS, clave(hablado(tk)))
            if not os.path.exists(f + '.wav'):
                sf.write(f + '.wav', seg, SR, subtype='PCM_16')
                json.dump([[w0 - a0, w1 - a0] for w0, w1 in ws], open(f + '.json', 'w'))
        print('caché rellenada con las tomas anteriores')
    except Exception as e:
        print('no se pudo reusar la voz anterior:', e)

if CONTAR:
    n = sum(len(hablado(tk)) for tk in takes)
    nuevos = [tk for tk in takes if not os.path.exists(os.path.join(TOMAS, clave(hablado(tk))) + '.wav')]
    print(f'{n} caracteres en {len(takes)} tomas; de pago (sin caché): {sum(len(hablado(tk)) for tk in nuevos)} en {len(nuevos)} tomas')
    for tk in nuevos: print('  nueva:', hablado(tk))
    sys.exit()
out = [np.zeros(int(0.5 * SR))]; t = 0.5; words = [[] for _ in reel['lines']]
for tk in takes:
    texts = [sg[1] for sg in tk]
    spoken = re.sub(r'[«»“”]', '', ' '.join(texts))
    if ELEVEN:
        raw, spans = eleven(spoken)
        idx = np.where(np.abs(raw) > 0.01)[0]; a0 = max(0, idx[0] - int(0.04 * SR)) / SR if len(idx) else 0.0
        x = level(trim(raw)); dur = len(x) / SR
        k0 = 0
        for k, sg in enumerate(tk):
            n_ = len(sg[1].split())
            for (s0, s1) in spans[k0:k0 + n_]:
                words[sg[0]].append([round(t + max(0, s0 - a0), 3), round(t + min(dur, max(s1 - a0, s0 - a0 + 0.05)), 3)])
            print(f'{sg[0]:2d} {spans[k0 + n_ - 1][1] - spans[k0][0]:5.2f}s  {sg[1]}' + ('   ↘' if k < len(tk) - 1 else ''))
            k0 += n_
        out.append(x); t += dur
        i, after = tk[-1][0], tk[-1][2]; L = reel['lines'][i]
        gap = L.get('pausa_media', 0.55) if after == 'media' else L.get('pause', 0.9 if i == 0 else 0.55)
        out.append(np.zeros(int(gap * SR))); t += gap
        continue
    samples, sr = model.create(spoken, voice=VOICE, speed=SPEED, lang='es')
    assert sr == SR
    x = level(trim(np.asarray(samples, dtype=np.float32)))
    dur = len(x) / SR
    w = [np.array([weight(z) for z in tx.split()], float) for tx in texts]
    total = sum(a.sum() for a in w)
    bounds, acc, sil = [0.0], 0.0, gaps(x)
    for a in w[:-1]:
        acc += a.sum(); est = dur * acc / total
        near = [s_ for s_ in sil if abs(s_ - est) < 0.35 and s_ > bounds[-1] + 0.2]
        bounds.append(min(near, key=lambda s_: abs(s_ - est)) if near else est)
    bounds.append(dur)
    for k, sg in enumerate(tk):
        a, b = bounds[k], bounds[k + 1]; fr = w[k] / w[k].sum(); c = t + a
        for f_ in fr:
            d = (b - a) * f_; words[sg[0]].append([round(c, 3), round(c + d, 3)]); c += d
        print(f'{sg[0]:2d} {b - a:5.2f}s  {sg[1]}' + ('   ↘' if k < len(tk) - 1 else ''))
    out.append(x); t += dur
    i, after = tk[-1][0], tk[-1][2]
    L = reel['lines'][i]
    gap = L.get('pausa_media', 0.55) if after == 'media' else L.get('pause', 0.9 if i == 0 else 0.55)
    out.append(np.zeros(int(gap * SR))); t += gap
out.append(np.zeros(int(1.2 * SR))); t += 1.2
audio = np.concatenate(out)
sf.write(os.path.join(vdir, 'voz.wav'), audio, SR, subtype='PCM_16')
json.dump({'words': words, 'duration': round(t, 2), 'motor': 'eleven' if ELEVEN else 'kokoro', 'voz': VOICE}, open(os.path.join(reel_dir, 'timing.json'), 'w'))
json.dump({'motor': 'eleven' if ELEVEN else 'kokoro', 'voz': VOICE, 'velocidad': SPEED}, open(os.path.join(vdir, 'motor.json'), 'w'))
print('voz.wav', round(t, 2), 's; timing.json escrito')
