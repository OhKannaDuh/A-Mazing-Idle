import Game from "managers/Game";
import { StatsKey } from "models/Stats";


const SLIDING_WINDOW_LENGTH = 40;

export class PointsHistoryTracker {

  private currIndex: number = 0;
  private timer: any;
  private slidingWindow: Array<number>;
  private currentTotal: number;
  private currentDataPoints: number;
  private game: Game;
  private statsKey: StatsKey;

  constructor(game: Game, statsKey: StatsKey) {
    this.game = game;
    this.statsKey = statsKey;
    this.resetHistory();
  }
  
  public resetHistory(): void {
    this.slidingWindow = new Array(SLIDING_WINDOW_LENGTH).fill(0);
    this.currentTotal = 0;
    this.currentDataPoints = 0;
    this.currIndex = 0;
    clearInterval(this.timer);
  }

  private startTimer() {
    this.timer = setInterval(() => {
      // Add total from previous second.
      const prevIndex = this.currIndex;
      const nextIndex = this.getNextIndex();
      
      // Add most recently completed bucket
      this.currentTotal += this.slidingWindow[prevIndex];

      // Subtract the new bucket indexes total and zero it out
      this.currentTotal -= this.slidingWindow[nextIndex];
      this.slidingWindow[nextIndex] = 0;

      // Update index after the fact.
      this.currIndex = nextIndex;

      // Update average
      this.updateStatsAverage();
      
      // Keep track of current points -- always short 1 data point from max
      this.currentDataPoints = (this.currentDataPoints + 1) < this.slidingWindow.length
        ? this.currentDataPoints + 1
        : this.slidingWindow.length - 1
    }, 1000);
  }

  private getNextIndex(): number {
    return (++this.currIndex) === this.slidingWindow.length
      ? 0
      : this.currIndex;
  }

  private updateStatsAverage(): void {
    const average = this.getAverage();
    this.game.stats.setStatsToKey(average, this.statsKey)
  }

  private getAverage(): number {
    if (this.currentDataPoints === 0) return 0;
    return this.currentTotal / this.currentDataPoints;
  }

  public addNumber(value: number): void {
    if (!this.timer) {
      this.startTimer();
    }
    
    this.slidingWindow[this.currIndex] += value;
  }
}
