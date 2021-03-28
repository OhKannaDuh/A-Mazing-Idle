import { PowerUpKey } from "constants/PowerUpConstants";
import Game from "managers/Game";
import { PowerUp } from "models/PowerUp";


export class SpeedUpPowerUp extends PowerUp {
  constructor(game: Game) {
    super(game, PowerUpKey.SPEED_UP);
  }

  protected getCooldownTimerDuration(): number {
    return 10000;
  }

  protected getActivateDuration(): number {
    return 10000;
  }

  protected getUiStringName(): string {
    return 'Speed Up Powerup';
  }
}
