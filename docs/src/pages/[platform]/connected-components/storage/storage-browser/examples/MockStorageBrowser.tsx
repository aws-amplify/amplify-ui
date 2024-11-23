import { createStorageBrowser } from '@aws-amplify/ui-react-storage/browser';
import { mockConfig } from './mockConfig';

export const { StorageBrowser } = createStorageBrowser({
  config: mockConfig,
});
