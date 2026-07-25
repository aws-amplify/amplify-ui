'use client';
import { StorageBrowser } from '../storage-browser'; // IGNORE

import React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { StorageBrowserEventValue } from '@aws-amplify/ui-react-storage/browser';

export default function Page() {
  const pathname = usePathname();
  const params = useSearchParams();

  const value = params.get('value');

  const handleValueChange = React.useCallback(
    (nextValue: StorageBrowserEventValue) => {
      const nextParams = new URLSearchParams();
      nextParams.set('value', JSON.stringify(nextValue));

      // `history.pushState` is used instead of `router.push` because the update
      // is a search param change only. `router.push` triggers an RSC round trip
      // that the App Router can silently discard while prefetch requests for the
      // route are still in flight, leaving `value` on its previous state with no
      // error and no retry.
      window.history.pushState(
        null,
        '',
        `${pathname}?${nextParams.toString()}`
      );
    },
    [pathname]
  );

  return (
    <StorageBrowser
      onValueChange={handleValueChange}
      value={value ? JSON.parse(value) : null}
    />
  );
}
