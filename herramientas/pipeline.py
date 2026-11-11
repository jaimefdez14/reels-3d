"""Cadena de producción y publicación de reels (docs/PIPELINE.md). Solo librería estándar + gh (en GitHub Actions).

python3 herramientas/pipeline.py estado                 # tabla de reels e ideas
python3 herramientas/pipeline.py pendientes [ID]        # ids que necesitan previa (estado «guion»)
python3 herramientas/pipeline.py previa ID              # Kokoro + inspectores + render + tira 1 fps + release + issue
python3 herramientas/pipeline.py final ID               # ElevenLabs + inspectores + render + release + issue
python3 herramientas/pipeline.py orden                  # aplica la orden del comentario (evento issue_comment)
python3 herramientas/pipeline.py publicar [--ya] [--simular]   # publica el siguiente aprobado si toca franja
python3 herramientas/pipeline.py ideas                  # abre la issue con las ideas propuestas sin issue
python3 herramientas/pipeline.py pasar ID ESTADO [nota] # cambio manual de estado (lo usan las sesiones)
python3 herramientas/pipeline.py producir               # qué debe hacer la sesión programada ahora (JSON)
python3 herramientas/pipeline.py panel                  # reescribe docs/PANEL.md

Estados de un reel (reels/ID/estado.json):
  guion -> previa -> voz_ok -> final -> aprobado -> publicado
  fallo (un inspector no dio ok; la sesión lo arregla y vuelve a guion), cambios (Jaime pidió cambios: la sesión los
  hace y vuelve a guion), descartado, pausado.
Estilo B (fase.zer0): redaccion.py → voz.py (Kokoro) → motor2d/build.py → inspectores → render. La final usa
voz.py --eleven (con la caché de tomas guardada en la release) y publicar.py (@fase.zer0, META_PAGE_TOKEN_3D).
Con PIPELINE_LOCAL=1 no toca GitHub (imprime lo que haría): para probar en una sesión.
"""
import datetime as dt, glob, json, os, re, shutil, subprocess, sys
from zoneinfo import ZoneInfo

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CFG = json.load(open(os.path.join(ROOT, 'pipeline.json')))
TZ = ZoneInfo(CFG['zona'])
LOCAL = os.environ.get('PIPELINE_LOCAL') == '1'
REPO = os.environ.get('GITHUB_REPOSITORY', CFG['repo'])
ESTADOS = ['guion', 'previa', 'fallo', 'cambios', 'voz_ok', 'final', 'aprobado', 'publicado', 'descartado', 'pausado']
EN_CURSO = ['guion', 'previa', 'fallo', 'cambios', 'voz_ok', 'final']
sys.path.insert(0, os.path.join(ROOT, 'herramientas'))


# ---------- utilidades ----------
def ahora(): return dt.datetime.now(TZ)
def iso(t=None): return (t or ahora()).isoformat(timespec='minutes')
def rdir(i): return os.path.join(ROOT, 'reels', i)


def leer(i):
    p = os.path.join(rdir(i), 'estado.json')
    return json.load(open(p)) if os.path.exists(p) else {'id': i, 'estado': 'guion', 'version': 0, 'historial': []}


def guardar(i, st):
    json.dump(st, open(os.path.join(rdir(i), 'estado.json'), 'w'), ensure_ascii=False, indent=1)


def pasar(i, st, nuevo, nota='', quien='pipeline'):
    assert nuevo in ESTADOS, nuevo
    st['historial'].append({'fecha': iso(), 'de': st['estado'], 'a': nuevo, 'quien': quien, 'nota': nota[:500]})
    st['estado'] = nuevo; guardar(i, st)


def reels():
    return sorted(os.path.basename(os.path.dirname(p)) for p in glob.glob(os.path.join(ROOT, 'reels', '*', 'reel.json')))


def guion(i): return json.load(open(os.path.join(rdir(i), 'reel.json')))


def ideas():
    p = os.path.join(ROOT, 'ideas.json'); return json.load(open(p)) if os.path.exists(p) else []


def guardar_ideas(v): json.dump(v, open(os.path.join(ROOT, 'ideas.json'), 'w'), ensure_ascii=False, indent=1)


