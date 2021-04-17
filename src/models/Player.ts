import { PowerUpKey } from "constants/PowerUpConstants";
import Game from "managers/Game";
import { Tile } from "managers/MazeManager";


class Player {
  private game: Game;
  public id: number;
  public currTile: Tile;
  public prevTile: Tile;
  public isManuallyControlled: boolean;
  public moveCount: number;
  public smartPathingTileDistanceRemaining: number;
  private _isUnlimitedSplitItemActive: boolean;
  private _ghostItemTileDistanceRemaining: number;
  private _isPathingFromDeadEnd: boolean;

  constructor(game: Game, id: number, currTile = null, prevTile = null) {
    this.game = game;
    this.id = id;
    this.currTile = currTile;
    this.prevTile = prevTile;
    this.moveCount = 0;
    this.smartPathingTileDistanceRemaining = 0;
    this._ghostItemTileDistanceRemaining = 0;
    this.isManuallyControlled = false;
    this._isUnlimitedSplitItemActive = false;
    this._isPathingFromDeadEnd = false;
  }

  public isSmartPathingActive(): boolean {
    return this.smartPathingTileDistanceRemaining > 0;
  }

  public reduceSmartPathingDistance(distance: number = 1): void {
    this.smartPathingTileDistanceRemaining = Math.max(0, this.smartPathingTileDistanceRemaining - distance);
  }

  public isMultiplierPowerUpActive(): boolean {
    return this.game.powerUps.isPowerUpActive(PowerUpKey.POINTS_MULTIPLIER);
  }

  public isUnlimitedSplitItemActive(): boolean {
    return this._isUnlimitedSplitItemActive;
  }

  public setIsUnlimitedSplitItemActive(setActive: boolean): void {
    this._isUnlimitedSplitItemActive = setActive;
  }

  public isGhostItemActive(): boolean {
    return this._ghostItemTileDistanceRemaining > 0;
  }
  
  public addGhostPathingDistance(distance: number): void {
    this._ghostItemTileDistanceRemaining = Math.max(0, this._ghostItemTileDistanceRemaining + distance);
  }

  public isPathingFromDeadEnd(): boolean {
    return this._isPathingFromDeadEnd;
  }

  public setIsPathingFromDeadEnd(isPathingFromDeadEnd: boolean): void {
    this._isPathingFromDeadEnd = isPathingFromDeadEnd;
  }

  public mergePlayerPassives(mergedPlayer: Player): void {
    if (mergedPlayer.isSmartPathingActive()) {
      this.smartPathingTileDistanceRemaining += mergedPlayer.smartPathingTileDistanceRemaining;
    }
    if (mergedPlayer.isGhostItemActive()) {
      this._ghostItemTileDistanceRemaining += mergedPlayer._ghostItemTileDistanceRemaining;
    }
    if (mergedPlayer.isUnlimitedSplitItemActive()) {
      this.setIsUnlimitedSplitItemActive(mergedPlayer.isUnlimitedSplitItemActive());
    }
  }
}

export default Player;
