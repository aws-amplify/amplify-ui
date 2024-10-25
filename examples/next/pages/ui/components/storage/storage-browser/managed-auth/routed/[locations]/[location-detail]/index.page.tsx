import { useRouter } from 'next/router';

import { Flex } from '@aws-amplify/ui-react';

import { SignOutButton } from '../../components';
import { StorageBrowser } from '../../StorageBrowser';

import '@aws-amplify/ui-react-storage/storage-browser-styles.css';
import '@aws-amplify/ui-react-storage/styles.css';

export default function Page() {
  const { back, query, pathname, replace } = useRouter();

  if (!query.bucket) return null;

  return (
    <Flex>
      <SignOutButton
        onSignOut={() => {
          replace(pathname.replace('[locations]/[location-detail]', ''));
        }}
      />
      <StorageBrowser.Provider
        actionType={
          typeof query.actionType === 'string' ? query.actionType : undefined
        }
        location={query as any}
      >
        <StorageBrowser.LocationDetailView
          onActionSelect={(actionType) => {
            replace({ query: { ...query, actionType } });
          }}
          onNavigate={(destination) => {
            replace({ query: { ...destination } });
          }}
          onExit={() => {
            back();
          }}
        />
        {typeof query.actionType === 'string' ? (
          <dialog open={!!query.actionType}>
            <StorageBrowser.LocationActionView
              onClose={() => {
                replace({ query: { ...query, actionType: undefined } });
              }}
            />
          </dialog>
        ) : null}
      </StorageBrowser.Provider>
    </Flex>
  );
}
