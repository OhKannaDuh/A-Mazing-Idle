import Game from "managers/Game";
import { Tile } from "managers/MazeManager";


class Player {
  private game: Game;
  public id: number;
  public currTile: Tile;
  public prevTile: Tile;
  public isManuallyControlled: boolean;
  public moveCount: number;
  public isPrimaryBot: boolean;
  public smartPathingTileDistanceRemaining: number;
  public isMultiplierItemActive: boolean;
  public isUnlimitedSplitItemActive: boolean;
  public ghostItemTileDistanceRemaining: number;

  constructor(game: Game, id: number, currTile = null, prevTile = null, isManuallyControlled = false, 
      isPrimaryBot = false, moveCount = 0, smartPathingTileDistanceRemaining = 0, isMultiplierItemActive = false,
      isUnlimitedSplitItemActive = false, ghostItemTileDistanceRemaining = 0) {
    this.game = game;
    this.isManuallyControlled = isManuallyControlled;
    this.id = id;
    this.currTile = currTile;
    this.prevTile = prevTile;
    this.moveCount = moveCount;
    this.isPrimaryBot = isPrimaryBot;
    this.smartPathingTileDistanceRemaining = smartPathingTileDistanceRemaining;
    this.isMultiplierItemActive = isMultiplierItemActive;
    this.isUnlimitedSplitItemActive = isUnlimitedSplitItemActive;
    this.ghostItemTileDistanceRemaining = ghostItemTileDistanceRemaining;
  }

  hasSmartPathingRemaining(): boolean {
    return this.smartPathingTileDistanceRemaining > 0;
  }

  reduceSmartPathingDistance(distance = 1): void {
    this.smartPathingTileDistanceRemaining = Math.max(0, this.smartPathingTileDistanceRemaining - distance);
  }

  hasMultiplierItemActive(): boolean {
    return this.isMultiplierItemActive;
  }

  hasUnlimitedSplitItemActive(): boolean {
    return this.isUnlimitedSplitItemActive;
  }

  hasGhostItemActive(): boolean {
    return this.ghostItemTileDistanceRemaining > 0;
  }
  
  reduceGhostPathingDistance(distance = 1): void {
    this.ghostItemTileDistanceRemaining = Math.max(0, this.ghostItemTileDistanceRemaining - distance);
  }
}

export default Player;
