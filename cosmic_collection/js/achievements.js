// Achievement definitions and stats tracking
const achievements = {

    ageOfDiscovery: {
        id: 'ageOfDiscovery',
        name: 'Age of Discovery',
        type: 'ageOfDiscovery',
        condition: 'Discover 5 cards',
        icon: '🔍',
        rewardType: 'Max Cards Multiplier',
        reward: 1.01,
        threshold: 5,
    },
    ageOfDiscovery2: {
        id: 'ageOfDiscovery2',
        name: 'Age of Discovery II',
        type: 'ageOfDiscovery',
        condition: 'Discover 10 cards',
        icon: '🔍',
        rewardType: 'Max Cards Multiplier',
        reward: 1.01,
        threshold: 10,
    },
    ageOfDiscovery3: {
        id: 'ageOfDiscovery3',
        name: 'Age of Discovery III',
        type: 'ageOfDiscovery',
        condition: 'Discover 15 cards',
        icon: '🔍',
        rewardType: 'Max Cards Multiplier',
        reward: 1.01,
        threshold: 15,
    },
    ageOfDiscovery4: {
        id: 'ageOfDiscovery4',
        name: 'Age of Discovery IV',
        type: 'ageOfDiscovery',
        condition: 'Discover 20 cards',
        icon: '🔍',
        rewardType: 'Max Cards Multiplier',
        reward: 1.01,
        threshold: 20,
    },
    ageOfDiscovery5: {
        id: 'ageOfDiscovery5',
        name: 'Age of Discovery V',
        type: 'ageOfDiscovery',
        condition: 'Discover 25 cards',
        icon: '🔍',
        rewardType: 'Max Cards Multiplier',
        reward: 1.01,
        threshold: 25,
    },
    ageOfDiscovery6: {
        id: 'ageOfDiscovery6',
        name: 'Age of Discovery VI',
        type: 'ageOfDiscovery',
        condition: 'Discover 50 cards',
        icon: '🔍',
        rewardType: 'Max Cards Multiplier',
        reward: 1.01,
        threshold: 50,
    },
    ageOfDiscovery7: {
        id: 'ageOfDiscovery7',
        name: 'Age of Discovery VII',
        type: 'ageOfDiscovery',
        condition: 'Discover 100 cards',
        icon: '🔍',
        rewardType: 'Max Cards Multiplier',
        reward: 1.01,
        threshold: 100,
    },
    ageOfDiscovery8: {
        id: 'ageOfDiscovery8',
        name: 'Age of Discovery VIII',
        type: 'ageOfDiscovery',
        condition: 'Discover 150 cards',
        icon: '🔍',
        rewardType: 'Max Cards Multiplier',
        reward: 1.01,
        threshold: 150,
    },
    ageOfDiscovery9: {
        id: 'ageOfDiscovery9',
        name: 'Age of Discovery IX',
        type: 'ageOfDiscovery',
        condition: 'Discover 200 cards',
        icon: '🔍',
        rewardType: 'Max Cards Multiplier',
        reward: 1.01,
        threshold: 200,
    },
    ageOfDiscovery10: {
        id: 'ageOfDiscovery10',
        name: 'Age of Discovery X',
        type: 'ageOfDiscovery',
        condition: 'Discover 250 cards',
        icon: '🔍',
        rewardType: 'Max Cards Multiplier',
        reward: 1.01,
        threshold: 250,
    },
    ageOfDiscovery11: {
        id: 'ageOfDiscovery11',
        name: 'Age of Discovery XI',
        type: 'ageOfDiscovery',
        condition: 'Discover 300 cards',
        icon: '🔍',
        rewardType: 'Max Cards Multiplier',
        reward: 1.01,
        threshold: 300,
    },

    cosmicCollector: {
        id: 'cosmicCollector',
        name: 'Cosmic Collector',
        type: 'cosmicCollector',
        condition: 'Collect all Rocks cards',
        icon: '🃏',
        rewardType: 'Max Cards Multiplier',
        reward: 1.01,
        realm: 1,
    },
    cosmicCollector2: {
        id: 'cosmicCollector2',
        name: 'Cosmic Collector II',
        type: 'cosmicCollector',
        condition: 'Collect all Sea World cards',
        icon: '🃏',
        rewardType: 'Max Cards Multiplier',
        reward: 1.01,
        realm: 2,
    },
    cosmicCollector3: {
        id: 'cosmicCollector3',
        name: 'Cosmic Collector III',
        type: 'cosmicCollector',
        condition: 'Collect all Bugdom cards',
        icon: '🃏',
        rewardType: 'Max Cards Multiplier',
        reward: 1.01,
        realm: 3,
    },
    cosmicCollector4: {
        id: 'cosmicCollector4',
        name: 'Cosmic Collector IV',
        type: 'cosmicCollector',
        condition: 'Collect all Aviary cards',
        icon: '🃏',
        rewardType: 'Max Cards Multiplier',
        reward: 1.01,
        realm: 4,
    },
    cosmicCollector5: {
        id: 'cosmicCollector5',
        name: 'Cosmic Collector V',
        type: 'cosmicCollector',
        condition: 'Collect all Ancient Relics cards',
        icon: '🃏',
        rewardType: 'Max Cards Multiplier',
        reward: 1.01,
        realm: 5,
    },
    cosmicCollector6: {
        id: 'cosmicCollector6',
        name: 'Cosmic Collector VI',
        type: 'cosmicCollector',
        condition: 'Collect all Celestial Bodies cards',
        icon: '🃏',
        rewardType: 'Max Cards Multiplier',
        reward: 1.01,
        realm: 6,
    },
    cosmicCollector7: {
        id: 'cosmicCollector7',
        name: 'Cosmic Collector VII',
        type: 'cosmicCollector',
        condition: 'Collect all Mythical Beasts cards',
        icon: '🃏',
        rewardType: 'Max Cards Multiplier',
        reward: 1.02,
        realm: 7,
    },
    cosmicCollector8: {
        id: 'cosmicCollector8',
        name: 'Cosmic Collector VIII',
        type: 'cosmicCollector',
        condition: 'Collect all Incremental Games cards',
        icon: '🃏',
        rewardType: 'Max Cards Multiplier',
        reward: 1.03,
        realm: 8,
    },
    cosmicCollector9: {
        id: 'cosmicCollector9',
        name: 'Cosmic Collector IX',
        type: 'cosmicCollector',
        condition: 'Collect all Spirit Familiars cards',
        icon: '🃏',
        rewardType: 'Max Cards Multiplier',
        reward: 1.03,
        realm: 9,
    },
    cosmicCollector10: {
        id: 'cosmicCollector10',
        name: 'Cosmic Collector X',
        type: 'cosmicCollector',
        condition: 'Collect all Weapons cards',
        icon: '🃏',
        rewardType: 'Max Cards Multiplier',
        reward: 1.04,
        realm: 10,
    },
    cosmicCollector11: {
        id: 'cosmicCollector11',
        name: 'Cosmic Collector XI',
        type: 'cosmicCollector',
        condition: 'Collect all Greek Gods cards',
        icon: '🃏',
        rewardType: 'Max Cards Multiplier',
        reward: 1.05,
        realm: 11,
    },
    // cosmicCollector12: {
    //     id: 'cosmicCollector12',
    //     name: 'Cosmic Collector XII',
    //     type: 'cosmicCollector',
    //     condition: 'Collect all Boss cards',
    //     icon: '🃏',
    //     rewardType: 'Max Cards Multiplier',
    //     reward: 1.1,
    //     realm: 12,
    // },
    holePoker: {
        id: 'holePoker',
        name: 'Hole Poker',
        type: 'holePoker',
        condition: 'Poke the Black Hole 100 times',
        icon: '🕳️',
        rewardType: 'Min Cards Multiplier',
        reward: 1.01,
        threshold: 100,
    },
    holePoker2: {
        id: 'holePoker2',
        name: 'Hole Poker II',
        type: 'holePoker',
        condition: 'Poke the Black Hole 1000 times',
        icon: '🕳️',
        rewardType: 'Min Cards Multiplier',
        reward: 1.02,
        threshold: 1000,
    },
    holePoker3: {
        id: 'holePoker3',
        name: 'Hole Poker III',
        type: 'holePoker',
        condition: 'Poke the Black Hole 10000 times',
        icon: '🕳️',
        rewardType: 'Min Cards Multiplier',
        reward: 1.03,
        threshold: 10000,
    },
    holePoker4: {
        id: 'holePoker4',
        name: 'Hole Poker IV',
        type: 'holePoker',
        condition: 'Poke the Black Hole 100000 times',
        icon: '🕳️',
        rewardType: 'Min Cards Multiplier',
        reward: 1.04,
        threshold: 100000,
    },
    holePoker5: {
        id: 'holePoker5',
        name: 'Hole Poker V',
        type: 'holePoker',
        condition: 'Poke the Black Hole 1000000 times',
        icon: '🕳️',
        rewardType: 'Min Cards Multiplier',
        reward: 1.05,
        threshold: 1000000,
    },
    merchantTrader: {
        id: 'merchantTrader',
        name: 'Merchant Trader',
        type: 'merchantTrader',
        condition: 'Purchase 10 cards from Merchants',
        icon: '🛒',
        rewardType: 'Merchant Price Divider',
        reward: 1.01,
        threshold: 10,
    },
    merchantTrader2: {
        id: 'merchantTrader2',
        name: 'Merchant Trader II',
        type: 'merchantTrader',
        condition: 'Purchase 100 cards from Merchants',
        icon: '🛒',
        rewardType: 'Merchant Price Divider',
        reward: 1.02,
        threshold: 100,
    },
    merchantTrader3: {
        id: 'merchantTrader3',
        name: 'Merchant Trader III',
        type: 'merchantTrader',
        condition: 'Purchase 1000 cards from Merchants',
        icon: '🛒',
        rewardType: 'Merchant Price Divider',
        reward: 1.03,
        threshold: 1000,
    },
    merchantTrader4: {
        id: 'merchantTrader4',
        name: 'Merchant Trader IV',
        type: 'merchantTrader',
        condition: 'Purchase 10000 cards from Merchants',
        icon: '🛒',
        rewardType: 'Merchant Price Divider',
        reward: 1.04,
        threshold: 10000,
    },
    merchantTrader5: {
        id: 'merchantTrader5',
        name: 'Merchant Trader V',
        type: 'merchantTrader',
        condition: 'Purchase 100000 cards from Merchants',
        icon: '🛒',
        rewardType: 'Merchant Price Divider',
        reward: 1.05,
        threshold: 100000,
    },
    secret: {
        id: 'secret',
        name: 'Secret',
        type: 'secret',
        condition: 'Number 69',
        icon: '🚨',
        rewardType: 'Min Cards Multiplier',
        reward: 1.02,
    },
    secret2: {
        id: 'secret2',
        name: 'Secret II',
        type: 'secret',
        condition: 'Find the Easter Egg',
        icon: '🥚',
        rewardType: 'Min Cards Multiplier',
        reward: 1.02,
    },
    // secret8: {
    //     id: 'secret8',
    //     name: 'Secret VIII',
    //     type: 'secret',
    //     condition: 'Divine Sacrifice',
    //     icon: '👑',
    //     rewardType: 'Min Cards Multiplier',
    //     reward: 1.05,
    // },
    tierFanatic: {
        id: 'tierFanatic',
        name: 'Tier Fanatic',
        type: 'tierFanatic',
        condition: 'Reach Tier 20 for 20 different Junk cards',
        icon: '🏅',
        rewardType: 'Max Cards Multiplier',
        reward: 1.05,
        rarity: 'junk',
        threshold: 20,
    },
    tierFanatic2: {
        id: 'tierFanatic2',
        name: 'Tier Fanatic II',
        type: 'tierFanatic',
        condition: 'Reach Tier 20 for 20 different Basic cards',
        icon: '🏅',
        rewardType: 'Max Cards Multiplier',
        reward: 1.1,
        rarity: 'basic',
        threshold: 20,
    },
    tierFanatic3: {
        id: 'tierFanatic3',
        name: 'Tier Fanatic III',
        type: 'tierFanatic',
        condition: 'Reach Tier 20 for 20 different Decent cards',
        icon: '🏅',
        rewardType: 'Max Cards Multiplier',
        reward: 1.15,
        rarity: 'decent',
        threshold: 20,
    },
    tierFanatic4: {
        id: 'tierFanatic4',
        name: 'Tier Fanatic IV',
        type: 'tierFanatic',
        condition: 'Reach Tier 20 for 20 different Fine cards',
        icon: '🏅',
        rewardType: 'Max Cards Multiplier',
        reward: 1.2,
        rarity: 'fine',
        threshold: 20,
    },
    tierFanatic5: {
        id: 'tierFanatic5',
        name: 'Tier Fanatic V',
        type: 'tierFanatic',
        condition: 'Reach Tier 20 for 20 different Rare cards',
        icon: '🏅',
        rewardType: 'Max Cards Multiplier',
        reward: 1.25,
        rarity: 'rare',
        threshold: 20,
    },
    tierFanatic6: {
        id: 'tierFanatic6',
        name: 'Tier Fanatic VI',
        type: 'tierFanatic',
        condition: 'Reach Tier 20 for 20 different Epic cards',
        icon: '🏅',
        rewardType: 'Max Cards Multiplier',
        reward: 1.3,
        rarity: 'epic',
        threshold: 20,
    },
    tierFanatic7: {
        id: 'tierFanatic7',
        name: 'Tier Fanatic VII',
        type: 'tierFanatic',
        condition: 'Reach Tier 20 for 20 different Legend cards',
        icon: '🏅',
        rewardType: 'Max Cards Multiplier',
        reward: 1.35,
        rarity: 'legend',
        threshold: 20,
    },
    tierFanatic8: {
        id: 'tierFanatic8',
        name: 'Tier Fanatic VIII',
        type: 'tierFanatic',
        condition: 'Reach Tier 20 for 10 different Mythic cards',
        icon: '🏅',
        rewardType: 'Max Cards Multiplier',
        reward: 1.4,
        rarity: 'mythic',
        threshold: 10,
    },
    tierFanatic9: {
        id: 'tierFanatic9',
        name: 'Tier Fanatic IX',
        type: 'tierFanatic',
        condition: 'Reach Tier 20 for 10 different Exotic cards',
        icon: '🏅',
        rewardType: 'Max Cards Multiplier',
        reward: 1.45,
        rarity: 'exotic',
        threshold: 10,
    },
    tierFanatic10: {
        id: 'tierFanatic10',
        name: 'Tier Fanatic X',
        type: 'tierFanatic',
        condition: 'Reach Tier 20 for 5 different Divine cards',
        icon: '🏅',
        rewardType: 'Max Cards Multiplier',
        reward: 1.5,
        rarity: 'divine',
        threshold: 5,
    },
};

