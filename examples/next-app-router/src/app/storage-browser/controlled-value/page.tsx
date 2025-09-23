'use client';
import { StorageBrowser } from '../storage-browser'; // IGNORE

import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { StorageBrowserEventValue } from '@aws-amplify/ui-react-storage/browser';

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const value = params.get('value');

  const handleValueChange = React.useCallback(
    (nextValue: StorageBrowserEventValue) => {
      const nextParams = new URLSearchParams();
      nextParams.set('value', JSON.stringify(nextValue));

      router.push(`${pathname}?${nextParams.toString()}`);
    },
    [pathname, router]
  );

  return (
    <StorageBrowser
      onValueChange={handleValueChange}
      value={value ? JSON.parse(value) : null}
    />
  );
}
