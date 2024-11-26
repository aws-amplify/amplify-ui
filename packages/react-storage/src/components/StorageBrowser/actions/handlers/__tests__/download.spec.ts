/* eslint-disable @typescript-eslint/no-unsafe-argument */
import * as StorageModule from '../../../storage-internal';

import { downloadHandler, DownloadHandlerInput } from '../download';

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
    lastModified: new Date(),
    size: 1000022,
    type: 'FILE',
  },
};

describe('downloadHandler', () => {
  const mockElement: HTMLAnchorElement = {
    click: jest.fn(),
  } as unknown as HTMLAnchorElement;

  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(StorageModule, 'getUrl')
      .mockResolvedValue({ url: new URL('https://mock-url/') } as any);
    jest.spyOn(document, 'createElement').mockReturnValue(mockElement);
    jest
      .spyOn(document.body, 'appendChild')
      .mockImplementation((element) => element);
    jest
      .spyOn(document.body, 'removeChild')
      .mockImplementation((element) => element);
  });

  it('calls `getUrl` with the expected values', () => {
    downloadHandler(baseInput);

    const expected: StorageModule.GetUrlInput = {
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

    expect(StorageModule.getUrl).toHaveBeenCalledWith(expected);
  });

  it('should download if getUrl provides a url', async () => {
    const result = await downloadHandler(baseInput).result;

    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(mockElement.href).toBe('https://mock-url/');
    expect(mockElement.download).toBe('prefix/file-name');
    expect(mockElement.target).toBe('_blank');
    expect(document.body.appendChild).toHaveBeenCalledWith(mockElement);
    expect(mockElement.click).toHaveBeenCalled();
    expect(document.body.removeChild).toHaveBeenCalledWith(mockElement);

    expect(result).toEqual({ status: 'COMPLETE' });
  });

  it('should fail if getUrl does not return a url', async () => {
    jest.spyOn(StorageModule, 'getUrl').mockResolvedValue({} as any);

    const result = await downloadHandler(baseInput).result;
    expect(result).toEqual({
      message:
        'Required keys missing for StorageGetUrlOutput: url.\nObject: {}',
      status: 'FAILED',
    });
  });
});
