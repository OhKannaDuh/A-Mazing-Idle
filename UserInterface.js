class UserInterface {
  constructor(game) {
      this.game = game;
  }

  init() {
    this.initText()
    this.initEventHooks();
  }

  initText() {
    console.log('init');
    this.setPointsText();
    this.setRngMovementUpgradeText();
    this.setMazeSizeUpgradeText();
    this.setPointsPerVisitUpgradeText();
    this.setBuyBotAvoidRevisitLastPositionUpgradeText();
    this.setBuyBotPrioritizeUnvisitedUpgradeText();
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

  setPointsPerVisitUpgradeText() {
    const cost = this.game.points.getPointsPerVisitUpgradeCost();
    $("#buyPointsPerVisit").text("Points Per Visit: " + cost.toFixed(2));
  }

  setBuyBotAvoidRevisitLastPositionUpgradeText() {
    $('#buyBotAvoidRevisitLastPosition').text('Basic Avoid Revisit: ' + BOT_AVOID_REVISIT_LAST_POSITION_UPGRADE_COST)
    $("#buyBotAvoidRevisitLastPosition").prop("disabled", this.game.points.rngBotAvoidRevisitLastPosition);
  }

  setBuyBotPrioritizeUnvisitedUpgradeText() {
    $('#buyBotPrioritizeUnvisited').text('Prioritize Unvisited: ' + BOT_PRIORITIZE_UNVISITED_UPGRADE_COST)
    $("#buyBotPrioritizeUnvisited").prop("disabled", this.game.points.rngBotPrioritizeUnvisited);
  }
  

  initEventHooks() {
    $('#buyBotMoveFaster').click(() => {
      this.game.points.buyRngMovementUpgrade();
      this.setRngMovementUpgradeText();
    });
    $('#buyMazeSize').click(() => {
      this.game.points.buyMazeSizeUpgrade();
      this.setMazeSizeUpgradeText();
    });
    $('#buyPointsPerVisit').click(() => {
      this.game.points.buyPointsPerVisitUpgrade();
      this.setPointsPerVisitUpgradeText();
    });
    $('#buyBotAvoidRevisitLastPosition').click(() => {
      this.game.points.buyBotAvoidRevisitLastPosition();
      this.setBuyBotAvoidRevisitLastPositionUpgradeText();
    });
    $('#buyBotPrioritizeUnvisited').click(() => {
      this.game.points.buyBotPrioritizeUnvisitedUpgrade();
      this.setBuyBotPrioritizeUnvisitedUpgradeText();
    });
  }
}