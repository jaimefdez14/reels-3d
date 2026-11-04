# Render de la capa de objetos en Blender: /root/blender-venv/bin/python blender/render.py reels/ID [desde] [hasta] [ancho] [muestras]
# Lee reels/ID/blender/escena.json y estado.bin (de exportar.js) y escribe reels/ID/blender/r/f_XXXXX.png (RGBA:
# personajes y objetos con luz de Cycles, líneas Freestyle en el protagonista y sus sombras sobre fondo transparente).
# Se puede cortar y relanzar: salta los fotogramas ya hechos.
import bpy, json, math, os, sys, time, base64, tempfile
import numpy as np
from mathutils import Matrix
d = os.path.abspath(sys.argv[1]); B = os.path.join(d, 'blender'); esc = json.load(open(os.path.join(B, 'escena.json')))
F0 = int(sys.argv[2]) if len(sys.argv) > 2 else 0; F1 = int(sys.argv[3]) if len(sys.argv) > 3 else esc['frames']; W = int(sys.argv[4]) if len(sys.argv) > 4 else 720; SAMPLES = int(sys.argv[5]) if len(sys.argv) > 5 else 8
os.makedirs(os.path.join(B, 'r'), exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True); sc = bpy.context.scene
def lin(h):
    h = h.lstrip('#'); c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]; return tuple(x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c) + (1.0,)
C = Matrix(((1, 0, 0, 0), (0, 0, -1, 0), (0, 1, 0, 0), (0, 0, 0, 1)))  # Three.js (Y arriba) -> Blender (Z arriba)
LINEAS = bpy.data.collections.new('contorno'); sc.collection.children.link(LINEAS)
mats = {}
def material(m):
    key = (m['color'], m['basic'], bool(m['map']), round(m['opacity'], 3))
    if key in mats and not m['map']: return mats[key]
    mt = bpy.data.materials.new('m'); mt.use_nodes = True; nt = mt.node_tree; bs = nt.nodes['Principled BSDF']
    bs.inputs['Base Color'].default_value = lin(m['color']); bs.inputs['Roughness'].default_value = 0.9; bs.inputs['Specular IOR Level'].default_value = 0.0
    if m['basic']: bs.inputs['Emission Color'].default_value = lin(m['color']); bs.inputs['Emission Strength'].default_value = 1.0
    if m['map']:
        fd, pth = tempfile.mkstemp(suffix='.png'); os.write(fd, base64.b64decode(m['map'].split(',')[1])); os.close(fd)
        tx = nt.nodes.new('ShaderNodeTexImage'); tx.image = bpy.data.images.load(pth); nt.links.new(tx.outputs['Color'], bs.inputs['Base Color'])
        if m['basic']: nt.links.new(tx.outputs['Color'], bs.inputs['Emission Color'])
    if m['opacity'] < 0.999: bs.inputs['Alpha'].default_value = m['opacity']
    mats[key] = mt; return mt
meshes_bl = {}; objs = []
for i, m in enumerate(esc['meshes']):
    g = esc['geos'][m['geo']]
    if m['geo'] not in meshes_bl:
        P = np.array(g['pos'], np.float32).reshape(-1, 3); I = np.array(g['idx'], np.int32).reshape(-1, 3) if g['idx'] else np.arange(len(P), dtype=np.int32).reshape(-1, 3)
        me = bpy.data.meshes.new('g'); me.from_pydata(P.tolist(), [], I.tolist())
        if g['uv']:
            UV = np.array(g['uv'], np.float32).reshape(-1, 2); ul = me.uv_layers.new(); ul.data.foreach_set('uv', UV[I.ravel()].ravel())
        me.shade_smooth()
        if g['nor']:
            N = np.array(g['nor'], np.float32).reshape(-1, 3); me.normals_split_custom_set_from_vertices(N.tolist())
        meshes_bl[m['geo']] = me
    ob = bpy.data.objects.new('o%d' % i, meshes_bl[m['geo']]); ob.data.materials.append(material(m))
    (LINEAS if m.get('lines', m['hero']) else sc.collection).objects.link(ob); objs.append(ob)
