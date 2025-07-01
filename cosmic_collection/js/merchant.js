// js/merchant.js

// ——— MERCHANT DEFINITIONS ———
const merchants = [
    {
      id: 1,
      name: 'Aldric Farwander',
      cardMultiplier: 1,
      refreshTime: 1,
      merchantOdds: 1000,
      raritiesSkipped: [],
      priceMultiplier: 1,
      rarityScaling: 2.5,
      description: 'Your standard traveling merchant',
      unlocked: true
    },
    {
      id: 2,
      name: 'Maribel Tealeaf',
      cardMultiplier: 1,
      refreshTime: 0.5,
      merchantOdds: 900,
      raritiesSkipped: [],
      priceMultiplier: 1,
      rarityScaling: 2.5,
      description: 'Always on the move. She only stays for half as long.',
      unlocked: true
    },
    {
      id: 3,
      name: 'Cedric Stormforge',
      cardMultiplier: 2,
      refreshTime: 1,
      merchantOdds: 800,
      raritiesSkipped: [],
      priceMultiplier: 1,
      rarityScaling: 2.5,
      description: 'A strong dude. Carries twice as many cards.',
      unlocked: true
    },
    {
      id: 4,
      name: 'Yvette Ambervale',
      cardMultiplier: 1,
      refreshTime: 1,
      merchantOdds: 700,
      raritiesSkipped: ['junk'],
      priceMultiplier: 1,
      rarityScaling: 2.5,
      description: 'A fancy lady. She does not carry junk.',
      unlocked: false
    },
    {
      id: 5,
      name: 'Orin Saltstride',
      cardMultiplier: 0.5,
      refreshTime: 1,
      merchantOdds: 600,
      raritiesSkipped: [],
      priceMultiplier: 0.1,
      rarityScaling: 2.5,
      description: 'Fair old guy. Carries half as many cards but sells them at 1/10 of the price.',
      unlocked: false
    },
    {
      id: 6,
      name: 'Petra Moonclasp',
      cardMultiplier: 1,
      refreshTime: 1,
      merchantOdds: 500,
      raritiesSkipped: [],
      priceMultiplier: 1,
      rarityScaling: 4.5,
      description: 'A lucky girl. Has better odds of offering rarer cards (+2 to scaling).',
      unlocked: false
    },
    {
      id: 7,
      name: 'Fergus Grainhand',
      cardMultiplier: 1.5,
      refreshTime: 2/3,
      merchantOdds: 450,
      raritiesSkipped: ['junk'],
      priceMultiplier: 0.5,
      rarityScaling: 2.5,
      description: 'An all around good guy. Carries 1.5x as many cards (no junk), sells them at 1/2 of the price, and stays 2/3 as long.',
      unlocked: false
    },
    {
      id: 8,
      name: 'Runa Frostpelt',
      cardMultiplier: 1,
      refreshTime: 1,
      merchantOdds: 400,
      raritiesSkipped: ['basic'],
      priceMultiplier: 1,
      rarityScaling: 2.5,
      description: 'Not a basic bitch. No basic cards. That is all.',
      unlocked: false
    },
    {
      id: 9,
      name: 'Tobias Quickpouch',
      cardMultiplier: 8,
      refreshTime: 1/3,
      merchantOdds: 350,
      raritiesSkipped: [],
      priceMultiplier: 0.75,
      rarityScaling: 2.5,
      description: 'The only BS this guy knows is Bulk Sales. Carries 8x as many cards, sells them at 75% of the price, and stays 1/3 as long.',
      unlocked: false
    },
    {
      id: 10,
      name: 'Selene Starwhistle',
      cardMultiplier: 0,
      refreshTime: 1,
      merchantOdds: 300,
      raritiesSkipped: ['junk', 'basic', 'decent', 'fine'],
      priceMultiplier: 2,
      rarityScaling: 3.5,
      description: 'Some say she is a real magician. Only offers one card at a time for double the price, but it is always rare or better. (and +1 to rarity scaling).',
      unlocked: false
    },
    {
      id: 11,
      name: 'Magnus Glimmergold',
      cardMultiplier: 1,
      refreshTime: 1,
      merchantOdds: 250,
      raritiesSkipped: ['junk', 'basic', 'decent'],
      priceMultiplier: 1,
      rarityScaling: 2.5,
      description: 'Some say he is a real magician, but all know he is rich. He will not even look at cards that are lower rarity than fine.',
      unlocked: false
    },
    {
      id: 12,
      name: 'Varka Embervein',
      cardMultiplier: 1,
      refreshTime: 1,
      merchantOdds: 200,
      raritiesSkipped: [],
      priceMultiplier: 1,
      rarityScaling: 4.5,
      guaranteedRealm: 10,
      guaranteedCount: 5,
      description: 'Next level blacksmith. She guarantees at least 5 weapon cards and has +2 to rarity scaling.',
      unlocked: false
    },
    {
      id: 13,
      name: 'Elias Pantheos',
      cardMultiplier: 1,
      refreshTime: 1,
      merchantOdds: 150,
      raritiesSkipped: ['junk'],
      priceMultiplier: 1,
      rarityScaling: 2.5,
      guaranteedRealm: 11,
      guaranteedCount: 2,
      description: 'Nobody knows just how old this guy is. Unlike other merchants, he sells Greek Gods cards - always has two. And he does not sell junk.',
      unlocked: false
    },
    {
      id: 14,
      name: 'Erevan Dreadveil',
      cardMultiplier: 2,
      refreshTime: 1,
      merchantOdds: 50,
      raritiesSkipped: [],
      priceMultiplier: 0.5,
      rarityScaling: 10,
      guaranteedRealm: 12,
      guaranteedCount: 3,
      description: 'The ultimate merchant. Always has 3 boss cards. 2x cards, 1/2 price, and +7.5 to rarity scaling.',
      unlocked: false
    }
    
    

  ];
  
  // ——— RARITY PRICE MULTIPLIERS ———
  const RARITY_PRICE_MULT = {
    junk:      new Decimal(1),
    basic:     new Decimal(5),
    decent:    new Decimal(15),
    fine:      new Decimal(50),
    rare:      new Decimal(200),
    epic:      new Decimal(1000),
    legend:    new Decimal(5000),
    mythic:    new Decimal(25000),
    exotic:    new Decimal(100000),
    divine:    new Decimal(500000),
  };

  // ——— HELPERS ———
  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  // only pick among unlocked merchants, weighted by merchantOdds
  function pickMerchant() {
    const pool = merchants.filter(m => m.unlocked);
    const total = pool.reduce((sum, m) => sum + m.merchantOdds, 0);
    let rnd = Math.random() * total;
    for (const m of pool) {
      if (rnd < m.merchantOdds) return m;
      rnd -= m.merchantOdds;
    }
    return pool[0] || null;
  }
  
  // optional helper: unlock a merchant by name
  function unlockMerchantByName(name) {
    const m = merchants.find(m => m.name === name);
    if (!m) {
      console.warn(`No merchant found with name “${name}”`);
      return false;
    }
    m.unlocked = true;
    return true;
  }
  
  // relies on weightedPick being defined globally (from main.js)
  function weightedPick(weights) {
    let total = 0;
    for (let w of Object.values(weights)) total += w;
    let rnd = Math.random() * total;
    for (let [k, w] of Object.entries(weights)) {
      if (rnd < w) return k;
      rnd -= w;
    }
    return Object.keys(weights)[0];
  }
  
  // ——— DOM CACHE ———
  const imgEl    = document.getElementById('merchant-image');
  const msgEl    = document.getElementById('merchant-message');
  const offersEl = document.getElementById('merchant-offers');
  const timerEl  = document.getElementById('merchant-timer');
  
  // Add a container for the bulk buy button
  let bulkBuyBtn = document.getElementById('merchant-bulkbuy-btn');
  if (!bulkBuyBtn) {
    bulkBuyBtn = document.createElement('button');
    bulkBuyBtn.id = 'merchant-bulkbuy-btn';
    bulkBuyBtn.style.display = 'none';
    bulkBuyBtn.className = 'merchant-bulkbuy-btn';
    bulkBuyBtn.textContent = 'How about all of them for 5% off?';  // Default text
    // Insert after timer, before image
    const panel = document.getElementById('merchant-panel');
    if (panel) {
      const timer = document.getElementById('merchant-timer');
      if (timer && timer.nextSibling) {
        panel.insertBefore(bulkBuyBtn, timer.nextSibling);
      } else {
        panel.appendChild(bulkBuyBtn);
      }
    }
  }
  
  // nextRefresh is declared here, but initialized/set in main.js
  let nextRefresh = null;
  
  // ——— REFRESH CHECK & TIMER ———
  function refreshMerchantIfNeeded() {
    const now = Date.now();
    if (!state.currentMerchant || (nextRefresh && now >= nextRefresh)) {
      state.currentMerchant = pickMerchant();
      merchantIsNew = true;
      const reducedTime = Math.max(15, ((300 - state.effects.merchantCooldownReduction) * state.currentMerchant.refreshTime));
      nextRefresh = now + reducedTime * 1000;
      genMerchantOffers();
      
      // Set merchant message only on refresh
      const greeting = pickRandom(window.merchantGreetings);
      const pitch = pickRandom(window.merchantPitches);
      state.currentMerchantMessage = `
        <div class="merchant-pitch">Merchant says:</div>
        <div class="merchant-greeting">${greeting}<br>${pitch}</div>
      `;

      renderMerchantTab();
    }
    const rem = nextRefresh ? (nextRefresh - now) / 1000 : 0;
    if (rem > 0) {
      timerEl.textContent = `Leaves in ${formatDuration(rem)}`;
    } else {
      timerEl.textContent = `Refreshing…`;
    }
  
    // toggle the "urgent" class instead of manually setting style.color
    if (rem > 0 && rem < 10) {
      timerEl.classList.add('urgent');
    } else {
      timerEl.classList.remove('urgent');
    }
  }
  
  let skippedOffers = 0;

  // ——— GENERATE MERCHANT OFFERS ———
  function genMerchantOffers() {
    skippedOffers = 0;
    
    // ensure we always have a merchant
    if (!state.currentMerchant) {
      state.currentMerchant = pickMerchant();
      nextRefresh = Date.now() + (300 * state.currentMerchant.refreshTime) * 1000;
    }
  
    const offers = [];
    const unlockedRealms = realms.filter(r => r.unlocked && r.id !== 11 && r.id !== 12).map(r => r.id);
  
    // precompute totals per realm
    const totalByRealm = {}, discByRealm = {};
    cards.forEach(c => {
      totalByRealm[c.realm] = (totalByRealm[c.realm] || 0) + 1;
      if (c.quantity > 0) {
        discByRealm[c.realm] = (discByRealm[c.realm] || 0) + 1;
      }
    });
  
    // # of slots
    const slots = Math.max(Math.ceil(state.effects.merchantNumCards
                          * state.currentMerchant.cardMultiplier), 1);
  
    const guaranteedRealm = state.currentMerchant.guaranteedRealm || 0;
    let guaranteedCount = state.currentMerchant.guaranteedCount || 0; 

    for (let i = 0; i < slots; i++) {
      // 1) pick a realm
      let realmId;
      if (guaranteedCount > 0) {
        realmId = guaranteedRealm;
        guaranteedCount--;
      } else {
        realmId = pickRandom(unlockedRealms);
      }
      const realm   = realmMap[realmId];
  
      // 2) build boosted rarity weights, skipping any merchant-specific rarities
      const skip = state.currentMerchant.raritiesSkipped || [];
      const boosted = {};
      rarities
        .filter(r => !skip.includes(r))
        .forEach((r, idx) => {
          boosted[r] = (realm.rarityWeights[r] || 0)
                     * Decimal.pow(state.currentMerchant.rarityScaling + state.effects.extraMerchantRarityScaling, idx).toNumber();
        });
      const rarity = weightedPick(boosted);
  
      // 3) pick a card from that realm+rarity
      let pool = realmRarityCardMap[realmId][rarity] || [];
      if (!pool.length) pool = realmRarityCardMap[realmId].junk;
      
      // Filter out locked cards AND cards with quantity 0
      pool = pool.filter(cardId => !cardMap[cardId].locked);
      
      // Only pick if we have valid cards
      if (pool.length === 0) {
        // Increment skipped counter
        skippedOffers++;
        // If no valid cards, skip this offer
        continue;
      }
      
      const cardId = pickRandom(pool);
      
      const ownQty = cardMap[cardId].quantity;
  
        // 4) choose currency: only those you actually earn via per-sec or per-poke
        const curSec  = state.effects.currencyPerSec;
        const curPoke = state.effects.currencyPerPoke;

        let validCurrencies = currencies.filter(cur => {
        const id = cur.id;
        const earnsSec  = (curSec[id]  || 0) > 0;
        const earnsPoke = (curPoke[id] || 0) > 0;
        return earnsSec || earnsPoke;
        });

        if (!validCurrencies.length) {
            validCurrencies = currencies.filter(cur => cur.id === 'stone');
        }

        const currencyMeta = pickRandom(validCurrencies);
        const currency     = currencyMeta.id;

  
      // compute price
      const rateSec  = new Decimal(curSec[currency] * state.effects.currencyPerSecMultiplier[currency] + state.resourceGeneratorContribution[currency] || 0);
      const ratePoke = new Decimal(curPoke[currency] * state.effects.currencyPerPokeMultiplier[currency] || 0);
      let price = rateSec.times(10).plus(ratePoke.times(2))
                  .times(RARITY_PRICE_MULT[rarity] || 1);
  
      // randomness ±99%
      // divide is not a function of Decimal, so we need to use a different approach
      const priceRandomVal = (Math.random()*1.98 + 0.01) * state.currentMerchant.priceMultiplier;
      price = price.times(priceRandomVal).dividedBy(state.effects.merchantPriceDivider).dividedBy(state.achievementRewards.merchantPriceDivider).ceil();
  
      
      let quantity = 1;
      let quantityRandomVal = 0;
      if (ownQty > 9 && Math.random() < state.merchantBulkChance) {
        const maxStack = Math.min(Math.floor(Math.pow(ownQty, 1 / state.merchantBulkRoot) * state.merchantBulkMult), ownQty);
        quantityRandomVal = Math.random();
        quantity = Math.max(1, Math.floor(quantityRandomVal * maxStack) + 1);
        price = price.times(Math.cbrt(quantity));
      }

  
      if (price.lessThan(1)) price = new Decimal(1);
      price = floorTo3SigDigits(price);
      offers.push({ cardId, price, currency, quantity, priceRandomVal, quantityRandomVal });
    }
  
    state.merchantOffers = offers;
    if (merchantIsNew) {
      merchantOffersOriginalCount = state.merchantOffers.length;
      merchantIsNew = false;
    }
  
    const btn = document.getElementById('tab-btn-merchant');
    if (!btn.classList.contains('active')) btn.classList.add('new-offers');

    // if offers length is 0, set merchant refresh time to 10 seconds
    if (state.merchantOffers.length === 0) {
      nextRefresh = Date.now() + 10 * 1000 + (skillMap[19401].purchased ? 5 * 1000 : 10 * 1000);
    }
  }
  
  // ——— RENDER & BUY ———
  function renderMerchantTab() {
    if (!state.currentMerchant) {
      refreshMerchantIfNeeded();
      return;
    }
  
    // Show/hide bulk buy button and update its text
    if (bulkBuyBtn) {
      if (skillMap[19101].purchased && canBulkBuyAllOffers()) {
        bulkBuyBtn.style.display = '';
        bulkBuyBtn.innerHTML = `How about all of them for ${formatNumber(state.merchantBuyAllDiscount * 100)}% off?`;
      } else {
        bulkBuyBtn.style.display = 'none';
      }
    }
    
    // Remove existing buyout cost container if it exists
    const existingContainer = document.querySelector('.buyout-cost-container');
    if (existingContainer) {
      existingContainer.remove();
    }

    // Add buyout cost display if skill is purchased
    if (skillMap[19101].purchased && state.merchantOffers.length > 1 && merchantOffersOriginalCount !== null && state.merchantOffers.length === merchantOffersOriginalCount) {

      // Create new container
      const container = document.createElement('div');
      container.className = 'buyout-cost-container';

      // Add title
      const title = document.createElement('div');
      title.className = 'buyout-cost-title';
      title.textContent = 'Buyout Cost:';
      container.appendChild(title);

      // Create grid
      const grid = document.createElement('div');
      grid.className = 'buyout-cost-grid';

      // Calculate costs
      const needed = {};
      if (state.merchantOffers && state.merchantOffers.length > 0) {
        for (const o of state.merchantOffers) {
          const price = new Decimal(o.price);
          const discounted = price.times(1 - state.merchantBuyAllDiscount).ceil();
          needed[o.currency] = (needed[o.currency] || new Decimal(0)).plus(discounted);
        }
      }

      // Add currency items in order of currencies array
      for (const currency of currencies) {
        const amt = needed[currency.id];
        if (amt && amt.greaterThan(0)) {
          const item = document.createElement('div');
          item.className = 'buyout-cost-item';

          // Determine affordability class
          const playerAmount = state.currencies[currency.id] || new Decimal(0);
          if (playerAmount.lessThan(amt)) {
            item.classList.add('unaffordable');
          } else if (playerAmount.times(0.1).greaterThan(amt)) {
            item.classList.add('affordable');
          } else {
            item.classList.add('expensive');
          }

          // Add currency icon
          const icon = document.createElement('img');
          const currencyPath = `assets/images/currencies/${currency.icon}`;
          imageCache.getImage('currencies', currencyPath).then(img => {
            if (img) icon.src = img.src;
          });
          item.appendChild(icon);

          // Add amount
          const amount = document.createElement('span');
          amount.textContent = formatNumber(floorTo3SigDigits(amt));
          item.appendChild(amount);

          grid.appendChild(item);
        }
      }

      container.appendChild(grid);

      // Insert after bulk buy button
      if (bulkBuyBtn && bulkBuyBtn.parentNode) {
        bulkBuyBtn.parentNode.insertBefore(container, bulkBuyBtn.nextSibling);
      }
    }
  
    // Set merchant image
    const slug = slugify(state.currentMerchant.name);
    const merchantPath = `assets/images/merchants/${slug}.jpg`;
    imageCache.getImage('merchants', merchantPath).then(img => {
        if (img) {
            imgEl.src = img.src;
            imgEl.alt = state.currentMerchant.name;
        }
    });

    // Remove any existing merchant info section
    const existingInfo = document.querySelector('.merchant-info');
    if (existingInfo) {
      existingInfo.remove();
    }

    // Add merchant info section
    const infoEl = document.createElement('div');
    infoEl.className = 'merchant-info';
    
    const nameEl = document.createElement('div');
    nameEl.className = 'merchant-name';
    nameEl.textContent = state.currentMerchant.name;
    
    const descEl = document.createElement('div');
    descEl.className = 'merchant-description';
    descEl.textContent = state.currentMerchant.description;
    
    infoEl.append(nameEl, descEl);
    
    // Insert info section after image
    if (imgEl.parentNode) {
      imgEl.parentNode.insertBefore(infoEl, imgEl.nextSibling);
    }

    // Generate new message if undefined
    if (!state.currentMerchantMessage) {
      const greeting = pickRandom(window.merchantGreetings);
      const pitch = pickRandom(window.merchantPitches);
      state.currentMerchantMessage = `
        <div class="merchant-pitch">Merchant says:</div>
        <div class="merchant-greeting">${greeting}<br>${pitch}</div>
      `;
    }

    // Use stored message
    msgEl.innerHTML = state.currentMerchantMessage;

    
    // Before returning, if we skipped any offers, show a message
    if (skippedOffers > 0) {
        const message = document.createElement('div');
        message.className = 'merchant-skip-message';
        message.textContent = `${skippedOffers} card${skippedOffers > 1 ? 's' : ''} skipped - due to card being locked`;
        msgEl.appendChild(message);
    }

    // Clear previous offers
    offersEl.innerHTML = '';

    // render offers
    let offersToRender = [...state.merchantOffers];
    let originalIndices = offersToRender.map((_, i) => i);
    
    // Sort offers if skill 19301 is purchased
    if (skillMap[19301].purchased) {
      // Sort both arrays together
      const combined = offersToRender.map((offer, i) => ({offer, originalIndex: i}));
      combined.sort((a, b) => {
        const cardA = cardMap[a.offer.cardId];
        const cardB = cardMap[b.offer.cardId];

        if (skillMap[19302].purchased) {
          // Priority order: realm 12 first, then realm 11, then everything else
          const getPriority = (realm) => {
            if (realm === 12) return 0; // Highest priority
            if (realm === 11) return 1; // Second priority
            return 2; // All other realms
          };

          const priorityA = getPriority(cardA.realm);
          const priorityB = getPriority(cardB.realm);

          // First sort by priority (realm 12, then 11, then others)
          if (priorityA !== priorityB) {
            return priorityA - priorityB;
          }
        }

        // For cards in the same priority group, sort by rarity (reverse order)
        const rarityIndexA = rarities.indexOf(cardA.rarity);
        const rarityIndexB = rarities.indexOf(cardB.rarity);
        if (rarityIndexA !== rarityIndexB) {
          return rarityIndexB - rarityIndexA; // Reverse order
        }

        // Then sort by realm (reverse order)
        return cardB.realm - cardA.realm; // Reverse order
      });

      // Update both arrays with sorted values
      offersToRender = combined.map(item => item.offer);
      originalIndices = combined.map(item => item.originalIndex);
    }

    offersToRender.forEach((o, displayIdx) => {
      const originalIdx = originalIndices[displayIdx];
      const card  = cardMap[o.cardId];
      const realm = realmMap[card.realm];
  
      const outer = document.createElement('div');
      outer.className = 'card-outer merchant-offer';
  
      const inner = document.createElement('div');
      inner.className = 'card-inner revealed';
  
      const front = document.createElement('div');
      front.className = 'card-face front';
      front.style.borderColor = realmColors[realm.id];
  
      // artwork
      const f = document.createElement('img');
      f.className = 'card-frame';
      const framePath = `assets/images/frames/${card.rarity}_frame.jpg`;
      imageCache.getImage('frames', framePath).then(img => {
          if (img) f.src = img.src;
      });

      const a = document.createElement('img');
      a.className = 'card-image';
      const cardPath = `assets/images/cards/${card.realm}/${slugify(card.name)}.jpg`;
      imageCache.getImage('cards', cardPath).then(img => {
          if (img) a.src = img.src;
      });
      front.append(f, a);
  
      // Add tier progress bar
      const barContainer = document.createElement('div');
      barContainer.className = 'merchant-modal-bar-container';
      const thresholds = window.tierThresholds[card.rarity];
      const nextThresh = thresholds[card.tier] || thresholds[thresholds.length - 1];
      const pct = Math.min(card.quantity / nextThresh, 1) * 100;
      const bar = document.createElement('div');
      bar.className = 'merchant-modal-bar';
      bar.style.width = pct + '%';
      const thresholdLab = document.createElement('div');
      thresholdLab.className = 'tier-threshold';
      if (card.tier === 20) {
        thresholdLab.textContent = 'Max Tier';
      } else {
        thresholdLab.textContent = `${formatNumber(card.quantity)} / ${formatNumber(nextThresh)} for T${card.tier+1}`;
      }
      barContainer.append(bar, thresholdLab);
      front.appendChild(barContainer);
  
      // add quantity badge if more than 1
      if (o.quantity > 1) {
        const qtyBadge = document.createElement('div');
        qtyBadge.className = 'count-badge';
        qtyBadge.textContent = `${formatNumber(o.quantity)}`;
        front.appendChild(qtyBadge);
      }
  
      // buy button
      const cm = currencies.find(cu => cu.id === o.currency) || { icon: 'question.png' };
      const buyBtn = document.createElement('button');
      buyBtn.className = 'offer-buy-btn';
      const bal = state.currencies[o.currency] || new Decimal(0);
      if (bal.lessThan(o.price)) {
        buyBtn.classList.add('unaffordable');
      }
      const currencyPath = `assets/images/currencies/${cm.icon}`;
      imageCache.getImage('currencies', currencyPath).then(img => {
          if (img) {
              buyBtn.innerHTML = `
                <span>Buy:</span>
                <span>
                  ${formatNumber(o.price)}
                  <img class="icon" src="${img.src}"/>
                </span>
              `;
          }
      });
      buyBtn.addEventListener('click', e => {
        e.stopPropagation();
        // Hide merchant tooltip when purchasing
        if (merchantTooltip) {
          merchantTooltip.classList.remove('visible');
          setTimeout(() => {
            if (merchantTooltip && !merchantTooltip.classList.contains('visible')) {
              merchantTooltip.remove();
              merchantTooltip = null;
            }
          }, 200);
        }
        buyOffer(originalIdx);  // Use original index for purchase
      });
      front.appendChild(buyBtn);

        // add NEW badge if player doesn't own this card yet
        if (card.quantity === 0 || card.isNew) {
            const newBadge = document.createElement('div');
            newBadge.className = 'reveal-badge new-badge';
            newBadge.textContent = 'NEW';
            front.appendChild(newBadge);
        } else {
          // Check if purchasing would increase tier
          const thresholds = window.tierThresholds[card.rarity];
          const currentTier = card.tier;
          let newTier = 1;
          while (newTier < thresholds.length && (card.quantity + o.quantity) >= thresholds[newTier]) {
            newTier++;
          }
          if (newTier > currentTier) {
            const tierUpBadge = document.createElement('div');
            tierUpBadge.className = 'reveal-badge tierup-badge';
            tierUpBadge.textContent = 'TIER UP';
            front.appendChild(tierUpBadge);
          }
        }
  
      // add click handler to open modal
      outer.addEventListener('click', () => openModal(card.id));

      // Add tooltip data for cost equivalents
      outer.setAttribute('data-merchant-card', 'true');
      outer.setAttribute('data-offer-price', o.price);
      outer.setAttribute('data-offer-currency', o.currency);
  
      // Add price intuition cloud if skill is purchased
      if (skillMap[19201].purchased) {
        const cloud = document.createElement('div');
        cloud.className = 'price-intuition-cloud';
        let shouldAddCloud = false;

        if (o.priceRandomVal > 1.6) {
          cloud.classList.add('bad');
          cloud.textContent = 'Bad\nOffer';
          shouldAddCloud = true;
        } else if (o.priceRandomVal < 0.05 && o.quantity > 1 && o.quantityRandomVal > 0.6) {
          cloud.classList.add('must-buy');
          cloud.textContent = 'MUST\nBUY';
          shouldAddCloud = true;
        } else if (o.priceRandomVal < 0.1 && o.quantity > 1 && o.quantityRandomVal > 0.3) {
          cloud.classList.add('great');
          cloud.textContent = 'Great\nOffer';
          shouldAddCloud = true;
        } else if (o.priceRandomVal < 0.2) {
          cloud.classList.add('good');
          cloud.textContent = 'Good\nOffer';
          shouldAddCloud = true;
        } 
        
        if (shouldAddCloud) {
          front.appendChild(cloud);
        }
      }
  
      inner.append(front);
      outer.append(inner);
      offersEl.appendChild(outer);
    });

    // Setup tooltips for merchant cards
    setupMerchantTooltips();
  }
  
  function buyOffer(i) {
    const o   = state.merchantOffers[i];
    const bal = state.currencies[o.currency] || new Decimal(0);
    if (bal.lessThan(o.price)) return;
  
    // spend & award
    state.currencies[o.currency] = bal.minus(o.price);
    giveCard(o.cardId, o.quantity || 1);
  
    // remove the offer
    state.merchantOffers.splice(i, 1);
  
    // if that was the *last* card, force remaining cooldown ≤ 10s
    if (state.merchantOffers.length === 0) {
      const now       = Date.now();
      const maxRemain = skillMap[19401].purchased ? 5 * 1000 : 10 * 1000;
      const rem       = nextRefresh - now;
      if (rem > maxRemain) {
        nextRefresh = now + maxRemain;
      }
    }
  
    // re-render
    const buyoutCostContainer = document.querySelector('.buyout-cost-container');
    if (buyoutCostContainer) {
      buyoutCostContainer.remove();
    }
    renderMerchantTab();  
    updateCurrencyBar();
    state.stats.merchantPurchases++;
    checkAchievements('merchantTrader');
  }
  
  
  // expose unlock helper if needed elsewhere
  window.unlockMerchantByName = unlockMerchantByName;

  
  let merchantIsNew = false;
  let merchantOffersOriginalCount = null;

  function canBulkBuyAllOffers() {
    // If any offer has been bought (i.e. less than the original number of offers), don't allow
    if (!state.merchantOffers || state.merchantOffers.length <= 1) return false;
    if (merchantOffersOriginalCount === null || state.merchantOffers.length < merchantOffersOriginalCount) return false;
    // Check if player can afford all for discount
    const needed = {};
    for (const o of state.merchantOffers) {
      const price = new Decimal(o.price);
      const discounted = price.times(1 - state.merchantBuyAllDiscount).ceil();
      needed[o.currency] = (needed[o.currency] || new Decimal(0)).plus(discounted);
    }
    for (const [cur, amt] of Object.entries(needed)) {
      if ((state.currencies[cur] || new Decimal(0)).lessThan(amt)) return false;
    }
    return true;
  }

  function doBulkBuyAllOffers() {
    // Deduct all currencies and give all cards
    const needed = {};
    for (const o of state.merchantOffers) {
      const price = new Decimal(o.price);
      const discounted = price.times(1 - state.merchantBuyAllDiscount).ceil();
      needed[o.currency] = (needed[o.currency] || new Decimal(0)).plus(discounted);
    }
    for (const [cur, amt] of Object.entries(needed)) {
      state.currencies[cur] = (state.currencies[cur] || new Decimal(0)).minus(amt);
    }
    for (const o of state.merchantOffers) {
      giveCard(o.cardId, o.quantity || 1);
    }
    state.stats.merchantPurchases += state.merchantOffers.length;
    checkAchievements('merchantTrader');
    state.merchantOffers = [];
    const now       = Date.now();
    const maxRemain = skillMap[19401].purchased ? 5 * 1000 : 10 * 1000;
    const rem       = nextRefresh - now;
    if (rem > maxRemain) {
      nextRefresh = now + maxRemain;
    }
    renderMerchantTab();
    updateCurrencyBar();
  }

