import { IS_DEV_MODE_ENABLED, DEV_MODE_AUTOSTART } from "dev/devUtils";
import Game from "managers/Game";
import { DEFAULT_PLAYER_ID } from "managers/MazeManager";
import { UpgradeKey } from "constants/UpgradeConstants";
import { DIRECTION_UP, DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT } from "managers/MazeUtils";
import { PowerUpKey } from "constants/PowerUpConstants";
declare var $: any;

const UP_KEY = 38;
const DOWN_KEY = 40;
const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const E_KEY = 69;
const ONE_KEY = 49;
const TWO_KEY = 50;

$(document).ready(() => {
  if (IS_DEV_MODE_ENABLED && !DEV_MODE_AUTOSTART) return;
  
  const game: Game = new Game();
  game.save.loadGameSaveFromLocalStorage();
  
  game.startGame();
  game.save.startSaveTimer();

  
  //TODO: this should be in UI
  $(document).keydown(function(event) {
    // Up
    if (event.keyCode === UP_KEY) {
      game.players.movePlayer(DEFAULT_PLAYER_ID, DIRECTION_UP, true);
      event.preventDefault();
    }
    // Down
    else if (event.keyCode === DOWN_KEY) {
      game.players.movePlayer(DEFAULT_PLAYER_ID, DIRECTION_DOWN, true);
      event.preventDefault();
    }
    // Left
    else if (event.keyCode === LEFT_KEY) {
      game.players.movePlayer(DEFAULT_PLAYER_ID, DIRECTION_LEFT, true);
      event.preventDefault();
    }
    // Right
    else if (event.keyCode === RIGHT_KEY) {
      game.players.movePlayer(DEFAULT_PLAYER_ID, DIRECTION_RIGHT, true);
      event.preventDefault();
    }
    // E = Teleport Bot to Player
    else if (event.keyCode === E_KEY) {
      if (game.upgrades.isUpgraded(UpgradeKey.TELEPORT_PLAYER_BACK_TO_BOT)) {
        game.maze.teleportPlayerBackToBot();
      }
      event.preventDefault();
    }
    // 1 = Speed Up Powerup
    else if (event.keyCode === ONE_KEY) {
      game.powerUps.activatePowerUp(PowerUpKey.SPEED_UP);
      event.preventDefault();
    }
    // 2 = Point multiplier Powerup
    else if (event.keyCode === TWO_KEY) {
      game.powerUps.activatePowerUp(PowerUpKey.POINTS_MULTIPLIER);
      event.preventDefault();
    }
  });
});
