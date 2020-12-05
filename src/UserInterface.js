class UserInterface {
  constructor(game, disableUi = false) {
    this.game = game;
    this.disableUi = disableUi;
  }

  init() {
    if(this.disableUi) return;
    this.initText()
    this.initEventHooks();
  }

  initText() {
    this.setPointsText();
    this.setRngMovementUpgradeText();
    this.setMazeSizeUpgradeText();
    this.setPointsPerVisitUpgradeText();
    this.setFruitSpawnRateUpgradeText();
    this.setFruitPickupPointsUpgradeText();
    this.setBuyBotAvoidRevisitLastPositionUpgradeText();
    this.setBuyBotPrioritizeUnvisitedUpgradeText();
    this.setBuyAutoExitMazeUpgradeText();
    this.setMazeCompletionBonusUpgradeText();
    this.setAllowPlayerMoveIndependentlyText();
    this.setRngRememberDeadEndTilesUpgradeText();
  }

  setDebugPanelVisible(isVisible) {
    $("#debug").css("display", isVisible ? "block" : "none");
  }

  setPointsText() {
    $("#points").text(`Points: ${this.game.points.points.toFixed(2)}`);
  }

  // Regular upgrades
  setRngMovementUpgradeText() {
    const cost = this.game.points.getRngMovementUpgradeCost();
    $("#buyBotMoveFaster").text(`Bot Moves Faster: ${cost.toFixed(2)} pts`);
  }

  setMazeSizeUpgradeText() {
    const cost = this.game.points.getMazeSizeUpgradeCost();
    $("#buyMazeSize").text(`Increase Maze Size: ${cost.toLocaleString()} pts`);
  }

  setPointsPerVisitUpgradeText() {
    const cost = this.game.points.getPointsPerVisitUpgradeCost();
    $("#buyPointsPerVisit").text(`Points Per Visit: ${cost.toLocaleString()} pts`);
  }

  setMazeCompletionBonusUpgradeText() {
    const cost = this.game.points.getMazeCompletionUpgradeCost();
    $("#buyMazeCompletionBonusUpgrade").text(`Maze Completion Bonus: ${cost.toLocaleString()} pts`);
  }

  setFruitSpawnRateUpgradeText() {
    const cost = this.game.points.getFruitSpawnRateUpgradeCost();
    $("#buyFruitSpawnRateUpgrade").text(`Fruit Spawn Rate: ${cost.toLocaleString()} pts`);
  }
  
  setFruitPickupPointsUpgradeText() {
    const cost = this.game.points.getFruitPickupPointsUpgradeCost();
    $("#buyFruitPickupPointsUpgrade").text(`Fruit Pickup Points: ${cost.toLocaleString()} pts`);
  }

  // Bot upgrade events
  setBuyBotAvoidRevisitLastPositionUpgradeText() {
    $("#buyBotAvoidRevisitLastPosition").text(`Basic Avoid Revisit: ${BOT_AVOID_REVISIT_LAST_POSITION_UPGRADE_COST} pts`);
    $("#buyBotAvoidRevisitLastPosition").prop("disabled", this.game.points.rngBotAvoidRevisitLastPosition);
  }

  setBuyBotPrioritizeUnvisitedUpgradeText() {
    $("#buyBotPrioritizeUnvisited").text(`Prioritize Unvisited: ${BOT_PRIORITIZE_UNVISITED_UPGRADE_COST} pts`)
    $("#buyBotPrioritizeUnvisited").prop("disabled", this.game.points.rngBotPrioritizeUnvisited);
  }

  setBuyAutoExitMazeUpgradeText() {
    $("#buyBotAutoExitMaze").text(`Auto Exit Maze: ${BOT_AUTO_EXIT_MAZE_UPGRADE_COST} pts`)
    $("#buyBotAutoExitMaze").prop("disabled", this.game.points.rngBotAutoExitMaze);
  }

  setAllowPlayerMoveIndependentlyText() {
    $("#buyPlayerMoveIndependently").text(`Allow Player to Move Independently: ${BOT_ALLOW_PLAYER_TO_MOVE_INDEPENDENTLY_UPGRADE_COST} pts`)
    $("#buyPlayerMoveIndependently").prop("disabled", this.game.points.rngBotAllowPlayerToMoveIndependently);
  }

  setRngRememberDeadEndTilesUpgradeText() {
    let cost = this.game.points.getRngRememberDeadEndTilesUpgradeCost();
    $("#buyBotRememberDeadEnds").text(`Remember Dead Ends (${this.game.points.rngBotRememberDeadEndTilesUpgrades} Tiles): ${cost.toLocaleString()} pts`);
  }
  

  initEventHooks() {
    // Regular upgrades
    $("#buyBotMoveFaster").click(() => {
      this.game.points.buyRngMovementUpgrade();
      this.setRngMovementUpgradeText();
    });
    $("#buyMazeSize").click(() => {
      this.game.points.buyMazeSizeUpgrade();
      this.setMazeSizeUpgradeText();
    });
    $("#buyPointsPerVisit").click(() => {
      this.game.points.buyPointsPerVisitUpgrade();
      this.setPointsPerVisitUpgradeText();
    });
    $("#buyFruitSpawnRateUpgrade").click(() => {
      this.game.points.buyFruitSpawnRateUpgrade();
      this.setFruitSpawnRateUpgradeText();
    });
    $("#buyFruitPickupPointsUpgrade").click(() => {
      this.game.points.buyFruitPickupPointsUpgrade();
      this.setFruitPickupPointsUpgradeText();
    });
    $("#buyMazeCompletionBonusUpgrade").click(() => {
      this.game.points.buyMazeCompletionUpgrade();
      this.setMazeCompletionBonusUpgradeText();
    });
    // Bot upgrades
    $("#buyBotAvoidRevisitLastPosition").click(() => {
      this.game.points.buyBotAvoidRevisitLastPosition();
      this.setBuyBotAvoidRevisitLastPositionUpgradeText();
    });
    $("#buyBotPrioritizeUnvisited").click(() => {
      this.game.points.buyBotPrioritizeUnvisitedUpgrade();
      this.setBuyBotPrioritizeUnvisitedUpgradeText();
    });
    $("#buyBotAutoExitMaze").click(() => {
      this.game.points.buyBotAutoExitMazeUpgrade();
      this.setBuyAutoExitMazeUpgradeText();
    });
    $("#buyPlayerMoveIndependently").click(() => {
      this.game.points.buyPlayerMoveIndependently();
      this.setAllowPlayerMoveIndependentlyText();
    });
    $("#buyBotRememberDeadEnds").click(() => {
      this.game.points.buyRngRememberDeadEndTilesUpgrade();
      this.setRngRememberDeadEndTilesUpgradeText();
    });
  }

  printMaze(maze, fruitSet) {
    if(this.disableUi) return;
    for (let y = 0; y < maze.length; y++) {
      $("#maze > tbody").append("<tr>");
      for (let x = 0; x < maze[y].length; x++) {
        let selector = generateTileKey(x, y);
        // Place cell element
        $("#maze > tbody").append(`<td id="${selector}">&nbsp;</td>`);

        // Draw edges
        if (maze[y][x][0] == WALL) $(`#${selector}`).css("border-top", "2px solid black");
        if (maze[y][x][1] == WALL) $(`#${selector}`).css("border-right", "2px solid black");
        if (maze[y][x][2] == WALL) $(`#${selector}`).css("border-bottom", "2px solid black");
        if (maze[y][x][3] == WALL) $(`#${selector}`).css("border-left", "2px solid black");
        
        // Draw fruit in tile.
        if (fruitSet.has(selector)) {
          this.drawBanana(selector);
        }
      }
      
      $("#maze > tbody").append("</tr>");
    }
  }

  drawBanana(tileSelector) {
    $(`#${tileSelector}`).css("background-image", `url("img/banana.png")`);
    $(`#${tileSelector}`).css("background-size", "20px");
  }

  removeBanana(tileSelector) {
    $(`#${tileSelector}`).css("background-size", "");
  }
  
  deleteMaze() {
    if(this.disableUi) return;
    $("#maze td").remove();
    $("#maze tr").remove();
  }
}