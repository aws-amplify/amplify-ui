import React from 'react';
import { useRouter } from 'next/router';

import { signOut } from 'aws-amplify/auth';
import { Button, Flex } from '@aws-amplify/ui-react';

import { StorageBrowser } from '../../StorageBrowser';

import '@aws-amplify/ui-react-storage/styles.css';

export default function Page() {
  const [key, setKey] = React.useState(() => crypto.randomUUID());
  const { replace, query, pathname } = useRouter();

  if (!query.bucket) return null;

  const { path, ...location } = query;

  // `useRouter` cannot force a query parameter to be array, however the `permissions` has to be array.
  // When there's only 1 permission (e.g. ['list']), we need to force the `permissions` to be an array.
  if (typeof location.permissions === 'string') {
    location.permissions = [location.permissions];
  }

  return (
    <Flex>
      <Button
        onClick={() => {
          signOut();
          replace(pathname.replace('[locations]/[location-detail]', ''));
        }}
      >
        Sign Out
      </Button>
      <StorageBrowser.Provider
        actionType={
          typeof query.actionType === 'string' ? query.actionType : undefined
        }
        key={key}
        location={location as any}
        path={path as string}
        displayText={{
          LocationDetailView: {
            getTitle: (location) => `${location.key} - Routed Amplify Auth`,
          },
        }}
      >
        <StorageBrowser.LocationDetailView
          onActionSelect={(actionType) => {
            replace({ query: { ...query, actionType } });
          }}
          onNavigate={(location, path = '') => {
            if (!location) {
              return;
            }
            replace({ query: { ...location, path } });
          }}
          onExit={() => {
            replace(pathname.replace('/[locations]', ''));
          }}
        />
        {typeof query.actionType === 'string' ? (
          <dialog open={!!query.actionType}>
            <StorageBrowser.LocationActionView
              onExit={() => {
                setKey(() => crypto.randomUUID());
                replace({
                  query: { ...query, actionType: undefined },
                });
              }}
            />
          </dialog>
        ) : null}
      </StorageBrowser.Provider>
    </Flex>
  );
}