def sh(cmd, check=True, env=None):
    """Ejecuta y devuelve (código, salida); imprime la salida."""
    print('$', ' '.join(cmd), flush=True)
    r = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True, env={**os.environ, **(env or {})})
    out = (r.stdout + r.stderr).strip(); print(out[-4000:], flush=True)
    if check and r.returncode: raise RuntimeError(f'falló: {" ".join(cmd)}\n{out[-1500:]}')
    return r.returncode, out


def gh(*args):
    if LOCAL: print('[local] gh', ' '.join(a if len(a) < 80 else a[:80] + '…' for a in args)); return ''
    return sh(['gh', *args])[1]


def comentar(n, cuerpo):
    if n: gh('issue', 'comment', str(n), '--repo', REPO, '--body', cuerpo)


def subir(i, archivos):
    """Sube archivos a la release «reel-ID» (prerelease) y devuelve sus URL públicas."""
    tag = f'reel-{i}'
    if not LOCAL and subprocess.run(['gh', 'release', 'view', tag, '--repo', REPO], capture_output=True).returncode:
        gh('release', 'create', tag, '--repo', REPO, '--prerelease', '--title', f'Reel {i}', '--notes', f'Vídeos del reel {i} (previas y final). Estado en reels/{i}/estado.json.')
    gh('release', 'upload', tag, '--repo', REPO, '--clobber', *archivos)
    return {os.path.basename(a): f'https://github.com/{REPO}/releases/download/{tag}/{os.path.basename(a)}' for a in archivos}


def asegurar_issue(i, st):
    if st.get('issue') or LOCAL: return st.get('issue')
    g = guion(i)
    cuerpo = (f"**{i} · {g.get('titulo', '')}**\n\n{g.get('idea', '')}\n\n"
              "Cada versión llega como comentario con el vídeo, la tira a 1 fps y el resultado de los inspectores.\n\n"
              "**Órdenes** (comenta solo la orden; solo cuentan las de Jaime):\n"
              "- `/ok-voz`: apruebas la previa y el gasto de caracteres de ElevenLabs que indica el comentario; sale la versión final.\n"
              "- `/ok-todo`: lo mismo y, además, la final entra en la cola de publicación sin volver a preguntarte si pasa los inspectores.\n"
              "- `/publicar`: la versión final entra en la cola (13:00 y 20:00, por orden de aprobación).\n"
              "- `/cambios <qué cambiar>`: la próxima sesión programada lo corrige y vuelve con una previa nueva.\n"
              "- `/descartar` · `/pausar`\n")
    for lb in ('reel', 'ideas'): gh('label', 'create', lb, '--repo', REPO, '--force')
    url = gh('issue', 'create', '--repo', REPO, '--title', f"[{i}] {g.get('titulo', i)}", '--label', 'reel', '--body', cuerpo).strip().splitlines()[-1]
    st['issue'] = int(url.rstrip('/').split('/')[-1]); guardar(i, st); return st['issue']


def tira(i, dur, destino):
    """Tira a 1 fps (regla de revisión) en una hoja de contactos jpg."""
    d = os.path.join(rdir(i), 'out', 'tira'); shutil.rmtree(d, ignore_errors=True)
    ts = [f'{t:.1f}' for t in range(0, int(dur) + 1)]
    sh(['node', 'herramientas/frames.js', os.path.join(rdir(i), 'composition', 'index.html'), d, *ts])
    sh(['python3', 'herramientas/sheet.py', d, destino, '8'])


def inspectores(i):
    c1, o1 = sh(['node', 'herramientas/inspeccionar.js', f'reels/{i}', '0.25'], check=False)
    c2, o2 = sh(['node', 'herramientas/inspeccionar_px.js', f'reels/{i}', '0.5'], check=False)
    return c1 == 0 and c2 == 0, o1, o2


def pie(g):
    """Texto de la publicación: reel.json → texto_publicacion (lo escribe la sesión y Jaime lo ve en la previa)."""
    return (g.get('texto_publicacion') or (g.get('titulo', '') + ('\n\n' + CFG['hashtags_por_defecto'] if CFG.get('hashtags_por_defecto') else ''))).strip()


def lista_guion(g):
    return '\n'.join(f"{k}. {('**' + L['voice'] + '** ') if L.get('voice') else ''}{L['show']}" for k, L in enumerate(g['lines']))


