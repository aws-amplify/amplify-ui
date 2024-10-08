import { RegisterAuthListener } from '../context/useGetCredentialsProvider';
import {
  AuthConfigAdapter,
  CreateManagedAuthConfigAdapterInput,
} from '../storage-internal';

export interface StorageBrowserAuthAdapter extends AuthConfigAdapter {
  registerAuthListener: RegisterAuthListener;
}

export interface CreateManagedAuthAdapterInput
  extends CreateManagedAuthConfigAdapterInput {
  registerAuthListener: RegisterAuthListener;
}
