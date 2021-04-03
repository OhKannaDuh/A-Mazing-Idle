import { PowerUpKey } from "constants/PowerUpConstants";
import Game from "managers/Game";
import { PowerUp } from "models/PowerUp";
import { PointsMultiplierPowerUp } from "powerUps/PointsMultiplierPowerUp"
import { SpeedUpPowerUp } from "powerUps/SpeedUpPowerUp";


export class PowerUpManager {
  private game: Game;
  private powerUpMap: Map<PowerUpKey, PowerUp>;

  constructor(game: Game) {
    this.game = game;
    this.powerUpMap = new Map<PowerUpKey, PowerUp>();
    this.initPowerUpMap();
  }

  public isPowerUpUnlocked(powerUpKey: PowerUpKey) {
    return this.game.biomes.isPowerUpUnlocked(powerUpKey);
  }

  private getAllUnlockedPowerUpKeys(): PowerUpKey[] {
    const unlockedPowerUpItemKeys: PowerUpKey[] = [];
    for (let powerUpKey in PowerUpKey) {
      if (this.isPowerUpUnlocked(powerUpKey as PowerUpKey)) {
        unlockedPowerUpItemKeys.push(powerUpKey as PowerUpKey);
      }
    }
    return unlockedPowerUpItemKeys;
  }

  public updateAllPowerUpsUi(): void {
    for (let powerUpKey in PowerUpKey) {
      this.powerUpMap.get(powerUpKey as PowerUpKey).updateUi();
    }
  }

  private initPowerUpMap(): void {
    for (let powerUpKey in PowerUpKey) {
      this.createPowerUp(powerUpKey as PowerUpKey);
    }
  }

  public createPowerUp(powerUpKey: PowerUpKey) {
    if (powerUpKey === PowerUpKey.POINTS_MULTIPLIER) {
      this.powerUpMap.set(powerUpKey, new PointsMultiplierPowerUp(this.game));
    } else if (powerUpKey === PowerUpKey.SPEED_UP) {
      this.powerUpMap.set(powerUpKey, new SpeedUpPowerUp(this.game));
    } else {
      console.error('Failed to create maze item of type.  No valid type: ' + powerUpKey);
      return;
    }
  }

  public getPowerUpActivateDuration(powerUpKey: PowerUpKey): number {
    if (powerUpKey === PowerUpKey.POINTS_MULTIPLIER) {
      return PointsMultiplierPowerUp.getActivateDuration(this.game);
    } else if (powerUpKey === PowerUpKey.SPEED_UP) {
      return SpeedUpPowerUp.getActivateDuration(this.game);
    }
    console.error('Invalid power up key for activate duration.');
  }
  
  public getPowerUpCooldownDuration(powerUpKey: PowerUpKey): number {
    if (powerUpKey === PowerUpKey.POINTS_MULTIPLIER) {
      return PointsMultiplierPowerUp.getCooldownTimerDuration();
    } else if (powerUpKey === PowerUpKey.SPEED_UP) {
      return SpeedUpPowerUp.getCooldownTimerDuration(this.game);
    }
    console.error('Invalid power up key for cooldown duration.');
  }
  
  public getPowerUp(powerUpKey: PowerUpKey): PowerUp {
    return this.powerUpMap.get(powerUpKey);
  }

  public activatePowerUp(powerUpKey: PowerUpKey): void {
    if (!this.isPowerUpUnlocked(powerUpKey)) return;
    this.getPowerUp(powerUpKey).activatePowerUpTimer();
  }
  
  public isPowerUpActive(powerUpKey: PowerUpKey): boolean {
    return this.powerUpMap.get(powerUpKey).isPowerUpActive();
  }
}
