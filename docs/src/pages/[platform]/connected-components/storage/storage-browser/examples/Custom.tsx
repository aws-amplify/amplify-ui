import * as React from 'react';
import { createStorageBrowser } from '@aws-amplify/ui-react-storage/browser';
import { Button, Flex } from '@aws-amplify/ui-react';
import { mockConfig } from './mockConfig';

const { StorageBrowser, useView } = createStorageBrowser({
  config: mockConfig,
});

function LocationsView() {
  const state = useView('Locations');

  return (
    <Flex direction="column" padding="large">
      {state.pageItems.map((location) => {
        return (
          <Button
            key={location.id}
            size="small"
            variation="link"
            justifyContent="flex-start"
            onClick={() => {
              state.onNavigate(location);
            }}
          >
            {location.bucket}/{location.prefix}
          </Button>
        );
      })}
    </Flex>
  );
}

function MyStorageBrowser() {
  const state = useView('LocationDetail');
  const [currentAction, setCurrentAction] = React.useState<string>();
  const ref = React.useRef<HTMLDialogElement>(null);

  if (!state.location.current) {
    return <LocationsView />;
  }

  return (
    <>
      <StorageBrowser.LocationDetailView
        key={currentAction}
        onActionSelect={(action) => {
          setCurrentAction(action);
          ref.current?.showModal();
        }}
      />
      <dialog ref={ref}>
        <StorageBrowser.LocationActionView
          onExit={() => {
            setCurrentAction(undefined);
            ref.current?.close();
          }}
        />
      </dialog>
    </>
  );
}

export default function Example() {
  return (
    <StorageBrowser.Provider>
      <MyStorageBrowser />
    </StorageBrowser.Provider>
  );
}
