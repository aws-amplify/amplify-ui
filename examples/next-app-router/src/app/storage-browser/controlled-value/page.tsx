'use client';

import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { Amplify } from 'aws-amplify';
import { StorageBrowser } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react-storage/styles.css';

import outputs from '@aws-amplify/ui-environments/storage/gen2/amplify_outputs.json';

Amplify.configure(outputs);

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const valueParam = params.get('value');
  const { location = {}, path = '' } = !valueParam
    ? {}
    : JSON.parse(valueParam);

  // eslint-disable-next-line no-console
  console.log('url location', location);
  console.log('url path', path);

  const handleLocationChange = React.useCallback(
    (value: any) => {
      // eslint-disable-next-line no-console
      console.log('value', value);

      const nextParams = new URLSearchParams();
      nextParams.set('value', JSON.stringify(value));

      router.push(`${pathname}?${nextParams.toString()}`);
    },
    [pathname, router]
  );

  return (
    <StorageBrowser
      location={location}
      path={path}
      onLocationChange={handleLocationChange}
    />
  );
  //   onNavigate={(location) => {
  //     router.push({
  //       pathname: `${router.pathname}/location-detail`,
  //       query: { ...location },
  //     });
  //   }}
}
