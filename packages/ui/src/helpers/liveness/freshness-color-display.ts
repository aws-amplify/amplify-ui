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

enum COLOR_STAGE {
  SCROLLING = 'SCROLLING',
  FLAT = 'FLAT',
}
export class FreshnessColorDisplay {
  private freshnessColorsSequence: ClientFreshnessColorSequence[]; // Array of color sequence from Rekognition
  private context: LivenessContext;

  private stageIndex: number; // current stage index of color scrolling (black flat, red scrolling, etc)
  private stage: COLOR_STAGE; // SCROLLING or FLAT
  private currColorIndex: number; // current index of the colorSequence array that we are in
  private currColorSequence: ClientFreshnessColorSequence; // the current color sequence used for flat display and the prev color when scrolling
  private prevColorSequence: ClientFreshnessColorSequence; // the prev color, during flat display curr === prev and during scroll it is the prev indexed color
  private timeLastFlatOrScrollChange: number;
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
    this.prevColorSequence = this.freshnessColorsSequence[0];
    this.stage = COLOR_STAGE.FLAT;
    this.timeLastFlatOrScrollChange = Date.now();
    this.timeLastFaceMatchChecked = Date.now();
    this.isFirstTick = true;
  }

  public async displayColorTick(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(
        () => this.displayNextColorTick(resolve, reject),
        Math.min(TICK_RATE)
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
    const timeSinceLastColorChange =
      tickStartTime - this.timeLastFlatOrScrollChange;

    freshnessColorEl.hidden = false;

    // This helper function only runs every 100ms
    await this.matchFaceInOval(reject);

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

    // Every 10 ms tick we will check if the threshold for flat or scrolling, if so we will try to go to the next stage
    if (
      (this.stage === COLOR_STAGE.FLAT &&
        timeSinceLastColorChange >=
          this.currColorSequence.flatDisplayDuration) ||
      (this.stage === COLOR_STAGE.SCROLLING &&
        timeSinceLastColorChange >= this.currColorSequence.downscrollDuration)
    ) {
      this.incrementStageIndex(tickStartTime);
    }

    // Every 10 ms tick we will update the colors displayed
    if (this.currColorIndex < this.freshnessColorsSequence.length) {
      const heightFraction =
        timeSinceLastColorChange /
        (this.stage === COLOR_STAGE.SCROLLING
          ? this.currColorSequence.downscrollDuration
          : this.currColorSequence.flatDisplayDuration);

      fillOverlayCanvasFractional({
        overlayCanvas: freshnessColorEl,
        prevColor: this.prevColorSequence.color,
        nextColor: this.currColorSequence.color,
        ovalCanvas: canvasEl,
        ovalDetails,
        heightFraction,
      });

      resolve(false);
    } else {
      freshnessColorEl.hidden = true;
      resolve(true);
    }
  }

  // FLAT - prev = 0, curr = 0
  // SCROLL - prev = 0, curr = 1
  // FLAT - prev = 1, curr = 1
  // SCROLL - prev = 1, curr = 2
  // SCROLL - prev = 2, curr = 3
  private incrementStageIndex(tickStartTime: number) {
    this.stageIndex += 1;
    this.prevColorSequence = this.freshnessColorsSequence[this.currColorIndex];

    if (this.stage === COLOR_STAGE.FLAT) {
      this.currColorIndex += 1;
      this.stage = COLOR_STAGE.SCROLLING;
    } else if (this.stage === COLOR_STAGE.SCROLLING) {
      const nextFlatColor = this.freshnessColorsSequence[this.currColorIndex];
      if (nextFlatColor.flatDisplayDuration > 0) {
        this.stage = COLOR_STAGE.FLAT;
      } else {
        this.stage = COLOR_STAGE.SCROLLING;
        this.currColorIndex += 1;
      }
    }
    this.currColorSequence = this.freshnessColorsSequence[this.currColorIndex];

    this.timeLastFlatOrScrollChange = Date.now();
    if (this.currColorSequence) {
      this.sendColorStartTime(
        tickStartTime,
        this.currColorSequence.color,
        this.prevColorSequence.color,
        this.stageIndex
      );
    }
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
    currColor: string,
    prevColor: string,
    currColorIndex: number
  ) {
    const { livenessStreamProvider, challengeId } = this.context;
    livenessStreamProvider.sendClientInfo({
      DeviceInformation: undefined,
      Challenge: {
        FaceMovementAndLightChallenge: {
          ChallengeId: challengeId,
          ColorDisplayed: {
            CurrentColor: { RGB: getRGBArrayFromColorString(currColor) },
            PreviousColor: { RGB: getRGBArrayFromColorString(prevColor) },
            SequenceNumber: currColorIndex,
            CurrentColorStartTimestamp: tickStartTime,
          },
        },
      },
    });
  }
}
