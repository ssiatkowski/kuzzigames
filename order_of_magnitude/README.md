# Order of Magnitude

A standalone mathematical incremental game, served at `/order_of_magnitude/` using the same static hosting as the rest of KuzziGames. No build, framework, remote font, image, or runtime CDN is required.

## Files

- `index.html`, `style.css`, `game.js`: accessible, responsive interface and persistence.
- `engine.js`: progression, closed-form growth, research, proofs, experiments, and save validation.
- `graph.js`: bounded canvas graph with selectable coordinate systems and forecasts.
- `en.ts`: canonical English player-facing text, including the homepage card. Its contents are JavaScript-compatible; `en.js` is the identical static-hosting copy. After locale changes, run `./order_of_magnitude/sync-english.ps1` to synchronize the runtime copy and static homepage card. No other translations are included.
- `vendor/break_eternity.min.js`: pinned upstream break_eternity.js 2.1.3, with its MIT license in `vendor/LICENSE`.

## Progression and balance

| Chapter | Coordinate integrated over time | Base coordinate speed / second | Gate |
| --- | --- | --- | --- |
| Addition | N | 100 | 10^6 |
| Multiplication | log10(N) | 0.001 | 10^100 |
| Exponentiation | log10(log10(N)) | 0.0001 | 10^(10^100) |
| Tetration | slog10(N) | 0.0001 | 10 ↑↑ 100 |
| Accelerated tetration | log10(slog10(N)) | 0.00001 | 10 ↑↑ 1,000,000 |

Each chapter's derivative is constant between discrete upgrades and discoveries. The engine advances to the next affordable purchase, landmark, or experiment completion rather than evaluating enormous Decimal values every tick. Automation remains aligned to one-second purchase boundaries and skips intervals with no affordable purchases. Operator changes are manual: preserve N and insight, but reset all three apparatus levels to zero. Continuity applies only to publishing, not operator changes. Publishing resets only the current chapter and its apparatus; Continuity retains half the apparatus levels. Unspent insight resets. Discoveries and permanent research survive.

Apparatus costs are geometric: Coefficient starts at 15 insight and scales by ×1.25 per level, Composition starts at 20 insight and scales by ×1.5, and Observation starts at 30 insight and scales by ×1.25. Maximum purchases invert the geometric sum, with an affordability correction for floating-point rounding. Apparatus caps at 60 levels. Coefficient (α) and Composition (β) both multiply coordinate speed v; Observation (ω) multiplies insight income. Δt always means elapsed seconds. An expandable live rate breakdown uses the simulation's own factors, updates only when those factors change, and skips formatting while closed. Proof rewards are based on chapter coordinate progress and become available at 25%. Proofs earned, including experiment rewards, contribute a permanent square-root speed bonus independently of unspent proofs.

Useful Lemma grants ×3 growth, Better Questions ×5 insight income, and Elegant Argument ×5 growth and ×3 insight income. Generalization grants ×2 growth per level without a designed level cap; its next purchase still costs `8 × 2^level` proofs. Research prices use Decimal for values beyond the native range, with an exact native-power fast path for ordinary costs. Coordinate integration speeds saturate below native-number overflow while the displayed permanent bonus retains its Decimal magnitude. Proof totals and research level counts remain safe native integers.

Focus multipliers are fixed across all chapters: Balanced gives ×1 growth and ×1 insight, Momentum ×2 growth and ×0.5 insight, and Inquiry ×0.5 growth and ×2 insight. Experiments suspend the main run, start at one, prohibit publishing, and return the suspended run on completion or cancellation. Their rewards are granted once: No Shortcuts grants 10 proofs and ×2 growth, The Patient Observer 20 proofs and ×4 growth, and First Principles 1,000 proofs and the square of the permanent growth multiplier. The ×2 and ×4 rewards multiply into permanent growth before First Principles squares it, including repeatable research. First Principles removes every permanent growth bonus while active but preserves insight bonuses.

The intended pacing is hours, with substantial variation from focus, proof timing, research allocation, automation, and optional experiments. These rates have not been runtime playtested; adjust the five `baseSpeeds` after live play. Chapter five continues beyond a trillion floors. Above 10^15 floors, values are symbolic towers with a native logarithmic height coordinate, avoiding Decimal layer precision loss and height overflow. Display, digit counts, comparisons, forecasts, and automatic graph scaling support this representation. The coordinate has a finite machine limit of Number.MAX_VALUE / 4; growth is not literally infinite. Fractional tetration and its inverse consistently use the library's linear approximation.

## Persistence and performance

The versioned save stores bounded numeric coordinates rather than serializing enormous digit strings. Import validation checks every run, level array, setting, and experiment invariant before replacing state. Unknown properties are discarded. An unreadable existing save blocks automatic overwrites and can still be exported.

