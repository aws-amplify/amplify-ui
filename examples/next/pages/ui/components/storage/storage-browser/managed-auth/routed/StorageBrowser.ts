import { Auth } from '../../managedAuthAdapter';
import {
  createManagedAuthAdapter,
  createStorageBrowser,
  defaultActionConfigs,
} from '@aws-amplify/ui-react-storage/browser';

export const routedAuth = new Auth({ persistCredentials: true });

const config = createManagedAuthAdapter({
  credentialsProvider: routedAuth.credentialsProvider,
  region: process.env.NEXT_PUBLIC_MANAGED_AUTH_REGION,
  accountId: process.env.NEXT_PUBLIC_MANAGED_AUTH_ACCOUNT_ID,
  registerAuthListener: routedAuth.registerAuthListener,
});

export const { StorageBrowser, useView } = createStorageBrowser({ config });
