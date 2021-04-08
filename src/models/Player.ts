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
  public isUnlimitedSplitItemActive: boolean;
  public ghostItemTileDistanceRemaining: number;

  constructor(game: Game, id: number, currTile = null, prevTile = null, isManuallyControlled = false, 
      moveCount = 0, smartPathingTileDistanceRemaining = 0,
      isUnlimitedSplitItemActive = false, ghostItemTileDistanceRemaining = 0) {
    this.game = game;
    this.isManuallyControlled = isManuallyControlled;
    this.id = id;
    this.currTile = currTile;
    this.prevTile = prevTile;
    this.moveCount = moveCount;
    this.smartPathingTileDistanceRemaining = smartPathingTileDistanceRemaining;
    this.isUnlimitedSplitItemActive = isUnlimitedSplitItemActive;
    this.ghostItemTileDistanceRemaining = ghostItemTileDistanceRemaining;
  }

  public hasSmartPathingRemaining(): boolean {
    return this.smartPathingTileDistanceRemaining > 0;
  }

  public reduceSmartPathingDistance(distance: number = 1): void {
    this.smartPathingTileDistanceRemaining = Math.max(0, this.smartPathingTileDistanceRemaining - distance);
  }

  public isMultiplierPowerUpActive(): boolean {
    return this.game.powerUps.isPowerUpActive(PowerUpKey.POINTS_MULTIPLIER);
  }

  public hasUnlimitedSplitItemActive(): boolean {
    return this.isUnlimitedSplitItemActive;
  }

  public hasGhostItemActive(): boolean {
    return this.ghostItemTileDistanceRemaining > 0;
  }
  
  public reduceGhostPathingDistance(distance: number = 1): void {
    this.ghostItemTileDistanceRemaining = Math.max(0, this.ghostItemTileDistanceRemaining - distance);
  }
}

export default Player;
