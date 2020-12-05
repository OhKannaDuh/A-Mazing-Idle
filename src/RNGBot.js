
const BASE_MOVEMENT_SPEED = 1000;
const BASE_MOVEMENT_REDUCTION = 0.98;
const AUTO_RE_ENABLE_RNG_BOT_TIMER = 3000;

const DEV_MODE_MOVEMENT_SPEED = 1;


class RNGBot {
  constructor(game, isDevMode) {
    this.game = game;
    this.isDevMode = isDevMode;

    //TODO: make an object for each rngbot
    this.rngBotMap = new Map();
  }

  manualMovementCancelRngBot(playerId) {
    const rngBot = this.rngBotMap.get(playerId);
    
    this.disableRngBot(rngBot.id);
    clearInterval(rngBot.rngBotReEnableTimer);
    //TODO: we need to handle splitting in the future -- need another signal for this.
    if (this.game.maze.getPlayerCount() === 1) {
      rngBot.rngBotReEnableTimer = setTimeout(() => {
          this.enableRngBot(rngBot.id);
      }, AUTO_RE_ENABLE_RNG_BOT_TIMER);
    }
  }

  moveRandomly(playerId) {
    const dir = this.chooseRandomDirection(playerId);
    if (!dir) {
      return;
    }
    this.game.maze.movePlayer(playerId, dir);
  }

  enableRngBot(playerId) {
    if (!this.rngBotMap.has(playerId)) {
      this.rngBotMap.set(playerId, { id: playerId, rngBotMoveInterval: null, rngBotReEnableTimer: null });
    }
    const rngBot = this.rngBotMap.get(playerId);
    let upgradeSpeed = this.game.points.rngMovementSpeedUpgrades;
    
    clearInterval(rngBot.rngBotMoveInterval);
    
    rngBot.rngBotMoveInterval = setInterval(() => {
      this.moveRandomly(rngBot.id);
      if (upgradeSpeed !== this.game.points.rngMovementSpeedUpgrades) {
        this.disableRngBot(rngBot.id);
        this.enableRngBot(rngBot.id);
      }
    }, this.getBotMoveInterval(this.isDevMode));
  }

  getBotMoveInterval(isDevMode = false) {
    if (isDevMode) return DEV_MODE_MOVEMENT_SPEED;
    return BASE_MOVEMENT_SPEED * (Math.pow(BASE_MOVEMENT_REDUCTION, this.game.points.rngMovementSpeedUpgrades));
  }

  disableRngBot(playerId) {
    if (!this.rngBotMap.has(playerId)) return;
    clearInterval(this.rngBotMap.get(playerId).rngBotMoveInterval);
    this.rngBotMap.get(playerId).rngBotMoveInterval = null;
    clearInterval(this.rngBotMap.get(playerId).rngBotReEnableTimer);
    this.rngBotMap.get(playerId).rngBotReEnableTimer = null;
  }

  deleteAllRngBot() {
    for (let [id, bot] of this.rngBotMap) {
      this.disableRngBot(id);
    }
    this.rngBotMap.clear();
  }

  chooseRandomDirection(playerId) {
    const validDirs = this.chooseDirection(playerId);
    if (!validDirs) {
      return;
    }
    const randDirIndex = this.getRandomInt(validDirs.length);
    return validDirs[randDirIndex];
  }

  chooseDirection(playerId) {
    let validDirs = this.game.maze.getValidDirectionsByPlayerId(playerId);
    if (validDirs.length === 0) {
      return;
    }

    if (this.game.points.rngBotAutoExitMaze) {
      const exitDirsArr = this.game.maze.filterPlayerExitMazeDirection(playerId);
      if (exitDirsArr.length > 0) {
        return exitDirsArr;
      }
    }

    if (this.game.points.rngBotRememberDeadEndTilesUpgrades >= 1) {
      validDirs = this.game.maze.filterDeadEndTiles(playerId, validDirs);
    }
    
    // Prioritize any adjacent unvisited tiles if any.
    if (this.game.points.rngBotPrioritizeUnvisited) {
      const unvisitedDirsArr = this.game.maze.prioritizeUnvisitedDirection(playerId, validDirs);
      if (unvisitedDirsArr.length > 0) {
        return unvisitedDirsArr;
      }
    }

    // Avoid revisiting the last position if possible.
    if (this.game.points.rngBotAvoidRevisitLastPosition) {
      const noRevisitDirs = this.game.maze.filterAvoidRevisitLastPosition(playerId, validDirs);
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
