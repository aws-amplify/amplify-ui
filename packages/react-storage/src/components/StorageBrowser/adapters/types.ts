import { RegisterAuthListener } from '../providers';
import {
  AuthConfigAdapter,
  CreateManagedAuthConfigAdapterInput,
} from '../storage-internal';

export interface StorageBrowserAuthAdapter extends AuthConfigAdapter {
  accountId?: string;
  registerAuthListener: RegisterAuthListener;
}

export interface CreateManagedAuthAdapterInput
  extends CreateManagedAuthConfigAdapterInput {
  registerAuthListener: RegisterAuthListener;
}
