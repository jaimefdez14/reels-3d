// I3 · «Si aún no tienes clientes, dilo». Un movimiento de cámara por frase, algo nuevo en escena cada 1-2 s (regla 6).
SHOTS.actors = {
  yo: { kind: 'hero', at: [-0.62, 0.15], rot: 70 },
  el: { kind: 'other', at: [0.62, 0], rot: -90, face: true },
  gente: { kind: 'crowd', n: 40, area: [9, 5], at: [0, -4.5], gap: 1.8 },
};
const L = (i, w = 0) => wt(i, w);
SHOTS.cam = [
  { t: 0, preset: 'medium', az: -12, dist: 8.2, dur: 0.01 },
  { t: L(0), dist: 6.9, az: -4, dur: 2.6 },                                   // dolly in: gancho
  { t: L(1), az: 22, dist: 6.6, target: [0.2, 1.45, 0], dur: 1.8 },           // orbit hacia «el», que pregunta
  { t: L(2), az: -16, target: [-0.1, 1.45, 0], dur: 1.6 },                     // «algunos»
  { t: L(3), dist: 6.0, az: -8, dur: 1.4 },                                    // «cero»
  { t: L(4), preset: 'medium', az: 6, dur: 1.3 },                              // dilo sin rodeos
  { t: L(5), dist: 6.4, el: 13, az: -18, target: [-0.2, 1.55, 0], dur: 3.0 },  // la frase literal
  { t: L(6), preset: 'wide', az: 10, el: 24, dur: 2.0 },                       // la sala
  { t: L(7), preset: 'medium', az: 8, dur: 1.4 },                              // no vendas
  { t: L(8), dist: 6.2, az: 16, el: 12, dur: 2.0 },                            // la pregunta
  { t: L(9), preset: 'close', az: -30, target: [-0.55, 1.6, 0.1], dur: 1.2 },  // objeción
  { t: L(10), dist: 5.0, az: -22, dur: 1.0 },
  { t: L(11), preset: 'medium', az: 4, dur: 1.4 },
  { t: L(12), az: 20, dur: 1.4 },
  { t: L(13), dist: 6.4, az: -10, el: 14, dur: 1.5 },                          // el correo
  { t: L(14), dist: 6.0, az: 6, target: [0.2, 1.55, 0], dur: 3.0 },
  { t: L(15), dist: 8.0, az: -14, el: 20, target: [0, 1.45, 0], dur: 2.0 },    // remate
  { t: L(16), az: -4, dur: 1.4 },
  { t: L(17), preset: 'wide', az: 8, dur: 2.2 },                               // envío
];
SHOTS.invert = [{ t: L(9) - 0.15, end: L(11) - 0.1 }];
SHOTS.moves = {
  el: [{ t: L(1), head: [-10, 0], dur: 0.5 }, { t: L(5), head: [-8, -6], dur: 0.5 }, { t: L(6), head: [40, 0], dur: 0.7 }, { t: L(7), head: [-10, 0], dur: 0.6 }, { t: L(8, 3), head: [-10, -10], dur: 0.4 }, { t: L(8, 3) + 0.5, head: [-10, 6], dur: 0.4 }, { t: L(9), head: [0, 0], dur: 0.6 }],
  yo: [{ t: L(4), head: [10, -4], dur: 0.5 }, { t: L(9), head: [-15, 10], dur: 0.5 }, { t: L(10), head: [0, 0], dur: 0.6 }],
  gente: [{ t: 0, show: false, dur: 0.01 }, { t: L(6), show: true, dur: 0.01 }, { t: L(7) + 0.8, show: false, dur: 0.01 }, { t: L(17), show: true, dur: 0.01 }],
};
SHOTS.props = [
  { id: 'mesa', type: 'table', at: [0.02, 0, -0.8], t0: 0, inDur: 0.01, inEase: 'linear' },
  { id: 'cero0', type: 'ring', r: 0.5, tube: 0.07, around: 'yo', t0: L(0, 3) - 0.1, draw: L(0, 3), t1: L(1) - 0.1 },
  { id: 'preg', type: 'bubble', text: '¿Cuántos clientes tienes?', w: 540, tail: 'right', over: 'el', dx: -0.3, t0: L(1, 2), t1: L(2) - 0.1 },
  { id: 'alg', type: 'bubble', text: 'Bueno… algunos.', w: 420, over: 'yo', dx: 0.3, t0: L(2, 1), t1: L(3) - 0.1 },
  { id: 'lupa1', type: 'line', from: 'el', to: 'yo', red: true, lift: 0.35, t0: L(2, 3), t1: L(3) - 0.1 },
  { id: 'cero1', type: 'ring', r: 0.55, tube: 0.08, around: 'yo', t0: L(3, 2) - 0.1, draw: L(3, 2), t1: L(5) - 0.1 },
  { id: 'ayuda1', type: 'line', from: 'el', to: 'yo', lift: 0.45, t0: L(3, 3), t1: L(5) - 0.1 },
  { id: 'frase', type: 'bubble', text: 'Cero. Busco el primero. Por eso estoy aquí.', w: 720, serif: true, over: 'yo', dx: 0.5, t0: L(5) - 0.05, t1: L(6) - 0.1, h: 1.05, reveal: 5 },
  { id: 'pres1', type: 'line', from: 'el', to: [2.6, 1.3, -3.2], lift: 0.6, t0: L(6, 2), t1: L(7) + 0.6 },
  { id: 'pres2', type: 'line', from: 'el', to: [-1.4, 1.3, -4.0], lift: 0.7, t0: L(6, 3), t1: L(7) + 0.6 },
  { id: 'pres3', type: 'line', from: 'el', to: [0.6, 1.3, -5.2], lift: 0.8, t0: L(6, 4), t1: L(7) + 0.6 },
  { id: 'venta', type: 'bubble', text: 'Te cuento lo que hago…', w: 500, over: 'yo', dx: 0.3, t0: L(7, 0), t1: L(7, 2) + 0.7, strike: L(7, 1) },
  { id: 'pregunta', type: 'bubble', text: '¿Cómo conseguiste tu primer cliente?', w: 640, over: 'yo', dx: 0.4, accent: true, t0: L(8) - 0.02, t1: L(9) - 0.45, reveal: 8 },
  { id: 'novato', type: 'thought', text: 'Parezco un novato…', w: 460, over: 'yo', t0: L(9), t1: L(10) + 0.8 },
  { id: 'ayuda3', type: 'line', from: 'el', to: 'yo', lift: 0.5, t0: L(11, 3), t1: L(12) - 0.1 },
  { id: 'lupa3', type: 'line', from: 'el', to: 'yo', red: true, lift: 0.35, t0: L(12, 4), t1: L(13) - 0.1 },
  { id: 'correo', type: 'bubble', text: '1 correo nuevo', w: 360, tail: 'none', over: 'yo', dx: 0.3, accent: true, t0: L(13, 4), t1: L(14) - 0.55, h: 0.42 },
  { id: 'mail', type: 'bubble', text: 'Te presento a alguien que necesita lo tuyo.', w: 720, serif: true, tail: 'right', over: 'el', dx: -0.4, t0: L(14) - 0.05, t1: L(15) - 0.1, h: 1.0, reveal: 14 },
  { id: 'cero3', type: 'ring', r: 0.55, tube: 0.08, around: 'yo', t0: L(15, 1) - 0.1, draw: L(15, 1), t1: L(17) - 0.1 },
  { id: 'envio', type: 'arrow', from: [-0.4, 1.4, 0.6], to: [2.4, 1.1, -1.6], lift: 0.9, t0: L(17, 1), drawDur: 0.9 },
];
