import { DEBUG_ALL_BUTTONS_VISIBLE, IS_FREE_MODE_ENABLED } from 'dev/devUtils';
import Game from 'managers/Game';
import { UserInterface } from 'managers/UserInterface';
import { UpgradeKey, UpgradeType } from 'constants/UpgradeConstants';
declare var $: any;

const TOOLTIP_UI_ID_SUFFIX = "Tooltip";
const BUTTON_TEXT_UI_ID_SUFFIX = "Text";
const BUTTON_UI_ID_SUFFIX = "Button";
const NEW_TEXT_SUFFIX = "NewText";

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
    return this.isUnlocked() && this.upgradeLevel >= 1;
  }

  public canAffordToBuyUpgrade(): boolean {
    return IS_FREE_MODE_ENABLED || this.getCost() <= this.game.points.points;
  }
  
  public setUiText(text: string): void {
    // De-dupe UI text updates
    if (text === this.currentUiTextDeduper) return;
    this.currentUiTextDeduper = text;
    $(`#${this.getButtonTextUiId()}`).text(text);
  }

  private getButtonUiId(): string {
    return `${this.uiId}${BUTTON_UI_ID_SUFFIX}`;
  }
  private getButtonTextUiId(): string {
    return `${this.uiId}${BUTTON_TEXT_UI_ID_SUFFIX}`;
  }
  private getButtonTooltipUiId(): string {
    return `${this.uiId}${TOOLTIP_UI_ID_SUFFIX}`;
  }
  private getNewTextUiId(): string {
    return `${this.uiId}${NEW_TEXT_SUFFIX}`;
  }

  private initUiButton(): void {
    // Inject a button text + the span to be used as a tooltip
    // Wrapper div with: <new tag><button><button text><tooltip>
    const newText = `<p id='${this.getNewTextUiId()}' class='upgradeNewText'>New!</p>`;
    const buttonTextHtml = `<div id='${this.getButtonTextUiId()}' class='button_label'></div>`;
    const tooltipHtml = `<span id='${this.getButtonTooltipUiId()}' class='tooltip'>${this.tooltipText}</span>`;
    const button = `<button id='${this.getButtonUiId()}'>${buttonTextHtml}${tooltipHtml}</button>`;

    $(`#${this.uiId}`).html(`${newText}${button}`);
    $(`#${this.getButtonUiId()}`).hover(() => {
      // Start hover
      this.setVisibilityOfNewText(false);
      UserInterface.setIdVisible(this.getButtonTooltipUiId(), true);
    }, () => {
      // End-hover
      UserInterface.setIdVisible(this.getButtonTooltipUiId(), false);
    });
  }

  public setVisibilityOfNewText(setVisible: boolean): void {
    setVisible = setVisible && this.isUnlocked();
    $(`#${this.getNewTextUiId()}`).css("visibility", setVisible ? "visible" : "hidden");
  }

  public updateVisibility(): void {
    const setVisible = this.isUnlocked() && !this.isMaxUpgradeLevel() || DEBUG_ALL_BUTTONS_VISIBLE;
    $(`#${this.uiId}`).css("display", setVisible ? "flex" : "none");
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
    return this.game.biomes.isUpgradeUnlocked(this.upgradeKey) && this.isAllPrerequisiteUpgradesComplete() || DEBUG_ALL_BUTTONS_VISIBLE;
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

  public isAllPrerequisiteUpgradesComplete(): boolean {
    const prereqUpgradeKeys = this.getPreReqUpgradeKeys();
    return prereqUpgradeKeys.every(key => this.game.upgrades.isUpgraded(key));
  }

  public getPreReqUpgradeKeys(): UpgradeKey[] {
    return [];
  }
}

export default Upgrade;