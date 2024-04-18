import {
  RekognitionStreamingClient,
  RekognitionStreamingClientConfig,
} from '@aws-sdk/client-rekognitionstreaming';

import { getAmplifyUserAgent } from '@aws-amplify/core/internals/utils';

import { getLivenessUserAgent } from '../../../utils/platform';
import { AwsCredentialProvider } from '../../types';
import { CustomWebSocketFetchHandler } from './CustomWebSocketFetchHandler';
import { resolveCredentials } from './resolveCredentials';
import { Signer } from './Signer';

interface CreateClientConfig {
  credentialsProvider?: AwsCredentialProvider;
  endpointOverride?: string;
  region: string;
}

const CONNECTION_TIMEOUT = 10_000;
const CUSTOM_USER_AGENT = `${getAmplifyUserAgent()} ${getLivenessUserAgent()}`;

export async function createStreamingClient({
  credentialsProvider,
  endpointOverride,
  region,
}: CreateClientConfig): Promise<RekognitionStreamingClient> {
  const credentials = await resolveCredentials(credentialsProvider);

  const clientconfig: RekognitionStreamingClientConfig = {
    credentials,
    customUserAgent: CUSTOM_USER_AGENT,
    region,
    requestHandler: new CustomWebSocketFetchHandler({
      connectionTimeout: CONNECTION_TIMEOUT,
    }),
    signerConstructor: Signer,
  };

  if (endpointOverride) {
    clientconfig.endpointProvider = () => ({ url: new URL(endpointOverride) });
  }

  return new RekognitionStreamingClient(clientconfig);
}
