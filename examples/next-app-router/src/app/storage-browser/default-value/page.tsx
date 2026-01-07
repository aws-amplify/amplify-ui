'use client';

import React from 'react'; // IGNORE
import { StorageBrowser } from '../storage-browser'; // IGNORE
import { useSearchParams } from 'next/navigation';

import { StorageBrowserValue } from '@aws-amplify/ui-react-storage/browser';

export default function Page() {
  const params = useSearchParams();

  const value = params.get('value');
  const defaultValue: StorageBrowserValue | null = value
    ? JSON.parse(value)
    : null;

  return <StorageBrowser defaultValue={defaultValue} />;
}
