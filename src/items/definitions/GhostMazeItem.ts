import { MazeItemKey, GHOST_ITEM_SPAWN_PROBABILITY, GHOST_ITEM_STARTING_TILE_DISTANCE } from "constants/ItemConstants";
import Game from "managers/Game";
import MazeItem from "items/MazeItem";
import { Tile } from "managers/MazeManager";
import { StatsKey } from "models/Stats";


const BACKGROUND_IMAGE_PATH: string = 'img/ghost.png';

class GhostMazeItem extends MazeItem {
  constructor(game: Game, tile: Tile, mazeItemKey: MazeItemKey) {
    super(game, tile, mazeItemKey, BACKGROUND_IMAGE_PATH, StatsKey.TOTAL_GHOST_ITEMS_PICKED_UP);
  }

  public triggerPickup(playerId: number): void {
    super.triggerPickup(playerId);
    const player = this.game.players.getPlayer(playerId);
    if (player) {
      player.addGhostPathingDistance(GHOST_ITEM_STARTING_TILE_DISTANCE);
    }
  }
  
  public static getItemSpawnProbability(): number {
    return GHOST_ITEM_SPAWN_PROBABILITY;
  }
}

export default GhostMazeItem;
