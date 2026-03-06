import { isFunction } from '@aws-amplify/ui';

import { TICK_RATE } from '../constants';

enum ColorStageType {
  Scrolling,
  Flat,
}

interface SequenceColors {
  sequenceColor: SequenceColorValue;
  prevSequenceColor: SequenceColorValue;
}

export interface SequenceChangeParams extends SequenceColors {
  sequenceIndex: number;
  sequenceStartTime: number;
}

export interface SequenceColorChangeParams extends SequenceColors {
  heightFraction: number;
}

export type SequenceColorValue = `rgb(${string},${string},${string})`;

export interface ColorSequence {
  color: SequenceColorValue;
  downscrollDuration: number;
  flatDisplayDuration: number;
}

type OnSequenceChange = (params: SequenceChangeParams) => void;

export interface StartSequencesParams {
  /**
   * called on sequence change
   */
  onSequenceChange?: OnSequenceChange;
  /**
   * called on sequence color change
   */
  onSequenceColorChange?: (params: SequenceColorChangeParams) => void;
  /**
   * called on sequence start
   */
  onSequenceStart?: () => void;
  /**
   * called on all sequences complete
   */
  onSequencesComplete?: () => void;
}

export type ColorSequences = ColorSequence[];

export class ColorSequenceDisplay {
  /**
   * the current color sequence used for flat display and the prev color when scrolling
   */
  #sequence: ColorSequence;
  /**
   * previous color sequence, during flat display curr === prev and during scroll it is the prev indexed color
   */
  #previousSequence: ColorSequence;
  /**
   * current ColorStage, initialize to 'FLAT'
   */
  #colorStage: ColorStageType = ColorStageType.Flat;
  /**
   * current color sequence index (black flat, red scrolling, etc)
   */
  #sequenceIndex: number = 0;

  #colorSequences: ColorSequences;
  #isFirstTick: boolean = true;
  #lastColorStageChangeTimestamp: number = 0;

  /**
   * Iterates over provided color sequences and executes sequence event callbacks
   *
   * @param {ColorSequences} colorSequences array of color sequences to iterate over
   */
  constructor(colorSequences: ColorSequences) {
    this.#colorSequences = colorSequences;
    this.#sequence = colorSequences[0];
    this.#previousSequence = colorSequences[0];
  }

  /**
   * Start sequence iteration and execute event callbacks
   *
   * @async
   * @param {StartSequencesParams} params Sequence event handlers
   * @returns {Promise<boolean>} Resolves to true when complete
   */
  async startSequences(params?: StartSequencesParams): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.#startColorSequence({ ...params, resolve });
      }, Math.min(TICK_RATE));
    });
  }

  #isFlatStage(): boolean {
    return this.#colorStage === ColorStageType.Flat;
  }

  #isScrollingStage(): boolean {
    return this.#colorStage === ColorStageType.Scrolling;
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

      // initial sequence change
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
      this.#colorStage = ColorStageType.Scrolling;
    } else if (this.#isScrollingStage()) {
      const nextColorSequence = this.#colorSequences[this.#sequenceIndex];

      if (nextColorSequence.flatDisplayDuration > 0) {
        this.#colorStage = ColorStageType.Flat;
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
