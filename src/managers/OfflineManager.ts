import { Serializable } from "models/Serializable";
import { StatsKey } from "models/Stats";
import Game from "./Game";
import { ModalType, UserInterface } from "./UserInterface";

const SERIALIZABLE_PROPERTIES: string[] = ['saveTimeStamp', 'offlinePointsPerSecond'];
const MAX_OFFLINE_TIME_IN_MS: number = 0; // (60 * 60 * 1000);
const MIN_TIME_FOR_BANNER_MS: number = (99999999999);

export class OfflineManager extends Serializable {
  private game: Game;
  private saveTimeStamp: number;
  private offlinePointsPerSecond: number;

  constructor(game: Game) {
    super(SERIALIZABLE_PROPERTIES);
    this.game = game;
  }

  public processOfflinePoints(): void {
    const offlinePointsEarned = this.calculateOfflinePoints();
    // Ignore points history
    this.game.points.addPoints(offlinePointsEarned, null, null, true);
    if (this.shouldShowOfflineModal()) {
      this.game.ui.showModalByType(ModalType.OFFLINE_SCORE_MODAL);
    }
  }

  private shouldShowOfflineModal() {
    const offlineTimeDiffInMs = this.getUTCTimeStampInMs() - this.saveTimeStamp;
    return offlineTimeDiffInMs > MIN_TIME_FOR_BANNER_MS;
  }

  private calculateOfflinePoints(): number {
    const offlineTimeDiffInMs = this.getUTCTimeStampInMs() - this.saveTimeStamp;
    const allowedOfflineTimeInMs = Math.min(offlineTimeDiffInMs, MAX_OFFLINE_TIME_IN_MS);
    const offlinePointsEarned = this.offlinePointsPerSecond * (allowedOfflineTimeInMs / 1000);
    this.updateOfflineModal(offlineTimeDiffInMs, allowedOfflineTimeInMs, this.offlinePointsPerSecond, offlinePointsEarned);
    return offlinePointsEarned;
  }

  private updateOfflineModal(totalDurationInMs, allowedOfflineTimeInMs, offlinePointsPerSec, offlinePointsEarned) {
    $(`#offlineModalDuration`).text(UserInterface.getPrettyPrintNumber(totalDurationInMs/1000));
    $(`#offlineModalMaxOfflineTime`).text(UserInterface.getPrettyPrintNumber(allowedOfflineTimeInMs/1000));
    $(`#offlineModalPointsPerSecond`).text(UserInterface.getPrettyPrintNumber(offlinePointsPerSec));
    $(`#offlineModalPointsEarned`).text(UserInterface.getPrettyPrintNumber(offlinePointsEarned));
  }
  
  public getUTCTimeStampInMs(): number {
    return Math.floor((new Date()).getTime())
  }

  public serialize(): object {
    // Always update timestamp before saving
    this.saveTimeStamp = this.getUTCTimeStampInMs();
    this.offlinePointsPerSecond = this.game.stats.getStat(StatsKey.AVERAGE_POINTS_EARNED_PER_SECOND);
    return super.serialize();
  }
}
