import { TextEncoder, TextDecoder } from 'util';
import {
  ReadableStream,
  WritableStream,
  TransformStream,
} from 'node:stream/web';

// jsdom doesn't provide these Web APIs
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
(globalThis as any).TextEncoder = TextEncoder;
(globalThis as any).TextDecoder = TextDecoder;
(globalThis as any).ReadableStream = ReadableStream;
(globalThis as any).WritableStream = WritableStream;
(globalThis as any).TransformStream = TransformStream;
/* eslint-enable @typescript-eslint/no-unsafe-member-access */

import { getUrl, GetUrlInput } from '../../../storage-internal';
import { zipDownloadHandler, getDownloadTrigger } from '../zipdownload';
import type { DownloadHandlerInput } from '../download';

jest.mock('../../../storage-internal');

const mockPostMessage = jest.fn();

// jsdom doesn't provide MessageChannel — mock it so SW init path works
class MockMessageChannel {
  port1: { onmessage: ((ev: MessageEvent) => void) | null; close: jest.Mock };
  port2: {};
  constructor() {
    this.port1 = { onmessage: null, close: jest.fn() };
    this.port2 = {};
    // Simulate the SW responding on port1 after a microtask
    const { port1 } = this;
    queueMicrotask(() => {
      if (port1.onmessage) {
        port1.onmessage(new MessageEvent('message', { data: 'ready' }));
      }
    });
  }
}
(
  globalThis as unknown as { MessageChannel: typeof MockMessageChannel }
).MessageChannel = MockMessageChannel;

let mockZipWritable: WritableStream | null = null;
// Records the entry names passed to zipWriter.add() so tests can assert
// relativePath vs basename behavior.
const mockAddedFilenames: string[] = [];

jest.mock('@zip.js/zip.js', () => ({
  ZipWriter: jest.fn().mockImplementation((writable: WritableStream) => {
    mockZipWritable = writable;
    return {
      add: jest
        .fn()
        .mockImplementation((filename: string, readable: ReadableStream) => {
          mockAddedFilenames.push(filename);
          // Consume the input readable stream to simulate zip.js reading file data
          const reader = readable.getReader();
          const drain = async () => {
            for (;;) {
              const { done } = await reader.read();
              if (done) break;
            }
          };
          return drain();
        }),
      close: jest.fn().mockImplementation(async () => {
        // Write final bytes and close the writable so collectBlob finishes (blob fallback).
        // In the SW path nothing consumes the readable so writes may hang — use try-catch.
        try {
          const writer = mockZipWritable!.getWriter();
          await Promise.race([
            (async () => {
              await writer.write(new Uint8Array([0x50, 0x4b]));
              await writer.close();
            })(),
            new Promise<void>((resolve) => setTimeout(resolve, 5)),
          ]);
        } catch {
          // writable already closed/errored (e.g. SW path or cancel)
        }
      }),
    };
  }),
}));

/**
 * Flushes pending microtasks and macrotasks.
 * Drains the event loop by yielding execution multiple times,
 * giving chained .then() and setTimeout(fn, 0) callbacks time to fire.
 *
 * This replaces brittle `for (i < 10) { await setTimeout(0) }` loops.
 */
const flushAsync = async (): Promise<void> => {
  // Each setTimeout(0) yields to both the microtask queue and the macrotask queue.
  // Multiple iterations ensure deeply-chained promises fully resolve.
  await new Promise<void>((resolve) => setTimeout(resolve, 0));
  await new Promise<void>((resolve) => setTimeout(resolve, 0));
  await new Promise<void>((resolve) => setTimeout(resolve, 0));
  // A slightly longer wait to catch any delayed setTimeout callbacks (e.g. the 5ms race in mock close)
  await new Promise<void>((resolve) => setTimeout(resolve, 20));
  await new Promise<void>((resolve) => setTimeout(resolve, 0));
};

const createBaseInput = (): DownloadHandlerInput => ({
  config: {
    accountId: 'accountId',
    bucket: 'bucket',
    credentials: jest.fn(),
    customEndpoint: 'mock-endpoint',
    region: 'region',
  },
  data: {
    id: 'id',
    key: 'prefix/file-name',
    fileKey: 'file-name',
  },
  all: [
    {
      id: 'id',
      key: 'prefix/file-name',
      fileKey: 'file-name',
    },
  ],
});

// Representative user-agent strings for the three engine branches. The handler
// routes the SW-stream trigger by engine: Chromium → hidden iframe, Firefox →
// <a download>, everything else (Safari/unknown) → in-memory blob fallback.
const CHROMIUM_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const FIREFOX_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0';
const SAFARI_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15';

const setUserAgent = (value: string): void => {
  Object.defineProperty(navigator, 'userAgent', {
    value,
    writable: true,
    configurable: true,
  });
};

