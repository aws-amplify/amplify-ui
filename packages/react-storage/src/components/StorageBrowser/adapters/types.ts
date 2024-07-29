import { createManagedAuthConfigAdapter } from '@aws-amplify/storage/storage-browser';

export interface StorageBrowserAuthAdapter
  extends ReturnType<typeof createManagedAuthConfigAdapter> {}
