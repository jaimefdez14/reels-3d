# Prueba de render con Blender (Cycles en CPU): el plano de dos protagonistas con multitud de la referencia.
# /root/blender-venv/bin/python blender/prueba.py salida.png [ancho] [muestras]
import bpy, bmesh, math, sys, random, time
out = sys.argv[1]; W = int(sys.argv[2]) if len(sys.argv) > 2 else 540; SAMPLES = int(sys.argv[3]) if len(sys.argv) > 3 else 32
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
def hexcol(h, a=1.0): h = h.lstrip('#'); c = [int(h[i:i+2], 16) / 255 for i in (0, 2, 4)]; c = [x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c]; return (*c, a)
def mat(name, col, rough=0.8, emit=None):
    m = bpy.data.materials.new(name); m.use_nodes = True; b = m.node_tree.nodes['Principled BSDF']; b.inputs['Base Color'].default_value = hexcol(col); b.inputs['Roughness'].default_value = rough
    if emit: b.inputs['Emission Color'].default_value = hexcol(emit); b.inputs['Emission Strength'].default_value = 1.0
    return m
def outline_mat():
    m = bpy.data.materials.new('contorno'); m.use_nodes = True; nt = m.node_tree; nt.nodes.clear()
    o = nt.nodes.new('ShaderNodeOutputMaterial'); mix = nt.nodes.new('ShaderNodeMixShader'); geo = nt.nodes.new('ShaderNodeNewGeometry'); tr = nt.nodes.new('ShaderNodeBsdfTransparent'); em = nt.nodes.new('ShaderNodeEmission'); em.inputs[0].default_value = hexcol('#2a292c')
    nt.links.new(geo.outputs['Backfacing'], mix.inputs[0]); nt.links.new(tr.outputs[0], mix.inputs[1]); nt.links.new(em.outputs[0], mix.inputs[2]); nt.links.new(mix.outputs[0], o.inputs[0]); return m
LINEAS = bpy.data.collections.new('contorno'); sc.collection.children.link(LINEAS)
def add_outline(ob, th=None):
    if ob.name not in LINEAS.objects: LINEAS.objects.link(ob)
def revolve(name, prof, seg=48):
    me = bpy.data.meshes.new(name); bm = bmesh.new(); rings = []
    for (r, y) in prof:
        ring = [bm.verts.new((r * math.cos(2 * math.pi * k / seg), r * math.sin(2 * math.pi * k / seg), y)) for k in range(seg)] if r > 1e-4 else [bm.verts.new((0, 0, y))]
        rings.append(ring)
    for a, b in zip(rings, rings[1:]):
        if len(a) == 1: [bm.faces.new((a[0], b[k], b[(k + 1) % seg])) for k in range(seg)]
        elif len(b) == 1: [bm.faces.new((a[k], a[(k + 1) % seg], b[0])) for k in range(seg)]
        else: [bm.faces.new((a[k], a[(k + 1) % seg], b[(k + 1) % seg], b[k])) for k in range(seg)]
    bm.normal_update(); bm.to_mesh(me); bm.free(); ob = bpy.data.objects.new(name, me); sc.collection.objects.link(ob)
    for p in me.polygons: p.use_smooth = True
    return ob
def body_profile(h=1.6, w=0.5):
    H = h * 0.74; rT, rB = w * 0.4, w * 0.3; P = [(0, 0), (rB - 0.025, 0), (rB, 0.025)]
    P += [(rB + (rT - rB) * (i / 6) ** 0.8, 0.025 + (H - rT - 0.025) * i / 6) for i in range(1, 7)]
    P += [(rT * math.cos(i / 12 * math.pi / 2), H - rT + rT * math.sin(i / 12 * math.pi / 2)) for i in range(1, 13)]
    return P, H, rT
def person(x, y, rot, kind='hero', h=1.6):
    P, H, rT = body_profile(h); col = {'hero': '#fafafa', 'other': '#46474e', 'crowd': '#c4c5ca'}[kind]
    M = mat(kind, col, 0.85); b = revolve(kind + '_cuerpo', [P[0]] + P[1:]); b.data.materials.append(M)
    hr = rT * 0.88
    if kind == 'other':
        bpy.ops.mesh.primitive_cube_add(size=1); hd = bpy.context.object; hd.scale = (hr * 2.05, hr * 1.7, hr * 1.9); bpy.ops.object.transform_apply(scale=True); bv = hd.modifiers.new('bv', 'BEVEL'); bv.width = hr * 0.45; bv.segments = 6; hd.data.materials.append(mat('cara', '#2b2b2f', 0.6))
        for p in hd.data.polygons: p.use_smooth = True
        for sx in (-1, 1):
            bpy.ops.mesh.primitive_uv_sphere_add(radius=hr * 0.09, location=(sx * hr * 0.32, -hr * 0.86, hr * 0.12)); e = bpy.context.object; e.data.materials.append(mat('ojo', '#ffffff', 0.4, '#ffffff')); e.parent = hd
    else:
        bpy.ops.mesh.primitive_uv_sphere_add(radius=hr, segments=48, ring_count=24); hd = bpy.context.object; hd.data.materials.append(M); bpy.ops.object.shade_smooth()
    hd.location = (0, 0, H + 0.055 + hr); hd.parent = b
    if kind == 'hero':
        add_outline(b); add_outline(hd)
        bpy.ops.mesh.primitive_uv_sphere_add(radius=hr * 0.09, location=(hr * 0.55, -hr * 0.8, H + 0.055 + hr * 1.15)); e = bpy.context.object; e.data.materials.append(mat('ojo2', '#2a292c', 0.5)); e.parent = b
        cu = bpy.data.curves.new('brazo', 'CURVE'); cu.dimensions = '3D'; cu.bevel_depth = 0.03; cu.bevel_resolution = 6; sp = cu.splines.new('BEZIER'); pts = [(rT * 0.62, -rT * 0.78, H - rT * 0.7), (rT * 1.37, -rT * 0.8, H - rT * 0.7 - H * 0.19), (rT * 0.82, -rT * 0.83, H - rT * 0.7 - H * 0.37)]
        sp.bezier_points.add(len(pts) - 1)
        for bp, p in zip(sp.bezier_points, pts): bp.co = p; bp.handle_left_type = bp.handle_right_type = 'AUTO'
        arm = bpy.data.objects.new('brazo', cu); sc.collection.objects.link(arm); arm.data.materials.append(M); arm.parent = b
        bpy.context.view_layer.objects.active = arm; arm.select_set(True); bpy.ops.object.convert(target='MESH'); arm = bpy.context.object; add_outline(arm, 0.014)
    b.location = (x, y, 0); b.rotation_euler = (0, 0, math.radians(rot)); return b
