// jsdom does not implement the Streams API or the Encoding API, both of which
// the AWS SDK websocket/CBOR middleware reference at module scope. These must be
// in place before any test module is imported.
import 'web-streams-polyfill';
import { TextDecoder, TextEncoder } from 'node:util';

import '@testing-library/jest-dom';

if (typeof globalThis.TextEncoder === 'undefined') {
  globalThis.TextEncoder = TextEncoder as typeof globalThis.TextEncoder;
}

if (typeof globalThis.TextDecoder === 'undefined') {
  globalThis.TextDecoder = TextDecoder as typeof globalThis.TextDecoder;
}

/**
 * This is a workaround to the problem of the jsdom library not supporting
 * URL.createObjectURL. See https://github.com/jsdom/jsdom/issues/1721.
 */
if (typeof window.URL.createObjectURL === 'undefined') {
  window.URL.createObjectURL = jest.fn();
}
