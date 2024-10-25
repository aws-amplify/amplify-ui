import {
  createManagedAuthAdapter,
  CreateManagedAuthAdapterInput,
} from '@aws-amplify/ui-react-storage/browser';

type CredentialsProvider = CreateManagedAuthAdapterInput['credentialsProvider'];
type Credentials = Awaited<ReturnType<CredentialsProvider>>;

export class Auth {
  #persistCredentials: boolean;
  #credentials: Credentials | undefined;
  #onAuthStatusChange: () => void | undefined;

  constructor(options?: { persistCredentials?: boolean }) {
    const { persistCredentials = false } = options ?? {};
    this.#persistCredentials = persistCredentials;
  }

  #clearCredentials() {
    this.#onAuthStatusChange?.();
    this.#onAuthStatusChange = undefined;
    localStorage.removeItem('creds');
    this.#credentials = undefined;
  }

  #getCredentials(): Credentials {
    if (this.#persistCredentials) {
      return JSON.parse(localStorage.getItem('creds'));
    }

    return this.#credentials;
  }

  #setCredentials(credentials: Credentials) {
    if (this.#persistCredentials) {
      localStorage.setItem('creds', JSON.stringify(credentials));
    }
    this.#credentials = credentials;
  }

  async #fetchCredentials(options?: {
    forceRefresh?: boolean;
  }): Promise<Credentials> {
    const { forceRefresh = false } = options ?? {};

    if (forceRefresh) {
      this.#clearCredentials();
    }
    const credentials = this.#getCredentials();
    if (!forceRefresh && credentials) {
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
    return (options) => this.#fetchCredentials(options);
  }

  registerAuthListener = (onAuthStatusChange: () => void) => {
    this.#onAuthStatusChange = onAuthStatusChange;
  };

  async signIn(input?: {
    forceRefresh?: boolean;
    onSignIn?: () => void;
    onError?: (e: Error) => void;
  }): Promise<void> {
    const { forceRefresh, onError, onSignIn } = input ?? {};
    try {
      await this.#fetchCredentials({ forceRefresh });
      onSignIn?.();
    } catch (e) {
      onError?.(e);
    }
  }

  signOut(input?: { onSignOut?: () => void }) {
    this.#clearCredentials();
    input?.onSignOut?.();
  }
}

export const auth = new Auth();

export const managedAuthAdapter = createManagedAuthAdapter({
  credentialsProvider: auth.credentialsProvider,
  region: process.env.NEXT_PUBLIC_MANAGED_AUTH_REGION,
  accountId: process.env.NEXT_PUBLIC_MANAGED_AUTH_ACCOUNT_ID,
  registerAuthListener: auth.registerAuthListener,
});
