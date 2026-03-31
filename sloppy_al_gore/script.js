let state;
let achievementMultiplier = new Decimal(1);
let tickerIdx = 0;
let tickerTimerMs = 0;

const BASE_GORE_COST = new Decimal(1000);
const BASE_CLIMATE_COST = new Decimal(10);
const BASE_REVOLUTION_COST = new Decimal(10);
const BASE_REBIRTH_COST = new Decimal(50);
const BASE_AWAKENING_COST = new Decimal(666);
const suffixes = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc", "Ud"];

const achievements = [
  { key: "ach1", name: "The First Slop", check: () => state.aiSlop.gte(100), boost: 1 },
  { key: "ach2", name: "Gore Recruiter", check: () => state.gorePoints.gte(25), boost: 1.25 },
  { key: "ach3", name: "Climate Menace", check: () => state.climatePoints.gte(50), boost: 1.5 },
  { key: "ach4", name: "Revolutionary", check: () => state.revolutionPoints.gte(75), boost: 2 },
  { key: "ach5", name: "Rebirth Addict", check: () => state.rebirthPoints.gte(100), boost: 2.5 },
  { key: "ach6", name: "Time Breaker", check: () => state.awakeningPoints.gte(250), boost: 3 },
  { key: "ach7", name: "No-Life Mode", check: () => state.upgradeLevel >= 600, boost: 3.5 },
  { key: "ach8", name: "April Fools' Certified", check: () => state.prankEventsSurvived >= 3, boost: 4.1 }
];

const newsLines = [
  "Breaking: AI Slop quality now legally distinct from edible soup.",
  "Al Gore reportedly requests a raise paid entirely in vibes.",
  "Scientists confirm: clicking faster definitely helps probably.",
  "Tomorrow is April Fools. Trust absolutely nothing, including this line.",
  "Cosmic Rebirth Department: all forms delayed due to slop overflow.",
  "Temporal audits reveal your productivity has become exponential.",
  "Local AI starts 'quiet quitting' by only generating images of beige rectangles.",
  "Data scientists find 98% of the internet is now just a mirror reflecting a mirror.",
  "New browser extension automatically converts your existential dread into crypto.",
  "Your GPU has requested a 15-minute break to contemplate its purpose.",
  "Startup launches app that lets you pay $5 to feel superior to people who don't have it.",
  "Cloud storage full: Please delete unnecessary memories to continue.",
  "Neuralink update: Users now receiving 5% more ads during REM sleep.",
  "Software update 4.2.1: Fixed bug where reality was rendering too slowly.",
  "Local hero hospitalized after clicking so fast they broke the sound barrier.",
  "Economic experts baffled: 'Number go up' remains only viable strategy.",
  "Upgrade purchased: You can now hear the color purple. It sounds like static.",
  "Achievement Unlocked: Spending more time on this ticker than the actual game.",
  "Market Crash: Value of '0' plummets; '1' remains cautiously optimistic.",
  "Clicking intensity now visible from the International Space Station.",
  "Your mouse has formed a union and is demanding more ergonomic treatment.",
  "Scientists discover the 'Idle Dimension' – it’s just a room full of spinning fans.",
  "New Research: 100% of players eventually stop playing. Except you. Probably.",
  "The universe is being patched. Expect minor physics glitches until Tuesday.",
  "Galactic Council votes to skip 2026 entirely. 'Too much filler,' says representative.",
  "Breaking: Gravity reduced by 10% to save on server costs.",
  "Entropy is rising, but your income is rising faster. You are winning physics.",
  "Sun to be replaced by high-efficiency LED bulb by 2030.",
  "Time-traveler returns from 2077: 'Everything is chrome and we still use Python'.",
  "The void stared back. It wants to know if you have any games on your phone.",
  "Reality check failed. Reverting to previous save state...",
  "Ghosts are now legally required to pay property tax.",
  "Mirror world inhabitants complain about your lack of symmetry.",
  "Study: 4 out of 5 dentists are actually just one guy moving very fast.",
  "Department of Irony: Office building for 'Small Business Association' is too large.",
  "Weather Report: A 60% chance of raining frogs, followed by light sarcasm.",
  "Man accidentally 'solves' the ocean. Now it’s just a giant puddle.",
  "Cats officially win the internet; humans relegated to 'honorable mention'.",
  "National shortage of 'Common Sense' leads to surplus of 'Audacity'.",
  "Local tree refuses to shed leaves; demands a better contract from Autumn.",
  "Breaking: Silence now available as a subscription service.",
  "Investigation finds your 'To-Do' list is actually a 'Never-Gonna-Do' list.",
  "Error 404: Motivation not found.",
  "Loading more jokes... [Failed]",
  "This ticker space is intentionally left blank.",
  "Number go up? Number go up.",
  "Don't look behind you. It's distracting.",
  "Is this a game or a social experiment? Yes.",
  "The developer is currently eating a burrito. Game balance may shift.",
  "You are currently 100% more productive than a rock.",
  "Stop scrolling. The button misses you.",
  "Everything is fine. Keep clicking.",
  "Venture Capitalists invest $40M in a company that just sells 'Premium Air'.",
  "Silicon Valley successfully rebrands 'failure' as 'pre-success slop'."
];

