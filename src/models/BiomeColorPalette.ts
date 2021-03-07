import { DEFAULT_DEAD_END_COLOR, DEFAULT_MULTIPLIER_ITEM_PLAYER_COLOR, DEFAULT_SMART_PATHING_PLAYER_COLOR } from "../constants/ColorConstants";


class BiomeColorPalette {
  public playerColor: string;
  public botColor: string;
  public tileColor: string;
  public visitedTileColor: string;
  public mazeWallColor: string;
  public deadEndColor: string;
  public smartPathingPlayerColor: string;
  public multiplierItemPlayerColor: string;

  constructor(playerColor: string, botColor: string, emptyColor: string, visitedTileColor: string, mazeWallColor: string,
      deadEndColor: string = DEFAULT_DEAD_END_COLOR, 
      smartPathingPlayerColor: string = DEFAULT_SMART_PATHING_PLAYER_COLOR,
      multiplierItemPlayerColor: string = DEFAULT_MULTIPLIER_ITEM_PLAYER_COLOR) {
    this.playerColor = playerColor;
    this.botColor = botColor;
    this.tileColor = emptyColor;
    this.visitedTileColor = visitedTileColor;
    this.mazeWallColor = mazeWallColor;
    this.deadEndColor = deadEndColor;
    this.smartPathingPlayerColor = smartPathingPlayerColor;
    this.multiplierItemPlayerColor = multiplierItemPlayerColor;
  }
}

export default BiomeColorPalette;
