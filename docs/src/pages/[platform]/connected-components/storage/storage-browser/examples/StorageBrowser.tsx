import { createStorageBrowser } from '@aws-amplify/ui-react-storage/browser';
import { mockConfig } from './mockConfig';
import { defaultActions } from './defaultActions';

export const { StorageBrowser, useAction, useView } = createStorageBrowser({
  config: mockConfig,
  actions: {
    default: defaultActions,
  },
});