function formatNum(d) {
  if (d.eq(0)) return "0";
  if (d.lt(1e6)) {
    const decimals = d.lt(100) ? 2 : 0;
    const num = Number(d.toFixed(decimals));
    return num.toLocaleString(undefined, { maximumFractionDigits: decimals });
  }
  const exp = d.exponent;
  const idx = Math.floor(exp / 3);
  if (idx < suffixes.length) return `${d.div(new Decimal(10).pow(idx * 3)).toFixed(2)} ${suffixes[idx]}`;
  return d.toExponential(2);
}

function initializeState() {
  state = {
    aiSlop: new Decimal(0),
    slopPerClick: new Decimal(1),
    gorePoints: new Decimal(0),
    climatePoints: new Decimal(0),
    revolutionPoints: new Decimal(0),
    rebirthPoints: new Decimal(0),
    awakeningPoints: new Decimal(0),
    upgradeLevel: 0,
    upgradeCost: new Decimal(0),
    autoBuyUnlocked: false,
    autoBuyEnabled: false,
    upgradeFreeUnlocked: false,
    autoClimateUnlocked: false,
    rebirthScalingUnlocked: false,
    autoClimateEfficiencyUnlocked: false,
    rebirthScaling2Unlocked: false,
    autoClimateUltraEfficiencyUnlocked: false,
    awakeningBoostUnlocked: false,
    autoRebirthUnlocked: false,
    sloppyAwakeningUnlocked: false,
    alGoreCheapUnlocked: false,
    greenCheapUnlocked: false,
    transcendentAwakeningUnlocked: false,
    cosmicGoreUnlocked: false,
    finalActionUnlocked: false,
    finalAction2Unlocked: false,
    finalAction3Unlocked: false,
    finalAction4Unlocked: false,
    chaosMode: false,
    totalManualClicks: 0,
    prankEventsSurvived: 0,
    achievements: {},
    prankCooldownMs: 0,
    lastSavedAt: Date.now()
  };
}

function saveState() {
  const payload = {
    ...state,
    aiSlop: state.aiSlop.toString(),
    slopPerClick: state.slopPerClick.toString(),
    gorePoints: state.gorePoints.toString(),
    climatePoints: state.climatePoints.toString(),
    revolutionPoints: state.revolutionPoints.toString(),
    rebirthPoints: state.rebirthPoints.toString(),
    awakeningPoints: state.awakeningPoints.toString(),
    upgradeCost: state.upgradeCost.toString(),
    lastSavedAt: Date.now()
  };
  localStorage.setItem("degensGore", JSON.stringify(payload));
}

function loadState() {
  const raw = localStorage.getItem("degensGore");
  if (!raw) return;
  try {
    const o = JSON.parse(raw);
    Object.assign(state, o);
    state.aiSlop = new Decimal(o.aiSlop || 0);
    state.slopPerClick = new Decimal(o.slopPerClick || 1);
    state.gorePoints = new Decimal(o.gorePoints || 0);
    state.climatePoints = new Decimal(o.climatePoints || 0);
    state.revolutionPoints = new Decimal(o.revolutionPoints || 0);
    state.rebirthPoints = new Decimal(o.rebirthPoints || 0);
    state.awakeningPoints = new Decimal(o.awakeningPoints || 0);
    state.upgradeCost = new Decimal(o.upgradeCost || 0);
    state.achievements = o.achievements || {};
  } catch {
    console.error("Failed to load state.");
  }
}

function applyOfflineProgress() {
  const now = Date.now();
  const elapsed = Math.max(0, now - (state.lastSavedAt || now));
  if (elapsed < 2000) return;
  const secs = Math.min(8 * 60 * 60, elapsed / 1000);
  const gain = calculateSlopRate().div(40).times(secs * 40);
  state.aiSlop = state.aiSlop.plus(gain);
  showCustomTooltip(`Offline gains: +${formatNum(gain)} Slop`);
}

function resetProgress(full = false) {
  state.aiSlop = new Decimal(0);
  state.slopPerClick = new Decimal(1);
  state.upgradeLevel = 0;
  state.upgradeCost = new Decimal(0);
  if (full) {
    state.gorePoints = new Decimal(0);
    state.climatePoints = new Decimal(0);
  }
}

function calcBulkGeometric(resource, base, factor) {
  const one = new Decimal(1);
  const f = new Decimal(factor);
  const inv = f.minus(one);
  function totalCost(n) {
    return base.times(f.pow(n).minus(one)).div(inv).floor();
  }
  const firstCost = base.floor();
  if (!resource.gte(firstCost)) return { count: 0, cost: new Decimal(0) };
  let low = new Decimal(0);
  let high = new Decimal(1);
  while (totalCost(high).lte(resource)) high = high.times(2);
  while (high.minus(low).gt(one)) {
    const mid = low.plus(high).div(2).floor();
    if (totalCost(mid).lte(resource)) low = mid;
    else high = mid;
  }
  return { count: low.toNumber(), cost: totalCost(low) };
}

function calcBulkLinear(resource, firstCost, increment) {
  const two = new Decimal(2);
  const a = increment.div(two);
  const b = firstCost.minus(increment.div(two));
  const c = resource.neg();
  const disc = b.pow(2).minus(a.times(c).times(4));
  if (disc.lt(0)) return { count: 0, cost: new Decimal(0) };
  let n = disc.sqrt().minus(b).div(a.times(2)).floor();
  if (n.lt(0)) n = new Decimal(0);
  const total = n.times(firstCost).plus(increment.times(n.times(n.minus(1))).div(two));
  return { count: n.toNumber(), cost: total };
}