describe('getDownloadTrigger', () => {
  it.each([
    // Chromium family → iframe
    [
      'iframe',
      'Chrome desktop',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    ],
    [
      'iframe',
      'Edge',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
    ],
    [
      'iframe',
      'Opera',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106.0.0.0',
    ],
    [
      'iframe',
      'Samsung Internet',
      'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/23.0 Chrome/115.0.0.0 Mobile Safari/537.36',
    ],
    [
      'iframe',
      'Android Chrome',
      'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
    ],
    // Gecko family → anchor
    [
      'anchor',
      'Firefox desktop',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0',
    ],
    [
      'anchor',
      'Firefox Android',
      'Mozilla/5.0 (Android 13; Mobile; rv:121.0) Gecko/121.0 Firefox/121.0',
    ],
    // WebKit / iOS → blob
    [
      'blob',
      'Safari macOS',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15',
    ],
    [
      'blob',
      'iOS Safari',
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1',
    ],
    [
      'blob',
      'iOS Chrome (CriOS)',
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120.0.0.0 Mobile/15E148 Safari/604.1',
    ],
    [
      'blob',
      'iOS Firefox (FxiOS)',
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/121.0 Mobile/15E148 Safari/605.1.15',
    ],
    [
      'blob',
      'iOS Edge (EdgiOS)',
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) EdgiOS/120.0.0.0 Mobile/15E148 Safari/605.1.15',
    ],
    ['blob', 'unknown engine', 'SomeFutureBrowser/1.0'],
  ])('routes %s for %s', (expected, _label, ua) => {
    expect(getDownloadTrigger(ua)).toBe(expected);
  });
});

