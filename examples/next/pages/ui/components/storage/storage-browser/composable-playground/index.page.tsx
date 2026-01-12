import React from 'react';

import {
  createManagedAuthAdapter,
  createStorageBrowser,
  CreateStorageBrowserInput,
} from '@aws-amplify/ui-react-storage/browser';
import { Breadcrumbs, Button, Flex } from '@aws-amplify/ui-react';
import { Auth } from '../managedAuthAdapter';

export const auth = new Auth({ persistCredentials: true });

const config = createManagedAuthAdapter({
  credentialsProvider: auth.credentialsProvider,
  region: process.env.NEXT_PUBLIC_MANAGED_AUTH_REGION,
  accountId: process.env.NEXT_PUBLIC_MANAGED_AUTH_ACCOUNT_ID,
  registerAuthListener: auth.registerAuthListener,
});

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
  config,
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

function MyFullyCustomPreviewer(props: {
  filePreview: any;
  onRetry: () => void;
}) {
  const { filePreview, onRetry } = props;

  if (!filePreview.enabled) {
    return null;
  }

  if (filePreview.isLoading) {
    return <div>....loading</div>;
  }

  if (!filePreview.ok) {
    return <div>...has error</div>;
  }

  function getDefaultRenderer(type?: any) {
    switch (type) {
      case 'image':
        return <img src={filePreview.url} />;

      case 'video':
        return <video src={filePreview.url} />;

      case 'text':
        return <div>My tesxt </div>;

      default:
        return <div>not supported</div>;
    }
  }

  return <div>{getDefaultRenderer(filePreview.fileData.fileType)}</div>;
}

function MyLocationDetails({
  onActionSelect,
}: {
  onActionSelect: (actionType: string | undefined) => void;
}) {
  const locationsDetailViewState = useView('LocationDetail');
  const { filePreviewState, onRetryFilePreview, filePreviewEnabled } =
    locationsDetailViewState;

  return (
    <StorageBrowser.LocationDetailView.Provider
      {...locationsDetailViewState}
      onActionSelect={onActionSelect}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ maxHeight: '50vh', overflow: 'scroll' }}>
          <StorageBrowser.LocationDetailView.LocationItemsTable />
        </div>

        {filePreviewEnabled && (
          <MyFullyCustomPreviewer
            filePreview={filePreviewState}
            onRetry={onRetryFilePreview}
          />
        )}
      </div>
    </StorageBrowser.LocationDetailView.Provider>
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
        <MyLocationDetails
          onActionSelect={(actionType) => {
            console.log(actionType);
            setActionType(actionType);
          }}
        />
      </Flex>
      <MyLocationActionView type={type} />
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

export default Example;
