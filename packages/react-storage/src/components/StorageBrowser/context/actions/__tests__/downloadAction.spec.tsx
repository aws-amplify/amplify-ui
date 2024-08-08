import * as StorageModule from 'aws-amplify/storage';
import { downloadAction } from '../downloadAction';

const getUrlSpy = jest.spyOn(StorageModule, 'getUrl');
const config = {
  bucket: 'bucket',
  credentialsProvider: jest.fn(),
  region: 'region',
};
const initialValue = { signedUrl: '' };

describe('downloadAction', () => {
  beforeEach(() => {
    getUrlSpy.mockClear();
  });

  it('returns the expected output in the happy path', async () => {
    getUrlSpy.mockResolvedValueOnce({
      url: new URL('https://docs.amplify.aws/'),
      expiresAt: new Date(),
    });

    const { signedUrl } = await downloadAction(initialValue, {
      config,
      key: 'a_prefix',
    });

    expect(signedUrl).toEqual('https://docs.amplify.aws/');
  });
});
