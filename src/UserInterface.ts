import Game from "./Game";
import { generateTileKey, WALL } from "./MazeGenerator";
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
    this.initText();
    this.initEvents();
  }

  initText() {
    this.setPointsText();
  }

  initEvents() {
    $(`#manualSaveGame`).click(() => this.game.save.saveGameToLocalStorage());
    $(`#deleteSaveGame`).click(() => this.game.save.clearLocalStorage());
  }

  setDebugPanelVisible(isVisible) {
    $("#debug").css("display", isVisible ? "block" : "none");
  }

  setPointsText() {
    $("#points").text(`Points: ${this.game.points.points.toLocaleString()}`);
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
