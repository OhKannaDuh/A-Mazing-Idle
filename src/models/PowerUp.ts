import Game from "managers/Game";
import { PowerUpKey, POWER_UP_TO_UI_KEY_MAP } from "constants/PowerUpConstants";
import { UserInterface } from "managers/UserInterface";
import { StatsKey } from "./Stats";
import { DEBUG_ALL_BUTTONS_VISIBLE } from "dev/devUtils";

const UI_UPDATE_INTERVAL = 100;

export class PowerUp {
  protected game: Game;
  private powerUpKey: PowerUpKey;
  private activateStatsKey: StatsKey;
  private _isPowerUpActive: boolean;
  private _isPowerUpOnCoolDown: boolean;
  private activateTimer: any; 
  private activateDurationCounterMs: number;
  private cooldownTimer: any;
  private cooldownDurationCounterMs: number;
  private uiUpdateTimer: any;

  constructor(game: Game, powerUpKey: PowerUpKey, activateStatsKey: StatsKey) {
    this.game = game;
    this.powerUpKey = powerUpKey;
    this.activateStatsKey = activateStatsKey;
    this.resetAllTimers();
    this.initClick();
  }

  public static getCooldownTimerDuration(game: Game): number {
    throw `No duration set for powerup.`;
  }

  public static getActivateDuration(game: Game): number {
    throw `No duration set for powerup.`;
  }
  
  protected getUiStringName(): string {
    throw `No power up string name for powerup ${this.powerUpKey}`;
  }

  public isPowerUpActiveOnPlayerId(playerId: number): boolean {
    return this.isPowerUpActive();
  }

  public getUiStatusString(): string {
    if (this._isPowerUpActive) {
      return `ACTIVE: ${this.formatDisplayString(this.getActivateTimeLeft())}`;
    } else if (this._isPowerUpOnCoolDown) {
      return `COOLDOWN: ${this.formatDisplayString(this.getCooldownTimeLeft())}`
    } else {
      return `READY`;
    }
  }

  public isPowerUpActive(): boolean {
    return this._isPowerUpActive;
  }

  private getUiHtml(): string {
    return `<div class="button_label text">${this.getUiStringName()}<br>${this.getUiStatusString()}</div>`;
  }

  private formatDisplayString(duration: number): string {
    return UserInterface.getDecimalPrettyPrintNumber(duration/1000, 1);
  }

  private getCooldownTimeLeft(): number {
    return this.game.powerUps.getPowerUpCooldownDuration(this.powerUpKey) - this.cooldownDurationCounterMs;
  }
  
  private getActivateTimeLeft(): number {
    return this.game.powerUps.getPowerUpActivateDuration(this.powerUpKey) - this.activateDurationCounterMs;
  }

  private resetAllTimers(updateUiAfter: boolean = false): void {
    this.resetActivateTimer();
    this.resetCooldownTimer();
    this.resetUiTimer(updateUiAfter);  
  }

  private resetUiTimer(updateUiAfter: boolean = false): void {
    clearInterval(this.uiUpdateTimer);
    this.uiUpdateTimer = null;
    if (updateUiAfter) {
      this.updateUi();
    }
  }
  
  private resetActivateTimer(): void {
    clearTimeout(this.activateTimer);
    this.activateTimer = null;
    this.activateDurationCounterMs = 0;
    this._isPowerUpActive = false;
  }

  private resetCooldownTimer(): void {
    clearTimeout(this.cooldownTimer);
    this.cooldownTimer = null;
    this.cooldownDurationCounterMs = 0;
    this._isPowerUpOnCoolDown = false;
  }
  
  public activatePowerUpTimer(): void {
    if (this.activateTimer) {
      return;
    }
    this.resetAllTimers();
    this._isPowerUpActive = true;
    this.activateUiTimer();
    
    this.activateTimer = setTimeout(() => {
      this._isPowerUpActive = false;
      this.activateCooldownTimer();
    }, this.game.powerUps.getPowerUpActivateDuration(this.powerUpKey));
  }

  private activateCooldownTimer(): void {
    if (this.cooldownTimer) {
      return;
    }
    this.resetAllTimers();
    this._isPowerUpOnCoolDown = true;
    this.activateUiTimer();
    
    this.cooldownTimer = setTimeout(() => {
      this._isPowerUpOnCoolDown = false;
      this.resetAllTimers();
      this.updateUi();
    }, this.game.powerUps.getPowerUpCooldownDuration(this.powerUpKey));
  }

  private activateUiTimer(): void {
    if (this.uiUpdateTimer) {
      return;
    }
    this.game.stats.addStatsToKey(1, this.activateStatsKey);
    this.updateUi();

    this.uiUpdateTimer = setInterval(() => {
      if (this._isPowerUpOnCoolDown) {
        this.cooldownDurationCounterMs += UI_UPDATE_INTERVAL;
      } else if (this._isPowerUpActive) {
        this.activateDurationCounterMs += UI_UPDATE_INTERVAL;
      }
      this.updateUi();
    }, UI_UPDATE_INTERVAL);
  }

  private isButtonDisabled(): boolean {
    return this._isPowerUpActive || this._isPowerUpOnCoolDown;
  }

  private isButtonVisible(): boolean {
    return this.game.powerUps.isPowerUpUnlocked(this.powerUpKey) || DEBUG_ALL_BUTTONS_VISIBLE;
  }

  private getUiElement(): any {
    return $(`#${this.getUiKey()}`);
  }

  private getUiKey(): string {
    return POWER_UP_TO_UI_KEY_MAP.get(this.powerUpKey);
  }

  public updateUi(): void {
    this.getUiElement().html(this.getUiHtml());
    this.getUiElement().prop('disabled', this.isButtonDisabled());
    this.getUiElement().css('display', this.isButtonVisible() ? 'block' : 'none')
  }

  private initClick(): void {
    this.getUiElement().unbind("click");
    this.getUiElement().click(() => this.activatePowerUpTimer());
  }
}
