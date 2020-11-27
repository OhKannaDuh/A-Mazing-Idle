

const BOT_AVOID_REVISIT_LAST_POSITION_UPGRADE_COST = 100;
const BOT_PRIORITIZE_UNVISITED_UPGRADE_COST = 100;

const TILE_REVISIT_MULTIPLIER = 0;

const MAZE_COMPLETION_SIZE_MULTIPLIER = 1.1;

const BOT_MOVEMENT_BASE_COST = 10;
const BOT_MOVEMENT_BASE_COST_MUTLIPLIER = 1.1;

const MAZE_SIZE_UPGRADE_BASE_COST = 10;
const MAZE_SIZE_UPGRADE_BASE_COST_MULTIPLIER = 10;
const MAZE_SIZE_UPGRADE_MULTIPLIER = 1.1;

const POINTS_PER_VISIT_UPGRADE_BASE_COST = 10;
const POINTS_PER_VISIT_UPGRADE_BASE_COST_MULTIPLIER = 10;
const POINTS_PER_VISIT_UPGRADE_MULTIPLIER = 1.1;
const POINTS_PER_VISIT_BASE_AMOUNT = 1;
const POINTS_PER_VISIT_BASE_AMOUNT_MULTIPLIER = 1.1

class Points {
    constructor(game) {
        this.game = game;
        this.points = 0.0;

        this.mazeSizeUpgradeCount = 0;
        this.pointsPerVisitUpgradeCount = 0;
        this.rngBotPrioritizeUnvisited = false;
        this.rngBotAvoidRevisitLastPosition = false;
        this.rngMovementSpeedUpgrades = 0;
    }

    addPoints(amount) {
        this.points += amount;
        this.game.ui.setPointsText();
    }

    canAffordPointsAmount(cost) {
        return true;
        // return cost <= this.points;
    }

    addMazeCompletionBonus() {
        const tileCount = this.game.maze.getTileCount();
        const bonus = tileCount * MAZE_COMPLETION_SIZE_MULTIPLIER;
        this.addPoints(bonus);
    }

    /* Maze size upgrade */
    getMazeSizeUpgradeCost() {
        return MAZE_SIZE_UPGRADE_BASE_COST * Math.pow(MAZE_SIZE_UPGRADE_BASE_COST_MULTIPLIER, this.mazeSizeUpgradeCount);
    }

    buyMazeSizeUpgrade() {
        const cost = this.getMazeSizeUpgradeCost();
        if (!this.canAffordPointsAmount(cost)) {
            return;
        }
        
        this.addPoints(-cost);
        this.mazeSizeUpgradeCount++;
    }

    /* Bot prioritize unvisited */
    buyBotPrioritizeUnvisitedUpgrade() {
        const cost = BOT_PRIORITIZE_UNVISITED_UPGRADE_COST;
        if (!this.canAffordPointsAmount(cost)) {
            return;
        }
        this.rngBotPrioritizeUnvisited = true;
        this.addPoints(-cost);
    }
    
    /* Bot avoid backtrack pathing */
    buyBotAvoidRevisitLastPosition() {
        const cost = BOT_AVOID_REVISIT_LAST_POSITION_UPGRADE_COST;
        if (!this.canAffordPointsAmount(cost)) {
            return;
        }
        this.rngBotAvoidRevisitLastPosition = true;
        this.addPoints(-cost);
    }

    /* Points per visit */
    buyPointsPerVisitUpgrade() {
        const cost = this.getPointsPerVisitUpgradeCost();
        if (!this.canAffordPointsAmount(cost)) {
            return;
        }
        this.addPoints(-cost);
        this.pointsPerVisitUpgradeCount++;
    }

    getPointsPerVisitUpgradeCost() {
        return POINTS_PER_VISIT_UPGRADE_BASE_COST * Math.pow(POINTS_PER_VISIT_UPGRADE_BASE_COST_MULTIPLIER, this.pointsPerVisitUpgradeCount);
    }

    getPointsPerVisit(isVisitedAlready) {
        let bonus = Math.round(100 * POINTS_PER_VISIT_BASE_AMOUNT * Math.pow(POINTS_PER_VISIT_BASE_AMOUNT_MULTIPLIER, this.pointsPerVisitUpgradeCount)) / 100;
        
        if (isVisitedAlready) {
            bonus *= TILE_REVISIT_MULTIPLIER;
        }
        return bonus;
    }

    addVisitPoints(isVisitedAlready) {
        let points = this.getPointsPerVisit(isVisitedAlready);
        this.addPoints(points);
    }

    /* Rng bot movement faster */
    buyRngMovementUpgrade() {
        const cost = this.getRngMovementUpgradeCost();
        if (!this.canAffordPointsAmount(cost)) {
            return;
        }
        this.game.points.addPoints(-cost);
        this.rngMovementSpeedUpgrades++;

        // Reset movement speed of current interval.
        this.game.rngBot.disableRngBot();
        this.game.rngBot.enableRngBot();
    }

    getRngMovementUpgradeCost() {
        return BOT_MOVEMENT_BASE_COST * Math.pow(BOT_MOVEMENT_BASE_COST_MUTLIPLIER, this.rngMovementSpeedUpgrades);
    }
}
