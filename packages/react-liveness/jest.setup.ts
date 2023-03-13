import '@testing-library/jest-dom';

// usage of multiple tensorflow deps causes an excessive amount of console warnings
jest.spyOn(console, 'warn').mockImplementation();

/**
 * This is a workaround to the problem of the jsdom library not supporting
 * URL.createObjectURL. See https://github.com/jsdom/jsdom/issues/1721.
 */
if (typeof window.URL.createObjectURL === 'undefined') {
  window.URL.createObjectURL = jest.fn();
}
