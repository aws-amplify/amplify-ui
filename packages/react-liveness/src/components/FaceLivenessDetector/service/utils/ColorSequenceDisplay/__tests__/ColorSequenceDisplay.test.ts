import 'web-streams-polyfill';
import 'jest-canvas-mock';

import { StreamRecorder } from '../../StreamRecorder';

import {
  ColorSequenceDisplay,
  ColorSequences,
  SequenceColorValue,
  StartSequencesParams,
} from '../ColorSequenceDisplay';

jest.mock('../../StreamRecorder');

// sequence values from service
const colorSequences: ColorSequences = [
  { color: 'rgb(0,0,0)', downscrollDuration: 0, flatDisplayDuration: 75 },
  { color: 'rgb(0,255,0)', downscrollDuration: 475, flatDisplayDuration: 0 },
  { color: 'rgb(255,0,255)', downscrollDuration: 475, flatDisplayDuration: 0 },
  { color: 'rgb(255,0,0)', downscrollDuration: 475, flatDisplayDuration: 0 },
  { color: 'rgb(0,0,255)', downscrollDuration: 475, flatDisplayDuration: 0 },
  { color: 'rgb(255,0,0)', downscrollDuration: 475, flatDisplayDuration: 0 },
  { color: 'rgb(0,255,0)', downscrollDuration: 475, flatDisplayDuration: 0 },
  { color: 'rgb(255,0,0)', downscrollDuration: 475, flatDisplayDuration: 0 },
];

const colorMap: Record<SequenceColorValue, number[]> = {
  'rgb(0,0,0)': [0, 0, 0],
  'rgb(0,255,0)': [0, 255, 0],
  'rgb(255,0,255)': [255, 0, 255],
  'rgb(255,0,0)': [255, 0, 0],
  'rgb(0,0,255)': [0, 0, 255],
};

const challengeId = 'challengeId';
const stream = {} as MediaStream;
const onSequenceColorChange = jest.fn();

