/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { getUrl, GetUrlInput } from '../../../storage-internal';

import { downloadHandler, DownloadHandlerInput } from '../download';

jest.mock('../../../storage-internal');

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
};

describe('downloadHandler', () => {
  const url = new URL('mock://fake.url');
  const mockGetUrl = jest.mocked(getUrl);

  beforeEach(() => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1);
    mockGetUrl.mockResolvedValue({ expiresAt, url });
  });

  afterEach(() => {
    mockGetUrl.mockReset();
  });

  it('calls `getUrl` with the expected values', () => {
    downloadHandler(baseInput);

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
    const { result } = downloadHandler(baseInput);

    expect(await result).toEqual({ status: 'COMPLETE', value: { url } });
  });

  it('returns failed status', async () => {
    const errorMessage = 'error-message';
    mockGetUrl.mockRejectedValue(new Error(errorMessage));
    const { result } = downloadHandler(baseInput);

    expect(await result).toEqual({
      status: 'FAILED',
      message: errorMessage,
    });
  });

  it('should fail if getUrl does not return a url', async () => {
    mockGetUrl.mockResolvedValue({} as any);

    const result = await downloadHandler(baseInput).result;
    expect(result).toEqual({
      message:
        'Required keys missing for StorageGetUrlOutput: url.\nObject: {}',
      status: 'FAILED',
    });
  });
});
