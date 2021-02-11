import Game from "../Game";
import { generateTileKey } from "../MazeGenerator";
import MazeItem from "../items/MazeItem";
import { Tile } from "../Maze";
import FruitMazeItem from "../items/definitions/FruitMazeItem";
import { MazeItemKey } from "../items/ItemConstants";
import BrainMazeItem from "../items/definitions/BrainMazeItem";


class MazeItemManager {
  public mazeItemMap: Map<string, MazeItem>;
  private game: Game;

  constructor(game: Game) {
    this.mazeItemMap = new Map<string, MazeItem>();
    this.game = game;
  }

  public createMazeItem(tile: Tile, mazeItemKey: MazeItemKey) {
    const tileKey = generateTileKey(tile.x, tile.y);
    let mazeItem = null;
    if (mazeItemKey === MazeItemKey.FRUIT) {
      mazeItem = new FruitMazeItem(this.game, tile, mazeItemKey);
    } else if (mazeItemKey === MazeItemKey.BRAIN) {
      mazeItem = new BrainMazeItem(this.game, tile, mazeItemKey);
    } else {
      console.error('Failed to create maze item of type.  No valid type: ' + mazeItemKey);
      return;
    }

    //TODO: create items in a single loop to dedupe.
    if (this.hasMazeItem(tileKey)) {
      console.error('Cannot create item. Tile is already occupied.');
      return;
    }

    this.mazeItemMap.set(tileKey, mazeItem);
  }
  
  public clearAllItems() {
    this.mazeItemMap = new Map<string, MazeItem>();
  }
  
  public getMazeItem(tileKey: string): MazeItem {
    if (!this.hasMazeItem(tileKey)) return null;
    return this.mazeItemMap.get(tileKey);
  }

  public hasMazeItem(tileKey: string): boolean {
    return this.mazeItemMap.has(tileKey);
  }

  //TODO: remove these accessors once we have es6 with the '?' operator.
  public drawItem(tileKey: string): void {
    if (!this.hasMazeItem(tileKey)) return;
    this.getMazeItem(tileKey).drawItem();
  }
  
  public pickupItem(tileKey: string, playerId: number) {
    if (!tileKey || !this.mazeItemMap.has(tileKey)) return;
    this.mazeItemMap.get(tileKey).triggerPickup(playerId);
    this.mazeItemMap.delete(tileKey);
  }
}


export default MazeItemManager;