# suelo que solo recoge sombras (el suelo con rejilla lo pone la capa bg)
bpy.ops.mesh.primitive_plane_add(size=400); fl = bpy.context.object; fl.is_shadow_catcher = True
# luz: cielo blanco + sol suave
w = bpy.data.worlds.new('mundo'); sc.world = w; w.use_nodes = True; BG = w.node_tree.nodes['Background']; BG.inputs[0].default_value = (1, 1, 1, 1); BG.inputs[1].default_value = 0.4
bpy.ops.object.light_add(type='SUN'); sun = bpy.context.object; sun.data.energy = 3.4; sun.data.angle = math.radians(35); sun.rotation_euler = (math.radians(48), 0, math.radians(-32))
bpy.ops.object.camera_add(); cam = bpy.context.object; sc.camera = cam; cam.data.sensor_fit = 'VERTICAL'
sc.render.engine = 'CYCLES'; sc.cycles.device = 'CPU'; sc.cycles.samples = SAMPLES; sc.cycles.use_denoising = True; sc.cycles.denoiser = 'OPENIMAGEDENOISE'
sc.cycles.max_bounces = 3; sc.cycles.diffuse_bounces = 2; sc.cycles.glossy_bounces = 0; sc.cycles.transmission_bounces = 0; sc.cycles.transparent_max_bounces = 4
sc.render.film_transparent = True; sc.render.resolution_x = W; sc.render.resolution_y = int(W * 16 / 9); sc.view_settings.view_transform = 'Standard'; sc.view_settings.exposure = float(os.environ.get('EXPO', '-0.9'))
sc.render.image_settings.file_format = 'PNG'; sc.render.image_settings.color_mode = 'RGBA'; sc.render.use_persistent_data = True
sc.render.use_freestyle = True; sc.render.line_thickness_mode = 'ABSOLUTE'
vl = sc.view_layers[0]; vl.use_freestyle = True; fs = vl.freestyle_settings
for l in list(fs.linesets): fs.linesets.remove(l)
ls = fs.linesets.new('contorno'); ls.select_by_collection = True; ls.collection = LINEAS; ls.select_silhouette = True; ls.select_border = True; ls.select_crease = False; ls.select_external_contour = True
ls.linestyle.color = lin('#2a292c')[:3]; ls.linestyle.thickness = 2.0 * W / 720
N = len(objs); per = 1 + 8 + 17 * N; raw = np.memmap(os.path.join(B, 'estado.bin'), dtype=np.float32, mode='r')
t0 = time.time(); hechos = 0
for f in range(F0, F1):
    outp = os.path.join(B, 'r', 'f_%05d.png' % f)
    if os.path.exists(outp): continue
    row = raw[f * per:(f + 1) * per]
    if len(row) < per or not row.any(): print('sin estado', f); break
    inv = float(row[0]); BG.inputs[1].default_value = 0.4 - 0.15 * inv
    p, q, fov = row[1:4], row[4:8], float(row[8])
    from mathutils import Quaternion, Vector
    cm = Matrix.Translation(Vector(p)) @ Quaternion((q[3], q[0], q[1], q[2])).to_matrix().to_4x4(); cam.matrix_world = C @ cm; cam.data.angle = math.radians(fov)
    for i, ob in enumerate(objs):
        e = row[9 + i * 17:9 + (i + 1) * 17]; vis = e[0] > 0.5; ob.hide_render = not vis
        if vis: ob.matrix_world = C @ Matrix(np.array(e[1:], np.float64).reshape(4, 4).T.tolist())
    sc.render.filepath = outp; bpy.ops.render.render(write_still=True); hechos += 1
    print('fotograma', f, round((time.time() - t0) / hechos, 1), 's/fot', flush=True)
