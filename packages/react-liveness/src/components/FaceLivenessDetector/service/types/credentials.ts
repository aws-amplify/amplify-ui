export interface AwsCredentials {
  readonly accessKeyId: string;
  readonly secretAccessKey: string;
}

export interface AwsTemporaryCredentials extends AwsCredentials {
  readonly sessionToken: string;
  readonly expiration: Date;
}

export interface IdentityProvider<IdentityT extends AwsTemporaryCredentials> {
  (identityProperties?: Record<string, any>): Promise<IdentityT>;
}

export type AwsCredentialProvider = IdentityProvider<AwsTemporaryCredentials>;
