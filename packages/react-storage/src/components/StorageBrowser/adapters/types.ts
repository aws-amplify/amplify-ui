import { AuthConfigAdapter } from '@aws-amplify/storage/storage-browser';

import { RegisterAuthListener } from '../context/useGetCredentialsProvider';

export interface StorageBrowserAuthAdapter extends AuthConfigAdapter {
  registerAuthListener: RegisterAuthListener;
}
