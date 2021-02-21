import Game from "../../Game";
import { Tile } from "../../Maze";
import { UpgradeKey } from "../../upgrades/UpgradeConstants";
import { MazeItemKey, MULTIPLIER_ITEM_BASE_MULTIPLIER, MULTIPLIER_ITEM_SPAWN_BASE_PROBABILITY } from "../ItemConstants";
import MazeItem from "../MazeItem";

const BACKGROUND_IMAGE_PATH: string = 'img/multiplierItem.png';


class MultiplierMazeItem extends MazeItem {
  constructor(game: Game, tile: Tile, mazeItemKey: MazeItemKey) {
    super(game, tile, mazeItemKey, BACKGROUND_IMAGE_PATH);
  }

  public triggerPickup(playerId: number): void {
    super.triggerPickup(playerId);

    if (!this.game.players.playerMap.has(playerId)) return;
    this.game.players.getPlayer(playerId).isMultiplierItemActive = true;
  }

  public static getMazeItemMultiplierStrength(game: Game) {
    const upgradeLevel = game.upgrades.getUpgradeLevel(UpgradeKey.MULTIPLIER_ITEM_STRENGTH);
    return MULTIPLIER_ITEM_BASE_MULTIPLIER + (upgradeLevel);
  }
  
  public static getMultiplierItemSpawnProbability(game: Game): number {
    const upgradeLevel = game.upgrades.getUpgradeLevel(UpgradeKey.MULTIPLIER_ITEM_SPAWN_RATE);
    return MULTIPLIER_ITEM_SPAWN_BASE_PROBABILITY * (1 + upgradeLevel);
  }

  public static generateMazeItemDrops(game: Game, sizeX: number, sizeY: number) {
    const spawnProb: number = MultiplierMazeItem.getMultiplierItemSpawnProbability(game);
    //TODO: calculate global probability and assign randomly
    for (let y = 0; y < sizeY; y++) {
      for (let x = 0; x < sizeX; x++) {
        let rand = Math.random();
        if(rand < spawnProb) {
          const tile: Tile = { x: x, y: y };
          game.items.createMazeItem(tile, MazeItemKey.MULTIPLIER_ITEM);
        }
      }
    }
  }
}

export default MultiplierMazeItem;
