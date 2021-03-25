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

interface SliceRange {
  start_percent: number;
  end_percent: number;
}


class MazeItemManager {
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
      if (this.isMazeItemUnlocked) {
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
      return MultiplierMazeItem.getItemSpawnProbability(this.game);
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
      this.applyItemToExtraBots(mazeItem, playerId);
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

  public getItemUseExtraBotUpgradeCount(itemKey: MazeItemKey): number {
    if (itemKey === MazeItemKey.UNLIMITED_SPLITS) {
      return this.game.upgrades.getUpgradeLevel(UpgradeKey.UNLIMITED_SPLIT_ITEM_EXTRA_BOT);
    } else if (itemKey === MazeItemKey.MULTIPLIER) {
      return this.game.upgrades.getUpgradeLevel(UpgradeKey.MULTIPLIER_ITEM_EXTRA_BOT);
    }
    return 0;
  }
  
  public applyItemToExtraBots(mazeItem: MazeItem, playerId: number): void {
    let extraBotCount = this.getItemUseExtraBotUpgradeCount(mazeItem.mazeItemKey);
    if (extraBotCount === 0) {
      return;
    }

    // Get list of player id's (excluding current player).
    const playerIdList = this.game.players.getPlayerIdList().filter(pid => pid !== playerId);

    // Apply item to as many bots as possible based on upgrade level.
    for (let extraBotPlayerId of playerIdList) {
      const extraBotPlayer = this.game.players.getPlayer(extraBotPlayerId);
      //TODO: check if item is applied already!?!?!
      if (extraBotPlayer) {
        mazeItem.triggerPickup(extraBotPlayerId);
        extraBotCount--;
      }
      if (extraBotCount === 0) {
        return;
      }
    }
  }
}

export default MazeItemManager;
