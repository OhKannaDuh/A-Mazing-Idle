import { getBiomeColorPalette } from "constants/BiomeConstants";
import Game from "managers/Game";
import BiomeColorPalette from "models/BiomeColorPalette";


export class ColorManager {
  private game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  public getBiomeColorPalette(): BiomeColorPalette {
    const currentBiome = this.game.biomes.getCurrentBiomeKey();
    return getBiomeColorPalette(currentBiome);
  }

  public getPlayerColor(): string {
    return this.getBiomeColorPalette().playerColor;
  }

  public getBotColor(): string {
    return this.getBiomeColorPalette().botColor;
  }

  public getTileColor(): string {
    return this.getBiomeColorPalette().tileColor;
  }

  public getVisitedTileColor(): string {
    return this.getBiomeColorPalette().visitedTileColor;
  }

  public getMazeWallColor(): string {
    return this.getBiomeColorPalette().mazeWallColor;
  }
  
  public getDeadEndTileColor(): string {
    return this.getBiomeColorPalette().deadEndColor;
  }
  
  public getMultiplierItemPlayerColor(): string {
    return this.getBiomeColorPalette().multiplierItemPlayerColor;
  }

  public getUnlimitedSplitPlayerColor(): string {
    return this.getBiomeColorPalette().unlimitedSplitBotPlayerColor;
  }

  public getSmartPathingPlayerColor(): string {
    return this.getBiomeColorPalette().smartPathingPlayerColor;
  }

}
