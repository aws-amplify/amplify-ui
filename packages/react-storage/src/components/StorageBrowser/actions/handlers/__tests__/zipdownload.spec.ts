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
import { zipDownloadHandler } from '../zipdownload';
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
        getRegistration: jest.fn().mockResolvedValue({
          active: { postMessage: mockPostMessage },
        }),
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
        getRegistration: jest.fn().mockResolvedValue({ active: null }),
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
    Object.defineProperty(navigator, 'serviceWorker', {
      value: {
        controller: null,
        getRegistration: jest.fn().mockResolvedValue({ active: null }),
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
