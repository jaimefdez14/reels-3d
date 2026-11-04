// Escena del boceto B1. Todo se liga a palabras del guion con wt(frase, palabra).
// Los bocadillos van anclados a la cabeza de un personaje (over) y el motor los coloca sin pisar nada.
SHOTS.actors = {
  yo: { kind: 'hero', at: [-0.62, 0.1], rot: 70 },
  el: { kind: 'other', at: [0.62, 0], rot: -90, face: true },
  gente: { kind: 'crowd', n: 44, area: [9, 5], at: [0, -4.5], gap: 1.8 },
};

// cámara: un movimiento por bloque; el resto del tiempo, quieta
SHOTS.cam = [
  { t: 0, preset: 'medium', az: -8, dur: 0.01 },
  { t: wt(0, 0), dist: 6.8, el: 15, az: 6, dur: 3.2 },                                     // dolly in lento durante el gancho
  { t: wt(1, 0), preset: 'wide', az: 14, el: 26, dur: 2.2 },                              // pull-back: todo el mundo
  { t: wt(3, 0), preset: 'medium', az: -24, target: [-0.2, 1.45, 0], dur: 2.0 },          // vuelve a la pareja, orbit
  { t: wt(4, 0), az: 10, dist: 7.0, dur: 2.0 },                                            // orbit al otro lado: «dos frases»
  { t: wt(6, 0), preset: 'close', az: 30, target: [-0.55, 1.6, 0.1], dur: 1.4 },           // push a la cabeza de «yo»: objeción
  { t: wt(7, 0), preset: 'medium', az: 4, dur: 1.6 },
  { t: wt(8, 0), dist: 6.6, el: 12, az: -14, target: [-0.1, 1.5, 0], dur: 3.5 },           // dolly in lento mientras se revela la frase
  { t: wt(9, 0), dist: 9.0, el: 24, az: 18, target: [0.3, 1.1, 0.8], dur: 2.2 },           // «dónde archivarte»
];

// fondo oscuro durante la objeción
SHOTS.invert = [{ t: wt(6, 0) - 0.15, end: wt(7, 0) - 0.1 }];

// movimientos de personajes: la cabeza de «el» mira a «yo» y se inclina en la objeción
SHOTS.moves = {
  el: [{ t: wt(2, 0), head: [12, 0], dur: 0.6 }, { t: wt(6, 0), head: [20, 10], dur: 0.5 }, { t: wt(8, 0), head: [0, -6], dur: 0.6 }],
  yo: [{ t: wt(6, 0), head: [-15, 8], dur: 0.5 }, { t: wt(7, 0), head: [0, 0], dur: 0.6 }],
  gente: [{ t: 0, show: false, dur: 0.01 }, { t: wt(1, 0), show: true, dur: 0.01 }, { t: wt(3, 0) + 1.2, show: false, dur: 0.01 }, { t: wt(9, 0), show: true, dur: 0.01 }],
};

SHOTS.props = [
  // bloque 1: la frase prohibida en un bocadillo que se tacha cuando llega «Todo el mundo lo dice»
  { id: 'b1', type: 'bubble', text: 'Encantado de conocerte.', w: 560, over: 'yo', dx: 0.4, t0: wt(0, 1), t1: wt(1, 0) + 1.1, strike: wt(1, 0) },
  // bloque 2: tarjetas de perfil en el suelo = «una cara más»
  { id: 'cards1', type: 'cards', n: 48, cols: 8, at: [0, 0, 2.2], t0: wt(2, 2), t1: wt(3, 0) + 0.6, inEase: 'out', inDur: 0.6 },
  // bloque 3: «dos frases» = dos tarjetas numeradas junto a «yo»
  { id: 'dos', type: 'bubble', text: '1  ————————\n2  ————————', w: 400, tail: 'none', over: 'yo', dx: 0.3, t0: wt(4, 2), t1: wt(6, 0) - 0.2, accent: true, h: 0.6, rowsAt: [wt(4, 2), wt(4, 3)] },
  // «la etiqueta»: tarjeta de perfil sobre «yo» y línea de atención desde «el»
  { id: 'etiq', type: 'card', label: 'AGENCIA', over: 'yo', dx: -0.9, t0: wt(5, 3), t1: wt(6, 0) - 0.2 },
  { id: 'mira', type: 'line', from: 'el', to: '#etiq', lift: 0.5, t0: wt(5, 4), t1: wt(6, 0) - 0.2 },
  // objeción: nube de pensamiento sobre «yo»
  { id: 'duda', type: 'thought', text: '¿Eso no suena a chulería?', w: 560, over: 'yo', t0: wt(6, 0), t1: wt(7, 0) },
  // la frase literal: bocadillo grande en serif que se revela palabra a palabra con la voz
  { id: 'frase', type: 'bubble', text: 'Me vas a recordar como el de la agencia que odia estos eventos.', w: 760, serif: true, over: 'yo', dx: 0.6, t0: wt(8, 0) - 0.2, t1: wt(9, 0) - 0.1, h: 1.15, reveal: 8 },
  // «dónde archivarte»: tarjetas otra vez, una amarilla de pie y la flecha de «el» hacia ella
  { id: 'cards2', type: 'cards', n: 32, cols: 8, at: [0, 0, 2.4], t0: wt(9, 1), inEase: 'out', inDur: 0.6 },
  { id: 'ficha', type: 'card', label: 'AGENCIA', yellow: true, standing: true, at: [1.6, 0.32, 0.9], rot: 25, t0: wt(9, 3) },
  { id: 'flecha', type: 'arrow', from: 'el', to: [1.6, 0.7, 0.9], lift: 0.9, t0: wt(9, 3) + 0.2, drawDur: 0.8 },
];
