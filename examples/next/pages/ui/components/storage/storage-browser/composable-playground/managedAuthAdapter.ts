import { createManagedAuthConfigAdapter } from '@aws-amplify/storage/storage-browser';

type CredentialsProvider = Parameters<
  typeof createManagedAuthConfigAdapter
>[0]['credentialsProvider'];
type Credentials = Awaited<ReturnType<CredentialsProvider>>;

class Auth {
  #credentials: Credentials | undefined;

  #getCredentials(): Credentials {
    return this.#credentials;
  }

  #setCredentials(credentials: Credentials) {
    this.#credentials = credentials;
  }

  async #fetchCredentials(): ReturnType<CredentialsProvider> {
    const credentials = this.#getCredentials();
    if (credentials) {
      // eslint-disable-next-line no-console
      console.log('cache');
      return credentials;
    }

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_MANAGED_AUTH_ENDPOINT
      );

      const data = await response.json();

      const {
        Credentials: {
          AccessKeyId: accessKeyId,
          SecretAccessKey: secretAccessKey,
          SessionToken: sessionToken,
          Expiration: expiration,
        },
      } = await JSON.parse(data.body);

      this.#setCredentials({
        credentials: { accessKeyId, secretAccessKey, sessionToken, expiration },
      });

      return this.#getCredentials();
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  }

  get credentialsProvider(): CredentialsProvider {
    return async () => await this.#fetchCredentials();
  }
}

export const auth = new Auth();

export const managedAuthAdapter = createManagedAuthConfigAdapter({
  credentialsProvider: auth.credentialsProvider,
  region: process.env.NEXT_PUBLIC_MANAGED_AUTH_REGION,
  accountId: process.env.NEXT_PUBLIC_MANAGED_AUTH_ACCOUNT_ID,
});
