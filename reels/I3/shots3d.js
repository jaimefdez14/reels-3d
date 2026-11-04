// I3 v3 · «Cero clientes», pulso a pulso como la referencia R3: latigazos de cámara cada 4-6 s (whip), cortes secos a oscuro,
// anillo (el cero) más grande que el personaje, personajes pequeños de cuerpo entero.
SHOTS.actors = {
  yo: { kind: 'hero', at: [-0.75, 0.2], rot: 70 },
  el: { kind: 'other', at: [0.75, 0], rot: -90, face: true },
  gente: { kind: 'crowd', n: 36, area: [10, 5], at: [0, -5], gap: 2.0 },
};
const L = (i, w = 0) => wt(i, w);
SHOTS.cam = [
  { t: 0, preset: 'medium', az: -14, dist: 13, dur: 0.01 },
  { t: L(0), dist: 11.5, az: -6, dur: 2.8 },                                       // dolly in lento: la mesa y los dos
  { t: L(1), whip: true, dist: 11.5, az: 8, target: [-0.45, 1.9, 0] },                  // latigazo: «cero clientes», el anillo
  { t: L(2), whip: true, az: -18, dist: 10.5 },                                     // «no va del número»
  { t: L(3), whip: true, preset: 'close', az: 30, dist: 10, target: [0, 1.65, 0] },          // oscuro: «¿merece la pena?»
  { t: L(4), whip: true, preset: 'medium', az: -8, target: [-0.35, 1.45, 0] },                                // «dilo tal cual»
  { t: L(5), dist: 10, el: 13, az: -16, target: [-0.3, 2.0, 0], dur: 3.2 },         // la frase: dolly lento
  { t: L(6), whip: true, preset: 'wide', az: 12, el: 24 },                          // la sala
  { t: L(7), whip: true, dist: 11, az: -30, el: 18, target: [0, 2.0, 0] },          // «algunos» → prueba
  { t: L(8), az: -12, dur: 1.2 },                                                   // «el primero» → ayuda
  { t: L(9), whip: true, dist: 9, az: 24, target: [0.2, 1.9, 0] },                  // «si te recuerdan»
  { t: L(10), whip: true, preset: 'medium', az: 2 },                                // no vendas
  { t: L(11), dist: 10, az: 14, el: 12, dur: 2.2 },                                 // la pregunta
  { t: L(12), whip: true, preset: 'wide', az: -20, el: 26 },                        // los demás esperan
  { t: L(13), whip: true, dist: 10.5, az: -18, target: [-0.3, 1.9, 0] },             // adivina a quién recordarán
  { t: L(14), whip: true, preset: 'close', az: -30, dist: 9.5, target: [-0.2, 1.4, 0.1] },     // oscuro: objeción
  { t: L(15), dist: 9.2, az: -22, dur: 1.2 },                                       // bien, eres nuevo
  { t: L(16), whip: true, preset: 'medium', az: 6 },                                // ayudan / examinan
  { t: L(17), whip: true, az: 26, dist: 10.5 },                                     // no estás vendiendo
  { t: L(18), whip: true, dist: 14, az: -10, el: 22, target: [0.2, 1.9, 0] },       // remate: se abre
  { t: L(19), dist: 11, az: -2, dur: 1.6 },                                         // esconderlo, sí
];
SHOTS.invert = [{ t: L(3) - 0.05, end: L(4) - 0.08 }, { t: L(14) - 0.05, end: L(16) - 0.08 }];
SHOTS.moves = {
  el: [{ t: L(1), head: [-12, 0], dur: 0.5 }, { t: L(3), head: [-20, 12], dur: 0.4 }, { t: L(5), head: [-8, -6], dur: 0.5 }, { t: L(6), head: [40, 0], dur: 0.6 }, { t: L(7), head: [-10, 8], dur: 0.4 }, { t: L(8), head: [-12, -8], dur: 0.4 }, { t: L(11, 3), head: [-10, -10], dur: 0.4 }, { t: L(11, 3) + 0.5, head: [-10, 6], dur: 0.4 }, { t: L(14), head: [0, 0], dur: 0.6 }],
  yo: [{ t: L(4), head: [10, -4], dur: 0.5 }, { t: L(14), head: [-15, 10], dur: 0.4 }, { t: L(15), head: [0, 0], dur: 0.6 }],
  gente: [{ t: 0, show: false, dur: 0.01 }, { t: L(6), show: true, dur: 0.01 }, { t: L(7), show: false, dur: 0.01 }, { t: L(12), show: true, dur: 0.01 }, { t: L(13) + 0.3, show: false, dur: 0.01 }],
};
SHOTS.props = [
  { id: 'mesa', type: 'table', at: [0, 0, -0.9], t0: 0, inDur: 0.01, inEase: 'linear' },
  // «cero clientes»: el cero, un anillo enorme entre los dos
  { id: 'cero', type: 'ring', r: 0.8, tube: 0.1, around: 'yo', y: 1.0, front: 0.9, t0: L(1, 0) - 0.05, draw: L(1, 0), t1: L(3) - 0.05 },
  { id: 'x1', type: 'cross', over: 'el', dx: -0.7, t0: L(2, 2), t1: L(3) - 0.05, scale: 0.6 },
  // oscuro: ellos deciden
  { id: 'deciden', type: 'thought', text: '¿Merece la pena hablar con este?', w: 600, over: 'el', dx: -0.2, t0: L(3), t1: L(4) - 0.08 },
  // dilo tal cual: el anillo vuelve, amarillo, y la frase
  { id: 'cero2', type: 'ring', r: 0.62, tube: 0.08, around: 'yo', y: 1.0, front: 0.6, t0: L(4, 1) - 0.05, draw: L(4, 1), t1: L(6) - 0.05 },
  { id: 'frase', type: 'bubble', text: 'Cero. Busco el primero. Por eso estoy aquí.', w: 760, serif: true, over: 'yo', dx: 0.6, t0: L(5) - 0.05, t1: L(6) - 0.05, h: 1.1, reveal: 5 },
  // ahora piensan a quién conocen: líneas de «el» a la sala
  { id: 'pres1', type: 'line', from: 'el', to: [3.0, 1.3, -3.4], lift: 0.7, t0: L(6, 2), t1: L(7) - 0.05 },
  { id: 'pres2', type: 'line', from: 'el', to: [-1.8, 1.3, -4.4], lift: 0.8, t0: L(6, 3), t1: L(7) - 0.05 },
  { id: 'pres3', type: 'line', from: 'el', to: [0.8, 1.3, -5.6], lift: 0.9, t0: L(6, 4), t1: L(7) - 0.05 },
  // «algunos» → prueba (rojo) / «el primero» → ayuda (amarillo)
  { id: 'algunos', type: 'bubble', text: 'Algunos', w: 300, tail: 'none', over: 'yo', dx: 0.2, t0: L(7, 0), t1: L(8) - 0.05, h: 0.4 },
  { id: 'lupa', type: 'line', from: 'el', to: 'yo', red: true, lift: 0.5, t0: L(7, 2), t1: L(8) - 0.05 },
  { id: 'primero', type: 'bubble', text: 'El primero', w: 340, tail: 'none', over: 'yo', dx: 0.2, accent: true, t0: L(8, 0), t1: L(9) - 0.05, h: 0.4 },
  { id: 'ayuda', type: 'line', from: 'el', to: 'yo', lift: 0.5, t0: L(8, 2), t1: L(9) - 0.05 },
  // lo que digas después: tarjeta de «yo» y nube en «el»
  { id: 'ficha', type: 'card', label: 'EL DEL CERO', over: 'yo', dx: -0.9, t0: L(9, 3), t1: L(10) - 0.4 },
  { id: 'piensa', type: 'thought', text: '…', w: 180, over: 'el', dx: -0.2, t0: L(9, 5), t1: L(10) - 0.05, h: 0.4 },
  // no vendas (tachado) / pregunta
  { id: 'venta', type: 'bubble', text: 'Te cuento lo que hago…', w: 520, over: 'yo', dx: 0.3, t0: L(10, 0), t1: L(10, 2) + 0.6, strike: L(10, 1) },
  { id: 'pregunta', type: 'bubble', text: '¿Cómo conseguiste el primero?', w: 600, over: 'yo', dx: 0.4, accent: true, t0: L(11) - 0.02, t1: L(12) - 0.05, reveal: 11 },
  // los demás esperan su turno: la sala, con bocadillos vacíos
  { id: 'esp1', type: 'bubble', text: '…', w: 160, tail: 'none', at: [2.8, 2.2, -3.2], t0: L(12, 2), t1: L(13) - 0.05, h: 0.35 },
  { id: 'esp2', type: 'bubble', text: '…', w: 160, tail: 'none', at: [-2.0, 2.2, -4.2], t0: L(12, 3), t1: L(13) - 0.05, h: 0.35 },
  { id: 'esp3', type: 'bubble', text: '…', w: 160, tail: 'none', at: [0.6, 2.2, -5.4], t0: L(12, 4), t1: L(13) - 0.05, h: 0.35 },
  // adivina a quién recordarán: anillo amarillo sobre «yo»
  { id: 'cero3', type: 'ring', r: 0.75, tube: 0.09, around: 'yo', y: 1.0, front: 1.2, t0: L(13, 3) - 0.05, draw: L(13, 3), t1: L(14) - 0.05 },
  // objeción (oscuro)
  { id: 'nuevo', type: 'thought', text: 'Cero me hace parecer nuevo…', w: 560, over: 'yo', t0: L(14), t1: L(16) - 0.08 },
  // ayudan / examinan
  { id: 'ayuda2', type: 'line', from: 'el', to: 'yo', lift: 0.5, t0: L(16, 2), t1: L(16, 5) },
  { id: 'lupa2', type: 'line', from: 'el', to: 'yo', red: true, lift: 0.5, t0: L(16, 5), t1: L(17) - 0.05 },
  // no vendiendo / preguntando: el tachado y la pregunta otra vez
  { id: 'venta2', type: 'bubble', text: 'Te cuento lo que hago…', w: 520, over: 'yo', dx: 0.3, t0: L(17, 0), t1: L(17, 2) + 0.4, strike: L(17, 1) },
  { id: 'preg2', type: 'bubble', text: '¿Cómo conseguiste el primero?', w: 600, over: 'yo', dx: 0.4, accent: true, t0: L(17, 3), t1: L(18) - 0.05 },
  // remate: el cero, grande, alrededor de los dos
  { id: 'cero4', type: 'ring', r: 0.92, tube: 0.1, around: 'el', y: 1.0, front: 1.1, t0: L(18, 1) - 0.05, draw: L(18, 1) },
];
