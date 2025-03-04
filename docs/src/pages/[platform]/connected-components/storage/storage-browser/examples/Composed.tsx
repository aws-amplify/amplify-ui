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

function MyLocationActionView({
  type,
  onExit,
}: {
  type?: string;
  onExit: () => void;
}) {
  let DialogContent = null;
  if (!type) return DialogContent;

  switch (type) {
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
        <MyLocationActionView
          type={currentAction}
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
