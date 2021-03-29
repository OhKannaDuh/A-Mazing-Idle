import { MazeItemKey } from "constants/ItemConstants";
import { UpgradeKey } from "constants/UpgradeConstants";
import Game from "managers/Game";
import UnlimitedSplitsItem from "items/definitions/UnlimitedSplitsItem";
import BlackHoleMazeItem from "items/definitions/BlackHoleMazeItem";
import BrainMazeItem from "items/definitions/BrainMazeItem";
import FruitMazeItem from "items/definitions/FruitMazeItem";
import MultiplierMazeItem from "items/definitions/MultiplierMazeItem";
import GhostMazeItem from "items/definitions/GhostMazeItem";
import MazeItem from "items/MazeItem";
import { Tile } from "managers/MazeManager";
import { MazeCell } from "models/MazeCell";


export class MazeItemManager {
  private game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  public isMazeItemUnlocked(mazeItemKey: MazeItemKey) {
    return this.game.biomes.isMazeItemUnlocked(mazeItemKey);
  }

  private getAllUnlockedMazeItemKeys(): MazeItemKey[] {
    const unlockedMazeItemKeys: MazeItemKey[] = [];
    for (let mazeItemKey in MazeItemKey) {
      if (this.isMazeItemUnlocked(mazeItemKey as MazeItemKey)) {
        unlockedMazeItemKeys.push(mazeItemKey as MazeItemKey);
      }
    }
    return unlockedMazeItemKeys;
  }

  private getMazeItemSpawnProbability(mazeItemKey: MazeItemKey) {
    if (mazeItemKey === MazeItemKey.FRUIT) {
      return FruitMazeItem.getItemSpawnProbability(this.game);
    } else if (mazeItemKey === MazeItemKey.BRAIN) {
      return BrainMazeItem.getItemSpawnProbability(this.game);
    } else if (mazeItemKey === MazeItemKey.MULTIPLIER) {
      return 0;
    } else if (mazeItemKey === MazeItemKey.BLACK_HOLE) {
      return BlackHoleMazeItem.getItemSpawnProbability(this.game);
    } else if (mazeItemKey === MazeItemKey.UNLIMITED_SPLITS) {
      return UnlimitedSplitsItem.getItemSpawnProbability();
    } else if (mazeItemKey === MazeItemKey.GHOST) {
      return GhostMazeItem.getItemSpawnProbability();
    } else {
      console.error('Failed to create maze item of type.  No valid type: ' + mazeItemKey);
      return 0;
    }
  }

  private getRandomlySpawnedMazeItemKey() {
    const randomNumber = Math.random();
    let totalProb: number = 0;
    const unlockedMazeItemKeys = this.getAllUnlockedMazeItemKeys();

    for (const mazeItemKey of unlockedMazeItemKeys) {
      totalProb += this.getMazeItemSpawnProbability(mazeItemKey as MazeItemKey);
      if (randomNumber < totalProb) {
        return mazeItemKey as MazeItemKey;
      }
    }
    return null;
  }

  public createMazeItem(tile: Tile, mazeItemKey: MazeItemKey) {
    let mazeItem = null;
    if (mazeItemKey === MazeItemKey.FRUIT) {
      mazeItem = new FruitMazeItem(this.game, tile, mazeItemKey);
    } else if (mazeItemKey === MazeItemKey.BRAIN) {
      mazeItem = new BrainMazeItem(this.game, tile, mazeItemKey);
    } else if (mazeItemKey === MazeItemKey.MULTIPLIER) {
      mazeItem = new MultiplierMazeItem(this.game, tile, mazeItemKey);
    } else if (mazeItemKey === MazeItemKey.BLACK_HOLE) {
      mazeItem = new BlackHoleMazeItem(this.game, tile, mazeItemKey);
    } else if (mazeItemKey === MazeItemKey.UNLIMITED_SPLITS) {
      mazeItem = new UnlimitedSplitsItem(this.game, tile, mazeItemKey);
    } else if (mazeItemKey === MazeItemKey.GHOST) {
      mazeItem = new GhostMazeItem(this.game, tile, mazeItemKey);
    } else {
      console.error('Failed to create maze item of type.  No valid type: ' + mazeItemKey);
      return;
    }

    if (this.hasMazeItem(tile)) {
      console.error('Cannot create item. Tile is already occupied.');
      return;
    }

    // Apply item to grid cell
    const mazeCell = this.game.maze.getGrid().getCell(tile);
    if (mazeCell) {
      mazeCell.setMazeItem(mazeItem); 
    }
  }
  
  public getMazeItem(tile: Tile): MazeItem {
    if (!this.hasMazeItem(tile)) return null;
    return this.game.maze.getGrid().getCell(tile).getMazeItem();
  }

  public hasMazeItem(tile: Tile): boolean {
    const mazeCell = this.game.maze.getGrid().getCell(tile);
    return mazeCell != null && mazeCell.hasMazeItem();
  }

  public drawItem(tile: Tile): void {
    if (!this.hasMazeItem(tile)) return;
    this.getMazeItem(tile).drawItem();
  }
  
  public pickupItem(tile: Tile, playerId: number) {
    if (!tile || !this.hasMazeItem(tile)) return;
    
    const mazeCell = this.game.maze.getGrid().getCell(tile);
    if (mazeCell) {
      const mazeItem = mazeCell.getMazeItem();
      mazeItem.triggerPickup(playerId);
      //TODO: decide if we want this.
      // this.applyItemToAllBots(mazeItem, playerId);
      mazeCell.deleteItem();
    }
  }

  public generateMazeItems(): void {
    const cellList: MazeCell[] = this.game.maze.getGrid().getAllCells();
    
    for (const cell of cellList) {
      // Spawn items randomly
      const mazeItemKey: MazeItemKey = this.getRandomlySpawnedMazeItemKey();
      if(mazeItemKey) {
        this.game.items.createMazeItem(cell.getTile(), mazeItemKey);
      }
    }
  }
  
  private applyItemToAllBots(mazeItem: MazeItem, playerId: number): void {
    const playerIdList = this.game.players.getPlayerIdList().filter(pid => pid !== playerId);

    // Apply item to as many bots as possible based on upgrade level.
    for (let extraBotPlayerId of playerIdList) {
      mazeItem.triggerPickup(extraBotPlayerId);
    }
  }
}
