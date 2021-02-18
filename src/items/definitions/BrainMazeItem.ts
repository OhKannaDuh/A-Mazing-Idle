import Game from "../../Game";
import { Tile } from "../../Maze";
import { UpgradeKey } from "../../upgrades/UpgradeConstants";
import { BRAIN_SPAWN_BASE_PROBABILITY, BRAIN_STARTING_TILE_DISTANCE, MazeItemKey } from "../ItemConstants";
import MazeItem from "../MazeItem";

const BACKGROUND_IMAGE_PATH: string = 'img/brain.png';


class BrainMazeItem extends MazeItem {
  constructor(game: Game, tile: Tile, mazeItemKey: MazeItemKey) {
    super(game, tile, mazeItemKey, BACKGROUND_IMAGE_PATH);
  }

  public triggerPickup(playerId: number): void {
    super.triggerPickup(playerId);

    if (!this.game.players.playerMap.has(playerId)) return;
    const tileDistance = this.getBrainTileDistanceAmount();
    this.game.players.getPlayer(playerId).smartPathingTileDistanceRemaining += tileDistance;
  }
  
  private getBrainTileDistanceAmount(): number {
    return BRAIN_STARTING_TILE_DISTANCE;
  }

  public static getBrainSpawnProbability(game: Game): number {
    // 1% increase per upgrade
    const upgradeLevel = game.upgrades.getUpgradeLevel(UpgradeKey.BRAIN_SPAWN);
    return BRAIN_SPAWN_BASE_PROBABILITY * (1 + upgradeLevel);
  }

  public static generateBrainItemDrops(game: Game, sizeX: number, sizeY: number) {
    const spawnProb: number = BrainMazeItem.getBrainSpawnProbability(game);

    //TODO: calculate global probability and assign randomly
    for (let y = 0; y < sizeY; y++) {
      for (let x = 0; x < sizeX; x++) {
        let rand = Math.random();
        if(rand < spawnProb) {
          const tile: Tile = { x: x, y: y };
          game.items.createMazeItem(tile, MazeItemKey.BRAIN);
        }
      }
    }
  }
}

export default BrainMazeItem;