Save version 2 accepts version-1 backups and credits the increased proof rewards for previously completed conjectures once: +2, +4, and +8 respectively to both unspent and total-earned proofs. Current research levels, including Generalization levels beyond 12, survive save/import. The existing storage key is retained so existing expeditions load automatically.

Offline growth is capped at 12 hours, respects pause, uses saved focus and automation, and stops at manual operator gates. Remaining offline time after an experiment finishes is applied to the restored main run. Suspended chapter time stays unchanged during an experiment. Insight can continue accumulating at a gate.

UI updates run four times per second with cached DOM references and unchanged-text checks. Number descriptions are recomputed only when the coordinate changes. Graph drawing runs once per second while visible. Sampling uses a fixed 601-slot ring buffer with constant-time insertion, retaining up to 20 minutes during the current visit. Historical coordinate transforms are memoized, and pointer inspection uses binary search. Forecasts have 40 points and assume fixed apparatus, focus, bonuses, and growth law. The auto scale covers both observations and forecast; unavailable manual scales explicitly report coordinate overflow. Hidden pages skip rendering.

Graph history starts afresh on reload and at proofs, imports, resets, and experiment transitions. All game progress persists. Huge values are approximate finite magnitudes, not arbitrary-precision integers. Named values use the English short scale; beyond named scales, power and tower descriptions state the mathematical structure.

For future optimization of the larger games, consider sharing this visible-page scheduling pattern and separating numeric simulation from DOM updates rather than adding more render-time computation.

## Manual validation

No automated browsers, npm scripts, or git commands were used. Project-local TypeScript validation is unavailable in this static JavaScript project. Code paths were reviewed; runtime, visual behavior, and actual play duration still require manual verification.

1. Open the homepage and follow the new card. Confirm the number starts at one and grows without clicking; buy each apparatus and change focus. Open the v breakdown: Coefficient level 1 should give α = 2, Composition level 1 β = 1.5, and Observation level 1 ω = 1.5. Check that displayed rates and factors match after focus changes, proofs, research, and chapter changes. Confirm Save & settings is beside the title and opens the existing dialog. Check the shorter copy and keyboard controls at desktop and phone widths; line counts depend on viewport width.
2. Compare Linear and Logarithmic at small N. Hover or touch the graph for a numeric readout. Toggle the forecast and time window; the forecast must hold existing apparatus constant and flatten at a chapter gate.
3. Reach one million, publish a proof, and confirm the number resets to one, insight and apparatus reset, and the atlas remains discovered. Buy permanent research; unspent proofs decrease while the total-earned bonus stays intact. Repeat after learning Continuity and check half-level retention.
4. Advance at each chapter gate. Confirm N remains continuous, insight is retained, all three apparatus levels reset to zero even with Continuity, the growth law changes, and the progress bar measures the new coordinate. Reload to check the reset persists; verify automation can buy new levels using retained insight. Check googol and googolplex names at their gates. Choose each graph scale, including an inadequate linear scale at huge N; verify a clear overflow message and recovery with Automatic.
5. Unlock conjectures by discovering a googol. Start one, reload during it, then cancel. Verify the original chapter, coordinate, apparatus, insight, focus, automation, and chapter time are restored. Solve a conjecture and verify exactly one reward; repeat the restoration checks. Check forbidden Composition and locked Inquiry focus.
6. Export, purchase something, and import the earlier export. Invalid JSON, excessive input, invalid levels, and inconsistent experiments must leave the expedition unchanged. Reload a valid save. Confirm an unreadable stored save is not automatically overwritten and can be exported.
7. Leave while growing, return, and check the elapsed-time notice and chapter gate. Repeat while paused and with automation enabled. Check the 12-hour cap and that completing an experiment offline restores the main run before applying remaining time.
8. Reach the million-floor finale. Confirm it is finite, the atlas completes, the game keeps growing, and publishing remains available. Export before testing Restart; cancellation must preserve the expedition.
9. Verify the new research multipliers in the live breakdown. Buy Generalization at level 12: level 13 must remain purchasable, grant another ×2, and double the next proof cost. Export/reload with a level above 12. Complete each conjecture and check its distinct proof and growth rewards; First Principles must suppress growth bonuses only while active. Import an old save with completed conjectures, verify its extra proofs, then export and reload to confirm they are not credited twice.

Manual endgame checks: advance a chapter-five coordinate through 12 and 15; the number and forecast must keep increasing and the Automatic graph must remain continuous. At coordinate 400, expect a tower height of 1e400, a finite logarithmic-height graph, and a logarithm-peeling fact rather than Infinity. Save and reload this state, then publish and verify the chapter resets normally. Linear/log/double-log graph choices should show their unavailable-scale message for symbolic towers.
