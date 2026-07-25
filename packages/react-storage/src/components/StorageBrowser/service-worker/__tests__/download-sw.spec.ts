/**
 * @jest-environment jsdom
 */
import { TextEncoder, TextDecoder } from 'util';
import { ReadableStream } from 'node:stream/web';

// jsdom doesn't provide these Web APIs. Polyfill from Node builtins.
(globalThis as any).TextEncoder = TextEncoder;
(globalThis as any).TextDecoder = TextDecoder;
(globalThis as any).ReadableStream = ReadableStream;

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Response: UndiciResponse } = require('undici');
(globalThis as any).Response = UndiciResponse;

// Capture event listeners the SW registers on `self`
const listeners: Record<string, Function> = {};
jest.spyOn(self, 'addEventListener').mockImplementation(((
  type: string,
  handler: Function
) => {
  listeners[type] = handler;
}) as any);

// Import triggers side-effect listener registration
import '../download-sw';

describe('download-sw', () => {
  const messageHandler = () => listeners['message'] as (e: any) => void;
  const fetchHandler = () => listeners['fetch'] as (e: any) => void;

  // Service worker messages must originate from a same-origin client.
  const ORIGIN = self.location.origin;

  it('intercepts fetch matching /amplify-storage-download/ pattern', () => {
    const stream = new ReadableStream();
    const mockPort = { postMessage: jest.fn() };
    messageHandler()({
      origin: ORIGIN,
      data: { downloadId: 'test-id', stream },
      ports: [mockPort],
    });

    const respondWith = jest.fn();
    fetchHandler()({
      request: { url: 'https://localhost/amplify-storage-download/test-id' },
      respondWith,
    });

    expect(respondWith).toHaveBeenCalledWith(expect.any(Response));
  });

  it('ignores URLs not matching the pattern', () => {
    const respondWith = jest.fn();
    fetchHandler()({
      request: { url: 'https://localhost/other-path/file.zip' },
      respondWith,
    });

    expect(respondWith).not.toHaveBeenCalled();
  });

  it('returns response with correct headers', () => {
    const stream = new ReadableStream();
    messageHandler()({
      origin: ORIGIN,
      data: { downloadId: 'my-file.zip', stream },
      ports: [{ postMessage: jest.fn() }],
    });

    const respondWith = jest.fn();
    fetchHandler()({
      request: {
        url: 'https://localhost/amplify-storage-download/my-file.zip',
      },
      respondWith,
    });

    const response: Response = respondWith.mock.calls[0][0];
    expect(response.headers.get('Content-Disposition')).toBe(
      "attachment; filename*=UTF-8''my-file.zip"
    );
    expect(response.headers.get('Content-Type')).toBe(
      'application/octet-stream'
    );
  });

  it('stores the stream under the unencoded id and matches the encoded request URL', () => {
    // The page stores the stream keyed by the raw (unencoded) download id.
    // The browser percent-encodes the id when the <a download> navigation fires.
    // The SW must decode the request pathname before looking the stream up.
    const stream = new ReadableStream();
    const unencodedId = 'path/to/my file.zip';
    messageHandler()({
      origin: ORIGIN,
      data: { downloadId: unencodedId, stream },
      ports: [{ postMessage: jest.fn() }],
    });

    const respondWith = jest.fn();
    fetchHandler()({
      request: {
        // Browser-encoded form of the same id (space -> %20)
        url: 'https://localhost/amplify-storage-download/path/to/my%20file.zip',
      },
      respondWith,
    });

    // Lookup succeeds despite the encoding mismatch
    expect(respondWith).toHaveBeenCalledWith(expect.any(Response));
    const response: Response = respondWith.mock.calls[0][0];
    expect(response.headers.get('Content-Disposition')).toBe(
      "attachment; filename*=UTF-8''my%20file.zip"
    );
  });

  it('decodes URI components in filename', () => {
    // Stream stored under the unencoded id; request arrives percent-encoded.
    const stream = new ReadableStream();
    const unencodedId = 'path/to/my file.zip';
    messageHandler()({
      origin: ORIGIN,
      data: { downloadId: unencodedId, stream },
      ports: [{ postMessage: jest.fn() }],
    });

    const respondWith = jest.fn();
    fetchHandler()({
      request: {
        url: 'https://localhost/amplify-storage-download/path/to/my%20file.zip',
      },
      respondWith,
    });

    const response: Response = respondWith.mock.calls[0][0];
    // RFC 5987 extended notation re-encodes the filename
    expect(response.headers.get('Content-Disposition')).toBe(
      "attachment; filename*=UTF-8''my%20file.zip"
    );
  });

  it('uses the explicit filename for Content-Disposition, not the timestamped id', () => {
    // The page keeps a timestamped id unique for the stream map, but sends the
    // clean user-facing filename separately. The SW must use the filename so the
    // saved file is e.g. "photos.zip", not "photos-1720080000000.zip".
    const stream = new ReadableStream();
    const downloadId = 'photos-1720080000000.zip';
    messageHandler()({
      origin: ORIGIN,
      data: { downloadId, filename: 'photos.zip', stream },
      ports: [{ postMessage: jest.fn() }],
    });

    const respondWith = jest.fn();
    fetchHandler()({
      request: {
        url: `https://localhost/amplify-storage-download/${downloadId}`,
      },
      respondWith,
    });

    const response: Response = respondWith.mock.calls[0][0];
    expect(response.headers.get('Content-Disposition')).toBe(
      "attachment; filename*=UTF-8''photos.zip"
    );
  });

  it('does not call respondWith when no stream stored', () => {
    const respondWith = jest.fn();
    fetchHandler()({
      request: {
        url: 'https://localhost/amplify-storage-download/unknown-id',
      },
      respondWith,
    });

    expect(respondWith).not.toHaveBeenCalled();
  });

  it('cleans up stored stream after responding', () => {
    const stream = new ReadableStream();
    messageHandler()({
      origin: ORIGIN,
      data: { downloadId: 'cleanup-test', stream },
      ports: [{ postMessage: jest.fn() }],
    });

    const respondWith = jest.fn();
    fetchHandler()({
      request: {
        url: 'https://localhost/amplify-storage-download/cleanup-test',
      },
      respondWith,
    });
    expect(respondWith).toHaveBeenCalled();

    // Second fetch for same ID should fall through
    const respondWith2 = jest.fn();
    fetchHandler()({
      request: {
        url: 'https://localhost/amplify-storage-download/cleanup-test',
      },
      respondWith: respondWith2,
    });
    expect(respondWith2).not.toHaveBeenCalled();
  });

  it('ignores messages from a foreign origin', () => {
    const stream = new ReadableStream();
    const mockPort = { postMessage: jest.fn() };
    // Message from a different origin must be rejected — the stream is not stored
    // and no acknowledgement is sent.
    messageHandler()({
      origin: 'https://evil.example.com',
      data: { downloadId: 'foreign-id', stream },
      ports: [mockPort],
    });

    expect(mockPort.postMessage).not.toHaveBeenCalled();

    // A subsequent fetch for that ID falls through (stream was never stored)
    const respondWith = jest.fn();
    fetchHandler()({
      request: {
        url: 'https://localhost/amplify-storage-download/foreign-id',
      },
      respondWith,
    });
    expect(respondWith).not.toHaveBeenCalled();
  });
});
