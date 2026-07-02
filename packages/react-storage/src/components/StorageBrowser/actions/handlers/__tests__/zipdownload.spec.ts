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

let mockZipWritable: WritableStream | null = null;

jest.mock('@zip.js/zip.js', () => ({
  ZipWriter: jest.fn().mockImplementation((writable: WritableStream) => {
    mockZipWritable = writable;
    return {
      add: jest
        .fn()
        .mockImplementation((_filename: string, readable: ReadableStream) => {
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
        // Write some data then close the writable so collectBlob finishes
        const writer = mockZipWritable!.getWriter();
        await writer.write(new Uint8Array([0x50, 0x4b]));
        await writer.close();
      }),
    };
  }),
}));

const baseInput: DownloadHandlerInput = {
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
};

describe('zipDownloadHandler', () => {
  const url = new URL('mock://fake.url');
  const mockGetUrl = jest.mocked(getUrl);
  let mockAnchor: { href: string; download: string; click: jest.Mock };

  beforeEach(() => {
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
    // Flush fire-and-forget async cleanup (zipWriter.close() writes to writable)
    // Need multiple ticks because cleanup has: await zipWriter.close() → mock writes + closes
    for (let i = 0; i < 10; i++) {
      await new Promise((r) => setTimeout(r, 0));
    }
    jest.restoreAllMocks();
    mockPostMessage.mockReset();
  });

  it('calls `getUrl` with the expected values', async () => {
    const { result } = zipDownloadHandler(baseInput);
    await result;
    const expected: GetUrlInput = {
      path: baseInput.data.key,
      options: {
        bucket: {
          bucketName: baseInput.config.bucket,
          region: baseInput.config.region,
        },
        customEndpoint: baseInput.config.customEndpoint,
        locationCredentialsProvider: baseInput.config.credentials,
        validateObjectExistence: true,
        contentDisposition: 'attachment',
        expectedBucketOwner: baseInput.config.accountId,
      },
    };
    expect(mockGetUrl).toHaveBeenCalledWith(expected);
  });

  it('returns a complete status', async () => {
    const { result } = zipDownloadHandler(baseInput);
    expect(await result).toEqual({ status: 'COMPLETE' });
  });

  it('calls progress callbacks correctly', async () => {
    const onProgress = jest.fn();
    const { result } = zipDownloadHandler({
      ...baseInput,
      options: { onProgress },
    });
    await result;
    expect(onProgress).toHaveBeenCalledWith(baseInput.data, 0.5, 'PENDING');
    expect(onProgress).toHaveBeenCalledWith(baseInput.data, 1, 'COMPLETE');
  });

  it('returns failed status on error', async () => {
    const error = new Error('No download');
    mockGetUrl.mockRejectedValue(error);
    const { result } = zipDownloadHandler(baseInput);
    expect(await result).toEqual({
      error,
      message: error.message,
      status: 'FAILED',
    });
  });

  it('posts stream to service worker and triggers download', async () => {
    const { result } = zipDownloadHandler(baseInput);
    await result;
    await new Promise((r) => setTimeout(r, 0));
    await new Promise((r) => setTimeout(r, 0));
    await new Promise((r) => setTimeout(r, 0));
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
      },
      writable: true,
      configurable: true,
    });

    const mockCreateObjectURL = jest.fn(() => 'blob:mock-url');
    const mockRevokeObjectURL = jest.fn();
    globalThis.URL.createObjectURL = mockCreateObjectURL;
    globalThis.URL.revokeObjectURL = mockRevokeObjectURL;

    const { result } = zipDownloadHandler(baseInput);
    await result;
    // Flush async cleanup
    await new Promise((r) => setTimeout(r, 0));

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
      },
      writable: true,
      configurable: true,
    });

    const mockRevokeObjectURL = jest.fn();
    globalThis.URL.createObjectURL = jest.fn(() => 'blob:revoke-test');
    globalThis.URL.revokeObjectURL = mockRevokeObjectURL;

    const { result } = zipDownloadHandler(baseInput);
    await result;
    // Flush async cleanup
    await new Promise((r) => setTimeout(r, 0));

    expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:revoke-test');
  });
});
