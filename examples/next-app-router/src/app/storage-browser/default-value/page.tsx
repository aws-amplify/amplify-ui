'use client';

import React from 'react'; // IGNORE
import { StorageBrowser } from '../storage-browser'; // IGNORE
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const params = useSearchParams();

  const value = params.get('value');

  return <StorageBrowser defaultValue={value ? JSON.parse(value) : null} />;
}