# suelo con rejilla y cruces (textura generada)
import numpy as np
N = 1024; img = np.ones((N, N, 4), np.float32); bg = np.array(hexcol('#f6f6f7')); img[:] = bg
line = np.array(hexcol('#e4e4e8')); cross = np.array(hexcol('#b8b8be'))
for i in range(0, N, 128): img[i:i + 2, :] = line; img[:, i:i + 2] = line
for i in range(0, N, 256):
    for j in range(0, N, 256): img[max(0, i - 1):i + 3, max(0, j - 14):j + 16] = cross; img[max(0, i - 14):i + 16, max(0, j - 1):j + 3] = cross
im = bpy.data.images.new('rejilla', N, N); im.pixels = img.ravel()
fm = bpy.data.materials.new('suelo'); fm.use_nodes = True; nt = fm.node_tree; b = nt.nodes['Principled BSDF']; b.inputs['Roughness'].default_value = 1
tx = nt.nodes.new('ShaderNodeTexImage'); tx.image = im; tx.interpolation = 'Cubic'; mp = nt.nodes.new('ShaderNodeMapping'); mp.inputs['Scale'].default_value = (12, 12, 1); tc = nt.nodes.new('ShaderNodeTexCoord')
nt.links.new(tc.outputs['UV'], mp.inputs[0]); nt.links.new(mp.outputs[0], tx.inputs[0]); nt.links.new(tx.outputs[0], b.inputs['Base Color'])
bpy.ops.mesh.primitive_plane_add(size=60); fl = bpy.context.object; fl.data.materials.append(fm)
# escena: dos protagonistas frente a frente y multitud detrás
person(-0.55, 0, 90, 'hero'); person(0.55, 0, -90, 'hero')
random.seed(4)
for k in range(26):
    x, y = random.uniform(-5, 5), random.uniform(1.6, 7)
    person(x, y, random.uniform(0, 360), 'crowd', random.uniform(1.45, 1.7))
person(1.6, 2.2, -120, 'other')
# luz: cielo blanco + sol suave
w = bpy.data.worlds.new('mundo'); sc.world = w; w.use_nodes = True; w.node_tree.nodes['Background'].inputs[0].default_value = hexcol('#ffffff'); w.node_tree.nodes['Background'].inputs[1].default_value = 0.95
mist = sc.view_layers[0]; sc.world.mist_settings.start = 12; sc.world.mist_settings.depth = 14
bpy.ops.object.light_add(type='SUN', rotation=(math.radians(35), math.radians(-25), math.radians(20))); s = bpy.context.object; s.data.energy = 1.6; s.data.angle = math.radians(25)
# cámara en ligero picado
bpy.ops.object.camera_add(location=(0, -8.0, 3.6), rotation=(math.radians(72), 0, 0)); cam = bpy.context.object; cam.data.lens = 45; sc.camera = cam
sc.render.use_freestyle = True; sc.render.line_thickness_mode = 'ABSOLUTE'; sc.render.line_thickness = 1.6 * W / 540
vl = sc.view_layers[0]; vl.use_freestyle = True; fs = vl.freestyle_settings; fs.crease_angle = math.radians(120)
for l in list(fs.linesets): fs.linesets.remove(l)
ls = fs.linesets.new('contorno'); ls.select_by_collection = True; ls.collection = LINEAS; ls.select_silhouette = True; ls.select_border = True; ls.select_crease = False; ls.select_external_contour = True
ls.linestyle.color = hexcol('#2a292c')[:3]; ls.linestyle.thickness = 1.6 * W / 540
sc.render.engine = 'CYCLES'; sc.cycles.device = 'CPU'; sc.cycles.samples = SAMPLES; sc.cycles.use_denoising = True
sc.render.resolution_x = W; sc.render.resolution_y = int(W * 16 / 9); sc.view_settings.view_transform = 'Standard'; sc.render.filepath = out
t = time.time(); bpy.ops.render.render(write_still=True); print('render', round(time.time() - t, 1), 's')
