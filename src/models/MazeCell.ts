import { Tile } from 'managers/MazeManager';
import { MazeDirectionIndex, MazeWallTypes } from 'managers/MazeUtils';

export class MazeCell {
  public x: number;
  public y: number;
	public tile: Tile;
  //Top Right Bottom Left
  public walls: [MazeWallTypes, MazeWallTypes, MazeWallTypes, MazeWallTypes];
  public isVisited: boolean;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.tile = { x: x, y: y };
		this.walls = [MazeWallTypes.WALL, MazeWallTypes.WALL, MazeWallTypes.WALL, MazeWallTypes.WALL]; 
		this.isVisited = false;
	}

	public setWallTypeAtIndex(wallDirectionIndex: MazeDirectionIndex, wallType: MazeWallTypes) {
		this.walls[wallDirectionIndex] = wallType;
	}
}
