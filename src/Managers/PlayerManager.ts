import Game from "../Game";
import { STARTING_POSITION, Tile } from "../Maze";
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

  createNewPlayerObj(startTile, isPrimaryBot = false) {
    const newPlayer: Player = new Player(this.game, this.getNewPlayerId(), startTile, startTile, false, isPrimaryBot);
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

  getIsPlayerManuallyControlling(): boolean {
    return this.getManuallyControlledPlayer() == null ? false : true;
  }

  getPlayerCount(isExcludeManualControl = false): number {
    // If manual controlling, don't count
    return this.playerMap.size - (isExcludeManualControl && this.getIsPlayerManuallyControlling() ? 1 : 0)    ;
  }

  isPrimaryBotPresent(): boolean {
    return this.getPrimaryBot() == null ? false : true;
  }

  getPrimaryBot(): Player {
    for (let [id, player] of this.playerMap) {
      if (player.isPrimaryBot) {
        return player;
      }
    }
    return null;
  }
  
  movePlayer(playerId, dirVector, isManual=false): void {
    const player = this.getPlayer(playerId);
    if (player == null) return;
    if (!this.game.maze.canMove(player.currTile, dirVector)) {
      // Bots that get stuck in deadends.
      if (!isManual) {
        this.game.players.deletePlayer(playerId);
      }
      return;
    }
    
    // Disable auto-move on current player
    player.isManuallyControlled = isManual;
    player.moveCount++;

    // Reset timer for auto-moves
    if (isManual) {
      // Spawn new bot unless it exists already.
      if (this.game.upgrades.isUpgraded(UpgradeKey.PLAYER_MOVE_INDEPENDENTLY)) {
        if (!this.isPrimaryBotPresent()) {
          this.createNewPlayerObj(this.getCurrTile(playerId), true);
        }
        // If independence upgraded, don't re-enable the timer to have a bot take over.
        this.game.rngBot.disableReEnableBotMovementTimer();
      } else {
        // Only set the movement timer if independent movement disabled.
        this.game.rngBot.enableReEnableBotMovementTimer();
      }
    }
    this.game.maze.updatePlayerTileByTileVector(playerId, dirVector);
  }

  getPlayerIdList() {
    const playerIdArr = [];
    this.playerMap.forEach((player) => {
      playerIdArr.push(player.id);
    });
    return playerIdArr;
  }
  
  getPlayerIdsAtTile(tile: Tile): number[] {
    const playerIdList = [];
    for (let [id, player] of this.playerMap) {
      if (isTileEqual(tile, player.currTile)) {
        playerIdList.push(player.id);
      }
    }
    return playerIdList;
  }

  getNewPlayerId() {
    for (let i = 0;; i++) {
      if (!this.playerMap.has(i)) return i;
    }
  }

  deletePlayer(playerId: number): void {
    if (!this.playerMap.has(playerId)) return;

    const player = this.getPlayer(playerId);
    const currTile = player.currTile;
    this.playerMap.delete(playerId);

    // There must always be a primary bot.  Re-assign at random if primary bot deleted.
    if (player.isPrimaryBot) {
      this.assignPrimaryBotToPlayer();
    }
    this.game.maze.setTileBackgroundColor(currTile, true);
  }

  // Try to assign a new primary bot based on ID.  Else, pick first bot.
  assignPrimaryBotToPlayer(playerId: number = null): void {
    for (let [id, player] of this.playerMap) {
      if (playerId == null && !player.isManuallyControlled) {
        player.isPrimaryBot = true;
        return;
      }
      if (player.id === playerId) {
        player.isPrimaryBot = true;
        return;
      }
    }
  }

  getPlayer(playerId): Player {
    if (!this.playerMap.has(playerId)) return null;
    return this.playerMap.get(playerId);
  }

  getPlayerColorAtTile(tile: Tile): string {
    for (let [id, player] of this.playerMap) {
      if (isTileEqual(tile, player.currTile)) {
        return player.isManuallyControlled ? PLAYER_COLOR : RNG_BOT_COLOR;
      }
    }
    return null;
  }

  isOccupiedByPlayer(tile: Tile): boolean {
    for (let [id, player] of this.playerMap) {
      if (isTileEqual(tile, player.currTile)) {
        return true;
      }
    }
    return false;
  }
  
  getPreviousTile(playerId: number): Tile {
    if (!this.playerMap.has(playerId)) return null;
    return this.getPlayer(playerId).prevTile;
  }

  getCurrTile(playerId: number): Tile {
    if (!this.playerMap.has(playerId)) return null;
    return this.getPlayer(playerId).currTile;
  }

  playerExists(playerId: number): boolean {
    return this.playerMap.has(playerId);
  }
}

export default PlayerManager;
