import {
  fillOverlayCanvasFractional,
  getFaceMatchState,
  getRandomIndex,
  shouldChangeColorStage,
} from './liveness';
import { LivenessContext } from '../../types/liveness/livenessMachine';
import { FaceMatchState } from '../../types/liveness/liveness';

const TICK_RATE = 10; // ms -- the rate at which we will render/check colors
const FLAT_DURATION = 100; // ms -- the length of time to show a flat color
const SCROLLING_DURATION = 300; // ms -- the length of time it should take for a color to scroll down
const FACE_MATCH_TICK_RATE = 100; // ms -- the rate at which we will check for faceMatch during freshness
const FACE_MATCH_TIMEOUT = 1000; // ms -- length of time before freshness will reset
const COLOR_STAGE_COUNT = 24; // There is a flat stage and scrolling stage for each color

export class FreshnessColorDisplay {
  private freshnessColors: string[]; // Array of color codes from Rekognition
  private context: LivenessContext;

  private colorStageIndex: number; // current stage of color scrolling (black flat, red scrolling)
  private flatColorIndex: number;
  private scrollingColorIndex: number;
  private timeLastColorIndChanged: number;
  private expectedCallTime: number; // the next time the self adjusting interval is expected to be called
  private drift: number; // the last time difference between the actual call time and expected call time
  private timeFaceMatched: number;
  private timeLastFaceMatchChecked: number;

  constructor(context: LivenessContext, freshnessColors: string[]) {
    this.context = context;
    this.freshnessColors = freshnessColors;

    this.init();
  }

  private init(): void {
    this.colorStageIndex = 0;
    this.flatColorIndex = Math.floor(
      Math.random() * (this.freshnessColors.length - 1) + 1
    );
    this.scrollingColorIndex = this.flatColorIndex;
    this.timeLastColorIndChanged = Date.now();
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
      ovalAssociatedParams: { faceDetector, ovalDetails },
      videoAssociatedParams: { canvasEl, videoEl },
    } = this.context;

    const tickStartTime = Date.now();
    this.drift = tickStartTime - this.expectedCallTime;
    const timeSinceLastColorChange =
      tickStartTime - this.timeLastColorIndChanged;

    freshnessColorEl.hidden = false;

    // This helper function only runs every 100ms
    await this.matchFaceInOval(reject);

    // Every 10 ms tick we will check if we have reached the threshold for showing a color
    // If we have we will increment the color stage
    if (
      shouldChangeColorStage(
        timeSinceLastColorChange,
        this.freshnessColors[this.flatColorIndex],
        this.freshnessColors[this.scrollingColorIndex],
        FLAT_DURATION,
        SCROLLING_DURATION
      )
    ) {
      this.incrementColorStage(tickStartTime);
      this.timeLastColorIndChanged = Date.now();
    }

    // Every 10 ms tick we will update the colors displayed
    if (this.colorStageIndex < COLOR_STAGE_COUNT) {
      const hp = timeSinceLastColorChange / SCROLLING_DURATION;

      fillOverlayCanvasFractional({
        overlayCanvas: freshnessColorEl,
        prevColor: this.freshnessColors[this.flatColorIndex],
        nextColor: this.freshnessColors[this.scrollingColorIndex],
        ovalCanvas: canvasEl,
        ovalDetails,
        heightFraction: hp,
      });

      this.expectedCallTime += TICK_RATE;
      resolve(false);
    } else {
      freshnessColorEl.hidden = true;
      resolve(true);
    }
  }

  // Increments colorStageIndex and the color indexes
  // Flat stage - scrollingColor === flatColor
  // Scrolling stage - scrollingColor !== flatColor
  private incrementColorStage(tickStartTime: number) {
    this.colorStageIndex += 1;

    const prev = this.flatColorIndex;
    this.flatColorIndex = this.scrollingColorIndex;

    // If the prev stage was flat, get a new random color index to scroll
    if (prev === this.scrollingColorIndex) {
      this.scrollingColorIndex = getRandomIndex(
        this.freshnessColors.length,
        prev
      );

      // Send clientInfo when a new color starts appears
      this.sendColorStartTime(tickStartTime);
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

  private sendColorStartTime(tickStartTime: number) {
    const { livenessStreamProvider, challengeId } = this.context;
    livenessStreamProvider.sendClientInfo({
      challenges: [
        {
          challengeId,
          faceMovementChallenge: {
            colorSequence: {
              colorTimestampList: [
                {
                  color: this.freshnessColors[this.scrollingColorIndex],
                  tickStartTime,
                },
              ],
            },
          },
        },
      ],
    });
  }
}
