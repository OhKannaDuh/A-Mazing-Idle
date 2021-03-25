import MazeItem from 'items/MazeItem';
import { Tile } from 'managers/MazeManager';
import { generateTileKey, MazeDirectionIndex, MazeWallTypes } from 'managers/MazeUtils';

export class MazeCell {
  public x: number;
  public y: number;
  //Top Right Bottom Left
  public walls: [MazeWallTypes, MazeWallTypes, MazeWallTypes, MazeWallTypes];
  public isVisited: boolean;
	private isDeadCell: boolean;
	private mazeItem: MazeItem;

	constructor(x: number, y: number, isDeadCell: boolean = false) {
		this.x = x;
		this.y = y;
		this.walls = [MazeWallTypes.WALL, MazeWallTypes.WALL, MazeWallTypes.WALL, MazeWallTypes.WALL];
		this.isVisited = false;
		this.setDeadCell(isDeadCell);
	}

	public setWallTypeAtIndex(wallDirectionIndex: MazeDirectionIndex, wallType: MazeWallTypes): void {
		this.walls[wallDirectionIndex] = wallType;
	}

	public getTile(): Tile {
		return { x: this.x, y: this.y };
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

	public getMazeItem(): MazeItem {
		return this.mazeItem;
	}
	
	public setMazeItem(mazeItem: MazeItem): void {
		this.mazeItem = mazeItem;
	}

	public hasMazeItem(): boolean {
		return this.mazeItem != null;
	}

	public deleteItem(): void {
		if (!this.hasMazeItem()) {
			return;
		}
		this.mazeItem = null;
	}
}