if (bulkBuyBtn) {
  bulkBuyBtn.onclick = function() {
    doBulkBuyAllOffers();
    bulkBuyBtn.style.display = 'none';
    const buyoutCostContainer = document.querySelector('.buyout-cost-container');
    if (buyoutCostContainer) {
      buyoutCostContainer.remove();
    }
  };
}

// Global merchant tooltip element to prevent flickering
let merchantTooltip = null;
let merchantTooltipTimeout = null;

// Setup tooltip functionality for merchant cards
function setupMerchantTooltips() {
  const merchantCards = document.querySelectorAll('[data-merchant-card="true"]');

  merchantCards.forEach(card => {
    // Skip if already has tooltip listeners
    if (card.hasAttribute('data-merchant-tooltip-setup')) return;
    card.setAttribute('data-merchant-tooltip-setup', 'true');

    const showTooltip = () => {
      const price = new Decimal(card.getAttribute('data-offer-price'));
      const currency = card.getAttribute('data-offer-currency');

      if (!price || !currency) return;

      // Calculate poke and time equivalents
      const perPokeRate = (state.effects.currencyPerPoke[currency] || 0) * (state.effects.currencyPerPokeMultiplier[currency] || 1);
      const perSecRate = (state.effects.currencyPerSec[currency] || 0) * (state.effects.currencyPerSecMultiplier[currency] || 1);
      const generatorContribution = state.resourceGeneratorContribution[currency] || 0;
      const totalPerSecRate = perSecRate + generatorContribution;

      // Calculate poke equivalent
      let pokeEquivalent = 'N/A';
      if (perPokeRate > 0) {
        const pokes = price.dividedBy(perPokeRate).toNumber();
        pokeEquivalent = formatNumber(Math.ceil(pokes)) + ' pokes';
      }

      // Calculate time equivalent
      let timeEquivalent = 'N/A';
      if (totalPerSecRate > 0) {
        const seconds = price.dividedBy(totalPerSecRate).toNumber();
        timeEquivalent = formatDuration(seconds);
      }

      let tooltipContent = `<strong>Cost Equivalent</strong><br>`;
      tooltipContent += `${pokeEquivalent}<br>`;
      tooltipContent += `${timeEquivalent}`;

      // Check if card is affordable and add additional info if not
      const playerBalance = state.currencies[currency] || new Decimal(0);
      if (playerBalance.lessThan(price)) {
        const needed = price.minus(playerBalance);

        // Calculate pokes until affordable
        let pokesUntilAffordable = 'N/A';
        if (perPokeRate > 0) {
          const pokes = needed.dividedBy(perPokeRate).toNumber();
          pokesUntilAffordable = formatNumber(Math.ceil(pokes)) + ' pokes';
        }

        // Calculate time until affordable
        let timeUntilAffordable = 'N/A';
        if (totalPerSecRate > 0) {
          const seconds = needed.dividedBy(totalPerSecRate).toNumber();
          timeUntilAffordable = formatDuration(seconds);
        }

        tooltipContent += `<br><small>Pokes until affordable: ${pokesUntilAffordable}</small>`;
        tooltipContent += `<br><small>Time until affordable: ${timeUntilAffordable}</small>`;
      }

      // Clear any existing timeout
      if (merchantTooltipTimeout) {
        clearTimeout(merchantTooltipTimeout);
        merchantTooltipTimeout = null;
      }

      // Create or update tooltip
      if (!merchantTooltip) {
        merchantTooltip = document.createElement('div');
        merchantTooltip.className = 'currency-tooltip';
        document.body.appendChild(merchantTooltip);
      }

      merchantTooltip.innerHTML = tooltipContent;

      // Position tooltip with smart bounds checking
      const rect = card.getBoundingClientRect();
      const tooltipRect = merchantTooltip.getBoundingClientRect();

      let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
      let top = rect.top - tooltipRect.height - 10;

      // Adjust if tooltip goes off screen
      if (left < 10) left = 10;
      if (left + tooltipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipRect.width - 10;
      }
      if (top < 10) {
        // Show below if no room above
        top = rect.bottom + 10;
        merchantTooltip.classList.add('below');
      } else {
        merchantTooltip.classList.remove('below');
      }

      merchantTooltip.style.left = left + 'px';
      merchantTooltip.style.top = top + 'px';
      merchantTooltip.classList.add('visible');
    };

    const hideTooltip = () => {
      if (merchantTooltip) {
        merchantTooltipTimeout = setTimeout(() => {
          if (merchantTooltip) {
            merchantTooltip.classList.remove('visible');
            setTimeout(() => {
              if (merchantTooltip && !merchantTooltip.classList.contains('visible')) {
                merchantTooltip.remove();
                merchantTooltip = null;
              }
            }, 200);
          }
        }, 100); // Small delay to prevent flickering when moving between cards
      }
    };

    // Add event listeners
    card.addEventListener('mouseenter', showTooltip);
    card.addEventListener('mouseleave', hideTooltip);

    // Long press support for mobile (don't interfere with normal touch)
    let touchTimer = null;
    let touchStarted = false;

    card.addEventListener('touchstart', (e) => {
      touchStarted = true;
      touchTimer = setTimeout(() => {
        if (touchStarted) {
          e.preventDefault();
          showTooltip();
          // Hide after 3 seconds on long press
          setTimeout(hideTooltip, 3000);
        }
      }, 500); // 500ms long press
    });

    card.addEventListener('touchend', () => {
      touchStarted = false;
      if (touchTimer) {
        clearTimeout(touchTimer);
        touchTimer = null;
      }
    });

    card.addEventListener('touchmove', () => {
      touchStarted = false;
      if (touchTimer) {
        clearTimeout(touchTimer);
        touchTimer = null;
      }
    });
  });
}
