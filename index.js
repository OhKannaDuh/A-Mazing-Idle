
$(document).ready(() => {
  if (IS_DEV_MODE_ENABLED && !DEV_MODE_AUTOSTART) return;
  
  var game = new Game();
  game.startGame();

  $(document).keydown(function(event) {
    // Up
    if (event.keyCode === 38) { 
      game.maze.movePlayer(DIRECTION_UP, true);
    }
    // Down
    else if (event.keyCode === 40) {
      game.maze.movePlayer(DIRECTION_DOWN, true);
    }
    // Left
    else if (event.keyCode === 37) {
      game.maze.movePlayer(DIRECTION_LEFT, true);
    }
    // Right
    else if (event.keyCode === 39) {
      game.maze.movePlayer(DIRECTION_RIGHT, true);
    }
  });
});
