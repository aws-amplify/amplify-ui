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
  // The message handler now calls `event.waitUntil` when it stores a stream
  // (keepalive hold). Default a no-op `waitUntil` so existing call sites that
  // only pass { origin, data, ports } keep working; tests that need to assert on
  // the hold pass their own `waitUntil`.
  const messageHandler =
    () =>
    (event: any): void =>
      (listeners['message'] as (e: any) => void)({
        waitUntil: () => {},
        ...event,
      });
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

  it('responds with 410 when no stream is stored', () => {
    // A miss means the SW restarted and lost the stream (or the id is stale).
    // The SW must fail fast with a 410 rather than falling through to the
    // network, where the URL 404s and Chrome hangs with no error.
    const respondWith = jest.fn();
    fetchHandler()({
      request: {
        url: 'https://localhost/amplify-storage-download/unknown-id',
      },
      respondWith,
    });

    expect(respondWith).toHaveBeenCalledWith(expect.any(Response));
    const response: Response = respondWith.mock.calls[0][0];
    expect(response.status).toBe(410);
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

    // Second fetch for same ID: stream already consumed, so it now 410s
    // (previously fell through to the network).
    const respondWith2 = jest.fn();
    fetchHandler()({
      request: {
        url: 'https://localhost/amplify-storage-download/cleanup-test',
      },
      respondWith: respondWith2,
    });
    expect(respondWith2).toHaveBeenCalledWith(expect.any(Response));
    expect(respondWith2.mock.calls[0][0].status).toBe(410);
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

    // A subsequent fetch for that ID 410s (stream was never stored because the
    // message was rejected), rather than streaming an injected payload.
    const respondWith = jest.fn();
    fetchHandler()({
      request: {
        url: 'https://localhost/amplify-storage-download/foreign-id',
      },
      respondWith,
    });
    expect(respondWith).toHaveBeenCalledWith(expect.any(Response));
    expect(respondWith.mock.calls[0][0].status).toBe(410);
  });

  it("passes through a request for the SW's own script without a 410", () => {
    // A request for the worker's own script URL (self.location) is the worker
    // itself, not a download id — it must fall through to the network rather
    // than being treated as a missing stream and 410'd. The handler compares
    // against self.location.pathname, so drive it with the worker's own URL.
    const respondWith = jest.fn();
    fetchHandler()({
      request: {
        url: self.location.href,
      },
      respondWith,
    });

    expect(respondWith).not.toHaveBeenCalled();
  });

  it('410 response carries a plain-text body and content type', () => {
    const respondWith = jest.fn();
    fetchHandler()({
      request: { url: 'https://localhost/amplify-storage-download/missing' },
      respondWith,
    });

    const response: Response = respondWith.mock.calls[0][0];
    expect(response.status).toBe(410);
    expect(response.headers.get('Content-Type')).toBe('text/plain');
  });

  it('holds the SW alive until the fetch consumes the stream, then releases', async () => {
    // Storing a stream must register a waitUntil hold; the matching fetch
    // releases it (resolves the promise) so the SW is not pinned past the
    // transfer handoff.
    const stream = new ReadableStream();
    let holdResolved = false;
    const holdPromises: Promise<unknown>[] = [];

    messageHandler()({
      origin: ORIGIN,
      data: { downloadId: 'hold-test', stream },
      ports: [{ postMessage: jest.fn() }],
      waitUntil: (p: Promise<unknown>) => {
        holdPromises.push(p);
        void p.then(() => {
          holdResolved = true;
        });
      },
    });

    // Hold is registered but not yet resolved.
    expect(holdPromises).toHaveLength(1);
    await Promise.resolve();
    expect(holdResolved).toBe(false);

    // The matching fetch consumes the stream and releases the hold. Race the
    // hold against a short sentinel so a regression that never releases fails
    // with a clear assertion rather than the test's 5s timeout.
    fetchHandler()({
      request: { url: 'https://localhost/amplify-storage-download/hold-test' },
      respondWith: jest.fn(),
    });

    const SENTINEL = Symbol('not-resolved');
    const raced = await Promise.race([
      holdPromises[0].then(() => 'released'),
      new Promise((resolve) => setTimeout(() => resolve(SENTINEL), 50)),
    ]);
    expect(raced).toBe('released');
    expect(holdResolved).toBe(true);
  });

  it('on the 30s cap: 410s the fetch, resolves the hold, and cancels the stream', async () => {
    jest.useFakeTimers();
    try {
      const cancel = jest.fn().mockResolvedValue(undefined);
      const stream = { cancel } as unknown as ReadableStream;
      let holdResolved = false;

      messageHandler()({
        origin: ORIGIN,
        data: { downloadId: 'cap-a', stream },
        ports: [{ postMessage: jest.fn() }],
        waitUntil: (p: Promise<unknown>) => {
          void p.then(() => {
            holdResolved = true;
          });
        },
      });

      // Just before the boundary: hold still open, stream not cancelled, and a
      // fetch would still stream (entry present).
      jest.advanceTimersByTime(29_999);
      await Promise.resolve();
      expect(holdResolved).toBe(false);
      expect(cancel).not.toHaveBeenCalled();

      const respondWithBefore = jest.fn();
      fetchHandler()({
        request: { url: 'https://localhost/amplify-storage-download/cap-a' },
        respondWith: respondWithBefore,
      });
      const before: Response = respondWithBefore.mock.calls[0][0];
      expect(before.status).not.toBe(410);
    } finally {
      jest.useRealTimers();
    }
  });

  it('on the 30s cap: a later fetch 410s and the stream was cancelled with an Error', async () => {
    jest.useFakeTimers();
    try {
      const cancel = jest.fn().mockResolvedValue(undefined);
      const stream = { cancel } as unknown as ReadableStream;
      let holdResolved = false;

      messageHandler()({
        origin: ORIGIN,
        data: { downloadId: 'cap-b', stream },
        ports: [{ postMessage: jest.fn() }],
        waitUntil: (p: Promise<unknown>) => {
          void p.then(() => {
            holdResolved = true;
          });
        },
      });

      // Cross the cap boundary.
      jest.advanceTimersByTime(30_000);
      await Promise.resolve();

      // Hold released, stream cancelled with an Error (so the page handler's
      // err.message is defined and the task ends FAILED, not CANCELED).
      expect(holdResolved).toBe(true);
      expect(cancel).toHaveBeenCalledTimes(1);
      expect(cancel.mock.calls[0][0]).toBeInstanceOf(Error);

      // The entry is gone, so a late fetch 410s.
      const respondWith = jest.fn();
      fetchHandler()({
        request: { url: 'https://localhost/amplify-storage-download/cap-b' },
        respondWith,
      });
      expect(respondWith.mock.calls[0][0].status).toBe(410);
    } finally {
      jest.useRealTimers();
    }
  });

  it('a keepalive ping refreshes the cap so an in-progress download is not capped', async () => {
    // The page pings keepalive every 10s. Each ping must refresh the cap so a
    // stream still waiting for its fetch (e.g. user sitting on Chrome's
    // multi-download prompt) is not cancelled out from under it at 30s.
    jest.useFakeTimers();
    try {
      const cancel = jest.fn().mockResolvedValue(undefined);
      const stream = { cancel } as unknown as ReadableStream;

      messageHandler()({
        origin: ORIGIN,
        data: { downloadId: 'ka', stream },
        ports: [{ postMessage: jest.fn() }],
        waitUntil: () => {},
      });

      // Approach the boundary, then ping keepalive to refresh the cap.
      jest.advanceTimersByTime(29_000);
      messageHandler()({
        origin: ORIGIN,
        data: { type: 'keepalive' },
        waitUntil: () => {},
      });

      // Past the original 30s mark, but within the refreshed window: not capped.
      jest.advanceTimersByTime(5_000);
      expect(cancel).not.toHaveBeenCalled();

      // The fetch still finds the stream and streams it (no 410).
      const respondWith = jest.fn();
      fetchHandler()({
        request: { url: 'https://localhost/amplify-storage-download/ka' },
        respondWith,
      });
      expect(respondWith).toHaveBeenCalledWith(expect.any(Response));
      expect(respondWith.mock.calls[0][0].status).not.toBe(410);
      expect(cancel).not.toHaveBeenCalled();
    } finally {
      jest.useRealTimers();
    }
  });
});