# ---------- pasos ----------
def build(i):
    """Estilo B (escena.js, motor2d) o A (shots3d.js, motor 3D; descartado, regla 25)."""
    m = 'motor2d/build.py' if os.path.exists(os.path.join(rdir(i), 'escena.js')) else 'motor/build.py'
    sh(['python3', m, f'reels/{i}'])


def tomas(i, accion):
    """Las tomas de ElevenLabs (voice/tomas/*.wav, no van en git) viven en la release: así nunca se paga dos veces."""
    tdir = os.path.join(rdir(i), 'voice', 'tomas'); os.makedirs(tdir, exist_ok=True)
    tar = os.path.join(rdir(i), 'out', f'{i}-tomas.tar.gz'); os.makedirs(os.path.dirname(tar), exist_ok=True)
    if LOCAL: return
    if accion == 'traer':
        if subprocess.run(['gh', 'release', 'download', f'reel-{i}', '--repo', REPO, '-p', os.path.basename(tar), '-O', tar, '--clobber'], capture_output=True).returncode == 0:
            sh(['tar', '-xzf', tar, '-C', tdir])
    else:
        wavs = [f for f in os.listdir(tdir) if f.endswith('.wav')]
        if wavs: sh(['tar', '-czf', tar, '-C', tdir, *wavs]); subir(i, [tar])


def de_pago(i):
    """Caracteres que costaría la voz de ElevenLabs ahora (sin contar las tomas ya pagadas)."""
    e = CFG['eleven']
    _, o = sh(['python3', 'herramientas/voz.py', f'reels/{i}', '--eleven', e['voz'], '--velocidad', str(e['velocidad']), '--contar'], check=False)
    m = re.search(r'de pago \(sin caché\): (\d+)', o); return int(m.group(1)) if m else None


def previa(i):
    st = leer(i); g = guion(i); st['version'] = st.get('version', 0) + 1; v = st['version']
    n = asegurar_issue(i, st)
    c, o = sh(['python3', 'herramientas/redaccion.py', f'reels/{i}'], check=False)
    if c:
        pasar(i, st, 'fallo', f'redaccion.py en la previa v{v}')
        comentar(n, f"⚠️ **v{v}: `redaccion.py` no da ok**; la sesión programada lo corrige antes de enseñártelo.\n\n```\n{o[-2500:]}\n```")
        return False
    k = CFG['kokoro']; tomas(i, 'traer')
    sh([os.environ.get('PY_KOKORO', sys.executable), 'herramientas/voz.py', f'reels/{i}', '--voz', k['voz'], '--velocidad', str(k['velocidad'])])
    build(i)
    ok, o1, o2 = inspectores(i)
    if not ok:
        pasar(i, st, 'fallo', 'inspectores en la previa v%d' % v)
        comentar(n, f"⚠️ **v{v}: los inspectores no dan ok**; la sesión programada lo corrige antes de enseñártelo.\n\n```\n{o1[-1500:]}\n{o2[-1500:]}\n```")
        return False
    sh(['node', 'motor/render.js', f'reels/{i}'])
    out = os.path.join(rdir(i), 'out'); dur = json.load(open(os.path.join(rdir(i), 'timing.json')))['duration']
    mp4 = os.path.join(out, f'{i}-v{v}-previa.mp4'); shutil.copy(os.path.join(out, f"{g['id']}.mp4"), mp4)
    hoja = os.path.join(out, f'{i}-v{v}-tira.jpg'); tira(i, dur, hoja)
    nc = de_pago(i)
    urls = subir(i, [mp4, hoja])
    st.update(caracteres=nc, previa={'version': v, 'mp4': urls[os.path.basename(mp4)], 'tira': urls[os.path.basename(hoja)], 'fecha': iso()})
    pasar(i, st, 'previa', f'v{v} lista')
    comentar(n, f"### v{v} · previa con voz Kokoro (gratis) · {dur:.0f} s\n\n▶️ **[Ver la previa]({urls[os.path.basename(mp4)]})**\n\n"
                f"`redaccion.py` ok · inspectores: rectángulos ok, píxeles ok.\n\n**Voz de pago si das `/ok-voz`: {nc if nc is not None else '¿?'} caracteres** de ElevenLabs (las tomas ya pagadas no cuentan).\n\n"
                f"**Texto de la publicación:**\n> {pie(g).replace(chr(10), chr(10) + '> ')}\n\n<details><summary>Guion</summary>\n\n{lista_guion(g)}\n</details>\n\n"
                f"Tira a 1 fps:\n\n![tira]({urls[os.path.basename(hoja)]})")
    return True


