import Game from "../Game";
import { Tile } from "../Maze";
import { DEFAULT_TILE_WIDTH_CSS, generateTileKey } from "../MazeGenerator";
import { StatsKey } from "../models/Stats";
import { MazeItemKey } from "./ItemConstants";


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

  public drawItem() {
    $(`#${this.tileKey}`).css("background-image", `url("${this.backgroundImagePath}")`);
    $(`#${this.tileKey}`).css("background-size", '22px');
  }

  protected removeItem() {
    $(`#${this.tileKey}`).css("background-size", "");
    $(`#${this.tileKey}`).css("background-image", "");
  }

  public triggerPickup(playerId: number) {
    this.removeItem();
    this.game.stats.addStatsToKey(1, this.pickUpStatsKey);
  }
}

export default MazeItem;
