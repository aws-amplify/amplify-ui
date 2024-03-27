import {
  LivenessRequestStream,
  LivenessResponseStream,
  RekognitionStreamingClient,
  RekognitionStreamingClientConfig,
  StartFaceLivenessSessionCommand,
  StartFaceLivenessSessionCommandInput,
} from '@aws-sdk/client-rekognitionstreaming';

import { getAmplifyUserAgent } from '@aws-amplify/core/internals/utils';
import { isString } from '@aws-amplify/ui';

import { getLivenessUserAgent } from '../../../utils/platform';
import { AwsCredentialProvider } from '../../types';

import { CONNECTION_TIMEOUT, FACE_MOVEMENT_CHALLENGE_NAME } from '../constants';
import { CustomWebSocketFetchHandler } from './CustomWebSocketFetchHandler';
import { resolveCredentials } from './resolveCredentials';
import { Signer } from './Signer';

export interface RequestStream extends AsyncGenerator<LivenessRequestStream> {}
export interface ResponseStream extends AsyncIterable<LivenessResponseStream> {}

interface CreateClientConfig {
  credentialsProvider: AwsCredentialProvider | undefined;
  endpointOverride: string | undefined;
  region: string;
}

interface GetResponseStreamInput {
  requestStream: RequestStream;
  sessionId: StartFaceLivenessSessionCommandInput['SessionId'];
  videoHeight: StartFaceLivenessSessionCommandInput['VideoHeight'];
  videoWidth: StartFaceLivenessSessionCommandInput['VideoWidth'];
}

type GetReponseStream = (
  input: GetResponseStreamInput
) => Promise<ResponseStream>;

const CUSTOM_USER_AGENT = `${getAmplifyUserAgent()} ${getLivenessUserAgent()}`;

async function getStreamingClient({
  credentialsProvider,
  endpointOverride,
  region,
}: CreateClientConfig): Promise<RekognitionStreamingClient> {
  const clientconfig: RekognitionStreamingClientConfig = {
    credentials: await resolveCredentials(credentialsProvider),
    customUserAgent: CUSTOM_USER_AGENT,
    region,
    requestHandler: new CustomWebSocketFetchHandler({
      connectionTimeout: CONNECTION_TIMEOUT,
    }),
    signerConstructor: Signer,
  };

  if (isString(endpointOverride)) {
    clientconfig.endpointProvider = () => ({ url: new URL(endpointOverride) });
  }

  return new RekognitionStreamingClient(clientconfig);
}

const createCommandInput = ({
  requestStream,
  sessionId,
  videoWidth,
  videoHeight,
}: GetResponseStreamInput): StartFaceLivenessSessionCommandInput => ({
  ChallengeVersions: FACE_MOVEMENT_CHALLENGE_NAME,
  SessionId: sessionId,
  LivenessRequestStream: requestStream,
  VideoWidth: videoWidth,
  VideoHeight: videoHeight,
});

export async function createStreamingClient(
  clientConfig: CreateClientConfig
): Promise<{ getResponseStream: GetReponseStream }> {
  const client = await getStreamingClient(clientConfig);

  return {
    async getResponseStream(input) {
      const command = new StartFaceLivenessSessionCommand(
        createCommandInput(input)
      );

      const { LivenessResponseStream } = await client.send(command);
      return LivenessResponseStream as ResponseStream;
    },
  };
}
