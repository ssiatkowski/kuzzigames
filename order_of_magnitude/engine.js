(() => {
  'use strict';
  if (typeof Decimal === 'undefined') return;
  const E = globalThis.MagnitudeEnglish;
  const D = (n) => new Decimal(n);
  const VERSION = 2;
  const MAX_AWAY = 43200;
  const LIMIT = Number.MAX_VALUE / 4;
  const GOOGOLPLEX_HEIGHT = D('ee100').slog(10, 100, true).toNumber();
  const FOUR_FLOOR_TOWER = D(10).tetrate(4, 1, true);
  const floors = [1, 6, 2, GOOGOLPLEX_HEIGHT, 2];
  const goals = [1e6, 100, 100, 100, 6];
  const baseSpeeds = [100, 0.001, 0.0001, 0.0001, 0.00001];
  const costs = [15, 20, 30];
  const ratios = [1.25, 1.5, 1.25];
  const theoryCosts = [3, 5, 12, 25, 40, 8];
  const focusRates = { balanced: [1, 1], momentum: [2, 0.5], inquiry: [0.5, 2] };
  const landmarks = [
    [0, 1000], [0, 1e6], [1, 9], [1, 12], [1, 18], [1, 33], [1, 63], [1, 100],
    [2, Math.log10(303)], [2, Math.log10(308)], [2, 4], [2, 100],
    [3, 4], [3, 100], [4, 3], [4, 6]
  ];
  const challengeTargets = [[0, 1e6], [1, 100], [2, 50]];
  const challengeRewards = [10, 20, 1000];
  const challengeGrowth = [2, 4];
  const legacyChallengeRewards = [8, 16, 32];

  function newRun() {
    return { chapter: 0, coordinate: 1, insight: 0, levels: [0, 0, 0], focus: 'balanced', auto: false, clock: 0, chapterTime: 0 };
  }
  function fresh() {
    return { version: VERSION, savedAt: Date.now(), run: newRun(), proofs: 0, published: 0, theories: [0, 0, 0, 0, 0, 0], discoveries: 0, completed: [false, false, false], challenge: null, suspended: null, totalTime: 0, paused: false, finished: false, settings: { scale: 'auto', window: 300, forecast: 60, buy: '1' } };
  }
  function valueAt(chapter, coordinate) {
    if (chapter === 0) return D(coordinate);
    if (chapter === 1) return D(10).pow(coordinate);
    if (chapter === 2) return D(10).pow(D(10).pow(coordinate));
    // Decimal layers use native numbers; retain logarithmic tower height beyond exact layer integers.
    if (chapter === 4 && coordinate > 15) return { towerLog: coordinate };
    return D(10).tetrate(chapter === 3 ? coordinate : Math.pow(10, coordinate), 1, true);
  }
  function towerLog(n) {
    return n.towerLog ?? n.slog(10, 100, true).max(1).log10().toNumber();
  }
  function greater(a, b) {
    if (a.towerLog !== undefined || b.towerLog !== undefined) return towerLog(a) > towerLog(b);
    return a.gt(b);
  }
  const value = (s) => valueAt(s.run.chapter, s.run.coordinate);
  const cap = (chapter) => chapter === 4 ? LIMIT : goals[chapter];
  const progress = (s) => Math.min(1, Math.max(0, (s.run.coordinate - floors[s.run.chapter]) / (goals[s.run.chapter] - floors[s.run.chapter])));
  function reached(run, target) {
    return run.chapter > target[0] || (run.chapter === target[0] && run.coordinate >= target[1]);
  }
  function discover(s) {
    while (s.discoveries < landmarks.length && reached(s.run, landmarks[s.discoveries])) s.discoveries++;
    if (s.challenge === null && reached(s.run, landmarks[15])) s.finished = true;
  }
  function rates(s) {
    const r = s.run;
    const f = focusRates[r.focus];
    const baseSpeed = baseSpeeds[r.chapter];
    const baseIncome = 1 + 0.25 * r.chapter;
    const coefficient = 1 + r.levels[0];
    const composition = 1 + 0.5 * r.levels[1];
    const observation = 1 + 0.5 * r.levels[2];
    const incomeResearch = (s.theories[1] ? 5 : 1) * (s.theories[4] ? 3 : 1);
    let permanent = (1 + 0.18 * Math.sqrt(s.published)) * (1 + 0.025 * s.discoveries);
    permanent *= s.theories[0] ? 3 : 1;
    permanent *= s.theories[4] ? 5 : 1;
    for (let i = 0; i < challengeGrowth.length; i++) if (s.completed[i]) permanent *= challengeGrowth[i];
    const fixedPermanent = permanent;
    permanent *= Math.pow(2, s.theories[5]);
    if (s.completed[2]) permanent *= permanent;
    if (s.challenge === 2) permanent = 1;
    const speed = Math.min(Number.MAX_VALUE / 4, baseSpeed * coefficient * composition * permanent * f[0]);
    // Only bounded chapter coordinates are integrated; Decimal preserves bonuses beyond native range.
    if (!Number.isFinite(permanent)) {
      permanent = D(2).pow(s.theories[5]).mul(fixedPermanent);
      if (s.completed[2]) permanent = permanent.pow(2);
    }
    return {
      speed,
      income: baseIncome * observation * incomeResearch * f[1],
      permanent, baseSpeed, baseIncome, coefficient, composition, observation, incomeResearch,
      speedFocus: f[0], incomeFocus: f[1]
    };
  }
  function cost(s, index, count = 1) {
    return costs[index] * Math.pow(ratios[index], s.run.levels[index]) * (Math.pow(ratios[index], count) - 1) / (ratios[index] - 1);
  }
  const canBuy = (s, index) => s.run.levels[index] < 60 && !(s.challenge === 0 && index === 1);
  function purchaseCount(s, index, maximum = false) {
    if (!canBuy(s, index)) return 0;
    const firstCost = cost(s, index);
    if (s.run.insight < firstCost) return 0;
    let count = maximum ? Math.floor(Math.log1p(s.run.insight * (ratios[index] - 1) / firstCost) / Math.log(ratios[index])) : 1;
    count = Math.min(60 - s.run.levels[index], Math.max(1, count));
    // The inverse geometric sum can round up at an exact affordability boundary.
    while (count > 1 && cost(s, index, count) > s.run.insight) count--;
    return count;
  }
  function buy(s, index, maximum = false) {
    if (!Number.isInteger(index) || index < 0 || index > 2 || !canBuy(s, index)) return false;
    const r = s.run;
    const count = purchaseCount(s, index, maximum);
    if (!count) return false;
    r.insight = Math.max(0, r.insight - cost(s, index, count));
    r.levels[index] += count;
    return true;
  }
  function autobuy(s) {
    if (!s.run.auto || !s.theories[2]) return;
    for (let purchase = 0; purchase < 3; purchase++) {
      let index = -1;
      let cheapest = Infinity;
      for (let i = 0; i < 3; i++) {
        const price = cost(s, i);
        if (canBuy(s, i) && price <= s.run.insight && price < cheapest) {
          cheapest = price;
          index = i;
        }
      }
      if (index < 0) break;
      buy(s, index);
    }
  }
  function finishChallenge(s) {
    const id = s.challenge;
    if (id === null || !reached(s.run, challengeTargets[id])) return null;
    s.completed[id] = true;
    s.proofs += challengeRewards[id];
    s.published += challengeRewards[id];
    s.run = s.suspended;
    s.suspended = null;
    s.challenge = null;
    discover(s);
    return id;
  }
  function step(s, seconds) {
    if (s.paused || !Number.isFinite(seconds) || seconds <= 0) return { completed: null };
    let remaining = Math.min(MAX_AWAY, seconds);
    let completed = null;
    discover(s);
    // Integration stops at discrete events: purchases, discoveries, and experiment targets.
    // Between events the natural-coordinate derivative is constant, so no huge-number ticks are needed.
    while (remaining > 1e-8) {
      const r = s.run;
      const current = rates(s);
      let dt = remaining;
      let purchaseIn = Infinity;
      if (r.auto && s.theories[2]) {
        let cheapest = Infinity;
        for (let i = 0; i < 3; i++) if (canBuy(s, i)) cheapest = Math.min(cheapest, cost(s, i));
        if (Number.isFinite(cheapest)) {
          const affordableIn = Math.max(0, (cheapest - r.insight) / current.income);
          const boundary = 1 - r.clock;
          purchaseIn = boundary + Math.max(0, Math.ceil(affordableIn - boundary));
          dt = Math.min(dt, purchaseIn);
        }
      }
      const next = landmarks[s.discoveries];
      if (next && next[0] === r.chapter && next[1] > r.coordinate) dt = Math.min(dt, (next[1] - r.coordinate) / current.speed);
      const challengeTarget = s.challenge === null ? null : challengeTargets[s.challenge];
      if (challengeTarget && challengeTarget[0] === r.chapter && challengeTarget[1] > r.coordinate) dt = Math.min(dt, (challengeTarget[1] - r.coordinate) / current.speed);
      dt = Math.max(Math.min(dt, remaining), Math.min(1e-7, remaining));
      r.coordinate = Math.min(cap(r.chapter), r.coordinate + current.speed * dt);
      r.insight = Math.min(1e12, r.insight + current.income * dt);
      r.chapterTime += dt;
      s.totalTime += dt;
      r.clock = (r.clock + dt) % 1;
      if (r.clock > 1 - 1e-8 || r.clock < 1e-8) r.clock = 0;
      remaining -= dt;
      discover(s);
      const finished = finishChallenge(s);
      if (finished !== null) completed = finished;
      if (finished === null && dt >= purchaseIn - 1e-8) autobuy(s);
    }
    return { completed };
  }
  function advance(s) {
    const r = s.run;
    if (r.chapter >= 4 || r.coordinate < goals[r.chapter]) return false;
    r.chapter++;
    r.coordinate = floors[r.chapter];
    r.levels = [0, 0, 0];
    r.chapterTime = 0;
    discover(s);
    return true;
  }
  function proofGain(s) {
    const p = progress(s);
    return s.challenge !== null || p < 0.25 ? 0 : Math.floor((1 + 8 * Math.pow(p, 1.4)) * (s.run.chapter + 1));
  }
  function publish(s) {
    const gain = proofGain(s);
    if (!gain) return 0;
    const r = s.run;
    s.proofs += gain;
    s.published += gain;
    r.coordinate = floors[r.chapter];
    r.insight = 0;
    r.levels = r.levels.map((n) => s.theories[3] ? Math.floor(n / 2) : 0);
    r.clock = 0;
    r.chapterTime = 0;
    return gain;
  }
  function theoryCost(s, index) {
    if (index !== 5) return D(theoryCosts[index]);
    const level = s.theories[5];
    return level <= 1020 ? D(theoryCosts[index] * Math.pow(2, level)) : D(2).pow(level).mul(theoryCosts[index]);
  }
  function learn(s, index) {
    if (!Number.isInteger(index) || index < 0 || index > 5) return false;
    const price = theoryCost(s, index);
    if ((index !== 5 && s.theories[index] >= 1) || price.gt(s.proofs)) return false;
    s.proofs = D(s.proofs).sub(price).toNumber();
    s.theories[index]++;
    return true;
  }
  function startChallenge(s, index) {
    if (!Number.isInteger(index) || index < 0 || index > 2 || s.challenge !== null || s.completed[index] || s.discoveries < 8) return false;
    s.suspended = { ...s.run, levels: [...s.run.levels] };
    s.run = newRun();
    s.run.auto = s.suspended.auto;
    s.run.focus = index === 1 ? 'inquiry' : s.suspended.focus;
    s.challenge = index;
    return true;
  }
  function leaveChallenge(s) {
    if (s.challenge === null) return false;
    s.run = s.suspended;
    s.suspended = null;
    s.challenge = null;
    discover(s);
    return true;
  }
  function project(s, seconds) {
    return valueAt(s.run.chapter, Math.min(cap(s.run.chapter), s.run.coordinate + rates(s).speed * seconds));
  }
  function compact(n, places = 3) {
    if (n.towerLog !== undefined) return `10 ↑↑ (${compact(D(10).pow(n.towerLog), places)})`;
    if (n.layer === 0 && n.mag < 1e6) return n.toNumber().toLocaleString('en-US', { maximumFractionDigits: places });
    if (n.layer <= 2) return n.toStringWithDecimalPlaces(places);
    return `10 ↑↑ ${n.slog(10, 100, true).toNumber().toLocaleString('en-US', { maximumFractionDigits: places })}`;
  }
  function name(n) {
    if (n.towerLog !== undefined) return E.text.towerName(compact(D(10).pow(n.towerLog)));
    if (n.lt(1000)) return compact(n, 2);
    const exponent = n.log10();
    if (exponent.lt(66)) {
      const group = Math.floor(exponent.toNumber() / 3);
      const mantissa = n.div(D(10).pow(group * 3));
      return E.text.numberName(compact(mantissa, 2), E.shortNames[group]);
    }
    if (n.eq('1e100')) return E.text.exactName(E.landmarks[7].name);
    if (n.eq('1e303')) return E.text.exactName(E.landmarks[8].name);
    if (n.eq('ee100')) return E.text.exactName(E.landmarks[11].name);
    if (n.gte('ee100') && n.lt(FOUR_FLOOR_TOWER)) return E.text.beyond(E.landmarks[11].name, E.text.powerName(compact(exponent)));
    if (n.layer >= 3) return E.text.towerName(n.slog(10, 100, true).toNumber().toLocaleString('en-US', { maximumFractionDigits: 3 }));
    return E.text.powerName(compact(exponent));
  }
  function digitCount(n) {
    if (n.towerLog !== undefined) return `10 ↑↑ (${compact(D(10).pow(n.towerLog))} − 1)`;
    return compact(n.log10().floor().add(1), 0);
  }
  function sizeTime(seconds) {
    let amount = seconds;
    let unit = 'seconds';
    if (seconds.gte(31557600)) { amount = seconds.div(31557600); unit = 'years'; }
    else if (seconds.gte(86400)) { amount = seconds.div(86400); unit = 'days'; }
    else if (seconds.gte(3600)) { amount = seconds.div(3600); unit = 'hours'; }
    else if (seconds.gte(60)) { amount = seconds.div(60); unit = 'minutes'; }
    return E.sizeTime[unit](compact(amount, 1));
  }
  function sizeFact(n) {
    if (n.towerLog !== undefined) return E.text.peelingFact(sizeTime(D(10).pow(n.towerLog)));
    if (n.lt('1e100')) {
      const time = sizeTime(n);
      return n.gte(1000) && n.lt('1e66') ? E.text.namedCountingFact(name(n), time) : E.text.countingFact(time);
    }
    if (n.lt(FOUR_FLOOR_TOWER)) {
      const time = sizeTime(n.log10().floor().add(1));
      return n.gte('ee100') ? E.text.googolplexWritingFact(time) : E.text.writingFact(time);
    }
    const logarithms = Math.floor(n.slog(10, 100, true).toNumber());
    return logarithms < 1000 ? E.text.logarithmFact(logarithms.toLocaleString('en-US')) : E.text.peelingFact(sizeTime(D(logarithms)));
  }
  function duration(seconds) {
    if (!Number.isFinite(seconds)) return '∞';
    if (seconds < 60) return `${Math.ceil(seconds)}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${Math.floor(seconds % 60)}s`;
    return `${Math.floor(seconds / 3600)}h ${Math.floor(seconds % 3600 / 60)}m`;
  }
  function finite(n, min, max, integer = false) {
    return typeof n === 'number' && Number.isFinite(n) && n >= min && n <= max && (!integer || Number.isInteger(n));
  }
  function validRun(r) {
    return r && finite(r.chapter, 0, 4, true) && finite(r.coordinate, floors[r.chapter], cap(r.chapter)) && finite(r.insight, 0, 1e12) && Array.isArray(r.levels) && r.levels.length === 3 && r.levels.every((n) => finite(n, 0, 60, true)) && typeof r.focus === 'string' && Object.hasOwn(focusRates, r.focus) && typeof r.auto === 'boolean' && finite(r.clock, 0, 1) && finite(r.chapterTime, 0, 1e12);
  }
  function validate(s) {
    if (!s || s.version !== VERSION || !finite(s.savedAt, 0, 1e15) || !validRun(s.run) || !finite(s.proofs, 0, Number.MAX_SAFE_INTEGER, true) || !finite(s.published, s.proofs, Number.MAX_SAFE_INTEGER, true)) return false;
    if (!Array.isArray(s.theories) || s.theories.length !== 6 || !s.theories.every((n, i) => finite(n, 0, i === 5 ? Number.MAX_SAFE_INTEGER : 1, true))) return false;
    if (!finite(s.discoveries, 0, 16, true) || !Array.isArray(s.completed) || s.completed.length !== 3 || !s.completed.every((n) => typeof n === 'boolean') || !finite(s.totalTime, 0, 1e12)) return false;
    if (typeof s.paused !== 'boolean' || typeof s.finished !== 'boolean') return false;
    if (s.challenge !== null && (!finite(s.challenge, 0, 2, true) || !validRun(s.suspended) || s.completed[s.challenge] || s.discoveries < 8)) return false;
    if (s.challenge === null && s.suspended !== null) return false;
    if (s.challenge === 0 && s.run.levels[1] !== 0) return false;
    if (s.challenge === 1 && s.run.focus !== 'inquiry') return false;
    const settings = s.settings;
    return settings && ['auto', 'linear', 'log', 'double', 'tower', 'height'].includes(settings.scale) && [60, 300, 1200].includes(settings.window) && [0, 60, 300].includes(settings.forecast) && ['1', 'max'].includes(settings.buy);
  }
  function parse(text) {
    if (typeof text !== 'string' || text.length > 50000) throw new Error('Invalid save');
    const parsed = JSON.parse(text);
    const legacy = parsed && parsed.version === 1;
    if (legacy) parsed.version = VERSION;
    if (!validate(parsed)) throw new Error('Invalid save');
    const s = fresh();
    const copyRun = (r) => ({ chapter: r.chapter, coordinate: r.coordinate, insight: r.insight, levels: [...r.levels], focus: r.focus, auto: r.auto, clock: r.clock, chapterTime: r.chapterTime });
    for (const key of ['savedAt', 'proofs', 'published', 'discoveries', 'challenge', 'totalTime', 'paused', 'finished']) s[key] = parsed[key];
    s.run = copyRun(parsed.run);
    s.suspended = parsed.suspended === null ? null : copyRun(parsed.suspended);
    s.theories = [...parsed.theories];
    s.completed = [...parsed.completed];
    if (legacy) {
      for (let i = 0; i < s.completed.length; i++) {
        if (!s.completed[i]) continue;
        const extraProofs = challengeRewards[i] - legacyChallengeRewards[i];
        s.proofs += extraProofs;
        s.published += extraProofs;
      }
    }
    s.settings = { scale: parsed.settings.scale, window: parsed.settings.window, forecast: parsed.settings.forecast, buy: parsed.settings.buy };
    discover(s);
    if (!validate(s)) throw new Error('Invalid save');
    return s;
  }
  globalThis.MagnitudeEngine = Object.freeze({ VERSION, MAX_AWAY, LIMIT, floors, goals, fresh, valueAt, value, cap, progress, rates, cost, canBuy, purchaseCount, buy, step, advance, proofGain, publish, theoryCost, learn, startChallenge, leaveChallenge, project, compact, name, digitCount, sizeFact, towerLog, greater, duration, validate, parse });
})();
