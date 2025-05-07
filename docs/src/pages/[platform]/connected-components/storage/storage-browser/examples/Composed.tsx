import * as React from 'react';
import { Button, Flex, Text } from '@aws-amplify/ui-react';
import { IconChevronRight } from '@aws-amplify/ui-react/internal';
import { StorageBrowser, useView } from './StorageBrowser';
import { ComposedCopyView } from './ComposedCopyView';
import { ComposedCreateFolderView } from './ComposedCreateFolderView';
import { ComposedDeleteView } from './ComposedDeleteView';
import { ComposedUploadView } from './ComposedUploadView';

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

const { LocationActionView } = StorageBrowser;

function MyLocationActionView() {
  const state = useView('LocationDetail');
  const onExit = () => {
    state.onActionSelect('');
  };

  switch (state.actionType) {
    case 'copy':
      return <ComposedCopyView onExit={onExit} />;
    case 'createFolder':
      return <ComposedCreateFolderView onExit={onExit} />;
    case 'delete':
      return <ComposedDeleteView onExit={onExit} />;
    case 'upload':
      return <ComposedUploadView onExit={onExit} />;
    default:
      return <LocationActionView onExit={onExit} />;
  }
}

function MyStorageBrowser() {
  const state = useView('LocationDetail');
  const ref = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    if (state.actionType) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [state.actionType]);

  if (!state.location.current) {
    return <LocationsView />;
  }

  return (
    <>
      <StorageBrowser.LocationDetailView />
      <dialog ref={ref}>
        <MyLocationActionView />
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
