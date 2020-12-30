import Game from "../Game";
import { Tile } from "../Maze";


class Player {
  private game: Game;
  public id: number;
  public currTile: Tile;
  public prevTile: Tile;
  public isManuallyControlled: boolean;
  public moveCount: number;

  constructor(game: Game, id: number, currTile = null, prevTile = null, isManuallyControlled = false, moveCount = 0) {
    this.game = game;
    this.isManuallyControlled = isManuallyControlled;
    this.id = id;
    this.currTile = currTile;
    this.prevTile = prevTile;
    this.moveCount = 0;
  }
}

export default Player;
