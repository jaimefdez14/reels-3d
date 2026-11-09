#!/usr/bin/env python3
"""Lector en frío (regla 18): python3 herramientas/lector.py reels/ID

Imprime el encargo para un revisor que NO ha visto el reel: solo lo que dice la voz, sin imágenes, sin subtítulos,
sin el resto de la conversación. Se le da a un agente nuevo (Agent, uno por reel, sin contexto y sin la opinión de
quien escribió el guion). Su informe se guarda en reels/ID/lector.md y el guion no pasa a la voz hasta que:
  - el lector resume el vídeo en una frase y coincide con la idea del guion;
  - no marca ninguna frase que no se entienda solo oyendo la voz (las que marque se reescriben o se justifican);
  - pone 8 o más a «lo entendería alguien que solo oye la voz».
Después de reescribir, se vuelve a pasar con un lector nuevo (otro agente), no con el mismo.
"""
import json, re, sys
from pathlib import Path

d = Path(sys.argv[1]); r = json.loads((d / 'reel.json').read_text())
voz = ' '.join(re.sub(r'\s+//?\s+', ' ', (L.get('say') or L['show'])).replace('*', '') for L in r['lines'])
try:
    dur = round(json.loads((d / 'timing.json').read_text())['duration'])
except Exception:
    dur = 55
print(f"""Eres un lector en frío para un guion de vídeo corto (Instagram Reels, ~{dur} s). No uses herramientas ni leas archivos: trabaja solo con el texto de abajo.

Ponte en la piel de esta persona: vive en Madrid, 30 años, lista, no sabe nada del tema, va con el dedo listo para pasar al siguiente vídeo. Oye esta voz UNA vez, de corrido, sin ver imágenes ni subtítulos. No puede volver atrás.

Texto que dice la voz:
«{voz}»

Responde en castellano, con honestidad y sin suavizar (si no lo entenderías, dilo):
1. En una frase: ¿de qué va el vídeo y qué te llevas? Si no lo sabrías decir, dilo.
2. Frase a frase (o por bloques): qué entiendes exactamente. Marca cada punto donde te pierdes, donde algo no tiene referente claro, donde hay un salto lógico, donde algo se contradice o donde una frase solo se entiende si ves la imagen.
3. El gancho (las dos primeras frases): ¿te hace quedarte? ¿Sabes a quién va dirigido? ¿El vídeo cumple lo que promete?
4. ¿En qué segundo aproximado dejarías de ver y por qué?
5. Las 3-5 frases concretas que más fallan, citadas literalmente, con el porqué. No reescribas el guion entero; como mucho, una propuesta corta por frase.
6. Nota de 1 a 10 a «lo entendería alguien que solo oye la voz».
Máximo 400 palabras.""")
