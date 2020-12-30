import { IS_FREE_MODE_ENABLED } from "../dev/devUtils";
import Game from "../Game";
import { FRUIT_PICKUP_POINTS_BASE_AMOUNT, 
    FRUIT_PICKUP_POINTS_BASE_AMOUNT_MULTIPLIER, FRUIT_SPAWN_BASE_PROBABILITY, 
    MAZE_COMPLETION_BONUS_BASE_MULTIPLIER, POINTS_PER_VISIT_BASE_AMOUNT, 
    POINTS_PER_VISIT_BASE_AMOUNT_MULTIPLIER, TILE_REVISIT_MULTIPLIER, 
    UpgradeKey 
} from "../upgrades/UpgradeConstants";
import Serializable from "../models/Serializable";


class Points extends Serializable {
    public game: Game;
    public isDevMode: boolean;
    public points: number;

    constructor(game: Game, isDevMode = false) {
        super(['points']);
        this.game = game;
        this.isDevMode = isDevMode;
        this.points = 0.0;
    }
    
    addPoints(amount) {
        this.points += amount;
        this.game.ui.setPointsText();
    }

    canAffordPointsAmount(cost) {
        if (IS_FREE_MODE_ENABLED) return true;
        return cost <= this.points;
    }

    getPointsPerVisit(isVisitedAlready) {
        const upgradeLevel = this.game.upgrades.getUpgradeLevel(UpgradeKey.POINTS_PER_VISIT)
        let bonus = Math.round(100 * POINTS_PER_VISIT_BASE_AMOUNT * Math.pow(POINTS_PER_VISIT_BASE_AMOUNT_MULTIPLIER, upgradeLevel)) / 100;
        
        if (isVisitedAlready) {
            bonus *= TILE_REVISIT_MULTIPLIER;
        }
        return bonus;
    }

    addVisitPoints(isVisitedAlready) {
        let points = this.getPointsPerVisit(isVisitedAlready);
        this.addPoints(points);
    }

    getFruitSpawnProbability() {
        // 1% increase per upgrade
        const upgradeLevel = this.game.upgrades.getUpgradeLevel(UpgradeKey.FRUIT_SPAWN);
        return FRUIT_SPAWN_BASE_PROBABILITY * (1 + upgradeLevel);
    }

    getFruitPickupPointsAmount() {
        const upgradeLevel = this.game.upgrades.getUpgradeLevel(UpgradeKey.FRUIT_PICKUP_POINTS);
        return FRUIT_PICKUP_POINTS_BASE_AMOUNT * Math.pow(FRUIT_PICKUP_POINTS_BASE_AMOUNT_MULTIPLIER, upgradeLevel);
    }
    
    addFruitPickupPoints() {
        const points = this.getFruitPickupPointsAmount();
        this.addPoints(points);
    }

    addMazeCompletionBonus() {
        const bonus = this.getMazeCompletionBonus();
        this.addPoints(bonus);
    }

    getMazeCompletionBonus() {
        const tileCount = this.game.maze.getTileCount();
        const upgradeLevel = this.game.upgrades.getUpgradeLevel(UpgradeKey.MAZE_COMPLETION_BONUS);
        return tileCount * (1 + MAZE_COMPLETION_BONUS_BASE_MULTIPLIER * upgradeLevel);
    }
}

export default Points;