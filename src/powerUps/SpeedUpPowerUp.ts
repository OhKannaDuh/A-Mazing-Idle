import { PowerUpKey } from "constants/PowerUpConstants";
import Game from "managers/Game";
import { PowerUp } from "models/PowerUp";
import { StatsKey } from "models/Stats";
import { SpeedUpActivateDurationUpgrade } from "upgrades/definitions/powerUps/SpeedUpActivateDurationUpgrade";


export class SpeedUpPowerUp extends PowerUp {
  constructor(game: Game) {
    super(game, PowerUpKey.SPEED_UP, StatsKey.TOTAL_SPEED_UP_POWERUPS_USED);
  }

  public static getCooldownTimerDuration(game: Game): number {
    return 10000;
  }

  public static getActivateDuration(game: Game): number {
    return SpeedUpActivateDurationUpgrade.getSpeedUpPowerUpActivateDuration(game);
  }

  protected getUiStringName(): string {
    return 'Speed Up Powerup';
  }
}
