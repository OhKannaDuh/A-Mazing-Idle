import { DEFAULT_COLORS } from "constants/ColorConstants";


class BiomeColorPalette {
  public playerColor: string;
  public botColor: string;
  public tileColor: string;
  public visitedTileColor: string;
  public mazeWallColor: string;
  public deadEndColor: string;
  public smartPathingPlayerColor: string;
  public multiplierItemPlayerColor: string;
  public unlimitedSplitBotPlayerColor: string;
  public ghostItemPlayerColor: string;

  constructor(playerColor: string, botColor: string, emptyColor: string, visitedTileColor: string, mazeWallColor: string,
      deadEndColor: string = DEFAULT_COLORS.DEAD_END_COLOR, 
      smartPathingPlayerColor: string = DEFAULT_COLORS.SMART_PATHING_PLAYER_COLOR,
      multiplierItemPlayerColor: string = DEFAULT_COLORS.MULTIPLIER_ITEM_PLAYER_COLOR,
      unlimitedSplitBotPlayerColor: string = DEFAULT_COLORS.UNLIMITED_SPLIT_BOT_PLAYER_COLOR,
      ghostItemPlayerColor: string = DEFAULT_COLORS.GHOST_ITEM_PLAYER_COLOR) {
    this.playerColor = playerColor;
    this.botColor = botColor;
    this.tileColor = emptyColor;
    this.visitedTileColor = visitedTileColor;
    this.mazeWallColor = mazeWallColor;
    this.deadEndColor = deadEndColor;
    this.smartPathingPlayerColor = smartPathingPlayerColor;
    this.multiplierItemPlayerColor = multiplierItemPlayerColor;
    this.unlimitedSplitBotPlayerColor = unlimitedSplitBotPlayerColor;
    this.ghostItemPlayerColor = ghostItemPlayerColor;
  }
}

export default BiomeColorPalette;
