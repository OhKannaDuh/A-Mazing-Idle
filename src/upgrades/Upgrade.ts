import { IS_FREE_MODE_ENABLED } from '../dev/devUtils';
import Game from '../Game';
import { StatsKey } from '../models/Stats';
import UserInterface from '../UserInterface';
import { UpgradeKey } from '../constants/UpgradeConstants';
declare var $: any;


class Upgrade {
  public game: Game;
  public upgradeKey: UpgradeKey;
  public uiId: string;
  public tooptipText: string;
  public upgradeLevel: number;
  public isSinglePurchase: boolean = false;

  public constructor(game: Game, uiId: string, tooltipText = '', upgradeKey: UpgradeKey, 
      upgradeCount: number = 0, isSinglePurchase: boolean = false) {
    this.game = game;
    this.upgradeKey = upgradeKey;
    this.uiId = uiId;
    this.tooptipText = tooltipText;
    this.upgradeLevel = upgradeCount;
    this.isSinglePurchase = isSinglePurchase;

    // this.updateUiProperties();
    // this.updateUiDisabled();
    this.initClickEvent();
  }

  buyUpgrade = () => {
    if (!this.canAffordToBuyUpgrade()) {
      console.error('Cannot afford to buy.');
      return;
    }
    this.game.points.spendPoints(this.getCost());
    this.upgradeLevel++;
    this.updateUiProperties();
    this.updateUiDisabled();
  }

  getIsUpgraded(): boolean {
    return this.upgradeLevel >= 1;
  }

  canAffordToBuyUpgrade(): boolean {
    return IS_FREE_MODE_ENABLED || this.getCost() <= this.game.points.points;
  }
  
  setUiText(text: string): void {
    $(`#${this.uiId}`).attr('title', this.tooptipText);
    $(`#${this.uiId}`).text(text);
  }

  updateUiDisabled() {
    $(`#${this.uiId}`).prop("disabled", this.isDisabled());
  }

  initClickEvent() {
    $(`#${this.uiId}`).click(() => this.buyUpgrade());
  }

  isDisabled(): boolean {
    return (this.isSinglePurchase && this.upgradeLevel >= 1) || this.isMaxUpgradeLevel();
  }
  
  updateUiProperties(): void {
    throw 'updateUiProperties must be implemented.';
  }

  getCost(): number {
    throw 'getCost must be implemented.';
  }

  isUnlocked(): boolean {
    return true;
  }

  prettyPrint(val): string {
    return UserInterface.getPrettyPrintNumberNoDecimals(val);
  }

  getPrettyPrintCost(): string {
    return this.prettyPrint(this.getCost());
  }

  isMaxUpgradeLevel(): boolean {
    return false;
  }
}

export default Upgrade;