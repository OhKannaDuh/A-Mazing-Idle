import { IS_FREE_MODE_ENABLED } from 'dev/devUtils';
import Game from 'managers/Game';
import { UserInterface } from 'managers/UserInterface';
import { UpgradeKey, UpgradeType } from 'constants/UpgradeConstants';
declare var $: any;


class Upgrade {
  public game: Game;
  public upgradeKey: UpgradeKey;
  public uiId: string;
  public tooptipText: string;
  public upgradeLevel: number;
  public isSinglePurchase: boolean = false;
  public upgradeType: UpgradeType;

  public constructor(game: Game, upgradeType: UpgradeType, uiId: string, tooltipText = '', upgradeKey: UpgradeKey, 
      upgradeCount: number = 0, isSinglePurchase: boolean = false) {
    this.game = game;
    this.upgradeType = upgradeType;
    this.upgradeKey = upgradeKey;
    this.uiId = uiId;
    this.tooptipText = tooltipText;
    this.upgradeLevel = upgradeCount;
    this.isSinglePurchase = isSinglePurchase;
    
    this.initClickEvent();
  }

  public buyUpgrade = () => {
    if (!this.canAffordToBuyUpgrade()) {
      console.error('Cannot afford to buy.');
      return;
    }
    const cost = this.getCost();
    this.upgradeLevel++;
    this.game.points.spendPoints(cost);
    this.updateUiProperties();
    this.updateUiDisabled();
    this.updateVisibility();
  }

  public getIsUpgraded(): boolean {
    return this.upgradeLevel >= 1;
  }

  public canAffordToBuyUpgrade(): boolean {
    return IS_FREE_MODE_ENABLED || this.getCost() <= this.game.points.points;
  }
  
  public setUiText(text: string): void {
    $(`#${this.uiId}`).attr('title', this.tooptipText);
    $(`#${this.uiId}`).html(`<div class='button_label'>${text}</div>`);
  }

  public updateVisibility(): void {
    $(`#${this.uiId}`).css('display',  (this.isUnlocked() && !this.isMaxUpgradeLevel()) ? 'block' : 'none');
  }

  public updateUiDisabled(): void {
    $(`#${this.uiId}`).prop("disabled", this.isDisabled());
  }

  public initClickEvent(): void {
    $(`#${this.uiId}`).unbind("click");
    $(`#${this.uiId}`).click(() => this.buyUpgrade());
  }

  public isDisabled(): boolean {
    //TODO: refactor out isSinglePurchase
    return this.isMaxUpgradeLevel() || !this.canAffordToBuyUpgrade();
  }
  
  public updateUiProperties(): void {
    throw 'updateUiProperties must be implemented.';
  }

  public getCost(): number {
    throw 'getCost must be implemented.';
  }

  public isUnlocked(): boolean {
    return this.game.biomes.isUpgradeUnlocked(this.upgradeKey);
  }

  public prettyPrint(val): string {
    return UserInterface.getPrettyPrintNumber(val);
  }

  public getPrettyPrintCost(): string {
    return this.prettyPrint(this.getCost());
  }

  public isMaxUpgradeLevel(): boolean {
    return this.isSinglePurchase && this.upgradeLevel >= 1;
  }
}

export default Upgrade;