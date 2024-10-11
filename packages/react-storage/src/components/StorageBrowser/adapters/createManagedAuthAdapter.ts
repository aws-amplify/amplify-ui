import { createManagedAuthConfigAdapter } from '../storage-internal';
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
