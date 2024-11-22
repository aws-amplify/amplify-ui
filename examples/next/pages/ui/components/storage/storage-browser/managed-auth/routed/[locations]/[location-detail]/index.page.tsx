import { useRouter } from 'next/router';

import { Flex } from '@aws-amplify/ui-react';

import { SignOutButton } from '../../components';
import { StorageBrowser } from '../../StorageBrowser';

import '@aws-amplify/ui-react-storage/styles.css';

export default function Page() {
  const { back, query, pathname, replace } = useRouter();

  if (!query.bucket) return null;

  const { path, ...location } = query;

  // `useRouter` cannot force a query parameter to be array, however the `permissions` has to be array.
  // When there's only 1 permission (e.g. ['list']), we need to force the `permissions` to be an array.
  if (typeof location.permissions === 'string') {
    location.permissions = [location.permissions];
  }

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
            back();
          }}
        />
        {typeof query.actionType === 'string' ? (
          <dialog open={!!query.actionType}>
            <StorageBrowser.LocationActionView
              onExit={() => {
                replace({ query: { ...query, actionType: undefined } });
              }}
            />
          </dialog>
        ) : null}
      </StorageBrowser.Provider>
    </Flex>
  );
}
