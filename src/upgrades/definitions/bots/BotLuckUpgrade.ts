import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { BOT_LUCKY_GUESS_UPGRADE_BASE_COST, BOT_LUCKY_GUESS_UPGRADE_BASE_COST_MULTIPLIER, BOT_LUCKY_GUESS_UPGRADE_INCREASE_AMOUNT, UpgradeKey, UpgradeType } from "constants/UpgradeConstants";

const BUTTON_UI_ID = 'buyBotLuckyGuess';
const TOOLTIP_TEXT = `When bot is faced with a choice of direction, the bot will be lucky in guessing direction by an extra ${BOT_LUCKY_GUESS_UPGRADE_INCREASE_AMOUNT*100}% (ie. 51%/49% of choosing correct direction at level 1).`;

export class BotLuckyGuessUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, UpgradeType.BOT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  public updateUiProperties(): void {
    this.setUiText(`Bot Lucky Guess (${this.upgradeLevel}%): ${this.getPrettyPrintCost()} pts`);
  }

  public getCost(): number {
    return BOT_LUCKY_GUESS_UPGRADE_BASE_COST * Math.pow(BOT_LUCKY_GUESS_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
  }

  public static getLuckyGuessIncreasePercentage(game: Game): number {
    return game.upgrades.getUpgradeLevel(UpgradeKey.BOT_LUCKY_GUESS) * BOT_LUCKY_GUESS_UPGRADE_INCREASE_AMOUNT;
  }
}
