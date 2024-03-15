/**
 * These types are copied over / adapted from the aws-sdk/types package as they do not semantic versioning and we do not want these changing unexpectedly.
 * When Amplify Auth exports these types this file should be removed and the type definitions should come from the Amplify auth package
 */

export interface AwsCredentials {
  readonly accessKeyId: string;
  readonly secretAccessKey: string;
}

export interface AwsTemporaryCredentials extends AwsCredentials {
  readonly sessionToken?: string;
  readonly expiration?: Date;
}

export interface IdentityProvider<IdentityT extends AwsTemporaryCredentials> {
  (identityProperties?: Record<string, any>): Promise<IdentityT>;
}

export type AwsCredentialProvider = IdentityProvider<AwsTemporaryCredentials>;
