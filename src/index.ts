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

const W_KEY = 87;
const S_KEY = 83
const A_KEY = 65;
const D_KEY = 68;

const E_KEY = 69;
const Q_KEY = 81;
const ONE_KEY = 49;
const TWO_KEY = 50;
const ESCAPE_KEY = 27;

$(document).ready(() => {
  if (IS_DEV_MODE_ENABLED && !DEV_MODE_AUTOSTART) return;
  
  const game: Game = new Game();
  game.save.loadGameSaveFromLocalStorage();
  
  game.startGame();
  game.save.startSaveTimer();

  //TODO: this should be in UI
  $(document).keydown(function(event) {
    // Up
    if (event.keyCode === UP_KEY || event.keyCode === W_KEY) {
      const currPlayerId = game.players.getPlayerOrDefaultBotId();
      game.players.movePlayer(currPlayerId, DIRECTION_UP, true);
      event.preventDefault();
    }
    // Down
    else if (event.keyCode === DOWN_KEY || event.keyCode === S_KEY) {
      const currPlayerId = game.players.getPlayerOrDefaultBotId();
      game.players.movePlayer(currPlayerId, DIRECTION_DOWN, true);
      event.preventDefault();
    }
    // Left
    else if (event.keyCode === LEFT_KEY || event.keyCode === A_KEY) {
      const currPlayerId = game.players.getPlayerOrDefaultBotId();
      game.players.movePlayer(currPlayerId, DIRECTION_LEFT, true);
      event.preventDefault();
    }
    // Right
    else if (event.keyCode === RIGHT_KEY || event.keyCode === D_KEY) {
      const currPlayerId = game.players.getPlayerOrDefaultBotId();
      game.players.movePlayer(currPlayerId, DIRECTION_RIGHT, true);
      event.preventDefault();
    }
    // E = Teleport Bot to Player
    else if (event.keyCode === E_KEY) {
      if (game.upgrades.isUpgraded(UpgradeKey.TELEPORT_PLAYER_BACK_TO_BOT)) {
        game.maze.teleportPlayerBackToBot();
      }
      event.preventDefault();
    }
    // Q = Teleport Player to Bot
    else if (event.keyCode === Q_KEY) {
      if (game.upgrades.isUpgraded(UpgradeKey.TELEPORT_PLAYER_BACK_TO_BOT)) {
        game.maze.teleportBotBackToPlayer();
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
    else if (event.keyCode === ESCAPE_KEY) {
      game.ui.closeAllModals();
    }
  });
});
