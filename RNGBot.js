



var COST_INCREASE_MULTIPLIER = 1.1;
var BASE_MOVEMENT_SPEED = 1000;
var BASE_MOVEMENT_REDUCTION = 0.9;

var AUTO_RE_ENABLE_RNG_BOT_TIMER = 3000;

class RNGBot {
    constructor(game) {
        this.game = game;
        this.rngBotMoveInterval = null;
        this.rngBotReEnableTimer = null;
        this.rngMovementUpgrades = 1;
        this.cost = 10;
    }

    manualMovementCancelRngBot() {
        clearInterval(this.rngBotMoveInterval);
        this.disableRngBot();
        this.rngBotMoveInterval = setTimeout(() => {
            this.enableRngBot();
        }, AUTO_RE_ENABLE_RNG_BOT_TIMER);
    }

    buyRngMovementUpgrade() {
        //TODO: can buy
        if (!this.game.points.canAffordPointsAmount(this.cost)) {
            return;
        }
        this.game.points.addPoints(-this.cost);
        this.cost *= COST_INCREASE_MULTIPLIER;
        
        $('#moveFaster').text('Move Faster: ' + parseFloat(this.cost).toFixed(2));
        
        this.rngMovementUpgrades++;
        this.enableRngBot();
    }

    moveRandomly() {
        const dir = this.chooseRandomDirection();
        this.game.maze.movePlayer(dir);
    }

    enableRngBot() {
        clearInterval(this.rngBotMoveInterval);
        this.rngBotMoveInterval = setInterval(() => {
            this.moveRandomly();
        }, this.getBotMoveInterval());
    }

    getBotMoveInterval() {
        console.log('upgrades: ' + this.rngMovementUpgrades);
        console.log(BASE_MOVEMENT_SPEED * (Math.pow(BASE_MOVEMENT_REDUCTION, this.rngMovementUpgrades)));
        return BASE_MOVEMENT_SPEED * (Math.pow(BASE_MOVEMENT_REDUCTION, this.rngMovementUpgrades));
    }

    disableRngBot() {
        clearInterval(this.rngBotMoveInterval);
    }

    chooseRandomDirection() {
        const validDirs = this.game.maze.getValidDirections();
        if (validDirs.length === 0) {
            return;
        }
        const randDirIndex = this.getRandomInt(validDirs.length);
        return validDirs[randDirIndex];
    }

    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }
}