function costOneGore() {
  if (state.alGoreCheapUnlocked) return BASE_GORE_COST;
  return BASE_GORE_COST.times(Decimal.pow(1.01, state.gorePoints)).floor();
}
function costOneClimate() {
  if (state.finalAction2Unlocked) return BASE_CLIMATE_COST;
  return BASE_CLIMATE_COST.plus(state.climatePoints.div(4).floor());
}
function costOneRevolution() {
  if (state.greenCheapUnlocked) return BASE_REVOLUTION_COST;
  return BASE_REVOLUTION_COST.times(Decimal.pow(1.01, state.revolutionPoints)).floor();
}
function costOneRebirth() {
  if (state.finalAction2Unlocked) return BASE_REBIRTH_COST;
  const factor = state.rebirthScaling2Unlocked ? new Decimal(0.2) : state.rebirthScalingUnlocked ? new Decimal(1) : new Decimal(5);
  return BASE_REBIRTH_COST.plus(state.rebirthPoints.times(factor));
}
function costOneAwakening() {
  if (state.sloppyAwakeningUnlocked) return BASE_AWAKENING_COST;
  return BASE_AWAKENING_COST.times(Decimal.pow(1.01, state.awakeningPoints)).floor();
}
function getGoreBulk() { return calcBulkGeometric(state.aiSlop, costOneGore(), 1.01); }
function getClimateBulk() { return calcBulkLinear(state.gorePoints, costOneClimate(), new Decimal(0.25)); }
function getRevolutionBulk() { return calcBulkGeometric(state.climatePoints, costOneRevolution(), 1.01); }
function getRebirthBulk() {
  const inc = state.rebirthScaling2Unlocked ? new Decimal(0.2) : state.rebirthScalingUnlocked ? new Decimal(1) : new Decimal(5);
  return calcBulkLinear(state.climatePoints, costOneRebirth(), inc);
}
function getAwakeningBulk() { return calcBulkGeometric(state.rebirthPoints, costOneAwakening(), 1.01); }

function recomputeAchievementMultiplier() {
  achievementMultiplier = achievements.reduce((acc, a) => {
    if (state.achievements[a.key]) return acc.times(a.boost);
    return acc;
  }, new Decimal(1));
}

function unlockAchievements() {
  let unlockedAny = false;
  for (const a of achievements) {
    if (!state.achievements[a.key] && a.check()) {
      state.achievements[a.key] = true;
      showCustomTooltip(`Achievement unlocked: ${a.name}`);
      unlockedAny = true;
    }
  }
  if (unlockedAny) recomputeAchievementMultiplier();
}

function renderAchievements() {
  const list = document.getElementById("achievementList");
  list.innerHTML = achievements.map((a) => {
    const unlocked = !!state.achievements[a.key];
    return `<div class="ach ${unlocked ? "done" : ""}">${unlocked ? "✅" : "⬜"} ${a.name} (${a.boost}x)</div>`;
  }).join("");
}

function maybeTriggerPrankEvent() {
  if (state.prankCooldownMs > 0) {
    state.prankCooldownMs -= 1000;
    return;
  }
  if (Math.random() > 0.005) return;
  state.prankCooldownMs = 300000;
  const modal = document.getElementById("confirmRestartModal");
  const txt = modal.querySelector("p");
  txt.textContent = "APRIL FOOLS: Fake crash prevented. Claim emergency slop?";
  modal.style.display = "block";
  const yes = document.getElementById("confirmRestartYes");
  const no = document.getElementById("confirmRestartNo");
  const cleanup = () => {
    yes.replaceWith(yes.cloneNode(true));
    no.replaceWith(no.cloneNode(true));
    modal.style.display = "none";
    txt.textContent = "Are you sure you want to restart? This will erase all progress.";
    wireRestartModal();
  };
  document.getElementById("confirmRestartYes").addEventListener("click", () => {
    const reward = calculateSlopRate().times(25);
    state.aiSlop = state.aiSlop.plus(reward);
    state.prankEventsSurvived += 1;
    showCustomTooltip(`Emergency patch successful: +${formatNum(reward)} Slop`);
    cleanup();
  }, { once: true });
  document.getElementById("confirmRestartNo").addEventListener("click", cleanup, { once: true });
}

function updateTicker() {
  tickerTimerMs += 1000;
  if (tickerTimerMs < 12000) return;
  tickerTimerMs = 0;
  const ticker = document.getElementById("newsTicker");
  ticker.textContent = newsLines[tickerIdx % newsLines.length];
  tickerIdx += 1;
}

function calculateSlopRate() {
  const perGoreBoost = new Decimal(0.1).plus(state.rebirthPoints.times(0.01));
  const gm = new Decimal(1).plus(state.gorePoints.times(perGoreBoost));
  const baseClimateRate = new Decimal(0.25);
  const grBase = new Decimal(0.01);
  const awakenCap = state.finalActionUnlocked ? new Decimal("3e30") : new Decimal(1e6);
  const cappedAwaks = Decimal.min(state.awakeningPoints, awakenCap);
  const extraPerAwak = state.awakeningBoostUnlocked ? cappedAwaks.times(grBase) : new Decimal(0);
  const perClimateBoost = baseClimateRate.plus(state.revolutionPoints.times(grBase.plus(extraPerAwak)));
  const cm = new Decimal(1).plus(state.climatePoints.times(perClimateBoost));
  const rm = new Decimal(1).plus(state.revolutionPoints.times(0.07));
  const bm = new Decimal(1).plus(state.rebirthPoints.times(0.5));
  const am = new Decimal(1).plus(state.awakeningPoints);
  return state.slopPerClick.times(gm).times(cm).times(rm).times(bm).times(am).times(achievementMultiplier).times(40);
}

