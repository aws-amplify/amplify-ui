import {
  createManagedAuthAdapter,
  CreateManagedAuthAdapterInput,
} from '@aws-amplify/ui-react-storage/browser';

type CredentialsProvider = CreateManagedAuthAdapterInput['credentialsProvider'];
type Credentials = Awaited<ReturnType<CredentialsProvider>>;

class Auth {
  #credentials: Credentials | undefined;
  #onAuthStatusChange: () => void | undefined;

  #getCredentials(): Credentials {
    return this.#credentials;
  }

  #setCredentials(credentials: Credentials) {
    this.#credentials = credentials;
  }

  async #fetchCredentials(): Promise<Credentials> {
    const credentials = this.#getCredentials();
    if (credentials) {
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

  registerAuthListener = (onAuthStatusChange: () => void) => {
    this.#onAuthStatusChange = onAuthStatusChange;
  };

  async signIn(input?: {
    onSignIn?: () => void;
    onError?: (e: Error) => void;
  }): Promise<void> {
    const { onError, onSignIn } = input ?? {};
    try {
      await this.#fetchCredentials();
      onSignIn?.();
    } catch (e) {
      onError?.(e);
    }
  }

  signOut(input?: { onSignOut?: () => void }) {
    this.#credentials = undefined;
    this.#onAuthStatusChange?.();
    input?.onSignOut();
  }
}

export const auth = new Auth();

export const managedAuthAdapter = createManagedAuthAdapter({
  credentialsProvider: auth.credentialsProvider,
  region: process.env.NEXT_PUBLIC_MANAGED_AUTH_REGION,
  accountId: process.env.NEXT_PUBLIC_MANAGED_AUTH_ACCOUNT_ID,
  registerAuthListener: auth.registerAuthListener,
});
