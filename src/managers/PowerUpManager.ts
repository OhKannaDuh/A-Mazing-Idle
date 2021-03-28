
import { PowerUpKey } from "constants/PowerUpConstants";
import { UpgradeKey } from "constants/UpgradeConstants";
import Game from "managers/Game";
import Player from "models/Player";
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
    return true;
    // return this.game.biomes.isPowerUpUnlocked(mazeItemKey);
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
  
  public getPowerUp(powerUpKey: PowerUpKey): PowerUp {
    return this.powerUpMap.get(powerUpKey);
  }

  public activatePowerUp(powerUpKey: PowerUpKey): void {
    this.getPowerUp(powerUpKey).activatePowerUpTimer();
  }
  
  public isPowerUpActive(powerUpKey: PowerUpKey): boolean {
    return this.powerUpMap.get(powerUpKey).isPowerUpActive();
  }
}
