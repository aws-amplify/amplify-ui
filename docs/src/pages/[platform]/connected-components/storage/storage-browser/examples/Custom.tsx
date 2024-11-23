import * as React from 'react';
import { createStorageBrowser } from '@aws-amplify/ui-react-storage/browser';
import { Button, Flex, Text } from '@aws-amplify/ui-react';
import { mockConfig } from './mockConfig';
import { IconChevronRight } from '@aws-amplify/ui-react/internal';

const { StorageBrowser, useView } = createStorageBrowser({
  config: mockConfig,
});

function LocationsView() {
  const state = useView('Locations');

  return (
    <Flex direction="column" padding="medium">
      <Text fontWeight="bold">Locations</Text>
      {state.pageItems.map((location) => {
        return (
          <Button
            key={location.id}
            justifyContent="flex-start"
            onClick={() => {
              state.onNavigate(location);
            }}
          >
            <Text flex="1">
              s3://{location.bucket}/{location.prefix}
            </Text>
            <Text as="span" color="font.tertiary" fontWeight="normal">
              {location.permissions.includes('list') ? 'Read' : null}{' '}
              {location.permissions.includes('write') ? 'Write' : null}
            </Text>
            <IconChevronRight color="font.tertiary" />
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
