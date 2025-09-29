import '@testing-library/jest-dom';

/**
 * This is a workaround to the problem of the jsdom library not supporting
 * URL.createObjectURL. See https://github.com/jsdom/jsdom/issues/1721.
 */
if (typeof window.URL.createObjectURL === 'undefined') {
  window.URL.createObjectURL = jest.fn();
}

/**
 * Mock MediaRecorder for DCA v2 StreamRecorder functionality
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
global.MediaRecorder = jest.fn().mockImplementation(() => ({
  start: jest.fn(),
  stop: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  state: 'inactive',
  mimeType: 'video/webm',
})) as any;

/**
 * Mock requestAnimationFrame for ColorSequenceDisplay animations
 */
global.requestAnimationFrame = jest.fn((cb) => setTimeout(cb, 16));
global.cancelAnimationFrame = jest.fn((id) => clearTimeout(id));
