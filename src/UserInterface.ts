import Game from "./Game";
import MazeItem from "./items/MazeItem";
import { MazeArray } from "./Maze";
import { generateTileKey, MazeDirectionIndex, MazeWallTypes } from "./MazeGenerator";
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
    $(`#newGame`).click(() => this.game.hardResetGame());
  }

  setDebugPanelVisible(isVisible) {
    $("#debug").css("display", isVisible ? "block" : "none");
  }

  setPointsText() {
    $("#points").text(`Points: ${this.game.points.points.toLocaleString()}`);
  }

  printMaze(maze: MazeArray) {
    if(this.disableUi) return;

    for (let y = 0; y < maze.length; y++) {
      $("#maze > tbody").append("<tr>");
      for (let x = 0; x < maze[y].length; x++) {
        let tileKey = generateTileKey(x, y);
        // Place cell element
        $("#maze > tbody").append(`<td id="${tileKey}">&nbsp;</td>`);

        // Draw edges
        this.setTileCss(maze, x, y);
        
        // Draw fruit in tile.
        if (this.game.items.hasMazeItem(tileKey)) {
          this.game.items.drawItem(tileKey);
        }
      }
      
      $("#maze > tbody").append("</tr>");
    }
  }

  setTileCss(maze: MazeArray, x: number, y: number) {
    let selector = generateTileKey(x, y);
    $(`#${selector}`).css("border-top", this.getMazeBorderCss(maze[y][x][MazeDirectionIndex.UP]));
    $(`#${selector}`).css("border-right", this.getMazeBorderCss(maze[y][x][MazeDirectionIndex.RIGHT]));
    $(`#${selector}`).css("border-bottom", this.getMazeBorderCss(maze[y][x][MazeDirectionIndex.DOWN]));
    $(`#${selector}`).css("border-left", this.getMazeBorderCss(maze[y][x][MazeDirectionIndex.LEFT]));
  }

  getMazeBorderCss(val: number) {
    if (val === MazeWallTypes.WALL) {
      return '2px solid black';
    } else if (val === MazeWallTypes.DESTRUCTIBLE_WALL) {
      return '2px dotted black';
    } else {
      //TODO: make this occupy space still
      return 'hidden';
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
