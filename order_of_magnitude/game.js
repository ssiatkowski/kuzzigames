(() => {
  'use strict';
  const E = globalThis.MagnitudeEnglish;
  const M = globalThis.MagnitudeEngine;
  const app = document.getElementById('app');
  if (!E) return;
  document.title = `${E.title} | KuzziGames`;
  const meta = document.createElement('meta');
  meta.name = 'description'; meta.content = E.description; document.head.append(meta);
  if (!M) { app.textContent = E.labels.noLibrary; return; }
  app.innerHTML = E.markup;
  const nodes = Object.create(null);
  for (const node of document.querySelectorAll('[id]')) nodes[node.id] = node;
  const write = (node, value) => { const text = String(value); if (node.textContent !== text) node.textContent = text; };
  const put = (id, value) => write(nodes[id], value);
  const KEY = 'kuzzigames.order-of-magnitude.v1';
  let state = M.fresh();
  let originalSave = null;
  let saveBlocked = false;
  let lastWall = Date.now();
  let sessionTime = 0;
  let lastSample = 0;
  let lastGraphDraw = -Infinity;
  let lastAtlas = -1;
  let noticeUntil = 0;
  let importMode = false;
  let latestNumber = M.value(state);
  let numberChapter = -1;
  let numberCoordinate = NaN;
  let lastRateKey = '';
  const formatRate = (value) => value instanceof Decimal ? M.compact(value) : value.toLocaleString('en-US', { maximumSignificantDigits: 4 });
  const focusInputs = [...document.querySelectorAll('input[name="focus"]')];
  const apparatus = E.apparatus.map((data, index) => {
    const row = document.createElement('div'); row.className = 'upgrade';
    const symbol = document.createElement('span'); symbol.className = 'upgrade-symbol'; symbol.textContent = data.symbol; symbol.setAttribute('aria-hidden', 'true');
    const info = document.createElement('div');
    const title = document.createElement('strong'); title.textContent = data.name;
    const level = document.createElement('span'); level.className = 'level';
    title.append(level);
    const description = document.createElement('p'); description.textContent = data.description;
    info.append(title, description);
    const button = document.createElement('button'); button.dataset.buy = index;
    const label = document.createElement('span');
    const price = document.createElement('small');
    button.append(label, price); row.append(symbol, info, button); nodes.apparatus.append(row);
    return { level, button, label, price };
  });
  const theories = E.theories.map((data, index) => {
    const row = document.createElement('div'); row.className = 'theory';
    const title = document.createElement('h3'); title.textContent = data.name;
    const level = document.createElement('span'); level.className = 'level'; title.append(level);
    const learnedBadge = document.createElement('span'); learnedBadge.className = 'learned-badge'; learnedBadge.textContent = E.labels.learned; learnedBadge.hidden = true; title.append(learnedBadge);
    const description = document.createElement('p'); description.textContent = data.description;
    const button = document.createElement('button'); button.dataset.theory = index;
    row.append(title, description, button); nodes.theories.append(row);
    return { level, button, learnedBadge, row };
  });
  const challenges = E.challenges.map((data, index) => {
    const row = document.createElement('div'); row.className = 'challenge';
    const title = document.createElement('h3'); title.textContent = data.name;
    const solvedBadge = document.createElement('span'); solvedBadge.className = 'solved-badge'; solvedBadge.textContent = E.labels.complete; solvedBadge.hidden = true; title.append(solvedBadge);
    const rule = document.createElement('p'); rule.textContent = data.rule;
    const reward = document.createElement('p'); reward.className = 'reward'; reward.textContent = data.reward;
    const button = document.createElement('button'); button.dataset.challenge = index;
    row.append(title, rule, reward, button); nodes.challenges.append(row);
    return { button, solvedBadge, row };
  });
  const atlas = E.landmarks.map((data) => {
    const row = document.createElement('div'); row.className = 'landmark';
    const name = document.createElement('strong'); name.textContent = data.name;
    const detail = document.createElement('small'); detail.textContent = data.detail;
    const status = document.createElement('small');
    row.append(name, detail, status); nodes.atlas.append(row);
    return { row, status };
  });
  const graph = new globalThis.MagnitudeGraph(nodes.graph, { active: nodes['active-scale'], note: nodes['scale-note'], readout: nodes['graph-readout'], message: nodes['graph-message'] });
  put('atlas-hint', E.text.archiveHint);
  put('precision-note', E.text.approximation);

  function notify(message, persistent = false) {
    put('notice', message);
    nodes.notice.hidden = false;
    noticeUntil = persistent ? Infinity : Date.now() + 18000;
  }
  function applyAway() {
    const seconds = Math.max(0, (Date.now() - state.savedAt) / 1000);
    if (seconds < 30) { M.step(state, seconds); return; }
    if (state.paused) { notify(E.text.pausedAway); return; }
    const result = M.step(state, seconds);
    let message = E.text.away(M.duration(Math.min(seconds, M.MAX_AWAY)));
    if (seconds > M.MAX_AWAY) message += ` ${E.text.awayCap}`;
    if (result.completed !== null) message += ` ${E.text.challengeDone(E.challenges[result.completed].name)}`;
    notify(message);
  }
  try {
    originalSave = localStorage.getItem(KEY);
    if (originalSave) {
      try { state = M.parse(originalSave); applyAway(); }
      catch { saveBlocked = true; notify(E.text.corruptStored, true); }
    }
  } catch { put('save-status', E.labels.saveFailed); }
  lastWall = Date.now();

  function settle() {
    const now = Date.now();
    const elapsed = Math.max(0, (now - lastWall) / 1000);
    lastWall = now;
    const before = state.totalTime;
    const result = M.step(state, elapsed);
    sessionTime += state.totalTime - before;
    if (result.completed !== null) {
      graph.clear(sessionTime, M.value(state));
      notify(E.text.challengeDone(E.challenges[result.completed].name));
    } else if (elapsed > 30 && !state.paused) {
      notify(`${E.text.away(M.duration(Math.min(elapsed, M.MAX_AWAY)))}${elapsed > M.MAX_AWAY ? ` ${E.text.awayCap}` : ''}`);
    }
  }
  function save() {
    if (saveBlocked) { put('save-status', E.text.corruptStored); return false; }
    state.savedAt = Date.now();
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      put('save-status', E.labels.autosaved);
      return true;
    } catch { put('save-status', E.labels.saveFailed); return false; }
  }
  function syncControls() {
    nodes.scale.value = state.settings.scale;
    nodes.window.value = String(state.settings.window);
    nodes.forecast.value = String(state.settings.forecast);
    nodes['buy-mode'].value = state.settings.buy;
  }
  function resetGraph() {
    latestNumber = M.value(state);
    graph.clear(sessionTime, latestNumber);
    lastSample = sessionTime;
    lastGraphDraw = -Infinity;
  }
  function renderRateBreakdown(rates, chapter) {
    if (!nodes['rate-details'].open) return;
    const run = state.run;
    const key = `${run.chapter}|${run.levels[0]}|${run.levels[1]}|${run.levels[2]}|${run.focus}|${rates.permanent}|${rates.incomeResearch}`;
    if (key === lastRateKey) return;
    lastRateKey = key;
    put('speed-breakdown', E.text.speedBreakdown(formatRate(rates.baseSpeed), formatRate(rates.coefficient), formatRate(rates.composition), formatRate(rates.permanent), formatRate(rates.speedFocus), E.text.rate(formatRate(rates.speed), chapter.units)));
    put('income-breakdown', E.text.incomeBreakdown(formatRate(rates.baseIncome), formatRate(rates.observation), formatRate(rates.incomeResearch), formatRate(rates.incomeFocus), formatRate(rates.income)));
  }
  function render(forceGraph = false) {
    const run = state.run;
    const chapter = E.chapters[run.chapter];
    const rates = M.rates(state);
    const p = M.progress(state);
    const gain = M.proofGain(state);
    if (run.chapter !== numberChapter || run.coordinate !== numberCoordinate) {
      latestNumber = M.value(state);
      numberChapter = run.chapter;
      numberCoordinate = run.coordinate;
      put('number', `≈ ${M.compact(latestNumber)}`);
      put('number-name', M.sizeFact(latestNumber));
      put('digits', E.text.digits(M.digitCount(latestNumber)));
    }
    put('record', state.discoveries === E.landmarks.length ? E.text.mastered : E.text.nextRecord(E.landmarks[state.discoveries].name));
    put('chapter-label', E.text.chapter(run.chapter + 1));
    const percent = (p * 100).toFixed(1);
    if (nodes.progress.getAttribute('aria-valuenow') !== percent) {
      nodes.progress.setAttribute('aria-valuenow', percent);
      nodes['progress-fill'].style.width = `${percent}%`;
    }
    put('progress-text', E.text.progress(percent, chapter.target));
    put('eta', state.paused ? E.labels.graphPaused : run.coordinate >= M.cap(run.chapter) ? (run.chapter === 4 ? E.labels.ceiling : E.text.completedChapter) : p >= 1 ? E.labels.finish : E.text.eta(M.duration((M.goals[run.chapter] - run.coordinate) / rates.speed)));
    put('chapter-name', chapter.name);
    put('operator', chapter.operator);
    put('story', chapter.story);
    put('law', chapter.law);
    put('equation-key', E.text.equationKey(chapter.coordinate));
    put('lesson', chapter.lesson);
    put('speed', E.text.rate(formatRate(rates.speed), chapter.units));
    put('insight', run.insight.toLocaleString('en-US', { maximumFractionDigits: 1 }));
    put('income', E.text.insightRate(rates.income.toLocaleString('en-US', { maximumFractionDigits: 2 })));
    renderRateBreakdown(rates, chapter);
    for (const input of focusInputs) {
      input.checked = input.value === run.focus;
      input.disabled = state.challenge === 1;
    }
    for (let index = 0; index < apparatus.length; index++) {
      const a = apparatus[index];
      const maxed = run.levels[index] >= 60;
      const count = M.purchaseCount(state, index, state.settings.buy === 'max');
      const price = M.cost(state, index, Math.max(1, count));
      write(a.level, E.text.apparatusLevel(run.levels[index]));
      write(a.label, maxed ? E.labels.max : M.canBuy(state, index) ? (state.settings.buy === 'max' && count ? E.text.buyLevels(count) : E.labels.buy) : E.labels.locked);
      write(a.price, maxed ? '' : E.text.resource(price.toLocaleString('en-US', { maximumFractionDigits: 1 }), E.labels.insight));
      a.button.disabled = !M.canBuy(state, index) || price > run.insight;
    }
    nodes.autobuy.disabled = !state.theories[2];
    put('autobuy', !state.theories[2] ? E.text.autoLocked : run.auto ? E.labels.autoOn : E.labels.autoOff);
    put('advance', chapter.next);
    nodes.advance.disabled = p < 1 || run.chapter === 4;
    put('advance-hint', run.chapter === 4 && p >= 1 ? E.labels.finish : p >= 1 ? E.labels.advanceReady : chapter.target);
    put('proofs', E.text.resource(state.proofs.toLocaleString('en-US'), E.labels.proofs));
    put('proof-total', E.text.proofTotal(state.published));
    put('publish', gain ? `${E.labels.publish} · +${gain}` : E.labels.publish);
    nodes.publish.disabled = !gain;
    put('proof-hint', state.challenge !== null ? E.labels.challengeRunning : gain ? E.text.proofHint(gain) : E.text.proofLocked);
    for (let index = 0; index < theories.length; index++) {
      const t = theories[index];
      const learned = index !== 5 && state.theories[index] >= 1;
      if (t.button.hidden !== learned) {
        t.button.hidden = learned;
        t.learnedBadge.hidden = !learned;
        t.row.classList.toggle('learned', learned);
      }
      write(t.level, index === 5 ? E.text.repeatableLevel(state.theories[index]) : '');
      if (learned) { t.button.disabled = true; continue; }
      const cost = M.theoryCost(state, index);
      const priceLabel = cost.layer === 0 && cost.mag < 1e15 ? cost.toNumber().toLocaleString('en-US', { maximumFractionDigits: 0 }) : M.compact(cost);
      write(t.button, E.text.resource(priceLabel, E.labels.proofs));
      t.button.disabled = cost.gt(state.proofs);
    }
    for (let index = 0; index < challenges.length; index++) {
      const c = challenges[index];
      const button = c.button;
      const solved = state.completed[index];
      if (button.hidden !== solved) {
        button.hidden = solved;
        c.solvedBadge.hidden = !solved;
        c.row.classList.toggle('solved', solved);
      }
      if (solved) { button.disabled = true; continue; }
      write(button, state.challenge === index ? E.labels.active : state.discoveries < 8 ? E.labels.locked : E.labels.begin);
      button.disabled = state.challenge !== null || state.discoveries < 8;
      button.title = state.discoveries < 8 ? E.text.conjecturesLocked : E.challenges[index].rule;
    }
    nodes['cancel-challenge'].hidden = state.challenge === null;
    nodes['challenge-status'].hidden = state.challenge === null;
    put('challenge-status', state.challenge === null ? '' : `${E.challenges[state.challenge].name}. ${E.labels.challengeRunning}`);
    if (lastAtlas !== state.discoveries) {
      atlas.forEach((a, i) => {
        a.row.classList.toggle('found', i < state.discoveries);
        write(a.status, i < state.discoveries ? E.labels.discovered : E.labels.unknown);
      });
      put('atlas-count', E.text.recordCount(state.discoveries, atlas.length));
      lastAtlas = state.discoveries;
    }
    put('pause', state.paused ? E.labels.resume : E.labels.pause);
    put('play-time', E.text.lifetime(M.duration(state.totalTime), M.duration(run.chapterTime)));
    if (Date.now() >= noticeUntil) nodes.notice.hidden = true;
    if (sessionTime - lastSample >= 2) {
      graph.add(sessionTime, latestNumber);
      lastSample = sessionTime;
    }
    if (forceGraph || Date.now() - lastGraphDraw >= 1000) {
      graph.render(state, sessionTime, latestNumber);
      lastGraphDraw = Date.now();
    }
  }
  function act(action, resetLine = false) {
    settle();
    const changed = action();
    if (changed && resetLine) resetGraph();
    render(true);
    save();
  }
  nodes.apparatus.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-buy]');
    if (button) act(() => M.buy(state, Number(button.dataset.buy), state.settings.buy === 'max'));
  });
  nodes.theories.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-theory]');
    if (button) act(() => M.learn(state, Number(button.dataset.theory)));
  });
  nodes.challenges.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-challenge]');
    if (button) act(() => M.startChallenge(state, Number(button.dataset.challenge)), true);
  });
  nodes['cancel-challenge'].addEventListener('click', () => act(() => M.leaveChallenge(state), true));
  nodes.advance.addEventListener('click', () => act(() => M.advance(state)));
  nodes.publish.addEventListener('click', () => act(() => {
    const gain = M.publish(state);
    if (gain) notify(E.text.proofNotice(gain));
    return gain;
  }, true));
  nodes.autobuy.addEventListener('click', () => act(() => {
    if (state.theories[2]) state.run.auto = !state.run.auto;
    return true;
  }));
  for (const input of focusInputs) input.addEventListener('change', () => act(() => {
    if (state.challenge !== 1) state.run.focus = input.value;
    return true;
  }));
  for (const [id, setting, numeric] of [['scale', 'scale', false], ['window', 'window', true], ['forecast', 'forecast', true], ['buy-mode', 'buy', false]]) {
    nodes[id].addEventListener('change', () => act(() => { state.settings[setting] = numeric ? Number(nodes[id].value) : nodes[id].value; return true; }));
  }
  nodes.pause.addEventListener('click', () => act(() => { state.paused = !state.paused; return true; }));
  nodes['rate-details'].addEventListener('toggle', () => renderRateBreakdown(M.rates(state), E.chapters[state.run.chapter]));
  nodes['settings-open'].addEventListener('click', () => {
    importMode = false;
    nodes['import-confirm'].hidden = true;
    nodes['save-text'].value = '';
    nodes['save-text-label'].textContent = '';
    nodes['save-text'].readOnly = true;
    nodes.settings.showModal();
  });
  nodes['save-now'].addEventListener('click', () => { settle(); save(); render(true); });
  nodes.export.addEventListener('click', () => {
    settle(); save();
    importMode = false;
    nodes['import-confirm'].hidden = true;
    nodes['save-text'].readOnly = true;
    nodes['save-text'].value = saveBlocked ? originalSave : JSON.stringify(state);
    put('save-text-label', E.labels.exported);
    nodes['save-text'].focus(); nodes['save-text'].select();
  });
  nodes['import-open'].addEventListener('click', () => {
    importMode = true;
    nodes['import-confirm'].hidden = false;
    nodes['save-text'].readOnly = false;
    nodes['save-text'].value = '';
    put('save-text-label', E.labels.importReady);
    nodes['save-text'].focus();
  });
  nodes['import-confirm'].addEventListener('click', () => {
    if (!importMode) return;
    let imported;
    try { imported = M.parse(nodes['save-text'].value); }
    catch { put('save-text-label', E.labels.invalidSave); return; }
    if (!window.confirm(E.text.importConfirm)) return;
    state = imported;
    originalSave = null; saveBlocked = false;
    lastWall = Date.now(); sessionTime = 0; lastAtlas = -1;
    notify(E.labels.imported); applyAway(); syncControls(); resetGraph(); render(true); save();
    nodes.settings.close();
  });
  nodes.reset.addEventListener('click', () => {
    if (!window.confirm(E.text.resetConfirm)) return;
    state = M.fresh(); saveBlocked = false; originalSave = null;
    lastWall = Date.now(); sessionTime = 0; lastAtlas = -1;
    notify(E.labels.fresh); syncControls(); resetGraph(); render(true); save();
    nodes.settings.close();
  });
  document.addEventListener('visibilitychange', () => {
    settle();
    if (document.hidden) save();
    else render(true);
  });
  window.addEventListener('pagehide', () => { settle(); save(); });
  syncControls(); resetGraph(); render(true);
  if (!saveBlocked) save();
  setInterval(() => { if (!document.hidden) { settle(); render(); } }, 250);
  setInterval(() => { if (!document.hidden) { settle(); save(); } }, 15000);
})();
