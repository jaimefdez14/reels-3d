"""Monta la composición de un reel: python3 motor/build.py reels/<ID> [--sim]

Lee reels/<ID>/reel.json (guion: lines[{show, say, hi, neg, voice, pause}]), reels/<ID>/shots3d.js (escena)
y reels/<ID>/timing.json (tiempos de cada palabra, de la voz). Si no hay timing.json o se pasa --sim, simula los
tiempos (2,2 palabras/s con pausas) para bocetos sin voz. Escribe reels/<ID>/composition/index.html, que las
herramientas abren con Playwright (window.ready, window.seek, #cv).
"""
import json, os, re, sys

reel_dir = os.path.abspath(sys.argv[1]); sim = '--sim' in sys.argv
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
reel = json.load(open(os.path.join(reel_dir, 'reel.json')))
shots = open(os.path.join(reel_dir, 'shots3d.js')).read()
tpath = os.path.join(reel_dir, 'timing.json')


def simulate(lines):
    t = 0.6; words = []
    for L in lines:
        toks = (L.get('say') or L['show']).split(); row = []
        for w in toks:
            d = 0.12 + 0.04 * len(re.sub(r'[^\wáéíóúüñ]', '', w))
            row.append([round(t, 3), round(t + d, 3)]); t += d + 0.06
            if w.endswith((',', ';')): t += 0.3
        words.append(row); t += L.get('pause', 0.6)
    return {'words': words, 'duration': round(t + 1.2, 2), 'simulado': True}


if sim or not os.path.exists(tpath):
    timing = simulate(reel['lines'])
    if sim: print('timing simulado:', timing['duration'], 's')
else:
    timing = json.load(open(tpath))
for i, row in enumerate(timing['words']):  # el guion y los tiempos deben tener las mismas palabras
    n = len((reel['lines'][i].get('say') or reel['lines'][i]['show']).split())
    assert len(row) == n, f'frase {i}: {n} palabras en el guion, {len(row)} en timing.json'

rel = os.path.relpath(os.path.join(root, 'motor'), os.path.join(reel_dir, 'composition'))
html = f"""<!doctype html><html><head><meta charset="utf-8"><title>{reel['id']}</title>
<style>
@font-face{{font-family:NotoCond;src:url({rel}/fonts/NotoSerifDisplay-ExtraCondensedBlack.woff2) format('woff2');font-weight:900}}
@font-face{{font-family:Montserrat;src:url({rel}/fonts/Montserrat-Regular.woff2) format('woff2');font-weight:400}}
@font-face{{font-family:Montserrat;src:url({rel}/fonts/Montserrat-SemiBold.woff2) format('woff2');font-weight:600}}
html,body{{margin:0;background:#222}} #cv{{width:540px;height:960px;display:block}}
</style></head><body><canvas id="cv"></canvas>
<script>var module={{exports:{{}}}},exports=module.exports;</script>
<script src="{rel}/vendor/three.cjs"></script>
<script>window.THREE=module.exports;</script>
<script src="{rel}/vendor/text.js"></script>
<script>window.FONT_JSON={open(os.path.join(root,"motor","fonts","helvetiker_bold.typeface.json")).read()};</script>
<script>window.REEL={json.dumps(reel, ensure_ascii=False)};window.TIMING={json.dumps(timing)};</script>
<script>
const SHOTS={{actors:{{}},props:[],cam:[],moves:{{}},invert:[]}};
const TIMING=window.TIMING, REEL=window.REEL;
</script>
<script src="{rel}/engine.js"></script>
<script>
{shots}
</script>
</body></html>"""
os.makedirs(os.path.join(reel_dir, 'composition'), exist_ok=True)
open(os.path.join(reel_dir, 'composition', 'index.html'), 'w').write(html)
print('composition/index.html listo,', timing['duration'], 's', '(simulado)' if timing.get('simulado') else '')
