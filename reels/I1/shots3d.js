// I1 · «Las dos preguntas». Sala de reunión: mesa entre el vendedor («yo») y el cliente («el»); el socio entra al final.
SHOTS.actors = {
  yo: { kind: 'hero', at: [-0.7, 0.2], rot: 70 },
  el: { kind: 'other', at: [0.7, 0], rot: -90, face: true },
  socio: { kind: 'other', at: [2.6, -1.2], rot: -120, face: false, show: false },
};
const L = (i, w = 0) => wt(i, w);
SHOTS.cam = [
  { t: 0, preset: 'medium', az: 10, dist: 8.0, dur: 0.01 },
  { t: L(0), dist: 6.8, az: -6, dur: 2.4 },                                    // gancho: dolly in
  { t: L(1), az: -22, dist: 6.2, target: [-0.3, 1.5, 0], dur: 1.6 },           // la frase mala, sobre «yo»
  { t: L(2), az: 14, dist: 7.2, target: [0, 1.45, 0], dur: 1.6 },              // los dos sin saber
  { t: L(3), dist: 8.6, el: 22, az: 4, dur: 1.8 },                             // se apaga: se abre y oscurece
  { t: L(4), preset: 'medium', az: -14, dist: 6.6, dur: 1.4 },                 // dos preguntas
  { t: L(5), az: -26, dist: 6.2, target: [-0.3, 1.5, 0], dur: 2.4 },           // pregunta 1
  { t: L(6), az: 24, dist: 6.4, target: [0.3, 1.5, 0], dur: 1.5 },             // motivo real: sobre «el»
  { t: L(7), az: -8, dist: 7.0, target: [0, 1.5, 0], dur: 2.4 },               // pregunta 2: los dos en plano (las barras van sobre «el»)
  { t: L(8), az: 28, dist: 6.0, target: [0.4, 1.5, 0], dur: 1.5 },             // lo que va a pagar
  { t: L(9), preset: 'close', az: -32, target: [-0.6, 1.6, 0.1], dur: 1.2 },   // objeción
  { t: L(10), preset: 'medium', az: 6, dur: 1.5 },                             // escuchas
  { t: L(11), az: 40, dist: 8.4, target: [1.4, 1.4, -0.6], dur: 2.0 },         // el cliente va hacia su socio
  { t: L(12), az: 46, dist: 6.6, target: [1.8, 1.55, -0.8], dur: 2.6 },
  { t: L(13), preset: 'medium', az: -8, dist: 7.6, dur: 1.8 },                 // remate
  { t: L(14), az: -18, dist: 6.4, dur: 1.4 },
  { t: L(15), preset: 'wide', az: 6, dur: 2.2 },                               // envío
];
SHOTS.invert = [{ t: L(3) + 0.3, end: L(4) - 0.1 }, { t: L(9) - 0.15, end: L(10) - 0.1 }];
SHOTS.moves = {
  el: [{ t: L(2), head: [-12, 10], dur: 0.6 }, { t: L(5, 4), head: [-10, -8], dur: 0.5 }, { t: L(7, 4), head: [-6, 8], dur: 0.5 }, { t: L(10), head: [-10, 0], dur: 0.5 },
       { t: L(11), at: [1.9, -0.9], rot: -60, head: [20, 0], dur: 1.8 }, { t: L(13), at: [0.7, 0], rot: -90, head: [0, 0], dur: 1.2 }],
  yo: [{ t: L(2), head: [8, 10], dur: 0.6 }, { t: L(4), head: [0, 0], dur: 0.5 }, { t: L(9), head: [-15, 10], dur: 0.5 }, { t: L(10), head: [6, -4], dur: 0.6 }],
  socio: [{ t: L(11), show: true, dur: 0.01 }, { t: L(13), show: false, dur: 0.01 }],
};
SHOTS.props = [
  { id: 'mesa', type: 'table', at: [0, 0, -0.5], t0: 0, inDur: 0.01, inEase: 'linear' },
  // gancho: la frase mala, que se tacha cuando se oye «no lo sabe»
  { id: 'mala', type: 'bubble', text: '¿En qué puedo ayudarte?', w: 520, over: 'yo', dx: 0.35, t0: L(1) - 0.02, t1: L(2, 5) - 0.3, reveal: 1, strike: L(2, 2) },
  { id: 'duda-el', type: 'thought', text: '¿…?', w: 220, over: 'el', dx: -0.2, t0: L(2, 2), t1: L(3) + 0.3, h: 0.45 },
  { id: 'duda-yo', type: 'thought', text: '¿…?', w: 220, over: 'yo', dx: 0.2, t0: L(2, 5), t1: L(3) + 0.3, h: 0.45 },
  // dos preguntas
  { id: 'dos', type: 'bubble', text: '1  ————————\n2  ————————', w: 400, tail: 'none', over: 'yo', dx: 0.3, accent: true, h: 0.6, t0: L(4, 1), t1: L(5) - 0.1, rowsAt: [L(4, 1), L(4, 1) + 0.35] },
  { id: 'p1', type: 'bubble', text: '¿Qué ha pasado para que me llames ahora?', w: 700, over: 'yo', dx: 0.4, accent: true, t0: L(5) - 0.02, t1: L(6) - 0.1, reveal: 5 },
  { id: 'motivo', type: 'card', label: 'MOTIVO', over: 'el', dx: -0.9, t0: L(6, 2), t1: L(7) - 0.1 },
  { id: 'l-motivo', type: 'line', from: 'el', to: '#motivo', lift: 0.3, t0: L(6, 3), t1: L(7) - 0.1 },
  { id: 'p2', type: 'bubble', text: '¿Qué tiene que pasar en tres meses?', w: 660, over: 'yo', dx: 0.4, accent: true, t0: L(7) - 0.02, t1: L(8) - 0.1, reveal: 7 },
  { id: 'meses', type: 'bars', n: 3, over: 'el', dx: -0.6, t0: L(7, 5), t1: L(8) - 0.1, each: 0.35 },
  { id: 'paga', type: 'card', label: 'PAGA', yellow: true, over: 'el', dx: -0.9, t0: L(8, 3), t1: L(9) - 0.4 },
  { id: 'l-paga', type: 'line', from: 'el', to: '#paga', lift: 0.3, t0: L(8, 4), t1: L(9) - 0.4 },
  // objeción
  { id: 'interro', type: 'thought', text: '¿Esto no es un interrogatorio?', w: 560, over: 'yo', t0: L(9), t1: L(10) - 0.1 },
  { id: 'habla', type: 'line', from: 'el', to: 'yo', lift: 0.45, t0: L(10, 3), t1: L(11) - 0.1 },
  // la recompensa: el cliente a su socio
  { id: 'dice', type: 'bubble', text: 'Es el primero que me pregunta qué quiero.', w: 720, serif: true, tail: 'left', over: 'el', dx: 0.3, h: 1.0, t0: L(12) - 0.05, t1: L(13) - 0.1, reveal: 12 },
  // remate: vuelve el gancho. La frase mala tachada; la buena, en amarillo
  { id: 'mala2', type: 'bubble', text: '¿En qué puedo ayudarte?', w: 520, over: 'yo', dx: 0.35, t0: L(13, 1), t1: L(14) - 0.1, strike: L(13, 3) },
  { id: 'buena', type: 'bubble', text: '¿Qué ha pasado para que me llames ahora?', w: 700, over: 'yo', dx: 0.4, accent: true, t0: L(14, 1), t1: L(15) - 0.1 },
  { id: 'envio', type: 'arrow', from: [-0.5, 1.4, 0.7], to: [2.4, 1.1, -1.4], lift: 0.9, t0: L(15, 1), drawDur: 0.9 },
];
