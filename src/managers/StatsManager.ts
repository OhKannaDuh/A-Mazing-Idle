import Game from "managers/Game";
import Serializable from "models/Serializable";
import { CURRENT_MAZE_STATS, StatsKey } from "models/Stats";

const DEFAULT_STAT_VALUE = 0;
const SERIALIZABLE_PROPERTIES: string[] = ['statsMap'];

class StatsManager extends Serializable {
  public statsMap: Map<StatsKey, number>;
  private game: Game;

  constructor(game: Game) {
    super(SERIALIZABLE_PROPERTIES);
    this.statsMap = new Map<StatsKey, number>();
    this.game = game;
  }

  public initStatsMap() {
    for (let statsKey in StatsKey) {
      this.statsMap.set(statsKey as StatsKey, DEFAULT_STAT_VALUE);
    }
    this.game.ui.updateAllStatsKey();
  }
  
  public clearCurrentMazeStats() {
    for (let currMazeStat of CURRENT_MAZE_STATS) {
      this.statsMap.set(currMazeStat as StatsKey, DEFAULT_STAT_VALUE);
    }
  }
  
  public getStat(statsKey: StatsKey): number {
    if (!this.hasMazeStat(statsKey)) return 0;
    return this.statsMap.get(statsKey);
  }

  public hasMazeStat(statsKey: StatsKey): boolean {
    return this.statsMap.has(statsKey);
  }

  public addStatsToKey(value: number, statsKey: StatsKey): void {
    const oldValue = this.getStat(statsKey);
    this.statsMap.set(statsKey, value + oldValue);

    this.game.ui.updateStatsKey(statsKey);
  }

  public setStatsToKey(value: number, statsKey: StatsKey): void {
    this.statsMap.set(statsKey, value);
    this.game.ui.updateStatsKey(statsKey);
  }
  
  public addStatsToKeyList(amount: number, statsKeyList: StatsKey[]): void {
    if (!statsKeyList) return;
    for (let statsKey of statsKeyList) {
      this.addStatsToKey(amount, statsKey as StatsKey);
    }
  }
}

export default StatsManager;
