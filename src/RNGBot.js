
const BASE_MOVEMENT_SPEED = 1000;
const BASE_MOVEMENT_REDUCTION = 0.98;
const AUTO_RE_ENABLE_RNG_BOT_TIMER = 3000;

const DEV_MODE_MOVEMENT_SPEED = 1;


class RNGBot {
  constructor(game, isDevMode) {
    this.game = game;
    this.isDevMode = isDevMode;
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
    if (!dir) {
      return;
    }
    this.game.maze.movePlayer(dir);
  }

  enableRngBot() {
    let upgradeSpeed = this.game.points.rngMovementSpeedUpgrades;
    clearInterval(this.rngBotMoveInterval);
    
    this.rngBotMoveInterval = setInterval(() => {
      this.moveRandomly();
      if (upgradeSpeed !== this.game.points.rngMovementSpeedUpgrades) {
        this.disableRngBot();
        this.enableRngBot();
      }
    }, this.getBotMoveInterval(this.isDevMode));
  }

  getBotMoveInterval(isDevMode = false) {
    if (isDevMode) return DEV_MODE_MOVEMENT_SPEED;
    return BASE_MOVEMENT_SPEED * (Math.pow(BASE_MOVEMENT_REDUCTION, this.game.points.rngMovementSpeedUpgrades));
  }

  disableRngBot() {
    clearInterval(this.rngBotMoveInterval);
  }

  chooseRandomDirection() {
    const validDirs = this.chooseDirection();
    if (!validDirs) {
      return;
    }
    const randDirIndex = this.getRandomInt(validDirs.length);
    return validDirs[randDirIndex];
  }

  chooseDirection() {
    let validDirs = this.game.maze.getValidDirections();
    if (validDirs.length === 0) {
      return;
    }

    if (this.game.points.rngBotAutoExitMaze) {
      const exitDirsArr = this.game.maze.filterPlayerExitMazeDirection();
      if (exitDirsArr.length > 0) {
        return exitDirsArr;
      }
    }

    if (this.game.points.rngBotRememberDeadEndTilesUpgrades >= 1) {
      validDirs = this.game.maze.filterDeadEndTiles(validDirs);
    }
    
    // Prioritize any adjacent unvisited tiles if any.
    if (this.game.points.rngBotPrioritizeUnvisited) {
      const unvisitedDirsArr = this.game.maze.prioritizeUnvisitedDirection(validDirs);
      if (unvisitedDirsArr.length > 0) {
        return unvisitedDirsArr;
      }
    }

    // Avoid revisiting the last position if possible.
    if (this.game.points.rngBotAvoidRevisitLastPosition) {
      const noRevisitDirs = this.game.maze.filterAvoidRevisitLastPosition(validDirs);
      if (noRevisitDirs.length > 0) {
        return noRevisitDirs;
      }
    }
    
    // No fancy moves, just choose random ones.
    return validDirs;
  }

  getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
