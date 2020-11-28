
const IS_DEV_MODE_ENABLED = true;
const DEV_MODE_DISABLE_UI = true;

const generateScalingNumbers = () => {
  let startingUpgradeCount = 0;

  let baseCost = 10;
  let costMultiplier = 2.0;
  let baseVal = 1000;
  let valMultiplier = 0.98;

  let maxUpgradeCount = 50;
  
  for (let x = startingUpgradeCount; x < maxUpgradeCount; x++) {
    console.log('here');
    let cost = baseCost * Math.pow(costMultiplier, x);
    let val = baseVal * Math.pow(valMultiplier, x);
    
    $('#debugTable > tbody').append(`<tr>`);
    $('#debugTable > tbody').append(`<td width="20px">${x+1}:   </td>`);
    $('#debugTable > tbody').append(`<td width="100px">${cost.toLocaleString()}</td>`);
    $('#debugTable > tbody').append(`<td width="100px">${val.toFixed(4)}</td>`);
    $('#debugTable > tbody').append(`</tr>`);
  }
}
// generateScalingNumbers();

const getMazeData = () => {
  const gamez = new Game(DEV_MODE_DISABLE_UI, true);
  
  gamez.points.rngMovementSpeedUpgrades = 1000;
  gamez.points.mazeSizeUpgradeCount = 0;

  gamez.points.pointsPerVisitUpgradeCount = 0;
  gamez.points.rngMovementSpeedUpgrades = 10;

  gamez.points.rngBotPrioritizeUnvisited = false;
  gamez.points.rngBotAvoidRevisitLastPosition = false;
  gamez.points.rngBotAutoExitMaze = false;

  $('#debugTable > tbody').append(`<tr>`);
  $('#debugTable > tbody').append(`<th>#</td>`);
  $('#debugTable > tbody').append(`<th>Move Count</th>`);
  $('#debugTable > tbody').append(`<th>Total Time (s)</th>`);
  $('#debugTable > tbody').append(`</tr>`);
  console.log('start debug maze');
  this.maze.newMaze();

  gamez.startGame();
}

var count = 0;
const printMazeCompleteData = (game) => {
  console.log('maze completion!');
  let moveCount = game.maze.moveCount;
  let totalTime = game.rngBot.getBotMoveInterval() * moveCount;

  $('#debugTable > tbody').append(`<tr>`);
  $('#debugTable > tbody').append(`<td>${count++}:   </td>`);
  $('#debugTable > tbody').append(`<td>${moveCount}</td>`);
  $('#debugTable > tbody').append(`<td>${totalTime}</td>`);
  $('#debugTable > tbody').append(`</tr>`);
}
$(document).ready(() => {
  if(!IS_DEV_MODE_ENABLED) return;
  getMazeData();
});