RECODIFICAR = ['-c:v', 'libx264', '-profile:v', 'high', '-level', '4.1', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p',
               '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-g', '60', '-keyint_min', '60',
               '-sc_threshold', '0', '-x264-params', 'open-gop=0', '-c:a', 'aac', '-b:a', '128k', '-ar', '44100', '-ac', '2',
               '-movflags', '+faststart', '-map_metadata', '-1']  # el mismo re-codificado con el que Instagram aceptó L1 y L2


def final(i):
    st = leer(i); g = guion(i); v = st.get('version', 1); n = st.get('issue'); e = CFG['eleven']
    tomas(i, 'traer')
    sh([os.environ.get('PY_KOKORO', sys.executable), 'herramientas/voz.py', f'reels/{i}', '--eleven', e['voz'], '--velocidad', str(e['velocidad'])])
    tomas(i, 'guardar')  # lo pagado queda guardado aunque falle lo que sigue
    build(i)
    ok, o1, o2 = inspectores(i)
    if not ok:
        pasar(i, st, 'fallo', f'inspectores con la voz final v{v} (las tomas pagadas se reutilizan)')
        comentar(n, f"⚠️ **v{v} final: con los tiempos de la voz de pago, los inspectores no dan ok.** La sesión lo corrige; las tomas ya pagadas no se vuelven a pagar.\n\n```\n{o1[-1500:]}\n{o2[-1500:]}\n```")
        return False
    sh(['node', 'motor/render.js', f'reels/{i}'])
    out = os.path.join(rdir(i), 'out'); dur = json.load(open(os.path.join(rdir(i), 'timing.json')))['duration']
    mp4 = os.path.join(out, f'{i}-v{v}-final.mp4')
    sh(['ffmpeg', '-v', 'error', '-y', '-i', os.path.join(out, f"{g['id']}.mp4"), *RECODIFICAR, mp4])
    hoja = os.path.join(out, f'{i}-v{v}-final-tira.jpg'); tira(i, dur, hoja)
    urls = subir(i, [mp4, hoja])
    st['final'] = {'version': v, 'mp4': urls[os.path.basename(mp4)], 'tira': urls[os.path.basename(hoja)], 'fecha': iso(), 'archivo': os.path.basename(mp4)}
    if st.get('ok_todo'):
        st['aprobado_en'] = iso(); pasar(i, st, 'aprobado', 'final lista; /ok-todo')
        sig = 'Entra en la cola de publicación (diste `/ok-todo`).'
    else:
        pasar(i, st, 'final', f'v{v} final lista'); sig = 'Si está bien, comenta `/publicar` y entra en la cola.'
    comentar(n, f"### v{v} · versión final con voz de ElevenLabs · {dur:.0f} s\n\n▶️ **[Ver la final]({urls[os.path.basename(mp4)]})** (es el archivo exacto que se publica)\n\nInspectores: ok. {sig}\n\n![tira]({urls[os.path.basename(hoja)]})")
    return True


def salida(**kv):
    p = os.environ.get('GITHUB_OUTPUT')
    for k, v in kv.items():
        print(f'{k}={v}')
        if p: open(p, 'a').write(f'{k}={v}\n')


