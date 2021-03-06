import Game from "../Game";
import { DEFAULT_MAZE_SIZE } from "../Maze";
import { DEFAULT_TILE_WIDTH_CSS } from "../MazeGenerator";
import { UpgradeKey } from "../constants/UpgradeConstants";
declare var $: any;

export const IS_DEV_MODE_ENABLED = false;
export const DEV_MODE_DISABLE_UI = false;
export const DEV_MODE_AUTOSTART = false;
export const IS_FREE_MODE_ENABLED = true;

const generateScalingNumbers = () => {
  let startingUpgradeCount = 0;
  
  let baseCost = 10;
  let costMultiplier = 2.0;
  let baseVal = 1000;
  let valMultiplier = 0.98;

  let maxUpgradeCount = 50;
  
  for (let x = startingUpgradeCount; x < maxUpgradeCount; x++) {
    let cost = baseCost * Math.pow(costMultiplier, x);
    let val = baseVal * Math.pow(valMultiplier, x);
    
    $('#debugTable > tbody').append(`<tr>`);
    $('#debugTable > tbody').append(`<td width="${DEFAULT_TILE_WIDTH_CSS}">${x+1}:   </td>`);
    $('#debugTable > tbody').append(`<td width="100px">${cost.toLocaleString()}</td>`);
    $('#debugTable > tbody').append(`<td width="100px">${val.toFixed(4)}</td>`);
    $('#debugTable > tbody').append(`</tr>`);
  }
}
// generateScalingNumbers();

var game1: Game;
var game2;
var game3;
var game4;
var game5;

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
