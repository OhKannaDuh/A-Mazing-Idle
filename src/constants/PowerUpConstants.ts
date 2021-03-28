
export enum PowerUpKey {
  POINTS_MULTIPLIER = "POINTS_MULTIPLIER",
  SPEED_UP = "SPEED_UP"
}

export const POWER_UP_TO_UI_KEY_MAP: Map<PowerUpKey, string> = new Map([
  [PowerUpKey.POINTS_MULTIPLIER, 'pointsMultiplierPowerUpButton'],
  [PowerUpKey.SPEED_UP, 'speedUpPowerUpButton']
]);

export const POINTS_MULTIPLIER_POWER_UP_BASE_DURATION = 5000;
export const SPEED_UP_POWER_UP_BASE_DURATION = 10000;
