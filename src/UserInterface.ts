import Game from "./Game";
import { generateTileKey, WALL } from "./MazeGenerator";
import { BOT_AVOID_REVISIT_LAST_POSITION_UPGRADE_COST, BOT_PRIORITIZE_UNVISITED_UPGRADE_COST, BOT_AUTO_EXIT_MAZE_UPGRADE_COST, BOT_ALLOW_PLAYER_TO_MOVE_INDEPENDENTLY_UPGRADE_COST, BOT_TELEPORT_BOT_BACK_TO_PLAYER_UPGRADE_COST, BOT_TELEPORT_PLAYER_BACK_TO_BOT_UPGRADE_COST } from "./Points";
// import $ = require('jquery');
// import * as $ from 'jquery';
declare var $: any;



class UserInterface {
  private game: Game;
  private disableUi: boolean;

  constructor(game: Game, disableUi: boolean = false) {
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
    this.setPlayerTeleportToBotText();
    this.setBotTeleportToPlayerText();
    this.setRngSplitUpgradeText();
    this.setRngSplitBotAutoMergeUpgradeText();
  }

  setDebugPanelVisible(isVisible) {
    $("#debug").css("display", isVisible ? "block" : "none");
  }

  setPointsText() {
    $("#points").text(`Points: ${this.game.points.points.toLocaleString()}`);
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
  
  setBotTeleportToPlayerText() {
    $("#buyBotTeleportToPlayer").text(`Bot Teleport Back to Player: ${BOT_TELEPORT_BOT_BACK_TO_PLAYER_UPGRADE_COST} pts`)
    $("#buyBotTeleportToPlayer").prop("disabled", this.game.points.rngBotAllowPlayerToMoveIndependently);
  }

  setPlayerTeleportToBotText() {
    $("#buyPlayerTeleportToBot").text(`Player Teleport Back to Bot: ${BOT_TELEPORT_PLAYER_BACK_TO_BOT_UPGRADE_COST} pts`)
    $("#buyPlayerTeleportToBot").prop("disabled", this.game.points.rngBotAllowPlayerToMoveIndependently);
  }
  
  setRngRememberDeadEndTilesUpgradeText() {
    let cost = this.game.points.getRngRememberDeadEndTilesUpgradeCost();
    $("#buyBotRememberDeadEnds").text(`Remember Dead Ends (${this.game.points.rngBotRememberDeadEndTilesUpgrades} Tiles): ${cost.toLocaleString()} pts`);
  }

  setRngSplitUpgradeText() {
    let cost = this.game.points.getTileSplitUpgradeCost();
    $("#buyBotSplitDirections").text(`Bot Split Directions (${this.game.points.rngBotSplitDirectionUpgrades+1} Bots): ${cost.toLocaleString()} pts`);
  }
  
  setRngSplitBotAutoMergeUpgradeText() {
    let cost = this.game.points.getSplitBotAutoMergeUpgradeCost();
    $("#buySplitBotAutoMerge").text(`Bot Split Auto Merge: ${cost.toLocaleString()} pts`);
    $("#buySplitBotAutoMerge").prop("disabled", this.game.points.rngBotSplitBotAutoMerge);
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
    $("#buyPlayerTeleportToBot").click(() => {
      this.game.points.buyPlayerTeleportBackToBot();
      this.setAllowPlayerMoveIndependentlyText();
    });
    $("#buyBotTeleportToPlayer").click(() => {
      this.game.points.buyBotTeleportBackToPlayer();
      this.setAllowPlayerMoveIndependentlyText();
    });
    $("#buyBotRememberDeadEnds").click(() => {
      this.game.points.buyRngRememberDeadEndTilesUpgrade();
      this.setRngRememberDeadEndTilesUpgradeText();
    });
    $("#buyBotSplitDirections").click(() => {
      this.game.points.buyBotSplitUpgrade();
      this.setRngSplitUpgradeText();
    });
    $("#buySplitBotAutoMerge").click(() => {
      this.game.points.buySplitBotAutoMergeUpgrade();
      this.setRngSplitBotAutoMergeUpgradeText();
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

export default UserInterface;