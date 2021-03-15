import Game from "managers/Game";
import { Tile } from "managers/MazeManager";
import { getRandomMazeTile } from "managers/MazeUtils";
import { StatsKey } from "models/Stats";
import { BLACK_HOLE_ITEM_SPAWN_BASE_PROBABILITY, MazeItemKey } from "constants/ItemConstants";
import MazeItem from "items/MazeItem";

const BACKGROUND_IMAGE_PATH: string = 'img/blackHole.png';

class BlackHoleMazeItem extends MazeItem {
  constructor(game: Game, tile: Tile, mazeItemKey: MazeItemKey) {
    super(game, tile, mazeItemKey, BACKGROUND_IMAGE_PATH, StatsKey.TOTAL_BLACK_HOLE_ITEMS_PICKED_UP);
  }

  public triggerPickup(playerId: number): void {
    super.triggerPickup(playerId);
    const newTile = getRandomMazeTile(this.game);
    this.game.maze.updatePlayerTile(playerId, newTile);
  }
  
  public static getItemSpawnProbability(game: Game): number {
    return BLACK_HOLE_ITEM_SPAWN_BASE_PROBABILITY;
  }
}

export default BlackHoleMazeItem;
