import * as React from 'react';
import { createStorageBrowser } from '@aws-amplify/ui-react-storage/browser';
import { mockConfig } from './mockConfig'; // IGNORE

const { StorageBrowser } = createStorageBrowser({
  config: mockConfig,
});

export default function Example() {
  return <StorageBrowser />;
}
