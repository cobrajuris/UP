/* Note — mola física (oscilador harmônico amortecido).
   Mesmo modelo das animações da Apple: "response" é o período em segundos,
   "damping" é a fração de amortecimento (1 = sem quique, < 1 = quica). */
(function (N) {
  class Spring {
    constructor(value, { response = 0.5, damping = 0.78 } = {}) {
      this.v = value;
      this.t = value;
      this.vel = 0;
      this.config(response, damping);
    }
    config(response, damping) {
      if (N.reducedMotion) { response = Math.min(response, 0.3); damping = 1; }
      this.k = Math.pow((2 * Math.PI) / response, 2);
      this.c = (4 * Math.PI * damping) / response;
      return this;
    }
    step(dt) {
      const force = -this.k * (this.v - this.t) - this.c * this.vel;
      this.vel += force * dt;
      this.v += this.vel * dt;
    }
    get done() {
      return Math.abs(this.v - this.t) < 0.02 && Math.abs(this.vel) < 0.02;
    }
    snap() { this.v = this.t; this.vel = 0; }
  }

  N.reducedMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  N.Spring = Spring;
  N.rubber = (d, max) => Math.sign(d) * max * (1 - Math.exp(-Math.abs(d) / (max * 1.6)));
  N.haptic = (p = 8) => { try { navigator.vibrate && navigator.vibrate(p); } catch (e) { /* sem vibração */ } };
})(window.Note = window.Note || {});
