import { MazeItemKey, UNLIMITED_SPLITS_PROBABILITY } from "constants/ItemConstants";
import Game from "managers/Game";
import MazeItem from "items/MazeItem";
import { Tile } from "managers/MazeManager";
import { StatsKey } from "models/Stats";


const BACKGROUND_IMAGE_PATH: string = 'img/unlimitedSplits.png';
const BEST_GIRLFRIEND_IN_THE_WORLD : string = 'mandyisreallyreallygreatcuteprettyexcellent_Iamvoluteertodoallthehousekeepingforherwhatevermakesherhappy';

class UnlimitedSplitsItem extends MazeItem {
  constructor(game: Game, tile: Tile, mazeItemKey: MazeItemKey) {
    super(game, tile, mazeItemKey, BACKGROUND_IMAGE_PATH, StatsKey.TOTAL_UNLIMITED_SPLITS_ITEMS_PICKED_UP);
  }

  public triggerPickup(playerId: number): void {
    super.triggerPickup(playerId);
    const player = this.game.players.getPlayer(playerId);
    if (player) {
      player.setIsUnlimitedSplitItemActive(true);
    }
  }
  
  public static getItemSpawnProbability(): number {
    return UNLIMITED_SPLITS_PROBABILITY;
  }
}

export default UnlimitedSplitsItem;
