import { getUrl, GetUrlInput } from '../../../storage-internal';

import { zipDownloadHandler } from '../zipdownload';
import type { DownloadHandlerInput } from '../download';

jest.mock('../../../storage-internal');
jest.mock(
  'jszip',
  () =>
    class JSZipMock {
      #file: string | null = null;
      file(name: string, _file: Blob) {
        this.#file = name;
      }
      async generateAsync(
        opts: any,
        onProgress: (o: { percent: number; currentFile: string | null }) => void
      ) {
        onProgress?.({ percent: 0, currentFile: this.#file });
        onProgress?.({ percent: 50, currentFile: this.#file });
        onProgress?.({ percent: 100, currentFile: this.#file });
        onProgress?.({ percent: 100, currentFile: null });
        return Promise.resolve(new Blob());
      }
    }
);

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
  globalThis.fetch = jest.fn(() => {
    return Promise.resolve({
      headers: {
        get: (header: string) => {
          if (header === 'content-length') {
            return 100;
          }
        },
      },
      body: {
        getReader: () => ({
          read: jest
            .fn()
            .mockResolvedValueOnce({
              value: { length: 50 },
              done: false,
            })
            .mockResolvedValue({
              value: { length: 50 },
              done: true,
            }),
        }),
      },
    }) as unknown as Promise<Response>;
  });

  beforeEach(() => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1);
    mockGetUrl.mockResolvedValue({ expiresAt, url });
  });

  afterEach(() => {
    mockGetUrl.mockReset();
  });

  it('calls `getUrl` with the expected values', () => {
    zipDownloadHandler(baseInput);
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
    expect(await result).toEqual({ status: 'LOADED' });
  });

  it('calls the progress with statuses', async () => {
    const onProgress = jest.fn();
    const { result } = zipDownloadHandler({
      ...baseInput,
      options: {
        onProgress,
      },
    });
    await result;
    expect(onProgress).toHaveBeenCalledWith(baseInput.data, 0.5, 'PENDING');
    expect(onProgress).toHaveBeenCalledWith(baseInput.data, 0.5, 'FINISHING');
    expect(onProgress).toHaveBeenCalledWith(baseInput.data, 1, 'COMPLETE');
  });

  it('returns failed status', async () => {
    const error = new Error('No download');
    mockGetUrl.mockRejectedValue(error);
    const { result } = zipDownloadHandler(baseInput);
    expect(await result).toEqual({
      error,
      message: error.message,
      status: 'FAILED',
    });
  });
});
