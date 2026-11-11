"""Voz de pago (ElevenLabs) de un reel, con tiempos reales por palabra -> voice/voz.wav + timing.json.

Uso: python3 herramientas/voz_eleven.py reels/ID [--contar]
Secretos del entorno: ELEVENLABS_API_KEY y ELEVEN_VOICE_ID. Ajustes del modelo en pipeline.json («eleven»).
--contar: solo imprime los caracteres que gastaría (y lo que queda del mes si hay clave); no llama a la síntesis.

Igual que voz.py (Kokoro): una petición por frase (con previous_text/next_text para que la entonación enlace),
recorte de silencio, volumen igualado, pausa de cada frase (`pause`, 0,55 s; 0,9 tras el gancho). Los tiempos de cada
palabra salen del alineamiento por carácter que devuelve ElevenLabs, no de un reparto proporcional.
Regla 4 de CLAUDE.md: esto gasta dinero; solo lo lanza el workflow tras la orden /ok-voz de Jaime.
"""
import base64, hashlib, json, os, re, subprocess, sys, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SR = 24000


def textos(reel):
    return [(L.get('say') or L['show']) for L in reel['lines']]


def hablado(t):
    return re.sub(r'[«»]', '', t)


def caracteres(reel):
    return sum(len(hablado(t)) for t in textos(reel))


def huella(reel):
    return hashlib.sha1(json.dumps([hablado(t) for t in textos(reel)], ensure_ascii=False).encode()).hexdigest()[:10]


def api(path, body=None):
    key = os.environ['ELEVENLABS_API_KEY']
    req = urllib.request.Request('https://api.elevenlabs.io' + path, data=json.dumps(body).encode() if body is not None else None,
                                 headers={'xi-api-key': key, 'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=180) as r:
        return json.load(r)


def cuota():
    """(usados, límite) del mes, o None si no hay clave o falla."""
    if not os.environ.get('ELEVENLABS_API_KEY'): return None
    try:
        s = api('/v1/user/subscription'); return s['character_count'], s['character_limit']
    except Exception as e:
        print('no se pudo leer la cuota:', e); return None


def main():
    import numpy as np, soundfile as sf
    args = sys.argv[1:]; reel_dir = os.path.abspath(args[0])
    reel = json.load(open(os.path.join(reel_dir, 'reel.json')))
    n = caracteres(reel); q = cuota()
    print(f'{n} caracteres' + (f'; usados {q[0]} de {q[1]} este mes' if q else ''))
    if '--contar' in args: return
    cfg = json.load(open(os.path.join(ROOT, 'pipeline.json')))['eleven']
    voice = os.environ['ELEVEN_VOICE_ID']
    vdir = os.path.join(reel_dir, 'voice'); os.makedirs(vdir, exist_ok=True)
    ts = textos(reel)

    def trim(x, thr=0.01, pad=0.04):
        idx = np.where(np.abs(x) > thr)[0]
        if len(idx) == 0: return x, 0
        a, b = max(0, idx[0] - int(pad * SR)), min(len(x), idx[-1] + int(pad * SR)); return x[a:b], a

    def level(x, target_db=-17.0):
        rms = np.sqrt(np.mean(x ** 2)) + 1e-9; y = x * (10 ** (target_db / 20) / rms)
        peak = np.max(np.abs(y)); return y * (0.89 / peak) if peak > 0.89 else y

    out = [np.zeros(int(0.5 * SR))]; t = 0.5; words = []
    for i, text in enumerate(ts):
        spoken = hablado(text)
        body = {'text': spoken, 'model_id': cfg['modelo'], 'language_code': cfg.get('idioma', 'es'),
                'voice_settings': {'stability': cfg['estabilidad'], 'similarity_boost': cfg['similitud'], 'style': cfg.get('estilo', 0)}}
        if i > 0: body['previous_text'] = hablado(ts[i - 1])
        if i + 1 < len(ts): body['next_text'] = hablado(ts[i + 1])
        r = api(f'/v1/text-to-speech/{voice}/with-timestamps?output_format=mp3_44100_128', body)
        mp3 = base64.b64decode(r['audio_base64'])
        pcm = subprocess.run(['ffmpeg', '-v', 'error', '-i', '-', '-f', 'f32le', '-ac', '1', '-ar', str(SR), '-'], input=mp3, capture_output=True, check=True).stdout
        x, a = trim(np.frombuffer(pcm, dtype=np.float32).copy()); x = level(x)
        dur = len(x) / SR; off = a / SR
        al = r.get('alignment') or r['normalized_alignment']
        chars, st, en = al['characters'], al['character_start_times_seconds'], al['character_end_times_seconds']
        # palabras = tramos sin espacio del texto hablado, en el mismo orden que text.split()
        row = []; cur = None
        for c, s, e in zip(chars, st, en):
            if c.isspace():
                if cur: row.append(cur); cur = None
            elif cur is None: cur = [s, e]
            else: cur[1] = e
        if cur: row.append(cur)
        n_w = len(text.split())
        if len(row) != n_w:  # no debería pasar; si pasa, se reparte por letras como con Kokoro
            print(f'aviso frase {i}: {len(row)} palabras alineadas, {n_w} en el guion; reparto proporcional')
            toks = text.split(); wts = np.array([len(re.sub(r'[^\wáéíóúüñ]', '', w)) + 1.5 for w in toks], float); wts /= wts.sum()
            row = []; c0 = off
            for f in wts: row.append([c0, c0 + dur * f]); c0 += dur * f
        clip = lambda v: min(max(v - off, 0.0), dur)
        words.append([[round(t + clip(s), 3), round(t + clip(e), 3)] for s, e in row])
        out.append(x); t += dur
        pause = reel['lines'][i].get('pause', 0.9 if i == 0 else 0.55)
        out.append(np.zeros(int(pause * SR))); t += pause
        print(f'{i:2d} {dur:5.2f}s  {text}')
    out.append(np.zeros(int(1.2 * SR))); t += 1.2
    sf.write(os.path.join(vdir, 'voz.wav'), np.concatenate(out), SR, subtype='PCM_16')
    meta = {'motor': 'eleven', 'voz': voice, 'modelo': cfg['modelo'], 'caracteres': n, 'huella': huella(reel)}
    json.dump({'words': words, 'duration': round(t, 2), **meta}, open(os.path.join(reel_dir, 'timing.json'), 'w'))
    json.dump(meta, open(os.path.join(vdir, 'motor.json'), 'w'))
    print('voz.wav', round(t, 2), 's; timing.json escrito (eleven)')


if __name__ == '__main__':
    main()
