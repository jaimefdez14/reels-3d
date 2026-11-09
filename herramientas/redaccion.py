#!/usr/bin/env python3
"""Comprobador de redacción de un guion (docs/REDACCION.md).

Uso: python3 herramientas/redaccion.py reels/ID   → imprime «ok» o la lista de avisos y sale con código 1.

Comprueba lo que se puede contar: conectores de pegamento al empezar, calcos y muletillas, jerga y
latinoamericanismos, comillas inglesas, paréntesis y rayas, longitud de titulares, puntos suspensivos,
amarillo y rojo en la misma línea, objeción con «Estás pensando:» hacia la mitad, cierres prohibidos y envío final.
No ve el hilo ni el orden de las palabras: eso se revisa leyendo en voz alta.
"""
import json, re, sys
from pathlib import Path

PEGAMENTO = ['pero', 'sin embargo', 'en cambio', 'además', 'por otro lado', 'cabe destacar',
             'es importante saber', 'es importante', 'ahora bien', '¿y lo de']
CALCOS = {
    r'\bes por eso que\b': 'por eso', r'\bfue ahí que\b': 'fue ahí donde', r'\blo que pasa es que\b': 'dilo directamente',
    r'\besto es lo que pasa\b': 'lo curioso es esto / nada', r'\baquí está la cosa\b': 'lo curioso es esto / nada',
    r'\bhace \w+ \w+ atrás\b': 'sin «atrás»', r'\bser capaz de\b': 'poder', r'\btomar ventaja\b': 'aprovechar',
    r'\bhacer una decisión\b': 'tomar una decisión', r'\ben base a\b': 'según / con', r'\ba nivel de\b': 'en / con',
    r'\bjugar un rol\b': 'tener un papel', r'\benfocar(se|te)? en\b': 'centrarse en', r'\beventualmente\b': 'al final',
    r'\bactualmente\b': '¿«en realidad»?', r'\bmasiv[oa]s?\b': 'enorme', r'\bdramátic[oa]\b': 'drástico',
    r'\bagresiv[oa]\b': 'ambicioso', r'\basum(o|es|e|imos|en|ir)\b': 'suponer / dar por hecho', r'\baplicar a\b': 'solicitar',
    r'\breport(ar|a|o)\b': 'informar / avisar', r'\b(fue|fueron|es|son|será) \w+(ado|ada|ados|adas|ido|ida|idos|idas) por\b': 'pasiva con «ser»',
    r'\b(tus|sus|mis) (ojos|manos|dientes|pelo|brazos|piernas)\b': 'sin posesivo con el cuerpo',
}
MULETILLAS = ['literalmente', 'básicamente', 'honestamente', 'spoiler', 'plot twist', 'lo que nadie te cuenta',
              '¿sabías que', 'déjame explicarte', 'quédate hasta el final', 'te va a volar la cabeza']
JERGA = ['tío', 'tía', 'bro', 'flipar', 'flipas', 'flipante', 'mola', 'molan', 'platicar', 'checar', 'ahorita',
         'plata', 'computadora', 'celular', 'agendar']
CIERRE_MAL = ['tu tarea', 'recuerda que', 'qué opinas', 'sígueme']
ENVIO = ('envíaselo', 'mándaselo', 'compártelo', 'guárdalo', 'pásaselo')


def avisos(reel):
    out, lines = [], reel['lines']
    n = len(lines)
    susp = 0
    for i, L in enumerate(lines):
        for campo in ('show', 'say'):
            s = L.get(campo)
            if not s:
                continue
            low = s.lower()
            q = f'{i} [{campo}] «{s}»' if '«' not in s else f'{i} [{campo}] {s}'
            if campo == 'show' and len(s) > 45:
                out.append(f'{q}: {len(s)} caracteres (máx. 45)')
            arr = re.sub(r'^[«“"\s]+', '', low)
            for p in PEGAMENTO:
                if arr.startswith(p + ' ') or arr.startswith(p + ',') or arr == p:
                    out.append(f'{q}: empieza por «{p}»; reescribe para que retome la frase anterior')
            for frase in re.split(r'(?<=[.:;?!])\s+', low)[1:]:
                f = re.sub(r'^[«“"\s]+', '', frase)
                for p in PEGAMENTO:
                    if f.startswith(p + ' ') or f.startswith(p + ','):
                        out.append(f'{q}: una frase empieza por «{p}»')
            for pat, alt in CALCOS.items():
                if re.search(pat, low):
                    out.append(f'{q}: calco ({re.search(pat, low).group(0)}) → {alt}')
            for m in MULETILLAS:
                if m in low:
                    out.append(f'{q}: muletilla «{m}»')
            for j in JERGA:
                if re.search(r'\b' + re.escape(j) + r'\b', low):
                    out.append(f'{q}: jerga o latinoamericano «{j}»')
            for c in CIERRE_MAL:
                if c in low:
                    out.append(f'{q}: cierre prohibido «{c}»')
            if re.search(r'["“”]', s) and '«' not in s:
                out.append(f'{q}: comillas inglesas; usa «…»')
            if re.search(r'[()]|—|–| - ', s):
                out.append(f'{q}: paréntesis o raya (no se oyen)')
            if re.search(r'\d\.\d{1,2}\b(?!\d)', s) or re.search(r'\d,\d{3}\b', s):
                out.append(f'{q}: decimales con coma y miles con punto')
            if re.search(r'\d[€%]', s):
                out.append(f'{q}: espacio antes de € y %')
            if campo == 'show':
                susp += s.count('…') + s.count('...')
        if L.get('hi') and L.get('neg'):
            out.append(f'{i}: amarillo y rojo en la misma línea')
    if susp > 1:
        out.append(f'{susp} puntos suspensivos (máx. 1 por vídeo)')
    obj = [i for i, L in enumerate(lines) if (L.get('voice') or '').lower().startswith('estás pensando')]
    if not obj:
        out.append('no hay objeción con «Estás pensando:»')
    elif not any(0.30 <= i / max(n - 1, 1) <= 0.70 for i in obj):
        out.append(f'la objeción está en la línea {obj[0]} de {n}; va hacia la mitad (35-65 %)')
    if not any('«' in (L.get('show') or '') for L in lines):
        out.append('no hay frase literal entrecomillada')
    ultima = (lines[-1].get('show') or '').lower()
    if not ultima.startswith(ENVIO):
        out.append(f'la última línea no es un envío («Envíaselo a…», «Mándaselo a…»): «{lines[-1].get("show")}»')
    return out


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    reel = json.loads((Path(sys.argv[1]) / 'reel.json').read_text())
    a = avisos(reel)
    if not a:
        print('ok')
        return
    print('\n'.join(a))
    sys.exit(1)


if __name__ == '__main__':
    main()
