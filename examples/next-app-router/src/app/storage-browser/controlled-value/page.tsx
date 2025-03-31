'use client';

import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { StorageBrowser } from '../storage-browser';

import '@aws-amplify/ui-react-storage/styles.css';

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const value = params.get('value');

  const handleValueChange = React.useCallback(
    (nextValue: any) => {
      const nextParams = new URLSearchParams();
      nextParams.set('value', JSON.stringify(nextValue));

      router.push(`${pathname}?${nextParams.toString()}`);
    },
    [pathname, router]
  );

  return (
    <StorageBrowser
      // @ts-expect-error
      onValueChange={handleValueChange}
      value={value}
    />
  );
}
