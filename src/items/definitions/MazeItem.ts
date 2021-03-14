import { MazeItemKey } from "constants/ItemConstants";
import Game from "managers/Game";
import { Tile } from "managers/Maze";
import { generateTileKey } from "managers/MazeGenerator";
import { StatsKey } from "models/Stats";


class MazeItem {
  public mazeItemKey: MazeItemKey;
  public tile: Tile;
  public tileKey: string;
  public pickUpStatsKey: StatsKey;
  
  protected game: Game;
  private backgroundImagePath: string;

  constructor(game: Game, tile: Tile, mazeItemKey: MazeItemKey, backgroundImagePath: string, pickUpStatsKey: StatsKey) {
    this.game = game;
    this.tile = tile;
    this.tileKey = generateTileKey(tile.x, tile.y);
    this.mazeItemKey = mazeItemKey;
    this.backgroundImagePath = backgroundImagePath;
    this.pickUpStatsKey = pickUpStatsKey;
  }

  public getBackgroundImagePath(): string {
    return this.backgroundImagePath;
  }

  public drawItem(): void {
    $(`#${this.tileKey}`).css("background-image", `url("${this.getBackgroundImagePath()}")`);
    $(`#${this.tileKey}`).css("background-repeat", `no-repeat`);
    $(`#${this.tileKey}`).css("background-position", `center`);
    $(`#${this.tileKey}`).css("background-size", '22px');
  }

  protected removeItem(): void {
    $(`#${this.tileKey}`).css("background-size", "");
    $(`#${this.tileKey}`).css("background-image", "");
  }

  public triggerPickup(playerId: number): void {
    this.removeItem();
    this.game.stats.addStatsToKey(1, this.pickUpStatsKey);
  }

  public static getItemSpawnProbability(game: Game): number {
    return 0;
  }
}

export default MazeItem;
