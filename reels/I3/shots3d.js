// I3 · «Decir "cero" lo cambia todo». Un movimiento de cámara por frase, algo nuevo en escena cada 1-2 s (regla 6).
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
  { t: L(2), az: -16, target: [-0.1, 1.45, 0], dur: 1.6 },                     // «algunos»: vuelve a «yo»
  { t: L(3), dist: 6.0, az: -8, dur: 1.4 },                                    // «cero»: entra un poco
  { t: L(4), dist: 7.6, az: 6, dur: 1.6 },                                     // «el número»: se abre
  { t: L(5), preset: 'close', az: 38, target: [0.55, 1.6, 0], dur: 1.3 },      // ellos se preguntan: cara de «el»
  { t: L(6), preset: 'medium', az: -6, dur: 1.3 },
  { t: L(7), dist: 6.4, el: 13, az: -18, target: [-0.2, 1.55, 0], dur: 3.0 },  // la frase literal: dolly lento
  { t: L(8), preset: 'wide', az: 10, el: 24, dur: 2.0 },                       // a quién te pueden presentar: la sala
  { t: L(9), preset: 'medium', az: 24, dist: 8.0, dur: 1.8 },                  // «lo cambia todo»: orbit
  { t: L(10), az: 30, dist: 6.8, target: [0.3, 1.45, 0], dur: 1.4 },
  { t: L(11), az: -20, dist: 6.8, target: [-0.2, 1.45, 0], dur: 1.6 },
  { t: L(12), dist: 6.0, az: -28, target: [-0.5, 1.5, 0], dur: 1.6 },          // «si te recuerdan»: hacia «yo»
  { t: L(13), preset: 'medium', az: 8, dur: 1.2 },
  { t: L(14), dist: 6.2, az: 16, el: 12, dur: 2.0 },                           // la pregunta
  { t: L(15), preset: 'close', az: -30, target: [-0.55, 1.6, 0.1], dur: 1.2 }, // objeción: cara de «yo»
  { t: L(16), dist: 5.0, az: -22, dur: 1.0 },
  { t: L(17), preset: 'medium', az: 4, dur: 1.4 },
  { t: L(18), az: 20, dur: 1.4 },
  { t: L(19), dist: 6.4, az: -10, el: 14, dur: 1.5 },                          // el correo
  { t: L(20), dist: 6.0, az: 6, target: [0.2, 1.55, 0], dur: 3.0 },
  { t: L(21), dist: 8.0, az: -14, el: 20, target: [0, 1.45, 0], dur: 2.0 },    // remate: se abre
  { t: L(22), az: -4, dur: 1.4 },
  { t: L(23), preset: 'wide', az: 8, dur: 2.2 },                               // envío
];
SHOTS.invert = [{ t: L(15) - 0.15, end: L(17) - 0.1 }];
SHOTS.moves = {
  el: [{ t: L(1), head: [-10, 0], dur: 0.5 }, { t: L(5), head: [-18, 12], dur: 0.5 }, { t: L(7), head: [-8, -6], dur: 0.5 }, { t: L(8), head: [40, 0], dur: 0.7 }, { t: L(10), head: [-10, 8], dur: 0.5 }, { t: L(11), head: [-14, -8], dur: 0.5 }, { t: L(14, 3), head: [-10, -10], dur: 0.4 }, { t: L(14, 3) + 0.5, head: [-10, 6], dur: 0.4 }, { t: L(15), head: [0, 0], dur: 0.6 }],
  yo: [{ t: L(6), head: [10, -4], dur: 0.5 }, { t: L(15), head: [-15, 10], dur: 0.5 }, { t: L(16), head: [0, 0], dur: 0.6 }],
  gente: [{ t: 0, show: false, dur: 0.01 }, { t: L(8), show: true, dur: 0.01 }, { t: L(9) + 1.0, show: false, dur: 0.01 }, { t: L(23), show: true, dur: 0.01 }],
};
SHOTS.props = [
  { id: 'mesa', type: 'table', at: [0.02, 0, -0.8], t0: 0, inDur: 0.01, inEase: 'linear' },
  // gancho: un «0» grande junto a «yo»
  { id: 'cero0', type: 'ring', r: 0.5, tube: 0.07, around: 'yo', t0: L(0, 3) - 0.1, draw: L(0, 3), t1: L(1) - 0.1 },
  // la pregunta de «el»
  { id: 'preg', type: 'bubble', text: '¿Cuántos clientes tienes?', w: 540, tail: 'right', over: 'el', dx: -0.3, t0: L(1, 2), t1: L(2) - 0.1 },
  // «algunos»: línea roja de «el» a «yo» (la lupa)
  { id: 'alg', type: 'bubble', text: 'Bueno… algunos.', w: 420, over: 'yo', dx: 0.3, t0: L(2, 1), t1: L(3) - 0.1 },
  { id: 'lupa1', type: 'line', from: 'el', to: 'yo', red: true, lift: 0.35, t0: L(2, 3), t1: L(3) - 0.1 },
  // «cero»: anillo amarillo que se dibuja alrededor de «yo»
  { id: 'cero1', type: 'ring', r: 0.55, tube: 0.08, around: 'yo', t0: L(3, 2) - 0.1, draw: L(3, 2), t1: L(5) - 0.1 },
  { id: 'ayuda1', type: 'line', from: 'el', to: 'yo', lift: 0.45, t0: L(3, 3), t1: L(5) - 0.1 },
  // ellos se preguntan
  { id: 'duda-el', type: 'thought', text: '¿Merece la pena hablar con este?', w: 600, over: 'el', dx: -0.2, t0: L(5), t1: L(6) + 0.6 },
  // la frase literal
  { id: 'frase', type: 'bubble', text: 'Cero. Busco el primero. Por eso estoy aquí.', w: 720, serif: true, over: 'yo', dx: 0.5, t0: L(7) - 0.05, t1: L(8) - 0.1, h: 1.05, reveal: 7 },
  // a quién te pueden presentar: líneas de «el» a tres personas de la sala
  { id: 'pres1', type: 'line', from: 'el', to: [2.6, 1.3, -3.2], lift: 0.6, t0: L(8, 2), t1: L(9) + 0.8 },
  { id: 'pres2', type: 'line', from: 'el', to: [-1.4, 1.3, -4.0], lift: 0.7, t0: L(8, 3), t1: L(9) + 0.8 },
  { id: 'pres3', type: 'line', from: 'el', to: [0.6, 1.3, -5.2], lift: 0.8, t0: L(8, 4), t1: L(9) + 0.8 },
  // «lo cambia todo»: anillo grande alrededor de los dos
  { id: 'cero2', type: 'ring', r: 1.25, tube: 0.07, at: [0, 1.0, 0.3], t0: L(9, 1) - 0.1, draw: L(9, 1), t1: L(10) - 0.1 },
  // «algunos» te pone a prueba / «el primero» les invita
  { id: 'prueba', type: 'bubble', text: '¿Y qué resultados tienes?', w: 540, tail: 'right', over: 'el', dx: -0.3, t0: L(10, 2), t1: L(11) - 0.1 },
  { id: 'lupa2', type: 'line', from: 'el', to: 'yo', red: true, lift: 0.35, t0: L(10, 3), t1: L(11) - 0.1 },
  { id: 'invita', type: 'bubble', text: 'Conozco a alguien que te vendría bien.', w: 600, tail: 'right', over: 'el', dx: -0.3, accent: true, t0: L(11, 2), t1: L(12) - 0.1 },
  { id: 'ayuda2', type: 'line', from: 'el', to: 'yo', lift: 0.45, t0: L(11, 3), t1: L(12) - 0.1 },
  // si te recuerdan: tarjeta de «yo»
  { id: 'ficha', type: 'card', label: 'EL DEL CERO', over: 'yo', dx: -0.8, t0: L(12, 4), t1: L(13) - 0.1 },
  // no vendas, pregunta
  { id: 'venta', type: 'bubble', text: 'Te cuento lo que hago…', w: 500, over: 'yo', dx: 0.3, t0: L(13, 0), t1: L(13, 2) + 0.7, strike: L(13, 1) },
  { id: 'pregunta', type: 'bubble', text: '¿Cómo conseguiste tu primer cliente?', w: 640, over: 'yo', dx: 0.4, accent: true, t0: L(14) - 0.02, t1: L(15) - 0.45, reveal: 14 },
  // objeción
  { id: 'novato', type: 'thought', text: 'Parezco un novato…', w: 460, over: 'yo', t0: L(15), t1: L(16) + 0.8 },
  // novatos / fingen
  { id: 'ayuda3', type: 'line', from: 'el', to: 'yo', lift: 0.5, t0: L(17, 3), t1: L(18) - 0.1 },
  { id: 'lupa3', type: 'line', from: 'el', to: 'yo', red: true, lift: 0.35, t0: L(18, 4), t1: L(19) - 0.1 },
  // el correo
  { id: 'correo', type: 'bubble', text: '1 correo nuevo', w: 360, tail: 'none', over: 'yo', dx: 0.3, accent: true, t0: L(19, 4), t1: L(20) - 0.55, h: 0.42 },
  { id: 'mail', type: 'bubble', text: 'Te presento a alguien que necesita lo tuyo.', w: 720, serif: true, tail: 'right', over: 'el', dx: -0.4, t0: L(20) - 0.05, t1: L(21) - 0.1, h: 1.0, reveal: 20 },
  // remate: el anillo vuelve, limpio
  { id: 'cero3', type: 'ring', r: 0.55, tube: 0.08, around: 'yo', t0: L(21, 1) - 0.1, draw: L(21, 1), t1: L(23) - 0.1 },
  // envío
  { id: 'envio', type: 'arrow', from: [-0.4, 1.4, 0.6], to: [2.4, 1.1, -1.6], lift: 0.9, t0: L(23, 1), drawDur: 0.9 },
];
