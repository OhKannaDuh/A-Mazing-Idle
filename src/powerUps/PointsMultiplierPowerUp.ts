import { POINTS_MULTIPLIER_POWER_UP_BASE_COOLDOWN, PowerUpKey } from "constants/PowerUpConstants";
import Game from "managers/Game";
import { PowerUp } from "models/PowerUp";
import { StatsKey } from "models/Stats";
import { PointsMultiplierActivateDurationUpgrade } from "upgrades/definitions/powerUps/PointsMultiplierActivateDurationUpgrade";


export class PointsMultiplierPowerUp extends PowerUp {
  constructor(game: Game) {
    super(game, PowerUpKey.POINTS_MULTIPLIER, StatsKey.TOTAL_MULTIPLIER_POWERUPS_USED);
  }

  public static getCooldownTimerDuration(): number {
    return POINTS_MULTIPLIER_POWER_UP_BASE_COOLDOWN;
  }

  public static getActivateDuration(game: Game): number {
    return PointsMultiplierActivateDurationUpgrade.getMultiplierPowerUpActivateDuration(game);
  }

  protected getUiStringName(): string {
    return 'Points Multiplier (2)';
  }
}
