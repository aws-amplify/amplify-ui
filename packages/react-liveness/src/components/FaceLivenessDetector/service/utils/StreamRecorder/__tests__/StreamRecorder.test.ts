import 'web-streams-polyfill';
import 'blob-polyfill';

import { TIME_SLICE } from '../../constants';

import { StreamRecorder } from '../StreamRecorder';
import { StreamResult } from '../../types';

const stream = {} as MediaStream;

const mockStart = jest.fn();
const mockStop = jest.fn();
const mockDispatchEvent = jest.fn();
const mockAddEventListener = jest.fn();

const mockMediaRecorder = {
  addEventListener: mockAddEventListener,
  dispatchEvent: mockDispatchEvent,
  ondataavailable: jest.fn(),
  onerror: jest.fn(),
  onstart: jest.fn(),
  onstop: jest.fn(),
  start: mockStart,
  state: 'inactive',
  stop: mockStop,
};

describe('StreamRecorder', () => {
  beforeEach(() => {
    let mockTimestamp = 0;
    jest.spyOn(Date, 'now').mockImplementation(() => {
      mockTimestamp = mockTimestamp + 1000;
      return mockTimestamp;
    });

    window.MediaRecorder = (jest.fn() as any).mockImplementation(
      () => mockMediaRecorder
    );

    mockAddEventListener.mockClear();
    mockDispatchEvent.mockClear();
    mockStart.mockClear();
    mockStop.mockClear();
  });

  it('throws if `MediaRecorder` is unsupported in the current browser', () => {
    // @ts-expect-error intentionally remove MediaRecorder from window
    window.MediaRecorder = undefined;
    expect(() => new StreamRecorder(stream)).toThrow(
      'MediaRecorder is not supported by this browser'
    );
  });

  it('stops recording on recorder error', () => {
    const mockMediaRecorderWithRecordingState = {
      ...mockMediaRecorder,
      onerror: jest.fn(),
      state: 'recording',
    };
    window.MediaRecorder = (jest.fn() as any).mockImplementationOnce(
      () => mockMediaRecorderWithRecordingState
    );

    new StreamRecorder(stream);

    expect(mockStop).toHaveBeenCalledTimes(0);

    // force run this.#recorder.onerror
    mockMediaRecorderWithRecordingState.onerror();

    expect(mockStop).toHaveBeenCalledTimes(1);
  });

  describe('StreamRecorder.getVideoStream', () => {
    it('returns a `videoStream`', () => {
      const videoStream = new StreamRecorder(stream).getVideoStream();
      expect(videoStream).toBeInstanceOf(ReadableStream);
    });
  });

  describe('StreamRecorder.startRecording', () => {
    it('calls `this.#recorder.start` with the expected `timeSlice`', () => {
      const streamRecorder = new StreamRecorder(stream);
      streamRecorder.startRecording();
      expect(mockStart).toHaveBeenCalledTimes(1);
      expect(mockStart).toHaveBeenCalledWith(TIME_SLICE);
    });
  });

  describe('StreamRecorder.hasRecordingStarted', () => {
    it('returns the expected value before and after recording has started', () => {
      const streamRecorder = new StreamRecorder(stream);
      expect(streamRecorder.hasRecordingStarted()).toBe(false);

      streamRecorder.startRecording();
      // force run `this.#recorded.onstart`
      mockMediaRecorder.onstart();

      expect(streamRecorder.hasRecordingStarted()).toBe(true);
    });
  });

  describe('StreamRecorder.getRecordingStartTimestamp', () => {
    it('returns the expected value after recording has started', () => {
      const streamRecorder = new StreamRecorder(stream);

      streamRecorder.startRecording();
      // force run `this.#recorded.onstart`
      mockMediaRecorder.onstart();

      expect(streamRecorder.getRecordingStartTimestamp()).toBe(1730);
    });

    it('throws if recording has not been started', () => {
      const streamRecorder = new StreamRecorder(stream);
      expect(() => streamRecorder.getRecordingStartTimestamp()).toThrow(
        'Recording has not started'
      );
    });
  });

  describe('StreamRecorder.getRecordingEndedTimestamp', () => {
    it('returns the expected value after recording has ended', () => {
      const streamRecorder = new StreamRecorder(stream);

      streamRecorder.startRecording();
      // force run `this.#recorded.onstop`
      mockMediaRecorder.onstop();

      expect(streamRecorder.getRecordingEndedTimestamp()).toBe(2000);
    });

    it('throws if recording has not ended', () => {
      const streamRecorder = new StreamRecorder(stream);

      streamRecorder.startRecording();
      // force run `this.#recorded.onstart`
      mockMediaRecorder.onstart();

      expect(() => streamRecorder.getRecordingEndedTimestamp()).toThrow(
        'Recording has not ended'
      );
    });
  });

  describe('StreamRecorder.isRecording', () => {
    it('returns `false` before recording has started', () => {
      const streamRecorder = new StreamRecorder(stream);
      expect(streamRecorder.isRecording()).toBe(false);
    });

    it('returns `true` when recording has started', () => {
      window.MediaRecorder = (jest.fn() as any).mockImplementationOnce(() => ({
        ...mockMediaRecorder,
        state: 'recording',
      }));
      const streamRecorder = new StreamRecorder(stream);
      streamRecorder.startRecording();
      expect(mockStart).toHaveBeenCalledTimes(1);
      expect(streamRecorder.isRecording()).toBe(true);
    });
  });

  describe('StreamRecorder.getChunksLength', () => {
    it('returns the length of recorded chunks', () => {
      const streamRecorder = new StreamRecorder(stream);
      expect(streamRecorder.getChunksLength()).toBe(0);
    });

    it('returns the length of recorded chunks from data available events', () => {
      const streamRecorder = new StreamRecorder(stream);
      expect(streamRecorder.getChunksLength()).toBe(0);
      const chunk = new Blob();
      mockMediaRecorder.ondataavailable({ data: chunk });

      expect(streamRecorder.getChunksLength()).toBe(1);
    });
  });

  describe('StreamRecorder.stopRecording', () => {
    it('stops recording', () => {
      window.MediaRecorder = (jest.fn() as any).mockImplementationOnce(() => ({
        ...mockMediaRecorder,
        state: 'recording',
        onstop: jest.fn().mockResolvedValue(undefined),
      }));
      const streamRecorder = new StreamRecorder(stream);

      streamRecorder.stopRecording();

      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });

  describe('StreamRecorder.dispatchStreamEvent', () => {
    it.each([
      { type: 'streamStop', data: undefined },
      { type: 'sessionInfo', data: { Challenge: {} } },
      { type: 'closeCode', data: { closeCode: 4003 } },
    ])('dispatches a $type message event', ({ type, data }) => {
      const streamRecorder = new StreamRecorder(stream);

      streamRecorder.dispatchStreamEvent({ type, data } as StreamResult);
      expect(mockDispatchEvent).toHaveBeenCalledTimes(1);
      expect(mockDispatchEvent).toHaveBeenCalledWith(
        new MessageEvent(type, { data })
      );
    });

    it('adds the expected event listeners', () => {
      const eventListeners: Record<string, (params?: any) => void> = {};
      window.MediaRecorder = (jest.fn() as any).mockImplementationOnce(() => ({
        ...mockMediaRecorder,
        addEventListener: jest.fn(
          (name: string, cb: (params?: any) => void) => {
            eventListeners[name] = cb;
          }
        ),
      }));

      new StreamRecorder(stream);

      const sessionInfoListener = eventListeners['sessionInfo'];
      const streamStopListener = eventListeners['streamStop'];
      const closeCodeListener = eventListeners['closeCode'];
      const endStreamListener = eventListeners['endStream'];

      expect(sessionInfoListener).toBeDefined();
      expect(sessionInfoListener({})).toBeUndefined();

      expect(streamStopListener).toBeDefined();
      expect(streamStopListener()).toBeUndefined();

      expect(closeCodeListener).toBeDefined();
      expect(closeCodeListener({ closeCode: 4003 })).toBeUndefined();

      expect(endStreamListener).toBeDefined();
      expect(endStreamListener()).toBeUndefined();
    });
  });
});
