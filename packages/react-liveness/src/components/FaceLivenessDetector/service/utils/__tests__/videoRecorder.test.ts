import 'web-streams-polyfill';
import 'blob-polyfill';

import { VideoRecorder } from '../videoRecorder';

const mockMediaRecorder = {
  start: jest.fn(),
  ondataavailable: jest.fn(),
  onerror: jest.fn(),
  state: '',
  stop: jest.fn(),
  addEventListener: jest.fn(),
};

describe('VideoRecorder', () => {
  const stream = {} as MediaStream;

  beforeEach(() => {
    Object.defineProperty(window, 'MediaRecorder', {
      writable: true,
      value: jest.fn().mockImplementation(() => mockMediaRecorder),
    });
  });

  afterEach(() => {
    mockMediaRecorder.state = '';
    jest.clearAllMocks();
  });

  it('can be initialized', () => {
    expect(new VideoRecorder(stream)).toBeTruthy();
  });

  it('should start the recording on start', () => {
    const videoRecorder = new VideoRecorder(stream);
    videoRecorder.start();

    expect(mockMediaRecorder.start).toHaveBeenCalledTimes(1);
  });

  it('should stop the recording on stop', () => {
    mockMediaRecorder.state = 'recording';

    const videoRecorder = new VideoRecorder(stream);
    videoRecorder.stop();

    expect(mockMediaRecorder.stop).toHaveBeenCalledTimes(1);
  });

  it('should return the underlying recorder state', () => {
    const videoRecorder = new VideoRecorder(stream);
    expect(videoRecorder.getState()).toBe('');

    mockMediaRecorder.state = 'recording';
    expect(videoRecorder.getState()).toBe('recording');
  });
});
