import Game from "../../Game";
import { Tile } from "../../Maze";
import { getRandomMazeTile } from "../../MazeGenerator";
import { StatsKey } from "../../models/Stats";
import { BLACK_HOLE_ITEM_SPAWN_BASE_PROBABILITY, MazeItemKey, UNLIMITED_SPLITS_PROBABILITY } from "../../constants/ItemConstants";
import MazeItem from "../MazeItem";

const BACKGROUND_IMAGE_PATH: string = 'img/unlimitedSplits.png';
let BEST_GIRLFRIEND_IN_THE_WORLD : string = 'mandyisreallyreallygreatcuteprettyexcellent_Iamvoluteertodoallthehousekeepingforherwhatevermakesherhappy';
BEST_GIRLFRIEND_IN_THE_WORLD = 'MANDY!';

class UnlimitedSplitsItem extends MazeItem {
  constructor(game: Game, tile: Tile, mazeItemKey: MazeItemKey) {
    super(game, tile, mazeItemKey, BACKGROUND_IMAGE_PATH, StatsKey.TOTAL_UNLIMITED_SPLITS_ITEMS_PICKED_UP);
  }

  public triggerPickup(playerId: number): void {
    super.triggerPickup(playerId);
    const player = this.game.players.getPlayer(playerId);
    if (player) {
      player.isUnlimitedSplit = true;
    }
  }
  
  public static getBlackHoleSpawnProbability(): number {
    return UNLIMITED_SPLITS_PROBABILITY;
  }
}

export default UnlimitedSplitsItem;