def orden():
    ev = json.load(open(os.environ['GITHUB_EVENT_PATH']))
    c, iss = ev['comment'], ev['issue']
    quien = c['user']['login']
    if quien not in CFG['autorizados'] and c.get('author_association') != 'OWNER':
        print('orden ignorada: no es de Jaime'); return
    m = re.match(r'\s*/([\w-]+)\s*(.*)', c['body'], re.S)
    if not m: return
    cmd, resto = m.group(1).lower(), m.group(2).strip()
    labels = [l['name'] for l in iss.get('labels', [])]; n = iss['number']
    if 'ideas' in labels:
        ids = re.findall(r'[A-Z]+\d+', resto.upper()); v = ideas(); hechos = []
        for d in v:
            if d['id'] in ids and cmd in ('ok', 'no'):
                d['estado'] = 'aprobada' if cmd == 'ok' else 'descartada'; d['fecha_' + d['estado']] = iso(); hechos.append(d['id'])
        guardar_ideas(v); panel()
        comentar(n, (f"Anotado: {', '.join(hechos)} → {'aprobadas' if cmd == 'ok' else 'descartadas'}." if hechos else 'No reconozco esos ids.'))
        return
    i = next((r for r in reels() if leer(r).get('issue') == n), None)
    if not i: print('issue sin reel'); return
    st = leer(i); e = st['estado']
    def no(msg): comentar(n, f'No aplico `/{cmd}`: {msg} (estado actual: `{e}`).')
    if cmd in ('ok-voz', 'ok-todo'):
        if e != 'previa': return no('solo vale sobre una previa')
        st['ok_todo'] = cmd == 'ok-todo'; st['ok_voz'] = {'fecha': iso(), 'caracteres': st.get('caracteres'), 'version': st.get('version')}
        pasar(i, st, 'voz_ok', f'/{cmd} de {quien}', quien)
        comentar(n, f"Hecho: genero la voz de pago ({st.get('caracteres')} caracteres) y la versión final. Tarda unos 15 min.")
        salida(accion='final', id=i)
    elif cmd == 'publicar':
        if e != 'final': return no('solo vale sobre una versión final')
        st['aprobado_en'] = iso(); pasar(i, st, 'aprobado', f'/publicar de {quien}', quien)
        cola = sorted([r for r in reels() if leer(r)['estado'] == 'aprobado'], key=lambda r: leer(r).get('aprobado_en', ''))
        comentar(n, f'En la cola: puesto {cola.index(i) + 1} de {len(cola)}. Sale en la franja {proxima_franja(cola.index(i))}.')
    elif cmd == 'cambios':
        if e not in ('previa', 'final', 'fallo', 'guion', 'aprobado'): return no('no hay versión que cambiar')
        st.setdefault('cambios', []).append({'fecha': iso(), 'texto': resto, 'version': st.get('version'), 'hecho': False})
        pasar(i, st, 'cambios', resto, quien)
        comentar(n, 'Anotado. La próxima sesión programada lo corrige y vuelve aquí con una previa nueva.')
    elif cmd in ('descartar', 'pausar'):
        pasar(i, st, 'descartado' if cmd == 'descartar' else 'pausado', resto, quien)
        comentar(n, 'Hecho.'); gh('issue', 'close', str(n), '--repo', REPO) if cmd == 'descartar' else None
    elif cmd == 'reanudar' and e == 'pausado':
        pasar(i, st, 'guion', resto, quien); comentar(n, 'Reanudado: vuelve a previa.'); salida(accion='previa', id=i)
    else:
        return
    panel()


def franjas_desde(t, k):
    """Las k franjas de publicación siguientes a t."""
    res = []; d = t.date()
    while len(res) < k:
        for f in CFG['franjas']:
            h, m = map(int, f.split(':')); s = dt.datetime(d.year, d.month, d.day, h, m, tzinfo=TZ)
            if s > t and len(res) < k: res.append(s)
        d += dt.timedelta(days=1)
    return res


def proxima_franja(puesto=0):
    publicadas = {leer(r).get('ig', {}).get('franja') for r in reels()}
    libres = [s for s in franjas_desde(ahora() - dt.timedelta(minutes=CFG['ventana_min']), puesto + 10) if s.strftime('%Y-%m-%d %H:%M') not in publicadas]
    d = libres[puesto]; return f"{['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'][d.weekday()]} {d:%d-%m %H:%M}"


