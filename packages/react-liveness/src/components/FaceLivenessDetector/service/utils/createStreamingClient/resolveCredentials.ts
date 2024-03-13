import { fetchAuthSession } from 'aws-amplify/auth';
import { AwsCredentialProvider, AwsCredentials } from '../../types';

const isValidCredentialsProvider = (
  credentialsProvider?: AwsCredentialProvider
): credentialsProvider is AwsCredentialProvider =>
  typeof credentialsProvider === 'function';

/**
 * Resolves `credentials` to be passed to both the `RekognitionStreamingClient` and `Signer`
 *
 * @param credentialsProvider optional async `credentials` provider
 * @returns {Promise<AwsCredentials>} `credentials` object
 */
export async function resolveCredentials(
  credentialsProvider?: AwsCredentialProvider
): Promise<AwsCredentials> {
  const hasValidCredentialsProvider =
    isValidCredentialsProvider(credentialsProvider);

  if (credentialsProvider && !hasValidCredentialsProvider) {
    throw new Error('Invalid credentialsProvider');
  }

  try {
    let result: AwsCredentials;

    if (hasValidCredentialsProvider) {
      result = await credentialsProvider();
    } else {
      // @ts-expect-error
      // the return interface of `fetchAuthSession` includes `credentials` as
      // optional, but `credentials` is always returned. If `fetchAuthSession`
      // is called for an unauthenticated end user, values of `accessKeyId`
      // and `secretAccessKey` are `undefined`
      result = (await fetchAuthSession()).credentials;
    }

    if (!result.accessKeyId || !result.secretAccessKey) {
      throw new Error('Missing credentials');
    }

    return result;
  } catch (e) {
    const { message } = e as Error;
    throw new Error(`Invalid credentials: ${message}`);
  }
}