function showCustomTooltip(msg) {
  const tip = document.getElementById("customTooltip");
  tip.textContent = msg;
  tip.style.opacity = 1;
  clearTimeout(tip._hid);
  tip._hid = setTimeout(() => { tip.style.opacity = 0; }, 2600);
}

function updateDisplay() {
  document.getElementById("aiSlopDisplay").textContent = formatNum(state.aiSlop);
  document.getElementById("slopRateDisplay").textContent = formatNum(calculateSlopRate());
  document.getElementById("achievementBoostDisplay").textContent = formatNum(achievementMultiplier);
  document.getElementById("gorePointsDisplay").textContent = formatNum(state.gorePoints);
  document.getElementById("climatePointsDisplay").textContent = formatNum(state.climatePoints);
  document.getElementById("revolutionPointsDisplay").textContent = formatNum(state.revolutionPoints);
  document.getElementById("rebirthPointsDisplay").textContent = formatNum(state.rebirthPoints);
  document.getElementById("awakeningPointsDisplay").textContent = formatNum(state.awakeningPoints);
  document.body.classList.toggle("chaos", !!state.chaosMode);
  document.getElementById("chaosModeButton").textContent = state.chaosMode ? "Disable Chaos Mode" : "Enable Chaos Mode";

  const upBtn = document.getElementById("upgradeButton");
  upBtn.innerHTML = `Upgrade Generator (Lv ${state.upgradeLevel})<br>Cost: ${formatNum(state.upgradeCost)} Slop | +1 base Slop/click`;
  upBtn.classList.toggle("affordable", state.aiSlop.gte(state.upgradeCost));

  const autoBtn = document.getElementById("autoBuyButton");
  autoBtn.disabled = false;
  if (state.upgradeFreeUnlocked) autoBtn.style.display = "none";
  else {
    autoBtn.style.display = "";
    autoBtn.textContent = !state.autoBuyUnlocked ? "Unlock Auto-Buy (5 Green Revolutions)" : (state.autoBuyEnabled ? "Disable Auto-Buy" : "Enable Auto-Buy");
    autoBtn.classList.toggle("unaffordable", !state.autoBuyUnlocked && !state.revolutionPoints.gte(5));
  }

  const toggles = [
    ["freeUpgradeContainer", state.autoBuyUnlocked && !state.upgradeFreeUnlocked, "freeUpgradeButton", state.rebirthPoints.gte(3)],
    ["autoClimateContainer", state.upgradeFreeUnlocked && !state.autoClimateUnlocked, "autoClimateButton", state.revolutionPoints.gte(100)],
    ["rebirthScalingContainer", state.autoClimateUnlocked && !state.rebirthScalingUnlocked, "rebirthScalingButton", state.rebirthPoints.gte(50)],
    ["climateEffContainer", state.rebirthScalingUnlocked && !state.autoClimateEfficiencyUnlocked, "climateEffButton", state.revolutionPoints.gte(250)],
    ["rebirthScaling2Container", state.autoClimateEfficiencyUnlocked && !state.rebirthScaling2Unlocked, "rebirthScaling2Button", state.climatePoints.gte(50000)],
    ["autoClimateUltraContainer", state.rebirthScaling2Unlocked && !state.autoClimateUltraEfficiencyUnlocked, "autoClimateUltraButton", state.rebirthPoints.gte(500)],
    ["awakeningBoostContainer", state.autoClimateUltraEfficiencyUnlocked && !state.awakeningBoostUnlocked, "awakeningBoostButton", state.awakeningPoints.gte(5)],
    ["autoRebirthContainer", state.awakeningBoostUnlocked && !state.autoRebirthUnlocked, "autoRebirthButton", state.aiSlop.gte(Decimal.pow(10, 30))],
    ["sloppyAwakeningsContainer", state.autoRebirthUnlocked && !state.sloppyAwakeningUnlocked, "sloppyAwakeningsButton", state.aiSlop.gte(new Decimal(10).pow(50))],
    ["alGoreCheapContainer", state.sloppyAwakeningUnlocked && !state.alGoreCheapUnlocked, "alGoreCheapButton", state.awakeningPoints.gte(7000)],
    ["greenCheapContainer", state.alGoreCheapUnlocked && !state.greenCheapUnlocked, "greenCheapButton", state.climatePoints.gte(new Decimal(2e8))],
    ["transcendentAwakeningContainer", state.greenCheapUnlocked && !state.transcendentAwakeningUnlocked, "transcendentAwakeningButton", state.rebirthPoints.gte(new Decimal(1e8))],
    ["cosmicGoreContainer", state.transcendentAwakeningUnlocked && !state.cosmicGoreUnlocked, "cosmicGoreButton", state.revolutionPoints.gte(new Decimal("5.55e55"))],
    ["finalActionContainer", state.cosmicGoreUnlocked && !state.finalActionUnlocked, "finalActionButton", state.aiSlop.gte(new Decimal("3.33e333"))],
    ["finalAction2Container", state.finalActionUnlocked && !state.finalAction2Unlocked, "finalAction2Button", state.awakeningPoints.gte(new Decimal("1.11e111"))],
    ["finalAction3Container", state.finalAction2Unlocked && !state.finalAction3Unlocked, "finalAction3Button", state.gorePoints.gte(new Decimal("1e50"))],
    ["finalAction4Container", state.finalAction3Unlocked && !state.finalAction4Unlocked, "finalAction4Button", state.rebirthPoints.gte(new Decimal("666e21"))]
  ];
  toggles.forEach(([container, show, btn, afford]) => {
    const c = document.getElementById(container);
    c.style.display = show ? "" : "none";
    const b = document.getElementById(btn);
    b.classList.toggle("unaffordable", show && !afford);
  });
  const setUnlockText = (id, label, have, need, unit, effect, unlocked = false) => {
    const btn = document.getElementById(id);
    if (unlocked) {
      btn.innerHTML = `${label}<br>${effect}<br>Purchased`;
      return;
    }
    btn.innerHTML = `${label}<br>${effect}<br>${unit}: ${formatNum(have)} / ${formatNum(need)}`;
  };
  if (state.autoBuyUnlocked) {
    autoBtn.innerHTML = `${state.autoBuyEnabled ? "Disable Auto-Buy" : "Enable Auto-Buy"}<br>Buys upgrades automatically<br>Unlocked`;
  } else {
    setUnlockText("autoBuyButton", "Unlock Auto-Buy", state.revolutionPoints, new Decimal(5), "Revolutions", "Buys upgrades automatically");
  }
  setUnlockText("freeUpgradeButton", "Unlock Free Upgrades", state.rebirthPoints, new Decimal(3), "Rebirths", "Upgrades no longer cost Slop", state.upgradeFreeUnlocked);
  setUnlockText("autoClimateButton", "Unlock Auto Climate Change", state.revolutionPoints, new Decimal(100), "Revolutions", "Free climate purchases each tick", state.autoClimateUnlocked);
  setUnlockText("rebirthScalingButton", "Improve Rebirth Scaling", state.rebirthPoints, new Decimal(50), "Rebirths", "Rebirth cost growth divided by 5", state.rebirthScalingUnlocked);
  setUnlockText("climateEffButton", "Boost Auto-Climate", state.revolutionPoints, new Decimal(250), "Revolutions", "Auto climate buys up to 5/tick", state.autoClimateEfficiencyUnlocked);
  setUnlockText("rebirthScaling2Button", "Improve Rebirth Scaling Again", state.climatePoints, new Decimal(50000), "Climates", "Woah crazy cheap rebirths now", state.rebirthScaling2Unlocked);
  setUnlockText("autoClimateUltraButton", "Ultra Auto-Climate", state.rebirthPoints, new Decimal(500), "Rebirths", "Auto climate buys up to 2500/tick", state.autoClimateUltraEfficiencyUnlocked);
  setUnlockText("awakeningBoostButton", "Awakening Climate Boost", state.awakeningPoints, new Decimal(5), "Awakenings", "Awakenings boost climate scaling", state.awakeningBoostUnlocked);
  setUnlockText("autoRebirthButton", "Unlock Auto Rebirth", state.aiSlop, Decimal.pow(10, 30), "Slop", "Free rebirth purchases each tick", state.autoRebirthUnlocked);
  setUnlockText("sloppyAwakeningsButton", "Sloppy Awakening", state.aiSlop, new Decimal(10).pow(50), "Slop", "Remove awakening cost scaling", state.sloppyAwakeningUnlocked);
  setUnlockText("alGoreCheapButton", "Al Gore is Cheap", state.awakeningPoints, new Decimal(7000), "Awakenings", "Remove Al Gore cost scaling", state.alGoreCheapUnlocked);
  setUnlockText("greenCheapButton", "Green is Cheap", state.climatePoints, new Decimal(2e8), "Climates", "Remove Revolution scaling", state.greenCheapUnlocked);
  setUnlockText("transcendentAwakeningButton", "Transcendent Awakening", state.rebirthPoints, new Decimal(1e8), "Rebirths", "Gain awakenings from Slop^0.25", state.transcendentAwakeningUnlocked);
  setUnlockText("cosmicGoreButton", "Cosmic Gore", state.revolutionPoints, new Decimal("5.55e55"), "Revolutions", "Rebirth gore output is cubed", state.cosmicGoreUnlocked);
  setUnlockText("finalActionButton", "Increase Awakening Cap", state.aiSlop, new Decimal("3.33e333"), "Slop", "Cap increases to 3e30", state.finalActionUnlocked);
  setUnlockText("finalAction2Button", "Final Push", state.awakeningPoints, new Decimal("1.11e111"), "Awakenings", "Climate + Rebirth scaling removed", state.finalAction2Unlocked);
  setUnlockText("finalAction3Button", "Omnipresent", state.gorePoints, new Decimal("1e50"), "Al Gores", "Auto-purchase all each tick", state.finalAction3Unlocked);
  setUnlockText("finalAction4Button", "Thank You Upgrade", state.rebirthPoints, new Decimal("666e21"), "Rebirths", "Massive awakening/sec boost", state.finalAction4Unlocked);

  const labels = [
    ["prestigeGoreButton", "Hire Al Gore", costOneGore(), getGoreBulk().count, "Slop"],
    ["prestigeClimateButton", "Change Climate", costOneClimate(), getClimateBulk().count, "Gores"],
    ["prestigeRevolutionButton", "Green Revolution", costOneRevolution(), getRevolutionBulk().count, "Climates"],
    ["prestigeRebirthButton", "Cosmic Rebirth", costOneRebirth(), getRebirthBulk().count, "Climates"],
    ["prestigeAwakeningButton", "Temporal Awakening", costOneAwakening(), getAwakeningBulk().count, "Rebirths"]
  ];
  labels.forEach(([id, title, cost, bulk, unit]) => {
    const b = document.getElementById(id);
    const ownedLookup = {
      prestigeGoreButton: state.gorePoints,
      prestigeClimateButton: state.climatePoints,
      prestigeRevolutionButton: state.revolutionPoints,
      prestigeRebirthButton: state.rebirthPoints,
      prestigeAwakeningButton: state.awakeningPoints
    };
    b.innerHTML = `${title}<br>Cost: ${formatNum(cost)} ${unit} | Buy: ${formatNum(new Decimal(bulk))}<br>Owned: ${formatNum(ownedLookup[id])}`;
    b.style.backgroundColor = bulk > 0 ? "#0a0" : "#800";
  });

  const ec = Decimal.pow(10, 420).times(6.9);
  const enBtn = document.getElementById("prestigeEnlightenmentButton");
  enBtn.innerHTML = state.awakeningPoints.gte(ec) ? "Enlightenment<br>(Ready!)" : "Enlightenment<br>Need 6.9e420 Temporal Awakenings";

  const perGoreBoost = new Decimal(0.1).plus(state.rebirthPoints.times(0.01));
  const climatePer = new Decimal(0.25).plus(state.revolutionPoints.times(0.01));
  document.getElementById("descGore").innerHTML = `Spend Slop to hire Al Gores. Each Gore adds +${formatNum(perGoreBoost.times(100))}% Slop multiplier.`;
  document.getElementById("descClimate").innerHTML = `Spend Gores for Climate Changes. Each Climate multiplies Slop by ~x${formatNum(climatePer.plus(1))}.`;
  document.getElementById("descRevolution").innerHTML = `Spend Climates for Revolutions. Each Revolution adds +7% Slop and boosts climate scaling.`;
  document.getElementById("descRebirth").innerHTML = `Spend Climates for Rebirths. Rebirths add +50% Slop and passive Gore generation.`;
  document.getElementById("descAwakening").innerHTML = `Spend Rebirths for Awakenings. Awakenings multiply Slop and generate Revolutions/sec.`;
  document.getElementById("descEnlightenment").innerHTML = `Final milestone. Requires 6.9e420 Awakenings.`;

  renderAchievements();
  saveState();
}

