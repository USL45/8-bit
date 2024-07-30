const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const PLAYER_SIZE = 50;
const PLAYER_COLOR = '#0080FF';
const CHEST_SIZE = 40;
const CHEST_COLOR = '#FFD700'; // Gold
const COIN_SIZE = 20;
const COIN_COLOR = '#FFD700'; // Gold
const STATION_COLOR = '#00FF00'; // Green
const PLAYER_SPEED = 5;
const POTION_COST = 10;

let player = {
[1:31 PM]
x: canvas.width / 2,
    y: canvas.height / 2,
    size: PLAYER_SIZE,
    color: PLAYER_COLOR,
    coins: 0
};

let chests = [
    { x: 100, y: 100 },
    { x: 300, y: 300 }
];

let coins = [
    { x: 120, y: 120 },
    { x: 320, y: 320 }
];

let station = { x: 600, y: 200 };
[1:33 PM]
200 };

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawChests() {
    ctx.fillStyle = CHEST_COLOR;
    chests.forEach(chest => {
        ctx.fillRect(chest.x, chest.y, CHEST_SIZE, CHEST_SIZE);
    });
}

function drawCoins() {
	ctx.fillStyle = COIN_COLOR;
    coins.forEach(coin => {
        ctx.beginPath();
        ctx.arc(coin.x, coin.y, COIN_SIZE / 2, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawStation() {
    ctx.fillStyle = STATION_COLOR;
    ctx.fillRect(station.x, station.y, 60, 60);
}

function drawText(text, x, y) {
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '36px Arial';
    ctx.fillText(text, x, y);
}

function checkCollision(x1, y1, size1, x2, y2, size2) {
    return x1 < x2 + size2 &&
		x1 + size1 > x2 &&
           y1 < y2 + size2 &&
           y1 + size1 > y2;
}

function update() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw game elements
    drawPlayer();
    drawChests();
    drawCoins();
    drawStation();

    // Display coins
    drawText(`Coins: ${player.coins}`, 10, 30);

    // Check collisions with coins
    coins = coins.filter(coin => {
        if (checkCollision(player.x, player.y, player.size, coin.x - COIN_SIZE / 2, coin.y - COIN_SIZE / 2, COIN_SIZE)) {
            player.coins +=
			1;
            return false;
        }
        return true;
    });

    // Check collisions with chests
    chests = chests.filter(chest => {
        if (checkCollision(player.x, player.y, player.size, chest.x, chest.y, CHEST_SIZE)) {
            player.coins += 5;
            return false;
        }
        return true;
    });

    // Check buying/selling potions
    if (checkCollision(player.x, player.y, player.size, station.x, station.y, 60)) {
		5;
            return false;
        }
        return true;
    });

    // Check buying/selling potions
    if (checkCollision(player.x, player.y, player.size, station.x, station.y, 60)) {
        if (keys['b'] && player.coins >= POTION_COST) {
            player.coins -= POTION_COST;
            alert("Potion Bought!");
        }
        if (keys['s']) {
            player.coins += POTION_COST;
            alert("Potion Sold!");
        }
    }
}

const keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function gameLoop() {
    if (keys['ArrowLeft']) player.x -= PLAYER_SPEED;
    if (keys['ArrowRight']) player.x += PLAYER_SPEED;
    if (keys['ArrowUp']) player.y -= PLAYER_SPEED;
    if (keys['ArrowDown']) player.y += PLAYER_SPEED;

    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();