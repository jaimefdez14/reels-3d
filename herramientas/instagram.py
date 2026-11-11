"""Publica un MP4 como reel de Instagram (API de Instagram Graph). Solo librería estándar.

python3 herramientas/instagram.py comprobar                 # valida IG_TOKEN e IG_USER_ID (no publica)
python3 herramientas/instagram.py publicar video.mp4 "pie" [segundo_portada]

Secretos del entorno: IG_TOKEN (token de larga duración con instagram_content_publish) e IG_USER_ID (id de la cuenta
profesional). Host y versión en pipeline.json («instagram»): graph.facebook.com si el token viene del inicio de sesión
de Facebook (cuenta vinculada a una página) o graph.instagram.com si viene del inicio de sesión de Instagram.
Modo «resumable» (por defecto): sube el archivo directamente a rupload.facebook.com, sin URL pública.
Modo «url»: Instagram descarga el vídeo de `video_url` (hace falta una URL pública que sirva el MP4).
"""
import json, os, sys, time, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CFG = json.load(open(os.path.join(ROOT, 'pipeline.json')))['instagram']
BASE = f"https://{CFG['host']}/{CFG['version']}"


def _req(method, url, params=None, data=None, headers=None):
    if params and method == 'POST' and data is None: data = urllib.parse.urlencode(params).encode()  # el pie va en el cuerpo
    elif params: url += ('&' if '?' in url else '?') + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, data=data, method=method, headers=headers or {})
    try:
        with urllib.request.urlopen(req, timeout=300) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        raise RuntimeError(f'{method} {url.split("?")[0]} -> {e.code}: {e.read().decode(errors="replace")[:600]}') from None


def _tok(): return os.environ['IG_TOKEN']
def _uid(): return os.environ['IG_USER_ID']


def comprobar():
    return _req('GET', f'{BASE}/{_uid()}', {'fields': 'username,media_count', 'access_token': _tok()})


def publicar(video, pie, portada_s=None, video_url=None):
    """Devuelve {'id', 'permalink'}."""
    p = {'media_type': 'REELS', 'caption': pie, 'share_to_feed': 'true', 'access_token': _tok()}
    if portada_s is not None: p['thumb_offset'] = str(int(float(portada_s) * 1000))
    if CFG.get('modo') == 'url' or video_url:
        p['video_url'] = video_url
        cid = _req('POST', f'{BASE}/{_uid()}/media', p)['id']
    else:
        p['upload_type'] = 'resumable'
        r = _req('POST', f'{BASE}/{_uid()}/media', p); cid = r['id']
        up = r.get('uri') or f"https://rupload.facebook.com/ig-api-upload/{CFG['version']}/{cid}"
        data = open(video, 'rb').read()
        _req('POST', up, data=data, headers={'Authorization': 'OAuth ' + _tok(), 'offset': '0', 'file_size': str(len(data))})
    for _ in range(60):  # Instagram procesa el vídeo; hasta ~10 min
        s = _req('GET', f'{BASE}/{cid}', {'fields': 'status_code,status', 'access_token': _tok()})
        if s.get('status_code') == 'FINISHED': break
        if s.get('status_code') in ('ERROR', 'EXPIRED'): raise RuntimeError(f'Instagram rechazó el vídeo: {s}')
        time.sleep(10)
    else:
        raise RuntimeError('Instagram no terminó de procesar el vídeo en 10 min')
    mid = _req('POST', f'{BASE}/{_uid()}/media_publish', {'creation_id': cid, 'access_token': _tok()})['id']
    link = _req('GET', f'{BASE}/{mid}', {'fields': 'permalink', 'access_token': _tok()}).get('permalink', '')
    return {'id': mid, 'permalink': link}


if __name__ == '__main__':
    a = sys.argv[1:]
    if a[0] == 'comprobar': print(comprobar())
    elif a[0] == 'publicar': print(publicar(a[1], a[2], a[3] if len(a) > 3 else None))