def publicar(ya=False, simular=False):
    t = ahora(); franja = None
    for f in CFG['franjas']:
        h, m = map(int, f.split(':')); s = t.replace(hour=h, minute=m, second=0, microsecond=0)
        if dt.timedelta(0) <= t - s < dt.timedelta(minutes=CFG['ventana_min']): franja = s
    if ya: franja = franja or t.replace(second=0, microsecond=0)
    if not franja: print('no toca franja ahora', iso(t)); return
    clave = franja.strftime('%Y-%m-%d %H:%M')
    if any(leer(r).get('ig', {}).get('franja') == clave for r in reels()): print('franja ya publicada:', clave); return
    cola = sorted([r for r in reels() if leer(r)['estado'] == 'aprobado'], key=lambda r: leer(r).get('aprobado_en', ''))
    if not cola: print('cola vacía en la franja', clave); return
    i = cola[0]; st = leer(i); g = guion(i); f = st['final']
    print('publico', i, 'en la franja', clave)
    if simular: return
    d = os.path.join(rdir(i), 'out'); os.makedirs(d, exist_ok=True); mp4 = os.path.join(d, f['archivo'])
    if not os.path.exists(mp4): gh('release', 'download', f'reel-{i}', '--repo', REPO, '-p', f['archivo'], '-D', d, '--clobber')
    base = ['python3', 'herramientas/publicar.py', f'reels/{i}', '--video', mp4, '--texto', pie(g), '--publicar']
    c, o = sh(base + ['--url', f['mp4']], check=False)  # 1.º: URL de la release
    if c and not LOCAL:  # 2.º: lo que funcionó con L1 y L2: el MP4 en la repo y la URL de raw.githubusercontent.com
        os.makedirs(os.path.join(ROOT, 'publicados'), exist_ok=True); dst = os.path.join(ROOT, 'publicados', f'{i}.mp4'); shutil.copy(mp4, dst)
        sh(['git', 'add', dst]); sh(['git', 'commit', '-q', '-m', f'{i} para publicar en @{CFG["cuenta"]}'])
        sh(['git', 'pull', '-q', '--rebase', 'origin', 'main']); sh(['git', 'push', '-q', 'origin', 'HEAD:main'])
        c, o2 = sh(base + ['--url', f'https://raw.githubusercontent.com/{REPO}/main/publicados/{i}.mp4'], check=False); o += '\n' + o2
    m = re.search(r'publicado: (\S+)', o)
    if c or not m:
        st.setdefault('errores', []).append({'fecha': iso(), 'error': o[-800:]}); guardar(i, st)
        comentar(st.get('issue'), f'❌ Falló la publicación en la franja {clave}; sigue en la cola y se reintenta en la siguiente.\n\n```\n{o[-1500:]}\n```')
        panel(); raise SystemExit(1)
    st['ig'] = {'permalink': m.group(1), 'franja': clave, 'fecha': iso()}; pasar(i, st, 'publicado', m.group(1))
    comentar(st.get('issue'), f"✅ Publicado en @{CFG['cuenta']} ({clave}): {m.group(1)}")
    gh('issue', 'close', str(st.get('issue')), '--repo', REPO) if st.get('issue') else None
    panel()


def abrir_ideas():
    v = ideas(); nuevas = [d for d in v if d['estado'] == 'propuesta' and not d.get('issue')]
    if not nuevas: return
    cuerpo = ('Ideas propuestas por la sesión programada. Cada una necesita tu sí antes de producirse (regla 7).\n\n' +
              '\n'.join(f"- **{d['id']}** · {d['titulo']} — {d.get('resumen', '')} ({d.get('doc', '')})" for d in nuevas) +
              '\n\n**Órdenes:** `/ok N7 N9` aprueba esas; `/no N8` las descarta.')
    for lb in ('reel', 'ideas'): gh('label', 'create', lb, '--repo', REPO, '--force')
    url = gh('issue', 'create', '--repo', REPO, '--title', f"Ideas propuestas ({ahora():%d-%m-%Y}): {', '.join(d['id'] for d in nuevas)}", '--label', 'ideas', '--body', cuerpo)
    n = int(url.strip().splitlines()[-1].rstrip('/').split('/')[-1]) if url.strip() else 0
    for d in nuevas: d['issue'] = n
    guardar_ideas(v)


