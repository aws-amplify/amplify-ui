import { createStorageBrowser } from '@aws-amplify/ui-react-storage';
import { IconSearch as _IconSearch } from '@aws-amplify/ui-react/internal';
import '@aws-amplify/ui-react/styles.css';
import React from 'react';

const { StorageBrowser } = createStorageBrowser();

export default function Example() {
  return <StorageBrowser.LocationDetailView />;
}
