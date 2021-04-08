import { UpgradeKey } from "constants/UpgradeConstants";
import Game from "managers/Game";
import { Tile, TileVector } from "managers/MazeManager";
import { isTileEqual } from "managers/MazeUtils";
import Player from "models/Player";

export class PlayerManager {
  public game: Game;
  public playerMap: Map<number, Player>;

  constructor(game: Game) {
    this.game = game;
    this.playerMap = new Map<number, Player>();
  }

  public resetAllPlayers(): void {
    this.playerMap.clear();
  }

  public createDefaultPlayer(): void {
    this.createNewPlayerObj(this.game.maze.getGrid().internalStartTile);
  }

  public createNewPlayerObj(startTile: Tile): Player {
    const newPlayer: Player = new Player(this.game, this.getNewPlayerId(), startTile, startTile, false);
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

  public getPlayerOrDefaultBotId(): number {
    const manualPlayer = this.getManuallyControlledPlayer();
    return manualPlayer
      ? manualPlayer.id
      : this.getFirstAutoBotId();
  }

  public getIsPlayerManuallyControlling(): boolean {
    return this.getManuallyControlledPlayer() == null ? false : true;
  }

  public getPlayerCount(isExcludeManualControl = false): number {
    // If manual controlling, don't count
    return this.playerMap.size - (isExcludeManualControl && this.getIsPlayerManuallyControlling() ? 1 : 0)    ;
  }

  private isAutoBotPresent(): boolean {
    // Check if any non-manual controlled 
    return this.getFirstAutoBot() != null;
  }

  public getFirstAutoBot(): Player {
    // Find first bot that is not manually controlled
    for (let [id, player] of this.playerMap) {
      if (!player.isManuallyControlled) {
        return player;
      }
    }
    return null;
  }

  public getFirstAutoBotId(): number {
    const bot = this.getFirstAutoBot();
    return bot ? bot.id : null;
  }
  
  public movePlayer(playerId: number, dirVector: TileVector, isManual: boolean = false): void {
    const player = this.getPlayer(playerId);
    
    if (player == null) {
      console.log('tried moving null player');
      return;
    }
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
        if (!this.isAutoBotPresent()) {
          this.createNewPlayerObj(this.getCurrTile(playerId));
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
    this.game.maze.setTileBackgroundColor(currTile, true);
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
        } else if (player.isMultiplierPowerUpActive()) {
          return this.game.colors.getMultiplierItemPlayerColor();
        } else if (player.hasUnlimitedSplitItemActive()) {
          return this.game.colors.getUnlimitedSplitPlayerColor();
        } else if (player.hasGhostItemActive()) {
          return this.game.colors.getGhostItemPlayerColor();
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
