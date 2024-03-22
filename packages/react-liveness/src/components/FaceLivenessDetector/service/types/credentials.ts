import { CredentialsAndIdentityId } from 'aws-amplify/auth';

export type AwsCredentials = CredentialsAndIdentityId['credentials'];

export interface IdentityProvider<IdentityT extends AwsCredentials> {
  (identityProperties?: Record<string, any>): Promise<IdentityT>;
}

/**
 * @deprecated `AwsTemporaryCredentials` has been replaced with `AwsCredentials`.
 *
 * The `AwsTemporaryCredentials` type may be removed in a future major version of _@aws-amplify/ui-react-liveness_.
 */
export interface AwsTemporaryCredentials extends AwsCredentials {
  readonly sessionToken?: string;
  readonly expiration?: Date;
}

export type AwsCredentialProvider = IdentityProvider<AwsCredentials>;
