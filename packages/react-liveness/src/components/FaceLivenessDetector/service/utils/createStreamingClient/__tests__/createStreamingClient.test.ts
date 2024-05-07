import {
  RekognitionStreamingClient,
  StartFaceLivenessSessionCommand,
} from '@aws-sdk/client-rekognitionstreaming';

import { AwsCredentials } from '../../../types';

import { FACE_MOVEMENT_CHALLENGE_NAME } from '../../constants';
import { CustomWebSocketFetchHandler } from '../CustomWebSocketFetchHandler';
import { resolveCredentials } from '../resolveCredentials';
import { Signer } from '../Signer';

import {
  createStreamingClient,
  RequestStream,
  ResponseStream,
} from '../createStreamingClient';

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
const sessionId = 'sessionId';
const requestStream = jest.fn() as unknown as RequestStream;
const reponseStream = jest.fn() as unknown as ResponseStream;
const videoHeight = '1000';
const videoWidth = '1000';

const mockResolveCredentials = (
  resolveCredentials as jest.Mock
).mockResolvedValue(credentials);

const mockSend = jest
  .fn()
  .mockResolvedValue({ LivenessResponseStream: reponseStream });
const mockRekognitionStreamingClient = (
  RekognitionStreamingClient as jest.Mock
).mockReturnValue({ send: mockSend });

const mockStartFaceLivenessSessionCommand =
  StartFaceLivenessSessionCommand as unknown as jest.Mock;

describe('createStreamingClient', () => {
  beforeEach(() => {
    mockRekognitionStreamingClient.mockClear();
    mockResolveCredentials.mockClear();
  });

  it('calls `RekognitionStreamingClient` with the expected values in the happy path', async () => {
    await createStreamingClient({
      credentialsProvider: undefined,
      endpointOverride: undefined,
      region,
    });

    expect(mockResolveCredentials).toHaveBeenCalledTimes(1);
    expect(mockResolveCredentials).toHaveBeenCalledWith(undefined);

    expect(mockRekognitionStreamingClient).toHaveBeenCalledTimes(1);
    expect(mockRekognitionStreamingClient.mock.calls[0][0]).toMatchObject({
      credentials,
      customUserAgent: expect.any(String),
      region,
      requestHandler: expect.any(CustomWebSocketFetchHandler),
      signerConstructor: Signer,
    });
  });

  it('handles a `credentialsProvider` param as expected', async () => {
    const credentialsProvider = async () => Promise.resolve(credentials);
    await createStreamingClient({
      credentialsProvider,
      endpointOverride: undefined,
      region,
    });

    expect(mockResolveCredentials).toHaveBeenCalledTimes(1);
    expect(mockResolveCredentials).toHaveBeenCalledWith(credentialsProvider);

    expect(mockRekognitionStreamingClient).toHaveBeenCalledTimes(1);
    expect(mockRekognitionStreamingClient.mock.calls[0][0]).toMatchObject({
      credentials,
      customUserAgent: expect.any(String),
      region,
      requestHandler: expect.any(CustomWebSocketFetchHandler),
      signerConstructor: Signer,
    });
  });

  it('handles an `endpointOverride` param as expected', async () => {
    await createStreamingClient({
      credentialsProvider: undefined,
      endpointOverride,
      region,
    });

    expect(mockResolveCredentials).toHaveBeenCalledTimes(1);
    expect(mockResolveCredentials).toHaveBeenCalledWith(undefined);

    const contructorParams = mockRekognitionStreamingClient.mock.calls[0][0];

    expect(mockRekognitionStreamingClient).toHaveBeenCalledTimes(1);
    expect(contructorParams).toMatchObject({
      credentials,
      customUserAgent: expect.any(String),
      endpointProvider: expect.any(Function),
      region,
      requestHandler: expect.any(CustomWebSocketFetchHandler),
      signerConstructor: Signer,
    });
  });

  it('constructs an `endpointProvider` callback as expected', async () => {
    await createStreamingClient({
      credentialsProvider: undefined,
      endpointOverride,
      region,
    });

    expect(mockResolveCredentials).toHaveBeenCalledTimes(1);
    expect(mockResolveCredentials).toHaveBeenCalledWith(undefined);

    expect(mockRekognitionStreamingClient).toHaveBeenCalledTimes(1);
    const contructorParams = mockRekognitionStreamingClient.mock.calls[0][0];

    const endpoint = contructorParams.endpointProvider();
    expect(endpoint).toStrictEqual({ url: new URL(endpointOverride) });
  });

  describe('getResponseStream', () => {
    beforeEach(() => {
      mockSend.mockClear();
      mockStartFaceLivenessSessionCommand.mockClear();
    });

    it('calls `StartFaceLivenessSessionCommand` with the expected input', async () => {
      const { getResponseStream } = await createStreamingClient({
        credentialsProvider: undefined,
        endpointOverride,
        region,
      });

      await getResponseStream({
        requestStream,
        sessionId,
        videoHeight,
        videoWidth,
      });

      expect(mockStartFaceLivenessSessionCommand).toBeCalledTimes(1);
      expect(mockStartFaceLivenessSessionCommand).toHaveBeenCalledWith({
        ChallengeVersions: FACE_MOVEMENT_CHALLENGE_NAME,
        SessionId: sessionId,
        LivenessRequestStream: requestStream,
        VideoWidth: videoWidth,
        VideoHeight: videoHeight,
      });
    });

    it('returns a `responseStream`', async () => {
      const { getResponseStream } = await createStreamingClient({
        credentialsProvider: undefined,
        endpointOverride,
        region,
      });

      const output = await getResponseStream({
        requestStream,
        sessionId,
        videoHeight,
        videoWidth,
      });

      expect(output).toBe(reponseStream);
    });
  });
});