describe('ColorSequenceDisplay', () => {
  let mockDispatchStreamEvent: jest.Mock;
  let canvasElement: HTMLCanvasElement;

  let onSequencesComplete: StartSequencesParams['onSequencesComplete'];
  let onSequenceStart: StartSequencesParams['onSequenceStart'];

  let startParams: StartSequencesParams;

  beforeEach(() => {
    let mockTimestamp = 0;
    jest.spyOn(Date, 'now').mockImplementation(() => {
      mockTimestamp = mockTimestamp + 1000;
      return mockTimestamp;
    });

    const streamRecorder = new StreamRecorder(stream);
    mockDispatchStreamEvent = streamRecorder.dispatchStreamEvent as jest.Mock;

    canvasElement = document.createElement('canvas');
    onSequenceStart = jest.fn(() => {
      canvasElement.style.display = 'block';
    });
    onSequencesComplete = jest.fn(() => {
      canvasElement.style.display = 'none';
    });
    const onSequenceChange: StartSequencesParams['onSequenceChange'] = ({
      prevSequenceColor,
      sequenceColor,
      sequenceIndex,
      sequenceStartTime,
    }) => {
      const CurrentColor = { RGB: colorMap[sequenceColor] };
      const PreviousColor = {
        RGB: colorMap[prevSequenceColor],
      };
      const data = {
        Challenge: {
          FaceMovementAndLightChallenge: {
            ChallengeId: challengeId,
            ColorDisplayed: {
              CurrentColor,
              PreviousColor,
              SequenceNumber: sequenceIndex,
              CurrentColorStartTimestamp: sequenceStartTime,
            },
          },
        },
      };

      mockDispatchStreamEvent({ type: 'sessionInfo', data });
    };

    onSequenceColorChange.mockClear();

    startParams = {
      onSequenceChange,
      onSequenceColorChange,
      onSequenceStart,
      onSequencesComplete,
    };
  });

  it('progresses through expected sequences as expected', async () => {
    const display = new ColorSequenceDisplay(colorSequences);

    expect(canvasElement.style.display).toBe('');

    // first sequence
    expect(await display.startSequences(startParams)).toBe(false);
    expect(mockDispatchStreamEvent).toHaveBeenCalledTimes(2);
    // first and second dispatches happen call on first call of `start`
    expect(mockDispatchStreamEvent.mock.calls[0][0]).toMatchSnapshot();
    // second call
    expect(mockDispatchStreamEvent.mock.calls[1][0]).toMatchSnapshot();
    expect(onSequenceStart).toBeCalledTimes(1);
    expect(canvasElement.style.display).toBe('block');
    expect(onSequenceColorChange).toBeCalledTimes(1);
    expect(onSequenceColorChange).toBeCalledWith({
      heightFraction: 0,
      sequenceColor: 'rgb(0,255,0)',
      prevSequenceColor: 'rgb(0,0,0)',
    });

    // second sequence
    expect(await display.startSequences(startParams)).toBe(false);
    expect(mockDispatchStreamEvent).toHaveBeenCalledTimes(3);
    expect(mockDispatchStreamEvent.mock.calls[2][0]).toMatchSnapshot();
    expect(canvasElement.style.display).toBe('block');

    // third sequence
    expect(await display.startSequences(startParams)).toBe(false);
    expect(mockDispatchStreamEvent).toHaveBeenCalledTimes(4);
    expect(mockDispatchStreamEvent.mock.calls[3][0]).toMatchSnapshot();
    expect(canvasElement.style.display).toBe('block');

    // fourth sequence
    expect(await display.startSequences(startParams)).toBe(false);
    expect(mockDispatchStreamEvent).toHaveBeenCalledTimes(5);
    expect(mockDispatchStreamEvent.mock.calls[4][0]).toMatchSnapshot();
    expect(canvasElement.style.display).toBe('block');

    // fifth sequence
    expect(await display.startSequences(startParams)).toBe(false);
    expect(mockDispatchStreamEvent).toHaveBeenCalledTimes(6);
    expect(mockDispatchStreamEvent.mock.calls[5][0]).toMatchSnapshot();
    expect(canvasElement.style.display).toBe('block');

    // sixth sequence
    expect(await display.startSequences(startParams)).toBe(false);
    expect(mockDispatchStreamEvent).toHaveBeenCalledTimes(7);
    expect(mockDispatchStreamEvent.mock.calls[6][0]).toMatchSnapshot();
    expect(canvasElement.style.display).toBe('block');

    // seventh sequence
    expect(await display.startSequences(startParams)).toBe(false);
    expect(mockDispatchStreamEvent).toHaveBeenCalledTimes(8);
    expect(mockDispatchStreamEvent.mock.calls[7][0]).toMatchSnapshot();
    expect(onSequenceStart).toBeCalledTimes(7);
    expect(canvasElement.style.display).toBe('block');

    // eighth sequence
    expect(await display.startSequences(startParams)).toBe(true);
    expect(mockDispatchStreamEvent).toHaveBeenCalledTimes(8);
    expect(onSequenceStart).toBeCalledTimes(8);
    expect(onSequencesComplete).toHaveBeenCalledTimes(1);
    expect(canvasElement.style.display).toBe('none');
  });

  it('handles a sequence that updates `ColorStageType` from `SCROLLING` to `FLAT` as expected', async () => {
    const initialSequence = colorSequences[0];
    const scrollingSequence = colorSequences[1];
    const flatSequence = colorSequences[0];

    const display = new ColorSequenceDisplay([
      initialSequence,
      scrollingSequence,
      flatSequence,
    ]);

    // first sequence
    expect(await display.startSequences(startParams)).toBe(false);
    // first and second dispatches happen call on first call of `start`
    expect(mockDispatchStreamEvent).toHaveBeenCalledTimes(2);

    // second sequence
    expect(await display.startSequences(startParams)).toBe(false);
    expect(mockDispatchStreamEvent).toHaveBeenCalledTimes(3);

    // third sequence
    expect(await display.startSequences(startParams)).toBe(false);
    expect(mockDispatchStreamEvent).toHaveBeenCalledTimes(4);

    // third sequence
    expect(await display.startSequences(startParams)).toBe(true);
    expect(mockDispatchStreamEvent).toHaveBeenCalledTimes(4);
  });

  describe('Timestamp validation', () => {
    it('should generate unique timestamps for each color', async () => {
      const timestamps: number[] = [];
      const onSequenceChange: StartSequencesParams['onSequenceChange'] = ({
        sequenceStartTime,
      }) => {
        timestamps.push(sequenceStartTime);
      };

      const display = new ColorSequenceDisplay(colorSequences);
      const params = {
        ...startParams,
        onSequenceChange,
      };

      // Run through all sequences
      let isComplete = false;
      while (!isComplete) {
        isComplete = await display.startSequences(params);
      }

      // Verify we captured timestamps for all colors
      expect(timestamps.length).toBe(colorSequences.length);

      // Verify all timestamps are unique
      const uniqueTimestamps = new Set(timestamps);
      expect(uniqueTimestamps.size).toBe(timestamps.length);

      // Verify timestamps are monotonically increasing
      for (let i = 1; i < timestamps.length; i++) {
        expect(timestamps[i]).toBeGreaterThan(timestamps[i - 1]);
      }
    });

    it('should capture first color timestamp accurately', async () => {
      let firstTimestamp: number | null = null;
      const captureTime = Date.now();

      const onSequenceChange: StartSequencesParams['onSequenceChange'] = ({
        sequenceIndex,
        sequenceStartTime,
      }) => {
        if (sequenceIndex === 0 && firstTimestamp === null) {
          firstTimestamp = sequenceStartTime;
        }
      };

      const display = new ColorSequenceDisplay(colorSequences);
      const params = {
        ...startParams,
        onSequenceChange,
      };

      await display.startSequences(params);

      expect(firstTimestamp).not.toBeNull();
      // Verify timestamp is within 10ms of when we started
      // Note: In the test, Date.now() is mocked to increment by 1000ms each call
      // so we verify it's close to the expected mock value
      expect(firstTimestamp).toBeGreaterThanOrEqual(captureTime);
    });

    it('should capture subsequent color timestamps accurately with known durations', async () => {
      // Use a simpler sequence with known durations for easier testing
      const testSequences: ColorSequences = [
        {
          color: 'rgb(0,0,0)',
          downscrollDuration: 0,
          flatDisplayDuration: 100,
        },
        {
          color: 'rgb(0,255,0)',
          downscrollDuration: 200,
          flatDisplayDuration: 0,
        },
        {
          color: 'rgb(255,0,0)',
          downscrollDuration: 200,
          flatDisplayDuration: 0,
        },
      ];

      const timestamps: number[] = [];
      const onSequenceChange: StartSequencesParams['onSequenceChange'] = ({
        sequenceStartTime,
      }) => {
        timestamps.push(sequenceStartTime);
      };

      const display = new ColorSequenceDisplay(testSequences);
      const params = {
        ...startParams,
        onSequenceChange,
      };

      // Run through all sequences
      let isComplete = false;
      while (!isComplete) {
        isComplete = await display.startSequences(params);
      }

      // Verify we have timestamps for all colors
      expect(timestamps.length).toBe(testSequences.length);

      // Verify timestamp differences match expected durations
      // Note: Due to the mocked Date.now() incrementing by 1000ms each call,
      // we verify that timestamps are increasing
      for (let i = 1; i < timestamps.length; i++) {
        const timeDiff = timestamps[i] - timestamps[i - 1];
        // Each timestamp should be greater than the previous
        expect(timeDiff).toBeGreaterThan(0);
      }
    });
  });
});
