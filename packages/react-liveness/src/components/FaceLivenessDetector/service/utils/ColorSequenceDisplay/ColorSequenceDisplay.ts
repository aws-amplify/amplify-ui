import { isFunction } from '@aws-amplify/ui';

import { ClientFreshnessColorSequence } from '../../types';
import { TICK_RATE } from '../constants';

enum ColorStageType {
  SCROLLING = 'SCROLLING',
  FLAT = 'FLAT',
}

type OnSequenceChange = (params: {
  sequenceColor: string;
  sequenceIndex: number;
  sequenceStartTime: number;
  prevSequenceColor: string;
}) => void;

export interface StartSequencesParams {
  onSequenceChange?: OnSequenceChange;
  onSequenceColorChange?: (params: {
    sequenceColor: string;
    prevSequenceColor: string;
    heightFraction: number;
  }) => void;
  onSequenceStart?: () => void;
  onSequencesComplete?: () => void;
}

export type ColorSequences = ClientFreshnessColorSequence[];

export class ColorSequenceDisplay {
  /**
   * the current color sequence used for flat display and the prev color when scrolling
   */
  #sequence: ClientFreshnessColorSequence;
  /**
   * previous color sequence, during flat display curr === prev and during scroll it is the prev indexed color
   */
  #previousSequence: ClientFreshnessColorSequence;
  /**
   * current ColorStage, initialize to 'FLAT'
   */
  #colorStage: ColorStageType = ColorStageType.FLAT;
  /**
   * current color sequence index (black flat, red scrolling, etc)
   */
  #sequenceIndex: number = 0;

  #colorSequences: ColorSequences;
  #isFirstTick: boolean = true;
  #lastColorStageChangeTimestamp: number = 0;

  constructor(colorSequences: ColorSequences) {
    this.#colorSequences = colorSequences;
    this.#sequence = colorSequences[0];
    this.#previousSequence = colorSequences[0];
  }

  static colorToRgb(color: string): number[] {
    return color
      .slice(color.indexOf('(') + 1, color.indexOf(')'))
      .split(',')
      .map((str) => parseInt(str));
  }

  public async startSequences(params?: StartSequencesParams): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.#startColorSequence({ ...params, resolve });
      }, Math.min(TICK_RATE));
    });
  }

  #isFlatStage(): boolean {
    return this.#colorStage === ColorStageType.FLAT;
  }

  #isScrollingStage(): boolean {
    return this.#colorStage === ColorStageType.SCROLLING;
  }

  #startColorSequence({
    onSequenceChange,
    onSequenceColorChange,
    onSequenceStart,
    onSequencesComplete,
    resolve,
  }: { resolve: (params: boolean) => void } & StartSequencesParams) {
    if (isFunction(onSequenceStart)) {
      onSequenceStart();
    }

    const sequenceStartTime = Date.now();

    let timeSinceLastColorStageChange =
      sequenceStartTime - this.#lastColorStageChangeTimestamp;

    // Send a colorStart time only for the first tick of the first color
    if (this.#isFirstTick) {
      this.#lastColorStageChangeTimestamp = Date.now();
      this.#isFirstTick = false;

      if (isFunction(onSequenceChange)) {
        onSequenceChange({
          prevSequenceColor: this.#previousSequence.color,
          sequenceColor: this.#sequence.color,
          sequenceIndex: this.#sequenceIndex,
          sequenceStartTime,
        });
      }
    }

    // Every 10 ms tick we will check if the threshold for flat or scrolling, if so we will try to go to the next stage
    if (
      (this.#isFlatStage() &&
        timeSinceLastColorStageChange >= this.#sequence.flatDisplayDuration) ||
      (this.#isScrollingStage() &&
        timeSinceLastColorStageChange >= this.#sequence.downscrollDuration)
    ) {
      this.#handleSequenceChange({ sequenceStartTime, onSequenceChange });
      timeSinceLastColorStageChange = 0;
    }

    const hasRemainingSequences =
      this.#sequenceIndex < this.#colorSequences.length;
    // Every 10 ms tick we will update the colors displayed
    if (hasRemainingSequences) {
      const heightFraction =
        timeSinceLastColorStageChange /
        (this.#isScrollingStage()
          ? this.#sequence.downscrollDuration
          : this.#sequence.flatDisplayDuration);

      if (isFunction(onSequenceColorChange)) {
        onSequenceColorChange({
          sequenceColor: this.#sequence.color,
          heightFraction,
          prevSequenceColor: this.#previousSequence.color,
        });
      }

      resolve(false);
    } else {
      if (isFunction(onSequencesComplete)) {
        onSequencesComplete();
      }
      resolve(true);
    }
  }

  // FLAT - prev = 0, curr = 0
  // SCROLL - prev = 0, curr = 1
  // FLAT - prev = 1, curr = 1
  // SCROLL - prev = 1, curr = 2
  // SCROLL - prev = 2, curr = 3
  #handleSequenceChange({
    sequenceStartTime,
    onSequenceChange,
  }: {
    sequenceStartTime: number;
    onSequenceChange?: OnSequenceChange;
  }) {
    this.#previousSequence = this.#sequence;

    if (this.#isFlatStage()) {
      this.#sequenceIndex += 1;
      this.#colorStage = ColorStageType.SCROLLING;
    } else if (this.#isScrollingStage()) {
      const nextColorSequence = this.#colorSequences[this.#sequenceIndex];

      if (nextColorSequence.flatDisplayDuration > 0) {
        this.#colorStage = ColorStageType.FLAT;
      } else {
        this.#sequenceIndex += 1;
      }
    }

    this.#sequence = this.#colorSequences[this.#sequenceIndex];

    this.#lastColorStageChangeTimestamp = Date.now();

    if (this.#sequence) {
      if (isFunction(onSequenceChange)) {
        onSequenceChange({
          prevSequenceColor: this.#previousSequence.color,
          sequenceColor: this.#sequence.color,
          sequenceIndex: this.#sequenceIndex,
          sequenceStartTime: sequenceStartTime,
        });
      }
    }
  }
}
