// script.js

// Initialize values from localStorage or default
let coins = parseInt(localStorage.getItem('coins')) || 0;
let profitPerHour = parseInt(localStorage.getItem('profitPerHour')) || 0;
let lastSaveTime = parseInt(localStorage.getItem('lastSaveTime')) || Date.now();

// Update displayed values
document.getElementById('totalCoins').textContent = coins.toLocaleString();
document.getElementById('profitPerHour').textContent = profitPerHour.toLocaleString();

function buyCard(cardId, profitIncrease, cost) {
    if (coins >= cost) {
        // Deduct coins and update profit per hour
        coins -= cost;
        profitPerHour += profitIncrease;

        // Save data to localStorage
        localStorage.setItem('coins', coins);
        localStorage.setItem('profitPerHour', profitPerHour);

        // Update displayed values
        document.getElementById('totalCoins').textContent = coins.toLocaleString();
        document.getElementById('profitPerHour').textContent = profitPerHour.toLocaleString();
    } else {
        alert('Not enough coins!');
    }
}

function saveData() {
    // Save current state to localStorage
    localStorage.setItem('coins', coins);
    localStorage.setItem('profitPerHour', profitPerHour);
    localStorage.setItem('lastSaveTime', Date.now());
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

// Show or hide different sections
function showBearShop() {
    document.getElementById('card-shop').classList.remove('hidden');
    document.getElementById('main-menu').style.display = 'none';
}

function showMiningBear() {
    alert('Mining Bear functionality not implemented yet.');
}

function showUpgrade() {
    alert('Upgrade functionality not implemented yet.');
}

// Run the update function when the page loads
window.onload = function() {
    updateCoinsFromProfit();
};
