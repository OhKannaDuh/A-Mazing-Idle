import { PowerUpKey } from "constants/PowerUpConstants";
import Game from "managers/Game";
import { PowerUp } from "models/PowerUp";


export class PointsMultiplierPowerUp extends PowerUp {
  constructor(game: Game) {
    super(game, PowerUpKey.POINTS_MULTIPLIER);
  }

  protected getCooldownTimerDuration(): number {
    return 10000;
  }

  protected getActivateDuration(): number {
    return 10000;
  }

  protected getUiStringName(): string {
    return 'Points Multiplier';
  }
}
