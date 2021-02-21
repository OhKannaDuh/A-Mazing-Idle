import Game from "../Game";
import { Tile } from "../Maze";


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

  constructor(game: Game, id: number, currTile = null, prevTile = null, isManuallyControlled = false, 
      isPrimaryBot = false, moveCount = 0, smartPathingTileDistanceRemaining = 0, isMultiplierItemActive = false) {
    this.game = game;
    this.isManuallyControlled = isManuallyControlled;
    this.id = id;
    this.currTile = currTile;
    this.prevTile = prevTile;
    this.moveCount = moveCount;
    this.isPrimaryBot = isPrimaryBot;
    this.smartPathingTileDistanceRemaining = smartPathingTileDistanceRemaining;
    this.isMultiplierItemActive = isMultiplierItemActive;
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
}

export default Player;
