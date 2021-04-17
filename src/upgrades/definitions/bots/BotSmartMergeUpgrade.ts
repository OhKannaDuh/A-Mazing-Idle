import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { BOT_SMART_MERGE_UPGRADE_COST, UpgradeKey, UpgradeType } from "constants/UpgradeConstants";

const BUTTON_UI_ID = 'buyBotSmartMergeUpgrade';
const TOOLTIP_TEXT = 'When a bot merge occurs, the resulting direction of the bot will be away from deadends.';

export class BotSmartMergeUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, UpgradeType.BOT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true);
  }
  
  public updateUiProperties(): void {
    this.setUiText(`Bot Smart Merge: ${this.getPrettyPrintCost()} pts`);
  }

  public getCost(): number {
    return BOT_SMART_MERGE_UPGRADE_COST;
  }

  public getPreReqUpgradeKeys(): UpgradeKey[] {
    return [UpgradeKey.BOT_SPLIT_BOT_AUTO_MERGE];
  }
}
