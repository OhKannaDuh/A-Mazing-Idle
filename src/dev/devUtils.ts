import Game from "managers/Game";
import { UpgradeKey } from "constants/UpgradeConstants";
import { DEFAULT_MAZE_SIZE } from "managers/MazeUtils";
declare var $: any;

export const IS_DEV_MODE_ENABLED = false;
export const DEBUG_ALL_BUTTONS_VISIBLE = false;
export const IS_FREE_MODE_ENABLED = false;

export const DEV_MODE_DISABLE_UI = false;
export const DEV_MODE_AUTOSTART = false;

var game1: Game;

var iterationCount = 0;
var maxIterationCount = 100;

const getMazeData = () => {
  game1 = new Game(DEV_MODE_DISABLE_UI, true);
  game1.setMaze();
  
  // game1.points.rngBotPrioritizeUnvisited = Boolean($(`#debugInputPrioritizeUnvisited`).val());
  // // game1.points.rngBotAvoidRevisitLastPosition = Boolean($(`#debugAvoidRevisit`).val());
  // game1.points.rngBotAutoExitMaze = Boolean($(`#debugAutoExit`).val());
  
  // game1.points.mazeSizeUpgradeCount = parseInt($(`#debugMazeUpgradeCount`).val().toString());
  // maxIterationCount = parseInt($(`#debugMaxIterations`).val().toString());
  
  // game1.points.rngMovementSpeedUpgrades = 1000;
  // game1.points.pointsPerVisitUpgradeCount = 0;
  // game1.points.rngMovementSpeedUpgrades = 20;

  console.info('start debug maze');
  game1.startGame();
}

var sumMoves = 0;
var sumPoints = 0;


const printAverages = () => {
  const mazeSize = DEFAULT_MAZE_SIZE + game1.upgrades.getUpgradeLevel(UpgradeKey.MAZE_SIZE_UPGRADE);
  
  $(`#debugResult`).append(`Avg Moves: ${(sumMoves/iterationCount).toFixed(2)}<br>`);
  $(`#debugResult`).append(`Avg New Tile Visits: ${(sumPoints/iterationCount).toFixed(2)}<br>`);
  $(`#debugResult`).append(`Avg Tile Revisits: ${((sumMoves-sumPoints)/iterationCount).toFixed(2)}<br>`);
  $(`#debugResult`).append(`Maze size: ${mazeSize}<br>`);
}

export const printMazeCompleteData = (game) => {
  
  let moveCount = game.maze.moveCount;
  // let totalTime = game.rngBot.getBotMoveInterval() * moveCount;
  let points = game.points.points;

  const completionBonus = game.points.getMazeCompletionBonus();

  $('#debugTable > tbody').append(`<tr>`);
  $('#debugTable > tbody').append(`<td>${(1 +iterationCount)}:   </td>`);
  $('#debugTable > tbody').append(`<td>${moveCount}</td>`);
  // $('#debugTable > tbody').append(`<td>${totalTime}</td>`);
  $('#debugTable > tbody').append(`<td>${(points - completionBonus).toFixed(2)}</td>`);
  $('#debugTable > tbody').append(`<td>${(points).toFixed(2)}</td>`);
  $('#debugTable > tbody').append(`</tr>`);

  sumMoves += moveCount;
  sumPoints += (points - completionBonus);

  iterationCount++;
  
  if (iterationCount == maxIterationCount) {
    printAverages();
    return;
  }

  game.points.points = 0;
  game.startGame();
}


const debugHeader = () => {
  $('#debugTable > tbody').append(`<tr>`);
  $('#debugTable > tbody').append(`<th>#</td>`);
  $('#debugTable > tbody').append(`<th>Move Count</th>`);
  $('#debugTable > tbody').append(`<th>Points</th>`);
  $('#debugTable > tbody').append(`<th>Points (+comp)</th>`);
  $('#debugTable > tbody').append(`</tr>`);
}


$(document).ready(() => {
  if(!IS_DEV_MODE_ENABLED) return;
  
  $('#debugRunButton').click(() => {
    $('#debugTable > tbody').empty();
    $(`#debugResult`).empty();

    iterationCount = 0;
    sumMoves = 0;
    sumPoints = 0;
    debugHeader();
    getMazeData();
  });
});
