// I1 v2 · «Nunca abras con "¿en qué puedo ayudarte?"», como la referencia R1: latigazos cada 4-6 s, campo de tarjetas, dos tarjetas numeradas,
// corte seco a oscuro en la objeción, bocadillo grande con la frase, el tercero que habla bien de ti al final.
SHOTS.actors = {
  yo: { kind: 'hero', at: [-0.75, 0.2], rot: 70 },
  el: { kind: 'other', at: [0.75, 0], rot: -90, face: true },
  socio: { kind: 'other', at: [2.9, -1.4], rot: -120, face: false, show: false },
  gente: { kind: 'crowd', n: 34, area: [10, 5], at: [0, -5], gap: 2.0 },
};
const L = (i, w = 0) => wt(i, w);
SHOTS.cam = [
  { t: 0, preset: 'medium', az: 12, dist: 13, dur: 0.01 },
  { t: L(0), dist: 11.5, az: -4, dur: 2.6 },                                        // gancho: dolly in
  { t: L(1), whip: true, dist: 9.5, az: -22, target: [-0.4, 2.0, 0] },              // la frase mala, sobre «yo»
  { t: L(2), whip: true, preset: 'wide', az: 10, el: 24 },                          // todo el mundo la dice: la sala
  { t: L(3), whip: true, dist: 16, az: -14, el: 30, target: [0, 1.6, 1.5] },         // muerta: picado sobre la mesa, tarjetas
  { t: L(4), whip: true, preset: 'medium', az: 4 },                                 // lo primero que preguntas
  { t: L(5), whip: true, dist: 10, az: -18, target: [-0.3, 2.0, 0] },                // dos preguntas
  { t: L(6), az: -26, dist: 9.5, dur: 1.2 },                                        // la primera
  { t: L(7), dist: 10.5, el: 13, az: -20, target: [-0.3, 1.9, 0], dur: 3.0 },          // pregunta 1: dolly lento
  { t: L(8), whip: true, preset: 'close', az: -30, dist: 10, target: [-0.25, 1.45, 0.1] },     // oscuro: objeción
  { t: L(9), whip: true, preset: 'medium', az: 8 },                                 // te callas
  { t: L(10), whip: true, dist: 10.5, az: 26, target: [0.2, 2.0, 0] },               // ahora sabes por qué: sobre «el»
  { t: L(11), whip: true, dist: 11, az: -10, el: 20 },                              // no basta
  { t: L(12), az: -22, dist: 10, target: [-0.3, 2.0, 0], dur: 1.2 },                // la segunda
  { t: L(13), dist: 10.5, el: 13, az: -16, dur: 3.0 },                                 // pregunta 2
  { t: L(14), whip: true, dist: 10.5, az: 24, target: [0.2, 2.0, 0] },               // lo que te va a comprar
  { t: L(15), whip: true, dist: 14.5, az: 40, target: [1.9, 2.0, -0.8] },             // el cliente va con su socio
  { t: L(16), dist: 11.5, az: 46, target: [2.1, 2.1, -0.9], dur: 2.8 },
  { t: L(17), whip: true, preset: 'medium', az: -8 },                               // remate: vuelve al gancho
  { t: L(18), whip: true, preset: 'wide', az: 6 },                                  // envío
];
SHOTS.invert = [{ t: L(8) - 0.05, end: L(9) - 0.08 }];
SHOTS.moves = {
  el: [{ t: L(1), head: [-10, 0], dur: 0.5 }, { t: L(7, 4), head: [-10, -8], dur: 0.5 }, { t: L(10), head: [-14, 6], dur: 0.5 }, { t: L(13, 5), head: [-6, 8], dur: 0.5 },
       { t: L(15), at: [2.1, -1.0], rot: -60, head: [20, 0], dur: 1.8 }, { t: L(17), at: [0.75, 0], rot: -90, head: [0, 0], dur: 1.0 }],
  yo: [{ t: L(8), head: [-15, 10], dur: 0.4 }, { t: L(9), head: [6, -4], dur: 0.6 }, { t: L(15) + 0.12, show: false, dur: 0.01 }, { t: L(17) + 0.3, show: true, dur: 0.01 }],
  socio: [{ t: L(15) + 0.35, show: true, dur: 0.01 }, { t: L(17), show: false, dur: 0.01 }],
  gente: [{ t: 0, show: false, dur: 0.01 }, { t: L(2), show: true, dur: 0.01 }, { t: L(3), show: false, dur: 0.01 }, { t: L(18) + 0.3, show: true, dur: 0.01 }],
};
SHOTS.props = [
  { id: 'mesa', type: 'table', at: [0, 0, -0.9], t0: 0, inDur: 0.01, inEase: 'linear' },
  // gancho: la frase mala
  { id: 'mala', type: 'bubble', text: '¿En qué puedo ayudarte?', w: 520, over: 'yo', dx: 0.35, t0: L(1) - 0.02, t1: L(2) + 1.2, reveal: 1, strike: L(2, 2) },
  // todo el mundo la dice: bocadillos iguales sobre la sala
  { id: 'td1', type: 'bubble', text: '¿En qué puedo ayudarte?', w: 420, tail: 'none', at: [3.4, 2.3, -3.2], t0: L(2, 1), t1: L(3) - 0.05, px: 150 },
  { id: 'td2', type: 'bubble', text: '¿En qué puedo ayudarte?', w: 420, tail: 'none', at: [-1.8, 2.3, -4.4], t0: L(2, 2), t1: L(3) - 0.05, px: 150 },
  // muerta: tarjetas de perfil en el suelo
  { id: 'cards', type: 'cards', n: 56, cols: 8, at: [0, 0, 2.6], t0: L(3, 3), t1: L(4) - 0.05, inEase: 'out', inDur: 0.6 },
  // dos preguntas: tarjetas numeradas
  { id: 'dos', type: 'bubble', text: '1  ————————\n2  ————————', w: 400, tail: 'none', over: 'yo', dx: 0.3, accent: true, h: 0.6, t0: L(5, 2), t1: L(7) - 0.4, rowsAt: [L(5, 2), L(5, 2) + 0.35] },
  { id: 'motivo', type: 'card', label: 'MOTIVO', over: 'el', dx: -0.9, t0: L(6, 3), t1: L(7) - 0.05 },
  { id: 'p1', type: 'bubble', text: '¿Qué ha pasado para que me llames ahora?', w: 700, over: 'yo', dx: 0.4, accent: true, t0: L(7) - 0.02, t1: L(8) - 0.3, reveal: 7 },
  // objeción (oscuro)
  { id: 'interro', type: 'thought', text: '?', w: 220, over: 'yo', t0: L(8), t1: L(9) - 0.08 },
  { id: 'habla', type: 'line', from: 'el', to: 'yo', lift: 0.5, t0: L(9, 3), t1: L(10) - 0.05 },
  // ahora sabes por qué: la tarjeta MOTIVO con línea desde «el»
  { id: 'motivo2', type: 'card', label: 'MOTIVO', yellow: true, over: 'el', dx: -0.9, t0: L(10, 1), t1: L(12) - 0.05 },
  { id: 'l-motivo', type: 'line', from: 'el', to: '#motivo2', lift: 0.3, t0: L(10, 2), t1: L(11) - 0.05 },
  { id: 'x', type: 'cross', over: 'el', dx: -0.9, t0: L(11, 3), t1: L(12) - 0.05, scale: 0.5 },
  // la segunda: contador de tres meses y la pregunta
  { id: 'meses', type: 'bars', n: 3, over: 'el', dx: -0.6, t0: L(13, 5), t1: L(14) + 0.6, each: 0.35 },
  { id: 'p2', type: 'bubble', text: '¿Qué tiene que cambiar en tres meses?', w: 680, over: 'yo', dx: 0.4, accent: true, t0: L(13) - 0.02, t1: L(14) - 0.05, reveal: 13 },
  { id: 'paga', type: 'card', label: 'COMPRA', yellow: true, over: 'el', dx: -0.9, t0: L(14, 3), t1: L(15) - 0.05 },
  { id: 'l-paga', type: 'line', from: 'el', to: '#paga', lift: 0.3, t0: L(14, 4), t1: L(15) - 0.05 },
  // la recompensa: el cliente a su socio
  { id: 'dice', type: 'bubble', text: 'Es el primero que me pregunta qué quiero.', w: 720, serif: true, tail: 'left', over: 'el', dx: 0.3, h: 1.0, t0: L(16) - 0.05, t1: L(17) - 0.05, reveal: 16 },
  // remate: la frase mala, tachada, y el anillo sobre «yo»
  { id: 'mala2', type: 'bubble', text: '¿En qué puedo ayudarte?', w: 520, over: 'yo', dx: 0.35, t0: L(17, 0), t1: L(17, 4), strike: L(17, 1) },
  { id: 'anillo', type: 'ring', r: 0.62, tube: 0.08, around: 'yo', y: 1.0, front: 0.7, t0: L(17, 4), draw: L(17, 4), t1: L(18) - 0.05 },
  { id: 'envio', type: 'arrow', from: [-0.5, 1.4, 0.7], to: [2.6, 1.2, -1.6], lift: 1.0, t0: L(18, 1), drawDur: 0.9 },
];