// add an achievementsMap for accessing achievements by ID
const achievementsMap = Object.fromEntries(Object.values(achievements).map(a => [a.id, a]));

// Check and potentially unlock achievements
function checkAchievements(type, param1, param2) {
    // Filter achievements by type first
    const relevantAchievements = Object.values(achievements).filter(a => a.type === type);

    const cardsDiscovered = cards.filter(c => c.quantity > 0).length;

    relevantAchievements.forEach(achievement => {
        // Skip if already unlocked
        if (state.achievementsUnlocked.has(achievement.id)) return;

        // Check based on achievement type
        let shouldUnlock = false;
        switch(type) {
            case 'ageOfDiscovery':
                shouldUnlock = cardsDiscovered >= achievement.threshold;
                break;

            case 'cosmicCollector':
                shouldUnlock = param1 === achievement.realm && cards.filter(c => c.realm === param1).every(c => c.quantity > 0);
                break;
            
            case 'holePoker':
                shouldUnlock = state.stats.totalPokes >= achievement.threshold;
                break;
                
            case 'merchantTrader':
                shouldUnlock = state.stats.merchantPurchases >= achievement.threshold;
                break;
                
            case 'tierFanatic':
                shouldUnlock = param1 === achievement.rarity && cards.filter(c => c.rarity === achievement.rarity && c.tier === 20).length >= achievement.threshold;
                break;
        }

        if (shouldUnlock) {
            unlockAchievement(achievement.id);
        }
    });
}

