
const BOT_PRIORITIZE_UNVISITED_UPGRADE_COST = 500;
const BOT_AVOID_REVISIT_LAST_POSITION_UPGRADE_COST = 1000;
const BOT_AUTO_EXIT_MAZE_UPGRADE_COST = 250;
const BOT_ALLOW_PLAYER_TO_MOVE_INDEPENDENTLY_UPGRADE_COST = 1500;

const BOT_TELEPORT_PLAYER_BACK_TO_BOT_UPGRADE_COST = 1000;
const BOT_TELEPORT_BOT_BACK_TO_PLAYER_UPGRADE_COST = 1000;

const BOT_SPLIT_DIRECTION_UPGRADE_BASE_COST = 1000;
const BOT_SPLIT_DIRECTION_UPGRADE_BASE_MULTIPLIER = 5;

const BOT_SPLIT_BOT_AUTO_MERGE_UPGRADE_COST = 50000;

const TILE_REVISIT_MULTIPLIER = 0;

const MAZE_COMPLETION_BONUS_BASE_MULTIPLIER = 0.1;
const MAZE_COMPLETION_BONUS_UPGRADE_SIZE_MULTIPLIER = 1.1;
const MAZE_COMPLETION_BONUS_UPGRADE_BASE_COST = 100;
const MAZE_COMPLETION_UPGRADE_BASE_COST_MULTIPLIER = 2;

const BOT_MOVEMENT_UPGRADE_BASE_COST = 10;
const BOT_MOVEMENT_UPGRADE_BASE_COST_MUTLIPLIER = 1.1;

const BOT_REMEMBER_DEADEND_TILES_UPGRADE_BASE_COST = 1000;
const BOT_REMEMBER_DEADEND_TILES_UPGRADE_BASE_COST_MULTIPLIER = 3;

const MAZE_SIZE_UPGRADE_BASE_COST = 100;
const MAZE_SIZE_UPGRADE_BASE_COST_MULTIPLIER = 4;

const POINTS_PER_VISIT_UPGRADE_BASE_COST = 10;
const POINTS_PER_VISIT_UPGRADE_BASE_COST_MULTIPLIER = 2;
const POINTS_PER_VISIT_UPGRADE_MULTIPLIER = 1.1;
const POINTS_PER_VISIT_BASE_AMOUNT = 1;
const POINTS_PER_VISIT_BASE_AMOUNT_MULTIPLIER = 1.1

const FRUIT_SPAWN_UPGRADE_BASE_COST = 10;
const FRUIT_SPAWN_UPGRADE_BASE_COST_MULTIPLIER = 2;
const FRUIT_SPAWN_BASE_PROBABILITY = .01;

const FRUIT_PICKUP_POINTS_UPGRADE_BASE_COST = 10;
const FRUIT_PICKUP_POINTS_UPGRADE_BASE_COST_MULTIPLIER = 2;
const FRUIT_PICKUP_POINTS_BASE_AMOUNT = 10;
const FRUIT_PICKUP_POINTS_BASE_AMOUNT_MULTIPLIER = 1.2;


class Points {
    constructor(game, isDevMode = false) {
        this.game = game;
        this.isDevMode = isDevMode;
        this.points = 0.0;

        this.mazeSizeUpgradeCount = 0;
        this.mazeCompletionBonusUpgradeCount = 0;
        this.pointsPerVisitUpgradeCount = 0;
        this.rngMovementSpeedUpgrades = 0;

        this.rngBotPrioritizeUnvisited = false;
        this.rngBotAvoidRevisitLastPosition = false;
        this.rngBotAutoExitMaze = false;
        this.rngBotAllowPlayerToMoveIndependently = false;
        this.rngBotRememberDeadEndTilesUpgrades = 0;
        this.rngBotSplitDirectionUpgrades = 0;
        this.rngBotSplitBotAutoMerge = true;
        this.rngBotTeleportPlayerBackToBot = false;
        this.rngBotTeleportBotBackToPlayer = false;
        
        this.fruitSpawnRateUpgrades = 0;
        this.fruitPickupPointsUpgrades = 0;
    }

    addPoints(amount) {
        this.points += amount;
        this.game.ui.setPointsText();
    }

