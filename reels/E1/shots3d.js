// E1 · hoja de escenas: seis escenarios distintos, un latigazo entre cada uno.
SHOTS.actors = {
  yo: { kind: 'hero', at: [-0.4, 0.6], rot: 60 },
  ponente: { kind: 'other', at: [0, -3.0], rot: 0, face: true, show: false },
  publico: { kind: 'crowd', n: 24, area: [5, 2.5], at: [0, 1.2], gap: 1.2, show: false },
  cliente: { kind: 'other', at: [1.1, 0.2], rot: -90, face: true, show: false },
};
const L = (i, w = 0) => wt(i, w);
const E = i => L(i) - 0.3; // cada escena empieza un poco antes de su frase
SHOTS.cam = [
  { t: 0, dist: 13, el: 9, az: -58, target: [-1.5, 1.5, 0], dur: 0.01 },
  { t: L(0), dist: 12, el: 9, az: -38, target: [3.5, 1.5, 0], dur: 4.5, ease: 'inout' },        // travelling lateral por el pasillo
  { t: E(1), whip: true, dist: 12.5, el: 14, az: 0, target: [-0.7, 1.6, -1.0] },                     // atril y público
  { t: L(1) + 1.2, az: 9, dist: 12, dur: 2.5 },                // dolly al ponente
  { t: E(2), whip: true, dist: 9.5, el: 6, az: -12, target: [0.3, 1.3, 0] },                       // letras gigantes
  { t: L(2) + 1.0, az: 14, dist: 8, target: [0.8, 1.3, 0], dur: 3.0 },                        // orbit por las letras
  { t: E(3), whip: true, dist: 9.5, el: 10, az: 20, target: [0, 1.3, 0] },                      // escritorio
  { t: L(3) + 1.0, dist: 7.5, az: 6, target: [0, 1.4, 0], dur: 3.0 },                           // dolly al monitor
  { t: E(4), whip: true, dist: 9.5, el: 8, az: -16, target: [0.2, 1.4, 0] },                    // temporizador
  { t: E(5), whip: true, dist: 10.5, el: 10, az: 20, target: [0.3, 1.3, 0] },                    // monedas
  { t: L(5) + 1.0, dist: 9.0, az: 10, dur: 3.0 },
];
SHOTS.moves = {
  yo: [{ t: 0, at: [-3.2, 0.6], rot: 90, dur: 0.01 }, { t: L(0), at: [2.5, 0.6], rot: 90, dur: 4.5, ease: 'inout' },      // «yo» recorre el pasillo
       // en cada latigazo «yo» desaparece 0,3 s y reaparece ya en la escena nueva (así nunca se le ve cortado a medio camino)
       { t: E(1) - 0.02, show: false, dur: 0.01 }, { t: E(1) + 0.3, at: [-0.9, 1.4], rot: 20, show: true, dur: 0.01 },
       { t: E(2) - 0.02, show: false, dur: 0.01 }, { t: E(2) + 0.3, at: [-1.5, 0.7], rot: 70, show: true, dur: 0.01 },
       { t: E(3) - 0.02, show: false, dur: 0.01 }, { t: E(3) + 0.3, at: [-0.5, 0.9], rot: 10, show: true, dur: 0.01 },
       { t: E(4) - 0.02, show: false, dur: 0.01 }, { t: E(4) + 0.3, at: [-0.9, 0.3], rot: 70, show: true, dur: 0.01 },
       { t: E(5) - 0.02, show: false, dur: 0.01 }, { t: E(5) + 0.3, at: [-0.9, 0.2], rot: 70, show: true, dur: 0.01 }],
  ponente: { kind: 'other', at: [0, -3.0], rot: 0, face: true, show: false },
  publico: { kind: 'crowd', n: 24, area: [5, 2.5], at: [0, 1.2], gap: 1.2, show: false },
  cliente: { kind: 'other', at: [1.1, 0.2], rot: -90, face: true, show: false },
};
const L = (i, w = 0) => wt(i, w);
const E = i => L(i) - 0.3; // cada escena empieza un poco antes de su frase
SHOTS.cam = [
  { t: 0, dist: 13, el: 9, az: -58, target: [-1.5, 1.5, 0], dur: 0.01 },
  { t: L(0), dist: 12, el: 9, az: -38, target: [3.5, 1.5, 0], dur: 4.5, ease: 'inout' },        // travelling lateral por el pasillo
  { t: E(1), whip: true, dist: 12.5, el: 14, az: 0, target: [-0.7, 1.6, -1.0] },                     // atril y público
  { t: L(1) + 1.2, az: 9, dist: 12, dur: 2.5 },                // dolly al ponente
  { t: E(2), whip: true, dist: 9.5, el: 6, az: -12, target: [0.3, 1.3, 0] },                       // letras gigantes
  { t: L(2) + 1.0, az: 14, dist: 8, target: [0.8, 1.3, 0], dur: 3.0 },                        // orbit por las letras
  { t: E(3), whip: true, dist: 9.5, el: 10, az: 20, target: [0, 1.3, 0] },                      // escritorio
  { t: L(3) + 1.0, dist: 7.5, az: 6, target: [0, 1.4, 0], dur: 3.0 },                           // dolly al monitor
  { t: E(4), whip: true, dist: 9.5, el: 8, az: -16, target: [0.2, 1.4, 0] },                    // temporizador
  { t: E(5), whip: true, dist: 10.5, el: 10, az: 20, target: [0.3, 1.3, 0] },                    // monedas
  { t: L(5) + 1.0, dist: 9.0, az: 10, dur: 3.0 },
];
SHOTS.moves = {
  yo: [{ t: 0, at: [-3.2, 0.6], rot: 90, dur: 0.01 }, { t: L(0), at: [2.5, 0.6], rot: 90, dur: 4.5, ease: 'inout' },      // «yo» recorre el pasillo
       { t: E(1) + 0.02, at: [-0.9, 1.4], rot: 20, dur: 0.01 }, { t: E(2), at: [-1.5, 0.7], rot: 70, dur: 0.01 }, { t: E(3), at: [-0.5, 0.9], rot: 10, dur: 0.01 },
       { t: E(4), at: [-0.9, 0.3], rot: 70, dur: 0.01 }, { t: E(5), at: [-0.9, 0.2], rot: 70, dur: 0.01 }],
  ponente: [{ t: E(1) + 0.3, show: true, dur: 0.01 }, { t: E(2), show: false, dur: 0.01 }],
  publico: [{ t: E(1), show: true, dur: 0.01 }, { t: E(2), show: false, dur: 0.01 }],
  cliente: [{ t: E(5), show: true, dur: 0.01 }],
};
SHOTS.props = [
  // 1 · pasillo de puertas: cinco conversaciones cortas, contador que se rellena
  { id: 'pasillo', type: 'doors', n: 6, at: [0, 0, -0.6], t0: 0, t1: E(1), inDur: 0.01, inEase: 'linear' },
  { id: 'cont', type: 'bars', n: 5, over: 'yo', dx: 0.4, t0: L(0, 1), t1: E(1), each: 0.7 },
  { id: 'hola', type: 'bubble', text: 'Tu chaqueta es increíble.', w: 560, over: 'yo', dx: 0.6, t0: L(0, 2), t1: L(0, 2) + 1.6 },
  // 2 · atril y público: cruz roja sobre el ponente, corchetes sobre «yo»
  { id: 'escenario', type: 'stage', at: [0, 0, -3.2], t0: E(1), t1: E(2), inDur: 0.01, inEase: 'linear' },
  { id: 'xp', type: 'cross', over: 'ponente', dx: 0, t0: L(1, 3), t1: E(2), scale: 0.7 },
  { id: 'br', type: 'bracket', over: 'yo', red: false, s: 1.1, t0: L(1, 1), t1: E(2) },
  // 3 · letras gigantes: cada letra se enciende
  { id: 'ford', type: 'letters', text: 'FORD', size: 1.2, at: [1.0, 0, -0.3], rot: -8, t0: E(2), t1: E(3), litAt: [L(2, 0), L(2, 1), L(2, 2), L(2, 3)] },
  // 4 · escritorio con monitor: el informe de tres líneas
  { id: 'mesa', type: 'desk', text: 'INFORME', at: [0.4, 0, 0], rot: 8, t0: E(3), t1: E(4), inDur: 0.01, inEase: 'linear' },
  { id: 'tres', type: 'bubble', text: '1  ————————\n2  ————————\n3  ————————', w: 420, tail: 'none', over: 'yo', dx: 0.4, accent: true, h: 0.7, t0: L(3, 2), t1: E(4), rowsAt: [L(3, 2), L(3, 3), L(3, 4)] },
  { id: 'mail', type: 'sticker', icon: 'mail', yellow: true, over: 'yo', dx: -0.6, t0: L(3, 4), t1: E(4) },
  // 5 · temporizador: cinco minutos feos
  { id: 'puerta5', type: 'door', at: [1.3, 0, -0.8], rot: -20, t0: E(4), t1: E(5), inDur: 0.01, inEase: 'linear' },
  { id: 'timer', type: 'timer', text: '5', r: 0.55, over: 'yo', dx: 0.8, t0: L(4, 0), t1: E(5), fillFrom: L(4, 1), dur: 3.0 },
  { id: 'reloj', type: 'sticker', icon: 'clock', over: 'yo', dx: -0.7, t0: L(4, 2), t1: E(5) },
  // 6 · monedas: el precio
  { id: 'pila', type: 'coins', n: 9, at: [0.15, 0, 0.9], t0: L(5, 1), each: 0.22 },
  { id: 'cifra', type: 'number', text: '500', size: 0.55, yellow: true, at: [1.4, 0, -1.8], rot: -15, t0: L(5, 3) },
  { id: 'euro', type: 'sticker', icon: '€', yellow: true, over: 'cliente', dx: 0.5, t0: L(5, 2) },
  { id: 'preg', type: 'tag', text: '¿Presupuesto?', yellow: true, over: 'yo', dx: -0.3, t0: L(5, 4), px: 150 },
];
