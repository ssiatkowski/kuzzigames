// Absorber state
let absorberActive = false;

// DOM elements
const absorberContainer = document.getElementById('absorber-container');
const absorberCounter = document.querySelector('.absorber-counter');
const absorberButton = document.getElementById('absorber-button');

// Initialize absorber
function initGravitationalWaveAbsorber() {
  // Check if the skill is purchased
  if (skillMap[12101].purchased) {
    absorberContainer.style.display = 'flex';
    updateAbsorberUI();
  }
}

// Update absorber UI
function updateAbsorberUI() {
    // show the new counter
    absorberCounter.textContent = formatNumber(state.absorberValue) + 'x';
    
    // toggle classes based on current state
    absorberButton.classList.toggle('active', absorberActive);

    const maxAbsorberValue = skillMap[12106].purchased ? 100 : (skillMap[12103].purchased ? 10 : 5);
    absorberButton.classList.toggle('maxed', state.absorberValue >= maxAbsorberValue && !absorberActive);
  }

let absorber3 = 0;

// Handle absorber button click
function handleAbsorberClick() {
  if (state.absorberValue == 1 || absorberActive) return; // Don't allow activation if at 1x or already active
  
  if ((state.absorberValue > 2.9 && state.absorberValue < 3.1) || (state.absorberValue > 12.9 && state.absorberValue < 13.1)) {
    absorber3++;
    if (absorber3 == 3) {
      unlockAchievement('secret4');
      absorber3 = 0;
    }
  } else {
    absorber3 = 0;
  }

  absorberActive = true;
  updateAbsorberUI();
}

// Increment absorber value
function incrementAbsorber() {
    const maxAbsorberValue = skillMap[12106].purchased ? 100 : (skillMap[12103].purchased ? 10 : 5);
    if (state.absorberValue < maxAbsorberValue) {
        // 1) Add
        let next = state.absorberValue 
        if (skillMap[30016].purchased) {
          next += 3;
        } else {
          next += 0.05 * (skillMap[12102].purchased ? 2 : 1) * (skillMap[12104].purchased ? state.selectedRealms.length : 1);
        }
        // 2) Round to 2 decimals
        next = Math.round(next * 100) / 100;
        // 3) Clamp at max value
        state.absorberValue = Math.min(next, maxAbsorberValue);
        updateAbsorberUI();
    } else if (state.autoUseAbsorber) {
        handleAbsorberClick();
    }
}

// Reset absorber after use
function resetAbsorber() {
  state.absorberValue = 1;
  absorberActive = false;
  updateAbsorberUI();
}

// Get current multiplier
function getAbsorberMultiplier(tooltipInfoOnly = false) {
  if (absorberActive) {
    const multiplier = state.absorberValue;
    if (!tooltipInfoOnly) {
      resetAbsorber();
    }
    return multiplier;
  }
  return 1;
}