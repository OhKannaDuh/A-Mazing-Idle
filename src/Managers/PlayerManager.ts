import { UpgradeKey } from "constants/UpgradeConstants";
import Game from "managers/Game";
import { Tile } from "managers/MazeManager";
import { isTileEqual } from "managers/MazeUtils";
import Player from "models/Player";

class PlayerManager {
  public game: Game;
  public playerMap: Map<number, Player>;

  constructor(game: Game) {
    this.game = game;
    this.playerMap = new Map<number, Player>();
  }

  public resetAllPlayers() {
    this.playerMap.clear();
  }

  public createDefaultPlayer() {
    this.createNewPlayerObj(this.game.maze.getGrid().internalStartTile);
  }

  public createNewPlayerObj(startTile, isPrimaryBot = false) {
    const newPlayer: Player = new Player(this.game, this.getNewPlayerId(), startTile, startTile, false, isPrimaryBot);
    this.playerMap.set(newPlayer.id, newPlayer);
    this.game.maze.updatePlayerTile(newPlayer.id, startTile)
    return newPlayer;
  }
  
  public getManuallyControlledPlayer(): Player {
    for (let [id, player] of this.playerMap) {
      if (player.isManuallyControlled) {
        return player;
      }
    }
    return null;
  }

  public getIsPlayerManuallyControlling(): boolean {
    return this.getManuallyControlledPlayer() == null ? false : true;
  }

  public getPlayerCount(isExcludeManualControl = false): number {
    // If manual controlling, don't count
    return this.playerMap.size - (isExcludeManualControl && this.getIsPlayerManuallyControlling() ? 1 : 0)    ;
  }

  private isPrimaryBotPresent(): boolean {
    return this.getPrimaryBot() == null ? false : true;
  }

  public getPrimaryBot(): Player {
    for (let [id, player] of this.playerMap) {
      if (player.isPrimaryBot) {
        return player;
      }
    }
    return null;
  }
  
  public movePlayer(playerId, dirVector, isManual=false): void {
    const player = this.getPlayer(playerId);
    
    if (player == null) return;
    if (!this.game.maze.canMove(player.currTile, dirVector, false, false, player.hasGhostItemActive())) {
      // If player can't move, ensure no destructible tiles are holding them
      this.game.maze.clearDestructibleTilesFromTile(player.currTile);
      return;
    }
    
    // Disable auto-move on current player
    player.isManuallyControlled = isManual;
    player.moveCount++;
    player.reduceSmartPathingDistance();

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

  public getPlayerIdList(): number[] {
    const playerIdArr = [];
    this.playerMap.forEach((player) => {
      playerIdArr.push(player.id);
    });
    return playerIdArr;
  }
  
  public getPlayerIdsAtTile(tile: Tile): number[] {
    const playerIdList = [];
    for (let [id, player] of this.playerMap) {
      if (isTileEqual(tile, player.currTile)) {
        playerIdList.push(player.id);
      }
    }
    return playerIdList;
  }

  private getNewPlayerId() {
    for (let i = 0;; i++) {
      if (!this.playerMap.has(i)) return i;
    }
  }

  public deletePlayer(playerId: number): void {
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
  private assignPrimaryBotToPlayer(playerId: number = null): void {
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

  public getPlayer(playerId): Player {
    if (!this.playerMap.has(playerId)) return null;
    return this.playerMap.get(playerId);
  }

  public getPlayerColorAtTile(tile: Tile): string {
    for (let player of this.playerMap.values()) {
      if (isTileEqual(tile, player.currTile)) {
        if (player.isManuallyControlled) {
          return this.game.colors.getPlayerColor();
        } else if (player.hasSmartPathingRemaining()) {
          return this.game.colors.getSmartPathingPlayerColor();
        } else if (player.hasMultiplierItemActive()) {
          return this.game.colors.getMultiplierItemPlayerColor();
        } else if (player.hasUnlimitedSplitItemActive()) {
          return this.game.colors.getUnlimitedSplitPlayerColor();
        } else {
          return this.game.colors.getBotColor();
        }
      }
    }
    return null;
  }

  public isOccupiedByPlayer(tile: Tile): boolean {
    for (let [id, player] of this.playerMap) {
      if (isTileEqual(tile, player.currTile)) {
        return true;
      }
    }
    return false;
  }
  
  public getPreviousTile(playerId: number): Tile {
    if (!this.playerMap.has(playerId)) return null;
    return this.getPlayer(playerId).prevTile;
  }

  public getCurrTile(playerId: number): Tile {
    if (!this.playerMap.has(playerId)) return null;
    return this.getPlayer(playerId).currTile;
  }

  public playerExists(playerId: number): boolean {
    return this.playerMap.has(playerId);
  }

  public playerHasSmartPathing(playerId: number): boolean {
    return this.game.players.getPlayer(playerId).smartPathingTileDistanceRemaining > 0;
  }
}

export default PlayerManager;
