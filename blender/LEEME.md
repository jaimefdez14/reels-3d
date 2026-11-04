# Prueba de Blender (04-11-2026)

Jaime: «definitivamente tenemos algo mal… creo que es algo crítico el motor que hay por debajo… la diferencia con los
ejemplos es demasiado grande». Prueba: el mismo plano de la referencia (dos protagonistas, multitud, rejilla) hecho
en Blender 5.2 (`pip install bpy==5.2.3` en `/root/blender-venv`) con `prueba.py`.

- **Cycles (trazado de rayos) + Freestyle (líneas de silueta):** da el aspecto de la referencia: trazo de dibujo,
  sombreado suave, sombras de contacto y oclusión ambiental. Tiempos en esta máquina (4 núcleos, sin GPU):
  15 s por fotograma a 540x960 y 32 muestras; 34 s a 1080x1920 y 8 muestras; 15 s a 720x1280 (la resolución de
  los originales) y 8 muestras con rebotes reducidos. Un reel de 55 s a 30 fps = 1.650 fotogramas ≈ 7 h.
- **EEVEE** (rasterizado): funciona por software tras `apt-get install libegl1 libgl1-mesa-dri libegl-mesa0`,
  pero tarda 90 s por fotograma a 1080 (no hay GPU): no compensa aquí. Con una GPU serían segundos.
- **Workbench:** rápido, pero sin Freestyle y con un aspecto plano; no se parece.
- El contorno por «casco invertido» (Solidify + Backfacing) pinta el cuerpo de negro en Cycles; se usa Freestyle.

Conclusión: el aspecto de la referencia es de un programa 3D de verdad (luz global, líneas de dibujo), no de un
renderizador de navegador. Ver la propuesta a Jaime en el chat del 04-11.
