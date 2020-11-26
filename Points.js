

const TILE_VISIT_BASE_POINTS = 1;
const TILE_REVISIT_MULTIPLIER = 0;
const MAZE_COMPLETION_SIZE_MULTIPLIER = 1;

const MAZE_SIZE_UPGRADE_COST = 10;

class Points {
    constructor(game) {
        this.game = game;
        this.points = 0;
    }

    addPoints(amount) {
        this.points += amount;
        this.points = Math.floor(this.points);
        $('#points').text('Points: ' + this.points.toString());
    }

    canAffordPointsAmount(cost) {
        return cost <= this.points;
    }

    addVisitPoints(isVisitedAlready) {
        let bonus = TILE_VISIT_BASE_POINTS;
        if (isVisitedAlready) {
            bonus *= TILE_REVISIT_MULTIPLIER;
        }
        this.addPoints(bonus);
    }

    addMazeCompletionBonus() {
        const tileCount = this.game.maze.getTileCount();
        const bonus = tileCount * MAZE_COMPLETION_SIZE_MULTIPLIER;
        this.addPoints(bonus);
    }

    buyMazeSizeUpgrade() {
        if (this.game.points.canAffordPointsAmount(MAZE_SIZE_UPGRADE_COST))
        this.increaseMazeSize();
        this.addPoints(-MAZE_SIZE_UPGRADE_COST);
    }

    increaseMazeSize() {
        $('#points').text('Increase Maze Size: ' + MAZE_SIZE_UPGRADE_COST.toString());
        this.game.maze.mazeSize++;
    }
}
