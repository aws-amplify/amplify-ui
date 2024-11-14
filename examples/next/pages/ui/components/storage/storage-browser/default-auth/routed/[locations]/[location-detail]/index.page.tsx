import React from 'react';
import { useRouter } from 'next/router';

import { signOut } from 'aws-amplify/auth';
import { Button, Flex } from '@aws-amplify/ui-react';

import { StorageBrowser } from '../../StorageBrowser';

import '@aws-amplify/ui-react-storage/storage-browser-styles.css';
import '@aws-amplify/ui-react-storage/styles.css';

export default function Page() {
  const [key, setKey] = React.useState(() => crypto.randomUUID());
  const router = useRouter();

  if (!router.query.bucket) return null;

  const { path, ...location } = router.query;

  return (
    <Flex>
      <Button
        onClick={() => {
          signOut();
          router.replace(
            router.pathname.replace('[locations]/[location-detail]', '')
          );
        }}
      >
        Sign Out
      </Button>
      <StorageBrowser.Provider
        actionType={
          typeof router.query.actionType === 'string'
            ? router.query.actionType
            : undefined
        }
        key={key}
        location={location as any}
        path={path as string}
      >
        <StorageBrowser.LocationDetailView
          onActionSelect={(actionType) => {
            router.replace({ query: { ...router.query, actionType } });
          }}
          onNavigate={(location, path = '') => {
            if (!location) {
              return;
            }
            router.replace({ query: { ...location, path } });
          }}
          onExit={() => {
            router.back();
          }}
        />
        {typeof router.query.actionType === 'string' ? (
          <dialog open={!!router.query.actionType}>
            <StorageBrowser.LocationActionView
              onExit={() => {
                setKey(() => crypto.randomUUID());
                router.replace({
                  query: { ...router.query, actionType: undefined },
                });
              }}
            />
          </dialog>
        ) : null}
      </StorageBrowser.Provider>
    </Flex>
  );
}