    canAffordPointsAmount(cost) {
        if (IS_FREE_MODE_ENABLED) return true;
        return cost <= this.points;
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

    /* Auto-exit maze if beside maze exit */
    buyBotAutoExitMazeUpgrade() {
        const cost = BOT_AUTO_EXIT_MAZE_UPGRADE_COST
        if (!this.canAffordPointsAmount(cost)) {
            return;
        }
        this.rngBotAutoExitMaze = true;
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
    
    /* Player move independently */
    buyPlayerMoveIndependently() {
        const cost = BOT_ALLOW_PLAYER_TO_MOVE_INDEPENDENTLY_UPGRADE_COST;
        if (!this.canAffordPointsAmount(cost)) {
            return;
        }
        this.game.points.addPoints(-cost);
        this.rngBotAllowPlayerToMoveIndependently = true;
    }

    getRngMovementUpgradeCost() {
        return BOT_MOVEMENT_UPGRADE_BASE_COST * Math.pow(BOT_MOVEMENT_UPGRADE_BASE_COST_MUTLIPLIER, this.rngMovementSpeedUpgrades);
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

    /* Rng bot teleport to player  */
    buyBotTeleportBackToPlayer() {
        const cost = BOT_TELEPORT_BOT_BACK_TO_PLAYER_UPGRADE_COST;
        if (!this.canAffordPointsAmount(cost)) {
            return;
        }
        this.game.points.addPoints(-cost);
        this.rngBotTeleportBotBackToPlayer = true;
    }

    /* Rng player teleport to bot  */
    buyPlayerTeleportBackToBot() {
        const cost = BOT_TELEPORT_PLAYER_BACK_TO_BOT_UPGRADE_COST;
        if (!this.canAffordPointsAmount(cost)) {
            return;
        }
        this.game.points.addPoints(-cost);
        this.rngBotTeleportPlayerBackToBot = true;
    }

    /* Rng bot split directions */
    buyBotSplitUpgrade() {
        const cost = this.getTileSplitUpgradeCost();
        if (!this.canAffordPointsAmount(cost)) {
            return;
        }
        this.game.points.addPoints(-cost);
        this.rngBotSplitDirectionUpgrades++;
    }

    getTileSplitUpgradeCost() {
        return BOT_SPLIT_DIRECTION_UPGRADE_BASE_COST * Math.pow(BOT_SPLIT_DIRECTION_UPGRADE_BASE_MULTIPLIER, this.rngBotSplitDirectionUpgrades);
    }

    /* Rng split bot auto merge upgrade */
    buySplitBotAutoMergeUpgrade() {
        const cost = this.getSplitBotAutoMergeUpgradeCost();
        if (!this.canAffordPointsAmount(cost)) {
            return;
        }
        this.game.points.addPoints(-cost);
        this.rngBotSplitBotAutoMerge = true;
    }
    
    getSplitBotAutoMergeUpgradeCost() {
        return BOT_SPLIT_BOT_AUTO_MERGE_UPGRADE_COST;
    }

    /* Rng bot movement faster */
    buyRngMovementUpgrade() {
        const cost = this.getRngMovementUpgradeCost();
        if (!this.canAffordPointsAmount(cost)) {
            return;
        }
        this.game.points.addPoints(-cost);
        this.rngMovementSpeedUpgrades++;
    }

    getRngMovementUpgradeCost() {
        return BOT_MOVEMENT_UPGRADE_BASE_COST * Math.pow(BOT_MOVEMENT_UPGRADE_BASE_COST_MUTLIPLIER, this.rngMovementSpeedUpgrades);
    }
    
    /* Rng bot movement faster */
    buyRngRememberDeadEndTilesUpgrade() {
        const cost = this.getRngRememberDeadEndTilesUpgradeCost();
        if (!this.canAffordPointsAmount(cost)) {
            return;
        }
        this.game.points.addPoints(-cost);
        this.rngBotRememberDeadEndTilesUpgrades++;
    }

    getRngRememberDeadEndTilesUpgradeCost() {
        return BOT_REMEMBER_DEADEND_TILES_UPGRADE_BASE_COST * Math.pow(BOT_REMEMBER_DEADEND_TILES_UPGRADE_BASE_COST_MULTIPLIER, this.rngBotRememberDeadEndTilesUpgrades);
    }

    /* Fruit spawn rate */
    getFruitSpawnProbability() {
        // 1% increase per upgrade
        return FRUIT_SPAWN_BASE_PROBABILITY * (1 + this.fruitSpawnRateUpgrades);
    }

    buyFruitSpawnRateUpgrade() {
        const cost = this.getFruitSpawnRateUpgradeCost();
        if (!this.canAffordPointsAmount(cost)) {
            return;
        }
        this.game.points.addPoints(-cost);
        this.fruitSpawnRateUpgrades++;
    }
    
    getFruitSpawnRateUpgradeCost() {
        return FRUIT_SPAWN_UPGRADE_BASE_COST * Math.pow(FRUIT_SPAWN_UPGRADE_BASE_COST_MULTIPLIER, this.fruitSpawnRateUpgrades);
    }

    /* Fruit points upgrade */
    buyFruitPickupPointsUpgrade() {
        const cost = this.getFruitPickupPointsUpgradeCost();
        if (!this.canAffordPointsAmount(cost)) {
            return;
        }
        this.game.points.addPoints(-cost);
        this.fruitPickupPointsUpgrades++;
    }
    
    getFruitPickupPointsUpgradeCost() {
        return FRUIT_PICKUP_POINTS_UPGRADE_BASE_COST * Math.pow(FRUIT_PICKUP_POINTS_UPGRADE_BASE_COST_MULTIPLIER, this.fruitPickupPointsUpgrades);
    }

    getFruitPickupPointsAmount() {
        return FRUIT_PICKUP_POINTS_BASE_AMOUNT * Math.pow(FRUIT_PICKUP_POINTS_BASE_AMOUNT_MULTIPLIER, this.fruitPickupPointsUpgrades);
    }
    
    addFruitPickupPoints() {
        const points = this.getFruitPickupPointsAmount();
        this.addPoints(points);
    }

    /* Maze Completion Bonus */
    buyMazeCompletionUpgrade() {
        const cost = this.getMazeCompletionUpgradeCost();
        if (!this.canAffordPointsAmount(cost)) {
            return;
        }
        this.game.points.addPoints(-cost);
        this.mazeCompletionBonusUpgradeCount++;
    }

    getMazeCompletionUpgradeCost() {
        return MAZE_COMPLETION_BONUS_UPGRADE_BASE_COST * Math.pow(MAZE_COMPLETION_UPGRADE_BASE_COST_MULTIPLIER, this.mazeCompletionBonusUpgradeCount);
    }

    addMazeCompletionBonus() {
        const bonus = this.getMazeCompletionBonus();
        this.addPoints(bonus);
    }

    getMazeCompletionBonus() {
        const tileCount = this.game.maze.getTileCount();
        return tileCount * (1 + MAZE_COMPLETION_BONUS_BASE_MULTIPLIER * this.mazeCompletionBonusUpgradeCount);
    }
}
