import React from 'react';
import { useRouter } from 'next/router';

import { signOut } from 'aws-amplify/auth';
import { Button, Flex } from '@aws-amplify/ui-react';

import { StorageBrowser } from '../../StorageBrowser';

import '@aws-amplify/ui-react-storage/storage-browser-styles.css';
import '@aws-amplify/ui-react-storage/styles.css';

export default function Page() {
  const [key, setKey] = React.useState(() => crypto.randomUUID());
  const { replace, query, pathname } = useRouter();

  if (!query.bucket) return null;

  const { path, ...location } = query;

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
