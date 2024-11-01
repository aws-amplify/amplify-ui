import { useRouter } from 'next/router';

import { signOut } from 'aws-amplify/auth';
import { Button, Flex } from '@aws-amplify/ui-react';

import { StorageBrowser } from '../../StorageBrowser';

import '@aws-amplify/ui-react-storage/storage-browser-styles.css';
import '@aws-amplify/ui-react-storage/styles.css';

export default function Page() {
  const router = useRouter();

  if (!router.query.bucket) return null;

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
        location={router.query as any}
      >
        <StorageBrowser.LocationDetailView
          onActionSelect={(actionType) => {
            router.replace({ query: { ...router.query, actionType } });
          }}
          onExit={() => {
            router.back();
          }}
        />
        {typeof router.query.actionType === 'string' ? (
          <dialog open={!!router.query.actionType}>
            <StorageBrowser.LocationActionView
              onExit={() => {
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
