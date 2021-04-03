import { DEBUG_ALL_BUTTONS_VISIBLE, IS_FREE_MODE_ENABLED } from 'dev/devUtils';
import Game from 'managers/Game';
import { UserInterface } from 'managers/UserInterface';
import { UpgradeKey, UpgradeType } from 'constants/UpgradeConstants';
declare var $: any;

const TOOLTIP_UI_ID_SUFFIX = "Tooltip";
const BUTTON_TEXT_UI_ID_SUFFIX = "Text";

class Upgrade {
  public game: Game;
  public upgradeKey: UpgradeKey;
  public uiId: string;
  public tooltipText: string;
  public upgradeLevel: number;
  public isSinglePurchase: boolean = false;
  public upgradeType: UpgradeType;
  private currentUiTextDeduper: string;

  public constructor(game: Game, upgradeType: UpgradeType, uiId: string, tooltipText = '', upgradeKey: UpgradeKey, 
      upgradeCount: number = 0, isSinglePurchase: boolean = false) {
    this.game = game;
    this.upgradeType = upgradeType;
    this.upgradeKey = upgradeKey;
    this.uiId = uiId;
    this.tooltipText = tooltipText;
    this.upgradeLevel = upgradeCount;
    this.isSinglePurchase = isSinglePurchase;
    this.currentUiTextDeduper = null;
    
    this.initClickEvent();
    this.initUiButton();
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
    // De-dupe UI text updates
    if (text === this.currentUiTextDeduper) return;
    this.currentUiTextDeduper = text;
    $(`#${this.uiId + BUTTON_TEXT_UI_ID_SUFFIX}`).text(text);
  }

  private initUiButton(): void {
    // Inject a button text + the span to be used as a tooltip
    const buttonTextId = this.uiId + BUTTON_TEXT_UI_ID_SUFFIX;
    const tooltipId = this.uiId + TOOLTIP_UI_ID_SUFFIX;
    const tooltipHtml = `<span id='${tooltipId}' class='tooltip'>${this.tooltipText}</span>`;
    const textHtml = `<div id='${buttonTextId}' class='button_label'></div>`;
    $(`#${this.uiId}`).html(`${textHtml}${tooltipHtml}`);
  }

  public updateVisibility(): void {
    UserInterface.setIdVisible(this.uiId, this.isUnlocked() && !this.isMaxUpgradeLevel() || DEBUG_ALL_BUTTONS_VISIBLE);
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