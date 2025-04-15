import { StorageBrowser } from '../storage-browser';
import React from 'react';
import { useSearchParams } from 'next/navigation';

import { StorageBrowserValue } from '@aws-amplify/ui-react-storage/browser';

export default function Page() {
  const params = useSearchParams();

  const value = params.get('value');
  const defaultValue: StorageBrowserValue | null = value
    ? JSON.parse(value)
    : null;

  if (defaultValue === null) return null;

  return <StorageBrowser defaultValue={defaultValue} />;
}
