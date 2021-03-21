import { Tile } from 'managers/MazeManager';
import { generateTileKey, MazeDirectionIndex, MazeWallTypes } from 'managers/MazeUtils';

export class MazeCell {
  public x: number;
  public y: number;
	public tile: Tile;
  //Top Right Bottom Left
  public walls: [MazeWallTypes, MazeWallTypes, MazeWallTypes, MazeWallTypes];
  public isVisited: boolean;
	private isDeadCell: boolean;

	constructor(x: number, y: number, isDeadCell: boolean = false) {
		this.x = x;
		this.y = y;
		this.tile = { x: x, y: y };
		this.walls = [MazeWallTypes.WALL, MazeWallTypes.WALL, MazeWallTypes.WALL, MazeWallTypes.WALL];
		this.isVisited = false;
		this.setDeadCell(isDeadCell);
	}

	public setWallTypeAtIndex(wallDirectionIndex: MazeDirectionIndex, wallType: MazeWallTypes): void {
		this.walls[wallDirectionIndex] = wallType;
	}

	public getTileKey(): string {
		return generateTileKey(this.x, this.y);
	}

	public setVisited(isVisited = true): void {
		this.isVisited = isVisited;
	}

	public isCellDead(): boolean {
		return this.isDeadCell;
	}

	public setDeadCell(isDead: boolean = true): void {
		this.isDeadCell = isDead;
		if (this.isDeadCell) {
			this.walls = [MazeWallTypes.OUT_OF_BOUNDS_WALL, MazeWallTypes.OUT_OF_BOUNDS_WALL, MazeWallTypes.OUT_OF_BOUNDS_WALL, MazeWallTypes.OUT_OF_BOUNDS_WALL];
		}
	}
}