describe('zipDownloadHandler', () => {
  const url = new URL('mock://fake.url');
  const mockGetUrl = jest.mocked(getUrl);
  let mockAnchor: { href: string; download: string; click: jest.Mock };

  beforeEach(() => {
    mockAddedFilenames.length = 0;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1);
    mockGetUrl.mockResolvedValue({ expiresAt, url });

    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: { get: (h: string) => (h === 'content-length' ? '100' : null) },
      body: new ReadableStream({
        start(ctrl) {
          ctrl.enqueue(new Uint8Array(50));
          ctrl.enqueue(new Uint8Array(50));
          ctrl.close();
        },
      }),
    });

    Object.defineProperty(globalThis, 'crypto', {
      value: { randomUUID: () => 'test-uuid-1234' },
      writable: true,
      configurable: true,
    });

    Object.defineProperty(navigator, 'serviceWorker', {
      value: {
        controller: true,
        getRegistrations: jest.fn().mockResolvedValue([
          {
            scope: 'https://example.com/amplify-storage-download/',
            active: { postMessage: mockPostMessage },
          },
        ]),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
      writable: true,
      configurable: true,
    });

    mockAnchor = { href: '', download: '', click: jest.fn() };
    jest
      .spyOn(document, 'createElement')
      .mockReturnValue(mockAnchor as unknown as HTMLElement);

    // Default to a Firefox UA so the existing anchor-based assertions exercise
    // the <a download> branch. Chromium/Safari/unknown engines are covered
    // explicitly in the 'engine routing' describe below.
    setUserAgent(FIREFOX_UA);
  });

  afterEach(async () => {
    await flushAsync();
    jest.restoreAllMocks();
    mockPostMessage.mockReset();
  });

  it('calls `getUrl` with the expected values', async () => {
    const input = createBaseInput();
    const { result } = zipDownloadHandler(input);
    await result;
    const expected: GetUrlInput = {
      path: input.data.key,
      options: {
        bucket: {
          bucketName: input.config.bucket,
          region: input.config.region,
        },
        customEndpoint: input.config.customEndpoint,
        locationCredentialsProvider: input.config.credentials,
        validateObjectExistence: true,
        contentDisposition: 'attachment',
        expectedBucketOwner: input.config.accountId,
      },
    };
    expect(mockGetUrl).toHaveBeenCalledWith(expected);
  });

  it('returns a complete status', async () => {
    const input = createBaseInput();
    const { result } = zipDownloadHandler(input);
    expect(await result).toEqual({ status: 'COMPLETE' });
  });

  it('calls progress callbacks correctly', async () => {
    const onProgress = jest.fn();
    const input = createBaseInput();
    const { result } = zipDownloadHandler({
      ...input,
      options: { onProgress },
    });
    await result;
    expect(onProgress).toHaveBeenCalledWith(input.data, 0.5, 'PENDING');
    expect(onProgress).toHaveBeenCalledWith(input.data, 1, 'COMPLETE');
  });

  it('returns failed status on error', async () => {
    const error = new Error('No download');
    mockGetUrl.mockRejectedValue(error);
    const input = createBaseInput();
    const { result } = zipDownloadHandler(input);
    expect(await result).toEqual({
      error,
      message: error.message,
      status: 'FAILED',
    });
  });

  it('marks a non-ok response (e.g. 403 Glacier) FAILED without blocking the rest of the batch', async () => {
    // S3 returns 403 for a GLACIER/DEEP_ARCHIVE object that has not been
    // restored. `fetch` resolves (does not reject) with a non-ok response, so
    // without a `response.ok` guard the error body would be zipped as file
    // content and the task would settle COMPLETE.
    (globalThis.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: false,
        status: 403,
        statusText: 'Forbidden',
        headers: { get: () => null },
        body: new ReadableStream({
          start(ctrl) {
            ctrl.close();
          },
        }),
      })
      .mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: {
          get: (h: string) => (h === 'content-length' ? '100' : null),
        },
        body: new ReadableStream({
          start(ctrl) {
            ctrl.enqueue(new Uint8Array(100));
            ctrl.close();
          },
        }),
      });

    const file1 = { id: 'g1', key: 'prefix/archived', fileKey: 'archived' };
    const file2 = { id: 'g2', key: 'prefix/available', fileKey: 'available' };
    const all = [file1, file2];
    const base = createBaseInput();

    const r1 = zipDownloadHandler({ ...base, data: file1, all });
    expect(await r1.result).toEqual({
      status: 'FAILED',
      message: 'Failed to download prefix/archived: 403 Forbidden',
      error: expect.any(Error),
    });

    // The `!response.ok` throw fires before `zipWriter.add`, so the 403 body
    // must never become a zip entry — assert that directly, not via the status.
    expect(mockAddedFilenames).not.toContain('archived');

    // The failure did not cancel the batch — file 2 downloads normally.
    const r2 = zipDownloadHandler({ ...base, data: file2, all });
    expect(await r2.result).toEqual({ status: 'COMPLETE' });

    expect(mockAddedFilenames).toEqual(['available']);
  });

  it('does not abort the batch when a file fails in-flight (concurrent dispatch)', async () => {
    // Production dispatches with `concurrency: 1` (the sequential test above).
    // Here both files are in flight at once, so a regression that aborted the
    // shared `batchAbort` on a per-file failure would cancel the sibling —
    // surfacing CANCELED instead of COMPLETE, which the sequential test can't see.
    (globalThis.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: false,
        status: 403,
        statusText: 'Forbidden',
        headers: { get: () => null },
        body: new ReadableStream({
          start(ctrl) {
            ctrl.close();
          },
        }),
      })
      .mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: {
          get: (h: string) => (h === 'content-length' ? '100' : null),
        },
        body: new ReadableStream({
          start(ctrl) {
            ctrl.enqueue(new Uint8Array(100));
            ctrl.close();
          },
        }),
      });

    const file1 = { id: 'c1', key: 'prefix/archived', fileKey: 'archived' };
    const file2 = { id: 'c2', key: 'prefix/available', fileKey: 'available' };
    const all = [file1, file2];
    const base = createBaseInput();

    const r1 = zipDownloadHandler({ ...base, data: file1, all });
    const onProgress = jest.fn();
    const r2 = zipDownloadHandler({
      ...base,
      data: file2,
      all,
      options: { onProgress },
    });
    const [result1, result2] = await Promise.all([r1.result, r2.result]);

    expect(result1).toEqual({
      status: 'FAILED',
      message: 'Failed to download prefix/archived: 403 Forbidden',
      error: expect.any(Error),
    });
    expect(result2).toEqual({ status: 'COMPLETE' });

    expect(mockAddedFilenames).not.toContain('archived');
    expect(mockAddedFilenames).toEqual(['available']);
    // The sibling's bytes actually flowed into its entry, not just a COMPLETE
    // status: onProgress only reaches 'COMPLETE' after the response body is fully
    // read and enqueued toward the zip writer.
    expect(onProgress).toHaveBeenCalledWith(file2, 1, 'COMPLETE');
  });

  it('posts stream to service worker and triggers download', async () => {
    const input = createBaseInput();
    const { result } = zipDownloadHandler(input);
    // result now awaits cleanup (including SW anchor click) before resolving
    await result;
    await flushAsync();
    expect(mockPostMessage).toHaveBeenCalledWith(
      expect.objectContaining({ downloadId: expect.any(String) }),
      expect.any(Array)
    );
    expect(mockAnchor.href).toMatch(/\/amplify-storage-download\//);
    expect(mockAnchor.download).toBe('prefix.zip');
    expect(mockAnchor.click).toHaveBeenCalled();
  });

  it('falls back to blob when SW unavailable', async () => {
    Object.defineProperty(navigator, 'serviceWorker', {
      value: {
        controller: null,
        getRegistrations: jest.fn().mockResolvedValue([]),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
      writable: true,
      configurable: true,
    });

    const mockCreateObjectURL = jest.fn(() => 'blob:mock-url');
    const mockRevokeObjectURL = jest.fn();
    globalThis.URL.createObjectURL = mockCreateObjectURL;
    globalThis.URL.revokeObjectURL = mockRevokeObjectURL;

    const input = createBaseInput();
    const { result } = zipDownloadHandler(input);
    // result now awaits cleanup completion (blob download) before resolving
    await result;

    expect(mockPostMessage).not.toHaveBeenCalled();
    expect(mockCreateObjectURL).toHaveBeenCalledWith(expect.any(Blob));
    expect(mockAnchor.href).toBe('blob:mock-url');
    expect(mockAnchor.download).toBe('prefix.zip');
    expect(mockAnchor.click).toHaveBeenCalled();
  });

  it('revokes blob URL after fallback download', async () => {
    // Covers the "download SW matches by scope but is not active yet" case
    // (e.g. first visit while it is still installing/waiting): reg is found but
    // `reg.active` is null, so the handler must still take the blob fallback.
    Object.defineProperty(navigator, 'serviceWorker', {
      value: {
        controller: null,
        getRegistrations: jest.fn().mockResolvedValue([
          {
            scope: 'https://example.com/amplify-storage-download/',
            active: null,
          },
        ]),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
      writable: true,
      configurable: true,
    });

    const mockRevokeObjectURL = jest.fn();
    globalThis.URL.createObjectURL = jest.fn(() => 'blob:revoke-test');
    globalThis.URL.revokeObjectURL = mockRevokeObjectURL;

    const input = createBaseInput();
    const { result } = zipDownloadHandler(input);
    // result now awaits cleanup completion before resolving
    await result;

    expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:revoke-test');
  });

  it('takes the early-exit cancelled path for remaining files after a cancel', async () => {
    // A multi-file batch keeps its state in `batchMap` until the final file
    // settles. If an earlier file is cancelled, subsequent files must hit the
    // `existingBatch.cancelled` early-exit branch and return CANCELED with a
    // (noop) cancel function rather than starting a fresh batch/download.
    const abortErr = new Error('The user aborted a request.');
    abortErr.name = 'AbortError';
    (globalThis.fetch as jest.Mock).mockRejectedValueOnce(abortErr);

    const file1 = { id: 'id1', key: 'prefix/file-1', fileKey: 'file-1' };
    const file2 = { id: 'id2', key: 'prefix/file-2', fileKey: 'file-2' };
    const all = [file1, file2];
    const base = createBaseInput();

    // File 1 — fetch rejects with AbortError → batch flagged cancelled (not reset)
    const r1 = zipDownloadHandler({ ...base, data: file1, all });
    expect(await r1.result).toEqual({
      status: 'CANCELED',
      message: 'Download cancelled',
    });

    // File 2 — same `all`; batch is still present and cancelled → early-exit branch
    const r2 = zipDownloadHandler({ ...base, data: file2, all });
    expect(r2.cancel).toBeDefined();
    expect(typeof r2.cancel).toBe('function');
    // The noop cancel on the early-exit path must not throw
    expect(() => r2.cancel!()).not.toThrow();
    expect(await r2.result).toEqual({
      status: 'CANCELED',
      message: 'Download cancelled',
    });

    // File 2 was never fetched (only the file-1 rejection was consumed)
    expect((globalThis.fetch as jest.Mock).mock.calls.length).toBe(1);
  });

  it('does not resurrect the download when cancelled via the UI cancel button', async () => {
    // Regression for the cancel-resurrection bug: cancel() must NOT delete the
    // batch entry synchronously, otherwise the next queued file (concurrency: 1)
    // builds a fresh batch and downloads files 2..N into a new zip.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { ZipWriter } = require('@zip.js/zip.js');
    (ZipWriter as jest.Mock).mockClear();

    const file1 = { id: 'c1', key: 'prefix/file-1', fileKey: 'file-1' };
    const file2 = { id: 'c2', key: 'prefix/file-2', fileKey: 'file-2' };
    const all = [file1, file2];
    const base = createBaseInput();

    // Start file 1, then immediately hit the UI cancel button
    const r1 = zipDownloadHandler({ ...base, data: file1, all });
    r1.cancel!();
    expect(await r1.result).toEqual({
      status: 'CANCELED',
      message: 'Download cancelled',
    });

    // File 2 is re-dispatched with the same `all`; it must take the cancelled
    // early-exit rather than building a new batch.
    const r2 = zipDownloadHandler({ ...base, data: file2, all });
    expect(await r2.result).toEqual({
      status: 'CANCELED',
      message: 'Download cancelled',
    });

    // Exactly ONE batch (one ZipWriter) was constructed across both files —
    // proving file 2 did not resurrect the download.
    expect((ZipWriter as jest.Mock).mock.calls.length).toBe(1);
  });

  describe('service worker lookup by scope', () => {
    it('selects the download SW by scope among multiple registrations', async () => {
      // The host page may register its own root ('/') SW alongside the download
      // SW. The lookup must pick the '/amplify-storage-download/' registration,
      // not the root one, and must not fall back to blob.
      const rootPostMessage = jest.fn();
      Object.defineProperty(navigator, 'serviceWorker', {
        value: {
          controller: true,
          getRegistrations: jest.fn().mockResolvedValue([
            {
              scope: 'https://example.com/',
              active: { postMessage: rootPostMessage },
            },
            {
              scope: 'https://example.com/amplify-storage-download/',
              active: { postMessage: mockPostMessage },
            },
          ]),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
        },
        writable: true,
        configurable: true,
      });

      const input = createBaseInput();
      const { result } = zipDownloadHandler(input);
      await result;
      await flushAsync();

      // Streamed via the download SW, not the root SW, and not via blob.
      expect(mockPostMessage).toHaveBeenCalledWith(
        expect.objectContaining({ downloadId: expect.any(String) }),
        expect.any(Array)
      );
      expect(rootPostMessage).not.toHaveBeenCalled();
      expect(mockAnchor.href).toMatch(/\/amplify-storage-download\//);
    });

    it('falls back to blob when only a non-matching root SW is registered', async () => {
      // A page-registered root SW must not be mistaken for the download SW:
      // `getRegistration('/amplify-storage-download/')` could resolve the root
      // SW relative to the page, wrongly skipping the fallback.
      const rootPostMessage = jest.fn();
      Object.defineProperty(navigator, 'serviceWorker', {
        value: {
          controller: true,
          getRegistrations: jest.fn().mockResolvedValue([
            {
              scope: 'https://example.com/',
              active: { postMessage: rootPostMessage },
            },
          ]),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
        },
        writable: true,
        configurable: true,
      });

      const mockCreateObjectURL = jest.fn(() => 'blob:scope-miss');
      globalThis.URL.createObjectURL = mockCreateObjectURL;
      globalThis.URL.revokeObjectURL = jest.fn();

      const input = createBaseInput();
      const { result } = zipDownloadHandler(input);
      await result;
      await flushAsync();

      expect(rootPostMessage).not.toHaveBeenCalled();
      expect(mockPostMessage).not.toHaveBeenCalled();
      expect(mockCreateObjectURL).toHaveBeenCalledWith(expect.any(Blob));
      expect(mockAnchor.href).toBe('blob:scope-miss');
    });
  });

  describe('engine routing (SW trigger vs blob fallback)', () => {
    it('Chromium: triggers via a hidden iframe (no download attribute)', async () => {
      setUserAgent(CHROMIUM_UA);

      // Chromium creates an <iframe>; model only the fields the handler sets.
      const iframe: {
        hidden: boolean;
        src: string;
        download?: string;
        parentNode: ParentNode | null;
        addEventListener: jest.Mock;
      } = {
        hidden: false,
        src: '',
        parentNode: null,
        addEventListener: jest.fn(),
      };
      jest
        .spyOn(document, 'createElement')
        .mockReturnValue(iframe as unknown as HTMLElement);
      const appendSpy = jest
        .spyOn(document.body, 'appendChild')
        .mockImplementation(((node: unknown) => {
          iframe.parentNode = document.body;
          return node;
        }) as typeof document.body.appendChild);

      const input = createBaseInput();
      const { result } = zipDownloadHandler(input);
      await result;
      await flushAsync();

      // Streamed via the SW (postMessage), then triggered via the iframe.
      expect(mockPostMessage).toHaveBeenCalled();
      expect(appendSpy).toHaveBeenCalledWith(iframe);
      expect(iframe.hidden).toBe(true);
      expect(iframe.src).toMatch(/\/amplify-storage-download\//);
      // No `download` attribute on the iframe path — the SW's Content-Disposition
      // supplies the filename.
      expect(iframe.download).toBeUndefined();
    });

    it('Safari: skips the SW and falls back to blob', async () => {
      setUserAgent(SAFARI_UA);

      const mockCreateObjectURL = jest.fn(() => 'blob:safari');
      globalThis.URL.createObjectURL = mockCreateObjectURL;
      globalThis.URL.revokeObjectURL = jest.fn();

      const input = createBaseInput();
      const { result } = zipDownloadHandler(input);
      await result;
      await flushAsync();

      // WebKit never reaches the narrow-scope SW: no registration lookup, no
      // postMessage — the whole zip is collected into a blob instead.
      expect(mockPostMessage).not.toHaveBeenCalled();
      expect(
        (navigator.serviceWorker as unknown as { getRegistrations: jest.Mock })
          .getRegistrations
      ).not.toHaveBeenCalled();
      expect(mockCreateObjectURL).toHaveBeenCalledWith(expect.any(Blob));
      expect(mockAnchor.href).toBe('blob:safari');
      expect(mockAnchor.download).toBe('prefix.zip');
    });

    it('unknown engine: falls back to blob', async () => {
      setUserAgent('SomeFutureBrowser/1.0');

      const mockCreateObjectURL = jest.fn(() => 'blob:unknown');
      globalThis.URL.createObjectURL = mockCreateObjectURL;
      globalThis.URL.revokeObjectURL = jest.fn();

      const input = createBaseInput();
      const { result } = zipDownloadHandler(input);
      await result;
      await flushAsync();

      expect(mockPostMessage).not.toHaveBeenCalled();
      expect(mockCreateObjectURL).toHaveBeenCalledWith(expect.any(Blob));
      expect(mockAnchor.href).toBe('blob:unknown');
    });

    it('Firefox: triggers via a top-level <a download>', async () => {
      setUserAgent(FIREFOX_UA);

      const input = createBaseInput();
      const { result } = zipDownloadHandler(input);
      await result;
      await flushAsync();

      expect(mockPostMessage).toHaveBeenCalled();
      expect(mockAnchor.href).toMatch(/\/amplify-storage-download\//);
      expect(mockAnchor.download).toBe('prefix.zip');
      expect(mockAnchor.click).toHaveBeenCalled();
    });

    it('Chromium: percent-encodes a downloadId with URL-unsafe chars in iframe.src', async () => {
      // A folder like `Q#3 reports` makes downloadId `Q#3 reports-<ts>.zip`.
      // Unencoded, `#` starts a fragment and the SW sees the wrong id (download
      // silently never starts). The id must be encoded in the URL; the SW keys
      // its map on the raw id and decodes the path, so this round-trips.
      setUserAgent(CHROMIUM_UA);

      const iframe: {
        hidden: boolean;
        src: string;
        parentNode: ParentNode | null;
        addEventListener: jest.Mock;
      } = {
        hidden: false,
        src: '',
        parentNode: null,
        addEventListener: jest.fn(),
      };
      jest
        .spyOn(document, 'createElement')
        .mockReturnValue(iframe as unknown as HTMLElement);
      jest
        .spyOn(document.body, 'appendChild')
        .mockImplementation(
          ((node: unknown) => node) as typeof document.body.appendChild
        );

      const input = createBaseInput();
      input.data.key = 'Q#3 reports/file-name';
      input.all = [{ ...input.all[0], key: 'Q#3 reports/file-name' }];

      const { result } = zipDownloadHandler(input);
      await result;
      await flushAsync();

      // The raw `#`, ` ` must not appear literally in the URL.
      expect(iframe.src).not.toContain('#');
      expect(iframe.src).not.toContain(' ');
      expect(iframe.src).toContain('Q%233%20reports');
    });

    it('Firefox: percent-encodes a downloadId with URL-unsafe chars in a.href', async () => {
      setUserAgent(FIREFOX_UA);

      const input = createBaseInput();
      input.data.key = '50% off/file-name';
      input.all = [{ ...input.all[0], key: '50% off/file-name' }];

      const { result } = zipDownloadHandler(input);
      await result;
      await flushAsync();

      // `%` unencoded would make the SW's decodeURIComponent throw a URIError.
      expect(mockAnchor.href).toContain('50%25%20off');
      expect(mockAnchor.href).not.toMatch(/50% off/);
    });

    it('falls back to blob when getRegistrations() rejects', async () => {
      // Chromium throws SecurityError from SW APIs when site data is blocked.
      // The stream has not been transferred yet, so the handler must fall back to
      // blob rather than failing every file in the batch.
      setUserAgent(CHROMIUM_UA);
      Object.defineProperty(navigator, 'serviceWorker', {
        value: {
          controller: true,
          getRegistrations: jest
            .fn()
            .mockRejectedValue(
              Object.assign(new Error('denied'), { name: 'SecurityError' })
            ),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
        },
        writable: true,
        configurable: true,
      });

      const mockCreateObjectURL = jest.fn(() => 'blob:sw-rejected');
      globalThis.URL.createObjectURL = mockCreateObjectURL;
      globalThis.URL.revokeObjectURL = jest.fn();

      const input = createBaseInput();
      const { result } = zipDownloadHandler(input);
      expect(await result).toEqual({ status: 'COMPLETE' });
      await flushAsync();

      // Blob fallback fired; no file ended FAILED.
      expect(mockPostMessage).not.toHaveBeenCalled();
      expect(mockCreateObjectURL).toHaveBeenCalledWith(expect.any(Blob));
      expect(mockAnchor.href).toBe('blob:sw-rejected');
      expect(mockAnchor.download).toBe('prefix.zip');
    });

    it('Chromium: removes the iframe on load (after 5s)', async () => {
      jest.useFakeTimers();
      try {
        setUserAgent(CHROMIUM_UA);

        const removeChild = jest.fn();
        const iframe: {
          hidden: boolean;
          src: string;
          parentNode: { removeChild: jest.Mock } | null;
          addEventListener: jest.Mock;
        } = {
          hidden: false,
          src: '',
          parentNode: null,
          addEventListener: jest.fn(),
        };
        jest
          .spyOn(document, 'createElement')
          .mockReturnValue(iframe as unknown as HTMLElement);
        jest.spyOn(document.body, 'appendChild').mockImplementation(((
          node: unknown
        ) => {
          iframe.parentNode = { removeChild };
          return node;
        }) as typeof document.body.appendChild);

        // Fake timers are active BEFORE the handler runs, so the cleanup
        // setTimeouts are registered in fake-timer space. Flush the async SW
        // handshake (microtasks + the mock's short timers) so the iframe is
        // appended and its load/timeout callbacks are registered.
        const input = createBaseInput();
        const { result } = zipDownloadHandler(input);
        await jest.advanceTimersByTimeAsync(100);

        const loadCall = iframe.addEventListener.mock.calls.find(
          (call: [string, () => void]) => call[0] === 'load'
        ) as [string, () => void] | undefined;
        expect(loadCall).toBeDefined();

        // load fires -> cleanup scheduled 5s later -> iframe removed once.
        loadCall![1]();
        expect(removeChild).not.toHaveBeenCalled();
        await jest.advanceTimersByTimeAsync(5_000);
        expect(removeChild).toHaveBeenCalledTimes(1);

        await result;
      } finally {
        jest.useRealTimers();
      }
    });

    it('Chromium: removes the iframe via the 60s safety timeout when load never fires', async () => {
      // Attachment responses may never fire the iframe `load` event, so the 60s
      // hard timeout is the only cleanup path. Verify it actually runs (and runs
      // exactly once).
      jest.useFakeTimers();
      try {
        setUserAgent(CHROMIUM_UA);

        const removeChild = jest.fn();
        const iframe: {
          hidden: boolean;
          src: string;
          parentNode: { removeChild: jest.Mock } | null;
          addEventListener: jest.Mock;
        } = {
          hidden: false,
          src: '',
          parentNode: null,
          addEventListener: jest.fn(),
        };
        jest
          .spyOn(document, 'createElement')
          .mockReturnValue(iframe as unknown as HTMLElement);
        jest.spyOn(document.body, 'appendChild').mockImplementation(((
          node: unknown
        ) => {
          iframe.parentNode = { removeChild };
          return node;
        }) as typeof document.body.appendChild);

        const input = createBaseInput();
        const { result } = zipDownloadHandler(input);
        await jest.advanceTimersByTimeAsync(100);

        // load never invoked. Before 60s: not removed. After 60s: removed once.
        expect(removeChild).not.toHaveBeenCalled();
        await jest.advanceTimersByTimeAsync(60_000);
        expect(removeChild).toHaveBeenCalledTimes(1);

        await result;
      } finally {
        jest.useRealTimers();
      }
    });

    it('Chromium: second cleanup is a guarded no-op after the iframe is already detached', async () => {
      // Both the load->5s path and the 60s safety timeout can fire for the same
      // iframe. The second one must find parentNode already null and skip the
      // removeChild call (the `if (iframe.parentNode)` guard), not throw.
      jest.useFakeTimers();
      try {
        setUserAgent(CHROMIUM_UA);

        const removeChild = jest.fn();
        const iframe: {
          hidden: boolean;
          src: string;
          parentNode: { removeChild: jest.Mock } | null;
          addEventListener: jest.Mock;
        } = {
          hidden: false,
          src: '',
          parentNode: null,
          addEventListener: jest.fn(),
        };
        jest
          .spyOn(document, 'createElement')
          .mockReturnValue(iframe as unknown as HTMLElement);
        jest.spyOn(document.body, 'appendChild').mockImplementation(((
          node: unknown
        ) => {
          iframe.parentNode = { removeChild };
          return node;
        }) as typeof document.body.appendChild);
        // Model real DOM detachment: removeChild clears parentNode, so the
        // second cleanup sees null and the guard short-circuits.
        removeChild.mockImplementation(() => {
          iframe.parentNode = null;
        });

        const input = createBaseInput();
        const { result } = zipDownloadHandler(input);
        await jest.advanceTimersByTimeAsync(100);

        const loadCall = iframe.addEventListener.mock.calls.find(
          (call: [string, () => void]) => call[0] === 'load'
        ) as [string, () => void] | undefined;
        expect(loadCall).toBeDefined();

        // load -> 5s cleanup detaches the iframe...
        loadCall![1]();
        await jest.advanceTimersByTimeAsync(5_000);
        expect(removeChild).toHaveBeenCalledTimes(1);

        // ...then the 60s timeout fires on the already-detached iframe. The guard
        // must prevent a second removeChild and must not throw.
        await expect(
          jest.advanceTimersByTimeAsync(60_000)
        ).resolves.not.toThrow();
        expect(removeChild).toHaveBeenCalledTimes(1);

        await result;
      } finally {
        jest.useRealTimers();
      }
    });
  });

  describe('zip entry naming (relativePath)', () => {
    it('uses `relativePath` as the zip entry name when present', async () => {
      const input = createBaseInput();
      input.data.key = 'photos/vacation/beach.jpg';
      input.data.relativePath = 'vacation/beach.jpg';
      input.all = [
        {
          ...input.all[0],
          key: 'photos/vacation/beach.jpg',
          relativePath: 'vacation/beach.jpg',
        },
      ];

      const { result } = zipDownloadHandler(input);
      await result;
      await flushAsync();

      expect(mockAddedFilenames).toContain('vacation/beach.jpg');
    });

    it('falls back to the key basename when `relativePath` is absent', async () => {
      const input = createBaseInput();
      // createBaseInput uses key 'prefix/file-name' with no relativePath
      const { result } = zipDownloadHandler(input);
      await result;
      await flushAsync();

      expect(mockAddedFilenames).toContain('file-name');
    });
  });

  describe('getFolderName logic', () => {
    it('uses parent folder name for nested keys', async () => {
      const input = createBaseInput();
      input.data.key = 'photos/vacation/beach.jpg';
      input.all = [{ ...input.all[0], key: 'photos/vacation/beach.jpg' }];

      const { result } = zipDownloadHandler(input);
      await result;
      await flushAsync();

      expect(mockAnchor.download).toBe('vacation.zip');
    });

    it('uses "archive" for root-level files with no slash', async () => {
      const input = createBaseInput();
      input.data.key = 'file.txt';
      input.all = [{ ...input.all[0], key: 'file.txt' }];

      const { result } = zipDownloadHandler(input);
      await result;
      await flushAsync();

      expect(mockAnchor.download).toBe('archive.zip');
    });

    it('uses first-level folder for single-level paths', async () => {
      const input = createBaseInput();
      input.data.key = 'photos/beach.jpg';
      input.all = [{ ...input.all[0], key: 'photos/beach.jpg' }];

      const { result } = zipDownloadHandler(input);
      await result;
      await flushAsync();

      expect(mockAnchor.download).toBe('photos.zip');
    });

    it('preserves spaces and URL-unsafe characters in the folder name', async () => {
      // Regression guard: folder names with spaces (common in S3 prefixes) must
      // survive into the download name. The SW round-trips the id through
      // encode/decode so the stream lookup still matches (see download-sw.spec).
      const input = createBaseInput();
      input.data.key = 'my photos/vacation 2026/beach.jpg';
      input.all = [
        { ...input.all[0], key: 'my photos/vacation 2026/beach.jpg' },
      ];

      const { result } = zipDownloadHandler(input);
      await result;
      await flushAsync();

      expect(mockAnchor.download).toBe('vacation 2026.zip');
    });
  });

  describe('archiveName (view-computed batch name)', () => {
    it('names the zip from `all[0].archiveName` when present', async () => {
      // The view stamps the common-ancestor name onto every item; the handler
      // must prefer it over the first-key parent-folder heuristic.
      const input = createBaseInput();
      input.data.key = 'public/nested/one/pic.jpg';
      input.all = [
        {
          ...input.all[0],
          key: 'public/nested/one/pic.jpg',
          archiveName: 'public',
        },
      ];

      const { result } = zipDownloadHandler(input);
      await result;
      await flushAsync();

      expect(mockAnchor.download).toBe('public.zip');
    });

    it('falls back to getFolderName when `archiveName` is absent', async () => {
      const input = createBaseInput();
      input.data.key = 'photos/vacation/beach.jpg';
      input.all = [{ ...input.all[0], key: 'photos/vacation/beach.jpg' }];

      const { result } = zipDownloadHandler(input);
      await result;
      await flushAsync();

      expect(mockAnchor.download).toBe('vacation.zip');
    });
  });
});
