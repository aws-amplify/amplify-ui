import { downloadHandler } from '../download';
import { zipDownloadHandler } from '../zipdownload';
import { composedDownloadHandler } from '../composedDownloadHandler';
import type { DownloadHandlerInput } from '../download';

jest.mock('../download', () => ({
  downloadHandler: jest.fn(() => ({ result: Promise.resolve() })),
}));
jest.mock('../zipdownload', () => ({
  zipDownloadHandler: jest.fn(() => ({ result: Promise.resolve() })),
}));

const baseInput: DownloadHandlerInput = {
  config: {
    accountId: 'accountId',
    bucket: 'bucket',
    credentials: jest.fn(),
    customEndpoint: 'mock-endpoint',
    region: 'region',
  },
  data: { id: '1', key: 'key', fileKey: 'file' },
  all: [{ id: '1', key: 'key', fileKey: 'file' }],
};

describe('composedDownloadHandler', () => {
  it('calls downloadHandler for a single file', () => {
    composedDownloadHandler(baseInput);
    expect(downloadHandler).toHaveBeenCalledWith(baseInput);
    expect(zipDownloadHandler).not.toHaveBeenCalled();
  });

  it('calls zipDownloadHandler for multiple files', () => {
    jest.mocked(downloadHandler).mockClear();
    const input = {
      ...baseInput,
      all: [
        { id: '1', key: 'key1', fileKey: 'file1' },
        { id: '2', key: 'key2', fileKey: 'file2' },
      ],
    };
    composedDownloadHandler(input);
    expect(zipDownloadHandler).toHaveBeenCalledWith(input);
    expect(downloadHandler).not.toHaveBeenCalled();
  });
});
