
var BASE_MOVEMENT_SPEED = 1000;
var BASE_MOVEMENT_REDUCTION = 0.9;

var AUTO_RE_ENABLE_RNG_BOT_TIMER = 3000;

class RNGBot {
    constructor(game) {
        this.game = game;
        this.rngBotMoveInterval = null;
        this.rngBotReEnableTimer = null;
    }

    manualMovementCancelRngBot() {
        clearInterval(this.rngBotMoveInterval);
        this.disableRngBot();
        this.rngBotMoveInterval = setTimeout(() => {
            this.enableRngBot();
        }, AUTO_RE_ENABLE_RNG_BOT_TIMER);
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
        return BASE_MOVEMENT_SPEED * (Math.pow(BASE_MOVEMENT_REDUCTION, this.game.points.rngMovementSpeedUpgrades));
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
