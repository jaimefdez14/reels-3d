"""Kokoro TTS for one phrase, without the HyperFrames plugin. Run it with the Kokoro venv's Python.

Usage: <venv>/bin/python kokoro_tts.py "<text>" <voice> <out.wav> [lang] [speed]
Model files (from github.com/thewh1teagle/kokoro-onnx, release model-files-v1.0) are read from
$KOKORO_DIR (default ~/.cache/hyperframes/tts): models/kokoro-v1.0.onnx and voices/voices-v1.0.bin.
Same settings the plugin used: voice em_alex, lang "es", speed 1.0, 24 kHz mono 16-bit WAV.
"""
import os, sys
import kokoro_onnx, soundfile as sf

text, voice, out = sys.argv[1], sys.argv[2], sys.argv[3]
lang = sys.argv[4] if len(sys.argv) > 4 else "es"
speed = float(sys.argv[5]) if len(sys.argv) > 5 else 1.0
base = os.environ.get("KOKORO_DIR", os.path.expanduser("~/.cache/hyperframes/tts"))
model = kokoro_onnx.Kokoro(os.path.join(base, "models", "kokoro-v1.0.onnx"), os.path.join(base, "voices", "voices-v1.0.bin"))
samples, sr = model.create(text, voice=voice, speed=speed, lang=lang)
sf.write(out, samples, sr, subtype="PCM_16")
