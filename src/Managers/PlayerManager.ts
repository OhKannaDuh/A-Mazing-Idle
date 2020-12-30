import Game from "../Game";
import { STARTING_POSITION } from "../Maze";
import Player from "../models/Player";
import { UpgradeKey } from "../upgrades/UpgradeConstants";
import { isTileEqual, PLAYER_COLOR, RNG_BOT_COLOR } from "./MazeGenerator";

class PlayerManager {
  public game: Game;
  public playerMap: Map<number, Player>;

  constructor(game: Game) {
    this.game = game;
    this.initDefaultValues();
  }
  
  initDefaultValues() {
    this.playerMap = new Map<number, Player>();
  }

  resetAllPlayers() {
    this.playerMap.clear();
  }

  createDefaultPlayer() {
    this.createNewPlayerObj(STARTING_POSITION);
  }

  createNewPlayerObj(startTile) {
    const newPlayer: Player = new Player(this.game, this.getNewPlayerId(), startTile, startTile);
    this.playerMap.set(newPlayer.id, newPlayer);
    this.game.maze.updatePlayerTile(newPlayer.id, startTile)
    return newPlayer;
  }
  
  getManuallyControlledPlayer(): Player {
    for (let [id, player] of this.playerMap) {
      if (player.isManuallyControlled) {
        return player;
      }
    }
    return null;
  }

  getIsPlayerManuallyControlling() {
    return this.getManuallyControlledPlayer() == null ? false : true;
  }

  getPlayerCount(isExcludeManualControl = false) {
    // If manual controlling, don't count
    return this.playerMap.size - (isExcludeManualControl && this.getIsPlayerManuallyControlling() ? -1 : 0)    
  }
  
  movePlayer(playerId, dirVector, isManual=false) {
    const player = this.getPlayer(playerId);
    if (player == null) return;
    if (!this.game.maze.canMove(player.currTile, dirVector)) {
      this.game.players.deletePlayer(playerId);
      return;
    }
    
    // Disable auto-move on current player
    player.isManuallyControlled = isManual;
    player.moveCount++;

    // Reset timer for auto-moves
    if (isManual) {
      if (this.game.upgrades.isUpgraded(UpgradeKey.PLAYER_MOVE_INDEPENDENTLY) && !this.getIsPlayerManuallyControlling()) {
        // Spawn new rng bot player
        this.createNewPlayerObj(this.getCurrTile(playerId));
      }
      // Set timer to re-enable bot if no movement after a few seconds
      this.game.rngBot.enableReEnableBotMovementTimer();
    }
    this.game.maze.updatePlayerTileByTileVector(playerId, dirVector);
  }

  getPlayerIdList() {
    const playerIdArr = [];
    this.playerMap.forEach((player) => {
      playerIdArr.push(player.id);
    })
    return playerIdArr;
  }

  getNewPlayerId() {
    for (let i = 0;; i++) {
      if (!this.playerMap.has(i)) return i;
    }
  }

  deletePlayer(playerId) {
    if (!this.playerMap.has(playerId)) return;

    const currTile = this.getPlayer(playerId).currTile;
    this.playerMap.delete(playerId);
    this.game.maze.setTileBackgroundColor(currTile, true);
  }

  getPlayer(playerId): Player {
    if (!this.playerMap.has(playerId)) return null;
    return this.playerMap.get(playerId);
  }
  
  getPlayerIdsAtTile(tile) {
    const playerIdList = [];
    for (let [id, player] of this.playerMap) {
      if (isTileEqual(tile, player.currTile)) {
        playerIdList.push(player.id);
      }
    }
    return playerIdList;
  }

  getPlayerAtTileColor(tile) {
    for (let [id, player] of this.playerMap) {
      if (isTileEqual(tile, player.currTile)) {
        return player.isManuallyControlled ? PLAYER_COLOR : RNG_BOT_COLOR;
      }
    }
    return null;
  }

  isOccupiedByPlayer(tile) {
    for (let [id, player] of this.playerMap) {
      if (isTileEqual(tile, player.currTile)) {
        return true;
      }
    }
    return false;
  }
  
  getPreviousTile(playerId) {
    if (!this.playerMap.has(playerId)) return;
    return this.getPlayer(playerId).prevTile;
  }

  getCurrTile(playerId) {
    if (!this.playerMap.has(playerId)) return;
    return this.getPlayer(playerId).currTile;
  }

  playerExists(playerId) {
    return this.playerMap.has(playerId);
  }
}

export default PlayerManager;