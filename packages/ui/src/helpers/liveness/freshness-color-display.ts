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

  private colorStageIndex: number; // current stage of color scrolling (black flat, red scrolling)
  private isScrolling: boolean;
  private timeLastFlatOrScrollChange: number;
  private expectedCallTime: number; // the next time the self adjusting interval is expected to be called
  private drift: number; // the last time difference between the actual call time and expected call time
  private timeFaceMatched: number;
  private timeLastFaceMatchChecked: number;

  constructor(
    context: LivenessContext,
    freshnessColorsSequence: ClientFreshnessColorSequence[]
  ) {
    this.context = context;
    this.freshnessColorsSequence = freshnessColorsSequence;

    this.init();
  }

  private init(): void {
    this.colorStageIndex = 0;
    this.isScrolling = false;
    this.timeLastFlatOrScrollChange = Date.now();
    this.expectedCallTime = Date.now() + TICK_RATE;
    this.drift = 0;
    this.timeLastFaceMatchChecked = Date.now();
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

    const colorSequence = this.freshnessColorsSequence[this.colorStageIndex];
    const nextColorSequence =
      this.freshnessColorsSequence[this.colorStageIndex + 1];

    // Every 10 ms tick we will check if we have reached the threshold for show a flat color
    //  If we have then we will start scrolling the next color
    //  If we have we have reached the threshold for a scrolling color then increment the index
    if (!this.isScrolling) {
      if (timeSinceLastColorChange >= colorSequence.flatDisplayDuration) {
        this.isScrolling = true;
        this.timeLastFlatOrScrollChange = Date.now();
        this.sendColorStartTime(
          tickStartTime,
          nextColorSequence.color,
          colorSequence.color,
          this.colorStageIndex + 1
        );
      }
    } else {
      if (timeSinceLastColorChange >= nextColorSequence.downscrollDuration) {
        this.isScrolling = false;
        this.colorStageIndex += 1;
        this.timeLastFlatOrScrollChange = Date.now();
      }
    }

    // Every 10 ms tick we will update the colors displayed
    if (this.colorStageIndex < this.freshnessColorsSequence.length - 1) {
      const heightFraction =
        timeSinceLastColorChange /
        (this.isScrolling
          ? nextColorSequence.downscrollDuration
          : colorSequence.flatDisplayDuration);

      const prevColor = colorSequence.color;
      const nextColor = this.isScrolling
        ? nextColorSequence.color
        : colorSequence.color;

      fillOverlayCanvasFractional({
        overlayCanvas: freshnessColorEl,
        prevColor,
        nextColor,
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
