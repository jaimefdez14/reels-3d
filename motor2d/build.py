"""Monta la composición de un reel del estilo B: python3 motor2d/build.py reels/<ID> [--sim]

Lee reels/<ID>/reel.json (lines[{show, say?, pause?, hold?, subY?, estilo?}]; en `show`, « / » separa subtítulos y
*así* marca la parte amarilla), reels/<ID>/escena.js (API E.* de motor2d/engine2d.js) y reels/<ID>/timing.json.
Sin timing.json o con --sim, simula los tiempos. Escribe reels/<ID>/composition/index.html.
"""
import json, os, re, sys

reel_dir = os.path.abspath(sys.argv[1]); sim = '--sim' in sys.argv
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
reel = json.load(open(os.path.join(reel_dir, 'reel.json')))
escena = open(os.path.join(reel_dir, 'escena.js')).read()
tpath = os.path.join(reel_dir, 'timing.json')


def hablado(L):  # texto que se dice: sin marcas de subtítulo
    return re.sub(r'\s+//?\s+', ' ', L.get('say') or L['show']).replace('*', '')


def simulate(lines):
    t = 0.5; words = []
    for i, L in enumerate(lines):
        row = []
        for w in hablado(L).split():
            d = 0.1 + 0.035 * len(re.sub(r'[^\wáéíóúüñ]', '', w))
            row.append([round(t, 3), round(t + d, 3)]); t += d + 0.04
            if w.endswith((',', ';', ':')): t += 0.22
        words.append(row); t += L.get('pause', 0.45)
    return {'words': words, 'duration': round(t + 1.0, 2), 'simulado': True}


if sim or not os.path.exists(tpath):
    timing = simulate(reel['lines'])
    print('timing simulado:', timing['duration'], 's')
else:
    timing = json.load(open(tpath))
for i, row in enumerate(timing['words']):
    n = len(hablado(reel['lines'][i]).split())
    assert len(row) == n, f'frase {i}: {n} palabras en el guion, {len(row)} en timing.json'

rel = os.path.relpath(os.path.join(root, 'motor2d'), os.path.join(reel_dir, 'composition'))
fonts = ''.join(f"@font-face{{font-family:Inter;src:url({rel}/fonts/{f}.otf);font-weight:{w};font-style:{s}}}\n"
                for f, w, s in [('Inter-Regular', 400, 'normal'), ('Inter-Medium', 500, 'normal'), ('Inter-SemiBold', 600, 'normal'),
                                ('Inter-SemiBoldItalic', 600, 'italic'), ('Inter-Bold', 700, 'normal')])
html = f"""<!doctype html><html><head><meta charset="utf-8"><title>{reel['id']}</title>
<style>{fonts}html,body{{margin:0;background:#000}} #cv{{width:540px;height:960px;display:block}}</style></head>
<body><canvas id="cv"></canvas>
<script>window.REEL={json.dumps(reel, ensure_ascii=False)};window.TIMING={json.dumps(timing)};</script>
<script src="{rel}/engine2d.js"></script>
<script>
{escena}
</script>
<script>E.__start();</script>
</body></html>"""
os.makedirs(os.path.join(reel_dir, 'composition'), exist_ok=True)
open(os.path.join(reel_dir, 'composition', 'index.html'), 'w').write(html)
print('composition/index.html listo,', timing['duration'], 's', '(simulado)' if timing.get('simulado') else '')
