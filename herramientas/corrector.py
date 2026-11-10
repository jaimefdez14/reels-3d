#!/usr/bin/env python3
"""Corrector nativo (regla 19): python3 herramientas/corrector.py reels/ID

Imprime el encargo para un corrector que solo mira una cosa: si cada frase la diría así, en voz alta, una persona de
Madrid de 30 años. Se le da a un agente nuevo (uno por reel, sin contexto y sin la opinión de quien escribió). Va
ANTES del lector en frío (regla 18): primero que suene a España, luego que se entienda.
Lo que marque se cambia por su versión (o por otra que vuelva a pasar por un corrector nuevo); quien escribe no decide
que «está bien». Cada calco nuevo se apunta en docs/CASTELLANO.md. Informe en reels/ID/corrector.md.
"""
import json, re, sys
from pathlib import Path

d = Path(sys.argv[1]); r = json.loads((d / 'reel.json').read_text())
filas = []
for i, L in enumerate(r['lines']):
    voz = re.sub(r'\s+//?\s+', ' ', (L.get('say') or L['show'])).replace('*', '')
    filas.append(f'{i}. VOZ: {voz}')
    if L.get('bocadillo'):
        filas.append(f'   EN PANTALLA (bocadillo del personaje, no lo dice la voz): «{L["bocadillo"]}»')
guion = '\n'.join(filas)
print(f"""Eres corrector de guiones para vídeos cortos en castellano de España. No uses herramientas ni leas archivos: trabaja solo con el texto de abajo.

Tu único criterio: ¿lo diría así, en voz alta, una persona de Madrid de unos 30 años contándoselo a un amigo en un bar? No juzgas la estructura, el tema ni si se entiende: solo si suena a español nativo de España o suena a traducción, a libro de autoayuda, a escrito o a anuncio.

El guion es lo que dice un narrador (VOZ), frase a frase. Las líneas EN PANTALLA son bocadillos de un personaje: no los dice la voz, pero también tienen que sonar a cómo habla la gente de aquí.

{guion}

Responde en castellano:
1. Lista de TODAS las frases (VOZ o EN PANTALLA) que alguien de Madrid no diría así. Para cada una: número, la frase literal, por qué chirría (calco del inglés, expresión de autoayuda, demasiado escrita, palabra que aquí no se usa, orden raro, sujeto raro…) y cómo la diría esa persona, con las mismas ideas y una longitud parecida.
2. Si alguna frase de la VOZ es en realidad algo que dice o piensa un personaje (una cita) y rompe el hilo del narrador, márcala aparte.
3. Lista de frases que suenan perfectamente nativas (solo los números).
No suavices: si dudas, márcala. Máximo 450 palabras.""")
