import MazeItem from 'items/MazeItem';
import { Tile } from 'managers/MazeManager';
import { generateTileKey, MazeDirectionIndex, MazeWallTypes } from 'managers/MazeUtils';

export class MazeCell {
  public x: number;
  public y: number;
  //Top Right Bottom Left
  public walls: [MazeWallTypes, MazeWallTypes, MazeWallTypes, MazeWallTypes];
  public isVisited: boolean;
	private _isCellDead: boolean;
	private mazeItem: MazeItem;
	private deadEndCellValue: number;

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

	public isMarkedAsDeadEnd(): boolean {
		return !!this.deadEndCellValue;
	}

	public getDeadEndCelLValue(): number {
		return this.deadEndCellValue;
	}

	public setDeadEndCellValue(deadEndCellValue): void {
		this.deadEndCellValue = deadEndCellValue;
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
		return this._isCellDead;
	}

	public setDeadCell(isDead: boolean = true): void {
		this._isCellDead = isDead;
		if (this._isCellDead) {
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
