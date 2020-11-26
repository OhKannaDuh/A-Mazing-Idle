
class Game {
  constructor() {
    this.maze = new MazeGenerator(this);
    this.points = new Points(this);
    this.rngBot = new RNGBot(this);
  }

  getPlayer() {
    return this.player;
  }

  startGame() {
    this.maze.deleteMaze();
    this.maze.newMaze();
    this.maze.printMaze();
    this.maze.resetPlayer();
    
    this.rngBot.enableRngBot();
  }
  
  completeMaze() {
    console.log('complete!');
    this.rngBot.disableRngBot();
    
    this.points.addMazeCompletionBonus();

    this.startGame();
  }
}



$(document).ready(() => {
  var game = new Game();
  game.startGame();

  $(document).keydown(function(event) {
    // Up
    if (event.keyCode === 38) { 
      console.log('up!');
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

  $('#moveFaster').click(() => { 
    game.rngBot.buyRngMovementUpgrade();
  });
  $('#buyMazeSize').click(() => { 
    game.points.buyMazeSizeUpgrade();
  });
});