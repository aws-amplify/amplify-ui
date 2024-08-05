import { createManagedAuthConfigAdapter } from '@aws-amplify/storage/storage-browser';
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
