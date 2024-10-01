import { createManagedAuthConfigAdapter } from '@aws-amplify/storage/internals';
import {
  CreateManagedAuthAdapterInput,
  StorageBrowserAuthAdapter,
} from './types';

export const createManagedAuthAdapter = ({
  registerAuthListener,
  ...input
}: CreateManagedAuthAdapterInput): StorageBrowserAuthAdapter => ({
  ...createManagedAuthConfigAdapter(input),
  registerAuthListener,
});