// Unlock an achievement and show notification
function unlockAchievement(achievementId, duringLoad = false) {
    if (!state.achievementsUnlocked.has(achievementId) || duringLoad) {
        // Process rewards based on type
        switch(achievementsMap[achievementId].rewardType) {
            case 'Max Cards Multiplier':
                state.achievementRewards.maxCardsMultiplier *= achievementsMap[achievementId].reward;
                break;

            case 'Min Cards Multiplier':
                state.achievementRewards.minCardsMultiplier *= achievementsMap[achievementId].reward;
                break;

            case 'Merchant Price Divider':
                state.achievementRewards.merchantPriceDivider *= achievementsMap[achievementId].reward;
                break;
        }

        if (!duringLoad) {
            state.achievementsUnlocked.add(achievementId);
            showAchievementNotification(achievementsMap[achievementId]);
            saveState();
            renderAchievements();
        }
    }
}

// Show achievement unlock notification
function showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="achievement-content">
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-info">
                <div class="achievement-title">Achievement Unlocked!</div>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-reward">+${achievement.reward} coins</div>
            </div>
        </div>
    `;
    document.body.appendChild(notification);

    // Remove notification after animation
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Render achievements grid with progress
function renderAchievements() {
    const container = document.getElementById('achievements-container');
    if (!container) return;

    const totalAchievements = Object.keys(achievements).length;
    const unlockedCount = state.achievementsUnlocked.size;
    
    // Group achievements by type and calculate multipliers
    const achievementsByType = Object.values(achievements).reduce((acc, achievement) => {
        if (!acc[achievement.type]) {
            acc[achievement.type] = {
                achievements: [],
                multiplier: 1
            };
        }
        acc[achievement.type].achievements.push(achievement);
        // If achievement is unlocked, multiply the type's multiplier
        if (state.achievementsUnlocked.has(achievement.id)) {
            acc[achievement.type].multiplier *= achievement.reward;
        }
        return acc;
    }, {});
    
    container.innerHTML = `
        <div class="achievements-header">
            <h2>Achievements (${unlockedCount}/${totalAchievements})</h2>
            <div class="achievements-progress">
                <div class="progress-bar" style="width: ${(unlockedCount/totalAchievements) * 100}%"></div>
            </div>
        </div>
        ${Object.entries(achievementsByType).map(([type, data]) => {
            const rewardType = data.achievements[0].rewardType; // Get reward type from first achievement in group
            return `
                <div class="achievement-section">
                    <h3 class="achievement-type-header">
                        ${type.replace(/([A-Z])/g, ' $1').trim().replace(/^./, c => c.toUpperCase())}
                        ${data.multiplier !== 1 ? 
                            `<span class="achievement-type-multiplier">(${rewardType}: ×${data.multiplier.toFixed(3)})</span>` : 
                            `<span class="achievement-type-multiplier">(${rewardType})</span>`}
                    </h3>
                    <div class="achievements-grid">
                        ${data.achievements.map(achievement => {
                            const isUnlocked = state.achievementsUnlocked.has(achievement.id);
                            return `
                                <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'}">
                                    <div class="achievement-icon${achievement.id === 'secret2' ? ' easter-egg' : ''}">${achievement.icon}</div>
                                    <div class="achievement-title">${achievement.name}</div>
                                    <div class="achievement-description">${achievement.condition}</div>
                                    <div class="achievement-reward">
                                        <span class="reward-type">${achievement.rewardType}:</span>
                                        <span class="reward-value">×${achievement.reward.toFixed(2)}</span>
                                    </div>
                                    ${isUnlocked ? '<div class="achievement-completed">✓ Completed</div>' : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }).join('')}
    `;

    // Add click handler for the Easter egg
    const easterEgg = container.querySelector('.easter-egg');
    if (easterEgg) {
        easterEgg.style.cursor = 'help';
        easterEgg.addEventListener('click', () => {
            unlockAchievement('secret2');
        });
    }
}
