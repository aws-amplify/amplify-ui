import { RekognitionStreamingClient } from '@aws-sdk/client-rekognitionstreaming';

import { AwsCredentials } from '../../../types';

import { CustomWebSocketFetchHandler } from '../CustomWebSocketFetchHandler';
import { resolveCredentials } from '../resolveCredentials';
import { Signer } from '../Signer';

import { createStreamingClient } from '../createStreamingClient';

jest.mock('@aws-sdk/client-rekognitionstreaming');
jest.mock('../CustomWebSocketFetchHandler');
jest.mock('../resolveCredentials');

const credentials: AwsCredentials = {
  accessKeyId: 'accessKeyId',
  secretAccessKey: 'secretAccessKey',
};
const endpointOverride =
  'https://developer.mozilla.org/en-US/docs/Web/API/URL_API';
const region = 'region';
const systemClockOffset = -3600000;

const mockResolveCredentials = (
  resolveCredentials as jest.Mock
).mockResolvedValue(credentials);

const mockRekognitionStreamingClient = (
  RekognitionStreamingClient as jest.Mock
).mockImplementation();

describe('createStreamingClient', () => {
  beforeEach(() => {
    mockRekognitionStreamingClient.mockClear();
    mockResolveCredentials.mockClear();
  });

  it('calls `RekognitionStreamingClient` with the expected values in the happy path', async () => {
    await createStreamingClient({ region });

    expect(mockResolveCredentials).toHaveBeenCalledTimes(1);
    expect(mockResolveCredentials).toHaveBeenCalledWith(undefined);

    expect(mockRekognitionStreamingClient).toHaveBeenCalledTimes(1);
    expect(mockRekognitionStreamingClient.mock.calls[0][0]).toStrictEqual({
      credentials,
      customUserAgent: expect.any(String),
      region,
      requestHandler: expect.any(CustomWebSocketFetchHandler),
      signerConstructor: Signer,
      systemClockOffset: undefined,
    });
  });

  it('handles a `credentialsProvider` param as expected', async () => {
    const credentialsProvider = async () => Promise.resolve(credentials);
    await createStreamingClient({ credentialsProvider, region });

    expect(mockResolveCredentials).toHaveBeenCalledTimes(1);
    expect(mockResolveCredentials).toHaveBeenCalledWith(credentialsProvider);

    expect(mockRekognitionStreamingClient).toHaveBeenCalledTimes(1);
    expect(mockRekognitionStreamingClient.mock.calls[0][0]).toStrictEqual({
      credentials,
      customUserAgent: expect.any(String),
      region,
      requestHandler: expect.any(CustomWebSocketFetchHandler),
      signerConstructor: Signer,
      systemClockOffset: undefined,
    });
  });

  it('handles an `endpointOverride` param as expected', async () => {
    await createStreamingClient({ endpointOverride, region });

    expect(mockResolveCredentials).toHaveBeenCalledTimes(1);
    expect(mockResolveCredentials).toHaveBeenCalledWith(undefined);

    expect(mockRekognitionStreamingClient).toHaveBeenCalledTimes(1);
    expect(mockRekognitionStreamingClient.mock.calls[0][0]).toStrictEqual({
      credentials,
      customUserAgent: expect.any(String),
      endpointProvider: expect.any(Function),
      region,
      requestHandler: expect.any(CustomWebSocketFetchHandler),
      signerConstructor: Signer,
      systemClockOffset: undefined,
    });
  });

  it('handles a `systemClockOffset` param as expected', async () => {
    await createStreamingClient({ systemClockOffset, region });

    expect(mockResolveCredentials).toHaveBeenCalledTimes(1);
    expect(mockResolveCredentials).toHaveBeenCalledWith(undefined);

    expect(mockRekognitionStreamingClient).toHaveBeenCalledTimes(1);
    expect(mockRekognitionStreamingClient.mock.calls[0][0]).toStrictEqual({
      credentials,
      customUserAgent: expect.any(String),
      region,
      requestHandler: expect.any(CustomWebSocketFetchHandler),
      signerConstructor: Signer,
      systemClockOffset: -3600000,
    });
  });

  it('constructs an `endpointProvider` callback as expected', async () => {
    await createStreamingClient({ endpointOverride, region });

    expect(mockResolveCredentials).toHaveBeenCalledTimes(1);
    expect(mockResolveCredentials).toHaveBeenCalledWith(undefined);

    expect(mockRekognitionStreamingClient).toHaveBeenCalledTimes(1);
    const contructorParams = mockRekognitionStreamingClient.mock.calls[0][0];

    const endpoint = contructorParams.endpointProvider();
    expect(endpoint).toStrictEqual({ url: new URL(endpointOverride) });
  });
});
