
$(document).ready(() => {
  if (IS_DEV_MODE_ENABLED && !DEV_MODE_AUTOSTART) return;
  
  var game = new Game();
  game.startGame();

  $(document).keydown(function(event) {
    // Up
    if (event.keyCode === 38) {
      game.maze.movePlayer(DEFAULT_PLAYER_ID, DIRECTION_UP, true);
      event.preventDefault();
    }
    // Down
    else if (event.keyCode === 40) {
      game.maze.movePlayer(DEFAULT_PLAYER_ID, DIRECTION_DOWN, true);
      event.preventDefault();
    }
    // Left
    else if (event.keyCode === 37) {
      game.maze.movePlayer(DEFAULT_PLAYER_ID, DIRECTION_LEFT, true);
      event.preventDefault();
    }
    // Right
    else if (event.keyCode === 39) {
      game.maze.movePlayer(DEFAULT_PLAYER_ID, DIRECTION_RIGHT, true);
      event.preventDefault();
    }
    // E = Teleport Bot to Player
    else if (event.keyCode === 69) {
      if (game.points.rngBotTeleportBotBackToPlayer) {
        game.maze.teleportPlayerBackToBot();
      }
      event.preventDefault();
    }
    // Q = Teleport Bot to Player
    else if (event.keyCode === 81) {
      if (game.points.rngBotTeleportBotBackToPlayer) {
        game.maze.teleportBotBackToPlayer();
        event.preventDefault();
      }
    }
  });
});
