import React from 'react';

import {
  CreateStorageBrowserInput,
  createStorageBrowser,
} from '@aws-amplify/ui-react-storage/browser';

import { auth, managedAuthAdapter } from '../managedAuthAdapter';

import { Button, Flex, Breadcrumbs } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react-storage/storage-browser-styles.css';
import '@aws-amplify/ui-react-storage/styles.css';

const components: CreateStorageBrowserInput['components'] = {
  Navigation: ({ items }) => (
    <Breadcrumbs.Container>
      {items.map(({ isCurrent, name, onNavigate }) => (
        <Breadcrumbs.Item key={name}>
          <Breadcrumbs.Link isCurrent={isCurrent} onClick={onNavigate}>
            {name}
          </Breadcrumbs.Link>
        </Breadcrumbs.Item>
      ))}
    </Breadcrumbs.Container>
  ),
};

const { StorageBrowser } = createStorageBrowser({
  components,
  config: managedAuthAdapter,
});

function LocationActionView() {
  return (
    <dialog open>
      <StorageBrowser.LocationActionView />
    </dialog>
  );
}

function MyStorageBrowser() {
  const [type, setActionType] = React.useState<string | undefined>(undefined);

  return (
    <Flex>
      <Flex direction={'column'}>
        <StorageBrowser.LocationsView />
      </Flex>
      <Flex minWidth={'50vw'} direction={'column'}>
        <StorageBrowser.LocationDetailView
          onActionSelect={(actionType) => {
            setActionType(actionType);
          }}
        />
      </Flex>
      {type ? <LocationActionView /> : null}
    </Flex>
  );
}

function Example() {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();

  return !authenticated ? (
    <Flex>
      <Button
        onClick={() => {
          setIsLoading(true);
          auth.signIn({
            onSignIn: () => {
              setAuthenticated(true);
              setIsLoading(false);
            },
            onError: (e: Error) => {
              setErrorMessage(e.message);
              setIsLoading(false);
            },
          });
        }}
      >
        Sign In
      </Button>
      {isLoading ? <span>Authenticating...</span> : null}
      {errorMessage ? <span>{errorMessage}</span> : null}
    </Flex>
  ) : (
    <>
      <Button
        onClick={() => {
          auth.signOut({ onSignOut: () => setAuthenticated(false) });
        }}
      >
        Sign Out
      </Button>
      <StorageBrowser.Provider>
        <MyStorageBrowser />
      </StorageBrowser.Provider>
    </>
  );
}

export default Example;
