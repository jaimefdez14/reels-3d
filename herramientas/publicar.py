#!/usr/bin/env python3
"""Publicador de reels-3d en Instagram (@fase.zer0) vía Graph API.

Solo usa META_PAGE_TOKEN_3D. No lee META_PAGE_TOKEN, IG_USER_ID ni META_PAGE_ID (son de @crecimiento.ai):
la cuenta se resuelve siempre desde el propio token y se aborta si no es @fase.zer0.

  python3 herramientas/publicar.py reels/ID --dry-run                 # por defecto: no publica nada
  python3 herramientas/publicar.py reels/ID --publicar --video-url URL --ok-jaime

Publicar de verdad exige --publicar, --ok-jaime (el OK explícito de Jaime, regla 4 de CLAUDE.md) y una URL pública
del MP4 (Instagram descarga el vídeo desde esa URL). Sin eso, solo dry-run.
"""
import argparse, json, os, sys, time, urllib.parse, urllib.request, urllib.error

API = "https://graph.facebook.com/v21.0"
CUENTA = "fase.zer0"
VAR = "META_PAGE_TOKEN_3D"


def llamar(ruta, token, params=None, post=False):
    datos = dict(params or {}, access_token=token)
    if post:
        req = urllib.request.Request(f"{API}/{ruta}", data=urllib.parse.urlencode(datos).encode())
    else:
        req = urllib.request.Request(f"{API}/{ruta}?{urllib.parse.urlencode(datos)}")
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        try:
            cuerpo = json.load(e)
        except Exception:
            cuerpo = {}
        msg = cuerpo.get("error", {}).get("message", str(e))
        sys.exit(f"ERROR Graph API ({ruta}): {msg.replace(token, '***')}")


def cuenta(token):
    r = llamar("me", token, {"fields": "id,name,instagram_business_account{id,username}"})
    ig = r.get("instagram_business_account")
    if not ig:
        sys.exit(f"ERROR: la página «{r.get('name')}» no tiene cuenta de Instagram vinculada.")
    if ig.get("username") != CUENTA:
        sys.exit(f"ERROR: el token apunta a @{ig.get('username')}, no a @{CUENTA}. No se hace nada.")
    return r, ig


def leer_reel(carpeta):
    ruta = os.path.join(carpeta, "reel.json")
    if not os.path.isfile(ruta):
        sys.exit(f"ERROR: no existe {ruta}")
    reel = json.load(open(ruta, encoding="utf-8"))
    mp4 = None
    out = os.path.join(carpeta, "out")
    if os.path.isdir(out):
        mp4s = sorted(f for f in os.listdir(out) if f.endswith(".mp4"))
        mp4 = os.path.join(out, mp4s[-1]) if mp4s else None
    pie = reel.get("caption") or reel.get("descripcion") or reel.get("title") or os.path.basename(carpeta.rstrip("/"))
    return reel, mp4, pie


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("reel", help="carpeta reels/ID")
    ap.add_argument("--dry-run", action="store_true", help="comprueba y muestra qué haría (por defecto)")
    ap.add_argument("--publicar", action="store_true")
    ap.add_argument("--video-url", help="URL pública del MP4")
    ap.add_argument("--ok-jaime", action="store_true", help="confirma que Jaime ha dado el OK explícito")
    a = ap.parse_args()

    token = os.environ.get(VAR)
    if not token:
        sys.exit(f"ERROR: falta el secreto {VAR}.")
    pagina, ig = cuenta(token)
    reel, mp4, pie = leer_reel(a.reel)

    publicar = a.publicar and not a.dry_run
    print(f"Página:    {pagina['name']} ({pagina['id']})")
    print(f"Instagram: @{ig['username']} ({ig['id']})  ✔ coincide con @{CUENTA}")
    print(f"Reel:      {a.reel}  MP4: {mp4 or 'NO HAY (render pendiente)'}")
    print(f"Pie:       {pie}")

    if not publicar:
        print("DRY-RUN: no se ha publicado nada.")
        return
    if not a.ok_jaime:
        sys.exit("ERROR: falta --ok-jaime. Nada se publica sin el OK explícito de Jaime.")
    if not a.video_url:
        sys.exit("ERROR: falta --video-url (URL pública del MP4).")

    c = llamar(f"{ig['id']}/media", token, {"media_type": "REELS", "video_url": a.video_url, "caption": pie}, post=True)
    for _ in range(60):
        est = llamar(c["id"], token, {"fields": "status_code"}).get("status_code")
        if est == "FINISHED":
            break
        if est == "ERROR":
            sys.exit("ERROR: Instagram no ha podido procesar el vídeo.")
        time.sleep(5)
    else:
        sys.exit("ERROR: tiempo agotado procesando el vídeo.")
    p = llamar(f"{ig['id']}/media_publish", token, {"creation_id": c["id"]}, post=True)
    print(f"Publicado: {p.get('id')}")


if __name__ == "__main__":
    main()
