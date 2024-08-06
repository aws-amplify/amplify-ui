import * as StorageModule from 'aws-amplify/storage';
import { downloadAction } from '../downloadAction';

const downloadSpy = jest.spyOn(StorageModule, 'downloadData');
const config = {
  bucket: 'bucket',
  credentialsProvider: jest.fn(),
  region: 'region',
};
const initialValue = { key: '' };

describe('downloadAction', () => {
  beforeEach(() => {
    downloadSpy.mockClear();
  });

  it('returns the expected output in the happy path', async () => {
    // @ts-expect-error
    downloadSpy.mockResolvedValueOnce({ key: 'a_key' });

    const { key } = await downloadAction(initialValue, {
      config,
      key: 'a_prefix',
    });

    expect(key).toEqual('a_prefix');
  });
});
