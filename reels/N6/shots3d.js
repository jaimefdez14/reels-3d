// N6 · «Nunca falles dos días seguidos», como R4: pasillo de puertas (los días) con travelling y contador de barras.
const L = (i, w = 0) => wt(i, w);
SHOTS.actors = {
  yo: { kind: 'hero', at: [-1.7, 1.6], rot: 90 },
  gente: { kind: 'crowd', n: 10, area: [3, 2], at: [-7, 1.5], gap: 1.5, show: false },
};
SHOTS.cam = [
  { t: 0, dist: 13.5, el: 9, az: -30, target: [0.1, 1.5, 0.3], dur: 0.01 },
  { t: L(0), az: -32, dist: 11, dur: 2.4 },                                               // el pasillo, ayer (puerta con cruz)
  { t: L(1), whip: true, dist: 10, az: -10, target: [-0.6, 1.5, 0.5] },                   // compensar: x2
  { t: L(2), whip: true, dist: 12.5, az: -46, el: 12, target: [0.5, 1.6, 0.3] },          // lo dejas: se aleja
  { t: L(3), whip: true, dist: 10.5, az: -16, target: [-0.6, 1.5, 0.5] },                 // un fallo es normal: contador
  { t: L(4), az: -8, dur: 1.6 },                                                          // el segundo fallo
  { t: L(5), whip: true, dist: 9.8, az: 4, target: [-0.5, 1.5, 0.6] },                    // la regla
  { t: L(6), whip: true, dist: 10.5, az: -20, target: [-0.4, 1.5, 0.5] },                 // cinco minutos: temporizador
  { t: L(7), az: -12, dur: 1.8 },                                                         // ejemplos
  { t: L(8), whip: true, preset: 'close', dist: 9.5, az: -30, target: [-0.6, 1.35, 0.8] }, // oscuro: objeción
  { t: L(9), whip: true, dist: 10.5, az: -8, target: [-0.4, 1.5, 0.5] },                  // cuentan
  { t: L(10), whip: true, dist: 12.5, az: -38, el: 10, target: [1.0, 1.6, 0.3] },         // la cadena: el pasillo entero
  { t: L(11), az: -30, dur: 1.8 },
  { t: L(12), whip: true, dist: 12, az: -22, target: [0.1, 1.5, 0.4] },                   // el viernes: travelling hacia delante
  { t: L(12) + 0.4, az: -18, target: [1.6, 1.5, 0.4], dur: 2.4 },
  { t: L(13), whip: true, dist: 13, az: -50, el: 12, target: [-2.5, 1.6, 0.3] },          // los que compensan: al principio del pasillo
  { t: L(14), whip: true, dist: 10.5, az: -14, target: [1.5, 1.5, 0.6] },                 // remate: anillo
  { t: L(15), az: -4, dur: 1.6 },
  { t: L(16), whip: true, dist: 13, az: -24, el: 11, target: [1.3, 1.6, 0.3] },           // envío
];
SHOTS.invert = [{ t: L(8) - 0.05, end: L(9) - 0.08 }];
SHOTS.moves = {
  yo: [{ t: L(2), rot: 250, dur: 0.6 }, { t: L(3), rot: 90, dur: 0.5 }, { t: L(8), head: [-15, 10], dur: 0.4 }, { t: L(9), head: [0, 0], dur: 0.6 },
       { t: L(12) + 0.3, at: [1.7, 2.0], rot: 90, dur: 2.6, ease: 'inout' }],             // el viernes: avanza por el pasillo
  gente: [{ t: L(13), show: true, dur: 0.01 }, { t: L(14), show: false, dur: 0.01 }],
};
SHOTS.props = [
  { id: 'pasillo', type: 'doors', n: 7, at: [0, 0, -1.2], t0: 0, inDur: 0.01, inEase: 'linear' },
  // ayer: cruz roja sobre la puerta de ayer (a la izquierda de «yo»)
  { id: 'xayer', type: 'cross', at: [-3.4, 1.6, -0.4], t0: L(0, 2), t1: L(3) - 0.05, scale: 1.1 },
  // compensar: x2 rojo
  { id: 'x2', type: 'tag', text: 'x2', red: true, over: 'yo', dx: 0.3, t0: L(1, 2), t1: L(2) - 0.05 },
  { id: 'xdejas', type: 'cross', over: 'yo', dx: 0.3, t0: L(2, 4), t1: L(3) - 0.05, scale: 0.8 },
  // contador de la semana: un hueco (ayer) / dos huecos (el segundo fallo)
  { id: 'sem1', type: 'bars', n: 7, over: 'yo', dx: 0.5, t0: L(3, 1), t1: L(4, 5), pattern: [1, 1, 1, 0, 1, 1, 1] },
  { id: 'sem2', type: 'bars', n: 7, over: 'yo', dx: 0.5, t0: L(4, 5), t1: L(5) - 0.05, pattern: [1, 1, 1, 2, 2, 0, 0] },
  { id: 'regla', type: 'tag', text: 'Nunca dos seguidos', yellow: true, over: 'yo', dx: 0.3, px: 150, t0: L(5, 2), t1: L(6) - 0.05 },
  // cinco minutos: temporizador y ejemplos
  { id: 'timer', type: 'timer', text: '5', r: 0.36, at: [1.7, 2.1, 0.2], t0: L(6, 2), t1: L(8) - 0.05, fillFrom: L(6, 3), dur: 3.0 },
  { id: 'ej1', type: 'tag', text: '10 flex.', yellow: true, over: 'yo', dx: -0.6, px: 150, t0: L(7, 0), t1: L(7, 2) - 0.3 },
  { id: 'ej2', type: 'tag', text: '2 pág.', yellow: true, over: 'yo', dx: -0.6, px: 150, t0: L(7, 2), t1: L(7, 4) - 0.3 },
  { id: 'ej3', type: 'tag', text: '1 correo', yellow: true, over: 'yo', dx: -0.6, px: 150, t0: L(7, 4), t1: L(8) - 0.35 },
  // objeción
  { id: 'duda', type: 'thought', text: '?', w: 220, over: 'yo', h: 0.5, t0: L(8), t1: L(9) - 0.08 },
  { id: 'chk', type: 'sticker', icon: 'check', yellow: true, over: 'yo', dx: 0.5, t0: L(9, 3), t1: L(10) - 0.05 },
  // la cadena de días: contador grande; un hueco vale, dos no
  { id: 'cad1', type: 'bars', n: 7, over: 'yo', dx: 0.6, t0: L(10, 3), t1: L(11, 3), pattern: [1, 1, 1, 0, 1, 1, 1] },
  { id: 'cad2', type: 'bars', n: 7, over: 'yo', dx: 0.6, t0: L(11, 3), t1: L(12) - 0.05, pattern: [1, 1, 0, 0, 2, 2, 2] },
  // el viernes: el contador completo con su hueco
  { id: 'cad3', type: 'bars', n: 7, over: 'yo', dx: 0.6, t0: L(12, 1), t1: L(13) - 0.05, pattern: [1, 1, 1, 0, 1, 1, 1] },
  // los que compensan: al principio del pasillo, cruz
  { id: 'xlunes', type: 'cross', at: [-6.6, 1.6, -0.4], t0: L(13, 3), t1: L(14) - 0.05, scale: 1.1 },
  // remate: anillo sobre «yo»
  { id: 'anillo', type: 'ring', r: 0.62, tube: 0.08, around: 'yo', y: 1.0, front: 0.7, t0: L(15, 0) + 0.1, draw: L(15, 0) + 0.1, t1: L(16) - 0.05 },
  { id: 'envio', type: 'arrow', from: [1.9, 1.4, 1.9], to: [4.2, 1.2, 0.6], lift: 0.9, t0: L(16, 1) + 0.3, drawDur: 0.9 },
];
