class UserInterface {
  constructor(game) {
      this.game = game;
  }

  init() {
    
    this.initText()
    this.initEventHooks();
  }

  initText() {
    this.setPointsText();
    this.setRngMovementUpgradeText();
    this.setMazeSizeUpgradeText();
    this.setBuyBotAvoidRevisitUpgradeText();
    this.setPointsPerVisitUpgradeText();
  }

  setPointsText() {
    $('#points').text('Points: ' + this.game.points.points.toFixed(2));
  }

  setRngMovementUpgradeText() {
    const cost = this.game.points.getRngMovementUpgradeCost();
    $('#buyBotMoveFaster').text('Bot Moves Faster: ' + cost.toFixed(2));
  }

  setMazeSizeUpgradeText() {
    const cost = this.game.points.getMazeSizeUpgradeCost();
    $('#buyMazeSize').text('Increase Maze Size: ' + cost.toFixed(2));
  }

  setBuyBotAvoidRevisitUpgradeText() {
    $('#buyBotAvoidRevisit').text('Basic Avoid Revisit: ' + AVOID_REVISIT_UPGRADE_COST)
    $("#buyBotAvoidRevisit").prop("disabled", this.game.points.rngBotAvoidRevisit);
  }
  
  setPointsPerVisitUpgradeText() {
    const cost = this.game.points.getPointsPerVisitUpgradeCost();
    $("#buyPointsPerVisit").text("Points Per Visit: " + cost.toFixed(2));
  }

  initEventHooks() {
    $('#buyBotMoveFaster').click(() => { 
      this.game.points.buyRngMovementUpgrade();
    });
    $('#buyMazeSize').click(() => { 
      this.game.points.buyMazeSizeUpgrade();
    });
    $('#buyBotAvoidRevisit').click(() => { 
      this.game.points.buyBotAvoidRevisitUpgrade();
    });
    $('#buyPointsPerVisit').click(() => { 
      this.game.points.buyPointsPerVisitUpgrade();
    });
  }
}