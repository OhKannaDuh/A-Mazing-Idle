import Game from "./Game";
import MazeItem from "./items/MazeItem";
import { MazeArray } from "./Maze";
import { generateTileKey, MazeDirectionIndex, MazeWallTypes } from "./MazeGenerator";
import { CURRENT_MAZE_STATS, StatsKey, STATS_TO_UI_ID_MAP } from "./models/Stats";
declare var $: any;


class UserInterface {
  private game: Game;
  private disableUi: boolean;
  
  constructor(game: Game, disableUi: boolean = false) {
    this.game = game;
    this.disableUi = disableUi;
  }

  public init() {
    if(this.disableUi) return;
    this.initText();
    this.initEvents();
  }

  private initText() {
    this.setPointsText();
  }

  private initEvents() {
    $(`#manualSaveGame`).click(() => this.game.save.saveGameToLocalStorage());
    $(`#deleteSaveGame`).click(() => this.game.save.clearLocalStorage());
    $(`#newGame`).click(() => this.game.hardResetGame());
  }

  public setDebugPanelVisible(isVisible) {
    $("#debug").css("display", isVisible ? "block" : "none");
  }

  public setPointsText() {
    $("#points").text(`Points: ${UserInterface.getPrettyPrintNumberNoDecimals(this.game.points.points)}`);
  }

  public printMaze(maze: MazeArray) {
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

  public setTileCss(maze: MazeArray, x: number, y: number) {
    let selector = generateTileKey(x, y);
    $(`#${selector}`).css("border-top", this.getMazeBorderCss(maze[y][x][MazeDirectionIndex.UP]));
    $(`#${selector}`).css("border-right", this.getMazeBorderCss(maze[y][x][MazeDirectionIndex.RIGHT]));
    $(`#${selector}`).css("border-bottom", this.getMazeBorderCss(maze[y][x][MazeDirectionIndex.DOWN]));
    $(`#${selector}`).css("border-left", this.getMazeBorderCss(maze[y][x][MazeDirectionIndex.LEFT]));
  }

  private getMazeBorderCss(val: number) {
    if (val === MazeWallTypes.WALL) {
      return '2px solid black';
    } else if (val === MazeWallTypes.DESTRUCTIBLE_WALL) {
      return '2px dotted black';
    } else {
      //TODO: make this occupy space still
      return 'hidden';
    }
  }

  public deleteMaze() {
    if(this.disableUi) return;
    $("#maze td").remove();
    $("#maze tr").remove();
  }

  public updateStatsKey(statsKey: StatsKey) {
    
    if (!STATS_TO_UI_ID_MAP.has(statsKey)) {
      console.error('No stats key UI registered for: ', statsKey);
      return;
    }
    
    const statsValue = this.game.stats.getStat(statsKey);
    const statsUiId = STATS_TO_UI_ID_MAP.get(statsKey);
    
    if (!$(`#${statsUiId}`)) {
      console.error("No UI component registerd to stats key: ", statsUiId);
      return;
    }
    $(`#${statsUiId}`).text(' ' + UserInterface.getPrettyPrintNumberNoDecimals(statsValue));
  }

  public updateAllStatsKey() {
    for (let statsKey of STATS_TO_UI_ID_MAP.keys()) {
      this.updateStatsKey(statsKey as StatsKey); 
    }
  }

  public static getPrettyPrintNumberNoDecimals(num: number) {
    return parseInt(num.toFixed(0)).toLocaleString();
  }
}

export default UserInterface;
