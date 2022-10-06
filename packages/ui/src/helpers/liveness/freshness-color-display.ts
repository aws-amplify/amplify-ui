import {
  fillOverlayCanvasFractional,
  getFaceMatchState,
  getRGBArrayFromColorString,
} from './liveness';
import { LivenessContext } from '../../types/liveness/livenessMachine';
import { FaceMatchState } from '../../types/liveness/liveness';
import { ClientFreshnessColorSequence } from '../../types/liveness/liveness-service-types';

const TICK_RATE = 10; // ms -- the rate at which we will render/check colors
const FACE_MATCH_TICK_RATE = 100; // ms -- the rate at which we will check for faceMatch during freshness
const FACE_MATCH_TIMEOUT = 1000; // ms -- length of time before freshness will reset

export class FreshnessColorDisplay {
  private freshnessColorsSequence: ClientFreshnessColorSequence[]; // Array of color sequence from Rekognition
  private context: LivenessContext;

  private stageIndex: number; // current stage of color scrolling (black flat, red scrolling, etc)
  private currColorIndex: number; // current index of the colorSequence array that we are in
  private currColorSequence: ClientFreshnessColorSequence; // the current color sequence used for flat display and the prev color when scrolling
  private nextColorSequence: ClientFreshnessColorSequence; // the next color, during flat display curr === next and during scroll it is the next indexed color
  private isScrolling: boolean;
  private timeLastFlatOrScrollChange: number;
  private expectedCallTime: number; // the next time the self adjusting interval is expected to be called
  private drift: number; // the last time difference between the actual call time and expected call time
  private timeFaceMatched: number;
  private timeLastFaceMatchChecked: number;
  private isFirstTick: boolean;

  constructor(
    context: LivenessContext,
    freshnessColorsSequence: ClientFreshnessColorSequence[]
  ) {
    this.context = context;
    this.freshnessColorsSequence = freshnessColorsSequence;
    this.init();
  }

  private init(): void {
    this.stageIndex = 0;
    this.currColorIndex = 0;
    this.currColorSequence = this.freshnessColorsSequence[0];
    this.nextColorSequence = this.freshnessColorsSequence[0];
    this.isScrolling = false;
    this.timeLastFlatOrScrollChange = Date.now();
    this.expectedCallTime = Date.now() + TICK_RATE;
    this.drift = 0;
    this.timeLastFaceMatchChecked = Date.now();
    this.isFirstTick = true;
  }

  public async displayColorTick(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(
        () => this.displayNextColorTick(resolve, reject),
        Math.min(TICK_RATE, TICK_RATE - this.drift)
      );
    });
  }

  private async displayNextColorTick(resolve, reject) {
    const {
      freshnessColorAssociatedParams: { freshnessColorEl },
      ovalAssociatedParams: { ovalDetails },
      videoAssociatedParams: { canvasEl },
    } = this.context;

    const tickStartTime = Date.now();
    this.drift = tickStartTime - this.expectedCallTime;
    const timeSinceLastColorChange =
      tickStartTime - this.timeLastFlatOrScrollChange;

    freshnessColorEl.hidden = false;

    // This helper function only runs every 100ms
    await this.matchFaceInOval(reject);

    // Every 10 ms tick we will check if we have reached the threshold for show a flat color
    //  If we have then we will start scrolling the next color
    //  If we have we have reached the threshold for a scrolling color then increment the index and show a flat color
    if (!this.isScrolling) {
      // Send a colorStart time only for the first tick of the first color
      if (this.isFirstTick) {
        this.isFirstTick = false;
        this.sendColorStartTime(
          tickStartTime,
          this.currColorSequence.color,
          this.currColorSequence.color,
          this.stageIndex
        );
      }

      if (
        timeSinceLastColorChange >= this.currColorSequence.flatDisplayDuration
      ) {
        this.isScrolling = true;
        this.incrementStageIndex();
        this.timeLastFlatOrScrollChange = Date.now();
        this.sendColorStartTime(
          tickStartTime,
          this.nextColorSequence.color,
          this.currColorSequence.color,
          this.stageIndex
        );
      }
    } else {
      if (
        timeSinceLastColorChange >= this.nextColorSequence.downscrollDuration
      ) {
        this.isScrolling = false;
        this.incrementStageIndex();
        this.timeLastFlatOrScrollChange = Date.now();
        this.sendColorStartTime(
          tickStartTime,
          this.nextColorSequence.color,
          this.nextColorSequence.color,
          this.stageIndex
        );
      }
    }

    // Every 10 ms tick we will update the colors displayed
    if (this.currColorIndex < this.freshnessColorsSequence.length - 1) {
      const heightFraction =
        timeSinceLastColorChange /
        (this.isScrolling
          ? this.nextColorSequence.downscrollDuration
          : this.currColorSequence.flatDisplayDuration);

      fillOverlayCanvasFractional({
        overlayCanvas: freshnessColorEl,
        prevColor: this.currColorSequence.color,
        nextColor: this.nextColorSequence.color,
        ovalCanvas: canvasEl,
        ovalDetails,
        heightFraction,
      });

      this.expectedCallTime += TICK_RATE;
      resolve(false);
    } else {
      freshnessColorEl.hidden = true;
      resolve(true);
    }
  }

  // flat stage even, scroll stage odd
  // 0 curr = 0, next = 0
  // 1 curr = 0, next = 1
  // 2 curr = 1, next = 1
  // 3 curr = 1, next = 2
  // 4 curr = 2, next = 2
  // 5 curr = 2, next = 3
  private incrementStageIndex() {
    this.stageIndex += 1;
    this.currColorIndex = Math.floor(this.stageIndex / 2);
    this.currColorSequence = this.freshnessColorsSequence[this.currColorIndex];
    this.nextColorSequence =
      this.freshnessColorsSequence[this.stageIndex - this.currColorIndex];
  }

  // Every 100 ms we  will check if the face is still in the oval
  private async matchFaceInOval(reject) {
    const {
      ovalAssociatedParams: { faceDetector, ovalDetails },
      videoAssociatedParams: { videoEl },
    } = this.context;

    const timeSinceLastFaceMatchCheck =
      Date.now() - this.timeLastFaceMatchChecked;
    if (timeSinceLastFaceMatchCheck > FACE_MATCH_TICK_RATE) {
      const faceMatchState = await getFaceMatchState(
        faceDetector,
        videoEl,
        ovalDetails
      );

      this.timeLastFaceMatchChecked = Date.now();
      if (faceMatchState === FaceMatchState.MATCHED) {
        this.timeFaceMatched = Date.now();
      } else {
        const timeSinceLastFaceMatch = Date.now() - this.timeFaceMatched;
        if (timeSinceLastFaceMatch > FACE_MATCH_TIMEOUT) {
          reject();
        }
      }
    }
  }

  private sendColorStartTime(
    tickStartTime: number,
    nextColor: string,
    prevColor: string,
    nextColorIndex: number
  ) {
    const { livenessStreamProvider, challengeId } = this.context;
    livenessStreamProvider.sendClientInfo({
      DeviceInformation: undefined,
      Challenge: {
        FaceMovementAndLightChallenge: {
          ChallengeId: challengeId,
          ColorDisplayed: {
            CurrentColor: { RGB: getRGBArrayFromColorString(nextColor) },
            PreviousColor: { RGB: getRGBArrayFromColorString(prevColor) },
            SequenceNumber: nextColorIndex,
            CurrentColorStartTimestamp: tickStartTime,
          },
        },
      },
    });
  }
}
