// N1 · «La regla de los cinco minutos». Guion gráfico: reels/N1/storyboard.md (regla 14: 8 decorados, personajes que actúan).
const L = (i, w = 0) => wt(i, w);
const X = { A: 0, B: 12, C: 24, D: 36, E: 44, F: 56, G: 68 };
SHOTS.actors = {
  yo: { kind: 'hero', at: [0.9, 0.05], y: 0.84, tilt: 90, phone: true },
  genteB: { kind: 'crowd', n: 12, area: [9, 2.2], at: [X.B + 0.3, -2.6], gap: 1.8, show: false },
  genteG: { kind: 'crowd', n: 14, area: [10, 2.2], at: [X.G + 1.5, -2.5], gap: 1.8, show: false },
  genteC: { kind: 'crowd', n: 5, area: [3, 1.0], at: [X.C + 3.2, -0.9], gap: 1.6, show: false },
  genteF: { kind: 'crowd', n: 12, area: [9, 2.2], at: [X.F + 0.3, -2.6], gap: 1.8, show: false },
  gente: { kind: 'crowd', n: 16, area: [9, 1.4], at: [X.E + 0.5, -1.6], gap: 1.8, show: false },
  amigo: { kind: 'other', at: [X.G + 3.5, 0.05], y: 0.84, tilt: 90, show: false, face: 'flat' },
};
SHOTS.moves = {
  yo: [
    { t: 1.3, arm: 25, dur: 0.3 }, { t: 2.0, arm: 0, dur: 0.3 }, { t: L(1, 4), arm: 30, dur: 0.4 }, { t: L(1, 5), arm: 0, dur: 0.4 },
    { t: L(3), tilt: 0, y: 0, at: [0.9, 1.0], phone: false, dur: 0.35, hop: 0.3 },                         // es al revés: se levanta de un salto
    { t: L(4, 1), at: [2.4, 0.75], dur: 1.1 }, { t: L(4, 5), arm: 60, dur: 0.3 }, { t: L(4, 6), arm: 0, dur: 0.3 },
    { t: L(5) - 0.02, at: [0.9, 0.05], y: 0.84, tilt: 90, phone: true, dur: 0.01 },                      // oscuro: otra vez en el sofá
    { t: L(5, 3), arm: 30, dur: 0.3 }, { t: L(5, 5), arm: 0, dur: 0.3 },
    { t: L(6) - 0.03, show: false, dur: 0.01 }, { t: L(6) + 0.38, show: true, at: [X.B - 1.1, 0.7], y: 0, tilt: 0, phone: false, dur: 0.01, head: [0, 0] },       // el cinco
    { t: L(6, 5), head: [0, -18], dur: 0.5 },
    { t: L(7, 2), head: [0, 0], arm: 125, dur: 0.35 }, { t: L(7, 4), arm: 0, dur: 0.4 },
    { t: L(8, 1), head: [0, 12], dur: 0.25 }, { t: L(8, 3), head: [0, 0], dur: 0.25 }, { t: L(8, 4), head: [0, 12], dur: 0.25 }, { t: L(8, 5), head: [0, 0], dur: 0.25 },
    { t: L(9) - 0.03, show: false, dur: 0.01 }, { t: L(9) + 0.12, show: true, at: [X.C - 2.0, 0.8], dur: 0.01 },                                    // la tarea
    { t: L(9, 3), at: [X.C - 0.9, 0.8], dur: 1.0 },
    { t: L(10, 1), arm: 70, phone: true, dur: 0.35 }, { t: L(10, 4), head: [20, 8], dur: 0.4 }, { t: L(11) - 0.3, head: [0, 0], dur: 0.2 },
    { t: L(11) - 0.03, show: false, dur: 0.01 }, { t: L(11) + 0.6, show: true, at: [X.D - 1.6, 0.9], arm: 0, phone: false, dur: 0.01 },            // la puerta
    { t: L(11, 5), head: [25, 0], dur: 0.4 }, { t: L(12), head: [0, 0], dur: 0.3 },
    { t: L(12, 1), at: [X.E - 0.5, 0.9], dur: 1.5, ease: 'linear' },                         // casi nadie para: sigue andando
    { t: L(12, 2), glow: true, dur: 0.01 }, { t: L(13) - 0.05, glow: false, dur: 0.01 },
    { t: L(13, 2), head: [0, 14], dur: 0.4 }, { t: L(14), head: [0, 0], dur: 0.3 },
    { t: L(14, 2), hop: 0.4, arm: 120, dur: 0.3 }, { t: L(14, 2) + 0.5, arm: 0, dur: 0.4 },
    { t: L(15, 1), at: [X.E + 3.5, 0.9], dur: 1.6, ease: 'linear' },
    { t: L(16) + 0.1, at: [X.F - 0.75, 0.8], dur: 0.01 },                                    // la semana
    { t: L(16, 3), head: [-25, 0], dur: 0.4 }, { t: L(17), head: [0, 0], dur: 0.3 }, { t: L(17, 2), hop: 0.4 }, { t: L(18, 3), head: [0, 16], dur: 0.4 }, { t: L(19), head: [0, 0], dur: 0.3 },
    { t: L(19) - 0.03, show: false, dur: 0.01 }, { t: L(19) + 0.6, show: true, at: [X.G - 1.2, 0.8], dur: 0.01 },                                    // final
    { t: L(20, 1), arm: 125, glow: true, dur: 0.35 }, { t: L(21), glow: false, dur: 0.01 }, { t: L(20, 1) + 0.7, arm: 0, dur: 0.4 },
    { t: L(21, 0), at: [X.G + 0.5, 0.9], rot: 70, dur: 1.0 }, { t: L(21, 0) + 1.0, rot: 25, dur: 0.4 },
  ],
  gente: [{ t: L(13) - 0.05, show: true, dur: 0.01 }, { t: L(16) - 0.05, show: false, dur: 0.01 }],
  genteB: [{ t: L(6) + 0.1, show: true, dur: 0.01 }, { t: L(9) + 0.3, show: false, dur: 0.01 }],
  genteG: [{ t: L(19) + 0.1, show: true, dur: 0.01 }],
  genteC: [{ t: L(9) + 0.3, show: true, dur: 0.01 }, { t: L(11) + 0.3, show: false, dur: 0.01 }],
  genteF: [{ t: L(16) + 0.1, show: true, dur: 0.01 }, { t: L(19) + 0.1, show: false, dur: 0.01 }],
  amigo: [{ t: L(21) + 1.55, show: true, dur: 0.01 }, { t: L(21, 4), glow: true, dur: 0.01 }],
};
SHOTS.cam = [
  { t: 0, dist: 8.8, el: 12, az: -12, target: [0.3, 0.9, 0], dur: 0.01, fit: false },
  { t: 0.05, dist: 6.9, el: 10, az: -2, target: [0.2, 0.95, 0], dur: 2.6, fit: false },            // dolly in al sofá
  { t: L(2), dist: 11.5, az: 22, target: [0.95, 1.1, -0.2], dur: 1.4, fit: false },       // orbit hacia el escritorio
  { t: L(3), dist: 8.1, az: 10, target: [1.0, 1.2, 0.5], dur: 0.8, fit: false },
  { t: L(4, 1), dist: 9.2, az: 28, target: [2.8, 1.25, 0.3], dur: 1.1, fit: false },
  { t: L(5) - 0.05, dist: 12.6, el: 40, az: -6, target: [0.1, 0.4, 0.4], dur: 0.01, fit: false }, // oscuro: picado sobre el sofá
  { t: L(5) + 0.05, dist: 11.3, el: 44, az: 6, dur: 2.0, fit: false },
  { t: L(6), dist: 8.8, el: 9, az: -18, target: [X.B - 0.1, 1.5, 0], dur: 0.7, fit: false }, // travelling al cinco
  { t: L(6, 4), dist: 8.8, el: 5, az: -8, target: [X.B - 0.3, 1.5, 0], dur: 1.6, fit: false },
  { t: L(7, 2), dist: 8.4, el: 9, az: 14, target: [X.B - 0.6, 1.5, 0.2], dur: 1.4, fit: false },
  { t: L(8), dist: 7.7, az: 30, dur: 2.2, fit: false },                                     // orbit
  { t: L(9), dist: 8.8, el: 10, az: -16, target: [X.C - 1.5, 1.3, 0.2], dur: 0.4, fit: false }, // travelling a la tarea
  { t: L(9, 3), dist: 7.9, az: 8, target: [X.C - 0.6, 1.3, 0.2], dur: 1.2, fit: false },
  { t: L(10, 1), dist: 7.4, az: 24, target: [X.C - 0.6, 1.35, 0.4], dur: 1.6, fit: false },
  { t: L(11), dist: 8.8, el: 9, az: -20, target: [X.D - 0.8, 1.4, 0.2], dur: 0.9, fit: false }, // travelling a la puerta
  { t: L(12, 1), dist: 8.8, el: 8, az: 30, target: [X.E - 0.6, 1.4, 0.6], dur: 1.5, ease: 'linear', fit: false }, // sigue andando
  { t: L(13) - 0.05, dist: 8.8, el: 14, az: -20, target: [X.E - 0.5, 1.2, 0.9], dur: 0.01, fit: false }, // oscuro: cerca
  { t: L(13) + 0.05, dist: 6.9, az: -14, dur: 2.2, fit: false },
  { t: L(14), dist: 8.4, el: 10, az: 6, target: [X.E - 0.3, 1.5, 0.9], dur: 0.7, fit: false },
  { t: L(15, 1), dist: 8.4, el: 9, az: -26, target: [X.E + 3.4, 1.4, 0.9], dur: 1.6, ease: 'linear', fit: false },
  { t: L(16), whip: true, dist: 8.0, el: 10, az: 18, target: [X.F - 0.35, 1.5, 0.2], fit: false }, // latigazo al viernes
  { t: L(16) + 0.4, dist: 7.7, az: 4, dur: 2.4, fit: false },
  { t: L(17, 2), dist: 8.6, az: -10, dur: 2.0, fit: false },
  { t: L(19), dist: 8.8, el: 9, az: -14, target: [X.G - 0.6, 1.45, 0.3], dur: 0.9, fit: false }, // travelling al final
  { t: L(20), dist: 8.2, az: 12, dur: 1.8, fit: false },
  { t: L(21), dist: 13.8, el: 12, az: 6, target: [X.G + 1.85, 1.0, 0.3], dur: 1.6, fit: false }, // pull-back: el amigo
];
SHOTS.invert = [{ t: L(5) - 0.05, end: L(6) - 0.05 }, { t: L(13) - 0.05, end: L(14) - 0.05 }];
SHOTS.props = [
  // A · sofá
  { id: 'sofa', type: 'sofa', at: [0, 0, 0], t0: 0, inDur: 0.01, inEase: 'linear' },
  { id: 'pared', type: 'wall', w: 6.5, h: 1.6, at: [1.2, 0, -1.5], t0: 0, inDur: 0.01, inEase: 'linear', t1: L(5) - 0.3 },
  { id: 'reloj', type: 'wallclock', at: [-0.2, 1.22, -1.42], r: 0.36, t0: 0, inDur: 0.01, inEase: 'linear', t1: L(5) - 0.3, spin: [[0, 0.35], [L(5), 3.2], [L(6), 0.35]] },
  { id: 'mesa', type: 'desk', at: [3.2, 0, -0.35], t0: 0, inDur: 0.01, inEase: 'linear', t1: L(6) + 1.5 },
  { id: 'papeles', type: 'papers', n: 12, at: [3.8, 0.99, -0.15], t0: 0, inDur: 0.01, inEase: 'linear', t1: L(6) + 1.5, left: [[L(4, 3), 10], [L(4, 4), 8], [L(4, 5), 6], [L(4, 6), 4]] },
  { id: 'pila', type: 'battery', over: 'yo', px: 120, t0: L(1, 1), t1: L(5) - 0.08, levels: [[L(1, 5), 1, 0.7], [L(3, 1), 0, 0.5], [L(4, 6), 1, 0.7]] },
  { id: 'flecha', type: 'arrow', from: 'yo', to: [3.8, 1.4, -0.15], lift: 0.8, t0: L(2, 1), t1: L(3) - 0.05, drawDur: 0.7 },
  { id: 'aro', type: 'floorring', r: 1.75, at: [0, 0, 0.1], t0: L(5), draw: L(5, 1), t1: L(6) - 0.06 },
  // fondos (regla 14: encuadre ocupado como la referencia)
  { id: 'paredC', type: 'wall', w: 7, h: 1.85, at: [X.C, 0, -1.6], t0: L(8), inDur: 0.01, inEase: 'linear', t1: L(11) + 0.6 },
  // B · el cinco y el temporizador
  { id: 'cinco', type: 'number', text: '5', size: 2.0, depth: 0.5, yellow: true, at: [X.B + 0.45, 0, -0.7], t0: L(6, 1), inDur: 0.5, t1: L(7, 3) - 0.1 },
  { id: 'reloj5', type: 'timer', text: '5', r: 0.9, px: 470, at: [X.B + 1.0, 1.6, -0.2], t0: L(7, 3), fillFrom: L(8, 0), dur: L(11, 5) - L(8, 0), t1: L(9) - 0.06 },
  // C · la tarea
  { id: 'mesa2', type: 'desk', at: [X.C + 0.25, 0, -0.45], t0: L(9) - 0.5, inDur: 0.01, inEase: 'linear', t1: L(11) + 1.2 },
  { id: 'papeles2', type: 'papers', key: true, n: 10, redTop: true, scale: 1.5, at: [X.C - 0.25, 0.99, 0.0], t0: L(9, 5), inDur: 0.4, t1: L(11) + 1.2, left: [[L(10, 4), 9]] },
  { id: 'reloj5b', type: 'timer', text: '5', r: 0.36, over: 'yo', dx: 0.6, px: 150, t0: L(9, 1), fillFrom: L(8, 0), dur: L(11, 5) - L(8, 0), t1: L(12, 1) },
  { id: 'tel', type: 'sticker', icon: 'phone', yellow: true, over: 'yo', dx: -0.6, px: 150, t0: L(10, 1), t1: L(11) - 0.3 },
  { id: 'ok', type: 'sticker', icon: 'check', yellow: true, over: 'yo', dx: -0.6, px: 130, t0: L(11, 5), t1: L(12, 1) },
  // D · puertas
  { id: 'puertas', type: 'doors', n: 4, at: [X.D + 3.4 * 1.5 - 1.0, 0, -1.2], t0: L(9), inDur: 0.01, inEase: 'linear', t1: L(13) - 0.3 },
  // E · objeción
  { id: 'duda', type: 'thought', text: '?', w: 220, over: 'yo', h: 0.5, t0: L(13, 1), t1: L(14) - 0.08 },
  { id: 'pila2', type: 'battery', over: 'yo', px: 120, t0: L(14, 1), t1: L(16) - 0.06, levels: [[L(14, 2), 1, 0.6]] },
  // F · la semana
  { id: 'recibo', type: 'receipt', at: [X.F + 0.75, 1.7, -0.2], px: 620, t0: L(16, 1), t1: L(19) - 0.06, checkAt: [0, 1, 2, 3, 4].map(i => L(17, 0) + 0.05 + i * 0.26) },
  { id: 'pila3', type: 'battery', over: 'yo', dx: -0.5, px: 110, t0: L(18, 3), t1: L(19) - 0.06, levels: [[0, 0.05, 0.01]] },
  // G · final
  { id: 'pila4', type: 'battery', over: 'yo', px: 120, t0: L(19, 1), t1: L(20) - 0.06, levels: [[0, 0.05, 0.01]] },
  { id: 'cruz', type: 'cross', over: 'yo', dx: 0.0, px: 140, t0: L(19, 2), t1: L(20) - 0.06 },
  { id: 'reloj5c', type: 'timer', text: '5', r: 0.9, px: 420, at: [X.G + 0.6, 1.7, -0.2], t0: L(20, 2), fillFrom: L(20, 2), dur: 0.9, t1: L(21) - 0.06 },
  { id: 'sofa2', type: 'sofa', at: [X.G + 2.6, 0, 0], t0: L(19), inDur: 0.01, inEase: 'linear' },
  { id: 'envio', type: 'arrow', from: 'yo', to: 'amigo', lift: 0.9, t0: L(21, 2), drawDur: 0.8 },
];
