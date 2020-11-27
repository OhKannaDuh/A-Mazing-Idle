
const TABLE_ID = 'maze';
const FILLED_COLOR = '#000000';
const EMPTY_COLOR = '#FFFFFF';



const DIRECTION_UP = {x: 0, y: -1};
const DIRECTION_DOWN = {x: 0, y: 1};
const DIRECTION_LEFT = {x: -1, y: 0};
const DIRECTION_RIGHT = {x: 1, y: 0};

const STARTING_POSITION = {x: 0, y: 0};

const TOP = 0;
const RIGHT = 1
const BOTTOM = 2;
const LEFT = 3;
const WALL = 0;
const NO_WALL = 1;

const DEFAULT_MAZE_SIZE = 4;

const VISITED_TILE_COLOR = '#7CFCFF';

class MazeGenerator {
    constructor(game) {
        this.game = game;
        this.maze = null;
        this.visitedMaze = null;
        this.rngBot = new RNGBot();
        //TODO: this should be a coordinate.
        this.curr_x = 0;
        this.curr_y = 0;
        //TODO: this should be an arr of prev locations
        this.prev_x = null;
        this.prev_y = null;
    }

    getMazeSize() {
        return DEFAULT_MAZE_SIZE + this.game.points.mazeSizeUpgradeCount;
    }
    
    newMaze() {
        const x = this.getMazeSize();
        const y = this.getMazeSize();

        this.visitedMaze = new Array();
        for (var i = 0; i < y; i++) {
            this.visitedMaze[i] = new Array();
            for (var j = 0; j < x; j++) {
                this.visitedMaze[i][j] = false;
            }
        }
        
        // Establish variables and starting grid
        var totalCells = x * y;
        var cells = new Array();
        var unvis = new Array();
        for (var i = 0; i < y; i++) {
            cells[i] = new Array();
            unvis[i] = new Array();
            for (var j = 0; j < x; j++) {
                cells[i][j] = [0,0,0,0];
                unvis[i][j] = true;
            }
        }
        
        // Set a random position to start from
        var currentCell = [Math.floor(Math.random()*y), Math.floor(Math.random()*x)];
        var path = [currentCell];
        unvis[currentCell[0]][currentCell[1]] = false;
        var visited = 1;
        
        // Loop through all available cell positions
        while (visited < totalCells) {
            // Determine neighboring cells
            var pot = [[currentCell[0]-1, currentCell[1], 0, 2],
                    [currentCell[0], currentCell[1]+1, 1, 3],
                    [currentCell[0]+1, currentCell[1], 2, 0],
                    [currentCell[0], currentCell[1]-1, 3, 1]];
            var neighbors = new Array();
            
            // Determine if each neighboring cell is in game grid, and whether it has already been checked
            for (var l = 0; l < 4; l++) {
                if (pot[l][0] > -1 && pot[l][0] < y && pot[l][1] > -1 && pot[l][1] < x && unvis[pot[l][0]][pot[l][1]]) { neighbors.push(pot[l]); }
            }
            
            // If at least one active neighboring cell has been found
            if (neighbors.length) {
                // Choose one of the neighbors at random
                const next = neighbors[Math.floor(Math.random()*neighbors.length)];
                
                // Remove the wall between the current cell and the chosen neighboring cell
                cells[currentCell[0]][currentCell[1]][next[2]] = NO_WALL;
                cells[next[0]][next[1]][next[3]] = NO_WALL;
                
                // Mark the neighbor as visited, and set it as the current cell
                unvis[next[0]][next[1]] = false;
                visited++;
                currentCell = [next[0], next[1]];
                path.push(currentCell);
            }
            // Otherwise go back up a step and keep going
            else {
                currentCell = path.pop();
            }
        }

        // Set entrance/exit
        // cells[0][0][LEFT] = NO_WALL;
        cells[x-1][y-1][RIGHT] = NO_WALL;

        // Store result instead of just using it all along.  Yep.
        this.maze = cells;
    }

    markVisited(x, y) {
        this.game.points.addVisitPoints(this.isVisited(x, y));
        
        this.visitedMaze[y][x] = true;
        this.setTileBackgroundColor(this.curr_x, this.curr_y, VISITED_TILE_COLOR);
    }

    isVisited(x, y) {
        return this.visitedMaze[y][x];
    }

