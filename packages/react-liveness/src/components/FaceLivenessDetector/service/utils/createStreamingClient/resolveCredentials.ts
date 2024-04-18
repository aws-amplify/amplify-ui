import { fetchAuthSession } from 'aws-amplify/auth';
import { AwsCredentialProvider, AwsCredentials } from '../../types';

const isCredentialsProvider = (
  credentialsProvider?: AwsCredentialProvider
): credentialsProvider is AwsCredentialProvider =>
  typeof credentialsProvider === 'function';

// the return interface of `fetchAuthSession` includes `credentials` as
// optional, but `credentials` is always returned. If `fetchAuthSession`
// is called for an unauthenticated end user, values of `accessKeyId`
// and `secretAccessKey` are `undefined`
const isCredentials = (
  credentials?: AwsCredentials | Record<keyof AwsCredentials, undefined>
): credentials is AwsCredentials =>
  !!(credentials?.accessKeyId && credentials?.secretAccessKey);

/**
 * Resolves the `credentials` param to be passed to `RekognitionStreamingClient` which accepts either:
 * - a `credentials` object
 * - a `credentialsProvider` callback
 *
 * @param credentialsProvider optional `credentialsProvider` callback
 * @returns {Promise<AwsCredentials | AwsCredentialProvider>} `credentials` object or valid `credentialsProvider` callback
 */
export async function resolveCredentials(
  credentialsProvider?: AwsCredentialProvider
): Promise<AwsCredentials | AwsCredentialProvider> {
  const hasCredentialsProvider = isCredentialsProvider(credentialsProvider);

  if (hasCredentialsProvider) {
    return credentialsProvider;
  }

  if (credentialsProvider && !hasCredentialsProvider) {
    throw new Error('Invalid credentialsProvider');
  }

  try {
    const result = (await fetchAuthSession()).credentials;
    if (isCredentials(result)) {
      return result;
    }

    throw new Error('Missing credentials');
  } catch (e) {
    const { message } = e as Error;
    throw new Error(`Invalid credentials: ${message}`);
  }
}
