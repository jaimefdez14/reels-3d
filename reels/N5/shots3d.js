// N5 · «Nunca empieces un correo con "espero que estés bien"», como R5 (FORD): letras gigantes D-A-P que se encienden una a una.
// Claridad: un objeto protagonista por frase, ≤ 2 bocadillos, sólidos lejos de los personajes, multitud detrás, cuerpo entero.
const L = (i, w = 0) => wt(i, w);
SHOTS.actors = {
  yo: { kind: 'hero', at: [-1.45, 0.4], rot: 75 },
  el: { kind: 'other', at: [2.0, -0.2], rot: -95, face: true },
  gente: { kind: 'crowd', n: 30, area: [10, 4], at: [0, -5.5], gap: 2.2 },
};
SHOTS.cam = [
  { t: 0, preset: 'medium', az: -10, dist: 14.5, target: [0.25, 1.45, -0.3], dur: 0.01 },
  { t: L(0), dist: 13.8, az: -4, dur: 2.2 },                                             // el correo malo
  { t: L(1), whip: true, dist: 12.5, az: 14, target: [0.6, 1.45, -0.3] },                  // nadie contesta: sobre «el»
  { t: L(2), whip: true, preset: 'wide', az: 8, el: 16, target: [0, 2.4, -2] },           // todo el mundo
  { t: L(3), whip: true, dist: 13.5, el: 7, az: -8, target: [0.3, 1.3, -0.6] },             // tres letras
  { t: L(4), az: -2, dist: 13.5, dur: 1.8 },
  { t: L(5), whip: true, dist: 12.5, az: 10, target: [0.9, 1.4, -0.4] },                    // la P: hacia «el»
  { t: L(6), whip: true, dist: 12, el: 7, az: -14, target: [-0.5, 1.3, -0.6] },         // D
  { t: L(7), az: -8, dur: 1.6 },
  { t: L(8), dist: 12, az: -14, target: [-0.3, 1.45, -0.3], dur: 2.6 },                  // la frase D
  { t: L(9), whip: true, dist: 12.5, el: 7, az: -4, target: [0.2, 1.3, -0.6] },             // A
  { t: L(10), az: 4, dur: 1.6 },
  { t: L(11), whip: true, dist: 12, az: 8, target: [-0.2, 1.4, -0.4] },                   // el catálogo
  { t: L(12), whip: true, preset: 'close', az: -24, dist: 11, target: [-0.6, 1.35, 0] }, // oscuro: objeción
  { t: L(13), whip: true, preset: 'medium', az: 2, dist: 12.5, target: [0.2, 1.45, -0.3] },
  { t: L(14), whip: true, dist: 12.5, el: 7, az: 6, target: [0.5, 1.3, -0.6] },           // P
  { t: L(15), az: 12, dur: 1.6 },
  { t: L(16), dist: 12, az: -12, target: [-0.2, 1.45, -0.3], dur: 2.6 },                 // la pregunta
  { t: L(17), whip: true, dist: 13, el: 8, az: -4, target: [0.3, 1.35, -0.6] },           // las tres líneas juntas
  { t: L(18), whip: true, dist: 12.5, az: 16, target: [0.8, 1.45, -0.3] },                  // le contestan
  { t: L(19), whip: true, dist: 12.5, az: -10, target: [0.1, 1.45, -0.3] },                // remate
  { t: L(20), az: 0, dur: 1.6 },
  { t: L(21), whip: true, preset: 'wide', az: 6 },                                        // envío
];
SHOTS.invert = [{ t: L(12) - 0.05, end: L(13) - 0.08 }];
SHOTS.moves = {
  el: [{ t: L(1), head: [-10, 8], dur: 0.5 }, { t: L(5), head: [-14, -6], dur: 0.5 }, { t: L(8, 2), head: [-12, 4], dur: 0.5 }, { t: L(16, 2), head: [-10, -8], dur: 0.4 }, { t: L(18), head: [-16, -6], dur: 0.5 }],
  yo: [{ t: L(12), head: [-15, 10], dur: 0.4 }, { t: L(13), head: [0, 0], dur: 0.6 }],
  gente: [{ t: 0, show: false, dur: 0.01 }, { t: L(2), show: true, dur: 0.01 }, { t: L(3), show: false, dur: 0.01 }, { t: L(21), show: true, dur: 0.01 }],
};
SHOTS.props = [
  // el correo malo, tachado cuando «nadie contesta»
  { id: 'malo', type: 'bubble', text: 'Espero que estés bien.', w: 520, over: 'yo', dx: 0.4, t0: L(0) - 0.02, t1: L(2) - 0.05, reveal: 0, strike: L(1, 0) },
  { id: 'x1', type: 'cross', over: 'el', dx: -0.6, t0: L(1, 1), t1: L(2) - 0.05, scale: 0.9 },
  // las letras gigantes, detrás y entre los dos; cada letra se enciende cuando se nombra
  { id: 'dap', type: 'letters', text: 'DAP', size: 0.8, at: [0.3, 0, -1.4], rot: -4, t0: L(3) - 0.05, t1: L(17) + 2.2,
    litAt: [[L(4, 0), 0], [L(4, 1), 1], [L(4, 2), 2], [L(5, 1), 2], [L(6, 0), 0], [L(9, 0), 1], [L(12), 9], [L(14, 0), 2], [L(17, 0), 0], [L(17, 1), 1, 'add'], [L(17, 2), 2, 'add']] },
  { id: 'mail1', type: 'sticker', icon: 'mail', yellow: true, over: 'el', dx: -0.6, t0: L(5, 4), t1: L(6) - 0.05 },
  // D: lo visto
  { id: 'ojo', type: 'sticker', icon: 'check', over: 'el', dx: -0.6, t0: L(7, 3), t1: L(8) - 0.05 },
  { id: 'fd', type: 'bubble', text: 'Vi que abres una tienda en Valencia.', w: 660, over: 'yo', dx: 0.4, accent: true, t0: L(8) - 0.02, t1: L(9) - 0.05, reveal: 8 },
  // A: una cosa / no el catálogo
  { id: 'una', type: 'tag', text: 'Una cosa', yellow: true, over: 'yo', dx: 0.3, px: 150, t0: L(10, 1), t1: L(11) - 0.35 },
  { id: 'cat', type: 'tag', text: 'Catálogo', red: true, over: 'yo', dx: 0.3, px: 150, t0: L(11, 2), t1: L(12) - 0.05 },
  { id: 'xcat', type: 'cross', over: 'yo', dx: 0.3, t0: L(11, 3), t1: L(12) - 0.05, scale: 0.7 },
  // objeción
  { id: 'duda', type: 'thought', text: '?', w: 220, over: 'yo', h: 0.5, t0: L(12), t1: L(13) - 0.08 },
  { id: 'tres', type: 'bubble', text: '1  ————————\n2  ————————\n3  ————————', w: 420, tail: 'none', over: 'yo', dx: 0.4, accent: true, h: 0.7, t0: L(13, 2), t1: L(14) - 0.05, rowsAt: [L(13, 2), L(13, 3), L(13, 4)] },
  // P: la pregunta
  { id: 'sino', type: 'tag', text: '¿Sí o no?', yellow: true, over: 'yo', dx: 0.3, px: 150, t0: L(15, 2), t1: L(16) - 0.05 },
  { id: 'fp', type: 'bubble', text: '¿Tienes un hueco el jueves?', w: 600, over: 'yo', dx: 0.4, accent: true, t0: L(16) - 0.02, t1: L(17) - 0.05, reveal: 16 },
  // le contestan
  { id: 'resp', type: 'bubble', text: 'Sí, el jueves a las 10.', w: 520, tail: 'right', over: 'el', dx: -0.4, accent: true, t0: L(18, 2), t1: L(19) - 0.05 },
  { id: 'lin', type: 'line', from: 'el', to: 'yo', lift: 0.5, t0: L(18, 3), t1: L(19) - 0.05 },
  // remate: el correo malo tachado y el bueno
  { id: 'malo2', type: 'bubble', text: 'Espero que estés bien.', w: 520, over: 'yo', dx: 0.4, t0: L(19, 1), t1: L(20) - 0.05, strike: L(19, 3) },
  { id: 'bueno', type: 'bubble', text: '¿Tienes un hueco el jueves?', w: 600, over: 'yo', dx: 0.4, accent: true, t0: L(20, 1), t1: L(21) - 0.05 },
  { id: 'envio', type: 'arrow', from: [-1.4, 1.4, 0.9], to: [3.2, 1.2, -2.0], lift: 1.0, t0: L(21, 1), drawDur: 0.9 },
];
