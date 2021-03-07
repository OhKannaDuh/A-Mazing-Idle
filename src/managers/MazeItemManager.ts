import Game from "../Game";
import { generateTileKey } from "../MazeGenerator";
import MazeItem from "../items/MazeItem";
import { Tile } from "../Maze";
import FruitMazeItem from "../items/definitions/FruitMazeItem";
import { MazeItemKey } from "../constants/ItemConstants";
import BrainMazeItem from "../items/definitions/BrainMazeItem";
import MultiplierMazeItem from "../items/definitions/MultiplierMazeItem";
import BlackHoleMazeItem from "../items/definitions/BlackHoleMazeItem";

class MazeItemManager {
  public mazeItemMap: Map<string, MazeItem>;
  private game: Game;

  constructor(game: Game) {
    this.mazeItemMap = new Map<string, MazeItem>();
    this.game = game;
  }

  public generateMazeItems(mazeSizeX: number, mazeSizeY: number) {
    for (let mazeItemKey in MazeItemKey) {
      this.generateMazeItemDrops(mazeItemKey as MazeItemKey, mazeSizeX, mazeSizeY);
    }
  }
 
  public isMazeItemUnlocked(mazeItemKey: MazeItemKey) {
    return this.game.biomes.isMazeItemUnlocked(mazeItemKey);
  }

  public getMazeItemSpawnProbability(mazeItemKey: MazeItemKey) {
    if (mazeItemKey === MazeItemKey.FRUIT) {
      return FruitMazeItem.getFruitSpawnProbability(this.game);
    } else if (mazeItemKey === MazeItemKey.BRAIN) {
      return BrainMazeItem.getBrainSpawnProbability(this.game);
    } else if (mazeItemKey === MazeItemKey.MULTIPLIER) {
      return MultiplierMazeItem.getMultiplierItemSpawnProbability(this.game);
    } else if (mazeItemKey === MazeItemKey.BLACK_HOLE) {
      return BlackHoleMazeItem.getBlackHoleSpawnProbability();
    } else {
      console.error('Failed to create maze item of type.  No valid type: ' + mazeItemKey);
      return;
    }
  }

  public createMazeItem(tile: Tile, mazeItemKey: MazeItemKey) {
    const tileKey = generateTileKey(tile.x, tile.y);
    let mazeItem = null;
    if (mazeItemKey === MazeItemKey.FRUIT) {
      mazeItem = new FruitMazeItem(this.game, tile, mazeItemKey);
    } else if (mazeItemKey === MazeItemKey.BRAIN) {
      mazeItem = new BrainMazeItem(this.game, tile, mazeItemKey);
    } else if (mazeItemKey === MazeItemKey.MULTIPLIER) {
      mazeItem = new MultiplierMazeItem(this.game, tile, mazeItemKey);
    } else if (mazeItemKey === MazeItemKey.BLACK_HOLE) {
      mazeItem = new BlackHoleMazeItem(this.game, tile, mazeItemKey);
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

  public drawItem(tileKey: string): void {
    if (!this.hasMazeItem(tileKey)) return;
    this.getMazeItem(tileKey).drawItem();
  }
  
  public pickupItem(tileKey: string, playerId: number) {
    if (!tileKey || !this.hasMazeItem(tileKey)) return;
    this.mazeItemMap.get(tileKey).triggerPickup(playerId);
    this.mazeItemMap.delete(tileKey);
  }

  public generateMazeItemDrops(mazeItemKey: MazeItemKey, mazeSizeX: number, mazeSizeY: number): void {
    if (!this.isMazeItemUnlocked(mazeItemKey)) {
      return;
    }

    const spawnProb: number = this.game.items.getMazeItemSpawnProbability(mazeItemKey);
    
    //TODO: calculate global probability and assign randomly
    for (let y = 0; y < mazeSizeX; y++) {
      for (let x = 0; x < mazeSizeY; x++) {
        let rand = Math.random();
        if(rand < spawnProb) {
          const tile: Tile = { x: x, y: y };
          this.game.items.createMazeItem(tile, mazeItemKey);
        }
      }
    }
  }
}


export default MazeItemManager;
