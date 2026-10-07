(() => {
  'use strict';
  const E = globalThis.MagnitudeEnglish;
  const M = globalThis.MagnitudeEngine;
  if (!M) return;
  const CAPACITY = 601;
  const transformations = {
    linear: (n) => n.towerLog !== undefined ? Infinity : n.toNumber(),
    log: (n) => n.towerLog !== undefined ? Infinity : n.log10().toNumber(),
    double: (n) => n.towerLog !== undefined ? Infinity : n.log10().max(1).log10().toNumber(),
    tower: (n) => n.towerLog !== undefined ? Math.pow(10, n.towerLog) : n.slog(10, 100, true).toNumber(),
    height: (n) => M.towerLog(n)
  };
  function automatic(max) {
    if (max.towerLog !== undefined) return 'height';
    if (max.lt(1e6)) return 'linear';
    if (max.log10().lt(1e6)) return 'log';
    if (max.log10().max(1).log10().lt(1e6)) return 'double';
    if (max.slog(10, 100, true).lt(1000)) return 'tower';
    return 'height';
  }
  class GrowthGraph {
    constructor(canvas, elements) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.elements = elements;
      this.samples = new Array(CAPACITY);
      this.start = 0;
      this.size = 0;
      this.pointer = null;
      this.lastScale = '';
      this.width = 0;
      this.height = 0;
      this.plot = [];
      this.resizeObserver = new ResizeObserver(() => { this.width = 0; });
      this.resizeObserver.observe(canvas.parentElement);
      canvas.addEventListener('pointermove', (event) => {
        const bounds = canvas.getBoundingClientRect();
        this.pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
        this.inspect();
      });
      canvas.addEventListener('pointerleave', () => { this.pointer = null; this.elements.readout.textContent = ''; });
    }
    clear(time, number) {
      this.start = 0;
      this.size = 0;
      this.plot = [];
      this.elements.readout.textContent = '';
      this.add(time, number);
    }
    add(time, number) {
      const last = this.size ? this.samples[(this.start + this.size - 1) % CAPACITY] : null;
      if (last && time === last.time) {
        last.number = number;
        last.coordinates = Object.create(null);
        return;
      }
      const index = (this.start + this.size) % CAPACITY;
      this.samples[index] = { time, number, coordinates: Object.create(null) };
      if (this.size < CAPACITY) this.size++;
      else this.start = (this.start + 1) % CAPACITY;
    }
    inspect() {
      if (!this.pointer || !this.plot.length) return;
      let low = 0;
      let high = this.plot.length - 1;
      while (low < high) {
        const middle = (low + high) >>> 1;
        if (this.plot[middle].x < this.pointer.x) low = middle + 1;
        else high = middle;
      }
      let nearest = this.plot[low];
      if (low > 0 && Math.abs(this.plot[low - 1].x - this.pointer.x) < Math.abs(nearest.x - this.pointer.x)) nearest = this.plot[low - 1];
      this.elements.readout.textContent = E.text.graphPoint(nearest.future ? `+${M.duration(nearest.offset)}` : `${M.duration(-nearest.offset)} ${E.labels.past}`, M.compact(nearest.number));
    }
    render(state, now, current) {
      if (!this.ctx) {
        this.elements.message.textContent = E.labels.graphUnavailable;
        this.elements.message.hidden = false;
        return;
      }
      const settings = state.settings;
      const past = [];
      for (let i = 0; i < this.size; i++) {
        const sample = this.samples[(this.start + i) % CAPACITY];
        if (sample.time >= now - settings.window) past.push({ ...sample, offset: sample.time - now, future: false });
      }
      past.push({ time: now, number: current, offset: 0, future: false });
      const future = [{ time: now, number: current, offset: 0, future: true }];
      if (settings.forecast && !state.paused) {
        for (let i = 1; i <= 40; i++) {
          const offset = settings.forecast * i / 40;
          future.push({ time: now + offset, number: M.project(state, offset), offset, future: true });
        }
      }
      const all = past.concat(future);
      let largest = current;
      for (const p of all) if (M.greater(p.number, largest)) largest = p.number;
      const scale = settings.scale === 'auto' ? automatic(largest) : settings.scale;
      this.elements.active.textContent = settings.scale === 'auto' ? E.text.autoScale(E.scale[scale]) : E.scale[scale];
      this.elements.note.textContent = `${E.scaleNotes[scale]} ${settings.scale === 'auto' ? E.text.foresight : ''} ${settings.forecast ? E.text.preview(M.duration(settings.forecast)) : ''}`;
      if (this.lastScale && this.lastScale !== scale && settings.scale === 'auto') this.canvas.setAttribute('aria-label', E.text.scaleChanged(E.scale[scale]));
      this.lastScale = scale;
      const transform = transformations[scale];
      let min = Infinity;
      let max = -Infinity;
      let invalid = false;
      for (const p of all) {
        p.yValue = p.coordinates && Object.hasOwn(p.coordinates, scale) ? p.coordinates[scale] : transform(p.number);
        if (p.coordinates) p.coordinates[scale] = p.yValue;
        if (!Number.isFinite(p.yValue) || Math.abs(p.yValue) > Number.MAX_VALUE / 4) { invalid = true; continue; }
        min = Math.min(min, p.yValue);
        max = Math.max(max, p.yValue);
      }
      const bounds = this.canvas.getBoundingClientRect();
      const width = Math.max(240, Math.round(bounds.width));
      const height = Math.max(220, Math.round(bounds.height));
      const ratio = Math.min(2, window.devicePixelRatio || 1);
      if (width !== this.width || height !== this.height || ratio !== this.ratio) {
        this.canvas.width = Math.round(width * ratio);
        this.canvas.height = Math.round(height * ratio);
        this.width = width;
        this.height = height;
        this.ratio = ratio;
      }
      const ctx = this.ctx;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, width, height);
      this.elements.message.hidden = !invalid;
      if (invalid) {
        this.elements.message.textContent = E.labels.graphUnavailable;
        this.plot = [];
        this.elements.readout.textContent = '';
        return;
      }
      if (max - min < 1e-9 * Math.max(1, Math.abs(max))) {
        min -= Math.max(0.5, Math.abs(max) * 0.03);
        max += Math.max(0.5, Math.abs(max) * 0.03);
      } else {
        const padding = (max - min) * 0.08;
        min = Math.max(0, min - padding);
        max += padding;
      }
      const left = width < 420 ? 60 : 76;
      const right = width - 18;
      const top = 27;
      const bottom = height - 34;
      const firstOffset = Math.min(-10, past[0]?.offset ?? -10);
      const endOffset = settings.forecast && !state.paused ? settings.forecast : 0;
      const x = (offset) => left + (offset - firstOffset) / (endOffset - firstOffset) * (right - left);
      const y = (coordinate) => bottom - (coordinate - min) / (max - min) * (bottom - top);
      ctx.font = '11px ui-monospace, Consolas, monospace';
      ctx.lineWidth = 1;
      ctx.textBaseline = 'middle';
      for (let i = 0; i <= 4; i++) {
        const v = min + (max - min) * i / 4;
        const yp = y(v);
        ctx.strokeStyle = '#e2e0d7';
        ctx.beginPath(); ctx.moveTo(left, yp); ctx.lineTo(right, yp); ctx.stroke();
        ctx.fillStyle = '#6a6d60';
        ctx.textAlign = 'right';
        ctx.fillText(Math.abs(v) >= 1e6 ? v.toExponential(1) : v.toLocaleString('en-US', { maximumFractionDigits: Math.abs(v) < 10 ? 2 : 1 }), left - 8, yp);
      }
      ctx.textAlign = 'left';
      ctx.fillStyle = '#6a6d60';
      ctx.fillText(E.axis[scale], left, 10);
      for (let i = 0; i <= 4; i++) {
        const offset = firstOffset + (endOffset - firstOffset) * i / 4;
        ctx.textAlign = i === 0 ? 'left' : i === 4 ? 'right' : 'center';
        ctx.fillText(Math.abs(offset) < 1 ? E.labels.now : `${offset > 0 ? '+' : '−'}${M.duration(Math.abs(offset))}`, x(offset), height - 11);
      }
      ctx.save();
      ctx.beginPath(); ctx.rect(left, top, right - left, bottom - top); ctx.clip();
      const drawLine = (points, dashed) => {
        if (points.length < 2) return;
        ctx.beginPath();
        ctx.setLineDash(dashed ? [5, 5] : []);
        ctx.strokeStyle = dashed ? '#9a9b8e' : '#a64021';
        ctx.lineWidth = dashed ? 1.5 : 2;
        points.forEach((p, i) => { p.x = x(p.offset); p.y = y(p.yValue); if (i) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y); });
        ctx.stroke();
      };
      drawLine(past, false);
      drawLine(future, true);
      ctx.setLineDash([2, 4]);
      ctx.strokeStyle = '#bbbbae';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x(0), top); ctx.lineTo(x(0), bottom); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#a64021';
      ctx.beginPath(); ctx.arc(x(0), y(transform(current)), 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      this.plot = past.concat(future.slice(1));
      this.inspect();
    }
  }
  globalThis.MagnitudeGraph = GrowthGraph;
})();
