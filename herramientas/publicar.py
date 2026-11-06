#!/usr/bin/env python3
"""Publicador de reels-3d en Instagram (@fase.zer0) con la API de Meta.

Usa SOLO el secreto META_PAGE_TOKEN_3D (nunca META_PAGE_TOKEN, que es de @crecimiento.ai).

  python3 herramientas/publicar.py --dry-run                  # comprueba token -> página -> cuenta; no publica
  python3 herramientas/publicar.py reels/ID --video-url URL --caption-file texto.txt            # dry-run por defecto
  python3 herramientas/publicar.py reels/ID --video-url URL --caption-file texto.txt --publicar # publica de verdad

Seguridad (CLAUDE.md regla 4: nada se publica sin OK explícito de Jaime):
  - Sin --publicar nunca se hace ninguna petición de escritura.
  - Antes de cualquier escritura se verifica que la cuenta enlazada es @fase.zer0; si no, aborta.
  - Aborta si META_PAGE_TOKEN_3D es igual a META_PAGE_TOKEN.
  - El token no se imprime nunca.
"""
import argparse, json, os, sys, time, urllib.parse, urllib.request, urllib.error

CUENTA = "fase.zer0"
API = "https://graph.facebook.com/v21.0"


def get(path, token, **params):
    params["access_token"] = token
    url = f"{API}/{path}?{urllib.parse.urlencode(params)}"
    return _call(urllib.request.Request(url))


def post(path, token, **params):
    params["access_token"] = token
    data = urllib.parse.urlencode(params).encode()
    return _call(urllib.request.Request(f"{API}/{path}", data=data, method="POST"))


def _call(req):
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        try:
            err = json.load(e).get("error", {})
        except Exception:
            err = {}
        msg = err.get("message", e.reason)
        sys.exit(f"ERROR Meta {e.code}: {msg}")


def token_3d():
    t = os.environ.get("META_PAGE_TOKEN_3D", "").strip()
    if not t:
        sys.exit("ERROR: falta el secreto META_PAGE_TOKEN_3D en el entorno.")
    if t == os.environ.get("META_PAGE_TOKEN", "").strip():
        sys.exit("ERROR: META_PAGE_TOKEN_3D es igual a META_PAGE_TOKEN (@crecimiento.ai). Abortado.")
    return t


def _es_pagina(token):
    q = urllib.parse.urlencode({"fields": "instagram_business_account", "access_token": token})
    try:
        urllib.request.urlopen(f"{API}/me?{q}", timeout=60)
        return True
    except urllib.error.HTTPError:
        return False


def verificar(token):
    """Token -> página de Facebook -> cuenta de Instagram. Devuelve (ig_id, página). Aborta si no es @fase.zer0."""
    pagina = get("me", token, fields="id,name")
    if not _es_pagina(token):
        sys.exit(f"ERROR: META_PAGE_TOKEN_3D es un token de USUARIO ({pagina.get('name')}), no de página, y "
                 "no da acceso a ninguna página. Hay que generar el token de la página «Fase Zero» "
                 "con pages_show_list, pages_read_engagement, instagram_basic, instagram_content_publish "
                 "(y business_management si la página está en un portfolio).")
    pagina = get("me", token, fields="id,name,instagram_business_account")
    ig = pagina.get("instagram_business_account", {}).get("id")
    if not ig:
        sys.exit(f"ERROR: la página «{pagina.get('name')}» no tiene cuenta de Instagram profesional enlazada "
                 "(o al token le falta instagram_basic / pages_show_list).")
    cuenta = get(ig, token, fields="username")
    user = cuenta.get("username")
    print(f"Token  -> página «{pagina.get('name')}» (id {pagina.get('id')})")
    print(f"Página -> Instagram @{user} (id {ig})")
    if user != CUENTA:
        sys.exit(f"ERROR: el token apunta a @{user}, no a @{CUENTA}. No se hace nada.")
    print(f"OK: apunta a @{CUENTA}")
    return ig, pagina


def publicar(ig, token, video_url, caption):
    cont = post(f"{ig}/media", token, media_type="REELS", video_url=video_url, caption=caption, share_to_feed="true")
    cid = cont["id"]
    print("Contenedor creado:", cid)
    for _ in range(60):
        s = get(cid, token, fields="status_code,status")
        print("  estado:", s.get("status_code"))
        if s.get("status_code") == "FINISHED":
            break
        if s.get("status_code") in ("ERROR", "EXPIRED"):
            sys.exit(f"ERROR procesando el vídeo: {s}")
        time.sleep(10)
    else:
        sys.exit("ERROR: el vídeo no terminó de procesarse a tiempo.")
    res = post(f"{ig}/media_publish", token, creation_id=cid)
    print("Publicado, id:", res.get("id"))


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("reel", nargs="?", help="carpeta reels/ID (informativa; el vídeo se da con --video-url)")
    ap.add_argument("--dry-run", action="store_true", help="solo verificar la cuenta (por defecto si no hay --publicar)")
    ap.add_argument("--publicar", action="store_true", help="publica de verdad (solo con OK explícito de Jaime)")
    ap.add_argument("--video-url", help="URL pública https del MP4 (Meta la descarga)")
    ap.add_argument("--caption-file", help="fichero de texto con el pie")
    a = ap.parse_args()

    token = token_3d()
    ig, _ = verificar(token)

    caption = open(a.caption_file, encoding="utf-8").read().strip() if a.caption_file else ""
    if not a.publicar or a.dry_run:
        print("DRY-RUN: no se ha publicado nada.")
        if a.video_url:
            print(f"  Publicaría en @{CUENTA}: {a.video_url} ({len(caption)} caracteres de pie)")
        return
    if not a.video_url or not a.video_url.startswith("https://"):
        sys.exit("ERROR: --publicar necesita --video-url https pública.")
    publicar(ig, token, a.video_url, caption)


if __name__ == "__main__":
    main()
