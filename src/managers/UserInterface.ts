import Game from "managers/Game";
import { Tile } from "managers/MazeManager";
import { generateTileKey, MazeDirectionIndex, MazeWallTypes } from "managers/MazeUtils";
import { Maze } from "models/Maze";
import { StatsKey, STATS_TO_UI_ID_MAP } from "models/Stats";
declare var $: any;

const FINISH_LINE_ICON = "img/finishLine.png";


export class UserInterface {
  private game: Game;
  private disableUi: boolean;
  
  constructor(game: Game, disableUi: boolean = false) {
    this.game = game;
    this.disableUi = disableUi;
  }

  public init(): void {
    if(this.disableUi) return;
    this.initText();
    this.initEvents();
  }

  private initText(): void {
    this.setPointsText();
  }

  private initEvents(): void {
    $(`#manualSaveGame`).click(() => this.game.save.saveGameToLocalStorage());
    $(`#deleteSaveGame`).click(() => this.game.save.clearLocalStorage());
    $(`#newGame`).click(() => this.game.hardResetGame());
    $(`#clearAllStats`).click(() => this.game.stats.initStatsMap());
  }

  public setDebugPanelVisible(isVisible): void {
    $("#debug").css("display", isVisible ? "block" : "none");
  }

  public setPointsText(): void {
    $("#points").text(`Points: ${UserInterface.getPrettyPrintNumber(this.game.points.points)}`);
  }
  
  public printMazeV2(maze: Maze): void {
    // Extends one before/beyond grid to handle an exit cell.
    for (let y = -1; y < maze.grid.sizeY+1; y++) {
      $("#maze > tbody").append("<tr>");

      for (let x = -1; x < maze.grid.sizeX+1; x++) {
        let tileKey = generateTileKey(x, y);
        // Place cell element
        $("#maze > tbody").append(`<td id="${tileKey}">&nbsp;</td>`);

        // Draw edges
        this.setTileCssV2(maze, { x: x, y: y });
        
        // Draw item if present
        this.game.items.drawItem({ x: x, y: y});
      }
      
      $("#maze > tbody").append("</tr>");
    }
    
    this.setFinishLineIcon(maze.grid.externalExitTile);
  }
  
  public setTileCssV2(maze: Maze, tile: Tile): void {
    let cssSelector = generateTileKey(tile.x, tile.y);
    $(`#${cssSelector}`).css("border-top", this.getMazeBorderCss(maze.getCellWallType(tile, MazeDirectionIndex.UP)));
    $(`#${cssSelector}`).css("border-right", this.getMazeBorderCss(maze.getCellWallType(tile, MazeDirectionIndex.RIGHT)));
    $(`#${cssSelector}`).css("border-bottom", this.getMazeBorderCss(maze.getCellWallType(tile, MazeDirectionIndex.DOWN)));
    $(`#${cssSelector}`).css("border-left", this.getMazeBorderCss(maze.getCellWallType(tile, MazeDirectionIndex.LEFT)));
  }

  private getMazeBorderCss(val: MazeWallTypes): string {
    const borderColor = this.game.colors.getMazeWallColor();
    if (val === MazeWallTypes.WALL) {
      return `2px solid ${borderColor}`;
    } else if (val === MazeWallTypes.DESTRUCTIBLE_WALL) {
      return `2px dotted ${borderColor}`;
    } else if (val === MazeWallTypes.OUT_OF_BOUNDS_WALL || val == null) {
      return;
    } else {
      //TODO: make this occupy space still
      return 'hidden';
    }
  }

  public deleteMaze(): void {
    if(this.disableUi) return;
    $("#maze td").remove();
    $("#maze tr").remove();
  }

  public updateStatsKey(statsKey: StatsKey): void {
    
    if (!STATS_TO_UI_ID_MAP.has(statsKey)) {
      console.debug('No stats key UI registered for: ', statsKey);
      return;
    }
    
    const statsValue = this.game.stats.getStat(statsKey);
    const statsUiId = STATS_TO_UI_ID_MAP.get(statsKey);
    
    if (!$(`#${statsUiId}`)) {
      console.info("No UI component registerd to stats key: ", statsUiId);
      return;
    }
    $(`#${statsUiId}`).text(' ' + UserInterface.getPrettyPrintNumber(statsValue));
  }

  public updateAllStatsKey(): void {
    for (let statsKey of STATS_TO_UI_ID_MAP.keys()) {
      this.updateStatsKey(statsKey as StatsKey); 
    }
  }

  public static getPrettyPrintNumber(num: number, decimalLength: number = 0): string {
    if (!num) return '0';
    return parseFloat(num.toFixed(decimalLength)).toLocaleString();
  }

  public setFinishLineIcon(tile: Tile): void {
    const tileKey = generateTileKey(tile.x, tile.y);
    $(`#${tileKey}`).css("background-image", `url("${FINISH_LINE_ICON}")`);
    $(`#${tileKey}`).css("background-repeat", `no-repeat`);
    $(`#${tileKey}`).css("background-position", `center`);
    $(`#${tileKey}`).css("background-size", '20px');
  }
}
