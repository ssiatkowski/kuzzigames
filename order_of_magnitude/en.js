/* This JavaScript-compatible locale is also shipped as en.js for static hosting. */
globalThis.MagnitudeEnglish = Object.freeze({
  title: 'Order of Magnitude',
  description: 'A mathematical incremental game. Discover number names, change your growth law, and climb from addition to towers of powers.',
  catalogDescription: 'Strategic incremental games made by Kuzzi. Play six free web games, or try the Rejected Draft demo on Steam.',
  catalogMarkup: `        <a class="game-card" href="./order_of_magnitude/" id="card-order-of-magnitude" aria-labelledby="magnitude-title magnitude-play">
          <div class="card-art math-art" aria-hidden="true">
            <span class="math-art-label">A study in the unreasonable</span>
            <span class="math-art-equation">1 → 10<sup>100</sup> → 10 ↑↑ 10<sup>6</sup></span>
            <span class="math-art-caption">Addition / Multiplication / Exponentiation / Tetration</span>
          </div>
          <div class="card-content">
            <p class="game-details">Mathematical incremental <span aria-hidden="true">/</span> Hours of play</p>
            <h3 id="magnitude-title">Order of Magnitude</h3>
            <p>Start with one and climb through five growth laws to a power tower of a million tens. Discover number names, publish permanent proofs, solve conjectures, and watch your growth unfold on linear, logarithmic, and tower-height graphs.</p>
            <span class="play-link" id="magnitude-play">Play Order of Magnitude <span aria-hidden="true">↗</span></span>
          </div>
        </a>`,
  chapters: [
    { name: 'The counting room', operator: 'Addition', law: 'N(t + Δt) = N(t) + v · Δt', coordinate: 'N', units: 'units / s', target: 'one million', lesson: 'Addition adds a fixed amount each second. On ordinary axes, constant growth draws a straight line.', next: 'Discover multiplication', story: 'Begin with one. Build an apparatus. A million is only the first doorway.' },
    { name: 'The compound engine', operator: 'Multiplication', law: 'N(t + Δt) = N(t) × 10^(v · Δt)', coordinate: 'log₁₀ N', units: 'decades / s', target: 'one googol', lesson: 'A decade is a factor of ten. A straight line on logarithmic axes reveals exponential growth.', next: 'Discover exponentiation', story: 'Each improvement now adds orders of magnitude, not individual units.' },
    { name: 'The exponent foundry', operator: 'Exponentiation', law: 'N(t + Δt) = N(t)^(10^(v · Δt))', coordinate: 'log₁₀(log₁₀ N)', units: 'double-log units / s', target: 'one googolplex', lesson: 'An exponential exponent gives double-exponential growth. Two logarithms reveal its straight line.', next: 'Discover tetration', story: 'A googolplex is 10 raised to a googol. Its digits are far beyond any ordinary scale.' },
    { name: 'The tower observatory', operator: 'Tetration', law: 'N(t) = 10 ↑↑ h(t),     h(t + Δt) = h(t) + v · Δt', coordinate: 'slog₁₀ N', units: 'tower floors / s', target: 'a tower of 100 tens', lesson: '10 ↑↑ 3 = 10^(10^10). slog₁₀ N measures tower height, interpolated between whole floors.', next: 'Discover tower acceleration', story: 'Stop making the exponent bigger. Start adding entire exponents.' },
    { name: 'The unbounded horizon', operator: 'Accelerated tetration', law: 'N(t) = 10 ↑↑ h(t),     h(t + Δt) = h(t) × 10^(v · Δt)', coordinate: 'log₁₀(slog₁₀ N)', units: 'tower-height decades / s', target: 'a tower of one million tens', lesson: 'Tower height now grows exponentially. This is accelerated tetration; every number remains finite.', next: 'Beyond the horizon', story: 'Reach a million floors to finish the expedition, then keep exploring larger finite numbers.' }
  ],
  apparatus: [
    { name: 'Coefficient', symbol: 'α', description: 'Multiplies v by α = 1 + level.' },
    { name: 'Composition', symbol: 'β', description: 'Multiplies v by β = 1 + 0.5 × level.' },
    { name: 'Observation', symbol: 'ω', description: 'Multiplies insight/s by ω = 1 + 0.5 × level.' }
  ],
  theories: [
    { name: 'Useful lemma', description: 'Permanent ×3 growth speed.' },
    { name: 'Better questions', description: 'Permanent ×5 insight income.' },
    { name: 'Mechanical induction', description: 'Auto-buy apparatus, including while away.' },
    { name: 'Continuity', description: 'Publishing keeps half of each apparatus level.' },
    { name: 'Elegant argument', description: 'Permanent ×5 growth speed and ×3 insight.' },
    { name: 'Generalization', description: 'Repeatable: ×2 growth speed per level.' }
  ],
  challenges: [
    { name: 'No shortcuts', rule: 'Reach one million without Composition. Other apparatus and permanent research work normally.', reward: '10 proofs and permanent ×2 growth speed.' },
    { name: 'The patient observer', rule: 'Reach one googol while locked to Inquiry focus. Permanent research works normally.', reward: '20 proofs and permanent ×4 growth speed.' },
    { name: 'First principles', rule: 'Reach 10^(10^50) without permanent growth bonuses. Apparatus and focus still work; insight bonuses remain active.', reward: '1,000 proofs and permanent growth bonus squared (bonus²).' }
  ],
  landmarks: [
    { name: 'Thousand', detail: '10³. Three zeroes; a familiar beginning.' },
    { name: 'Million', detail: '10⁶. Your first change of growth law.' },
    { name: 'Billion', detail: '10⁹. A thousand millions in the short scale.' },
    { name: 'Trillion', detail: '10¹². A million millions.' },
    { name: 'Quintillion', detail: '10¹⁸. Six groups of three zeroes.' },
    { name: 'Decillion', detail: '10³³. The tenth -illion in the short scale.' },
    { name: 'Vigintillion', detail: '10⁶³. The twentieth -illion.' },
    { name: 'Googol', detail: '10¹⁰⁰. A one followed by a hundred zeroes.' },
    { name: 'Centillion', detail: '10³⁰³. The hundredth -illion in the short scale.' },
    { name: 'Floating-point frontier', detail: '10³⁰⁸. Ordinary JavaScript numbers overflow near 1.8 × 10³⁰⁸.' },
    { name: 'Ten-thousand-digit frontier', detail: '10¹⁰⁰⁰⁰ has 10,001 digits. The exponent is still small.' },
    { name: 'Googolplex', detail: '10^(10¹⁰⁰). A one followed by a googol zeroes.' },
    { name: 'Four-floor tower', detail: '10 ↑↑ 4 = 10^(10^(10^10)). Parentheses matter.' },
    { name: 'Hundred-floor tower', detail: '10 ↑↑ 100. Tower height is now the useful measurement.' },
    { name: 'Thousand-floor tower', detail: '10 ↑↑ 1,000. More logarithms than you would ever want to take by hand.' },
    { name: 'Million-floor tower', detail: '10 ↑↑ 1,000,000. The expedition ends; the numbers do not.' }
  ],
  shortNames: ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quattuordecillion', 'quindecillion', 'sexdecillion', 'septendecillion', 'octodecillion', 'novemdecillion', 'vigintillion'],
  sizeTime: {
    seconds: (n) => `${n} ${n === '1' ? 'second' : 'seconds'}`,
    minutes: (n) => `${n} ${n === '1' ? 'minute' : 'minutes'}`,
    hours: (n) => `${n} ${n === '1' ? 'hour' : 'hours'}`,
    days: (n) => `${n} ${n === '1' ? 'day' : 'days'}`,
    years: (n) => `${n} ${n === '1' ? 'year' : 'years'}`
  },
  focus: { balanced: 'Balanced', momentum: 'Momentum', inquiry: 'Inquiry' },
  scale: { auto: 'Automatic', linear: 'Linear', log: 'Logarithmic', double: 'Double logarithmic', tower: 'Tower height', height: 'Log tower height' },
  axis: { linear: 'N', log: 'log₁₀ N', double: 'log₁₀(max(1, log₁₀ N))', tower: 'slog₁₀ N', height: 'log₁₀(max(1, slog₁₀ N))' },
  scaleNotes: {
    linear: 'Equal distances mean equal additions.',
    log: 'Equal distances mean equal multiplications. One unit is a factor of ten.',
    double: 'Equal distances mean equal multiplications of the exponent. Values below 10 map to zero.',
    tower: 'Equal distances mean equal additions to tower height. Fractional heights use linear interpolation.',
    height: 'Equal distances mean equal multiplications of tower height. Heights below one map to zero.'
  },
  labels: {
    level: 'Level', buy: 'Buy', max: 'Max', locked: 'Locked', learned: 'Learned', available: 'Available', discovered: 'Discovered', begin: 'Begin experiment', complete: 'Solved', cost: 'Cost', insight: 'insight', proofs: 'proofs', permanent: 'permanent', total: 'Total', reset: 'Restart expedition', resume: 'Resume', pause: 'Pause', save: 'Save now', autosaved: 'Saved locally', saveFailed: 'Storage unavailable. Export a backup before closing.', invalidSave: 'That save is invalid or belongs to an unsupported version. Your current expedition is unchanged.', importReady: 'Paste an exported save below. Import replaces the current expedition.', exported: 'Copy this text somewhere safe. It contains your entire expedition.', imported: 'Expedition imported.', fresh: 'A fresh expedition has begun.', noLibrary: 'The number library could not load. Reload this page; all game files are served locally.', autoOn: 'Auto-buy: on', autoOff: 'Auto-buy: off', publish: 'Publish proof', cancelChallenge: 'Return to expedition', graphEmpty: 'Collecting observations…', graphUnavailable: 'This scale has exceeded ordinary plotting coordinates. Choose Automatic or Tower height.', graphPaused: 'Expedition paused.', challengeRunning: 'Experiment in progress. Your main expedition is safely suspended.', advanceReady: 'The next growth law is ready.', ceiling: 'Numerical precision limit reached for the tower-height coordinate.', finish: 'Expedition complete. You reached a million-floor tower. Keep growing, solve experiments, or optimize your next proof.', unknown: 'Undiscovered', current: 'Current N', preview: 'Projected N', now: 'Now', past: 'ago', idle: 'Idle', active: 'Active'
  },
  text: {
    chapter: (n) => `Chapter ${n} / 5`,
    multiplier: (speed, income) => `Growth ×${speed} · insight ×${income}`,
    progress: (p, target) => `${p}% of the way to ${target}`,
    numberName: (n, name) => `${n} ${name}`,
    countingFact: (time) => `Counting this high at one number per second would take about ${time}.`,
    namedCountingFact: (name, time) => `${name}: counting one number per second would take about ${time}.`,
    writingFact: (time) => `At one digit per second, writing it out would take about ${time}.`,
    googolplexWritingFact: (time) => `Even its digit count exceeds a googol. Writing one digit per second would take about ${time}.`,
    logarithmFact: (count) => `Take a base-10 logarithm about ${count} times just to bring this number below ten.`,
    peelingFact: (time) => `At one base-10 logarithm per second, peeling this tower down below ten would take about ${time}.`,
    powerName: (exponent) => `Ten to the power of ${exponent}`,
    towerName: (height) => `A power tower of approximately ${height} tens`,
    digits: (n) => `Approximately ${n} decimal digits`,
    nextRecord: (name) => `Next landmark: ${name}`,
    recordCount: (n, total) => `${n} / ${total} landmarks · permanent ×${(1 + n * 0.025).toFixed(3)} growth`,
    proofHint: (n) => `Publish for ${n} proofs. Restart this chapter and apparatus; keep discoveries, research, and proof bonuses. Unspent insight resets to zero.`,
    proofLocked: 'Reach 25% of this chapter to publish a proof.',
    proofTotal: (n) => `${n} proofs earned in total. Permanent growth bonus ×${(1 + 0.18 * Math.sqrt(n)).toFixed(2)}.`,
    eta: (t) => `At your current speed: ${t} to the chapter target.`,
    away: (t) => `Welcome back. Simulated ${t} away with your saved focus and automation. Offline growth respects manual chapter gates.`,
    awayCap: 'Offline simulation is capped at 12 hours.',
    pausedAway: 'Your expedition was paused; no offline progress was applied.',
    resetConfirm: 'Restart the entire expedition? All numbers, proofs, research, discoveries, and experiments will be erased. Export a backup first if you want to keep this expedition.',
    importConfirm: 'Replace this expedition with the pasted save?',
    corruptStored: 'The stored save could not be read. Automatic saving is disabled to protect it. Export preserves the original data; import a valid backup or restart to resume saving.',
    autoLocked: 'Auto-buy: locked',
    conjecturesLocked: 'Discover a googol to unlock conjectures.',
    completedChapter: 'Chapter target reached. Change the growth law to continue.',
    foresight: 'Automatic scaling considers the observed line and the forecast.',
    beyond: (name, structure) => `Beyond ${name.toLowerCase()} · ${structure}`,
    exactName: (name) => `One ${name.toLowerCase()}`,
    resource: (n, resource) => `${n} ${resource}`,
    rate: (n, unit) => `${n} ${unit}`,
    equationKey: (coordinate) => `v = rate of ${coordinate} · Δt = elapsed seconds`,
    speedBreakdown: (base, coefficient, composition, bonus, focus, total) => `v ≈ ${base} × ${coefficient} (α) × ${composition} (β) × ${bonus} (bonus) × ${focus} (focus) ≈ ${total}`,
    incomeBreakdown: (base, observation, research, focus, total) => `Insight/s ≈ ${base} × ${observation} (ω) × ${research} (research) × ${focus} (focus) ≈ ${total}`,
    insightRate: (n) => `+${n} insight / s`,
    apparatusLevel: (n) => `Level ${n} / 60`,
    buyLevels: (n) => `Buy ${n} ${n === 1 ? 'level' : 'levels'}`,
    repeatableLevel: (n) => `Level ${n}`,
    lifetime: (t, chapterTime) => `${t} simulated · ${chapterTime} in this chapter`,
    preview: (t) => `${t} projection, with current apparatus, focus, and bonuses held constant.`,
    autoScale: (name) => `Automatic → ${name}`,
    graphPoint: (t, n) => `${t}: N ≈ ${n}`,
    mastered: 'All landmarks discovered.',
    proofNotice: (n) => `Published ${n} proofs. The chapter begins again with stronger permanent research.`,
    challengeDone: (name) => `${name} solved. Your expedition is restored and the permanent reward is yours.`,
    totalTime: (t) => `${t} simulated`,
    runTime: (t) => `${t} in this chapter`,
    researchBonus: (level) => `×${new Decimal(2).pow(level).toStringWithDecimalPlaces(2)} permanent growth`,
    archiveHint: 'Names use the English short scale. Every landmark adds 2.5% of base permanent growth. Beyond established names, the structure of the number becomes its name.',
    forecastGate: 'Projection stops at the current chapter gate.',
    scaleChanged: (name) => `Graph scale changed to ${name}.`,
    approximation: 'Huge numbers are approximate, finite values represented by break_eternity.js. This is a magnitude simulator, not an exact integer calculator.'
  },
  markup: `
  <a class="skip-link" href="#main">Skip to the expedition</a>
  <main id="main" class="shell">
    <section class="intro"><div class="title-row"><h1>Order of Magnitude<span>.</span></h1><button id="settings-open" class="quiet">Save & settings</button></div><p>How far can a finite number go?</p></section>
    <div id="notice" class="notice" role="status" hidden></div>
    <section class="number-panel" aria-labelledby="number-label"><div class="number-top"><span id="number-label" class="eyebrow">Your number · N</span><span id="chapter-label" class="eyebrow"></span></div><div id="number" class="number">1</div><p id="number-name" class="number-name"></p><div class="number-facts"><span id="digits"></span><span id="record"></span></div><div class="progress-track" role="progressbar" aria-label="Chapter progress" aria-valuemin="0" aria-valuemax="100" id="progress"><div id="progress-fill"></div></div><div class="progress-info"><span id="progress-text"></span><span id="eta"></span></div></section>
    <div class="layout">
      <div class="main-column">
        <section class="panel">
          <div class="section-head"><h2>Growth laboratory</h2><span id="operator" class="badge"></span></div>
          <h3 id="chapter-name"></h3><p id="story" class="muted"></p>
          <div class="equation" id="law"></div>
          <p id="equation-key" class="equation-key muted small"></p>
          <div class="metrics"><div><span class="eyebrow">Coordinate speed · v</span><strong id="speed"></strong></div><div><span class="eyebrow">Insight</span><strong id="insight"></strong><small id="income"></small></div></div>
          <details id="rate-details" class="rate-details"><summary>v = base × α × β × bonuses × focus</summary><p id="speed-breakdown" class="mono small"></p><p id="income-breakdown" class="mono small"></p></details>
          <fieldset class="focus"><legend>Research focus</legend><label><input type="radio" name="focus" value="balanced" checked>Balanced <small>×1 growth · ×1 insight</small></label><label><input type="radio" name="focus" value="momentum">Momentum <small>×2 growth · ×0.5 insight</small></label><label><input type="radio" name="focus" value="inquiry">Inquiry <small>×0.5 growth · ×2 insight</small></label></fieldset>
          <div class="section-head apparatus-head"><h3>Apparatus</h3><div class="button-group"><label class="small-label">Purchase <select id="buy-mode"><option value="1">1 level</option><option value="max">Maximum</option></select></label><button class="quiet" id="autobuy" disabled>Auto-buy: locked</button></div></div>
          <div id="apparatus" class="apparatus"></div><div class="advance-row"><button id="advance" class="primary" disabled></button><span class="muted" id="advance-hint"></span></div>
        </section>
        <section class="panel graph-panel" aria-labelledby="graph-title"><div class="section-head"><h2 id="graph-title">The shape of growth</h2><span id="active-scale" class="badge"></span></div><div class="graph-controls"><label>Y-axis <select id="scale"><option value="auto">Automatic</option><option value="linear">Linear · N</option><option value="log">Logarithmic · log₁₀ N</option><option value="double">Double log · log₁₀ log₁₀ N</option><option value="tower">Tower height · slog₁₀ N</option><option value="height">Log tower height</option></select></label><label>Window <select id="window"><option value="60">1 minute</option><option value="300" selected>5 minutes</option><option value="1200">20 minutes</option></select></label><label>Forecast <select id="forecast"><option value="0">Off</option><option value="60" selected>1 minute</option><option value="300">5 minutes</option></select></label></div><div class="canvas-wrap"><canvas id="graph" role="img" aria-label="Number growth over time, with a selectable transformed y-axis"></canvas><p id="graph-message" class="graph-message" hidden></p></div><div class="graph-legend"><span><i class="line-key"></i>Observed N</span><span><i class="line-key dashed"></i>Fixed-apparatus forecast</span><span>Time →</span></div><p id="scale-note" class="muted small"></p><p id="graph-readout" class="small mono" aria-live="off"></p><p class="muted small">Observations are collected every two seconds during this visit. Proofs and experiments start a new line.</p></section>
        <section class="panel"><div class="section-head"><h2>The number atlas</h2><span id="atlas-count" class="small"></span></div><p id="atlas-hint" class="muted small"></p><div id="atlas" class="atlas"></div></section>
      </div>
      <aside class="side-column">
        <section class="panel"><h2>Publish a proof</h2><p class="muted small">Turn progress into permanent power. Publish early for momentum, or push further for stronger rewards.</p><strong id="proofs" class="proof-value"></strong><p id="proof-total" class="muted small"></p><button id="publish" class="primary full" disabled></button><p id="proof-hint" class="muted small"></p><h3 class="research-heading">Permanent research</h3><div id="theories" class="theories"></div></section>
        <section class="panel"><div class="section-head"><h2>Conjectures</h2><span class="badge">Optional</span></div><p class="muted small">Separate experiments with permanent rewards. Your main expedition is restored when you finish or leave.</p><p id="challenge-status" class="small accent" hidden></p><div id="challenges" class="challenges"></div><button id="cancel-challenge" class="quiet full" hidden>Return to expedition</button></section>
        <section class="panel field-notes"><h2>Read the mathematics</h2><p id="lesson"></p><details><summary>What is a power tower?</summary><p>10 ↑↑ 1 = 10<br>10 ↑↑ 2 = 10¹⁰<br>10 ↑↑ 3 = 10^(10¹⁰)<br>10 ↑↑ 4 = 10^(10^(10¹⁰))</p><p>Always evaluate from the top down. A fractional tower height is an interpolation, not a literal fraction of an exponent.</p></details><details><summary>How do I read scientific notation?</summary><p>1e6 means 1 × 10⁶: one million. A nested exponent such as e1e100 means 10^(10¹⁰⁰): one googolplex. The ↑↑ symbol describes a power tower; 10 ↑↑ 4 means a tower of four tens.</p></details><details><summary>Why does the graph flatten?</summary><p>Each logarithm removes one exponential layer. A straight line in one view can represent explosive growth in another. Switching scales changes the picture, never your number.</p></details><details><summary>How do proofs and gates work?</summary><p>Each chapter has a natural coordinate. Its progress bar measures distance in that coordinate, so 50% means half the mathematical journey, not half the final number. Publishing resets the current chapter. Changing growth laws keeps N and insight, but resets apparatus.</p></details><details><summary>Time and precision</summary><p>Growth is integrated in the chapter’s natural coordinate. Your saved focus and automation work for up to 12 hours away. Operator changes require your return. These huge values are approximate magnitudes, not exact integers. All towers in this game are finite.</p></details></section>
      </aside>
    </div>
    <footer><span id="play-time"></span><span id="save-status" role="status"></span><button id="pause" class="quiet">Pause</button></footer>
  </main>
  <dialog id="settings"><form method="dialog"><div class="section-head"><h2>Save & settings</h2><button class="quiet" aria-label="Close settings">Close ×</button></div></form><p class="muted">Autosaved every 15 seconds and when you leave. Export a backup to move between devices.</p><div class="button-group settings-actions"><button id="save-now">Save now</button><button id="export">Export save</button><button id="import-open">Import save</button></div><label id="save-text-label" for="save-text" class="small"></label><textarea id="save-text" rows="7" spellcheck="false" aria-label="Expedition save data"></textarea><button id="import-confirm" class="primary" hidden>Replace expedition</button><hr><p id="precision-note" class="muted small"></p><button id="reset" class="danger">Restart expedition</button></dialog>
  `
});