    deleteMaze() {
        $("#maze td").remove();
        $("#maze tr").remove();
    }

    printMaze() {
        var disp = this.maze;
        for (var y = 0; y < disp.length; y++) {
            $('#maze > tbody').append("<tr>");
            for (var x = 0; x < disp[y].length; x++) {
                
                var selector = this.generateTileKey(x, y);
                
                $('#maze > tbody').append(`<td id='${selector}'>&nbsp;</td>`);
                if (disp[y][x][0] == WALL) $('#' + selector).css('border-top', '2px solid black');
                if (disp[y][x][1] == WALL) { $('#'+selector).css('border-right', '2px solid black'); }
                if (disp[y][x][2] == WALL) { $('#'+selector).css('border-bottom', '2px solid black'); }
                if (disp[y][x][3] == WALL) { $('#'+selector).css('border-left', '2px solid black'); }
            }
            
            $('#maze > tbody').append("</tr>");
        }
    }

    setTileBackgroundColor(x, y, color) {
        const new_tile_key = this.generateTileKey(x, y);
        $(`#${new_tile_key}`).css('background-color', color);
    }

    getTileCount() {
        return this.maze.length * this.maze[0].length;
    }
    
    movePlayer(dir_vector, isManual=false) {
        // Reset timer for auto-moves
        if (isManual) {
            this.game.rngBot.manualMovementCancelRngBot();
        }
        if (!this.canMove(this.curr_x, this.curr_y, dir_vector)) {
            return;
        }
        
        this.updatePlayerTile(dir_vector);
        
        if (this.didPlayerExitMaze()) {
            this.game.completeMaze();
        }
    }
    
    updatePlayerTile(dir_vector) {
        this.setTileBackgroundColor(this.curr_x, this.curr_y, VISITED_TILE_COLOR);
        const currTile = this.getNewTilePositionByVector(dir_vector);
        this.prevTile = { x: this.curr_x, y: this.curr_y };

        this.curr_x = currTile.x;
        this.curr_y = currTile.y;
        
        this.markVisited(this.curr_x, this.curr_y);
        this.setTileBackgroundColor(this.curr_x, this.curr_y, FILLED_COLOR);
    }

    getNewTilePositionByVector(vector) {
        return { x: this.curr_x + vector.x, y: this.curr_y + vector.y };
    }

    getPreviousTile() {
        return this.prevTile;
    }

    generateTileKey(x, y) {
        return `${x}-${y}`;
    }

    canMove(tile_x, tile_y, dir_vector) {
        if (dir_vector === DIRECTION_UP) {
            return this.maze[tile_y][tile_x][TOP];
        }
        else if (dir_vector === DIRECTION_DOWN) {
            return this.maze[tile_y][tile_x][BOTTOM];
        }
        else if (dir_vector === DIRECTION_LEFT) {
            return this.maze[tile_y][tile_x][LEFT];
        }
        else if (dir_vector === DIRECTION_RIGHT) {
            return this.maze[tile_y][tile_x][RIGHT];
        }
        
        return false;
    }

    didPlayerExitMaze() {
        return this.curr_x >= this.maze[0].length || this.curr_y >= this.maze.length;
    }

    getValidDirections() {
        const valid_dirs_arr = [];
        if (this.canMove(this.curr_x, this.curr_y, DIRECTION_UP)) {
            valid_dirs_arr.push(DIRECTION_UP);
        }
        if (this.canMove(this.curr_x, this.curr_y, DIRECTION_DOWN)) {
            valid_dirs_arr.push(DIRECTION_DOWN);
        }
        if (this.canMove(this.curr_x, this.curr_y, DIRECTION_LEFT)) {
            valid_dirs_arr.push(DIRECTION_LEFT);
        }
        if (this.canMove(this.curr_x, this.curr_y, DIRECTION_RIGHT)) {
            valid_dirs_arr.push(DIRECTION_RIGHT);
        }
        return valid_dirs_arr;
    }

    resetPlayer() {
        this.prev_x = null;
        this.prev_y = null;
        this.curr_x = 0;
        this.curr_y = 0;
        this.movePlayer(STARTING_POSITION);
        this.setTileBackgroundColor(this.curr_x, this.curr_y, FILLED_COLOR);
    }
}