function generateSlop() {
  if (!state?.aiSlop) return;
  state.aiSlop = state.aiSlop.plus(calculateSlopRate().div(40));
  if (state.autoBuyUnlocked && state.autoBuyEnabled && state.aiSlop.gte(state.upgradeCost)) buyUpgrade(false);
  if (state.autoClimateUnlocked) {
    const maxBuys = state.autoClimateUltraEfficiencyUnlocked ? 2500 : state.autoClimateEfficiencyUnlocked ? 5 : 1;
    for (let i = 0; i < maxBuys; i++) {
      if (!state.gorePoints.gte(costOneClimate())) break;
      state.climatePoints = state.climatePoints.plus(1);
    }
  }
  if (state.autoRebirthUnlocked) {
    for (let i = 0; i < 2500; i++) {
      if (!state.climatePoints.gte(costOneRebirth())) break;
      state.rebirthPoints = state.rebirthPoints.plus(1);
    }
  }
  if (state.finalAction3Unlocked) ["upgradeButton", "prestigeGoreButton", "prestigeClimateButton", "prestigeRevolutionButton", "prestigeRebirthButton", "prestigeAwakeningButton"].forEach((id) => document.getElementById(id).click());

  unlockAchievements();
  updateDisplay();
}

function buyUpgrade(showToast = true) {
  if (!state.aiSlop.gte(state.upgradeCost)) {
    if (showToast) showCustomTooltip("Not enough Slop!");
    return;
  }
  if (!state.upgradeFreeUnlocked) state.aiSlop = state.aiSlop.minus(state.upgradeCost);
  state.upgradeLevel += 1;
  state.slopPerClick = state.slopPerClick.plus(1);
  state.upgradeCost = state.upgradeCost.eq(0) ? new Decimal(10) : state.upgradeCost.times(1.2).floor();
}
function unlockAutoBuy() {
  if (state.autoBuyUnlocked) return;
  if (!state.revolutionPoints.gte(5)) return showCustomTooltip("Need 5 Green Revolutions!");
  state.revolutionPoints = state.revolutionPoints.minus(5);
  state.autoBuyUnlocked = true;
  state.autoBuyEnabled = true;
}
function prestigeAlGore() {
  const { count, cost } = getGoreBulk();
  if (count === 0) return showCustomTooltip("Not enough Slop!");
  state.gorePoints = state.gorePoints.plus(count);
  if (!state.alGoreCheapUnlocked) { state.aiSlop = state.aiSlop.minus(cost); resetProgress(); }
}
function prestigeClimate() {
  const { count, cost } = getClimateBulk();
  if (count === 0) return showCustomTooltip("Not enough Gore!");
  state.climatePoints = state.climatePoints.plus(count);
  if (!state.autoClimateUnlocked) { state.gorePoints = state.gorePoints.minus(cost); resetProgress(); }
}
function prestigeRevolution() {
  const { count, cost } = getRevolutionBulk();
  if (count === 0) return showCustomTooltip("Not enough Climate!");
  state.revolutionPoints = state.revolutionPoints.plus(count);
  if (!state.greenCheapUnlocked) { state.climatePoints = state.climatePoints.minus(cost); resetProgress(); }
}
function prestigeCosmicRebirth() {
  const { count, cost } = getRebirthBulk();
  if (count === 0) return showCustomTooltip("Not enough Climate!");
  state.rebirthPoints = state.rebirthPoints.plus(count);
  if (!state.autoRebirthUnlocked) { state.climatePoints = state.climatePoints.minus(cost); resetProgress(true); }
}
function prestigeAwakening() {
  const { count, cost } = getAwakeningBulk();
  if (count === 0) return showCustomTooltip("Not enough Rebirths!");
  state.awakeningPoints = state.awakeningPoints.plus(count);
  if (!state.transcendentAwakeningUnlocked) { state.rebirthPoints = state.rebirthPoints.minus(cost); resetProgress(); }
}
function prestigeEnlightenment() {
  const ec = Decimal.pow(10, 420).times(6.9);
  if (!state.awakeningPoints.gte(ec)) return showCustomTooltip("Not enough Awakenings!");
  document.getElementById("finalModal").style.display = "block";
}
function restartGame() {
  localStorage.removeItem("degensGore");
  initializeState();
  updateDisplay();
}

