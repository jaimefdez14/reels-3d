"""Publica un reel de esta marca en Instagram (@fase.zer0, página «Fase Zero») con la API de Meta.

Uso: python3 herramientas/publicar.py reels/ID --texto "…" [--video out/ID-blender.mp4] [--url URL_PÚBLICA_DEL_MP4] [--publicar]
Sin --publicar solo comprueba (cuenta, vídeo, texto) y no sube nada. Solo con el OK explícito de Jaime (regla 4).
Token: META_PAGE_TOKEN_3D (secreto del entorno; nunca el de la otra marca). Subida reanudable a rupload.facebook.com,
normalizando el MP4 antes (remux y, si Instagram lo rechaza, re-codificado conservador). Deja constancia en publicados.jsonl.
"""
import json, os, subprocess, sys, tempfile, time, urllib.error, urllib.parse, urllib.request

GRAPH = "https://graph.facebook.com/v21.0"
args = sys.argv[1:]; d = os.path.abspath(args[0])
opt = lambda k, v=None: args[args.index(k) + 1] if k in args else v
rid = os.path.basename(d); video = os.path.join(d, opt('--video', f'out/{rid}-blender.mp4')); texto = opt('--texto')
TOKEN = os.environ['META_PAGE_TOKEN_3D']


def api(metodo, ruta, datos=None):
    datos = dict(datos or {}, access_token=TOKEN); q = urllib.parse.urlencode(datos)
    req = urllib.request.Request(f"{GRAPH}/{ruta}" + (f"?{q}" if metodo == "GET" else ""), data=None if metodo == "GET" else q.encode(), method=metodo)
    try:
        return json.load(urllib.request.urlopen(req, timeout=120))
    except urllib.error.HTTPError as e:
        sys.exit(f"Meta {e.code}: {e.read().decode(errors='replace')[:400]}")


cuenta = api("GET", "me", {"fields": "name,instagram_business_account{id,username}"})
ig = cuenta["instagram_business_account"]; print("cuenta:", ig["username"], "· página:", cuenta["name"])
assert os.path.exists(video), f"no existe {video}"
assert texto, "falta --texto"
print("vídeo:", video, f"{os.path.getsize(video) / 1e6:.1f} MB"); print("texto:", texto)
if '--publicar' not in args: sys.exit("simulacro: no se ha subido nada (añade --publicar)")

ajustes = [("remux", ["-c", "copy", "-movflags", "+faststart"]),
           ("re-codificado", ["-c:v", "libx264", "-profile:v", "high", "-level", "4.1", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p",
                              "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-g", "60", "-keyint_min", "60",
                              "-sc_threshold", "0", "-x264-params", "open-gop=0", "-c:a", "aac", "-b:a", "128k", "-ar", "44100", "-ac", "2",
                              "-movflags", "+faststart", "-map_metadata", "-1"])]
url = opt('--url')  # URL pública del MP4: la subida directa a rupload falla a menudo con ProcessingFailedError (08-11, N1)
for n, (nombre, fa) in enumerate([] if url else ajustes):
    tmp = os.path.join(tempfile.mkdtemp(prefix="reel-"), f"{rid}.mp4")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", video, *fa, tmp], check=True); tam = os.path.getsize(tmp)
    c = api("POST", f"{ig['id']}/media", {"media_type": "REELS", "upload_type": "resumable", "caption": texto, "share_to_feed": "true"})
    print(f"contenedor {c['id']}, subiendo {tam / 1e6:.1f} MB ({nombre})…")
    req = urllib.request.Request(c["uri"], data=open(tmp, "rb").read(), method="POST", headers={
        "Authorization": f"OAuth {TOKEN}", "offset": "0", "file_size": str(tam), "Content-Type": "application/octet-stream"})
    try:
        urllib.request.urlopen(req, timeout=600).read(); break
    except urllib.error.HTTPError as e:
        cuerpo = e.read().decode(errors="replace")[:400]
        if e.code == 400 and "ProcessingFailedError" in cuerpo and n + 1 < len(ajustes):
            print(f"Instagram rechazó el {nombre}; pruebo con el re-codificado"); continue
        sys.exit(f"subida HTTP {e.code}: {cuerpo} (contenedor sin vídeo; caduca solo, no se ha publicado nada)")
if url:
    c = api("POST", f"{ig['id']}/media", {"media_type": "REELS", "video_url": url, "caption": texto, "share_to_feed": "true"})
    print(f"contenedor {c['id']} por URL pública")
for _ in range(72):
    st = api("GET", c["id"], {"fields": "status_code,status"})
    if st.get("status_code") == "FINISHED": break
    if st.get("status_code") in ("ERROR", "EXPIRED"): sys.exit(f"Instagram rechazó el vídeo: {st.get('status')}")
    time.sleep(5)
else:
    sys.exit("tiempo agotado esperando a Instagram (contenedor sin publicar)")
m = api("POST", f"{ig['id']}/media_publish", {"creation_id": c["id"]})
link = api("GET", m["id"], {"fields": "permalink"}).get("permalink")
with open(os.path.join(os.path.dirname(os.path.dirname(d)), "publicados.jsonl"), "a") as g:
    g.write(json.dumps({"reel": rid, "cuenta": ig["username"], "media_id": m["id"], "permalink": link, "texto": texto,
                        "fecha": time.strftime("%Y-%m-%d %H:%M:%S")}, ensure_ascii=False) + "\n")
print("publicado:", link)
