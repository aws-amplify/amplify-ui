import '@testing-library/jest-dom';

/**
 * This is a workaround to the problem of the jsdom library not supporting
 * URL.createObjectURL. See https://github.com/jsdom/jsdom/issues/1721.
 */
if (typeof window.URL.createObjectURL === 'undefined') {
  window.URL.createObjectURL = jest.fn();
}

/**
 * jsdom does not define TransformStream, which is required by @zip.js/zip.js.
 * Node.js provides it globally, so we expose it to the jsdom environment.
 */
if (typeof globalThis.TransformStream === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  globalThis.TransformStream = require('stream/web').TransformStream;
}