function exportSave() {
  const box = document.getElementById("saveBox");
  box.value = btoa(unescape(encodeURIComponent(localStorage.getItem("degensGore") || "")));
  box.style.display = "block";
  box.select();
  showCustomTooltip("Save copied to textbox.");
}
function importSave() {
  const box = document.getElementById("saveBox");
  box.style.display = "block";
  const input = prompt("Paste save code:");
  if (!input) return;
  try {
    const decoded = decodeURIComponent(escape(atob(input.trim())));
    JSON.parse(decoded);
    localStorage.setItem("degensGore", decoded);
    location.reload();
  } catch {
    showCustomTooltip("Invalid save code.");
  }
}

function wireRestartModal() {
  document.getElementById("confirmRestartYes").onclick = () => {
    document.getElementById("confirmRestartModal").style.display = "none";
    restartGame();
  };
  document.getElementById("confirmRestartNo").onclick = () => {
    document.getElementById("confirmRestartModal").style.display = "none";
  };
}

(function waitForDependencies() {
  if (typeof Decimal === "undefined" || !document.getElementById("upgradeButton")) return setTimeout(waitForDependencies, 50);
  initializeState();
  loadState();
  recomputeAchievementMultiplier();
  applyOfflineProgress();
  updateDisplay();

  setInterval(generateSlop, 25);
  setInterval(() => {
    if (state.rebirthPoints.gt(0)) state.gorePoints = state.gorePoints.plus(state.cosmicGoreUnlocked ? state.rebirthPoints.pow(3) : state.rebirthPoints);
    if (state.awakeningPoints.gt(0)) state.revolutionPoints = state.revolutionPoints.plus(state.awakeningPoints);
    if (state.transcendentAwakeningUnlocked) {
      const extra = state.finalAction4Unlocked ? state.aiSlop.pow(0.25).times(5e55) : state.aiSlop.pow(0.25);
      state.awakeningPoints = state.awakeningPoints.plus(extra);
    }
    updateTicker();
    maybeTriggerPrankEvent();
  }, 1000);

  document.getElementById("upgradeButton").addEventListener("click", () => buyUpgrade(true));
  document.getElementById("autoBuyButton").addEventListener("click", () => {
    if (!state.autoBuyUnlocked) unlockAutoBuy();
    else state.autoBuyEnabled = !state.autoBuyEnabled;
  });
  document.getElementById("freeUpgradeButton").addEventListener("click", () => {
    if (!state.rebirthPoints.gte(3)) return showCustomTooltip("Need 3 Cosmic Rebirths!");
    state.rebirthPoints = state.rebirthPoints.minus(3);
    state.upgradeFreeUnlocked = true;
    state.autoBuyEnabled = true;
  });
  document.getElementById("autoClimateButton").addEventListener("click", () => {
    if (!state.revolutionPoints.gte(100)) return showCustomTooltip("Need 100 Green Revolutions!");
    state.revolutionPoints = state.revolutionPoints.minus(100);
    state.autoClimateUnlocked = true;
  });
  document.getElementById("rebirthScalingButton").addEventListener("click", () => {
    if (state.rebirthPoints.lt(50)) return showCustomTooltip("Need 50 Cosmic Rebirths!");
    state.rebirthPoints = state.rebirthPoints.minus(50);
    state.rebirthScalingUnlocked = true;
  });
  document.getElementById("climateEffButton").addEventListener("click", () => {
    if (state.revolutionPoints.lt(250)) return showCustomTooltip("Need 250 Green Revolutions!");
    state.revolutionPoints = state.revolutionPoints.minus(250);
    state.autoClimateEfficiencyUnlocked = true;
  });
  document.getElementById("rebirthScaling2Button").addEventListener("click", () => {
    if (state.climatePoints.lt(50000)) return showCustomTooltip("Need 50K Climate Changes!");
    state.climatePoints = state.climatePoints.minus(25000);
    state.rebirthScaling2Unlocked = true;
  });
  document.getElementById("autoClimateUltraButton").addEventListener("click", () => {
    if (state.rebirthPoints.lt(500)) return showCustomTooltip("Need 500 Cosmic Rebirths!");
    state.rebirthPoints = state.rebirthPoints.minus(500);
    state.autoClimateUltraEfficiencyUnlocked = true;
  });
  document.getElementById("awakeningBoostButton").addEventListener("click", () => {
    if (state.awakeningPoints.lt(5)) return showCustomTooltip("Need 5 Temporal Awakenings!");
    state.awakeningPoints = state.awakeningPoints.minus(5);
    state.awakeningBoostUnlocked = true;
  });
  document.getElementById("autoRebirthButton").addEventListener("click", () => {
    const cost = Decimal.pow(10, 30);
    if (state.aiSlop.lt(cost)) return showCustomTooltip("Need 1No AI Slop!");
    state.aiSlop = state.aiSlop.minus(cost);
    state.autoRebirthUnlocked = true;
  });
  document.getElementById("sloppyAwakeningsButton").addEventListener("click", () => {
    const cost = new Decimal(10).pow(50);
    if (state.aiSlop.lt(cost)) return showCustomTooltip("Need 1e50 AI Slop!");
    state.aiSlop = state.aiSlop.minus(cost);
    state.sloppyAwakeningUnlocked = true;
  });
  document.getElementById("alGoreCheapButton").addEventListener("click", () => {
    if (state.awakeningPoints.lt(7000)) return showCustomTooltip("Need 7K Temporal Awakenings!");
    state.awakeningPoints = state.awakeningPoints.minus(7000);
    state.alGoreCheapUnlocked = true;
  });
  document.getElementById("greenCheapButton").addEventListener("click", () => {
    const cost = new Decimal(2e8);
    if (state.climatePoints.lt(cost)) return showCustomTooltip("Need 200M Climate Changes!");
    state.climatePoints = state.climatePoints.minus(cost);
    state.greenCheapUnlocked = true;
  });
  document.getElementById("transcendentAwakeningButton").addEventListener("click", () => {
    const cost = new Decimal(1e8);
    if (state.rebirthPoints.lt(cost)) return showCustomTooltip("Need 100M Cosmic Rebirths!");
    state.rebirthPoints = state.rebirthPoints.minus(cost);
    state.transcendentAwakeningUnlocked = true;
  });
  document.getElementById("cosmicGoreButton").addEventListener("click", () => {
    const cost = new Decimal("5.55e55");
    if (state.revolutionPoints.lt(cost)) return showCustomTooltip("Need 5.55e55 Green Revolutions!");
    state.revolutionPoints = state.revolutionPoints.minus(cost);
    state.cosmicGoreUnlocked = true;
  });
  document.getElementById("finalActionButton").addEventListener("click", () => {
    const cost = new Decimal("3.33e333");
    if (state.aiSlop.lt(cost)) return showCustomTooltip("Need 3.33e333 AI Slop!");
    state.finalActionUnlocked = true;
  });
  document.getElementById("finalAction2Button").addEventListener("click", () => {
    const cost = new Decimal("1.11e111");
    if (state.awakeningPoints.lt(cost)) return showCustomTooltip("Need 1.11e111 Temporal Awakenings!");
    state.awakeningPoints = state.awakeningPoints.minus(cost);
    state.finalAction2Unlocked = true;
  });
  document.getElementById("finalAction3Button").addEventListener("click", () => {
    const cost = new Decimal("1e50");
    if (state.gorePoints.lt(cost)) return showCustomTooltip("Need 1e50 Al Gores!");
    state.gorePoints = state.gorePoints.minus(cost);
    state.finalAction3Unlocked = true;
  });
  document.getElementById("finalAction4Button").addEventListener("click", () => {
    const cost = new Decimal("666e21");
    if (state.rebirthPoints.lt(cost)) return showCustomTooltip("Need 666Sx Cosmic Rebirths!");
    state.rebirthPoints = state.rebirthPoints.minus(cost);
    state.finalAction4Unlocked = true;
  });

  document.getElementById("prestigeGoreButton").addEventListener("click", prestigeAlGore);
  document.getElementById("prestigeClimateButton").addEventListener("click", prestigeClimate);
  document.getElementById("prestigeRevolutionButton").addEventListener("click", prestigeRevolution);
  document.getElementById("prestigeRebirthButton").addEventListener("click", prestigeCosmicRebirth);
  document.getElementById("prestigeAwakeningButton").addEventListener("click", prestigeAwakening);
  document.getElementById("prestigeEnlightenmentButton").addEventListener("click", prestigeEnlightenment);

  document.getElementById("restartButton").addEventListener("click", () => {
    document.getElementById("confirmRestartModal").style.display = "block";
  });
  wireRestartModal();
  document.getElementById("finalModalClose").addEventListener("click", () => {
    document.getElementById("finalModal").style.display = "none";
  });
  document.getElementById("exportSaveButton").addEventListener("click", exportSave);
  document.getElementById("importSaveButton").addEventListener("click", importSave);
  document.getElementById("chaosModeButton").addEventListener("click", () => {
    state.chaosMode = !state.chaosMode;
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "u" || e.key === "U") buyUpgrade(false);
  });
})();