def producir():
    """Lo que debe hacer la sesión programada, en orden de prioridad."""
    rs = {r: leer(r) for r in reels()}
    arreglar = [r for r, s in rs.items() if s['estado'] in ('cambios', 'fallo')]
    en_curso = [r for r, s in rs.items() if s['estado'] in EN_CURSO]
    aprobados = [r for r, s in rs.items() if s['estado'] == 'aprobado']
    v = ideas()
    libres = [d['id'] for d in v if d['estado'] == 'aprobada' and not d.get('reel')]
    producir_n = 0 if len(en_curso) >= CFG['max_en_curso'] or len(aprobados) >= CFG['colchon_aprobados'] else 1  # uno por sesión: dos sesiones al día = dos reels al día
    plan = {'arreglar': {r: (rs[r].get('cambios') or [{}])[-1].get('texto') if rs[r]['estado'] == 'cambios' else rs[r]['historial'][-1]['nota'] for r in arreglar},
            'producir': libres[:producir_n], 'proponer_ideas': len(libres) < 4 and not any(d['estado'] == 'propuesta' for d in v),
            'en_curso': en_curso, 'aprobados_en_cola': len(aprobados)}
    print(json.dumps(plan, ensure_ascii=False, indent=1))


def panel():
    rs = {r: leer(r) for r in reels()}
    orden_e = {e: k for k, e in enumerate(['cambios', 'fallo', 'previa', 'voz_ok', 'final', 'aprobado', 'guion', 'publicado', 'pausado', 'descartado'])}
    L = [f'# Panel de reels (se regenera solo; {iso()})', '', '| Reel | Título | Estado | Versión | Issue | Publicación |', '|---|---|---|---|---|---|']
    for r, s in sorted(rs.items(), key=lambda x: (orden_e.get(x[1]['estado'], 99), x[0])):
        g = guion(r); ig = s.get('ig', {})
        L.append(f"| {r} | {g.get('titulo', '')} | {s['estado']} | v{s.get('version', 0)} | {('#' + str(s['issue'])) if s.get('issue') else ''} | {(ig.get('franja', '') + ' ' + ig.get('permalink', '')).strip()} |")
    cola = sorted([r for r, s in rs.items() if s['estado'] == 'aprobado'], key=lambda r: rs[r].get('aprobado_en', ''))
    L += ['', '## Cola de publicación', ''] + ([f'{k + 1}. {r} → {proxima_franja(k)}' for k, r in enumerate(cola)] or ['(vacía)'])
    L += ['', '## Ideas', '', '| Idea | Título | Estado | Reel |', '|---|---|---|---|'] + [f"| {d['id']} | {d['titulo']} | {d['estado']} | {d.get('reel', '')} |" for d in ideas()]
    open(os.path.join(ROOT, 'docs', 'PANEL.md'), 'w').write('\n'.join(L) + '\n')


def main():
    a = sys.argv[1:]; c = a[0] if a else 'estado'
    if c == 'estado':
        for r in reels(): s = leer(r); print(f"{r:5} {s['estado']:10} v{s.get('version', 0)}  {guion(r).get('titulo', '')}")
        for d in ideas(): print(f"idea {d['id']:4} {d['estado']:10} {d['titulo']}")
    elif c == 'pendientes':  # «guion» → previa; «voz_ok» → final (p. ej. si el workflow de la orden se cortó)
        ids = [x for x in a[1:2] if x] or [r for r in reels() if leer(r)['estado'] in ('guion', 'voz_ok')]
        print(' '.join(ids))
    elif c == 'siguiente':  # para el workflow: previa o final según el estado
        for r in a[1:]: (final if leer(r)['estado'] == 'voz_ok' else previa)(r)
    elif c == 'previa': previa(a[1])  # un fallo de inspector se notifica en la issue, no rompe el workflow
    elif c == 'final': final(a[1])
    elif c == 'orden': orden()
    elif c == 'publicar': publicar('--ya' in a, '--simular' in a)
    elif c == 'ideas': abrir_ideas(); panel()
    elif c == 'pasar':
        st = leer(a[1]); nuevo = a[2]
        if nuevo == 'guion' and st['estado'] == 'cambios':
            for k in st.get('cambios', []): k['hecho'] = True
        pasar(a[1], st, nuevo, a[3] if len(a) > 3 else '', os.environ.get('QUIEN', 'sesión')); panel()
    elif c == 'producir': producir()
    elif c == 'panel': panel()
    else: print(__doc__)


if __name__ == '__main__':
    main()
