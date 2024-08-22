// script.js

// Initialize values from localStorage or default
let coins = parseInt(localStorage.getItem('coins')) || 0;
let profitPerHour = parseInt(localStorage.getItem('profitPerHour')) || 0;
let lastSaveTime = parseInt(localStorage.getItem('lastSaveTime')) || Date.now();
let cardData = JSON.parse(localStorage.getItem('cardData')) || {};

// Update displayed values
document.getElementById('totalCoins').textContent = coins.toLocaleString();
document.getElementById('profitPerHourDisplay').textContent = profitPerHour.toLocaleString();

function buyCard(cardId, profitIncrease, cost) {
    if (coins >= cost) {
        // Deduct coins and update profit per hour
        coins -= cost;
        profitPerHour += profitIncrease;

        // Update card purchase status
        cardData[cardId] = (cardData[cardId] || 0) + 1;
        
        // Save data to localStorage
        localStorage.setItem('coins', coins);
        localStorage.setItem('profitPerHour', profitPerHour);
        localStorage.setItem('cardData', JSON.stringify(cardData));

        // Update displayed values
        document.getElementById('totalCoins').textContent = coins.toLocaleString();
        document.getElementById('profitPerHourDisplay').textContent = profitPerHour.toLocaleString();
    } else {
        alert('Not enough coins!');
    }
}

function saveData() {
    // Save current state to localStorage
    localStorage.setItem('coins', coins);
    localStorage.setItem('profitPerHour', profitPerHour);
    localStorage.setItem('lastSaveTime', Date.now());
    localStorage.setItem('cardData', JSON.stringify(cardData));
}

function updateCoinsFromProfit() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - lastSaveTime;

    if (elapsedTime >= 3600000) { // 1 hour in milliseconds
        const hoursElapsed = Math.floor(elapsedTime / 3600000);
        const profitGained = hoursElapsed * profitPerHour;
        coins += profitGained;

        // Update localStorage with new values
        localStorage.setItem('coins', coins);
        localStorage.setItem('lastSaveTime', currentTime);

        // Update displayed values
        document.getElementById('totalCoins').textContent = coins.toLocaleString();
    }
}

// Function to handle showing the Bear Shop section
function showBearShop() {
    document.getElementById('bearShop').classList.remove('hidden');
    document.getElementById('miningBear').classList.add('hidden');
    document.getElementById('upgrade').classList.add('hidden');
}

// Function to handle showing the Mining Bear section
function showMiningBear() {
    document.getElementById('bearShop').classList.add('hidden');
    document.getElementById('miningBear').classList.remove('hidden');
    document.getElementById('upgrade').classList.add('hidden');
}

// Function to handle showing the Upgrade section
function showUpgrade() {
    document.getElementById('bearShop').classList.add('hidden');
    document.getElementById('miningBear').classList.add('hidden');
    document.getElementById('upgrade').classList.remove('hidden');
}

// Run the update function when the page loads
window.onload = function() {
    updateCoinsFromProfit();
};
