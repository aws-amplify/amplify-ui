import '@testing-library/jest-dom';
import { TextDecoder } from 'util';

/**
 * This is a workaround to the problem of the jsdom library not supporting
 * URL.createObjectURL. See https://github.com/jsdom/jsdom/issues/1721.
 */
if (typeof window.URL.createObjectURL === 'undefined') {
  window.URL.createObjectURL = jest.fn();
}

Object.defineProperty(window, 'TextDecoder', {
  writable: true,
  value: TextDecoder,
});
