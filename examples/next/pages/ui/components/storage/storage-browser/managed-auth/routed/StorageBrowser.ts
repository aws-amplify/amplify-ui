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

export const { StorageBrowser, useView } = createStorageBrowser({
  actions: {
    default: {
      ...defaultActionConfigs,
      upload: {
        ...defaultActionConfigs.upload,
        handler: (input) => {
          return defaultActionConfigs.upload.handler({
            ...input,
            options: {
              onError: ({ key, id }, message, error) => {
                console.log('key', key);
                console.log('id', id);
                console.log('message', message);
                console.log('error', error);
              },
            },
          });
        },
      },
    },
  },
  config,
});
