import React from 'react';

import {
  CreateStorageBrowserInput,
  createStorageBrowser,
  createAmplifyAuthAdapter,
} from '@aws-amplify/ui-react-storage/browser';

import { Auth } from '../managedAuthAdapter';
import config from '../default-auth/aws-exports';

import { Flex, Breadcrumbs, withAuthenticator } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react-storage/styles.css';
import { Amplify } from 'aws-amplify';

Amplify.configure(config);

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

const { StorageBrowser, useView } = createStorageBrowser({
  components,
  config: createAmplifyAuthAdapter(),
  // filePreview: {
  //   fileTypeResolver: () => {
  //     return undefined;
  //   },
  // },
});

const { CopyView, CreateFolderView, DeleteView, LocationActionView } =
  StorageBrowser;

const MyCopyView = () => {
  const viewState = useView('Copy');
  const { isProcessing } = viewState;

  return (
    <CopyView.Provider {...viewState}>
      {isProcessing ? <h1>Copy in progress</h1> : null}
      <CopyView.Start />
      <CopyView.TasksTable />
      <CopyView.FoldersTable />
      <CopyView.Destination />
    </CopyView.Provider>
  );
};

const MyCreateFolderView = () => {
  const viewState = useView('CreateFolder');
  const { isProcessing } = viewState;
  return (
    <CreateFolderView.Provider {...viewState}>
      {isProcessing ? <h1>Folder creation in progress</h1> : null}
      <CreateFolderView.Start />
      <CreateFolderView.NameField />
    </CreateFolderView.Provider>
  );
};

const MyDeleteView = () => {
  const viewState = useView('Delete');
  const { isProcessing } = viewState;
  return (
    <DeleteView.Provider {...viewState}>
      {isProcessing ? <h1>Delete in progress</h1> : null}
      <DeleteView.Start />
      <DeleteView.TasksTable />
    </DeleteView.Provider>
  );
};

function MyLocationActionView({ type }: { type?: string }) {
  let DialogContent = null;
  if (!type) return DialogContent;

  switch (type) {
    case 'copy':
      DialogContent = MyCopyView;
      break;
    case 'createFolder':
      DialogContent = MyCreateFolderView;
      break;
    case 'delete':
      DialogContent = MyDeleteView;
      break;
    default:
      DialogContent = LocationActionView;
  }

  return (
    <dialog open>
      <DialogContent />
    </dialog>
  );
}

function MyFullyCustomPreviewer(props: any) {
  const {
    closeFilePreview,
    previewedFile,
    isLoading,
    hasError,
    url,
    retryFilePreview,
  } = props;
  const { fileType } = previewedFile;

  if (isLoading) {
    return <div>....loading</div>;
  }

  if (hasError) {
    return <div>...has error</div>;
  }

  function getDefaultRenderer(type?: any) {
    switch (type) {
      case 'image':
        return <img src={url} />;

      case 'video':
        return <video src={url} />;

      case 'text':
        return <div>My tesxt </div>;

      default:
        return <div>not supported</div>;
    }
  }

  return <div>{getDefaultRenderer(fileType)}</div>;
}

function MyLocationDetails() {
  const [type, setActionType] = React.useState<string | undefined>(undefined);
  const locationsD = useView('LocationDetail');
  const { filePreviewState, closeFilePreview, retryFilePreview } = locationsD;
  const { hasError, isLoading, url, hasLimitExceeded, previewedFile } =
    filePreviewState;

  return (
    <StorageBrowser.LocationDetailView.Provider {...locationsD}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ maxHeight: '50vh', overflow: 'scroll' }}>
          <StorageBrowser.LocationDetailView.LocationItemsTable />
        </div>

        {previewedFile && (
          <MyFullyCustomPreviewer
            closeFilePreview={closeFilePreview}
            previewedFile={previewedFile}
            isLoading={isLoading}
            hasError={hasError}
            url={url}
            retryFilePreview={retryFilePreview}
          />
        )}
      </div>
    </StorageBrowser.LocationDetailView.Provider>
  );
}

function MyStorageBrowser() {
  const locations = useView('Locations');

  return (
    <Flex>
      <Flex direction={'column'}>
        <StorageBrowser.LocationsView />
      </Flex>
      <Flex minWidth={'50vw'} direction={'column'}>
        <MyLocationDetails />
      </Flex>
    </Flex>
  );
}

function Example() {
  return (
    <>
      <StorageBrowser.Provider
        displayText={{
          LocationsView: { title: 'Home - Composable Playground' },
        }}
      >
        <MyStorageBrowser />
      </StorageBrowser.Provider>
    </>
  );
}

export default withAuthenticator(Example);
