import Game from "../Game";
import { Tile } from "../Maze";
import { DEFAULT_TILE_WIDTH_CSS, generateTileKey } from "../MazeGenerator";
import { MazeItemKey } from "./ItemConstants";


class MazeItem {
  public mazeItemKey: MazeItemKey;
  public tile: Tile;
  public tileKey: string;
  
  protected game: Game;
  private backgroundImagePath: string;

  constructor(game: Game, tile: Tile, mazeItemKey: MazeItemKey, backgroundImagePath: string) {
    this.game = game;
    this.tile = tile;
    this.tileKey = generateTileKey(tile.x, tile.y);
    this.mazeItemKey = mazeItemKey;
    this.backgroundImagePath = backgroundImagePath;
  }

  public drawItem() {
    $(`#${this.tileKey}`).css("background-image", `url("${this.backgroundImagePath}")`);
    $(`#${this.tileKey}`).css("background-size", '22px');
  }

  protected removeItem() {
    $(`#${this.tileKey}`).css("background-size", "");
  }

  public triggerPickup(playerId: number) {
    this.removeItem();
  }
}

export default MazeItem;
