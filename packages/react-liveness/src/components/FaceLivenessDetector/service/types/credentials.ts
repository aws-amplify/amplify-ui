import { IdentityProvider } from '@aws-sdk/types';

export interface AwsCredentials {
  readonly accessKeyId: string;
  readonly secretAccessKey: string;
}

export interface AwsTemporaryCredentials extends AwsCredentials {
  readonly sessionToken: string;
  readonly expiration: Date;
}

export type AwsCredentialProvider = IdentityProvider<AwsTemporaryCredentials>;
