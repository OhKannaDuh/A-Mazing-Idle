
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
        const validDirs = this.chooseDirection();
        
        const randDirIndex = this.getRandomInt(validDirs.length);
        return validDirs[randDirIndex];
    }

    chooseDirection() {
        let validDirs = this.game.maze.getValidDirections();
        if (validDirs.length === 0) {
            return;
        }
        
        // Prioritize any adjacent unvisited tiles if any.
        if (this.game.points.rngBotPrioritizeUnvisited) {
            const unvisitedDirsArr = this.prioritizeUnvisitedDirection(validDirs);
            if (unvisitedDirsArr.length > 0) {
                return unvisitedDirsArr;
            }
        }

        // Avoid revisiting the last position if possible.
        if (this.game.points.rngBotAvoidRevisitLastPosition) {
            const noRevisitDirs = this.filterAvoidRevisitLastPosition(validDirs);
            if (noRevisitDirs.length > 0) {
                return noRevisitDirs;
            }
        }
        
        // No fancy moves, just choose random ones.
        return validDirs;
    }

    filterAvoidRevisitLastPosition(validDirs) {
        // Find any unvisited tiles within reach.
        const noRevisitDirsArr = validDirs.filter((dir) => {
            const previousTile = this.game.maze.getPreviousTile();
            const newTile = this.game.maze.getNewTilePositionByVector(dir);
            return newTile.x !== previousTile.x || newTile.y !== previousTile.y;
        });
        return noRevisitDirsArr;
    }

    prioritizeUnvisitedDirection(validDirs) {
        // Find any unvisited tiles within reach.
        const unvisitedDirsArr = validDirs.filter((dir) => {
            const newTile = this.game.maze.getNewTilePositionByVector(dir);
            return !this.game.maze.isVisited(newTile.x, newTile.y);
        });
        return unvisitedDirsArr;
    }

    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }
}
