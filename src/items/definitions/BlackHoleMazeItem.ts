import Game from "../../Game";
import { Tile } from "../../Maze";
import { getRandomMazeTile } from "../../MazeGenerator";
import { BLACK_HOLE_ITEM_SPAWN_BASE_PROBABILITY, MazeItemKey } from "../ItemConstants";
import MazeItem from "../MazeItem";

const BACKGROUND_IMAGE_PATH: string = 'img/blackHole.png';

// Note: This item will bypass destructible walls.
class BlackHoleMazeItem extends MazeItem {
  constructor(game: Game, tile: Tile, mazeItemKey: MazeItemKey) {
    super(game, tile, mazeItemKey, BACKGROUND_IMAGE_PATH);
  }

  public triggerPickup(playerId: number): void {
    //TODO: move player to somewhere or other.
    super.triggerPickup(playerId);
    const newTile = getRandomMazeTile(this.game);
    this.game.maze.updatePlayerTile(playerId, newTile);
  }
  
  public static getBlackHoleSpawnProbability(): number {
    return BLACK_HOLE_ITEM_SPAWN_BASE_PROBABILITY;
  }

  public static generateBlackHoleItemDrops(game: Game, sizeX: number, sizeY: number) {
    const spawnProb: number = BlackHoleMazeItem.getBlackHoleSpawnProbability();
    
    //TODO: calculate global probability and assign randomly
    for (let y = 0; y < sizeY; y++) {
      for (let x = 0; x < sizeX; x++) {
        let rand = Math.random();
        if(rand < spawnProb) {
          const tile: Tile = { x: x, y: y };
          game.items.createMazeItem(tile, MazeItemKey.BLACK_HOLE);
        }
      }
    }
  }
}

export default BlackHoleMazeItem;
